import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_FAQS, MOCK_AI_RESPONSES } from '../data/mockData';
import { 
  PhoneCall, 
  MessageSquare, 
  Bot, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  ShieldCheck, 
  Building2, 
  Clock, 
  CheckCircle,
  Sparkles,
  Phone
} from 'lucide-react';
import { WhatsAppSection } from './WhatsAppSection';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AssistanceSection: React.FC = () => {
  const { t, language } = useLanguage();

  // Chatbot state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: language === 'hi' 
        ? 'नमस्कार किसान भाई! मैं "किसान मित्र एआई" हूँ। आप मुझसे फसल बीमा, दावा प्रक्रिया, ओलावृष्टि मुआवजा, सर्वेयर या एमएसपी (MSP) से जुड़ा कोई भी सवाल पूछ सकते हैं।' 
        : 'Namaskar Farmer Brother! I am Kisan Mitra AI. You can ask me anything about crop insurance claims, survey deadlines, hailstorm compensation, or current MSP.',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // FAQ state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Grievance form state
  const [grievanceName, setGrievanceName] = useState('');
  const [grievancePhone, setGrievancePhone] = useState('');
  const [grievanceClaimId, setGrievanceClaimId] = useState('');
  const [grievanceDesc, setGrievanceDesc] = useState('');
  const [grievanceSubmittedTicket, setGrievanceSubmittedTicket] = useState<string | null>(null);

  const quickQuestions = [
    {
      labelEn: 'PMFBY Claim Timeline?',
      labelHi: 'मुआवजा मिलने की समय-सीमा?',
      key: 'timeline'
    },
    {
      labelEn: 'What if Surveyor does not visit?',
      labelHi: 'यदि 48 घंटे में सर्वेक्षक न आए तो?',
      key: 'surveyor'
    },
    {
      labelEn: 'What is current Rabi MSP?',
      labelHi: 'रबी फसलों का ताजा एमएसपी (MSP)?',
      key: 'msp'
    },
    {
      labelEn: 'How much premium does farmer pay?',
      labelHi: 'किसान को कितना प्रीमियम देना पड़ता है?',
      key: 'pmfby'
    }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      const lower = query.toLowerCase();

      if (lower.includes('surveyor') || lower.includes('सर्वेक्षक') || lower.includes('पटवारी') || lower.includes('visit')) {
        botResponse = language === 'hi' ? MOCK_AI_RESPONSES.surveyor.hi : MOCK_AI_RESPONSES.surveyor.en;
      } else if (lower.includes('msp') || lower.includes('एमएसपी') || lower.includes('समर्थन मूल्य') || lower.includes('rate') || lower.includes('wheat')) {
        botResponse = language === 'hi' ? MOCK_AI_RESPONSES.msp.hi : MOCK_AI_RESPONSES.msp.en;
      } else if (lower.includes('premium') || lower.includes('प्रीमियम') || lower.includes('cost') || lower.includes('pmfby') || lower.includes('योजना')) {
        botResponse = language === 'hi' ? MOCK_AI_RESPONSES.pmfby.hi : MOCK_AI_RESPONSES.pmfby.en;
      } else {
        botResponse = language === 'hi' ? MOCK_AI_RESPONSES.timeline.hi : MOCK_AI_RESPONSES.timeline.en;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `GR-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    setGrievanceSubmittedTicket(ticketId);
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? MOCK_FAQS 
    : MOCK_FAQS.filter(f => f.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Official WhatsApp Farmer Chatbot Section */}
      <WhatsAppSection />

      {/* 24x7 Helplines & AI Kisan Mitra */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
              24x7 Helpdesk
            </span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {t('demoTag')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('assistanceTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t('assistanceSubtitle')}
          </p>
        </div>

        {/* Emergency Phone Helpline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-900 text-white shadow-md flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-emerald-950/60 px-2 py-0.5 rounded">
                Toll-Free • All Languages
              </span>
              <h3 className="text-lg font-bold mt-2">Kisan Call Centre (KCC)</h3>
              <p className="text-xs text-emerald-200 mt-1">Direct agronomy & claim guidance by agricultural experts.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between">
              <span className="font-mono text-xl font-black text-amber-300">1800-180-1551</span>
              <a 
                href="tel:18001801551" 
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t('callNow')}</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Central PMFBY Desk
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">PM Fasal Bima Helpline</h3>
              <p className="text-xs text-slate-500 mt-1">National crop insurance loss reporting hotline.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-xl font-black text-emerald-800">14447</span>
              <a 
                href="tel:14447" 
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t('callNow')}</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Local Officials
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">District Agriculture Officer</h3>
              <p className="text-xs text-slate-500 mt-1">Contact your Krishi Vigyan Kendra (KVK) and Patwari.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Mon - Sat: 9am - 5pm</span>
              <span className="text-xs text-emerald-700 font-bold">KVK Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Kisan Mitra Chatbot & Grievance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kisan Mitra AI Chatbot */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm flex flex-col justify-between h-[580px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                  <Bot className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    {language === 'hi' ? 'किसान मित्र एआई (Kisan Mitra)' : 'Kisan Mitra AI Assistant'}
                  </h3>
                  <span className="text-xs text-emerald-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online • Ready to assist
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                {language === 'hi' ? 'हिंदी व अंग्रेजी' : 'Hindi & English'}
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(language === 'hi' ? q.labelHi : q.labelEn)}
                  className="text-[11px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  {language === 'hi' ? q.labelHi : q.labelEn}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="mt-4 space-y-3 h-[290px] overflow-y-auto pr-1">
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-500 rounded-2xl px-4 py-2 text-xs italic">
                    {language === 'hi' ? 'किसान मित्र उत्तर तैयार कर रहा है...' : 'Kisan Mitra is typing...'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Box */}
          <div className="pt-3 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={language === 'hi' ? 'फसल बीमा, दावा या एमएसपी से जुड़ा सवाल पूछें...' : 'Ask about claim status, surveyor inspection, or MSP...'}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-colors flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grievance Redressal Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">
                {language === 'hi' ? 'किसान शिकायत निवारण मंच' : 'Farmer Grievance Redressal'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' 
                  ? 'यदि सर्वेक्षक समय पर नहीं पहुंचे अथवा दावे में कोई समस्या हो तो सीधे शिकायत दर्ज करें।' 
                  : 'Report surveyor delays, discrepancies in damage estimation, or DBT issues directly.'}
              </p>
            </div>

            {grievanceSubmittedTicket ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center my-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  {language === 'hi' ? 'आपकी शिकायत सफलतापूर्वक दर्ज की गई!' : 'Grievance Registered Successfully!'}
                </h4>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 inline-block">
                  <span className="text-xs text-slate-500 block">Complaint Ticket ID:</span>
                  <span className="text-lg font-black font-mono text-emerald-800">{grievanceSubmittedTicket}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {language === 'hi' 
                    ? 'जिला कृषि अधिकारी द्वारा 24 घंटे में आपके मोबाइल पर संपर्क किया जाएगा।' 
                    : 'The District Agriculture Officer will contact your mobile within 24 hours.'}
                </p>
                <button
                  type="button"
                  onClick={() => setGrievanceSubmittedTicket(null)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                >
                  {language === 'hi' ? 'नई शिकायत दर्ज करें' : 'Lodge Another Complaint'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleGrievanceSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('formFullName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={grievanceName}
                      onChange={(e) => setGrievanceName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                      value={grievancePhone}
                      onChange={(e) => setGrievancePhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Related Claim ID (Optional / संबंधित दावा संख्या)
                  </label>
                  <input
                    type="text"
                    value={grievanceClaimId}
                    onChange={(e) => setGrievanceClaimId(e.target.value)}
                    placeholder="e.g. FR-2024-8841"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Complaint Details / शिकायत का विवरण <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={grievanceDesc}
                    onChange={(e) => setGrievanceDesc(e.target.value)}
                    placeholder="Describe your issue (e.g. surveyor did not visit within 72 hours of hailstorm report)..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                >
                  {language === 'hi' ? 'शिकायत तुरंत दर्ज करें' : 'Submit Grievance Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <span>{t('faqTitle')}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi' ? 'प्रधानमंत्री फसल बीमा योजना से संबंधित मुख्य नियमावली एवं किसान अधिकार' : 'Clear answers to essential crop damage compensation questions'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'claim', 'eligibility', 'dbt', 'scheme'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{language === 'hi' ? faq.questionHi : faq.questionEn}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{language === 'hi' ? faq.answerHi : faq.answerEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
