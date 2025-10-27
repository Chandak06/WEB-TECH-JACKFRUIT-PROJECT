import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useData } from "../context/DataContext.jsx";
import '../styles/SignupPage.css'

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { updateProfile } = useData();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // demo signup: create minimal profile and persist to storage
    const prof = { name: name || email.split('@')[0], email, location: '', bio: '', offered: [], wanted: [] }
    try { updateProfile(prof) } catch (err) { console.warn(err) }
    login({ name: prof.name, email })
    navigate('/dashboard')
  }

  return (
    <div className='login-box'>
      <div className='login-container'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input required placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input required placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

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
