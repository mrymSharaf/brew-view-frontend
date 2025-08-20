import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [errors, setErrors] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:3000/auth/signup', {
                username,
                password,
                role
            })
            navigate('/login')
        } catch (err) {
            setErrors('Signup failed. Please try again.')

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />

            <div>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === 'user'}
                        onChange={event => setRole(event.target.value)}
                    />
                    User
                </label>

                <label>
                    <input
                        type="radio"
                        name="role"
                        value="cafe"
                        checked={role === 'cafe'}
                        onChange={event => setRole(event.target.value)}
                    />
                    Cafe
                </label>
            </div>
            <p style={{ color: "red" }}>{errors}</p>

            <button type="submit">Sign Up</button>
        </form>
    )
}
export default SignUp