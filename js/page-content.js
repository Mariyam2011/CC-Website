/* ==========================================================================
   PAGE CONTENT REGISTRY
   --------------------------------------------------------------------------
   One entry per standard page, keyed by the value in <body data-page="...">.
   site.js turns these blocks into markup, so a new page needs no new JS.

   Block types:
     text        { title?, body: [paragraph, ...] }
     cards       { title?, lede?, cols?, items: [{icon,kicker,title,text,href}] }
     list        { title?, items: [string, ...] }
     steps       { title?, items: [{icon,title,text}] }        -> WorkflowSteps
     stats       { items: [{value,prefix,suffix,decimals,label,sub}] }
     comparison  { title?, oldTitle, newTitle, rows: [{old,new}] }
     personas    { title?, items: [...] }                      -> PersonaCard
     accordion   { title?, items: [{q,a}] }
     data        { source: 'team' | 'board' | 'process:us' | ... }
     placeholder { text }   (still supported; no page uses it)
     cta         { title, text, buttons: [{label,href}] }

   No page carries visible "Placeholder" copy any more. Where the text was a
   real description it was kept and the prefix dropped; where it was invented
   content (parent reviews, case studies, guide titles) it was REMOVED rather
   than published as genuine. Those pages are intentionally card-less until
   real material is supplied - do not fill them with sample content.
   Real people, quotes and results come from content.js via the `data` blocks.
   ========================================================================== */

window.CC_PAGES = {
  /* ===================== TEAM ===================== */

  team: {
    title: 'The people crafting your story',
    subtitle:
      'A board that sets the standard, and a team of counselors, coaches and mentors who work beside every student from the first conversation to the final decision.',
    blocks: [
      {
        type: 'cards',
        title: 'Two groups, one standard',
        cols: 2,
        items: [
          {
            icon: 'award',
            title: 'Board Members',
            text: 'Sets admissions strategy, financial-aid policy and the long-term direction of our counseling programs.',
            href: 'team/board-members/index.html',
            linkLabel: 'Meet the board',
          },
          {
            icon: 'users',
            title: 'Core Team',
            text: 'The counselors, coaches and operators who work with students week to week.',
            href: 'team/core-team/index.html',
            linkLabel: 'Meet the team',
          },
        ],
      },
    ],
  },

  'team/core-team': {
    eyebrow: 'Our team',
    title: 'Core Team',
    subtitle: 'The counselors, coaches and operators students work with week to week.',
    blocks: [{ type: 'data', source: 'team' }],
  },

  'team/board-members': {
    eyebrow: 'Board',
    title: 'Board Members',
    subtitle: 'The board that sets our admissions strategy and holds the standard for every application we touch.',
    blocks: [{ type: 'data', source: 'board' }],
  },

  /* ===================== APPLICATION PROCESS ===================== */

  'application-process': {
    eyebrow: 'The application process',
    title: 'A clear path from first conversation to final decision',
    subtitle:
      'The same five steps for every student, adapted to the country you are applying to. Nothing is left to the last week.',
    blocks: [
      { type: 'data', source: 'process:general' },
      {
        type: 'cards',
        editorial: true,
        layout: 'split',
        title: 'Go deeper',
        cols: 2,
        items: [
          {
            icon: 'compass',
            title: 'What We Offer',
            text: 'The full scope of counseling, essays, testing and financial-aid support.',
            href: 'application-process/what-we-offer/index.html',
          },
          {
            icon: 'calendar',
            title: 'Timeline',
            text: 'When each stage happens across a typical application year.',
            href: 'application-process/timeline/index.html',
          },
          {
            icon: 'globe',
            title: 'United States',
            text: 'Common App, testing strategy, and the US-specific essay load.',
            href: 'application-process/services/united-states/index.html',
          },
          {
            icon: 'globe',
            title: 'UK',
            text: 'UCAS, the personal statement, and course-first applications.',
            href: 'application-process/services/uk/index.html',
          },
        ],
      },
    ],
  },

  'application-process/what-we-offer': {
    eyebrow: 'The application process',
    title: 'What We Offer',
    subtitle: 'Every part of the application, handled by someone who has done it before.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 3,
        items: [
          { icon: 'compass', title: 'School list strategy', text: 'A balanced list built around fit, funding and your odds — not brand names.' },
          { icon: 'edit', title: 'Essay development', text: 'From first brainstorm to final line edit, keeping the story yours.' },
          { icon: 'target', title: 'Testing plan', text: 'SAT/ACT decisions, timelines and score-send strategy.' },
          { icon: 'award', title: 'Profile building', text: 'Extracurriculars, competitions and summer programs that actually add something.' },
          { icon: 'book', title: 'Financial aid', text: 'Aid forms, scholarship search and negotiating an offer.' },
          { icon: 'send', title: 'Submission & follow-up', text: 'Portals, interviews, waitlists and the final decision.' },
        ],
      },
    ],
  },

  'application-process/services': {
    eyebrow: 'The application process',
    title: 'Services',
    subtitle: 'How our support is packaged, and what is included at each level.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 3,
        items: [
          { kicker: 'Package', title: 'Essentials', text: 'School list, core essays and submission support.' },
          { kicker: 'Package', title: 'Comprehensive', text: 'Everything in Essentials plus testing, profile and aid strategy.' },
          { kicker: 'Package', title: 'Full Craft', text: 'End-to-end support across multiple countries and application rounds.' },
        ],
      },
      {
        type: 'accordion',
        title: 'Common questions',
        items: [
          { q: 'When should we start?', a: 'Most families start 12 to 18 months before the first deadline.' },
        ],
      },
    ],
  },

  'application-process/services/united-states': {
    eyebrow: 'Our services',
    title: 'United States',
    subtitle: 'Common App, a heavier essay load, and a testing decision that changes school by school.',
    blocks: [{ type: 'data', source: 'process:us' }],
  },

  'application-process/services/uk': {
    eyebrow: 'Our services',
    title: 'UK',
    subtitle: 'UCAS, one course-focused personal statement, and predicted grades that carry real weight.',
    blocks: [{ type: 'data', source: 'process:uk' }],
  },

  'application-process/timeline': {
    eyebrow: 'The application process',
    title: 'Timeline',
    subtitle: 'What happens when, across a typical application year.',
    blocks: [
      {
        type: 'steps',
        items: [
          { icon: 'compass', title: 'Spring', text: 'Discovery, profile review and a first draft of the school list.' },
          { icon: 'target', title: 'Summer', text: 'Testing, essay brainstorming and the bulk of first drafts.' },
          { icon: 'edit', title: 'Early autumn', text: 'Essay revisions, recommendations and portal setup.' },
          { icon: 'send', title: 'Late autumn', text: 'Early deadlines, UCAS submission and aid forms.' },
          { icon: 'award', title: 'Winter–spring', text: 'Regular deadlines, interviews, decisions and offer comparisons.' },
        ],
      },
      { type: 'data', source: 'deadlines' },
    ],
  },

  /* ===================== PROGRAMS ===================== */

  programs: {
    eyebrow: 'Programs',
    title: 'Programs for every stage',
    subtitle: 'Whether you are three years out or three months out, there is a track built for where you actually are.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
          { icon: 'user', title: 'Undergraduate', text: 'Bachelor’s applications across the US, UK and Canada.', href: 'programs/undergrad/index.html' },
          { icon: 'award', title: 'Graduate', text: 'Master’s and doctoral applications, including research fit and funding.', href: 'programs/grad/index.html' },
          { icon: 'sparkle', title: 'Junior Program', text: 'Early profile building for students still in Grades 8–10.', href: 'programs/junior-program/index.html' },
          { icon: 'target', title: 'SAT/ACT', text: 'Diagnostic, coaching and a score strategy that fits your school list.', href: 'programs/sat-act/index.html' },
          {
            icon: 'globe',
            title: 'College Seekers',
            text: 'Direct-apply undergraduate and graduate routes through our partner university network.',
            href: 'college-seekers/index.html',
            newTab: true,
          },
        ],
      },
    ],
  },

  'programs/undergrad': {
    eyebrow: 'Programs',
    title: 'Undergraduate',
    subtitle: 'Bachelor’s applications across the US, UK and Canada — one story, adapted per system.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        title: 'Two programs',
        cols: 2,
        items: [
          {
            icon: 'award',
            kicker: 'Program',
            title: 'Senior Program',
            text: 'For A2, Grade 12 and DP2 students applying this cycle.',
            href: 'programs/senior-program/index.html',
          },
          {
            icon: 'sparkle',
            kicker: 'Program',
            title: 'Junior Program',
            text: 'Early profile building for students still in Grades 8–10.',
            href: 'programs/junior-program/index.html',
          },
        ],
      },
      {
        type: 'list',
        title: 'What the track covers',
        items: [
          'School list across your target countries',
          'Common App, UCAS and OUAC submissions',
          'Personal statement and supplemental essays',
          'Testing plan and score sends',
          'Financial aid and scholarship applications',
        ],
      },
    ],
  },

  'programs/grad': {
    eyebrow: 'Programs',
    title: 'Graduate',
    subtitle: 'Master’s and doctoral applications, where research fit and funding matter as much as grades.',
    blocks: [
      /* Masters and PhD as tab cards: picking one opens its detail panel
         below. Both tracks needed real depth, but neither warranted a page
         of its own, and splitting them would have buried the comparison
         that most applicants actually come here for.

         DRAFTED CONTENT — written from general graduate-admissions practice
         and deliberately kept to what holds across most institutions.
         Check it against how you actually advise before publishing. */
      {
        type: 'tabcards',
        title: 'Two programs',
        tablistLabel: 'Choose a graduate track',
        items: [
          {
            icon: 'book',
            kicker: 'Program',
            title: 'Masters',
            text: 'Taught and research master’s applications, including program fit and funding.',
            cue: 'See requirements',
            cueOn: 'Showing requirements',
            panel: {
              heading: 'Applying for a master’s',
              lede:
                'Master’s admission turns on fit and preparation: does your background match the programme, and can you show you will cope with it. Funding is usually decided separately, and often earlier than applicants expect.',
              groups: [
                {
                  title: 'What every application needs',
                  items: [
                    'A completed bachelor’s degree in a related field, with transcripts from every institution you have attended',
                    'A statement of purpose covering why this programme, why now, and what you intend to do afterwards',
                    'Two or three references, at least one academic — professional referees are accepted for taught and conversion degrees',
                    'An academic CV covering education, research, work, publications and any teaching',
                    'English proficiency (TOEFL, IELTS or PTE) unless your degree was taught in English and the university waives it',
                  ],
                },
                {
                  title: 'Where programmes differ',
                  items: [
                    'Entry grades: many US programmes expect around a 3.0/4.0 GPA, and UK programmes a 2:1 or international equivalent',
                    'GRE or GMAT: increasingly optional, but still required by some US business, economics and engineering departments',
                    'Portfolios, writing samples or technical tests for design, humanities and computing courses',
                    'Research master’s and MRes courses ask for a short research proposal; taught master’s usually do not',
                    'Interviews for competitive, professional and conversion courses',
                  ],
                },
                {
                  title: 'Funding, decided separately',
                  items: [
                    'Departmental scholarships and merit awards, often closing earlier than the admission deadline',
                    'Graduate assistantships and teaching roles, which usually need a separate application to the department',
                    'External and government scholarships, some of which require an offer letter before you can apply',
                  ],
                },
              ],
              note:
                'Where a programme uses rolling admission, apply early. Places and funding are both awarded as applications arrive rather than after the final deadline.',
            },
          },
          {
            icon: 'award',
            kicker: 'Program',
            title: 'PhD',
            text: 'Doctoral applications, including supervisor shortlisting and research proposals.',
            cue: 'See requirements',
            cueOn: 'Showing requirements',
            panel: {
              heading: 'Applying for a PhD',
              lede:
                'A doctorate is judged on research fit before anything else. The biggest single variable is which country you are applying to, because the US and the UK run close to opposite processes.',
              groups: [
                {
                  title: 'What every application needs',
                  items: [
                    'A strong undergraduate degree — and in the UK, Europe and Australia, usually a master’s as well',
                    'A research proposal, or in the US a statement of purpose setting out the questions you want to work on',
                    'Three academic references from people who can speak to your research potential',
                    'An academic CV listing publications, conference papers, teaching and any research assistantships',
                    'A writing sample, such as a dissertation chapter, in most humanities and social science fields',
                    'English proficiency, on the same terms as a master’s',
                  ],
                },
                {
                  title: 'The US route',
                  items: [
                    'You apply to a department rather than a named supervisor, and are admitted into a cohort',
                    'The first year or two is coursework and rotations before the research topic is fixed',
                    'Funding is normally attached to the offer as a stipend with teaching or research duties',
                    'A committee decides, so the statement of purpose is read alongside the whole file',
                  ],
                },
                {
                  title: 'The UK, Europe and Australia route',
                  items: [
                    'You approach a potential supervisor first — an application with nobody behind it rarely progresses',
                    'The research proposal is the centre of the application and has to match the supervisor’s own work',
                    'You start on your research immediately, with little or no coursework',
                    'Funding is often tied to a specific studentship or grant, with its own deadline and criteria',
                  ],
                },
              ],
              note:
                'Contact supervisors months before the deadline. In the UK and Australia that conversation usually decides whether an application is worth submitting at all.',
            },
          },
        ],
      },
      {
        type: 'list',
        title: 'What the track covers',
        items: [
          'Program and supervisor shortlisting',
          'Statement of purpose and research proposal',
          'CV and recommendation strategy',
          'Funding, assistantships and fellowships',
          'Interview preparation',
        ],
      },
    ],
  },

  /* ===================== RESOURCES ===================== */

  resources: {
    eyebrow: 'Resources',
    title: 'Resources',
    subtitle: 'Tools we build for students working through their own applications.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
          {
            icon: 'book',
            title: 'Story Workbook',
            text: 'A guided workbook for finding the story your application should be built around.',
            href: 'resources/story-workbook/index.html',
          },
          { icon: 'edit', title: 'Blog', text: 'Longer guides on aid, testing and admissions strategy.', href: 'blog/index.html' },
        ],
      },
    ],
  },

  /* ===================== INSIGHT ===================== */

  insight: {
    eyebrow: 'Insight',
    title: 'Everything we publish, in one place',
    subtitle:
      'Long-form guides, working resources, daily notes from the desk, and the admissions changes worth acting on.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
          {
            icon: 'book',
            title: 'Blog',
            text: 'Long-form guides on admissions, financial aid and testing.',
            href: 'blog/index.html',
          },
          {
            icon: 'compass',
            title: 'Resources',
            text: 'Tools we build for students working through their own applications.',
            href: 'resources/index.html',
          },
          {
            icon: 'edit',
            title: 'Journal',
            text: 'Short daily notes on what we are seeing in applications right now.',
            href: 'journal/index.html',
          },
          {
            icon: 'calendar',
            title: 'Updates',
            text: 'Policy shifts, deadline changes and what they mean for you.',
            href: 'updates/index.html',
          },
        ],
      },
    ],
  },

  /* ===================== UPDATES ===================== */

  updates: {
    eyebrow: 'Updates',
    title: 'Updates',
    subtitle: 'Policy shifts, deadline changes and what they mean for your application.',
    blocks: [
      { type: 'data', source: 'updates' },
      {
        type: 'cards',
        editorial: true,
        layout: 'split',
        title: 'Go deeper',
        cols: 2,
        items: [
          {
            icon: 'compass',
            title: 'Admissions Updates',
            text: 'What changed this cycle, and what to do about it.',
            href: 'updates/admissions-updates/index.html',
          },
          {
            icon: 'calendar',
            title: 'Deadlines',
            text: 'The dates that decide your year, counted down.',
            href: 'updates/deadlines/index.html',
          },
        ],
      },
    ],
  },

  'updates/admissions-updates': {
    eyebrow: 'Updates',
    title: 'Admissions Updates',
    subtitle: 'What changed this cycle, and what to do about it.',
    blocks: [{ type: 'data', source: 'updates' }],
  },

  'updates/deadlines': {
    eyebrow: 'Updates',
    title: 'Deadlines',
    subtitle: 'The dates that decide your year. Always confirm against each school’s own portal.',
    blocks: [
      { type: 'data', source: 'deadlines' },
    ],
  },

  /* ===================== TESTIMONIALS ===================== */

  testimonials: {
    eyebrow: 'Testimonials',
    title: 'In their own words',
    subtitle: 'Students and families on what the process actually felt like.',
    blocks: [{ type: 'data', source: 'testimonials' }],
  },

  'testimonials/student-stories': {
    eyebrow: 'Testimonials',
    title: 'Student Stories',
    subtitle: 'The students behind the acceptances.',
    blocks: [{ type: 'data', source: 'testimonials' }],
  },

  'testimonials/parent-reviews': {
    eyebrow: 'Testimonials',
    title: 'Parent Reviews',
    subtitle: 'What parents say about the process, the cost and the communication.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
        ],
      },
    ],
  },

  /* ===================== RESULTS ===================== */

  results: {
    eyebrow: 'Our results',
    title: 'Results',
    subtitle: 'Every cycle since 2021, in numbers.',
    /* Banner only. Stats, charts and the year-by-year table are drawn by
       js/page-results.js from js/results-data.js. */
    blocks: [],
  },

  /* ===================== COLLEGE SEEKERS ===================== */

  'college-seekers': {
    eyebrow: 'An affiliated program by College Crafters',
    title: 'College Seekers',
    subtitle:
      'Our Direct Apply University Network — direct access to university and college options across the United States, Canada, the United Kingdom, Malaysia and the UAE.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
          {
            icon: 'user',
            kicker: 'College Seekers',
            title: 'Undergraduate',
            text: 'Direct-apply undergraduate options across the partner network.',
            href: 'college-seekers/undergraduate/index.html',
          },
          {
            icon: 'award',
            kicker: 'College Seekers',
            title: 'Graduate',
            text: 'Graduate and doctoral entry routes across the US, Canada, the UK and Australia.',
            href: 'college-seekers/graduate/index.html',
          },
        ],
      },
      /* The full network table is not repeated here — the two cards above
         lead to it. Undergraduate owns the undergraduate list, Graduate owns
         the graduate one. */
    ],
  },

  'college-seekers/undergraduate': {
    eyebrow: 'College Seekers',
    title: 'Undergraduate',
    subtitle: 'Direct-apply bachelor’s options through the College Seekers network.',
    blocks: [
      { type: 'data', source: 'seekers' },
    ],
  },

  'college-seekers/graduate': {
    eyebrow: 'College Seekers',
    title: 'Graduate',
    subtitle:
      'Direct-apply graduate and doctoral options through the College Seekers network, organised by country.',
    blocks: [
      { type: 'data', source: 'seekers-graduate' },
    ],
  },

  /* ===================== JOURNAL ===================== */

  journal: {
    eyebrow: 'CC Daily Journal',
    title: 'Journal',
    subtitle: 'Short daily notes from the desk — what we are seeing in applications right now.',
    blocks: [
      { type: 'data', source: 'journal' },
      {
        type: 'cards',
        editorial: true,
        layout: 'split',
        title: 'Browse by kind',
        cols: 3,
        items: [
          {
            icon: 'edit',
            title: 'Essays',
            text: 'Notes on finding, drafting and cutting the application essay.',
            href: 'journal/essays/index.html',
          },
          {
            icon: 'book',
            title: 'Guides',
            text: 'Step-by-step walkthroughs of the parts students get stuck on.',
            href: 'journal/guides/index.html',
          },
          {
            icon: 'award',
            title: 'Case Studies',
            text: 'Anonymised walkthroughs of how a full application came together.',
            href: 'journal/case-studies/index.html',
          },
        ],
      },
    ],
  },

  'journal/essays': {
    eyebrow: 'Journal',
    title: 'Essays',
    subtitle: 'Notes on finding, drafting and cutting the application essay.',
    blocks: [{ type: 'data', source: 'journal' }],
  },

  'journal/guides': {
    eyebrow: 'Journal',
    title: 'Guides',
    subtitle: 'Step-by-step walkthroughs of the parts students get stuck on.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
        ],
      },
    ],
  },

  'journal/case-studies': {
    eyebrow: 'Journal',
    title: 'Case Studies',
    subtitle: 'Anonymised walkthroughs of how a full application came together.',
    blocks: [
      {
        type: 'cards',
        editorial: true,
        cols: 2,
        items: [
        ],
      },
    ],
  },

  /* ===================== MODULE-RENDERED PAGES =====================
     These routes are built by their own modules in js/page-*.js, registered
     against CC.pageModules. They open with a full hero or article header
     instead of a PageBanner, so they have no entry here at all — site.js
     leaves their <main> alone and the module owns the whole page:

       resources/story-workbook   js/page-story-workbook.js
       application-process/sat-act  js/page-sat-act.js  (page lives at /programs/sat-act/)
       programs/junior-program    js/page-junior-program.js
       programs/senior-program    js/page-senior-program.js
       public-statement           js/page-public-statement.js
       blog                       js/page-financial-aid.js
       blog/financial-aid-guide   js/page-financial-aid.js

     Blog has no listing page: /blog renders the financial aid guide itself,
     so Insight > Blog opens the article directly.
     ====================================================== */
};
