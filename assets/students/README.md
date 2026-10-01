# Student photos

Portraits for the story cards on the testimonials page.

Until a photo is added, a card shows the student's initials on a wash of the
card's accent colour. That placeholder is the designed default, not a broken
state — the page looks finished with no photos at all, and you can add them
one at a time.

## Adding one

1. Save the photo here, e.g. `hamza-r.jpg`.
2. Set `photo` on that testimonial in `js/content.js`:

   ```js
   { headline: '...', name: 'Hamza R.', photo: 'assets/students/hamza-r.jpg', ... }
   ```

If the file is missing or the path is wrong, the card falls back to the
initials placeholder rather than showing a broken image. So a typo is
invisible on the page — check here if a photo you added is not appearing.

## File requirements

- **Landscape, roughly 16:10.** Cards crop to that with `object-fit: cover`,
  so a portrait-orientation phone photo will crop hard top and bottom. The
  featured card at the top of the page crops taller, so keep the subject
  near the centre.
- **About 800×500px** is plenty. The card never renders wider than ~560px.
- **JPEG** for photographs, compressed to roughly 100–200KB.
- Faces should sit slightly above centre. The featured card is taller than
  the grid cards, and a centred crop reads better in both.

## Before you publish one

A recognisable photo of a student, tied to their name, school and result, is
personal information about a real person, usually a recent school-leaver and
sometimes a minor.

Get written permission for the photo specifically — permission to use a quote
is not permission to use a picture. For anyone under 18 at the time the photo
was taken, get it from a parent or guardian. Keep a record of who agreed to
what, and take the photo down promptly if someone later asks you to.

If a student is happy to be quoted but not pictured, leave `photo` empty. The
initials placeholder is there exactly for that case.
