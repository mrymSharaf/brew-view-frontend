import { cafeDetials } from '../../../lib/cafeApi'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import CafeDeleteBtn from './CafeDeleteBtn'
import ReviewForm from '../Review/ReviewForm'
import ReviewList from '../Review/ReviewList'
import { allReviews } from '../../../lib/reviewApi'

const CafeDetails = () => {
    const params = useParams()
    const [cafe, setCafe] = useState(null)
    const [reviews, setReviews] = useState([])

    const getCafe = async () => {

        const foundCafe = await cafeDetials(params.id)
        // console.log(foundCafe.data)
        setCafe(foundCafe.data)
    }

    const getAllReviews = async () => {
        const reviews = await allReviews()
        // console.log(reviews.data)
        setReviews(reviews.data)
    }
    useEffect(() => {
        getCafe()
        getAllReviews()

    }, [])



    return (
        <>
            <CafeDeleteBtn />
            {
                cafe ?
                    <>
                        <h1>cafe details</h1>
                        <p>{cafe.cafeName}</p>
                        <p>{cafe.location}</p>
                        {/* <img src={cafe.cafeImage}/> */}
                    </>
                    :
                    <p>louding</p>

            }
            <ReviewList
                reviews={reviews}
                type='cafe'
                item={cafe}
            />
            <ReviewForm
                type='cafe'
                item={cafe}
            />

        </>
    )
}

export default CafeDetails
