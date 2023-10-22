const Router = require("express").Router()
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")
const StudentModel = require("../models/StudentModel")
const BatchSchema = require("../models/Batches")

Router.post("/Login",async (req,res)=>{
    try{
        const usr = await StudentModel.findOne({
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
            isAdmin:false,
            isFaculty:false
        },"SecretKey",{
            expiresIn:"3d"
        })
        
        res.status(200).json(usr)
    }catch(err){
        res.status(500).json(err)
    }
        
})

Router.get("/Courses/:id",async (req,res)=>{
    try{
        const usr = await StudentModel.findById(req.params.id)
        const Batch = await BatchSchema.findOne({
            Year:usr.Year,
            Degree:usr.Degree,
            Batch:usr.Batch
        })
        if(!Batch){
            res.status(404).json("no batch found")
        }

        let Courses = Batch.Courses

        res.status(200).json(Courses)
    }catch(err){
        res.status(500).json(err)
    }
})

Router.get("/Payments/:id",async (req,res)=>{
    try{
        const usr = await StudentModel.findById(req.params.id)
        const response = {
            "TotalTuition":usr.TotalTuition,
            "AdditionalCharges":usr.AdditionalCharges
        }
        res.status(200).json(response)
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = Router