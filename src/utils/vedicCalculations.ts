import { 
  KundliInput, 
  KundliResult, 
  GunMilanResult, 
  PlanetPosition, 
  BirthPanchang, 
  AvakahadaChakra, 
  DashaPeriod, 
  VedicYoga, 
  DoshaAnalysis 
} from '../types/astrology';
import { RASHIS, NAKSHATRAS } from '../data/astrologyData';
import { INDIAN_CITIES_DATABASE } from '../data/indianCities';

const RASHI_NAMES = [
  "मेष (Aries)", "वृषभ (Taurus)", "मिथुन (Gemini)", "कर्क (Cancer)",
  "सिंह (Leo)", "कन्या (Virgo)", "तुला (Libra)", "वृश्चिक (Scorpio)",
  "धनु (Sagittarius)", "मकर (Capricorn)", "कुंभ (Aquarius)", "मीन (Pisces)"
];

const RASHI_LORDS = [
  "मंगल (Mars)", "शुक्र (Venus)", "बुध (Mercury)", "चंद्र (Moon)",
  "सूर्य (Sun)", "बुध (Mercury)", "शुक्र (Venus)", "मंगल (Mars)",
  "बृहस्पति (Jupiter)", "शनि (Saturn)", "शनि (Saturn)", "बृहस्पति (Jupiter)"
];

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Convert decimal degrees to ° ' " (DMS) format
export function formatDMS(deg: number): string {
  const d = Math.floor(deg);
  const mFrac = (deg - d) * 60;
  const m = Math.floor(mFrac);
  const s = Math.round((mFrac - m) * 60);
  return `${d}° ${m.toString().padStart(2, '0')}' ${s.toString().padStart(2, '0')}"`;
}

// Convert Date & Time (in IST UTC+5:30) to Julian Day (JD)
function getJulianDayIST(year: number, month: number, day: number, hour: number, minute: number): { jd: number; t: number; utHour: number } {
  let utHour = hour + minute / 60 - 5.5;
  let utDay = day;
  let utMonth = month;
  let utYear = year;

  if (utHour < 0) {
    utHour += 24;
    utDay -= 1;
    if (utDay < 1) {
      utMonth -= 1;
      if (utMonth < 1) {
        utMonth = 12;
        utYear -= 1;
      }
      const daysInMonth = new Date(utYear, utMonth, 0).getDate();
      utDay = daysInMonth;
    }
  } else if (utHour >= 24) {
    utHour -= 24;
    utDay += 1;
    const daysInMonth = new Date(utYear, utMonth, 0).getDate();
    if (utDay > daysInMonth) {
      utDay = 1;
      utMonth += 1;
      if (utMonth > 12) {
        utMonth = 1;
        utYear += 1;
      }
    }
  }

  let y = utYear;
  let m = utMonth;
  const dFrac = utDay + utHour / 24;

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dFrac + b - 1524.5;
  const t = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0

  return { jd, t, utHour };
}

// Lahiri (Chitra Paksha) Ayanamsha in degrees - Indian Astronomical Ephemeris standard
function getLahiriAyanamsha(t: number): number {
  return 23.857092 + 1.396887 * t - 0.000308 * (t * t);
}

// Greenwich Mean Sidereal Time (degrees)
function getGMST(jd: number, t: number): number {
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * (t * t) - (t * t * t) / 38710000;
  return normalizeDeg(gmst);
}

// Angular difference in [-180, 180]
function diffAngle(a2: number, a1: number): number {
  let diff = a2 - a1;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return diff;
}

// Calculate Sidereal Ascendant (Lagna) - Correct Spherical Trigonometry
function calculateLagna(jd: number, t: number, ayanamsha: number, lat: number, lon: number): number {
  const gmst = getGMST(jd, t);
  const ramc = normalizeDeg(gmst + lon); // Local Sidereal Time in degrees
  const eps = (23.4392911 - 0.0130042 * t) * DEG_TO_RAD; // Obliquity of ecliptic
  const theta = ramc * DEG_TO_RAD;
  const phi = lat * DEG_TO_RAD;

  // Exact East-rising Ascendant formula:
  // tan(lambda) = cos(theta) / (-sin(theta)*cos(eps) - tan(phi)*sin(eps))
  const y = Math.cos(theta);
  const x = -Math.sin(theta) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
  let ascTropical = Math.atan2(y, x) * RAD_TO_DEG;
  ascTropical = normalizeDeg(ascTropical);

  const ascSidereal = normalizeDeg(ascTropical - ayanamsha);
  return ascSidereal;
}

// Calculate Sun position (Sidereal & Apparent Tropical) with equation of center and aberration
function calculateSun(t: number, ayanamsha: number): { siderealDeg: number; tropicalDeg: number; isRetrograde: boolean; speedDeg: number; speedDms: string } {
  const L0 = normalizeDeg(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
  const M = normalizeDeg(357.52911 + 35999.05029 * t - 0.0001537 * t * t) * DEG_TO_RAD;
  const C = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(M) +
            (0.019993 - 0.000101 * t) * Math.sin(2 * M) +
            0.000289 * Math.sin(3 * M);
  const trueLong = normalizeDeg(L0 + C);
  const omega = normalizeDeg(125.04 - 1934.136 * t) * DEG_TO_RAD;
  const apparentLong = normalizeDeg(trueLong - 0.00569 - 0.00478 * Math.sin(omega));
  const siderealDeg = normalizeDeg(apparentLong - ayanamsha);

  return {
    siderealDeg,
    tropicalDeg: apparentLong,
    isRetrograde: false,
    speedDeg: 0.9856,
    speedDms: '+0° 59\' / दिन'
  };
}

// Calculate Moon position (Sidereal) with 38-term Delaunay series & daily motion
function calculateMoon(t: number, ayanamsha: number): { siderealDeg: number; isRetrograde: boolean; speedDeg: number; speedDms: string } {
  const evalMoonTropical = (centuries: number): number => {
    const L = normalizeDeg(218.3164477 + 481267.88128 * centuries);
    const D = normalizeDeg(297.8501921 + 445267.11140 * centuries) * DEG_TO_RAD;
    const M = normalizeDeg(357.5291092 + 35999.05029 * centuries) * DEG_TO_RAD;
    const Mm = normalizeDeg(134.9633964 + 477198.86750 * centuries) * DEG_TO_RAD;
    const F = normalizeDeg(93.2720950 + 483202.01752 * centuries) * DEG_TO_RAD;

    const lTerms = 6.288774 * Math.sin(Mm) +
                   1.274027 * Math.sin(2 * D - Mm) +
                   0.658314 * Math.sin(2 * D) +
                   0.213618 * Math.sin(2 * Mm) -
                   0.185116 * Math.sin(M) -
                   0.114332 * Math.sin(2 * F) +
                   0.058793 * Math.sin(2 * D - 2 * Mm) +
                   0.057066 * Math.sin(2 * D - M - Mm) +
                   0.053322 * Math.sin(2 * D + Mm) +
                   0.046153 * Math.sin(2 * D - M) -
                   0.034728 * Math.sin(D) -
                   0.030383 * Math.sin(M + Mm) +
                   0.015327 * Math.sin(2 * D - 2 * F) -
                   0.012528 * Math.sin(2 * F + Mm) +
                   0.010980 * Math.sin(2 * F - Mm) +
                   0.010675 * Math.sin(4 * D - Mm) +
                   0.010463 * Math.sin(2 * D - 3 * Mm) -
                   0.008621 * Math.sin(2 * D + M - Mm) +
                   0.008007 * Math.sin(2 * D - M - 2 * F) +
                   0.007610 * Math.sin(2 * D - Mm - 2 * F) +
                   0.007486 * Math.sin(M - 2 * F) -
                   0.006782 * Math.sin(2 * D + 2 * Mm) +
                   0.006444 * Math.sin(2 * D - 2 * M) -
                   0.005163 * Math.sin(D - M) +
                   0.004987 * Math.sin(2 * D + M) +
                   0.004003 * Math.sin(3 * Mm) +
                   0.004016 * Math.sin(2 * D - 3 * Mm) +
                   0.003958 * Math.sin(Mm - 2 * F) +
                   0.003215 * Math.sin(2 * Mm - 2 * F) +
                   0.003202 * Math.sin(2 * D - M - 2 * F) -
                   0.002955 * Math.sin(2 * D + M) +
                   0.002740 * Math.sin(2 * D - 2 * Mm - M) +
                   0.002494 * Math.sin(4 * D - 2 * Mm) +
                   0.002424 * Math.sin(2 * D - 2 * M) +
                   0.002247 * Math.sin(2 * D - 2 * F + Mm);

    return normalizeDeg(L + lTerms);
  };

  const tropMoon = evalMoonTropical(t);
  const sidereal = normalizeDeg(tropMoon - ayanamsha);

  // Motion rate over 0.01 day (14.4 mins)
  const dt = 0.01 / 36525.0;
  const tropMoon2 = evalMoonTropical(t + dt);
  const rawSpeed = diffAngle(tropMoon2, tropMoon) / 0.01;
  const speedDeg = Math.round(rawSpeed * 100) / 100;
  const speedDegFloor = Math.floor(speedDeg);
  const speedMin = Math.round((speedDeg - speedDegFloor) * 60);
  const speedDms = `+${speedDegFloor}° ${speedMin.toString().padStart(2, '0')}' / दिन`;

  return { siderealDeg: sidereal, isRetrograde: false, speedDeg, speedDms };
}

// Accurate Keplerian Ephemeris Solver for Mars, Mercury, Jupiter, Venus, Saturn
function calculatePlanet(
  t: number,
  ayanamsha: number,
  sunTropLong: number,
  elements: {
    key: string;
    a0: number; aRate: number;
    e0: number; eRate: number;
    i0: number; iRate: number;
    l0: number; lRate: number;
    w0: number; wRate: number;
    node0: number; nodeRate: number;
  }
): { siderealDeg: number; isRetrograde: boolean; speedDeg: number; speedDms: string } {
  const getGeoLong = (centuries: number): number => {
    const a = elements.a0 + elements.aRate * centuries;
    const e = elements.e0 + elements.eRate * centuries;
    const i = (elements.i0 + elements.iRate * centuries) * DEG_TO_RAD;
    let L = normalizeDeg(elements.l0 + elements.lRate * centuries);
    const w = normalizeDeg(elements.w0 + elements.wRate * centuries);
    const node = normalizeDeg(elements.node0 + elements.nodeRate * centuries) * DEG_TO_RAD;

    // Jupiter & Saturn Mutual Perturbations (The Great Inequality: 5*L_sat - 2*L_jup)
    if (elements.key === 'Jupiter' || elements.key === 'Saturn') {
      const lJup = normalizeDeg(34.40438 + 3034.746128 * centuries);
      const lSat = normalizeDeg(49.94432 + 1222.493622 * centuries);
      const V = (5 * lSat - 2 * lJup - 67.9) * DEG_TO_RAD;
      if (elements.key === 'Jupiter') {
        const dL = -0.332 * Math.sin(V) - 0.056 * Math.sin(2 * V);
        L = normalizeDeg(L + dL);
      } else {
        const dL = 0.812 * Math.sin(V) + 0.171 * Math.sin(2 * V);
        L = normalizeDeg(L + dL);
      }
    }

    const M = normalizeDeg(L - w) * DEG_TO_RAD;

    // Solve Kepler's Equation: E - e*sin(E) = M via Newton-Raphson
    let E = M;
    for (let iter = 0; iter < 12; iter++) {
      const deltaE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      E -= deltaE;
      if (Math.abs(deltaE) < 1e-7) break;
    }

    // True anomaly and radius
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(Math.max(0, 1 - e * e)) * Math.sin(E);
    const v = Math.atan2(yv, xv);
    const r = Math.sqrt(xv * xv + yv * yv);

    // Heliocentric coordinates in ecliptic plane
    const u = v + (w * DEG_TO_RAD) - node;
    const xh = r * (Math.cos(node) * Math.cos(u) - Math.sin(node) * Math.sin(u) * Math.cos(i));
    const yh = r * (Math.sin(node) * Math.cos(u) + Math.cos(node) * Math.sin(u) * Math.cos(i));
    const zh = r * (Math.sin(u) * Math.sin(i));

    // Earth's heliocentric position from Sun apparent tropical longitude
    // (Sun tropical is direction from Earth to Sun, Earth from Sun is opposite: +180 deg)
    const earthTrop = normalizeDeg(sunTropLong + 180.0) * DEG_TO_RAD;
    const re = 1.000001018; // approx 1 AU
    const xe = re * Math.cos(earthTrop);
    const ye = re * Math.sin(earthTrop);

    // Geocentric vector
    const xg = xh - xe;
    const yg = yh - ye;
    const zg = zh;

    const geoLong = normalizeDeg(Math.atan2(yg, xg) * RAD_TO_DEG);
    return geoLong;
  };

  const geoLong1 = getGeoLong(t);
  const siderealDeg = normalizeDeg(geoLong1 - ayanamsha);

  // Numerical rate of change over 0.01 days (14.4 minutes)
  const dt = 0.01 / 36525.0;
  const geoLong2 = getGeoLong(t + dt);
  const rawSpeed = diffAngle(geoLong2, geoLong1) / 0.01;
  const speedDeg = Math.round(rawSpeed * 100) / 100;
  const isRetrograde = speedDeg < 0;

  const absSpeed = Math.abs(speedDeg);
  const degInt = Math.floor(absSpeed);
  const minInt = Math.round((absSpeed - degInt) * 60);
  const signStr = speedDeg >= 0 ? '+' : '-';
  const vakriLabel = isRetrograde ? ' (वक्र)' : '';
  const speedDms = `${signStr}${degInt}° ${minInt.toString().padStart(2, '0')}' / दिन${vakriLabel}`;

  return { siderealDeg, isRetrograde, speedDeg, speedDms };
}

// Rahu (Mean Node) and Ketu (Exact opposite, Retrograde)
function calculateNodes(t: number, ayanamsha: number): { rahu: number; ketu: number; speedDms: string } {
  const meanNode = normalizeDeg(125.04452 - 1934.136261 * t + 0.0020708 * t * t);
  const siderealRahu = normalizeDeg(meanNode - ayanamsha);
  const siderealKetu = normalizeDeg(siderealRahu + 180.0);
  return { rahu: siderealRahu, ketu: siderealKetu, speedDms: '-0° 03\' / दिन (वक्र)' };
}

// Calculate Exact Planetary Dignity
function getPlanetaryDignity(planetKey: string, rashiIdx: number, degreeInRashi: number): PlanetPosition['dignity'] {
  switch (planetKey) {
    case 'Sun':
      if (rashiIdx === 0 && degreeInRashi <= 10) return 'उच्च (Exalted)';
      if (rashiIdx === 6 && degreeInRashi <= 10) return 'नीच (Debilitated)';
      if (rashiIdx === 4) return 'स्वराशि (Own)';
      if ([8, 11, 7, 3].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([1, 6, 9, 10].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'Moon':
      if (rashiIdx === 1 && degreeInRashi <= 3) return 'उच्च (Exalted)';
      if (rashiIdx === 7 && degreeInRashi <= 3) return 'नीच (Debilitated)';
      if (rashiIdx === 3) return 'स्वराशि (Own)';
      if ([0, 4, 2, 5].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([8, 11, 9, 10].includes(rashiIdx)) return 'सम (Neutral)';
      return 'शत्रु (Enemy)';

    case 'Mars':
      if (rashiIdx === 9 && degreeInRashi <= 28) return 'उच्च (Exalted)';
      if (rashiIdx === 3 && degreeInRashi <= 28) return 'नीच (Debilitated)';
      if ([0, 7].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([4, 8, 11, 3].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([2, 5].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'Mercury':
      if (rashiIdx === 5 && degreeInRashi <= 15) return 'उच्च (Exalted)';
      if (rashiIdx === 11 && degreeInRashi <= 15) return 'नीच (Debilitated)';
      if ([2, 5].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([4, 1, 6].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([3].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'Jupiter':
      if (rashiIdx === 3 && degreeInRashi <= 5) return 'उच्च (Exalted)';
      if (rashiIdx === 9 && degreeInRashi <= 5) return 'नीच (Debilitated)';
      if ([8, 11].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([0, 4, 7].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([2, 5, 1, 6].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'Venus':
      if (rashiIdx === 11 && degreeInRashi <= 27) return 'उच्च (Exalted)';
      if (rashiIdx === 5 && degreeInRashi <= 27) return 'नीच (Debilitated)';
      if ([1, 6].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([2, 5, 9, 10].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([4, 3].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'Saturn':
      if (rashiIdx === 6 && degreeInRashi <= 20) return 'उच्च (Exalted)';
      if (rashiIdx === 0 && degreeInRashi <= 20) return 'नीच (Debilitated)';
      if ([9, 10].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([2, 5, 1, 6].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([4, 3, 0, 7].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'Rahu':
      if ([1, 2].includes(rashiIdx)) return 'उच्च (Exalted)';
      if ([7, 8].includes(rashiIdx)) return 'नीच (Debilitated)';
      if (rashiIdx === 10) return 'स्वराशि (Own)';
      if ([1, 6, 2, 5].includes(rashiIdx)) return 'मित्र (Friendly)';
      return 'शत्रु (Enemy)';

    case 'Ketu':
      if ([7, 8].includes(rashiIdx)) return 'उच्च (Exalted)';
      if ([1, 2].includes(rashiIdx)) return 'नीच (Debilitated)';
      if (rashiIdx === 7) return 'स्वराशि (Own)';
      if ([0, 4, 8, 11].includes(rashiIdx)) return 'मित्र (Friendly)';
      return 'शत्रु (Enemy)';

    default:
      return 'सम (Neutral)';
  }
}

// Calculate Baladi Avastha of a Planet
function getPlanetaryAvastha(degreeInRashi: number, rashiIdx: number): PlanetPosition['avastha'] {
  const isOddSign = [0, 2, 4, 6, 8, 10].includes(rashiIdx);
  const d = degreeInRashi;

  if (isOddSign) {
    if (d < 6) return 'बाल (Infant)';
    if (d < 12) return 'कुमार (Youth)';
    if (d < 18) return 'युवा (Adult)';
    if (d < 24) return 'वृद्ध (Elder)';
    return 'मृत (Feeble)';
  } else {
    if (d < 6) return 'मृत (Feeble)';
    if (d < 12) return 'वृद्ध (Elder)';
    if (d < 18) return 'युवा (Adult)';
    if (d < 24) return 'कुमार (Youth)';
    return 'बाल (Infant)';
  }
}

// Navamsha (D-9) Rashi Index
function calculateNavamshaRashi(siderealDeg: number): number {
  const rashiIdx = Math.floor(siderealDeg / 30);
  const degInRashi = siderealDeg % 30;
  const navamshaIdxInRashi = Math.floor(degInRashi / (30 / 9));

  // Fire signs (Aries 0, Leo 4, Sag 8) -> Start from Aries (0)
  // Earth signs (Taurus 1, Virgo 5, Cap 9) -> Start from Cap (9)
  // Air signs (Gemini 2, Libra 6, Aqua 10) -> Start from Libra (6)
  // Water signs (Cancer 3, Scorpio 7, Pisces 11) -> Start from Cancer (3)
  let startSign = 0;
  if ([0, 4, 8].includes(rashiIdx)) startSign = 0;
  else if ([1, 5, 9].includes(rashiIdx)) startSign = 9;
  else if ([2, 6, 10].includes(rashiIdx)) startSign = 6;
  else if ([3, 7, 11].includes(rashiIdx)) startSign = 3;

  return (startSign + navamshaIdxInRashi) % 12;
}

// Nakshatra Lords & First Syllables (Aksharas) for Child Naming
const NAKSHATRA_LORDS = [
  'केतु (Ketu)', 'शुक्र (Venus)', 'सूर्य (Sun)', 'चंद्र (Moon)', 'मंगल (Mars)', 'राहु (Rahu)', 
  'बृहस्पति (Jupiter)', 'शनि (Saturn)', 'बुध (Mercury)', 'केतु (Ketu)', 'शुक्र (Venus)', 'सूर्य (Sun)', 
  'चंद्र (Moon)', 'मंगल (Mars)', 'राहु (Rahu)', 'बृहस्पति (Jupiter)', 'शनि (Saturn)', 'बुध (Mercury)', 
  'केतु (Ketu)', 'शुक्र (Venus)', 'सूर्य (Sun)', 'चंद्र (Moon)', 'मंगल (Mars)', 'राहु (Rahu)', 
  'बृहस्पति (Jupiter)', 'शनि (Saturn)', 'बुध (Mercury)'
];

const NAKSHATRA_AKSHARAS: { [key: number]: [string, string, string, string] } = {
  0: ['चू', 'चे', 'चो', 'ला'],      // Ashwini
  1: ['ली', 'लू', 'ले', 'लो'],      // Bharani
  2: ['अ', 'ई', 'ऊ', 'ए'],          // Krittika
  3: ['ओ', 'वा', 'वी', 'वू'],        // Rohini
  4: ['वे', 'वो', 'का', 'की'],      // Mrigashira
  5: ['कु', 'घ', 'ङ', 'छ'],         // Ardra
  6: ['के', 'को', 'हा', 'ही'],      // Punarvasu
  7: ['हू', 'हे', 'हो', 'डा'],      // Pushya
  8: ['डी', 'डू', 'डे', 'डो'],      // Ashlesha
  9: ['मा', 'मी', 'मू', 'मे'],      // Magha
  10: ['मो', 'टा', 'टी', 'टू'],     // Purva Phalguni
  11: ['टे', 'टो', 'पा', 'पी'],     // Uttara Phalguni
  12: ['पू', 'ष', 'ण', 'ठ'],        // Hasta
  13: ['पे', 'पो', 'रा', 'री'],     // Chitra
  14: ['रू', 'रे', 'रो', 'ता'],     // Swati
  15: ['ती', 'तू', 'ते', 'तो'],     // Vishakha
  16: ['ना', 'नी', 'नू', 'ने'],     // Anuradha
  17: ['नो', 'या', 'यी', 'यू'],     // Jyeshtha
  18: ['ये', 'यो', 'भा', 'भी'],     // Mula
  19: ['भू', 'धा', 'फा', 'ढा'],     // Purva Ashadha
  20: ['भे', 'भो', 'जा', 'जी'],     // Uttara Ashadha
  21: ['खी', 'खू', 'खे', 'खो'],     // Shravana
  22: ['गा', 'गी', 'गु', 'गे'],     // Dhanishta
  23: ['गो', 'सा', 'सी', 'सू'],     // Shatabhisha
  24: ['से', 'सो', 'दा', 'दी'],     // Purva Bhadrapada
  25: ['दू', 'थ', 'झ', 'ञ'],        // Uttara Bhadrapada
  26: ['दे', 'दो', 'चा', 'ची']      // Revati
};

// 27 Vedic Nitya Yogas & Meanings
const VEDIC_YOGAS = [
  { name: 'विष्कुम्भ (Vishkumbha)', desc: 'विजयी, शत्रु विजयी, दृढ़ निश्चयी एवं पराक्रमी स्वभाव।' },
  { name: 'प्रीति (Priti)', desc: 'परम शुभ, लोकप्रिय, सौम्य व्यवहार व दांपत्य जीवन में अपार स्नेह।' },
  { name: 'आयुष्मान (Ayushman)', desc: 'दीर्घायु, उत्तम आरोग्य, कीर्ति व धन-धान्य की निरंतर वृद्धि।' },
  { name: 'सौभाग्य (Saubhagya)', desc: 'भाग्यवान, सर्वगुण सम्पन्न, पारिवारिक सुख व सामाजिक प्रतिष्ठा।' },
  { name: 'शोभन (Shobhana)', desc: 'सुंदर रूप, आकर्षक व्यक्तित्व, धार्मिक आचरण व सदा प्रसन्नचित्त।' },
  { name: 'अतिगण्ड (Atiganda)', desc: 'संघर्षशील, कठिन परिस्थितियों से जूझकर सफलता प्राप्त करने वाला।' },
  { name: 'सुकर्मा (Sukarma)', desc: 'अत्यंत शुभ, श्रेष्ठ कर्म, परोपकार, व्यवसाय में वृद्धि व यश लाभ।' },
  { name: 'धृति (Dhriti)', desc: 'धैर्यवान, गंभीर, विद्या व बुद्धि से जटिल कार्यों को सिद्ध करने वाला।' },
  { name: 'शूल (Shoola)', desc: 'साहसी व पराक्रमी, स्वास्थ्य के प्रति सजग रहना हितकर।' },
  { name: 'गण्ड (Ganda)', desc: 'परिश्रमी, गूढ़ विद्याओं का ज्ञाता, आत्मबल से उन्नति पाने वाला।' },
  { name: 'वृद्धि (Vriddhi)', desc: 'अत्यंत शुभ, धन, व्यापार, संतान एवं यश में दिन-दूनी वृद्धि योग।' },
  { name: 'ध्रुव (Dhruva)', desc: 'अटल, स्थिर संपत्ति, राज्य पक्ष से मान-सम्मान व उच्च पद प्राप्ति।' },
  { name: 'व्याघात (Vyaghata)', desc: 'साहसी, निडर, सेना/प्रशासन में कुशल नेतृत्वकर्ता।' },
  { name: 'हर्षण (Harshana)', desc: 'आनंदित, कलाप्रेमी, विनोदी स्वभाव व सर्वप्रिय जातक।' },
  { name: 'वज्र (Vajra)', desc: 'दृढ़ इच्छाशक्ति, शक्तिशाली, कठिन चुनौती पर विजय पाने वाला।' },
  { name: 'सिद्धि (Siddhi)', desc: 'सर्वकार्य सिद्धिकारक, मंत्र-साधना, ज्ञान व धन का अक्षय भंडार।' },
  { name: 'व्यतीपात (Vyatipata)', desc: 'संघर्षोपरांत महान सफलता, धैर्य व दान-पुण्य से भाग्योदय।' },
  { name: 'वरीयान (Variyan)', desc: 'ऐश्वर्यशाली, भौतिक सुखों से सम्पन्न, प्रतिष्ठित व विलासी।' },
  { name: 'परिघ (Parigha)', desc: 'रणनीतिकार, गुप्त विद्याओं में निपुण, शत्रुओं पर विजय।' },
  { name: 'शिव (Shiva)', desc: 'परम कल्याणकारी, शिव कृपा पात्र, धर्मनिष्ठ, न्यायप्रिय व विद्वान।' },
  { name: 'सिद्ध (Siddha)', desc: 'अत्यंत शुभ, हर कार्य में शीघ्र सफलता, आध्यात्मिक बल व सिद्धि।' },
  { name: 'साध्य (Sadhya)', desc: 'लक्ष्य केंद्रित, निरंतर साधना से असंभव कार्य को भी संभव करने वाला।' },
  { name: 'शुभ (Shubha)', desc: 'सर्वतोमुखी उन्नति, निर्मल मन, उत्तम स्वास्थ्य व धन लाभ।' },
  { name: 'शुक्ल (Shukla)', desc: 'उज्ज्वल भविष्य, सत्यवादी, तेजस्वी व्यक्तित्व व ईश्वर भक्त।' },
  { name: 'ब्रह्म (Brahma)', desc: 'उच्च कोटि की बुद्धि, वेद-शास्त्रों में रुचि, गुरुजनों का प्रिय।' },
  { name: 'ऐन्द्र / इंद्र (Indra)', desc: 'राजा समान ऐश्वर्य, नेतृत्व क्षमता, शासकीय सम्मान व वैभव।' },
  { name: 'वैधृति (Vaidhriti)', desc: 'परिश्रम से भाग्योदय, जल-संबंधित कार्यों एवं यात्राओं से लाभ।' }
];

// 11 Karanas in Hindu Panchang
const KARANA_NAMES = [
  'बव (Bava)', 'बालव (Balava)', 'कौलव (Kaulava)', 'तैतिल (Taitila)', 
  'गर (Gara)', 'वणिज (Vanija)', 'विष्टि / भद्रा (Vishti/Bhadra)',
  'शकुनि (Shakuni)', 'चतुष्पद (Chatushpada)', 'नाग (Naga)', 'किस्तुघ्न (Kintughna)'
];

// Tithi Lords & Names
const TITHI_NAMES = [
  'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)', 
  'पंचमी (Panchami)', 'षष्ठी (Shashthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)', 
  'नवमी (Navami)', 'दशमी (Dashami)', 'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)', 
  'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'पूर्णिमा (Purnima)',
  'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)', 
  'पंचमी (Panchami)', 'षष्ठी (Shashthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)', 
  'नवमी (Navami)', 'दशमी (Dashami)', 'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)', 
  'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'अमावस्या (Amavasya)'
];

const TITHI_LORDS = [
  'अग्नि देव', 'ब्रह्मा जी', 'माँ गौरी', 'श्री गणेश जी', 'नाग देव', 'कार्तिकेय जी',
  'सूर्य देव', 'शिव जी / रुद्र', 'माँ दुर्गा', 'यमराज', 'भगवान विष्णु', 'भगवान विष्णु / हरि',
  'कामदेव', 'भगवान शिव', 'चंद्र देव',
  'अग्नि देव', 'ब्रह्मा जी', 'माँ गौरी', 'श्री गणेश जी', 'नाग देव', 'कार्तिकेय जी',
  'सूर्य देव', 'शिव जी / रुद्र', 'माँ दुर्गा', 'यमराज', 'भगवान विष्णु', 'भगवान विष्णु / हरि',
  'कामदेव', 'भगवान शिव', 'पितृ देव'
];

// Hindu Lunar Months (Masa)
const HINDU_MONTHS = [
  'चैत्र (Chaitra)', 'वैशाख (Vaishakha)', 'ज्येष्ठ (Jyeshtha)', 'आषाढ़ (Ashadha)',
  'श्रावण (Shravana)', 'भाद्रपद (Bhadrapada)', 'आश्विन (Ashwin)', 'कार्तिक (Kartika)',
  'मार्गशीर्ष (Margashirsha)', 'पौष (Pausha)', 'माघ (Magha)', 'फाल्गुन (Phalguna)'
];

// 60 Samvatsaras (Jovian Cycle)
const SAMVATSARA_NAMES = [
  'प्रभव', 'विभव', 'शुक्ल', 'प्रमोद', 'प्रजापति', 'अंगिरा', 'श्रीमुख', 'भाव', 'युवा', 'धाता',
  'ईश्वर', 'बहुधान्य', 'प्रमाथी', 'विक्रम', 'वृषप्रजा', 'चित्रभानु', 'सुभानु', 'तारण', 'पार्थिव', 'व्यय',
  'सर्वजीत', 'सर्वधारी', 'विरोधी', 'विकृति', 'खर', 'नंदन', 'विजय', 'जय', 'मन्मथ', 'दुर्मुख',
  'हेमलम्ब', 'विलम्ब', 'विकारी', 'शार्वरी', 'प्लव', 'शुभकृत', 'शोभकृत', 'क्रोधी', 'विश्वावसु', 'परावर',
  'प्लवंग', 'कीलक', 'सौम्य', 'साधारण', 'विरोधकृत', 'परिधावी', 'प्रमादी', 'आनंद', 'राक्षस', 'अनल',
  'पिंगल', 'कालयुक्त', 'सिद्धार्थी', 'रौद्र', 'दुर्मति', 'दुन्दुभी', 'रुधिरोद्गारी', 'रक्ताक्ष', 'क्रोधन', 'क्षय'
];

// Astronomical Sunrise & Sunset Calculation (Drik / Hindu Calendar Standard with 90° 50' zenith)
function calculateSunriseSunset(year: number, month: number, day: number, lat: number, lon: number): {
  sunrise: string;
  sunset: string;
  sunriseHour: number;
  sunsetHour: number;
  dayDurationHours: number;
} {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd0 = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
  const t0 = (jd0 - 2451545.0) / 36525.0;

  const L0 = normalizeDeg(280.46646 + 36000.76983 * t0);
  const M = normalizeDeg(357.52911 + 35999.05029 * t0) * DEG_TO_RAD;
  const C = (1.914602 - 0.004817 * t0) * Math.sin(M) + 0.02 * Math.sin(2 * M);
  const sunTrueLong = normalizeDeg(L0 + C) * DEG_TO_RAD;
  const eps = (23.4392911 - 0.0130042 * t0) * DEG_TO_RAD;

  const sinDec = Math.sin(eps) * Math.sin(sunTrueLong);
  const dec = Math.asin(sinDec);
  const cosDec = Math.cos(dec);

  const yTan2 = Math.tan(eps / 2) * Math.tan(eps / 2);
  const eqTimeMin = 4 * RAD_TO_DEG * (
    yTan2 * Math.sin(2 * (L0 * DEG_TO_RAD)) -
    2 * 0.0167086 * Math.sin(M) +
    4 * 0.0167086 * yTan2 * Math.sin(M) * Math.cos(2 * (L0 * DEG_TO_RAD)) -
    0.5 * yTan2 * yTan2 * Math.sin(4 * (L0 * DEG_TO_RAD)) -
    1.25 * 0.0167086 * 0.0167086 * Math.sin(2 * M)
  );

  const latRad = lat * DEG_TO_RAD;
  // Drik Panchang / Hindu Calendar standard zenith: 90° 50' = 90.83333° (34' refraction + 16' semi-diameter)
  const zenithRad = 90.83333 * DEG_TO_RAD;
  const cosH0 = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(dec)) / (Math.cos(latRad) * cosDec);

  let h0Deg = 90;
  if (cosH0 >= 1) h0Deg = 0;
  else if (cosH0 <= -1) h0Deg = 180;
  else h0Deg = Math.acos(cosH0) * RAD_TO_DEG;

  const halfDayHours = h0Deg / 15.0;
  const solarNoonUTC = 12.0 - (lon / 15.0) - (eqTimeMin / 60.0);
  const sunriseUTC = solarNoonUTC - halfDayHours;
  const sunsetUTC = solarNoonUTC + halfDayHours;

  const sunriseIST = sunriseUTC + 5.5; // IST is UTC+5:30
  const sunsetIST = sunsetUTC + 5.5;
  const dayDurationHours = halfDayHours * 2;

  const formatTime = (h: number): string => {
    let hh = ((h % 24) + 24) % 24;
    const hour12 = Math.floor(hh) % 12 || 12;
    const mins = Math.floor((hh - Math.floor(hh)) * 60);
    const ampm = hh >= 12 ? 'PM' : 'AM';
    return `${hour12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  return {
    sunrise: formatTime(sunriseIST),
    sunset: formatTime(sunsetIST),
    sunriseHour: sunriseIST,
    sunsetHour: sunsetIST,
    dayDurationHours
  };
}

// Calculate Birth Choghadiya (दिन एवं रात्रि चौघड़िया)
function calculateBirthChoghadiya(
  dayOfWeek: number, // 0 (Sun) to 6 (Sat)
  birthDecimalHour: number,
  sunriseHour: number,
  sunsetHour: number
): { name: string; type: 'शुभ' | 'अमृत' | 'लाभ' | 'चर' | 'रोग' | 'काल' | 'उद्वेग'; effect: string } {
  const DAY_CHOGHADIYA_ORDER = [
    ['उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग'], // Sun
    ['अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत'], // Mon
    ['रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल', 'शुभ', 'रोग'], // Tue
    ['लाभ', 'अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ'], // Wed
    ['शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल', 'शुभ'], // Thu
    ['चर', 'लाभ', 'अमृत', 'काल', 'शुभ', 'रोग', 'उद्वेग', 'चर'], // Fri
    ['काल', 'शुभ', 'रोग', 'उद्वेग', 'चर', 'लाभ', 'अमृत', 'काल']  // Sat
  ];

  const NIGHT_CHOGHADIYA_ORDER = [
    ['शुभ', 'अमृत', 'चर', 'रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ'], // Sun night
    ['चर', 'रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर'], // Mon night
    ['काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग', 'काल'], // Tue night
    ['उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग', 'काल', 'लाभ', 'उद्वेग'], // Wed night
    ['अमृत', 'चर', 'रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत'], // Thu night
    ['रोग', 'काल', 'लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग'], // Fri night
    ['लाभ', 'उद्वेग', 'शुभ', 'अमृत', 'चर', 'रोग', 'काल', 'लाभ']  // Sat night
  ];

  const isDay = birthDecimalHour >= sunriseHour && birthDecimalHour < sunsetHour;
  let choghadiyaName = 'अमृत';

  if (isDay) {
    const dayLen = sunsetHour - sunriseHour;
    const slotLen = dayLen / 8;
    const slotIdx = Math.min(7, Math.max(0, Math.floor((birthDecimalHour - sunriseHour) / slotLen)));
    choghadiyaName = DAY_CHOGHADIYA_ORDER[dayOfWeek][slotIdx];
  } else {
    let nightElapsed = birthDecimalHour >= sunsetHour ? birthDecimalHour - sunsetHour : birthDecimalHour + 24 - sunsetHour;
    const nightLen = (24 - sunsetHour) + sunriseHour;
    const slotLen = nightLen / 8;
    const slotIdx = Math.min(7, Math.max(0, Math.floor(nightElapsed / slotLen)));
    choghadiyaName = NIGHT_CHOGHADIYA_ORDER[dayOfWeek][slotIdx];
  }

  const effectMap: { [k: string]: { type: 'शुभ' | 'अमृत' | 'लाभ' | 'चर' | 'रोग' | 'काल' | 'उद्वेग'; effect: string } } = {
    'अमृत': { type: 'अमृत', effect: 'सर्वकार्य सिद्धि, दीर्घायु एवं सर्वोच्च शुभ फलदायी' },
    'शुभ': { type: 'शुभ', effect: 'उत्तम स्वास्थ्य, धार्मिक उन्नति एवं सर्वमंगल कारक' },
    'लाभ': { type: 'लाभ', effect: 'व्यापार, धन-धान्य समृद्धि एवं आर्थिक लाभ हेतु श्रेष्ठ' },
    'चर': { type: 'चर', effect: 'गतिशीलता, यात्रा एवं विदेश संवर्धन हेतु अनुकूल' },
    'रोग': { type: 'रोग', effect: 'स्वास्थ्य में सावधानी अपेक्षित, सूर्य उपासना फलदायी' },
    'काल': { type: 'काल', effect: 'हठ व विवाद से बचें, कुलदेवी व शिव पूजन हितकारी' },
    'उद्वेग': { type: 'उद्वेग', effect: 'मानसिक धैर्य आवश्यक, विष्णु सहस्रनाम पाठ श्रेष्ठ' }
  };

  return {
    name: choghadiyaName,
    type: (effectMap[choghadiyaName]?.type || 'शुभ') as any,
    effect: effectMap[choghadiyaName]?.effect || 'सामान्य फलदायी'
  };
}

// Calculate Muhurat Times for the Day (अभिजित, राहुकाल, गुलिक, यमगंड)
function calculateMuhurat(
  dayOfWeek: number,
  sunriseHour: number,
  sunsetHour: number
): { abhijit: string; rahuKaal: string; gulikaKaal: string; yamaganda: string } {
  const dayLen = sunsetHour - sunriseHour;
  const slotLen = dayLen / 8;
  const muhuratLen = dayLen / 15;

  const abhijitStart = sunriseHour + 7 * muhuratLen;
  const abhijitEnd = abhijitStart + muhuratLen;

  const rahuKaalParts = [8, 2, 7, 5, 6, 4, 3];
  const rahuPart = rahuKaalParts[dayOfWeek];
  const rahuStart = sunriseHour + (rahuPart - 1) * slotLen;
  const rahuEnd = rahuStart + slotLen;

  const gulikaParts = [7, 6, 5, 4, 3, 2, 1];
  const gulikaPart = gulikaParts[dayOfWeek];
  const gulikaStart = sunriseHour + (gulikaPart - 1) * slotLen;
  const gulikaEnd = gulikaStart + slotLen;

  const yamaParts = [5, 4, 3, 2, 1, 7, 6];
  const yamaPart = yamaParts[dayOfWeek];
  const yamaStart = sunriseHour + (yamaPart - 1) * slotLen;
  const yamaEnd = yamaStart + slotLen;

  const fmt = (h: number): string => {
    let hh = ((h % 24) + 24) % 24;
    const hour12 = Math.floor(hh) % 12 || 12;
    const mins = Math.floor((hh - Math.floor(hh)) * 60);
    const ampm = hh >= 12 ? 'PM' : 'AM';
    return `${hour12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
  };

  return {
    abhijit: `${fmt(abhijitStart)} से ${fmt(abhijitEnd)}`,
    rahuKaal: `${fmt(rahuStart)} से ${fmt(rahuEnd)}`,
    gulikaKaal: `${fmt(gulikaStart)} से ${fmt(gulikaEnd)}`,
    yamaganda: `${fmt(yamaStart)} से ${fmt(yamaEnd)}`
  };
}

// Calculate Jaimini 7 Chara Karakas
function calculateJaiminiKarakas(planets: PlanetPosition[]): {
  karaka: string;
  karakaHi: string;
  planet: string;
  planetHi: string;
  degree: number;
  dms: string;
}[] {
  const candidateKeys = ['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'बृहस्पति', 'शुक्र', 'शनि'];
  const candidates = planets.filter(p => candidateKeys.some(k => p.planetHi.includes(k) || p.planet.includes(k)));

  const sorted = [...candidates].sort((a, b) => b.degree - a.degree);

  const karakaLabels = [
    { karaka: 'Atmakaraka (AK)', karakaHi: 'आत्मकारक (AK) - आत्मा व स्वरूप' },
    { karaka: 'Amatyakaraka (AmK)', karakaHi: 'अमात्यकारक (AmK) - कर्म व अर्थ' },
    { karaka: 'Bhratrukaraka (BK)', karakaHi: 'भ्रातृकारक (BK) - भ्राता व पराक्रम' },
    { karaka: 'Matrukaraka (MK)', karakaHi: 'मातृकारक (MK) - माता व सुख' },
    { karaka: 'Putrakaraka (PK)', karakaHi: 'पुत्रकारक (PK) - संतान व मेधा' },
    { karaka: 'Gnatikaraka (GK)', karakaHi: 'ज्ञातिकारक (GK) - संघर्ष व रोग' },
    { karaka: 'Darakaraka (DK)', karakaHi: 'दारकारक (DK) - जीवनसाथी व विवाह' }
  ];

  return sorted.slice(0, 7).map((p, idx) => ({
    karaka: karakaLabels[idx]?.karaka || 'कारक',
    karakaHi: karakaLabels[idx]?.karakaHi || 'कारक',
    planet: p.planet,
    planetHi: p.planetHi,
    degree: p.degree,
    dms: p.dms
  }));
}

// Calculate Authentic Parashari Sarvashtakavarga (सर्वाष्टकवर्ग - 337 बिंदु)
function calculateSarvashtakavarga(
  planets: { key: string; rashiIdx: number }[],
  ascendantRashiIdx: number
): { rashi: string; rashiHi: string; rashiNum: number; score: number; status: 'अति शुभ (Excellence)' | 'शुभ (Favorable)' | 'मध्यम (Average)' | 'प्रयास साध्य (Effort Needed)' }[] {
  const rashiMap: { [key: number]: number } = {};
  for (let i = 0; i < 12; i++) rashiMap[i] = 0;

  const pPositions: { [k: string]: number } = {};
  planets.forEach(p => { pPositions[p.key] = p.rashiIdx; });
  const lagnaRashi = ascendantRashiIdx;

  // Classical BPHS Ashtakavarga benefic rules
  const rules: { [pKey: string]: { [refKey: string]: number[] } } = {
    Sun: {
      Sun: [1, 2, 4, 7, 8, 9, 10, 11],
      Moon: [3, 6, 10, 11],
      Mars: [1, 2, 4, 7, 8, 9, 10, 11],
      Mercury: [3, 5, 6, 9, 10, 11, 12],
      Jupiter: [5, 6, 9, 11],
      Venus: [6, 7, 12],
      Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
      Lagna: [3, 4, 6, 10, 11, 12]
    },
    Moon: {
      Sun: [3, 6, 7, 8, 10, 11],
      Moon: [1, 3, 6, 7, 10, 11],
      Mars: [2, 3, 5, 6, 9, 10, 11],
      Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
      Jupiter: [1, 4, 7, 8, 10, 11, 12],
      Venus: [3, 4, 5, 7, 9, 10, 11],
      Saturn: [3, 5, 6, 11],
      Lagna: [3, 6, 10, 11]
    },
    Mars: {
      Sun: [3, 5, 6, 10, 11],
      Moon: [3, 6, 11],
      Mars: [1, 2, 4, 7, 8, 10, 11],
      Mercury: [3, 5, 6, 11],
      Jupiter: [6, 10, 11, 12],
      Venus: [6, 8, 11, 12],
      Saturn: [1, 4, 7, 8, 9, 10, 11],
      Lagna: [1, 3, 6, 10, 11]
    },
    Mercury: {
      Sun: [5, 6, 9, 11, 12],
      Moon: [2, 4, 6, 8, 10, 11],
      Mars: [1, 2, 4, 7, 8, 9, 10, 11],
      Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
      Jupiter: [6, 8, 11, 12],
      Venus: [1, 2, 3, 4, 5, 8, 9, 11],
      Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
      Lagna: [1, 2, 4, 6, 8, 10, 11]
    },
    Jupiter: {
      Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
      Moon: [2, 5, 7, 9, 11],
      Mars: [1, 2, 4, 7, 8, 10, 11],
      Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
      Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
      Venus: [2, 5, 6, 9, 10, 11],
      Saturn: [3, 5, 6, 12],
      Lagna: [1, 2, 4, 5, 6, 7, 9, 10, 11]
    },
    Venus: {
      Sun: [8, 11, 12],
      Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
      Mars: [3, 5, 6, 9, 11, 12],
      Mercury: [3, 5, 6, 9, 11],
      Jupiter: [5, 8, 9, 10, 11],
      Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
      Saturn: [3, 5, 8, 9, 10, 11],
      Lagna: [1, 2, 3, 4, 5, 8, 9, 11]
    },
    Saturn: {
      Sun: [1, 2, 4, 7, 8, 10, 11],
      Moon: [3, 6, 11],
      Mars: [3, 5, 6, 10, 11, 12],
      Mercury: [6, 8, 9, 10, 11, 12],
      Jupiter: [5, 6, 11, 12],
      Venus: [6, 11, 12],
      Saturn: [3, 5, 6, 11],
      Lagna: [1, 3, 4, 6, 10, 11]
    }
  };

  Object.keys(rules).forEach(planet => {
    const planetRules = rules[planet];
    Object.keys(planetRules).forEach(ref => {
      const refSign = ref === 'Lagna' ? lagnaRashi : (pPositions[ref] ?? 0);
      const houses = planetRules[ref];
      houses.forEach(h => {
        const signIdx = (refSign + h - 1) % 12;
        rashiMap[signIdx] = (rashiMap[signIdx] || 0) + 1;
      });
    });
  });

  return Array.from({ length: 12 }).map((_, rIdx) => {
    const score = rashiMap[rIdx] || 28;
    let status: 'अति शुभ (Excellence)' | 'शुभ (Favorable)' | 'मध्यम (Average)' | 'प्रयास साध्य (Effort Needed)' = 'मध्यम (Average)';
    if (score >= 32) status = 'अति शुभ (Excellence)';
    else if (score >= 28) status = 'शुभ (Favorable)';
    else if (score >= 25) status = 'मध्यम (Average)';
    else status = 'प्रयास साध्य (Effort Needed)';

    return {
      rashi: RASHI_NAMES[rIdx],
      rashiHi: RASHI_NAMES[rIdx].split(' ')[0],
      rashiNum: rIdx + 1,
      score,
      status
    };
  });
}

// Calculate Avakahada Chakra
function calculateAvakahadaChakra(moonRashiIdx: number, nakshatraIdx: number, nakshatraCharan: number, moonHouseFromLagna: number): AvakahadaChakra {
  // 1. Varna
  let varna = 'शूद्र (Shudra)';
  if ([3, 7, 11].includes(moonRashiIdx)) varna = 'ब्राह्मण (Brahmin)';
  else if ([0, 4, 8].includes(moonRashiIdx)) varna = 'क्षत्रिय (Kshatriya)';
  else if ([1, 5, 9].includes(moonRashiIdx)) varna = 'वैश्य (Vaishya)';

  // 2. Vashya
  let vashya = 'द्विपद / मानव (Human)';
  if ([0, 1].includes(moonRashiIdx) || (moonRashiIdx === 9 && nakshatraCharan >= 3) || (moonRashiIdx === 8 && nakshatraCharan <= 2)) {
    vashya = 'चतुष्पद (Quadruped)';
  } else if ([3, 11].includes(moonRashiIdx) || (moonRashiIdx === 9 && nakshatraCharan <= 2)) {
    vashya = 'जलचर (Aquatic)';
  } else if (moonRashiIdx === 4) {
    vashya = 'वनचर / सिंह (Wild)';
  } else if (moonRashiIdx === 7) {
    vashya = 'कीट (Insect)';
  }

  // 3. Yoni
  const yoniNames = [
    'अश्व (Horse)', 'गज (Elephant)', 'मेष (Ram)', 'सर्प (Serpent)', 'श्वान (Dog)', 'मार्जार (Cat)',
    'मूषक (Rat)', 'गौ (Cow)', 'महिष (Buffalo)', 'व्याघ्र (Tiger)', 'मृग (Deer)', 'वानर (Monkey)',
    'नकुल (Mongoose)', 'सिंह (Lion)'
  ];
  const yoniMap = [
    0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 7, 11, 12, 0, 13, 7, 1
  ];
  const yoni = yoniNames[yoniMap[nakshatraIdx % 27]] || yoniNames[0];

  // 4. Gana
  const ganaNames = ['देव (Deva)', 'मनुष्य (Manushya)', 'राक्षस (Rakshasa)'];
  const ganaMap = [
    0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0
  ];
  const gana = ganaNames[ganaMap[nakshatraIdx % 27]] || ganaNames[0];

  // 5. Nadi
  const nadiNames = ['आदि (Vata)', 'मध्य (Pitta)', 'अंत्य (Kapha)'];
  const nadiMap = [
    0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2
  ];
  const nadi = nadiNames[nadiMap[nakshatraIdx % 27]] || nadiNames[0];

  // 6. Janma Paya
  let paya = 'ताम्र (Copper) - शुभ';
  if ([1, 6, 11].includes(moonHouseFromLagna)) paya = 'स्वर्ण (Gold) - मध्यम/शांति योग्य';
  else if ([2, 5, 9].includes(moonHouseFromLagna)) paya = 'रजत (Silver) - अति शुभ व भाग्यशाली';
  else if ([3, 7, 10].includes(moonHouseFromLagna)) paya = 'ताम्र (Copper) - उत्तम व शुभ';
  else if ([4, 8, 12].includes(moonHouseFromLagna)) paya = 'लौह (Iron) - संघर्ष व उपाय आवश्यक';

  // 7. Element (Tatva)
  const tatvaMap = ['अग्नि (Fire)', 'पृथ्वी (Earth)', 'वायु (Air)', 'जल (Water)'];
  const tatva = tatvaMap[moonRashiIdx % 4];

  // 8. Rashi Lord
  const rashiLord = RASHI_LORDS[moonRashiIdx];

  // 9. Naming Syllable (Naam Akshar)
  const aksharList = NAKSHATRA_AKSHARAS[nakshatraIdx] || ['अ', 'आ', 'इ', 'ई'];
  const naamAkshar = aksharList[Math.max(0, Math.min(3, nakshatraCharan - 1))];

  return {
    varna,
    vashya,
    yoni,
    gana,
    nadi,
    paya,
    tatva,
    rashiLord,
    naamAkshar
  };
}

// Special Vedic Yogas Detection
function detectVedicYogas(planets: PlanetPosition[], ascendantRashiIdx: number): VedicYoga[] {
  const yogas: VedicYoga[] = [];

  const getPlanet = (key: string) => planets.find(p => p.planet.includes(key));
  const sun = getPlanet('सूर्य');
  const moon = getPlanet('चंद्र');
  const mars = getPlanet('मंगल');
  const mercury = getPlanet('बुध');
  const jupiter = getPlanet('बृहस्पति');
  const venus = getPlanet('शुक्र');
  const saturn = getPlanet('शनि');
  const rahu = getPlanet('राहु');
  const ketu = getPlanet('केतु');

  // 1. Gaja Kesari Yoga (Jupiter in Kendra 1, 4, 7, 10 from Moon)
  if (moon && jupiter) {
    const jupFromMoon = ((jupiter.house - moon.house + 12) % 12) + 1;
    if ([1, 4, 7, 10].includes(jupFromMoon)) {
      yogas.push({
        name: 'गजकेसरी योग (Gaja Kesari Yoga)',
        type: 'शुभ योग (Auspicious)',
        description: 'चंद्रमा से केंद्र (1, 4, 7, 10 भाव) में देवगुरु बृहस्पति स्थित हैं।',
        effect: 'अखंड मान-सम्मान, उच्च पद, बुद्धिमत्ता, समाज में प्रतिष्ठा और दीर्घायु की प्राप्ति।'
      });
    }
  }

  // 2. Budhaditya Yoga (Sun + Mercury in same house)
  if (sun && mercury && sun.house === mercury.house) {
    yogas.push({
      name: 'बुधादित्य योग (Budhaditya Yoga)',
      type: 'शुभ योग (Auspicious)',
      description: 'सूर्य एवं बुध का एक ही भाव में युति संबंध बना हुआ है।',
      effect: 'प्रखर बुद्धि, उच्च तार्किक क्षमता, प्रशासनिक व व्यावसायिक क्षेत्र में प्रचुर यश।'
    });
  }

  // 3. Pancha Mahapurusha Yogas (Mars: Ruchaka, Mercury: Bhadra, Jupiter: Hamsa, Venus: Malavya, Saturn: Sasha)
  // Condition: Planet in Own/Exalted sign AND in Kendra (1, 4, 7, 10)
  if (mars && [1, 4, 7, 10].includes(mars.house) && (mars.dignity.includes('Exalted') || mars.dignity.includes('Own') || mars.dignity.includes('उच्च') || mars.dignity.includes('स्वराशि'))) {
    yogas.push({
      name: 'रुचक महापुरुष योग (Ruchaka Yoga)',
      type: 'राजयोग (Raj Yoga)',
      description: 'मंगल अपनी उच्च अथवा स्वराशि में होकर केंद्र भाव में स्थित हैं।',
      effect: 'अपार साहस, भूमि-भवन का सुख, नेतृत्व क्षमता और सेना/प्रशासन में शीर्ष पद।'
    });
  }

  if (mercury && [1, 4, 7, 10].includes(mercury.house) && (mercury.dignity.includes('Exalted') || mercury.dignity.includes('Own') || mercury.dignity.includes('उच्च') || mercury.dignity.includes('स्वराशि'))) {
    yogas.push({
      name: 'भद्र महापुरुष योग (Bhadra Yoga)',
      type: 'राजयोग (Raj Yoga)',
      description: 'बुध अपनी उच्च अथवा स्वराशि में होकर केंद्र भाव में स्थित हैं।',
      effect: 'असाधारण वाकपटुता, व्यापार में अभूतपूर्व सफलता, दीर्घायु और विद्वत्ता।'
    });
  }

  if (jupiter && [1, 4, 7, 10].includes(jupiter.house) && (jupiter.dignity.includes('Exalted') || jupiter.dignity.includes('Own') || jupiter.dignity.includes('उच्च') || jupiter.dignity.includes('स्वराशि'))) {
    yogas.push({
      name: 'हंस महापुरुष योग (Hamsa Yoga)',
      type: 'राजयोग (Raj Yoga)',
      description: 'बृहस्पति अपनी उच्च अथवा स्वराशि में होकर केंद्र भाव में स्थित हैं।',
      effect: 'परम धार्मिक, आध्यात्मिक प्रतिष्ठा, समाज में पूज्यनीय स्थान और सुखी गृहस्थ।'
    });
  }

  if (venus && [1, 4, 7, 10].includes(venus.house) && (venus.dignity.includes('Exalted') || venus.dignity.includes('Own') || venus.dignity.includes('उच्च') || venus.dignity.includes('स्वराशि'))) {
    yogas.push({
      name: 'मालव्य महापुरुष योग (Malavya Yoga)',
      type: 'राजयोग (Raj Yoga)',
      description: 'शुक्र अपनी उच्च अथवा स्वराशि में होकर केंद्र भाव में स्थित हैं।',
      effect: 'सौंदर्य, समस्त भौतिक सुख-साधन, वाहन, वैभव एवं कलात्मक क्षेत्रों में सफलता।'
    });
  }

  if (saturn && [1, 4, 7, 10].includes(saturn.house) && (saturn.dignity.includes('Exalted') || saturn.dignity.includes('Own') || saturn.dignity.includes('उच्च') || saturn.dignity.includes('स्वराशि'))) {
    yogas.push({
      name: 'शश महापुरुष योग (Sasha Yoga)',
      type: 'राजयोग (Raj Yoga)',
      description: 'शनि अपनी उच्च अथवा स्वराशि में होकर केंद्र भाव में स्थित हैं।',
      effect: 'राजनीतिक प्रभुत्व, जनसमर्थन, न्यायप्रियता, विशाल संपदा एवं दीर्घायु।'
    });
  }

  // 4. Chandra-Mangal (Mahalaxmi) Yoga
  if (moon && mars && moon.house === mars.house) {
    yogas.push({
      name: 'चंद्र-मंगल महालक्ष्मी योग (Chandra-Mangal Yoga)',
      type: 'शुभ योग (Auspicious)',
      description: 'चंद्रमा और मंगल की युति धन भाव अथवा केंद्र/त्रिकोण में स्थित है।',
      effect: 'निरंतर धन प्रवाह, अचल संपत्ति का सृजन एवं व्यावसायिक कुशलता।'
    });
  }

  // 5. Guru-Chandal Yoga (Jupiter + Rahu)
  if (jupiter && rahu && jupiter.house === rahu.house) {
    yogas.push({
      name: 'गुरु-चांडाल योग (Guru-Chandal Yoga)',
      type: 'अशुभ योग (Inauspicious)',
      description: 'गुरु और राहु एक ही भाव में युति बनाए हुए हैं।',
      effect: 'निर्णय लेने में असमंजस, गुरुजनों के आशीर्वाद व नित्य विष्णु सहस्त्रनाम से शांति संभव।'
    });
  }

  return yogas;
}

// Comprehensive Dosha Analysis
function calculateDoshaAnalysis(planets: PlanetPosition[], ascendantIdx: number, moonRashiIdx: number): DoshaAnalysis {
  const getPlanet = (key: string) => planets.find(p => p.planet.includes(key));
  const mars = getPlanet('मंगल');
  const sun = getPlanet('सूर्य');
  const saturn = getPlanet('शनि');
  const rahu = getPlanet('राहु');
  const ketu = getPlanet('केतु');

  // 1. Manglik Dosha
  const marsHouse = mars?.house || 1;
  const marsRashi = Math.floor((mars?.degree || 0) / 30);
  const marsFromMoon = ((marsHouse - (planets.find(p => p.planet.includes('चंद्र'))?.house || 1) + 12) % 12) + 1;

  const manglikHouses = [1, 4, 7, 8, 12];
  const isLagnaManglik = manglikHouses.includes(marsHouse);
  const isMoonManglik = manglikHouses.includes(marsFromMoon);

  const exceptions: string[] = [];
  let isManglik = false;
  let manglikStatus: DoshaAnalysis['manglik']['status'] = 'गैर-मांगलिक (Non-Manglik)';

  if (isLagnaManglik || isMoonManglik) {
    isManglik = true;
    if (marsHouse === 1 && marsRashi === 0) exceptions.push('मेष राशि के लग्न में स्थित मंगल दोष क्षीण करता है।');
    if (marsHouse === 4 && marsRashi === 7) exceptions.push('वृश्चिक राशि में चतुर्थ मंगल दोषमुक्त माना जाता है।');
    if (marsHouse === 7 && marsRashi === 9) exceptions.push('मकर राशि के सप्तम भाव में मंगल उच्च का होकर दोष प्रभाव घटाता है।');
    if (marsHouse === 8 && marsRashi === 3) exceptions.push('कर्क राशि में अष्टम मंगल का परिहार होता है।');
    if (marsHouse === 12 && marsRashi === 8) exceptions.push('धनु राशि में द्वादश मंगल दोषहीन फल देता है।');

    if (exceptions.length > 0 || (isMoonManglik && !isLagnaManglik)) {
      manglikStatus = 'आंशिक मांगलिक (Partial Manglik)';
    } else {
      manglikStatus = 'मांगलिक (Manglik)';
    }
  }

  // 2. Kaal Sarp Yoga
  // Check if all 7 planets are between Rahu and Ketu
  let isKaalSarp = false;
  let kaalSarpName = '';
  let kaalSarpDesc = 'कुंडली में कालसर्प योग अनुपस्थित है। ग्रह स्वतंत्र फल प्रदान कर रहे हैं।';
  let kaalSarpRemedy = 'नित्य शिव आराधना एवं महामृत्युंजय मंत्र का पाठ कल्याणकारी है।';

  if (rahu && ketu) {
    const rahuHouse = rahu.house;
    const ketuHouse = ketu.house;

    // Check if other 7 planets are hemmed on one side
    const nonNodeHouses = planets.filter(p => !p.planet.includes('राहु') && !p.planet.includes('केतु')).map(p => p.house);
    
    // Count planets clockwise from Rahu to Ketu
    const inBetweenCount = nonNodeHouses.filter(h => {
      const distFromRahu = (h - rahuHouse + 12) % 12;
      return distFromRahu > 0 && distFromRahu < 6;
    }).length;

    if (inBetweenCount === 7 || inBetweenCount === 0) {
      isKaalSarp = true;
      const kaalSarpTypes: { [key: number]: { name: string; desc: string; remedy: string } } = {
        1: { name: 'अनंत कालसर्प योग (Anant Kaal Sarp)', desc: 'राहु प्रथम भाव में और केतु सप्तम भाव में स्थित है। व्यक्तित्व और दांपत्य में संघर्ष।', remedy: 'नाग गायत्री मंत्र का नित्य 108 बार जाप व शिवलिंग पर चांदी के नाग-नागिन अर्पण।' },
        2: { name: 'कुलिक कालसर्प योग (Kulik Kaal Sarp)', desc: 'राहु द्वितीय भाव और केतु अष्टम भाव में स्थित है। धन संचय व पारिवारिक सामंजस्य में बाधा।', remedy: 'हनुमान चालीसा का पाठ व पक्षियों को प्रतिदिन सात प्रकार का अनाज खिलाएं।' },
        3: { name: 'वासुकि कालसर्प योग (Vasuki Kaal Sarp)', desc: 'राहु तृतीय भाव और केतु नवम भाव में स्थित है। पराक्रम और भाग्योदय में विलंब।', remedy: 'सोमवार को रुद्राभिषेक कराएं एवं नवनाग स्तोत्र का पाठ करें।' },
        4: { name: 'शंखपाल कालसर्प योग (Shankhpal Kaal Sarp)', desc: 'राहु चतुर्थ भाव और केतु दशम भाव में स्थित है। सुख-शांति व माता के स्वास्थ्य की चिंता।', remedy: 'चांदी का ठोस टुकड़ा अपने पास रखें व बहते जल में सूखा नारियल प्रवाहित करें।' },
        5: { name: 'पद्म कालसर्प योग (Padma Kaal Sarp)', desc: 'राहु पंचम भाव और केतु एकादश भाव में स्थित है। विद्या व संतान सुख में अड़चन।', remedy: 'सरस्वती मंत्र एवं श्री गायत्री मंत्र की नित्य एक माला जाप करें।' },
        6: { name: 'महापद्म कालसर्प योग (Mahapadma Kaal Sarp)', desc: 'राहु षष्ठ भाव और केतु द्वादश भाव में स्थित है। गुप्त शत्रु व ऋण की चिंता।', remedy: 'मंगलवार को सुंदरकांड का पाठ करें और काले कुत्ते को तेल चुपड़ी रोटी दें।' },
        7: { name: 'तक्षक कालसर्प योग (Takshak Kaal Sarp)', desc: 'राहु सप्तम भाव और केतु प्रथम भाव में स्थित है। विवाह व साझेदारी व्यापार में सतर्कता।', remedy: 'शिव-पार्वती का संयुक्त पूजन एवं महामृत्युंजय जप अनुष्ठान कराएं।' },
        8: { name: 'कर्कोटक कालसर्प योग (Karkotak Kaal Sarp)', desc: 'राहु अष्टम भाव और केतु द्वितीय भाव में स्थित है। पैतृक संपत्ति व आकस्मिक संकट।', remedy: 'प्रतिदिन शिव मंदिर में जलाभिषेक करें एवं तिल का दान करें।' },
        9: { name: 'शंखचूड़ कालसर्प योग (Shankhachood Kaal Sarp)', desc: 'राहु नवम भाव और केतु तृतीय भाव में स्थित है। भाग्य में उतार-चढ़ाव।', remedy: 'भगवान विष्णु को पीले पुष्प अर्पित करें व गुरुवार को चने की दाल का दान करें।' },
        10: { name: 'घातक कालसर्प योग (Ghatak Kaal Sarp)', desc: 'राहु दशम भाव और केतु चतुर्थ भाव में स्थित है। नौकरी व व्यवसाय में अनिश्चितता।', remedy: 'भगवान गणेश जी को दूर्वा अर्पित करें व शनिवार को शनिदेव की पूजा करें।' },
        11: { name: 'विषधर कालसर्प योग (Vishdhar Kaal Sarp)', desc: 'राहु एकादश भाव और केतु पंचम भाव में स्थित है। आय के स्रोतों में उतार-चढ़ाव।', remedy: 'राहु बीज मंत्र ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः का जप करें।' },
        12: { name: 'शेषनाग कालसर्प योग (Sheshnag Kaal Sarp)', desc: 'राहु द्वादश भाव और केतु षष्ठ भाव में स्थित है। व्यय अधिक व मानसिक चिंता।', remedy: 'पक्षियों को दाना डालें व नित्य ॐ नमः शिवाय का 108 बार जाप करें।' }
      };

      const matched = kaalSarpTypes[rahuHouse] || kaalSarpTypes[1];
      kaalSarpName = matched.name;
      kaalSarpDesc = matched.desc;
      kaalSarpRemedy = matched.remedy;
    }
  }

  // 3. Shani Sade Sati Status (Current transit of Saturn in Pisces/Aquarius approx)
  // If Moon is Aquarius (10), Pisces (11), Aries (0), Capricorn (9)
  let sadeSatiStatus = 'साढ़े साती से मुक्त (No Sade Sati)';
  let sadeSatiPhase = 'वर्तमान में शनि की साढ़े साती का प्रभाव नहीं है।';
  let sadeSatiDesc = 'शनि देव की कृपा से आपके कार्य सुचारू रूप से चलेंगे।';
  let sadeSatiRemedy = 'शनिवार को पीपल के वृक्ष में जल दें एवं ॐ शं शनैश्चराय नमः का जाप करें।';

  if (moonRashiIdx === 10) { // Aquarius
    sadeSatiStatus = 'साढ़े साती - द्वितीय चरण (Peak Phase)';
    sadeSatiPhase = 'शिखर चरण (मध्य चरण)';
    sadeSatiDesc = 'शनि देव आपकी चंद्र राशि पर गोचर कर रहे हैं। अनुशासन, धैर्य और कठोर परिश्रम से अपार सफलता मिलेगी।';
    sadeSatiRemedy = 'शनिवार को सरसों के तेल का छायापात्र दान करें, हनुमान बाहुक का पाठ करें।';
  } else if (moonRashiIdx === 9) { // Capricorn
    sadeSatiStatus = 'साढ़े साती - तृतीय चरण (Setting Phase)';
    sadeSatiPhase = 'उतरती साढ़े साती';
    sadeSatiDesc = 'शनि का प्रभाव घट रहा है, रुके हुए कार्यों में पुनः गति आएगी एवं आर्थिक स्थिरता बनेगी।';
    sadeSatiRemedy = 'काले कुत्ते को मीठी रोटी खिलाएं और बुजुर्गों का आशीर्वाद लें।';
  } else if (moonRashiIdx === 11) { // Pisces
    sadeSatiStatus = 'साढ़े साती - प्रथम चरण (Rising Phase)';
    sadeSatiPhase = 'चढ़ती साढ़े साती';
    sadeSatiDesc = 'नई जिम्मेदारियां, यात्राएं एवं खर्च में वृद्धि हो सकती है। योजनाबद्ध तरीके से आगे बढ़ें।';
    sadeSatiRemedy = 'शनिवार को शनि मंदिर में नीले पुष्प व काले तिल अर्पित करें।';
  } else if ([3, 7].includes(moonRashiIdx)) { // Cancer, Scorpio (Dhaiya)
    sadeSatiStatus = 'शनि की ढैया (Small Panoti)';
    sadeSatiPhase = 'कंटक / अष्टम शनि ढैया';
    sadeSatiDesc = 'मानसिक तनाव से बचें एवं स्वास्थ्य व कार्यस्थल पर सतर्कता बनाए रखें।';
    sadeSatiRemedy = 'हनुमान चालीसा का नित्य पाठ एवं शमी वृक्ष की पूजा करें।';
  }

  // 4. Pitra Dosh (Sun conjunct Rahu/Ketu or in 9th house with malefic)
  let isPitraDosh = false;
  let pitraDoshDesc = 'कुंडली में पितृ दोष अनुपस्थित है। पितरों का शुभ आशीर्वाद बना हुआ है।';
  if (sun && (sun.house === rahu?.house || sun.house === ketu?.house || (sun.house === 9 && (rahu?.house === 9 || saturn?.house === 9)))) {
    isPitraDosh = true;
    pitraDoshDesc = 'सूर्य के साथ राहु/केतु अथवा नवम भाव में पाप प्रभाव से पितृ दोष बनता है। अमावस्या पर तर्पण, ब्राह्मण भोजन एवं त्रिपिंडी श्राद्ध से पूर्ण शांति मिलती है।';
  }

  return {
    manglik: {
      status: manglikStatus,
      description: isManglik
        ? `मंगल आपकी कुंडली के ${marsHouse}वें भाव (लग्न से) एवं चंद्रमा से ${marsFromMoon}वें भाव में स्थित है। ${exceptions.length > 0 ? exceptions.join(' ') : 'विवाह पूर्व गुण मिलान एवं मंगल शांति अनुष्ठान श्रेष्ठ रहेगा।'}`
        : 'आपकी कुंडली में मांगलिक दोष नहीं है। मंगल ग्रह शुभ कारक है।',
      isLagnaManglik,
      isMoonManglik,
      exceptions
    },
    kaalSarp: {
      isPresent: isKaalSarp,
      nameHi: kaalSarpName || 'कालसर्प दोष मुक्त',
      type: isKaalSarp ? 'कालसर्प योग उपस्थित' : 'दोष रहित',
      description: kaalSarpDesc,
      remedy: kaalSarpRemedy
    },
    sadeSati: {
      status: sadeSatiStatus,
      phase: sadeSatiPhase,
      description: sadeSatiDesc,
      remedy: sadeSatiRemedy
    },
    pitraDosh: {
      isPresent: isPitraDosh,
      description: pitraDoshDesc
    }
  };
}

// Generate Full 120-Year Vimshottari Mahadasha Timeline with Antardashas
function generateDashaTimeline(birthYear: number, birthMonth: number, birthDay: number, nakshatraIdx: number, degInNakshatra: number, nakshatraSpan: number): DashaPeriod[] {
  const dashaOrder = [
    { name: "केतु (Ketu)", years: 7 },
    { name: "शुक्र (Venus)", years: 20 },
    { name: "सूर्य (Sun)", years: 6 },
    { name: "चंद्र (Moon)", years: 10 },
    { name: "मंगल (Mars)", years: 7 },
    { name: "राहु (Rahu)", years: 18 },
    { name: "बृहस्पति (गुरु)", years: 16 },
    { name: "शनि (Saturn)", years: 19 },
    { name: "बुध (Mercury)", years: 17 }
  ];

  const birthLordIdx = nakshatraIdx % 9;
  const fracPassed = degInNakshatra / nakshatraSpan;
  const birthLordTotalYears = dashaOrder[birthLordIdx].years;
  const balanceAtBirth = (1 - fracPassed) * birthLordTotalYears;

  const currentYear = new Date().getFullYear();
  const periods: DashaPeriod[] = [];

  let runningDate = new Date(birthYear, birthMonth - 1, birthDay);
  let currentLordIdx = birthLordIdx;

  for (let i = 0; i < 9; i++) {
    const lord = dashaOrder[currentLordIdx];
    const duration = (i === 0) ? balanceAtBirth : lord.years;
    const startYear = runningDate.getFullYear();
    const startDateFormatted = `${runningDate.getDate().toString().padStart(2, '0')}/${(runningDate.getMonth() + 1).toString().padStart(2, '0')}/${runningDate.getFullYear()}`;

    // Add duration in days
    const nextDate = new Date(runningDate.getTime() + duration * 365.25 * 24 * 3600 * 1000);
    const endYear = nextDate.getFullYear();
    const endDateFormatted = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getFullYear()}`;

    const isCurrent = currentYear >= startYear && currentYear <= endYear;
    const isPast = currentYear > endYear;

    // Generate Antardashas for this Mahadasha
    const antardashas: { lord: string; startDate: string; endDate: string; isCurrent: boolean }[] = [];
    let subRunningDate = new Date(runningDate);

    for (let j = 0; j < 9; j++) {
      const subLordIdx = (currentLordIdx + j) % 9;
      const subLord = dashaOrder[subLordIdx];
      const subDurationYears = (lord.years * subLord.years) / 120.0;
      const subNextDate = new Date(subRunningDate.getTime() + subDurationYears * 365.25 * 24 * 3600 * 1000);

      const subStartStr = `${subRunningDate.getDate().toString().padStart(2, '0')}/${(subRunningDate.getMonth() + 1).toString().padStart(2, '0')}/${subRunningDate.getFullYear()}`;
      const subEndStr = `${subNextDate.getDate().toString().padStart(2, '0')}/${(subNextDate.getMonth() + 1).toString().padStart(2, '0')}/${subNextDate.getFullYear()}`;
      const isSubCurrent = new Date() >= subRunningDate && new Date() <= subNextDate;

      antardashas.push({
        lord: `${subLord.name}`,
        startDate: subStartStr,
        endDate: subEndStr,
        isCurrent: isSubCurrent
      });

      subRunningDate = subNextDate;
    }

    periods.push({
      planet: lord.name,
      startYear,
      endYear,
      durationYears: Math.round(duration * 10) / 10,
      startDateFormatted,
      endDateFormatted,
      isCurrent,
      isPast,
      antardashas
    });

    runningDate = nextDate;
    currentLordIdx = (currentLordIdx + 1) % 9;
  }

  return periods;
}

// ------------------------------------------------------------------------------------------------
// MAIN EXPORT FUNCTION: calculateVedicKundli
// ------------------------------------------------------------------------------------------------
export function calculateVedicKundli(input: KundliInput): KundliResult {
  let cityLat = input.latitude || 23.5880; // default Mehsana
  let cityLon = input.longitude || 72.3693;

  if (!input.latitude || !input.longitude) {
    const matchedCity = INDIAN_CITIES_DATABASE.find(
      c => c.name === input.cityName || c.nameEn.toLowerCase() === input.cityName.toLowerCase() || c.nameHi === input.cityName
    );
    if (matchedCity) {
      cityLat = matchedCity.lat;
      cityLon = matchedCity.lon;
    }
  }

  // 1. Julian Day & Ephemeris Time
  const { jd, t } = getJulianDayIST(input.year, input.month, input.day, input.hour, input.minute);

  // 2. Lahiri Ayanamsha
  const ayanamsha = getLahiriAyanamsha(t);

  // 3. Ascendant (Lagna)
  const lagnaDeg = calculateLagna(jd, t, ayanamsha, cityLat, cityLon);
  const ascendantIdx = Math.floor(lagnaDeg / 30);
  const ascendantDegree = Math.round((lagnaDeg % 30) * 100) / 100;
  const ascendantDms = formatDMS(lagnaDeg % 30);

  // 4. Sun & Moon Calculations
  const sunData = calculateSun(t, ayanamsha);
  const sunRashiIdx = Math.floor(sunData.siderealDeg / 30);
  const sunDegInRashi = Math.round((sunData.siderealDeg % 30) * 100) / 100;

  const moonData = calculateMoon(t, ayanamsha);
  const moonRashiIdx = Math.floor(moonData.siderealDeg / 30);
  const moonDegInRashi = Math.round((moonData.siderealDeg % 30) * 100) / 100;

  // 5. Nakshatra & Charan
  const nakshatraSpan = 360 / 27; // 13.333333 degrees
  const nakshatraIdx = Math.floor(moonData.siderealDeg / nakshatraSpan);
  const degInNakshatra = moonData.siderealDeg % nakshatraSpan;
  const nakshatraCharan = Math.min(4, Math.floor(degInNakshatra / (nakshatraSpan / 4)) + 1);

  // 6. Other Planets (Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu)
  const sunTropLong = normalizeDeg(sunData.siderealDeg + ayanamsha);

  const marsData = calculatePlanet(t, ayanamsha, sunTropLong, {
    key: 'Mars',
    a0: 1.52366231, aRate: 0,
    e0: 0.09341233, eRate: 0.00011902,
    i0: 1.85061, iRate: -0.000254,
    l0: 355.45332, lRate: 19140.302684,
    w0: 336.04084, wRate: 1.84105,
    node0: 49.5574, nodeRate: 0.7721
  });

  const mercuryData = calculatePlanet(t, ayanamsha, sunTropLong, {
    key: 'Mercury',
    a0: 0.38709893, aRate: 0,
    e0: 0.20563069, eRate: 0.00002527,
    i0: 7.00487, iRate: -0.005947,
    l0: 252.25032, lRate: 149472.674111,
    w0: 77.45780, wRate: 1.55648,
    node0: 48.3313, nodeRate: 1.1862
  });

  const jupiterData = calculatePlanet(t, ayanamsha, sunTropLong, {
    key: 'Jupiter',
    a0: 5.20336301, aRate: 0.00000061,
    e0: 0.04839266, eRate: -0.00012880,
    i0: 1.30530, iRate: -0.004156,
    l0: 34.40438, lRate: 3034.746128,
    w0: 14.75385, wRate: 1.61273,
    node0: 100.5561, nodeRate: 1.2117
  });

  const venusData = calculatePlanet(t, ayanamsha, sunTropLong, {
    key: 'Venus',
    a0: 0.72333199, aRate: 0.00000012,
    e0: 0.00677323, eRate: -0.00004938,
    i0: 3.39471, iRate: 0.000788,
    l0: 181.97909, lRate: 58517.803875,
    w0: 131.57294, wRate: 1.40222,
    node0: 76.6807, nodeRate: 0.9011
  });

  const saturnData = calculatePlanet(t, ayanamsha, sunTropLong, {
    key: 'Saturn',
    a0: 9.53707032, aRate: -0.00000302,
    e0: 0.05415060, eRate: -0.00036762,
    i0: 2.48446, iRate: 0.001936,
    l0: 49.94432, lRate: 1222.493622,
    w0: 92.43194, wRate: 1.95842,
    node0: 113.6634, nodeRate: 0.8742
  });

  const nodes = calculateNodes(t, ayanamsha);

  // Raw Planets Configuration with Combust, Motion & Dignity Checks
  const rawPlanets = [
    { key: 'Sun', name: 'सूर्य (Sun)', nameHi: 'सूर्य', lord: 'सूर्य', siderealDeg: sunData.siderealDeg, isRetrograde: false, combustOrb: 0, speedDms: sunData.speedDms },
    { key: 'Moon', name: 'चंद्र (Moon)', nameHi: 'चंद्र', lord: 'चंद्र', siderealDeg: moonData.siderealDeg, isRetrograde: false, combustOrb: 12, speedDms: moonData.speedDms },
    { key: 'Mars', name: 'मंगल (Mars)', nameHi: 'मंगल', lord: 'मंगल', siderealDeg: marsData.siderealDeg, isRetrograde: marsData.isRetrograde, combustOrb: 17, speedDms: marsData.speedDms },
    { key: 'Mercury', name: 'बुध (Mercury)', nameHi: 'बुध', lord: 'बुध', siderealDeg: mercuryData.siderealDeg, isRetrograde: mercuryData.isRetrograde, combustOrb: 14, speedDms: mercuryData.speedDms },
    { key: 'Jupiter', name: 'बृहस्पति (Jupiter)', nameHi: 'गुरु', lord: 'गुरु', siderealDeg: jupiterData.siderealDeg, isRetrograde: jupiterData.isRetrograde, combustOrb: 11, speedDms: jupiterData.speedDms },
    { key: 'Venus', name: 'शुक्र (Venus)', nameHi: 'शुक्र', lord: 'शुक्र', siderealDeg: venusData.siderealDeg, isRetrograde: venusData.isRetrograde, combustOrb: 10, speedDms: venusData.speedDms },
    { key: 'Saturn', name: 'शनि (Saturn)', nameHi: 'शनि', lord: 'शनि', siderealDeg: saturnData.siderealDeg, isRetrograde: saturnData.isRetrograde, combustOrb: 15, speedDms: saturnData.speedDms },
    { key: 'Rahu', name: 'राहु (Rahu)', nameHi: 'राहु', lord: 'राहु', siderealDeg: nodes.rahu, isRetrograde: true, combustOrb: 0, speedDms: nodes.speedDms },
    { key: 'Ketu', name: 'केतु (Ketu)', nameHi: 'केतु', lord: 'केतु', siderealDeg: nodes.ketu, isRetrograde: true, combustOrb: 0, speedDms: nodes.speedDms }
  ];

  // Map to Lagna (D-1) Houses
  const housesMap: { [h: number]: { houseNumber: number; rashi: string; planetsInHouse: string[] } } = {};
  for (let h = 1; h <= 12; h++) {
    const rashiIdxForHouse = (ascendantIdx + h - 1) % 12;
    housesMap[h] = { houseNumber: h, rashi: RASHI_NAMES[rashiIdxForHouse], planetsInHouse: [] };
  }

  // Chandra Kundli (Moon Chart) Houses
  const chandraHousesMap: { [h: number]: { houseNumber: number; rashi: string; planetsInHouse: string[] } } = {};
  for (let h = 1; h <= 12; h++) {
    const rashiIdxForHouse = (moonRashiIdx + h - 1) % 12;
    chandraHousesMap[h] = { houseNumber: h, rashi: RASHI_NAMES[rashiIdxForHouse], planetsInHouse: [] };
  }

  // Bhava Chalit Houses (Sripati / Cusp System)
  const chalitHousesMap: { [h: number]: { houseNumber: number; rashi: string; planetsInHouse: string[]; cuspDegree: number; cuspDms: string } } = {};
  for (let h = 1; h <= 12; h++) {
    const cusp = normalizeDeg(lagnaDeg + (h - 1) * 30.0);
    const rashiIdx = Math.floor(cusp / 30);
    chalitHousesMap[h] = {
      houseNumber: h,
      rashi: RASHI_NAMES[rashiIdx],
      planetsInHouse: [],
      cuspDegree: Math.round((cusp % 30) * 100) / 100,
      cuspDms: formatDMS(cusp % 30)
    };
  }

  // Navamsha (D-9) Lagna & Houses
  const navamshaLagnaRashiIdx = calculateNavamshaRashi(lagnaDeg);
  const navamshaHousesMap: { [h: number]: { houseNumber: number; rashi: string; planetsInHouse: string[] } } = {};
  for (let h = 1; h <= 12; h++) {
    const rashiIdxForHouse = (navamshaLagnaRashiIdx + h - 1) % 12;
    navamshaHousesMap[h] = { houseNumber: h, rashi: RASHI_NAMES[rashiIdxForHouse], planetsInHouse: [] };
  }

  const planets: PlanetPosition[] = [];
  const navamshaPlanets: PlanetPosition[] = [];

  rawPlanets.forEach((p) => {
    const rashiIndex = Math.floor(p.siderealDeg / 30);
    const degreeInRashi = Math.round((p.siderealDeg % 30) * 100) / 100;
    const dms = formatDMS(p.siderealDeg % 30);
    const houseNum = ((rashiIndex - ascendantIdx + 12) % 12) + 1;
    const chandraHouseNum = ((rashiIndex - moonRashiIdx + 12) % 12) + 1;
    const chalitHouseNum = Math.floor(normalizeDeg(p.siderealDeg - lagnaDeg + 15.0) / 30.0) + 1;
    const dignity = getPlanetaryDignity(p.key, rashiIndex, degreeInRashi);
    const avastha = getPlanetaryAvastha(degreeInRashi, rashiIndex);

    // Planet Nakshatra & Charan
    const pNakIdx = Math.floor(p.siderealDeg / nakshatraSpan);
    const pDegInNak = p.siderealDeg % nakshatraSpan;
    const pNakCharan = Math.min(4, Math.floor(pDegInNak / (nakshatraSpan / 4)) + 1);
    const nakLord = NAKSHATRA_LORDS[pNakIdx % 27] || 'सूर्य';

    // Sub-lord
    const subIdx = Math.floor((pDegInNak / nakshatraSpan) * 9);
    const subLord = NAKSHATRA_LORDS[(pNakIdx + subIdx) % 9] || 'गुरु';

    // Combust check (separation from Sun)
    const diffFromSun = Math.abs(normalizeDeg(p.siderealDeg - sunData.siderealDeg));
    const angleSeparation = diffFromSun > 180 ? 360 - diffFromSun : diffFromSun;
    const isCombust = p.combustOrb > 0 && angleSeparation < p.combustOrb && p.key !== 'Sun';

    // Navamsha Calculations
    const navRashiIdx = calculateNavamshaRashi(p.siderealDeg);
    const navHouseNum = ((navRashiIdx - navamshaLagnaRashiIdx + 12) % 12) + 1;

    const posObj: PlanetPosition = {
      planet: p.name,
      planetHi: p.nameHi,
      rashi: RASHI_NAMES[rashiIndex],
      rashiHi: RASHI_NAMES[rashiIndex].split(' ')[0],
      degree: degreeInRashi,
      dms,
      house: houseNum,
      chalitHouse: chalitHouseNum,
      speed: p.speedDms,
      isRetrograde: p.isRetrograde,
      isCombust,
      dignity,
      lord: p.lord,
      nakshatra: NAKSHATRAS[pNakIdx] || NAKSHATRAS[0],
      nakshatraCharan: pNakCharan,
      nakshatraLord: nakLord,
      subLord,
      avastha,
      navamshaRashi: RASHI_NAMES[navRashiIdx],
      navamshaHouse: navHouseNum
    };

    planets.push(posObj);
    housesMap[houseNum].planetsInHouse.push(p.nameHi);
    chandraHousesMap[chandraHouseNum].planetsInHouse.push(p.nameHi);
    chalitHousesMap[chalitHouseNum].planetsInHouse.push(p.nameHi);

    // Navamsha list entry
    navamshaPlanets.push({
      ...posObj,
      house: navHouseNum,
      rashi: RASHI_NAMES[navRashiIdx]
    });
    navamshaHousesMap[navHouseNum].planetsInHouse.push(p.nameHi);
  });

  // Calculate Jaimini 7 Chara Karakas and assign to planets
  const jaiminiKarakas = calculateJaiminiKarakas(planets);
  const karakaMap: { [planetHi: string]: string } = {};
  jaiminiKarakas.forEach(jk => {
    const shortLabel = jk.karaka.split(' ')[0]; // e.g. "Atmakaraka"
    karakaMap[jk.planetHi] = shortLabel;
  });

  planets.forEach(p => {
    if (karakaMap[p.planetHi]) {
      p.karaka = karakaMap[p.planetHi];
    }
  });

  const houses = Object.values(housesMap);
  const chandraHouses = Object.values(chandraHousesMap);
  const chalitHouses = Object.values(chalitHousesMap);
  const navamshaHouses = Object.values(navamshaHousesMap);

  // 7. Complete Birth Panchang Calculations (हिंदू पंचांग)
  const sunElevation = normalizeDeg(sunData.tropicalDeg);
  const ayan: BirthPanchang['ayan'] = (sunElevation >= 270 || sunElevation < 90) 
    ? 'उत्तरायण (Uttarayana)' 
    : 'दक्षिणायन (Dakshinayana)';

  // Vedic Ritu (Seasons)
  const rituNames = [
    'शिशिर ऋतु (Winter)', 'वसंत ऋतु (Spring)', 'ग्रीष्म ऋतु (Summer)',
    'वर्षा ऋतु (Monsoon)', 'शरद ऋतु (Autumn)', 'हेमंत ऋतु (Pre-Winter)'
  ];
  const rituIdx = Math.floor(((sunElevation + 30) % 360) / 60);
  const ritu = rituNames[rituIdx] || rituNames[1];

  // Elongation for Tithi & Paksha
  const moonSunElongation = normalizeDeg(moonData.siderealDeg - sunData.siderealDeg);
  const tithiIndex = Math.floor(moonSunElongation / 12); // 0 to 29
  const tithiNumber = tithiIndex + 1;
  const isShukla = tithiIndex < 15;
  const paksha: BirthPanchang['paksha'] = isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
  const tithi = `${paksha} ${TITHI_NAMES[tithiIndex] || 'पूर्णिमा'}`;
  const tithiLord = TITHI_LORDS[tithiIndex] || 'भगवान विष्णु';

  // Nitya Yoga calculation: (Sun + Moon) % 360
  const yogaDegree = normalizeDeg(sunData.siderealDeg + moonData.siderealDeg);
  const yogaIndex = Math.floor(yogaDegree / (360 / 27));
  const yogaObj = VEDIC_YOGAS[yogaIndex] || VEDIC_YOGAS[0];

  // Karana calculation: Half-tithi
  const halfTithi = Math.floor(moonSunElongation / 6); // 0 to 59
  let karanaName = '';
  if (halfTithi === 0) {
    karanaName = KARANA_NAMES[10]; // Kintughna
  } else if (halfTithi >= 1 && halfTithi <= 56) {
    const movableIdx = (halfTithi - 1) % 7;
    karanaName = KARANA_NAMES[movableIdx];
  } else if (halfTithi === 57) {
    karanaName = KARANA_NAMES[7]; // Shakuni
  } else if (halfTithi === 58) {
    karanaName = KARANA_NAMES[8]; // Chatushpada
  } else {
    karanaName = KARANA_NAMES[9]; // Naga
  }

  // Day of Week & Varesh
  const dayNames = [
    { name: 'रविवार (Sunday)', lord: 'सूर्य देव' },
    { name: 'सोमवार (Monday)', lord: 'चंद्र देव' },
    { name: 'मंगलवार (Tuesday)', lord: 'मंगल देव' },
    { name: 'बुधवार (Wednesday)', lord: 'बुध देव' },
    { name: 'गुरुवार (Thursday)', lord: 'बृहस्पति देव' },
    { name: 'शुक्रवार (Friday)', lord: 'शुक्र देव' },
    { name: 'शनिवार (Saturday)', lord: 'शनि देव' }
  ];
  const birthJsDate = new Date(input.year, input.month - 1, input.day);
  const dayOfWeekObj = dayNames[birthJsDate.getDay()];

  // Hindu Month (Masa)
  const hinduMonth = HINDU_MONTHS[(sunRashiIdx + 11) % 12];

  // Vikram & Shaka Samvat
  const vikramSamvatYear = input.year + (input.month >= 4 ? 57 : 56);
  const shakaSamvatYear = input.year - (input.month >= 4 ? 78 : 79);
  const samvatsaraName = SAMVATSARA_NAMES[(vikramSamvatYear + 9) % 60] || 'आनंद';

  // Astronomical Sunrise & Sunset
  const sunRiseSet = calculateSunriseSunset(input.year, input.month, input.day, cityLat, cityLon);
  const dinmaanHours = sunRiseSet.dayDurationHours;
  const raatrimaanHours = 24 - dinmaanHours;

  const dinmaanGhati = Math.floor(dinmaanHours * 2.5);
  const dinmaanPala = Math.round((dinmaanHours * 2.5 - dinmaanGhati) * 60);

  const raatriGhati = Math.floor(raatrimaanHours * 2.5);
  const raatriPala = Math.round((raatrimaanHours * 2.5 - raatriGhati) * 60);

  // Ishta Kaal (Time elapsed from sunrise to birth time in Ghati-Pala)
  const birthDecimalHour = input.hour + input.minute / 60;
  let ishtaHours = birthDecimalHour - sunRiseSet.sunriseHour;
  if (ishtaHours < 0) ishtaHours += 24;
  const ishtaGhati = Math.floor(ishtaHours * 2.5);
  const ishtaPala = Math.round((ishtaHours * 2.5 - ishtaGhati) * 60);

  // Avakahada Chakra
  const moonHouseFromLagna = ((moonRashiIdx - ascendantIdx + 12) % 12) + 1;
  const avakahadaChakra = calculateAvakahadaChakra(moonRashiIdx, nakshatraIdx, nakshatraCharan, moonHouseFromLagna);

  // Birth Choghadiya & Muhurat
  const birthChoghadiya = calculateBirthChoghadiya(birthJsDate.getDay(), birthDecimalHour, sunRiseSet.sunriseHour, sunRiseSet.sunsetHour);
  const muhurat = calculateMuhurat(birthJsDate.getDay(), sunRiseSet.sunriseHour, sunRiseSet.sunsetHour);

  // Sarvashtakavarga (337 Bindus)
  const sarvashtakavarga = calculateSarvashtakavarga(
    rawPlanets.map(p => ({ key: p.key, rashiIdx: Math.floor(p.siderealDeg / 30) })),
    ascendantIdx
  );

  const birthPanchang: BirthPanchang = {
    samvatVikram: `विक्रम संवत ${vikramSamvatYear} (${samvatsaraName} संवत्सर)`,
    samvatShaka: `शक संवत ${shakaSamvatYear}`,
    hinduMonth,
    paksha,
    tithi,
    tithiNumber,
    tithiLord,
    nakshatra: NAKSHATRAS[nakshatraIdx] || NAKSHATRAS[0],
    nakshatraCharan,
    nakshatraLord: NAKSHATRA_LORDS[nakshatraIdx % 27],
    nakshatraAkshar: avakahadaChakra.naamAkshar,
    yoga: yogaObj.name,
    yogaDescription: yogaObj.desc,
    karana: karanaName,
    dayOfWeek: dayOfWeekObj.name,
    dayLord: dayOfWeekObj.lord,
    sunrise: sunRiseSet.sunrise,
    sunset: sunRiseSet.sunset,
    ishtaKaal: `${ishtaGhati} घटी ${ishtaPala} पल (${Math.floor(ishtaHours)} घंटे ${Math.round((ishtaHours - Math.floor(ishtaHours)) * 60)} मिनट सूर्योदय पश्चात)`,
    dinmaan: `${dinmaanGhati} घटी ${dinmaanPala} पल (${Math.floor(dinmaanHours)} घंटे ${Math.round((dinmaanHours - Math.floor(dinmaanHours)) * 60)} मिनट)`,
    raatrimaan: `${raatriGhati} घटी ${raatriPala} पल (${Math.floor(raatrimaanHours)} घंटे ${Math.round((raatrimaanHours - Math.floor(raatrimaanHours)) * 60)} मिनट)`,
    ayan,
    ritu,
    sunSign: RASHI_NAMES[sunRashiIdx],
    moonSign: RASHI_NAMES[moonRashiIdx],
    birthChoghadiya,
    muhurat,
    lahiriAyanamshaDms: formatDMS(ayanamsha)
  };

  // 8. Vedic Yogas & Dosha Analysis
  const specialYogas = detectVedicYogas(planets, ascendantIdx);
  const doshaAnalysis = calculateDoshaAnalysis(planets, ascendantIdx, moonRashiIdx);
  const dashaTimeline = generateDashaTimeline(input.year, input.month, input.day, nakshatraIdx, degInNakshatra, nakshatraSpan);

  const currentDashaPeriod = dashaTimeline.find(d => d.isCurrent) || dashaTimeline[0];
  const currentDasha = currentDashaPeriod.planet;
  const dashaEndYear = currentDashaPeriod.endYear;

  // Exact Vimshottari Dasha Balance at Birth
  const dashaOrder = [
    { name: "केतु (Ketu)", years: 7 },
    { name: "शुक्र (Venus)", years: 20 },
    { name: "सूर्य (Sun)", years: 6 },
    { name: "चंद्र (Moon)", years: 10 },
    { name: "मंगल (Mars)", years: 7 },
    { name: "राहु (Rahu)", years: 18 },
    { name: "बृहस्पति (गुरु)", years: 16 },
    { name: "शनि (Saturn)", years: 19 },
    { name: "बुध (Mercury)", years: 17 }
  ];
  const birthLordIdx = nakshatraIdx % 9;
  const fracPassed = degInNakshatra / nakshatraSpan;
  const birthLordTotalYears = dashaOrder[birthLordIdx].years;
  const balanceAtBirth = (1 - fracPassed) * birthLordTotalYears;
  const balYears = Math.floor(balanceAtBirth);
  const balMonthsFrac = (balanceAtBirth - balYears) * 12;
  const balMonths = Math.floor(balMonthsFrac);
  const balDays = Math.round((balMonthsFrac - balMonths) * 30);
  const birthDashaBalance = `${dashaOrder[birthLordIdx].name}: ${balYears} वर्ष ${balMonths} माह ${balDays} दिन`;

  // 9. Personalized Life Predictions
  const lagnaRashiObj = RASHIS[ascendantIdx];
  const moonRashiObj = RASHIS[moonIdxSafe(moonRashiIdx)];
  const lagnaName = RASHI_NAMES[ascendantIdx].split(' ')[0];
  const moonName = RASHI_NAMES[moonRashiIdx].split(' ')[0];

  const careerDescriptions: { [key: number]: string } = {
    0: "दशम भाव में मकर राशि एवं मंगल-शनि के प्रभाव से आप प्रशासनिक, इंजीनियरिंग, रक्षा, रियल एस्टेट व स्वतंत्र व्यवसाय में शीर्ष नेतृत्व प्राप्त करेंगे।",
    1: "दशम भाव में कुंभ राशि होने से तकनीकी, अनुसंधान, आईटी, समाज कल्याण एवं बड़े उद्योगों में असाधारण सफलता मिलेगी।",
    2: "दशम भाव में मीन राशि होने से शिक्षा, विदेशी व्यापार, वित्तीय परामर्श, लेखन एवं अध्यात्म के क्षेत्र में मान-सम्मान व उच्च पद मिलेगा।",
    3: "दशम भाव में मेष राशि होने से पुलिस, सेना, चिकित्सा, प्रबंधन व खेलकूद में आपकी योजनाएं अभूतपूर्व कीर्ति दिलाएंगी।",
    4: "दशम भाव में वृषभ राशि होने से बैंकिंग, वित्त, कला, होटल, मीडिया व लग्जरी ब्रांड्स के व्यवसाय में धन लाभ होगा।",
    5: "दशम भाव में मिथुन राशि होने से संचार, पत्रकारिता, सॉफ्टवेयर, शेयर बाजार व वकालत में आप विशेष मुकाम हासिल करेंगे।",
    6: "दशम भाव में कर्क राशि होने से जनसंपर्क, राजनीति, खाद्य पदार्थ, जल संसाधन व शिक्षा संस्थाओं में भाग्योदय होगा।",
    7: "दशम भाव में सिंह राशि होने से सरकारी सेवा, प्रशासनिक अधिकारी, सत्ता व उच्च पदों पर प्रतिष्ठा प्राप्त होगी।",
    8: "दशम भाव में कन्या राशि होने से लेखांकन (CA), विश्लेषक, कानून, वाणिज्य व चिकित्सा के क्षेत्र में सफलता मिलेगी।",
    9: "दशम भाव में तुला राशि होने से न्याय, डिजाइन, आयात-निर्यात, फैशन व भागीदारी व्यापार में खूब धन-दौलत अर्जित करेंगे।",
    10: "दशम भाव में वृश्चिक राशि होने से गूढ़ विद्या, शोध, रसायन, खनिज, गुप्तचर व सर्जरी के क्षेत्र में यश मिलेगा।",
    11: "दशम भाव में धनु राशि होने से न्यायाधीश, प्रोफेसर, धर्माधिकारी, परामर्शदाता व ट्रस्टी के रूप में सम्मानित होंगे।"
  };

  return {
    ascendantRashi: RASHI_NAMES[ascendantIdx],
    ascendantDegree,
    ascendantDms,
    moonRashi: RASHI_NAMES[moonRashiIdx],
    sunRashi: RASHI_NAMES[sunRashiIdx],
    nakshatra: NAKSHATRAS[nakshatraIdx] || NAKSHATRAS[0],
    nakshatraCharan,
    currentDasha,
    dashaEndYear,
    birthDashaBalance,
    manglikStatus: doshaAnalysis.manglik.status,
    birthPanchang,
    avakahadaChakra,
    planets,
    navamshaPlanets,
    houses,
    chandraHouses,
    chalitHouses,
    navamshaHouses,
    jaiminiKarakas,
    sarvashtakavarga,
    dashaTimeline,
    specialYogas,
    doshaAnalysis,
    lifePrediction: {
      general: `आपका जन्म ${lagnaName} लग्न एवं ${moonName} राशि में, ${birthPanchang.nakshatra} नक्षत्र के चरण ${nakshatraCharan} एवं ${birthPanchang.tithi} को हुआ है। अवकहड़ा चक्र अनुसार आपका जन्म पाया '${avakahadaChakra.paya}' एवं गण '${avakahadaChakra.gana}' है। नामकरण हेतु प्रथम शुभ नामाक्षर '${avakahadaChakra.naamAkshar}' है। लग्नेश की स्थिति के अनुसार आप विचारशील, स्वाभिमानी, पुरुषार्थी और लक्ष्य के प्रति समर्पित जातक हैं। जीवन में 24वें, 28वें, 32वें एवं 36वें वर्ष में महत्वपूर्ण भाग्योदय के प्रबल योग हैं।`,
      career: careerDescriptions[ascendantIdx] || `दशम भाव में शुभ ग्रह दृष्टि से आपको करियर में निरंतर पदोन्नति एवं आर्थिक समृद्धि प्राप्त होगी। वर्तमान में चल रही ${currentDasha} महादशा नए व्यावसायिक अवसरों का सृजन कर रही है।`,
      marriage: `सप्तम भाव का विश्लेषण दर्शाता है कि आपका जीवनसाथी गुणवान, सुसंस्कृत और परिवार को साथ लेकर चलने वाला होगा। ${doshaAnalysis.manglik.status === 'मांगलिक (Manglik)' ? 'कुंडली में मांगलिक योग होने के कारण विवाह पूर्व गुण मिलान एवं मंगल शांति अनुष्ठान कराने से दांपत्य में सुख-शांति बनी रहेगी।' : 'वैवाहिक जीवन में परस्पर विश्वास, स्नेह और सहयोग उत्तम रहेगा।'}`,
      health: `लग्न और सूर्य की स्थिति अनुसार आपका आत्मबल मजबूत है। पाचन तंत्र एवं मौसमी परिवर्तनों पर ध्यान दें। नियमित सूर्य नमस्कार एवं ॐ नमः शिवाय का ध्यान उत्तम स्वास्थ्य प्रदान करेगा।`,
      luckyGem: `${lagnaRashiObj?.luckyStone || 'माणिक्य'} अथवा ${moonRashiObj?.luckyStone || 'पुखराज'}`,
      luckyMantra: `ॐ नमो भगवते वासुदेवाय एवं महामृत्युंजय मंत्र`,
      recommendedUpay: [
        `प्रतिदिन प्रातः काल तांबे के पात्र से सूर्य देव को रोली-अक्षत युक्त जल अर्पित करें।`,
        `वर्तमान ${currentDasha} महादशा की अनुकूलता हेतु योग्य ब्राह्मण द्वारा ग्रह शांति मंत्र जाप करें।`,
        `गुरुवार अथवा सोमवार को गौमाता को हरा चारा एवं गुड़ खिलाएं।`,
        `माँ भवानी (कुलदेवी) का नित्य स्मरण करें एवं धूप-दीप प्रज्वलित करें।`
      ]
    }
  };
}

function moonIdxSafe(idx: number): number {
  if (idx < 0 || idx >= RASHIS.length) return 0;
  return idx;
}

// ------------------------------------------------------------------------------------------------
// Ashtakoota Gun Milan
// ------------------------------------------------------------------------------------------------
export function calculateGunMilan(
  boyName: string,
  girlName: string,
  boyRashiIdx: number,
  girlRashiIdx: number,
  boyNakshatraIdx: number,
  girlNakshatraIdx: number
): GunMilanResult {
  // 1. Varna (1 point)
  const getVarna = (r: number) => {
    if ([3, 7, 11].includes(r)) return 3; // Brahmin
    if ([0, 4, 8].includes(r)) return 2;  // Kshatriya
    if ([1, 5, 9].includes(r)) return 1;  // Vaishya
    return 0;                             // Shudra
  };
  const boyVarna = getVarna(boyRashiIdx);
  const girlVarna = getVarna(girlRashiIdx);
  const varnaObtained = boyVarna >= girlVarna ? 1 : 0;

  // 2. Vashya (2 points)
  const vashyaDiff = Math.abs(boyRashiIdx - girlRashiIdx);
  let vashyaObtained = 1;
  if (boyRashiIdx === girlRashiIdx || vashyaDiff === 6) {
    vashyaObtained = 2;
  } else if ([3, 4, 8].includes(vashyaDiff)) {
    vashyaObtained = 1.5;
  } else if ([1, 5].includes(vashyaDiff)) {
    vashyaObtained = 1;
  } else {
    vashyaObtained = 0.5;
  }

  // 3. Tara (3 points)
  const countBoyToGirl = ((girlNakshatraIdx - boyNakshatraIdx + 27) % 9) + 1;
  const countGirlToBoy = ((boyNakshatraIdx - girlNakshatraIdx + 27) % 9) + 1;
  const isAuspiciousTara = (val: number) => [1, 2, 4, 6, 8, 9].includes(val);
  const taraBoyGood = isAuspiciousTara(countBoyToGirl);
  const taraGirlGood = isAuspiciousTara(countGirlToBoy);

  let taraObtained = 0;
  if (taraBoyGood && taraGirlGood) {
    taraObtained = 3;
  } else if (taraBoyGood || taraGirlGood) {
    taraObtained = 1.5;
  } else {
    taraObtained = 0;
  }

  // 4. Yoni (4 points)
  const yoniMap = [
    0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 7, 11, 12, 0, 13, 7, 1
  ];
  const bYoni = yoniMap[boyNakshatraIdx % 27];
  const gYoni = yoniMap[girlNakshatraIdx % 27];
  let yoniObtained = 2;
  if (bYoni === gYoni) {
    yoniObtained = 4;
  } else if (Math.abs(bYoni - gYoni) % 2 === 0) {
    yoniObtained = 3;
  } else if (Math.abs(bYoni - gYoni) % 3 === 0) {
    yoniObtained = 2;
  } else {
    yoniObtained = 1;
  }

  // 5. Graha Maitri (5 points)
  const rashiLords = [
    'Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
    'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'
  ];
  const bLord = rashiLords[boyRashiIdx % 12];
  const gLord = rashiLords[girlRashiIdx % 12];
  let grahaMaitriObtained = 3;
  if (bLord === gLord) {
    grahaMaitriObtained = 5;
  } else if (
    (bLord === 'Sun' && ['Moon', 'Mars', 'Jupiter'].includes(gLord)) ||
    (bLord === 'Moon' && ['Sun', 'Mercury'].includes(gLord)) ||
    (bLord === 'Mars' && ['Sun', 'Moon', 'Jupiter'].includes(gLord)) ||
    (bLord === 'Mercury' && ['Sun', 'Venus'].includes(gLord)) ||
    (bLord === 'Jupiter' && ['Sun', 'Moon', 'Mars'].includes(gLord)) ||
    (bLord === 'Venus' && ['Mercury', 'Saturn'].includes(gLord)) ||
    (bLord === 'Saturn' && ['Mercury', 'Venus'].includes(gLord))
  ) {
    grahaMaitriObtained = 5;
  } else if ([0, 4, 8].includes(Math.abs(boyRashiIdx - girlRashiIdx))) {
    grahaMaitriObtained = 4;
  } else if ([1, 7].includes(Math.abs(boyRashiIdx - girlRashiIdx))) {
    grahaMaitriObtained = 3;
  } else {
    grahaMaitriObtained = 1;
  }

  // 6. Gana (6 points)
  const ganaMap = [
    0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0
  ];
  const boyGana = ganaMap[boyNakshatraIdx % 27];
  const girlGana = ganaMap[girlNakshatraIdx % 27];
  let ganaObtained = 6;
  let isGanaDosh = false;

  if (boyGana === girlGana) {
    ganaObtained = 6;
  } else if ((boyGana === 0 && girlGana === 1) || (boyGana === 1 && girlGana === 0)) {
    ganaObtained = 5;
  } else if (boyGana === 0 && girlGana === 2) {
    ganaObtained = 1;
    isGanaDosh = true;
  } else {
    ganaObtained = 0;
    isGanaDosh = true;
  }

  // 7. Bhakoot (7 points)
  const diff = (girlRashiIdx - boyRashiIdx + 12) % 12;
  let bhakootObtained = 7;
  let isBhakootDosh = false;
  if ([5, 7].includes(diff)) { // 6/8 Shadashtak
    bhakootObtained = 0;
    isBhakootDosh = true;
  } else if ([1, 11].includes(diff)) { // 2/12 Dwidwadash
    bhakootObtained = 0;
    isBhakootDosh = true;
  } else {
    bhakootObtained = 7;
  }

  // 8. Nadi (8 points)
  const nadiMap = [
    0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2
  ];
  const boyNadi = nadiMap[boyNakshatraIdx % 27];
  const girlNadi = nadiMap[girlNakshatraIdx % 27];
  let nadiObtained = 8;
  let isNadiDosh = false;

  if (boyNadi === girlNadi) {
    nadiObtained = 0;
    isNadiDosh = true;
  } else {
    nadiObtained = 8;
  }

  const rawTotal = varnaObtained + vashyaObtained + taraObtained + yoniObtained + grahaMaitriObtained + ganaObtained + bhakootObtained + nadiObtained;
  const totalGunas = Math.min(36, Math.max(0, Math.round(rawTotal * 2) / 2));
  const percentage = Math.round((totalGunas / 36) * 100);

  let verdict: GunMilanResult['verdict'] = 'अति उत्तम (Highly Recommended)';
  if (totalGunas >= 28) {
    verdict = 'अति उत्तम (Highly Recommended)';
  } else if (totalGunas >= 21) {
    verdict = 'उत्तम (Good Match)';
  } else if (totalGunas >= 18) {
    verdict = 'मध्यम (Average with Remedies)';
  } else {
    verdict = 'विचारणीय (Caution / Remedies Needed)';
  }

  const kootas = [
    { name: "1. वर्ण (Varna)", description: "कार्य एवं आध्यात्मिक स्वभाव", obtained: varnaObtained, maximum: 1, impact: varnaObtained >= 1 ? "उत्तम अनुकूलता" : "सामान्य" },
    { name: "2. वश्य (Vashya)", description: "आपसी आकर्षण व नियंत्रण", obtained: vashyaObtained, maximum: 2, impact: vashyaObtained >= 1.5 ? "प्रगाढ़ सामंजस्य" : "संतोषजनक" },
    { name: "3. तारा (Tara)", description: "भाग्य, आयु व आरोग्य", obtained: taraObtained, maximum: 3, impact: taraObtained >= 2 ? "भाग्यवर्धक योग" : "मध्यम" },
    { name: "4. योनि (Yoni)", description: "शारीरिक व जैविक अनुकूलता", obtained: yoniObtained, maximum: 4, impact: yoniObtained >= 3 ? "सुखद दांपत्य" : "सामान्य" },
    { name: "5. ग्रहमैत्री (Graha Maitri)", description: "मानसिक तालमेल व मित्रता", obtained: grahaMaitriObtained, maximum: 5, impact: grahaMaitriObtained >= 4 ? "विचारों में गहरी एकता" : "मतभेद संभव" },
    { name: "6. गण (Gana)", description: "व्यवहार, आचार-विचार व प्रकृति", obtained: ganaObtained, maximum: 6, impact: isGanaDosh ? "गण दोष (उपाय आवश्यक)" : "उत्तम सामंजस्य" },
    { name: "7. भकूट (Bhakoot)", description: "पारिवारिक समृद्धि व संतान सुख", obtained: bhakootObtained, maximum: 7, impact: isBhakootDosh ? "भकूट दोष विचारणीय" : "सुख-समृद्धि योग" },
    { name: "8. नाड़ी (Nadi)", description: "स्वास्थ्य, आनुवंशिकी व वंश वृद्धि", obtained: nadiObtained, maximum: 8, impact: isNadiDosh ? "नाड़ी दोष (विस्तृत शांति अपेक्षित)" : "दीर्घायु व स्वस्थ संतान" }
  ];

  const recommendations: string[] = [];
  if (totalGunas >= 24 && !isNadiDosh && !isBhakootDosh) {
    recommendations.push("वर एवं वधू की कुंडली में 36 में से " + totalGunas + " गुण प्राप्त हुए हैं। यह विवाह अत्यंत मंगलमय और सुखदायी रहेगा।");
    recommendations.push("सप्तम भाव के स्वामी की अनुकूलता से दांपत्य जीवन में दीर्घायु एवं संतान सुख रहेगा।");
  } else {
    if (isNadiDosh) {
      recommendations.push("नाड़ी दोष परिहार: यदि दोनों के नक्षत्र के चरण भिन्न हों या राशि स्वामी मित्र हों तो दोष क्षीण होता है। स्वर्ण दान अथवा महामृत्युंजय जप से पूर्ण शांति कराएं।");
    }
    if (isBhakootDosh) {
      recommendations.push("भकूट दोष उपाय: दोनों यदि भगवान शिव-पार्वती की संयुक्त पूजा एवं एकादशी व्रत करें तो दांपत्य जीवन में प्रेम सदा बना रहता है।");
    }
    if (isGanaDosh) {
      recommendations.push("गण दोष उपाय: विवाह पूर्व गुरु और माता-पिता का आशीर्वाद लें तथा श्री विष्णु सहस्रनाम का पाठ करें।");
    }
    recommendations.push("विस्तृत कुंडली एवं सप्तम भाव परीक्षण हेतु भवानी ज्योतिष केंद्र, मेहसाणा से व्यक्तिगत परामर्श प्राप्त करें।");
  }

  return {
    boyName: boyName || "वर (Groom)",
    girlName: girlName || "वधू (Bride)",
    boyRashi: RASHIS[boyRashiIdx]?.nameHi || 'मेष',
    girlRashi: RASHIS[girlRashiIdx]?.nameHi || 'सिंह',
    boyNakshatra: NAKSHATRAS[boyNakshatraIdx] || NAKSHATRAS[0],
    girlNakshatra: NAKSHATRAS[girlNakshatraIdx] || NAKSHATRAS[0],
    totalGunas,
    maxGunas: 36,
    percentage,
    verdict,
    isNadiDosh,
    isBhakootDosh,
    isGanaDosh,
    kootas,
    recommendations
  };
}
