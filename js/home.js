/* ==========================================================================
   HOME PAGE
   --------------------------------------------------------------------------
   Fills the [data-home="..."] mount points in index.html using the shared
   component library. Everything here is composed from CC.* components, so
   the home page and the inner pages stay visually consistent.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  function mount(name, html) {
    const el = document.querySelector('[data-home="' + name + '"]');
    if (el) el.innerHTML = html;
  }

  function initials(name) {
    return String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  CC.renderHome = function () {
    if ((document.body.getAttribute('data-page') || '') !== 'home') return;

    const content = window.CC_CONTENT || {};

    /* ---------- hero trust row ---------- */

    /* The student's portrait sits over their initials, so a photo that fails
       to load (onerror removes it) falls back to the coloured initials dot. */
    const people = (content.trustPhotos || content.testimonials || []).slice(0, 4);
    const dots = people
      .map(
        (p, i) =>
          `<span class="trust-dot${i % 2 ? ' trust-dot--peach' : ''}" aria-hidden="true">${esc(
            initials(p.name)
          )}${
            p.photo
              ? `<img class="trust-dot-img" src="${esc(CC.url(p.photo))}" alt="" loading="lazy" onerror="this.remove()" />`
              : ''
          }</span>`
      )
      .join('');

    mount(
      'trust',
      `<div class="trust-row">
         ${dots ? `<div class="trust-dots">${dots}</div>` : ''}
         <p class="trust-text">Trusted by students admitted across the <strong>USA</strong>, <strong>UK</strong> and <strong>Canada</strong>.</p>
       </div>`
    );

    /* ---------- stats ---------- */

    mount(
      'stats',
      CC.StatCounter([
        { value: 1000, suffix: '+', label: 'Students guided', sub: 'Since 2019' },
        { value: 60, prefix: '$', suffix: 'M+', label: 'Scholarships & aid', sub: 'Across all cycles' },
        { value: 20, prefix: 'Top ', label: 'Universities', sub: 'US News rankings' },
      ]) +
        `<p class="stats-footnote">
           <a class="btn btn-ghost" href="results/index.html">See our full results
             <svg class="i" aria-hidden="true"><use href="#i-arrow-right"></use></svg>
           </a>
         </p>`
    );

    /* ---------- admits marquee ----------
       Sits inside the stats band, below the numbers, so "Top 20
       universities" is immediately followed by which ones. The mount point
       is outside .wrap on purpose — the strip runs edge to edge and fades
       into the margins rather than stopping at the text column. */

    mount(
      'admits',
      `<div class="wrap">
         <div class="rule"></div>
         ${CC.SectionHead({ eyebrow: 'Where our students got in', center: true })}
       </div>` +
        CC.LogoMarquee(content.universities, {
          speed: 26,
          label: 'Universities College Crafters students have been admitted to',
        })
    );

    /* ---------- how we work ---------- */

    mount(
      'work',
      CC.SectionHead({
        eyebrow: 'How we work',
        title: 'Five steps, start to offer',
        titleHtml: 'Five steps, <em>start to offer</em>',
        lede: 'The same process for every student, adapted to the country you are applying to. Nothing is left to the last week.',
        center: true,
      }) +
        CC.WorkflowSteps([
          { icon: 'compass', title: 'Discovery', text: 'We find the story only you can tell, and what you actually want out of university.' },
          { icon: 'target', title: 'Strategy', text: 'A balanced school list built around fit, funding and your real odds.' },
          { icon: 'edit', title: 'Execution', text: 'Essays, activities and testing, shaped so every piece points the same way.' },
          { icon: 'send', title: 'Applications', text: 'Portals, deadlines, recommendations and aid forms — handled and checked.' },
          { icon: 'award', title: 'Admission', text: 'Interviews, waitlists, offer comparisons and the final decision.' },
        ]) +
        `<p class="work-footnote">
           <a class="btn btn-ghost" href="application-process/index.html">See the full process
             <svg class="i" aria-hidden="true"><use href="#i-arrow-right"></use></svg>
           </a>
         </p>`
    );

    /* ---------- comparison ---------- */

    mount(
      'compare',
      CC.SectionHead({
        eyebrow: 'Why it works',
        title: 'Generic advising vs. College Crafters',
        titleHtml: 'Generic advising vs. <em>College Crafters</em>',
        lede: 'Most students are handed a checklist. We build one story and make every part of the application carry it.',
        center: true,
      }) +
        CC.ComparisonTable({
          oldTitle: 'The old way',
          newTitle: 'With College Crafters',
          rows: [
            { old: 'A school list copied from rankings', new: 'A list built around fit, funding and real odds' },
            { old: 'Essays edited into someone else’s voice', new: 'Essays that still sound like you when they are done' },
            { old: 'Activities listed as a random pile', new: 'Activities that read as one clear pattern' },
            { old: 'Testing decided by default, not strategy', new: 'A testing plan matched to each school on your list' },
            { old: 'Financial aid treated as an afterthought', new: 'Aid and scholarships planned from day one' },
            { old: 'Deadline panic in the final week', new: 'A timeline that starts 12–18 months out' },
          ],
        })
    );

    /* ---------- personas ---------- */

    mount(
      'personas',
      CC.SectionHead({
        eyebrow: 'Where are you starting?',
        title: 'Find the track that fits',
        titleHtml: 'Find the track that <em>fits</em>',
        lede: 'Different starting points need different plans. Pick the one that sounds like you.',
        center: true,
      }) +
        CC.PersonaCards([
          {
            icon: 'sparkle',
            title: 'Early-years student',
            blurb: 'Grades 8–10, with time to build a profile properly.',
            needsTitle: 'What you need',
            needs: ['A long-run profile plan', 'Subject and activity choices', 'No wasted summers'],
            ctaLabel: 'Junior Program',
            ctaHref: 'programs/junior-program/index.html',
          },
          {
            icon: 'target',
            title: 'Exam-year student',
            blurb: 'Testing season is here and the school list is still open.',
            needsTitle: 'What you need',
            needs: ['A score strategy that fits your list', 'Diagnostic and coaching', 'Realistic target scores'],
            ctaLabel: 'SAT/ACT',
            ctaHref: 'programs/sat-act/index.html',
          },
          {
            icon: 'edit',
            title: 'Applying this cycle',
            blurb: 'Deadlines are close and the essays are not written.',
            needsTitle: 'What you need',
            needs: ['A finished, balanced school list', 'Essays in your own voice', 'Every portal submitted on time'],
            ctaLabel: 'Undergraduate',
            ctaHref: 'programs/undergrad/index.html',
          },
          {
            icon: 'users',
            title: 'Parent',
            blurb: 'You want to know the plan, the cost and who is accountable.',
            needsTitle: 'What you need',
            needs: ['A clear timeline you can see', 'Honest talk about aid and cost', 'One point of contact'],
            ctaLabel: 'Book a meeting',
            ctaBooking: true,
          },
        ])
    );

    /* ---------- testimonials carousel ---------- */

    const hasQuotes = (content.testimonials || []).some((t) => t && t.quote);

    mount(
      'quotes',
      CC.SectionHead({
        eyebrow: 'Testimonials',
        title: 'In their own words',
        titleHtml: 'In their <em>own words</em>',
        center: true,
      }) +
        CC.QuoteCarousel(content.testimonials, {
          interval: 7000,
          label: 'What students and parents say about College Crafters',
        }) +
        (hasQuotes
          ? `<p class="work-footnote">
               <a class="btn btn-ghost" href="testimonials/index.html">Read more stories
                 <svg class="i" aria-hidden="true"><use href="#i-arrow-right"></use></svg>
               </a>
             </p>`
          : '')
    );

    /* ---------- final CTA ---------- */

    mount(
      'cta',
      CC.CTABand({
        title: 'Let’s find the story only you can tell',
        text: 'Book a meeting and we will walk you through where you stand and what the next twelve months should look like.',
        buttons: [
          { label: 'Book a Meeting', booking: true },
          { label: 'See our programs', href: 'programs/index.html' },
        ],
      })
    );

    /* CTABand builds its own <section>, so unwrap the mount point. */
    const ctaMount = document.querySelector('[data-home="cta"]');
    if (ctaMount && ctaMount.firstElementChild) {
      ctaMount.replaceWith(ctaMount.firstElementChild);
    }
  };
})(window, document);
