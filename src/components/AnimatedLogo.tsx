import React from 'react';
import { motion } from 'motion/react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  isDark?: boolean;
  lang?: 'hi' | 'gu';
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  showText = false,
  isDark = false,
  lang = 'hi',
}) => {
  const sizeClasses = {
    sm: {
      box: 'w-10 h-10',
      text: 'text-xl',
      ring: 'w-12 h-12',
      badge: 'text-[10px]',
    },
    md: {
      box: 'w-12 h-12 sm:w-14 sm:h-14',
      text: 'text-2xl sm:text-3xl',
      ring: 'w-14 h-14 sm:w-16 sm:h-16',
      badge: 'text-xs',
    },
    lg: {
      box: 'w-20 h-20 sm:w-24 sm:h-24',
      text: 'text-4xl sm:text-5xl',
      ring: 'w-24 h-24 sm:w-28 sm:h-28',
      badge: 'text-sm',
    },
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Animated Emblem Container */}
      <div className="relative flex items-center justify-center">
        {/* 1. Pulsing Divine Cosmic Glow Aura */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-[#FF671F] to-[#CC5218] blur-md pointer-events-none"
        />

        {/* 2. Rotating Astrological Chakra / Surya Mandala Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute ${sizeClasses.ring} pointer-events-none flex items-center justify-center`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
            {/* 12-spoke Solar Rays representing 12 Rashis / Bhavas */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="4"
                x2="50"
                y2="10"
                stroke="#FFB300"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
            {/* Dotted Sacred Orbit */}
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="#FFA000"
              strokeWidth="1.2"
              strokeDasharray="2.5 3.5"
            />
          </svg>
        </motion.div>

        {/* 3. Orbiting Sparkle Star */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute ${sizeClasses.ring} pointer-events-none`}
        >
          <motion.span
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-1 left-1/2 -translate-x-1/2 text-amber-300 text-xs sm:text-sm drop-shadow-[0_0_6px_rgba(255,215,0,0.9)]"
          >
            ✦
          </motion.span>
        </motion.div>

        {/* 4. Core Saffron & Golden Sacred Shield with Animated Om */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`relative ${sizeClasses.box} rounded-2xl bg-gradient-to-br from-[#FF8C38] via-[#FF671F] to-[#CC5218] flex items-center justify-center text-white shadow-lg shadow-[#FF671F]/40 border-2 border-amber-300 overflow-hidden cursor-pointer`}
        >
          {/* Animated Light Sweep Shimmer Effect across the logo */}
          <motion.div
            animate={{
              x: ['-150%', '200%'],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-25 pointer-events-none"
          />

          {/* Central Sacred Om Symbol with divine heartbeat breathing animation */}
          <motion.span
            animate={{
              scale: [1, 1.07, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`${sizeClasses.text} font-bold font-yatra drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-amber-100`}
          >
            ॐ
          </motion.span>

          {/* Small corner decorative gold corner accent */}
          <span className="absolute top-0.5 right-0.5 text-[8px] text-amber-200/90 leading-none">
            🚩
          </span>
        </motion.div>
      </div>

      {/* Optional Animated Text Display */}
      {showText && (
        <div>
          <div className="flex items-center gap-2">
            <motion.h2
              className="font-yatra text-2xl sm:text-3xl text-[#CC5218] dark:text-amber-400 tracking-wide flex items-center gap-1.5"
            >
              भवानी ज्योतिष
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block text-amber-500 text-sm"
              >
                🔱
              </motion.span>
            </motion.h2>

            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold border transition-colors ${
                isDark
                  ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                  : 'bg-[#FFF5F0] border-[#FF671F]/30 text-[#CC5218]'
              }`}
            >
              मेहसाणा (गुजरात)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-900 dark:text-stone-300 font-semibold">
            {lang === 'hi'
              ? 'सटीक ज्योतिषीय समाधान एवं वैदिक मार्गदर्शन'
              : 'સચોટ જ્યોતિષીય સમાધાન અને વૈદિક માર્ગદર્શન'}
          </p>
        </div>
      )}
    </div>
  );
};
