import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { allCafes } from '../../../lib/cafeApi'
import './allCafeStyle.css'
const CafeList = ({ cafes }) => {


    if (!cafes) return <p>No data yet (login first)</p>
    return (

        <div className="cafe-list">

            <ul>
                {
                    cafes.map(cafe => {
                        return <li key={cafe._id}>
                            <Link to={`/cafes/${cafe._id}`}>
                                <img src={cafe.cafeImage} alt={cafe.cafeImagePublicId} />
                                <p>{cafe.cafeName}</p>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>

    )
}

export default CafeList
