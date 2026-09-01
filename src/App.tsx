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
import { PujaAppointmentModal } from './components/PujaAppointmentModal';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { DailyWisdomVastu } from './components/DailyWisdomVastu';
import { DigitalJapaMala } from './components/DigitalJapaMala';
import { GemstoneRudrakshaFinder } from './components/GemstoneRudrakshaFinder';
import { ASTROLOGER_INFO } from './data/astrologyData';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'hi' | 'gu'>('hi');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('astro_dark_theme') === 'true';
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [askAiQuery, setAskAiQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('astro_dark_theme', isDark.toString());
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleOpenBooking = (serviceName?: string) => {
    setBookingService(serviceName);
    setIsBookingOpen(true);
  };

  const handleAskAI = (contextQuery: string) => {
    setAskAiQuery(contextQuery);
    setActiveTab('ask-astrologer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-mukta selection:bg-[#FF671F] selection:text-white transition-colors duration-300 ${
      isDark 
        ? 'bg-[#090d16] text-amber-50 dark' 
        : 'bg-[#FFFDF9] text-[#2C2420]'
    }`}>
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              lang={lang}
              setActiveTab={setActiveTab}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* Sacred Daily Vedic Wisdom & Vastu */}
            <DailyWisdomVastu lang={lang} isDark={isDark} />

            {/* Sacred Mantra Drone Audio Player */}
            <AudioChants />

            {/* Daily Rashifal Overview */}
            <DailyRashifal
              lang={lang}
              onSelectRashi={() => {}}
              onOpenBooking={() => handleOpenBooking('राशिफल एवं ग्रह शांति परामर्श')}
            />

            {/* Core Services Section */}
            <ServicesSection
              lang={lang}
              onSelectService={(id) => {
                if (id === 'kundli') setActiveTab('kundli');
                else if (id === 'matchmaking') setActiveTab('gun-milan');
                else if (id === 'dosh') setActiveTab('dosh-guide');
                else handleOpenBooking();
              }}
              onOpenBooking={handleOpenBooking}
            />

            {/* Panchang & Muhurat Highlight */}
            <PanchangMuhurat lang={lang} />

            {/* Astrologer Biography & Authenticity */}
            <div className="py-12 px-4 max-w-7xl mx-auto">
              <div className={`rounded-3xl p-6 sm:p-10 border shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isDark 
                  ? 'bg-slate-900/90 border-amber-500/30 text-amber-100 shadow-amber-950/40' 
                  : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5 text-[#2C2420]'
              }`}>
                <div className="lg:col-span-4 text-center">
                  <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full bg-gradient-to-br from-[#FF671F] to-[#CC5218] p-1.5 shadow-xl border-4 border-amber-300 relative">
                    <div className="w-full h-full rounded-full bg-[#FFF5F0] flex flex-col items-center justify-center text-[#CC5218] overflow-hidden">
                      <span className="text-6xl mb-1">🔱</span>
                      <span className="font-yatra text-sm font-bold text-center px-2">
                        {lang === 'hi' ? 'पं. विरेंद्र कुमार जोशी' : 'પં. વિરેન્દ્ર કુમાર જોશી'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-yatra text-xl text-[#CC5218] dark:text-amber-300">{ASTROLOGER_INFO.name}</h3>
                    <p className="text-xs text-[#7A685B] dark:text-stone-400">{ASTROLOGER_INFO.experience} | {ASTROLOGER_INFO.location}</p>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#FFF5F0] dark:bg-amber-950 text-[#CC5218] dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-[#FF671F]/30">
                    <Award className="w-4 h-4 text-[#FF671F]" />
                    <span>{lang === 'hi' ? 'उत्तर गुजरात के सुप्रसिद्ध ज्योतिषाचार्य' : 'ઉત્તર ગુજરાતના સુપ્રસિદ્ધ જ્યોતિષાચાર્ય'}</span>
                  </div>

                  <h3 className="font-yatra text-2xl sm:text-3xl text-[#2C2420] dark:text-amber-100">
                    {lang === 'hi'
                      ? 'परंपरागत वैदिक ज्ञान एवं प्रामाणिक ज्योतिषीय साधना'
                      : 'પરંપરાગત વૈદિક જ્ઞાન અને જ્યોતિષીય સાધના'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C4A3E] dark:text-stone-300 leading-relaxed">
                    {lang === 'hi' ? ASTROLOGER_INFO.aboutHi : ASTROLOGER_INFO.aboutGu}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className={`flex items-center gap-2 text-xs font-semibold p-3 rounded-2xl border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-stone-200' : 'bg-[#FFFDF9] border-[#FF671F]/20 text-[#2C2420]'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-[#FF671F] shrink-0" />
                      <span>गोल्ड मेडलिस्ट - महर्षि पाराशर ज्योतिष परिषद</span>
                    </div>

                    <div className={`flex items-center gap-2 text-xs font-semibold p-3 rounded-2xl border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-stone-200' : 'bg-[#FFFDF9] border-[#FF671F]/20 text-[#2C2420]'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-[#FF671F] shrink-0" />
                      <span>50,000+ जातकों का सफल व सटीक मार्गदर्शन</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenBooking()}
                      className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                    >
                      {lang === 'hi' ? 'पंडित जी से मिलें (Book Appointment)' : 'પંડિતજીને મળો'}
                    </button>

                    <a
                      href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                      className={`border font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5 ${
                        isDark 
                          ? 'bg-slate-950 border-amber-500/40 text-amber-300 hover:bg-slate-800' 
                          : 'bg-white hover:bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>कॉल करें</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <Testimonials lang={lang} />
          </div>
        )}

        {activeTab === 'kundli' && (
          <KundliGenerator lang={lang} onAskAI={handleAskAI} isDark={isDark} />
        )}

        {activeTab === 'gun-milan' && (
          <GunMilan lang={lang} onOpenBooking={() => handleOpenBooking('36 गुण विवाह मिलान परामर्श')} />
        )}

        {activeTab === 'gemstones' && (
          <GemstoneRudrakshaFinder lang={lang} isDark={isDark} onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'japa-mala' && (
          <DigitalJapaMala lang={lang} isDark={isDark} onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'daily-wisdom' && (
          <div className="py-8">
            <DailyWisdomVastu lang={lang} isDark={isDark} />
          </div>
        )}

        {activeTab === 'rashifal' && (
          <DailyRashifal
            lang={lang}
            onSelectRashi={() => {}}
            onOpenBooking={() => handleOpenBooking('राशिफल एवं ग्रह शांति परामर्श')}
          />
        )}

        {activeTab === 'dosh-guide' && (
          <DoshNivaranGuide lang={lang} onOpenBooking={(dosh) => handleOpenBooking(dosh || 'दोष निवारण पूजा')} />
        )}

        {activeTab === 'panchang' && (
          <PanchangMuhurat lang={lang} />
        )}

        {activeTab === 'services' && (
          <ServicesSection
            lang={lang}
            onSelectService={() => {}}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'ask-astrologer' && (
          <AskAstrologer
            lang={lang}
            initialQuery={askAiQuery}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'contact' && (
          <div className="py-12 px-4 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-yatra text-3xl sm:text-4xl text-[#CC5218] dark:text-amber-400 mb-2">
                {lang === 'hi' ? 'भवानी ज्योतिष केंद्र - संपर्क व पता' : 'ભવાની જ્યોતિષ કેન્દ્ર - સંપર્ક અને સરનામું'}
              </h2>
              <p className="text-sm text-[#665448] dark:text-stone-400">
                {lang === 'hi' ? 'मेहसाणा कार्यालय में व्यक्तिगत भेंट अथवा फोन परामर्श हेतु संपर्क करें' : 'મહેસાણા ઓફિસમાં રૂબરૂ મુલાકાત માટે સંપર્ક કરો'}
              </p>
            </div>

            <div className={`rounded-3xl p-6 sm:p-10 border shadow-xl space-y-8 ${
              isDark 
                ? 'bg-slate-900 border-amber-500/30' 
                : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#FFF5F0] border-[#FF671F]/20'
                }`}>
                  <div className="flex items-center gap-2 text-[#CC5218] dark:text-amber-400 font-bold text-sm">
                    <MapPin className="w-5 h-5 text-[#FF671F]" />
                    <span>कार्यालय का पूरा पता</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2C2420] dark:text-stone-200 leading-relaxed">
                    {lang === 'hi' ? ASTROLOGER_INFO.address : ASTROLOGER_INFO.addressGu}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Nagalpur+Mehsana+Gujarat+384002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold text-[#CC5218] dark:text-amber-400 hover:underline"
                  >
                    📍 गूगल मैप्स पर रास्ता देखें →
                  </a>
                </div>

                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#FFF5F0] border-[#FF671F]/20'
                }`}>
                  <div className="flex items-center gap-2 text-[#CC5218] dark:text-amber-400 font-bold text-sm">
                    <Clock className="w-5 h-5 text-[#FF671F]" />
                    <span>मिलने का समय (Office Timings)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2C2420] dark:text-stone-200 leading-relaxed">
                    {ASTROLOGER_INFO.timings}
                  </p>
                  <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    ✅ सातों दिन खुला (रविवार सहित)
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-yatra text-base py-3 px-8 rounded-2xl shadow-lg shadow-[#FF671F]/30 transition-all text-center"
                >
                  {lang === 'hi' ? 'अपॉइंटमेंट आरक्षित करें' : 'અપોઇન્ટમેન્ટ બુક કરો'}
                </button>

                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className={`border-2 font-yatra text-base py-3 px-8 rounded-2xl transition-all text-center flex items-center justify-center gap-2 ${
                    isDark 
                      ? 'bg-slate-950 border-[#FF671F] text-amber-300 hover:bg-slate-900' 
                      : 'bg-[#FFFDF9] hover:bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>{ASTROLOGER_INFO.phonePrimary}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
        onOpenAskAI={() => {
          setActiveTab('ask-astrologer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Booking Modal */}
      <PujaAppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        defaultService={bookingService}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        lang={lang}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
export default App;
