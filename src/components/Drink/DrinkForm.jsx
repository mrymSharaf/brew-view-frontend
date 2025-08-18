import { createDrink, updateDrink, allDrinks } from '../../../lib/drinkApi'
import { useState } from 'react'
import axios from 'axios'

const DrinkForm = ({ selected, setDrinks, setIsFormShown }) => {
    const initialState = {
        drinkName: '',
        drinkImage: '',
        price: '',
        description: ''
    }

    const [formData, setFormData] = useState(
        selected ? selected : initialState
    )

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let response = null

        if (selected) {
            response = await updateDrink(selected._id, formData)
        } else {
            response = await createDrink(formData)
        }

        if (response.status === 200 || response.status === 201) {
            setIsFormShown(false)
        }

        response = await allDrinks()
        setDrinks(response.data)
        setFormData(initialState)
    }



    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>

                    <h1>{formData._id ? 'Edit Drink' : 'Add Drink'}</h1>

                    <label htmlFor='drinkName'>Drink Name</label>
                    <input
                        value={formData.drinkName}
                        onChange={handleChange}
                        id='drinkName'
                        name='drinkName'
                    />

                    <label htmlFor='drinkImage'>Picture</label>
                    <input
                        value={formData.drinkImage}
                        onChange={handleChange}
                        id='drinkImage'
                        name='drinkImage'
                        type='file'
                    />

                    <label htmlFor='price'>Price</label>
                    <input
                        value={formData.price}
                        onChange={handleChange}
                        id='price'
                        name='price'
                    />

                    <label htmlFor='description'>Description</label>
                    <input
                        value={formData.description}
                        onChange={handleChange}
                        id='description'
                        name='description'
                    />

                    <button type="submit"> {formData._id ? 'Save' : 'Create'}</button>

                </form>
            </div>
        </>
    )
}

export default DrinkForm
