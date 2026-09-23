import { SCHOOL } from '@/lib/content';

export const metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Legal · कानूनी</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Privacy policy.
              </h1>
              <p className="hindi-sub text-base text-slate-600 mt-3">
                गोपनीयता नीति
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
              {SCHOOL.name} ("the school", "we", "us") operates this website and an admissions inquiry service. This policy explains what we collect, how we use it, and the choices you have.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">1. What we collect</h2>
            <p>
              From the admissions inquiry form: student name, guardian name, phone, email (optional), class applied for, and a free-text message. From browser logs: IP, user agent, and pages visited.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">2. What we use it for</h2>
            <p>
              We use the information only to call you back about admission, and to respond to the question you sent. We do not sell, rent, or share your phone number with anyone outside the school.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">3. Photographs of children</h2>
            <p>
              School event photographs are published on this site. We do not name individual children in captions. If you would like a specific photograph removed, write to {SCHOOL.email} with the image file name and we will take it down within seven days.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">4. Cookies</h2>
            <p>
              We use one cookie for the admin session (HTTP-only, signed). We do not use analytics, advertising, or tracking cookies.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">5. Your rights</h2>
            <p>
              You may request a copy of the data we hold about you, or ask for it to be deleted, by writing to {SCHOOL.email}.
            </p>

            <h2 className="font-display text-2xl text-ink pt-4">6. Contact</h2>
            <p>
              Questions about this policy: {SCHOOL.email} · {SCHOOL.phones[0]}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}