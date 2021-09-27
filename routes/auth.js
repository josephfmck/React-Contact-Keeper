//endpoint       http://localhost:5000/api/auth
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
//middleware to auth user with JWT
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");


const User = require("../models/User");
const { findById } = require('../models/User');


//! happens 2nd
//? route, description of route, and who can access
// @route  GET api/auth 
// @desc   Get logged in user
// @access Private
//* Get logged in user
//* private is protected with middleware
//auth is middleware
router.get('/', auth, async (req, res) => {

    try {
        //*find DB user by id, from req obj
        //? req obj gets ID from auth middleware JWT
        //* return user without password '-password'  
        const user = await User.findById(req.user.id).select('-password');

        //send user as res 
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//?still "/" since grabbing and submitting from/to auth route




//! happens 1st
// @route  POST api/auth 
// @desc   Auth user and get token
// @access Private
//* Log in/authenticate user and get token
    router.post(
        "/",
        [
          body("email", "Please enter a valid email").isEmail(),
          body("password", "Password is required").exists(),
        ],
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
      
          //? req.body needs express middleware in server.js
          //destruct fields from req.body
          const { email, password } = req.body;
      
          try {
              //check user with email
              let user = await User.findOne({ email });
              //if user doesnt exist
              if(!user) {
                  return res.status(400).json({ msg: 'Invalid Credentials'});
              }
      
              //*check and compare password to hash
              const isMatch = await bcrypt.compare(password, user.password);
              //? isMatch return boolean
              //if password doesnt match to hash
              if(!isMatch) {
                  return res.status(400).json({ msg: 'Invalid Credentials'});
              }
      
              //*payload to send for jwt token
              const payload = {
                  user: {
                      id: user.id
                  }
              };
      
              //*sign token with payload and secret
              jwt.sign(payload, config.get('jwtSecret'), {
                  expiresIn: 36000
              }, (err, token) => {
                  //check err, send token
                  if(err) throw err;
                  res.json({ token });
              });
          } catch (err) {
              console.error(err.message);
              res.status(500).send("Server Error");
          }
        }
      );
      


module.exports = router;