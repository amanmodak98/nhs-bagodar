'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { LoginForm } from '@/components/admin/LoginForm';
import { SCHOOL } from '@/lib/content';

export default function AdminLoginPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const has = document.cookie.split(';').some((c) => c.trim().startsWith('nhs_admin_session='));
    setAuthed(has);
    if (has) {
      router.replace('/admin');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f1e7' }}>
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="block text-center mb-6 text-sm text-slate-500 hover:text-forest-800">
            ← Back to site
          </Link>
          <div className="bg-paper border border-rule p-8" style={{ backgroundColor: '#fcfbf7', opacity: 1 }}>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24"><Logo size="mark" framed priority /></div>
              </div>
              <div className="font-display text-xl text-ink">{SCHOOL.name}</div>
              <div className="hindi-display text-[10px] tracking-institutional uppercase text-slate-500 mt-1">
                {SCHOOL.hindiName}
              </div>
              <div className="rule-accent mx-auto mt-3" />
              <h1 className="font-display text-lg text-ink mt-4">Admin sign in</h1>
              <p className="text-sm text-slate-600 mt-1">
                Authorised staff only. Credentials are issued by the school office.
              </p>
            </div>
            <LoginForm />

            {/* Production-ready: no demo credentials shown. Real credentials are configured via environment variables. */}
          </div>
        </div>
      </div>
      {/* Signature */}
      <footer className="border-t border-rule py-4">
        <div className="max-w-edition mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</span>
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
      </footer>
    </div>
  );
}