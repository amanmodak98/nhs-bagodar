'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export function FacultySpotlight({ count = 6 }: { count?: number }) {
  const [faculty, setFaculty] = useState<FacultyRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/faculty')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => {
        if (cancelled) return;
        const items: FacultyRow[] = Array.isArray(d?.items) ? d.items : [];
        setFaculty(items.sort((a, b) => a.orderIndex - b.orderIndex).slice(0, count));
      })
      .catch(() => {
        if (!cancelled) setFaculty([]);
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  if (faculty === null) {
    return (
      <p className="border border-rule p-8 text-center text-slate-500 italic font-display">
        Loading faculty…
      </p>
    );
  }

  if (faculty.length === 0) {
    return (
      <div className="border border-rule p-10 text-center bg-sand-50">
        <p className="font-display text-lg text-ink">No faculty listed yet.</p>
        <p className="text-xs text-slate-500 mt-2">
          The admin team is updating records. Check back soon, or{' '}
          <Link href="/admin/login" className="text-forest-800 underline underline-offset-2">
            add them via the admin panel
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-rule border border-rule">
        {faculty.map((f) => (
          <li
            key={f.id}
            className="bg-paper p-5 flex flex-col items-center text-center hover:bg-sand-50 transition-colors"
          >
            {f.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={f.imageUrl}
                alt={f.name}
                width={96}
                height={96}
                loading="lazy"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover bg-sand-100 mb-3"
              />
            ) : (
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sand-100 mb-3 flex items-center justify-center font-display text-amber-600 text-2xl"
                aria-hidden
              >
                {initials(f.name)}
              </div>
            )}
            <div className="font-display text-sm text-ink leading-tight">{f.name}</div>
            <div className="text-[10px] uppercase tracking-institutional text-amber-600 mt-1">{f.designation}</div>
            <div className="text-xs text-slate-600 mt-1.5 leading-snug">
              {f.subject}
              {f.qualification ? (
                <span className="block text-[10px] text-slate-500 italic mt-0.5">{f.qualification}</span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mt-4">
        Names, designations, qualifications and joining years are published per CBSE Affiliation Bye-Laws §3.1.
      </p>
    </>
  );
}
