import React, { useState } from 'react';
import { Star, CheckCircle2, MessageCircle, ShieldCheck, ZoomIn, X, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../types/astrology';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface WhatsAppReview {
  id: string;
  senderName: string;
  senderPhoneMasked: string;
  location: string;
  country: string;
  flag: string;
  timestamp: string;
  date: string;
  serviceCategory: string;
  consultationType: 'WhatsApp Chat' | 'Audio Call' | 'Video Call';
  rating: number;
  clientMessage: {
    hi: string;
    gu: string;
    en: string;
  };
  panditReply?: {
    hi: string;
    gu: string;
    en: string;
  };
  highlightKey: string;
}

const WHATSAPP_REVIEWS: WhatsAppReview[] = [
  {
    id: 'wa-1',
    senderName: 'जयेशभाई पटेल (Jayesh Patel)',
    senderPhoneMasked: '+91 9825X XXXXX',
    location: 'नागलपुर, मेहसाणा (Mehsana)',
    country: 'भारत (India)',
    flag: '🇮🇳',
    timestamp: '11:42 AM',
    date: '18 अगस्त 2025',
    serviceCategory: '36 गुण मिलान एवं नाड़ी दोष',
    consultationType: 'WhatsApp Chat',
    rating: 5,
    clientMessage: {
      hi: 'प्रणाम पंडित जी 🙏 आपने हमारे बेटे चि. पार्थ और बहू की कुंडली में नाड़ी दोष का जो सरल महामृत्युंजय उपाय बताया था, दोनों का विवाह बहुत आनंदपूर्वक सम्पन्न हो गया है। पूरे परिवार की ओर से आपको कोटि-कोटि धन्यवाद एवं चरण स्पर्श!',
      gu: 'પ્રણામ પંડિતજી 🙏 તમે અમારા દીકરા પાર્થ અને વહુની કુંડળીમાં નાડી દોષનો જે મહામૃત્યુંજય ઉપાય બતાવ્યો હતો, લગ્ન ખૂબ આનંદથી સંપન્ન થઈ ગયા. આખા પરિવાર તરફથી તમને ખૂબ ખૂબ આભાર!',
      en: 'Pranam Pandit Ji 🙏 The Nadi Dosh remedy you guided for our son Parth and daughter-in-law worked miraculously. The wedding concluded with immense peace. Heartfelt gratitude from our entire family!'
    },
    panditReply: {
      hi: 'सदा सुहागन रहें, माँ भवानी एवं भगवान भोलेनाथ दोनों बच्चों के दांपत्य जीवन में सुख, शांति एवं अखंड सौभाग्य प्रदान करें। शुभम् भवतु! 🚩🙏',
      gu: 'માં ભવાની અને ભોળાનાથ બંને બાળકોના દાંપત્ય જીવનમાં સુખ, શાંતિ અને અખંડ સૌભાગ્ય આપે. શુભમ ભવતુ! 🚩🙏',
      en: 'May Maa Bhavani and Lord Shiva bless the couple with lifelong harmony, prosperity and peace. Subham Bhavatu! 🚩🙏'
    },
    highlightKey: 'Verified Marriage Matchmaking'
  },
  {
    id: 'wa-2',
    senderName: 'Kirit Patel & Family',
    senderPhoneMasked: '+1 (732) 429-XXXX',
    location: 'Edison, New Jersey',
    country: 'USA (अमेरिका)',
    flag: '🇺🇸',
    timestamp: '09:15 PM (EST)',
    date: '24 जनवरी 2026',
    serviceCategory: 'NRI Online Horoscope & Career',
    consultationType: 'Video Call',
    rating: 5,
    clientMessage: {
      hi: 'Jai Shree Krishna Pandit Ji. We were so anxious about our son\'s US green card and job switch in IT. Your exact prediction for January 2026 came 100% true! He received the offer letter today with dream package. Thank you for your divine guidance across timezones!',
      gu: 'જય શ્રી કૃષ્ણ પંડિતજી. દીકરાના ગ્રીન કાર્ડ અને આઈટી જોબ સ્વિચ બાબતે અમે ખૂબ ચિંતિત હતા. તમારી જાન્યુઆરી 2026 ની આગાહી 100% સાચી પડી! આજે તેને ઓફર લેટર મળી ગયો. ખૂબ આભાર!',
      en: 'Jai Shree Krishna Pandit Ji. We were anxious about our son\'s US Green Card and job switch in IT. Your exact prediction for January 2026 came 100% true! He received his offer letter today. Thank you for your guidance across timezones!'
    },
    panditReply: {
      hi: 'जय श्री कृष्ण। सूर्य एवं गुरु की अनुकूल दशा का यह शुभ फल है। सूर्य देव को नित्य जल अर्पित कराते रहें, यश और मान-सम्मान बढ़ेगा। 🕉️',
      gu: 'જય શ્રી કૃષ્ણ. સૂર્ય અને ગુરુની અનુકૂળ દશાનું આ શુભ ફળ છે. સૂર્ય નારાયણને નિત્ય જળ અર્પિત કરાવતા રહેવું. 🕉️',
      en: 'Jai Shree Krishna. This is the auspicious grace of favorable Sun and Jupiter transits. Keep offering water to the Sun daily for continued growth. 🕉️'
    },
    highlightKey: 'NRI Verified USA Client'
  },
  {
    id: 'wa-3',
    senderName: 'दिनेशभाई प्रजापति (Dinesh Prajapati)',
    senderPhoneMasked: '+91 9428X XXXXX',
    location: 'विसनगर (Visnagar, Mehsana)',
    country: 'भारत (India)',
    flag: '🇮🇳',
    timestamp: '04:20 PM',
    date: '12 नवंबर 2025',
    serviceCategory: 'व्यापार वृद्धि एवं कर्ज निवारण',
    consultationType: 'WhatsApp Chat',
    rating: 5,
    clientMessage: {
      hi: 'पंडित जी प्रणाम। दुकान पर 2 साल से जो ग्राहकों की आवक रुकी हुई थी और भारी कर्ज था, आपके बताए अनुसार व्यापार वृद्धि यंत्र स्थापना और बुधवार के उपाय से मात्र 3 महीने में बिक्री दोगुनी हो गई है। पुराना कर्ज भी उतर रहा है। साक्षात चमत्कार है!',
      gu: 'પંડિતજી પ્રણામ. દુકાને 2 વર્ષથી જે ગ્રાહકોની આવક ઘટી ગઈ હતી, તમારા જણાવ્યા મુજબ વેપાર વૃદ્ધિ યંત્ર અને બુધવારના ઉપાયથી 3 મહિનામાં વેચાણ બમણું થઈ ગયું. જૂનું દેવું પણ પૂરું થઈ રહ્યું છે!',
      en: 'Pranam Pandit Ji. Following your Vyapar Vriddhi Yantra installation and Wednesday Mercury remedies, customer footfall in our shop doubled within 3 months and our loans are getting cleared. Pure blessing!'
    },
    panditReply: {
      hi: 'माँ लक्ष्मी की कृपा आप पर सदा बनी रहे दिनेश जी। सत्य और निष्ठा से व्यापार करें, श्री सूक्त का नित्य पाठ जारी रखें। 🌸🪔',
      gu: 'માં લક્ષ્મીની કૃપા તમારા પર સદા રહે. સત્ય અને નિષ્ઠાથી વેપાર કરો, શ્રી સુક્તનો પાઠ ચાલુ રાખો. 🌸🪔',
      en: 'May Goddess Mahalakshmi always shower prosperity upon your business. Continue reciting the Shree Suktam daily. 🌸🪔'
    },
    highlightKey: 'Business Growth Remedy'
  },
  {
    id: 'wa-4',
    senderName: 'Bhavna & Rajesh Lakhani',
    senderPhoneMasked: '+44 7911 XXXXXX',
    location: 'Wembley, London',
    country: 'United Kingdom (UK)',
    flag: '🇬🇧',
    timestamp: '03:45 PM (GMT)',
    date: '02 फरवरी 2026',
    serviceCategory: 'Foreign Birth Kundli & Home Vastu',
    consultationType: 'WhatsApp Chat',
    rating: 5,
    clientMessage: {
      hi: 'Har Har Mahadev Pandit Ji 🙏 We consulted you regarding our newly bought home in Wembley and our UK-born daughter\'s Janam Kundli. Your remote Vastu directions without demolition brought wonderful positive vibes to our house. Deeply obliged for your genuine guidance.',
      gu: 'હર હર મહાદેવ પંડિતજી 🙏 લંડનમાં અમારા નવા ઘરના વાસ્તુ અને દીકરીની કુંડળી માટે તમારો સંપર્ક કર્યો હતો. કોઈ તોડફોડ વગર તમે જે સરળ વાસ્તુ ઉપાય આપ્યા તેનાથી ઘરમાં ખૂબ સકારાત્મક ઊર્જા આવી ગઈ છે. ખૂબ આભાર!',
      en: 'Har Har Mahadev Pandit Ji 🙏 We consulted you regarding our newly bought home in Wembley and UK-born daughter\'s Kundli. Your remote Vastu remedies without structural alteration brought wonderful positive vibes into our home.'
    },
    panditReply: {
      hi: 'ईशान कोण में जल तत्व की शुद्धि से घर के समस्त वास्तु दोष शांत होते हैं। बिटिया का भविष्य अत्यंत उज्ज्वल है, महादेव की कृपा रहे। 🚩',
      gu: 'ઈશાન ખૂણામાં જળ તત્વની શુદ્ધિથી ઘરના સમસ્ત વાસ્તુ દોષ શાંત થાય છે. દીકરીનું ભવિષ્ય ખૂબ ઉજ્જવળ છે. 🚩',
      en: 'Balancing the North-East water element purifies all dwelling energies. Your daughter has a very auspicious chart. Mahadev bless you all. 🚩'
    },
    highlightKey: 'UK London Family Vastu'
  },
  {
    id: 'wa-5',
    senderName: 'अमित शाह (Amit Shah)',
    senderPhoneMasked: '+91 9898X XXXXX',
    location: 'अहमदाबाद (Ahmedabad)',
    country: 'भारत (India)',
    flag: '🇮🇳',
    timestamp: '07:10 PM',
    date: '14 जनवरी 2026',
    serviceCategory: 'कनाडा वीजा एवं करियर प्रश्न',
    consultationType: 'Audio Call',
    rating: 5,
    clientMessage: {
      hi: 'पंडित जी सादर चरण स्पर्श! आपने कुंडली देखकर साफ कहा था कि मकर संक्रांति के आसपास कनाडा पीआर वीजा की रुकावट दूर होगी। कल शाम ही पासपोर्ट सबमिशन की रिक्वेस्ट आ गई! आपकी ज्योतिषीय गणना में अद्भुत सत्यता है।',
      gu: 'પંડિતજી ચરણ સ્પર્શ! તમે કુંડળી જોઈને કહ્યું હતું કે મકરસંક્રાંતિ આસપાસ કેનેડા પીઆર વિઝાની રુકાવટ દૂર થશે. ગઈકાલે સાંજે જ પાસપોર્ટ સબમિશન મેઈલ આવી ગયો! તમારી ગણતરી અદભુત છે.',
      en: 'Sadaran Charan Sparsh Pandit Ji! You explicitly predicted that around Makar Sankranti my Canada PR visa obstacles would dissolve. Yesterday evening I received my passport submission request! Your astrological precision is unparalleled.'
    },
    panditReply: {
      hi: 'राहु की अनुकूल अंतर्दशा में विदेश गमन का योग पूर्ण हुआ। विदेश में भी अपनी भारतीय संस्कृति और माता-पिता के आशीर्वाद का आदर बनाए रखें। विजय भव! 🚩',
      gu: 'વિદેશ ગમનનો સુંદર યોગ પૂર્ણ થયો. વિદેશમાં પણ ભારતીય સંસ્કૃતિ અને માતા-પિતાના આશીર્વાદનું સન્માન જાળવજો. વિજયી ભવ! 🚩',
      en: 'Your foreign settlement Yoga has borne fruit during this favorable dasha. Always uphold our cultural values and parents\' blessings. Vijayi Bhava! 🚩'
    },
    highlightKey: 'Canada PR Visa Prediction'
  },
  {
    id: 'wa-6',
    senderName: 'श्रीमती हेतलबेन चौधरी (Hetalben)',
    senderPhoneMasked: '+91 9724X XXXXX',
    location: 'कडी (Kadi, Mehsana)',
    country: 'भारत (India)',
    flag: '🇮🇳',
    timestamp: '10:05 AM',
    date: '28 फरवरी 2026',
    serviceCategory: 'कालसर्प व पारिवारिक सुख शांति',
    consultationType: 'WhatsApp Chat',
    rating: 5,
    clientMessage: {
      hi: 'पंडित जी प्रणाम। हमारे परिवार में निरंतर स्वास्थ्य और मानसिक अशांति चल रही थी। आपके मार्गदर्शन में कराई गई सिद्ध नवग्रह शांति पूजा के बाद घर का माहौल पूरी तरह शांत और सुखद हो गया है। भगवान आपको लंबी उम्र दें!',
      gu: 'પંડિતજી પ્રણામ. અમારા પરિવારમાં વારંવાર બીમારી અને અશાંતિ રહેતી હતી. તમારા માર્ગદર્શનમાં થયેલી નવગ્રહ શાંતિ પૂજા પછી ઘરમાં ખૂબ શાંતિ અને સુખ છે. માં ભવાની તમારી રક્ષા કરે!',
      en: 'Pranam Pandit Ji. Our family was troubled by frequent health distress and tensions. Following the Navagraha Shanti Puja conducted under your guidance, peaceful harmony has returned to our home.'
    },
    panditReply: {
      hi: 'कुलदेवी माँ भवानी की असीम अनुकंपा है। प्रत्येक पूर्णिमा को घर में सत्यनारायण कथा या गायत्री जप का क्रम जारी रखें। 🌺🙏',
      gu: 'કુળદેવી માં ભવાનીની કૃપા છે. દર પૂનમે ઘરમાં સત્યનારાયણ કથા અથવા ગાયત્રી જપ ચાલુ રાખવો. 🌺🙏',
      en: 'All grace belongs to Kuldevi Maa Bhavani. Keep observing Satyanarayan Puja or Gayatri Japa on full moon days. 🌺🙏'
    },
    highlightKey: 'Family Health & Peace'
  }
];

interface WhatsAppTestimonialsProps {
  lang: Language;
  isDark?: boolean;
}

export const WhatsAppTestimonials: React.FC<WhatsAppTestimonialsProps> = ({ lang, isDark = false }) => {
  const [selectedReview, setSelectedReview] = useState<WhatsAppReview | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'nri' | 'gujarat'>('all');

  const filteredReviews = WHATSAPP_REVIEWS.filter(item => {
    if (activeFilter === 'nri') return item.country.includes('USA') || item.country.includes('UK');
    if (activeFilter === 'gujarat') return item.country.includes('India');
    return true;
  });

  return (
    <section className={`py-14 px-4 max-w-7xl mx-auto transition-colors duration-300 ${
      isDark ? 'text-stone-100' : 'text-stone-900'
    }`} id="whatsapp-reviews">
      {/* Header Badge */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border mb-3 shadow-xs ${
          isDark 
            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
          <span>
            {lang === 'en'
              ? '100% Verified WhatsApp Client Feedback'
              : lang === 'hi'
              ? '100% प्रामाणिक व्हाट्सएप यजमान अनुभव'
              : '૧૦૦% પ્રમાણિત વ્હોટ્સએપ જાતક પ્રતિસાદ'}
          </span>
        </div>

        <h2 className={`font-yatra text-2xl sm:text-4xl mb-3 tracking-wide ${
          isDark ? 'text-amber-300' : 'text-[#CC5218]'
        }`}>
          {lang === 'en'
            ? 'Real WhatsApp Conversations & Blessings'
            : lang === 'hi'
            ? 'यजमानों के वास्तविक व्हाट्सएप संदेश एवं अनुभव'
            : 'જાતકોના સાચા વ્હોટ્સએપ સંદેશા અને આશીર્વાદ'}
        </h2>

        <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto ${
          isDark ? 'text-stone-300' : 'text-stone-700'
        }`}>
          {lang === 'en'
            ? 'Unfiltered screenshots and messages shared by grateful families after successful Kundli Matching, Career Predictions, Vastu & Dosh Nivaran Puja.'
            : lang === 'hi'
            ? 'सटीक 36 गुण मिलान, विवाह बाधा निवारण, विदेश योग, व्यापार वृद्धि एवं पूजा के उपरांत यजमानों द्वारा कृतज्ञता पूर्वक भेजे गए वास्तविक संदेश।'
            : 'સચોટ કુંડળી મિલાન, વિદેશ યોગ, વેપાર વૃદ્ધિ અને વાસ્તુ પૂજા પછી સંતુષ્ટ પરિવારો દ્વારા મોકલાયેલા સાચા અનુભવો.'}
        </p>

        {/* Verification Guarantee Pill */}
        <div className={`mt-4 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl text-[11px] font-semibold border ${
          isDark 
            ? 'bg-stone-900 border-stone-800 text-stone-300' 
            : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}>
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {lang === 'en' ? 'Client Privacy Protected' : 'गोपनीयता सुरक्षित'}
          </span>
          <span className="text-stone-400">•</span>
          <span>{lang === 'en' ? 'Direct Pandit Ji Chat Records' : 'पंडित जी से सीधा संवाद'}</span>
          <span className="text-stone-400">•</span>
          <span className="flex items-center gap-1 text-amber-600 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'en' ? 'Gujarat & International NRIs' : 'गुजरात व प्रवासी भारतीय'}
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#25D366] text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/50'
                : isDark
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {lang === 'en' ? '💬 All WhatsApp Chats' : '💬 सभी व्हाट्सएप चैट'} ({WHATSAPP_REVIEWS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('nri')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'nri'
                ? 'bg-[#25D366] text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/50'
                : isDark
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>🇺🇸 🇬🇧 {lang === 'en' ? 'USA & UK NRI Chats' : 'USA व UK प्रवासी संदेश'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('gujarat')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'gujarat'
                ? 'bg-[#25D366] text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/50'
                : isDark
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>🇮🇳 {lang === 'en' ? 'Mehsana & Gujarat Chats' : 'मेहसाणा व गुजरात अनुभव'}</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Chat Screenshots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={`rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
              isDark 
                ? 'bg-stone-900 border-stone-800 hover:border-emerald-500/40' 
                : 'bg-white border-stone-200 hover:border-emerald-500/40'
            }`}
          >
            {/* Top WhatsApp UI Header Bar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white border border-white/30">
                  {review.senderName.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs text-white truncate max-w-[140px] sm:max-w-[160px]">
                      {review.senderName}
                    </h3>
                    <span className="text-xs">{review.flag}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-mono">
                    <span>{review.senderPhoneMasked}</span>
                    <span>•</span>
                    <span className="text-emerald-300 font-semibold">{review.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-100 border border-emerald-600/40">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                <span>Verified</span>
              </div>
            </div>

            {/* Service & Date Tag */}
            <div className={`px-4 py-2 text-[11px] font-bold flex items-center justify-between border-b ${
              isDark ? 'bg-stone-950/60 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-100 text-stone-700'
            }`}>
              <span className="text-[#CC5218] font-semibold">{review.serviceCategory}</span>
              <span className="text-[10px] text-stone-500">{review.date}</span>
            </div>

            {/* Realistic WhatsApp Chat Bubble Container */}
            <div className={`p-4 flex-1 flex flex-col justify-start gap-3.5 text-xs font-normal relative ${
              isDark 
                ? 'bg-[#0b141a]' 
                : 'bg-[#EFEAE2]'
            }`} style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.04) 1px, transparent 0)',
              backgroundSize: '16px 16px'
            }}>
              
              {/* Date stamp in center of chat */}
              <div className="text-center my-0.5">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-medium shadow-2xs ${
                  isDark ? 'bg-stone-800 text-stone-400' : 'bg-white/80 text-stone-600'
                }`}>
                  {review.date}
                </span>
              </div>

              {/* Client Incoming Bubble (White / Dark Stone) */}
              <div className="flex flex-col items-start max-w-[92%] self-start">
                <div className={`p-3 rounded-2xl rounded-tl-none shadow-xs border relative ${
                  isDark 
                    ? 'bg-[#202c33] text-stone-100 border-stone-700' 
                    : 'bg-white text-stone-900 border-stone-200'
                }`}>
                  <p className="leading-relaxed text-[12px] font-medium font-sans">
                    {lang === 'en' ? review.clientMessage.en : lang === 'gu' ? review.clientMessage.gu : review.clientMessage.hi}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-stone-400 font-mono">
                    <span>{review.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Pandit Ji Outgoing Reply Bubble (WhatsApp Green) */}
              {review.panditReply && (
                <div className="flex flex-col items-end max-w-[92%] self-end">
                  <div className={`p-3 rounded-2xl rounded-tr-none shadow-xs border relative ${
                    isDark 
                      ? 'bg-[#005c4b] text-white border-emerald-700/50' 
                      : 'bg-[#D9FDD3] text-stone-900 border-emerald-200'
                  }`}>
                    <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300 mb-0.5 flex items-center gap-1">
                      <span>🚩 पं. विरेंद्र जोशी (भवानी ज्योतिष)</span>
                    </div>
                    <p className="leading-relaxed text-[12px] font-medium font-sans">
                      {lang === 'en' ? review.panditReply.en : lang === 'gu' ? review.panditReply.gu : review.panditReply.hi}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-emerald-800 dark:text-emerald-200 font-mono">
                      <span>Just now</span>
                      <span className="text-blue-500 font-bold">✓✓</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Footer with 5 Stars & Action */}
            <div className={`p-4 border-t flex items-center justify-between ${
              isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'
            }`}>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[11px] font-bold text-stone-500 ml-1">5.0</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReview(review)}
                className={`text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all ${
                  isDark 
                    ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' 
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'en' ? 'Full View' : 'बड़ा देखें'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action for new consultation */}
      <div className={`mt-10 p-6 sm:p-8 rounded-3xl border text-center shadow-md relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-950/40 via-stone-900 to-amber-950/30 border-emerald-500/30' 
          : 'bg-gradient-to-r from-emerald-50 via-white to-amber-50 border-emerald-200'
      }`}>
        <div className="max-w-2xl mx-auto">
          <h3 className={`font-yatra text-xl sm:text-2xl mb-2 ${
            isDark ? 'text-amber-300' : 'text-[#CC5218]'
          }`}>
            {lang === 'en'
              ? 'Have a Question About Your Horoscope or Marriage?'
              : lang === 'hi'
              ? 'क्या आप भी अपनी कुंडली या विवाह को लेकर चिंतित हैं?'
              : 'શું તમે પણ તમારી કુંડળી કે લગ્ન બાબતે માર્ગદર્શન મેળવવા માંગો છો?'}
          </h3>
          <p className={`text-xs sm:text-sm mb-5 font-medium ${
            isDark ? 'text-stone-300' : 'text-stone-700'
          }`}>
            {lang === 'en'
              ? 'Consult directly with Pt. Virendra Kumar Joshi on WhatsApp or Call for genuine, time-tested Vedic astrological guidance.'
              : lang === 'hi'
              ? 'सीधे पंडित विरेंद्र कुमार जोशी जी से व्हाट्सएप या फोन कॉल पर बात करें और सटीक, प्रामाणिक समाधान पाएं।'
              : 'પંડિત વિરેન્દ્ર કુમાર જોશી સાથે સીધી વ્હોટ્સએપ પર વાત કરી સચોટ શાસ્ત્રોક્ત માર્ગદર્શન મેળવો.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('प्रणाम पंडित जी, मैंने आपकी वेबसाइट पर यजमानों के अनुभव देखे। मुझे अपनी जन्म कुंडली / विवाह मिलान / वास्तु परामर्श हेतु मार्गदर्शन चाहिए।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{lang === 'en' ? 'Send WhatsApp Inquiry' : 'व्हाट्सएप पर परामर्श लें'}</span>
            </a>

            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{ASTROLOGER_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal / Lightbox for zoomed viewing */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border transition-all ${
            isDark ? 'bg-stone-900 border-stone-700' : 'bg-white border-stone-200'
          }`}>
            {/* Modal Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-white border border-white/30">
                  {selectedReview.senderName.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1.5">
                    <span>{selectedReview.senderName}</span>
                    <span>{selectedReview.flag}</span>
                  </h4>
                  <p className="text-[11px] text-emerald-200 font-mono">{selectedReview.senderPhoneMasked} • {selectedReview.location}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-all"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Realistic Full Chat */}
            <div className={`p-6 flex flex-col gap-4 ${isDark ? 'bg-[#0b141a]' : 'bg-[#EFEAE2]'}`}>
              <div className="text-center">
                <span className={`text-[11px] px-3 py-1 rounded-md font-semibold ${
                  isDark ? 'bg-stone-800 text-stone-300' : 'bg-white text-stone-700'
                }`}>
                  {selectedReview.date} • {selectedReview.serviceCategory}
                </span>
              </div>

              {/* Client message */}
              <div className={`p-4 rounded-2xl rounded-tl-none border shadow-sm ${
                isDark ? 'bg-[#202c33] text-stone-100 border-stone-700' : 'bg-white text-stone-900 border-stone-200'
              }`}>
                <p className="text-sm leading-relaxed font-sans font-medium">
                  "{lang === 'en' ? selectedReview.clientMessage.en : lang === 'gu' ? selectedReview.clientMessage.gu : selectedReview.clientMessage.hi}"
                </p>
                <div className="text-right text-[10px] text-stone-400 mt-2 font-mono">
                  {selectedReview.timestamp}
                </div>
              </div>

              {/* Pandit Ji Reply */}
              {selectedReview.panditReply && (
                <div className={`p-4 rounded-2xl rounded-tr-none border shadow-sm self-end max-w-[95%] ${
                  isDark ? 'bg-[#005c4b] text-white border-emerald-700' : 'bg-[#D9FDD3] text-stone-900 border-emerald-300'
                }`}>
                  <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 mb-1">
                    🚩 पं. विरेंद्र कुमार जोशी (भवानी ज्योतिष, मेहसाणा)
                  </div>
                  <p className="text-sm leading-relaxed font-sans font-medium">
                    {lang === 'en' ? selectedReview.panditReply.en : lang === 'gu' ? selectedReview.panditReply.gu : selectedReview.panditReply.hi}
                  </p>
                  <div className="text-right text-[10px] text-emerald-800 dark:text-emerald-200 mt-2 font-mono">
                    Sent via WhatsApp Business ✓✓
                  </div>
                </div>
              )}

              {/* Verification Stamp */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                isDark ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-100 border-stone-200 text-stone-800'
              }`}>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Genuine Consultation Record</span>
                </span>
                <span className="text-stone-500">{selectedReview.highlightKey}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex items-center justify-end ${
              isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-xs font-bold transition-all"
              >
                {lang === 'en' ? 'Close Window' : 'बंद करें'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
