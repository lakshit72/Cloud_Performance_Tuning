import { useState, useEffect } from "react"
import { Cookies } from "react-cookie"
import Axios from "axios"
import "../stylesheets/RedirectsPage.css"
import SideBar from "../components/SideBar"
import {Dashboard , LibraryBooks, ContactMail} from '@mui/icons-material'
import { useNavigate } from "react-router-dom"

const RedirectsPage = () => {
    const [cont,setCont] = useState([]);
    const cookie = new Cookies();
    const navigate = useNavigate();
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");

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

    const hdleClick = (e) => {
        cookie.set("crsname",e.target.getAttribute("data-name-type"))
        navigate("/Course")
    }

    useEffect(()=>{

            // Const varibles
            Axios.get("http://localhost:5000/Student/Courses/"+cookie.get("user").data._id).then(res=>{
                setCont(res.data)
                console.log(cont)
            }).catch(err=>{
                console.log(err)
            })
            setPrf(cookie.get("user").data.prfPic?cookie.get("user").data.prfPic:"http://localhost:5000/Users/user1/2.png")
            setName(cookie.get("user").data.UserName)
            setPos(cookie.get("user").data.Degree)
        },[])

    return(
        <section className="redirectWrapper">
            <SideBar params={sideBarVar} />
            <div className="coursesCont">
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
            <div className="contntCont">
            {
                cont.length===0 ? "No data available":
                cont.map((el,ind)=>{
                    return(
                        <div className="csCont" key={ind}>
                            <div className="csTitle">{el}</div>
                            <div className="csButton"><button className="bnChild" data-name-type={el} onClick={hdleClick}>View</button></div>
                        </div>
                    )
                })
            }
            </div>
            </div>
        </section>
    )
}

export default RedirectsPage