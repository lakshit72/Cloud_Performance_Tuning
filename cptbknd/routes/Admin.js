const FacultyModel = require("../models/FacultyModel")
const dcrypt = require("crypto-js")
const StudentModel = require("../models/StudentModel")
const CourseModel = require("../models/Courses")
const BatchModel = require("../models/Batches")
const Router = require("express").Router()

Router.post("/Faculty/AddCourse",async (req,res)=>{
    const email = req.body.Email

    FacultyModel.findOneAndUpdate({
        Email:email
    },{
        $addToSet:{
            "TeachReq":{
                "Batch":req.body.Batch,
                "Year":req.body.Year,
                "Course":req.body.Course
            }
        }
    }).then((resp)=>{
        res.status(200).json(resp)
    }).catch(err=>{
        res.status(500).json(err)
    })

})

Router.post("/AddFaculty",async (req,res)=>{
    
    const fac = await FacultyModel.findOne({Email:req.body.Email})
    if(fac){
        res.status(400).body("banda hai already")
        return false
    }
    
    const newFac = new FacultyModel({
        UserName:req.body.UserName,
        PassWord:dcrypt.AES.encrypt(req.body.PassWord,"SecretKey").toString(),
        Email:req.body.Email,
        isAdmin:req.body.isAdmin
    })

    try {
        await newFac.save()
        res.status(200).json("faculty Created")
    } catch (error) {
        res.status(500).json(error)
    }
})

Router.post("/AddStudent",async (req,res)=>{
    const stu = await StudentModel.findOne({
        Email:req.body.Email
    })

    if(stu){
        res.status(400).json("user exists")
        return false
    }

    const newStu = new StudentModel({
        UserName:req.body.UserName,
        PassWord:dcrypt.AES.encrypt(req.body.PassWord,"SecretKey").toString(),
        Email:req.body.Email,
        Degree:req.body.Degree,
        Batch:req.body.Batch,
        Year:req.body.Year,
        TotalTuition:req.body.TotalTuition?req.body.TotalTuition:"0",
        AdditionalCharges:req.body.AdditionalCharges?req.body.AdditionalCharges:"0"
    })

    try{
        const usr = await newStu.save()
        res.status(200).json(usr)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

Router.post("/AddCourse", async (req,res)=>{
    const Course = new CourseModel({
        CourseName:req.body.CourseName,
        Batch:req.body.Batch,
        Year:req.body.Year,
        Degree:req.body.Degree
    })

    try{
        const crs = await Course.save()
        res.status(200).json(crs)
    }catch(err){
        res.status(500).json(err)
    }
})

Router.post("/AddBatches", async (req,res)=>{
    const Batch = new BatchModel({
        Year:req.body.Year,
        Degree:req.body.Degree,
        Batch:req.body.Batch
    })

    try{
        const bth = await Batch.save()
        res.status(200).json(bth)
    }catch(err){
        res.status(500).json(err)
    }
})

Router.post("/Batches/AddCourse",async (req,res)=>{
    try{
        const batch = await BatchModel.findOneAndUpdate({
            Year:req.body.Year,
            Batch:req.body.Batch,
            Degree:req.body.Degree
        },{
            $addToSet:{
                Courses:req.body.CourseName
            }
        })

        const Course = new CourseModel({
            CourseName:req.body.CourseName,
            Batch:req.body.Batch,
            Year:req.body.Year,
            Degree:req.body.Degree
        })

        const crs = await Course.save()
        res.status(200).json(crs)
    }catch(err){
        res.status(500).json(err)
    }
        
})

Router.post("/AddPayments",async (req,res)=>{
    StudentModel.findOneAndUpdate({
        Email:req.body.Email
    },{
        $set:{
            TotalTuition:req.body.TotalTuition,
            AdditionalCharges:req.body.AdditionalCharges
        }        
    },{
        multi:true,
        new:true
    }).then(resp=>{
        res.status(200).json(resp)
    }).catch(err=>{
        res.status(500).json(err)
    })
})
    
    module.exports = Router

