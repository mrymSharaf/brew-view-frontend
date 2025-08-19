import axios from "axios"

const baseUrl = import.meta.env.VITE_BACKEND_URL

const createCafe = async (data) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) return
        const url = `${baseUrl}/cafes/new`

        const formData = new FormData()
        formData.append("cafeImage", file)

        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
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
        const token = localStorage.getItem('token')
        if (!token) return
        const url = `${baseUrl}/cafes/${id}`

        const formData = new FormData()
        formData.append("cafeImage", file)

        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
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
        const token = localStorage.getItem('token')
        if (!token) return
        const url = `${baseUrl}/cafes/${id}`
        const response = await axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
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