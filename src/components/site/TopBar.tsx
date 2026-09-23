import Link from 'next/link';
import { SCHOOL } from '@/lib/content';

/**
 * Utility bar above the main nav — phone numbers, location, admission badge.
 * Two-tier institutional layout. Stays put on scroll.
 */
export function TopBar() {
  return (
    <div className="bg-sand-100 border-b border-sand-200">
      <div className="max-w-edition mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-y-2 text-xs">
        <div className="flex items-center gap-x-6 gap-y-1 flex-wrap text-slate-700">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>
              {SCHOOL.location}, {SCHOOL.district}, {SCHOOL.state}
            </span>
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a href={`tel:${SCHOOL.phones[0].replace(/\s/g, '')}`} className="hover:text-forest-800">
              {SCHOOL.phones[0]}
            </a>
            <span className="text-sand-300">·</span>
            <a href={`tel:${SCHOOL.phones[1].replace(/\s/g, '')}`} className="hover:text-forest-800">
              {SCHOOL.phones[1]}
            </a>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="pill pill-amber" aria-label="Admission status">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Admissions Open
          </span>
          <Link href="/contact" className="hidden md:inline text-slate-700 hover:text-forest-800">
            Visit us →
          </Link>
        </div>
      </div>
    </div>
  );
}