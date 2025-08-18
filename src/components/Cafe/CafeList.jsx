import React from 'react'
import { useState } from 'react'

const CafeList = () => {

  const [cafes, setCafes] = useState(null)
  const [errors, setErrors] = useState('')

  async function fetchData() {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await axios.get('http://localhost:3000/cafes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCafes(res.data)
    } catch (err) {
      setErrors('Unauthorized or error fetching data')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!cafes) return <p>No data yet (login first)</p>
  return (
    <>
      <h2>All Cafes</h2>
      <ul>
        {
          cafes.map(cafe => {
            return <li>{cafe.name}</li>
          })
        }
      </ul>
      <p style={{ color: 'darkred' }}>{errors}</p>
    </>
  )
}

export default CafeList
