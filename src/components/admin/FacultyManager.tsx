'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Faculty, FacultyDesignation } from '@/lib/types';
import { FileUploader } from '@/components/admin/FileUploader';

const DESIGNATIONS: FacultyDesignation[] = ['Principal', 'Vice Principal', 'Senior Teacher', 'PRT', 'TGT', 'PGT', 'Computer Instructor', 'Hostel Warden', 'Administrative Officer'];

export function FacultyManager({ initial }: { initial: Faculty[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState({
    name: '', designation: 'TGT' as FacultyDesignation, qualification: '',
    subject: '', joinedYear: new Date().getFullYear(), orderIndex: 99, imageUrl: '',
  });

  async function add() {
    const res = await fetch('/api/admin/faculty', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...draft,
        imageUrl: draft.imageUrl || undefined,
      }),
    });
    const data = await res.json();
    setItems((p) => [...p, { ...draft, id: data.id }]);
    setDraft({ ...draft, name: '', qualification: '', subject: '', imageUrl: '' });
    router.refresh();
  }

  async function remove(id: number) {
    if (!confirm('Remove this faculty entry?')) return;
    setItems((p) => p.filter((x) => x.id !== id));
    await fetch('/api/admin/faculty', {
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
        <h2 className="font-display text-lg text-ink mb-4">Add faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Name</label>
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="input-rule mt-1" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Designation</label>
            <select value={draft.designation} onChange={(e) => setDraft({ ...draft, designation: e.target.value as FacultyDesignation })} className="input-rule mt-1 bg-paper">
              {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Qualification</label>
            <input value={draft.qualification} onChange={(e) => setDraft({ ...draft, qualification: e.target.value })} className="input-rule mt-1" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Subject</label>
            <input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} className="input-rule mt-1" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Joined</label>
            <input type="number" min="2010" max="2030" value={draft.joinedYear} onChange={(e) => setDraft({ ...draft, joinedYear: Number(e.target.value) })} className="input-rule mt-1 font-mono" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Display order</label>
            <input type="number" min="1" max="999" value={draft.orderIndex} onChange={(e) => setDraft({ ...draft, orderIndex: Number(e.target.value) })} className="input-rule mt-1 font-mono" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Photograph</label>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <FileUploader
                folder="faculty"
                accept="image/jpeg,image/png,image/webp"
                label="Upload photo"
                onUploaded={(info) => setDraft((d) => ({ ...d, imageUrl: info.url }))}
              />
              {draft.imageUrl && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-mono truncate max-w-[280px]" title={draft.imageUrl}>{draft.imageUrl}</span>
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, imageUrl: '' }))}
                    className="text-amber-700 hover:underline"
                  >
                    clear
                  </button>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Recommended 800×800 px, JPG/PNG/WEBP. Image is shown on the public /faculty page.
            </p>
          </div>
        </div>
        <button onClick={add} disabled={!draft.name || !draft.qualification} className="btn-primary mt-4">Add faculty</button>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink mb-4">All faculty ({items.length})</h2>
        <div className="border-y border-rule overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional w-10">#</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Name</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Designation</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Subject</th>
                <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden lg:table-cell">Photo</th>
                <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.sort((a, b) => a.orderIndex - b.orderIndex).map((f, i) => (
                <tr key={f.id} className="border-b border-rule-soft">
                  <td className="py-2 pr-3 text-amber-600 font-display">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-2 pr-3 text-ink">
                    <div>{f.name}</div>
                    <div className="text-xs text-slate-500">{f.qualification}</div>
                  </td>
                  <td className="py-2 pr-3 text-slate-600 hidden md:table-cell">{f.designation}</td>
                  <td className="py-2 pr-3 text-slate-600 hidden md:table-cell">{f.subject}</td>
                  <td className="py-2 pr-3 text-slate-600 hidden lg:table-cell">
                    {f.imageUrl ? (
                      <span className="pill text-[10px] pill-forest">uploaded</span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2 text-right">
                    <button onClick={() => remove(f.id)} className="text-amber-700 hover:underline text-xs">Remove</button>
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