import React from 'react';
import { PhoneCall } from 'lucide-react';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface FloatingActionsProps {
  onOpenAskAI?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = () => {
  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto select-none print:hidden">
      {/* Attractive Glowing Pulse Rings */}
      <div className="relative group">
        {/* Ambient Glow / Radar Wave */}
        <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 opacity-80 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />
        <span className="absolute -inset-1 rounded-full border-2 border-emerald-400/50 animate-ping pointer-events-none opacity-40" />

        {/* Floating Call Button */}
        <a
          href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
          className="relative flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-1.5 sm:p-2 pr-4 sm:pr-5 rounded-full shadow-[0_10px_35px_rgba(5,150,105,0.55)] border-2 border-amber-300/90 transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-[0_14px_45px_rgba(5,150,105,0.75)]"
          title={`पंडित जी से सीधा संपर्क करें: ${ASTROLOGER_INFO.phonePrimary}`}
          aria-label="पंडित जी को सीधा कॉल करें"
        >
          {/* Circular Phone Icon with Glow */}
          <span className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-emerald-700 shadow-md group-hover:rotate-12 transition-transform duration-300 shrink-0">
            <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 fill-emerald-600 animate-bounce" />
            
            {/* Live Active Status Indicator Dot */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white shadow-xs">
              <span className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-75" />
            </span>
          </span>

          {/* Text Information Block */}
          <div className="flex flex-col items-start leading-tight text-left">
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block animate-pulse" />
              <span>पंडित जी उपलब्ध हैं</span>
            </span>
            <span className="font-yatra text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-sm">
              सीधा कॉल करें
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold font-mono text-emerald-100 opacity-95">
              {ASTROLOGER_INFO.phonePrimary}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

