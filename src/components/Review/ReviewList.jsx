import React from 'react'
import { useParams } from 'react-router'
import { cafeDetials } from '../../../lib/cafeApi'
import {useState, useEffect} from 'react'
import { drinkDetials } from '../../../lib/drinkApi'
import ReviewDeleteBtn from './ReviewDeleteBtn'
import ReviewForm from './ReviewForm'

const ReviewList = ({ type, reviews, getCafeReviews }) => {
    // const [reviews, setReviews] =useState([])
    const params = useParams()
    //   const getCafeReviews = async () => {
    //         const foundReviews = await cafeDetials(params.id)
    //         console.log('cafe reviews',foundReviews.data.cafeReviews)
    //         setReviews(foundReviews.data.cafeReviews)

    //     }

    //       const getDrinkreviews = async () =>{
    //         const foundReviews = await drinkDetials(params.id)
    //         console.log(params)
    //         console.log('drink reviews',foundReviews.data.cafeReviews)
    //         setReviews(foundReviews.data.cafeReviews)
    //     }
    // if (type === 'cafe') {
       
      

    //     useEffect( () => {
    //         getCafeReviews()
    //     },[])


    // }else if(type === 'drink'){
      
    //     useEffect( () => {
    //         getDrinkreviews()
    //     },[])
        
    // }
    // console.log(reviews)

    return (
        <>
            <h2>review list</h2>
            <ul>

            {
                reviews
                ?
                <>
                
                {
                    reviews.map(review => {
                       return(
                        <li key={review._id}>
                            <p>{review.content}</p>
                            <p>{review.rating}</p>
                            <ReviewDeleteBtn 
                            reviewId={review._id}
                            getCafeReviews={getCafeReviews}
                             />
                        </li>
                    ) 

                    })
                }
          
                </>
                :
                <p>No reviews yet</p>

            }
            </ul>
            
        </>
    )
}

export default ReviewList
