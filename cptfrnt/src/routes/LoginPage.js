import { useState } from "react"
import "../stylesheets/LoginPage.css"
import  Axios  from "axios"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const LoginPage = () => {
    const [UserName,SetUserName] = useState("")
    const [PassWord,SetPassword] = useState("")
    const [cookie,setCookie,removeCookies] = useCookies(["user"])
    
    if(cookie.user && cookie.user.data.UserName) removeCookies("user")

    const navigate = useNavigate()

    const handelClick = () => {
        const request = {
            "Email":UserName,
            "PassWord":PassWord
        }

        if(UserName.includes("@stumail.com")){
            Axios.post("http://localhost:5000/Student/Login",request).then(response => {
                setCookie("user",response)
                navigate("Student")
            }).catch(err=>{
                console.log(err)
            })
        }else if(UserName.includes("@facmail.com")){
            Axios.post("http://localhost:5000/Faculty/Login",request).then(response => {
                setCookie("user",response)
                if(response.data.isAdmin){
                    navigate("Admin")
                }else{
                    navigate("Faculty")
                }
            }).catch(err=>{
                console.log(err)
            })
        }

        

    }

    return(
            <div className="loginContWrapper">
                <div className="loginContentCont">
                    <div className="loginInpCont">
                        <div className="loginTitle">Login</div>
                        <p className="loginDesc">Enter Your Account Details</p>
                        <div className="loginDeets">
                            <input type="text" className="textfeilds" placeholder="Email" onChange={(e)=>SetUserName(e.target.value)}></input>
                            <input type="password" className="textfeilds" placeholder="PassWord" onChange={(e)=>SetPassword(e.target.value)}></input>
                        </div>
                        <button type="button" onClick={handelClick} className="btnClass loginBtn">
                            Login
                        </button>
                    </div>
                </div>
                <div className="loginImgCont">
                    <div className="imgTitlecont">
                        Welcome To The <br></br>
                        Student Portal
                        <div className="imgTitledesc">Login to access your Account</div>
                    </div>
                    <div className="imgCont">

                    </div>
                </div>
            </div>
    )
}

export default LoginPage