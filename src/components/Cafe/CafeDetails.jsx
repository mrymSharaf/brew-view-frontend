import { cafeDetials } from '../../../lib/cafeApi'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import CafeDeleteBtn from './CafeDeleteBtn'
import ReviewForm from '../Review/ReviewForm'
import ReviewList from '../Review/ReviewList'

const CafeDetails = () => {
    const params = useParams()
    const [cafe, setCafe] = useState(null)

    const getCafe = async () => {

        const foundCafe = await cafeDetials(params.id)
        setCafe(foundCafe.data)
        console.log(foundCafe.data)
    }
    useEffect(() => {
        getCafe()

    }, [])



    return (
        <>
            <CafeDeleteBtn />
            {
                cafe ?
                    <>
                        <h1>cafe detials</h1>
                        <p>{cafe.cafeName}</p>
                        <p>{cafe.location}</p>
                        {/* <img src={cafe.cafeImage}/> */}
                    </>
                    :
                    <p>louding</p>

            }
            <ReviewList />
            <ReviewForm type='cafe' item={cafe} />

        </>
    )
}

export default CafeDetails
