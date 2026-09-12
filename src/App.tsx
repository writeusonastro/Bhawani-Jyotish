import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FloatingActions } from './components/FloatingActions';
import { VerifiedBadge } from './components/VerifiedBadge';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from './data/astrologyData';
import { Language } from './types/astrology';
import { detectInitialLanguage, saveLanguagePreference } from './utils/languageDetector';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Award, Sparkles, CheckCircle2, Mail, Navigation } from 'lucide-react';
import { LazyViewportSection } from './components/LazyViewportSection';

// Dynamic lazy-loaded modules for ultra-fast initial mobile load
const ServicesSection = lazy(() => 
  import('./components/ServicesSection').then(m => ({ default: m.ServicesSection }))
);
const Testimonials = lazy(() => 
  import('./components/Testimonials').then(m => ({ default: m.Testimonials }))
);
const AudioChants = lazy(() => 
  import('./components/AudioChants').then(m => ({ default: m.AudioChants }))
);
const DailyWisdomVastu = lazy(() => 
  import('./components/DailyWisdomVastu').then(m => ({ default: m.DailyWisdomVastu }))
);
const ContactSection = lazy(() => 
  import('./components/ContactSection').then(m => ({ default: m.ContactSection }))
);
const Footer = lazy(() => 
  import('./components/Footer').then(m => ({ default: m.Footer }))
);

const KundliGenerator = lazy(() => 
  import('./components/KundliGenerator').then(m => ({ default: m.KundliGenerator }))
);
const GunMilan = lazy(() => 
  import('./components/GunMilan').then(m => ({ default: m.GunMilan }))
);
const GemstoneRudrakshaFinder = lazy(() => 
  import('./components/GemstoneRudrakshaFinder').then(m => ({ default: m.GemstoneRudrakshaFinder }))
);
const DigitalJapaMala = lazy(() => 
  import('./components/DigitalJapaMala').then(m => ({ default: m.DigitalJapaMala }))
);
const DoshNivaranGuide = lazy(() => 
  import('./components/DoshNivaranGuide').then(m => ({ default: m.DoshNivaranGuide }))
);
const AskAstrologer = lazy(() => 
  import('./components/AskAstrologer').then(m => ({ default: m.AskAstrologer }))
);
const PanchangMuhurat = lazy(() => 
  import('./components/PanchangMuhurat').then(m => ({ default: m.PanchangMuhurat }))
);
const CityLocalSeoSection = lazy(() => 
  import('./components/CityLocalSeoSection').then(m => ({ default: m.CityLocalSeoSection }))
);
const InternationalConsultation = lazy(() => 
  import('./components/InternationalConsultation').then(m => ({ default: m.InternationalConsultation }))
);
const DailyRashifal = lazy(() => 
  import('./components/DailyRashifal').then(m => ({ default: m.DailyRashifal }))
);
const PaymentModal = lazy(() => 
  import('./components/PaymentModal').then(m => ({ default: m.PaymentModal }))
);

// Tab prefetcher on hover/touch for instant 0ms transitions
const prefetchTab = (tab: string) => {
  if (tab === 'kundli') import('./components/KundliGenerator');
  else if (tab === 'gun-milan') import('./components/GunMilan');
  else if (tab === 'gemstones') import('./components/GemstoneRudrakshaFinder');
  else if (tab === 'japa-mala') import('./components/DigitalJapaMala');
  else if (tab === 'dosh-guide') import('./components/DoshNivaranGuide');
  else if (tab === 'ask-astrologer') import('./components/AskAstrologer');
  else if (tab === 'panchang') import('./components/PanchangMuhurat');
  else if (tab === 'city-centers') import('./components/CityLocalSeoSection');
  else if (tab === 'international') import('./components/InternationalConsultation');
  else if (tab === 'rashifal') import('./components/DailyRashifal');
};

const VedicLoadingFallback: React.FC<{ text?: string }> = ({ text = 'वैदिक गणना लोड हो रही है...' }) => (
  <div className="py-24 px-4 flex flex-col items-center justify-center text-center">
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF671F] to-[#CC5218] p-1 shadow-md animate-pulse mb-3">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
        🔱
      </div>
    </div>
    <span className="font-yatra text-base sm:text-lg text-stone-900">{text}</span>
    <span className="text-xs text-stone-700 mt-0.5">Shri Bhavani Jyotish • Instant Computation</span>
  </div>
);

const SectionPlaceholder: React.FC<{ minHeight?: string }> = ({ minHeight = '140px' }) => (
  <div style={{ minHeight }} className="flex items-center justify-center py-6">
    <div className="flex items-center gap-2 text-stone-400 text-xs animate-pulse">
      <span className="text-amber-500 text-sm">🪔</span>
      <span>वैदिक गणना तैयार हो रही है...</span>
    </div>
  </div>
);

export function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const requestedTab = params.get('tab') || params.get('target');
      if (requestedTab) return requestedTab;
      
      const source = params.get('source');
      const country = params.get('country');
      const nri = params.get('nri');
      const campaign = params.get('utm_campaign') || '';
      
      if (
        source === 'abroad' || 
        Boolean(country) || 
        Boolean(nri) || 
        campaign.includes('abroad') || 
        campaign.includes('nri') || 
        campaign.includes('usa') ||
        campaign.includes('uk') ||
        campaign.includes('canada')
      ) {
        return 'international';
      }
    }
    return 'home';
  });

  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'hi' || urlLang === 'gu') {
        return urlLang;
      }
      // If landing from abroad campaign and no saved preference, default to English for abroad audience
      const isAbroad = params.get('source') === 'abroad' || Boolean(params.get('country')) || Boolean(params.get('nri'));
      if (isAbroad && !localStorage.getItem('astro_language_preference')) {
        return 'en';
      }
    }
    return detectInitialLanguage();
  });
  const [askAiQuery, setAskAiQuery] = useState<string | undefined>(undefined);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveLanguagePreference(newLang);
  };

  // Dynamic SEO Title & Meta Description synchronizer for active tab & landing URLs
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const country = params.get('country')?.toLowerCase();

    let title = 'भवानी ज्योतिष | Best Vedic Astrologer for USA, UK, Canada, Australia, UAE, Ahmedabad & Mehsana';
    let desc = 'भवानी ज्योतिष केंद्र (पं. विरेंद्र कुमार जोशी) - 35+ वर्ष प्रतिष्ठित वैदिक ज्योतिष संस्थान। प्रामाणिक जन्म कुंडली, 36 गुण विवाह मिलान, वास्तु शास्त्र एवं विदेश परामर्श।';

    if (country === 'usa' || (activeTab === 'international' && country === 'usa')) {
      title = lang === 'en' 
        ? 'Top Indian Vedic Astrologer in USA (EST, CST, PST) | Bhavani Jyotish' 
        : 'USA में सर्वश्रेष्ठ भारतीय ज्योतिषाचार्य | भवानी ज्योतिष केंद्र (पंडित विरेंद्र कुमार जोशी)';
      desc = 'Authentic Vedic astrology consultation for Indian & Gujarati diaspora across USA (California, New Jersey, Texas, New York, Chicago). Kundli matching, career & marriage guidance.';
    } else if (country === 'uk' || (activeTab === 'international' && country === 'uk')) {
      title = lang === 'en'
        ? 'Best Gujarati Vedic Astrologer in UK (London, Leicester, Wembley) | Bhavani Jyotish'
        : 'UK व लंदन में सर्वश्रेष्ठ गुजराती ज्योतिषाचार्य | भवानी ज्योतिष केंद्र';
      desc = 'Trusted Gujarati Astrologer in UK for London, Leicester, Wembley, Birmingham. Family Kundli matching, Manglik Dosh Nivaran & Business Muhurat.';
    } else if (country === 'canada' || (activeTab === 'international' && country === 'canada')) {
      title = lang === 'en'
        ? 'Indian Vedic Astrologer in Canada (Toronto, Brampton, Vancouver) | Bhavani Jyotish'
        : 'कनाडा (Toronto, Brampton) में सर्वश्रेष्ठ भारतीय ज्योतिषाचार्य | भवानी ज्योतिष';
      desc = 'Vedic horoscope reading, marriage matchmaking, and overseas career guidance for Canadian Indians in Toronto, Brampton, and Vancouver.';
    } else if (country === 'australia' || (activeTab === 'international' && country === 'australia')) {
      title = lang === 'en'
        ? 'Indian Astrologer in Australia (Sydney, Melbourne, Brisbane) | Bhavani Jyotish'
        : 'ऑस्ट्रेलिया में शीर्ष भारतीय ज्योतिषाचार्य (Sydney, Melbourne) | भवानी ज्योतिष';
      desc = 'Online Vedic astrology, 36 Gun Milan & PR settlement horoscope analysis for Indian families in Australia and New Zealand.';
    } else if (country === 'uae' || (activeTab === 'international' && country === 'uae')) {
      title = lang === 'en'
        ? 'Best Vedic Astrologer in Dubai & UAE (Abu Dhabi, Sharjah) | Bhavani Jyotish'
        : 'दुबई व UAE में सर्वश्रेष्ठ भारतीय ज्योतिषाचार्य | भवानी ज्योतिष केंद्र';
      desc = 'Commercial Muhurat, business partnership horoscope reading, and job promotions for NRIs in Dubai, Abu Dhabi, and Gulf.';
    } else if (activeTab === 'international') {
      title = lang === 'en'
        ? 'NRI Vedic Astrology & 36 Gun Milan Portal (USA, UK, Canada, Australia, UAE) | Bhavani Jyotish'
        : 'अंतरराष्ट्रीय प्रवासी भारतीय (NRI) वैदिक ज्योतिष पोर्टल | भवानी ज्योतिष केंद्र';
      desc = 'Worldwide Vedic consultations across all timezones (EST, CST, PST, GMT). Foreign birth Kundli with Daylight Saving Time (DST) correction and WhatsApp appointments.';
    } else if (activeTab === 'gun-milan') {
      title = lang === 'en'
        ? '36 Gun Milan & Kundli Matching for Marriage | Vedic Compatibility Calculator'
        : 'विवाह हेतु 36 गुण मिलान एवं कुंडली मिलान | भवानी ज्योतिष केंद्र';
      desc = 'विवाह हेतु प्रामाणिक अष्टकूट 36 गुण मिलान, नाड़ी दोष, भकूट दोष, गण दोष परिहार एवं दांपत्य सुख का संपूर्ण वैदिक विश्लेषण।';
    } else if (activeTab === 'kundli') {
      title = lang === 'en'
        ? 'Free Online Vedic Janam Kundli Generator with Dasha & Remedies | Bhavani Jyotish'
        : 'सटीक वैदिक जन्म कुंडली चक्र, महादशा एवं ग्रह स्थिति | भवानी ज्योतिष केंद्र';
      desc = 'सटीक लग्न व नवमांश कुंडली चक्र, विंशोत्तरी महादशा, अष्टकवर्ग, राजयोग व ग्रह फलादेश। 100% शास्त्रोक्त गणना।';
    } else if (activeTab === 'panchang') {
      title = lang === 'en'
        ? 'Aaj Ka Panchang, Shubh Muhurat & Choghadiya Today | Bhavani Jyotish'
        : 'आज का पंचांग, चौघड़िया एवं शुभ मुहूर्त | भवानी ज्योतिष केंद्र';
      desc = 'तिथि, वार, नक्षत्र, योग, करण, राहुकाल, अभिजीत मुहूर्त एवं अमृत-शुभ चौघड़िया की सटीक दैनिक गणना।';
    } else if (activeTab === 'dosh-guide') {
      title = lang === 'en'
        ? 'Kaal Sarp, Manglik, Pitra & Sade Sati Dosh Nivaran Guide | Bhavani Jyotish'
        : 'कालसर्प, मांगलिक, पितृ दोष व साढ़ेसाती संपूर्ण निवारण मार्गदर्शिका | भवानी ज्योतिष';
      desc = 'कुंडली के मुख्य दोषों के लक्षण, प्रभाव एवं प्रामाणिक वैदिक सात्विक उपाय व अनुष्ठान विधि।';
    } else if (activeTab === 'gemstones') {
      title = lang === 'en'
        ? 'Lucky Gemstone & Vedic Rudraksha Recommendation by Rashi | Bhavani Jyotish'
        : 'राशि अनुसार भाग्यशाली रत्न एवं रुद्राक्ष चयन परामर्श | भवानी ज्योतिष केंद्र';
      desc = 'अपनी जन्म राशि व लग्न के अनुसार धारण करें शुद्ध अभिमंत्रित रत्न व रुद्राक्ष। जीवन में समृद्धि, आरोग्य व सफलता के लिए।';
    } else if (activeTab === 'rashifal') {
      title = lang === 'en'
        ? 'Daily Rashifal & Horoscope Predictions for 12 Zodiacs | Bhavani Jyotish'
        : 'दैनिक राशिफल (12 राशियां) एवं आज का भविष्यफल | भवानी ज्योतिष केंद्र';
      desc = 'मेष से मीन राशि का दैनिक राशिफल, लकी नंबर, शुभ रंग एवं ज्योतिषीय उपाय।';
    } else if (activeTab === 'contact') {
      title = lang === 'en'
        ? 'Contact Pandit Shri Virendra Kumar Joshi | Direct Consultation Mehsana & Global'
        : 'संपर्क एवं परामर्श - पंडित श्री विरेंद्र कुमार जोशी | भवानी ज्योतिष केंद्र मेहसाणा';
      desc = 'सीधे संपर्क करें: फोन/WhatsApp +91 99090 87902। नागलपुर, मेहसाणा (गुजरात) मुख्य कार्यालय एवं विश्वभर में ऑनलाइन परामर्श।';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
  }, [activeTab, lang]);

  useEffect(() => {
    localStorage.removeItem('astro_dark_theme');
    localStorage.removeItem('theme');
    localStorage.removeItem('color-theme');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
    document.body.style.colorScheme = 'light';

    // Idle-time background prefetching of high-demand tabs after complete initial render
    const idleId = typeof window !== 'undefined' && 'requestIdleCallback' in window
      ? (window as any).requestIdleCallback(() => {
          import('./components/KundliGenerator');
        }, { timeout: 10000 })
      : setTimeout(() => {
          import('./components/KundliGenerator');
        }, 6000);

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  const handleAskAI = (contextQuery: string) => {
    setAskAiQuery(contextQuery);
    setActiveTab('ask-astrologer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-mukta selection:bg-[#FF671F] selection:text-white bg-[#FFFDF9] text-stone-950 overflow-x-hidden w-full max-w-full">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onOpenPaymentQR={() => setIsPaymentModalOpen(true)}
        onPrefetchTab={prefetchTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-24 md:pb-0">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              lang={lang}
              setActiveTab={setActiveTab}
            />

            {/* Sacred Daily Vedic Wisdom & Vastu */}
            <LazyViewportSection minHeight="140px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="140px" />}>
                <DailyWisdomVastu lang={lang} />
              </Suspense>
            </LazyViewportSection>

            {/* Sacred Mantra Drone Audio Player */}
            <LazyViewportSection minHeight="120px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="120px" />}>
                <AudioChants />
              </Suspense>
            </LazyViewportSection>

            {/* Daily Rashifal Overview - Viewport Loaded */}
            <LazyViewportSection minHeight="180px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="180px" />}>
                <DailyRashifal
                  lang={lang}
                  onSelectRashi={() => {}}
                />
              </Suspense>
            </LazyViewportSection>

            {/* Core Services Section */}
            <LazyViewportSection minHeight="280px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="280px" />}>
                <ServicesSection
                  lang={lang}
                  onSelectService={(id) => {
                    if (id === 'kundli') setActiveTab('kundli');
                    else if (id === 'matchmaking') setActiveTab('gun-milan');
                    else if (id === 'dosh') setActiveTab('dosh-guide');
                  }}
                />
              </Suspense>
            </LazyViewportSection>

            {/* Panchang & Muhurat Highlight - Viewport Loaded */}
            <LazyViewportSection minHeight="240px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="240px" />}>
                <PanchangMuhurat lang={lang} />
              </Suspense>
            </LazyViewportSection>

            {/* Astrologer Biography & Authenticity */}
            <div className="py-12 px-4 max-w-7xl mx-auto">
              <div className="rounded-3xl p-6 sm:p-10 border shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-[#FF671F]/25 shadow-[#FF671F]/5 text-stone-950">
                <div className="lg:col-span-4 text-center">
                  <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full bg-gradient-to-br from-[#FF671F] to-[#CC5218] p-1.5 shadow-xl border-4 border-amber-300 relative">
                    <div className="w-full h-full rounded-full bg-[#FFF5F0] flex flex-col items-center justify-center text-[#CC5218] overflow-hidden">
                      <span className="text-6xl mb-1">🔱</span>
                      <span className="font-yatra text-sm font-bold text-center px-2">
                        {lang === 'en' ? ASTROLOGER_INFO.nameEn : lang === 'hi' ? 'पं. विरेंद्र कुमार जोशी' : 'પં. વિરેન્દ્ર કુમાર જોશી'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-yatra text-xl text-[#CC5218] flex items-center justify-center gap-1.5">
                      <span>{lang === 'en' ? ASTROLOGER_INFO.nameEn : lang === 'hi' ? ASTROLOGER_INFO.name : ASTROLOGER_INFO.nameGu}</span>
                      <VerifiedBadge size="sm" tooltipText="पंडित श्री विरेंद्र कुमार जोशी - अधिकृत सत्यापित ज्योतिषाचार्य" />
                    </h3>
                    <p className="text-xs text-stone-950 font-semibold">
                      {lang === 'en' ? ASTROLOGER_INFO.experienceEn : lang === 'hi' ? ASTROLOGER_INFO.experience : ASTROLOGER_INFO.experienceGu} | {lang === 'en' ? ASTROLOGER_INFO.locationEn : lang === 'hi' ? ASTROLOGER_INFO.location : ASTROLOGER_INFO.locationGu}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3 py-1 rounded-full text-xs font-bold border border-[#FF671F]/30">
                    <Award className="w-4 h-4 text-[#FF671F]" />
                    <span>
                      {lang === 'en' ? 'Renowned Vedic Astrologer of North Gujarat' : lang === 'hi' ? 'उत्तर गुजरात के सुप्रसिद्ध ज्योतिषाचार्य' : 'ઉત્તર ગુજરાતના સુપ્રસિદ્ધ જ્યોતિષાચાર્ય'}
                    </span>
                  </div>

                  <h3 className="font-yatra text-2xl sm:text-3xl text-stone-950">
                    {lang === 'en'
                      ? 'Traditional Vedic Wisdom & Authentic Astrological Practice'
                      : lang === 'hi'
                      ? 'परंपरागत वैदिक ज्ञान एवं प्रामाणिक ज्योतिषीय साधना'
                      : 'પરંપરાગત વૈદિક જ્ઞાન અને જ્યોતિષીય સાધના'}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-950 font-medium leading-relaxed">
                    {lang === 'en' ? ASTROLOGER_INFO.aboutEn : lang === 'hi' ? ASTROLOGER_INFO.aboutHi : ASTROLOGER_INFO.aboutGu}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20 text-stone-950">
                      <CheckCircle2 className="w-4 h-4 text-[#FF671F] shrink-0" />
                      <span>
                        {lang === 'en'
                          ? 'Gold Medalist - Maharishi Parashara Jyotish Parishad'
                          : lang === 'hi'
                          ? 'गोल्ड मेडलिस्ट - महर्षि पाराशर ज्योतिष परिषद'
                          : 'ગોલ્ડ મેડલિસ્ટ - મહર્ષિ પારાશર જ્યોતિષ પરિષદ'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20 text-stone-950">
                      <CheckCircle2 className="w-4 h-4 text-[#FF671F] shrink-0" />
                      <span>
                        {lang === 'en'
                          ? '50,000+ Consultations Successfully Guided'
                          : lang === 'hi'
                          ? '50,000+ जातकों का सफल व सटीक मार्गदर्शन'
                          : '50,000+ જાતકોનું સફળ અને સચોટ માર્ગદર્શન'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                      className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Phone className="w-4 h-4" />
                      <span>
                        {lang === 'en' ? 'Speak with Pandit Ji on Phone' : lang === 'hi' ? 'पंडित जी से फोन पर बात करें' : 'પંડિતજી સાથે વાત કરો'}
                      </span>
                    </a>

                    <a
                      href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWhatsAppConsultationMessage(lang))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{lang === 'en' ? 'WhatsApp Message' : 'व्हाट्सएप संदेश'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated International & NRI Consultation Section - Viewport Loaded */}
            <LazyViewportSection minHeight="160px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="160px" />}>
                <InternationalConsultation lang={lang} />
              </Suspense>
            </LazyViewportSection>

            {/* City-Wise Local SEO Centers Section (Mehsana, Ahmedabad, Gandhinagar, Mumbai, USA/UK) - Viewport Loaded */}
            <LazyViewportSection minHeight="200px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="200px" />}>
                <CityLocalSeoSection lang={lang} setActiveTab={setActiveTab} />
              </Suspense>
            </LazyViewportSection>

            {/* Contact & Address Section directly on Home page */}
            <LazyViewportSection minHeight="250px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="250px" />}>
                <ContactSection lang={lang} />
              </Suspense>
            </LazyViewportSection>

            {/* Testimonials */}
            <LazyViewportSection minHeight="250px" rootMargin="350px">
              <Suspense fallback={<SectionPlaceholder minHeight="250px" />}>
                <Testimonials lang={lang} />
              </Suspense>
            </LazyViewportSection>
          </div>
        )}

        {activeTab === 'city-centers' && (
          <div className="py-4">
            <Suspense fallback={<VedicLoadingFallback text="प्रमुख ज्योतिष केंद्र लोड हो रहे हैं..." />}>
              <CityLocalSeoSection lang={lang} setActiveTab={setActiveTab} />
            </Suspense>
          </div>
        )}

        {activeTab === 'international' && (
          <div className="py-4">
            <Suspense fallback={<VedicLoadingFallback text="International & NRI Astrology Portal..." />}>
              <InternationalConsultation lang={lang} />
            </Suspense>
          </div>
        )}

        {activeTab === 'kundli' && (
          <Suspense fallback={<VedicLoadingFallback text="प्रामाणिक वैदिक जन्म कुंडली चक्र निर्मित हो रहा है..." />}>
            <KundliGenerator 
              lang={lang} 
              onAskAI={handleAskAI} 
              onOpenPaymentQR={() => setIsPaymentModalOpen(true)} 
            />
          </Suspense>
        )}

        {activeTab === 'gun-milan' && (
          <Suspense fallback={<VedicLoadingFallback text="अष्टकूट 36 गुण मिलान गणना लोड हो रही है..." />}>
            <GunMilan lang={lang} />
          </Suspense>
        )}

        {activeTab === 'gemstones' && (
          <Suspense fallback={<VedicLoadingFallback text="रत्न एवं रुद्राक्ष मार्गदर्शिका लोड हो रही है..." />}>
            <GemstoneRudrakshaFinder lang={lang} />
          </Suspense>
        )}

        {activeTab === 'japa-mala' && (
          <Suspense fallback={<VedicLoadingFallback text="पवित्र डिजिटल जप माला लोड हो रही है..." />}>
            <DigitalJapaMala lang={lang} />
          </Suspense>
        )}

        {activeTab === 'daily-wisdom' && (
          <div className="py-8">
            <Suspense fallback={<VedicLoadingFallback text="दैनिक सुविचार एवं वास्तु लोड हो रहा है..." />}>
              <DailyWisdomVastu lang={lang} />
            </Suspense>
          </div>
        )}

        {activeTab === 'rashifal' && (
          <Suspense fallback={<VedicLoadingFallback text="दैनिक राशिफल लोड हो रहा है..." />}>
            <DailyRashifal
              lang={lang}
              onSelectRashi={() => {}}
            />
          </Suspense>
        )}

        {activeTab === 'dosh-guide' && (
          <Suspense fallback={<VedicLoadingFallback text="शास्त्रीय दोष व वैदिक रक्षा मार्गदर्शिका लोड हो रही है..." />}>
            <DoshNivaranGuide lang={lang} />
          </Suspense>
        )}

        {activeTab === 'panchang' && (
          <Suspense fallback={<VedicLoadingFallback text="दैनिक वैदिक पंचांग एवं शुभ मुहूर्त लोड हो रहा है..." />}>
            <PanchangMuhurat lang={lang} />
          </Suspense>
        )}

        {activeTab === 'services' && (
          <Suspense fallback={<VedicLoadingFallback text="वैदिक ज्योतिष सेवाएं लोड हो रही हैं..." />}>
            <ServicesSection
              lang={lang}
              onSelectService={(id) => {
                if (id === 'kundli') setActiveTab('kundli');
                else if (id === 'matchmaking') setActiveTab('gun-milan');
                else if (id === 'dosh') setActiveTab('dosh-guide');
              }}
            />
          </Suspense>
        )}

        {activeTab === 'ask-astrologer' && (
          <Suspense fallback={<VedicLoadingFallback text="AI वैदिक ज्योतिषी परामर्श कक्ष लोड हो रहा है..." />}>
            <AskAstrologer
              lang={lang}
              initialQuery={askAiQuery}
            />
          </Suspense>
        )}

        {activeTab === 'contact' && (
          <Suspense fallback={<VedicLoadingFallback text="संपर्क विवरण लोड हो रहा है..." />}>
            <ContactSection
              lang={lang}
            />
          </Suspense>
        )}
      </main>

      {/* Floating Call, WhatsApp & PhonePe QR Buttons */}
      <FloatingActions
        lang={lang}
        onOpenAskAI={() => {
          setActiveTab('ask-astrologer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPaymentQR={() => setIsPaymentModalOpen(true)}
      />

      {/* Vedic Consultation & Dakshina Payment Modal */}
      {isPaymentModalOpen && (
        <Suspense fallback={null}>
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            lang={lang}
          />
        </Suspense>
      )}

      {/* Lazy Loaded Footer */}
      <LazyViewportSection minHeight="220px" rootMargin="400px">
        <Suspense fallback={<SectionPlaceholder minHeight="220px" />}>
          <Footer
            setActiveTab={setActiveTab}
            lang={lang}
          />
        </Suspense>
      </LazyViewportSection>
    </div>
  );
}
export default App;
