import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { allReviews } from "../../../lib/reviewApi"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import './home.css'

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
      <NavBar />
      <div className="hero">
        <img src="\images\home-picture.png" alt="cafe-background" className="hero-img" />
        <div className="hero-overlay">
          <h1>Welcome to BrewView</h1>
        </div>
      </div>

      <div className="container">
        <div className="review-container">
          <h3>Your Reviews</h3>
          {foundReviews.length ? (
            <ul className="review-list">
              {foundReviews.map((review) => (
                <div className="container-cards">
                  <li className="home-review" key={review._id}>
                    <p>{review.content}</p>
                    <p className="home-rating">Rating: {review.rating}⭐️</p>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p className="home-empty-msg">You haven't written any reviews</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}



export default Home
