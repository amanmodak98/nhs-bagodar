'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/images/independence-day-rally-banner-front.jpeg', caption: 'Independence Day rally, 15 August 2025' },
  { src: '/images/annual-function-stage-saree-dance-lineup-colorful.jpeg', caption: 'Annual Function 2025 — cultural program' },
  { src: '/images/flag-hoisting-ceremony-flag-rising-01.jpeg', caption: 'Flag-hoisting ceremony' },
  { src: '/images/chief-guest-welcome-bouquet-presentation.jpeg', caption: 'Welcoming the chief guest' },
  { src: '/images/annual-function-fairy-costume-pink-wings.jpeg', caption: 'Annual Function — student performance' },
  { src: '/images/independence-day-school-girls-portrait.jpeg', caption: 'Founders\' Day group photo' },
];

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function next() {
    setIdx((i) => (i + 1) % SLIDES.length);
  }
  function prev() {
    setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }
  function go(i: number) {
    setIdx(i);
  }

  // Auto-rotate every 6 seconds; pause on hover via CSS
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group" onMouseEnter={() => {
      if (timer.current) clearTimeout(timer.current);
    }}>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === idx ? 1 : 0 }}
            aria-hidden={i !== idx}
          >
            <Image
              src={s.src}
              alt={s.caption}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover photo-warm"
            />
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pointer-events-none">
          <p className="text-sand-100 text-sm font-display italic">{SLIDES[idx].caption}</p>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        className="carousel-arrow left-3 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="carousel-arrow right-3 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            className={
              'h-1 rounded-full transition-all ' +
              (i === idx ? 'w-6 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400')
            }
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}