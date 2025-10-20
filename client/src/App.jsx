import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Dashboard from './components/Dashboard.jsx';
import Browse from './components/Browse.jsx';
import MySessions from './components/MySessions.jsx';
import Profile from './components/Profile.jsx';
import Messages from './components/Messages.jsx';
import Settings from './components/Settings.jsx';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/browse" element={<ProtectedRoute><Browse/></ProtectedRoute>}/>
          <Route path="/sessions" element={<ProtectedRoute><MySessions/></ProtectedRoute>}/>
          <Route path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/messages" element={<ProtectedRoute><Messages/></ProtectedRoute>}/>
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App