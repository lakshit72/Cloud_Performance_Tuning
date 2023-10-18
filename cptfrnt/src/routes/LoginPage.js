import "../stylesheets/LoginPage.css"

const LoginPage = () => {
    return(
            <div className="loginContWrapper">
                <div className="loginContentCont">
                    <div className="loginInpCont">
                        <div className="loginTitle">Login</div>
                        <p className="loginDesc">Enter Your Account Details</p>
                        <div className="loginDeets">
                            <input type="text" className="textfeilds" placeholder="Sabhyasachi"></input>
                            <input type="text" className="textfeilds" placeholder="Sabhyasachi"></input>
                        </div>
                        <button type="button" className="btnClass loginBtn">
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