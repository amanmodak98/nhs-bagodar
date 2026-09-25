// GET /api/principal — PUBLIC read of the principal singleton.
// Used by the home page and /about page to render the principal card
// from admin-managed data instead of a hardcoded constant.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return Response.json({});
  try {
    const row = await env.DB.prepare(
      "SELECT id, name, name_hi as nameHi, designation, designation_hi as designationHi, qualification, joined_year as joinedYear, photo_url as photoUrl, message_en as messageEn, message_hi as messageHi, quote_2_en as quote2En, quote_2_hi as quote2Hi, quote_3_en as quote3En, quote_3_hi as quote3Hi, updated_at as updatedAt FROM principal WHERE id = 1"
    ).first<any>();
    if (!row) return Response.json({});
    return Response.json(row);
  } catch {
    return Response.json({});
  }
};
