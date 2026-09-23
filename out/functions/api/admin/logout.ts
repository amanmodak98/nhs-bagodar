// POST /api/admin/logout → clears session cookie
export const onRequestPost: PagesFunction = async () => {
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", "nhs_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  return res;
};
export const onRequest = onRequestPost;