//---------------------------------------------React Imports-----------------------------------------------// 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//

//--------------------------------------------Service Imports----------------------------------------------//
import * as authService from '../../../services/authService';

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState([""])
    const [formData, setformData] = useState({
        username: "",
        password: "",
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
            const userResponse = await authService.signin(formData)
            // updates the user value in app.jsx
            props.setUser(userResponse.user)
            // re-routes to the home directory
            navigate("/")
        } catch (error) {
            updateMessage(error.message)
        }
    }

    // Deconstructs the formData
    const {username, password} = formData

    const checkValidInput = () => {
        // Returns true if input's data is incorrect
        return !(username && password)
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
                <label htmlFor="passwordInput">Password</label>
                <input id="passwordInput" type="text" value={password} name="password" onChange={handleChange}></input>
                </div>
                <button disabled={checkValidInput()}>Sign In</button>
            </form>
        </main>
    )

    
}

//------------------------------------------------Exports--------------------------------------------------//

export default SigninForm;