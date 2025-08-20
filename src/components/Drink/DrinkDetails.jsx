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
        <NavBar/>
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
                                            <h1>{drink.drinkName}</h1>
                                            <img src={drink.drinkImage} alt={drink.drinkName} />
                                            <p>{drink.description}</p>
                                            <p>{drink.price} BHD</p>
                                            {user.role === 'cafe' && (
                                                <>
                                                    <button onClick={() => setIsFormShown(true)}>
                                                        Edit
                                                    </button>
                                                    <DrinkDeleteBtn />
                                                </>
                                            )}
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

            <DrinkReviewForm
                getDrinkReviews={getDrinkReviews}
            />

            <Footer/>
        </>
    )
}

export default DrinkDetails
