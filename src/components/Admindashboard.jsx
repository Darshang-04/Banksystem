import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Allcustomer.module.css';

export default function Admindashboard() {
  const [customers, setCustomers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/allcustomer`);
        setCustomers(res.data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Customer Accounts</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>View Transactions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => navigate(`/transaction/${customer.id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
