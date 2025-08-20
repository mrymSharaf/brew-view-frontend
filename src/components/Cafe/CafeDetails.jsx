import { cafeDetials } from '../../../lib/cafeApi'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import CafeDeleteBtn from './CafeDeleteBtn'
import CafeReviewForm from '../CafeReviews/CafeReviewForm'
import CafeReviewList from '../CafeReviews/CafeReviewList'
import { allReviews } from '../../../lib/reviewApi'
import CafeForm from './CafeForm'
import Drink from '../Drink/Drink'
import { jwtDecode } from 'jwt-decode'
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"


const CafeDetails = () => {
    const params = useParams()
    const [cafe, setCafe] = useState(null)
    const [reviews, setReviews] = useState([])
    const [isFormShown, setIsFormShown] = useState(false)
    let user = null;
    const token = localStorage.getItem("token")
    if (token) {
        try {
            user = jwtDecode(token);
        } catch (e) {
            user = null;
        }
    }
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
            <NavBar />
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
                                            <img src={cafe.cafeImage} alt={cafe.cafeName} />
                                            <p>{cafe.location}</p>
                                            {user.role === 'cafe' && (
                                                <>

                                                    <button onClick={() => setIsFormShown(true)}>
                                                        Edit
                                                    </button>
                                                    <CafeDeleteBtn />
                                                </>
                                            )}
                                        </>
                                    )
                            }
                            <Drink
                                cafeId={cafe._id}
                            />

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
            <Footer />
        </>
    )
}

export default CafeDetails
