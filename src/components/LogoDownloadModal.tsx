import React, { useState } from 'react';
import { X, Download, Sparkles, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types/astrology';

interface LogoDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export const LogoDownloadModal: React.FC<LogoDownloadModalProps> = ({
  isOpen,
  onClose,
  lang = 'hi',
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Generates high-res canvas at 300 DPI equivalent scale and triggers PNG download
  const handleDownloadPNG = (type: 'icon_transparent' | 'full_transparent' | 'squircle_icon') => {
    setDownloadingId(type);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (type === 'icon_transparent') {
        // 800x800 Lossless Transparent PNG (Icon Only)
        canvas.width = 800;
        canvas.height = 800;
        ctx.clearRect(0, 0, 800, 800);

        // Soft Radial Golden Aura on transparent background
        const aura = ctx.createRadialGradient(400, 420, 50, 400, 420, 340);
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
        aura.addColorStop(0.5, 'rgba(217, 119, 6, 0.08)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(400, 420, 340, 0, Math.PI * 2);
        ctx.fill();

        // 3D Drop Shadow for tactile depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 32;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 24;

        // Draw Om with dark 3D bevel bottom layer
        ctx.font = '900 520px "Mukta", "Yatra One", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#2A0B00';
        ctx.fillText('ॐ', 400, 440);

        // Reset shadow for crisp gold face
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // 3D Dark Metallic Gold Gradient Face
        const goldGrad = ctx.createLinearGradient(400, 160, 400, 680);
        goldGrad.addColorStop(0, '#FFFFFF');
        goldGrad.addColorStop(0.12, '#FFF2B2');
        goldGrad.addColorStop(0.38, '#F59E0B');
        goldGrad.addColorStop(0.70, '#D97706');
        goldGrad.addColorStop(0.90, '#92400E');
        goldGrad.addColorStop(1, '#451A03');

        ctx.fillStyle = goldGrad;
        ctx.fillText('ॐ', 400, 424);

        // Specular stroke highlight
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 248, 220, 0.7)';
        ctx.strokeText('ॐ', 400, 424);

        downloadCanvas(canvas, 'bhavani-jyotish-om-icon-transparent-800x800.png');
      } else if (type === 'full_transparent') {
        // 1200x400 Full Brand Logo (Transparent PNG)
        canvas.width = 1200;
        canvas.height = 400;
        ctx.clearRect(0, 0, 1200, 400);

        // Draw Icon on Left
        const aura = ctx.createRadialGradient(200, 200, 30, 200, 200, 170);
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(200, 200, 170, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 12;
        ctx.font = '900 240px "Mukta", "Yatra One", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 3D Shadow
        ctx.fillStyle = '#2A0B00';
        ctx.fillText('ॐ', 200, 212);

        // 3D Gold
        ctx.shadowColor = 'transparent';
        const goldGrad = ctx.createLinearGradient(200, 80, 200, 320);
        goldGrad.addColorStop(0, '#FFFFFF');
        goldGrad.addColorStop(0.18, '#FFF2B2');
        goldGrad.addColorStop(0.45, '#F59E0B');
        goldGrad.addColorStop(0.80, '#D97706');
        goldGrad.addColorStop(1, '#662200');
        ctx.fillStyle = goldGrad;
        ctx.fillText('ॐ', 200, 204);

        // Brand Typography on Right
        ctx.textAlign = 'left';
        ctx.font = 'bold 84px "Yatra One", "Mukta", serif';
        
        // Brand Title Gradient
        const textGrad = ctx.createLinearGradient(380, 130, 1050, 130);
        textGrad.addColorStop(0, '#7A2205');
        textGrad.addColorStop(0.5, '#A8320C');
        textGrad.addColorStop(1, '#D97706');
        ctx.fillStyle = textGrad;
        ctx.fillText('भवानी ज्योतिष संस्थान', 380, 150);

        // Subtitle / Tagline
        ctx.font = '600 32px "Mukta", sans-serif';
        ctx.fillStyle = '#44403C';
        ctx.fillText('सटीक वैदिक समाधान एवं प्रामाणिक ज्योतिषीय मार्गदर्शन', 380, 218);

        // Location & Authority Pill
        ctx.font = 'bold 24px "Mukta", sans-serif';
        ctx.fillStyle = '#B45309';
        ctx.fillText('📍 मेहसाणा, गुजरात • ३५+ वर्ष प्रामाणिक अनुभव • ISO सत्यापित', 380, 268);

        downloadCanvas(canvas, 'bhavani-jyotish-full-brand-logo-transparent-1200x400.png');
      } else if (type === 'squircle_icon') {
        // 800x800 Squircle Dark Obsidian App Icon (Social Media & Favicon Ready)
        canvas.width = 800;
        canvas.height = 800;

        // Draw Dark Obsidian Squircle
        drawRoundedRect(ctx, 40, 40, 720, 720, 160);
        const bgGrad = ctx.createLinearGradient(400, 40, 400, 760);
        bgGrad.addColorStop(0, '#161327');
        bgGrad.addColorStop(0.5, '#0E0B1A');
        bgGrad.addColorStop(1, '#080611');
        ctx.fillStyle = bgGrad;
        ctx.fill();

        // Glowing perimeter border
        ctx.lineWidth = 14;
        const strokeGrad = ctx.createLinearGradient(40, 40, 760, 760);
        strokeGrad.addColorStop(0, '#818CF8');
        strokeGrad.addColorStop(0.35, '#C084FC');
        strokeGrad.addColorStop(0.70, '#F59E0B');
        strokeGrad.addColorStop(1, '#FDE047');
        ctx.strokeStyle = strokeGrad;
        ctx.stroke();

        // Central 3D Om
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 16;
        ctx.font = '900 480px "Mukta", "Yatra One", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#2A0B00';
        ctx.fillText('ॐ', 400, 422);

        ctx.shadowColor = 'transparent';
        const goldGrad = ctx.createLinearGradient(400, 160, 400, 660);
        goldGrad.addColorStop(0, '#FFFFFF');
        goldGrad.addColorStop(0.15, '#FFF2B2');
        goldGrad.addColorStop(0.40, '#F59E0B');
        goldGrad.addColorStop(0.75, '#D97706');
        goldGrad.addColorStop(0.92, '#92400E');
        goldGrad.addColorStop(1, '#451A03');
        ctx.fillStyle = goldGrad;
        ctx.fillText('ॐ', 400, 408);

        downloadCanvas(canvas, 'bhavani-jyotish-squircle-app-icon-800x800.png');
      }
    } catch (e) {
      console.error('Error generating high-res PNG:', e);
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C1828] to-[#0D0B14] rounded-3xl p-5 sm:p-7 border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-amber-950 font-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-yatra text-xl sm:text-2xl text-amber-300">
                {lang === 'en' ? 'Logo PNG Studio (Lossless 300 DPI)' : 'लोगो PNG स्टूडियो (1-क्लिक डाउनलोड)'}
              </h3>
              <p className="text-xs text-stone-300">
                {lang === 'en'
                  ? 'Download crystal-clear transparent PNGs & app icons'
                  : 'अल्फा ट्रांसपेरेंट PNG, प्योर कटआउट एवं ऐप आइकन डाउनलोड करें'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 relative z-10">
          
          {/* 1. Icon Only (Transparent PNG) */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group">
            <div>
              {/* Preview Box with Checkerboard transparency pattern */}
              <div 
                className="w-full h-32 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-white/10 shadow-inner"
                style={{
                  backgroundImage: 'radial-gradient(#ffffff15 1px, transparent 1px), radial-gradient(#ffffff15 1px, #14121f 1px)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 8px 8px',
                }}
              >
                <div className="text-5xl font-black text-amber-400 drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">
                  ॐ
                </div>
                <span className="absolute bottom-1 right-2 text-[9px] uppercase font-bold text-amber-200/60 bg-black/60 px-1.5 py-0.5 rounded">
                  Transparent
                </span>
              </div>

              <h4 className="font-bold text-sm text-amber-200 mb-1">
                📥 Icon Only (Transparent PNG)
              </h4>
              <p className="text-xs text-stone-400 leading-snug">
                {lang === 'en'
                  ? 'Clean "ॐ" sign with pure alpha transparent background (800×800 px).'
                  : 'बिना बैकग्राउंड के साफ "ॐ" कटआउट (800×800 px) किसी भी पोस्टर या विजिटिंग कार्ड के लिए।'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadPNG('icon_transparent')}
              disabled={downloadingId === 'icon_transparent'}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-102 active:scale-98"
            >
              {downloadingId === 'icon_transparent' ? (
                <CheckCircle className="w-4 h-4 animate-bounce" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{downloadingId === 'icon_transparent' ? 'तैयार हो रहा है...' : 'डाउनलोड PNG (800×800)'}</span>
            </button>
          </div>

          {/* 2. Full Brand Logo (Transparent PNG) */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group">
            <div>
              {/* Preview Box */}
              <div 
                className="w-full h-32 rounded-xl mb-3 flex items-center justify-center p-2 relative overflow-hidden border border-white/10 shadow-inner"
                style={{
                  backgroundImage: 'radial-gradient(#ffffff15 1px, transparent 1px), radial-gradient(#ffffff15 1px, #14121f 1px)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 8px 8px',
                }}
              >
                <div className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                  <span className="text-3xl font-black text-amber-400">ॐ</span>
                  <div className="text-left">
                    <span className="font-yatra text-xs font-bold text-amber-200 block">भवानी ज्योतिष</span>
                    <span className="text-[8px] text-stone-300 block">वैदिक संस्थान</span>
                  </div>
                </div>
                <span className="absolute bottom-1 right-2 text-[9px] uppercase font-bold text-amber-200/60 bg-black/60 px-1.5 py-0.5 rounded">
                  1200×400
                </span>
              </div>

              <h4 className="font-bold text-sm text-amber-200 mb-1">
                📥 Full Brand Logo (Transparent PNG)
              </h4>
              <p className="text-xs text-stone-400 leading-snug">
                {lang === 'en'
                  ? 'Full Bhavani Jyotish typography & tagline on transparent PNG (1200×400 px).'
                  : 'भवानी ज्योतिष नाम, टैगलाइन और ॐ के साथ हेडर/बैनर ट्रांसपेरेंट PNG।'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadPNG('full_transparent')}
              disabled={downloadingId === 'full_transparent'}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-102 active:scale-98"
            >
              {downloadingId === 'full_transparent' ? (
                <CheckCircle className="w-4 h-4 animate-bounce" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{downloadingId === 'full_transparent' ? 'तैयार हो रहा है...' : 'डाउनलोड बैनर (1200×400)'}</span>
            </button>
          </div>

          {/* 3. Squircle App Icon */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group">
            <div>
              {/* Preview Box */}
              <div className="w-full h-32 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden bg-black/40 border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#161327] to-[#080611] border-2 border-amber-400/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]">ॐ</span>
                </div>
                <span className="absolute bottom-1 right-2 text-[9px] uppercase font-bold text-amber-200/60 bg-black/60 px-1.5 py-0.5 rounded">
                  800×800
                </span>
              </div>

              <h4 className="font-bold text-sm text-amber-200 mb-1">
                📥 Squircle App Icon (PNG)
              </h4>
              <p className="text-xs text-stone-400 leading-snug">
                {lang === 'en'
                  ? 'Dark aesthetic app icon for WhatsApp DP, Instagram & app launchers (800×800 px).'
                  : 'सोशल मीडिया DP, व्हाट्सएप प्रोफाइल व यूट्यूब के लिए डार्क लक्ज़री ऑब्सिडियन स्क्वायर आइकन।'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadPNG('squircle_icon')}
              disabled={downloadingId === 'squircle_icon'}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-102 active:scale-98"
            >
              {downloadingId === 'squircle_icon' ? (
                <CheckCircle className="w-4 h-4 animate-bounce" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{downloadingId === 'squircle_icon' ? 'तैयार हो रहा है...' : 'डाउनलोड ऐप आइकन (800×800)'}</span>
            </button>
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>300 DPI Lossless Alpha PNG • Commercial Print Ready</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-300 hover:text-white underline cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
