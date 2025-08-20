import { createDrink, updateDrink, allDrinks } from '../../../lib/drinkApi'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import '../Cafe/CafeForm.css'

const DrinkForm = ({ selectedDrink, setDrinks, setIsFormShown }) => {
    const initialState = {
        drinkName: '',
        drinkImage: '',
        price: '',
        description: ''
    }

    const [formData, setFormData] = useState(
        selectedDrink ? selectedDrink : initialState
    )
    const params = useParams()

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleFileChange = (event) => {
        setFormData({ ...formData, drinkImage: event.target.files[0] })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData()
        data.append("drinkName", formData.drinkName)
        data.append("price", formData.price)
        data.append("description", formData.description)
        if (formData.drinkImage) {
            data.append("drinkImage", formData.drinkImage)
        }

        let response = null

        if (selectedDrink) {
            response = await updateDrink(data, selectedDrink._id)
        } else {
            response = await createDrink({ ...formData, cafe: params.id })
        }

        if (response.status === 200 || response.status === 201) {
            setIsFormShown(false)
        }

        response = await allDrinks()
        setDrinks(response.data)
        setFormData(initialState)
    }



    return (
        <div className="cafe-form-container">
            <h2 className="cafe-form-title">
                {formData._id ? "Edit Drink" : "Add Drink"}
            </h2>

            <form className="cafe-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="drinkName">Drink Name</label>
                    <input
                        className="form-input"
                        type="text"
                        value={formData.drinkName}
                        onChange={handleChange}
                        id="drinkName"
                        name="drinkName"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="drinkImage">Picture</label>
                    <input
                        className="form-file"
                        type="file"
                        onChange={handleFileChange}
                        id="drinkImage"
                        name="drinkImage"
                        accept="image/*"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        id="price"
                        name="price"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-input"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        id="description"
                        name="description"
                    />
                </div>

                <button className="form-btn" type="submit">
                    {formData._id ? "Save" : "Create"}
                </button>
            </form>
        </div>
    )
}

export default DrinkForm
