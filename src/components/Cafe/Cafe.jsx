import { useEffect, useState } from 'react'
import CafeForm from './CafeForm'
import CafeList from './CafeList'
import { allCafes } from '../../../lib/cafeApi'
import { jwtDecode } from 'jwt-decode'

const Cafe = (props) => {

    const [cafes, setCafes] = useState([])
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
    const getAllCafes = async () => {
        const response = await allCafes()
        setCafes(response.data)
    }

    useEffect(() => {
        getAllCafes()
    }, [])

    const handleAddCafebtn = () => {
        setIsFormShown(!isFormShown)
    }



    return (
        <>
            <h1>Cafes</h1>
            {user.role === 'cafe' && (
                <button onClick={handleAddCafebtn}>Add Cafe</button>
            )}            {
                isFormShown
                    ?
                    <CafeForm
                        selected={props.selected}
                        setCafes={setCafes}
                        setIsFormShown={setIsFormShown}
                    />
                    :
                    <CafeList
                        cafes={cafes}
                    />


            }


        </>
    )
}

export default Cafe
