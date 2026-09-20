import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, Scale, Lock, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/astrology';
import { ASTROLOGER_INFO } from '../data/astrologyData';

export type LegalTabType = 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
  lang?: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'disclaimer',
  lang = 'hi',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto bg-stone-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-5 py-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              {activeTab === 'privacy' && <Lock className="w-5 h-5" />}
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
              {activeTab === 'disclaimer' && <Scale className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-200 font-mukta">
                {lang === 'en'
                  ? 'Legal & Compliance Center'
                  : lang === 'gu'
                  ? 'કાનૂની અને નીતિ નિર્દેશિકા'
                  : 'कानूनी एवं नीति केंद्र'}
              </h3>
              <p className="text-xs text-stone-400">
                {lang === 'en' ? ASTROLOGER_INFO.nameEn : lang === 'gu' ? ASTROLOGER_INFO.nameGu : ASTROLOGER_INFO.name} • {lang === 'en' ? ASTROLOGER_INFO.centerNameEn : lang === 'gu' ? ASTROLOGER_INFO.centerNameGu : ASTROLOGER_INFO.centerName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center border border-stone-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950/80 px-4 pt-2 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>
              {lang === 'en'
                ? 'Astrology Disclaimer'
                : lang === 'gu'
                ? 'જ્યોતિષ અસ્વીકરણ'
                : 'वैदिक परामर्श अस्वीकरण'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>
              {lang === 'en'
                ? 'Privacy Policy'
                : lang === 'gu'
                ? 'ગોપનીયતા નીતિ'
                : 'गोपनीयता नीति (Privacy)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'terms'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              {lang === 'en'
                ? 'Terms of Service'
                : lang === 'gu'
                ? 'સેવાની શરતો'
                : 'सेवा की शर्तें (Terms)'}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto text-stone-200 text-xs sm:text-sm leading-relaxed space-y-4">
          {/* TAB 1: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 text-amber-200/90 text-xs sm:text-sm">
                <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'en'
                      ? 'Important Vedic Guidance & Ethical Notice'
                      : lang === 'gu'
                      ? 'મહત્વપૂર્ણ વૈદિક માર્ગદર્શન અને નૈતિક સૂચના'
                      : 'महत्वपूर्ण वैदिक मार्गदर्शन एवं वैधानिक सूचना'}
                  </span>
                </div>
                <p>
                  {lang === 'en'
                    ? 'Bhavani Jyotish provides astrological consultations based on traditional Indian Vedic scriptures (Parashar Hora Shastra). These calculations and astrological remedies are offered in good faith for spiritual enrichment and personal introspection.'
                    : lang === 'gu'
                    ? 'ભવાની જ્યોતિષ પરંપરાગત ભારતીય વૈદિક શાસ્ત્રો (પારાશર હોરા શાસ્ત્ર) અનુસાર જ્યોતિષીય પરામર્શ પ્રદાન કરે છે. આ ગણતરીઓ અને ઉપાયો આધ્યાત્મિક અને માનસિક શાંતિ માટે શ્રદ્ધાપૂર્વક આપવામાં આવે છે.'
                    : 'भवानी ज्योतिष पारंपरिक भारतीय वैदिक शास्त्रों (महर्षि पाराशर होरा शास्त्र) के आधार पर ज्योतिषीय परामर्श प्रदान करता है। यह गणना और उपाय आध्यात्मिक प्रेरणा, आत्म-निरीक्षण और व्यक्तिगत मार्गदर्शन हेतु सद्भावपूर्वक दिए जाते हैं।'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-amber-300 text-sm sm:text-base">
                  {lang === 'en'
                    ? '1. No Medical, Legal or Financial Advice'
                    : lang === 'gu'
                    ? '૧. કોઈ તબીબી, કાનૂની કે આર્થિક સલાહનો વિકલ્પ નથી'
                    : '1. चिकित्सकीय, कानूनी या वित्तीय सलाह का विकल्प नहीं'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'Astrological advice, gemstone recommendations, or ritual suggestions are not an alternative or substitute for qualified medical, psychological, legal, or licensed financial counseling. For any serious health symptoms, psychiatric distress, or legal disputes, users must consult certified doctors, healthcare professionals, or legal attorneys.'
                    : lang === 'gu'
                    ? 'જ્યોતિષીય પરામર્શ, રત્ન કે પૂજાના ઉપાયો પ્રમાણિત તબીબી (ડોક્ટર), મનોચિકિત્સક કે કાનૂની વકીલની સલાહનો વિકલ્પ નથી. કોઈપણ ગંભીર બીમારી કે કાનૂની વિવાદ માટે સંબંધિત નિષ્ણાતની સલાહ અવશ્ય લેવી.'
                    : 'ज्योतिषीय परामर्श, रत्न धारण या पूजा-अनुष्ठान किसी भी प्रकार से योग्य चिकित्सक (डॉक्टर), मनोचिकित्सक, या अधिकृत वित्तीय/कानूनी वकील की पेशेवर सलाह का विकल्प नहीं है। गंभीर स्वास्थ्य समस्याओं, मानसिक विकारों या न्यायिक विवादों में संबंधित अधिकृत विशेषज्ञों से परामर्श लेना अनिवार्य है।'}
                </p>

                <h4 className="font-bold text-amber-300 text-sm sm:text-base pt-2">
                  {lang === 'en'
                    ? '2. Vedic Karmic Principle & No Guarantees'
                    : lang === 'gu'
                    ? '૨. વૈદિક કર્મ સિદ્ધાંત અને અનિશ્ચિતતા'
                    : '2. कर्म सिद्धांत एवं परिणामों की व्यक्तिगत प्रकृति'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'Vedic astrology recognizes the supremacy of individual Karma, personal free-will, and the grace of the Divine. Results, timeframes, and planetary influences vary from individual to individual based on their birth chart and planetary dasha. We do not make any false supernatural promises, 100% magical claims, or guaranteed miraculous outcomes.'
                    : lang === 'gu'
                    ? 'વૈદિક જ્યોતિષ માનવ કર્મ, પુરુષાર્થ અને ઈશ્વરીય કૃપાને સર્વોચ્ચ માને છે. ગ્રહોના પ્રભાવ અને પરિણામ દરેક વ્યક્તિના જન્મચક્ર અને કર્મો અનુસાર ભિન્ન હોઈ શકે છે. અમે કોઈ પણ ચમત્કારિક, અવાસ્તવિક કે ૧૦૦% ગેરંટીયુક્ત પરિણામોનો દાવો કરતા નથી.'
                    : 'वैदिक ज्योतिष मनुष्य के पुरुषार्थ, व्यक्तिगत कर्म और ईश्वरीय इच्छा को सर्वोपरि मानता है। ग्रहों के गोचर व दशा का प्रभाव प्रत्येक जातक की जन्म कुंडली और कर्मों के अनुसार भिन्न-भिन्न हो सकता है। संस्थान किसी भी प्रकार के जादुई, अवास्तविक या १००% निश्चित चमत्कारी परिणामों का कोई दावा नहीं करता है।'}
                </p>

                <h4 className="font-bold text-amber-300 text-sm sm:text-base pt-2">
                  {lang === 'en'
                    ? '3. Adherence to Advertising Standards (Google & Meta)'
                    : lang === 'gu'
                    ? '૩. ગૂગલ અને મેટા નીતિઓનું સન્માન'
                    : '3. विज्ञापन एवं उपभोक्ता संरक्षण नीतियों का अनुपालन'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'In compliance with Google Ads, Meta (Facebook & Instagram), and Indian Consumer Protection norms, our services strictly adhere to transparent ethical practices. We do not practice or endorse black magic, superstitious harms, unethical mind control, or fraudulent de-addiction medical claims.'
                    : lang === 'gu'
                    ? 'ગૂગલ, મેટા (ફેસબુક અને ઇન્સ્ટાગ્રામ) તથા ભારતીય ગ્રાહક સુરક્ષા નિયમોનું પાલન કરીને, અમારું કેન્દ્ર સંપૂર્ણ પારદર્શિતાથી કાર્ય કરે છે. અમે અંધશ્રદ્ધા, વશીકરણ કે ગેરકાયદેસર દાવાઓને સમર્થન આપતા નથી.'
                    : 'गूगल एड्स, मेटा (फेसबुक व इंस्टाग्राम) एवं भारतीय उपभोक्ता संरक्षण मानकों के अनुपालन में हमारी सेवाएं पारदर्शी एवं नैतिक सिद्धांतों पर आधारित हैं। हम किसी भी प्रकार के अंधविश्वास, अनैतिक वशीकरण या बिना डॉक्टरी प्रमाण के नशा मुक्ति के दावों को बढ़ावा नहीं देते।'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 text-emerald-200 text-xs sm:text-sm">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300 mb-1">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>
                    {lang === 'en'
                      ? '100% Confidentiality & Data Security Commitment'
                      : lang === 'gu'
                      ? '૧૦૦% ગોપનીયતા અને સુરક્ષિત ડેટા પ્રતિજ્ઞા'
                      : '१००% पूर्ण गोपनीयता एवं डेटा सुरक्षा का वचन'}
                  </span>
                </div>
                <p>
                  {lang === 'en'
                    ? 'Your personal details, birth date, time, horoscope questions, and telephonic consultations are strictly protected. We never sell, rent, or trade user data to any telemarketers or third parties.'
                    : lang === 'gu'
                    ? 'તમારી જન્મ તારીખ, સમય, કુંડળી વિગતો અને ફોન નંબર સંપૂર્ણ ગુપ્ત રાખવામાં આવે છે. અમે ક્યારેય તમારો ડેટા કોઈ ત્રીજા પક્ષને વેચતા કે શેર કરતા નથી.'
                    : 'आपकी जन्म तिथि, जन्म समय, जन्म स्थान, मोबाइल नंबर एवं व्यक्तिगत पारिवारिक समस्याएं पूर्णतः गोपनीय रखी जाती हैं। हम कभी भी किसी तीसरे पक्ष या टेलीमार्केटिंग कंपनियों को डेटा नहीं बेचते हैं।'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-amber-300 text-sm sm:text-base">
                  {lang === 'en' ? '1. Information We Collect' : lang === 'gu' ? '૧. અમે કઈ માહિતી મેળવીએ છીએ' : '1. हम कौन-सी जानकारी प्राप्त करते हैं'}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  <li>
                    {lang === 'en'
                      ? 'Birth details (Date, Time, City) provided voluntarily for Kundli / Gun Milan generation.'
                      : lang === 'gu'
                      ? 'કુંડળી અને ગુણ મિલન માટે તમે આપેલી જન્મ વિગતો (તારીખ, સમય, શહેર).'
                      : 'कुंडली या गुण मिलान हेतु स्वेच्छा से दी गई जन्म तिथि, जन्म समय एवं जन्म स्थान।'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? 'Contact details (Phone / WhatsApp number) for direct telephonic consultation with Pandit Ji.'
                      : lang === 'gu'
                      ? 'પંડિતજી સાથે સીધા સંપર્ક માટે તમારો ફોન અથવા વોટ્સએપ નંબર.'
                      : 'सीधे फोन या व्हाट्सएप पर परामर्श हेतु आपका संपर्क नंबर।'}
                  </li>
                </ul>

                <h4 className="font-bold text-amber-300 text-sm sm:text-base pt-2">
                  {lang === 'en' ? '2. How Information is Used' : lang === 'gu' ? '૨. માહિતીનો ઉપયોગ' : '2. प्राप्त जानकारी का उपयोग'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'Data is utilized exclusively for planetary calculation, horoscope assessment, and direct customer support. It is never used for automated spam calls or unsolicited SMS campaigns.'
                    : lang === 'gu'
                    ? 'માહિતીનો ઉપયોગ ફક્ત ગ્રહોની ગણતરી અને પંડિતજી દ્વારા પરામર્શ માટે થાય છે. કોઈ બિનજરૂરી સ્પામ મેસેજ મોકલવામાં આવતા નથી.'
                    : 'इस जानकारी का उपयोग केवल ग्रह स्थिति की गणना, महादशा चक्र विश्लेषण एवं पंडित जी द्वारा व्यक्तिगत परामर्श देने हेतु किया जाता है। कोई अनचाहे स्पैम कॉल नहीं किए जाते।'}
                </p>

                <h4 className="font-bold text-amber-300 text-sm sm:text-base pt-2">
                  {lang === 'en' ? '3. Right to Data Erasure' : lang === 'gu' ? '૩. ડેટા ડિલીટ કરવાનો અધિકાર' : '3. डेटा हटाने (Delete) का अधिकार'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'You can request the permanent removal of your consultation records or generated charts at any time by sending a message to writeusonastro@gmail.com or via official WhatsApp.'
                    : lang === 'gu'
                    ? 'તમે ગમે ત્યારે writeusonastro@gmail.com પર ઈમેલ કરીને તમારી કુંડળી વિગતો હટાવવાની વિનંતી કરી શકો છો.'
                    : 'आप किसी भी समय writeusonastro@gmail.com पर ईमेल या हमारे आधिकारिक व्हाट्सएप नंबर पर संदेश भेजकर अपने परामर्श रिकॉर्ड को हटाने का अनुरोध कर सकते हैं।'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="bg-stone-800/80 border border-stone-700 rounded-xl p-4 text-stone-300 text-xs sm:text-sm">
                <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'en'
                      ? 'Terms of Service & Astrological Consultations'
                      : lang === 'gu'
                      ? 'સેવાની શરતો અને નિયમો'
                      : 'सेवा की सामान्य शर्तें एवं परामर्श नियम'}
                  </span>
                </div>
                <p>
                  {lang === 'en'
                    ? 'By using Bhavani Jyotish services, you agree to these fair terms. Our services are intended for adults seeking spiritual and classical astrological guidance.'
                    : lang === 'gu'
                    ? 'આ વેબસાઇટ અને પરામર્શ સેવાનો ઉપયોગ કરીને તમે આ શરતો સ્વીકારો છો. સેવાઓ ફક્ત ૧૮ વર્ષથી વધુ ઉંમરના પુખ્ત વયના લોકો માટે છે.'
                    : 'भवानी ज्योतिष की सेवाओं का उपयोग करके आप इन नियमों से सहमत होते हैं। यह सेवाएं आध्यात्मिक एवं शास्त्रीय मार्गदर्शन चाहने वाले १८ वर्ष से अधिक आयु के वयस्कों हेतु हैं।'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-amber-300 text-sm sm:text-base">
                  {lang === 'en' ? '1. Age Eligibility' : lang === 'gu' ? '૧. વય મર્યાદા' : '1. आयु पात्रता'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'Users must be 18 years or older to book an astrological consultation. Minors must have parental or guardian consent.'
                    : lang === 'gu'
                    ? 'પરામર્શ મેળવવા માટે ઉંમર ૧૮ વર્ષ કે તેથી વધુ હોવી જરૂરી છે. સગીરો માટે માતા-પિતાની સંમતિ આવશ્યક છે.'
                    : 'परामर्श लेने हेतु जातक की आयु १८ वर्ष या उससे अधिक होनी चाहिए। अवयस्कों की कुंडली का विश्लेषण उनके माता-पिता या संरक्षक की सहमति से ही किया जाता है।'}
                </p>

                <h4 className="font-bold text-amber-300 text-sm sm:text-base pt-2">
                  {lang === 'en' ? '2. Voluntary Dakshina / Consultation Fee' : lang === 'gu' ? '૨. સ્વેચ્છિક દક્ષિણા / શુલ્ક' : '2. दक्षिणा एवं शुल्क व्यवस्था'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'Dakshina or consultation fees paid via UPI / QR / Bank Transfer are for the dedicated time and astrological calculations performed by Pandit Ji. There are no automated recurring subscriptions or hidden charges.'
                    : lang === 'gu'
                    ? 'UPI અથવા બેંક દ્વારા અપાતી દક્ષિણા પંડિતજીના સમય અને શાસ્ત્રોક્ત ગણતરી માટે છે. કોઈ છુપા શુલ્ક કે ઓટો-કટ સબ્સ્ક્રિપ્શન નથી.'
                    : 'UPI / PhonePe अथवा बैंक द्वारा प्रेषित दक्षिणा पंडित जी के समय एवं वैदिक गणना के लिए होती है। इसमें कोई ऑटो-डेबिट या आवर्ती (recurring) छिपे शुल्क नहीं होते।'}
                </p>

                <h4 className="font-bold text-amber-300 text-sm sm:text-base pt-2">
                  {lang === 'en' ? '3. Code of Conduct & Dignity' : lang === 'gu' ? '૩. સન્માનજનક વાર્તાલાપ' : '3. संवाद एवं मर्यादा का नियम'}
                </h4>
                <p className="text-stone-300">
                  {lang === 'en'
                    ? 'We maintain the highest spiritual decorum and respectful conduct. Any abusive, illegal, or harassing behavior will lead to the immediate termination of the consultation.'
                    : lang === 'gu'
                    ? 'અમે સન્માનજનક અને પવિત્ર વાતાવરણ જાળવી રાખીએ છીએ. કોઈપણ અયોગ્ય ભાષા કે વર્તન સ્વીકાર્ય રહેશે નહીં.'
                    : 'संस्थान हमेशा मर्यादित एवं सम्मानजनक वातावरण में परामर्श प्रदान करता है। किसी भी प्रकार की अभद्र भाषा या अनुचित आचरण पर परामर्श तुरंत निरस्त किया जा सकता है।'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-950 px-5 py-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-stone-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {lang === 'en'
                ? 'Certified Vedic Institute • Reg. No: GJ-2024-MEH-ASTRO-089'
                : lang === 'gu'
                ? 'પ્રમાણિત વૈદિક સંસ્થા • નોંધણી: GJ-2024-MEH-ASTRO-089'
                : 'प्रमाणित वैदिक संस्थान • पंजी. सं.: GJ-2024-MEH-ASTRO-089'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {lang === 'en' ? 'Close Window' : lang === 'gu' ? 'બંધ કરો' : 'विंडो बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
