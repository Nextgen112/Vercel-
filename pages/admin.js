// /pages/admin.js
import { useEffect, useState } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Admin - User List</h1>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Whitelisted IPs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ username, role, whitelistedIPs }) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{role}</td>
              <td>{whitelistedIPs.join(', ') || 'No IPs'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
