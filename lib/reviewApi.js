import axios from "axios"

const baseUrl = import.meta.env.VITE_BACKEND_URL

const createReview = async (data) => {
    try {
        const url = `${baseUrl}/reviews/new`
        const response = await axios.post(url, data)
        return response

    }
    catch (error) {
        return error
    }
}

const allReviews = async () => {
    try {
        const url = `${baseUrl}/reviews`
        const response = await axios.get(url)
        return response

    }
    catch (error) {
        return error
    }

}

const findReview = async (id) => {
    try {
        const url = `${baseUrl}/reviews/${id}`
        const response = await axios.get(url)
        return response

    }
    catch (error) {
        return error
    }
}

const deleteReview = async (id) => {
    try {
        const url = `${baseUrl}/reviews/${id}`
        const response = await axios.delete(url)
        return response

    }
    catch (error) {
        return error
    }
}


export {
    createReview,
    allReviews,
    findReview,
    deleteReview

}