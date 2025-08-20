import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { allReviews } from "../../../lib/reviewApi"

const Home = () => {
  const [reviews, setReviews] = useState([])

  let user = null
  const token = localStorage.getItem("token")
  if (token) {
    try {
      user = jwtDecode(token)
    } catch (e) {
      user = null
    }
  }

  const getAllReviews = async () => {
    const response = await allReviews()
    setReviews(response.data)
  }
  useEffect(() => {
    getAllReviews()
  }, [])


  const foundReviews = reviews.filter((review) => review.user._id === user.id)

  return (
    <>
      <h1>Welcome To Brewviews</h1>
      <h3>Your Reviews</h3>
      {foundReviews.length ? (
        <ul>
          {foundReviews.map((review) => (
            <li key={review._id}>
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't written any reviews</p>
      )}
    </>
  )
}



export default Home
