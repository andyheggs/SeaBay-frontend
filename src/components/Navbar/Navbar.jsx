//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState, use } from 'react'

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App'
import "./Navbar.css"
//import to enable boat placeholder on profile navbar if needed
// import profilePlaceholder from '../../assets/profile-image-placeholder.jpg'
//--------------------------------------------Service Imports----------------------------------------------//

//--------------------------------------------Document Imports----------------------------------------------//
const burgerElement = document.getElementById("DropDownContainer")

const Navbar = (props) => {

    // gets the user value from the Context in app.jsx
    const user = useContext(AuthedUserContext)

    // holds Display value for the drop down menu 
    const [burgerToggle, setBurgerToggle] = useState("none")

    // toggles gurgerToggle between "none" and "display"
    const toggleBurger = () => {
        setBurgerToggle((burgerToggle === "none") ? "block" : "none")
    }

    // Assign profile image to either the user's profile image or default placeholder image.
    // If user.profileImage is not available, profilePlaceholder will be used instead.
    // const profileImage = user?.profileImage || profilePlaceholder

    return (
        <div>
            {/* This is only here to act as a button to toggle the menu */}
            <p className="Marker" onClick={toggleBurger}>Temp Menu Marker</p>
            <div id="DropDownContainer" style={{ display: burgerToggle }}>
                {(user)?
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to={`/profiles/${user._id}/dashboard`}>Your Dashboard</Link></li>
                        <li>
                            <Link to="" onClick={props.handleSignout}>
                                Sign Out
                            </Link>
                        </li>
                        <li>
                            {/* div displays user's profile image in navbar */}
                            {/* backgroundImage style dynamically sets the image URL to either user's profile image or placeholder */}
                        {/* <div className='profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div> */}
                        </li>
                    </ul>
                </div>:
                <div>
                    <ul>
                    <li><Link to="/">Home</Link></li>
                        <li>
                            <Link to="/profiles/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/profiles/signup">Sign Up</Link>
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    )


}















//------------------------------------------------Exports--------------------------------------------------//

export default Navbar