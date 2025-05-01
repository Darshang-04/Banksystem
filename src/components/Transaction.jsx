import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Transaction.module.css';

function Transactions() {
  const userId = localStorage.getItem('userId'); // ensure this is set at login
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  // 🔁 Fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/transaction/${userId}`);
      setTransactions(res.data.transactions);
      setBalance(res.data.balance);
    } catch (err) {
      console.error('Error fetching:', err);
    }
  };

  const handleOpen = (type) => {
    setAction(type);
    setAmount('');
    setError('');
    setShowModal(true);
  };

  const handleTransaction = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/transaction/action`, {
        userId,
        type: action,
        amount: value
      });

      alert('Transaction successful');
      setShowModal(false);
      fetchTransactions(); // Refresh updated balance and history
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Customer Transactions</h2>
      <div className={styles.balanceBox}>
        <strong>Available Balance:</strong> ₹{balance}
      </div>
      <div className={styles.buttonBox}>
        <button onClick={() => handleOpen('deposit')} className={styles.depositBtn}>Deposit</button>
        <button onClick={() => handleOpen('withdraw')} className={styles.withdrawBtn}>Withdraw</button>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <h3>{action === 'deposit' ? 'Deposit Amount' : 'Withdraw Amount'}</h3>
          <p>Available Balance: ₹{balance}</p>
          <input
            type="number"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <button onClick={handleTransaction}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <h4>Transaction History</h4>
      <ul className={styles.list}>
        {transactions.map((txn) => (
          <li key={txn.id} className={txn.type === 'deposit' ? styles.green : styles.red}>
            {txn.type.toUpperCase()}: ₹{txn.amount} - {new Date(txn.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
