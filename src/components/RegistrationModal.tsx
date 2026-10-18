import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FarmerProfile } from '../types';
import { INDIAN_STATES_DISTRICTS, COMMON_CROPS } from '../data/mockData';
import { 
  X, 
  UserCheck, 
  Sparkles, 
  Landmark, 
  MapPin, 
  FileSpreadsheet, 
  Check, 
  HelpCircle,
  Phone,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (profile: FarmerProfile) => void;
  existingProfile?: FarmerProfile | null;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  existingProfile
}) => {
  const { t, language } = useLanguage();

  const stateKeys = Object.keys(INDIAN_STATES_DISTRICTS);
  const defaultState = stateKeys[0];

  const [fullName, setFullName] = useState(existingProfile?.fullName || '');
  const [fatherName, setFatherName] = useState(existingProfile?.fatherHusbandName || '');
  const [mobile, setMobile] = useState(existingProfile?.mobile || '');
  const [aadhaarLast4, setAadhaarLast4] = useState(existingProfile?.aadhaarLast4 || '');
  const [state, setState] = useState(existingProfile?.state || defaultState);
  const [district, setDistrict] = useState(existingProfile?.district || INDIAN_STATES_DISTRICTS[defaultState][0]);
  const [village, setVillage] = useState(existingProfile?.village || '');
  const [pincode, setPincode] = useState(existingProfile?.pincode || '');
  const [khasraNo, setKhasraNo] = useState(existingProfile?.khasraNo || '');
  const [landArea, setLandArea] = useState(existingProfile?.landAreaAcres?.toString() || '3.5');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(
    existingProfile?.primaryCrops || ['Wheat (गेहूं)', 'Soybean (सोयाबीन)']
  );
  const [bankName, setBankName] = useState(existingProfile?.bankAccount?.bankName || 'State Bank of India (SBI)');
  const [accountNo, setAccountNo] = useState(existingProfile?.bankAccount?.accountNoLast4 || '4819');
  const [ifsc, setIfsc] = useState(existingProfile?.bankAccount?.ifsc || 'SBIN0001234');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setState(newState);
    const districts = INDIAN_STATES_DISTRICTS[newState] || [];
    setDistrict(districts[0] || '');
  };

  const toggleCrop = (cropName: string) => {
    if (selectedCrops.includes(cropName)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter(c => c !== cropName));
      }
    } else {
      setSelectedCrops([...selectedCrops, cropName]);
    }
  };

  const handleAutoFillDemo = () => {
    setFullName('Sardar Gurmukh Singh (सरदार गुरमुख सिंह)');
    setFatherName('Late S. Harnek Singh');
    setMobile('9876543210');
    setAadhaarLast4('7890');
    const punjabKey = 'Punjab (पंजाब)';
    setState(punjabKey);
    setDistrict('Ludhiana');
    setVillage('Khanna Kalan (खन्ना कलां)');
    setPincode('141401');
    setKhasraNo('412/18-22/1');
    setLandArea('4.5');
    setSelectedCrops(['Wheat (गेहूं)', 'Paddy / Rice (धान)', 'Mustard (सरसों)']);
    setBankName('Punjab National Bank (PNB)');
    setAccountNo('6521');
    setIfsc('PUNB0141400');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim() || !village.trim() || !khasraNo.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया सभी अनिवार्य विवरण भरें!' : 'Please fill all required fields!');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate short network registration
    setTimeout(() => {
      const generatedId = existingProfile?.id || `FR-KISAN-${Math.floor(1000 + Math.random() * 9000)}`;
      const profile: FarmerProfile = {
        id: generatedId,
        fullName: fullName.trim(),
        fatherHusbandName: fatherName.trim(),
        mobile: mobile.trim(),
        aadhaarLast4: aadhaarLast4.trim() || '4321',
        state,
        district,
        village: village.trim(),
        pincode: pincode.trim() || '452001',
        khasraNo: khasraNo.trim(),
        landAreaAcres: parseFloat(landArea) || 2.5,
        primaryCrops: selectedCrops,
        bankAccount: {
          bankName: bankName.trim(),
          accountNoLast4: accountNo.trim() || '1234',
          ifsc: ifsc.trim().toUpperCase() || 'SBIN0001234'
        },
        consentGiven: true,
        createdAt: new Date().toISOString(),
        registrationDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      };

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }

      onRegistered(profile);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl">
                {t('regModalTitle')}
              </h3>
              <p className="text-xs text-emerald-100">
                {t('regModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Demo Auto-Fill Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {language === 'hi' 
                ? 'परीक्षण हेतु 1-क्लिक में किसान फॉर्म स्वतः भरें:' 
                : 'Want to test quickly? Auto-fill with realistic Indian farmer data:'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            {language === 'hi' ? '⚡ 1-क्लिक डेमो भरें' : '⚡ 1-Click Auto Fill'}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Personal & Identity Details */}
          <div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              <span>1. {language === 'hi' ? 'व्यक्तिगत व पहचान विवरण' : 'Personal & Identity Details'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formFullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="उदा. रमेश कुमार / Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formFatherName')}
                </label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="उदा. श्री हरिशंकर / Late Hari Shankar"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formMobile')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    className="w-full pl-12 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formAadhaar')}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-mono">XXXX-XXXX-</span>
                  <input
                    type="text"
                    maxLength={4}
                    value={aadhaarLast4}
                    onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, ''))}
                    placeholder="9012"
                    className="w-full pl-28 pr-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Land Record Details */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>2. {language === 'hi' ? 'खेत एवं भूमि विवरण' : 'Land & Location Details'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formState')}
                </label>
                <select
                  value={state}
                  onChange={handleStateChange}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {stateKeys.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formDistrict')}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {(INDIAN_STATES_DISTRICTS[state] || []).map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
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
                  placeholder="उदा. बड़ोदिया / Sanwer"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formPincode')}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="452001"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formKhasra')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={khasraNo}
                  onChange={(e) => setKhasraNo(e.target.value)}
                  placeholder="उदा. 245/1, 245/2"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formLandArea')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Major Crops Selection */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                {t('formPrimaryCrops')}
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_CROPS.map((crop) => {
                  const label = language === 'hi' ? crop.nameHi : crop.nameEn;
                  const isChecked = selectedCrops.includes(label);
                  return (
                    <button
                      type="button"
                      key={crop.id}
                      onClick={() => toggleCrop(label)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isChecked
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Bank Details for DBT Compensation */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Landmark className="w-4 h-4" />
                <span>3. {language === 'hi' ? 'डीबीटी (DBT) बैंक खाता विवरण' : 'DBT Bank Account for Compensation'}</span>
              </h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Direct Benefit Transfer
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formBankName')}
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="State Bank of India"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formAccountNumber')}
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, ''))}
                  placeholder="Account Number"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('formIfsc')}
                </label>
                <input
                  type="text"
                  maxLength={11}
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  placeholder="SBIN0001234"
                  className="w-full px-3.5 py-2.5 text-sm uppercase font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              <UserCheck className="w-5 h-5 text-amber-300" />
              <span>{isSubmitting ? 'Registering...' : t('formSubmitRegister')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
