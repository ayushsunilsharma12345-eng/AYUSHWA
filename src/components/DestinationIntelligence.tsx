import React from 'react';
import { Destination } from '../types/travel';
import { ShieldCheck, CloudSun, DollarSign, Languages, Compass, AlertCircle, Droplets, PhoneCall } from 'lucide-react';

interface DestinationIntelligenceProps {
  destination: Destination;
  onPlanTrip: (destName: string) => void;
}

export const DestinationIntelligence: React.FC<DestinationIntelligenceProps> = ({
  destination,
  onPlanTrip,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Destination Hero Image Showcase */}
      {destination.imageUrl && (
        <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-slate-800 shadow-xl group">
          <img
            src={destination.imageUrl}
            alt={`${destination.name}, ${destination.country}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-800/80 uppercase tracking-wide">
                {destination.category} Destination
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
                {destination.name}, <span className="text-cyan-400">{destination.country}</span>
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Safety Score: {destination.safetyScore}/100
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          {!destination.imageUrl && (
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase tracking-wide">
                {destination.category} Destination
              </span>
              <span className="text-xs text-slate-400">Lat: {destination.lat.toFixed(2)}° | Lng: {destination.lng.toFixed(2)}°</span>
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Comprehensive Travel Briefing & Logistics
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">{destination.description}</p>
        </div>

        <button
          onClick={() => onPlanTrip(destination.name)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Compass className="w-4 h-4 text-slate-950" />
          Generate AI Itinerary
        </button>
      </div>

      {/* Grid of Key Intelligence Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {/* Safety Score */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Safety Index</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-400">{destination.safetyScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-400/80 mt-1">
            {destination.safetyScore >= 90 ? 'Extremely Safe' : destination.safetyScore >= 80 ? 'Low Risk' : 'Standard Caution'}
          </span>
        </div>

        {/* Best Season */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Ideal Window</span>
            <CloudSun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-100 line-clamp-2">
            {destination.bestMonths}
          </div>
          <span className="text-[11px] text-amber-400/80 mt-1">Optimal Weather</span>
        </div>

        {/* Currency */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Currency</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-100 truncate">
            {destination.currency}
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Cards & ATMs available</span>
        </div>

        {/* Language */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Spoken Language</span>
            <Languages className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-100 truncate">
            {destination.language}
          </div>
          <span className="text-[11px] text-purple-400/80 mt-1">English in tourist hubs</span>
        </div>
      </div>

      {/* Highlights & Curated Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Must-See Landmarks</h4>
          <div className="flex flex-wrap gap-2">
            {destination.highlights.map((item, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/70">
                ★ {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Signature Experiences</h4>
          <div className="flex flex-wrap gap-2">
            {destination.popularActivities.map((act, idx) => (
              <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
                ✦ {act}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Practical Advisory Banner */}
      <div className="mt-5 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            <strong className="text-slate-100">Tap Water:</strong> {['Tokyo', 'Reykjavik', 'Paris', 'Sydney', 'New York'].includes(destination.name) ? 'High quality potable tap water' : 'Bottled or UV-filtered water recommended'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-slate-100">Emergency Protocol:</strong> Dial 112 / 911 or visit tourist police post
          </span>
        </div>
      </div>
    </div>
  );
};
