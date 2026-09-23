'use client';

import { useEffect, useState } from 'react';
import { DisclosureManager } from '@/components/admin/DisclosureManager';

export default function AdminDisclosurePage() {
  const [disclosures, setDisclosures] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/disclosure', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setDisclosures(data?.items ?? []))
      .catch(() => setDisclosures([]));
  }, []);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Mandatory public disclosure</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Upload and replace mandatory regulatory documents. PDF URLs point to the R2 bucket in production.
        </p>
      </header>
      {disclosures === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <DisclosureManager initial={disclosures} />
      )}
    </div>
  );
}