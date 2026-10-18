import React, { useState } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Language } from '../types';
import { X, Search, Check, Globe } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = SUPPORTED_LANGUAGES.filter(
    l => l.name.toLowerCase().includes(search.toLowerCase()) || 
         l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (code: Language) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Select Language / भाषा चुनें
              </h3>
              <p className="text-xs text-emerald-100">
                14 Indian Languages with Native Scripts & Urdu RTL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900/40 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language / भाषा खोजें..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Languages Grid */}
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
          {filtered.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 shadow-sm text-emerald-950 font-bold'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div>
                  <div className="text-base sm:text-lg font-bold font-sans">
                    {lang.nativeName}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>{lang.name}</span>
                    {lang.isRTL && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                        RTL
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          <span>Translations fall back gracefully to English/Hindi without displaying broken keys.</span>
        </div>
      </div>
    </div>
  );
};
