import { useEffect, useState } from "react"
import SideBar from "../components/SideBar"
import "../stylesheets/StudentPage.css"
import img1 from "../assets/images/1.png"
import {Dashboard, Payment} from '@mui/icons-material'

const StudentPage = () => {
    // State Varibles
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");
    var [CurDate,setDate] = useState("");

    // Variables
    const sideBarVar = [
        {
            icon:<Dashboard sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"DashBoard",
            lnk:""
        },
        {
            icon:<Payment sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Payment Info",
            lnk:""
        }
    ]


    useEffect(()=>{

        // Const varibles
        const months = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"]

        setPrf("http://localhost:5000/Users/user1/2.png")
        setName("Lakshit Joshi")
        setPos("BTech CSE")

        var date = new Date()
        setDate(months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear())
    },[])
    

    return(
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

                                </div>
                                <div className="financePaid finCont">

                                </div>
                                <div className="financeLeft finCont">

                                </div>
                            </div>
                        </div>
                        <div className="financeCont">
                            <div className="financeTitle">Courses</div>
                            <div className="financeElements">
                                <div className="">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notifyCont">
                        <div className="notifyTitle">Notification Center</div>
                        <div className="notifyCenter"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentPage