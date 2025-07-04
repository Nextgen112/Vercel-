import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponse('Logging in...');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setResponse(`✅ Welcome ${data.user.username}, your IP: ${data.user.ip || 'unknown'}`);
    } else {
      setResponse(`❌ ${data.error}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>VIP Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Login</button>
      </form>
      <p style={{ marginTop: '20px', color: '#555' }}>{response}</p>
    </div>
  );
}
