# Anti-Pattern Catalog

The visual and interaction patterns that make a website LOOK AI-generated. Each section pairs **AVOID** patterns with **USE INSTEAD** alternatives appropriate for institutional/editorial contexts (including Indian school websites).

---

## 1. COLOR

### AVOID (the AI-default palette)

| Hex | Name | Where it appears |
|---|---|---|
| `#3B82F6` | blue-500 | v0 / Lovable / Bolt hero buttons |
| `#6366F1` | indigo-500 | The single most-used AI accent color |
| `#8B5CF6` | violet-500 | The default secondary in every gradient |
| `#A855F7` | purple-500 | Tailwind purple-500 + violet-500 combo |
| `#D946EF` | fuchsia-500 | Pastel AI illustrations |
| `#0EA5E9` | sky-500 | Cyan-to-blue "tech" gradients |
| `#FFD1DC` / `#C7CEEA` / `#B5EAD7` | Midjourney pastel mesh | Decorative hero blobs |
| `#000000` + `#00FF88` / `#8B5CF6` | Pure black + neon | Every "AI startup" landing page |
| `#0A0A1F` / `#0E0E2A` / `#1A1A2E` | Indigo-tinted dark | The AI dark-mode giveaway |

**Forbidden gradients:** `from-indigo-500 to-purple-600`, `from-cyan-400 to-blue-600`, `from-violet-600 to-pink-500`, `bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500`.

**Forbidden combinations:** Tailwind blue-500 + violet-500 (appears on every AI demo). Pick any other two.

### USE INSTEAD

**Editorial / institutional palettes (school-appropriate):**

```
Heritage/Trust:       #1B3A57 (deep navy) + #C9A961 (muted gold) + #F5F1E8 (parchment)
Modern Academic:      #0F4C5C (teal) + #E36414 (burnt orange) + #FAF3E0 (cream)
Botanical/Wellness:   #2D4A2B (forest) + #B85C38 (terracotta) + #F4E8D8 (linen)
Warm Institutional:   #5C2E2B (oxblood) + #D4A574 (sand) + #EFE5D5 (warm white)
Civic/Government:     #003049 (civic blue) + #669BBC (soft sky) + #FDF0E0 (paper)
Heritage Indian:      #800020 (maroon) + #D4AF37 (gold) + #FFF8E7 (off-white)
```

**Rules:**

- Pick ONE primary, ONE secondary, ONE accent. Never three saturated hues.
- Reserve one color for CTAs only.
- Use off-whites (`#FAF8F5`, `#F5F1E8`, `#FDFBF7`) instead of `#FFFFFF`.
- Dark mode: `#1A1A1A` or `#14181C` base, never `#000000`. Never indigo-tinted dark.

→ For 7 complete named palettes (full semantic roles, hex, rationale), see **[color.md](color.md)**.

---

## 2. TYPOGRAPHY

### AVOID (AI-default typography)

- **Inter for everything** (headings + body + buttons) at weight 400/500/600.
- **Pure system-ui** with no character.
- **Roboto across the board** — Google's default for everything.
- **Identical letter-spacing** on every heading (`-0.02em` everywhere).
- **Tailwind classes** `font-sans`, `font-medium`, `text-base` — zero personality.
- **All-caps micro-labels** with `tracking-widest` on every section.
- **Three weights only**: regular, medium, semibold.
- **Variable fonts without thought** — Inter Variable for an entire site.
- **Playfair Display on every "luxury" site** — 2017-on-Tumblr energy.
- **Tight letter-spacing on body text** (looks "designed" but reduces readability).
- **Three different sans-serifs on one page** — visual schizophrenia.
- **All-lowercase body text** — display conceit for portfolios, not institutional content.

### USE INSTEAD

**Ten named pairings** (heading + body):

| # | Pairing | Use for |
|---|---|---|
| 1 | **Editorial Premium** — Playfair Display + Source Serif 4 | Heritage schools, magazines |
| 2 | **Institutional Modern** — Fraunces + Inter | Forward-looking but trustworthy |
| 3 | **Warm Academic** — Lora + IBM Plex Sans | Long-form content, blog, news |
| 4 | **Classic Serif/Geometric** — Cormorant Garamond + Work Sans | Premium feel, awards pages |
| 5 | **Editorial News** — DM Serif Display + Libre Franklin | News/announcements section |
| 6 | **Contemporary Institution** — Newsreader + Manrope | Modern schools, dashboards |
| 7 | **Distinctive Sans** — Hanken Grotesk + Hanken Grotesk | Clean but not Inter |
| 8 | **Heritage Indian** — Spectral + Mukta | Indian school, multilingual |
| 9 | **Utility Neutral** — IBM Plex Serif + IBM Plex Sans | Admin panels, forms, data-heavy |
| 10 | **Editorial Clean** — Bricolage Grotesque + Public Sans | Modern but characterful |

**Rules:**

- Use at most 2 weights per family.
- Headlines: tighter line-height (1.05–1.15). Body: 1.55–1.7.
- Body minimum 16px. Never below 14px.
- Avoid `font-medium` (500) on body — jump 400 → 600 for emphasis.
- Mix serif display + sans body OR vice versa. Never both sans.

→ For 10 named pairings with Google Fonts URLs, full scale/weight rules, and 4 bilingual Devanagari pairings, see **[typography.md](typography.md)**.

---

## 3. LAYOUT

### AVOID (AI-default layouts)

- Centered hero with single H1 + sub + 2 buttons stacked vertically.
- Three-column feature grid with identical icons in circles.
- Four-column "stats" row with huge numbers (10K+, 500+, 99%, 24/7).
- Glassmorphism blob backgrounds with `backdrop-blur-xl` panels.
- Abstract gradient mesh hero with floating geometric shapes.
- Perfectly symmetric 3×3 card grid.
- Bento grid of mixed-size tiles with random rotations.
- Floating particles / dot-grid background on hero.
- "Logo strip" of 6 grayscale company logos immediately under hero.
- Testimonial carousel with stock-photo faces and identical card shapes.
- The 4-column footer (`Quick Links / Resources / Legal / Company`).
- The auto-rotating carousel.
- The "Get Started Free" footer CTA banner.
- Bento grids with random rotations.

### USE INSTEAD

- Asymmetric editorial hero (large headline left, single photographic image right).
- Two-column "what we do" with rich text + supporting image.
- News/announcements list with date + title + excerpt, vertically stacked.
- Featured story layout: one large image + headline + body, magazine-style.
- Magazine grid: 1 large + 2 small articles per row, breaking symmetry.
- Pull quotes with serif treatment between sections.
- Side-by-side image grids with varying heights.
- Long-form landing pages: scroll-driven narrative, not stacked sections.
- Header with horizontal nav + wordmark, not centered logo with stacked links.
- Footer with real hierarchy, not 4-column text sitemap.

**Indian school-specific:**

- Lead with a strong wordmark + tagline, not a gradient mesh.
- Use a marquee/scroll for news ticker (institutional pattern, not AI).
- Photo-led sections: real campus, real students.

→ For 10 layout principles, 5 canonical patterns with ASCII wireframes, the spacing system, and 12 anti-patterns with fixes, see **[layout.md](layout.md)**.

---

## 4. IMAGERY

### AVOID (AI-tell imagery)

- Stock photos of diverse people pointing at glowing screens.
- AI-generated 3D illustrations with pastel gradients and floating geometric shapes.
- Abstract gradient orbs as decorative hero elements.
- "Hero laptop on desk" with coffee cup and plant.
- Generic isometric illustrations of city/office/team.
- Midjourney-style clay render characters with oversized heads.
- Perfect gradient mesh backgrounds with no photographic content.
- Stock handshake photos for "partnerships."
- Smiling diverse students in identical polo shirts (clearly stock).
- 3D abstract shapes (spheres, cubes, torus knots) rotating in hero.
- Hero with `bg-gradient-to-r from-black/70 to-transparent` overlay.
- Head-and-shoulders centered with a thumbs-up.
- Wide group with everyone looking at camera, equal headroom.

### USE INSTEAD

- **Real photography** — campus, students, classrooms, events.
- **Documentary-style black & white** for heritage sections.
- **Archival photographs** for history sections (with grain, color cast).
- **Photojournalism** for events (composition, moment, not posed).
- **Specific stock** (Unsplash editorial, not generic SaaS):
  ```
  Search terms that yield non-AI results:
  - "Indian school classroom documentary"
  - "students studying library editorial"
  - "Jharkhand rural school"
  - "candid classroom india"
  - "black and white school portrait"
  ```
- **Line drawings** (single weight), woodcut-style, or no illustration at all.
- **One signature image** at hero scale (full-bleed photo), not composite illustrations.
- **Photographs with motion blur / imperfect framing** > perfect staged stock.

**Editorial crops:**

- Tight on the moment — a hand holding a trophy, a child's feet mid-dance-step.
- Asymmetric — subject on the left third, looking right into negative space.
- Unconventional aspect ratios — 4:5 (portrait magazine), 3:2 (35mm classic), 2:3 (vertical poster), 21:9 (cinematic banner). Avoid 16:9 and 1:1 as defaults.

→ For the full editorial-vs-stock-vs-AI decision matrix, photo classification audit for 117 photos, 5 image-led layout patterns, cultural dignity rules, and privacy rules for minors, see **[imagery.md](imagery.md)**.

---

## 5. COPY

### AVOID (AI-default copy)

```
"Welcome to the future of education"
"Unlock your potential"
"Empowering tomorrow's leaders"
"Get started in seconds"
"Transform your learning journey"
"Innovative solutions for modern problems"
"Seamless. Powerful. Intuitive."
"Built for the next generation"
"Where ambition meets opportunity"
"Redefining excellence"
"Join 10,000+ students" ← when you have 600
"AI-powered learning platform"
"Built by educators, for educators"
```

### USE INSTEAD

```
"We are a school in Bagodar, Jharkhand, serving 840 students since 1972."
"Classes VI to XII. Hindi and English medium. CBSE affiliated."
"Principal's message: read the latest from Mrs. Sharma."
"Upcoming: Annual Day, 14 November 2026 at 4 PM."
"Admissions open for 2027-28. Apply by 31 January."
"Fee structure 2026-27 (PDF, 84 KB)."
"School timings: 7:30 AM – 2:00 PM, Monday to Saturday."
"Visit us: NH-114, Bagodar, Giridih, Jharkhand 825322."
```

**Rules:**

- Name the place. Name the year. Name the people.
- Specific numbers (840, not "900+").
- Specific dates (14 November, not "soon").
- No metaphors. No abstractions. No invented superpowers.
- Spell out abbreviations once.
- Write the way the principal writes in the school diary.

→ For the full 50 banned phrases, headline formulas, CTA pairs, phrase-shape anti-patterns, and Indian English voice rules, see **[copy-voice.md](copy-voice.md)**.

---

## 6. INTERACTION

### AVOID (AI-default interaction)

- Bouncy spring on every hover (`transition-all duration-300 ease-bounce`).
- Hover-lift on every card (`hover:-translate-y-1`).
- Gradient sweep on every button hover (left-to-right color shift).
- Particle effects / floating dots in background.
- Scroll-triggered animations on every section (fade-in-up).
- Parallax hero images with mouse-move.
- "Magnetic" buttons that follow cursor.
- Number counters that animate from 0 to N on every stats section.
- Continuous rotating badge ("Made with AI ✨").
- Confetti / sparkles on form submit.
- Loading skeletons that pulse (Tailwind `animate-pulse`).
- Page transitions with blur wipes.
- Cursor-following glow.
- Click-ripple effects.

### USE INSTEAD

- Subtle 150–200ms transitions with `ease-out` — no bounce, no spring.
- Underline grow on link hover (`width: 0 → 100%` from left, 200ms).
- Background color shift on button hover, no gradient sweep.
- No particle effects — let the page be still.
- Scroll fade-in sparingly: only on first viewport, not every section.
- No parallax — flat scroll, fast.
- No magnetic buttons — predictable cursor behavior.
- Numbers shown immediately, not animated.
- Spinner / skeleton only where genuinely loading.
- Page transitions: instant or 100ms cross-fade max.

**Motion principles:**

- If everything moves, nothing moves. Animate one thing at a time.
- 80% of hover states should be a color or underline change.
- Reserve motion for: navigation menu open, modal/drawer, image lightbox.

---

## 7. COMPONENTS

### AVOID (AI-default components)

- Pill-shaped buttons with gradient fills (rounded-full + bg-gradient-to-r).
- Identical `shadow-lg` on every card.
- Identical `rounded-2xl` on every container.
- Glassmorphism panels (`backdrop-blur-xl bg-white/30`).
- "Glow ring" around focused inputs (multi-layer shadow).
- Rainbow-border cards (conic-gradient borders).
- Same border-radius everywhere (everything 16px, nothing 4px or 0).
- Solid black/white icons in colored circles.
- Floating action buttons in bottom-right corner.
- Toggle switches with gradient tracks.
- Progress bars with animated stripes.
- Sticky nav with `backdrop-blur-md bg-white/80`.
- Hover lift on every card (`hover:scale-105`, `hover:translate-y-1`).

### USE INSTEAD

- **Buttons**: rectangular (`rounded-md` or 0), solid color, 1px border on hover.
  ```css
  /* Primary */ bg: #1B3A57; hover: bg #152F47; padding: 12px 20px;
     border-radius: 4px; font-weight: 500;
  /* Secondary */ bg: transparent; border: 1px solid #1B3A57; hover: bg #1B3A57; color flip
  ```
- **Cards**: `border: 1px solid #E5E0D5`, no shadow. Or `shadow-sm` max.
- **Border-radius**: vary it. Hero images: 0. Section containers: 8px. Badges/pills: 999px. Inputs: 4px.
- **No glassmorphism** in institutional contexts — it's a 2021–2022 trend that aged out.
- **Inputs**: 1px solid border, 2px solid on focus, no glow.
- **Icons**: 1.5px stroke (Lucide, Phosphor Regular), not solid filled.
- **Tables**: hairline rules, no shadow, vertical borders optional.
- **Chips/tags**: small text, light bg, no border, 4px radius.
- **Modal**: white card on dim backdrop, no blur.

→ For the full anti-pattern → institutional alternative pairing with HTML/CSS code, see **[components.md](components.md)**.

---

## 8. CODE PATTERNS

### AVOID (Tailwind classes that scream AI)

```html
<!-- AVOID: rounded-2xl + shadow-2xl + backdrop-blur on everything -->
<div class="rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl p-8">

<!-- AVOID: gradient on every section -->
<section class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

<!-- AVOID: hover scale on every card -->
<div class="transition-all duration-300 hover:scale-105 hover:shadow-2xl">

<!-- AVOID: bouncy spring -->
<button class="transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]">

<!-- AVOID: glassmorphism panel -->
<div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl">

<!-- AVOID: conic gradient background -->
<div class="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]">

<!-- AVOID: glow shadow ring -->
<input class="focus:ring-4 focus:ring-purple-300 focus:ring-offset-2">

<!-- AVOID: animated gradient text -->
<h1 class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">

<!-- AVOID: rounded-full badges everywhere -->
<span class="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs">

<!-- AVOID: shadow-lg on every component -->
<div class="shadow-lg hover:shadow-2xl transition-shadow">

<!-- AVOID: arbitrary value aesthetic -->
<div class="rounded-[2.5rem] p-[3.25rem]">

<!-- AVOID: text-balance on every heading -->
<h2 class="text-balance text-4xl font-bold tracking-tight">
```

### USE INSTEAD (institutional Tailwind)

```html
<!-- USE: flat border card, no shadow -->
<article class="border border-stone-200 bg-white p-6">

<!-- USE: solid section background -->
<section class="bg-stone-50 border-y border-stone-200 py-16">

<!-- USE: subtle hover, no scale -->
<a class="transition-colors duration-150 hover:text-blue-900">

<!-- USE: simple easing -->
<button class="transition-colors duration-200 ease-out">

<!-- USE: solid panel, no blur -->
<div class="bg-white border border-stone-200">

<!-- USE: solid color text, no gradient clip -->
<h1 class="text-stone-900 text-4xl font-serif font-semibold">

<!-- USE: minimal border-radius, no arbitrary values -->
<span class="border border-stone-300 px-2 py-0.5 text-xs">

<!-- USE: 1px focus ring, no glow -->
<input class="focus:border-stone-900 focus:outline-none focus:ring-0">

<!-- USE: spacing system, not arbitrary -->
<div class="p-6 md:p-8 lg:p-12">

<!-- USE: standard line-height, no text-balance gymnastics -->
<h2 class="text-3xl leading-tight font-semibold">
```

### Tailwind config that ages well

```js
// tailwind.config.js — institutional defaults
{
  theme: {
    extend: {
      colors: {
        // Replace default palette entirely
        ink: '#1A1A1A',
        paper: '#FAF8F5',
        accent: '#1B3A57',
        rule: '#E5E0D5',
        muted: '#6B6660',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        // Override defaults — no rounded-2xl, no rounded-3xl
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        // no '2xl', 'full'
      },
    },
  },
}
```

---

## Quick Diagnostic — Is This Site AI-Generated?

Run through this checklist. **5+ hits = AI-default**.

```
[ ] Inter used for headings AND body
[ ] Tailwind blue/indigo/violet primary
[ ] Centered hero with single H1 + sub + 2 buttons
[ ] Three-column feature grid with icons in circles
[ ] Four-column stats row with huge numbers
[ ] Glassmorphism or gradient mesh on hero
[ ] Pill-shaped buttons with gradient fills
[ ] rounded-2xl + shadow-lg on every container
[ ] Hover-lift or scale on every card
[ ] Scroll-triggered fade-in-up on every section
[ ] "Welcome to the future" / "Unlock potential" copy
[ ] Stock photo of people pointing at screens
[ ] Particle background or floating shapes
[ ] "Get started" / "Sign up free" CTAs (not appropriate context)
[ ] Identical letter-spacing on all headings
```

If you hit 5+ of these, the site will read as AI-generated to anyone familiar with the patterns. The fix is rarely more design — it's **less**: fewer gradients, fewer animations, fewer identical components, more actual content specific to the place and institution.

---

## Summary of Heuristics

1. **Specificity beats aesthetics**. "Mrs. Sharma, Principal since 2019" beats any hero.
2. **Flatness is institutional**. Shadows, gradients, blurs = consumer/SaaS. Borders, whitespace, solid colors = trustworthy.
3. **One typeface family with personality** beats Inter for everything.
4. **Off-white beats white. Black is never the background.**
5. **Animations: ≤1 per page**. Hover state on links/buttons only.
6. **Photos > illustrations > abstract shapes** for school context.
7. **Asymmetric layouts** beat symmetric grids for editorial feel.
8. **Real numbers, real names, real dates** in copy.
9. **Border-radius: 0–8px** for institutional. Save `rounded-full` for actual pills.
10. **When in doubt, do less.**
