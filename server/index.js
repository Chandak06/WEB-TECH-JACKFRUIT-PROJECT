import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectDB, getCollection } from './database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const PORT = process.env.PORT || 4000;
const USE_MONGO = process.env.USE_MONGO === 'true';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// ============ STORAGE ABSTRACTION ============
let useMongo = false;

// File-based helpers
function readDataFile() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial = { skills: [], requests: [], profile: {}, users: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('Failed to read data file', err);
    return { skills: [], requests: [], profile: {}, users: [] };
  }
}

function writeDataFile(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write data file', err);
  }
}

// Storage layer
const storage = {
  async getSkills() {
    if (useMongo) {
      const col = getCollection('skills');
      return await col.find({}).toArray();
    }
    const data = readDataFile();
    return data.skills || [];
  },
  async getSkillById(id) {
    if (useMongo) {
      const col = getCollection('skills');
      return await col.findOne({ id: Number(id) });
    }
    const data = readDataFile();
    return (data.skills || []).find((s) => String(s.id) === String(id));
  },
  async addSkill(skill) {
    if (useMongo) {
      const col = getCollection('skills');
      await col.insertOne(skill);
      return skill;
    }
    const data = readDataFile();
    data.skills = [skill, ...(data.skills || [])];
    writeDataFile(data);
    return skill;
  },
  async updateSkill(id, updates) {
    if (useMongo) {
      const col = getCollection('skills');
      await col.updateOne({ id: Number(id) }, { $set: updates });
      return await col.findOne({ id: Number(id) });
    }
    const data = readDataFile();
    let found = null;
    data.skills = (data.skills || []).map((s) => {
      if (String(s.id) === String(id)) {
        found = { ...s, ...updates };
        return found;
      }
      return s;
    });
    if (found) writeDataFile(data);
    return found;
  },
  async deleteSkill(id) {
    if (useMongo) {
      const col = getCollection('skills');
      const result = await col.deleteOne({ id: Number(id) });
      return result.deletedCount > 0;
    }
    const data = readDataFile();
    const before = data.skills ? data.skills.length : 0;
    data.skills = (data.skills || []).filter((s) => String(s.id) !== String(id));
    const deleted = before > data.skills.length;
    if (deleted) writeDataFile(data);
    return deleted;
  },
  async getRequests() {
    if (useMongo) {
      const col = getCollection('requests');
      return await col.find({}).toArray();
    }
    const data = readDataFile();
    return data.requests || [];
  },
  async addRequest(req) {
    if (useMongo) {
      const col = getCollection('requests');
      await col.insertOne(req);
      return req;
    }
    const data = readDataFile();
    data.requests = [req, ...(data.requests || [])];
    writeDataFile(data);
    return req;
  },
  async updateRequest(id, updates) {
    if (useMongo) {
      const col = getCollection('requests');
      await col.updateOne({ id: Number(id) }, { $set: updates });
      return await col.findOne({ id: Number(id) });
    }
    const data = readDataFile();
    let found = null;
    data.requests = (data.requests || []).map((r) => {
      if (Number(r.id) === Number(id)) {
        found = { ...r, ...updates };
        return found;
      }
      return r;
    });
    if (found) writeDataFile(data);
    return found;
  },
  async deleteRequest(id) {
    if (useMongo) {
      const col = getCollection('requests');
      const result = await col.deleteOne({ id: Number(id) });
      return result.deletedCount > 0;
    }
    const data = readDataFile();
    const before = data.requests ? data.requests.length : 0;
    data.requests = (data.requests || []).filter((r) => Number(r.id) !== Number(id));
    const deleted = before > data.requests.length;
    if (deleted) writeDataFile(data);
    return deleted;
  },
  async getProfile() {
    if (useMongo) {
      const col = getCollection('profile');
      const doc = await col.findOne({ _id: 'default' });
      return doc || {};
    }
    const data = readDataFile();
    return data.profile || {};
  },
  async updateProfile(prof) {
    if (useMongo) {
      const col = getCollection('profile');
      await col.replaceOne({ _id: 'default' }, { _id: 'default', ...prof }, { upsert: true });
      return prof;
    }
    const data = readDataFile();
    data.profile = { ...(data.profile || {}), ...prof };
    writeDataFile(data);
    return data.profile;
  },
  // Users
  async findUserByEmail(email) {
    if (useMongo) {
      const col = getCollection('users');
      return await col.findOne({ email });
    }
    const data = readDataFile();
    return (data.users || []).find((u) => u.email === email);
  },
  async createUser(user) {
    if (useMongo) {
      const col = getCollection('users');
      await col.insertOne(user);
      return user;
    }
    const data = readDataFile();
    data.users = [...(data.users || []), user];
    writeDataFile(data);
    return user;
  },
  // Messages
  async getMessages() {
    if (useMongo) {
      const col = getCollection('messages');
      return await col.find({}).toArray();
    }
    const data = readDataFile();
    return data.messages || [];
  },
  async addMessage(msg) {
    if (useMongo) {
      const col = getCollection('messages');
      await col.insertOne(msg);
      return msg;
    }
    const data = readDataFile();
    data.messages = [msg, ...(data.messages || [])];
    writeDataFile(data);
    return msg;
  },
  async updateMessage(id, updates) {
    if (useMongo) {
      const col = getCollection('messages');
      await col.updateOne({ id: Number(id) }, { $set: updates });
      return await col.findOne({ id: Number(id) });
    }
    const data = readDataFile();
    let found = null;
    data.messages = (data.messages || []).map((m) => {
      if (Number(m.id) === Number(id)) {
        found = { ...m, ...updates };
        return found;
      }
      return m;
    });
    if (found) writeDataFile(data);
    return found;
  }
};

// ============ AUTH MIDDLEWARE ============
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// ============ ROUTES ============
function nextId() {
  return Date.now();
}

app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now(), useMongo }));

// Skills
app.get('/api/skills', async (req, res, next) => {
  try {
    let skills = await storage.getSkills();
    
    // Apply filters
    const { search, tag, level, provider, page = 1, limit = 20 } = req.query;
    
    if (search) {
      const searchLower = search.toLowerCase();
      skills = skills.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.desc.toLowerCase().includes(searchLower) ||
        (s.provider && s.provider.toLowerCase().includes(searchLower))
      );
    }
    
    if (tag) {
      skills = skills.filter(s => s.tags && s.tags.includes(tag));
    }
    
    if (level) {
      skills = skills.filter(s => s.level === level);
    }
    
    if (provider) {
      skills = skills.filter(s => s.provider === provider);
    }
    
    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedSkills = skills.slice(startIndex, endIndex);
    
    res.json({
      skills: paginatedSkills,
      total: skills.length,
      page: parseInt(page),
      totalPages: Math.ceil(skills.length / parseInt(limit))
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/skills/:id', async (req, res, next) => {
  try {
    const s = await storage.getSkillById(req.params.id);
    if (!s) return res.status(404).json({ error: 'Not found' });
    res.json(s);
  } catch (err) {
    next(err);
  }
});

app.post('/api/skills', async (req, res, next) => {
  try {
    const { title, level, tags = [], desc, provider } = req.body;
    if (!title || !desc) return res.status(400).json({ error: 'title and desc required' });
    const skill = { id: nextId(), title, level, tags, desc, provider };
    await storage.addSkill(skill);
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/skills/:id', async (req, res, next) => {
  try {
    const { title, level, tags, desc, provider } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (level !== undefined) updates.level = level;
    if (tags !== undefined) updates.tags = tags;
    if (desc !== undefined) updates.desc = desc;
    if (provider !== undefined) updates.provider = provider;
    const updated = await storage.updateSkill(req.params.id, updates);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/skills/:id', async (req, res, next) => {
  try {
    const deleted = await storage.deleteSkill(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// Requests
app.get('/api/requests', async (req, res, next) => {
  try {
    let requests = await storage.getRequests();
    
    // Apply filters
    const { status, from, to, skill } = req.query;
    
    if (status) {
      requests = requests.filter(r => r.status === status);
    }
    
    if (from) {
      requests = requests.filter(r => r.from === from);
    }
    
    if (to) {
      requests = requests.filter(r => r.to === to);
    }
    
    if (skill) {
      requests = requests.filter(r => r.skill.toLowerCase().includes(skill.toLowerCase()));
    }
    
    res.json(requests);
  } catch (err) {
    next(err);
  }
});

app.post('/api/requests', async (req, res, next) => {
  try {
    const { skill, from, to, message, date } = req.body;
    if (!skill || !from) return res.status(400).json({ error: 'skill and from are required' });
    const r = { 
      id: nextId(), 
      skill, 
      from, 
      to: to || null,
      message: message || '', 
      date: date || new Date().toISOString().split('T')[0], 
      status: 'pending' 
    };
    await storage.addRequest(r);
    res.status(201).json(r);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/requests/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await storage.updateRequest(Number(req.params.id), { status });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.delete('/api/requests/:id', async (req, res, next) => {
  try {
    const deleted = await storage.deleteRequest(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// Profile
app.get('/api/profile', async (req, res, next) => {
  try {
    const profile = await storage.getProfile();
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

app.put('/api/profile', async (req, res, next) => {
  try {
    const profile = await storage.updateProfile(req.body);
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

// ============ USER-SPECIFIC ENDPOINTS ============
// Get skills offered by a specific user
app.get('/api/users/:identifier/skills', async (req, res, next) => {
  try {
    const { identifier } = req.params;
    let skills = await storage.getSkills();
    
    // Filter by email or name
    skills = skills.filter(s => 
      s.provider === identifier || 
      (s.providerEmail && s.providerEmail === identifier)
    );
    
    res.json(skills);
  } catch (err) {
    next(err);
  }
});

// Get requests for/by a specific user
app.get('/api/users/:identifier/requests', async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { type } = req.query; // 'sent' or 'received'
    let requests = await storage.getRequests();
    
    if (type === 'sent') {
      requests = requests.filter(r => r.from === identifier);
    } else if (type === 'received') {
      requests = requests.filter(r => r.to === identifier);
    } else {
      // Return both sent and received
      requests = requests.filter(r => r.from === identifier || r.to === identifier);
    }
    
    res.json(requests);
  } catch (err) {
    next(err);
  }
});

// Get user stats
app.get('/api/users/:identifier/stats', async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const skills = await storage.getSkills();
    const requests = await storage.getRequests();
    
    const offeredSkills = skills.filter(s => s.provider === identifier).length;
    const sentRequests = requests.filter(r => r.from === identifier).length;
    const receivedRequests = requests.filter(r => r.to === identifier).length;
    const acceptedRequests = requests.filter(r => 
      (r.from === identifier || r.to === identifier) && r.status === 'accepted'
    ).length;
    
    res.json({
      offeredSkills,
      sentRequests,
      receivedRequests,
      acceptedRequests,
      totalSwaps: acceptedRequests
    });
  } catch (err) {
    next(err);
  }
});

// ============ MESSAGING ENDPOINTS ============
app.post('/api/messages', async (req, res, next) => {
  try {
    const { from, to, message, relatedSkill } = req.body;
    if (!from || !to || !message) {
      return res.status(400).json({ error: 'from, to, and message are required' });
    }
    
    const msg = {
      id: nextId(),
      from,
      to,
      message,
      relatedSkill: relatedSkill || null,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    await storage.addMessage(msg);
    res.status(201).json(msg);
  } catch (err) {
    next(err);
  }
});

app.get('/api/messages', async (req, res, next) => {
  try {
    const { user, with: withUser } = req.query;
    let messages = await storage.getMessages();
    
    if (user && withUser) {
      // Get conversation between two users
      messages = messages.filter(m => 
        (m.from === user && m.to === withUser) || 
        (m.from === withUser && m.to === user)
      );
    } else if (user) {
      // Get all messages for a user
      messages = messages.filter(m => m.from === user || m.to === user);
    }
    
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/messages/:id/read', async (req, res, next) => {
  try {
    const updated = await storage.updateMessage(Number(req.params.id), { read: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// ============ DASHBOARD STATS ============
app.get('/api/stats', async (req, res, next) => {
  try {
    const skills = await storage.getSkills();
    const requests = await storage.getRequests();
    const data = readDataFile();
    const users = data.users || [];
    
    const stats = {
      totalSkills: skills.length,
      totalUsers: users.length,
      totalRequests: requests.length,
      pendingRequests: requests.filter(r => r.status === 'pending').length,
      acceptedRequests: requests.filter(r => r.status === 'accepted').length,
      activeSwaps: requests.filter(r => r.status === 'accepted').length,
      skillsByLevel: {
        Beginner: skills.filter(s => s.level === 'Beginner').length,
        Intermediate: skills.filter(s => s.level === 'Intermediate').length,
        Advanced: skills.filter(s => s.level === 'Advanced').length
      },
      popularTags: getPopularTags(skills)
    };
    
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// Helper function for stats
function getPopularTags(skills) {
  const tagCounts = {};
  skills.forEach(s => {
    (s.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));
}

// Auth (demo) - keeping old endpoints for backward compatibility
app.post('/api/auth/signup', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });
    const profile = await storage.updateProfile({ name: name || email.split('@')[0], email });
    res.json({ name: profile.name, email });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });
    const profile = await storage.getProfile();
    const name = profile.email === email ? profile.name : email.split('@')[0];
    res.json({ name, email });
  } catch (err) {
    next(err);
  }
});

// ============ JWT AUTH ENDPOINTS ============
// Signup with password and JWT
app.post('/api/users/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await storage.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: nextId(),
      name: name || email.split('@')[0],
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    await storage.createUser(user);

    // Create profile
    await storage.updateProfile({ 
      name: user.name, 
      email: user.email, 
      location: '', 
      bio: '', 
      offered: [], 
      wanted: [] 
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

// Login with JWT
app.post('/api/users/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await storage.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

// Get current user (protected route example)
app.get('/api/users/me', authenticateToken, async (req, res, next) => {
  try {
    const user = await storage.findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    next(err);
  }
});

// Fallback 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// ============ STARTUP ============
async function startServer() {
  if (USE_MONGO) {
    const db = await connectDB();
    if (db) {
      useMongo = true;
      console.log('✅ Using MongoDB for storage.');
    } else {
      console.warn('⚠️  MongoDB unavailable. Falling back to file storage.');
    }
  } else {
    console.log('ℹ️  Using file-based storage (data.json).');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
