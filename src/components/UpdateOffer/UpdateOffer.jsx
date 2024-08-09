//---------------------------------------------React Imports-----------------------------------------------//
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//--------------------------------------------Service Imports----------------------------------------------//
import { getOfferFromId, editAnOffer } from '../../../services/offerService';

//--------------------------------------------Component Imports----------------------------------------------//
import OfferForm from '../OfferForm/OfferForm';

const UpdateOffer = () => {
  // Retrieve offerId param from  URL
  const { offerId } = useParams();

  // Initialise navigation function
  const navigate = useNavigate();

  // useState for storing offer data.
  const [offerData, setOfferData] = useState(null);

  // useState for loading state.
  const [loading, setLoading] = useState(true);

  // useState for error handling.
  const [error, setError] = useState(null);

  // useEffect to fetch offer data when component mounts or offerId changes
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        // Fetch offer data using the offerId.
        const fetchedOfferData = await getOfferFromId(offerId);
        setOfferData(fetchedOfferData);
        setLoading(false);
      } catch (err) {
        // Handle errors by setting the error state
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOffer();

    // Re-run effect if offerId changes.
  }, [offerId]);

  // Handler function to update offer data
  const handleUpdateOffer = async (updatedOffer) => {
    try {
      // Attempt to update offer data.
      await editAnOffer(offerId, updatedOffer);
      // Navigate to the updated offer's detail page.
      navigate(`/offers/${offerId}`);
    } catch (err) {
      // Handle errors by setting the error state.
      setError(err.message);
    }
  };

  // Render loading state.
  if (loading) return <p>Loading...</p>;

  // Render error state.
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Update Offer</h2>
      {offerData && (
        <OfferForm
          initialValues={offerData}
          handleUpdateOffer={handleUpdateOffer}
        />
      )}
    </div>
  );
};

export default UpdateOffer;
