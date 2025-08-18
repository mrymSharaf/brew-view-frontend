import { useState, useEffect } from "react"
import { allDrinks } from '../../../lib/drinkApi'
import DrinkForm from "./DrinkForm"
import DrinkList from "./DrinkList"

const Drink = () => {
    const [Drinks, setDrinks] = useState([])
    const [isFormShown, setIsFormShown] = useState(false)

    const getAllDrinks = async () => {
        const response = await allDrinks()
        console.log(response)
        setDrinks(response.data)
    }

    useEffect(() => {
        getAllDrinks()
    }, [])

    const handleAddCafebtn = () => {
        setIsFormShown(!isFormShown)
    }

    return (
        <>
            <h1>Drinks</h1>

            {
                isFormShown
                    ?
                    <DrinkForm
                        setIsFormShown={setIsFormShown}
                        setDrinks={setDrinks}
                    />
                    :
                    <>
                        <button onClick={() => setIsFormShown(true)}> Add Drink</button>
                        <DrinkList />
                    </>
            }

        </>
    )
}

export default Drink
