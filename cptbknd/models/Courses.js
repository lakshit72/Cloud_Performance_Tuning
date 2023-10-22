const mongoose = require("mongoose")

const CourseModel = new mongoose.Schema({
    CourseName:{type:String,required:true},
    Batch:{type:String},
    Year:{type:String},
    Degree:{type:String},
    Files:[
        {type:String}
    ]
})

module.exports = mongoose.model("Courses",CourseModel)