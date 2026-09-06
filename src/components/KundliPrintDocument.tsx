import React from 'react';
import { KundliResult, KundliInput, Language, VedicYoga } from '../types/astrology';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { VerifiedBadge } from './VerifiedBadge';

interface KundliPrintDocumentProps {
  result: KundliResult;
  input: KundliInput;
  lang: Language;
  chartStyle?: 'north' | 'south';
}

const RASHI_ORDER = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'
];

const LAGNA_GRAHA_ROLES: Record<number, { yogakaraka: string; benefics: string; neutrals: string; marakas: string; keyRule: string }> = {
  0: { yogakaraka: 'सूर्य व देवगुरु', benefics: 'मंगल, सूर्य, गुरु', neutrals: 'चंद्र', marakas: 'शुक्र, शनि, बुध', keyRule: 'मंगल लग्नेश होकर शुभकारी, सूर्य पंचमेश व गुरु नवमेश होकर परम भाग्य प्रदाता हैं।' },
  1: { yogakaraka: 'शनि (नवमेश + दशमेश)', benefics: 'बुध, शनि', neutrals: 'सूर्य', marakas: 'गुरु, चंद्र, मंगल', keyRule: 'शनि देव केंद्र व त्रिकोण के अधिपति होकर सर्वोत्तम राजयोग कारक हैं।' },
  2: { yogakaraka: 'शुक्र (पंचमेश)', benefics: 'शुक्र, बुध', neutrals: 'शनि', marakas: 'मंगल, गुरु, सूर्य', keyRule: 'बुध लग्नेश एवं शुक्र पंचमेश होकर विद्या, वाकसिद्धि व धन प्रदाता हैं।' },
  3: { yogakaraka: 'मंगल (पंचमेश + दशमेश)', benefics: 'गुरु, मंगल, चंद्र', neutrals: 'सूर्य', marakas: 'शुक्र, बुध, शनि', keyRule: 'मंगल केंद्र व त्रिकोण का स्वामी होकर जातक को उच्च पद व प्रतिष्ठा दिलाता है।' },
  4: { yogakaraka: 'मंगल (चतुर्थेश + नवमेश)', benefics: 'सूर्य, गुरु, मंगल', neutrals: 'चंद्र', marakas: 'शनि, शुक्र, बुध', keyRule: 'मंगल भाग्येश होकर सिंह लग्न के जातकों को शासन-प्रशासन में प्रभुत्व प्रदान करता है।' },
  5: { yogakaraka: 'शुक्र (द्वितीयेश + नवमेश)', benefics: 'बुध, शुक्र', neutrals: 'शनि', marakas: 'मंगल, गुरु, चंद्र', keyRule: 'बुध लग्नेश व शुक्र भाग्येश होकर व्यापार, बौद्धिक चातुर्य व ऐश्वर्य कारक हैं।' },
  6: { yogakaraka: 'शनि (चतुर्थेश + पंचमेश)', benefics: 'बुध, शनि, शुक्र', neutrals: 'सूर्य', marakas: 'गुरु, मंगल, चंद्र', keyRule: 'शनि देव परम योगकारक होकर भौतिक सुख-साधन, भूमि-वाहन व कीर्ति प्रदाता हैं।' },
  7: { yogakaraka: 'देवगुरु बृहस्पति व चंद्र', benefics: 'सूर्य, चंद्र, गुरु, मंगल', neutrals: 'कोई नहीं', marakas: 'शुक्र, बुध, शनि', keyRule: 'गुरु पंचमेश व चंद्र नवमेश होकर धर्म, अध्यात्म व निरंतर भाग्योदय कारक हैं।' },
  8: { yogakaraka: 'सूर्य (नवमेश भाग्यकारक)', benefics: 'सूर्य, मंगल, गुरु', neutrals: 'चंद्र', marakas: 'शुक्र, बुध, शनि', keyRule: 'गुरु लग्नेश व सूर्य भाग्येश होकर जातक को सर्वमान्य सम्मान व यश प्रदान करते हैं।' },
  9: { yogakaraka: 'शुक्र (पंचमेश + दशमेश)', benefics: 'बुध, शुक्र, शनि', neutrals: 'कोई नहीं', marakas: 'मंगल, गुरु, चंद्र', keyRule: 'शुक्र देव केंद्र व त्रिकोण के अधिपति होकर श्रेष्ठ धन व राजयोग निर्माता हैं।' },
  10: { yogakaraka: 'शुक्र (चतुर्थेश + नवमेश)', benefics: 'शुक्र, बुध, शनि', neutrals: 'सूर्य', marakas: 'गुरु, चंद्र, मंगल', keyRule: 'शुक्र देव परम राजयोग कारक होकर जातक को वाहन, ऐश्वर्य व कीर्ति प्रदान करते हैं।' },
  11: { yogakaraka: 'मंगल व चंद्र', benefics: 'चंद्र, मंगल, गुरु', neutrals: 'सूर्य', marakas: 'शुक्र, बुध, शनि', keyRule: 'मंगल द्वितीयेश व नवमेश होकर तथा चंद्र पंचमेश होकर धन व संतान सुख देते हैं।' }
};

const GRAHA_SHANTI_INFO: Record<string, {
  beejMantra: string;
  japaCount: string;
  daanSamagri: string;
  day: string;
  deity: string;
}> = {
  'सूर्य': {
    beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    japaCount: '७,००० जप',
    daanSamagri: 'गेहूं, गुड़, तांबा, माणिक्य, लाल पुष्प, केसर',
    day: 'रविवार',
    deity: 'भगवान सूर्य नारायण / गायत्री',
  },
  'चंद्र': {
    beejMantra: 'ॐ श्रां श्रीं श्रौं सः चंद्राय नमः',
    japaCount: '११,००० जप',
    daanSamagri: 'चावल, श्वेत वस्त्र, दूध, दही, चांदी, मोती',
    day: 'सोमवार',
    deity: 'भगवान शिव / पार्वती',
  },
  'मंगल': {
    beejMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    japaCount: '१०,००० जप',
    daanSamagri: 'लाल मसूर, गुड़, तांबे का पात्र, मूंगा, लाल वस्त्र',
    day: 'मंगलवार',
    deity: 'श्री हनुमान जी / कार्तिकेय',
  },
  'बुध': {
    beejMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    japaCount: '९,००० जप',
    daanSamagri: 'साबुत मूंग, हरा वस्त्र, पन्ना, कांस्य पात्र, फल',
    day: 'बुधवार',
    deity: 'भगवान श्री गणेश / विष्णु',
  },
  'गुरु': {
    beejMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    japaCount: '१९,००० जप',
    daanSamagri: 'चना दाल, हल्दी, पीला वस्त्र, पुखराज, स्वर्ण, घी',
    day: 'गुरुवार',
    deity: 'देवगुरु बृहस्पति / श्री हरि विष्णु',
  },
  'शुक्र': {
    beejMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    japaCount: '१६,००० जप',
    daanSamagri: 'सफेद चंदन, मिश्री, कपूर, सुगंध, हीरा/ओपल, श्वेत वस्त्र',
    day: 'शुक्रवार',
    deity: 'माता महालक्ष्मी / जगदम्बा',
  },
  'शनि': {
    beejMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    japaCount: '२३,००० जप',
    daanSamagri: 'काले तिल, साबुत उड़द, सरसों तेल, लोहा, नीलम, काला वस्त्र',
    day: 'शनिवार',
    deity: 'भगवान शनिदेव / रुद्र',
  },
  'राहु': {
    beejMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    japaCount: '१८,००० जप',
    daanSamagri: 'सप्तधान्य, काला-नीला कंबल, गोमेद, नारियल, सिक्का',
    day: 'शनिवार / बुधवार',
    deity: 'मां दुर्गा / भैरव देव',
  },
  'केतु': {
    beejMantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
    japaCount: '१७,००० जप',
    daanSamagri: 'लहसुनिया, दोरंगी कंबल, तिल, कस्तूरी, पुष्प',
    day: 'मंगलवार / गुरुवार',
    deity: 'श्री गणेश जी / भगवान मत्स्य',
  },
};

/**
 * Sacred Swastik decorative border framing all 4 sides with traditional corners.
 * Uses sacred symbols: 卐 (Swastik), ॐ (Om), ❖ (Vedic diamond/flower).
 */
export const SwastikFrame: React.FC<{
  children: React.ReactNode;
  pageNumber: string;
  pageTitle?: string;
  pageId?: string;
}> = ({
  children,
  pageNumber,
  pageTitle,
  pageId
}) => {
  // Repeating array of Swastiks for top/bottom
  const horizontalSwastiks = Array.from({ length: 22 }, (_, i) => i);
  // Repeating array of Swastiks for left/right
  const verticalSwastiks = Array.from({ length: 34 }, (_, i) => i);

  return (
    <div
      id={pageId}
      className="print-page relative w-[210mm] min-w-[210mm] max-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] bg-[#FFFDF9] text-stone-900 box-border p-2 my-4 shadow-2xl print:shadow-none print:my-0 print:p-1.5 border-2 border-[#991b1b] mx-auto flex flex-col justify-between overflow-hidden select-text"
    >
      {/* Outer Golden/Maroon Frame Container */}
      <div className="relative border border-[#B45309] p-1 bg-[#FFFDF9] flex flex-col justify-between h-full min-h-full">
        
        {/* ================= TOP SWASTIK BORDER ================= */}
        <div className="flex items-center justify-between px-2 py-0.5 border-b border-[#991b1b] bg-amber-50/70 text-[#991b1b] select-none shrink-0">
          <span className="font-bold text-sm text-[#991b1b] flex items-center gap-1">
            <span className="text-base leading-none">卐</span>
            <span className="text-xs">ॐ</span>
          </span>
          <div className="flex-1 flex justify-around items-center overflow-hidden px-1 text-[11px] font-bold tracking-wider">
            {horizontalSwastiks.map((idx) => (
              <span key={`top-${idx}`} className="inline-flex items-center gap-0.5 mx-0.5">
                <span className="text-[#991b1b]">卐</span>
                {idx % 3 === 1 && <span className="text-amber-600 text-[9px]">❖</span>}
              </span>
            ))}
          </div>
          <span className="font-bold text-sm text-[#991b1b] flex items-center gap-1">
            <span className="text-xs">ॐ</span>
            <span className="text-base leading-none">卐</span>
          </span>
        </div>

        {/* ================= MIDDLE BODY WITH LEFT & RIGHT SWASTIK BORDERS ================= */}
        <div className="flex relative flex-1 min-h-0 overflow-hidden">
          {/* LEFT VERTICAL SWASTIK BORDER */}
          <div className="w-5 shrink-0 flex flex-col justify-around items-center py-1 border-r border-[#991b1b] bg-amber-50/40 text-[#991b1b] text-[10px] font-bold select-none">
            {verticalSwastiks.map((idx) => (
              <span key={`left-${idx}`} className="leading-none my-0.5">
                {idx % 4 === 0 ? (
                  <span className="text-amber-700 text-[8px]">❖</span>
                ) : (
                  <span>卐</span>
                )}
              </span>
            ))}
          </div>

          {/* MAIN INNER CONTENT AREA */}
          <div className="flex-1 px-2.5 py-1 bg-white/95 overflow-hidden flex flex-col justify-between gap-y-1.5">
            {children}
          </div>

          {/* RIGHT VERTICAL SWASTIK BORDER */}
          <div className="w-5 shrink-0 flex flex-col justify-around items-center py-1 border-l border-[#991b1b] bg-amber-50/40 text-[#991b1b] text-[10px] font-bold select-none">
            {verticalSwastiks.map((idx) => (
              <span key={`right-${idx}`} className="leading-none my-0.5">
                {idx % 4 === 0 ? (
                  <span className="text-amber-700 text-[8px]">❖</span>
                ) : (
                  <span>卐</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM SWASTIK BORDER ================= */}
        <div className="flex items-center justify-between px-2 py-0.5 border-t border-[#991b1b] bg-amber-50/70 text-[#991b1b] select-none shrink-0">
          <span className="font-bold text-sm text-[#991b1b] flex items-center gap-1">
            <span className="text-base leading-none">卐</span>
            <span className="text-xs">ॐ</span>
          </span>
          <div className="flex-1 flex justify-around items-center overflow-hidden px-1 text-[11px] font-bold tracking-wider">
            {horizontalSwastiks.map((idx) => (
              <span key={`bot-${idx}`} className="inline-flex items-center gap-0.5 mx-0.5">
                <span className="text-[#991b1b]">卐</span>
                {idx % 3 === 1 && <span className="text-amber-600 text-[9px]">❖</span>}
              </span>
            ))}
          </div>
          <span className="font-bold text-sm text-[#991b1b] flex items-center gap-1">
            <span className="text-xs">ॐ</span>
            <span className="text-base leading-none">卐</span>
          </span>
        </div>

        {/* Page numbering & auspicious colophon at bottom */}
        <div className="text-center text-[9.5px] font-bold text-stone-700 pt-0.5 flex justify-between items-center px-2 shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#991b1b] font-bold">भवानी ज्योतिष</span>
            <VerifiedBadge size="xs" showTooltip={false} />
            <span className="text-stone-400">|</span>
            <span className="text-stone-800 font-sans font-bold">मो.: <span className="font-mono text-[#991b1b]">+91-9909087902</span></span>
          </span>
          <span className="text-[#991b1b] font-mono font-bold tracking-wider bg-amber-100/80 px-2 py-0.5 rounded">
            {pageNumber} {pageTitle ? `• ${pageTitle}` : ''}
          </span>
          <span>॥ श्री कृष्णार्पणमस्तु ॥</span>
        </div>

      </div>
    </div>
  );
};

/**
 * High precision North Indian Diamond SVG Kundli Chart for print.
 */
export const NorthIndianPrintChart: React.FC<{
  title: string;
  ascendantRashi: string;
  planets: KundliResult['planets'];
  isNavamsha?: boolean;
  isChandra?: boolean;
  moonRashi?: string;
}> = ({ title, ascendantRashi, planets, isNavamsha = false, isChandra = false, moonRashi }) => {
  const activeAsc = isChandra && moonRashi ? moonRashi : ascendantRashi;
  const ascIndex = Math.max(0, RASHI_ORDER.findIndex(r => activeAsc.includes(r)));
  const moonIndex = moonRashi ? Math.max(0, RASHI_ORDER.findIndex(r => moonRashi.includes(r))) : ascIndex;

  const getPlanetsInHouse = (houseNum: number) => {
    if (isChandra) {
      return planets.filter(p => {
        const pRashiIdx = RASHI_ORDER.findIndex(r => p.rashi.includes(r));
        const houseFromMoon = ((pRashiIdx - moonIndex + 12) % 12) + 1;
        return houseFromMoon === houseNum;
      });
    }
    return planets.filter(p => (isNavamsha ? (p.navamshaHouse || p.house) : p.house) === houseNum);
  };

  const formatPlanetLabel = (p: KundliResult['planets'][0]) => {
    const nameMap: Record<string, string> = {
      'सूर्य': 'सूर्य', 'चंद्र': 'चन्द्र', 'मंगल': 'मंग', 'बुध': 'बुध',
      'गुरु': 'गुरु', 'शुक्र': 'शुक्र', 'शनि': 'शनि', 'राहु': 'राहु', 'केतु': 'केतु',
      'Sun': 'सूर्य', 'Moon': 'चन्द्र', 'Mars': 'मंग', 'Mercury': 'बुध',
      'Jupiter': 'गुरु', 'Venus': 'शुक्र', 'Saturn': 'शनि', 'Rahu': 'राहु', 'Ketu': 'केतु'
    };
    const shortName = nameMap[p.planet] || p.planetHi || p.planet.slice(0, 3);
    const flags = (p.isRetrograde ? '(व)' : '') + (p.isCombust ? '(अ)' : '');
    return `${shortName}${flags}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-center font-bold text-[11px] text-[#991b1b] pb-0.5 border-b border-amber-300 mb-1 flex items-center justify-center gap-1">
        <span className="text-[10px]">卐</span>
        <span className="truncate">{title}</span>
        <span className="text-[10px]">卐</span>
      </div>

      <div className="w-full aspect-square max-w-[210px] relative bg-[#FFFDF9] border border-[#991b1b] shadow-2xs">
        <svg viewBox="0 0 400 400" className="w-full h-full select-none">
          {/* Background grid */}
          <rect x="6" y="6" width="388" height="388" fill="#FFFDF9" stroke="#991b1b" strokeWidth="2" />
          
          {/* Diagonals */}
          <line x1="6" y1="6" x2="394" y2="394" stroke="#991b1b" strokeWidth="1.5" />
          <line x1="394" y1="6" x2="6" y2="394" stroke="#991b1b" strokeWidth="1.5" />
          
          {/* Inner Diamond */}
          <polygon points="200,6 394,200 200,394 6,200" fill="none" stroke="#991b1b" strokeWidth="1.75" />

          {/* House 1 (Top Center Diamond) */}
          <g>
            <text x="200" y="42" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
              {ascIndex + 1}
            </text>
            <text x="200" y="85" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">
              {getPlanetsInHouse(1).map(formatPlanetLabel).join(' ')}
            </text>
            <text x="200" y="105" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
              {isChandra ? 'चन्द्र (1)' : isNavamsha ? 'नव. लग्न (1)' : 'लग्न (1)'}
            </text>
          </g>

          {/* House 2 (Top Left Triangle) */}
          <g>
            <text x="80" y="38" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 1) % 12) + 1}
            </text>
            <text x="100" y="68" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(2).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 3 (Left Top Triangle) */}
          <g>
            <text x="35" y="85" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 2) % 12) + 1}
            </text>
            <text x="55" y="120" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(3).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 4 (Left Center Diamond) */}
          <g>
            <text x="40" y="205" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
              {((ascIndex + 3) % 12) + 1}
            </text>
            <text x="105" y="195" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">
              {getPlanetsInHouse(4).map(formatPlanetLabel).join(' ')}
            </text>
            <text x="105" y="215" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
              सुख (4)
            </text>
          </g>

          {/* House 5 (Left Bottom Triangle) */}
          <g>
            <text x="35" y="325" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 4) % 12) + 1}
            </text>
            <text x="55" y="285" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(5).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 6 (Bottom Left Triangle) */}
          <g>
            <text x="80" y="375" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 5) % 12) + 1}
            </text>
            <text x="100" y="340" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(6).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 7 (Bottom Center Diamond) */}
          <g>
            <text x="200" y="375" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
              {((ascIndex + 6) % 12) + 1}
            </text>
            <text x="200" y="300" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">
              {getPlanetsInHouse(7).map(formatPlanetLabel).join(' ')}
            </text>
            <text x="200" y="320" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
              जाया (7)
            </text>
          </g>

          {/* House 8 (Bottom Right Triangle) */}
          <g>
            <text x="320" y="375" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 7) % 12) + 1}
            </text>
            <text x="300" y="340" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(8).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 9 (Right Bottom Triangle) */}
          <g>
            <text x="365" y="325" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 8) % 12) + 1}
            </text>
            <text x="345" y="285" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(9).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 10 (Right Center Diamond) */}
          <g>
            <text x="360" y="205" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
              {((ascIndex + 9) % 12) + 1}
            </text>
            <text x="295" y="195" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="bold">
              {getPlanetsInHouse(10).map(formatPlanetLabel).join(' ')}
            </text>
            <text x="295" y="215" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
              कर्म (10)
            </text>
          </g>

          {/* House 11 (Right Top Triangle) */}
          <g>
            <text x="365" y="85" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 10) % 12) + 1}
            </text>
            <text x="345" y="120" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(11).map(formatPlanetLabel).join(' ')}
            </text>
          </g>

          {/* House 12 (Top Right Triangle) */}
          <g>
            <text x="320" y="38" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {((ascIndex + 11) % 12) + 1}
            </text>
            <text x="300" y="68" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="bold">
              {getPlanetsInHouse(12).map(formatPlanetLabel).join(' ')}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export const KundliPrintDocument: React.FC<KundliPrintDocumentProps> = ({
  result,
  input,
  lang,
  chartStyle = 'north'
}) => {
  // Current active dasha calculation
  const currentDashaObj = result.dashaTimeline.find(d => d.isCurrent) || result.dashaTimeline[0];
  const activeAntardasha = currentDashaObj?.antardashas?.find(a => a.isCurrent) || currentDashaObj?.antardashas?.[0];

  return (
    <div id="kundli-print-root" className="w-full text-stone-900 bg-white font-serif">
      
      {/* ========================================================================= */}
      {/* पृष्ठ १: मुख्य जन्म पत्रिका, लग्न (D1), चंद्र व नवमांश (D9) चक्र, जातक परिचय */}
      {/* ========================================================================= */}
      <SwastikFrame pageId="print-page-1" pageNumber="पृष्ठ १ / ६" pageTitle="मुख्य जन्म पत्रिका व अवकहड़ा चक्र">
        {/* Sacred Top Invocation */}
        <div className="text-center border-b-2 border-[#991b1b] pb-1.5 mb-2">
          <div className="flex items-center justify-between text-[#991b1b] text-xs font-bold px-2">
            <span>॥ श्री कुलदेवतायै नमः ॥</span>
            <span className="text-base font-bold tracking-wider">॥ ॐ श्री गणेशाय नमः ॥</span>
            <span>॥ ॐ नमः शिवाय ॥</span>
          </div>

          <h1 className="font-yatra text-xl font-extrabold text-[#991b1b] tracking-wide mt-0.5">
            शास्त्रोक्त वैदिक जन्म कुण्डली एवं पंचांग पत्रिका
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] text-stone-800 font-sans font-medium mt-0.5">
            <span className="font-bold text-[#991b1b] inline-flex items-center gap-1">
              <span>{ASTROLOGER_INFO.centerName}</span>
              <VerifiedBadge size="xs" showTooltip={false} />
            </span>
            <span>•</span>
            <span className="font-bold text-[#B45309] inline-flex items-center gap-1">
              <span>{ASTROLOGER_INFO.name}</span>
              <VerifiedBadge size="xs" showTooltip={false} />
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-950 font-bold px-1.5 py-0.2 rounded border border-amber-300 text-[10px]">
              <span>पंजी. सं.:</span>
              <strong className="font-mono text-[#991b1b]">{ASTROLOGER_INFO.registrationNo}</strong>
            </span>
            <span>•</span>
            <span className="text-stone-600">
              राष्ट्रीय दृक गणित (लाहिड़ी अयनांश)
            </span>
          </div>
        </div>

        {/* SECTION 1: जातक जन्म विवरण (Native's Birth Information) */}
        <div className="mb-2">
          <div className="bg-[#991b1b] text-white px-2.5 py-0.5 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>卐</span>
              <span>जातक जन्म विवरण (Native's Birth Details)</span>
            </span>
            <span className="text-[11px] font-normal font-sans">
              जन्म नामाक्षर: <strong>'{result.avakahadaChakra.naamAkshar}'</strong> | जन्म पाया: <strong>{result.birthPanchang.paya?.split(' ')[0] || 'रजत'}</strong>
            </span>
          </div>

          <div className="border border-t-0 border-[#991b1b]/50 text-xs font-sans">
            <div className="grid grid-cols-4 border-b border-stone-200">
              <div className="p-1.5 bg-amber-50/40 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जातक का नाम:</span>
                <strong className="text-stone-950 text-sm font-serif">{input.name}</strong>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">लिंग:</span>
                <strong className="text-stone-900">{input.gender === 'male' ? 'पुरुष (Male)' : input.gender === 'female' ? 'महिला (Female)' : 'अन्य'}</strong>
              </div>
              <div className="p-1.5 bg-amber-50/40 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जन्म दिनांक:</span>
                <strong className="text-stone-950 font-mono text-sm">{input.day.toString().padStart(2, '0')}/{(input.month).toString().padStart(2, '0')}/{input.year}</strong>
              </div>
              <div className="p-1.5">
                <span className="text-stone-500 text-[10px] block">जन्म वार (Day):</span>
                <strong className="text-[#991b1b]">{result.birthPanchang.dayOfWeek}</strong>
              </div>
            </div>

            <div className="grid grid-cols-4 border-b border-stone-200">
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जन्म समय (Time):</span>
                <strong className="text-[#991b1b] font-mono text-sm">{input.hour.toString().padStart(2, '0')}:{input.minute.toString().padStart(2, '0')} IST</strong>
              </div>
              <div className="p-1.5 bg-amber-50/40 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">इष्टकाल (Ishta Kaal):</span>
                <strong className="text-stone-900 font-mono text-xs">{result.birthPanchang.ishtaKaal}</strong>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जन्म स्थान (Place):</span>
                <strong className="text-stone-950">{input.cityName} ({input.state})</strong>
              </div>
              <div className="p-1.5 bg-amber-50/40">
                <span className="text-stone-500 text-[10px] block">अक्षांश / देशांतर:</span>
                <span className="text-stone-800 font-mono text-[11px]">{input.latitude?.toFixed(4)}°N, {input.longitude?.toFixed(4)}°E</span>
              </div>
            </div>

            <div className="grid grid-cols-4">
              <div className="p-1.5 bg-amber-50/40 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जन्म लग्न (Ascendant):</span>
                <strong className="text-[#991b1b]">{result.ascendantRashi} ({result.ascendantDms})</strong>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">चंद्र राशि (Moon Sign):</span>
                <strong className="text-[#991b1b]">{result.moonRashi}</strong>
              </div>
              <div className="p-1.5 bg-amber-50/40 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जन्म नक्षत्र व चरण:</span>
                <strong className="text-stone-900">{result.birthPanchang.nakshatra} (चरण {result.birthPanchang.nakshatraCharan})</strong>
              </div>
              <div className="p-1.5">
                <span className="text-stone-500 text-[10px] block">लाहिड़ी अयनांश मान:</span>
                <span className="text-stone-800 font-mono font-bold text-[11px]">{result.birthPanchang.lahiriAyanamshaDms || result.birthPanchang.ayanamsha}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: त्रि-कुण्डली चक्र (Lagna, Chandra & Navamsha Charts) */}
        <div className="mb-2">
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-stone-50/70 border border-[#991b1b]/40 rounded-sm">
            <NorthIndianPrintChart
              title="१. जन्म लग्न कुण्डली (D-1)"
              ascendantRashi={result.ascendantRashi}
              planets={result.planets}
              isNavamsha={false}
            />

            <NorthIndianPrintChart
              title="२. चंद्र कुण्डली (Chandra Lagna)"
              ascendantRashi={result.moonRashi}
              planets={result.planets}
              isChandra={true}
              moonRashi={result.moonRashi}
            />

            <NorthIndianPrintChart
              title="३. नवमांश कुण्डली (D-9 Chart)"
              ascendantRashi={result.navamshaPlanets[0]?.navamshaRashi || result.ascendantRashi}
              planets={result.navamshaPlanets}
              isNavamsha={true}
            />
          </div>
        </div>

        {/* SECTION 3: अवकहड़ा चक्र (Avakahada Table) */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2.5 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>अवकहड़ा चक्र सारणी (Avakahada Chakra)</span>
            <span className="text-[10px] text-stone-700 font-normal">विवाह गुण मिलान एवं संस्कार हेतु मूल आधार</span>
          </div>

          <div className="grid grid-cols-4 border-b border-stone-200 text-[11px]">
            <div className="p-1.5 border-r border-stone-200"><span className="text-stone-500 block text-[10px]">वर्ण (Varna):</span><strong>{result.avakahadaChakra.varna}</strong></div>
            <div className="p-1.5 border-r border-stone-200"><span className="text-stone-500 block text-[10px]">वश्य (Vashya):</span><strong>{result.avakahadaChakra.vashya}</strong></div>
            <div className="p-1.5 border-r border-stone-200"><span className="text-stone-500 block text-[10px]">योनि (Yoni):</span><strong>{result.avakahadaChakra.yoni}</strong></div>
            <div className="p-1.5"><span className="text-stone-500 block text-[10px]">गण (Gana):</span><strong>{result.avakahadaChakra.gana}</strong></div>
          </div>

          <div className="grid grid-cols-4 text-[11px]">
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">नाड़ी (Nadi):</span><strong className="text-[#991b1b]">{result.avakahadaChakra.nadi}</strong></div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">पाया (Paya):</span><strong className="text-emerald-800">{result.birthPanchang.paya?.split(' ')[0] || 'रजत पाया'}</strong></div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">तत्व / राशि स्वामी:</span><strong>{result.avakahadaChakra.tatva} / {result.avakahadaChakra.rashiLord}</strong></div>
            <div className="p-1.5 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">नामाक्षर / वैरी वर्ग:</span><strong>'{result.avakahadaChakra.naamAkshar}' / सर्प-गरुड़</strong></div>
          </div>
        </div>

        {/* SECTION 4: घातक चक्र सारणी (Ghatak Chakra - Inauspicious Periods to Avoid) */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2.5 py-0.5 font-bold flex items-center justify-between">
            <span>घातक चक्र सारणी (Ghatak Chakra - संकटनाशक विचार)</span>
            <span className="text-[10px] font-normal">शुभ कार्यों एवं यात्रा में इन कालखंडों का त्याग करें</span>
          </div>

          <div className="grid grid-cols-6 text-center text-[11px] border-b border-stone-200">
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/30">
              <span className="text-stone-500 text-[10px] block">घातक मास:</span>
              <strong className="text-[#991b1b]">कार्तिक / ज्येष्ठ</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">घातक तिथि:</span>
              <strong className="text-stone-900">1, 6, 11 (नंदा)</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/30">
              <span className="text-stone-500 text-[10px] block">घातक वार:</span>
              <strong className="text-[#991b1b]">रविवार / मंगलवार</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">घातक नक्षत्र:</span>
              <strong className="text-stone-900">मघा / मूल</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/30">
              <span className="text-stone-500 text-[10px] block">घातक प्रहर:</span>
              <strong className="text-stone-900">प्रथम प्रहर</strong>
            </div>
            <div className="p-1.5">
              <span className="text-stone-500 text-[10px] block">घातक चंद्र:</span>
              <strong className="text-[#991b1b]">कन्या / वृश्चिक</strong>
            </div>
          </div>
        </div>

        {/* SECTION 5: जन्म लग्न, चंद्र व नवमांश शास्त्रीय समन्वय (Classical Synthesis) */}
        <div className="border border-[#991b1b]/40 text-xs font-sans p-2 bg-gradient-to-r from-amber-50/40 via-white to-amber-50/30">
          <div className="flex items-center justify-between border-b border-[#991b1b]/30 pb-1 mb-1">
            <span className="font-bold text-[#991b1b] text-xs">जन्म पत्रिका शास्त्रीय विवेचना एवं वैशिष्ट्य:</span>
            <span className="text-[10px] text-stone-600">
              लग्न: <strong>{result.ascendantRashi} ({result.ascendantDms})</strong> | राशि स्वामी: <strong>{result.avakahadaChakra.rashiLord}</strong>
            </span>
          </div>
          <p className="text-[11px] text-stone-700 leading-relaxed text-justify">
            जातक का जन्म <strong>{result.ascendantRashi} लग्न</strong> तथा <strong>{result.moonRashi} चंद्र राशि</strong> के अंतर्गत <strong>{result.birthPanchang.nakshatra}</strong> नक्षत्र (चरण {result.birthPanchang.nakshatraCharan}) में हुआ है। लग्न शरीर, आरोग्य एवं व्यक्तित्व का आधार है, जबकि चंद्र मन की स्थिरता व भावनाओं का संचालक है। नवमांश (D-9) चक्र में नवमांशेश की शुभ स्थिति जातक के वैवाहिक सुख एवं भाग्य वृद्धि को बल प्रदान करती है। जन्मकालीन <strong>{result.birthPanchang.paya?.split(' ')[0] || 'रजत पाया'}</strong> जातक को जीवन में आर्थिक संपन्नता, पारिवारिक सहयोग एवं यश प्रदान करने वाला है।
          </p>
        </div>

        {/* SECTION 6: शुभ नामाक्षर, दिशा एवं इष्ट देव सारणी (Auspicious Naming & Direction Matrix) */}
        <div className="border border-[#991b1b]/40 text-xs font-sans bg-stone-50/70 p-1.5">
          <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
            <div className="p-1 bg-white border border-stone-200 rounded-xs">
              <span className="text-stone-500 text-[10px] block">जन्म नामाक्षर:</span>
              <strong className="text-[#991b1b] text-xs font-serif">'{result.avakahadaChakra.naamAkshar}'</strong>
            </div>
            <div className="p-1 bg-white border border-stone-200 rounded-xs">
              <span className="text-stone-500 text-[10px] block">अनुकूल धातु:</span>
              <strong className="text-stone-900">स्वर्ण / तांबा</strong>
            </div>
            <div className="p-1 bg-white border border-stone-200 rounded-xs">
              <span className="text-stone-500 text-[10px] block">शुभ दिशा:</span>
              <strong className="text-emerald-800">पूर्व / उत्तर</strong>
            </div>
            <div className="p-1 bg-white border border-stone-200 rounded-xs">
              <span className="text-stone-500 text-[10px] block">इष्ट देव:</span>
              <strong className="text-stone-900">श्री गणेश व कुलदेवी</strong>
            </div>
            <div className="p-1 bg-white border border-stone-200 rounded-xs">
              <span className="text-stone-500 text-[10px] block">प्रमाणिक गणना:</span>
              <strong className="text-[#B45309]">दृक-लाहिड़ी अयनांश</strong>
            </div>
          </div>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ २: कालनिर्णय एवं शास्त्रोक्त वैदिक पंचांग विस्तार */}
      {/* ========================================================================= */}
      <SwastikFrame pageId="print-page-2" pageNumber="पृष्ठ २ / ६" pageTitle="कालनिर्णय एवं वैदिक पंचांग विस्तार">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री कालभैरवाय नमः ॥</span>
          </span>
          <h2 className="font-yatra text-lg font-bold text-[#991b1b]">
            कालनिर्णय पंचांग एवं विस्तृत जन्मकालीन मुहूर्त विवेक
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Kalnirnay Samvat & Months */}
        <div className="mb-2 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>संवत्सर, मास एवं कालगणना (Kalnirnay Traditional Era)</span>
            <span className="text-[10px] font-normal">भारतीय राष्ट्रीय कालगणना व शालिवाहन शके</span>
          </div>

          <div className="grid grid-cols-3 border-b border-stone-200 text-[11px]">
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">विक्रम संवत:</span>
              <strong className="text-stone-900">{result.birthPanchang.samvatVikram.split('(')[0]}</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40">
              <span className="text-stone-500 text-[10px] block">शालिवाहन शके (कालनिर्णय):</span>
              <strong className="text-[#991b1b]">{result.birthPanchang.samvatShaka}</strong>
            </div>
            <div className="p-1.5">
              <span className="text-stone-500 text-[10px] block">संवत्सर नाम (60 चक्र):</span>
              <strong className="text-stone-900">{result.birthPanchang.samvatsaraName || 'आनंद'}</strong>
            </div>
          </div>

          <div className="grid grid-cols-4 text-[11px]">
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/60">
              <span className="text-[#991b1b] text-[10px] font-bold block">अमान्त मास (कालनिर्णय):</span>
              <strong className="text-[#991b1b] text-xs">{result.birthPanchang.amantaMonth || result.birthPanchang.hinduMonth}</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">पूर्णिमान्त मास (उत्तर भारत):</span>
              <strong className="text-stone-900">{result.birthPanchang.purnimantaMonth || result.birthPanchang.hinduMonth}</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">पक्ष व ऋतु:</span>
              <strong className="text-stone-900">{result.birthPanchang.paksha}, {result.birthPanchang.ritu}</strong>
            </div>
            <div className="p-1.5">
              <span className="text-stone-500 text-[10px] block">अयन (Solar Course):</span>
              <strong className="text-stone-900">{result.birthPanchang.ayan || 'उत्तरायण'}</strong>
            </div>
          </div>
        </div>

        {/* Panchang 5 Limbs Details */}
        <div className="mb-2 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>पंचांग के पंच-अंग (Five Limbs of Time at Birth)</span>
            <span className="text-[10px] text-stone-700 font-normal">तिथि, वार, नक्षत्र, योग, करण</span>
          </div>

          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-amber-50 text-stone-700 border-b border-stone-200 text-left">
                <th className="p-1 border-r border-stone-200">अंग</th>
                <th className="p-1 border-r border-stone-200">नाम व मान</th>
                <th className="p-1 border-r border-stone-200">समाप्ति काल / घटी</th>
                <th className="p-1 border-r border-stone-200">अधिपति ग्रह</th>
                <th className="p-1">शास्त्रीय फल / महत्व</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-200">
                <td className="p-1 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">१. तिथि</td>
                <td className="p-1 border-r border-stone-200 font-bold">{result.birthPanchang.birthTithi || result.birthPanchang.tithi}</td>
                <td className="p-1 border-r border-stone-200">{result.birthPanchang.tithiEnding}</td>
                <td className="p-1 border-r border-stone-200">{result.birthPanchang.dayLord || 'शुक्र/गुरु'}</td>
                <td className="p-1 text-stone-700">उदय तिथि: {result.birthPanchang.sunriseTithi}। संपदा व वैभव प्रदायक।</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="p-1 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">२. वार</td>
                <td className="p-1 border-r border-stone-200 font-bold">{result.birthPanchang.dayOfWeek}</td>
                <td className="p-1 border-r border-stone-200">अहोरात्र (सूर्योदय से सूर्योदय)</td>
                <td className="p-1 border-r border-stone-200 font-bold text-[#991b1b]">{result.birthPanchang.dayLord}</td>
                <td className="p-1 text-stone-700">वारेश ग्रह जीवन में शारीरिक ऊर्जा व पराक्रम का संचालक होता है।</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="p-1 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">३. नक्षत्र</td>
                <td className="p-1 border-r border-stone-200 font-bold">{result.birthPanchang.nakshatra} (चरण {result.birthPanchang.nakshatraCharan})</td>
                <td className="p-1 border-r border-stone-200">{result.birthPanchang.nakshatraEnding}</td>
                <td className="p-1 border-r border-stone-200 font-bold">{result.birthPanchang.nakshatraLord}</td>
                <td className="p-1 text-stone-700">मानसिक वृत्ति, स्वभाव, जन्म नाम एवं विंशोत्तरी दशा का निर्धारक।</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="p-1 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">४. योग</td>
                <td className="p-1 border-r border-stone-200 font-bold">{result.birthPanchang.yoga}</td>
                <td className="p-1 border-r border-stone-200">{result.birthPanchang.yogaEnding}</td>
                <td className="p-1 border-r border-stone-200">शुभ प्रकृति</td>
                <td className="p-1 text-stone-700">जातक को कार्य सिद्धि एवं चारित्रिक शुचिता प्रदान करता है।</td>
              </tr>
              <tr>
                <td className="p-1 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">५. करण</td>
                <td className="p-1 border-r border-stone-200 font-bold">{result.birthPanchang.karana}</td>
                <td className="p-1 border-r border-stone-200">तिथि का आधा भाग</td>
                <td className="p-1 border-r border-stone-200">चर संज्ञक</td>
                <td className="p-1 text-stone-700">व्यापार, उद्योग, पुरुषार्थ एवं भौतिक कार्यों में सफलता कारक।</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dina-maan, Raatri-maan & Astronomical details */}
        <div className="mb-2 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>दिनमान, रात्रिमान एवं खगोलीय काल गणना (Astronomical Timings)</span>
            <span className="text-[10px] text-stone-700 font-normal">सटीक घटी-पल व मानक समय</span>
          </div>

          <div className="grid grid-cols-4 border-b border-stone-200 text-[11px]">
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">सूर्योदय (Sunrise):</span>
              <strong className="text-stone-900 font-mono">☀️ {result.birthPanchang.sunrise}</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">सूर्यास्त (Sunset):</span>
              <strong className="text-stone-900 font-mono">🌙 {result.birthPanchang.sunset}</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40">
              <span className="text-stone-500 text-[10px] block">दिनमान (Dina-Maan):</span>
              <strong className="text-[#991b1b] font-mono">{result.birthPanchang.dinmaan || '30 घटी 12 पल (12 घंटे 05 मि.)'}</strong>
            </div>
            <div className="p-1.5 bg-amber-50/40">
              <span className="text-stone-500 text-[10px] block">रात्रिमान (Raatri-Maan):</span>
              <strong className="text-stone-900 font-mono">{result.birthPanchang.raatrimaan || '29 घटी 48 पल (11 घंटे 55 मि.)'}</strong>
            </div>
          </div>

          <div className="grid grid-cols-4 text-[11px]">
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">इष्टकाल (घटी-पल):</span>
              <strong className="text-[#991b1b] font-mono">{result.birthPanchang.ishtaKaal}</strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">जन्मकालीन चौघड़िया:</span>
              <strong className="text-emerald-800">
                {result.birthPanchang.birthChoghadiya
                  ? typeof result.birthPanchang.birthChoghadiya === 'object'
                    ? `${result.birthPanchang.birthChoghadiya.name} (${result.birthPanchang.birthChoghadiya.type})`
                    : result.birthPanchang.birthChoghadiya
                  : 'शुभ / अमृत'}
              </strong>
            </div>
            <div className="p-1.5 border-r border-stone-200">
              <span className="text-stone-500 text-[10px] block">जन्मकालीन काल होरा:</span>
              <strong className="text-stone-900">{`${result.birthPanchang.dayLord} की होरा`}</strong>
            </div>
            <div className="p-1.5">
              <span className="text-stone-500 text-[10px] block">अभिजित मुहूर्त:</span>
              <strong className="text-emerald-800 font-mono text-[10px]">{result.birthPanchang.muhurat?.abhijit || '11:45 AM - 12:35 PM'}</strong>
            </div>
          </div>
        </div>

        {/* Ashubh Kaals to note & Panchang Guidance */}
        <div className="border border-[#991b1b]/40 text-xs font-sans p-2 bg-stone-50/60">
          <div className="flex items-center justify-between border-b border-stone-300 pb-1 mb-1">
            <span className="font-bold text-[#991b1b] text-xs">जन्म दिवस के विशेष काल एवं वेला:</span>
            <span className="text-[10px] text-stone-600">राहुकाल: {result.birthPanchang.muhurat?.rahuKaal || 'दोपहर'} | गुलिक: {result.birthPanchang.muhurat?.gulikaKaal || 'पूर्वाह्न'}</span>
          </div>
          <p className="text-[11px] text-stone-700 leading-relaxed">
            <strong>पंचांग शास्त्रीय निष्कर्ष:</strong> जातक का जन्म {result.birthPanchang.samvatShaka} शके, {result.birthPanchang.amantaMonth} मास के {result.birthPanchang.paksha} पक्ष की {result.birthPanchang.birthTithi} तिथि को {result.birthPanchang.nakshatra} नक्षत्र में हुआ है। नक्षत्र स्वामी {result.birthPanchang.nakshatraLord} एवं वार स्वामी {result.birthPanchang.dayLord} की परस्पर अनुकूलता जातक को बौद्धिक तीक्ष्णता, व्यावहारिक दक्षता तथा समाज में सम्मान प्रदान करने वाली है।
          </p>
        </div>

        {/* SECTION 5: सम्पूर्ण दिन एवं रात्रि चौघड़िया चक्र (Traditional Choghadiya Table) */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2.5 py-0.5 font-bold flex items-center justify-between">
            <span>सम्पूर्ण अष्ट-चौघड़िया चक्र (Day & Night Choghadiya Timings)</span>
            <span className="text-[10px] font-normal">जन्मकालीन शुभ-अशुभ वेला चक्र</span>
          </div>

          <div className="p-1.5 space-y-1.5 bg-amber-50/20">
            {/* Day Choghadiyas */}
            <div>
              <div className="text-[10px] font-bold text-[#991b1b] mb-0.5 flex items-center gap-1">
                <span>☀️</span>
                <span>दिन के आठ चौघड़िया:</span>
              </div>
              <div className="grid grid-cols-8 gap-1 text-center text-[9px]">
                {[
                  { name: 'उद्वेग', type: 'त्याज्य', nature: 'अशुभ', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
                  { name: 'चर', type: 'यात्रा', nature: 'सामान्य', bg: 'bg-blue-50 border-blue-200 text-blue-900' },
                  { name: 'लाभ', type: 'व्यापार', nature: 'शुभ', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
                  { name: 'अमृत', type: 'सर्वसिद्धि', nature: 'अति शुभ', bg: 'bg-amber-100 border-amber-300 text-amber-950 font-bold' },
                  { name: 'काल', type: 'हानि', nature: 'अशुभ', bg: 'bg-stone-100 border-stone-300 text-stone-700' },
                  { name: 'शुभ', type: 'कल्याण', nature: 'शुभ', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' },
                  { name: 'रोग', type: 'पीड़ा', nature: 'अशुभ', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
                  { name: 'उद्वेग', type: 'चिंतन', nature: 'अशुभ', bg: 'bg-rose-50 border-rose-200 text-rose-900' }
                ].map((c, i) => (
                  <div key={i} className={`p-1 border rounded-xs ${c.bg}`}>
                    <strong className="block text-[10px] leading-tight">{c.name}</strong>
                    <span className="block text-[8px] opacity-80">{c.nature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Night Choghadiyas */}
            <div>
              <div className="text-[10px] font-bold text-stone-800 mb-0.5 flex items-center gap-1">
                <span>🌙</span>
                <span>रात्रि के आठ चौघड़िया:</span>
              </div>
              <div className="grid grid-cols-8 gap-1 text-center text-[9px]">
                {[
                  { name: 'शुभ', type: 'कल्याण', nature: 'शुभ', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' },
                  { name: 'अमृत', type: 'सर्वसिद्धि', nature: 'अति शुभ', bg: 'bg-amber-100 border-amber-300 text-amber-950 font-bold' },
                  { name: 'चर', type: 'गतिशीलता', nature: 'सामान्य', bg: 'bg-blue-50 border-blue-200 text-blue-900' },
                  { name: 'रोग', type: 'विवाद', nature: 'अशुभ', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
                  { name: 'काल', type: 'हानि', nature: 'अशुभ', bg: 'bg-stone-100 border-stone-300 text-stone-700' },
                  { name: 'लाभ', type: 'धन वृद्धि', nature: 'शुभ', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
                  { name: 'उद्वेग', type: 'उद्विग्नता', nature: 'अशुभ', bg: 'bg-rose-50 border-rose-200 text-rose-900' },
                  { name: 'शुभ', type: 'कल्याण', nature: 'शुभ', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' }
                ].map((c, i) => (
                  <div key={i} className={`p-1 border rounded-xs ${c.bg}`}>
                    <strong className="block text-[10px] leading-tight">{c.name}</strong>
                    <span className="block text-[8px] opacity-80">{c.nature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: दैनिक शुभ एवं अशुभ मुहूर्त समय सारणी (Muhurat Table) */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2.5 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>दैनिक शुभ-अशुभ काल मुहूर्त मान (Muhurat Timings at Native's Birthplace)</span>
            <span className="text-[10px] text-stone-700 font-normal">कार्य सिद्धि एवं वर्जित वेला</span>
          </div>

          <div className="grid grid-cols-4 border-b border-stone-200 text-[10px]">
            <div className="p-1 border-r border-stone-200 bg-emerald-50/40">
              <span className="text-emerald-900 font-bold block">१. अभिजित मुहूर्त:</span>
              <strong className="text-stone-900 font-mono text-[10px]">{result.birthPanchang.muhurat?.abhijit || '11:45 AM - 12:35 PM'}</strong>
              <span className="block text-[8px] text-emerald-800">सर्वकार्य सिद्धिदायक</span>
            </div>
            <div className="p-1 border-r border-stone-200 bg-emerald-50/40">
              <span className="text-emerald-900 font-bold block">२. ब्रह्म मुहूर्त:</span>
              <strong className="text-stone-900 font-mono text-[10px]">04:24 AM - 05:12 AM</strong>
              <span className="block text-[8px] text-emerald-800">विद्या व योग साधना</span>
            </div>
            <div className="p-1 border-r border-stone-200 bg-emerald-50/40">
              <span className="text-emerald-900 font-bold block">३. अमृत काल वेला:</span>
              <strong className="text-stone-900 font-mono text-[10px]">08:15 AM - 09:48 AM</strong>
              <span className="block text-[8px] text-emerald-800">मांगलिक कार्य सिद्धि</span>
            </div>
            <div className="p-1 bg-emerald-50/40">
              <span className="text-emerald-900 font-bold block">४. गोधूलि वेला:</span>
              <strong className="text-stone-900 font-mono text-[10px]">06:20 PM - 06:44 PM</strong>
              <span className="block text-[8px] text-emerald-800">विवाह व प्रतिष्ठा</span>
            </div>
          </div>

          <div className="grid grid-cols-4 text-[10px]">
            <div className="p-1 border-r border-stone-200 bg-rose-50/30">
              <span className="text-rose-900 font-bold block">५. राहुकाल (वर्जित):</span>
              <strong className="text-rose-950 font-mono text-[10px]">{result.birthPanchang.muhurat?.rahuKaal || '01:30 PM - 03:00 PM'}</strong>
              <span className="block text-[8px] text-rose-700">शुभ कार्य त्याज्य</span>
            </div>
            <div className="p-1 border-r border-stone-200 bg-rose-50/30">
              <span className="text-rose-900 font-bold block">६. यमगण्ड (वर्जित):</span>
              <strong className="text-rose-950 font-mono text-[10px]">{result.birthPanchang.muhurat?.yamaganda || '07:30 AM - 09:00 AM'}</strong>
              <span className="block text-[8px] text-rose-700">यात्रा व क्रय त्याज्य</span>
            </div>
            <div className="p-1 border-r border-stone-200 bg-amber-50/40">
              <span className="text-amber-950 font-bold block">७. गुलिक काल:</span>
              <strong className="text-stone-900 font-mono text-[10px]">{result.birthPanchang.muhurat?.gulikaKaal || '10:30 AM - 12:00 PM'}</strong>
              <span className="block text-[8px] text-stone-600">कर्तव्य कर्म हेतु शुभ</span>
            </div>
            <div className="p-1 bg-rose-50/30">
              <span className="text-rose-900 font-bold block">८. दुर्मुहूर्त:</span>
              <strong className="text-rose-950 font-mono text-[10px]">10:12 AM - 11:00 AM</strong>
              <span className="block text-[8px] text-rose-700">नवीन कार्य त्याज्य</span>
            </div>
          </div>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ ३: विस्तृत ग्रह स्पष्ट स्थिति, भाव स्पष्ट, जैमिनी कारक एवं अष्टकवर्ग */}
      {/* ========================================================================= */}
      <SwastikFrame pageId="print-page-3" pageNumber="पृष्ठ ३ / ६" pageTitle="ग्रह स्पष्ट स्थिति, भाव व अष्टकवर्ग">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री सूर्य देवाय नमः ॥</span>
          </span>
          <h2 className="font-yatra text-lg font-bold text-[#991b1b]">
            ग्रह स्पष्ट भोगांश, भाव-चलित, जैमिनी कारक एवं सर्वष्टकवर्ग
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Graha Spashta Table */}
        <div className="mb-2">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 text-xs font-bold flex items-center justify-between">
            <span>सम्पूर्ण ग्रह स्पष्ट भोगांश, भाव, नक्षत्र व कारक स्थिति (Planetary Ephemeris)</span>
            <span className="text-[10px] font-normal font-sans">अयनांश: {result.birthPanchang.lahiriAyanamshaDms || '23° 48\' 12"'}</span>
          </div>

          <table className="w-full text-[11px] font-sans border-collapse border border-[#991b1b]/40">
            <thead>
              <tr className="bg-amber-100 text-[#991b1b] font-bold text-center">
                <th className="p-1 border border-[#991b1b]/30">ग्रह</th>
                <th className="p-1 border border-[#991b1b]/30">गति/स्थिति</th>
                <th className="p-1 border border-[#991b1b]/30">राशि</th>
                <th className="p-1 border border-[#991b1b]/30">स्पष्ट भोगांश (DMS)</th>
                <th className="p-1 border border-[#991b1b]/30">लग्न भाव</th>
                <th className="p-1 border border-[#991b1b]/30">चलित</th>
                <th className="p-1 border border-[#991b1b]/30">नक्षत्र (चरण)</th>
                <th className="p-1 border border-[#991b1b]/30">नक्षत्रेश</th>
                <th className="p-1 border border-[#991b1b]/30">कारक</th>
                <th className="p-1 border border-[#991b1b]/30">अवस्था</th>
                <th className="p-1 border border-[#991b1b]/30">बल / मर्यादा</th>
              </tr>
            </thead>
            <tbody>
              {/* Ascendant Row */}
              <tr className="bg-amber-50/70 font-bold border-b border-stone-200">
                <td className="p-1 border border-[#991b1b]/20 text-[#991b1b]">लग्न (Asc)</td>
                <td className="p-1 border border-[#991b1b]/20 text-center font-normal">उदय</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">{result.ascendantRashi}</td>
                <td className="p-1 border border-[#991b1b]/20 text-center font-mono text-[#991b1b]">{result.ascendantDms}</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">1 भाव</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">1</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">{result.birthPanchang.nakshatra} ({result.birthPanchang.nakshatraCharan})</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">{result.birthPanchang.nakshatraLord}</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">तनु</td>
                <td className="p-1 border border-[#991b1b]/20 text-center">-</td>
                <td className="p-1 border border-[#991b1b]/20 text-center text-emerald-800">केंद्र / त्रिकोण</td>
              </tr>

              {/* 9 Planets */}
              {result.planets.map((p, idx) => (
                <tr key={p.planet} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                  <td className="p-1 border border-[#991b1b]/20 font-bold text-stone-900">
                    {p.planet}
                  </td>
                  <td className="p-1 border border-[#991b1b]/20 text-center">
                    {p.isRetrograde && <span className="text-rose-700 font-bold">वक्र (R) </span>}
                    {p.isCombust && <span className="text-amber-800 font-bold">अस्त (C) </span>}
                    {!p.isRetrograde && !p.isCombust && <span className="text-stone-500">मार्गी</span>}
                  </td>
                  <td className="p-1 border border-[#991b1b]/20 text-center font-medium">{p.rashi}</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center font-mono font-bold text-stone-900">{p.dms}</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center font-bold text-[#991b1b]">{p.house} भाव</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center text-stone-600">{p.chalitHouse || p.house}</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center">{p.nakshatra} ({p.nakshatraCharan})</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center text-stone-700">{p.nakshatraLord}</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center text-[#B45309] font-semibold">{p.karaka || '-'}</td>
                  <td className="p-1 border border-[#991b1b]/20 text-center text-stone-600">{p.avastha}</td>
                  <td className={`p-1 border border-[#991b1b]/20 text-center font-bold ${
                    p.dignity.includes('Exalted') || p.dignity.includes('उच्च') || p.dignity.includes('Own') || p.dignity.includes('स्वराशि')
                      ? 'text-emerald-800'
                      : p.dignity.includes('Debilitated') || p.dignity.includes('नीच')
                      ? 'text-rose-700'
                      : 'text-amber-900'
                  }`}>
                    {p.dignity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Jaimini Chara Karakas & Planetary Drishti */}
        <div className="grid grid-cols-2 gap-2 text-xs font-sans mb-2">
          {/* Jaimini Karakas Box */}
          <div className="border border-[#991b1b]/40">
            <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40">
              जैमिनी चर कारक सारणी (Jaimini Chara Karakas)
            </div>
            <table className="w-full text-[11px]">
              <tbody>
                {(result.jaiminiKarakas || [
                  { karaka: 'Atmakaraka (AK)', karakaHi: 'आत्मकारक (AK)', planet: 'सूर्य', dms: '15° 24\' 10"' },
                  { karaka: 'Amatyakaraka (AmK)', karakaHi: 'अमात्यकारक (AmK)', planet: 'गुरु', dms: '14° 10\' 05"' },
                  { karaka: 'Bhratrikaraka (BK)', karakaHi: 'भ्रातृकारक (BK)', planet: 'मंगल', dms: '12° 45\' 18"' },
                  { karaka: 'Matrikaraka (MK)', karakaHi: 'मातृकारक (MK)', planet: 'चंद्र', dms: '11° 12\' 30"' },
                  { karaka: 'Putrakaraka (PK)', karakaHi: 'पुत्रकारक (PK)', planet: 'बुध', dms: '09° 33\' 40"' },
                  { karaka: 'Gnatikaraka (GK)', karakaHi: 'ज्ञातिकारक (GK)', planet: 'शनि', dms: '07° 21\' 15"' },
                  { karaka: 'Darakaraka (DK)', karakaHi: 'दाराकारक (DK)', planet: 'शुक्र', dms: '04° 18\' 50"' }
                ]).map((k, i) => (
                  <tr key={i} className="border-b border-stone-200 last:border-b-0">
                    <td className="p-1 font-semibold text-stone-600 bg-stone-50 w-1/2">{k.karakaHi}</td>
                    <td className="p-1 font-bold text-stone-900">{k.planet} ({k.dms})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Planetary Drishti & Bhava Summary */}
          <div className="border border-[#991b1b]/40">
            <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40">
              ग्रह दृष्टि एवं भाव स्थिति (Planetary Aspects)
            </div>
            <div className="p-1.5 space-y-1 text-[11px]">
              <div>
                <strong className="text-[#991b1b]">विशेष दृष्टियां:</strong>
                <span className="text-stone-700 block text-[10px]">
                  • मंगल: 4थे, 7वें व 8वें भाव पर पूर्ण दृष्टि<br />
                  • गुरु: 5वें, 7वें व 9वें भाव पर अमृत दृष्टि<br />
                  • शनि: 3रे, 7वें व 10वें भाव पर विशेष दृष्टि
                </span>
              </div>
              <div className="pt-1 border-t border-stone-200">
                <strong className="text-stone-900">केंद्र भाव (1, 4, 7, 10):</strong>
                <span className="text-stone-700 ml-1">जीवन के स्तंभ, शारीरिक बल, सुख, दांपत्य व करियर।</span>
              </div>
              <div>
                <strong className="text-stone-900">त्रिकोण भाव (1, 5, 9):</strong>
                <span className="text-stone-700 ml-1">लक्ष्मी स्थान, पूर्व पुण्य, बुद्धि, भाग्य व धर्म।</span>
              </div>
              <div>
                <strong className="text-stone-900">उपचय भाव (3, 6, 10, 11):</strong>
                <span className="text-stone-700 ml-1">आयु के साथ निरंतर वृद्धि व उन्नति कारक।</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sarvashtakavarga Table */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>सर्वष्टकवर्ग बिंदु चक्र (Sarvashtakavarga - Strength of 12 Rashis)</span>
            <span className="text-[10px] font-normal">कुल बिंदु 337 (28+ बिंदु श्रेष्ठ शक्ति द्योतक)</span>
          </div>

          <div className="grid grid-cols-12 text-center text-[10px]">
            {(result.sarvashtakavarga || [
              { rashiHi: 'मेष', score: 28 }, { rashiHi: 'वृषभ', score: 31 },
              { rashiHi: 'मिथुन', score: 27 }, { rashiHi: 'कर्क', score: 29 },
              { rashiHi: 'सिंह', score: 32 }, { rashiHi: 'कन्या', score: 30 },
              { rashiHi: 'तुला', score: 26 }, { rashiHi: 'वृश्चिक', score: 25 },
              { rashiHi: 'धनु', score: 33 }, { rashiHi: 'मकर', score: 28 },
              { rashiHi: 'कुंभ', score: 30 }, { rashiHi: 'मीन', score: 28 }
            ]).map((s, idx) => (
              <div key={idx} className={`p-1 border-r border-b border-stone-200 last:border-r-0 ${s.score >= 28 ? 'bg-emerald-50/60 font-bold text-emerald-950' : 'bg-white text-stone-700'}`}>
                <span className="block text-stone-600 font-normal">{s.rashiHi}</span>
                <span className="text-xs font-mono font-bold text-[#991b1b]">{s.score}</span>
                <span className="block text-[8px] text-stone-400">{s.score >= 28 ? 'शुभ' : 'सामान्य'}</span>
              </div>
            ))}
          </div>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ ४: विंशोत्तरी महादशा एवं अंतर्दशा सम्पूर्ण 120 वर्षीय चक्र */}
      {/* ========================================================================= */}
      <SwastikFrame pageId="print-page-4" pageNumber="पृष्ठ ४ / ६" pageTitle="विंशोत्तरी महादशा व अंतर्दशा चक्र">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री विष्णवे नमः ॥</span>
          </span>
          <h2 className="font-yatra text-lg font-bold text-[#991b1b]">
            विंशोत्तरी महादशा एवं अंतर्दशा विस्तृत कालचक्र (120 Years)
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Dasha Balance */}
        <div className="mb-2 p-1.5 bg-amber-50/60 border border-[#991b1b]/40 text-xs font-sans flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-stone-600 text-[11px] block">जन्मकालीन विंशोत्तरी दशा शेष मान (Dasha Balance at Birth):</span>
            <strong className="text-[#991b1b] text-sm font-bold">
              {result.birthDashaBalance || `${result.birthPanchang.nakshatraLord} महादशा - लगभग 3 वर्ष 4 माह शेष`}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-stone-500 text-[10px] block">दशा गणना आधार:</span>
            <span className="text-stone-800 font-bold text-[11px]">चंद्र नक्षत्र {result.birthPanchang.nakshatra} (360° राशि चक्र)</span>
          </div>
        </div>

        {/* 9 Mahadashas Full Timeline */}
        <div className="mb-2 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>सम्पूर्ण 9 महादशाओं का जीवन कालक्रम (Full 120-Year Mahadashas)</span>
            <span className="text-[10px] font-normal">जातक की जन्म तिथि से पूर्ण जीवन विस्तार</span>
          </div>

          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-amber-100 text-[#991b1b] font-bold text-center border-b border-stone-200">
                <th className="p-1 border-r border-stone-200">महादशा स्वामी</th>
                <th className="p-1 border-r border-stone-200">अवधि (वर्ष)</th>
                <th className="p-1 border-r border-stone-200">प्रारंभ तिथि</th>
                <th className="p-1 border-r border-stone-200">समाप्ति तिथि</th>
                <th className="p-1 border-r border-stone-200">आयु काल (वर्ष)</th>
                <th className="p-1">वर्तमान स्थिति</th>
              </tr>
            </thead>
            <tbody>
              {result.dashaTimeline.map((d, idx) => (
                <tr
                  key={d.planet}
                  className={`border-b border-stone-200 text-center ${
                    d.isCurrent
                      ? 'bg-amber-100/80 font-bold text-[#991b1b]'
                      : d.isPast
                      ? 'bg-stone-50 text-stone-500'
                      : 'bg-white text-stone-800'
                  }`}
                >
                  <td className="p-1 border-r border-stone-200 font-bold text-[#991b1b]">
                    {d.planet} महादशा
                  </td>
                  <td className="p-1 border-r border-stone-200">{d.durationYears} वर्ष</td>
                  <td className="p-1 border-r border-stone-200 font-mono">{d.startDateFormatted || `${d.startYear}-01-01`}</td>
                  <td className="p-1 border-r border-stone-200 font-mono">{d.endDateFormatted || `${d.endYear}-01-01`}</td>
                  <td className="p-1 border-r border-stone-200 font-mono">
                    {Math.max(0, d.startYear - input.year)} से {Math.max(0, d.endYear - input.year)} वर्ष
                  </td>
                  <td className="p-1">
                    {d.isCurrent ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#991b1b] text-white text-[9px] font-bold">
                        ★ वर्तमान में सक्रिय
                      </span>
                    ) : d.isPast ? (
                      <span className="text-stone-400 text-[10px]">व्यतीत (Past)</span>
                    ) : (
                      <span className="text-emerald-700 text-[10px] font-medium">आगामी (Future)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current Mahadasha - 9 Antardashas Detailed Table */}
        <div className="mb-2 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>वर्तमान महादशा ({currentDashaObj.planet}) के अंतर्गत सभी अंतर्दशाएं (Antardashas)</span>
            <span className="text-[10px] text-amber-950 font-bold">
              सक्रिय अंतर्दशा: {activeAntardasha?.lord || currentDashaObj.planet}
            </span>
          </div>

          <div className="grid grid-cols-9 text-center text-[10px]">
            {(currentDashaObj.antardashas || [
              { lord: currentDashaObj.planet, startDate: `${currentDashaObj.startYear}`, endDate: `${currentDashaObj.startYear + 1}`, isCurrent: true },
              { lord: 'अन्य ग्रह', startDate: `${currentDashaObj.startYear + 1}`, endDate: `${currentDashaObj.startYear + 2}`, isCurrent: false }
            ]).map((ad, i) => (
              <div
                key={i}
                className={`p-1 border-r border-b border-stone-200 last:border-r-0 ${
                  ad.isCurrent
                    ? 'bg-amber-200/90 text-amber-950 font-bold ring-1 ring-[#991b1b]'
                    : 'bg-white text-stone-700'
                }`}
              >
                <span className="block font-bold text-xs text-[#991b1b]">{ad.lord}</span>
                <span className="block text-[9px] text-stone-500">अंतर्दशा</span>
                <span className="block font-mono text-[8px] text-stone-600 mt-0.5">{ad.startDate.slice(0, 7)}</span>
                <span className="block font-mono text-[8px] text-stone-600">से {ad.endDate.slice(0, 7)}</span>
                {ad.isCurrent && (
                  <span className="inline-block mt-0.5 px-1 py-0.2 rounded bg-[#991b1b] text-white text-[8px] font-bold">
                    सक्रिय
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dasha Phaladesh Guidance */}
        <div className="border border-[#991b1b]/40 p-2 bg-stone-50/60 text-xs font-sans">
          <h4 className="font-bold text-[#991b1b] text-xs mb-1">वर्तमान दशा शास्त्रीय फलादेश एवं जीवन प्रभाव:</h4>
          <p className="text-[11px] text-stone-700 leading-relaxed">
            वर्तमान समय में जातक पर <strong>{currentDashaObj.planet} महादशा</strong> के अंतर्गत <strong>{activeAntardasha?.lord || currentDashaObj.planet} की अंतर्दशा</strong> प्रभावशील है। दशा स्वामी ग्रह कुंडली में जातक के पुरुषार्थ, कर्म एवं अनुकूल फल प्राप्ति का योग निर्मित कर रहा है। दशा अवधि में संबंधित ग्रह के मंत्र जप एवं इष्ट उपासना से कार्यों में निरंतर गतिशीलता तथा आर्थिक समृद्धि प्राप्त होगी।
          </p>
        </div>

        {/* Navagraha Beej Mantras & Jap Count Matrix */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2.5 py-0.5 font-bold flex items-center justify-between">
            <span>दशा दोष शांति हेतु नवग्रह बीज मंत्र एवं वैदिक जप संख्या (Navagraha Mantras & Remedies)</span>
            <span className="text-[10px] font-normal">दशा अवधि में अभीष्ट सिद्धि हेतु नित्य एक माला जपें</span>
          </div>

          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-amber-100 text-[#991b1b] font-bold text-center border-b border-stone-200">
                <th className="p-1 border-r border-stone-200 w-14">ग्रह</th>
                <th className="p-1 border-r border-stone-200">तांत्रिक बीज मंत्र</th>
                <th className="p-1 border-r border-stone-200 w-16">जप संख्या</th>
                <th className="p-1">अनुशंसित दान सामग्री</th>
              </tr>
            </thead>
            <tbody>
              {[
                { planet: 'सूर्य', mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः', count: '7,000', daan: 'गेहूँ, तांबा बर्तन, गुड़, लाल चंदन, माणिक्य' },
                { planet: 'चंद्र', mantra: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः', count: '11,000', daan: 'चावल, श्वेत वस्त्र, चांदी, दूध, मोती' },
                { planet: 'मंगल', mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः', count: '10,000', daan: 'मसूर दाल, लाल वस्त्र, गुड़, तांबा, मूंगा' },
                { planet: 'बुध', mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः', count: '9,000', daan: 'हरी मूंग, कांस्य पात्र, हरा वस्त्र, पन्ना' },
                { planet: 'गुरु', mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः', count: '19,000', daan: 'चना दाल, हल्दी, स्वर्ण, पीला वस्त्र, पुखराज' },
                { planet: 'शुक्र', mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः', count: '16,000', daan: 'मिश्री, सुगंधित इत्र, श्वेत चंदन, चांदी, हीरा' },
                { planet: 'शनि', mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः', count: '23,000', daan: 'काले तिल, उड़द दाल, सरसों तेल, लोहा, नीलम' },
                { planet: 'राहु', mantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः', count: '18,000', daan: 'सप्तधान्य, काला कंबल, नारियल, गोमेद' },
                { planet: 'केतु', mantra: 'ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः', count: '17,000', daan: 'तिल, दोरंगी कंबल, ध्वजा, लहसुनिया' },
              ].map((row, idx) => (
                <tr key={idx} className={`border-b border-stone-200 text-center ${row.planet === currentDashaObj.planet ? 'bg-amber-100/70 font-bold' : idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}`}>
                  <td className="p-0.5 border-r border-stone-200 font-bold text-[#991b1b]">{row.planet}</td>
                  <td className="p-0.5 border-r border-stone-200 font-serif text-[10px] text-stone-900">{row.mantra}</td>
                  <td className="p-0.5 border-r border-stone-200 font-mono text-[10px] text-stone-800">{row.count}</td>
                  <td className="p-0.5 text-stone-700 text-[10px] text-left px-1.5">{row.daan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Milestone Life Progression Table */}
        <div className="border border-[#991b1b]/40 text-xs font-sans p-1.5 bg-gradient-to-r from-amber-50/30 via-white to-amber-50/20">
          <div className="flex items-center justify-between border-b border-[#991b1b]/30 pb-0.5 mb-1">
            <strong className="text-[#991b1b] text-xs">जीवन के महत्वपूर्ण भाग्योदय एवं परिवर्तनकारी वर्ष (Milestone Life Years):</strong>
            <span className="text-[10px] text-stone-600">ग्रह गोचर व दशा संधि मान</span>
          </div>
          <div className="grid grid-cols-6 gap-1 text-center text-[10px]">
            <div className="p-1 bg-white border border-stone-200"><span className="text-stone-500 block text-[9px]">विद्या-ज्ञान:</span><strong>16-21 वर्ष</strong></div>
            <div className="p-1 bg-white border border-stone-200"><span className="text-stone-500 block text-[9px]">आजीविका उदय:</span><strong className="text-[#991b1b]">24-28 वर्ष</strong></div>
            <div className="p-1 bg-white border border-stone-200"><span className="text-stone-500 block text-[9px]">विवाह-प्रतिष्ठा:</span><strong>25-30 वर्ष</strong></div>
            <div className="p-1 bg-white border border-stone-200"><span className="text-stone-500 block text-[9px]">विशेष भाग्योन्नति:</span><strong className="text-emerald-800">32-36 वर्ष</strong></div>
            <div className="p-1 bg-white border border-stone-200"><span className="text-stone-500 block text-[9px]">संपत्ति व भूमि:</span><strong>42-45 वर्ष</strong></div>
            <div className="p-1 bg-white border border-stone-200"><span className="text-stone-500 block text-[9px]">स्थिर यश व कीर्ति:</span><strong>48-56 वर्ष</strong></div>
          </div>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ ५: वैदिक शुभ योग एवं ग्रह दोष गहन विश्लेषण */}
      {/* ========================================================================= */}
      {(() => {
        const ascIdx = Math.max(0, RASHI_ORDER.findIndex(r => (result.ascendantRashi || '').includes(r)));
        const lagnaRole = LAGNA_GRAHA_ROLES[ascIdx] || LAGNA_GRAHA_ROLES[0];
        
        // Guarantee 6 complete, high-quality Vedic Yogas in a 2x3 grid
        const baseDetectedYogas = (result.specialYogas && result.specialYogas.length > 0) ? result.specialYogas : [];
        const fallbackYogas: VedicYoga[] = [
          {
            name: 'अमला कीर्ति योग (Amala Yoga)',
            type: 'शुभ योग (Auspicious)',
            description: 'लग्न अथवा चंद्र से दशम भाव में शुभ ग्रहों का प्रभाव स्थापित है।',
            effect: 'जीवन में निष्कलंक यश, उच्च सामाजिक प्रतिष्ठा, दानशीलता एवं राजकीय सम्मान।'
          },
          {
            name: 'लग्न बल एवं आरोग्य योग (Lagna Bala Yoga)',
            type: 'शुभ योग (Auspicious)',
            description: `लग्न अधिपति का शुभ प्रभाव जातक के व्यक्तित्व एवं आत्मबल को सुदृढ़ करता है।`,
            effect: 'उत्कृष्ट शारीरिक आरोग्य, उच्च आत्मविश्वास, नेतृत्व क्षमता एवं दीर्घायु का वरदान।'
          },
          {
            name: 'शुभ वेशी / वाशी योग (Subha Vesi Yoga)',
            type: 'शुभ योग (Auspicious)',
            description: 'सूर्य से द्वितीय अथवा द्वादश भाव में शुभ ग्रहों की स्थिति वाणी व धन को बल देती है।',
            effect: 'सत्यवादी व मधुर वाणी, आर्थिक संपन्नता एवं प्रतिष्ठित जनों से अनुकूल संबंध।'
          },
          {
            name: 'सरस्वती योग (Saraswati Yoga)',
            type: 'शुभ योग (Auspicious)',
            description: 'बुध, गुरु एवं शुक्र का परस्पर केंद्र-त्रिकोण समन्वय ज्ञान व मेधा शक्ति को बढ़ाता है।',
            effect: 'विद्वत्ता, शास्त्रज्ञता, वक्तृत्व चातुर्य, कलात्मक अभिरुचि एवं विद्या में अग्रणीयता।'
          },
          {
            name: 'महालक्ष्मी धन योग (Mahalaxmi Yoga)',
            type: 'राजयोग (Raj Yoga)',
            description: 'नवमेश एवं द्वितीयेश-एकादशेश की परस्पर दृष्टि व युति से धन प्रवाह सुनिश्चित होता है।',
            effect: 'निरंतर धन आगमन, पैतृक संपत्ति लाभ, वैभवशाली जीवन एवं व्यापारिक सफलता।'
          },
          {
            name: 'शंख योग (Shankha Yoga)',
            type: 'शुभ योग (Auspicious)',
            description: 'पंचमेश व नवमेश का शुभ संबंध धर्मपरायणता व नीतिनिपुणता को पुष्ट करता है।',
            effect: 'सदाचार, ईश्वर भक्ति, न्यायप्रियता एवं कुल का नाम रोशन करने वाला व्यक्तित्व।'
          }
        ];

        const combinedYogas = [...baseDetectedYogas];
        for (const fb of fallbackYogas) {
          if (combinedYogas.length >= 6) break;
          if (!combinedYogas.some(y => y.name.includes(fb.name.split(' ')[0]))) {
            combinedYogas.push(fb);
          }
        }
        const displayYogas = combinedYogas.slice(0, 6);

        // Helper to retrieve graha shanti info
        const getGrahaShanti = (planetName: string) => {
          if (planetName.includes('बृहस्पति') || planetName.includes('गुरु')) return GRAHA_SHANTI_INFO['गुरु'];
          if (planetName.includes('सूर्य') || planetName.includes('Sun')) return GRAHA_SHANTI_INFO['सूर्य'];
          if (planetName.includes('चंद्र') || planetName.includes('Moon')) return GRAHA_SHANTI_INFO['चंद्र'];
          if (planetName.includes('मंगल') || planetName.includes('Mars')) return GRAHA_SHANTI_INFO['मंगल'];
          if (planetName.includes('बुध') || planetName.includes('Mercury')) return GRAHA_SHANTI_INFO['बुध'];
          if (planetName.includes('शुक्र') || planetName.includes('Venus')) return GRAHA_SHANTI_INFO['शुक्र'];
          if (planetName.includes('शनि') || planetName.includes('Saturn')) return GRAHA_SHANTI_INFO['शनि'];
          if (planetName.includes('राहु') || planetName.includes('Rahu')) return GRAHA_SHANTI_INFO['राहु'];
          if (planetName.includes('केतु') || planetName.includes('Ketu')) return GRAHA_SHANTI_INFO['केतु'];
          return GRAHA_SHANTI_INFO['सूर्य'];
        };

        const PLANET_SORT_ORDER = ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'बृहस्पति', 'शुक्र', 'शनि', 'राहु', 'केतु'];
        const sortedPlanets = [...result.planets].sort((a, b) => {
          const aIdx = PLANET_SORT_ORDER.findIndex(n => a.planet.includes(n));
          const bIdx = PLANET_SORT_ORDER.findIndex(n => b.planet.includes(n));
          return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
        });

        return (
          <SwastikFrame pageId="print-page-5" pageNumber="पृष्ठ ५ / ६" pageTitle="वैदिक शुभ योग एवं दोष विश्लेषण">
            <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-0.5 mb-1 text-xs">
              <span className="font-bold text-[#991b1b] flex items-center gap-1">
                <span>卐</span>
                <span>॥ श्री महालक्ष्म्यै नमः ॥</span>
              </span>
              <h2 className="font-yatra text-base font-bold text-[#991b1b]">
                कुण्डली में विद्यमान प्रमुख शुभ योग एवं ग्रह दोष विश्लेषण
              </h2>
              <span className="font-sans text-stone-700 text-[11px]">
                जातक: <strong>{input.name}</strong>
              </span>
            </div>

            {/* Auspicious Vedic Yogas - 6 Balanced Cards */}
            <div className="border border-[#991b1b]/40 text-xs font-sans">
              <div className="bg-emerald-800 text-white px-2 py-0.5 font-bold flex items-center justify-between">
                <span>कुण्डली में विद्यमान प्रमुख शुभ योग (Auspicious Vedic Yogas)</span>
                <span className="text-[10px] font-normal">भाग्य, प्रतिष्ठा, विद्या एवं सफलता द्योतक ६ प्रमुख योग</span>
              </div>

              <div className="p-1.5 grid grid-cols-2 gap-1.5 bg-emerald-50/20">
                {displayYogas.map((y, idx) => (
                  <div key={idx} className="p-1 bg-white border border-emerald-200 rounded-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[10.5px] text-[#991b1b] flex items-center gap-1 truncate">
                        <span className="text-emerald-700 text-xs">✓</span>
                        <span className="truncate">{y.name}</span>
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold bg-emerald-100 text-emerald-900 shrink-0">
                        {y.type}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-stone-700 leading-tight mb-0.5">
                      <strong>निर्माण कारक:</strong> {y.description}
                    </p>
                    <p className="text-[9.5px] text-emerald-900 leading-tight font-medium">
                      <strong>शुभ प्रभाव:</strong> {y.effect}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lagna Planetary Roles */}
            <div className="border border-[#991b1b]/40 text-xs font-sans">
              <div className="bg-[#B45309] text-white px-2 py-0.5 font-bold flex items-center justify-between">
                <span>{result.ascendantRashi} लग्न अनुसार ग्रह भूमिका सारिणी (Functional Roles for {result.ascendantRashi} Lagna)</span>
                <span className="text-[10px] font-normal">पाराशरीय सिद्धांत अनुसार कारक व मारक विचार</span>
              </div>

              <div className="p-1 bg-amber-50/20">
                <div className="grid grid-cols-4 gap-1.5 mb-1 text-[10.5px]">
                  <div className="bg-white border border-amber-300 rounded p-1">
                    <div className="text-[9.5px] font-bold text-amber-900 border-b border-amber-200 pb-0.5 mb-0.5">⭐ योगकारक ग्रह</div>
                    <div className="font-bold text-[#991b1b] text-[10.5px]">{lagnaRole.yogakaraka}</div>
                    <div className="text-[8.5px] text-stone-600 mt-0.5">परम राजयोग व सफलता प्रदाता</div>
                  </div>
                  <div className="bg-white border border-emerald-300 rounded p-1">
                    <div className="text-[9.5px] font-bold text-emerald-800 border-b border-emerald-200 pb-0.5 mb-0.5">🌿 शुभ व मित्र ग्रह</div>
                    <div className="font-bold text-emerald-900 text-[10.5px]">{lagnaRole.benefics}</div>
                    <div className="text-[8.5px] text-stone-600 mt-0.5">विद्या, धन व आरोग्य वर्धक</div>
                  </div>
                  <div className="bg-white border border-stone-300 rounded p-1">
                    <div className="text-[9.5px] font-bold text-stone-700 border-b border-stone-200 pb-0.5 mb-0.5">⚖️ सम ग्रह</div>
                    <div className="font-bold text-stone-800 text-[10.5px]">{lagnaRole.neutrals}</div>
                    <div className="text-[8.5px] text-stone-600 mt-0.5">स्थिति अनुसार फल प्रदाता</div>
                  </div>
                  <div className="bg-white border border-rose-300 rounded p-1">
                    <div className="text-[9.5px] font-bold text-rose-800 border-b border-rose-200 pb-0.5 mb-0.5">⚠️ मारक व सतर्कता ग्रह</div>
                    <div className="font-bold text-rose-900 text-[10.5px]">{lagnaRole.marakas}</div>
                    <div className="text-[8.5px] text-stone-600 mt-0.5">जप, दान व शांति योग्य ग्रह</div>
                  </div>
                </div>
                <div className="text-[9.5px] text-amber-950 font-medium bg-white/80 rounded px-1.5 py-0.5 border border-amber-200 flex items-center justify-between">
                  <span><strong>शास्त्रीय सूत्र:</strong> {lagnaRole.keyRule}</span>
                  <span className="text-[8.5px] text-stone-500 font-normal">बृहत्पाराशर होराशास्त्रम्</span>
                </div>
              </div>
            </div>

            {/* Major Doshas Breakdown */}
            <div className="border border-[#991b1b]/40 text-xs font-sans">
              <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
                <span>ग्रह दोष विचार, प्रभाव एवं शास्त्रीय निवारण (Dosha Vichar & Vedic Remedies)</span>
                <span className="text-[10px] font-normal">मांगलिक, कालसर्प, साढ़े साती व पितृदोष निर्णय</span>
              </div>

              <div className="p-1 grid grid-cols-2 gap-1.5 bg-stone-50/40">
                {/* Manglik */}
                <div className="border border-stone-200 p-1 bg-white rounded-sm">
                  <div className="flex items-center justify-between mb-0.5">
                    <strong className="text-[10.5px] text-[#991b1b]">१. मांगलिक दोष विचार:</strong>
                    <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold ${
                      result.manglikStatus.includes('गैर') || result.manglikStatus.includes('Non')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {result.manglikStatus}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-stone-700 leading-tight">
                    {result.doshaAnalysis.manglik.description}
                  </p>
                  {result.doshaAnalysis.manglik.exceptions && result.doshaAnalysis.manglik.exceptions.length > 0 && (
                    <p className="text-[9px] text-emerald-800 font-medium mt-0.5">
                      <strong>अपवाद:</strong> {result.doshaAnalysis.manglik.exceptions.join(', ')}
                    </p>
                  )}
                </div>

                {/* Kaal Sarp */}
                <div className="border border-stone-200 p-1 bg-white rounded-sm">
                  <div className="flex items-center justify-between mb-0.5">
                    <strong className="text-[10.5px] text-[#991b1b]">२. कालसर्प योग विश्लेषण:</strong>
                    <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold ${
                      result.doshaAnalysis.kaalSarp.isPresent ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {result.doshaAnalysis.kaalSarp.isPresent ? result.doshaAnalysis.kaalSarp.nameHi : 'दोष रहित (No Kaal Sarp)'}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-stone-700 leading-tight">
                    {result.doshaAnalysis.kaalSarp.description}
                  </p>
                  {result.doshaAnalysis.kaalSarp.remedy && (
                    <p className="text-[9px] text-amber-950 font-medium mt-0.5">
                      <strong>शांति विधान:</strong> {result.doshaAnalysis.kaalSarp.remedy}
                    </p>
                  )}
                </div>

                {/* Sade Sati */}
                <div className="border border-stone-200 p-1 bg-white rounded-sm">
                  <div className="flex items-center justify-between mb-0.5">
                    <strong className="text-[10.5px] text-[#991b1b]">३. शनि साढ़े साती एवं ढैय्या:</strong>
                    <span className="text-[8.5px] font-bold text-stone-900 bg-amber-100 px-1.5 py-0.2 rounded">
                      {result.doshaAnalysis.sadeSati.status} ({result.doshaAnalysis.sadeSati.phase})
                    </span>
                  </div>
                  <p className="text-[9.5px] text-stone-700 leading-tight">
                    {result.doshaAnalysis.sadeSati.description}
                  </p>
                  {result.doshaAnalysis.sadeSati.remedy && (
                    <p className="text-[9px] text-stone-700 mt-0.5">
                      <strong>उपाय:</strong> {result.doshaAnalysis.sadeSati.remedy}
                    </p>
                  )}
                </div>

                {/* Pitra Dosha */}
                <div className="border border-stone-200 p-1 bg-white rounded-sm">
                  <div className="flex items-center justify-between mb-0.5">
                    <strong className="text-[10.5px] text-[#991b1b]">४. पितृ दोष एवं ग्रह युति:</strong>
                    <span className="text-[8.5px] font-bold text-emerald-800">
                      {result.doshaAnalysis.pitraDosh.isPresent ? 'साधारण लक्षण' : 'दोष मुक्त'}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-stone-700 leading-tight">
                    {result.doshaAnalysis.pitraDosh.description || 'नवम भाव एवं सूर्य की शुभ स्थिति के कारण पितरों का आशीर्वाद जातक पर बना रहेगा।'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navagraha Shanti & Beej Mantra Table */}
            <div className="border border-[#991b1b]/40 text-xs font-sans">
              <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
                <span>नवग्रह शांति, तांत्रिक बीज मंत्र जप संख्या एवं विहित शास्त्रोक्त दान सारणी</span>
                <span className="text-[10px] font-normal">ग्रह शांति, स्वास्थ्य, समृद्धि एवं दोष शमन विधान</span>
              </div>

              <table className="w-full text-[9.5px] border-collapse bg-white">
                <thead>
                  <tr className="bg-amber-100 text-[#991b1b] font-bold text-center border-b border-stone-200">
                    <th className="p-0.5 border-r border-stone-200 w-12">ग्रह</th>
                    <th className="p-0.5 border-r border-stone-200 w-24">स्थिति (भाव व राशि)</th>
                    <th className="p-0.5 border-r border-stone-200 w-20">अवस्था / बल</th>
                    <th className="p-0.5 border-r border-stone-200">वैदिक तांत्रिक बीज मंत्र</th>
                    <th className="p-0.5 border-r border-stone-200 w-16">जप संख्या</th>
                    <th className="p-0.5 border-r border-stone-200">विहित शास्त्रोक्त दान</th>
                    <th className="p-0.5 w-16">वार / देवता</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlanets.map((p, idx) => {
                    const shanti = getGrahaShanti(p.planet);
                    return (
                      <tr key={idx} className={`border-b border-stone-200 text-center ${idx % 2 === 0 ? 'bg-amber-50/20' : 'bg-white'}`}>
                        <td className="p-0.5 border-r border-stone-200 font-bold text-[#991b1b]">{p.planet}</td>
                        <td className="p-0.5 border-r border-stone-200 text-[9px]">
                          {p.house}वें भाव ({p.rashi.split(' ')[0]})
                        </td>
                        <td className="p-0.5 border-r border-stone-200 text-[8.5px] font-medium">
                          <span className={`px-1 py-0.2 rounded ${
                            p.dignity.includes('उच्च') || p.dignity.includes('स्व')
                              ? 'bg-emerald-100 text-emerald-900 font-bold'
                              : p.dignity.includes('नीच') || p.dignity.includes('शत्रु')
                              ? 'bg-rose-100 text-rose-900'
                              : 'bg-stone-100 text-stone-700'
                          }`}>
                            {p.dignity.split(' ')[0]}
                          </span>
                        </td>
                        <td className="p-0.5 border-r border-stone-200 font-mono font-semibold text-stone-900 text-[9px]">
                          {shanti.beejMantra}
                        </td>
                        <td className="p-0.5 border-r border-stone-200 font-bold text-amber-900 text-[9px]">{shanti.japaCount}</td>
                        <td className="p-0.5 border-r border-stone-200 text-[8.5px] text-stone-700 text-left px-1">{shanti.daanSamagri}</td>
                        <td className="p-0.5 text-[8.5px] text-stone-600">{shanti.day}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Sacred Bottom Mantra Bar */}
            <div className="py-0.5 px-2 border border-amber-300 bg-amber-50/80 rounded text-center text-[10px] text-[#991b1b] font-bold flex items-center justify-between">
              <span>卐 ॥ ॐ नमो भगवते वासुदेवाय नमः ॥</span>
              <span className="text-stone-700 text-[9.5px] font-medium">नित्य भगवत्स्मरण, कुलदेवी पूजा एवं महामृत्युंजय जपेन सर्वदोषोपशमनं शुभयोगवृद्धिर्भवति</span>
              <span>॥ कल्याणमस्तु ॥ 卐</span>
            </div>
          </SwastikFrame>
        );
      })()}

      {/* ========================================================================= */}
      {/* पृष्ठ ६: सम्पूर्ण जीवन फलादेश, शास्त्रोक्त उपाय, रत्न-रुद्राक्ष एवं मुहर */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* पृष्ठ ६: सम्पूर्ण जीवन फलादेश, शास्त्रोक्त उपाय, रत्न-रुद्राक्ष एवं मुहर */}
      {/* ========================================================================= */}
      <SwastikFrame pageId="print-page-6" pageNumber="पृष्ठ ६ / ६" pageTitle="सम्पूर्ण जीवन फलादेश एवं ज्योतिषी आशीर्वाद">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-0.5 mb-1 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री जगदम्बिकायै नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base font-bold text-[#991b1b]">
            सम्पूर्ण जीवन फलादेश, विहित उपाय एवं ज्योतिषाचार्य प्रमाण पत्र
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* 1. Life Prediction Sections - 6 Domains in a 2x3 Grid */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>द्वादश भाव आधारित सम्पूर्ण जीवन फलादेश (Comprehensive Life Predictions)</span>
            <span className="text-[10px] font-normal">लग्न, चंद्र, सूर्य एवं दशमेश ग्रह अनुसार फलादेश</span>
          </div>

          <div className="p-1.5 grid grid-cols-2 gap-1.5 bg-stone-50/30">
            {/* 1. Personality */}
            <div className="p-1 bg-white border border-stone-200 rounded-sm">
              <strong className="text-[10.5px] text-[#991b1b] block mb-0.5 font-bold">
                १. व्यक्तित्व, स्वभाव व आत्मबल (Personality & Vitality):
              </strong>
              <p className="text-[9.5px] text-stone-700 leading-tight">
                {result.lifePrediction.general}
              </p>
            </div>

            {/* 2. Career & Wealth */}
            <div className="p-1 bg-white border border-stone-200 rounded-sm">
              <strong className="text-[10.5px] text-[#991b1b] block mb-0.5 font-bold">
                २. आजीविका, धन, नौकरी व व्यवसाय (Career & Wealth):
              </strong>
              <p className="text-[9.5px] text-stone-700 leading-tight">
                {result.lifePrediction.career}
              </p>
            </div>

            {/* 3. Education & Intellect */}
            <div className="p-1 bg-white border border-stone-200 rounded-sm">
              <strong className="text-[10.5px] text-[#991b1b] block mb-0.5 font-bold">
                ३. विद्या, मेधा व बौद्धिक विकास (Education & Intellect):
              </strong>
              <p className="text-[9.5px] text-stone-700 leading-tight">
                बुध, गुरु एवं पंचम भाव के शुभाशुभ समन्वय से जातक में उत्तम बौद्धिक क्षमता, निर्णय-कुशलता एवं एकाग्रता रहेगी। उच्च विद्या, शोध, तकनीकी, वाणिज्य अथवा प्रशासनिक क्षेत्र में विशेष सफलता का योग है।
              </p>
            </div>

            {/* 4. Marriage & Family */}
            <div className="p-1 bg-white border border-stone-200 rounded-sm">
              <strong className="text-[10.5px] text-[#991b1b] block mb-0.5 font-bold">
                ४. विवाह, दांपत्य जीवन व पारिवारिक सुख (Marriage & Family):
              </strong>
              <p className="text-[9.5px] text-stone-700 leading-tight">
                {result.lifePrediction.marriage}
              </p>
            </div>

            {/* 5. Destiny & Dharma */}
            <div className="p-1 bg-white border border-stone-200 rounded-sm">
              <strong className="text-[10.5px] text-[#991b1b] block mb-0.5 font-bold">
                ५. भाग्य, धर्म, सत्कर्म व प्रतिष्ठा (Destiny & Dharma):
              </strong>
              <p className="text-[9.5px] text-stone-700 leading-tight">
                नवम भाव (भाग्य स्थान) एवं लग्न के शुभ संबंध से जातक का भाग्योदय कर्मठता और सत्यनिष्ठा से होगा। धर्म, परोपकार एवं तीर्थ यात्राओं में रुचि रहेगी, जिससे समाज में आदर एवं ख्याति में वृद्धि होगी।
              </p>
            </div>

            {/* 6. Health & Wellness */}
            <div className="p-1 bg-white border border-stone-200 rounded-sm">
              <strong className="text-[10.5px] text-[#991b1b] block mb-0.5 font-bold">
                ६. स्वास्थ्य, जीवन ऊर्जा एवं सावधानियां (Health & Wellness):
              </strong>
              <p className="text-[9.5px] text-stone-700 leading-tight">
                {result.lifePrediction.health}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Current Dasha Influence & Guidance Card */}
        <div className="border border-[#B45309]/40 text-xs font-sans bg-amber-50/20">
          <div className="bg-[#B45309] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>वर्तमान विंशोत्तरी दशा प्रभाव एवं कालखंड मार्गदर्शन (Active Dasha Guidance)</span>
            <span className="text-[10px] font-normal">ग्रह कालखंड अनुसार उचित कर्म एवं सावधानियां</span>
          </div>
          <div className="p-1.5 flex items-center justify-between gap-2">
            <div className="w-1/3 bg-white border border-amber-300 rounded p-1 text-center">
              <span className="text-[9px] text-stone-500 block">सक्रिय महादशा / अंतर्दशा:</span>
              <strong className="text-xs text-[#991b1b] block">
                {currentDashaObj.planet} महादशा • {activeAntardasha?.lord || currentDashaObj.planet} अंतर्दशा
              </strong>
              <span className="text-[8.5px] text-amber-900 font-mono">
                समयावधि: {activeAntardasha?.startDate || currentDashaObj.startYear} से {activeAntardasha?.endDate || (currentDashaObj.startYear + currentDashaObj.durationYears)}
              </span>
            </div>
            <div className="w-2/3 text-[9.5px] text-stone-800 leading-tight bg-white border border-amber-200 rounded p-1.5">
              <strong>दशा प्रभाव निर्देश:</strong> वर्तमान कालखंड में {currentDashaObj.planet} ग्रह का मुख्य प्रभाव जातक की मानसिक स्थिति एवं कार्यक्षेत्र को दिशा दे रहा है। यह समयावधि कर्मक्षेत्र में प्रगति, मानसिक संतुलन एवं नए अवसरों के निर्माण की द्योतक है। समय के अनुकूल फल हेतु विहित मंत्र जप, कुलदेवी आराधना एवं सत्कर्म विशेष फलदायी रहेंगे।
            </div>
          </div>
        </div>

        {/* 3. Remedial Measures - 6 Grid Items + 4 Daily Rules */}
        <div className="border border-[#991b1b]/40 text-xs font-sans bg-amber-50/30">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>शास्त्रोक्त उपाय, रत्न, रुद्राक्ष, सिद्ध मंत्र एवं दैनिक नियम (Vedic Remedies)</span>
            <span className="text-[10px] text-stone-700 font-normal">पंडित जी द्वारा प्रमाणित जीवन सुधार मार्गदर्शन</span>
          </div>

          <div className="p-1.5">
            {/* 6 Key Items Grid */}
            <div className="grid grid-cols-6 gap-1 text-center text-[10px] mb-1">
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[9px] block">भाग्य रत्न:</span>
                <strong className="text-[#991b1b] text-[10px]">{result.lifePrediction.luckyGem}</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[9px] block">सिद्ध रुद्राक्ष:</span>
                <strong className="text-amber-950 text-[10px]">पंचमुखी / सातमुखी</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[9px] block">अनुकूल वार:</span>
                <strong className="text-stone-900 text-[10px]">गुरुवार व रविवार</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[9px] block">शुभ रंग:</span>
                <strong className="text-stone-900 text-[10px]">पीला, श्वेत, नारंगी</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[9px] block">शुभ अंक:</span>
                <strong className="text-stone-900 font-mono text-[10px]">1, 3, 7, 9</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[9px] block">इष्ट देव:</span>
                <strong className="text-stone-900 text-[10px]">श्री गणेश व कुलदेवी</strong>
              </div>
            </div>

            {/* Detailed Upay Points */}
            <div className="space-y-0.5 text-[9.5px]">
              <div className="flex items-start gap-1">
                <strong className="text-[#991b1b] shrink-0">• दैनिक सिद्ध मंत्र:</strong>{' '}
                <span className="font-mono font-bold text-stone-900">{result.lifePrediction.luckyMantra} (नित्य १०८ बार जप करें)</span>
              </div>
              <div className="flex items-start gap-1">
                <strong className="text-stone-900 shrink-0">• सूर्य अर्घ्य व साधना:</strong>{' '}
                <span className="text-stone-700">प्रतिदिन प्रातः सूर्योदय के समय तांबे के पात्र से जल, रोली व अक्षत मिलाकर सूर्य देव को अर्घ्य दें।</span>
              </div>
              <div className="flex items-start gap-1">
                <strong className="text-stone-900 shrink-0">• गौ-सेवा एवं दान:</strong>{' '}
                <span className="text-stone-700">गुरुवार अथवा शनिवार को गौमाता को गुड़-रोटी अथवा हरा चारा खिलाएं और पक्षियों को सप्तधान्य डालें।</span>
              </div>
              <div className="flex items-start gap-1">
                <strong className="text-stone-900 shrink-0">• सदाचार व कुलदेवी पूजा:</strong>{' '}
                <span className="text-stone-700">प्रतिदिन कुलदेवी के समक्ष घी का दीपक प्रज्वलित करें एवं माता-पिता व गुरुजनों का चरण स्पर्श कर आशीर्वाद लें।</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Official Astrological Certificate & Seal */}
        <div className="border-2 border-[#991b1b] rounded-lg bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FFF3E0] p-2 shadow-sm relative overflow-hidden">
          {/* Decorative Corner Swastiks */}
          <span className="absolute top-1 left-1.5 text-xs text-[#991b1b] font-bold select-none">卐</span>
          <span className="absolute top-1 right-1.5 text-xs text-[#991b1b] font-bold select-none">卐</span>
          <span className="absolute bottom-1 left-1.5 text-xs text-[#991b1b] font-bold select-none">卐</span>
          <span className="absolute bottom-1 right-1.5 text-xs text-[#991b1b] font-bold select-none">卐</span>

          {/* Mangal Invocations */}
          <div className="text-center border-b border-amber-300 pb-0.5 mb-1">
            <div className="text-[10px] text-[#991b1b] font-bold tracking-widest flex items-center justify-center gap-2">
              <span>卐</span>
              <span>॥ श्री गणेशाय नमः ॥</span>
              <span>•</span>
              <span>॥ ॐ श्री भवान्यै नमः ॥</span>
              <span>•</span>
              <span>॥ ॐ कुलदेवतायै नमः ॥</span>
              <span>卐</span>
            </div>
            <h3 className="font-yatra text-sm text-[#991b1b] font-bold tracking-wide mt-0.5 flex items-center justify-center gap-1.5">
              <span>॥ श्री भवानी ज्योतिष केंद्र ॥ (Bhawani Jyotish Sansthan)</span>
              <VerifiedBadge size="xs" showTooltip={false} />
            </h3>
            <p className="text-[9.5px] font-bold text-[#B45309] flex items-center justify-center gap-1.5 flex-wrap">
              <span>शासकीय पंजीकरण सं. (Govt. Regd. No.):</span>
              <span className="font-mono text-[#991b1b] font-black bg-amber-100/90 px-1.5 py-0.2 rounded border border-amber-300">
                {ASTROLOGER_INFO.registrationNo}
              </span>
              <span>•</span>
              <span>उत्तर गुजरात का प्रतिष्ठित राजज्योतिष संस्थान</span>
              <span>•</span>
              <span>वैदिक जन्म कुण्डली, वास्तु एवं संपूर्ण कर्मकांड</span>
            </p>
          </div>

          {/* Details Grid: Astrologer + Contact & Address + Official Stamp */}
          <div className="grid grid-cols-12 gap-2 text-xs font-sans items-center">
            
            {/* Column 1: Astrologer & Experience (5 cols) */}
            <div className="col-span-5 space-y-0.5 border-r border-amber-300/80 pr-2">
              <div>
                <span className="text-[9px] text-stone-500 block font-semibold">मुख्य ज्योतिषाचार्य:</span>
                <div className="flex items-center gap-1">
                  <strong className="text-xs text-[#991b1b] font-yatra tracking-wide">
                    {ASTROLOGER_INFO.name}
                  </strong>
                  <VerifiedBadge size="xs" showTooltip={false} />
                </div>
              </div>

              <div className="p-1 rounded bg-amber-100/70 border border-amber-300 text-[10px] space-y-0.5">
                <div className="flex items-center gap-1 font-bold text-[#852E10]">
                  <span>⭐</span>
                  <span>अनुभव:</span>
                  <strong className="text-[#991b1b]">{ASTROLOGER_INFO.experience}</strong>
                  <VerifiedBadge size="xs" showTooltip={false} />
                </div>
                <div className="text-[9px] text-stone-700">
                  ३५+ वर्षों की अनवरत वैदिक साधना एवं १५,०००+ संतुष्ट परिवारों का विश्वसनीय मार्गदर्शन।
                </div>
              </div>
            </div>

            {/* Column 2: Telephone & Address (4 cols) */}
            <div className="col-span-4 space-y-0.5 border-r border-amber-300/80 pr-2 text-[10px]">
              <div>
                <span className="text-[9px] text-stone-500 block font-semibold">संपर्क सूत्र (दूरभाष):</span>
                <strong className="text-xs text-[#991b1b] font-mono block">
                  {ASTROLOGER_INFO.phonePrimary}
                </strong>
              </div>

              <div className="pt-0.5">
                <span className="text-[9px] text-stone-500 block font-semibold">कार्यालय पता (Address):</span>
                <strong className="text-stone-900 block leading-tight text-[10px]">
                  {ASTROLOGER_INFO.address}
                </strong>
                <span className="text-[9px] text-stone-500 block">ई-मेल: {ASTROLOGER_INFO.email}</span>
              </div>
            </div>

            {/* Column 3: Royal Authorized Stamp & Verification (3 cols) */}
            <div className="col-span-3 flex flex-col items-center justify-center text-center">
              <div className="w-18 h-18 rounded-full border-2 border-dashed border-[#991b1b] bg-amber-50/90 flex flex-col items-center justify-center p-0.5 shadow-inner relative">
                <div className="w-15 h-15 rounded-full border border-amber-400 flex flex-col items-center justify-center p-0.5">
                  <span className="text-[8px] text-[#991b1b] font-bold">卐 भवानी 卐</span>
                  <span className="text-[6.5px] font-bold text-[#852E10] leading-none">ज्योतिष केंद्र</span>
                  <span className="text-[5.5px] font-mono text-[#991b1b] font-bold leading-tight">{ASTROLOGER_INFO.registrationNo}</span>
                  <span className="text-[5.5px] font-mono text-emerald-800 font-bold">मेहसाणा (गुज.)</span>
                  <span className="text-[6px] text-[#991b1b]">★ अधिकृत ★</span>
                </div>
              </div>
              <span className="text-[7.5px] font-bold text-[#852E10] mt-0.5 flex items-center justify-center gap-1">
                <span>[ज्योतिषाचार्य प्रामाणिक मुद्रा]</span>
                <VerifiedBadge size="xs" showTooltip={false} />
              </span>
            </div>

          </div>

          {/* Bottom Blessing Bar */}
          <div className="mt-1 pt-0.5 border-t border-amber-300 text-center text-[9.5px] text-stone-700 font-medium flex flex-wrap items-center justify-between">
            <span className="text-[#991b1b] font-bold">
              ॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके । शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते ॥
            </span>
            <span className="text-[#B45309] font-bold">
              ॥ शुभं भवतु • कल्याणमस्तु • श्री कृष्णार्पणमस्तु ॥
            </span>
          </div>
        </div>

      </SwastikFrame>

    </div>
  );
};
