import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyViewportSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
  delayFallbackMs?: number;
}

/**
 * High-performance viewport intersection loader
 * Loads heavy below-the-fold modules only when the user scrolls near them,
 * drastically speeding up the initial page open time on mobile and desktop.
 */
export const LazyViewportSection: React.FC<LazyViewportSectionProps> = ({
  children,
  fallback = null,
  minHeight = '180px',
  rootMargin = '350px',
  delayFallbackMs = 5000,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If already rendered or in an environment without IntersectionObserver, render immediately
    if (shouldRender) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Safety fallback: if user has stayed on the page, load gradually during idle
    const fallbackTimer = setTimeout(() => {
      setShouldRender(true);
    }, delayFallbackMs);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [rootMargin, delayFallbackMs, shouldRender]);

  return (
    <div ref={containerRef} style={{ minHeight: shouldRender ? undefined : minHeight }}>
      {shouldRender ? children : fallback}
    </div>
  );
};
