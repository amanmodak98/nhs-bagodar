'use client';

import { useEffect, useState } from 'react';
import { Photo } from '@/components/ui/Photo';

interface Facility {
  id: string;
  name: string;
  nameHi?: string | null;
  description: string;
  descriptionHi?: string | null;
  imageStem?: string | null;
  imageUrl?: string | null;
  established?: string | null;
  orderIndex: number;
}

// Filesystem images live at /images/{stem}.jpeg — equivalent to the
// server-side imgUrl() helper but without pulling in node:fs.
const fileUrl = (stem: string) => `/images/${stem}.jpeg`;

function srcFor(f: Facility) {
  if (f.imageStem) return fileUrl(f.imageStem);
  if (f.imageUrl) return f.imageUrl;
  return null;
}

export function FacilitiesList() {
  const [items, setItems] = useState<Facility[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/facilities')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => {
        if (cancelled) return;
        const list: Facility[] = Array.isArray(d?.items) ? d.items : [];
        setItems(list.sort((a, b) => a.orderIndex - b.orderIndex));
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items === null) {
    return <p className="border border-rule p-8 text-center text-slate-500 italic font-display">Loading facilities…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="border border-rule p-10 text-center bg-sand-50">
        <p className="font-display text-lg text-ink">Facilities list not yet published.</p>
        <p className="text-xs text-slate-500 mt-2">
          The admin team can publish facilities via{' '}
          <a href="/admin/login" className="text-forest-800 underline underline-offset-2">
            the admin panel
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <section className="border-b border-rule">
      <div className="max-w-edition mx-auto px-6 py-16 md:py-22 space-y-16">
        {items.map((f, i) => {
          const flip = i % 2 === 1;
          const src = srcFor(f);
          return (
            <article key={f.id} className="grid grid-cols-12 gap-6 md:gap-10 items-center">
              <div className={'col-span-12 md:col-span-6 ' + (flip ? 'md:order-2' : '')}>
                <div className="text-xs uppercase tracking-institutional text-amber-600 font-semibold">
                  Facility {String(i + 1).padStart(2, '0')}
                </div>
                <h2 className="font-display text-3xl text-ink mt-2">{f.name}</h2>
                {f.nameHi ? (
                  <p className="hindi-sub text-base text-slate-600 mt-1">{f.nameHi}</p>
                ) : null}
                <p className="mt-4 text-slate-700 leading-relaxed max-w-reading">{f.description}</p>
                {f.descriptionHi ? (
                  <p className="hindi-body text-sm text-slate-700 mt-3 italic leading-relaxed max-w-reading">
                    {f.descriptionHi}
                  </p>
                ) : null}
                {f.established ? (
                  <div className="mt-4 text-xs uppercase tracking-institutional text-slate-500">
                    Operational since {f.established}
                  </div>
                ) : null}
              </div>
              <div className={'col-span-12 md:col-span-6 ' + (flip ? 'md:order-1' : '')}>
                {src ? (
                  <Photo src={src} alt={f.name} ratio="4/3" />
                ) : (
                  <div className="aspect-[4/3] bg-sand-100 border border-rule flex items-center justify-center text-slate-400 font-display italic">
                    No photograph published yet
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
