import  {Cookies} from 'react-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/StudentPage.css'
import '../stylesheets/FacultyPage.css'
import SideBar from '../components/SideBar'
import { DomainAdd, GroupAdd, LibraryBooks } from '@mui/icons-material'
import img1 from '../assets/images/img3.png'

const FacultyPage = () => {
    const cookie = new Cookies()
    const navigator = useNavigate()
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");
    var [CurDate,setDate] = useState("");

    const sideBarVar = [
        {
            icon:<GroupAdd sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"List Batches",
            lnk:""
        },
        {
            icon:<GroupAdd sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Content",
            lnk:""
        },
        {
            icon:<DomainAdd sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Batches",
            lnk:""
        },{
            icon:<LibraryBooks sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Course",
            lnk:""
        }
        
    ]

    useEffect(()=>{

        // Const varibles
        const months = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"]
        
        setPrf(cookie.get("user").data.prfPic?cookie.get("user").data.prfPic:"http://localhost:5000/Users/user1/2.png")
        setName(cookie.get("user").data.UserName)
        setPos("Faculty")

        var date = new Date()
        setDate(months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear())
    },[])

    return(
        cookie.get("user")?(
        <section className='stdPageWrapper'>
            <SideBar params={sideBarVar} />
            <div className='contentPage'>
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
                <div className='formPage'>
                    
                </div>
            </div>
        </section>):navigator("/")
    )

}

export default FacultyPage