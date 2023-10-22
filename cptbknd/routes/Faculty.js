const Router = require("express").Router()
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")
const FacultyModel = require("../models/FacultyModel")
const Courses = require("../models/Courses")

Router.post("/Login",async (req,res)=>{
    try{
        const usr = await FacultyModel.findOne({
            Email:req.body.Email
        })
        if(!usr) {
            res.status(401).json("Invalid Email")
            return false
        }

        
        const hashPass = CryptoJs.AES.decrypt(usr.PassWord,"SecretKey").toString(CryptoJs.enc.Utf8)
        
        if(hashPass !== req.body.PassWord){
            res.status(400).json("incorrect Password")
            return false
        }
        
        const jwtToken = jwt.sign({
            _id:usr._id,
            UserName:usr.UserName,
            isAdmin:Boolean.valueOf(usr.isAdmin),
            isFaculty:true
        },"SecretKey",{
            expiresIn:"3d"
        })

        res.status(200).json(usr)
    }catch(err){
        res.status(500).json(err)
    }
})

Router.get("/GetBatches/:id",async (req,res)=>{
    try{
        const fac = await FacultyModel.findById(req.params.id)
        res.status(200).json(fac.TeachReq)
    }catch(err){
        res.status(500).json(err)
    }
})

Router.post("/GetCourse",async (req,res)=>{
    try{
        const crs = await Courses.findOne({
            CourseName:req.body.CourseName,
            Batch:req.body.Batch,
            Year:req.body.Year,
            Degree:req.body.Degree
        })
        res.status(200).json(crs.Files)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = Router