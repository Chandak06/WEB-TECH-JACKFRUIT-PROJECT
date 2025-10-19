import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/signup" element={<SignUp/>}/>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App