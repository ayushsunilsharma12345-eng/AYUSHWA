import { handleTravelChat, parseJsonBody } from './_lib/travelEngine.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    if (!body.message || typeof body.message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    const result = await handleTravelChat({
      message: body.message,
      destination: body.destination,
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: 'Failed to process travel chat' });
  }
}
