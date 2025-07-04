import { users } from '../../data/users';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  // Find user
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Get client IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  // Add IP to whitelist if not exists
  if (!user.whitelistedIPs.includes(ip)) {
    user.whitelistedIPs.push(ip);
  }

  res.status(200).json({ message: 'IP added', whitelistedIPs: user.whitelistedIPs });
}
