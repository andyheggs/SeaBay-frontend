//---------------------------------------------React Imports-----------------------------------------------// 
import {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' 

//-------------------------------------------Component Imports---------------------------------------------//


//--------------------------------------------Service Imports----------------------------------------------//
import listingService from '../../services/listingService'

// * LISTING DETAILS COMPONENT //

// fetche and display details of a specific listing:
const ListingDetails = () => {

    //Intialise 'id' from URL params    
    const { id } = useParams()

    //set state for lisitng
    const [listing, setListing] = useState(null)

    //set state for error handling
    const [error, setError] = useState('')


// Use Effect Hook to fetch listing details when component mounts, or id changes
    useEffect(() => {

        const fetchListing = async () => {

            try {

            //call backend to retrieve listing by id
            const data = await listingService.getListingById(id)

            //update listing state with fetched data
            setListing(data)

        } catch (error) {

            console.log(error)

            setError ('Error fetching lisiting details')
        }

    }        
    
    //intiate data fetch call
    fetchListing();
    
    },[id])

    // * COMPONENT RENDERING //

    return (

        <div>

            {/*Error handling */}

            {error && <p> {error}</p>}

            {/* render listing details */}

            {listing ? (

                <div>

                    <h1>{listing.boatName}</h1>

                    <p>Vessel Type: {listing.category}</p>

                    <p>Hull Type: {listing.hullType}</p>

                    <p>Make: {listing.make}</p>

                    <p>Model: {listing.model}</p>

                    <p>Length: {listing.length} ft</p>

                    <p>Age: {listing.age} years</p>

                    <p>Location: {`${listing.location_street}, ${listing.location_city}, ${listing.location_state}, ${listing.location_postcode}, ${listing.location_country}`}</p>

                    <p>Price: £{listing.price}</p>

                    <p>Description: {listing.description}</p>

                    <p>Additional Info:{listing.additionalInfo}</p>

                    <p>First Advertised:{listing.listingCreated}</p>

                    <p>Seller:{listing.seller.username}</p>

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