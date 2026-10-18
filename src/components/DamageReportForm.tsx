import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DamageReport, FarmerProfile } from '../types';
import { COMMON_CROPS, DAMAGE_CAUSES, INDIAN_STATES_DISTRICTS } from '../data/mockData';
import { 
  Camera, 
  Upload, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle, 
  Mic, 
  MicOff, 
  FileText, 
  Clock, 
  Info,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Wheat,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DamageReportFormProps {
  farmerProfile?: FarmerProfile | null;
  onSubmitSuccess: (newClaim: DamageReport) => void;
  onOpenRegister: () => void;
}

const SAMPLE_DAMAGE_PHOTOS = [
  {
    name: 'Wheat Hailstorm Damage (ओलावृष्टि)',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    cause: 'Hailstorm (ओलावृष्टि)'
  },
  {
    name: 'Waterlogged Submerged Paddy (जलभराव)',
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    cause: 'Unseasonal Rain / Waterlogging (अतिवृष्टि व जलभराव)'
  },
  {
    name: 'Pest Infested Cotton (कीट प्रकोप)',
    url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    cause: 'Pest / Insect Infestation (कीट प्रकोप)'
  },
  {
    name: 'Drought Dried Crops (सूखा)',
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    cause: 'Drought / Dry Spell (सूखा)'
  }
];

export const DamageReportForm: React.FC<DamageReportFormProps> = ({
  farmerProfile,
  onSubmitSuccess,
  onOpenRegister
}) => {
  const { t, language } = useLanguage();

  const stateKeys = Object.keys(INDIAN_STATES_DISTRICTS);

  // Form states
  const [farmerName, setFarmerName] = useState(farmerProfile?.fullName || 'Balram Yadav (बलराम यादव)');
  const [mobile, setMobile] = useState(farmerProfile?.mobile || '9826123456');
  const [selectedCrop, setSelectedCrop] = useState('Wheat (Gehun) - गेहूं');
  const [cropSeason, setCropSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Rabi');
  const [sowingDate, setSowingDate] = useState('2024-11-15');
  const [damageDate, setDamageDate] = useState(new Date().toISOString().split('T')[0]);
  const [causeOfDamage, setCauseOfDamage] = useState(DAMAGE_CAUSES[0].nameEn);
  const [damagePercent, setDamagePercent] = useState(75);
  const [affectedArea, setAffectedArea] = useState('3.0');
  const [totalArea, setTotalArea] = useState('4.0');
  const [village, setVillage] = useState(farmerProfile?.village || 'Shivpuri (शिवपुरी)');
  const [district, setDistrict] = useState(farmerProfile?.district || 'Indore');
  const [state, setState] = useState(farmerProfile?.state || stateKeys[0]);
  const [notes, setNotes] = useState('');
  
  // Photo states
  const [photoPreview, setPhotoPreview] = useState<string>(SAMPLE_DAMAGE_PHOTOS[0].url);
  const [photoFileName, setPhotoFileName] = useState<string>('wheat_hail_damage.jpg');
  const [geoTaggedCoords, setGeoTaggedCoords] = useState<{ lat: number; lng: number }>({
    lat: 22.9734,
    lng: 75.8267
  });

  // Simulated Voice Note state
  const [isRecording, setIsRecording] = useState(false);
  const [audioNoteLength, setAudioNoteLength] = useState<number | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState<DamageReport | null>(null);

  // Handle Photo Upload from User's Device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        // Simulate obtaining real-time GPS coordinates
        setGeoTaggedCoords({
          lat: Number((22.5 + Math.random() * 6).toFixed(4)),
          lng: Number((75.0 + Math.random() * 5).toFixed(4))
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSamplePhoto = (sample: typeof SAMPLE_DAMAGE_PHOTOS[0]) => {
    setPhotoPreview(sample.url);
    setPhotoFileName(sample.name + '.jpg');
    setCauseOfDamage(sample.cause);
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setAudioNoteLength(18); // 18 seconds simulated voice note
      }, 3000);
    } else {
      setIsRecording(false);
      setAudioNoteLength(12);
    }
  };

  const calculateEstimatedCompensation = () => {
    const area = parseFloat(affectedArea) || 1;
    const baseRatePerAcre = 24000; // Base sum insured average per acre
    return Math.round((baseRatePerAcre * area * (damagePercent / 100)));
  };

  const handleQuickDemoFill = () => {
    setSelectedCrop('Wheat (Gehun) - गेहूं');
    setCropSeason('Rabi');
    setDamagePercent(80);
    setAffectedArea('3.5');
    setTotalArea('4.0');
    setCauseOfDamage('Hailstorm (Olavrishti)');
    setNotes('Sudden massive hail precipitation accompanied by high winds on ripe wheat ears. Severe breakage.');
    setPhotoPreview(SAMPLE_DAMAGE_PHOTOS[0].url);
    setPhotoFileName('hail_shattered_wheat.jpg');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const uniqueClaimId = `FR-2024-${Math.floor(1000 + Math.random() * 9000)}`;
      const compensation = calculateEstimatedCompensation();

      const newClaim: DamageReport = {
        id: uniqueClaimId,
        farmerId: farmerProfile?.id || 'FR-KISAN-DEMO',
        farmerName: farmerName.trim(),
        mobile: mobile.trim(),
        cropName: selectedCrop,
        cropSeason,
        sowingDate,
        damageDate,
        causeOfDamage,
        estimatedDamagePercent: damagePercent,
        affectedAreaAcres: parseFloat(affectedArea) || 1.0,
        totalAreaAcres: parseFloat(totalArea) || 2.0,
        photoUrl: photoPreview,
        photoName: photoFileName,
        location: {
          village,
          district,
          state,
          latitude: geoTaggedCoords.lat,
          longitude: geoTaggedCoords.lng
        },
        notes: notes.trim() || undefined,
        audioNoteDuration: audioNoteLength || undefined,
        status: 'SUBMITTED',
        submissionDate: new Date().toISOString().split('T')[0],
        estimatedCompensation: compensation,
        surveyorAssigned: {
          name: 'Shri Rajendra Patel (पटवारी व कृषि सर्वेक्षक)',
          designation: 'Designated Field Officer',
          phone: '+91 94250 88991',
          inspectionDate: 'Within 48 Hours'
        }
      };

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {}

      setSubmittedClaim(newClaim);
      onSubmitSuccess(newClaim);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Camera className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t('reportTitle')}
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {t('demoTag')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t('reportSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl transition-colors border border-amber-300 shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'hi' ? '⚡ त्वरित डेमो भरें' : '⚡ Quick Demo Fill'}</span>
            </button>
          </div>
        </div>

        {/* 72-Hour Warning Ribbon */}
        <div className="mt-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            {language === 'hi'
              ? 'कृपया ध्यान दें: प्रधानमंत्री फसल बीमा योजना के प्रावधानों के अंतर्गत प्राकृतिक आपदा के 72 घंटे के भीतर सूचना देना अनिवार्य है।'
              : 'Mandatory Notice: As per PMFBY guidelines, localized disaster damage must be intimated within 72 hours of occurrence.'}
          </span>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
        {/* Section 1: Farmer & Location */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
              <span>{language === 'hi' ? 'किसान एवं खेत का स्थान' : 'Farmer & Farm Location'}</span>
            </h3>
            {farmerProfile ? (
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                ✓ {farmerProfile.fullName} ({farmerProfile.id})
              </span>
            ) : (
              <button
                type="button"
                onClick={onOpenRegister}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline"
              >
                {language === 'hi' ? '+ नया किसान पंजीकृत करें' : '+ Register Farmer First'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('formFullName')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('formMobile')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('formVillage')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Crop & Damage Details */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
            <span>{language === 'hi' ? 'फसल व नुकसान का प्रकार' : 'Crop & Damage Details'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cropSelect')} <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {COMMON_CROPS.map((c) => (
                  <option key={c.id} value={`${c.nameEn} - ${c.nameHi}`}>
                    {language === 'hi' ? `${c.nameHi} (${c.nameEn})` : `${c.nameEn}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cropSeason')}
              </label>
              <select
                value={cropSeason}
                onChange={(e) => setCropSeason(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Rabi">Rabi (रबी - गेहूं, सरसों, चना)</option>
                <option value="Kharif">Kharif (खरीफ - धान, सोयाबीन, कपास)</option>
                <option value="Zaid">Zaid (जायद - सब्जियां, तरबूज, मूंग)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('sowingDate')}
              </label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('damageDate')} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={damageDate}
                onChange={(e) => setDamageDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('damageCause')} <span className="text-red-500">*</span>
              </label>
              <select
                value={causeOfDamage}
                onChange={(e) => setCauseOfDamage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
              >
                {DAMAGE_CAUSES.map((cause) => (
                  <option key={cause.id} value={cause.nameEn}>
                    {language === 'hi' ? `${cause.nameHi} (${cause.nameEn})` : cause.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('affectedArea')} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={affectedArea}
                onChange={(e) => setAffectedArea(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'hi' ? 'कुल बोया गया रकबा (एकड़)' : 'Total Sown Area (Acres)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Damage Severity Slider */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-bold text-slate-800">
                {t('damagePercent')}: <span className="text-emerald-700 text-base">{damagePercent}%</span>
              </label>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                damagePercent >= 70 
                  ? 'bg-red-100 text-red-800 border border-red-300' 
                  : damagePercent >= 33 
                  ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {damagePercent >= 70 
                  ? (language === 'hi' ? 'गंभीर विनाशकारी क्षति (>70%)' : 'Severe Catastrophic (>70%)') 
                  : damagePercent >= 33 
                  ? (language === 'hi' ? 'मध्यम क्षति (33%-70%)' : 'Moderate Loss (33%-70%)') 
                  : (language === 'hi' ? 'सामान्य क्षति (<33%)' : 'Minor Loss (<33%)')}
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={damagePercent}
              onChange={(e) => setDamagePercent(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-semibold">
              <span>10% (आंशिक)</span>
              <span>33% (पात्रता सीमा)</span>
              <span>50%</span>
              <span>75%</span>
              <span>100% (पूर्ण विनाश)</span>
            </div>

            {/* Estimated Compensation Calculator Live Box */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{language === 'hi' ? 'संभावित मुआवजा राशि (अनुमानित):' : 'Estimated PMFBY Compensation Estimate:'}</span>
              </div>
              <div className="text-base sm:text-lg font-black text-emerald-800 font-mono">
                ₹{calculateEstimatedCompensation().toLocaleString('en-IN')}
                <span className="text-[10px] text-slate-500 font-normal ml-1">
                  ({language === 'hi' ? 'सर्वेक्षण पश्चात अंतिम तय होगा' : 'Subject to survey report'})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Photo Upload with Geo-Tagging & AI Preview */}
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
            <span>{t('photoUploadTitle')}</span>
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            {t('photoUploadHelp')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Upload Box & Samples */}
            <div className="space-y-4">
              <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                <Camera className="w-10 h-10 text-emerald-600 mb-2" />
                <span className="text-sm font-bold text-slate-800">
                  {language === 'hi' ? 'खेत से फोटो चुनें या कैमरा खोलें' : 'Choose farm photo or open camera'}
                </span>
                <span className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Sample test damage photos */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'या डेमो हेतु नमूना फोटो चुनें:' : 'Or choose sample damaged field photo:'}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_DAMAGE_PHOTOS.map((sample, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleSelectSamplePhoto(sample)}
                      className={`text-left p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 ${
                        photoPreview === sample.url
                          ? 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <img src={sample.url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="truncate">{sample.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo Preview & Geo-Stamp Overlay */}
            <div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-600 shadow-lg bg-black">
                <img
                  src={photoPreview}
                  alt="Crop Damage"
                  className="w-full h-64 object-cover opacity-90"
                />
                
                {/* Geo-tag Stamp Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 text-white text-[11px] font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> GEO-TAGGED LOCATION VERIFIED
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-sans font-bold">
                      {photoFileName}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-200">
                    <div>GPS: {geoTaggedCoords.lat}° N, {geoTaggedCoords.lng}° E</div>
                    <div>Village: {village}, {district}</div>
                    <div>Timestamp: {new Date().toLocaleString('en-IN')}</div>
                    <div>Accuracy: ±4.2 meters</div>
                  </div>
                </div>

                {/* AI Damage Analysis Badge */}
                <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-md text-emerald-200 border border-emerald-500/50 text-[11px] font-semibold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'hi' 
                      ? `एआई विश्लेषण: ${damagePercent}% पत्ती व बालियों में नुकसान चिह्नित` 
                      : `AI Analysis: ~${damagePercent}% crop lodging & stress detected`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Voice Note & Additional Notes */}
        <div className="pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                <span>{t('audioNotePrompt')}</span>
                {audioNoteLength && (
                  <span className="text-emerald-700 text-xs font-bold">
                    ✓ {audioNoteLength}s {language === 'hi' ? 'ऑडियो रिकॉर्डेड' : 'Audio Saved'}
                  </span>
                )}
              </label>

              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : audioNoteLength
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>{language === 'hi' ? 'रिकॉर्डिंग चालू है... (रोकने के लिए दबाएं)' : 'Recording audio... (Click to finish)'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-emerald-700" />
                    <span>
                      {audioNoteLength 
                        ? (language === 'hi' ? 'ऑडियो नोट पुनः रिकॉर्ड करें' : 'Re-record Voice Note')
                        : (language === 'hi' ? '🎤 आवाज में विवरण दर्ज करें' : '🎤 Click to Speak Details')}
                    </span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {language === 'hi' ? 'बुजुर्ग अथवा कम पढ़े-लिखे किसान बोलकर भी अपनी समस्या बता सकते हैं।' : 'Simulated voice description for farmers who prefer speaking over typing.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('notesLabel')}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'hi' ? 'खेत में हुए नुकसान का अतिरिक्त ब्यौरा लिखें...' : 'Mention additional loss factors (e.g. water accumulation depth)...'}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'डेटा सुरक्षित व सीधे कृषि विभाग के सर्वर से लिंक है (डेमो)' : 'Encrypted & integrated with Agriculture Ministry claims grid (Demo)'}</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white font-extrabold text-base shadow-lg shadow-emerald-700/25 transition-all disabled:opacity-50"
          >
            <Camera className="w-5 h-5 text-amber-300" />
            <span>{isSubmitting ? 'Registering Claim...' : t('submitReportBtn')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Submission Success Dialog / Receipt */}
      {submittedClaim && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 border border-emerald-300 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              {language === 'hi' ? 'फसल नुकसान दावा सफलतापूर्वक दर्ज!' : 'Damage Claim Successfully Registered!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              {language === 'hi' 
                ? 'आपकी सूचना प्राप्त हो गई है। आगामी 48 घंटे में सर्वेक्षक द्वारा खेत निरीक्षण किया जाएगा।' 
                : 'Your intimation has been logged. Field inspector has been assigned for survey.'}
            </p>

            {/* Generated Claim ID Highlight Box */}
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500/50 mb-6">
              <span className="text-xs font-semibold text-emerald-800 uppercase block mb-1">
                {language === 'hi' ? 'आपकी विशिष्ट दावा संख्या (Unique Claim ID)' : 'Your Unique Demo Claim ID'}
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-950 tracking-wider">
                {submittedClaim.id}
              </span>
              <p className="text-[11px] text-slate-500 mt-2">
                {language === 'hi' ? 'दावा स्थिति जांचने के लिए इस संख्या को संभाल कर रखें।' : 'Please save this ID to track inspection & DBT status.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div>
                <span className="text-slate-500 block">Farmer Name:</span>
                <span className="font-bold text-slate-800">{submittedClaim.farmerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Estimated Amount:</span>
                <span className="font-bold text-emerald-700">₹{submittedClaim.estimatedCompensation.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Affected Crop:</span>
                <span className="font-semibold text-slate-800">{submittedClaim.cropName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Surveyor:</span>
                <span className="font-semibold text-slate-800">{submittedClaim.surveyorAssigned?.name}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmittedClaim(null);
                  window.print();
                }}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {t('printReceipt')}
              </button>
              <button
                type="button"
                onClick={() => setSubmittedClaim(null)}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 font-bold text-xs text-white shadow-md transition-colors"
              >
                {language === 'hi' ? 'दावा स्थिति अभी ट्रैक करें →' : 'Track This Claim Now →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
