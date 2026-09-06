import React from 'react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { MapPin, Phone, MessageCircle, Clock, Mail, Navigation, Facebook, Instagram, Share2, ShieldCheck } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';
import { RajputSymbol } from './RajputSymbol';
import { Language } from '../types/astrology';

interface ContactSectionProps {
  lang: Language;
  isDark?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  isDark = false,
}) => {
  const getAddress = () => {
    if (lang === 'en') return ASTROLOGER_INFO.addressEn;
    if (lang === 'hi') return ASTROLOGER_INFO.address;
    return ASTROLOGER_INFO.addressGu;
  };

  const getTimings = () => {
    if (lang === 'en') return ASTROLOGER_INFO.timingsEn;
    return ASTROLOGER_INFO.timings;
  };

  return (
    <section id="contact-section" className="py-8 sm:py-12 px-4 max-w-6xl mx-auto">
      {/* Title & Subtitle - Beautifully Aligned & Structured */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        {/* Badges Row - North Gujarat Heritage & Official Govt Registration */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-xs ${
            isDark 
              ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' 
              : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-[#CC5218] border-amber-400/50'
          }`}>
            <RajputSymbol size="xs" />
            <span className="font-['Cinzel'] tracking-wide">
              {lang === 'en'
                ? '✦ Royal Astrological Sansthan of North Gujarat ✦'
                : lang === 'hi'
                ? '✦ उत्तर गुजरात का प्रतिष्ठित राजज्योतिष संस्थान ✦'
                : '✦ ઉત્તર ગુજરાતનું પ્રતિષ્ઠિત રાજજ્યોતિષ સંસ્થાન ✦'}
            </span>
          </div>

          {/* Official Govt. Registration Number Badge */}
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-xs ${
            isDark
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-500/50 text-emerald-900'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{lang === 'en' ? 'Govt. Regd. No.:' : 'पंजीकरण संख्या:'}</span>
            <span className="font-mono font-black tracking-wider text-[#B83E07] dark:text-amber-300">
              {ASTROLOGER_INFO.registrationNo}
            </span>
            <VerifiedBadge size="xs" tooltipText="शासकीय पंजीकृत वैदिक संस्थान" />
          </div>
        </div>

        {/* Main Title - Perfectly Symmetrical & Centered */}
        <h2 className="font-['Marcellus'] font-serif text-center flex flex-col items-center justify-center mb-3">
          {/* Main Institution Name */}
          <span className="text-3xl sm:text-5xl font-black text-[#852E10] dark:text-amber-400 tracking-tight flex items-center justify-center gap-2 flex-wrap">
            <span>
              {lang === 'en' ? 'Bhavani Jyotish Kendra' : lang === 'hi' ? 'भवानी ज्योतिष केंद्र' : 'ભવાની જ્યોતિષ કેન્દ્ર'}
            </span>
            <VerifiedBadge size="sm" tooltipText="सत्यापित मुख्य ज्योतिष संस्थान" />
          </span>

          {/* Subtitle - Contact & Office Address with Balanced Decorative Dividers */}
          <span className="text-base sm:text-2xl md:text-3xl text-stone-700 dark:text-amber-200 font-semibold mt-1.5 flex items-center justify-center gap-2 sm:gap-4 w-full">
            <span className="hidden xs:block flex-1 max-w-[40px] sm:max-w-[120px] h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 rounded-full" />
            <span className="tracking-wide text-[#B83E07] dark:text-amber-300 text-center">
              {lang === 'en'
                ? 'Contact & Office Address'
                : lang === 'hi'
                ? 'संपर्क एवं कार्यालय पता'
                : 'સંપર્ક અને કાર્યાલય સરનામું'}
            </span>
            <span className="hidden xs:block flex-1 max-w-[40px] sm:max-w-[120px] h-0.5 bg-gradient-to-l from-transparent via-amber-400 to-amber-500 rounded-full" />
          </span>
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-stone-800 font-medium dark:text-stone-300 max-w-2xl mx-auto leading-relaxed text-center">
          {lang === 'en'
            ? 'In-person visits available at our Mehsana office. Phone & WhatsApp consultations available for distant and international clients.'
            : lang === 'hi'
            ? 'मेहसाणा कार्यालय में व्यक्तिगत भेंट, कुंडली फलादेश अथवा दूरस्थ जातकों हेतु फोन/व्हाट्सएप परामर्श उपलब्ध है।'
            : 'મહેસાણા ઓફિસમાં રૂબરૂ મુલાકાત અથવા ફોન/વોટ્સએપ દ્વારા જ્યોતિષીય પરામર્શ મેળવો.'}
        </p>
      </div>

      {/* Main Container */}
      <div className={`rounded-3xl p-6 sm:p-10 border-2 shadow-2xl space-y-8 ${
        isDark 
          ? 'bg-slate-900 border-amber-500/40 text-stone-100' 
          : 'bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF9F2] border-amber-400/40 shadow-xl shadow-amber-900/5 text-stone-950'
      }`}>
        {/* Top 4 Key Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Address Card */}
          <div className={`p-6 rounded-2xl border-2 space-y-4 shadow-sm ${
            isDark ? 'bg-slate-950 border-amber-500/30 text-stone-100' : 'bg-[#FFF8F4] border-[#FF671F]/30 text-black'
          }`}>
            <div className="flex items-center gap-2.5 font-black text-lg">
              <div className="p-2.5 rounded-xl bg-[#FF671F] text-white shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-black dark:text-amber-400 text-lg font-black">
                {lang === 'en' ? 'Complete Office Address' : lang === 'hi' ? 'कार्यालय का पूरा पता (Address)' : 'ઓફિસનું પૂરું સરનામું'}
              </span>
            </div>

            <div className="space-y-2 pl-1">
              <p className="text-lg sm:text-xl text-black font-black dark:text-stone-100 leading-snug">
                {getAddress()}
              </p>
              <p className="text-sm sm:text-base text-black font-bold dark:text-stone-300">
                {lang === 'en'
                  ? 'Landmark: Nagalpur Main Road, Mehsana - 384002 (North Gujarat)'
                  : lang === 'hi'
                  ? 'लैंडमार्क: नागलपुर मुख्य मार्ग, मेहसाणा - 384002 (उत्तर गुजरात)'
                  : 'લેન્ડમાર્ક: નાગલપુર મુખ્ય માર્ગ, મહેસાણા - 384002 (ગુજરાત)'}
              </p>

              {/* Registration Information */}
              <div className="flex items-center gap-2 pt-2 border-t border-amber-500/20 flex-wrap text-xs sm:text-sm">
                <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'en' ? 'Registration No:' : 'संस्थान पंजीकरण संख्या:'}</span>
                </span>
                <span className="font-mono font-black text-[#852E10] dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-400/50">
                  {ASTROLOGER_INFO.registrationNo}
                </span>
                <VerifiedBadge size="xs" tooltipText="शासकीय अधिकृत संस्थान" />
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Nagalpur+Mehsana+Gujarat+384002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#CC5218] hover:bg-[#A33E0E] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>
                {lang === 'en'
                  ? 'Get Directions on Google Maps'
                  : lang === 'hi'
                  ? 'गूगल मैप्स पर रास्ता देखें (Navigate)'
                  : 'ગૂગલ મેપ્સ પર રસ્તો જુઓ'}
              </span>
            </a>
          </div>

          {/* 2. Direct Phone & WhatsApp Card */}
          <div className={`p-6 rounded-2xl border-2 space-y-4 shadow-sm ${
            isDark ? 'bg-slate-950 border-amber-500/30 text-stone-100' : 'bg-[#FFF8F4] border-[#FF671F]/30 text-black'
          }`}>
            <div className="flex items-center gap-2.5 font-black text-lg">
              <div className="p-2.5 rounded-xl bg-[#FF671F] text-white shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-black dark:text-amber-400 text-lg font-black">
                {lang === 'en' ? 'Direct Phone & WhatsApp Contact' : lang === 'hi' ? 'सीधा फोन व व्हाट्सएप संपर्क' : 'સીધો ફોન અને વોટ્સએપ'}
              </span>
            </div>

            <div className="space-y-1 pl-1">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="block text-2xl sm:text-3xl text-black hover:text-[#CC5218] font-black dark:text-amber-300 transition-colors"
              >
                {ASTROLOGER_INFO.phonePrimary}
              </a>
              <p className="text-sm sm:text-base text-black font-bold dark:text-stone-300 flex items-center gap-1.5 flex-wrap">
                <span>{lang === 'en' ? 'Pandit Virendra Kumar Joshi' : lang === 'hi' ? 'पंडित श्री विरेंद्र कुमार जोशी' : 'પંડિત શ્રી વિરેન્દ્ર કુમાર જોશી'}</span>
                <VerifiedBadge size="sm" tooltipText="सत्यापित मुख्य ज्योतिषी" />
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="inline-flex items-center gap-1.5 bg-[#FF671F] hover:bg-[#CC5218] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{lang === 'en' ? 'Call Now' : lang === 'hi' ? 'कॉल करें' : 'કોલ કરો'}</span>
              </a>

              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  getWhatsAppConsultationMessage(lang)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'en' ? 'WhatsApp Chat' : lang === 'hi' ? 'व्हाट्सएप चैट' : 'વોટ્સએપ'}</span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp चैट" />
              </a>
            </div>
          </div>

          {/* 3. Timings Card */}
          <div className={`p-6 rounded-2xl border-2 space-y-4 shadow-sm ${
            isDark ? 'bg-slate-950 border-amber-500/30 text-stone-100' : 'bg-[#FFF8F4] border-[#FF671F]/30 text-black'
          }`}>
            <div className="flex items-center gap-2.5 font-black text-lg">
              <div className="p-2.5 rounded-xl bg-[#FF671F] text-white shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-black dark:text-amber-400 text-lg font-black">
                {lang === 'en' ? 'Consultation Hours' : lang === 'hi' ? 'परामर्श समय (Consultation Hours)' : 'મુલાકાત સમય'}
              </span>
            </div>

            <div className="space-y-2 pl-1">
              <p className="text-lg sm:text-xl text-black font-black dark:text-stone-100">
                {getTimings()}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-950 font-black bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-3.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700">
                <span>✅</span>
                <span>
                  {lang === 'en' ? 'Open 7 Days a Week (Including Sunday)' : lang === 'hi' ? 'सातों दिन खुला (रविवार सहित)' : 'સાતેય દિવસ ખુલ્લું'}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Email & Digital Consultation Card */}
          <div className={`p-6 rounded-2xl border-2 space-y-4 shadow-sm ${
            isDark ? 'bg-slate-950 border-amber-500/30 text-stone-100' : 'bg-[#FFF8F4] border-[#FF671F]/30 text-black'
          }`}>
            <div className="flex items-center gap-2.5 font-black text-lg">
              <div className="p-2.5 rounded-xl bg-[#FF671F] text-white shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-black dark:text-amber-400 text-lg font-black">
                {lang === 'en' ? 'Email & Online Consultation' : lang === 'hi' ? 'ईमेल एवं ऑनलाइन परामर्श (Email)' : 'ઈમેલ અને ઓનલાઇન પરામર્શ'}
              </span>
            </div>

            <div className="space-y-2 pl-1">
              <a
                href={`mailto:${ASTROLOGER_INFO.email}`}
                className="block text-base sm:text-lg text-black hover:text-[#CC5218] font-black dark:text-stone-100 break-all transition-colors underline decoration-black/40"
              >
                {ASTROLOGER_INFO.email}
              </a>
              <p className="text-xs sm:text-sm text-black font-bold dark:text-stone-300">
                {lang === 'en'
                  ? 'NRI & distant clients can request online Janampatri analysis & remedies via email/WhatsApp.'
                  : lang === 'hi'
                  ? 'दूरस्थ एवं NRI जातक ऑनलाइन जन्मपत्री व उपाय हेतु संपर्क कर सकते हैं।'
                  : 'દૂરના અને NRI જાતકો ઓનલાઇન કુંડળી વિશ્લેષણ માટે સંપર્ક કરી શકે છે.'}
              </p>
            </div>
          </div>
        </div>

        {/* How to Reach Guide */}
        <div className={`p-6 rounded-2xl border-2 space-y-3 ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-200 text-black'
        }`}>
          <h4 className="font-yatra text-xl text-black dark:text-amber-400 flex items-center gap-2 font-black">
            <span>🚗</span>
            <span>
              {lang === 'en'
                ? 'How to Reach Mehsana Center?'
                : lang === 'hi'
                ? 'कार्यालय कैसे पहुंचें? (How to Reach Mehsana Center)'
                : 'ઓફિસ કેવી રીતે પહોંચવું?'}
            </span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-bold">
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200 dark:border-slate-700">
              <span className="block text-[#CC5218] dark:text-amber-400 font-black mb-1 text-sm">
                🚂 {lang === 'en' ? 'Railway Station' : 'रेलवे स्टेशन'}
              </span>
              <span className="text-black dark:text-stone-200">
                {lang === 'en'
                  ? 'Just 3.5 KM (10 mins) from Mehsana Junction'
                  : 'मेहसाणा जंक्शन (Mehsana Jn) से मात्र 3.5 KM (10 मिनट)'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200 dark:border-slate-700">
              <span className="block text-[#CC5218] dark:text-amber-400 font-black mb-1 text-sm">
                🚌 {lang === 'en' ? 'Bus Stand' : 'बस स्टैंड'}
              </span>
              <span className="text-black dark:text-stone-200">
                {lang === 'en'
                  ? 'Direct auto from Nagalpur Bus Stop / GSRTC Central Bus Station'
                  : 'नागलपुर बस स्टॉप / मेहसाणा GSRTC बस पोर्ट से सुलभ ऑटो सेवा'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200 dark:border-slate-700">
              <span className="block text-[#CC5218] dark:text-amber-400 font-black mb-1 text-sm">
                ✈️ {lang === 'en' ? 'Nearest Airport' : 'निकटतम हवाई अड्डा'}
              </span>
              <span className="text-black dark:text-stone-200">
                {lang === 'en'
                  ? 'Ahmedabad International Airport (SVP) ~68 KM (1.5 hours)'
                  : 'अहमदाबाद इंटरनेशनल एयरपोर्ट (SVP) से ~68 KM (1.5 घंटे)'}
              </span>
            </div>
          </div>
        </div>

        {/* Social Media & Online Channels */}
        <div className={`p-6 rounded-2xl border-2 space-y-4 ${
          isDark ? 'bg-slate-950/90 border-amber-500/30' : 'bg-[#FFFDF9] border-amber-300 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3 pb-3 border-b border-amber-500/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FF671F] text-white shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-yatra text-lg text-black dark:text-amber-400 font-bold leading-tight">
                  {lang === 'en' ? 'Follow Bhavani Jyotish on Social Media' : lang === 'hi' ? 'भवानी ज्योतिष के सोशल मीडिया हैंडल्स' : 'ભવાની જ્યોતિષ સોશિયલ મીડિયા'}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  {lang === 'en' ? 'Get daily panchang, rashifal, festival muhurats and live astrological remedies' : 'दैनिक पंचांग, राशिफल, विशेष पर्व मुहूर्त एवं प्रमाणित ज्योतिषीय उपाय'}
                </p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-[#CC5218] dark:text-amber-300 font-bold border border-amber-300/40 shrink-0 self-start sm:self-center">
              {lang === 'en' ? 'Official Links' : 'आधिकारिक लिंक्स'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <a
              href={ASTROLOGER_INFO.socialLinks?.instagram || "https://www.instagram.com/writeusonastro/"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/40 dark:hover:bg-pink-900/60 border border-pink-200 dark:border-pink-800 transition-all hover:scale-105 text-center group shadow-xs"
            >
              <Instagram className="w-7 h-7 text-pink-600 dark:text-pink-400 mb-1.5 transition-transform group-hover:scale-110" />
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1">
                <span>Instagram</span>
                <VerifiedBadge size="xs" tooltipText="आधिकारिक सत्यापित Instagram" />
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">@writeusonastro</span>
            </a>

            <a
              href={ASTROLOGER_INFO.socialLinks?.facebook || "https://www.facebook.com/bhawanijyotishgujarat/"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-all hover:scale-105 text-center group shadow-xs"
            >
              <Facebook className="w-7 h-7 text-[#1877F2] mb-1.5 transition-transform group-hover:scale-110" />
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1">
                <span>Facebook</span>
                <VerifiedBadge size="xs" tooltipText="आधिकारिक सत्यापित Facebook" />
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">@bhawanijyotishgujarat</span>
            </a>

            <a
              href={ASTROLOGER_INFO.socialLinks?.whatsapp || `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-all hover:scale-105 text-center group shadow-xs"
            >
              <MessageCircle className="w-7 h-7 text-[#25D366] mb-1.5 transition-transform group-hover:scale-110" />
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1">
                <span>WhatsApp</span>
                <VerifiedBadge size="xs" tooltipText="आधिकारिक सत्यापित WhatsApp" />
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">{ASTROLOGER_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>

        {/* Bottom Action CTA - Centered & Mobile-Optimized directly below Social Media */}
        <div className="pt-3 pb-2 flex flex-col items-center">
          <div className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
            <a
              id="contact-quick-call-btn"
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D9531E] via-[#FF671F] to-[#CC5218] hover:from-[#B84214] hover:to-[#D9531E] text-white font-['Marcellus'] font-serif text-base sm:text-lg py-3.5 px-5 rounded-2xl shadow-xl shadow-amber-900/20 hover:shadow-amber-900/30 transition-all text-center border border-amber-300/40 min-h-[54px] group"
            >
              <Phone className="w-5 h-5 text-amber-200 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="flex items-center justify-center gap-1.5 flex-wrap">
                <span className="font-bold whitespace-nowrap">
                  {lang === 'en'
                    ? 'Call Now:'
                    : lang === 'hi'
                    ? 'तुरंत कॉल करें:'
                    : 'તરત કોલ કરો:'}
                </span>
                <span className="font-mono font-bold text-amber-100 tracking-wide text-sm sm:text-base whitespace-nowrap">
                  {ASTROLOGER_INFO.phonePrimary}
                </span>
              </span>
            </a>

            <a
              id="contact-whatsapp-btn"
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                getWhatsAppConsultationMessage(lang)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-['Marcellus'] font-serif text-base sm:text-lg py-3.5 px-5 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all text-center border border-emerald-300/30 min-h-[54px] group"
            >
              <MessageCircle className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-bold">
                <span>{lang === 'en' ? 'Book via WhatsApp' : lang === 'hi' ? 'व्हाट्सएप पर परामर्श' : 'વોટ્સએપ પર વાત કરો'}</span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
