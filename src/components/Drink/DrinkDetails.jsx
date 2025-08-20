import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { drinkDetials } from '../../../lib/drinkApi'
import { ScaleLoader } from 'react-spinners'
import DrinkDeleteBtn from './DrinkDeleteBtn'
import DrinkForm from './DrinkForm'
import DrinkReviewForm from '../DrinkReviews/DrinkReviewForm'
import { allReviews } from '../../../lib/reviewApi'
import DrinkReviewList from '../DrinkReviews/DrinkReviewList'

const DrinkDetails = () => {
    const { id } = useParams()
    const [drink, setDrink] = useState(null)
    const [isFormShown, setIsFormShown] = useState(false)
    const [reviews, setReviews] = useState([])

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

                                            <button onClick={() => setIsFormShown(true)}>
                                                Edit
                                            </button>
                                            <DrinkDeleteBtn/>
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
             
        </>
    )
}

export default DrinkDetails
