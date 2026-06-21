const {setuser , getuser } = require("../services/auth") ;  

async function checkauth(req, res, next) {

    const token = req.cookies?.uid;

    if (!token) {
        return next();
    }

    try {
        const user = getuser(token);

        req.user = user;

    } catch (error) {
        return next();
    }

    next();
    
}

async function restrictto(req , res , next ){

 const token = req.cookies?.uid;

    if (!token) {
        return res.redirect("/login") ;
    }

    try {
        const user = getuser(token);

        req.user = user;

    } catch (error) {
         return res.redirect("/login") ;
    }

    next();

}

module.exports = { checkauth , restrictto} ; 
