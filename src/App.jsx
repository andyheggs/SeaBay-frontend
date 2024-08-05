//---------------------------------------------React Imports-----------------------------------------------// 
import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate, Router } from 'react-router-dom';

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

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    // Creates context so we can use create context on the user value
  <AuthedUserContext.Provider value={user}>
    <Navbar handleSignout={handleSignout}/>
    <Routes>
      {(user)?(<>
      <Route path="/profiles/:userId/dashboard" element={<Dashboard/>}></Route>
      <Route path="/listings/create" element={<ListingForm/>}></Route>
      </>):(<></>)}
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/profiles/signin" element={<SigninForm setUser={setUser}/>}></Route>
      <Route path="/profiles/signup" element={<SignupForm setUser={setUser}/>}></Route>
      <Route path="/listings" element={<ListingList/>}></Route>
      <Route path="/listings/:listingId" element={<ListingDetails/>}></Route>
      
    </Routes>
    </AuthedUserContext.Provider>
  );
}








//-----------------------------------------------Export-----------------------------------------------//
export default App
