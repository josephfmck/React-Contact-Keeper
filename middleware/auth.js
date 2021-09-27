//*middleware is func that has access to TOKEN'S (req,res) cycle and (req,res) obj
//*everytime hit endpoint, middleware runs
//*WANT check to see if token in header

const jwt = require('jsonwebtoken');
const config = require('config');



//* middleware func
//* next is to call next middleware func in middleware chain
module.exports = function(req,res,next) {
    // Get token from req obj header
    //? x-auth-token is header name/key
    const token = req.header('x-auth-token');

    // Check if not token 
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // Verify token 
    // Set req.user to the token's payload's user   
    try {
        //* decode token by verifying with secret
        //? decoded is a token payload
        const decoded = jwt.verify(token, config.get('jwtSecret'));
    
        //* set req obj user to decoded payload user 
        req.user = decoded.user;
        //call next middleware
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid'});
    }
}

//* THE req object then get's passed to the next bit of middleware, the route handler.