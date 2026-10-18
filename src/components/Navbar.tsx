import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sprout, 
  PhoneCall, 
  Globe, 
  Menu, 
  X, 
  Lock, 
  LogOut, 
  UserCheck, 
  FileText, 
  Search, 
  LayoutDashboard, 
  CloudSun, 
  MessageSquare,
  ShieldCheck,
  FolderLock
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenLanguageModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenAuth,
  onOpenLanguageModal
}) => {
  const { t, language, languageInfo } = useLanguage();
  const { user, isAuthenticated, logout, isBackendConnected } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelKey: 'navHome', icon: Sprout },
    { id: 'weather', labelKey: 'navWeather', icon: CloudSun, badge: 'Live' },
    { id: 'report', labelKey: 'navReport', icon: FileText, highlight: true },
    { id: 'track', labelKey: 'navTrack', icon: Search },
    { id: 'myclaims', labelKey: 'navMyClaims', icon: FolderLock, requiresAuth: true },
    { id: 'dashboard', labelKey: 'navDashboard', icon: LayoutDashboard },
    { id: 'assistance', labelKey: 'navAssistance', icon: MessageSquare },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Kisan Emergency & Transparency Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              {t('demoNotice')}
            </span>
            <span className="truncate">{t('helplineBanner')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
              isBackendConnected ? 'bg-emerald-800 text-emerald-200' : 'bg-amber-900/60 text-amber-200'
            }`}>
              {isBackendConnected ? '● Backend API Connected' : '○ Local Demo Mode'}
            </span>
            <a 
              href="tel:18001801551" 
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1800-180-1551</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group py-2"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-sans">
                  Fasal<span className="text-emerald-600">Rakshak</span>
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  {t('appName')}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {t('appTagline')}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : item.highlight
                      ? 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{t(item.labelKey)}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Selector & Auth Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector Modal Trigger */}
            <button
              onClick={onOpenLanguageModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors shadow-sm"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{languageInfo.nativeName}</span>
              <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Auth Action */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('myclaims')}
                  className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold border border-emerald-300 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                  <span className="max-w-[120px] truncate">{user.fullName}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                  title="Logout / लॉगआउट"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('navLogin')} / {t('navRegister')}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenLanguageModal}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{languageInfo.nativeName}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{t(item.labelKey)}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">{user.fullName}</span>
                  <span className="text-slate-500 font-mono text-[10px]">{user.id}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold"
                >
                  {t('navLogout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>{t('navLogin')} / {t('navRegister')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
