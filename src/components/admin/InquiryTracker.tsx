'use client';

import { useState } from 'react';
import type { Inquiry, InquiryStatus } from '@/lib/types';

const STATUSES: InquiryStatus[] = ['new', 'contacted', 'enrolled', 'closed'];

export function InquiryTracker({ initial }: { initial: Inquiry[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');

  async function changeStatus(id: number, status: InquiryStatus) {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status } : i)));
    await fetch('/api/admin/inquiries', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  }

  function exportCSV() {
    const rows = [
      ['Date', 'Student', 'Guardian', 'Phone', 'Email', 'Class', 'Message', 'Created'],
      ...items.map((i) => [
        i.createdAt,
        i.studentName,
        i.guardianName,
        i.phone,
        i.email || '',
        i.classApplied,
        (i.message || '').replace(/\n/g, ' '),
        i.status,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const visible = filter === 'all' ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Filter:</span>
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={
                'px-3 py-1 border text-xs uppercase tracking-institutional ' +
                (filter === s ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink hover:bg-sand-50')
              }
            >
              {s} <span className="text-slate-400">({s === 'all' ? items.length : items.filter((i) => i.status === s).length})</span>
            </button>
          ))}
        </div>
        <button onClick={exportCSV} className="btn-secondary text-sm">Export CSV ↓</button>
      </div>

      <div className="border-y border-rule overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink">
              <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Date</th>
              <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Student</th>
              <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Guardian</th>
              <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Phone</th>
              <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional hidden md:table-cell">Class</th>
              <th className="text-left py-2 pr-3 font-display text-xs uppercase tracking-institutional">Status</th>
              <th className="text-right py-2 font-display text-xs uppercase tracking-institutional">Set</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500 font-display italic">
                  No inquiries in this view.
                </td>
              </tr>
            )}
            {visible.map((i) => (
              <tr key={i.id} className="border-b border-rule-soft align-top">
                <td className="py-2 pr-3 font-display text-amber-600 w-28">
                  {new Date(i.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </td>
                <td className="py-2 pr-3 text-ink">{i.studentName}</td>
                <td className="py-2 pr-3 text-slate-700">{i.guardianName}</td>
                <td className="py-2 pr-3 text-slate-700 font-mono text-xs">
                  <a href={`tel:${i.phone}`} className="hover:text-forest-800">{i.phone}</a>
                </td>
                <td className="py-2 pr-3 text-slate-700 hidden md:table-cell">{i.classApplied}</td>
                <td className="py-2 pr-3">
                  <span className={'pill text-[10px] ' + (i.status === 'new' ? 'pill-amber' : i.status === 'enrolled' ? 'pill-forest' : '')}>
                    {i.status}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <select
                    value={i.status}
                    onChange={(e) => changeStatus(i.id, e.target.value as InquiryStatus)}
                    className="text-xs border border-rule px-2 py-1 bg-paper"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}