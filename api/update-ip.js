import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI env var');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(m => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  ip: String,
  role: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password, newIp } = req.body;
  if (!username || !password || !newIp) return res.status(400).json({ error: 'Missing fields' });

  try {
    await connectToDatabase();
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    user.ip = newIp;
    await user.save();

    res.status(200).json({ message: 'IP updated', ip: newIp });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
}
