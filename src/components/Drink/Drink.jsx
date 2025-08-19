import { useState, useEffect } from "react"
import { allDrinks } from '../../../lib/drinkApi'
import DrinkForm from "./DrinkForm"
import DrinkList from "./DrinkList"

const Drink = ({ selectedDrink, setSelectedDrink }) => {
    const [drinks, setDrinks] = useState([])
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

    // function handleEditDrink(drink) {
    //     setSelectedDrink(drink)
    //     setIsFormShown(true)
    // }


    return (
        <>
            <h1>Drinks</h1>
            <button onClick={handleAddCafebtn}> {isFormShown ? "Back" : "Add Drink"}</button>

            {
                isFormShown
                    ?
                    <DrinkForm
                        setIsFormShown={setIsFormShown}
                        setDrinks={setDrinks}
                    />
                    :
                    <>
                        <DrinkList
                            drinks={drinks}
                        />
                    </>
            }

        </>
    )
}

export default Drink
