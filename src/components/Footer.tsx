import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, PhoneCall, Heart, Shield, Landmark, ExternalLink, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegister }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-10 border-t border-emerald-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-900">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Fasal<span className="text-emerald-400">Rakshak</span>
                </span>
                <span className="text-xs bg-emerald-800 text-emerald-200 font-bold px-2 py-0.5 rounded ml-2">
                  फसल रक्षक
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed max-w-sm">
              {language === 'hi' 
                ? 'भारतीय किसानों के लिए समर्पित डिजिटल मंच। प्राकृतिक आपदाओं से क्षतिग्रस्त फसलों की त्वरित सूचना, पारदर्शी सर्वेक्षण और प्रत्यक्ष बैंक हस्तांतरण (DBT) की सुविधा।'
                : 'Empowering Indian farmers with rapid crop loss intimation, transparent geo-tagged surveyor tracking, and expedited Direct Benefit Transfer (DBT) claim settlements.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                {t('demoTag')} • PORTAL SIMULATION
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition-colors">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('report')} className="hover:text-amber-300 transition-colors">
                  {t('navReport')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-amber-300 transition-colors">
                  {t('navTrack')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-amber-300 transition-colors">
                  {t('navDashboard')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assistance')} className="hover:text-amber-300 transition-colors">
                  {t('navAssistance')}
                </button>
              </li>
            </ul>
          </div>

          {/* Farmer Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
              {language === 'hi' ? 'किसान सेवाएं' : 'Farmer Services'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button onClick={onOpenRegister} className="hover:text-amber-300 transition-colors">
                  {t('navRegister')}
                </button>
              </li>
              <li>
                <a href="https://pmfby.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                  <span>PMFBY Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                  <span>PM-KISAN Status</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                  <span>Agmarknet Mandi Bhav</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
              {language === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Toll-Free'}
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-200">
              <div>
                <span className="text-[10px] text-emerald-400 block font-medium">Kisan Call Centre (24x7)</span>
                <a href="tel:18001801551" className="font-mono text-base font-bold text-amber-300 hover:underline">
                  1800-180-1551
                </a>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 block font-medium">PMFBY Claim Assistance</span>
                <a href="tel:14447" className="font-mono text-base font-bold text-white hover:underline">
                  14447
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p>© 2024-2025 FasalRakshak (फसल रक्षक). Built with React, TypeScript & Tailwind CSS for Indian Agriculture.</p>
          <div className="flex items-center gap-4 text-emerald-300">
            <span>🌾 Dedicated to Indian Farmers</span>
            <span>•</span>
            <span>🔒 Zero API Keys / Zero Data Exposure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
