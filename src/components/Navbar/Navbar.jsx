//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App';
import "./Navbar.css";

//--------------------------------------------Service Imports----------------------------------------------//

//--------------------------------------------Document Imports----------------------------------------------//
const Navbar = (props) => {

    // gets the user value from the Context in app.jsx
    const user = useContext(AuthedUserContext);

    // holds Display value for the drop down menu 
    const [burgerToggle, setBurgerToggle] = useState("none");

    // toggles gurgerToggle between "none" and "display"
    const toggleBurger = () => {
        setBurgerToggle((burgerToggle === "none") ? "block" : "none");
    }

    return (
        <div>
            <div className="DropDownContainer" onClick={toggleBurger}>
            {/* This is only here to act as a button to toggle the menu */}
            <svg className='HamBurger' width="30" height="30" viewBox="0 0 100 80" fill="#000">
        <rect width="100px" height="10px"></rect>
        <rect y="40" width="100px" height="10px"></rect>
        <rect y="80" width="100px" height="10px"></rect>
    </svg>
            <div style={{ display: burgerToggle }}>
                {(user)?
                <div>
                    <ul>
                        <li><Link to="/" ><span>Home</span></Link></li>
                        <li><Link to={`/profiles/${user._id}/dashboard`} ><span>Your Dashboard</span></Link></li>
                        <li>
                            <Link to="/" onClick={props.handleSignout} >
                            <span>Sign Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>:
                <div>
                    <ul>
                        <li><Link to="/" ><span>Home</span></Link></li>
                        <li><Link to="/profiles/signin" ><span>Sign In</span></Link></li>
                        <li><Link to="/profiles/signup" ><span>Sign Up</span></Link></li>
                    </ul>
                </div>}
            </div>
            </div>
            {/* Standalone link for Boat Listings */}
            <div className="standalone-link">
                <Link to="/listings">Boat Listings</Link>
            </div>
        </div>
    )
}

//------------------------------------------------Exports--------------------------------------------------//

export default Navbar;
