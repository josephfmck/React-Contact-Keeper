// endpoint     http://localhost:5000/api/contacts
//endpoint      http://localhost:5000/api/contacts/:1

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//* import Both DB models to use in route
const User = require("../models/User");
const Contact = require("../models/Contact");

// @route  GET api/contacts
// @desc   Get all users contacts (not all contacts in DB) (only specific users contacts)
// @access Private
//* Get all users contacts
router.get("/", auth, async (req, res) => {
  console.log("req.user.id: ", req.user.id);

  try {
    //* User's contacts Arr sorted with newest first
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/contacts
// @desc   Add new contact
// @access Private
//? [] for multiple middleware
//* Add contact
router.post(
  "/",
  [auth],
  [body("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    //if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log({ "contacts Route POST req.body": req.body });
    //* contact field data from req
    const { name, email, phone, type } = req.body;
    try {
      //?id of logged in user, from auth middleware
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      //save to DB
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/contacts/:id
// @desc   Update contact
// @access Private
//* Update specific contact
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  //*if included in request, change/add to contact field
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    //* find DB contact by ID with /:id in route
    let contact = await Contact.findById(req.params.id);

    //* if contact not found
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    console.log({ "contact.user": contact.user, "req.user.id": req.user.id });

    //* check if user owns contact
    //?str since req.user.id is a str
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //* update contact, set fields to contactFields, if contact doesnt exist then create new one
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/contacts/:id
// @desc   Delect contact
// @access Private
//* Delete specific contact
router.delete("/:id", auth, async (req, res) => {
    try {
      //* find DB contact by ID with /:id in route
      let contact = await Contact.findById(req.params.id);
  
      //* if contact not found
      if (!contact) return res.status(404).json({ msg: "Contact not found" });
  
      console.log({ "contact.user": contact.user, "req.user.id": req.user.id });
  
      //* check if user owns contact
      //?str since req.user.id is a str
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }
  
      //* delete contact with contact's /:id 
      //? no var since not returning
      await Contact.findByIdAndRemove(req.params.id);
  
      res.json({msg: "Contact removed"});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
});

module.exports = router;
