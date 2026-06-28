const {setuser , getuser } = require("../services/auth") ;  
const {client} = require("../client.js") ; 

async function checkauth(req, res, next) {

    const token = req.cookies?.token ;

    if (!token) {
        return next();
    }
    
    const blocked = await client.get(`blocked${token}`) ; 

    if(blocked){
        return next() ; 
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

 const token = req.cookies?.token ;

    if (!token) {
        return res.redirect("/login") ;
    }
        const blocked = await client.get(`blocked${token}`) ; 

    if(blocked){
        return next() ; 
    }
    try {
        const user = getuser(token);

        req.user = user;

    } catch (error) {
         return res.redirect("/login") ;
    }

    next();

}

module.exports = { checkauth , restrictto } ; 
