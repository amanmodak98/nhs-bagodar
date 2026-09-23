// @ts-nocheck — admin dashboard is fully client-side; data shape is dynamic
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SCHOOL } from '@/lib/content';

interface FacultyRow { id: number; name: string; designation: string; imageUrl?: string }
interface InquiryRow { id: number; studentName: string; classApplied: string; status: string; createdAt: string }
interface NoticeRow { id: number; title: string; category: string; publishDate: string; isActive: boolean }

function fmtDate(iso?: string) {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  catch { return iso; }
}

export default function AdminDashboardPage() {
  const [notices, setNotices] = useState<NoticeRow[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [faculty, setFaculty] = useState<FacultyRow[]>([]);
  const [disclosures, setDisclosures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // @ts-nocheck — admin dashboard is fully client-side
  /* eslint-disable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    (async () => {
      try {
        const r1 = await fetch('/api/admin/notices', { credentials: 'include' });
        if (r1.ok) setNotices((await r1.json()).items ?? []);
        const r2 = await fetch('/api/admin/inquiries', { credentials: 'include' });
        if (r2.ok) setInquiries((await r2.json()).items ?? []);
        const r3 = await fetch('/api/admin/faculty', { credentials: 'include' });
        if (r3.ok) setFaculty((await r3.json()).items ?? []);
        const r4 = await fetch('/api/admin/disclosure', { credentials: 'include' });
        if (r4.ok) setDisclosures((await r4.json()).items ?? []);
      } catch (e: any) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const activeNotices = notices.filter((n) => n.isActive);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Admin</div>
        <h1 className="font-display text-3xl text-ink mt-2">Overview</h1>
        <p className="text-slate-600 mt-2 text-sm">
          {SCHOOL.name} · {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
        </p>
      </header>

      {loading && (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      )}
      {err && (
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 rounded-sm mb-6">
          {err}. Check that the Cloudflare Pages Functions are deployed and the D1 binding is configured.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule mb-10">
        <Link href="/admin/notices" className="bg-paper p-6 hover:bg-sand-50">
          <div className="font-display text-3xl text-amber-600 leading-none">{activeNotices.length}</div>
          <div className="mt-2 text-xs uppercase tracking-institutional text-forest-800 font-semibold">
            Active notices
          </div>
        </Link>
        <Link href="/admin/inquiries" className="bg-paper p-6 hover:bg-sand-50">
          <div className="font-display text-3xl text-amber-600 leading-none">{newInquiries.length}</div>
          <div className="mt-2 text-xs uppercase tracking-institutional text-forest-800 font-semibold">
            New inquiries
          </div>
        </Link>
        <Link href="/admin/faculty" className="bg-paper p-6 hover:bg-sand-50">
          <div className="font-display text-3xl text-amber-600 leading-none">{faculty.length}</div>
          <div className="mt-2 text-xs uppercase tracking-institutional text-forest-800 font-semibold">
            Faculty on record
          </div>
        </Link>
        <Link href="/admin/disclosure" className="bg-paper p-6 hover:bg-sand-50">
          <div className="font-display text-3xl text-amber-600 leading-none">{disclosures.length}</div>
          <div className="mt-2 text-xs uppercase tracking-institutional text-forest-800 font-semibold">
            Disclosures on file
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <header className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-lg text-ink">Latest notices</h2>
            <Link href="/admin/notices" className="btn-link text-sm">
              Manage →
            </Link>
          </header>
          <ul className="border-y border-rule divide-y divide-rule-soft">
            {notices.slice(0, 5).map((n) => (
              <li key={n.id} className="py-2.5 flex items-baseline gap-3 text-sm">
                <time className="font-display text-amber-600 w-24 shrink-0">{fmtDate(n.publishDate)}</time>
                <span className="text-ink flex-1 truncate">{n.title}</span>
                <span className="pill text-[10px]">{n.category}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <header className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-lg text-ink">Latest inquiries</h2>
            <Link href="/admin/inquiries" className="btn-link text-sm">
              Manage →
            </Link>
          </header>
          <ul className="border-y border-rule divide-y divide-rule-soft">
            {inquiries.slice(0, 5).map((i) => (
              <li key={i.id} className="py-2.5 flex items-baseline gap-3 text-sm">
                <time className="font-display text-amber-600 w-24 shrink-0">
                  {new Date(i.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </time>
                <span className="text-ink flex-1 truncate">
                  {i.studentName} <span className="text-slate-500">({i.classApplied})</span>
                </span>
                <span className={'pill text-[10px] ' + (i.status === 'new' ? 'pill-amber' : '')}>
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}