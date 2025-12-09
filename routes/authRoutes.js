const express = require("express");

const{
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authcontroller");


const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

//router.get("/getUser", getUserInfo);  //protected

module.exports = router;