import { RealWeatherData, RealWeatherCurrent, RealWeatherDaily, AgroAlert } from '../types';

export const INDIAN_DISTRICT_COORDS: Record<string, { lat: number; lng: number; state: string }> = {
  // Madhya Pradesh
  'Indore': { lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh' },
  'Ujjain': { lat: 23.1765, lng: 75.7885, state: 'Madhya Pradesh' },
  'Bhopal': { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh' },
  'Hoshangabad': { lat: 22.7519, lng: 77.7289, state: 'Madhya Pradesh' },
  'Dewas': { lat: 22.9676, lng: 76.0534, state: 'Madhya Pradesh' },
  // Punjab
  'Ludhiana': { lat: 30.9010, lng: 75.8573, state: 'Punjab' },
  'Amritsar': { lat: 31.6340, lng: 74.8723, state: 'Punjab' },
  'Bathinda': { lat: 30.2110, lng: 74.9455, state: 'Punjab' },
  'Patiala': { lat: 30.3398, lng: 76.3869, state: 'Punjab' },
  // Haryana
  'Karnal': { lat: 29.6857, lng: 76.9905, state: 'Haryana' },
  'Hisar': { lat: 29.1492, lng: 75.7217, state: 'Haryana' },
  'Sirsa': { lat: 29.5349, lng: 75.0289, state: 'Haryana' },
  // Uttar Pradesh
  'Lucknow': { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
  'Varanasi': { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh' },
  'Agra': { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh' },
  'Meerut': { lat: 28.9845, lng: 77.7064, state: 'Uttar Pradesh' },
  // Rajasthan
  'Kota': { lat: 25.2138, lng: 75.8648, state: 'Rajasthan' },
  'Jaipur': { lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
  'Sriganganagar': { lat: 29.9038, lng: 73.8772, state: 'Rajasthan' },
  // Maharashtra
  'Latur': { lat: 18.4088, lng: 76.5604, state: 'Maharashtra' },
  'Nagpur': { lat: 21.1458, lng: 79.0882, state: 'Maharashtra' },
  'Nashik': { lat: 19.9975, lng: 73.7898, state: 'Maharashtra' },
  'Pune': { lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
  // Gujarat
  'Rajkot': { lat: 22.3039, lng: 70.8022, state: 'Gujarat' },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714, state: 'Gujarat' },
  // Bihar
  'Patna': { lat: 25.5941, lng: 85.1376, state: 'Bihar' },
  'Muzaffarpur': { lat: 26.1209, lng: 85.3647, state: 'Bihar' },
  // West Bengal
  'Burdwan': { lat: 23.2324, lng: 87.8615, state: 'West Bengal' },
  // Tamil Nadu
  'Coimbatore': { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu' },
  // Telangana
  'Warangal': { lat: 17.9689, lng: 79.5941, state: 'Telangana' },
  // Karnataka
  'Belagavi': { lat: 15.8497, lng: 74.4977, state: 'Karnataka' },
  // Assam
  'Nagaon': { lat: 26.3468, lng: 92.6840, state: 'Assam' },
  // Odisha
  'Cuttack': { lat: 20.4625, lng: 85.8828, state: 'Odisha' },
};

export const WMO_CODE_MAP: Record<number, { textEn: string; textHi: string; icon: string }> = {
  0: { textEn: 'Clear Sky (साफ मौसम)', textHi: 'साफ आसमान व खिली धूप', icon: '☀️' },
  1: { textEn: 'Mainly Clear (हल्के बादल)', textHi: 'अधिकांशतः साफ', icon: '🌤️' },
  2: { textEn: 'Partly Cloudy (आंशिक बादल)', textHi: 'आंशिक रूप से बादल', icon: '⛅' },
  3: { textEn: 'Overcast (घने बादल)', textHi: 'घने बादल छाए रहेंगे', icon: '☁️' },
  45: { textEn: 'Fog / Mist (कोहरा / धुंध)', textHi: 'सुबह घना कोहरा', icon: '🌫️' },
  48: { textEn: 'Depositing Rime Fog (पाला व कोहरा)', textHi: 'पाला व पालायुक्त कोहरा', icon: '❄️' },
  51: { textEn: 'Light Drizzle (हल्की बूंदाबांदी)', textHi: 'हल्की बूंदाबांदी', icon: '🌦️' },
  53: { textEn: 'Moderate Drizzle (मध्यम बूंदाबांदी)', textHi: 'मध्यम बूंदाबांदी', icon: '🌦️' },
  55: { textEn: 'Dense Drizzle (तेज बूंदाबांदी)', textHi: 'तेज रिमझिम फुहारें', icon: '🌧️' },
  61: { textEn: 'Slight Rain (हल्की बारिश)', textHi: 'हल्की वर्षा', icon: '🌧️' },
  63: { textEn: 'Moderate Rain (मध्यम बारिश)', textHi: 'मध्यम वर्षा', icon: '🌧️' },
  65: { textEn: 'Heavy Rain (भारी बारिश)', textHi: 'भारी मूसलाधार बारिश', icon: '⛈️' },
  71: { textEn: 'Slight Snowfall', textHi: 'हल्का हिमपात', icon: '🌨️' },
  80: { textEn: 'Slight Rain Showers', textHi: 'हल्की बौछारें', icon: '🌦️' },
  81: { textEn: 'Moderate Rain Showers', textHi: 'मध्यम बौछारें', icon: '🌧️' },
  82: { textEn: 'Violent Rain Showers', textHi: 'तीव्र वर्षा बौछारें', icon: '⛈️' },
  95: { textEn: 'Thunderstorm (गरज-चमक के साथ आंधी)', textHi: 'मेघगर्जन व तेज आंधी', icon: '⛈️' },
  96: { textEn: 'Thunderstorm with Hail (ओलावृष्टि)', textHi: 'ओलावृष्टि व तीव्र आंधी', icon: '🌩️' },
  99: { textEn: 'Severe Hailstorm (भीषण ओलावृष्टि)', textHi: 'भीषण ओलावृष्टि की चेतावनी', icon: '🌩️' },
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Fetch real weather from Open-Meteo public meteorological API
 */
export async function fetchRealWeather(
  districtName: string, 
  customCoords?: { lat: number; lng: number }
): Promise<RealWeatherData> {
  const coords: { lat: number; lng: number; state?: string } = customCoords || INDIAN_DISTRICT_COORDS[districtName] || INDIAN_DISTRICT_COORDS['Indore'];
  const apiUrl = (import.meta as any).env?.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast';

  const url = `${apiUrl}?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=Asia%2FKolkata`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP error: ${response.status}`);
    }
    const data = await response.json();

    const currentWmo = WMO_CODE_MAP[data.current?.weather_code] || { textEn: 'Normal Weather', textHi: 'सामान्य मौसम', icon: '🌤️' };
    
    const current: RealWeatherCurrent = {
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round(data.current?.temperature_2m ?? 28),
      feelsLike: Math.round(data.current?.apparent_temperature ?? 29),
      humidity: Math.round(data.current?.relative_humidity_2m ?? 65),
      windSpeed: Math.round(data.current?.wind_speed_10m ?? 14),
      windDirection: Math.round(data.current?.wind_direction_10m ?? 180),
      precipitation: data.current?.precipitation ?? 0,
      rainfallProbability: data.daily?.precipitation_probability_max?.[0] ?? 20,
      weatherCode: data.current?.weather_code ?? 0,
      weatherDescription: currentWmo.textEn,
      isDay: Boolean(data.current?.is_day ?? 1),
    };

    // Parse 7-day forecast
    const daily: RealWeatherDaily[] = [];
    const dates: string[] = data.daily?.time || [];
    for (let i = 0; i < Math.min(dates.length, 7); i++) {
      const dObj = new Date(dates[i]);
      const wmo = WMO_CODE_MAP[data.daily?.weather_code?.[i]] || { textEn: 'Normal', textHi: 'सामान्य', icon: '🌤️' };
      const rainProb = data.daily?.precipitation_probability_max?.[i] ?? 10;
      const rainSum = data.daily?.precipitation_sum?.[i] ?? 0;
      const maxT = Math.round(data.daily?.temperature_2m_max?.[i] ?? 32);

      let advice = 'Suitable day for routine irrigation and intercultural weeding.';
      if (rainProb > 60 || rainSum > 10) {
        advice = 'Postpone pesticide spraying & fertilizer broadcasting; ensure field drainage.';
      } else if (maxT > 38) {
        advice = 'High evapotranspiration risk: apply light evening irrigation to standing crops.';
      } else if (rainProb < 20 && current.windSpeed < 18) {
        advice = 'Ideal weather window for crop spraying and foliar nutrient application.';
      }

      daily.push({
        date: dates[i],
        dayName: i === 0 ? 'Today (आज)' : DAY_NAMES[dObj.getDay()],
        maxTemp: maxT,
        minTemp: Math.round(data.daily?.temperature_2m_min?.[i] ?? 20),
        weatherCode: data.daily?.weather_code?.[i] ?? 0,
        weatherDescription: wmo.textEn,
        precipitationProb: rainProb,
        precipitationSum: rainSum,
        agroAdvice: advice
      });
    }

    // Determine Agriculture-specific alerts based on real data
    const alerts: AgroAlert[] = [];
    const maxProbToday = daily[0]?.precipitationProb || 0;
    const maxRainSumToday = daily[0]?.precipitationSum || 0;
    const maxTempToday = daily[0]?.maxTemp || 30;
    const minTempToday = daily[0]?.minTemp || 20;

    if (maxProbToday >= 65 || maxRainSumToday >= 15 || current.weatherCode >= 63) {
      alerts.push({
        id: 'alert-heavy-rain',
        type: 'HEAVY_RAIN',
        title: 'Heavy Rainfall & Waterlogging Alert (भारी वर्षा की चेतावनी)',
        description: `High precipitation probability (${maxProbToday}%) and estimated ${maxRainSumToday}mm rainfall expected over ${districtName}.`,
        severity: 'danger',
        suggestedAction: 'Clear field drainage outlets. Stop chemical sprays and do not apply nitrogen fertilizers now.'
      });
    }

    if (current.windSpeed >= 28 || current.weatherCode === 95 || current.weatherCode === 96) {
      alerts.push({
        id: 'alert-storm',
        type: 'STORM',
        title: 'Squall / Hailstorm Risk (तेज आंधी व ओलावृष्टि की संभावना)',
        description: `Strong surface wind gusts (${current.windSpeed} km/h) and convective clouds detected over region.`,
        severity: 'warning',
        suggestedAction: 'Provide propping to banana, sugarcane, and lodging-prone standing crops.'
      });
    }

    if (maxTempToday >= 39) {
      alerts.push({
        id: 'alert-heatwave',
        type: 'HEATWAVE',
        title: 'Heatwave & High Evaporation Advisory (लू व तीव्र ताप चेतावनी)',
        description: `Peak afternoon temperature expected to reach ${maxTempToday}°C, which may stress soil moisture.`,
        severity: 'warning',
        suggestedAction: 'Irrigate crops in early morning or evening hours. Mulch fruit orchards.'
      });
    } else if (minTempToday <= 7) {
      alerts.push({
        id: 'alert-frost',
        type: 'FROST',
        title: 'Ground Frost & Cold Wave Warning (पाला व शीतलहर)',
        description: `Night temperatures dropping to ${minTempToday}°C may trigger frost injury in mustard, gram, and vegetables.`,
        severity: 'warning',
        suggestedAction: 'Light evening irrigation or smoke generation around boundaries to raise localized micro-temperature.'
      });
    }

    if (alerts.length === 0 && maxProbToday < 25 && current.windSpeed < 18) {
      alerts.push({
        id: 'alert-spray',
        type: 'FAVORABLE_SPRAY',
        title: 'Optimal Crop Spray Window (अनुकूल छिड़काव समय)',
        description: `Low wind speed (${current.windSpeed} km/h) and minimal rain probability (${maxProbToday}%).`,
        severity: 'success',
        suggestedAction: 'Favorable conditions for foliar nutrient sprays, bio-fungicides, and herbicide applications.'
      });
    }

    return {
      locationName: districtName,
      state: coords.state || 'India',
      district: districtName,
      latitude: coords.lat,
      longitude: coords.lng,
      elevation: data.elevation,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      current,
      daily,
      alerts,
      isRealApi: true,
      dataSource: 'Open-Meteo Satellite & Meteorological Model (Real-Time API)'
    };

  } catch (error) {
    console.warn('Real Open-Meteo fetch failed, using realistic agricultural model:', error);
    // Explicitly labeled fallback so we NEVER pretend fake data is real
    return getFallbackWeatherData(districtName, coords);
  }
}

/**
 * Fallback labeled transparently when device is offline or API fails
 */
function getFallbackWeatherData(districtName: string, coords: { lat: number; lng: number; state?: string }): RealWeatherData {
  return {
    locationName: districtName,
    state: coords.state || 'India',
    district: districtName,
    latitude: coords.lat,
    longitude: coords.lng,
    lastUpdated: new Date().toLocaleTimeString('en-IN'),
    current: {
      time: 'Offline Mode',
      temperature: 28,
      feelsLike: 29,
      humidity: 62,
      windSpeed: 14,
      windDirection: 180,
      rainfallProbability: 35,
      precipitation: 0,
      weatherCode: 2,
      weatherDescription: 'Partly Cloudy (आंशिक बादल)',
      isDay: true,
    },
    daily: [
      { date: 'Day 1', dayName: 'Today (आज)', maxTemp: 31, minTemp: 21, weatherCode: 2, weatherDescription: 'Partly Cloudy', precipitationProb: 35, precipitationSum: 0, agroAdvice: 'Monitor weather before fertilizer application.' },
      { date: 'Day 2', dayName: 'Tomorrow', maxTemp: 32, minTemp: 22, weatherCode: 1, weatherDescription: 'Mainly Clear', precipitationProb: 15, precipitationSum: 0, agroAdvice: 'Good window for pesticide spray.' },
      { date: 'Day 3', dayName: 'Day 3', maxTemp: 30, minTemp: 20, weatherCode: 61, weatherDescription: 'Scattered Rain', precipitationProb: 60, precipitationSum: 6, agroAdvice: 'Postpone irrigation.' },
      { date: 'Day 4', dayName: 'Day 4', maxTemp: 29, minTemp: 19, weatherCode: 63, weatherDescription: 'Moderate Rain', precipitationProb: 70, precipitationSum: 12, agroAdvice: 'Ensure drainage.' },
      { date: 'Day 5', dayName: 'Day 5', maxTemp: 30, minTemp: 20, weatherCode: 2, weatherDescription: 'Partly Cloudy', precipitationProb: 30, precipitationSum: 1, agroAdvice: 'Check for soil moisture.' },
      { date: 'Day 6', dayName: 'Day 6', maxTemp: 31, minTemp: 21, weatherCode: 1, weatherDescription: 'Clear Sky', precipitationProb: 10, precipitationSum: 0, agroAdvice: 'Standard field operations.' },
      { date: 'Day 7', dayName: 'Day 7', maxTemp: 32, minTemp: 22, weatherCode: 0, weatherDescription: 'Sunny', precipitationProb: 5, precipitationSum: 0, agroAdvice: 'Favorable harvesting condition.' },
    ],
    alerts: [
      {
        id: 'alert-offline-advisory',
        type: 'PEST_RISK',
        title: 'Agricultural Season Advisory (स्थानीय कृषि सलाह)',
        description: 'Moderate humidity and warm day temperatures favor sucking pests in vegetables and pulses.',
        severity: 'info',
        suggestedAction: 'Scout standing crops every 3 days; install yellow sticky traps.'
      }
    ],
    isRealApi: false,
    dataSource: 'DEMO / OFFLINE FALLBACK (Open-Meteo connection unavailable)'
  };
}
