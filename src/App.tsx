import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DamageReport, FarmerProfile } from './types';
import { INITIAL_MOCK_CLAIMS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { WeatherPage } from './components/WeatherPage';
import { DamageReportForm } from './components/DamageReportForm';
import { ClaimTracker } from './components/ClaimTracker';
import { MyClaimsPage } from './components/MyClaimsPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AssistanceSection } from './components/AssistanceSection';
import { AuthModal } from './components/AuthModal';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { KisanCardModal } from './components/KisanCardModal';
import { Footer } from './components/Footer';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedClaimId, setSelectedClaimId] = useState<string>('FR-2024-8841');
  
  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isKisanCardOpen, setIsKisanCardOpen] = useState<boolean>(false);

  // Load claims from localStorage or fallback to initial mock claims
  const [claims, setClaims] = useState<DamageReport[]>(() => {
    try {
      const saved = localStorage.getItem('fasalrakshak_claims');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved claims:', e);
    }
    return INITIAL_MOCK_CLAIMS;
  });

  // Save claims changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fasalrakshak_claims', JSON.stringify(claims));
    } catch (e) {
      console.error('Error saving claims:', e);
    }
  }, [claims]);

  const handleClaimSubmitted = (newClaim: DamageReport) => {
    setClaims(prev => [newClaim, ...prev]);
    setSelectedClaimId(newClaim.id);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackClaimFromDashboard = (claimId: string) => {
    setSelectedClaimId(claimId);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert current user to FarmerProfile for Kisan Card modal if available
  const farmerProfileForCard: FarmerProfile | null = user ? {
    id: user.id,
    fullName: user.fullName,
    fatherHusbandName: user.fatherHusbandName || '',
    mobile: user.mobile,
    state: user.state,
    district: user.district,
    village: user.village,
    khasraNo: user.khasraNo || 'N/A',
    landAreaAcres: user.landAreaAcres || 2.0,
    primaryCrops: ['Wheat (गेहूं)', 'Soybean (सोयाबीन)'],
    bankAccount: {
      bankName: 'State Bank of India',
      accountNoLast4: '4819',
      ifsc: 'SBIN0001234'
    },
    consentGiven: true,
    createdAt: user.createdAt,
    registrationDate: new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => {
          setAuthMode('login');
          setIsAuthOpen(true);
        }}
        onOpenLanguageModal={() => setIsLangModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'home' && (
          <HeroBanner
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRegister={() => {
              setAuthMode('register');
              setIsAuthOpen(true);
            }}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherPage />
        )}

        {activeTab === 'report' && (
          <DamageReportForm
            farmerProfile={farmerProfileForCard}
            onSubmitSuccess={handleClaimSubmitted}
            onOpenRegister={() => {
              setAuthMode('register');
              setIsAuthOpen(true);
            }}
          />
        )}

        {activeTab === 'track' && (
          <ClaimTracker
            claims={claims}
            initialSearchId={selectedClaimId}
            onNavigateToReport={() => {
              setActiveTab('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'myclaims' && (
          <MyClaimsPage
            claims={claims}
            onTrackClaim={(claimId) => {
              setSelectedClaimId(claimId);
              setActiveTab('track');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenReport={() => {
              setActiveTab('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => {
              setAuthMode('login');
              setIsAuthOpen(true);
            }}
            onViewKisanCard={() => setIsKisanCardOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmerDashboard
            claims={claims}
            onTrackClaim={handleTrackClaimFromDashboard}
            onReportDamage={() => {
              setActiveTab('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToWeather={() => {
              setActiveTab('weather');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'assistance' && (
          <AssistanceSection />
        )}
      </main>

      {/* Authentication (Login & Register) Modal with Privacy Consent */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onRegisterSuccess={() => {
          setIsKisanCardOpen(true);
        }}
      />

      {/* 14 Indian Languages Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />

      {/* Digital Kisan Card Modal */}
      <KisanCardModal
        isOpen={isKisanCardOpen}
        onClose={() => setIsKisanCardOpen(false)}
        farmer={farmerProfileForCard}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRegister={() => {
          setAuthMode('register');
          setIsAuthOpen(true);
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
