'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps content in a reveal-on-scroll effect.
 * Adds data-reveal and toggles data-reveal="visible" when 25% into view.
 */
export function Reveal({
  children,
  className,
  as: As = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-reveal', 'visible');
      return;
    }
    const prefersReduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      el.setAttribute('data-reveal', 'visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.setAttribute('data-reveal', 'visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = As as any;
  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}