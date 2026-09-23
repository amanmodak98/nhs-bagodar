# QA Checklist

Run this before declaring any design done. The goal: catch the AI tells.

---

## Information Architecture Smell Test

This is the diagnostic. Run it on any proposed structure.

- [ ] Can you state what this site is for in one sentence without using the word "platform"?
- [ ] Does the homepage make its case in under 30 seconds of scanning?
- [ ] Are there sections that exist because the template had them, not because the content needs them?
- [ ] Does the navigation reflect what the visitor is actually trying to do?
- [ ] Is there a single primary action, or five competing CTAs?
- [ ] If you removed every section and only kept the prose + imagery, would the site still work? (Often yes — that's a smell.)
- [ ] Can a first-time visitor find the phone number within 3 seconds from any page?
- [ ] Does every page answer "where am I?" with breadcrumb, page title, and parent section?

If 3+ fail: the structure is template-driven, not content-driven. Back to the brief.

---

## Final QA Checklist

### 1. COLOR

- [ ] Brand palette has **2–3 colors max**, not 8–12
- [ ] **Neutrals carry the weight** — accents are punctuation, not the page
- [ ] No default `indigo-500` / `violet-500` / `cyan-500` hero buttons
- [ ] If indigo/violet/cyan appears, document why (institutional, medical, brand mandate)
- [ ] Red / yellow / green only used **semantically** (error / warn / success), never decorative
- [ ] **Dark mode is designed**, not inverted — different neutrals, tuned accent saturation, recalibrated contrast
- [ ] All text passes WCAG AA; body text passes AAA
- [ ] No gratuitous gradients — every gradient earns its place
- [ ] Palette holds up in **greyscale** — composition should still feel balanced
- [ ] No rainbow status badges, no neon-on-each-tag

### 2. TYPOGRAPHY

- [ ] Body line-length is **50–80 characters** (use a measure utility)
- [ ] **At least one font has character** — a serif, a display, a condensed, a mono accent
- [ ] Not Inter-everything (or Geist-everything, or Manrope-everything)
- [ ] Hierarchy reads at a glance — **squint test**: H1 / H2 / body / caption must be distinct
- [ ] 3–4 weights max, not the entire family
- [ ] Display sizes are genuinely large (`clamp(2.5rem, 5vw, 4.5rem)`), not just `font-bold`
- [ ] Body font has solid x-height at 16px, not thin/geometric-only
- [ ] Letter-spacing **tightened** on large display, **opened** on small caps
- [ ] Line-height **loose** on display (1.1–1.2), **comfortable** on body (1.5–1.7)
- [ ] Tabular numerals where figures are compared in tables
- [ ] No more than **two type families** in any single view

### 3. LAYOUT

- [ ] Hero is **not centered-everything** — left-aligned, asymmetric, or off-grid
- [ ] No 3-up identical icon grids with circular gradient blobs
- [ ] At least one **editorial moment** — full-bleed image, magazine pull-quote, oversized numeral
- [ ] Whitespace breathes — no crammed sections, no cramped nav
- [ ] **Footer is intentional**: real contact info, real hours, real secondary nav — not a 4-column link farm
- [ ] Grid uses 12-col or asymmetric splits, not three equal columns repeating everywhere
- [ ] At least one **off-grid element** — image that breaks column, sticky note, sidebar
- [ ] Vertical rhythm consistent (4px or 8px baseline)
- [ ] Mobile layout has **personality**, not just stacked desktop
- [ ] No full-screen sections back-to-back-to-back (gives the eye somewhere to rest)

### 4. IMAGERY

- [ ] No stock-photo people pointing at screens / laptops / whiteboards
- [ ] No 3D AI-generated blobs / clay renders / glassmorphic orbs / abstract gradient meshes
- [ ] Use **real photography** OR a defined illustration style (line, risograph, editorial flat)
- [ ] Image treatment is **consistent** — every photo shares a grade, every illustration shares a style
- [ ] No raw Unsplash URLs visible in the markup (`photo-1234567890-abcdef.jpg`)
- [ ] Aspect ratios match role — square avatars, 16:9 hero, 4:5 portraits
- [ ] `alt` text **describes** the image; decorative images are `aria-hidden`
- [ ] No floating product-on-white-background unless it's an explicit e-commerce treatment
- [ ] Images lazy-loaded; modern formats (WebP / AVIF) with fallbacks
- [ ] Faces in imagery are diverse and real-context, not model-library smile-and-diverse
- [ ] No rounded images
- [ ] No drop shadows on photos
- [ ] **No gradient overlay** (`bg-gradient-to-r from-black/70 to-transparent`) on hero photos

### 5. COMPONENTS

- [ ] Not every button is `rounded-full gradient glow`
- [ ] Not every card has `shadow-lg` — most should be flat, hairline-bordered, or 1px solid
- [ ] **Focus states are visible** — outline, ring, or strong contrast, never just "removed default"
- [ ] Buttons look **pressable** — slight depression on `:active`, not float-on-hover-only
- [ ] Cards have hierarchy — primary / secondary / tertiary weight, not identical twins
- [ ] Form inputs visually distinct from text — border, tint, padding
- [ ] No neumorphic soft shadows unless it is a deliberate brand choice (it almost never should be)
- [ ] Modals feel solid — backdrop, scale-in, not pop-from-nothing
- [ ] Skeleton / empty / error states **designed**, not blank or default
- [ ] Badges / pills / chips used sparingly — not on every list item
- [ ] No `backdrop-blur` over content (frosted nav, glass cards)

### 6. INTERACTION

- [ ] No bouncy springs everywhere — no `cubic-bezier(0.68, -0.55, 0.27, 1.55)` on every element
- [ ] Motion duration **respects distance** — 150ms for small, 300–500ms for big
- [ ] Easing is mostly `ease-out`, occasional `ease-in-out`, never `linear` for UI motion
- [ ] Hover states give feedback (color shift, underline, lift) but **don't animate heavily**
- [ ] Scroll-trigger only on hero / key moments, not on every section
- [ ] `prefers-reduced-motion` fully respected
- [ ] Loading states match the layout — no generic spinners
- [ ] No infinite carousels, no auto-rotating testimonials
- [ ] Page transitions are **quiet** — fade or nothing, not slide-and-rotate
- [ ] No cursor follower, no magnetic buttons, no click-ripple effects (decorative gimmicks)
- [ ] **≤1 entrance animation per page load**

### 7. COPY

- [ ] No "Welcome to the future" / "Empowering tomorrow" / "Innovative solutions"
- [ ] No "We are passionate about..." / "Our mission is to..." filler
- [ ] **Voice is consistent** across the page — same register, same POV
- [ ] Headlines say something **specific** — no "The platform for modern teams"
- [ ] CTAs are verbs with consequence — "Get the syllabus", not "Learn more"
- [ ] No three-word buzzword stacks ("Fast. Scalable. Reliable.")
- [ ] Microcopy is human — "Saved", not "Successfully saved!"
- [ ] Error messages tell users **what to do**, not what failed
- [ ] No "AI-powered" claims unless it actually is
- [ ] Brand name and proper nouns spelled correctly **everywhere** (legal, footer, meta)
- [ ] Every section ends on a date, number, file, name, or place
- [ ] Indian English: ₹ symbol, lakh-crore numerals, dates spelled (`14 November 2026`)

### 8. THE "AI-LOOKING?" SNAPPED TEST

Ask honestly, with no context, no brand briefing:

- [ ] If you showed this to someone cold, would they say **"AI made this"**?
- [ ] Is there at least one element a human designer would defend as a deliberate choice?
- [ ] Could a critic find **three specific things** to praise about taste, not just function?
- [ ] Does it look like a **specific company made it** — or a template generator?
- [ ] Strip the logo. Does the design still feel like it has a point of view?
- [ ] Does the typography feel **curated** or default?
- [ ] Does the imagery feel **commissioned** or scraped?
- [ ] Could you defend every component choice in two sentences?

If 3+ checks fail: it is not done.

### 9. THE "INSTITUTIONAL TRUST" TEST

For school, civic, healthcare, government, religious, and other gravity-of-holders sites:

- [ ] Would a **parent or administrator** take this seriously?
- [ ] Does it honor the **gravity** of the institution — not playful when the topic is not playful
- [ ] Contact information is **real, complete, findable** in under 3 seconds from any page
- [ ] Accessibility info, language access, and ADA contact visible
- [ ] No stock-photo students smiling in a lab — use real campus / real people (or honest illustration)
- [ ] Accreditation, legal, and policy pages linked from the footer
- [ ] Tone is **measured** — confident without hype, warm without corn
- [ ] No "disrupt" / "revolutionize" / "next-generation" language on a school site
- [ ] Forms are labeled clearly; phone, address, and email offered as alternatives to digital forms
- [ ] Read-aloud test: would a staff member be comfortable if a **board member** shared the homepage publicly?

### 10. THE 15 SPECIFIC ANTI-AI RED FLAGS

These are the tells. If any appear, **fix before shipping**.

- [ ] **Hero with centered headline + centered subhead + centered CTA + centered gradient orb behind text** — the canonical AI hero. Left-align, break the symmetry.
- [ ] **"Trusted by 10,000+ companies" with 5 greyed-out fake logos** — kill it. Use real logos or none.
- [ ] **3-up feature grid: icon-in-circle-gradient + bold title + 1-line description** × 3 — every AI site has this. Use varied layouts.
- [ ] **Pricing table with 3 columns, middle one highlighted "Most Popular"** — almost always AI. Differentiate pricing differently.
- [ ] **Floating rounded badges** ("New!", "Beta", "AI") **on every card** — restraint or remove.
- [ ] **Generic metrics row** ("2x faster", "99% uptime", "10k users") with no source — either prove it or cut it.
- [ ] **Testimonial carousel with stock-headshot faces** — no name, no company logo, no date. Real quote with attribution or nothing.
- [ ] **3D abstract gradient mesh in the hero** (the purple-pink-cyan blob) — replace with real image or strong typography.
- [ ] **"Book a demo" CTA repeated 4× per page** with no other path — offer real value too.
- [ ] **Footer with 5 columns of links including a sitemap nobody uses** — design a real footer with real content.
- [ ] **Dashboard preview screenshot from a fictional product** — show real product or no product.
- [ ] **"Welcome to the future of X" headline** — write what this is actually for, in plain language.
- [ ] **Every card has the same shadow, radius, padding, hover effect** — vary the components, give the page texture.
- [ ] **Glassmorphism everywhere** (blur + transparency + thin border on every surface) — pick one moment or none.
- [ ] **Cursor-following glow / magnetic buttons / parallax-on-scroll-on-everything** — the AI "wow" package. Remove all of it unless serving a specific moment.
- [ ] **The same 6 colors rotated as "brand variants"** with no clear hierarchy — commit to a palette.
- [ ] **Open Sans / Roboto / Inter with no personality partner** — pick a display face or a serif and commit.

---

## Final Gate

Before you ship:

- [ ] All 9 sections checked
- [ ] At least **3 anti-AI red flags** were caught and fixed during the build, not after
- [ ] Design works in **greyscale**
- [ ] Design works at **375px width** without becoming a vertical wall
- [ ] Design works with **images blocked**
- [ ] Design works with **JavaScript disabled** for above-the-fold content
- [ ] One human who was not in the build session has looked at it

If the final gate passes, ship. If not — back to the brief.
