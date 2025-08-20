import React from 'react'
import { useParams } from 'react-router'
import CafeReviewDeleteBtn from './CafeReviewDeleteBtn'
import { jwtDecode } from 'jwt-decode'
import './reviewsStyle.css'

const CafeReviewList = ({ reviews, getCafeReviews }) => {
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
        return params.id === review.cafe
    })

    return (
        <>
            <div className="cafe-reviews">
                <h1>Cafe Reviews</h1>
                <ul>
                    {foundReviews.length ? (
                        foundReviews.map(review => (
                            <li key={review._id}>
                                <p>Done By: {review.user.username}</p>
                                <p>Review Content: {review.content}</p>
                                <p>Rating: {review.rating} ⭐</p>
                                {user.id === review.user._id && (
                                    <CafeReviewDeleteBtn
                                        reviewId={review._id}
                                        getCafeReviews={getCafeReviews}
                                    />
                                )}
                            </li>
                        ))
                    ) : (
                        <p>no reviews yet</p>
                    )}
                </ul>
            </div>
        </>
    )

}

export default CafeReviewList
