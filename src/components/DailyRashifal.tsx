import React, { useState } from 'react';
import { RASHIS } from '../data/astrologyData';
import { Sparkles, Briefcase, Heart, Activity, Gem, Gift, Phone, MessageCircle } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Language } from '../types/astrology';

interface DailyRashifalProps {
  lang: Language;
  onConsult?: (rashiName: string) => void;
  onSelectRashi?: (rashiId: number) => void;
  isDark?: boolean;
}

export const DailyRashifal: React.FC<DailyRashifalProps> = ({ lang, onConsult, onSelectRashi, isDark = false }) => {
  const [selectedRashiId, setSelectedRashiId] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'career' | 'love' | 'health'>('all');

  const handleSelectRashi = (id: number) => {
    setSelectedRashiId(id);
    if (onSelectRashi) onSelectRashi(id);
  };

  const selectedRashi = RASHIS.find((r) => r.id === selectedRashiId) || RASHIS[0];

  return (
    <div className={`py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border mb-3 shadow-xs ${
          isDark 
            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' 
            : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-[#CC5218] border-amber-400/50'
        }`}>
          <Sparkles className="w-4 h-4 text-[#FF671F]" />
          <span className="font-['Cinzel'] tracking-wide">
            {lang === 'en'
              ? '✦ Royal Daily Horoscope & Planetary Transits ✦'
              : lang === 'hi'
              ? '✦ राजज्योतिष दैनिक राशिफल एवं ग्रह गोचर ✦'
              : '✦ રાજજ્યોતિષ દૈનિક રાશિફળ અને ગ્રહ ગોચર ✦'}
          </span>
        </div>
        <h2 className="font-['Marcellus'] font-serif text-3xl sm:text-5xl mb-3 tracking-tight text-[#CC5218] dark:text-amber-300">
          {lang === 'en'
            ? 'Today’s Horoscope (12 Zodiac Signs)'
            : lang === 'hi'
            ? 'आज का राशिफल (12 राशियां)'
            : 'આજનું રાશિફળ (12 રાશિઓ)'}
        </h2>
        <p className={`text-sm sm:text-base font-medium ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
          {lang === 'en'
            ? 'Select your sign to discover your day’s fortune, career, relationships, vitality, and authentic Vedic remedies'
            : lang === 'hi'
            ? 'अपनी राशि चुनें और जानें आज का भाग्य, व्यापार, प्रेम, स्वास्थ्य व अचूक वैदिक उपाय'
            : 'તમારી રાશિ પસંદ કરો અને જાણો આજનું ભાગ્ય, વેપાર, પ્રેમ, આરોગ્ય અને અચૂક વૈદિક ઉપાય'}
        </p>
      </div>

      {/* 12 Rashi Grid Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 mb-8">
        {RASHIS.map((rashi) => {
          const isSelected = rashi.id === selectedRashiId;
          return (
            <button
              key={rashi.id}
              type="button"
              onClick={() => handleSelectRashi(rashi.id)}
              className={`p-3 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FF671F] via-[#E05314] to-[#B84214] text-white border-amber-300 shadow-xl shadow-[#FF671F]/30 scale-105 z-10'
                  : isDark 
                  ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-amber-500/20 shadow-sm'
                  : 'bg-white hover:bg-gradient-to-b hover:from-amber-50/70 hover:to-orange-50/50 text-stone-950 border-amber-300/40 hover:border-amber-400 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-sm">{rashi.symbol}</span>
              <span className="font-bold text-sm sm:text-base">
                {lang === 'en' ? rashi.nameEn : lang === 'hi' ? rashi.nameHi : rashi.nameGu}
              </span>
              <span className={`text-[10px] ${isSelected ? 'text-amber-200 font-semibold' : isDark ? 'text-stone-400 font-medium' : 'text-stone-600 font-medium'}`}>
                {lang === 'en' ? rashi.nameHi : rashi.nameEn}
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
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${
          isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center text-3xl shadow-md border border-amber-300 shrink-0">
              {selectedRashi.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-yatra text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  {lang === 'en'
                    ? `${selectedRashi.nameEn} Horoscope`
                    : lang === 'hi'
                    ? `${selectedRashi.nameHi} राशि राशिफल`
                    : `${selectedRashi.nameGu} રાશિ રાશિફળ`}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                  isDark ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
                }`}>
                  {selectedRashi.nameEn}
                </span>
              </div>
              <p className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
                {lang === 'en' ? 'Ruling Planet: ' : 'स्वामी: '}
                <span className={`font-bold ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>{selectedRashi.lord}</span> | {lang === 'en' ? 'Element: ' : 'तत्व: '}
                <span className={`font-bold ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>{selectedRashi.element}</span>
              </p>
            </div>
          </div>

          {/* Sub tabs */}
          <div className={`flex items-center p-1 rounded-xl border text-xs sm:text-sm font-semibold ${
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
              {lang === 'en' ? 'Love & Marriage' : lang === 'hi' ? 'प्रेम / विवाह' : 'પ્રેમ / લગ્ન'}
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
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          {/* Main Forecast */}
          <div className="lg:col-span-2 space-y-4">
            {(activeSubTab === 'all' || activeSubTab === 'career') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  <Sparkles className="w-4 h-4 text-[#FF671F]" />
                  <span>{lang === 'en' ? 'Today’s General Outlook' : lang === 'hi' ? 'आज का सामान्य फलादेश' : 'આજનું સામાન્ય ફલાદેશ'}</span>
                </div>
                <p className={`text-sm sm:text-base font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedRashi.predictionToday}
                </p>
              </div>
            )}

            {(activeSubTab === 'all' || activeSubTab === 'career') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50/70 border-amber-200/70'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  <Briefcase className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'en' ? 'Career, Job & Business' : lang === 'hi' ? 'करियर, नौकरी एवं व्यापार' : 'કારકિર્દી, નોકરી અને વેપાર'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedRashi.careerToday}
                </p>
              </div>
            )}

            {(activeSubTab === 'all' || activeSubTab === 'love') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-rose-950/30 border-rose-500/30' : 'bg-rose-50/70 border-rose-200/70'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{lang === 'en' ? 'Love, Family & Relationships' : lang === 'hi' ? 'प्रेम, दांपत्य एवं पारिवारिक जीवन' : 'પ્રેમ, દાંપત્ય અને પારિવારિક જીવન'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedRashi.loveToday}
                </p>
              </div>
            )}

            {(activeSubTab === 'all' || activeSubTab === 'health') && (
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200/70'
              }`}>
                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'en' ? 'Health & Vitality' : lang === 'hi' ? 'स्वास्थ्य एवं दैनिक ऊर्जा' : 'આરોગ્ય અને દૈનિક ઊર્જા'}</span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {selectedRashi.healthToday}
                </p>
              </div>
            )}

            {/* Special Upay */}
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
                🚩 {selectedRashi.upayToday}
              </p>
            </div>
          </div>

          {/* Auspicious Metrics Sidebar */}
          <div className="space-y-4">
            <div className={`rounded-2xl p-5 border space-y-4 ${
              isDark ? 'bg-stone-800/80 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
            }`}>
              <h4 className={`font-bold text-sm pb-2 border-b flex items-center gap-2 ${
                isDark ? 'text-amber-300 border-stone-700' : 'text-[#CC5218] border-[#FF671F]/15'
              }`}>
                <Gem className="w-4 h-4 text-[#FF671F]" />
                <span>{lang === 'en' ? 'Auspicious Factors' : lang === 'hi' ? 'आज के शुभ कारक' : 'આજના શુભ પરિબળો'}</span>
              </h4>

              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Lucky Numbers' : lang === 'hi' ? 'शुभ अंक (Lucky Numbers)' : 'શુભ અંક'}
                </span>
                <div className="flex gap-2 mt-1">
                  {selectedRashi.luckyNumber.map((num) => (
                    <span key={num} className="w-8 h-8 rounded-lg bg-[#FF671F] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Lucky Color' : lang === 'hi' ? 'शुभ रंग (Lucky Color)' : 'શુભ રંગ'}
                </span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-amber-200' : 'text-stone-950'}`}>
                  {selectedRashi.luckyColor}
                </span>
              </div>

              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'en' ? 'Auspicious Gemstone' : lang === 'hi' ? 'भाग्यशाली रत्न (Lucky Gemstone)' : 'શુભ રત્ન'}
                </span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  💎 {selectedRashi.luckyStone}
                </span>
              </div>
            </div>

            {/* Direct Consultation CTA Card */}
            <div className="bg-gradient-to-br from-[#92400E] via-[#D97706] to-[#B45309] text-white rounded-2xl p-5 shadow-xl shadow-amber-900/20 border border-amber-300/40 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <h4 className="font-['Marcellus'] font-serif text-lg sm:text-xl mb-1 text-amber-100 flex items-center gap-1.5">
                <span>👑</span>
                <span>
                  {lang === 'en'
                    ? `${selectedRashi.nameEn} Royal Astrological Solution`
                    : lang === 'hi'
                    ? `${selectedRashi.nameHi} राशि राजशाही व्यक्तिगत परामर्श`
                    : `${selectedRashi.nameGu} રાશિ વિશેષ સમાધાન`}
                </span>
              </h4>
              <p className="text-xs text-amber-100/90 mb-4 leading-relaxed">
                {lang === 'en'
                  ? 'Obtain authentic customized astrological remedies and horoscope analysis tailored to your birth chart.'
                  : lang === 'hi'
                  ? 'अपनी जन्म तिथि व समय अनुसार व्यक्तिगत कुंडली और सटीक फलादेश प्राप्त करें।'
                  : 'તમારી જન્મ તારીખ અને સમય અનુસાર વ્યક્તિગત કુંડળી અને સચોટ ફલાદેશ મેળવો.'}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    "नमस्ते पंडित जी 🙏 मुझे अपनी कुंडली दिखानी है और व्यक्तिगत परामर्श लेना है। कृपया अपॉइंटमेंट का समय साझा करें ✨"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-amber-50 text-[#CC5218] font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === 'en' ? 'Consult on WhatsApp' : lang === 'hi' ? 'व्हाट्सएप पर अपॉइंटमेंट लें' : 'વોટ્સએપ પર પૂછો'}</span>
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
