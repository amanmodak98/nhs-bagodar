'use client';

import { useEffect, useState } from 'react';
import { FacultyManager } from '@/components/admin/FacultyManager';

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/faculty', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setFaculty(data?.items ?? []))
      .catch(() => setFaculty([]));
  }, []);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Faculty directory</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Add, edit, and reorder faculty records. Order is shown left-to-right on the public page.
        </p>
      </header>
      {faculty === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <FacultyManager initial={faculty} />
      )}
    </div>
  );
}