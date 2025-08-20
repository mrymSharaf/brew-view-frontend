import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import './DrinkList.css'

const DrinkList = ({ drinks, cafeId }) => {

    const filterDrinks = drinks.filter(drink => drink.cafe === cafeId)

    return (
        <div className="drink-list-container">
            {filterDrinks.map(drink => (
                <Link to={`/drinks/${drink._id}`} key={drink._id} className="drink-card">
                    <img
                        src={drink.drinkImage}
                        alt={drink.drinkImagePublicId}
                        className="drink-image"
                    />
                    <div className="drink-info">
                        <span className="drink-name">{drink.drinkName}</span>
                        <span className="drink-price">{drink.price} BHD</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default DrinkList
