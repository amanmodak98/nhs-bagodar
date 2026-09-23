'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Notice, NoticeCategory } from '@/lib/types';

const CATEGORIES: NoticeCategory[] = ['admissions', 'academic', 'holiday', 'event', 'circular', 'exam', 'general'];

export function NoticeManager({ initialNotices }: { initialNotices: Notice[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialNotices);
  const [draft, setDraft] = useState({
    title: '',
    category: 'general' as NoticeCategory,
    body: '',
    fileUrl: '',
    isActive: true,
    publishDate: new Date().toISOString().slice(0, 10),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setItems((prev) => [{ ...draft, id: data.id, createdAt: new Date().toISOString() }, ...prev]);
      setDraft({ ...draft, title: '', body: '', fileUrl: '' });
      router.refresh();
    } catch (err) {
      setError('Could not create notice.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(n: Notice) {
    const updated = { ...n, isActive: !n.isActive };
    setItems((prev) => prev.map((x) => (x.id === n.id ? updated : x)));
    await fetch('/api/admin/notices', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updated),
    });
  }

  async function remove(id: number) {
    if (!confirm('Delete this notice? This cannot be undone.')) return;
    setItems((prev) => prev.filter((x) => x.id !== id));
    await fetch('/api/admin/notices', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <div className="space-y-10">
      {/* New notice form */}
      <section className="card-hair">
        <h2 className="font-display text-lg text-ink mb-4">New notice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Title</label>
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="input-rule mt-1"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Category</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value as NoticeCategory })}
              className="input-rule mt-1 bg-paper"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Publish date</label>
            <input
              type="date"
              value={draft.publishDate}
              onChange={(e) => setDraft({ ...draft, publishDate: e.target.value })}
              className="input-rule mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Body</label>
            <textarea
              rows={4}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              className="input-rule mt-1 resize-y leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Attachment URL <span className="text-slate-400 normal-case tracking-normal">(PDF in R2, optional)</span>
            </label>
            <input
              value={draft.fileUrl}
              onChange={(e) => setDraft({ ...draft, fileUrl: e.target.value })}
              className="input-rule mt-1 font-mono text-sm"
              placeholder="/files/circular.pdf or https://..."
            />
            <p className="text-xs text-slate-500 mt-1">
              Upload PDF to Cloudflare R2 bucket (production) — file URL goes here. In development you can paste any path.
            </p>
          </div>
          <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={draft.isActive}
              onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            Publish as active notice
          </label>
        </div>
        {error && <div className="text-sm text-amber-700 mt-3">{error}</div>}
        <div className="mt-4">
          <button onClick={create} disabled={saving || !draft.title || !draft.body} className="btn-primary">
            {saving ? 'Publishing…' : 'Publish notice'}
          </button>
        </div>
      </section>

      {/* Existing notices */}
      <section>
        <h2 className="font-display text-lg text-ink mb-4">All notices ({items.length})</h2>
        <div className="border-y border-rule">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Date</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Title</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Category</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Status</th>
                <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.id} className="border-b border-rule-soft">
                  <td className="py-2 pr-3 font-display text-amber-600 w-28">
                    {new Date(n.publishDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="py-2 pr-3 text-ink">{n.title}</td>
                  <td className="py-2 pr-3 text-slate-600 hidden md:table-cell">
                    <span className="pill text-[10px]">{n.category}</span>
                  </td>
                  <td className="py-2 pr-3">
                    <span className={'pill text-[10px] ' + (n.isActive ? 'pill-forest' : '')}>
                      {n.isActive ? 'Active' : 'Archived'}
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    <button onClick={() => toggleActive(n)} className="btn-link text-xs mr-4">
                      {n.isActive ? 'Archive' : 'Publish'}
                    </button>
                    <button onClick={() => remove(n.id)} className="text-amber-700 hover:underline text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}