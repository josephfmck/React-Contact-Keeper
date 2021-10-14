const mongoose = require('mongoose');


//? connects to users.js Route file

//* schema object to define the structure of the data
//* User registration
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

//* user model with UserSchema 
module.exports = mongoose.model('user', UserSchema);