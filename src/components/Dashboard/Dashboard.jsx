//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App'
import * as offerService from "../../../services/offerService"
import * as listingService from '../../../services/listingService'

//--------------------------------------------Service Imports----------------------------------------------//



const Dashboard = ({ handleDelete }) => {

    const user = useContext(AuthedUserContext)

    const [listings, setListings] = useState([])

    const [offers, setOffers] = useState([])

    const [displayedListing, setDisplayedListing] = useState("Loading")

    const populateListings = async (userListings) => {
        const returnValue = userListings.map(async (listingId) => {
            console.log("id", listingId)
            const returnValue = await listingService.getListingById(listingId._id)
            return returnValue
        })
        return Promise.all(returnValue)
    }

    const populateOffers = async (userOffers) => {
        const returnValue = userOffers.map(async (offerId) => {
            console.log("OFFEROEid", offerId)
            const returnValue = await offerService.getOfferFromId(offerId)
            return returnValue
        })
        return Promise.all(returnValue)
    }

    useEffect(() => {
        const getListings = async () => {
            console.log("TPYOT", user)
            console.log("effect", user.listings.length)
            if (user.listings.length > 0) {
                console.log("Runnign", user.listings)
                setListings(await populateListings(user.listings))
                console.log("Listing", listings)
            }
        }
        const getOffers = async () => {
            console.log("TPYOT", user)
            console.log("effect", user.offers.length)
            if (user.offers.length > 0) {
                console.log("Runnign", user.offers)
                setOffers(await populateOffers(user.offers))
                console.log("Listing", offers)
            }

        }
        getListings()
        // ! DISABLED UNTIL OFFER STUFF IS ADDED AS I CBA 
        // getOffers()
    }, [])

    const deleteFunction = async () => {
        await handleDelete(displayedListing._id)
        setDisplayedListing("Loading")
        setListings([])
        if (user.listings.length > 0) {
            console.log("Runnign", user.listings)
            setListings(await populateListings(user.listings))
            console.log("Listing", listings)
        }
    }

    let [overview, setOverview] = useState(true)

    const toggleOverview = () => {
        setOverview((overview) ? overview = false : overview = true)
    }
    console.log("listings len", listings)
    return (
        <main>
            <h1>Welcom to your Dashboard {user.username}</h1>
            <header>
                <div>
                    <h2 onClick={toggleOverview}>Your Listings</h2>
                </div>
                <div>
                    <h2 onClick={toggleOverview}>Your Offers</h2>
                </div>
            </header>
            <h1>Over - {String(overview)}</h1>
            {(overview) ?
                <div>
                    <div>
                        <h3>Your Listings</h3>
                        <div id="userListingsContainer">
                            {(!listings.length > 0) ?
                                <p>Looks like you don't have any listings. <Link to="/listings/create">CREATE LISTING</Link></p>
                                :
                                listings.map(listing => {
                                    return (
                                        <div onClick={() => { setDisplayedListing(listing) }}>
                                            <h5>{listing.boatName}</h5>
                                        </div>
                                    );

                                })}
                            {(displayedListing === "Loading") ?
                                <p>Loading Content</p>
                                :
                                <article>
                                    <header>
                                        <h2>{displayedListing.boatName}</h2>
                                        <p>
                                            {displayedListing.seller.username} posted on {new Date(displayedListing.listingCreated).toLocaleDateString()}
                                        </p>
                                    </header>
                                    <p>Make: {displayedListing.make}</p>
                                    <p>Model: {displayedListing.model}</p>
                                    <p>Price: £{displayedListing.price}</p>
                                    <Link to={`/listings/${displayedListing._id}/edit`}><div>EDIT LISTING</div></Link>
                                    <button onClick={deleteFunction}>DELETE LISTING</button>
                                </article>
                            }
                        </div>
                    </div>
                    <div>
                        <h3>Current Offers</h3>
                        {(displayedListing === "Loading") ?
                            <p>Loading Content</p>
                            :
                            <article>
                                {(displayedListing.offers && displayedListing.offers.length > 0) ?
                                    displayedListing.offers.map(() => {
                                        return <p>blah</p>
                                    })
                                    :
                                    <p>No Offers On This Listing</p>
                                }
                            </article>
                        }
                    </div>
                </div>
                :
                <div>
                    <h3>Your Offers</h3>
                    {(!offers.length > 0) ?
                        <p>Looks like you don't have any offers.</p>
                        :
                        offers.map((offer) => {
                            <div>
                                <h5>Offer For {offer}</h5>
                            </div>
                        })}
                </div>}
        </main>
    )
}












//------------------------------------------------Exports--------------------------------------------------//

export default Dashboard;






