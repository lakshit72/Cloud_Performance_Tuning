const FacultyModel = require("../models/FacultyModel")
const dcrypt = require("crypto-js")
const StudentModel = require("../models/StudentModel")
const CourseModel = require("../models/Courses")
const BatchModel = require("../models/Batches")
const Router = require("express").Router()

Router.post("/Faculty/AddCourse",async (req,res)=>{
    const id = req.body._id

    FacultyModel.findOneAndUpdate({
        _id:id
    },{
        $addToSet:{
            "TeachReq":{
                "Batch":req.body.Batch,
                "Year":req.body.Year,
                "Course":req.body.Course
            }
        }
    }).then((resp)=>{
        console.log(resp.TeachReq)
        res.status(200).json("less gooo")
    }).catch(err=>{
        console.log(err)
        res.status(500).json("Noooooo")
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
        Year:req.body.Year
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
        CourseName:req.body.CourseName
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

module.exports = Router

