import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Search, Crosshair, Loader2, X, Globe, 
  ChevronDown, Check, ExternalLink, Navigation, Sparkles
} from 'lucide-react';
import { 
  searchPlacesLikeGoogleMaps, 
  reverseGeocodeGPS, 
  MapPlaceResult,
  ALL_INDIAN_STATES_AND_DISTRICTS 
} from '../data/villageSearchService';
import { INDIAN_CITIES_DATABASE } from '../data/indianCities';

interface GoogleMapsLocationPickerProps {
  cityName: string;
  state: string;
  latitude: number;
  longitude: number;
  onChange: (data: { cityName: string; state: string; latitude: number; longitude: number }) => void;
  lang?: 'hi' | 'gu' | 'en';
}

// Popular quick selection cities
const POPULAR_QUICK_CITIES = [
  { name: 'मेहसाणा', en: 'Mehsana', state: 'गुजरात', lat: 23.5880, lon: 72.3693 },
  { name: 'अहमदाबाद', en: 'Ahmedabad', state: 'गुजरात', lat: 23.0225, lon: 72.5714 },
  { name: 'गांधीनगर', en: 'Gandhinagar', state: 'गुजरात', lat: 23.2156, lon: 72.6369 },
  { name: 'पाटन', en: 'Patan', state: 'गुजरात', lat: 23.8493, lon: 72.1266 },
  { name: 'विसनगर', en: 'Visnagar', state: 'गुजरात', lat: 23.6961, lon: 72.5511 },
  { name: 'ऊंझा', en: 'Unjha', state: 'गुजरात', lat: 23.8041, lon: 72.3941 },
  { name: 'सूरत', en: 'Surat', state: 'गुजरात', lat: 21.1702, lon: 72.8311 },
  { name: 'मुंबई', en: 'Mumbai', state: 'महाराष्ट्र', lat: 19.0760, lon: 72.8777 },
  { name: 'दिल्ली', en: 'Delhi', state: 'दिल्ली', lat: 28.6139, lon: 77.2090 },
];

export const GoogleMapsLocationPicker: React.FC<GoogleMapsLocationPickerProps> = ({
  cityName,
  state,
  latitude,
  longitude,
  onChange,
  lang = 'hi'
}) => {
  const [query, setQuery] = useState<string>('');
  const [predictions, setPredictions] = useState<MapPlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLocatingGPS, setIsLocatingGPS] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [showMapEmbed, setShowMapEmbed] = useState<boolean>(false);
  const [showDistrictBrowser, setShowDistrictBrowser] = useState<boolean>(false);

  // District browser state
  const [browserStateIdx, setBrowserStateIdx] = useState<number>(0);
  const [browserDistrictIdx, setBrowserDistrictIdx] = useState<number>(1);
  const [customVillageText, setCustomVillageText] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<any>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search like Google Places Autocomplete
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setGpsError(null);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!val.trim() || val.trim().length < 2) {
      setPredictions([]);
      setIsDropdownOpen(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setIsDropdownOpen(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchPlacesLikeGoogleMaps(val);
        setPredictions(results);
      } catch (err) {
        console.error("Autocomplete search error:", err);
        setPredictions([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);
  };

  // Select place from autocomplete
  const handleSelectPlace = (place: MapPlaceResult) => {
    onChange({
      cityName: place.displayName,
      state: place.state,
      latitude: place.lat,
      longitude: place.lon
    });
    setQuery('');
    setPredictions([]);
    setIsDropdownOpen(false);
    setGpsError(null);
  };

  // Quick select preset city
  const handleSelectQuickCity = (city: typeof POPULAR_QUICK_CITIES[0]) => {
    onChange({
      cityName: `${city.name} (${city.en})`,
      state: city.state,
      latitude: city.lat,
      longitude: city.lon
    });
    setQuery('');
    setIsDropdownOpen(false);
  };

  // GPS Current Location detection
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsError(lang === 'hi' ? 'आपके डिवाइस में GPS उपलब्ध नहीं है' : 'GPS not available on this device');
      return;
    }

    setIsLocatingGPS(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(4));
        const lon = parseFloat(pos.coords.longitude.toFixed(4));

        try {
          const resolved = await reverseGeocodeGPS(lat, lon);
          if (resolved) {
            onChange({
              cityName: resolved.displayName,
              state: resolved.state,
              latitude: lat,
              longitude: lon
            });
          } else {
            onChange({
              cityName: `वर्तमान GPS स्थिति (${lat}°, ${lon}°)`,
              state: 'गुजरात',
              latitude: lat,
              longitude: lon
            });
          }
        } catch {
          onChange({
            cityName: `GPS स्थिति (${lat}°, ${lon}°)`,
            state: 'गुजरात',
            latitude: lat,
            longitude: lon
          });
        } finally {
          setIsLocatingGPS(false);
          setIsDropdownOpen(false);
        }
      },
      (err) => {
        setIsLocatingGPS(false);
        console.warn("Geolocation error:", err);
        let msg = 'लोकेशन प्राप्त नहीं हो सकी। कृपया लोकेशन अनुमति (Permission) दें या ऊपर सर्च करें।';
        if (err.code === 1) {
          msg = 'लोकेशन अनुमति अस्वीकृत है। कृपया ब्राउज़र सेटिंग्स में लोकेशन ऑन करें।';
        }
        setGpsError(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Apply district & village picker
  const handleApplyDistrictVillage = () => {
    const stateObj = ALL_INDIAN_STATES_AND_DISTRICTS[browserStateIdx] || ALL_INDIAN_STATES_AND_DISTRICTS[0];
    const distObj = stateObj.districts[browserDistrictIdx] || stateObj.districts[0];
    const vName = customVillageText.trim() || distObj.nameHi;
    const fullCity = `${vName} (${distObj.nameHi})`;

    onChange({
      cityName: fullCity,
      state: stateObj.state,
      latitude: distObj.lat,
      longitude: distObj.lon
    });
    setShowDistrictBrowser(false);
  };

  // Place type tag in Hindi/English
  const renderPlaceTypeBadge = (type?: string) => {
    switch (type) {
      case 'village':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">गाँव (Village)</span>;
      case 'town':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">कस्बा (Town)</span>;
      case 'city':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900">शहर (City)</span>;
      case 'district':
      case 'county':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-800">जिला (District)</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700">स्थान</span>;
    }
  };

  return (
    <div className="space-y-2.5 w-full max-w-full" ref={containerRef}>
      {/* Header Label with Google Maps style branding */}
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <label className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#EA4335]/10 flex items-center justify-center text-[#EA4335]">
            <MapPin className="w-3.5 h-3.5 fill-[#EA4335]" />
          </div>
          <span>
            {lang === 'hi' ? 'जन्म स्थान (सर्च)' : 'જન્મ સ્થળ (શોધ)'}
          </span>
        </label>

        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>GPS अक्षांश/देशांतर</span>
        </span>
      </div>

      {/* Google Maps Style Autocomplete Search Bar */}
      <div className="relative">
        <div className="relative flex items-center bg-white rounded-xl border border-amber-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#FF671F] focus-within:border-transparent">
          {/* Google Maps Red Pin */}
          <div className="pl-3 pr-2 text-[#EA4335] flex items-center justify-center shrink-0">
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-[#FF671F] animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-stone-400" />
            )}
          </div>

          {/* Autocomplete Input Box */}
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => {
              if (predictions.length > 0) setIsDropdownOpen(true);
            }}
            placeholder={lang === 'hi' 
              ? "गाँव, कस्बा, तहसील, शहर खोजें (उदा. खेरालू, विसनगर, Mehsana)..." 
              : "ગામ, કસબો, તાલુકો, શહેર શોધો (દા.ત. ખેરાલુ, વિસનગર, Mehsana)..."}
            className="w-full py-2.5 pr-20 text-xs sm:text-sm bg-transparent border-none text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />

          {/* Action buttons inside input */}
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setPredictions([]);
                  setIsDropdownOpen(false);
                }}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
                title="हटाएं"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* GPS Current Location Button */}
            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={isLocatingGPS}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors disabled:opacity-50 shrink-0"
              title="मेरी वर्तमान GPS लोकेशन चुनें"
            >
              {isLocatingGPS ? (
                <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
              ) : (
                <Crosshair className="w-3 h-3 text-blue-600" />
              )}
              <span className="hidden sm:inline">GPS</span>
            </button>
          </div>
        </div>

        {/* GPS Error Alert */}
        {gpsError && (
          <div className="mt-1.5 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center justify-between">
            <span>{gpsError}</span>
            <button type="button" onClick={() => setGpsError(null)} className="text-rose-500 font-bold ml-2">×</button>
          </div>
        )}

        {/* Autocomplete Predictions Dropdown (Google Maps Layout) */}
        {isDropdownOpen && predictions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-amber-200 overflow-hidden divide-y divide-stone-100 max-h-72 overflow-y-auto">
            <div className="p-2 bg-gradient-to-r from-amber-50 to-orange-50/50 flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#FF671F]" />
                <span>Google Maps एवं लाइव गाँव परिणाम ({predictions.length}):</span>
              </span>
              <span className="text-[10px] text-stone-500 font-normal">चुनने के लिए क्लिक करें</span>
            </div>

            {predictions.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => handleSelectPlace(place)}
                className="w-full p-2.5 text-left hover:bg-amber-50/80 transition-colors flex items-start gap-2.5 group"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#EA4335]/10 flex items-center justify-center shrink-0 group-hover:bg-[#EA4335] group-hover:text-white transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#EA4335] group-hover:text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-[#CC5218] transition-colors">
                      {place.name}
                    </span>
                    {renderPlaceTypeBadge(place.type)}
                  </div>
                  <p className="text-[11px] text-stone-600 truncate mt-0.5">
                    {place.subTitle}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono font-medium text-stone-500 block">
                    {place.lat.toFixed(2)}°N, {place.lon.toFixed(2)}°E
                  </span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    चुनें
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Location Display Card */}
      <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFF9F5] to-amber-50/60 border border-amber-300/80 shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-stone-950">
                  चयनित स्थान:
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#CC5218]">
                  {cityName}
                </span>
                {state && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-medium">
                    {state}
                  </span>
                )}
              </div>

              {/* Exact Coordinates */}
              <div className="flex items-center gap-3 text-[11px] text-stone-600 font-mono mt-1 flex-wrap">
                <span>अक्षांश: <strong className="text-stone-900">{latitude.toFixed(4)}° N</strong></span>
                <span>देशांतर: <strong className="text-stone-900">{longitude.toFixed(4)}° E</strong></span>
                <span className="text-emerald-700 font-sans font-medium text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  IST (+05:30)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map Toggle Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowMapEmbed(!showMapEmbed)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-stone-800 border border-amber-300 hover:bg-amber-50 shadow-2xs transition-all"
            >
              <Navigation className="w-3 h-3 text-[#EA4335]" />
              <span>{showMapEmbed ? 'मैप छुपाएं' : 'मैप पर देखें'}</span>
            </button>
          </div>
        </div>

        {/* Embedded Interactive Google Map Preview */}
        {showMapEmbed && (
          <div className="mt-3 pt-3 border-t border-amber-200/80">
            <div className="relative rounded-xl overflow-hidden border border-amber-300 shadow-sm bg-stone-100 h-48 sm:h-56">
              <iframe
                title={`Google Map - ${cityName}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={false}
                referrerPolicy="no-referrer"
                src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=hi&z=13&output=embed`}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-500">
                लाल पिन द्वारा आपकी जन्म कुंडली का सटीक भू-स्थान दर्शाया गया है।
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#CC5218] hover:underline font-bold text-[11px]"
              >
                <span>Google Maps में खोलें</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Popular Fast-Pick Chips */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span>त्वरित चयन (Quick Cities):</span>
          <button
            type="button"
            onClick={() => setShowDistrictBrowser(!showDistrictBrowser)}
            className="text-[#CC5218] hover:underline font-semibold"
          >
            {showDistrictBrowser ? 'जिला सूची बंद करें' : 'जिला व गाँव सूची से चुनें →'}
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {POPULAR_QUICK_CITIES.map((c) => {
            const isSelected = Math.abs(latitude - c.lat) < 0.05 && Math.abs(longitude - c.lon) < 0.05;
            return (
              <button
                key={c.en}
                type="button"
                onClick={() => handleSelectQuickCity(c)}
                className={`px-2 py-0.5 rounded-lg text-xs transition-all border ${
                  isSelected
                    ? 'bg-[#FF671F] text-white font-bold border-[#CC5218] shadow-2xs'
                    : 'bg-white text-stone-800 border-amber-200/90 hover:border-[#FF671F] hover:bg-amber-50/60'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Full District & Village Browser Accordion */}
      {showDistrictBrowser && (
        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-300 text-xs space-y-2.5 animate-in fade-in">
          <div className="font-bold text-amber-950 flex items-center justify-between">
            <span>अखिल भारतीय राज्य, जिला एवं गाँव ब्राउज़र</span>
            <button
              type="button"
              onClick={() => setShowDistrictBrowser(false)}
              className="text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-stone-600 mb-0.5">राज्य चुनें:</label>
              <select
                value={browserStateIdx}
                onChange={(e) => {
                  setBrowserStateIdx(parseInt(e.target.value) || 0);
                  setBrowserDistrictIdx(0);
                }}
                className="w-full px-2 py-1.5 rounded-lg bg-white border border-amber-300 text-xs text-stone-900"
              >
                {ALL_INDIAN_STATES_AND_DISTRICTS.map((st, i) => (
                  <option key={st.state} value={i}>{st.state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-stone-600 mb-0.5">जिला चुनें:</label>
              <select
                value={browserDistrictIdx}
                onChange={(e) => setBrowserDistrictIdx(parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1.5 rounded-lg bg-white border border-amber-300 text-xs text-stone-900"
              >
                {(ALL_INDIAN_STATES_AND_DISTRICTS[browserStateIdx]?.districts || []).map((dist, i) => (
                  <option key={dist.name} value={i}>{dist.nameHi} ({dist.name})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-stone-600 mb-0.5">
              गाँव या कस्बे का नाम (वैकल्पिक):
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={customVillageText}
                onChange={(e) => setCustomVillageText(e.target.value)}
                placeholder="उदा. बोरियावी, लींच, जगूदन, विजापुर..."
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs text-stone-900 placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={handleApplyDistrictVillage}
                className="px-3 py-1.5 rounded-lg bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold text-xs transition-colors shrink-0 shadow-2xs"
              >
                लागू करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
