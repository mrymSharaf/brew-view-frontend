import { useState } from 'react'
import { createReview, allReviews } from '../../../lib/reviewApi'

const ReviewForm = ({ type, item, setReviews, getCafeReviews,getAllReviews }) => {
    const initalState = {
        content: '',
        rating: ''
    }
    const [formData, setFormData] = useState(initalState)

    const handleChange = async (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            ...formData,
            cafe: type === 'cafe' ? item._id : null,
            drink: type === 'drink' ? item._Id : null,

        }
        let response = await createReview(data)
            console.log(response)
        if (response.status === 200) {

        }
        // response = await allReviews()
        // setReviews(response)
        // await getDrinkreviews()
        setFormData(initalState)
        console.log("In right function")
        await getAllReviews()
        // await getCafeReviews()


    }


    return (
        <>
            <h2>review form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='content'>Leave a Review: </label>
                <input
                    id='content'
                    name='content'
                    value={formData.content}
                    onChange={handleChange}
                />

                <label htmlFor='rating'>Rating: </label>
                <input
                    id='rating'
                    name='rating'
                    value={formData.rating}
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>
            </form>

        </>
    )
}

export default ReviewForm
