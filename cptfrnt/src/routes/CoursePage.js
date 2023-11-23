import SideBar from "../components/SideBar"
import "../stylesheets/CoursePage.css"
import {Dashboard , LibraryBooks, ContactMail} from '@mui/icons-material'
import Axios from "axios"
import { useEffect, useState } from "react"
import { Cookies } from "react-cookie"

const CoursePage = () =>{
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");
    var [crs,Setcrs] = useState([]);
    const cookie = new Cookies();

    const sideBarVar = [
        {
            icon:<Dashboard sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"DashBoard",
            lnk:"/Student"
        },
        {
            icon:<LibraryBooks sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Courses",
            lnk:"/Courses"
        },{
            icon:<ContactMail sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Student Info.",
            lnk:"/Info"
        }
        
    ]

    useEffect(()=>{
 
        setPrf(cookie.get("user").data.prfPic?cookie.get("user").data.prfPic:"http://20.219.215.210:1000/Users/user1/2.png")
        setName(cookie.get("user").data.UserName)
        setPos(cookie.get("user").data.Degree)
 
        const req = {
            "Degree":cookie.get("user").data.Degree,
            "CourseName":cookie.get("crsname"),
            "Year":cookie.get("user").data.Year,
            "Batch":cookie.get("user").data.Batch
        }

        Axios.post("http://20.219.215.210:1000/Student/GetCourse",req).then(res=>{
            console.log(res)
            Setcrs(res.data)
        }).catch(err=>{
            console.log(err)
        })

    },[])

    return(
        <section className="courseWrapper">
            <SideBar params={sideBarVar} />
            <div className="CourseCont">
                <div className="userProfile">
                    <div className="profileCont">
                        <div className="profileImg">
                            <img src={Prf} alt="profile pic"></img>
                        </div>
                        <div className="profileName">
                            <div className="userName">{Name}</div>
                            <div className="userPosition">{Pos}</div>
                        </div>
                    </div>
                </div>
                <div className="crsTable">
                    {
                        crs.length>0?crs.map(el=>{
                            return(
                                <div className="crsContent">
                                    <a className="crsTitle" target="_blank" href={`http://20.219.215.210:1000/${el}`}>{el}</a>
                                </div>
                            )
                        }):"NO Content Available"
                    }
                </div>
            </div>
        </section>
    )
}

export default CoursePage