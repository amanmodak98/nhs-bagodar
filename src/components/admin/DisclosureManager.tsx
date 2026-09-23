'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Disclosure, DisclosureCategory } from '@/lib/types';
import { FileUploader } from '@/components/admin/FileUploader';

const CATEGORIES: { id: DisclosureCategory; label: string }[] = [
  { id: 'society-registration', label: 'Society Registration' },
  { id: 'noc', label: 'No Objection Certificate (NOC)' },
  { id: 'fire-safety', label: 'Fire Safety Certificate' },
  { id: 'building-safety', label: 'Building Safety Certificate' },
  { id: 'water-sanitation', label: 'Water & Sanitation' },
  { id: 'fee-structure', label: 'Fee Structure' },
  { id: 'academic-calendar', label: 'Academic Calendar' },
  { id: 'student-teacher-ratio', label: 'Student–Teacher Ratio' },
  { id: 'affiliation-letter', label: 'Affiliation Letter' },
  { id: 'annual-report', label: 'Annual Report' },
];

export function DisclosureManager({ initial }: { initial: Disclosure[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState({
    documentTitle: '',
    category: 'affiliation-letter' as DisclosureCategory,
    description: '',
    fileUrl: '',
    updatedAt: new Date().toISOString().slice(0, 10),
  });

  async function add() {
    const res = await fetch('/api/admin/disclosure', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(draft),
    });
    const data = await res.json();
    setItems((p) => [{ ...draft, id: data.id }, ...p]);
    setDraft({ ...draft, documentTitle: '', description: '', fileUrl: '' });
    router.refresh();
  }

  async function remove(id: number) {
    if (!confirm('Delete this disclosure? The PDF URL will no longer be reachable from the public page.')) return;
    setItems((p) => p.filter((x) => x.id !== id));
    await fetch('/api/admin/disclosure', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <section className="card-hair">
        <h2 className="font-display text-lg text-ink mb-4">Upload disclosure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Document title</label>
            <input value={draft.documentTitle} onChange={(e) => setDraft({ ...draft, documentTitle: e.target.value })} className="input-rule mt-1" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Category</label>
            <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as DisclosureCategory })} className="input-rule mt-1 bg-paper">
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Last updated</label>
            <input type="date" value={draft.updatedAt} onChange={(e) => setDraft({ ...draft, updatedAt: e.target.value })} className="input-rule mt-1" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Description</label>
            <textarea rows={2} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="input-rule mt-1 resize-y" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Upload PDF</label>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <FileUploader
                folder="disclosures"
                accept=".pdf,.doc,.docx"
                label="Upload to R2"
                onUploaded={(info) => setDraft((d) => ({ ...d, fileUrl: info.url }))}
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
            <p className="text-[10px] text-slate-500 mt-1">Or paste an external URL below if the file lives outside R2.</p>
            <input value={draft.fileUrl} onChange={(e) => setDraft({ ...draft, fileUrl: e.target.value })} className="input-rule mt-2 font-mono text-sm" placeholder="https://files.nhsbagodar.in/disclosures/society-registration.pdf" />
          </div>
        </div>
        <button onClick={add} disabled={!draft.documentTitle || !draft.fileUrl} className="btn-primary mt-4">
          Publish disclosure
        </button>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-4">All disclosures ({items.length})</h2>
        <div className="border-y border-rule overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Updated</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Title</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Category</th>
                <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id} className="border-b border-rule-soft">
                  <td className="py-2 pr-3 font-display text-amber-600 w-28">
                    {new Date(d.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-2 pr-3 text-ink">{d.documentTitle}</td>
                  <td className="py-2 pr-3 text-slate-600 hidden md:table-cell">
                    <span className="pill text-[10px]">{d.category}</span>
                  </td>
                  <td className="py-2 text-right">
                    <a href={d.fileUrl} target="_blank" rel="noopener" className="btn-link text-xs mr-4">
                      Open PDF
                    </a>
                    <button onClick={() => remove(d.id)} className="text-amber-700 hover:underline text-xs">Delete</button>
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