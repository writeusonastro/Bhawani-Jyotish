import { IndianCity, INDIAN_CITIES_DATABASE } from './indianCities';

export interface MapPlaceResult {
  id: string;
  name: string;
  displayName: string;
  subTitle: string;
  type?: string;
  state: string;
  lat: number;
  lon: number;
  source?: 'google' | 'photon' | 'nominatim' | 'database';
}

export interface NominatimPlace {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name: string;
  address?: {
    village?: string;
    town?: string;
    city?: string;
    suburb?: string;
    county?: string;
    state_district?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

// Google Maps / Photon / Nominatim live Autocomplete search
export async function searchPlacesLikeGoogleMaps(query: string): Promise<MapPlaceResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const results: MapPlaceResult[] = [];
  const seen = new Set<string>();

  // 1. Instant local database search (0ms)
  const qLower = trimmed.toLowerCase();
  const localMatches = INDIAN_CITIES_DATABASE.filter(c => 
    c.name.toLowerCase().includes(qLower) ||
    c.nameEn.toLowerCase().includes(qLower) ||
    c.nameHi.toLowerCase().includes(qLower) ||
    (c.nameGu && c.nameGu.toLowerCase().includes(qLower)) ||
    c.state.toLowerCase().includes(qLower)
  ).slice(0, 5);

  for (const c of localMatches) {
    const key = `${Math.round(c.lat * 100)},${Math.round(c.lon * 100)}`;
    seen.add(key);
    results.push({
      id: `db_${c.nameEn}`,
      name: c.nameHi || c.name,
      displayName: `${c.nameHi || c.nameEn}, ${c.stateHi || c.state}`,
      subTitle: `${c.stateHi || c.state}, भारत (India)`,
      type: 'city',
      state: c.state,
      lat: c.lat,
      lon: c.lon,
      source: 'database'
    });
  }

  // 2. Query backend proxy (/api/places/search)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`/api/places/search?q=${encodeURIComponent(trimmed)}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.results && Array.isArray(data.results)) {
        for (const item of data.results) {
          const key = `${Math.round(item.lat * 100)},${Math.round(item.lon * 100)}`;
          if (!seen.has(key)) {
            seen.add(key);
            results.push({
              id: item.id || `res_${key}`,
              name: item.name,
              displayName: item.displayName,
              subTitle: item.subTitle || item.displayName,
              type: item.type,
              state: item.state || 'India',
              lat: item.lat,
              lon: item.lon,
              source: item.source || 'photon'
            });
          }
        }
      }
    }
  } catch {
    // If backend proxy fails or times out, fallback to direct client-side Photon
    try {
      const pUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(trimmed)}&limit=6`;
      const pRes = await fetch(pUrl, { headers: { 'Accept': 'application/json' } });
      if (pRes.ok) {
        const pData = await pRes.json();
        if (pData?.features && Array.isArray(pData.features)) {
          for (const feat of pData.features) {
            const props = feat.properties || {};
            const coords = feat.geometry?.coordinates || [];
            const lon = coords[0];
            const lat = coords[1];
            if (!lat || !lon) continue;

            const key = `${Math.round(lat * 100)},${Math.round(lon * 100)}`;
            if (seen.has(key)) continue;
            seen.add(key);

            const placeName = props.name || props.city || props.town || props.village || trimmed;
            const parts = [props.district, props.county, props.state, props.country || 'India'].filter(Boolean);

            results.push({
              id: `p_${feat.properties?.osm_id || key}`,
              name: placeName,
              displayName: `${placeName}, ${parts.join(', ')}`,
              subTitle: parts.join(', '),
              type: props.osm_value || props.type || 'place',
              state: props.state || 'India',
              lat,
              lon,
              source: 'photon'
            });
          }
        }
      }
    } catch {
      // ignore
    }
  }

  return results.slice(0, 10);
}

// Reverse Geocoding (GPS Coords to Place Name)
export async function reverseGeocodeGPS(lat: number, lon: number): Promise<{
  name: string;
  displayName: string;
  state: string;
  lat: number;
  lon: number;
} | null> {
  try {
    const res = await fetch(`/api/places/reverse?lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.name) {
        return data;
      }
    }
  } catch {
    // fallback directly to Photon reverse
    try {
      const pRes = await fetch(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`);
      if (pRes.ok) {
        const pData = await pRes.json();
        const feat = pData?.features?.[0];
        if (feat) {
          const props = feat.properties || {};
          const name = props.name || props.city || props.town || props.village || 'वर्तमान स्थान';
          const state = props.state || 'गुजरात';
          const parts = [props.city || props.town || props.village, props.district, props.state].filter(Boolean);
          return {
            name,
            displayName: `${name} (${parts.join(', ')})`,
            state,
            lat,
            lon
          };
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    name: `स्थान (${lat.toFixed(3)}°, ${lon.toFixed(3)}°)`,
    displayName: `GPS स्थिति: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`,
    state: 'गुजरात (Gujarat)',
    lat,
    lon
  };
}

// Backward-compatible searchOnlineIndianPlace
export async function searchOnlineIndianPlace(query: string): Promise<IndianCity[]> {
  const mapResults = await searchPlacesLikeGoogleMaps(query);
  return mapResults.map(item => ({
    name: item.displayName,
    nameHi: item.name,
    nameGu: item.name,
    nameEn: item.name,
    state: item.state,
    stateHi: item.state,
    stateGu: item.state,
    lat: item.lat,
    lon: item.lon,
    popular: false
  }));
}

// Major Districts with geographic center coordinates for all States of India
// Enables 100% reliable instant village positioning for any user
export interface StateDistrictInfo {
  state: string;
  districts: {
    name: string;
    nameHi: string;
    nameGu?: string;
    lat: number;
    lon: number;
  }[];
}

export const ALL_INDIAN_STATES_AND_DISTRICTS: StateDistrictInfo[] = [
  {
    state: "गुजरात (Gujarat)",
    districts: [
      { name: "Mehsana (मेहसाणा)", nameHi: "मेहसाणा", nameGu: "મહેસાણા", lat: 23.5880, lon: 72.3693 },
      { name: "Ahmedabad (अहमदाबाद)", nameHi: "अहमदाबाद", nameGu: "અમદાવાદ", lat: 23.0225, lon: 72.5714 },
      { name: "Gandhinagar (गांधीनगर)", nameHi: "गांधीनगर", nameGu: "ગાંધીનગર", lat: 23.2156, lon: 72.6369 },
      { name: "Patan (पाटन)", nameHi: "पाटन", nameGu: "પાટણ", lat: 23.8493, lon: 72.1266 },
      { name: "Banaskantha - Palanpur (बनासकांठा)", nameHi: "बनासकांठा (पालनपुर)", nameGu: "બનાસકાંઠા", lat: 24.1724, lon: 72.4346 },
      { name: "Sabarkantha - Himatnagar (साबरकांठा)", nameHi: "साबरकांठा (हिम्मतनगर)", nameGu: "સાબરકાંઠા", lat: 23.5977, lon: 72.9698 },
      { name: "Aravalli - Modasa (अरवल्ली)", nameHi: "अरवल्ली (मोडासा)", nameGu: "અરવલ્લી", lat: 23.4632, lon: 73.2984 },
      { name: "Surat (सूरत)", nameHi: "सूरत", nameGu: "સૂરત", lat: 21.1702, lon: 72.8311 },
      { name: "Vadodara (वडोदरा)", nameHi: "वडोदरा", nameGu: "વડોદરા", lat: 22.3072, lon: 73.1812 },
      { name: "Rajkot (राजकोट)", nameHi: "राजकोट", nameGu: "રાજકોટ", lat: 22.3039, lon: 70.8022 },
      { name: "Bhavnagar (भावनगर)", nameHi: "भावनगर", nameGu: "ભાવનગર", lat: 21.7645, lon: 72.1519 },
      { name: "Jamnagar (जामनगर)", nameHi: "जामनगर", nameGu: "જામનગર", lat: 22.4707, lon: 70.0577 },
      { name: "Junagadh (जूनागढ़)", nameHi: "जूनागढ़", nameGu: "જૂનાગઢ", lat: 21.5222, lon: 70.4579 },
      { name: "Gir Somnath - Veraval (गीर सोमनाथ)", nameHi: "गीर सोमनाथ", nameGu: "ગીર સોમનાથ", lat: 20.9000, lon: 70.3667 },
      { name: "Kutch - Bhuj (कच्छ भुज)", nameHi: "कच्छ (भुज)", nameGu: "કચ્છ", lat: 23.2420, lon: 69.6669 },
      { name: "Morbi (मोरबी)", nameHi: "मोरबी", nameGu: "મોરબી", lat: 22.8120, lon: 70.8377 },
      { name: "Surendranagar (सुरेंद्रनगर)", nameHi: "सुरेंद्रनगर", nameGu: "સુરેન્દ્રનગર", lat: 22.7277, lon: 71.6370 },
      { name: "Anand (आणंद)", nameHi: "आणंद", nameGu: "આણંદ", lat: 22.5645, lon: 72.9289 },
      { name: "Kheda - Nadiad (खेड़ा नडियाद)", nameHi: "खेड़ा (नडियाद)", nameGu: "ખેડા", lat: 22.6916, lon: 72.8634 },
      { name: "Bharuch (भरूच)", nameHi: "भरूच", nameGu: "ભરૂચ", lat: 21.7051, lon: 72.9959 },
      { name: "Valsad (वलसाड)", nameHi: "वलसाड", nameGu: "વલસાડ", lat: 20.5992, lon: 72.9342 },
      { name: "Navsari (नवसारी)", nameHi: "नवसारी", nameGu: "નવસારી", lat: 20.9467, lon: 72.9520 },
      { name: "Panchmahal - Godhra (पंचमहाल)", nameHi: "पंचमहाल (गोधरा)", nameGu: "પંચમહાલ", lat: 22.7766, lon: 73.6148 },
      { name: "Dahod (दाहोद)", nameHi: "दाहोद", nameGu: "દાહોદ", lat: 22.8361, lon: 74.2562 },
      { name: "Mahisagar - Lunawada (महीसागर)", nameHi: "महीसागर (लुणावाडा)", nameGu: "મહીસાગર", lat: 23.1325, lon: 73.6149 },
      { name: "Chhota Udepur (छोटा उदेपुर)", nameHi: "छोटा उदेपुर", nameGu: "છોટા ઉદેપુર", lat: 22.3082, lon: 74.0125 },
      { name: "Narmada - Rajpipla (नर्मदा)", nameHi: "नर्मदा (राजपीपला)", nameGu: "નર્મદા", lat: 21.8708, lon: 73.5027 },
      { name: "Tapi - Vyara (तापी व्यरा)", nameHi: "तापी (व्यरा)", nameGu: "તાપી", lat: 21.1121, lon: 73.3934 },
      { name: "Dang - Ahwa (डांग)", nameHi: "डांग (आहवा)", nameGu: "ડાંગ", lat: 20.7583, lon: 73.6844 },
      { name: "Amreli (अमरेली)", nameHi: "अमरेली", nameGu: "અમરેલી", lat: 21.6032, lon: 71.2221 },
      { name: "Botad (बोटाद)", nameHi: "बोटाद", nameGu: "બોટાદ", lat: 22.1704, lon: 71.6669 },
      { name: "Porbandar (पोरबंदर)", nameHi: "पोरबंदर", nameGu: "પોરબંદર", lat: 21.6417, lon: 69.6293 },
      { name: "Devbhumi Dwarka (देवभूमि द्वारका)", nameHi: "देवभूमि द्वारका", nameGu: "દેવભૂમિ દ્વારકા", lat: 22.2442, lon: 68.9685 }
    ]
  },
  {
    state: "राजस्थान (Rajasthan)",
    districts: [
      { name: "Jaipur (जयपुर)", nameHi: "जयपुर", lat: 26.9124, lon: 75.7873 },
      { name: "Jodhpur (जोधपुर)", nameHi: "जोधपुर", lat: 26.2389, lon: 73.0243 },
      { name: "Udaipur (उदयपुर)", nameHi: "उदयपुर", lat: 24.5854, lon: 73.7125 },
      { name: "Kota (कोटा)", nameHi: "कोटा", lat: 25.2138, lon: 75.8648 },
      { name: "Bikaner (बीकानेर)", nameHi: "बीकानेर", lat: 28.0229, lon: 73.3119 },
      { name: "Ajmer (अजमेर)", nameHi: "अजमेर", lat: 26.4499, lon: 74.6399 },
      { name: "Bhilwara (भीलवाड़ा)", nameHi: "भीलवाड़ा", lat: 25.3216, lon: 74.6414 },
      { name: "Alwar (अलवर)", nameHi: "अलवर", lat: 27.5530, lon: 76.6346 },
      { name: "Sikar (सीकर)", nameHi: "सीकर", lat: 27.6094, lon: 75.1398 },
      { name: "Pali (पाली)", nameHi: "पाली", lat: 25.7711, lon: 73.3234 },
      { name: "Sirohi - Abu Road (सिरोही)", nameHi: "सिरोही", lat: 24.8826, lon: 72.8634 },
      { name: "Jalore (जालोर)", nameHi: "जालोर", lat: 25.3444, lon: 72.6156 },
      { name: "Barmer (बाड़मेर)", nameHi: "बाड़मेर", lat: 25.7532, lon: 71.4181 },
      { name: "Balotra (बालोतरा)", nameHi: "बालोतरा", lat: 25.8333, lon: 72.2333 },
      { name: "Jaisalmer (जैसलमेर)", nameHi: "जैसलमेर", lat: 26.9157, lon: 70.9083 },
      { name: "Nagaur (नागौर)", nameHi: "नागौर", lat: 27.2020, lon: 73.7439 },
      { name: "Chittorgarh (चित्तौड़गढ़)", nameHi: "चित्तौड़गढ़", lat: 24.8887, lon: 74.6269 },
      { name: "Sri Ganganagar (श्रीगंगानगर)", nameHi: "श्रीगंगानगर", lat: 29.9038, lon: 73.8772 },
      { name: "Hanumangarh (हनुमानगढ़)", nameHi: "हनुमानगढ़", lat: 29.5816, lon: 74.3294 },
      { name: "Jhunjhunu (झुंझुनू)", nameHi: "झुंझुनू", lat: 28.1289, lon: 75.3995 },
      { name: "Churu (चूरू)", nameHi: "चूरू", lat: 28.2900, lon: 74.9600 },
      { name: "Bharatpur (भरतपुर)", nameHi: "भरतपुर", lat: 27.2152, lon: 77.5030 },
      { name: "Dholpur (धौलपुर)", nameHi: "धौलपुर", lat: 26.7025, lon: 77.8934 },
      { name: "Karauli (करौली)", nameHi: "करौली", lat: 26.4950, lon: 77.0200 },
      { name: "Sawai Madhopur (सवाई माधोपुर)", nameHi: "सवाई माधोपुर", lat: 25.9928, lon: 76.3562 },
      { name: "Tonk (टोंक)", nameHi: "टोंक", lat: 26.1667, lon: 75.7833 },
      { name: "Bundi (बूंदी)", nameHi: "बूंदी", lat: 25.4414, lon: 75.6420 },
      { name: "Baran (बारां)", nameHi: "बारां", lat: 25.1011, lon: 76.5132 },
      { name: "Jhalawar (झालावाड़)", nameHi: "झालावाड़", lat: 24.5973, lon: 76.1610 },
      { name: "Rajsamand - Nathdwara (राजसमंद)", nameHi: "राजसमंद", lat: 25.0441, lon: 73.8828 },
      { name: "Dungarpur (डूंगरपुर)", nameHi: "डूंगरपुर", lat: 23.8400, lon: 73.7147 },
      { name: "Banswara (बांसवाड़ा)", nameHi: "बांसवाड़ा", lat: 23.5461, lon: 74.4373 },
      { name: "Pratapgarh (प्रतापगढ़)", nameHi: "प्रतापगढ़", lat: 24.0322, lon: 74.7814 },
      { name: "Dausa (दौसा)", nameHi: "दौसा", lat: 26.8928, lon: 76.3375 }
    ]
  },
  {
    state: "महाराष्ट्र (Maharashtra)",
    districts: [
      { name: "Mumbai (मुंबई)", nameHi: "मुंबई", lat: 19.0760, lon: 72.8777 },
      { name: "Pune (पुणे)", nameHi: "पुणे", lat: 18.5204, lon: 73.8567 },
      { name: "Nagpur (नागपुर)", nameHi: "नागपुर", lat: 21.1458, lon: 79.0882 },
      { name: "Thane (ठाणे)", nameHi: "ठाणे", lat: 19.2183, lon: 72.9781 },
      { name: "Nashik (नासिक)", nameHi: "नासिक", lat: 19.9975, lon: 73.7898 },
      { name: "Chhatrapati Sambhajinagar (औरंगाबाद)", nameHi: "संभाजीनगर (औरंगाबाद)", lat: 19.8762, lon: 75.3433 },
      { name: "Solapur (सोलापुर)", nameHi: "सोलापुर", lat: 17.6599, lon: 75.9064 },
      { name: "Kolhapur (कोल्हापुर)", nameHi: "कोल्हापुर", lat: 16.7050, lon: 74.2433 },
      { name: "Amravati (अमरावती)", nameHi: "अमरावती", lat: 20.9374, lon: 77.7796 },
      { name: "Nanded (नांदेड़)", nameHi: "नांदेड़", lat: 19.1383, lon: 77.3210 },
      { name: "Sangli (सांगली)", nameHi: "सांगली", lat: 16.8524, lon: 74.5815 },
      { name: "Jalgaon (जलगांव)", nameHi: "जलगांव", lat: 21.0077, lon: 75.5626 },
      { name: "Akola (अकोला)", nameHi: "अकोला", lat: 20.7002, lon: 77.0082 },
      { name: "Latur (लातूर)", nameHi: "लातूर", lat: 18.4088, lon: 76.5604 },
      { name: "Dhule (धुले)", nameHi: "धुले", lat: 20.9042, lon: 74.7749 },
      { name: "Ahilyanagar - Ahmednagar (अहमदनगर)", nameHi: "अहमदनगर", lat: 19.0952, lon: 74.7496 },
      { name: "Satara (सतारा)", nameHi: "सतारा", lat: 17.6805, lon: 74.0183 },
      { name: "Ratnagiri (रत्नागिरी)", nameHi: "रत्नागिरी", lat: 16.9902, lon: 73.3120 },
      { name: "Raigad - Alibag (रायगढ़)", nameHi: "रायगढ़", lat: 18.6414, lon: 72.8722 },
      { name: "Sindhudurg (सिंधुदुर्ग)", nameHi: "सिंधुदुर्ग", lat: 16.1158, lon: 73.7000 },
      { name: "Chandrapur (चंद्रपुर)", nameHi: "चंद्रपुर", lat: 19.9615, lon: 79.2961 },
      { name: "Buldhana (बुलढाणा)", nameHi: "बुलढाणा", lat: 20.5292, lon: 76.1842 },
      { name: "Beed (बीड)", nameHi: "बीड", lat: 18.9891, lon: 75.7601 },
      { name: "Yavatmal (यवतमाल)", nameHi: "यवतमाल", lat: 20.3888, lon: 78.1204 }
    ]
  },
  {
    state: "उत्तर प्रदेश (Uttar Pradesh)",
    districts: [
      { name: "Lucknow (लखनऊ)", nameHi: "लखनऊ", lat: 26.8467, lon: 80.9462 },
      { name: "Varanasi - Kashi (वाराणसी)", nameHi: "वाराणसी", lat: 25.3176, lon: 82.9739 },
      { name: "Ayodhya (अयोध्या)", nameHi: "अयोध्या", lat: 26.7922, lon: 82.1998 },
      { name: "Mathura - Vrindavan (मथुरा)", nameHi: "मथुरा", lat: 27.4924, lon: 77.6737 },
      { name: "Prayagraj (प्रयागराज)", nameHi: "प्रयागराज", lat: 25.4358, lon: 81.8463 },
      { name: "Kanpur (कानपुर)", nameHi: "कानपुर", lat: 26.4499, lon: 80.3319 },
      { name: "Agra (आगरा)", nameHi: "आगरा", lat: 27.1767, lon: 78.0081 },
      { name: "Gorakhpur (गोरखपुर)", nameHi: "गोरखपुर", lat: 26.7606, lon: 83.3732 },
      { name: "Noida - Gautam Buddha Nagar (नोएडा)", nameHi: "नोएडा", lat: 28.5355, lon: 77.3910 },
      { name: "Ghaziabad (गाजियाबाद)", nameHi: "गाजियाबाद", lat: 28.6692, lon: 77.4538 },
      { name: "Meerut (मेरठ)", nameHi: "मेरठ", lat: 28.9845, lon: 77.7064 },
      { name: "Bareilly (बरेली)", nameHi: "बरेली", lat: 28.3670, lon: 79.4304 },
      { name: "Aligarh (अलीगढ़)", nameHi: "अलीगढ़", lat: 27.8974, lon: 78.0880 },
      { name: "Moradabad (मुरादाबाद)", nameHi: "मुरादाबाद", lat: 28.8386, lon: 78.7733 },
      { name: "Saharanpur (सहारनपुर)", nameHi: "सहारनपुर", lat: 29.9671, lon: 77.5452 },
      { name: "Jhansi (झांसी)", nameHi: "झांसी", lat: 25.4484, lon: 78.5685 },
      { name: "Muzaffarnagar (मुजफ्फरनगर)", nameHi: "मुजफ्फरनगर", lat: 29.4727, lon: 77.7085 },
      { name: "Mirzapur (मिर्जापुर)", nameHi: "मिर्जापुर", lat: 25.1337, lon: 82.5644 },
      { name: "Gonda (गोंडा)", nameHi: "गोंडा", lat: 27.1300, lon: 81.9600 },
      { name: "Basti (बस्ती)", nameHi: "बस्ती", lat: 26.8100, lon: 82.7600 },
      { name: "Azamgarh (आजमगढ़)", nameHi: "आजमगढ़", lat: 26.0680, lon: 83.1840 },
      { name: "Jaunpur (जौनपुर)", nameHi: "जौनपुर", lat: 25.7464, lon: 82.6837 },
      { name: "Ballia (बलिया)", nameHi: "बलिया", lat: 25.7600, lon: 84.1500 },
      { name: "Sitapur (सीतापुर)", nameHi: "सीतापुर", lat: 27.5700, lon: 80.6800 },
      { name: "Deoria (देवरिया)", nameHi: "देवरिया", lat: 26.5000, lon: 83.7800 }
    ]
  },
  {
    state: "मध्य प्रदेश (Madhya Pradesh)",
    districts: [
      { name: "Indore (इंदौर)", nameHi: "इंदौर", lat: 22.7196, lon: 75.8577 },
      { name: "Bhopal (भोपाल)", nameHi: "भोपाल", lat: 23.2599, lon: 77.4126 },
      { name: "Ujjain - Mahakal (उज्जैन)", nameHi: "उज्जैन", lat: 23.1765, lon: 75.7885 },
      { name: "Gwalior (ग्वालियर)", nameHi: "ग्वालियर", lat: 26.2183, lon: 78.1828 },
      { name: "Jabalpur (जबलपुर)", nameHi: "जबलपुर", lat: 23.1815, lon: 79.9864 },
      { name: "Sagar (सागर)", nameHi: "सागर", lat: 23.8388, lon: 78.7378 },
      { name: "Rewa (रीवा)", nameHi: "रीवा", lat: 24.5362, lon: 81.3037 },
      { name: "Satna (सतना)", nameHi: "सतना", lat: 24.6005, lon: 80.8322 },
      { name: "Ratlam (रतलाम)", nameHi: "रतलाम", lat: 23.3315, lon: 75.0367 },
      { name: "Dewas (देवास)", nameHi: "देवास", lat: 22.9676, lon: 76.0534 },
      { name: "Mandsaur (मंदसौर)", nameHi: "मंदसौर", lat: 24.0722, lon: 75.0694 },
      { name: "Neemuch (नीमच)", nameHi: "नीमच", lat: 24.4746, lon: 74.8702 },
      { name: "Khargone (खरगोन)", nameHi: "खरगोन", lat: 21.8239, lon: 75.6174 },
      { name: "Khandwa (खंडवा)", nameHi: "खंडवा", lat: 21.8314, lon: 76.3498 },
      { name: "Chhindwara (छिंदवाड़ा)", nameHi: "छिंदवाड़ा", lat: 22.0574, lon: 78.9382 },
      { name: "Shivpuri (शिवपुरी)", nameHi: "शिवपुरी", lat: 25.4320, lon: 77.6534 },
      { name: "Vidisha (विदिशा)", nameHi: "विदिशा", lat: 23.5251, lon: 77.8081 }
    ]
  },
  {
    state: "बिहार (Bihar)",
    districts: [
      { name: "Patna (पटना)", nameHi: "पटना", lat: 25.5941, lon: 85.1376 },
      { name: "Gaya - Bodh Gaya (गया)", nameHi: "गया", lat: 24.7914, lon: 85.0002 },
      { name: "Muzaffarpur (मुजफ्फरपुर)", nameHi: "मुजफ्फरपुर", lat: 26.1209, lon: 85.3647 },
      { name: "Bhagalpur (भागलपुर)", nameHi: "भागलपुर", lat: 25.2425, lon: 86.9842 },
      { name: "Darbhanga (दरभंगा)", nameHi: "दरभंगा", lat: 26.1542, lon: 85.8918 },
      { name: "Purnia (पूर्णिया)", nameHi: "पूर्णिया", lat: 25.7771, lon: 87.4753 },
      { name: "Begusarai (बेगूसराय)", nameHi: "बेगूसराय", lat: 25.4182, lon: 86.1272 },
      { name: "Chhapra - Saran (छपरा)", nameHi: "छपरा", lat: 25.7848, lon: 84.7274 },
      { name: "Katihar (कटिहार)", nameHi: "कटिहार", lat: 25.5541, lon: 87.5647 },
      { name: "Arrah - Bhojpur (आरा)", nameHi: "आरा", lat: 25.5560, lon: 84.6603 },
      { name: "Siwan (सीवान)", nameHi: "सीवान", lat: 26.2223, lon: 84.3567 },
      { name: "Motihari - East Champaran (मोतिहारी)", nameHi: "मोतिहारी", lat: 26.6470, lon: 84.9089 },
      { name: "Samastipur (समस्तीपुर)", nameHi: "समस्तीपुर", lat: 25.8628, lon: 85.7811 },
      { name: "Rohtas - Sasaram (सासाराम)", nameHi: "सासाराम", lat: 24.9515, lon: 84.0315 }
    ]
  },
  {
    state: "दिल्ली (Delhi NCR)",
    districts: [
      { name: "New Delhi (नई दिल्ली)", nameHi: "नई दिल्ली", lat: 28.6139, lon: 77.2090 },
      { name: "North Delhi (उत्तर दिल्ली)", nameHi: "उत्तर दिल्ली", lat: 28.7041, lon: 77.1025 },
      { name: "South Delhi (दक्षिण दिल्ली)", nameHi: "दक्षिण दिल्ली", lat: 28.5355, lon: 77.2000 },
      { name: "East Delhi (पूर्वी दिल्ली)", nameHi: "पूर्वी दिल्ली", lat: 28.6280, lon: 77.2950 },
      { name: "West Delhi (पश्चिम दिल्ली)", nameHi: "पश्चिम दिल्ली", lat: 28.6500, lon: 77.0500 },
      { name: "Central Delhi (मध्य दिल्ली)", nameHi: "मध्य दिल्ली", lat: 28.6400, lon: 77.2200 }
    ]
  },
  {
    state: "हरियाणा (Haryana)",
    districts: [
      { name: "Gurugram (गुरुग्राम)", nameHi: "गुरुग्राम", lat: 28.4595, lon: 77.0266 },
      { name: "Faridabad (फरीदाबाद)", nameHi: "फरीदाबाद", lat: 28.4089, lon: 77.3178 },
      { name: "Panipat (पानीपत)", nameHi: "पानीपत", lat: 29.3909, lon: 76.9635 },
      { name: "Ambala (अंबाला)", nameHi: "अंबाला", lat: 30.3782, lon: 76.7767 },
      { name: "Rohtak (रोहतक)", nameHi: "रोहतक", lat: 28.8955, lon: 76.6066 },
      { name: "Hisar (हिसार)", nameHi: "हिसार", lat: 29.1492, lon: 75.7217 },
      { name: "Karnal (करनाल)", nameHi: "करनाल", lat: 29.6857, lon: 76.9905 },
      { name: "Sonipat (सोनीपत)", nameHi: "सोनीपत", lat: 28.9931, lon: 77.0151 },
      { name: "Kurukshetra (कुरुक्षेत्र)", nameHi: "कुरुक्षेत्र", lat: 29.9695, lon: 76.8783 },
      { name: "Sirsa (सिरसा)", nameHi: "सिरसा", lat: 29.5349, lon: 75.0296 }
    ]
  },
  {
    state: "पंजाब (Punjab)",
    districts: [
      { name: "Amritsar (अमृतसर)", nameHi: "अमृतसर", lat: 31.6340, lon: 74.8723 },
      { name: "Ludhiana (लुधियाना)", nameHi: "लुधियाना", lat: 30.9010, lon: 75.8573 },
      { name: "Jalandhar (जालंधर)", nameHi: "जालंधर", lat: 31.3260, lon: 75.5762 },
      { name: "Patiala (पटियाला)", nameHi: "पटियाला", lat: 30.3398, lon: 76.3869 },
      { name: "Bathinda (बठिंडा)", nameHi: "बठिंडा", lat: 30.2110, lon: 74.9455 },
      { name: "Mohali - SAS Nagar (मोहाली)", nameHi: "मोहाली", lat: 30.7046, lon: 76.7179 },
      { name: "Hoshiarpur (होशियारपुर)", nameHi: "होशियारपुर", lat: 31.5273, lon: 75.9149 }
    ]
  },
  {
    state: "उत्तराखंड (Uttarakhand)",
    districts: [
      { name: "Dehradun (देहरादून)", nameHi: "देहरादून", lat: 30.3165, lon: 78.0322 },
      { name: "Haridwar (हरिद्वार)", nameHi: "हरिद्वार", lat: 29.9457, lon: 78.1642 },
      { name: "Rishikesh (ऋषिकेश)", nameHi: "ऋषिकेश", lat: 30.0869, lon: 78.2676 },
      { name: "Nainital (नैनीताल)", nameHi: "नैनीताल", lat: 29.3919, lon: 79.4542 },
      { name: "Udham Singh Nagar - Haldwani (हल्द्वानी)", nameHi: "हल्द्वानी", lat: 29.2183, lon: 79.5130 },
      { name: "Almora (अल्मोड़ा)", nameHi: "अल्मोड़ा", lat: 29.5971, lon: 79.6591 }
    ]
  },
  {
    state: "हिमाचल प्रदेश (Himachal Pradesh)",
    districts: [
      { name: "Shimla (शिमला)", nameHi: "शिमला", lat: 31.1048, lon: 77.1734 },
      { name: "Kangra - Dharamshala (धर्मशाला)", nameHi: "धर्मशाला", lat: 32.2190, lon: 76.3234 },
      { name: "Kullu - Manali (मनाली)", nameHi: "मनाली", lat: 32.2432, lon: 77.1892 },
      { name: "Mandi (मंडी)", nameHi: "मंडी", lat: 31.7082, lon: 76.9317 },
      { name: "Solan (सोलन)", nameHi: "सोलन", lat: 30.9084, lon: 77.0999 }
    ]
  },
  {
    state: "पश्चिम बंगाल (West Bengal)",
    districts: [
      { name: "Kolkata (कोलकाता)", nameHi: "कोलकाता", lat: 22.5726, lon: 88.3639 },
      { name: "Howrah (हावड़ा)", nameHi: "हावड़ा", lat: 22.5958, lon: 88.2636 },
      { name: "Siliguri - Darjeeling (सिलीगुड़ी)", nameHi: "सिलीगुड़ी", lat: 26.7271, lon: 88.3953 },
      { name: "Paschim Bardhaman - Asansol (आसनसोल)", nameHi: "आसनसोल", lat: 23.6739, lon: 86.9524 },
      { name: "Durgapur (दुर्गापुर)", nameHi: "दुर्गापुर", lat: 23.5204, lon: 87.3119 }
    ]
  },
  {
    state: "कर्नाटक (Karnataka)",
    districts: [
      { name: "Bengaluru (बेंगलुरु)", nameHi: "बेंगलुरु", lat: 12.9716, lon: 77.5946 },
      { name: "Mysuru (मैसूर)", nameHi: "मैसूर", lat: 12.2958, lon: 76.6394 },
      { name: "Hubballi-Dharwad (हुबली)", nameHi: "हुबली", lat: 15.3647, lon: 75.1240 },
      { name: "Mangaluru (मंगलुरु)", nameHi: "मंगलुरु", lat: 12.9141, lon: 74.8560 },
      { name: "Belagavi (बेलगाम)", nameHi: "बेलगाम", lat: 15.8497, lon: 74.4977 }
    ]
  },
  {
    state: "तमिलनाडु (Tamil Nadu)",
    districts: [
      { name: "Chennai (चेन्नई)", nameHi: "चेन्नई", lat: 13.0827, lon: 80.2707 },
      { name: "Coimbatore (कोयंबटूर)", nameHi: "कोयंबटूर", lat: 11.0168, lon: 76.9558 },
      { name: "Madurai (मदुरै)", nameHi: "मदुरै", lat: 9.9252, lon: 78.1198 },
      { name: "Tiruchirappalli (त्रिची)", nameHi: "त्रिची", lat: 10.7905, lon: 78.7047 }
    ]
  },
  {
    state: "तेलंगाना (Telangana)",
    districts: [
      { name: "Hyderabad (हैदराबाद)", nameHi: "हैदराबाद", lat: 17.3850, lon: 78.4867 },
      { name: "Warangal (वारंगल)", nameHi: "वारंगल", lat: 17.9784, lon: 79.5941 },
      { name: "Nizamabad (निजामाबाद)", nameHi: "निजामाबाद", lat: 18.6725, lon: 78.0941 }
    ]
  },
  {
    state: "आंध्र प्रदेश (Andhra Pradesh)",
    districts: [
      { name: "Visakhapatnam (विशाखापत्तनम)", nameHi: "विशाखापत्तनम", lat: 17.6868, lon: 83.2185 },
      { name: "Vijayawada (विजयवाड़ा)", nameHi: "विजयवाड़ा", lat: 16.5062, lon: 80.6480 },
      { name: "Tirupati (तिरुपति)", nameHi: "तिरुपति", lat: 13.6288, lon: 79.4192 }
    ]
  },
  {
    state: "केरल (Kerala)",
    districts: [
      { name: "Thiruvananthapuram (तिरुवनंतपुरम)", nameHi: "तिरुवनंतपुरम", lat: 8.5241, lon: 76.9366 },
      { name: "Kochi - Ernakulam (कोच्चि)", nameHi: "कोच्चि", lat: 9.9312, lon: 76.2673 },
      { name: "Kozhikode - Calicut (कोझिकोड)", nameHi: "कोझिकोड", lat: 11.2588, lon: 75.7804 }
    ]
  },
  {
    state: "ओडिशा (Odisha)",
    districts: [
      { name: "Bhubaneswar (भुवनेश्वर)", nameHi: "भुवनेश्वर", lat: 20.2961, lon: 85.8245 },
      { name: "Puri - Jagannath (पुरी)", nameHi: "पुरी", lat: 19.8135, lon: 85.8312 },
      { name: "Cuttack (कटक)", nameHi: "कटक", lat: 20.4625, lon: 85.8828 }
    ]
  },
  {
    state: "झारखंड (Jharkhand)",
    districts: [
      { name: "Ranchi (रांची)", nameHi: "रांची", lat: 23.3441, lon: 85.3096 },
      { name: "Jamshedpur (जमशेदपुर)", nameHi: "जमशेदपुर", lat: 22.8046, lon: 86.2029 },
      { name: "Dhanbad (धनबाद)", nameHi: "धनबाद", lat: 23.7957, lon: 86.4304 },
      { name: "Deoghar - Baba Baidyanath (देवघर)", nameHi: "देवघर", lat: 24.4826, lon: 86.6980 }
    ]
  },
  {
    state: "छत्तीसगढ़ (Chhattisgarh)",
    districts: [
      { name: "Raipur (रायपुर)", nameHi: "रायपुर", lat: 21.2514, lon: 81.6296 },
      { name: "Bilaspur (बिलासपुर)", nameHi: "बिलासपुर", lat: 22.0797, lon: 82.1409 },
      { name: "Durg - Bhilai (दुर्ग भिलाई)", nameHi: "दुर्ग भिलाई", lat: 21.1938, lon: 81.3509 }
    ]
  },
  {
    state: "असम (Assam)",
    districts: [
      { name: "Guwahati - Kamakhya (गुवाहाटी)", nameHi: "गुवाहाटी", lat: 26.1445, lon: 91.7362 },
      { name: "Dibrugarh (डिब्रूगढ़)", nameHi: "डिब्रूगढ़", lat: 27.4728, lon: 94.9120 }
    ]
  },
  {
    state: "जम्मू और कश्मीर (J&K)",
    districts: [
      { name: "Jammu - Vaishno Devi (जम्मू)", nameHi: "जम्मू", lat: 32.7266, lon: 74.8570 },
      { name: "Srinagar (श्रीनगर)", nameHi: "श्रीनगर", lat: 34.0837, lon: 74.7973 }
    ]
  },
  {
    state: "गोवा (Goa)",
    districts: [
      { name: "Panaji (पणजी)", nameHi: "पणजी", lat: 15.4909, lon: 73.8278 },
      { name: "Margao (मडगांव)", nameHi: "मडगांव", lat: 15.2832, lon: 73.9862 }
    ]
  },
  {
    state: "लद्दाख (Ladakh)",
    districts: [
      { name: "Leh (लेह)", nameHi: "लेह", lat: 34.1526, lon: 77.5771 }
    ]
  }
];
