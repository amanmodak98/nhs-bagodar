-- National High School, Bagodar — D1 schema
-- Run: wrangler d1 execute nhs-bagodar-db --file=./d1/schema.sql

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS notices (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('admissions','academic','holiday','event','circular','exam','general')),
  body          TEXT NOT NULL,
  file_url      TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  publish_date  TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_notices_active ON notices(is_active, publish_date DESC);

CREATE TABLE IF NOT EXISTS faculty (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  designation    TEXT NOT NULL,
  qualification  TEXT NOT NULL,
  subject        TEXT NOT NULL,
  joined_year    INTEGER NOT NULL,
  image_url      TEXT,
  order_index    INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_faculty_order ON faculty(order_index);

-- Facilities — managed via /admin/facilities; not hardcoded anywhere else.
CREATE TABLE IF NOT EXISTS facilities (
  id              TEXT PRIMARY KEY,        -- slug, e.g. 'smart-classroom'
  name            TEXT NOT NULL,            -- English
  name_hi         TEXT,                     -- Hindi
  description     TEXT NOT NULL,            -- English body
  description_hi  TEXT,                     -- Hindi body
  image_stem      TEXT,                     -- /images/{stem}.jpeg from /public/images/
  image_url       TEXT,                     -- alt: full URL (R2 upload etc.)
  established     TEXT,                     -- year or short text, e.g. '2022'
  order_index     INTEGER NOT NULL DEFAULT 0,
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Gallery — managed via /admin/gallery.
-- 'stem' is the unique key (matches the file in /public/images/ for legacy
-- images, or 'r2:<key>' for admin-uploaded ones). When 'r2_key' is set,
-- the public URL is /api/files/{r2_key} instead of /images/{stem}.jpeg.
CREATE TABLE IF NOT EXISTS gallery_images (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  stem            TEXT UNIQUE NOT NULL,
  r2_key          TEXT,
  category        TEXT NOT NULL CHECK (category IN ('independence-day','annual-function','flag-ceremony','leadership','life-at-nhs')),
  caption         TEXT NOT NULL DEFAULT '',
  caption_hi      TEXT,
  is_published    INTEGER NOT NULL DEFAULT 1,
  order_index     INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON gallery_images(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category, order_index);

-- Principal singleton — id is locked to 1.
-- Managed exclusively via /admin/principal; not hardcoded anywhere in the app.
CREATE TABLE IF NOT EXISTS principal (
-- Managed exclusively via /admin/principal; not hardcoded anywhere in the app.
CREATE TABLE IF NOT EXISTS principal (
  id              INTEGER PRIMARY KEY CHECK (id = 1),
  name            TEXT NOT NULL,
  name_hi         TEXT,
  designation     TEXT NOT NULL,
  designation_hi  TEXT,
  qualification   TEXT,
  joined_year     INTEGER,
  photo_url       TEXT,
  message_en      TEXT,
  message_hi      TEXT,
  quote_2_en      TEXT,
  quote_2_hi      TEXT,
  quote_3_en      TEXT,
  quote_3_hi      TEXT,
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS disclosures (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  document_title  TEXT NOT NULL,
  category        TEXT NOT NULL,
  description     TEXT,
  file_url        TEXT NOT NULL,
  updated_at      TEXT NOT NULL DEFAULT (date('now'))
);
CREATE INDEX IF NOT EXISTS idx_disclosures_updated ON disclosures(updated_at DESC);

CREATE TABLE IF NOT EXISTS inquiries (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  student_name    TEXT NOT NULL,
  guardian_name   TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  class_applied   TEXT NOT NULL,
  message         TEXT,
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','enrolled','closed')),
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at DESC);

CREATE TABLE IF NOT EXISTS downloads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT NOT NULL,
  title_hi      TEXT,
  category      TEXT NOT NULL CHECK (category IN ('admissions','academic','syllabus','book-list','transport','hostel','scholarships','general')),
  description   TEXT,
  file_url      TEXT NOT NULL,
  r2_key        TEXT,
  file_size     INTEGER,
  updated_at    TEXT NOT NULL DEFAULT (date('now'))
);
CREATE INDEX IF NOT EXISTS idx_downloads_updated ON downloads(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_downloads_category ON downloads(category);

CREATE TABLE IF NOT EXISTS users (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  username        TEXT UNIQUE NOT NULL,
  display_name    TEXT,
  role            TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin','editor','viewer')),
  password_hash   TEXT NOT NULL,
  is_active       INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  last_login_at   TEXT
);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Seed the default admin user so login works on first deploy
-- password = 'nhsbagodar2026' (plain text for demo; production should hash)
INSERT OR IGNORE INTO users (username, display_name, role, password_hash, is_active)
VALUES ('admin', 'Administrator', 'admin', 'nhsbagodar2026', 1);

ALTER TABLE notices ADD COLUMN r2_key TEXT;