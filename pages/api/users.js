// /pages/api/users.js

const users = [
  { username: 'admin', password: 'admin123', role: 'admin', whitelistedIPs: ['123.123.123.123'] },
  { username: 'user1', password: 'pass1', role: 'user', whitelistedIPs: ['111.111.111.111'] },
];

export default function handler(req, res) {
  // Simple check: only allow if admin (you can improve with auth token check)
  // For demo, no auth check here

  // Remove passwords before sending
  const safeUsers = users.map(({ password, ...rest }) => rest);

  res.status(200).json(safeUsers);
}
