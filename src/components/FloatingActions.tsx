import React from 'react';
import { PhoneCall, MessageCircle, QrCode, Phone, ShieldCheck, Globe } from 'lucide-react';
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
  const callHeadline = lang === 'en' 
    ? 'Direct Phone Consultation' 
    : lang === 'hi' 
    ? 'पंडित जी से सीधे फोन पर बात करें' 
    : 'પંડિતજી સાથે સીધી વાત કરો';

  return (
    <>
      {/* =========================================================================
          1. MOBILE FULL-WIDTH STICKY CALLING BAR (Fixed at Bottom for Max Calls)
          Guarantees every mobile visitor has a 1-tap direct call button at their thumb
          ========================================================================= */}
      <div 
        id="mobile-sticky-call-bar"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1F1714]/98 backdrop-blur-lg border-t-2 border-[#FF671F] shadow-[0_-6px_25px_rgba(0,0,0,0.4)] px-2.5 pt-2 pb-3 select-none print:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        {/* Single Balanced Top Strip: Left [बिना प्रतीक्षा सीधा संवाद] | Center [USA, UK, Canada, Australia, UAE] | Right [35+ वर्ष अनुभव] */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 px-0.5 mb-1.5 text-[9px] min-[370px]:text-[10px] sm:text-[11px] text-amber-200">
          {/* Left: Instant Direct Consultation */}
          <div className="flex items-center gap-1 shrink-0 font-bold text-stone-200">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="whitespace-nowrap">
              {lang === 'en' ? 'Direct Consultation' : lang === 'hi' ? 'बिना प्रतीक्षा सीधा संवाद' : 'સીધો સંવાદ'}
            </span>
          </div>

          {/* Center: In Between - Global NRI Countries */}
          <div className="flex items-center justify-center gap-1 font-bold text-amber-300 bg-black/40 px-1.5 py-0.5 rounded-full border border-amber-500/30 whitespace-nowrap text-[8.5px] min-[370px]:text-[9.5px] tracking-tight">
            <Globe className="w-2.5 h-2.5 text-amber-400 shrink-0" />
            <span>USA, UK, Canada, Australia, UAE</span>
          </div>

          {/* Right: 35+ Years Experience */}
          <div className="flex items-center gap-1 text-[9px] min-[370px]:text-[10px] text-amber-300 shrink-0 font-semibold bg-amber-950/80 px-1.5 py-0.5 rounded-full border border-amber-600/40 whitespace-nowrap">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span>35+ वर्ष अनुभव</span>
          </div>
        </div>

        {/* Action Buttons Row: 68% Direct Call | 32% WhatsApp */}
        <div className="grid grid-cols-12 gap-2 items-center">
          {/* Main Direct Call Button - Deep Navy Blue (Royal Navy) with Gold accents for utmost clarity & regal look */}
          <a
            href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
            className="col-span-8 relative overflow-hidden flex items-center justify-start gap-2.5 bg-gradient-to-r from-[#0B2545] via-[#133E7C] to-[#081B33] hover:from-[#133E7C] hover:to-[#0B2545] text-white py-2 px-3 rounded-xl shadow-lg shadow-slate-950/70 border-2 border-amber-300 active:scale-98 transition-all"
            title={`पंडित जी को सीधे कॉल करें: ${ASTROLOGER_INFO.phonePrimary}`}
          >
            {/* Shimmer animation on Call button */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0B2545] shadow-md shrink-0 animate-bounce">
              <PhoneCall className="w-4 h-4 fill-current" />
            </div>

            <div className="flex flex-col items-start leading-tight min-w-0 flex-1">
              <div className="flex items-center gap-1.5 w-full">
                <span className="font-mukta text-xs sm:text-sm font-extrabold text-amber-300 tracking-wide truncate">
                  {lang === 'en' ? 'Direct Call' : lang === 'hi' ? 'सीधे फोन करें' : 'સીધો કોલ કરો'}
                </span>
                <span className="text-[10px] bg-white/20 text-amber-200 px-1.5 py-0.2 rounded font-outfit font-bold leading-tight border border-amber-300/40">
                  Global
                </span>
              </div>
              <span className="text-sm sm:text-base phone-crisp font-black text-white tracking-wide truncate leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {ASTROLOGER_INFO.phonePrimary}
              </span>
            </div>
          </a>

          {/* WhatsApp Direct Chat Button (Worldwide Free Calling & Chat) */}
          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappRaw || '919909087902'}?text=${encodeURIComponent(getWhatsAppConsultationMessage(lang))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-4 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white py-2.5 px-2 rounded-xl shadow-md border border-emerald-300 active:scale-98 transition-all text-center"
            title="WhatsApp पर मुफ्त चैट या कॉल करें (Worldwide Free)"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0 fill-current" />
            <div className="flex flex-col items-start leading-tight text-left">
              <span className="font-bold text-xs">WhatsApp</span>
              <span className="text-[10px] text-emerald-100 font-medium">Free Call</span>
            </div>
          </a>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP FLOATING ACTION STACK (Fixed on Bottom Right)
          High-end royal glowing buttons for laptop & desktop users
          ========================================================================= */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 pointer-events-auto select-none print:hidden flex-col items-end gap-3">
        {/* Desktop PhonePe Payment QR Button */}
        {onOpenPaymentQR && (
          <div className="relative group">
            <span className="absolute -inset-1 rounded-full bg-purple-600 opacity-50 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
            
            <button
              type="button"
              onClick={onOpenPaymentQR}
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#5f259f] via-[#7b2cbf] to-[#4a154b] text-white py-2 px-4 rounded-full shadow-lg border-2 border-purple-300 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              title="PhonePe / UPI QR कोड से दक्षिणा या परामर्श शुल्क दें"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#5f259f] shadow-xs shrink-0 font-bold text-xs">
                पे
              </span>

              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-yatra text-sm font-bold text-amber-200 tracking-wide">
                  {lang === 'en' ? 'Pay Dakshina' : lang === 'hi' ? 'दक्षिणा / QR' : 'દક્ષિણા / QR'}
                </span>
                <VerifiedBadge size="xs" tooltipText="सत्यापित PhonePe QR" />
              </div>
            </button>
          </div>
        )}

        {/* Desktop WhatsApp Chat Button */}
        <div className="relative group">
          <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
          
          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappRaw || '919909087902'}?text=${encodeURIComponent(getWhatsAppConsultationMessage(lang))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] text-white py-2.5 px-4 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] border-2 border-white/80 transition-all duration-300 hover:scale-105 active:scale-95"
            title={`पंडित जी से व्हाट्सएप पर चैट या मुफ्त कॉल करें (Worldwide): ${ASTROLOGER_INFO.phonePrimary}`}
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#25D366] shadow-xs shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
            </span>

            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-yatra text-sm font-bold text-white tracking-wide">
                {lang === 'en' ? 'WhatsApp Call / Chat' : lang === 'hi' ? 'व्हाट्सएप कॉल / चैट' : 'વોટ્સએપ કોલ / ચેટ'}
              </span>
              <VerifiedBadge size="xs" tooltipText="सत्यापित आधिकारिक WhatsApp" />
            </div>
          </a>
        </div>

        {/* Desktop Call Button (Ultra-Prominent Royal Navy) */}
        <div className="relative group">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />

          <a
            href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
            className="relative flex items-center gap-3 bg-gradient-to-r from-[#0B2545] via-[#133E7C] to-[#081B33] text-white py-2.5 px-5 rounded-full shadow-[0_10px_30px_rgba(11,37,69,0.6)] border-2 border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95"
            title={`पंडित जी को सीधे फोन करें (India & International): ${ASTROLOGER_INFO.phonePrimary}`}
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0B2545] shadow-xs shrink-0 animate-bounce">
              <PhoneCall className="w-4 h-4 fill-current" />
            </span>

            <div className="flex flex-col items-start leading-tight text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-mukta text-xs sm:text-sm font-extrabold text-amber-300 tracking-wide whitespace-nowrap">
                  {lang === 'en' ? 'Direct Phone Call' : lang === 'hi' ? 'सीधा फोन कॉल' : 'સીધો ફોન કોલ'}
                </span>
                <span className="text-[10px] bg-white/20 text-amber-200 px-1.5 py-0.2 rounded-xs font-outfit font-bold border border-amber-300/40">
                  India & Abroad
                </span>
              </div>
              <span className="text-sm sm:text-base phone-crisp font-black text-white tracking-wide whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {ASTROLOGER_INFO.phonePrimary}
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};
