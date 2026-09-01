import { KundliInput, KundliResult, GunMilanResult, PlanetPosition } from '../types/astrology';
import { RASHIS, NAKSHATRAS } from '../data/astrologyData';
import { INDIAN_CITIES_DATABASE } from '../data/indianCities';

const RASHI_NAMES = [
  "मेष (Aries)", "वृषभ (Taurus)", "मिथुन (Gemini)", "कर्क (Cancer)",
  "सिंह (Leo)", "कन्या (Virgo)", "तुला (Libra)", "वृश्चिक (Scorpio)",
  "धनु (Sagittarius)", "मकर (Capricorn)", "कुंभ (Aquarius)", "मीन (Pisces)"
];

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Convert Date & Time (in IST UTC+5:30) to Julian Day (JD)
function getJulianDayIST(year: number, month: number, day: number, hour: number, minute: number): { jd: number; t: number } {
  // IST is UTC + 5:30 -> subtract 5.5 hours to get UTC
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

  return { jd, t };
}

// Lahiri (Chitra Paksha) Ayanamsha in degrees
function getLahiriAyanamsha(t: number): number {
  // At J2000.0 (JD 2451545.0) Lahiri is ~23.853056 degrees (23°51'11")
  return 23.8530556 + 1.39604167 * t + 0.000308 * (t * t);
}

// Greenwich Mean Sidereal Time (degrees)
function getGMST(jd: number, t: number): number {
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * (t * t) - (t * t * t) / 38710000;
  return normalizeDeg(gmst);
}

// Calculate Sidereal Ascendant (Lagna)
function calculateLagna(jd: number, t: number, ayanamsha: number, lat: number, lon: number): number {
  const gmst = getGMST(jd, t);
  const ramc = normalizeDeg(gmst + lon); // Local Sidereal Time in degrees
  const eps = (23.4392911 - 0.0130042 * t) * DEG_TO_RAD; // Obliquity of ecliptic
  const theta = ramc * DEG_TO_RAD;
  const phi = lat * DEG_TO_RAD;

  const y = -Math.cos(theta);
  const x = Math.sin(theta) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps);
  let ascTropical = Math.atan2(y, x) * RAD_TO_DEG;
  ascTropical = normalizeDeg(ascTropical);

  const ascSidereal = normalizeDeg(ascTropical - ayanamsha);
  return ascSidereal;
}

// Calculate Sun position (Sidereal)
function calculateSun(t: number, ayanamsha: number): { siderealDeg: number; isRetrograde: boolean } {
  const L0 = normalizeDeg(280.46646 + 36000.76983 * t + 0.0003032 * t * t);
  const M = normalizeDeg(357.52911 + 35999.05029 * t - 0.0001537 * t * t) * DEG_TO_RAD;
  const C = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(M) +
            (0.019993 - 0.000101 * t) * Math.sin(2 * M) +
            0.000289 * Math.sin(3 * M);
  const trueTrop = normalizeDeg(L0 + C);
  const sidereal = normalizeDeg(trueTrop - ayanamsha);
  return { siderealDeg: sidereal, isRetrograde: false };
}

// Calculate Moon position (Sidereal)
function calculateMoon(t: number, ayanamsha: number): { siderealDeg: number; isRetrograde: boolean } {
  const L = normalizeDeg(218.3164477 + 481267.88128 * t);
  const D = normalizeDeg(297.8501921 + 445267.11140 * t) * DEG_TO_RAD;
  const M = normalizeDeg(357.5291092 + 35999.05029 * t) * DEG_TO_RAD; // Sun anomaly
  const Mm = normalizeDeg(134.9633964 + 477198.86750 * t) * DEG_TO_RAD; // Moon anomaly
  const F = normalizeDeg(93.2720950 + 483202.01752 * t) * DEG_TO_RAD; // Moon arg of latitude

  // Periodic perturbation terms
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
                 0.015327 * Math.sin(2 * D - 2 * F);

  const tropMoon = normalizeDeg(L + lTerms);
  const sidereal = normalizeDeg(tropMoon - ayanamsha);
  return { siderealDeg: sidereal, isRetrograde: false };
}

// Calculate Keplerian planet geocentric ecliptic longitude
function calculatePlanet(
  t: number,
  ayanamsha: number,
  sunTropLong: number,
  elements: { a: number; e0: number; eRate: number; i0: number; l0: number; lRate: number; w0: number; wRate: number }
): { siderealDeg: number; isRetrograde: boolean } {
  const e = elements.e0 + elements.eRate * t;
  const L = normalizeDeg(elements.l0 + elements.lRate * t);
  const w = normalizeDeg(elements.w0 + elements.wRate * t);
  const M = normalizeDeg(L - w) * DEG_TO_RAD;

  // Equation of center
  const C = (2 * e - (e * e * e) / 4) * Math.sin(M) +
            (5 / 4) * (e * e) * Math.sin(2 * M) +
            (13 / 12) * (e * e * e) * Math.sin(3 * M);
  const helioLong = normalizeDeg(L + C * RAD_TO_DEG);
  const r = (elements.a * (1 - e * e)) / (1 + e * Math.cos(M + C));

  // Earth heliocentric coordinates (approx radius 1.0)
  const earthLong = normalizeDeg(sunTropLong + 180);
  const dHelio = (helioLong - earthLong) * DEG_TO_RAD;

  // Geocentric longitude
  const x = r * Math.cos(dHelio) - 1.0;
  const y = r * Math.sin(dHelio);
  let geoLong = earthLong + Math.atan2(y, x) * RAD_TO_DEG;
  geoLong = normalizeDeg(geoLong);

  // Retrograde condition approximation based on angular elongation from Sun
  const elong = normalizeDeg(geoLong - sunTropLong);
  let isRetrograde = false;
  if (elements.a > 1.0) {
    // Superior planets (Mars, Jupiter, Saturn) retrograde near opposition (120° - 240°)
    if (elong > 135 && elong < 225) isRetrograde = true;
  } else {
    // Inferior planets (Mercury, Venus) retrograde near inferior conjunction
    if (elong > 340 || elong < 20) isRetrograde = true;
  }

  const sidereal = normalizeDeg(geoLong - ayanamsha);
  return { siderealDeg: sidereal, isRetrograde };
}

// Rahu (Mean Node) and Ketu
function calculateNodes(t: number, ayanamsha: number): { rahu: number; ketu: number } {
  const meanNode = normalizeDeg(125.04452 - 1934.136261 * t + 0.0020708 * t * t);
  const siderealRahu = normalizeDeg(meanNode - ayanamsha);
  const siderealKetu = normalizeDeg(siderealRahu + 180);
  return { rahu: siderealRahu, ketu: siderealKetu };
}

// Calculate exact Planetary Dignity in Vedic Astrology
function getPlanetaryDignity(planetName: string, rashiIdx: number, degreeInRashi: number): PlanetPosition['dignity'] {
  // rashiIdx: 0=Mesha, 1=Vrishabha, 2=Mithuna, 3=Karka, 4=Simha, 5=Kanya, 6=Tula, 7=Vrishchika, 8=Dhanu, 9=Makara, 10=Kumbha, 11=Meena
  switch (planetName) {
    case 'सूर्य (Sun)':
      if (rashiIdx === 0 && degreeInRashi <= 10) return 'उच्च (Exalted)';
      if (rashiIdx === 6 && degreeInRashi <= 10) return 'नीच (Debilitated)';
      if (rashiIdx === 4) return 'स्वराशि (Own)';
      if ([8, 11, 7, 3].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([1, 6, 9, 10].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'चंद्र (Moon)':
      if (rashiIdx === 1 && degreeInRashi <= 3) return 'उच्च (Exalted)';
      if (rashiIdx === 7 && degreeInRashi <= 3) return 'नीच (Debilitated)';
      if (rashiIdx === 3) return 'स्वराशि (Own)';
      if ([0, 4, 2, 5].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([8, 11, 9, 10].includes(rashiIdx)) return 'सम (Neutral)';
      return 'शत्रु (Enemy)';

    case 'मंगल (Mars)':
      if (rashiIdx === 9 && degreeInRashi <= 28) return 'उच्च (Exalted)';
      if (rashiIdx === 3 && degreeInRashi <= 28) return 'नीच (Debilitated)';
      if ([0, 7].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([4, 8, 11, 3].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([2, 5].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'बुध (Mercury)':
      if (rashiIdx === 5 && degreeInRashi <= 15) return 'उच्च (Exalted)';
      if (rashiIdx === 11 && degreeInRashi <= 15) return 'नीच (Debilitated)';
      if ([2, 5].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([4, 1, 6].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([3].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'बृहस्पति (Jupiter)':
      if (rashiIdx === 3 && degreeInRashi <= 5) return 'उच्च (Exalted)';
      if (rashiIdx === 9 && degreeInRashi <= 5) return 'नीच (Debilitated)';
      if ([8, 11].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([0, 4, 7].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([2, 5, 1, 6].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'शुक्र (Venus)':
      if (rashiIdx === 11 && degreeInRashi <= 27) return 'उच्च (Exalted)';
      if (rashiIdx === 5 && degreeInRashi <= 27) return 'नीच (Debilitated)';
      if ([1, 6].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([2, 5, 9, 10].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([4, 3].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'शनि (Saturn)':
      if (rashiIdx === 6 && degreeInRashi <= 20) return 'उच्च (Exalted)';
      if (rashiIdx === 0 && degreeInRashi <= 20) return 'नीच (Debilitated)';
      if ([9, 10].includes(rashiIdx)) return 'स्वराशि (Own)';
      if ([2, 5, 1, 6].includes(rashiIdx)) return 'मित्र (Friendly)';
      if ([4, 3, 0, 7].includes(rashiIdx)) return 'शत्रु (Enemy)';
      return 'सम (Neutral)';

    case 'राहु (Rahu)':
      if ([1, 2].includes(rashiIdx)) return 'उच्च (Exalted)';
      if ([7, 8].includes(rashiIdx)) return 'नीच (Debilitated)';
      if (rashiIdx === 10) return 'स्वराशि (Own)';
      if ([1, 6, 2, 5].includes(rashiIdx)) return 'मित्र (Friendly)';
      return 'शत्रु (Enemy)';

    case 'केतु (Ketu)':
      if ([7, 8].includes(rashiIdx)) return 'उच्च (Exalted)';
      if ([1, 2].includes(rashiIdx)) return 'नीच (Debilitated)';
      if (rashiIdx === 7) return 'स्वराशि (Own)';
      if ([0, 4, 8, 11].includes(rashiIdx)) return 'मित्र (Friendly)';
      return 'शत्रु (Enemy)';

    default:
      return 'सम (Neutral)';
  }
}

export function calculateVedicKundli(input: KundliInput): KundliResult {
  // Find exact latitude and longitude for the location
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

  // 4. Sun & Moon
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
    a: 1.52366231, e0: 0.09341233, eRate: 0.00011902, i0: 1.85061,
    l0: 355.45332, lRate: 19140.302684, w0: 336.04084, wRate: 1.84105
  });

  const mercuryData = calculatePlanet(t, ayanamsha, sunTropLong, {
    a: 0.38709893, e0: 0.20563069, eRate: 0.00002527, i0: 7.00487,
    l0: 252.25032, lRate: 149472.674111, w0: 77.45780, wRate: 1.55648
  });

  const jupiterData = calculatePlanet(t, ayanamsha, sunTropLong, {
    a: 5.20336301, e0: 0.04839266, eRate: -0.00012880, i0: 1.30530,
    l0: 34.40438, lRate: 3034.746128, w0: 14.75385, wRate: 1.61273
  });

  const venusData = calculatePlanet(t, ayanamsha, sunTropLong, {
    a: 0.72333199, e0: 0.00677323, eRate: -0.00004938, i0: 3.39471,
    l0: 181.97909, lRate: 58517.803875, w0: 131.57294, wRate: 1.40222
  });

  const saturnData = calculatePlanet(t, ayanamsha, sunTropLong, {
    a: 9.53707032, e0: 0.05415060, eRate: -0.00036762, i0: 2.48446,
    l0: 49.94432, lRate: 1222.493622, w0: 92.43194, wRate: 1.95842
  });

  const nodes = calculateNodes(t, ayanamsha);

  // Array of 9 Grahas
  const rawPlanets = [
    { name: 'सूर्य (Sun)', lord: 'सूर्य', siderealDeg: sunData.siderealDeg, isRetrograde: false },
    { name: 'चंद्र (Moon)', lord: 'चंद्र', siderealDeg: moonData.siderealDeg, isRetrograde: false },
    { name: 'मंगल (Mars)', lord: 'मंगल', siderealDeg: marsData.siderealDeg, isRetrograde: marsData.isRetrograde },
    { name: 'बुध (Mercury)', lord: 'बुध', siderealDeg: mercuryData.siderealDeg, isRetrograde: mercuryData.isRetrograde },
    { name: 'बृहस्पति (Jupiter)', lord: 'गुरु', siderealDeg: jupiterData.siderealDeg, isRetrograde: jupiterData.isRetrograde },
    { name: 'शुक्र (Venus)', lord: 'शुक्र', siderealDeg: venusData.siderealDeg, isRetrograde: venusData.isRetrograde },
    { name: 'शनि (Saturn)', lord: 'शनि', siderealDeg: saturnData.siderealDeg, isRetrograde: saturnData.isRetrograde },
    { name: 'राहु (Rahu)', lord: 'राहु', siderealDeg: nodes.rahu, isRetrograde: true },
    { name: 'केतु (Ketu)', lord: 'केतु', siderealDeg: nodes.ketu, isRetrograde: true }
  ];

  // Map to Houses (1 to 12)
  const housesMap: { [h: number]: { houseNumber: number; rashi: string; planetsInHouse: string[] } } = {};
  for (let h = 1; h <= 12; h++) {
    const rashiIdxForHouse = (ascendantIdx + h - 1) % 12;
    housesMap[h] = { houseNumber: h, rashi: RASHI_NAMES[rashiIdxForHouse], planetsInHouse: [] };
  }

  const planets: PlanetPosition[] = [];
  let marsHouse = 1;
  let marsRashiIndex = 0;

  rawPlanets.forEach((p) => {
    const rashiIndex = Math.floor(p.siderealDeg / 30);
    const degreeInRashi = Math.round((p.siderealDeg % 30) * 100) / 100;
    const houseNum = ((rashiIndex - ascendantIdx + 12) % 12) + 1;
    const dignity = getPlanetaryDignity(p.name, rashiIndex, degreeInRashi);

    if (p.name.startsWith('मंगल')) {
      marsHouse = houseNum;
      marsRashiIndex = rashiIndex;
    }

    planets.push({
      planet: p.name,
      rashi: RASHI_NAMES[rashiIndex],
      degree: degreeInRashi,
      house: houseNum,
      isRetrograde: p.isRetrograde,
      dignity,
      lord: p.lord
    });

    housesMap[houseNum].planetsInHouse.push(p.name.split(' ')[0]);
  });

  const houses = Object.values(housesMap);

  // 7. Manglik Status (Classical Parashara Kuja Dosha Rules)
  // Mars in 1, 4, 7, 8, 12 from Lagna or Moon
  const marsFromMoon = ((marsRashiIndex - moonRashiIdx + 12) % 12) + 1;
  let manglikStatus: KundliResult['manglikStatus'] = 'गैर-मांगलिक (Non-Manglik)';

  const manglikHouses = [1, 4, 7, 8, 12];
  const isLagnaManglik = manglikHouses.includes(marsHouse);
  const isMoonManglik = manglikHouses.includes(marsFromMoon);

  if (isLagnaManglik || isMoonManglik) {
    // Exceptions / Mitigations (Kuja Dosha Bhanga)
    // 1. Mars in Aries in 1st, Scorpio in 4th, Capricorn in 7th/8th, Sagittarius in 12th
    const isExempt = (marsHouse === 1 && marsRashiIndex === 0) ||
                     (marsHouse === 4 && marsRashiIndex === 7) ||
                     (marsHouse === 7 && marsRashiIndex === 9) ||
                     (marsHouse === 8 && marsRashiIndex === 3) ||
                     (marsHouse === 12 && marsRashiIndex === 8);

    if (isExempt || (isMoonManglik && !isLagnaManglik)) {
      manglikStatus = 'आंशिक मांगलिक (Partial Manglik)';
    } else {
      manglikStatus = 'मांगलिक (Manglik)';
    }
  } else if ([2].includes(marsHouse)) {
    manglikStatus = 'आंशिक मांगलिक (Partial Manglik)';
  }

  // 8. Authentic Vimshottari Mahadasha Progression
  const dashaLords = [
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
  const birthLordTotalYears = dashaLords[birthLordIdx].years;
  const balanceAtBirth = (1 - fracPassed) * birthLordTotalYears;

  const currentYear = new Date().getFullYear();
  let currentDasha = dashaLords[birthLordIdx].name;
  let dashaEndYear = input.year + balanceAtBirth;
  let dashaIdx = birthLordIdx;

  if (currentYear > dashaEndYear) {
    while (dashaEndYear < currentYear) {
      dashaIdx = (dashaIdx + 1) % 9;
      dashaEndYear += dashaLords[dashaIdx].years;
    }
    currentDasha = dashaLords[dashaIdx].name;
  }
  const displayEndYear = Math.ceil(dashaEndYear);

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
    moonRashi: RASHI_NAMES[moonRashiIdx],
    sunRashi: RASHI_NAMES[sunRashiIdx],
    nakshatra: NAKSHATRAS[nakshatraIdx] || NAKSHATRAS[0],
    nakshatraCharan,
    currentDasha,
    dashaEndYear: displayEndYear,
    manglikStatus,
    planets,
    houses,
    lifePrediction: {
      general: `आपका जन्म ${lagnaName} लग्न एवं ${moonName} राशि में, ${NAKSHATRAS[nakshatraIdx] || 'वैदिक'} नक्षत्र के ${nakshatraCharan} चरण में हुआ है। लग्नेश की स्थिति के अनुसार आप विचारशील, स्वाभिमानी, पुरुषार्थी और लक्ष्य के प्रति समर्पित जातक हैं। जीवन में 24वें, 28वें, 32वें एवं 36वें वर्ष में महत्वपूर्ण भाग्योदय के प्रबल योग हैं।`,
      career: careerDescriptions[ascendantIdx] || `दशम भाव में शुभ ग्रह दृष्टि से आपको करियर में निरंतर पदोन्नति एवं आर्थिक समृद्धि प्राप्त होगी। वर्तमान में चल रही ${currentDasha} महादशा नए व्यावसायिक अवसरों का सृजन कर रही है।`,
      marriage: `सप्तम भाव का विश्लेषण दर्शाता है कि आपका जीवनसाथी गुणवान, सुसंस्कृत और परिवार को साथ लेकर चलने वाला होगा। ${manglikStatus === 'मांगलिक (Manglik)' ? 'कुंडली में मांगलिक योग होने के कारण विवाह पूर्व गुण मिलान एवं मंगल शांति अनुष्ठान कराने से दांपत्य में सुख-शांति बनी रहेगी।' : 'वैवाहिक जीवन में परस्पर विश्वास, स्नेह और सहयोग उत्तम रहेगा।'}`,
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

export function calculateGunMilan(
  boyName: string,
  girlName: string,
  boyRashiIdx: number,
  girlRashiIdx: number,
  boyNakshatraIdx: number,
  girlNakshatraIdx: number
): GunMilanResult {
  // 8 Kootas classical Ashtakoota scoring

  // 1. Varna (1 point): Caste / Temperament
  // 0: Brahmin (Cancer, Scorpio, Pisces), 1: Kshatriya (Aries, Leo, Sag), 2: Vaishya (Taurus, Virgo, Cap), 3: Shudra (Gemini, Libra, Aquar)
  const getVarna = (r: number) => {
    if ([3, 7, 11].includes(r)) return 3; // Brahmin
    if ([0, 4, 8].includes(r)) return 2;  // Kshatriya
    if ([1, 5, 9].includes(r)) return 1;  // Vaishya
    return 0;                             // Shudra
  };
  const boyVarna = getVarna(boyRashiIdx);
  const girlVarna = getVarna(girlRashiIdx);
  const varnaObtained = boyVarna >= girlVarna ? 1 : 0;

  // 2. Vashya (2 points): Mutual control & attraction
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

  // 3. Tara (3 points): Dina / Longevity
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

  // 4. Yoni (4 points): Physical harmony (14 animal types)
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

  // 5. Graha Maitri (5 points): Friendship between Rashi lords
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

  // 6. Gana (6 points): Deva (0), Manushya (1), Rakshasa (2)
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

  // 7. Bhakoot (7 points): Rashi distance
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

  // 8. Nadi (8 points): Adi (0), Madhya (1), Antya (2)
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
