import { useState } from "react"
import DrinkForm from "./DrinkForm"
import DrinkList from "./DrinkList"

const Drink = () => {
    const [drink, setDrink] = useState([])
    const [isFormShown, setIsFormShown] = useState(false)
    return (
        <>
            <h1>Drinks</h1>

            {
                isFormShown
                    ?
                    <DrinkForm
                        setIsFormShown={setIsFormShown}
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
