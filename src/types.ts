export type Language = 
  | 'en'  // English
  | 'hi'  // Hindi (हिन्दी)
  | 'pa'  // Punjabi (ਪੰਜਾਬੀ)
  | 'gu'  // Gujarati (ગુજરાતી)
  | 'mr'  // Marathi (मराठी)
  | 'bn'  // Bengali (বাংলা)
  | 'as'  // Assamese (অসমীয়া)
  | 'or'  // Odia (ଓଡ଼ିଆ)
  | 'ta'  // Tamil (தமிழ்)
  | 'te'  // Telugu (తెలుగు)
  | 'kn'  // Kannada (ಕನ್ನಡ)
  | 'ml'  // Malayalam (മലയാളം)
  | 'ur'  // Urdu (اردو) - RTL
  | 'ne'; // Nepali (नेपाली)

export interface LanguageInfo {
  code: Language;
  name: string;        // English name
  nativeName: string;  // Native script name
  isRTL?: boolean;
  status: 'verified' | 'community';
}

export type ClaimStatus = 
  | 'SUBMITTED' 
  | 'DOCS_VERIFIED' 
  | 'SURVEY_SCHEDULED' 
  | 'INSPECTION_COMPLETED' 
  | 'APPROVED' 
  | 'DBT_TRANSFERRED';

export interface User {
  id: string; // e.g. FR-FARMER-8192
  fullName: string;
  fatherHusbandName?: string;
  mobile: string;
  state: string;
  district: string;
  village: string;
  pincode?: string;
  khasraNo?: string;
  landAreaAcres?: number;
  primaryCrops?: string[];
  bankAccount?: {
    bankName: string;
    accountNoLast4: string;
    ifsc: string;
  };
  consentGiven: boolean;
  createdAt: string;
}

export interface FarmerProfile extends User {
  aadhaarLast4?: string;
  registrationDate: string;
}

export interface DamageReport {
  id: string; // e.g. FR-2024-8841
  farmerId?: string;
  farmerName: string;
  mobile: string;
  cropName: string;
  cropSeason: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
  sowingDate: string;
  damageDate: string;
  causeOfDamage: string; // e.g. 'Hailstorm', 'Flood', 'Pest Attack', etc.
  estimatedDamagePercent: number;
  affectedAreaAcres: number;
  totalAreaAcres: number;
  photoUrl?: string;
  photoName?: string;
  location: {
    village: string;
    district: string;
    state: string;
    latitude?: number;
    longitude?: number;
  };
  notes?: string;
  audioNoteDuration?: number;
  status: ClaimStatus;
  submissionDate: string;
  estimatedCompensation: number;
  surveyorAssigned?: {
    name: string;
    designation: string;
    phone: string;
    inspectionDate?: string;
    surveyReport?: string;
  };
  dbtDetails?: {
    utrNumber: string;
    amountPaid: number;
    transferDate: string;
    bankName: string;
  };
  isOwner?: boolean; // Set dynamically when requested by authenticated user
}

export interface MandiItem {
  commodity: string;
  variety: string;
  mandi: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceChange: number;
  arrivalTonnes: number;
  updatedAt: string;
}

// Real Weather Models (Open-Meteo API standard)
export interface RealWeatherCurrent {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  rainfallProbability: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
}

export interface RealWeatherDaily {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  weatherDescription: string;
  precipitationProb: number;
  precipitationSum: number;
  agroAdvice: string;
}

export interface AgroAlert {
  id: string;
  type: 'HEAVY_RAIN' | 'HEATWAVE' | 'STORM' | 'FROST' | 'PEST_RISK' | 'FAVORABLE_SPRAY';
  title: string;
  description: string;
  severity: 'warning' | 'danger' | 'info' | 'success';
  suggestedAction: string;
}

export interface RealWeatherData {
  locationName: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  lastUpdated: string;
  current: RealWeatherCurrent;
  daily: RealWeatherDaily[];
  alerts: AgroAlert[];
  isRealApi: boolean;
  dataSource: string;
}

export interface WeatherAdvisory {
  temperature: number;
  condition: string;
  humidity: number;
  rainfallProbability: number;
  windSpeed: number;
  alertType?: 'HAILSTORM' | 'HEAVY_RAIN' | 'HEATWAVE' | 'CLEAR';
  advisoryTextEn: string;
  advisoryTextHi: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  category: 'claim' | 'scheme' | 'eligibility' | 'dbt';
}
