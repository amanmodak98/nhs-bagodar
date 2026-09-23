// GET    /api/admin/faculty → list
// POST   /api/admin/faculty → create
// PUT    /api/admin/faculty → update
// DELETE /api/admin/faculty → delete

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
    "SELECT id, name, designation, qualification, subject, joined_year as joinedYear, image_url as imageUrl, order_index as orderIndex FROM faculty ORDER BY order_index ASC, id ASC"
  ).all<any>();
  return Response.json({ items: rows.results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  const res = await env.DB.prepare(
    "INSERT INTO faculty (name, designation, qualification, subject, joined_year, image_url, order_index) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id"
  ).bind(
    String(b.name || ""),
    String(b.designation || "TGT"),
    String(b.qualification || ""),
    String(b.subject || ""),
    Number(b.joinedYear) || new Date().getFullYear(),
    b.imageUrl ? String(b.imageUrl) : null,
    Number(b.orderIndex) || 99,
  ).first<{ id: number }>();
  return Response.json({ ok: true, id: res?.id });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  await env.DB.prepare(
    "UPDATE faculty SET name=?, designation=?, qualification=?, subject=?, joined_year=?, image_url=?, order_index=? WHERE id=?"
  ).bind(
    String(b.name || ""),
    String(b.designation || "TGT"),
    String(b.qualification || ""),
    String(b.subject || ""),
    Number(b.joinedYear),
    b.imageUrl ? String(b.imageUrl) : null,
    Number(b.orderIndex),
    Number(b.id),
  ).run();
  return Response.json({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  await env.DB.prepare("DELETE FROM faculty WHERE id = ?").bind(Number(b.id)).run();
  return Response.json({ ok: true });
};