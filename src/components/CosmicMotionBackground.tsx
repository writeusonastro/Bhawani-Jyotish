import React from 'react';

// 12 Zodiac Sanskrit Symbols and Names
const ZODIAC_SIGNS = [
  { sign: '♈', name: 'मेष', angle: 0 },
  { sign: '♉', name: 'वृषभ', angle: 30 },
  { sign: '♊', name: 'मिथुन', angle: 60 },
  { sign: '♋', name: 'कर्क', angle: 90 },
  { sign: '♌', name: 'सिंह', angle: 120 },
  { sign: '♍', name: 'कन्या', angle: 150 },
  { sign: '♎', name: 'तुला', angle: 180 },
  { sign: '♏', name: 'वृश्चिक', angle: 210 },
  { sign: '♐', name: 'धनु', angle: 240 },
  { sign: '♑', name: 'मकर', angle: 270 },
  { sign: '♒', name: 'कुंभ', angle: 300 },
  { sign: '♓', name: 'मीन', angle: 330 },
];

const NAKSHATRA_COUNT = 27;
const NAVAGRAHAS = ['☉ सूर्य', '☽ चंद्र', '♂ मंगल', '☿ बुध', '♃ गुरु', '♀ शुक्र', '♄ शनि', '☊ राहु', '☋ केतु'];

/**
 * High-performance, GPU-accelerated Sacred Vedic Kalachakra (कालचक्र) Background.
 * Layered celestial motion:
 * - Outer Zodiac (12 Rashis & 27 Nakshatras) rotates clockwise
 * - Inner Lotus & Navagraha ring rotates counter-clockwise
 * - Inner Sanctum (8-pointed Star & Divine ॐ) stays upright with gentle breathing pulse
 */
export const CosmicMotionBackground: React.FC = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center select-none">
      {/* Background soft golden ambient gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(254, 243, 199, 0.5) 0%, rgba(255, 251, 235, 0.3) 50%, rgba(255, 253, 248, 0.95) 100%)',
        }}
      />

      {/* Dynamic Divine Vedic Kalachakra Stage - Centered in Hero behind Title/Emblem */}
      <div className="absolute top-[28%] sm:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] sm:w-[880px] sm:h-[880px] max-w-none flex items-center justify-center opacity-45 sm:opacity-55 pointer-events-none">
        
        {/* Soft Golden Backlight Halo - Ultra high-performance radial gradient without GPU blur overhead */}
        <div 
          className="absolute inset-8 rounded-full pointer-events-none kalachakra-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.10) 45%, transparent 70%)',
            transform: 'translateZ(0)',
          }}
        />

        {/* LAYER 1: OUTER WHEEL (12 Rashis & 27 Nakshatras) - Smooth Clockwise Rotation */}
        <div className="absolute inset-0 kalachakra-spin-cw">
          <svg className="w-full h-full" viewBox="0 0 950 950" fill="none">
            <defs>
              <linearGradient id="goldOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Outermost rim circle & rays */}
            <circle cx="475" cy="475" r="460" stroke="url(#goldOuterGrad)" strokeWidth="1.8" />
            <circle cx="475" cy="475" r="448" stroke="#D97706" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.45" />
            <circle cx="475" cy="475" r="390" stroke="url(#goldOuterGrad)" strokeWidth="1.5" />

            {/* 12 Rashi Sectors */}
            {ZODIAC_SIGNS.map((z, idx) => {
              const rad = (z.angle * Math.PI) / 180;
              const x1 = 475 + 390 * Math.cos(rad);
              const y1 = 475 + 390 * Math.sin(rad);
              const x2 = 475 + 460 * Math.cos(rad);
              const y2 = 475 + 460 * Math.sin(rad);

              const midAngle = ((z.angle + 15) * Math.PI) / 180;
              const textX = 475 + 424 * Math.cos(midAngle);
              const textY = 475 + 424 * Math.sin(midAngle);

              return (
                <g key={idx}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.5" />
                  <circle cx={x2} cy={y2} r="3" fill="#D97706" fillOpacity="0.6" />
                  <g transform={`translate(${textX}, ${textY}) rotate(${z.angle + 105})`}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#78350F"
                      fillOpacity="0.85"
                      fontSize="13.5"
                      fontWeight="bold"
                      fontFamily="'Mukta', sans-serif"
                    >
                      {z.sign} {z.name}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* 27 Nakshatras Ring */}
            <circle cx="475" cy="475" r="340" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.35" />
            <circle cx="475" cy="475" r="300" stroke="#F59E0B" strokeWidth="1.4" strokeOpacity="0.45" />

            {[...Array(NAKSHATRA_COUNT)].map((_, i) => {
              const angle = (i * 360) / NAKSHATRA_COUNT;
              const rad = (angle * Math.PI) / 180;
              const x1 = 475 + 300 * Math.cos(rad);
              const y1 = 475 + 300 * Math.sin(rad);
              const x2 = 475 + 340 * Math.cos(rad);
              const y2 = 475 + 340 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#D97706"
                  strokeWidth={i % 3 === 0 ? "1.5" : "0.9"}
                  strokeOpacity={i % 3 === 0 ? "0.6" : "0.35"}
                />
              );
            })}
          </svg>
        </div>

        {/* LAYER 2: MIDDLE WHEEL (12 Lotus Petals & Navagrahas) - Counter-Clockwise Rotation */}
        <div className="absolute inset-0 kalachakra-spin-ccw">
          <svg className="w-full h-full" viewBox="0 0 950 950" fill="none">
            {/* Sacred 12 Lotus Petals */}
            {[...Array(12)].map((_, i) => {
              const angle = i * 30;
              return (
                <path
                  key={i}
                  d="M 475 230 C 445 320, 445 400, 475 475 C 505 400, 505 320, 475 230 Z"
                  fill="rgba(245, 158, 11, 0.04)"
                  stroke="#D97706"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                  transform={`rotate(${angle} 475 475)`}
                />
              );
            })}

            {/* Navagraha Orbit Rings */}
            <circle cx="475" cy="475" r="230" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.35" />
            <circle cx="475" cy="475" r="190" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5 5" strokeOpacity="0.4" />

            {/* 9 Navagrahas */}
            {NAVAGRAHAS.map((g, i) => {
              const angle = (i * 360) / 9;
              const rad = (angle * Math.PI) / 180;
              const x = 475 + 210 * Math.cos(rad);
              const y = 475 + 210 * Math.sin(rad);

              return (
                <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 90})`}>
                  <circle r="13" fill="#FFFDF8" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.7" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#78350F"
                    fillOpacity="0.85"
                    fontSize="10"
                    fontWeight="800"
                    fontFamily="'Mukta', sans-serif"
                  >
                    {g.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* LAYER 3: INNER SANCTUM (8-Pointed Star & Divine Center ॐ) - Gentle Divine Breathing Pulse */}
        <div className="absolute inset-0 kalachakra-pulse">
          <svg className="w-full h-full" viewBox="0 0 950 950" fill="none">
            {/* Sacred 8-Pointed Star */}
            <circle cx="475" cy="475" r="140" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.35" />
            <polygon
              points="475,355 505,445 595,475 505,505 475,595 445,505 355,475 445,445"
              fill="rgba(251, 191, 36, 0.07)"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
            <polygon
              points="475,365 500,450 585,475 500,500 475,585 450,500 365,475 450,450"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1"
              strokeDasharray="4 3"
              strokeOpacity="0.4"
              transform="rotate(45 475 475)"
            />

            {/* Central Sacred ॐ Sanctum */}
            <circle cx="475" cy="475" r="42" fill="#FFFDF8" stroke="#D97706" strokeWidth="1.6" strokeOpacity="0.6" />
            <text
              x="475"
              y="483"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#92400E"
              fillOpacity="0.85"
              fontSize="26"
              fontWeight="bold"
              fontFamily="'Mukta', serif"
            >
              ॐ
            </text>
          </svg>
        </div>
      </div>

      {/* Subtle Celestial Stars */}
      <div className="absolute top-20 left-[18%] text-amber-500/50 text-sm select-none animate-pulse">
        ✦
      </div>
      <div className="absolute top-48 right-[18%] text-amber-600/50 text-base select-none animate-pulse" style={{ animationDelay: '1.5s' }}>
        ✧
      </div>
    </div>
  );
});
