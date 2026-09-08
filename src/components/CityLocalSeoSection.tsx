import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Building2, 
  Landmark, 
  Compass, 
  ArrowRight,
  Navigation
} from 'lucide-react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { Language } from '../types/astrology';

interface CityLocalSeoSectionProps {
  lang: Language;
  setActiveTab?: (tab: string) => void;
}

interface CityInfo {
  id: string;
  badge: string;
  badgeColor: string;
  icon: string;
  nameEn: string;
  nameHi: string;
  nameGu: string;
  headlineEn: string;
  headlineHi: string;
  headlineGu: string;
  taglineEn: string;
  taglineHi: string;
  taglineGu: string;
  areasCoveredEn: string[];
  areasCoveredHi: string[];
  areasCoveredGu: string[];
  descriptionEn: string;
  descriptionHi: string;
  descriptionGu: string;
  keyServicesEn: string[];
  keyServicesHi: string[];
  keyServicesGu: string[];
  consultationModesEn: string;
  consultationModesHi: string;
  consultationModesGu: string;
  popularSearchTerms: string[];
  ctaPhoneTextEn: string;
  ctaPhoneTextHi: string;
  ctaPhoneTextGu: string;
  waCityMessage: string;
}

const TARGET_CITIES: CityInfo[] = [
  {
    id: 'mehsana',
    badge: 'मुख्य पीठ (Headquarters)',
    badgeColor: 'from-amber-600 to-orange-700 text-white',
    icon: '🪔',
    nameEn: 'Mehsana & North Gujarat',
    nameHi: 'मेहसाणा एवं उत्तर गुजरात (मुख्य कार्यालय)',
    nameGu: 'મહેસાણા અને ઉત્તર ગુજરાત (મુખ્ય કાર્યાલય)',
    headlineEn: 'Best Astrologer in Mehsana & North Gujarat (Nagalpur)',
    headlineHi: 'मेहसाणा के सर्वश्रेष्ठ ज्योतिषाचार्य - पं. विरेंद्र कुमार जोशी (नागलपुर)',
    headlineGu: 'મહેસાણાના શ્રેષ્ઠ જ્યોતિષાચાર્ય - પં. વિરેન્દ્ર કુમાર જોશી (નાગલપુર)',
    taglineEn: '35+ Years of Authenticated Vedic Astrology, Kundli Reading & Dosh Nivaran in Mehsana',
    taglineHi: '35+ वर्षों से उत्तर गुजरात की पावन भूमि पर प्रामाणिक वैदिक कुंडली, विवाह मिलान एवं गृह वास्तु',
    taglineGu: '35+ વર્ષોથી ઉત્તર ગુજરાતની પાવન ભૂમિ પર અધિકૃત વૈદિક કુંડળી, લગ્ન ગુણ મિલન અને વાસ્તુ',
    areasCoveredEn: ['Nagalpur', 'Radhe Complex', 'Visnagar', 'Unjha (Umiya Mataji Peeth)', 'Kadi', 'Patan', 'Palanpur', 'Becharaji', 'Modhera'],
    areasCoveredHi: ['नागलपुर', 'राधे कॉम्प्लेक्स', 'विसनगर', 'उंझा (उमिया माताजी पीठ)', 'कडी', 'पाटन', 'पालनपुर (बनासकांठा)', 'बेचराजी', 'मोढेरा'],
    areasCoveredGu: ['નાગલપુર', 'રાધે કોમ્પ્લેક્સ', 'વિસનગર', 'ઊંઝા (ઉમિયા માતાજી ધામ)', 'કડી', 'પાટણ', 'પાલનપુર (બનાસકાંઠા)', 'બેચરાજી', 'મોઢેરા'],
    descriptionEn: 'The sacred headquarters of Bhavani Jyotish Kendra is situated in Nagalpur, Mehsana. Direct face-to-face personal consultations, palmistry, handwritten horoscope creation, and authentic Vedic Hawans/Navagraha Anushthan are conducted daily under the guidance of Pt. Virendra Kumar Joshi.',
    descriptionHi: 'भवानी ज्योतिष केंद्र का मुख्य कार्यालय नागलपुर, मेहसाणा में स्थित है। यहाँ जातक प्रत्यक्ष आमने-सामने बैठकर अपनी हस्तरेखा, जन्म पत्रिका, पारिवारिक समस्याएं, विवाह योग व व्यापारिक बाधाओं का शास्त्रोक्त व सटीक वैदिक मार्गदर्शन प्राप्त करते हैं।',
    descriptionGu: 'ભવાની જ્યોતિષ કેન્દ્રનું મુખ્ય કાર્યાલય નાગલપુર, મહેસાણામાં સ્થિત છે. અહીં જાતકો રૂબરૂ મુલાકાત કરીને હસ્તરેખા, જન્મ પત્રિકા, પારિવારિક પ્રશ્નો, લગ્ન યોગ અને વેપાર વિષયક સચોટ વૈદિક માર્ગદર્શન પ્રાપ્ત કરે છે.',
    keyServicesEn: [
      'In-person Kundli Reading & Palmistry in Mehsana',
      'Ashtakoot 36 Gun Milan for Traditional Families',
      'Kaal Sarp & Manglik Dosh Nivaran Pujas',
      'Residential & Commercial Vastu in North Gujarat'
    ],
    keyServicesHi: [
      'मेहसाणा कार्यालय में आमने-सामने बैठकर संपूर्ण कुंडली व हस्तरेखा परामर्श',
      'पारंपरिक पाटीदार, क्षत्रिय, ब्राह्मण व वैश्य परिवारों का 36 गुण विवाह मिलान',
      'कालसर्प दोष, पितृ दोष, मांगलिक विचार व नवग्रह शांति विधान',
      'उत्तर गुजरात में आवासीय, कृषि भूमि एवं फैक्ट्री वास्तु परामर्श'
    ],
    keyServicesGu: [
      'મહેસાણા કાર્યાલય ખાતે રૂબરૂ બેસીને સંપૂર્ણ કુંડળી અને હસ્તરેખા વિશ્લેષણ',
      'પરંપરાગત પરિવારોનું 36 ગુણ લગ્ન કુંડળી મિલન અને માંગલિક વિચાર',
      'કાલસર્પ દોષ, પિતૃ દોષ, મંગળ દોષ અને નવગ્રહ શાંતિ વિધાન',
      'ઉત્તર ગુજરાતમાં રહેણાંક, વાડી અને ફેક્ટરી વાસ્તુ પરામર્શ'
    ],
    consultationModesEn: 'Direct In-Person Visit (Nagalpur, Mehsana) | Phone | WhatsApp',
    consultationModesHi: 'कार्यालय में प्रत्यक्ष भेंट (नागलपुर, मेहसाणा) | फोन कॉल | व्हाट्सएप',
    consultationModesGu: 'રૂબરૂ મુલાકાત (નાગલપુર, મહેસાણા) | ફોન કોલ | વોટ્સએપ',
    popularSearchTerms: ['Best Astrologer in Mehsana', 'Mehsana Jyotish Karyalay', 'Famous Jyotish Nagalpur', 'Kundli Matching Mehsana', 'Patan Jyotish', 'Unjha Astrologer'],
    ctaPhoneTextEn: 'Call for Mehsana Appointment',
    ctaPhoneTextHi: 'मेहसाणा कार्यालय हेतु कॉल करें',
    ctaPhoneTextGu: 'મહેસાણા કાર્યાલય માટે કોલ કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं मेहसाणा / उत्तर गुजरात से हूँ। मुझे अपनी जन्म कुंडली एवं प्रत्यक्ष परामर्श हेतु समय चाहिए।'
  },
  {
    id: 'ahmedabad',
    badge: 'महानगर सेवा (Metro Hub)',
    badgeColor: 'from-orange-600 to-amber-700 text-white',
    icon: '🏙️',
    nameEn: 'Ahmedabad (अहमदाबाद)',
    nameHi: 'अहमदाबाद वैदिक ज्योतिष सेवा',
    nameGu: 'અમદાવાદ વૈદિક જ્યોતિષ સેવા',
    headlineEn: 'Renowned Vedic Astrologer for Ahmedabad (Online & Face-to-Face)',
    headlineHi: 'अहमदाबाद वासियों के लिए विश्वसनीय वैदिक ज्योतिष व कुंडली परामर्श',
    headlineGu: 'અમદાવાદવાસીઓ માટે વિશ્વસનીય વૈદિક જ્યોતિષ અને કુંડળી પરામર્શ',
    taglineEn: 'Serving Thousands of Families in Vastrapur, Satellite, SG Highway, Maninagar & Chandkheda',
    taglineHi: 'वस्त्रपुर, सेटेलाइट, SG हाइवे, मणिनगर, प्रह्लादनगर एवं निकोल के जातकों का 35 वर्षों से अटूट विश्वास',
    taglineGu: 'વસ્ત્રાપુર, સેટેલાઇટ, એસજી હાઇવે, મણિનગર, પ્રહલાદનગર અને નિકોલના જાતકોનો 35 વર્ષથી અતૂટ વિશ્વાસ',
    areasCoveredEn: ['Vastrapur', 'Satellite', 'Boddakdev', 'SG Highway', 'Prahladnagar', 'Maninagar', 'Science City', 'Thaltej', 'Chandkheda', 'Navrangpura', 'Nikol', 'Naroda'],
    areasCoveredHi: ['वस्त्रपुर', 'सेटेलाइट', 'बोडकदेव', 'SG हाइवे', 'प्रह्लादनगर', 'मणिनगर', 'साइंस सिटी', 'थलतेज', 'चांदखेड़ा', 'नवरंगपुरा', 'निकोल', 'नरोदा'],
    areasCoveredGu: ['વસ્ત્રાપુર', 'સેટેલાઇટ', 'બોડકદેવ', 'એસજી હાઇવે', 'પ્રહલાદનગર', 'મણિનગર', 'સાયન્સ સિટી', 'થલતેજ', 'ચાંદખેડા', 'નવરંગપુરા', 'નિકોલ', 'નરોડા'],
    descriptionEn: 'Ahmedabad is just 1 hour from our Mehsana Vedic Peeth. Hundreds of businessmen, diamond merchants, IT professionals, and families from Vastrapur, SG Highway, and Maninagar regularly consult Pt. Virendra Kumar Joshi for business growth, matchmaking, and share market planetary timing.',
    descriptionHi: 'अहमदाबाद से मेहसाणा मात्र 1 घंटे की दूरी पर है। वस्त्रपुर, सेटेलाइट, SG हाइवे और मणिनगर के अनगिनत उद्योगपति, व्यापारी, कॉर्पोरेट प्रोफेशनल्स और परिवार अपने व्यापार विस्तार, विवाह गुण मिलान, शेयर बाज़ार फलादेश व पारिवारिक शांति हेतु नियमित परामर्श लेते हैं।',
    descriptionGu: 'અમદાવાદથી મહેસાણા માત્ર 1 કલાકના અંતરે છે. વસ્ત્રાપુર, સેટેલાઇટ, એસજી હાઇવે અને મણિનગરના અસંખ્ય વેપારીઓ, આઇટી પ્રોફેશનલ્સ અને પરિવારો પોતાના વ્યાપાર, 36 ગુણ મિલન અને શેરબજાર યોગ માટે નિયમિત માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'Business Growth & Partnership Horoscope Analysis',
      'Fast 36 Gun Milan & Manglik Solution for Marriages in Ahmedabad',
      'Corporate & Flat Vastu Consultation (On-Site & Virtual)',
      'Career & Share Market Investment Planetary Timing'
    ],
    keyServicesHi: [
      'व्यापार वृद्धि, साझेदारी एवं शेयर बाज़ार निवेश हेतु सूक्ष्म ग्रह विश्लेषण',
      'अहमदाबाद में विवाह हेतु त्वरित 36 गुण मिलान एवं मांगलिक निवारण',
      'फ्लैट, बंगलो एवं कॉर्पोरेट ऑफिस का शास्त्रीय वास्तु परीक्षण',
      'दंपती विवाद निवारण एवं संतान उच्च शिक्षा मार्गदर्शन'
    ],
    keyServicesGu: [
      'વેપાર વૃદ્ધિ, ભાગીદારી અને શેરબજાર રોકાણ માટે સૂક્ષ્મ ગ્રહ વિશ્લેષણ',
      'અમદાવાદમાં લગ્ન માટે ત્વરિત 36 ગુણ મિલન અને માંગલિક નિવારણ',
      'ફ્લેટ, બંગલો અને કોર્પોરેટ ઓફિસનું શાસ્ત્રોક્ત વાસ્તુ નિરીક્ષણ',
      'દાંપત્ય ક્લેશ નિવારણ અને સંતાન ઉચ્ચ શિક્ષણ માર્ગદર્શન'
    ],
    consultationModesEn: 'Direct Visit to Mehsana Peeth (1 Hr Drive) | Instant WhatsApp & Phone Call | Zoom Video',
    consultationModesHi: 'मेहसाणा केंद्र पर आगमन (मात्र 1 घंटे का मार्ग) | त्वरित व्हाट्सएप व फोन कॉल | वीडियो परामर्श',
    consultationModesGu: 'મહેસાણા કેન્દ્ર પર રૂબરૂ આગમન (માત્ર 1 કલાકનો રસ્તો) | ત્વરિત વોટ્સએપ અને ફોન કોલ | વિડિયો પરામર્શ',
    popularSearchTerms: ['Best Astrologer in Ahmedabad', 'Famous Jyotish Vastrapur Satellite', 'Ahmedabad Kundli Matching', 'SG Highway Jyotish Karyalay', 'Gujarati Astrologer Ahmedabad'],
    ctaPhoneTextEn: 'Consult from Ahmedabad',
    ctaPhoneTextHi: 'अहमदाबाद से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'અમદાવાદથી પરામર્શ માટે કોલ કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं अहमदाबाद से संपर्क कर रहा हूँ। मुझे कुंडली विश्लेषण / विवाह मिलान हेतु परामर्श प्राप्त करना है।'
  },
  {
    id: 'gandhinagar',
    badge: 'राजधानी क्षेत्र (Capital & GIFT City)',
    badgeColor: 'from-emerald-700 to-teal-800 text-white',
    icon: '🏛️',
    nameEn: 'Gandhinagar & GIFT City',
    nameHi: 'गांधीनगर एवं गिफ्ट सिटी ज्योतिष केंद्र',
    nameGu: 'ગાંધીનગર અને ગિફ્ટ સિટી જ્યોતિષ કેન્દ્ર',
    headlineEn: 'Leading Vedic Astrologer for Gandhinagar & GIFT City',
    headlineHi: 'गांधीनगर एवं GIFT City वासियों हेतु प्रामाणिक वैदिक ज्योतिष मार्गदर्शन',
    headlineGu: 'ગાંધીનગર અને ગિફ્ટ સિટી વાસીઓ માટે અધિકૃત વૈદિક જ્યોતિષ માર્ગદર્શન',
    taglineEn: 'Government Job Success, Corporate Vastu, Financial Planetary Alignment & Marriage Milan',
    taglineHi: 'सरकारी सेवा, प्रशासनिक परीक्षा, गिफ्ट सिटी कॉर्पोरेट वास्तु एवं प्रामाणिक 36 गुण मिलान',
    taglineGu: 'સરકારી નોકરી, સ્પર્ધાત્મક પરીક્ષા, ગિફ્ટ સિટી કોર્પોરેટ વાસ્તુ અને 36 ગુણ મિલન',
    areasCoveredEn: ['Sectors 1 to 30', 'Kudasan', 'Raysan', 'Randheja', 'Sargasan', 'Infocity', 'GIFT City', 'Pethapur', 'Koba'],
    areasCoveredHi: ['सेक्टर 1 से 30', 'कुदासन', 'रायसण', 'रांधेजा', 'सरगासन', 'इन्फोसिटी', 'गिफ्ट सिटी (GIFT City)', 'पेथापुर', 'कोबा'],
    areasCoveredGu: ['સેક્ટર 1 થી 30', 'કુડાસણ', 'રાયસણ', 'રાંધેજા', 'સરગાસણ', 'ઇન્ફોસિટી', 'ગિફ્ટ સિટી (GIFT City)', 'પેથાપુર', 'કોબા'],
    descriptionEn: 'Serving government officers, technocrats in Infocity, and financial executives in GIFT City, Gandhinagar. Pt. Virendra Kumar Joshi provides deep insights into career growth, administrative exams (GPSC/UPSC), transfers, and high-impact business decisions.',
    descriptionHi: 'गांधीनगर के विभिन्न सेक्टरों, इन्फोसिटी के आईटी दिग्गजों तथा गिफ्ट सिटी के बैंकिंग व कॉर्पोरेट अधिकारियों द्वारा पंडित श्री विरेंद्र कुमार जोशी का मार्गदर्शन नियमित रूप से लिया जाता है। सरकारी सेवा, पदोन्नति, स्थानांतरण एवं आवासीय वास्तु हेतु विशेष प्रतिष्ठा।',
    descriptionGu: 'ગાંધીનગરના વિવિધ સેક્ટરો, ઇન્ફોસિટી અને ગિફ્ટ સિટીના અધિકારીઓ પંડિત શ્રી વિરેન્દ્ર કુમાર જોશી પાસેથી સરકારી નોકરી, પદોન્નતિ, બદલી અને વાસ્તુ માટે સચોટ માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'Govt Job (Sarkari Naukri) & Competitive Exam Timing',
      'GIFT City Financial & Fintech Corporate Vastu',
      'Infocity IT Professionals Overseas Career Guidance',
      'Detailed Lagna & Navamsha Kundli with Planetary Remedies'
    ],
    keyServicesHi: [
      'सरकारी नौकरी, प्रशासनिक सेवा (GPSC/UPSC) एवं पदोन्नति ग्रह विचार',
      'गिफ्ट सिटी कॉर्पोरेट, वित्तीय संस्थान एवं ऑफिस वास्तु मार्गदर्शन',
      'इन्फोसिटी के प्रोफेशनल्स हेतु विदेश गमन, वीज़ा एवं करियर स्थिरता योग',
      'दंपती 36 गुण मिलान, नाड़ी दोष परिहार एवं गृह शांति'
    ],
    keyServicesGu: [
      'સરકારી નોકરી, સ્પર્ધાત્મક પરીક્ષાઓ અને પદોન્નતિ ગ્રહ વિશ્લેષણ',
      'ગિફ્ટ સિટી ઓફિસ, નાણાકીય સંસ્થા અને કોર્પોરેટ વાસ્તુ',
      'વિદેશ ગમન, વિઝા અને કરિયર સ્થિરતા માટે ગ્રહ દશા વિચાર',
      '36 ગુણ મિલન, નાડી દોષ પરિહાર અને ગ્રહ શાંતિ'
    ],
    consultationModesEn: 'Direct Visit to Mehsana (40 Mins) | Instant WhatsApp & Phone Call | Online Video Session',
    consultationModesHi: 'मेहसाणा मुख्य केंद्र पर प्रत्यक्ष आगमन (मात्र 40 मिनट) | फोन कॉल | व्हाट्सएप',
    consultationModesGu: 'મહેસાણા મુખ્ય કેન્દ્ર પર રૂબરૂ આગમન (માત્ર 40 મિનિટ) | ફોન કોલ | વોટ્સએપ',
    popularSearchTerms: ['Best Astrologer in Gandhinagar', 'GIFT City Vastu Consultant', 'Infocity Gandhinagar Jyotish', 'Sarkari Naukri Kundli Gujarat', 'Gandhinagar Kundli Matching'],
    ctaPhoneTextEn: 'Consult from Gandhinagar',
    ctaPhoneTextHi: 'गांधीनगर से संपर्क करें',
    ctaPhoneTextGu: 'ગાંધીનગરથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं गांधीनगर / गिफ्ट सिटी से हूँ। मुझे करियर, सरकारी सेवा अथवा कुंडली मिलान हेतु परामर्श चाहिए।'
  },
  {
    id: 'mumbai',
    badge: 'गुजराती-मारवाड़ी समाज की पहली पसंद',
    badgeColor: 'from-purple-800 to-indigo-900 text-white',
    icon: '🏢',
    nameEn: 'Mumbai & Suburbs (मुंबई)',
    nameHi: 'मुंबई एवं महाराष्ट्र गुजराती व मारवाड़ी समाज सेवा',
    nameGu: 'મુંબઈ અને મહારાષ્ટ્ર ગુજરાતી સમાજ જ્યોતિષ સેવા',
    headlineEn: 'Trusted Gujarati Vedic Astrologer for Mumbai, Thane & Navi Mumbai',
    headlineHi: 'मुंबई, ठाणे एवं नवी मुंबई के गुजराती परिवारों का 35 वर्षों का विश्वसनीय वैदिक ज्योतिष संस्थान',
    headlineGu: 'મુંબઈ, થાણે અને નવી મુંબઈના ગુજરાતી પરિવારોનું 35 વર્ષથી વિશ્વસનીય જ્યોતિષ સંસ્થાન',
    taglineEn: 'Specialized 36 Gun Milan, Business Partnership, Stock Market Muhurat & Vastu in Kandivali, Ghatkopar, Borivali',
    taglineHi: 'कांदिवली, घाटकोपर, बोरीवली, विले पार्ले एवं दादर के परिवारों हेतु समर्पित विवाह मिलान व व्यापारिक ज्योतिष',
    taglineGu: 'કાંદિવલી, ઘાટકોપર, બોરીવલી, વિલે પાર્લે અને દાદરના પરિવારો માટે સમર્પિત લગ્ન મિલન અને વ્યાપાર જ્યોતિષ',
    areasCoveredEn: ['Kandivali (Mahavir Nagar)', 'Borivali', 'Ghatkopar', 'Vile Parle', 'Bandra', 'Dadar', 'Malad', 'Andheri', 'Mulund', 'Thane', 'Navi Mumbai'],
    areasCoveredHi: ['कांदिवली (महावीर नगर)', 'बोरीवली', 'घाटकोपर', 'विले पार्ले', 'बांद्रा', 'दादर', 'मालाड', 'अंधेरी', 'मुलुंड', 'ठाणे', 'नवी मुंबई'],
    areasCoveredGu: ['કાંદિવલી (મહાવીર નગર)', 'બોરીવલી', 'ઘાટકોપર', 'વિલે પાર્લે', 'બાંદ્રા', 'દાદર', 'મલાડ', 'અંધેરી', 'મુલુંડ', 'થાણે', 'નવી મુંબઈ'],
    descriptionEn: 'Generations of Gujarati, Marwari, and Jain families residing across Mumbai trust Pt. Virendra Kumar Joshi for precise Janam Kundli analysis and 36 Gun Milan. We provide fluent consultation in Gujarati, Hindi, and English with same-day appointments via WhatsApp and phone.',
    descriptionHi: 'मुंबई के कांदिवली, घाटकोपर, बोरीवली, विले पार्ले और ठाणे में बसे हज़ारों गुजराती व मारवाड़ी परिवार अपनी कुल परंपरा के अनुसार पंडित श्री विरेंद्र कुमार जोशी से विवाह मिलान, व्यापारिक मुहूर्त और पारिवारिक मार्गदर्शन प्राप्त करते हैं। गुजराती व हिंदी में सहज परामर्श।',
    descriptionGu: 'મુંબઈના કાંદિવલી, ઘાટકોપર, બોરીવલી, વિલે પાર્લે અને થાણેમાં વસતા હજારો ગુજરાતી પરિવારો પરંપરાગત રીતે પંડિતજી પાસેથી લગ્ન મિલન, મુહૂર્ત અને વેપાર માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'Authentic Gujarati 36 Gun Milan with Nadi & Bhakoot Dosha solutions',
      'Stock Market & Commodity Trading Planetary Cycles',
      'Mumbai Apartment & Commercial Office Vastu without Demolition',
      'Manglik Dosha Remedies & Auspicious Marriage Muhurat'
    ],
    keyServicesHi: [
      'विशुद्ध गुजराती पद्धति से 36 गुण मिलान, नाड़ी व भकूट दोष का शास्त्रीय परिहार',
      'शेयर बाज़ार, सराफा, कपड़ा एवं डायमंड व्यापार हेतु वित्तीय ग्रह दशा विचार',
      'मुंबई के फ्लैट व कमर्शियल ऑफिस हेतु बिना तोड़फोड़ का सरल वैदिक वास्तु',
      'मांगलिक दोष, कालसर्प योग व नवग्रह शांति के सात्विक अनुष्ठान'
    ],
    keyServicesGu: [
      'વિશુદ્ધ ગુજરાતી પદ્ધતિથી 36 ગુણ મિલન, નાડી અને ભકૂટ દોષનું શાસ્ત્રોક્ત નિરાકરણ',
      'શેરબજાર, સોના-ચાંદી, કાપડ અને ડાયમંડ વેપાર માટે ગ્રહ દશા વિચાર',
      'મુંબઈના ફ્લેટ અને ઓફિસ માટે તોડફોડ વગરનું સરળ વૈદિક વાસ્તુ',
      'મંગળ દોષ, કાલસર્પ યોગ અને નવગ્રહ શાંતિના સાત્વિક ઉપાય'
    ],
    consultationModesEn: 'High-Priority Phone Call | Instant WhatsApp Kundli PDF & Audio Guidance | Zoom Video Session',
    consultationModesHi: 'प्राथमिकता फोन कॉल | तुरंत व्हाट्सएप पर कुंडली व ऑडियो मार्गदर्शन | वीडियो कॉल',
    consultationModesGu: 'પ્રાથમિકતા ફોન કોલ | ત્વરિત વોટ્સએપ પર કુંડળી અને ઓડિયો પરામર્શ | વિડિયો કોલ',
    popularSearchTerms: ['Best Gujarati Astrologer in Mumbai', 'Ghatkopar Jyotish', 'Kandivali Borivali Kundli Matching', 'Famous Astrologer Mumbai Gujarati', 'Stock Market Astrologer Mumbai'],
    ctaPhoneTextEn: 'Call from Mumbai',
    ctaPhoneTextHi: 'मुंबई से तुरंत कॉल करें',
    ctaPhoneTextGu: 'મુંબઈથી તુરંત કોલ કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं मुंबई (महाराष्ट्र) से संपर्क कर रहा हूँ। मुझे विवाह मिलान / व्यापारिक ज्योतिष हेतु परामर्श चाहिए।'
  },
  {
    id: 'usa',
    badge: 'अंतरराष्ट्रीय NRI सेवा (EST / CST / MST / PST)',
    badgeColor: 'from-blue-700 to-indigo-800 text-white',
    icon: '🇺🇸',
    nameEn: 'USA & North America (NRI Service)',
    nameHi: 'यूएसए (USA) एनआरआई वैदिक ज्योतिष एवं 36 गुण मिलान',
    nameGu: 'યુએસએ (USA) એનઆરઆઈ વૈદિક જ્યોતિષ અને 36 ગુણ મિલન',
    headlineEn: 'Trusted Indian & Gujarati Vedic Astrologer across USA & Canada',
    headlineHi: 'अमेरिका व कनाडा के प्रवासी भारतीयों हेतु 100% सटीक DST युक्त जन्म कुंडली व विवाह मिलान',
    headlineGu: 'અમેરિકા અને કેનેડાના પ્રવાસી ભારતીયો માટે 100% સચોટ DST યુક્ત કુંડળી અને લગ્ન મિલન',
    taglineEn: 'Serving 4,500+ Families in New Jersey (Edison), California (Bay Area), Texas (Dallas) & Chicago',
    taglineHi: 'न्यू जर्सी (एडिसन), कैलिफोर्निया (सैन जोस, बे एरिया), टेक्सास (डलास, ह्यूस्टन) एवं न्यूयॉर्क के परिवारों की पहली पसंद',
    taglineGu: 'ન્યૂ જર્સી (એડિસન), કેલિફોર્નિયા (બે એરિયા), ટેક્સાસ (ડલાસ) અને ન્યૂયોર્કના પરિવારોની પહેલી પસંદ',
    areasCoveredEn: ['New Jersey (Edison, Iselin, Woodbridge)', 'California (San Jose, Fremont, Bay Area, LA)', 'Texas (Dallas, Houston, Austin, Frisco)', 'New York & Long Island', 'Chicago (Illinois)', 'Atlanta (Georgia)'],
    areasCoveredHi: ['न्यू जर्सी (एडिसन, इस्लिन)', 'कैलिफोर्निया (सैन जोस, फ्रेमोंट, बे एरिया)', 'टेक्सास (डलास, ह्यूस्टन, ऑस्टिन)', 'न्यूयॉर्क व लॉन्ग आइलैंड', 'शिकागो', 'अटलांटा'],
    areasCoveredGu: ['ન્યૂ જર્સી (એડિસન, ઇસ્લિન)', 'કેલિફોર્નિયા (સેન જોસ, બે એરિયા)', 'ટેક્સાસ (ડલાસ, હ્યુસ્ટન, ઓસ્ટિન)', 'ન્યૂયોર્ક', 'શિકાગો', 'એટલાન્ટા'],
    descriptionEn: 'Accurate Janam Kundli computation for foreign-born children requiring exact Daylight Saving Time (DST) astronomical compensation. Cross-border 36 Gun Milan for US-raised boys and girls, H1B to Green Card stability timings, and home Vastu according to North American plot orientations.',
    descriptionHi: 'अमेरिका में जन्मे बच्चों की जन्म कुंडली में डेलाइट सेविंग टाइम (DST) का सूक्ष्म गणितीय शोधन अत्यंत आवश्यक है, जिसके बिना लग्न चक्र अशुद्ध हो जाता है। अमेरिका में बसे युवाओं का प्रामाणिक 36 गुण विवाह मिलान, H1B/ग्रीन कार्ड समय विचार और गृह प्रवेश वास्तु।',
    descriptionGu: 'અમેરિકામાં જન્મેલા બાળકો માટે ડેલાઇટ સેવિંગ ટાઇમ (DST)ની ચોક્કસ ગણતરી સાથે કુંડળી નિર્માણ. અમેરિકામાં વસતા યુવક-યુવતીઓનું 36 ગુણ લગ્ન મિલન, એચ1બી/ગ્રીન કાર્ડ ગ્રહ દશા અને વાસ્તુ માર્ગદર્શન.',
    keyServicesEn: [
      'Foreign Birth Janam Kundli with 100% DST Scientific Adjustment',
      'USA NRI 36 Gun Milan across American & Indian Timezones',
      'H1B Visa, Green Card & Career Transition Astrological Timings',
      'USA Home Vastu Consultation via Floor Plans & Google Earth'
    ],
    keyServicesHi: [
      'विदेश में जन्मे शिशुओं की 100% वैज्ञानिक DST संशोधित जन्म कुंडली',
      'अमेरिकी समय (EST, CST, PST) के अनुकूल ऑनलाइन 36 गुण विवाह मिलान',
      'H1B वीज़ा, ग्रीन कार्ड, जॉब चेंज एवं व्यवसाय शुरुआत का शुभ काल',
      'यूएसए में घर/अपार्टमेंट का नक्शे व कम्पास द्वारा वास्तु परीक्षण'
    ],
    keyServicesGu: [
      'વિદેશમાં જન્મેલા બાળકો માટે 100% વૈજ્ઞાનિક DST સુધારેલી કુંડળી',
      'અમેરિકન સમય ઝોન મુજબ ઓનલાઇન 36 ગુણ લગ્ન કુંડળી મિલન',
      'એચ1બી વિઝા, ગ્રીન કાર્ડ અને નવી જોબ શરૂઆતનો શુભ સમય',
      'નકશા અને હોકાયંત્ર દ્વારા અમેરિકન ઘરનું વાસ્તુ નિરીક્ષણ'
    ],
    consultationModesEn: 'WhatsApp Call & Chat (+91 99090 87902) | Zoom Video Conference | Flexible US Evening Slots',
    consultationModesHi: 'व्हाट्सएप कॉल व चैट (+91 99090 87902) | ज़ूम वीडियो बैठक | अमेरिकी समयानुसार स्लॉट',
    consultationModesGu: 'વોટ્સએપ કોલ અને ચેટ (+91 99090 87902) | ઝૂમ વિડિયો મીટિંગ | યુએસ સમય મુજબ',
    popularSearchTerms: ['Indian Astrologer in USA', 'Gujarati Jyotish New Jersey Edison', 'Vedic Astrologer Dallas Texas', 'Kundli Matching California NRI', 'H1B Visa Astrologer'],
    ctaPhoneTextEn: 'WhatsApp for US Consultation',
    ctaPhoneTextHi: 'यूएसए परामर्श हेतु व्हाट्सएप करें',
    ctaPhoneTextGu: 'યુએસએ પરામર્શ માટે વોટ્સએપ કરો',
    waCityMessage: 'Hello Pandit Ji, I am contacting from USA (NRI). I need Janam Kundli / 36 Gun Milan consultation with DST accuracy.'
  },
  {
    id: 'uk',
    badge: 'ब्रिटिश भारतीय एवं गुजराती समाज (GMT / BST)',
    badgeColor: 'from-rose-800 to-red-950 text-white',
    icon: '🇬🇧',
    nameEn: 'UK & Europe (London, Leicester)',
    nameHi: 'यूके (UK - लंदन, लीसेस्टर) वैदिक ज्योतिष सेवा',
    nameGu: 'યુકે (UK - લંડન, લિસેસ્ટર) વૈદિક જ્યોતિષ સેવા',
    headlineEn: 'Authentic Gujarati Vedic Astrologer for UK Diaspora (London & Midlands)',
    headlineHi: 'लंदन, लीसेस्टर, बर्मिंघम एवं यूके के प्रवासी परिवारों हेतु प्रामाणिक गुजराती ज्योतिष सेवा',
    headlineGu: 'લંડન, લિસેસ્ટર, બર્મિંગહામ અને યુકેના પ્રવાસી પરિવારો માટે અધિકૃત ગુજરાતી જ્યોતિષ સેવા',
    taglineEn: 'Preserving Traditional Gujarati Horoscopes in Wembley, Harrow, Leicester Belgrave & Birmingham',
    taglineHi: 'वेम्बली, हैरो, लीसेस्टर बेलग्रेव एवं बर्मिंघम के गुजराती परिवारों का 3 दशकों का अटूट विश्वास',
    taglineGu: 'વેમ્બલી, હેરો, લિસેસ્ટર બેલગ્રેવ અને બર્મિંગહામના ગુજરાતી પરિવારોનો 3 દાયકાથી અતૂટ વિશ્વાસ',
    areasCoveredEn: ['London (Wembley, Harrow, Brent, Kingsbury)', 'Leicester (Belgrave Road, Melton)', 'Birmingham & Solihull', 'Manchester', 'Ilford & East London', 'Edinburgh (Scotland)'],
    areasCoveredHi: ['लंदन (वेम्बली, हैरो, ब्रेंट, किंग्सबरी)', 'लीसेस्टर (बेलग्रेव रोड)', 'बर्मिंघम', 'मैनचेस्टर', 'इल्फोर्ड', 'एडिनबर्ग (स्कॉटलैंड)'],
    areasCoveredGu: ['લંડન (વેમ્બલી, હેરો, બ્રેન્ટ, કિંગ્સબરી)', 'લિસેસ્ટર (બેલગ્રેવ રોડ)', 'બર્મિંગહામ', 'માન્ચેસ્ટર', 'ઇલ્ફોર્ડ', 'એડિનબર્ગ (સ્કોટલેન્ડ)'],
    descriptionEn: 'Deeply connected with the British Gujarati and Hindu diaspora in Wembley, Harrow, and Leicester. Pt. Virendra Kumar Joshi conducts matrimonial compatibility, auspicious wedding Muhurat calculation matching the UK calendar, and satvik Vedic remedies.',
    descriptionHi: 'ब्रिटेन के वेम्बली, हैरो और लीसेस्टर में रहने वाले गुजराती और भारतीय परिवार अपनी पारंपरिक संस्कृति और संस्कारों को बनाए रखने हेतु पंडित श्री विरेंद्र कुमार जोशी से विवाह मिलान, शुभ विवाह मुहूर्त, बच्चों की उच्च शिक्षा और पारिवारिक शांति का मार्गदर्शन लेते हैं।',
    descriptionGu: 'બ્રિટનના વેમ્બલી, હેરો અને લિસેસ્ટરમાં વસતા ગુજરાતી પરિવારો લગ્ન ગુણ મિલન, શુભ લગ્ન મુહૂર્ત અને પારિવારિક સુખ-શાંતિ માટે નિયમિત માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'British Hindu & Gujarati 36 Gun Milan for UK Young Adults',
      'Auspicious Marriage & Griha Pravesh Muhurat for UK Climate',
      'UK Born Child Janam Kundli with BST/GMT Correction',
      'Business Growth & Partnership Advice for UK Entrepreneurs'
    ],
    keyServicesHi: [
      'ब्रिटिश गुजराती युवाओं का शास्त्रोक्त 36 गुण मिलान व मांगलिक विचार',
      'यूके के मौसम व पंचांग अनुसार शुभ विवाह व गृह प्रवेश मुहूर्त',
      'यूके में जन्मे बच्चों की BST/GMT संशोधित शुद्ध जन्म पत्रिका',
      'यूके उद्यमियों एवं व्यापारियों हेतु व्यवसाय वृद्धि ग्रह शांति'
    ],
    keyServicesGu: [
      'બ્રિટિશ ગુજરાતી યુવાનો માટે 36 ગુણ લગ્ન મિલન અને માંગલિક વિચાર',
      'યુકે પંચાંગ મુજબ શુભ લગ્ન અને વાસ્તુ મુહૂર્ત નિર્ધારણ',
      'યુકેમાં જન્મેલા બાળકો માટે BST/GMT શુદ્ધ કુંડળી નિર્માણ',
      'વેપાર વૃદ્ધિ અને નાણાકીય ઉન્નતિ માટે વૈદિક ગ્રહ ઉપાય'
    ],
    consultationModesEn: 'Direct WhatsApp Call & Voice Notes | Zoom Video Appointment | London Evening Time',
    consultationModesHi: 'व्हाट्सएप कॉल व वॉइस नोट्स | ज़ूम वीडियो परामर्श | लंदन समयानुसार अपॉइंटमेंट',
    consultationModesGu: 'વોટ્સએપ કોલ અને વોઇસ નોટ્સ | ઝૂમ વિડિયો પરામર્શ | લંડન સમય અનુસાર',
    popularSearchTerms: ['Gujarati Astrologer in UK London', 'Wembley Leicester Hindu Jyotish', 'Kundli Matching UK', 'Indian Astrologer Harrow Birmingham', 'Vedic Astrology London'],
    ctaPhoneTextEn: 'WhatsApp for UK Consultation',
    ctaPhoneTextHi: 'यूके परामर्श हेतु व्हाट्सएप करें',
    ctaPhoneTextGu: 'યુકે પરામર્શ માટે વોટ્સએપ કરો',
    waCityMessage: 'Hello Pandit Ji, I am contacting from UK (London/Leicester). I need Vedic astrology / marriage matchmaking consultation.'
  }
];

const LOCAL_FAQS = [
  {
    qHi: 'क्या अहमदाबाद, गांधीनगर या मुंबई से ऑनलाइन वीडियो कॉल पर कुंडली दिखा सकते हैं?',
    qGu: 'શું અમદાવાદ, ગાંધીનગર કે મુંબઈથી ઓનલાઇન વિડિયો કોલ પર કુંડળી બતાવી શકાય?',
    qEn: 'Can we consult via online Video Call / WhatsApp from Ahmedabad, Gandhinagar, or Mumbai?',
    aHi: 'हाँ, बिल्कुल! अहमदाबाद, गांधीनगर, मुंबई एवं अन्य शहरों के हज़ारों जातक WhatsApp वीडियो कॉल अथवा ज़ूम के माध्यम से प्रत्यक्ष रूप से पंडित जी से जुड़ते हैं। जन्म पत्रिका का पूरा पीडीएफ और हस्तलिखित फलादेश आपके व्हाट्सएप पर तुरंत भेजा जाता है।',
    aGu: 'હા, ચોક્કસ! અમદાવાદ, ગાંધીનગર, મુંબઈ અને અન્ય શહેરોના હજારો જાતકો વોટ્સએપ વિડિયો કોલ અથવા ઝૂમ દ્વારા રૂબરૂ પંડિતજી સાથે વાતચીત કરી શકે છે. કુંડળીની પીડીએફ આપના વોટ્સએપ પર મોકલી આપવામાં આવે છે.',
    aEn: 'Yes, absolutely! Thousands of families from Ahmedabad, Gandhinagar, Mumbai, and beyond consult Pt. Virendra Kumar Joshi via WhatsApp Video Call or Zoom with instant PDF delivery of the horoscope.'
  },
  {
    qHi: 'क्या मेहसाणा स्थित मुख्य केंद्र पर आकर व्यक्तिगत रूप से मिलना संभव है?',
    qGu: 'શું મહેસાણા સ્થિત મુખ્ય કેન્દ્ર પર આવીને રૂબરૂ મળવું શક્ય છે?',
    qEn: 'Can we visit the main center in Mehsana in-person?',
    aHi: 'जी हाँ, भवानी ज्योतिष केंद्र का मुख्य कार्यालय नागलपुर (मेहसाणा, गुजरात) में प्रतिदिन प्रातः 8:00 बजे से रात्रि 8:00 बजे तक खुला रहता है। आप आने से पूर्व +91 99090 87902 पर कॉल करके अपनी भेंट का समय (Appointment) निश्चित कर सकते हैं।',
    aGu: 'હા, ભવાની જ્યોતિષ કેન્દ્રનું મુખ્ય કાર્યાલય નાગલપુર (મહેસાણા, ગુજરાત) ખાતે દરરોજ સવારે 8:00 થી રાત્રે 8:00 વાગ્યા સુધી ખુલ્લું રહે છે. આગમન પહેલાં +91 99090 87902 પર સમય નિશ્ચિત કરી શકો છો.',
    aEn: 'Yes, our sacred headquarters in Nagalpur (Mehsana, Gujarat) is open daily from 8:00 AM to 8:00 PM. Please call +91 99090 87902 in advance to reserve your preferred time slot.'
  },
  {
    qHi: 'USA एवं UK के NRI जातकों के लिए समय और दक्षिणा भुगतान का क्या नियम है?',
    qGu: 'USA અને UK ના NRI જાતકો માટે સમય અને દક્ષિણા ચુકવણીના શું નિયમ છે?',
    qEn: 'What are the scheduling and payment options for USA & UK NRI clients?',
    aHi: 'USA (EST, CST, PST) एवं UK (GMT) के समय के अनुकूल शाम अथवा वीकेंड के विशेष स्लॉट उपलब्ध कराए जाते हैं। दक्षिणा का भुगतान अंतरराष्ट्रीय क्रेडिट कार्ड, PayPal, Wise, Remitly, Wire Transfer अथवा UPI द्वारा सरलता से किया जा सकता है।',
    aGu: 'USA (EST, CST, PST) અને UK (GMT) ના સમય મુજબ સાંજે અથવા વીકેન્ડના સ્લોટ ફાળવવામાં આવે છે. દક્ષિણા ચૂકવણી PayPal, Wise, Remitly, ઇન્ટરનેશનલ કાર્ડ કે UPI દ્વારા સરળતાથી થઈ શકે છે.',
    aEn: 'We provide specialized evening and weekend slots tailored to US (EST, CST, PST) and UK (GMT) timezones. Dakshina can be comfortably sent via PayPal, Wise, Remitly, International Cards, Wire Transfer, or UPI.'
  },
  {
    qHi: 'विदेश में जन्मे बच्चों की जन्म कुंडली में डेलाइट सेविंग टाइम (DST) क्यों महत्वपूर्ण है?',
    qGu: 'વિદેશમાં જન્મેલા બાળકોની કુંડળીમાં ડેલાઇટ સેવિંગ ટાઇમ (DST) શા માટે મહત્વપૂર્ણ છે?',
    qEn: 'Why is Daylight Saving Time (DST) critical for horoscopes of foreign-born children?',
    aHi: 'अमेरिका, कनाडा और यूके में गर्मियों में घड़ियां 1 घंटा आगे कर दी जाती हैं। यदि इस 1 घंटे का सूक्ष्म खगोलीय समायोजन न किया जाए, तो लग्न राशि, चंद्र राशि और ग्रहों की डिग्रियां बदल जाती हैं। पंडित जी शुद्ध पंचांगीय गणित द्वारा 100% सटीक कुंडली बनाते हैं।',
    aGu: 'અમેરિકા, કેનેડા અને યુકેમાં ઉનાળામાં ઘડિયાળો 1 કલાક આગળ કરવામાં આવે છે. જો આ 1 કલાકનું સુધારો ન થાય તો લગ્ન કુંડળી ખોટી બની જાય છે. પંડિતજી વૈજ્ઞાનિક ગણતરીથી 100% સચોટ કુંડળી બનાવે છે.',
    aEn: 'In the US, Canada, and UK, clocks change by 1 hour for DST. Without astronomical compensation, the Ascendant (Lagna) and planetary degrees shift incorrectly. Pt. Joshi computes true solar time for 100% mathematical accuracy.'
  }
];

export const CityLocalSeoSection: React.FC<CityLocalSeoSectionProps> = ({ lang, setActiveTab }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('mehsana');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const selectedCity = TARGET_CITIES.find(c => c.id === selectedCityId) || TARGET_CITIES[0];

  return (
    <section id="city-local-seo" className="py-12 sm:py-16 px-3 sm:px-4 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 text-[#852E10] px-3.5 py-1 rounded-full text-xs sm:text-sm font-black border border-amber-400/50 shadow-xs mb-3">
          <MapPin className="w-4 h-4 text-[#FF671F]" />
          <span>
            {lang === 'en'
              ? 'Local & Global Astrological Centers'
              : lang === 'hi'
              ? 'क्षेत्रीय एवं अंतरराष्ट्रीय ज्योतिष सेवा क्षेत्र'
              : 'પ્રાદેશિક અને આંતરરાષ્ટ્રીય જ્યોતિષ સેવા કેન્દ્ર'}
          </span>
        </div>

        <h2 className="font-yatra text-2xl sm:text-4xl text-[#852E10] leading-tight mb-2 sm:mb-3">
          {lang === 'en'
            ? 'City-Wise Vedic Astrology & Kundli Milan Centers'
            : lang === 'hi'
            ? 'शहरवार वैदिक ज्योतिष एवं जन्म कुंडली मिलान केंद्र'
            : 'શહેરવાર વૈદિક જ્યોતિષ અને જન્મ કુંડળી મિલન કેન્દ્રો'}
        </h2>

        <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
          {lang === 'en'
            ? 'Serving authentic traditional Vedic astrology to families across Mehsana, Ahmedabad, Gandhinagar, Mumbai, and NRI diaspora in USA & UK.'
            : lang === 'hi'
            ? 'मेहसाणा, अहमदाबाद, गांधीनगर, मुंबई एवं अमेरिका-यूके के प्रवासी भारतीय परिवारों हेतु समर्पित, शास्त्रोक्त एवं प्रामाणिक वैदिक ज्योतिष सेवा।'
            : 'મહેસાણા, અમદાવાદ, ગાંધીનગર, મુંબઈ તેમજ અમેરિકા-યુકેના પ્રવાસી પરિવારો માટે સમર્પિત શાસ્ત્રોક્ત વૈદિક જ્યોતિષ સેવા.'}
        </p>
      </div>

      {/* City Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8 border-b border-amber-300/40">
        {TARGET_CITIES.map((city) => {
          const isSelected = city.id === selectedCityId;
          const cityName = lang === 'en' ? city.nameEn : lang === 'hi' ? city.nameHi : city.nameGu;
          return (
            <button
              key={city.id}
              type="button"
              onClick={() => setSelectedCityId(city.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#852E10] to-[#631422] text-amber-100 border-amber-400 shadow-md scale-102'
                  : 'bg-white text-stone-800 hover:bg-amber-50 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span className="text-base">{city.icon}</span>
              <span>{cityName}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>}
            </button>
          );
        })}
      </div>

      {/* Main Selected City Showcase Card */}
      <div className="bg-white rounded-3xl border border-amber-300/60 shadow-xl overflow-hidden mb-10 transition-all">
        {/* Card Header Strip */}
        <div className="bg-gradient-to-r from-[#FFFDF8] via-[#FAF5EC] to-[#FFFDF8] p-5 sm:p-7 border-b border-amber-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r ${selectedCity.badgeColor} shadow-xs`}>
                {selectedCity.badge}
              </span>
              <span className="text-xs text-stone-700 font-bold bg-amber-100/70 border border-amber-300/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>35+ वर्ष शास्त्रीय अनुभव</span>
              </span>
            </div>

            <h3 className="font-yatra text-xl sm:text-2xl text-[#852E10]">
              {lang === 'en' ? selectedCity.headlineEn : lang === 'hi' ? selectedCity.headlineHi : selectedCity.headlineGu}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-semibold mt-1">
              {lang === 'en' ? selectedCity.taglineEn : lang === 'hi' ? selectedCity.taglineHi : selectedCity.taglineGu}
            </p>
          </div>

          {/* Direct CTA Buttons in Header */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FF671F] to-[#CC5218] hover:from-[#CC5218] hover:to-[#993D12] text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center"
            >
              <Phone className="w-4 h-4 text-amber-200" />
              <span>{lang === 'en' ? selectedCity.ctaPhoneTextEn : lang === 'hi' ? selectedCity.ctaPhoneTextHi : selectedCity.ctaPhoneTextGu}</span>
            </a>

            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(selectedCity.waCityMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Card Body Grid */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Description, Localities, & Mode */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#FF671F]" />
                <span>
                  {lang === 'en' ? 'Region Overview & Heritage' : lang === 'hi' ? 'क्षेत्रीय महत्व एवं परंपरा' : 'પ્રાદેશિક મહત્વ અને પરંપરા'}
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed bg-[#FFFDF9] p-4 rounded-2xl border border-amber-200/60">
                {lang === 'en' ? selectedCity.descriptionEn : lang === 'hi' ? selectedCity.descriptionHi : selectedCity.descriptionGu}
              </p>
            </div>

            {/* Areas / Localities Covered */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF671F]" />
                <span>
                  {lang === 'en' ? 'Key Areas, Towns & Communities Served' : lang === 'hi' ? 'प्रमुख क्षेत्र, उपनगर एवं समुदाय' : 'મુખ્ય વિસ્તારો અને સમુદાય'}
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'en' ? selectedCity.areasCoveredEn : lang === 'hi' ? selectedCity.areasCoveredHi : selectedCity.areasCoveredGu).map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-amber-50/80 hover:bg-amber-100/80 text-stone-900 border border-amber-200/80 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Consultation Mode */}
            <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/60 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#852E10] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#852E10]">
                  {lang === 'en' ? 'Consultation Mode & Timing' : lang === 'hi' ? 'परामर्श माध्यम एवं समय' : 'પરામર્શ માધ્યમ અને સમય'}
                </h5>
                <p className="text-xs text-stone-700 font-semibold mt-0.5">
                  {lang === 'en' ? selectedCity.consultationModesEn : lang === 'hi' ? selectedCity.consultationModesHi : selectedCity.consultationModesGu}
                </p>
                <p className="text-[11px] text-stone-600 mt-1">
                  {lang === 'en' 
                    ? 'Same-day consultation available on prior booking | Direct consultation in Hindi, Gujarati & English'
                    : 'अग्रिम बुकिंग पर उसी दिन परामर्श उपलब्ध | हिंदी, गुजराती एवं अंग्रेजी में सहज संवाद'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Astrological Services for this City */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF671F]" />
                <span>
                  {lang === 'en' ? 'Specialized Astrological Services' : lang === 'hi' ? 'इस क्षेत्र हेतु प्रमुख सेवाएं' : 'આ વિસ્તાર માટે મુખ્ય સેવાઓ'}
                </span>
              </h4>

              <div className="space-y-2.5">
                {(lang === 'en' ? selectedCity.keyServicesEn : lang === 'hi' ? selectedCity.keyServicesHi : selectedCity.keyServicesGu).map((service, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gradient-to-r from-[#FFFDF8] to-white border border-amber-200/80 shadow-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-stone-900 leading-snug">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-gradient-to-br from-[#852E10] to-[#631422] rounded-2xl p-5 text-amber-100 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-amber-300" />
                <span className="font-yatra text-sm text-amber-200">
                  {lang === 'en' ? 'Direct Guidance with Pandit Ji' : 'पंडित श्री विरेंद्र कुमार जोशी से सीधा विमर्श'}
                </span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed mb-4">
                {lang === 'en'
                  ? 'Send your Birth Date, Time & City to receive verified horoscope analysis and authentic remedies.'
                  : 'अपनी जन्म तिथि, जन्म समय एवं जन्म स्थान भेजकर अपनी कुंडली का सटीक विश्लेषण व सरल शास्त्रोक्त उपाय प्राप्त करें।'}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-amber-950 font-black py-2 px-3 rounded-xl text-xs text-center shadow-xs flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Call Directly' : 'सीधे कॉल करें'}</span>
                </a>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(selectedCity.waCityMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-2 px-3 rounded-xl text-xs text-center shadow-xs flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Keywords Strip at bottom of card for SEO richness */}
        <div className="bg-[#FAF5EC] px-5 py-3 border-t border-amber-200/80 flex items-center flex-wrap gap-2 text-[11px] text-stone-600">
          <span className="font-bold text-stone-800">🔍 लोकप्रिय खोजें:</span>
          {selectedCity.popularSearchTerms.map((term, i) => (
            <span key={i} className="bg-white/80 border border-amber-200 px-2 py-0.5 rounded-md text-stone-700 font-medium">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* City-Wise Local SEO FAQ Accordion */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-amber-300/50 p-6 sm:p-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="font-yatra text-xl sm:text-2xl text-[#852E10]">
            {lang === 'en'
              ? 'Frequently Asked Questions by City & NRI Clients'
              : lang === 'hi'
              ? 'विभिन्न शहरों एवं NRI जातकों के अक्सर पूछे जाने वाले प्रश्न'
              : 'વિવિધ શહેરો અને NRI જાતકોના વારંવાર પૂછાતા પ્રશ્નો'}
          </h3>
          <p className="text-xs text-stone-700 mt-1 font-medium">
            {lang === 'en'
              ? 'Clear answers regarding in-person visits, online video consultation, and international timezones.'
              : 'प्रत्यक्ष भेंट, ऑनलाइन वीडियो परामर्श एवं अंतरराष्ट्रीय समय से जुड़े सरल व स्पष्ट उत्तर।'}
          </p>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          {LOCAL_FAQS.map((faq, index) => {
            const isOpen = expandedFaqIndex === index;
            const question = lang === 'en' ? faq.qEn : lang === 'hi' ? faq.qHi : faq.qGu;
            const answer = lang === 'en' ? faq.aEn : lang === 'hi' ? faq.aHi : faq.aGu;
            return (
              <div
                key={index}
                className="rounded-2xl border border-amber-200/80 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-stone-900 hover:text-[#852E10] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#FF671F] font-black">Q{index + 1}.</span>
                    <span>{question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#FF671F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-700 font-medium leading-relaxed border-t border-amber-100 bg-amber-50/20">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
