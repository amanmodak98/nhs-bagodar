'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileUploader } from '@/components/admin/FileUploader';

interface Download {
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

const CATEGORIES = [
  { id: 'admissions', label: 'Admissions' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'book-list', label: 'Book List' },
  { id: 'academic', label: 'Academic Calendar' },
  { id: 'transport', label: 'Transport' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'general', label: 'General' },
];

type SourceMode = 'upload' | 'url';

function fmtDate(iso?: string) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return iso; }
}

function fmtSize(bytes?: number | null) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function DownloadManager({ initial }: { initial: Download[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState<SourceMode>('upload');
  const [draft, setDraft] = useState({
    title: '',
    titleHi: '',
    category: 'general',
    description: '',
    fileUrl: '',
    r2Key: '',
    fileSize: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = !!draft.title.trim() && !!draft.fileUrl.trim() && !saving;

  async function create() {
    setError(null);
    if (!draft.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!draft.fileUrl.trim()) {
      setError(mode === 'upload' ? 'Upload a file first, then publish.' : 'File URL is required.');
      return;
    }
    setSaving(true);
    try {
      const r = await fetch('/api/admin/downloads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: draft.title.trim(),
          titleHi: draft.titleHi.trim() || null,
          category: draft.category,
          description: draft.description.trim() || null,
          fileUrl: draft.fileUrl.trim(),
          r2Key: draft.r2Key || null,
          fileSize: draft.fileSize || null,
          updatedAt: new Date().toISOString().slice(0, 10),
        }),
      });
      const data = await r.json().catch(() => ({} as any));
      if (!r.ok) {
        throw new Error(data.error || `Failed (${r.status})`);
      }
      const created: Download = {
        id: data.id,
        title: draft.title.trim(),
        titleHi: draft.titleHi.trim() || null,
        category: draft.category,
        description: draft.description.trim() || null,
        fileUrl: draft.fileUrl.trim(),
        r2Key: draft.r2Key || null,
        fileSize: draft.fileSize || null,
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      setItems((p) => [created, ...p]);
      setDraft({ title: '', titleHi: '', category: 'general', description: '', fileUrl: '', r2Key: '', fileSize: 0 });
      setMode('upload');
      router.refresh();
    } catch (e: any) {
      setError(e?.message || 'Failed to publish.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm('Delete this download?')) return;
    const snapshot = items;
    setItems((p) => p.filter((x) => x.id !== id));
    try {
      const r = await fetch('/api/admin/downloads', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });
      if (!r.ok) throw new Error(`Delete failed (${r.status})`);
      router.refresh();
    } catch (e: any) {
      setItems(snapshot);
      setError(e?.message || 'Failed to delete.');
    }
  }

  return (
    <div className="space-y-10">
      <section className="card-hair">
        <header className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="font-display text-lg text-ink">Publish a download</h2>
          <span className="text-[10px] uppercase tracking-institutional text-amber-600 font-semibold">
            File source
          </span>
        </header>

        {/* Source-mode toggle */}
        <div className="flex items-center gap-1 border border-rule w-fit mb-5">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={
              'px-4 py-2 text-[11px] font-semibold tracking-wide uppercase border ' +
              (mode === 'upload'
                ? 'bg-forest-800 text-sand-100 border-forest-800'
                : 'border-transparent text-ink hover:bg-sand-50')
            }
          >
            Upload to R2
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('url');
              setDraft((d) => ({ ...d, fileUrl: '', r2Key: '', fileSize: 0 }));
            }}
            className={
              'px-4 py-2 text-[11px] font-semibold tracking-wide uppercase border ' +
              (mode === 'url'
                ? 'bg-forest-800 text-sand-100 border-forest-800'
                : 'border-transparent text-ink hover:bg-sand-50')
            }
          >
            External URL
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Title (English) <span className="text-amber-700">*</span>
            </label>
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="input-rule mt-1"
              placeholder="e.g. Admission Form 2026–27"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Title (Hindi) · शीर्षक</label>
            <input
              value={draft.titleHi}
              onChange={(e) => setDraft({ ...draft, titleHi: e.target.value })}
              className="input-rule mt-1"
              placeholder="प्रवेश फॉर्म 2026–27"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Category</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="input-rule mt-1 bg-paper"
            >
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Description</label>
            <input
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="input-rule mt-1"
              placeholder="Short note shown on /downloads"
            />
          </div>

          {/* File source — depends on mode */}
          <div className="md:col-span-2">
            {mode === 'upload' ? (
              <>
                <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
                  File · Upload to Cloudflare R2 <span className="text-amber-700">*</span>
                </label>
                <div className="mt-1 flex items-center gap-3 flex-wrap">
                  <FileUploader
                    folder={draft.category}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                    label={draft.fileUrl ? 'Replace file' : 'Choose file'}
                    onUploaded={(info) =>
                      setDraft((d) => ({ ...d, fileUrl: info.url, r2Key: info.key, fileSize: info.size }))
                    }
                  />
                  {draft.fileUrl && (
                    <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-forest-800">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Uploaded to R2
                      </span>
                      <span className="font-mono truncate max-w-[300px]" title={draft.fileUrl}>{draft.fileUrl}</span>
                      {draft.fileSize ? <span className="pill text-[10px]">{fmtSize(draft.fileSize)}</span> : null}
                      <button
                        type="button"
                        onClick={() => setDraft((d) => ({ ...d, fileUrl: '', r2Key: '', fileSize: 0 }))}
                        className="text-amber-700 hover:underline"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Stored in the <code className="font-mono">nhs-bagodar-files</code> R2 bucket, served via{' '}
                  <code className="font-mono">/api/files/&lt;key&gt;</code>. Max 10 MB per upload.
                </p>
              </>
            ) : (
              <>
                <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
                  External URL <span className="text-amber-700">*</span>
                </label>
                <input
                  value={draft.fileUrl}
                  onChange={(e) => setDraft({ ...draft, fileUrl: e.target.value })}
                  className="input-rule mt-1 font-mono text-sm"
                  placeholder="https://example.com/file.pdf"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Use this only if the file already lives on a CDN or another host.
                </p>
              </>
            )}
          </div>
        </div>

        {error && (
          <div role="alert" className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2">
            {error}
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button onClick={create} disabled={!canSubmit} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Publishing…' : 'Publish download'}
          </button>
          {mode === 'upload' && !draft.fileUrl && (
            <span className="text-xs text-slate-500 italic">Pick a file to enable publishing.</span>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-4">All downloads ({items.length})</h2>
        {items.length === 0 ? (
          <p className="border border-rule p-8 text-center text-slate-500 italic font-display">
            No downloads yet. Use the form above to publish the first one.
          </p>
        ) : (
          <div className="border-y border-rule overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink">
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Updated</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Title</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Category</th>
                  <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden lg:table-cell">Source</th>
                  <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => {
                  const isR2 = !!d.r2Key || (d.fileUrl || '').startsWith('/api/files/');
                  return (
                    <tr key={d.id} className="border-b border-rule-soft">
                      <td className="py-2 pr-3 font-display text-amber-600 w-28">{fmtDate(d.updatedAt)}</td>
                      <td className="py-2 pr-3 text-ink">
                        <div>{d.title}</div>
                        {d.titleHi && <div className="hindi-body text-xs text-slate-500 italic">{d.titleHi}</div>}
                      </td>
                      <td className="py-2 pr-3 text-slate-600 hidden md:table-cell">
                        <span className="pill text-[10px]">{CATEGORIES.find((c) => c.id === d.category)?.label || d.category}</span>
                      </td>
                      <td className="py-2 pr-3 text-slate-500 hidden lg:table-cell">
                        <span className={'pill text-[10px] ' + (isR2 ? 'pill-forest' : '')}>
                          {isR2 ? 'R2' : 'URL'}{d.fileSize ? ` · ${fmtSize(d.fileSize)}` : ''}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <a href={d.fileUrl} target="_blank" rel="noopener" className="btn-link text-xs mr-3">Open</a>
                        <button onClick={() => remove(d.id)} className="text-amber-700 hover:underline text-xs">Delete</button>
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
