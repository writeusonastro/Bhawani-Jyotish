import React, { useState, useMemo } from 'react';
import { KundliInput, KundliResult, Language } from '../types/astrology';
import { calculateVedicKundli } from '../utils/vedicCalculations';
import { INDIAN_CITIES_DATABASE, INDIAN_STATES } from '../data/indianCities';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { KundliChartVisualizer } from './KundliChartVisualizer';
import { 
  ScrollText, Sparkles, Printer, CheckCircle2, MessageCircle, 
  MapPin, Search, ChevronDown, Compass, Calendar, Clock,
  Check, Info, Sun, Moon, Flame, ShieldAlert, Award, ChevronRight,
  BookOpen, HeartHandshake, Eye
} from 'lucide-react';

interface KundliGeneratorProps {
  lang: Language;
  onAskAI: (context: string) => void;
  isDark?: boolean;
}

export const KundliGenerator: React.FC<KundliGeneratorProps> = ({ lang, onAskAI, isDark = false }) => {
  const [selectedState, setSelectedState] = useState<string>('सभी राज्य (All India)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isCustomLocation, setIsCustomLocation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'panchang' | 'chart' | 'planets' | 'dasha' | 'yogas' | 'predictions'>('panchang');

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
    <div className="py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 text-stone-900">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border mb-2 bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30">
          <ScrollText className="w-4 h-4 text-[#FF671F]" />
          <span>
            {lang === 'en'
              ? 'Vedic Hindu Panchang & Janam Kundli'
              : lang === 'hi'
              ? 'शास्त्रोक्त हिंदू पंचांग एवं जन्म कुंडली'
              : 'શાસ્ત્રોક્ત હિન્દુ પંચાંગ અને જન્મ કુંડળી'}
          </span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl mb-2 text-[#CC5218]">
          {lang === 'en'
            ? 'Accurate Vedic Panchang, Kundli & Planetary Calculations'
            : lang === 'hi'
            ? 'सटीक वैदिक पंचांग, कुंडली व ग्रह गणना'
            : 'સચોટ વૈદિક પંચાંગ અને જન્મ કુંડળી'}
        </h2>
        <p className="text-sm text-stone-700 font-medium">
          {lang === 'en'
            ? 'Comprehensive Hindu Calendar, Vikram Samvat, Tithi, Nakshatra, Karan, Yoga, Ishtakala, Avakahada Chakra, Navamsha (D9), Vimshottari Mahadasha & Doshas'
            : lang === 'hi'
            ? 'हिंदू पंचांग अनुसार विक्रम संवत, तिथि, नक्षत्र, करण, योग, इष्टकाल, अवकहड़ा चक्र, नवमांश (D9), महादशा व सर्वदोष विचार'
            : 'હિન્દુ પંચાંગ મુજબ વિક્રમ સંવત, તિથિ, નક્ષત્ર, ઇષ્ટકાળ, અવકહડા ચક્ર, નવમાંશ અને મહાદશા ગણતરી'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl p-6 border shadow-xl sticky top-24 transition-all duration-300 bg-white border-[#FF671F]/25 shadow-[#FF671F]/5">
            <h3 className="font-yatra text-xl mb-4 pb-2 border-b flex items-center justify-between text-[#CC5218] border-[#FF671F]/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF671F]" />
                <span>
                  {lang === 'en' ? 'Enter Birth Details' : lang === 'hi' ? 'जन्म विवरण दर्ज करें' : 'જન્મ વિગત દાખલ કરો'}
                </span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-sans font-semibold border bg-amber-50 text-amber-800 border-amber-200">
                लाहिड़ी अयनांश (Lahiri)
              </span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1 text-stone-950">
                  {lang === 'en' ? 'Full Name' : lang === 'hi' ? 'पूरा नाम (Full Name)' : 'પૂરું નામ'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F] focus:border-[#FF671F]"
                  placeholder="उदा. राहुल पटेल"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-stone-950">
                    {lang === 'en' ? 'Gender' : lang === 'hi' ? 'लिंग (Gender)' : 'લિંગ'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                  >
                    <option value="male">{lang === 'en' ? 'Male' : lang === 'hi' ? 'पुरुष (Male)' : 'પુરુષ'}</option>
                    <option value="female">{lang === 'en' ? 'Female' : lang === 'hi' ? 'महिला (Female)' : 'મહિલા'}</option>
                    <option value="other">{lang === 'en' ? 'Other' : lang === 'hi' ? 'अन्य' : 'અન્ય'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-950">
                    {lang === 'en' ? 'Birth Year' : lang === 'hi' ? 'जन्म वर्ष (Year)' : 'જન્મ वर्ष'}
                  </label>
                  <input
                    type="number"
                    min="1920"
                    max="2035"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 1996 })}
                    className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-stone-950">
                    {lang === 'hi' ? 'जन्म तारीख (Day)' : 'જન્મ તારીખ'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    required
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-950">
                    {lang === 'hi' ? 'जन्म महीना (Month)' : 'જન્મ મહિનો'}
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                  >
                    {['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'].map((m, i) => (
                      <option key={m} value={i + 1}>{i + 1} - {m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-stone-950">
                    {lang === 'hi' ? 'समय: घंटा (24 Hr)' : 'કલાક (0-23)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    required
                    value={formData.hour}
                    onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-950">
                    {lang === 'hi' ? 'मिनट (Minute)' : 'મિનિટ (0-59)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    required
                    value={formData.minute}
                    onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                  />
                </div>
              </div>

              {/* Birth Place / City Selection (Pan India Database) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-stone-950">
                    {lang === 'hi' ? 'जन्म स्थान (Birth Location - Pan India)' : 'જન્મ સ્થળ (ભારત)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomLocation(!isCustomLocation)}
                    className="text-[11px] font-medium underline transition-colors text-[#CC5218] hover:text-[#993D12]"
                  >
                    {isCustomLocation ? 'सूची में से चुनें (Select from list)' : 'कस्टम अक्षांश / देशांतर जोड़ें'}
                  </button>
                </div>

                {!isCustomLocation ? (
                  <div className="space-y-2">
                    {/* State Selector filter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[11px] block mb-0.5 text-stone-600">
                          राज्य फिल्टर (State):
                        </span>
                        <select
                          value={selectedState}
                          onChange={(e) => {
                            setSelectedState(e.target.value);
                            setSearchQuery('');
                          }}
                          className="w-full px-2.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                        >
                          <option value="सभी राज्य (All India)">सभी राज्य (All India)</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      {/* City Search Box */}
                      <div>
                        <span className="text-[11px] block mb-0.5 text-stone-600">
                          शहर खोजें (Search City):
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="उदा. Mehsana, Ahmedabad, Delhi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsCityDropdownOpen(true)}
                            className="w-full pl-7 pr-2.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                          />
                          <Search className="w-3.5 h-3.5 absolute left-2 top-2.5 text-stone-400" />
                        </div>
                      </div>
                    </div>

                    {/* Selected City Display & Dropdown Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                        className="w-full px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 hover:border-[#FF671F]"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <MapPin className="w-4 h-4 shrink-0 text-[#FF671F]" />
                          <div className="truncate">
                            <span className="font-semibold text-xs sm:text-sm">{formData.cityName}</span>
                            <span className="text-[11px] ml-1.5 text-stone-500">
                              ({formData.state})
                            </span>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {isCityDropdownOpen && (
                        <div className="absolute z-30 w-full mt-1.5 max-h-56 overflow-y-auto rounded-2xl border shadow-2xl p-1.5 space-y-1 bg-white border-[#FF671F]/30">
                          <div className="px-2 py-1 text-[11px] font-semibold border-b flex justify-between text-[#CC5218] border-stone-100">
                            <span>{filteredCities.length} शहर उपलब्ध</span>
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
                                      ? 'bg-[#FFF5F0] text-[#CC5218] font-bold'
                                      : 'hover:bg-[#FFFDF9] text-stone-800'
                                  }`}
                                >
                                  <div>
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-[10px] text-stone-500">
                                      {c.state} • {c.lat.toFixed(2)}°N, {c.lon.toFixed(2)}°E
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-[#FF671F]" />
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
                  /* Custom Location Input */
                  <div className="p-3 rounded-2xl border space-y-2.5 bg-amber-50/40 border-amber-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold mb-0.5 text-stone-700">
                          स्थान का नाम (Place Name)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cityName}
                          onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                          placeholder="उदा. राधनपुर, खेरालू"
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 bg-white border-amber-300 text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold mb-0.5 text-stone-700">
                          राज्य (State)
                        </label>
                        <input
                          type="text"
                          value={formData.state || ''}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="उदा. गुजरात"
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 bg-white border-amber-300 text-stone-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold mb-0.5 text-stone-700">
                          अक्षांश (Latitude °N)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          min="6.0"
                          max="38.0"
                          value={formData.latitude || 23.5880}
                          onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 23.5880 })}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 bg-white border-amber-300 text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold mb-0.5 text-stone-700">
                          देशांतर (Longitude °E)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          min="68.0"
                          max="98.0"
                          value={formData.longitude || 72.3693}
                          onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 72.3693 })}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 bg-white border-amber-300 text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Location verification badge */}
                <div className="mt-1.5 px-2.5 py-1 rounded-lg text-[11px] flex items-center justify-between bg-[#FFF5F0] text-[#CC5218]">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    <span>निर्देशांक: {formData.latitude?.toFixed(2) || '23.59'}°N, {formData.longitude?.toFixed(2) || '72.37'}°E</span>
                  </span>
                  <span className="font-semibold text-emerald-700">भारतीय मानक समय (IST)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-yatra text-base py-3.5 rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 bg-[#FF671F] hover:bg-[#CC5218] text-white shadow-[#FF671F]/30"
              >
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>{lang === 'hi' ? 'सटीक जन्म कुंडली व पंचांग बनाएं' : 'ચોક્કસ જન્મ કુંડળી અને પંચાંગ બનાવો'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Results & Visual Chart (7 cols) */}
        {result && (
          <div className="lg:col-span-7 space-y-6">
            {/* Header / Summary Card */}
            <div className="rounded-3xl p-6 border shadow-xl transition-all duration-300 bg-white border-[#FF671F]/25 shadow-[#FF671F]/5">
              <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-[#FF671F]/15">
                <div>
                  <h3 className="font-yatra text-2xl text-[#CC5218]">
                    {formData.name} की शास्त्रोक्त जन्म कुंडली
                  </h3>
                  <p className="text-xs flex flex-wrap items-center gap-2 mt-0.5 text-stone-950 font-semibold">
                    <span>📅 {formData.day}/{formData.month}/{formData.year}</span>
                    <span>•</span>
                    <span>⏰ {formData.hour}:{formData.minute.toString().padStart(2, '0')} IST</span>
                    <span>•</span>
                    <span>📍 {formData.cityName} ({formData.state})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="p-2.5 rounded-xl border transition-colors bg-[#FFF5F0] hover:bg-[#FFEAE0] text-[#CC5218] border-[#FF671F]/30"
                    title="प्रिंट या पीडीएफ सेव करें"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.manglikStatus.includes('Non') || result.manglikStatus.includes('गैर')
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : result.manglikStatus.includes('Partial') || result.manglikStatus.includes('आंशिक')
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {result.manglikStatus}
                  </span>
                </div>
              </div>

              {/* Quick 4 Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-4 text-center">
                <div className="p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                  <span className="text-[11px] block text-stone-700 font-bold">
                    {lang === 'hi' ? 'लग्न (Ascendant)' : 'લગ્ન'}
                  </span>
                  <span className="font-bold text-sm text-[#CC5218]">
                    {result.ascendantRashi.split(' ')[0]} ({result.ascendantDms || `${result.ascendantDegree}°`})
                  </span>
                </div>

                <div className="p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                  <span className="text-[11px] block text-stone-700 font-bold">
                    {lang === 'hi' ? 'चंद्र राशि (Moon Sign)' : 'ચંદ્ર રાશિ'}
                  </span>
                  <span className="font-bold text-sm text-[#CC5218]">
                    {result.moonRashi.split(' ')[0]}
                  </span>
                </div>

                <div className="p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                  <span className="text-[11px] block text-stone-700 font-bold">
                    {lang === 'hi' ? 'नक्षत्र (Nakshatra)' : 'નક્ષત્ર'}
                  </span>
                  <span className="font-bold text-sm text-stone-950">
                    {result.nakshatra.split(' ')[0]} (चरण {result.nakshatraCharan})
                  </span>
                </div>

                <div className="p-3 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                  <span className="text-[11px] block text-stone-700 font-bold">
                    {lang === 'hi' ? 'जन्म नामाक्षर' : 'નામાક્ષર'}
                  </span>
                  <span className="font-bold text-sm text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    '{result.avakahadaChakra.naamAkshar}' अक्षर
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto gap-1.5 pb-2 mb-4 border-b border-[#FF671F]/20 no-scrollbar">
                {[
                  {
                    id: 'panchang',
                    label: lang === 'en' ? '1. Birth Panchang' : lang === 'hi' ? '1. जन्म पंचांग' : '૧. જન્મ પંચાંગ',
                    icon: Calendar,
                  },
                  {
                    id: 'chart',
                    label: lang === 'en' ? '2. Chart (D1/D9)' : lang === 'hi' ? '2. कुंडली चक्र (D1/D9)' : '૨. કુંડળી ચક્ર',
                    icon: Eye,
                  },
                  {
                    id: 'planets',
                    label: lang === 'en' ? '3. Planetary Positions' : lang === 'hi' ? '3. ग्रह स्थिति' : '૩. ગ્રહ સ્થિતિ',
                    icon: Sun,
                  },
                  {
                    id: 'dasha',
                    label: lang === 'en' ? '4. Vimshottari Dasha' : lang === 'hi' ? '4. विंशोत्तरी दशा' : '૪. વિંશોત્તરી દશા',
                    icon: Clock,
                  },
                  {
                    id: 'yogas',
                    label: lang === 'en' ? '5. Yogas & Doshas' : lang === 'hi' ? '5. योग एवं दोष' : '૫. યોગ અને દોષ',
                    icon: Award,
                  },
                  {
                    id: 'predictions',
                    label: lang === 'en' ? '6. Predictions & Remedies' : lang === 'hi' ? '6. फलादेश व उपाय' : '૬. ફલાદેશ અને ઉપાય',
                    icon: Sparkles,
                  },
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-[#FF671F] text-white shadow-sm'
                          : 'bg-[#FFF5F0] text-stone-800 border border-[#FF671F]/20 hover:bg-[#FFEAE0]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: Complete Birth Panchang & Avakahada Chakra */}
              {activeTab === 'panchang' && (
                <div className="space-y-5">
                  {/* Birth Hindu Calendar Box */}
                  <div className="p-4 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#FF671F]/20 pb-2">
                      <h4 className="font-yatra text-base text-[#CC5218] flex items-center gap-1.5 font-bold">
                        <Compass className="w-4 h-4 text-[#FF671F]" />
                        <span>जन्म कालीन हिंदू पंचांग (Birth Panchang)</span>
                      </h4>
                      <span className="text-xs font-semibold text-stone-600">
                        {result.birthPanchang.samvatVikram}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">विक्रम / शक संवत</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.samvatVikram}</strong>
                        <span className="text-[10px] text-stone-500">{result.birthPanchang.samvatShaka}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">हिंदू मास एवं पक्ष</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.hinduMonth}</strong>
                        <span className="text-[10px] text-[#CC5218] font-bold">{result.birthPanchang.paksha}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">तिथि एवं तिथि स्वामी</span>
                        <strong className="text-[#CC5218] text-xs block">{result.birthPanchang.tithi}</strong>
                        <span className="text-[10px] text-stone-600">स्वामी: {result.birthPanchang.tithiLord}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">नक्षत्र व चरण</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.nakshatra} (चरण {result.birthPanchang.nakshatraCharan})</strong>
                        <span className="text-[10px] text-stone-600">स्वामी: {result.birthPanchang.nakshatraLord}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">नित्य योग (Yoga)</span>
                        <strong className="text-emerald-800 text-xs block">{result.birthPanchang.yoga}</strong>
                        <span className="text-[10px] text-stone-600 truncate block">{result.birthPanchang.yogaDescription.slice(0, 24)}...</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">करण (Karana)</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.karana}</strong>
                        <span className="text-[10px] text-stone-600">{result.birthPanchang.dayOfWeek} ({result.birthPanchang.dayLord})</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">सूर्योदय एवं सूर्यास्त</span>
                        <strong className="text-amber-800 text-xs block">☀️ {result.birthPanchang.sunrise}</strong>
                        <span className="text-[10px] text-indigo-700">🌙 {result.birthPanchang.sunset}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">इष्टकाल (Ishta Kaal)</span>
                        <strong className="text-[#CC5218] text-xs block">{result.birthPanchang.ishtaKaal}</strong>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">अयन एवं वैदिक ऋतु</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.ayan}</strong>
                        <span className="text-[10px] text-stone-600">{result.birthPanchang.ritu}</span>
                      </div>
                    </div>
                  </div>

                  {/* Avakahada Chakra Box (8 Attributes) */}
                  <div className="p-4 rounded-2xl border bg-[#FFF5F0] border-[#FF671F]/30 space-y-3">
                    <h4 className="font-yatra text-base text-[#CC5218] flex items-center gap-1.5 font-bold">
                      <Award className="w-4 h-4 text-[#FF671F]" />
                      <span>अवकहड़ा चक्र (Avakahada Chakra)</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">1. वर्ण (Varna)</span>
                        <strong className="text-stone-900 text-xs">{result.avakahadaChakra.varna}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">2. वश्य (Vashya)</span>
                        <strong className="text-stone-900 text-xs">{result.avakahadaChakra.vashya}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">3. योनि (Yoni)</span>
                        <strong className="text-stone-900 text-xs">{result.avakahadaChakra.yoni}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">4. गण (Gana)</span>
                        <strong className="text-stone-900 text-xs">{result.avakahadaChakra.gana}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">5. नाड़ी (Nadi)</span>
                        <strong className="text-stone-900 text-xs">{result.avakahadaChakra.nadi}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">6. जन्म पाया (Paya)</span>
                        <strong className="text-emerald-800 text-xs">{result.avakahadaChakra.paya}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">7. तत्व (Tatva)</span>
                        <strong className="text-stone-900 text-xs">{result.avakahadaChakra.tatva}</strong>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-[#FF671F]/20">
                        <span className="text-stone-500 text-[10px] font-bold block">8. राशि स्वामी</span>
                        <strong className="text-[#CC5218] text-xs">{result.avakahadaChakra.rashiLord}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Interactive Chart Visualizer (D1 & D9) */}
              {activeTab === 'chart' && (
                <div className="space-y-4">
                  <KundliChartVisualizer
                    planets={result.planets}
                    navamshaPlanets={result.navamshaPlanets}
                    ascendantRashi={result.ascendantRashi}
                    lang={lang}
                    isDark={isDark}
                  />
                </div>
              )}

              {/* TAB 3: Detailed Planetary Ephemeris */}
              {activeTab === 'planets' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border rounded-2xl overflow-hidden border-[#FF671F]/20">
                      <thead>
                        <tr className="bg-[#FFF5F0] text-[#CC5218] font-bold">
                          <th className="p-2.5 border border-[#FF671F]/20">ग्रह (Planet)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">राशि (Rashi)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">अंश (DMS)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">भाव</th>
                          <th className="p-2.5 border border-[#FF671F]/20">नक्षत्र (चरण)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">अवस्था</th>
                          <th className="p-2.5 border border-[#FF671F]/20">स्थिति (Dignity)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">गति/दशा</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.planets.map((p) => (
                          <tr key={p.planet} className="hover:bg-[#FFFDF9] transition-colors">
                            <td className="p-2.5 border border-[#FF671F]/20 font-bold text-stone-950">
                              {p.planet}
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-medium">{p.rashi}</td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-mono text-[#CC5218] font-semibold">
                              {p.dms || `${p.degree}°`}
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-bold text-stone-900">{p.house} भाव</td>
                            <td className="p-2.5 border border-[#FF671F]/20 text-[11px]">
                              {p.nakshatra} ({p.nakshatraCharan})
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 text-[11px] font-semibold text-stone-700">
                              {p.avastha}
                            </td>
                            <td className={`p-2.5 border border-[#FF671F]/20 font-bold text-xs ${
                              p.dignity.includes('Exalted') || p.dignity.includes('उच्च') || p.dignity.includes('Own') || p.dignity.includes('स्वराशि')
                                ? 'text-emerald-700'
                                : p.dignity.includes('Debilitated') || p.dignity.includes('नीच')
                                  ? 'text-rose-700'
                                  : 'text-amber-800'
                            }`}>
                              {p.dignity}
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 text-[11px]">
                              <div className="flex flex-wrap gap-1">
                                {p.isRetrograde && (
                                  <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold border border-rose-300">वक्र</span>
                                )}
                                {p.isCombust && (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">अस्त</span>
                                )}
                                {!p.isRetrograde && !p.isCombust && (
                                  <span className="text-emerald-700 font-medium">मार्गी</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: Vimshottari Mahadasha Timeline */}
              {activeTab === 'dasha' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-yatra text-base text-[#CC5218] font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FF671F]" />
                      <span>120 वर्षीय विंशोत्तरी महादशा एवं अंतर्दशा चक्र</span>
                    </h4>
                    <span className="text-xs text-stone-600">
                      जन्म कालीन दशा: <strong>{result.currentDasha}</strong>
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {result.dashaTimeline.map((dasha, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          dasha.isCurrent
                            ? 'bg-[#FFF5F0] border-[#FF671F] ring-2 ring-[#FF671F]/30 shadow-md'
                            : dasha.isPast
                            ? 'bg-stone-50 border-stone-200 opacity-75'
                            : 'bg-white border-[#FF671F]/20'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                              dasha.isCurrent ? 'bg-[#FF671F] text-white' : 'bg-stone-200 text-stone-700'
                            }`}>
                              {idx + 1}
                            </span>
                            <div>
                              <strong className={`text-sm ${dasha.isCurrent ? 'text-[#CC5218] font-bold' : 'text-stone-900'}`}>
                                {dasha.planet} महादशा
                              </strong>
                              <span className="text-xs text-stone-500 ml-2">
                                ({dasha.durationYears} वर्ष)
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-stone-700">
                              {dasha.startDateFormatted} से {dasha.endDateFormatted}
                            </span>
                            {dasha.isCurrent && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] animate-pulse">
                                वर्तमान सक्रिय (Active)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* If Current Mahadasha, display Antardashas */}
                        {dasha.isCurrent && dasha.antardashas && (
                          <div className="mt-3 pt-3 border-t border-[#FF671F]/20">
                            <span className="text-[11px] font-bold text-[#CC5218] block mb-1.5">
                              इस महादशा के अंतर्गत 9 अंतर्दशाएं (Antardashas):
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                              {dasha.antardashas.map((ad, aIdx) => (
                                <div
                                  key={aIdx}
                                  className={`p-2 rounded-xl border flex items-center justify-between ${
                                    ad.isCurrent
                                      ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950 ring-1 ring-emerald-400'
                                      : 'bg-white border-[#FF671F]/15 text-stone-700'
                                  }`}
                                >
                                  <div>
                                    <div className="font-semibold">{ad.lord.split(' ')[0]}</div>
                                    <div className="text-[9px] text-stone-500">{ad.startDate} - {ad.endDate}</div>
                                  </div>
                                  {ad.isCurrent && (
                                    <span className="text-[8px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                                      सक्रिय
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Special Yogas & Dosha Analysis */}
              {activeTab === 'yogas' && (
                <div className="space-y-5">
                  {/* Special Vedic Yogas Found */}
                  <div className="space-y-3">
                    <h4 className="font-yatra text-base text-[#CC5218] font-bold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#FF671F]" />
                      <span>आपकी कुंडली में विद्यमान विशिष्ट योग ({result.specialYogas.length})</span>
                    </h4>

                    {result.specialYogas.length > 0 ? (
                      <div className="space-y-2.5">
                        {result.specialYogas.map((yoga, yIdx) => (
                          <div
                            key={yIdx}
                            className={`p-3.5 rounded-2xl border ${
                              yoga.type.includes('राजयोग')
                                ? 'bg-amber-50/80 border-amber-300'
                                : yoga.type.includes('शुभ')
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : 'bg-rose-50/70 border-rose-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <strong className="text-sm text-stone-900 font-bold">{yoga.name}</strong>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                yoga.type.includes('राजयोग')
                                  ? 'bg-amber-200 text-amber-950'
                                  : yoga.type.includes('शुभ')
                                  ? 'bg-emerald-200 text-emerald-950'
                                  : 'bg-rose-200 text-rose-950'
                              }`}>
                                {yoga.type}
                              </span>
                            </div>
                            <p className="text-xs text-stone-700 mb-1">{yoga.description}</p>
                            <p className="text-xs font-semibold text-[#CC5218] flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#FF671F] shrink-0" />
                              <span>फल: {yoga.effect}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20 text-xs text-stone-600">
                        आपकी कुंडली में अन्य सामान्य ग्रह योग सक्रिय हैं। लग्न व चंद्र की शुभ स्थिति उत्तम फल प्रदाता है।
                      </div>
                    )}
                  </div>

                  {/* Dosha Analysis Cards */}
                  <div className="space-y-3 pt-2 border-t border-[#FF671F]/20">
                    <h4 className="font-yatra text-base text-[#CC5218] font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-[#FF671F]" />
                      <span>दोष विचार (मांगलिक, कालसर्प, साढ़े साती व पितृ दोष)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Manglik */}
                      <div className="p-3.5 rounded-2xl border bg-white border-[#FF671F]/20 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-bold">1. मांगलिक विचार (Kuja Dosha)</strong>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            result.doshaAnalysis.manglik.status.includes('Non') || result.doshaAnalysis.manglik.status.includes('गैर')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {result.doshaAnalysis.manglik.status}
                          </span>
                        </div>
                        <p className="text-stone-700 leading-relaxed">{result.doshaAnalysis.manglik.description}</p>
                      </div>

                      {/* Kaal Sarp */}
                      <div className="p-3.5 rounded-2xl border bg-white border-[#FF671F]/20 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-bold">2. कालसर्प योग विचार</strong>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            !result.doshaAnalysis.kaalSarp.isPresent
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {result.doshaAnalysis.kaalSarp.type}
                          </span>
                        </div>
                        <p className="text-stone-700 leading-relaxed">{result.doshaAnalysis.kaalSarp.description}</p>
                        <p className="text-[11px] text-[#CC5218] font-semibold">उपाय: {result.doshaAnalysis.kaalSarp.remedy}</p>
                      </div>

                      {/* Sade Sati */}
                      <div className="p-3.5 rounded-2xl border bg-white border-[#FF671F]/20 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-bold">3. शनि साढ़े साती / ढैया</strong>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                            {result.doshaAnalysis.sadeSati.status}
                          </span>
                        </div>
                        <p className="text-stone-700 leading-relaxed">{result.doshaAnalysis.sadeSati.description}</p>
                        <p className="text-[11px] text-[#CC5218] font-semibold">उपाय: {result.doshaAnalysis.sadeSati.remedy}</p>
                      </div>

                      {/* Pitra Dosh */}
                      <div className="p-3.5 rounded-2xl border bg-white border-[#FF671F]/20 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-bold">4. पितृ दोष विचार</strong>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            !result.doshaAnalysis.pitraDosh.isPresent
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {result.doshaAnalysis.pitraDosh.isPresent ? 'दोष उपस्थित' : 'दोष रहित'}
                          </span>
                        </div>
                        <p className="text-stone-700 leading-relaxed">{result.doshaAnalysis.pitraDosh.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: Life Predictions & Vedic Remedies */}
              {activeTab === 'predictions' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/20">
                    <span className="font-bold block mb-1 text-[#CC5218]">
                      🌟 सामान्य स्वभाव एवं भाग्योदय (Personality & Destiny)
                    </span>
                    <p className="leading-relaxed text-stone-950 font-medium">
                      {result.lifePrediction.general}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border bg-amber-50/70 border-amber-200">
                    <span className="font-bold block mb-1 text-amber-900">
                      💼 करियर, व्यापार एवं धन लाभ (Career & Wealth)
                    </span>
                    <p className="leading-relaxed text-stone-950 font-medium">
                      {result.lifePrediction.career}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border bg-rose-50/70 border-rose-200">
                    <span className="font-bold block mb-1 text-rose-900">
                      ❤️ दांपत्य जीवन व वैवाहिक सुख (Marriage & Compatibility)
                    </span>
                    <p className="leading-relaxed text-stone-950 font-medium">
                      {result.lifePrediction.marriage}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border bg-emerald-50/70 border-emerald-200">
                    <span className="font-bold block mb-1 text-emerald-900">
                      🌿 स्वास्थ्य एवं आत्मिक बल (Health & Vitality)
                    </span>
                    <p className="leading-relaxed text-stone-950 font-medium">
                      {result.lifePrediction.health}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border bg-gradient-to-r from-[#FFF5F0] to-[#FFEBE0] border-[#FF671F]/40">
                    <span className="font-bold block mb-2 text-[#CC5218]">
                      🚩 अनुशंसित वैदिक उपाय एवं रत्न (Vedic Remedies & Gemstone)
                    </span>
                    <ul className="space-y-1.5 text-stone-950 font-medium">
                      {result.lifePrediction.recommendedUpay.map((upay, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#FF671F]" />
                          <span>{upay}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-2 border-t text-xs font-semibold border-[#FF671F]/20 text-[#CC5218]">
                      अनुकूल रत्न: {result.lifePrediction.luckyGem} | मंत्र: {result.lifePrediction.luckyMantra}
                    </div>
                  </div>
                </div>
              )}

              {/* Action row to consult or ask AI */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onAskAI(`मेरी कुंडली लग्न ${result.ascendantRashi}, चंद्र राशि ${result.moonRashi}, नक्षत्र ${result.nakshatra} (चरण ${result.nakshatraCharan}) एवं जन्म तिथि ${result.birthPanchang.tithi} है। वर्तमान में ${result.currentDasha} महादशा चल रही है। कृपया मुझे करियर व जीवन के लिए मार्गदर्शन दें।`)}
                  className="flex-1 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 bg-[#FF671F] hover:bg-[#CC5218] text-white shadow-[#FF671F]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'इस सटीक कुंडली पर AI ज्योतिषी से पूछें' : 'આ કુંડળી પર પ્રશ્ન પૂછો'}</span>
                </button>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    lang === 'en'
                      ? `🚩 Jai Maa Bhavani!\nPranam Pandit Ji 🙏✨\n\nI generated my Janam Kundli on your website and would like a comprehensive personal astrological consultation:\n\n👤 Name: ${formData.name}\n📅 Birth Date: ${formData.day}/${formData.month}/${formData.year}\n📍 City: ${formData.cityName}\n✨ Ascendant (Lagna): ${result.ascendantRashi.split(' ')[0]}\n🌙 Moon Sign: ${result.moonRashi.split(' ')[0]}\n⭐ Nakshatra: ${result.nakshatra.split(' ')[0]}\n📜 Tithi: ${result.birthPanchang.tithi}\n\nKindly guide me on how to proceed with the detailed consultation. Thank you!`
                      : lang === 'gu'
                      ? `🚩 જય મા ભવાની!\nસાદર પ્રણામ પંડિતજી 🙏✨\n\nમેં આપની વેબસાઇટ પર મારી જન્મ કુંડળી તૈયાર કરી છે અને તેના આધારે આપની સાથે વિસ્તૃત પરામર્શ કરવો છે:\n\n👤 નામ: ${formData.name}\n📅 જન્મ તારીખ: ${formData.day}/${formData.month}/${formData.year}\n📍 જન્મ સ્થળ: ${formData.cityName}\n✨ લગ્ન રાશિ: ${result.ascendantRashi.split(' ')[0]}\n🌙 ચંદ્ર રાશિ: ${result.moonRashi.split(' ')[0]}\n⭐ નક્ષત્ર: ${result.nakshatra.split(' ')[0]}\n📜 તિથિ: ${result.birthPanchang.tithi}\n\nકૃપા કરી પરામર્શ માટે અનુકૂળ સમય અને વિગત જણાવશો. ધન્યવાદ!`
                      : `🚩 ॐ नमः शिवाय!\nसादर प्रणाम पंडित जी 🙏✨\n\nमैंने आपकी वेबसाइट पर अपनी जन्म कुंडली तैयार की है और इसके आधार पर आपसे संपूर्ण व्यक्तिगत परामर्श प्राप्त करना है:\n\n👤 नाम: ${formData.name}\n📅 जन्म तिथि: ${formData.day}/${formData.month}/${formData.year}\n📍 जन्म स्थान: ${formData.cityName}\n✨ लग्न: ${result.ascendantRashi.split(' ')[0]}\n🌙 चंद्र राशि: ${result.moonRashi.split(' ')[0]}\n⭐ नक्षत्र: ${result.nakshatra.split(' ')[0]}\n📜 जन्म तिथि: ${result.birthPanchang.tithi}\n\nकृपया विस्तृत फलादेश व परामर्श हेतु उपलब्ध समय साझा करें। धन्यवाद!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
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
