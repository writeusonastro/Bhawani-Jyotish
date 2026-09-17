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
 * High-performance, GPU-safe Sacred Vedic Kalachakra Background.
 * Consolidated into a single static SVG with zero continuous spinning animations,
 * delivering 60 FPS silky smooth scrolling on all mobile and desktop devices.
 */
export const CosmicMotionBackground: React.FC = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center select-none">
      {/* Background soft golden ambient gradient - 100% lightweight */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(254, 243, 199, 0.45) 0%, rgba(255, 251, 235, 0.25) 50%, rgba(255, 253, 248, 0.95) 100%)',
        }}
      />

      {/* Static Consolidated Divine Vedic Kalachakra SVG - Rendered once, 0% CPU/GPU overhead */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] sm:w-[860px] sm:h-[860px] max-w-none flex items-center justify-center opacity-30 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 950 950" fill="none">
          <defs>
            <linearGradient id="goldStaticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Outermost rim circle */}
          <circle cx="475" cy="475" r="460" stroke="url(#goldStaticGrad)" strokeWidth="1.6" />
          <circle cx="475" cy="475" r="448" stroke="#D97706" strokeWidth="0.8" strokeDasharray="6 4" strokeOpacity="0.3" />
          <circle cx="475" cy="475" r="390" stroke="url(#goldStaticGrad)" strokeWidth="1.4" />

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
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D97706" strokeWidth="0.9" strokeOpacity="0.35" />
                <circle cx={x2} cy={y2} r="2.5" fill="#D97706" fillOpacity="0.4" />
                <g transform={`translate(${textX}, ${textY}) rotate(${z.angle + 105})`}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#852E10"
                    fillOpacity="0.5"
                    fontSize="13"
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
          <circle cx="475" cy="475" r="340" stroke="#D97706" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="475" cy="475" r="300" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.3" />

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
                strokeWidth={i % 3 === 0 ? "1.2" : "0.7"}
                strokeOpacity={i % 3 === 0 ? "0.4" : "0.2"}
              />
            );
          })}

          {/* Sacred 12 Lotus Petals */}
          {[...Array(12)].map((_, i) => {
            const angle = i * 30;
            return (
              <path
                key={i}
                d="M 475 230 C 445 320, 445 400, 475 475 C 505 400, 505 320, 475 230 Z"
                fill="rgba(245, 158, 11, 0.025)"
                stroke="#D97706"
                strokeWidth="0.8"
                strokeOpacity="0.25"
                transform={`rotate(${angle} 475 475)`}
              />
            );
          })}

          {/* Navagraha Ring */}
          <circle cx="475" cy="475" r="230" stroke="#D97706" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="475" cy="475" r="190" stroke="#F59E0B" strokeWidth="0.9" strokeDasharray="5 5" strokeOpacity="0.3" />

          {NAVAGRAHAS.map((g, i) => {
            const angle = (i * 360) / 9;
            const rad = (angle * Math.PI) / 180;
            const x = 475 + 210 * Math.cos(rad);
            const y = 475 + 210 * Math.sin(rad);

            return (
              <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 90})`}>
                <circle r="12" fill="#FFFDF8" stroke="#D97706" strokeWidth="1" strokeOpacity="0.45" />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#92400E"
                  fillOpacity="0.6"
                  fontSize="9.5"
                  fontWeight="800"
                  fontFamily="'Mukta', sans-serif"
                >
                  {g.split(' ')[0]}
                </text>
              </g>
            );
          })}

          {/* Sacred 8-Pointed Star & Center ॐ */}
          <circle cx="475" cy="475" r="140" stroke="#D97706" strokeWidth="1" strokeOpacity="0.25" />
          <polygon
            points="475,355 505,445 595,475 505,505 475,595 445,505 355,475 445,445"
            fill="rgba(251, 191, 36, 0.04)"
            stroke="#D97706"
            strokeWidth="0.9"
            strokeOpacity="0.3"
          />
          <polygon
            points="475,365 500,450 585,475 500,500 475,585 450,500 365,475 450,450"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            strokeOpacity="0.3"
            transform="rotate(45 475 475)"
          />

          <circle cx="475" cy="475" r="40" fill="#FFFDF8" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.4" />
          <text
            x="475"
            y="482"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#B45309"
            fillOpacity="0.65"
            fontSize="24"
            fontWeight="bold"
            fontFamily="'Mukta', serif"
          >
            ॐ
          </text>
        </svg>
      </div>

      {/* Subtle Static Star Accents */}
      <div className="absolute top-20 left-[18%] text-amber-500/40 text-sm select-none">
        ✦
      </div>
      <div className="absolute top-48 right-[18%] text-amber-600/40 text-base select-none">
        ✧
      </div>
    </div>
  );
});
