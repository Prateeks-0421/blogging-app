const user = require("../models/user") ; 
const express = require("express") ; 
const userrouter = express.Router() ; 
const { handleuserlogin , handleusersignup }  = require("../controllers/user") ; 
const multer = require("multer") ; 
const path = require("path") ; 

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/newuploads/" )) ; 
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}` ; 
    cb(null, filename ) ; 
  }
})

const upload = multer({ storage: storage2 }) ;

userrouter.post("/login" , handleuserlogin ) ; 
userrouter.post("/signup" ,  upload.single("profileimage") , handleusersignup ) ; 

module.exports = { userrouter } ; 


