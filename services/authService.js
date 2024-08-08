const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const signup = async (formData) => {
    try {
        // Fetch to the api with formData 
        const res = await fetch(`${BACKEND_URL}/profiles/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        //  Converts response to json format
        const data = await res.json()
        console.log("Data")
        console.log(data)
        //  Checks for a returned error
        if (data.error) throw new Error(data.error)
        // Adding returned token to the client's local storage
        localStorage.setItem("token", data.token)
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const signin = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/profiles/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        if (data.token) {
            localStorage.setItem("token", data.token)
            const user = JSON.parse(atob(data.token.split(".")[1]))
            return user
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const signout = () => {
    localStorage.removeItem("token")
}

const getUser = async () => {
    const token = localStorage.getItem("token")
    if (!token) return null
    const user = await JSON.parse(atob(token.split(".")[1]))
    console.log(user)
    const res = await fetch(`${BACKEND_URL}/profiles/populate/${user.user._id}`, {
        headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()

    console.log("DATADFTADTASD", data)
    return data
}

export { signup, signin, signout, getUser }