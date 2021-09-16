//endpoint      http://localhost:5000/api/users
const express = require('express');
const router = express.Router();

//* import the user DB model to use in route
const User = require('../models/User');


//? route, description of route, and who can access
// @route  POST api/users 
// @desc   Register s user
// @access Public
//* Register and become user
router.post('/', (req, res) => {
    //? req.body needs express middleware in server.js
    res.send(req.body);
});

module.exports = router;