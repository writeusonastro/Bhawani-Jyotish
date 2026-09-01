import React from 'react';
import { TESTIMONIALS } from '../data/astrologyData';
import { Star, Quote, MapPin } from 'lucide-react';

interface TestimonialProps {
  lang: 'hi' | 'gu';
  isDark?: boolean;
}

export const Testimonials: React.FC<TestimonialProps> = ({ lang, isDark = false }) => {
  return (
    <div className={`py-12 px-4 max-w-7xl mx-auto border-t transition-colors duration-300 ${
      isDark ? 'border-amber-500/20 text-stone-100' : 'border-[#FF671F]/15 text-stone-900'
    }`}>
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
          isDark ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' : 'bg-[#FFF5F0] text-[#CC5218] border-[#FF671F]/30'
        }`}>
          <span>⭐</span>
          <span>{lang === 'hi' ? 'भक्तों एवं जातकों के अनुभव' : 'જાતકોના અનુભવો'}</span>
        </div>
        <h2 className={`font-yatra text-2xl sm:text-4xl mb-2 ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>
          {lang === 'hi' ? 'संतुष्ट जातकों की सच्ची प्रतिक्रियाएं' : 'સંતુષ્ટ જાતકોનો પ્રતિસાદ'}
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-900'}`}>
          {lang === 'hi'
            ? 'मेहसाणा, विसनगर, अहमदाबाद, ऊंझा और संपूर्ण गुजरात से पधारे जातकों के अनुभव'
            : 'મહેસાણા, વિસનગર, અમદાવાદ, ઊંઝા અને ગુજરાતના શ્રદ્ધાળુઓના અનુભવ'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl p-6 border shadow-md hover:shadow-lg transition-all flex flex-col justify-between ${
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
                <Quote className="w-8 h-8 text-[#FF671F]/20" />
              </div>

              <p className={`text-xs sm:text-sm italic leading-relaxed mb-4 font-medium ${
                isDark ? 'text-stone-200' : 'text-stone-950'
              }`}>
                "{item.comment}"
              </p>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-amber-500/15' : 'border-[#FF671F]/15'}`}>
              <h4 className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-[#CC5218]'}`}>{item.name}</h4>
              <div className={`flex items-center justify-between text-[11px] mt-0.5 font-semibold ${
                isDark ? 'text-stone-300' : 'text-stone-950'
              }`}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FF671F]" />
                  {item.city}
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
