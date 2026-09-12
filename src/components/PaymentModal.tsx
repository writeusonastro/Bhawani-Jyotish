import React, { useEffect, useState } from 'react';
import { PhonePeQRCodeCard } from './PhonePeQRCodeCard';
import { X, Sparkles, ShieldCheck, Globe, CreditCard, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/astrology';
import { ASTROLOGER_INFO } from '../data/astrologyData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  title?: string;
  subtitle?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  lang = 'hi',
  title,
  subtitle,
}) => {
  const [paymentMode, setPaymentMode] = useState<'india' | 'international'>('india');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const internationalWhatsAppUrl = `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `🙏 नमस्ते पंडित जी! मैं विदेश (USA/UK/Canada/NRI) से परामर्श शुल्क / दक्षिणा भेजना चाहता/चाहती हूँ। कृपया PayPal / Wise / Remitly अथवा अंतर्राष्ट्रीय बैंक विवरण साझा करें।`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 text-white border-2 border-amber-400 flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-3 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {lang === 'en' 
                ? 'Official Vedic Astrological Consultation Dakshina'
                : 'भवानी ज्योतिष - अधिकृत वैदिक दक्षिणा एवं परामर्श'}
            </span>
          </div>
          {title && (
            <h3 className="font-yatra text-xl text-amber-200 drop-shadow-sm">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-stone-300 max-w-sm mx-auto mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Payment Region Switcher */}
        <div className="flex items-center justify-center gap-2 p-1 bg-stone-900/90 rounded-2xl border border-amber-400/30 max-w-xs mx-auto mb-3 shadow-md">
          <button
            type="button"
            onClick={() => setPaymentMode('india')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              paymentMode === 'india'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>🇮🇳</span>
            <span>भारत (UPI)</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode('international')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              paymentMode === 'international'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>🌍</span>
            <span>NRI / Abroad</span>
          </button>
        </div>

        {paymentMode === 'india' ? (
          /* Actual PhonePe QR Code Component */
          <PhonePeQRCodeCard lang={lang} />
        ) : (
          /* International / Overseas Payment Guide Card */
          <div className="w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-400/40 bg-gradient-to-b from-stone-950 via-stone-900 to-black text-white p-6 relative">
            <div className="text-center pb-3 border-b border-white/10 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-2xl mx-auto mb-2 text-blue-400">
                🌐
              </div>
              <h4 className="font-yatra text-lg text-blue-200">
                International & NRI Payment Options
              </h4>
              <p className="text-[11px] text-stone-300 mt-1">
                USA, UK, Canada, Australia, UAE & Worldwide
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">PayPal & International Cards</div>
                  <div className="text-[11px] text-stone-400">USD ($), GBP (£), CAD ($), EUR (€), AUD ($)</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Wise (TransferWise) & Remitly</div>
                  <div className="text-[11px] text-stone-400">Lowest fees, instant bank transfer from US/UK/Canada</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Western Union & Direct Wire</div>
                  <div className="text-[11px] text-stone-400">Swift Code & International IBAN support available</div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <a
                href={internationalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 border border-emerald-300 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get International Payment Link</span>
              </a>
              <span className="block text-[10px] text-stone-400 text-center mt-2">
                Pandit Ji’s team will immediately send secure PayPal/Wise invoice on WhatsApp
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentModal;
