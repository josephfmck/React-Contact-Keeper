//*backend entry point 
//* TERM: npm run server - to run backend server
//import
const express = require('express');
//import DB connection
const connectDB = require('./config/db');

//init express
const app = express();

//connect to DB
connectDB();

//*Init middleware to use res.send (req.body) in Routes
//!dont need extended: false since bodyparser deprecated
app.use(express.json({ extended: false}));

//endpoint/route
app.get('/', (req, res) => res.json({ msg: 'Welcome to the contact keeper API...'}));


//Define Routes 
//? API ENDPOINTS
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//env var PORT production OR 5000 development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
