import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

function Login({onLogin}) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const login = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id)
      if(onLogin) onLogin();
      if(res.data.user.role === 'customer'){
        navigate('/account')
      }else{
        alert("Invalid credentials")
      }
    } catch (err) {
      console.log(err)
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className={styles.button} onClick={login}>Login</button>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
  <Link to="/bankerlogin" style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>
    Banker Login
  </Link>
</p>
    </div>
  );
}

export default Login;
