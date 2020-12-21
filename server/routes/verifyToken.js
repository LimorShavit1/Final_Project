const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){

    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denied');

    //if the token exist --> verify the token
    try {
        const verified = jwt.verify(token,'SECRET1234');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
        
    }
}