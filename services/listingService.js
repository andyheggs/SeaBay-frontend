const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/listings`;

// * -------------------------------------FETCH ALL LISTINGS-------------------------------------//
export const getAllListings = async () => {

  // try block to handle potential err's 
  try {

    // fetch all lisitngs with GET request to BACKEND_URL
    const res = await fetch(BACKEND_URL, {

      headers: {

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

  // try block to handle potential errors
  try {
    
    // update an existing listing with PUT req to  BACKEND_URL with the specific listingId 
    const res = await fetch(`${BACKEND_URL}/${listingId}`, {

      // Set HTTP method to PUT
      method: 'PUT',

      headers: { 
        // Specify content type as JSON
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")}`
      },

      // Converting formData into a JSON string for req body
      body: JSON.stringify(formData),

    });

    // Parse response as JSON
    const data = await res.json();

    // Throw new err message
    if (data.error) throw new Error(data.error);

    // Return parsed data if no errors 
    return data;

  } catch (error) {
    // Logging errors to console
    console.log(error);

    // Throw new Error 
    throw new Error(error);
  }
};

// * -------------------------------------DELETE LISTINGS-------------------------------------//

export const deleteListing = async (listingId) => {

  // try block to handle potential errors
  try {

    // delete a listing with DELETE req to BACKEND_URL with the specific listingId  
    const res = await fetch(`${BACKEND_URL}/${listingId}`, {

      // Set HTTP method to DELETE
      method: 'DELETE',

      headers: { 
        // Specify content type as JSON
        'Content-Type': 'application/json' 
      },

    });

    // Check response status is not 204 (No Content)
    if (res.status !== 204) {
      
      // Parse response as JSON
      const data = await res.json();

      // throw ew err with  message
      if (data.error) throw new Error(data.error);
    }

    // Return nothing if deletion is successful
    return;

  } catch (error) {
    // Log err to console
    console.log(error);

    // Throw  new Error 
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
