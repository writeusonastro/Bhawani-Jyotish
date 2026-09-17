import React from 'react';
import { Language } from '../types/astrology';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  showText?: boolean;
  isDark?: boolean;
  lang?: Language;
  onOpenStudio?: () => void;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  showText = false,
  isDark = false,
  lang = 'hi',
  onOpenStudio,
}) => {
  const sizeConfig = {
    sm: {
      width: 44,
      height: 44,
      fontSize: 42,
      rayStroke: 1.5,
      sparkleSize: 'text-[10px]',
    },
    md: {
      width: 54,
      height: 54,
      fontSize: 50,
      rayStroke: 1.8,
      sparkleSize: 'text-xs',
    },
    responsive: {
      width: 50,
      height: 50,
      fontSize: 48,
      rayStroke: 1.6,
      sparkleSize: 'text-xs',
    },
    lg: {
      width: 96,
      height: 96,
      fontSize: 88,
      rayStroke: 2.4,
      sparkleSize: 'text-sm',
    },
  }[size];

  const { width, height, fontSize, rayStroke } = sizeConfig;

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* 
        PURE HIGH-PERFORMANCE 3D "OM" CUTOUT:
        - Completely CSS hardware accelerated, zero JS main-thread loops or repaints.
      */}
      <div
        onClick={onOpenStudio}
        className="relative flex items-center justify-center cursor-pointer group hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        {/* Ambient Golden Soft Back-Glow (Pure CSS, 0 overhead) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/20 via-yellow-400/20 to-orange-500/20 blur-md pointer-events-none" />

        {/* Core 3D "OM" SVG CUTOUT */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 100"
          className="overflow-visible filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_8px_16px_rgba(245,158,11,0.5)] transition-all duration-200"
        >
          <defs>
            {/* 3D Dark Metallic Antique Gold Gradient for ॐ */}
            <linearGradient id="pureOmDarkGold3D" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="14%" stopColor="#FFF4B8" />
              <stop offset="38%" stopColor="#F59E0B" />
              <stop offset="68%" stopColor="#D97706" />
              <stop offset="88%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            {/* Ambient Shadow & Gold Rim Lighting Filter */}
            <filter id="pureOmShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#1F0800" floodOpacity="0.7" />
              <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* 3D Under-extrusion / Cast Shadow Layer */}
          <text
            x="50"
            y="58"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#1E0700"
            fontSize={fontSize}
            fontWeight="900"
            fontFamily="'Mukta', 'Yatra One', serif"
            opacity="0.85"
            className="select-none"
          >
            ॐ
          </text>

          {/* Core 3D Dark Metallic Gold Om Cutout */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            dominantBaseline="central"
            fill="url(#pureOmDarkGold3D)"
            fontSize={fontSize}
            fontWeight="900"
            fontFamily="'Mukta', 'Yatra One', serif"
            filter="url(#pureOmShadow)"
            className="select-none"
          >
            ॐ
          </text>

          {/* Specular Crisp Rim Line */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            dominantBaseline="central"
            fill="none"
            stroke="#FFF6D1"
            strokeWidth={rayStroke}
            strokeOpacity="0.4"
            fontSize={fontSize}
            fontWeight="900"
            fontFamily="'Mukta', 'Yatra One', serif"
            className="select-none pointer-events-none"
          >
            ॐ
          </text>
        </svg>

        {/* Sparkle Star */}
        <span
          className={`absolute -top-1 -right-1 text-amber-300 ${sizeConfig.sparkleSize} pointer-events-none drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]`}
        >
          ✦
        </span>
      </div>

      {/* Optional Brand Typography */}
      {showText && (
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-yatra text-2xl sm:text-3xl text-[#852E10] dark:text-amber-400 tracking-wide flex items-center gap-1.5">
              भवानी ज्योतिष
              <span className="inline-block text-amber-500 text-sm">
                🔱
              </span>
            </h2>

            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold border transition-colors ${
                isDark
                  ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                  : 'bg-[#FFF5F0] border-[#FF671F]/30 text-[#852E10]'
              }`}
            >
              {lang === 'en' ? 'Mehsana (Gujarat)' : 'मेहसाणा (गुजरात)'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-900 dark:text-stone-300 font-semibold">
            {lang === 'en'
              ? 'Precise Astrological Solutions & Vedic Guidance'
              : lang === 'hi'
              ? 'सटीक ज्योतिषीय समाधान एवं वैदिक मार्गदर्शन'
              : 'સચોટ જ્યોતિષીય સમાધાન અને વૈદિક માર્ગદર્શન'}
          </p>
        </div>
      )}
    </div>
  );
};
