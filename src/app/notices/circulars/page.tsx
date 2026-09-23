import { listAllNotices } from '@/lib/db';

export const metadata = {
  title: 'Circulars',
  description:
    'Circulars and official communications from National High School, Bagodar — fees, transport, examinations, calendar.',
};

const CIRCULAR_CATEGORIES = ['circular', 'academic', 'general'];

export default async function CircularsPage() {
  const all = await listAllNotices();
  const circulars = all.filter((n) => CIRCULAR_CATEGORIES.includes(n.category));

  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Circulars · परिपत्र</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Circulars & communications.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                परिपत्र एवं संचार
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">Total circulars</div>
                <p className="font-display text-3xl text-ink">{circulars.length}</p>
                <p className="text-xs text-slate-500 mt-2">All issued and archived in date order.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <ul className="divide-y divide-rule-soft border-y border-rule-soft">
            {circulars.length === 0 && (
              <li className="py-10 text-center text-slate-500 font-display italic">No circulars in this view.</li>
            )}
            {circulars.map((n) => (
              <li key={n.id} className="py-5 grid grid-cols-12 gap-4">
                <time className="col-span-4 md:col-span-2 font-display text-amber-600">
                  {new Date(n.publishDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </time>
                <div className="col-span-8 md:col-span-10">
                  <h3 className="font-display text-lg text-ink">{n.title}</h3>
                  <p className="text-sm text-slate-700 mt-1">{n.body}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="pill text-[10px]">{n.category}</span>
                    {n.fileUrl && (
                      <a href={n.fileUrl} className="btn-link text-xs">
                        Download attachment →
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}