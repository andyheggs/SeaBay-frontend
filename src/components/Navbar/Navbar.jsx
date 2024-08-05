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

    const user = useContext(AuthedUserContext)

    const [burgerToggle, setBurgerToggle] = useState("none")

    const toggleBurger = () => {
        setBurgerToggle((burgerToggle === "none") ? "block" : "none")
    }

    return (
        <div>
            <p className="Marker" onClick={toggleBurger}>marker</p>
            <div id="DropDownContainer" style={{ display: burgerToggle }}>
                {(user)?
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>
                            <Link to="/hoots">Hoots</Link>
                        </li>
                        <li>
                            <Link to="" onClick={props.handleSignout}>
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>:
                <div>
                    <ul>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    )


}















//------------------------------------------------Exports--------------------------------------------------//

export default Navbar