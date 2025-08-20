import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { drinkDetials } from '../../../lib/drinkApi'
import { ScaleLoader } from 'react-spinners'
import DrinkDeleteBtn from './DrinkDeleteBtn'
import DrinkForm from './DrinkForm'
import DrinkReviewForm from '../DrinkReviews/DrinkReviewForm'
import { allReviews } from '../../../lib/reviewApi'
import DrinkReviewList from '../DrinkReviews/DrinkReviewList'
import { jwtDecode } from 'jwt-decode'
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import '../Cafe/CafeDetailsStyle.css'

const DrinkDetails = () => {
    const { id } = useParams()
    const [drink, setDrink] = useState(null)
    const [isFormShown, setIsFormShown] = useState(false)
    const [reviews, setReviews] = useState([])
    let user = null;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            user = jwtDecode(token);
        } catch (e) {
            user = null;
        }
    }
    const getDrink = async () => {
        try {
            const foundDrink = await drinkDetials(id)
            setDrink(foundDrink.data.drinkDetails)
        } catch (error) {
            console.error('Error getting drink:', error)
        }
    }
    const getDrinkReviews = async () => {
        const reviews = await allReviews()
        setReviews(reviews.data)
    }

    useEffect(() => {
        getDrink()
        getDrinkReviews()
    }, [id])

    return (
        <>
            <NavBar />
            <div className='cafe-details-container'>
                {
                    drink
                        ? (
                            <>
                                {
                                    isFormShown
                                        ?
                                        (
                                            <DrinkForm
                                                selectedDrink={drink}
                                                setDrinks={getDrink}
                                                setIsFormShown={setIsFormShown}
                                            />
                                        )

                                        :

                                        (

                                            <>
                                                <div className='details'>
                                                    <img src={drink.drinkImage} alt={drink.drinkName} />
                                                    <div>
                                                        <h1>{drink.drinkName}</h1>
                                                        <p>Price: {drink.price} BHD</p>
                                                        <p>Description: {drink.description}</p>


                                                        {user.role === 'cafe' && (
                                                            <div className="cafe-buttons">
                                                                <button onClick={() => setIsFormShown(true)}>
                                                                    Edit
                                                                </button>
                                                                <DrinkDeleteBtn />

                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )

                                }
                            </>
                        )
                        : <p>Loading...</p>
                }
                <DrinkReviewList
                    getDrinkReviews={getDrinkReviews}
                    reviews={reviews}
                />
                <div className="review-form-container">

                    <DrinkReviewForm
                        getDrinkReviews={getDrinkReviews}
                    />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default DrinkDetails
