'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SCHOOL } from '@/lib/content';
import { Logo } from '@/components/ui/Logo';

type NavItem = { href: string; label: string; labelHi?: string; children?: NavItem[] };

const NAV: NavItem[] = [
  { href: '/', label: 'Home', labelHi: 'गृह' },
  {
    href: '/about',
    label: 'About',
    labelHi: 'परिचय',
    children: [
      { href: '/about', label: 'The School', labelHi: 'विद्यालय' },
      { href: '/about#principal', label: 'Principal\'s Desk', labelHi: 'प्रधानाचार्य' },
      { href: '/about#commitments', label: 'Our Commitments', labelHi: 'प्रतिबद्धताएँ' },
      { href: '/about#timeline', label: 'Six-Year Story', labelHi: 'छह वर्षों की कहानी' },
    ],
  },
  {
    href: '/academics',
    label: 'Academics',
    labelHi: 'शिक्षा',
    children: [
      { href: '/academics', label: 'Programme Stages', labelHi: 'शिक्षा स्तर' },
      { href: '/academics/calendar', label: 'Academic Calendar', labelHi: 'शैक्षणिक कैलेंडर' },
      { href: '/academics/syllabus', label: 'Syllabus', labelHi: 'पाठ्यक्रम' },
      { href: '/faculty', label: 'Faculty Directory', labelHi: 'शिक्षक सूची' },
    ],
  },
  {
    href: '/facilities',
    label: 'Facilities',
    labelHi: 'सुविधाएँ',
    children: [
      { href: '/facilities', label: 'All Facilities', labelHi: 'सभी सुविधाएँ' },
      { href: '/facilities/transport', label: 'Transport Routes', labelHi: 'बस मार्ग' },
    ],
  },
  {
    href: '/gallery',
    label: 'Gallery',
    labelHi: 'गैलरी',
    children: [
      { href: '/gallery', label: 'Photo Album', labelHi: 'फोटो एल्बम' },
      { href: '/gallery/virtual-tour', label: 'Virtual Tour', labelHi: 'आभासी भ्रमण' },
    ],
  },
  {
    href: '/notices',
    label: 'Notices',
    labelHi: 'सूचनाएँ',
    children: [
      { href: '/notices', label: 'All Notices', labelHi: 'सभी सूचनाएँ' },
      { href: '/notices/circulars', label: 'Circulars', labelHi: 'परिपत्र' },
    ],
  },
  { href: '/downloads', label: 'Downloads', labelHi: 'डाउनलोड' },
  {
    href: '/disclosure',
    label: 'Disclosure',
    labelHi: 'प्रकटीकरण',
    children: [
      { href: '/disclosure', label: 'All Documents', labelHi: 'सभी दस्तावेज़' },
      { href: '/disclosure/affiliation', label: 'Affiliation Status', labelHi: 'मान्यता स्थिति' },
    ],
  },
  { href: '/faq', label: 'FAQ', labelHi: 'प्रश्न' },
  { href: '/contact', label: 'Contact', labelHi: 'संपर्क' },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpenMenu(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openSubmenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  // Inline opacity:1 + bg hex — these override any cascade rule
  const opaque = { opacity: 1, backgroundColor: '#fcfbf7' } as const;
  const opaqueNav = { opacity: 1 } as const;
  const opaqueBorder = { borderBottom: '2px solid #1b4332' } as const;

  return (
    <nav
      className="sticky top-0 z-40 w-full"
      style={{
        ...opaqueNav,
        ...opaqueBorder,
        backgroundColor: '#fcfbf7',
      }}
    >
      {/* Accent top bar */}
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #1b4332 0%, #d97706 50%, #1b4332 100%)' }} aria-hidden />

      <div className="w-full px-8 lg:px-12 flex items-center justify-between h-[68px]">
        {/* Brand — left */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 shrink-0 transition-transform duration-300 group-hover:scale-[1.04]">
            <Logo size="nav" priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[16px] text-ink group-hover:text-forest-800 transition-colors font-medium">
              {SCHOOL.name}
            </span>
            <span className="hindi-display text-[10px] tracking-institutional uppercase text-slate-500 mt-1 font-medium">
              {SCHOOL.hindiName} · Bagodar
            </span>
          </div>
        </Link>

        {/* Nav items — distributed across available width */}
        <ul className="hidden lg:flex items-center flex-1 justify-evenly max-w-3xl mx-8">
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const hasChildren = !!item.children?.length;
            const isMenuOpen = openMenu === item.label;

            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => hasChildren && openSubmenu(item.label)}
                onMouseLeave={() => hasChildren && scheduleClose()}
              >
                <Link
                  href={item.href}
                  className={
                    'relative inline-flex items-center text-[12.5px] tracking-wide uppercase font-semibold h-[68px] px-3 transition-colors duration-200 ' +
                    (active ? 'text-forest-800' : 'text-ink hover:text-forest-800')
                  }
                >
                  <span className="relative">
                    {item.label}
                    {hasChildren && (
                      <svg width="9" height="6" viewBox="0 0 10 6" fill="none" className="ml-1 inline-block opacity-60" aria-hidden>
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    )}
                    {active && (
                      <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-amber-500" />
                    )}
                  </span>
                </Link>

                {hasChildren && isMenuOpen && (
                  <div
                    className="absolute top-full left-0 pt-1"
                    onMouseEnter={() => openSubmenu(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div
                      className="min-w-[240px] py-1.5 border"
                      style={{
                        opacity: 1,
                        backgroundColor: '#fcfbf7',
                        borderColor: '#e2e0d4',
                        boxShadow: '0 8px 24px -6px rgba(26,25,22,0.22)',
                      }}
                    >
                      {item.children!.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-[13px] transition-colors border-l-2"
                            style={{
                              opacity: 1,
                              backgroundColor: '#fcfbf7',
                              color: childActive ? '#1b4332' : '#1a1916',
                              fontWeight: childActive ? 600 : 400,
                              borderLeftColor: childActive ? '#d97706' : '#fcfbf7',
                            }}
                          >
                            <span className="block">{child.label}</span>
                            {child.labelHi && (
                              <span className="block hindi-display text-[10px] text-slate-500 mt-0.5 normal-case tracking-normal">
                                {child.labelHi}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Apply CTA — smaller, lower visual weight */}
        <div className="hidden lg:flex items-center shrink-0">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-semibold tracking-wide uppercase transition-colors duration-200 hover:opacity-90"
            style={{
              opacity: 1,
              color: '#1b4332',
              borderBottom: '1.5px solid #d97706',
            }}
          >
            Apply
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 text-ink hover:text-forest-800"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer — solid, opacity locked */}
      {open && (
        <div
          className="lg:hidden border-t border-rule max-h-[80vh] overflow-y-auto"
          style={{ opacity: 1, backgroundColor: '#fcfbf7', borderTopColor: '#e2e0d4' }}
        >
          <ul className="px-6 py-3 space-y-0.5">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm tracking-wide uppercase font-semibold border-b border-rule-soft"
                >
                  <span className="block">{item.label}</span>
                  {item.labelHi && (
                    <span className="block hindi-display text-xs text-slate-500 mt-0.5 normal-case tracking-normal">
                      {item.labelHi}
                    </span>
                  )}
                </Link>
                {item.children?.length ? (
                  <ul className="ml-3 mb-2 border-l border-rule pl-3 space-y-0.5 mt-1">
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 text-xs text-slate-700"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link
                href="/admissions"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[13px] font-semibold tracking-wide uppercase"
                style={{ opacity: 1, color: '#fcfbf7', backgroundColor: '#1b4332' }}
              >
                Apply for Admission
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}