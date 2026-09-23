// /api/files/:key — single-segment key proxy to R2 bucket
// Note: Pages Functions only allow alphanumeric + underscore in param names.
// We store files with flat keys (no slashes) so a single [key] segment works.

interface Env {
  FILES: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  if (!env.FILES) return new Response("R2 not bound", { status: 503 });
  const key = String((params as any).key || "");
  if (!key) return new Response("Missing key", { status: 400 });

  try {
    const obj = await env.FILES.get(key);
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