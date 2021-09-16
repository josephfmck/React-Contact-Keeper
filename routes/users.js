//endpoint      http://localhost:5000/api/users
const express = require("express");
const router = express.Router();
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
  (req, res) => {
    const errors = validationResult(req);
    //if errors not empty 
    if(!errors.isEmpty()) {
        //send back 404 and arr of errors
        return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed validation');
    //? req.body needs express middleware in server.js
    // res.send(req.body);
  }
);

module.exports = router;
