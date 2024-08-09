// backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

//-----------------------------GET OFFER BY ID------------------------------------------//

// Function to get an offer by its ID
const getOfferFromId = async (offerId) => {
    try {
        // Make a GET request to the backend to get the offer details
        const res = await fetch(`${BACKEND_URL}/offers/${offerId}`, {

            // HTTP method for fetching data
            method: "GET",  
            headers: {
                // Indicates that the request body format is JSON
                "Content-Type": "application/json",  
                // Authorisation token from local storage
                'authorization': `Bearer ${localStorage.getItem("token")}`  
            },
        })

        // Parse the JSON response
        const data = await res.json()

        // Throw error if response contains error 
        if (data.error) throw new Error(data.error)

        // Return parsed data
        return data

    } catch (error) {

        // Log the error to the console
        console.log(error)

        // Throw a new error to propagate it up the call stack
        throw new Error(error)
    }
}

// Fetch all offers for a specific listing
const getOffersByListingId = async (listingId) => {
    try {
        // Send a GET request to fetch offers by listing ID
      const res = await fetch(`${BACKEND_URL}/offers/listing/${listingId}`, {
        headers: {
                // Set the content type to JSON
          "Content-Type": "application/json",
                // Include authorisation token from localStorage
          'authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
        // Parse the response as JSON
      const data = await res.json();
        // If there is an error in the response, throw an error
      if (data.error) throw new Error(data.error);
        // Return the fetched data
      return data;
    } catch (error) {
        // Log any errors to the console
      console.log(error);
        // Re-throw the error for further handling
      throw new Error(error);
    }
  };

//!-----------------------------GET OFFER FORM USER------------------------------------------//

// Not Obsolete 
const getOffersFromUser = async (userId) => {
    console.log("CONSOOOLLLLL", userId)
    try {
        const res = await fetch(`${BACKEND_URL}/offers/user/${userId}`, {
            headers: {
                // Indicates that the request body format is JSON
                "Content-Type": "application/json",
                // Authorisation token from local storage
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        console.log(res)
        // Parse the JSON response
        const data = await res.json()

        // Throw error
        if (data.error) throw new Error(data.error)

        // Return parsed data
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

//---------------------------------ASSESS OFFER----------------------------------------------//

const assessOffer = async (offerId, rejected) => {

    try {
        // Make a PUT request to the backend to assess offer
        const res = await fetch(`${BACKEND_URL}/offers/assess/${offerId}?rejected:${rejected}`, {

            // HTTP method for updating data
            method: "PUT",
            headers: {
                // Indicates that the request body format is JSON
                "Content-Type": "application/json",
                // Authorisation token from local storage
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })

        // Parse the JSON response
        const data = await res.json()

        // Throw error
        if (data.error) throw new Error(data.error)

        // Return parsed data
        return data

    } catch (error) {

        // Log the error to the console
        console.log(error)

        // Throw a new error to propagate it up the call stack
        throw new Error(error)
    }
}

//---------------------------------CREATE OFFER----------------------------------------------//

// Function to create a new offer with given form data
const createAnOffer = async (formData) => {

    try {
        // Make a POST request to the backend to create  new offer
        const res = await fetch(`${BACKEND_URL}/offers/`, {

            // HTTP method for creating data
            method: "POST", 
            headers: {
                // Indicates that the request body format is JSON
                "Content-Type": "application/json",
                // Authorisation token from local storage
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },

            // Convert formData object to a JSON string to send in the request's body
            body: JSON.stringify(formData), 
        })

        // Parse the JSON response
        const data = await res.json()

        // Throw error if response contains error
        if (data.error) throw new Error(data.error)

        // Return parsed data
        return data

    } catch (error) {

        // Log the error to the console
        console.log(error)

        // Throw a new error to propagate it up the call stack
        throw new Error(error)
    }
}

//---------------------------------FORWARD OFFER----------------------------------------------//


//---------------------------------EDIT OFFER----------------------------------------------//

// Function to edit an existing offer with the given offer ID and form data
const editAnOffer = async (offerId, formData) => {

    try {
        // Make a PUT request to the backend to edit offer
        const res = await fetch(`${BACKEND_URL}/offers/${offerId}`, {

            // HTTP method for updating data
            method: "PUT",            
            headers: {
                // Indicates that the request body format is JSON
                "Content-Type": "application/json",
                // Authorisation token from local storage
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },

            // Convert formData object to a JSON string to send in the request's body
            body: JSON.stringify(formData),
        })

        // Parse the JSON response
        const data = await res.json()

        // Throw error if response contains error
        if (data.error) throw new Error(data.error)

        // Return parsed data
        return data

    } catch (error) {

        // Log the error to the console
        console.log(error)

        // Throw a new error to propagate it up the call stack
        throw new Error(error)
    }
}

//---------------------------------DELETE OFFER----------------------------------------------//

// Function to delete an offer by its ID
const deleteAnOffer = async (offerId) => {

    try {
        // Make a DELETE request to the backend to delete offer
        const res = await fetch(`${BACKEND_URL}/offers/${offerId}`, {

            // HTTP method for deleting data
            method: "DELETE",  
            headers: {
                // Indicates that the request body format is JSON
                "Content-Type": "application/json",  
                // Authorisation token from local storage
                'authorization': `Bearer ${localStorage.getItem("token")}`  
            },
        })

        // Parse the JSON response
        const data = await res.json()

        // Throw error if response contains error 
        if (data.error) throw new Error(data.error)

        // Return parsed data (deleted offer details)
        return data

    } catch (error) {

        // Log the error to the console
        console.log(error)

        // Throw a new error to propagate it up the call stack
        throw new Error(error)
    }
}


export { getOfferFromId, getOffersByListingId, getOffersFromUser, assessOffer, createAnOffer, editAnOffer, deleteAnOffer }