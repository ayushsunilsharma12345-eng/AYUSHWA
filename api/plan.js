import { handleTravelPlan, parseJsonBody } from './_lib/travelEngine.js';

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
    if (!body.destination) {
      return res.status(400).json({ error: 'Destination is required' });
    }
    const result = await handleTravelPlan(body);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in /api/plan:', err);
    return res.status(500).json({ error: 'Failed to generate itinerary' });
  }
}
