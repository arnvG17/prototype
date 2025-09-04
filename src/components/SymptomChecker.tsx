import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';

interface SymptomCheckerProps {
  language: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    title: 'Symptom Checker',
    step: 'Step',
    of: 'of',
    yes: 'Yes',
    no: 'No',
    next: 'Next',
    back: 'Back',
    consultDoctor: 'Consult Doctor Now',
    result: 'Based on your symptoms',
    disclaimer: 'This is not a medical diagnosis. Please consult a doctor for proper treatment.'
  },
  pa: {
    title: 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    step: 'ਕਦਮ',
    of: 'ਦੇ',
    yes: 'ਹਾਂ',
    no: 'ਨਹੀਂ',
    next: 'ਅਗਲਾ',
    back: 'ਪਿੱਛੇ',
    consultDoctor: 'ਹੁਣੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ',
    result: 'ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ ਤੇ',
    disclaimer: 'ਇਹ ਮੈਡੀਕਲ ਡਾਇਗਨੋਸਿਸ ਨਹੀਂ ਹੈ। ਸਹੀ ਇਲਾਜ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।'
  },
  hi: {
    title: 'लक्षण जांचकर्ता',
    step: 'चरण',
    of: 'का',
    yes: 'हाँ',
    no: 'नहीं',
    next: 'आगे',
    back: 'पीछे',
    consultDoctor: 'अभी डॉक्टर से सलाह लें',
    result: 'आपके लक्षणों के आधार पर',
    disclaimer: 'यह चिकित्सा निदान नहीं है। उचित उपचार के लिए डॉक्टर से सलाह लें।'
  }
};

const questions = {
  en: [
    'Do you have a fever?',
    'Are you experiencing headache?',
    'Do you have a cough?',
    'Are you feeling nauseous?',
    'Do you have body aches?'
  ],
  pa: [
    'ਕੀ ਤੁਹਾਨੂੰ ਬੁਖਾਰ ਹੈ?',
    'ਕੀ ਤੁਹਾਨੂੰ ਸਿਰ ਦਰਦ ਹੈ?',
    'ਕੀ ਤੁਹਾਨੂੰ ਖੰਘ ਹੈ?',
    'ਕੀ ਤੁਸੀਂ ਮਤਲੀ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?',
    'ਕੀ ਤੁਹਾਨੂੰ ਸਰੀਰ ਵਿੱਚ ਦਰਦ ਹੈ?'
  ],
  hi: [
    'क्या आपको बुखार है?',
    'क्या आपको सिरदर्द है?',
    'क्या आपको खांसी है?',
    'क्या आप मतली महसूस कर रहे हैं?',
    'क्या आपको शरीर में दर्द है?'
  ]
};

export function SymptomChecker({ language, onBack, onNavigate }: SymptomCheckerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const t = translations[language as keyof typeof translations] || translations.en;
  const questionSet = questions[language as keyof typeof questions] || questions.en;
  const totalSteps = questionSet.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const getResult = () => {
    const yesCount = answers.filter(Boolean).length;
    if (yesCount >= 3) {
      return {
        condition: language === 'pa' ? 'ਫਲੂ ਦੇ ਲੱਛਣ' : language === 'hi' ? 'फ्लू के लक्षण' : 'Flu-like symptoms',
        severity: 'high',
        advice: language === 'pa' ? 'ਤੁਰੰਤ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ' : language === 'hi' ? 'तुरंत डॉक्टर से संपर्क करें' : 'Contact doctor immediately'
      };
    } else if (yesCount >= 1) {
      return {
        condition: language === 'pa' ? 'ਹਲਕੇ ਲੱਛਣ' : language === 'hi' ? 'हल्के लक्षण' : 'Mild symptoms',
        severity: 'medium',
        advice: language === 'pa' ? 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ' : language === 'hi' ? 'डॉक्टर से सलाह लेनी चाहिए' : 'Should consult doctor'
      };
    } else {
      return {
        condition: language === 'pa' ? 'ਕੋਈ ਗੰਭੀਰ ਲੱਛਣ ਨਹੀਂ' : language === 'hi' ? 'कोई गंभीर लक्षण नहीं' : 'No serious symptoms',
        severity: 'low',
        advice: language === 'pa' ? 'ਆਰਾਮ ਕਰੋ ਅਤੇ ਪਾਣੀ ਪੀਓ' : language === 'hi' ? 'आराम करें और पानी पिएं' : 'Rest and stay hydrated'
      };
    }
  };

  if (showResult) {
    const result = getResult();
    const severityColor = result.severity === 'high' ? 'bg-red-500' : result.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500';

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl">{t.title}</h1>
        </div>

        {/* Result */}
        <div className="px-6 py-8 space-y-6">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 ${severityColor} rounded-full flex items-center justify-center mx-auto`}>
                <AlertTriangle className="h-10 w-10 text-white" />
              </div>
              
              <div>
                <h2 className="text-xl mb-2">{t.result}</h2>
                <h3 className="text-2xl text-primary mb-4">{result.condition}</h3>
                <p className="text-lg text-muted-foreground">{result.advice}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <p className="text-sm text-yellow-800">⚠️ {t.disclaimer}</p>
          </Card>

          <Button 
            onClick={() => onNavigate('doctor')}
            className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
          >
            {t.consultDoctor}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="text-primary-foreground hover:bg-primary-foreground/10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl">{t.title}</h1>
          <p className="text-sm text-primary-foreground/80">
            {t.step} {currentStep + 1} {t.of} {totalSteps}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="px-6 py-8">
        <Card className="p-8">
          <div className="text-center space-y-8">
            <div className="text-6xl">🤔</div>
            <h2 className="text-2xl">{questionSet[currentStep]}</h2>
            
            <div className="space-y-4">
              <Button 
                onClick={() => handleAnswer(true)}
                className="w-full h-16 text-xl bg-primary hover:bg-primary/90"
              >
                ✅ {t.yes}
              </Button>
              <Button 
                onClick={() => handleAnswer(false)}
                variant="outline"
                className="w-full h-16 text-xl border-2"
              >
                ❌ {t.no}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}