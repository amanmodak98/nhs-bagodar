'use client';

import { useEffect, useState } from 'react';

interface PrincipalData {
  id?: number;
  name?: string;
  nameHi?: string | null;
  designation?: string;
  designationHi?: string | null;
  qualification?: string | null;
  joinedYear?: number | null;
  photoUrl?: string | null;
  messageEn?: string | null;
  messageHi?: string | null;
  quote2En?: string | null;
  quote2Hi?: string | null;
  quote3En?: string | null;
  quote3Hi?: string | null;
  updatedAt?: string;
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

export function PrincipalSpotlight({ variant = 'home' }: { variant?: 'home' | 'about' }) {
  const [principal, setPrincipal] = useState<PrincipalData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/principal')
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => {
        if (!cancelled) setPrincipal(d ?? {});
      })
      .catch(() => {
        if (!cancelled) setPrincipal({});
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (principal === null) {
    return (
      <p className="border border-rule p-8 text-center text-slate-500 italic font-display">
        Loading principal…
      </p>
    );
  }

  if (!principal.name) {
    return (
      <div className="border border-rule p-8 text-center bg-sand-50">
        <p className="font-display text-lg text-ink">Principal details not set yet.</p>
        <p className="text-xs text-slate-500 mt-2">
          The admin team can publish the principal's details via{' '}
          <a href="/admin/principal" className="text-forest-800 underline underline-offset-2">
            /admin/principal
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      {variant === 'home' ? (
        <div className="grid grid-cols-12 gap-10 items-center">
          <aside className="col-span-12 md:col-span-4">
            <div className="rule-accent mb-4" />
            <div className="eyebrow">From the principal</div>
            {principal.photoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={principal.photoUrl}
                alt={principal.name}
                width={320}
                height={320}
                loading="lazy"
                className="w-full max-w-[320px] aspect-square object-cover border border-rule mt-4"
              />
            ) : (
              <div
                className="w-full max-w-[320px] aspect-square bg-sand-100 border border-rule flex items-center justify-center text-amber-600 font-display text-5xl mt-4"
                aria-hidden
              >
                {initials(principal.name)}
              </div>
            )}
            <h2 className="font-display text-3xl text-ink mt-5">{principal.name}</h2>
            {principal.nameHi ? <p className="hindi-sub text-base text-slate-600 mt-1">{principal.nameHi}</p> : null}
            <p className="text-xs uppercase tracking-institutional text-amber-600 mt-3">
              {principal.designation ?? 'Principal'}
              {principal.joinedYear ? ` · since ${principal.joinedYear}` : ''}
            </p>
            {principal.qualification ? (
              <p className="text-sm text-slate-600 mt-3">{principal.qualification}</p>
            ) : null}
          </aside>
          <blockquote className="col-span-12 md:col-span-8 max-w-reading">
            {principal.messageEn ? (
              <p className="font-display italic text-2xl text-ink leading-snug">"{principal.messageEn}"</p>
            ) : (
              <p className="font-display italic text-2xl text-ink leading-snug text-slate-400">
                No quote published yet — add one in <a href="/admin/principal" className="underline">/admin/principal</a>.
              </p>
            )}
            {principal.messageHi ? (
              <p className="hindi-body text-base text-slate-700 mt-4 italic leading-relaxed">{principal.messageHi}</p>
            ) : null}
            <a href="/about#principal" className="btn-link mt-5 inline-block">
              Read the full address →
            </a>
          </blockquote>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-10">
          <aside className="col-span-12 md:col-span-4">
            <div className="eyebrow">From the principal</div>
            {principal.photoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={principal.photoUrl}
                alt={principal.name}
                width={280}
                height={280}
                loading="lazy"
                className="w-full max-w-[280px] aspect-square object-cover border border-rule mt-3"
              />
            ) : (
              <div
                className="w-full max-w-[280px] aspect-square bg-sand-100 border border-rule flex items-center justify-center text-amber-600 font-display text-4xl mt-3"
                aria-hidden
              >
                {initials(principal.name)}
              </div>
            )}
            <h2 className="font-display text-2xl text-ink mt-4">{principal.name}</h2>
            {principal.nameHi ? (
              <p className="hindi-sub text-sm text-slate-600 mt-1">{principal.nameHi}</p>
            ) : null}
            <p className="text-xs uppercase tracking-institutional text-amber-600 mt-2">
              {principal.designation ?? 'Principal'}
              {principal.joinedYear ? ` · since ${principal.joinedYear}` : ''}
            </p>
            {principal.qualification ? (
              <p className="text-sm text-slate-600 mt-3">{principal.qualification}</p>
            ) : null}
            <p className="text-xs text-slate-500 mt-3">Joined {principal.joinedYear ?? '—'}</p>
          </aside>
          <div className="col-span-12 md:col-span-8 max-w-reading">
            {principal.messageEn ? (
              <blockquote className="font-display italic text-2xl text-ink leading-snug border-l-4 border-amber-500 pl-6 py-2">
                "{principal.messageEn}"
              </blockquote>
            ) : null}
            {principal.messageHi ? (
              <p className="hindi-body text-base text-slate-700 italic mt-6 border-l-4 border-forest-700 pl-6 py-2 leading-relaxed">
                "{principal.messageHi}"
              </p>
            ) : null}
            <p className="mt-6 text-slate-700">
              The principal is reachable in person at the school office on weekdays. For matters
              requiring more time, write via the contact page.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
