// /api/admin/upload — accepts JSON { filename, contentType, base64, folder? }
//   → stores in R2 bucket nhs-bagodar-files, returns { url, key, size }

interface Env {
  FILES: R2Bucket;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Auth check via cookie
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/nhs_admin_session=([^;]+)/);
  if (!m) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const token = m[1];
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = JSON.parse(atob(payload));
    if (!data.username || !data.exp || Date.now() > data.exp) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!env.FILES) return Response.json({ error: "R2 not bound" }, { status: 503 });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const filename = String(body.filename || "");
  const contentType = String(body.contentType || "application/octet-stream");
  const base64 = String(body.base64 || "");
  const folder = String(body.folder || "uploads");
  if (!filename || !base64) {
    return Response.json({ error: "filename and base64 are required" }, { status: 400 });
  }

  // Decode base64 → ArrayBuffer
  let bytes: ArrayBuffer;
  try {
    // Strip data URL prefix if present
    const cleaned = base64.replace(/^data:[^;]+;base64,/, "");
    const binary = atob(cleaned);
    const len = binary.length;
    const buf = new Uint8Array(len);
    for (let i = 0; i < len; i++) buf[i] = binary.charCodeAt(i);
    bytes = buf.buffer;
  } catch (e) {
    return Response.json({ error: "Invalid base64" }, { status: 400 });
  }

  // Build a unique key — flat (no slashes) because Pages Functions single-segment [key] routing
  // replaces / with _ to keep the file addressable
  const ts = Date.now();
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  // Encode any folder prefix into the key itself
  const folderPrefix = folder ? folder.replace(/[^a-zA-Z0-9_-]/g, "_") + "_" : "";
  const key = `${folderPrefix}${ts}-${safe}`;

  try {
    await env.FILES.put(key, bytes, {
      httpMetadata: { contentType },
    });
  } catch (e: any) {
    return Response.json({ error: "Upload failed: " + String(e?.message || e) }, { status: 500 });
  }

  // Public URL — works once the bucket has public access enabled
  // For now, return the key so the admin form can show "uploaded" state
  return Response.json({
    ok: true,
    key,
    url: `/api/files/${key}`,  // served by our proxy Function below
    size: bytes.byteLength,
    contentType,
  });
};