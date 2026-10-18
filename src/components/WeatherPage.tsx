import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RealWeatherData, AgroAlert } from '../types';
import { fetchRealWeather, INDIAN_DISTRICT_COORDS } from '../services/weatherService';
import { INDIAN_STATES_DISTRICTS } from '../data/mockData';
import { 
  CloudSun, 
  MapPin, 
  Navigation, 
  RefreshCw, 
  AlertTriangle, 
  ShieldAlert, 
  Thermometer, 
  Droplets, 
  Wind, 
  Calendar, 
  Info, 
  CheckCircle2, 
  Sun, 
  CloudRain, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  const stateKeys = Object.keys(INDIAN_STATES_DISTRICTS);
  const [selectedState, setSelectedState] = useState<string>(stateKeys[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(INDIAN_STATES_DISTRICTS[stateKeys[0]][0]);
  const [selectedVillage, setSelectedVillage] = useState<string>('Gram Panchayat Central');

  const [weatherData, setWeatherData] = useState<RealWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Consent modal for GPS location
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const loadWeather = async (district: string, customCoords?: { lat: number; lng: number }) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchRealWeather(district, customCoords);
      setWeatherData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch weather forecast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    const districts = INDIAN_STATES_DISTRICTS[newState] || [];
    const firstDistrict = districts[0] || 'Indore';
    setSelectedDistrict(firstDistrict);
  };

  const handleRequestGpsPermission = () => {
    setIsGpsModalOpen(true);
  };

  const handleConfirmGps = () => {
    setIsGpsModalOpen(false);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        loadWeather('Your GPS Location (आपका जीपीएस स्थान)', coords);
        setGpsLoading(false);
      },
      (err) => {
        setGpsLoading(false);
        alert(`Location permission denied or unavailable: ${err.message}`);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {t('weatherTitle')}
              </span>
              {weatherData?.isRealApi ? (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
                  LIVE OPEN-METEO SATELLITE
                </span>
              ) : (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {t('demoTag')} / FALLBACK
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('weatherTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('weatherSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={handleRequestGpsPermission}
              disabled={gpsLoading}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>{gpsLoading ? 'Locating...' : t('useGpsLocation')}</span>
            </button>

            <button
              onClick={() => loadWeather(selectedDistrict)}
              disabled={loading}
              className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              title="Refresh Forecast"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* State, District & Village Selection Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">State / राज्य</label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {stateKeys.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">District / जिला</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {(INDIAN_STATES_DISTRICTS[selectedState] || []).map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Village / गाँव (वैकल्पिक)</label>
            <input
              type="text"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              placeholder="गाँव या ग्राम पंचायत..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && !weatherData && (
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-700">Connecting to Open-Meteo Satellite Feed...</p>
        </div>
      )}

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>API Notice: {errorMsg}</span>
          </div>
          <button
            onClick={() => loadWeather(selectedDistrict)}
            className="font-bold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Weather Content */}
      {weatherData && (
        <>
          {/* Main Current Weather Card */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-950 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Location & Main Temp */}
              <div>
                <div className="flex items-center gap-2 text-emerald-200 text-xs mb-1">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span className="font-semibold text-white">{weatherData.locationName}, {weatherData.state}</span>
                  <span>•</span>
                  <span>Lat: {weatherData.latitude.toFixed(2)}°, Lng: {weatherData.longitude.toFixed(2)}°</span>
                </div>

                <div className="flex items-baseline gap-4 mt-2">
                  <span className="text-5xl sm:text-7xl font-black font-mono tracking-tight text-white">
                    {weatherData.current.temperature}°C
                  </span>
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-amber-300 block">
                      {weatherData.current.weatherDescription}
                    </span>
                    <span className="text-xs text-emerald-200 font-medium">
                      {t('feelsLike')}: {weatherData.current.feelsLike}°C
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-emerald-300">
                  <span>Last Updated: {weatherData.lastUpdated}</span>
                  <span>•</span>
                  <span className="truncate">{weatherData.dataSource}</span>
                </div>
              </div>

              {/* Weather KPI Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                  <Droplets className="w-5 h-5 mx-auto text-blue-300 mb-1" />
                  <span className="text-xl font-black text-white">{weatherData.current.humidity}%</span>
                  <span className="text-[11px] text-emerald-200 block">{t('humidity')}</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                  <Wind className="w-5 h-5 mx-auto text-emerald-300 mb-1" />
                  <span className="text-xl font-black text-white">{weatherData.current.windSpeed} <span className="text-xs font-normal">km/h</span></span>
                  <span className="text-[11px] text-emerald-200 block">{t('windSpeed')}</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                  <CloudRain className="w-5 h-5 mx-auto text-amber-300 mb-1" />
                  <span className="text-xl font-black text-white">{weatherData.current.rainfallProbability}%</span>
                  <span className="text-[11px] text-emerald-200 block">{t('rainChance')}</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
                  <Thermometer className="w-5 h-5 mx-auto text-red-300 mb-1" />
                  <span className="text-xl font-black text-white">{weatherData.daily[0]?.maxTemp || 32}°C</span>
                  <span className="text-[11px] text-emerald-200 block">Today Max</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agriculture Alerts Box */}
          {weatherData.alerts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Agricultural Severe Weather Advisory / किसान चेतावनी</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weatherData.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${
                      alert.severity === 'danger'
                        ? 'bg-red-50 border-red-300 text-red-950'
                        : alert.severity === 'warning'
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          alert.severity === 'danger'
                            ? 'bg-red-600 text-white'
                            : alert.severity === 'warning'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-emerald-600 text-white'
                        }`}>
                          {alert.type}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">Live Satellite Derived</span>
                      </div>
                      <h4 className="font-extrabold text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs leading-relaxed opacity-90">{alert.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/10 text-xs font-semibold">
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500">Recommended Farm Action:</span>
                      <p className="mt-0.5">{alert.suggestedAction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7-Day Agricultural Forecast Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {t('sevenDayForecast')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Precipitation sum, temperature thresholds & intercultural farm recommendations
                </p>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Next 7 Days
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {weatherData.daily.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                    idx === 0 
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-sm' 
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block truncate">{day.dayName}</span>
                    <span className="text-[10px] text-slate-500 font-mono block mb-2">{day.date}</span>

                    <div className="my-2 text-2xl font-black text-slate-800">
                      {day.maxTemp}° <span className="text-xs font-normal text-slate-500">/ {day.minTemp}°</span>
                    </div>

                    <p className="text-[11px] font-semibold text-slate-700 truncate">{day.weatherDescription}</p>

                    <div className="mt-2 text-[11px] text-blue-700 font-semibold bg-blue-50 py-1 rounded-lg">
                      🌧️ {day.precipitationProb}% ({day.precipitationSum}mm)
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 text-left">
                    <p className="text-[10px] text-slate-600 line-clamp-3 leading-snug">
                      {day.agroAdvice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* GPS Location Consent Modal */}
      {isGpsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 border border-emerald-200 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-7 h-7 text-emerald-600" />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-2">
              GPS Location Consent Request
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              FasalRakshak requests your explicit permission to access your device GPS coordinates. This is used solely to query Open-Meteo satellite feeds for real-time agricultural forecasts for your specific farm field. We never track or share your continuous location.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsGpsModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmGps}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white shadow-md"
              >
                Allow & Get Weather
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
