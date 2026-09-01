import React, { useState } from 'react';
import { ASTRO_SERVICES, ASTROLOGER_INFO } from '../data/astrologyData';
import { ScrollText, HeartHandshake, ShieldAlert, Briefcase, Users, Compass, Gem, Flame, CheckCircle, Sparkles, Phone, MessageCircle } from 'lucide-react';

interface ServicesSectionProps {
  lang: 'hi' | 'gu';
  onSelectService: (serviceId: string) => void;
  onOpenBooking: (serviceName?: string) => void;
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
  onSelectService,
  onOpenBooking
}) => {
  const [selectedService, setSelectedService] = useState<string>(ASTRO_SERVICES[0].id);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FFF5F0] text-[#CC5218] px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-[#FF671F]/30 mb-2">
          <Sparkles className="w-4 h-4 text-[#FF671F]" />
          <span>{lang === 'hi' ? 'शास्त्रोक्त वैदिक सेवाएं' : 'શાસ્ત્રોક્ત વૈદિક સેવાઓ'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'भवानी ज्योतिष की प्रमुख सेवाएं' : 'ભવાની જ્યોતિષની મુખ્ય સેવાઓ'}
        </h2>
        <p className="text-sm text-[#665448]">
          {lang === 'hi'
            ? '३५+ वर्षों की प्रामाणिक साधना व गहन ज्योतिषीय ज्ञान द्वारा जीवन की समस्त समस्याओं का अचूक निवारण'
            : '૩૫+ વર્ષના અનુભવ દ્વારા જીવનની તમામ સમસ્યાઓનું સચોટ નિવારણ'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {ASTRO_SERVICES.map((srv) => {
          const IconComp = ICON_MAP[srv.icon] || ScrollText;
          return (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-5 border border-[#FF671F]/20 shadow-md hover:shadow-xl hover:border-[#FF671F]/60 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {srv.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FF671F] to-[#CC5218] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                  लोकप्रिय (Popular)
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF5F0] to-[#FFEBE0] text-[#FF671F] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FF671F] group-hover:text-white transition-all shadow-sm">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="font-yatra text-lg text-[#2C2420] group-hover:text-[#CC5218] transition-colors mb-1.5 line-clamp-2">
                  {lang === 'hi' ? srv.titleHi : srv.titleGu}
                </h3>

                <p className="text-xs text-[#7A685B] mb-3 leading-relaxed">
                  {srv.subtitle}
                </p>

                <div className="space-y-1.5 mb-4 text-xs text-[#4A3B2C]">
                  {srv.keyBenefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#FF671F] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#FF671F]/15 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking(srv.titleHi)}
                  className="flex-1 bg-[#FFF5F0] hover:bg-[#FF671F] text-[#CC5218] hover:text-white font-bold py-2 rounded-xl text-xs transition-all text-center border border-[#FF671F]/30"
                >
                  {lang === 'hi' ? 'परामर्श बुक करें' : 'બુક કરો'}
                </button>

                <a
                  href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`प्रणाम पंडित जी! मुझे "${srv.titleHi}" सेवा के संबंध में जानकारी व परामर्श चाहिए।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                  title="व्हाट्सएप पर पूछें"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-gradient-to-r from-[#FFF5F0] via-[#FFEBE0] to-[#FFF5F0] rounded-3xl p-6 sm:p-8 border border-[#FF671F]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FF671F] text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
            🔱
          </div>
          <div>
            <h4 className="font-yatra text-xl sm:text-2xl text-[#CC5218]">
              {lang === 'hi' ? '100% प्रामाणिक एवं शास्त्रोक्त वैदिक अनुष्ठान' : '100% શાસ્ત્રોક્ત વૈદિક અનુષ્ઠાન'}
            </h4>
            <p className="text-xs sm:text-sm text-[#5C4A3E] mt-0.5">
              {lang === 'hi'
                ? 'सभी पूजाएं व यंत्र प्राण-प्रतिष्ठा शास्त्रोक्त विधि-विधान द्वारा संपन्न की जाती हैं।'
                : 'બધી પૂજાઓ શાસ્ત્રોક્ત વિધિ-વિધાન દ્વારા સંપન્ન કરવામાં આવે છે.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
            className="bg-[#FF671F] hover:bg-[#CC5218] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>{lang === 'hi' ? 'सीधे फोन पर बात करें' : 'ફોન પર વાત કરો'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
