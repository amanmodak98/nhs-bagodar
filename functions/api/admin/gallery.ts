// /api/admin/gallery
//   GET    → returns a unified list of:
//              - all stems committed in /public/images/ (filesystem)
//              - admin-uploaded R2 images (D1 rows without matching stem)
//            plus their D1 overrides (caption, category, is_published, order_index).
//   POST   → upsert a row by stem (admin edits fields, or adds an R2 row)
//   POST { action: "import-fs" } → seed D1 with rows for every filesystem stem
//                                  whose D1 row is missing. Idempotent.
//   DELETE → remove a D1 row by stem
//
// This file owns the canonical 117-stem list. The admin UI is purely
// a client of this endpoint and learns which stems exist by reading
// `filesystemStems` out of the GET response.

interface Env {
  DB: D1Database;
}

// --- 117 filesystem stems (matches /public/images/*.jpeg) ---
const STATIC_GALLERY_STEMS: readonly string[] = [
  'annual-function-audience-students-seated-canopy-wide',
  'annual-function-audience-students-seated-canopy-wide-2',
  'annual-function-dance-pink-white-wide-01',
  'annual-function-dance-pink-white-wide-02',
  'annual-function-dance-sari-performance',
  'annual-function-dance-white-tshirt-group',
  'annual-function-fairy-costume-hands-crossed',
  'annual-function-fairy-costume-pink-wings',
  'annual-function-fairy-costume-with-white-dress-girl',
  'annual-function-girl-tricolor-sash-salute',
  'annual-function-girls-white-tshirt-tricolor',
  'annual-function-lavender-butterfly-dress',
  'annual-function-pink-saree-costume',
  'annual-function-saree-dance-hands-up',
  'annual-function-saree-dance-wide-shot',
  'annual-function-saree-march-lineup',
  'annual-function-stage-banner-empty-chairs-wide',
  'annual-function-stage-banner-empty-chairs-with-students',
  'annual-function-stage-boy-green-uniform-mic',
  'annual-function-stage-boy-green-uniform-mic-01',
  'annual-function-stage-boy-green-uniform-mic-02',
  'annual-function-stage-boy-green-uniform-mic-03',
  'annual-function-stage-boy-mic-close-up',
  'annual-function-stage-boy-mic-orange-shirt-01',
  'annual-function-stage-boy-mic-orange-shirt-02',
  'annual-function-stage-boy-tricolor-face-paint',
  'annual-function-stage-costume-portrait-white-frilly-dress-sitting',
  'annual-function-stage-elder-blue-shirt-with-student',
  'annual-function-stage-elder-blue-shirt-with-student-pink-dupont',
  'annual-function-stage-elder-yellow-turban-portrait',
  'annual-function-stage-fairy-costume-lineup-pink-white-2',
  'annual-function-stage-fairy-costume-lineup-pink-white-wide',
  'annual-function-stage-fairy-costume-pink-wings-henna-pose',
  'annual-function-stage-fairy-dress-lineup-with-turban-girl-01',
  'annual-function-stage-frilly-dress-lineup-with-ribbons',
  'annual-function-stage-frilly-dress-tricolor-ribbons-kneel',
  'annual-function-stage-girl-green-uniform-speech',
  'annual-function-stage-pink-saree-girl-hand-on-hip',
  'annual-function-stage-pink-saree-portrait-red-fort',
  'annual-function-stage-pink-saree-pose-with-henna',
  'annual-function-stage-saree-dance-lineup-colorful',
  'annual-function-stage-tricolor-sash-group-with-mic',
  'annual-function-stage-tricolor-sash-lineup-01',
  'annual-function-stage-tricolor-sash-lineup-02',
  'annual-function-stage-tricolor-sash-lineup-03',
  'annual-function-stage-tricolor-sash-trio-dance-pose',
  'annual-function-tricolor-sash-dance',
  'bouquet-presentation-with-blazer-guest',
  'chief-guest-bouquet-and-trophy-01',
  'chief-guest-bouquet-green-shirt',
  'chief-guest-bouquet-pink-shirt-01',
  'chief-guest-bouquet-pink-suit',
  'chief-guest-bouquet-presentation-white-sherwani',
  'chief-guest-elder-yellow-turban-stage',
  'chief-guest-handshake-yellow-shawl',
  'chief-guest-memento-presentation',
  'chief-guest-portrait-on-stage',
  'chief-guest-receiving-bouquet-02',
  'chief-guest-speech-microphone',
  'chief-guest-speech-yellow-saree',
  'chief-guest-welcome-bouquet-beige-shirt-and-blue-suit',
  'chief-guest-welcome-bouquet-elderly-bearded-white-kurta',
  'chief-guest-welcome-bouquet-glasses-man-and-pink-suit',
  'chief-guest-welcome-bouquet-man-white-shirt-and-girl-red-saree',
  'chief-guest-welcome-bouquet-man-white-shirt-and-woman-blue-blazer',
  'chief-guest-welcome-bouquet-man-white-shirt-and-woman-blue-blazer-alt',
  'chief-guest-welcome-bouquet-orange-shirt-and-cap',
  'chief-guest-welcome-bouquet-pink-shirt-with-cap-and-black-suit',
  'chief-guest-welcome-bouquet-presentation',
  'chief-guest-welcome-bouquet-white-shawl-and-black-suit',
  'chief-guest-welcome-bouquet-white-shirt-and-black-suit',
  'chief-guest-welcome-bouquet-with-yellow-shawl-01',
  'chief-guest-welcome-bouquet-with-yellow-shawl-02',
  'chief-guest-welcome-bouquet-yellow-shawl',
  'chief-guest-welcome-shawl-embrace-pink-stripe-shirt',
  'chief-guest-welcome-shawl-pink-suit-yellow-scarf',
  'chief-guest-welcome-trophy-memento-orange-shirt-and-cap',
  'chief-guest-welcome-trophy-memento-orange-shirt-and-cap-alt',
  'chief-guest-welcome-white-shawl-blue-shirt-presentation',
  'chief-guest-welcome-white-shawl-ceremony',
  'chief-guest-welcome-with-bouquet',
  'chief-guest-with-bouquet',
  'flag-hoisting-action-rope-pull',
  'flag-hoisting-ceremony-flag-rising-01',
  'flag-hoisting-ceremony-flag-rising-02',
  'flag-hoisting-ceremony-flower-ritual',
  'flag-hoisting-ceremony-salute-wide',
  'flag-hoisting-ceremony-wide-shot',
  'flag-hoisting-chief-guest-salute',
  'flag-hoisting-officials-group',
  'independence-day-assembly-wide-shot',
  'independence-day-rally-banner-front',
  'independence-day-rally-banner-front-02',
  'independence-day-rally-banner-front-03',
  'independence-day-rally-costumed-front',
  'independence-day-rally-marching-back-view',
  'independence-day-rally-street-march',
  'independence-day-rally-students-marching',
  'independence-day-rally-wide-shot-01',
  'independence-day-rally-wide-shot-02',
  'independence-day-rally-wide-shot-03',
  'independence-day-school-girls-portrait',
  'independence-day-school-girls-selfie',
  'independence-day-school-group-01',
  'independence-day-school-group-02',
  'independence-day-school-group-03',
  'independence-day-school-group-with-flag',
  'independence-day-school-tricolor-salute',
  'student-costume-portrait-lavender-gown',
  'student-costume-portrait-white-frilly-dress',
  'student-speech-girl-green-uniform',
  'student-speech-girl-plaid-fist-raised',
  'student-speech-girl-plaid-uniform',
  'student-with-flag-portrait-id-card',
  'student-with-flag-portrait-young-boy',
  'students-assembly-wide-shot',
  'students-gathering-wide-shot',
];

function detectStemCategory(
  stem: string,
): 'independence-day' | 'annual-function' | 'flag-ceremony' | 'leadership' | 'life-at-nhs' {
  if (stem.startsWith('independence-day-')) return 'independence-day';
  if (stem.startsWith('annual-function-')) return 'annual-function';
  if (stem.startsWith('flag-hoisting-')) return 'flag-ceremony';
  if (stem.startsWith('chief-guest-')) return 'leadership';
  return 'life-at-nhs';
}
// --- end stems ---

async function authed(request: Request): Promise<boolean> {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/nhs_admin_session=([^;]+)/);
  if (!m) return false;
  const token = m[1];
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  try {
    const data = JSON.parse(atob(payload));
    return !!(data.username && data.exp && Date.now() <= data.exp);
  } catch {
    return false;
  }
}

function s(v: any) { return v == null || v === "" ? null : String(v); }
function n(v: any): number { const x = Number(v); return Number.isFinite(x) ? x : 0; }

const ALLOWED_CATEGORIES = new Set([
  'independence-day',
  'annual-function',
  'flag-ceremony',
  'leadership',
  'life-at-nhs',
]);

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const { results: rows = [] } = await env.DB.prepare(
    "SELECT id, stem, r2_key as r2Key, category, caption, caption_hi as captionHi, is_published as isPublished, order_index as orderIndex, created_at as createdAt, updated_at as updatedAt FROM gallery_images"
  ).all<any>();

  const byStem = new Map<string, any>();
  for (const r of rows) byStem.set(r.stem, r);

  const items: any[] = STATIC_GALLERY_STEMS.map((stem) => {
    const existing = byStem.get(stem);
    if (existing) return { ...existing, source: "fs" };
    return {
      stem,
      r2Key: null,
      category: detectStemCategory(stem),
      caption: "",
      captionHi: "",
      isPublished: true,
      orderIndex: 0,
      source: "fs",
      isNew: true,
    };
  });

  for (const r of rows) {
    if (!STATIC_GALLERY_STEMS.includes(r.stem)) {
      items.push({ ...r, source: "r2" });
    }
  }

  items.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if (a.orderIndex !== b.orderIndex) return a.orderIndex - b.orderIndex;
    return a.stem.localeCompare(b.stem);
  });

  return Response.json({ items, filesystemStems: STATIC_GALLERY_STEMS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();

  if (b.action === "import-fs") {
    const existing = await env.DB.prepare("SELECT stem FROM gallery_images").all<{ stem: string }>();
    const have = new Set((existing.results ?? []).map((r) => r.stem));
    let inserted = 0;
    for (const stem of STATIC_GALLERY_STEMS) {
      if (have.has(stem)) continue;
      await env.DB.prepare(
        "INSERT INTO gallery_images (stem, category, caption, is_published, order_index) VALUES (?, ?, ?, 1, 0)"
      ).bind(stem, detectStemCategory(stem), "").run();
      inserted++;
    }
    return Response.json({ ok: true, inserted, scanned: STATIC_GALLERY_STEMS.length });
  }

  if (!b.stem || !b.category) {
    return Response.json({ error: "stem and category are required" }, { status: 400 });
  }
  if (!ALLOWED_CATEGORIES.has(b.category)) {
    return Response.json({ error: "invalid category" }, { status: 400 });
  }
  const isPublished = b.isPublished === false || b.isPublished === 0 ? 0 : 1;
  await env.DB.prepare(
    `INSERT INTO gallery_images (stem, r2_key, category, caption, caption_hi, is_published, order_index, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(stem) DO UPDATE SET
       r2_key = excluded.r2_key,
       category = excluded.category,
       caption = excluded.caption,
       caption_hi = excluded.caption_hi,
       is_published = excluded.is_published,
       order_index = excluded.order_index,
       updated_at = datetime('now')`
  ).bind(
    String(b.stem),
    s(b.r2Key),
    String(b.category),
    String(b.caption || ""),
    s(b.captionHi),
    isPublished,
    n(b.orderIndex),
  ).run();
  return Response.json({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await authed(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "DB not bound" }, { status: 503 });
  const b: any = await request.json();
  if (!b.stem) return Response.json({ error: "stem required" }, { status: 400 });
  await env.DB.prepare("DELETE FROM gallery_images WHERE stem = ?").bind(String(b.stem)).run();
  return Response.json({ ok: true });
};
