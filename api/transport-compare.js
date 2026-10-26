import { compareTransportLive, parseJsonBody } from './_lib/travelEngine.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = req.method === 'GET' ? req.query || {} : await parseJsonBody(req);
    const origin = body.origin || req.query?.origin;
    const destination = body.destination || req.query?.destination;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    const result = await compareTransportLive({
      origin,
      destination,
      date: body.date || req.query?.date,
      passengers: body.passengers || req.query?.passengers || 1,
      preference: body.preference || req.query?.preference || 'best_value',
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in /api/transport-compare:', err);
    return res.status(500).json({ error: 'Failed to compare transport fares' });
  }
}
