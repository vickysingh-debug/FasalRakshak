import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Camera, 
  Search, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  UserCheck,
  Building2,
  Wheat,
  IndianRupee,
  Layers
} from 'lucide-react';

interface HeroBannerProps {
  onNavigate: (tab: string) => void;
  onOpenRegister: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigate, onOpenRegister }) => {
  const { t, language } = useLanguage();

  const stats = [
    { label: t('statFarmers'), icon: UserCheck, highlight: '4.8L+' },
    { label: t('statSettled'), icon: IndianRupee, highlight: '₹14,280 Cr' },
    { label: t('statSurveyTime'), icon: Clock, highlight: '48-72 Hr' },
    { label: t('statSatisfaction'), icon: ShieldCheck, highlight: '100% DBT' },
  ];

  const processSteps = [
    { num: '01', title: t('step1Title'), desc: t('step1Desc'), color: 'bg-emerald-600' },
    { num: '02', title: t('step2Title'), desc: t('step2Desc'), color: 'bg-emerald-700' },
    { num: '03', title: t('step3Title'), desc: t('step3Desc'), color: 'bg-emerald-800' },
    { num: '04', title: t('step4Title'), desc: t('step4Desc'), color: 'bg-amber-600' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Visual Section */}
      <section className="relative overflow-hidden rounded-3xl agri-gradient text-white shadow-2xl p-6 sm:p-12 lg:p-16 border border-emerald-500/20">
        {/* Decorative background overlays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white mb-6">
            <span className="block text-emerald-200 font-light text-2xl sm:text-4xl mb-2">
              {t('heroTitle1')}
            </span>
            <span className="text-amber-300 drop-shadow-md">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-emerald-50/90 leading-relaxed font-normal mb-8 max-w-3xl">
            {t('heroDescription')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => onNavigate('report')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <Camera className="w-5 h-5 text-slate-950" />
              <span>{t('heroCtaReport')}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => onNavigate('track')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-base transition-all border border-emerald-400/40 hover:border-emerald-300 shadow-md backdrop-blur-md"
            >
              <Search className="w-5 h-5 text-emerald-300" />
              <span>{t('heroCtaTrack')}</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold text-base transition-all border border-white/20"
            >
              <UserCheck className="w-5 h-5 text-amber-300" />
              <span>{t('heroCtaRegister')}</span>
            </button>
          </div>

          {/* Quick Helpline pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-xs sm:text-sm text-emerald-100">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span>{language === 'hi' ? 'खेत में कोई भी नुकसान? तुरंत कॉल करें:' : 'Need immediate loss intimation assistance?'}</span>
            <a href="tel:18001801551" className="text-amber-300 font-bold hover:underline flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" /> 1800-180-1551
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {stat.highlight}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4 Feature Highlights Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('quickActionTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t('quickActionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div 
            onClick={() => onNavigate('report')}
            className="group bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('action1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('action1Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{language === 'hi' ? 'फोटो अपलोड करें' : 'Start Photo Report'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('track')}
            className="group bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('action2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('action2Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>{language === 'hi' ? 'दावा आईडी डालें' : 'Track Claim ID'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('dashboard')}
            className="group bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('action3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('action3Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-700 group-hover:text-blue-800">
              <span>{language === 'hi' ? 'मंडी भाव व मौसम देखें' : 'View Mandi & Weather'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('assistance')}
            className="group bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('action4Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('action4Desc')}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-purple-700 group-hover:text-purple-800">
              <span>{language === 'hi' ? 'किसान मित्र से पूछें' : 'Consult Kisan Mitra'}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Claim Process Flow */}
      <section className="bg-gradient-to-b from-white to-emerald-50/50 rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'hi' ? 'पारदर्शी प्रक्रिया' : 'Transparent Workflow'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t('processTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => (
            <div key={idx} className="relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-black text-white px-2.5 py-1 rounded-md ${step.color}`}>
                  {step.num}
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
              72h
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base">
                {language === 'hi' ? 'महत्वपूर्ण सूचना: नुकसान की सूचना 72 घंटे में अनिवार्य' : 'Crucial Rule: Intimate damage within 72 hours'}
              </h4>
              <p className="text-xs text-emerald-200">
                {language === 'hi' ? 'देरी होने पर बीमा कंपनी द्वारा दावा खारिज होने का जोखिम रहता है।' : 'Late reporting may result in assessment disqualification.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('report')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            {t('heroCtaReport')}
          </button>
        </div>
      </section>

      {/* Farmer Testimonials & Trust */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'hi' ? 'सच्ची कहानियां' : 'Real Farmer Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {language === 'hi' ? 'देश के किसानों का भरोसा, त्वरित निपटान' : 'Trusted by Lakhs of Indian Farmers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
              {language === 'hi' 
                ? '“फरवरी में भीषण ओले गिरने से मेरा 3.5 एकड़ गेहूं बर्बाद हो गया था। मैंने फसल रक्षक से तुरंत फोटो खींचकर रिपोर्ट की। 3 दिन में पटवारी व सर्वेयर खेत पर आए और 8 दिन में ₹58,450 सीधे खाते में आ गए।”'
                : '“Hailstorm damaged my 3.5 acres wheat field completely. I submitted geo-tagged photos on FasalRakshak. Surveyor visited in 3 days, and ₹58,450 compensation was credited to my bank via DBT!”'}
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                RP
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Rameshwar Patidar</p>
                <p className="text-[11px] text-slate-500">Sanwer, Indore (M.P.) • Claim: FR-2024-8841</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
              {language === 'hi' 
                ? '“बाढ़ और जलभराव से धान की फसल डूब गई थी। फसल रक्षक पोर्टल पर दावा संख्या डालकर मैं हर रोज प्रगति देख सकता था कि सर्वे रिपोर्ट कब अपलोड हुई। बेहद पारदर्शी व्यवस्था है।”'
                : '“Heavy waterlogging submerged our paddy crop. Through FasalRakshak tracking, I could monitor exactly when surveyor report was submitted without visiting government offices.”'}
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                GD
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Gurpreet Singh Dhillon</p>
                <p className="text-[11px] text-slate-500">Samrala, Ludhiana (Punjab) • Claim: FR-2024-5219</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
              {language === 'hi' 
                ? '“मुझे डिजिटल कार्ड मिला जिसमें मेरा खसरा नंबर व बैंक विवरण सुरक्षित है। किसी भी आपदा के समय मुझे दोबारा कागजात खोजने की जरूरत नहीं पड़ती। हर किसान को पंजीकरण जरूर करना चाहिए।”'
                : '“The digital Kisan ID card contains all my Khasra and bank details. In emergencies, I do not have to carry piles of physical papers. Excellent system for Indian agriculture.”'}
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">
                BS
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Balasaheb Shinde</p>
                <p className="text-[11px] text-slate-500">Ausa, Latur (Maharashtra)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
