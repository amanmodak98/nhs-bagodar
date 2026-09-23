// Client-side helpers for the admin dashboard — talks to Pages Functions at /api/admin/*

async function authedFetch(url: string, init: RequestInit = {}) {
  return fetch(url, { credentials: 'include', ...init });
}

export async function fetchMe() {
  const r = await authedFetch('/api/admin/me');
  if (!r.ok) return null;
  try {
    const data = await r.json();
    return data?.username ?? null;
  } catch {
    return null;
  }
}

export async function listNotices() {
  const r = await authedFetch('/api/admin/notices');
  if (!r.ok) throw new Error('Failed to load notices');
  return (await r.json()).items ?? [];
}

export async function listFaculty() {
  const r = await authedFetch('/api/admin/faculty');
  if (!r.ok) throw new Error('Failed to load faculty');
  return (await r.json()).items ?? [];
}

export async function listInquiries() {
  const r = await authedFetch('/api/admin/inquiries');
  if (!r.ok) throw new Error('Failed to load inquiries');
  return (await r.json()).items ?? [];
}

export async function listDisclosures() {
  const r = await authedFetch('/api/admin/disclosure');
  if (!r.ok) throw new Error('Failed to load disclosures');
  return (await r.json()).items ?? [];
}

export async function createNotice(body: any) {
  const r = await authedFetch('/api/admin/notices', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('Failed to create notice');
  return await r.json();
}

export async function updateNotice(body: any) {
  const r = await authedFetch('/api/admin/notices', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('Failed to update notice');
  return await r.json();
}

export async function deleteNotice(id: number) {
  const r = await authedFetch('/api/admin/notices', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) });
  if (!r.ok) throw new Error('Failed to delete notice');
  return await r.json();
}

export async function createFaculty(body: any) {
  const r = await authedFetch('/api/admin/faculty', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('Failed to add faculty');
  return await r.json();
}

export async function deleteFaculty(id: number) {
  const r = await authedFetch('/api/admin/faculty', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) });
  if (!r.ok) throw new Error('Failed to remove faculty');
  return await r.json();
}

export async function updateInquiryStatus(id: number, status: string) {
  const r = await authedFetch('/api/admin/inquiries', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, status }) });
  if (!r.ok) throw new Error('Failed to update inquiry');
  return await r.json();
}

export async function createDisclosure(body: any) {
  const r = await authedFetch('/api/admin/disclosure', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('Failed to add disclosure');
  return await r.json();
}

export async function deleteDisclosure(id: number) {
  const r = await authedFetch('/api/admin/disclosure', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) });
  if (!r.ok) throw new Error('Failed to delete disclosure');
  return await r.json();
}