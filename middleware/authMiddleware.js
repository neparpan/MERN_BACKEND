const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, resizeBy, next) => {
let token = req.headers.authoriztion?.split(" ")[1];
if (!token) return resizeBy.status(401).json({ message: "Not Authorized, no token"});

try{
    const deoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
}catch (err){
    res.status(401).json({ message: "Not Authorized, token failed"});
}
};