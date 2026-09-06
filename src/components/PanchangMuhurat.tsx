import React from 'react';
import { TODAY_PANCHANG, ASTROLOGER_INFO } from '../data/astrologyData';
import { Compass, Sun, Moon, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/astrology';

interface PanchangProps {
  lang: Language;
  isDark?: boolean;
}

export const PanchangMuhurat: React.FC<PanchangProps> = ({ lang, isDark = false }) => {
  return (
    <div className={`py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 ${
          isDark 
            ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' 
            : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
        }`}>
          <Compass className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'en' ? 'Daily Vedic Panchang' : lang === 'hi' ? 'दैनिक वैदिक पंचांग' : 'દૈનિક વૈદિક પંચાંગ'}</span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'en' ? 'Today’s Panchang & Auspicious Muhurat' : lang === 'hi' ? 'आज का पंचांग एवं शुभ मुहूर्त' : 'આજનું પંચાંગ અને શુભ મુહૂર્ત'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
          {lang === 'en'
            ? 'Daily Tithi, Nakshatra, Rahu Kaal, Abhijit Muhurat & Choghadiya for Mehsana and Gujarat'
            : lang === 'hi'
            ? 'मेहसाणा व संपूर्ण गुजरात हेतु दैनिक तिथि, नक्षत्र, राहुकाल, अभिजित मुहूर्त व चौघड़िया'
            : 'મહેસાણા અને ગુજરાત માટે દૈનિક તિથિ, નક્ષત્ર, રાહુકાળ અને ચોઘડિયા'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Panchang Card (8 cols) */}
        <div className={`lg:col-span-8 rounded-3xl p-6 border shadow-xl space-y-6 ${
          isDark 
            ? 'bg-stone-900/95 border-amber-500/20 shadow-black/40 text-stone-100' 
            : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5 text-stone-950'
        }`}>
          <div className={`flex flex-wrap justify-between items-center gap-2 pb-4 border-b ${
            isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
          }`}>
            <div>
              <h3 className={`font-yatra text-2xl ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                {TODAY_PANCHANG.date}
              </h3>
              <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {TODAY_PANCHANG.samvat} | {lang === 'en' ? 'Location: Mehsana, Gujarat' : 'स्थान: मेहसाणा, गुजरात'}
              </p>
            </div>

            <div className={`flex items-center gap-3 text-xs font-bold ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
              <div className="flex items-center gap-1">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Sunrise: ' : 'सूर्योदय: '}{TODAY_PANCHANG.sunrise}</span>
              </div>
              <div className="flex items-center gap-1">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'en' ? 'Sunset: ' : 'सूर्यास्त: '}{TODAY_PANCHANG.sunset}</span>
              </div>
            </div>
          </div>

          {/* 5 Core Pillars of Panchang */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? '1. Tithi' : '1. तिथि (Tithi)'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>{TODAY_PANCHANG.tithi}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? '2. Nakshatra' : '2. नक्षत्र (Nakshatra)'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>{TODAY_PANCHANG.nakshatra}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? '3. Paksha' : '3. पक्ष (Paksha)'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>{TODAY_PANCHANG.paksha}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? '4. Yoga' : '4. योग (Yoga)'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>{TODAY_PANCHANG.yoga}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? '5. Karana' : '5. करण (Karana)'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>{TODAY_PANCHANG.karana}</span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-amber-950/40 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
            }`}>
              <span className={`text-[11px] block ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                {lang === 'en' ? 'Auspicious Muhurat' : 'शुभ मुहूर्त (Abhijit)'}
              </span>
              <span className={`font-bold text-sm ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>{TODAY_PANCHANG.abhijitMuhurat}</span>
            </div>
          </div>

          {/* Shubh Choghadiya Today */}
          <div className={`p-4 rounded-2xl border ${
            isDark ? 'bg-stone-800/90 border-amber-500/20' : 'bg-[#FFF5F0] border-[#FF671F]/30'
          }`}>
            <h4 className={`font-bold text-sm mb-2.5 flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
              <Sparkles className="w-4 h-4 text-[#FF671F]" />
              <span>
                {lang === 'en'
                  ? 'Today’s Auspicious Choghadiya Timings (Day & Night)'
                  : lang === 'hi'
                  ? 'आज के शुभ चौघड़िया मुहूर्त (दिन व रात)'
                  : 'આજના શુભ ચોઘડિયા મુહૂર્ત'}
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TODAY_PANCHANG.shubhChoghadiya.map((chog, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs p-2.5 rounded-xl border font-semibold ${
                  isDark 
                    ? 'bg-stone-900 border-stone-700 text-stone-200' 
                    : 'bg-white border-[#FF671F]/20 text-stone-950'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{chog}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rahu Kaal & Inauspicious Timers (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`rounded-3xl p-6 border shadow-xl space-y-4 ${
            isDark 
              ? 'bg-stone-900/95 border-rose-500/30 shadow-black/40' 
              : 'bg-white border-rose-200 shadow-rose-500/5'
          }`}>
            <div className={`flex items-center gap-2 font-bold pb-2 border-b ${
              isDark ? 'text-rose-400 border-rose-500/20' : 'text-rose-700 border-rose-100'
            }`}>
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>{lang === 'en' ? 'Inauspicious Periods (Avoid New Tasks)' : 'अशुभ काल (वर्जित समय)'}</span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-rose-950/40 border-rose-500/30' : 'bg-rose-50 border-rose-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>⚠️ {lang === 'en' ? 'Rahu Kaal' : 'राहुकाल (Rahu Kaal)'}</span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-rose-200' : 'text-rose-950'}`}>{TODAY_PANCHANG.rahuKaal}</span>
              <span className={`text-[11px] block mt-1 ${isDark ? 'text-rose-300/80' : 'text-rose-700'}`}>
                {lang === 'en' ? 'Avoid starting vital negotiations or auspicious deeds in this window.' : 'इस समय नया कार्य, यात्रा या लेन-देन आरंभ न करें।'}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50 border-amber-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{lang === 'en' ? 'Yamaganda' : 'यमगण्ड (Yamaganda)'}</span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>{TODAY_PANCHANG.yamaganda}</span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-slate-700'}`}>{lang === 'en' ? 'Gulika Kaal' : 'गुलिक काल (Gulika Kaal)'}</span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-stone-200' : 'text-slate-900'}`}>{TODAY_PANCHANG.gulikaKaal}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white p-5 rounded-3xl shadow-lg">
            <h4 className="font-yatra text-lg mb-1">
              {lang === 'en' ? 'Personalized Shubh Muhurat' : lang === 'hi' ? 'विशेष मुहूर्त निकलवाएं' : 'વિશેષ મુહૂર્ત કઢાવો'}
            </h4>
            <p className="text-xs text-amber-100 mb-3">
              {lang === 'en'
                ? 'Precise astrological Muhurat for Griha Pravesh, Marriage, Vehicle Purchase, Naming & Business Inauguration.'
                : lang === 'hi'
                ? 'गृह प्रवेश, विवाह, वाहन क्रय, नामकरण एवं व्यापार उद्घाटन हेतु व्यक्तिगत शुभ लग्न मुहूर्त।'
                : 'ગૃહ પ્રવેશ, લગ્ન, વાહન ખરીદી અને વેપાર ઉદ્ઘાટન માટે શુભ મુહૂર્ત.'}
            </p>
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="w-full bg-white hover:bg-amber-50 text-[#CC5218] font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Call for Muhurat Guidance' : lang === 'hi' ? 'मुहूर्त परामर्श हेतु कॉल करें' : 'મુહૂર્ત માટે કોલ કરો'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
