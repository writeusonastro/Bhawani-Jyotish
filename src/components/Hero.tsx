import React from 'react';
import { Phone, MessageCircle, Sparkles, ShieldCheck, Award, Star, Compass, HeartHandshake, ScrollText, Flame } from 'lucide-react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { AnimatedLogo } from './AnimatedLogo';
import { VerifiedBadge } from './VerifiedBadge';
import { RajputSymbol } from './RajputSymbol';
import { Language } from '../types/astrology';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  lang: Language;
  isDark?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, lang, isDark = false }) => {
  return (
    <section className={`relative overflow-hidden border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0f0b07] border-amber-500/30 text-amber-50 royal-jali-pattern' 
        : 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E5] to-[#F7EEDC] border-amber-400/40 text-[#2C2420] royal-jali-pattern'
    }`}>
      {/* Decorative royal gold aura circles */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[420px] h-[420px] rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[420px] h-[420px] rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-14 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Sacred Brand Emblem */}
          <div className="flex justify-center mb-5">
            <div className="relative p-2 rounded-full bg-gradient-to-r from-amber-400/30 via-yellow-300/40 to-amber-500/30 shadow-2xl shadow-amber-500/25 border border-amber-400/50">
              <AnimatedLogo size="lg" isDark={isDark} lang={lang} />
            </div>
          </div>

          {/* Royal Heritage Badge */}
          <div className={`inline-flex items-center gap-2 border px-5 py-2 rounded-full shadow-md text-xs sm:text-sm font-black mb-5 tracking-wide transition-all ${
            isDark 
              ? 'bg-amber-950/80 border-amber-400/60 text-amber-200 shadow-amber-900/30' 
              : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-amber-400/80 text-[#7A2408] shadow-amber-500/15'
          }`}>
            <RajputSymbol size="sm" />
            <span className="font-bold">
              {lang === 'en'
                ? '✦ Royal Vedic Astrological Heritage • North Gujarat ✦'
                : lang === 'hi'
                ? '✦ उत्तर गुजरात का प्रतिष्ठित राजज्योतिष संस्थान ✦'
                : '✦ ઉત્તર ગુજરાતનું પ્રતિષ્ઠિત રાજજ્યોતિષ સંસ્થાન ✦'}
            </span>
            <RajputSymbol size="sm" />
          </div>

          {/* Main Hero Title */}
          <h2 className={`font-yatra text-4xl sm:text-6xl lg:text-7xl mb-3 leading-tight tracking-wide drop-shadow-sm flex items-center justify-center gap-2 sm:gap-3 flex-wrap ${
            isDark ? 'text-amber-300' : 'text-[#852E10]'
          }`}>
            <span>{lang === 'en' ? 'Bhavani Jyotish Kendra' : lang === 'hi' ? 'भवानी ज्योतिष केंद्र' : 'ભવાની જ્યોતિષ કેન્દ્ર'}</span>
            <VerifiedBadge size="lg" tooltipText="भवानी ज्योतिष केंद्र - आधिकारिक सत्यापित वैदिक पीठ" />
          </h2>

          <p className={`text-xl sm:text-2xl font-bold mb-3 font-marcellus tracking-wide ${
            isDark ? 'text-amber-100' : 'text-stone-900'
          }`}>
            {lang === 'en'
              ? ASTROLOGER_INFO.taglineEn
              : lang === 'hi'
              ? ASTROLOGER_INFO.tagline
              : ASTROLOGER_INFO.taglineGu}
          </p>

          <p className={`text-sm sm:text-base font-medium max-w-2xl mx-auto mb-8 leading-relaxed ${
            isDark ? 'text-stone-300' : 'text-stone-800'
          }`}>
            {lang === 'en'
              ? 'Authentic, infallible Vedic solutions for marriage delays, business & career hurdles, domestic discord, Manglik & Kalsarp Doshas, and child matters. 35+ years of dedicated expertise.'
              : lang === 'hi'
              ? 'विवाह में बाधा, नौकरी-व्यापार में घाटा, गृह क्लेश, मांगलिक, कालसर्प दोष अथवा संतान संबंधी समस्याओं का शास्त्रोक्त व अचूक वैदिक समाधान। ३५+ वर्षों का प्रामाणिक अनुभव।'
              : 'લગ્નમાં વિલંબ, નોકરી-વેપારમાં ખોટ, ગૃહ કંકાસ, માંગલિક, કાલસર્પ દોષ અથવા સંતાન સમસ્યાઓનું શાસ્ત્રોક્ત અને સચોટ વૈદિક સમાધાન. ૩૫+ વર્ષનો અનુભવ.'}
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-11">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-yatra text-lg sm:text-xl px-9 py-4 rounded-full shadow-xl shadow-amber-700/30 transition-all hover:scale-105 active:scale-95 border-2 border-amber-300 ring-2 ring-amber-400/40"
            >
              <Phone className="w-5 h-5 text-amber-200 animate-bounce" />
              <span>{lang === 'en' ? 'Direct Royal Consultation' : lang === 'hi' ? 'सीधे पंडित जी से बात करें' : 'પંડિતજી સાથે સીધી વાત'}</span>
            </a>

            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                getWhatsAppConsultationMessage(lang)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 border-2 border-emerald-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{lang === 'en' ? 'WhatsApp Consultation' : 'व्हाट्सएप पर परामर्श लें'}</span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp चैट" />
            </a>
          </div>

          {/* Quick interactive utility tool cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-11 text-left">
            <div 
              onClick={() => setActiveTab('kundli')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-600/15 hover:border-amber-500 text-stone-950'
              }`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs ${
                isDark ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-[#852E10] border border-amber-300'
              }`}>
                <ScrollText className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-200' : 'text-[#852E10]'}`}>
                {lang === 'en' ? 'Free Janam Kundli' : lang === 'hi' ? 'मुफ्त जन्म कुंडली' : 'મફત જન્મ કુંડળી'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-700'}`}>
                {lang === 'en' ? 'Lagna & Predictions' : lang === 'hi' ? 'लग्न चक्र व फलादेश' : 'લગ્ન ચક્ર અને ફલાદેશ'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('gun-milan')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-600/15 hover:border-amber-500 text-stone-950'
              }`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-rose-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs ${
                isDark ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-700 border border-rose-300'
              }`}>
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-200' : 'text-[#852E10]'}`}>
                {lang === 'en' ? '36 Gun Milan' : lang === 'hi' ? '36 गुण मिलान' : '36 ગુણ મિલાન'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-700'}`}>
                {lang === 'en' ? 'Marriage Compatibility' : lang === 'hi' ? 'विवाह अनुकूलता जांच' : 'લગ્ન અનુકૂળતા ચકાસણી'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('rashifal')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-600/15 hover:border-amber-500 text-stone-950'
              }`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs ${
                isDark ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-700 border border-amber-300'
              }`}>
                <Compass className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-200' : 'text-[#852E10]'}`}>
                {lang === 'en' ? 'Daily Horoscope' : lang === 'hi' ? 'दैनिक राशिफल' : 'દૈનિક રાશિફળ'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-700'}`}>
                {lang === 'en' ? 'Today’s Fortune & Remedy' : lang === 'hi' ? 'आज का भाग्य व उपाय' : 'આજનો ભાગ્ય અને ઉપાય'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('ask-astrologer')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-600/15 hover:border-amber-500 text-stone-950'
              }`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs ${
                isDark ? 'bg-purple-950/80 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-300'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-200' : 'text-[#852E10]'}`}>
                {lang === 'en' ? 'Ask AI Astrologer' : lang === 'hi' ? 'पूछें ज्योतिषी से' : 'પૂછો જ્યોતિષીને'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-700'}`}>
                {lang === 'en' ? 'Instant Vedic AI Guidance' : lang === 'hi' ? 'AI वैदिक तुरंत उत्तर' : 'AI વૈદિક ત્વરિત જવાબ'}
              </p>
            </div>
          </div>

          {/* Royal Trust Medallions */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t text-center ${
            isDark ? 'border-amber-500/30' : 'border-amber-400/40'
          }`}>
            <div className="flex flex-col items-center p-2 rounded-xl bg-amber-500/5 border border-amber-400/20">
              <span className={`font-bold font-serif text-2xl sm:text-3xl flex items-center justify-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-[#852E10]'}`}>
                <RajputSymbol size="sm" />
                <span>35+</span>
              </span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
                {lang === 'en' ? 'Years Vedic Tradition' : lang === 'hi' ? 'वर्षों की राजकीय साधना' : 'વર્ષોની રાજકીય સાધના'}
              </span>
            </div>

            <div className="flex flex-col items-center p-2 rounded-xl bg-amber-500/5 border border-amber-400/20">
              <span className={`font-bold font-serif text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#852E10]'}`}>🪷 15,000+</span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
                {lang === 'en' ? 'Satisfied Royal Clients' : lang === 'hi' ? 'संतुष्ट जातक व परिवार' : 'સંતુષ્ટ જાતકો અને પરિવારો'}
              </span>
            </div>

            <div className="flex flex-col items-center p-2 rounded-xl bg-amber-500/5 border border-amber-400/20">
              <span className={`font-bold font-serif text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#852E10]'}`}>
                100%
              </span>
              <span className={`text-xs sm:text-sm font-bold flex items-center justify-center gap-1 flex-wrap ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
                <span>{lang === 'en' ? 'Authentic Vedic' : lang === 'hi' ? 'शास्त्रोक्त प्रामाणिक' : 'શાસ્ત્રોક્ત પ્રમાણિત'}</span>
                <VerifiedBadge size="xs" tooltipText="१००% प्रामाणिक वैदिक संस्थान" />
              </span>
            </div>

            <div className="flex flex-col items-center p-2 rounded-xl bg-amber-500/5 border border-amber-400/20">
              <span className={`font-bold font-serif text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#852E10]'}`}>⭐ 4.9 ★</span>
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>
                {lang === 'en' ? 'Vedic Astrologer Rating' : lang === 'hi' ? 'सर्वश्रेष्ठ प्रामाणिक रेटिंग' : 'શ્રેષ્ઠ પ્રમાણિત રેટિંગ'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
