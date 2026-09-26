'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'independence-day', label: 'Independence Day', labelHi: 'स्वतंत्रता दिवस' },
  { id: 'annual-function', label: 'Annual Function', labelHi: 'वार्षिक उत्सव' },
  { id: 'flag-ceremony', label: 'Flag-hoisting', labelHi: 'ध्वजारोहण' },
  { id: 'leadership', label: 'Leadership', labelHi: 'नेतृत्व' },
  { id: 'life-at-nhs', label: 'Life at NHS', labelHi: 'जीवन' },
] as const;
type CategoryId = (typeof CATEGORIES)[number]['id'];

export interface GalleryRow {
  stem: string;
  r2Key?: string | null;
  category: string;
  caption: string;
  captionHi?: string | null;
  isPublished: boolean;
  orderIndex: number;
  source?: 'fs' | 'r2';
  isNew?: boolean;
  id?: number;
}

function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function GalleryManager() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryRow[] | null>(null);
  const [filesystemCount, setFilesystemCount] = useState<number>(0);
  const [filter, setFilter] = useState<CategoryId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  async function load() {
    setMessage(null);
    try {
      const r = await fetch('/api/admin/gallery', { credentials: 'include' });
      if (!r.ok) throw new Error(`Load failed (${r.status})`);
      const d = await r.json();
      setItems(d.items ?? []);
      setFilesystemCount((d.filesystemStems ?? []).length);
    } catch (e: any) {
      setMessage({ kind: 'err', text: e?.message ?? 'Failed to load gallery.' });
    }
  }

  useEffect(() => {
    load();
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: (items ?? []).length, fs: 0, r2: 0 };
    for (const it of items ?? []) {
      if (it.source === 'fs') c.fs++;
      else if (it.source === 'r2') c.r2++;
      c[it.category] = (c[it.category] ?? 0) + 1;
    }
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    let list = items ?? [];
    if (filter !== 'all') list = list.filter((it) => it.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (it) =>
          it.stem.toLowerCase().includes(q) ||
          (it.caption ?? '').toLowerCase().includes(q) ||
          (it.captionHi ?? '').toLowerCase().includes(q),
      );
    }
    return list;
  }, [items, filter, search]);

  async function patch(row: GalleryRow, change: Partial<GalleryRow>) {
    setSaving(true);
    setMessage(null);
    const next: GalleryRow = { ...row, ...change };
    try {
      const r = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          stem: next.stem,
          category: next.category,
          caption: next.caption,
          captionHi: next.captionHi,
          isPublished: next.isPublished,
          orderIndex: next.orderIndex,
          r2Key: next.r2Key ?? null,
        }),
      });
      const data = await r.json().catch(() => ({} as any));
      if (!r.ok) throw new Error(data.error || `Save failed (${r.status})`);
      setItems((p) =>
        (p ?? []).map((x) => (x.stem === next.stem ? { ...next, isNew: false, source: next.r2Key ? 'r2' : x.source } : x)),
      );
      router.refresh();
    } catch (e: any) {
      setMessage({ kind: 'err', text: e?.message ?? 'Save failed.' });
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: GalleryRow) {
    if (!confirm(`Delete gallery row "${row.stem}"?`)) return;
    const snapshot = items;
    setItems((p) => (p ?? []).filter((x) => x.stem !== row.stem));
    try {
      const r = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ stem: row.stem }),
      });
      if (!r.ok) throw new Error(`Delete failed (${r.status})`);
      router.refresh();
    } catch (e: any) {
      setItems(snapshot);
      setMessage({ kind: 'err', text: e?.message ?? 'Delete failed.' });
    }
  }

  async function importFs() {
    if (!confirm(`Seed D1 rows for every filesystem stem that's missing? This will create ~${filesystemCount} rows.`)) return;
    setImporting(true);
    setMessage(null);
    try {
      const r = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'import-fs' }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || `Import failed (${r.status})`);
      setMessage({ kind: 'ok', text: `Imported ${data.inserted} of ${data.scanned} filesystem stems.` });
      await load();
    } catch (e: any) {
      setMessage({ kind: 'err', text: e?.message ?? 'Import failed.' });
    } finally {
      setImporting(false);
    }
  }

  function newR2Row() {
    const key = window.prompt(
      'Paste the R2 key for the uploaded image (e.g. annual_function_1719000000-photo.jpg). It will be set as the row stem.',
    );
    if (!key) return;
    const stem = `r2:${key}`;
    const r2Key = key;
    setItems((p) => [
      ...(p ?? []),
      {
        stem,
        r2Key,
        category: 'life-at-nhs',
        caption: '',
        captionHi: '',
        isPublished: true,
        orderIndex: 0,
        source: 'r2',
      },
    ]);
    // Auto-save the empty row so it appears with a real id.
    patch(
      {
        stem,
        r2Key,
        category: 'life-at-nhs',
        caption: '',
        captionHi: '',
        isPublished: true,
        orderIndex: 0,
      } as GalleryRow,
      {},
    );
  }

  if (items === null) {
    return <p className="text-sm text-slate-500 italic font-display">Loading gallery…</p>;
  }

  return (
    <div className="space-y-6">
      <section className="card-hair">
        <header className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
          <div>
            <h2 className="font-display text-lg text-ink">Gallery</h2>
            <p className="text-xs text-slate-500 mt-1">
              Edit caption, category, order, or visibility for every image. Filesystem images (served
              from <code className="font-mono">/images/&lt;stem&gt;.jpeg</code>) are listed automatically;
              admin-uploaded images live in R2 with <code className="font-mono">r2:&lt;key&gt;</code> stems.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={importFs} disabled={importing} className="btn-secondary text-xs">
              {importing ? 'Importing…' : `Seed filesystem stems (${filesystemCount})`}
            </button>
            <button type="button" onClick={newR2Row} className="btn-secondary text-xs">
              + Add R2 image
            </button>
          </div>
        </header>

        <div className="flex items-center gap-2 flex-wrap mb-3 text-xs">
          <input
            type="search"
            placeholder="Search stems + captions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-rule flex-1 min-w-[200px] max-w-sm py-2 text-sm bg-paper"
          />
          {(['all', ...CATEGORIES.map((c) => c.id)] as const).map((id) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={
                'px-3 py-1.5 border uppercase tracking-institutional ' +
                (filter === id
                  ? 'bg-forest-800 text-sand-100 border-forest-800'
                  : 'border-rule text-ink hover:bg-sand-50')
              }
            >
              {id === 'all' ? 'All' : categoryLabel(id)}{' '}
              <span className="text-[10px] opacity-70 ml-1">
                {id === 'all' ? counts.all : counts[id] ?? 0}
              </span>
            </button>
          ))}
          <span className="ml-auto text-[10px] uppercase tracking-institutional text-slate-500">
            {counts.fs} fs · {counts.r2} r2
          </span>
        </div>

        {message && (
          <div
            role="alert"
            className={
              'mb-3 text-sm px-3 py-2 border ' +
              (message.kind === 'ok'
                ? 'border-forest-800 bg-forest-50 text-forest-800'
                : 'border-amber-300 bg-amber-50 text-amber-800')
            }
          >
            {message.text}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="border border-rule p-8 text-center text-slate-500 italic font-display">
            No images match the current filter.
          </p>
        ) : (
          <div className="border-y border-rule overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink">
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional w-24">Preview</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Caption</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell w-44">Category</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden lg:table-cell w-20">Order</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional w-20">Visible</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Stem</th>
                  <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const previewSrc = row.r2Key ? `/api/files/${row.r2Key}` : `/images/${row.stem}.jpeg`;
                  return (
                    <tr key={row.stem} className="border-b border-rule-soft align-top">
                      <td className="py-2 pr-3 w-24">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewSrc}
                          alt={row.caption || row.stem}
                          width={80}
                          height={80}
                          loading="lazy"
                          className="w-20 h-20 object-cover bg-sand-100 border border-rule"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                          }}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          value={row.caption}
                          onChange={(e) =>
                            setItems((p) => (p ?? []).map((x) => (x.stem === row.stem ? { ...x, caption: e.target.value } : x)))
                          }
                          onBlur={(e) => patch(row, { caption: e.target.value })}
                          className="input-rule text-sm"
                          placeholder="English caption"
                          disabled={saving}
                        />
                        <input
                          value={row.captionHi ?? ''}
                          onChange={(e) =>
                            setItems((p) =>
                              (p ?? []).map((x) => (x.stem === row.stem ? { ...x, captionHi: e.target.value } : x)),
                            )
                          }
                          onBlur={(e) => patch(row, { captionHi: e.target.value })}
                          className="input-rule text-sm mt-1 hindi-body"
                          placeholder="Hindi caption · हिन्दी"
                          disabled={saving}
                        />
                      </td>
                      <td className="py-2 pr-3 hidden md:table-cell">
                        <select
                          value={row.category}
                          onChange={(e) => patch(row, { category: e.target.value })}
                          className="input-rule bg-paper text-sm"
                          disabled={saving}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 pr-3 hidden lg:table-cell">
                        <input
                          type="number"
                          value={row.orderIndex}
                          onChange={(e) =>
                            setItems((p) =>
                              (p ?? []).map((x) =>
                                x.stem === row.stem ? { ...x, orderIndex: Number(e.target.value) || 0 } : x,
                              ),
                            )
                          }
                          onBlur={(e) => patch(row, { orderIndex: Number(e.target.value) || 0 })}
                          className="input-rule font-mono text-sm w-16"
                          disabled={saving}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <label className="inline-flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={row.isPublished}
                            onChange={(e) => patch(row, { isPublished: e.target.checked })}
                            disabled={saving}
                          />
                          {row.isPublished ? 'on' : 'off'}
                        </label>
                      </td>
                      <td className="py-2 pr-3">
                        <span className="font-mono text-[10px] text-slate-600 break-all max-w-[200px] inline-block">
                          {row.stem}
                        </span>
                        {row.source === 'r2' && (
                          <span className="ml-2 pill text-[10px] pill-amber">R2</span>
                        )}
                        {row.isNew && (
                          <span className="ml-2 pill text-[10px]">unsaved</span>
                        )}
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          onClick={() => remove(row)}
                          className="text-xs text-amber-700 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
