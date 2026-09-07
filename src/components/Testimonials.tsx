import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/astrologyData';
import { Star, Quote, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { Language, Testimonial } from '../types/astrology';

interface TestimonialProps {
  lang: Language;
  isDark?: boolean;
}

export const Testimonials: React.FC<TestimonialProps> = ({ lang, isDark = false }) => {
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
    <div className={`py-12 px-4 max-w-7xl mx-auto border-t transition-colors duration-300 ${
      isDark ? 'border-amber-500/20 text-stone-100' : 'border-[#FF671F]/15 text-stone-900'
    }`}>
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
          isDark ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
        }`}>
          <span>⭐</span>
          <span>
            {lang === 'en'
              ? 'Client Stories & Spiritual Experiences'
              : lang === 'hi'
              ? 'भक्तों एवं जातकों के अनुभव'
              : 'જાતકોના અનુભવો'}
          </span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'en'
            ? 'Real Feedback from Satisfied Devotees'
            : lang === 'hi'
            ? 'संतुष्ट जातकों की सच्ची प्रतिक्रियाएं'
            : 'સંતુષ્ટ જાતકોનો પ્રતિસાદ'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#FF671F] text-white shadow-md shadow-[#FF671F]/20'
                : isDark
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {lang === 'en' ? '🌟 All Feedback' : lang === 'hi' ? '🌟 सभी अनुभव' : '🌟 બધા અનુભવો'} ({TESTIMONIALS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('abroad')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'abroad'
                ? 'bg-[#FF671F] text-white shadow-md shadow-[#FF671F]/20'
                : isDark
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === 'india'
                ? 'bg-[#FF671F] text-white shadow-md shadow-[#FF671F]/20'
                : isDark
                ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
            className={`rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-stone-900/90 border-amber-500/20 text-stone-100 shadow-black/40' 
                : 'bg-white border-[#FF671F]/20 text-stone-950 shadow-[#FF671F]/5'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  {item.isAbroad && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      NRI Verified
                    </span>
                  )}
                  <Quote className="w-7 h-7 text-[#FF671F]/20" />
                </div>
              </div>

              <p className={`text-xs sm:text-sm italic leading-relaxed mb-4 font-medium ${
                isDark ? 'text-stone-200' : 'text-stone-900'
              }`}>
                "{getComment(item)}"
              </p>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-amber-500/15' : 'border-[#FF671F]/15'}`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-bold text-sm flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
                  {item.flag && <span className="text-base">{item.flag}</span>}
                  <span>{item.name}</span>
                </h4>
                <span title="Verified Consultation">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
              
              <div className={`flex items-center justify-between text-[11px] mt-1 font-semibold ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FF671F]" />
                  {item.city} {item.country ? `• ${item.country}` : ''}
                </span>
                <span>{item.date}</span>
              </div>
              <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-md font-bold ${
                isDark 
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' 
                  : 'bg-[#FFF5F0] text-[#CC5218]'
              }`}>
                {item.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
