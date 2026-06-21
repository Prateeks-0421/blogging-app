const path = require("path")
const express = require("express") ; 
const app = express() ; 
const {staticroute} = require("./routes/static") ; 
const {userrouter} = require("./routes/user") ; 
const mongoose = require("mongoose")  ;
const cookieparser = require("cookie-parser") ; 
const {checkauth , restrictto} = require("./middlewares/auth") ; 
const {blogrouter} = require("./routes/blog") ; 
require("dotenv").config();
// const path = require("path") ; 

mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("connected to mongodb") ; 
}).catch(() =>{
    console.log("error connecting mongodb ") ; 
})

app.set("view engine" , "ejs") ; 

app.set("views" , path.resolve("./views")) ; 

app.use(express.json()) ; 
app.use(express.urlencoded({extended : false })) ; 
app.use(cookieparser()) ; 
app.use(express.static("./public"));

app.use(checkauth) ;

app.use("/" , staticroute ) ; 
app.use("/user" , userrouter ) ; 
app.use("/blog" ,   blogrouter ) ; 

const PORT = 8000 ; 

app.listen(PORT , () => {
 
    console.log(`server is running on port ${PORT}`) ; 

}) ; 