import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MandiItem, WeatherAdvisory, DamageReport } from '../types';
import { MOCK_MANDI_RATES, MOCK_WEATHER_ADVISORY } from '../data/mockData';
import { 
  TrendingUp, 
  CloudSun, 
  AlertTriangle, 
  IndianRupee, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Landmark, 
  FileCheck, 
  Calendar, 
  Search,
  Wind,
  Droplets,
  Thermometer,
  Layers
} from 'lucide-react';

import { fetchRealWeather } from '../services/weatherService';
import { RealWeatherData } from '../types';

interface FarmerDashboardProps {
  claims: DamageReport[];
  onTrackClaim: (claimId: string) => void;
  onReportDamage: () => void;
  onNavigateToWeather?: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  claims,
  onTrackClaim,
  onReportDamage,
  onNavigateToWeather
}) => {
  const { t, language } = useLanguage();
  const [mandiSearch, setMandiSearch] = useState('');
  const [liveWeather, setLiveWeather] = useState<RealWeatherData | null>(null);

  useEffect(() => {
    fetchRealWeather('Indore').then(data => setLiveWeather(data)).catch(() => {});
  }, []);

  const filteredMandiRates = MOCK_MANDI_RATES.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(mandiSearch.toLowerCase()) ||
                          item.mandi.toLowerCase().includes(mandiSearch.toLowerCase()) ||
                          item.state.toLowerCase().includes(mandiSearch.toLowerCase());
    return matchesSearch;
  });

  const govtSchemes = [
    {
      titleEn: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      titleHi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
      descEn: 'Comprehensive risk insurance from pre-sowing to post-harvest against non-preventable natural risks.',
      descHi: 'बुवाई से लेकर कटाई उपरांत तक सभी प्राकृतिक आपदाओं के विरुद्ध व्यापक फसल बीमा सुरक्षा।',
      premiumRate: '1.5% - 2%',
      coverage: 'Pan-India',
      badge: 'Active Season'
    },
    {
      titleEn: 'PM-KISAN Samman Nidhi',
      titleHi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
      descEn: 'Direct financial assistance of ₹6,000 per year transferred in 3 equal installments of ₹2,000.',
      descHi: 'सभी पात्र किसान परिवारों को प्रतिवर्ष ₹6,000 की सीधी आर्थिक सहायता (तीन समान किस्तों में)।',
      premiumRate: '100% Grant',
      coverage: 'Aadhaar DBT',
      badge: '17th Installment'
    },
    {
      titleEn: 'Kisan Credit Card (KCC) Scheme',
      titleHi: 'किसान क्रेडिट कार्ड (KCC) योजना',
      descEn: 'Subsidized institutional credit up to ₹3 Lakh at an effective interest rate of just 4% on timely repayment.',
      descHi: 'समय पर भुगतान पर मात्र 4% प्रभावी ब्याज दर पर ₹3 लाख तक की त्वरित कृषि ऋण सुविधा।',
      premiumRate: '4% Interest',
      coverage: 'All Banks',
      badge: 'Interest Subvention'
    },
    {
      titleEn: 'Soil Health Card & PKVY (Organic Farming)',
      titleHi: 'मृदा स्वास्थ्य कार्ड एवं परंपरागत कृषि विकास',
      descEn: 'Free soil nutrient testing and ₹50,000 per hectare assistance for adopting chemical-free organic farming.',
      descHi: 'निःशुल्क मिट्टी परीक्षण रिपोर्ट एवं प्राकृतिक/जैविक खेती अपनाने हेतु ₹50,000 प्रति हेक्टेयर सहायता।',
      premiumRate: 'Free Testing',
      coverage: 'Soil Dept',
      badge: 'Soil Nutrition'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title & Weather Ticker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
                {language === 'hi' ? 'दैनिक कृषि विश्लेषण' : 'Agricultural Intelligence'}
              </span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                {t('demoTag')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('dashboardTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('dashboardSubtitle')}
            </p>
          </div>

          <button
            onClick={onReportDamage}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
          >
            {t('heroCtaReport')}
          </button>
        </div>

        {/* Live Weather & Agro Advisory Card */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-green-950 text-white p-6 shadow-md border border-emerald-700/50 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'मौसम चेतावनी व कृषि सलाह' : 'Agro-Weather Advisory'}</span>
                </span>
                {liveWeather?.isRealApi && (
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono">
                    Open-Meteo Satellite Feed
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-100">
                {liveWeather?.locationName || 'Central Agriculture Zone'}: {liveWeather?.current.weatherDescription || 'Seasonal Weather'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-2xl">
                {liveWeather?.alerts[0]?.suggestedAction || (language === 'hi' ? MOCK_WEATHER_ADVISORY.advisoryTextHi : MOCK_WEATHER_ADVISORY.advisoryTextEn)}
              </p>

              {onNavigateToWeather && (
                <div className="pt-2">
                  <button
                    onClick={onNavigateToWeather}
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-xs font-bold underline decoration-amber-400"
                  >
                    <span>{language === 'hi' ? '7-दिवसीय संपूर्ण उपग्रह मौसम व जिला पूर्वानुमान देखें →' : 'View Full 7-Day Satellite Forecast & District Alerts →'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shrink-0 text-center w-full md:w-auto">
              <div>
                <Thermometer className="w-4 h-4 mx-auto text-amber-300 mb-1" />
                <span className="text-lg font-black">{liveWeather?.current.temperature ?? MOCK_WEATHER_ADVISORY.temperature}°C</span>
                <span className="text-[10px] text-emerald-300 block">Temp</span>
              </div>
              <div>
                <Droplets className="w-4 h-4 mx-auto text-blue-300 mb-1" />
                <span className="text-lg font-black">{liveWeather?.current.humidity ?? MOCK_WEATHER_ADVISORY.humidity}%</span>
                <span className="text-[10px] text-emerald-300 block">Humidity</span>
              </div>
              <div>
                <Wind className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
                <span className="text-lg font-black">{liveWeather?.current.windSpeed ?? MOCK_WEATHER_ADVISORY.windSpeed} km/h</span>
                <span className="text-[10px] text-emerald-300 block">Wind</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's APMC Mandi Bhav Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{t('mandiRatesTitle')}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'hi' ? 'कृषि उपज विपणन समिति (APMC) द्वारा सत्यापित दैनिक मॉडल भाव (प्रति क्विंटल)' : 'Verified daily modal prices from major APMC agricultural markets (per quintal)'}
            </p>
          </div>

          {/* Mandi search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={mandiSearch}
              onChange={(e) => setMandiSearch(e.target.value)}
              placeholder={language === 'hi' ? 'मंडी या फसल खोजें...' : 'Search mandi or crop...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Mandi Rates Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Commodity / फसल</th>
                <th className="py-3 px-4">Market / मंडी</th>
                <th className="py-3 px-4">Min - Max (₹)</th>
                <th className="py-3 px-4 text-right">Modal Price (मॉडल भाव)</th>
                <th className="py-3 px-4 text-center">Trend</th>
                <th className="py-3 px-4 text-right">Arrival (आवश्यकता)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMandiRates.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{item.commodity}</div>
                    <span className="text-[10px] text-slate-500 font-normal">{item.variety}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <div>{item.mandi}</div>
                    <span className="text-[10px] text-slate-500">{item.state}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    ₹{item.minPrice} - ₹{item.maxPrice}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-right text-base text-emerald-800">
                    ₹{item.modalPrice}
                    <span className="text-[10px] text-slate-500 font-normal block">/ क्विंटल</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                      item.priceChange >= 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.priceChange >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>{item.priceChange >= 0 ? `+₹${item.priceChange}` : `-₹${Math.abs(item.priceChange)}`}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    {item.arrivalTonnes} Tonnes
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Recent Registered Claims Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900">
            {language === 'hi' ? 'आपके पंजीकृत दावे (Active Claims)' : 'Your Registered Claims'}
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {claims.length} {language === 'hi' ? 'कुल दावे' : 'Total Claims'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {claims.map((claim) => (
            <div 
              key={claim.id}
              onClick={() => onTrackClaim(claim.id)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer bg-slate-50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {claim.id}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    claim.status === 'DBT_TRANSFERRED' 
                      ? 'bg-emerald-200 text-emerald-900' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {claim.status === 'DBT_TRANSFERRED' ? 'Paid' : 'Under Process'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{claim.cropName}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{claim.causeOfDamage}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-800">
                  ₹{claim.estimatedCompensation.toLocaleString('en-IN')}
                </span>
                <span className="font-bold text-emerald-700 hover:underline">
                  {language === 'hi' ? 'ट्रैक करें →' : 'Track Status →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Farmer Schemes Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-600" />
            <span>{t('schemesTitle')}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi' ? 'केंद्रीय एवं राज्य सरकारों द्वारा संचालित प्रत्यक्ष कल्याणकारी योजनाएं' : 'Central & State Government Direct Welfare Initiatives for Indian Farmers'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {govtSchemes.map((scheme, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-200 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                    {scheme.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{scheme.coverage}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {language === 'hi' ? scheme.titleHi : scheme.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'hi' ? scheme.descHi : scheme.descEn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Farmer Contribution:</span>
                  <span className="font-bold text-emerald-800">{scheme.premiumRate}</span>
                </div>
                <a 
                  href="https://pmfby.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
                >
                  <span>{language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
