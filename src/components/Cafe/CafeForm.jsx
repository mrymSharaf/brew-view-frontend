import { useState } from 'react'
import { createCafe, updateCafe, allCafes } from '../../../lib/cafeApi'

const CafeForm = ({ selected, setCafes }) => {
    const initalState = {
        cafeName: '',
        location: '',
        cafeImage: ''
    }

    const [formDate, setformDate] = useState(
        selected ? selected : initalState)

    const handleChange = (event) => {
        setformDate({ ...formDate, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let response = null
        if (selected) {
            response = await updateCafe(formDate, selected._id)
        }
        else {
            response = await createCafe(formDate)
        }

        if (response.status === 200 || response.status === 201) {

        }
        // response = await allCafes()
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
                    {selected ? 'Update' : 'Create'}
                </button>
            </form>

        </>
    )
}

export default CafeForm
