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

function fmtDate(iso?: string) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return iso; }
}

export function DownloadManager({ initial }: { initial: Download[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
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

  async function create() {
    if (!draft.title || !draft.fileUrl) {
      setError('Title and file are required');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const r = await fetch('/api/admin/downloads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(draft),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data.error || 'Failed');
      }
      const data = await r.json();
      setItems((p) => [{ ...draft, id: data.id, updatedAt: new Date().toISOString().slice(0, 10) }, ...p]);
      setDraft({ title: '', titleHi: '', category: 'general', description: '', fileUrl: '', r2Key: '', fileSize: 0 });
      router.refresh();
    } catch (e: any) {
      setError(e.message || 'Failed');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm('Delete this download?')) return;
    setItems((p) => p.filter((x) => x.id !== id));
    await fetch('/api/admin/downloads', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <section className="card-hair">
        <h2 className="font-display text-lg text-ink mb-4">Publish a download</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Title (English)</label>
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
              placeholder="Short note"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">File</label>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <FileUploader
                folder={draft.category}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                label="Upload to R2"
                onUploaded={(info) =>
                  setDraft((d) => ({ ...d, fileUrl: info.url, r2Key: info.key, fileSize: info.size }))
                }
              />
              {draft.fileUrl && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-forest-800" aria-hidden>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-mono truncate max-w-[280px]" title={draft.fileUrl}>{draft.fileUrl}</span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Or paste an external URL below if the file lives outside R2.
            </p>
            <input
              value={draft.fileUrl}
              onChange={(e) => setDraft({ ...draft, fileUrl: e.target.value })}
              className="input-rule mt-2 font-mono text-sm"
              placeholder="/api/files/...  or  https://..."
            />
          </div>
        </div>
        {error && <div className="text-sm text-amber-700 mt-3">{error}</div>}
        <div className="mt-4 flex items-center gap-3">
          <button onClick={create} disabled={saving} className="btn-primary">
            {saving ? 'Publishing…' : 'Publish download'}
          </button>
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
                  <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((d) => (
                  <tr key={d.id} className="border-b border-rule-soft">
                    <td className="py-2 pr-3 font-display text-amber-600 w-28">{fmtDate(d.updatedAt)}</td>
                    <td className="py-2 pr-3 text-ink">
                      <div>{d.title}</div>
                      {d.titleHi && <div className="hindi-body text-xs text-slate-500 italic">{d.titleHi}</div>}
                    </td>
                    <td className="py-2 pr-3 text-slate-600 hidden md:table-cell">
                      <span className="pill text-[10px]">{CATEGORIES.find((c) => c.id === d.category)?.label || d.category}</span>
                    </td>
                    <td className="py-2 text-right">
                      <a href={d.fileUrl} target="_blank" rel="noopener" className="btn-link text-xs mr-3">Open</a>
                      <button onClick={() => remove(d.id)} className="text-amber-700 hover:underline text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}