import { createDrink, updateDrink } from '../../../lib/drinkApi'
import { useState } from 'react'
import axios from 'axios'

const DrinkForm = ({ setIsFormShown }) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        drinkName: '',
        drinkImage: null,
        price: '',
        description: ''
    })


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isSubmitting) return
        setIsSubmitting(true)

        const drinkId = formData._id
        const data = {
            drinkName: formData.drinkName,
            drinkImage: formData.drinkImage,
            price: formData.price,
            description: formData.description,
        }

        let response
        if (drinkId) {
            response = await updateDrink(drinkId, data)
        } else {
            response = await createDrink(data)
        }


        if ((drinkId && response.status === 200) || (!drinkId && response.status === 201)) {
            setIsFormShown(false)
        }

    }



    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>

                    <h1>{formData._id ? 'Edit Drink' : 'Add Drin'}</h1>

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

                    <button type="submit"> {formData._id ? 'Save' : 'Add Drink'}</button>

                </form>
            </div>
        </>
    )
}

export default DrinkForm
