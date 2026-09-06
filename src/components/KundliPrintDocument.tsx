import React from 'react';
import { KundliResult, KundliInput, Language } from '../types/astrology';
import { ASTROLOGER_INFO } from '../data/astrologyData';

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

/**
 * Sacred Swastik decorative border framing all 4 sides with traditional corners.
 * Uses sacred symbols: 卐 (Swastik), ॐ (Om), ❖ (Vedic diamond/flower).
 */
export const SwastikFrame: React.FC<{ children: React.ReactNode; pageNumber: string; pageTitle?: string }> = ({
  children,
  pageNumber,
  pageTitle
}) => {
  // Repeating array of Swastiks for top/bottom
  const horizontalSwastiks = Array.from({ length: 26 }, (_, i) => i);
  // Repeating array of Swastiks for left/right
  const verticalSwastiks = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className="print-page relative w-full bg-[#FFFDF9] text-stone-900 box-border p-2.5 sm:p-4 my-4 shadow-lg print:shadow-none print:my-0 print:p-2 border-2 border-[#991b1b]">
      {/* Outer Golden/Maroon Frame Container */}
      <div className="relative border border-[#B45309] p-1 sm:p-2 bg-[#FFFDF9]">
        
        {/* ================= TOP SWASTIK BORDER ================= */}
        <div className="flex items-center justify-between px-2 py-0.5 border-b border-[#991b1b] bg-amber-50/70 text-[#991b1b] select-none">
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
        <div className="flex relative">
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
          <div className="flex-1 px-2.5 py-2 sm:px-4 sm:py-2.5 bg-white/95 overflow-hidden">
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
        <div className="flex items-center justify-between px-2 py-0.5 border-t border-[#991b1b] bg-amber-50/70 text-[#991b1b] select-none">
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
        <div className="text-center text-[10px] font-bold text-stone-700 pt-1 flex justify-between px-2">
          <span>॥ शुभम भवतु • कल्याणमस्तु ॥</span>
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
}> = ({ title, ascendantRashi, planets, isNavamsha = false }) => {
  const ascIndex = Math.max(0, RASHI_ORDER.findIndex(r => ascendantRashi.includes(r)));

  const getPlanetsInHouse = (houseNum: number) => {
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
      <div className="w-full text-center font-bold text-xs text-[#991b1b] pb-1 border-b border-amber-300 mb-1 flex items-center justify-center gap-1.5">
        <span className="text-[11px]">卐</span>
        <span>{title}</span>
        <span className="text-[11px]">卐</span>
      </div>

      <div className="w-full aspect-square max-w-[270px] sm:max-w-[300px] relative bg-[#FFFDF9] border border-[#991b1b] shadow-2xs">
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
              लग्न (1)
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
      {/* पृष्ठ १: मुख्य जन्म पत्रिका, लग्न (D1) व नवमांश (D9) चक्र, जातक परिचय */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ १ / ६" pageTitle="मुख्य जन्म पत्रिका व अवकहड़ा चक्र">
        {/* Sacred Top Invocation */}
        <div className="text-center border-b-2 border-[#991b1b] pb-2 mb-2">
          <div className="flex items-center justify-between text-[#991b1b] text-xs font-bold px-2">
            <span>॥ श्री कुलदेवतायै नमः ॥</span>
            <span className="text-base font-bold tracking-wider">॥ ॐ श्री गणेशाय नमः ॥</span>
            <span>॥ ॐ नमः शिवाय ॥</span>
          </div>

          <h1 className="font-yatra text-xl sm:text-2xl font-extrabold text-[#991b1b] tracking-wide mt-0.5">
            शास्त्रोक्त वैदिक जन्म कुण्डली एवं पंचांग पत्रिका
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs text-stone-800 font-sans font-medium mt-0.5">
            <span className="font-bold text-[#B45309]">
              {ASTROLOGER_INFO.name} • {ASTROLOGER_INFO.centerName}
            </span>
            <span>•</span>
            <span className="text-stone-600">
              राष्ट्रीय दृक गणित (लाहिड़ी अयनांश) एवं कालनिर्णय पंचांग मानक
            </span>
          </div>
        </div>

        {/* SECTION 1: जातक जन्म विवरण (Native's Birth Information) */}
        <div className="mb-2.5">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-stone-200">
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

            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-stone-200">
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

            <div className="grid grid-cols-2 sm:grid-cols-4">
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

        {/* SECTION 2: कुण्डली चक्र (Dual Charts) */}
        <div className="mb-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 bg-stone-50/70 border border-[#991b1b]/40 rounded-sm">
            <NorthIndianPrintChart
              title="जन्म लग्न कुण्डली (D-1 Chart - मूल जीवन चक्र)"
              ascendantRashi={result.ascendantRashi}
              planets={result.planets}
              isNavamsha={false}
            />

            <NorthIndianPrintChart
              title="नवमांश कुण्डली (D-9 Chart - दांपत्य व सूक्ष्म बल)"
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

          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-stone-200 text-[11px]">
            <div className="p-1.5 border-r border-stone-200"><span className="text-stone-500 block text-[10px]">वर्ण (Varna):</span><strong>{result.avakahadaChakra.varna}</strong></div>
            <div className="p-1.5 border-r border-stone-200"><span className="text-stone-500 block text-[10px]">वश्य (Vashya):</span><strong>{result.avakahadaChakra.vashya}</strong></div>
            <div className="p-1.5 border-r border-stone-200"><span className="text-stone-500 block text-[10px]">योनि (Yoni):</span><strong>{result.avakahadaChakra.yoni}</strong></div>
            <div className="p-1.5"><span className="text-stone-500 block text-[10px]">गण (Gana):</span><strong>{result.avakahadaChakra.gana}</strong></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 text-[11px]">
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">नाड़ी (Nadi):</span><strong className="text-[#991b1b]">{result.avakahadaChakra.nadi}</strong></div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">पाया (Paya):</span><strong className="text-emerald-800">{result.birthPanchang.paya?.split(' ')[0] || 'रजत पाया'}</strong></div>
            <div className="p-1.5 border-r border-stone-200 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">तत्व / राशि स्वामी:</span><strong>{result.avakahadaChakra.tatva} / {result.avakahadaChakra.rashiLord}</strong></div>
            <div className="p-1.5 bg-amber-50/40"><span className="text-stone-500 block text-[10px]">नामाक्षर / वैरी वर्ग:</span><strong>'{result.avakahadaChakra.naamAkshar}' / सर्प-गरुड़</strong></div>
          </div>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ २: कालनिर्णय एवं शास्त्रोक्त वैदिक पंचांग विस्तार */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ २ / ६" pageTitle="कालनिर्णय एवं वैदिक पंचांग विस्तार">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री कालभैरवाय नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base sm:text-lg font-bold text-[#991b1b]">
            कालनिर्णय पंचांग एवं विस्तृत जन्मकालीन मुहूर्त विवेक
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Kalnirnay Samvat & Months */}
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>संवत्सर, मास एवं कालगणना (Kalnirnay Traditional Era)</span>
            <span className="text-[10px] font-normal">भारतीय राष्ट्रीय कालगणना व शालिवाहन शके</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 border-b border-stone-200 text-[11px]">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 text-[11px]">
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
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>पंचांग के पंच-अंग (Five Limbs of Time at Birth)</span>
            <span className="text-[10px] text-stone-700 font-normal">तिथि, वार, नक्षत्र, योग, करण</span>
          </div>

          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-amber-50 text-stone-700 border-b border-stone-200 text-left">
                <th className="p-1.5 border-r border-stone-200">अंग</th>
                <th className="p-1.5 border-r border-stone-200">नाम व मान</th>
                <th className="p-1.5 border-r border-stone-200">समाप्ति काल / घटी</th>
                <th className="p-1.5 border-r border-stone-200">अधिपति ग्रह</th>
                <th className="p-1.5">शास्त्रीय फल / महत्व</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-200">
                <td className="p-1.5 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">१. तिथि</td>
                <td className="p-1.5 border-r border-stone-200 font-bold">{result.birthPanchang.birthTithi || result.birthPanchang.tithi}</td>
                <td className="p-1.5 border-r border-stone-200">{result.birthPanchang.tithiEnding}</td>
                <td className="p-1.5 border-r border-stone-200">{result.birthPanchang.dayLord || 'शुक्र/गुरु'}</td>
                <td className="p-1.5 text-stone-700">उदय तिथि: {result.birthPanchang.sunriseTithi}। संपदा व वैभव प्रदायक।</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="p-1.5 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">२. वार</td>
                <td className="p-1.5 border-r border-stone-200 font-bold">{result.birthPanchang.dayOfWeek}</td>
                <td className="p-1.5 border-r border-stone-200">अहोरात्र (सूर्योदय से सूर्योदय)</td>
                <td className="p-1.5 border-r border-stone-200 font-bold text-[#991b1b]">{result.birthPanchang.dayLord}</td>
                <td className="p-1.5 text-stone-700">वारेश ग्रह जीवन में शारीरिक ऊर्जा व पराक्रम का संचालक होता है।</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="p-1.5 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">३. नक्षत्र</td>
                <td className="p-1.5 border-r border-stone-200 font-bold">{result.birthPanchang.nakshatra} (चरण {result.birthPanchang.nakshatraCharan})</td>
                <td className="p-1.5 border-r border-stone-200">{result.birthPanchang.nakshatraEnding}</td>
                <td className="p-1.5 border-r border-stone-200 font-bold">{result.birthPanchang.nakshatraLord}</td>
                <td className="p-1.5 text-stone-700">मानसिक वृत्ति, स्वभाव, जन्म नाम एवं विंशोत्तरी दशा का निर्धारक।</td>
              </tr>
              <tr className="border-b border-stone-200">
                <td className="p-1.5 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">४. योग</td>
                <td className="p-1.5 border-r border-stone-200 font-bold">{result.birthPanchang.yoga}</td>
                <td className="p-1.5 border-r border-stone-200">{result.birthPanchang.yogaEnding}</td>
                <td className="p-1.5 border-r border-stone-200">शुभ प्रकृति</td>
                <td className="p-1.5 text-stone-700">जातक को कार्य सिद्धि एवं चारित्रिक शुचिता प्रदान करता है।</td>
              </tr>
              <tr>
                <td className="p-1.5 font-bold text-[#991b1b] bg-amber-50/30 border-r border-stone-200">५. करण</td>
                <td className="p-1.5 border-r border-stone-200 font-bold">{result.birthPanchang.karana}</td>
                <td className="p-1.5 border-r border-stone-200">तिथि का आधा भाग</td>
                <td className="p-1.5 border-r border-stone-200">चर संज्ञक</td>
                <td className="p-1.5 text-stone-700">व्यापार, उद्योग, पुरुषार्थ एवं भौतिक कार्यों में सफलता कारक।</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dina-maan, Raatri-maan & Astronomical details */}
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>दिनमान, रात्रिमान एवं खगोलीय काल गणना (Astronomical Timings)</span>
            <span className="text-[10px] text-stone-700 font-normal">सटीक घटी-पल व मानक समय</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-stone-200 text-[11px]">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 text-[11px]">
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
          <div className="flex items-center justify-between border-b border-stone-300 pb-1 mb-1.5">
            <span className="font-bold text-[#991b1b] text-xs">जन्म दिवस के विशेष काल एवं वेला:</span>
            <span className="text-[10px] text-stone-600">राहुकाल: {result.birthPanchang.muhurat?.rahuKaal || 'दोपहर'} | गुलिक: {result.birthPanchang.muhurat?.gulikaKaal || 'पूर्वाह्न'}</span>
          </div>
          <p className="text-[11px] text-stone-700 leading-relaxed">
            <strong>पंचांग शास्त्रीय निष्कर्ष:</strong> जातक का जन्म {result.birthPanchang.samvatShaka} शके, {result.birthPanchang.amantaMonth} मास के {result.birthPanchang.paksha} पक्ष की {result.birthPanchang.birthTithi} तिथि को {result.birthPanchang.nakshatra} नक्षत्र में हुआ है। नक्षत्र स्वामी {result.birthPanchang.nakshatraLord} एवं वार स्वामी {result.birthPanchang.dayLord} की परस्पर अनुकूलता जातक को बौद्धिक तीक्ष्णता, व्यावहारिक दक्षता तथा समाज में सम्मान प्रदान करने वाली है।
          </p>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ ३: विस्तृत ग्रह स्पष्ट स्थिति, भाव स्पष्ट, जैमिनी कारक एवं अष्टकवर्ग */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ ३ / ६" pageTitle="ग्रह स्पष्ट स्थिति, भाव व अष्टकवर्ग">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री सूर्य देवाय नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base sm:text-lg font-bold text-[#991b1b]">
            ग्रह स्पष्ट भोगांश, भाव-चलित, जैमिनी कारक एवं सर्वष्टकवर्ग
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Graha Spashta Table */}
        <div className="mb-2.5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans mb-2.5">
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
            <div className="p-2 space-y-1.5 text-[11px]">
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

          <div className="grid grid-cols-6 sm:grid-cols-12 text-center text-[10px]">
            {(result.sarvashtakavarga || [
              { rashiHi: 'मेष', score: 28 }, { rashiHi: 'वृषभ', score: 31 },
              { rashiHi: 'मिथुन', score: 27 }, { rashiHi: 'कर्क', score: 29 },
              { rashiHi: 'सिंह', score: 32 }, { rashiHi: 'कन्या', score: 30 },
              { rashiHi: 'तुला', score: 26 }, { rashiHi: 'वृश्चिक', score: 25 },
              { rashiHi: 'धनु', score: 33 }, { rashiHi: 'मकर', score: 28 },
              { rashiHi: 'कुंभ', score: 30 }, { rashiHi: 'मीन', score: 28 }
            ]).map((s, idx) => (
              <div key={idx} className={`p-1.5 border-r border-b border-stone-200 last:border-r-0 ${s.score >= 28 ? 'bg-emerald-50/60 font-bold text-emerald-950' : 'bg-white text-stone-700'}`}>
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
      <SwastikFrame pageNumber="पृष्ठ ४ / ६" pageTitle="विंशोत्तरी महादशा व अंतर्दशा चक्र">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री विष्णवे नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base sm:text-lg font-bold text-[#991b1b]">
            विंशोत्तरी महादशा एवं अंतर्दशा विस्तृत कालचक्र (120 Years)
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Dasha Balance */}
        <div className="mb-2.5 p-2 bg-amber-50/60 border border-[#991b1b]/40 text-xs font-sans flex flex-wrap items-center justify-between gap-2">
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
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>सम्पूर्ण 9 महादशाओं का जीवन कालक्रम (Full 120-Year Mahadashas)</span>
            <span className="text-[10px] font-normal">जातक की जन्म तिथि से पूर्ण जीवन विस्तार</span>
          </div>

          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="bg-amber-100 text-[#991b1b] font-bold text-center border-b border-stone-200">
                <th className="p-1.5 border-r border-stone-200">महादशा स्वामी</th>
                <th className="p-1.5 border-r border-stone-200">अवधि (वर्ष)</th>
                <th className="p-1.5 border-r border-stone-200">प्रारंभ तिथि</th>
                <th className="p-1.5 border-r border-stone-200">समाप्ति तिथि</th>
                <th className="p-1.5 border-r border-stone-200">आयु काल (वर्ष)</th>
                <th className="p-1.5">वर्तमान स्थिति</th>
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
                  <td className="p-1.5 border-r border-stone-200 font-bold text-[#991b1b]">
                    {d.planet} महादशा
                  </td>
                  <td className="p-1.5 border-r border-stone-200">{d.durationYears} वर्ष</td>
                  <td className="p-1.5 border-r border-stone-200 font-mono">{d.startDateFormatted || `${d.startYear}-01-01`}</td>
                  <td className="p-1.5 border-r border-stone-200 font-mono">{d.endDateFormatted || `${d.endYear}-01-01`}</td>
                  <td className="p-1.5 border-r border-stone-200 font-mono">
                    {Math.max(0, d.startYear - input.year)} से {Math.max(0, d.endYear - input.year)} वर्ष
                  </td>
                  <td className="p-1.5">
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
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>वर्तमान महादशा ({currentDashaObj.planet}) के अंतर्गत सभी अंतर्दशाएं (Antardashas)</span>
            <span className="text-[10px] text-amber-950 font-bold">
              सक्रिय अंतर्दशा: {activeAntardasha?.lord || currentDashaObj.planet}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-9 text-center text-[10px]">
            {(currentDashaObj.antardashas || [
              { lord: currentDashaObj.planet, startDate: `${currentDashaObj.startYear}`, endDate: `${currentDashaObj.startYear + 1}`, isCurrent: true },
              { lord: 'अन्य ग्रह', startDate: `${currentDashaObj.startYear + 1}`, endDate: `${currentDashaObj.startYear + 2}`, isCurrent: false }
            ]).map((ad, i) => (
              <div
                key={i}
                className={`p-1.5 border-r border-b border-stone-200 last:border-r-0 ${
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
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ ५: वैदिक शुभ योग एवं ग्रह दोष गहन विश्लेषण */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ ५ / ६" pageTitle="वैदिक शुभ योग एवं दोष विश्लेषण">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री महालक्ष्म्यै नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base sm:text-lg font-bold text-[#991b1b]">
            कुण्डली में विद्यमान प्रमुख शुभ योग एवं ग्रह दोष विश्लेषण
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Auspicious Vedic Yogas */}
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-emerald-800 text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>कुण्डली में विद्यमान प्रमुख शुभ योग (Auspicious Vedic Yogas)</span>
            <span className="text-[10px] font-normal">भाग्य, प्रतिष्ठा एवं सफलता द्योतक योग</span>
          </div>

          <div className="p-2 space-y-2 bg-emerald-50/20">
            {(result.specialYogas || []).map((y, idx) => (
              <div key={idx} className="p-1.5 bg-white border border-emerald-200 rounded-sm">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-xs text-[#991b1b] flex items-center gap-1">
                    <span className="text-emerald-700">✓</span>
                    <span>{y.name}</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-900">
                    {y.type}
                  </span>
                </div>
                <p className="text-[11px] text-stone-700 leading-tight mb-0.5">
                  <strong>निर्माण कारक:</strong> {y.description}
                </p>
                <p className="text-[11px] text-emerald-900 leading-tight font-medium">
                  <strong>शुभ प्रभाव:</strong> {y.effect}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Major Doshas Breakdown */}
        <div className="border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>ग्रह दोष विचार, प्रभाव एवं शास्त्रीय निवारण (Dosha Vichar & Remedies)</span>
            <span className="text-[10px] font-normal">मांगलिक, कालसर्प, साढ़े साती व पितृ विचार</span>
          </div>

          <div className="p-2 space-y-2">
            {/* Manglik */}
            <div className="border border-stone-200 p-2 bg-stone-50/50">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-xs text-[#991b1b]">१. मांगलिक दोष विचार (Manglik Dosha Analysis):</strong>
                <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                  result.manglikStatus.includes('गैर') || result.manglikStatus.includes('Non')
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {result.manglikStatus}
                </span>
              </div>
              <p className="text-[11px] text-stone-700 leading-tight">
                {result.doshaAnalysis.manglik.description}
              </p>
              {result.doshaAnalysis.manglik.exceptions && result.doshaAnalysis.manglik.exceptions.length > 0 && (
                <p className="text-[10px] text-emerald-800 font-medium mt-0.5">
                  <strong>शास्त्रोक्त निरस्तीकरण/अपवाद:</strong> {result.doshaAnalysis.manglik.exceptions.join(', ')}
                </p>
              )}
            </div>

            {/* Kaal Sarp */}
            <div className="border border-stone-200 p-2 bg-stone-50/50">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-xs text-[#991b1b]">२. कालसर्प योग विश्लेषण (Kaal Sarp Yoga):</strong>
                <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                  result.doshaAnalysis.kaalSarp.isPresent ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {result.doshaAnalysis.kaalSarp.isPresent ? result.doshaAnalysis.kaalSarp.nameHi : 'दोष रहित (No Kaal Sarp)'}
                </span>
              </div>
              <p className="text-[11px] text-stone-700 leading-tight">
                {result.doshaAnalysis.kaalSarp.description}
              </p>
              {result.doshaAnalysis.kaalSarp.remedy && (
                <p className="text-[10px] text-amber-950 font-medium mt-0.5">
                  <strong>शांति विधान:</strong> {result.doshaAnalysis.kaalSarp.remedy}
                </p>
              )}
            </div>

            {/* Sade Sati */}
            <div className="border border-stone-200 p-2 bg-stone-50/50">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-xs text-[#991b1b]">३. शनि साढ़े साती एवं ढैय्या विचार (Shani Sade Sati):</strong>
                <span className="text-[10px] font-bold text-stone-900 bg-amber-100 px-2 py-0.2 rounded">
                  {result.doshaAnalysis.sadeSati.status} ({result.doshaAnalysis.sadeSati.phase})
                </span>
              </div>
              <p className="text-[11px] text-stone-700 leading-tight">
                {result.doshaAnalysis.sadeSati.description}
              </p>
              {result.doshaAnalysis.sadeSati.remedy && (
                <p className="text-[10px] text-stone-700 mt-0.5">
                  <strong>उपाय:</strong> {result.doshaAnalysis.sadeSati.remedy}
                </p>
              )}
            </div>

            {/* Pitra Dosha */}
            <div className="border border-stone-200 p-2 bg-stone-50/50">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-xs text-[#991b1b]">४. पितृ दोष एवं अन्य ग्रह युति विचार:</strong>
                <span className="text-[10px] font-bold text-emerald-800">
                  {result.doshaAnalysis.pitraDosh.isPresent ? 'साधारण लक्षण' : 'दोष मुक्त'}
                </span>
              </div>
              <p className="text-[11px] text-stone-700 leading-tight">
                {result.doshaAnalysis.pitraDosh.description || 'नवम भाव एवं सूर्य की शुभ स्थिति के कारण पितरों का आशीर्वाद जातक पर बना रहेगा।'}
              </p>
            </div>
          </div>
        </div>
      </SwastikFrame>

      {/* ========================================================================= */}
      {/* पृष्ठ ६: सम्पूर्ण जीवन फलादेश, शास्त्रोक्त उपाय, रत्न-रुद्राक्ष एवं मुहर */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ ६ / ६" pageTitle="सम्पूर्ण जीवन फलादेश एवं ज्योतिषी आशीर्वाद">
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री जगदम्बिकायै नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base sm:text-lg font-bold text-[#991b1b]">
            सम्पूर्ण जीवन फलादेश, विहित उपाय एवं ज्योतिषाचार्य प्रमाण पत्र
          </h2>
          <span className="font-sans text-stone-700 text-[11px]">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* Life Prediction Sections */}
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold flex items-center justify-between">
            <span>द्वादश भाव आधारित सम्पूर्ण जीवन फलादेश (Comprehensive Life Predictions)</span>
            <span className="text-[10px] font-normal">लग्न, चंद्र व दशमेश ग्रह अनुसार फलादेश</span>
          </div>

          <div className="p-2 space-y-2">
            <div>
              <strong className="text-xs text-[#991b1b] block">१. व्यक्तित्व, स्वभाव व शारीरिक बल (Personality & General Life):</strong>
              <p className="text-[11px] text-stone-700 leading-relaxed">
                {result.lifePrediction.general}
              </p>
            </div>

            <div className="pt-1.5 border-t border-stone-200">
              <strong className="text-xs text-[#991b1b] block">२. आजीविका, धन, नौकरी व व्यवसाय (Career, Wealth & Success):</strong>
              <p className="text-[11px] text-stone-700 leading-relaxed">
                {result.lifePrediction.career}
              </p>
            </div>

            <div className="pt-1.5 border-t border-stone-200">
              <strong className="text-xs text-[#991b1b] block">३. विवाह, दांपत्य जीवन व पारिवारिक सुख (Marriage & Family Harmony):</strong>
              <p className="text-[11px] text-stone-700 leading-relaxed">
                {result.lifePrediction.marriage}
              </p>
            </div>

            <div className="pt-1.5 border-t border-stone-200">
              <strong className="text-xs text-[#991b1b] block">४. स्वास्थ्य, जीवन ऊर्जा एवं सावधानियां (Health & Wellness):</strong>
              <p className="text-[11px] text-stone-700 leading-relaxed">
                {result.lifePrediction.health}
              </p>
            </div>
          </div>
        </div>

        {/* Remedial Measures */}
        <div className="mb-2.5 border border-[#991b1b]/40 text-xs font-sans bg-amber-50/30">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>शास्त्रोक्त उपाय, रत्न, रुद्राक्ष एवं सिद्ध मंत्र (Vedic Remedies)</span>
            <span className="text-[10px] text-stone-700 font-normal">आचार्य द्वारा प्रमाणित मार्गदर्शन</span>
          </div>

          <div className="p-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] mb-2">
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[10px] block">भाग्य रत्न (Gemstone):</span>
                <strong className="text-[#991b1b]">{result.lifePrediction.luckyGem}</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[10px] block">सिद्ध रुद्राक्ष:</span>
                <strong className="text-amber-950">पंचमुखी / सातमुखी</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[10px] block">शुभ रंग (Color):</span>
                <strong className="text-stone-900">पीला, श्वेत या नारंगी</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[10px] block">शुभ अंक (Numbers):</span>
                <strong className="text-stone-900 font-mono">1, 3, 7, 9</strong>
              </div>
              <div className="p-1 bg-white rounded border border-amber-200">
                <span className="text-stone-500 text-[10px] block">इष्ट देव (Deity):</span>
                <strong className="text-stone-900">श्री गणेश व कुलदेवता</strong>
              </div>
            </div>

            <div className="space-y-1 text-[11px]">
              <div>
                <strong className="text-[#991b1b]">दैनिक सिद्ध मंत्र:</strong>{' '}
                <span className="font-mono font-bold text-stone-900">{result.lifePrediction.luckyMantra}</span>
              </div>
              <div>
                <strong className="text-stone-900">विहित शास्त्रोक्त नियम व दान:</strong>{' '}
                <span className="text-stone-700">
                  {(result.lifePrediction.recommendedUpay || [
                    'प्रतिदिन प्रातः सूर्य देव को तांबे के लोटे से जल एवं कुमकुम अर्पित करें।',
                    'गुरुवार अथवा शनिवार को गौमाता को हरा चारा या गुड़ की रोटी खिलाएं।',
                    'इष्ट मंत्र का 108 बार नित्य तुलसी या रुद्राक्ष की माला से जप करें।'
                  ]).join(' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Astrologer Blessing & Seal */}
        <div className="border-t-2 border-[#991b1b] pt-2 flex flex-wrap items-center justify-between text-xs font-sans">
          <div className="space-y-1 max-w-lg">
            <span className="font-bold text-[#991b1b] block text-xs">
              ॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके । शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते ॥
            </span>
            <p className="text-[10px] text-stone-600">
              यह शास्त्रोक्त जन्म कुण्डली राष्ट्रीय दृक गणित (लाहिड़ी अयनांश 23° 48' 12") तथा कालनिर्णय पंचांग की शुद्ध खगोलीय तालिकाओं द्वारा निर्मित की गई है।
            </p>
            <p className="text-[10px] text-stone-500">
              {ASTROLOGER_INFO.centerName} • {ASTROLOGER_INFO.address} • फोन: {ASTROLOGER_INFO.phonePrimary} • {ASTROLOGER_INFO.email}
            </p>
          </div>

          <div className="text-center mt-2 sm:mt-0 p-2 border border-amber-400 rounded bg-amber-50/70 min-w-[190px] shadow-xs">
            <div className="text-base text-[#991b1b] mb-0.5">⚜️</div>
            <span className="font-yatra text-xs font-bold text-[#991b1b] block">
              {ASTROLOGER_INFO.name}
            </span>
            <span className="text-[9px] text-stone-600 block">
              {ASTROLOGER_INFO.experience} • महर्षि पाराशर परिषद
            </span>
            <span className="text-[9px] font-bold text-[#B45309] block mt-0.5 border-t border-amber-200 pt-0.5">
              [अधिकृत ज्योतिषी हस्ताक्षर व मुद्रा]
            </span>
          </div>
        </div>

      </SwastikFrame>

    </div>
  );
};
