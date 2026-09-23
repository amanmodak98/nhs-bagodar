import Link from 'next/link';
import { SCHOOL, FACILITIES } from '@/lib/content';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="bg-paper border-t border-rule">
      <div className="max-w-edition mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <Logo size="mark" framed priority />
              <div className="leading-none">
                <div className="font-display text-base text-ink">{SCHOOL.name}</div>
                <div className="hindi-display text-[10px] tracking-institutional uppercase text-slate-500 mt-0.5">
                  {SCHOOL.hindiName}
                </div>
              </div>
            </div>
            <p className="font-display italic text-base text-slate-700 max-w-md">
              "{SCHOOL.motto.english}"
            </p>
            <p className="text-sm text-slate-500 mt-1">{SCHOOL.motto.sanskrit}</p>
            <p className="mt-5 text-sm text-slate-700 max-w-md">
              {SCHOOL.location}, {SCHOOL.district}, {SCHOOL.state} — {SCHOOL.pincode}
            </p>
            <p className="text-sm text-slate-700 mt-2">
              {SCHOOL.phones.join(' · ')}
            </p>
            <p className="text-sm text-slate-500 mt-1">{SCHOOL.email}</p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Visit</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-ink hover:text-forest-800">About the school</Link></li>
              <li><Link href="/academics" className="text-ink hover:text-forest-800">Academics</Link></li>
              <li><Link href="/facilities" className="text-ink hover:text-forest-800">Facilities</Link></li>
              <li><Link href="/gallery" className="text-ink hover:text-forest-800">Life at NHS</Link></li>
              <li><Link href="/faculty" className="text-ink hover:text-forest-800">Faculty directory</Link></li>
              <li><Link href="/contact" className="text-ink hover:text-forest-800">Visit the campus</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Compliance & admissions</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admissions" className="text-ink hover:text-forest-800">Apply for admission 2026–27</Link></li>
              <li><Link href="/disclosure" className="text-ink hover:text-forest-800">Mandatory Public Disclosure</Link></li>
              <li><Link href="/notices" className="text-ink hover:text-forest-800">Notices & circulars</Link></li>
              <li><Link href="/admin/login" className="text-slate-500 hover:text-forest-800">Admin sign in</Link></li>
            </ul>
            <div className="mt-6 p-4 bg-sand-100 border border-sand-200 rounded-sm">
              <div className="eyebrow mb-2 text-amber-600">100% free</div>
              <p className="text-sm text-slate-700">
                Tuition, books, uniform and bus fee fully waived for orphan children. Apply at the school office with BDO certificate.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>Estd. {SCHOOL.established}</span>
            <span aria-hidden>·</span>
            <span>{SCHOOL.affiliation}</span>
            <span aria-hidden>·</span>
            <span>{SCHOOL.medium}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>CBSE / JAC Pattern</span>
            <span aria-hidden>·</span>
            <span>School Code: <span className="font-mono">N/A</span></span>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
          </span>
          <a
            href="https://infirexa.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-forest-800 transition-colors"
          >
            <span className="font-display italic">Crafted with care by</span>
            <span className="font-display font-semibold tracking-wide text-ink">infirexa<span className="text-amber-600">.</span>tech</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}