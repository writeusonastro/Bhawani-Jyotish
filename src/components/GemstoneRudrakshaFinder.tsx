import React, { useState } from 'react';
import { Gem, Sparkles, ShieldCheck, CheckCircle2, Phone, MessageCircle, Info, Calendar } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface GemstoneRudrakshaFinderProps {
  lang: 'hi' | 'gu';
  isDark?: boolean;
}

interface RatnaRudrakshaData {
  rashiHi: string;
  rashiGu: string;
  rashiEn: string;
  lordHi: string;
  gemstoneHi: string;
  gemstoneGu: string;
  gemColor: string;
  metalHi: string;
  metalGu: string;
  fingerHi: string;
  fingerGu: string;
  dayHi: string;
  dayGu: string;
  mantra: string;
  rudrakshaHi: string;
  rudrakshaGu: string;
  benefitsHi: string;
  benefitsGu: string;
  substituteStoneHi: string;
}

const RASHI_DATA: RatnaRudrakshaData[] = [
  {
    rashiHi: 'मेष (Aries)',
    rashiGu: 'મેષ (Aries)',
    rashiEn: 'Aries',
    lordHi: 'मंगल (Mars)',
    gemstoneHi: 'लाल मूँगा (Red Coral)',
    gemstoneGu: 'લાલ પરવાળું (Red Coral)',
    gemColor: '#dc2626',
    metalHi: 'तांबा या पंचधातु / सोना',
    metalGu: 'તાંબુ અથવા સોનું',
    fingerHi: 'अनामिका (Ring Finger)',
    fingerGu: 'અનામિકા (Ring Finger)',
    dayHi: 'मंगलवार प्रातःकाल',
    dayGu: 'મંગળવાર સવારે',
    mantra: 'ॐ भौं भौमाय नमः',
    rudrakshaHi: '३ मुखी रुद्राक्ष (3 Mukhi)',
    rudrakshaGu: '૩ મુખી રુદ્રાક્ષ',
    benefitsHi: 'साहस, रक्त शुद्धि, नेतृत्व क्षमता एवं भूमि-भवन लाभ में वृद्धि।',
    benefitsGu: 'સાહસ, આત્મવિશ્વાસ અને જમીન-મકાન લાભ.',
    substituteStoneHi: 'लाल अकीक (Red Agate)'
  },
  {
    rashiHi: 'वृषभ (Taurus)',
    rashiGu: 'વૃષભ (Taurus)',
    rashiEn: 'Taurus',
    lordHi: 'शुक्र (Venus)',
    gemstoneHi: 'हीरा / ओपल (Diamond / Opal)',
    gemstoneGu: 'હીરો / ઓપલ (Diamond / Opal)',
    gemColor: '#38bdf8',
    metalHi: 'चांदी या प्लेटिनम',
    metalGu: 'ચાંદી અથવા પ્લેટિનમ',
    fingerHi: 'मध्यमा या कनिष्ठिका',
    fingerGu: 'વચલી અથવા ટચલી આંગળી',
    dayHi: 'शुक्रवार सूर्योदय पश्चात्',
    dayGu: 'શુક્રવાર સૂર્યોદય પછી',
    mantra: 'ॐ शुं शुक्राय नमः',
    rudrakshaHi: '६ मुखी रुद्राक्ष (6 Mukhi)',
    rudrakshaGu: '૬ મુખી રુદ્રાક્ષ',
    benefitsHi: 'वैवाहिक सुख, आकर्षण, कला-संगीत में सिद्धि और धन-वैभव की प्राप्ति।',
    benefitsGu: 'દાંપત્ય સુખ, ધન-વૈભવ અને કલાત્મક સિદ્ધિ.',
    substituteStoneHi: 'सफेद जरकन (White Zircon)'
  },
  {
    rashiHi: 'मिथुन (Gemini)',
    rashiGu: 'મિથુન (Gemini)',
    rashiEn: 'Gemini',
    lordHi: 'बुध (Mercury)',
    gemstoneHi: 'पन्ना (Emerald)',
    gemstoneGu: 'પન્ના (Emerald)',
    gemColor: '#10b981',
    metalHi: 'सोना या चांदी',
    metalGu: 'સોનું અથવા ચાંદી',
    fingerHi: 'कनिष्ठिका (Little Finger)',
    fingerGu: 'ટચલી આંગળી (Little Finger)',
    dayHi: 'बुधवार प्रातः',
    dayGu: 'બુધવાર સવારે',
    mantra: 'ॐ बुं बुधाय नमः',
    rudrakshaHi: '४ मुखी रुद्राक्ष (4 Mukhi)',
    rudrakshaGu: '૪ મુખી રુદ્રાક્ષ',
    benefitsHi: 'बुद्धि, व्यापार में उन्नति, संवाद कौशल और परीक्षाओं में सफलता।',
    benefitsGu: 'બુદ્ધિ, વેપારમાં પ્રગતિ અને અભ્યાસમાં સફળતા.',
    substituteStoneHi: 'पेरिडॉट या मरगज (Peridot)'
  },
  {
    rashiHi: 'कर्क (Cancer)',
    rashiGu: 'કર્ક (Cancer)',
    rashiEn: 'Cancer',
    lordHi: 'चंद्रमा (Moon)',
    gemstoneHi: 'सच्चा मोती (Natural Pearl)',
    gemstoneGu: 'સાચું મોતી (Pearl)',
    gemColor: '#f1f5f9',
    metalHi: 'शुद्ध चांदी',
    metalGu: 'શુદ્ધ ચાંદી',
    fingerHi: 'कनिष्ठिका (Little Finger)',
    fingerGu: 'ટચલી આંગળી',
    dayHi: 'सोमवार संध्या या प्रातः',
    dayGu: 'સોમવાર સવારે અથવા સાંજે',
    mantra: 'ॐ सों सोमाय नमः',
    rudrakshaHi: '२ मुखी रुद्राक्ष (2 Mukhi)',
    rudrakshaGu: '૨ મુખી રુદ્રાક્ષ',
    benefitsHi: 'मानसिक शांति, अनिद्रा से मुक्ति, माता का सुख और भावनात्मक स्थिरता।',
    benefitsGu: 'માનસિક શાંતિ, અનિદ્રા મુક્તિ અને સુખ-શાંતિ.',
    substituteStoneHi: 'मूनस्टोन (Moonstone)'
  },
  {
    rashiHi: 'सिंह (Leo)',
    rashiGu: 'સિંહ (Leo)',
    rashiEn: 'Leo',
    lordHi: 'सूर्य देव (Sun)',
    gemstoneHi: 'माणिक्य / रूबी (Ruby)',
    gemstoneGu: 'માણેક (Ruby)',
    gemColor: '#e11d48',
    metalHi: 'सोना या तांबा',
    metalGu: 'સોનું અથવા તાંબુ',
    fingerHi: 'अनामिका (Ring Finger)',
    fingerGu: 'અનામિકા (Ring Finger)',
    dayHi: 'रविवार प्रातः सूर्योदय',
    dayGu: 'રવિવાર સૂર્યોદય સમયે',
    mantra: 'ॐ घृणिः सूर्याय नमः',
    rudrakshaHi: '१ मुखी या १२ मुखी रुद्राक्ष',
    rudrakshaGu: '૧ મુખી અથવા ૧૨ મુખી રુદ્રાક્ષ',
    benefitsHi: 'राजकीय पद, मान-सम्मान, पिता का सुख, सरकारी नौकरी और आत्मतेज।',
    benefitsGu: 'સરકારી નોકરી, માન-પ્રતિષ્ઠા અને આત્મવિશ્વાસ.',
    substituteStoneHi: 'लाल गारनेट / तामड़ा (Garnet)'
  },
  {
    rashiHi: 'कन्या (Virgo)',
    rashiGu: 'કન્યા (Virgo)',
    rashiEn: 'Virgo',
    lordHi: 'बुध (Mercury)',
    gemstoneHi: 'पन्ना (Emerald)',
    gemstoneGu: 'પન્ના (Emerald)',
    gemColor: '#059669',
    metalHi: 'सोना या कांसा',
    metalGu: 'સોનું અથવા કાંસું',
    fingerHi: 'कनिष्ठिका (Little Finger)',
    fingerGu: 'ટચલી આંગળી',
    dayHi: 'बुधवार प्रातःकाल',
    dayGu: 'બુધવાર સવારે',
    mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    rudrakshaHi: '४ मुखी रुद्राक्ष (4 Mukhi)',
    rudrakshaGu: '૪ મુખી રુદ્રાક્ષ',
    benefitsHi: 'एकाग्रता, व्यापारिक निर्णय, त्वचा विकार शांति और शेयर बाजार लाभ।',
    benefitsGu: 'વેપારિક નિર્ણય, એકાગ્રતા અને આર્થિક લાભ.',
    substituteStoneHi: 'ग्रीन टूमलाइन (Green Tourmaline)'
  },
  {
    rashiHi: 'तुला (Libra)',
    rashiGu: 'તુલા (Libra)',
    rashiEn: 'Libra',
    lordHi: 'शुक्र (Venus)',
    gemstoneHi: 'ओपल / सफेद पुखराज (Opal / White Sapphire)',
    gemstoneGu: 'ઓપલ / હીરો (Opal / Diamond)',
    gemColor: '#67e8f9',
    metalHi: 'चांदी या व्हाइट गोल्ड',
    metalGu: 'ચાંદી અથવા વ્હાઇટ ગોલ્ડ',
    fingerHi: 'मध्यमा या तर्जनी',
    fingerGu: 'વચલી આંગળી',
    dayHi: 'शुक्रवार प्रातः',
    dayGu: 'શુક્રવાર સવારે',
    mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    rudrakshaHi: '६ मुखी रुद्राक्ष (6 Mukhi)',
    rudrakshaGu: '૬ મુખી રુદ્રાક્ષ',
    benefitsHi: 'लग्जरी लाइफ, प्रेम संबंध, कला-सिनेमा सफलता और व्यक्तित्व निखार।',
    benefitsGu: 'પ્રેમ સંબંધ, વૈભવ અને ઉત્તમ વ્યક્તિત્વ.',
    substituteStoneHi: 'अमेरिकन डायमंड (CZ)'
  },
  {
    rashiHi: 'वृश्चिक (Scorpio)',
    rashiGu: 'વૃશ્ચિક (Scorpio)',
    rashiEn: 'Scorpio',
    lordHi: 'मंगल (Mars)',
    gemstoneHi: 'त्रिकोणीय लाल मूँगा (Red Coral)',
    gemstoneGu: 'ત્રિકોણ લાલ પરવાળું (Red Coral)',
    gemColor: '#b91c1c',
    metalHi: 'तांबा या सोना',
    metalGu: 'તાંબુ અથવા સોનું',
    fingerHi: 'अनामिका (Ring Finger)',
    fingerGu: 'અનામિકા (Ring Finger)',
    dayHi: 'मंगलवार प्रातः',
    dayGu: 'મંગળવાર સવારે',
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    rudrakshaHi: '३ मुखी रुद्राक्ष (3 Mukhi)',
    rudrakshaGu: '૩ મુખી રુદ્રાક્ષ',
    benefitsHi: 'शत्रु भय मुक्ति, भूमि-भवन प्राप्ति, पराक्रम और रक्त दोष शांति।',
    benefitsGu: 'શત્રુ ભય મુક્તિ, જમીન પ્રાપ્તિ અને શૌર્ય.',
    substituteStoneHi: 'रेड जैस्पर (Red Jasper)'
  },
  {
    rashiHi: 'धनु (Sagittarius)',
    rashiGu: 'ધન (Sagittarius)',
    rashiEn: 'Sagittarius',
    lordHi: 'बृहस्पति (Jupiter)',
    gemstoneHi: 'पीला पुखराज (Yellow Sapphire)',
    gemstoneGu: 'પીળો પોખરાજ (Yellow Sapphire)',
    gemColor: '#eab308',
    metalHi: 'शुद्ध सोना या पीतल',
    metalGu: 'શુદ્ધ સોનું અથવા પીત્તળ',
    fingerHi: 'तर्जनी (Index Finger)',
    fingerGu: 'પહેલી આંગળી (Index Finger)',
    dayHi: 'गुरुवार प्रातः शुक्ल पक्ष',
    dayGu: 'ગુરુવાર સવારે',
    mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    rudrakshaHi: '५ मुखी रुद्राक्ष (5 Mukhi)',
    rudrakshaGu: '૫ મુખી રુદ્રાક્ષ',
    benefitsHi: 'उच्च विद्या, आध्यात्मिक उन्नति, संतान सुख, ज्ञान और ईश्वरीय कृपा।',
    benefitsGu: 'ઉચ્ચ શિક્ષણ, સંતાન સુખ, જ્ઞાન અને સમૃદ્ધિ.',
    substituteStoneHi: 'सुनहला (Yellow Topaz)'
  },
  {
    rashiHi: 'मकर (Capricorn)',
    rashiGu: 'મકર (Capricorn)',
    rashiEn: 'Capricorn',
    lordHi: 'शनि देव (Saturn)',
    gemstoneHi: 'नीलम (Blue Sapphire)',
    gemstoneGu: 'નીલમ (Blue Sapphire)',
    gemColor: '#2563eb',
    metalHi: 'पंचधातु या लोहा/चांदी',
    metalGu: 'પંચધાતુ અથવા ચાંદી',
    fingerHi: 'मध्यमा (Middle Finger)',
    fingerGu: 'વચલી આંગળી (Middle Finger)',
    dayHi: 'शनिवार संध्याकाल',
    dayGu: 'શનિવાર સાંજે',
    mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    rudrakshaHi: '७ मुखी या १४ मुखी रुद्राक्ष',
    rudrakshaGu: '૭ મુખી અથવા ૧૪ મુખી રુદ્રાક્ષ',
    benefitsHi: 'कर्मक्षेत्र में स्थिरता, शनि की साढ़ेसाती/ढैय्या शांति, न्याय और धन।',
    benefitsGu: 'શનિની સાડાસાતી શાંતિ, વેપારમાં સ્થિરતા.',
    substituteStoneHi: 'नीली / जामुनिया (Amethyst)'
  },
  {
    rashiHi: 'कुंभ (Aquarius)',
    rashiGu: 'કુંભ (Aquarius)',
    rashiEn: 'Aquarius',
    lordHi: 'शनि देव (Saturn)',
    gemstoneHi: 'नीलम या कटैला (Blue Sapphire / Amethyst)',
    gemstoneGu: 'નીલમ અથવા કટેલા (Amethyst)',
    gemColor: '#1d4ed8',
    metalHi: 'पंचधातु या चांदी',
    metalGu: 'પંચધાતુ અથવા ચાંદી',
    fingerHi: 'मध्यमा (Middle Finger)',
    fingerGu: 'વચલી આંગળી (Middle Finger)',
    dayHi: 'शनिवार सायंकाल',
    dayGu: 'શનિવાર સાંજે',
    mantra: 'ॐ शं शनैश्चराय नमः',
    rudrakshaHi: '७ मुखी रुद्राक्ष (7 Mukhi)',
    rudrakshaGu: '૭ મુખી રુદ્રાક્ષ',
    benefitsHi: 'व्यापारिक विस्तार, अनुसंधान में सिद्धि, आकस्मिक धन लाभ और सुरक्षा।',
    benefitsGu: 'વેપાર વિસ્તાર, સુરક્ષા અને આકસ્મિક ધન લાભ.',
    substituteStoneHi: 'जामुनिया (Amethyst)'
  },
  {
    rashiHi: 'मीन (Pisces)',
    rashiGu: 'મીન (Pisces)',
    rashiEn: 'Pisces',
    lordHi: 'बृहस्पति (Jupiter)',
    gemstoneHi: 'पीला पुखराज (Yellow Sapphire)',
    gemstoneGu: 'પીળો પોખરાજ (Yellow Sapphire)',
    gemColor: '#f59e0b',
    metalHi: 'सोना या अष्टधातु',
    metalGu: 'સોનું અથવા અષ્ટધાતુ',
    fingerHi: 'तर्जनी (Index Finger)',
    fingerGu: 'પહેલી આંગળી (Index Finger)',
    dayHi: 'गुरुवार प्रातः',
    dayGu: 'ગુરુવાર સવારે',
    mantra: 'ॐ बृं बृहस्पतये नमः',
    rudrakshaHi: '५ मुखी रुद्राक्ष (5 Mukhi)',
    rudrakshaGu: '૫ મુખી રુદ્રાક્ષ',
    benefitsHi: 'गुरु कृपा, धर्म-कर्म में रुचि, वैवाहिक जीवन में शांति और ऐश्वर्य।',
    benefitsGu: 'ગુરુ કૃપા, દાંપત્ય સુખ અને આધ્યાત્મિક ઉન્નતિ.',
    substituteStoneHi: 'पीला सिट्रीन (Citrine)'
  }
];

export const GemstoneRudrakshaFinder: React.FC<GemstoneRudrakshaFinderProps> = ({
  lang,
  isDark = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [birthDate, setBirthDate] = useState<string>('');

  const handleDateChange = (dateStr: string) => {
    setBirthDate(dateStr);
    if (!dateStr) return;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      // Western/Sun sign approximation for quick Rashi recommendation
      let idx = 0;
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) idx = 0; // Aries
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) idx = 1; // Taurus
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) idx = 2; // Gemini
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) idx = 3; // Cancer
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) idx = 4; // Leo
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) idx = 5; // Virgo
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) idx = 6; // Libra
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) idx = 7; // Scorpio
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) idx = 8; // Sagittarius
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) idx = 9; // Capricorn
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) idx = 10; // Aquarius
      else idx = 11; // Pisces

      setSelectedIndex(idx);
    }
  };

  const selected = RASHI_DATA[selectedIndex];

  return (
    <div className={`py-12 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 ${
          isDark 
            ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' 
            : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
        }`}>
          <Gem className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'hi' ? 'प्रामाणिक रत्न एवं रुद्राक्ष परामर्श' : 'પ્રમાણિક રત્ન અને રુદ્રાક્ષ પરામર્શ'}</span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'hi' ? 'लकी रत्न एवं रुद्राक्ष रिकमेंडर' : 'લકી રત્ન અને રુદ્રાક્ષ ભલામણ'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
          {lang === 'hi'
            ? 'अपनी जन्म राशि या जन्म तिथि चुनें और जानें अपना भाग्यशाली रत्न, धारण विधि, शुभ दिन व उपयुक्त रुद्राक्ष'
            : 'તમારી જન્મ રાશિ પસંદ કરો અને જાણો તમારો ભાગ્યશાળી રત્ન અને યોગ્ય રુદ્રાક્ષ'}
        </p>
      </div>

      {/* Selector controls: Birth date + Rashi chips */}
      <div 
        className={`rounded-3xl p-6 border shadow-xl mb-8 transition-all ${
          isDark 
            ? 'bg-slate-900 border-amber-500/30 shadow-black/40' 
            : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Quick Date of Birth Input */}
          <div className="md:col-span-4">
            <label className={`block text-xs font-bold mb-1.5 flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
              <Calendar className="w-4 h-4 text-[#FF671F]" />
              <span>{lang === 'hi' ? 'जन्म तारीख से खोजें (Optional):' : 'જન્મ તારીખથી શોધો:'}</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F] ${
                isDark 
                  ? 'bg-slate-950 border-slate-700 text-stone-100' 
                  : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-950'
              }`}
            />
          </div>

          {/* Rashi Grid */}
          <div className="md:col-span-8">
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
              {lang === 'hi' ? 'या अपनी जन्म राशि चुनें:' : 'અથવા તમારી જન્મ રાશિ પસંદ કરો:'}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {RASHI_DATA.map((r, idx) => (
                <button
                  key={r.rashiEn}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                    selectedIndex === idx
                      ? 'bg-[#FF671F] text-white shadow-md scale-105 border border-amber-500'
                      : isDark
                      ? 'bg-slate-800 text-stone-200 hover:bg-slate-700 border border-slate-700'
                      : 'bg-[#FFF5F0] text-stone-950 border border-[#FF671F]/20 hover:bg-[#FFEAE0]'
                  }`}
                >
                  {lang === 'hi' ? r.rashiHi.split(' ')[0] : r.rashiGu.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Recommendation Card */}
      <div 
        className={`rounded-3xl p-6 sm:p-10 border shadow-2xl transition-all relative overflow-hidden ${
          isDark 
            ? 'bg-slate-900/95 border-amber-500/30 text-amber-100 shadow-amber-950/30' 
            : 'bg-white border-[#FF671F]/25 text-stone-950 shadow-[#FF671F]/10'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Gemstone Visual Column */}
          <div className="lg:col-span-5 text-center">
            <div className="relative inline-block">
              {/* Pulsing Gem Aura */}
              <div 
                className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-3xl p-3 flex items-center justify-center border-4 shadow-2xl relative"
                style={{ borderColor: selected.gemColor }}
              >
                <div 
                  className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-4 text-center"
                  style={{ backgroundColor: `${selected.gemColor}15` }}
                >
                  <span className="text-6xl mb-2 drop-shadow-md">💎</span>
                  <h4 className="font-yatra text-xl text-[#CC5218] dark:text-amber-300 font-bold">
                    {lang === 'hi' ? selected.gemstoneHi : selected.gemstoneGu}
                  </h4>
                  <span className="text-xs text-stone-900 dark:text-stone-400 font-bold mt-1">
                    {lang === 'hi' ? `स्वामी ग्रह: ${selected.lordHi}` : `સ્વામી ગ્રહ: ${selected.lordHi}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% शुद्ध एवं लैब प्रमाणित (Certified)</span>
              </span>
            </div>
          </div>

          {/* Right Details Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-xs text-[#FF671F] font-bold uppercase tracking-wider">
                  {lang === 'hi' ? 'राशि फलादेश आधारित सिफारिश' : 'રાશિ આધારિત ભલામણ'}
                </span>
                <h3 className="font-yatra text-2xl sm:text-3xl text-[#CC5218] dark:text-amber-300">
                  {lang === 'hi' ? selected.rashiHi : selected.rashiGu}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs bg-amber-500/15 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full font-bold">
                  {selected.rudrakshaHi}
                </span>
              </div>
            </div>

            {/* Wearing Protocol Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#FFFDF9] border-[#FF671F]/20'}`}>
                <span className="text-stone-950 dark:text-stone-400 block text-xs font-semibold">
                  {lang === 'hi' ? 'उपयुक्त धातु (Metal):' : 'યોગ્ય ધાતુ:'}
                </span>
                <strong className="text-stone-950 dark:text-amber-300 font-bold">
                  {lang === 'hi' ? selected.metalHi : selected.metalGu}
                </strong>
              </div>

              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#FFFDF9] border-[#FF671F]/20'}`}>
                <span className="text-stone-950 dark:text-stone-400 block text-xs font-semibold">
                  {lang === 'hi' ? 'धारण अंगुली (Finger):' : 'પહેરવાની આંગળી:'}
                </span>
                <strong className="text-stone-950 dark:text-amber-300 font-bold">
                  {lang === 'hi' ? selected.fingerHi : selected.fingerGu}
                </strong>
              </div>

              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#FFFDF9] border-[#FF671F]/20'}`}>
                <span className="text-stone-950 dark:text-stone-400 block text-xs font-semibold">
                  {lang === 'hi' ? 'शुभ दिन व समय:' : 'શુભ દિવસ અને સમય:'}
                </span>
                <strong className="text-stone-950 dark:text-amber-300 font-bold">
                  {lang === 'hi' ? selected.dayHi : selected.dayGu}
                </strong>
              </div>

              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#FFFDF9] border-[#FF671F]/20'}`}>
                <span className="text-stone-950 dark:text-stone-400 block text-xs font-semibold">
                  {lang === 'hi' ? 'उपरत्न (Substitute):' : 'ઉપરત્ન:'}
                </span>
                <strong className="text-stone-950 dark:text-amber-300 font-bold">
                  {selected.substituteStoneHi}
                </strong>
              </div>
            </div>

            {/* Energizing Mantra Box */}
            <div className={`p-3.5 rounded-2xl border-l-4 border-amber-500 ${isDark ? 'bg-slate-950 text-amber-200' : 'bg-[#FFF5F0] text-stone-950'}`}>
              <span className="text-xs font-bold text-[#CC5218] dark:text-amber-400 block">
                {lang === 'hi' ? 'प्राण-प्रतिष्ठा सिद्ध मंत्र (108 बार जप करें):' : 'પ્રાણ-પ્રતિષ્ઠા સિદ્ધ મંત્ર:'}
              </span>
              <p className="font-serif font-bold text-sm sm:text-base mt-1 text-stone-950 dark:text-amber-300">
                "{selected.mantra}"
              </p>
            </div>

            {/* Benefits */}
            <p className="text-xs sm:text-sm text-stone-950 dark:text-stone-300 leading-relaxed font-medium">
              <strong className="text-[#CC5218] dark:text-amber-400 font-bold">
                {lang === 'hi' ? 'रत्न एवं रुद्राक्ष के प्रमुख लाभ: ' : 'મુખ્ય લાભો: '}
              </strong>
              {lang === 'hi' ? selected.benefitsHi : selected.benefitsGu}
            </p>

            {/* Consultation CTA */}
            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पंडित जी से फोन पर सलाह लें' : 'પંડિતજી સાથે ફોન પર વાત કરો'}</span>
              </a>

              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मुझे ${selected.rashiHi} के लिए सिद्ध ${selected.gemstoneHi} या ${selected.rudrakshaHi} प्राप्त करने हेतु परामर्श चाहिए।`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'hi' ? 'सिद्ध रत्न ऑर्डर करें (WhatsApp)' : 'રત્ન ઓર્ડર કરો (WhatsApp)'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
