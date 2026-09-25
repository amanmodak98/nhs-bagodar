/**
 * Client-side faculty fetcher — used by /faculty page at build time.
 *
 * Faculty is managed exclusively via /admin/faculty — there is no fallback
 * seed. If the admin endpoint returns nothing (or is unreachable during
 * a build that hasn't been published yet), the page renders empty.
 */

import type { Faculty } from './types';

export async function listFacultyClient(): Promise<Faculty[]> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const r = await fetch(`${base}/api/admin/faculty`, { cache: 'no-store' });
    if (!r.ok) return [];
    const data = await r.json();
    if (Array.isArray(data.items)) {
      return data.items.sort((a: Faculty, b: Faculty) => a.orderIndex - b.orderIndex);
    }
  } catch {
    /* fall through to empty */
  }
  return [];
}
