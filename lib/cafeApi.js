import axios from "axios"

const baseUrl = import.meta.env.VITE_BACKEND_URL

const createCafe = async (data) => {
    try {
        const url = `${baseUrl}/cafes/new`
        const response = await axios.post(url, data)
        return response

    }
    catch (error) {
        return error
    }

}

const allCafes = async () => {
    try {
        const url = `${baseUrl}/cafes`
        const response = await axios.get(url)
        return response

    }
    catch (error) {
        return error
    }
}

const updateCafe = async (data, id) => {
    try {
        const url = `${baseUrl}/cafes/${id}`
        const response = await axios.put(url, data)
        return response

    }
    catch (error) {
        return error
    }

}

const cafeDetials = async (id) => {
    try {
        const url = `${baseUrl}/cafes/${id}`
        const response = await axios.get(url)
        return response

    }
    catch (error) {
        return error
    }
}

const deleteCafe = async (id) => {
    try {
        const url = `${baseUrl}/cafes/${id}`
        const response = await axios.delete(url)
        return response

    }
    catch (error) {
        return error
    }
}

export {
    createCafe,
    allCafes,
    updateCafe,
    cafeDetials,
    deleteCafe
}