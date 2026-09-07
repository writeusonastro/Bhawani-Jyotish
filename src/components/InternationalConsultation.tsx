import React, { useState } from 'react';
import { Globe2, Clock, CheckCircle2, MessageCircle, Phone, Sparkles, MapPin, Calendar, ShieldCheck, HeartHandshake } from 'lucide-react';
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
}

const COUNTRIES: CountryInfo[] = [
  {
    code: 'US',
    name: 'USA & Canada',
    nameHi: 'यूएसए एवं कनाडा (USA & Canada)',
    nameGu: 'યુએસએ અને કેનેડા (USA & Canada)',
    flag: '🇺🇸 🇨🇦',
    timezone: 'EST / CST / MST / PST',
    popularCities: 'California, New Jersey, Texas, New York, Chicago, Toronto, Vancouver',
    popularCitiesHi: 'कैलिफोर्निया, न्यू जर्सी, टेक्सास, न्यूयॉर्क, शिकागो, टोरंटो, वैंकूवर',
    popularCitiesGu: 'કેલિફોર્નિયા, ન્યૂ જર્સી, ટેક્સાસ, ન્યૂયોર્ક, શિકાગો, ટોરોન્ટો, વાનકુવર',
    keyServices: ['NRI 36 Gun Milan', 'Foreign Birth DST Kundli', 'Career & Green Card Astrology', 'New Home Vastu']
  },
  {
    code: 'GB',
    name: 'United Kingdom (UK)',
    nameHi: 'यूनाइटेड किंगडम (UK - लंदन, लीसेस्टर)',
    nameGu: 'યુનાઇટેડ કિંગડમ (UK - લંડન, લિસેસ્ટર)',
    flag: '🇬🇧',
    timezone: 'GMT / BST (UK Time)',
    popularCities: 'London, Leicester, Wembley, Birmingham, Manchester, Harrow',
    popularCitiesHi: 'लंदन, लीसेस्टर, वेम्बली, बर्मिंघम, मैनचेस्टर, हैरो',
    popularCitiesGu: 'લંડન, લિસેસ્ટર, વેમ્બલી, બર્મિંગહામ, માન્ચેસ્ટર, હેરો',
    keyServices: ['Gujarati Family Kundli', 'Marriage Matchmaking', 'Manglik Dosh Shanti', 'Business Prosperity']
  },
  {
    code: 'AE',
    name: 'UAE & Gulf Countries',
    nameHi: 'यूएई एवं खाड़ी देश (दुबई, अबू धाबी)',
    nameGu: 'યુએઈ અને અખાતી દેશો (દુબઈ, અબુ ધાબી)',
    flag: '🇦🇪',
    timezone: 'GST (Gulf Standard Time)',
    popularCities: 'Dubai, Abu Dhabi, Sharjah, Ajman, Muscat, Doha',
    popularCitiesHi: 'दुबई, अबू धाबी, शारजाह, अजमान, मस्कट, दोहा',
    popularCitiesGu: 'દુબઈ, અબુ ધાબી, શારજાહ, અજમાન, મસ્કત, દોહા',
    keyServices: ['Business & Trade Muhurat', 'Job & Promotion Guidance', 'Kundli Analysis', 'Vastu Consultation']
  },
  {
    code: 'SG',
    name: 'Singapore & Malaysia',
    nameHi: 'सिंगापुर एवं मलेशिया',
    nameGu: 'સિંગાપોર અને મલેશિયા',
    flag: '🇸🇬 🇲🇾',
    timezone: 'SGT / MYT',
    popularCities: 'Singapore, Kuala Lumpur, Penang, Johor Bahru',
    popularCitiesHi: 'सिंगापुर, कुआलालंपुर, पेनांग, जोहोर बाहरू',
    popularCitiesGu: 'સિંગાપોર, કુઆલાલંપુર, પેનાંગ, જોહોર બહારુ',
    keyServices: ['Kundli Matching for Marriage', 'Child Education Astrological Guidance', 'Health & Prosperity', 'Puja Sankalp']
  },
  {
    code: 'ZA',
    name: 'South Africa',
    nameHi: 'साउथ अफ्रीका (South Africa)',
    nameGu: 'દક્ષિણ આફ્રિકા (South Africa)',
    flag: '🇿🇦',
    timezone: 'SAST (South Africa Standard Time)',
    popularCities: 'Durban, Johannesburg, Cape Town, Pretoria, Lenasia',
    popularCitiesHi: 'डरबन, जोहान्सबर्ग, केप टाउन, प्रिटोरिया, लेनासिया',
    popularCitiesGu: 'ડર્બન, જોહાનિસબર્ગ, કેપ ટાઉન, પ્રિટોરિયા, લેનાસિયા',
    keyServices: ['Ancestral Vedic Consultation', 'Navagraha & Kaal Sarp Puja', 'Marriage Kundli', 'Vastu Guidance']
  },
  {
    code: 'AU',
    name: 'Australia & New Zealand',
    nameHi: 'ऑस्ट्रेलिया एवं न्यूजीलैंड',
    nameGu: 'ઓસ્ટ્રેલિયા અને ન્યુઝીલેન્ડ',
    flag: '🇦🇺 🇳🇿',
    timezone: 'AEST / NZST',
    popularCities: 'Sydney, Melbourne, Brisbane, Perth, Auckland',
    popularCitiesHi: 'सिडनी, मेलबर्न, ब्रिस्बेन, पर्थ, ऑकलैंड',
    popularCitiesGu: 'સિડની, મેલબોર્ન, બ્રિસ્બેન, પર્થ, ઓકલેન્ડ',
    keyServices: ['PR & Settlement Astrology', '36 Gun Milan', 'Birth Chart Reading', 'Career Progression']
  }
];

export const InternationalConsultation: React.FC<InternationalConsultationProps> = ({ lang }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('US');

  const activeInfo = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  const getWhatsAppInternationalLink = (countryName: string) => {
    const text = encodeURIComponent(
      `🙏 प्रणाम पंडित जी! मैं ${countryName} से संपर्क कर रहा/रही हूँ। मुझे ऑनलाइन वैदिक जन्म कुंडली / 36 गुण विवाह मिलान परामर्श हेतु समय (Appointment) प्राप्त करना है। कृपया मार्गदर्शन प्रदान करें। (Reference: bhawanijyotish.online)`
    );
    return `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
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
                ? 'Best Indian & Gujarati Astrologer for USA, UK, UAE, Singapore & SA'
                : lang === 'hi'
                ? 'USA, UK, UAE, सिंगापुर, साउथ अफ्रीका व कनाडा हेतु प्रामाणिक वैदिक ज्योतिषी'
                : 'USA, UK, UAE, સિંગાપોર, સાઉથ આફ્રિકા માટે અધિકૃત વૈદિક જ્યોતિષાચાર્ય'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-950 font-medium max-w-3xl mt-2 leading-relaxed">
              {lang === 'en'
                ? 'Pandit Shri Virendra Kumar Joshi provides personalized Vedic horoscope consultations, 36 Gun Milan for NRI marriages, and Daylight Saving Time (DST) corrected birth charts across all international timezones.'
                : lang === 'hi'
                ? 'विदेशों में बसे भारतीय एवं गुजराती परिवारों के लिए विशेष ऑनलाइन ज्योतिष सुविधा। आपके देश के टाइमज़ोन (EST, CST, PST, GMT, GST) अनुसार WhatsApp एवं Google Meet पर व्यक्तिगत शास्त्रोक्त परामर्श।'
                : 'વિદેશમાં વસતા ગુજરાતી અને ભારતીય પરિવારો માટે વિશેષ ઓનલાઇન જ્યોતિષ સુવિધા. તમારા દેશના ટાઈમઝોન અનુસાર WhatsApp પર સીધું પરામર્શ.'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-amber-200 shadow-sm text-xs font-bold text-stone-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {lang === 'en' ? '35+ Years Proven Heritage | 100% Confidential' : '35+ वर्षों का प्रामाणिक अनुभव | पूर्णतः गोपनीय'}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#FF671F]/20 shadow-lg">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeInfo.flag}</span>
              <div>
                <h3 className="font-yatra text-xl sm:text-2xl text-stone-950">
                  {lang === 'en'
                    ? `Vedic Astrology Services for Clients in ${activeInfo.name}`
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
              {lang === 'en'
                ? `Major cities served: ${activeInfo.popularCities}. We adjust appointment timings so you can comfortably consult Pandit Ji in the evening after your work hours or during convenient weekend slots.`
                : `प्रमुख शहर: ${activeInfo.popularCitiesHi}। आपके कामकाजी समय के बाद शाम अथवा सप्ताहांत (शनिवार/रविवार) में आपकी सुविधा अनुसार समय निर्धारित किया जाता है।`}
            </p>

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
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs font-medium text-stone-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-stone-950">
                  {lang === 'en' ? 'Daylight Saving Time (DST) Precision:' : 'डेलाइट सेविंग टाइम (DST) का सटीक समायोजन:'}
                </strong>{' '}
                {lang === 'en'
                  ? 'For children or individuals born abroad, foreign time differences and DST hours are accurately calculated according to Lahiri Ayanamsha for 100% correct planetary positions.'
                  : 'विदेश में जन्मे बालकों अथवा जातकों के लिए स्थानीय समय एवं DST को भारतीय वैदिक गणित से सटीक परिवर्तित कर शत-प्रतिशत प्रामाणिक लग्न चक्र निर्मित किया जाता है।'}
              </div>
            </div>
          </div>

          {/* Right Action / Consultation Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F0] to-[#FFFDF9] p-6 rounded-2xl border border-[#FF671F]/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  {lang === 'en' ? 'International Slots Available Today' : 'आज अंतर्राष्ट्रीय अपॉइंटमेंट उपलब्ध हैं'}
                </span>
              </div>

              <h4 className="font-yatra text-lg sm:text-xl text-stone-950">
                {lang === 'en' ? 'Book Online NRI Consultation' : 'ऑनलाइन NRI परामर्श स्लॉट बुक करें'}
              </h4>

              <p className="text-xs text-stone-950 font-medium mt-1">
                {lang === 'en'
                  ? 'Connect directly with Chief Astrologer Pt. Virendra Kumar Joshi on WhatsApp voice/video call or phone.'
                  : 'मुख्य ज्योतिषाचार्य पंडित विरेंद्र कुमार जोशी जी से सीधे WhatsApp ऑडियो/वीडियो कॉल अथवा फोन पर परामर्श प्राप्त करें।'}
              </p>

              <div className="space-y-2 mt-4 text-xs text-stone-950 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Languages: Gujarati, Hindi, English' : 'भाषाएं: गुजराती, हिंदी एवं अंग्रेज़ी'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Detailed Kundli PDF on WhatsApp' : 'विस्तृत जन्म पत्रिका PDF आपके WhatsApp पर'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'en' ? 'Safe & Simple Online Payments' : 'सुरक्षित ऑनलाइन शुल्क भुगतान (UPI / Cards / Transfer)'}</span>
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
                className="w-full bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{lang === 'en' ? 'Direct International Call: +91 99090 87902' : 'कॉल करें: +91 99090 87902'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-8 pt-6 border-t border-[#FF671F]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
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
