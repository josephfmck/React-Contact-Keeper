//endpoint       http://localhost:5000/api/auth
const express = require('express');
const router = express.Router();

//? route, description of route, and who can access
// @route  GET api/auth 
// @desc   Get logged in user
// @access Private
//* Get logged in user from API
router.get('/', (req, res) => {
    res.send('Get logged in user');
});
//?still "/" since grabbing and submitting from/to auth route

// @route  POST api/auth 
// @desc   Auth user and get token
// @access Private
//* Log in/authenticate user and get token
router.post('/', (req, res) => {
    res.send('Log in user');
});


module.exports = router;