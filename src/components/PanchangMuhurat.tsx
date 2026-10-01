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

export const PanchangMuhurat: React.FC<PanchangProps> = ({ lang, isDark = true }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
    <div className="py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 text-slate-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 bg-[#0c1334] text-[#ffd236] border-amber-500/40">
          <Compass className="w-4 h-4 text-[#f99c00]" />
          <span>
            {lang === 'en' 
              ? 'Authentic Kalnirnay Vedic Panchang' 
              : lang === 'hi' 
              ? 'कालनिर्णय शास्त्रोक्त वैदिक पंचांग' 
              : 'કાલનિર્ણય શાસ્ત્રોક્ત વૈદિક પંચાંગ'}
          </span>
        </div>
        <h2 className="font-mukta font-extrabold text-2xl sm:text-4xl mb-2 royal-gold-gradient-text tracking-normal">
          {lang === 'en' 
            ? 'Daily Kalnirnay Panchang & Auspicious Muhurat' 
            : lang === 'hi' 
            ? 'दैनिक कालनिर्णय पंचांग एवं शुभ मुहूर्त' 
            : 'દૈનિક કાલનિર્ણય પંચાંગ અને શુભ મુહૂર્ત'}
        </h2>
        <p className="text-sm font-medium text-slate-300">
          {lang === 'en'
            ? 'Authentic daily Tithi, Nakshatra, Yoga, Karana, Choghadiya & Rahu Kaal computed according to Kalnirnay guidelines for Mehsana and Gujarat'
            : lang === 'hi'
            ? 'कालनिर्णय पंचांग नियमानुसार मेहसाणा, गुजरात व संपूर्ण भारत हेतु प्रामाणिक तिथि, नक्षत्र, योग, करण, राहुकाल व चौघड़िया'
            : 'કાલનિર્ણય પંચાંગ અનુસાર મહેસાણા અને સમગ્ર ગુજરાત માટે પ્રમાણિક તિથિ, નક્ષત્ર, યોગ, કરણ, રાહુકાળ અને ચોઘડિયા'}
        </p>
      </div>

      {/* Date Navigation & Status Bar */}
      <div className="rounded-3xl p-4 sm:p-5 border border-amber-500/30 mb-8 shadow-xl shadow-black/40 bg-[#0c1334] text-slate-100 transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f99c00] to-[#fcbb00] text-black font-bold flex items-center justify-center shrink-0 shadow-md">
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isToday 
                    ? 'bg-emerald-600 text-white animate-pulse' 
                    : isYesterday 
                    ? 'bg-slate-700 text-white' 
                    : 'bg-amber-600 text-black'
                }`}>
                  {isToday 
                    ? (lang === 'en' ? 'Today' : lang === 'hi' ? 'आज' : 'આજે')
                    : isYesterday 
                    ? (lang === 'en' ? 'Yesterday' : lang === 'hi' ? 'बीता कल' : 'ગઈકાલે')
                    : isTomorrow 
                    ? (lang === 'en' ? 'Tomorrow' : lang === 'hi' ? 'कल आने वाला' : 'આવતીકાલે')
                    : (lang === 'en' ? 'Selected Date' : 'चयनित दिनांक')}
                </span>
                <span className="font-yatra text-lg sm:text-2xl font-bold text-[#ffd236]">
                  {activeDateFormatted}
                </span>
              </div>
              <p className="text-xs font-semibold mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-300">
                <span>{panchang.vikramSamvat}</span>
                <span>•</span>
                <span>{panchang.shakaSamvat}</span>
                <span>•</span>
                <span>{panchang.amantaMonth} मास (कालनिर्णय अमान्त)</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#ffd236]">
                  <MapPin className="w-3 h-3 text-[#f99c00]" />
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
                  ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black border-amber-400 shadow-sm' 
                  : 'bg-[#070b1e] hover:bg-[#121b44] text-slate-200 border-white/10'
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
                  ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black border-amber-400 shadow-md ring-2 ring-amber-400/30 font-black' 
                  : 'bg-[#070b1e] hover:bg-[#121b44] text-slate-200 border-white/10'
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
                  ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black border-amber-400 shadow-sm' 
                  : 'bg-[#070b1e] hover:bg-[#121b44] text-slate-200 border-white/10'
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
              className="text-xs px-2.5 py-1.5 rounded-xl border border-white/10 font-semibold outline-none cursor-pointer bg-[#070b1e] text-[#ffd236]"
              title="तारीख चुनें (Select Date)"
            />
          </div>
        </div>

        {/* Vrat / Festival Banner if any */}
        {panchang.vratFestival && (
          <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/30 flex items-center gap-2 text-xs font-bold text-[#ffd236]">
            <Sparkles className="w-4 h-4 text-[#f99c00] shrink-0" />
            <span>
              {lang === 'en' ? 'Today’s Sacred Vrat / Festival: ' : 'आज का विशेष व्रत / पर्व: '}
              <strong>{panchang.vratFestival}</strong>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Panchang Card (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl p-5 sm:p-7 border border-amber-500/30 shadow-2xl shadow-black/50 space-y-6 bg-[#0c1334] text-slate-100">
          {/* Top Sun / Moon Banner */}
          <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black">
                  {lang === 'en' ? 'Kalnirnay Drik Standard' : 'कालनिर्णय दृक मानक'}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {panchang.ayan} | {panchang.ritu}
                </span>
              </div>
              <p className="text-xs font-semibold mt-1 text-slate-300">
                {panchang.purnimantaMonth} (पूर्णिमान्त - उत्तर भारत) | {panchang.amantaMonth} (अमान्त - गुजरात/कालनिर्णय)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#ffd236]">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Sunrise: ' : 'सूर्योदय: '}<strong>{panchang.sunrise}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'en' ? 'Sunset: ' : 'सूर्यास्त: '}<strong>{panchang.sunset}</strong></span>
              </div>
            </div>
          </div>

          {/* 5 Core Pillars of Panchang (पंच-अंग: तिथि, वार, नक्षत्र, योग, करण) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 text-[#ffd236]">
              <BookOpen className="w-4 h-4 text-[#f99c00]" />
              <span>{lang === 'en' ? '5 Pillars of Panchang (Panch-Anga)' : 'पंचांग के ५ मुख्य अंग (कालनिर्णय अनुसार)'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 1. Tithi */}
              <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold block text-slate-300">
                    1. तिथि (Tithi)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/80 text-[#ffd236] border border-amber-500/30 font-bold">
                    {panchang.paksha}
                  </span>
                </div>
                <span className="font-bold text-sm sm:text-base block mt-0.5 text-[#ffd236]">
                  {panchang.tithi}
                </span>
                <span className="text-[11px] block mt-1 text-slate-400">
                  अवधि: {panchang.tithiEnding} | देवता: {panchang.tithiLord}
                </span>
              </div>

              {/* 2. Nakshatra */}
              <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
                <span className="text-[11px] font-bold block text-slate-300">
                  2. नक्षत्र (Nakshatra)
                </span>
                <span className="font-bold text-sm sm:text-base block mt-0.5 text-white">
                  {panchang.nakshatra}
                </span>
                <span className="text-[11px] block mt-1 text-slate-400">
                  चरण {panchang.nakshatraCharan} | स्वामी: {panchang.nakshatraLord} | समाप्ति: {panchang.nakshatraEnding}
                </span>
              </div>

              {/* 3. Vaar (Day) */}
              <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
                <span className="text-[11px] font-bold block text-slate-300">
                  3. वार (Day of Week)
                </span>
                <span className="font-bold text-sm sm:text-base block mt-0.5 text-white">
                  {panchang.dayOfWeekHi} ({panchang.dayOfWeekEn})
                </span>
                <span className="text-[11px] block mt-1 text-slate-400">
                  वारेश (Day Lord): <strong>{panchang.dayLord}</strong>
                </span>
              </div>

              {/* 4. Yoga */}
              <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
                <span className="text-[11px] font-bold block text-slate-300">
                  4. योग (Nitya Yoga)
                </span>
                <span className="font-bold text-sm sm:text-base block mt-0.5 text-emerald-400">
                  {panchang.yoga}
                </span>
                <span className="text-[11px] block mt-1 text-slate-400">
                  अवधि: {panchang.yogaEnding}
                </span>
              </div>

              {/* 5. Karana */}
              <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
                <span className="text-[11px] font-bold block text-slate-300">
                  5. करण (Karana)
                </span>
                <span className="font-bold text-sm sm:text-base block mt-0.5 text-white">
                  {panchang.karana}
                </span>
                <span className="text-[11px] block mt-1 text-slate-400">
                  अवधि: {panchang.karanaEnding}
                </span>
              </div>

              {/* Day & Night Duration */}
              <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-amber-500/30">
                <span className="text-[11px] block text-[#ffd236]">
                  दिनमान व रात्रिमान (कालनिर्णय)
                </span>
                <span className="font-bold text-xs sm:text-sm block mt-0.5 text-slate-200">
                  दिन: {panchang.dinmaan}
                </span>
                <span className="text-[11px] block mt-0.5 text-slate-400">
                  रात्रि: {panchang.raatrimaan}
                </span>
              </div>
            </div>
          </div>

          {/* Planetary Signs & Disha Shool */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
              <span className="text-[11px] font-bold block text-slate-300">
                {lang === 'en' ? 'Moon Sign (Chandra Rashi)' : 'चंद्र राशि (Moon Sign)'}
              </span>
              <span className="font-bold text-sm mt-0.5 block text-[#ffd236]">
                🌙 {panchang.moonSign}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
              <span className="text-[11px] font-bold block text-slate-300">
                {lang === 'en' ? 'Sun Sign (Surya Rashi)' : 'सूर्य राशि (Sun Sign)'}
              </span>
              <span className="font-bold text-sm mt-0.5 block text-[#ffd236]">
                ☀️ {panchang.sunSign}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border bg-[#070b1e] border-white/10 hover:border-amber-400/40 transition-all">
              <span className="text-[11px] font-bold block text-slate-300">
                {lang === 'en' ? 'Disha Shool & Remedy' : 'दिशा शूल एवं परिहार'}
              </span>
              <span className="font-bold text-xs mt-0.5 block text-rose-400">
                वर्जित: {panchang.dishaShool}
              </span>
              <span className="text-[10px] block mt-0.5 text-slate-400">
                उपाय: {panchang.dishaShoolParihar}
              </span>
            </div>
          </div>
        </div>

        {/* Auspicious & Inauspicious Timers Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Auspicious Muhurats Card */}
          <div className="rounded-3xl p-5 sm:p-6 border border-emerald-500/30 shadow-xl shadow-black/40 space-y-4 bg-[#0c1334] text-slate-100">
            <div className="flex items-center gap-2 font-bold pb-2 border-b border-white/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'en' ? 'Auspicious Timings (Shubh Muhurat)' : 'आज के शुभ मुहूर्त'}</span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-emerald-500/30">
              <span className="text-xs font-bold block text-emerald-300">
                ✨ अभिजित मुहूर्त (सर्वश्रेष्ठ फलदायी)
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.abhijitMuhurat}
              </span>
              <span className="text-[10px] text-emerald-300/80 block mt-0.5">
                समस्त शुभ व मांगलिक कार्यों हेतु सर्वश्रेष्ठ काल
              </span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-amber-500/30">
              <span className="text-xs font-bold block text-[#ffd236]">
                🌅 ब्रह्म मुहूर्त (साधना व अध्ययन)
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.brahmaMuhurat}
              </span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-white/10">
              <span className="text-xs font-bold block text-slate-300">
                🌇 गोधूलि मुहूर्त
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.godhuliMuhurat}
              </span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-white/10">
              <span className="text-xs font-bold block text-slate-300">
                🏆 विजय मुहूर्त
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.vijayaMuhurat}
              </span>
            </div>
          </div>

          {/* Inauspicious Timers Card */}
          <div className="rounded-3xl p-5 sm:p-6 border border-rose-500/30 shadow-xl shadow-black/40 space-y-4 bg-[#0c1334] text-slate-100">
            <div className="flex items-center gap-2 font-bold pb-2 border-b border-white/10 text-rose-400">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>{lang === 'en' ? 'Inauspicious Periods (Avoid New Tasks)' : 'अशुभ काल (वर्जित समय)'}</span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-rose-500/30">
              <span className="text-xs font-bold block text-rose-300">
                ⚠️ राहुकाल (Rahu Kaal - कालनिर्णय अनुसार)
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.rahuKaal}
              </span>
              <span className="text-[11px] block mt-1 text-rose-300/80">
                {lang === 'en' ? 'Avoid vital transactions or auspicious beginnings in this window.' : 'इस समय नया कार्य, यात्रा या लेन-देन आरंभ न करें।'}
              </span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-amber-500/30">
              <span className="text-xs font-bold block text-[#ffd236]">
                यमगण्ड (Yamaganda)
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.yamaganda}
              </span>
            </div>

            <div className="p-3 rounded-2xl border bg-[#070b1e] border-white/10">
              <span className="text-xs font-bold block text-slate-300">
                गुलिक काल (Gulika Kaal)
              </span>
              <span className="text-sm font-bold block mt-0.5 text-white">
                {panchang.gulikaKaal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
