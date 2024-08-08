//---------------------------------------------React Imports-----------------------------------------------//
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//--------------------------------------------Service Imports----------------------------------------------//
import * as offerService from '../../../services/offerService'

// Define OfferForm component with props handleAddOffer and handleUpdateOffer
const OfferForm = ({ handleAddOffer, handleUpdateOffer }) => {

  // set state for formData 
  const [formData, setFormData] = useState({
    offeringPrice: '',
    message: '',
    listing: '',
    user: '',
  });

  // Get offerId from route parameters
  const { offerId } = useParams()

  // useEffect hook to fetch offer data based on offerId when component mounts or offerId changes
  useEffect(() => {
    const fetchOffer = async () => {
      // Fetch the offer by ID
      const singleOffer = await offerService.getOfferFromId(offerId)
      // Update state with fetched data
      setFormData({
        offeringPrice: singleOffer.offeringPrice,
        message: singleOffer.message,
        listing: singleOffer.listing,
        user: singleOffer.user,
      });
    };

    // Fetch offer if ID exists
    if (offerId) {
      fetchOffer()
    }
    // Dependency array with offerId - rerun if offerId changes
  }, [offerId])

  //---------------------------------- * HANDLE FORM CHANGES ------------------------------------------------//
  // Func. to handle form field changes and update formData state
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  //---------------------------------- * FORM SUBMISSION ------------------------------------------------//
  // Func. to handle form submission
  const handleSubmit = (evt) => {
    // Prevent default form submission
    evt.preventDefault();

    // Combine formData with any additional information if needed
    const dataToSubmit = { ...formData };

    // If offerId exists, update offer, otherwise add new offer
    if (offerId) {
      handleUpdateOffer(offerId, dataToSubmit);
    } else {
      handleAddOffer(dataToSubmit);
    }
  };

  //---------------------------------- * FORM FIELDS ------------------------------------------------//
  return (
    <main>
      {/* Heading changes based on whether offerId is present or not */}
      <h1>{offerId ? 'Update Offer' : 'Create Offer'}</h1>

      {/* Form element with onSubmit event handler */}
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

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

//--------------------------------------------EXPORT STATEMENT----------------------------------------------//
export default OfferForm;
