import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.SERVERLINK;
const DB_NAME = process.env.DB_NAME || 'skillswap';

let client = null;
let db = null;

// Connect to MongoDB
export async function connectDB() {
  if (db) return db; // return existing connection
  try {
    if (!uri) {
      console.warn('SERVERLINK not set. MongoDB will not be available.');
      return null;
    }
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    return null;
  }
}

// Get database instance
export function getDB() {
  if (!db) throw new Error('Database not connected. Call connectDB() first.');
  return db;
}

// Get a collection
export function getCollection(name) {
  return getDB().collection(name);
}

// Close connection (for cleanup)
export async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed.');
  }
}
