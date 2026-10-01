/* ==========================================================================
   PAGE — Senior Program  (/programs/senior-program)
   --------------------------------------------------------------------------
   Audience: A2, DP2 and Grade 12 students applying in the current cycle.
   The sibling of the Junior Program page: that one covers the three years
   before the application, this one covers the application itself.

   Composed from Part 1 components (PersonaCard, WorkflowSteps, CardGrid,
   Accordion, SectionHead, CTABand).

   The US and UK requirements below follow content.js (process.regions) —
   keep the two in step if either changes. Deadlines are deliberately not
   repeated here; updates/deadlines owns those dates.

   PLACEHOLDER: programme specifics (session cadence, what is included)
   are structure only — replace before publishing.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  /* What each system asks for. These are entry criteria, not the programme —
     a student should be able to read this and tell whether they are behind. */
  const REQUIREMENTS = [
    {
      icon: 'target',
      title: 'Applying to the United States',
      blurb:
        'US review is holistic: no single piece carries the decision, and the file is read as one picture. That is why a late start hurts here more than anywhere else.',
      needsTitle: 'What has to be in place',
      needs: [
        'Your full school record — IGCSE or O Level results, AS grades, and predicted A2 or DP grades',
        'A testing decision already made: SAT or ACT, plus TOEFL, IELTS or Duolingo unless your school waives it',
        'Up to ten activities, written so they read as one pattern rather than a long list',
        'A Common App personal statement, plus separate supplements for most universities',
        'Two teacher references and one counselor reference, requested weeks before the deadline',
        'The CSS Profile if you are applying for need-based aid as an international student',
      ],
      ctaLabel: 'US requirements in full',
      ctaHref: 'application-process/services/united-states/index.html',
    },
    {
      icon: 'book',
      title: 'Applying to the United Kingdom',
      blurb:
        'UK offers turn on fit for the one course you name, and academic results carry the most weight. A strong file here looks different from a strong US file.',
      needsTitle: 'What has to be in place',
      needs: [
        'Actual and predicted A Level or IB grades — these do most of the work',
        'An admissions test where your course requires one, such as the LNAT for Law',
        'One UCAS personal statement covering all five choices, written as three structured questions for 2026 entry',
        'One academic reference speaking directly to your fit for the course',
        'A CV of academic projects and research for the most competitive courses',
      ],
      ctaLabel: 'UK requirements in full',
      ctaHref: 'application-process/services/uk/index.html',
    },
  ];

  const HELP = [
    {
      icon: 'compass',
      title: 'Shortlist triage',
      text: 'A list you can actually finish, balanced for fit, funding and real odds — built around the grades you are predicted, not the ones you hoped for.',
    },
    {
      icon: 'target',
      title: 'Testing calls',
      text: 'Whether another sitting is worth it, which scores to send where, and when test-optional is genuinely the better play.',
    },
    {
      icon: 'edit',
      title: 'Essays under deadline',
      text: 'The personal statement first, then supplements in priority order, so the schools that matter most get your best drafts.',
    },
    {
      icon: 'users',
      title: 'References chased',
      text: 'Who to ask, what to give them, and the follow-up that gets letters filed before the portal closes.',
    },
    {
      icon: 'send',
      title: 'Portals and documents',
      text: 'Common App, UCAS and OUAC mechanics, transcripts, score sends and every form that has to arrive alongside them.',
    },
    {
      icon: 'award',
      title: 'Aid and offers',
      text: 'Aid forms filed with the application rather than after it, then comparing what each offer actually costs.',
    },
  ];

  /* The three pages a final-year student most often needs next. */
  const NEXT = [
    {
      icon: 'file',
      kicker: 'The application process',
      title: 'What we offer',
      text: 'Everything included at each step, and what you do versus what we do.',
      href: 'application-process/what-we-offer/index.html',
      linkLabel: 'See what is included',
    },
    {
      icon: 'globe',
      kicker: 'By country',
      title: 'United States',
      text: 'The five things a US application is judged on, and how they are weighed together.',
      href: 'application-process/services/united-states/index.html',
      linkLabel: 'US requirements',
    },
    {
      icon: 'globe',
      kicker: 'By country',
      title: 'United Kingdom',
      text: 'UCAS, the course-specific case, and where admissions tests come in.',
      href: 'application-process/services/uk/index.html',
      linkLabel: 'UK requirements',
    },
  ];

  const FAQ = [
    {
      q: 'Is it too late to start if I am already in A2 or DP2?',
      a: 'No, but it changes what is realistic. Your profile is what it is by now, so the work shifts to presenting it well and choosing a list that matches it. What we will not do is pretend a late start costs nothing — the early rounds are tighter, and some scholarship deadlines will already have passed.',
    },
    {
      q: 'Do I still need the SAT or ACT if my universities are test-optional?',
      a: 'Sometimes. Test-optional means a strong score still helps and a weak one still hurts, and some merit scholarships continue to ask for scores even where admission does not. We make that call school by school rather than as a blanket rule.',
    },
    {
      q: 'I have already started my applications. Can you pick them up mid-way?',
      a: 'Yes. We start by reading what you have, which usually means an honest conversation about which drafts are worth finishing and which are worth restarting. A half-written essay is a better starting point than a blank one.',
    },
    {
      q: 'My predicted grades are lower than I wanted. Does that end it?',
      a: 'It narrows the list, it does not end it. Predicted grades matter most in the UK, where offers are made against them directly. In the US they sit inside a fuller picture. Either way the answer is a list built around the prediction, plus a plan for results coming in above or below it.',
    },
    {
      q: 'How is this different from the Junior Program?',
      a: 'The Junior Program builds a profile over three years. This one works with the profile you already have and gets the application out of the door. Students who came through the Junior Program arrive here with most of the groundwork already done.',
    },
  ];

  (CC.pageModules = CC.pageModules || {})['programs/senior-program'] = function () {
    const root = document.querySelector('[data-part2]');
    if (!root) return;

    root.innerHTML = `
      <section class="hero hero--page" aria-labelledby="sp-title">
        <div class="wrap">
          <p class="pill">${CC.icon('award')} Programs · A2 · DP2 · Grade 12</p>
          <h1 class="hero-title" id="sp-title"><span class="t-teal">Applying This Year.</span> <em class="t-peach">Nothing Left to Chance.</em></h1>
          <p class="hero-sub">For final-year students, where the planning window has closed and the application itself is the work.</p>
          <div class="hero-cta">
            ${CC.BookingTrigger({ label: 'Book a Meeting', btnClass: 'btn btn-solid btn-lg', align: 'left' })}
            <a class="btn btn-ghost btn-lg" href="#requirements">See what is required</a>
          </div>
        </div>
      </section>

      <section class="section section--tint" id="requirements">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Entry criteria',
            title: 'What each system asks for',
            titleHtml: 'What each system <em>asks for</em>',
            lede: 'Before anything else, know what you are being judged on. A US file and a UK file are not the same document with a different address on it.',
            center: true,
          })}
          ${CC.PersonaCards(REQUIREMENTS.map((r) => Object.assign({}, r, { ctaHref: CC.url(r.ctaHref) })))}
        </div>
      </section>

      <section class="section section--white" id="journey">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Your year',
            title: 'Six jobs, running in parallel',
            titleHtml: 'Six jobs, <em>running in parallel</em>',
            lede: 'In a senior year these do not happen one after another. They overlap, which is exactly why the order you start them in matters.',
            center: true,
          })}
          ${CC.WorkflowSteps([
            {
              icon: 'compass',
              meta: 'First',
              title: 'Position and shortlist',
              text: 'Where you actually stand against your target schools, and a list that reflects it.',
            },
            {
              icon: 'target',
              meta: 'Early',
              title: 'Testing decision',
              text: 'Sit again, send what you have, or go test-optional — decided per school, not once for all of them.',
              href: CC.url('programs/sat-act/index.html'),
              linkLabel: 'SAT/ACT',
            },
            {
              icon: 'edit',
              meta: 'The bulk of it',
              title: 'Essays',
              text: 'Personal statement first, then supplements in priority order.',
              href: CC.url('resources/story-workbook/index.html'),
              linkLabel: 'Story Workbook',
            },
            {
              icon: 'users',
              meta: 'In parallel',
              title: 'References and documents',
              text: 'Letters requested early, transcripts and score sends lined up behind them.',
            },
            {
              icon: 'send',
              meta: 'To deadline',
              title: 'Submission',
              text: 'Every portal checked and filed, with the aid forms going in alongside — not after.',
            },
            {
              icon: 'award',
              meta: 'After',
              title: 'Offers and aid',
              text: 'Interviews, waitlists, comparing packages and the final decision.',
            },
          ])}
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'What we help with',
            title: 'The work, through to submission',
            titleHtml: 'The work, <em>through to submission</em>',
            center: true,
          })}
          ${CC.CardGrid(HELP, { cols: 3 })}
        </div>
      </section>

      <section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Read next',
            title: 'The detail behind each step',
            titleHtml: 'The detail behind <em>each step</em>',
            center: true,
          })}
          ${CC.CardGrid(NEXT.map((n) => Object.assign({}, n, { href: CC.url(n.href) })), { cols: 3 })}
          <p class="work-footnote">
            <a class="btn btn-solid btn-lg" href="${esc(CC.url('application-process/index.html'))}">
              Start the application process ${CC.icon('arrow-right')}
            </a>
          </p>
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.SectionHead({ eyebrow: 'FAQ', title: 'Common questions', center: true })}
          ${CC.Accordion(FAQ, { openFirst: true })}
        </div>
      </section>

      ${CC.CTABand({
        title: 'The deadline is fixed. What goes in front of it is not.',
        text: 'Book a meeting and we will go through where your application stands, what is missing, and what the next eight weeks have to look like.',
        buttons: [
          { label: 'Book a Meeting', booking: true },
          { label: 'See all programs', href: CC.url('programs/index.html') },
        ],
      })}`;

    CC.initComponents(root);
  };
})(window, document);
