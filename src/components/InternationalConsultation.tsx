import React, { useState } from 'react';
import { 
  Globe2, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Compass, 
  HeartHandshake, 
  Calendar,
  Award
} from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Language } from '../types/astrology';

interface InternationalConsultationProps {
  lang: Language;
}

interface CountryInfo {
  code: string;
  name: string;
  nameHi: string;
  nameGu: string;
  flag: string;
  timezone: string;
  popularCities: string;
  popularCitiesHi: string;
  popularCitiesGu: string;
  keyServices: string[];
  description: string;
  descriptionHi: string;
  descriptionGu: string;
}

const COUNTRIES: CountryInfo[] = [
  {
    code: 'US',
    name: 'USA (United States)',
    nameHi: 'यूएसए (United States of America)',
    nameGu: 'યુએસએ (United States of America)',
    flag: '🇺🇸',
    timezone: 'EST / CST / MST / PST (US Timezones)',
    popularCities: 'New Jersey (Edison, Iselin), California (San Jose, Fremont, Bay Area, LA), Texas (Dallas, Houston, Austin), New York, Chicago, Atlanta',
    popularCitiesHi: 'न्यू जर्सी (एडिसन, इस्लिन), कैलिफोर्निया (सैन जोस, फ्रेमोंट, बे एरिया), टेक्सास (डलास, ह्यूस्टन, ऑस्टिन), न्यूयॉर्क, शिकागो, अटलांटा',
    popularCitiesGu: 'ન્યૂ જર્સી (એડિસન, ઇસ્લિન), કેલિફોર્નિયા (સેન જોસ, ફ્રેમોન્ટ, બે એરિયા), ટેક્સાસ (ડલાસ, હ્યુસ્ટન, ઓસ્ટિન), ન્યૂયોર્ક, શિકાગો, એટલાન્ટા',
    keyServices: [
      'NRI 36 Gun Milan across Timezones',
      'Foreign Birth Janam Kundli with DST Precision',
      'Career, H1B & Green Card Astrological Timing',
      'Griha Pravesh & Business Vastu Guidance'
    ],
    description: 'Trusted by over 4,500+ Indian & Gujarati families across North America for accurate Vedic horoscope guidance and marriage matching.',
    descriptionHi: 'उत्तरी अमेरिका में बसे 4,500+ भारतीय एवं गुजराती परिवारों द्वारा प्रामाणिक जन्म कुंडली एवं विवाह मिलान हेतु प्रतिष्ठित।',
    descriptionGu: 'ઉત્તર અમેરિકામાં વસતા 4,500+ ભારતીય અને ગુજરાતી પરિવારો દ્વારા અધિકૃત કુંડળી તેમજ લગ્ન ગુણ મિલન માટે વિશ્વસનીય.'
  },
  {
    code: 'CA',
    name: 'Canada',
    nameHi: 'कनाडा (Canada)',
    nameGu: 'કેનેડા (Canada)',
    flag: '🇨🇦',
    timezone: 'EST / CST / MST / PST (Canada Time)',
    popularCities: 'Toronto, Brampton, Mississauga, Calgary, Vancouver, Surrey, Edmonton, Ottawa',
    popularCitiesHi: 'टोरंटो, ब्रैम्पटन, मिसिसॉगा, कैलगरी, वैंकूवर, सरे, एडमॉन्टन, ओटावा',
    popularCitiesGu: 'ટોરોન્ટો, બ્રેમ્પટન, મિસિસોગા, કેલગરી, વાનકુવર, સરે, એડમોન્ટન, ઓટાવા',
    keyServices: [
      '36 Gun Milan for Canadian NRI Couples',
      'Permanent Residency (PR) & Settlement Timing',
      'Accurate DST Calculation for Canadian Born Children',
      'Manglik Dosh & Navagraha Shanti Remedies'
    ],
    description: 'Specialized consultation for Punjabi, Gujarati, and Indian families across Ontario, Alberta, and British Columbia.',
    descriptionHi: 'ओंटारियो, अलबर्टा एवं ब्रिटिश कोलंबिया के प्रवासी परिवारों हेतु विशेष वैदिक समाधान।',
    descriptionGu: 'ઓન્ટારિયો, અલ્બર્ટા અને બ્રિટિશ કોલંબિયાના પ્રવાસી ગુજરાતી પરિવારો માટે વિશેષ વૈદિક સમાધાન.'
  },
  {
    code: 'GB',
    name: 'United Kingdom (UK)',
    nameHi: 'यूनाइटेड किंगडम (UK - लंदन, लीसेस्टर)',
    nameGu: 'યુનાઇટેડ કિંગડમ (UK - લંડન, લિસેસ્ટર)',
    flag: '🇬🇧',
    timezone: 'GMT / BST (London Time)',
    popularCities: 'London, Leicester, Wembley, Harrow, Birmingham, Manchester, Coventry, Ilford',
    popularCitiesHi: 'लंदन, लीसेस्टर, वेम्बली, हैरो, बर्मिंघम, मैनचेस्टर, कोवेंट्री, इलफोर्ड',
    popularCitiesGu: 'લંડન, લિસેસ્ટર, વેમ્બલી, હેરો, બર્મિંગહામ, માન્ચેસ્ટર, કોવેન્ટ્રી, ઇલફોર્ડ',
    keyServices: [
      'Authentic Gujarati Family Kundli Tradition',
      'Matrimonial Gun Milan & Dosha Parihar',
      'Business Expansion & Commercial Muhurat',
      'Spiritual Remedies & Vedic Puja Sankalp'
    ],
    description: 'Serving British Gujarati and Indian communities for 35+ years with traditional Vedic principles and ethical astrological advice.',
    descriptionHi: 'ब्रिटेन के गुजराती एवं भारतीय समाज के साथ 35+ वर्षों से निरंतर शास्त्रोक्त मार्गदर्शन।',
    descriptionGu: 'બ્રિટનના ગુજરાતી તેમજ ભારતીય સમાજ સાથે 35+ વર્ષોથી નિરંતર શાસ્ત્રોક્ત માર્ગદર્શન.'
  },
  {
    code: 'AE',
    name: 'UAE & Gulf (Dubai, Abu Dhabi)',
    nameHi: 'यूएई एवं खाड़ी देश (दुबई, अबू धाबी)',
    nameGu: 'યુએઈ અને અખાતી દેશો (દુબઈ, અબુ ધાબી)',
    flag: '🇦🇪',
    timezone: 'GST (Gulf Standard Time - UTC+4)',
    popularCities: 'Dubai (Bur Dubai, Karama), Abu Dhabi, Sharjah, Ajman, Doha (Qatar), Muscat (Oman), Kuwait',
    popularCitiesHi: 'दुबई (बुर दुबई, करामा), अबू धाबी, शारजाह, अजमान, दोहा (कतर), मस्कट (ओमान), कुवैत',
    popularCitiesGu: 'દુબઈ (બુર દુબઈ, કરામા), અબુ ધાબી, શારજાહ, અજમાન, દોહા (કતર), મસ્કત (ઓમાન), કુવૈત',
    keyServices: [
      'Commercial Trade & Business Muhurat',
      'Career Promotion & Overseas Job Guidance',
      'Partnership Kundli Compatibility',
      'Office & Villa Vastu Audit Consultation'
    ],
    description: 'Convenient 1.5-hour time difference from India makes same-day video and voice appointments seamless for Gulf residents.',
    descriptionHi: 'भारत से मात्र 1.5 घंटे का समय अंतर होने के कारण गल्फ निवासियों हेतु उसी दिन तत्काल परामर्श उपलब्ध।',
    descriptionGu: 'ભારતથી માત્ર 1.5 કલાકનો સમય તફાવત હોવાથી ગલ્ફ નિવાસીઓ માટે તુરંત પરામર્શ ઉપલબ્ધ.'
  },
  {
    code: 'AU',
    name: 'Australia & New Zealand',
    nameHi: 'ऑस्ट्रेलिया एवं न्यूजीलैंड',
    nameGu: 'ઓસ્ટ્રેલિયા અને ન્યુઝીલેન્ડ',
    flag: '🇦🇺 🇳🇿',
    timezone: 'AEST / AWST / NZST',
    popularCities: 'Sydney, Melbourne, Brisbane, Perth, Adelaide, Auckland, Wellington, Christchurch',
    popularCitiesHi: 'सिडनी, मेलबर्न, ब्रिस्बेन, पर्थ, एडिलेड, ऑकलैंड, वेलिंगटन',
    popularCitiesGu: 'સિડની, મેલબોર્ન, બ્રિસ્બેન, પર્થ, એડિલેડ, ઓકલેન્ડ, વેલિંગ્ટન',
    keyServices: [
      'PR Visa & Settlement Astrological Timing',
      'Southern Hemisphere Accurate Lagna Calculation',
      '36 Gun Milan for Australian NRI Families',
      'Career Stability & New Venture Muhurat'
    ],
    description: 'Dedicated evening and weekend appointment windows aligned with Melbourne, Sydney, and Auckland timezones.',
    descriptionHi: 'सिडनी, मेलबर्न और ऑकलैंड टाइमज़ोन अनुसार शाम एवं सप्ताहांत में विशेष परामर्श स्लॉट उपलब्ध।',
    descriptionGu: 'સિડની, મેલબોર્ન અને ઓકલેન્ડ ટાઈમઝોન અનુસાર સાંજના તેમજ રવિવારના વિશેષ સ્લોટ્સ.'
  },
  {
    code: 'SG',
    name: 'Singapore & Malaysia',
    nameHi: 'सिंगापुर एवं मलेशिया',
    nameGu: 'સિંગાપોર અને મલેશિયા',
    flag: '🇸🇬 🇲🇾',
    timezone: 'SGT / MYT (UTC+8)',
    popularCities: 'Singapore (Little India, Serangoon), Kuala Lumpur, Penang, Johor Bahru, Bangkok',
    popularCitiesHi: 'सिंगापुर (लिटिल इंडिया, सेरांगून), कुआलालंपुर, पेनांग, जोहोर बाहरू, बैंकॉक',
    popularCitiesGu: 'સિંગાપોર (લિટલ ઇન્ડિયા, સેરાંગૂન), કુઆલાલંપુર, પેનાંગ, જોહોર બહારુ, બેંગકોક',
    keyServices: [
      'Matrimonial Gun Milan & Family Harmony',
      'Higher Education & Global Career Kundli',
      'Financial Growth & Investment Timing',
      'Vedic Remedial Gemstone & Rudraksha Guidance'
    ],
    description: 'Trusted astrological counsel for diaspora communities in Singapore and Southeast Asia with convenient timezone overlap.',
    descriptionHi: 'दक्षिण-पूर्व एशिया में बसे भारतीय परिवारों हेतु वैदिक ज्योतिष एवं रत्न परामर्श।',
    descriptionGu: 'દક્ષિણ-પૂર્વ એશિયામાં વસતા ગુજરાતી પરિવારો માટે વૈદિક જ્યોતિષ તેમજ રત્ન માર્ગદર્શન.'
  },
  {
    code: 'DE',
    name: 'Germany & Europe',
    nameHi: 'जर्मनी एवं यूरोप (Germany & Europe)',
    nameGu: 'જર્મની અને યુરોપ (Germany & Europe)',
    flag: '🇩🇪 🇪🇺',
    timezone: 'CET / CEST (Central European Time)',
    popularCities: 'Frankfurt, Berlin, Munich, Amsterdam, Zurich, Dublin, Paris, Warsaw, Stockholm',
    popularCitiesHi: 'फ्रैंकफर्ट, बर्लिन, म्यूनिख, एम्स्टर्डम, ज्यूरिख, डबलिन, पेरिस, वारसॉ',
    popularCitiesGu: 'ફ્રેન્કફર્ટ, બર્લિન, મ્યુનિક, એમ્સ્ટરડેમ, ઝ્યુરિખ, ડબલિન, પેરિસ, વોર્સો',
    keyServices: [
      'EU Work Visa & Blue Card Career Astrology',
      'Accurate European DST Birth Chart Calculations',
      'Kundli Matching for Marriage in Europe',
      'Mental Peace & Navagraha Mantra Upay'
    ],
    description: 'Comprehensive astrological readings for Indian professionals and families residing in Germany, Netherlands, Switzerland, and Ireland.',
    descriptionHi: 'जर्मनी, नीदरलैंड्स, स्विट्जरलैंड व आयरलैंड में कार्यरत भारतीय प्रोफेशनल्स हेतु सटीक मार्गदर्शन।',
    descriptionGu: 'જર્મની, નેધરલેન્ડ્સ, સ્વિટ્ઝર્લેન્ડ અને આયર્લેન્ડમાં વસતા ભારતીય પરિવારો માટે સચોટ માર્ગદર્શન.'
  },
  {
    code: 'ZA',
    name: 'South Africa & Africa',
    nameHi: 'साउथ अफ्रीका एवं अफ्रीका',
    nameGu: 'દક્ષિણ આફ્રિકા અને આફ્રિકા',
    flag: '🇿🇦 🇰🇪',
    timezone: 'SAST / EAT',
    popularCities: 'Durban, Johannesburg, Cape Town, Pretoria, Lenasia, Nairobi (Kenya), Kampala (Uganda)',
    popularCitiesHi: 'डरबन, जोहान्सबर्ग, केप टाउन, प्रिटोरिया, लेनासिया, नैरोबी (केन्या), कंपाला',
    popularCitiesGu: 'ડર્બન, જોહાનિસબર્ગ, કેપ ટાઉન, પ્રિટોરિયા, લેનાસિયા, નૈરોબી (કેન્યા), કંપાલા',
    keyServices: [
      'Ancestral Vedic Horoscope Analysis',
      'Pitru Dosh & Kaal Sarp Shanti Guidance',
      'Family Harmony & Marriage Kundli Milan',
      'Business & Commercial Prosperity Remedies'
    ],
    description: 'Guiding generations of overseas Gujarati and Indian families across South Africa and East Africa with authentic Vedic rites.',
    descriptionHi: 'साउथ अफ्रीका व पूर्वी अफ्रीका में पीढ़ियों से बसे प्रवासी भारतीय परिवारों का अटूट विश्वास।',
    descriptionGu: 'સાઉથ આફ્રિકા અને પૂર્વ આફ્રિકામાં પેઢીઓથી વસતા ગુજરાતી પરિવારોનો અખંડ વિશ્વાસ.'
  }
];

const INTERNATIONAL_FAQS = [
  {
    qEn: 'How can NRI families in the USA, UK, Canada, or UAE schedule a consultation?',
    qHi: 'USA, UK, कनाडा अथवा खाड़ी देशों में रहने वाले NRI परिवार परामर्श कैसे बुक करें?',
    qGu: 'USA, UK, કેનેડા કે ખાડી દેશોમાં વસતા NRI પરિવારો પરામર્શ કેવી રીતે બુક કરી શકે?',
    aEn: 'You can directly message or call Pandit Shri Virendra Kumar Joshi on WhatsApp at +91 99090 87902. Our team coordinates with your home timezone (EST, CST, PST, GMT, GST, AEST) to schedule a dedicated audio or video consultation via WhatsApp or Google Meet.',
    aHi: 'आप सीधे WhatsApp नंबर +91 99090 87902 पर संदेश या कॉल कर सकते हैं। आपके स्थानीय टाइमज़ोन (EST, CST, PST, GMT, GST, AEST) के अनुसार WhatsApp ऑडियो/वीडियो कॉल अथवा Google Meet पर समय निर्धारित किया जाता है।',
    aGu: 'તમે સીધા WhatsApp નંબર +91 99090 87902 પર મેસેજ અથવા કૉલ કરી શકો છો. તમારા સ્થાનિક ટાઈમઝોન અનુસાર WhatsApp પર અનુકૂળ સમયે પરામર્શ આપવામાં આવે છે.'
  },
  {
    qEn: 'How do you ensure 100% accuracy for babies born abroad with Daylight Saving Time (DST)?',
    qHi: 'विदेश में जन्मे बालकों के लिए डेलाइट सेविंग टाइम (DST) का सटीक समायोजन कैसे होता है?',
    qGu: 'વિદેશમાં જન્મેલા બાળકો માટે ડેલાઇટ સેવિંગ ટાઇમ (DST) નું સચોટ ગણિત કેવી રીતે થાય છે?',
    aEn: 'In countries like the USA, Canada, and the UK, clocks are adjusted by 1 hour during DST. A 1-hour discrepancy shifts the Ascendant (Lagna) by approximately 15 to 30 degrees, altering the entire horoscope. Pandit Ji scientifically adjusts for DST, Local Mean Time (LMT), and exact geographic coordinates using Lahiri Ayanamsha for flawless mathematical accuracy.',
    aHi: 'अमेरिका, कनाडा और ब्रिटेन में ग्रीष्मकाल में घड़ियां 1 घंटा आगे (DST) कर दी जाती हैं। 1 घंटे के अंतर से लग्न 15 से 30 डिग्री बदल जाता है जिससे पूरी कुंडली अशुद्ध हो सकती है। पंडित जी DST, स्थानीय सौर समय एवं सटीक अक्षांश-देशांतर का शास्त्रीय समायोजन कर शत-प्रतिशत शुद्ध लग्न चक्र बनाते हैं।',
    aGu: 'અમેરિકા, કેનેડા અને બ્રિટનમાં ઉનાળામાં ઘડિયાળ 1 કલાક આગળ (DST) કરાય છે. 1 કલાકના ફેરફારથી લગ્ન બદલાઈ જાય છે. પંડિતજી DST અને સચોટ લોકેશનનું વૈદિક ગણિત કરીને 100% શુદ્ધ જન્મ કુંડળી તૈયાર કરે છે.'
  },
  {
    qEn: 'Can we consult in Gujarati language from abroad?',
    qHi: 'क्या विदेश से गुजराती भाषा में परामर्श प्राप्त किया जा सकता है?',
    qGu: 'શું વિદેશથી ગુજરાતી ભાષામાં પરામર્શ મેળવી શકાય છે?',
    aEn: 'Yes, absolutely! Pandit Shri Virendra Kumar Joshi has 35+ years of Vedic heritage from Mehsana, North Gujarat. Consultations are natively and fluently available in Gujarati, Hindi, and English as per your family’s preference.',
    aHi: 'हाँ, बिल्कुल! पंडित श्री विरेंद्र कुमार जोशी जी उत्तर गुजरात के प्रतिष्ठित ज्योतिषी हैं और वे गुजराती, हिंदी तथा अंग्रेज़ी तीनों भाषाओं में अत्यंत आत्मीयता से परामर्श प्रदान करते हैं।',
    aGu: 'હા, ચોક્કસપણે! પંડિત શ્રી વિરેન્દ્ર કુમાર જોશી ઉત્તર ગુજરાતના પ્રખ્યાત જ્યોતિષાચાર્ય છે અને તેઓ ગુજરાતી, હિન્દી તેમજ અંગ્રેજીમાં સંપૂર્ણ માર્ગદર્શન આપે છે.'
  },
  {
    qEn: 'What payment options are supported for overseas clients (USA, UK, Canada, Australia)?',
    qHi: 'विदेश से दक्षिणा / शुल्क भुगतान हेतु कौन-कौन से माध्यम उपलब्ध हैं?',
    qGu: 'વિદેશથી ફી/દક્ષિણા ચુકવણી માટે કયા માધ્યમો ઉપલબ્ધ છે?',
    aEn: 'We accept all major secure international payment methods including PayPal, Wise (TransferWise), Remitly, International Credit/Debit Cards, Direct Bank Wire Transfers, and Western Union.',
    aHi: 'अंतर्राष्ट्रीय जातक सुरक्षित रूप से PayPal, Wise (TransferWise), Remitly, अंतर्राष्ट्रीय क्रेडिट/डेबिट कार्ड, डायरेक्ट बैंक वायर ट्रांसफर तथा वेस्टर्न यूनियन द्वारा दक्षिणा प्रेषित कर सकते हैं।',
    aGu: 'આંતરરાષ્ટ્રીય ગ્રાહકો સુરક્ષિત રીતે PayPal, Wise, Remitly, ઇન્ટરનેશનલ ક્રેડિટ/ડેબિટ કાર્ડ્સ તેમજ બેંક ટ્રાન્સફર દ્વારા ચુકવણી કરી શકે છે.'
  },
  {
    qEn: 'How does 36 Gun Milan matchmaking work when the bride and groom live in different countries?',
    qHi: 'वर-वधू अलग-अलग देशों में हों तो 36 गुण विवाह मिलान कैसे किया जाता है?',
    qGu: 'વર-કન્યા અલગ-અલગ દેશોમાં હોય ત્યારે 36 ગુણ વિવાહ મિલન કેવી રીતે થાય છે?',
    aEn: 'We calculate both birth charts with their respective local birth coordinates and timezones, analyzing Ashtakoota 36 Guna, Manglik Dosha, Bhakoot, Nadi Dosha, and 7th/8th house longevity to give a definitive written report and personalized video explanation.',
    aHi: 'दोनों के जन्म स्थान, स्थानीय समय एवं DST के अनुसार सटीक कुंडली बनाकर अष्टकूट 36 गुण, मांगलिक दोष, भकूट, नाड़ी दोष एवं सप्तम भाव का सूक्ष्म विश्लेषण किया जाता है और विस्तृत रिपोर्ट WhatsApp पर दी जाती है।',
    aGu: 'બંનેના જન્મ સ્થળ અને ટાઈમઝોન અનુસાર સચોટ કુંડળી બનાવી અષ્ટકૂટ 36 ગુણ, માંગલિક દોષ, નાડી દોષ અને લગ્ન જીવનનું સંપૂર્ણ વિશ્લેષણ કરી વિગતવાર રિપોર્ટ અપાય છે.'
  }
];

export const InternationalConsultation: React.FC<InternationalConsultationProps> = ({ lang }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeInfo = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  const getWhatsAppInternationalLink = (countryName: string) => {
    const text = encodeURIComponent(
      `🙏 प्रणाम पंडित जी! मैं ${countryName} से संपर्क कर रहा/रही हूँ। मुझे ऑनलाइन वैदिक जन्म कुंडली / 36 गुण विवाह मिलान परामर्श हेतु समय (Appointment) प्राप्त करना है। कृपया मार्गदर्शन प्रदान करें। (Reference: bhawanijyotish.online)`
    );
    return `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="international-consultation" className="py-14 px-4 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-[#FF671F]/30 bg-gradient-to-b from-white via-[#FFFDF9] to-[#FFF5F0] p-6 sm:p-10 shadow-xl shadow-[#FF671F]/10">
        
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-[#FF671F]/30 shadow-sm">
              <Globe2 className="w-4 h-4 text-[#FF671F] animate-pulse" />
              <span>
                {lang === 'en'
                  ? 'Worldwide & NRI Vedic Astrology Consultation'
                  : lang === 'hi'
                  ? 'अंतर्राष्ट्रीय एवं अप्रवासी भारतीय (NRI) ऑनलाइन ज्योतिष परामर्श'
                  : 'આંતરરાષ્ટ્રીય અને NRI ઓનલાઇન જ્યોતિષ પરામર્શ'}
              </span>
            </div>

            <h2 className="font-yatra text-2xl sm:text-3xl lg:text-4xl text-stone-950 mt-3">
              {lang === 'en'
                ? 'Best Indian & Gujarati Astrologer for USA, UK, Canada, UAE & Worldwide'
                : lang === 'hi'
                ? 'USA, UK, कनाडा, UAE, ऑस्ट्रेलिया व यूरोप हेतु #1 प्रामाणिक वैदिक ज्योतिषी'
                : 'USA, UK, કેનેડા, UAE, ઓસ્ટ્રેલિયા અને વિશ્વભર માટે #1 અધિકૃત વૈદિક જ્યોતિષાચાર્ય'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-950 font-medium max-w-3xl mt-2 leading-relaxed">
              {lang === 'en'
                ? 'Serving NRI families worldwide with Daylight Saving Time (DST) corrected Vedic birth charts, 36 Gun Milan marriage matchmaking, overseas career counseling, and authentic Gujarati/Hindi astrological counsel across all timezones.'
                : lang === 'hi'
                ? 'विदेशों में बसे भारतीय एवं गुजराती परिवारों के लिए विशेष ऑनलाइन ज्योतिष सुविधा। आपके देश के टाइमज़ोन (EST, CST, PST, GMT, GST, AEST) अनुसार WhatsApp एवं Google Meet पर व्यक्तिगत शास्त्रोक्त परामर्श।'
                : 'વિદેશમાં વસતા ગુજરાતી અને ભારતીય પરિવારો માટે વિશેષ ઓનલાઇન જ્યોતિષ સુવિધા. તમારા દેશના ટાઈમઝોન અનુસાર WhatsApp પર સીધું પરામર્શ.'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-amber-200 shadow-sm text-xs font-bold text-stone-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {lang === 'en' ? '35+ Years Proven Vedic Heritage | 100% Confidential' : '35+ वर्षों का प्रामाणिक अनुभव | पूर्णतः गोपनीय'}
            </span>
          </div>
        </div>

        {/* Global Payment & Timezone Trust Strip */}
        <div className="mb-8 p-3.5 rounded-2xl bg-white border border-[#FF671F]/20 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-stone-950">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#FF671F]" />
            <span className="font-bold text-stone-950">
              {lang === 'en' ? 'Global Payments Accepted:' : 'वैश्विक भुगतान माध्यम:'}
            </span>
            <span className="text-stone-700">PayPal • Wise • Remitly • Cards • Wire Transfer • Western Union</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-800 font-bold">
              {lang === 'en' ? 'Flexible Timezone Appointments (EST, PST, CST, GMT, GST, AEST)' : 'आपके देश के अनुकूल समय पर परामर्श'}
            </span>
          </div>
        </div>

        {/* Country Selector Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          {COUNTRIES.map((c) => {
            const isSelected = selectedCountry === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border shadow-sm ${
                  isSelected
                    ? 'bg-[#FF671F] text-white border-[#CC5218] shadow-md shadow-[#FF671F]/20 scale-105'
                    : 'bg-white text-stone-950 border-stone-200 hover:border-[#FF671F]/50 hover:bg-[#FFF5F0]'
                }`}
              >
                <span>{c.flag}</span>
                <span>{lang === 'en' ? c.name : lang === 'hi' ? c.nameHi : c.nameGu}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Country Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#FF671F]/20 shadow-lg mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeInfo.flag}</span>
              <div>
                <h3 className="font-yatra text-xl sm:text-2xl text-stone-950">
                  {lang === 'en'
                    ? `Vedic Astrology Services for Devotees in ${activeInfo.name}`
                    : `${activeInfo.nameHi} के जातकों हेतु विशेष सेवाएं`}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#CC5218] mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'en' ? `Timezone Support: ${activeInfo.timezone}` : `टाइमज़ोन सुविधा: ${activeInfo.timezone}`}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-950 font-medium leading-relaxed">
              {lang === 'en' ? activeInfo.description : lang === 'hi' ? activeInfo.descriptionHi : activeInfo.descriptionGu}
            </p>

            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-stone-200 text-xs text-stone-950">
              <strong className="text-stone-950 font-bold block mb-1">
                <MapPin className="w-3.5 h-3.5 inline text-[#FF671F] mr-1" />
                {lang === 'en' ? 'Key Metros & Communities Served:' : 'प्रमुख शहर व क्षेत्र:'}
              </strong>
              <span>{lang === 'en' ? activeInfo.popularCities : lang === 'hi' ? activeInfo.popularCitiesHi : activeInfo.popularCitiesGu}</span>
            </div>

            {/* Key NRI Solutions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {activeInfo.keyServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-[#FFFDF9] text-xs font-bold text-stone-950"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>

            {/* DST Accuracy Feature Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-medium text-stone-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-stone-950">
                  {lang === 'en' ? 'Daylight Saving Time (DST) & True Solar Lagna:' : 'डेलाइट सेविंग टाइम (DST) का सटीक समायोजन:'}
                </strong>{' '}
                {lang === 'en'
                  ? 'Foreign birth charts require precise mathematical conversion from local daylight saving hours into True Local Mean Time. We ensure accurate Lagna, Nakshatra Charan, and Dasha calculations for all overseas births.'
                  : 'विदेश में जन्मे बालकों अथवा जातकों के लिए स्थानीय समय एवं DST को भारतीय वैदिक गणित से सटीक परिवर्तित कर शत-प्रतिशत प्रामाणिक लग्न चक्र एवं महादशा निर्मित की जाती है।'}
              </div>
            </div>
          </div>

          {/* Right Action / Consultation Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F0] to-[#FFFDF9] p-6 rounded-2xl border border-[#FF671F]/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  {lang === 'en' ? 'International Slots Open Today' : 'आज अंतर्राष्ट्रीय अपॉइंटमेंट उपलब्ध हैं'}
                </span>
              </div>

              <h4 className="font-yatra text-lg sm:text-xl text-stone-950">
                {lang === 'en' ? 'Book Personal NRI Consultation' : 'ऑनलाइन NRI परामर्श स्लॉट बुक करें'}
              </h4>

              <p className="text-xs text-stone-950 font-medium mt-1 leading-relaxed">
                {lang === 'en'
                  ? 'Connect directly with Chief Astrologer Pt. Virendra Kumar Joshi on WhatsApp voice/video call or phone.'
                  : 'मुख्य ज्योतिषाचार्य पंडित विरेंद्र कुमार जोशी जी से सीधे WhatsApp ऑडियो/वीडियो कॉल अथवा फोन पर परामर्श प्राप्त करें।'}
              </p>

              <div className="space-y-2 mt-4 text-xs text-stone-950 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Consultation Languages: Gujarati, Hindi, English' : 'परामर्श भाषाएं: गुजराती, हिंदी एवं अंग्रेज़ी'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Comprehensive Janam Kundli PDF on WhatsApp' : 'विस्तृत जन्म पत्रिका PDF आपके WhatsApp पर'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Secure Payment via PayPal, Wise or Cards' : 'सुरक्षित ऑनलाइन शुल्क भुगतान (PayPal / Wise / Cards)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Post-Consultation Remedial Guidance Included' : 'परामर्श उपरांत शास्त्रोक्त उपाय व मंत्र मार्गदर्शन'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={getWhatsAppInternationalLink(activeInfo.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {lang === 'en' ? `WhatsApp Chat (${activeInfo.name})` : `WhatsApp पर अपॉइंटमेंट लें (${activeInfo.name})`}
                </span>
              </a>

              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="w-full bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{lang === 'en' ? 'Direct Call: +91 99090 87902' : 'कॉल करें: +91 99090 87902'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Overseas Client FAQ Accordion for On-Page SEO */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FF671F]/20 shadow-md mb-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#FF671F]" />
            <h3 className="font-yatra text-xl sm:text-2xl text-stone-950">
              {lang === 'en'
                ? 'Frequently Asked Questions by NRI & Overseas Clients'
                : lang === 'hi'
                ? 'प्रवासी भारतीय (NRI) जातकों द्वारा पूछे जाने वाले प्रमुख प्रश्न'
                : 'પ્રવાસી ભારતીય (NRI) જાતકો દ્વારા પૂછાતા મુખ્ય પ્રશ્નો'}
            </h3>
          </div>

          <div className="space-y-3">
            {INTERNATIONAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 overflow-hidden transition-all bg-[#FFFDF9]"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-950 hover:text-[#CC5218] transition-colors"
                  >
                    <span>{lang === 'en' ? faq.qEn : lang === 'hi' ? faq.qHi : faq.qGu}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#FF671F] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm font-medium text-stone-950 leading-relaxed border-t border-stone-100 bg-white">
                      {lang === 'en' ? faq.aEn : lang === 'hi' ? faq.aHi : faq.aGu}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust & Statistics Banner */}
        <div className="pt-6 border-t border-[#FF671F]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="font-yatra text-xl sm:text-2xl text-[#CC5218]">35+</span>
            <p className="text-[11px] sm:text-xs font-bold text-stone-950 mt-0.5">
              {lang === 'en' ? 'Years Vedic Heritage' : 'वर्षों की शास्त्रोक्त साधना'}
            </p>
          </div>
          <div>
            <span className="font-yatra text-xl sm:text-2xl text-[#CC5218]">15,000+</span>
            <p className="text-[11px] sm:text-xs font-bold text-stone-950 mt-0.5">
              {lang === 'en' ? 'Global NRI Consultations' : 'संतुष्ट NRI जातक परिवार'}
            </p>
          </div>
          <div>
            <span className="font-yatra text-xl sm:text-2xl text-[#CC5218]">100%</span>
            <p className="text-[11px] sm:text-xs font-bold text-stone-950 mt-0.5">
              {lang === 'en' ? 'Parashara Vedic Precision' : 'शास्त्रोक्त प्रामाणिकता'}
            </p>
          </div>
          <div>
            <span className="font-yatra text-xl sm:text-2xl text-[#CC5218]">24/7</span>
            <p className="text-[11px] sm:text-xs font-bold text-stone-950 mt-0.5">
              {lang === 'en' ? 'WhatsApp Online Booking' : 'WhatsApp सहायता'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
