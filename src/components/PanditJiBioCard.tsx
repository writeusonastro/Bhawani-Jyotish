import React from 'react';
import { Award, Phone, MessageCircle, Star, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';

interface PanditJiBioCardProps {
  lang: Language;
}

export const PanditJiBioCard: React.FC<PanditJiBioCardProps> = ({ lang }) => {
  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto">
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-amber-400/50 dark:border-amber-500/30 bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF3E8] dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 shadow-2xl shadow-amber-900/10 overflow-hidden">
        
        {/* Top Royal Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-[#FF671F] to-amber-500" />

        {/* Ambient Subtle Sunburst Background Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Corner Filigree SVGs */}
        <div className="absolute top-3 left-3 text-amber-500/30 text-xs font-serif select-none pointer-events-none">
          ✦ ॐ ✦
        </div>
        <div className="absolute top-3 right-3 text-amber-500/30 text-xs font-serif select-none pointer-events-none">
          ✦ ॐ ✦
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ============================================================ */}
          {/* LEFT: Royal Acharya Insignia & Profile Identity */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            
            {/* Sacred Vedic Medallion Frame */}
            <div className="relative group">
              {/* Outer Golden Aura Ring */}
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400 via-[#FF671F] to-yellow-500 opacity-75 blur-sm group-hover:opacity-100 transition duration-500" />
              
              {/* Rotating Celestial Dashed Ring */}
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-400/80 animate-spin-clockwise-90s" />

              {/* Main Circular Medallion */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#FF671F] via-[#D9531E] to-[#993408] p-2 shadow-2xl border-4 border-amber-300 flex items-center justify-center">
                
                {/* Inner Sacred Centerpiece */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#FFEAD8] flex flex-col items-center justify-center text-[#CC5218] p-3 sm:p-4 shadow-inner relative overflow-hidden">
                  
                  {/* Rotating Sacred Swastik PNG without inner circle */}
                  <div className="relative z-10 flex items-center justify-center my-1 sm:my-1.5">
                    <img
                      src="/swastik.png"
                      alt="Sacred Vedic Swastik"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain animate-[spin_18s_linear_infinite] will-change-transform filter drop-shadow-[0_4px_10px_rgba(255,103,31,0.35)]"
                    />
                  </div>

                  {/* Sacred Vedic Inscription */}
                  <span className="relative z-10 font-yatra text-xs font-extrabold text-[#993408] tracking-widest uppercase mt-0.5">
                    ॥ ॐ नमः शिवाय ॥
                  </span>
                  
                  <span className="relative z-10 font-yatra text-sm sm:text-base font-black text-[#CC5218] mt-0.5">
                    {lang === 'en' ? ASTROLOGER_INFO.nameEn : lang === 'hi' ? 'पं. विरेंद्र कुमार जोशी' : 'પં. વિરેન્દ્ર કુમાર જોશી'}
                  </span>
                </div>
              </div>

              {/* Gold Medalist Ribbon Badge on Avatar */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-900 font-extrabold px-3.5 py-1 rounded-full text-[11px] shadow-lg border border-amber-200 flex items-center gap-1.5 whitespace-nowrap">
                <span>🏅</span>
                <span>{lang === 'en' ? 'Gold Medalist' : 'गोल्ड मेडलिस्ट'}</span>
              </div>
            </div>

            {/* Pandit Ji Details & Accreditations */}
            <div className="mt-6 space-y-2 w-full text-center">
              <h3 className="font-yatra text-xl sm:text-2xl md:text-3xl text-stone-900 dark:text-amber-100 text-center leading-tight tracking-tight">
                <span>{lang === 'en' ? 'Pt. Shri Virendra Kumar' : lang === 'hi' ? 'पंडित श्री विरेंद्र कुमार' : 'પંડિત શ્રી વિરેન્દ્ર કુમાર'} </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap align-middle">
                  <span>{lang === 'en' ? 'Joshi' : lang === 'hi' ? 'जोशी' : 'જોશી'}</span>
                  <VerifiedBadge size="md" tooltipText="पंडित श्री विरेंद्र कुमार जोशी - अधिकृत सत्यापित ज्योतिषाचार्य" />
                </span>
              </h3>

              <div className="flex flex-col items-center justify-center gap-1 pt-0.5 text-center">
                <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-bold">
                  <span className="text-amber-600 dark:text-amber-400">✨</span>
                  <span>{lang === 'en' ? ASTROLOGER_INFO.experienceEn : lang === 'hi' ? ASTROLOGER_INFO.experience : ASTROLOGER_INFO.experienceGu}</span>
                </div>

                <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#FF671F] shrink-0" />
                  <span>{lang === 'en' ? ASTROLOGER_INFO.locationEn : lang === 'hi' ? ASTROLOGER_INFO.location : ASTROLOGER_INFO.locationGu}</span>
                </div>
              </div>

              {/* Rating & Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <div className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-3 py-1 rounded-xl text-xs font-bold border border-amber-300/60">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 (2,800+ समीक्षाएं)</span>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-xl text-xs font-bold border border-emerald-300/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{lang === 'en' ? 'Available on Direct Call' : 'फोन पर सीधे उपलब्ध'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: Distinguished Experience, Credentials & Action */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Regional Honor Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-[#FF671F]/15 to-amber-500/15 text-[#CC5218] dark:text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border border-[#FF671F]/30 shadow-xs">
              <Award className="w-4 h-4 text-[#FF671F]" />
              <span>
                {lang === 'en' ? 'Renowned Vedic Astrologer of North Gujarat' : lang === 'hi' ? 'उत्तर गुजरात के सुप्रसिद्ध ज्योतिषाचार्य' : 'ઉત્તર ગુજરાતના સુપ્રસિદ્ધ જ્યોતિષાચાર્ય'}
              </span>
            </div>

            {/* Main Headline */}
            <h3 className="font-yatra text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-amber-50 tracking-tight leading-tight">
              {lang === 'en'
                ? 'Traditional Vedic Wisdom & Authentic Astrological Practice'
                : lang === 'hi'
                ? 'परंपरागत वैदिक ज्ञान एवं प्रामाणिक ज्योतिषीय साधना'
                : 'પરંપરાગત વૈદિક જ્ઞાન અને જ્યોતિષીય સાધના'}
            </h3>

            {/* Description Body */}
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
              {lang === 'en' ? ASTROLOGER_INFO.aboutEn : lang === 'hi' ? ASTROLOGER_INFO.aboutHi : ASTROLOGER_INFO.aboutGu}
            </p>

            {/* 4 Bento Credential Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              <div className="flex items-start gap-3 p-3.5 rounded-2xl border bg-white dark:bg-stone-800/80 border-amber-300/50 dark:border-amber-500/20 shadow-xs hover:border-[#FF671F]/50 transition-all">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold">
                  🏅
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {lang === 'en' ? 'Gold Medalist Acharya' : 'स्वर्ण पदक सम्मानित'}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                    {lang === 'en' ? 'Maharishi Parashara Jyotish Parishad' : 'महर्षि पाराशर ज्योतिष परिषद द्वारा अलंकृत'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl border bg-white dark:bg-stone-800/80 border-amber-300/50 dark:border-amber-500/20 shadow-xs hover:border-[#FF671F]/50 transition-all">
                <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FF671F] flex items-center justify-center shrink-0 font-bold">
                  👥
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {lang === 'en' ? '50,000+ Happy Clients' : '50,000+ संतुष्ट जातक'}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                    {lang === 'en' ? 'Trusted across India & Abroad' : 'भारत एवं विदेशों में 35 वर्षों से अटूट विश्वास'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl border bg-white dark:bg-stone-800/80 border-amber-300/50 dark:border-amber-500/20 shadow-xs hover:border-[#FF671F]/50 transition-all">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold">
                  📜
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {lang === 'en' ? '35+ Years Lineage' : '35+ वर्ष कुल परंपरा'}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                    {lang === 'en' ? 'Authentic Parashari & Lal Kitab' : 'प्रामाणिक वैदिक पाराशरी व लाल किताब पद्धति'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl border bg-white dark:bg-stone-800/80 border-amber-300/50 dark:border-amber-500/20 shadow-xs hover:border-[#FF671F]/50 transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {lang === 'en' ? '100% Confidential' : '100% पूर्ण गोपनीयता'}
                  </h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                    {lang === 'en' ? 'Direct Personal Consultation' : 'पंडित जी से सीधा व पूर्ण गोपनीय संवाद'}
                  </p>
                </div>
              </div>

            </div>

            {/* Speciality Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF671F]" />
                <span>विशेषज्ञता:</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-stone-800 border border-amber-300/40">
                जन्मकुंडली विश्लेषण
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-stone-800 border border-amber-300/40">
                विवाह व गुण मिलान
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-stone-800 border border-amber-300/40">
                कालसर्प व मांगलिक दोष शांति
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-stone-800 border border-amber-300/40">
                वैदिक वास्तु व रत्न परामर्श
              </span>
            </div>

            {/* Action Call-to-Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0B2545] via-[#133E7C] to-[#081B33] hover:from-[#133E7C] hover:to-[#0B2545] text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-slate-950/20 hover:scale-[1.02] active:scale-[0.98] border-2 border-amber-300/60 ring-2 ring-amber-400/20 text-center"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-amber-300" />
                </div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                    {lang === 'en' ? 'Call Now Directly' : 'सीधे फोन पर बात करें'}
                  </div>
                  <div className="font-outfit text-sm sm:text-base font-extrabold tracking-wider">
                    {ASTROLOGER_INFO.phonePrimary}
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWhatsAppConsultationMessage(lang))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20bd5a] hover:to-[#1aa852] text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] border border-emerald-300/40 text-center"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>{lang === 'en' ? 'WhatsApp Message' : 'व्हाट्सएप पर तुरंत संपर्क करें'}</span>
                <VerifiedBadge size="sm" tooltipText="सत्यापित WhatsApp" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
