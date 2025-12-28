const User = require("../models/User")

const jwt = require("jsonwebtoken");

//Generate jwt Token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"});

};

//Register User
exports.registerUser = async (req, res) =>{
    try{
        const {fullName, email, password, profileImageUrl } = req.body;
        
        //validation check
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }
        //check if email already exists
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json ({message:"Email already in use"});
        }
        console.log("Request Body:", req.body);
        //create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch (err){
        console.log(err.message);
        res
          .status(500)
          .json({ message: "Error registering user", error: err.message})
    }
    
};


//loginUser
exports.loginUser = async (req, res) =>{
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    try{
        const user = await User.findOne({ email});
        if( !user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials'});
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch(err){
        res
         .status(500)
         .json({ mesage: "Error Registering User", error: err.mesage});
    }
};

//get user info
exports.getUserInfo = async (req, res) =>{
        try{
            const user = await User.findById(req.user.id).select("-password");

            if (!user) {
                return res.status(404).json({ message: "usr not found" });
            }

            res.status(200).json(user);
        }catch (err) {
            res
                .sttus(500)
                .json({ message: "Error registering user", error: err.message});
        }
};