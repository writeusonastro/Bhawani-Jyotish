import React, { useState } from 'react';
import { PlanetPosition, Language } from '../types/astrology';
import { Sparkles, Info, Eye, Layers } from 'lucide-react';

interface KundliChartVisualizerProps {
  planets: PlanetPosition[];
  navamshaPlanets?: PlanetPosition[];
  ascendantRashi: string;
  moonRashi?: string;
  lang: Language;
  isDark?: boolean;
}

interface HouseMeta {
  number: number;
  nameHi: string;
  nameGu: string;
  nameEn: string;
  significanceHi: string;
  significanceGu: string;
  significanceEn: string;
  karakaHi: string;
  karakaGu: string;
  karakaEn: string;
}

const HOUSE_DATA: HouseMeta[] = [
  {
    number: 1,
    nameHi: 'प्रथम भाव (तनु भाव / लग्न)',
    nameGu: 'પ્રથમ ભાવ (તનુ ભાવ / લગ્ન)',
    nameEn: '1st House (Tanu / Ascendant)',
    significanceHi: 'शरीर, व्यक्तित्व, स्वास्थ्य, आत्मबल, रूप-रंग और जीवन का संपूर्ण दृष्टिकोण।',
    significanceGu: 'શરીર, વ્યક્તિત્વ, સ્વાસ્થ્ય અને આત્મવિશ્વાસ.',
    significanceEn: 'Physical body, personality, self-confidence, vitality, and general outlook on life.',
    karakaHi: 'सूर्य (Sun)',
    karakaGu: 'સૂર્ય (Sun)',
    karakaEn: 'Sun (Surya)'
  },
  {
    number: 2,
    nameHi: 'द्वितीय भाव (धन भाव / कुटुम्ब)',
    nameGu: 'દ્વિતીય ભાવ (ધન ભાવ / કુટુંબ)',
    nameEn: '2nd House (Dhana / Family & Wealth)',
    significanceHi: 'संचित धन, परिवार, वाणी, प्रारंभिक शिक्षा और खान-पान।',
    significanceGu: 'સંચિત ધન, પરિવાર અને વાણી.',
    significanceEn: 'Accumulated wealth, immediate family, speech, primary values, and assets.',
    karakaHi: 'गुरु / बृहस्पति (Jupiter)',
    karakaGu: 'ગુરુ (Jupiter)',
    karakaEn: 'Jupiter (Guru)'
  },
  {
    number: 3,
    nameHi: 'तृतीय भाव (सहज भाव / पराक्रम)',
    nameGu: 'તૃતીય ભાવ (સહજ ભાવ / પરાક્રમ)',
    nameEn: '3rd House (Sahaja / Courage & Siblings)',
    significanceHi: 'छोटे भाई-बहन, साहस, पराक्रम, छोटी यात्राएं और संचार कौशल।',
    significanceGu: 'નાના ભાઈ-બહેન, સાહસ અને મુસાફરી.',
    significanceEn: 'Younger siblings, courage, efforts, short travel, and communication skills.',
    karakaHi: 'मंगल (Mars)',
    karakaGu: 'મંગળ (Mars)',
    karakaEn: 'Mars (Mangal)'
  },
  {
    number: 4,
    nameHi: 'चतुर्थ भाव (सुख भाव / मातृ भाव)',
    nameGu: 'ચતુર્થ ભાવ (સુખ ભાવ / માતૃ ભાવ)',
    nameEn: '4th House (Sukha / Mother & Home)',
    significanceHi: 'माता का सुख, भूमि, मकान, वाहन, गृहस्थ शांति और मानसिक संतोष।',
    significanceGu: 'માતાનું સુખ, જમીન-મકાન, વાહન અને માનસિક શાંતિ.',
    significanceEn: 'Mother, land, property, vehicles, domestic comfort, and inner contentment.',
    karakaHi: 'चंद्रमा (Moon)',
    karakaGu: 'ચંદ્ર (Moon)',
    karakaEn: 'Moon (Chandra)'
  },
  {
    number: 5,
    nameHi: 'पंचम भाव (सुत / विद्या भाव)',
    nameGu: 'પંચમ ભાવ (સંતતિ / વિદ્યા ભાવ)',
    nameEn: '5th House (Suta / Children & Intellect)',
    significanceHi: 'संतान सुख, उच्च बुद्धि, पूर्वजन्म पुण्य, मंत्र साधना और रचनात्मक प्रतिभा।',
    significanceGu: 'સંતાન સુખ, બુદ્ધિ અને પ્રતિભા.',
    significanceEn: 'Progeny, higher intellect, creative talents, speculative gains, and poorva punya.',
    karakaHi: 'गुरु / बृहस्पति (Jupiter)',
    karakaGu: 'ગુરુ (Jupiter)',
    karakaEn: 'Jupiter (Guru)'
  },
  {
    number: 6,
    nameHi: 'षष्ठ भाव (रिपु / रोग भाव)',
    nameGu: 'ષષ્ઠ ભાવ (શત્રુ / રોગ ભાવ)',
    nameEn: '6th House (Ripu / Enemies & Health)',
    significanceHi: 'शत्रु, रोग, ऋण (कर्ज), कोर्ट-कचहरी, प्रतियोगिता और दैनिक सेवा।',
    significanceGu: 'શત્રુ, રોગ, દેવું અને સ્પર્ધાત્મક પરીક્ષા.',
    significanceEn: 'Enemies, diseases, debts, legal matters, competition, and day-to-day work.',
    karakaHi: 'मंगल एवं शनि (Mars & Saturn)',
    karakaGu: 'મંગળ અને શનિ',
    karakaEn: 'Mars & Saturn'
  },
  {
    number: 7,
    nameHi: 'सप्तम भाव (जाया / कलत्र भाव)',
    nameGu: 'સપ્તમ ભાવ (દાંપત્ય / લગ્ન ભાવ)',
    nameEn: '7th House (Jaya / Marriage & Partnership)',
    significanceHi: 'पति/पत्नी, वैवाहिक जीवन, साझेदारी (Partnership) और जनसंपर्क।',
    significanceGu: 'પતિ/પત્ની, દાંપત્ય સુખ અને ભાગીદારી.',
    significanceEn: 'Spouse, married life, business partnerships, and public dealings.',
    karakaHi: 'शुक्र (Venus)',
    karakaGu: 'શુક્ર (Venus)',
    karakaEn: 'Venus (Shukra)'
  },
  {
    number: 8,
    nameHi: 'अष्टम भाव (आयु / मृत्यु भाव)',
    nameGu: 'અષ્ટમ ભાવ (આયુષ્ય / સંશોધન ભાવ)',
    nameEn: '8th House (Ayu / Longevity & Transformation)',
    significanceHi: 'दीर्घायु, गुप्त धन, पैतृक संपत्ति, आकस्मिक घटनाएं और गूढ़ विद्याएं।',
    significanceGu: 'આયુષ્ય, ગૂઢ વિદ્યા અને આકસ્મિક ધન.',
    significanceEn: 'Longevity, occult sciences, inheritance, unexpected transformations, and research.',
    karakaHi: 'शनि (Saturn)',
    karakaGu: 'શનિ (Saturn)',
    karakaEn: 'Saturn (Shani)'
  },
  {
    number: 9,
    nameHi: 'नवम भाव (भाग्य / धर्म भाव)',
    nameGu: 'નવમ ભાવ (ભાગ્ય / ધર્મ ભાવ)',
    nameEn: '9th House (Bhagya / Fortune & Dharma)',
    significanceHi: 'भाग्य, धर्म, गुरु, पिता, उच्च शिक्षा, तीर्थ यात्रा और ईश्वरीय कृपा।',
    significanceGu: 'ભાગ્ય, ધર્મ, ગુરુ અને તીર્થયાત્રા.',
    significanceEn: 'Fortune, spirituality, guru, father, pilgrimage, and divine grace.',
    karakaHi: 'गुरु एवं सूर्य (Jupiter & Sun)',
    karakaGu: 'ગુરુ અને સૂર્ય',
    karakaEn: 'Jupiter & Sun'
  },
  {
    number: 10,
    nameHi: 'दशम भाव (कर्म भाव / राज्य)',
    nameGu: 'દશમ ભાવ (કર્મ ભાવ / પદવી)',
    nameEn: '10th House (Karma / Career & Profession)',
    significanceHi: 'आजीविका, पद-प्रतिष्ठा, सरकारी नौकरी, व्यवसाय और समाज में प्रभुत्व।',
    significanceGu: 'નોકરી, વ્યવસાય, માન-સન્માન અને પદવી.',
    significanceEn: 'Career, profession, social status, government favor, and reputation.',
    karakaHi: 'सूर्य, बुध, गुरु व शनि',
    karakaGu: 'સૂર્ય, બુધ, ગુરુ અને શનિ',
    karakaEn: 'Sun, Mercury, Jupiter, Saturn'
  },
  {
    number: 11,
    nameHi: 'एकादश भाव (लाभ / आय भाव)',
    nameGu: 'એકાદશ ભાવ (લાભ / આવક ભાવ)',
    nameEn: '11th House (Labha / Gains & Network)',
    significanceHi: 'समस्त प्रकार के लाभ, आय के स्रोत, बड़े भाई-बहन और मनोकामना पूर्ति।',
    significanceGu: 'આવક, લાભ, મોટા ભાઈ-બહેન અને સિદ્ધિ.',
    significanceEn: 'Inflow of gains, profits, elder siblings, social networks, and fulfilled desires.',
    karakaHi: 'गुरु (Jupiter)',
    karakaGu: 'ગુરુ (Jupiter)',
    karakaEn: 'Jupiter (Guru)'
  },
  {
    number: 12,
    nameHi: 'द्वादश भाव (व्यय / मोक्ष भाव)',
    nameGu: 'દ્વાદશ ભાવ (ખર્ચ / મોક્ષ ભાવ)',
    nameEn: '12th House (Vyaya / Moksha & Foreign Lands)',
    significanceHi: 'विदेश यात्रा, खर्च, मोक्ष, अस्पताल, आध्यात्मिक एकांत और दान-पुण्य।',
    significanceGu: 'વિદેશ યાત્રા, ખર્ચ, મોક્ષ અને દાન.',
    significanceEn: 'Foreign travels, expenditures, spiritual liberation, subconscious, and charities.',
    karakaHi: 'शनि एवं केतु (Saturn & Ketu)',
    karakaGu: 'શનિ અને કેતુ',
    karakaEn: 'Saturn & Ketu'
  }
];

const RASHI_ORDER = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'
];

export const KundliChartVisualizer: React.FC<KundliChartVisualizerProps> = ({
  planets,
  navamshaPlanets,
  ascendantRashi,
  moonRashi,
  lang,
  isDark = false
}) => {
  const [chartType, setChartType] = useState<'D1' | 'CHANDRA' | 'CHALIT' | 'D9'>('D1');
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [selectedHouse, setSelectedHouse] = useState<number | null>(1);

  // Determine active Ascendant rashi for each chart type
  let activeAscendant = ascendantRashi;
  if (chartType === 'CHANDRA' && moonRashi) {
    activeAscendant = moonRashi;
  } else if (chartType === 'D9' && navamshaPlanets && navamshaPlanets.length > 0) {
    activeAscendant = navamshaPlanets[0].navamshaRashi || ascendantRashi;
  }

  // Calculate Rashi assigned to each house
  const ascIndex = Math.max(0, RASHI_ORDER.findIndex(r => activeAscendant.includes(r)));
  const moonIndex = moonRashi ? Math.max(0, RASHI_ORDER.findIndex(r => moonRashi.includes(r))) : 0;

  const getRashiForHouse = (houseNum: number): string => {
    const rashiIdx = (ascIndex + (houseNum - 1)) % 12;
    return RASHI_ORDER[rashiIdx];
  };

  const getPlanetsInHouse = (houseNum: number): PlanetPosition[] => {
    if (chartType === 'D9') {
      const sourcePlanets = navamshaPlanets && navamshaPlanets.length > 0 ? navamshaPlanets : planets;
      return sourcePlanets.filter(p => (p.navamshaHouse || p.house) === houseNum);
    }
    if (chartType === 'CHANDRA') {
      return planets.filter(p => {
        const pRashiIdx = RASHI_ORDER.findIndex(r => p.rashi.includes(r));
        const houseFromMoon = ((pRashiIdx - moonIndex + 12) % 12) + 1;
        return houseFromMoon === houseNum;
      });
    }
    if (chartType === 'CHALIT') {
      return planets.filter(p => (p.chalitHouse || p.house) === houseNum);
    }
    // D1
    return planets.filter(p => p.house === houseNum);
  };

  // Active House details
  const activeHouseMeta = HOUSE_DATA.find(h => h.number === selectedHouse) || HOUSE_DATA[0];
  const activeHousePlanets = selectedHouse ? getPlanetsInHouse(selectedHouse) : [];
  const activeHouseRashi = selectedHouse ? getRashiForHouse(selectedHouse) : '';

  return (
    <div className="space-y-4">
      {/* Controls Bar: Chart Selection & North/South Style */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFF5F0] p-3 rounded-2xl border border-[#FF671F]/20">
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Type (D1 Lagna / Chandra / Chalit / D9 Navamsha) */}
          <div className="flex flex-wrap bg-white rounded-xl p-1 border border-[#FF671F]/30 text-xs">
            <button
              type="button"
              onClick={() => setChartType('D1')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartType === 'D1'
                  ? 'bg-[#FF671F] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'hi' ? 'लग्न (D-1)' : 'લગ્ન (D-1)'}
            </button>
            <button
              type="button"
              onClick={() => setChartType('CHANDRA')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartType === 'CHANDRA'
                  ? 'bg-[#FF671F] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'hi' ? 'चंद्र कुंडली' : 'ચંદ્ર કુંડળી'}
            </button>
            <button
              type="button"
              onClick={() => setChartType('CHALIT')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartType === 'CHALIT'
                  ? 'bg-[#FF671F] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'hi' ? 'भाव चलित' : 'ભાવ ચલિત'}
            </button>
            <button
              type="button"
              onClick={() => setChartType('D9')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartType === 'D9'
                  ? 'bg-[#FF671F] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'hi' ? 'नवमांश (D-9)' : 'નવમાંશ (D-9)'}
            </button>
          </div>

          {/* Chart Style (North / South) */}
          <div className="flex bg-white rounded-xl p-1 border border-[#FF671F]/30 text-xs">
            <button
              type="button"
              onClick={() => setChartStyle('north')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                chartStyle === 'north'
                  ? 'bg-[#CC5218] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'hi' ? 'उत्तर भारतीय' : 'ઉત્તર ભારતીય'}
            </button>
            <button
              type="button"
              onClick={() => setChartStyle('south')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                chartStyle === 'south'
                  ? 'bg-[#CC5218] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#CC5218]'
              }`}
            >
              {lang === 'hi' ? 'दक्षिण भारतीय' : 'દક્ષિણ ભારતીય'}
            </button>
          </div>
        </div>

        <div className="text-[11px] text-[#CC5218] flex items-center gap-1 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{chartType === 'D1' ? 'लग्न चक्र (जन्म कालीन)' : 'नवमांश चक्र (भाग्य व दांपत्य)'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: The Interactive Chart SVG */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {chartStyle === 'north' ? (
            /* NORTH INDIAN DIAMOND CHART */
            <div className="relative w-full max-w-md aspect-square bg-[#FFFDF9] p-2 rounded-3xl border-2 border-[#FF671F] shadow-xl shadow-[#FF671F]/10">
              <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                {/* Background Grid Lines */}
                <rect x="10" y="10" width="380" height="380" fill="none" stroke="#FF671F" strokeWidth="2.5" />
                
                {/* Diagonals */}
                <line x1="10" y1="10" x2="390" y2="390" stroke="#FF671F" strokeWidth="2" />
                <line x1="390" y1="10" x2="10" y2="390" stroke="#FF671F" strokeWidth="2" />
                
                {/* Inner Diamond */}
                <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="#FF671F" strokeWidth="2.5" />

                {/* House Clickable Hit Areas & Labels */}
                {/* House 1 (Top Center Diamond) */}
                <g 
                  onClick={() => setSelectedHouse(1)} 
                  className="cursor-pointer transition-all hover:opacity-80"
                >
                  <polygon 
                    points="200,10 295,105 200,200 105,105" 
                    fill={selectedHouse === 1 ? '#FF671F33' : 'transparent'} 
                  />
                  <text x="200" y="38" textAnchor="middle" fill="#CC5218" fontSize="12" fontWeight="bold">
                    {ascIndex + 1}
                  </text>
                  <text x="200" y="100" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
                    {getPlanetsInHouse(1).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="200" y="118" textAnchor="middle" fill="#FF671F" fontSize="9" fontWeight="semibold">
                    1. लग्न
                  </text>
                </g>

                {/* House 2 (Top Left Triangle) */}
                <g onClick={() => setSelectedHouse(2)} className="cursor-pointer hover:opacity-80">
                  <polygon points="10,10 200,10 105,105" fill={selectedHouse === 2 ? '#FF671F33' : 'transparent'} />
                  <text x="80" y="35" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 1) % 12) + 1}
                  </text>
                  <text x="100" y="65" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(2).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="100" y="80" textAnchor="middle" fill="#FF671F" fontSize="8">
                    2. धन
                  </text>
                </g>

                {/* House 3 (Left Top Triangle) */}
                <g onClick={() => setSelectedHouse(3)} className="cursor-pointer hover:opacity-80">
                  <polygon points="10,10 10,200 105,105" fill={selectedHouse === 3 ? '#FF671F33' : 'transparent'} />
                  <text x="35" y="80" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 2) % 12) + 1}
                  </text>
                  <text x="55" y="115" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(3).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="55" y="130" textAnchor="middle" fill="#FF671F" fontSize="8">
                    3. पराक्रम
                  </text>
                </g>

                {/* House 4 (Left Center Diamond) */}
                <g onClick={() => setSelectedHouse(4)} className="cursor-pointer hover:opacity-80">
                  <polygon points="10,200 105,105 200,200 105,295" fill={selectedHouse === 4 ? '#FF671F33' : 'transparent'} />
                  <text x="38" y="205" textAnchor="middle" fill="#CC5218" fontSize="12" fontWeight="bold">
                    {((ascIndex + 3) % 12) + 1}
                  </text>
                  <text x="105" y="200" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
                    {getPlanetsInHouse(4).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="105" y="218" textAnchor="middle" fill="#FF671F" fontSize="9" fontWeight="semibold">
                    4. सुख
                  </text>
                </g>

                {/* House 5 (Left Bottom Triangle) */}
                <g onClick={() => setSelectedHouse(5)} className="cursor-pointer hover:opacity-80">
                  <polygon points="10,200 10,390 105,295" fill={selectedHouse === 5 ? '#FF671F33' : 'transparent'} />
                  <text x="35" y="325" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 4) % 12) + 1}
                  </text>
                  <text x="55" y="290" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(5).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="55" y="305" textAnchor="middle" fill="#FF671F" fontSize="8">
                    5. संतान
                  </text>
                </g>

                {/* House 6 (Bottom Left Triangle) */}
                <g onClick={() => setSelectedHouse(6)} className="cursor-pointer hover:opacity-80">
                  <polygon points="10,390 200,390 105,295" fill={selectedHouse === 6 ? '#FF671F33' : 'transparent'} />
                  <text x="80" y="375" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 5) % 12) + 1}
                  </text>
                  <text x="100" y="345" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(6).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="100" y="360" textAnchor="middle" fill="#FF671F" fontSize="8">
                    6. शत्रु
                  </text>
                </g>

                {/* House 7 (Bottom Center Diamond) */}
                <g onClick={() => setSelectedHouse(7)} className="cursor-pointer hover:opacity-80">
                  <polygon points="200,390 105,295 200,200 295,295" fill={selectedHouse === 7 ? '#FF671F33' : 'transparent'} />
                  <text x="200" y="375" textAnchor="middle" fill="#CC5218" fontSize="12" fontWeight="bold">
                    {((ascIndex + 6) % 12) + 1}
                  </text>
                  <text x="200" y="300" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
                    {getPlanetsInHouse(7).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="200" y="318" textAnchor="middle" fill="#FF671F" fontSize="9" fontWeight="semibold">
                    7. जाया
                  </text>
                </g>

                {/* House 8 (Bottom Right Triangle) */}
                <g onClick={() => setSelectedHouse(8)} className="cursor-pointer hover:opacity-80">
                  <polygon points="200,390 390,390 295,295" fill={selectedHouse === 8 ? '#FF671F33' : 'transparent'} />
                  <text x="320" y="375" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 7) % 12) + 1}
                  </text>
                  <text x="300" y="345" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(8).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="300" y="360" textAnchor="middle" fill="#FF671F" fontSize="8">
                    8. आयु
                  </text>
                </g>

                {/* House 9 (Right Bottom Triangle) */}
                <g onClick={() => setSelectedHouse(9)} className="cursor-pointer hover:opacity-80">
                  <polygon points="390,390 390,200 295,295" fill={selectedHouse === 9 ? '#FF671F33' : 'transparent'} />
                  <text x="365" y="325" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 8) % 12) + 1}
                  </text>
                  <text x="345" y="290" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(9).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="345" y="305" textAnchor="middle" fill="#FF671F" fontSize="8">
                    9. भाग्य
                  </text>
                </g>

                {/* House 10 (Right Center Diamond) */}
                <g onClick={() => setSelectedHouse(10)} className="cursor-pointer hover:opacity-80">
                  <polygon points="390,200 295,295 200,200 295,105" fill={selectedHouse === 10 ? '#FF671F33' : 'transparent'} />
                  <text x="362" y="205" textAnchor="middle" fill="#CC5218" fontSize="12" fontWeight="bold">
                    {((ascIndex + 9) % 12) + 1}
                  </text>
                  <text x="295" y="200" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
                    {getPlanetsInHouse(10).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="295" y="218" textAnchor="middle" fill="#FF671F" fontSize="9" fontWeight="semibold">
                    10. कर्म
                  </text>
                </g>

                {/* House 11 (Right Top Triangle) */}
                <g onClick={() => setSelectedHouse(11)} className="cursor-pointer hover:opacity-80">
                  <polygon points="390,200 390,10 295,105" fill={selectedHouse === 11 ? '#FF671F33' : 'transparent'} />
                  <text x="365" y="80" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 10) % 12) + 1}
                  </text>
                  <text x="345" y="115" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(11).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="345" y="130" textAnchor="middle" fill="#FF671F" fontSize="8">
                    11. लाभ
                  </text>
                </g>

                {/* House 12 (Top Right Triangle) */}
                <g onClick={() => setSelectedHouse(12)} className="cursor-pointer hover:opacity-80">
                  <polygon points="390,10 200,10 295,105" fill={selectedHouse === 12 ? '#FF671F33' : 'transparent'} />
                  <text x="320" y="35" textAnchor="middle" fill="#CC5218" fontSize="11" fontWeight="bold">
                    {((ascIndex + 11) % 12) + 1}
                  </text>
                  <text x="300" y="65" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                    {getPlanetsInHouse(12).map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(' ')}
                  </text>
                  <text x="300" y="80" textAnchor="middle" fill="#FF671F" fontSize="8">
                    12. व्यय
                  </text>
                </g>
              </svg>
            </div>
          ) : (
            /* SOUTH INDIAN FIXED BOX CHART */
            <div className="w-full max-w-md aspect-square grid grid-cols-4 grid-rows-4 gap-1 p-2 bg-[#FFFDF9] rounded-3xl border-2 border-[#FF671F] shadow-xl shadow-[#FF671F]/10">
              {[
                { rashi: 'मीन', houseNum: ((11 - ascIndex + 12) % 12) + 1, col: 1, row: 1 },
                { rashi: 'मेष', houseNum: ((0 - ascIndex + 12) % 12) + 1, col: 2, row: 1 },
                { rashi: 'वृषभ', houseNum: ((1 - ascIndex + 12) % 12) + 1, col: 3, row: 1 },
                { rashi: 'मिथुन', houseNum: ((2 - ascIndex + 12) % 12) + 1, col: 4, row: 1 },
                { rashi: 'कुंभ', houseNum: ((10 - ascIndex + 12) % 12) + 1, col: 1, row: 2 },
                { rashi: 'कर्क', houseNum: ((3 - ascIndex + 12) % 12) + 1, col: 4, row: 2 },
                { rashi: 'मकर', houseNum: ((9 - ascIndex + 12) % 12) + 1, col: 1, row: 3 },
                { rashi: 'सिंह', houseNum: ((4 - ascIndex + 12) % 12) + 1, col: 4, row: 3 },
                { rashi: 'धनु', houseNum: ((8 - ascIndex + 12) % 12) + 1, col: 1, row: 4 },
                { rashi: 'वृश्चिक', houseNum: ((7 - ascIndex + 12) % 12) + 1, col: 2, row: 4 },
                { rashi: 'तुला', houseNum: ((6 - ascIndex + 12) % 12) + 1, col: 3, row: 4 },
                { rashi: 'कन्या', houseNum: ((5 - ascIndex + 12) % 12) + 1, col: 4, row: 4 },
              ].map((box, i) => {
                const isLagna = box.houseNum === 1;
                const isSelected = selectedHouse === box.houseNum;
                const housePlanets = getPlanetsInHouse(box.houseNum);

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedHouse(box.houseNum)}
                    style={{ gridColumn: box.col, gridRow: box.row }}
                    className={`p-1.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FF671F]/20 border-[#FF671F] ring-2 ring-[#FF671F]'
                        : isLagna
                        ? 'bg-amber-100/60 border-amber-400 font-bold'
                        : 'bg-white border-[#FF671F]/30 hover:bg-[#FFF5F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#CC5218]">
                      <span>{box.rashi}</span>
                      {isLagna && (
                        <span className="bg-[#FF671F] text-white px-1 py-0.2 rounded text-[8px]">
                          लग्न (Asc)
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] font-bold text-stone-800 text-center my-0.5 leading-tight">
                      {housePlanets.map(p => (p.planetHi || p.planet.slice(0, 3)) + (p.isRetrograde ? '(R)' : '')).join(', ') || '-'}
                    </div>

                    <div className="text-[9px] text-[#FF671F] font-semibold text-right">
                      {box.houseNum} भाव
                    </div>
                  </div>
                );
              })}

              {/* Center 2x2 area */}
              <div 
                style={{ gridColumn: '2 / span 2', gridRow: '2 / span 2' }}
                className="bg-[#FFF5F0] rounded-2xl flex flex-col items-center justify-center p-3 text-center border border-[#FF671F]/20"
              >
                <span className="font-yatra text-base sm:text-lg text-[#CC5218] font-bold">
                  {chartType === 'D1' ? 'भवानी लग्न चक्र (D-1)' : 'भवानी नवमांश चक्र (D-9)'}
                </span>
                <span className="text-[11px] text-stone-700 mt-1 font-medium">
                  लग्न: <strong>{activeAscendant.split(' ')[0]}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive House Inspector Flyout */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl p-5 border shadow-xl bg-white border-[#FF671F]/25 shadow-[#FF671F]/5">
            <div className="flex items-center justify-between border-b border-[#FF671F]/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FF671F] text-white flex items-center justify-center font-bold text-sm">
                  {selectedHouse}
                </span>
                <div>
                  <h4 className="font-yatra text-lg text-[#CC5218] font-bold">
                    {lang === 'en' ? activeHouseMeta.nameEn : lang === 'hi' ? activeHouseMeta.nameHi : activeHouseMeta.nameGu}
                  </h4>
                  <span className="text-xs text-stone-900 font-semibold">
                    {lang === 'en' ? `Sign: ${activeHouseRashi}` : lang === 'hi' ? `राशि: ${activeHouseRashi}` : `રાશિ: ${activeHouseRashi}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {/* Planets in House */}
              <div className="p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                <span className="text-stone-900 block text-xs mb-1 font-bold">
                  {lang === 'en' ? 'Planets in this house:' : lang === 'hi' ? 'इस भाव में स्थित ग्रह:' : 'આ ભાવમાં રહેલા ગ્રહો:'}
                </span>
                {activeHousePlanets.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {activeHousePlanets.map((p, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FF671F] text-white px-2.5 py-1 rounded-lg font-bold text-xs shadow-xs"
                      >
                        {p.planet} {p.dms ? `(${p.dms})` : `(${p.degree}°)`} {p.isRetrograde ? '• वक्र' : ''} {p.isCombust ? '• अस्त' : ''}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-stone-700 font-medium italic">
                    {lang === 'en' ? 'No direct planets (aspect influences apply)' : lang === 'hi' ? 'कोई प्रत्यक्ष ग्रह नहीं (दृष्टि प्रभाव संभव)' : 'કોઈ પ્રત્યક્ષ ગ્રહ નથી'}
                  </span>
                )}
              </div>

              {/* Karaka Planet */}
              <div className="p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                <span className="text-stone-900 block text-xs font-bold">
                  {lang === 'en' ? 'Natural Karaka Planet:' : lang === 'hi' ? 'प्राकृतिक कारक ग्रह:' : 'કારક ગ્રહ:'}
                </span>
                <strong className="text-[#CC5218] font-bold">
                  {lang === 'en' ? activeHouseMeta.karakaEn : lang === 'hi' ? activeHouseMeta.karakaHi : activeHouseMeta.karakaGu}
                </strong>
              </div>

              {/* Classical Significance */}
              <div className="p-3.5 rounded-2xl border-l-4 border-[#FF671F] bg-[#FFF5F0] text-stone-950">
                <span className="text-xs font-bold text-[#CC5218] block mb-1">
                  {lang === 'en' ? 'Classical Significance & Impact:' : lang === 'hi' ? 'शास्त्रीय फल व प्रभाव:' : 'શાસ્ત્રીય ફળ અને પ્રભાવ:'}
                </span>
                <p className="leading-relaxed text-xs sm:text-sm font-medium text-stone-950">
                  {lang === 'en' ? activeHouseMeta.significanceEn : lang === 'hi' ? activeHouseMeta.significanceHi : activeHouseMeta.significanceGu}
                </p>
              </div>
            </div>

            {/* Quick 12 Houses Navigation row */}
            <div className="mt-4 pt-3 border-t border-[#FF671F]/20">
              <span className="text-xs text-stone-900 font-bold block mb-1.5">
                {lang === 'en' ? 'Select other house (1 to 12):' : lang === 'hi' ? 'अन्य भाव चुनें (1 से 12):' : 'અન્ય ભાવ પસંદ કરો:'}
              </span>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setSelectedHouse(h)}
                    className={`py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedHouse === h
                        ? 'bg-[#FF671F] text-white shadow-xs'
                        : 'bg-[#FFF5F0] text-stone-950 border border-[#FF671F]/30 hover:bg-[#FFEAE0]'
                    }`}
                  >
                    H{h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
