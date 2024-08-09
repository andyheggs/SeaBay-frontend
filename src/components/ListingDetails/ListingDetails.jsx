//---------------------------------------------React Imports-----------------------------------------------// 
import {useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom' 
import { AuthedUserContext } from '../../App'

//-------------------------------------------Component Imports---------------------------------------------//
import './ListingDetails.css'
import OfferForm from '../OfferForm/OfferForm'
//--------------------------------------------Service Imports----------------------------------------------//
import * as listingService from '../../../services/listingService'
import * as offerService from '../../../services/offerService'

// -----------------------------------* LISTING DETAILS COMPONENT ----------------------------------------- //

// fetche and display details of a specific listing:
const ListingDetails = () => {

    const user = useContext(AuthedUserContext)
    
    // Add navigate hook
    const navigate = useNavigate() 

    //Intialise 'id' from URL params    
    const { listingId } = useParams()

    //set state for lisitng
    const [listing, setListing] = useState(null)

    //set state for error handling
    const [error, setError] = useState('')

    // Set state to handle offer form visibility
    const [showOfferForm, setShowOfferForm] = useState(false)


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

    // -----------------------------------* OFFER DETAILS COMPONENT ----------------------------------------- //

    // Function to handle the offer button click. Toggle OfferForm visibility.
    const handleMakeOffer = () => {setShowOfferForm(true)}

    // Handler to add an offer
    const handleAddOffer = async (offerData) => {

        try {
            // Create offer using offerService
            await offerService.createAnOffer({

                ...offerData,
                // Add listingId to the offer data
                listing: listingId, 
                // Add user ID to the offer data
                user: user._id 
            })

            // Navigate back to the listing details page after offer creation
            navigate(`/profiles/${user._id}/dashboard`)

        } catch (error) {

            // Log the error if the offer creation fails
            console.error('Error adding offer:', error)
        }
    }

// -----------------------------------*  COMPONENT RENDERING ----------------------------------------- //

    return (

        <div className='listing-container'>

            {/*Error handling */}

            {error && <p> {error}</p>}

            {/* render listing details */}

            {listing ? (

                <div className='listing-details'>


                    <h1>{listing.boatName}</h1>

                    <img className="vessel-image"  src={listing.vesselImage} alt={listing.vesselImage}></img>

                    <div className='details-group'>

                        <p className='price'>Price: <span>£{listing.price}</span></p>

                        <p>Seller: {listing.seller.username}</p>

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

                     {/* render offer form or sign-up message */}
                     
                     {user ? (
                        <>
                            {!showOfferForm && (
                                <button onClick={handleMakeOffer}>Make an Offer</button>
                            )}
                            {showOfferForm && (
                                <OfferForm handleAddOffer={handleAddOffer} />
                            )}
                        </>
                    ) : (
                        <p>
                            You must <Link to="/profiles/signup">sign up</Link> or <Link to="/profiles/signin">sign in</Link> to make an offer.
                        </p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
};

//------------------------------------------------Exports--------------------------------------------------//

export default ListingDetails;