const mongoose = require("mongoose");

//? connects to .js Route file

//* schema object to define the structure of the data
//* User's Contacts DB
//* user{} identifies actual user with contacts (Creates a relationship between contacts and users)
//? user: type is unique DB obj ID, ref is a reference to users collection, connects users and contacts DB
//? ref being 'users' instead of 'user' is because collections become plural while schema is just one 'user'
//? type: 'personal' or 'professional'
const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//* user model with UserSchema
module.exports = mongoose.model("contact", ContactSchema);
