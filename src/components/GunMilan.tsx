import React, { useState, useMemo } from 'react';
import { GunMilanResult, Language, KundliInput, KundliResult } from '../types/astrology';
import { calculateGunMilan, calculateVedicKundli } from '../utils/vedicCalculations';
import { RASHIS, NAKSHATRAS, ASTROLOGER_INFO } from '../data/astrologyData';
import { INDIAN_CITIES_DATABASE } from '../data/indianCities';
import { 
  HeartHandshake, Sparkles, CheckCircle2, AlertTriangle, 
  ShieldCheck, Phone, MessageCircle, Calendar, Clock, 
  MapPin, Printer, Search, ChevronDown, Check, User, Users
} from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';
import confetti from 'canvas-confetti';

interface GunMilanProps {
  lang: Language;
  isDark?: boolean;
}

export const GunMilan: React.FC<GunMilanProps> = ({ lang, isDark = false }) => {
  // Matching Mode: 'dob' (By Date, Time, Place) or 'direct' (By Rashi & Nakshatra)
  const [calculationMode, setCalculationMode] = useState<'dob' | 'direct'>('dob');

  // BOY DOB FORM
  const defaultCity = INDIAN_CITIES_DATABASE[0]; // Mehsana
  const [boyName, setBoyName] = useState('अमित पटेल');
  const [boyDay, setBoyDay] = useState(15);
  const [boyMonth, setBoyMonth] = useState(8);
  const [boyYear, setBoyYear] = useState(1996);
  const [boyHour, setBoyHour] = useState(10);
  const [boyMinute, setBoyMinute] = useState(30);
  const [boyAmPm, setBoyAmPm] = useState<'AM' | 'PM'>('AM');
  const [boyCity, setBoyCity] = useState(defaultCity);
  const [boyCitySearch, setBoyCitySearch] = useState('');
  const [isBoyCityOpen, setIsBoyCityOpen] = useState(false);

  // GIRL DOB FORM
  const [girlName, setGirlName] = useState('प्रिया शर्मा');
  const [girlDay, setGirlDay] = useState(24);
  const [girlMonth, setGirlMonth] = useState(11);
  const [girlYear, setGirlYear] = useState(1998);
  const [girlHour, setGirlHour] = useState(6);
  const [girlMinute, setGirlMinute] = useState(45);
  const [girlAmPm, setGirlAmPm] = useState<'AM' | 'PM'>('PM');
  const [girlCity, setGirlCity] = useState(INDIAN_CITIES_DATABASE[1] || defaultCity); // Ahmedabad
  const [girlCitySearch, setGirlCitySearch] = useState('');
  const [isGirlCityOpen, setIsGirlCityOpen] = useState(false);

  // DIRECT RASHI & NAKSHATRA FORM STATES
  const [directBoyRashiIdx, setDirectBoyRashiIdx] = useState(0); // Mesha
  const [directGirlRashiIdx, setDirectGirlRashiIdx] = useState(4); // Simha
  const [directBoyNakshatraIdx, setDirectBoyNakshatraIdx] = useState(0); // Ashwini
  const [directGirlNakshatraIdx, setDirectGirlNakshatraIdx] = useState(9); // Magha
  const [directBoyCharan, setDirectBoyCharan] = useState(1);
  const [directGirlCharan, setDirectGirlCharan] = useState(2);
  const [directBoyManglik, setDirectBoyManglik] = useState('गैर-मांगलिक (Non-Manglik)');
  const [directGirlManglik, setDirectGirlManglik] = useState('गैर-मांगलिक (Non-Manglik)');

  // Calculated Kundlis & Milan Result
  const [boyKundli, setBoyKundli] = useState<KundliResult | null>(null);
  const [girlKundli, setGirlKundli] = useState<KundliResult | null>(null);
  const [result, setResult] = useState<GunMilanResult | null>(null);

  // Filter cities for Boy and Girl pickers
  const filteredBoyCities = useMemo(() => {
    const q = boyCitySearch.toLowerCase().trim();
    if (!q) return INDIAN_CITIES_DATABASE.slice(0, 30);
    return INDIAN_CITIES_DATABASE.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.nameHi.toLowerCase().includes(q) || 
      c.nameEn.toLowerCase().includes(q) || 
      c.state.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [boyCitySearch]);

  const filteredGirlCities = useMemo(() => {
    const q = girlCitySearch.toLowerCase().trim();
    if (!q) return INDIAN_CITIES_DATABASE.slice(0, 30);
    return INDIAN_CITIES_DATABASE.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.nameHi.toLowerCase().includes(q) || 
      c.nameEn.toLowerCase().includes(q) || 
      c.state.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [girlCitySearch]);

  // Initial calculation on mount
  React.useEffect(() => {
    handleCalculateMilan();
  }, []);

  const handleCalculateMilan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (calculationMode === 'dob') {
      // 1. Calculate Boy Kundli
      const boy24Hour = boyAmPm === 'PM' ? (boyHour === 12 ? 12 : boyHour + 12) : (boyHour === 12 ? 0 : boyHour);
      const boyInput: KundliInput = {
        name: boyName,
        gender: 'male',
        day: boyDay,
        month: boyMonth,
        year: boyYear,
        hour: boy24Hour,
        minute: boyMinute,
        cityName: boyCity.name,
        state: boyCity.state,
        latitude: boyCity.lat,
        longitude: boyCity.lon
      };
      const bKundli = calculateVedicKundli(boyInput);
      setBoyKundli(bKundli);

      // 2. Calculate Girl Kundli
      const girl24Hour = girlAmPm === 'PM' ? (girlHour === 12 ? 12 : girlHour + 12) : (girlHour === 12 ? 0 : girlHour);
      const girlInput: KundliInput = {
        name: girlName,
        gender: 'female',
        day: girlDay,
        month: girlMonth,
        year: girlYear,
        hour: girl24Hour,
        minute: girlMinute,
        cityName: girlCity.name,
        state: girlCity.state,
        latitude: girlCity.lat,
        longitude: girlCity.lon
      };
      const gKundli = calculateVedicKundli(girlInput);
      setGirlKundli(gKundli);

      // 3. Find matching Rashi and Nakshatra indices
      const bRashiIdx = Math.max(0, RASHIS.findIndex(r => r.nameHi === bKundli.moonRashi || bKundli.moonRashi.includes(r.nameHi)));
      const gRashiIdx = Math.max(0, RASHIS.findIndex(r => r.nameHi === gKundli.moonRashi || gKundli.moonRashi.includes(r.nameHi)));

      const bNakIdx = Math.max(0, NAKSHATRAS.findIndex(n => n.includes(bKundli.birthPanchang.nakshatra) || bKundli.birthPanchang.nakshatra.includes(n.split(' ')[0])));
      const gNakIdx = Math.max(0, NAKSHATRAS.findIndex(n => n.includes(gKundli.birthPanchang.nakshatra) || gKundli.birthPanchang.nakshatra.includes(n.split(' ')[0])));

      const bBirthData = {
        dob: `${boyDay}/${boyMonth}/${boyYear}`,
        tob: `${boyHour.toString().padStart(2, '0')}:${boyMinute.toString().padStart(2, '0')} ${boyAmPm}`,
        pob: `${boyCity.name}`
      };
      const gBirthData = {
        dob: `${girlDay}/${girlMonth}/${girlYear}`,
        tob: `${girlHour.toString().padStart(2, '0')}:${girlMinute.toString().padStart(2, '0')} ${girlAmPm}`,
        pob: `${girlCity.name}`
      };

      const res = calculateGunMilan(
        boyName,
        girlName,
        bRashiIdx,
        gRashiIdx,
        bNakIdx,
        gNakIdx,
        bKundli.birthPanchang.nakshatraCharan,
        gKundli.birthPanchang.nakshatraCharan,
        bKundli.ascendantRashi,
        gKundli.ascendantRashi,
        bKundli.manglikStatus,
        gKundli.manglikStatus,
        bBirthData,
        gBirthData
      );

      setResult(res);

      if (res.totalGunas >= 24) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      // Direct Rashi & Nakshatra mode
      setBoyKundli(null);
      setGirlKundli(null);

      const res = calculateGunMilan(
        boyName,
        girlName,
        directBoyRashiIdx,
        directGirlRashiIdx,
        directBoyNakshatraIdx,
        directGirlNakshatraIdx,
        directBoyCharan,
        directGirlCharan,
        'मेष',
        'सिंह',
        directBoyManglik,
        directGirlManglik
      );

      setResult(res);

      if (res.totalGunas >= 24) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`py-6 sm:py-8 px-3 sm:px-4 max-w-7xl mx-auto w-full max-w-full overflow-x-hidden transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border mb-3 shadow-xs ${
          isDark 
            ? 'bg-rose-950/60 text-rose-300 border-rose-500/40' 
            : 'bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 text-[#CC5218] border-amber-300/60'
        }`}>
          <HeartHandshake className="w-4 h-4 text-rose-500" />
          <span className="font-['Cinzel'] tracking-wide">
            {lang === 'en'
              ? '✦ Royal Vedic Ashtakoot Vivah Milan ✦'
              : lang === 'hi'
              ? '✦ राजशाही वैदिक विवाह अष्टकूट मिलान ✦'
              : '✦ રાજશાહી વૈદિક લગ્ન અષ્ટકૂટ મિલાન ✦'}
          </span>
        </div>
        <h2 className="font-['Marcellus'] font-serif text-3xl sm:text-5xl mb-3 tracking-tight text-[#CC5218] dark:text-amber-300">
          {lang === 'en'
            ? 'Kundli Milan (36 Guna Compatibility)'
            : lang === 'hi'
            ? 'विवाह कुंडली मिलान (36 गुण, नाड़ी, भकूट व मांगलिक विचार)'
            : 'કુંડળી મિલાન (36 ગુણ, નાડી, ભકૂટ અને માંગલિક વિચાર)'}
        </h2>
        <p className={`text-sm sm:text-base font-medium ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
          {lang === 'en'
            ? 'Authentic 36 Guna matching based on Groom and Bride exact Date of Birth, Time, and Place, analyzing Nadi dosha, Bhakoot dosha, and Manglik compatibility'
            : lang === 'hi'
            ? 'वर एवं वधू के जन्म दिनांक, समय व स्थान द्वारा प्रामाणिक 36 गुण मिलान, नाड़ी दोष, भकूट दोष, शास्त्रोक्त परिहार एवं मांगलिक साम्यता विश्लेषण'
            : 'વર અને કન્યાના જન્મ તારીખ, સમય અને સ્થળ દ્વારા 36 ગુણો, નાડી દોષ, ભકૂટ દોષ અને માંગલિકનું શાસ્ત્રોક્ત મિલાન'}
        </p>

        {/* CALCULATION MODE SWITCHER */}
        <div className="mt-6 flex justify-center">
          <div className={`p-1.5 rounded-2xl border inline-flex items-center gap-2 shadow-md ${
            isDark ? 'bg-stone-900 border-amber-500/30' : 'bg-white border-[#FF671F]/30'
          }`}>
            <button
              type="button"
              onClick={() => setCalculationMode('dob')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                calculationMode === 'dob'
                  ? 'bg-gradient-to-r from-[#FF671F] to-[#CC5218] text-white shadow-md'
                  : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>जन्म दिनांक, समय व स्थान द्वारा (विस्तृत प्रामाणिक मिलान)</span>
            </button>
            <button
              type="button"
              onClick={() => setCalculationMode('direct')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                calculationMode === 'direct'
                  ? 'bg-gradient-to-r from-[#FF671F] to-[#CC5218] text-white shadow-md'
                  : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>नाम, राशि एवं नक्षत्र द्वारा (सीधा मिलान)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ========================================================================= */}
        {/* INPUT FORM (5 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5">
          <form onSubmit={handleCalculateMilan} className={`rounded-3xl p-6 border shadow-xl space-y-6 transition-all ${
            isDark 
              ? 'bg-stone-900/90 border-amber-500/20 shadow-black/40' 
              : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
          }`}>
            <div className={`pb-3 border-b flex items-center justify-between ${
              isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
            }`}>
              <h3 className={`font-yatra text-xl flex items-center gap-2 ${
                isDark ? 'text-amber-300' : 'text-[#CC5218]'
              }`}>
                <Users className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                <span>वर एवं वधू का विवरण दर्ज करें</span>
              </h3>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                calculationMode === 'dob' 
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200' 
                  : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
              }`}>
                {calculationMode === 'dob' ? 'पूर्ण जन्म विवरण' : 'राशि-नक्षत्र चयन'}
              </span>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* GROOM (वर) DETAILS */}
            {/* ----------------------------------------------------------------- */}
            <div className={`p-4 rounded-2xl border space-y-3 relative ${
              isDark ? 'bg-blue-950/20 border-blue-500/30 text-stone-100' : 'bg-blue-50/40 border-blue-200/70'
            }`}>
              <div className={`font-bold text-xs sm:text-sm flex items-center justify-between ${
                isDark ? 'text-blue-300' : 'text-blue-900'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-base">👦</span>
                  <span className="font-bold">वर का विवरण (Groom Details)</span>
                </div>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  पुरुष (Male)
                </span>
              </div>

              {/* Groom Name */}
              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  वर का पूरा नाम (Groom Name)
                </label>
                <input
                  type="text"
                  required
                  value={boyName}
                  onChange={(e) => setBoyName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-blue-400' 
                      : 'bg-white border-blue-200 text-stone-900 focus:ring-blue-500'
                  }`}
                  placeholder="वर का नाम"
                />
              </div>

              {calculationMode === 'dob' ? (
                <>
                  {/* Groom DOB: Day, Month, Year */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 flex items-center gap-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>जन्म दिनांक (Date of Birth)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={boyDay}
                        onChange={(e) => setBoyDay(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                        }`}
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                          <option key={d} value={d}>{d} तारीख</option>
                        ))}
                      </select>

                      <select
                        value={boyMonth}
                        onChange={(e) => setBoyMonth(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                        }`}
                      >
                        {['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'].map((m, i) => (
                          <option key={i + 1} value={i + 1}>{m}</option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min="1950"
                        max="2035"
                        value={boyYear}
                        onChange={(e) => setBoyYear(parseInt(e.target.value) || 1996)}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm text-center ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Groom Time: Hour, Minute, AM/PM */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 flex items-center gap-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>जन्म समय (Time of Birth)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={boyHour}
                        onChange={(e) => setBoyHour(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                        }`}
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                          <option key={h} value={h}>{h} बजे</option>
                        ))}
                      </select>

                      <select
                        value={boyMinute}
                        onChange={(e) => setBoyMinute(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                        }`}
                      >
                        {Array.from({ length: 60 }, (_, i) => i).map(m => (
                          <option key={m} value={m}>{m.toString().padStart(2, '0')} मि.</option>
                        ))}
                      </select>

                      <select
                        value={boyAmPm}
                        onChange={(e) => setBoyAmPm(e.target.value as 'AM' | 'PM')}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm font-bold ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                        }`}
                      >
                        <option value="AM">AM (सुबह/प्रातः)</option>
                        <option value="PM">PM (दोपहर/शाम)</option>
                      </select>
                    </div>
                  </div>

                  {/* Groom Place: City Search */}
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 flex items-center gap-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>जन्म स्थान (Place of Birth)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsBoyCityOpen(!isBoyCityOpen)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm flex items-center justify-between text-left ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                      }`}
                    >
                      <span className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {boyCity.name} ({boyCity.state})
                      </span>
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    </button>

                    {isBoyCityOpen && (
                      <div className={`absolute z-30 mt-1 w-full rounded-xl border shadow-xl p-2 max-h-56 overflow-y-auto ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-300'
                      }`}>
                        <div className="relative mb-2">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                          <input
                            type="text"
                            placeholder="शहर का नाम खोजें..."
                            value={boyCitySearch}
                            onChange={(e) => setBoyCitySearch(e.target.value)}
                            className={`w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border focus:outline-none ${
                              isDark ? 'bg-stone-900 border-stone-700 text-stone-100' : 'bg-stone-50 border-stone-200'
                            }`}
                          />
                        </div>
                        <div className="space-y-1">
                          {filteredBoyCities.map(c => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setBoyCity(c);
                                setIsBoyCityOpen(false);
                              }}
                              className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${
                                boyCity.name === c.name 
                                  ? 'bg-blue-100 text-blue-900 font-bold dark:bg-blue-900/60 dark:text-blue-100' 
                                  : 'hover:bg-stone-100 dark:hover:bg-stone-700'
                              }`}
                            >
                              <span>{c.name}</span>
                              <span className="text-[10px] text-stone-500">{c.state}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Direct Rashi & Nakshatra for Groom */
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      वर की राशि (Rashi)
                    </label>
                    <select
                      value={directBoyRashiIdx}
                      onChange={(e) => setDirectBoyRashiIdx(parseInt(e.target.value))}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                      }`}
                    >
                      {RASHIS.map((r, idx) => (
                        <option key={r.id} value={idx}>{r.symbol} {r.nameHi} ({r.nameEn})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      वर का नक्षत्र (Nakshatra)
                    </label>
                    <select
                      value={directBoyNakshatraIdx}
                      onChange={(e) => setDirectBoyNakshatraIdx(parseInt(e.target.value))}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                      }`}
                    >
                      {NAKSHATRAS.map((nak, idx) => (
                        <option key={nak} value={idx}>{nak.split(' ')[0]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      नक्षत्र चरण (Pada)
                    </label>
                    <select
                      value={directBoyCharan}
                      onChange={(e) => setDirectBoyCharan(parseInt(e.target.value))}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                      }`}
                    >
                      {[1, 2, 3, 4].map(p => (
                        <option key={p} value={p}>{p} चरण (Pada {p})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      मांगलिक स्थिति (Manglik)
                    </label>
                    <select
                      value={directBoyManglik}
                      onChange={(e) => setDirectBoyManglik(e.target.value)}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-blue-200'
                      }`}
                    >
                      <option value="गैर-मांगलिक (Non-Manglik)">गैर-मांगलिक (Non-Manglik)</option>
                      <option value="मांगलिक (Manglik)">मांगलिक (Manglik)</option>
                      <option value="आंशिक मांगलिक (Anshik Manglik)">आंशिक मांगलिक (Anshik Manglik)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* BRIDE (वधू) DETAILS */}
            {/* ----------------------------------------------------------------- */}
            <div className={`p-4 rounded-2xl border space-y-3 relative ${
              isDark ? 'bg-rose-950/20 border-rose-500/30 text-stone-100' : 'bg-rose-50/40 border-rose-200/70'
            }`}>
              <div className={`font-bold text-xs sm:text-sm flex items-center justify-between ${
                isDark ? 'text-rose-300' : 'text-rose-900'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-base">👧</span>
                  <span className="font-bold">वधू का विवरण (Bride Details)</span>
                </div>
                <span className="text-[10px] bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 px-2 py-0.5 rounded-full">
                  स्त्री (Female)
                </span>
              </div>

              {/* Bride Name */}
              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  वधू का पूरा नाम (Bride Name)
                </label>
                <input
                  type="text"
                  required
                  value={girlName}
                  onChange={(e) => setGirlName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-rose-400' 
                      : 'bg-white border-rose-200 text-stone-900 focus:ring-rose-500'
                  }`}
                  placeholder="वधू का नाम"
                />
              </div>

              {calculationMode === 'dob' ? (
                <>
                  {/* Bride DOB: Day, Month, Year */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 flex items-center gap-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      <Calendar className="w-3.5 h-3.5 text-rose-600" />
                      <span>जन्म दिनांक (Date of Birth)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={girlDay}
                        onChange={(e) => setGirlDay(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                        }`}
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                          <option key={d} value={d}>{d} तारीख</option>
                        ))}
                      </select>

                      <select
                        value={girlMonth}
                        onChange={(e) => setGirlMonth(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                        }`}
                      >
                        {['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'].map((m, i) => (
                          <option key={i + 1} value={i + 1}>{m}</option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min="1950"
                        max="2035"
                        value={girlYear}
                        onChange={(e) => setGirlYear(parseInt(e.target.value) || 1998)}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm text-center ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bride Time: Hour, Minute, AM/PM */}
                  <div>
                    <label className={`block text-xs font-bold mb-1 flex items-center gap-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      <span>जन्म समय (Time of Birth)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={girlHour}
                        onChange={(e) => setGirlHour(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                        }`}
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                          <option key={h} value={h}>{h} बजे</option>
                        ))}
                      </select>

                      <select
                        value={girlMinute}
                        onChange={(e) => setGirlMinute(parseInt(e.target.value))}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                        }`}
                      >
                        {Array.from({ length: 60 }, (_, i) => i).map(m => (
                          <option key={m} value={m}>{m.toString().padStart(2, '0')} मि.</option>
                        ))}
                      </select>

                      <select
                        value={girlAmPm}
                        onChange={(e) => setGirlAmPm(e.target.value as 'AM' | 'PM')}
                        className={`px-2 py-1.5 rounded-xl border text-xs sm:text-sm font-bold ${
                          isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                        }`}
                      >
                        <option value="AM">AM (सुबह/प्रातः)</option>
                        <option value="PM">PM (दोपहर/शाम)</option>
                      </select>
                    </div>
                  </div>

                  {/* Bride Place: City Search */}
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 flex items-center gap-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      <MapPin className="w-3.5 h-3.5 text-rose-600" />
                      <span>जन्म स्थान (Place of Birth)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsGirlCityOpen(!isGirlCityOpen)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm flex items-center justify-between text-left ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                      }`}
                    >
                      <span className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {girlCity.name} ({girlCity.state})
                      </span>
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    </button>

                    {isGirlCityOpen && (
                      <div className={`absolute z-30 mt-1 w-full rounded-xl border shadow-xl p-2 max-h-56 overflow-y-auto ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-300'
                      }`}>
                        <div className="relative mb-2">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                          <input
                            type="text"
                            placeholder="शहर का नाम खोजें..."
                            value={girlCitySearch}
                            onChange={(e) => setGirlCitySearch(e.target.value)}
                            className={`w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border focus:outline-none ${
                              isDark ? 'bg-stone-900 border-stone-700 text-stone-100' : 'bg-stone-50 border-stone-200'
                            }`}
                          />
                        </div>
                        <div className="space-y-1">
                          {filteredGirlCities.map(c => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setGirlCity(c);
                                setIsGirlCityOpen(false);
                              }}
                              className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${
                                girlCity.name === c.name 
                                  ? 'bg-rose-100 text-rose-900 font-bold dark:bg-rose-900/60 dark:text-rose-100' 
                                  : 'hover:bg-stone-100 dark:hover:bg-stone-700'
                              }`}
                            >
                              <span>{c.name}</span>
                              <span className="text-[10px] text-stone-500">{c.state}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Direct Rashi & Nakshatra for Bride */
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      वधू की राशि (Rashi)
                    </label>
                    <select
                      value={directGirlRashiIdx}
                      onChange={(e) => setDirectGirlRashiIdx(parseInt(e.target.value))}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                      }`}
                    >
                      {RASHIS.map((r, idx) => (
                        <option key={r.id} value={idx}>{r.symbol} {r.nameHi} ({r.nameEn})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      वधू का नक्षत्र (Nakshatra)
                    </label>
                    <select
                      value={directGirlNakshatraIdx}
                      onChange={(e) => setDirectGirlNakshatraIdx(parseInt(e.target.value))}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                      }`}
                    >
                      {NAKSHATRAS.map((nak, idx) => (
                        <option key={nak} value={idx}>{nak.split(' ')[0]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      नक्षत्र चरण (Pada)
                    </label>
                    <select
                      value={directGirlCharan}
                      onChange={(e) => setDirectGirlCharan(parseInt(e.target.value))}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                      }`}
                    >
                      {[1, 2, 3, 4].map(p => (
                        <option key={p} value={p}>{p} चरण (Pada {p})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                      मांगलिक स्थिति (Manglik)
                    </label>
                    <select
                      value={directGirlManglik}
                      onChange={(e) => setDirectGirlManglik(e.target.value)}
                      className={`w-full px-2.5 py-2 rounded-xl border text-xs sm:text-sm ${
                        isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-rose-200'
                      }`}
                    >
                      <option value="गैर-मांगलिक (Non-Manglik)">गैर-मांगलिक (Non-Manglik)</option>
                      <option value="मांगलिक (Manglik)">मांगलिक (Manglik)</option>
                      <option value="आंशिक मांगलिक (Anshik Manglik)">आंशिक मांगलिक (Anshik Manglik)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF671F] to-[#CC5218] hover:from-[#CC5218] hover:to-[#FF671F] text-white font-yatra text-base py-3.5 rounded-2xl shadow-lg shadow-[#FF671F]/30 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-5 h-5 text-amber-200" />
              <span>36 गुण विवाह मिलान एवं फलादेश देखें</span>
            </button>
          </form>
        </div>

        {/* ========================================================================= */}
        {/* RESULTS COLUMN (7 COLS) */}
        {/* ========================================================================= */}
        {result && (
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Score Banner */}
            <div className={`rounded-3xl p-6 border shadow-xl transition-all relative overflow-hidden ${
              isDark 
                ? 'bg-stone-900/90 border-amber-500/20 shadow-black/40' 
                : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
            }`}>
              
              {/* Auspicious Inscription */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 text-xs font-serif font-bold text-[#CC5218] dark:text-amber-300 mb-4">
                <span>卐 ॥ श्री गणेशाय नमः ॥ 卐</span>
                <span>॥ अष्टकूट 36 गुण मिलान चक्र ॥</span>
                <span>卐 ॥ कल्याणमस्तु ॥ 卐</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 mb-2">
                    <span>वर: {result.boyName}</span>
                    <span>❤️</span>
                    <span>वधू: {result.girlName}</span>
                  </div>

                  <h3 className={`font-yatra text-2xl sm:text-3xl font-bold tracking-wide ${
                    result.totalGunas >= 21 ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#CC5218] dark:text-amber-300'
                  }`}>
                    {result.verdict}
                  </h3>

                  <p className={`text-xs font-semibold mt-1.5 ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
                    प्राप्त गुण: <strong>{result.totalGunas} / 36</strong> ({result.percentage}% अनुकूलता)
                  </p>
                </div>

                {/* Score badge circle */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FF671F] via-[#CC5218] to-[#993D12] text-white flex flex-col items-center justify-center shadow-xl shadow-[#FF671F]/30 border-4 border-amber-300 shrink-0">
                  <span className="font-yatra text-4xl leading-none">{result.totalGunas}</span>
                  <span className="text-[11px] text-amber-200 font-bold tracking-widest mt-1">/ 36 गुण</span>
                </div>
              </div>

              {/* Major Dosha Check Badges with Parihar Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-4">
                
                {/* Nadi Dosh Card */}
                <div className={`p-3 rounded-2xl border text-xs font-bold ${
                  result.isNadiDosh 
                    ? result.nadiParihar 
                      ? 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200' 
                      : 'bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/50 dark:text-rose-200'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>नाड़ी विचार (Nadi)</span>
                    <span>{result.isNadiDosh ? (result.nadiParihar ? '✨ परिहार' : '⚠️ दोष') : '✅ श्रेष्ठ'}</span>
                  </div>
                  <div className="mt-1 text-[11px] font-normal leading-tight">
                    {result.isNadiDosh 
                      ? (result.nadiParihar ? result.nadiParihar.slice(0, 45) + '...' : 'नाड़ी दोष विद्यमान (शांति अनुशंसित)') 
                      : 'नाड़ी अनुकूल है, दीर्घायु योग'}
                  </div>
                </div>

                {/* Bhakoot Dosh Card */}
                <div className={`p-3 rounded-2xl border text-xs font-bold ${
                  result.isBhakootDosh 
                    ? result.bhakootParihar
                      ? 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200'
                      : 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>भकूट विचार (Bhakoot)</span>
                    <span>{result.isBhakootDosh ? (result.bhakootParihar ? '✨ परिहार' : '⚠️ विचारणीय') : '✅ श्रेष्ठ'}</span>
                  </div>
                  <div className="mt-1 text-[11px] font-normal leading-tight">
                    {result.isBhakootDosh 
                      ? (result.bhakootParihar ? result.bhakootParihar.slice(0, 45) + '...' : 'षडाष्टक/द्विर्द्वादश भकूट') 
                      : 'भकूट अनुकूल, वंश व धन वृद्धि'}
                  </div>
                </div>

                {/* Gana Dosh Card */}
                <div className={`p-3 rounded-2xl border text-xs font-bold ${
                  result.isGanaDosh 
                    ? result.ganaParihar
                      ? 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200'
                      : 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>गण विचार (Gana)</span>
                    <span>{result.isGanaDosh ? (result.ganaParihar ? '✨ परिहार' : '⚠️ विचारणीय') : '✅ श्रेष्ठ'}</span>
                  </div>
                  <div className="mt-1 text-[11px] font-normal leading-tight">
                    {result.isGanaDosh 
                      ? (result.ganaParihar ? 'राशि स्वामी मित्रता परिहार' : 'देव-राक्षस गण भेद') 
                      : 'गण मैत्री अनुकूल, उत्तम सामंजस्य'}
                  </div>
                </div>

              </div>

              {/* Manglik Compatibility Callout */}
              {result.manglikCompatibility && (
                <div className={`p-3.5 rounded-2xl border my-2 text-xs leading-relaxed ${
                  result.manglikCompatibility.includes('भौम साम्य') || result.manglikCompatibility.includes('दोष मुक्त')
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200'
                    : 'bg-amber-50/80 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200'
                }`}>
                  <strong className="block text-xs font-bold mb-0.5">
                    🚩 मांगलिक विचार एवं शास्त्रीय साम्यता (Manglik Analysis):
                  </strong>
                  <span>{result.manglikCompatibility}</span>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* COMPARATIVE VEDIC ANALYSIS MATRIX */}
              {/* ----------------------------------------------------------------- */}
              <div className="mt-4">
                <h4 className={`font-bold text-sm mb-2 flex items-center justify-between ${
                  isDark ? 'text-amber-300' : 'text-[#CC5218]'
                }`}>
                  <span>वर एवं वधू शास्त्रीय तुलनात्मक चक्र (Astrological Comparison)</span>
                  <span className="text-[10px] text-stone-500 font-normal">दृक-पंचांग वैदिक गणना</span>
                </h4>

                <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-stone-800 text-amber-300' : 'bg-gradient-to-r from-amber-100 to-rose-100 text-[#991b1b] font-bold'}>
                        <th className="p-2 border-b border-r border-stone-300 dark:border-stone-700 w-1/3">ज्योतिषीय तत्व</th>
                        <th className="p-2 border-b border-r border-stone-300 dark:border-stone-700 w-1/3 text-blue-900 dark:text-blue-300 font-bold">
                          👦 वर ({result.boyName})
                        </th>
                        <th className="p-2 border-b border-stone-300 dark:border-stone-700 w-1/3 text-rose-900 dark:text-rose-300 font-bold">
                          👧 वधू ({result.girlName})
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700 text-[11px]">
                      {result.boyBirthData && result.girlBirthData && (
                        <tr className={isDark ? 'bg-stone-900/50' : 'bg-stone-50/50'}>
                          <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">जन्म विवरण (Date/Time/Place)</td>
                          <td className="p-2 border-r border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
                            {result.boyBirthData.dob} | {result.boyBirthData.tob} | {result.boyBirthData.pob.split(',')[0]}
                          </td>
                          <td className="p-2 text-stone-800 dark:text-stone-200">
                            {result.girlBirthData.dob} | {result.girlBirthData.tob} | {result.girlBirthData.pob.split(',')[0]}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">जन्म लग्न (Ascendant)</td>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-blue-900 dark:text-blue-300">{result.boyLagna || 'मेष'} लग्न</td>
                        <td className="p-2 font-bold text-rose-900 dark:text-rose-300">{result.girlLagna || 'सिंह'} लग्न</td>
                      </tr>
                      <tr className={isDark ? 'bg-stone-900/50' : 'bg-amber-50/20'}>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">चंद्र राशि (Moon Sign)</td>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-[#CC5218] dark:text-amber-400">{result.boyRashi}</td>
                        <td className="p-2 font-bold text-[#CC5218] dark:text-amber-400">{result.girlRashi}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">नक्षत्र एवं चरण (Nakshatra & Pada)</td>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-900 dark:text-stone-100">
                          {result.boyNakshatra.split(' ')[0]} {result.boyCharan ? `(चरण ${result.boyCharan})` : ''}
                        </td>
                        <td className="p-2 font-bold text-stone-900 dark:text-stone-100">
                          {result.girlNakshatra.split(' ')[0]} {result.girlCharan ? `(चरण ${result.girlCharan})` : ''}
                        </td>
                      </tr>
                      <tr className={isDark ? 'bg-stone-900/50' : 'bg-stone-50/50'}>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300">मांगलिक स्थिति (Manglik Status)</td>
                        <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            result.boyManglik?.includes('मांगलिक') && !result.boyManglik.includes('गैर')
                              ? 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200'
                              : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                          }`}>
                            {result.boyManglik || 'गैर-मांगलिक'}
                          </span>
                        </td>
                        <td className="p-2 font-bold">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            result.girlManglik?.includes('मांगलिक') && !result.girlManglik.includes('गैर')
                              ? 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200'
                              : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                          }`}>
                            {result.girlManglik || 'गैर-मांगलिक'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* 8 KOOTAS 36 GUNAS DETAILED TABLE */}
              {/* ----------------------------------------------------------------- */}
              <div className="mt-6">
                <h4 className={`font-bold text-sm mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  अष्टकूट 36 गुण विस्तृत विभाजन (Detailed Ashtakoot Matrix)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className={isDark ? 'bg-stone-800 text-amber-300' : 'bg-amber-100/70 text-[#CC5218] font-bold'}>
                        <th className="p-2 border-b border-r border-stone-300 dark:border-stone-700">कूट (Koota)</th>
                        <th className="p-2 border-b border-r border-stone-300 dark:border-stone-700">क्षेत्र (Meaning)</th>
                        <th className="p-2 border-b border-r border-stone-300 dark:border-stone-700 text-center">प्राप्त गुण</th>
                        <th className="p-2 border-b border-stone-300 dark:border-stone-700">फलादेश प्रभाव</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                      {result.kootas.map((k) => (
                        <tr key={k.name} className={isDark ? 'hover:bg-stone-800/60' : 'hover:bg-[#FFFDF9]'}>
                          <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-bold text-stone-900 dark:text-stone-100">
                            {k.name}
                          </td>
                          <td className="p-2 border-r border-stone-200 dark:border-stone-700 font-medium text-stone-600 dark:text-stone-300">
                            {k.description}
                          </td>
                          <td className="p-2 border-r border-stone-200 dark:border-stone-700 text-center font-bold text-[#CC5218] dark:text-amber-400">
                            {k.obtained} / {k.maximum}
                          </td>
                          <td className="p-2 font-medium text-stone-800 dark:text-stone-200">
                            {k.impact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Classical Parihars Highlight Box if any */}
              {(result.nadiParihar || result.bhakootParihar || result.ganaParihar) && (
                <div className={`mt-6 p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-amber-950/20 border-amber-500/40 text-stone-100' : 'bg-amber-50/70 border-amber-300 text-stone-900'
                }`}>
                  <span className="font-bold text-xs sm:text-sm block text-amber-800 dark:text-amber-300">
                    ✨ शास्त्रोक्त दोष परिहार (Classical Cancellations):
                  </span>
                  <ul className="space-y-1.5 text-xs">
                    {result.nadiParihar && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>नाड़ी परिहार:</strong> {result.nadiParihar}</span>
                      </li>
                    )}
                    {result.bhakootParihar && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>भकूट परिहार:</strong> {result.bhakootParihar}</span>
                      </li>
                    )}
                    {result.ganaParihar && (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>गण परिहार:</strong> {result.ganaParihar}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Astrological Recommendations */}
              <div className={`mt-6 p-4 rounded-2xl border space-y-2 ${
                isDark ? 'bg-stone-800/80 border-amber-500/30' : 'bg-[#FFFDF9] border-[#FF671F]/30'
              }`}>
                <span className={`font-bold text-xs sm:text-sm block ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  🚩 विवाह सुख एवं शांति हेतु ज्योतिषीय परामर्श:
                </span>
                <ul className={`space-y-1.5 text-xs sm:text-sm font-medium ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons Row: Print + Phone + WhatsApp */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>मिलान रिपोर्ट प्रिंट करें</span>
                </button>

                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className="flex-1 bg-gradient-to-r from-[#D9531E] via-[#FF671F] to-[#CC5218] hover:from-[#B84214] hover:to-[#D9531E] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-4 h-4 text-amber-200" />
                  <span>पंडित जी से फोन पर पूछें</span>
                </a>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `नमस्ते पंडित जी 🙏 मैंने ${result.boyName} और ${result.girlName} का विवाह गुण मिलान (${result.totalGunas}/36 गुण) देखा है। कृपया कुंडली मिलान पर अपना व्यक्तिगत परामर्श प्रदान करें ✨`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>व्हाट्सएप पर कुंडली भेजें</span>
                  <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
