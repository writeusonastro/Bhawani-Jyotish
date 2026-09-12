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
  initialCountry?: string;
  initialStateOrCity?: string;
}

export interface RegionHub {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  hubs: string;
  hubsHi: string;
  hubsGu: string;
  specialty: string;
  specialtyHi: string;
  specialtyGu: string;
  topQueries: string[];
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
  regions: RegionHub[];
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
    descriptionGu: 'ઉત્તર અમેરિકામાં વસતા 4,500+ ભારતીય અને ગુજરાતી પરિવારો દ્વારા અધિકૃત કુંડળી તેમજ લગ્ન ગુણ મિલન માટે વિશ્વસનીય.',
    regions: [
      {
        id: 'california',
        name: 'California (CA) - Bay Area & LA',
        nameHi: 'कैलिफोर्निया (सैन जोस, फ्रेमोंट, सैन फ्रांसिस्को, लॉस एंजिल्स)',
        nameGu: 'કેલિફોર્નિયા (સેન જોસ, ફ્રેમોન્ટ, સિલિકોન વેલી, એલ.એ.)',
        hubs: 'San Jose, Fremont, Sunnyvale, Santa Clara, San Francisco, Los Angeles, Irvine, San Diego',
        hubsHi: 'सैन जोस, फ्रेमोंट, सनीवेल, सांता क्लारा, सैन फ्रांसिस्को, लॉस एंजिल्स, इरविन',
        hubsGu: 'સેન જોસ, ફ્રેમોન્ટ, સનીવેલ, સાન્ટા ક્લેરા, સેન ફ્રાન્સિસ્કો, લોસ એન્જલસ',
        specialty: 'High-tech career astrology, H1B to Green Card transitions, Startup funding Muhurat & Child birth charts with PST DST correction.',
        specialtyHi: 'आईटी करियर ज्योतिष, H1B से ग्रीन कार्ड समयावधि, स्टार्टअप व व्यवसाय मुहूर्त, कैलिफोर्निया समयानुसार बालक जन्म कुंडली।',
        specialtyGu: 'ટેક કરિયર, H1B થી ગ્રીન કાર્ડ સમયાવધિ, સ્ટાર્ટઅપ મુહૂર્ત અને DST જન્મ કુંડળી.',
        topQueries: ['Indian Astrologer San Jose CA', 'Gujarati Astrologer Fremont CA', 'H1B Visa Astrology USA', 'Bay Area Kundli Matchmaking']
      },
      {
        id: 'new-jersey',
        name: 'New Jersey (NJ) & New York (NY)',
        nameHi: 'न्यू जर्सी एवं न्यूयॉर्क (एडिसन, इस्लिन, जर्सी सिटी, मैनहट्टन)',
        nameGu: 'ન્યૂ જર્સી અને ન્યૂયોર્ક (એડિસન, ઇસ્લિન, જર્સી સિટી, ક્વીન્સ)',
        hubs: 'Edison, Iselin (Oak Tree Rd), Jersey City, Woodbridge, Parsippany, Queens, Long Island, Manhattan',
        hubsHi: 'एडिसन, इस्लिन (ओक ट्री रोड), जर्सी सिटी, वुडब्रिज, पार्सिपनी, क्वींस, लॉन्ग आइलैंड',
        hubsGu: 'એડિસન, ઇસ્લિન, જર્સી સિટી, વુડબ્રિજ, પાર્સિપની, ક્વીન્સ, લોંગ આઇલેન્ડ',
        specialty: 'Traditional Gujarati family matchmaking (36 Gun Milan), Griha Pravesh Muhurat for NJ homes & Kaal Sarp / Manglik Dosh remedies.',
        specialtyHi: 'पारंपरिक गुजराती 36 गुण विवाह मिलान, गृह प्रवेश व व्यावसायिक वास्तु, मांगलिक व कालसर्प दोष निवारण।',
        specialtyGu: 'ગુજરાતી ૩૬ ગુણ લગ્ન મિલન, ગૃહ પ્રવેશ મુહૂર્ત અને માંગલિક દોષ નિવારણ.',
        topQueries: ['Best Indian Astrologer in Edison NJ', 'Gujarati Astrologer Oak Tree Rd Iselin', '36 Gun Milan New Jersey', 'Griha Pravesh Muhurat USA']
      },
      {
        id: 'texas',
        name: 'Texas (TX) - Dallas, Houston & Austin',
        nameHi: 'टेक्सास (डलास, इरविंग, प्लानो, ह्यूस्टन, ऑस्टिन)',
        nameGu: 'ટેક્સાસ (ડલાસ, ઇરવિંગ, પ્લાનો, હ્યુસ્ટન, ઓસ્ટિન)',
        hubs: 'Dallas, Irving, Plano, Frisco, Houston, Sugar Land, Austin, Round Rock',
        hubsHi: 'डलास, इरविंग, प्लानो, फ्रिस्को, ह्यूस्टन, शुगर लैंड, ऑस्टिन',
        hubsGu: 'ડલાસ, ઇરવિંગ, પ્લાનો, ફ્રિસ્કો, હ્યુસ્ટન, શુગર લેન્ડ, ઓસ્ટિન',
        specialty: 'Commercial business investment timing, residential Vastu for Texas ranches & family peace consultations.',
        specialtyHi: 'व्यापारिक निवेश मुहूर्त, आवासीय विला व कार्यालय वास्तु, पारिवारिक सुख-शांति एवं संतान जन्म पत्रिका।',
        specialtyGu: 'વ્યાપારિક રોકાણ મુહૂર્ત, ટેક્સાસ મકાન વાસ્તુ અને પરિવાર સુખ-શાંતિ.',
        topQueries: ['Indian Astrologer Dallas TX', 'Vedic Astrologer Houston Sugar Land', 'Astrologer in Plano Irving TX', 'USA Business Vastu']
      },
      {
        id: 'midwest',
        name: 'Illinois (IL), Georgia (GA) & East Coast',
        nameHi: 'इलिनोइस, जॉर्जिया एवं ईस्ट कोस्ट (शिकागो, अटलांटा, शार्लोट)',
        nameGu: 'ઇલિનોઇસ, જ્યોર્જિયા અને ઇસ્ટ કોસ્ટ (શિકાગો, એટલાન્ટા)',
        hubs: 'Chicago, Naperville, Schaumburg, Atlanta, Alpharetta, Charlotte, Raleigh-Durham, Seattle',
        hubsHi: 'शिकागो, नेपरविले, शाम्बर्ग, अटलांटा, अल्फाब्रेटा, शार्लोट, रॉले, सिएटल',
        hubsGu: 'શિકાગો, નેપરવિલ, એટલાન્ટા, આલ્ફારેટા, શાર્લોટ, સિએટલ',
        specialty: 'Career elevation, higher education decisions for overseas students & ancestral Pitru Dosh shanti.',
        specialtyHi: 'करियर पदोन्नति, उच्च शिक्षा मार्गदर्शन, साढ़ेसाती उपाय एवं पितृ दोष शांति अनुष्ठान।',
        specialtyGu: 'ઉચ્ચ અભ્યાસ, વિદેશ કરિયર અને સાડાસાતી શનિ ઉપાય.',
        topQueries: ['Indian Astrologer Chicago IL', 'Astrologer in Atlanta GA', 'Vedic Jyotish Seattle WA', 'USA Kundli Consultation']
      }
    ]
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
    descriptionGu: 'બ્રિટનના ગુજરાતી તેમજ ભારતીય સમાજ સાથે 35+ વર્ષોથી નિરંતર શાસ્ત્રોક્ત માર્ગદર્શન.',
    regions: [
      {
        id: 'greater-london',
        name: 'Greater London (Wembley, Harrow, Brent, Ilford)',
        nameHi: 'ग्रेटर लंदन (वेम्बली, हैरो, किंग्सबरी, ब्रेंट, इलफोर्ड)',
        nameGu: 'ગ્રેટર લંડન (વેમ્બલી, હેરો, કિંગ્સબરી, બ્રેન્ટ, ઇલફોર્ડ)',
        hubs: 'Wembley, Harrow, Kingsbury, Brent, Ealing, Ilford, Southall, Hounslow',
        hubsHi: 'वेम्बली, हैरो, किंग्सबरी, ब्रेंट, ईलिंग, इलफोर्ड, साउथहॉल, हाउंसलो',
        hubsGu: 'વેમ્બલી, હેરો, કિંગ્સબરી, બ્રેન્ટ, ઈલિંગ, ઇલફોર્ડ, સાઉથહોલ',
        specialty: '35+ years serving British Gujarati families; fluent Gujarati consultation, wedding compatibility & UK home Vastu.',
        specialtyHi: '35+ वर्षों से ब्रिटिश गुजराती परिवारों का विश्वास; शुद्ध गुजराती परामर्श, 36 गुण विवाह मिलान व वास्तु।',
        specialtyGu: 'બ્રિટિશ ગુજરાતી પરિવારો માટે ૩૬ ગુણ વિવાહ મિલન અને લંડન પ્રોપર્ટી વાસ્તુ.',
        topQueries: ['Gujarati Astrologer in Wembley London', 'Indian Astrologer Harrow UK', '36 Gun Milan UK London', 'Best Hindu Astrologer London']
      },
      {
        id: 'leicester-midlands',
        name: 'Leicester & West Midlands (Belgrave, Birmingham)',
        nameHi: 'लीसेस्टर एवं वेस्ट मिडलैंड्स (बेलग्रेव रोड, बर्मिंघम, कोवेंट्री)',
        nameGu: 'લિસેસ્ટર અને વેસ્ટ મિડલેન્ડ્સ (બેલગ્રેવ રોડ, બર્મિંગહામ)',
        hubs: 'Leicester (Belgrave Rd, Melton Rd, Oadby), Birmingham, Coventry, Wolverhampton',
        hubsHi: 'लीसेस्टर (बेलग्रेव रोड, मेल्टन रोड), बर्मिंघम, कोवेंट्री, वोल्वरहैम्प्टन',
        hubsGu: 'લિસેસ્ટર (બેલગ્રેવ રોડ, મેલ્ટન રોડ), બર્મિંગહામ, કોવેન્ટ્રી',
        specialty: 'Traditional Patidar & Gujarati matrimonial horoscope matching, retail business Muhurat & gemstone recommendation.',
        specialtyHi: 'पारंपरिक विवाह कुंडली मिलान, नाड़ी व भकूट दोष परिहार, व्यापारिक मुहूर्त व भाग्यशाली रत्न।',
        specialtyGu: 'પરંપરાગત વિવાહ મિલન, નાડી દોષ પરિહાર અને રત્ન ધારણ માર્ગદર્શન.',
        topQueries: ['Gujarati Astrologer Leicester Belgrave', 'Indian Astrologer Birmingham UK', 'Kundli Matchmaking Midlands UK', 'Leicester Hindu Jyotish']
      },
      {
        id: 'manchester-north',
        name: 'North England (Manchester, Bolton, Leeds)',
        nameHi: 'नॉर्थ इंग्लैंड (मैनचेस्टर, बोल्टन, प्रेस्टन, लीड्स)',
        nameGu: 'નોર્થ ઇંગ્લેન્ડ (માન્ચેસ્ટર, બોલ્ટન, લીડ્સ)',
        hubs: 'Manchester, Bolton, Preston, Leeds, Bradford, Newcastle',
        hubsHi: 'मैनचेस्टर, बोल्टन, प्रेस्टन, लीड्स, ब्रैडफोर्ड',
        hubsGu: 'માન્ચેસ્ટર, બોલ્ટન, પ્રેસ્ટન, લીડ્સ, બ્રેડફોર્ડ',
        specialty: 'Career guidance, commercial warehouse & restaurant Vastu, British Summer Time (BST) accurate birth charts.',
        specialtyHi: 'करियर विकास, रेस्तरां व व्यापारिक वास्तु, BST समय अनुसार सटीक जन्म कुंडली।',
        specialtyGu: 'કરિયર ગાઈડન્સ, કોમર્શિયલ વાસ્તુ અને BST સચોટ કુંડળી.',
        topQueries: ['Indian Astrologer Manchester', 'Vedic Astrologer Leeds UK', 'Astrologer Bolton Lancashire']
      }
    ]
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
    descriptionGu: 'ઓન્ટારિયો, અલ્બર્ટા અને બ્રિટિશ કોલંબિયાના પ્રવાસી ગુજરાતી પરિવારો માટે વિશેષ વૈદિક સમાધાન.',
    regions: [
      {
        id: 'gta-ontario',
        name: 'Greater Toronto Area (GTA - Brampton, Mississauga)',
        nameHi: 'ग्रेटर टोरंटो (ब्रैम्पटन, मिसिसॉगा, टोरंटो, मार्कहम)',
        nameGu: 'ગ્રેટર ટોરોન્ટો (બ્રેમ્પટન, મિસિસોગા, ટોરોન્ટો)',
        hubs: 'Toronto, Brampton, Mississauga, Markham, Vaughan, Scarborough, Oakville',
        hubsHi: 'टोरंटो, ब्रैम्पटन, मिसिसॉगा, मार्कहम, वॉन, स्कारबोरो, ओकविले',
        hubsGu: 'ટોરોન્ટો, બ્રેમ્પટન, મિસિસોગા, માર્ખમ, વૉન, સ્કારબરો',
        specialty: 'Permanent Residency (PR) astrological timing, 36 Gun Milan for cross-continental weddings, foreign child Janam Kundli with DST.',
        specialtyHi: 'कनाडा पीआर (PR) योग समयावधि, वर-वधू 36 गुण मिलान, कनाडा में जन्मे बच्चों की शुद्ध कुंडली।',
        specialtyGu: 'કેનેડા PR સમયાવધિ, ૩૬ ગુણ કુંડળી મિલન અને કેનેડા જન્મેલા બાળકોની કુંડળી.',
        topQueries: ['Indian Astrologer Brampton Ontario', 'Gujarati Astrologer Mississauga', 'Best Astrologer in Toronto GTA', 'Canada PR Astrology Timing']
      },
      {
        id: 'vancouver-bc',
        name: 'British Columbia (Vancouver, Surrey, Richmond)',
        nameHi: 'ब्रिटिश कोलंबिया (वैंकूवर, सरे, रिचमंड, बर्नबी)',
        nameGu: 'બ્રિટિશ કોલંબિયા (વાનકુવર, સરે, રિચમંડ)',
        hubs: 'Vancouver, Surrey, Richmond, Burnaby, Abbotsford, New Westminster',
        hubsHi: 'वैंकूवर, सरे, रिचमंड, बर्नबी, एबॉट्सफोर्ड',
        hubsGu: 'વાનકુવર, સરે, રિચમંડ, બર્નબી, એબટ્સફોર્ડ',
        specialty: 'PST timezone convenient appointments, family compatibility, overseas business growth & peaceful home Vastu.',
        specialtyHi: 'सरे व वैंकूवर के परिवारों हेतु शाम के अनुकूल समय पर परामर्श, व्यापार वृद्धि व घर का वास्तु।',
        specialtyGu: 'સરે અને વાનકુવર પરિવારો માટે અનુકૂળ પરામર્શ, વ્યાપાર વૃદ્ધિ અને વાસ્તુ.',
        topQueries: ['Indian Astrologer Surrey BC', 'Vedic Astrologer Vancouver', 'Kundli Matchmaking British Columbia']
      },
      {
        id: 'alberta',
        name: 'Alberta (Calgary, Edmonton)',
        nameHi: 'अलबर्टा (कैलगरी, एडमॉन्टन)',
        nameGu: 'અલ્બર્ટા (કેલગરી, એડમોન્ટન)',
        hubs: 'Calgary, Edmonton, Red Deer, Lethbridge',
        hubsHi: 'कैलगरी, एडमॉन्टन, रेड डियर',
        hubsGu: 'કેલગરી, એડમોન્ટન',
        specialty: 'Job stability in energy & engineering sectors, matrimonial kundli & Sade Sati remedies.',
        specialtyHi: 'करियर स्थिरता, विवाह कुंडली मिलान, साढ़ेसाती शनि शांति एवं रुद्राक्ष मार्गदर्शन।',
        specialtyGu: 'કરિયર સ્થિરતા, લગ્ન કુંડળી અને શનિ ઉપાય.',
        topQueries: ['Indian Astrologer Calgary Alberta', 'Vedic Jyotish Edmonton', 'Canada Kundli Matching']
      }
    ]
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
    descriptionGu: 'સિડની, મેલબોર્ન અને ઓકલેન્ડ ટાઈમઝોન અનુસાર સાંજના તેમજ રવિવારના વિશેષ સ્લોટ્સ.',
    regions: [
      {
        id: 'sydney-nsw',
        name: 'New South Wales (Sydney - Parramatta, Harris Park)',
        nameHi: 'न्यू साउथ वेल्स (सिडनी - पैरामाटा, हैरिस पार्क, ब्लैकटाउन)',
        nameGu: 'ન્યૂ સાઉથ વેલ્સ (સિડની - પેરામાટા, હેરિસ પાર્ક)',
        hubs: 'Sydney, Parramatta, Harris Park, Westmead, Blacktown, Strathfield, Liverpool',
        hubsHi: 'सिडनी, पैरामाटा, हैरिस पार्क, वेस्टमीड, ब्लैकटाउन, स्ट्रैथफील्ड',
        hubsGu: 'સિડની, પેરામાટા, હેરિસ પાર્ક, વેસ્ટમીડ, બ્લેકટાઉન',
        specialty: 'Southern Hemisphere planetary calculation, PR Visa grant astrological timing & 36 Gun Milan.',
        specialtyHi: 'दक्षिणी गोलार्ध (Southern Hemisphere) सटीक लग्न चक्र, PR वीजा स्वीकृति योग एवं 36 गुण मिलान।',
        specialtyGu: 'દક્ષિણ ગોળાર્ધ સચોટ લગ્ન ગણતરી, PR વિઝા સમય અને લગ્ન મિલન.',
        topQueries: ['Indian Astrologer Sydney Parramatta', 'Best Astrologer Harris Park Sydney', '36 Gun Milan Australia', 'Vedic Astrologer NSW']
      },
      {
        id: 'melbourne-vic',
        name: 'Victoria (Melbourne - Tarneit, Point Cook, Werribee)',
        nameHi: 'विक्टोरिया (मेलबर्न - टारनेट, पॉइंट कुक, वेरिबी, डैंडेनॉन्ग)',
        nameGu: 'વિક્ટોરિયા (મેલબોર્ન - ટારનેટ, પોઈન્ટ કુક, વેરીબી)',
        hubs: 'Melbourne, Tarneit, Point Cook, Werribee, Craigieburn, Dandenong, Clayton',
        hubsHi: 'मेलबर्न, टारनेट, पॉइंट कुक, वेरिबी, क्रेगीबर्न, डैंडेनॉन्ग',
        hubsGu: 'મેલબોર્ન, ટારનેટ, પોઈન્ટ કુક, વેરીબી, ક્રેગીબર્ન',
        specialty: 'New home purchase Griha Pravesh Vastu, marital harmony, children education horoscope & Navagraha Upay.',
        specialtyHi: 'मेलबर्न में नए घर का गृह प्रवेश वास्तु, पारिवारिक सुख, संतान विद्या योग एवं नवग्रह उपाय।',
        specialtyGu: 'મેલબોર્ન નવા ઘરનું ગૃહ પ્રવેશ વાસ્તુ, પારિવારિક સુખ અને નવગ્રહ ઉપાય.',
        topQueries: ['Indian Astrologer Melbourne Tarneit', 'Vedic Astrologer Point Cook', 'Best Indian Astrologer Melbourne', 'Australia Griha Pravesh Vastu']
      },
      {
        id: 'brisbane-perth-nz',
        name: 'Brisbane, Perth & New Zealand (Auckland)',
        nameHi: 'ब्रिस्बेन, पर्थ एवं न्यूजीलैंड (ऑकलैंड, वेलिंगटन)',
        nameGu: 'બ્રિસ્બેન, પર્થ અને ન્યુઝીલેન્ડ (ઓકલેન્ડ)',
        hubs: 'Brisbane, Gold Coast, Perth, Adelaide, Auckland (Mount Roskill, Papatoetoe), Wellington',
        hubsHi: 'ब्रिस्बेन, गोल्ड कोस्ट, पर्थ, एडिलेड, ऑकलैंड, वेलिंगटन',
        hubsGu: 'બ્રિસ્બેન, પર્થ, એડિલેડ, ઓકલેન્ડ, વેલિંગ્ટન',
        specialty: 'Mining & IT career predictions, business partnerships & overseas family prosperity.',
        specialtyHi: 'करियर मार्गदर्शन, साझेदारी व्यापार मुहूर्त एवं विदेशी धरती पर पारिवारिक समृद्धि।',
        specialtyGu: 'કરિયર માર્ગદર્શન, બિઝનેસ પાર્ટનરશિપ અને સમૃદ્ધિ.',
        topQueries: ['Indian Astrologer Brisbane', 'Indian Astrologer Perth WA', 'Best Astrologer Auckland New Zealand']
      }
    ]
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
    descriptionGu: 'ભારતથી માત્ર 1.5 કલાકનો સમય તફાવત હોવાથી ગલ્ફ નિવાસીઓ માટે તુરંત પરામર્શ ઉપલબ્ધ.',
    regions: [
      {
        id: 'dubai-metro',
        name: 'Dubai (Bur Dubai, Karama, Deira, Marina, Business Bay)',
        nameHi: 'दुबई (बुर दुबई, करामा, डेरा, बिजनेस बे, दुबई मरीना)',
        nameGu: 'દુબઈ (બુર દુબઈ, કરામા, દેરા, બિઝનેસ બે)',
        hubs: 'Bur Dubai, Karama, Deira, Al Nahda, Business Bay, Dubai Marina, JLT',
        hubsHi: 'बुर दुबई, करामा, डेरा, अल नहदा, बिजनेस बे, दुबई मरीना',
        hubsGu: 'બુર દુબઈ, કરામા, દેરા, અલ નહદા, બિઝનેસ બે',
        specialty: 'LLC business partnership compatibility, Gold Souk & trade Muhurat, commercial showroom Vastu.',
        specialtyHi: 'पार्टनरशिप व्यापार कुंडली मिलान, गोल्ड व कमर्शियल ट्रेड मुहूर्त, शोरूम व कार्यालय वास्तु।',
        specialtyGu: 'પાર્ટનરશિપ બિઝનેસ કુંડળી, ટ્રેડિંગ મુહૂર્ત અને દુબઈ ઓફિસ વાસ્તુ.',
        topQueries: ['Best Indian Astrologer in Dubai', 'Gujarati Astrologer Bur Dubai Karama', 'Business Astrologer Dubai UAE', 'Vastu Consultant Dubai']
      },
      {
        id: 'abu-dhabi-sharjah',
        name: 'Abu Dhabi, Sharjah & Northern Emirates',
        nameHi: 'अबू धाबी, शारजाह एवं अजमान',
        nameGu: 'અબુ ધાબી, શારજાહ અને અજમાન',
        hubs: 'Abu Dhabi (Electra St, Hamdan St), Sharjah (Al Majaz, Rolla), Ajman, Ras Al Khaimah',
        hubsHi: 'अबू धाबी, शारजाह (अल मजाज, रोला), अजमान, रस अल खैमाह',
        hubsGu: 'અબુ ધાબી, શારજાહ, અજમાન',
        specialty: 'Job security, promotional timing, family stability & remote Vedic puja sankalp.',
        specialtyHi: 'नौकरी में स्थिरता व पदोन्नति, पारिवारिक सुख एवं भारत के तीर्थों पर संकल्प पूजा।',
        specialtyGu: 'નોકરીમાં સ્થિરતા, પ્રમોશન અને તીર્થ સંકલ્પ પૂજા.',
        topQueries: ['Indian Astrologer Abu Dhabi', 'Best Astrologer in Sharjah', 'Vedic Astrology UAE']
      },
      {
        id: 'gulf-cooperation',
        name: 'Doha (Qatar), Muscat (Oman), Kuwait, Bahrain & Saudi',
        nameHi: 'दोहा (कतर), मस्कट (ओमान), कुवैत, बहरीन एवं सऊदी अरब',
        nameGu: 'દોહા (કતર), મસ્કત (ઓમાન), કુવૈત, બહરીન',
        hubs: 'Doha, Muscat, Kuwait City, Manama, Riyadh, Jeddah',
        hubsHi: 'दोहा, मस्कट, कुवैत सिटी, मनामा, रियाद, जेद्दा',
        hubsGu: 'દોહા, મસ્કત, કુવૈત સિટી, મનામા, રિયાધ',
        specialty: 'Overseas savings accumulation, family protection remedies & marriage matching.',
        specialtyHi: 'विदेशी धन संचय, पारिवारिक सुरक्षा हेतु ग्रह शांति एवं वर-वधू कुंडली मिलान।',
        specialtyGu: 'ધન સંચય, ગ્રહ શાંતિ અને વિવાહ કુંડળી મિલન.',
        topQueries: ['Indian Astrologer in Qatar', 'Vedic Astrologer Oman Muscat', 'Astrologer in Kuwait']
      }
    ]
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
    descriptionGu: 'દક્ષિણ-પૂર્વ એશિયામાં વસતા ગુજરાતી પરિવારો માટે વૈદિક જ્યોતિષ તેમજ રત્ન માર્ગદર્શન.',
    regions: [
      {
        id: 'singapore-city',
        name: 'Singapore (Little India, Serangoon, Tampines)',
        nameHi: 'सिंगापुर (लिटिल इंडिया, सेरांगून, टाम्पाइन्स)',
        nameGu: 'સિંગાપોર (લિટલ ઇન્ડિયા, સેરાંગૂન)',
        hubs: 'Little India, Serangoon Rd, Tampines, Jurong East, Woodlands, Katong',
        hubsHi: 'लिटिल इंडिया, सेरांगून रोड, टाम्पाइन्स, जुरोंग ईस्ट',
        hubsGu: 'લિટલ ઇન્ડિયા, સેરાંગૂન રોડ, ટેમ્પાઇન્સ',
        specialty: 'Financial market timing, high-frequency banking career guidance, 36 Gun Milan & condo Vastu audit.',
        specialtyHi: 'फाइनेंशियल बैंकिंग करियर, शेयर मार्केट समय, 36 गुण विवाह मिलान व कोंडो वास्तु।',
        specialtyGu: 'બેન્કિંગ કરિયર, ૩૬ ગુણ લગ્ન મિલન અને એપાર્ટમેન્ટ વાસ્તુ.',
        topQueries: ['Indian Astrologer Singapore', 'Vedic Astrologer Little India Singapore', 'Kundli Matching Singapore']
      }
    ]
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
    descriptionGu: 'જર્મની, નેધરલેન્ડ્સ, સ્વિટ્ઝર્લેન્ડ અને આયર્લેન્ડમાં વસતા ભારતીય પરિવારો માટે સચોટ માર્ગદર્શન.',
    regions: [
      {
        id: 'germany-eu',
        name: 'Germany (Frankfurt, Munich, Berlin) & Netherlands',
        nameHi: 'जर्मनी (फ्रैंकफर्ट, म्यूनिख, बर्लिन) एवं नीदरलैंड्स (एम्स्टर्डम)',
        nameGu: 'જર્મની (ફ્રેન્કફર્ટ, મ્યુનિક) અને નેધરલેન્ડ્સ',
        hubs: 'Frankfurt, Munich, Berlin, Stuttgart, Amsterdam, Eindhoven, Zurich, Dublin',
        hubsHi: 'फ्रैंकफर्ट, म्यूनिख, बर्लिन, स्टटगार्ट, एम्स्टर्डम, ज्यूरिख, डबलिन',
        hubsGu: 'ફ્રેન્કફર્ટ, મ્યુનિક, બર્લિન, એમ્સ્ટરડેમ, ઝ્યુરિખ',
        specialty: 'EU Blue Card to permanent residency timing, European Summer Time birth chart calculations & marriage compatibility.',
        specialtyHi: 'EU ब्लू कार्ड व स्थायी निवास योग, यूरोपीय समर टाइम अनुसार शुद्ध कुंडली एवं विवाह मिलान।',
        specialtyGu: 'EU બ્લુ કાર્ડ સમયાવધિ, સમર ટાઈમ કુંડળી અને વિવાહ મિલન.',
        topQueries: ['Indian Astrologer Frankfurt Germany', 'Vedic Astrologer Munich', 'Indian Astrologer Amsterdam Netherlands', 'EU Kundli Matchmaking']
      }
    ]
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
    descriptionGu: 'સાઉથ આફ્રિકા અને પૂર્વ આફ્રિકામાં પેઢીઓથી વસતા ગુજરાતી પરિવારોનો અખંડ વિશ્વાસ.',
    regions: [
      {
        id: 'south-africa-hubs',
        name: 'South Africa (Durban, Johannesburg, Lenasia, Cape Town)',
        nameHi: 'साउथ अफ्रीका (डरबन, जोहान्सबर्ग, लेनासिया, केप टाउन)',
        nameGu: 'દક્ષિણ આફ્રિકા (ડર્બન, જોહાનિસબર્ગ, લેનાસિયા)',
        hubs: 'Durban, Johannesburg, Lenasia, Laudium (Pretoria), Cape Town, Nairobi',
        hubsHi: 'डरबन, जोहान्सबर्ग, लेनासिया, प्रिटोरिया, केप टाउन, नैरोबी',
        hubsGu: 'ડર્બન, જોહાનિસબર્ગ, લેનાસિયા, કેપ ટાઉન',
        specialty: 'Ancestral Gujarati root connections, Pitru Dosh Shanti on sacred Narmada & Pushkar tirthas, commercial prosperity.',
        specialtyHi: 'पैतृक परंपरा अनुसार कुंडली विचार, नर्मदा व पुष्कर तीर्थ पर पितृ शांति, व्यापारिक सुरक्षा व समृद्धि।',
        specialtyGu: 'પિતૃ દોષ શાંતિ, નર્મદા તીર્થ સંકલ્પ અને વ્યાપાર સમૃદ્ધિ.',
        topQueries: ['Gujarati Astrologer Durban South Africa', 'Indian Astrologer Johannesburg Lenasia', 'Vedic Astrologer South Africa']
      }
    ]
  }
];

const INTERNATIONAL_FAQS = [
  {
    qEn: 'Can Pandit Ji help with US H1B Visa, Green Card delays, or overseas career stability?',
    qHi: 'क्या पंडित जी यूएस H1B वीजा, ग्रीन कार्ड विलंब अथवा विदेशी करियर स्थिरता में मार्गदर्शन करते हैं?',
    qGu: 'શું પંડિતજી US H1B વિઝા, ગ્રીન કાર્ડ વિલંબ કે વિદેશી કરિયર સ્થિરતામાં માર્ગદર્શન આપે છે?',
    aEn: 'Yes, absolutely. In Vedic astrology, overseas travel and settlement are governed by the 9th, 12th, and 8th houses, along with Rahu and Jupiter dasa periods. Pt. Virendra Kumar Joshi analyzes your D-1 (Lagna), D-9 (Navamsha), and D-10 (Dasamsha) charts to calculate exact favorable transit periods (Gochar) for visa approvals, job transitions, and legal status stability, prescribing proven Vedic remedies.',
    aHi: 'हाँ, शत-प्रतिशत। वैदिक ज्योतिष में विदेश वास एवं स्थायित्व नवम, द्वादश एवं अष्टम भाव तथा राहु व गुरु की दशा-अंतर्दशा से निर्धारित होता है। पंडित जी लग्न चक्र, नवमांश तथा दशमांश (D-10) का सूक्ष्म अध्ययन कर वीजा स्वीकृति, ग्रीन कार्ड एवं पदोन्नति का सटीक समय निर्धारित करते हैं और ग्रह शांति उपाय बताते हैं।',
    aGu: 'હા, ચોક્કસપણે. કુંડળીના ૯મા અને ૧૨મા ભાવ તથા રાહુ-ગુરુની દશા પરથી વિઝા, ગ્રીન કાર્ડ અને કરિયર સ્થિરતાનો ચોક્કસ સમય નક્કી કરી શાસ્ત્રોક્ત ઉપાય જણાવવામાં આવે છે.'
  },
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
    qEn: 'How does 36 Gun Milan matchmaking work when the bride and groom live in different countries?',
    qHi: 'वर-वधू अलग-अलग देशों में हों तो 36 गुण विवाह मिलान कैसे किया जाता है?',
    qGu: 'વર-કન્યા અલગ-અલગ દેશોમાં હોય ત્યારે 36 ગુણ વિવાહ મિલન કેવી રીતે થાય છે?',
    aEn: 'We calculate both birth charts with their respective local birth coordinates and timezones, analyzing Ashtakoota 36 Guna, Manglik Dosha, Bhakoot, Nadi Dosha, and 7th/8th house longevity to give a definitive written report and personalized video explanation.',
    aHi: 'दोनों के जन्म स्थान, स्थानीय समय एवं DST के अनुसार सटीक कुंडली बनाकर अष्टकूट 36 गुण, मांगलिक दोष, भकूट, नाड़ी दोष एवं सप्तम भाव का सूक्ष्म विश्लेषण किया जाता है और विस्तृत रिपोर्ट WhatsApp पर दी जाती है।',
    aGu: 'બંનેના જન્મ સ્થળ અને ટાઈમઝોન અનુસાર સચોટ કુંડળી બનાવી અષ્ટકૂટ 36 ગુણ, માંગલિક દોષ, નાડી દોષ અને લગ્ન જીવનનું સંપૂર્ણ વિશ્લેષણ કરી વિગતવાર રિપોર્ટ અપાય છે.'
  },
  {
    qEn: 'Can we perform remote Vedic Puja Sankalp or Anushthan while residing abroad?',
    qHi: 'क्या विदेश में रहते हुए भारत के पवित्र तीर्थों पर संकल्प पूजा व अनुष्ठान कराया जा सकता है?',
    qGu: 'શું વિદેશમાં રહેતાં ભારતનાં પવિત્ર તીર્થો પર સંકલ્પ પૂજા કરાવી શકાય?',
    aEn: 'Yes. Pandit Shri Virendra Kumar Joshi conducts sacred Vedic Anushthan (Kaal Sarp Dosh Shanti, Pitra Dosh Tarpan, Mangal Dosh Nivaran, Maha Mrityunjaya Jaap) on behalf of overseas devotees by taking your Gotra, Name, and Nakshatra Sankalp over live video call on holy tirthas like Siddhpur, Somnath, and Ujjain.',
    aHi: 'हाँ। सिद्धपुर पाटन (मातृ-गया), सोमनाथ, उज्जैन अथवा ओंकारेश्वर जैसे पावन तीर्थों पर आपके नाम, गोत्र व नक्षत्र का लाइव वीडियो संकल्प लेकर पंडित जी द्वारा शास्त्रोक्त विधि से कालसर्प, पितृ दोष, महामृत्युंजय व नवग्रह शांति पूजा संपन्न कराई जाती है।',
    aGu: 'હા. સિદ્ધપુર, સોમનાથ અથવા ઉજ્જૈન જેવા પવિત્ર તીર્થો પર તમારા નામ-ગોત્રનો સંકલ્પ લઈને શાસ્ત્રોક્ત વિધિથી કાલસર્પ, પિતૃદોષ અને નવગ્રહ શાંતિ પૂજા સંપન્ન કરાય છે.'
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
  }
];

export const InternationalConsultation: React.FC<InternationalConsultationProps> = ({ 
  lang,
  initialCountry,
  initialStateOrCity
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    if (initialCountry) {
      const match = COUNTRIES.find(c => c.code.toLowerCase() === initialCountry.toLowerCase());
      if (match) return match.code;
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const countryParam = params.get('country')?.toLowerCase();
      if (countryParam === 'usa' || countryParam === 'us') return 'US';
      if (countryParam === 'uk' || countryParam === 'gb') return 'GB';
      if (countryParam === 'canada' || countryParam === 'ca') return 'CA';
      if (countryParam === 'australia' || countryParam === 'au') return 'AU';
      if (countryParam === 'uae' || countryParam === 'ae' || countryParam === 'dubai') return 'AE';
      if (countryParam === 'singapore' || countryParam === 'sg') return 'SG';
      if (countryParam === 'germany' || countryParam === 'de') return 'DE';
      if (countryParam === 'south-africa' || countryParam === 'za') return 'ZA';
      if (countryParam === 'new-zealand' || countryParam === 'nz') return 'AU';
    }
    return 'US';
  });

  const [activeRegionId, setActiveRegionId] = useState<string | null>(() => {
    return initialStateOrCity || null;
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeInfo = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  const getWhatsAppInternationalLink = (countryName: string, subRegion?: string) => {
    const locationStr = subRegion ? `${subRegion}, ${countryName}` : countryName;
    const text = encodeURIComponent(
      `🙏 प्रणाम पंडित जी! मैं ${locationStr} से संपर्क कर रहा/रही हूँ। मुझे ऑनलाइन वैदिक जन्म कुंडली / 36 गुण विवाह मिलान परामर्श हेतु समय (Appointment) प्राप्त करना है। कृपया मार्गदर्शन प्रदान करें। (Reference: bhawanijyotish.online)`
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

        {/* State / Province / Regional Direct Consultation Hubs */}
        {activeInfo.regions && activeInfo.regions.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FF671F]/20 shadow-md mb-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF671F]" />
                <h3 className="font-yatra text-xl sm:text-2xl text-stone-950">
                  {lang === 'en'
                    ? `${activeInfo.name} - State & Metro Vedic Hubs`
                    : lang === 'hi'
                    ? `${activeInfo.nameHi} - राज्य व प्रमुख शहर डायरेक्ट सेवा केंद्र`
                    : `${activeInfo.nameGu} - પ્રદેશવાર જ્યોતિષ સેવા કેન્દ્રો`}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#CC5218] bg-[#FFF5F0] px-3 py-1 rounded-full border border-[#FF671F]/30">
                {lang === 'en' ? 'Hyperlocal Vedic Guidance' : 'स्थानीय समयानुसार परामर्श'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeInfo.regions.map((region) => {
                const isRegionActive = activeRegionId === region.id;
                return (
                  <div
                    key={region.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isRegionActive
                        ? 'border-[#FF671F] bg-[#FFF8F4] shadow-md'
                        : 'border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm sm:text-base text-stone-950">
                        {lang === 'en' ? region.name : lang === 'hi' ? region.nameHi : region.nameGu}
                      </h4>
                    </div>

                    <p className="text-xs text-stone-700 mb-2 leading-relaxed">
                      <strong className="text-stone-900 font-semibold">{lang === 'en' ? 'Cities:' : 'शहर:'} </strong>
                      {lang === 'en' ? region.hubs : lang === 'hi' ? region.hubsHi : region.hubsGu}
                    </p>

                    <p className="text-xs text-stone-800 font-medium mb-3 bg-white p-2.5 rounded-xl border border-stone-100">
                      <Sparkles className="w-3.5 h-3.5 inline text-amber-600 mr-1" />
                      {lang === 'en' ? region.specialty : lang === 'hi' ? region.specialtyHi : region.specialtyGu}
                    </p>

                    {/* Regional keywords badges for SEO */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {region.topQueries.map((q, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200"
                        >
                          {q}
                        </span>
                      ))}
                    </div>

                    <a
                      href={getWhatsAppInternationalLink(activeInfo.name, region.name.split('(')[0].trim())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2 px-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en'
                          ? `Book for ${region.name.split('(')[0].trim()}`
                          : `परामर्श लें (${region.name.split('(')[0].trim()})`}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5 Specialized Abroad Vedic Services Grid */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FF671F]/20 shadow-md mb-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h3 className="font-yatra text-xl sm:text-2xl text-stone-950">
              {lang === 'en'
                ? 'Core Vedic Solutions Tailored for NRIs Abroad'
                : lang === 'hi'
                ? 'विदेश में बसे भारतीयों हेतु 5 विशिष्ट शास्त्रोक्त समाधान'
                : 'વિદેશ વસતા પરિવારો માટે ૫ વિશેષ વૈદિક સમાધાન'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              {lang === 'en'
                ? 'Combining traditional Parashari principles with modern timezone precision for accurate life guidance.'
                : 'पाराशर ऋषि परंपरा एवं आधुनिक समय-गणित का समन्वय, जिससे विदेश में भी प्राप्त हो शत-प्रतिशत प्रामाणिक फलकथन।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#CC5218] font-bold text-lg mb-3">
                🛂
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950 mb-1.5">
                {lang === 'en' ? 'H1B Visa, PR & Career Settlement' : 'वीजा, PR एवं विदेशी नागरिकता योग'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'en'
                  ? 'Analyze 9th & 12th houses, Rahu-Jupiter transits, and D-10 Dasamsha chart to determine precise timing for US H1B approvals, Canada PR, UK Work Visa, and foreign job changes.'
                  : 'नवम व द्वादश भाव, राहु-गुरु गोचर एवं दशमांश चक्र के विश्लेषण द्वारा वीजा स्वीकृति, पीआर प्राप्ति, ग्रीन कार्ड एवं नौकरी परिवर्तन का सटीक समय निर्धारण।'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#CC5218] font-bold text-lg mb-3">
                💍
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950 mb-1.5">
                {lang === 'en' ? 'Cross-Continental 36 Gun Milan' : 'अंतर्राष्ट्रीय 36 गुण विवाह मिलान'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'en'
                  ? 'Accurate matchmaking across different continents and timezones. Detailed analysis of Ashtakoota points, Manglik Dosh, Nadi Dosh, and 7th house marital compatibility.'
                  : 'विभिन्न देशों व टाइमज़ोन में रहने वाले वर-वधू का अष्टकूट 36 गुण मिलान, नाड़ी दोष, भकूट विचार एवं सप्तम भाव से दांपत्य सुख का विस्तृत शास्त्रोक्त विश्लेषण।'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#CC5218] font-bold text-lg mb-3">
                👶
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950 mb-1.5">
                {lang === 'en' ? 'Foreign Birth DST Lagna Rectification' : 'विदेश में जन्मे बालकों की शुद्ध कुंडली'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'en'
                  ? 'Exact mathematical correction for Daylight Saving Time (DST) and Local Mean Time (LMT) ensuring correct Ascendant (Lagna) and Nakshatra for children born overseas.'
                  : 'अमेरिका, कनाडा, ब्रिटेन में जन्मे बच्चों के जन्म समय में डेलाइट सेविंग (DST) का वैज्ञानिक समायोजन कर शत-प्रतिशत शुद्ध लग्न चक्र, नक्षत्र चरण व नामकरण अक्षर।'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#CC5218] font-bold text-lg mb-3">
                🏡
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950 mb-1.5">
                {lang === 'en' ? 'Remote Property & Commercial Vastu' : 'विदेशी मकान व व्यापारिक वास्तु ऑडिट'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'en'
                  ? 'Digital evaluation of architectural floor plans for houses, condominiums, retail shops, and offices in USA, Canada, UK, and UAE without demolition.'
                  : 'विदेश में खरीदे जा रहे घर, विला, कोंडो अथवा व्यावसायिक स्टोर के फ्लोर प्लान का वास्तु निरीक्षण एवं बिना तोड़-फोड़ के प्रभावी वैदिक ऊर्जा संतुलन उपाय।'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#CC5218] font-bold text-lg mb-3">
                🪔
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950 mb-1.5">
                {lang === 'en' ? 'Distant Vedic Puja Sankalp at Tirthas' : 'तीर्थों पर दूरस्थ संकल्प पूजा व शांति'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'en'
                  ? 'Participate remotely via video sankalp for Kaal Sarp Dosh Shanti, Pitra Dosh Tarpan, and Navagraha Homa performed at sacred Indian pilgrimage sites.'
                  : 'सिद्धपुर (मातृ-गया), सोमनाथ, महाकालेश्वर उज्जैन तीर्थ पर आपके नाम-गोत्र से लाइव वीडियो कॉल संकल्प द्वारा कालसर्प, पितृ दोष व नवग्रह अनुष्ठान।'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 bg-[#FFFDF9] hover:border-[#FF671F]/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#CC5218] font-bold text-lg mb-3">
                🗣️
              </div>
              <h4 className="font-bold text-sm sm:text-base text-stone-950 mb-1.5">
                {lang === 'en' ? 'Native Gujarati & Hindi Family Counsel' : 'मातृभाषा गुजराती व हिंदी में आत्मीय चर्चा'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'en'
                  ? 'Direct discussion with family elders in fluent Gujarati or Hindi. No hurry, empathetic listening, and practical Vedic remedies.'
                  : 'परिवार के वरिष्ठ सदस्यों के साथ शुद्ध गुजराती अथवा हिंदी में पूर्ण आत्मीयता से चर्चा। बिना किसी जल्दबाजी के गहन समस्या समाधान व जीवन मार्गदर्शन।'}
              </p>
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
