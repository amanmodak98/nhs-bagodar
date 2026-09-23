// POST /api/inquiries → create public inquiry
interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const body: any = await request.json();
  const studentName = String(body.studentName || "").trim().slice(0, 200);
  const guardianName = String(body.guardianName || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 30);
  const classApplied = String(body.classApplied || "").trim().slice(0, 30);
  const email = body.email ? String(body.email).trim().slice(0, 200) : null;
  const message = body.message ? String(body.message).trim().slice(0, 2000) : null;
  if (!studentName || !guardianName || !phone || !classApplied) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  const res = await env.DB.prepare(
    "INSERT INTO inquiries (student_name, guardian_name, phone, email, class_applied, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'new', ?) RETURNING id"
  ).bind(
    studentName,
    guardianName,
    phone,
    email,
    classApplied,
    message,
    new Date().toISOString(),
  ).first<{ id: number }>();
  return Response.json({ ok: true, id: res?.id });
};