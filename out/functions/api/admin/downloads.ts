// GET /api/admin/downloads — PUBLIC list (downloads are meant for public consumption)
// POST/PUT/DELETE require authentication

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const rows = await env.DB.prepare(
    "SELECT id, title, title_hi as titleHi, category, description, file_url as fileUrl, r2_key as r2Key, file_size as fileSize, updated_at as updatedAt FROM downloads ORDER BY updated_at DESC"
  ).all<any>();
  return Response.json({ items: rows.results ?? [] });
};

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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  const res = await env.DB.prepare(
    "INSERT INTO downloads (title, title_hi, category, description, file_url, r2_key, file_size, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id"
  ).bind(
    String(b.title || ""),
    b.titleHi ? String(b.titleHi) : null,
    String(b.category || "general"),
    b.description ? String(b.description) : null,
    String(b.fileUrl || ""),
    b.r2Key ? String(b.r2Key) : null,
    Number(b.fileSize) || null,
    String(b.updatedAt || new Date().toISOString().slice(0, 10)),
  ).first<{ id: number }>();
  return Response.json({ ok: true, id: res?.id });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  await env.DB.prepare("DELETE FROM downloads WHERE id = ?").bind(Number(b.id)).run();
  return Response.json({ ok: true });
};