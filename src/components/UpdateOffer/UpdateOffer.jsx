//---------------------------------------------React Imports-----------------------------------------------//
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//--------------------------------------------Service Imports----------------------------------------------//
import { getOfferFromId, editAnOffer, deleteAnOffer } from '../../../services/offerService';

const UpdateOffer = ({passedOfferData}) => {
  // Retrieve offerId param from the URL

  // Initialise navigation function
  const navigate = useNavigate();

  // useState for storing offer data
  const [formData, setFormData] = useState({
    offeringPrice: '',
    message: '',
    listing: '',
    user: '',
  });

  // useState for loading state
  const [loading, setLoading] = useState(true);

  // useState for error handling
  const [error, setError] = useState(null);

  // useEffect to fetch offer data when component mounts or offerId changes
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        // Fetch offer data using the offerId
        const fetchedOfferData = await getOfferFromId(passedOfferData._id);

        // Update state with fetched data
        setFormData({
          offeringPrice: fetchedOfferData.offeringPrice,
          message: fetchedOfferData.message,
          listing: fetchedOfferData.listing,
          user: fetchedOfferData.user,
        });

        setLoading(false);
      } catch (err) {
        // Handle errors by setting the error state
        setError(err.message);
        setLoading(false);
      }
    };

    // Fetch offer if offerId exists
    if (passedOfferData._id) {
      fetchOffer();
    }
  }, []);

  //---------------------------------- * HANDLE FORM CHANGES ------------------------------------------------//
  // Function to handle form field changes and update formData state
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  //---------------------------------- * FORM SUBMISSION ------------------------------------------------//
  // Function to handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // Attempt to update offer data
      await editAnOffer(passedOfferData._id, formData);

      // Navigate to the updated offer's detail page
      navigate(`/offers/${passedOfferData._id}`);
    } catch (err) {
      // Handle errors by setting the error state
      setError(err.message);
    }
  };

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>Error: {error}</p>;

  //---------------------------------- * DELETE OFFER ------------------------------------------------//
  // Function to handle offer deletion
  const handleDelete = async () => {
    try {
      // Attempt to delete the offer
      await deleteAnOffer(passedOfferData._id);

      // Navigate back to the dashboard or appropriate page after deletion
      navigate('/dashboard');
    } catch (err) {
      // Handle errors by setting the error state
      setError(err.message);
    }
  };

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p>Error: {error}</p>;

  //---------------------------------- * RENDER FORM ------------------------------------------------//
  return (
    <div>
      <h2>Update Offer</h2>
      <form onSubmit={handleSubmit}>
        {/* Field for entering Offering Price */}
        <label htmlFor="offeringPrice-input">Offering Price</label>
        <input
          required
          type="number"
          name="offeringPrice"
          id="offeringPrice-input"
          value={formData.offeringPrice}
          onChange={handleChange}
        />

        {/* Field for entering Message */}
        <label htmlFor="message-input">Message</label>
        <textarea
          required
          name="message"
          id="message-input"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Update Offer</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: '20px', color: 'red' }}>
        Delete Offer
      </button>


    </div>
  );
};

export default UpdateOffer;
