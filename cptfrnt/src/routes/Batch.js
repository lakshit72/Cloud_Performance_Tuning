import  {Cookies} from 'react-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/StudentPage.css'
import '../stylesheets/FacultyPage.css'
import "../stylesheets/RedirectsPage.css"
import { Difference, FormatListBulleted, School, Logout } from '@mui/icons-material'
import Axios from 'axios'

const Batch = () => {
    const cookie = new Cookies()
    const navigator = useNavigate()
    var [Prf,setPrf] = useState("");
    var [Name,setName] = useState("");
    var [Pos,setPos] = useState("");
    var [form,setForm] = useState(null);
    const [file,Setfile] = useState(null);
    const [crs,setcrs] = useState([]);

    const sideBarVar = [
        {
            icon:<Difference sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"Add Content",
            lnk:0
        },
        {
            icon:<FormatListBulleted sx={{fontSize:28}} style={{color:"#f0f0f0"}}/>,
            text:"List Batches",
            lnk:"/Batches"
        },
    ]

    const logOut = () => {
        navigator("/")
    }

    const clkHan = (e) =>{
        if(e.currentTarget.getAttribute("data-lnk-type") == 0){
            navigator("/Faculty")
            setForm(Forms[e.currentTarget.getAttribute("data-lnk-type")])
        }else{
            navigator(e.currentTarget.getAttribute("data-lnk-type"))
        }
    }

    const Forms = [
        <form className='formWrapper'>
            <div className='inpsCont'>
                <input type='text' placeholder='Batch' className='inps'></input>
                <input type='text' placeholder='Year' className='inps'></input>
                <input type='text'placeholder='Degree' className='inps full'></input>
                <input type='text'placeholder='Course Name' className='inps full'></input>
                <input type='file' className='inpfile' onChange={(e)=>{Setfile(e.target.files[0])}}></input>
            </div>
            <button type='button' className='subBtn' onClick={(e)=>{
                const inps = document.querySelectorAll(".inps")
                const frm = new FormData()
                frm.append("Batch",inps[0].value)
                frm.append("Year",inps[1].value)
                frm.append("Degree",inps[2].value)
                frm.append("CourseName",inps[3].value)
                frm.append("file",file)
                Axios.post("http://20.219.215.210:1000/FileUploads",frm).then(res=>{
                    window.alert("Content Added")
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

    const hdlClick = (e) => {
        cookie.set("batch",e.currentTarget.getAttribute("data-name-type"))
        navigator("/Batch")
    }

    useEffect(()=>{

        // Const varibles
        
        setPrf(cookie.get("user").data.prfPic?cookie.get("user").data.prfPic:"http://20.219.215.210:1000/Users/user1/2.png")
        setName(cookie.get("user").data.UserName)
        setPos("Faculty")

        const req = {
            "Degree":cookie.get("batch").data.Degree,
            "CourseName":cookie.get("batch").data.Course,
            "Year":cookie.get("batch").data.Year,
            "Batch":cookie.get("batch").data.Batch
        }

        Axios.post("http://20.219.215.210:1000/Faculty/GetCourse",req).then(res=>{
            setcrs(res)
        }).catch(err=>{
            console.log(err)
        })

    },[])
    return(
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
                                    <button type="button"  className={`sideOpns`} data-lnk-type={el.lnk} key={ind} onClick={clkHan}>
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
            <div className="crsTable">
                    {
                        crs.length>0?crs.map(el=>{
                            return(
                                <div className="crsContent">
                                    <div className="crsTitle">{el}</div>
                                </div>
                            )
                        }):"NO Content Available"
                    }
            </div>
        </div>
        </section>
    )
}

export default Batch