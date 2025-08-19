import { cafeDetials } from '../../../lib/cafeApi'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import CafeDeleteBtn from './CafeDeleteBtn'
import ReviewForm from '../Review/ReviewForm'
import ReviewList from '../Review/ReviewList'
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

    const getAllReviews = async () => {
        const reviews = await allReviews()
        console.log("All Reviews updated: ",reviews.data)
        setReviews(reviews.data)
    }
    useEffect(() => {
        getCafe()
        getAllReviews()

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

                            <ReviewList
                                type='cafe'
                                reviews={reviews}
                            />
                            <ReviewForm
                                type='cafe'
                                item={cafe}
                                getAllReviews= {getAllReviews}
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
