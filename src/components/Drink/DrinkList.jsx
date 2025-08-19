import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'

const DrinkList = ({ drinks }) => {

    return (
        <>
            <ul>
                {drinks.map(drink => (
                    <li key={drink._id}>
                        <Link to={`/drinks/${drink._id}`}>
                            {drink.drinkName} - {drink.price} BHD
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DrinkList
