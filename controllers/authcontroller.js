const User = require("../modles/User")

const jwt = require("jsonwebtoken");

//Generate jwt Token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"});

};

//Register User
exports.registerUser = async (req, res) =>{
    const {fullName, email, password, profileImageUrl } = req.body;

    //validation check
    if(!fullName || !email || !password){
        return res.status(400).json({ message: "All fields are required"});
    }
    try{
        //check if email already exists
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json ({messsage:"Email already in use"});
        }
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
        res
          .status(500)
          .json({ message: "Error registering user", error: err.message})
    }
    
};


//loginUser
exports.loginUser = async (req, res) =>{};

//register User
exports.getUserInfo = async (req, res) =>{};