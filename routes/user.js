const user = require("../models/user") ; 
const express = require("express") ; 
const userrouter = express.Router() ; 
const { handleuserlogin , handleusersignup }  = require("../controllers/user") ; 
const multer = require("multer") ; 
const path = require("path") ; 
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinary");
const {ratelimiterlogin} = require("../middlewares/ratelimiter") ; 

// const storage2 = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve("./public/newuploads/" )) ; 
//   },
//   filename: function (req, file, cb) {
//     const filename = `${Date.now()}-${file.originalname}` ; 
//     cb(null, filename ) ; 
//   }
// })

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogify",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

userrouter.post("/login" , ratelimiterlogin ,  handleuserlogin ) ; 
userrouter.post("/signup" ,  upload.single("profileimage") , handleusersignup ) ; 

module.exports = { userrouter } ; 


