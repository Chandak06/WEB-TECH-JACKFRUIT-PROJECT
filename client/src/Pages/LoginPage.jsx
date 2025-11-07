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

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    // Successful login
    login({ name: data.user.name, email: data.user.email });
    navigate('/');
  } catch (err) {
    console.error('Login error:', err);
    alert('Something went wrong. Try again!');
  }
};

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
