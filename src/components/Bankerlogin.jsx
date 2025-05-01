import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

function Bankerlogin({onLogin}) {
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
      if(res.data.user.role === 'banker'){
        navigate('/admindashboard')
      }else{
        alert('Access denied: not a banker');
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
    </div>
  );
}

export default Bankerlogin;
