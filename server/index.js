import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Turso LibSQL Client
const tursoUrl = process.env.TURSO_DATABASE_URL || 'file:workaholic.db';
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN || '';

console.log(`Connecting to Turso Database at: ${tursoUrl}`);

const db = createClient({
  url: tursoUrl,
  authToken: tursoAuthToken
});

// Initialize Table Schema
async function initDb() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS leaves (
        date_key TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        category TEXT,
        half1 TEXT,
        half2 TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Turso database table schema initialized cleanly.');
  } catch (err) {
    console.error('Error initializing Turso database schema:', err);
  }
}

initDb();

// API Routes
app.get('/api/leaves', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM leaves');
    const leaves = {};
    result.rows.forEach((row) => {
      leaves[row.date_key] = {
        type: row.type,
        category: row.category || null,
        half1: row.half1 || null,
        half2: row.half2 || null
      };
    });
    res.json({ success: true, leaves });
  } catch (err) {
    console.error('GET /api/leaves error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/leaves', async (req, res) => {
  const { dateStr, entryData } = req.body;
  if (!dateStr || !entryData) {
    return res.status(400).json({ success: false, error: 'Missing dateStr or entryData' });
  }

  try {
    await db.execute({
      sql: `
        INSERT INTO leaves (date_key, type, category, half1, half2)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(date_key) DO UPDATE SET
          type = excluded.type,
          category = excluded.category,
          half1 = excluded.half1,
          half2 = excluded.half2
      `,
      args: [
        dateStr,
        entryData.type,
        entryData.category || null,
        entryData.half1 || null,
        entryData.half2 || null
      ]
    });
    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/leaves error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/leaves/:dateStr', async (req, res) => {
  const { dateStr } = req.params;
  try {
    await db.execute({
      sql: 'DELETE FROM leaves WHERE date_key = ?',
      args: [dateStr]
    });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/leaves error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve Vite Static Build in Production / Render
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
