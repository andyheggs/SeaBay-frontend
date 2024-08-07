//---------------------------------------------React Imports-----------------------------------------------//
import { useState, useEffect } from 'react'  
import { useParams } from 'react-router-dom'
//-------------------------------------------Component Imports---------------------------------------------//
import ImageUpload from '../ImageUpload/ImageUpload'
//--------------------------------------------Service Imports----------------------------------------------//
import * as listingService from '../../../services/listingService'

// Define ListingForm component with props handleAddListing and handleUpdateListing
const ListingForm = ({ handleAddListing, handleUpdateListing }) => {  

  // set state for formData 
  const [formData, setFormData] = useState({

    //default value set for drop down
    category: 'Motor',
    //default value set for drop down
    hullType: 'Monohull',
    make: '',
    model: '',
    boatName: '',
    length: '',
    age: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    description: '',
    price: '',
    additionalInfo: '',
    //new field to add image
    vesselImage: '', 

  });

  // Get listingId from route parameters
  const { listingId } = useParams()  

  // useEffect hook to fetch listing data based on listingId when component mounts or listingId changes
  useEffect(() => {

    const fetchListing = async () => {

    // Fetch the listing by ID
      const singleListing = await listingService.getListingById(listingId)
      
      // Update state with fetched data
      setFormData({

        ...singleListing,
        street: singleListing.location.street,
        city: singleListing.location.city,
        state: singleListing.location.state,
        postcode: singleListing.location.postcode,
        country: singleListing.location.country,
      });

    };

    // Fetch listing if ID exists
    if (listingId) {  

      fetchListing()

    }

    // Dependency array with listingId -  rerun if listingId if changes
    }, [listingId]) 
    
  //---------------------------------- * HANDLE FORM CHANGES ------------------------------------------------//

  // Func. to handle form field changes and update formData state
  const handleChange = (evt) => {

    setFormData({ ...formData, [evt.target.name]: evt.target.value })

  };

  //---------------------------------- * FORM SUBMISSION ------------------------------------------------//
  // Func. to handle form submission
  const handleSubmit = (evt) => {

    // Prevent default form submission
    evt.preventDefault()

    // Pull location information from formData
    const location = {  
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postcode: formData.postcode,
      country: formData.country,
    };

    // Combine formData with extracted location information
    const dataToSubmit = { ...formData, location }
    
    // If listingId exists, update listing, otherwise add new listing
    if (listingId) {

      handleUpdateListing(listingId, dataToSubmit)

    } else {

      handleAddListing(dataToSubmit)
    }
  }

  //---------------------------------- * FORM FIELDS ------------------------------------------------//
  return (

    <main>
      {/* Heading changes based on whether listingId is present or not */}
      <h1>{listingId ? 'Update Listing' : 'Create Listing'}</h1>

      {/* Form element with onSubmit event handler */}
      <form onSubmit={handleSubmit}>

        {/* Field for entering Boat Name */}
        <label htmlFor="boatName-input">Boat Name</label>
        <input
          required
          type="text"
          name="boatName"
          id="boatName-input"
          value={formData.boatName}
          onChange={handleChange}
        />
        
        {/* Dropdown for selecting Category */}
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Motor">Motor</option>
          <option value="Sail">Sail</option>
          <option value="Other">Other</option>
        </select>

        {/* Dropdown for selecting Hull Type */}
        <label htmlFor="hullType-input">Hull Type</label>
        <select
          required
          name="hullType"
          id="hullType-input"
          value={formData.hullType}
          onChange={handleChange}
        >
          <option value="Monohull">Monohull</option>
          <option value="Catamaran">Catamaran</option>
          <option value="Trimaran">Trimaran</option>
          <option value="Multihull">Multihull</option>
          <option value="Other">Other</option>
        </select>

        {/* Field for entering Make */}
        <label htmlFor="make-input">Make</label>
        <input
          required
          type="text"
          name="make"
          id="make-input"
          value={formData.make}
          onChange={handleChange}
        />

        {/* Field for entering Model */}
        <label htmlFor="model-input">Model</label>
        <input
          required
          type="text"
          name="model"
          id="model-input"
          value={formData.model}
          onChange={handleChange}
        />

        {/* Field for entering Length */}
        <label htmlFor="length-input">Length (ft)</label>
        <input
          required
          type="number"
          name="length"
          id="length-input"
          value={formData.length}
          onChange={handleChange}
        />

        {/* Field for entering Age */}
        <label htmlFor="age-input">Age (years)</label>
        <input
          required
          type="number"
          name="age"
          id="age-input"
          value={formData.age}
          onChange={handleChange}
        />

        {/* Field for entering Street */}
        <label htmlFor="street-input">Street</label>
        <input
          required
          type="text"
          name="street"
          id="street-input"
          value={formData.street}
          onChange={handleChange}
        />

        {/* Field for entering City */}
        <label htmlFor="city-input">City</label>
        <input
          required
          type="text"
          name="city"
          id="city-input"
          value={formData.city}
          onChange={handleChange}
        />

        {/* Field for entering State */}
        <label htmlFor="state-input">State</label>
        <input
          required
          type="text"
          name="state"
          id="state-input"
          value={formData.state}
          onChange={handleChange}
        />

        {/* Field for entering Postcode */}
        <label htmlFor="postcode-input">Postcode</label>
        <input
          required
          type="text"
          name="postcode"
          id="postcode-input"
          value={formData.postcode}
          onChange={handleChange}
        />

        {/* Field for entering Country */}
        <label htmlFor="country-input">Country</label>
        <input
          required
          type="text"
          name="country"
          id="country-input"
          value={formData.country}
          onChange={handleChange}
        />

        {/* Field for entering Price */}
        <label htmlFor="price-input">Price (£)</label>
        <input
          required
          type="number"
          name="price"
          id="price-input"
          value={formData.price}
          onChange={handleChange}
        />

        {/* Field for entering Description */}
        <label htmlFor="description-input">Description</label>
        <textarea
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />
        {/* Field for entering Description */}
        <label htmlFor="additionalInfo-input">Additional Info</label>
        <textarea
          name="additionalInfo"
          id="additionalInfo-input"
          value={formData.additionalInfo}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>

      </form>
      
    </main>
  );
};

//--------------------------------------------EXPORT STATEMENT----------------------------------------------//
export default ListingForm;

