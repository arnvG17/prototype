import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Phone, MapPin, Clock } from 'lucide-react';

interface PharmacyFinderProps {
  language: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: 'Find Medicines',
    searchPlaceholder: 'Search medicine name...',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    limitedStock: 'Limited Stock',
    callPharmacy: 'Call Pharmacy',
    distance: 'away',
    openNow: 'Open Now',
    closedNow: 'Closed',
    opensAt: 'Opens at'
  },
  pa: {
    title: 'ਦਵਾਈ ਲੱਭੋ',
    searchPlaceholder: 'ਦਵਾਈ ਦਾ ਨਾਮ ਖੋਜੋ...',
    inStock: 'ਸਟਾਕ ਵਿੱਚ',
    outOfStock: 'ਸਟਾਕ ਨਹੀਂ',
    limitedStock: 'ਸੀਮਤ ਸਟਾਕ',
    callPharmacy: 'ਫਾਰਮੇਸੀ ਨੂੰ ਕਾਲ ਕਰੋ',
    distance: 'ਦੂਰ',
    openNow: 'ਹੁਣ ਖੁੱਲ੍ਹਾ',
    closedNow: 'ਬੰਦ',
    opensAt: 'ਖੁੱਲ੍ਹਣ ਦਾ ਸਮਾਂ'
  },
  hi: {
    title: 'दवा खोजें',
    searchPlaceholder: 'दवा का नाम खोजें...',
    inStock: 'स्टॉक में',
    outOfStock: 'स्टॉक नहीं',
    limitedStock: 'सीमित स्टॉक',
    callPharmacy: 'फार्मेसी को कॉल करें',
    distance: 'दूर',
    openNow: 'अभी खुला',
    closedNow: 'बंद',
    opensAt: 'खुलने का समय'
  }
};

const pharmacies = [
  {
    id: 1,
    name: 'City Medical Store',
    namepa: 'ਸਿਟੀ ਮੈਡੀਕਲ ਸਟੋਰ',
    namehi: 'सिटी मेडिकल स्टोर',
    distance: '0.5 km',
    phone: '+91 98765 43210',
    status: 'open',
    openTime: '24/7',
    availability: 'in-stock',
    address: 'Main Market, Nabha',
    addresspa: 'ਮੇਨ ਮਾਰਕੀਟ, ਨਾਭਾ',
    addresshi: 'मुख्य बाजार, नाभा'
  },
  {
    id: 2,
    name: 'Health Plus Pharmacy',
    namepa: 'ਹੈਲਥ ਪਲੱਸ ਫਾਰਮੇਸੀ',
    namehi: 'हेल्थ प्लस फार्मेसी',
    distance: '1.2 km',
    phone: '+91 98765 43211',
    status: 'open',
    openTime: '8:00 AM - 10:00 PM',
    availability: 'limited-stock',
    address: 'Hospital Road, Nabha',
    addresspa: 'ਹਸਪਤਾਲ ਰੋਡ, ਨਾਭਾ',
    addresshi: 'अस्पताल रोड, नाभा'
  },
  {
    id: 3,
    name: 'New Life Medical',
    namepa: 'ਨਿਊ ਲਾਈਫ ਮੈਡੀਕਲ',
    namehi: 'न्यू लाइफ मेडिकल',
    distance: '2.1 km',
    phone: '+91 98765 43212',
    status: 'closed',
    openTime: 'Opens at 9:00 AM',
    availability: 'out-of-stock',
    address: 'Civil Lines, Nabha',
    addresspa: 'ਸਿਵਿਲ ਲਾਈਨਜ਼, ਨਾਭਾ',
    addresshi: 'सिविल लाइन्स, नाभा'
  }
];

export function PharmacyFinder({ language, onBack }: PharmacyFinderProps) {
  const [searchQuery, setSearchQuery] = useState('Paracetamol');
  const t = translations[language as keyof typeof translations] || translations.en;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'bg-green-500';
      case 'limited-stock': return 'bg-yellow-500';
      case 'out-of-stock': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock': return t.inStock;
      case 'limited-stock': return t.limitedStock;
      case 'out-of-stock': return t.outOfStock;
      default: return availability;
    }
  };

  const getPharmacyName = (pharmacy: any) => {
    switch (language) {
      case 'pa': return pharmacy.namepa;
      case 'hi': return pharmacy.namehi;
      default: return pharmacy.name;
    }
  };

  const getPharmacyAddress = (pharmacy: any) => {
    switch (language) {
      case 'pa': return pharmacy.addresspa;
      case 'hi': return pharmacy.addresshi;
      default: return pharmacy.address;
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

      {/* Search */}
      <div className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg border-2"
          />
        </div>
      </div>

      {/* Results */}
      <div className="px-6 pb-6 space-y-4">
        <div className="text-lg mb-4">
          {searchQuery && `Results for "${searchQuery}"`}
        </div>

        {pharmacies.map((pharmacy) => (
          <Card key={pharmacy.id} className="p-6">
            <div className="flex items-start gap-4">
              {/* Pharmacy Icon */}
              <div className="text-4xl">🏪</div>
              
              {/* Pharmacy Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl mb-1">{getPharmacyName(pharmacy)}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{getPharmacyAddress(pharmacy)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{pharmacy.distance} {t.distance}</p>
                  </div>
                  
                  <Badge className={`${getAvailabilityColor(pharmacy.availability)} text-white`}>
                    {getAvailabilityText(pharmacy.availability)}
                  </Badge>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={`text-sm ${pharmacy.status === 'open' ? 'text-green-600' : 'text-red-600'}`}>
                    {pharmacy.status === 'open' ? (
                      pharmacy.openTime === '24/7' ? '24/7' : t.openNow
                    ) : (
                      `${t.opensAt} ${pharmacy.openTime.split(' ').slice(-2).join(' ')}`
                    )}
                  </span>
                </div>

                {/* Call Button */}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={pharmacy.availability === 'out-of-stock'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t.callPharmacy}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}