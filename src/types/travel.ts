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

export interface TransportOption {
  id: string;
  mode: 'flight' | 'train' | 'bus' | 'car';
  title: string;
  provider: string;
  priceUsd: number;
  priceFormatted: string;
  duration: string;
  durationMinutes: number;
  co2Kg: number;
  ecoScore: 'A+' | 'A' | 'B' | 'C' | 'D';
  convenienceScore: number;
  departureFrequency: string;
  pros: string[];
  cons: string[];
  bookingUrl: string;
  providerName: string;
  secondaryBookingUrl?: string;
  secondaryProviderName?: string;
  ticketType?: string;
  originalLocalPrice?: string;
  iataRoute?: string;
  isBestOption?: boolean;
  bestReason?: string;
}

export interface OfficialTicketGateway {
  name: string;
  mode: 'flight' | 'train' | 'bus' | 'car' | 'all';
  url: string;
  description: string;
  badge: string;
}

export interface TransportComparisonResult {
  origin: string;
  destination: string;
  originIata?: string;
  destinationIata?: string;
  originCountry?: string;
  destinationCountry?: string;
  localCurrency?: string;
  exchangeRateNote?: string;
  liveDataSources?: string[];
  date: string;
  passengers: number;
  preference: string;
  distanceKm: number;
  isLiveVerified: boolean;
  liveFetchedAt: string;
  responseTimeMs: number;
  officialGateways: OfficialTicketGateway[];
  aiVerdict: {
    recommendedMode: 'flight' | 'train' | 'bus' | 'car';
    headline: string;
    detailedReasoning: string;
    bestBookingUrl: string;
    bestProvider: string;
    savingsComparedToFlight?: string;
    co2SavedKg?: number;
  };
  options: TransportOption[];
}


