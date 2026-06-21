const express = require("express") ; 
const blogrouter = express.Router() ;  
const { blogs }= require("../models/blog") ; 
const multer = require("multer") ; 
const path = require("path") ; 
const {comments} = require("../models/comment") ;  
const {checkauth , restrictto} = require("../middlewares/auth") ; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/" )) ; 
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}` ; 
    cb(null, filename ) ; 
  }
})

const upload = multer({ storage: storage })

blogrouter.get("/add-new" , restrictto ,  (req , res ) => {

  res.render("addblogs" , { user : req.user }) ; 

}) ; 

blogrouter.post("/" , upload.single("coverimage") , async ( req , res ) => {

    const blog = await blogs.create({
      title : req.body.title ,
      body : req.body.body , 
      coverimageurl :  `/uploads/${req.file.filename}` , 
      createdby : req.user._id 
        
    }) ; 

    const allblogs = await blogs.find({createdby : req.user._id }).populate("createdby") ; 
  
 
    res.redirect(`/blog/${blog._id }`) ;

}) ; 

blogrouter.get(`/:id` , async (req, res ) => {

 id = req.params.id ; 

 blog = await blogs.findOne({ _id : id }).populate("createdby") ; 
 const allcomments = await comments.find({commentedonblog : req.params.id  }).populate("commentedbyuser") ; 
 console.log(allcomments) ; 

 res.render("showblogs" , { user : req.user ,  blog : blog , comment : allcomments  } ) ;

}) ; 

blogrouter.post("/comment/:id" , restrictto , async ( req , res ) => {

const body = req.body ; 

const comment = await comments.create({
  content : body.content , 
  commentedbyuser : req.user._id , 
  commentedonblog : req.params.id 

}) ;   

const allcomments = await comments.find({commentedonblog : req.params.id  }).populate("commentedbyuser") ; 
 blog = await blogs.findOne({ _id : req.params.id }).populate("createdby") ;
console.log(allcomments) ; 

res.render("showblogs" , { user : req.user ,  blog : blog , comment : allcomments })

}) ; 

module.exports = {blogrouter} ; 
