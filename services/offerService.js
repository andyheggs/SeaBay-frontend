const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getOfferFromId = async (offerId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/${offerId}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        const data = res.json()
        if (data.error) throw new Error(data.error)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
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
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const createAnOffer = async (formData) => {
    try {
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const editAnOffer = async (formData) => {
    try {
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const deleteAnOffer = async (offerId) => {
    try {
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


export {getOfferFromId, getOffersFromListing, getOffersFromUser, assessOffer, createAnOffer, editAnOffer, deleteAnOffer}