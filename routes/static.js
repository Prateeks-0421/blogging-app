const express = require("express") ; 
const staticroute = express.Router() ;  
const {  handleotpverification } = require("../controllers/otp") ; 
const {blogs} = require("../models/blog") ; 

staticroute.get("/" , async ( req , res ) => {

  const allblogs = await blogs.find({}) ;    
res.render("home" , { user : req.user , blogs : allblogs }) ; 

}) ; 


staticroute.get("/login" , ( req , res ) => {

res.render("login" ) ; 

}) ; 


staticroute.get("/signup" , ( req , res ) => {

res.render("signup" ) ; 

}) ; 

staticroute.get("/logout" , ( req , res ) => {

return res.clearCookie("uid").redirect("/") ; 

}) ; 


staticroute.post("/verifyotp" , handleotpverification ) ; 

module.exports = { staticroute } ; 