//---------------------------------------------React Imports-----------------------------------------------// 
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//-------------------------------------------Component Imports---------------------------------------------//
import { AuthedUserContext } from '../../App'
import * as offerService from "../../../services/offerService"
import * as listingService from '../../../services/listingService'

//--------------------------------------------Service Imports----------------------------------------------//



const Dashboard = () => {

    const user = useContext(AuthedUserContext)

    const [listings, setListings] = useState([])

    const [offers, setOffers] = useState([])

    useEffect(() => {
        const populateListings = (userListings) => { userListings.map((listingId) => { listingService.getListingById(listingId) }) }
        const populateOffers = (listingOffers) => { listingOffers.map((offerId) => { offerService.getOfferFromId(offerId) }) }
        if (!user.listings.length === 0) {
            setListings(populateListings(listings))
            setOffers(populateOffers(offers))
        }
    }, [])

    const [overview, setOverview] = useState(true)

    const toggleOverview = () => {
        setOverview((overview)?overview = false : overview=true)
    }

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
            <h1>{overview}</h1>
            <div>
                <h3>Your Listings</h3>
                <div id="userListingsContainer">
                    {(listings.length === 0) ?
                        <p>Looks like you don't have any listings. <Link to="/listings/create">CREATE LISTING</Link></p> :
                        user.listings.map(() => {
                            return
                            // ! Needs code for the item layout 
                        })}
                </div>
            </div>
            <div>
                <h3>Current Offers</h3>
                <div>
                    {(offers.length === 0) ?
                        <p>Looks like you don't have any Offers on this listing.</p> :
                        user.offers.map(() => {
                            return
                            //  ! IHAVE NO IDEAS FOR THE CODE THAT NEED TO GO HERE I'LL DEAL WITH IT LATER
                        })}
                </div>
            </div>
        </main>
    )
}












//------------------------------------------------Exports--------------------------------------------------//

export default Dashboard;






