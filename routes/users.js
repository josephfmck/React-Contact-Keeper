//endpoint      http://localhost:5000/api/users
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

//* import the user DB model to use in route
const User = require("../models/User");

// ? route, description of route, and who can access
// @route  POST api/users
// @desc   Register s user
// @access Public

//* Register and become user
//* [] = express-validator fields
//? body(key to check, msg)
//? .not().isEmpty() checks not empty
router.post(
  "/",
  [body("name", "Please add name").not().isEmpty(),
    body("email", "Please include valid email").isEmail(),
    body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    //if errors not empty 
    if(!errors.isEmpty()) {
        //send back 404 and arr of errors
        return res.status(400).json({ errors: errors.array() });
    }

    
    //? req.body needs express middleware in server.js
    //destruct fields from req.body
    const { name , email, password } = req.body;

    try {
        //check if already user with email
        //find user by email DB field
        let user = await User.findOne({ email: email });
        if(user) {
            res.status(400).json({ msg: "User already exists" });
        }

        //*create new user with model User
        user = new User({
            name: name,
            email: email,
            password: password
        });

        //* encrypt password
        //generate salt with 10 rounds
        const salt = await bcrypt.genSalt(10);
        //set password to hashed password
        user.password = await bcrypt.hash(password, salt);
    
        //* save user to DB
        await user.save();

        //* payload obj to send
        //? get data based on user
        const payload = {
            user: {
                id: user.id
            }
        }
        //* sign token with payload
        //? jwt.sign(payload, secret, options)
        jwt.sign(payload, config.get('jwtSecret'), {
            //?36000s = 10 hours before expires
            expiresIn: 36000
        }, (err, token)=> {
            //check err, send token
            if(err) throw err;
            res.json({ token });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
