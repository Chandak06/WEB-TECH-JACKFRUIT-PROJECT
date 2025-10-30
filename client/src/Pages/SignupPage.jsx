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

 const handleSubmit = async (e) => {
  e.preventDefault();

  const prof = {
    name: name || email.split('@')[0],
    email,
    password,
    location: '',
    bio: '',
    offered: [],
    wanted: [],
  };

  try {
    // send profile data to backend API
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prof),
    });

    if (!response.ok) throw new Error('Failed to register user');

    const data = await response.json();
    console.log('User created:', data);

    login({ name: prof.name, email });
    navigate('/');
  } catch (err) {
    console.error(err);
  }
};


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
