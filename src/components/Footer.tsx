import React from 'react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  lang: 'hi' | 'gu';
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, lang }) => {
  return (
    <footer id="contact" className="bg-[#1F1714] text-[#E5DCD6] pt-14 pb-8 border-t-4 border-[#FF671F]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Acharya Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF671F] to-[#CC5218] flex items-center justify-center text-white text-2xl font-bold font-yatra shadow-md border border-amber-300">
                ॐ
              </div>
              <div>
                <h3 className="font-yatra text-2xl text-amber-400">
                  भवानी ज्योतिष
                </h3>
                <span className="text-xs text-amber-200/80 block">
                  मेहसाणा (गुजरात)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {lang === 'hi'
                ? '३५+ वर्षों से वैदिक ज्योतिष, पराशर होरा शास्त्र एवं शास्त्रोक्त अनुष्ठानों द्वारा जन-कल्याण हेतु समर्पित उत्तर गुजरात का प्रतिष्ठित ज्योतिष संस्थान।'
                : '૩૫+ વર્ષોથી વૈદિક જ્યોતિષ અને શાસ્ત્રોક્ત અનુષ્ઠાન દ્વારા માર્ગદર્શન કરતું મહેસાણાનું પ્રતિષ્ઠિત જ્યોતિષ કેન્દ્ર.'}
            </p>

            <div className="pt-2 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <span>🔱</span>
              <span>{ASTROLOGER_INFO.name}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-yatra text-lg text-amber-400 pb-1 border-b border-[#FF671F]/30">
              {lang === 'hi' ? 'महत्वपूर्ण सेवाएं' : 'મહત્વપૂર્ણ સેવાઓ'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-200">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('kundli')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>जन्म कुंडली एवं महादशा</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('gun-milan')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>36 गुण विवाह मिलान</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('rashifal')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>दैनिक 12 राशि राशिफल</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('dosh-guide')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>कालसर्प व मांगलिक शांति</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('panchang')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FF671F]">▸</span>
                  <span>दैनिक पंचांग व चौघड़िया</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-yatra text-lg text-amber-400 pb-1 border-b border-[#FF671F]/30">
              {lang === 'hi' ? 'संपर्क एवं परामर्श' : 'સંપર્ક અને પરામર્શ'}
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
                <span>{ASTROLOGER_INFO.timings}</span>
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
              {lang === 'hi' ? 'कार्यालय का पता (Mehsana)' : 'ઓફિસનું સરનામું'}
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-bold text-stone-100">
                  {lang === 'hi' ? ASTROLOGER_INFO.address : ASTROLOGER_INFO.addressGu}
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Nagalpur+Mehsana+Gujarat+384002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md mt-1"
              >
                📍 गूगल मैप पर दिशा देखें (Directions)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright and blessings */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
          <div>
            © {new Date().getFullYear()} भवानी ज्योतिष (Bhavani Jyotish) - मेहसाणा, गुजरात। सर्वाधिकार सुरक्षित।
          </div>

          <div className="text-amber-400/90 font-medium">
            🚩 सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
          </div>
        </div>
      </div>
    </footer>
  );
};
