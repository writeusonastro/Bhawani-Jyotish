import React, { useState } from 'react';
import { ASTRO_SERVICES, ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { ScrollText, HeartHandshake, ShieldAlert, Briefcase, Users, Compass, Gem, Flame, CheckCircle, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { RajputSymbol } from './RajputSymbol';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';

interface ServicesSectionProps {
  lang: Language;
  onSelectService?: (serviceId: string) => void;
  isDark?: boolean;
}

const ICON_MAP: { [key: string]: React.ElementType } = {
  ScrollText,
  HeartHandshake,
  ShieldAlert,
  Briefcase,
  Users,
  Compass,
  Gem,
  Flame,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  isDark = false,
}) => {
  const [selectedService, setSelectedService] = useState<string>(ASTRO_SERVICES[0].id);

  return (
    <div className={`py-10 px-4 max-w-7xl mx-auto transition-colors duration-300 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border mb-3 shadow-xs ${
          isDark 
            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-amber-950/40' 
            : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 text-[#852E10] border-amber-400/60'
        }`}>
          <RajputSymbol size="xs" />
          <span>
            {lang === 'en'
              ? 'Royal Vedic Astrological Services'
              : lang === 'hi'
              ? 'शास्त्रोक्त राजकीय वैदिक ज्योतिष सेवाएं'
              : 'શાસ્ત્રોક્ત રાજકીય વૈદિક જ્યોતિષ સેવાઓ'}
          </span>
        </div>
        <h2 className={`font-yatra text-3xl sm:text-5xl mb-3 tracking-wide ${isDark ? 'text-amber-300' : 'text-[#852E10]'}`}>
          {lang === 'en'
            ? 'Services Offered by Bhavani Jyotish'
            : lang === 'hi'
            ? 'भवानी ज्योतिष की प्रमुख सेवाएं'
            : 'ભવાની જ્યોતિષની મુખ્ય સેવાઓ'}
        </h2>
        <p className={`text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
          {lang === 'en'
            ? 'Decisive Vedic remedies for all life challenges rooted in 35+ years of disciplined practice & deep scriptural knowledge'
            : lang === 'hi'
            ? '३५+ वर्षों की प्रामाणिक साधना व गहन ज्योतिषीय ज्ञान द्वारा जीवन की समस्त समस्याओं का अचूक शास्त्रोक्त निवारण'
            : '૩૫+ વર્ષના અનુભવ દ્વારા જીવનની તમામ સમસ્યાઓનું સચોટ નિવારણ'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
        {ASTRO_SERVICES.map((srv) => {
          const IconComp = ICON_MAP[srv.icon] || ScrollText;
          return (
            <div
              key={srv.id}
              className={`rounded-3xl p-5 sm:p-6 border shadow-md hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-b from-[#1c150c] to-[#120d07] border-amber-500/30 hover:border-amber-400 shadow-amber-950/30 text-stone-100' 
                  : 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF3E5] border-amber-400/50 hover:border-amber-500 shadow-stone-200 text-stone-950 hover:shadow-amber-500/15'
              }`}
            >
              {srv.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-bl-xl shadow-md border-b border-l border-amber-300/40">
                  {lang === 'en' ? '★ Popular' : '★ लोकप्रिय'}
                </div>
              )}

              <div>
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-all shadow-sm ${
                  isDark 
                    ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30' 
                    : 'bg-gradient-to-br from-amber-100 to-orange-100 text-[#852E10] border border-amber-300/60'
                }`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className={`font-yatra text-xl transition-colors mb-2 font-bold ${
                  isDark ? 'text-amber-200 group-hover:text-amber-300' : 'text-[#852E10] group-hover:text-[#A83815]'
                }`}>
                  {lang === 'en' ? srv.titleEn : lang === 'hi' ? srv.titleHi : srv.titleGu}
                </h3>

                <p className={`text-xs mb-4 leading-relaxed font-medium ${
                  isDark ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  {srv.subtitle}
                </p>

                <div className={`space-y-2 mb-5 text-xs font-semibold ${
                  isDark ? 'text-stone-200' : 'text-stone-900'
                }`}>
                  {srv.keyBenefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-3.5 border-t flex items-center gap-2.5 ${
                isDark ? 'border-amber-500/20' : 'border-amber-400/30'
              }`}>
                <a
                  href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                  className={`flex-1 font-bold py-2.5 rounded-xl text-xs transition-all text-center border flex items-center justify-center gap-1.5 shadow-xs ${
                    isDark 
                      ? 'bg-amber-950/60 hover:bg-amber-600 text-amber-200 hover:text-white border-amber-500/30' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-amber-400'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Direct Call' : lang === 'hi' ? 'सीधे कॉल करें' : 'કોલ કરો'}</span>
                </a>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    getWhatsAppConsultationMessage(lang)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white transition-all shadow-xs border border-emerald-400/50 flex items-center gap-1"
                  title={lang === 'en' ? 'WhatsApp Consultation' : 'व्हाट्सएप पर परामर्श लें'}
                >
                  <MessageCircle className="w-4 h-4" />
                  <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Royal Trust & Guarantee Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-r from-[#1c140a] via-[#160f06] to-[#1c140a] border-amber-500/40' 
          : 'bg-gradient-to-r from-[#FFFDF8] via-[#FAF3E5] to-[#FFFDF8] border-amber-400/60 shadow-amber-500/10'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-lg border border-amber-300">
            🔱
          </div>
          <div>
            <h4 className={`font-yatra text-xl sm:text-2xl ${isDark ? 'text-amber-300' : 'text-[#852E10]'}`}>
              {lang === 'en'
                ? '100% Authentic Scriptural Vedic Rituals & Guidance'
                : lang === 'hi'
                ? '100% प्रामाणिक एवं शास्त्रोक्त वैदिक अनुष्ठान'
                : '100% શાસ્ત્રોક્ત વૈદિક અનુષ્ઠાન'}
            </h4>
            <p className={`text-xs sm:text-sm mt-1 font-medium ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>
              {lang === 'en'
                ? 'All pujas, energized yantras, and remedial rituals are conducted strictly as per authentic Vedic canons.'
                : lang === 'hi'
                ? 'सभी पूजाएं, अनुष्ठान व यंत्र प्राण-प्रतिष्ठा शास्त्रोक्त विधि-विधान द्वारा संपन्न की जाती हैं।'
                : 'બધી પૂજાઓ શાસ્ત્રોક્ત વિધિ-વિધાન દ્વારા સંપન્ન કરવામાં આવે છે.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
          <a
            href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
            className="w-full sm:w-auto justify-center bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-lg border border-amber-300 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-200" />
            <span>{lang === 'en' ? 'Call Pandit Ji Directly' : lang === 'hi' ? 'सीधे फोन पर बात करें' : 'ફોન પર વાત કરો'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

