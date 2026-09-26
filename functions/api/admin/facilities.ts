// /api/admin/facilities
//   GET    → list (admin convenience)
//   POST   → upsert (insert new or update existing by id)
//   DELETE → remove by id

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

function s(v: any) { return v == null || v === "" ? null : String(v); }
function n(v: any): number { const x = Number(v); return Number.isFinite(x) ? x : 0; }

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const rows = await env.DB.prepare(
    "SELECT id, name, name_hi as nameHi, description, description_hi as descriptionHi, image_stem as imageStem, image_url as imageUrl, established, order_index as orderIndex, updated_at as updatedAt FROM facilities ORDER BY order_index ASC, id ASC"
  ).all<any>();
  return Response.json({ items: rows.results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  if (!b.id || !b.name || !b.description) {
    return Response.json({ error: "id, name, description are required" }, { status: 400 });
  }
  await env.DB.prepare(
    `INSERT INTO facilities (id, name, name_hi, description, description_hi, image_stem, image_url, established, order_index, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       name_hi = excluded.name_hi,
       description = excluded.description,
       description_hi = excluded.description_hi,
       image_stem = excluded.image_stem,
       image_url = excluded.image_url,
       established = excluded.established,
       order_index = excluded.order_index,
       updated_at = datetime('now')`
  ).bind(
    String(b.id),
    String(b.name),
    s(b.nameHi),
    String(b.description),
    s(b.descriptionHi),
    s(b.imageStem),
    s(b.imageUrl),
    s(b.established),
    n(b.orderIndex),
  ).run();
  return Response.json({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  if (!b.id) return Response.json({ error: "id required" }, { status: 400 });
  await env.DB.prepare("DELETE FROM facilities WHERE id = ?").bind(String(b.id)).run();
  return Response.json({ ok: true });
};
