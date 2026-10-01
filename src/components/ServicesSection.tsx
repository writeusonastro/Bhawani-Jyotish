import React, { useState, useEffect } from 'react';
import { ASTRO_SERVICES, ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { ScrollText, HeartHandshake, ShieldAlert, Briefcase, Users, Compass, Gem, Flame, CheckCircle, Sparkles, Phone, MessageCircle, GraduationCap } from 'lucide-react';
import { RajputSymbol } from './RajputSymbol';
import { VerifiedBadge } from './VerifiedBadge';
import { Language } from '../types/astrology';

interface ServicesSectionProps {
  lang: Language;
  onSelectService?: (serviceId: string) => void;
  isDark?: boolean;
}

const ServiceImageBanner: React.FC<{
  primarySrc: string;
  secondarySrc?: string;
  alt: string;
}> = ({ primarySrc, secondarySrc, alt }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto crossfade if secondary image is available
  useEffect(() => {
    if (!secondarySrc) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(interval);
  }, [secondarySrc]);

  return (
    <div 
      className="relative w-full h-full cursor-pointer select-none"
      onClick={(e) => {
        if (secondarySrc) {
          e.stopPropagation();
          setActiveIdx((prev) => (prev === 0 ? 1 : 0));
        }
      }}
      title={secondarySrc ? 'टैप करके दूसरी फोटो देखें (Tap to view second photo)' : undefined}
    >
      <img
        src={primarySrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        width={600}
        height={360}
        className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-out absolute inset-0 ${
          secondarySrc && activeIdx === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />
      {secondarySrc && (
        <img
          src={secondarySrc}
          alt={`${alt} 2`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          width={600}
          height={360}
          className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-out absolute inset-0 ${
            activeIdx === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}
      {secondarySrc && (
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-full border border-amber-400/50 shadow-md">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx(0);
            }}
            className={`h-2 rounded-full transition-all ${
              activeIdx === 0 ? 'bg-amber-400 w-4 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-white/50 w-2 hover:bg-white'
            }`}
            aria-label="Photo 1"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx(1);
            }}
            className={`h-2 rounded-full transition-all ${
              activeIdx === 1 ? 'bg-amber-400 w-4 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-white/50 w-2 hover:bg-white'
            }`}
            aria-label="Photo 2"
          />
        </div>
      )}
    </div>
  );
};

const ICON_MAP: { [key: string]: React.ElementType } = {
  ScrollText,
  HeartHandshake,
  ShieldAlert,
  Briefcase,
  Users,
  Compass,
  Gem,
  Flame,
  GraduationCap,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
}) => {
  return (
    <div id="services-section" className="py-10 px-4 max-w-7xl mx-auto transition-colors duration-300 text-slate-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="w-full flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border shadow-md bg-[#0c1334] text-amber-200 border-amber-500/40 shadow-amber-950/40">
            <RajputSymbol size="xs" />
            <span className="text-[#ffd236]">
              {lang === 'en'
                ? 'Royal Vedic Astrological Services'
                : lang === 'hi'
                ? 'शास्त्रोक्त राजकीय वैदिक ज्योतिष सेवाएं'
                : 'શાસ્ત્રોક્ત રાજકીય વૈદિક જ્યોતિષ સેવાઓ'}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center mb-3">
          <h2 className="font-mukta font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-normal royal-gold-gradient-text leading-tight text-center">
            {lang === 'en'
              ? 'Services Offered by Bhavani Jyotish'
              : lang === 'hi'
              ? 'भवानी ज्योतिष की प्रमुख सेवाएं'
              : 'ભવાની જ્યોતિષની મુખ્ય સેવાઓ'}
          </h2>
        </div>
        <p className="text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed text-slate-300">
          {lang === 'en'
            ? 'Decisive Vedic remedies for all life challenges rooted in 35+ years of disciplined practice & deep scriptural knowledge'
            : lang === 'hi'
            ? '३५+ वर्षों की प्रामाणिक साधना व गहन ज्योतिषीय ज्ञान द्वारा जीवन की समस्त समस्याओं का अचूक शास्त्रोक्त निवारण'
            : '૩૫+ વર્ષના અનુભવ દ્વારા જીવનની તમામ સમસ્યાઓનું સચોટ નિવારણ'}
        </p>
      </div>

      {/* Services Grid with Rotating Golden Border Beam & HD Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
        {ASTRO_SERVICES.map((srv) => {
          const IconComp = ICON_MAP[srv.icon] || ScrollText;
          const rawImage = srv.image || `/services/${srv.id}.jpg`;
          const imageSrc = `${rawImage}?v=6`;
          const secondarySrc = srv.secondaryImage ? `${srv.secondaryImage}?v=6` : undefined;
          const title = lang === 'en' ? srv.titleEn : lang === 'hi' ? srv.titleHi : srv.titleGu;

          return (
            <div
              key={srv.id}
              className="golden-border-beam-card group"
            >
              <div className="golden-border-beam-inner text-slate-100">
                {/* HD Image Banner with Cinematic Lighting & Badges */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#070b1e] shrink-0">
                  <ServiceImageBanner
                    primarySrc={imageSrc}
                    secondarySrc={secondarySrc}
                    alt={title}
                  />

                  {/* Dark gradient vignette ensuring text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1334] via-[#0c1334]/50 to-transparent pointer-events-none" />

                  {/* Popular Badge */}
                  {srv.popular && (
                    <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] text-black text-[11px] font-black px-3 py-1 rounded-full shadow-lg border border-amber-200/90 flex items-center gap-1 z-10">
                      <Sparkles className="w-3 h-3 fill-black text-black" />
                      <span>{lang === 'en' ? 'Popular' : 'लोकप्रिय'}</span>
                    </div>
                  )}

                  {/* Floating Thematic Icon Medallion */}
                  <div className="absolute bottom-2.5 left-4 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg bg-[#070b1e]/95 text-[#ffd236] border-2 border-amber-400/60 backdrop-blur-md group-hover:border-amber-300 group-hover:scale-105 transition-all z-10">
                    <IconComp className="w-5 h-5 text-[#ffd236]" />
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-yatra text-lg sm:text-xl transition-colors mb-2 font-bold text-[#ffd236] group-hover:text-[#fcbb00] leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs mb-4 leading-relaxed font-medium text-slate-300 line-clamp-2">
                      {srv.subtitle}
                    </p>

                    <div className="space-y-2 mb-5 text-xs font-semibold text-slate-200">
                      {srv.keyBenefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#f99c00] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="pt-3.5 border-t border-white/10 flex items-center gap-2.5">
                    <a
                      href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                      className="flex-1 font-bold py-2.5 rounded-xl text-xs transition-all text-center border flex items-center justify-center gap-1.5 shadow-md bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#fcbb00] hover:to-[#ffd236] text-black border-amber-200 active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Direct Call' : lang === 'hi' ? 'सीधे कॉल करें' : 'કોલ કરો'}</span>
                    </a>

                    <a
                      href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `${getWhatsAppConsultationMessage(lang)} (${srv.titleHi})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-[#00bb7f] hover:bg-[#10b981] text-white transition-all shadow-md border border-emerald-400/50 flex items-center gap-1 active:scale-95"
                      title={lang === 'en' ? 'WhatsApp Consultation' : 'व्हाट्सएप पर परामर्श लें'}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <VerifiedBadge size="xs" tooltipText="सत्यापित WhatsApp" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Royal Trust & Guarantee Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-black/40 relative overflow-hidden bg-[#0c1334] border-amber-500/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#070b1e] text-[#ffd236] flex items-center justify-center text-2xl shrink-0 shadow-lg border border-amber-500/40">
            🔱
          </div>
          <div>
            <h4 className="font-yatra text-xl sm:text-2xl text-[#ffd236]">
              {lang === 'en'
                ? '100% Authentic Scriptural Vedic Rituals & Guidance'
                : lang === 'hi'
                ? '100% प्रामाणिक एवं शास्त्रोक्त वैदिक अनुष्ठान'
                : '100% શાસ્ત્રોક્ત વૈદિક અનુષ્ઠાન'}
            </h4>
            <p className="text-xs sm:text-sm mt-1 font-medium text-slate-300">
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
            className="w-full sm:w-auto justify-center bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] hover:from-[#fcbb00] hover:to-[#ffd236] text-black font-black px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(249,156,0,0.35)] border border-amber-200 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-black" />
            <span>{lang === 'en' ? 'Call Pandit Ji Directly' : lang === 'hi' ? 'सीधे फोन पर बात करें' : 'ફોન પર વાત કરો'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

