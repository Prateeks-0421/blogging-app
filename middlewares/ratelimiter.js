const {client}= require('../client.js') ; 

// function ratelimiter(rate, timeduration) {

//     return async (req, res, next) => {
 
//         const count = await client.get("")

//         next();
//     };
// }

async function ratelimiterlogin(req , res , next ){

 const count = await client.get(`login:${req.ip}`) ; 

if(!count){
    await client.set(`login:${req.ip}` , 1 , { EX : 60 }) ; 
    return next() ; 
}
const newcount = await client.incr(`login:${req.ip}`) ; 

 if( newcount > 3 ) {
    return res.status(429).json({ error : "too many request "}) ; 
 }

 next() ; 

}
// ok now i want to study ip address which is connected with backend

module.exports = {ratelimiterlogin} ; 