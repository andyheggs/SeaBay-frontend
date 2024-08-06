//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState, use } from 'react'

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App'
import "./Navbar.css"

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