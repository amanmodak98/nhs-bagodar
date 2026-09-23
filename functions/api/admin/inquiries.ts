// GET /api/admin/inquiries   → list
// PUT /api/admin/inquiries   → update status

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
    "SELECT id, student_name as studentName, guardian_name as guardianName, phone, email, class_applied as classApplied, message, status, created_at as createdAt FROM inquiries ORDER BY created_at DESC"
  ).all<any>();
  return Response.json({ items: rows.results ?? [] });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  await env.DB.prepare("UPDATE inquiries SET status=? WHERE id=?").bind(String(b.status), Number(b.id)).run();
  return Response.json({ ok: true });
};