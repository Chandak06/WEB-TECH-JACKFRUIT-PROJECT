import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.SERVERLINK;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('userDatabase');
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectDB();

app.post('/api/signup', async (req, res) => {
  const { name, email, password, location, bio, offered, wanted } = req.body;

  try {
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      location,
      bio,
      offered,
      wanted,
    };

    await users.insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not registered!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password!' });
    }

    res.status(200).json({
      message: 'Login successful!',
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/profile/:email', async (req, res) => {
  const { email } = req.params;
  const { name, location, bio, offered, wanted } = req.body;

  try {
    const users = db.collection('users');

    const result = await users.updateOne(
      { email },
      { $set: { name, location, bio, offered, wanted } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/profile/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const users = db.collection('users');

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { hashedPassword, ...userData } = user;

    res.status(200).json(userData);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/skills', async (req, res) => {
  const { title, level, tags, desc, provider } = req.body;

  try {
    const skills = db.collection('skills');

    const newSkill = {
      title,
      level,
      tags,
      desc,
      provider,
      createdAt: new Date(),
    };

    await skills.insertOne(newSkill);
    res.status(201).json({ message: 'Skill added successfully!' });
  } catch (err) {
    console.error('Error adding skill:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const skills = db.collection('skills');

    const allSkills = await skills.find({}).toArray();
    res.status(200).json(allSkills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  const { id } = req.params;
  const { title, level, tags, desc } = req.body;

  try {
    const skills = db.collection('skills');
    const result = await skills.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, level, tags, desc, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill updated successfully' });
  } catch (err) {
    console.error('Error updating skill:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const skills = db.collection('skills');
    const result = await skills.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = db.collection('users');

    const allUsers = await users.find({}).toArray();
    // ...existing code...
    const sanitizedUsers = allUsers.map(({ password, ...user }) => user);
    res.status(200).json(sanitizedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/requests', async (req, res) => {
  const { skill, from, to, message, date, status } = req.body;

  try {
    const requests = db.collection('requests');

    const newRequest = {
      skill,
      from,
      to,
      message,
      date,
      status,
      createdAt: new Date(),
    };

    await requests.insertOne(newRequest);
    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Error adding request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/requests', async (req, res) => {
  const { to } = req.query;
  try {
    const requests = db.collection('requests');
    const data = await requests.find(to ? { to } : {}).toArray();
    res.json(data);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

import { ObjectId } from 'mongodb';

app.put('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const requests = db.collection('requests');
    await requests.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/requests/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const requests = db.collection('requests');
    const result = await requests.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request cancelled successfully' });
  } catch (err) {
    console.error('Error deleting request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));