import { useParams, useNavigate } from "react-router"
import { deleteReview } from "../../../lib/reviewApi"

const ReviewDeleteBtn = () => {
    const params = useParams()
    const id = params.id

    const navigate = useNavigate()
    const handleDelete = async () => {
        await deleteCafe(id)
        navigate('/cafes')

    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default ReviewDeleteBtn
