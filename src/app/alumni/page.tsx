export const metadata = {
  title: 'Alumni · पूर्व छात्र',
  description: 'Alumni network of National High School, Bagodar — founded 2021, the first graduating batch will be Class 10 of 2026–27.',
};

export default function AlumniPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Alumni · पूर्व छात्र</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                First batch in 2026–27.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                प्रथम बैच — सत्र 2026–27
              </p>
              <p className="mt-5 text-slate-700 max-w-reading">
                National High School opened with Class 1 in April 2021. The first batch to write a board examination (Class 10) sits the exam in February–March 2027. The alumni register will open after their results are published.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-7">
              <div className="eyebrow">Register your interest</div>
              <h2 className="font-display text-2xl text-ink mt-2">
                Be the first to know.
              </h2>
              <p className="text-slate-700 mt-3 max-w-reading">
                If you were a student at N.H.S. Bagodar in any year (2021 onwards), leave your details with the office. We will contact you when the alumni register opens.
              </p>
              <form className="mt-6 space-y-5 max-w-md" action="/api/inquiries" method="post">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Your name</label>
                  <input id="name" name="name" required className="input-rule mt-2" />
                </div>
                <div>
                  <label htmlFor="batch" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Year(s) attended</label>
                  <input id="batch" name="batch" placeholder="e.g. 2021–2024" className="input-rule mt-2" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-institutional text-amber-600 font-semibold">Phone</label>
                  <input id="phone" name="phone" type="tel" required className="input-rule mt-2 font-mono" />
                </div>
                <button type="submit" className="btn-primary">Register interest</button>
              </form>
              <p className="text-xs text-slate-500 mt-4">
                This is a placeholder form. The alumni register will be wired up after the first batch graduates in March 2027.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="card-hair">
                <div className="eyebrow mb-3">Looking forward</div>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3"><span className="font-display text-amber-600 w-6">01.</span>Class 10 board exam, February–March 2027</li>
                  <li className="flex gap-3"><span className="font-display text-amber-600 w-6">02.</span>Result day, 20 March 2027</li>
                  <li className="flex gap-3"><span className="font-display text-amber-600 w-6">03.</span>Alumni register opens, March 2027</li>
                  <li className="flex gap-3"><span className="font-display text-amber-600 w-6">04.</span>First alumni meet, 14 April 2027</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}