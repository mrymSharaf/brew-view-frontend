import { cafeDetials } from '../../../lib/cafeApi'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import CafeDeleteBtn from './CafeDeleteBtn'
import CafeReviewForm from '../Review/CafeReviewForm'
import CafeReviewList from '../Review/CafeReviewList'
import { allReviews } from '../../../lib/reviewApi'
import CafeForm from './CafeForm'

const CafeDetails = () => {
    const params = useParams()
    const [cafe, setCafe] = useState(null)
    const [reviews, setReviews] = useState([])
    const [isFormShown, setIsFormShown] = useState(false)

    const getCafe = async () => {

        const foundCafe = await cafeDetials(params.id)
        setCafe(foundCafe.data.cafeDetails)

    }

    const getCafeReviews = async () => {
        const reviews = await allReviews()
        setReviews(reviews.data)
    }
    useEffect(() => {
        getCafe()
        getCafeReviews()

    }, [])



    return (
        <>
            {
                cafe
                    ?
                    (
                        <>
                            {
                                isFormShown
                                    ?
                                    (
                                        <CafeForm
                                            selectedCafe={cafe}
                                            setCafes={getCafe}
                                            setIsFormShown={setIsFormShown}
                                        />
                                    )
                                    :
                                    (
                                        <>
                                            <h1>{cafe.cafeName}</h1>
                                            <p>{cafe.location}</p>
                                            {/* <img src={cafe.cafeImage} alt={cafe.cafeName} /> */}

                                            <button onClick={() => setIsFormShown(true)}>
                                                Edit
                                            </button>
                                            <CafeDeleteBtn />
                                        </>
                                    )
                            }

                            <CafeReviewList
                            reviews={reviews}
                            getCafeReviews={getCafeReviews}
                            />
                            <CafeReviewForm
                            getCafeReviews={getCafeReviews}
                            />
                        </>
                    )
                    :
                    <p>Loading...</p>

            }
        </>
    )
}

export default CafeDetails
