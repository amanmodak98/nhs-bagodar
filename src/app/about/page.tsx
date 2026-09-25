import Link from 'next/link';
import { SCHOOL, COMMITMENTS, TIMELINE } from '@/lib/content';
import { Photo } from '@/components/ui/Photo';
import { Logo } from '@/components/ui/Logo';
import { imgUrl } from '@/lib/images';
import { PrincipalSpotlight } from '@/components/site/PrincipalSpotlight';

export const metadata = {
  title: 'About the school',
  description:
    'Founded on 14 April 2021, National High School is a Nursery-to-Class 10 English-medium school in Bagodar, Giridih. Read about the principal, commitments, and history.',
};

export default function AboutPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">About the school · विद्यालय परिचय</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                We were founded by teachers who had run out of patience.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                {SCHOOL.name} opened its gates on 14 April 2021 with forty-seven students and five teachers. We had one observation — that the schools in this region had grown either too expensive for working families, or too lax for parents who cared. So we started a third kind of school.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col items-stretch gap-4">
              <div className="flex justify-center">
                <div className="w-32 h-32 md:w-44 md:h-44">
                  <Logo size="full" framed priority />
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
                <dt className="text-slate-500">Founded</dt><dd className="text-ink">14 April 2021</dd>
                <dt className="text-slate-500">Levels</dt><dd className="text-ink">{SCHOOL.levels}</dd>
                <dt className="text-slate-500">Pattern</dt><dd className="text-ink">{SCHOOL.affiliation.split(' ·')[0]}</dd>
                <dt className="text-slate-500">Medium</dt><dd className="text-ink">{SCHOOL.medium}</dd>
                <dt className="text-slate-500">Co-education</dt><dd className="text-ink">Yes</dd>
                <dt className="text-slate-500">Hostel</dt><dd className="text-ink">Yes</dd>
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* Principal */}
      <section id="principal" className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-22 scroll-mt-24">
          <PrincipalSpotlight variant="about" />
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-sand-100 border-b border-sand-200">
        <div className="max-w-edition mx-auto px-6 py-16">
          <header className="max-w-2xl mb-10">
            <div className="eyebrow">What we will — and will not — promise</div>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              Four commitments, written down.
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
            {COMMITMENTS.map((c) => (
              <div key={c.label} className="bg-paper p-7">
                <div className="font-display text-3xl text-amber-600 leading-none">{c.value}</div>
                <div className="mt-2 text-xs uppercase tracking-institutional text-forest-800 font-semibold">
                  {c.label}
                </div>
                <div className="mt-3 text-slate-700 leading-relaxed">{c.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-22">
          <header className="max-w-2xl mb-10">
            <div className="eyebrow">History</div>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              Six academic sessions.
            </h2>
          </header>
          <ol className="border-t border-rule">
            {TIMELINE.map((t) => (
              <li key={t.year} className="grid grid-cols-12 gap-4 py-5 border-b border-rule">
                <div className="col-span-3 md:col-span-2 font-display text-2xl text-amber-600">{t.year}</div>
                <div className="col-span-9 md:col-span-10 text-slate-700 leading-relaxed">{t.event}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="bg-forest-800 text-sand-100">
        <div className="max-w-edition mx-auto px-6 py-14 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-2xl md:text-3xl">Visit the campus.</h2>
            <p className="text-sand-200/90 mt-2 max-w-reading">
              Office hours {SCHOOL.hours.office}. Parents and prospective families are welcome any weekday — no appointment needed, but call ahead if you can.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="btn-primary bg-amber-500 border-amber-500 hover:bg-amber-600">
              Get directions →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}