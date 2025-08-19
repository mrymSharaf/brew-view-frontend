import { useParams, useNavigate } from "react-router"
import { deleteReview ,allReviews} from "../../../lib/reviewApi"


const ReviewDeleteBtn = ({reviewId, getCafeReviews, getDrinkreviews}) => {


    const navigate = useNavigate()
    const handleDelete = async () => {
        await deleteReview(reviewId)
        await getCafeReviews()
        await getDrinkreviews()
        navigate('/')

    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default ReviewDeleteBtn
