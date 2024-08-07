import './ImageUploadField.css'

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const ImageUploadField = ({ name, label, profileImage, handleImageUpload, setMessage }) => {

  const handleSelectImage = async (event) => {
    // Extract file from file input
    const file = event.target.files[0]

    // Ensure file is within size limit
    if (file.size > 80000) {
      return setMessage('Image too large. Please select a smaller image (max: 80KB)')
    }
    
    // Create mock form
    const formData = new FormData() // Create an empty form
    
    // Append fields to form
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    // Send request to cloudinary
    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })
    const imageData = await res.json()

    // Set secure_url from cloudinary response to state
    handleImageUpload(imageData.secure_url)
  }

  return (
    <>
      {/* If profileImage has been uploaded and set to state, display this instead of file input */}
      { profileImage ?
        <div 
          className="profile-image" 
          style={{
            backgroundImage: `url(${profileImage})`
          }}
        ></div>
        :
        <>
          <label htmlFor={name}>{label}</label>
          <input 
            type="file" 
            name={name} 
            id={name} 
            accept='image/*'
            onChange={handleSelectImage}
          />
        </>
      }
    </>
  )
}

export default ImageUploadField