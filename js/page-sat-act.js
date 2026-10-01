/* ==========================================================================
   PAGE — SAT / ACT  (/programs/sat-act)
   --------------------------------------------------------------------------
   Composed from Part 1 components (StatCounter, WorkflowSteps, CardGrid,
   Accordion, SectionHead, CTABand) plus one page-specific spec table.

   PLACEHOLDER: programme details, formats and results are structure only.
   PLACEHOLDER: the SAT vs ACT spec table reflects published formats but both
   tests have changed recently — verify every row against the current College
   Board and ACT specifications before publishing.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  /* PLACEHOLDER — verify against current official test specifications. */
  const SPEC_ROWS = [
    {
      feature: 'Format',
      sat: 'Digital and section-adaptive. The second module adjusts to how you performed on the first.',
      act: 'Fixed-form. Every student sees the same questions, on paper or digitally.',
    },
    {
      feature: 'Sections',
      sat: 'Reading & Writing, Math.',
      act: 'English, Math, Reading, plus Science and Writing depending on the version you sit.',
    },
    {
      feature: 'Timing',
      sat: 'Around 2 hours 15 minutes, with noticeably more time per question.',
      act: 'Longer overall, and faster per question — pacing is the main constraint.',
    },
    {
      feature: 'Scoring',
      sat: '400–1600, combining two section scores.',
      act: '1–36 composite, averaged across the sections.',
    },
    {
      feature: 'Maths weighting',
      sat: 'Half of the total score.',
      act: 'One of several sections, so a weaker maths day costs less.',
    },
    {
      feature: 'Suits you if',
      sat: 'You think carefully, prefer fewer questions with more time, and are strong in maths.',
      act: 'You work quickly and accurately, and would rather have more sections to spread risk across.',
    },
  ];

  const PROGRAMME = [
    { icon: 'target', title: 'Diagnostic test', text: 'A full sitting of both tests under real conditions, so the SAT-or-ACT decision is made on evidence rather than a guess.' },
    { icon: 'compass', title: 'Personalised study plan', text: 'A week-by-week plan built around your diagnostic, your target schools and how much time you actually have.' },
    { icon: 'book', title: 'Sectional practice', text: 'Targeted drilling on the specific question types costing you the most marks, not generic worksheets.' },
    { icon: 'clock', title: 'Full-length mocks', text: 'Timed, proctored mocks at set intervals so pacing and stamina are trained, not discovered on test day.' },
    { icon: 'award', title: 'Score tracking', text: 'Every mock logged against your target so you can see whether the plan is working while there is still time to change it.' },
  ];

  const FORMATS = [
    { kicker: 'Format', icon: 'users', title: 'Group classes', text: 'Small cohorts working through a fixed syllabus on a set schedule. Best value per hour.' },
    { kicker: 'Format', icon: 'user', title: 'One-on-one', text: 'Fully tailored sessions built around your diagnostic. Best for big jumps or tight timelines.' },
    { kicker: 'Format', icon: 'book', title: 'Self-paced', text: 'Structured materials and mocks you work through independently, with checkpoint reviews.' },
  ];

  const FAQ = [
    {
      q: 'Should I take the SAT or the ACT?',
      a: 'Sit a diagnostic of each under timed conditions and compare percentiles, not raw scores. Universities accept both equally — there is no advantage to either beyond which one fits how you work.',
    },
    {
      q: 'When should I start preparing?',
      a: 'Most students start 9 to 12 months before the sitting they intend to submit, which usually means beginning in the year before applications are due. Starting earlier mainly buys you more retake attempts.',
    },
    {
      q: 'How many times can I retake?',
      a: 'There is no meaningful limit, but returns drop off sharply after the third sitting. Two well-prepared attempts beat four unprepared ones.',
    },
    {
      q: 'Do scores still matter if schools are test-optional?',
      a: 'Test-optional means a good score helps and a missing score does not hurt — at that specific school. Many selective universities have reinstated requirements, and scores still affect merit scholarships and some international applications. Check each school on your list individually.',
    },
    {
      q: 'What score should I be aiming for?',
      a: 'Work backwards from your list. Aim for the 75th percentile of admitted students at your target schools; matching the median makes your score neutral rather than helpful.',
    },
  ];

  function specTable() {
    const rows = SPEC_ROWS.map(
      (r) => `
      <tr>
        <th scope="row">${esc(r.feature)}</th>
        <td>${esc(r.sat)}</td>
        <td>${esc(r.act)}</td>
      </tr>`
    ).join('');

    return `
      <div class="spec-wrap">
        <table class="spec-table">
          <thead>
            <tr>
              <td class="spec-corner"><span class="visually-hidden">Feature</span></td>
              <th scope="col"><span class="spec-name">SAT</span></th>
              <th scope="col"><span class="spec-name">ACT</span></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  (CC.pageModules = CC.pageModules || {})['application-process/sat-act'] = function () {
    const root = document.querySelector('[data-part2]');
    if (!root) return;

    root.innerHTML = `
      <section class="hero hero--page" aria-labelledby="sa-title">
        <div class="wrap">
          <p class="pill">${CC.icon('target')} Programs · Testing</p>
          <h1 class="hero-title" id="sa-title"><span class="t-teal">Test scores are</span> <em class="t-peach">strategy</em></h1>
          <p class="hero-sub">Pick the right test, train the right weaknesses, and sit it at the right time — with a plan built from a real diagnostic rather than a guess.</p>
          <div class="hero-cta">
            ${CC.BookingTrigger({ label: 'Book a Free Consultation', btnClass: 'btn btn-solid btn-lg', align: 'left' })}
            <a class="btn btn-ghost btn-lg" href="#compare">Compare SAT and ACT</a>
          </div>
        </div>
      </section>

      <section class="section section--tint" id="compare">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'SAT vs ACT',
            title: 'Two tests, one decision',
            titleHtml: 'Two tests, <em>one decision</em>',
            lede: 'Universities treat the two as equivalent. The only question worth asking is which one suits the way you work.',
            center: true,
          })}
          ${specTable()}
        </div>
      </section>

      <section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'The programme',
            title: 'What preparation actually looks like',
            titleHtml: 'What preparation <em>actually looks like</em>',
            lede: 'Five parts, run in order. Skipping the diagnostic is the most common and most expensive mistake.',
            center: true,
          })}
          ${CC.CardGrid(PROGRAMME, { cols: 3 })}
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Timeline',
            title: 'When to start, sit and retake',
            titleHtml: 'When to start, sit and <em>retake</em>',
            lede: 'Indicative timings — confirm against the sitting dates published for your application cycle.',
            center: true,
          })}
          ${CC.WorkflowSteps([
            { icon: 'target', title: 'Diagnostic', text: 'Sit both tests cold. Decide which one you are taking before you prepare for either.' },
            { icon: 'book', title: 'Build', text: 'The longest phase. Content gaps first, then question-type drilling.' },
            { icon: 'clock', title: 'First sitting', text: 'Early enough that a retake is still possible without colliding with deadlines.' },
            { icon: 'edit', title: 'Review & retake', text: 'Target the specific sections that cost you marks. One focused retake, not three hopeful ones.' },
            { icon: 'send', title: 'Send scores', text: 'Decide per school whether to submit, based on their policy and your percentile.' },
          ])}
        </div>
      </section>

      <section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Formats',
            title: 'Three ways to work with us',
            titleHtml: 'Three ways to <em>work with us</em>',
            center: true,
          })}
          ${CC.CardGrid(FORMATS, { cols: 3 })}
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.StatCounter([
            { value: 1000, suffix: '+', label: 'Students coached', sub: 'Across all programmes' },
            { value: 20, prefix: 'Top ', label: 'Universities', sub: 'US News rankings' },
          ])}
        </div>
      </section>

      <section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({ eyebrow: 'FAQ', title: 'Common questions', center: true })}
          ${CC.Accordion(FAQ, { openFirst: true })}
        </div>
      </section>

      ${CC.CTABand({
        title: 'Find out which test is yours',
        text: 'Start with a diagnostic. We will tell you which test to take, what your realistic target is, and how long it should take to get there.',
        buttons: [
          { label: 'Book a Free Consultation', booking: true },
          { label: 'See all programs', href: CC.url('programs/index.html') },
        ],
      })}`;

    CC.initComponents(root);
  };
})(window, document);
