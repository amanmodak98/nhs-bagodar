'use client';

import { useEffect, useState } from 'react';
import { InquiryTracker } from '@/components/admin/InquiryTracker';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/inquiries', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setInquiries(data?.items ?? []))
      .catch(() => setInquiries([]));
  }, []);

  return (
    <div className="max-w-edition">
      <header className="mb-8">
        <div className="eyebrow">Manage</div>
        <h1 className="font-display text-3xl text-ink mt-2">Admission inquiries</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Submissions from the public admissions form. Update status as the office contacts each family.
        </p>
      </header>
      {inquiries === null ? (
        <p className="text-sm text-slate-500 italic font-display">Loading…</p>
      ) : (
        <InquiryTracker initial={inquiries} />
      )}
    </div>
  );
}