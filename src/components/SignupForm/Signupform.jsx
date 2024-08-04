//---------------------------------------------React Imports-----------------------------------------------// 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//

//--------------------------------------------Service Imports----------------------------------------------//
import * as authService from '../../services/authService';


const SignupForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState([""])
    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
    })

    const updateMessage = (error) => {
        setErrorMessage(error)
    }

    const handleChange = (event) => {
        setformData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newUserResponse = await authService.signup(formData)
            props.setUser(newUserResponse.user)
            navigate("/")
        } catch (error) {
            updateMessage(error.message)
        }
    }

    const {username, email, password, verifyPassword} = formData

    return (
        <main>
            <h1>Welcome to your SignupForm</h1>
            <form onSubmit={handleSubmit}>
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
                <button>Create Account</button>
            </form>
        </main>
    )

    
}















//------------------------------------------------Exports--------------------------------------------------//

export default SignupForm;