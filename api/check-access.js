export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ access: false });

  const username = token.replace('token-', '');
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ access: false });

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  if (user.whitelistedIPs.includes(ip)) {
    res.status(200).json({ access: true });
  } else {
    res.status(403).json({ access: false, message: 'IP not whitelisted' });
  }
}
