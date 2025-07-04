import { useEffect, useState } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);

  // You need to implement a secure API route to fetch users here
  // For now, this is a placeholder

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Admin Panel</h2>
      <p>Admin functionality to be implemented</p>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.username} - Role: {u.role} - IP: {u.ip}</li>
        ))}
      </ul>
    </div>
  );
}
