/* ==========================================================================
   NAVIGATION + FOOTER CONFIG — single source of truth
   --------------------------------------------------------------------------
   Every route in the site is declared here once. The header, the mobile menu,
   the footer and the breadcrumb on each page are all generated from this file.

   To add a page: add an entry here, then create the matching HTML shell.
   See README.md > "Adding a nav item or page".

   href    Path from the SITE ROOT. Always ends in index.html so the site also
           works when opened straight off disk (file://) with no server.
   key     Unique id. Each page shell declares the same value in
           <body data-page="...">, which drives the active nav underline and
           the breadcrumb.
   doc     Optional. true = this link is a document (PDF/brochure). It opens
           in a new tab and renders with a small document icon.
   newTab  Optional. true = open in a new tab, with no document icon (used
           by everything under Insight).
   group   Optional. Renders a labelled sub-group inside a dropdown instead of
           a plain link (used by "Our Services").
   ========================================================================== */

/* Site-wide notice bar, pinned above the header on every page. Set to null
   (or delete the assignment) to remove it entirely — nothing else references
   it. dismissKey persistence lives in js/layout.js. */
window.CC_ANNOUNCE = {
  tag: 'Public Statement',
  text: 'A breach of trust every parent needs to know about.',
  ctaLabel: 'Read our statement',
  ctaHref: 'public-statement/index.html',
  ctaNewTab: true,
};

window.CC_NAV = [
  {
    key: 'team',
    label: 'Team',
    href: 'team/index.html',
    children: [
      { key: 'team/core-team', label: 'Core Team', href: 'team/core-team/index.html' },
      { key: 'team/board-members', label: 'Board Members', href: 'team/board-members/index.html' },
    ],
  },

  {
    key: 'application-process',
    label: 'The Application Process',
    href: 'application-process/index.html',
    children: [
      {
        key: 'application-process/what-we-offer',
        label: 'What We Offer',
        href: 'application-process/what-we-offer/index.html',
      },
      {
        group: 'Our Services',
        items: [
          {
            key: 'application-process/services/united-states',
            label: 'United States',
            href: 'application-process/services/united-states/index.html',
          },
          {
            key: 'application-process/services/uk',
            label: 'UK',
            href: 'application-process/services/uk/index.html',
          },
        ],
      },
      {
        key: 'application-process/timeline',
        label: 'Timeline',
        href: 'application-process/timeline/index.html',
      },
      /* SAT/ACT sits here, in the slot the old "Services" item used.
         Key follows NAV placement, href follows the FOLDER: the active-nav
         test matches ancestors by key prefix, so a key of 'programs/sat-act'
         would light up Programs too. The page stays at /programs/sat-act/ —
         only data-page and the module key move with it. */
      { key: 'application-process/sat-act', label: 'SAT/ACT', href: 'programs/sat-act/index.html' },
    ],
  },

  {
    key: 'programs',
    label: 'Programs',
    href: 'programs/index.html',
    children: [
      { key: 'programs/undergrad', label: 'Undergraduate', href: 'programs/undergrad/index.html' },
      { key: 'programs/grad', label: 'Graduate', href: 'programs/grad/index.html' },
      /* Senior Program and Junior Program are not listed here — they are
         the two categories on the Undergraduate page, and each has its own
         page reached from there and from the footer.
         SAT/ACT is listed under The Application Process, not here. */
      /* Also reachable from its own top-level item. Listed here because it is
         one of the programs students choose between; opens in a new tab so
         the current page is not lost, matching the Insight items. */
      { key: 'college-seekers', label: 'College Seekers', href: 'college-seekers/index.html', newTab: true },
    ],
  },

  {
    key: 'insight',
    label: 'Insight',
    href: 'insight/index.html',
    children: [
      { key: 'blog', label: 'Blog', href: 'blog/index.html', newTab: true },
      { key: 'resources', label: 'Resources', href: 'resources/index.html', newTab: true },
      { key: 'journal', label: 'Journal', href: 'journal/index.html', newTab: true },
      { key: 'updates', label: 'Updates', href: 'updates/index.html', newTab: true },
    ],
  },

  /* Its own top-level item, no dropdown. It used to sit under Testimonials
     as /testimonials/results/; it moved out so the charts are one click from
     anywhere, and the home page stats band links straight to it. */
  { key: 'results', label: 'Results', href: 'results/index.html' },

  {
    key: 'testimonials',
    label: 'Testimonials',
    href: 'testimonials/index.html',
    children: [
      { key: 'testimonials/student-stories', label: 'Student Stories', href: 'testimonials/student-stories/index.html' },
      { key: 'testimonials/parent-reviews', label: 'Parent Reviews', href: 'testimonials/parent-reviews/index.html' },
    ],
  },

  /* College Seekers is no longer a top-level item — it sits under Programs
     and opens in a new tab. Its Undergraduate and Graduate pages are reached
     from the two cards on the College Seekers landing page. The old
     Financial Aid & Scholarships page was deleted; the long-form guide at
     blog/financial-aid-guide covers that ground. */
];

/* Pill button on the right of the header. Book Meeting has no page —
   `booking: true` makes it open the dropdown of booking links
   (site.booking in content.js) instead of navigating. */
window.CC_NAV_BUTTONS = [
  { key: 'book-meeting', label: 'Book Meeting', booking: true, variant: 'solid' },
];

/* Footer columns. Links use the same root-relative hrefs as the nav. */
window.CC_FOOTER = {
  tagline: 'Admissions consulting that helps students tell one clear, memorable story.',
  address: 'College Crafters · Lahore, Pakistan',
  columns: [
    {
      title: 'Programs',
      links: [
        { label: 'Senior Program', href: 'programs/senior-program/index.html' },
        { label: 'Junior Program', href: 'programs/junior-program/index.html' },
        { label: 'SAT/ACT', href: 'programs/sat-act/index.html' },
        { label: 'Undergraduate', href: 'programs/undergrad/index.html' },
        { label: 'Graduate', href: 'programs/grad/index.html' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Story Workbook', href: 'resources/story-workbook/index.html' },
        { label: 'Blog', href: 'blog/index.html' },
        { label: 'Journal', href: 'journal/index.html' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Team', href: 'team/index.html' },
        { label: 'Testimonials', href: 'testimonials/index.html' },
        { label: 'Contact', booking: true },
      ],
    },
  ],
  social: [
    { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/thecollegecrafters/' },
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/the-college-crafters/' },
    { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/thecollegecrafters/' },
  ],
};
