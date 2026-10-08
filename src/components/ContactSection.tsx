import React from 'react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { MapPin, Phone, MessageCircle, Mail, Navigation, Facebook, Instagram, Share2, ShieldCheck, Sparkles, CheckCircle2, Wallet, ArrowRight } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';
import { RajputSymbol } from './RajputSymbol';
import { Language } from '../types/astrology';

interface ContactSectionProps {
  lang: Language;
  isDark?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  isDark = true,
}) => {
  const getAddress = () => {
    if (lang === 'en') return ASTROLOGER_INFO.addressEn;
    if (lang === 'hi') return ASTROLOGER_INFO.address;
    return ASTROLOGER_INFO.addressGu;
  };

  return (
    <section id="contact-section" className="py-8 sm:py-12 px-4 max-w-6xl mx-auto text-slate-100">
      {/* Title & Subtitle - Beautifully Aligned & Structured */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        {/* Badges Row - North Gujarat Heritage & Official Govt Registration */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-md bg-[#0c1334] text-[#ffd236] border-amber-500/40">
            <RajputSymbol size="xs" />
            <span className="font-mukta font-bold tracking-normal">
              {lang === 'en'
                ? '✦ Royal Astrological Sansthan of North Gujarat ✦'
                : lang === 'hi'
                ? '✦ उत्तर गुजरात का प्रतिष्ठित राजज्योतिष संस्थान ✦'
                : '✦ ઉત્તર ગુજરાતનું પ્રતિષ્ઠિત રાજજ્યોતિષ સંસ્થાન ✦'}
            </span>
          </div>

          {/* Official Govt. Registration Number Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-md bg-[#0c1334] border-emerald-500/40 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{lang === 'en' ? 'Govt. Regd. No.:' : 'पंजीकरण संख्या:'}</span>
            <span className="font-mono font-black tracking-wider text-[#ffd236]">
              {ASTROLOGER_INFO.registrationNo}
            </span>
            <VerifiedBadge size="xs" tooltipText="शासकीय पंजीकृत वैदिक संस्थान" />
          </div>
        </div>

        {/* Main Title */}
        <h2 className="font-mukta text-center flex flex-col items-center justify-center mb-3">
          {/* Main Institution Name */}
          <span className="text-3xl sm:text-5xl font-extrabold royal-gold-gradient-text tracking-normal flex items-center justify-center gap-2 flex-wrap leading-tight">
            <span>
              {lang === 'en' ? 'Bhavani Jyotish Kendra' : lang === 'hi' ? 'भवानी ज्योतिष केंद्र' : 'ભવાની જ્યોતિષ કેન્દ્ર'}
            </span>
            <VerifiedBadge size="sm" tooltipText="सत्यापित मुख्य ज्योतिष संस्थान" />
          </span>

          {/* Subtitle */}
          <span className="text-base sm:text-2xl md:text-3xl text-slate-300 font-semibold mt-1.5 flex items-center justify-center gap-2 sm:gap-4 w-full">
            <span className="hidden xs:block flex-1 max-w-[40px] sm:max-w-[120px] h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-amber-500 rounded-full" />
            <span className="tracking-normal text-[#ffd236] text-center font-bold">
              {lang === 'en'
                ? 'Contact & Office Address'
                : lang === 'hi'
                ? 'संपर्क एवं कार्यालय पता'
                : 'સંપર્ક અને કાર્યાલય સરનામું'}
            </span>
            <span className="hidden xs:block flex-1 max-w-[40px] sm:max-w-[120px] h-0.5 bg-gradient-to-l from-transparent via-amber-400 to-amber-500 rounded-full" />
          </span>
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-center">
          {lang === 'en'
            ? 'In-person visits available at our Mehsana office. Phone & WhatsApp consultations available for distant and international clients.'
            : lang === 'hi'
            ? 'मेहसाणा कार्यालय में व्यक्तिगत भेंट, कुंडली फलादेश अथवा दूरस्थ जातकों हेतु फोन/व्हाट्सएप परामर्श उपलब्ध है।'
            : 'મહેસાણા ઓફિસમાં રૂબરૂ મુલાકાત અથવા ફોન/વોટ્સએપ દ્વારા જ્યોતિષીય પરામર્શ મેળવો.'}
        </p>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl shadow-black/60 space-y-8 bg-[#0c1334] text-slate-100">
        {/* Top 3 Key Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          
          {/* 1. Address Card */}
          <div className="p-4 sm:p-5 xl:p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 shadow-md flex flex-col justify-between h-full gap-4 sm:gap-5 bg-[#070b1e] text-slate-100 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 min-h-[50px]">
                <div className="p-2.5 rounded-xl bg-[#0c1334] text-[#ffd236] border border-amber-500/30 shadow-xs shrink-0 flex items-center justify-center mt-0.5">
                  <MapPin className="w-5 h-5 text-[#f99c00]" />
                </div>
                <h3 className="text-white text-base sm:text-lg font-black leading-snug">
                  {lang === 'en' ? 'Complete Office Address' : lang === 'hi' ? 'कार्यालय का पूरा पता' : 'ઓફિસનું પૂરું સરનામું'}
                </h3>
              </div>

              <div className="space-y-2">
                <p className="text-base sm:text-lg font-black text-[#ffd236] leading-snug">
                  {getAddress()}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                  {lang === 'en'
                    ? 'Landmark: Nagalpur Main Road, Mehsana - 384002 (North Gujarat)'
                    : lang === 'hi'
                    ? 'लैंडमार्क: नागलपुर मुख्य मार्ग, मेहसाणा - 384002 (उत्तर गुजरात)'
                    : 'લેન્ડમાર્ક: નાગલપુર મુખ્ય માર્ગ, મહેસાણા - 384002 (ગુજરાત)'}
                </p>

                {/* Registration Tag */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-slate-300 inline-flex items-center gap-1.5 text-xs shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{lang === 'en' ? 'Registration No:' : 'संस्थान पंजीकरण:'}</span>
                  </span>
                  <div className="inline-flex items-center gap-1 shrink-0 bg-[#0c1334] px-2 py-0.5 rounded-lg border border-amber-500/40 shadow-xs">
                    <span className="font-mono font-black text-[#ffd236] text-xs tracking-wide">
                      {ASTROLOGER_INFO.registrationNo}
                    </span>
                    <VerifiedBadge size="xs" tooltipText="शासकीय अधिकृत संस्थान" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href="https://maps.google.com/?q=Nagalpur+Mehsana+Gujarat+384002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#fcbb00] hover:to-[#ffd236] text-black text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all text-center active:scale-95"
              >
                <Navigation className="w-4 h-4 shrink-0 text-black" />
                <span>
                  {lang === 'en'
                    ? 'Get Directions on Google Maps'
                    : lang === 'hi'
                    ? 'गूगल मैप्स पर रास्ता देखें (Navigate)'
                    : 'ગૂગલ મેપ્સ પર રસ્તો જુઓ'}
                </span>
              </a>
            </div>
          </div>

          {/* 2. Direct Phone & WhatsApp Card */}
          <div className="p-4 sm:p-5 xl:p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 shadow-md flex flex-col justify-between h-full gap-4 sm:gap-5 bg-[#070b1e] text-slate-100 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 min-h-[50px]">
                <div className="p-2.5 rounded-xl bg-[#0c1334] text-[#ffd236] border border-amber-500/30 shadow-xs shrink-0 flex items-center justify-center mt-0.5">
                  <Phone className="w-5 h-5 text-[#f99c00]" />
                </div>
                <h3 className="text-white text-base sm:text-lg font-black leading-snug">
                  {lang === 'en' ? 'Direct Phone & WhatsApp' : lang === 'hi' ? 'सीधा फोन व व्हाट्सएप' : 'સીધો ફોન અને વોટ્સએપ'}
                </h3>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className="block text-lg sm:text-xl lg:text-xl xl:text-2xl phone-crisp font-black text-[#ffd236] hover:text-[#fcbb00] transition-colors tracking-tight sm:tracking-normal whitespace-nowrap overflow-visible"
                >
                  {ASTROLOGER_INFO.phonePrimary}
                </a>
                <p className="text-sm sm:text-base text-slate-300 font-bold flex items-center gap-1.5 flex-wrap">
                  <span className="whitespace-nowrap">{lang === 'en' ? 'Pandit Virendra Kumar Joshi' : lang === 'hi' ? 'पंडित श्री विरेंद्र कुमार जोशी' : 'પંડિત શ્રી વિરેન્દ્ર કુમાર જોશી'}</span>
                  <VerifiedBadge size="sm" tooltipText="सत्यापित मुख्य ज्योतिषी" />
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#fcbb00] hover:to-[#ffd236] text-black text-sm font-bold px-2.5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-center whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0 text-black" />
                <span>{lang === 'en' ? `Direct Call: ${ASTROLOGER_INFO.phonePrimary}` : lang === 'hi' ? `सीधा कॉल करें: ${ASTROLOGER_INFO.phonePrimary}` : `સીધો કોલ કરો: ${ASTROLOGER_INFO.phonePrimary}`}</span>
              </a>

              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  getWhatsAppConsultationMessage(lang)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#00bb7f] hover:bg-[#10b981] text-white text-sm font-bold px-2.5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-center whitespace-nowrap border border-emerald-400/40"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>{lang === 'en' ? 'WhatsApp' : lang === 'hi' ? 'व्हाट्सएप' : 'વોટ્સએપ'}</span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp चैट" />
              </a>
            </div>
          </div>

          {/* 3. Email & Digital Consultation Card */}
          <div className="p-4 sm:p-5 xl:p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 shadow-md flex flex-col justify-between h-full gap-4 sm:gap-5 bg-[#070b1e] text-slate-100 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 min-h-[50px]">
                <div className="p-2.5 rounded-xl bg-[#0c1334] text-[#ffd236] border border-amber-500/30 shadow-xs shrink-0 flex items-center justify-center mt-0.5">
                  <Mail className="w-5 h-5 text-[#f99c00]" />
                </div>
                <h3 className="text-white text-base sm:text-lg font-black leading-snug">
                  {lang === 'en' ? 'Email & Consultation' : lang === 'hi' ? 'ईमेल एवं ऑनलाइन परामर्श' : 'ઈમેલ અને ઓનલાઇન પરામર્શ'}
                </h3>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${ASTROLOGER_INFO.email}`}
                  className="block text-[13.5px] sm:text-[14.5px] md:text-[13px] lg:text-[13.5px] xl:text-[15.5px] phone-crisp font-black text-[#ffd236] hover:text-[#fcbb00] transition-colors underline decoration-amber-500/60 whitespace-nowrap tracking-tight overflow-hidden text-ellipsis"
                  title={ASTROLOGER_INFO.email}
                >
                  {ASTROLOGER_INFO.email}
                </a>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                  {lang === 'en'
                    ? 'NRI & distant clients can request online Janampatri analysis & remedies via email/WhatsApp.'
                    : lang === 'hi'
                    ? 'दूरस्थ एवं NRI जातक ऑनलाइन जन्मपत्री व उपाय हेतु संपर्क कर सकते हैं।'
                    : 'દૂરના અને NRI જાતકો ઓનલાઇન કુંડળી વિશ્લેષણ માટે સંપર્ક કરી શકે છે.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                href={`mailto:${ASTROLOGER_INFO.email}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0c1334] hover:bg-[#121b44] text-[#ffd236] border border-amber-500/40 text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all text-center active:scale-95"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#f99c00]" />
                <span>{lang === 'en' ? 'Send Email' : lang === 'hi' ? 'ईमेल भेजें' : 'ઈમેલ મોકલો'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* How to Reach Guide */}
        <div className="p-6 rounded-2xl border border-white/10 space-y-3 bg-[#070b1e] text-slate-100">
          <h4 className="font-yatra text-xl text-[#ffd236] flex items-center gap-2 font-black">
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
            <div className="p-3.5 rounded-xl bg-[#0c1334] border border-white/10">
              <span className="block text-[#ffd236] font-black mb-1 text-sm">
                🚂 {lang === 'en' ? 'Railway Station' : 'रेलवे स्टेशन'}
              </span>
              <span className="text-slate-300">
                {lang === 'en'
                  ? 'Just 3.5 KM (10 mins) from Mehsana Junction'
                  : 'मेहसाणा जंक्शन (Mehsana Jn) से मात्र 3.5 KM (10 मिनट)'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0c1334] border border-white/10">
              <span className="block text-[#ffd236] font-black mb-1 text-sm">
                🚌 {lang === 'en' ? 'Bus Stand' : 'बस स्टैंड'}
              </span>
              <span className="text-slate-300">
                {lang === 'en'
                  ? 'Direct auto from Nagalpur Bus Stop / GSRTC Central Bus Station'
                  : 'नागलपुर बस स्टॉप / मेहसाणा GSRTC बस पोर्ट से सुलभ ऑटो सेवा'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0c1334] border border-white/10">
              <span className="block text-[#ffd236] font-black mb-1 text-sm">
                ✈️ {lang === 'en' ? 'Nearest Airport' : 'निकटतम हवाई अड्डा'}
              </span>
              <span className="text-slate-300">
                {lang === 'en'
                  ? 'Ahmedabad International Airport (SVP) ~68 KM (1.5 hours)'
                  : 'अहमदाबाद इंटरनेशनल एयरपोर्ट (SVP) से ~68 KM (1.5 घंटे)'}
              </span>
            </div>
          </div>
        </div>

        {/* Social Media & Online Channels - WideCraft Midnight & Golden Glow */}
        <div className="relative p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-[#070b1e] shadow-2xl shadow-black/50 overflow-hidden space-y-5">
          {/* Top Royal Gold Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236]" />
          
          {/* Ambient Royal Gold Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#0c1334] text-[#ffd236] font-bold shrink-0 shadow-md border border-amber-500/30">
                <Share2 className="w-5 h-5 text-[#f99c00]" />
              </div>
              <div>
                <h4 className="font-yatra text-xl sm:text-2xl text-white font-bold leading-tight">
                  {lang === 'en' ? 'Follow Bhavani Jyotish on Social Media' : lang === 'hi' ? 'भवानी ज्योतिष के सोशल मीडिया हैंडल्स' : 'ભવાની જ્યોતિષ સોશિયલ મીડિયા'}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {lang === 'en' ? 'Get daily panchang, rashifal, festival muhurats and live astrological remedies' : 'दैनिक पंचांग, राशिफल, विशेष पर्व मुहूर्त एवं प्रमाणित ज्योतिषीय उपाय'}
                </p>
              </div>
            </div>
            <span className="text-xs px-3.5 py-1 rounded-full bg-[#0c1334] text-[#ffd236] font-bold border border-amber-500/40 shadow-xs shrink-0 self-start sm:self-center flex items-center gap-1.5">
              <span>✦</span>
              <span>{lang === 'en' ? 'Official Links' : 'आधिकारिक लिंक्स'}</span>
            </span>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Instagram */}
            <a
              href={ASTROLOGER_INFO.socialLinks?.instagram || "https://www.instagram.com/writeusonastro/"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0c1334] hover:bg-[#121b44] border border-white/10 hover:border-amber-400/60 shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group overflow-hidden"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#E1306C]/25 via-amber-500/15 to-[#833AB4]/20 border border-white/10 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all shadow-md">
                <Instagram className="w-7 h-7 text-pink-400 group-hover:text-pink-300 transition-colors" />
              </div>
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffd236] transition-colors flex items-center justify-center gap-1.5">
                <span>Instagram</span>
                <VerifiedBadge size="xs" tooltipText="आधिकारिक सत्यापित Instagram" />
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-wide mt-0.5">@writeusonastro</span>
              <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#ffd236] bg-[#070b1e] group-hover:bg-[#070b1e]/80 px-3 py-0.5 rounded-lg border border-amber-500/30 transition-all">
                <span>{lang === 'en' ? 'Follow' : 'फॉलो करें'}</span>
                <span>➔</span>
              </span>
            </a>

            {/* Facebook */}
            <a
              href={ASTROLOGER_INFO.socialLinks?.facebook || "https://www.facebook.com/bhawanijyotishgujarat/"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0c1334] hover:bg-[#121b44] border border-white/10 hover:border-amber-400/60 shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group overflow-hidden"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1877F2]/25 via-amber-500/15 to-[#0C52A8]/20 border border-white/10 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all shadow-md">
                <Facebook className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffd236] transition-colors flex items-center justify-center gap-1.5">
                <span>Facebook</span>
                <VerifiedBadge size="xs" tooltipText="आधिकारिक सत्यापित Facebook" />
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-wide mt-0.5">@bhawanijyotishgujarat</span>
              <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#ffd236] bg-[#070b1e] group-hover:bg-[#070b1e]/80 px-3 py-0.5 rounded-lg border border-amber-500/30 transition-all">
                <span>{lang === 'en' ? 'Connect' : 'जुड़ें'}</span>
                <span>➔</span>
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={ASTROLOGER_INFO.socialLinks?.whatsapp || `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center p-5 rounded-2xl bg-[#0c1334] hover:bg-[#121b44] border border-white/10 hover:border-amber-400/60 shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group overflow-hidden"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#25D366]/25 via-amber-500/15 to-[#128C7E]/20 border border-white/10 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all shadow-md">
                <MessageCircle className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#ffd236] transition-colors flex items-center justify-center gap-1.5">
                <span>WhatsApp</span>
                <VerifiedBadge size="xs" tooltipText="आधिकारिक सत्यापित WhatsApp" />
              </span>
              <span className="text-xs text-slate-300 phone-crisp font-bold tracking-wider mt-0.5">{ASTROLOGER_INFO.phonePrimary}</span>
              <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#ffd236] bg-[#070b1e] group-hover:bg-[#070b1e]/80 px-3 py-0.5 rounded-lg border border-amber-500/30 transition-all">
                <span>{lang === 'en' ? 'Chat' : 'संदेश भेजें'}</span>
                <span>➔</span>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Action CTA - Centered & Mobile-Optimized directly below Social Media */}
        <div className="pt-3 pb-2 flex flex-col items-center">
          <div className="w-full max-w-3xl flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
            <a
              id="contact-quick-call-btn"
              href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] hover:from-[#fcbb00] hover:to-[#ffd236] text-black py-3.5 px-4 sm:px-6 rounded-2xl shadow-xl transition-all text-center border-2 border-amber-200 min-h-[54px] group whitespace-nowrap font-black"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-mukta font-extrabold text-sm sm:text-base tracking-normal whitespace-nowrap">
                {lang === 'en'
                  ? 'Call Directly:'
                  : lang === 'hi'
                  ? 'सीधा कॉल करें:'
                  : 'સીધો કોલ કરો:'}
              </span>
              <span className="font-outfit font-black text-black tracking-wider text-sm sm:text-base whitespace-nowrap">
                {ASTROLOGER_INFO.phonePrimary}
              </span>
            </a>

            <a
              id="contact-whatsapp-btn"
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                getWhatsAppConsultationMessage(lang)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-[#00bb7f] hover:bg-[#10b981] text-white font-mukta py-3.5 px-4 sm:px-6 rounded-2xl shadow-xl transition-all text-center border border-emerald-300/40 min-h-[54px] group whitespace-nowrap font-bold"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-mukta font-extrabold text-sm sm:text-base tracking-normal whitespace-nowrap">
                {lang === 'en' ? 'Book via WhatsApp' : lang === 'hi' ? 'व्हाट्सएप पर परामर्श' : 'વોટ્સએપ પર વાત કરો'}
              </span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
