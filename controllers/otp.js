const { use } = require("../../url-shortener/service/email");
const { users } = require("../models/user");
const {setuser , getuser } = require("../services/auth") ; 


async function handleotpverification( req ,  res ){

const body = req.body ; 

if(!body.otp || !body.email) return res.render("verifyotp" , { email: body.email , error : "please enter the  otp "}) ; 

const user = await users.findOne({email : body.email }) ; 

if( !user ) {
     return res.render("verifyotp" , {email: body.email , error : "enter the valid email "}) ; 
}


if(user.otp !== body.otp ){
    res.render("verifyotp" , { error : "otp doesnt match " , email : body.email }) ; 
}

if( Date.now() > user.otpexpiry ){
    res.render("verifyotp" , { error : "otp has expired" , email : body.email }) ; 
}
user.otp = undefined ; 
user.otpexpiry = undefined ; 
await user.save() ; 

const token = setuser(user) ;

res.cookie("uid" , token ) ;

// res.render("home" ,  { user : req.user }) ; 
res.redirect("/") ; 

}

module.exports = {  handleotpverification } ; 