import { SCHOOL, SCHOLARSHIPS } from '@/lib/content';
import { AdmissionForm } from '@/components/site/AdmissionForm';

export const metadata = {
  title: 'Apply for admission',
  description:
    'Apply for admission to National High School, Bagodar — Nursery to Class 10, English medium, CBSE / JAC pattern. Free for orphan children. No application fee this month.',
};

export default function AdmissionsPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Admissions 2026–27</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Application for {SCHOOL.levels}.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                Applications are open year-round at the school office. This month — admission fee is waived for every applicant. Bring two photographs, Aadhaar card of parent, and birth certificate.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="pill pill-amber">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Free admission this month
                </span>
                <span className="pill pill-forest">No application fee</span>
                <span className="pill">100% free for orphan children</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16 grid grid-cols-12 gap-10">
          {/* Left: form */}
          <div className="col-span-12 md:col-span-7">
            <div className="eyebrow">Apply</div>
            <h2 className="font-display text-2xl text-ink mt-2 mb-1">Inquiry form</h2>
            <p className="text-sm text-slate-600 mb-6">
              Submissions are routed to the admissions office. The office will call you back within two working days.
            </p>
            <AdmissionForm />
          </div>

          {/* Right: scholarships + contact */}
          <aside className="col-span-12 md:col-span-5 space-y-8">
            <div>
              <div className="eyebrow">Scholarships & concessions</div>
              <ul className="mt-3 divide-y divide-rule-soft border-y border-rule-soft">
                {SCHOLARSHIPS.map((s) => (
                  <li key={s.title} className="py-3">
                    <h3 className="font-display text-base text-ink">{s.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{s.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-hair bg-forest-800 text-sand-100 border-forest-800">
              <div className="eyebrow text-amber-400 mb-3">Questions first?</div>
              <p className="text-sm text-sand-200/90 leading-relaxed mb-4">
                Call {SCHOOL.phones[0]} between 09:00 and 15:00 on weekdays. Or walk in — the admissions desk is at the front gate.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href={`tel:${SCHOOL.phones[0].replace(/\s/g, '')}`} className="btn-primary bg-amber-500 border-amber-500 hover:bg-amber-600 text-sm">
                  Call {SCHOOL.phones[0]}
                </a>
                <a
                  href={`https://wa.me/${SCHOOL.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="btn-secondary text-sand-100 border-sand-100 hover:bg-sand-100 hover:text-forest-800 text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}