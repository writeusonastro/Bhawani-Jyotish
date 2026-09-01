import React from 'react';
import { Phone, MessageCircle, Sparkles, ShieldCheck, Award, Star, Compass, HeartHandshake, ScrollText, Flame } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { AnimatedLogo } from './AnimatedLogo';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  lang: 'hi' | 'gu';
  isDark?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, lang, isDark = false }) => {
  return (
    <section className={`relative overflow-hidden border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-[#090d16] border-amber-500/20 text-stone-100' 
        : 'bg-gradient-to-b from-[#FFF5F0] via-[#FFF9F5] to-[#FFFDF9] border-[#FF671F]/20 text-stone-950'
    }`}>
      {/* Decorative astrological background circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FF671F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Sacred Brand Emblem */}
          <div className="flex justify-center mb-5">
            <AnimatedLogo size="lg" isDark={isDark} lang={lang} />
          </div>

          {/* Sacred Trishul & Om Pill */}
          <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full shadow-sm text-xs sm:text-sm font-semibold mb-5 ${
            isDark 
              ? 'bg-slate-900/90 border-amber-500/30 text-amber-300' 
              : 'bg-white/90 border-[#FF671F]/30 text-[#CC5218]'
          }`}>
            <span className="text-base">🔱</span>
            <span>{lang === 'hi' ? 'उत्तर गुजरात का सबसे विश्वसनीय ज्योतिष केंद्र' : 'ઉત્તર ગુજરાતનું સૌથી વિશ્વસનીય જ્યોતિષ કેન્દ્ર'}</span>
            <span className="text-base">🔱</span>
          </div>

          {/* Main Hero Title adhering to user prompt font and color style */}
          <h2 className={`font-yatra text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${
            isDark ? 'text-amber-400' : 'text-[#CC5218]'
          }`}>
            {lang === 'hi' ? 'भवानी ज्योतिष - मेहसाणा' : 'ભવાની જ્યોતિષ - મહેસાણા'}
          </h2>

          <p className={`text-lg sm:text-2xl font-bold mb-3 ${
            isDark ? 'text-amber-100' : 'text-stone-950'
          }`}>
            {lang === 'hi' ? 'सटीक ज्योतिषीय समाधान एवं वैदिक मार्गदर्शन' : 'સચોટ જ્યોતિષીય સમાધાન અને વૈદિક માર્ગદર્શન'}
          </p>

          <p className={`text-sm sm:text-base font-medium max-w-2xl mx-auto mb-8 leading-relaxed ${
            isDark ? 'text-stone-300' : 'text-stone-900'
          }`}>
            {lang === 'hi'
              ? 'विवाह में बाधा, नौकरी-व्यापार में घाटा, गृह क्लेश, मांगलिक, कालसर्प दोष अथवा संतान संबंधी समस्याओं का शास्त्रोक्त व अचूक वैदिक समाधान। ३५+ वर्षों का प्रामाणिक अनुभव।'
              : 'લગ્નમાં વિલંબ, નોકરી-વેપારમાં ખોટ, ગૃહ કંકાસ, માંગલિક, કાલસર્પ દોષ અથવા સંતાન સમસ્યાઓનું શાસ્ત્રોક્ત અને સચોટ વૈદિક સમાધાન. ૩૫+ વર્ષનો અનુભવ.'}
          </p>

          {/* Main Action Buttons including .btn-main from user snippet */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="inline-flex items-center justify-center gap-2 bg-[#FF671F] hover:bg-[#CC5218] text-white font-yatra text-lg sm:text-xl px-8 py-3.5 rounded-full shadow-lg shadow-[#FF671F]/30 transition-all hover:scale-105 active:scale-95 border-2 border-amber-300"
            >
              <Phone className="w-5 h-5 text-amber-200 animate-bounce" />
              <span>{lang === 'hi' ? 'तुरंत कॉल करें' : 'તરત કોલ કરો'}</span>
            </a>

            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('प्रणाम पंडित जी! मुझे अपनी कुंडली व समस्याओं के समाधान हेतु परामर्श चाहिए।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base sm:text-lg px-7 py-3.5 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>व्हाट्सएप पर संपर्क</span>
            </a>
          </div>

          {/* Quick interactive utility tool cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
            <div 
              onClick={() => setActiveTab('kundli')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                isDark 
                  ? 'bg-slate-900/90 border-amber-500/25 hover:border-amber-400 hover:bg-slate-800/90 text-stone-100 shadow-md' 
                  : 'bg-white/90 border-[#FF671F]/20 shadow-sm hover:shadow-md hover:border-[#FF671F] text-stone-950'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform ${
                isDark ? 'bg-amber-950/60 text-amber-400' : 'bg-[#FFF5F0] text-[#FF671F]'
              }`}>
                <ScrollText className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-100' : 'text-stone-950'}`}>
                {lang === 'hi' ? 'मुफ्त जन्म कुंडली' : 'મફત જન્મ કુંડળી'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'लग्न चक्र व फलादेश' : 'લગ્ન ચક્ર અને ફલાદેશ'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('gun-milan')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                isDark 
                  ? 'bg-slate-900/90 border-amber-500/25 hover:border-amber-400 hover:bg-slate-800/90 text-stone-100 shadow-md' 
                  : 'bg-white/90 border-[#FF671F]/20 shadow-sm hover:shadow-md hover:border-[#FF671F] text-stone-950'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform ${
                isDark ? 'bg-rose-950/60 text-rose-400' : 'bg-rose-50 text-rose-600'
              }`}>
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-100' : 'text-stone-950'}`}>
                {lang === 'hi' ? '36 गुण मिलान' : '36 ગુણ મિલાન'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'विवाह अनुकूलता जांच' : 'લગ્ન અનુકૂળતા ચકાસણી'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('rashifal')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                isDark 
                  ? 'bg-slate-900/90 border-amber-500/25 hover:border-amber-400 hover:bg-slate-800/90 text-stone-100 shadow-md' 
                  : 'bg-white/90 border-[#FF671F]/20 shadow-sm hover:shadow-md hover:border-[#FF671F] text-stone-950'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform ${
                isDark ? 'bg-amber-950/60 text-amber-400' : 'bg-amber-50 text-amber-600'
              }`}>
                <Compass className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-100' : 'text-stone-950'}`}>
                {lang === 'hi' ? 'दैनिक राशिफल' : 'દૈનિક રાશિફળ'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'आज का भाग्य व उपाय' : 'આજનો ભાગ્ય અને ઉપાય'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('ask-astrologer')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                isDark 
                  ? 'bg-slate-900/90 border-amber-500/25 hover:border-amber-400 hover:bg-slate-800/90 text-stone-100 shadow-md' 
                  : 'bg-white/90 border-[#FF671F]/20 shadow-sm hover:shadow-md hover:border-[#FF671F] text-stone-950'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform ${
                isDark ? 'bg-purple-950/60 text-purple-400' : 'bg-purple-50 text-purple-600'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-100' : 'text-stone-950'}`}>
                {lang === 'hi' ? 'पूछें ज्योतिषी से' : 'પૂછો જ્યોતિષીને'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'AI वैदिक तुरंत उत्तर' : 'AI વૈદિક ત્વરિત જવાબ'}
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t text-center ${
            isDark ? 'border-amber-500/20' : 'border-[#FF671F]/20'
          }`}>
            <div className="flex flex-col items-center">
              <span className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-400' : 'text-[#CC5218]'}`}>35+</span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'वर्षों का वैदिक अनुभव' : 'વર્ષોનો વૈદિક અનુભવ'}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-400' : 'text-[#CC5218]'}`}>15,000+</span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'संतुष्ट जातक व परिवार' : 'સંતુષ્ટ જાતકો અને પરિવારો'}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-400' : 'text-[#CC5218]'}`}>100%</span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'गोपनीय व शास्त्रोक्त' : 'ગુપ્ત અને શાસ્ત્રોક્ત'}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-400' : 'text-[#CC5218]'}`}>4.9 ★</span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {lang === 'hi' ? 'सर्वश्रेष्ठ ग्राहक समीक्षाएं' : 'શ્રેષ્ઠ ગ્રાહક સમીક્ષાઓ'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
