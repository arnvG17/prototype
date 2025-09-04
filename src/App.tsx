import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChatSymptomChecker } from './components/ChatSymptomChecker';
import { DoctorConsultation } from './components/DoctorConsultation';
import { PharmacyFinder } from './components/PharmacyFinder';
import { HealthRecords } from './components/HealthRecords';
import { BottomNavigation } from './components/BottomNavigation';

type Screen = 'login' | 'home' | 'symptoms' | 'doctor' | 'pharmacy' | 'records';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('pa'); // Default to Punjabi

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const showBottomNav = isLoggedIn && currentScreen !== 'home';
  const isMainFeature = ['symptoms', 'doctor', 'pharmacy'].includes(currentScreen);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <LoginScreen 
          onLogin={handleLogin} 
          language={language}
          onLanguageChange={setLanguage}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className={`${showBottomNav ? 'pb-20' : ''}`}>
        {currentScreen === 'home' && (
          <HomeScreen 
            language={language}
            onLanguageChange={setLanguage}
            onNavigate={handleNavigation}
          />
        )}
        
        {currentScreen === 'symptoms' && (
          <ChatSymptomChecker 
            language={language}
            onBack={handleBack}
            onNavigate={handleNavigation}
          />
        )}
        
        {currentScreen === 'doctor' && (
          <DoctorConsultation 
            language={language}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'pharmacy' && (
          <PharmacyFinder 
            language={language}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'records' && (
          <HealthRecords 
            language={language}
            onBack={handleBack}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavigation 
          activeScreen={currentScreen}
          onNavigate={handleNavigation}
          language={language}
        />
      )}
    </div>
  );
}