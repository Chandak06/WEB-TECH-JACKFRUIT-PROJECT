import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useData } from "../context/DataContext.jsx";
import '../styles/LoginPage.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { profile } = useData();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // demo login: no backend. Create a small user object and persist via AuthContext
    let name = email.split('@')[0] || 'User'
    try {
      if (profile && profile.email === email) name = profile.name || name
  } catch (err) { console.warn(err) }

    login({ name, email })
    navigate('/dashboard')
  }

  return (
    <div className='login-box'>
      <div className='login-container'>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input required placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

          <div className="form-actions">
            <button type="submit" className="btn-primary">Log in</button>
          </div>
        </form>

        <p className="small-note">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
