import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Helper: file-backed storage
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial = { skills: [], requests: [], profile: {} };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '{}');
  } catch (err) {
    console.error('Failed to read data file', err);
    return { skills: [], requests: [], profile: {} };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write data file', err);
  }
}

// Simple auto-increment id using timestamp
function nextId() {
  return Date.now();
}

// Routes
app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }));

// Skills
app.get('/api/skills', (req, res) => {
  const data = readData();
  res.json(data.skills || []);
});

app.get('/api/skills/:id', (req, res) => {
  const data = readData();
  const s = (data.skills || []).find((x) => String(x.id) === String(req.params.id));
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

app.post('/api/skills', (req, res) => {
  const data = readData();
  const { title, level, tags = [], desc, provider } = req.body;
  if (!title || !desc) return res.status(400).json({ error: 'title and desc required' });
  const skill = { id: nextId(), title, level, tags, desc, provider };
  data.skills = [skill, ...(data.skills || [])];
  writeData(data);
  res.status(201).json(skill);
});

// Requests
app.get('/api/requests', (req, res) => {
  const data = readData();
  res.json(data.requests || []);
});

app.post('/api/requests', (req, res) => {
  const data = readData();
  const { skill, from, message, date } = req.body;
  if (!skill || !from) return res.status(400).json({ error: 'skill and from are required' });
  const r = { id: nextId(), skill, from, message: message || '', date: date || new Date().toISOString().split('T')[0], status: 'pending' };
  data.requests = [r, ...(data.requests || [])];
  writeData(data);
  res.status(201).json(r);
});

app.patch('/api/requests/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  const { status } = req.body;
  let found = false;
  data.requests = (data.requests || []).map((x) => {
    if (Number(x.id) === id) {
      found = true;
      return { ...x, status: status || x.status };
    }
    return x;
  });
  if (!found) return res.status(404).json({ error: 'Not found' });
  writeData(data);
  res.json({ ok: true });
});

// Profile
app.get('/api/profile', (req, res) => {
  const data = readData();
  res.json(data.profile || {});
});

app.put('/api/profile', (req, res) => {
  const data = readData();
  data.profile = { ...(data.profile || {}), ...(req.body || {}) };
  writeData(data);
  res.json(data.profile);
});

// Auth (demo)
app.post('/api/auth/signup', (req, res) => {
  const data = readData();
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  // store profile if empty
  data.profile = { ...(data.profile || {}), name: name || email.split('@')[0], email };
  writeData(data);
  res.json({ name: data.profile.name, email });
});

app.post('/api/auth/login', (req, res) => {
  const data = readData();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  const profile = data.profile || {};
  const name = profile.email === email ? profile.name : email.split('@')[0];
  res.json({ name, email });
});

// Fallback
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
