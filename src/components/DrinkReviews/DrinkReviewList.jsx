import React from 'react'
import { useParams } from 'react-router'
import DrinkReviewDeleteBtn from './DrinkReviewDeleteBtn'
import { jwtDecode } from 'jwt-decode'


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
            <h2>review list</h2>
            <ul>

                {
                    foundReviews.length
                        ?
                        <>
                            {
                                foundReviews.map(review => (
                                    <li key={review._id}>
                                        <p>{review.user.username}</p>
                                        <p>{review.content}</p>
                                        <p>{review.rating}</p>
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

        </>
    )
}

export default DrinkReviewList
