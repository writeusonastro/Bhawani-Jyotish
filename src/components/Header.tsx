import React from 'react';
import { Phone, MessageCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'hi' | 'gu';
  setLang: (l: 'hi' | 'gu') => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenBooking,
}) => {
  const navItems = [
    { id: 'rashifal', labelHi: 'दैनिक राशिफल', labelGu: 'દૈનિક રાશિફળ' },
    { id: 'kundli', labelHi: 'जन्म कुंडली', labelGu: 'જન્મ કુંડળી' },
    { id: 'gun-milan', labelHi: 'विवाह गुण मिलान', labelGu: 'લગ્ન ગુણ મિલાન' },
    { id: 'services', labelHi: 'विशेष सेवाएं', labelGu: 'વિશેષ સેવાઓ' },
    { id: 'panchang', labelHi: 'पंचांग व मुहूर्त', labelGu: 'પંચાંગ અને મુહૂર્ત' },
    { id: 'dosh-guide', labelHi: 'दोष निवारण', labelGu: 'દોષ નિવારણ' },
    { id: 'ask-astrologer', labelHi: 'ज्योतिषी से पूछें (AI)', labelGu: 'જ્યોતિષીને પૂછો' },
    { id: 'contact', labelHi: 'संपर्क व पता', labelGu: 'સંપર્ક અને સરનામું' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-[#FF671F]/20">
      {/* Top sacred emergency & contact strip */}
      <div className="bg-gradient-to-r from-[#CC5218] via-[#FF671F] to-[#CC5218] text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
              🚩 ॐ श्री भवान्यै नमः
            </span>
            <span className="hidden sm:inline">
              {lang === 'hi' ? 'वैदिक ज्योतिष एवं संपूर्ण समाधान केंद्र - मेहसाणा, गुजरात' : 'વૈદિક જ્યોતિષ અને સંપૂર્ણ સમાધાન કેન્દ્ર - મહેસાણા, ગુજરાત'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="hidden md:flex items-center gap-1 opacity-90">
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रातः 8:00 - रात्रि 8:00' : 'સવારે 8:00 - રાત્રે 8:00'}</span>
            </div>
            
            <a 
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="flex items-center gap-1 font-bold hover:text-amber-200 transition-colors bg-black/15 px-2 py-0.5 rounded"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{ASTROLOGER_INFO.phonePrimary}</span>
            </a>

            {/* Language toggle */}
            <div className="flex items-center bg-black/25 rounded-md p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded ${lang === 'hi' ? 'bg-white text-[#CC5218] font-bold' : 'text-white/80 hover:text-white'}`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLang('gu')}
                className={`px-2 py-0.5 rounded ${lang === 'gu' ? 'bg-white text-[#CC5218] font-bold' : 'text-white/80 hover:text-white'}`}
              >
                ગુજરાતી
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Brand identity matching user specification */}
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] flex items-center justify-center text-white shadow-lg shadow-[#FF671F]/30 group-hover:scale-105 transition-transform border border-amber-300">
            <span className="text-2xl font-bold font-yatra">ॐ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-yatra text-2xl sm:text-3xl text-[#CC5218] tracking-wide">
                भवानी ज्योतिष
              </h1>
              <span className="text-xs bg-[#FFF5F0] text-[#CC5218] border border-[#FF671F]/30 px-2 py-0.5 rounded-full font-semibold">
                मेहसाणा (गुजरात)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#665448] font-medium">
              {lang === 'hi' ? 'सटीक ज्योतिषीय समाधान एवं वैदिक मार्गदर्शन' : 'સચોટ જ્યોતિષીય સમાધાન અને વૈદિક માર્ગદર્શન'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-center md:justify-end">
          <button
            type="button"
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 bg-[#FFF5F0] hover:bg-[#FFEAE0] text-[#CC5218] border border-[#FF671F]/40 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#FF671F]" />
            <span>{lang === 'hi' ? 'परामर्श बुक करें' : 'પરામર્શ બુક કરો'}</span>
          </button>

          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('प्रणाम पंडित जी! मुझे भवानी ज्योतिष केंद्र, मेहसाणा से ज्योतिषीय परामर्श प्राप्त करना है।')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>व्हाट्सएप</span>
          </a>

          <a
            href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
            className="flex items-center gap-1.5 bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-[#FF671F]/30"
          >
            <Phone className="w-4 h-4" />
            <span>{lang === 'hi' ? 'कॉल करें' : 'કોલ કરો'}</span>
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-[#FFFDF9] border-t border-[#FF671F]/15 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1 sm:py-1.5 whitespace-nowrap min-w-max">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'home'
                ? 'bg-[#FF671F] text-white shadow-sm'
                : 'text-[#5C4A3E] hover:text-[#CC5218] hover:bg-[#FFF5F0]'
            }`}
          >
            {lang === 'hi' ? '🏠 मुख्य पृष्ठ' : '🏠 મુખપૃષ્ઠ'}
          </button>
          
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-[#FF671F] text-white shadow-sm'
                  : 'text-[#5C4A3E] hover:text-[#CC5218] hover:bg-[#FFF5F0]'
              }`}
            >
              {lang === 'hi' ? item.labelHi : item.labelGu}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
