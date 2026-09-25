'use client';

import { useEffect, useState } from 'react';

interface FacultyRow {
  id: number;
  name: string;
  designation: string;
  qualification?: string;
  subject?: string;
  joinedYear?: number;
  imageUrl?: string;
  orderIndex: number;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0] || '')
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function fmtYear(y?: number) {
  if (!y) return '';
  return `${y}`;
}

export function FacultyDirectory() {
  const [faculty, setFaculty] = useState<FacultyRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/faculty')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => {
        if (cancelled) return;
        const items: FacultyRow[] = Array.isArray(d?.items) ? d.items : [];
        setFaculty(items.sort((a, b) => a.orderIndex - b.orderIndex));
      })
      .catch(() => {
        if (!cancelled) setFaculty([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (faculty === null) {
    return <p className="border border-rule p-8 text-center text-slate-500 italic font-display">Loading faculty…</p>;
  }

  if (faculty.length === 0) {
    return (
      <div className="border border-rule p-10 text-center bg-sand-50">
        <p className="font-display text-lg text-ink">No faculty records published yet.</p>
        <p className="text-xs text-slate-500 mt-2">
          The admin team can add faculty via{' '}
          <a href="/admin/login" className="text-forest-800 underline underline-offset-2">
            the admin panel
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="border-y-2 border-ink overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink">
            <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600 w-24">Photo</th>
            <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink">Name</th>
            <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden md:table-cell">Designation</th>
            <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden md:table-cell">Qualification</th>
            <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden md:table-cell">Subject</th>
            <th className="text-left py-3 pr-4 font-display text-xs uppercase tracking-institutional text-ink hidden lg:table-cell">Joined</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((f) => (
            <tr key={f.id} className="border-b border-rule-soft">
              <td className="py-3 pr-4 w-24">
                {f.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={f.imageUrl}
                    alt={f.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 object-cover rounded-full bg-sand-100"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center text-amber-600 font-display text-lg"
                    aria-hidden
                  >
                    {initials(f.name)}
                  </div>
                )}
              </td>
              <td className="py-3 pr-4 text-ink font-medium">{f.name}</td>
              <td className="py-3 pr-4 text-slate-700 hidden md:table-cell">{f.designation}</td>
              <td className="py-3 pr-4 text-slate-600 hidden md:table-cell">{f.qualification}</td>
              <td className="py-3 pr-4 text-slate-600 hidden md:table-cell">{f.subject}</td>
              <td className="py-3 pr-4 text-slate-600 hidden lg:table-cell font-mono">{fmtYear(f.joinedYear)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
