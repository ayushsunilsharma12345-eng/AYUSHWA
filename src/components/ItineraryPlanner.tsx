import React, { useState } from 'react';
import { TripItinerary } from '../types/travel';
import { Sparkles, Calendar, Wallet, Users, Compass, CheckCircle2, AlertTriangle, Utensils, Luggage, ArrowRight, Loader2, Share2, Printer } from 'lucide-react';

interface ItineraryPlannerProps {
  initialDestination: string;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ initialDestination }) => {
  const [destination, setDestination] = useState<string>(initialDestination || 'Tokyo');
  const [days, setDays] = useState<number>(3);
  const [budget, setBudget] = useState<string>('Moderate');
  const [style, setStyle] = useState<string>('Cultural & Sightseeing');
  const [companions, setCompanions] = useState<string>('Solo');
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [copyFeedback, setCopyFeedback] = useState<string>('');

  // Handle generation
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          budget,
          style,
          companions,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate itinerary');
      const data: TripItinerary = await response.json();
      setItinerary(data);
      setActiveDayTab(1);
    } catch (err) {
      console.error(err);
      // Fallback local synthesis
      setItinerary({
        destination,
        title: `${days}-Day ${destination} Curated Expedition`,
        summary: `A high-efficiency ${days}-day plan balancing iconic must-sees and off-the-beaten-path neighborhood discoveries for ${companions.toLowerCase()} travelers.`,
        recommendedSeason: 'Spring (March - May) & Autumn (September - November)',
        currency: 'Local Currency (USD & Cards accepted)',
        estimatedTotalCost: `$${days * 120} - $${days * 220} USD`,
        days: Array.from({ length: days }).map((_, i) => ({
          dayNumber: i + 1,
          theme: i === 0 ? 'Heritage Landmarks & City Introduction' : i === 1 ? 'Arts, Gastronomy & Architecture' : `Scenic Excursions & Local Culture #${i + 1}`,
          morning: `Begin early with local espresso and an architectural exploration of the city's historic center.`,
          afternoon: `Immerse in premier regional galleries, heritage botanical grounds, and artisan workshops.`,
          evening: `Enjoy culinary favorites at a highly-rated local trattoria and panoramic twilight views.`,
          transitTip: `Use multi-day tourist transit cards or rapid public metro lines.`,
        })),
        packingEssentials: ['Universal travel adapter', 'Comfortable walking sneakers', 'Weather-resistant jacket', 'Light backpack'],
        safetyTips: ['Keep digital backups of passports', 'Beware of crowded transit pickpocket hotspots'],
        culinaryHighlights: ['Signature local street specialties', 'Farm-to-table regional lunch tasting'],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyItinerary = () => {
    if (!itinerary) return;
    const text = `# ${itinerary.title}\nDestination: ${itinerary.destination}\nDuration: ${itinerary.days.length} Days\nEstimated Cost: ${itinerary.estimatedTotalCost}\n\n${itinerary.days
      .map(
        (d) =>
          `## Day ${d.dayNumber}: ${d.theme}\n- Morning: ${d.morning}\n- Afternoon: ${d.afternoon}\n- Evening: ${d.evening}\n- Transit: ${d.transitTip}\n`
      )
      .join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopyFeedback('Copied to clipboard!');
    setTimeout(() => setCopyFeedback(''), 3000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white">AI Itinerary Intelligence Engine</h2>
        </div>
        <p className="text-slate-400 text-sm mt-1">
          Generate optimized day-by-day itineraries, transit routes, budget breakdowns, and safety tips using Google GenAI (Gemini 3.8 Flash).
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {/* Destination */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Destination City / Country
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Kyoto, Rome, Banff, Reykjavik..."
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm font-medium"
            required
          />
        </div>

        {/* Days */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Trip Duration
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500 text-sm"
          >
            <option value={1}>1 Day (Express)</option>
            <option value={2}>2 Days (Weekend)</option>
            <option value={3}>3 Days (Highlights)</option>
            <option value={5}>5 Days (Immersive)</option>
            <option value={7}>7 Days (Full Week)</option>
            <option value={10}>10 Days (Deep Dive)</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Budget Tier
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500 text-sm"
          >
            <option value="Backpacker">Backpacker ($)</option>
            <option value="Moderate">Moderate ($$)</option>
            <option value="Luxury">Luxury ($$$)</option>
          </select>
        </div>

        {/* Style */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Travel Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500 text-sm"
          >
            <option value="Cultural & Sightseeing">Cultural & Sightseeing</option>
            <option value="Nature & Adventure">Nature & Adventure</option>
            <option value="Gastronomy & Foodie">Gastronomy & Foodie</option>
            <option value="Relaxation & Wellness">Relaxation & Wellness</option>
          </select>
        </div>

        {/* Companions & Submit Button */}
        <div className="md:col-span-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Traveling As:</span>
            {['Solo', 'Couple', 'Family', 'Friends'].map((comp) => (
              <button
                key={comp}
                type="button"
                onClick={() => setCompanions(comp)}
                className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                  companions === comp
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-semibold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synthesizing Itinerary...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                Generate Tailored Itinerary
              </>
            )}
          </button>
        </div>
      </form>

      {/* Generated Itinerary Output */}
      {itinerary && (
        <div className="mt-8 border-t border-slate-800 pt-6 animate-fadeIn">
          {/* Trip Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-800/50 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/60">
                  {itinerary.days.length}-Day Plan
                </span>
                <span className="text-xs text-slate-400">• {itinerary.recommendedSeason}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">{itinerary.title}</h3>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">{itinerary.summary}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl text-right">
                <div className="text-[11px] text-slate-400 font-medium uppercase">Est. Total Budget</div>
                <div className="text-lg font-black text-emerald-400">{itinerary.estimatedTotalCost}</div>
              </div>

              <button
                onClick={handleCopyItinerary}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
                title="Copy markdown itinerary"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                {copyFeedback || 'Copy Plan'}
              </button>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pb-2 border-b border-slate-800">
            {itinerary.days.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDayTab(d.dayNumber)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  activeDayTab === d.dayNumber
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Day {d.dayNumber}: {d.theme.length > 25 ? d.theme.slice(0, 25) + '...' : d.theme}
              </button>
            ))}
          </div>

          {/* Active Day Detail Card */}
          {itinerary.days
            .filter((d) => d.dayNumber === activeDayTab)
            .map((day) => (
              <div key={day.dayNumber} className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Day {day.dayNumber} Agenda</span>
                    <h4 className="text-xl font-bold text-white mt-0.5">{day.theme}</h4>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    Step-by-step Execution
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                  {/* Morning */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Morning Session (08:30 - 12:30)
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed flex-1">{day.morning}</p>
                  </div>

                  {/* Afternoon */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase mb-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Afternoon Immersion (13:30 - 17:30)
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed flex-1">{day.afternoon}</p>
                  </div>

                  {/* Evening */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase mb-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Evening & Dining (18:30 - 22:00)
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed flex-1">{day.evening}</p>
                  </div>
                </div>

                {/* Transit Advice */}
                <div className="mt-4 p-3.5 bg-cyan-950/20 border border-cyan-800/40 rounded-xl flex items-center gap-3 text-xs text-cyan-200">
                  <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    <strong>Transit & Navigation Tip:</strong> {day.transitTip}
                  </span>
                </div>
              </div>
            ))}

          {/* Packing & Advisory Footers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Packing List */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase mb-3">
                <Luggage className="w-4 h-4 text-sky-400" />
                Packing Essentials
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {itinerary.packingEssentials.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Culinary Highlights */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase mb-3">
                <Utensils className="w-4 h-4 text-amber-400" />
                Culinary Highlights
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {itinerary.culinaryHighlights.map((dish, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-400 text-xs font-bold">✦</span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Advisories */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase mb-3">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Safety & Etiquette
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {itinerary.safetyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-rose-400 text-xs font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
