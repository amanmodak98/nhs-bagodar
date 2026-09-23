import { listAllNotices } from '@/lib/db';

export const metadata = {
  title: 'Notices & circulars',
  description:
    'Notices and circulars from National High School, Bagodar — admissions, holidays, examinations, events, transport updates.',
};

const CATEGORY_LABEL: Record<string, string> = {
  admissions: 'Admissions',
  academic: 'Academic',
  holiday: 'Holiday',
  event: 'Event',
  circular: 'Circular',
  exam: 'Examination',
  general: 'General',
};

const CATEGORY_ORDER: Record<string, number> = {
  admissions: 1,
  exam: 2,
  circular: 3,
  event: 4,
  holiday: 5,
  academic: 6,
  general: 7,
};

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function NoticesPage() {
  const notices = await listAllNotices();
  const grouped = new Map<string, typeof notices>();
  for (const n of notices) {
    if (!grouped.has(n.category)) grouped.set(n.category, []);
    grouped.get(n.category)!.push(n);
  }
  const categories = [...grouped.keys()].sort((a, b) => (CATEGORY_ORDER[a] || 9) - (CATEGORY_ORDER[b] || 9));

  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Notice board</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                All notices & circulars.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                Every notice is dated and categorised. Inactive notices are archived, not deleted, so the record of what was published remains intact.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">Total active</div>
                <div className="font-display text-3xl text-ink">
                  {notices.filter((n) => n.isActive).length}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Last notice published {fmtDate(notices[0]?.publishDate || new Date().toISOString())}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 space-y-12">
          {categories.map((cat) => {
            const items = grouped.get(cat)!.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
            return (
              <div key={cat}>
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="font-display text-2xl text-ink">{CATEGORY_LABEL[cat] || cat}</h2>
                  <span className="text-xs uppercase tracking-institutional text-slate-500">
                    {items.length} item{items.length === 1 ? '' : 's'}
                  </span>
                </div>
                <ul className="divide-y divide-rule-soft border-y border-rule-soft">
                  {items.map((n) => (
                    <li key={n.id} id={`n-${n.id}`} className="py-5 flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                      <time className="font-display text-base text-amber-600 w-32 shrink-0">
                        {fmtDate(n.publishDate)}
                      </time>
                      <div className="flex-1">
                        <h3 className="font-display text-lg text-ink">{n.title}</h3>
                        <p className="text-sm text-slate-700 mt-2 leading-relaxed">{n.body}</p>
                        {n.fileUrl && (
                          <a href={n.fileUrl} className="btn-link mt-3">
                            Download attachment (PDF) →
                          </a>
                        )}
                        <span className={'pill ml-3 text-[10px] ' + (n.isActive ? 'pill-forest' : '')}>
                          {n.isActive ? 'Active' : 'Archived'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}