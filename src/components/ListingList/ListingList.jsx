//---------------------------------------------React Imports-----------------------------------------------// 
import { Link } from 'react-router-dom';
//-------------------------------------------Component Imports---------------------------------------------//

//--------------------------------------------Service Imports----------------------------------------------//

// * LISTING LIST COMPONENT * //
// Component to display list of listings and links to their details
const ListingList = ({ listings }) => {

  return (

    <main>
      {/* Iterate over listings array and render each listing */}

      {listings.map(listing => {
        
        {/* check if listing.seller exists before trying to access listing.seller.username. 
          If listing.seller is null, we default to displaying "Unknown Seller". */}
        const sellerUsername = listing.seller ? listing.seller.username : 'Unknown Seller';

        return (

          // Each listing is wrapped in a Link component for navigation
          <Link key={listing._id} to={`/listings/${listing._id}`}>

            <article>

              <header>

                {/* Display boat name as the title */}
                <h2>{listing.boatName}</h2>

                <p>
                  {/* Display the seller's username and the posting date */}
                  {sellerUsername} posted on {new Date(listing.listingCreated).toLocaleDateString()}
                </p>

              </header>

              {/* Display additional details of the listing */}
              <p>Make: {listing.make}</p>
              <p>Model: {listing.model}</p>
              <p>Price: £{listing.price}</p>              

            </article>

          </Link>

        );

      })}

    </main>
  );
};

//------------------------------------------------Exports--------------------------------------------------//

export default ListingList;