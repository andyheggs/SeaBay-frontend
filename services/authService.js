const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const signup = async (formData) => {
    try {
        // Fetch to the api with formData 
         const res = await fetch(`${BACKEND_URL}/profiles/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(formData),
         })
        //  Converts response to json format
         const data = await res.json()
        //  Checks for a returned error
         if (data.error) throw new Error(data.error)
        // Adding returned token to the client's local storage
        localStorage.setItem("token", json.token)
         return data
    } catch (error) {
        throw new Error(error)
    }
}

export {signup}