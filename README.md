# College Crafters — multi-page site

A static, multi-page site. Every navigation link is its own page with its own URL — there is no
single long scrolling page.

**No build step.** Open `index.html` in a browser, or upload the folder to any static host.
Paths are resolved at runtime from `<body data-root="...">`, so the site works from disk
(`file://`), from a domain root, and from a sub-folder without changes.

**Stack:** HTML + CSS + vanilla JS. Chosen over a framework because the site is fully static,
has no build tooling, and needs to keep working when opened directly off disk.

---

## Structure

```
index.html                     Home page (hand-written hero + component-built sections)

css/
  styles.css                   Design tokens, base type, buttons, hero, legacy section styles
  site.css                     Header, dropdowns, mobile menu, footer, component library
  part2.css                    Story Workbook, SAT/ACT, Blog and article styles

js/
  nav-data.js                  ← ALL routes live here (nav, buttons, footer columns)
  page-content.js              ← Per-page content for every standard page
  components.js                Reusable components (see below)
  layout.js                    Renders header + footer, wires dropdowns / mobile menu
  site.js                      Boots a page: layout → content → components → page module
  home.js                      Home page only
  content.js                   Team, board, process, updates, testimonials, journal,
                               College Seekers network (pre-existing data file)

  page-story-workbook.js       ─┐
  page-sat-act.js               │  Content-heavy pages, one module each.
  page-junior-program.js        │  Registered on CC.pageModules[<data-page>].
  page-financial-aid.js        ─┘  See "Content-heavy pages" below.

assets/                        Logo, mark, favicon, illustrations

team/                          ─┐
application-process/            │
programs/                       │  One folder per route, each containing index.html.
resources/                      │  Every shell is ~30 lines and identical except for
updates/                        │
testimonials/                   │
college-seekers/                │
journal/                        │
blog/                           │  + blog/financial-aid-guide/
                                ─┘
```

There is no `book-meeting/` page. "Book Meeting" is a dropdown (`CC.BookingTrigger` in
`js/components.js`) that opens a small menu of the two links in `content.js`'s
`site.booking` — it never navigates. See "The Book Meeting dropdown" below.

### Content-heavy pages (Part 2)

Five routes are built by their own module instead of the `page-content.js` block system:

| Route | Module |
| --- | --- |
| `resources/story-workbook/` | `js/page-story-workbook.js` |
| `programs/sat-act/` | `js/page-sat-act.js` |
| `programs/junior-program/` | `js/page-junior-program.js` |
| `blog/` | `js/page-financial-aid.js` |
| `blog/financial-aid-guide/` | `js/page-financial-aid.js` |

A module registers itself against the page key and `site.js` runs it after `renderPage()`:

```js
(CC.pageModules = CC.pageModules || {})['programs/sat-act'] = function () {
  const root = document.querySelector('[data-part2]');
  root.innerHTML = CC.SectionHead({...}) + CC.CardGrid([...]);
  CC.initComponents(root);
};
```

Their shells use `<main id="main" data-part2>` and load `css/part2.css` plus their module.
They all open with a full hero and so have **no** `page-content.js` entry at all — `site.js`
leaves their `<main>` alone.

**There is no blog listing page.** `/blog/` *is* the financial aid guide, so Insight > Blog
opens the article directly with nothing in between. One module serves both routes and only
swaps the breadcrumb and the second CTA button:

```js
const onBlogRoute = (document.body.getAttribute('data-page') || '') === 'blog';
modules.blog = modules['blog/financial-aid-guide'] = renderGuide;
```

The deeper `/blog/financial-aid-guide/` url is kept as an alias so existing links to it still
resolve. To publish a second article, give it its own route and turn `/blog/` back into a
listing page.

The Story Workbook additionally autosaves to `localStorage` (`cc-story-workbook-v1`) and
lazy-loads jsPDF from CDN on first click of Download PDF — nothing is fetched until then,
so the page still works offline.

---

## Reusable components

All live in `js/components.js` under the `CC` namespace. Each returns an HTML string:

| Component | Signature |
| --- | --- |
| `CC.PageBanner` | `({ eyebrow, title, subtitle, trail })` — title + breadcrumb |
| `CC.StatCounter` | `([{ value, prefix, suffix, decimals, label, sub }])` — counts up on scroll. Pass `text` instead of `value` for a static, non-counting figure. |
| `CC.WorkflowSteps` | `([{ icon, title, text, href?, linkLabel? }])` — horizontal desktop / vertical mobile |
| `CC.ComparisonTable` | `({ oldTitle, newTitle, rows: [{ old, new }] })` — red X / green check |
| `CC.PersonaCard` | `({ icon, title, blurb, needsTitle, needs, ctaLabel, ctaHref \| ctaBooking })` |
| `CC.PersonaCards` | `([...])` — grid of the above |
| `CC.Accordion` | `([{ q, a }], { openFirst })` — FAQ |
| `CC.SectionHead` | `({ eyebrow, title, titleHtml, lede, center })` |
| `CC.CardGrid` | `([{ icon, kicker, title, text, href }], { cols })` |
| `CC.EditorialCard` | `({ eyebrow, title, description, image, icon, href, rotation, variant, imagePosition, headingLevel, reveal, className })` — the premium editorial surface |
| `CC.EditorialCardGrid` | `([...cards], { cols, rotations, className })` — laid-out set, staggered reveal |
| `CC.CTABand` | `({ title, text, buttons: [{ label, href } \| { label, booking: true }] })` |
| `CC.BookingTrigger` | `({ label, btnClass, align: 'left'\|'center'\|undefined, chevron })` — the "Book Meeting" dropdown; see below |
| `CC.Placeholder` | `(text)` — the dashed "replace me" note |
| `CC.icon` | `(name, extraClass)` — from the sprite in `components.js` |

Behaviour (counters, accordions, step reveals, and every booking dropdown) is activated by
`CC.initComponents()`, which `site.js` already calls and which is safe to call again after
injecting new markup.

**Adding a "Book a Meeting" button anywhere:** pass `booking: true` instead of `href` to a
`CTABand` button or `{ ctaBooking: true }` to a `PersonaCard`, or drop `CC.BookingTrigger({...})`
directly into any template string. `CC.wireBookingButtons()` (called by `initComponents`) finds
every instance on the page, populates its menu from `content.js`'s `site.booking`, and handles
open/close — including closing any other open one first, Esc, and click-outside. No page, no
route, nothing else to wire up.

```js
document.querySelector('#x').innerHTML = CC.StatCounter([
  { value: 1000, suffix: '+', label: 'Students guided' },
]);
CC.initComponents();
```

---

## Adding a nav item or page

**1. Add the route** in `js/nav-data.js`:

```js
{
  key: 'programs/gap-year',                     // unique id
  label: 'Gap Year',
  href: 'programs/gap-year/index.html',         // path from the SITE ROOT
}
```

Put it in an existing item's `children` array, or add a whole new top-level item with its own
`children`. The header, mobile menu and breadcrumb all pick it up automatically.

**2. Add the content** in `js/page-content.js`, keyed by the same `key`:

```js
'programs/gap-year': {
  eyebrow: 'Programs',
  title: 'Gap Year',
  subtitle: 'One line under the page title.',
  blocks: [
    { type: 'cards', title: 'What it covers', cols: 3, items: [...] },
    { type: 'accordion', title: 'Questions', items: [{ q: '...', a: '...' }] },
  ],
},
```

Available block types: `text`, `cards`, `list`, `steps`, `stats`, `comparison`, `personas`,
`accordion`, `data`, `booking-form`, `placeholder`, `cta`.

### Process diagrams

`css/process.css` holds two diagram shapes. Which one a track uses is declared in the data,
because the choice is about meaning, not styling:

```js
{ id: 'us', mode: 'map',  steps: [...], outcome: { title, text, icon } }
{ id: 'general', mode: 'flow', steps: [...] }
```

| Mode | Component | Use when |
| --- | --- | --- |
| `flow` | `CC.ProcessFlow` | The order is real — step 2 genuinely follows step 1. Numbered timeline, connecting line fills as each step scrolls in. |
| `map` | `CC.RequirementMap` | The parts are weighed **together**. Unnumbered cards converging on one outcome node. |

The country tracks (`us`, `uk`) are `map` on purpose. Academics, testing, essays and references
are assessed as a set, so numbering them 1–5 would tell a student to finish academics before
starting essays. `general` is a real sequence, so it stays a `flow`.

A track with no `mode` falls back to the original `.tsteps` markup, so nothing has to be migrated.

`RequirementMap`'s connector is pure CSS: each pillar drops a stem, a bus spans pillar-centre to
pillar-centre via `--n`, and a single drop feeds the outcome. No measurement, so it survives any
pillar count. Below 1000px the pillars stack and the bus is hidden, because "centre to centre"
stops meaning anything once they are in one column.

### Section surfaces and layouts

Every block can set two extra keys that control the *section* wrapping it:

```js
{ type: 'cards', surface: 'tint', layout: 'split', title: 'Go deeper', items: [...] }
```

- **`surface`** — `'white' | 'tint' | 'warm'`. Omit it and `renderPage` alternates
  white/tint automatically.
- **`layout`** — `'default' | 'split' | 'wide' | 'center'`.

`split` is the asymmetric one: the section head takes its own column and stays put (sticky)
while the content scrolls past it, collapsing to stacked below 900px. **It needs the block to
have a `title`** — without one the head column renders empty.

Surfaces are assigned in JS, not by a CSS `:nth-of-type` rule. That rule used to live in
`site.css` and was wrong in two ways: it counted *all* `<section>` siblings, so a CTA band
mid-page flipped the shading of everything after it, and pages with different block counts
ended up with unrelated rhythms. `renderPage` counts only real content blocks instead.

### The editorial card system

`css/editorial.css` holds the premium editorial surface: soft cream/white cards, generous
whitespace, a photo fading into the card edge, a slight tilt, and a staggered scroll reveal.

A `cards` block opts in with one flag — no content is rewritten, because `site.js` maps the
existing `{ icon, kicker, title, text, href }` shape onto `EditorialCard`'s props:

```js
{ type: 'cards', editorial: true, cols: 3, items: [...] }
```

**The page must also link `css/editorial.css`** next to `site.css`, or the cards render unstyled.

It is opt-in rather than the default on purpose: Home and Team are frozen, and Team's hub page
uses a `cards` block that must keep rendering the original `CardGrid`.

Two rules the system applies for you:

- **Rotation is for narrow cards.** `cols: 3` or more tilts `-3° / 1° / -2°`; `cols: 2` makes
  cards wide, where the same angle reads as a rendering fault, so those sit flat. Override per
  grid with `rotations: [...]`.
- **Rotation is desktop-only** — neutralised below 900px, where cards stack.

Pass `icon` and it is used *only* when no `image` is supplied, so icon-based content converts
without losing its visual anchor.

The `data` block pulls live content out of `content.js` — `team`, `board`, `updates`,
`deadlines`, `testimonials`, `journal`, `seekers`, `process:general`, `process:us`, `process:uk`.

**3. Create the page shell** at `programs/gap-year/index.html`. Copy any existing inner page and
change three things:

```html
<body data-page="programs/gap-year" data-root="../../">
```

- `data-page` — the key from step 1
- `data-root` — `../` per folder level (`programs/gap-year/` is two levels deep → `../../`)
- `<title>` and the `description` meta

That is all. No script changes.

### Writing a fully custom page (Part 2)

Skip `page-content.js` and write markup straight into `<main>`. `site.js` only fills
`[data-banner]` and `[data-page-content]`, so anything else you put in `<main>` is left alone.
Keep `[data-banner]` if you still want the standard title + breadcrumb, and import the components
above so the page matches the rest of the site.

### Opening a nav link in a new tab

Add `newTab: true` to a nav entry. Everything under **Insight** uses this:

```js
{ key: 'blog', label: 'Blog', href: 'blog/index.html', newTab: true }
```

### Document links (PDF / brochure)

Add `doc: true` to a nav entry. Same new-tab behaviour, plus a small document icon:

```js
{ key: 'resources/brochure', label: 'Brochure', href: 'assets/brochure.pdf', doc: true }
```

### A note on Insight

Blog, Resources, Journal and Updates are no longer top-level nav items — they are
children of **Insight**. Their own sub-pages (Story Workbook, Admissions Updates,
Deadlines, Essays, Guides, Case Studies) are therefore not in the nav at all, so each
section's overview page carries cards linking to them. If you add another sub-page under
one of those sections, add a card to its overview page in `page-content.js` too, or it
will be unreachable.

---

## Design rules

- **Palette:** white / off-white surfaces, teal `#0d7377` for structure and headings, amber
  `#e8a54b` for accents and the active-nav underline. No dark sections anywhere, including the
  footer and every CTA band.
- **Type:** serif (`--font-head`) for the logo and headings, `Outfit` for body, Courier-style
  mono for nav links, labels and buttons.
- **Surfaces:** alternate sections with `.section--white`, `.section--tint`, `.section--warm`.
  Never shade by `:nth-of-type` — pages have different section counts.
- Colours, radii, shadows and easing are CSS variables at the top of `styles.css`.

## Accessibility

Semantic landmarks, skip link, `aria-haspopup` / `aria-expanded` on dropdowns, `aria-expanded` +
`aria-controls` on accordions, `aria-current="page"` on the active nav item and breadcrumb,
visible focus rings, labelled form fields, and a `prefers-reduced-motion` block that disables
the counters and step reveals.

Dropdowns open on hover **and** keyboard focus, and close on mouse-out, focus-out or `Esc`.

## Before going live

- **Placeholder copy** is marked on-page with a dashed amber note. Search `page-content.js` and
  `js/page-*.js` for `Placeholder` to find everything that still needs real content.
- **Financial aid guide — university data is real, client-supplied copy** (last updated March
  2026 per the article header). The full list — every tier, tag, figure and date — lives in
  `js/page-financial-aid.js` as plain data arrays (`US_TIERS`, `UK_GOV`/`UK_UNI`, `CANADA`,
  `EUROPE`, `MIDDLE_EAST`, `TIMELINE`). Aid policies change yearly, so the article closes with a
  disclaimer telling readers to confirm the current position with each university — re-check the
  data against a fresh pull whenever the guide is refreshed, rather than treating this file as a
  one-time source of truth.
- **Story Workbook case studies** use invented student narratives to show the card format.
  Replace with real, permissioned stories before publishing.
- **SAT vs ACT spec table** reflects published formats, but both tests changed recently —
  verify every row against current College Board and ACT specifications.
- **The Book Meeting dropdown** links out to two live external Notion calendars
  (`content.js` → `site.booking`) — nothing to wire up. To add a third option, add an entry to
  that array; every "Book a Meeting" trigger on the site (header, hero, CTA bands, footer,
  persona cards) picks it up automatically.
- **Heading font:** the live site uses a *trial* build of Tiempos Text, which is not licensed for
  production. This project uses Source Serif 4 (free, Google Fonts) as a close stand-in. Buy a
  Tiempos web licence and add its `@font-face` rules and it will be picked up automatically.
- **Clean URLs:** routes end in `/index.html` so the site works off disk. On a real host you can
  drop the suffix in `nav-data.js` (`programs/undergrad/`) — but then it will only work over HTTP,
  not `file://`.
