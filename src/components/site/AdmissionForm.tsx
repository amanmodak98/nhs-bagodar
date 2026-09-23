'use client';

import { useState } from 'react';

const CLASS_OPTIONS = [
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function AdmissionForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    studentName: '',
    guardianName: '',
    phone: '',
    email: '',
    classApplied: 'Class 1',
    message: '',
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate phone — Indian number
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Please enter a valid phone number with at least 10 digits.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: digits.startsWith('91') ? digits : `91${digits}`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('Could not submit right now. Please call the office.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-rule p-8 bg-sand-100">
        <div className="eyebrow text-amber-600">Submitted</div>
        <h3 className="font-display text-2xl text-ink mt-2">Thank you, {form.guardianName || 'parent'}.</h3>
        <p className="text-slate-700 mt-3 max-w-reading">
          The admissions office will call you back within two working days. If you need to reach us sooner, call between 09:00 and 15:00 on weekdays.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="studentName" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
          Student name
        </label>
        <input
          id="studentName"
          required
          value={form.studentName}
          onChange={(e) => set('studentName', e.target.value)}
          className="input-rule mt-2"
          placeholder="Full name"
        />
      </div>

      <div>
        <label htmlFor="guardianName" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
          Guardian name
        </label>
        <input
          id="guardianName"
          required
          value={form.guardianName}
          onChange={(e) => set('guardianName', e.target.value)}
          className="input-rule mt-2"
          placeholder="Parent or guardian"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
            Phone
          </label>
          <div className="flex items-end mt-2 border-b border-rule focus-within:border-forest-800">
            <span className="text-ink py-3 pr-2 select-none font-mono text-sm">+91</span>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none py-3 text-ink placeholder:text-slate-400"
              placeholder="98765 43210"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
            Email <span className="text-slate-400 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className="input-rule mt-2"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="classApplied" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
          Class applied for
        </label>
        <select
          id="classApplied"
          value={form.classApplied}
          onChange={(e) => set('classApplied', e.target.value)}
          className="input-rule mt-2 bg-paper"
        >
          {CLASS_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">
          Message <span className="text-slate-400 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className="input-rule mt-2 leading-relaxed resize-none"
          placeholder="Tell us anything we should know."
        />
      </div>

      {error && (
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
        </button>
        <span className="text-xs text-slate-500">
          Submissions are reviewed by the office. We never sell or share your number.
        </span>
      </div>
    </form>
  );
}