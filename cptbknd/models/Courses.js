const mongoose = require("mongoose")

const CourseModel = mongoose.Schema({
    CourseName:{type:String,required:true,unique:true},
    Batch:{type:String},
    Year:{type:String},
    Degree:{type:String},
    Files:[{
        Path:{type:String}
    }]
})

module.exports = mongoose.model("Courses",CourseModel)