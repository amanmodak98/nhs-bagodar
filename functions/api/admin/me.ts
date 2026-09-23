// GET /api/admin/me → { username } | 401

interface Env {
  ADMIN_SESSION_SECRET?: string;
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestGet: PagesFunction<Env> = async ({ request }) => {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/nhs_admin_session=([^;]+)/);
  if (!m) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const token = m[1];
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return Response.json({ error: "Unauthorized" }, { status: 401 });
  // We accept the existing simple HS256 scheme
  try {
    const data = JSON.parse(atob(payload));
    if (!data.username || !data.exp || Date.now() > data.exp) {
      return Response.json({ error: "Expired" }, { status: 401 });
    }
    return Response.json({ username: data.username });
  } catch {
    return Response.json({ error: "Invalid" }, { status: 401 });
  }
};
