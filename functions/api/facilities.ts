// GET /api/facilities — PUBLIC list, ordered by order_index.
// Used by the /facilities page.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return Response.json({ items: [] });
  try {
    const rows = await env.DB.prepare(
      "SELECT id, name, name_hi as nameHi, description, description_hi as descriptionHi, image_stem as imageStem, image_url as imageUrl, established, order_index as orderIndex, updated_at as updatedAt FROM facilities ORDER BY order_index ASC, id ASC"
    ).all<any>();
    return Response.json({ items: rows.results ?? [] });
  } catch {
    return Response.json({ items: [] });
  }
};
