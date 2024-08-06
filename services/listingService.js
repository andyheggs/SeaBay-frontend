// import { getToken } from './authService.js';

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/listings`;

// * -------------------------------------FETCH ALL LISTINGS-------------------------------------//
export const getAllListings = async () => {

  // try block to handle potential err's 
  try {

    // fetch all lisitngs with GET request to BACKEND_URL
    const res = await fetch(BACKEND_URL, {

      headers: {

        // Add Auth header and bearer token from getToken()
        Authorization: `Bearer ${getToken()}`,

        // Specify content type as JSON
        'Content-Type': 'application/json',
      },

    });
    
    // Parse response as JSON
    const data = await res.json();
    
    // If the data contains an err, throw new err message
    if (data.error) throw new Error(data.error);
    
    // Return parsed data if no err present
    return data;
    
  } catch (error) {
    // Log errors to the console

    console.log(error);
    
    // Throw a new Error 
    throw new Error(error);
  }
};

// * -------------------------------------FETCH SINGLE LISTINGS-------------------------------------//

export const getListingById = async (listingId) => {
  
  // try block to handle potential errors
  try {
    
    // fetch a single listing with GET request to BACKEND_URL with the specific listingId  
    const res = await fetch(`${BACKEND_URL}/${listingId}`, {
      
      headers: {
        
        // Add Auth header with bearer token obtained from getToken()
        Authorization: `Bearer ${getToken()}`,
        
        // Specifying content type as JSON
        'Content-Type': 'application/json',
      },
    });

    // Parse response as JSON
    const data = await res.json();
    
    // If the data contains an error, throw a new Error with the message
    if (data.error) throw new Error(data.error);
    
    // Return parsed data if no errors are present
    return data;
    
  } catch (error) {
    // Logging any errors that occur to the console
    console.log(error);
    
    // Throw a new Error 
    throw new Error(error);
  }
};

// * -------------------------------------CREATE LISTING-------------------------------------//
export const createListing = async (formData) => {

  try {
    // Send POST request to the BACKEND_URL to create a new listing
    const res = await fetch(BACKEND_URL, {

      // Setting the HTTP method to POST  
      method: 'POST', 
      
      headers: {

        // Adding Authorisation header with a bearer token obtained from getToken()
        Authorization: `Bearer ${getToken()}`,

        // Specify content as JSON
        'Content-Type': 'application/json',
      },
      // Converting formData into a JSON string for the request body
      body: JSON.stringify(formData),
    });

    // Parse the response as JSON
    const data = await res.json();

    // If the data contains an error, throw a new Error with the message
    if (data.error) throw new Error(data.error);

    // Return parsed data if no errors are present
    return data;

  } catch (error) {
    // Logging any errors that occur to the console
    console.log(error);

    // Throw a new Error 
    throw new Error(error);
  }
};

// * -------------------------------------UPDATE LISTING-------------------------------------//
export const updateListing = async (listingId, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/${listingId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// * -------------------------------------DELETE LISTINGS-------------------------------------//
export const deleteListing = async (listingId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/${listingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 204) {
      const data = await res.json();
      if (data.error) throw new Error(data.error);
    }
    return;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// * -------------------------------------EXPORT LISTINGS-------------------------------------//
export default {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
