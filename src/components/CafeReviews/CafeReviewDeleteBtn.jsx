import { deleteReview } from "../../../lib/reviewApi"
import { useNavigate, useParams } from "react-router"

const CafeReviewDeleteBtn = ({reviewId,getCafeReviews}) => {

    const navigate = useNavigate()
    const params = useParams()

    const handleDelete = async () => {
        await deleteReview(reviewId)
        await getCafeReviews()
        navigate(`/cafes/${params.id}`)
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default CafeReviewDeleteBtn
