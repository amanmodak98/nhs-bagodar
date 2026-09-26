'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Facility } from '@/lib/types';
import { FileUploader } from '@/components/admin/FileUploader';

const EMPTY: Facility = {
  id: '',
  name: '',
  nameHi: '',
  description: '',
  descriptionHi: '',
  imageStem: '',
  imageUrl: '',
  established: String(new Date().getFullYear()),
  orderIndex: 99,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function FacilityManager({ initial }: { initial: Facility[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState<Facility>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<'stem' | 'upload'>('stem');

  const canSubmit = !!draft.id && !!draft.name.trim() && !!draft.description.trim() && !saving;

  async function save() {
    setError(null);
    if (!draft.id.trim() || !draft.name.trim() || !draft.description.trim()) {
      setError('Slug, name and description are required.');
      return;
    }
    setSaving(true);
    try {
      const payload: Facility = {
        id: draft.id.trim(),
        name: draft.name.trim(),
        nameHi: draft.nameHi?.trim() || '',
        description: draft.description.trim(),
        descriptionHi: draft.descriptionHi?.trim() || '',
        imageStem: draft.imageStem?.trim() || '',
        imageUrl: draft.imageUrl?.trim() || '',
        established: draft.established?.trim() || '',
        orderIndex: Number(draft.orderIndex) || 99,
      };
      const r = await fetch('/api/admin/facilities', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({} as any));
      if (!r.ok) throw new Error(data.error || `Save failed (${r.status})`);
      const upserted: Facility = { ...payload, updatedAt: new Date().toISOString() };
      setItems((p) => {
        const idx = p.findIndex((f) => f.id === upserted.id);
        return idx === -1
          ? [...p, upserted]
          : p.map((f, i) => (i === idx ? upserted : f));
      });
      setEditingId(upserted.id);
      router.refresh();
    } catch (e: any) {
      setError(e?.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm(`Delete facility "${id}"?`)) return;
    const snapshot = items;
    setItems((p) => p.filter((f) => f.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setDraft(EMPTY);
    }
    try {
      const r = await fetch('/api/admin/facilities', {
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

  function edit(f: Facility) {
    setDraft({ ...EMPTY, ...f });
    setEditingId(f.id);
    setImageMode(f.imageUrl ? 'upload' : 'stem');
  }

  function newFacility() {
    setDraft({ ...EMPTY, orderIndex: items.length + 1 });
    setEditingId(null);
    setImageMode('stem');
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-4">
        <section className="card-hair">
          <header className="flex items-baseline justify-between gap-3 mb-4">
            <h2 className="font-display text-lg text-ink">
              {editingId ? `Edit · ${editingId}` : 'All facilities'}
            </h2>
            {editingId ? (
              <button type="button" onClick={newFacility} className="text-xs text-amber-700 hover:underline">
                + new
              </button>
            ) : null}
          </header>
          {items.length === 0 ? (
            <p className="border border-rule p-6 text-center text-slate-500 italic font-display text-sm">
              No facilities yet. Publish one from the form on the right.
            </p>
          ) : (
            <ul className="border-y border-rule divide-y divide-rule-soft">
              {items
                .slice()
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((f) => (
                  <li key={f.id} className="py-3 flex items-center gap-3 text-sm">
                    <span className="font-display text-amber-600 w-8 shrink-0">
                      {String(f.orderIndex).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-ink truncate">{f.name}</div>
                      <div className="text-[10px] uppercase tracking-institutional text-slate-500 truncate">
                        {f.id} {f.established ? ` · since ${f.established}` : ''}
                      </div>
                    </div>
                    <button type="button" onClick={() => edit(f)} className="text-xs text-forest-800 hover:underline">
                      Edit
                    </button>
                    <button type="button" onClick={() => remove(f.id)} className="text-xs text-amber-700 hover:underline">
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </aside>

      <section className="lg:col-span-8 card-hair">
        <header className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
          <h2 className="font-display text-lg text-ink">
            {editingId ? 'Edit facility' : 'Add facility'}
          </h2>
          <span className="text-[10px] uppercase tracking-institutional text-slate-500">
            Stored in <code className="font-mono">facilities</code> on D1
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Slug <span className="text-amber-700">*</span>
            </label>
            <input
              value={draft.id}
              onChange={(e) => setDraft({ ...draft, id: slugify(e.target.value) || e.target.value })}
              className="input-rule mt-1 font-mono text-sm"
              placeholder="smart-classroom"
              disabled={!!editingId}
            />
            {editingId ? (
              <p className="text-[10px] text-slate-500 mt-1">Slug cannot be changed after creation.</p>
            ) : (
              <p className="text-[10px] text-slate-500 mt-1">
                URL-safe id, e.g. <code className="font-mono">computer-lab</code>. Auto-generated from name.
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Order</label>
            <input
              type="number"
              min={1}
              max={99}
              value={draft.orderIndex}
              onChange={(e) => setDraft({ ...draft, orderIndex: Number(e.target.value) || 0 })}
              className="input-rule mt-1 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Name (English) <span className="text-amber-700">*</span>
            </label>
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="input-rule mt-1"
              placeholder="Smart Digital Classrooms"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Name (Hindi) · नाम</label>
            <input
              value={draft.nameHi ?? ''}
              onChange={(e) => setDraft({ ...draft, nameHi: e.target.value })}
              className="input-rule mt-1 hindi-body"
              placeholder="स्मार्ट डिजिटल कक्षाएँ"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Description (English) <span className="text-amber-700">*</span>
            </label>
            <textarea
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              rows={4}
              className="input-rule mt-1 w-full"
              placeholder="Each classroom equipped with …"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Description (Hindi) · विवरण
            </label>
            <textarea
              value={draft.descriptionHi ?? ''}
              onChange={(e) => setDraft({ ...draft, descriptionHi: e.target.value })}
              rows={4}
              className="input-rule mt-1 w-full hindi-body"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Operational since</label>
            <input
              value={draft.established ?? ''}
              onChange={(e) => setDraft({ ...draft, established: e.target.value })}
              className="input-rule mt-1 font-mono"
              placeholder="2022"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Photograph</label>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <FileUploader
                folder="facilities"
                accept="image/jpeg,image/png,image/webp"
                label={draft.imageUrl ? 'Replace photo' : 'Upload photo'}
                onUploaded={(info) => setDraft((d) => ({ ...d, imageUrl: info.url, imageStem: '' }))}
              />
              {draft.imageUrl ? (
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, imageUrl: '' }))}
                  className="text-xs text-amber-700 hover:underline"
                >
                  clear
                </button>
              ) : null}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Use either an existing <code className="font-mono">/public/images/</code> stem or upload a new photo to R2.
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Image stem (optional alternative to upload)
            </label>
            <div className="mt-1 flex items-center gap-3">
              <input
                value={draft.imageStem ?? ''}
                onChange={(e) => setDraft({ ...draft, imageStem: e.target.value })}
                className="input-rule flex-1 font-mono text-sm"
                placeholder="annual-function-stage-boy-mic-orange-shirt-01"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              If set, the page serves <code className="font-mono">/images/&lt;stem&gt;.jpeg</code>. Takes precedence over the R2 upload if both are set.
            </p>
          </div>
        </div>

        {error && (
          <div role="alert" className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2">
            {error}
          </div>
        )}
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <button onClick={save} disabled={!canSubmit} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish facility'}
          </button>
          {editingId && (
            <button onClick={newFacility} className="btn-secondary text-xs">+ Add another</button>
          )}
          <span className="text-xs text-slate-500">Slug, name and description cannot be empty.</span>
        </div>
      </section>
    </div>
  );
}
