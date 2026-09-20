import React, { useState } from 'react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Share2, ShieldCheck, Scale, Lock, FileText, Info } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';
import { LegalModal, LegalTabType } from './LegalModal';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  lang: Language;
  onOpenLogoStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, lang, onOpenLogoStudio }) => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType>('disclaimer');

  const openLegal = (tab: LegalTabType) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const getAddress = () => {
    if (lang === 'en') return ASTROLOGER_INFO.addressEn;
    if (lang === 'hi') return ASTROLOGER_INFO.address;
    return ASTROLOGER_INFO.addressGu;
  };

  return (
    <footer id="contact" className="bg-[#1F1714] text-[#E5DCD6] pt-10 sm:pt-14 pb-8 border-t-4 border-[#FF671F] w-full max-w-full overflow-x-hidden print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Astrologer Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AnimatedLogo size="sm" isDark={true} lang={lang} onOpenStudio={onOpenLogoStudio} />
              <div>
                <h3 className="font-yatra text-2xl text-amber-400">
                  {lang === 'en' ? 'Bhavani Jyotish' : 'भवानी ज्योतिष'}
                </h3>
                <span className="text-xs text-amber-200/80 block">
                  {lang === 'en' ? 'Mehsana, Gujarat' : 'मेहसाणा (गुजरात)'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {lang === 'en'
                ? 'North Gujarat’s premier Vedic astrology centre dedicated to human welfare through authentic Parashar Hora Shastra, natal charts, and sacred ritual ceremonies for over 35+ years.'
                : lang === 'hi'
                ? '३५+ वर्षों से वैदिक ज्योतिष, पराशर होरा शास्त्र एवं शास्त्रोक्त अनुष्ठानों द्वारा जन-कल्याण हेतु समर्पित उत्तर गुजरात का प्रतिष्ठित ज्योतिष संस्थान।'
                : '૩૫+ વર્ષોથી વૈદિક જ્યોતિષ અને શાસ્ત્રોક્ત અનુષ્ઠાન દ્વારા માર્ગદર્શન કરતું મહેસાણાનું પ્રતિષ્ઠિત જ્યોતિષ કેન્દ્ર.'}
            </p>

            <div className="pt-2 text-xs text-amber-300 font-semibold flex items-center gap-1.5 flex-wrap">
              <span>🔱</span>
              <span>{ASTROLOGER_INFO.name}</span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित मुख्य ज्योतिषी" />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/40 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {lang === 'en' 
                  ? 'Certified Astrological Center' 
                  : lang === 'gu' 
                  ? 'પ્રમાણિત વૈદિક જ્યોતિષ સંસ્થા' 
                  : 'प्रामाणिक वैदिक ज्योतिष पीठ'}
              </span>
              <VerifiedBadge size="xs" tooltipText={lang === 'en' ? 'Verified Astrological Center' : lang === 'gu' ? 'પ્રમાણિત જ્યોતિષ કેન્દ્ર' : 'सत्यापित ज्योतिष संस्थान'} />
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-yatra text-lg text-amber-400 pb-1 border-b border-[#FF671F]/30">
              {lang === 'en' ? 'Quick Services' : lang === 'hi' ? 'महत्वपूर्ण सेवाएं' : 'મહત્વપૂર્ણ સેવાઓ'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-200">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('kundli')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>
                    {lang === 'en' 
                      ? 'Janam Kundli & Mahadasha' 
                      : lang === 'gu' 
                      ? 'જન્મ કુંડળી અને મહાદશા' 
                      : 'जन्म कुंडली एवं महादशा'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('gun-milan')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>
                    {lang === 'en' 
                      ? '36 Guna Kundli Matching' 
                      : lang === 'gu' 
                      ? '૩૬ ગુણ લગ્ન મિલન' 
                      : '36 गुण विवाह मिलान'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('rashifal')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>
                    {lang === 'en' 
                      ? 'Daily Horoscope (12 Rashis)' 
                      : lang === 'gu' 
                      ? 'દૈનિક ૧૨ રાશિ રાશિફળ' 
                      : 'दैनिक 12 राशि राशिफल'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('dosh-guide')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>
                    {lang === 'en' 
                      ? 'Kalsarp & Manglik Shanti' 
                      : lang === 'gu' 
                      ? 'કાલસર્પ અને માંગલિક શાંતિ' 
                      : 'कालसर्प व मांगलिक शांति'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('panchang')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>
                    {lang === 'en' 
                      ? 'Daily Panchang & Choghadiya' 
                      : lang === 'gu' 
                      ? 'દૈનિક પંચાંગ અને ચોઘડિયા' 
                      : 'दैनिक पंचांग व चौघड़िया'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('payment-qr-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setActiveTab('contact');
                      setTimeout(() => {
                        document.getElementById('payment-qr-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-purple-300 font-bold cursor-pointer"
                >
                  <span className="text-purple-400">▸</span>
                  <span>
                    {lang === 'en' 
                      ? 'PhonePe / UPI Dakshina QR' 
                      : lang === 'gu' 
                      ? 'PhonePe / UPI દક્ષિણા QR કોડ' 
                      : 'PhonePe / UPI दक्षिणा QR कोड'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-yatra text-lg text-amber-400 pb-1 border-b border-[#FF671F]/30">
              {lang === 'en' ? 'Contact & Consultation' : lang === 'hi' ? 'संपर्क एवं परामर्श' : 'સંપર્ક અને પરામર્શ'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-white font-medium">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="flex items-start gap-2 hover:text-amber-300 transition-colors text-white font-bold"
              >
                <Phone className="w-4 h-4 text-[#FF671F] shrink-0 mt-0.5" />
                <span className="phone-crisp tracking-wide text-amber-200">{ASTROLOGER_INFO.phonePrimary}</span>
              </a>

              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-emerald-300 transition-colors text-emerald-300 font-bold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp: <span className="phone-crisp tracking-wide">{ASTROLOGER_INFO.phonePrimary}</span></span>
              </a>

              <div className="flex items-start gap-2 text-stone-100 font-medium">
                <Mail className="w-4 h-4 text-[#FF671F] shrink-0 mt-0.5" />
                <span className="break-all font-semibold">{ASTROLOGER_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Office Address & Map Button */}
          <div className="space-y-3">
            <h4 className="font-yatra text-lg text-amber-400 pb-1 border-b border-[#FF671F]/30">
              {lang === 'en' ? 'Office Address (Mehsana)' : lang === 'hi' ? 'कार्यालय का पता (Mehsana)' : 'ઓફિસનું સરનામું'}
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-bold text-stone-100">
                  {getAddress()}
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Nagalpur+Mehsana+Gujarat+384002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-1"
              >
                {lang === 'en' 
                  ? '📍 View on Google Maps (Directions)' 
                  : lang === 'gu' 
                  ? '📍 ગૂગલ મેપ પર દિશા જુઓ (Directions)' 
                  : '📍 गूगल मैप पर दिशा देखें (Directions)'}
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Digital Channels Section */}
        <div className="my-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] text-white shadow-md">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-yatra text-base text-amber-300">
                  {lang === 'en' ? 'Connect With Us on Social Media' : lang === 'hi' ? 'सोशल मीडिया पर भवानी ज्योतिष से जुड़ें' : 'સોશિયલ મીડિયા પર ભવાની જ્યોતિષ સાથે જોડાઓ'}
                </h5>
                <p className="text-xs text-stone-300">
                  {lang === 'en' 
                    ? 'Daily Rashifal, Vedic Panchang, Muhurat updates & Live Q&A' 
                    : lang === 'gu' 
                    ? 'દૈનિક રાશિફળ, પંચાંગ, શુભ મુહૂર્ત અને વિશેષ ઉપાયની માહિતી મેળવો' 
                    : 'दैनिक राशिफल, पंचांग, शुभ मुहूर्त एवं विशेष उपाय की जानकारी प्राप्त करें'}
                </p>
              </div>
            </div>

            {/* Social Icons List */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={ASTROLOGER_INFO.socialLinks?.instagram || "https://www.instagram.com/writeusonastro/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500/20 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-pink-500/40 text-white text-xs font-bold transition-all shadow-xs group hover:scale-105"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
                <span>Instagram</span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित Instagram प्रोफाइल" />
              </a>

              <a
                href={ASTROLOGER_INFO.socialLinks?.facebook || "https://www.facebook.com/bhawanijyotishgujarat/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2] border border-[#1877F2]/40 text-white text-xs font-bold transition-all shadow-xs group hover:scale-105"
              >
                <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white transition-colors" />
                <span>Facebook</span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित Facebook पेज" />
              </a>

              <a
                href={ASTROLOGER_INFO.socialLinks?.whatsapp || `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] border border-[#25D366]/40 text-white text-xs font-bold transition-all shadow-xs group hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                <span>WhatsApp</span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp चैट" />
              </a>
            </div>
          </div>
        </div>

        {/* City-Wise Local & NRI Consultation Hubs Strip */}
        <div className="my-8 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#FF671F]" />
              <h5 className="font-yatra text-sm text-amber-300">
                {lang === 'en'
                  ? 'City-Wise Astrological Services & Centers'
                  : lang === 'hi'
                  ? 'शहरवार वैदिक ज्योतिष सेवा एवं परामर्श केंद्र'
                  : 'શહેરવાર વૈદિક જ્યોતિષ સેવા અને કેન્દ્રો'}
              </h5>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('city-centers');
                  document.getElementById('city-local-seo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                📍 <strong className="text-amber-300">मेहसाणा (Mehsana):</strong> नागलपुर मुख्य पीठ, विसनगर, उंझा, कडी, पाटन
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('city-centers');
                  document.getElementById('city-local-seo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🏙️ <strong className="text-amber-300">अहमदाबाद (Ahmedabad):</strong> वस्त्रपुर, सेटेलाइट, SG हाइवे, मणिनगर, प्रह्लादनगर
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('city-centers');
                  document.getElementById('city-local-seo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🏛️ <strong className="text-amber-300">गांधीनगर (Gandhinagar):</strong> GIFT City, इन्फोसिटी, सेक्टर 1-30, कुदासन
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('city-centers');
                  document.getElementById('city-local-seo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🏢 <strong className="text-amber-300">मुंबई (Mumbai):</strong> कांदिवली, घाटकोपर, बोरीवली, विले पार्ले, ठाणे
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('city-centers');
                  document.getElementById('city-local-seo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇺🇸 <strong className="text-amber-300">NRI USA:</strong> New Jersey (Edison), Texas (Dallas), California (Bay Area)
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('city-centers');
                  document.getElementById('city-local-seo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇬🇧 <strong className="text-amber-300">NRI UK:</strong> London (Wembley, Harrow), Leicester (Belgrave Rd), Birmingham
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇨🇦 <strong className="text-amber-300">NRI Canada:</strong> Toronto, Brampton, Mississauga, Vancouver, Calgary
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇦🇺 <strong className="text-amber-300">NRI Australia:</strong> Sydney (Parramatta), Melbourne (Tarneit), Brisbane, Perth
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇦🇪 <strong className="text-amber-300">NRI UAE & Gulf:</strong> Dubai (Bur Dubai, Karama), Abu Dhabi, Sharjah, Doha
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇸🇬 <strong className="text-amber-300">Singapore:</strong> Little India, Serangoon, Tampines, Malaysia
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇪🇺 <strong className="text-amber-300">Germany & Europe:</strong> Frankfurt, Munich, Amsterdam, Zurich, Dublin
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF671F]/30 border border-white/10 hover:border-amber-400 text-stone-200 transition-all cursor-pointer text-left"
              >
                🇿🇦 <strong className="text-amber-300">South Africa:</strong> Durban, Johannesburg, Lenasia, Nairobi
              </button>
            </div>

            {/* Organic Search Terms & Authority Indexing Strip */}
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-stone-400 leading-relaxed">
              <span className="text-amber-300 font-semibold">प्रामाणिक वैदिक ज्योतिष सेवाएं एवं प्रमुख खोज अनुक्रमणिका: </span>
              सटीक वैदिक जन्म कुंडली चक्र निर्माण (Lagna &amp; Navamsha Chart), अष्टकूट 36 गुण विवाह मिलान (Gun Milan for Marriage), लव प्रॉब्लम सॉल्यूशन (Love Problem Solution &amp; Love Marriage Specialist Astrologer), अंतरजातीय विवाह बाधा व माता-पिता सहमति, पति-पत्नी कलह व तलाक निवारण उपाय, नाड़ी दोष व भकूट दोष परिहार, मांगलिक दोष निवारण, कालसर्प दोष शांति पूजा (सिद्धपुर व उज्जैन), पितृ दोष व साढ़ेसाती उपाय, आवासीय व व्यापारिक वास्तु शास्त्र (बिना तोड़फोड़), शेयर बाज़ार व कमोडिटी ग्रह दशा विश्लेषण, राशि अनुसार भाग्यशाली रत्न व रुद्राक्ष परामर्श। Overseas Visa &amp; PR Astrology (H1B Visa timing, Canada PR, UK Work Permit), foreign career stability, sacred remote Puja Sankalp on holy shrines (Siddhpur, Somnath, Ujjain). Worldwide Online Consultation for Indian Diaspora in USA (New Jersey Edison, California San Jose, Texas Dallas), UK (London Wembley, Leicester), Canada (Toronto, Brampton), Australia (Sydney, Melbourne), Singapore &amp; Gulf (Dubai, Abu Dhabi) with Daylight Saving Time (DST) mathematical precision.
            </div>
          </div>
        </div>

        {/* Clear Statutory Legal Disclaimer Box (Google, Meta & Consumer Protection Compliant) */}
        <div className="mb-6 bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-stone-300 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 shrink-0 mt-0.5">
              <Scale className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">
                  {lang === 'en'
                    ? '⚖️ Legal & Vedic Consultation Disclaimer'
                    : lang === 'gu'
                    ? '⚖️ કાનૂની અને વૈદિક પરામર્શ અસ્વીકરણ'
                    : '⚖️ स्पष्ट वैधानिक अस्वीकरण (वैदिक परामर्श व मार्गदर्शन हेतु)'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-200 font-medium">
                  {lang === 'en' ? 'Consumer Protection & Ethical Code' : lang === 'gu' ? 'ગ્રાહક સુરક્ષા અને નૈતિક માર્ગદર્શિકા' : 'उपभोक्ता संरक्षण एवं आचार संहिता'}
                </span>
              </div>

              <p className="text-[11.5px] sm:text-xs text-stone-300 leading-relaxed">
                {lang === 'en' ? (
                  <>
                    <strong>Ethical Astrological Advisory:</strong> Bhavani Jyotish offers horoscope reading, planetary analysis, and Vedic spiritual remedies in good faith based on ancient scriptures. Astrological consultations, gemstone suggestions, or rituals are strictly intended for spiritual enrichment, moral strength, and self-reflection. <strong>They are NOT an alternative or substitute for certified medical, psychiatric, legal, or licensed financial advice.</strong> In accordance with Google Ads, Meta policies, and legal norms, results vary according to individual Karma, free-will, and horoscopes; no miraculous, magical, or 100% guaranteed outcomes are made or implied.
                  </>
                ) : lang === 'gu' ? (
                  <>
                    <strong>નૈતિક જ્યોતિષીય માર્ગદર્શન:</strong> ભવાની જ્યોતિષ દ્વારા આપવામાં આવતી કુંડળી વિશ્લેષણ અને ગ્રહ ઉપાય સેવાઓ પ્રાચીન ભારતીય શાસ્ત્રો પર આધારિત છે. આ પરામર્શ માત્ર આધ્યાત્મિક અને માનસિક શાંતિ માટે છે; <strong>આ કોઈપણ સંજોગોમાં અધિકૃત તબીબી (ડોક્ટર), મનોચિકિત્સક કે કાનૂની વકીલની સલાહનો વિકલ્પ નથી.</strong> ગૂગલ અને મેટા નીતિઓનું સન્માન કરતાં, વ્યક્તિગત કર્મ અને ભાગ્ય અનુસાર પરિણામો બદલાઈ શકે છે; અમે કોઈપણ અવાસ્તવિક કે ચમત્કારિક ગેરંટી આપતા નથી.
                  </>
                ) : (
                  <>
                    <strong>शास्त्रोक्त एवं नैतिक परामर्श:</strong> भवानी ज्योतिष द्वारा प्रदान किया जाने वाला कुंडली विश्लेषण, ग्रह गणना एवं वैदिक अनुष्ठान परामर्श प्राचीन सनातन शास्त्रों (महर्षि पाराशर होरा शास्त्र) एवं व्यक्तिगत आस्था पर आधारित है। यह मार्गदर्शन विशुद्ध रूप से आध्यात्मिक संबल एवं आत्म-चिंतन हेतु है; <strong>इसे किसी भी परिस्थिति में अधिकृत चिकित्सकीय (डॉक्टर), मनोचिकित्सक, या कानूनी (वकील) सलाह का विकल्प न समझा जाए।</strong> गूगल एड्स, मेटा (फेसबुक/इंस्टा) एवं उपभोक्ता संरक्षण मानकों के अनुसार परिणाम जातक के व्यक्तिगत कर्म, ग्रह दशा व पुरुषार्थ पर निर्भर करते हैं; संस्थान किसी भी प्रकार के अवास्तविक अथवा १००% जादुई चमत्कारिक परिणामों का दावा नहीं करता है।
                  </>
                )}
              </p>

              {/* Policy Quick Links */}
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => openLegal('privacy')}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold">{lang === 'en' ? 'Privacy Policy' : lang === 'gu' ? 'ગોપનીયતા નીતિ' : 'गोपनीयता नीति (Privacy Policy)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegal('terms')}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">{lang === 'en' ? 'Terms of Service' : lang === 'gu' ? 'સેવાની શરતો' : 'सेवा की शर्तें (Terms of Service)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegal('disclaimer')}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-semibold">{lang === 'en' ? 'Astrology Disclaimer' : lang === 'gu' ? 'કાનૂની અસ્વીકરણ' : 'वैदिक परामर्श अस्वीकरण (Disclaimer)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright, compliance links, and blessings */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} भवानी ज्योतिष (Bhavani Jyotish) • मेहसाणा (गुजरात)
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <div className="flex items-center gap-3 text-stone-400">
              <button
                type="button"
                onClick={() => openLegal('privacy')}
                className="hover:text-amber-300 transition-colors underline cursor-pointer"
              >
                {lang === 'en' ? 'Privacy' : lang === 'gu' ? 'ગોપનીયતા' : 'गोपनीयता'}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal('terms')}
                className="hover:text-amber-300 transition-colors underline cursor-pointer"
              >
                {lang === 'en' ? 'Terms' : lang === 'gu' ? 'શરતો' : 'शर्तें'}
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => openLegal('disclaimer')}
                className="hover:text-amber-300 transition-colors underline cursor-pointer"
              >
                {lang === 'en' ? 'Disclaimer' : lang === 'gu' ? 'અસ્વીકરણ' : 'अस्वीकरण'}
              </button>
            </div>
          </div>

          <div className="text-amber-400/90 font-medium">
            🚩 सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
          </div>
        </div>
      </div>

      {/* Interactive Comprehensive Legal Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
        lang={lang}
      />
    </footer>
  );
};
