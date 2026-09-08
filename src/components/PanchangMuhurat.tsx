import React, { useState, useMemo } from 'react';
import { 
  Compass, Sun, Moon, Clock, AlertTriangle, Sparkles, CheckCircle2, 
  Calendar, ChevronLeft, ChevronRight, MapPin, ShieldAlert, BookOpen, 
  HelpCircle, Phone, MessageCircle 
} from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Language } from '../types/astrology';
import { getKalnirnayPanchang, KalnirnayPanchangData } from '../utils/kalnirnayEngine';

interface PanchangProps {
  lang: Language;
  isDark?: boolean;
}

export const PanchangMuhurat: React.FC<PanchangProps> = ({ lang, isDark = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [choghadiyaView, setChoghadiyaView] = useState<'day' | 'night' | 'all'>('all');

  // Compute live Kalnirnay Panchang for the selected date
  const panchang: KalnirnayPanchangData = useMemo(() => {
    return getKalnirnayPanchang(selectedDate);
  }, [selectedDate]);

  // Date navigation helpers
  const handleSetDayOffset = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setSelectedDate(d);
  };

  const isToday = useMemo(() => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  }, [selectedDate]);

  const isYesterday = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      selectedDate.getDate() === yesterday.getDate() &&
      selectedDate.getMonth() === yesterday.getMonth() &&
      selectedDate.getFullYear() === yesterday.getFullYear()
    );
  }, [selectedDate]);

  const isTomorrow = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      selectedDate.getDate() === tomorrow.getDate() &&
      selectedDate.getMonth() === tomorrow.getMonth() &&
      selectedDate.getFullYear() === tomorrow.getFullYear()
    );
  }, [selectedDate]);

  // Date input value (YYYY-MM-DD)
  const dateInputVal = useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const d = selectedDate.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const parts = e.target.value.split('-');
    if (parts.length === 3) {
      const newD = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      setSelectedDate(newD);
    }
  };

  const activeDateFormatted = lang === 'en' 
    ? panchang.dateFormattedEn 
    : lang === 'gu' 
    ? panchang.dateFormattedGu 
    : panchang.dateFormattedHi;

  return (
    <div className={`py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 ${
          isDark 
            ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' 
            : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
        }`}>
          <Compass className="w-4 h-4 text-[#FF671F]" />
          <span>
            {lang === 'en' 
              ? 'Authentic Kalnirnay Vedic Panchang' 
              : lang === 'hi' 
              ? 'कालनिर्णय शास्त्रोक्त वैदिक पंचांग' 
              : 'કાલનિર્ણય શાસ્ત્રોક્ત વૈદિક પંચાંગ'}
          </span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'en' 
            ? 'Daily Kalnirnay Panchang & Auspicious Muhurat' 
            : lang === 'hi' 
            ? 'दैनिक कालनिर्णय पंचांग एवं शुभ मुहूर्त' 
            : 'દૈનિક કાલનિર્ણય પંચાંગ અને શુભ મુહૂર્ત'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
          {lang === 'en'
            ? 'Authentic daily Tithi, Nakshatra, Yoga, Karana, Choghadiya & Rahu Kaal computed according to Kalnirnay guidelines for Mehsana and Gujarat'
            : lang === 'hi'
            ? 'कालनिर्णय पंचांग नियमानुसार मेहसाणा, गुजरात व संपूर्ण भारत हेतु प्रामाणिक तिथि, नक्षत्र, योग, करण, राहुकाल व चौघड़िया'
            : 'કાલનિર્ણય પંચાંગ અનુસાર મહેસાણા અને સમગ્ર ગુજરાત માટે પ્રમાણિક તિથિ, નક્ષત્ર, યોગ, કરણ, રાહુકાળ અને ચોઘડિયા'}
        </p>
      </div>

      {/* Date Navigation & Status Bar */}
      <div className={`rounded-3xl p-4 sm:p-5 border-2 mb-8 shadow-lg transition-all ${
        isDark 
          ? 'bg-stone-900/90 border-amber-500/30 text-stone-100 shadow-black/40' 
          : 'bg-gradient-to-r from-[#FFFDF9] via-[#FFF8F2] to-[#FFF5F0] border-[#FF671F]/30 shadow-[#FF671F]/5 text-stone-950'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center shrink-0 shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isToday 
                    ? 'bg-emerald-600 text-white animate-pulse' 
                    : isYesterday 
                    ? 'bg-stone-600 text-white' 
                    : 'bg-amber-600 text-white'
                }`}>
                  {isToday 
                    ? (lang === 'en' ? 'Today' : lang === 'hi' ? 'आज' : 'આજે')
                    : isYesterday 
                    ? (lang === 'en' ? 'Yesterday' : lang === 'hi' ? 'बीता कल' : 'ગઈકાલે')
                    : isTomorrow 
                    ? (lang === 'en' ? 'Tomorrow' : lang === 'hi' ? 'कल आने वाला' : 'આવતીકાલે')
                    : (lang === 'en' ? 'Selected Date' : 'चयनित दिनांक')}
                </span>
                <span className={`font-yatra text-lg sm:text-2xl font-bold ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  {activeDateFormatted}
                </span>
              </div>
              <p className={`text-xs font-semibold mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
                <span>{panchang.vikramSamvat}</span>
                <span>•</span>
                <span>{panchang.shakaSamvat}</span>
                <span>•</span>
                <span>{panchang.amantaMonth} मास (कालनिर्णय अमान्त)</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#FF671F]">
                  <MapPin className="w-3 h-3" />
                  {lang === 'en' ? 'Mehsana, Gujarat' : 'स्थान: मेहसाणा, गुजरात'}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Date Switcher Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleSetDayOffset(-1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                isYesterday 
                  ? 'bg-[#FF671F] text-white border-[#FF671F] shadow-sm' 
                  : isDark 
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' 
                  : 'bg-white hover:bg-orange-50 text-stone-800 border-amber-300/60'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Yesterday' : lang === 'hi' ? 'बीता कल' : 'ગઈકાલે'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetDayOffset(0)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                isToday 
                  ? 'bg-[#FF671F] text-white border-[#FF671F] shadow-md ring-2 ring-[#FF671F]/30' 
                  : isDark 
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' 
                  : 'bg-white hover:bg-orange-50 text-stone-800 border-amber-300/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Today' : lang === 'hi' ? 'आज' : 'આજ'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetDayOffset(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                isTomorrow 
                  ? 'bg-[#FF671F] text-white border-[#FF671F] shadow-sm' 
                  : isDark 
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' 
                  : 'bg-white hover:bg-orange-50 text-stone-800 border-amber-300/60'
              }`}
            >
              <span>{lang === 'en' ? 'Tomorrow' : lang === 'hi' ? 'आने वाला कल' : 'આવતીકાલે'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Date Input */}
            <input
              type="date"
              value={dateInputVal}
              onChange={handleDateChange}
              className={`text-xs px-2.5 py-1.5 rounded-xl border font-semibold outline-none cursor-pointer ${
                isDark 
                  ? 'bg-stone-800 border-stone-700 text-amber-300' 
                  : 'bg-white border-amber-300/70 text-[#CC5218]'
              }`}
              title="तारीख चुनें (Select Date)"
            />
          </div>
        </div>

        {/* Vrat / Festival Banner if any */}
        {panchang.vratFestival && (
          <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/30 flex items-center gap-2 text-xs font-bold text-[#CC5218] dark:text-amber-300">
            <Sparkles className="w-4 h-4 text-[#FF671F] shrink-0" />
            <span>
              {lang === 'en' ? 'Today’s Sacred Vrat / Festival: ' : 'आज का विशेष व्रत / पर्व: '}
              <strong>{panchang.vratFestival}</strong>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Panchang Card (8 cols) */}
        <div className={`lg:col-span-8 rounded-3xl p-5 sm:p-7 border shadow-xl space-y-6 ${
          isDark 
            ? 'bg-stone-900/95 border-amber-500/20 shadow-black/40 text-stone-100' 
            : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5 text-stone-950'
        }`}>
          {/* Top Sun / Moon Banner */}
          <div className={`flex flex-wrap justify-between items-center gap-3 pb-4 border-b ${
            isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-[#FF671F] text-white">
                  {lang === 'en' ? 'Kalnirnay Drik Standard' : 'कालनिर्णय दृक मानक'}
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  {panchang.ayan} | {panchang.ritu}
                </span>
              </div>
              <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
                {panchang.purnimantaMonth} (पूर्णिमान्त - उत्तर भारत) | {panchang.amantaMonth} (अमान्त - गुजरात/कालनिर्णय)
              </p>
            </div>

            <div className={`flex flex-wrap items-center gap-3 text-xs font-bold ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Sunrise: ' : 'सूर्योदय: '}<strong>{panchang.sunrise}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'en' ? 'Sunset: ' : 'सूर्यास्त: '}<strong>{panchang.sunset}</strong></span>
              </div>
            </div>
          </div>

          {/* 5 Core Pillars of Panchang (पंच-अंग: तिथि, वार, नक्षत्र, योग, करण) */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
              isDark ? 'text-amber-300' : 'text-[#CC5218]'
            }`}>
              <BookOpen className="w-4 h-4 text-[#FF671F]" />
              <span>{lang === 'en' ? '5 Pillars of Panchang (Panch-Anga)' : 'पंचांग के ५ मुख्य अंग (कालनिर्णय अनुसार)'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 1. Tithi */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <div className="flex justify-between items-start">
                  <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    1. तिथि (Tithi)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-[#CC5218] dark:bg-amber-950 dark:text-amber-300 font-bold">
                    {panchang.paksha}
                  </span>
                </div>
                <span className={`font-bold text-sm sm:text-base block mt-0.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  {panchang.tithi}
                </span>
                <span className={`text-[11px] block mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  अवधि: {panchang.tithiEnding} | देवता: {panchang.tithiLord}
                </span>
              </div>

              {/* 2. Nakshatra */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  2. नक्षत्र (Nakshatra)
                </span>
                <span className={`font-bold text-sm sm:text-base block mt-0.5 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {panchang.nakshatra}
                </span>
                <span className={`text-[11px] block mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  चरण {panchang.nakshatraCharan} | स्वामी: {panchang.nakshatraLord} | समाप्ति: {panchang.nakshatraEnding}
                </span>
              </div>

              {/* 3. Vaar (Day) */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  3. वार (Day of Week)
                </span>
                <span className={`font-bold text-sm sm:text-base block mt-0.5 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {panchang.dayOfWeekHi} ({panchang.dayOfWeekEn})
                </span>
                <span className={`text-[11px] block mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  वारेश (Day Lord): <strong>{panchang.dayLord}</strong>
                </span>
              </div>

              {/* 4. Yoga */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  4. योग (Nitya Yoga)
                </span>
                <span className={`font-bold text-sm sm:text-base block mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                  {panchang.yoga}
                </span>
                <span className={`text-[11px] block mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  अवधि: {panchang.yogaEnding}
                </span>
              </div>

              {/* 5. Karana */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  5. करण (Karana)
                </span>
                <span className={`font-bold text-sm sm:text-base block mt-0.5 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {panchang.karana}
                </span>
                <span className={`text-[11px] block mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  अवधि: {panchang.karanaEnding}
                </span>
              </div>

              {/* Day & Night Duration */}
              <div className={`p-3.5 rounded-2xl border ${
                isDark ? 'bg-amber-950/40 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
              }`}>
                <span className={`text-[11px] block ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                  दिनमान व रात्रिमान (कालनिर्णय)
                </span>
                <span className={`font-bold text-xs sm:text-sm block mt-0.5 ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                  दिन: {panchang.dinmaan}
                </span>
                <span className={`text-[11px] block mt-0.5 ${isDark ? 'text-amber-300/80' : 'text-amber-900'}`}>
                  रात्रि: {panchang.raatrimaan}
                </span>
              </div>
            </div>
          </div>

          {/* Planetary Signs & Disha Shool */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? 'Moon Sign (Chandra Rashi)' : 'चंद्र राशि (Moon Sign)'}
              </span>
              <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                🌙 {panchang.moonSign}
              </span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? 'Sun Sign (Surya Rashi)' : 'सूर्य राशि (Sun Sign)'}
              </span>
              <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                ☀️ {panchang.sunSign}
              </span>
            </div>

            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <span className={`text-[11px] font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                {lang === 'en' ? 'Disha Shool & Remedy' : 'दिशा शूल एवं परिहार'}
              </span>
              <span className={`font-bold text-xs mt-0.5 block text-rose-600 dark:text-rose-400`}>
                वर्जित: {panchang.dishaShool}
              </span>
              <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                उपाय: {panchang.dishaShoolParihar}
              </span>
            </div>
          </div>

          {/* Complete 16 Kalnirnay Choghadiyas */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${
            isDark ? 'bg-stone-800/90 border-amber-500/20' : 'bg-[#FFF5F0] border-[#FF671F]/30'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <h4 className={`font-bold text-sm sm:text-base flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                <Sparkles className="w-4 h-4 text-[#FF671F]" />
                <span>
                  {lang === 'en'
                    ? 'Kalnirnay 16 Choghadiya Muhurats (Day & Night)'
                    : lang === 'hi'
                    ? 'कालनिर्णय प्रामाणिक १६ चौघड़िया मुहूर्त (दिन व रात्रि)'
                    : 'કાલનિર્ણય ૧૬ ચોઘડિયા મુહૂર્ત (દિવસ અને રાત્રિ)'}
                </span>
              </h4>

              {/* Toggle Day / Night View */}
              <div className="flex items-center p-1 rounded-xl bg-white dark:bg-stone-900 border border-[#FF671F]/20 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setChoghadiyaView('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    choghadiyaView === 'all' ? 'bg-[#FF671F] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  सभी (16)
                </button>
                <button
                  type="button"
                  onClick={() => setChoghadiyaView('day')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    choghadiyaView === 'day' ? 'bg-[#FF671F] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  ☀️ दिन के (8)
                </button>
                <button
                  type="button"
                  onClick={() => setChoghadiyaView('night')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    choghadiyaView === 'night' ? 'bg-[#FF671F] text-white shadow-xs' : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  🌙 रात्रि के (8)
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Day Choghadiyas */}
              {(choghadiyaView === 'all' || choghadiyaView === 'day') && (
                <div>
                  <span className={`text-xs font-bold block mb-2 flex items-center gap-1.5 ${
                    isDark ? 'text-amber-300' : 'text-amber-900'
                  }`}>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>दिन के चौघड़िया (सूर्योदय {panchang.sunrise} से सूर्यास्त {panchang.sunset})</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {panchang.dayChoghadiyas.map((c, i) => (
                      <div 
                        key={`day-${i}`} 
                        className={`p-2.5 rounded-xl border text-xs transition-all relative ${
                          c.isCurrent 
                            ? 'ring-2 ring-emerald-500 shadow-md bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500' 
                            : isDark 
                            ? 'bg-stone-900 border-stone-700 text-stone-200' 
                            : 'bg-white border-[#FF671F]/20 text-stone-950'
                        }`}
                      >
                        {c.isCurrent && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white animate-pulse">
                            वर्तमान
                          </span>
                        )}
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-sm ${c.isAuspicious ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {c.name} ({c.type})
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                            c.isAuspicious 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' 
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
                          }`}>
                            {c.isAuspicious ? 'शुभ' : 'अशुभ'}
                          </span>
                        </div>
                        <span className="block text-[11px] font-semibold text-stone-600 dark:text-stone-300 mt-1">
                          ⏰ {c.timeWindow}
                        </span>
                        <span className="block text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1" title={c.effectHi}>
                          {c.effectHi}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Night Choghadiyas */}
              {(choghadiyaView === 'all' || choghadiyaView === 'night') && (
                <div>
                  <span className={`text-xs font-bold block mb-2 flex items-center gap-1.5 ${
                    isDark ? 'text-indigo-300' : 'text-indigo-900'
                  }`}>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>रात्रि के चौघड़िया (सूर्यास्त {panchang.sunset} से अगले सूर्योदय तक)</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {panchang.nightChoghadiyas.map((c, i) => (
                      <div 
                        key={`night-${i}`} 
                        className={`p-2.5 rounded-xl border text-xs transition-all relative ${
                          c.isCurrent 
                            ? 'ring-2 ring-emerald-500 shadow-md bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500' 
                            : isDark 
                            ? 'bg-stone-900 border-stone-700 text-stone-200' 
                            : 'bg-white border-[#FF671F]/20 text-stone-950'
                        }`}
                      >
                        {c.isCurrent && (
                          <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white animate-pulse">
                            वर्तमान
                          </span>
                        )}
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-sm ${c.isAuspicious ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {c.name} ({c.type})
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                            c.isAuspicious 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' 
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
                          }`}>
                            {c.isAuspicious ? 'शुभ' : 'अशुभ'}
                          </span>
                        </div>
                        <span className="block text-[11px] font-semibold text-stone-600 dark:text-stone-300 mt-1">
                          ⏰ {c.timeWindow}
                        </span>
                        <span className="block text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1" title={c.effectHi}>
                          {c.effectHi}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Auspicious & Inauspicious Timers Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Auspicious Muhurats Card */}
          <div className={`rounded-3xl p-5 sm:p-6 border shadow-xl space-y-4 ${
            isDark 
              ? 'bg-stone-900/95 border-emerald-500/30 shadow-black/40' 
              : 'bg-white border-emerald-200 shadow-emerald-500/5'
          }`}>
            <div className={`flex items-center gap-2 font-bold pb-2 border-b ${
              isDark ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-800 border-emerald-100'
            }`}>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>{lang === 'en' ? 'Auspicious Timings (Shubh Muhurat)' : 'आज के शुभ मुहूर्त'}</span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                ✨ अभिजित मुहूर्त (सर्वश्रेष्ठ फलदायी)
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-emerald-200' : 'text-emerald-950'}`}>
                {panchang.abhijitMuhurat}
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block mt-0.5">
                समस्त शुभ व मांगलिक कार्यों हेतु सर्वश्रेष्ठ काल
              </span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                🌅 ब्रह्म मुहूर्त (साधना व अध्ययन)
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                {panchang.brahmaMuhurat}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-orange-50/70 border-orange-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-orange-900'}`}>
                🌇 गोधूलि मुहूर्त
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-stone-200' : 'text-orange-950'}`}>
                {panchang.godhuliMuhurat}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-teal-50/70 border-teal-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-teal-900'}`}>
                🏆 विजय मुहूर्त
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-stone-200' : 'text-teal-950'}`}>
                {panchang.vijayaMuhurat}
              </span>
            </div>
          </div>

          {/* Inauspicious Timers Card */}
          <div className={`rounded-3xl p-5 sm:p-6 border shadow-xl space-y-4 ${
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
              <span className={`text-xs font-bold block ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                ⚠️ राहुकाल (Rahu Kaal - कालनिर्णय अनुसार)
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-rose-200' : 'text-rose-950'}`}>
                {panchang.rahuKaal}
              </span>
              <span className={`text-[11px] block mt-1 ${isDark ? 'text-rose-300/80' : 'text-rose-700'}`}>
                {lang === 'en' ? 'Avoid vital transactions or auspicious beginnings in this window.' : 'इस समय नया कार्य, यात्रा या लेन-देन आरंभ न करें।'}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50 border-amber-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                यमगण्ड (Yamaganda)
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                {panchang.yamaganda}
              </span>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-slate-700'}`}>
                गुलिक काल (Gulika Kaal)
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${isDark ? 'text-stone-200' : 'text-slate-900'}`}>
                {panchang.gulikaKaal}
              </span>
            </div>
          </div>

          {/* Personalized Shubh Muhurat CTA */}
          <div className="bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white p-5 sm:p-6 rounded-3xl shadow-lg">
            <h4 className="font-yatra text-xl mb-1 text-amber-100">
              {lang === 'en' ? 'Personalized Shubh Muhurat' : lang === 'hi' ? 'शास्त्रोक्त शुभ मुहूर्त निकलवाएं' : 'વિશેષ મુહૂર્ત કઢાવો'}
            </h4>
            <p className="text-xs text-amber-100/90 mb-4 leading-relaxed">
              {lang === 'en'
                ? 'Precise astrological Muhurat for Griha Pravesh, Marriage, Vehicle Purchase, Naming & Business Inauguration by Pandit Shri Virendra Kumar Joshi.'
                : lang === 'hi'
                ? 'गृह प्रवेश, विवाह, वाहन क्रय, नामकरण, व्यापार उद्घाटन एवं शुभ कार्यों हेतु पंडित श्री वीरेन्द्र कुमार जोशी जी से व्यक्तिगत मुहूर्त प्राप्त करें।'
                : 'ગૃહ પ્રવેશ, લગ્ન, વાહન ખરીદી અને વેપાર ઉદ્ઘાટન માટે વ્યક્તિગત શુભ મુહૂર્ત.'}
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `नमस्ते पंडित जी 🙏 मुझे शुभ मुहूर्त (गृह प्रवेश/विवाह/व्यापार/वाहन क्रय) निकलवाना है। कृपया समय और मार्गदर्शन प्रदान करें ✨`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-amber-50 text-[#CC5218] font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{lang === 'en' ? 'WhatsApp for Muhurat' : lang === 'hi' ? 'व्हाट्सएप पर मुहूर्त पूछें' : 'વોટ્સએપ પર પૂછો'}</span>
              </a>

              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="w-full bg-black/25 hover:bg-black/40 text-white font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-amber-300/30"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'en' ? 'Call Pandit Ji' : lang === 'hi' ? 'पंडित जी से फोन पर बात करें' : 'પંડિતજી સાથે વાત કરો'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
