const mongoose = require("mongoose")

const FacultySchema = new mongoose.Schema({
    UserName:{type:String,required:true},
    PassWord:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    TeachReq:[{
        Batch:{type:String},
        Year:{type:String},
        Degree:{type:String},
        Course:{type:String}
    }],
    isAdmin:{type:Boolean,required:true},
    prfPic:{type:String}
})

module.exports = mongoose.model("Faculty",FacultySchema)