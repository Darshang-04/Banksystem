import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Registration';
import Home from './pages/Home';
import Transaction from './components/Transaction';
import Admindashboard from './components/Admindashboard';
import Usertransaction from './components/Usertransaction';
import Bankerlogin from './components/Bankerlogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        {!isLoggedIn ? (
          <>
            <Link to="/register" style={{ marginRight: '10px', color:'black', textDecoration:'none' }}>Register</Link>
            <Link to="/login" style={{ color:'black', textDecoration:'none'}}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/" style={{ marginRight: '10px', color:'black', textDecoration:'none'}}>Home</Link>
            <Link to="/account" style={{ marginRight: '10px', color:'black', textDecoration:'none'}}>Account</Link>
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/bankerlogin" element={<Bankerlogin onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/account" element={<Transaction />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/transaction/:id" element={<Usertransaction />} />
      </Routes>
    </div>
  );
}

export default App;
