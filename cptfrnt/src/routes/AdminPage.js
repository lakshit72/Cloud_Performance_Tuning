import  {Cookies} from 'react-cookie'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import '../stylesheets/StudentPage.css'
import '../stylesheets/AdminPage.css'
import '../stylesheets/SideBar.css'
import { DomainAdd, GroupAdd, LibraryBooks, School, Logout } from '@mui/icons-material'
import img1 from '../assets/images/img4.png'
import Axios from 'axios'

const AdminPage = () => {
    const cookie = new Cookies()
    const navigator = useNavigate()
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");
    var [CurDate,setDate] = useState("");
    var [Form,setForm] = useState(null);

    const sideBarVar = [
        {
            icon:<GroupAdd sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Faculty",
            lnk:0
        },
        {
            icon:<GroupAdd sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Student",
            lnk:1
        },
        {
            icon:<DomainAdd sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Batches",
            lnk:2
        },{
            icon:<LibraryBooks sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Course",
            lnk:3
        },{
            icon:<LibraryBooks sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Course To Faculty",
            lnk:4
        }
        
    ]

    const Forms = [
        <form className='formWrapper'>
            <div className='inpsCont'>
                <input type='text' placeholder='Email' className='inps'></input>
                <input type='text' placeholder='Name' className='inps'></input>
                <input type='text'placeholder='Password' className='inps full'></input>
            </div>
            <button type='button' className='subBtn' onClick={(e)=>{
                const inps = document.querySelectorAll(".inps")
                const req = {
                    "Email":inps[0].value,
                    "PassWord":inps[2].value,
                    "UserName":inps[1].value,
                    "isAdmin":false
                }
                Axios.post("http://localhost:5000/Admin/AddFaculty",req).then(res=>{
                    window.alert("Faculty Added")
                    inps.forEach(el=>{
                        el.value=""
                    })
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }}>Submit</button>
        </form>,
        <form className='formWrapper'>
        <div className='inpsCont'>
            <input type='text' placeholder='Email' className='inps'></input>
            <input type='text' placeholder='Name' className='inps'></input>
            <input type='text' placeholder='Degree' className='inps'></input>
            <input type='text' placeholder='Batch' className='inps'></input>
            <input type='text' placeholder='Year' className='inps'></input>
            <input type='text' placeholder='Total Tuition' className='inps'></input>
            <input type='text' placeholder='Additional Charges' className='inps'></input>
            <input type='text'placeholder='Password' className='inps'></input>
        </div>
        <button type='button' className='subBtn' onClick={(e)=>{
            const inps = document.querySelectorAll(".inps")
            const req = {
                "Email":inps[0].value,
                "PassWord":inps[7].value,
                "UserName":inps[1].value,
                "Degree":inps[2].value,
                "Batch":inps[3].value,
                "Year":inps[4].value,
                "TotalTuition":inps[5].value,
                "AdditionalCharges":inps[6].value
            }
            Axios.post("http://localhost:5000/Admin/AddStudent",req).then(res=>{
                window.alert("Student Added")
                inps.forEach(el=>{
                    el.value=""
                })
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }}>Submit</button>
    </form>,
    <form className='formWrapper'>
    <div className='inpsCont'>
        <input type='text' placeholder='Year' className='inps'></input>
        <input type='text' placeholder='Degree' className='inps'></input>
        <input type='text'placeholder='Batch' className='inps full'></input>
    </div>
    <button type='button' className='subBtn' onClick={(e)=>{
        const inps = document.querySelectorAll(".inps")
        const req = {
            "Year":inps[0].value,
            "Batch":inps[2].value,
            "Degree":inps[1].value
        }
        Axios.post("http://localhost:5000/Admin/AddBatches",req).then(res=>{
            window.alert("Batch Added")
            inps.forEach(el=>{
                el.value=""
            })
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }}>Submit</button>
</form>,
<form className='formWrapper'>
<div className='inpsCont'>
    <input type='text' placeholder='Year' className='inps'></input>
    <input type='text' placeholder='Batch' className='inps'></input>
    <input type='text'placeholder='Degree' className='inps'></input>
    <input type='text'placeholder='Course Name' className='inps'></input>
</div>
<button type='button' className='subBtn' onClick={(e)=>{
    const inps = document.querySelectorAll(".inps")
    const req = {
        "Year":inps[0].value,
        "Degree":inps[2].value,
        "Batch":inps[1].value,
        "CourseName":inps[3].value
    }

    Axios.post("http://localhost:5000/Admin/Batches/AddCourse",req).then(res=>{
        window.alert("Course Added")
        inps.forEach(el=>{
            el.value=""
        })
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}}>Submit</button>
</form>,
<form className='formWrapper'>
<div className='inpsCont'>
    <input type='text' placeholder='Faculty Email' className='inps'></input>
    <input type='text' placeholder='Year' className='inps'></input>
    <input type='text'placeholder='Batch' className='inps'></input>
    <input type='text'placeholder='Degree' className='inps'></input>
    <input type='text'placeholder='Course Name' className='inps'></input>
</div>
<button type='button' className='subBtn' onClick={(e)=>{
    const inps = document.querySelectorAll(".inps")
    const req = {
        "Email":inps[0].value,
        "Batch":inps[2].value,
        "Year":inps[1].value,
        "Degree":inps[3].value,
        "Course":inps[4].value
    }
    Axios.post("http://localhost:5000/Admin/Faculty/AddCourse",req).then(res=>{
        window.alert("Course Added")
        inps.forEach(el=>{
            el.value=""
        })
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}}>Submit</button>
</form>
    ]

    const logOut = () => {
        navigator("/")
    }
    const clickHan = (e) => {
        const ind = e.currentTarget.getAttribute("data-lnk-type")
        setForm(Forms[ind])
    }

    useEffect(()=>{

        setForm(Forms[0])

        // Const varibles
        const months = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"]
        
        setPrf(cookie.get("user").data.prfPic?cookie.get("user").data.prfPic:"http://localhost:5000/Users/user1/2.png")
        setName(cookie.get("user").data.UserName)
        setPos("Admin")

        var date = new Date()
        setDate(months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear())
    },[])

    return(
        cookie.get("user")?(
        <section className='stdPageWrapper'>
            <section className="sidebarWrapper">
            <div className="sideCont">
                <div className="sideIcon">
                    <School sx={{fontSize:60}} />
                </div>
                <div className="sideOptions">
                    
                        {
                            sideBarVar.map((el,ind) => {
                                return(
                                    <button type="button"  className={`sideOpns`} data-lnk-type={el.lnk} key={ind} onClick={clickHan}>
                                            {el.icon}
                                        <div className="opnsText">{el.text}</div>
                                    </button>
                                    )
                            })
                        }
                </div>
                <div className="sideLogout" onClick={logOut}>
                        <Logout sx={{fontSize:28}} className="opnsIcon"/>
                        <div className="opnsText">LogOut</div>
                </div>
            </div>
        </section>
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
                        {
                            Form
                        }
                </div>
            </div>
        </section>):navigator("/")
    )
}

export default AdminPage