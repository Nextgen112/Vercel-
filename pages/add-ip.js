import { useState } from 'react';

export default function AddIP() {
  const [message, setMessage] = useState('');

  async function handleAddIP() {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please login first.');
      return;
    }

    const res = await fetch('/api/add-ip', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Success! Your IP ${data.ip} added.`);
    } else {
      setMessage(data.error || 'Failed to add IP');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Add Your IP to Whitelist</h2>
      <button onClick={handleAddIP} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Add My IP
      </button>
      <p>{message}</p>
    </div>
  );
}
