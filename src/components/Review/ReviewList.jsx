import React from 'react'
import { useParams } from 'react-router'
import { cafeDetials } from '../../../lib/cafeApi'
import {useState, useEffect} from 'react'
import { drinkDetials } from '../../../lib/drinkApi'
import ReviewDeleteBtn from './ReviewDeleteBtn'

const ReviewList = ({ type }) => {
    const [reviews, setReviews] =useState([])
    const params = useParams()
    if (type === 'cafe') {
       
        const getCafeReviews = async () => {
            const foundReviews = await cafeDetials(params.id)
            console.log(foundReviews.data.cafeReviews)
            setReviews(foundReviews.data.cafeReviews)

        }

        useEffect( () => {
            getCafeReviews()
        },[])


    }else if(type === 'drink'){
        const getDrinkreviews = async () =>{
            const foundReviews = await drinkDetials(params.id)
            setReviews(foundReviews.data.cafeReviews)
        }
        useEffect( () => {
            getDrinkreviews()
        },[])
        
    }


    return (
        <>
            <h2>review list</h2>
            <ul>

            {
                reviews.length
                ?
                <>
                
                {
                    reviews.map(review => {
                       return(
                        <li key={review._id}>
                            <p>{review.content}</p>
                            <p>{review.rating}</p>
                            <ReviewDeleteBtn />
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
