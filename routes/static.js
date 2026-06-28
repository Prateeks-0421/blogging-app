const express = require("express") ; 
const staticroute = express.Router() ;  
const {  handleotpverification } = require("../controllers/otp") ; 
const {blogs} = require("../models/blog") ; 
const {client} = require("../client.js") 

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

// handled jwt blacklisting 

staticroute.get("/logout" , async ( req , res ) => {

  const token = req.cookies.token ; 

  await client.set(`blocked${token}` , 'true' ,  {
    EX: 86400
} ) ; 

return res.clearCookie("token").redirect("/") ; 

}) ; 


staticroute.post("/verifyotp" , handleotpverification ) ; 

module.exports = { staticroute } ; 