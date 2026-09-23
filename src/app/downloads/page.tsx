import { DownloadsClient } from '@/components/site/DownloadsClient';

export const metadata = {
  title: 'Downloads — Notices, syllabus & book list',
  description:
    'Downloadable documents from National High School, Bagodar — admission forms, fee structure, syllabus, academic calendar, book list, transport forms, hostel application.',
};

const CATEGORIES = [
  { id: 'admissions', label: 'Admissions', labelHi: 'प्रवेश' },
  { id: 'syllabus', label: 'Syllabus', labelHi: 'पाठ्यक्रम' },
  { id: 'book-list', label: 'Book List', labelHi: 'पुस्तक सूची' },
  { id: 'academic', label: 'Academic Calendar', labelHi: 'शैक्षणिक कैलेंडर' },
  { id: 'transport', label: 'Transport', labelHi: 'बस सेवा' },
  { id: 'hostel', label: 'Hostel', labelHi: 'छात्रावास' },
  { id: 'scholarships', label: 'Scholarships', labelHi: 'छात्रवृत्ति' },
  { id: 'general', label: 'General', labelHi: 'सामान्य' },
];

export default function DownloadsPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Downloads · डाउनलोड</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Notices, syllabus, book list.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                सूचनाएँ, पाठ्यक्रम, पुस्तक सूची — सब एक जगह
              </p>
              <p className="mt-4 text-slate-700 max-w-reading">
                Every form, syllabus, calendar and book list the office publishes. Files are uploaded by the admin team and stored in Cloudflare R2. Download any item directly — no login required.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">How to use</div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Filter by category. Click any item to download. If a document is missing, ask the office to publish it — the admin team adds new files via the admin panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <DownloadsClient categories={CATEGORIES} />
        </div>
      </section>
    </>
  );
}