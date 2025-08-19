import { useState } from 'react'
import { createCafe, updateCafe, allCafes } from '../../../lib/cafeApi'

const CafeForm = ({ selectedCafe, setCafes, setIsFormShown }) => {
    const initalState = {
        cafeName: '',
        location: '',
        cafeImage: null
    }

    const [formDate, setformDate] = useState(
        selectedCafe ? selectedCafe : initalState)

    const handleChange = (event) => {
        setformDate({ ...formDate, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let response = null
        if (selectedCafe) {
            response = await updateCafe(formDate, selectedCafe._id)
        }
        else {
            response = await createCafe(formDate)
        }

        if (response.status === 200 || response.status === 201) {
            setIsFormShown(false)
        }
        response = await allCafes()
        setCafes(response.data)
        setformDate(initalState)


    }


    return (
        <>
            <h2>Cafe form</h2>
            <form onSubmit={handleSubmit} >
                <label>Cafe Name:</label>
                <input
                    name='cafeName'
                    id='cafeName'
                    value={formDate.cafeName}
                    onChange={handleChange}

                />
                <label>Location:</label>
                <input
                    name='location'
                    id='location'
                    value={formDate.location}
                    onChange={handleChange}

                />
                <label>Cafe Image:</label>
                <input
                    name='cafeImage'
                    id='cafeImage'
                    value={formDate.cafeImage}
                    onChange={handleChange}
                    type='file'

                />

                <button type='submit'>
                    {selectedCafe ? 'Update' : 'Create'}
                </button>
            </form>

        </>
    )
}

export default CafeForm
