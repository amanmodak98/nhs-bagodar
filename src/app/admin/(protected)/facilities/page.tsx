'use client';

import { useEffect, useState } from 'react';
import { FacilityManager } from '@/components/admin/FacilityManager';
import type { Facility } from '@/lib/types';

export default function AdminFacilitiesPage() {
  const [items, setItems] = useState<Facility[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/facilities', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Facilities</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Manage the cards shown on <a href="/facilities" className="underline">/facilities</a>. Each card has a slug,
          English/Hindi name, English/Hindi description, an image (R2 upload or <code className="font-mono">/images/</code>{' '}
          stem), and the year it became operational. Cards are displayed in <code className="font-mono">order</code> order.
        </p>
      </header>
      {items === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <FacilityManager initial={items} />
      )}
    </div>
  );
}
