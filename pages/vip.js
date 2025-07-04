import { useState } from 'react';

export default function Vip() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ip, setIp] = useState('');
  const [message, setMessage] = useState('');

  async function updateIp() {
    setMessage('Updating IP...');

    const res = await fetch('/api/update-ip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, newIp: ip }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`IP updated to: ${data.ip}`);
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>VIP Panel - Update IP</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="New IP" value={ip} onChange={e => setIp(e.target.value)} />
      <button onClick={updateIp}>Update IP</button>
      <p>{message}</p>
    </div>
  );
}
