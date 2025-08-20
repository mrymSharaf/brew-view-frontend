import { useEffect, useState } from 'react'
import CafeForm from './CafeForm'
import CafeList from './CafeList'
import { allCafes } from '../../../lib/cafeApi'


const Cafe = (props) => {

    const [cafes, setCafes] = useState([])
    const [isFormShown, setIsFormShown] = useState(false)

    const getAllCafes = async () => {
        const response = await allCafes()
        console.log(response)
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
            <button onClick={handleAddCafebtn}>{isFormShown? "Back":"Add Cafe"}</button>
            {
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
