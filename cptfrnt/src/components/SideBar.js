import { Logout } from "@mui/icons-material";
import "../stylesheets/SideBar.css"
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from "react-router-dom";

const SideBar = ({params}) => {
    const navigate = useNavigate()
    const logOut = () => {
        navigate("/")
    }

    const hlClick = (e) =>{
        if(e.currentTarget.getAttribute("data-lnk-type") !== ""){
            navigate(e.currentTarget.getAttribute("data-lnk-type"))
        }
    }

    return(
        <section className="sidebarWrapper">
            <div className="sideCont">
                <div className="sideIcon">
                    <SchoolIcon sx={{fontSize:60}} />
                </div>
                <div className="sideOptions">
                    
                        {
                            params.map((el,ind) => {
                                return(
                                    <button type="button" onClick={hlClick} className="sideOpns" data-lnk-type={el.lnk} key={ind}>
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
    )
}

export default SideBar