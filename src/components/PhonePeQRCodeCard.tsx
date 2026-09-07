import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ASTROLOGER_INFO } from '../data/astrologyData';
import { VerifiedBadge } from './VerifiedBadge';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { Language } from '../types/astrology';

interface PhonePeQRCodeCardProps {
  lang?: Language;
  compact?: boolean;
}

export const PhonePeQRCodeCard: React.FC<PhonePeQRCodeCardProps> = ({
  lang = 'hi',
  compact = false,
}) => {
  const { paymentInfo } = ASTROLOGER_INFO;

  const whatsappReceiptUrl = `https://wa.me/${ASTROLOGER_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `नमस्ते पंडित जी 🙏 मैंने भवानी ज्योतिष पर परामर्श शुल्क / दक्षिणा का ऑनलाइन भुगतान कर दिया है। कृपया पुष्टि करें।`
  )}`;

  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-400/40 bg-gradient-to-b from-stone-950 via-stone-900 to-black text-white relative">
      {/* Top Banner - PhonePe Branding */}
      <div className="pt-6 pb-4 px-6 text-center bg-black/50 border-b border-purple-500/20 relative">
        {/* PhonePe Logo Icon */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-900/50 border border-purple-300/40">
            पे
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-sans">
            PhonePe
          </span>
        </div>

        {/* Accepted Here Tag */}
        <div className="text-[#a855f7] font-extrabold text-xs tracking-widest uppercase mt-0.5">
          ACCEPTED HERE
        </div>

        <p className="text-[12px] text-stone-300 font-medium mt-1">
          {lang === 'en' 
            ? 'Scan & Pay Using PhonePe / Any UPI App'
            : lang === 'hi'
            ? 'PhonePe अथवा किसी भी UPI ऐप से स्कैन करके भुगतान करें'
            : 'PhonePe અથવા કોઈપણ UPI એપથી સ્કેન કરી ચૂકવણી કરો'}
        </p>
      </div>

      {/* Main QR Code Center Box */}
      <div className="p-6 flex flex-col items-center justify-center">
        {/* White Border Frame for High-contrast Scanning */}
        <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-amber-300/80 flex flex-col items-center justify-center relative group">
          <div className="relative">
            <QRCodeSVG
              value={paymentInfo.upiUrl}
              size={compact ? 200 : 225}
              level="H"
              includeMargin={false}
              className="rounded-lg"
            />
            {/* Center PhonePe Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
                पे
              </div>
            </div>
          </div>
        </div>

        {/* Center Name Badge (Without personal name or raw UPI id) */}
        <div className="mt-4 text-center">
          <div className="text-sm font-bold tracking-wide text-amber-200 flex items-center justify-center gap-1.5">
            <span>भवानी ज्योतिष</span>
            <VerifiedBadge size="xs" tooltipText="सत्यापित PhonePe QR" />
          </div>
          <div className="text-[11px] text-stone-400 font-medium mt-0.5">
            वैदिक परामर्श एवं दक्षिणा QR कोड
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
          {/* Direct Pay via UPI App (on mobile) */}
          <a
            href={paymentInfo.upiUrl}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#7b2cbf] hover:from-[#501f88] hover:to-[#6a24a6] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-purple-950/50 border border-purple-300/30 transition-all text-center"
          >
            <span>सीधा UPI से पे करें</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Send Receipt on WhatsApp */}
          <a
            href={whatsappReceiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 border border-emerald-300/30 transition-all text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>रसीद व्हाट्सएप करें</span>
          </a>
        </div>

        {/* Supported Apps List */}
        <div className="w-full mt-4 pt-3 border-t border-white/10 text-center">
          <span className="text-[10px] text-stone-400 font-bold block mb-1.5">
            PhonePe, Google Pay, Paytm व सभी UPI ऐप्स द्वारा स्वीकार्य
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-stone-300">
            {paymentInfo.appSupported.map((app) => (
              <span key={app} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15">
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Legal Notice (Exact Match to PhonePe template) */}
      <div className="py-2.5 px-4 bg-black/80 border-t border-white/10 text-center text-[9.5px] text-stone-500 font-sans">
        © 2026, All rights reserved, PhonePe Ltd (Formerly known as 'PhonePe Private Ltd')
      </div>
    </div>
  );
};
export default PhonePeQRCodeCard;
