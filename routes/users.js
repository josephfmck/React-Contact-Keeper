//endpoint      http://localhost:5000/api/users
const express = require('express');
const router = express.Router();


//? route, description of route, and who can access
// @route  POST api/users 
// @desc   Register s user
// @access Public
//* Register and become user
router.post('/', (req, res) => {
    res.send('Register a user');
});

module.exports = router;