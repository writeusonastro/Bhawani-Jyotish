import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/astrologyData';
import { Star, Quote, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { Language, Testimonial } from '../types/astrology';

interface TestimonialProps {
  lang: Language;
  isDark?: boolean;
}

export const Testimonials: React.FC<TestimonialProps> = ({ lang, isDark = true }) => {
  const [filter, setFilter] = useState<'all' | 'abroad' | 'india'>('all');

  const filteredList = TESTIMONIALS.filter((item) => {
    if (filter === 'abroad') return item.isAbroad;
    if (filter === 'india') return !item.isAbroad;
    return true;
  });

  const getComment = (item: Testimonial) => {
    if (lang === 'en' && item.commentEn) return item.commentEn;
    if (lang === 'gu' && item.commentGu) return item.commentGu;
    return item.comment;
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto border-t border-white/10 transition-colors duration-300 text-slate-100">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 bg-[#0c1334] text-[#ffd236] border-amber-500/30">
          <span>⭐</span>
          <span>
            {lang === 'en'
              ? 'Client Stories & Spiritual Experiences'
              : lang === 'hi'
              ? 'भक्तों एवं जातकों के अनुभव'
              : 'જાતકોના અનુભવો'}
          </span>
        </div>
        <h2 className="font-mukta font-extrabold text-2xl sm:text-4xl mb-2 royal-gold-gradient-text tracking-normal">
          {lang === 'en'
            ? 'Real Feedback from Satisfied Devotees'
            : lang === 'hi'
            ? 'संतुष्ट जातकों की सच्ची प्रतिक्रियाएं'
            : 'સંતુષ્ટ જાતકોનો પ્રતિસાદ'}
        </h2>
        <p className="text-sm font-medium text-slate-300">
          {lang === 'en'
            ? 'Heartfelt blessings & verified feedback from clients across USA, UK, UAE, Canada, South Africa, Mehsana & throughout Gujarat'
            : lang === 'hi'
            ? 'गुजरात, भारत एवं USA, UK, UAE, कनाडा व साउथ अफ्रीका में निवासरत प्रवासी यजमान परिवारों के सच्चे अनुभव'
            : 'ગુજરાત તેમજ USA, UK, UAE, કેનેડા અને સાઉથ આફ્રિકાના જાતકો અને શ્રદ્ધાળુ પરિવારોના સાચા અનુભવો'}
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-[#0c1334] text-slate-300 hover:bg-[#121b44] border border-white/10'
            }`}
          >
            {lang === 'en' ? '🌟 All Feedback' : lang === 'hi' ? '🌟 सभी अनुभव' : '🌟 બધા અનુભવો'} ({TESTIMONIALS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('abroad')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'abroad'
                ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-[#0c1334] text-slate-300 hover:bg-[#121b44] border border-white/10'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>
              {lang === 'en'
                ? '🌍 Abroad & NRI (USA, UK, UAE, CA, SA)'
                : lang === 'hi'
                ? '🌍 विदेश व NRI (USA, UK, UAE, कनाडा)'
                : '🌍 વિદેશ & NRI (USA, UK, UAE, કેનેડા)'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('india')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === 'india'
                ? 'bg-gradient-to-r from-[#f99c00] to-[#fcbb00] text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-[#0c1334] text-slate-300 hover:bg-[#121b44] border border-white/10'
            }`}
          >
            {lang === 'en' ? '🇮🇳 India & Gujarat' : lang === 'hi' ? '🇮🇳 भारत व गुजरात' : '🇮🇳 ભારત & ગુજરાત'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl p-6 border border-amber-500/20 bg-[#0c1334] shadow-xl hover:border-amber-400/50 transition-all flex flex-col justify-between text-slate-100"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#ffd236]" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  {item.isAbroad && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#070b1e] text-cyan-300 border border-cyan-500/30">
                      NRI Verified
                    </span>
                  )}
                  <Quote className="w-7 h-7 text-amber-400/20" />
                </div>
              </div>

              <p className="text-xs sm:text-sm italic leading-relaxed mb-4 font-medium text-slate-200">
                "{getComment(item)}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm flex items-center gap-1.5 text-white">
                  {item.flag && <span className="text-base">{item.flag}</span>}
                  <span>{item.name}</span>
                </h4>
                <span title="Verified Consultation">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
              
              <div className="flex items-center justify-between text-[11px] mt-1 font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#f99c00]" />
                  {item.city} {item.country ? `• ${item.country}` : ''}
                </span>
                <span>{item.date}</span>
              </div>
              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-md font-bold bg-[#070b1e] text-[#ffd236] border border-amber-500/30">
                {item.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
