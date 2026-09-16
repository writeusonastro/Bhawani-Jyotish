import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FloatingActions } from './components/FloatingActions';
import { VerifiedBadge } from './components/VerifiedBadge';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from './data/astrologyData';
import { Language } from './types/astrology';
import { detectInitialLanguage, saveLanguagePreference } from './utils/languageDetector';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Award, Sparkles, CheckCircle2, Mail, Navigation, Loader2 } from 'lucide-react';

import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PanditJiBioCard } from './components/PanditJiBioCard';

// Code-split heavy interactive tools and sub-pages for sub-second first contentful paint
const KundliGenerator = lazy(() => import('./components/KundliGenerator').then(m => ({ default: m.KundliGenerator })));
const GunMilan = lazy(() => import('./components/GunMilan').then(m => ({ default: m.GunMilan })));
const PanchangMuhurat = lazy(() => import('./components/PanchangMuhurat').then(m => ({ default: m.PanchangMuhurat })));
const AskAstrologer = lazy(() => import('./components/AskAstrologer').then(m => ({ default: m.AskAstrologer })));
const GemstoneRudrakshaFinder = lazy(() => import('./components/GemstoneRudrakshaFinder').then(m => ({ default: m.GemstoneRudrakshaFinder })));
const DigitalJapaMala = lazy(() => import('./components/DigitalJapaMala').then(m => ({ default: m.DigitalJapaMala })));
const DoshNivaranGuide = lazy(() => import('./components/DoshNivaranGuide').then(m => ({ default: m.DoshNivaranGuide })));
const DailyRashifal = lazy(() => import('./components/DailyRashifal').then(m => ({ default: m.DailyRashifal })));
const CityLocalSeoSection = lazy(() => import('./components/CityLocalSeoSection').then(m => ({ default: m.CityLocalSeoSection })));
const InternationalConsultation = lazy(() => import('./components/InternationalConsultation').then(m => ({ default: m.InternationalConsultation })));
const SeoKeywordHub = lazy(() => import('./components/SeoKeywordHub').then(m => ({ default: m.SeoKeywordHub })));
const WhatsAppTestimonials = lazy(() => import('./components/WhatsAppTestimonials').then(m => ({ default: m.WhatsAppTestimonials })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const PaymentModal = lazy(() => import('./components/PaymentModal').then(m => ({ default: m.PaymentModal })));
const LogoDownloadModal = lazy(() => import('./components/LogoDownloadModal').then(m => ({ default: m.LogoDownloadModal })));

// Lightweight non-blocking loader component
const TabLoadingFallback = ({ lang }: { lang: Language }) => (
  <div className="py-16 sm:py-24 text-center px-4 max-w-md mx-auto flex flex-col items-center justify-center">
    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#852E10] mb-3 animate-pulse">
      <Loader2 className="w-6 h-6 animate-spin text-[#FF671F]" />
    </div>
    <p className="font-yatra text-base sm:text-lg text-[#852E10]">॥ ॐ श्री गणेशाय नमः ॥</p>
    <p className="text-xs text-stone-600 mt-1 font-medium">
      {lang === 'en' ? 'Loading authentic Vedic calculations...' : lang === 'hi' ? 'शास्त्रोक्त वैदिक गणनाएं लोड हो रही हैं...' : 'શાસ્ત્રોક્ત વૈદિક ગણતરી લોડ થઈ રહી છે...'}
    </p>
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
  const [isLogoStudioOpen, setIsLogoStudioOpen] = useState<boolean>(false);

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
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // On-demand tab prefetching triggered only on hover/touch - avoids flooding network on mobile
  const handlePrefetchTab = (tabId: string) => {
    if (tabId === 'kundli') import('./components/KundliGenerator');
    else if (tabId === 'gun-milan') import('./components/GunMilan');
    else if (tabId === 'panchang') import('./components/PanchangMuhurat');
    else if (tabId === 'ask-astrologer') import('./components/AskAstrologer');
    else if (tabId === 'gemstones') import('./components/GemstoneRudrakshaFinder');
    else if (tabId === 'rashifal') import('./components/DailyRashifal');
    else if (tabId === 'dosh-guide') import('./components/DoshNivaranGuide');
  };

  const handleAskAI = (contextQuery: string) => {
    setAskAiQuery(contextQuery);
    setActiveTab('ask-astrologer');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col font-mukta selection:bg-[#FF671F] selection:text-white bg-[#FFFDF9] text-stone-950 overflow-x-clip w-full max-w-full">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onPrefetchTab={handlePrefetchTab}
        onOpenPaymentQR={() => setIsPaymentModalOpen(true)}
        onOpenLogoStudio={() => setIsLogoStudioOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-clip pb-24 md:pb-0">
        <Suspense fallback={<TabLoadingFallback lang={lang} />}>
          {activeTab === 'home' && (
            <div>
              {/* Hero Section - Instant render */}
              <Hero
                lang={lang}
                setActiveTab={setActiveTab}
                onOpenLogoStudio={() => setIsLogoStudioOpen(true)}
              />

              {/* Core Services Section - Instant render */}
              <ServicesSection
                lang={lang}
                onSelectService={(id) => {
                  if (id === 'kundli') setActiveTab('kundli');
                  else if (id === 'matchmaking') setActiveTab('gun-milan');
                  else if (id === 'dosh') setActiveTab('dosh-guide');
                }}
              />

              {/* Astrologer Biography & Authenticity - Instant render */}
              <PanditJiBioCard lang={lang} />

              {/* Contact & Address Section directly on Home page - Instant render */}
              <ContactSection lang={lang} />

              {/* Panchang & Muhurat Highlight - Deferred */}
              <Suspense fallback={null}>
                <PanchangMuhurat lang={lang} />
              </Suspense>

              {/* Dedicated International & NRI Consultation Section - Deferred */}
              <Suspense fallback={null}>
                <InternationalConsultation lang={lang} />
              </Suspense>

              {/* City-Wise Local SEO Centers Section - Deferred */}
              <Suspense fallback={null}>
                <CityLocalSeoSection lang={lang} setActiveTab={setActiveTab} />
              </Suspense>

              {/* Verified WhatsApp Client Chat Screenshots & Feedback - Deferred */}
              <Suspense fallback={null}>
                <WhatsAppTestimonials lang={lang} />
              </Suspense>

              {/* Testimonials - Deferred */}
              <Suspense fallback={null}>
                <Testimonials lang={lang} />
              </Suspense>

              {/* High-Ranking Search & Topic Explorer Hub - Deferred */}
              <Suspense fallback={null}>
                <SeoKeywordHub lang={lang} setActiveTab={setActiveTab} />
              </Suspense>
            </div>
          )}

          {activeTab === 'city-centers' && (
            <div className="py-4">
              <CityLocalSeoSection lang={lang} setActiveTab={setActiveTab} />
              <SeoKeywordHub lang={lang} setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === 'international' && (
            <div className="py-4">
              <InternationalConsultation lang={lang} />
            </div>
          )}

          {activeTab === 'kundli' && (
            <KundliGenerator 
              lang={lang} 
              onAskAI={handleAskAI} 
              onOpenPaymentQR={() => setIsPaymentModalOpen(true)} 
            />
          )}

          {activeTab === 'gun-milan' && (
            <GunMilan lang={lang} />
          )}

          {activeTab === 'gemstones' && (
            <GemstoneRudrakshaFinder lang={lang} />
          )}

          {activeTab === 'japa-mala' && (
            <DigitalJapaMala lang={lang} />
          )}

          {activeTab === 'rashifal' && (
            <DailyRashifal
              lang={lang}
              onSelectRashi={() => {}}
            />
          )}

          {activeTab === 'dosh-guide' && (
            <DoshNivaranGuide lang={lang} />
          )}

          {activeTab === 'panchang' && (
            <PanchangMuhurat lang={lang} />
          )}

          {activeTab === 'services' && (
            <ServicesSection
              lang={lang}
              onSelectService={(id) => {
                if (id === 'kundli') setActiveTab('kundli');
                else if (id === 'matchmaking') setActiveTab('gun-milan');
                else if (id === 'dosh') setActiveTab('dosh-guide');
              }}
            />
          )}

          {activeTab === 'ask-astrologer' && (
            <AskAstrologer
              lang={lang}
              initialQuery={askAiQuery}
            />
          )}

          {activeTab === 'contact' && (
            <ContactSection
              lang={lang}
            />
          )}
        </Suspense>
      </main>

      {/* Floating Call, WhatsApp & PhonePe QR Buttons */}
      <FloatingActions
        lang={lang}
        onOpenAskAI={() => {
          setActiveTab('ask-astrologer');
          window.scrollTo({ top: 0, behavior: 'instant' });
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

      {/* 300 DPI Transparent PNG Logo Studio Modal */}
      {isLogoStudioOpen && (
        <Suspense fallback={null}>
          <LogoDownloadModal
            isOpen={isLogoStudioOpen}
            onClose={() => setIsLogoStudioOpen(false)}
            lang={lang}
          />
        </Suspense>
      )}

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        lang={lang}
        onOpenLogoStudio={() => setIsLogoStudioOpen(true)}
      />
    </div>
  );
}
export default App;
