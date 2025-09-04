import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Download, Calendar, FileText, Pill } from 'lucide-react';

interface HealthRecordsProps {
  language: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: 'Health Records',
    lastCheckup: 'Last Checkup',
    prescriptions: 'Prescriptions',
    reports: 'Medical Reports',
    downloadPdf: 'Download PDF',
    noRecords: 'No records available',
    viewDetails: 'View Details',
    date: 'Date',
    doctor: 'Doctor'
  },
  pa: {
    title: 'ਸਿਹਤ ਰਿਕਾਰਡ',
    lastCheckup: 'ਆਖਰੀ ਜਾਂਚ',
    prescriptions: 'ਨੁਸਖੇ',
    reports: 'ਮੈਡੀਕਲ ਰਿਪੋਰਟਾਂ',
    downloadPdf: 'PDF ਡਾਊਨਲੋਡ ਕਰੋ',
    noRecords: 'ਕੋਈ ਰਿਕਾਰਡ ਉਪਲਬਧ ਨਹੀਂ',
    viewDetails: 'ਵੇਰਵੇ ਵੇਖੋ',
    date: 'ਤਾਰੀਖ',
    doctor: 'ਡਾਕਟਰ'
  },
  hi: {
    title: 'स्वास्थ्य रिकॉर्ड',
    lastCheckup: 'अंतिम जांच',
    prescriptions: 'नुस्खे',
    reports: 'मेडिकल रिपोर्ट',
    downloadPdf: 'PDF डाउनलोड करें',
    noRecords: 'कोई रिकॉर्ड उपलब्ध नहीं',
    viewDetails: 'विवरण देखें',
    date: 'तारीख',
    doctor: 'डॉक्टर'
  }
};

const healthRecords = [
  {
    id: 1,
    type: 'checkup',
    title: 'General Health Checkup',
    titlepa: 'ਜਨਰਲ ਹੈਲਥ ਚੈਕਅਪ',
    titlehi: 'सामान्य स्वास्थ्य जांच',
    date: '2024-01-15',
    doctor: 'Dr. Harpreet Singh',
    doctorpa: 'ਡਾ. ਹਰਪ੍ਰੀਤ ਸਿੰਘ',
    doctorhi: 'डॉ. हरप्रीत सिंह',
    summary: 'Blood pressure and diabetes check - Normal',
    summarypa: 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਅਤੇ ਸ਼ੂਗਰ ਦੀ ਜਾਂਚ - ਸਾਧਾਰਨ',
    summaryhi: 'रक्तचाप और मधुमेह जांच - सामान्य'
  },
  {
    id: 2,
    type: 'prescription',
    title: 'Flu Treatment',
    titlepa: 'ਫਲੂ ਦਾ ਇਲਾਜ',
    titlehi: 'फ्लू का इलाज',
    date: '2024-01-10',
    doctor: 'Dr. Simran Kaur',
    doctorpa: 'ਡਾ. ਸਿਮਰਨ ਕੌਰ',
    doctorhi: 'डॉ. सिमरन कौर',
    summary: 'Paracetamol 500mg - 3 times daily for 5 days',
    summarypa: 'ਪੈਰਾਸੀਟਾਮੋਲ 500mg - ਦਿਨ ਵਿੱਚ 3 ਵਾਰ, 5 ਦਿਨ ਲਈ',
    summaryhi: 'पैरासिटामोल 500mg - दिन में 3 बार, 5 दिनों के लिए'
  },
  {
    id: 3,
    type: 'report',
    title: 'Blood Test Report',
    titlepa: 'ਖੂਨ ਦੀ ਜਾਂਚ ਰਿਪੋਰਟ',
    titlehi: 'ब्लड टेस्ट रिपोर्ट',
    date: '2024-01-05',
    doctor: 'Dr. Rajesh Kumar',
    doctorpa: 'ਡਾ. ਰਾਜੇਸ਼ ਕੁਮਾਰ',
    doctorhi: 'डॉ. राजेश कुमार',
    summary: 'Complete Blood Count - All parameters normal',
    summarypa: 'ਪੂਰੀ ਖੂਨ ਗਿਣਤੀ - ਸਾਰੇ ਪੈਰਾਮੀਟਰ ਸਾਧਾਰਨ',
    summaryhi: 'संपूर्ण रक्त गणना - सभी पैरामीटर सामान्य'
  }
];

export function HealthRecords({ language, onBack }: HealthRecordsProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'checkup': return <Calendar className="h-6 w-6" />;
      case 'prescription': return <Pill className="h-6 w-6" />;
      case 'report': return <FileText className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  const getRecordTitle = (record: any) => {
    switch (language) {
      case 'pa': return record.titlepa;
      case 'hi': return record.titlehi;
      default: return record.title;
    }
  };

  const getRecordDoctor = (record: any) => {
    switch (language) {
      case 'pa': return record.doctorpa;
      case 'hi': return record.doctorhi;
      default: return record.doctor;
    }
  };

  const getRecordSummary = (record: any) => {
    switch (language) {
      case 'pa': return record.summarypa;
      case 'hi': return record.summaryhi;
      default: return record.summary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    if (language === 'hi') {
      return date.toLocaleDateString('hi-IN', options);
    } else if (language === 'pa') {
      return date.toLocaleDateString('pa-IN', options);
    } else {
      return date.toLocaleDateString('en-US', options);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl">{t.title}</h1>
      </div>

      {/* Records List */}
      <div className="px-6 py-6 space-y-4">
        {healthRecords.length > 0 ? (
          healthRecords.map((record) => (
            <Card key={record.id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Record Icon */}
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  {getRecordIcon(record.type)}
                </div>
                
                {/* Record Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl mb-1">{getRecordTitle(record)}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{t.date}: {formatDate(record.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>👨‍⚕️</span>
                          <span>{t.doctor}: {getRecordDoctor(record)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-base mb-4 text-foreground">
                    {getRecordSummary(record)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      {t.viewDetails}
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Download className="h-4 w-4 mr-2" />
                      {t.downloadPdf}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl text-muted-foreground">{t.noRecords}</p>
          </Card>
        )}
      </div>
    </div>
  );
}