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

  const [user, setUser] = useState(authService.getUser())

  const handleSignout = () => {
    authService.signout()
    setUser(null)
    navigate('/')
  };

  const navigate = useNavigate()
  
  
  const handleAddListing = async (formData) => {

    try {

      // Create the listing
      const newListing = await listingService.createListing(formData)

      // Updating user's listings
      setUser({...user, listings: [...user.listings, newListing._id]})

      // Navigate to the newly created listing's details page
      navigate(`/listings/${newListing._id}`)

    } catch (error) {
      // Log the error if the listing creation fails
      console.log(error);
    }
  };

  const handleUpdateListing = async (listingId, formData) => {
    try {
      // Update existing listing
      await listingService.updateListing(listingId, formData)

      // Navigate to updated listing's details page
      navigate(`/listings/${listingId}`);

    } catch (error) {
      // Log the error if the listing update fails
      console.log(error);
    }
  }

  const handleDelete = (listingId) => {
    listingService.deleteListing(listingId)
    setUser(user.listings.splice(user.listings.index(listingId), 1) )
  }

  return (
    // Creates context so we can use create context on the user value
    <AuthedUserContext.Provider value={user}>

        <Navbar handleSignout={handleSignout}/>

          <Routes>

            {(user)?(
              <>
                <Route path="/profiles/:userId/dashboard" element={<Dashboard />} />

                <Route path="/listings/create" element={<ListingForm handleAddListing={handleAddListing}/>} />

                <Route path="/listings/:listingId/edit" element={<ListingForm handleUpdateListing={handleUpdateListing} />} />

                </>
              
              ):(
              
              <>
                <Route path="/profiles/signin" element={<SigninForm setUser={setUser} />} />

                <Route path="/profiles/signup" element={<SignupForm setUser={setUser} />} />
              </>
            )}

            <Route path="/" element={<Landing/>} />
            
            <Route path="/listings" element={<ListingList/>}></Route>

            <Route path="/listings/:listingId" element={<ListingDetails/>}></Route>
            
          </Routes>
      
      </AuthedUserContext.Provider>
  );
}
//-----------------------------------------------Export-----------------------------------------------//
export default App
