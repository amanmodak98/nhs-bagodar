// GET /api/faculty — PUBLIC list of faculty records, ordered by orderIndex.
// Used by the home page spotlight and the /faculty public directory.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return Response.json({ items: [] });
  try {
    const rows = await env.DB.prepare(
      "SELECT id, name, designation, qualification, subject, joined_year as joinedYear, image_url as imageUrl, order_index as orderIndex FROM faculty ORDER BY order_index ASC, id ASC"
    ).all<any>();
    return Response.json({ items: rows.results ?? [] });
  } catch {
    return Response.json({ items: [] });
  }
};
