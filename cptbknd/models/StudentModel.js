const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    UserName:{type:String,required:true},
    PassWord:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Degree:{type:String,required:true},
    Batch:{type:String,required:true},
    Year:{type:String,required:true},
    TotalTuition:{type:String},
    AdditionalCharges:{type:String},
})

module.exports = mongoose.model("Student",StudentSchema)