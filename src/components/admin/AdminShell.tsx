'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { SCHOOL } from '@/lib/content';

const NAV = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/notices', label: 'Notices & circulars' },
  { href: '/admin/faculty', label: 'Faculty' },
  { href: '/admin/disclosure', label: 'Public disclosure' },
  { href: '/admin/inquiries', label: 'Inquiries' },
];

export function AdminShell({ username, children }: { username: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <header className="border-b border-rule bg-sand-100">
        <div className="px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="nav" />
            <div className="leading-none">
              <div className="font-display text-base text-ink">{SCHOOL.name}</div>
              <div className="text-[10px] uppercase tracking-institutional text-slate-500 mt-0.5">
                Admin · Bagodar
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden md:inline text-slate-600">
              Signed in as <strong className="text-ink">{username}</strong>
            </span>
            <Link href="/" className="text-slate-600 hover:text-forest-800" target="_blank">
              View site ↗
            </Link>
            <button
              onClick={logout}
              className="btn-secondary text-sm py-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Side nav — desktop only */}
        <aside className="hidden lg:block w-56 border-r border-rule bg-sand-50 px-4 py-6">
          <nav className="space-y-1">
            {NAV.map((n) => {
              const active =
                pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={
                    'block px-3 py-2 text-sm rounded-sm border ' +
                    (active
                      ? 'bg-forest-800 text-sand-100 border-forest-800 font-medium'
                      : 'border-transparent text-ink hover:bg-sand-100 hover:border-rule')
                  }
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 px-6 py-8">
          {/* Mobile nav */}
          <nav className="lg:hidden mb-6 flex overflow-x-auto gap-2 text-sm">
            {NAV.map((n) => {
              const active =
                pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={
                    'whitespace-nowrap px-3 py-1.5 border ' +
                    (active ? 'bg-forest-800 text-sand-100 border-forest-800' : 'border-rule text-ink')
                  }
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
}