import { listDisclosures } from '@/lib/db';
import { SCHOOL } from '@/lib/content';

export const metadata = {
  title: 'Mandatory Public Disclosure',
  description:
    'Mandatory public disclosure documents for National High School, Bagodar — society registration, NOC, fire safety, building safety, sanitation, fee structure, academic calendar.',
};

const CATEGORY_GROUPS: { id: string; title: string; intro: string }[] = [
  { id: 'general', title: 'General Information', intro: 'Name, address, principal, contact, and affiliated board.' },
  { id: 'documents', title: 'Documents & Affiliation Status', intro: 'Affiliation letter, society registration, NOC, recognition certificate.' },
  { id: 'result', title: 'Result & Academic Performance', intro: 'Annual academic result and quality assurance report.' },
  { id: 'staff', title: 'Staff (Teaching)', intro: 'Faculty list and staff details.' },
  { id: 'infrastructure', title: 'Infrastructure & Facilities', intro: 'Building plan, fire safety, building safety, water & sanitation.' },
  { id: 'academic', title: 'Academic Calendar, Fee Structure & Curriculum', intro: 'Term dates, fees, and curriculum documents.' },
];

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function DisclosurePage() {
  const disclosures = await listDisclosures();

  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Mandatory Public Disclosure</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Every document, downloadable.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                This page is published in compliance with CBSE Affiliation Bye-Laws §13 and the Jharkhand State Education Act. All documents below are PDF, downloadable for verification.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="card-hair">
                <div className="eyebrow mb-2">Last updated</div>
                <p className="text-sm text-slate-700">{fmtDate(disclosures[0]?.updatedAt || new Date().toISOString())}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {disclosures.length} documents on file. Updated term-wise by the office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16 space-y-12">
          {CATEGORY_GROUPS.map((group) => (
            <article key={group.id} id={group.id} className="grid grid-cols-12 gap-6 md:gap-10">
              <header className="col-span-12 md:col-span-4">
                <div className="eyebrow">{`Section ${group.id}`}</div>
                <h2 className="font-display text-2xl text-ink mt-2">{group.title}</h2>
                <p className="text-sm text-slate-600 mt-2">{group.intro}</p>
              </header>
              <div className="col-span-12 md:col-span-8">
                <ul className="divide-y divide-rule border-y border-rule">
                  {disclosures
                    .filter((d) => {
                      if (group.id === 'general') {
                        return d.category === 'affiliation-letter';
                      }
                      if (group.id === 'documents') {
                        return ['society-registration', 'noc'].includes(d.category);
                      }
                      if (group.id === 'infrastructure') {
                        return ['fire-safety', 'building-safety', 'water-sanitation'].includes(d.category);
                      }
                      if (group.id === 'academic') {
                        return ['fee-structure', 'academic-calendar'].includes(d.category);
                      }
                      return false;
                    })
                    .map((d) => (
                      <li key={d.id} className="py-4 flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-display text-base text-ink">{d.documentTitle}</h3>
                          {d.description && (
                            <p className="text-sm text-slate-600 mt-1">{d.description}</p>
                          )}
                          <p className="text-xs text-slate-500 mt-1 font-mono">
                            Updated {fmtDate(d.updatedAt)}
                          </p>
                        </div>
                        <a href={d.fileUrl} className="btn-link whitespace-nowrap">
                          Download PDF →
                        </a>
                      </li>
                    ))}
                </ul>
                <div className="mt-4 text-xs text-slate-500">
                  General information — school name, address, and contact — is also published on the{' '}
                  <a href="/about" className="text-forest-800 underline underline-offset-2">
                    About
                  </a>{' '}
                  page. Office hours are {SCHOOL.hours.office}.
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}