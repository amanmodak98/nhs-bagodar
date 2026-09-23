'use client';

import { useEffect, useState } from 'react';
import { NoticeManager } from '@/components/admin/NoticeManager';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/notices', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setNotices(data?.items ?? []))
      .catch(() => setNotices([]));
  }, []);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Notices & circulars</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Publish, archive, or delete notices. Attachments are uploaded to Cloudflare R2 in production.
        </p>
      </header>
      {notices === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <NoticeManager initialNotices={notices} />
      )}
    </div>
  );
}