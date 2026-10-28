# AI Travel Intelligence Agent (AYUSHWA)

An open-source web app that combines a 3D globe (Three.js), destination safety briefings and AI-generated itineraries (Google Gemini).

Live demo: https://ayushwa.vercel.app/

## Features
- Featured destination gallery with safety scores
- Interactive 3D Earth with clickable pins
- Destination briefing: safety, ideal window, currency, language
- Generate AI Itinerary (Gemini) with a fallback if the API fails
- Project report page with PDF download

## Tech stack
React, TypeScript, Vite, Tailwind CSS, Three.js, Express, @google/genai, jsPDF, Vercel

## Run locally
1. npm install
2. Create a .env file: GEMINI_API_KEY=your_key
3. npm run dev  (open http://localhost:3000)

## Contributing
Fork the repo, create a branch, make your change, and open a pull request.

   ## Contributors

   - [Parth Shelar](https://github.com/patty2005-coder)

## Limitations
Safety scores are curated values, not live data. AI itineraries may be inaccurate.

## License
MIT
