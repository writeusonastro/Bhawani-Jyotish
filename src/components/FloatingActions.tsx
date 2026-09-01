import React from 'react';
import { Phone, MessageCircle, Sparkles, Calendar } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
  onOpenAskAI: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking, onOpenAskAI }) => {
  return (
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

      {/* Book Puja / Appointment */}
      <button
        type="button"
        onClick={onOpenBooking}
        className="group flex items-center gap-2 bg-[#FF671F] hover:bg-[#CC5218] text-white px-4 py-2.5 rounded-full shadow-xl shadow-[#FF671F]/40 transition-all hover:scale-105 border border-amber-300/40 text-xs sm:text-sm font-bold"
      >
        <Calendar className="w-4 h-4 text-amber-200" />
        <span className="hidden sm:inline">अपॉइंटमेंट बुक करें</span>
      </button>

      {/* WhatsApp Action Button */}
      <a
        href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('प्रणाम पंडित जी! मुझे ज्योतिषीय परामर्श प्राप्त करना है।')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-emerald-600/40 transition-all hover:scale-110 border-2 border-white relative group"
        title="WhatsApp पर बात करें"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
      </a>
    </div>
  );
};
