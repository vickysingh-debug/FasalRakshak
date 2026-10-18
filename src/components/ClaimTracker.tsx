import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DamageReport, ClaimStatus } from '../types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  UserCheck, 
  Landmark, 
  MapPin, 
  Phone, 
  Printer, 
  AlertCircle,
  Sparkles,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface ClaimTrackerProps {
  claims: DamageReport[];
  initialSearchId?: string;
  onNavigateToReport: () => void;
}

const TIMELINE_STAGES: { status: ClaimStatus; labelKey: string; descEn: string; descHi: string }[] = [
  { 
    status: 'SUBMITTED', 
    labelKey: 'statusSubmitted', 
    descEn: 'Damage report received and logged into national PMFBY portal.',
    descHi: 'नुकसान की सूचना राष्ट्रीय पोर्टल पर पंजीकृत की गई।'
  },
  { 
    status: 'DOCS_VERIFIED', 
    labelKey: 'statusDocsVerified', 
    descEn: 'Khasra land records, sowing declaration & geo-tagged photos validated.',
    descHi: 'खसरा खतौनी, बुवाई गिरदावरी व फोटो का प्रारंभिक सत्यापन पूर्ण।'
  },
  { 
    status: 'SURVEY_SCHEDULED', 
    labelKey: 'statusSurveyScheduled', 
    descEn: 'Joint assessment team (Agriculture Officer & Patwari) assigned for field inspection.',
    descHi: 'संयुक्त सर्वे दल (कृषि अधिकारी व हल्का पटवारी) मौके के निरीक्षण हेतु नियुक्त।'
  },
  { 
    status: 'INSPECTION_COMPLETED', 
    labelKey: 'statusInspectionCompleted', 
    descEn: 'Physical crop cutting and damage percentage calculation report uploaded.',
    descHi: 'खेत में पहुंचकर फसल कटाई प्रयोग व क्षति प्रतिशत निर्धारण रिपोर्ट अपलोड।'
  },
  { 
    status: 'DBT_TRANSFERRED', 
    labelKey: 'statusDbtTransferred', 
    descEn: 'Final compensation credited directly to farmer’s Aadhaar-linked bank account.',
    descHi: 'स्वीकृत मुआबजा राशि किसान के आधार लिंक बैंक खाते (DBT) में अंतरित।'
  }
];

export const ClaimTracker: React.FC<ClaimTrackerProps> = ({ 
  claims, 
  initialSearchId,
  onNavigateToReport 
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState(initialSearchId || (claims[0]?.id || 'FR-2024-8841'));
  const [selectedClaim, setSelectedClaim] = useState<DamageReport | null>(
    claims.find(c => c.id.toLowerCase() === (initialSearchId || 'FR-2024-8841').toLowerCase()) || claims[0] || null
  );
  const [searched, setSearched] = useState(true);

  const isOwner = Boolean(user && selectedClaim && (
    user.id === selectedClaim.farmerId ||
    (user.mobile && selectedClaim.mobile && user.mobile.replace(/\D/g, '') === selectedClaim.mobile.replace(/\D/g, ''))
  ));

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const match = claims.find(c => c.id.toUpperCase() === query);
    setSelectedClaim(match || null);
    setSearched(true);
  };

  const handleSelectChip = (claimId: string) => {
    setSearchQuery(claimId);
    const match = claims.find(c => c.id === claimId);
    setSelectedClaim(match || null);
    setSearched(true);
  };

  const getStageIndex = (status: ClaimStatus): number => {
    switch (status) {
      case 'SUBMITTED': return 0;
      case 'DOCS_VERIFIED': return 1;
      case 'SURVEY_SCHEDULED': return 2;
      case 'INSPECTION_COMPLETED':
      case 'APPROVED': return 3;
      case 'DBT_TRANSFERRED': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = selectedClaim ? getStageIndex(selectedClaim.status) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
              {language === 'hi' ? 'लाइव दावा स्थिति' : 'Live Claim Inspection'}
            </span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {t('demoTag')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('trackTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t('trackSubtitle')}
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3.5 text-base rounded-2xl border-2 border-emerald-200 focus:outline-none focus:border-emerald-600 font-mono font-medium shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>{t('trackButton')}</span>
          </button>
        </form>

        {/* Quick Demo Claim Chips */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('demoClaimChipsTitle')}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {claims.map((claim) => (
              <button
                key={claim.id}
                onClick={() => handleSelectChip(claim.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
                  selectedClaim?.id === claim.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{claim.id}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
                  claim.status === 'DBT_TRANSFERRED' 
                    ? 'bg-emerald-200 text-emerald-900' 
                    : claim.status === 'INSPECTION_COMPLETED'
                    ? 'bg-blue-200 text-blue-900'
                    : 'bg-amber-200 text-amber-900'
                }`}>
                  {claim.status === 'DBT_TRANSFERRED' ? 'Paid' : claim.status === 'INSPECTION_COMPLETED' ? 'Surveyed' : 'Active'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Claim Detail Display */}
      {selectedClaim ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          {/* Claim Summary Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                  {selectedClaim.id}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Submitted: {selectedClaim.submissionDate}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {selectedClaim.cropName} • {selectedClaim.causeOfDamage}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedClaim.location.village}, {selectedClaim.location.district}, {selectedClaim.location.state}</span>
              </p>
            </div>

            {/* Compensation & Status Badge */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between bg-emerald-50 lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-emerald-200 lg:border-none">
              <div>
                <span className="text-xs text-slate-500 block lg:text-right">
                  {selectedClaim.status === 'DBT_TRANSFERRED' ? 'DBT Transferred Amount:' : 'Estimated PMFBY Benefit:'}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                  ₹{selectedClaim.estimatedCompensation.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full ${
                  selectedClaim.status === 'DBT_TRANSFERRED'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t(`status${selectedClaim.status.split('_').map(s => s.charAt(0) + s.slice(1).toLowerCase()).join('')}`)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* 5-Stage Visual Workflow Timeline */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
              {language === 'hi' ? 'दावा निपटान प्रगति क्रम' : 'Claim Verification Timeline'}
            </h4>

            <div className="relative">
              {/* Desktop timeline track */}
              <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-slate-200 -z-0">
                <div 
                  className="h-1 bg-emerald-600 transition-all duration-500"
                  style={{ width: `${(currentStageIndex / (TIMELINE_STAGES.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {TIMELINE_STAGES.map((step, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div 
                      key={step.status}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                          : isCompleted
                          ? 'bg-white border-emerald-200'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center md:flex-col md:items-start gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className="text-xs font-bold text-slate-900">
                          {t(step.labelKey)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {language === 'hi' ? step.descHi : step.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            {/* Farmer & Crop Data with Privacy Masking */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{language === 'hi' ? 'खेत एवं नुकसान विवरण' : 'Farm & Damage Details'}</span>
                </h5>
                {isOwner ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Owner Access
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3 h-3" /> PII Masked
                  </span>
                )}
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">{t('formFullName')}</span>
                <span className="font-bold text-slate-900">
                  {isOwner 
                    ? selectedClaim.farmerName 
                    : `${selectedClaim.farmerName.split(' ')[0]} (Verified Farmer)`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Contact</span>
                <span className="font-mono text-slate-700">
                  {isOwner 
                    ? selectedClaim.mobile 
                    : `${selectedClaim.mobile.slice(0, 3)}XXXXX${selectedClaim.mobile.slice(-2)}`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Season & Sowing</span>
                <span className="font-semibold text-slate-800">{selectedClaim.cropSeason} • {selectedClaim.sowingDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">{t('damagePercent')}</span>
                <span className="font-bold text-red-600">{selectedClaim.estimatedDamagePercent}% Loss</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Affected Land Area</span>
                <span className="font-semibold text-slate-800">{selectedClaim.affectedAreaAcres} / {selectedClaim.totalAreaAcres} Acres</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-500 block mb-1">Farmer Observation / Notes:</span>
                <p className="text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                  "{selectedClaim.notes || 'Damage caused by natural calamity as reported.'}"
                </p>
              </div>
            </div>

            {/* Field Surveyor & Inspection Officer Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                <span>{language === 'hi' ? 'नियुक्त पटवारी / सर्वेक्षक' : 'Field Inspection Officer'}</span>
              </h5>

              {selectedClaim.surveyorAssigned ? (
                <>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-1">
                    <p className="font-bold text-slate-900 text-sm">{selectedClaim.surveyorAssigned.name}</p>
                    <p className="text-[11px] text-emerald-700 font-medium">{selectedClaim.surveyorAssigned.designation}</p>
                    <div className="pt-2 flex items-center justify-between">
                      <a 
                        href={`tel:${selectedClaim.surveyorAssigned.phone}`}
                        className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedClaim.surveyorAssigned.phone}</span>
                      </a>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        Visit: {selectedClaim.surveyorAssigned.inspectionDate || 'Scheduled'}
                      </span>
                    </div>
                  </div>

                  {selectedClaim.surveyorAssigned.surveyReport && (
                    <div className="pt-1">
                      <span className="text-slate-500 font-semibold block mb-1">Inspection Findings:</span>
                      <p className="text-[11px] text-slate-700 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 leading-relaxed">
                        {selectedClaim.surveyorAssigned.surveyReport}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-white rounded-xl text-center text-slate-500">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                  <p>Surveyor assignment is under processing. Expected within 24 hours.</p>
                </div>
              )}
            </div>

            {/* DBT Bank Transfer & Inspection Photo */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5 mb-2">
                  <Landmark className="w-4 h-4" />
                  <span>{language === 'hi' ? 'डीबीटी भुगतान एवं साक्ष्य फोटो' : 'DBT Transfer & Photo Proof'}</span>
                </h5>

                {selectedClaim.dbtDetails ? (
                  <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-300 text-emerald-950 mb-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> DBT Payment Settled
                      </span>
                      <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded font-bold">
                        {selectedClaim.dbtDetails.transferDate}
                      </span>
                    </div>
                    <p className="text-sm font-mono font-bold text-emerald-900">UTR: {selectedClaim.dbtDetails.utrNumber}</p>
                    <p className="text-[11px] text-emerald-800">{selectedClaim.dbtDetails.bankName}</p>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 mb-3 text-xs">
                    <span className="font-bold block">DBT Status: In Progress</span>
                    <span>Direct bank credit will be triggered upon state-insurer sanction.</span>
                  </div>
                )}

                {/* Photo thumbnail */}
                {selectedClaim.photoUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-300 h-28 group">
                    <img
                      src={selectedClaim.photoUrl}
                      alt="Crop Evidence"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-[10px] font-mono">
                      <span>✓ Geo-Tagged Evidence Attached</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Print Slip Button */}
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors mt-2"
              >
                <Printer className="w-4 h-4 text-emerald-700" />
                <span>{t('printReceipt')}</span>
              </button>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            {language === 'hi' ? 'दावा संख्या नहीं मिली' : 'Claim ID Not Found'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {language === 'hi' 
              ? `दावा आईडी "${searchQuery}" से कोई रिकॉर्ड उपलब्ध नहीं है। कृपया ऊपर दिए गए त्वरित डेमो आईडी में से किसी एक पर क्लिक करें अथवा नया नुकसान दर्ज करें।`
              : `No record matching "${searchQuery}". Please select one of the quick demo chips above or submit a fresh damage report.`}
          </p>
          <button
            onClick={onNavigateToReport}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm"
          >
            {t('heroCtaReport')}
          </button>
        </div>
      ) : null}
    </div>
  );
};
