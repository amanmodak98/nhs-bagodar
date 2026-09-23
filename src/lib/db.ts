/**
 * Data access layer.
 *
 * In development without D1 (i.e. no CLOUDFLARE_D1_DATABASE_ID env), falls
 * back to in-process mock data from ./seed. In production with D1 bound
 * to the `DB` Pages binding, all reads/writes are real.
 *
 * Each function is async to keep the contract identical between mocks
 * and D1 — no API change when switching to D1 in production.
 */

import type { Notice, Faculty, Disclosure, Inquiry, NoticeCategory, InquiryStatus } from './types';
import { SEED_NOTICES, SEED_FACULTY, SEED_DISCLOSURES, SEED_INQUIRIES } from './seed';

const HAS_D1 = !!process.env.CLOUDFLARE_D1_DATABASE_ID;

// In-memory store so admin writes persist across requests during dev
let notices: Notice[] = [...SEED_NOTICES];
let faculty: Faculty[] = [...SEED_FACULTY];
let disclosures: Disclosure[] = [...SEED_DISCLOSURES];
let inquiries: Inquiry[] = [...SEED_INQUIRIES];

let idCounter = {
  notices: SEED_NOTICES.length + 100,
  faculty: SEED_FACULTY.length + 100,
  disclosures: SEED_DISCLOSURES.length + 100,
  inquiries: SEED_INQUIRIES.length + 100,
};

/* ------------------------------ Notices ------------------------------ */

export async function listActiveNotices(): Promise<Notice[]> {
  if (HAS_D1) return d1Query<Notice>(
    "SELECT * FROM notices WHERE is_active = 1 ORDER BY publish_date DESC, id DESC LIMIT 20"
  );
  return notices.filter((n) => n.isActive);
}

export async function listAllNotices(): Promise<Notice[]> {
  if (HAS_D1) return d1Query<Notice>(
    "SELECT * FROM notices ORDER BY publish_date DESC, id DESC"
  );
  return [...notices].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export async function getNotice(id: number): Promise<Notice | null> {
  if (HAS_D1) {
    const rows = await d1Query<Notice>("SELECT * FROM notices WHERE id = ?", [id]);
    return rows[0] ?? null;
  }
  return notices.find((n) => n.id === id) ?? null;
}

export async function createNotice(input: Omit<Notice, 'id' | 'createdAt'>): Promise<number> {
  if (HAS_D1) {
    await d1Execute(
      "INSERT INTO notices (title, category, body, file_url, is_active, publish_date) VALUES (?, ?, ?, ?, ?, ?)",
      [input.title, input.category, input.body, input.fileUrl ?? null, input.isActive ? 1 : 0, input.publishDate]
    );
    const rows = await d1Query<{ id: number }>("SELECT last_insert_rowid() AS id");
    return rows[0].id;
  }
  const id = idCounter.notices++;
  notices.unshift({ id, createdAt: new Date().toISOString(), ...input });
  return id;
}

export async function updateNotice(id: number, patch: Partial<Omit<Notice, 'id' | 'createdAt'>>): Promise<void> {
  if (HAS_D1) {
    const existing = await getNotice(id);
    if (!existing) return;
    const merged = { ...existing, ...patch };
    await d1Execute(
      "UPDATE notices SET title=?, category=?, body=?, file_url=?, is_active=?, publish_date=? WHERE id=?",
      [merged.title, merged.category, merged.body, merged.fileUrl ?? null, merged.isActive ? 1 : 0, merged.publishDate, id]
    );
    return;
  }
  notices = notices.map((n) => (n.id === id ? { ...n, ...patch } : n));
}

export async function deleteNotice(id: number): Promise<void> {
  if (HAS_D1) {
    await d1Execute("DELETE FROM notices WHERE id = ?", [id]);
    return;
  }
  notices = notices.filter((n) => n.id !== id);
}

/* ------------------------------ Faculty ------------------------------ */

export async function listFaculty(): Promise<Faculty[]> {
  if (HAS_D1) return d1Query<Faculty>("SELECT * FROM faculty ORDER BY order_index ASC, id ASC");
  return [...faculty].sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function createFaculty(input: Omit<Faculty, 'id'>): Promise<number> {
  if (HAS_D1) {
    await d1Execute(
      "INSERT INTO faculty (name, designation, qualification, subject, joined_year, image_url, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [input.name, input.designation, input.qualification, input.subject, input.joinedYear, input.imageUrl ?? null, input.orderIndex]
    );
    const rows = await d1Query<{ id: number }>("SELECT last_insert_rowid() AS id");
    return rows[0].id;
  }
  const id = idCounter.faculty++;
  faculty.push({ ...input, id });
  return id;
}

export async function updateFaculty(id: number, patch: Partial<Omit<Faculty, 'id'>>): Promise<void> {
  if (HAS_D1) {
    const existing = faculty.find((f) => f.id === id);
    if (!existing) return;
    const merged = { ...existing, ...patch };
    await d1Execute(
      "UPDATE faculty SET name=?, designation=?, qualification=?, subject=?, joined_year=?, image_url=?, order_index=? WHERE id=?",
      [merged.name, merged.designation, merged.qualification, merged.subject, merged.joinedYear, merged.imageUrl ?? null, merged.orderIndex, id]
    );
    return;
  }
  faculty = faculty.map((f) => (f.id === id ? { ...f, ...patch } : f));
}

export async function deleteFaculty(id: number): Promise<void> {
  if (HAS_D1) {
    await d1Execute("DELETE FROM faculty WHERE id = ?", [id]);
    return;
  }
  faculty = faculty.filter((f) => f.id !== id);
}

/* ------------------------------ Disclosures ------------------------------ */

export async function listDisclosures(): Promise<Disclosure[]> {
  if (HAS_D1) return d1Query<Disclosure>("SELECT * FROM disclosures ORDER BY updated_at DESC");
  return [...disclosures].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createDisclosure(input: Omit<Disclosure, 'id'>): Promise<number> {
  if (HAS_D1) {
    await d1Execute(
      "INSERT INTO disclosures (document_title, category, description, file_url, updated_at) VALUES (?, ?, ?, ?, ?)",
      [input.documentTitle, input.category, input.description ?? null, input.fileUrl, input.updatedAt]
    );
    const rows = await d1Query<{ id: number }>("SELECT last_insert_rowid() AS id");
    return rows[0].id;
  }
  const id = idCounter.disclosures++;
  disclosures.unshift({ ...input, id });
  return id;
}

export async function deleteDisclosure(id: number): Promise<void> {
  if (HAS_D1) {
    await d1Execute("DELETE FROM disclosures WHERE id = ?", [id]);
    return;
  }
  disclosures = disclosures.filter((d) => d.id !== id);
}

/* ------------------------------ Inquiries ------------------------------ */

export async function listInquiries(): Promise<Inquiry[]> {
  if (HAS_D1) return d1Query<Inquiry>("SELECT * FROM inquiries ORDER BY created_at DESC");
  return [...inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createInquiry(input: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<number> {
  const created: Omit<Inquiry, 'id'> = { ...input, status: 'new', createdAt: new Date().toISOString() };
  if (HAS_D1) {
    await d1Execute(
      "INSERT INTO inquiries (student_name, guardian_name, phone, email, class_applied, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [created.studentName, created.guardianName, created.phone, created.email ?? null, created.classApplied, created.message ?? null, created.status, created.createdAt]
    );
    const rows = await d1Query<{ id: number }>("SELECT last_insert_rowid() AS id");
    return rows[0].id;
  }
  const id = idCounter.inquiries++;
  inquiries.unshift({ ...created, id });
  return id;
}

export async function updateInquiryStatus(id: number, status: InquiryStatus): Promise<void> {
  if (HAS_D1) {
    await d1Execute("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
    return;
  }
  inquiries = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
}

/* ------------------------------ D1 stubs ------------------------------ */
/* These are wired to the real Cloudflare D1 binding when deployed. The */
/* bindings interface is the standard @cloudflare/workers-types DB shape */

interface D1PreparedStatement {
  bind(...values: (string | number | null)[]): D1PreparedStatement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
  run(): Promise<{ success: boolean; meta: { last_row_id?: number } }>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

declare global {
  // eslint-disable-next-line no-var
  var __DB__: D1Database | undefined;
}

async function d1Query<T>(sql: string, params: (string | number | null)[] = []): Promise<T[]> {
  const db = globalThis.__DB__;
  if (!db) throw new Error("D1 binding 'DB' not available");
  const stmt = db.prepare(sql);
  const bound = params.length ? stmt.bind(...params) : stmt;
  const res = await bound.all<T>();
  return res.results ?? [];
}

async function d1Execute(sql: string, params: (string | number | null)[] = []): Promise<void> {
  const db = globalThis.__DB__;
  if (!db) throw new Error("D1 binding 'DB' not available");
  const stmt = db.prepare(sql);
  const bound = params.length ? stmt.bind(...params) : stmt;
  await bound.run();
}