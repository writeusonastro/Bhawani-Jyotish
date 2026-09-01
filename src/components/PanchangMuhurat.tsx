import React from 'react';
import { TODAY_PANCHANG, ASTROLOGER_INFO } from '../data/astrologyData';
import { Compass, Sun, Moon, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface PanchangProps {
  lang: 'hi' | 'gu';
}

export const PanchangMuhurat: React.FC<PanchangProps> = ({ lang }) => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#FF671F]/30 mb-2">
          <Compass className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'hi' ? 'दैनिक वैदिक पंचांग' : 'દૈનિક વૈદિક પંચાંગ'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'आज का पंचांग एवं शुभ मुहूर्त' : 'આજનું પંચાંગ અને શુભ મુહૂર્ત'}
        </h2>
        <p className="text-sm text-stone-900 font-medium">
          {lang === 'hi'
            ? 'मेहसाणा व संपूर्ण गुजरात हेतु दैनिक तिथि, नक्षत्र, राहुकाल, अभिजित मुहूर्त व चौघड़िया'
            : 'મહેસાણા અને ગુજરાત માટે દૈનિક તિથિ, નક્ષત્ર, રાહુકાળ અને ચોઘડિયા'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Panchang Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-2 pb-4 border-b border-[#FF671F]/15">
            <div>
              <h3 className="font-yatra text-2xl text-[#CC5218]">
                {TODAY_PANCHANG.date}
              </h3>
              <p className="text-xs text-stone-900 font-semibold mt-0.5">
                {TODAY_PANCHANG.samvat} | स्थान: मेहसाणा, गुजरात
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-stone-950">
              <div className="flex items-center gap-1">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>सूर्योदय: {TODAY_PANCHANG.sunrise}</span>
              </div>
              <div className="flex items-center gap-1">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>सूर्यास्त: {TODAY_PANCHANG.sunset}</span>
              </div>
            </div>
          </div>

          {/* 5 Core Pillars of Panchang */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
              <span className="text-[11px] text-stone-950 font-bold block">1. तिथि (Tithi)</span>
              <span className="font-bold text-sm text-[#CC5218]">{TODAY_PANCHANG.tithi}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
              <span className="text-[11px] text-stone-950 font-bold block">2. नक्षत्र (Nakshatra)</span>
              <span className="font-bold text-sm text-stone-950">{TODAY_PANCHANG.nakshatra}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
              <span className="text-[11px] text-stone-950 font-bold block">3. पक्ष (Paksha)</span>
              <span className="font-bold text-sm text-stone-950">{TODAY_PANCHANG.paksha}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
              <span className="text-[11px] text-stone-950 font-bold block">4. योग (Yoga)</span>
              <span className="font-bold text-sm text-emerald-800">{TODAY_PANCHANG.yoga}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
              <span className="text-[11px] text-stone-950 font-bold block">5. करण (Karana)</span>
              <span className="font-bold text-sm text-stone-950">{TODAY_PANCHANG.karana}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-[11px] text-amber-800 block">शुभ मुहूर्त (Abhijit)</span>
              <span className="font-bold text-sm text-amber-950">{TODAY_PANCHANG.abhijitMuhurat}</span>
            </div>
          </div>

          {/* Shubh Choghadiya Today */}
          <div className="p-4 rounded-2xl bg-[#FFF5F0] border border-[#FF671F]/30">
            <h4 className="font-bold text-sm text-[#CC5218] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF671F]" />
              <span>{lang === 'hi' ? 'आज के शुभ चौघड़िया मुहूर्त (दिन व रात)' : 'આજના શુભ ચોઘડિયા મુહૂર્ત'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TODAY_PANCHANG.shubhChoghadiya.map((chog, i) => (
                <div key={i} className="flex items-center gap-2 text-xs bg-white p-2.5 rounded-xl border border-[#FF671F]/20 font-semibold text-stone-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{chog}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rahu Kaal & Inauspicious Timers (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-xl shadow-rose-500/5 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold pb-2 border-b border-rose-100">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>अशुभ काल (वर्जित समय)</span>
            </div>

            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <span className="text-xs text-rose-800 font-bold block">⚠️ राहुकाल (Rahu Kaal)</span>
              <span className="text-sm font-bold text-rose-950 block mt-0.5">{TODAY_PANCHANG.rahuKaal}</span>
              <span className="text-[11px] text-rose-700 block mt-1">इस समय नया कार्य, यात्रा या लेन-देन आरंभ न करें।</span>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-xs text-amber-800 font-bold block">यमगण्ड (Yamaganda)</span>
              <span className="text-sm font-bold text-amber-950 block mt-0.5">{TODAY_PANCHANG.yamaganda}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-700 font-bold block">गुलिक काल (Gulika Kaal)</span>
              <span className="text-sm font-bold text-slate-900 block mt-0.5">{TODAY_PANCHANG.gulikaKaal}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white p-5 rounded-3xl shadow-lg">
            <h4 className="font-yatra text-lg mb-1">
              {lang === 'hi' ? 'विशेष मुहूर्त निकलवाएं' : 'વિશેષ મુહૂર્ત કઢાવો'}
            </h4>
            <p className="text-xs text-amber-100 mb-3">
              {lang === 'hi'
                ? 'गृह प्रवेश, विवाह, वाहन क्रय, नामकरण एवं व्यापार उद्घाटन हेतु व्यक्तिगत शुभ लग्न मुहूर्त।'
                : 'ગૃહ પ્રવેશ, લગ્ન, વાહન ખરીદી અને વેપાર ઉદ્ઘાટન માટે શુભ મુહૂર્ત.'}
            </p>
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="w-full bg-white hover:bg-amber-50 text-[#CC5218] font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'मुहूर्त परामर्श हेतु कॉल करें' : 'મુહૂર્ત માટે કોલ કરો'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
