const {client}= require('../client.js') ; 

async function ratelimiteraddblogs(req , res , next ){

 const count = await client.get(`blogs:${req.ip}`) ; 

if(!count){
    await client.set(`blogs:${req.ip}` , 1 , { EX : 86400 }) ; 
    return next() ; 
}
const newcount = await client.incr(`blogs:${req.ip}`) ; 

 if( newcount > 10 ) {
    return res.status(429).json({ error : "too many blogs in a single day ."}) ; 
 }

 next() ; 

}

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

async function ratelimitercomments(req , res , next ){

 const count = await client.get(`comment:${req.ip}`) ; 

if(!count){
    await client.set(`comment:${req.ip}` , 1 , { EX : 300 }) ; 
    return next() ; 
}
const newcount = await client.incr(`comment:${req.ip}`) ; 

 if( newcount > 10 ) {
    return res.status(429).json({ error : "too many comments in a short time "}) ; 
 }

 next() ; 

}



module.exports = {ratelimiterlogin , ratelimitercomments , ratelimiteraddblogs} ; 