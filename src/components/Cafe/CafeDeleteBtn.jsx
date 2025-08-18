import { deleteCafe } from "../../../lib/cafeApi"
import { useNavigate,useParams } from "react-router"

const CafeDeleteBtn = () => {
    const params = useParams()
    const id = params.id

    const navigate = useNavigate()
    const handleDelete = async() => {
        await deleteCafe(id)
        navigate('/cafes')

    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default CafeDeleteBtn
