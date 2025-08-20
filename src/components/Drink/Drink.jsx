import { useState, useEffect } from "react"
import { allDrinks } from '../../../lib/drinkApi'
import DrinkForm from "./DrinkForm"
import DrinkList from "./DrinkList"
import { jwtDecode } from 'jwt-decode'


const Drink = ({ cafeId }) => {
    const [drinks, setDrinks] = useState([])
    const [isFormShown, setIsFormShown] = useState(false)

    let user = null;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            user = jwtDecode(token);
        } catch (e) {
            user = null;
        }
    }

    const getAllDrinks = async () => {
        const response = await allDrinks()
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
            {user.role === 'cafe' && (
                <button onClick={handleAddCafebtn}>{isFormShown? "Back":"Add Drink"}</button>
            )}
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
                            cafeId={cafeId}
                        />
                    </>
            }

        </>
    )
}

export default Drink
