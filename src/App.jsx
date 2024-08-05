//---------------------------------------------React Imports-----------------------------------------------// 
import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//---------------------------------------------Componenet Imports-----------------------------------------//
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import ListingList from './components/ListingList/ListingList';
import ListingDetails from './components/ListingDetails/ListingDetails';
import ListingForm from './components/ListingForm/ListingForm';

//-----------------------------------------------Service Imports-----------------------------------------//
import * as authService from '../services/authService';
import * as listingService from '../services/listingService';

export const AuthedUserContext = createContext(null);

const App = () => {

  const [user, setUser] = useState(null)

  return (<AuthedUserContext.Provider value={user}>
    <Navbar/>
    <h1>Hello {user?user.username : "New User"}!</h1>
    {/* Temp For testing purposes */}
    <SigninForm setUser={setUser}/>
    </AuthedUserContext.Provider>
  );
}








//-----------------------------------------------Export-----------------------------------------------//
export default App
