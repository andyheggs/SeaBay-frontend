//---------------------------------------------React Imports-----------------------------------------------// 
import {useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom' 
import { AuthedUserContext } from '../../App'

//-------------------------------------------Component Imports---------------------------------------------//
import './ListingDetails.css'

//--------------------------------------------Service Imports----------------------------------------------//
import * as listingService from '../../../services/listingService'
import * as offerService from '../../../services/offerService'

// * LISTING DETAILS COMPONENT //

// fetche and display details of a specific listing:
const ListingDetails = () => {

    const user = useContext(AuthedUserContext)

    //Intialise 'id' from URL params    
    const { listingId } = useParams()

    //set state for lisitng
    const [listing, setListing] = useState(null)

    //set state for error handling
    const [error, setError] = useState('')


// Use Effect Hook to fetch listing details when component mounts, or id changes
    useEffect(() => {

        const fetchListing = async () => {

            try {

            //call backend to retrieve listing by id
            const data = await listingService.getListingById(listingId)

            //update listing state with fetched data
            setListing(data)

        } catch (error) {

            console.log(error)

            setError ('Error fetching lisiting details')
        }

    }        
    
    //intiate data fetch call
    fetchListing();
    
    },[listingId])

    // * COMPONENT RENDERING //

    return (

        <div>

            {/*Error handling */}

            {error && <p> {error}</p>}

            {/* render listing details */}

            {listing ? (

                 <div className="listing-details">

                    <img src={listing.vesselImage} alt={listing.boatName} />

                    <h1>{listing.boatName}</h1>

                    <p>Vessel Type: {listing.category}</p>

                    <p>Hull Type: {listing.hullType}</p>

                    <p>Make: {listing.make}</p>

                    <p>Model: {listing.model}</p>

                    <p>Length: {listing.length} ft</p>

                    <p>Age: {listing.age} years</p>

                    <p>Location: {`${listing.location.street}, ${listing.location.city}, ${listing.location.state}, ${listing.location.postcode}, ${listing.location.country}`}</p>

                    <p>Price: £{listing.price}</p>

                    <p>Description: {listing.description}</p>

                    <p>Additional Info:{listing.additionalInfo}</p>

                    <p>First Advertised:{listing.listingCreated}</p>

                    <p>Seller:{listing.seller.username}</p>

                    {user && <button onClick={handleMakeOffer}>Make an Offer</button>}

                </div>

                /* ....else awaiting data load */

                    ) : (

                        <p>Loading...</p>

                    )}

        </div>
    );
};

//------------------------------------------------Exports--------------------------------------------------//

export default ListingDetails;