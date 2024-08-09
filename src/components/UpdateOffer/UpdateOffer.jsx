
//---------------------------------------------React Imports-----------------------------------------------//
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//--------------------------------------------Service Imports----------------------------------------------//
import { getOfferFromId, editAnOffer } from '../../services/offerService';

//--------------------------------------------Service Imports----------------------------------------------//
import OfferForm from '../OfferForm/OfferForm';

const UpdateOffer = () => {
  // Retrieve offerId param from  URL
  const { offerId } = useParams()
  
  // Initialise nav func,
  const navigate = useNavigate()
  
  // useState for storing offer data.
  const [offerData, setOfferData] = useState(null)
  
  // useState for loading 
  const [loading, setLoading] = useState(true)

  // useState for error handling
  const [error, setError] = useState(null)

  // useEffect to fetch offer data when component mounts or offerId changes
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        // Attempt to fetch offer data using the offerId.
        const data = await getOfferFromId(offerId)
        setOfferData(data)
        setLoading(false)
      } catch (err) {
        // Handle errors by setting the error state
        setError(err.message)
        setLoading(false)
      }
    };

    fetchOffer()

   //re-run effect if offerId changes.
  }, [offerId]); 

  // Handler function to update offer data
  const handleUpdate = async (updatedOffer) => {
    try {
      // Attempt to update offer data.
      await editAnOffer(offerId, updatedOffer)
      // Navigate to the updated offer's detail page.
      navigate(`/offers/${offerId}`)
    } catch (err) {
      // Handle errors by setting the error state.
      setError(err.message);
    }
  };

  // Render loading state.
  if (loading) return <p>Loading...</p>
  
  // Render error state.
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Update Offer</h2>
      {offerData && (
        // Render the OfferForm component if offer data is available.
        <OfferForm
          initialValues={offerData}
          onSubmit={handleUpdate}
          submitButtonText="Update Offer"
        />
      )}
    </div>
  )
};

export default UpdateOffer;