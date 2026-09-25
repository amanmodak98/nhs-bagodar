'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Principal } from '@/lib/types';
import { FileUploader } from '@/components/admin/FileUploader';

const EMPTY: Principal = {
  id: 1,
  name: '',
  nameHi: '',
  designation: 'Principal',
  designationHi: 'प्रधानाचार्य',
  qualification: '',
  joinedYear: new Date().getFullYear(),
  photoUrl: '',
  messageEn: '',
  messageHi: '',
  quote2En: '',
  quote2Hi: '',
  quote3En: '',
  quote3Hi: '',
};

export function PrincipalManager({ initial }: { initial: Partial<Principal> | null }) {
  const router = useRouter();
  const seeded = { ...EMPTY, ...(initial ?? {}) };
  const [draft, setDraft] = useState<Principal>(seeded as Principal);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(initial?.updatedAt ?? null);

  const dirty =
    JSON.stringify(draft) !== JSON.stringify(seeded);
  const canSubmit = !!draft.name.trim() && !!draft.designation.trim() && !saving;

  async function save() {
    setError(null);
    if (!draft.name.trim() || !draft.designation.trim()) {
      setError('Name and designation are required.');
      return;
    }
    setSaving(true);
    try {
      const r = await fetch('/api/admin/principal', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: draft.name.trim(),
          nameHi: draft.nameHi?.trim() || null,
          designation: draft.designation.trim(),
          designationHi: draft.designationHi?.trim() || null,
          qualification: draft.qualification?.trim() || null,
          joinedYear: draft.joinedYear || null,
          photoUrl: draft.photoUrl?.trim() || null,
          messageEn: draft.messageEn?.trim() || null,
          messageHi: draft.messageHi?.trim() || null,
          quote2En: draft.quote2En?.trim() || null,
          quote2Hi: draft.quote2Hi?.trim() || null,
          quote3En: draft.quote3En?.trim() || null,
          quote3Hi: draft.quote3Hi?.trim() || null,
        }),
      });
      const data = await r.json().catch(() => ({} as any));
      if (!r.ok) throw new Error(data.error || `Save failed (${r.status})`);
      setSavedAt(new Date().toISOString());
      router.refresh();
    } catch (e: any) {
      setError(e?.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  }

  async function load() {
    setError(null);
    try {
      const r = await fetch('/api/admin/principal', { credentials: 'include' });
      if (!r.ok) throw new Error(`Load failed (${r.status})`);
      const data = await r.json();
      setDraft({ ...EMPTY, ...data });
      setSavedAt(data?.updatedAt ?? null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load.');
    }
  }

  return (
    <div className="space-y-10">
      <section className="card-hair">
        <header className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
          <div>
            <h2 className="font-display text-lg text-ink">Principal details & quotes</h2>
            <p className="text-xs text-slate-500 mt-1">
              Edit once. The home page principal block and the /about page principal section both read from this record.
            </p>
          </div>
          <div className="text-[10px] uppercase tracking-institutional text-amber-600">
            {savedAt
              ? `Last saved ${new Date(savedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`
              : 'Not saved yet'}
            {dirty && <span className="ml-2 text-amber-700">· unsaved changes</span>}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Name (English) <span className="text-amber-700">*</span>
            </label>
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="input-rule mt-1"
              placeholder="e.g. Sri Rajesh Kumar Mahto"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Name (Hindi) · नाम
            </label>
            <input
              value={draft.nameHi ?? ''}
              onChange={(e) => setDraft({ ...draft, nameHi: e.target.value })}
              className="input-rule mt-1 hindi-body"
              placeholder="श्री राजेश कुमार महतो"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Designation (English) <span className="text-amber-700">*</span>
            </label>
            <input
              value={draft.designation}
              onChange={(e) => setDraft({ ...draft, designation: e.target.value })}
              className="input-rule mt-1"
              placeholder="Principal"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
              Designation (Hindi) · पदनाम
            </label>
            <input
              value={draft.designationHi ?? ''}
              onChange={(e) => setDraft({ ...draft, designationHi: e.target.value })}
              className="input-rule mt-1 hindi-body"
              placeholder="प्रधानाचार्य"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Qualification</label>
            <input
              value={draft.qualification ?? ''}
              onChange={(e) => setDraft({ ...draft, qualification: e.target.value })}
              className="input-rule mt-1"
              placeholder="e.g. M.A. (English), B.Ed."
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Joined year</label>
            <input
              type="number"
              min="1990"
              max="2099"
              value={draft.joinedYear ?? ''}
              onChange={(e) => setDraft({ ...draft, joinedYear: Number(e.target.value) || undefined })}
              className="input-rule mt-1 font-mono"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Photograph</label>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <FileUploader
                folder="principal"
                accept="image/jpeg,image/png,image/webp"
                label="Upload photo"
                onUploaded={(info) => setDraft((d) => ({ ...d, photoUrl: info.url }))}
              />
              {draft.photoUrl ? (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-mono truncate max-w-[280px]" title={draft.photoUrl}>{draft.photoUrl}</span>
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, photoUrl: '' }))}
                    className="text-amber-700 hover:underline"
                  >
                    clear
                  </button>
                </div>
              ) : null}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Recommended 600×600 px, JPG/PNG/WEBP. Stored in the <code className="font-mono">nhs-bagodar-files</code> R2 bucket.
            </p>
          </div>
        </div>
      </section>

      <section className="card-hair">
        <h2 className="font-display text-lg text-ink mb-4">Quotes</h2>
        <p className="text-xs text-slate-500 -mt-2 mb-4">
          The primary quote (English + Hindi) appears on the home page and /about. Quotes 2 and 3 can be featured in additional sections
          you choose — keep them ready for end-of-year messages, annual function speeches, or admissions promotions.
        </p>

        <div className="space-y-6">
          <fieldset className="border border-rule p-4">
            <legend className="text-xs uppercase tracking-institutional text-amber-600 font-semibold px-2">
              Primary quote — featured on home and /about
            </legend>
            <label className="block text-[10px] uppercase tracking-institutional text-slate-500 mt-2">English</label>
            <textarea
              value={draft.messageEn ?? ''}
              onChange={(e) => setDraft({ ...draft, messageEn: e.target.value })}
              rows={4}
              className="input-rule mt-1 w-full"
              placeholder="The principal's main quote."
            />
            <label className="block text-[10px] uppercase tracking-institutional text-slate-500 mt-3">Hindi · हिन्दी</label>
            <textarea
              value={draft.messageHi ?? ''}
              onChange={(e) => setDraft({ ...draft, messageHi: e.target.value })}
              rows={4}
              className="input-rule mt-1 w-full hindi-body"
              placeholder="मुख्य उद्धरण — हिन्दी में"
            />
          </fieldset>

          <fieldset className="border border-rule p-4">
            <legend className="text-xs uppercase tracking-institutional text-amber-600 font-semibold px-2">
              Quote 2 — for end-of-year messages, parent letters
            </legend>
            <label className="block text-[10px] uppercase tracking-institutional text-slate-500 mt-2">English</label>
            <textarea
              value={draft.quote2En ?? ''}
              onChange={(e) => setDraft({ ...draft, quote2En: e.target.value })}
              rows={3}
              className="input-rule mt-1 w-full"
            />
            <label className="block text-[10px] uppercase tracking-institutional text-slate-500 mt-3">Hindi · हिन्दी</label>
            <textarea
              value={draft.quote2Hi ?? ''}
              onChange={(e) => setDraft({ ...draft, quote2Hi: e.target.value })}
              rows={3}
              className="input-rule mt-1 w-full hindi-body"
            />
          </fieldset>

          <fieldset className="border border-rule p-4">
            <legend className="text-xs uppercase tracking-institutional text-amber-600 font-semibold px-2">
              Quote 3 — for admissions, annual function
            </legend>
            <label className="block text-[10px] uppercase tracking-institutional text-slate-500 mt-2">English</label>
            <textarea
              value={draft.quote3En ?? ''}
              onChange={(e) => setDraft({ ...draft, quote3En: e.target.value })}
              rows={3}
              className="input-rule mt-1 w-full"
            />
            <label className="block text-[10px] uppercase tracking-institutional text-slate-500 mt-3">Hindi · हिन्दी</label>
            <textarea
              value={draft.quote3Hi ?? ''}
              onChange={(e) => setDraft({ ...draft, quote3Hi: e.target.value })}
              rows={3}
              className="input-rule mt-1 w-full hindi-body"
            />
          </fieldset>
        </div>
      </section>

      <section className="card-hair">
        <header className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
          <h2 className="font-display text-lg text-ink">Public preview</h2>
          <button type="button" onClick={load} className="btn-secondary text-xs">
            Reload from server
          </button>
        </header>
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-4">
            {draft.photoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={draft.photoUrl}
                alt={draft.name || 'Principal'}
                className="w-full aspect-square object-cover border border-rule"
              />
            ) : (
              <div className="w-full aspect-square bg-sand-100 border border-rule flex items-center justify-center text-amber-600 font-display text-3xl">
                {(draft.name || 'P').split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '—'}
              </div>
            )}
          </aside>
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow">From the principal</div>
            <h3 className="font-display text-3xl text-ink mt-3">{draft.name || '—'}</h3>
            {draft.nameHi ? <p className="hindi-sub text-base text-slate-600 mt-1">{draft.nameHi}</p> : null}
            <p className="text-xs uppercase tracking-institutional text-amber-600 mt-2">
              {draft.designation}
              {draft.joinedYear ? ` · since ${draft.joinedYear}` : ''}
            </p>
            {draft.qualification ? (
              <p className="text-sm text-slate-600 mt-3">{draft.qualification}</p>
            ) : null}
            {draft.messageEn ? (
              <blockquote className="mt-5 font-display italic text-xl text-ink border-l-4 border-amber-500 pl-5 py-2 leading-snug">
                "{draft.messageEn}"
              </blockquote>
            ) : null}
            {draft.messageHi ? (
              <p className="hindi-body text-base text-slate-700 italic mt-4 border-l-4 border-forest-700 pl-5 py-2 leading-relaxed">
                "{draft.messageHi}"
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {error && (
        <div role="alert" className="text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 bg-paper -mx-6 px-6 py-3 border-t border-rule flex items-center gap-3">
        <button
          onClick={save}
          disabled={!canSubmit || !dirty}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
        </button>
        <span className="text-xs text-slate-500">
          One principal record, shared by every page.
        </span>
      </div>
    </div>
  );
}
