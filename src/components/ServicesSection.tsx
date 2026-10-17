import React, { useState, useEffect, useMemo } from 'react';
import { ASTRO_SERVICES, ASTROLOGER_INFO } from '../data/astrologyData';
import { 
  ScrollText, 
  HeartHandshake, 
  ShieldAlert, 
  Briefcase, 
  Users, 
  Compass, 
  Gem, 
  Flame, 
  CheckCircle, 
  Sparkles, 
  Phone, 
  GraduationCap,
  Coins,
  Scale,
  Plane,
  Search,
  Filter,
  ShieldCheck,
  Star,
  Check,
  X
} from 'lucide-react';
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
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full border border-amber-400/60 shadow-md">
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
  Coins,
  Scale,
  Plane,
};

type ServiceCategory = 
  | 'all' 
  | 'love-vashikaran' 
  | 'family-dispute' 
  | 'business-wealth' 
  | 'child-marriage' 
  | 'dosha-protection' 
  | 'kundli-vastu';

interface CategoryFilter {
  id: ServiceCategory;
  nameHi: string;
  nameEn: string;
  serviceIds: string[];
}

const SERVICE_CATEGORIES: CategoryFilter[] = [
  {
    id: 'all',
    nameHi: 'समस्त सेवाएं (All)',
    nameEn: 'All Services',
    serviceIds: []
  },
  {
    id: 'love-vashikaran',
    nameHi: 'लव प्रॉब्लम व वशीकरण',
    nameEn: 'Love Problem & Vashikaran',
    serviceIds: ['love-marriage', 'par-stree-nivaran', 'khoya-pyar-wapas', 'vashikaran-tantra-raksha']
  },
  {
    id: 'family-dispute',
    nameHi: 'पति-पत्नी व गृह क्लेश',
    nameEn: 'Husband-Wife & Family Peace',
    serviceIds: ['vyasan-mukti', 'talak-rokna', 'saas-bahu-klesh', 'par-stree-nivaran']
  },
  {
    id: 'child-marriage',
    nameHi: 'संतान व शीघ्र विवाह',
    nameEn: 'Progeny & Quick Marriage',
    serviceIds: ['shighra-vivah', 'santan-gopal', 'gun-milan', 'nadi-dosh', 'child-guidance']
  },
  {
    id: 'business-wealth',
    nameHi: 'व्यापार, नौकरी व धन',
    nameEn: 'Business, Job & Wealth',
    serviceIds: ['career-business', 'vyapar-bandhan-mukti', 'gupt-dhan-siddhi', 'videsh-yatra-visa']
  },
  {
    id: 'dosha-protection',
    nameHi: 'दोष शांति व तंत्र रक्षा',
    nameEn: 'Dosha Shanti & Protection',
    serviceIds: ['dosh-nivaran', 'nadi-dosh', 'vashikaran-tantra-raksha', 'court-case-shatru-mukti', 'navgraha-puja']
  },
  {
    id: 'kundli-vastu',
    nameHi: 'कुंडली, वास्तु व हस्तरेखा',
    nameEn: 'Kundli, Vastu & Palmistry',
    serviceIds: ['kundli-analysis', 'palmistry-face-reading', 'vastu-shastra', 'gemstone-rudraksha']
  }
];

const QUICK_PROBLEM_TAGS = [
  { label: 'लव प्रॉब्लम समाधान', search: 'लव प्रॉब्लम' },
  { label: 'सात्विक वशीकरण', search: 'वशीकरण' },
  { label: 'पति व्यसन/दारू मुक्ति', search: 'व्यसन' },
  { label: 'सौतन से छुटकारा', search: 'पर-स्त्री' },
  { label: 'तलाक रुकवाना', search: 'तलाक' },
  { label: 'संतान प्राप्ति', search: 'संतान' },
  { label: 'शीघ्र विवाह', search: 'शीघ्र विवाह' },
  { label: 'नाड़ी दोष शांति', search: 'नाड़ी' },
  { label: 'व्यापार में घाटा', search: 'व्यापार' },
  { label: 'बुरी नजर व किया-कराया', search: 'बुरी नजर' },
  { label: 'हस्तरेखा व फलादेश', search: 'हस्तरेखा' },
  { label: 'कोर्ट-कचहरी विजय', search: 'कोर्ट' }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on category and search query
  const filteredServices = useMemo(() => {
    return ASTRO_SERVICES.filter((srv) => {
      // 1. Category Filter
      if (selectedCategory !== 'all') {
        const catObj = SERVICE_CATEGORIES.find(c => c.id === selectedCategory);
        if (catObj && !catObj.serviceIds.includes(srv.id)) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleHi = (srv.titleHi || '').toLowerCase();
        const titleEn = (srv.titleEn || '').toLowerCase();
        const subtitle = (srv.subtitle || '').toLowerCase();
        const desc = (srv.description || '').toLowerCase();
        const benefits = (srv.keyBenefits || []).join(' ').toLowerCase();
        const remedies = (srv.remedies || []).join(' ').toLowerCase();

        return (
          titleHi.includes(q) ||
          titleEn.includes(q) ||
          subtitle.includes(q) ||
          desc.includes(q) ||
          benefits.includes(q) ||
          remedies.includes(q)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="services-section" className="py-10 px-4 max-w-7xl mx-auto transition-colors duration-300 text-slate-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="w-full flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black border shadow-md bg-[#0c1334] text-amber-200 border-amber-500/40 shadow-amber-950/40">
            <RajputSymbol size="xs" />
            <span className="text-[#ffd236] font-extrabold tracking-wide">
              {lang === 'en'
                ? 'Royal Vedic Astrological Services & Solutions'
                : lang === 'hi'
                ? 'शास्त्रोक्त राजकीय वैदिक ज्योतिष सेवाएं एवं संपूर्ण समाधान'
                : 'શાસ્ત્રોક્ત રાજકીય વૈદિક જ્યોતિષ સેવાઓ'}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center mb-3">
          <h2 className="font-mukta font-black text-2xl sm:text-4xl md:text-5xl tracking-normal royal-gold-gradient-text leading-tight text-center">
            {lang === 'en'
              ? 'Complete Astrological Services Offered'
              : lang === 'hi'
              ? 'भवानी ज्योतिष की समस्त प्रमुख सेवाएं'
              : 'ભવાની જ્યોતિષની મુખ્ય સેવાઓ'}
          </h2>
        </div>
        <p className="text-sm sm:text-base font-bold max-w-2xl mx-auto leading-relaxed text-slate-200">
          {lang === 'en'
            ? 'Decisive Vedic remedies for all life challenges rooted in 35+ years of disciplined practice & authentic scriptural knowledge'
            : lang === 'hi'
            ? '३५+ वर्षों की प्रामाणिक साधना व गहन ज्योतिषीय ज्ञान द्वारा समस्त समस्याओं का त्वरित व अचूक शास्त्रोक्त समाधान'
            : '૩૫+ વર્ષના અનુભવ દ્વારા જીવનની તમામ સમસ્યાઓનું સચોટ નિવારણ'}
        </p>

        {/* High Trust Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-xs font-bold text-amber-200">
          <span className="inline-flex items-center gap-1.5 bg-[#0a0f28] border border-amber-500/30 px-3 py-1 rounded-full shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#fcbb00]" />
            <span>१००% सात्विक वैदिक उपाय</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#0a0f28] border border-amber-500/30 px-3 py-1 rounded-full shadow-xs">
            <Star className="w-4 h-4 text-[#ffd236] fill-[#ffd236]" />
            <span>पूर्णतः गोपनीय परामर्श</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#0a0f28] border border-amber-500/30 px-3 py-1 rounded-full shadow-xs">
            <Phone className="w-4 h-4 text-[#f99c00] animate-pulse" />
            <span>सीधी फोन पर बात: {ASTROLOGER_INFO.phonePrimary}</span>
          </span>
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className="mb-6 bg-[#0a0f28]/90 border border-amber-500/25 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
        {/* Search Input Box */}
        <div className="relative mb-3.5">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अपनी समस्या खोजें (उदा: लव प्रॉब्लम, वशीकरण, विवाह, व्यसन मुक्ति, संतान, व्यापार, नजर दोष)..."
            className="w-full bg-[#050714] text-amber-100 placeholder-slate-400 text-xs sm:text-sm font-bold pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              title="खोज साफ़ करें"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/20">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? ASTRO_SERVICES.length 
              : cat.serviceIds.length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] text-black border-amber-200 shadow-md shadow-amber-500/20 scale-102'
                    : 'bg-[#0c1334] text-slate-200 hover:text-amber-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                <span>{cat.nameHi}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-amber-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Problem Shortcuts */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-2.5 border-t border-white/10 mt-2 text-xs">
          <span className="text-amber-400 font-extrabold flex items-center gap-1 shrink-0 text-[11px] sm:text-xs">
            <Sparkles className="w-3 h-3 text-[#ffd236]" />
            <span>त्वरित समाधान:</span>
          </span>
          {QUICK_PROBLEM_TAGS.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery(tag.search);
              }}
              className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold transition-all border ${
                searchQuery === tag.search
                  ? 'bg-amber-400 text-black border-amber-300 font-black'
                  : 'bg-white/5 hover:bg-amber-500/15 text-slate-300 hover:text-amber-200 border-white/10 hover:border-amber-400/30'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid with Rotating Golden Border Beam & HD Photos */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12 px-4 bg-[#0c1334]/80 rounded-2xl border border-white/10 my-8">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto mb-3 opacity-80" />
          <h3 className="font-mukta font-extrabold text-xl text-amber-200 mb-1">
            कोई सेवा नहीं मिली
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            कृपया दूसरे शब्द से खोजें या सभी सेवाओं पर क्लिक करें।
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="bg-amber-400 text-black font-extrabold px-5 py-2 rounded-xl text-xs hover:bg-amber-300 transition-colors"
          >
            सभी सेवाएं देखें
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {filteredServices.map((srv) => {
            const IconComp = ICON_MAP[srv.icon] || ScrollText;
            const rawImage = srv.image || `/services/${srv.id}.jpg`;
            const imageSrc = `${rawImage}?v=7`;
            const secondarySrc = srv.secondaryImage ? `${srv.secondaryImage}?v=7` : undefined;
            const title = lang === 'en' ? srv.titleEn : lang === 'hi' ? srv.titleHi : srv.titleGu;

            return (
              <div
                key={srv.id}
                id={`service-${srv.id}`}
                className="golden-border-beam-card group scroll-mt-24"
              >
                <div className="golden-border-beam-inner text-slate-100 flex flex-col h-full">
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
                      <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] text-black text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-amber-200/90 flex items-center gap-1 z-10">
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
                      <h3 className="font-yatra text-lg sm:text-xl transition-colors mb-2 font-black text-[#ffd236] group-hover:text-[#fcbb00] leading-snug">
                        {title}
                      </h3>

                      <p className="text-xs mb-4 leading-relaxed font-bold text-slate-300 line-clamp-2">
                        {srv.subtitle}
                      </p>

                      <div className="space-y-2 mb-5 text-xs font-bold text-slate-200">
                        {srv.keyBenefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#f99c00] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct Call to Action Button */}
                    <div className="pt-3.5 border-t border-white/10 flex items-center mt-auto">
                      <a
                        href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
                        className="w-full font-black py-2.5 rounded-xl text-xs sm:text-sm transition-all text-center border flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-[#f99c00] to-[#fcbb00] hover:from-[#fcbb00] hover:to-[#ffd236] text-black border-amber-200 active:scale-95"
                        title={`पंडित जी से सीधा संपर्क: ${ASTROLOGER_INFO.phonePrimary}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-black animate-pulse" />
                        <span>सीधा फोन लगाएं: {ASTROLOGER_INFO.phonePrimary}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Royal Trust & Guarantee Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-black/40 relative overflow-hidden bg-[#0c1334] border-amber-500/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#070b1e] text-[#ffd236] flex items-center justify-center text-2xl shrink-0 shadow-lg border border-amber-500/40">
            🔱
          </div>
          <div>
            <h4 className="font-yatra text-xl sm:text-2xl font-black text-[#ffd236]">
              {lang === 'en'
                ? '100% Authentic Scriptural Vedic Rituals & Guidance'
                : lang === 'hi'
                ? '100% प्रामाणिक एवं शास्त्रोक्त वैदिक अनुष्ठान'
                : '100% શાસ્ત્રોક્ત વૈદિક અનુષ્ઠાન'}
            </h4>
            <p className="text-xs sm:text-sm mt-1 font-bold text-slate-200">
              {lang === 'en'
                ? 'All pujas, energized yantras, and remedial rituals are conducted strictly as per authentic Vedic canons.'
                : lang === 'hi'
                ? 'सभी पूजाएं, अनुष्ठान व यंत्र प्राण-प्रतिष्ठा शास्त्रोक्त विधि-विधान द्वारा संपन्न की जाती हैं। कोई छल-कपट या अंधविश्वास नहीं।'
                : 'બધી પૂજાઓ શાસ્ત્રોક્ત વિધિ-વિધાન દ્વારા સંપન્ન કરવામાં આવે છે.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
          <a
            href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
            className="w-full sm:w-auto justify-center bg-gradient-to-r from-[#f99c00] via-[#fcbb00] to-[#ffd236] hover:from-[#fcbb00] hover:to-[#ffd236] text-black font-black px-6 py-3 rounded-full text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(249,156,0,0.35)] border border-amber-200 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-black animate-pulse" />
            <span>{lang === 'en' ? `Call Pandit Ji Directly: ${ASTROLOGER_INFO.phonePrimary}` : lang === 'hi' ? `सीधा कॉल करें: ${ASTROLOGER_INFO.phonePrimary}` : `સીધો કોલ કરો: ${ASTROLOGER_INFO.phonePrimary}`}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
