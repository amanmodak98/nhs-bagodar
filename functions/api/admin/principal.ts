// /api/admin/principal
//   GET    → returns the principal singleton (admin convenience)
//   POST   → upsert the singleton — fields may be partial on first save
//
// There is exactly one principal record (id = 1), managed from
// /admin/principal. No hardcoded principal data anywhere else.

interface Env {
  DB: D1Database;
}

async function authed(request: Request): Promise<boolean> {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/nhs_admin_session=([^;]+)/);
  if (!m) return false;
  const token = m[1];
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  try {
    const data = JSON.parse(atob(payload));
    return !!(data.username && data.exp && Date.now() <= data.exp);
  } catch {
    return false;
  }
}

function s(v: any) { return v == null ? null : String(v); }
function n(v: any): number | null {
  if (v === undefined || v === null || v === "") return null;
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const row = await env.DB.prepare(
    "SELECT id, name, name_hi as nameHi, designation, designation_hi as designationHi, qualification, joined_year as joinedYear, photo_url as photoUrl, message_en as messageEn, message_hi as messageHi, quote_2_en as quote2En, quote_2_hi as quote2Hi, quote_3_en as quote3En, quote_3_hi as quote3Hi, updated_at as updatedAt FROM principal WHERE id = 1"
  ).first<any>();
  return Response.json(row ?? {});
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  if (!b.name || !b.designation) {
    return Response.json({ error: "name and designation are required" }, { status: 400 });
  }
  await env.DB.prepare(
    `INSERT INTO principal (
      id, name, name_hi, designation, designation_hi, qualification, joined_year,
      photo_url, message_en, message_hi, quote_2_en, quote_2_hi, quote_3_en, quote_3_hi, updated_at
    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      name_hi = excluded.name_hi,
      designation = excluded.designation,
      designation_hi = excluded.designation_hi,
      qualification = excluded.qualification,
      joined_year = excluded.joined_year,
      photo_url = excluded.photo_url,
      message_en = excluded.message_en,
      message_hi = excluded.message_hi,
      quote_2_en = excluded.quote_2_en,
      quote_2_hi = excluded.quote_2_hi,
      quote_3_en = excluded.quote_3_en,
      quote_3_hi = excluded.quote_3_hi,
      updated_at = datetime('now')`
  ).bind(
    String(b.name),
    s(b.nameHi),
    String(b.designation),
    s(b.designationHi),
    s(b.qualification),
    n(b.joinedYear),
    s(b.photoUrl),
    s(b.messageEn),
    s(b.messageHi),
    s(b.quote2En),
    s(b.quote2Hi),
    s(b.quote3En),
    s(b.quote3Hi),
  ).run();
  return Response.json({ ok: true });
};
