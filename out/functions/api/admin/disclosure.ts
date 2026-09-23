// GET    /api/admin/disclosure → list
// POST   /api/admin/disclosure → create
// DELETE /api/admin/disclosure → delete

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

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const rows = await env.DB.prepare(
    "SELECT id, document_title as documentTitle, category, description, file_url as fileUrl, updated_at as updatedAt FROM disclosures ORDER BY updated_at DESC"
  ).all<any>();
  return Response.json({ items: rows.results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  const res = await env.DB.prepare(
    "INSERT INTO disclosures (document_title, category, description, file_url, updated_at) VALUES (?, ?, ?, ?, ?) RETURNING id"
  ).bind(
    String(b.documentTitle || ""),
    String(b.category || "general"),
    b.description ? String(b.description) : null,
    String(b.fileUrl || ""),
    String(b.updatedAt || new Date().toISOString().slice(0, 10)),
  ).first<{ id: number }>();
  return Response.json({ ok: true, id: res?.id });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  await env.DB.prepare("DELETE FROM disclosures WHERE id = ?").bind(Number(b.id)).run();
  return Response.json({ ok: true });
};