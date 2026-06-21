const mongoose = require("mongoose") ; 

const blogschema = mongoose.Schema( {

title : {

 type : String ,
 required: true 

} , 

body : {

 type : String ,
 required: true , 

} , 

coverimageurl : {
    type: String , 
    required : false , 
} , 

createdby: {
    type : mongoose.Schema.ObjectId, 
    ref : "user" , 

}  

} , {timestamp : true} ) ; 

const blogs = mongoose.model("blog" , blogschema) ; 

module.exports = { blogs } ; 