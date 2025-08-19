import { deleteReview } from "../../../lib/reviewApi"
import { useNavigate, useParams } from "react-router"

const DrinkReviewDeleteBtn = ({reviewId,getDrinkReviews}) => {

    const navigate = useNavigate()
    const params = useParams()

    const handleDelete = async () => {
        await deleteReview(reviewId)
        await getDrinkReviews()
        navigate(`/drinks/${params.id}`)
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DrinkReviewDeleteBtn
