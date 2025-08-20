import { useState } from 'react'
import { createCafe, updateCafe, allCafes } from '../../../lib/cafeApi'
import "./CafeForm.css"

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
        <div className="cafe-form-container">
            <h2 className="cafe-form-title">Cafe Form</h2>
            <form className="cafe-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="cafeName">Cafe Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="cafeName"
                        id="cafeName"
                        value={formData.cafeName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cafeImage">Cafe Image:</label>
                    <input
                        className="form-file"
                        type="file"
                        name="cafeImage"
                        id="cafeImage"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>

                <button className="form-btn" type="submit">
                    {selectedCafe ? "Update" : "Create"}
                </button>
            </form>
        </div>
    )
}


export default CafeForm
