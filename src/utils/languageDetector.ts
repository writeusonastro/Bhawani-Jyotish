import { Language } from '../types/astrology';

const STORAGE_KEY = 'bhawani_preferred_language';

/**
 * Intelligent Geo & Browser Language Detector:
 * 1. Checks URL query parameter: ?lang=en, ?lang=gu, ?lang=hi
 * 2. Checks saved user manual preference in localStorage
 * 3. Checks browser/device languages for Gujarati preference (gu, gu-IN)
 * 4. Checks user timezone:
 *    - In India (Asia/Kolkata / +05:30 offset): opens in Hindi ('hi')
 *    - Abroad (USA, UK, UAE, Canada, Singapore, Australia, etc.): opens in English ('en')
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

  // 2. Saved user manual preference in localStorage
  try {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang === 'hi' || savedLang === 'gu' || savedLang === 'en') {
      return savedLang as Language;
    }
  } catch {
    // continue
  }

  // 3. Check browser / device languages for Gujarati
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

  // 4. Geolocation / Timezone Detection
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const isIndiaTimezone =
      timeZone === 'Asia/Kolkata' ||
      timeZone === 'Asia/Calcutta' ||
      timeZone.includes('Kolkata') ||
      timeZone.includes('Calcutta');

    if (isIndiaTimezone) {
      // In India, default to Hindi
      return 'hi';
    }

    // Offset check: IST is UTC+05:30 (+330 minutes)
    const date = new Date();
    const offsetMinutes = -date.getTimezoneOffset();
    if (offsetMinutes === 330) {
      return 'hi';
    }

    // Outside India (Abroad: USA, UK, UAE, Singapore, Canada, South Africa, Australia, Europe):
    // Default to English
    return 'en';
  } catch {
    return 'hi';
  }
}

/**
 * Saves user preference when they manually switch language
 */
export function saveLanguagePreference(lang: Language): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  } catch {
    // continue
  }
}
