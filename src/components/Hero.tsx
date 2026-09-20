import React from 'react';
import { Phone, MessageCircle, Sparkles, ShieldCheck, Award, Star, Compass, HeartHandshake, ScrollText, Flame } from 'lucide-react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { AnimatedLogo } from './AnimatedLogo';
import { VerifiedBadge } from './VerifiedBadge';
import { RajputSymbol } from './RajputSymbol';
import { AnimatedCounter } from './AnimatedCounter';
import { CosmicMotionBackground } from './CosmicMotionBackground';
import { Language } from '../types/astrology';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  lang: Language;
  isDark?: boolean;
  onOpenLogoStudio?: () => void;
}

interface HeroSpecialty {
  hi: string;
  gu: string;
  en: string;
  seoKeyword: { hi: string; gu: string; en: string };
  searchTags: string[];
}

const HERO_PILL_SPECIALTIES: HeroSpecialty[] = [
  {
    hi: 'लव प्रॉब्लम सॉल्यूशन एवं प्रेम विवाह समस्या समाधान',
    gu: 'લવ પ્રોબ્લેમ સોલ્યુશન અને પ્રેમ લગ્ન સમસ્યા સમાધાન',
    en: 'Love Problem Solution & Love Marriage Problem Solution',
    seoKeyword: {
      hi: 'लव प्रॉब्लम सॉल्यूशन • प्रेम विवाह विशेषज्ञ',
      gu: 'લવ પ્રોબ્લેમ સોલ્યુશન • પ્રેમ લગ્ન સ્પેશિયાલિસ્ટ',
      en: 'Love Problem Solution & Marriage Specialist'
    },
    searchTags: ['Love Marriage', 'Intercaste Marriage', 'माता-पिता की सहमति', 'रूठा प्यार वापस']
  },
  {
    hi: 'पति व्यसन मुक्ति एवं गृह क्लेश शांति निवारण',
    gu: 'પતિ વ્યસન મુક્તિ અને ગૃહ કંકાસ શાંતિ નિવારણ',
    en: 'Husband De-Addiction & Domestic Peace Astrology',
    seoKeyword: {
      hi: 'पति शराब छुड़ाने के उपाय • गृह क्लेश शांति',
      gu: 'પતિ દારૂ મુક્તિ ઉપાય • ગૃહ કંકાસ શાંતિ',
      en: 'Husband Alcohol De-Addiction & Domestic Peace'
    },
    searchTags: ['दारू छुड़ाने के उपाय', 'नशा मुक्ति ज्योतिष', 'गृह क्लेश शांति', 'पति-पत्नी विवाद']
  },
  {
    hi: 'पर-स्त्री संबंध निवारण एवं दांपत्य रक्षा महाअनुष्ठान',
    gu: 'પર-સ્ત્રી સંબંધ નિવારણ અને દાંપત્ય સુરક્ષા મહાઅનુષ્ઠાન',
    en: 'Husband Extra-Marital Affair & Marital Defense',
    seoKeyword: {
      hi: 'सौतन से छुटकारा • पर-स्त्री आकर्षण निवारण',
      gu: 'સૌતનથી મુક્તિ • પરસ્ત્રી આકર્ષણ નિવારણ',
      en: 'Sautan Se Chutkara & Stop Husband Affair'
    },
    searchTags: ['सौतन से छुटकारा', 'पति का अफेयर रोकना', 'दांपत्य रक्षा', 'तलाक निवारण']
  },
  {
    hi: 'जिद्दी व अनियंत्रित संतान सुधार एवं सद्बुद्धि वैदिक अनुष्ठान',
    gu: 'જીદ્દી અને અનિયંત્રિત બાળક સુધાર તથા સદ્બુદ્ધિ વૈદિક અનુષ્ઠાન',
    en: 'Stubborn Child Guidance & Studies Focus Remedies',
    seoKeyword: {
      hi: 'जिद्दी बच्चा सुधार उपाय • मोबाइल लत व सरस्वती उपाय',
      gu: 'જીદ્દી બાળક સુધાર ઉપાય • મોબાઇલ લત મુક્તિ',
      en: 'Stubborn Child Guidance & Studies Concentration'
    },
    searchTags: ['जिद्दी बच्चा सुधार', 'मोबाइल लत मुक्ति', 'पढ़ाई में एकाग्रता', 'सरस्वती उपाय']
  }
];

const TOP_SEO_HERO_TAGS = [
  { phrase: 'Love Problem Solution Astrologer', hi: 'लव प्रॉब्लम सॉल्यूशन (#1 Rank)', gu: 'લવ પ્રોબ્લેમ સોલ્યુશન', en: 'Love Problem Solution' },
  { phrase: 'Pati Ki Daru Chudane Ke Jyotish Upay', hi: 'पति की शराब छुड़ाने के उपाय', gu: 'પતિ દારૂ છોડાવવાના ઉપાય', en: 'Husband De-Addiction Upay' },
  { phrase: 'Sautan Se Chutkara Pane Ke Upay', hi: 'सौतन से छुटकारा (सात्विक उपाय)', gu: 'સૌતનથી મુક્તિ ઉપાય', en: 'Sautan Se Chutkara' },
  { phrase: 'Jiddi Bache Ko Sudharne Ke Upay', hi: 'जिद्दी बच्चा सुधार वैदिक उपाय', gu: 'જીદ્દી બાળક સુધાર ઉપાય', en: 'Stubborn Child Guidance' },
  { phrase: 'Love Marriage Specialist Astrologer', hi: 'प्रेम विवाह विशेषज्ञ ज्योतिषी', gu: 'પ્રેમ લગ્ન સ્પેશિયાલિસ્ટ', en: 'Love Marriage Specialist' },
  { phrase: 'Grih Klesh Shanti Vedic Upay', hi: 'गृह क्लेश शांति अनुष्ठान', gu: 'ગૃહ કંકાસ શાંતિ', en: 'Family Peace Astrology' },
  { phrase: 'Kids Mobile Phone Addiction Upay', hi: 'बच्चों की मोबाइल लत छुड़ाने के उपाय', gu: 'બાળકોની મોબાઇલ લત ઉપાય', en: 'Kids Screen Addiction Upay' },
  { phrase: '36 Gun Milan For Marriage', hi: '36 गुण विवाह मिलान', gu: '36 ગુણ લગ્ન મિલન', en: '36 Gun Milan' }
];

export const Hero: React.FC<HeroProps> = ({ setActiveTab, lang, isDark = false, onOpenLogoStudio }) => {
  return (
    <section className={`relative overflow-hidden border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0f0b07] border-amber-500/30 text-amber-50' 
        : 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FDF4E3] border-amber-400/40 text-[#2C2420]'
    }`}>
      {/* Modern Unique Cosmic Motion Graphic Background (Replaces simple dots) */}
      <CosmicMotionBackground />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-14 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Sacred Brand Emblem (Floating Pure Transparent Cutout) */}
          <div className="flex justify-center mb-5">
            <div className="relative p-1 flex items-center justify-center">
              <AnimatedLogo size="lg" isDark={isDark} lang={lang} onOpenStudio={onOpenLogoStudio} />
            </div>
          </div>

          {/* Royal Heritage Badge */}
          <div className={`inline-flex items-center gap-2 border px-5 py-2 rounded-full shadow-md text-xs sm:text-sm font-black mb-5 tracking-wide transition-all ${
            isDark 
              ? 'bg-amber-950/80 border-amber-400/60 text-amber-200 shadow-amber-900/30' 
              : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-amber-400/80 text-[#7A2408] shadow-amber-500/15'
          }`}>
            <RajputSymbol size="sm" />
            <span className="font-bold">
              {lang === 'en'
                ? '✦ Royal Vedic Astrological Heritage • North Gujarat ✦'
                : lang === 'hi'
                ? '✦ उत्तर गुजरात का प्रतिष्ठित राजज्योतिष संस्थान ✦'
                : '✦ ઉત્તર ગુજરાતનું પ્રતિષ્ઠિત રાજજ્યોતિષ સંસ્થાન ✦'}
            </span>
            <RajputSymbol size="sm" />
          </div>

          {/* Main Hero Title */}
          <h2 className={`font-yatra text-3xl sm:text-5xl lg:text-6xl mb-3 leading-tight tracking-wide drop-shadow-sm flex items-center justify-center gap-2 sm:gap-3 flex-wrap ${
            isDark ? 'text-amber-300' : 'text-[#852E10]'
          }`}>
            <span>{lang === 'en' ? 'Bhavani Jyotish Kendra' : lang === 'hi' ? 'भवानी ज्योतिष केंद्र' : 'ભવાની જ્યોતિષ કેન્દ્ર'}</span>
            <VerifiedBadge size="lg" tooltipText="भवानी ज्योतिष केंद्र - आधिकारिक सत्यापित वैदिक पीठ" />
          </h2>

          <p className={`text-lg sm:text-2xl font-bold mb-3 font-marcellus tracking-wide ${
            isDark ? 'text-amber-100' : 'text-stone-900'
          }`}>
            {lang === 'en'
              ? ASTROLOGER_INFO.taglineEn
              : lang === 'hi'
              ? ASTROLOGER_INFO.tagline
              : ASTROLOGER_INFO.taglineGu}
          </p>

          <p className={`text-base sm:text-xl md:text-2xl font-semibold max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed tracking-wide ${
            isDark ? 'text-amber-100/90' : 'text-stone-900'
          }`}>
            {lang === 'en'
              ? 'Authentic, infallible Vedic solutions for marriage delays, business & career hurdles, domestic discord, Manglik & Kalsarp Doshas, and child matters. 35+ years of dedicated expertise.'
              : lang === 'hi'
              ? 'विवाह में बाधा, नौकरी-व्यापार में घाटा, गृह क्लेश, मांगलिक, कालसर्प दोष अथवा संतान संबंधी समस्याओं का शास्त्रोक्त व अचूक वैदिक समाधान। ३५+ वर्षों का प्रामाणिक अनुभव।'
              : 'લગ્નમાં વિલંબ, નોકરી-વેપારમાં ખોટ, ગૃહ કંકાસ, માંગલિક, કાલસર્પ દોષ અથવા સંતાન સમસ્યાઓનું શાસ્ત્રોક્ત અને સચોટ વૈદિક સમાધાન. ૩૫+ વર્ષનો અનુભવ.'}
          </p>

          {/* Live Call Availability Alert */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border border-amber-500/40 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#852E10] dark:text-amber-200">
              {lang === 'en'
                ? 'Pandit Ji is Online & Available on Call Now'
                : lang === 'hi'
                ? '🟢 पंडित जी अभी प्रत्यक्ष कॉल पर उपलब्ध हैं | तुरंत फोन करें'
                : '🟢 પંડિતજી હમણાં સીધા કોલ પર ઉપલબ્ધ છે | તુરંત ફોન કરો'}
            </span>
          </div>

          {/* 4 Core Vedic Solutions Pill Badges (Styled exactly like the Live Alert Badge above & directly below it) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mb-3 px-2">
            {HERO_PILL_SPECIALTIES.map((item, idx) => (
              <button
                key={idx}
                id={`hero-pill-${idx}`}
                type="button"
                onClick={() => setActiveTab('services')}
                title={`High Ranking Vedic Astrology: ${item.seoKeyword[lang]}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 hover:from-amber-500/25 hover:via-orange-500/30 hover:to-amber-500/25 border border-amber-500/40 hover:border-amber-600 px-3.5 py-1.5 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-left"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#852E10] dark:text-amber-200">
                  {item[lang]}
                </span>
              </button>
            ))}
          </div>

          {/* Related High-Ranking SEO Keywords Strip */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto mb-6 px-2">
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300/70 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#FF671F]" />
              <span>{lang === 'en' ? 'Top SEO Keywords:' : lang === 'hi' ? 'शीर्ष रैंकिंग कीवर्ड्स:' : 'ટોચના સર્ચ કીવર્ડ્સ:'}</span>
            </span>
            {TOP_SEO_HERO_TAGS.map((tag, tIdx) => (
              <button
                key={tIdx}
                type="button"
                onClick={() => {
                  setActiveTab('services');
                  const seoEl = document.getElementById('seo-directory');
                  if (seoEl) seoEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/90 dark:bg-stone-800/90 hover:bg-amber-100 dark:hover:bg-amber-950 text-stone-700 dark:text-stone-300 hover:text-[#852E10] dark:hover:text-amber-200 border border-amber-200 dark:border-amber-900/60 transition-all cursor-pointer shadow-2xs"
                title={`High Volume Astrological Search Query: ${tag.phrase}`}
              >
                <span className="text-[#FF671F] font-bold">#</span>
                <span>{tag[lang]}</span>
              </button>
            ))}
          </div>

          {/* Main Action Buttons - High Conversion Direct Call (Royal Navy Blue & Gold) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 w-full max-w-xl mx-auto">
            <a
              href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3.5 bg-gradient-to-r from-[#0B2545] via-[#133E7C] to-[#081B33] hover:from-[#133E7C] hover:to-[#0B2545] text-white px-5 sm:px-7 py-3 rounded-2xl shadow-xl shadow-slate-950/50 transition-all hover:scale-105 active:scale-95 border-2 border-amber-300 ring-4 ring-amber-400/30 text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#0B2545] flex items-center justify-center shadow-md shrink-0 group-hover:rotate-12 transition-transform">
                <Phone className="w-5 h-5 fill-current animate-bounce" />
              </div>
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="text-xs sm:text-sm text-amber-300 font-mukta font-extrabold uppercase tracking-wider">
                  {lang === 'en' ? 'Direct Phone Consultation' : lang === 'gu' ? 'સીધા ફોન પર વાત કરો' : 'सीधे फोन पर बात करें'}
                </span>
                <span className="phone-crisp text-xl sm:text-2xl font-black text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {ASTROLOGER_INFO.phonePrimary}
                </span>
              </div>
            </a>

            <a
              href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                getWhatsAppConsultationMessage(lang)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-base sm:text-xl px-7 py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 border-2 border-emerald-300 text-center"
            >
              <MessageCircle className="w-6 h-6 shrink-0" />
              <span>{lang === 'en' ? 'WhatsApp Chat' : lang === 'gu' ? 'વોટ્સએપ ચેટ' : 'व्हाट्सएप चैट'}</span>
              <VerifiedBadge size="sm" tooltipText={lang === 'en' ? 'Verified WhatsApp Chat' : lang === 'gu' ? 'પ્રમાણિત WhatsApp ચેટ' : 'सत्यापित WhatsApp चैट'} />
            </a>
          </div>

          {/* Micro Trust Points to remove hesitation */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 mb-6 sm:mb-7 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-black text-base sm:text-lg">✓</span>
              {lang === 'en' ? 'Direct conversation with Pandit Ji' : lang === 'gu' ? 'સીધા પંડિતજી સાથે વાતચીત' : 'सीधे पंडित जी से संवाद'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-black text-base sm:text-lg">✓</span>
              {lang === 'en' ? 'Zero waiting time' : lang === 'gu' ? 'ઝીરો વેઇટિંગ ટાઇમ' : 'कोई वेटिंग नहीं'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-black text-base sm:text-lg">✓</span>
              {lang === 'en' ? '100% Confidential' : lang === 'gu' ? '૧૦૦% સંપૂર્ણ ગુપ્ત' : '१००% पूर्णतः गोपनीय'}
            </span>
          </div>

          {/* High-Converting Overseas & NRI Consultation Bar (US, UK, Canada, Australia, UAE) */}
          <div className="w-full max-w-2xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border-2 border-amber-400/60 shadow-md text-stone-950 flex flex-col sm:flex-row items-center justify-between gap-3.5 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F0] border border-[#FF671F]/30 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                🌐
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm sm:text-base md:text-lg text-[#852E10] dark:text-amber-300">
                    {lang === 'en' 
                      ? 'Calling from Abroad (USA, UK, Canada, Australia, UAE)?' 
                      : lang === 'gu' 
                      ? 'વિદેશ (USA, UK, Canada, Australia, UAE)થી સંપર્ક?' 
                      : 'विदेश (USA, UK, Canada, Australia, UAE) से संपर्क?'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm bg-white/90 dark:bg-stone-900 px-2.5 py-0.5 rounded-md font-bold text-stone-800 dark:text-stone-200 border border-amber-300">
                    US CA GB AU AE
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-stone-950 dark:text-stone-100 font-bold mt-1 leading-snug">
                  {lang === 'en'
                    ? 'Free WhatsApp Audio/Video Consultation across EST, CST, PST & GMT Timezones'
                    : lang === 'gu'
                    ? 'મફત WhatsApp ઓડિયો/વિડિયો કોલ • તમામ ટાઈમઝોન (EST/PST/GMT)માં ઉપલબ્ધ'
                    : 'मुफ्त WhatsApp ऑडियो/वीडियो कॉल • सभी टाइमज़ोन (EST/PST/GMT) में सुलभ'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  lang === 'en'
                    ? '🙏 Hello Pandit Ji! I am contacting from abroad (USA/UK/Canada/NRI). I would like to schedule an online Vedic Kundli / Gun Milan consultation. (EST/PST/GMT Timezone)'
                    : lang === 'gu'
                    ? '🙏 નમસ્તે પંડિતજી! હું વિદેશ (USA/UK/Canada/NRI)થી સંપર્ક કરી રહ્યો/રહી છું. મને ઑનલાઇન વૈદિક કુંડળી / ગુણ મિલાન માટે એપોઇન્ટમેન્ટ જોઈએ છે. (EST/PST/GMT Timezone)'
                    : '🙏 नमस्ते पंडित जी! मैं विदेश (USA/UK/Canada/NRI) से संपर्क कर रहा/रही हूँ। मुझे ऑनलाइन वैदिक जन्म कुंडली / विवाह गुण मिलान हेतु समय (Appointment) चाहिए। (EST/PST/GMT Timezone)'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{lang === 'en' ? 'WhatsApp Call' : lang === 'gu' ? 'વોટ્સએપ કોલ' : 'व्हाट्सएप कॉल'}</span>
              </a>

              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab('international')}
                  className="inline-flex items-center justify-center gap-1 text-sm font-bold text-[#852E10] dark:text-amber-300 hover:text-[#FF671F] bg-white dark:bg-stone-900 border border-amber-400 px-3.5 py-2.5 rounded-xl shadow-xs transition-all hover:bg-amber-50 dark:hover:bg-stone-800"
                >
                  <span>{lang === 'en' ? 'NRI Portal' : lang === 'gu' ? 'NRI સેવા' : 'NRI पोर्टल'}</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick interactive utility tool cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto mb-8 sm:mb-11 text-left">
            <div 
              onClick={() => setActiveTab('kundli')}
              className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-600/15 hover:border-amber-500 text-stone-950'
              }`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform shadow-xs ${
                isDark ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-[#852E10] border border-amber-300'
              }`}>
                <ScrollText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-200' : 'text-[#852E10]'}`}>
                {lang === 'en' ? 'Free Janam Kundli' : lang === 'hi' ? 'मुफ्त जन्म कुंडली' : 'મફત જન્મ કુંડળી'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-700'}`}>
                {lang === 'en' ? 'Lagna & Predictions' : lang === 'hi' ? 'लग्न चक्र व फलादेश' : 'લગ્ન ચક્ર અને ફલાદેશ'}
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('gun-milan')}
              className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF4EA] border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-600/15 hover:border-amber-500 text-stone-950'
              }`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-rose-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform shadow-xs ${
                isDark ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-700 border border-rose-300'
              }`}>
                <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-amber-200' : 'text-[#852E10]'}`}>
                {lang === 'en' ? '36 Gun Milan' : lang === 'hi' ? '36 गुण मिलान' : '36 ગુણ મિલાન'}
              </h4>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-700'}`}>
                {lang === 'en' ? 'Marriage Compatibility' : lang === 'hi' ? 'विवाह अनुकूलता जांच' : 'લગ્ન અનુકૂળતા ચકાસણી'}
              </p>
            </div>
          </div>

          {/* Royal Trust Medallions - Luxury Dark Astrological Theme */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-6 sm:pt-8 border-t border-amber-500/30 text-center">
            {/* Box 1: 35+ Years */}
            <div className="relative group overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#241711] via-[#1A100B] to-[#120A07] border border-amber-500/40 shadow-xl shadow-black/30 transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/20 hover:-translate-y-1">
              <span className="text-amber-300 text-2xl sm:text-3xl font-outfit font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1.5">
                <AnimatedCounter 
                  end={35} 
                  suffix="+" 
                  duration={1800} 
                  prefix={<RajputSymbol size="sm" />} 
                />
              </span>
              <span className="text-amber-100/90 font-mukta font-bold text-xs sm:text-sm tracking-wide mt-1.5">
                {lang === 'en' ? 'Years Vedic Tradition' : lang === 'hi' ? 'वर्षों की राजकीय साधना' : 'વર્ષોની રાજકીય સાધના'}
              </span>
            </div>

            {/* Box 2: 15,000+ Clients */}
            <div className="relative group overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#241711] via-[#1A100B] to-[#120A07] border border-amber-500/40 shadow-xl shadow-black/30 transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/20 hover:-translate-y-1">
              <span className="text-amber-300 text-2xl sm:text-3xl font-outfit font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1">
                <AnimatedCounter 
                  end={15000} 
                  suffix="+" 
                  duration={2200} 
                  prefix="🪷 " 
                  useGrouping={true} 
                />
              </span>
              <span className="text-amber-100/90 font-mukta font-bold text-xs sm:text-sm tracking-wide mt-1.5">
                {lang === 'en' ? 'Satisfied Royal Clients' : lang === 'hi' ? 'संतुष्ट जातक व परिवार' : 'સંતુષ્ટ જાતકો અને પરિવારો'}
              </span>
            </div>

            {/* Box 3: 100% Authentic */}
            <div className="relative group overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#241711] via-[#1A100B] to-[#120A07] border border-amber-500/40 shadow-xl shadow-black/30 transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/20 hover:-translate-y-1">
              <span className="text-amber-300 text-2xl sm:text-3xl font-outfit font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1">
                <AnimatedCounter 
                  end={100} 
                  suffix="%" 
                  duration={1600} 
                />
              </span>
              <span className="text-amber-100/90 font-mukta font-bold text-xs sm:text-sm tracking-wide mt-1.5 flex items-center justify-center gap-1.5 flex-wrap">
                <span>{lang === 'en' ? 'Authentic Vedic' : lang === 'hi' ? 'शास्त्रोक्त प्रामाणिक' : 'શાસ્ત્રોક્ત પ્રમાણિત'}</span>
                <VerifiedBadge size="xs" tooltipText="१००% प्रामाणिक वैदिक संस्थान" />
              </span>
            </div>

            {/* Box 4: 4.9 ★ Rating */}
            <div className="relative group overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#241711] via-[#1A100B] to-[#120A07] border border-amber-500/40 shadow-xl shadow-black/30 transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/20 hover:-translate-y-1">
              <span className="text-amber-300 text-2xl sm:text-3xl font-outfit font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1">
                <AnimatedCounter 
                  end={4.9} 
                  decimals={1} 
                  suffix=" ★" 
                  duration={2000} 
                  prefix="⭐ " 
                />
              </span>
              <span className="text-amber-100/90 font-mukta font-bold text-xs sm:text-sm tracking-wide mt-1.5">
                {lang === 'en' ? 'Vedic Astrologer Rating' : lang === 'hi' ? 'सर्वश्रेष्ठ प्रामाणिक रेटिंग' : 'શ્રેષ્ઠ પ્રમાણિત રેટિંગ'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
