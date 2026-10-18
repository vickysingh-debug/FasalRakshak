import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { DamageReport } from '../types';
import { 
  FileText, 
  Lock, 
  UserCheck, 
  CheckCircle2, 
  MapPin, 
  Printer, 
  PlusCircle, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Landmark
} from 'lucide-react';

interface MyClaimsPageProps {
  claims: DamageReport[];
  onTrackClaim: (claimId: string) => void;
  onOpenReport: () => void;
  onOpenAuth: () => void;
  onViewKisanCard: () => void;
}

export const MyClaimsPage: React.FC<MyClaimsPageProps> = ({
  claims,
  onTrackClaim,
  onOpenReport,
  onOpenAuth,
  onViewKisanCard
}) => {
  const { user, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-emerald-600" />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            Privacy & Access Control Active
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-3">
            {language === 'hi' ? 'अपने व्यक्तिगत दावों तक सुरक्षित पहुंच' : 'Secure Access to Your Private Claims'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            {language === 'hi' 
              ? 'किसान गोपनीयता नियमों के अनुसार आपके खेत, खसरा नंबर और बैंक विवरण सार्वजनिक रूप से प्रदर्शित नहीं किए जाते हैं। कृपया अपने व्यक्तिगत दावे देखने हेतु लॉगिन करें।'
              : 'Under DPDP farmer privacy guidelines, personal land records and bank compensation details are kept private by default. Please log in to view your claims.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-amber-300" />
            <span>{t('navLogin')} / {t('navRegister')}</span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Each farmer can access only their own records after authentication.</span>
        </div>
      </div>
    );
  }

  // Filter claims that belong to this authenticated user
  const userClaims = claims.filter(
    c => (c.farmerId && c.farmerId === user.id) || 
         (c.mobile && user.mobile && c.mobile.replace(/\D/g, '') === user.mobile.replace(/\D/g, ''))
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl font-black shadow-md">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {user.fullName}
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  {user.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span>{user.village}, {user.district}, {user.state}</span>
                <span>•</span>
                <span>Mobile: +91 {user.mobile}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewKisanCard}
              className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Digital Kisan Card</span>
            </button>
            <button
              onClick={onOpenReport}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('navReport')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900">
            {language === 'hi' ? 'आपके पंजीकृत दावों का विवरण' : 'Your Registered Crop Claims'}
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {userClaims.length} {language === 'hi' ? 'दावे मिले' : 'Claims Found'}
          </span>
        </div>

        {userClaims.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              {language === 'hi' ? 'वर्तमान में कोई सक्रिय दावा नहीं है' : 'No claims filed yet'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'hi' 
                ? 'यदि आपकी फसल में ओलावृष्टि, बाढ़ या कीट प्रकोप से नुकसान हुआ है, तो 72 घंटे में सूचना दर्ज करें।' 
                : 'If your crop suffered loss from unseasonal rain or hailstorms, submit a report within 72 hours.'}
            </p>
            <button
              onClick={onOpenReport}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
            >
              {t('navReport')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {userClaims.map((claim) => (
              <div 
                key={claim.id}
                className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {claim.id}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      claim.status === 'DBT_TRANSFERRED' 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {claim.status === 'DBT_TRANSFERRED' ? 'DBT Paid' : 'Under Assessment'}
                    </span>
                    <span className="text-[11px] text-slate-400">Filed: {claim.submissionDate}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {claim.cropName} • {claim.causeOfDamage}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Affected Area: {claim.affectedAreaAcres} Acres ({claim.estimatedDamagePercent}% Loss)
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">Estimated Compensation:</span>
                    <span className="text-xl font-black font-mono text-emerald-800">
                      ₹{claim.estimatedCompensation.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onTrackClaim(claim.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>{t('trackButton')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
