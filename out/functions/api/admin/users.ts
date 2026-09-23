// /api/admin/users — list, create, delete, update

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
    "SELECT id, username, display_name as displayName, role, is_active as isActive, created_at as createdAt, last_login_at as lastLoginAt FROM users ORDER BY created_at ASC"
  ).all<any>();
  // Strip password_hash if it ever leaks through
  return Response.json({ items: rows.results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  const username = String(b.username || "").trim();
  const password = String(b.password || "");
  if (!username || !password) {
    return Response.json({ error: "Username and password required" }, { status: 400 });
  }
  try {
    const res = await env.DB.prepare(
      "INSERT INTO users (username, display_name, role, password_hash, is_active) VALUES (?, ?, ?, ?, ?) RETURNING id"
    ).bind(
      username,
      b.displayName ? String(b.displayName) : username,
      String(b.role || "admin"),
      password, // demo: plain text. production: hash
      b.isActive === false ? 0 : 1,
    ).first<{ id: number }>();
    return Response.json({ ok: true, id: res?.id });
  } catch (e: any) {
    if (String(e?.message || e).includes("UNIQUE")) {
      return Response.json({ error: "Username already exists" }, { status: 409 });
    }
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  // Update password or active state
  if (b.password) {
    await env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(String(b.password), Number(b.id)).run();
  }
  if (b.isActive !== undefined) {
    await env.DB.prepare("UPDATE users SET is_active = ? WHERE id = ?").bind(b.isActive ? 1 : 0, Number(b.id)).run();
  }
  if (b.role) {
    await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?").bind(String(b.role), Number(b.id)).run();
  }
  if (b.displayName) {
    await env.DB.prepare("UPDATE users SET display_name = ? WHERE id = ?").bind(String(b.displayName), Number(b.id)).run();
  }
  return Response.json({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  // Don't delete the default admin
  const row = await env.DB.prepare("SELECT username FROM users WHERE id = ?").bind(Number(b.id)).first<{ username: string }>();
  if (row?.username === "admin") {
    return Response.json({ error: "Cannot delete the default admin user" }, { status: 400 });
  }
  await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(Number(b.id)).run();
  return Response.json({ ok: true });
};