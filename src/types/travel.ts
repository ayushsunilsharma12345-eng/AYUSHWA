export interface Destination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  category: 'Culture' | 'Nature' | 'Urban' | 'Beach' | 'Historic';
  description: string;
  highlights: string[];
  safetyScore: number;
  bestMonths: string;
  currency: string;
  language: string;
  popularActivities: string[];
  imageUrl?: string;
}

export interface DayActivity {
  dayNumber: number;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  transitTip: string;
}

export interface TripItinerary {
  destination: string;
  title: string;
  summary: string;
  recommendedSeason: string;
  currency: string;
  estimatedTotalCost: string;
  days: DayActivity[];
  packingEssentials: string[];
  safetyTips: string[];
  culinaryHighlights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: string;
}

export interface GitCommit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  timestamp: string;
  stats: {
    additions: number;
    deletions: number;
  };
}

export interface FileDiff {
  filename: string;
  status: 'added' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  patch: string;
}
