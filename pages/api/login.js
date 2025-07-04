const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: '1234', role: 'user', ip: null },
];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ error: 'Invalid login' });

  // For simplicity: store fake token and role
  res.status(200).json({
    token: `token-${user.username}`,
    user: { username: user.username, role: user.role, ip: user.ip || null },
  });
}
