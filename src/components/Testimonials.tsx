import React from 'react';
import { TESTIMONIALS } from '../data/astrologyData';
import { Star, Quote, MapPin } from 'lucide-react';

interface TestimonialProps {
  lang: 'hi' | 'gu';
}

export const Testimonials: React.FC<TestimonialProps> = ({ lang }) => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto border-t border-[#FF671F]/15">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#FFF5F0] text-[#CC5218] px-3 py-1 rounded-full text-xs font-bold border border-[#FF671F]/30 mb-2">
          <span>⭐</span>
          <span>{lang === 'hi' ? 'भक्तों एवं जातकों के अनुभव' : 'જાતકોના અનુભવો'}</span>
        </div>
        <h2 className="font-yatra text-2xl sm:text-4xl text-[#CC5218] mb-2">
          {lang === 'hi' ? 'संतुष्ट जातकों की सच्ची प्रतिक्रियाएं' : 'સંતુષ્ટ જાતકોનો પ્રતિસાદ'}
        </h2>
        <p className="text-sm text-[#665448]">
          {lang === 'hi'
            ? 'मेहसाणा, विसनगर, अहमदाबाद, ऊंझा और संपूर्ण गुजरात से पधारे जातकों के अनुभव'
            : 'મહેસાણા, વિસનગર, અમદાવાદ, ઊંઝા અને ગુજરાતના શ્રદ્ધાળુઓના અનુભવ'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-[#FF671F]/20 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
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

              <p className="text-xs sm:text-sm text-[#2C2420] italic leading-relaxed mb-4">
                "{item.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#FF671F]/15">
              <h4 className="font-bold text-sm text-[#CC5218]">{item.name}</h4>
              <div className="flex items-center justify-between text-[11px] text-[#7A685B] mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FF671F]" />
                  {item.city}
                </span>
                <span>{item.date}</span>
              </div>
              <span className="inline-block mt-2 text-[10px] bg-[#FFF5F0] text-[#CC5218] px-2 py-0.5 rounded-md font-medium">
                {item.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
