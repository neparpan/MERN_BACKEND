const express = require("express");
const { protect} = require("../middleware/authMiddleware")
const{
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");


const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

//router.get("/getUser", getUserInfo);  //protected

router.post("/upload-image", upload.single("imgae"), (req, res) =>{
    if(!req.file){
        return res.status(400).json({ message: "No file Uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
})
module.exports = router;