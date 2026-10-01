# University logos

The homepage marquee (`CC.LogoMarquee`, fed by `universities` in
`js/content.js`) renders each university as a wordmark set in that school's
brand colour. Drop a logo file in here to show the real mark instead.

## Adding one

1. Save the file in this folder, e.g. `mit.svg`.
2. Add a `logo` path to that university's entry in `js/content.js`:

   ```js
   { label: 'MIT', name: 'Massachusetts Institute of Technology',
     color: '#a31f34', logo: 'assets/logos/mit.svg' },
   ```

That is the whole change — no CSS or component edits. Entries without a
`logo` keep their wordmark, so you can add them one at a time.

If the file is missing or the path is wrong, that entry falls back to its
wordmark rather than showing a broken image. So a typo is invisible on the
page — check here if a logo you added is not appearing.

## File requirements

- **SVG preferred**, PNG at 2x as a fallback. The strip renders at 26–40px
  tall, so a raster file wants to be ~80px tall.
- **Transparent background.** The band behind it is tinted (`#f0f7f8`), not
  white, so a white box around the mark will show.
- **Full colour**, not a monochrome version — the strip no longer greys
  anything out.
- **Trim the whitespace** around the mark before saving. Most official files
  ship with generous padding, which makes the logo look smaller than the
  wordmarks beside it.
- Keep each file under ~20KB. Run SVGs through an optimiser.

## Before you use one

University logos are registered trademarks. Most schools publish brand
guidelines that restrict use by third parties, and many specifically
prohibit use that implies endorsement, affiliation or a partnership that
does not exist. "Our students were admitted here" is not automatically
covered.

Get the file from the university's own brand or media-relations page rather
than a logo aggregator, read the terms attached to it, and where the
guidelines require written permission, get it first.

The wordmark treatment exists so this strip works without any of that.
