import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Usertransaction() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    fetchTransactions();
  }, [id]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/transaction/${id}`);
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error('Error fetching:', err);
    }
  };

  const listItemStyle = (type) => ({
    color: type === 'deposit' ? 'green' : 'red',
    marginBottom: '8px',
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Transaction History for User ID: {id}</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {transactions.length === 0 ? (
          <li>No transactions found.</li>
        ) : (
          transactions.map((txn) => (
            <li key={txn.id} style={listItemStyle(txn.type)}>
              {txn.type.toUpperCase()}: ₹{txn.amount} - {new Date(txn.createdAt).toLocaleString()}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
