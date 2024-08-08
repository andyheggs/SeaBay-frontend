//---------------------------------------------React Imports-----------------------------------------------// 
import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'
//---------------------------------------------Componenet Imports-----------------------------------------//
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import ListingList from './components/ListingList/ListingList'
import ListingDetails from './components/ListingDetails/ListingDetails'
import ListingForm from './components/ListingForm/ListingForm'
import OfferForm from './components/OfferForm/OfferForm'



//-----------------------------------------------Service Imports-----------------------------------------//
import * as authService from '../services/authService'
import * as listingService from '../services/listingService'
import * as offerService from '../services/offerService'

export const AuthedUserContext = createContext(null)

const App = () => {
  
  // Initialise useNavigate hook for routing
  const navigate = useNavigate()

  // State for storing authed user
  const [user, setUser] = useState(authService.getUser())

  // State for storing listings
  const [listings, setListings] = useState([]);

  // useEffect to fetch listings from the server when the component mounts
  useEffect(() => {

    const fetchListings = async () => {

      try {
        // Fetch all listings from the listing service
        const fetchedListings = await listingService.getAllListings();
        
        // Set the listings state with fetched data
        setListings(fetchedListings);
      } catch (error) {
        // Log errors if fetching listings fails
        console.log('Error fetching listings:', error)
      }
    };

    // Call the fetchListings function
    fetchListings();
  }, []);

  // Handler for signing out the user
  const handleSignout = () => {
    // Sign out using the authentication service
    authService.signout();
    
    // Set user state to null, effectively signing out the user in the UI
    setUser(null);
    
    // Navigate back to the landing page
    navigate('/');
  };

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

  const handleAddOffer = async (data) => {

    try {

      await offerService.createAnOffer(data)

      // Navigate to dashboard or offers page after successful creation
      navigate(`/profiles/${user._id}/dashboard`)

    } catch (error) {

      console.error('Error adding offer:', error)
    }
  };

  const handleUpdateOffer = async (id, data) => {

    try {
      
      await offerService.editAnOffer(id, data)

      // Navigate to dashboard or offers page after successful update
      navigate(`/profiles/${user._id}/dashboard`)

    } catch (error) {
      
      console.error('Error updating offer:', error)
    }
  };

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

                <Route path="/offers/create" element={<OfferForm handleAddOffer={handleAddOffer} handleUpdateOffer={handleUpdateOffer} />} />
                
                <Route path="/offers/edit/:offerId"element={<OfferForm handleAddOffer={handleAddOffer} handleUpdateOffer={handleUpdateOffer} />} />
                
              </>
              
              ):(
              
              <>
                <Route path="/profiles/signin" element={<SigninForm setUser={setUser} />} />

                <Route path="/profiles/signup" element={<SignupForm setUser={setUser} />} />
              </>
            )}

            <Route path="/" element={<Landing/>} />
            
            <Route path="/listings" element={<ListingList listings={listings} />} />

            <Route path="/listings/:listingId" element={<ListingDetails/>} />
            
          </Routes>
      
      </AuthedUserContext.Provider>
  )
}
//-----------------------------------------------Export-----------------------------------------------//
export default App
