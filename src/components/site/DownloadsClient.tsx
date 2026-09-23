'use client';

import { useEffect, useMemo, useState } from 'react';

interface DownloadItem {
  id: number;
  title: string;
  titleHi?: string | null;
  category: string;
  description?: string | null;
  fileUrl: string;
  r2Key?: string | null;
  fileSize?: number | null;
  updatedAt: string;
}

interface Category { id: string; label: string; labelHi: string }

export function DownloadsClient({ categories }: { categories: Category[] }) {
  const [items, setItems] = useState<DownloadItem[] | null>(null);
  const [active, setActive] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/downloads')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: 0 };
    (items || []).forEach((it) => {
      c.all++;
      c[it.category] = (c[it.category] || 0) + 1;
    });
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    let list = items || [];
    if (active !== 'all') list = list.filter((it) => it.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.titleHi || '').toLowerCase().includes(q) ||
          (it.description || '').toLowerCase().includes(q),
      );
    }
    return list;
  }, [items, active, search]);

  if (items === null) {
    return <p className="text-sm text-slate-500 italic font-display">Loading downloads…</p>;
  }

  return (
    <>
      {/* Filter bar */}
      <div className="border border-rule bg-sand-50 p-3 mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search downloads…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-rule flex-1 min-w-[180px] max-w-xs py-2 text-sm bg-paper"
        />
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => setActive('all')}
            className={
              'px-3 py-1.5 border uppercase tracking-institutional ' +
              (active === 'all' ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink hover:bg-paper')
            }
          >
            All <span className="text-[10px] opacity-70 ml-1">{counts.all}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={
                'px-3 py-1.5 border uppercase tracking-institutional ' +
                (active === c.id ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink hover:bg-paper')
              }
            >
              {c.label} <span className="text-[10px] opacity-70 ml-1">{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 italic mb-4">
        Showing <strong className="text-ink">{filtered.length}</strong> of <strong className="text-ink">{items.length}</strong> downloads
        {active !== 'all' && <> in <strong className="text-ink">{categories.find((c) => c.id === active)?.label}</strong></>}
      </p>

      {items.length === 0 ? (
        <div className="border border-rule p-12 text-center">
          <p className="text-slate-500 font-display italic">No downloads published yet.</p>
          <p className="text-xs text-slate-500 mt-2">
            The admin team can publish documents via{' '}
            <a href="/admin/login" className="text-forest-800 underline underline-offset-2">
              the admin panel
            </a>
            .
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-rule p-10 text-center text-slate-500 font-display italic">
          No downloads match the current filter.
        </div>
      ) : (
        <ul className="divide-y divide-rule-soft border-y border-rule-soft">
          {filtered.map((d) => (
            <li key={d.id} className="py-5 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12 md:col-span-7">
                <h3 className="font-display text-base text-ink">{d.title}</h3>
                {d.titleHi && (
                  <p className="hindi-body text-sm text-slate-600 italic mt-0.5">{d.titleHi}</p>
                )}
                {d.description && (
                  <p className="text-sm text-slate-700 mt-1 leading-snug">{d.description}</p>
                )}
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span className="pill text-[10px]">{categories.find((c) => c.id === d.category)?.label || d.category}</span>
                  <span>Updated {fmtDate(d.updatedAt)}</span>
                  {d.fileSize ? <span>{fmtSize(d.fileSize)}</span> : null}
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 flex md:justify-end">
                <a
                  href={d.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-800 text-sand-100 border border-forest-800 hover:bg-forest-700 text-[12px] font-semibold tracking-wide uppercase"
                >
                  Download
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M12 4v12m0 0-4-4m4 4 4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function fmtDate(iso?: string) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

function fmtSize(bytes?: number | null) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}