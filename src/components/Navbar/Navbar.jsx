//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState, use } from 'react';

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App';
import "./Navbar.css"

//--------------------------------------------Service Imports----------------------------------------------//

//--------------------------------------------Document Imports----------------------------------------------//
    const burgerElement = document.getElementById("DropDownContainer")

const Navbar = (props) => {
    
    const user = useContext(AuthedUserContext)

    const [burgerToggle, setBurgerToggle] = useState("none")

    const toggleBurger = () => {
        setBurgerToggle((burgerToggle === "none")? "block" : "none")
    }

    return (
        <div>
            <p className="Marker" onClick={toggleBurger}>marker</p>
            <div id="DropDownContainer" style={{display:burgerToggle}}>
                <h3>Welcome to your Navbar</h3>
            </div>
        </div>
    );

    
};    















//------------------------------------------------Exports--------------------------------------------------//

export default Navbar;