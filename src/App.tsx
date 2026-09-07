import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DailyRashifal } from './components/DailyRashifal';
import { KundliGenerator } from './components/KundliGenerator';
import { GunMilan } from './components/GunMilan';
import { AskAstrologer } from './components/AskAstrologer';
import { ServicesSection } from './components/ServicesSection';
import { PanchangMuhurat } from './components/PanchangMuhurat';
import { DoshNivaranGuide } from './components/DoshNivaranGuide';
import { Testimonials } from './components/Testimonials';
import { AudioChants } from './components/AudioChants';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { DailyWisdomVastu } from './components/DailyWisdomVastu';
import { DigitalJapaMala } from './components/DigitalJapaMala';
import { GemstoneRudrakshaFinder } from './components/GemstoneRudrakshaFinder';
import { ContactSection } from './components/ContactSection';
import { InternationalConsultation } from './components/InternationalConsultation';
import { VerifiedBadge } from './components/VerifiedBadge';
import { PaymentModal } from './components/PaymentModal';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from './data/astrologyData';
import { Language } from './types/astrology';
import { detectInitialLanguage, saveLanguagePreference } from './utils/languageDetector';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Award, Sparkles, CheckCircle2, Mail, Navigation } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLangState] = useState<Language>(() => detectInitialLanguage());
  const [askAiQuery, setAskAiQuery] = useState<string | undefined>(undefined);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveLanguagePreference(newLang);
  };

  useEffect(() => {
    localStorage.removeItem('astro_dark_theme');
    localStorage.removeItem('theme');
    localStorage.removeItem('color-theme');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
    document.body.style.colorScheme = 'light';
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
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              lang={lang}
              setActiveTab={setActiveTab}
            />

            {/* Sacred Daily Vedic Wisdom & Vastu */}
            <DailyWisdomVastu lang={lang} />

            {/* Sacred Mantra Drone Audio Player */}
            <AudioChants />

            {/* Daily Rashifal Overview */}
            <DailyRashifal
              lang={lang}
              onSelectRashi={() => {}}
            />

            {/* Core Services Section */}
            <ServicesSection
              lang={lang}
              onSelectService={(id) => {
                if (id === 'kundli') setActiveTab('kundli');
                else if (id === 'matchmaking') setActiveTab('gun-milan');
                else if (id === 'dosh') setActiveTab('dosh-guide');
              }}
            />

            {/* Panchang & Muhurat Highlight */}
            <PanchangMuhurat lang={lang} />

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

            {/* Dedicated International & NRI Consultation Section */}
            <InternationalConsultation lang={lang} />

            {/* Contact & Address Section directly on Home page */}
            <ContactSection
              lang={lang}
            />

            {/* Testimonials */}
            <Testimonials lang={lang} />
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

        {activeTab === 'daily-wisdom' && (
          <div className="py-8">
            <DailyWisdomVastu lang={lang} />
          </div>
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
            onSelectService={() => {}}
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
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        lang={lang}
      />
    </div>
  );
}
export default App;
