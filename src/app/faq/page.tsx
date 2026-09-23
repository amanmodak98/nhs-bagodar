import { FAQ } from '@/lib/content';
import { Reveal } from '@/components/site/Reveal';

export const metadata = {
  title: 'Frequently asked questions',
  description:
    'Frequently asked questions about National High School, Bagodar — admissions, fees, hostel, transport, scholarships, syllabus.',
};

export default function FAQPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">FAQ · प्रश्न</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Frequently asked questions.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                अक्सर पूछे जाने वाले प्रश्न
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">Don't see your question?</div>
                <p className="text-sm text-slate-700">
                  Call {`(8298354655)`} between 09:00 and 15:00, or walk in to the office.
                </p>
                <a href="/contact" className="btn-link mt-3">
                  Contact the office →
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <Reveal className="max-w-3xl">
            <ul className="divide-y divide-rule-soft border-y border-rule-soft">
              {FAQ.map((item, i) => (
                <li key={item.q} className="py-6">
                  <details className="group">
                    <summary className="flex items-start gap-4 cursor-pointer list-none">
                      <span className="font-display text-2xl text-amber-600 w-10 shrink-0 leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-lg text-ink group-open:text-forest-800">
                          {item.q}
                        </h3>
                        <p className="hindi-body text-sm text-slate-600 italic mt-1">{item.qHi}</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 transition-transform group-open:rotate-180 shrink-0" aria-hidden>
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div className="pl-14 mt-3 max-w-reading">
                      <p className="text-slate-700 leading-relaxed">{item.a}</p>
                      <p className="hindi-body text-sm text-slate-600 italic mt-3 leading-relaxed">{item.aHi}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}