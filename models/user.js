const mongoose = require("mongoose") ; 

const userschema = mongoose.Schema( {

name : {

 type : String ,
 required: true 

} , 

email : {

 type : String ,
 required: true , 
 unique : true 

} , 

role : {

 type : String ,
enum : ["NORMAL" , "ADMIN"] ,  
default : "NORMAL" , 

} , 
profileimageurl : {
 type : String , 
 default : "/uploads/profileimage.png" , 

} , 

password : {
    type : String , 
    required: true 

} , 

otp: {
    type : String 
} ,
otpexpiry : {
    type : Date 
}

}) ; 

const users = mongoose.model("user" , userschema) ; 

module.exports = { users } ; 