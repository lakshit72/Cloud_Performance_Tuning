import { Logout } from "@mui/icons-material";
import "../stylesheets/SideBar.css"
import SchoolIcon from '@mui/icons-material/School';

const SideBar = ({params}) => {
    return(
        <section className="sidebarWrapper">
            <div className="sideCont">
                <div className="sideIcon">
                    <SchoolIcon sx={{fontSize:60}} />
                </div>
                <div className="sideOptions">
                    
                        {
                            params.map(el => {
                                return(
                                    <>
                                    <div className="sideOpns">
                                            {el.icon}
                                        <div className="opnsText">{el.text}</div>
                                    </div>
                                    </>
                                    )
                            })
                        }
                </div>
                <div className="sideLogout">
                        <Logout sx={{fontSize:28}} className="opnsIcon"/>
                        <div className="opnsText">LogOut</div>
                </div>
            </div>
        </section>
    )
}

export default SideBar