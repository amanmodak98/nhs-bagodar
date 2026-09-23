// GET    /api/admin/notices   → list
// POST   /api/admin/notices   → create
// PUT    /api/admin/notices   → update
// DELETE /api/admin/notices   → delete

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

function jsonResponse(data: any, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return jsonResponse({ error: "Unauthorized" }, 401);
  if (!env.DB) return jsonResponse({ error: "DB not bound" }, 503);
  const rows = await env.DB.prepare(
    "SELECT id, title, category, body, file_url as fileUrl, is_active as isActive, publish_date as publishDate, created_at as createdAt FROM notices ORDER BY publish_date DESC, id DESC"
  ).all<any>();
  return jsonResponse({ items: rows.results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return jsonResponse({ error: "Unauthorized" }, 401);
  if (!env.DB) return jsonResponse({ error: "DB not bound" }, 503);
  const body: any = await request.json();
  const res = await env.DB.prepare(
    "INSERT INTO notices (title, category, body, file_url, is_active, publish_date) VALUES (?, ?, ?, ?, ?, ?) RETURNING id"
  ).bind(
    String(body.title || ""),
    String(body.category || "general"),
    String(body.body || ""),
    body.fileUrl ? String(body.fileUrl) : null,
    body.isActive ? 1 : 0,
    String(body.publishDate || new Date().toISOString().slice(0, 10)),
  ).first<{ id: number }>();
  return jsonResponse({ ok: true, id: res?.id });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return jsonResponse({ error: "Unauthorized" }, 401);
  if (!env.DB) return jsonResponse({ error: "DB not bound" }, 503);
  const body: any = await request.json();
  await env.DB.prepare(
    "UPDATE notices SET title=?, category=?, body=?, file_url=?, is_active=?, publish_date=? WHERE id=?"
  ).bind(
    String(body.title || ""),
    String(body.category || "general"),
    String(body.body || ""),
    body.fileUrl ? String(body.fileUrl) : null,
    body.isActive ? 1 : 0,
    String(body.publishDate || new Date().toISOString().slice(0, 10)),
    Number(body.id),
  ).run();
  return jsonResponse({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return jsonResponse({ error: "Unauthorized" }, 401);
  if (!env.DB) return jsonResponse({ error: "DB not bound" }, 503);
  const body: any = await request.json();
  await env.DB.prepare("DELETE FROM notices WHERE id = ?").bind(Number(body.id)).run();
  return jsonResponse({ ok: true });
};