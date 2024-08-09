const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getOfferFromId = async (offerId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/offers/${offerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        const data = res.json()
        if (data.error) throw new Error(data.error)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// Fetch all offers for a specific listing
export const getOffersByListingId = async (listingId) => {
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


// Maybe Obsolete 
const getOffersFromListing = async (listingId) => {
    try {

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
// Maybe Obsolete 
const getOffersFromUser = async (userId) => {
    try {

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const assessOffer = async (rejected) => {
    try {
        const res = await fetch(`${BACKEND_URL}/offers/assess/${offerId}?rejected:${rejected}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        const data = res.json()
        if (data.error) throw new Error(data.error)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const createAnOffer = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/offers/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json()
        if (data.error) throw new Error(data.error)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const editAnOffer = async (offerId, formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/offers/${offerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json()
        if (data.error) throw new Error(data.error)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const deleteAnOffer = async (offerId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/offers/${offerId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        const data = res.json()
        if (data.error) throw new Error(data.error)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


export { getOfferFromId, getOffersFromListing, getOffersFromUser, assessOffer, createAnOffer, editAnOffer, deleteAnOffer }