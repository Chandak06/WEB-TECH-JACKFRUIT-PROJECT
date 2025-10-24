import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/SignupPage.css'

const Signup = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // demo: after "signup" redirect to home
    navigate('/')
  }

  return (
    <div className='login-box'>
      <div className='login-container'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input required placeholder="Full name" />
          <input required placeholder="Email" type="email" />
          <input required placeholder="Password" type="password" />

          <div className="form-actions">
            <button type="submit" className="btn-primary">Create account</button>
          </div>
        </form>

        <p className="small-note">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  )
}

export default Signup
