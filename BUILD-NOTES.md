# Krishna Astro — Build Notes (internal reference, not a site page)

## Status: 26 pages, revised after client feedback ✅

Second design pass based on direct feedback. What changed:

### Fixed bugs
- **Desktop nav was detached from the header bar.** Root cause: an earlier fix
  for a mobile-drawer bug had moved `<nav>` outside `<header>`, which broke
  desktop layout (nav rendered as a separate full-width strip). Fixed by
  removing the header's `backdrop-filter` (not needed now it's a solid navy
  fill) and moving nav back inside — that also let the mobile drawer keep
  working correctly.
- **Header silently clipped content between 900–1180px viewport widths** —
  `overflow-x:hidden` (added earlier to hide the off-canvas drawer) was
  masking real overflow instead of showing it, so it went undetected by
  simple scrollWidth checks. Found by checking actual element bounding boxes
  instead. Fixed by moving the desktop-nav breakpoint to 1180px and
  shortening two nav labels ("Best Astrologer in Bardoli" → "Bardoli" in the
  nav only — footer keeps the full phrase).
- Re-validated the entire site with a stricter method afterward: every
  visible element's bounding box checked against the viewport (not just
  `document.documentElement.scrollWidth`, which `overflow-x:hidden` can
  mask) — 312 checks (26 pages × 12 widths from 360–1920px), zero overflow.

### Visual changes
- Header and footer background: deep navy `#0C225D` (new `--navy` token).
- Logo placeholder box (`.logo-ph`) added in both header and footer —
  currently a text placeholder, swap for a real logo image/SVG.
- Footer link underlines removed (were on by default site-wide); nav, footer
  and card links now rely on colour + hover-underline, which reads cleaner.
  In-body prose links keep their underline for in-sentence clarity.
- Homepage/services service cards rebuilt as photo-cards (image + title +
  description + inline Call/WhatsApp buttons), matching the layout style
  from the reference screenshot the client shared — kept in the site's
  white/orange palette rather than copying that reference's dark theme,
  since navy was only requested for header/footer. Flag if the darker
  theme was actually wanted site-wide.
- Testimonials converted from a static scroller to an auto-scrolling
  marquee (`.testimonial-marquee` / `.testimonial-track`) — pauses on
  hover/focus, disables entirely for `prefers-reduced-motion`. Each card now
  has a circular avatar placeholder showing the reviewer's initials.

### Content
- Every main/service/city page now clears **1,000+ words of body+FAQ
  content with testimonial text excluded from the count** — added a new
  ~150–300 word section to 17 pages that previously only cleared 1,000
  words by counting review text. Verified programmatically per page.

## Full sitemap (26 pages) — all built, same list as before
See file listing in this folder — no filename changes in this pass, only
in-page content/structure.

## Known placeholders to replace before launch
- `.logo-ph` boxes (header + footer, every page) — real logo needed.
- `.img-ph` / `.arch-frame` photo placeholders — still text-labelled boxes.
- Homepage stats (15+ years, 1,200+ consultations, 4.9/5 rating).
- Astrologer's name/photo, JSON-LD business address, Contact page
  address/hours.
- **All testimonials, site-wide** — sample/placeholder content, flagged
  in-page with an HTML comment on every testimonial block. See prior note:
  publishing invented reviews as genuine customer testimonials carries real
  consumer-protection and Google-policy risk.
- Policy pages (Privacy/Terms/Refund) — draft legal content, not reviewed by
  a lawyer, flagged with an HTML comment on each page.

## Design tokens added this pass (css/style.css)
- `--navy: #0C225D`, `--navy-soft`, `--on-navy`, `--on-navy-soft`
- `.btn--onNavy` — outline button variant for use on the navy header
- `.logo-ph` — logo placeholder box
- `.testimonial-marquee` / `.testimonial-track` / `.testimonial-avatar` —
  replaces the old `.testimonial-scroller`
- Nav breakpoint moved from `900px` to `1180px` (both the nav-toggle switch
  and the mobile sticky CTA bar's hide point — they're kept in sync
  deliberately, otherwise there's a dead zone with no visible Call/WhatsApp
  button)

## Third pass — final QA before going live

Ran a full staging/bug-finder pass covering content, technical SEO, functional
bugs, image coverage, and the reported spacing issue. Found and fixed:

- **Real spacing bug**: every inner page's hero image and body-section images
  were stacking full-width above/below the text instead of sitting beside it,
  creating large empty-feeling blocks (confirmed from the client's own
  screenshot). Fixed: hero image now sits side-by-side with the hero text on
  desktop (matching the homepage's pattern); body-section images now float
  beside their paragraph with proper containment (verified with a specific
  check that no float bleeds past its own section into the next one).
- **Placeholder image style**: swapped the bold solid-color placeholder for a
  lighter, icon-based one (dashed border, small image icon, muted label) so
  it reads as "photo goes here" rather than a heavy blank block.
- **Missing technical SEO basics**: added `sitemap.xml` (26 URLs) and
  `robots.txt`, plus a canonical tag + Open Graph tags to every page. All use
  a placeholder domain (`https://www.krishnaastro.com`) — **update this to
  the real domain before launch**, in `sitemap.xml`, `robots.txt`, and every
  page's `<link rel="canonical">` / `og:url` tag.
- Verified (not just asserted): title/meta-description uniqueness across all
  26 pages, exactly one `<h1>` per page, zero HTML parse errors, zero broken
  internal links, zero element-level overflow across 286 checks (26 pages ×
  11 widths, using actual bounding-box positions rather than
  `document.documentElement.scrollWidth`, which `overflow-x:hidden` can
  mask), zero JS console errors on load, and that the nav toggle / FAQ
  accordion both function correctly.
- Image count re-confirmed: every content page still has 4+ placeholders
  (the 3 policy pages remain the deliberate exception).
- Word count re-confirmed after the layout changes: all 22 content pages
  still clear 1,000+ words excluding testimonial text.

## Fourth pass — client-reported issues (all fixed)

1. **Invisible checkmarks in "Why Families Choose"** — CSS specificity bug:
   `.checklist span` was overriding `.check-icon`'s white colour with muted
   brown, making the tick nearly invisible on the orange circle. Fixed with
   `.checklist .check-icon { color: var(--white); }` — fixes site-wide.

2. **Mobile menu: Call button overlap + menu couldn't be closed** — two
   stacked bugs. (a) The drawer is 320px on a 390px screen by design, so the
   full-width sticky Call/WhatsApp bar peeked out beside it; now hidden while
   the drawer is open. (b) The hamburger button had no `position`/`z-index`,
   so the open drawer covered it and tapping it again did nothing — users
   were stuck. Fixed, plus the icon now swaps to an X, and the button got a
   solid navy background (without it, the white icon was invisible against
   the drawer's white panel behind it).

3. **Unnecessary space between sections** — root cause was structural, not
   padding: earlier content additions created back-to-back sections with the
   *same* background, so two full section paddings stacked with no visual
   break. Merged those 17 additions into their preceding section as `<h3>`
   subsections. Verified: zero consecutive same-background sections site-wide.

4. **Images too small / wasted side space** — body images were floated at a
   fixed 320px inside a narrow 78ch column. Replaced with a proper
   `.content-split` two-column grid (1.2fr text / 1fr image) in a 1100px
   container, so images get a real share of the width. Hero figure cap raised
   380px → 480px.

   **Regression caught during this change:** the transform script's
   unbounded `(.*?)` capture crossed element boundaries and shuffled content
   between adjacent sections on 18 pages (a heading ended up paired with the
   wrong paragraph). Detected, root-caused, and repaired with string-based
   extraction; verified every `.content-split` is structurally complete via
   browser-side DOM checks.

5. **Footer centring** — footer now centres on mobile (where the stacked
   single column otherwise looked adrift) and stays left-aligned on desktop
   where four columns read better.

6. **"Too plain"** — added: warm radial gradient wash behind every hero,
   subtle dotted texture on sand sections, gradient on the deep CTA band,
   short gradient accent rules under major headings, hover lift + shadow on
   service cards, hover tint on stat blocks, accent top-border on testimonial
   cards, and hover states on FAQ rows.

All re-verified after the changes: 0 HTML parse errors, 0 broken links, 0 JS
errors, 0 element-level overflow across 286 checks (26 pages × 11 widths),
and all 22 content pages still clear 1,000+ words excluding review text.
