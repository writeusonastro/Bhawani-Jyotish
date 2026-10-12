import React from 'react';

interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'blue' | 'emerald';
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'sm',
  variant = 'gold',
  className = '',
  showTooltip = true,
  tooltipText = 'सत्यापित आधिकारिक प्रोफाइल (Verified Astrologer)'
}) => {
  const sizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const badgeColors = {
    gold: {
      rosette: '#f99c00',
      gradId: 'royalGoldBadgeGrad',
      check: '#050714',
      dot: '#ffd236'
    },
    blue: {
      rosette: '#0095F6',
      gradId: null,
      check: '#FFFFFF',
      dot: '#0095F6'
    },
    emerald: {
      rosette: '#00bb7f',
      gradId: null,
      check: '#FFFFFF',
      dot: '#00bb7f'
    }
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center align-middle relative group select-none shrink-0 ${className}`}
      title={showTooltip ? tooltipText : undefined}
      aria-label="Verified Account"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${sizeClasses[size]} drop-shadow-[0_1px_4px_rgba(249,156,0,0.4)]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {variant === 'gold' && (
          <defs>
            <linearGradient id="royalGoldBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd236" />
              <stop offset="50%" stopColor="#fcbb00" />
              <stop offset="100%" stopColor="#f99c00" />
            </linearGradient>
          </defs>
        )}
        {/* Scalloped 16-point verified royal rosette */}
        <path
          d="M22.5 12.5c0-1.58-.8-3.04-2.13-3.89.54-1.51.27-3.22-.81-4.3s-2.79-1.35-4.3-.81C14.41 2.17 12.95 1.37 11.37 1.37s-3.04.8-3.89 2.13c-1.51-.54-3.22-.27-4.3.81s-1.35 2.79-.81 4.3C1.04 9.46.24 10.92.24 12.5s.8 3.04 2.13 3.89c-.54 1.51-.27 3.22.81 4.3s2.79 1.35 4.3.81c.85 1.33 2.31 2.13 3.89 2.13s3.04-.8 3.89-2.13c1.51.54 3.22.27 4.3-.81s1.35-2.79.81-4.3c1.33-.85 2.13-2.31 2.13-3.89z"
          fill={variant === 'gold' ? 'url(#royalGoldBadgeGrad)' : badgeColors.rosette}
        />
        {/* Crisp checkmark */}
        <path
          d="M9.7 16.85L5.45 12.6l1.42-1.42 2.83 2.83 6.37-6.37 1.41 1.42-7.78 7.82z"
          fill={badgeColors.check}
        />
      </svg>

      {/* Subtle hover tooltip badge */}
      {showTooltip && (
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex items-center gap-1 z-50 whitespace-nowrap rounded-md bg-[#0c1334] text-amber-200 text-[10px] font-bold py-1 px-2 shadow-xl border border-amber-400/40">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badgeColors.dot }}></span>
          <span>{tooltipText}</span>
        </span>
      )}
    </span>
  );
};
