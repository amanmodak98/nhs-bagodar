# National High School, Bagodar — Website

Production website + admin panel for **National High School**, Main Road, Dama, Aoura (Aura), Bagodar, Giridih, Jharkhand — 815322.

Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployable to Cloudflare Pages with D1 + R2 bindings.

---

## Quick start (local development)

```bash
npm install
cp .env.example .env.local
npm run dev
# open http://localhost:3000
```

The site renders against in-memory mock data by default — no Cloudflare account required to develop.

**Default admin credentials (development only):**

- URL:    `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `nhsbagodar2026`

Change both before deploying.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom design tokens (forest emerald + amber + warm neutrals) |
| Type | Cinzel (display) · Inter (body) · Noto Serif Devanagari (Hindi) |
| Database | Cloudflare D1 (SQLite) — 4 tables: `notices`, `faculty`, `disclosures`, `inquiries` |
| Object storage | Cloudflare R2 — for PDFs, faculty portraits, disclosure attachments |
| Auth | Cookie-signed HMAC-SHA256 session token (Web Crypto, edge-compatible) |

The data layer in `src/lib/db.ts` reads from D1 when `CLOUDFLARE_D1_DATABASE_ID` is set in the environment, and falls back to in-process mock data otherwise. The mock data lives in `src/lib/seed.ts`.

---

## Public site pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, commitments, facilities, life-at-NHS gallery, programmes, notice ticker, annual function spotlight, scholarships, timeline, CTA |
| `/about` | School history, principal's message, commitments, six-year timeline |
| `/academics` | Four-stage programme (Foundational → Secondary), pedagogy |
| `/facilities` | Six facilities with section anchors |
| `/gallery` | Photographs organised by event (Independence Day, Annual Function, Flag-hoisting, Leadership) |
| `/faculty` | Faculty directory table (gazette layout) |
| `/notices` | All notices grouped by category, dated |
| `/disclosure` | Mandatory Public Disclosure — six sections, downloadable PDFs |
| `/contact` | Phone, email, WhatsApp, hours, embedded map |
| `/admissions` | Application form, scholarships, contact |

## Admin routes (`/admin/*` — protected)

| Route | Purpose |
|---|---|
| `/admin/login` | Username + password sign in |
| `/admin` | Dashboard overview |
| `/admin/notices` | Create / archive / delete notices |
| `/admin/faculty` | Add / remove / reorder faculty |
| `/admin/disclosure` | Upload / replace disclosure PDFs |
| `/admin/inquiries` | Track admissions inquiries, filter, export CSV |

---

## Project layout

```
src/
├── app/
│   ├── layout.tsx                # root with fonts, marquee, topbar, navbar, footer
│   ├── page.tsx                  # home
│   ├── globals.css               # design tokens + editorial utilities
│   ├── about/page.tsx
│   ├── academics/page.tsx
│   ├── facilities/page.tsx
│   ├── gallery/page.tsx
│   ├── faculty/page.tsx
│   ├── notices/page.tsx
│   ├── disclosure/page.tsx
│   ├── contact/page.tsx
│   ├── admissions/page.tsx
│   ├── admin/
│   │   ├── layout.tsx           # session guard + AdminShell
│   │   ├── page.tsx              # dashboard
│   │   ├── login/page.tsx
│   │   ├── notices/page.tsx
│   │   ├── faculty/page.tsx
│   │   ├── disclosure/page.tsx
│   │   └── inquiries/page.tsx
│   └── api/
│       ├── inquiries/route.ts
│       ├── admin/login/route.ts
│       ├── admin/logout/route.ts
│       ├── admin/notices/route.ts
│       ├── admin/faculty/route.ts
│       ├── admin/inquiries/route.ts
│       └── admin/disclosure/route.ts
├── components/
│   ├── site/                     # TopBar, NavBar, Footer, Marquee, NoticeTicker, AdmissionForm
│   ├── admin/                    # LoginForm, AdminShell, NoticeManager, FacultyManager, InquiryTracker, DisclosureManager
│   └── ui/Photo.tsx              # warm-grade editorial photo
├── lib/
│   ├── content.ts                # school data: name, motto, programmes, scholarships, timeline
│   ├── types.ts                  # TypeScript types
│   ├── images.ts                 # reads /public/images/ and groups for sections
│   ├── seed.ts                   # mock seed for in-memory dev mode
│   ├── db.ts                     # data access — D1 if bound, mock otherwise
│   └── auth.ts                   # HMAC-signed admin session cookie
└── data/
d1/schema.sql                     # D1 schema (notices, faculty, disclosures, inquiries)
public/images/                    # 117 SEO-named school photographs
wrangler.toml                     # Cloudflare Pages config + D1 + R2 bindings
```

---

## Deploying to Cloudflare Pages + D1 + R2

```bash
# 1. Login
npx wrangler login

# 2. Create the D1 database
npx wrangler d1 create nhs-bagodar-db
# → copy the returned database_id into wrangler.toml

# 3. Apply schema
npx wrangler d1 execute nhs-bagodar-db --file=./d1/schema.sql --remote

# 4. Create the R2 bucket
npx wrangler r2 bucket create nhs-bagodar-files

# 5. Set admin secrets
npx wrangler pages secret put ADMIN_USERNAME
npx wrangler pages secret put ADMIN_PASSWORD
npx wrangler pages secret put ADMIN_SESSION_SECRET

# 6. Deploy
npx wrangler pages deploy .vercel/output/static
```

> **Build adapter**: For Cloudflare Pages deployment from a Next.js project, use [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) or migrate the app to [`OpenNext`](https://opennext.js.org/). The site is fully portable — no Cloudflare-specific code in app or components.

---

## Image library

117 event photographs live in `public/images/`, named for SEO with descriptive stems (`independence-day-rally-banner-front.jpeg`, `annual-function-stage-fairy-costume-lineup-pink-white.jpeg`, etc.). Naming is curated to:

1. Carry semantic content for search engines.
2. Make it obvious to a developer what each image depicts without opening it.
3. Group naturally under category prefixes (`independence-day-`, `annual-function-`, `flag-hoisting-`, `chief-guest-`, `student-`).

---

## Design conventions

- **Palette** — emerald deep `#1b4332` · forest `#2d6a4f` · amber `#b45309` · warm off-white `#fcfbf7` · slate `#334155`. No indigo, violet, or gradient blobs.
- **Type** — Cinzel for English display, Noto Serif Devanagari for Hindi display, Inter for body. No Inter-everywhere.
- **Components** — hairline borders instead of shadow-lg; square corners on buttons (4px max); underline-grow links; tables with black 2px header rule.
- **Motion** — one page-load fade on the hero headline; marquee for the announcement bar. Nothing else animates.
- **Voice** — concrete nouns and dates ("14 April 2021", "₹40 from Bagodar stand"), no "unlock potential" / "world-class" / "future-ready".

---

## Notes for the school office

- Replace `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` in production.
- Replace the Google Maps embed URL (`NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`) with a real one once a Google account is set up for the school.
- PDFs in `/disclosure` are stubs in development; replace with real documents uploaded to R2.
- Set `NEXT_PUBLIC_SITE_URL` to the production URL for canonical metadata.