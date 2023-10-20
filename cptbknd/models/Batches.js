const mongoose = require("mongoose")

const BatchSchema =  new mongoose.Schema({
    Year:{type:String,required:true},
    Batch:{type:String,required:true},
    Degree:{type:String,required:true},
    Courses:[{
        CourseName:{type:String}
    }]
})

module.exports = mongoose.model("Batches",BatchSchema)