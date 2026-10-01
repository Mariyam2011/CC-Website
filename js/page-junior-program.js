/* ==========================================================================
   PAGE — Junior Program  (/programs/junior-program)
   --------------------------------------------------------------------------
   Audience: O-Level students in O1, O2 and O3. Covers A-Level subject
   selection through to an admission offer abroad.

   Composed from Part 1 components (PersonaCard, WorkflowSteps, CardGrid,
   Accordion, SectionHead, CTABand).

   PLACEHOLDER: programme specifics (session cadence, pricing, cohort sizes)
   are structure only — replace before publishing.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  const PERSONAS = [
    {
      icon: 'sparkle',
      title: 'O1 — First year',
      blurb: 'Too early to specialise, exactly the right time to build habits and try things.',
      needsTitle: 'This stage focuses on',
      needs: [
        'Getting the academic baseline right',
        'Trying a wide range of activities on purpose',
        'Finding out what you actually enjoy',
        'No pressure to pick a direction yet',
      ],
      ctaLabel: 'Book a meeting',
      ctaBooking: true,
    },
    {
      icon: 'compass',
      title: 'O2 — Middle year',
      blurb: 'Interests start narrowing, and A-Level choices are suddenly close.',
      needsTitle: 'This stage focuses on',
      needs: [
        'Turning scattered interests into a direction',
        'Mapping subjects to possible majors',
        'Going deeper in two or three activities',
        'A first honest look at target countries',
      ],
      ctaLabel: 'Book a meeting',
      ctaBooking: true,
    },
    {
      icon: 'target',
      title: 'O3 — Final year',
      blurb: 'Decisions get made this year that close or open doors three years out.',
      needsTitle: 'This stage focuses on',
      needs: [
        'Locking A-Level subjects with intent',
        'Building the profile that applications will use',
        'Planning the testing runway',
        'A realistic shortlist of universities',
      ],
      ctaLabel: 'Book a meeting',
      ctaBooking: true,
    },
  ];

  const HELP = [
    { icon: 'book', title: 'A-Level subject selection', text: 'One-on-one guidance matching subjects to the majors and universities you are actually aiming at — before the choice is locked.' },
    { icon: 'compass', title: 'Academic planning', text: 'What to take seriously and when, so your transcript reads as a deliberate argument rather than a series of accidents.' },
    { icon: 'users', title: 'Extracurricular strategy', text: 'Fewer commitments, pursued further. We help you choose what to drop as much as what to join.' },
    { icon: 'globe', title: 'University shortlisting', text: 'A working list across your target countries, revisited each year as your profile and grades develop.' },
    { icon: 'edit', title: 'Application support', text: 'Essays, recommendations and the mechanics of every portal you will need to submit through.' },
    { icon: 'award', title: 'Scholarship guidance', text: 'Which funding you are realistically eligible for, and what your profile needs to look like to qualify.' },
  ];

  const FAQ = [
    {
      q: 'Is O1 really not too early to start?',
      a: 'No. The things that are hardest to fix late — depth in a few activities, a transcript that points somewhere, genuine subject fit — all take years. Starting in O1 mostly means you make fewer choices you have to undo later.',
    },
    {
      q: 'Do A-Level subject choices really affect admissions abroad?',
      a: 'Substantially. UK courses have specific subject requirements and will reject applications that miss them outright. US universities are more flexible but still read your choices as evidence of what you care about. Choosing without knowing your likely major closes doors quietly.',
    },
    {
      q: 'What if my child does not know what they want to study yet?',
      a: 'Most O1 and O2 students do not, and that is fine. The work at this stage is narrowing the field honestly rather than committing early. By O3 we aim for a direction, not a final answer.',
    },
    {
      q: 'How does this connect to the rest of your programmes?',
      a: 'The Junior Program feeds directly into our SAT/ACT preparation and the undergraduate application track. Students who start here arrive at the application year with the profile already built.',
    },
  ];

  (CC.pageModules = CC.pageModules || {})['programs/junior-program'] = function () {
    const root = document.querySelector('[data-part2]');
    if (!root) return;

    root.innerHTML = `
      <section class="hero hero--page" aria-labelledby="jp-title">
        <div class="wrap">
          <p class="pill">${CC.icon('sparkle')} Programs · O1–O3</p>
          <h1 class="hero-title" id="jp-title"><span class="t-teal">Start Early,</span> <em class="t-peach">Get In Abroad</em></h1>
          <p class="hero-sub">Guidance for O1–O3 students, from subject selection to admission letter.</p>
          <div class="hero-cta">
            ${CC.BookingTrigger({ label: 'Book a Meeting', btnClass: 'btn btn-solid btn-lg', align: 'left' })}
            <a class="btn btn-ghost btn-lg" href="#journey">See the journey</a>
          </div>
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: "Who it's for",
            title: 'Three stages, three different jobs',
            titleHtml: 'Three stages, <em>three different jobs</em>',
            lede: 'What a student should be doing in O1 is not what they should be doing in O3. The programme changes with them.',
            center: true,
          })}
          ${CC.PersonaCards(PERSONAS)}
        </div>
      </section>

      <section class="section section--white" id="journey">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Your journey',
            title: 'From O-Levels to an offer',
            titleHtml: 'From O-Levels to <em>an offer</em>',
            lede: 'Six stages across roughly five years. Each one sets up the next.',
            center: true,
          })}
          ${CC.WorkflowSteps([
            {
              icon: 'book',
              title: 'O-Level years',
              text: 'Build the academic baseline and explore interests widely, before anything has to be chosen.',
            },
            {
              icon: 'compass',
              title: 'A-Level subject selection',
              text: 'One-on-one guidance matching subjects to your intended majors and target universities.',
            },
            {
              icon: 'users',
              title: 'Activities & profile',
              text: 'Fewer commitments, taken further — and a story that ties them together.',
              href: CC.url('resources/story-workbook/index.html'),
              linkLabel: 'Story Workbook',
            },
            {
              icon: 'target',
              title: 'Testing',
              text: 'Diagnostic, then a prepared run at the SAT or ACT with time left for a retake.',
              href: CC.url('programs/sat-act/index.html'),
              linkLabel: 'SAT/ACT',
            },
            {
              icon: 'edit',
              title: 'Applications',
              text: 'Essays, recommendations and a university list balanced for fit, funding and odds.',
            },
            {
              icon: 'award',
              title: 'Admission & aid',
              text: 'Offers, scholarship decisions and comparing what each one actually costs.',
            },
          ])}
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'What we help with',
            title: 'The work, stage by stage',
            titleHtml: 'The work, <em>stage by stage</em>',
            center: true,
          })}
          ${CC.CardGrid(HELP, { cols: 3 })}
        </div>
      </section>

      <section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({ eyebrow: 'FAQ', title: 'Common questions', center: true })}
          ${CC.Accordion(FAQ, { openFirst: true })}
        </div>
      </section>

      ${CC.CTABand({
        title: 'The earliest decisions are the cheapest to get right',
        text: 'Book a meeting and we will map the next three years — subjects, activities, testing and a first university shortlist.',
        buttons: [
          { label: 'Book a Meeting', booking: true },
          { label: 'See all programs', href: CC.url('programs/index.html') },
        ],
      })}`;

    CC.initComponents(root);
  };
})(window, document);
