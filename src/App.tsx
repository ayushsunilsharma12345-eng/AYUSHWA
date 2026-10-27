import React, { useEffect, useState } from 'react';
import { POPULAR_DESTINATIONS } from './data/mockData';
import { Destination } from './types/travel';
import { ThreeGlobe } from './components/ThreeGlobe';
import { DestinationIntelligence } from './components/DestinationIntelligence';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { TravelChat } from './components/TravelChat';
import { OpenSourceHub } from './components/OpenSourceHub';
import { AcademicReport } from './components/AcademicReport';
import { ImageWithFallback } from './components/ImageWithFallback';
import { TransportComparator } from './components/TransportComparator';
import { generateProjectPdf } from './utils/pdfGenerator';
import { Globe, GitPullRequest, FileText, Download, Compass, MapPin, ArrowLeftRight, Sparkles, MessageSquare, CalendarDays } from 'lucide-react';

const pages = [
  { path: '/', label: 'Explore', icon: Compass },
  { path: '/compare', label: 'Compare', icon: ArrowLeftRight },
  { path: '/itinerary', label: 'Itinerary', icon: CalendarDays },
  { path: '/chat', label: 'Travel Chat', icon: MessageSquare },
  { path: '/opensource', label: 'Open Source', icon: GitPullRequest },
  { path: '/report', label: 'Project Report', icon: FileText },
];

const knownPaths = new Set(pages.map((page) => page.path));
const resolvePath = (pathname: string) => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return knownPaths.has(normalized) ? normalized : '/';
};

export default function App() {
  const [path, setPath] = useState(() => resolvePath(window.location.pathname));
  const [selectedDestination, setSelectedDestination] = useState<Destination>(POPULAR_DESTINATIONS[0]);
  const [plannerDestination, setPlannerDestination] = useState(POPULAR_DESTINATIONS[0].name);
  const [compareOrigin, setCompareOrigin] = useState('Tokyo');
  const [compareDestination, setCompareDestination] = useState('Kyoto');

  useEffect(() => {
    const onPopState = () => setPath(resolvePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath: string) => {
    if (!knownPaths.has(nextPath)) return;
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setPlannerDestination(dest.name);
    if (dest.name.toLowerCase() === compareOrigin.toLowerCase()) {
      setCompareOrigin(dest.name.toLowerCase() === 'tokyo' ? 'Kyoto' : 'Tokyo');
    }
    setCompareDestination(dest.name);
  };

  const handleCompareForDestination = (cityName: string) => {
    if (cityName.toLowerCase() === compareOrigin.toLowerCase()) {
      setCompareOrigin(cityName.toLowerCase() === 'tokyo' ? 'Kyoto' : 'London');
    }
    setCompareDestination(cityName);
    navigate('/compare');
  };

  const currentPage = pages.find((page) => page.path === path) ?? pages[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 flex flex-wrap items-center justify-between gap-3 py-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 text-left" aria-label="AYUSHWA home">
            <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Globe className="w-5 h-5 text-slate-950" />
            </span>
            <span>
              <span className="block font-extrabold text-white text-sm sm:text-base tracking-tight">AYUSHWA</span>
              <span className="hidden sm:block text-[11px] text-slate-400">AI Travel Intelligence</span>
            </span>
          </button>
          <nav aria-label="Main menu" className="order-3 sm:order-2 w-full sm:w-auto overflow-x-auto">
            <div className="flex items-center gap-1 min-w-max">
              {pages.map(({ path: pagePath, label, icon: Icon }) => (
                <button key={pagePath} onClick={() => navigate(pagePath)} aria-current={path === pagePath ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors ${path === pagePath ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>
                  <Icon className="w-4 h-4" /><span>{label}</span>
                </button>
              ))}
            </div>
          </nav>
          <button onClick={generateProjectPdf} className="order-2 sm:order-3 inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors">
            <Download className="w-3.5 h-3.5" /><span className="hidden md:inline">Download PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div key={path} className="animate-fadeIn">
          {path === '/' && <div className="space-y-8">
            <section className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl">
              <div className="absolute inset-0"><ImageWithFallback src="/images/travel_hero_banner.jpg" alt="Travel destinations around the world" fallbackType="hero" className="w-full h-full object-cover opacity-25" /><div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" /></div>
              <div className="relative p-6 md:p-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold mb-3"><Sparkles className="w-3.5 h-3.5" />Explore with AI travel intelligence</div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Your next journey starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">here</span></h1>
                <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">Explore destinations on an interactive 3D globe, review destination details, and choose a tool from the menu when you’re ready to plan.</p>
              </div>
            </section>

            <section className="space-y-3">
              <div><h2 className="text-lg font-bold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400" />Featured destinations</h2><p className="text-xs text-slate-400">Choose a destination to view its details on the globe.</p></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {POPULAR_DESTINATIONS.filter((d) => d.imageUrl).slice(0, 4).map((dest) => <button key={dest.id} onClick={() => handleSelectDestination(dest)} className={`relative rounded-xl overflow-hidden h-36 sm:h-44 border transition-all text-left group bg-slate-900 ${selectedDestination.id === dest.id ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg' : 'border-slate-800 hover:border-slate-700'}`}>
                  <ImageWithFallback src={dest.imageUrl} alt={dest.name} fallbackType={dest.id as any} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" /><div className="absolute bottom-2.5 left-2.5 right-2.5"><div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">{dest.country}</div><div className="text-sm sm:text-base font-extrabold text-white">{dest.name}</div><div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Safety score: {dest.safetyScore}/100</div></div>
                </button>)}
              </div>
            </section>

            <section className="space-y-3"><div><h2 className="text-xl font-bold text-white flex items-center gap-2"><Globe className="w-5 h-5 text-cyan-400" />Interactive 3D Earth</h2><p className="text-xs text-slate-400">Select a marker to inspect a destination.</p></div><ThreeGlobe destinations={POPULAR_DESTINATIONS} selectedId={selectedDestination.id} onSelectDestination={handleSelectDestination} /></section>
            <DestinationIntelligence destination={selectedDestination} onPlanTrip={(city) => { setPlannerDestination(city); navigate('/itinerary'); }} onCompareTransport={handleCompareForDestination} />
          </div>}

          {path === '/compare' && <div className="space-y-6"><PageHeading title="Fare & Route Compare" description="Compare travel options between two destinations." icon={<ArrowLeftRight className="w-5 h-5" />} /><TransportComparator initialOrigin={compareOrigin} initialDestination={compareDestination} /></div>}
          {path === '/itinerary' && <div className="space-y-6"><PageHeading title="Trip Itinerary" description="Build a day-by-day plan around your destination, budget, and travel style." icon={<CalendarDays className="w-5 h-5" />} /><ItineraryPlanner initialDestination={plannerDestination} /></div>}
          {path === '/chat' && <div className="space-y-6"><PageHeading title="Travel Chat" description="Ask the travel co-pilot about your destination and plans." icon={<MessageSquare className="w-5 h-5" />} /><TravelChat currentDestination={selectedDestination.name} /></div>}
          {path === '/opensource' && <OpenSourceHub />}
          {path === '/report' && <AcademicReport />}
        </div>
      </main>

      <footer className="mt-8 bg-slate-950 border-t border-slate-800 py-6 px-4 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"><span className="text-slate-400">AYUSHWA · AI Travel Intelligence</span><span>{currentPage.label} · Explore the menu to switch features</span></div>
      </footer>
    </div>
  );
}

function PageHeading({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return <section className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8"><div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold">{icon}<span>AYUSHWA</span></div><h1 className="text-2xl sm:text-3xl font-black text-white mt-2">{title}</h1><p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">{description}</p></section>;
}
