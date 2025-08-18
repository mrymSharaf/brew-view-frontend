import React from 'react'
import { useState ,useEffect} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import { allCafes } from '../../../lib/cafeApi'

const CafeList = ({cafes,setCafas}) => {

  const [errors, setErrors] = useState('')



  if (!cafes) return <p>No data yet (login first)</p>
  return (
    <>
      <h2>All Cafes</h2>
      <ul>
        {
          cafes.map(cafe => {
            return <li key={cafe._id}><Link to={`/cafes/${cafe._id}`}>{cafe.cafeName}</Link></li>
          })
        }
      </ul>
      <p style={{ color: 'darkred' }}>{errors}</p>
    </>
  )
}

export default CafeList
