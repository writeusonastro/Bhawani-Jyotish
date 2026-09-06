import React from 'react';
import { KundliResult, KundliInput, Language } from '../types/astrology';

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
export const SwastikFrame: React.FC<{ children: React.ReactNode; pageNumber: string }> = ({
  children,
  pageNumber
}) => {
  // Repeating array of Swastiks for top/bottom (approx 24-28 icons across A4 width)
  const horizontalSwastiks = Array.from({ length: 26 }, (_, i) => i);
  // Repeating array of Swastiks for left/right (approx 34-38 icons down A4 height)
  const verticalSwastiks = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className="print-page relative w-full bg-[#FFFDF9] text-stone-900 box-border p-3 sm:p-4 my-4 shadow-lg print:shadow-none print:my-0 print:p-2 border-2 border-[#991b1b]">
      {/* Outer Golden/Maroon Frame Container */}
      <div className="relative border border-[#B45309] p-1.5 sm:p-2 bg-[#FFFDF9]">
        
        {/* ================= TOP SWASTIK BORDER ================= */}
        <div className="flex items-center justify-between px-2 py-0.5 border-b border-[#991b1b] bg-amber-50/60 text-[#991b1b] select-none">
          <span className="font-bold text-sm text-[#991b1b] flex items-center gap-1">
            <span className="text-base leading-none">卐</span>
            <span className="text-xs">ॐ</span>
          </span>
          <div className="flex-1 flex justify-around items-center overflow-hidden px-1 text-[11px] font-bold tracking-wider">
            {horizontalSwastiks.map((idx) => (
              <span key={`top-${idx}`} className="inline-flex items-center gap-1 mx-0.5">
                <span className="text-[#991b1b] hover:scale-110 transition-transform">卐</span>
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
          <div className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-white/90">
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
        <div className="flex items-center justify-between px-2 py-0.5 border-t border-[#991b1b] bg-amber-50/60 text-[#991b1b] select-none">
          <span className="font-bold text-sm text-[#991b1b] flex items-center gap-1">
            <span className="text-base leading-none">卐</span>
            <span className="text-xs">ॐ</span>
          </span>
          <div className="flex-1 flex justify-around items-center overflow-hidden px-1 text-[11px] font-bold tracking-wider">
            {horizontalSwastiks.map((idx) => (
              <span key={`bot-${idx}`} className="inline-flex items-center gap-1 mx-0.5">
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

        {/* Page numbering at bottom */}
        <div className="text-center text-[10px] font-bold text-stone-600 pt-1 flex justify-between px-2">
          <span>॥ शुभम भवतु ॥</span>
          <span className="text-[#991b1b]">{pageNumber}</span>
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

      <div className="w-full aspect-square max-w-[280px] sm:max-w-[320px] relative bg-[#FFFDF9] border border-[#991b1b] shadow-2xs">
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
  return (
    <div id="kundli-print-root" className="w-full text-stone-900 bg-white font-serif">
      
      {/* ========================================================================= */}
      {/* PAGE 1: मुख्य जन्म पत्रिका, लग्न व नवमांश चक्र, पंचांग एवं अवकहड़ा चक्र */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ १ / २ • जन्म लग्न चक्र व पंचांग विवरण">
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
              ज्योतिषाचार्य पं. विरेंद्र कुमार जोशी (गोल्ड मेडलिस्ट - महर्षि पाराशर ज्योतिष परिषद)
            </span>
            <span>•</span>
            <span className="text-stone-600">
              लाहिड़ी अयनांश (Drik Ganit / NC Lahiri) व कालनिर्णय पंचांग मानक
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

        {/* SECTION 2: कुण्डली चक्र (Side-by-Side Dual Charts) */}
        <div className="mb-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 bg-stone-50/70 border border-[#991b1b]/40 rounded-sm">
            <NorthIndianPrintChart
              title="जन्म लग्न कुण्डली (D-1 Chart)"
              ascendantRashi={result.ascendantRashi}
              planets={result.planets}
              isNavamsha={false}
            />

            <NorthIndianPrintChart
              title="नवमांश कुण्डली (D-9 Chart - भाग्य व दांपत्य)"
              ascendantRashi={result.navamshaPlanets[0]?.navamshaRashi || result.ascendantRashi}
              planets={result.navamshaPlanets}
              isNavamsha={true}
            />
          </div>
        </div>

        {/* SECTION 3: कालनिर्णय पंचांग व अवकहड़ा चक्र (Panchang & Avakahada Tables) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs font-sans">
          
          {/* Kalnirnay & Vedic Panchang (8 cols) */}
          <div className="sm:col-span-8 border border-[#991b1b]/40">
            <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
              <span>कालनिर्णय व वैदिक पंचांग विवरण (Birth Panchang)</span>
              <span className="text-[10px] text-amber-950 font-normal">
                {result.birthPanchang.samvatShaka}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 border-b border-stone-200">
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">विक्रम संवत:</span>
                <strong className="text-stone-900">{result.birthPanchang.samvatVikram.split('(')[0]}</strong>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">शालिवाहन शके:</span>
                <strong className="text-[#991b1b]">{result.birthPanchang.samvatShaka}</strong>
              </div>
              <div className="p-1.5">
                <span className="text-stone-500 text-[10px] block">संवत्सर नाम:</span>
                <strong className="text-stone-900">{result.birthPanchang.samvatsaraName || 'आनंद'}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 border-b border-stone-200">
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">अमान्त मास (कालनिर्णय):</span>
                <strong className="text-stone-950">{result.birthPanchang.amantaMonth || result.birthPanchang.hinduMonth}</strong>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">पूर्णिमान्त मास:</span>
                <strong className="text-stone-950">{result.birthPanchang.purnimantaMonth || result.birthPanchang.hinduMonth}</strong>
              </div>
              <div className="p-1.5">
                <span className="text-stone-500 text-[10px] block">पक्ष व ऋतु:</span>
                <strong className="text-stone-900">{result.birthPanchang.paksha}, {result.birthPanchang.ritu}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 border-b border-stone-200">
              <div className="p-1.5 border-r border-stone-200 bg-amber-50/50">
                <span className="text-[#991b1b] text-[10px] font-bold block">उदय तिथि (कालनिर्णय कैलेंडर):</span>
                <strong className="text-[#991b1b] text-xs">{result.birthPanchang.sunriseTithi || result.birthPanchang.tithi}</strong>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">जन्म समय तिथि:</span>
                <strong className="text-stone-900">{result.birthPanchang.birthTithi || result.birthPanchang.tithi}</strong>
                <span className="text-[10px] text-stone-600 block">{result.birthPanchang.tithiEnding}</span>
              </div>
              <div className="p-1.5">
                <span className="text-stone-500 text-[10px] block">नक्षत्र व समाप्ति:</span>
                <strong className="text-stone-900">{result.birthPanchang.nakshatra} ({result.birthPanchang.nakshatraCharan})</strong>
                <span className="text-[10px] text-stone-600 block">{result.birthPanchang.nakshatraEnding}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3">
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">नित्य योग:</span>
                <strong className="text-stone-900">{result.birthPanchang.yoga}</strong>
                <span className="text-[10px] text-stone-600 block">{result.birthPanchang.yogaEnding}</span>
              </div>
              <div className="p-1.5 border-r border-stone-200">
                <span className="text-stone-500 text-[10px] block">करण व वारेश:</span>
                <strong className="text-stone-900">{result.birthPanchang.karana} (वार: {result.birthPanchang.dayLord})</strong>
              </div>
              <div className="p-1.5">
                <span className="text-stone-500 text-[10px] block">सूर्योदय / सूर्यास्त:</span>
                <span className="text-stone-900 font-mono font-bold text-[11px]">☀️ {result.birthPanchang.sunrise} | 🌙 {result.birthPanchang.sunset}</span>
              </div>
            </div>
          </div>

          {/* Avakahada Chakra (4 cols) */}
          <div className="sm:col-span-4 border border-[#991b1b]/40">
            <div className="bg-[#991b1b] text-white px-2 py-0.5 font-bold text-center">
              अवकहड़ा चक्र (Avakahada)
            </div>

            <table className="w-full text-[11px] border-collapse">
              <tbody>
                <tr className="border-b border-stone-200">
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40 w-1/2">वर्ण (Varna)</td>
                  <td className="p-1 font-bold text-stone-900">{result.avakahadaChakra.varna}</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40">वश्य (Vashya)</td>
                  <td className="p-1 font-bold text-stone-900">{result.avakahadaChakra.vashya}</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40">योनि (Yoni)</td>
                  <td className="p-1 font-bold text-stone-900">{result.avakahadaChakra.yoni}</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40">गण (Gana)</td>
                  <td className="p-1 font-bold text-stone-900">{result.avakahadaChakra.gana}</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40">नाड़ी (Nadi)</td>
                  <td className="p-1 font-bold text-[#991b1b]">{result.avakahadaChakra.nadi}</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40">पाया (Paya)</td>
                  <td className="p-1 font-bold text-emerald-800">{result.birthPanchang.paya?.split(' ')[0] || 'रजत पाया'}</td>
                </tr>
                <tr>
                  <td className="p-1 font-semibold text-stone-500 bg-amber-50/40">तत्व / स्वामी</td>
                  <td className="p-1 font-bold text-stone-900">{result.avakahadaChakra.tatva} / {result.avakahadaChakra.rashiLord}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </SwastikFrame>

      {/* ========================================================================= */}
      {/* PAGE 2: ग्रह स्पष्ट सारणी, विंशोत्तरी महादशा, योग एवं दोष विश्लेषण व मुहर */}
      {/* ========================================================================= */}
      <SwastikFrame pageNumber="पृष्ठ २ / २ • ग्रह स्पष्ट सारणी, महादशा व फलादेश">
        {/* Page 2 Top Header */}
        <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-1.5 mb-2 text-xs">
          <span className="font-bold text-[#991b1b] flex items-center gap-1">
            <span>卐</span>
            <span>॥ श्री हनुमते नमः ॥</span>
          </span>
          <h2 className="font-yatra text-base sm:text-lg font-bold text-[#991b1b]">
            ग्रह स्पष्ट भोगांश सारणी एवं विंशोत्तरी दशा विवरण
          </h2>
          <span className="font-sans text-stone-700 text-[11px] font-semibold">
            जातक: <strong>{input.name}</strong>
          </span>
        </div>

        {/* SECTION 4: ग्रह स्पष्ट सारणी (Graha Spashta Table) */}
        <div className="mb-3">
          <div className="bg-[#991b1b] text-white px-2 py-0.5 text-xs font-bold flex items-center justify-between">
            <span>ग्रह स्पष्ट भोगांश, भाव, नक्षत्र व कारक स्थिति (Planetary Ephemeris)</span>
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
              <tr className="bg-amber-50/60 font-bold border-b border-stone-200">
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

              {/* 9 Planets Rows */}
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

        {/* SECTION 5: विंशोत्तरी महादशा चक्र (Vimshottari Dasha Table) */}
        <div className="mb-3 border border-[#991b1b]/40">
          <div className="bg-amber-100 text-[#991b1b] px-2 py-0.5 text-xs font-bold border-b border-[#991b1b]/40 flex items-center justify-between">
            <span>विंशोत्तरी महादशा क्रम (120 वर्षीय चक्र)</span>
            <span className="text-[11px] font-sans font-bold text-[#991b1b]">
              जन्म समय शेष दशा: {result.birthDashaBalance || 'दशा शेष मान गणना अनुसार'}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-9 text-center text-[10px] font-sans">
            {result.dashaTimeline.map((d, i) => (
              <div
                key={d.planet}
                className={`p-1 border-r border-stone-200 last:border-r-0 ${
                  d.isCurrent
                    ? 'bg-amber-200/90 text-amber-950 font-bold ring-1 ring-[#991b1b]'
                    : d.isPast
                    ? 'bg-stone-50 text-stone-500'
                    : 'bg-white text-stone-800'
                }`}
              >
                <span className="block font-bold text-xs text-[#991b1b]">{d.planet}</span>
                <span className="block text-[9px] text-stone-600">{d.durationYears} वर्ष</span>
                <span className="block font-mono text-[9px]">{d.startYear} - {d.endYear}</span>
                {d.isCurrent && (
                  <span className="inline-block mt-0.5 px-1 py-0.2 rounded bg-[#991b1b] text-white text-[8px] font-bold">
                    वर्तमान
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: दोष, विशेष योग व मांगलिक विचार (Yogas & Doshas Analysis) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans mb-3">
          {/* Dosha Analysis Box */}
          <div className="border border-[#991b1b]/40 p-2 bg-stone-50/50">
            <h4 className="font-bold text-[#991b1b] text-xs border-b border-[#991b1b]/30 pb-1 mb-1.5 flex items-center justify-between">
              <span>दोष एवं ग्रह शांति विचार</span>
              <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                result.manglikStatus.includes('गैर') || result.manglikStatus.includes('Non')
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {result.manglikStatus}
              </span>
            </h4>

            <div className="space-y-1 text-[11px]">
              <div>
                <strong className="text-stone-900">मांगलिक स्थिति:</strong>{' '}
                <span className="text-stone-700">{result.doshaAnalysis.manglik.description}</span>
              </div>
              <div>
                <strong className="text-stone-900">कालसर्प योग:</strong>{' '}
                <span className={result.doshaAnalysis.kaalSarp.isPresent ? 'text-rose-700 font-bold' : 'text-emerald-800'}>
                  {result.doshaAnalysis.kaalSarp.nameHi} - {result.doshaAnalysis.kaalSarp.description}
                </span>
              </div>
              <div>
                <strong className="text-stone-900">शनि साढ़े साती:</strong>{' '}
                <span className="text-stone-700">{result.doshaAnalysis.sadeSati.status} ({result.doshaAnalysis.sadeSati.phase})</span>
              </div>
            </div>
          </div>

          {/* Major Auspicious Yogas Box */}
          <div className="border border-[#991b1b]/40 p-2 bg-stone-50/50">
            <h4 className="font-bold text-[#991b1b] text-xs border-b border-[#991b1b]/30 pb-1 mb-1.5">
              कुंडली में विद्यमान प्रमुख शुभ योग (Auspicious Yogas)
            </h4>
            <div className="space-y-1 text-[11px]">
              {(result.specialYogas || []).slice(0, 3).map((y, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <div>
                    <strong className="text-[#991b1b]">{y.name}:</strong>{' '}
                    <span className="text-stone-700">{y.effect}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 7: शुभ तत्व एवं जीवनोपयोगी मार्गदर्शन */}
        <div className="border border-[#991b1b]/40 p-2 bg-amber-50/40 text-xs font-sans mb-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px]">
            <div className="p-1 bg-white rounded border border-amber-200">
              <span className="text-stone-500 text-[10px] block">भाग्य रत्न (Gemstone):</span>
              <strong className="text-[#991b1b]">{result.lifePrediction.luckyGem}</strong>
            </div>
            <div className="p-1 bg-white rounded border border-amber-200">
              <span className="text-stone-500 text-[10px] block">शुभ रंग (Color):</span>
              <strong className="text-stone-900">पीला, श्वेत अथवा नारंगी</strong>
            </div>
            <div className="p-1 bg-white rounded border border-amber-200">
              <span className="text-stone-500 text-[10px] block">शुभ अंक (Numbers):</span>
              <strong className="text-stone-900">1, 3, 7, 9</strong>
            </div>
            <div className="p-1 bg-white rounded border border-amber-200">
              <span className="text-stone-500 text-[10px] block">इष्ट देव (Deity):</span>
              <strong className="text-stone-900">श्री गणेश एवं कुलदेवता</strong>
            </div>
            <div className="p-1 bg-white rounded border border-amber-200">
              <span className="text-stone-500 text-[10px] block">दैनिक मंत्र:</span>
              <strong className="text-[#991b1b] text-[10px]">{result.lifePrediction.luckyMantra}</strong>
            </div>
          </div>
        </div>

        {/* SECTION 8: ज्योतिषाचार्य आशीर्वाद व प्रामाणिकता मुहर (Seal & Signature) */}
        <div className="border-t-2 border-[#991b1b] pt-2 flex flex-wrap items-center justify-between text-xs font-sans">
          <div className="space-y-0.5">
            <span className="font-bold text-[#991b1b] block text-xs">
              ॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके । शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते ॥
            </span>
            <p className="text-[10px] text-stone-600">
              यह शास्त्रोक्त जन्म पत्रिका वैदिक पंचांग एवं राष्ट्रीय दृक गणित (लाहिड़ी अयनांश) द्वारा शुद्ध गणना पर आधारित है।
            </p>
            <p className="text-[10px] text-stone-500">
              श्री जगदम्बा ज्योतिष कार्यालय • फोन: +91 98250 12345 • writeusonastro@gmail.com
            </p>
          </div>

          <div className="text-center mt-2 sm:mt-0 p-2 border border-amber-300 rounded bg-amber-50/50 min-w-[170px]">
            <div className="text-base text-[#991b1b] mb-0.5">⚜️</div>
            <span className="font-yatra text-xs font-bold text-[#991b1b] block">
              पं. विरेंद्र कुमार जोशी
            </span>
            <span className="text-[9px] text-stone-600 block">
              गोल्ड मेडलिस्ट - महर्षि पाराशर ज्योतिष परिषद
            </span>
            <span className="text-[9px] font-bold text-[#B45309] block mt-0.5">
              [अधिकृत ज्योतिषी मुहर]
            </span>
          </div>
        </div>

      </SwastikFrame>

    </div>
  );
};
