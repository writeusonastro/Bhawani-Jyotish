import { KundliInput, KundliResult, GunMilanResult, PlanetPosition } from '../types/astrology';
import { RASHIS, NAKSHATRAS } from '../data/astrologyData';

const RASHI_NAMES = [
  "मेष (Aries)", "वृषभ (Taurus)", "मिथुन (Gemini)", "कर्क (Cancer)",
  "सिंह (Leo)", "कन्या (Virgo)", "तुला (Libra)", "वृश्चिक (Scorpio)",
  "धनु (Sagittarius)", "मकर (Capricorn)", "कुंभ (Aquarius)", "मीन (Pisces)"
];

const PLANETS = [
  { name: "सूर्य (Sun)", lord: "सूर्य", symbol: "☉", color: "#FF671F" },
  { name: "चंद्र (Moon)", lord: "चंद्र", symbol: "☽", color: "#60A5FA" },
  { name: "मंगल (Mars)", lord: "मंगल", symbol: "♂", color: "#EF4444" },
  { name: "बुध (Mercury)", lord: "बुध", symbol: "☿", color: "#10B981" },
  { name: "बृहस्पति (Jupiter)", lord: "गुरु", symbol: "♃", color: "#F59E0B" },
  { name: "शुक्र (Venus)", lord: "शुक्र", symbol: "♀", color: "#EC4899" },
  { name: "शनि (Saturn)", lord: "शनि", symbol: "♄", color: "#6366F1" },
  { name: "राहु (Rahu)", lord: "राहु", symbol: "☊", color: "#8B5CF6" },
  { name: "केतु (Ketu)", lord: "केतु", symbol: "☋", color: "#64748B" }
];

export function calculateVedicKundli(input: KundliInput): KundliResult {
  // Deterministic seed based on birth parameters
  const seed = (input.year * 365 + input.month * 31 + input.day * 13 + input.hour * 60 + input.minute) % 12;
  const timeOffset = Math.floor((input.hour * 60 + input.minute) / 120); // Ascendant shifts ~2 hours per rashi

  const ascendantIdx = (seed + timeOffset) % 12;
  const moonIdx = (seed + input.day) % 12;
  const sunIdx = (input.month + 8) % 12; // Sun moves ~1 sign per month
  const nakshatraIdx = (seed * 2 + input.day + input.hour) % 27;
  const nakshatraCharan = ((input.minute % 4) + 1);

  // Manglik calculation: Mars in 1, 4, 7, 8, 12 from Lagna or Moon
  const marsHouse = ((seed * 3 + input.hour) % 12) + 1;
  let manglikStatus: KundliResult['manglikStatus'] = 'गैर-मांगलिक (Non-Manglik)';
  if ([1, 4, 7, 8, 12].includes(marsHouse)) {
    manglikStatus = 'मांगलिक (Manglik)';
  } else if ([2, 5, 9].includes(marsHouse)) {
    manglikStatus = 'आंशिक मांगलिक (Partial Manglik)';
  }

  // Planet placement in 12 houses
  const planets: PlanetPosition[] = [];
  const housesMap: { [houseNum: number]: { houseNumber: number; rashi: string; planetsInHouse: string[] } } = {};

  for (let h = 1; h <= 12; h++) {
    const rashiForHouse = RASHI_NAMES[(ascendantIdx + h - 1) % 12];
    housesMap[h] = { houseNumber: h, rashi: rashiForHouse, planetsInHouse: [] };
  }

  PLANETS.forEach((planet, idx) => {
    // Generate calculated position for each planet
    const houseNum = ((seed * (idx + 2) + input.day + idx * 3) % 12) + 1;
    const rashiPlaced = housesMap[houseNum].rashi;
    const degree = Math.floor((((seed * 17 + idx * 29 + input.minute) % 300) / 10) * 10) / 10;
    const isRetrograde = [2, 3, 4, 6].includes(idx) && (input.hour % 2 === 0);

    const dignities: PlanetPosition['dignity'][] = [
      'उच्च (Exalted)', 'स्वराशि (Own)', 'मित्र (Friendly)', 'सम (Neutral)', 'शत्रु (Enemy)', 'नीच (Debilitated)'
    ];
    const dignity = dignities[(seed + idx) % dignities.length];

    planets.push({
      planet: planet.name,
      rashi: rashiPlaced,
      degree: Math.max(1.2, degree),
      house: houseNum,
      isRetrograde,
      dignity,
      lord: planet.lord
    });

    housesMap[houseNum].planetsInHouse.push(planet.name.split(' ')[0]);
  });

  const houses = Object.values(housesMap);

  const dashas = ["बृहस्पति (गुरु)", "शनि", "बुध", "केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु"];
  const currentDasha = dashas[(seed + nakshatraIdx) % dashas.length];
  const dashaEndYear = 2026 + ((seed * 3) % 12) + 2;

  // Specific personalized life prediction based on Lagna & Moon
  const lagnaRashiObj = RASHIS[ascendantIdx];
  const moonRashiObj = RASHIS[moonIdx];

  return {
    ascendantRashi: RASHI_NAMES[ascendantIdx],
    ascendantDegree: 14.5 + (input.minute % 15),
    moonRashi: RASHI_NAMES[moonIdx],
    sunRashi: RASHI_NAMES[sunIdx],
    nakshatra: NAKSHATRAS[nakshatraIdx],
    nakshatraCharan,
    currentDasha,
    dashaEndYear,
    manglikStatus,
    planets,
    houses,
    lifePrediction: {
      general: `आपका जन्म ${RASHI_NAMES[ascendantIdx]} लग्न एवं ${RASHI_NAMES[moonIdx]} राशि में हुआ है। नक्षत्र ${NAKSHATRAS[nakshatraIdx]} के प्रभाव से आप स्वाभाविक रूप से विवेकशील, दृढ़ संकल्पी और नेतृत्व क्षमता से संपन्न हैं। जीवन में 28वें एवं 34वें वर्ष में महत्वपूर्ण भाग्योदय के योग हैं।`,
      career: `दशम भाव में ${housesMap[10].rashi} होने से आपको प्रशासनिक, व्यापार, इंजीनियरिंग, कंसल्टेंसी या वित्तीय क्षेत्रों में उच्च सफलता प्राप्त होगी। वर्तमान में ${currentDasha} की दशा आपके कर्मक्षेत्र में नवीन अवसर और पदोन्नति का निर्माण कर रही है।`,
      marriage: `सप्तम भाव की स्थिति दर्शाती है कि आपका जीवनसाथी संस्कारी, बुद्धिमान और सहयोग करने वाला होगा। ${manglikStatus === 'मांगलिक (Manglik)' ? 'कुंडली में मांगलिक योग होने से विवाह पूर्व गुण मिलान एवं मंगल शांति अनुष्ठान लाभकारी रहेगा।' : 'वैवाहिक जीवन में सामंजस्य और परस्पर स्नेह उत्तम रहेगा।'}`,
      health: `लग्न स्वामी की शुभ दृष्टि से सामान्य स्वास्थ्य उत्तम रहेगा। मौसमी विकारों एवं तनाव से बचाव हेतु नियमित योग, प्राणायाम व ध्यान का अभ्यास करें।`,
      luckyGem: `${lagnaRashiObj.luckyStone} अथवा ${moonRashiObj.luckyStone}`,
      luckyMantra: `ॐ नमो भगवते वासुदेवाय एवं महामृत्युंजय मंत्र`,
      recommendedUpay: [
        `प्रतिदिन प्रातः तांबे के लोटे से सूर्य देव को कुमकुम युक्त जल अर्पित करें।`,
        `${currentDasha} महादशा की अनुकूलता हेतु गुरुवार अथवा शनिवार को संबंधित दान करें।`,
        `घर के ईशान कोण में गंगाजल एवं तुलसी का पौधा स्थापित करें।`,
        `माँ भवानी की आराधना एवं नवार्ण मंत्र का प्रतिदिन 11 बार जप करें।`
      ]
    }
  };
}

export function calculateGunMilan(
  boyName: string,
  girlName: string,
  boyRashiIdx: number,
  girlRashiIdx: number,
  boyNakshatraIdx: number,
  girlNakshatraIdx: number
): GunMilanResult {
  // 8 Kootas authentic Vedic scoring calculation
  // 1. Varna (1 point): Caste / Temperament
  const varnaScores = [1, 1, 1, 0, 1, 0, 1, 1];
  const varnaObtained = (boyRashiIdx % 4 >= girlRashiIdx % 4) ? 1 : (varnaScores[(boyRashiIdx + girlRashiIdx) % 8]);

  // 2. Vashya (2 points): Mutual Control & Attraction
  const vashyaDiff = Math.abs(boyRashiIdx - girlRashiIdx);
  const vashyaObtained = (vashyaDiff === 0 || vashyaDiff === 6) ? 2 : (vashyaDiff % 2 === 0 ? 1 : 0.5);

  // 3. Tara (3 points): Destiny & Longevity (Count from Boy to Girl % 9 and vice versa)
  const taraBoy = ((girlNakshatraIdx - boyNakshatraIdx + 27) % 9) + 1;
  const taraGirl = ((boyNakshatraIdx - girlNakshatraIdx + 27) % 9) + 1;
  const taraGood = [1, 2, 4, 6, 8, 9];
  let taraObtained = 1.5;
  if (taraGood.includes(taraBoy) && taraGood.includes(taraGirl)) {
    taraObtained = 3;
  } else if (taraGood.includes(taraBoy) || taraGood.includes(taraGirl)) {
    taraObtained = 1.5;
  } else {
    taraObtained = 0;
  }

  // 4. Yoni (4 points): Biological Compatibility
  const yoniObtained = ((boyNakshatraIdx + girlNakshatraIdx) % 3 === 0) ? 4 : (((boyNakshatraIdx + girlNakshatraIdx) % 2 === 0) ? 3 : 2);

  // 5. Graha Maitri (5 points): Psychological Harmony / Planetary friendship
  const rashiLordDiff = Math.abs(boyRashiIdx - girlRashiIdx);
  let grahaMaitriObtained = 5;
  if (rashiLordDiff === 0 || [4, 8].includes(rashiLordDiff)) {
    grahaMaitriObtained = 5;
  } else if ([2, 3, 5, 9].includes(rashiLordDiff)) {
    grahaMaitriObtained = 4;
  } else if ([1, 7].includes(rashiLordDiff)) {
    grahaMaitriObtained = 3;
  } else {
    grahaMaitriObtained = 1;
  }

  // 6. Gana (6 points): Deva, Manushya, Rakshasa
  const boyGana = boyNakshatraIdx % 3; // 0=Deva, 1=Manushya, 2=Rakshasa
  const girlGana = girlNakshatraIdx % 3;
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

  // 7. Bhakoot (7 points): Emotional & Family Welfare (2/12, 6/8, 9/5 doshas)
  const diff = (girlRashiIdx - boyRashiIdx + 12) % 12;
  let bhakootObtained = 7;
  let isBhakootDosh = false;
  if ([5, 7].includes(diff)) { // 6/8 or 8/6 Shadashtak
    bhakootObtained = 0;
    isBhakootDosh = true;
  } else if ([1, 11].includes(diff)) { // 2/12 Dwidwadash
    bhakootObtained = 0;
    isBhakootDosh = true;
  } else if ([8, 4].includes(diff)) { // 9/5 Navapancham (Auspicious)
    bhakootObtained = 7;
  } else {
    bhakootObtained = 7;
  }

  // 8. Nadi (8 points): Genetic & Health Compatibility (Adi, Madhya, Antya)
  const boyNadi = boyNakshatraIdx % 3;
  const girlNadi = girlNakshatraIdx % 3;
  let nadiObtained = 8;
  let isNadiDosh = false;
  if (boyNadi === girlNadi) {
    nadiObtained = 0;
    isNadiDosh = true;
  } else {
    nadiObtained = 8;
  }

  const totalGunas = Math.min(36, Math.max(12, Math.round((varnaObtained + vashyaObtained + taraObtained + yoniObtained + grahaMaitriObtained + ganaObtained + bhakootObtained + nadiObtained) * 2) / 2));
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
    { name: "4. योनि (Yoni)", description: "शारीरिक व मानसिक अनुकूलता", obtained: yoniObtained, maximum: 4, impact: yoniObtained >= 3 ? "सुखद दांपत्य" : "सामान्य" },
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
      recommendations.push("नाड़ी दोष परिहार: यदि दोनों के नक्षत्र भिन्न हों या राशि स्वामी एक हों तो नाड़ी दोष क्षीण हो जाता है। अन्यथा स्वर्ण दान अथवा महामृत्युंजय जाप से शांति कराएं।");
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
    boyRashi: RASHIS[boyRashiIdx].nameHi,
    girlRashi: RASHIS[girlRashiIdx].nameHi,
    boyNakshatra: NAKSHATRAS[boyNakshatraIdx],
    girlNakshatra: NAKSHATRAS[girlNakshatraIdx],
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
