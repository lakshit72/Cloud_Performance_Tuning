// Imports
const AdminRout = require("./routes/Admin")
const StudentRout = require("./routes/Student")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require("multer")
const env = require("dotenv")

env.config()

// Instantiation
const routs = express();

// Cross Origin Request(Add Headers to requests)
routs.use(cors({
    origin:"*"
}))

//set application data type
routs.use(express.json())

// Connect to MongoDb
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo Connected")    
}).catch(err=>{
    console.log(err)
})

// Set folder with user content
routs.use("/Users",express.static("Users"));
// Set folder with CourseContent
routs.use("/Content",express.static("Contents"));

//Application Routes
routs.use("/Admin",AdminRout)
routs.use("/Student",StudentRout)

//Handel File Uploads
routs.post("/Uploads/ProfilePic",async (req,res)=>{
    console.log(req.body)
    res.status(200).json("123")
})

// Start server at specified port
routs.listen(5000,()=>{
    console.log("Server Started");
});