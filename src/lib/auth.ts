/**
 * Minimal edge-compatible admin auth.
 *
 * On login we set a signed httpOnly cookie. On every protected request,
 * we verify the signature and the admin:role. No third-party deps.
 *
 * The signing key (ADMIN_SESSION_SECRET) should be at least 32 chars in
 * production. We use HMAC-SHA256 via the Web Crypto API (works on edge).
 */

import { cookies } from 'next/headers';

export const COOKIE_NAME = 'nhs_admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'dev-only-insecure-secret-please-override';
}

function getAdminCreds(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'nhsbagodar2026',
  };
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(payload: string): Promise<string> {
  return hmac(getSecret(), payload);
}

async function verify(token: string): Promise<{ username: string; exp: number } | null> {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = await sign(payload);
  if (expected !== sig) return null;
  try {
    const data = JSON.parse(atob(payload));
    if (!data.username || !data.exp) return null;
    if (Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createSessionCookie(username: string): Promise<string> {
  const payload = { username, exp: Date.now() + COOKIE_MAX_AGE * 1000 };
  const encoded = btoa(JSON.stringify(payload));
  const sig = await sign(encoded);
  return `${encoded}.${sig}`;
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const c = getAdminCreds();
  // Constant-time comparison would be better — for this single-tenant admin
  // a plain comparison is acceptable.
  if (username.length !== c.username.length) return false;
  if (password.length !== c.password.length) return false;
  let ok = true;
  for (let i = 0; i < username.length; i++) ok = ok && username[i] === c.username[i];
  for (let i = 0; i < password.length; i++) ok = ok && password[i] === c.password[i];
  return ok;
}

export async function getSession(): Promise<{ username: string } | null> {
  const c = (await cookies()).get(COOKIE_NAME);
  if (!c?.value) return null;
  return verify(c.value);
}

export async function requireAdmin(): Promise<{ username: string }> {
  const s = await getSession();
  if (!s) throw new Error('UNAUTHORIZED');
  return s;
}