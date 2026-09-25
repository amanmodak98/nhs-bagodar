'use client';

import { useEffect, useState } from 'react';
import { PrincipalManager } from '@/components/admin/PrincipalManager';
import type { Principal } from '@/lib/types';

export default function AdminPrincipalPage() {
  const [principal, setPrincipal] = useState<Partial<Principal> | null>(null);

  useEffect(() => {
    fetch('/api/admin/principal', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => setPrincipal(d ?? {}))
      .catch(() => setPrincipal({}));
  }, []);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Principal · details & quotes</h1>
        <p className="text-slate-600 mt-2 text-sm">
          One principal record, shared by the home page and the /about page. The
          primary quote is featured in both places; quotes 2 and 3 are kept ready
          for end-of-year messages, annual function speeches, and admissions copy.
        </p>
      </header>
      {principal === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <PrincipalManager initial={principal} />
      )}
    </div>
  );
}
