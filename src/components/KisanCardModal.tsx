import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FarmerProfile } from '../types';
import { 
  X, 
  Printer, 
  CheckCircle, 
  Sprout, 
  QrCode, 
  Shield, 
  MapPin, 
  Landmark, 
  FileSpreadsheet, 
  Calendar 
} from 'lucide-react';

interface KisanCardModalProps {
  farmer: FarmerProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const KisanCardModal: React.FC<KisanCardModalProps> = ({ farmer, isOpen, onClose }) => {
  const { t, language } = useLanguage();

  if (!isOpen || !farmer) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-emerald-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg">
              {language === 'hi' ? 'डिजिटल किसान पहचान पत्र (Kisan Card)' : 'Digital Farmer Identity Card'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Printable Card Container */}
        <div className="p-6 sm:p-8">
          <div className="relative border-4 border-emerald-700 rounded-2xl p-6 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 shadow-md overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <Sprout className="w-96 h-96 text-emerald-900" />
            </div>

            {/* Card Header */}
            <div className="flex items-center justify-between border-b-2 border-emerald-700/60 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-sm">
                  <Sprout className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-emerald-950 uppercase tracking-tight">
                    FasalRakshak (फसल रक्षक)
                  </h4>
                  <p className="text-[10px] sm:text-xs text-emerald-800 font-semibold">
                    Government of India PMFBY Partner Network • Kisan ID Card
                  </p>
                </div>
              </div>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                {t('demoTag')}
              </span>
            </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {/* Photo & QR Avatar */}
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-emerald-200 text-center">
                <div className="w-20 h-20 rounded-xl bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-800 font-black text-2xl mb-2">
                  {farmer.fullName.charAt(0)}
                </div>
                <div className="p-1 bg-slate-100 rounded border border-slate-200 mt-1">
                  <QrCode className="w-12 h-12 text-slate-700" />
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">Scan for Land Records</span>
              </div>

              {/* Farmer Info */}
              <div className="sm:col-span-2 space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Kisan ID (पहचान संख्या)</span>
                  <p className="font-mono font-bold text-base text-emerald-800">{farmer.id}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Farmer Name (किसान का नाम)</span>
                  <p className="font-bold text-slate-900">{farmer.fullName}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Father/Spouse (पिता / पति)</span>
                  <p className="text-slate-700 font-medium">{farmer.fatherHusbandName || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Mobile</span>
                    <p className="font-semibold text-slate-800">{farmer.mobile}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Aadhaar (Last 4)</span>
                    <p className="font-mono font-semibold text-slate-800">XXXX-XXXX-{farmer.aadhaarLast4}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Land & Bank Details Strip */}
            <div className="p-3 rounded-xl bg-emerald-900 text-emerald-100 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div>
                <span className="text-[10px] text-emerald-300 block">Village & District</span>
                <span className="font-semibold truncate block">{farmer.village}, {farmer.district}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block">Land Area</span>
                <span className="font-bold text-amber-300">{farmer.landAreaAcres} Acres</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block">Khasra No.</span>
                <span className="font-mono font-semibold">{farmer.khasraNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block">DBT Bank</span>
                <span className="font-semibold truncate block">{farmer.bankAccount?.bankName || 'Aadhaar DBT Bank'}</span>
              </div>
            </div>

            {/* Crops Tag */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Registered Crops:</span>
              {(farmer.primaryCrops || ['Wheat (गेहूं)', 'Soybean (सोयाबीन)']).map((crop, i) => (
                <span key={i} className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
                  {crop}
                </span>
              ))}
            </div>

            {/* Footer verification stamp */}
            <div className="mt-4 pt-3 border-t border-emerald-700/30 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Digitally Verified via Land Records (Demo)
              </span>
              <span>Issued: {farmer.registrationDate}</span>
            </div>
          </div>

          {/* Action buttons (hidden when printing) */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 no-print">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'hi' ? 'किसान कार्ड प्रिंट / सेव करें' : 'Print / Save Kisan Card'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
