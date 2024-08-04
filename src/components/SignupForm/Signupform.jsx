//---------------------------------------------React Imports-----------------------------------------------// 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//

//--------------------------------------------Service Imports----------------------------------------------//
import * as authService from '../../services/authService';


const SignupForm = () => {

    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
    })

    const handleChange = () => {

    }

    const {username, email, password, verifyPassword} = formData

    return (
        <main>
            <h1>Welcome to your SignupForm</h1>
            <form>
                <div>
                <label for="usernameInput"></label>
                <input id="usernameInput" type="text" value={username} name="username" onChange={handleChange}></input>
                </div><div>
                <label for="emailInput"></label>
                <input id="emailInput" type="text" value={email} name="email" onChange={handleChange}></input>
                </div><div>
                <label for="passwordInput"></label>
                <input id="passwordInput" type="text" value={password} name="password" onChange={handleChange}></input>
                </div><div>
                <label for="passwordVerifyInput"></label>
                <input id="passwordVerifyInput" type="text" value={verifyPassword} name="verifyPassword" onChange={handleChange}></input>
                </div>
                <button></button>
            </form>
        </main>
    );

    
};    















//------------------------------------------------Exports--------------------------------------------------//

export default SignupForm;