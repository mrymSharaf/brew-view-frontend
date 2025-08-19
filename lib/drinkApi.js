import axios from "axios"

const baseUrl = import.meta.env.VITE_BACKEND_URL

const createDrink = async (data) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) return
        const url = `${baseUrl}/drinks/new`
        const response = await axios.post(url, data,
           {
                headers: { Authorization: `Bearer ${token}` }
            })
        return response

    }
    catch (error) {
        return error
    }
}

const allDrinks = async () => {
    try {
        const url = `${baseUrl}/drinks`
        const response = await axios.get(url)
        return response

    }
    catch (error) {
        return error
    }

}

const updateDrink = async (data, id) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) return
        const url = `${baseUrl}/drinks/${id}`
        const response = await axios.put(url, data,{
                headers: { Authorization: `Bearer ${token}` }
            })
        return response

    }
    catch (error) {
        return error
    }
}

const drinkDetials = async (id) => {
    try {
        const url = `${baseUrl}/drinks/${id}`
        const response = await axios.get(url)
        return response

    }
    catch (error) {
        return error
    }
}

const deleteDrink = async (id) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) return
        const url = `${baseUrl}/drinks/${id}`
        const response = await axios.delete(url,{
                headers: { Authorization: `Bearer ${token}` }
            })
        return response

    }
    catch (error) {
        return error
    }
}


export {
    createDrink,
    allDrinks,
    updateDrink,
    drinkDetials,
    deleteDrink

}