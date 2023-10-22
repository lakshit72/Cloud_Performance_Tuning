const Router = require("express").Router()
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")
const FacultyModel = require("../models/FacultyModel")

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



module.exports = Router