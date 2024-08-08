//---------------------------------------------React Imports-----------------------------------------------// 
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


//-------------------------------------------Component Imports---------------------------------------------//
import ImageUpload from '../ImageUpload/ImageUpload';
import './ListingDetails.css'

//--------------------------------------------Service Imports----------------------------------------------//
import * as listingService from '../../../services/listingService'

// * LISTING DETAILS COMPONENT //

// fetche and display details of a specific listing:
const ListingDetails = () => {

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

                setError('Error fetching lisiting details')
            }

        }

        //intiate data fetch call
        fetchListing();

    }, [listingId])

    // * COMPONENT RENDERING //

    return (

        <div className='listing-container'>

            {/*Error handling */}

            {error && <p> {error}</p>}

            {/* render listing details */}

            {listing ? (

                <div className='listing-details'>


                    <h1>{listing.boatName}</h1>

                    <img className="vessel-image"  src={listing.vesselImage}></img>

                    <div className='details-group'>

                        <p className='price'>Price: <span>£{listing.price}</span></p>

                        <p>Seller:{listing.seller.username}</p>

                    </div>

                    <div className='split-div'>

                        <div className='details-group'>

                            <p>Vessel Type: {listing.category}</p>

                            <p>Hull Type: {listing.hullType}</p>

                            <p>Make: {listing.make}</p>

                            <p>Model: {listing.model}</p>

                            <p>Length: {listing.length} ft</p>

                        </div><div className='details-group'>

                            <p>Age: {listing.age} years</p>

                            <p>Location: {`${listing.location.street}, ${listing.location.city}, ${listing.location.state}, ${listing.location.postcode}, ${listing.location.country}`}</p>

                            <p>Description: {listing.description}</p>

                            <p>Additional Info: {listing.additionalInfo}</p>

                            <p>First Advertised: {listing.listingCreated.split("T")[0]}</p>

                        </div>

                    </div>

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