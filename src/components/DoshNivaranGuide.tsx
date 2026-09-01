import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface DoshGuideProps {
  lang: 'hi' | 'gu';
  onOpenBooking: (doshName?: string) => void;
}

const DOSHAS = [
  {
    id: 'kalsarp',
    nameHi: 'कालसर्प दोष (Kalsarp Dosh)',
    nameGu: 'કાલસર્પ દોષ',
    description: 'जब कुंडली में राहु और केतु के मध्य सभी सात ग्रह आ जाते हैं, तब कालसर्प योग का निर्माण होता है।',
    symptoms: [
      'कठिन परिश्रम के बावजूद सफलता में बार-बार अंतिम समय पर अड़चन आना',
      'स्वप्न में बार-बार सर्प, जल में डूबना अथवा ऊंचाई से गिरना दिखाई देना',
      'मानसिक अशांति, अनिद्रा और व्यर्थ का भय बना रहना',
      'संतान कष्ट अथवा वंश वृद्धि में रुकावट'
    ],
    types: ['अनंत कालसर्प', 'कुलिक', 'वासुकि', 'शंखपाल', 'पद्म', 'महापद्म', 'तक्षक', 'कर्कोटक', 'शंखचूड़', 'घातक', 'विषधर', 'शेषनाग कालसर्प'],
    remedies: [
      'सिद्ध महामृत्युंजय मंत्र का 1,25,000 जप अनुष्ठान',
      'नाग पंचमी अथवा सावन के सोमवार को चांदी के नाग-नागिन का दान',
      'भगवान शिव का गन्ने के रस व पंचामृत से रुद्राभिषेक',
      'राहु-केतु शांति महायज्ञ एवं शनिवार को काले तिल का दान'
    ]
  },
  {
    id: 'manglik',
    nameHi: 'मांगलिक दोष (Manglik Dosh)',
    nameGu: 'માંગલિક દોષ',
    description: 'लग्न, चतुर्थ, सप्तम, अष्टम अथवा द्वादश भाव में मंगल ग्रह के स्थित होने पर मांगलिक दोष बनता है।',
    symptoms: [
      'विवाह में अत्यधिक विलंब होना अथवा तय रिश्ता बार-बार टूट जाना',
      'दांपत्य जीवन में कलह, क्रोध, मतभेद और तालमेल की कमी',
      'पति अथवा पत्नी के स्वास्थ्य में लगातार गिरावट रहना',
      'रक्त संबंधी विकार अथवा अचानक दुर्घटना का भय'
    ],
    types: ['लग्न मांगलिक', 'चतुर्थ भाव मांगलिक', 'सप्तम भाव मांगलिक (अत्यधिक प्रभावी)', 'अष्टम भाव मांगलिक', 'द्वादश भाव मांगलिक'],
    remedies: [
      'कुंभ विवाह / अर्क विवाह / विष्णु प्रतिमा विवाह शास्त्रीय विधि से',
      'प्रतिदिन हनुमान चालीसा एवं सुंदरकांड का पाठ',
      'मंगलवार को लाल मसूर की दाल, लाल चंदन व गुड़ का दान',
      'सवा सात रत्ती का इटालियन लाल मूंगा (विशेष परामर्श उपरांत) धारण करना'
    ]
  },
  {
    id: 'pitra',
    nameHi: 'पितृ दोष (Pitra Dosh)',
    nameGu: 'પિતૃ દોષ',
    description: 'पूर्वजों के प्रति तृप्ति न होने अथवा नवम भाव (भाग्य/धर्म भाव) के पीड़ित होने पर पितृ दोष बनता है।',
    symptoms: [
      'परिवार में मांगलिक कार्यों में लगातार व्यवधान आना',
      'संतान हीनता अथवा योग्य संतान होने के बाद भी क्लेश',
      'घर में हमेशा कोई न कोई सदस्य अस्वस्थ रहना',
      'व्यापार में बिना किसी कारण के अचानक भारी आर्थिक नुकसान'
    ],
    types: ['मातृ पितृ दोष', 'भ्रातृ पितृ दोष', 'आत्म पितृ दोष', 'नाग जनित पितृ दोष'],
    remedies: [
      'त्रिपिंडी श्राद्ध अथवा नारायण बलि अनुष्ठान',
      'अमावस्या के दिन पितरों के निमित्त खीर व ब्राह्मण भोजन',
      'पीपल के वृक्ष की प्रतिदिन सेवा व जल में कच्चा दूध अर्पित करना',
      'गौशाला में गायों को हरा चारा व गुड़ खिलाना'
    ]
  },
  {
    id: 'sade-sati',
    nameHi: 'शनि साढ़े साती एवं ढैय्या (Shani Sade Sati)',
    nameGu: 'શનિ સાડા સાતી અને ઢૈય્યા',
    description: 'जब गोचर में शनिदेव जन्म चंद्र राशि से 12वें, लग्न अथवा द्वितीय भाव में भ्रमण करते हैं।',
    symptoms: [
      'अचानक नौकरी छूटना अथवा व्यापार में भारी घाटा',
      'झूठे आरोप, मुकदमेबाजी अथवा सामाजिक अपयश का भय',
      'हड्डियों, जोड़ों व स्नायु तंत्र में पीड़ा',
      'परिवार व मित्रों द्वारा सहयोग न मिलना'
    ],
    types: ['प्रथम चरण (उदयमान)', 'द्वितीय चरण (शिखर - सर्वाधिक कठिन)', 'तृतीय चरण (अस्तगामी / उतरती साढ़े साती)'],
    remedies: [
      'शनिवार को पीपल के नीचे सरसों के तेल का चौमुखा दीपक जलाना',
      'शनि चालीसा एवं दशरथ कृत शनि स्तोत्र का नित्य पाठ',
      'काले कुत्ते को सरसों के तेल से चुपड़ी रोटी खिलाना',
      'काले घोड़े की नाल का छल्ला मध्यमा अंगुली में धारण करना'
    ]
  }
];

export const DoshNivaranGuide: React.FC<DoshGuideProps> = ({ lang, onOpenBooking }) => {
  const [activeDoshId, setActiveDoshId] = useState<string>('kalsarp');
  const activeDosh = DOSHAS.find((d) => d.id === activeDoshId) || DOSHAS[0];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-rose-200 mb-2">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>{lang === 'hi' ? 'शास्त्रीय दोष निवारण मार्गदर्शिका' : 'શાસ્ત્રીય દોષ નિવારણ માર્ગદર્શિકા'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'कालसर्प, मांगलिक व पितृ दोष निवारण' : 'કાલસર્પ, માંગલિક અને પિતૃ દોષ નિવારણ'}
        </h2>
        <p className="text-sm text-[#665448]">
          {lang === 'hi'
            ? 'कुंडली के प्रमुख दोषों के लक्षण पहचानें और पंडित जी द्वारा शास्त्रोक्त वैदिक शांति कराएं'
            : 'કુંડળીના મુખ્ય દોષોના લક્ષણો ઓળખો અને શાસ્ત્રોક્ત વૈદિક શાંતિ કરાવો'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {DOSHAS.map((dosh) => (
          <button
            key={dosh.id}
            type="button"
            onClick={() => setActiveDoshId(dosh.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeDoshId === dosh.id
                ? 'bg-gradient-to-r from-[#FF671F] to-[#CC5218] text-white shadow-lg shadow-[#FF671F]/30 scale-105'
                : 'bg-white hover:bg-[#FFF5F0] text-[#5C4A3E] border border-[#FF671F]/20 shadow-sm'
            }`}
          >
            {lang === 'hi' ? dosh.nameHi : dosh.nameGu}
          </button>
        ))}
      </div>

      {/* Active Dosh Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FF671F]/25 shadow-xl shadow-[#FF671F]/5 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#FF671F]/15">
          <div>
            <h3 className="font-yatra text-2xl sm:text-3xl text-[#CC5218]">
              {lang === 'hi' ? activeDosh.nameHi : activeDosh.nameGu}
            </h3>
            <p className="text-xs sm:text-sm text-[#665448] mt-1 max-w-2xl">
              {activeDosh.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking(activeDosh.nameHi)}
            className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{lang === 'hi' ? 'दोष शांति पूजा बुक करें' : 'શાંતિ પૂજા બુક કરો'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Symptoms */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-3">
            <h4 className="font-bold text-sm text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{lang === 'hi' ? 'दोष के प्रमुख लक्षण एवं दुष्प्रभाव' : 'દોષના મુખ્ય લક્ષણો'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A282C]">
              {activeDosh.symptoms.map((sym, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">•</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Remedies */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
            <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'अचूक शास्त्रोक्त वैदिक निवारण' : 'શાસ્ત્રોક્ત વૈદિક નિવારણ'}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#1B3F2E]">
              {activeDosh.remedies.map((rem, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">🚩</span>
                  <span>{rem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Types / Categories */}
        <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FF671F]/20">
          <span className="font-bold text-xs sm:text-sm text-[#CC5218] block mb-2">
            📋 इस दोष के प्रमुख प्रकार (Categories):
          </span>
          <div className="flex flex-wrap gap-2">
            {activeDosh.types.map((t, idx) => (
              <span key={idx} className="text-xs bg-white text-[#5C4A3E] border border-[#FF671F]/30 px-3 py-1 rounded-full font-medium shadow-2xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Emergency Help Banner */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFF5F0] border border-[#FF671F]/30 text-xs sm:text-sm">
          <div className="text-center sm:text-left">
            <span className="font-bold text-[#CC5218]">क्या आपकी कुंडली में यह दोष है?</span>
            <p className="text-[#665448]">पंडित जी से अपनी कुंडली का सूक्ष्म परीक्षण कराएं और अचूक उपाय जानें।</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{ASTROLOGER_INFO.phonePrimary}</span>
            </a>

            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मुझे "${activeDosh.nameHi}" के संबंध में अपनी कुंडली की जांच करानी है।`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>व्हाट्सएप</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
