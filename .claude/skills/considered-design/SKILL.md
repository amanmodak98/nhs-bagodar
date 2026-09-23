---
name: considered-design
description: Build websites, landing pages, and marketing surfaces that look professional, modern, and decidedly non-generic. Activates for design, redesign, polish, or review work on editorial, brand, institutional, or premium commercial sites — anywhere the user wants output that does NOT read as AI defaults (purple gradients, glass cards, identical SaaS layouts, lorem-ipsum voice). Use when the user asks to make a site look "considered", "editorial", "real", "institutional-grade", "premium", "like a magazine", or explicitly anti-AI. Do NOT use for quick mockups, internal tools, admin dashboards, or when the user explicitly asks for AI-default aesthetic.
---

# Considered Design

> Build websites that look professional, modern, **decidedly NOT AI-generated**. For editorial, institutional, brand, and premium commercial work where generic AI output is unacceptable.

## The Manifesto

Every AI design tool — ChatGPT, Claude, v0, Cursor, Bolt, Lovable, Midjourney — converges on the same visual language: indigo/violet gradients, Inter for everything, centered hero sections, three-column feature grids with identical icons, rounded-2xl cards with shadow-lg, glassmorphism blobs, stock-photo people pointing at screens. It looks like AI because it IS AI.

This skill exists to break that convergence. Not for the sake of "different" — that's its own cliché. For **considered**: every choice has a reason; the brand's context drives the design; typography, color, layout, and imagery all do specific work.

**Three commitments:**

1. **Derive, don't default.** Every palette, font, and layout pattern derives from the brand's context — industry, audience, geography, culture, history. Start from the brand; never start from "what does AI usually do."
2. **Restraint over decoration.** Most AI-looking sites are overdesigned — too many effects, too many gradients, too many icons. Good design is what you remove.
3. **Real over generated.** Use real photography, real text, real data. Stock photos and AI illustrations are a last resort, not a default.

---

## How to Use This Skill

### Step 1 — Pick a reference tradition

Before designing anything, name the tradition you're working in. State it in one line:

| Tradition | Voice | Use when |
|---|---|---|
| **Editorial (NYT, FT, Monocle)** | Long-form, typographic, restrained | Journalism, magazines, foundations, think tanks |
| **Institutional (museum, civic)** | Sober, hierarchical, complete | Schools, hospitals, courts, public service |
| **Editorial-craft (Aperture, Criterion)** | Curatorial, image-led, quiet | Design studios, galleries, museums, archives |
| **Premium commercial (Aesop, Hermès)** | Restrained, material, sensory | Hospitality, fashion, fine goods, restaurants |
| **Tech-editorial (Stripe Press, Linear)** | Precise, technical, considered | Software companies that want craft, not SaaS |
| **Indian institutional (KVS, NCERT, ASI)** | Bilingual, formal, dated | Government, public-sector, schools, civic |

Pick ONE. Don't hybridize. State it before designing and let it govern every subsequent choice.

### Step 2 — Apply the seven sections

Each section below has a one-paragraph principle plus a pointer to a detailed reference file. Read the reference file before making decisions in that section.

| # | Section | Principle in one line |
|---|---|---|
| 1 | **Color** | 2–3 brand colors + neutrals. No indigo/violet/cyan without justification. |
| 2 | **Typography** | Two families: one with character. Never Inter-everything. |
| 3 | **Layout** | Asymmetric, type-led, editorial. Never three identical icon cards. |
| 4 | **Imagery** | Real photography, art-directed. Never stock people or AI faces. |
| 5 | **Components** | Quiet infrastructure. Borders, hairlines, solid colors. |
| 6 | **Motion** | Functional only. ≤1 entrance animation per page. |
| 7 | **Copy & voice** | Specific, honest, dated. End every section on a noun that is a date, number, file, name, or place. |

### Step 3 — Run the smell test before declaring done

Two final checks. Both must pass.

- **[IA smell test](references/qa-checklist.md#information-architecture-smell-test)** — does the structure serve the audience, or the template?
- **[Final QA checklist](references/qa-checklist.md#final-qa-checklist)** — does it pass every anti-AI red flag check?

---

## 1. Color

**Principle.** Color is meaning, not decoration. Every hue does semantic work — brand identity, function, hierarchy — or it doesn't exist. Derive from context (industry, geography, culture, physical materials), never from defaults.

**Forbidden by default.** Indigo/violet/cyan gradients; neon-on-dark; rainbow cards; pure `#FFFFFF` or `#000000`; saffron flood-fill on Indian sites (kitsch, not design); indigo-tinted dark mode (`#0A0A1F`, `#0E0E2A`).

**Recipe.** 1 neutral base (off-white `#FAF7F2` or warm black `#1A1916`). 1 ink (high-contrast text). 1 surface variant (subtle elevation). 1 accent (used sparingly — CTAs, links, dates). That's it.

**The single biggest AI tell:** the indigo→violet→cyan hero gradient. Replace with solid color, single-tone value gradient, or photography.

→ See **[references/color.md](references/color.md)** for 7 named palettes with full hex values (Institutional Warm, Editorial Neutral, Academic Heritage, Civic Trust, Modern Minimal, Cultural Craft, Premium Dark) and the full color-smells audit checklist.

---

## 2. Typography

**Principle.** Type is the brand. Most AI sites fail here — Inter for everything at identical weights, no character, no hierarchy. Two families with contrast is the floor, not the ceiling.

**Forbidden by default.** Inter for both heading and body; system-ui only; Roboto everywhere; identical letter-spacing on every heading; letter-spaced ALL CAPS on body emphasis; three sans-serifs on one page; Playfair Display on every "premium" site.

**Recipe.**
- One **display** face with character — Fraunces, Source Serif 4, Newsreader, EB Garamond, Marcellus, Spectral, IBM Plex Serif, or Tenor Sans.
- One **body** face that pairs — Inter Tight, Source Sans 3, IBM Plex Sans, Karla, Manrope, Work Sans, Mukta (for Devanagari).
- Modular scale at **Major Third (1.250)** or **Perfect Fourth (1.333)**. Pick one.
- Body 16–18px, line-height 1.55–1.65. Headlines tighter (1.05–1.2).
- 3 weights max per page: 400 body, 500 nav/UI, 600 headings.

**For Indian institutional sites with bilingual content:** pair a Latin family with its Devanagari companion — Source Serif 4 + Noto Serif Devanagari; IBM Plex Sans + IBM Plex Sans Devanagari; or Fraunces + Mukta.

→ See **[references/typography.md](references/typography.md)** for 10 named pairings, the modular scale, weight/line-height/letter-spacing rules, anti-patterns, and 4 bilingual pairings.

---

## 3. Layout

**Principle.** Composition is hierarchy + rhythm + negative space, not "12 identical sections in a row." Real editorial sites use one pattern per section with intentional variation.

**Forbidden by default.** Centered hero with H1 + sub + 2 buttons; three-column feature grid with identical icons in circles; "trusted by" logo wall; pricing trio with middle highlighted; four-column footer link farm; perfectly symmetric 3×3 card grid; bento grid of mixed-size tiles for its own sake.

**Recipe.** Asymmetric editorial hero (headline left, image right, off-grid). Magazine spread layouts. Pull quotes. Sticky side-nav for long content. Image-led sections with ONE anchor image, not five equal ones. Modular grids with rhythm — 1 huge → 2 medium → 5 small per section.

**Spacing system.** Base unit **8px**. Named tokens from `space-1` (4px, type only) to `space-11` (192px, once per page max). Section padding minimum 48px.

→ See **[references/layout.md](references/layout.md)** for 10 layout principles, 5 canonical patterns with ASCII wireframes (asymmetric hero, editorial article, image-led, modular data grid, sticky side-nav), the spacing system, type rhythm, and 12 specific anti-patterns to avoid.

---

## 4. Imagery

**Principle.** Real photography, art-directed. With 117 real event photos available, stock imagery is a confession that you don't have the real thing — don't confess.

**Forbidden by default.** Stock-photo people pointing at glowing screens; AI-generated 3D illustrations with pastel gradients; abstract gradient orbs as hero elements; "hero laptop on desk"; Midjourney clay-render characters; smiling diverse students in identical polo shirts (clearly stock); hero photo with `bg-gradient-to-r from-black/70 to-transparent` overlay.

**Recipe.**
- **Cropping** — tight on the moment, asymmetric, unconventional aspect ratios (4:5, 3:2, 21:9 — not 16:9 as default).
- **Treatment** — pick ONE per page and stick to it. For 117 photos: full color with light grade, B&W reserved for a "Portraits" or "Legacy" section.
- **Composition** — 1 anchor → 2 medium → 5 small per section. Use asymmetric grids, not symmetric 3-up.
- **Cultural dignity (Indian context)** — present traditional attire as belonging, not spectacle. Caption by person, not costume. Don't zoom on fabric; zoom on face and expression.
- **Privacy (minors)** — never stamp real names on portraits; opt-in consent; crop to action or back-of-head when consent is unclear; build with the assumption any photo may need to be removed.

→ See **[references/imagery.md](references/imagery.md)** for the editorial-vs-stock-vs-AI decision matrix, photo-classification audit for the 117 photos, 5 image-led layout patterns with wireframes, cultural-context rules for Indian sites, privacy rules for minors, and iconography/illustration guidance.

---

## 5. Components

**Principle.** Components are quiet infrastructure. They earn attention only on interaction.

**Forbidden by default.** Pill buttons with gradient fills; identical `shadow-lg` on every card; identical `rounded-2xl` on every container; glassmorphism panels; conic-gradient borders; "glow ring" around focused inputs; toggle switches with gradient tracks; floating chat bubble.

**Recipe.**
- **Buttons** — solid square (4px radius) for primary CTAs, editorial underline-grow for secondary, ghost outline for tertiary. Reserve `rounded-full` for actual tags/badges.
- **Cards** — hairline border (`border border-[#e5e5e5]`), no shadow. Or `shadow-sm` max. Vary border-radius: hero images 0, sections 8px, badges 999px, inputs 4px.
- **Navigation** — two-tier for institutional sites: utility bar (phone, email, location) above the main nav. No `backdrop-blur` over content. Sticky only when long-form demands it.
- **Forms** — underline-only inputs (no boxes), small-caps labels, generous spacing between fields. Phone field prefixed with `+91 |`. Class/Grade as radio or select. Date of Birth as three selects. Submit label = `Submit Application` not `Submit`.
- **Footer** — white background, address + contact + visit. Real nav as a horizontal sentence. Bottom row: affiliation number, establishment year. Not four columns of "Quick Links / Resources / Legal / Company."
- **Tables** — black 2px header rule, hairline row rules, no hover state. Read like a printed gazette.

→ See **[references/components.md](references/components.md)** for the AI anti-pattern → institutional alternative pairing for buttons, cards, navigation, forms, footers, tables, imagery treatment, interaction details, and motion.

---

## 6. Motion

**Principle.** Motion is feedback, not performance. One entrance animation per page load, max. Everything else static.

**Forbidden by default.** Scroll-trigger fade-up on every section (`whileInView` everywhere); bouncy springs (`cubic-bezier(0.68,-0.55,0.27,1.55)`); hover-lift on every card; gradient sweep on every button; parallax hero; magnetic buttons; number counters animating from 0; confetti on form submit.

**Recipe.**
- **Page load** — one fade-in on the hero headline (600–800ms). That's it.
- **Hover** — color shift on buttons, underline grow on links. Never scale, never lift.
- **Scroll indicators** — functional only: a hairline progress bar at top, current-section underline in nav.
- **Easing** — `cubic-bezier(0.4, 0, 0.2, 1)` or `cubic-bezier(0.16, 1, 0.3, 1)`. Never `linear`, never `bounce`.
- **Timing** — 200ms for color/opacity, 300–400ms for underline grow. Below 200ms feels broken; above 800ms feels slow.
- **`prefers-reduced-motion`** — fully respected.

→ See **[references/components.md §9 Motion](references/components.md)** for full motion restraint rules and the institutional motion summary.

---

## 7. Copy & Voice

**Principle.** Specific beats poetic. Honest beats impressive. End every section on a noun that is a date, a number, a file, a name, or a place.

**Forbidden phrases (50 of them — see reference).** "Unlock your potential." "Empowering tomorrow's leaders." "Welcome to the future of X." "Get started in seconds." "Innovative solutions." "Cutting-edge." "Holistic approach." "Best-in-class." "Synergy." "Revolutionize." "World-class." "Ecosystem." "Crafted with care." "AI-powered." "Smart school." "Future-ready." Forward-thinking." The full list of 50 in the reference.

**Forbidden phrase shapes.** `[Verb] your [noun] with our [noun]`. `Welcome to [X], where [cliché]`. `We are committed to...`. `[Adjective] [noun] for the [adjective] [noun]`. `[Noun] reimagined`.

**Headline formulas that work.**
- Plain noun phrase: `N.H.S. Bagodar. A school.`
- Place + what: `Bagodar, Jharkhand — Class 6 to 12, Hindi medium.`
- Concrete date: `Admissions 2026–27. Last date 14 November.`
- Honest constraint: `Six teachers. 480 students. One building.`
- Question: `How is your child this term?`
- Verb-led: `Read the syllabus, term by term.`

**Living CTAs (vs dead ones).**
- `Apply by 14 November` (not "Get started")
- `Read the syllabus` (not "Learn more")
- `Call the office: 06586-XXXXXX` (not "Contact us")
- `Download the fee structure (PDF)` (not "Explore")
- `See last year's Class 12 results` (not "Discover")

**For Indian institutional sites:** keep Indian English natural. Use ₹ symbol. Lakh-crore numerals. Spell dates (14 November 2026, not 11/14/2026). Honor names fully (`Smt. Prabha Devi, Headmistress` — not `Prabha`, not `Ms. P. Devi`).

→ See **[references/copy-voice.md](references/copy-voice.md)** for the 50 banned phrases, headline formulas with examples, body copy patterns, CTA pairs, Indian English voice rules, phrase-shape anti-patterns, and what to do instead.

---

## Final Gate

Before declaring done:

1. Run the **[IA smell test](references/qa-checklist.md#information-architecture-smell-test)** — does the structure serve the audience?
2. Run the **[Final QA checklist](references/qa-checklist.md#final-qa-checklist)** — pass every anti-AI red flag?
3. At least 3 anti-AI red flags caught and fixed during the build, not after.
4. Works in **greyscale**, at **375px width**, with **images blocked**, with **JavaScript disabled** above the fold.
5. One human outside the build session has looked at it.

If any fail: back to the brief.

---

## Activation Decision

```
IF request is to design / redesign / polish a website
   AND the surface is marketing, brand, editorial, institutional, or portfolio
      AND the user signals quality intent
         ("professional", "premium", "considered", "real", "editorial",
          "institutional", or explicitly anti-AI)
      THEN activate considered-design

ELSE IF request is a quick mockup, internal tool, B2B SaaS product UI,
          or explicit request for AI-default aesthetic
   THEN do not activate

ELSE IF request is a design audit / review
   ("does this look AI?", "why does this feel generic?", "audit the design")
   THEN activate considered-design in audit mode (load references/anti-patterns.md first)
```

## Reference Files

- **[references/anti-patterns.md](references/anti-patterns.md)** — the AI-default tells catalog (color, type, layout, imagery, interaction, components, copy)
- **[references/color.md](references/color.md)** — 7 named palettes with full hex values + color-smells audit
- **[references/typography.md](references/typography.md)** — 10 named pairings + scale + bilingual Devanagari
- **[references/layout.md](references/layout.md)** — 10 principles + 5 canonical patterns + spacing system
- **[references/components.md](references/components.md)** — buttons, cards, nav, forms, footers, tables, motion
- **[references/imagery.md](references/imagery.md)** — photography, cropping, treatment, cultural dignity, privacy
- **[references/copy-voice.md](references/copy-voice.md)** — 50 banned phrases, headline formulas, CTA pairs, Indian English
- **[references/qa-checklist.md](references/qa-checklist.md)** — IA smell test + final QA checklist + 15 specific red flags
