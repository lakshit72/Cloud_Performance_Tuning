const mongoose = require("mongoose")

const CourseModel = mongoose.Schema({
    CourseName:{type:String,required:true,unique:true},
    Files:[{
        Path:{type:String}
    }]
})

module.exports = mongoose.model("Courses",CourseModel)