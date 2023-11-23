import { useEffect, useState } from "react"
import SideBar from "../components/SideBar"
import "../stylesheets/StudentPage.css"
import img1 from "../assets/images/1.png"
import {Dashboard , LibraryBooks} from '@mui/icons-material'
import { Cookies } from "react-cookie"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const StudentPage = () => {
    // State Varibles
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");
    var [CurDate,setDate] = useState("");
    var [Courses,setCourses] = useState([]);
    const cookie = new Cookies()
    const navigator = useNavigate()
    
    // Variables
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
        }
        
    ]

    const handleClick = (e) => {
        cookie.set("crsname",e.target.getAttribute("data-name-type"))
        navigator("/Course")
    }

    useEffect(()=>{

        // Const varibles
        const months = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"]
        
        setPrf(cookie.get("user").data.prfPic?cookie.get("user").data.prfPic:"http://20.219.215.210:1000/Users/user1/2.png")
        setName(cookie.get("user").data.UserName)
        setPos(cookie.get("user").data.Degree)

        var date = new Date()
        setDate(months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear())

        Axios.get("http://20.219.215.210:1000/Student/Courses/"+cookie.get("user").data._id).then(res=>{
            setCourses(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    

    return(
        cookie.get("user")?(
        <section className="stdPageWrapper">
            <SideBar params={sideBarVar}/>
            <div className="contentPage">
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
                <div className="userInfoBanner">
                    <div className="bannerGreet">
                        <div className="bannerTime">{CurDate}</div>
                        <div className="bannerName">
                            Welcome Back, {Name}!
                        </div>
                        <div className="bannerPrompt">
                            Always Stay Updated in Your Student Portal
                        </div>
                    </div>
                    <div className="bannerImg" style={{backgroundImage:`url(${img1})`}}>
                    </div>
                </div>
                <div className="elementCont">
                    <div className="contentCont">
                        <div className="financeCont">
                            <div className="financeTitle">Finances</div>
                            <div className="financeElements">
                                <div className="financeTotal finCont">
                                    <div className="payTitle">Total Tuition</div>
                                    <div className="payVal">Rs.{parseInt(cookie.get("user").data.TotalTuition)}</div>
                                </div>
                                <div className="financePaid finCont">
                                    <div className="payTitle">Additional Charges</div>
                                    <div className="payVal">Rs.{parseInt(cookie.get("user").data.AdditionalCharges)}</div>
                                </div>
                                <div className="financeLeft finCont">
                                    <div className="payTitle">Total Charges</div>
                                    <div className="payVal">Rs.{parseInt(cookie.get("user").data.TotalTuition)+parseInt(cookie.get("user").data.AdditionalCharges)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="financeCont">
                            <div className="financeTitle">Courses</div>
                            <div className="financeElements">
                                {Courses.length===0?"No Courses Enrolled":
                                    Courses.map((el,ind)=>{
                                        if(ind<3){
                                            return(
                                            <div className="crsCont" key={ind}>
                                                <div className="crsTitle">{el}</div>
                                                <div className="crsButton"><button className="btnChild" data-name-type={el} onClick={handleClick}>View</button></div>
                                            </div>
                                        )
                                    }else{
                                        return true
                                    }
                                    })
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="notifyCont">
                        <div className="notifyTitle">Notification Center</div>
                        <div className="notifyCenter"></div>
                    </div>
                </div>
            </div>
        </section>):navigator("/")
        )
}

export default StudentPage