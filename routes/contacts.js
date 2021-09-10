// endpoint     http://localhost:5000/api/contacts
//endpoint      http://localhost:5000/api/contacts/:1

const express = require('express');
const router = express.Router();

//? route, description of route, and who can access
// @route  GET api/contacts 
// @desc   Get all users contacts (not all contacts in DB) (only specific users contacts)
// @access Private
//* Get all users contacts
router.get('/', (req, res) => {
    res.send('Get users contacts');
});
//?still "/" since grabbing and submitting from/to contacts route

// @route  POST api/contacts 
// @desc   Add new contact
// @access Private
//* Add contact
router.post('/', (req, res) => {
    res.send('Add contact');
});

// @route  PUT api/contacts/:id 
// @desc   Update contact
// @access Private
//* Update specific contact
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route  DELETE api/contacts/:id 
// @desc   Delect contact
// @access Private
//* Delete specific contact
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;