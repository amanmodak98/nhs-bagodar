import { CALENDAR, SCHOOL } from '@/lib/content';
import { Reveal } from '@/components/site/Reveal';

export const metadata = {
  title: 'Academic Calendar 2026–27',
  description:
    'Academic calendar for National High School, Bagodar — term dates, examination windows, holidays, and result day.',
};

function fmtDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return s;
  }
}

export default function CalendarPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Academic calendar · शैक्षणिक कैलेंडर</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                2026–27.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                सत्र 2026–27 के लिए महत्वपूर्ण तिथियाँ
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">Published</div>
                <p className="text-sm text-slate-700">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                <p className="text-xs text-slate-500 mt-2">
                  Subject to revision. Parents receive an SMS one week before every change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-rule border border-rule">
              <div className="bg-paper p-6 md:col-span-6">
                <h2 className="font-display text-lg text-ink">Term I</h2>
                <p className="hindi-sub text-xs text-slate-500 mt-0.5">प्रथम सत्र</p>
                <p className="font-display text-3xl text-amber-600 mt-3">
                  01 Apr → 30 Sep
                </p>
                <p className="text-sm text-slate-700 mt-2">
                  Two-month summer break follows.
                </p>
              </div>
              <div className="bg-paper p-6 md:col-span-6">
                <h2 className="font-display text-lg text-ink">Term II</h2>
                <p className="hindi-sub text-xs text-slate-500 mt-0.5">द्वितीय सत्र</p>
                <p className="font-display text-3xl text-amber-600 mt-3">
                  15 Nov → 31 Mar
                </p>
                <p className="text-sm text-slate-700 mt-2">
                  Annual exams in February; results on 20 March 2027.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
              <div className="bg-paper p-6">
                <h3 className="eyebrow mb-2">Half-yearly examination</h3>
                <p className="hindi-sub text-xs text-slate-500 mb-2">अर्ध-वार्षिक परीक्षा</p>
                <p className="font-display text-2xl text-ink">{fmtDate(CALENDAR.halfYearly.start)} – {fmtDate(CALENDAR.halfYearly.end)}</p>
                <p className="text-sm text-slate-600 mt-2">Classes 9 and 10</p>
              </div>
              <div className="bg-paper p-6">
                <h3 className="eyebrow mb-2">Diwali break</h3>
                <p className="hindi-sub text-xs text-slate-500 mb-2">दीपावली अवकाश</p>
                <p className="font-display text-2xl text-ink">{fmtDate(CALENDAR.diwaliBreak.start)} – {fmtDate(CALENDAR.diwaliBreak.end)}</p>
                <p className="text-sm text-slate-600 mt-2">Hostel remains open</p>
              </div>
              <div className="bg-paper p-6">
                <h3 className="eyebrow mb-2">Annual examination</h3>
                <p className="hindi-sub text-xs text-slate-500 mb-2">वार्षिक परीक्षा</p>
                <p className="font-display text-2xl text-ink">{fmtDate(CALENDAR.annualExam.start)} – {fmtDate(CALENDAR.annualExam.end)}</p>
                <p className="text-sm text-slate-600 mt-2">All classes</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink mb-4">Major holidays · प्रमुख अवकाश</h2>
              <ul className="border-y border-rule-soft divide-y divide-rule-soft">
                {CALENDAR.majorHolidays.map((h) => (
                  <li key={h.date} className="py-3 grid grid-cols-12 gap-4">
                    <span className="col-span-4 md:col-span-2 font-mono text-sm text-amber-600">{fmtDate(h.date)}</span>
                    <span className="col-span-8 md:col-span-10 text-slate-700">{h.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}