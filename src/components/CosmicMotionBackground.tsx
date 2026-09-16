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

// 27 Nakshatras ticks (360 / 27 = 13.33 deg)
const NAKSHATRA_COUNT = 27;

// 9 Navagrahas symbols for the inner counter-rotating ring
const NAVAGRAHAS = ['☉ सूर्य', '☽ चंद्र', '♂ मंगल', '☿ बुध', '♃ गुरु', '♀ शुक्र', '♄ शनि', '☊ राहु', '☋ केतु'];

export const CosmicMotionBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      {/* Background soft golden ambient lighting */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(254, 243, 199, 0.6) 0%, rgba(255, 251, 235, 0.4) 50%, rgba(255, 253, 248, 0.95) 100%)',
        }}
      />

      {/* Subtle Central Glowing Divine Golden Sun Core */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-r from-amber-300/15 via-yellow-400/10 to-orange-400/15 blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 🔮 MAIN GIANT ASTROLOGY KALACHAKRA (कालचक्र / ज्योतिष राशि चक्र) */}
      {/* Hardware-accelerated GPU compositor CSS transforms (Zero JS thread lag) */}
      {/* ========================================================================= */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] sm:w-[950px] sm:h-[950px] max-w-none flex items-center justify-center select-none pointer-events-none opacity-40">
        
        {/* RING 1: Outermost Rotating Zodiac Ring with 12 Rashis */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center animate-spin-clockwise-90s">
          <svg className="w-full h-full" viewBox="0 0 950 950">
            <defs>
              <linearGradient id="goldChakraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Outermost rim circle */}
            <circle cx="475" cy="475" r="460" fill="none" stroke="url(#goldChakraGrad)" strokeWidth="1.8" />
            <circle cx="475" cy="475" r="448" fill="none" stroke="#D97706" strokeWidth="0.8" strokeDasharray="6 4" strokeOpacity="0.25" />
            <circle cx="475" cy="475" r="390" fill="none" stroke="url(#goldChakraGrad)" strokeWidth="1.5" />

            {/* 12 Rashi Sector Divider Lines */}
            {ZODIAC_SIGNS.map((z, idx) => {
              const rad = (z.angle * Math.PI) / 180;
              const x1 = 475 + 390 * Math.cos(rad);
              const y1 = 475 + 390 * Math.sin(rad);
              const x2 = 475 + 460 * Math.cos(rad);
              const y2 = 475 + 460 * Math.sin(rad);

              // Position for 12 Zodiac glyphs & Hindi Rashi names
              const midAngle = ((z.angle + 15) * Math.PI) / 180;
              const textX = 475 + 424 * Math.cos(midAngle);
              const textY = 475 + 424 * Math.sin(midAngle);

              return (
                <g key={idx}>
                  {/* Radial Divider */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D97706" strokeWidth="0.9" strokeOpacity="0.3" />
                  
                  {/* Small decorative dot at intersection */}
                  <circle cx={x2} cy={y2} r="2.5" fill="#D97706" fillOpacity="0.4" />

                  {/* Zodiac glyph & label */}
                  <g transform={`translate(${textX}, ${textY}) rotate(${z.angle + 105})`}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#852E10"
                      fillOpacity="0.4"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="'Mukta', sans-serif"
                    >
                      {z.sign} {z.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* RING 2: 27 Nakshatras & Vedic Bhavas */}
        <div className="absolute w-[760px] h-[760px] flex items-center justify-center animate-spin-counter-120s">
          <svg className="w-full h-full" viewBox="0 0 760 760">
            {/* Outer edge of Nakshatra circle */}
            <circle cx="380" cy="380" r="370" fill="none" stroke="#D97706" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="380" cy="380" r="330" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* 27 Nakshatra ticks */}
            {[...Array(NAKSHATRA_COUNT)].map((_, i) => {
              const angle = (i * 360) / NAKSHATRA_COUNT;
              const rad = (angle * Math.PI) / 180;
              const x1 = 380 + 330 * Math.cos(rad);
              const y1 = 380 + 330 * Math.sin(rad);
              const x2 = 380 + 370 * Math.cos(rad);
              const y2 = 380 + 370 * Math.sin(rad);
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

            {/* Sacred 12 Lotus Petals (कमल दल) */}
            {[...Array(12)].map((_, i) => {
              const angle = i * 30;
              return (
                <path
                  key={i}
                  d="M 380 90 C 350 180, 350 260, 380 340 C 410 260, 410 180, 380 90 Z"
                  fill="rgba(245, 158, 11, 0.025)"
                  stroke="#D97706"
                  strokeWidth="0.8"
                  strokeOpacity="0.25"
                  transform={`rotate(${angle} 380 380)`}
                />
              );
            })}
          </svg>
        </div>

        {/* RING 3: Navagraha Planetary Ring with 9 Vedic Planets */}
        <div className="absolute w-[580px] h-[580px] flex items-center justify-center animate-spin-clockwise-75s">
          <svg className="w-full h-full" viewBox="0 0 580 580">
            <circle cx="290" cy="290" r="280" fill="none" stroke="#D97706" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="290" cy="290" r="240" fill="none" stroke="#F59E0B" strokeWidth="0.9" strokeDasharray="5 5" strokeOpacity="0.3" />
            
            {/* 9 Navagraha nodes */}
            {NAVAGRAHAS.map((g, i) => {
              const angle = (i * 360) / 9;
              const rad = (angle * Math.PI) / 180;
              const x = 290 + 260 * Math.cos(rad);
              const y = 290 + 260 * Math.sin(rad);

              return (
                <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 90})`}>
                  <circle r="13" fill="#FFFDF8" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#92400E"
                    fillOpacity="0.45"
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

        {/* RING 4: Innermost Vedic Kundli Chakra */}
        <div className="absolute w-[400px] h-[400px] flex items-center justify-center animate-spin-counter-60s">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Double concentric ring */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="#D97706" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.3" />

            {/* Sacred 8-Pointed Star (अष्टदल चक्र / अष्टलक्ष्मी यंत्र) */}
            <polygon
              points="200,65 240,160 335,200 240,240 200,335 160,240 65,200 160,160"
              fill="rgba(251, 191, 36, 0.04)"
              stroke="#D97706"
              strokeWidth="0.9"
              strokeOpacity="0.3"
            />
            <polygon
              points="200,80 230,170 320,200 230,230 200,320 170,230 80,200 170,170"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="0.8"
              strokeDasharray="4 3"
              strokeOpacity="0.3"
              transform="rotate(45 200 200)"
            />

            {/* Center Sacred Sun Dial Rays (द्वादश सूर्य किरणें) */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="140"
                x2="200"
                y2="175"
                stroke="#D97706"
                strokeWidth="1"
                strokeOpacity="0.3"
                transform={`rotate(${i * 30} 200 200)`}
              />
            ))}

            <circle cx="200" cy="200" r="45" fill="#FFFDF8" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="200" cy="200" r="32" fill="none" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.35" />
            
            {/* Center Sacred ॐ Symbol */}
            <text
              x="200"
              y="207"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#B45309"
              fillOpacity="0.38"
              fontSize="26"
              fontWeight="bold"
              fontFamily="'Mukta', serif"
            >
              ॐ
            </text>
          </svg>
        </div>
      </div>

      {/* Secondary Distant Complementary Rotating Chakra on Bottom-Right for Depth */}
      <div className="absolute -bottom-48 -right-48 w-[620px] h-[620px] opacity-20 pointer-events-none select-none animate-spin-clockwise-90s hidden sm:block">
        <svg className="w-full h-full" viewBox="0 0 620 620">
          <circle cx="310" cy="310" r="300" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="8 6" />
          <circle cx="310" cy="310" r="250" fill="none" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="310" cy="310" r="180" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="4 4" />
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="310"
              y1="130"
              x2="310"
              y2="490"
              stroke="#D97706"
              strokeWidth="0.8"
              strokeOpacity="0.3"
              transform={`rotate(${i * 22.5} 310 310)`}
            />
          ))}
        </svg>
      </div>

      {/* Subtle Static Star Accents */}
      <div className="absolute top-20 left-[18%] text-amber-500/50 text-sm select-none">
        ✦
      </div>
      <div className="absolute top-48 right-[18%] text-amber-600/50 text-base select-none">
        ✧
      </div>
    </div>
  );
};

