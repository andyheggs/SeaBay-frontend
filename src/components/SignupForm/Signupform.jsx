//---------------------------------------------React Imports-----------------------------------------------// 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//

//--------------------------------------------Service Imports----------------------------------------------//
import * as authService from '../../services/authService';


const SignupForm = () => {

    const handleChange = () => {
        
    }

    return (
        <main>
            <h1>Welcome to your SignupForm</h1>
            <form>
                <label for="Input"></label>
                <input id="" type="text" value={} name="" onChange={handleChange}></input>
                <label for="Input"></label>
                <input id="" type="text" value={} name="" onChange={handleChange}></input>
                <label for="Input"></label>
                <input id="" type="text" value={} name="" onChange={handleChange}></input>
                <label for="Input"></label>
                <input id="" type="text" value={} name="" onChange={handleChange}></input>
                <label for="Input"></label>
                <input id="" type="text" value={} name="" onChange={handleChange}></input>
                <button></button>
            </form>
        </main>
    );

    
};    















//------------------------------------------------Exports--------------------------------------------------//

export default SignupForm;