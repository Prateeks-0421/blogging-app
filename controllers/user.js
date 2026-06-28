const {users} = require("../models/user") ; 
const bcrypt = require("bcrypt") ; 
const axios = require("axios") ; 
async function handleuserlogin(req , res ){

   const body = req.body ; 

 if( !body.email || !body.password ) {
   return res.render("login" , { error : "all fields are required" }  ) ; 
 }   

const user = await users.findOne({

    email : body.email , 

}) ; 

 if(!user){
   return res.render("login" , {error : "email not registered" } ) ; 
 }

 const ismatch = await bcrypt.compare(body.password , user.password ) ; 

   if(!ismatch) {

    return res.render("login" , {error : "password doesnt match"} ) ; 

   } 

   const otp = Math.floor(  100000 + Math.random() * 900000 ).toString(); 

    user.otp = otp;
    user.otpexpiry =  Date.now() + 5*60*1000;

    await user.save();

    try {
    
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Blogging Application",
            email: "peekingsurfers01@gmail.com"
          },
          to: [
            {
              email: user.email
            }
          ],
          subject: "OTP Verification",
          textContent: `Your OTP is ${otp}`
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json"
          }
        }
      );
    
      console.log("Email sent");
    
    } catch(err) {
    
      console.log(err.response?.data || err.message);
    
    }
      
    return   res.render("verifyotp",{
       email:user.email
       });

}

async function handleusersignup(req , res ){

 const body = req.body ; 

 console.log(req.files);

 if( !body.name || !body.email || !body.password ) {
    return res.render("signup" , { error : "all fields are required "}  ) ; 
 }         
 
 const hashedpassword = await bcrypt.hash(body.password , 10 ) ; 

 try{

 const user = await users.create({
    name : body.name , 
    email : body.email , 
     profileimageurl :  req.file.path , 
    password : hashedpassword
 } ) ; 

} 
catch(error){

    return res.render("signup" , { error : "user already registered "}  ) ;

    // console.log(error) ; 
}

//  await users.save() ; 

return res.redirect("/") ; 
    
}

module.exports = { handleuserlogin , handleusersignup } ; 
