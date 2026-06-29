const { users } = require("../models/user");
const {setuser , getuser } = require("../services/auth") ; 
const {client} = require("../client.js") ; 

async function handleotpverification( req ,  res ){

const body = req.body ; 

if(!body.otp || !body.email) return res.render("verifyotp" , { email: body.email , error : "please enter the  otp "}) ; 

const user = await users.findOne({email : body.email }) ; 

if( !user ) {
     return res.render("verifyotp" , {email: body.email , error : "enter the valid email "}) ; 
}
 
const storedotp = await client.get(`otp:${user.email}`) ; 

if( storedotp !== body.otp ){
   return res.render("verifyotp" , { error : "otp doesnt match " , email : body.email }) ; 
}

// await client.del(`otp:${user.email}`) ; 

const deleted = await client.del(`otp:${user.email}`);

// if( Date.now() > user.otpexpiry ){
//     res.render("verifyotp" , { error : "otp has expired" , email : body.email }) ; 
// }
// user.otp = undefined ; 
// user.otpexpiry = undefined ; 
// await user.save() ; 

const token = setuser(user) ;

res.cookie("token" , token ) ;

// res.render("home" ,  { user : req.user }) ; 
return res.redirect("/") ; 

}

module.exports = {  handleotpverification } ; 