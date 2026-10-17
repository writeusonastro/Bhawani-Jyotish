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
    id: 'surat',
    badge: 'डायमंड व टेक्सटाइल सिटी (Surat)',
    badgeColor: 'from-amber-600 to-rose-700 text-white',
    icon: '💎',
    nameEn: 'Surat & South Gujarat (सूरत)',
    nameHi: 'सूरत एवं दक्षिण गुजरात वैदिक ज्योतिष केंद्र',
    nameGu: 'સુરત અને દક્ષિણ ગુજરાત વૈદિક જ્યોતિષ કેન્દ્ર',
    headlineEn: 'Leading Vedic Astrologer for Surat Diamond & Textile Families',
    headlineHi: 'सूरत के हीरा (Diamond), कपड़ा (Textile) व्यापारियों एवं परिवारों का विश्वसनीय वैदिक ज्योतिष संस्थान',
    headlineGu: 'સુરતના હીરા અને કાપડ વેપારીઓ તેમજ પરિવારો માટે વિશ્વસનીય વૈદિક જ્યોતિષ',
    taglineEn: 'Specialized Business Horoscope, 36 Gun Milan, Factory Vastu & Mahalakshmi Muhurat in Varachha, Ring Road, Adajan, Vesu',
    taglineHi: 'वराछा, रिंग रोड, अडाजण, वेसू, कतारगाम एवं पिपलोद के परिवारों का 35 वर्षों से अटूट विश्वास',
    taglineGu: 'વરાછા, રિંગ રોડ, અડાજણ, વેસુ, કતારગામ અને પીપલોદના પરિવારોનો 35 વર્ષથી અતૂટ વિશ્વાસ',
    areasCoveredEn: ['Varachha (Mini Bazar)', 'Katargam', 'Ring Road (Textile Market)', 'Vesu & VIP Road', 'Adajan', 'Piplod', 'Pal', 'Rander', 'Navsari', 'Bardoli'],
    areasCoveredHi: ['वराछा (मिनी बाज़ार)', 'कतारगाम', 'रिंग रोड (टेक्सटाइल मार्केट)', 'वेसू व VIP रोड', 'अडाजण', 'पिपलोद', 'पाल', 'रांदेर', 'नवसारी', 'बारडोली'],
    areasCoveredGu: ['વરાછા (મીની બજાર)', 'કતારગામ', 'રિંગ રોડ (કાપડ માર્કેટ)', 'વેસુ અને VIP રોડ', 'અડાજણ', 'પીપલોદ', 'પાલ', 'રાંદેર', 'નવસારી', 'બારડોલી'],
    descriptionEn: 'Surat is Gujarat’s industrial powerhouse of diamonds, jewelry, and synthetic textiles. Business leaders and prominent families from Varachha, Katargam, Vesu, and Adajan consult Pt. Virendra Kumar Joshi for partnership compatibility, factory/showroom Vastu without demolition, export-import prosperity timings, and auspicious 36 Gun Milan for matrimonial matches.',
    descriptionHi: 'सूरत के प्रतिष्ठित पाटीदार एवं व्यापारिक परिवारों द्वारा वराछा, कतारगाम, वेसू और रिंग रोड से नियमित रूप से कुंडली विचार, डायमंड व कपड़ा व्यापार में तेजी-मंदी चक्र, नई मिल/शोरूम का वास्तु परीक्षण तथा विवाह हेतु 36 गुण मिलान कराया जाता है।',
    descriptionGu: 'સુરતના પ્રતિષ્ઠિત પાટીદાર અને વ્યાપારી પરિવારો વરાછા, કતારગામ, વેસુ અને રિંગ રોડથી હીરા-કાપડ વેપાર વૃદ્ધિ, ફેક્ટરી વાસ્તુ અને 36 ગુણ લગ્ન મિલન માટે નિયમિત પરામર્શ મેળવે છે.',
    keyServicesEn: [
      'Diamond & Textile Business Partnership & Prosperity Horoscope',
      'Surat Industrial Factory, Loom, Mill & Showroom Vastu',
      'Authentic 36 Gun Milan with Manglik & Nadi Dosha Remedies',
      'Import-Export & Currency Planetary Timing Forecasts'
    ],
    keyServicesHi: [
      'हीरा एवं कपड़ा व्यापार में साझेदारी व धन आगमन का ग्रह दशा विचार',
      'सूरत की टेक्सटाइल मिल, लूम कारखाना व शोरूम का शास्त्रीय वास्तु',
      'विशुद्ध 36 गुण विवाह मिलान एवं मांगलिक/नाड़ी दोष का वैदिक परिहार',
      'व्यापारिक कर्ज मुक्ति, रुका हुआ धन प्राप्ति व महालक्ष्मी अनुष्ठान'
    ],
    keyServicesGu: [
      'હીરા અને કાપડ વેપારમાં ભાગીદારી અને લક્ષ્મી પ્રાપ્તિ ગ્રહ દશા વિચાર',
      'ટેક્સટાઇલ મિલ, કારખાના અને શોરૂમનું શાસ્ત્રોક્ત વૈદિક વાસ્તુ',
      'વિશુદ્ધ 36 ગુણ લગ્ન કુંડળી મિલન અને માંગલિક દોષ નિવારણ',
      'અટકેલા નાણાં પરત મેળવવા અને વેપાર ઉન્નતિના સાત્વિક ઉપાય'
    ],
    consultationModesEn: 'Direct WhatsApp Call & Voice Guidance (+91 99090 87902) | Fast Kundli PDF Delivery | Zoom Video',
    consultationModesHi: 'त्वरित व्हाट्सएप कॉल व ऑडियो परामर्श (+91 99090 87902) | डिजिटल जन्म पत्रिका | वीडियो कॉल',
    consultationModesGu: 'ત્વરિત વોટ્સએપ કોલ અને ઓડિયો પરામર્શ (+91 99090 87902) | ડિજિટલ કુંડળી | વિડિયો કોલ',
    popularSearchTerms: ['Best Astrologer in Surat', 'Varachha Katargam Jyotish', 'Famous Astrologer Surat Vesu', 'Diamond Business Astrologer Surat', 'Kundli Matching Surat'],
    ctaPhoneTextEn: 'Consult from Surat',
    ctaPhoneTextHi: 'सूरत से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'સુરતથી પરામર્શ માટે કોલ કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं सूरत (गुजरात) से संपर्क कर रहा हूँ। मुझे व्यापार/कुंडली मिलान हेतु परामर्श प्राप्त करना है।'
  },
  {
    id: 'rajkot',
    badge: 'रंगीलो राजकोट व सौराष्ट्र केंद्र',
    badgeColor: 'from-red-600 to-amber-700 text-white',
    icon: '🦁',
    nameEn: 'Rajkot & Saurashtra (राजकोट)',
    nameHi: 'राजकोट एवं सौराष्ट्र वैदिक ज्योतिष सेवा',
    nameGu: 'રાજકોટ અને સૌરાષ્ટ્ર વૈદિક જ્યોતિષ સેવા',
    headlineEn: 'Trusted Vedic Astrologer for Rajkot, Jamnagar & Saurashtra',
    headlineHi: 'राजकोट, जामनगर, जूनागढ़ एवं संपूर्ण सौराष्ट्र के परिवारों हेतु प्रतिष्ठित वैदिक ज्योतिष',
    headlineGu: 'રાજકોટ, જામનગર, જૂનાગઢ અને સમગ્ર સૌરાષ્ટ્ર માટે પ્રતિષ્ઠિત વૈદિક જ્યોતિષ',
    taglineEn: 'Serving Industrialists, Gold/Silver Jewelers & Families in Kalawad Road, 150 Feet Ring Road, Yagnik Road',
    taglineHi: 'कालावाद रोड, 150 फीट रिंग रोड, याज्ञिक रोड, मोरबी (सिरेमिक हब) एवं जामनगर के जातकों का विश्वास',
    taglineGu: 'કાલાવાડ રોડ, 150 ફૂટ રિંગ રોડ, યાજ્ઞિક રોડ, મોરબી (સિરામિક હબ) અને જામનગરના જાતકોનો વિશ્વાસ',
    areasCoveredEn: ['Kalawad Road', '150 Feet Ring Road', 'Yagnik Road', 'Kothariya', 'Morbi (Ceramics Zone)', 'Jamnagar', 'Junagadh', 'Gondal', 'Porbandar'],
    areasCoveredHi: ['कालावाद रोड', '150 फीट रिंग रोड', 'याज्ञिक रोड', 'कोठारिया इंडस्ट्रियल', 'मोरबी (सिरेमिक जोन)', 'जामनगर', 'जूनागढ़', 'गोंडल', 'पोरबंदर'],
    areasCoveredGu: ['કાલાવાડ રોડ', '150 ફૂટ રિંગ રોડ', 'યાજ્ઞિક રોડ', 'કોઠારિયા', 'મોરબી (સિરામિક હબ)', 'જામનગર', 'જૂનાગઢ', 'ગોંડલ', 'પોરબંદર'],
    descriptionEn: 'Saurashtra and Rajkot are renowned for gold ornaments, engineering casting, and ceramics. Pt. Virendra Kumar Joshi guides prominent families from Rajkot and Morbi on business expansion, auspicious factory foundation Muhurat, jewelry trade fortune timings, and trusted 36 Gun Milan for traditional marriages.',
    descriptionHi: 'राजकोट, मोरबी, जामनगर और गोंडल के औद्योगिक व सर्राफा परिवारों द्वारा पंडित श्री विरेंद्र कुमार जोशी से विवाह मिलान, पितृ दोष व कालसर्प शांति, सिरेमिक एवं इंजीनियरिंग व्यापार में प्रगति और नए प्रतिष्ठान का मुहूर्त नियमित रूप से निकाला जाता है।',
    descriptionGu: 'રાજકોટ, મોરબી, જામનગર અને ગોંડલના ઔદ્યોગિક તેમજ સોની પરિવારો લગ્ન મિલન, પિતૃ દોષ, કાલસર્પ શાંતિ અને સિરામિક વેપાર વૃદ્ધિ માટે નિયમિત પરામર્શ મેળવે છે.',
    keyServicesEn: [
      'Ceramics, Casting & Gold Jewelry Business Planetary Timings',
      'Traditional 36 Gun Milan with Nadi, Bhakoot & Manglik Solutions',
      'Pitru Dosha & Kaal Sarp Dosh Vedic Shanti Pujas in Gujarat',
      'Industrial Shed & Agricultural Land Vastu Consultation'
    ],
    keyServicesHi: [
      'सिरेमिक, कास्टिंग एवं सर्राफा (सोना-चांदी) व्यापार हेतु ग्रह विचार',
      'पारंपरिक 36 गुण विवाह मिलान, नाड़ी व भकूट दोष का अचूक परिहार',
      'गुजरात के पवित्र तीर्थों हेतु कालसर्प एवं पितृ दोष शांति अनुष्ठान',
      'फैक्ट्री, गोडाउन एवं कृषि भूमि का शास्त्रीय भूमि पूजन मुहूर्त'
    ],
    keyServicesGu: [
      'સિરામિક, કાસ્ટિંગ અને સોના-ચાંદી વેપાર માટે ગ્રહ ફલાદેશ',
      'પરંપરાગત 36 ગુણ લગ્ન મિલન અને નાડી-ભકૂટ દોષ નિવારણ',
      'કાલસર્પ દોષ અને પિતૃ દોષ શાંતિ માટે શાસ્ત્રોક્ત વિધાન',
      'ફેક્ટરી, પ્લોટ અને વાડી માટે પંચાંગ શુદ્ધ વાસ્તુ મુહૂર્ત'
    ],
    consultationModesEn: 'Direct Phone & WhatsApp Consultation (+91 99090 87902) | Online Kundli PDF | Zoom Video',
    consultationModesHi: 'फोन कॉल व व्हाट्सएप परामर्श (+91 99090 87902) | ऑनलाइन जन्म पत्रिका | वीडियो कॉल',
    consultationModesGu: 'ફોન કોલ અને વોટ્સએપ પરામર્શ (+91 99090 87902) | ઓનલાઇન કુંડળી | વિડિયો કોલ',
    popularSearchTerms: ['Best Astrologer in Rajkot', 'Famous Jyotish Kalawad Road Rajkot', 'Morbi Astrologer Kundli', 'Rajkot Kundli Matching', 'Saurashtra Jyotish Karyalay'],
    ctaPhoneTextEn: 'Consult from Rajkot',
    ctaPhoneTextHi: 'राजकोट से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'રાજકોટથી પરામર્શ માટે કોલ કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं राजकोट / सौराष्ट्र से हूँ। मुझे व्यापार / कुंडली मिलान हेतु मार्गदर्शन चाहिए।'
  },
  {
    id: 'delhi-ncr',
    badge: 'राजधानी क्षेत्र (Capital Hub)',
    badgeColor: 'from-red-700 to-rose-900 text-white',
    icon: '🏛️',
    nameEn: 'Delhi NCR (दिल्ली, नोएडा, गुड़गांव)',
    nameHi: 'दिल्ली एनसीआर (दिल्ली, नोएडा, गुड़गांव)',
    nameGu: 'દિલ્હી એનસીઆર (દિલ્હી, નોઈડા, ગુડગાંવ)',
    headlineEn: 'Top Vedic Astrologer & Love Problem Specialist in Delhi NCR',
    headlineHi: 'दिल्ली एनसीआर के शीर्ष वैदिक ज्योतिषाचार्य - पं. विरेंद्र कुमार जोशी',
    headlineGu: 'દિલ્હી એનસીઆરના અગ્રણી વૈદિક જ્યોતિષાચાર્ય - પં. વિરેન્દ્ર કુમાર જોશી',
    taglineEn: 'Serving Connaught Place, Dwarka, Rohini, Noida, Gurugram Cyber City & Faridabad',
    taglineHi: 'कनॉट प्लेस, रोहिणी, द्वारका, नोएडा, गुड़गांव (साइबर सिटी) एवं फरीदाबाद के जातकों का 35 वर्षों का विश्वास',
    taglineGu: 'કનોટ પ્લેસ, રોહિણી, દ્વારકા, નોઈડા, ગુડગાંવ અને ફરીદાબાદના જાતકોનો વિશ્વાસ',
    areasCoveredEn: ['Connaught Place', 'Dwarka', 'Rohini', 'Saket', 'Noida (Sector 18, 62)', 'Gurugram (Cyber City, Golf Course)', 'Ghaziabad', 'Faridabad'],
    areasCoveredHi: ['कनॉट प्लेस', 'द्वारका', 'रोहिणी', 'साकेत', 'चांदनी चौक', 'नोएडा (सेक्टर 18, 62)', 'गुड़गांव (साइबर सिटी, गोल्फ कोर्स)', 'गाजियाबाद', 'फरीदाबाद'],
    areasCoveredGu: ['કનોટ પ્લેસ', 'દ્વારકા', 'રોહિણી', 'સાકેત', 'નોઈડા', 'ગુડગાંવ સાયબર સિટી', 'ગાઝિયાબાદ', 'ફરીદાબાદ'],
    descriptionEn: 'Serving civil servants, top corporate executives, business conglomerates, and lovers seeking marriage approval in Delhi NCR. Specialised in Parashari Vedic Jyotish, 36 Guna Milan, and satvik remedies for love and career disputes.',
    descriptionHi: 'दिल्ली एनसीआर में राजनीति, सिविल सर्विसेज (UPSC), मल्टीनेशनल कॉर्पोरेट, व्यापार एवं प्रेम विवाह हेतु हज़ारों जातक पंडित श्री विरेंद्र कुमार जोशी से मार्गदर्शन प्राप्त करते हैं। लव प्रॉब्लम सॉल्यूशन, अंतरजातीय विवाह सहमति, सात्विक वशीकरण निवारण, उच्च पद प्राप्ति एवं कुंडली मिलान हेतु प्रतिष्ठित संस्थान।',
    descriptionGu: 'દિલ્હી એનસીઆરમાં સિવિલ સર્વિસિસ, કોર્પોરેટ તેમજ પ્રેમ લગ્ન સમસ્યા સમાધાન માટે હજારો પરિવારો પંડિતજી પાસેથી શાસ્ત્રોક્ત માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'Love Problem Solution & Intercaste Love Marriage Remedies',
      'Vashikaran Nivaran, Negative Energy Removal & Protective Kavach',
      'UPSC Civil Services, Govt Job & Corporate Career Predictions',
      'Delhi NCR Luxury Kothi, Flat & Corporate Office Vastu Shastra'
    ],
    keyServicesHi: [
      'प्रेम विवाह समस्या, अंतरजातीय विवाह एवं लव प्रॉब्लम सात्विक समाधान',
      'सात्विक वशीकरण निवारण, नकारात्मक ऊर्जा मुक्ति एवं रक्षा कवच',
      'UPSC सिविल सेवा, सरकारी नौकरी एवं कॉर्पोरेट लीडरशिप योग विचार',
      'दिल्ली एनसीआर कोठी, फ्लैट एवं कॉर्पोरेट ऑफिस का शास्त्रीय वास्तु'
    ],
    keyServicesGu: [
      'પ્રેમ લગ્ન સમસ્યા અને લવ પ્રોબ્લેમ સાત્વિક સમાધાન',
      'વશીકરણ નિવારણ, નકારાત્મક ઊર્જા મુક્તિ અને રક્ષા કવચ',
      'સરકારી નોકરી, યુપીએસસી અને કરિયર પ્રગતિ ગ્રહ વિચાર',
      'દિલ્હી એનસીઆર ફ્લેટ અને ઓફિસ માટે વૈદિક વાસ્તુ'
    ],
    consultationModesEn: 'Priority Direct Phone Call (+91 99090 87902) | Online Video Session',
    consultationModesHi: 'प्राथमिकता फोन कॉल (+91 99090 87902) | डिजिटल जन्म पत्रिका | वीडियो परामर्श',
    consultationModesGu: 'પ્રાથમિકતા ફોન કોલ (+91 99090 87902) | ડિજિટલ કુંડળી | વિડિયો પરામર્શ',
    popularSearchTerms: ['Best Astrologer in Delhi', 'Love Problem Solution Delhi', 'Vashikaran Specialist Astrologer Delhi', 'Noida Gurugram Kundli Matching', 'Famous Jyotish Delhi NCR', 'Intercaste Marriage Specialist Delhi'],
    ctaPhoneTextEn: 'Call from Delhi NCR',
    ctaPhoneTextHi: 'दिल्ली एनसीआर से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'દિલ્હી એનસીઆરથી કોલ કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं दिल्ली एनसीआर से संपर्क कर रहा हूँ। मुझे कुंडली / लव प्रॉब्लम समाधान हेतु परामर्श चाहिए।'
  },
  {
    id: 'jaipur',
    badge: 'राजस्थान व माँ माजीसा कृपा पीठ',
    badgeColor: 'from-amber-600 to-orange-800 text-white',
    icon: '👑',
    nameEn: 'Jaipur & Rajasthan (जयपुर, जोधपुर, उदयपुर)',
    nameHi: 'जयपुर एवं राजस्थान (जोधपुर, उदयपुर, बाड़मेर)',
    nameGu: 'જયપુર અને રાજસ્થાન (જોધપુર, ઉદયપુર, બાડમેર)',
    headlineEn: 'Royal Vedic Astrology & Maa Majisa Kripa Peeth for Rajasthan',
    headlineHi: 'राजस्थान व जयपुर में प्रतिष्ठित राजज्योतिष एवं माँ माजीसा कृपा संस्थान',
    headlineGu: 'રાજસ્થાન અને જયપુરમાં પ્રતિષ્ઠિત રાજજ્યોતિષ અને માઁ માજીસા કૃપા સંસ્થાન',
    taglineEn: 'Blessed by Maa Majisa Bhatiani (Jasol Dham) • Infallible Solutions by Pt. Virendra Kumar Joshi',
    taglineHi: 'माँ माजीसा भटियाणी (जसोल धाम) के अनन्य उपासक पं. विरेंद्र कुमार जोशी द्वारा अचूक वैदिक समाधान',
    taglineGu: 'માઁ માજીસા ભટિયાણી (જસોલ ધામ) ના ઉપાસક પં. વિરેન્દ્ર કુમાર જોશી દ્વારા સચોટ વૈદિક ઉપાય',
    areasCoveredEn: ['Jaipur (Vaishali Nagar, Mansarovar, C-Scheme)', 'Jodhpur', 'Udaipur', 'Barmer (Jasol Dham Region)', 'Bikaner', 'Kota', 'Ajmer', 'Bhilwara'],
    areasCoveredHi: ['जयपुर (वैशाली नगर, मानसरोवर, सी-स्कीम)', 'जोधपुर', 'उदयपुर', 'बाड़मेर (जसोल धाम क्षेत्र)', 'बीकानेर', 'कोटा', 'अजमेर', 'भीलवाड़ा'],
    areasCoveredGu: ['જયપુર', 'જોધપુર', 'ઉદયપુર', 'બાડમેર (જસોલ ધામ)', 'બીકાનેર', 'કોટા', 'અજમેર', 'ભીલવાડા'],
    descriptionEn: 'With the divine blessings of Maa Majisa (Rani Bhatiani of Jasol), Bhavani Jyotish Kendra is the most revered Astrological Sansthan for royal Rajputana, Marwari, and traditional families. Providing absolute Vedic resolutions for marital obstacles, child delays, and business prosperity.',
    descriptionHi: 'राजस्थान की पावन धरा एवं माँ माजीसा (राणी भटियाणी जी, जसोल) की असीम अनुकंपा से भवानी ज्योतिष केंद्र राजपूताना, मारवाड़ एवं शेखावाटी के प्रतिष्ठित परिवारों का विश्वासपात्र पीठ है। विवाह में आ रही अड़चनें, पति-पत्नी कलह, व्यापार में रुकावट, वंश वृद्धि एवं कोर्ट-कचहरी बाधाओं का शास्त्रोक्त व प्रामाणिक वैदिक निवारण।',
    descriptionGu: 'રાજસ્થાનની પાવન ભૂમિ અને માઁ માજીસાની અસીમ કૃપાથી રાજપૂતાના અને મારવાડી પરિવારો લગ્ન વિલંબ, વેપાર અને પારિવારિક શાંતિ માટે નિયમિત પરામર્શ મેળવે છે.',
    keyServicesEn: [
      'Infallible Solutions by Divine Blessings of Maa Majisa',
      '36 Gun Milan, Nadi Dosh Shanti & Rajputana Traditions',
      'Business Growth Horoscope for Marwari & Jain Merchants',
      'Heritage Haveli, Palace, Farm & Commercial Vastu'
    ],
    keyServicesHi: [
      'माँ माजीसा की कृपा से असाध्य समस्याओं का अचूक वैदिक समाधान',
      '36 गुण विवाह मिलान, नाड़ी दोष परिहार एवं राजपूताना परंपरा विचार',
      'रत्न-रुद्राक्ष धारण विधान एवं मारवाड़ी-जैन परिवारों का व्यापारिक ज्योतिष',
      'हवेली, पैलेस, कृषि फार्म एवं आवासीय भवनों का शास्त्रीय वास्तु'
    ],
    keyServicesGu: [
      'માઁ માજીસાની કૃપાથી જટિલ સમસ્યાઓનું સચોટ વૈદિક નિવારણ',
      '36 ગુણ લગ્ન મિલન, નાડી દોષ પરિહાર અને ગ્રહ શાંતિ',
      'સોના-ચાંદી, કાપડ અને વેપાર વૃદ્ધિ માટે ગ્રહ વિચાર',
      'હવેલી, વાડી અને મકાનનું શાસ્ત્રોક્ત વૈદિક વાસ્તુ'
    ],
    consultationModesEn: 'Direct Phone Guidance (+91 99090 87902) | Online Kundli Session',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | ऑनलाइन जन्म पत्रिका | वीडियो परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902) | ઓનલાઇન કુંડળી સત્ર',
    popularSearchTerms: ['Best Astrologer in Jaipur', 'Maa Majisa Kripa Jyotish Rajasthan', 'Famous Astrologer Jodhpur', 'Love Marriage Specialist Jaipur', 'Udaipur Kundli Milan', 'Barmer Jyotish'],
    ctaPhoneTextEn: 'Call from Rajasthan',
    ctaPhoneTextHi: 'राजस्थान से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'રાજસ્થાનથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं राजस्थान से संपर्क कर रहा हूँ। मुझे माँ माजीसा कृपा ज्योतिष एवं कुंडली परामर्श चाहिए।'
  },
  {
    id: 'pune',
    badge: 'महाराष्ट्र सांस्कृतिक व टेक हब',
    badgeColor: 'from-indigo-800 to-purple-900 text-white',
    icon: '🏰',
    nameEn: 'Pune & Suburbs (पुणे, महाराष्ट्र)',
    nameHi: 'पुणे एवं पिंपरी-चिंचवाड़ (महाराष्ट्र)',
    nameGu: 'પુણે અને પિંપરી-ચિંચવડ (મહારાષ્ટ્ર)',
    headlineEn: 'Leading Vedic Astrologer for Pune IT & Traditional Families',
    headlineHi: 'पुणे के मराठी, गुजराती व मारवाड़ी परिवारों हेतु प्रतिष्ठित वैदिक ज्योतिष पीठ',
    headlineGu: 'પુણેના મરાઠી, ગુજરાતી અને મારવાડી પરિવારો માટે પ્રતિષ્ઠિત વૈદિક જ્યોતિષ',
    taglineEn: 'Serving Kothrud, Hinjewadi IT Park, Shivajinagar, Kalyani Nagar, Viman Nagar & Wakad',
    taglineHi: 'कोथरुड, हिंजेवाड़ी आईटी पार्क, शिवाजीनगर, कल्याणी नगर एवं वाकड के जातकों का अटूट विश्वास',
    taglineGu: 'કોથરુડ, હિંજેવાડી આઈટી પાર્ક, શિવાજીનગર અને વાકડના જાતકોનો વિશ્વાસ',
    areasCoveredEn: ['Kothrud', 'Hinjewadi IT Park', 'Shivajinagar', 'Kalyani Nagar', 'Viman Nagar', 'Wakad', 'Baner', 'Pimpri-Chinchwad', 'Hadapsar (Magarpatta)'],
    areasCoveredHi: ['कोथरुड', 'हिंजेवाड़ी आईटी पार्क', 'शिवाजीनगर', 'कल्याणी नगर', 'विमान नगर', 'वाकड', 'बानेर', 'पिंपरी-चिंचवाड़', 'हड़पसर (मगरपट्टा)'],
    areasCoveredGu: ['કોથરુડ', 'હિંજેવાડી આઇટી પાર્ક', 'શિવાજીનગર', 'કલ્યાણી નગર', 'વાકડ', 'બાનેર', 'પિંપરી-ચિંચવડ'],
    descriptionEn: 'Trusted by thousands of software engineers, automobile executives, and traditional business families in Pune. Providing astrological solutions for IT career stability, onsite USA/Europe placements, 36 Guna matchmaking, and domestic peace.',
    descriptionHi: 'पुणे के टेक प्रोफेशनल्स, ऑटोमोबाइल उद्योगपतियों एवं पारंपरिक परिवारों द्वारा करियर स्थिरता, विदेश ऑनसाइट अवसर, प्रेम विवाह व दांपत्य सुख हेतु पं. विरेंद्र कुमार जोशी से नियमित परामर्श लिया जाता है।',
    descriptionGu: 'પુણેના આઈટી પ્રોફેશનલ્સ અને પરિવારો કરિયર સ્થિરતા, વિદેશ યોગ અને લગ્ન મિલન માટે પંડિતજી પાસેથી માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'IT Professionals Overseas Onsite & Career Timing Forecast',
      'Love Marriage Reconciliation & 36 Guna Milan',
      'Trimbakeshwar Method Guidance for Kaal Sarp & Pitra Dosha',
      'High-Rise Apartment & Office Vastu Energy Correction'
    ],
    keyServicesHi: [
      'आईटी प्रोफेशनल्स विदेश गमन एवं करियर पदोन्नति ग्रह विचार',
      'प्रेम विवाह, दांपत्य सामंजस्य एवं 36 गुण कुंडली मिलान',
      'कालसर्प एवं पितृ दोष शांति हेतु त्र्यंबकेश्वर विधि मार्गदर्शन',
      'फ्लैट एवं आईटी ऑफिस का ऊर्जा संतुलन व वास्तु सुधार'
    ],
    keyServicesGu: [
      'આઈટી પ્રોફેશનલ્સ વિદેશ ગમન અને પ્રમોશન ગ્રહ વિચાર',
      'પ્રેમ લગ્ન, દાંપત્ય સુખ અને 36 ગુણ કુંડળી મિલન',
      'કાલસર્પ અને પિતૃ દોષ શાંતિ વૈદિક માર્ગદર્શન',
      'ફ્લેટ અને ઓફિસ વાસ્તુ ઊર્જા સંતુલન'
    ],
    consultationModesEn: 'Direct Phone Consultation (+91 99090 87902) | Online Kundli PDF',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | डिजिटल जन्म पत्रिका | वीडियो कॉल',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902) | ડિજિટલ કુંડળી',
    popularSearchTerms: ['Best Astrologer in Pune', 'Hinjewadi Jyotish', 'Kothrud Pune Kundli Matching', 'Love Marriage Solution Pune', 'Famous Vedic Astrologer Pune'],
    ctaPhoneTextEn: 'Call from Pune',
    ctaPhoneTextHi: 'पुणे से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'પુણેથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं पुणे (महाराष्ट्र) से संपर्क कर रहा हूँ। मुझे करियर / विवाह कुंडली हेतु परामर्श चाहिए।'
  },
  {
    id: 'indore',
    badge: 'मालवा व महाकाल क्षेत्र (MP)',
    badgeColor: 'from-amber-700 to-yellow-800 text-white',
    icon: '🕉️',
    nameEn: 'Indore & Ujjain (इंदौर, उज्जैन, MP)',
    nameHi: 'इंदौर, उज्जैन व भोपाल (मध्य प्रदेश)',
    nameGu: 'ઇન્દોર, ઉજ્જૈન અને ભોપાલ (મધ્ય પ્રદેશ)',
    headlineEn: 'Trusted Vedic Astrologer for Indore, Ujjain Mahakal & Malwa Belt',
    headlineHi: 'इंदौर व मध्य प्रदेश के परिवारों का प्रतिष्ठित वैदिक ज्योतिष केंद्र',
    headlineGu: 'ઇન્દોર અને મધ્ય પ્રદેશના પરિવારો માટે પ્રતિષ્ઠિત વૈદિક જ્યોતિષ',
    taglineEn: 'Serving Vijay Nagar, Palasia, Sarafa, Ujjain Mahakal Belt & Bhopal',
    taglineHi: 'विजय नगर, पलासिया, सराफा, उज्जैन महाकाल क्षेत्र एवं भोपाल के जातकों का अटूट विश्वास',
    taglineGu: 'વિજય નગર, પલાસિયા, સરાફા અને ઉજ્જૈન ક્ષેત્રના જાતકોનો વિશ્વાસ',
    areasCoveredEn: ['Indore (Vijay Nagar, Palasia, Bhanwarkuan)', 'Ujjain (Mahakal Kshetra)', 'Bhopal (Arera Colony, MP Nagar)', 'Dewas', 'Ratlam', 'Gwalior'],
    areasCoveredHi: ['इंदौर (विजय नगर, पलासिया, भंवरकुआं)', 'उज्जैन (महाकाल क्षेत्र)', 'भोपाल (अरेरा कॉलोनी, एमपी नगर)', 'देवास', 'रतलाम', 'ग्वालियर'],
    areasCoveredGu: ['ઇન્દોર (વિજય નગર, પલાસિયા)', 'ઉજ્જૈન (મહાકાલ ક્ષેત્ર)', 'ભોપાલ', 'દેવાસ', 'રતલામ'],
    descriptionEn: 'Serving trade merchants, jewellers, industrial magnates, and spiritual seekers across Indore, Ujjain, and Bhopal with Parashara Vedic calculations, Kaal Sarp puja guidance, and 36 Guna marriage Milan.',
    descriptionHi: 'मालवा की औद्योगिक व धार्मिक नगरी इंदौर, उज्जैन एवं भोपाल के व्यापारियों, सराफा कारोबारियों तथा परिवारों हेतु शास्त्रीय पराशर ज्योतिष, 36 गुण विवाह मिलान एवं सिद्ध अनुष्ठान परामर्श।',
    descriptionGu: 'માળવાની ઔદ્યોગિક નગરી ઇન્દોર તેમજ ઉજ્જૈન-ભોપાલના વેપારી પરિવારો માટે શાસ્ત્રોક્ત વૈદિક જ્યોતિષ માર્ગદર્શન.',
    keyServicesEn: [
      'Bullion, Textile & Industrial Business Horoscope Cycles',
      'Ujjain Mahakal Teerth Kaal Sarp & Mangal Shanti Guidance',
      'Marriage Obstacle Removal & Ashtakoot Matchmaking',
      'Commercial Showroom, Mandi & Residence Vastu'
    ],
    keyServicesHi: [
      'सराफा, कपड़ा एवं औद्योगिक व्यापार में तेजी-मंदी व निवेश विचार',
      'उज्जैन तीर्थ पर कालसर्प, मंगल भात पूजा एवं नवग्रह शांति मार्गदर्शन',
      'विवाह में बाधा निवारण एवं मांगलिक दोष का अचूक वैदिक परिहार',
      'व्यावसायिक प्रतिष्ठान एवं निवास हेतु संपूर्ण वास्तु निरीक्षण'
    ],
    keyServicesGu: [
      'સોના-ચાંદી અને કાપડ વેપારમાં ગ્રહ દશા વિચાર',
      'ઉજ્જૈન તીર્થ પર કાલસર્પ અને મંગળ શાંતિ માર્ગદર્શન',
      'લગ્ન વિલંબ નિવારણ અને માંગલિક દોષ શાંતિ',
      'શોરૂમ અને મકાનનું શાસ્ત્રોક્ત વાસ્તુ નિરીક્ષણ'
    ],
    consultationModesEn: 'Direct Phone (+91 99090 87902) | Online Audio & PDF',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | ऑनलाइन जन्म पत्रिका | वीडियो परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902) | ઓનલાઇન કુંડળી',
    popularSearchTerms: ['Best Astrologer in Indore', 'Famous Jyotish Indore Vijay Nagar', 'Ujjain Shanti Puja Astrologer', 'Bhopal Kundli Milan', 'Love Problem Solution Indore'],
    ctaPhoneTextEn: 'Call from Indore / MP',
    ctaPhoneTextHi: 'इंदौर / MP से कॉल करें',
    ctaPhoneTextGu: 'ઇન્દોરથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं इंदौर / मध्य प्रदेश से हूँ। मुझे व्यापार / कालसर्प / विवाह मिलान हेतु परामर्श चाहिए।'
  },
  {
    id: 'vadodara',
    badge: 'संस्कार नगरी व मध्य गुजरात',
    badgeColor: 'from-teal-700 to-emerald-800 text-white',
    icon: '🏛️',
    nameEn: 'Vadodara & Central Gujarat (वडोदरा, आणंद)',
    nameHi: 'वडोदरा, आणंद व नडियाद (मध्य गुजरात)',
    nameGu: 'વડોદરા, આણંદ અને નડિયાદ (મધ્ય ગુજરાત)',
    headlineEn: 'Leading Vedic Astrologer for Vadodara, Anand & Nadiad',
    headlineHi: 'वडोदरा एवं चरोतर क्षेत्र के प्रतिष्ठित परिवारों का वैदिक ज्योतिष संस्थान',
    headlineGu: 'વડોદરા અને ચરોતર વિસ્તારના પરિવારો માટે અગ્રણી વૈદિક જ્યોતિષ સંસ્થાન',
    taglineEn: 'Serving Alkapuri, Manjalpur, Sama, Makarpura GIDC, Anand & Nadiad',
    taglineHi: 'अलकापुरी, मांजलपुर, समा, मकरपुरा, आणंद (दूध नगरी) एवं नडियाद के परिवारों की पहली पसंद',
    taglineGu: 'અલકાપુરી, માંજલપુર, સમા, મકરપુરા અને આણંદના પરિવારોની પહેલી પસંદ',
    areasCoveredEn: ['Alkapuri', 'Manjalpur', 'Gotri', 'Sama', 'Karelibaug', 'Makarpura GIDC', 'Anand (Vidyanagar)', 'Nadiad (Santram Mandir)', 'Bharuch'],
    areasCoveredHi: ['अलकापुरी', 'मांजलपुर', 'गोत्री', 'समा', 'करेलीबाग', 'मकरपुरा GIDC', 'आणंद (विद्यानगर)', 'नडियाद (संतराम मंदिर क्षेत्र)', 'भरूच'],
    areasCoveredGu: ['અલકાપુરી', 'માંજલપુર', 'ગોત્રી', 'સમા', 'કારેલીબાગ', 'મકરપુરા GIDC', 'આણંદ', 'નડિયાદ', 'ભરૂચ'],
    descriptionEn: 'Serving thousands of NRI families, chemical factory industrialists, and students across Vadodara and Charotar (Anand-Nadiad). Renowned for foreign visa horoscope analysis, 36 Gun Milan, and industrial Vastu.',
    descriptionHi: 'संस्कार नगरी वडोदरा एवं चरोतर (आणंद-नडियाद) के समृद्ध एनआरआई परिवारों, उद्योगपतियों एवं विद्यार्थियों द्वारा विदेश पढ़ाई, पीआर योग, विवाह गुण मिलान एवं फैक्ट्री वास्तु हेतु 35 वर्षों से अटूट विश्वास।',
    descriptionGu: 'સંસ્કાર નગરી વડોદરા અને ચરોતરના પરિવારો વિદેશ વિઝા, કરિયર અને 36 ગુણ લગ્ન મિલન માટે નિયમિત પરામર્શ મેળવે છે.',
    keyServicesEn: [
      'Charotar NRI Families USA/Canada Visa & Marriage Matching',
      'Vadodara GIDC Chemical & Engineering Factory Vastu',
      'Marriage Delay Remedies, Nadi & Bhakoot Shanti',
      'Children Higher Education & Vidyarambha Timings'
    ],
    keyServicesHi: [
      'चरोतर एनआरआई परिवारों हेतु यूएसए/कनाडा वीज़ा एवं विवाह कुंडली मिलान',
      'वडोदरा GIDC केमिकल व इंजीनियरिंग फैक्ट्री का शास्त्रीय वास्तु',
      'विवाह में विलंब निवारण, नाड़ी-भकूट दोष शांति',
      'संतान विद्या योग एवं उच्च शिक्षा मार्गदर्शन'
    ],
    keyServicesGu: [
      'ચરોતર પરિવારો માટે યુએસએ/કેનેડા વિઝા અને લગ્ન મિલન',
      'જીઆઈડીસી ફેક્ટરી અને ઉદ્યોગનું શાસ્ત્રોક્ત વાસ્તુ',
      'લગ્ન વિલંબ નિવારણ અને નાડી-ભકૂટ દોષ શાંતિ',
      'સંતાન ઉચ્ચ શિક્ષણ અને વિદ્યા યોગ વિચાર'
    ],
    consultationModesEn: 'Direct Phone (+91 99090 87902) | Online Kundli Session',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | ऑनलाइन जन्म पत्रिका | वीडियो परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902) | ડિજિટલ કુંડળી સત્ર',
    popularSearchTerms: ['Best Astrologer in Vadodara', 'Alkapuri Vadodara Jyotish', 'Anand Nadiad Kundli Matching', 'Vadodara Famous Astrologer', 'Charotar NRI Jyotish'],
    ctaPhoneTextEn: 'Call from Vadodara',
    ctaPhoneTextHi: 'वडोदरा से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'વડોદરાથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं वडोदरा / चरोतर से हूँ। मुझे कुंडली / विवाह मिलान हेतु मार्गदर्शन चाहिए।'
  },
  {
    id: 'bengaluru',
    badge: 'सिलिकॉन वैली व दक्षिण भारत',
    badgeColor: 'from-blue-700 to-cyan-900 text-white',
    icon: '🚀',
    nameEn: 'Bengaluru & South India (बेंगलुरु, हैदराबाद)',
    nameHi: 'बेंगलुरु एवं दक्षिण भारत (कर्नाटक, हैदराबाद, चेन्नई)',
    nameGu: 'બેંગલુરુ અને દક્ષિણ ભારત (કર્ણાટક, હૈદરાબાદ, ચેન્નાઈ)',
    headlineEn: 'Leading Vedic Astrologer for Bengaluru Tech & NRI Communities',
    headlineHi: 'बेंगलुरु के भारतीय एवं प्रवासी परिवारों का अग्रणी वैदिक ज्योतिष केंद्र',
    headlineGu: 'બેંગલુરુના ટેક પ્રોફેશનલ્સ અને પરિવારો માટે અગ્રણી વૈદિક જ્યોતિષ',
    taglineEn: 'Serving Koramangala, Indiranagar, Whitefield, Jayanagar, HSR Layout & Electronic City',
    taglineHi: 'कोरमंगला, इंदिरानगर, व्हाइटफील्ड, जयनगर, एचएसआर लेआउट एवं इलेक्ट्रॉनिक सिटी के जातकों का विश्वास',
    taglineGu: 'કોરમંગલા, ઈન્દિરાનગર, વ્હાઇટફિલ્ડ અને એચએસઆર લેઆઉટના જાતકોનો વિશ્વાસ',
    areasCoveredEn: ['Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'HSR Layout', 'Electronic City', 'Malleswaram', 'Hebbal', 'Hyderabad', 'Chennai'],
    areasCoveredHi: ['कोरमंगला', 'इंदिरानगर', 'व्हाइटफील्ड', 'जयनगर', 'एचएसआर लेआउट', 'इलेक्ट्रॉनिक सिटी', 'मल्लेश्वरम', 'हेब्बल', 'हैदराबाद', 'चेन्नई'],
    areasCoveredGu: ['કોરમંગલા', 'ઈન્દિરાનગર', 'વ્હાઇટફિલ્ડ', 'જયનગર', 'એચએસઆર લેઆઉટ', 'ઈલેક્ટ્રોનિક સિટી'],
    descriptionEn: 'Guiding startup founders, senior tech architects, and North Indian & Gujarati families residing in Bengaluru. Providing accurate planetary timings for startup funding, onsite transfers, love marriage reconciliation, and high-rise apartment Vastu.',
    descriptionHi: 'बेंगलुरु के शीर्ष आईटी प्रोफेशनल्स, स्टार्टअप फाउंडर्स तथा उत्तर भारतीय व गुजराती समाज हेतु करियर स्विच, वीज़ा, प्रेम विवाह, तनाव मुक्ति एवं अपार्टमेंट वास्तु का 100% प्रामाणिक वैदिक मार्गदर्शन।',
    descriptionGu: 'બેંગલુરુના આઈટી પ્રોફેશનલ્સ અને સ્ટાર્ટઅપ ફાઉન્ડર્સ કરિયર, વિદેશ યોગ અને પ્રેમ લગ્ન માટે પંડિતજી પાસેથી માર્ગદર્શન મેળવે છે.',
    keyServicesEn: [
      'Startup Funding, Tech Career Switch & Onsite Astrological Timings',
      'Intercaste Love Marriage Reconciliation & Family Consent',
      'High-Rise Apartment & Villa Vastu without Demolition',
      'Mental Peace, Stress Relief & Planetary Harmonization'
    ],
    keyServicesHi: [
      'स्टार्टअप फंडिंग, टेक करियर व विदेश ऑनसाइट ग्रह दशा विश्लेषण',
      'अंतरजातीय प्रेम विवाह, लव प्रॉब्लम व परिवार सहमति समाधान',
      'हाई-राइज अपार्टमेंट व विला हेतु बिना तोड़फोड़ का वास्तु',
      'मानसिक तनाव, डिप्रेशन व नवग्रह शांति के सात्विक वैदिक उपाय'
    ],
    keyServicesGu: [
      'સ્ટાર્ટઅપ ફંડિંગ, ટેક કરિયર અને વિદેશ ગમન ગ્રહ વિચાર',
      'આંતરજ્ઞાતીય પ્રેમ લગ્ન અને પરિવાર સંમતિ ઉપાય',
      'હાઈ-રાઈઝ એપાર્ટમેન્ટ તોડફોડ વગરનું વાસ્તુ',
      'માનસિક શાંતિ અને નવગ્રહ શાંતિના સાત્વિક ઉપાય'
    ],
    consultationModesEn: 'Direct Phone Consultation (+91 99090 87902) | Online Kundli Session',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | ऑनलाइन जन्म पत्रिका | वीडियो परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902) | ઓનલાઇન કુંડળી સત્ર',
    popularSearchTerms: ['Best Vedic Astrologer in Bangalore', 'Love Marriage Specialist Bangalore', 'Vashikaran Specialist Astrologer Bangalore', 'Whitefield Koramangala Jyotish', 'Tech Career Astrologer Bangalore', 'Kundli Matching Bengaluru'],
    ctaPhoneTextEn: 'Call from Bangalore',
    ctaPhoneTextHi: 'बेंगलुरु से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'બેંગલુરુથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं बेंगलुरु / दक्षिण भारत से हूँ। मुझे करियर / प्रेम विवाह / कुंडली हेतु परामर्श चाहिए।'
  },
  {
    id: 'jodhpur',
    badge: 'माँ माजीसा धाम व मारवाड़ क्षेत्र',
    badgeColor: 'from-amber-600 to-red-700 text-white',
    icon: '🏰',
    nameEn: 'Jodhpur & Marwar (Rajasthan)',
    nameHi: 'जोधपुर एवं मारवाड़ संभाग (राजस्थान)',
    nameGu: 'જોધપુર અને મારવાડ વિસ્તાર (રાજસ્થાન)',
    headlineEn: 'Famous Astrologer in Jodhpur - Maa Majisa Kripa, Love Problem & Vashikaran Solution',
    headlineHi: 'जोधपुर में प्रसिद्ध ज्योतिषी — माँ माजीसा कृपा, लव प्रॉब्लम व सात्विक वशीकरण समाधान',
    headlineGu: 'જોધપુરમાં પ્રખ્યાત જ્યોતિષી — માં માજીસા કૃપા અને પ્રેમ લગ્ન ઉપાય',
    taglineEn: 'Trusted Vedic Astrologer for Marwari Families in Sardarpura, Ratanada, Shastri Nagar & Mandore',
    taglineHi: 'सरदारपुरा, रातानाडा, शास्त्री नगर, मंडोर एवं संपूर्ण मारवाड़ के प्रतिष्ठित परिवारों के पारिवारिक ज्योतिषी',
    taglineGu: 'સરદારપુરા, રાતાનાડા, શાસ્ત્રી નગર અને સમગ્ર મારવાડના પરિવારોની પ્રથમ પસંદગી',
    areasCoveredEn: ['Sardarpura', 'Ratanada', 'Shastri Nagar', 'Mandore', 'Paota', 'Pal Road', 'Sohati Gate'],
    areasCoveredHi: ['सरदारपुरा', 'रातानाडा', 'शास्त्री नगर', 'मंडोर', 'पावटा', 'पाल रोड', 'सोजती गेट'],
    areasCoveredGu: ['સરદારપુરા', 'રાતાનાડા', 'શાસ્ત્રી નગર', 'મંડોર', 'પાવટા', 'પાલ રોડ'],
    descriptionEn: 'Serving historic Jodhpur and the Marwar desert with ancient Vedic astrology, Maa Majisa divine remedies, love problem resolution, genuine Vashikaran guidance, 36 Gun Milan for Rajput & Marwari marriages, and business astrology for textile & handicraft traders.',
    descriptionHi: 'सूर्य नगरी जोधपुर एवं समूचे मारवाड़ में पूज्य माँ माजीसा के अनन्य आशीर्वाद से लव प्रॉब्लम सॉल्यूशन, मनचाहा प्यार, सात्विक वशीकरण दोष निवारण, विवाह में आ रही अड़चनों का अंत, एवं व्यापार में धन लाभ के अचूक वैदिक शास्त्रीय अनुष्ठान।',
    descriptionGu: 'જોધપુર અને મારવાડમાં માં માજીસાના આશીર્વાદથી પ્રેમ સમસ્યા નિવારણ, સાત્વિક વશીકરણ દોષ શાંતિ અને વેપાર વૃદ્ધિના ઉપાય.',
    keyServicesEn: [
      'Love Problem Solution & Intercaste Love Marriage Approval',
      'Satvik Vashikaran & Relationship Harmony Astrological Remedies',
      'Traditional Marwari & Rajput 36 Gun Milan with Nadi Dosh Parihar',
      'Business Profitability & Debt Clearance for Traders & Exporters'
    ],
    keyServicesHi: [
      'लव प्रॉब्लम समाधान एवं प्रेम विवाह में माता-पिता की सहमति के उपाय',
      'सात्विक वशीकरण व पति-पत्नी के आपसी क्लेश का स्थायी निवारण',
      'मारवाड़ी एवं राजपूत समाज हेतु 36 गुण मिलान व नाड़ी/मांगलिक दोष परिहार',
      'हस्तशिल्प, कपड़ा व खनिज व्यापारियों हेतु व्यापार वृद्धि व कर्ज मुक्ति अनुष्ठान'
    ],
    keyServicesGu: [
      'લવ પ્રોબ્લેમ સોલ્યુશન અને પ્રેમ લગ્ન ઉપાય',
      'સાત્વિક વશીકરણ અને પતિ-પત્ની મતભેદ નિવારણ',
      '36 ગુણ મિલન અને નાડી દોષ પરિહાર',
      'વેપાર વૃદ્ધિ અને દેવા મુક્તિ વૈદિક ઉપાય'
    ],
    consultationModesEn: 'Direct Phone Call (+91 99090 87902) | Video Consultation',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | त्वरित जन्म पत्रिका विश्लेषण | व्यक्तिगत फोन अपॉइंटमेंट',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902) | ઓનલાઇન કુંડળી વિશ્લેષણ',
    popularSearchTerms: [
      'Jodhpur me Best Astrologer',
      'जोधपुर में वशीकरण विशेषज्ञ ज्योतिषी',
      'Love Problem Solution in Jodhpur',
      'जोधपुर में लव मैरिज स्पेशलिस्ट',
      'Maa Majisa Kripa Jyotish Jodhpur',
      'Best Astrologer Sardarpura Jodhpur',
      'जोधपुर में प्रसिद्ध पंडित जी फोन नंबर',
      'खोया प्यार वापस पाएं ज्योतिषी जोधपुर'
    ],
    ctaPhoneTextEn: 'Call from Jodhpur',
    ctaPhoneTextHi: 'जोधपुर से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'જોધપુરથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं जोधपुर / मारवाड़ से हूँ। मुझे कुंडली विश्लेषण / लव प्रॉब्लम / विवाह समाधान चाहिए।'
  },
  {
    id: 'ujjain',
    badge: 'महाकाल नगरी एवं कालसर्प पीठ',
    badgeColor: 'from-orange-700 to-amber-900 text-white',
    icon: '🕉️',
    nameEn: 'Ujjain (Madhya Pradesh)',
    nameHi: 'उज्जैन (महाकाल की नगरी, मध्य प्रदेश)',
    nameGu: 'ઉજ્જૈન (મહાકાલ નગરી, મધ્યપ્રદેશ)',
    headlineEn: 'Best Astrologer for Ujjain - Kaal Sarp Dosh, Manglik Dosh & Vashikaran Nivaran',
    headlineHi: 'उज्जैन में सर्वश्रेष्ठ ज्योतिषी — कालसर्प दोष, मंगल दोष शांति व वशीकरण निवारण',
    headlineGu: 'ઉજ્જૈનમાં સર્વશ્રેષ્ઠ જ્યોતિષી — કાલસર્પ દોષ અને મંગળ દોષ શાંતિ',
    taglineEn: 'Authentic Tantra-Mantra & Vedic Astrology rooted in Avanti Mahakal Sacred Traditions',
    taglineHi: 'अवन्तिका उज्जैन महाकाल की पावन वैदिक ज्योतिष परम्परा से ग्रह शांति व समस्त बाधाओं का निवारण',
    taglineGu: 'મહાકાલની પાવન પરંપરાથી કાલસર્પ દોષ અને નવગ્રહ શાંતિ',
    areasCoveredEn: ['Freeganj', 'Mahakal Temple Area', 'Nanawala', 'Dewas Road', 'Nanakheda', 'Sethji ki Chhatri'],
    areasCoveredHi: ['फ्रीगंज', 'महाकाल मंदिर परिसर', 'नानाखेड़ा', 'देवास रोड', 'माधव नगर', 'ऋषिनगर'],
    areasCoveredGu: ['ફ્રીગંજ', 'મહાકાલ પરિસર', 'નાનાખેડા', 'દેવાસ રોડ'],
    descriptionEn: 'Renowned for authentic Kaal Sarp Dosh, Pitra Dosh, and Mangal Dosh Nivaran. Offering accurate planetary horoscope consultation, love dispute resolutions, and protective Vedic kavach across Ujjain and Malwa region.',
    descriptionHi: 'महाकाल की पावन नगरी उज्जैन में कालसर्प दोष, मांगलिक दोष, अंगारक दोष व पितृ दोष की प्रामाणिक शांति। तांत्रिक वशीकरण व नकारात्मक ऊर्जा से मुक्ति तथा प्रेम व वैवाहिक जीवन में सुख-शांति की प्राप्ति।',
    descriptionGu: 'કાલસર્પ દોષ, પિતૃ દોષ અને માંગલિક દોષ શાંતિના શાસ્ત્રોક્ત ઉપાય.',
    keyServicesEn: [
      'Kaal Sarp Dosh & Bhat Puja Astronomical Diagnostic',
      'Mangal Dosh & Angarak Yog Complete Remediation',
      'Love Marriage Obstacle Removal & Family Reconciliation',
      'Evil Eye & Negative Energy Removal through Satvik Rituals'
    ],
    keyServicesHi: [
      'कालसर्प दोष, भात पूजा एवं नारायण नागबलि ग्रह गणना',
      'मांगलिक दोष, वैधव्य योग व अंगारक योग का शास्त्रीय परिहार',
      'प्रेम विवाह में आ रही रुकावटों का अंत व मनचाहा जीवनसाथी योग',
      'नकारात्मक ऊर्जा, नजर दोष व सात्विक रक्षा कवच निर्माण'
    ],
    keyServicesGu: [
      'કાલસર્પ દોષ અને માંગલિક દોષ શાંતિ',
      'પ્રેમ લગ્ન અડચણ નિવારણ',
      'નકારાત્મક ઊર્જા અને નજર દોષ મુક્તિ'
    ],
    consultationModesEn: 'Direct Phone Consultation (+91 99090 87902)',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | महाकाल क्षेत्र से त्वरित परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902)',
    popularSearchTerms: [
      'Ujjain me Best Astrologer',
      'उज्जैन में कालसर्प दोष निवारण ज्योतिषी',
      'Kaal Sarp Dosh Specialist Ujjain',
      'उज्जैन में वशीकरण स्पेशलिस्ट पंडित',
      'Love Marriage Astrologer Ujjain',
      'मंगल दोष शांति उज्जैन ज्योतिषी फोन नंबर'
    ],
    ctaPhoneTextEn: 'Call from Ujjain',
    ctaPhoneTextHi: 'उज्जैन से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'ઉજ્જૈનથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं उज्जैन / मध्य प्रदेश से हूँ। मुझे कालसर्प / विवाह दोष / लव प्रॉब्लम समाधान चाहिए।'
  },
  {
    id: 'bhopal',
    badge: 'राजधानी भोपाल एवं मध्य भारत',
    badgeColor: 'from-emerald-700 to-teal-900 text-white',
    icon: '🏛️',
    nameEn: 'Bhopal (Madhya Pradesh)',
    nameHi: 'भोपाल (राजधानी, मध्य प्रदेश)',
    nameGu: 'ભોપાલ (મધ્યપ્રદેશ)',
    headlineEn: 'Best Astrologer in Bhopal - Love Problem Specialist & Career Jyotish',
    headlineHi: 'भोपाल में सर्वश्रेष्ठ ज्योतिषी — लव प्रॉब्लम स्पेशलिस्ट, प्रेम विवाह व करियर मार्गदर्शन',
    headlineGu: 'ભોપાલમાં સર્વશ્રેષ્ઠ જ્યોતિષી — લવ પ્રોબ્લેમ અને કરિયર માર્ગદર્શન',
    taglineEn: 'Top Rated Jyotish in MP Nagar, Arera Colony, Kolar Road & Shahpura',
    taglineHi: 'एमपी नगर, अरेरा कॉलोनी, शाहपुरा, कोलार रोड एवं भोपाल के शीर्ष परिवारों के मार्गदर्शक',
    taglineGu: 'એમપી નગર, અરેરા કોલોની અને ભોપાલના પ્રતિષ્ઠિત પરિવારો માટે જ્યોતિષ',
    areasCoveredEn: ['MP Nagar', 'Arera Colony', 'Kolar Road', 'Shahpura', 'Hoshangabad Road', 'TT Nagar'],
    areasCoveredHi: ['एमपी नगर', 'अरेरा कॉलोनी', 'कोलार रोड', 'शाहपुरा', 'होशंगाबाद रोड', 'टीटी नगर', 'अयोध्या बायपास'],
    areasCoveredGu: ['એમપી નગર', 'અરેરા કોલોની', 'કોલાર રોડ', 'શાહપુરા'],
    descriptionEn: 'Trusted by government officers, engineers, doctors and students across Bhopal for career advancement, government job yoga in horoscope, love affair problems, love marriage parents convincing, and business growth.',
    descriptionHi: 'भोपाल में सरकारी नौकरी के योग, प्रतियोगी परीक्षाओं में सफलता, अंतरजातीय प्रेम विवाह में परिजनों की रजामंदी, पति-पत्नी में तलाक जैसी नौबत को टालने और व्यापार में घाटे को मुनाफे में बदलने के अचूक ज्योतिषीय समाधान।',
    descriptionGu: 'સરકારી નોકરી યોગ, પ્રેમ લગ્ન માટે પરિવાર સંમતિ અને વેપાર વૃદ્ધિ ઉપાય.',
    keyServicesEn: [
      'Government Job & Competitive Exam Astrological Yoga',
      'Love Marriage Specialist & Intercaste Love Problem Solved',
      'Husband-Wife Dispute Settlement & Divorce Prevention',
      'Business Loss Recovery & Commercial Vastu Consultation'
    ],
    keyServicesHi: [
      'सरकारी नौकरी, पीएससी/यूपीएससी सफलता व पदोन्नति ग्रह विचार',
      'लव प्रॉब्लम स्पेशलिस्ट — प्रेम विवाह में माता-पिता को मनाने के उपाय',
      'पति-पत्नी आपसी अनबन, सास-ससुर क्लेश व तलाक निवारण',
      'दुकान, फैक्ट्री व शोरूम हेतु व्यापार वृद्धि व कर्ज से मुक्ति'
    ],
    keyServicesGu: [
      'સરકારી નોકરી ગ્રહ વિચાર અને પ્રેમ લગ્ન ઉપાય',
      'પતિ-પત્ની ઝઘડા નિવારણ અને વેપાર પ્રગતિ'
    ],
    consultationModesEn: 'Direct Phone Consultation (+91 99090 87902)',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | गोपनीय व प्रामाणिक परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902)',
    popularSearchTerms: [
      'Bhopal Best Astrologer',
      'भोपाल में लव प्रॉब्लम सॉल्यूशन ज्योतिषी',
      'Love Marriage Specialist in Bhopal',
      'भोपाल में वशीकरण स्पेशलिस्ट',
      'Best Jyotish in MP Nagar Bhopal',
      'भोपाल के सबसे प्रसिद्ध ज्योतिषी का नंबर'
    ],
    ctaPhoneTextEn: 'Call from Bhopal',
    ctaPhoneTextHi: 'भोपाल से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'ભોપાલથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं भोपाल से हूँ। मुझे करियर / सरकारी नौकरी / लव मैरिज हेतु परामर्श चाहिए।'
  },
  {
    id: 'udaipur',
    badge: 'झील नगरी उदयपुर एवं मेवाड़',
    badgeColor: 'from-cyan-700 to-blue-900 text-white',
    icon: '🌊',
    nameEn: 'Udaipur & Mewar (Rajasthan)',
    nameHi: 'उदयपुर एवं मेवाड़ संभाग (राजस्थान)',
    nameGu: 'ઉદયપુર અને મેવાડ (રાજસ્થાન)',
    headlineEn: 'Famous Astrologer in Udaipur - Destination Wedding Kundli, Love & Business Jyotish',
    headlineHi: 'उदयपुर में प्रसिद्ध ज्योतिषी — विवाह गुण मिलान, लव प्रॉब्लम समाधान व व्यापार वृद्धि',
    headlineGu: 'ઉદયપુરમાં પ્રખ્યાત જ્યોતિષી — લગ્ન કુંડળી મિલન અને પ્રેમ સમસ્યા ઉપાય',
    taglineEn: 'Serving Royal Mewar Families, Hotel & Marble Business Tycoons in Panchwati, Hiran Magri & Fatehpura',
    taglineHi: 'पंचवटी, हिरण मगरी, फतहपुरा, सविना एवं मेवाड़ के प्रतिष्ठित व्यापारियों व परिवारों के विश्वसनीय ज्योतिषी',
    taglineGu: 'પંચવટી, હિરણ મગરી અને ઉદયપુરના વ્યાપારી પરિવારો માટે વિશ્વસનીય જ્યોતિષ',
    areasCoveredEn: ['Panchwati', 'Hiran Magri', 'Fatehpura', 'Sukher', 'Savina', 'Chetak Circle', 'Bhubneshwar'],
    areasCoveredHi: ['पंचवटी', 'हिरण मगरी', 'फतहपुरा', 'सुखेर', 'सविना', 'चेतक सर्कल', 'अशोक नगर'],
    areasCoveredGu: ['પંચવટી', 'હિરણ મગરી', 'ફતેહપુરા', 'સુખેર'],
    descriptionEn: 'Specializing in royal destination wedding Kundli matching, high-profile relationship consulting, love problem solution, marble and tourism business astrological boosts, and Maa Majisa blessing rituals.',
    descriptionHi: 'मेवाड़ की ऐतिहासिक धरा उदयपुर में होटल, मार्बल व हैंडीक्राफ्ट व्यापार की उन्नति, वैवाहिक सुख, प्रेम संबंधों में आ रही गलतफहमी का निराकरण, वशीकरण दोष शांति एवं सात्विक वैदिक अनुष्ठान।',
    descriptionGu: 'હોટેલ અને માર્બલ વેપાર પ્રગતિ, લગ્ન સુખ અને પ્રેમ સંબંધોમાં સુમેળ માટે જ્યોતિષીય ઉપાય.',
    keyServicesEn: [
      'High-Precision 36 Gun Milan for Destination Weddings',
      'Love Problem Settlement & Broken Relationship Healing',
      'Tourism, Marble & Hospitality Business Astrology',
      'Pitra Dosh & Kuldevi Blessing Rituals'
    ],
    keyServicesHi: [
      'डेस्टिनेशन वेडिंग हेतु 36 गुण मिलान व मांगलिक दोष शुद्धि',
      'लव प्रॉब्लम समाधान — रूठे साथी को मनाना व रिश्ता बचाना',
      'मार्बल, होटल व पर्यटन कारोबार में तरक्की व धन वृद्धि योग',
      'पितृ दोष निवारण व कुलदेवी माँ माजीसा कृपा अनुष्ठान'
    ],
    keyServicesGu: [
      '36 ગુણ મિલન અને માંગલિક દોષ નિવારણ',
      'લવ પ્રોબ્લેમ સોલ્યુશન અને પ્રેમ સંબંધ ઉપાય',
      'માર્બલ અને હોટેલ વેપાર વૃદ્ધિ'
    ],
    consultationModesEn: 'Direct Phone Consultation (+91 99090 87902)',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | फोन पर त्वरित फलादेश',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902)',
    popularSearchTerms: [
      'Best Astrologer in Udaipur',
      'उदयपुर में प्रसिद्ध ज्योतिषी',
      'Love Problem Solution Udaipur',
      'उदयपुर में वशीकरण विशेषज्ञ',
      'Kundli Matching in Udaipur',
      'उदयपुर ज्योतिष केंद्र फोन नंबर'
    ],
    ctaPhoneTextEn: 'Call from Udaipur',
    ctaPhoneTextHi: 'उदयपुर से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'ઉદયપુરથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं उदयपुर से हूँ। मुझे जन्म पत्रिका / विवाह मिलान / व्यापार मार्गदर्शन चाहिए।'
  },
  {
    id: 'kota',
    badge: 'शिक्षा नगरी कोटा',
    badgeColor: 'from-violet-700 to-purple-900 text-white',
    icon: '🎯',
    nameEn: 'Kota (Rajasthan)',
    nameHi: 'कोटा (शिक्षा नगरी, राजस्थान)',
    nameGu: 'કોટા (શિક્ષા નગરી, રાજસ્થાન)',
    headlineEn: 'Best Astrologer in Kota - IIT JEE / NEET Exam Success, Career & Love Problem Jyotish',
    headlineHi: 'कोटा में प्रसिद्ध ज्योतिषी — IIT JEE / NEET परीक्षा में एकाग्रता, करियर व लव प्रॉब्लम समाधान',
    headlineGu: 'કોટામાં સર્વશ્રેષ્ઠ જ્યોતિષી — એક્ઝામ સફળતા, કરિયર અને લવ પ્રોબ્લેમ',
    taglineEn: 'Guiding Thousands of Students, Parents & Professionals in Talwandi, Vigyan Nagar & Mahaveer Nagar',
    taglineHi: 'तलवंडी, विज्ञान नगर, महावीर नगर, दादाबाड़ी एवं कोटा के छात्रों व अभिभावकों के सच्चे मार्गदर्शक',
    taglineGu: 'તલવંડી, વિજ્ઞાન નગર અને કોટાના છાત્રો અને માતા-પિતા માટે માર્ગદર્શન',
    areasCoveredEn: ['Talwandi', 'Vigyan Nagar', 'Mahaveer Nagar', 'Dadabari', 'Kunhari', 'Indraprastha Area'],
    areasCoveredHi: ['तलवंडी', 'विज्ञान नगर', 'महावीर नगर', 'दादाबाड़ी', 'कुन्हाड़ी', 'इंद्रप्रस्थ एरिया'],
    areasCoveredGu: ['તલવંડી', 'વિજ્ઞાન નગર', 'મહાવીર નગર', 'દાદાબારી'],
    descriptionEn: 'Astrological guidance for academic pressure, exam anxiety, memory concentration, Saraswati Yoga activation, engineering/medical career astrology, youth relationship issues, and family peace.',
    descriptionHi: 'प्रतियोगी परीक्षाओं (IIT-JEE, NEET, UPSC) की तैयारी कर रहे विद्यार्थियों के लिए बुध-गुरु ग्रह शांति, एकाग्रता वृद्धि, युवाओं के प्रेम प्रसंग की उलझन का समाधान, एवं पारिवारिक शांति के सरल सात्विक उपाय।',
    descriptionGu: 'પરીક્ષામાં એકાગ્રતા, સરસ્વતી યોગ અને યુવાનોની પ્રેમ સંબંધ સમસ્યાઓના ઉપાય.',
    keyServicesEn: [
      'Academic Concentration & Memory Enhancement (Mercury-Jupiter Yoga)',
      'Competitive Exam Success Astrological Remedies (NEET / JEE)',
      'Youth Love Breakup Recovery & Emotional Balance Guidance',
      'Parent-Child Generation Gap & Career Stream Selection'
    ],
    keyServicesHi: [
      'विद्या बुद्धि व एकाग्रता वृद्धि हेतु बुध-बृहस्पति ग्रह उपाय',
      'नीट (NEET) व जेईई (JEE) परीक्षा में सफलता हेतु शास्त्रीय अनुष्ठान',
      'प्रेम प्रसंग में धोखा, ब्रेकअप व तनाव से मुक्ति के उपाय',
      'करियर में सही दिशा चयन व माता-पिता के साथ सामंजस्य'
    ],
    keyServicesGu: [
      'પરીક્ષા સફળતા અને એકાગ્રતા વૃદ્ધિ ઉપાય',
      'યુવા પ્રેમ સંબંધ અને બ્રેકઅપ નિવારણ'
    ],
    consultationModesEn: 'Direct Phone Consultation (+91 99090 87902)',
    consultationModesHi: 'सीधा फोन कॉल (+91 99090 87902) | अत्यंत गोपनीय विद्यार्थी व अभिभावक परामर्श',
    consultationModesGu: 'સીધો ફોન કોલ (+91 99090 87902)',
    popularSearchTerms: [
      'Best Astrologer in Kota',
      'कोटा में प्रसिद्ध ज्योतिषी',
      'Kota Education Career Astrologer',
      'कोटा में लव प्रॉब्लम समाधान',
      'Exam Anxiety Astrological Remedy Kota',
      'कोटा ज्योतिषी फोन नंबर'
    ],
    ctaPhoneTextEn: 'Call from Kota',
    ctaPhoneTextHi: 'कोटा से परामर्श हेतु कॉल करें',
    ctaPhoneTextGu: 'કોટાથી સંપર્ક કરો',
    waCityMessage: 'नमस्ते पंडित जी, मैं कोटा से हूँ। मुझे परीक्षा / करियर / लव प्रॉब्लम हेतु मार्गदर्शन चाहिए।'
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
  },
  {
    id: 'canada',
    badge: 'कनाडा एनआरआई सेवा (EST / PST)',
    badgeColor: 'from-red-700 to-rose-900 text-white',
    icon: '🇨🇦',
    nameEn: 'Canada (Toronto, Brampton, Vancouver)',
    nameHi: 'कनाडा (टोरंटो, ब्रैम्पटन, वैंकूवर) वैदिक ज्योतिष सेवा',
    nameGu: 'કેનેડા (ટોરોન્ટો, બ્રેમ્પટન, વાનકુવર) વૈદિક જ્યોતિષ સેવા',
    headlineEn: 'Best Indian Astrologer in Canada (Toronto, Brampton, Mississauga & Vancouver)',
    headlineHi: 'कनाडा के टोरंटो, ब्रैम्पटन व वैंकूवर के प्रवासी भारतीयों हेतु विश्वसनीय वैदिक ज्योतिष एवं 36 गुण मिलान',
    headlineGu: 'કેનેડાના ટોરોન્ટો, બ્રેમ્પટન અને વાનકુવરના ગુજરાતી-ભારતીય પરિવારો માટે અધિકૃત વૈદિક જ્યોતિષ',
    taglineEn: 'Vedic Kundli, PR Settlement, Work Permit & Matrimonial Horoscope in Greater Toronto Area (GTA) & BC',
    taglineHi: 'ग्रेटर टोरंटो एरिया (GTA), ब्रैम्पटन एवं ब्रिटिश कोलंबिया के परिवारों का पसंदीदा ज्योतिष परामर्श',
    taglineGu: 'ટોરોન્ટો, બ્રેમ્પટન અને વાનકુવરમાં વસતા પરિવારોનું વિશ્વસનીય જ્યોતિષ સંસ્થાન',
    areasCoveredEn: ['Toronto (Downtown, Scarborough)', 'Brampton & Mississauga', 'Vancouver & Surrey (BC)', 'Calgary & Edmonton (Alberta)', 'Ottawa & Montreal'],
    areasCoveredHi: ['टोरंटो (स्कार्ब्रो)', 'ब्रैम्पटन व मिसिसागा', 'वैंकूवर व सरी', 'कैलगरी व एडमोंटन', 'ओटावा व मॉन्ट्रियल'],
    areasCoveredGu: ['ટોરોન્ટો', 'બ્રેમ્પટન અને મિસિસાગા', 'વાનકુવર અને સરે', 'કેલગરી', 'ઓટાવા'],
    descriptionEn: 'Serving Canadian Indian diaspora across Ontario, Alberta, and British Columbia. Accurate calculation of Daylight Saving Time (DST) for Canadian born children, Canada PR settlement planetary timings, and authentic 36 Gun Milan for matrimonial decisions.',
    descriptionHi: 'कनाडा (ओंटारियो, अलबर्टा एवं बीसी) में रहने वाले भारतीय परिवारों हेतु प्रामाणिक वैदिक मार्गदर्शन। कनाडा में जन्मे बच्चों की शुद्ध DST युक्त जन्म कुंडली, कनाडा पीआर व वर्क परमिट ग्रह दशा विचार, और 36 गुण विवाह मिलान।',
    descriptionGu: 'કેનેડામાં વસતા ગુજરાતી અને ભારતીય પરિવારો માટે પીઆર સેટલમેન્ટ, વર્ક પરમિટ અને 36 ગુણ લગ્ન મિલનનું સચોટ વૈદિક માર્ગદર્શન.',
    keyServicesEn: [
      'Canada NRI 36 Gun Milan with Nadi & Manglik Dosha remedies',
      'Canada PR, Work Permit & Job Stability Astrological Timing',
      'Canadian Born Baby Janam Kundli with Precise DST Correction',
      'Commercial & Residential Vastu for Canadian Homes & Businesses'
    ],
    keyServicesHi: [
      'कनाडा एनआरआई 36 गुण मिलान एवं मांगलिक दोष निवारण',
      'कनाडा पीआर, वर्क परमिट एवं नौकरी स्थायित्व का ग्रह दशा विचार',
      'कनाडा में जन्मे शिशुओं की सटीक DST संशोधित जन्म पत्रिका',
      'कनाडा में घर व स्टोर हेतु वैदिक वास्तु परामर्श'
    ],
    keyServicesGu: [
      'કેનેડા એનઆરઆઈ 36 ગુણ લગ્ન મિલન અને માંગલિક ઉપાય',
      'કેનેડા પીઆર અને કરિયર સ્થિરતા માટે ગ્રહ દશા માર્ગદર્શન',
      'કેનેડામાં જન્મેલા બાળકો માટે DST શુદ્ધ કુંડળી નિર્માણ',
      'કેનેડિયન ઘરો માટે વૈદિક વાસ્તુ પરીક્ષણ'
    ],
    consultationModesEn: 'WhatsApp Call & Chat (+91 99090 87902) | Zoom Video Call | Canadian Evening Timeslots',
    consultationModesHi: 'व्हाट्सएप कॉल व चैट (+91 99090 87902) | ज़ूम वीडियो कॉल | कनाडा समयानुसार स्लॉट',
    consultationModesGu: 'વોટ્સએપ કોલ અને ચેટ (+91 99090 87902) | ઝૂમ વિડિયો | કેનેડા સમય મુજબ',
    popularSearchTerms: ['Indian Astrologer in Canada', 'Brampton Gujarati Astrologer', 'Best Vedic Astrologer Toronto', 'Kundli Matching Vancouver', 'Canada PR Astrology Consultation'],
    ctaPhoneTextEn: 'WhatsApp for Canada Consultation',
    ctaPhoneTextHi: 'कनाडा परामर्श हेतु व्हाट्सएप करें',
    ctaPhoneTextGu: 'કેનેડા પરામર્શ માટે વોટ્સએપ કરો',
    waCityMessage: 'Hello Pandit Ji, I am contacting from Canada (Toronto/Brampton/Vancouver). I need Vedic astrology / PR / marriage consultation.'
  },
  {
    id: 'australia-dubai',
    badge: 'ऑस्ट्रेलिया एवं दुबई एनआरआई सेवा',
    badgeColor: 'from-emerald-700 to-teal-900 text-white',
    icon: '🇦🇺',
    nameEn: 'Australia & UAE (Sydney, Melbourne, Dubai)',
    nameHi: 'ऑस्ट्रेलिया एवं यूएई (सिडनी, मेलबर्न, दुबई) वैदिक ज्योतिष सेवा',
    nameGu: 'ઓસ્ટ્રેલિયા અને દુબઈ (સિડની, મેલબોર્ન, દુબઈ) વૈદિક જ્યોતિષ સેવા',
    headlineEn: 'Trusted Vedic Astrologer for Australia (Sydney, Melbourne) & UAE (Dubai, Abu Dhabi)',
    headlineHi: 'ऑस्ट्रेलिया (सिडनी, मेलबर्न) एवं खाड़ी देशों (दुबई, अबू धाबी) के प्रवासी भारतीयों हेतु वैदिक ज्योतिष',
    headlineGu: 'ઓસ્ટ્રેલિયા (સિડની, મેલબોર્ન) અને યુએઈ (દુબઈ) ના ભારતીય પરિવારો માટે વિશ્વસનીય વૈદિક જ્યોતિષ',
    taglineEn: 'Dedicated to NRI Families in Sydney, Melbourne, Brisbane, Perth, Dubai & Sharjah',
    taglineHi: 'सिडनी, मेलबर्न, ब्रिस्बेन, पर्थ, दुबई एवं शारजाह में व्यापारिक व पारिवारिक ज्योतिष परामर्श',
    taglineGu: 'સિડની, મેલબોર્ન અને દુબઈના પરિવારો માટે સમર્પિત વ્યાપાર અને કુંડળી સેવા',
    areasCoveredEn: ['Sydney (Parramatta, Blacktown)', 'Melbourne (Tarneit, Point Cook)', 'Brisbane & Perth', 'Dubai (Bur Dubai, Karama, Deira)', 'Abu Dhabi & Sharjah'],
    areasCoveredHi: ['सिडनी (पैरामाटा, ब्लैकटाउन)', 'मेलबर्न (टारनीट, पॉइंट कुक)', 'ब्रिस्बेन व पर्थ', 'दुबई (बर दुबई, करामा)', 'अबू धाबी व शारजाह'],
    areasCoveredGu: ['સિડની', 'મેલબોર્ન', 'બ્રિસ્બેન', 'દુબઈ', 'અબુ ધાબી'],
    descriptionEn: 'Providing confidential Vedic consultations across Australian Eastern Time (AEST) and Gulf Standard Time (GST). Comprehensive analysis for Australia PR visas, gold/commercial trade in Dubai, and accurate 36 Gun Milan for matrimonial alliances.',
    descriptionHi: 'ऑस्ट्रेलिया (AEST) एवं दुबई (GST) टाइमज़ोन के अनुसार सुलभ अपॉइंटमेंट्स। ऑस्ट्रेलिया पीआर वीज़ा, दुबई में व्यापार व निवेश का ग्रह चक्र विचार, एवं पारिवारिक शांति हेतु शास्त्रोक्त वैदिक मार्गदर्शन।',
    descriptionGu: 'ઓસ્ટ્રેલિયા પીઆર, દુબઈમાં વેપાર-ધંધો અને લગ્ન કુંડળી મિલન માટે પંડિતજીનું ઓનલાઇન પરામર્શ.',
    keyServicesEn: [
      'Australia PR Settlement & Citizenship Astrological Forecast',
      'Dubai & UAE Commercial Business, Trade & Investment Muhurat',
      'Cross-Continent 36 Gun Milan with Dosha Nivaran',
      'Southern Hemisphere Chart Adjustments & Daylight Saving Corrections'
    ],
    keyServicesHi: [
      'ऑस्ट्रेलिया पीआर सेटलमेंट एवं करियर वृद्धि का समय विचार',
      'दुबई व खाड़ी देशों में नया व्यापार, निवेश व दुकान का शुभ मुहूर्त',
      'विशुद्ध 36 गुण मिलान एवं मांगलिक/नाड़ी दोष परिहार',
      'दक्षिणी गोलार्ध व ऑस्ट्रेलिया टाइमज़ोन अनुसार शुद्ध लग्न चक्र'
    ],
    keyServicesGu: [
      'ઓસ્ટ્રેલિયા પીઆર અને કરિયર પ્રગતિ માટે ગ્રહ ઉપાય',
      'દુબઈમાં નવા વેપાર અને મુહૂર્ત માટે માર્ગદર્શન',
      '36 ગુણ લગ્ન મિલન અને દોષ નિવારણ',
      'ઓસ્ટ્રેલિયા ટાઈમઝોન મુજબ સચોટ કુંડળી'
    ],
    consultationModesEn: 'Direct WhatsApp Call & Voice Consultation (+91 99090 87902) | Convenient Time Slots',
    consultationModesHi: 'व्हाट्सएप कॉल व वॉइस परामर्श (+91 99090 87902) | सुविधाजनक समय स्लॉट',
    consultationModesGu: 'વોટ્સએપ કોલ અને વોઇસ પરામર્શ (+91 99090 87902) | અનુકૂળ સમય',
    popularSearchTerms: ['Indian Astrologer in Australia Sydney', 'Melbourne Vedic Jyotish', 'Indian Astrologer in Dubai UAE', 'Australia PR Astrologer', 'NRI Kundli Matching Dubai'],
    ctaPhoneTextEn: 'WhatsApp for Australia/Dubai',
    ctaPhoneTextHi: 'ऑस्ट्रेलिया/दुबई परामर्श हेतु व्हाट्सएप करें',
    ctaPhoneTextGu: 'ઓસ્ટ્રેલિયા/દુબઈ પરામર્શ માટે વોટ્સએપ કરો',
    waCityMessage: 'Hello Pandit Ji, I am contacting from Australia / Dubai. I need Vedic horoscope consultation.'
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
        <div className="inline-flex items-center gap-1.5 bg-[#0c1334] text-[#ffd236] px-3.5 py-1 rounded-full text-xs sm:text-sm font-black border border-amber-500/30 shadow-xs mb-3">
          <MapPin className="w-4 h-4 text-[#f99c00]" />
          <span>
            {lang === 'en'
              ? 'Local & Global Astrological Centers'
              : lang === 'hi'
              ? 'क्षेत्रीय एवं अंतरराष्ट्रीय ज्योतिष सेवा क्षेत्र'
              : 'પ્રાદેશિક અને આંતરરાષ્ટ્રીય જ્યોતિષ સેવા કેન્દ્ર'}
          </span>
        </div>

        <h2 className="font-mukta font-extrabold text-2xl sm:text-4xl royal-gold-gradient-text leading-tight mb-2 sm:mb-3 tracking-normal">
          {lang === 'en'
            ? 'City-Wise Vedic Astrology & Kundli Milan Centers'
            : lang === 'hi'
            ? 'शहरवार वैदिक ज्योतिष एवं जन्म कुंडली मिलान केंद्र'
            : 'શહેરવાર વૈદિક જ્યોતિષ અને જન્મ કુંડળી મિલન કેન્દ્રો'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          {lang === 'en'
            ? 'Serving authentic traditional Vedic astrology to families across Mehsana, Ahmedabad, Gandhinagar, Surat, Rajkot, Mumbai, and NRI diaspora in USA, UK, Canada & UAE.'
            : lang === 'hi'
            ? 'मेहसाणा, अहमदाबाद, गांधीनगर, सूरत, राजकोट, मुंबई एवं अमेरिका-यूके-कनाडा-दुबई के प्रवासी भारतीय परिवारों हेतु समर्पित, शास्त्रोक्त एवं प्रामाणिक वैदिक ज्योतिष सेवा।'
            : 'મહેસાણા, અમદાવાદ, ગાંધીનગર, સુરત, રાજકોટ, મુંબઈ તેમજ અમેરિકા-યુકે-કેનેડા-દુબઈના પ્રવાસી પરિવારો માટે સમર્પિત શાસ્ત્રોક્ત વૈદિક જ્યોતિષ સેવા.'}
        </p>
      </div>

      {/* City Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8 border-b border-white/10">
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
                  ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black border-amber-400 font-black shadow-md shadow-amber-500/20 scale-102'
                  : 'bg-[#0c1334] text-slate-300 hover:bg-[#121b44] border-white/10 hover:border-amber-400/30'
              }`}
            >
              <span className="text-base">{city.icon}</span>
              <span>{cityName}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>}
            </button>
          );
        })}
      </div>

      {/* Main Selected City Showcase Card */}
      <div className="bg-[#0c1334] rounded-3xl border border-amber-500/30 shadow-2xl shadow-black/50 overflow-hidden mb-10 transition-all text-slate-200">
        {/* Card Header Strip */}
        <div className="bg-gradient-to-r from-[#070b1e] via-[#0a102e] to-[#070b1e] p-5 sm:p-6 lg:p-7 border-b border-amber-500/20">
          {/* Top Badges Row */}
          <div className="flex items-center gap-2 flex-wrap mb-2.5">
            <span className={`text-[11px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${selectedCity.badgeColor} shadow-xs inline-flex items-center leading-none`}>
              {selectedCity.badge}
            </span>
            <span className="text-xs text-slate-200 font-bold bg-[#0c1334] border border-white/10 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 leading-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>35+ वर्ष शास्त्रीय अनुभव</span>
            </span>
          </div>

          {/* Heading + Subtitle + Action Buttons Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1 min-w-0 pr-0 lg:pr-4">
              <h3 className="font-yatra text-xl sm:text-2xl text-white leading-snug">
                {lang === 'en' ? selectedCity.headlineEn : lang === 'hi' ? selectedCity.headlineHi : selectedCity.headlineGu}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1.5 leading-relaxed">
                {lang === 'en' ? selectedCity.taglineEn : lang === 'hi' ? selectedCity.taglineHi : selectedCity.taglineGu}
              </p>
            </div>

            {/* Direct CTA Button in Header - Full Width / Auto */}
            <div className="flex items-center w-full sm:w-auto shrink-0 self-start lg:self-center">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="w-full sm:w-auto h-11 px-5 sm:px-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#e08b00] hover:to-[#e5a800] text-black font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-black shrink-0 animate-pulse" />
                <span className="leading-none pt-0.5">
                  {lang === 'en' ? `${selectedCity.ctaPhoneTextEn}: ${ASTROLOGER_INFO.phonePrimary}` : `${selectedCity.ctaPhoneTextHi}: ${ASTROLOGER_INFO.phonePrimary}`}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Card Body Grid */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Description, Localities, & Mode */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#f99c00]" />
                <span>
                  {lang === 'en' ? 'Region Overview & Heritage' : lang === 'hi' ? 'क्षेत्रीय महत्व एवं परंपरा' : 'પ્રાદેશિક મહત્વ અને પરંપરા'}
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed bg-[#070b1e] p-4 rounded-2xl border border-white/10">
                {lang === 'en' ? selectedCity.descriptionEn : lang === 'hi' ? selectedCity.descriptionHi : selectedCity.descriptionGu}
              </p>
            </div>

            {/* Areas / Localities Covered */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#f99c00]" />
                <span>
                  {lang === 'en' ? 'Key Areas, Towns & Communities Served' : lang === 'hi' ? 'प्रमुख क्षेत्र, उपनगर एवं समुदाय' : 'મુખ્ય વિસ્તારો અને સમુદાય'}
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'en' ? selectedCity.areasCoveredEn : lang === 'hi' ? selectedCity.areasCoveredHi : selectedCity.areasCoveredGu).map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#070b1e] hover:bg-[#121b44] text-slate-200 border border-white/10 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Consultation Mode */}
            <div className="bg-[#070b1e] rounded-2xl p-4 border border-white/10 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#ffd236]">
                  {lang === 'en' ? 'Consultation Mode & Timing' : lang === 'hi' ? 'परामर्श माध्यम एवं समय' : 'પરામર્શ માધ્યમ અને સમય'}
                </h5>
                <p className="text-xs text-slate-300 font-semibold mt-0.5">
                  {lang === 'en' ? selectedCity.consultationModesEn : lang === 'hi' ? selectedCity.consultationModesHi : selectedCity.consultationModesGu}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
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
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#f99c00]" />
                <span>
                  {lang === 'en' ? 'Specialized Astrological Services' : lang === 'hi' ? 'इस क्षेत्र हेतु प्रमुख सेवाएं' : 'આ વિસ્તાર માટે મુખ્ય સેવાઓ'}
                </span>
              </h4>

              <div className="space-y-2.5">
                {(lang === 'en' ? selectedCity.keyServicesEn : lang === 'hi' ? selectedCity.keyServicesHi : selectedCity.keyServicesGu).map((service, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#070b1e] border border-white/10 shadow-xs flex items-start gap-2.5 text-slate-200 font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-200 leading-snug">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-gradient-to-br from-[#070b1e] to-[#121b44] border border-amber-500/30 rounded-2xl p-5 text-slate-200 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#ffd236]" />
                <span className="font-yatra text-sm text-[#ffd236]">
                  {lang === 'en' ? 'Direct Guidance with Pandit Ji' : 'पंडित श्री विरेंद्र कुमार जोशी से सीधा विमर्श'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {lang === 'en'
                  ? 'Send your Birth Date, Time & City to receive verified horoscope analysis and authentic remedies.'
                  : 'अपनी जन्म तिथि, जन्म समय एवं जन्म स्थान भेजकर अपनी कुंडली का सटीक विश्लेषण व सरल शास्त्रोक्त उपाय प्राप्त करें।'}
              </p>

              <div>
                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className="w-full bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#e08b00] hover:to-[#e5a800] text-black font-extrabold py-2.5 px-3 rounded-xl text-xs sm:text-sm text-center shadow-md flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-black animate-pulse" />
                  <span>पंडित जी से सीधा संपर्क व परामर्श: {ASTROLOGER_INFO.phonePrimary}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Keywords Strip at bottom of card for SEO richness */}
        <div className="bg-[#070b1e] px-5 py-3 border-t border-white/10 flex items-center flex-wrap gap-2 text-[11px] text-slate-300">
          <span className="font-bold text-[#ffd236]">🔍 लोकप्रिय खोजें:</span>
          {selectedCity.popularSearchTerms.map((term, i) => (
            <span key={i} className="bg-[#0c1334] border border-white/10 px-2 py-0.5 rounded-md text-slate-300 font-medium">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* City-Wise Local SEO FAQ Accordion */}
      <div className="bg-[#0c1334] rounded-3xl border border-amber-500/20 p-6 sm:p-8 shadow-md">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="font-yatra text-xl sm:text-2xl royal-gold-gradient-text">
            {lang === 'en'
              ? 'Frequently Asked Questions by City & NRI Clients'
              : lang === 'hi'
              ? 'विभिन्न शहरों एवं NRI जातकों के अक्सर पूछे जाने वाले प्रश्न'
              : 'વિવિધ શહેરો અને NRI જાતકોના વારંવાર પૂછાતા પ્રશ્નો'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-medium">
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
                className="rounded-2xl border border-white/10 bg-[#070b1e] overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-200 hover:text-[#ffd236] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#ffd236] font-black">Q{index + 1}.</span>
                    <span>{question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#ffd236] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed border-t border-white/10 bg-[#0c1334]">
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
