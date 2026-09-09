import React, { useState } from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, CheckCircle2, Sparkles, Send, User, PhoneCall, AlertCircle } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Language } from '../types/astrology';

interface QuickCallBackWidgetProps {
  lang: Language;
  isDark?: boolean;
}

const COMMON_PROBLEMS = [
  { id: 'marriage', hi: 'विवाह में बाधा / शादी में देरी', gu: 'લગ્નમાં વિલંબ / અડચણ', en: 'Marriage Delay / Obstacles', icon: '💍' },
  { id: 'love_family', hi: 'प्रेम विवाह / दांपत्य जीवन में कलह', gu: 'પ્રેમ લગ્ન / ગૃહ કંકાસ', en: 'Love Marriage / Family Issues', icon: '❤️' },
  { id: 'business_career', hi: 'नौकरी में रुकावट / व्यापार में घाटा', gu: 'નોકરી / વેપારમાં ખોટ', en: 'Career / Business Loss', icon: '💼' },
  { id: 'debt_finance', hi: 'कर्ज मुक्ति / आर्थिक तंगी', gu: 'દેવા મુક્તિ / આર્થિક તંગી', en: 'Debt Relief / Financial Crisis', icon: '💰' },
  { id: 'child', hi: 'संतान प्राप्ति में विलंब / चिंता', gu: 'સંતાન પ્રાપ્તિમાં વિલંબ', en: 'Child / Progeny Concern', icon: '👶' },
  { id: 'kundli_dosha', hi: 'मांगलिक / कालसर्प / शनि साढ़ेसाती दोष', gu: 'માંગલિક / કાલસર્પ / શનિ દોષ', en: 'Manglik / Kaalsarp / Shani Dosha', icon: '🪐' },
];

export const QuickCallBackWidget: React.FC<QuickCallBackWidgetProps> = ({ lang, isDark = false }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(COMMON_PROBLEMS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError(
        lang === 'en'
          ? 'Please enter a valid 10-digit mobile number'
          : lang === 'hi'
          ? 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें'
          : 'કૃપા કરીને સાચો 10 આંકડાનો મોબાઇલ નંબર દાખલ કરો'
      );
      return;
    }
    setError('');

    const problemObj = COMMON_PROBLEMS.find((p) => p.id === selectedProblem);
    const problemText = lang === 'en' ? problemObj?.en : lang === 'hi' ? problemObj?.hi : problemObj?.gu;

    const message = `🙏 *सादर प्रणाम पंडित जी*\n\n*वेबसाइट से नया कॉल-बैक अनुरोध:*\n👤 *नाम:* ${name.trim() || 'जातक'}\n📞 *फोन नंबर:* ${cleanPhone}\n❓ *समस्या:* ${problemText}\n\n_कृपया यथाशीघ्र संपर्क करने की कृपा करें।_`;

    // Send via WhatsApp directly so Pandit Ji gets instant lead ping
    const whatsappUrl = `https://wa.me/${ASTROLOGER_INFO.whatsappRaw || '919909087902'}?text=${encodeURIComponent(message)}`;
    
    setSubmitted(true);
    // Open WhatsApp in background/tab so notification delivers immediately
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="quick-callback-widget"
      className={`rounded-3xl p-5 sm:p-7 border-2 shadow-xl my-6 transition-all ${
        isDark
          ? 'bg-gradient-to-br from-stone-900 via-amber-950/30 to-stone-900 border-amber-500/40 text-stone-100'
          : 'bg-gradient-to-br from-[#FFF9F3] via-amber-50/70 to-[#FFF4E8] border-amber-400/60 shadow-amber-900/10 text-stone-900'
      }`}
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 pb-4 border-b border-amber-400/30">
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white flex items-center justify-center shadow-md shrink-0">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF671F] bg-orange-100 dark:bg-orange-950/80 px-2 py-0.5 rounded-md border border-orange-300 dark:border-orange-700">
                {lang === 'en' ? 'Quick Callback' : 'निःशुल्क कॉल-बैक'}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                {lang === 'en' ? 'Within 10 Mins' : '१० मिनट में संपर्क'}
              </span>
            </div>
            <h3 className="font-yatra text-lg sm:text-xl text-[#852E10] dark:text-amber-300 font-bold leading-tight mt-0.5">
              {lang === 'en'
                ? 'Hesitating to Call? Request a Free Call-Back'
                : lang === 'hi'
                ? 'कॉल करने में संकोच है? अपना नंबर डालें — पंडित जी स्वयं कॉल करेंगे'
                : 'કોલ કરવામાં સંકોચ છે? નંબર નાખો — પંડિતજી સામેથી કોલ કરશે'}
            </h3>
          </div>
        </div>

        {/* Direct Instant Call Alternative */}
        <a
          href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
          className="inline-flex items-center gap-2 bg-[#FF671F] hover:bg-[#E05312] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
          title="सीधा फोन लगाएं"
        >
          <Phone className="w-4 h-4 fill-current animate-bounce" />
          <span>{lang === 'en' ? 'Or Call Directly Now' : 'या तुरंत सीधा फोन मिलाएं'}</span>
        </a>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="font-yatra text-xl text-emerald-800 dark:text-emerald-300 font-bold">
            {lang === 'en'
              ? 'Request Received Successfully!'
              : lang === 'hi'
              ? 'अनुरोध सफलतापूर्वक प्राप्त हुआ!'
              : 'વિનંતી સફળતાપૂર્વક મળી ગઈ છે!'}
          </h4>
          <p className="text-sm text-stone-700 dark:text-stone-300 max-w-md mx-auto">
            {lang === 'en'
              ? `Pandit Sri Virendra Kumar Joshi will call you on ${phone} shortly. Your consultation is 100% confidential.`
              : lang === 'hi'
              ? `पंडित श्री विरेंद्र कुमार जोशी जी कुछ ही देर में आपके नंबर ${phone} पर सीधे कॉल करेंगे। आपकी समस्या पूर्णतः गुप्त रखी जाएगी।`
              : `પંડિત શ્રી વિરેન્દ્ર કુમાર જોશી ટૂંક સમયમાં તમારા નંબર ${phone} પર સીધો કોલ કરશે.`}
          </p>
          <div className="pt-2">
            <a
              href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
              className="inline-flex items-center gap-2 bg-[#FF671F] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{lang === 'en' ? 'Need Urgent Answer? Call Now' : 'तुरंत समाधान चाहिए? अभी कॉल करें'}</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Select Problem */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              {lang === 'en'
                ? '1. Select Your Issue (Confidential):'
                : lang === 'hi'
                ? '१. अपनी समस्या चुनें (पूर्णतः गोपनीय):'
                : '૧. તમારી સમસ્યા પસંદ કરો:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMMON_PROBLEMS.map((problem) => {
                const isSelected = selectedProblem === problem.id;
                return (
                  <button
                    key={problem.id}
                    type="button"
                    onClick={() => setSelectedProblem(problem.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-[#FF671F] text-[#852E10] dark:text-amber-200 shadow-xs font-bold'
                        : isDark
                        ? 'bg-stone-800/80 border-stone-700 text-stone-300 hover:border-amber-500/40'
                        : 'bg-white border-amber-200 text-stone-800 hover:border-amber-400'
                    }`}
                  >
                    <span className="text-base shrink-0">{problem.icon}</span>
                    <span className="truncate leading-tight">
                      {lang === 'en' ? problem.en : lang === 'hi' ? problem.hi : problem.gu}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Name & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {lang === 'en' ? 'Your Name (Optional):' : lang === 'hi' ? 'आपका नाम (वैकल्पिक):' : 'તમારું નામ (વૈકલ્પિક):'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Rahul Sharma' : 'उदा. राहुल शर्मा'}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:ring-2 focus:ring-[#FF671F] focus:outline-hidden ${
                    isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-amber-300 text-stone-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {lang === 'en' ? 'Your 10-Digit Mobile Number *:' : lang === 'hi' ? 'आपका १० अंकों का मोबाइल नंबर *:' : 'મોબાઇલ નંબર *:'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lang === 'en' ? 'Enter 10-digit number' : '98XXXXXXXX'}
                  maxLength={13}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-sm border focus:ring-2 focus:ring-[#FF671F] focus:outline-hidden ${
                    isDark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-amber-300 text-stone-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button & Trust Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-[11px] text-stone-600 dark:text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {lang === 'en'
                  ? '100% Confidential. No spam, only direct guidance.'
                  : '१००% पूर्णतः गोपनीय। कोई स्पैम नहीं, केवल शास्त्रोक्त मार्गदर्शन।'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF671F] via-[#E05312] to-[#B83E07] hover:from-[#E05312] hover:to-[#993D12] text-white font-yatra font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {lang === 'en'
                  ? 'Request Pandit Ji to Call Me'
                  : lang === 'hi'
                  ? 'पंडित जी से कॉल बैक का अनुरोध करें'
                  : 'પંડિતજી પાસે કોલ બેકની વિનંતી કરો'}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
