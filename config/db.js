//connect to monogo db
const mongoose = require('mongoose');
//access to global vars 
const config = require('config');
//grab mongoURI from config file
const db = config.get('mongoURI');

//?mongoose returns promises, {} is for options warnings
const connectDB = async () => {

    //? try catch for errs, try block for success connect
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;