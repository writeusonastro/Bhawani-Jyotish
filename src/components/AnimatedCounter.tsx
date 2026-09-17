import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: React.ReactNode;
  suffix?: string;
  useGrouping?: boolean;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix,
  suffix = '',
  useGrouping = true,
  className = '',
}) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Easing function: easeOutExpo for dramatic, professional counting effect
    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const startCounting = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();

      let lastFrameTime = 0;
      let rafId: number;

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (currentTime - lastFrameTime > 40 || progress >= 1) {
          lastFrameTime = currentTime;
          const easedProgress = easeOutExpo(progress);
          const currentVal = progress >= 1 ? end : easedProgress * end;
          setCount(currentVal);
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(updateCounter);
        } else {
          setCount(end);
        }
      };

      rafId = requestAnimationFrame(updateCounter);
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    // IntersectionObserver so animation triggers gracefully when in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startCounting();
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    } else {
      startCounting();
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  const formattedNumber = count.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: useGrouping,
  });

  return (
    <span ref={elementRef} className={`inline-flex items-center gap-1 font-tabular-nums ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span>{formattedNumber}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
};
