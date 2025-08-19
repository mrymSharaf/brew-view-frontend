import React from 'react'
import { useParams } from 'react-router'
import DrinkReviewDeleteBtn from './DrinkReviewDeleteBtn'

const DrinkReviewList = ({ reviews, getDrinkReviews }) => {
    const params = useParams()

    const foundReviews = reviews.filter(review => {
        return params.id === review.drink
    })

    return (
        <>
            <h2>review list</h2>
            <ul>

                {
                    foundReviews
                        ?
                        <>
                            {
                                foundReviews.map(review => (
                                    <li key={review._id}>
                                        <p>{review.content}</p>
                                        <p>{review.rating}</p>
                                        <DrinkReviewDeleteBtn
                                            reviewId={review._id}
                                            getDrinkReviews={getDrinkReviews}
                                        />
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
