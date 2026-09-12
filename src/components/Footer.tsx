import React from 'react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Phone, MessageCircle, Mail, MapPin, Clock, Facebook, Instagram, Share2, ShieldCheck } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, lang }) => {
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
    <footer id="contact" className="bg-[#1F1714] text-[#E5DCD6] pt-10 sm:pt-14 pb-8 border-t-4 border-[#FF671F] w-full max-w-full overflow-x-hidden print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Astrologer Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AnimatedLogo size="sm" isDark={true} lang={lang} />
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
              <span>{lang === 'en' ? 'Certified Astrological Center' : 'प्रामाणिक वैदिक ज्योतिष पीठ'}</span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित ज्योतिष संस्थान" />
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
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>{lang === 'en' ? 'Janam Kundli & Mahadasha' : 'जन्म कुंडली एवं महादशा'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('gun-milan')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>{lang === 'en' ? '36 Guna Kundli Matching' : '36 गुण विवाह मिलान'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('rashifal')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>{lang === 'en' ? 'Daily Horoscope (12 Rashis)' : 'दैनिक 12 राशि राशिफल'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('dosh-guide')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>{lang === 'en' ? 'Kalsarp & Manglik Shanti' : 'कालसर्प व मांगलिक शांति'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('panchang')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>{lang === 'en' ? 'Daily Panchang & Choghadiya' : 'दैनिक पंचांग व चौघड़िया'}</span>
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
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-purple-300 font-bold"
                >
                  <span className="text-purple-400">▸</span>
                  <span>{lang === 'en' ? 'PhonePe / UPI Dakshina QR' : 'PhonePe / UPI दक्षिणा QR कोड'}</span>
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
                <span>{ASTROLOGER_INFO.phonePrimary}</span>
              </a>

              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-emerald-300 transition-colors text-emerald-300 font-bold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp: {ASTROLOGER_INFO.phonePrimary}</span>
              </a>

              <div className="flex items-start gap-2 text-stone-100 font-medium">
                <Clock className="w-4 h-4 text-[#FF671F] shrink-0 mt-0.5" />
                <span>{getTimings()}</span>
              </div>

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
                {lang === 'en' ? '📍 View on Google Maps (Directions)' : '📍 गूगल मैप पर दिशा देखें (Directions)'}
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
                  {lang === 'en' ? 'Daily Rashifal, Vedic Panchang, Muhurat updates & Live Q&A' : 'दैनिक राशिफल, पंचांग, शुभ मुहूर्त एवं विशेष उपाय की जानकारी प्राप्त करें'}
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
              <span className="text-amber-300 font-semibold">प्रामाणिक वैदिक ज्योतिष सेवाएं: </span>
              सटीक वैदिक जन्म कुंडली चक्र निर्माण (Lagna &amp; Navamsha Chart), अष्टकूट 36 गुण विवाह मिलान (Gun Milan for Marriage), नाड़ी दोष व भकूट दोष परिहार, मांगलिक दोष निवारण, कालसर्प दोष शांति पूजा, पितृ दोष व साढ़ेसाती उपाय, आवासीय व व्यापारिक वास्तु शास्त्र, राशि अनुसार भाग्यशाली रत्न व रुद्राक्ष परामर्श। Overseas Visa &amp; PR Astrology (H1B Visa timing, Canada PR, UK Work Permit), foreign career stability, sacred remote Puja Sankalp on Tirthas (Siddhpur, Somnath, Ujjain). Worldwide Online Consultation for Indian Diaspora in USA (EST/CST/PST), UK (GMT), Canada (EST/PST), Australia (AEST), Singapore &amp; Gulf with Daylight Saving Time (DST) mathematical precision.
            </div>
          </div>
        </div>

        {/* Bottom copyright and blessings */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
          <div>
            © {new Date().getFullYear()} भवानी ज्योतिष (Bhavani Jyotish) • मेहसाणा (गुजरात)
          </div>

          <div className="text-amber-400/90 font-medium">
            🚩 सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
          </div>
        </div>
      </div>
    </footer>
  );
};
