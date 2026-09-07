import React from 'react';
import { PhoneCall, MessageCircle, QrCode } from 'lucide-react';
import { ASTROLOGER_INFO, getWhatsAppConsultationMessage } from '../data/astrologyData';
import { VerifiedBadge } from './VerifiedBadge';

interface FloatingActionsProps {
  onOpenAskAI?: () => void;
  onOpenPaymentQR?: () => void;
  lang?: 'hi' | 'gu' | 'en';
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ 
  lang = 'hi',
  onOpenPaymentQR,
}) => {
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 pointer-events-auto select-none print:hidden flex flex-col items-end gap-2.5">
      {/* Floating PhonePe Payment QR Button */}
      {onOpenPaymentQR && (
        <div className="relative group">
          <span className="absolute -inset-1 rounded-full bg-purple-600 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
          
          <button
            type="button"
            onClick={onOpenPaymentQR}
            className="relative flex items-center gap-2 bg-gradient-to-r from-[#5f259f] via-[#7b2cbf] to-[#4a154b] text-white py-2 px-3.5 sm:px-4 rounded-full shadow-[0_8px_25px_rgba(95,37,159,0.45)] border-2 border-purple-300 transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-[0_12px_30px_rgba(95,37,159,0.65)] cursor-pointer"
            title="PhonePe / UPI QR कोड से दक्षिणा या परामर्श शुल्क दें"
            aria-label="PhonePe QR कोड खोलें"
          >
            <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#5f259f] shadow-sm shrink-0 font-bold text-sm">
              पे
            </span>

            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-yatra text-xs sm:text-sm font-bold text-amber-200 tracking-wide drop-shadow-xs">
                {lang === 'en' ? 'Pay / QR' : lang === 'hi' ? 'दक्षिणा / QR' : 'દક્ષિણા / QR'}
              </span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित PhonePe QR" />
            </div>
          </button>
        </div>
      )}

      {/* Floating WhatsApp Chat Button with Verified Blue Tick */}
      <div className="relative group">
        {/* Glow behind WhatsApp */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
        
        <a
          href={`https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWhatsAppConsultationMessage(lang))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2 bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] text-white py-2 px-3.5 sm:px-4 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] border-2 border-white/80 transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-[0_12px_30px_rgba(37,211,102,0.65)]"
          title={`पंडित जी से व्हाट्सएप पर चैट करें: ${ASTROLOGER_INFO.phonePrimary}`}
          aria-label="पंडित जी से व्हाट्सएप चैट शुरू करें"
        >
          <span className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#25D366] shadow-sm shrink-0">
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
          </span>

          <div className="flex items-center gap-1.5 leading-tight">
            <span className="font-yatra text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-xs">
              {lang === 'en' ? 'WhatsApp Chat' : lang === 'hi' ? 'व्हाट्सएप चैट' : 'વોટ્સએપ ચેટ'}
            </span>
            <VerifiedBadge size="xs" tooltipText="सत्यापित आधिकारिक WhatsApp" />
          </div>
        </a>
      </div>

      {/* Floating Call Button */}
      <div className="relative group">
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-[#FF671F] opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />

        <a
          href={`tel:${ASTROLOGER_INFO.phonePrimary}`}
          className="relative flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#FF671F] via-[#E05312] to-[#B83E07] text-white py-1.5 px-3 sm:px-3.5 rounded-full shadow-[0_8px_25px_rgba(255,103,31,0.45)] border-2 border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95"
          title={`पंडित जी को तुरंत कॉल करें: ${ASTROLOGER_INFO.phonePrimary}`}
          aria-label="पंडित जी को सीधा कॉल करें"
        >
          <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#FF671F] shadow-xs shrink-0">
            <PhoneCall className="w-4 h-4 text-[#FF671F] fill-[#FF671F]" />
          </span>

          <div className="flex flex-col items-start leading-tight text-left">
            <span className="font-yatra text-xs sm:text-sm font-bold text-white tracking-wide">
              {lang === 'en' ? 'Direct Call' : 'सीधा कॉल'}
            </span>
            <span className="text-[10px] font-bold font-mono text-amber-100">
              {ASTROLOGER_INFO.phonePrimary}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
