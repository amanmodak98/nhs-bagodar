# Layout & Composition

## 10 Layout Principles

**1. Asymmetry with intent.** Balance is achieved through tension, not centering. A large image on the right is offset by a tight text block on the left. The composition has a fulcrum you can feel but not measure.

**2. Type is architecture.** Display type at 80–160px creates the structure. Body type at 14–18px in narrow columns creates rhythm. Whitespace around type is compositional material, not wasted pixels.

**3. Modular grid with varied modules.** Define a grid (12-col, 16-col, or 6×6 modules), then let content occupy different module combinations. A 1×1 caption next to a 4×3 image next to a 2×1 quote next to a 3×6 portrait — the variety creates energy.

**4. Imagery earns real estate.** Photographs span full viewport widths or bleed off one edge. Decorative thumbnails are out. If an image is on the page, it commits.

**5. Negative space is content.** Generous margins and gutters are signals of confidence. Cramped layouts signal template. Editorial sites use 40–50% of the viewport as deliberate air.

**6. Hierarchy through scale, not color.** A 120px headline next to a 9px caption creates more drama than medium-large text in two colors. Reserve color for meaning (state, category, link), not decoration.

**7. Vertical rhythm with horizontal punctuation.** Most of the page flows predictably down. A horizontal break — a full-bleed image, an indented quote, a side caption — punctuates the rhythm like a paragraph break in prose.

**8. Same language, varied applications.** A design system is a vocabulary, not a script. Each section uses the vocabulary differently: a 2-col split here, a single full-bleed there, a 4-mod data tile somewhere else. Repetition of one pattern reads as template.

**9. Editorial conventions as interface.** Pull quotes, drop caps, kickers, deks, bylines, datelines, captions with credits, running heads — these are not ornaments, they are signals that say "considered publication."

**10. Information density is allowed.** A page can hold 8 different kinds of content if each is given proper hierarchy. Avoidance of density is avoidance of substance. Institutional and editorial sites thrive on this.

---

## 5 Layout Patterns

### Pattern 1 — Asymmetric Editorial Hero

For: landing pages, article opens, campaign entries, magazine features.

```
┌─────────────────────────────────────────────────────────────┐
│ [logo]                          nav · nav · nav    [search] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  KICKER · SECTION                                            │
│                                                              │
│  A long display              ┌───────────────────────────┐  │
│  heading that occupies       │                           │  │
│  three lines and             │                           │  │
│  sets the rhythm.            │     LARGE HERO IMAGE      │  │
│                              │     bleeds right edge     │  │
│  ──────────────              │                           │  │
│                              │                           │  │
│  Subtitle / dek in smaller   │                           │  │
│  type that supports but      │                           │  │
│  does not compete.           └───────────────────────────┘  │
│                                                              │
│  By Name · Date · 8 min read                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

Notes: heading anchored to left grid column, image bleeds to right edge (no gutter). Caption metadata in 12px, separated by middle dot. No buttons, no "scroll down" indicator.

---

### Pattern 2 — Editorial Article (long-form)

For: journalism, research pieces, policy explainers, annual reports, faculty essays.

```
┌─────────────────────────────────────────────────────────────┐
│            [breadcrumb · section · sub]                      │
├──────────┬──────────────────────────────────────────────────┤
│          │  KICKER                                            │
│  sticky  │  ─────                                            │
│   TOC    │                                                   │
│          │  Article Title in display                         │
│  01 Intro│  type, perhaps two lines                          │
│  02 Back │                                                   │
│ ▸ 03 Now │  By Author · 8 min · Sept 21, 2026                │
│  04 Next │  ──────────────                                   │
│  05 End  │                                                   │
│          │  ▌The first paragraph begins with a drop          │
│          │   cap that drops 4 lines. The narrow column       │
│          │   is set to 60–72 chars per line.                 │
│          │                                                   │
│          │  Body text continues in measured                  │
│          │  paragraphs with H2s creating                     │
│          │  vertical rhythm.                                 │
│          │                                                   │
│          │  ┌──────────────────────────────────┐             │
│          │  │     FULL-BLEED FIGURE            │             │
│          │  └──────────────────────────────────┘             │
│          │  Fig. 1 · Caption · Credit                         │
│          │                                                   │
│          │  "A pull quote in larger type                     │
│          │   breaks the column and adds                      │
│          │   emphasis without shouting."                     │
│          │                                                   │
│          │  More body. Section heading. More                  │
│          │  body. End-of-article metadata bar.                │
└──────────┴──────────────────────────────────────────────────┘
```

Notes: TOC pinned left, 200–240px wide. Article column ~640–720px max, never full-width. Figures break out to full content width. Body type 17–18px, line-height 1.6–1.7.

---

### Pattern 3 — Image-Led Section

For: program showcases, campus tours, product galleries, immersive storytelling, photojournalism.

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │              FULL-BLEED PHOTOGRAPH                    │    │
│  │              occupies full viewport width              │    │
│  │              with no horizontal margin                 │    │
│  │                                                       │    │
│  │   ┌────────────────────────┐                          │    │
│  │   │  Card: title           │                          │    │
│  │   │  · subtitle            │                          │    │
│  │   │  · byline / location   │                          │    │
│  │   │  anchored bottom-left  │                          │    │
│  │   │  with backdrop blur    │                          │    │
│  │   └────────────────────────┘                          │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  Body content in narrow column below the image               │
│  indented against a generous left margin                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

Notes: image height 60–90vh. Card anchored to image corner is small (max 320px wide), never centered. Text below aligns to the same left grid line as the headline above.

---

### Pattern 4 — Modular Data Grid

For: dashboards, research lab homepages, newsroom fronts, program indices, civic portals.

```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard / Section title                                    │
│  ────────────────                                            │
│  Updated 21 Sep · Filter ▾ · Export                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌────────────────────────┐       │
│  │ 1,247    │ │ 89%      │ │                        │       │
│  │ patients │ │ on time  │ │    CHART (4 cols)      │       │
│  │ today    │ │          │ │                        │       │
│  └──────────┘ └──────────┘ │                        │       │
│  ┌──────────────────┐      │                        │       │
│  │ ACTIVITY LOG     │      │                        │       │
│  │ (2 cols × 2 rows)│      └────────────────────────┘       │
│  │                  │      ┌────────────────────────┐       │
│  │ • 09:14 entry    │      │ TABLE / LIST (4 cols)  │       │
│  │ • 09:02 entry    │      │                        │       │
│  │ • 08:51 entry    │      │                        │       │
│  │ • 08:33 entry    │      │                        │       │
│  └──────────────────┘      └────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

Notes: module sizes vary (1×1, 2×2, 4×2, 4×4). Module heights are independent — not forced into a uniform row. Stats use massive numbers, tiny labels. Charts and tables are full-width of their module.

---

### Pattern 5 — Sticky Side Nav

For: long documentation, academic department sites, policy portals, course catalogs, faculty directories.

```
┌──────────┬──────────────────────────────────────────────────┐
│          │  PAGE TITLE                                       │
│ SECTION  │  ─────────                                        │
│ ONE      │                                                   │
│          │  Intro paragraph in slightly wider type           │
│  • sub   │  than body. Sets context for the page.            │
│  • sub   │                                                   │
│ ▸ active │  ────                                             │
│          │                                                   │
│ SECTION  │  H2: First section heading                       │
│ TWO      │                                                   │
│          │  Body content for this section. The               │
│  • sub   │  content area scrolls independently              │
│  • sub   │  while the TOC remains pinned.                   │
│          │                                                   │
│ SECTION  │  ────                                             │
│ THREE    │                                                   │
│          │  H2: Second section heading                      │
│  • sub   │                                                   │
│          │  Body content.                                    │
│          │                                                   │
│ (jump to │                                                   │
│  top)    │                                                   │
└──────────┴──────────────────────────────────────────────────┘
```

Notes: TOC column 220–280px, content column max 760px. Active section highlighted with weight change + left rule, never background fill. On mobile, TOC collapses into a top accordion.

---

## Spacing & Rhythm System

Base unit: **8px**. All spacing derives from multiples of 8.

| Token | px | Use |
|---|---|---|
| `space-1` | 4 | Only for inline typographic adjustments (tracking, optical kerning) |
| `space-2` | 8 | Tight spacing within a component, between an icon and label |
| `space-3` | 12 | Between related elements in a row |
| `space-4` | 16 | Component padding (compact), list item gap |
| `space-5` | 24 | Component padding (default), between blocks of related text |
| `space-6` | 32 | Between sibling components |
| `space-7` | 48 | Section internal padding (compact) |
| `space-8` | 64 | Section padding (default) |
| `space-9` | 96 | Section padding (large), break between major page zones |
| `space-10` | 128 | Hero / opener spacing |
| `space-11` | 192 | Editorial drama — used once per page max |

**Type rhythm (vertical):**

| Element | size / line-height |
|---|---|
| Display | 80–160px / 0.95–1.05 |
| H1 | 48–64px / 1.1 |
| H2 | 32–40px / 1.2 |
| H3 | 22–26px / 1.3 |
| Body | 17–19px / 1.6–1.7 |
| Caption / metadata | 12–13px / 1.4 |
| Eyebrow / kicker | 11–12px / 1.3, uppercase, tracked +0.08em |

**Body column width:** 60–72 characters (~640–720px at 18px). Never wider.

**Section padding vertical:** minimum `space-7` (48px), default `space-8` (64px), large `space-9` (96px).

**Rule:** if you need spacing smaller than 8px for layout (not type), reconsider the design. The 4px token is for type only.

---

## Anti-Patterns

**The Centered Hero.** Heading + subtitle + two buttons + one image, all centered, all stacked. Says "I generated a hero." Replace with an asymmetric editorial hero (Pattern 1).

**The 3-Up Icon Grid.** Three identical cards, each with a line-icon + H3 + paragraph + maybe an arrow link. Used for "features," "services," "why us." Says "I have three things." Use varied module compositions instead — pair, single full-bleed, asymmetric 2-col.

**The "Trusted By" Logo Wall.** Four rows of grayscale logos, equally spaced, no caption, no context. Says "I collected logos." Place logos in service of a story (a case study opener, a press section header) or omit.

**The Pricing Trio.** Three tiers, middle highlighted with a darker card or scale-up, two buttons per tier. Says "I read a pricing page template." Pricing should be information-dense — features as a comparison table, not three poster cards.

**The 4-Column Footer.** Four equal columns of 5–8 links each, all in 14px, no hierarchy. Says "I needed a footer." Group by intent (Product, Resources, Company, Legal), vary link density, include the address and copyright in their own visual block.

**The Auto-Rotating Carousel.** Three slides with dot navigation, auto-advancing every 5s. Says "I had three images." Pick the strongest image. If you need three, show all three stacked or in an editorial layout.

**The Floating Chat Bubble.** Persistent widget anchored bottom-right, often with a pulsing notification dot. Remove it. If chat is essential, give it a real nav slot.

**The Gradient Mesh Hero.** Multi-color blurred gradient shapes behind centered text. Says "I made a hero feel big." Use a real photograph or commit to typography alone.

**The Equal-Column Stats.** Four stats in four identical columns, all caps, all same weight. Says "I have four numbers." Let one number dominate, others support it. Or use Pattern 4 (modular grid).

**The "Get Started Free" Footer CTA.** A large banner at the bottom of every page: heading + paragraph + email input + button. Says "I added a CTA." Each page should end on its own content, not a generic conversion prompt.

**The Equal Card Row.** N cards, all the same width, all the same height, all the same internal padding, all with the same call-to-action. Replace with at least two of: a different module width, a different content density, a different action type, an asymmetric pairing.

**The Hamburger-Only Mobile.** Desktop nav collapsed behind a hamburger on tablet too. Hamburger is for compact mobile only. Tablet (≥768px) deserves at least a horizontal nav.

---

## Institutional Sites — Specific Guidance

Schools, civic bodies, hospitals, courts, government departments, NGOs — these have constraints marketing sites don't.

**Information density is the brief.** Users come to find something specific: a date, a form, a phone number, a policy. A site with eight sections of marketing copy and no phone number fails the user. Pack information. Use tables, lists, calendars, directories, FAQs.

**Multi-audience navigation.** Universities serve prospective students, current students, parents, faculty, alumni, researchers, press, donors. Each is a first-class audience. Mega-navs work here (NYT, MIT, Stanford), grouped by audience rather than by topic.

**Wayfinding is mandatory.** Every page answers "where am I?" with breadcrumb, page title, and parent section link. Sub-pages show their parent section's nav, not just the global nav.

**Plain language over marketing voice.** No "transform your future." No "unleash potential." Civic writing: "Apply for residency. Deadline: March 15." Direct, dated, sourced.

**Trust signals placed with intent.** Accreditation logos, press mentions, rankings — these belong with the claim they support ("ranked #1 by X"), not as a logo wall. A medical school's hospital affiliations appear on the residency page, not in a "trusted by" row.

**Mixed content types on every page.** News, events, calendars, forms, FAQs, directories, maps. Each has its own module treatment. Avoid the trap of making every page a uniform "feature card" page.

**Document conventions.** PDFs need: last-updated date, document ID, page count, language, accessibility statement. News items need: dateline, byline, related coverage, corrections notice. Events need: timezone, registration deadline, capacity.

**Search is primary navigation.** On institutional sites, search bar often outranks the menu. Make it prominent. Show recent searches, popular searches, deep links (not just pages).

**Accessibility as default, not feature.** WCAG 2.2 AA minimum. Body type 17px+. Contrast 7:1 for body text where possible. Keyboard navigation for everything including carousels and modals. Skip-to-content link. Focus states visible. Form errors announced.

**Tables for everything tabular.** Programs, fees, requirements, schedules, comparison. A well-set table communicates more in 8 lines than a card grid does in 8 cards.

**Bylines and dates everywhere.** Every news item: byline + date. Every policy: last reviewed + version. Every event: start + end + timezone. This is the single strongest institutional trust signal.

**Comparison layouts.** Two programs side by side. Two degrees. Two campuses. Use a comparison table or a paired module, not a 3-up grid where the third card is "Other."

**Long pages are allowed.** A faculty directory with 200 entries is not a "landing page with too much content" — it is a directory. Let it scroll. Pin the filter bar, not the whole nav.

**Calendars are first-class.** Academic calendars, court calendars, hospital appointment calendars, civic event calendars — these are often the most-visited pages. Treat them with the same care as the homepage.

**Forms deserve real layouts.** Multi-step forms as one scrollable page with section headings, not 12-step wizards. Inline validation. Sticky summary. Save-and-resume.

**The footer is a directory.** Address, phone, hours, accessibility contact, press contact, social links, sitemap link, privacy, terms — in a real visual hierarchy, not four equal columns.

---

References for the design vocabulary: Apartamento, Cereal, Eye magazine, The Atlantic, NYT Magazine, MIT homepage, Stanford School sections, Berkeley news, gov.uk service pages, NHS.uk condition pages, Stripe Press, Aeon, Real Review.
