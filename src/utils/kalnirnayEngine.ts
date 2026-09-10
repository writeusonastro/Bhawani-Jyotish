import { calculateVedicKundli } from './vedicCalculations';
import { RASHIS } from '../data/astrologyData';
import { Language } from '../types/astrology';

export interface KalnirnayChoghadiyaSlot {
  name: string;
  nameHi: string;
  nameGu: string;
  nameEn: string;
  type: 'शुभ' | 'अमृत' | 'लाभ' | 'चर' | 'रोग' | 'काल' | 'उद्वेग';
  isAuspicious: boolean;
  effectHi: string;
  effectGu: string;
  effectEn: string;
  startTime: string;
  endTime: string;
  timeWindow: string;
  isCurrent: boolean;
}

export interface KalnirnayPanchangData {
  targetDate: Date;
  dateNumber: number;
  monthNumber: number;
  yearNumber: number;
  // Multi-language date strings
  dateFormattedHi: string;
  dateFormattedGu: string;
  dateFormattedEn: string;
  dayOfWeekHi: string;
  dayOfWeekGu: string;
  dayOfWeekEn: string;
  dayLord: string;
  // Samvat & Eras
  vikramSamvat: string;
  shakaSamvat: string;
  samvatsaraName: string;
  ayan: string;
  ritu: string;
  // Lunar Masa
  amantaMonth: string;
  purnimantaMonth: string;
  paksha: string;
  // Tithi, Nakshatra, Yoga, Karana
  tithi: string;
  tithiEnding: string;
  tithiLord: string;
  nakshatra: string;
  nakshatraCharan: number;
  nakshatraEnding: string;
  nakshatraLord: string;
  yoga: string;
  yogaEnding: string;
  yogaDescription: string;
  karana: string;
  karanaEnding: string;
  // Solar & Planetary
  sunrise: string;
  sunset: string;
  dinmaan: string;
  raatrimaan: string;
  moonSign: string;
  sunSign: string;
  // Disha Shool
  dishaShool: string;
  dishaShoolParihar: string;
  // Muhurats
  abhijitMuhurat: string;
  brahmaMuhurat: string;
  godhuliMuhurat: string;
  vijayaMuhurat: string;
  amritKaal: string;
  rahuKaal: string;
  yamaganda: string;
  gulikaKaal: string;
  durMuhurat: string;
  // Choghadiyas
  dayChoghadiyas: KalnirnayChoghadiyaSlot[];
  nightChoghadiyas: KalnirnayChoghadiyaSlot[];
  currentChoghadiya?: KalnirnayChoghadiyaSlot;
  shubhChoghadiyasSummary: string[];
  // Special Vrats & Festivals
  vratFestival?: string;
  specialMantra: string;
}

export interface DailyRashiDetailedForecast {
  id: number;
  nameHi: string;
  nameGu: string;
  nameEn: string;
  symbol: string;
  lord: string;
  element: string;
  dateLabel: string;
  luckyPercentage: number;
  luckyNumber: number[];
  luckyColor: string;
  luckyStone: string;
  favorableTime: string;
  favorableDirection: string;
  transitInfluence: string;
  predictionToday: string;
  careerToday: string;
  loveToday: string;
  healthToday: string;
  upayToday: string;
  mantra: string;
  cautionToday: string;
}

// Helper: Disha Shool based on day of week (0=Sunday to 6=Saturday)
const DISHA_SHOOL_INFO = [
  { day: 'रविवार', dir: 'पश्चिम (West)', parihar: 'दलिया, घी या पान खाकर प्रस्थान करें।' },
  { day: 'सोमवार', dir: 'पूर्व (East)', parihar: 'दर्पण (शीशा) देखकर अथवा थोड़ा कच्चा दूध पीकर प्रस्थान करें।' },
  { day: 'मंगलवार', dir: 'उत्तर (North)', parihar: 'गुड़ अथवा साबुत धनिया खाकर प्रस्थान करें।' },
  { day: 'बुधवार', dir: 'उत्तर (North)', parihar: 'तिल अथवा गुड़ का सेवन करके प्रस्थान करें।' },
  { day: 'गुरुवार', dir: 'दक्षिण (South)', parihar: 'दही अथवा थोड़ा जीरा खाकर प्रस्थान करें।' },
  { day: 'शुक्रवार', dir: 'पश्चिम (West)', parihar: 'जौ अथवा राई का सेवन करके प्रस्थान करें।' },
  { day: 'शनिवार', dir: 'पूर्व (East)', parihar: 'अदरक अथवा उड़द का दाना खाकर प्रस्थान करें।' }
];

const CHOGHADIYA_DEFINITIONS: Record<string, { isAuspicious: boolean; type: KalnirnayChoghadiyaSlot['type']; effectHi: string; effectGu: string; effectEn: string }> = {
  'अमृत': {
    isAuspicious: true,
    type: 'अमृत',
    effectHi: 'सर्वकार्य सिद्धि, दीर्घायु एवं सर्वोत्तम फलदायी मुहूर्त',
    effectGu: 'સર્વકાર્ય સિદ્ધિ અને ઉત્તમ શુભ ફળદાયી મુહૂર્ત',
    effectEn: 'Best for all auspicious works, initiation, and lasting success'
  },
  'शुभ': {
    isAuspicious: true,
    type: 'शुभ',
    effectHi: 'धार्मिक कार्य, विवाह, अध्ययन एवं मांगलिक कार्यों हेतु श्रेष्ठ',
    effectGu: 'ધાર્મિક કાર્ય અને માંગલિક કાર્યો માટે શ્રેષ્ઠ',
    effectEn: 'Excellent for spiritual deeds, study, and religious rituals'
  },
  'लाभ': {
    isAuspicious: true,
    type: 'लाभ',
    effectHi: 'व्यापार आरंभ, आर्थिक लेनदेन व नवीन अनुबंध हेतु अति उत्तम',
    effectGu: 'વેપાર અને આર્થિક લાભ માટે અતિ ઉત્તમ',
    effectEn: 'Highly beneficial for business, trade, and financial gains'
  },
  'चर': {
    isAuspicious: true,
    type: 'चर',
    effectHi: 'यात्रा, वाहन क्रय, विदेश गमन एवं गतिशील कार्यों हेतु अनुकूल',
    effectGu: 'યાત્રા, પ્રવાસ અને વાહન માટે અનુકૂળ',
    effectEn: 'Favorable for travel, journeys, and dynamic activities'
  },
  'रोग': {
    isAuspicious: false,
    type: 'रोग',
    effectHi: 'अशुभ काल - वाद-विवाद, कर्ज एवं नए कार्यों से बचें',
    effectGu: 'અશુભ કાળ - નવા કાર્યો શરૂ ન કરવા',
    effectEn: 'Inauspicious - avoid contentious matters and new ventures'
  },
  'काल': {
    isAuspicious: false,
    type: 'काल',
    effectHi: 'अशुभ काल - हानि की आशंका, केवल शांत मन से ईष्ट जप करें',
    effectGu: 'અશુભ કાળ - સાવધાની રાખવી',
    effectEn: 'Inauspicious - avoid critical decisions, chant Kuldevi mantra'
  },
  'उद्वेग': {
    isAuspicious: false,
    type: 'उद्वेग',
    effectHi: 'मध्यम/अशुभ काल - मानसिक चिंता, सरकारी कार्यों में संयम रखें',
    effectGu: 'મધ્યમ કાળ - માનસિક ધૈર્ય રાખવું',
    effectEn: 'Caution advised - preserve patience and avoid confrontation'
  }
};

const DAY_CHOGHADIYA_TABLE = [
  ['उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग'], // Sun
  ['अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत'], // Mon
  ['रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल', 'शुभ', 'रोग'], // Tue
  ['लाभ', 'अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ'], // Wed
  ['शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल', 'शुभ'], // Thu
  ['चर', 'लाभ', 'अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग', 'चर'], // Fri
  ['काल', 'शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल']  // Sat
];

const NIGHT_CHOGHADIYA_TABLE = [
  ['शुभ', 'अमृत', 'चर', 'रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ'], // Sun night
  ['चर', 'रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर'], // Mon night
  ['काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग', 'काल'], // Tue night
  ['उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग', 'काल', 'लाभ', 'उद्वेग'], // Wed night
  ['अमृत', 'चर', 'रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत'], // Thu night
  ['रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग'], // Fri night
  ['लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग', 'काल', 'लाभ']  // Sat night
];

// Formatting helper for decimal hour to 12-hour AM/PM string
function formatDecimalHour(hDec: number): string {
  const norm = ((hDec % 24) + 24) % 24;
  const h = Math.floor(norm);
  const m = Math.round((norm - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
}

// Parse "06:18 AM" string to decimal hours
function parseTimeToDecimalHour(timeStr: string): number {
  if (!timeStr) return 6.0;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 6.0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && h < 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h + m / 60;
}

// Calculate Vrat/Festival from lunar tithi & month
function detectVratFestival(tithiNumber: number, isShukla: boolean, hinduMonthName: string): string | undefined {
  // tithiNumber is 1 to 15
  if (tithiNumber === 11) {
    return isShukla ? 'एकादशी व्रत (शुक्ल पक्ष एकादशी)' : 'स्मार्त / भागवत एकादशी व्रत';
  }
  if (tithiNumber === 13) {
    return 'प्रदोष व्रत (शिव आराधना)';
  }
  if (tithiNumber === 14 && !isShukla) {
    return 'मासिक शिवरात्रि व्रत';
  }
  if (tithiNumber === 15 && isShukla) {
    return 'पूर्णिमा व्रत एवं श्री सत्यनारायण कथा पूजन';
  }
  if (tithiNumber === 15 && !isShukla) {
    return 'दर्श अमावस्या एवं सर्वपितृ श्राद्ध/तर्पण';
  }
  if (tithiNumber === 4 && !isShukla) {
    return 'संकष्टी श्री गणेश चतुर्थी व्रत (चंद्रोदय अर्घ्य)';
  }
  if (tithiNumber === 4 && isShukla) {
    return 'विनायक चतुर्थी व्रत';
  }
  if (tithiNumber === 8 && isShukla) {
    return 'मासिक दुर्गाष्टमी व्रत';
  }
  if (tithiNumber === 8 && !isShukla) {
    return 'कालाष्टमी / भैरवाष्टमी व्रत';
  }
  return undefined;
}

// Month names in Hindi, Gujarati, English
const MONTH_NAMES = {
  hi: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  gu: ['જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઓગસ્ટ', 'સપ્ટેમ્બર', 'ઓક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

const DAY_NAMES = {
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  gu: ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

/**
 * Generates an authentic Kalnirnay Panchang for any given date.
 */
export function getKalnirnayPanchang(date: Date = new Date(), cityLat: number = 23.5880, cityLon: number = 72.3693): KalnirnayPanchangData {
  const targetDate = new Date(date);
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const hour = targetDate.getHours();
  const minute = targetDate.getMinutes();
  const currentDecimalHour = hour + minute / 60;
  const dayOfWeekIdx = targetDate.getDay();

  // Run comprehensive Vedic calculation engine
  const kundli = calculateVedicKundli({
    name: "कालनिर्णय पंचांग",
    gender: "male",
    day,
    month,
    year,
    hour: 6, // Sunrise baseline for standard Kalnirnay daily box
    minute: 0,
    cityName: "Mehsana, Gujarat",
    state: "Gujarat",
    latitude: cityLat,
    longitude: cityLon
  });

  const p = kundli.birthPanchang;
  const sunriseDec = parseTimeToDecimalHour(p.sunrise);
  const sunsetDec = parseTimeToDecimalHour(p.sunset);

  // Day & Night duration
  const dayDuration = sunsetDec - sunriseDec;
  const nightDuration = 24 - dayDuration;
  const slotDayDuration = dayDuration / 8;
  const slotNightDuration = nightDuration / 8;

  // Day Choghadiyas calculation
  const dayOrder = DAY_CHOGHADIYA_TABLE[dayOfWeekIdx];
  const dayChoghadiyas: KalnirnayChoghadiyaSlot[] = dayOrder.map((name, idx) => {
    const slotStart = sunriseDec + idx * slotDayDuration;
    const slotEnd = slotStart + slotDayDuration;
    const def = CHOGHADIYA_DEFINITIONS[name] || CHOGHADIYA_DEFINITIONS['शुभ'];
    const isCurrent = currentDecimalHour >= slotStart && currentDecimalHour < slotEnd;
    return {
      name,
      nameHi: name,
      nameGu: name,
      nameEn: name,
      type: def.type,
      isAuspicious: def.isAuspicious,
      effectHi: def.effectHi,
      effectGu: def.effectGu,
      effectEn: def.effectEn,
      startTime: formatDecimalHour(slotStart),
      endTime: formatDecimalHour(slotEnd),
      timeWindow: `${formatDecimalHour(slotStart)} से ${formatDecimalHour(slotEnd)}`,
      isCurrent
    };
  });

  // Night Choghadiyas calculation
  const nightOrder = NIGHT_CHOGHADIYA_TABLE[dayOfWeekIdx];
  const nightChoghadiyas: KalnirnayChoghadiyaSlot[] = nightOrder.map((name, idx) => {
    const slotStart = (sunsetDec + idx * slotNightDuration) % 24;
    const slotEnd = (slotStart + slotNightDuration) % 24;
    const def = CHOGHADIYA_DEFINITIONS[name] || CHOGHADIYA_DEFINITIONS['शुभ'];
    let isCurrent = false;
    if (slotEnd > slotStart) {
      isCurrent = currentDecimalHour >= slotStart && currentDecimalHour < slotEnd;
    } else {
      isCurrent = currentDecimalHour >= slotStart || currentDecimalHour < slotEnd;
    }
    return {
      name,
      nameHi: name,
      nameGu: name,
      nameEn: name,
      type: def.type,
      isAuspicious: def.isAuspicious,
      effectHi: def.effectHi,
      effectGu: def.effectGu,
      effectEn: def.effectEn,
      startTime: formatDecimalHour(slotStart),
      endTime: formatDecimalHour(slotEnd),
      timeWindow: `${formatDecimalHour(slotStart)} से ${formatDecimalHour(slotEnd)}`,
      isCurrent
    };
  });

  const allChoghadiyas = [...dayChoghadiyas, ...nightChoghadiyas];
  const currentChoghadiya = allChoghadiyas.find(c => c.isCurrent);

  // Summary of Shubh Choghadiyas
  const shubhChoghadiyasSummary = dayChoghadiyas
    .filter(c => c.isAuspicious)
    .map(c => `${c.name}: ${c.timeWindow}`)
    .concat(
      nightChoghadiyas
        .filter(c => c.isAuspicious)
        .slice(0, 2)
        .map(c => `${c.name} (रात्रि): ${c.timeWindow}`)
    );

  // Calculate Brahma Muhurat (Approx 1 hour 36 min to 48 min before sunrise)
  const brahmaStart = (sunriseDec - 1.6 + 24) % 24;
  const brahmaEnd = (sunriseDec - 0.8 + 24) % 24;
  const brahmaMuhurat = `${formatDecimalHour(brahmaStart)} से ${formatDecimalHour(brahmaEnd)}`;

  // Godhuli Muhurat (Around sunset)
  const godhuliStart = (sunsetDec - 0.4 + 24) % 24;
  const godhuliEnd = (sunsetDec + 0.4) % 24;
  const godhuliMuhurat = `${formatDecimalHour(godhuliStart)} से ${formatDecimalHour(godhuliEnd)}`;

  // Vijaya Muhurat (Afternoon ~ 02:15 PM - 03:05 PM)
  const vijayaStart = sunriseDec + dayDuration * (9 / 15);
  const vijayaEnd = vijayaStart + (dayDuration / 15);
  const vijayaMuhurat = `${formatDecimalHour(vijayaStart)} से ${formatDecimalHour(vijayaEnd)}`;

  // Amrit Kaal
  const amritKaal = `${formatDecimalHour(sunriseDec + 3.2)} से ${formatDecimalHour(sunriseDec + 4.9)}`;

  // Dur Muhurat
  const durMuhurat = `${formatDecimalHour(sunriseDec + 6.2)} से ${formatDecimalHour(sunriseDec + 7.0)}`;

  const dishaShoolData = DISHA_SHOOL_INFO[dayOfWeekIdx] || DISHA_SHOOL_INFO[0];
  const isShukla = p.paksha === 'शुक्ल पक्ष';
  const tithiNum = p.tithiNumber || 3;
  const vratFestival = detectVratFestival(tithiNum, isShukla, p.amantaMonth || 'भाद्रपद');

  // Multi-language date strings
  const monthIdx = targetDate.getMonth();
  const dateFormattedHi = `${DAY_NAMES.hi[dayOfWeekIdx]}, ${day.toString().padStart(2, '0')} ${MONTH_NAMES.hi[monthIdx]} ${year}`;
  const dateFormattedGu = `${DAY_NAMES.gu[dayOfWeekIdx]}, ${day.toString().padStart(2, '0')} ${MONTH_NAMES.gu[monthIdx]} ${year}`;
  const dateFormattedEn = `${DAY_NAMES.en[dayOfWeekIdx]}, ${day.toString().padStart(2, '0')} ${MONTH_NAMES.en[monthIdx]} ${year}`;

  return {
    targetDate,
    dateNumber: day,
    monthNumber: month,
    yearNumber: year,
    dateFormattedHi,
    dateFormattedGu,
    dateFormattedEn,
    dayOfWeekHi: DAY_NAMES.hi[dayOfWeekIdx],
    dayOfWeekGu: DAY_NAMES.gu[dayOfWeekIdx],
    dayOfWeekEn: DAY_NAMES.en[dayOfWeekIdx],
    dayLord: p.dayLord || 'सूर्य देव',
    vikramSamvat: p.samvatVikram,
    shakaSamvat: p.samvatShaka,
    samvatsaraName: p.samvatsaraName,
    ayan: p.ayan,
    ritu: p.ritu,
    amantaMonth: p.amantaMonth || 'भाद्रपद',
    purnimantaMonth: p.purnimantaMonth || 'आश्विन',
    paksha: p.paksha,
    tithi: p.tithi,
    tithiEnding: p.tithiEnding || 'संध्याकाल तक',
    tithiLord: p.tithiLord,
    nakshatra: p.nakshatra,
    nakshatraCharan: p.nakshatraCharan,
    nakshatraEnding: p.nakshatraEnding || 'सायंकाल तक',
    nakshatraLord: p.nakshatraLord,
    yoga: p.yoga,
    yogaEnding: p.yogaEnding || 'दोपहर तक',
    yogaDescription: p.yogaDescription,
    karana: p.karana,
    karanaEnding: p.karanaEnding || 'मध्याह्न तक',
    sunrise: p.sunrise,
    sunset: p.sunset,
    dinmaan: p.dinmaan,
    raatrimaan: p.raatrimaan,
    moonSign: p.moonSign,
    sunSign: p.sunSign,
    dishaShool: dishaShoolData.dir,
    dishaShoolParihar: dishaShoolData.parihar,
    abhijitMuhurat: p.muhurat?.abhijit || '11:58 AM से 12:48 PM',
    brahmaMuhurat,
    godhuliMuhurat,
    vijayaMuhurat,
    amritKaal,
    rahuKaal: p.muhurat?.rahuKaal || '03:30 PM से 05:00 PM',
    yamaganda: p.muhurat?.yamaganda || '09:15 AM से 10:45 AM',
    gulikaKaal: p.muhurat?.gulikaKaal || '12:25 PM से 02:00 PM',
    durMuhurat,
    dayChoghadiyas,
    nightChoghadiyas,
    currentChoghadiya,
    shubhChoghadiyasSummary,
    vratFestival,
    specialMantra: 'ॐ नमो भगवते वासुदेवाय | ॐ नमः शिवाय | ॐ ह्रीं श्रीं क्लीं महालक्ष्म्यै नमः'
  };
}

/**
 * Calculates dynamic Daily Rashifal for all 12 Zodiac signs for any given date,
 * aligned with the authentic Kalnirnay Panchang and cosmic lunar transits.
 */
export function getDailyRashifalForDate(date: Date = new Date(), lang: Language = 'hi'): {
  panchang: KalnirnayPanchangData;
  forecasts: DailyRashiDetailedForecast[];
} {
  const panchang = getKalnirnayPanchang(date);
  const dayOfWeek = panchang.targetDate.getDay();
  const dateSeed = panchang.dateNumber + panchang.monthNumber * 31 + panchang.yearNumber * 366;

  // Sign Lord Map
  const SIGN_LORDS = [
    'मंगल (Mars)', 'शुक्र (Venus)', 'बुध (Mercury)', 'चंद्र (Moon)',
    'सूर्य (Sun)', 'बुध (Mercury)', 'शुक्र (Venus)', 'मंगल (Mars)',
    'बृहस्पति (Jupiter)', 'शनि (Saturn)', 'शनि (Saturn)', 'बृहस्पति (Jupiter)'
  ];

  // Lucky directions by rashi
  const DIRECTIONS = ['पूर्व दिशा (East)', 'उत्तर-पूर्व (North-East)', 'उत्तर (North)', 'उत्तर-पश्चिम (North-West)', 'पूर्व (East)', 'दक्षिण (South)', 'पश्चिम (West)', 'उत्तर (North)', 'उत्तर-पूर्व (North-East)', 'दक्षिण-पश्चिम (South-West)', 'पश्चिम (West)', 'उत्तर-पूर्व (North-East)'];

  // Favorable hours by day & sign seed
  const TIME_WINDOWS = [
    'प्रातः 07:30 AM से 09:15 AM',
    'प्रातः 09:30 AM से 11:15 AM',
    'मध्याह्न 11:45 AM से 01:15 PM',
    'दोपहर 01:30 PM से 03:00 PM',
    'अपराह्न 03:15 PM से 04:45 PM',
    'सायंकाल 05:30 PM से 07:00 PM',
    'संध्या 07:15 PM से 08:45 PM',
    'रात्रि 09:00 PM से 10:30 PM'
  ];

  // Specific Day-to-Day Remedies based on weekday
  const WEEKDAY_REMEDIES = [
    {
      hi: "सूर्य देव को तांबे के पात्र से रोली-अक्षत मिश्रित जल अर्पित करें एवं गायत्री मंत्र का 11 बार जप करें।",
      gu: "સૂર્યદેવને તાંબાના લોટાથી અર્ઘ્ય આપો અને ગાયત્રી મંત્રનો જાપ કરો.",
      en: "Offer fresh water with kumkum to Lord Surya and chant Gayatri Mantra."
    },
    {
      hi: "भगवान शिव पर कच्चा दूध व जल अर्पित करें और 'ॐ नमः शिवाय' का 108 बार जाप करें।",
      gu: "ભગવાન શિવ પર દૂધ-જળ અર્પણ કરો અને 'ૐ નમઃ શિવાય' નો જાપ કરો.",
      en: "Offer sacred milk & water to Shiva Lingam and chant 'Om Namah Shivaya'."
    },
    {
      hi: "श्री हनुमान जी के सम्मुख चमेली के तेल का दीपक प्रज्वलित करें एवं हनुमान चालीसा का पाठ करें।",
      gu: "હનુમાનજી સમક્ષ ચમેલીના તેલનો દીવો પ્રગટાવી હનુમાન ચાલીસાનો પાઠ કરો.",
      en: "Light a mustard or jasmine oil lamp before Lord Hanuman and recite Hanuman Chalisa."
    },
    {
      hi: "भगवान श्री गणेश जी को 21 दूर्वा अर्पित करें एवं गाय को हरा चारा अथवा पालक खिलाएं।",
      gu: "શ્રી ગણેશજીને 21 દૂર્વા અર્પણ કરો અને ગાયને લીલું ઘાસ ખવડાવો.",
      en: "Offer 21 Durva blades to Lord Ganesha and feed green fodder to a cow."
    },
    {
      hi: "भगवान विष्णु एवं माँ लक्ष्मी की पूजा करें, केले के वृक्ष में जल दें और पीले वस्त्र धारण करें।",
      gu: "ભગવાન વિષ્ણુની પૂજા કરો, પીળા વસ્ત્રો પહેરો અને ગાયને ચણાની દાળ ખવડાવો.",
      en: "Worship Lord Vishnu and offer turmeric water to a banana tree."
    },
    {
      hi: "माँ महालक्ष्मी को सफेद मिष्ठान्न अथवा खीर का भोग लगाएं और श्री सूक्त का पाठ करें।",
      gu: "માતા મહાલક્ષ્મીને ખીરનો ભોગ લગાવો અને શ્રી સૂક્તનો પાઠ કરો.",
      en: "Offer kheer or white sweets to Goddess Mahalakshmi and recite Shri Suktam."
    },
    {
      hi: "शनि देव के सम्मुख सरसों के तेल का दीपक जलाएं और किसी जरूरतमंद को काले तिल अथवा अन्न दान करें।",
      gu: "શનિદેવ સમક્ષ સરસવના તેલનો દીવો કરો અને જરૂરિયાતમંદને દાન કરો.",
      en: "Light a mustard oil lamp for Lord Shani and donate black sesame or food to the needy."
    }
  ];

  const weekdayRemedy = WEEKDAY_REMEDIES[dayOfWeek] || WEEKDAY_REMEDIES[1];

  const forecasts: DailyRashiDetailedForecast[] = RASHIS.map((baseRashi, idx) => {
    // Generate deterministic yet lively dynamic variations for each date
    const hash = (dateSeed * 17 + idx * 23) % 100;
    const luckyPercentage = 75 + (hash % 22); // 75% to 96%
    const timeWindow = TIME_WINDOWS[(dateSeed + idx) % TIME_WINDOWS.length];
    const favDir = DIRECTIONS[idx];

    // Dynamic lucky numbers (ensure distinct numbers)
    const num1 = ((baseRashi.luckyNumber[0] + dayOfWeek + idx) % 9) + 1;
    let num2 = ((num1 * 2 + 3) % 9) + 1;
    if (num2 === num1) {
      num2 = (num1 % 9) + 1;
    }
    const dynamicLuckyNumbers = [num1, num2];

    // Day-specific dynamic outlook text blending transit Moon & date
    let predictionToday = baseRashi.predictionToday;
    let careerToday = baseRashi.careerToday;
    let loveToday = baseRashi.loveToday;
    let healthToday = baseRashi.healthToday;
    let cautionToday = "क्रोध व जल्दबाजी में कोई भी बड़ा वित्तीय अनुबंध न करें। बड़ों का आशीर्वाद लेकर ही नवीन कार्य प्रारंभ करें।";

    const transitInfluence = `${panchang.dateFormattedHi} को ${panchang.paksha} ${panchang.tithi} तथा ${panchang.nakshatra} का योग आपके लिए ${luckyPercentage}% सकारात्मक ऊर्जा का संचार कर रहा है। आज चंद्रमा ${panchang.moonSign} में गोचर कर रहे हैं।`;

    if (lang === 'gu') {
      predictionToday = `${panchang.dateFormattedGu} ના દિવસે તમારી રાશિ પર ${baseRashi.lord} અને ગોચર ચંદ્રની વિશેષ કૃપા રહેવાથી આત્મવિશ્વાસમાં વૃદ્ધિ થશે. અટકેલા કામો પૂર્ણ થવાના પ્રબળ યોગ છે.`;
      careerToday = `નોકરી અને વ્યાપારમાં નવી તકો પ્રાપ્ત થશે. ભાગીદારીમાં સારો લાભ મળશે અને વરિષ્ઠ અધિકારીઓનો સંપૂર્ણ સહયોગ મળશે.`;
      loveToday = `દાંપત્ય જીવનમાં મધુરતા રહેશે. જીવનસાથી સાથે કોઈ શુભ યાત્રાનું આયોજન થઈ શકે છે. પારિવારિક વાતાવરણ આનંદમય રહેશે.`;
      healthToday = `આરોગ્ય ઉત્તમ રહેશે. મોસમી ફેરફારોથી સાવચેત રહેવું અને પ્રાણાયામ તેમજ નિયમિત યોગાસન કરવા.`;
      cautionToday = `ઉતાવળમાં કોઈ પણ મહત્વપૂર્ણ નિર્ણય ન લેવો. વાહન ધીમે ચલાવવું.`;
    } else if (lang === 'en') {
      predictionToday = `On ${panchang.dateFormattedEn}, the transit of Moon in ${panchang.moonSign} alongside ${panchang.paksha} ${panchang.tithi} creates strong favorable planetary vibrations. Expect breakthrough progress in pending projects.`;
      careerToday = `High productivity and strategic networking will yield fruitful results. Financial transactions scheduled during favorable hours (${timeWindow}) will attract prosperity.`;
      loveToday = `Warmth and mutual respect prevail in marital and love relationships. A harmonious family discussion brings emotional peace.`;
      healthToday = `Vital energy remains robust. Maintain adequate hydration and practice gentle mindful breathing for peak focus.`;
      cautionToday = `Avoid signing critical documents in haste during Rahu Kaal (${panchang.rahuKaal}). Seek blessings of parents before leaving.`;
    } else {
      // Hindi detailed description
      predictionToday = `${panchang.dateFormattedHi} को आपकी राशि के स्वामी ${baseRashi.lord} एवं गोचर चंद्रमा की शुभ दृष्टि से मन में नव उत्साह रहेगा। सोचे हुए कार्यों में अप्रत्याशित सफलता मिलने के संकेत हैं। धर्म-कर्म में रुचि बढ़ेगी।`;
      careerToday = `कार्यक्षेत्र में आपकी कार्यशैली की प्रशंसा होगी। व्यापारी वर्ग के लिए नए ग्राहकों से संपर्क लाभप्रद रहेगा। आर्थिक दृष्टिकोण से दिन अनुकूल है।`;
      loveToday = `जीवनसाथी का पूर्ण सहयोग प्राप्त होगा। अविवाहितों के लिए विवाह संबंधी शुभ चर्चाएं आगे बढ़ सकती हैं। परिवार में उत्सव जैसा वातावरण रहेगा।`;
      healthToday = `ऊर्जा स्तर उच्च रहेगा। पुरानी किसी स्वास्थ्य समस्या में राहत मिलेगी। खानपान में शुद्धता और सात्विकता बनाए रखें।`;
    }

    const upayToday = `${weekdayRemedy[lang] || weekdayRemedy.hi} साथ ही ${baseRashi.nameHi} राशि के जातक आज ${baseRashi.luckyColor} वस्त्र अथवा तिलक धारण करें।`;

    const mantras = [
      "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
      "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
      "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
      "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः",
      "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
      "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
      "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
      "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
      "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
      "ॐ प्रां प्रीं प्रौં सः शनैश्चराय नमः",
      "ॐ प्रां प्रीं प्रौં सः शनैश्चराय नमः",
      "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः"
    ];

    return {
      id: baseRashi.id,
      nameHi: baseRashi.nameHi,
      nameGu: baseRashi.nameGu,
      nameEn: baseRashi.nameEn,
      symbol: baseRashi.symbol,
      lord: baseRashi.lord,
      element: baseRashi.element,
      dateLabel: lang === 'en' ? panchang.dateFormattedEn : lang === 'gu' ? panchang.dateFormattedGu : panchang.dateFormattedHi,
      luckyPercentage,
      luckyNumber: dynamicLuckyNumbers,
      luckyColor: baseRashi.luckyColor,
      luckyStone: baseRashi.luckyStone,
      favorableTime: timeWindow,
      favorableDirection: favDir,
      transitInfluence,
      predictionToday,
      careerToday,
      loveToday,
      healthToday,
      upayToday,
      mantra: mantras[idx] || "ॐ नमः शिवाय",
      cautionToday
    };
  });

  return {
    panchang,
    forecasts
  };
}
