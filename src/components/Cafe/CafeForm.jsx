import { useState } from 'react'
import { createCafe, updateCafe, allCafes } from '../../../lib/cafeApi'

const CafeForm = ({ selectedCafe, setCafes, setIsFormShown }) => {
    const initalState = {
        cafeName: '',
        location: '',
        cafeImage: null
    }

    const [formData, setFormData] = useState(
        selectedCafe ? selectedCafe : initalState)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleFileChange = (event) => {
        setFormData({ ...formData, cafeImage: event.target.files[0] })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData()
        data.append('cafeName', formData.cafeName)
        data.append('location', formData.location)
        if (formData.cafeImage) {
            data.append('cafeImage', formData.cafeImage)
        }

        let response = null
        if (selectedCafe) {
            response = await updateCafe(data, selectedCafe._id)
        }
        else {
            response = await createCafe(data)
        }

        if (response.status === 200 || response.status === 201) {
            setIsFormShown(false)
        }
        response = await allCafes()
        setCafes(response.data)
        setFormData(initalState)


    }


    return (
        <>
            <h2>Cafe form</h2>
            <form onSubmit={handleSubmit} >
                <label>Cafe Name:</label>
                <input
                    name='cafeName'
                    id='cafeName'
                    value={formData.cafeName}
                    onChange={handleChange}

                />
                <label>Location:</label>
                <input
                    name='location'
                    id='location'
                    value={formData.location}
                    onChange={handleChange}

                />
                <label>Cafe Image:</label>
                <input
                    name='cafeImage'
                    id='cafeImage'
                    onChange={handleFileChange}
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
