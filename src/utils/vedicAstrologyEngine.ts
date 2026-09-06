import { ASTROLOGER_INFO } from '../data/astrologyData';

export interface AstrologyAnswer {
  title: string;
  analysis: string;
  remedies: string[];
  auspiciousTiming: string;
  mantra: string;
}

export function generateVedicAstrologyGuidance(query: string, lang: 'hi' | 'gu' | 'en' = 'hi'): string {
  const q = query.toLowerCase();

  // Match topics
  if (q.includes('विवाह') || q.includes('शादी') || q.includes('लग्न') || q.includes('marriage') || q.includes('रिश्ता') || q.includes('जीवनसाथी')) {
    if (lang === 'en') {
      return `🚩 Jai Maa Bhavani! Vedic Astrological Analysis regarding Marriage & Soulmate:

✨ Planetary Alignment: In your horoscope, Jupiter (Guru) and Venus (Shukra) are the primary signifiers of marriage and marital happiness. Favorable planetary transits indicate promising marital alliances within the next 3 to 6 months.

🌿 Vedic Remedies:
1. Offer water and turmeric to a banana tree every Thursday, and feed roasted chana and jaggery to a cow.
2. Chant 'Om Namo Bhagavate Vasudevaya' or 'Om Kleem Krishnaya Namah' 108 times daily.
3. Wear light yellow or white garments on Thursdays to strengthen Jupiter and Venus.

📞 For in-depth Janam Kundli Milan, Manglik Dosh remedies & personal consultation with Acharya Virendra Kumar Joshi: ${ASTROLOGER_INFO.phonePrimary}`;
    }
    if (lang === 'gu') {
      return `🚩 જય મા ભવાની! તમારા લગ્ન યોગ વિશે જ્યોતિષીય વિશ્લેષણ:

✨ ગ્રહ સ્થિતિ: કુંડળીમાં ગુરુ (બૃહસ્પતિ) અને શુક્ર ગ્રહ લગ્ન અને સુખી દાંપત્ય જીવનના કારક છે. વર્તમાન ગોચર મુજબ આવનારા 3 થી 6 મહિનામાં સારા સંબંધના પ્રબળ યોગ બની રહ્યા છે.

🌿 અચૂક વૈદિક ઉપાય:
1. દર ગુરુવારે ગાયને ચણાની દાળ અને ગોળ ખવડાવો.
2. રોજ સવારે સ્નાન બાદ 'ૐ નમો ભગવતે વાસુદેવાય' મંત્રનો 108 વાર જાપ કરવો.
3. પીળા વસ્ત્રો અથવા હળદરનું તિલક લગાવવું શુભ રહેશે.

📞 જન્મ કુંડળી મેળાપક અને માંગલિક દોષ નિવારણ માટે પંડિત વીરેન્દ્ર કુમાર જોશીજીનો સંપર્ક કરો: ${ASTROLOGER_INFO.phonePrimary}`;
    }
    return `🚩 जय माँ भवानी! आपके विवाह एवं जीवनसाथी के संबंध में वैदिक ज्योतिषीय विश्लेषण:

✨ ग्रह स्थिति व योग: जन्मकुंडली में देवगुरु बृहस्पति एवं शुक्र विवाह के मुख्य कारक ग्रह हैं। गोचर गणना अनुसार आगामी 3 से 6 माह में शुभ मांगलिक कार्य एवं योग्य वर/वधू प्राप्ति के अनुकूल योग बन रहे हैं।

🌿 अचूक वैदिक उपाय:
1. प्रति गुरुवार भगवान विष्णु एवं माँ लक्ष्मी की पूजा करें तथा केले के वृक्ष में जल अर्पित करें।
2. ॐ क्लीं कृष्णाय नमः अथवा ॐ नमो भगवते वासुदेवाय मंत्र का 108 बार नित्य जाप करें।
3. गुरुवार को गाय को चने की दाल एवं गुड़ खिलाएं।

📞 सटीक कुंडली मिलान, मांगलिक विचार एवं गुण मिलान हेतु मेहसाणा कार्यालय में संपर्क करें: ${ASTROLOGER_INFO.phonePrimary}`;
  }

  if (q.includes('करियर') || q.includes('नौकरी') || q.includes('व्यापार') || q.includes('बिजनेस') || q.includes('job') || q.includes('business') || q.includes('career') || q.includes('प्रमोशन') || q.includes('धंधा') || q.includes('નોકરી') || q.includes('વેપાર')) {
    if (lang === 'en') {
      return `🚩 Jai Maa Bhavani! Vedic Astrological Guidance for Career, Job & Business Growth:

✨ Karma Bhava Analysis: The 10th house (career) and 11th house (gains) are influenced by the Sun, Saturn, and Mercury. Strong transit positions favor promotion, business expansion, and career breakthroughs.

🌿 Vedic Remedies:
1. Offer fresh water with Kumkum to Lord Surya (Sun) every morning at sunrise.
2. Light a mustard oil diya beneath a Peepal tree on Saturdays and recite 'Om Sham Shanaishcharaya Namah'.
3. Place a consecrated Shri Yantra or Kuber Yantra at your workplace for prosperity.

📞 For dedicated Vyapar Vriddhi rituals and business guidance, contact Acharya Ji: ${ASTROLOGER_INFO.phonePrimary}`;
    }
    if (lang === 'gu') {
      return `🚩 જય મા ભવાની! નોકરી, વ્યાપાર અને કારકિર્દી સંબંધી વૈદિક માર્ગદર્શન:

✨ ગ્રહ સ્થિતિ: કુંડળીના દશમ ભાવ (કર્મ ભાવ) પર શનિ અને સૂર્યનો વિશેષ પ્રભાવ રહે છે. યોગ્ય દિશામાં કરેલા પ્રયત્નોથી વેપારમાં વૃદ્ધિ અને નવી નોકરીમાં પદોન્નતિના ઉત્તમ યોગ છે.

🌿 અચૂક વૈદિક ઉપાય:
1. દરરોજ સવારે તાંબાના લોટાથી સૂર્યદેવને અર્ઘ્ય અર્પણ કરો.
2. દર શનિવારે પીપળાના વૃક્ષ પાસે સરસવના તેલનો દીવો પ્રગટાવો.
3. વ્યવસાય સ્થળ પર શ્રી યંત્ર અથવા લક્ષ્મી-કુબેર યંત્ર સ્થાપિત કરો.

📞 વ્યાપાર વૃદ્ધિ યંત્ર અને વિશેષ અનુષ્ઠાન માટે પંડિતજીનો સંપર્ક કરો: ${ASTROLOGER_INFO.phonePrimary}`;
    }
    return `🚩 जय माँ भवानी! आजीविका, नौकरी एवं व्यापार में उन्नति हेतु वैदिक ज्योतिषीय मार्गदर्शन:

✨ ग्रह स्थिति व कर्म भाव: कुंडली के दशम (कर्म) एवं एकादश (लाभ) भाव में सूर्य, शनि एवं बुध का गोचर अनुकूल परिणाम देने वाला है। यदि परिश्रम के उपरांत भी अपेक्षित फल नहीं मिल रहा है, तो ग्रह दोष शांति से मार्ग प्रशस्त होगा।

🌿 अचूक वैदिक उपाय:
1. प्रतिदिन प्रातः काल सूर्य देव को तांबे के पात्र से रोली व अक्षत मिश्रित जल अर्पित करें।
2. शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक प्रज्वलित करें एवं ॐ शं शनैश्चराय नमः का जाप करें।
3. व्यापार स्थल के मुख्य द्वार पर नियमित कपूर एवं गूगल की धूप दें।

📞 व्यापार बाधा निवारण एवं लक्ष्मी-कुबेर अनुष्ठान हेतु संपर्क करें: ${ASTROLOGER_INFO.phonePrimary}`;
  }

  if (q.includes('मांगलिक') || q.includes('कालसर्प') || q.includes('दोष') || q.includes('पितृ') || q.includes('શાંતિ') || q.includes('દોષ') || q.includes('dosh')) {
    if (lang === 'en') {
      return `🚩 Jai Maa Bhavani! Vedic Remedy for Kundli Doshas (Manglik, Kaal Sarp, Pitru Dosh):

✨ Shastric Insight: Even challenging planetary combinations can be calmed and turned auspicious through authentic Vedic mantras, yagyas, and sanctified gemstones.

🌿 Vedic Remedies:
1. Perform Jalabhisheka with milk, honey, and sacred water on Shivling every Monday.
2. Recite the Maha Mrityunjaya Mantra: 'Om Tryambakam Yajamahe Sugandhim Pushti-vardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat' 108 times daily.
3. Feed birds and offer food donations on Amavasya (New Moon).

📞 For authentic Dosh Nivaran Pujas at consecrated shrines, call our Mehsana center: ${ASTROLOGER_INFO.phonePrimary}`;
    }
    if (lang === 'gu') {
      return `🚩 જય મા ભવાની! કુંડળી દોષ નિવારણ (માંગલિક / કાલસર્પ / પિતૃ દોષ):

✨ શાસ્ત્રોક્ત માર્ગદર્શન: દોષ હોવા છતાં યોગ્ય જાપ, દાન અને વૈદિક અનુષ્ઠાન દ્વારા ગ્રહોના અશુભ પ્રભાવને સંપૂર્ણપણે શાંત કરી શકાય છે.

🌿 વૈદિક ઉપાય:
1. દર સોમવારે શિવલિંગ પર દૂધ, મધ અને ગંગાજળથી અભિષેક કરવો.
2. 'મહામૃત્યુંજય મંત્ર' નો નિત્ય સંકલ્પપૂર્વક જાપ કરવો.
3. અમાસના દિવસે જરૂરિયાતમંદોને અન્ન અને વસ્ત્રનું દાન કરવું.

📞 સિદ્ધ પીઠો પર વિશેષ દોષ શાંતિ પૂજન માટે મહેસાણા ઓફિસનો સંપર્ક કરો: ${ASTROLOGER_INFO.phonePrimary}`;
    }
    return `🚩 जय माँ भवानी! कुंडली के मांगलिक, कालसर्प अथवा पितृ दोष निवारण हेतु मार्गदर्शन:

✨ शास्त्रीय फलादेश: कुंडली में ग्रहों की क्रूर दृष्टि अथवा राहु-केतु जनित दोषों का वैदिक कर्मकांड एवं शुद्ध अनुष्ठान द्वारा पूर्ण निवारण संभव है। इससे जीवन में स्थिरता व शांति आती है।

🌿 अचूक वैदिक उपाय:
1. प्रतिदिन अथवा प्रति सोमवार शिवलिंग पर पंचामृत एवं जल से अभिषेक करें।
2. महामृत्युंजय मंत्र: ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्य Kazोर्मुक्षीय मामृतात्॥ का 108 बार जाप करें।
3. मंगलवार को हनुमान चालीसा एवं सुंदरकांड का पाठ करें।

📞 सिद्ध मंत्रों द्वारा नवग्रह शांति एवं अनुष्ठान हेतु सीधे पंडित जी से संपर्क करें: ${ASTROLOGER_INFO.phonePrimary}`;
  }

  // Default Universal Vedic Response
  if (lang === 'en') {
    return `🚩 Jai Maa Bhavani! Vedic Astrological Analysis for: "${query}":

✨ Planetary & Transit Insight: Your planetary transits and natal astrological influences are aligning favorably. With devotion, positive karma, and authentic Vedic remedies, hurdles will dissolve.

🌿 Daily Vedic Remedies:
1. Chant 'Om Namah Shivaya' or the sacred Gayatri Mantra 108 times with a calm mind each morning.
2. Offer water to Lord Surya and feed grain/jaggery to sacred cows.
3. Light a pure cow ghee lamp at your home altar daily.

📞 For personalized Janam Kundli reading, palmistry & Vedic remedies, consult Acharya Virendra Kumar Joshi: ${ASTROLOGER_INFO.phonePrimary}`;
  }

  if (lang === 'gu') {
    return `🚩 જય મા ભવાની! તમારા પ્રશ્ન "${query}" પર વૈદિક જ્યોતિષીય વિશ્લેષણ:

✨ ગ્રહ-ગોચર પ્રભાવ: તમારી રાશિ અને કુંડળીના ગ્રહો તમને સાનુકૂળ પરિણામ આપવા માટે સક્રિય છે. શ્રદ્ધા અને નિયમિત સાધનાથી દરેક અડચણ દૂર થશે.

🌿 દૈનિક વૈદિક ઉપાય:
1. દરરોજ સવારે 'ૐ નમઃ શિવાય' નો 108 વાર જાપ કરવો.
2. ગાય માતાને રોટલી અને ગોળ ખવડાવવો.
3. ઘરમાં પૂજા સ્થાન પર ઘીનો દીવો પ્રગટાવવો.

📞 વિગતવાર જન્મ કુંડળી વિશ્લેષણ અને વ્યક્તિગત માર્ગદર્શન માટે પંડિત વીરેન્દ્ર કુમાર જોશીજી (મહેસાણા) નો સંપર્ક કરો: ${ASTROLOGER_INFO.phonePrimary}`;
  }

  return `🚩 जय माँ भवानी! आपके प्रश्न "${query}" पर वैदिक ज्योतिषीय विश्लेषण:

✨ ग्रह-गोचर प्रभाव: वर्तमान ग्रह गोचर एवं नवग्रहों की स्थिति आपके पक्ष में सकारात्मक परिवर्तन के संकेत दे रही है। सात्विक दिनचर्या एवं ईश्वर आराधना से सभी बिगड़े कार्य सिद्ध होंगे।

🌿 अचूक वैदिक उपाय:
1. प्रतिदिन प्रातः काल सूर्य देव को जल अर्पित करें तथा ॐ सूर्याय नमः का ध्यान करें।
2. नित्य ॐ नमः शिवाय अथवा गायत्री मंत्र का 108 बार शांत चित्त से जाप करें।
3. बुधवार अथवा गुरुवार को किसी गौशाला में गायों को हरा चारा या गुड़ खिलाएं।

📞 सटीक हस्तरेखा, जन्म कुंडली फलादेश एवं व्यक्तिगत समाधान हेतु संपर्क करें: ${ASTROLOGER_INFO.phonePrimary}`;
}
