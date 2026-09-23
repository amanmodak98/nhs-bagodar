/**
 * Client-side faculty fetcher — used by /faculty page at build time.
 * Falls back to mock data when the admin API isn't reachable (offline build).
 */

import { SEED_FACULTY } from '@/lib/seed';

export async function listFacultyClient() {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const r = await fetch(`${base}/api/admin/faculty`, { cache: 'no-store' });
    if (!r.ok) throw new Error('not ok');
    const data = await r.json();
    if (Array.isArray(data.items) && data.items.length > 0) {
      return data.items.sort((a: any, b: any) => a.orderIndex - b.orderIndex);
    }
  } catch {
    /* fall through to seed */
  }
  return SEED_FACULTY;
}