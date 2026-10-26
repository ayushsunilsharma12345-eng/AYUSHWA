import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  compareTransportLive,
  handleTravelChat,
  handleTravelPlan,
  handleCityIntelligence,
} from './api/_lib/travelEngine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Routes (shared with Vercel Serverless Functions in /api)
app.post('/api/chat', async (req, res) => {
  const { message, destination } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }
  try {
    const result = await handleTravelChat({ message, destination });
    return res.json(result);
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: 'Failed to process travel chat' });
  }
});

app.post('/api/plan', async (req, res) => {
  const { destination, days, budget, style, companions } = req.body || {};
  if (!destination) {
    return res.status(400).json({ error: 'Destination is required' });
  }
  try {
    const result = await handleTravelPlan({ destination, days, budget, style, companions });
    return res.json(result);
  } catch (err) {
    console.error('Error in /api/plan:', err);
    return res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

app.get('/api/intelligence/:city', (req, res) => {
  return res.json(handleCityIntelligence(req.params.city));
});

app.all('/api/transport-compare', async (req, res) => {
  const src = req.method === 'GET' ? req.query : req.body || {};
  const origin = src.origin || req.query?.origin;
  const destination = src.destination || req.query?.destination;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  try {
    const result = await compareTransportLive({
      origin: String(origin),
      destination: String(destination),
      date: src.date ? String(src.date) : undefined,
      passengers: Number(src.passengers) || 1,
      preference: src.preference ? String(src.preference) : 'best_value',
    });
    return res.json(result);
  } catch (err) {
    console.error('Error in /api/transport-compare:', err);
    return res.status(500).json({ error: 'Failed to compare transport fares' });
  }
});

// Setup Vite middleware in dev or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Travel Intelligence Agent Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
