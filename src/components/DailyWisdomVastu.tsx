import React, { useState } from 'react';
import { Compass, BookOpen, RefreshCw, Sparkles, CheckCircle2, Home, Sun } from 'lucide-react';

interface DailyWisdomVastuProps {
  lang: 'hi' | 'gu';
  isDark?: boolean;
}

interface ShlokaData {
  sanskrit: string;
  source: { hi: string; gu: string };
  meaning: { hi: string; gu: string };
}

interface VastuData {
  title: { hi: string; gu: string };
  direction: { hi: string; gu: string };
  guidance: { hi: string; gu: string };
  benefit: { hi: string; gu: string };
  icon: string;
}

const SHLOKAS: ShlokaData[] = [
  {
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    source: { hi: 'श्रीमद्भगवद्गीता (अध्याय 2, श्लोक 47)', gu: 'શ્રીમદ્ ભગવદ્ ગીતા (અધ્યાય 2, શ્લોક 47)' },
    meaning: {
      hi: 'तुम्हारा अधिकार केवल कर्म करने में है, फल की चिंता में नहीं। इसलिए निष्काम भाव से निरंतर श्रेष्ठ कर्म करते रहो।',
      gu: 'તમારો અધિકાર માત્ર કર્મ કરવામાં છે, ફળની ચિંતામાં નહીં. માટે સતત શ્રેષ્ઠ કર્મ કરતા રહો.'
    }
  },
  {
    sanskrit: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥',
    source: { hi: 'हितोपदेश (प्रस्ताविका)', gu: 'હિતોપદેશ' },
    meaning: {
      hi: 'सभी कार्य परिश्रम और पुरुषार्थ से ही सिद्ध होते हैं, केवल सोचने से नहीं। सोते हुए सिंह के मुख में हिरण स्वयं नहीं आता।',
      gu: 'બધા કાર્યો પરિશ્રમથી જ સિદ્ધ થાય છે, માત્ર મનોરથોથી નહીં. સૂતેલા સિંહના મોંમાં શિકાર આપમેળે આવતો નથી.'
    }
  },
  {
    sanskrit: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्॥',
    source: { hi: 'बृहदारण्यक उपनिषद्', gu: 'બૃહદારણ્યક ઉપનિષદ્' },
    meaning: {
      hi: 'सभी सुखी हों, सभी रोगमुक्त व निरोगी हों, सभी का मंगलमय कल्याण हो और संसार में किसी को भी कोई कष्ट न हो।',
      gu: 'બધા સુખી થાય, બધા નિરોગી બને, સૌનું કલ્યાણ થાય અને કોઈને પણ દુઃખ ન થાય.'
    }
  },
  {
    sanskrit: 'विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥',
    source: { hi: 'नीति शतक', gu: 'નીતિ શતક' },
    meaning: {
      hi: 'सच्ची विद्या नम्रता देती है, नम्रता से योग्यता, योग्यता से धन, धन से धर्म और धर्म से परम सुख की प्राप्ति होती है।',
      gu: 'સાચી વિદ્યા નમ્રતા આપે છે, નમ્રતાથી યોગ્યતા, યોગ્યતાથી ધન, ધનથી ધર્મ અને તેનાથી પરમ સુખ મળે છે.'
    }
  }
];

const VASTU_TIPS: VastuData[] = [
  {
    title: { hi: 'ईशान कोण (North-East) की दिव्य ऊर्जा', gu: 'ઈશાન ખૂણો (North-East) દિવ્ય ઊર્જા' },
    direction: { hi: 'उत्तर-पूर्व दिशा (ईशान)', gu: 'ઉત્તર-પૂર્વ દિશા (ઈશાન)' },
    guidance: {
      hi: 'घर के ईशान कोण को हमेशा स्वच्छ, हल्का व खुला रखें। यहां कलश में गंगाजल, पूजा स्थल या तुलसी का पौधा रखना सर्वोत्तम है।',
      gu: 'ઘરના ઈશાન ખૂણાને હંમેશાં સાફ અને હળવો રાખો. અહીં પૂજા સ્થળ કે તુલસીનો છોડ રાખવો શ્રેષ્ઠ છે.'
    },
    benefit: {
      hi: 'सकारात्मक ऊर्जा का संचार और मानसिक तनाव से पूर्ण मुक्ति',
      gu: 'સકારાત્મક ઊર્જા અને માનસિક શાંતિ'
    },
    icon: '🕉️'
  },
  {
    title: { hi: 'तिजोरी व धन संग्रह की सही दिशा', gu: 'તિજોરી અને ધન સ્થાન' },
    direction: { hi: 'दक्षिण या नैऋत्य दिशा', gu: 'દક્ષિણ અથવા નૈઋત્ય દિશા' },
    guidance: {
      hi: 'धन रखने की अलमारी को दक्षिण दीवार के सहारे इस प्रकार रखें कि उसका दरवाजा उत्तर (कुबेर दिशा) की ओर खुले।',
      gu: 'તિજોરીને દક્ષિણ દિવાલ તરફ રાખો જેથી તેનો દરવાજો ઉત્તર (કુબેર દિશા) તરફ ખૂલે.'
    },
    benefit: {
      hi: 'अनावश्यक फिजूलखर्ची पर रोक और स्थायी धन-वैभव की वृद्धि',
      gu: 'બિનજરૂરી ખર્ચ અટકે અને લક્ષ્મીજીની કૃપા જળવાય'
    },
    icon: '💰'
  },
  {
    title: { hi: 'रसोईघर (Kitchen) और आग्नेय ऊर्जा', gu: 'રસોડું અને અગ્નિ ઊર્જા' },
    direction: { hi: 'दक्षिण-पूर्व दिशा (आग्नेय कोण)', gu: 'દક્ષિણ-પૂર્વ દિશા (અગ્નિ ખૂણો)' },
    guidance: {
      hi: 'खाना बनाते समय गृहणी का मुख पूर्व दिशा की ओर होना चाहिए। चूल्हे और पानी के नल के बीच उचित दूरी रखें।',
      gu: 'રસોઈ કરતી વખતે મુખ પૂર્વ દિશામાં હોવું જોઈએ. ગેસ અને પાણી વચ્ચે યોગ્ય અંતર રાખો.'
    },
    benefit: {
      hi: 'परिवार के सभी सदस्यों का उत्तम स्वास्थ्य व अन्नपूर्णा की कृपा',
      gu: 'પરિવારનું ઉત્તમ સ્વાસ્થ્ય અને અન્નપૂર્ણાની કૃપા'
    },
    icon: '🔥'
  },
  {
    title: { hi: 'मुख्य द्वार (Main Entrance) का वास्तु', gu: 'મુખ્ય દ્વારનું વાસ્તુ' },
    direction: { hi: 'उत्तर या पूर्व दिशा', gu: 'ઉત્તર અથવા પૂર્વ દિશા' },
    guidance: {
      hi: 'मुख्य द्वार पर हल्दी-कंकू से ॐ या स्वास्तिक का चिह्न बनाएं। शाम के समय मुख्य द्वार पर घी/तिल का दीपक जलाएं।',
      gu: 'મુખ્ય દરવાજા પર કંકુથી સ્વસ્તિક બનાવો અને સાંજે દીવો પ્રગટાવો.'
    },
    benefit: {
      hi: 'नकारात्मक ऊर्जा का प्रवेश वर्जित और गृह में सौभाग्य आगमन',
      gu: 'નકારાત્મક શક્તિઓ દૂર થાય અને સુખ-શાંતિ વધે'
    },
    icon: '🚪'
  }
];

export const DailyWisdomVastu: React.FC<DailyWisdomVastuProps> = ({ lang, isDark = false }) => {
  const [shlokaIndex, setShlokaIndex] = useState(0);
  const [vastuIndex, setVastuIndex] = useState(0);

  const nextShloka = () => {
    setShlokaIndex((prev) => (prev + 1) % SHLOKAS.length);
  };

  const nextVastu = () => {
    setVastuIndex((prev) => (prev + 1) % VASTU_TIPS.length);
  };

  const shloka = SHLOKAS[shlokaIndex];
  const vastu = VASTU_TIPS[vastuIndex];

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: Daily Vedic Shloka */}
        <div 
          className={`rounded-3xl p-6 border transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col justify-between ${
            isDark 
              ? 'bg-slate-900/90 border-amber-500/30 text-amber-100 shadow-amber-950/30' 
              : 'bg-gradient-to-br from-[#FFF9F5] via-white to-[#FFF5F0] border-[#FF671F]/25 text-stone-950 shadow-[#FF671F]/5'
          }`}
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#FF671F]/15 text-[#FF671F]">
                  <BookOpen className="w-4 h-4" />
                </span>
                <span className="font-yatra text-sm text-[#CC5218] font-bold">
                  {lang === 'hi' ? 'दैनिक वैदिक सुविचार एवं श्लोक' : 'દૈનિક વૈદિક સુવિચાર અને શ્લોક'}
                </span>
              </div>

              <button
                type="button"
                onClick={nextShloka}
                className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                  isDark 
                    ? 'border-amber-700/60 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60' 
                    : 'border-[#FF671F]/30 bg-white text-[#CC5218] hover:bg-[#FFF5F0]'
                }`}
                title="अन्य श्लोक देखें"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{lang === 'hi' ? 'अन्य श्लोक' : 'અન્ય શ્લોક'}</span>
              </button>
            </div>

            <div className={`p-4 rounded-2xl border-l-4 border-amber-500 mb-3 ${isDark ? 'bg-slate-950/60' : 'bg-[#FFF5F0]'}`}>
              <p className="font-serif text-sm sm:text-base font-bold text-stone-950 dark:text-amber-300 leading-relaxed italic">
                "{shloka.sanskrit}"
              </p>
              <p className="text-[11px] text-right mt-1.5 text-stone-900 dark:text-stone-400 font-sans font-bold">
                — {shloka.source[lang]}
              </p>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed mt-2 text-stone-950 dark:text-stone-200 font-medium">
              <strong className="text-amber-950 dark:text-amber-400 font-bold">
                {lang === 'hi' ? 'सरल भावार्थ: ' : 'સરળ ભાવાર્થ: '}
              </strong>
              {shloka.meaning[lang]}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] flex items-center gap-2 text-stone-950 dark:text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{lang === 'hi' ? 'प्रातःकाल इस श्लोक का स्मरण करने से दिन शुभ और ऊर्जावान बनता है।' : 'સવારે આ શ્લોકનું સ્મરણ કરવાથી દિવસ મંગળમય બને છે.'}</span>
          </div>
        </div>

        {/* Box 2: Daily Vastu Tip */}
        <div 
          className={`rounded-3xl p-6 border transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col justify-between ${
            isDark 
              ? 'bg-slate-900/90 border-amber-500/30 text-amber-100 shadow-amber-950/30' 
              : 'bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF9F5] border-[#FF671F]/25 text-stone-950 shadow-[#FF671F]/5'
          }`}
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-orange-500/15 text-orange-600">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="font-yatra text-sm text-[#CC5218] font-bold">
                  {lang === 'hi' ? 'दैनिक वास्तु उपाय (Vastu Tip of the Day)' : 'દૈનિક વાસ્તુ ઉપાય (Vastu Tip)'}
                </span>
              </div>

              <button
                type="button"
                onClick={nextVastu}
                className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                  isDark 
                    ? 'border-amber-700/60 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60' 
                    : 'border-[#FF671F]/30 bg-white text-[#CC5218] hover:bg-[#FFF5F0]'
                }`}
                title="अन्य वास्तु उपाय"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{lang === 'hi' ? 'अन्य उपाय' : 'અન્ય ઉપાય'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h4 className="font-yatra text-base sm:text-lg text-stone-950 dark:text-amber-300 flex items-center gap-2">
                <span>{vastu.icon}</span>
                <span>{vastu.title[lang]}</span>
              </h4>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${isDark ? 'bg-amber-950/80 border-amber-700 text-amber-300' : 'bg-[#FFF5F0] border-[#FF671F]/30 text-[#CC5218]'}`}>
                {vastu.direction[lang]}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed mt-2 text-stone-950 dark:text-stone-200 font-medium">
              {vastu.guidance[lang]}
            </p>

            <div className={`mt-3 p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${isDark ? 'bg-emerald-950/40 border-emerald-700/40 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-950'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>{lang === 'hi' ? 'वास्तु फल: ' : 'વાસ્તુ ફળ: '}</strong>
                {vastu.benefit[lang]}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] flex items-center gap-2 text-stone-900 dark:text-stone-400 font-medium">
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'hi' ? 'गृह, दुकान एवं ऑफिस में वास्तु दोष निवारण हेतु प्रामाणिक शास्त्रीय नियम।' : 'ઘર અને દુકાનમાં વાસ્તુ દોષ નિવારણ માટે પ્રમાણિક શાસ્ત્રીય નિયમો.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
