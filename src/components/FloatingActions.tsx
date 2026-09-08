import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, QrCode, Phone, ShieldCheck, Clock } from 'lucide-react';
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
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  // Check if current time is between 8:00 AM and 8:30 PM IST
  useEffect(() => {
    const checkAvailability = () => {
      try {
        const now = new Date();
        // Indian Standard Time offset is UTC + 5:30
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istDate = new Date(utc + (3600000 * 5.5));
        const hour = istDate.getHours();
        setIsAvailable(hour >= 8 && hour < 21);
      } catch (e) {
        setIsAvailable(true);
      }
    };
    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  const callHeadline = lang === 'en' 
    ? 'Direct Phone Consultation' 
    : lang === 'hi' 
    ? 'पंडित जी से सीधे फोन पर बात करें' 
    : 'પંડિતજી સાથે સીધી વાત કરો';

  const availabilityText = isAvailable
    ? (lang === 'en' ? 'Available on Call Now' : lang === 'hi' ? 'अभी कॉल पर उपलब्ध हैं' : 'હમણાં કોલ પર ઉપલબ્ધ છે')
    : (lang === 'en' ? 'Daily 8:00 AM - 8:30 PM' : lang === 'hi' ? 'प्रातः 8:00 से रात्रि 8:30' : 'સવારે 8:00 થી રાત્રે 8:30');

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
        {/* Top Mini Urgency Indicator Strip */}
        <div className="flex items-center justify-between gap-2 px-1 mb-1.5 text-[11px] text-amber-200">
          <div className="flex items-center gap-1.5 truncate">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-white truncate">
              {availabilityText}
            </span>
            <span className="text-amber-400/80">•</span>
            <span className="text-stone-300 font-medium truncate">
              {lang === 'en' ? 'Zero Waiting' : 'बिना प्रतीक्षा सीधा संवाद'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-amber-300 shrink-0 font-semibold bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-600/40">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>35+ वर्ष अनुभव</span>
          </div>
        </div>

            {/* Action Buttons Row: 65% Direct Call | 35% WhatsApp */}
        <div className="grid grid-cols-12 gap-2">
          {/* Main Direct Call Button (Dominant CTA with International Dialing) */}
          <a
            href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
            className="col-span-8 relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF671F] via-[#E05312] to-[#B83E07] hover:from-[#E05312] hover:to-[#993D12] text-white py-2 px-2.5 rounded-xl shadow-lg shadow-orange-950/50 border border-amber-300 active:scale-98 transition-all text-center"
            title={`पंडित जी को सीधे कॉल करें (India & Worldwide): ${ASTROLOGER_INFO.phonePrimary}`}
          >
            {/* Shimmer / Pulse animation on Call button */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#FF671F] shadow-xs shrink-0 animate-bounce">
              <PhoneCall className="w-4 h-4 fill-current" />
            </div>

            <div className="flex flex-col items-start leading-none text-left min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-yatra text-xs font-bold text-amber-100 tracking-wide truncate">
                  {lang === 'en' ? 'Direct Call' : lang === 'hi' ? 'सीधे फोन करें' : 'સીધો કોલ કરો'}
                </span>
                <span className="text-[9px] bg-white/20 text-amber-200 px-1 rounded-sm font-sans font-bold">
                  Global
                </span>
              </div>
              <span className="text-xs font-black font-mono text-white tracking-wider truncate">
                {ASTROLOGER_INFO.phonePrimary}
              </span>
            </div>
          </a>

          {/* WhatsApp Direct Chat Button (Worldwide Free Calling & Chat) */}
          <a
            href={`https://wa.me/${ASTROLOGER_INFO.whatsappRaw || '919909087902'}?text=${encodeURIComponent(getWhatsAppConsultationMessage(lang))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-4 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white py-2 px-2 rounded-xl shadow-md border border-emerald-300 active:scale-98 transition-all text-center"
            title="WhatsApp पर मुफ्त चैट या कॉल करें (Worldwide Free)"
          >
            <MessageCircle className="w-4 h-4 text-white shrink-0 fill-current" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-bold text-xs">WhatsApp</span>
              <span className="text-[9px] text-emerald-100 font-medium">Free Call</span>
            </div>
          </a>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP FLOATING ACTION STACK (Fixed on Bottom Right)
          High-end royal glowing buttons for laptop & desktop users
          ========================================================================= */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 pointer-events-auto select-none print:hidden flex-col items-end gap-3">
        {/* Availability Badge */}
        <div className="bg-[#1F1714]/90 backdrop-blur-md text-amber-200 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/50 shadow-md flex items-center gap-1.5 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{availabilityText}</span>
        </div>

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

        {/* Desktop Call Button (Ultra-Prominent) */}
        <div className="relative group">
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-[#FF671F] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />

          <a
            href={`tel:${ASTROLOGER_INFO.phoneRaw || '+919909087902'}`}
            className="relative flex items-center gap-3 bg-gradient-to-r from-[#FF671F] via-[#E05312] to-[#B83E07] text-white py-2.5 px-5 rounded-full shadow-[0_10px_30px_rgba(255,103,31,0.5)] border-2 border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95"
            title={`पंडित जी को सीधे फोन करें (India & International): ${ASTROLOGER_INFO.phonePrimary}`}
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#FF671F] shadow-xs shrink-0 animate-bounce">
              <PhoneCall className="w-4 h-4 fill-current" />
            </span>

            <div className="flex flex-col items-start leading-tight text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-yatra text-sm font-bold text-amber-100 tracking-wide whitespace-nowrap">
                  {lang === 'en' ? 'Direct Phone Call' : lang === 'hi' ? 'सीधा फोन कॉल' : 'સીધો ફોન કોલ'}
                </span>
                <span className="text-[10px] bg-white/20 text-amber-200 px-1.5 py-0.5 rounded-sm font-sans font-bold">
                  India & Abroad
                </span>
              </div>
              <span className="text-xs font-black font-mono text-white tracking-wider whitespace-nowrap">
                {ASTROLOGER_INFO.phonePrimary}
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};
