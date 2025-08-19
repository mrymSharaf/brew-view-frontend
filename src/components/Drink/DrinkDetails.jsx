import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { drinkDetials } from '../../../lib/drinkApi'
import { ScaleLoader } from 'react-spinners'
import DrinkDeleteBtn from './DrinkDeleteBtn'
import DrinkForm from './DrinkForm'

const DrinkDetails = () => {
    const { id } = useParams()
    const [drink, setDrink] = useState(null)
    const [isFormShown, setIsFormShown] = useState(false)

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
                                            <DrinkDeleteBtn/>
                                        </>
                                    )

                            }
                        </>
                    )
                    : <p>Loading...</p>
            }
        </>
    )
}

export default DrinkDetails
