export const metadata = { title: 'Terms of use' };

export default function TermsPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Legal · कानूनी</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Terms of use.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                उपयोग की शर्तें
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Effective: 14 April 2021 · Last updated: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <article className="max-w-reading space-y-6 text-slate-700 leading-relaxed">
            <p>
              By using this website you agree to the following terms. If you do not agree, please do not use the site.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">1. Information accuracy</h2>
            <p>
              We make every effort to keep the information on this site accurate. Dates, fees, and affiliations may change between updates. For binding information, please contact the school office directly.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">2. Admissions</h2>
            <p>
              Submitting an inquiry through this site does not guarantee admission. Admission is confirmed only after the office verifies documents and an in-person meeting.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">3. Intellectual property</h2>
            <p>
              School name, logo, motto, photographs, and document templates are the property of the school. Photographs may be downloaded for personal use; commercial reproduction requires written permission.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">4. External links</h2>
            <p>
              Links to external sites (SARAS, NCERT, JAC, payment portals) are provided for convenience. We do not control those sites and are not responsible for their content.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">5. Liability</h2>
            <p>
              The school is not liable for any loss arising from reliance on information on this site. Always confirm critical details — fee, transport route, exam date — with the office.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">6. Governing law</h2>
            <p>
              These terms are governed by the laws of India. Any dispute shall be subject to the jurisdiction of courts in Giridih, Jharkhand.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}