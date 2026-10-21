import React, { useState } from 'react';
import { POPULAR_DESTINATIONS } from './data/mockData';
import { Destination } from './types/travel';
import { ThreeGlobe } from './components/ThreeGlobe';
import { DestinationIntelligence } from './components/DestinationIntelligence';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { TravelChat } from './components/TravelChat';
import { OpenSourceHub } from './components/OpenSourceHub';
import { AcademicReport } from './components/AcademicReport';
import { generateProjectPdf } from './utils/pdfGenerator';
import { Globe, GitPullRequest, FileText, Download, Compass, Sparkles, Shield, Cpu, MessageSquare, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'agent' | 'opensource' | 'report'>('agent');
  const [selectedDestination, setSelectedDestination] = useState<Destination>(POPULAR_DESTINATIONS[0]);
  const [plannerDestination, setPlannerDestination] = useState<string>(POPULAR_DESTINATIONS[0].name);

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setPlannerDestination(dest.name);
  };

  const handlePlanForDestination = (cityName: string) => {
    setPlannerDestination(cityName);
    // Scroll smoothly to itinerary planner
    const plannerEl = document.getElementById('itinerary-planner-section');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25">
              <Globe className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">AI Travel Intelligence</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Open Source
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">Powered by Google GenAI (gemini-3.8-flash) & Three.js WebGL</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('agent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'agent'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">Travel Agent &</span> 3D Globe
            </button>

            <button
              onClick={() => setActiveTab('opensource')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'opensource'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Contribution PR</span>
              <span className="hidden sm:inline px-1.5 py-0.2 text-[10px] bg-purple-950 text-purple-300 rounded font-mono border border-purple-800">
                #42
              </span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'report'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Project Report & PDF</span>
            </button>
          </nav>

          {/* Quick PDF Action */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={generateProjectPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab 1: AI Travel Agent & 3D Globe Studio */}
        {activeTab === 'agent' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Hero & Mission Statement */}
            {/* Top Hero & Mission Statement with Visual Image Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl">
              <div className="absolute inset-0 z-0">
                <img
                  src="/src/assets/images/travel_hero_banner_1792583815200.jpg"
                  alt="AI Travel Intelligence System Platform"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
              </div>

              <div className="relative z-10 p-6 md:p-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Next-Gen Open Source Travel Intelligence Platform
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Intelligent Travel Guidance with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Google GenAI</span> & 3D Earth
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                  Explore global destinations on the interactive 3D WebGL globe, request custom multi-day itineraries, check safety advisories, and interact with the Gemini 3.8 Flash travel agent co-pilot.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" /> Real-Time Safety Metrics
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Gemini 3.8 Flash Inference
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> Three.js Orbital Geospatial Canvas
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Destinations Photo Card Carousel / Grid */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Featured Global Destinations
                  </h3>
                  <p className="text-xs text-slate-400">Select any card to rotate the 3D globe and inspect intelligence data</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {POPULAR_DESTINATIONS.filter((d) => d.imageUrl).slice(0, 4).map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => handleSelectDestination(dest)}
                    className={`relative rounded-xl overflow-hidden h-36 sm:h-44 border transition-all text-left group cursor-pointer ${
                      selectedDestination.id === dest.id
                        ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">{dest.country}</div>
                      <div className="text-sm sm:text-base font-extrabold text-white leading-tight drop-shadow">{dest.name}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Safety: {dest.safetyScore}/100</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 3D Globe Visualization */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Interactive 3D Earth & Global Hubs
                  </h2>
                  <p className="text-xs text-slate-400">
                    Click pin markers or select from quick links to inspect destination metrics & launch itineraries
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
                  Selected: {selectedDestination.name}, {selectedDestination.country}
                </span>
              </div>

              <ThreeGlobe
                destinations={POPULAR_DESTINATIONS}
                selectedId={selectedDestination.id}
                onSelectDestination={handleSelectDestination}
              />
            </section>

            {/* Destination Intelligence Card */}
            <section>
              <DestinationIntelligence
                destination={selectedDestination}
                onPlanTrip={handlePlanForDestination}
              />
            </section>

            {/* Multi-Day Itinerary Planner */}
            <section id="itinerary-planner-section">
              <ItineraryPlanner initialDestination={plannerDestination} />
            </section>

            {/* AI Travel Co-Pilot Chat */}
            <section>
              <TravelChat currentDestination={selectedDestination.name} />
            </section>
          </div>
        )}

        {/* Tab 2: Open Source Contribution & PR Hub */}
        {activeTab === 'opensource' && (
          <div className="animate-fadeIn">
            <OpenSourceHub />
          </div>
        )}

        {/* Tab 3: Academic Submission Report & PDF Generator */}
        {activeTab === 'report' && (
          <div className="animate-fadeIn">
            <AcademicReport />
          </div>
        )}
      </main>

      {/* Global Application Footer */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-800 py-8 px-4 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-semibold text-slate-300">
              AI Travel Intelligence Agent • Open Source Contribution Project
            </div>
            <div className="mt-1 text-slate-500">
              Contributed by Ayush Sharma (<span className="text-cyan-400 font-mono">ayushsunilsharma12345@gmail.com</span>) • Apache-2.0 License
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('opensource')}
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub PR #42
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('report')}
              className="hover:text-cyan-400 transition-colors"
            >
              Technical Report
            </button>
            <span>•</span>
            <button
              onClick={generateProjectPdf}
              className="hover:text-cyan-400 transition-colors font-medium text-cyan-300"
            >
              Download PDF Report
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
