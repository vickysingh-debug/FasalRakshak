import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  Send, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Bot, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Server, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface QuickTopic {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: string;
  defaultPromptEn: string;
  defaultPromptHi: string;
}

const WHATSAPP_TOPICS: QuickTopic[] = [
  {
    id: 'crop_damage',
    titleEn: 'Report Crop Damage (फसल नुकसान)',
    titleHi: 'फसल नुकसान सूचना दर्ज करें',
    icon: '🌾',
    defaultPromptEn: 'Hello FasalRakshak, I need to report crop damage caused by recent natural calamity. Please guide me.',
    defaultPromptHi: 'नमस्ते फसल रक्षक, मेरी खड़ी फसल में प्राकृतिक आपदा से नुकसान हुआ है। कृपया नुकसान दर्ज करने में सहायता करें।'
  },
  {
    id: 'claim_status',
    titleEn: 'Track Insurance Claim (दावा स्थिति)',
    titleHi: 'बीमा दावा स्थिति जांचें',
    icon: '📋',
    defaultPromptEn: 'Hello, I want to track my PMFBY crop insurance claim status. My demo claim ID is FR-2024-8841.',
    defaultPromptHi: 'नमस्ते, मुझे अपने पीएम फसल बीमा दावे की स्थिति जांचनी है। मेरी दावा संख्या FR-2024-8841 है।'
  },
  {
    id: 'weather_alert',
    titleEn: 'Weather & Spray Advisory (मौसम सलाह)',
    titleHi: 'मौसम पूर्वानुमान व छिड़काव सलाह',
    icon: '🌦️',
    defaultPromptEn: 'Please share the latest agro-weather forecast and pesticide spraying advisories for my district.',
    defaultPromptHi: 'कृपया मेरे जिले के लिए ताजा मौसम पूर्वानुमान और कीटनाशक छिड़काव की सलाह बताएं।'
  },
  {
    id: 'mandi_prices',
    titleEn: 'APMC Mandi Bhav (ताजा मंडी भाव)',
    titleHi: 'आज के प्रमुख कृषि मंडी भाव',
    icon: '💰',
    defaultPromptEn: 'Kindly provide today\'s APMC market prices for Wheat, Soybean, and Mustard.',
    defaultPromptHi: 'कृपया मुझे आज के गेहूं, सरसों और सोयाबीन के ताजा कृषि उपज मंडी भाव बताएं।'
  },
  {
    id: 'crop_diseases',
    titleEn: 'Crop Pests & Diseases (कीट व रोग)',
    titleHi: 'फसल रोग व कीट रोकथाम उपाय',
    icon: '🐛',
    defaultPromptEn: 'My standing crop is infected with pest infestation. Please suggest approved bio-pesticides and treatment.',
    defaultPromptHi: 'मेरी फसल में कीट व बीमारी का प्रकोप दिख रहा है। कृपया उचित कीटनाशक व जैविक उपचार की सलाह दें।'
  },
  {
    id: 'govt_schemes',
    titleEn: 'Government Schemes (सरकारी योजनाएं)',
    titleHi: 'पीएम किसान व केसीसी ऋण योजना',
    icon: '🏛️',
    defaultPromptEn: 'Please provide eligibility guidelines for PM-KISAN 17th installment and Kisan Credit Card (KCC).',
    defaultPromptHi: 'कृपया प्रधानमंत्री किसान सम्मान निधि और किसान क्रेडिट कार्ड (KCC) योजना के नियमों की जानकारी दें।'
  }
];

export const WhatsAppSection: React.FC = () => {
  const { t, language } = useLanguage();

  // Load configured WhatsApp number from environment variable (with safe fallback)
  const configuredNumber = (((import.meta as any).env?.VITE_WHATSAPP_NUMBER || '919876543210') as string).replace(/\D/g, '');
  
  const [selectedTopic, setSelectedTopic] = useState<QuickTopic>(WHATSAPP_TOPICS[0]);
  const [customText, setCustomText] = useState<string>(
    language === 'hi' ? WHATSAPP_TOPICS[0].defaultPromptHi : WHATSAPP_TOPICS[0].defaultPromptEn
  );
  const [copied, setCopied] = useState(false);

  const handleSelectTopic = (topic: QuickTopic) => {
    setSelectedTopic(topic);
    setCustomText(language === 'hi' ? topic.defaultPromptHi : topic.defaultPromptEn);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(customText.trim());
    const waUrl = `https://wa.me/${configuredNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t('whatsAppTitle')}
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Manual Helpline Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Instant prefilled messaging for rural farmers via official WhatsApp Business
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Configured Business Number:</span>
            <span className="font-mono text-sm font-bold text-emerald-800">+{configuredNumber}</span>
          </div>
        </div>

        {/* Cloud API vs Manual Helpline Transparency Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>How WhatsApp Farmer Assistance Works (Architecture Disclosure):</span>
          </div>
          <p>
            • <strong>Direct Click-to-Chat (Active Now):</strong> Clicking "Chat on WhatsApp" opens your WhatsApp with pre-composed agricultural questions directly to our manual Kisan Sahayata desk number (<code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">+{configuredNumber}</code>).
          </p>
          <p>
            • <strong>Automated Bot Replies:</strong> Requires an official Meta WhatsApp Business Cloud API access token and webhook configured on your backend server. Because private webhook tokens are never exposed in frontend code, this interface functions as a verified, secure manual helpline until a cloud webhook is connected.
          </p>
        </div>
      </div>

      {/* Interactive Topic Chooser & Message Composer */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
            1. Select Agricultural Topic / विषय चुनें:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHATSAPP_TOPICS.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-white'
                  }`}
                >
                  <span className="text-2xl">{topic.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {language === 'hi' ? topic.titleHi : topic.titleEn}
                    </h4>
                    <span className="text-[10px] text-slate-500 block">Click to compose message</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Preview & Customization */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              2. Review Message (Ready to send):
            </h3>
            <button
              type="button"
              onClick={handleCopyText}
              className="text-xs text-slate-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* CTA Launch WhatsApp */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero personal credentials or tokens exposed in URL</span>
          </div>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-base shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-100"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>{t('chatOnWhatsApp')}</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};
