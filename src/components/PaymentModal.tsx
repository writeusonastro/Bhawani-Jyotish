import React, { useEffect } from 'react';
import { PhonePeQRCodeCard } from './PhonePeQRCodeCard';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types/astrology';

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
                ? 'Official Vedic Astrological Consultation Payment'
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

        {/* Actual PhonePe QR Code Component */}
        <PhonePeQRCodeCard lang={lang} />
      </div>
    </div>
  );
};
export default PaymentModal;
