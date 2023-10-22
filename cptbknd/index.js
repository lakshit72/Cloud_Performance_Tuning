// Imports
const AdminRout = require("./routes/Admin")
const StudentRout = require("./routes/Student")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require("multer")
const env = require("dotenv")
const fs = require("fs")
const Courses = require("./models/Courses")
const FacultyRout = require("./routes/Faculty")
const FacultyModel = require("./models/FacultyModel")
const StudentModel = require("./models/StudentModel")

env.config()

// Instantiation
const routs = express();

// Cross Origin Request(Add Headers to requests)
routs.use(cors({
    origin:"*"
}))

//set application data type
routs.use(express.json())

// Connect to MongoDb
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo Connected")    
}).catch(err=>{
    console.log(err)
})

// Set folder with user content
routs.use("/Users",express.static("Users"));
// Set folder with CourseContent
routs.use("/Uploads",express.static("Uploads"));

//Application Routes
routs.use("/Admin",AdminRout)
routs.use("/Student",StudentRout)
routs.use("/Faculty",FacultyRout)

//Disk Handeling
const diskStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        const filePath = `Uploads/${req.body.Type+"/"+req.body.Batch+"_"+req.body.Degree+"_"+req.body.Year+"_"+req.body.CourseName}`
        if(!fs.existsSync(filePath)) fs.mkdirSync(filePath,{recursive:true})
        cb(null,filePath)
    },
    filename:(req,file,cb)=>{
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null,fileName)
    }
})

const uploadImage = multer({
    storage:diskStorage
})

//Handel File Uploads
routs.post("/FileUploads",uploadImage.single("file"),async (req,res)=>{
    if(!req.file) return res.status(400).json("No File Uploaded")

        Courses.findOneAndUpdate({
            CourseName:req.body.CourseName,
            Batch:req.body.Batch,
            Year:req.body.Year,
            Degree:req.body.Degree
        },{
            $addToSet:{
                Files:`${req.file.path}`
            }
        }).then(resp=>{
            res.status(200).json(resp)
            return true
        }).catch(err=>{
            res.status(500).json(err)
            return false
        })
})

const profileStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        const filePath = `Uploads/${req.body.Type+"/"+req.body.Email}`
        if(!fs.existsSync(filePath)) fs.mkdirSync(filePath,{recursive:true})
        cb(null,filePath)
    },
    filename:(req,file,cb)=>{
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null,fileName)
    }
})

const uploadfile = multer({
    storage:profileStorage
})

routs.post("/ProfileUploads",uploadfile.single("file"),async (req,res)=>{
    if(!req.file) return res.status(400).json("No File Uploaded")

    if(req.body.isFaculty){
        FacultyModel.findOneAndUpdate({
            Email:req.body.Email
        },{
            $set:{
                prfPic:`${req.file.path}`
            }
        },{
            new:true
        }).then(resp=>{
            res.status(200).json(resp)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }else{
        StudentModel.findOneAndUpdate({
            Email:req.body.Email
        },{
            $set:{
                prfPic:`${req.file.path}`
            }
        },{
            new:true
        }).then(resp=>{
            res.status(200).json(resp)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
})

// Start server at specified port
routs.listen(5000,()=>{
    console.log("Server Started");
});