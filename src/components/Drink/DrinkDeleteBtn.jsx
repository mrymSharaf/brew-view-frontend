import { deleteDrink } from '../../../lib/drinkApi'
import { useNavigate, useParams } from "react-router"

const DrinkDeleteBtn = () => {
      const params = useParams()
    const id = params.id

    const navigate = useNavigate()
    const handleDelete = async () => {
        await deleteDrink(id)
        navigate('/cafes')

    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DrinkDeleteBtn
