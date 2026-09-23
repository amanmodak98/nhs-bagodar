// POST /api/admin/login — multi-user login via users table
// GET  /api/admin/login — method not allowed

interface Env {
  DB: D1Database;
  ADMIN_SESSION_SECRET?: string;
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function createToken(username: string, role: string, env: Env): Promise<string> {
  const secret = env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret-please-override";
  const payload = JSON.stringify({ username, role, exp: Date.now() + 8 * 60 * 60 * 1000 });
  const encoded = btoa(payload);
  const sig = await hmac(secret, encoded);
  return `${encoded}.${sig}`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { username?: string; password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  if (!username || !password) {
    return Response.json({ error: "Missing credentials" }, { status: 400 });
  }
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });

  // Look up user
  const user = await env.DB.prepare(
    "SELECT password_hash, role, is_active FROM users WHERE username = ?"
  ).bind(username).first<{ password_hash: string; role: string; is_active: number }>();

  if (!user || !user.is_active || user.password_hash !== password) {
    // Generic error — don't reveal whether the username exists
    return Response.json({ error: "Invalid username or password" }, { status: 401 });
  }

  // Update last login
  await env.DB.prepare("UPDATE users SET last_login_at = ? WHERE username = ?")
    .bind(new Date().toISOString(), username).run().catch(() => {});

  const token = await createToken(username, user.role, env);

  const res = Response.json({ ok: true, role: user.role });
  const cookieOpts = `nhs_admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${8 * 60 * 60}`;
  res.headers.append("Set-Cookie", env.ADMIN_SESSION_SECRET ? `${cookieOpts}; Secure` : cookieOpts);
  return res;
};

export const onRequestGet: PagesFunction<Env> = async () =>
  Response.json({ error: "Method not allowed" }, { status: 405 });