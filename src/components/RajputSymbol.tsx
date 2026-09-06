import React from 'react';

interface RajputSymbolProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'crest' | 'swords' | 'surya';
  showTitle?: boolean;
}

export const RajputSymbol: React.FC<RajputSymbolProps> = ({
  size = 'sm',
  className = '',
  variant = 'crest',
  showTitle = true,
}) => {
  const sizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <span
      className={`inline-flex items-center justify-center align-middle relative select-none shrink-0 ${className}`}
      title={showTitle ? 'राजपूती सूर्यवंशी शाही प्रतीक (Rajput Royal Emblem)' : undefined}
      aria-label="राजपूती प्रतीक"
    >
      <svg
        viewBox="0 0 48 48"
        className={`${sizeClasses[size]} drop-shadow-xs overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crossed Rajputi Royal Talwars (Swords) */}
        <g stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Sword Blade (Curved Rajputi Talwar) */}
          <path
            d="M8 40 L16 32 C22 26 28 17 38 7 C40 5 42 7 40 10 C32 18 24 24 18 30 L10 38 Z"
            fill="url(#rajputSwordGrad1)"
            stroke="#B45309"
          />
          {/* Left Sword Hilt (Rajput style pommel & disc) */}
          <circle cx="7" cy="41" r="2.5" fill="#F59E0B" stroke="#78350F" />
          <path d="M5 38 L11 44" stroke="#78350F" strokeWidth="2" />
          <rect x="8.5" y="34.5" width="2" height="4" rx="1" transform="rotate(-45 8.5 34.5)" fill="#D97706" />

          {/* Right Sword Blade (Curved Rajputi Talwar) */}
          <path
            d="M40 40 L32 32 C26 26 20 17 10 7 C8 5 6 7 8 10 C16 18 24 24 30 30 L38 38 Z"
            fill="url(#rajputSwordGrad2)"
            stroke="#B45309"
          />
          {/* Right Sword Hilt */}
          <circle cx="41" cy="41" r="2.5" fill="#F59E0B" stroke="#78350F" />
          <path d="M43 38 L37 44" stroke="#78350F" strokeWidth="2" />
          <rect x="37.5" y="33.5" width="2" height="4" rx="1" transform="rotate(45 37.5 33.5)" fill="#D97706" />
        </g>

        {/* Central Rajput Royal Shield (Dhal) & Suryavansh Sun */}
        <circle cx="24" cy="24" r="11" fill="url(#rajputShieldGrad)" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="9" fill="url(#rajputSunGrad)" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 1" />

        {/* Radiating Sun Rays (Surya) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="24"
            y1="13"
            x2="24"
            y2="10.5"
            transform={`rotate(${angle} 24 24)`}
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {/* Rajput Royal Tilak / Saffron Crest in the center */}
        <circle cx="24" cy="24" r="4.2" fill="#DC2626" />
        <circle cx="24" cy="24" r="2" fill="#FEF08A" />

        {/* Rajput Shield 4 Golden Bosses (चार ढाल की पीतल की कीलें) */}
        <circle cx="19" cy="19" r="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.5" />
        <circle cx="29" cy="19" r="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.5" />
        <circle cx="19" cy="29" r="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.5" />
        <circle cx="29" cy="29" r="1.2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.5" />

        {/* Gradients */}
        <defs>
          <linearGradient id="rajputSwordGrad1" x1="8" y1="40" x2="38" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.5" stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="rajputSwordGrad2" x1="40" y1="40" x2="10" y2="7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.5" stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
          <radialGradient id="rajputShieldGrad" cx="24" cy="24" r="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#78350F" />
            <stop offset="0.7" stopColor="#451A03" />
            <stop offset="1" stopColor="#271003" />
          </radialGradient>
          <radialGradient id="rajputSunGrad" cx="24" cy="24" r="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.8" stopColor="#D97706" />
            <stop offset="1" stopColor="#B45309" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );
};
