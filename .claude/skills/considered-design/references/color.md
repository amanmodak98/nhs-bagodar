# Color

## Manifesto

1. **Color is meaning, not decoration.** Every hue does semantic work — brand identity, function, hierarchy. Decoration-only colors signal AI.
2. **Derive from context, never defaults.** Industry, audience, geography, history, physical materials must drive selection. Indigo is not "tech." Saffron is not "Indian." Defaults are lazy.
3. **Restraint is craft.** Two to three brand hues plus four to six neutrals. Restraint signals editorial confidence. More than five chromatic colors signals committee design.
4. **Reject the AI palette fingerprint.** Indigo→violet→cyan gradients, neon-on-dark SaaS glow, Tailwind blue-500 + violet-500, glassmorphism rainbow — these are signatures. Run from them.
5. **Cultural colors demand cultural discipline.** Saffron, madder, indigo, peacock, brass are rich anchors. Use as accents and type, never as full-bleed floods. Pair with raw neutrals (stone, paper, undyed cotton, iron-gall ink) — never with corporate sans-serif pop.
6. **Mode is a product decision.** Dark mode suits editorial, cinema, late-night tools, design portfolios. Light mode suits commerce, civic, institutional, daytime reading. Choose deliberately; do not ship both by default.
7. **Test in context, not in isolation.** A swatch lies. Every color must survive body-text contrast, hover, error/success, dark mode, and WCAG AA (4.5:1 body, 3:1 large).

## Derivation Workflow

1. **Read the brand's ground truth.** What physical materials does this institution live in? Paper, terracotta, brass, sandalwood, ink, vellum, kraft, cotton, brick. Let those drive hues.
2. **Identify the cultural register.** South Asian institutional sites default to saffron kitsch — reject that. Look at: archival prints, museum signage, regional craft, civic document tradition, building material.
3. **Pick one primary** from ground truth. Verify it isn't on the AI-fingerprint list. Check against the audience's age and context.
4. **Pick one secondary** — adjacent on the wheel, not random. Bridge color.
5. **Pick one accent** for action. Highest chroma of the set. Use sparingly — CTAs, links, badges, dates.
6. **Build four to six neutrals.** Warm or cool depending on primary's temperature. Always include a paper-white (warmer than `#FFFFFF`) and an ink-black (warmer than `#000000`).
7. **Map semantics.** heading → primary; body → neutral-900; link → primary-600 or accent; danger → desaturated red; success → desaturated green; muted → neutral-500.
8. **Build dark mode by inverting value, not hue.** Same brand hues, lighter/darker values. Warm darks, never indigo-tinted darks.
9. **Run the color-smell audit** at the bottom of this file.

---

## Named Palettes

### 1. Institutional Warm

**Use:** schools, NGOs, government-adjacent, civic India, family businesses.

| Token | Hex | Role |
|---|---|---|
| primary | `#6B4423` | warm earth brown — masthead, headings |
| secondary | `#B8956A` | sand / wheat — subheads, dividers |
| accent | `#C44536` | madder red — CTAs, dates, stamps |
| paper | `#FAF7F2` | page background |
| kraft | `#E8E0D5` | cards, panels |
| ink | `#4A3C2E` | body text |
| deep | `#2A2622` | footer, heavy text |

**Semantic:** heading `primary`; body `ink`; link `accent`; danger `#9C2A26`; success `#3F6B3A`.

**Rationale:** Warmth signals trust, longevity, grounded institution. Madder red is the historic "Indian red" of records, stamps, civic documents — accent only, never flood. Desaturated, never AI-bright. Pairs naturally with Devanagari and serif type.

---

### 2. Editorial Neutral

**Use:** magazines, journals, content sites, museums, longform blogs.

| Token | Hex | Role |
|---|---|---|
| primary | `#1A1A1A` | ink black — headings |
| secondary | `#6B6B6B` | graphite — captions, meta |
| accent | `#C53030` | vermillion — links, pull-quotes |
| newsprint | `#FAFAF7` | page background |
| manila | `#E5E5E0` | cards, figure backgrounds |
| rich | `#2C2C2C` | body text |
| shadow | `#0F0F0F` | heavy text, footer |

**Semantic:** heading `primary`; body `rich`; link `accent`; danger `#A52828`; success `#3D6B3D`.

**Rationale:** Editorial tradition — black on warm-white newsprint, vermillion reserved for marginalia (pull-quotes, links, figure captions, bylines). Pure typographic restraint. No decoration color exists in this palette.

---

### 3. Academic Heritage

**Use:** universities, research institutions, libraries, archives.

| Token | Hex | Role |
|---|---|---|
| primary | `#1F3A5F` | aged indigo / Oxford navy |
| secondary | `#8B6F47` | leather brown — subheads |
| accent | `#A8893D` | brass / old gold — awards, dates |
| parchment | `#F5F1E8` | page background |
| vellum | `#D4C9B5` | cards, panels |
| inkwell | `#2C2419` | body text |
| lampblack | `#1A1410` | heavy text |

**Semantic:** heading `primary`; body `inkwell`; link `primary`; danger `#8B2A2A`; success `#3F5F3A`.

**Rationale:** Aged indigo is institutional without being corporate-blue. Brass is honorific — only on awards, citations, foundation dates, honorary mentions. Parchment grounds the palette in printed-history tradition. Honors the visual lineage of half a millennium of academic publishing.

---

### 4. Civic Trust

**Use:** banks, courts, public services, hospitals, regulators.

| Token | Hex | Role |
|---|---|---|
| primary | `#2C5F5D` | deep teal / eucalyptus |
| secondary | `#6B8E7F` | sage — bridges, subheads |
| accent | `#D67D2E` | saffron-leaning ochre — CTAs |
| chalk | `#F7F5F0` | page background |
| stone | `#D8D4CC` | cards, dividers |
| forest | `#1A3A38` | body text |
| deep | `#14282A` | footer |

**Semantic:** heading `primary`; body `forest`; link `accent`; danger `#9C3A2E`; success `#3F6B4A`.

**Rationale:** Teal signals competence without corporate-blue. Saffron-leaning ochre for ceremonial moments — CTAs, badges, ribbon hovers. Warm sage bridge prevents institutional-cold. Works in both English and Indian-language UIs because the chromatic axis (teal↔ochre) maps to civic form across cultures.

---

### 5. Modern Minimal

**Use:** design studios, architecture, premium startups that want craft, not SaaS.

| Token | Hex | Role |
|---|---|---|
| primary | `#2D2D2D` | graphite — headings |
| secondary | `#8C8C8C` | concrete — captions |
| accent | `#D4574A` | terracotta-coral — CTAs |
| paper | `#FAFAFA` | page background |
| fog | `#EEEEEE` | cards |
| ink | `#1A1A1A` | body text |
| warm | `#F5F5F0` | warm white alt |

**Semantic:** heading `primary`; body `ink`; link `accent`; danger `#A53939`; success `#3D6A4A`.

**Rationale:** Graphite as primary signals design literacy. Single terracotta-coral accent — always warm, never neon. Restraint is the entire point; this palette is a design statement about confidence. Reads as Italian editorial, not Bay Area SaaS.

---

### 6. Cultural Craft

**Use:** craft brands, museums of craft, handloom, textile, regional food, heritage.

| Token | Hex | Role |
|---|---|---|
| primary | `#8B2E2A` | madder red — headings |
| secondary | `#1E4D4D` | indigo — subheads, dividers |
| accent | `#D4A574` | natural-dye gold — ornament |
| cotton | `#F4EFE6` | page background |
| hemp | `#D9C7A7` | cards, panels |
| iron | `#2A1810` | body text |
| silk | `#F9F5EC` | warm alt background |

**Semantic:** heading `primary`; body `iron`; link `secondary`; danger `#7A2A2A`; success `#3D5F4A`.

**Rationale:** Madder + indigo is the historic Indian textile palette — block-printed cottons, ajrakh, kalamkari, natural dyes. Gold accent only for ornament. Avoid kitsch by keeping neutrals raw and slightly textured, and pairing with serif or handcrafted type — never with corporate sans-serif. The palette should feel pre-industrial, not promotional.

---

### 7. Premium Dark

**Use:** cinema, music, late-night reading, design portfolios, hospitality, editorial dark.

| Token | Hex | Role |
|---|---|---|
| primary | `#E8E4DC` | warm white — headings |
| secondary | `#A8A29A` | warm gray — captions |
| accent | `#D4A574` | champagne / brass — hovers, active |
| dark | `#0F0E0C` | page background |
| lampblack | `#1A1916` | cards, panels |
| warm | `#252320` | elevated surfaces |
| concrete | `#6B665E` | dividers, meta |

**Semantic:** heading `primary`; body `primary`; link `accent`; danger `#C2605A`; success `#7A9F6F`.

**Rationale:** Warm darks — never pure black, never indigo-tinted dark (the AI giveaway: `#0A0A1F`, `#0E0E2A`, `#1A1A2E`). Champagne accent for hover and active only. Cinema-rave mode for late-night use, not everyday interface. When paired with photography, this palette disappears and lets the imagery lead.

---

## Color Smells — Pre-Ship Audit

Any one of these is a "looks AI" tell.

- [ ] **Indigo→violet→cyan hero gradient.** The single biggest AI fingerprint. Replace with: solid color, single-tone value gradient, or photography.
- [ ] **Tailwind `blue-500` + `violet-500` combo.** Appears on every AI demo. Pick any other two.
- [ ] **Neon-on-dark with `#00FF`-something accents.** Looks like synthwave, not a real site.
- [ ] **Pastel rainbow cards.** 6+ chromatic colors in one component. Cap at 4.
- [ ] **Saffron flood-fill on a section.** Instant kitsch. Use as accent or type, never full-bleed.
- [ ] **Cultural register mismatch.** Saffron + corporate sans-serif tech logo feels wrong. Cultural colors need cultural type (Devanagari, serif, archival).
- [ ] **Indigo-tinted dark mode.** `#0A0A1F`, `#0E0E2A`, `#1A1A2E`. The AI dark-mode giveaway. Use warm darks.
- [ ] **Body text below `#595959` on white.** Fails accessibility. Minimum `#4A4A4A` for body.
- [ ] **Hover changes hue, not value.** Looks twitchy. Hover should darken/lighten, not shift hue.
- [ ] **Danger green / Success red.** Semantic inversion. Red means error globally.
- [ ] **3+ accent colors.** Committee-designed. Pick one.
- [ ] **Pure `#FFFFFF` or pure `#000000`.** Clinical. Use warm white (`#FAF7F2`, `#F5F1E8`) and warm black (`#1A1916`, `#0F0E0C`).
- [ ] **Gradient text.** Almost always AI-generated. Solid color text only.
- [ ] **Palette without neutrals.** All chromatic, no ground. Add 4+ neutrals.
- [ ] **More than three chromatic brand colors.** Probably wrong. Cut one.
- [ ] **Decorative colors that aren't decorative.** If a color does no semantic work, remove it.
- [ ] **Semantic colors that aren't semantic.** "Blue = button" is not semantic. "Primary = brand" is.

---

## Working Notes

- Provide light AND dark variants only when the product genuinely supports both. Derive dark by inverting value, not hue.
- Test with real content — body text, image, button, error message, success message, link, hover. Never against a blank canvas.
- For Indian institutional sites: prefer ground-truth materials (kraft, madder, indigo, brass, sandalwood, terracotta) over generic "Indian" symbolism.
- When in doubt, remove a color. Restrained > elaborate, every time.
