import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

/**
 * Defers rendering of below-the-fold heavy components until the user scrolls near them.
 * Drastically improves Initial Page Load, First Contentful Paint (FCP), and Total Blocking Time (TBT).
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = null,
  rootMargin = '600px',
  minHeight = '120px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;
    
    // Fallback for environments without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div 
      ref={containerRef} 
      className={isVisible ? 'content-visibility-auto' : ''}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? children : fallback}
    </div>
  );
};
