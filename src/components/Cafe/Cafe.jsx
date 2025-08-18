import { useEffect, useState } from 'react'
import CafeForm from './CafeForm'
import CafeList from './CafeList'
import { allCafes } from '../../../lib/cafeApi'


const Cafe = (props) => {

    const [cafes, setCafes] = useState([])

    const getAllCafes = async () => {
        const response = await allCafes()
        console.log(response)
        setCafes(response.data)
    }

    useEffect(() => {
        getAllCafes()
    }, [])



    return (
        <>
            <h1>Cafes</h1>
            <CafeForm
                selected={props.selected}
                setCafes={setCafes} />
            <CafeList
                cafes={cafes}
                setCafes={setCafes}
            />


        </>
    )
}

export default Cafe
