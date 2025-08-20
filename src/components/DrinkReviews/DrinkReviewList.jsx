import React from 'react'
import { useParams } from 'react-router'
import DrinkReviewDeleteBtn from './DrinkReviewDeleteBtn'
import { jwtDecode } from 'jwt-decode'
import '../CafeReviews/reviewsStyle.css'

const DrinkReviewList = ({ reviews, getDrinkReviews }) => {
    const params = useParams()

    let user = null;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            user = jwtDecode(token)
        } catch (e) {
            user = null;
        }
    }

    const foundReviews = reviews.filter(review => {
        return params.id === review.drink
    })

    return (
        <>
            <div className="cafe-reviews">
                <h2>Drinks Reviews</h2>
                <ul>

                    {
                        foundReviews.length
                            ?
                            <>
                                {
                                    foundReviews.map(review => (
                                        <li key={review._id}>
                                            <p>Done By: {review.user.username}</p>
                                            <p>Review Content: {review.content}</p>
                                            <p>Rating: {review.rating} ⭐</p>
                                            {user.id === review.user._id && (

                                                <DrinkReviewDeleteBtn
                                                    reviewId={review._id}
                                                    getDrinkReviews={getDrinkReviews}
                                                />
                                            )}
                                        </li>

                                    ))
                                }
                            </>
                            :
                            <p>no reviews yet</p>
                    }
                </ul>
            </div>
        </>
    )
}

export default DrinkReviewList
