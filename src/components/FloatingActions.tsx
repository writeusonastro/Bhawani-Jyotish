import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface FloatingActionsProps {
  onOpenAskAI: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenAskAI }) => {
  return (
    <>
      {/* LEFT SIDE: WhatsApp Floating Button */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center pointer-events-auto">
        <a
          href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('प्रणाम पंडित जी! मुझे भवानी ज्योतिष केंद्र, मेहसाणा से परामर्श चाहिए।')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-600/50 transition-all hover:scale-110 border-2 border-white relative group active:scale-95"
          title="WhatsApp पर बात करें"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
          
          {/* Tooltip on hover */}
          <span className="hidden group-hover:block absolute left-16 bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            WhatsApp चैट
          </span>
        </a>
      </div>

      {/* RIGHT SIDE: Call Button + AI Ask */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* AI Ask trigger */}
        <button
          type="button"
          onClick={onOpenAskAI}
          className="group flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3.5 py-2.5 rounded-full shadow-xl shadow-purple-900/30 transition-all hover:scale-105 border border-purple-400/40 text-xs sm:text-sm font-bold"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span className="hidden sm:inline">AI ज्योतिषी से पूछें</span>
        </button>

        {/* Direct Call Button on Right Side */}
        <a
          href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
          className="w-14 h-14 rounded-full bg-[#FF671F] hover:bg-[#CC5218] text-white flex items-center justify-center shadow-2xl shadow-[#FF671F]/50 transition-all hover:scale-110 border-2 border-white relative group active:scale-95"
          title="सीधा कॉल करें"
          aria-label="Call Now"
        >
          <Phone className="w-7 h-7 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />

          {/* Tooltip on hover */}
          <span className="hidden group-hover:block absolute right-16 bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            सीधा कॉल करें ({ASTROLOGER_INFO.phonePrimary})
          </span>
        </a>
      </div>
    </>
  );
};
