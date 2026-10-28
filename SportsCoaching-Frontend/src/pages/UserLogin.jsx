import { useState } from 'react'
import axios from 'axios'

function UserLogin() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [message,setMessage]= useState("")
  const [error,setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await axios.post('http://localhost:8001/user/login', loginData)

      if (response.status === 200) {
        console.log('Login successful:', response.data)
        setError('')
        setMessage('Login Success')
      } else {
        console.error('Login failed:', response)
        setMessage('')
        setError('Login Failed')
      }
    } catch (error) {
      setMessage('')

      if (error.response?.status === 401) {
        setError(error.response.data?.message || error.response.data || 'Invalid email or password')
      } else if (error.response?.status === 500) {
        setError('Internal Server Error')
      } else if (error.request) {
        setError('Network Error - Server not responding')
      } else {
        setError('Bad Request - Check your input')
      }
    }
  }

  return (
    <section className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          {message ? (
            <p style={{ color: 'green' }}>{message}</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : null}
          <h1>Login</h1>
          <p className="form-description">Sign in with your account details.</p>
        </div>
        <label>
          Email address
          <input name="email" type="email" value={loginData.email} onChange={handleChange} autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={loginData.password} onChange={handleChange} autoComplete="current-password" required />
        </label>
        <button className="button button-primary" type="submit">Login</button>
      </form>
    </section>
  )
}

export default UserLogin