import React, { useState } from 'react';
import { RASHIS } from '../data/astrologyData';
import { Sparkles, Briefcase, Heart, Activity, Gem, Gift, Phone, MessageCircle } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface DailyRashifalProps {
  lang: 'hi' | 'gu';
  onConsult?: (rashiName: string) => void;
  onSelectRashi?: (rashiId: number) => void;
}

export const DailyRashifal: React.FC<DailyRashifalProps> = ({ lang, onConsult, onSelectRashi }) => {
  const [selectedRashiId, setSelectedRashiId] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'career' | 'love' | 'health'>('all');

  const handleSelectRashi = (id: number) => {
    setSelectedRashiId(id);
    if (onSelectRashi) onSelectRashi(id);
  };


  const selectedRashi = RASHIS.find((r) => r.id === selectedRashiId) || RASHIS[0];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#FF671F]/30 mb-2">
          <Sparkles className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'hi' ? 'दैनिक राशिफल एवं ग्रह गोचर' : 'દૈનિક રાશિફળ અને ગ્રહ ગોચર'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'आज का राशिफल (12 राशियां)' : 'આજનું રાશિફળ (12 રાશિઓ)'}
        </h2>
        <p className="text-sm text-stone-900 font-medium">
          {lang === 'hi'
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
              onClick={() => setSelectedRashiId(rashi.id)}
              className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-center relative ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FF671F] to-[#CC5218] text-white border-[#CC5218] shadow-lg shadow-[#FF671F]/30 scale-105 z-10'
                  : 'bg-white hover:bg-[#FFF5F0] text-stone-950 border-[#FF671F]/20 hover:border-[#FF671F]/50 shadow-sm'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{rashi.symbol}</span>
              <span className="font-bold text-sm sm:text-base">
                {lang === 'hi' ? rashi.nameHi : rashi.nameGu}
              </span>
              <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-stone-900 font-bold'}`}>
                {rashi.nameEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Rashi Detail Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5 relative overflow-hidden">
        {/* Top Details Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#FF671F]/15">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center text-3xl shadow-md border border-amber-300">
              {selectedRashi.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-yatra text-2xl sm:text-3xl text-[#CC5218]">
                  {lang === 'hi' ? `${selectedRashi.nameHi} राशि राशिफल` : `${selectedRashi.nameGu} રાશિ રાશિફળ`}
                </h3>
                <span className="text-xs bg-[#FFF5F0] text-[#CC5218] border border-[#FF671F]/30 px-2 py-0.5 rounded-full font-bold">
                  {selectedRashi.nameEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-900 font-medium mt-1">
                स्वामी: <span className="font-bold text-stone-950">{selectedRashi.lord}</span> | तत्व: <span className="font-bold text-stone-950">{selectedRashi.element}</span>
              </p>
            </div>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center bg-[#FFF5F0] p-1 rounded-xl border border-[#FF671F]/20 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveSubTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'all' ? 'bg-[#FF671F] text-white shadow-sm' : 'text-stone-900 font-semibold hover:text-[#CC5218]'}`}
            >
              {lang === 'hi' ? 'संपूर्ण फलादेश' : 'સંપૂર્ણ ફલાદેશ'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('career')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'career' ? 'bg-[#FF671F] text-white shadow-sm' : 'text-stone-900 font-semibold hover:text-[#CC5218]'}`}
            >
              {lang === 'hi' ? 'करियर' : 'કારકિર્દી'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('love')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'love' ? 'bg-[#FF671F] text-white shadow-sm' : 'text-stone-900 font-semibold hover:text-[#CC5218]'}`}
            >
              {lang === 'hi' ? 'प्रेम / विवाह' : 'પ્રેમ / લગ્ન'}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('health')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeSubTab === 'health' ? 'bg-[#FF671F] text-white shadow-sm' : 'text-stone-900 font-semibold hover:text-[#CC5218]'}`}
            >
              {lang === 'hi' ? 'स्वास्थ्य' : 'આરોગ્ય'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          {/* Main Forecast */}
          <div className="lg:col-span-2 space-y-4">
            {(activeSubTab === 'all' || activeSubTab === 'career') && (
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
                <div className="flex items-center gap-2 text-[#CC5218] font-bold text-sm mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF671F]" />
                  <span>{lang === 'hi' ? 'आज का सामान्य फलादेश' : 'આજનું સામાન્ય ફલાદેશ'}</span>
                </div>
                <p className="text-sm sm:text-base text-stone-950 font-medium leading-relaxed">
                  {selectedRashi.predictionToday}
                </p>
              </div>
            )}

            {(activeSubTab === 'all' || activeSubTab === 'career') && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'hi' ? 'करियर, नौकरी एवं व्यापार' : 'કારકિર્દી, નોકરી અને વેપાર'}</span>
                </div>
                <p className="text-sm text-stone-950 font-medium leading-relaxed">
                  {selectedRashi.careerToday}
                </p>
              </div>
            )}

            {(activeSubTab === 'all' || activeSubTab === 'love') && (
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-1.5">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>{lang === 'hi' ? 'प्रेम, दांपत्य एवं पारिवारिक जीवन' : 'પ્રેમ, દાંપત્ય અને પારિવારિક જીવન'}</span>
                </div>
                <p className="text-sm text-stone-950 font-medium leading-relaxed">
                  {selectedRashi.loveToday}
                </p>
              </div>
            )}

            {(activeSubTab === 'all' || activeSubTab === 'health') && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'hi' ? 'स्वास्थ्य एवं दैनिक ऊर्जा' : 'આરોગ્ય અને દૈનિક ઊર્જા'}</span>
                </div>
                <p className="text-sm text-stone-950 font-medium leading-relaxed">
                  {selectedRashi.healthToday}
                </p>
              </div>
            )}

            {/* Special Upay */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF5F0] to-[#FFEBE0] border border-[#FF671F]/40">
              <div className="flex items-center gap-2 text-[#CC5218] font-bold text-sm mb-1.5">
                <Gift className="w-4 h-4 text-[#FF671F]" />
                <span>{lang === 'hi' ? 'आज का अचूक वैदिक उपाय' : 'આજનો અચૂક વૈદિક ઉપાય'}</span>
              </div>
              <p className="text-sm font-semibold text-stone-950">
                🚩 {selectedRashi.upayToday}
              </p>
            </div>
          </div>

          {/* Auspicious Metrics Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#FF671F]/20 space-y-4">
              <h4 className="font-bold text-sm text-[#CC5218] pb-2 border-b border-[#FF671F]/15 flex items-center gap-2">
                <Gem className="w-4 h-4 text-[#FF671F]" />
                <span>{lang === 'hi' ? 'आज के शुभ कारक' : 'આજના શુભ પરિબળો'}</span>
              </h4>

              <div>
                <span className="text-xs text-stone-950 font-bold block">{lang === 'hi' ? 'शुभ अंक (Lucky Numbers)' : 'શુભ અંક'}</span>
                <div className="flex gap-2 mt-1">
                  {selectedRashi.luckyNumber.map((num) => (
                    <span key={num} className="w-8 h-8 rounded-lg bg-[#FF671F] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-stone-950 font-bold block">{lang === 'hi' ? 'शुभ रंग (Lucky Color)' : 'શુભ રંગ'}</span>
                <span className="font-bold text-sm text-stone-950 mt-0.5 block">
                  {selectedRashi.luckyColor}
                </span>
              </div>

              <div>
                <span className="text-xs text-stone-950 font-bold block">{lang === 'hi' ? 'भाग्यशाली रत्न (Lucky Gemstone)' : 'શુભ રત્ન'}</span>
                <span className="font-bold text-sm text-[#CC5218] mt-0.5 block">
                  💎 {selectedRashi.luckyStone}
                </span>
              </div>
            </div>

            {/* Direct Consultation CTA Card */}
            <div className="bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white rounded-2xl p-5 shadow-lg shadow-[#FF671F]/20">
              <h4 className="font-yatra text-lg sm:text-xl mb-1">
                {lang === 'hi' ? `${selectedRashi.nameHi} राशि विशेष समाधान` : `${selectedRashi.nameGu} રાશિ વિશેષ સમાધાન`}
              </h4>
              <p className="text-xs text-amber-100 mb-4 leading-relaxed">
                {lang === 'hi'
                  ? 'अपनी जन्म तिथि व समय अनुसार व्यक्तिगत कुंडली और सटीक फलादेश प्राप्त करें।'
                  : 'તમારી જન્મ તારીખ અને સમય અનુસાર વ્યક્તિગત કુંડળી અને સચોટ ફલાદેશ મેળવો.'}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मुझे ${selectedRashi.nameHi} राशि के विषय में व्यक्तिगत ज्योतिषीय सलाह चाहिए।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-amber-50 text-[#CC5218] font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर प्रश्न पूछें' : 'વોટ્સએપ પર પૂછો'}</span>
                </a>

                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className="w-full bg-black/20 hover:bg-black/30 text-white font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-white/30"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'पंडित जी से बात करें' : 'પંડિતજી સાથે વાત કરો'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
