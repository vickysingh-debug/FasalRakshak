import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { INDIAN_STATES_DISTRICTS } from '../data/mockData';
import { 
  X, 
  Lock, 
  UserPlus, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Check, 
  MapPin, 
  Eye, 
  EyeOff, 
  Landmark 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onRegisterSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onRegisterSuccess
}) => {
  const { login, register, isBackendConnected } = useAuth();
  const { t, language } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login fields
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const stateKeys = Object.keys(INDIAN_STATES_DISTRICTS);
  const [regName, setRegName] = useState('');
  const [regFatherName, setRegFatherName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regState, setRegState] = useState(stateKeys[0]);
  const [regDistrict, setRegDistrict] = useState(INDIAN_STATES_DISTRICTS[stateKeys[0]][0]);
  const [regVillage, setRegVillage] = useState('');
  const [regKhasra, setRegKhasra] = useState('');
  const [regLandArea, setRegLandArea] = useState('3.5');
  const [consentGiven, setConsentGiven] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await login(loginMobile, loginPassword);
    setSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.error || 'Login failed.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setErrorMsg(language === 'hi' ? 'कृपया डेटा सहमति चेकबॉक्स पर टिक करें!' : 'Please check the consent box to proceed!');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    const res = await register({
      fullName: regName,
      fatherHusbandName: regFatherName,
      mobile: regMobile,
      password: regPassword,
      state: regState,
      district: regDistrict,
      village: regVillage,
      khasraNo: regKhasra,
      landAreaAcres: parseFloat(regLandArea) || 2.0,
      consentGiven
    });

    setSubmitting(false);

    if (res.success) {
      if (onRegisterSuccess) onRegisterSuccess();
      onClose();
    } else {
      setErrorMsg(res.error || 'Registration failed.');
    }
  };

  const handleQuickDemoFill = () => {
    if (mode === 'login') {
      setLoginMobile('9826012345');
      setLoginPassword('farmerPass2026');
    } else {
      setRegName('Rameshwar Patidar (रामेश्वर पाटीदार)');
      setRegFatherName('Late Shri Hari Shankar');
      setRegMobile('9826012345');
      setRegPassword('farmerPass2026');
      setRegVillage('Sanwer (सांवेर)');
      setRegKhasra('245/1-2');
      setRegLandArea('4.0');
      setConsentGiven(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header with Switch Tabs */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-6 pb-0">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg">
                  {mode === 'login' ? 'Farmer Login / किसान लॉगिन' : 'Farmer Registration / पंजीकरण'}
                </h3>
                <span className="text-[10px] text-emerald-200 block">
                  {isBackendConnected ? '🟢 Connected to Secure Auth API' : '🟡 Secure Local Demo Mode'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900/40"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                mode === 'login' ? 'border-amber-400 text-amber-300' : 'border-transparent text-emerald-100 hover:text-white'
              }`}
            >
              {t('navLogin')}
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                mode === 'register' ? 'border-amber-400 text-amber-300' : 'border-transparent text-emerald-100 hover:text-white'
              }`}
            >
              {t('navRegister')}
            </button>
          </div>
        </div>

        {/* Quick Demo Fill Bar */}
        <div className="bg-amber-50 px-6 py-2 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'hi' ? 'त्वरित परीक्षण हेतु 1-क्लिक भरें:' : 'Quick testing with authentic data:'}</span>
          </span>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px] shadow-sm"
          >
            ⚡ Auto-Fill Demo
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('phoneLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="9826012345"
                    className="w-full pl-12 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('passwordLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>{submitting ? 'Authenticating...' : t('navLogin')}</span>
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Farmer Full Name / किसान का पूरा नाम <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="उदा. रामेश्वर पाटीदार"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Password (Min 6) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State / राज्य</label>
                  <select
                    value={regState}
                    onChange={(e) => {
                      setRegState(e.target.value);
                      const dsts = INDIAN_STATES_DISTRICTS[e.target.value] || [];
                      setRegDistrict(dsts[0] || '');
                    }}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {stateKeys.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District / जिला</label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {(INDIAN_STATES_DISTRICTS[regState] || []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village / गाँव <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    placeholder="Sanwer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Khasra / Land (Acres)</label>
                  <input
                    type="text"
                    value={regKhasra}
                    onChange={(e) => setRegKhasra(e.target.value)}
                    placeholder="245/1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <span className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    {t('privacyConsent')}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-amber-300" />
                <span>{submitting ? 'Registering...' : t('navRegister')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Security & Privacy Notice Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Zero plain-text password storage. Bcrypt salted hashing & JWT session security active.</span>
        </div>
      </div>
    </div>
  );
};
