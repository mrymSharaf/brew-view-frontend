import { useEffect, useState } from 'react'
import CafeForm from './CafeForm'
import CafeList from './CafeList'
import { allCafes } from '../../../lib/cafeApi'
import { jwtDecode } from 'jwt-decode'
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../Footer/Footer"
import './allCafeStyle.css'

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
         <NavBar /> 
            <h1>Cafes</h1>
            {user.role === 'cafe' && (
                <button className='add-button' onClick={handleAddCafebtn}>{ isFormShown? "Back": "Add Cafe"}</button>
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
            <Footer/>

        </>
    )
}

export default Cafe
