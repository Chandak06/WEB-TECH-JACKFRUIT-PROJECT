import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Dashboard from './components/Dashboard.jsx';
import Browse from './components/Browse.jsx';
import MySessions from './components/MySessions.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        
        {/* Protected Routes - Add authentication later */}
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/sessions" element={<MySessions/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App