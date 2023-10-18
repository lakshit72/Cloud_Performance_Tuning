import "../stylesheets/Navbar.css"
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
    return(
        <section className="navbarCont">
            <div className="appLogo"><SchoolIcon sx={{fontSize:40}} className="schoolIcon"/> Student Portal</div>
        </section>
    )
}

export default Navbar