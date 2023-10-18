// Imports
const express = require("express");

// Instantiation
const routs = express();

// Set folder with user content
routs.use("/Users",express.static("Users"));
// Set folder with CourseContent
routs.use("/Content",express.static("Contents"));

// Start server at specified port
routs.listen(5000,()=>{
    console.log("Server Started");
});