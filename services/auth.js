const jwt = require("jsonwebtoken") ; 
const secretkey = 'januuuuuu@2312' ; 


function setuser(user){

    return jwt.sign( 
      payload = {
        name : user.name , 
        _id : user._id , 
        email : user.email , 
        role : user.role , 
        profileimageurl : user.profileimageurl , 
    } , secretkey ) ; 
}

function getuser(token){
    if(!token) return null ; 
return jwt.verify(token , secretkey ) ; 
}



module.exports = {setuser , getuser } ; 