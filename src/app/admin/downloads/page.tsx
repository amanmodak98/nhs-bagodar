'use client';

import { useEffect, useState } from 'react';
import { DownloadManager } from '@/components/admin/DownloadManager';

export default function AdminDownloadsPage() {
  const [items, setItems] = useState<any[] | null>(null);
  useEffect(() => {
    fetch('/api/admin/downloads', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);
  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Downloads</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Publish documents for students and parents to download. Upload PDFs/images to R2 directly from here.
        </p>
      </header>
      {items === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <DownloadManager initial={items} />
      )}
    </div>
  );
}