//---------------------------------------------React Imports-----------------------------------------------// 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//
import './SignupForm.css'
//--------------------------------------------Service Imports----------------------------------------------//
import * as authService from '../../../services/authService';

const SignupForm = (props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState([""])
    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
    })

    // Used to display error messages to the user
    const updateMessage = (error) => {
        setErrorMessage(error)
    }

    // For updating the input's text values
    const handleChange = (event) => {
        setformData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Runs user fetch from the services file
            const newUserResponse = await authService.signup(formData)
            // updates the user value in app.jsx
            props.setUser(newUserResponse.newUser)
            // re-routes to the home directory
            navigate("/")
        } catch (error) {
            updateMessage(error.message)
        }
    }

    // Deconstructs the formData
    const {username, email, password, verifyPassword} = formData

    const checkValidInput = () => {
        // Returns true if input's data is incorrect
        return !(username && email && password && password === verifyPassword)
    }

    return (
        <main>
            <h1>Welcome to your SignupForm</h1>
            <p id="errorMessage">{errorMessage}</p>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="usernameInput">Username</label>
                <input id="usernameInput" type="text" value={username} name="username" onChange={handleChange}></input>
                </div><div>
                <label htmlFor="emailInput">Email</label>
                <input id="emailInput" type="text" value={email} name="email" onChange={handleChange}></input>
                </div><div>
                <label htmlFor="passwordInput">Password</label>
                <input id="passwordInput" type="text" value={password} name="password" onChange={handleChange}></input>
                </div><div>
                <label htmlFor="passwordVerifyInput">Re-Type Password</label>
                <input id="passwordVerifyInput" type="text" value={verifyPassword} name="verifyPassword" onChange={handleChange}></input>
                </div>
                <button disabled={checkValidInput()}>Create Account</button>
            </form>
        </main>
    )

    
}

//------------------------------------------------Exports--------------------------------------------------//

export default SignupForm;