'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

const CATEGORIES = [
  { id: 'independence-day', label: 'Independence Day', labelHi: 'स्वतंत्रता दिवस' },
  { id: 'annual-function', label: 'Annual Function', labelHi: 'वार्षिक उत्सव' },
  { id: 'flag-ceremony', label: 'Flag-hoisting', labelHi: 'ध्वजारोहण' },
  { id: 'leadership', label: 'Leadership', labelHi: 'नेतृत्व' },
  { id: 'life-at-nhs', label: 'Life at NHS', labelHi: 'जीवन' },
] as const;
type CategoryId = (typeof CATEGORIES)[number]['id'];

export interface GalleryImage {
  stem: string;
  r2Key?: string | null;
  category: CategoryId;
  caption: string;
  captionHi?: string | null;
  isPublished: boolean;
  orderIndex: number;
}

function srcFor(img: GalleryImage) {
  if (img.r2Key) return `/api/files/${img.r2Key}`;
  return `/images/${img.stem}.jpeg`;
}

function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
function categoryLabelHi(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.labelHi ?? '';
}

export function GalleryClient({ totalLabel }: { totalLabel: string }) {
  const [images, setImages] = useState<GalleryImage[] | null>(null);
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => {
        if (cancelled) return;
        const list: GalleryImage[] = (d?.items ?? []).filter((x: GalleryImage) => x.isPublished);
        setImages(list);
      })
      .catch(() => {
        if (!cancelled) setImages([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: 0 };
    (images ?? []).forEach((it) => {
      c.all++;
      c[it.category] = (c[it.category] || 0) + 1;
    });
    return c;
  }, [images]);

  const filtered = useMemo(() => {
    let list = images ?? [];
    if (active !== 'all') list = list.filter((i) => i.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          (i.caption || '').toLowerCase().includes(q) ||
          (i.captionHi || '').toLowerCase().includes(q) ||
          i.stem.toLowerCase().includes(q) ||
          categoryLabel(i.category).toLowerCase().includes(q),
      );
    }
    return list;
  }, [images, active, search]);

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

  if (images === null) {
    return <p className="text-sm text-slate-500 italic font-display py-12 text-center">Loading photographs…</p>;
  }

  if (images.length === 0) {
    return (
      <div className="border border-rule p-10 text-center bg-sand-50">
        <p className="font-display text-lg text-ink">No photographs published yet.</p>
        <p className="text-xs text-slate-500 mt-2">
          The admin team can manage the gallery via{' '}
          <a href="/admin/login" className="text-forest-800 underline underline-offset-2">
            the admin panel
          </a>
          .
        </p>
      </div>
    );
  }

  const lightboxImg = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
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
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={
                  'px-3 py-1.5 border uppercase tracking-institutional ' +
                  (active === cat.id ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink hover:bg-sand-50')
                }
              >
                {cat.label}{' '}
                <span className="text-[10px] opacity-70 ml-1">{counts[cat.id] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-edition mx-auto px-6 py-10">
        <p className="text-sm text-slate-600 mb-6">
          Showing <strong className="text-ink">{filtered.length}</strong> of{' '}
          <strong className="text-ink">{totalLabel}</strong>
          {active !== 'all' && (
            <>
              {' '}in <strong className="text-ink">{categoryLabel(active)}</strong>
            </>
          )}
          {search && (
            <>
              {' '}matching "<em>{search}</em>"
            </>
          )}
        </p>

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
                aria-label={`Open photograph: ${img.caption || img.stem}`}
              >
                <Image
                  src={srcFor(img)}
                  alt={img.caption || img.stem}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover photo-warm transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-sand-100 text-xs font-display italic line-clamp-2">
                    {img.caption || img.stem}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxImg && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightboxImg.caption || lightboxImg.stem} onClick={() => setLightboxIdx(null)}>
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
          <figure className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[80vh] max-h-[80vh] flex items-center justify-center">
              <Image
                src={srcFor(lightboxImg)}
                alt={lightboxImg.caption || lightboxImg.stem}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="text-center text-sand-100 mt-4 max-w-2xl">
              <p className="font-display italic text-base">{lightboxImg.caption || lightboxImg.stem}</p>
              {lightboxImg.captionHi ? (
                <p className="hindi-body text-sm mt-2">{lightboxImg.captionHi}</p>
              ) : null}
              <p className="text-xs text-sand-300 mt-2">
                {(lightboxIdx ?? 0) + 1} of {filtered.length} · {categoryLabel(lightboxImg.category)} · {categoryLabelHi(lightboxImg.category)}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
