import { Button } from './ui/button';
import { Stethoscope, Users, Pill } from 'lucide-react';

interface BottomNavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  language: string;
}

const translations = {
  en: {
    symptoms: 'Symptoms',
    doctor: 'Doctor',
    medicine: 'Medicine'
  },
  pa: {
    symptoms: 'ਲੱਛਣ',
    doctor: 'ਡਾਕਟਰ',
    medicine: 'ਦਵਾਈ'
  },
  hi: {
    symptoms: 'लक्षण',
    doctor: 'डॉक्टर',
    medicine: 'दवा'
  }
};

export function BottomNavigation({ activeScreen, onNavigate, language }: BottomNavigationProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  const navItems = [
    {
      id: 'symptoms',
      icon: Stethoscope,
      label: t.symptoms,
      emoji: '🩺'
    },
    {
      id: 'doctor',
      icon: Users,
      label: t.doctor,
      emoji: '👨‍⚕️'
    },
    {
      id: 'pharmacy',
      icon: Pill,
      label: t.medicine,
      emoji: '💊'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary/20 px-4 py-2 shadow-lg">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 h-16 px-2 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="text-2xl">{item.emoji}</div>
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}