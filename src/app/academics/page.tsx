import { SCHOOL, PROGRAMS } from '@/lib/content';

export const metadata = {
  title: 'Academics',
  description:
    'Academic programme at National High School — Nursery to Class 10, English medium, CBSE / JAC pattern. Phonics-first foundational stage, concept-led primary and middle school, board-oriented Classes 9–10.',
};

export default function AcademicsPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Academics</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Concepts first. Tests later. Always in that order.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                Our academic programme runs in four stages — foundational, primary, middle, and secondary — across Nursery to Class 10. The medium is English; the pedagogy is concept-oriented with built-in remedial time. The syllabus is CBSE / JAC.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-3">Term dates, 2026–27</div>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex justify-between"><span>Term I</span><span className="font-mono">01 Apr – 30 Sep</span></li>
                  <li className="flex justify-between"><span>Half-yearly</span><span className="font-mono">14 – 22 Oct</span></li>
                  <li className="flex justify-between"><span>Diwali break</span><span className="font-mono">08 – 14 Nov</span></li>
                  <li className="flex justify-between"><span>Term II</span><span className="font-mono">15 Nov – 31 Mar</span></li>
                  <li className="flex justify-between"><span>Annual exam</span><span className="font-mono">20 Feb – 10 Mar</span></li>
                </ul>
                <a
                  href="/disclosure"
                  className="btn-link mt-4"
                >
                  Download full calendar (PDF) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-22">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
            {PROGRAMS.map((p, i) => (
              <article key={p.stage} className="bg-paper p-8 flex flex-col">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="count-badge text-3xl">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-institutional text-amber-600">
                    {p.classes}
                  </span>
                </div>
                <h2 className="font-display text-2xl text-ink">{p.stage}</h2>
                <p className="mt-4 text-slate-700 leading-relaxed">{p.description}</p>
                <ul className="mt-5 text-sm text-slate-600 space-y-1.5 border-t border-rule pt-4">
                  <li><strong className="text-ink">Subjects taught:</strong> {p.classes.split('·').join(', ')}</li>
                  <li><strong className="text-ink">Assessment:</strong> Continuous + half-yearly + annual</li>
                  <li><strong className="text-ink">Class size cap:</strong> 35</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-100 border-b border-sand-200">
        <div className="max-w-edition mx-auto px-6 py-16">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-5">
              <div className="eyebrow">Pedagogy</div>
              <h2 className="font-display text-3xl text-ink mt-3">How we teach.</h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <dl className="divide-y divide-rule">
                {[
                  { t: 'Phonics-first English', d: 'Foundational classes teach English through phonics, not through sight-memorised alphabets. By Class 1 most children can sound out unfamiliar words.' },
                  { t: 'Concept-led Mathematics', d: 'We teach "why this works" before "how to do this." Tables and shortcuts follow, not precede, understanding.' },
                  { t: 'Remedial block, twice a week', d: 'Wednesday and Saturday afternoons are reserved for students who fall behind. Small groups, no extra charge.' },
                  { t: 'Smart classrooms, basic lab', d: 'A smart board in every class, a working computer lab for Classes 3 and up.' },
                ].map((p) => (
                  <div key={p.t} className="py-5">
                    <dt className="font-display text-lg text-ink">{p.t}</dt>
                    <dd className="text-slate-700 mt-1.5 text-sm leading-relaxed">{p.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}