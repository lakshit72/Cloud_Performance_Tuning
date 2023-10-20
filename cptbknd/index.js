// Imports
const AdminRout = require("./routes/Admin")
const StudentRout = require("./routes/Student")
const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");

// Instantiation
const routs = express();

// Cross Origin Request(Add Headers to requests)
routs.use(cors({
    origin:"*"
}))

//set application data type
routs.use(express.json())

// Connect to MongoDb
mongoose.connect("mongodb+srv://lakshitjoshi1802:yvGouNYwhuBvceiM@cluster0.n6jcubn.mongodb.net/?retryWrites=true&w=majority").then(()=>{
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

// Start server at specified port
routs.listen(5000,()=>{
    console.log("Server Started");
});