# Components & Interaction

What AI generates by default vs. what looks considered. Each entry: the pattern, why it fails, what to do instead, and when.

---

## 1. BUTTONS

### The AI anti-pattern

```html
<button class="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:scale-105 transition-all">
  Apply Now
</button>
```

Pill shape + gradient + colored shadow + scale-on-hover. Every AI tool ships a variant of this. It screams "generated in 2024."

### Why it fails

- **Pills are the default container for almost everything.** When every interactive element is rounded-full, nothing has hierarchy. Primary actions stop looking primary.
- **Gradients on UI chrome age in months.** The indigo-to-purple gradient was Vercel 2022, then everyone, then tired.
- **Colored shadows leak the brand color across the whole page.** Shadow tint should match the ambient light, not the button. Real shadows are neutral (black + low opacity).
- **`hover:scale-105` on buttons is fidgety.** Buttons are precision targets. Movement should signal confirmation, not celebration.

### Alternative A — Institutional solid (primary action)

```html
<button class="px-5 py-2.5 bg-[#1a1a1a] text-white text-sm tracking-wide hover:bg-[#000] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#1a1a1a] transition-colors">
  Apply for Admission
</button>
```

**Rationale:** Square or 4px radius, solid near-black, neutral hover. The label is the entire interaction — no decoration competes. Used by The New York Times, academic institutions, premium publishers. Reads as serious, durable.

### Alternative B — Editorial underline (secondary / nav)

```html
<a href="#" class="relative text-[#1a1a1a] text-sm font-medium after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-[#1a1a1a] hover:after:w-full after:transition-all after:duration-300">
  Admissions
</a>
```

**Rationale:** An animated underline that grows left-to-right on hover. Zero fill, zero shadow, zero scale. Common in editorial sites (FT, NYT, Bloomberg). Use for secondary navigation, in-text links, low-emphasis calls to action.

### Alternative C — Outlined ghost (tertiary, "Learn more")

```html
<button class="px-4 py-2 border border-[#1a1a1a] text-[#1a1a1a] text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors">
  Read more
</button>
```

**Rationale:** Inverts on hover. Feels like print typography — solid type, hairline border. Right for tertiary actions that shouldn't compete with the primary CTA.

### When to use

| Type | Use for | Avoid for |
|---|---|---|
| Solid square | Primary CTA (Apply, Donate, Submit) | Anything repeated >3 times on a page |
| Underline link | Nav, in-content, "Read more" | Standalone buttons |
| Ghost outline | Filter chips, "View all", secondary | The single most important action on a page |
| Pill (rounded-full) | Tags/badges only — never buttons | CTAs |

### School context

A school's primary CTA is "Apply for Admission" or "Enquire." It should feel like a stamped envelope, not a candy button. Solid near-black, 4px radius, sentence-case label. The phone number for admissions is itself a CTA — make it `text-2xl font-medium` with a hairline underline, not a button.

---

## 2. CARDS

### The AI anti-pattern

```html
<div class="rounded-2xl bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
  <img src="..." class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-xl font-semibold">Annual Sports Day 2025</h3>
    <p class="text-gray-600 mt-2">Students participated in various...</p>
  </div>
</div>
```

Rounded-2xl + shadow-lg + image-on-top + hover shadow upgrade. The Tailwind card. Every card on the internet looks like this.

### Why it fails

- **Shadow-lg as a container.** A large drop shadow under a white card on a white page creates a vague lift that reads as "floating," not "presented." Real editorial layout uses line, not air.
- **Image-on-top is one of two card layouts.** When it's the only one, the page becomes a Pinterest board. The card format loses meaning.
- **Hover shadow upgrade is interaction without purpose.** What does the user gain by the shadow growing? Nothing — the card already looked clickable.

### Alternative A — Editorial card (with border, no shadow)

```html
<article class="border border-[#e5e5e5] bg-white p-6 hover:border-[#1a1a1a] transition-colors">
  <p class="text-xs uppercase tracking-widest text-gray-500 mb-3">Sports</p>
  <h3 class="text-lg leading-snug font-medium mb-2">Annual Sports Day 2025</h3>
  <p class="text-sm text-gray-600 mb-4">Students from classes VI–XII...</p>
  <p class="text-xs text-gray-500">15 March 2025</p>
</article>
```

**Rationale:** Hairline border, no shadow, padding does the work. Hover deepens the border, not the shadow. Feels like a printed announcement. Use for: news, announcements, event listings, programs.

### Alternative B — Photo card with caption (museum / archive style)

```html
<figure class="space-y-3">
  <img src="/photos/sports-day.jpg" class="w-full aspect-[4/3] object-cover" />
  <figcaption>
    <p class="text-xs uppercase tracking-widest text-gray-500">Annual Sports Day</p>
    <p class="text-sm mt-1">Prize distribution — March 2025</p>
  </figcaption>
</figure>
```

**Rationale:** No card container at all. Image and caption sit on the page directly. The caption is set in small caps for category, sentence for description. Use for: photo galleries, event archives, staff portraits, "moments from the year."

### Alternative C — Sidebar card (institutional, for stats/programs)

```html
<div class="border-l-2 border-[#1a1a1a] pl-6 py-2">
  <p class="text-4xl font-serif">2,400</p>
  <p class="text-sm text-gray-600 mt-1">Students enrolled across two campuses</p>
</div>
```

**Rationale:** Left rule, no other chrome. Large serif number, small sans label. Reads as a sidebar pull-quote in a printed prospectus. Use for: stats, key facts, "at a glance" blocks.

### When to use each

| Pattern | Use for | Avoid for |
|---|---|---|
| Bordered (Alt A) | News, announcements, lists | Photo-heavy pages |
| Figure + caption (Alt B) | Photo grids, event archives, staff | Content needing clear click affordance |
| Left-rule (Alt C) | Stats, quotes, definitions | Anything that needs equal grid sizing |
| Shadow + image-top (AI default) | Almost never on institutional sites | When you have real photography |

### When NOT to use a card at all

- A single news item on a "News" index page doesn't need to be a card if the row already has a date column and category column — a row of `<tr>` does the job.
- A photo in a gallery doesn't need a card. The image is the content.
- A statistic doesn't need a card. The number is enough.

### School context

With 117 event photos, the home page news section should mix formats: a few editorial cards (latest announcements), a wide horizontal photo strip (latest event), and a single "At a glance" stat block. Three different treatments beat 8 identical shadow-cards.

---

## 3. NAVIGATION

### The AI anti-pattern

```html
<nav class="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <img src="/logo.svg" class="h-8" />
    <div class="hidden md:flex gap-8">
      <a class="text-sm hover:text-indigo-600">About</a>
      <a class="text-sm hover:text-indigo-600">Academics</a>
      <a class="text-sm hover:text-indigo-600">Admissions</a>
    </div>
    <button class="md:hidden">menu</button>
  </div>
</nav>
```

Sticky + backdrop-blur + white/80 transparency + indigo hover. The Tailwind navbar.

### Why it fails

- **`backdrop-blur` over content is a laptop demo trick.** On a real school site, the nav floats over the hero with a frosted-glass effect — it looks like a SaaS app, not an institution. Also performance-heavy on mid-range devices.
- **Sticky-everywhere assumes scrolling is the main task.** For a school's homepage, the user is deciding whether to apply or call. The nav doesn't need to follow them.
- **Indigo hover on links is meaningless.** Every nav link gets the same color change. There's no current-page signal, no hierarchy.
- **Logo on left, links center, nothing right.** This is a UI primitive. It doesn't address what an Indian school site visitor actually needs: the phone number, the admissions email, a way to ask a question.

### Alternative A — Editorial top bar (institutional)

```html
<div class="border-b border-[#e5e5e5]">
  <div class="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-gray-600">
    <span>Established 1958 — Bagodar, Jharkhand</span>
    <div class="flex gap-6">
      <a href="tel:+91...">+91 1234 567 890</a>
      <a href="mailto:...">info@nsb.school</a>
    </div>
  </div>
  <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <span class="font-serif text-xl">Navodaya Senior Secondary School</span>
    <div class="flex gap-8 text-sm">
      <a href="#">About</a>
      <a href="#">Academics</a>
      <a href="#">Admissions</a>
      <a href="#">Gallery</a>
      <a href="#">Contact</a>
    </div>
  </nav>
</div>
```

**Rationale:** Two-tier: a hairlined utility bar (phone, email, location) above a clean nav with the school name in serif. The phone number is the most important thing on the page for a prospective parent — put it in the top bar, in plain text, not in a button.

### Alternative B — Mega-menu (only when content demands)

A mega-menu is appropriate when:

- The school has 5+ programs (Pre-Primary, Primary, Middle, Secondary, Senior Secondary)
- Multiple boards/curricula
- Substantial faculty/administrative structure

```html
<div class="absolute left-0 right-0 top-full bg-white border-t border-[#e5e5e5] shadow-sm">
  <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-3 gap-12">
    <div>
      <h4 class="text-xs uppercase tracking-widest text-gray-500 mb-4">By Level</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="#">Pre-Primary (Nursery, KG)</a></li>
        <li><a href="#">Primary (I–V)</a></li>
        <li><a href="#">Middle (VI–VIII)</a></li>
        <li><a href="#">Secondary (IX–X)</a></li>
        <li><a href="#">Senior Secondary (XI–XII)</a></li>
      </ul>
    </div>
    <!-- etc. -->
  </div>
</div>
```

**Rationale:** Multi-column grid, plain borders, headings in small caps. Opposite of the colored, icon-laden SaaS mega-menu. Use ONLY when the IA actually has that many items. Most schools can fit in 5-6 top-level links.

### Alternative C — Non-sticky nav for institutional sites

For a school site, the homepage is a single screen with hero + sections + footer. The nav doesn't need to follow. Remove `sticky`. Let the user scroll back if they want a different section. Mobile users especially benefit from reclaiming the viewport.

If a sticky nav is required (long content pages), use:

```html
<nav class="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
```

Solid white, hairline border. No blur, no transparency. The nav reads as a header, not a frosted overlay.

### When to use

| Type | Use for |
|---|---|
| Two-tier (utility + nav) | Most institutional sites |
| Mega-menu | Only when IA demands 3+ columns |
| Sticky nav | Long-form pages (about, curriculum) — solid white, no blur |
| Frosted blur | Almost never |

---

## 4. FORMS

### The AI anti-pattern

```html
<input class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
<button class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">Submit</button>
```

Rounded-lg + gray-300 border + indigo focus ring. The form AI generates in its sleep.

### Why it fails

- **Indigo focus ring colors every input the same.** There's no differentiation between field types (text, phone, email), no validation state distinction, no signal of what to focus next.
- **Rounded-lg inputs look like chat bubbles.** Forms on institutional sites — admissions, contact — are formal documents. The container should look like a printed line on paper, not a chat field.
- **The submit button being the same indigo as the focus ring couples "primary action" with "where I am now."** Confusing on long forms.

### Alternative A — Editorial form (institutional admissions)

```html
<form class="space-y-8">
  <div>
    <label class="block text-xs uppercase tracking-widest text-gray-600 mb-2">Parent's Name</label>
    <input class="w-full border-0 border-b border-[#1a1a1a] py-2 px-2 focus:bg-gray-50 focus:outline-none transition-colors" />
  </div>
  <div>
    <label class="block text-xs uppercase tracking-widest text-gray-600 mb-2">Phone Number</label>
    <input type="tel" class="w-full border-0 border-b border-[#1a1a1a] py-2 px-2 focus:bg-gray-50 focus:outline-none" />
  </div>
  <fieldset>
    <legend class="text-xs uppercase tracking-widest text-gray-600 mb-3">Class Applying For</legend>
    <div class="space-y-2">
      <label class="flex items-center gap-3 text-sm">
        <input type="radio" name="class" class="accent-[#1a1a1a]" /> Nursery
      </label>
      <!-- ... -->
    </div>
  </fieldset>
  <button class="px-6 py-3 bg-[#1a1a1a] text-white text-sm hover:bg-black transition-colors">
    Submit Application
  </button>
</form>
```

**Rationale:** Underline-only inputs (no box around them), small-caps labels, generous spacing between fields. Feels like filling out a printed prospectus form. The submit is solid black, not indigo.

### Alternative B — Boxed but considered (multi-step forms)

When the form needs more visible containment:

```html
<input class="w-full px-4 py-3 border border-[#1a1a1a] bg-white focus:border-[#1a1a1a] focus:ring-0 focus:bg-gray-50 transition-colors placeholder:text-gray-400" />
```

Black border, no rounding (or 2px max), focus changes background not border. The error state:

```html
<input class="border-[#b91c1c] bg-[#fef2f2]" />
<p class="text-xs text-[#b91c1c] mt-1">Phone number is required</p>
```

Muted red border + 1% red tint background + inline message below.

### Specific rules for institutional forms

- **Phone field:** prefix with country code label (not placeholder): `+91 | [ ]`. Indian users know their country code matters.
- **Class/Grade:** always a select or radio group, never a free-text field. You have specific classes.
- **Date of Birth:** three selects (Day, Month, Year). Date pickers fail on mobile in India.
- **File upload:** drag-drop area with explicit "PDF, JPG up to 5MB" — never just "Upload."
- **Submit button label:** "Submit Application" not "Submit." Tell the user what they're submitting.

---

## 5. FOOTERS

### The AI anti-pattern

```html
<footer class="bg-gray-900 text-gray-300">
  <div class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-4 gap-8">
    <div><img src="/logo.svg" /><p>Tagline goes here.</p><div class="flex gap-4 mt-4"><a>FB</a> <a>TW</a> <a>IG</a> <a>LI</a></div></div>
    <div><h4>Quick Links</h4><ul>...</ul></div>
    <div><h4>Resources</h4><ul>...</ul></div>
    <div><h4>Legal</h4><ul>...</ul></div>
  </div>
  <div class="border-t border-gray-800 py-6 text-center text-sm">© 2025 Company. All rights reserved.</div>
</footer>
```

Dark gray + 4-column grid + logo + social row + copyright bar. The AI footer in 8 lines of code.

### Why it fails

- **4 columns of "Quick Links / Resources / Legal / Company" is corporate SaaS boilerplate.** A school doesn't have "Resources" or "Legal" as primary categories.
- **Social icons row at the bottom is a tech-company tell.** Schools may use Facebook or YouTube, but a row of social icons is not the right framing.
- **Generic copyright string adds nothing.** No registration number, no affiliation, no accreditation.
- **Dark gray footer is the default because "it looks serious."** It actually looks like every other dark-footer SaaS site. A considered footer can be white with a black top border.

### Alternative A — Editorial institutional footer

```html
<footer class="border-t border-[#1a1a1a] bg-white">
  <div class="max-w-6xl mx-auto px-6 py-16">
    <!-- Top: Address + Contact + Map link -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#e5e5e5]">
      <div>
        <p class="font-serif text-lg mb-2">Navodaya Senior Secondary School</p>
        <p class="text-sm text-gray-600 leading-relaxed">
          Bagodar, Giridih District<br>
          Jharkhand 825322, India
        </p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-widest text-gray-500 mb-3">Contact</p>
        <p class="text-sm">+91 1234 567 890</p>
        <p class="text-sm">admissions@nsb.school</p>
        <p class="text-sm">Office hours: Mon–Sat, 8am–4pm</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-widest text-gray-500 mb-3">Visit</p>
        <p class="text-sm">Open campus tours every Wednesday at 11am.</p>
        <a href="#" class="text-sm underline mt-2 inline-block">Schedule a visit →</a>
      </div>
    </div>
    <!-- Middle: Real navigation, in sentence form -->
    <div class="py-8 text-sm text-gray-600">
      <a href="#">About</a> · <a href="#">Academics</a> · <a href="#">Admissions</a> · <a href="#">Gallery</a> · <a href="#">Faculty</a> · <a href="#">Notices</a> · <a href="#">Contact</a>
    </div>
    <!-- Bottom: Affiliations + Copyright -->
    <div class="pt-8 border-t border-[#e5e5e5] flex flex-wrap justify-between gap-4 text-xs text-gray-500">
      <p>Affiliated to CBSE, New Delhi — Affiliation No. 12345</p>
      <p>© 2025 Navodaya Senior Secondary School. Established 1958.</p>
    </div>
  </div>
</footer>
```

**Rationale:** White background. Address on the left (the most important information for a physical institution). Three columns: identity, contact, visit. Real navigation as a horizontal sentence (not a column). Bottom row contains the institutional credentials (CBSE affiliation number, establishment year) — not just a copyright string.

### Alternative B — Compact footer (single row)

```html
<footer class="border-t border-[#e5e5e5] py-8">
  <div class="max-w-6xl mx-auto px-6 flex flex-wrap justify-between gap-4 text-xs text-gray-500">
    <p>Navodaya Senior Secondary School · Bagodar, Jharkhand · Est. 1958</p>
    <p>+91 1234 567 890 · admissions@nsb.school</p>
  </div>
</footer>
```

**Rationale:** Single hairline, two text facts. For a brochure site that has nothing more to put in a footer.

---

## 6. TABLES

### The AI anti-pattern

The Linear/Notion/Stripe table. Gray-50 header, divide-y rows, hover gray, padded cells.

### Why it fails

- **Tables on school sites are not dashboards.** They're results, fee structures, holiday calendars — official records. They should look like a printed gazette, not a SaaS analytics view.
- **Dividers on every row create visual noise.** A real table has a header rule, body rules only when needed (e.g., to separate totals), and whitespace doing the work.
- **Hover:bg-gray-50 on rows is interaction theatre.** It's for sortable/selectable tables. A fee structure doesn't need to highlight rows on hover.

### Alternative A — Editorial table (institutional record)

```html
<table class="w-full text-sm">
  <thead>
    <tr class="border-b-2 border-[#1a1a1a]">
      <th class="text-left py-3 font-medium">Class</th>
      <th class="text-left py-3 font-medium">Annual Fee (₹)</th>
      <th class="text-left py-3 font-medium">Admission Fee (₹)</th>
      <th class="text-left py-3 font-medium">Total (₹)</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-[#e5e5e5]">
      <td class="py-3">Nursery</td>
      <td class="py-3">24,000</td>
      <td class="py-3">5,000</td>
      <td class="py-3">29,000</td>
    </tr>
    <tr class="border-t-2 border-[#1a1a1a] font-medium">
      <td class="py-3">Note</td>
      <td colspan="3" class="py-3 text-gray-600">
        Fees include textbooks and exam fees. Transport and meals billed separately.
      </td>
    </tr>
  </tbody>
</table>
```

**Rationale:** Black 2px header rule, hairline row rules, no hover, no gray fill. The "totals" or special row gets a thicker top rule. Reads like a printed fee schedule in a school prospectus.

### Alternative B — Compact list-table (for holiday calendars)

```html
<dl class="divide-y divide-[#e5e5e5]">
  <div class="py-4 grid grid-cols-3 gap-4">
    <dt class="text-sm font-medium">15 Aug 2025</dt>
    <dd class="col-span-2 text-sm text-gray-600">Independence Day — School Closed</dd>
  </div>
</dl>
```

Definition lists with hairline dividers. Better than a table for sequential, single-key-per-row data.

### When to use

| Data shape | Container |
|---|---|
| Tabular with multiple comparable columns | `<table>` with hairline rules, no gray fills |
| Sequential single-item rows (holidays, notices) | `<dl>` with hairline dividers |
| Sortable/filterable interactive tables | OK to use SaaS-style — only if truly interactive |
| Fees, exam schedules, results | Editorial table — no hover state |

---

## 7. IMAGERY TREATMENT

### The AI anti-pattern

```html
<div class="relative">
  <img src="hero.jpg" class="w-full h-[500px] object-cover" />
  <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
  <div class="absolute inset-0 flex items-center">
    <h1 class="text-white text-5xl">Welcome to Our School</h1>
  </div>
</div>
```

Full-width hero with `bg-gradient-to-r from-black/70 to-transparent`. The AI hero.

### Why it fails

- **Gradient overlays are SaaS hero defaults.** Every Vercel/Linear/Stripe template starts with this.
- **The image is degraded by 70% black.** If the photo is worth showing, show it. If it needs a 70% dark gradient to make text legible, it's the wrong photo or the wrong text.
- **Text-on-image is hard to make accessible.** White text on a busy photo fails WCAG contrast 80% of the time.

### Alternative A — Image as image (full-bleed, no overlay)

```html
<section class="relative">
  <img src="/photos/assembly-ground.jpg" class="w-full h-[70vh] object-cover" />
  <div class="absolute bottom-0 left-0 right-0 p-12">
    <h1 class="text-white text-4xl font-serif max-w-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
      75 Years of Education in Bagodar
    </h1>
  </div>
</section>
```

**Rationale:** No gradient. A text-shadow on the headline (not a black gradient on the whole image) gives legibility where the text sits, without degrading the rest of the photo.

### Alternative B — Image paired with text (editorial layout)

```html
<section class="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
  <img src="/photos/classroom.jpg" class="w-full aspect-[4/5] object-cover" />
  <div>
    <p class="text-xs uppercase tracking-widest text-gray-500 mb-4">Since 1958</p>
    <h2 class="font-serif text-4xl leading-tight mb-6">
      A school built on the values of its founding community.
    </h2>
    <p class="text-gray-700 leading-relaxed">
      What began as a single building on the Bagodar–Giridih road...
    </p>
  </div>
</section>
```

### Alternative C — Photo grid (for 117 event photos)

```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
  <img src="/photos/01.jpg" class="aspect-square object-cover hover:opacity-90 transition-opacity" />
  <!-- 117 more -->
</div>
```

**Rationale:** Edge-to-edge grid (1px gap, not 16px). Square aspect. No cards, no captions in the grid view.

### Rules for photo-heavy institutional sites

- **No overlay text on group photos.** Faces are the content; text over them obscures faces.
- **No rounded images.** Photos already have soft edges; rounding them twice looks like an iOS contact card.
- **No drop shadows on photos.** A printed photo doesn't float.
- **Black-and-white option for portrait galleries.** A consistent treatment across 30 staff portraits reads as intentional.
- **Aspect ratios should be consistent within a section.** All 4:3 in a news grid, or all square in a gallery.

---

## 8. INTERACTION DETAILS

### The AI anti-pattern

```css
.card { transition: all 0.3s ease; }
.card:hover { transform: scale(1.05); box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
.button:hover { transform: translateY(-2px); }
```

Hover scale, hover lift, hover shadow change. Every interaction moves something.

### Why it fails

- **Movement signals importance.** When every element moves on hover, nothing is important.
- **`scale-105` on hover is twitchy.** Cards are perceived as a layout grid. Lifting one looks like a glitch.
- **Hover states that change shape (translateY, scale)** are appropriate for buttons, not for static content.

### Rules for institutional interaction quality

| Element | Correct hover/focus | Why |
|---|---|---|
| Primary button | Color shift (background slightly darker) | Affirms click, doesn't move |
| Secondary link (text) | Underline appears/grows | The classic editorial signal |
| Card (clickable) | Border color change OR background tint, NOT scale | Stays in grid |
| Image | Slight opacity reduction (95%) OR scale-102 max | Subtle, doesn't compete |
| Nav link | Underline or color shift, current page = different weight | Hierarchy |
| Form input | Background tint, border emphasis (not thickness change) | Indicates active field |

### The "quality" interaction signals

1. **Timing.** `transition-duration: 200ms` for color/opacity. `300-400ms` for underline grows.
2. **Easing.** `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) or `cubic-bezier(0.16, 1, 0.3, 1)`. Avoid `linear`, avoid `bounce`.
3. **Focus rings must be visible.** `focus-visible:outline 2px solid black offset 2px`.
4. **Active state on press.** Buttons should have an `:active` state — slightly darker or inset.
5. **Cursor on interactive elements.** `cursor: pointer` only on actual clickable things.

### The "premium" tell

A premium site has fewer hover states than a cheap one. If everything is animated, the user has no signal of priority.

A well-designed site might have:

- 2-3 elements with hover transitions per page
- 1 element with motion on appearance (the headline)
- Everything else static

Restraint is the signal.

---

## 9. MOTION

### The AI anti-pattern

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
>
  <h2>Our Mission</h2>
</motion.div>
```

Every section wrapped in `whileInView` fade-up. framer-motion's template.

### Why it fails

- **Scroll-trigger fade-ups on every section create a parade.** The user can't read in peace.
- **`y: 20` is the AI default distance.** Every block rises the same amount at the same speed.
- **`viewport: { once: true }` is a band-aid.**
- **No motion is often better than gratuitous motion.** A static page reads as confident. A page where everything moves reads as nervous.

### Alternative A — One motion per page

Use motion once, in one place:

- The headline on the hero fades in on page load.
- A single image on the About page slides in once on scroll.
- The current section indicator in the nav updates on scroll (functional motion).

Everything else is static. No scroll-triggered animations.

### Alternative B — Page-load only, no scroll motion

```jsx
<motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.1 }}
>
  75 Years of Education in Bagodar
</motion.h1>
```

The headline fades in once when the page loads. The rest of the page is static.

### Alternative D — Functional scroll indicators only

```js
const scrollProgress = useScroll();
return <motion.div style={{ scaleX: scrollProgress }} className="h-px bg-black origin-left" />;
```

A hairline progress bar at the top. It moves because the user is reading. It serves them.

### When to use motion

| Use case | Appropriate motion |
|---|---|
| Page load (hero text, key image) | Single fade-in, 600-800ms |
| Navigation feedback (current section) | Underline slides to active link, 200ms |
| Reading progress | Hairline at top, scaleX from scroll position |
| Photo gallery open/close | Image crossfades, modal fades in |
| Form submission | Button text changes ("Submitting..." → "Submitted") |
| Toast/notification | Slides up from bottom-right, auto-dismiss in 3-4s |
| Every section on scroll | NEVER |

### Motion restraint rules

1. **Maximum 1 entrance animation per page load.** If the headline fades in, the image doesn't also fade in.
2. **No scroll-triggered animation below the fold.**
3. **Durations between 200-800ms.** Below 200ms feels broken. Above 800ms feels slow.
4. **Never animate layout.** Things that move should be transform/opacity. Never animate `width`, `height`, `top`, `left`.
5. **`prefers-reduced-motion`** must be respected:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### The institutional motion summary

A school website is read like a printed prospectus. The user opens it, reads it, decides to call or visit. Motion that helps that — a single headline fade, a progress bar — is welcome. Motion that decorates — every section rising on scroll, every card lifting on hover, every image zooming — is noise.

The best institutional sites feel like a well-printed annual report. You scroll, you read, nothing moves except your scroll position. The content is enough.

---

## Cross-cutting rules (the meta-patterns)

1. **Default to the printed page, not the SaaS app.** Borders, rules, and whitespace over shadows, blurs, and gradients.
2. **One motion per page load.** Not per section, not per element.
3. **Phone number as text, not as button.** The number is the CTA.
4. **Sentences for navigation when there are few items.** "About · Academics · Admissions · Contact" beats a 4-column footer.
5. **Square corners or 2-4px radius.** Pills are for tags, not interactive elements.
6. **Solid colors over gradients.** When the brand has one color, use it solid. Gradients dilute it.
7. **Black, white, and one gray.** Institutional palettes are usually two colors plus the grays that come from typography.
8. **Lowercase or sentence case, not Title Case.** "Apply for admission" not "Apply For Admission." Caps are for small-caps labels and proper nouns.
9. **Hairlines (1px borders) over shadows.** `border border-[#e5e5e5]` over `shadow-md`. The hairline reads as a printed rule; the shadow reads as floating.
