// GET /api/gallery — PUBLIC list of gallery images, ordered by category then order_index.
// Used by the /gallery page and the homepage spotlight sections.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return Response.json({ items: [] });
  try {
    const rows = await env.DB.prepare(
      "SELECT id, stem, r2_key as r2Key, category, caption, caption_hi as captionHi, is_published as isPublished, order_index as orderIndex FROM gallery_images WHERE is_published = 1 ORDER BY category ASC, order_index ASC, stem ASC"
    ).all<any>();
    return Response.json({ items: rows.results ?? [] });
  } catch {
    return Response.json({ items: [] });
  }
};
