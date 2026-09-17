import React from 'react';
import { 
  Phone, MessageCircle, Instagram, Facebook, QrCode, 
  Sparkles, ScrollText, HeartHandshake, ShieldAlert, 
  Briefcase, Users, Compass, Gem, Flame, Star 
} from 'lucide-react';
import { ASTROLOGER_INFO, ASTRO_SERVICES, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { AnimatedLogo } from './AnimatedLogo';
import { VerifiedBadge } from './VerifiedBadge';
import { RajputSymbol } from './RajputSymbol';
import { Language } from '../types/astrology';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'kundli-analysis': ScrollText,
  'gun-milan': HeartHandshake,
  'dosh-nivaran': ShieldAlert,
  'career-business': Briefcase,
  'love-marriage': Users,
  'vastu-shastra': Compass,
  'gemstone-rudraksha': Gem,
  'navgraha-puja': Flame,
};

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onOpenPaymentQR?: () => void;
  onPrefetchTab?: (id: string) => void;
  onOpenLogoStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenPaymentQR,
  onPrefetchTab,
  onOpenLogoStudio,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollPos > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'rashifal', labelHi: 'दैनिक राशिफल', labelGu: 'દૈનિક રાશિફળ', labelEn: 'Horoscope' },
    { id: 'kundli', labelHi: 'जन्म कुंडली', labelGu: 'જન્મ કુંડળી', labelEn: 'Janam Kundli' },
    { id: 'gun-milan', labelHi: 'विवाह गुण मिलान', labelGu: 'લગ્ન ગુણ મિલાન', labelEn: 'Gun Milan' },
    { id: 'gemstones', labelHi: '💎 लकी रत्न व रुद्राक्ष', labelGu: '💎 રત્ન અને રુદ્રાક્ષ', labelEn: '💎 Gemstones' },
    { id: 'panchang', labelHi: 'पंचांग व मुहूर्त', labelGu: 'પંચાંગ અને મુહૂર્ત', labelEn: 'Panchang' },
    { id: 'dosh-guide', labelHi: 'दोष निवारण', labelGu: 'દોષ નિવારણ', labelEn: 'Dosha Guide' },
    { id: 'services', labelHi: 'विशेष सेवाएं', labelGu: 'વિશેષ સેવાઓ', labelEn: 'Services' },
    { id: 'city-centers', labelHi: '📍 शहरवार केंद्र', labelGu: '📍 શહેરવાર કેન્દ્રો', labelEn: '📍 City Centers' },
    { id: 'international', labelHi: '🌐 NRI व विदेश सेवा', labelGu: '🌐 NRI સેવાઓ', labelEn: '🌐 Global & NRI' },
    { id: 'ask-astrologer', labelHi: 'ज्योतिषी से पूछें (AI)', labelGu: 'જ્યોતિષીને પૂછો', labelEn: 'Ask AI Astrologer' },
    { id: 'contact', labelHi: 'संपर्क व पता', labelGu: 'સંપર્ક અને સરનામું', labelEn: 'Contact' }
  ];

  const tickerServicesList = React.useMemo(() => [...ASTRO_SERVICES, ...ASTRO_SERVICES], []);

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'kundli-analysis') {
      setActiveTab('kundli');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (serviceId === 'gun-milan') {
      setActiveTab('gun-milan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (serviceId === 'dosh-nivaran') {
      setActiveTab('dosh-guide');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (serviceId === 'gemstone-rudraksha') {
      setActiveTab('gemstones');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (activeTab !== 'home') {
        setActiveTab('home');
      }
      setTimeout(() => {
        const el = document.getElementById('services-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  };

  return (
    <header 
      id="main-fixed-header"
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
      className="sticky top-0 z-50 backdrop-blur-md shadow-lg border-b bg-[#FFFDF8]/98 border-amber-500/30 text-[#2C2420] print:hidden w-full transition-all duration-200"
    >
      {/* Top sacred royal shloka & contact strip */}
      <div className={`bg-gradient-to-r from-[#091528] via-[#14284B] to-[#091528] text-amber-100 text-xs sm:text-sm ${isScrolled ? 'py-1' : 'py-1.5'} px-3 sm:px-4 border-b border-cyan-500/30 transition-all`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 font-medium shrink-0">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-amber-950 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black shadow-xs flex items-center gap-1 border border-amber-500 shrink-0 whitespace-nowrap">
              <Star className="w-3 h-3 text-amber-950 fill-amber-950 shrink-0" />
              <span>
                {lang === 'hi' ? 'सेलिब्रिटी ज्योतिषी' : lang === 'gu' ? 'સેલિબ્રિટી જ્યોતિષી' : 'Celebrity Astro'}
              </span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-[#060D1A]/80 text-cyan-200 border border-cyan-400/40 px-2 sm:px-2.5 py-0.5 rounded-full font-bold shadow-xs shrink-0 whitespace-nowrap">
              <span className="text-amber-300">{lang === 'hi' ? 'पंजी:' : lang === 'gu' ? 'નોંધણી:' : 'Reg:'}</span>
              <span className="font-mono text-cyan-100 font-black tracking-wide">{ASTROLOGER_INFO.registrationNo}</span>
              <VerifiedBadge size="xs" tooltipText={lang === 'hi' ? 'शासकीय पंजीकृत वैदिक संस्थान' : lang === 'gu' ? 'સરકારી પ્રમાણિત વૈદિક સંસ્થા' : 'Govt. Registered Vedic Institute'} />
            </span>
          </div>

          {/* Centered "Maa Majisa Kripa" */}
          <div className="flex-1 flex items-center justify-center text-center px-1 sm:px-3 overflow-hidden min-w-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-200 text-xs sm:text-sm font-semibold truncate tracking-wider">
              <span className="text-amber-400 text-xs shrink-0">✦</span>
              <span className="text-amber-100 font-bold tracking-wide truncate drop-shadow-xs">
                {lang === 'hi' ? 'माँ माजीसा कृपा' : lang === 'gu' ? 'માઁ માજીસા કૃપા' : 'Maa Majisa Kripa'}
              </span>
              <span className="text-amber-400 text-xs shrink-0">✦</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm shrink-0">
            {/* Social Media Links */}
            <div className="hidden lg:flex items-center gap-1.5 border-r border-cyan-400/30 pr-2 shrink-0">
              <a
                href={ASTROLOGER_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Profile"
                className="p-1 rounded hover:bg-white/10 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={ASTROLOGER_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Page"
                className="p-1 rounded hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={ASTROLOGER_INFO.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Channel"
                className="p-1 rounded hover:bg-white/10 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

            <a 
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="hidden sm:flex items-center gap-1 font-bold text-amber-200 hover:text-white transition-colors bg-[#0D2040]/80 border border-cyan-400/40 px-2.5 py-0.5 rounded-md shadow-xs text-[11px] sm:text-xs whitespace-nowrap shrink-0"
              title={`पंडित जी को सीधे कॉल करें: ${ASTROLOGER_INFO.phonePrimary}`}
            >
              <Phone className="w-3 h-3 text-amber-300 animate-pulse shrink-0" />
              <span className="font-mono">{ASTROLOGER_INFO.phonePrimary}</span>
            </a>

            {/* Language toggle */}
            <div className="flex items-center bg-black/50 rounded-lg p-0.5 text-[11px] sm:text-xs font-semibold border border-cyan-400/30 shrink-0 whitespace-nowrap">
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-1.5 sm:px-2 py-0.5 rounded transition-all ${lang === 'hi' ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-black shadow-xs' : 'text-cyan-200/80 hover:text-white'}`}
              >
                हिं
              </button>
              <button
                type="button"
                onClick={() => setLang('gu')}
                className={`px-1.5 sm:px-2 py-0.5 rounded transition-all ${lang === 'gu' ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-black shadow-xs' : 'text-cyan-200/80 hover:text-white'}`}
              >
                ગુજ
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-1.5 sm:px-2 py-0.5 rounded transition-all ${lang === 'en' ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-black shadow-xs' : 'text-cyan-200/80 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Cream / White Scrolling Services Ticker Box (Just beneath the top sacred strip) */}
      <div 
        id="royal-services-ticker-bar"
        className={`bg-gradient-to-r from-[#FCF9F2] via-[#F6EFE2] to-[#FCF9F2] text-stone-800 text-xs ${isScrolled ? 'py-1' : 'py-1.5'} px-2 sm:px-4 border-b border-amber-300/60 shadow-xs overflow-hidden relative transition-all`}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
          {/* Pinned Left Pill Badges matching user's screenshot */}
          <div className="flex items-center gap-1.5 shrink-0 z-10">
            <span className="bg-gradient-to-r from-[#731E05] via-[#8B1E2D] to-[#731E05] text-amber-100 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black shadow-xs flex items-center gap-1 border border-amber-700/60 shrink-0 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
              <span>
                {lang === 'en' ? 'Vedic Services' : lang === 'hi' ? 'समस्त सेवाएं' : 'તમામ સેવાઓ'}
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-white text-[#731E05] border border-amber-300 px-2 sm:px-2.5 py-0.5 rounded-full font-bold shadow-2xs shrink-0 whitespace-nowrap">
              <span>{lang === 'en' ? '8 Sacred Solutions' : lang === 'hi' ? '८ शास्त्रीय समाधान' : '૮ શાસ્ત્રોક્ત ઉપાય'}</span>
            </span>
          </div>

          {/* Warm Golden Divider */}
          <div className="h-4 w-px bg-amber-300/70 shrink-0 hidden sm:block" />

          {/* Smooth Continuous Scrolling Ticker with Left & Right Gradient Mask */}
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14px,black_calc(100%-14px),transparent)]">
            <div className="services-ticker-track flex items-center gap-2 sm:gap-2.5 py-0.5">
              {tickerServicesList.map((srv, idx) => {
                const Icon = SERVICE_ICONS[srv.id] || Sparkles;
                const serviceTitle = lang === 'en' ? srv.titleEn : lang === 'hi' ? srv.titleHi : srv.titleGu;
                return (
                  <button
                    key={`${srv.id}-${idx}`}
                    type="button"
                    onClick={() => handleServiceClick(srv.id)}
                    className="group/item inline-flex items-center gap-1.5 bg-white hover:bg-amber-50/90 border border-amber-200/90 hover:border-amber-500 text-stone-800 hover:text-[#731E05] px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                    title={`${serviceTitle} - क्लिक करें`}
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-[#731E05] flex items-center justify-center shrink-0 group-hover/item:bg-amber-200">
                      <Icon className="w-2.5 h-2.5" />
                    </span>
                    <span>{serviceTitle}</span>
                    <span className="text-amber-500/70 font-bold ml-0.5">✦</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Buttons bar */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-4 ${isScrolled ? 'py-1.5 sm:py-2.5' : 'py-2 sm:py-3.5'} flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3 transition-all duration-200`}>
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer flex items-center gap-2.5 sm:gap-3 group w-full md:w-auto"
        >
          <AnimatedLogo size={isScrolled ? "sm" : "md"} lang={lang} onOpenStudio={onOpenLogoStudio} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="font-yatra text-xl sm:text-3xl text-[#852E10] tracking-wide flex items-center gap-1.5">
                <span>{lang === 'en' ? 'Bhavani Jyotish' : 'भवानी ज्योतिष'}</span>
                <VerifiedBadge size="sm" tooltipText="भवानी ज्योतिष - अधिकृत एवं सत्यापित वैदिक संस्थान" />
              </h1>
              <span className="inline-flex sm:hidden items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold border bg-amber-50/90 border-amber-300 text-[#852E10] shadow-xs whitespace-nowrap">
                <span>पंजी: {ASTROLOGER_INFO.registrationNo}</span>
                <VerifiedBadge size="xs" tooltipText="शासकीय पंजीकृत वैदिक संस्थान" />
              </span>
            </div>
            <p className="text-[11px] sm:text-sm text-stone-900 font-bold tracking-wide truncate">
              {lang === 'en'
                ? ASTROLOGER_INFO.taglineEn
                : lang === 'hi'
                ? ASTROLOGER_INFO.tagline
                : ASTROLOGER_INFO.taglineGu}
            </p>
          </div>
        </div>

        {/* Action Buttons - Perfectly Symmetrical on Mobile (grid 3 cols) and flex on desktop */}
        <div className="grid grid-cols-3 gap-1.5 w-full md:flex md:w-auto md:justify-end">
          {onOpenPaymentQR && (
            <button
              type="button"
              onClick={onOpenPaymentQR}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-2 sm:px-3.5 ${isScrolled ? 'py-1.5' : 'py-2'} rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-purple-900/30 border border-purple-300/50 hover:scale-105 active:scale-95 cursor-pointer text-center`}
              title="PhonePe / UPI QR कोड द्वारा दक्षिणा / परामर्श शुल्क"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className="truncate">{lang === 'en' ? 'QR Pay' : lang === 'hi' ? 'दक्षिणा/QR' : 'દક્ષિણા/QR'}</span>
            </button>
          )}

          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              getWhatsAppConsultationMessage(lang)
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold px-2 sm:px-4 ${isScrolled ? 'py-1.5' : 'py-2'} rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 border border-emerald-400/40 hover:scale-105 active:scale-95 text-center`}
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}</span>
          </a>

          <a
            href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-yatra tracking-wide px-2 sm:px-5 ${isScrolled ? 'py-1.5' : 'py-2'} rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-amber-600/30 border-2 border-amber-300 hover:scale-105 active:scale-95 text-center`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span className="truncate">{lang === 'en' ? 'Call' : lang === 'hi' ? 'कॉल करें' : 'કોલ કરો'}</span>
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t overflow-x-auto no-scrollbar bg-gradient-to-r from-[#FFFDF8] via-[#FAF5EC] to-[#FFFDF8] border-amber-500/25 w-full max-w-full overscroll-x-contain">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center gap-1 py-1.5 whitespace-nowrap min-w-max">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md shadow-amber-600/30 border border-amber-300/70'
                : 'text-stone-900 hover:text-[#852E10] hover:bg-amber-100/60'
            }`}
          >
            {lang === 'en' ? '🏛️ Raj Darbar' : lang === 'hi' ? '🏛️ मुख्य द्वार' : '🏛️ મુખપૃષ્ઠ'}
          </button>
          
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => onPrefetchTab?.(item.id)}
              onTouchStart={() => onPrefetchTab?.(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md shadow-amber-600/30 border border-amber-300/70'
                  : 'text-stone-900 hover:text-[#852E10] hover:bg-amber-100/60'
              }`}
            >
              {lang === 'en' ? item.labelEn : lang === 'hi' ? item.labelHi : item.labelGu}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
