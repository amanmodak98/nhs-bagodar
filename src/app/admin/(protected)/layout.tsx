'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { SCHOOL } from '@/lib/content';

const NAV = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/notices', label: 'Notices & circulars' },
  { href: '/admin/faculty', label: 'Faculty' },
  { href: '/admin/downloads', label: 'Downloads' },
  { href: '/admin/disclosure', label: 'Public disclosure' },
  { href: '/admin/inquiries', label: 'Inquiries' },
  { href: '/admin/users', label: 'Users' },
];

function AdminShell({ username: initialUsername, children }: { username?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(initialUsername ?? null);
  const [checking, setChecking] = useState(!initialUsername);

  useEffect(() => {
    if (initialUsername) return;
    let cancelled = false;
    fetch('/api/admin/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.username) {
          setUsername(data.username);
          setChecking(false);
        } else {
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        if (!cancelled) router.replace('/admin/login');
      });
    return () => { cancelled = true; };
  }, [router, initialUsername]);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper" style={{ backgroundColor: '#fcfbf7' }}>
        <div className="text-slate-500 text-sm font-display italic">Checking session…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex" style={{ backgroundColor: '#fcfbf7' }}>
      {/* Persistent sidebar — visible on all breakpoints */}
      <aside className="w-64 shrink-0 border-r border-rule bg-forest-800 text-sand-100 flex flex-col min-h-screen" style={{ backgroundColor: '#1b4332' }}>
        <div className="px-5 py-5 border-b border-forest-700">
          <Link href="/" className="flex items-center gap-3 group" target="_blank">
            <div className="w-10 h-10 shrink-0"><Logo size="nav" /></div>
            <div className="leading-none">
              <div className="font-display text-base text-sand-100 group-hover:text-amber-300">{SCHOOL.name}</div>
              <div className="text-[10px] uppercase tracking-institutional text-sand-200/70 mt-0.5">Admin</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={
                  'block px-3 py-2 text-sm border ' +
                  (active
                    ? 'bg-sand-100 text-forest-800 border-sand-100 font-semibold'
                    : 'border-transparent text-sand-100 hover:bg-forest-700 hover:border-forest-700')
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout at the bottom of the sidebar */}
        <div className="px-5 py-4 border-t border-forest-700 space-y-3">
          <div className="text-xs">
            <div className="text-sand-200/60 uppercase tracking-institutional">Signed in as</div>
            <div className="font-display text-sand-100 mt-0.5 truncate">{username ?? '—'}</div>
          </div>
          <button
            onClick={logout}
            className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-ink px-3 py-2 text-[12px] font-semibold tracking-wide uppercase border border-amber-600 hover:bg-amber-600 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sign out
          </button>
          <Link
            href="/"
            target="_blank"
            className="block text-center text-[11px] uppercase tracking-institutional text-sand-200/70 hover:text-amber-300"
          >
            View public site ↗
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="border-b border-rule bg-paper px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="eyebrow">Admin</div>
            <h2 className="font-display text-xl text-ink mt-1">
              {NAV.find((n) => n.href === pathname)?.label ||
                (pathname.startsWith('/admin/') ? NAV.find((n) => pathname.startsWith(n.href))?.label : 'Overview')}
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            <span className="hidden sm:inline">Welcome back,</span> <span className="font-display text-ink">{username}</span>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}