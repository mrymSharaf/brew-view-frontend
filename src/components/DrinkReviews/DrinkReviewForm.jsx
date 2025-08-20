import { useState } from 'react'
import { createReview } from '../../../lib/reviewApi'
import { useParams } from 'react-router'
import '../CafeReviews/reviewsStyle.css'
const DrinkReviewForm = ({ setReviews, getDrinkReviews }) => {

    const initalState = {
        content: '',
        rating: ''
    }
    const [formData, setFormData] = useState(initalState)
    const params = useParams()
    const handleChange = async (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            ...formData,
            cafe: null,
            drink: params.id,

        }
        let response = await createReview(data)
        if (response.status === 200) {

        }
        setFormData(initalState)
        await getDrinkReviews()

    }


    return (
        <>
            <div className='review-form'>

                <h2>Leave a Review</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='content'>Content</label>
                    <input
                        id='content'
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                    />

                    <label htmlFor='rating'>Rating </label>
                    <input
                        id='rating'
                        name='rating'
                        value={formData.rating}
                        onChange={handleChange}
                    />

                    <button type='submit'>Submit</button>
                </form>
            </div>
            </>
            )
}

            export default DrinkReviewForm
