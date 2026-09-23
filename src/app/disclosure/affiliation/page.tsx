import { SCHOOL } from '@/lib/content';

export const metadata = {
  title: 'Affiliation status',
  description:
    'Affiliation status of National High School, Bagodar — JAC-affiliated since 2021, CBSE-pattern curriculum, SARAS application status.',
};

export default function AffiliationPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Affiliation · मान्यता</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Affiliation status.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                मान्यता की स्थिति
              </p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16 max-w-reading">
          <p className="text-slate-700 leading-relaxed">
            {SCHOOL.name} opened on 14 April 2021 with affiliation to the Jharkhand Academic Council (JAC). The school has adopted the CBSE-pattern curriculum — NCERT textbooks for Mathematics, Science, and Social Science; NCERT-aligned teaching sequencing — pending formal CBSE affiliation.
          </p>

          <div className="mt-10 border-y-2 border-ink">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-rule-soft">
                  <td className="py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600 w-48">Examining body</td>
                  <td className="py-3 text-ink">Jharkhand Academic Council (JAC)</td>
                </tr>
                <tr className="border-b border-rule-soft">
                  <td className="py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600">JAC affiliation</td>
                  <td className="py-3 text-ink">Active since 2021</td>
                </tr>
                <tr className="border-b border-rule-soft">
                  <td className="py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600">CBSE affiliation</td>
                  <td className="py-3 text-ink">Application under preparation · Not yet in CBSE SARAS 7.0</td>
                </tr>
                <tr className="border-b border-rule-soft">
                  <td className="py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600">UDISE code</td>
                  <td className="py-3 text-ink">Pending — will be assigned by JAC at first inspection</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-display text-xs uppercase tracking-institutional text-amber-600">Curriculum</td>
                  <td className="py-3 text-ink">CBSE pattern (NCERT textbooks) · JAC examination</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-10 text-sm text-slate-600">
            We will update this page when the CBSE affiliation number is granted. For verification, contact the office at {SCHOOL.phones[0]}.
          </p>
        </div>
      </section>
    </>
  );
}