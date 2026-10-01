import { Language } from '../types/astrology';

export const STORAGE_PREFERRED_LANG = 'bhawani_preferred_language';
export const STORAGE_MANUAL_SELECTED = 'bhawani_manual_selection';
export const STORAGE_GEO_LANG = 'bhawani_geo_language';
export const STORAGE_LEGACY_LANG = 'astro_language_preference';

export interface GeoDetectionInfo {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  language: Language;
  zone: 'gujarat' | 'north_india' | 'south_india' | 'abroad' | 'india_other';
  reason: string;
  isFallback?: boolean;
}

/**
 * Intelligent Regional Language Classifier based on Geography:
 * - Pure Gujarat (Entire Gujarat State): Gujarati ('gu')
 * - North India & Hindi Belt (Delhi/NCR, UP, MP, Rajasthan, Haryana, Punjab, Bihar, etc.): Hindi ('hi')
 * - South India (Tamil Nadu, Karnataka, Kerala, AP, Telangana): English ('en')
 * - Abroad / International (USA, UK, Canada, Australia, UAE, Europe, etc.): English ('en')
 * - Other Indian states: Hindi ('hi') default
 */
export function classifyGeoToLanguage(
  countryCode: string,
  regionName: string,
  cityName: string
): { language: Language; zone: 'gujarat' | 'north_india' | 'south_india' | 'abroad' | 'india_other'; reason: string } {
  const cCode = (countryCode || '').trim().toUpperCase();
  const reg = (regionName || '').toLowerCase().trim();
  const city = (cityName || '').toLowerCase().trim();

  // 1. Outside India -> Abroad (USA, UK, Canada, Australia, UAE, Europe, etc.) -> English ('en')
  if (cCode && cCode !== 'IN' && cCode !== 'INDIA') {
    return {
      language: 'en',
      zone: 'abroad',
      reason: `विदेश / International NRI (${countryCode || 'Outside India'})`
    };
  }

  // 2. Pure Gujarat (Entire Gujarat State) -> Gujarati ('gu')
  const isGujarat =
    reg.includes('gujarat') ||
    reg === 'gj' ||
    city.includes('ahmedabad') ||
    city.includes('surat') ||
    city.includes('vadodara') ||
    city.includes('baroda') ||
    city.includes('rajkot') ||
    city.includes('bhavnagar') ||
    city.includes('jamnagar') ||
    city.includes('junagadh') ||
    city.includes('gandhinagar') ||
    city.includes('mehsana') ||
    city.includes('mahesana') ||
    city.includes('anand') ||
    city.includes('navsari') ||
    city.includes('morbi') ||
    city.includes('nadiad') ||
    city.includes('surendranagar') ||
    city.includes('bharuch') ||
    city.includes('porbandar') ||
    city.includes('godhra') ||
    city.includes('vapi') ||
    city.includes('valsad') ||
    city.includes('bhuj') ||
    city.includes('palanpur') ||
    city.includes('patan') ||
    city.includes('himatnagar') ||
    city.includes('dahod') ||
    city.includes('amreli') ||
    city.includes('botad');

  if (isGujarat) {
    return {
      language: 'gu',
      zone: 'gujarat',
      reason: 'संपूर्ण गुजरात क्षेत्र (Entire Gujarat State) - ગુજરાતી'
    };
  }

  // 3. South India (Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana) -> English ('en')
  const isSouthIndia =
    reg.includes('tamil nadu') ||
    reg.includes('tamilnadu') ||
    reg === 'tn' ||
    reg.includes('karnataka') ||
    reg === 'ka' ||
    reg.includes('kerala') ||
    reg === 'kl' ||
    reg.includes('andhra') ||
    reg === 'ap' ||
    reg.includes('telangana') ||
    reg === 'tg' ||
    reg === 'ts' ||
    reg.includes('puducherry') ||
    reg.includes('pondicherry') ||
    city.includes('bengaluru') ||
    city.includes('bangalore') ||
    city.includes('chennai') ||
    city.includes('madras') ||
    city.includes('hyderabad') ||
    city.includes('kochi') ||
    city.includes('cochin') ||
    city.includes('thiruvananthapuram') ||
    city.includes('trivandrum') ||
    city.includes('visakhapatnam') ||
    city.includes('vizag') ||
    city.includes('coimbatore') ||
    city.includes('mysuru') ||
    city.includes('mysore') ||
    city.includes('kozhikode') ||
    city.includes('calicut') ||
    city.includes('vijayawada') ||
    city.includes('warangal') ||
    city.includes('mangaluru') ||
    city.includes('mangalore');

  if (isSouthIndia) {
    return {
      language: 'en',
      zone: 'south_india',
      reason: 'दक्षिण भारत क्षेत्र (South India: TN, KA, KL, AP, Telangana) - English'
    };
  }

  // 4. North India & Hindi Belt (Delhi / NCR, UP, Rajasthan, MP, Bihar, Haryana, Punjab, Uttarakhand, Himachal, Jharkhand, Chhattisgarh, Chandigarh, J&K) -> Hindi ('hi')
  const isNorthIndiaOrHindi =
    reg.includes('delhi') ||
    reg.includes('nct') ||
    reg === 'dl' ||
    reg.includes('uttar pradesh') ||
    reg === 'up' ||
    reg.includes('rajasthan') ||
    reg === 'rj' ||
    reg.includes('madhya pradesh') ||
    reg === 'mp' ||
    reg.includes('bihar') ||
    reg === 'br' ||
    reg.includes('haryana') ||
    reg === 'hr' ||
    reg.includes('punjab') ||
    reg === 'pb' ||
    reg.includes('uttarakhand') ||
    reg.includes('uttaranchal') ||
    reg === 'uk' ||
    reg.includes('himachal') ||
    reg === 'hp' ||
    reg.includes('jharkhand') ||
    reg === 'jh' ||
    reg.includes('chhattisgarh') ||
    reg === 'cg' ||
    reg === 'ct' ||
    reg.includes('chandigarh') ||
    reg === 'ch' ||
    reg.includes('jammu') ||
    reg.includes('kashmir') ||
    reg === 'jk' ||
    reg.includes('ladakh') ||
    city.includes('delhi') ||
    city.includes('noida') ||
    city.includes('gurgaon') ||
    city.includes('gurugram') ||
    city.includes('faridabad') ||
    city.includes('ghaziabad') ||
    city.includes('lucknow') ||
    city.includes('jaipur') ||
    city.includes('kanpur') ||
    city.includes('bhopal') ||
    city.includes('indore') ||
    city.includes('patna') ||
    city.includes('varanasi') ||
    city.includes('agra') ||
    city.includes('prayagraj') ||
    city.includes('allahabad') ||
    city.includes('dehradun') ||
    city.includes('shimla') ||
    city.includes('chandigarh') ||
    city.includes('ludhiana') ||
    city.includes('amritsar') ||
    city.includes('ranchi') ||
    city.includes('raipur');

  if (isNorthIndiaOrHindi) {
    return {
      language: 'hi',
      zone: 'north_india',
      reason: 'उत्तर भारत व हिंदी पट्टी (Delhi/NCR, UP, MP, Rajasthan, Haryana, Punjab, Bihar etc.) - हिंदी'
    };
  }

  // 5. Default for other Indian states -> Hindi ('hi')
  return {
    language: 'hi',
    zone: 'india_other',
    reason: 'भारत (वैदिक ज्योतिष सार्वभौमिक भाषा) - हिंदी'
  };
}

/**
 * Synchronous initial language detection for 0ms initial render:
 * 1. Checks URL query parameter: ?lang=en, ?lang=gu, ?lang=hi
 * 2. Checks user explicit manual preference in localStorage
 * 3. Checks cached geo-language from current/previous session
 * 4. Checks user timezone/locale:
 *    - In India (Asia/Kolkata / +05:30 offset): default is ALWAYS Hindi ('hi')
 *    - Abroad (outside India): default is English ('en')
 */
export function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'hi';
  }

  // 1. URL Query Parameter override (?lang=en / ?lang=gu / ?lang=hi)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang')?.toLowerCase();
    if (urlLang === 'hi' || urlLang === 'gu' || urlLang === 'en') {
      return urlLang as Language;
    }
  } catch {
    // continue
  }

  // 2. Saved user manual preference in localStorage (if user explicitly clicked toggle)
  try {
    const isManual = localStorage.getItem(STORAGE_MANUAL_SELECTED);
    const savedLang = localStorage.getItem(STORAGE_PREFERRED_LANG) || localStorage.getItem(STORAGE_LEGACY_LANG);
    if (isManual === 'true' && (savedLang === 'hi' || savedLang === 'gu' || savedLang === 'en')) {
      return savedLang as Language;
    }
  } catch {
    // continue
  }

  // 3. Cached Geo-language from previous detection
  try {
    const cachedGeo = sessionStorage.getItem(STORAGE_GEO_LANG) || localStorage.getItem(STORAGE_GEO_LANG);
    if (cachedGeo === 'hi' || cachedGeo === 'gu' || cachedGeo === 'en') {
      return cachedGeo as Language;
    }
  } catch {
    // continue
  }

  // 4. Check browser / device languages for Gujarati preference (gu, gu-IN)
  try {
    const userLanguages = (navigator.languages || [navigator.language || '']).map((l) =>
      (l || '').toLowerCase()
    );
    const hasGujarati = userLanguages.some(
      (l) => l.startsWith('gu') || l.includes('guj') || l.includes('gujarati')
    );
    if (hasGujarati) {
      return 'gu';
    }
  } catch {
    // continue
  }

  // 5. Geolocation / Timezone Detection
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const date = new Date();
    const offsetMinutes = -date.getTimezoneOffset(); // IST is UTC+5:30 (+330 mins)

    const isIndia =
      timeZone === 'Asia/Kolkata' ||
      timeZone === 'Asia/Calcutta' ||
      timeZone.includes('Kolkata') ||
      timeZone.includes('Calcutta') ||
      offsetMinutes === 330;

    if (isIndia) {
      // In India (Delhi, North India, pan-India): Default is ALWAYS Hindi
      return 'hi';
    }

    // Outside India (Abroad: USA, UK, UAE, Canada, Australia, etc.): Default is English
    return 'en';
  } catch {
    return 'hi';
  }
}

/**
 * Checks whether the user has manually selected a language via the header switcher
 */
export function isManualLanguageSelected(): boolean {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_MANUAL_SELECTED) === 'true';
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Saves user preference when they manually switch language or when auto-detected
 */
export function saveLanguagePreference(lang: Language, isManual: boolean = true): void {
  try {
    if (typeof window !== 'undefined') {
      if (isManual) {
        localStorage.setItem(STORAGE_MANUAL_SELECTED, 'true');
        localStorage.setItem(STORAGE_PREFERRED_LANG, lang);
        localStorage.setItem(STORAGE_LEGACY_LANG, lang);
      }
      sessionStorage.setItem(STORAGE_GEO_LANG, lang);
      localStorage.setItem(STORAGE_GEO_LANG, lang);

      // Update HTML lang attribute for accessibility and SEO
      if (document.documentElement) {
        document.documentElement.lang = lang;
      }
    }
  } catch {
    // continue
  }
}

/**
 * Asynchronously detects the user's geographic location & sets the regional language:
 * - Pure Gujarat -> Gujarati ('gu')
 * - North India & Delhi -> Hindi ('hi')
 * - South India -> English ('en')
 * - Abroad / International -> English ('en')
 */
export async function detectGeoLanguageAsync(
  onDetected?: (lang: Language, details: GeoDetectionInfo) => void
): Promise<Language> {
  // If user has already explicitly chosen their preferred language manually, respect their choice
  if (isManualLanguageSelected()) {
    const manualLang = (localStorage.getItem(STORAGE_PREFERRED_LANG) || 'hi') as Language;
    return manualLang;
  }

  // 1. Try our backend /api/geo/detect endpoint
  try {
    const res = await fetch('/api/geo/detect', {
      signal: AbortSignal.timeout(3500),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.language) {
        const detectedLang = data.language as Language;
        saveLanguagePreference(detectedLang, false);
        if (onDetected) {
          onDetected(detectedLang, data);
        }
        return detectedLang;
      }
    }
  } catch {
    // Continue to client-side fallback
  }

  // 2. Client-side HTTPS fallback via freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json', {
      signal: AbortSignal.timeout(3500),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      const d = await res.json();
      if (d && (d.countryCode || d.countryName)) {
        const classification = classifyGeoToLanguage(
          d.countryCode || 'IN',
          d.regionName || '',
          d.cityName || ''
        );
        const detectedLang = classification.language;
        const details: GeoDetectionInfo = {
          country: d.countryName || 'India',
          countryCode: d.countryCode || 'IN',
          region: d.regionName || '',
          city: d.cityName || '',
          language: detectedLang,
          zone: classification.zone,
          reason: classification.reason
        };
        saveLanguagePreference(detectedLang, false);
        if (onDetected) {
          onDetected(detectedLang, details);
        }
        return detectedLang;
      }
    }
  } catch {
    // Continue
  }

  // 3. Final Fallback: Timezone-based
  const fallbackLang = detectInitialLanguage();
  return fallbackLang;
}
