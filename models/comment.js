const mongoose = require("mongoose") ; 

const commentschema = mongoose.Schema( {

content : {

 type : String ,
 required: true 

} , 

commentedbyuser: {
    type : mongoose.Schema.ObjectId, 
    ref : "user" , 

} , 

commentedonblog : {
    type : mongoose.Schema.ObjectId, 
    ref : "blog" , 

}  

} , {timestamp : true} ) ; 

const comments = mongoose.model("comment" , commentschema) ; 

module.exports = { comments } ; 