import React, { useState, useMemo } from 'react';
import { KundliInput, KundliResult, Language } from '../types/astrology';
import { calculateVedicKundli } from '../utils/vedicCalculations';
import { INDIAN_CITIES_DATABASE, INDIAN_STATES } from '../data/indianCities';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { KundliChartVisualizer } from './KundliChartVisualizer';
import { KundliPrintDocument } from './KundliPrintDocument';
import { VerifiedBadge } from './VerifiedBadge';
import { 
  ScrollText, Sparkles, Printer, CheckCircle2, MessageCircle, 
  MapPin, Search, ChevronDown, Compass, Calendar, Clock,
  Check, Info, Sun, Moon, Flame, ShieldAlert, Award, ChevronRight,
  BookOpen, HeartHandshake, Eye, Globe, Loader2, Home, Navigation, Layers,
  X, FileText, Phone
} from 'lucide-react';
import { 
  searchOnlineIndianPlace, 
  ALL_INDIAN_STATES_AND_DISTRICTS 
} from '../data/villageSearchService';

interface KundliGeneratorProps {
  lang: Language;
  onAskAI: (context: string) => void;
  isDark?: boolean;
}

export const KundliGenerator: React.FC<KundliGeneratorProps> = ({ lang, onAskAI, isDark = false }) => {
  const [selectedState, setSelectedState] = useState<string>('सभी राज्य (All India)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [locationMode, setLocationMode] = useState<'cityList' | 'onlineVillage' | 'districtVillage' | 'customCoords'>('cityList');
  const [activeTab, setActiveTab] = useState<'panchang' | 'chart' | 'planets' | 'ashtakavarga' | 'dasha' | 'yogas' | 'predictions'>('panchang');
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);

  // Online village live search states
  const [onlineVillageQuery, setOnlineVillageQuery] = useState<string>('');
  const [onlineResults, setOnlineResults] = useState<typeof INDIAN_CITIES_DATABASE[0][]>([]);
  const [isSearchingOnline, setIsSearchingOnline] = useState<boolean>(false);
  const [onlineSearchedOnce, setOnlineSearchedOnce] = useState<boolean>(false);

  // District & Village Selector state
  const [pickerStateIndex, setPickerStateIndex] = useState<number>(0); // Default Gujarat
  const [pickerDistrictIndex, setPickerDistrictIndex] = useState<number>(1); // Default Mehsana
  const [customVillageName, setCustomVillageName] = useState<string>('');

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

  const handleOnlineVillageSearch = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : onlineVillageQuery).trim();
    if (!q || q.length < 2) return;
    setIsSearchingOnline(true);
    setOnlineSearchedOnce(true);
    try {
      const places = await searchOnlineIndianPlace(q);
      setOnlineResults(places);
    } catch {
      setOnlineResults([]);
    } finally {
      setIsSearchingOnline(false);
    }
  };

  const handleSelectDistrictVillage = () => {
    const stateObj = ALL_INDIAN_STATES_AND_DISTRICTS[pickerStateIndex] || ALL_INDIAN_STATES_AND_DISTRICTS[0];
    const distObj = stateObj.districts[pickerDistrictIndex] || stateObj.districts[0];
    const vName = customVillageName.trim() || distObj.nameHi;
    const fullCityName = `${vName} (${distObj.nameHi})`;

    setFormData(prev => ({
      ...prev,
      cityName: fullCityName,
      state: stateObj.state,
      latitude: distObj.lat,
      longitude: distObj.lon
    }));
    setLocationMode('cityList');
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
    <>
      <div id="kundli-screen-view" className="py-8 px-4 max-w-7xl mx-auto transition-colors duration-300 text-stone-900 print:hidden">
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

              {/* Birth Place / City & Village Selection (Pan India 600,000+ Villages) */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="block text-xs sm:text-sm font-bold text-amber-950">
                    {lang === 'hi' ? 'जन्म स्थान (भारत के सभी शहर व गाँव)' : 'જન્મ સ્થળ (ભારતના તમામ શહેરો અને ગામો)'}
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ अखिल भारतीय डेटाबेस + लाइव गाँव सर्च
                  </span>
                </div>

                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-amber-100/60 rounded-xl border border-amber-200/80 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setLocationMode('cityList')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                      locationMode === 'cityList'
                        ? 'bg-white text-[#CC5218] font-bold shadow-sm border border-amber-300'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-[#FF671F]" />
                    <span>प्रमुख शहर (400+)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationMode('onlineVillage')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                      locationMode === 'onlineVillage'
                        ? 'bg-white text-[#CC5218] font-bold shadow-sm border border-amber-300'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <Globe className="w-3 h-3 text-blue-600" />
                    <span>गाँव लाइव सर्च</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationMode('districtVillage')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                      locationMode === 'districtVillage'
                        ? 'bg-white text-[#CC5218] font-bold shadow-sm border border-amber-300'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <Home className="w-3 h-3 text-emerald-600" />
                    <span>जिला व गाँव</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationMode('customCoords')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1 ${
                      locationMode === 'customCoords'
                        ? 'bg-white text-[#CC5218] font-bold shadow-sm border border-amber-300'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <Compass className="w-3 h-3 text-amber-600" />
                    <span>अक्षांश/देशांतर</span>
                  </button>
                </div>

                {/* MODE 1: Static Cities & Towns (400+ entries) */}
                {locationMode === 'cityList' && (
                  <div className="space-y-2">
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

                      <div>
                        <span className="text-[11px] block mb-0.5 text-stone-600">
                          शहर या कस्बा खोजें:
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="उदा. Mehsana, Ahmedabad, Vadnagar, Kheralu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsCityDropdownOpen(true)}
                            className="w-full pl-7 pr-2.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 transition-all bg-[#FFFDF9] border-[#FF671F]/30 text-stone-900 focus:ring-[#FF671F]"
                          />
                          <Search className="w-3.5 h-3.5 absolute left-2 top-2.5 text-stone-400" />
                        </div>
                      </div>
                    </div>

                    {/* Quick Live Search Prompt if typed */}
                    {searchQuery.trim().length >= 2 && (
                      <div className="p-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 flex items-center justify-between text-xs">
                        <span className="text-amber-900 font-medium">
                          क्या आप <strong>'{searchQuery}'</strong> गाँव पूरे भारत में खोजना चाहते हैं?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setOnlineVillageQuery(searchQuery);
                            setLocationMode('onlineVillage');
                            handleOnlineVillageSearch(searchQuery);
                          }}
                          className="px-2.5 py-1 rounded-lg text-white font-semibold text-[11px] bg-[#FF671F] hover:bg-[#CC5218] transition-colors shrink-0 shadow-sm"
                        >
                          गाँव लाइव खोजें →
                        </button>
                      </div>
                    )}

                    {/* Dropdown Display Button */}
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
                            <span>{filteredCities.length} शहर व कस्बे उपलब्ध</span>
                            <span className="text-stone-400">अक्षांश/देशांतर सहित</span>
                          </div>

                          {filteredCities.length === 0 ? (
                            <div className="p-3 text-center text-xs space-y-2 text-stone-600">
                              <p>डेटाबेस में '{searchQuery}' नहीं मिला।</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setOnlineVillageQuery(searchQuery);
                                  setLocationMode('onlineVillage');
                                  handleOnlineVillageSearch(searchQuery);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#FF671F] hover:bg-[#CC5218]"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                <span>गाँव लाइव सर्च से तुरंत खोजें</span>
                              </button>
                            </div>
                          ) : (
                            filteredCities.map((c) => {
                              const isSelected = formData.cityName === c.name;
                              return (
                                <button
                                  key={`${c.name}-${c.state}-${c.lat}`}
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
                )}

                {/* MODE 2: Online Village Live Search (OpenStreetMap Geocoding for ANY village) */}
                {locationMode === 'onlineVillage' && (
                  <div className="p-3.5 rounded-2xl border space-y-3 bg-gradient-to-b from-blue-50/50 to-amber-50/30 border-blue-200">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>भारत के किसी भी गाँव को लाइव खोजें (Live Village Search)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          भारत के 6 लाख से अधिक गाँवों, तहसीलों व मजरों के सटीक भौगोलिक निर्देशांक खोजें।
                        </p>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="गाँव का नाम दर्ज करें (उदा. Balol, Gozaria, Kherva, Salasar...)"
                          value={onlineVillageQuery}
                          onChange={(e) => setOnlineVillageQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleOnlineVillageSearch();
                            }
                          }}
                          className="w-full pl-8 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 bg-white border-blue-300 text-stone-900 focus:ring-blue-500"
                        />
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-blue-500" />
                      </div>
                      <button
                        type="button"
                        disabled={isSearchingOnline || onlineVillageQuery.trim().length < 2}
                        onClick={() => handleOnlineVillageSearch()}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                      >
                        {isSearchingOnline ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>खोज रहे हैं...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-3.5 h-3.5" />
                            <span>खोजें</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Quick Suggestions Chips */}
                    <div className="flex flex-wrap items-center gap-1 text-[10px]">
                      <span className="text-stone-500 font-medium">त्वरित उदाहरण:</span>
                      {['Balol (बालोल)', 'Kherva (खेरवा)', 'Gojariya (गोझारिया)', 'Vadnagar', 'Dhamnod', 'Khatu', 'Salasar'].map((s) => {
                        const clean = s.split(' ')[0];
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setOnlineVillageQuery(clean);
                              handleOnlineVillageSearch(clean);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 hover:bg-blue-100 transition-colors"
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>

                    {/* Online Results Display */}
                    {onlineSearchedOnce && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-semibold text-stone-700 flex items-center justify-between">
                          <span>मिले परिणाम ({onlineResults.length}):</span>
                          {onlineResults.length > 0 && <span className="text-emerald-700 font-normal">क्लिक करके चुनें</span>}
                        </div>

                        {onlineResults.length === 0 && !isSearchingOnline ? (
                          <div className="p-3 text-center text-xs bg-white/80 rounded-xl border border-stone-200 text-stone-600">
                            '{onlineVillageQuery}' नाम से कोई गाँव नहीं मिला। कृपया स्पेलिंग जांचें या 'जिला व गाँव' विकल्प से जिला चुनें।
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                            {onlineResults.map((place, idx) => (
                              <button
                                key={`${place.name}-${idx}`}
                                type="button"
                                onClick={() => {
                                  handleCitySelect(place);
                                  setLocationMode('cityList');
                                }}
                                className="w-full text-left p-2.5 rounded-xl border bg-white hover:bg-blue-50 hover:border-blue-300 transition-all text-xs flex items-center justify-between group"
                              >
                                <div>
                                  <div className="font-bold text-stone-900 group-hover:text-blue-700 flex items-center gap-1.5">
                                    <Home className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                    <span>{place.name}</span>
                                  </div>
                                  <div className="text-[10px] text-stone-500 mt-0.5">
                                    {place.state} • {place.lat.toFixed(4)}°N, {place.lon.toFixed(4)}°E
                                  </div>
                                </div>
                                <span className="text-[11px] text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                                  चुनें →
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* MODE 3: District & Village Selection (Select State, District, and type any Village) */}
                {locationMode === 'districtVillage' && (
                  <div className="p-3.5 rounded-2xl border space-y-2.5 bg-gradient-to-b from-emerald-50/50 to-amber-50/30 border-emerald-200">
                    <div className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-emerald-600" />
                      <span>जिला व गाँव चयन (Select by State & District)</span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      अपना राज्य और जिला चुनें, फिर अपने गाँव का नाम दर्ज करें।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* State Selector */}
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                          राज्य (State):
                        </label>
                        <select
                          value={pickerStateIndex}
                          onChange={(e) => {
                            setPickerStateIndex(parseInt(e.target.value) || 0);
                            setPickerDistrictIndex(0);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl text-xs border bg-white border-emerald-300 text-stone-900 focus:ring-1 focus:ring-emerald-500"
                        >
                          {ALL_INDIAN_STATES_AND_DISTRICTS.map((st, idx) => (
                            <option key={st.state} value={idx}>{st.state}</option>
                          ))}
                        </select>
                      </div>

                      {/* District Selector */}
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                          जिला (District):
                        </label>
                        <select
                          value={pickerDistrictIndex}
                          onChange={(e) => setPickerDistrictIndex(parseInt(e.target.value) || 0)}
                          className="w-full px-2.5 py-1.5 rounded-xl text-xs border bg-white border-emerald-300 text-stone-900 focus:ring-1 focus:ring-emerald-500"
                        >
                          {(ALL_INDIAN_STATES_AND_DISTRICTS[pickerStateIndex]?.districts || []).map((dist, idx) => (
                            <option key={dist.name} value={idx}>{dist.nameHi} ({dist.name})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Village Name input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        गाँव / कस्बे का नाम दर्ज करें (Village Name):
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="उदा. बालोल, गोझारिया, खेरवा, रामपुर, देलवाड़ा..."
                          value={customVillageName}
                          onChange={(e) => setCustomVillageName(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl text-xs border bg-white border-emerald-300 text-stone-900 focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={handleSelectDistrictVillage}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shrink-0 shadow-sm"
                        >
                          ✓ यह गाँव सेट करें
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 4: Custom Coordinates */}
                {locationMode === 'customCoords' && (
                  <div className="p-3 rounded-2xl border space-y-2.5 bg-amber-50/50 border-amber-200">
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
                <div className="px-3 py-2 rounded-xl text-xs flex flex-wrap items-center justify-between gap-1.5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300/80 text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF671F] shrink-0" />
                    <span className="font-semibold">चुना गया स्थान:</span>
                    <span className="font-bold text-[#CC5218]">{formData.cityName}</span>
                    <span className="text-stone-500">({formData.state})</span>
                  </span>
                  <span className="text-[11px] text-stone-600 font-mono">
                    {formData.latitude?.toFixed(4)}°N, {formData.longitude?.toFixed(4)}°E (IST +5:30)
                  </span>
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

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPrintPreview(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all bg-amber-50 hover:bg-amber-100 text-[#991b1b] border-amber-300 shadow-xs cursor-pointer"
                    title="स्वस्तिक बॉर्डर सहित सम्पूर्ण 6-पृष्ठ A4 PDF प्रिंट प्रीव्यू देखें"
                  >
                    <Eye className="w-4 h-4 text-[#991b1b]" />
                    <span>प्रिंट प्रीव्यू (6 पृष्ठ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-[#991b1b] to-[#CC5218] text-white hover:brightness-110 shadow-sm cursor-pointer"
                    title="सम्पूर्ण 6-पृष्ठ A4 PDF प्रिंट या सेव करें"
                  >
                    <Printer className="w-4 h-4" />
                    <span>PDF प्रिंट (6 पृष्ठ)</span>
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
                    label: lang === 'en' ? '1. Kalnirnay Panchang' : lang === 'hi' ? '1. कालनिर्णय पंचांग' : '૧. કાલનિર્ણય પંચાંગ',
                    icon: Calendar,
                  },
                  {
                    id: 'chart',
                    label: lang === 'en' ? '2. Kundli Charts' : lang === 'hi' ? '2. कुंडली चक्र' : '૨. કુંડળી ચક્ર',
                    icon: Eye,
                  },
                  {
                    id: 'planets',
                    label: lang === 'en' ? '3. Planets & Ephemeris' : lang === 'hi' ? '3. ग्रह स्थिति व कारक' : '૩. ગ્રહ સ્થિતિ',
                    icon: Sun,
                  },
                  {
                    id: 'ashtakavarga',
                    label: lang === 'en' ? '4. Ashtakavarga' : lang === 'hi' ? '4. अष्टकवर्ग (337)' : '૪. અષ્ટકવર્ગ',
                    icon: Layers,
                  },
                  {
                    id: 'dasha',
                    label: lang === 'en' ? '5. Vimshottari Dasha' : lang === 'hi' ? '5. विंशोत्तरी दशा' : '૫. વિંશોત્તરી દશા',
                    icon: Clock,
                  },
                  {
                    id: 'yogas',
                    label: lang === 'en' ? '6. Yogas & Doshas' : lang === 'hi' ? '6. योग एवं दोष' : '૬. યોગ અને દોષ',
                    icon: Award,
                  },
                  {
                    id: 'predictions',
                    label: lang === 'en' ? '7. Predictions & Remedies' : lang === 'hi' ? '7. फलादेश व उपाय' : '૭. ફલાદેશ અને ઉપાય',
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

              {/* TAB 1: Complete Birth Panchang & Avakahada Chakra (कालनिर्णय पंचांग व वैदिक पंचांग) */}
              {activeTab === 'panchang' && (
                <div className="space-y-5">
                  {/* Dedicated Kalnirnay Panchang Standards Box */}
                  <div className="p-4 sm:p-5 rounded-2xl border-2 bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white border-amber-300 shadow-sm space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/90 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#CC5218] text-white text-[11px] font-bold tracking-wider shadow-xs uppercase">
                          कालनिर्णय पंचांग मानक (Kalnirnay Standard)
                        </span>
                        <span className="text-xs font-bold text-amber-950">
                          राष्ट्रीय दृक गणित व शालिवाहन शक संगत
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#CC5218] bg-amber-100/90 px-2.5 py-1 rounded-md border border-amber-300">
                        {result.birthPanchang.samvatShaka}
                      </span>
                    </div>

                    {/* Sunrise Tithi (Calendar Box) vs Birth Tithi (Exact Kundli) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/95 border border-amber-300 space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-600 font-bold text-[11px]">कालनिर्णय दैनिक उदय तिथि (Sunrise Tithi)</span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                            कैलेंडर मुख्य बॉक्स
                          </span>
                        </div>
                        <div className="font-bold text-[#CC5218] text-sm">
                          {result.birthPanchang.sunriseTithi || result.birthPanchang.tithi}
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight">
                          कालनिर्णय कैलेंडर में तारीख के मुख्य चौकोर बॉक्स में यही सूर्योदय कालीन तिथि छपी होती है।
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/95 border border-emerald-300 space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-600 font-bold text-[11px]">जन्म समय की वास्तविक तिथि (Birth Tithi)</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                            कुंडली स्पष्ट
                          </span>
                        </div>
                        <div className="font-bold text-emerald-800 text-sm">
                          {result.birthPanchang.birthTithi || result.birthPanchang.tithi}
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight">
                          तिथि समाप्ति काल: <strong>{result.birthPanchang.tithiEnding}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Month Comparison (Amanta vs Purnimanta) & Day of Week */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                        <span className="text-stone-500 font-bold block text-[10px]">अमान्त मास (कालनिर्णय मुख्य)</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.amantaMonth || result.birthPanchang.hinduMonth}</strong>
                        <span className="text-[10px] text-stone-500">महाराष्ट्र, गुजरात व दक्षिण भारत मानक</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                        <span className="text-stone-500 font-bold block text-[10px]">पूर्णिमान्त मास (उत्तर भारत)</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.purnimantaMonth || result.birthPanchang.hinduMonth}</strong>
                        <span className="text-[10px] text-stone-500">उ.प्र., बिहार, राज., म.प्र., दिल्ली</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                        <span className="text-stone-500 font-bold block text-[10px]">कालनिर्णय पंचांग वार (अहोरात्र)</span>
                        <strong className="text-[#CC5218] text-xs block">{result.birthPanchang.kalnirnayDay || result.birthPanchang.dayOfWeek}</strong>
                        <span className="text-[10px] text-stone-500">वार स्वामी: {result.birthPanchang.dayLord}</span>
                      </div>
                    </div>

                    {/* Before Sunrise Alert if birth is between 00:00 midnight and sunrise */}
                    {result.birthPanchang.isBeforeSunrise && (
                      <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-400 text-xs text-amber-950 flex items-start gap-2">
                        <span className="text-base leading-none">⚠️</span>
                        <div>
                          <strong className="block text-[11px] text-amber-950">सूर्योदय पूर्व जन्म विशेष सूचना (कालनिर्णय अहोरात्र नियम):</strong>
                          <p className="text-[11px] leading-relaxed text-stone-700">
                            जन्म सूर्योदय ({result.birthPanchang.sunrise}) से पूर्व रात्रि (मध्यरात्रि पश्चात) हुआ है। कालनिर्णय पंचांग में नया दिन सूर्योदय से माना जाता है, अतः पंचांग अनुसार वार <strong>{result.birthPanchang.kalnirnayDay}</strong> मान्य है।
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Quick Nakshatra, Paya & Samvatsara highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                      <div className="p-2 rounded-lg bg-white/90 border border-amber-200">
                        <span className="text-[10px] text-stone-500 block font-semibold">जन्म नक्षत्र व समाप्ति</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.nakshatra}</strong>
                        <span className="text-[10px] text-indigo-700 font-medium">{result.birthPanchang.nakshatraEnding}</span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/90 border border-amber-200">
                        <span className="text-[10px] text-stone-500 block font-semibold">नक्षत्र नामाक्षर व चरण</span>
                        <strong className="text-[#CC5218] text-xs block">'{result.birthPanchang.nakshatraAkshar}' (चरण {result.birthPanchang.nakshatraCharan})</strong>
                        <span className="text-[10px] text-stone-600">स्वामी: {result.birthPanchang.nakshatraLord}</span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/90 border border-amber-200">
                        <span className="text-[10px] text-stone-500 block font-semibold">जन्म पाया (Paya)</span>
                        <strong className="text-emerald-800 text-xs block">{result.birthPanchang.paya?.split('-')[0] || 'रजत पाया'}</strong>
                        <span className="text-[10px] text-stone-500">चंद्र स्थिति अनुसार</span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/90 border border-amber-200">
                        <span className="text-[10px] text-stone-500 block font-semibold">संवत्सर (Jovian Year)</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.samvatsaraName || 'आनंद'}</strong>
                        <span className="text-[10px] text-stone-500">६० संवत्सर चक्र</span>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Birth Vedic Details Grid */}
                  <div className="p-4 rounded-2xl border bg-[#FFFDF9] border-[#FF671F]/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#FF671F]/20 pb-2">
                      <h4 className="font-yatra text-base text-[#CC5218] flex items-center gap-1.5 font-bold">
                        <Compass className="w-4 h-4 text-[#FF671F]" />
                        <span>विस्तृत जन्म पंचांग विवरण (Full Panchang Details)</span>
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
                        <span className="text-stone-500 font-bold block text-[10px]">तिथि (उदय व जन्मकालीन)</span>
                        <strong className="text-[#CC5218] text-xs block">{result.birthPanchang.tithi}</strong>
                        <span className="text-[10px] text-stone-600">उदय तिथि: {result.birthPanchang.sunriseTithi?.split(' ')[1] || ''}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">नक्षत्र व चरण</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.nakshatra} (चरण {result.birthPanchang.nakshatraCharan})</strong>
                        <span className="text-[10px] text-stone-600">{result.birthPanchang.nakshatraEnding}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">नित्य योग (Yoga)</span>
                        <strong className="text-emerald-800 text-xs block">{result.birthPanchang.yoga}</strong>
                        <span className="text-[10px] text-stone-600">{result.birthPanchang.yogaEnding || result.birthPanchang.yogaDescription.slice(0, 24)}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">करण व वार</span>
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

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">लाहिड़ी अयनांश मान (Lahiri)</span>
                        <strong className="text-indigo-900 font-mono text-xs block">
                          {result.birthPanchang.lahiriAyanamshaDms || result.birthPanchang.ayanamsha}
                        </strong>
                        <span className="text-[10px] text-stone-500">Drik Ganit / NC Lahiri</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">दिनमान एवं रात्रिमान</span>
                        <strong className="text-stone-900 text-xs block">{result.birthPanchang.dinmaan || '३० घटी'}</strong>
                        <span className="text-[10px] text-stone-600">{result.birthPanchang.raatrimaan || '३० घटी'}</span>
                      </div>

                      <div className="p-2.5 rounded-xl border bg-white border-[#FF671F]/20">
                        <span className="text-stone-500 font-bold block text-[10px]">जन्म पाया (Paya)</span>
                        <strong className="text-emerald-800 text-xs block">{result.birthPanchang.paya?.split(' ')[0] || 'रजत'}</strong>
                        <span className="text-[10px] text-stone-600 truncate block">{result.birthPanchang.paya?.slice(0, 26)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* Birth Choghadiya & Muhurat Box (Hindu Calendar App Standard) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Choghadiya Card */}
                    <div className="p-3.5 rounded-2xl border bg-amber-50/60 border-amber-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                          <Sun className="w-3.5 h-3.5 text-amber-600" />
                          <span>जन्म समय चौघड़िया (Birth Choghadiya)</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          result.birthPanchang.birthChoghadiya?.type === 'अमृत' || result.birthPanchang.birthChoghadiya?.type === 'शुभ' || result.birthPanchang.birthChoghadiya?.type === 'लाभ'
                            ? 'bg-emerald-100 text-emerald-800'
                            : result.birthPanchang.birthChoghadiya?.type === 'चर'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {result.birthPanchang.birthChoghadiya?.type || 'शुभ'}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-amber-200 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-[#CC5218] text-sm">
                            {result.birthPanchang.birthChoghadiya?.name || 'शुभ चौघड़िया'}
                          </div>
                          {result.birthPanchang.birthChoghadiya?.timeWindow && (
                            <span className="text-[10px] font-mono text-stone-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              समय: {result.birthPanchang.birthChoghadiya.timeWindow}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-600 mt-1">
                          प्रभाव: <strong>{result.birthPanchang.birthChoghadiya?.effect || 'अति शुभ फलदायी'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Muhurat & Rahu Kaal Card */}
                    <div className="p-3.5 rounded-2xl border bg-orange-50/60 border-orange-300 space-y-2">
                      <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#CC5218]" />
                        <span>शुभ-अशुभ मुहूर्त मान (Muhurat)</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-xl bg-white border border-orange-200">
                          <span className="text-emerald-700 font-bold block">अभिजीत मुहूर्त:</span>
                          <span className="font-semibold text-stone-800">
                            {result.birthPanchang.muhurat?.abhijit || '11:48 - 12:40'}
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-orange-200">
                          <span className="text-rose-700 font-bold block">राहु काल (अशुभ):</span>
                          <span className="font-semibold text-stone-800">
                            {result.birthPanchang.muhurat?.rahuKaal || '14:00 - 15:30'}
                          </span>
                        </div>
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

              {/* TAB 2: Interactive Chart Visualizer (D1, Chandra, Chalit, D9) */}
              {activeTab === 'chart' && (
                <div className="space-y-4">
                  <KundliChartVisualizer
                    planets={result.planets}
                    navamshaPlanets={result.navamshaPlanets}
                    ascendantRashi={result.ascendantRashi}
                    moonRashi={result.moonRashi}
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
                          <th className="p-2.5 border border-[#FF671F]/20">भोगांश (DMS)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">लग्न/चलित भाव</th>
                          <th className="p-2.5 border border-[#FF671F]/20">नक्षत्र (चरण)</th>
                          <th className="p-2.5 border border-[#FF671F]/20">जैमिनी कारक</th>
                          <th className="p-2.5 border border-[#FF671F]/20">दैनिक गति</th>
                          <th className="p-2.5 border border-[#FF671F]/20">अवस्था</th>
                          <th className="p-2.5 border border-[#FF671F]/20">स्थिति (Dignity)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.planets.map((p) => (
                          <tr key={p.planet} className="hover:bg-[#FFFDF9] transition-colors">
                            <td className="p-2.5 border border-[#FF671F]/20 font-bold text-stone-950">
                              <div className="flex items-center gap-1.5">
                                <span>{p.planet}</span>
                                {p.isRetrograde && (
                                  <span className="px-1 py-0.2 rounded text-[9px] bg-rose-100 text-rose-800 font-bold border border-rose-300">वक्र</span>
                                )}
                                {p.isCombust && (
                                  <span className="px-1 py-0.2 rounded text-[9px] bg-amber-100 text-amber-900 font-bold border border-amber-300">अस्त</span>
                                )}
                              </div>
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-medium">{p.rashi}</td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-mono text-[#CC5218] font-semibold">
                              {p.dms || `${p.degree}°`}
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-bold text-stone-900">
                              <span>{p.house} भाव</span>
                              {p.chalitHouse && p.chalitHouse !== p.house && (
                                <span className="ml-1 text-[10px] text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">
                                  चलित: {p.chalitHouse}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 text-[11px]">
                              {p.nakshatra} ({p.nakshatraCharan})
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 text-[11px] font-semibold text-[#CC5218]">
                              {p.karaka || '-'}
                            </td>
                            <td className="p-2.5 border border-[#FF671F]/20 font-mono text-[10px] text-stone-600">
                              {p.speed ? `${p.speed}/दिन` : '-'}
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: Ashtakavarga & Jaimini Karakas (Hindu Calendar Standard) */}
              {activeTab === 'ashtakavarga' && (
                <div className="space-y-6">
                  {/* Sarvashtakavarga 337 Points */}
                  <div className="p-4 rounded-2xl border bg-white border-[#FF671F]/30 space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FF671F]/20 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#FF671F]" />
                        <div>
                          <h4 className="font-yatra text-base text-[#CC5218] font-bold">
                            सर्वाष्टकवर्ग चक्र (Sarvashtakavarga - 337 Bindus)
                          </h4>
                          <p className="text-[11px] text-stone-600">
                            पाराशरी ज्योतिष अनुसार 12 राशियों का समग्र शुभत्व बिंदु मान (मानक योग: 337)
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                        कुल बिंदु: 337
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
                      {(result.sarvashtakavarga || []).map((item, idx) => {
                        const isHigh = item.score >= 30;
                        const isGood = item.score >= 28 && item.score < 30;
                        const isAverage = item.score >= 25 && item.score < 28;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border transition-all ${
                              isHigh
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : isGood
                                ? 'bg-amber-50/70 border-amber-300'
                                : isAverage
                                ? 'bg-stone-50 border-stone-200'
                                : 'bg-rose-50/60 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900">
                                {idx + 1}. {item.rashiHi} ({item.rashi})
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                isHigh
                                  ? 'bg-emerald-600 text-white'
                                  : isGood
                                  ? 'bg-amber-600 text-white'
                                  : isAverage
                                  ? 'bg-stone-600 text-white'
                                  : 'bg-rose-600 text-white'
                              }`}>
                                {item.score}
                              </span>
                            </div>
                            <div className="text-[11px] font-semibold text-stone-600 mt-1.5 flex items-center justify-between">
                              <span>स्थिति:</span>
                              <span className={
                                isHigh ? 'text-emerald-800' : isGood ? 'text-amber-800' : isAverage ? 'text-stone-700' : 'text-rose-800'
                              }>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 text-[11px] text-stone-600 border border-stone-200 space-y-1">
                      <strong>अष्टकवर्ग विश्लेषण नियम:</strong>
                      <p>
                        • 28 बिंदु को औसत (साम्यावस्था) माना जाता है। 28 से अधिक बिंदु वाली राशि में गोचरस्थ ग्रह अत्यंत शुभ व अनुकूल परिणाम देते हैं। 30+ बिंदु वाले भाव/राशि भाग्योदय व कार्य सिद्धि के मुख्य कारक होते हैं।
                      </p>
                    </div>
                  </div>

                  {/* Jaimini 7 Chara Karakas Table */}
                  <div className="p-4 rounded-2xl border bg-white border-[#FF671F]/30 space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#FF671F]/20 pb-2">
                      <Award className="w-5 h-5 text-[#FF671F]" />
                      <div>
                        <h4 className="font-yatra text-base text-[#CC5218] font-bold">
                          जैमिनी चर कारक तालिका (Jaimini 7 Chara Karakas)
                        </h4>
                        <p className="text-[11px] text-stone-600">
                          महर्षि जैमिनी के सूत्र अनुसार सर्वाधिक भोगांश से न्यूनतम भोगांश तक 7 चर कारक
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border rounded-xl overflow-hidden border-stone-200">
                        <thead>
                          <tr className="bg-[#FFF5F0] text-[#CC5218] font-bold">
                            <th className="p-2 border border-[#FF671F]/20">कारक (Karaka)</th>
                            <th className="p-2 border border-[#FF671F]/20">कारक ग्रह (Planet)</th>
                            <th className="p-2 border border-[#FF671F]/20">भोगांश (DMS / Degree)</th>
                            <th className="p-2 border border-[#FF671F]/20">ज्योतिषीय प्रतिनिधित्व (Signification)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(result.jaiminiKarakas || []).map((k, idx) => {
                            const significanceMap: Record<string, string> = {
                              'Atmakaraka (AK)': 'आत्मा, आत्मबल, स्वास्थ्य, मूल स्वभाव एवं जीवन का सर्वोच्च उद्देश्य',
                              'Amatyakaraka (AmK)': 'आजीविका, कर्म, वित्त, उच्च पद, बुद्धिमत्ता व सामाजिक प्रतिष्ठा',
                              'Bhratrikaraka (BK)': 'सहोदर (भाई-बहन), पराक्रम, उत्साह व गुरुजन संबंध',
                              'Matrikaraka (MK)': 'माता, मातृसुख, वाहन, भूमि, भवन, गृह सुख व मन की शांति',
                              'Putrakaraka (PK)': 'संतान सुख, उच्च शिक्षा, विद्या, बुद्धि, मंत्र सिद्धि व रचनात्मकता',
                              'Gnatikaraka (GK)': 'शत्रु, रोग, ऋण, प्रतिस्पर्धा, संघर्ष व जीवन की चुनौतियां',
                              'Darakaraka (DK)': 'जीवनसाथी (पति/पत्नी), वैवाहिक सुख, व्यापारिक साझेदार व सहयोग'
                            };
                            return (
                              <tr key={idx} className="hover:bg-[#FFFDF9] transition-colors">
                                <td className="p-2 border border-stone-200 font-bold text-stone-900">
                                  <span>{k.karakaHi}</span>
                                  <span className="text-[10px] text-stone-500 font-normal ml-1 block">{k.karaka}</span>
                                </td>
                                <td className="p-2 border border-stone-200 font-bold text-[#CC5218]">
                                  {k.planetHi} ({k.planet})
                                </td>
                                <td className="p-2 border border-stone-200 font-mono text-[11px]">
                                  <strong>{k.dms}</strong> ({k.degree.toFixed(2)}°)
                                </td>
                                <td className="p-2 border border-stone-200 text-stone-700 text-[11px]">
                                  {significanceMap[k.karaka] || 'ज्योतिषीय चर कारकत्व'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Vimshottari Mahadasha Timeline */}
              {activeTab === 'dasha' && (
                <div className="space-y-4">
                  {/* Birth Dasha Balance Banner (Drik Hindu Calendar Standard) */}
                  {result.birthDashaBalance && (
                    <div className="p-3.5 rounded-2xl border bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#CC5218]" />
                        <div>
                          <span className="text-[11px] font-bold text-stone-600 block">
                            जन्म के समय नक्षत्र चरणानुसार दशा शेष (Birth Dasha Balance):
                          </span>
                          <strong className="text-sm text-[#CC5218]">
                            {result.birthDashaBalance}
                          </strong>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-stone-700 font-semibold">
                        जन्म नक्षत्र: {result.nakshatra} (चरण {result.nakshatraCharan})
                      </span>
                    </div>
                  )}

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

                  {/* ========================================================================= */}
                  {/* भवानी ज्योतिष - आकर्षक शास्त्रोक्त प्रमाण-पत्र एवं परामर्श कार्ड */}
                  {/* ========================================================================= */}
                  <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FFF3E0] shadow-md space-y-3 relative overflow-hidden">
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-2 left-2.5 text-xs text-[#991b1b] font-bold select-none">卐</div>
                    <div className="absolute top-2 right-2.5 text-xs text-[#991b1b] font-bold select-none">卐</div>

                    {/* Sacred Header */}
                    <div className="text-center border-b border-amber-300 pb-2">
                      <div className="text-[10px] text-[#991b1b] font-bold tracking-widest flex items-center justify-center gap-1.5 sm:gap-2">
                        <span>卐</span>
                        <span>॥ श्री गणेशाय नमः ॥</span>
                        <span>•</span>
                        <span>॥ ॐ श्री भवान्यै नमः ॥</span>
                        <span>•</span>
                        <span>॥ ॐ कुलदेवतायै नमः ॥</span>
                        <span>卐</span>
                      </div>
                      <h4 className="font-yatra text-lg sm:text-xl text-[#991b1b] font-bold tracking-wide mt-1 drop-shadow-xs flex items-center justify-center gap-1.5 flex-wrap">
                        <span>॥ श्री भवानी ज्योतिष केंद्र ॥ (Bhawani Jyotish)</span>
                        <VerifiedBadge size="sm" tooltipText="सत्यापित आधिकारिक संस्थान" />
                      </h4>
                      <p className="text-[11px] font-bold text-[#B45309] flex items-center justify-center gap-1.5 flex-wrap">
                        <span>वैदिक जन्म पत्रिका, हस्तरेखा, वास्तु शास्त्र एवं नवग्रह दोष निवारण</span>
                        <span>•</span>
                        <span className="font-mono text-[#991b1b] bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 font-bold">
                          पंजी. सं.: {ASTROLOGER_INFO.registrationNo}
                        </span>
                      </p>
                    </div>

                    {/* Astrologer Info, Experience, Mobile & Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      
                      {/* 1. Astrologer & Experience */}
                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-300 space-y-1">
                        <span className="text-[10px] text-stone-500 font-bold block">मुख्य ज्योतिषाचार्य:</span>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-sm text-[#991b1b] font-yatra tracking-wide">
                            {ASTROLOGER_INFO.name}
                          </strong>
                          <VerifiedBadge size="xs" tooltipText="सत्यापित मुख्य ज्योतिषाचार्य" />
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-bold text-[11px] mt-1 border border-amber-300">
                          <span>⭐</span>
                          <span>अनुभव: {ASTROLOGER_INFO.experience}</span>
                          <VerifiedBadge size="xs" tooltipText="सत्यापित वैदिक अनुभव" />
                        </div>
                        <p className="text-[10px] text-stone-600 mt-1">
                          ३५+ वर्षों की अनवरत वैदिक साधना एवं १५,०००+ संतुष्ट परिवारों का प्रामाणिक मार्गदर्शन।
                        </p>
                      </div>

                      {/* 2. Mobile No. & Timings */}
                      <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200 space-y-1">
                        <span className="text-[10px] text-stone-500 font-bold block">संपर्क सूत्र (Mobile / WhatsApp):</span>
                        <a 
                          href={`tel:${ASTROLOGER_INFO.phonePrimary.replace(/[^0-9+]/g, '')}`}
                          className="text-sm font-bold text-[#CC5218] font-mono flex items-center gap-1.5 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{ASTROLOGER_INFO.phonePrimary}</span>
                        </a>
                        <div className="text-[10px] text-stone-600 mt-1">
                          समय: प्रातः 8:00 बजे से रात्रि 8:00 बजे तक
                        </div>
                        <div className="text-[10px] text-stone-500">
                          ई-मेल: {ASTROLOGER_INFO.email}
                        </div>
                      </div>

                      {/* 3. Address & Seal */}
                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-300 space-y-1">
                        <span className="text-[10px] text-stone-500 font-bold block">कार्यालय पता (Office Address):</span>
                        <div className="text-xs text-stone-900 font-bold flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#CC5218] shrink-0 mt-0.5" />
                          <span>{ASTROLOGER_INFO.address}</span>
                        </div>
                        <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                          ✓ प्रत्यक्ष व ऑनलाइन दोनों माध्यमों से परामर्श उपलब्ध
                        </div>
                      </div>

                    </div>

                    {/* Direct Contact Buttons inside Card */}
                    <div className="pt-2 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-stone-700 italic">
                        ॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके । शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते ॥
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${ASTROLOGER_INFO.phonePrimary.replace(/[^0-9+]/g, '')}`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>कॉल करें</span>
                        </a>
                        <a
                          href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `नमस्ते पंडित जी 🙏 मुझे अपनी कुंडली के फलादेश व उपायों पर व्यक्तिगत परामर्श लेना है।\n\n👤 नाम: ${formData.name}\n📅 जन्म तिथि: ${formData.day}/${formData.month}/${formData.year}\n📍 स्थान: ${formData.cityName}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>व्हाट्सएप</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action row to consult or ask AI */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onAskAI(`मेरी कुंडली लग्न ${result.ascendantRashi}, चंद्र राशि ${result.moonRashi}, नक्षत्र ${result.nakshatra} (चरण ${result.nakshatraCharan}) एवं जन्म तिथि ${result.birthPanchang.tithi} है। वर्तमान में ${result.currentDasha} महादशा चल रही है। कृपया मुझे करियर व जीवन के लिए मार्गदर्शन दें।`)}
                  className="flex-1 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 bg-gradient-to-r from-[#D9531E] via-[#FF671F] to-[#CC5218] hover:from-[#B84214] hover:to-[#D9531E] text-white shadow-amber-900/20"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{lang === 'hi' ? 'इस सटीक कुंडली पर AI ज्योतिषी से पूछें' : 'આ કુંડળી પર પ્રશ્ન પૂછો'}</span>
                </button>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `नमस्ते पंडित जी 🙏 मुझे अपनी कुंडली दिखानी है और व्यक्तिगत परामर्श लेना है। कृपया अपॉइंटमेंट का समय साझा करें ✨\n\n👤 नाम: ${formData.name}\n📅 जन्म तिथि: ${formData.day}/${formData.month}/${formData.year}\n📍 जन्म स्थान: ${formData.cityName}\n✨ लग्न: ${result.ascendantRashi.split(' ')[0]}\n🌙 चंद्र राशि: ${result.moonRashi.split(' ')[0]}\n⭐ नक्षत्र: ${result.nakshatra.split(' ')[0]}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर अपॉइंटमेंट लें' : 'પંડિતજી સાથે વાત કરો'}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Dedicated Print Patrika when modal is closed - hidden on screen, printed via window.print() */}
    {result && !showPrintPreview && (
      <div id="kundli-print-container" className="hidden print:block">
        <KundliPrintDocument
          result={result}
          input={formData}
          lang={lang}
        />
      </div>
    )}

    {/* Screen Print Preview Modal with full Swastik border & alignment */}
    {showPrintPreview && result && (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start p-2 sm:p-4 print:p-0 print:bg-transparent print:static print:overflow-visible print:block">
        <div className="modal-print-toolbar sticky top-2 z-20 w-full max-w-5xl bg-gradient-to-r from-[#631422] via-[#852E10] to-[#631422] text-white p-3 sm:p-4 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-3 border border-amber-400/40 mb-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-900 font-bold flex items-center justify-center text-xl shadow-md">
              卐
            </div>
            <div>
              <h3 className="font-yatra text-base sm:text-lg text-amber-200 leading-tight flex items-center gap-2 flex-wrap">
                <span>शास्त्रोक्त वैदिक जन्म पत्रिका - सम्पूर्ण ६ पृष्ठ A4 प्रिंट प्रीव्यू</span>
                <span className="text-xs font-mono font-bold text-amber-200 bg-black/40 px-2 py-0.5 rounded border border-amber-400/40">
                  पंजी. {ASTROLOGER_INFO.registrationNo}
                </span>
              </h3>
              <p className="text-[11px] text-amber-100/90 flex items-center gap-1.5 flex-wrap mt-0.5">
                <span>A4 पृष्ठ १ से ६</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-amber-200 font-bold">
                  <span>भवानी ज्योतिष केंद्र</span>
                  <VerifiedBadge size="xs" tooltipText="सत्यापित संस्थान" />
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-amber-200 font-bold">
                  <span>{ASTROLOGER_INFO.name}</span>
                  <VerifiedBadge size="xs" tooltipText="सत्यापित मुख्य ज्योतिषाचार्य" />
                </span>
                <span>•</span>
                <span>जातक: {formData.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.print();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 hover:brightness-110 shadow-lg cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-950" />
              <span>प्रिंट / PDF सेव करें</span>
            </button>
            <button
              type="button"
              onClick={() => setShowPrintPreview(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Container with A4 styling */}
        <div id="kundli-print-container" className="w-full max-w-5xl bg-stone-300/80 p-2 sm:p-6 rounded-2xl shadow-inner overflow-x-auto flex flex-col items-center print:bg-transparent print:p-0 print:shadow-none print:max-w-none print:block">
          <KundliPrintDocument
            result={result}
            input={formData}
            lang={lang}
          />
        </div>
      </div>
    )}
  </>
);
};
