import { Destination, GitCommit, FileDiff } from '../types/travel';

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    category: 'Urban',
    description: 'A hyper-modern metropolis juxtaposed with ancient shrines, Michelin-starred cuisine, and neon skylines.',
    highlights: ['Shinjuku Gyoen', 'Shibuya Crossing', 'Senso-ji Temple', 'Akihabara Tech District'],
    safetyScore: 94,
    bestMonths: 'March - May & October - November',
    currency: 'Japanese Yen (JPY)',
    language: 'Japanese',
    popularActivities: ['Sushi Omakase', 'Tea Ceremony', 'High-Speed Shinkansen Ride', 'Rooftop Observatories'],
    imageUrl: '/src/assets/images/tokyo_destination_1792583816197.jpg',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    category: 'Culture',
    description: 'The City of Light famed for haute couture, world-class art collections, historic cafes, and grand boulevards.',
    highlights: ['Louvre Museum', 'Eiffel Tower', 'Montmartre', 'Musée d\'Orsay'],
    safetyScore: 86,
    bestMonths: 'April - June & September - October',
    currency: 'Euro (EUR)',
    language: 'French',
    popularActivities: ['Seine River Cruise', 'Pastry Crawl', 'Louvre Masterpieces', 'Palace of Versailles'],
    imageUrl: '/src/assets/images/paris_destination_1792583817332.jpg',
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'United States',
    lat: 40.7128,
    lng: -74.0060,
    category: 'Urban',
    description: 'The vibrant cultural and financial capital known for Broadway, iconic skyscrapers, and diverse food enclaves.',
    highlights: ['Central Park', 'Broadway Theater', 'Metropolitan Museum of Art', 'High Line Walk'],
    safetyScore: 84,
    bestMonths: 'May - June & September - November',
    currency: 'US Dollar (USD)',
    language: 'English',
    popularActivities: ['Broadway Show', 'Summit One Vanderbilt', 'Brooklyn Bridge Walk', 'Chelsea Market'],
    imageUrl: '/src/assets/images/travel_hero_banner_1792583815200.jpg',
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    lat: -8.4095,
    lng: 115.1889,
    category: 'Beach',
    description: 'Tropical paradise featuring terraced rice paddies, spiritual volcanic temples, world-class surf, and wellness retreats.',
    highlights: ['Ubud Monkey Forest', 'Uluwatu Sunset Temple', 'Tegallalang Rice Terrace', 'Canggu Surf Beach'],
    safetyScore: 88,
    bestMonths: 'April - October (Dry season)',
    currency: 'Indonesian Rupiah (IDR)',
    language: 'Indonesian & Balinese',
    popularActivities: ['Sunrise Mt. Batur Trek', 'Yoga & Wellness', 'Traditional Kecak Dance', 'Snorkeling in Nusa Penida'],
    imageUrl: '/src/assets/images/bali_destination_1792583817842.jpg',
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    lat: 64.1466,
    lng: -21.9426,
    category: 'Nature',
    description: 'Gateway to the land of ice and fire, geothermal hot springs, cascading waterfalls, and the ethereal Northern Lights.',
    highlights: ['Blue Lagoon', 'Golden Circle', 'Hallgrimskirkja', 'Black Sand Beach Vik'],
    safetyScore: 98,
    bestMonths: 'June - August (Midnight Sun) or Nov - March (Aurora Borealis)',
    currency: 'Icelandic Króna (ISK)',
    language: 'Icelandic & English',
    popularActivities: ['Northern Lights Hunt', 'Glacier Hiking', 'Geothermal Spa Bathing', 'Whale Watching'],
    imageUrl: '/src/assets/images/reykjavik_destination_1792583818339.jpg',
  },
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    lat: 30.0444,
    lng: 31.2357,
    category: 'Historic',
    description: 'Cradle of ancient civilization where millennia-old pyramids overlook the mighty Nile river and bustling souks.',
    highlights: ['Giza Pyramids & Sphinx', 'Grand Egyptian Museum', 'Khan el-Khalili Bazaar', 'Al-Azhar Mosque'],
    safetyScore: 78,
    bestMonths: 'October - April (Cooler temperatures)',
    currency: 'Egyptian Pound (EGP)',
    language: 'Arabic',
    popularActivities: ['Pyramid Camel Ride', 'Nile Felucca Sail', 'Spices & Perfume Souk Bargaining', 'Ancient Antiquities Tour'],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
    category: 'Urban',
    description: 'Sun-drenched harbor city famed for architectural icons, pristine coastal coastal walks, and beach culture.',
    highlights: ['Sydney Opera House', 'Bondi Beach', 'Harbour Bridge', 'Taronga Zoo'],
    safetyScore: 92,
    bestMonths: 'September - November & March - May',
    currency: 'Australian Dollar (AUD)',
    language: 'English',
    popularActivities: ['BridgeClimb Sydney', 'Bondi to Coogee Coastal Walk', 'Harbour Catamaran Cruise', 'Manly Ferry'],
  },
  {
    id: 'riodejaneiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    lat: -22.9068,
    lng: -43.1729,
    category: 'Beach',
    description: 'Dazzling seaside city surrounded by dramatic granite peaks, samba rhythms, and legendary golden beaches.',
    highlights: ['Christ the Redeemer', 'Sugarloaf Mountain', 'Copacabana Beach', 'Selarón Steps'],
    safetyScore: 74,
    bestMonths: 'May - October (Pleasant winter sunshine)',
    currency: 'Brazilian Real (BRL)',
    language: 'Portuguese',
    popularActivities: ['Cable Car to Sugarloaf', 'Samba Club in Lapa', 'Hang Gliding over São Conrado', 'Sunset at Arpoador'],
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    country: 'South Africa',
    lat: -33.9249,
    lng: 18.4241,
    category: 'Nature',
    description: 'Where dramatic mountains plunge into two oceans, accompanied by lush winelands and rich multicultural history.',
    highlights: ['Table Mountain Aerial Cableway', 'Cape Point', 'Kirstenbosch Botanical Gardens', 'Boulders Penguin Beach'],
    safetyScore: 72,
    bestMonths: 'November - March (Warm & dry)',
    currency: 'South African Rand (ZAR)',
    language: 'English, Afrikaans, Xhosa',
    popularActivities: ['Table Mountain Hike', 'Cape Peninsula Scenic Drive', 'Stellenbosch Wine Tasting', 'Penguin Colony Visit'],
  },
];

export const OPEN_SOURCE_COMMITS: GitCommit[] = [
  {
    hash: '8f4d92a43b23c2a445d01211e03f905e466b011c',
    shortHash: '8f4d92a',
    message: 'feat(core): implement interactive 3D Three.js globe and multi-day GenAI travel planner engine',
    author: 'Ayush Sharma <ayushsunilsharma12345@gmail.com>',
    timestamp: '2 hours ago',
    stats: { additions: 342, deletions: 12 },
  },
  {
    hash: '4e29b101c5188f6381dfc95780ea3b2fa5674c99',
    shortHash: '4e29b10',
    message: 'feat(api): integrate server-side Google GenAI (gemini-3.8-flash) travel intelligence routes',
    author: 'Ayush Sharma <ayushsunilsharma12345@gmail.com>',
    timestamp: '5 hours ago',
    stats: { additions: 185, deletions: 4 },
  },
  {
    hash: '90a3c4287bc1e0998f8872f093cb4a08df932e18',
    shortHash: '90a3c42',
    message: 'docs: add technical architecture diagrams, academic submission report & PDF export suite',
    author: 'Ayush Sharma <ayushsunilsharma12345@gmail.com>',
    timestamp: '1 day ago',
    stats: { additions: 220, deletions: 0 },
  },
  {
    hash: 'b12e873cf1a80c983a45112cd45690b23081e745',
    shortHash: 'b12e873',
    message: 'test(planner): add unit tests for itinerary schema validation and safety score calculations',
    author: 'Ayush Sharma <ayushsunilsharma12345@gmail.com>',
    timestamp: '2 days ago',
    stats: { additions: 94, deletions: 2 },
  },
];

export const FILE_DIFFS: FileDiff[] = [
  {
    filename: 'server.ts',
    status: 'modified',
    additions: 128,
    deletions: 8,
    patch: `@@ -15,8 +15,128 @@
+import { GoogleGenAI } from '@google/genai';
+const ai = new GoogleGenAI({
+  apiKey: process.env.GEMINI_API_KEY,
+  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
+});
+
+app.post('/api/plan', async (req, res) => {
+  const { destination, days, budget, style, companions } = req.body;
+  const response = await ai.models.generateContent({
+    model: 'gemini-3.8-flash',
+    contents: buildTravelPrompt(destination, days, budget, style, companions),
+    config: { responseMimeType: 'application/json' }
+  });
+  res.json(JSON.parse(response.text));
+});
`,
  },
  {
    filename: 'src/components/ThreeGlobe.tsx',
    status: 'added',
    additions: 214,
    deletions: 0,
    patch: `@@ -0,0 +1,214 @@
+import * as THREE from 'three';
+// High-performance WebGL 3D Globe with dynamic lat/lng projection
+export function ThreeGlobe({ destinations, selectedId, onSelect }) {
+  const scene = new THREE.Scene();
+  const sphere = new THREE.Mesh(
+    new THREE.SphereGeometry(2, 64, 64),
+    new THREE.MeshStandardMaterial({
+      color: 0x0f172a,
+      roughness: 0.6,
+      metalness: 0.2
+    })
+  );
+  scene.add(sphere);
+  // Render animated flight paths & glowing marker pins
+  ...
+}`,
  },
  {
    filename: 'src/types/travel.ts',
    status: 'added',
    additions: 48,
    deletions: 0,
    patch: `@@ -0,0 +1,48 @@
+export interface TripItinerary {
+  destination: string;
+  days: DayActivity[];
+  estimatedTotalCost: string;
+  packingEssentials: string[];
+  safetyTips: string[];
+}`,
  },
];
