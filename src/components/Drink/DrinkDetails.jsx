import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { drinkDetials } from '../../../lib/drinkApi'
import { ScaleLoader } from 'react-spinners'
import DrinkDeleteBtn from './DrinkDeleteBtn'
import DrinkForm from './DrinkForm'
import ReviewList from '../Review/ReviewList'
import ReviewForm from '../Review/ReviewForm'
import { allReviews } from '../../../lib/reviewApi'

const DrinkDetails = () => {
    const { id } = useParams()
    const [drink, setDrink] = useState(null)
    const [isFormShown, setIsFormShown] = useState(false)
    const [reviews, setReviews] =useState([])

    const getDrink = async () => {
        try {
            const foundDrink = await drinkDetials(id)
            console.log(foundDrink.data)
            setDrink(foundDrink.data.drinkDetails)
        } catch (error) {
            console.error('Error getting drink:', error)
        }
    }

    useEffect(() => {
        getDrink()
    }, [id])

    const getAllReviews = async () => {
        const reviews = await allReviews()
        setReviews(reviews.data)
    }
    useEffect(() => {
        getAllReviews()

    }, [])

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
                                            <p>{drink.description}</p>
                                            <p>{drink.price} BHD</p>

                                            <button onClick={() => setIsFormShown(true)}>
                                                Edit
                                            </button>
                                            <DrinkDeleteBtn />
                                        </>
                                    )

                            }
                        </>
                    )
                    : <p>Loading...</p>
            }
            <ReviewList
                type='drink'
            />
            <ReviewForm
                type='drink'
                item={drink}
                setReviews={setReviews}
            />
        </>
    )
}

export default DrinkDetails
