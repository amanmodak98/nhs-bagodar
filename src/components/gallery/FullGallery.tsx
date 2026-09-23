'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  stem: string;
  category: 'independence-day' | 'annual-function' | 'flag-ceremony' | 'leadership' | 'life-at-nhs';
  caption: string;
}

const CATEGORY_LABEL: Record<GalleryImage['category'], { en: string; hi: string }> = {
  'independence-day': { en: 'Independence Day', hi: 'स्वतंत्रता दिवस' },
  'annual-function': { en: 'Annual Function', hi: 'वार्षिक उत्सव' },
  'flag-ceremony': { en: 'Flag-hoisting', hi: 'ध्वजारोहण' },
  'leadership': { en: 'Leadership', hi: 'नेतृत्व' },
  'life-at-nhs': { en: 'Life at NHS', hi: 'जीवन' },
};

function detectCategory(stem: string): GalleryImage['category'] {
  if (stem.startsWith('independence-day-')) return 'independence-day';
  if (stem.startsWith('annual-function-')) return 'annual-function';
  if (stem.startsWith('flag-hoisting-')) return 'flag-ceremony';
  if (stem.startsWith('chief-guest-')) return 'leadership';
  return 'life-at-nhs';
}

const CAPTIONS_BY_CATEGORY: Record<GalleryImage['category'], string[]> = {
  'independence-day': [
    'Independence Day rally, 15 August 2025 — students carrying the school banner and national flags down the village road.',
    'Costumed students leading the rally — Netaji, Bharat Mata, and freedom-fighter portrayals.',
    'Group photo outside the school building under the HIGH SCHOOL signboard.',
    'Wide shot of the rally passing through Dama village.',
    'Students marching past Aura.',
  ],
  'annual-function': [
    'Annual Function 2025 — folk dance performance on the assembly ground.',
    'Stage performance by students in pink and white frilly dresses.',
    'Saree dance by senior girls.',
    'Student speeches and choir performances.',
    'Stage decoration with the National High School banner.',
  ],
  'flag-ceremony': [
    'Flag-hoisting ceremony at the assembly ground.',
    'Chief guest pulling the rope to raise the tricolour.',
    'National anthem in progress.',
    'Salute after flag hoisting.',
  ],
  'leadership': [
    'Chief guest and principal exchanging bouquets on stage.',
    'Welcoming the chief guest with a ceremonial shawl.',
    'Memento and trophy presentations.',
    'Honouring the chief guest.',
  ],
  'life-at-nhs': [
    'A moment from the school grounds.',
    'Students during assembly.',
    'Cultural programme performance.',
    'Group photo from a school event.',
    'A classroom moment.',
  ],
};

function captionFor(category: GalleryImage['category'], idx: number): string {
  const arr = CAPTIONS_BY_CATEGORY[category];
  return arr[idx % arr.length];
}

export function FullGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage['category'] | 'all'>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = images;
    if (active !== 'all') list = list.filter((i) => i.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) =>
        i.caption.toLowerCase().includes(q) ||
        i.stem.toLowerCase().includes(q) ||
        CATEGORY_LABEL[i.category].en.toLowerCase().includes(q),
      );
    }
    return list;
  }, [images, active, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: images.length };
    for (const img of images) c[img.category] = (c[img.category] || 0) + 1;
    return c;
  }, [images]);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIdx, filtered.length]);

  const lightboxImg = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      {/* Filter bar */}
      <div className="border-b border-rule bg-paper sticky top-16 z-30">
        <div className="max-w-edition mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Search photographs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-rule flex-1 min-w-[180px] max-w-xs py-2 text-sm"
          />
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              onClick={() => setActive('all')}
              className={
                'px-3 py-1.5 border uppercase tracking-institutional ' +
                (active === 'all' ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink hover:bg-sand-50')
              }
            >
              All <span className="text-[10px] opacity-70 ml-1">{counts.all}</span>
            </button>
            {(Object.keys(CATEGORY_LABEL) as Array<keyof typeof CATEGORY_LABEL>).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={
                  'px-3 py-1.5 border uppercase tracking-institutional ' +
                  (active === cat ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink hover:bg-sand-50')
                }
              >
                {CATEGORY_LABEL[cat].en} <span className="text-[10px] opacity-70 ml-1">{counts[cat] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-edition mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <p className="text-sm text-slate-600">
            Showing <strong className="text-ink">{filtered.length}</strong> of <strong className="text-ink">{images.length}</strong> photographs
            {search && <> matching "<em>{search}</em>"</>}
          </p>
          <p className="text-xs text-slate-500 italic font-display">
            Click any frame to enlarge. Press Esc, ←, → to navigate.
          </p>
        </div>
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-slate-500 font-display italic">No photographs match the current filter.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filtered.map((img, i) => (
              <button
                key={img.stem}
                type="button"
                onClick={() => setLightboxIdx(i)}
                className="group relative aspect-square overflow-hidden bg-sand-100 focus:outline-none focus:ring-2 focus:ring-forest-800"
                aria-label={`Open photograph: ${img.caption}`}
              >
                <Image
                  src={`/images/${img.stem}.jpeg`}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover photo-warm transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-sand-100 text-xs font-display italic line-clamp-2">{img.caption}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.caption}
          onClick={() => setLightboxIdx(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-sand-100 hover:text-amber-400"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg>
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-sand-100 hover:text-amber-400 bg-forest-900/30 hover:bg-forest-900/60"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length); }}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-sand-100 hover:text-amber-400 bg-forest-900/30 hover:bg-forest-900/60"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => i === null ? null : (i + 1) % filtered.length); }}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <figure
            className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh] max-h-[80vh] flex items-center justify-center">
              <Image
                src={`/images/${lightboxImg.stem}.jpeg`}
                alt={lightboxImg.caption}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="text-center text-sand-100 mt-4 max-w-2xl">
              <p className="font-display italic text-base">{lightboxImg.caption}</p>
              <p className="text-xs text-sand-300 mt-2">
                {(lightboxIdx ?? 0) + 1} of {filtered.length} · {CATEGORY_LABEL[lightboxImg.category].en} · {CATEGORY_LABEL[lightboxImg.category].hi}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}