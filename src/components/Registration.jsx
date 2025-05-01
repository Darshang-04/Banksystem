import { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

function Register() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/register`, form);
      alert('Registration successful');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <input className={styles.input} placeholder="Name" name="name" value={form.name} onChange={handleChange} />
      <input className={styles.input} placeholder="Email" name="email" value={form.email} onChange={handleChange} />
      <input className={styles.input} placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} />
      <select className={styles.input} name="role" value={form.role} onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="banker">Banker</option>
      </select>
      <button className={styles.button} onClick={register}>Register</button>
    </div>
  );
}

export default Register;
