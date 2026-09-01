export interface RashiInfo {
  id: number;
  nameHi: string;
  nameGu: string;
  nameEn: string;
  symbol: string;
  lord: string;
  element: string;
  luckyNumber: number[];
  luckyColor: string;
  luckyStone: string;
  predictionToday: string;
  careerToday: string;
  loveToday: string;
  healthToday: string;
  upayToday: string;
}

export interface AstrologicalService {
  id: string;
  titleHi: string;
  titleGu: string;
  titleEn: string;
  subtitle: string;
  description: string;
  icon: string;
  keyBenefits: string[];
  remedies: string[];
  duration: string;
  popular?: boolean;
}

export interface KundliInput {
  name: string;
  gender: 'male' | 'female' | 'other';
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  cityName: string;
  state: string;
  latitude?: number;
  longitude?: number;
}

export interface PlanetPosition {
  planet: string;
  rashi: string;
  degree: number;
  house: number;
  isRetrograde: boolean;
  dignity: 'उच्च (Exalted)' | 'स्वराशि (Own)' | 'मित्र (Friendly)' | 'सम (Neutral)' | 'शत्रु (Enemy)' | 'नीच (Debilitated)';
  lord: string;
}

export interface KundliResult {
  ascendantRashi: string;
  ascendantDegree: number;
  moonRashi: string;
  sunRashi: string;
  nakshatra: string;
  nakshatraCharan: number;
  currentDasha: string;
  dashaEndYear: number;
  manglikStatus: 'मांगलिक (Manglik)' | 'आंशिक मांगलिक (Partial Manglik)' | 'गैर-मांगलिक (Non-Manglik)';
  planets: PlanetPosition[];
  houses: { houseNumber: number; rashi: string; planetsInHouse: string[] }[];
  lifePrediction: {
    general: string;
    career: string;
    marriage: string;
    health: string;
    luckyGem: string;
    luckyMantra: string;
    recommendedUpay: string[];
  };
}

export interface GunMilanResult {
  boyName: string;
  girlName: string;
  boyRashi: string;
  girlRashi: string;
  boyNakshatra: string;
  girlNakshatra: string;
  totalGunas: number;
  maxGunas: number;
  percentage: number;
  verdict: 'अति उत्तम (Highly Recommended)' | 'उत्तम (Good Match)' | 'मध्यम (Average with Remedies)' | 'विचारणीय (Caution / Remedies Needed)';
  isNadiDosh: boolean;
  isBhakootDosh: boolean;
  isGanaDosh: boolean;
  kootas: {
    name: string;
    description: string;
    obtained: number;
    maximum: number;
    impact: string;
  }[];
  recommendations: string[];
}

export interface PanchangInfo {
  date: string;
  samvat: string;
  tithi: string;
  paksha: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  gulikaKaal: string;
  yamaganda: string;
  abhijitMuhurat: string;
  shubhChoghadiya: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
}
