// /api/files/[...key] — public proxy to R2 bucket
//   Returns the object body with the right content-type.
//   This lets the site serve R2 files without needing public bucket access.

interface Env {
  FILES: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  if (!env.FILES) return new Response("R2 not bound", { status: 503 });
  const key = (params as any).key;
  const keyStr = Array.isArray(key) ? key.join("/") : String(key || "");
  if (!keyStr) return new Response("Missing key", { status: 400 });

  try {
    const obj = await env.FILES.get(keyStr);
    if (!obj) return new Response("Not found", { status: 404 });
    const headers = new Headers();
    if (obj.httpMetadata?.contentType) {
      headers.set("content-type", obj.httpMetadata.contentType);
    }
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", "public, max-age=3600");
    return new Response(obj.body, { status: 200, headers });
  } catch (e: any) {
    return new Response("Fetch failed: " + String(e?.message || e), { status: 500 });
  }
};