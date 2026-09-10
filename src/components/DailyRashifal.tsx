import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Briefcase, Heart, Activity, Gem, Gift, Phone, MessageCircle, 
  Calendar, Clock, Compass, ChevronLeft, ChevronRight, ShieldAlert, BookOpen 
} from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { RajputSymbol } from './RajputSymbol';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';
import { getDailyRashifalForDate } from '../utils/kalnirnayEngine';

interface DailyRashifalProps {
  lang: Language;
  onConsult?: (rashiName: string) => void;
  onSelectRashi?: (rashiId: number) => void;
  isDark?: boolean;
}

export const DailyRashifal: React.FC<DailyRashifalProps> = ({ lang, onSelectRashi, isDark = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRashiId, setSelectedRashiId] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'career' | 'love' | 'health' | 'remedy'>('all');

  // Compute live Rashifal and Panchang for the selected date
  const { panchang, forecasts } = useMemo(() => {
    return getDailyRashifalForDate(selectedDate, lang);
  }, [selectedDate, lang]);

  const selectedForecast = forecasts.find((f) => f.id === selectedRashiId) || forecasts[0];

  const handleSelectRashi = (id: number) => {
    setSelectedRashiId(id);
    if (onSelectRashi) onSelectRashi(id);
  };

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

  // Format date input value (YYYY-MM-DD)
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

  return (
    <div className={`py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border mb-3 shadow-xs ${
          isDark 
            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' 
            : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-[#CC5218] border-amber-400/50'
        }`}>
          <Sparkles className="w-4 h-4 text-[#FF671F]" />
          <span className="font-['Cinzel'] tracking-wide">
            {lang === 'en'
              ? '✦ Authentic Daily Rashifal & Vedic Astrological Forecast ✦'
              : lang === 'hi'
              ? '✦ प्रामाणिक दैनिक राशिफल एवं कालनिर्णय पंचांग फलादेश ✦'
              : '✦ પ્રમાણિક દૈનિક રાશિફળ અને કાલનિર્ણય પંચાંગ ફલાદેશ ✦'}
          </span>
        </div>
        <h2 className="font-['Marcellus'] font-serif text-3xl sm:text-5xl mb-3 tracking-tight text-[#CC5218] dark:text-amber-300">
          {lang === 'en'
            ? 'Today’s Horoscope & Planetary Transits'
            : lang === 'hi'
            ? 'आज का दैनिक राशिफल (12 राशियां)'
            : 'આજનું દૈનિક રાશિફળ (12 રાશિઓ)'}
        </h2>
        <p className={`text-sm sm:text-base font-medium ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
          {lang === 'en'
            ? 'Daily live date, Tithi, planetary transits, lucky metrics, career, love & Vedic remedies aligned with Kalnirnay'
            : lang === 'hi'
            ? 'कालनिर्णय पंचांग व दैनिक गोचर अनुसार सटीक दिनांक, तिथि, नक्षत्र, भाग्य प्रतिशत व अचूक उपाय'
            : 'કાલનિર્ણય પંચાંગ અને દૈનિક ગોચર અનુસાર સચોટ તારીખ, તિથિ, નક્ષત્ર, ભાગ્ય ટકાવારી અને અચૂક ઉપાય'}
        </p>
      </div>

      {/* Prominent Daily Date & Kalnirnay Transit Bar */}
      <div className={`rounded-3xl p-4 sm:p-5 border-2 mb-8 shadow-lg transition-all ${
        isDark 
          ? 'bg-stone-900/90 border-amber-500/30 text-stone-100 shadow-black/40' 
          : 'bg-gradient-to-r from-[#FFFDF9] via-[#FFF8F2] to-[#FFF5F0] border-[#FF671F]/30 shadow-[#FF671F]/5 text-stone-950'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Active Date Banner */}
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
                <span className={`font-yatra text-lg sm:text-xl font-bold ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  {selectedForecast.dateLabel}
                </span>
              </div>
              <p className={`text-xs font-semibold mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
                <span>{panchang.vikramSamvat}</span>
                <span>•</span>
                <span>{panchang.paksha} {panchang.tithi}</span>
                <span>•</span>
                <span>{panchang.nakshatra} ({panchang.nakshatraLord})</span>
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

            {/* Custom Date Picker */}
            <div className="relative">
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
        </div>

        {/* Cosmic Transit Quick Banner */}
        <div className={`mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs ${
          isDark ? 'border-amber-500/20 text-stone-300' : 'border-[#FF671F]/15 text-stone-800'
        }`}>
          <div className="flex items-center gap-1.5 font-medium">
            <Compass className="w-3.5 h-3.5 text-[#FF671F] shrink-0" />
            <span><strong>{lang === 'en' ? 'Moon Transit: ' : 'गोचर चंद्र: '}</strong>{panchang.moonSign}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span><strong>{lang === 'en' ? 'Abhijit Muhurat: ' : 'अभिजित मुहूर्त: '}</strong>{panchang.abhijitMuhurat}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span><strong>{lang === 'en' ? 'Rahu Kaal: ' : 'राहुकाल: '}</strong>{panchang.rahuKaal}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span><strong>{lang === 'en' ? 'Day Lord: ' : 'वार स्वामी: '}</strong>{panchang.dayLord}</span>
          </div>
        </div>
      </div>

      {/* 12 Rashi Grid Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 mb-8">
        {forecasts.map((f) => {
          const isSelected = f.id === selectedRashiId;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => handleSelectRashi(f.id)}
              className={`p-3 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FF671F] via-[#E05314] to-[#B84214] text-white border-amber-300 shadow-xl shadow-[#FF671F]/30 scale-105 z-10'
                  : isDark 
                  ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-amber-500/20 shadow-sm'
                  : 'bg-white hover:bg-gradient-to-b hover:from-amber-50/70 hover:to-orange-50/50 text-stone-950 border-amber-300/40 hover:border-amber-400 shadow-sm'
              }`}
            >
              {/* Daily Lucky Rating Badge on each card */}
              <div className={`absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                isSelected 
                  ? 'bg-amber-300 text-stone-950 shadow-xs' 
                  : isDark 
                  ? 'bg-stone-800 text-amber-300' 
                  : 'bg-amber-100 text-[#CC5218]'
              }`}>
                {f.luckyPercentage}%
              </div>

              <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-sm">{f.symbol}</span>
              <span className="font-bold text-sm sm:text-base">
                {lang === 'en' ? f.nameEn : lang === 'hi' ? f.nameHi : f.nameGu}
              </span>
              <span className={`text-[10px] ${isSelected ? 'text-amber-200 font-semibold' : isDark ? 'text-stone-400 font-medium' : 'text-stone-600 font-medium'}`}>
                {lang === 'en' ? f.nameHi : f.nameEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Rashi Detail Card */}
      <div className={`rounded-3xl p-5 sm:p-8 border-2 shadow-2xl relative overflow-hidden transition-all ${
        isDark 
          ? 'bg-stone-900/95 border-amber-500/40 shadow-black/50' 
          : 'bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF9F2] border-amber-400/40 shadow-xl shadow-amber-900/5'
      }`}>
        {/* Top Details Header */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b ${
          isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center text-3xl shadow-md border border-amber-300 shrink-0">
              {selectedForecast.symbol}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  {lang === 'en'
                    ? `${selectedForecast.nameEn} Daily Horoscope`
                    : lang === 'hi'
                    ? `${selectedForecast.nameHi} राशि आज का दैनिक राशिफल`
                    : `${selectedForecast.nameGu} રાશિ આજનું રાશિફળ`}
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  isDark ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
                }`}>
                  {selectedForecast.nameEn}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500 text-white shadow-xs">
                  {lang === 'en' ? 'Fortune' : 'भाग्य'}: {selectedForecast.luckyPercentage}%
                </span>
              </div>
              <p className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {lang === 'en' ? 'Ruling Planet: ' : 'स्वामी ग्रह: '}
                <span className={`font-bold ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>{selectedForecast.lord}</span> | {lang === 'en' ? 'Element: ' : 'तत्व: '}
                <span className={`font-bold ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>{selectedForecast.element}</span> | {lang === 'en' ? 'Date: ' : 'दिनांक: '}
                <span className={`font-bold text-[#FF671F]`}>{selectedForecast.dateLabel}</span>
              </p>
            </div>
          </div>

          {/* Sub tabs */}
          <div className={`flex flex-wrap items-center p-1 rounded-xl border text-xs sm:text-sm font-semibold ${
            isDark ? 'bg-stone-800 border-stone-700' : 'bg-[#FFF5F0] border-[#FF671F]/20'
          }`}>
            <button
              type="button"
              onClick={() => setActiveSubTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'all' 
                  ? 'bg-[#FF671F] text-white shadow-sm' 
                  : isDark ? 'text-stone-300 hover:text-amber-300' : 'text-stone-900 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'en' ? 'Complete' : lang === 'hi' ? 'संपूर्ण फलादेश' : 'સંપૂર્ણ ફલાદેશ'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('career')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'career' 
                  ? 'bg-[#FF671F] text-white shadow-sm' 
                  : isDark ? 'text-stone-300 hover:text-amber-300' : 'text-stone-900 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'en' ? 'Career' : lang === 'hi' ? 'करियर' : 'કારકિર્દી'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('love')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'love' 
                  ? 'bg-[#FF671F] text-white shadow-sm' 
                  : isDark ? 'text-stone-300 hover:text-amber-300' : 'text-stone-900 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'en' ? 'Love & Family' : lang === 'hi' ? 'प्रेम / परिवार' : 'પ્રેમ / પરિવાર'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('health')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'health' 
                  ? 'bg-[#FF671F] text-white shadow-sm' 
                  : isDark ? 'text-stone-300 hover:text-amber-300' : 'text-stone-900 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'en' ? 'Health' : lang === 'hi' ? 'स्वास्थ्य' : 'આરોગ્ય'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('remedy')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'remedy' 
                  ? 'bg-[#FF671F] text-white shadow-sm' 
                  : isDark ? 'text-stone-300 hover:text-amber-300' : 'text-stone-900 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'en' ? 'Remedies' : lang === 'hi' ? 'अचूक उपाय' : 'અચૂક ઉપાય'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          {/* Main Forecast Content (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Dynamic Transit Moon Influence Note */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-gradient-to-r from-amber-50/70 to-orange-50/70 border-amber-200'
            }`}>
              <div className={`flex items-center gap-2 font-bold text-xs sm:text-sm mb-1 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                <Compass className="w-4 h-4 text-[#FF671F]" />
                <span>{lang === 'en' ? 'Daily Planetary Transit Influence' : 'दैनिक ग्रह गोचर प्रभाव'}</span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-900 font-medium'}`}>
                {selectedForecast.transitInfluence}
              </p>
            </div>

            {/* General Outlook */}
            {(activeSubTab === 'all' || activeSubTab === 'career') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  <Sparkles className="w-4 h-4 text-[#FF671F]" />
                  <span>{lang === 'en' ? 'Today’s General Outlook' : lang === 'hi' ? 'आज का सामान्य फलादेश' : 'આજનું સામાન્ય ફલાદેશ'}</span>
                </div>
                <p className={`text-sm sm:text-base font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedForecast.predictionToday}
                </p>
              </div>
            )}

            {/* Career & Business */}
            {(activeSubTab === 'all' || activeSubTab === 'career') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50/70 border-amber-200/70'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  <Briefcase className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'en' ? 'Career, Job & Wealth Outlook' : lang === 'hi' ? 'करियर, नौकरी एवं आर्थिक स्थिति' : 'કારકિર્દી, નોકરી અને વેપાર'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedForecast.careerToday}
                </p>
              </div>
            )}

            {/* Love & Relationships */}
            {(activeSubTab === 'all' || activeSubTab === 'love') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-rose-950/30 border-rose-500/30' : 'bg-rose-50/70 border-rose-200/70'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{lang === 'en' ? 'Love, Family & Marital Life' : lang === 'hi' ? 'प्रेम, दांपत्य एवं पारिवारिक जीवन' : 'પ્રેમ, દાંપત્ય અને પારિવારિક જીવન'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedForecast.loveToday}
                </p>
              </div>
            )}

            {/* Health & Vitality */}
            {(activeSubTab === 'all' || activeSubTab === 'health') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200/70'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'en' ? 'Health & Daily Vitality' : lang === 'hi' ? 'स्वास्थ्य एवं दैनिक ऊर्जा' : 'આરોગ્ય અને દૈનિક ઊર્જા'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedForecast.healthToday}
                </p>
              </div>
            )}

            {/* Special Upay */}
            {(activeSubTab === 'all' || activeSubTab === 'remedy') && (
              <div className={`p-4 rounded-2xl border ${
                isDark 
                  ? 'bg-gradient-to-r from-stone-800 to-amber-950/40 border-amber-500/30' 
                  : 'bg-gradient-to-r from-[#FFF5F0] to-[#FFEBE0] border-[#FF671F]/40'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  <Gift className="w-4 h-4 text-[#FF671F]" />
                  <span>{lang === 'en' ? 'Today’s Infallible Vedic Remedy' : lang === 'hi' ? 'आज का अचूक वैदिक उपाय' : 'આજનો અચૂક વૈદિક ઉપાય'}</span>
                </div>
                <p className={`text-sm font-semibold ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>
                  🚩 {selectedForecast.upayToday}
                </p>
              </div>
            )}

            {/* Daily Rashi Vedic Mantra */}
            {(activeSubTab === 'all' || activeSubTab === 'remedy') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-amber-50/50 border-amber-200'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'en' ? 'Daily Sacred Rashi Mantra (Chant 108 Times)' : 'दैनिक सिद्ध राशि मंत्र (108 बार जाप करें)'}</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-[#CC5218] dark:text-amber-300 font-serif tracking-wide py-1">
                  ✨ {selectedForecast.mantra}
                </p>
              </div>
            )}

            {/* Caution / Do's & Don'ts */}
            <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs ${
              isDark ? 'bg-rose-950/20 border-rose-800/40 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}>
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">
                  {lang === 'en' ? 'Special Caution Today: ' : 'आज की विशेष सावधानी: '}
                </strong>
                <span>{selectedForecast.cautionToday}</span>
              </div>
            </div>
          </div>

          {/* Auspicious Metrics Sidebar (1 col) */}
          <div className="space-y-4">
            <div className={`rounded-2xl p-5 border space-y-4 ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <h4 className={`font-bold text-sm pb-2 border-b flex items-center gap-2 ${
                isDark ? 'text-amber-300 border-stone-700' : 'text-[#CC5218] border-[#FF671F]/15'
              }`}>
                <Gem className="w-4 h-4 text-[#FF671F]" />
                <span>{lang === 'en' ? 'Today’s Auspicious Factors' : lang === 'hi' ? 'आज के शुभ कारक' : 'આજના શુભ પરિબળો'}</span>
              </h4>

              {/* Lucky Percentage Bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span className={isDark ? 'text-stone-300' : 'text-stone-950'}>
                    {lang === 'en' ? 'Daily Luck Score' : 'दैनिक भाग्य प्रतिशत'}
                  </span>
                  <span className="text-[#FF671F] font-bold">{selectedForecast.luckyPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-[#FF671F] rounded-full transition-all duration-500" 
                    style={{ width: `${selectedForecast.luckyPercentage}%` }}
                  />
                </div>
              </div>

              {/* Lucky Numbers */}
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Lucky Numbers Today' : lang === 'hi' ? 'आज का शुभ अंक (Lucky Numbers)' : 'શુભ અંક'}
                </span>
                <div className="flex gap-2 mt-1">
                  {selectedForecast.luckyNumber.map((num, nIdx) => (
                    <span key={`lucky-num-${nIdx}-${num}`} className="w-8 h-8 rounded-lg bg-[#FF671F] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lucky Color */}
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Lucky Color' : lang === 'hi' ? 'शुभ रंग (Lucky Color)' : 'શુભ રંગ'}
                </span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>
                  {selectedForecast.luckyColor}
                </span>
              </div>

              {/* Favorable Hours */}
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Favorable Time Window' : lang === 'hi' ? 'आज का अनुकूल समय (Shubh Samay)' : 'અનુકૂળ સમય'}
                </span>
                <span className={`font-bold text-xs mt-0.5 block text-emerald-600 dark:text-emerald-400`}>
                  ⏰ {selectedForecast.favorableTime}
                </span>
              </div>

              {/* Auspicious Direction */}
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Auspicious Direction' : lang === 'hi' ? 'अनुकूल दिशा (Auspicious Direction)' : 'શુભ દિશા'}
                </span>
                <span className={`font-bold text-xs mt-0.5 block ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                  🧭 {selectedForecast.favorableDirection}
                </span>
              </div>

              {/* Lucky Gemstone */}
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Auspicious Gemstone' : lang === 'hi' ? 'भाग्यशाली रत्न (Lucky Gemstone)' : 'શુભ રત્ન'}
                </span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  💎 {selectedForecast.luckyStone}
                </span>
              </div>
            </div>

            {/* Direct Consultation CTA Card with Pandit Ji */}
            <div className="bg-gradient-to-br from-[#92400E] via-[#D97706] to-[#B45309] text-white rounded-2xl p-5 shadow-xl shadow-amber-900/20 border border-amber-300/40 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <h4 className="font-['Marcellus'] font-serif text-lg sm:text-xl mb-1 text-amber-100 flex items-center gap-2">
                <RajputSymbol size="sm" />
                <span>
                  {lang === 'en'
                    ? `${selectedForecast.nameEn} Royal Consultation`
                    : lang === 'hi'
                    ? `${selectedForecast.nameHi} राशि व्यक्तिगत ज्योतिषीय समाधान`
                    : `${selectedForecast.nameGu} રાશિ વિશેષ પરામર્શ`}
                </span>
              </h4>
              <p className="text-xs text-amber-100/90 mb-4 leading-relaxed">
                {lang === 'en'
                  ? `Consult Pandit Shri Virendra Kumar Joshi for in-depth Janam Kundli analysis for ${selectedForecast.nameEn} sign.`
                  : lang === 'hi'
                  ? `अपनी जन्मकुंडली, ग्रह दशा एवं ${selectedForecast.nameHi} राशि के व्यक्तिगत समाधान हेतु पंडित जी से परामर्श लें।`
                  : `તમારી જન્મકુંડળી અને ${selectedForecast.nameGu} રાશિના વ્યક્તિગત ઉપાય માટે પંડિતજીનો સંપર્ક કરો.`}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `नमस्ते पंडित जी 🙏 मेरी राशि ${selectedForecast.nameHi} है। आज (${selectedForecast.dateLabel}) के संदर्भ में तथा अपनी कुंडली के बारे में व्यक्तिगत परामर्श लेना चाहता/चाहती हूँ। कृपया मार्गदर्शन करें।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-amber-50 text-[#CC5218] font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === 'en' ? 'Consult on WhatsApp' : lang === 'hi' ? 'व्हाट्सएप पर अपॉइंटमेंट लें' : 'વોટ્સએપ પર પૂછો'}</span>
                  <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp चैट" />
                </a>

                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className="w-full bg-black/25 hover:bg-black/40 text-amber-100 font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-amber-300/30"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'en' ? 'Call Pandit Ji' : lang === 'hi' ? 'पंडित जी से बात करें' : 'પંડિતજી સાથે વાત કરો'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
