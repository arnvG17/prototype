import { Card } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Stethoscope, Users, Pill } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

interface HomeScreenProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    greeting: 'Good Day, Rajveer!',
    location: 'Nabha, Punjab',
    symptomsTitle: 'Check Symptoms',
    symptomsDesc: 'Know what might be wrong',
    doctorTitle: 'Consult Doctor',
    doctorDesc: 'Talk to a specialist now',
    medicineTitle: 'Find Medicines',
    medicineDesc: 'See nearby availability'
  },
  pa: {
    greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਰਾਜਵੀਰ!',
    location: 'ਨਾਭਾ, ਪੰਜਾਬ',
    symptomsTitle: 'ਲੱਛਣ ਜਾਂਚੋ',
    symptomsDesc: 'ਪਤਾ ਕਰੋ ਕਿ ਕੀ ਗਲਤ ਹੋ ਸਕਦਾ ਹੈ',
    doctorTitle: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ',
    doctorDesc: 'ਹੁਣੇ ਮਾਹਿਰ ਨਾਲ ਗੱਲ ਕਰੋ',
    medicineTitle: 'ਦਵਾਈ ਲੱਭੋ',
    medicineDesc: 'ਨੇੜੇ ਦੀ ਉਪਲਬਧਤਾ ਦੇਖੋ'
  },
  hi: {
    greeting: 'नमस्ते, राजवीर!',
    location: 'नाभा, पंजाब',
    symptomsTitle: 'लक्षण जांचें',
    symptomsDesc: 'जानें कि क्या गलत हो सकता है',
    doctorTitle: 'डॉक्टर से सलाह',
    doctorDesc: 'अभी विशेषज्ञ से बात करें',
    medicineTitle: 'दवा खोजें',
    medicineDesc: 'पास की उपलब्धता देखें'
  }
};

export function HomeScreen({ language, onLanguageChange, onNavigate }: HomeScreenProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  const features = [
    {
      id: 'symptoms',
      icon: Stethoscope,
      title: t.symptomsTitle,
      description: t.symptomsDesc,
      color: 'bg-primary',
      emoji: '🩺'
    },
    {
      id: 'doctor',
      icon: Users,
      title: t.doctorTitle,
      description: t.doctorDesc,
      color: 'bg-secondary',
      emoji: '👨‍⚕️'
    },
    {
      id: 'pharmacy',
      icon: Pill,
      title: t.medicineTitle,
      description: t.medicineDesc,
      color: 'bg-primary',
      emoji: '💊'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-8 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">{t.location}</span>
          </div>
          <LanguageToggle currentLanguage={language} onLanguageChange={onLanguageChange} />
        </div>
        
        <h1 className="text-2xl mb-2">{t.greeting}</h1>
      </div>

      {/* Main Features */}
      <div className="px-6 py-8 space-y-6">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card key={feature.id} className="overflow-hidden">
              <Button
                onClick={() => onNavigate(feature.id)}
                className={`w-full h-24 ${feature.color} hover:opacity-90 text-left justify-start p-6 rounded-lg`}
                variant="ghost"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="text-4xl">{feature.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl text-white mb-1">{feature.title}</h3>
                    <p className="text-white/80 text-base">{feature.description}</p>
                  </div>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}