import { useState } from 'react'
import { createCafe } from '../../../lib/cafeApi'

const CafeForm = () => {
    const initalState = {
        cafeName: '',
        location: '',
        cafeImage: ''
    }

    const [formDate, setformDate] = useState(initalState)

    const handleChange = (event) => {
        setformDate({ ...formDate, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await createCafe(formDate)

    }


    return (
        <>
            <h2>Cafe form</h2>
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <label>Cafe Name:</label>
                <input
                    name='cafeName'
                    id='cafeName'
                    value={formDate.cafeName}
                    onChange={handleChange}

                />
                <label>Locatin:</label>
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

                <button type='submit'>Create</button>
            </form>

        </>
    )
}

export default CafeForm
