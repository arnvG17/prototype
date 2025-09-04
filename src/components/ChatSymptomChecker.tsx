import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Send, Mic, MicOff, Camera, Video, Volume2, ArrowRight } from 'lucide-react';
import { TypingIndicator } from './TypingIndicator';

interface ChatSymptomCheckerProps {
  language: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  mediaType?: 'photo' | 'video';
}

const translations = {
  en: {
    title: 'Rural HealthConnect',
    step: 'Step',
    of: 'of',
    typeMessage: 'Type your message...',
    commonSymptoms: 'Common Symptoms',
    send: 'Send',
    recording: 'Recording...',
    tapToStop: 'Tap to stop',
    consultDoctor: 'Talk to Doctor Now',
    greeting: "Hello! I'd like to understand how you are feeling. Please tell me your problem.",
    durationQuestion: "How long have you had this problem?",
    severityQuestion: "Is the pain mild or strong?",
    relatedQuestion: "Do you also have",
    suggestion: "Based on your symptoms, here are some suggestions:",
    disclaimer: "This is not a medical diagnosis. Please consult a doctor for proper treatment."
  },
  pa: {
    title: 'ਰੂਰਲ ਹੈਲਥ ਕਨੇਕਟ',
    step: 'ਕਦਮ',
    of: 'ਦੇ',
    typeMessage: 'ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ...',
    commonSymptoms: 'ਆਮ ਲੱਛਣ',
    send: 'ਭੇਜੋ',
    recording: 'ਰਿਕਾਰਡ ਕਰ ਰਿਹਾ ਹੈ...',
    tapToStop: 'ਰੋਕਣ ਲਈ ਦਬਾਓ',
    consultDoctor: 'ਹੁਣੇ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ',
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਸਿਹਤ ਬਾਰੇ ਜਾਣਕਾਰੀ ਲੈਣਾ ਚਾਹੁੰਦਾ ਹਾਂ। ਤੁਸੀਂ ਕਿਸ ਤਰ੍ਹਾਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?",
    durationQuestion: "ਇਹ ਸਮੱਸਿਆ ਤੁਹਾਨੂੰ ਕਿੰਨੇ ਦਿਨ ਤੋਂ ਹੈ?",
    severityQuestion: "ਕੀ ਦਰਦ ਜ਼ਿਆਦਾ ਹੈ ਜਾਂ ਹਲਕਾ?",
    relatedQuestion: "ਕੀ ਤੁਹਾਨੂੰ",
    suggestion: "ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ ਤੇ, ਇਹ ਸੁਝਾਅ ਹਨ:",
    disclaimer: "ਇਹ ਮੈਡੀਕਲ ਡਾਇਗਨੋਸਿਸ ਨਹੀਂ ਹੈ। ਸਹੀ ਇਲਾਜ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।"
  },
  hi: {
    title: 'रूरल हेल्थकनेक्ट',
    step: 'चरण',
    of: 'का',
    typeMessage: 'अपना संदेश लिखें...',
    commonSymptoms: 'सामान्य लक्षण',
    send: 'भेजें',
    recording: 'रिकॉर्ड कर रहे हैं...',
    tapToStop: 'रोकने के लिए दबाएं',
    consultDoctor: 'अभी डॉक्टर से बात करें',
    greeting: "नमस्ते! मैं आपकी स्वास्थ्य समस्या को समझना चाहता हूं। कृपया बताएं कि आप कैसा महसूस कर रहे हैं?",
    durationQuestion: "यह समस्या आपको कितने दिनों से है?",
    severityQuestion: "क्या दर्द तेज है या हल्का?",
    relatedQuestion: "क्या आपको",
    suggestion: "आपके लक्षणों के आधार पर, ये सुझाव हैं:",
    disclaimer: "यह चिकित्सा निदान नहीं है। उचित उपचार के लिए डॉक्टर से सलाह लें।"
  }
};

const commonSymptoms = {
  en: [
    'Fever', 'Cough', 'Headache', 'Body Pain', 'Stomach Pain', 
    'Rash', 'Eye Problem', 'Ear Problem', 'Cold', 'Sore Throat'
  ],
  pa: [
    'ਬੁਖਾਰ', 'ਖੰਘ', 'ਸਿਰ ਦਰਦ', 'ਸਰੀਰ ਦਰਦ', 'ਪੇਟ ਦਰਦ',
    'ਫਫੋਲੇ', 'ਅੱਖ ਦੀ ਸਮੱਸਿਆ', 'ਕੰਨ ਦੀ ਸਮੱਸਿਆ', 'ਜ਼ੁਕਾਮ', 'ਗਲੇ ਵਿੱਚ ਦਰਦ'
  ],
  hi: [
    'बुखार', 'खांसी', 'सिरदर्द', 'शरीर दर्द', 'पेट दर्द',
    'रैश', 'आंख की समस्या', 'कान की समस्या', 'सर्दी', 'गले में दर्द'
  ]
};

const durationOptions = {
  en: ['Today', '2-3 days', '1 week+'],
  pa: ['ਅੱਜ', '2-3 ਦਿਨ', '1 ਹਫ਼ਤਾ+'],
  hi: ['आज', '2-3 दिन', '1 सप्ताह+']
};

const severityOptions = {
  en: ['Mild', 'Moderate', 'Severe'],
  pa: ['ਹਲਕਾ', 'ਦਰਮਿਆਨਾ', 'ਤੇਜ਼'],
  hi: ['हल्का', 'मध्यम', 'तेज']
};

export function ChatSymptomChecker({ language, onBack, onNavigate }: ChatSymptomCheckerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [conversationState, setConversationState] = useState<'greeting' | 'symptom' | 'duration' | 'severity' | 'related' | 'suggestion'>('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const [collectedData, setCollectedData] = useState<{
    symptoms: string[];
    duration: string;
    severity: string;
    relatedSymptoms: string[];
  }>({
    symptoms: [],
    duration: '',
    severity: '',
    relatedSymptoms: []
  });
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language as keyof typeof translations] || translations.en;
  const symptoms = commonSymptoms[language as keyof typeof commonSymptoms] || commonSymptoms.en;

  useEffect(() => {
    // Initial greeting message
    if (messages.length === 0) {
      addAIMessage(t.greeting);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addAIMessage = (content: string, delay: number = 0) => {
    if (delay > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const newMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        
        // Auto-play voice message if voice mode is enabled
        if (voiceMode) {
          playTextToSpeech(content);
        }
      }, delay);
    } else {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Auto-play voice message if voice mode is enabled
      if (voiceMode) {
        playTextToSpeech(content);
      }
    }
  };

  const playTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on current language setting
      switch (language) {
        case 'pa':
          utterance.lang = 'pa-IN';
          break;
        case 'hi':
          utterance.lang = 'hi-IN';
          break;
        default:
          utterance.lang = 'en-IN';
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const addUserMessage = (content: string, mediaType?: 'photo' | 'video') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      mediaType
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    addUserMessage(text);
    setInputText('');
    
    // Process the message based on current conversation state
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processUserResponse(text);
    }, 1500);
  };

  const processUserResponse = (response: string) => {
    switch (conversationState) {
      case 'greeting':
        // User described their symptom
        const updatedSymptoms = [...collectedData.symptoms, response];
        setCollectedData(prev => ({ ...prev, symptoms: updatedSymptoms }));
        setCurrentStep(2);
        setConversationState('duration');
        addAIMessage(t.durationQuestion, 1000);
        break;
        
      case 'duration':
        setCollectedData(prev => ({ ...prev, duration: response }));
        setCurrentStep(3);
        setConversationState('severity');
        addAIMessage(t.severityQuestion, 1000);
        break;
        
      case 'severity':
        setCollectedData(prev => ({ ...prev, severity: response }));
        setCurrentStep(4);
        setConversationState('related');
        askRelatedSymptom();
        break;
        
      case 'related':
        const relatedSymptoms = [...collectedData.relatedSymptoms, response];
        setCollectedData(prev => ({ ...prev, relatedSymptoms }));
        setCurrentStep(5);
        setConversationState('suggestion');
        provideSuggestion();
        break;
    }
  };

  const askRelatedSymptom = () => {
    const primarySymptom = collectedData.symptoms[0]?.toLowerCase();
    let relatedQuestions: { [key: string]: string } = {};
    
    if (language === 'pa') {
      relatedQuestions = {
        'fever': 'ਕੀ ਤੁਹਾਨੂੰ ਖੰਘ ਵੀ ਹੈ?',
        'cough': 'ਕੀ ਤੁਹਾਨੂੰ ਬੁਖਾਰ ਵੀ ਹੈ?',
        'headache': 'ਕੀ ਤੁਹਾਨੂੰ ਮਤਲੀ ਵੀ ਹੈ?'
      };
    } else if (language === 'hi') {
      relatedQuestions = {
        'fever': 'क्या आपको खांसी भी है?',
        'cough': 'क्या आपको बुखार भी है?',
        'headache': 'क्या आपको मतली भी है?'
      };
    } else {
      relatedQuestions = {
        'fever': 'Do you also have a cough?',
        'cough': 'Do you also have fever?',
        'headache': 'Do you also have nausea?'
      };
    }
    
    const question = relatedQuestions[primarySymptom] || `${t.relatedQuestion} any other symptoms?`;
    addAIMessage(question, 1000);
  };

  const provideSuggestion = () => {
    let suggestion = '';
    let severity = 'low';
    
    if (language === 'pa') {
      if (collectedData.symptoms.some(s => s.toLowerCase().includes('fever') || s.includes('ਬੁਖਾਰ'))) {
        suggestion = "• ਨਿੱਘਾ ਪਾਣੀ ਪੀਓ\n• ਆਰਾਮ ਕਰੋ\n• ਜੇ ਬੁਖਾਰ ਵੱਧੇ ਤਾਂ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ";
        severity = 'medium';
      } else {
        suggestion = "• ਪਾਣੀ ਜ਼ਿਆਦਾ ਪੀਓ\n• ਆਰਾਮ ਕਰੋ\n• ਜੇ ਸਮੱਸਿਆ ਬਣੀ ਰਹੇ ਤਾਂ ਡਾਕਟਰ ਨਾਲ ਮਿਲੋ";
      }
    } else if (language === 'hi') {
      if (collectedData.symptoms.some(s => s.toLowerCase().includes('fever') || s.includes('बुखार'))) {
        suggestion = "• गर्म पानी पिएं\n• आराम करें\n• अगर बुखार बढ़े तो डॉक्टर से मिलें";
        severity = 'medium';
      } else {
        suggestion = "• पानी ज्यादा पिएं\n• आराम करें\n• समस्या बनी रहे तो डॉक्टर से मिलें";
      }
    } else {
      if (collectedData.symptoms.some(s => s.toLowerCase().includes('fever'))) {
        suggestion = "• Drink warm water\n• Take rest\n• If fever increases, consult doctor immediately";
        severity = 'medium';
      } else {
        suggestion = "• Stay hydrated\n• Get proper rest\n• Consult doctor if symptoms persist";
      }
    }
    
    addAIMessage(t.suggestion, 1000);
    setTimeout(() => addAIMessage(suggestion), 2000);
    setTimeout(() => addAIMessage(t.disclaimer), 3500);
  };

  const handleSymptomClick = (symptom: string) => {
    handleSendMessage(symptom);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const handleMediaUpload = (type: 'photo' | 'video') => {
    // Media upload logic would go here
    addUserMessage(`📷 ${type === 'photo' ? 'Photo' : 'Video'} uploaded`, type);
    
    setTimeout(() => {
      if (type === 'photo') {
        addAIMessage(language === 'pa' ? "ਫੋਟੋ ਮਿਲ ਗਈ। ਕੀ ਤੁਸੀਂ ਇਸ ਬਾਰੇ ਹੋਰ ਦੱਸ ਸਕਦੇ ਹੋ?" : 
                    language === 'hi' ? "फोटो मिल गई। क्या आप इसके बारे में और बता सकते हैं?" :
                    "Photo received. Can you tell me more about this?");
      }
    }, 1000);
  };

  const showQuickReplies = () => {
    if (conversationState === 'duration') {
      return durationOptions[language as keyof typeof durationOptions] || durationOptions.en;
    } else if (conversationState === 'severity') {
      return severityOptions[language as keyof typeof severityOptions] || severityOptions.en;
    } else if (conversationState === 'related') {
      return [language === 'pa' ? 'ਹਾਂ' : language === 'hi' ? 'हाँ' : 'Yes', 
              language === 'pa' ? 'ਨਹੀਂ' : language === 'hi' ? 'नहीं' : 'No'];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg">{t.title}</h1>
            <p className="text-sm text-primary-foreground/80">
              {t.step} {currentStep} {t.of} 5
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVoiceMode(!voiceMode)}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-lg mb-1">
                    🤖
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'ai'
                      ? 'bg-primary text-primary-foreground rounded-bl-md'
                      : 'bg-secondary text-secondary-foreground rounded-br-md'
                  }`}
                >
                  {message.mediaType && (
                    <div className="mb-2">
                      {message.mediaType === 'photo' ? '📷' : '🎥'} {message.content}
                    </div>
                  )}
                  {!message.mediaType && (
                    <p className="whitespace-pre-line">{message.content}</p>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-lg mb-1">
                    👤
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}
            
            {/* Quick Reply Buttons */}
            {showQuickReplies().length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {showQuickReplies().map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(reply)}
                    className="rounded-full"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
        </ScrollArea>

        {/* Consultation Button */}
        {conversationState === 'suggestion' && (
          <div className="px-6 py-2">
            <Button 
              onClick={() => onNavigate('doctor')}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              {t.consultDoctor}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Common Symptoms */}
        {conversationState === 'greeting' && (
          <div className="px-6 py-4 border-t border-border">
            <h3 className="text-sm mb-3 text-muted-foreground">{t.commonSymptoms}</h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <Button
                  key={symptom}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSymptomClick(symptom)}
                  className="rounded-full text-sm"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-input-background border border-border rounded-full px-4 py-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isRecording ? t.recording : t.typeMessage}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isRecording}
              />
            </div>
            
            {/* Media Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMediaUpload('photo')}
              className="rounded-full h-10 w-10 p-0"
            >
              <Camera className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMediaUpload('video')}
              className="rounded-full h-10 w-10 p-0"
            >
              <Video className="h-5 w-5" />
            </Button>
            
            {/* Voice Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceToggle}
              className={`rounded-full h-10 w-10 p-0 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            {/* Send Button */}
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isRecording}
              className="rounded-full h-10 w-10 p-0 bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}