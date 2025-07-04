import connect from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    await connect();

    // Example: just respond success for demo
    // Replace this with your real user validation logic
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
      return res.status(200).json({ message: 'Login successful', user: { username } });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Database connection error' });
  }
}
