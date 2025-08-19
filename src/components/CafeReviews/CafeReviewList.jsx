import React from 'react'
import { useParams } from 'react-router'
import CafeReviewDeleteBtn from './CafeReviewDeleteBtn'

const CafeReviewList = ({ reviews, getCafeReviews }) => {
    const params = useParams()

    const foundReviews = reviews.filter(review => {
        return params.id === review.cafe
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
                                        <p>{review.content}</p>
                                        <p>{review.rating}</p>
                                        <CafeReviewDeleteBtn
                                            reviewId={review._id}
                                            getCafeReviews={getCafeReviews}
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

export default CafeReviewList
