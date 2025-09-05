import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Phone, ArrowRight } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

interface LoginScreenProps {
  onLogin: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const translations = {
  en: {
    title: 'Rural HealthConnect',
    subtitle: 'Your health companion',
    phoneLabel: 'Enter your phone number',
    phonePlaceholder: '+91 98765 43210',
    otpLabel: 'Enter OTP',
    otpPlaceholder: '123456',
    sendOtp: 'Send OTP',
    verify: 'Verify & Login',
    doctorWave: '👋 Welcome to better healthcare!',
    prototypeNote: 'Prototype only: any phone number and OTP will work for now.'
  },
  pa: {
    title: 'ਰੂਰਲ ਹੈਲਥ ਕਨੇਕਟ',
    subtitle: 'ਤੁਹਾਡਾ ਸਿਹਤ ਸਾਥੀ',
    phoneLabel: 'ਆਪਣਾ ਫ਼ੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
    phonePlaceholder: '+91 98765 43210',
    otpLabel: 'OTP ਦਾਖਲ ਕਰੋ',
    otpPlaceholder: '123456',
    sendOtp: 'OTP ਭੇਜੋ',
    verify: 'ਤਸਦੀਕ ਅਤੇ ਲਾਗਿਨ',
    doctorWave: '👋 ਬਿਹਤਰ ਸਿਹਤ ਸੇਵਾ ਵਿੱਚ ਸੁਆਗਤ!',
    prototypeNote: 'ਸਿਰਫ਼ ਪ੍ਰੋਟੋਟਾਈਪ: ਇਸ ਵੇਲੇ ਕੋਈ ਵੀ ਫ਼ੋਨ ਨੰਬਰ ਅਤੇ OTP ਕੰਮ ਕਰੇਗਾ.'
  },
  hi: {
    title: 'रूरल हेल्थकनेक्ट',
    subtitle: 'आपका स्वास्थ्य साथी',
    phoneLabel: 'अपना फोन नंबर दर्ज करें',
    phonePlaceholder: '+91 98765 43210',
    otpLabel: 'OTP दर्ज करें',
    otpPlaceholder: '123456',
    sendOtp: 'OTP भेजें',
    verify: 'सत्यापित करें और लॉगिन',
    doctorWave: '👋 बेहतर स्वास्थ्य सेवा में स्वागत!',
    prototypeNote: 'केवल प्रोटोटाइप: फिलहाल कोई भी फ़ोन नंबर और OTP काम करेगा.'
  }
};

export function LoginScreen({ onLogin, language, onLanguageChange }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div></div>
        <LanguageToggle currentLanguage={language} onLanguageChange={onLanguageChange} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-3xl text-white mb-2 text-center font-medium">{t.title}</h1>
          <p className="text-primary-foreground/80 text-lg">{t.subtitle}</p>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-sm bg-white p-6 shadow-xl">
          {step === 'phone' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-lg mb-3 text-foreground">{t.phoneLabel}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-12 h-14 text-lg border-2"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendOtp}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
                disabled={phoneNumber.length < 10}
              >
                {t.sendOtp}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">{t.prototypeNote}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-lg mb-3 text-foreground">{t.otpLabel}</label>
                <Input
                  type="text"
                  placeholder={t.otpPlaceholder}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-14 text-lg text-center border-2 tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handleVerifyOtp}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
                disabled={otp.length !== 6}
              >
                {t.verify}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">{t.prototypeNote}</p>
            </div>
          )}
        </Card>

        {/* Doctor Illustration */}
        <div className="mt-8 text-center">
          <div className="text-4xl mb-2">👨‍⚕️</div>
          <p className="text-primary-foreground/80 text-lg">{t.doctorWave}</p>
        </div>
      </div>
    </div>
  );
}