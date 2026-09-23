'use client';

import { useEffect, useState } from 'react';
import { TESTIMONIALS } from '@/lib/content';

export function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 7000);
    return () => clearInterval(t);
  }, [total]);

  const t = TESTIMONIALS[idx];
  return (
    <div className="bg-forest-800 text-sand-100 p-8 md:p-12 border border-forest-800 relative">
      <span aria-hidden className="absolute top-4 left-6 text-amber-400 font-display text-6xl leading-none opacity-40">"</span>
      <div className="relative">
        <p className="font-display italic text-xl md:text-2xl leading-snug mb-6 mt-2">
          {t.quote}
        </p>
        <p className="hindi-body text-base text-sand-200/80 italic mb-6">
          {t.quoteHi}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm font-display text-amber-300">{t.parent}</div>
            <div className="text-xs text-sand-300/80 mt-0.5">{t.location}</div>
          </div>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={
                  'w-2 h-2 rounded-full transition-all ' +
                  (i === idx ? 'bg-amber-400 w-6' : 'bg-sand-100/30 hover:bg-sand-100/50')
                }
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}