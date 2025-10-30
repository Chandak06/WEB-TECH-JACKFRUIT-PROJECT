import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Replace with your own MongoDB connection string
const uri = process.env.SERVERLINK; // connects to the server from here
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectDB();

app.post('/api/signup', async (req, res) => { // from the sign-up page we come here
  const { name, email, password, location, bio, offered, wanted } = req.body;

  try {
    const db = client.db('userDatabase'); // creates a database if it doesn't exist
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // safety is key

    const newUser = {
      name,
      email,
      hashedPassword, 
      location,
      bio,
      offered,
      wanted,
    };

    await users.insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
