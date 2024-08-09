//---------------------------------------------React Imports-----------------------------------------------//
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//--------------------------------------------Service Imports----------------------------------------------//
import { getOfferFromId, editAnOffer } from '../../../services/offerService';

//--------------------------------------------Component Imports----------------------------------------------//
import OfferForm from '../OfferForm/OfferForm';

const UpdateOffer = ({passedOfferData}) => {
  // Retrieve offerId param from  URL
  //const { offerId } = useParams();

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
        const fetchedOfferData = await getOfferFromId(passedOfferData._id);
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
  }, []);

  // Handler function to update offer data
  const handleUpdateOffer = async (updatedOffer) => {
    try {
      // Attempt to update offer data.
      await editAnOffer(passedOfferData._id, updatedOffer);
      // Navigate to the updated offer's detail page.
      navigate(`/offers/${passedOfferData._id}`);
    } catch (err) {
      // Handle errors by setting the error state.
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Update Offer</h2>
        <OfferForm
          initialValues={offerData}
          handleUpdateOffer={handleUpdateOffer}
        />
    </div>
  );
};

export default UpdateOffer;
