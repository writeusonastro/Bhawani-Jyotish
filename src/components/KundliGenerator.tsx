import React, { useState, useMemo } from 'react';
import { KundliInput, KundliResult } from '../types/astrology';
import { calculateVedicKundli } from '../utils/vedicCalculations';
import { INDIAN_CITIES_DATABASE, INDIAN_STATES } from '../data/indianCities';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { KundliChartVisualizer } from './KundliChartVisualizer';
import { 
  ScrollText, Sparkles, Printer, CheckCircle, MessageCircle, 
  MapPin, Search, Globe, ChevronDown, Compass, Calendar, Clock,
  Check, Info, Sparkle
} from 'lucide-react';

interface KundliGeneratorProps {
  lang: 'hi' | 'gu';
  onAskAI: (context: string) => void;
  isDark?: boolean;
}

export const KundliGenerator: React.FC<KundliGeneratorProps> = ({ lang, onAskAI, isDark = false }) => {
  const [selectedState, setSelectedState] = useState<string>('सभी राज्य (All India)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isCustomLocation, setIsCustomLocation] = useState<boolean>(false);

  const defaultCity = INDIAN_CITIES_DATABASE[0]; // Mehsana

  const [formData, setFormData] = useState<KundliInput>({
    name: 'राहुल पटेल',
    gender: 'male',
    day: 15,
    month: 8,
    year: 1996,
    hour: 14,
    minute: 30,
    cityName: defaultCity.name,
    state: defaultCity.state,
    latitude: defaultCity.lat,
    longitude: defaultCity.lon
  });

  const [result, setResult] = useState<KundliResult | null>(() => calculateVedicKundli(formData));

  // Filter cities based on selected state and search query
  const filteredCities = useMemo(() => {
    return INDIAN_CITIES_DATABASE.filter((city) => {
      const matchState = selectedState === 'सभी राज्य (All India)' || city.state === selectedState;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        city.name.toLowerCase().includes(q) || 
        city.nameEn.toLowerCase().includes(q) || 
        city.nameHi.toLowerCase().includes(q) ||
        city.state.toLowerCase().includes(q);
      return matchState && matchQuery;
    });
  }, [selectedState, searchQuery]);

  const handleCitySelect = (city: typeof INDIAN_CITIES_DATABASE[0]) => {
    setFormData((prev) => ({
      ...prev,
      cityName: city.name,
      state: city.state,
      latitude: city.lat,
      longitude: city.lon
    }));
    setIsCityDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = calculateVedicKundli(formData);
    setResult(calculated);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 ${
          isDark 
            ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' 
            : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
        }`}>
          <ScrollText className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
          <span>{lang === 'hi' ? 'शास्त्रोक्त वैदिक जन्म कुंडली चक्र' : 'શાસ્ત્રોક્ત વૈદિક જન્મ કુંડળી ચક્ર'}</span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'hi' ? 'सटीक जन्म कुंडली एवं संपूर्ण फलादेश' : 'સચોટ જન્મ કુંડળી અને સંપૂર્ણ ફલાદેશ'}
        </h2>
        <p className={`text-sm ${isDark ? 'text-stone-400' : 'text-stone-900 font-medium'}`}>
          {lang === 'hi'
            ? 'अक्षांश-देशांतर व लाschedule-सिद्ध सूक्ष्म गणना के साथ सटीक लग्न, चंद्र राशि, 9 ग्रह स्थिति, विंशोत्तरी महादशा व मांगलिक विचार प्राप्त करें'
            : 'અક્ષાંશ-રેખાંશ સહિત ચોક્કસ લગ્ન, ચંદ્ર રાશિ, 9 ગ્રહ સ્થિતિ, મહાદશા અને કુંડળી વિશ્લેષણ મેળવો'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className={`rounded-3xl p-6 border shadow-xl sticky top-24 transition-all duration-300 ${
            isDark 
              ? 'bg-stone-900/90 border-amber-500/20 shadow-black/40 backdrop-blur-md' 
              : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
          }`}>
            <h3 className={`font-yatra text-xl mb-4 pb-2 border-b flex items-center justify-between ${
              isDark ? 'text-amber-300 border-amber-500/20' : 'text-[#CC5218] border-[#FF671F]/15'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                <span>{lang === 'hi' ? 'जन्म विवरण दर्ज करें' : 'જન્મ વિગત દાખલ કરો'}</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-sans font-normal border ${
                isDark ? 'bg-amber-950/30 text-amber-300/80 border-amber-500/20' : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                सम्पूर्ण भारत (All India)
              </span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                  {lang === 'hi' ? 'पूरा नाम (Full Name)' : 'પૂરું નામ'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                    isDark 
                      ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400 focus:border-amber-400 placeholder-stone-500' 
                      : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F] focus:border-[#FF671F]'
                  }`}
                  placeholder="उदा. राहुल पटेल"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'लिंग (Gender)' : 'લિંગ'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark 
                        ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                        : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                    }`}
                  >
                    <option value="male">{lang === 'hi' ? 'पुरुष (Male)' : 'પુરુષ'}</option>
                    <option value="female">{lang === 'hi' ? 'महिला (Female)' : 'મહિલા'}</option>
                    <option value="other">{lang === 'hi' ? 'अन्य' : 'અન્ય'}</option>
                  </select>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'जन्म वर्ष (Year)' : 'જન્મ वर्ष'}
                  </label>
                  <input
                    type="number"
                    min="1920"
                    max="2035"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 1996 })}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark 
                        ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                        : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'जन्म तारीख (Day)' : 'જન્મ તારીખ'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    required
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark 
                        ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                        : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'जन्म महीना (Month)' : 'જન્મ મહિનો'}
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark 
                        ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                        : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                    }`}
                  >
                    {['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'].map((m, i) => (
                      <option key={m} value={i + 1}>{i + 1} - {m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'समय: घंटा (24 Hr)' : 'કલાક (0-23)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    required
                    value={formData.hour}
                    onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) || 0 })}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark 
                        ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                        : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'मिनट (Minute)' : 'મિનિટ (0-59)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    required
                    value={formData.minute}
                    onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) || 0 })}
                    className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      isDark 
                        ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                        : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                    }`}
                  />
                </div>
              </div>

              {/* Birth Place / City Selection (Pan India Database) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={`block font-semibold ${isDark ? 'text-stone-300' : 'text-stone-950'}`}>
                    {lang === 'hi' ? 'जन्म स्थान (Birth Location - Pan India)' : 'જન્મ સ્થળ (ભારત)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomLocation(!isCustomLocation)}
                    className={`text-[11px] font-medium underline transition-colors ${
                      isDark ? 'text-amber-400 hover:text-amber-300' : 'text-[#CC5218] hover:text-[#993D12]'
                    }`}
                  >
                    {isCustomLocation ? 'सूची में से चुनें (Select from list)' : 'कस्टम गांव / शहर जोड़ें (Custom coordinates)'}
                  </button>
                </div>

                {!isCustomLocation ? (
                  <div className="space-y-2">
                    {/* State Selector filter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className={`text-[11px] block mb-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          राज्य फिल्टर (State):
                        </span>
                        <select
                          value={selectedState}
                          onChange={(e) => {
                            setSelectedState(e.target.value);
                            setSearchQuery('');
                          }}
                          className={`w-full px-2.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 transition-all ${
                            isDark 
                              ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400' 
                              : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                          }`}
                        >
                          <option value="सभी राज्य (All India)">सभी राज्य (All India)</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      {/* City Search Box */}
                      <div>
                        <span className={`text-[11px] block mb-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                          शहर खोजें (Search City):
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="उदा. Delhi, Surat, Jaipur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsCityDropdownOpen(true)}
                            className={`w-full pl-7 pr-2.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 transition-all ${
                              isDark 
                                ? 'bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-400 placeholder-stone-500' 
                                : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]'
                            }`}
                          />
                          <Search className={`w-3.5 h-3.5 absolute left-2 top-2.5 ${isDark ? 'text-stone-500' : 'text-stone-400'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Selected City Display & Dropdown Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isDark 
                            ? 'bg-stone-800/80 border-stone-700 text-stone-100 hover:border-amber-400' 
                            : 'bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 hover:border-[#FF671F]'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <MapPin className={`w-4 h-4 shrink-0 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                          <div className="truncate">
                            <span className="font-semibold text-xs sm:text-sm">{formData.cityName}</span>
                            <span className={`text-[11px] ml-1.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                              ({formData.state})
                            </span>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {isCityDropdownOpen && (
                        <div className={`absolute z-30 w-full mt-1.5 max-h-56 overflow-y-auto rounded-2xl border shadow-2xl p-1.5 space-y-1 ${
                          isDark ? 'bg-stone-900 border-amber-500/30' : 'bg-white border-[#FF671F]/30'
                        }`}>
                          <div className={`px-2 py-1 text-[11px] font-semibold border-b flex justify-between ${
                            isDark ? 'text-amber-300/80 border-stone-800' : 'text-[#CC5218] border-stone-100'
                          }`}>
                            <span>{filteredCities.length} शहर उपलब्ध (Cities found)</span>
                            <span className="text-stone-400">अक्षांश/देशांतर सहित</span>
                          </div>

                          {filteredCities.length === 0 ? (
                            <div className="p-3 text-center text-xs text-stone-400">
                              कोई शहर नहीं मिला। कृपया नाम जांचें या कस्टम विकल्प चुनें।
                            </div>
                          ) : (
                            filteredCities.map((c) => {
                              const isSelected = formData.cityName === c.name;
                              return (
                                <button
                                  key={`${c.name}-${c.state}`}
                                  type="button"
                                  onClick={() => handleCitySelect(c)}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                                    isSelected 
                                      ? (isDark ? 'bg-amber-950/60 text-amber-300 font-bold' : 'bg-[#FFF5F0] text-[#CC5218] font-bold')
                                      : (isDark ? 'hover:bg-stone-800 text-stone-200' : 'hover:bg-[#FFFDF9] text-stone-800')
                                  }`}
                                >
                                  <div>
                                    <div className="font-medium">{c.name}</div>
                                    <div className={`text-[10px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                                      {c.state} • {c.lat.toFixed(2)}°N, {c.lon.toFixed(2)}°E
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <Check className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                                  )}
                                </button>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Custom Location Input (Village / Town / Coordinates) */
                  <div className={`p-3 rounded-2xl border space-y-2.5 ${
                    isDark ? 'bg-stone-800/40 border-amber-500/20' : 'bg-amber-50/40 border-amber-200'
                  }`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className={`block text-[11px] font-semibold mb-0.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                          स्थान का नाम (Place/Village Name)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cityName}
                          onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                          placeholder="उदा. राधनपुर, खेरालू, आदि"
                          className={`w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 ${
                            isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-amber-300 text-stone-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] font-semibold mb-0.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                          राज्य / क्षेत्र (State/Region)
                        </label>
                        <input
                          type="text"
                          value={formData.state || ''}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="उदा. गुजरात"
                          className={`w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 ${
                            isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-amber-300 text-stone-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={`block text-[11px] font-semibold mb-0.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                          अक्षांश (Latitude °N)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          min="6.0"
                          max="38.0"
                          value={formData.latitude || 23.5880}
                          onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 23.5880 })}
                          className={`w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 ${
                            isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-amber-300 text-stone-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] font-semibold mb-0.5 ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                          देशांतर (Longitude °E)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          min="68.0"
                          max="98.0"
                          value={formData.longitude || 72.3693}
                          onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 72.3693 })}
                          className={`w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 ${
                            isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-amber-300 text-stone-900'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Location verification badge */}
                <div className={`mt-1.5 px-2.5 py-1 rounded-lg text-[11px] flex items-center justify-between ${
                  isDark ? 'bg-stone-800/60 text-stone-400' : 'bg-[#FFF5F0] text-[#CC5218]'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    <span>लायब्रेरी निर्देशांक: {formData.latitude?.toFixed(2) || '23.59'}°N, {formData.longitude?.toFixed(2) || '72.37'}°E</span>
                  </span>
                  <span className="font-semibold text-emerald-600">IST (UTC+5:30)</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full font-yatra text-base py-3.5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-gradient-to-r from-amber-600 to-[#FF671F] hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-900/30' 
                    : 'bg-[#FF671F] hover:bg-[#CC5218] text-white shadow-[#FF671F]/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>{lang === 'hi' ? 'सटीक जन्म कुंडली बनाएं' : 'ચોક્કસ જન્મ કુંડળી બનાવો'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Results & Visual Chart (7 cols) */}
        {result && (
          <div className="lg:col-span-7 space-y-6">
            {/* Summary Highlights */}
            <div className={`rounded-3xl p-6 border shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-stone-900/90 border-amber-500/20 shadow-black/40' 
                : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
            }`}>
              <div className={`flex flex-wrap justify-between items-center gap-3 pb-4 border-b ${
                isDark ? 'border-amber-500/20' : 'border-[#FF671F]/15'
              }`}>
                <div>
                  <h3 className={`font-yatra text-2xl ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                    {formData.name} की जन्म कुंडली
                  </h3>
                  <p className={`text-xs flex items-center gap-2 mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-950 font-medium'}`}>
                    <span>📅 {formData.day}/{formData.month}/{formData.year}</span>
                    <span>•</span>
                    <span>⏰ {formData.hour}:{formData.minute.toString().padStart(2, '0')}</span>
                    <span>•</span>
                    <span className="font-semibold">{formData.cityName} ({formData.state})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isDark 
                        ? 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-amber-500/30' 
                        : 'bg-[#FFF5F0] hover:bg-[#FFEAE0] text-[#CC5218] border-[#FF671F]/30'
                    }`}
                    title="प्रिंट या पीडीएफ सेव करें"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.manglikStatus.includes('Non') || result.manglikStatus.includes('गैर')
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border dark:border-emerald-800' 
                      : result.manglikStatus.includes('Partial') || result.manglikStatus.includes('आंशिक')
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 dark:border dark:border-amber-800'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 dark:border dark:border-rose-800'
                  }`}>
                    {result.manglikStatus}
                  </span>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-center">
                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
                }`}>
                  <span className={`text-[11px] block ${isDark ? 'text-stone-400' : 'text-stone-900 font-medium'}`}>
                    {lang === 'hi' ? 'लग्न (Ascendant)' : 'લગ્ન'}
                  </span>
                  <span className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                    {result.ascendantRashi.split(' ')[0]} ({result.ascendantDegree}°)
                  </span>
                </div>

                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
                }`}>
                  <span className={`text-[11px] block ${isDark ? 'text-stone-400' : 'text-stone-900 font-medium'}`}>
                    {lang === 'hi' ? 'चंद्र राशि (Moon Sign)' : 'ચંદ્ર રાશિ'}
                  </span>
                  <span className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                    {result.moonRashi.split(' ')[0]}
                  </span>
                </div>

                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
                }`}>
                  <span className={`text-[11px] block ${isDark ? 'text-stone-400' : 'text-stone-900 font-medium'}`}>
                    {lang === 'hi' ? 'नक्षत्र (Nakshatra)' : 'નક્ષત્ર'}
                  </span>
                  <span className={`font-bold text-sm ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                    {result.nakshatra.split(' ')[0]} (चरण {result.nakshatraCharan})
                  </span>
                </div>

                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
                }`}>
                  <span className={`text-[11px] block ${isDark ? 'text-stone-400' : 'text-stone-900 font-medium'}`}>
                    {lang === 'hi' ? 'वर्तमान महादशा' : 'મહાદશા'}
                  </span>
                  <span className={`font-bold text-sm ${isDark ? 'text-stone-200' : 'text-stone-950'}`}>
                    {result.currentDasha} ({result.dashaEndYear} तक)
                  </span>
                </div>
              </div>

              {/* Interactive Kundli Chart Visualizer (North & South Indian + Clickable Houses) */}
              <div className="my-6">
                <KundliChartVisualizer
                  planets={result.planets}
                  ascendantRashi={result.ascendantRashi}
                  lang={lang}
                  isDark={isDark}
                />
              </div>

              {/* Planetary Positions Table */}
              <div className="overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                    {lang === 'hi' ? '9 ग्रह स्थिति, अंश एवं भाव विवरण (Planetary Ephemeris)' : '૯ ગ્રહ સ્થિતિ અને ભાવ વિગત'}
                  </h4>
                  <span className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    लाहिड़ी अयनांश (Lahiri Ayanamsha)
                  </span>
                </div>
                <table className={`w-full text-xs text-left border-collapse border rounded-xl overflow-hidden ${
                  isDark ? 'border-stone-700' : 'border-[#FF671F]/20'
                }`}>
                  <thead>
                    <tr className={isDark ? 'bg-stone-800 text-amber-300' : 'bg-[#FFF5F0] text-[#CC5218]'}>
                      <th className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>ग्रह (Planet)</th>
                      <th className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>राशि (Rashi)</th>
                      <th className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>अंश (Degree)</th>
                      <th className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>भाव (House)</th>
                      <th className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>स्थिति (Dignity)</th>
                      <th className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>गति (Speed)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.planets.map((p) => (
                      <tr key={p.planet} className={`transition-colors ${
                        isDark ? 'hover:bg-stone-800/70' : 'hover:bg-[#FFFDF9]'
                      }`}>
                        <td className={`p-2.5 border font-semibold ${isDark ? 'border-stone-700 text-amber-200' : 'border-[#FF671F]/20 text-stone-950 font-bold'}`}>
                          {p.planet}
                        </td>
                        <td className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>{p.rashi}</td>
                        <td className={`p-2.5 border font-mono ${isDark ? 'border-stone-700 text-amber-300/90' : 'border-[#FF671F]/20 text-[#CC5218]'}`}>
                          {p.degree}°
                        </td>
                        <td className={`p-2.5 border ${isDark ? 'border-stone-700' : 'border-[#FF671F]/20'}`}>{p.house} भाव</td>
                        <td className={`p-2.5 border font-medium ${
                          p.dignity.includes('Exalted') || p.dignity.includes('उच्च') || p.dignity.includes('Own') || p.dignity.includes('स्वराशि')
                            ? (isDark ? 'text-emerald-400' : 'text-emerald-700 font-bold')
                            : p.dignity.includes('Debilitated') || p.dignity.includes('नीच')
                              ? (isDark ? 'text-rose-400' : 'text-rose-700 font-bold')
                              : (isDark ? 'text-amber-300/80' : 'text-[#7A5218]')
                        }`}>
                          {p.dignity}
                        </td>
                        <td className={`p-2.5 border text-[11px] ${isDark ? 'border-stone-700 text-stone-400' : 'border-[#FF671F]/20 text-stone-500'}`}>
                          {p.isRetrograde ? (
                            <span className="px-1.5 py-0.5 rounded bg-rose-900/40 text-rose-300 font-semibold border border-rose-700/50">वक्र (Retro)</span>
                          ) : (
                            <span className="text-emerald-500">मार्गी (Direct)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Life Predictions & Vedic Remedies */}
            <div className={`rounded-3xl p-6 border shadow-xl space-y-4 transition-all duration-300 ${
              isDark 
                ? 'bg-stone-900/90 border-amber-500/20 shadow-black/40' 
                : 'bg-white border-[#FF671F]/25 shadow-[#FF671F]/5'
            }`}>
              <h3 className={`font-yatra text-xl pb-2 border-b flex items-center gap-2 ${
                isDark ? 'text-amber-300 border-amber-500/20' : 'text-[#CC5218] border-[#FF671F]/15'
              }`}>
                <Sparkles className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                <span>{lang === 'hi' ? 'सटीक जीवन फलादेश एवं शास्त्रीय उपाय' : 'ચોક્કસ જીવન ફલાદેશ અને શાસ્ત્રીય ઉપાય'}</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-stone-800/60 border-stone-700' : 'bg-[#FFFDF9] border-[#FF671F]/20'
                }`}>
                  <span className={`font-bold block mb-1 ${isDark ? 'text-amber-400' : 'text-[#CC5218]'}`}>
                    🌟 सामान्य स्वभाव एवं भाग्योदय (Personality & Destiny)
                  </span>
                  <p className={`leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-950 font-medium'}`}>
                    {result.lifePrediction.general}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-amber-950/30 border-amber-500/20' : 'bg-amber-50/70 border-amber-200'
                }`}>
                  <span className={`font-bold block mb-1 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                    💼 करियर, व्यापार एवं धन लाभ (Career & Wealth)
                  </span>
                  <p className={`leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-950 font-medium'}`}>
                    {result.lifePrediction.career}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-rose-950/30 border-rose-500/20' : 'bg-rose-50/70 border-rose-200'
                }`}>
                  <span className={`font-bold block mb-1 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                    ❤️ दांपत्य जीवन व वैवाहिक सुख (Marriage & Compatibility)
                  </span>
                  <p className={`leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-950 font-medium'}`}>
                    {result.lifePrediction.marriage}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-emerald-950/30 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-200'
                }`}>
                  <span className={`font-bold block mb-1 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    🌿 स्वास्थ्य एवं आत्मिक बल (Health & Vitality)
                  </span>
                  <p className={`leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-950 font-medium'}`}>
                    {result.lifePrediction.health}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark 
                    ? 'bg-gradient-to-r from-stone-800 to-amber-950/40 border-amber-500/30' 
                    : 'bg-gradient-to-r from-[#FFF5F0] to-[#FFEBE0] border-[#FF671F]/40'
                }`}>
                  <span className={`font-bold block mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                    🚩 अनुशंसित वैदिक उपाय एवं रत्न (Vedic Remedies & Gemstone)
                  </span>
                  <ul className={`space-y-1.5 ${isDark ? 'text-stone-300' : 'text-stone-950 font-medium'}`}>
                    {result.lifePrediction.recommendedUpay.map((upay, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-[#FF671F]'}`} />
                        <span>{upay}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-3 pt-2 border-t text-xs font-semibold ${
                    isDark ? 'border-amber-500/20 text-amber-300' : 'border-[#FF671F]/20 text-[#CC5218]'
                  }`}>
                    अनुकूल रत्न: {result.lifePrediction.luckyGem} | मंत्र: {result.lifePrediction.luckyMantra}
                  </div>
                </div>
              </div>

              {/* Action row to consult or ask AI */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onAskAI(`मेरी कुंडली लग्न ${result.ascendantRashi}, चंद्र राशि ${result.moonRashi}, नक्षत्र ${result.nakshatra} (चरण ${result.nakshatraCharan}) है। वर्तमान में ${result.currentDasha} चल रही है। कृपया मेरे करियर, स्वास्थ्य और भविष्य के विषय में मार्गदर्शन करें।`)}
                  className={`flex-1 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                    isDark 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40' 
                      : 'bg-[#FF671F] hover:bg-[#CC5218] text-white shadow-[#FF671F]/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'इस सटीक कुंडली पर AI ज्योतिषी से पूछें' : 'આ કુંડળી પર પ્રશ્ન પૂછો'}</span>
                </button>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मैंने भवानी ज्योतिष वेबसाइट पर अपनी सटीक वैदिक कुंडली (${formData.name}, ${result.ascendantRashi} लग्न, ${result.moonRashi} राशि, जन्म स्थान: ${formData.cityName}) बनाई है। मुझे विस्तृत व्यक्तिगत परामर्श चाहिए।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'पंडित जी से व्हाट्सएप पर बात करें' : 'પંડિતજી સાથે વાત કરો'}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
