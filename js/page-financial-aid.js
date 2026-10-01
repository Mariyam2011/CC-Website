/* ==========================================================================
   PAGE — Financial Aid Guide  (/blog  AND  /blog/financial-aid-guide)
   --------------------------------------------------------------------------
   Long-form article. Reuses Part 1 components (StatCounter, WorkflowSteps,
   CardGrid, PageBanner trail, CTABand) plus an article-specific sticky TOC.

   This one module renders BOTH routes — /blog serves the guide directly so
   Insight > Blog opens the article with no listing page in between. Only the
   breadcrumb and the secondary CTA button differ between the two.

   Content below (university list, tags, forms, dates) was supplied directly
   by the client as the guide's real copy. Aid policies, figures and dates
   still change year to year — the closing disclaimer tells readers to
   confirm the current position with each university before relying on it.
   Re-check this file against a fresh pull whenever the guide is refreshed.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  /* --------------------------------------------------------------- TOC */

  const TOC = [
    { id: 'how-aid-works', label: 'How Aid Works' },
    { id: 'key-forms', label: 'Key Forms' },
    { id: 'united-states', label: 'United States' },
    { id: 'united-kingdom', label: 'United Kingdom' },
    { id: 'canada', label: 'Canada' },
    { id: 'europe', label: 'Europe' },
    { id: 'middle-east', label: 'Middle East' },
    { id: 'mistakes', label: 'Common Mistakes' },
    { id: 'checklist', label: 'Document Checklist' },
    { id: 'timeline', label: 'Timeline' },
  ];

  const LEGEND = [
    { tag: 'Need-Blind', def: 'Finances not considered' },
    { tag: 'No Loans', def: '100% grants' },
    { tag: 'Need-Aware', def: 'Finances may affect admissions' },
    { tag: 'Full Ride', def: 'Everything covered' },
  ];

  /* ------------------------------------------------------- definitions */

  const DEFINITIONS = [
    {
      term: 'Need-Blind Admission',
      body: 'The university does not look at your family’s finances when deciding whether to accept you. Your ability to pay has zero impact on your chances.',
      noteLabel: 'Why it matters',
      note: 'At need-aware schools, requesting aid can reduce your admissions odds. At need-blind schools, it cannot.',
    },
    {
      term: 'Full-Need Aid',
      body: 'Once admitted, the university covers 100% of the gap between what your family can afford and what it costs to attend. Often means a full ride.',
      noteLabel: 'The formula',
      note: 'Cost of Attendance − Expected Family Contribution = Your Aid Package',
    },
    {
      term: 'Need-Aware Admission',
      body: 'The university may consider your ability to pay when making admissions decisions. Requesting aid could affect your chances. However, once admitted, many still meet full demonstrated need.',
    },
    {
      term: 'Merit Scholarships',
      body: 'Awarded based on academic achievement, extracurriculars, or talent rather than financial need. Often stackable with need-based aid.',
    },
  ];

  const FORMS = [
    {
      name: 'CSS Profile (College Board)',
      body: 'The most common aid application for international students at US private universities. Collects detailed financial information about your family’s income, assets, and expenses.',
      note: 'Cost: $25 for first school, $16 per additional. Fee waivers available. Opens October 1.',
    },
    {
      name: 'ISFAA (International Student Financial Aid Application)',
      body: 'A free alternative to the CSS Profile used by some universities. Each university may have its own version, so always download directly from the school’s financial aid page.',
      note: 'Cost: Free. All currency must be converted to USD before entering.',
    },
    {
      name: 'FAFSA (Free Application for Federal Student Aid)',
      body: 'Primarily for US citizens and permanent residents. Most international students on F-1 visas are not eligible. Green card holders and certain eligible non-citizens may qualify.',
      note: 'Cost: Free. Only relevant if you hold specific US immigration status.',
    },
    {
      name: 'University-Specific Forms',
      body: 'Many universities have their own additional financial aid forms, certification of finances documents, or scholarship applications.',
      note: 'Examples: Harvard Financial Statement, Princeton Financial Aid Application, Vanderbilt ISFAA version.',
    },
  ];

  /* --------------------------------------------------------- region data */

  const US_TIERS = [
    {
      label: 'Need-Blind + Full-Need for International Students',
      note: 'The gold standard. These do not consider your finances during admissions AND cover 100% of demonstrated need.',
      unis: [
        { name: 'Harvard University', place: 'Cambridge, MA · CSS Profile + Harvard supplement', tags: ['Need-Blind', 'No Loans'] },
        { name: 'MIT', place: 'Cambridge, MA · CSS Profile · Tuition-free if family income under $200K', tags: ['Need-Blind', 'No Loans'] },
        { name: 'Princeton University', place: 'Princeton, NJ · CSS Profile + supplement · 89% of recent grads debt-free', tags: ['Need-Blind', 'No Loans'] },
        { name: 'Yale University', place: 'New Haven, CT · CSS Profile', tags: ['Need-Blind', 'No Loans'] },
        { name: 'Amherst College', place: 'Amherst, MA · CSS Profile · Also need-blind for undocumented students', tags: ['Need-Blind', 'No Loans'] },
      ],
    },
    {
      label: 'Need-Blind with Strong Aid',
      note: 'Do not consider your ability to pay when reviewing your application. Aid policies vary slightly but admitted students typically receive substantial support.',
      unis: [
        { name: 'Dartmouth College', place: 'Hanover, NH · Meets full need for all admitted students', tags: ['Need-Blind'] },
        { name: 'Georgetown University', place: 'Washington, D.C. · Need-blind for all, but full need not guaranteed for intl.', tags: ['Need-Blind'] },
        { name: 'Bowdoin College', place: 'Brunswick, ME · Meets full need for all admitted students', tags: ['Need-Blind'] },
        { name: 'University of Notre Dame', place: 'Notre Dame, IN · Meets 100% of demonstrated need', tags: ['Need-Blind'] },
        { name: 'Brown University', place: 'Providence, RI · Need-blind since Class of 2029 · Meets full demonstrated need', tags: ['Need-Blind', 'New!'] },
      ],
    },
    {
      label: 'Need-Aware but Extremely Generous',
      note: 'These consider your finances during admissions, which means requesting a large aid package can affect your chances. But once admitted, they meet full demonstrated need. Packages often exceed $80,000/year.',
      unis: [
        { name: 'Stanford University', place: 'Stanford, CA · Families under $100K: tuition-free', tags: ['Need-Aware'] },
        { name: 'Columbia University', place: 'New York, NY', tags: ['Need-Aware'] },
        { name: 'University of Pennsylvania', place: 'Philadelphia, PA · Full scholarship if income under $200K (from 2025-26)', tags: ['Need-Aware'] },
        { name: 'Duke University', place: 'Durham, NC', tags: ['Need-Aware'] },
        { name: 'University of Chicago', place: 'Chicago, IL', tags: ['Need-Aware'] },
        { name: 'Caltech', place: 'Pasadena, CA', tags: ['Need-Aware'] },
        { name: 'Northwestern University', place: 'Evanston, IL', tags: ['Need-Aware'] },
        { name: 'Vanderbilt University', place: 'Nashville, TN · Aid range: $24K-$97K/yr for intl.', tags: ['Need-Aware'] },
        { name: 'Rice University', place: 'Houston, TX', tags: ['Need-Aware'] },
        { name: 'Johns Hopkins University', place: 'Baltimore, MD', tags: ['Need-Aware'] },
        { name: 'WashU in St. Louis', place: 'St. Louis, MO', tags: ['Need-Aware'] },
      ],
      more: '7 more top liberal arts colleges',
    },
  ];

  const UK_GOV = [
    {
      name: 'Chevening Scholarships',
      tags: ['Fully Funded'],
      body: 'UK government’s flagship award. Covers tuition, living expenses, and return airfare for a one-year master’s at any UK university.',
      note: '160+ countries eligible. Must have 2+ years work experience. Applications: Aug-Nov annually.',
    },
    {
      name: 'Commonwealth Scholarships',
      tags: ['Fully Funded'],
      body: 'For students from Commonwealth nations pursuing master’s and doctoral degrees. Covers tuition, living allowance, travel, and thesis costs.',
      note: 'Apply through your home country’s nominating body.',
    },
    {
      name: 'GREAT Scholarships',
      tags: ['Min. £10,000'],
      body: 'Joint initiative between the British Council and 60+ UK universities. Available to students from 18 countries.',
      note: 'For postgraduate one-year courses. 2026-27 applications open.',
    },
  ];

  const UK_UNI = [
    { name: 'Gates Cambridge', place: 'University of Cambridge · Tuition + living + travel', tags: ['Full Funding'] },
    { name: 'Clarendon Scholarships', place: 'University of Oxford · ~140 awards/year', tags: ['Full Funding'] },
    { name: 'Westminster Full Scholarship', place: 'University of Westminster · Tuition + £10K/yr living', tags: ['Full Funding'] },
    { name: 'Think Big Scholarships', place: 'University of Bristol · Up to £26,000', tags: ['Partial to Full'] },
    { name: 'Edinburgh Global Scholarships', place: 'University of Edinburgh', tags: ['Partial to Full'] },
    { name: 'Exeter International Scholarships', place: 'University of Exeter', tags: ['Partial to Full'] },
  ];

  const CANADA = [
    { name: 'University of Toronto', tags: ['Full Ride'], body: 'Lester B. Pearson Scholarship. Covers tuition, books, fees, and residence for 4 years. Must be nominated by your school.' },
    { name: 'University of British Columbia', tags: ['Up to Full Ride'], body: 'International Major Entrance Scholarship + Karen McKellin Award covering tuition and living costs based on need.' },
    { name: 'McGill University', tags: ['$3K-$12K/yr'], body: 'Entrance scholarships and major awards. Some renewable for full duration of study.' },
    { name: 'University of Waterloo', tags: ['Merit-Based'], body: 'International Master’s Award of Excellence and President’s Scholarships.' },
  ];

  const EUROPE = [
    { name: 'Germany', tags: ['Tuition-Free'], body: 'Most public universities charge no tuition, even for international students. DAAD scholarships fund thousands annually. Programs increasingly offered in English.' },
    { name: 'Netherlands', tags: ['Scholarships Available'], body: 'Holland Scholarship offers €5,000 for non-EEA students. Orange Tulip Scholarship covers partial to full tuition at various Dutch universities.' },
    { name: 'Sweden', tags: ['Fully Funded Options'], body: 'Swedish Institute Scholarships cover tuition, living expenses, travel, and insurance. Many universities also offer tuition waivers for non-EU students.' },
    { name: 'France', tags: ['Low Tuition + Scholarships'], body: 'Eiffel Excellence Scholarship covers monthly allowance, airfare, health insurance. Public university tuition remains very low even without a scholarship.' },
  ];

  const MIDDLE_EAST = [
    { name: 'NYU Abu Dhabi', tags: ['Full Ride'], body: 'Meets 100% of need for all admitted students regardless of nationality. Covers tuition, housing, dining, travel, and personal expenses.' },
    { name: 'KAUST (Saudi Arabia)', tags: ['Full Ride'], body: 'Every admitted student is fully funded. Tuition, housing, living stipend, health insurance, and relocation support. Graduate programs only.' },
    { name: 'MBZUAI (Abu Dhabi)', tags: ['Full Ride', 'AI-Focused'], body: 'The world’s first graduate-level AI research university. Every admitted M.Sc. and Ph.D. student receives a full scholarship: tuition, monthly stipend, health insurance, visa sponsorship, and on-campus housing. Open to all nationalities.' },
    { name: 'American University of Beirut', tags: ['Merit + Need-Based'], body: 'Competitive merit and need-based aid. American-style education with dedicated financial aid office for international applicants.' },
    { name: 'American University in Cairo', tags: ['Merit + Need-Based'], body: 'Strong scholarship programs for international students. Follows American-style admissions and aid model.' },
  ];

  /* ------------------------------------------------------- static copy */

  const MISTAKES = [
    {
      title: 'Not applying for aid because they assume they won’t get it',
      text: 'Families see “$90,000/year” and close the tab. But at schools that meet full need, most students pay a fraction of the sticker price.',
    },
    {
      title: 'Missing financial aid deadlines',
      text: 'Many universities have separate deadlines for aid forms that differ from admissions deadlines. Missing the CSS Profile deadline by even a day can mean zero aid consideration.',
    },
    {
      title: 'Only applying to need-blind schools',
      text: 'Only 5-6 schools are need-blind for international students. If that’s your entire list, you’re limiting yourself to the most competitive universities on earth. A smart list mixes both.',
    },
    {
      title: 'Submitting financial documents with errors',
      text: 'If numbers on your CSS Profile don’t match your bank statements or tax returns, the aid office flags your application. This creates delays and sometimes reduced awards.',
    },
    {
      title: 'Not using net price calculators',
      text: 'Every US university has a net price calculator online. Running your numbers through it before applying gives you a realistic estimate of what you’d actually pay.',
    },
    {
      title: 'Ignoring merit scholarships at mid-tier universities',
      text: 'Schools ranked 50-150 often offer aggressive merit scholarships to attract strong international students.',
    },
    {
      title: 'Treating the application and aid application as separate things',
      text: 'Your essays, school list, and financial aid strategy should work as one system. At need-aware schools, the strength of your application directly affects whether you’ll receive full funding.',
    },
  ];

  const CHECKLIST = [
    { title: 'Parents’ income tax returns (last 2 years)', sub: 'Translated to English and converted to USD if in another language/currency' },
    { title: 'Bank statements (last 3-6 months)', sub: 'All accounts held by parents and student' },
    { title: 'Business ownership documentation (if applicable)', sub: 'Business registration, profit/loss statements, balance sheets' },
    { title: 'Property ownership records', sub: 'Current market value estimates for any real estate owned by the family' },
    { title: 'Investment and retirement account statements', sub: 'Stocks, bonds, mutual funds, pension plans' },
    { title: 'Proof of special circumstances', sub: 'Medical expenses, siblings’ tuition, family support obligations, divorce/separation docs' },
    { title: 'CSS Profile account created', sub: 'cssprofile.collegeboard.org. Create well before deadline. Opens October 1.' },
    { title: 'Passport copies (student and parents)', sub: 'Required for most ISFAA forms and some university-specific applications' },
  ];

  const TIMELINE = [
    { icon: 'compass', meta: 'June – August 2026', title: 'Research and list building', text: 'Identify target schools based on aid policies. Run net price calculators. Start gathering financial documents.' },
    { icon: 'file', meta: 'September – October 2026', title: 'Applications open', text: 'Common App and Coalition App go live. CSS Profile opens October 1. Begin filling out applications and aid forms simultaneously.' },
    { icon: 'edit', meta: 'November 1–15, 2026', title: 'Early Decision / Early Action deadlines', text: 'Most ED deadlines fall here. Financial aid forms due on the same date or within two weeks.' },
    { icon: 'send', meta: 'January 1 – February 1, 2027', title: 'Regular Decision deadlines', text: 'Most RD applications and financial aid forms due. CSS Profile, ISFAA, and all university-specific forms must be submitted.' },
    { icon: 'clock', meta: 'March – April 2027', title: 'Decisions and aid offers arrive', text: 'Compare financial aid packages carefully. Look at total cost of attendance, not just the scholarship amount.' },
    { icon: 'award', meta: 'May 1, 2027', title: 'Decision Day', text: 'Commit to one university and accept your financial aid package. Begin visa application process immediately.' },
  ];

  /* ---------------------------------------------------------- markup */

  function tagLegend() {
    return `
      <div class="legend-bar">
        <div class="wrap legend-inner">
          <span class="legend-label">Tag Legend</span>
          <ul class="legend-list">
            ${LEGEND.map(
              (l) => `<li class="legend-item"><span class="uni-tag">${esc(l.tag)}</span><span class="legend-def">= ${esc(l.def)}</span></li>`
            ).join('')}
          </ul>
        </div>
      </div>`;
  }

  function definitionCards() {
    return `<div class="def-grid">${DEFINITIONS.map(
      (d) => `
      <article class="def-card">
        <h3 class="def-term">${esc(d.term)}</h3>
        <p class="def-body">${esc(d.body)}</p>
        ${d.note ? `<p class="def-why"><span>${esc(d.noteLabel || 'Note')}</span>${esc(d.note)}</p>` : ''}
      </article>`
    ).join('')}</div>`;
  }

  function formCards() {
    return `<ol class="form-grid">${FORMS.map(
      (f, i) => `
      <li class="form-card">
        <span class="form-num">${i + 1}</span>
        <div>
          <h3 class="form-name">${esc(f.name)}</h3>
          <p class="form-body">${esc(f.body)}</p>
          <p class="form-note">${CC.icon('clock')}<span>${esc(f.note)}</span></p>
        </div>
      </li>`
    ).join('')}</ol>`;
  }

  function calloutBox(o) {
    return `
      <p class="article-disclaimer">
        ${CC.icon(o.icon || 'sparkle')}
        <span><strong>${esc(o.lead)}</strong> ${esc(o.text)}</span>
      </p>`;
  }

  function uniCard(u) {
    const tags = Array.isArray(u.tags) ? u.tags : u.tag ? [u.tag] : [];
    return `
      <article class="uni-card">
        ${
          tags.length
            ? `<div class="uni-tags">${tags
                .map((t) => `<span class="uni-tag${t.toLowerCase() === 'new!' ? ' uni-tag--new' : ''}">${esc(t)}</span>`)
                .join('')}</div>`
            : ''
        }
        <h4 class="uni-name">${esc(u.name)}</h4>
        ${u.place ? `<p class="uni-place">${CC.icon('compass')}<span>${esc(u.place)}</span></p>` : ''}
        ${u.body ? `<p class="uni-body">${esc(u.body)}</p>` : ''}
        ${u.note ? `<p class="uni-note">${esc(u.note)}</p>` : ''}
      </article>`;
  }

  function moreCard(text) {
    return `<article class="uni-card uni-card--more"><p>${esc(text)}</p></article>`;
  }

  function tierBlock(t) {
    return `
      <div class="tier">
        <div class="tier-head">
          <h3 class="tier-label">${esc(t.label)}</h3>
          ${t.note ? `<p class="tier-note">${esc(t.note)}</p>` : ''}
        </div>
        <div class="uni-card-grid">
          ${t.unis.map(uniCard).join('')}
          ${t.more ? moreCard(t.more) : ''}
        </div>
      </div>`;
  }

  function regionWrap(id, tint, eyebrow, title, lede, inner) {
    return `
      <section class="section ${tint ? 'section--tint' : 'section--white'}" id="${id}">
        <div class="wrap">
          ${CC.SectionHead({ eyebrow, title, lede })}
          ${inner}
        </div>
      </section>`;
  }

  function usSection() {
    const inner =
      US_TIERS.map(tierBlock).join('') +
      CC.StatCounter([
        { text: '$84K+', label: 'Avg. aid at top 20' },
        { text: '100%', label: 'Need met at Tier 1' },
        { text: '$0', label: 'Loans at top 5 for intl.' },
      ]);
    return regionWrap(
      'united-states',
      true,
      'Region',
      'United States',
      'Home to the most generous financial aid programs in the world for international students. Private universities lead on funding, while public universities offer limited but growing support.',
      inner
    );
  }

  function ukSection() {
    const inner =
      tierBlock({ label: 'Government-Funded Scholarships', unis: UK_GOV }) +
      tierBlock({ label: 'University-Specific Scholarships', unis: UK_UNI });
    return regionWrap(
      'united-kingdom',
      false,
      'Region',
      'United Kingdom',
      'The UK doesn’t follow the same need-blind model as the US, but offers several pathways to fully funded education through government programs and university-specific awards.',
      inner
    );
  }

  function canadaSection() {
    const inner = `<div class="uni-card-grid">${CANADA.map(uniCard).join('')}${moreCard(
      'More Canadian universities with intl. aid'
    )}</div>`;
    return regionWrap(
      'canada',
      true,
      'Region',
      'Canada',
      'Relatively affordable tuition compared to the US, combined with strong scholarship programs and post-graduation work opportunities.',
      inner
    );
  }

  function europeSection() {
    const inner =
      `<div class="uni-card-grid">${EUROPE.map(uniCard).join('')}</div>` +
      calloutBox({
        icon: 'compass',
        lead: 'Also worth exploring.',
        text: 'Italy, Norway, and Finland offer low or zero tuition programs for international students with additional scholarship options.',
      });
    return regionWrap(
      'europe',
      false,
      'Region',
      'Europe',
      'Many European countries offer tuition-free or very low-cost education, even for international students. Combined with scholarships, Europe can be the most affordable study abroad destination.',
      inner
    );
  }

  function middleEastSection() {
    const inner =
      `<div class="uni-card-grid">${MIDDLE_EAST.map(uniCard).join('')}</div>` +
      calloutBox({
        icon: 'award',
        lead: 'Why Middle East universities are underrated.',
        text: 'KAUST and MBZUAI fund every admitted student automatically. NYU Abu Dhabi’s average aid package rivals Harvard’s. Yet very few international students apply because they don’t know about them. Less competition, same quality of funding.',
      });
    return regionWrap(
      'middle-east',
      true,
      'Region',
      'Middle East',
      'Home to some of the most generous and underrated financial aid programs in the world. Several universities here fund every single admitted student automatically.',
      inner
    );
  }

  function mistakes() {
    return `<ol class="mistake-list">${MISTAKES.map(
      (m, i) => `
      <li class="mistake">
        <span class="mistake-num">${i + 1}</span>
        <div>
          <h3 class="mistake-title">${esc(m.title)}</h3>
          <p class="mistake-text">${esc(m.text)}</p>
        </div>
      </li>`
    ).join('')}</ol>`;
  }

  function checklist() {
    return `<ul class="doc-grid">${CHECKLIST.map(
      (c) => `<li class="doc-item">${CC.icon('check')}<div><p class="doc-item-title">${esc(c.title)}</p><p class="doc-item-sub">${esc(
        c.sub
      )}</p></div></li>`
    ).join('')}</ul>`;
  }

  function tocNav() {
    return `
      <div class="toc" data-toc>
        <div class="wrap">
          <nav class="toc-inner" aria-label="On this page">
            <span class="toc-label">What’s Inside</span>
            <ul class="toc-list">
              ${TOC.map(
                (t, i) =>
                  `<li><a class="toc-link${i === 0 ? ' is-active' : ''}" href="#${t.id}" data-toc-link="${t.id}">${esc(
                    t.label
                  )}</a></li>`
              ).join('')}
            </ul>
          </nav>
        </div>
      </div>`;
  }

  /* ----------------------------------------------------------- mount */

  function renderGuide() {
    const root = document.querySelector('[data-part2]');
    if (!root) return;

    /* This same guide is the Blog page itself (/blog) and also keeps its own
       url (/blog/financial-aid-guide). Only the breadcrumb and the secondary
       CTA differ — the article is identical, rendered from one source. */
    const onBlogRoute = (document.body.getAttribute('data-page') || '') === 'blog';

    const trail = onBlogRoute
      ? [
          { label: 'Home', href: CC.url('index.html') },
          { label: 'Insight', href: CC.url('insight/index.html') },
          { label: 'Blog' },
        ]
      : [
          { label: 'Home', href: CC.url('index.html') },
          { label: 'Insight', href: CC.url('insight/index.html') },
          { label: 'Blog', href: CC.url('blog/index.html') },
          { label: 'Financial Aid Guide' },
        ];

    const crumbs = trail
      .map((c, i) =>
        i === trail.length - 1
          ? `<li><span aria-current="page">${esc(c.label)}</span></li>`
          : `<li><a href="${esc(c.href)}">${esc(c.label)}</a>${CC.icon('chevron-right', 'crumb-sep')}</li>`
      )
      .join('');

    root.innerHTML = `
      <article class="article">
        <header class="article-head">
          <div class="wrap">
            <nav class="breadcrumb" aria-label="Breadcrumb"><ol>${crumbs}</ol></nav>
            <p class="article-tag">2026 Guide</p>
            <h1 class="article-title">Universities That Offer Full Financial Aid to International Students</h1>
            <p class="article-sub">A complete list of universities across the US, UK, Canada, Europe, and the Middle
              East that fund international students. Plus the forms you need, deadlines to know, and mistakes to avoid.</p>
            ${CC.StatCounter([
              { value: 5, label: 'Regions covered' },
              { value: 80, suffix: '+', label: 'Universities' },
              { text: 'March 2026', label: 'Last updated' },
            ])}
          </div>
        </header>

        ${tocNav()}
        ${tagLegend()}

        <section class="section section--white" id="how-aid-works">
          <div class="wrap">
            ${CC.SectionHead({
              eyebrow: 'The basics',
              title: 'How Financial Aid Works for International Students',
              lede: 'Before diving into the list, understanding these four concepts will change how you approach your entire application strategy.',
            })}
            ${definitionCards()}
            ${calloutBox({
              icon: 'sparkle',
              lead: 'Key insight.',
              text: 'Not every need-blind school meets full need, and not every school that meets full need is need-blind. The most generous universities do both, and only a handful extend these policies to international students. That’s why school selection and application strategy matters enormously.',
            })}
          </div>
        </section>

        <section class="section section--tint" id="key-forms">
          <div class="wrap">
            ${CC.SectionHead({
              eyebrow: 'Paperwork',
              title: 'Key Financial Aid Forms You Need to Know',
              lede: 'Different universities require different forms. Getting this wrong means your aid application is incomplete, and incomplete applications often receive zero funding.',
            })}
            ${formCards()}
            ${calloutBox({
              icon: 'edit',
              lead: 'Pro tip.',
              text: 'Start gathering your parents’ financial documents (tax returns, bank statements, property valuations, business records) at least 3 months before deadlines. Converting currencies and getting official translations takes longer than you expect.',
            })}
          </div>
        </section>

        ${usSection()}
        ${ukSection()}
        ${canadaSection()}
        ${europeSection()}
        ${middleEastSection()}

        <section class="section section--white" id="mistakes">
          <div class="wrap">
            ${CC.SectionHead({
              eyebrow: 'Avoid these',
              title: '7 Mistakes That Cost Students Financial Aid',
              lede: 'We’ve reviewed hundreds of applications. These are the errors that consistently cost families money.',
            })}
            ${mistakes()}
          </div>
        </section>

        <section class="section section--tint" id="checklist">
          <div class="wrap">
            ${CC.SectionHead({
              eyebrow: 'Get organised',
              title: 'Financial Aid Document Checklist',
              lede: 'Gather these before you start any financial aid application. Having everything ready prevents last-minute errors and missed deadlines.',
            })}
            ${checklist()}
          </div>
        </section>

        <section class="section section--white" id="timeline">
          <div class="wrap">
            ${CC.SectionHead({
              eyebrow: 'Planning',
              title: 'Typical Application Timeline',
              lede: 'For students planning to start university in Fall 2027. Dates are approximate. Always verify with each university.',
            })}
            ${CC.WorkflowSteps(TIMELINE)}
          </div>
        </section>

        <div class="wrap">
          <div class="article-prompt">
            <p class="article-prompt-text">Have questions about your financial aid strategy?</p>
            ${CC.BookingTrigger({ label: 'Book a Free Consultation', btnClass: 'btn btn-outline', align: 'center' })}
          </div>

          ${calloutBox({
            icon: 'clock',
            lead: 'Policies change every year.',
            text: 'This guide is for informational purposes and was last updated in March 2026. Financial aid policies change frequently. Always verify directly with each university’s admissions and financial aid office before applying. College Crafters is not affiliated with any of the institutions listed above.',
          })}

          <p class="article-contact">Have a question about a specific school or your financial aid strategy?
            ${CC.BookingTrigger({ label: 'Reach out to us directly', btnClass: 'footer-link-btn', align: 'left', chevron: false })}</p>
        </div>
      </article>

      ${CC.CTABand({
        title: 'Work out what you would actually pay',
        text: 'Bring your list to a free consultation and we will go through aid policy, forms and deadlines school by school.',
        buttons: [
          { label: 'Book a Free Consultation', booking: true },
          onBlogRoute
            ? { label: 'See our programs', href: CC.url('programs/index.html') }
            : { label: 'Back to the Blog', href: CC.url('blog/index.html') },
        ],
      })}`;

    /* sticky TOC follows the sections */
    const links = Array.from(root.querySelectorAll('[data-toc-link]'));
    if (links.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            links.forEach((l) => l.classList.toggle('is-active', l.dataset.tocLink === e.target.id));
            const active = root.querySelector('.toc-link.is-active');
            const list = root.querySelector('.toc-list');
            if (active && list && list.scrollWidth > list.clientWidth) {
              list.scrollTo({ left: active.offsetLeft - 20, behavior: 'smooth' });
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      TOC.forEach((t) => {
        const el = document.getElementById(t.id);
        if (el) io.observe(el);
      });
    }

    CC.initComponents(root);
  }

  /* Blog IS this guide — selecting Insight > Blog opens it directly, with no
     listing page in between. The dedicated /blog/financial-aid-guide url
     still resolves to the same article. */
  const modules = (CC.pageModules = CC.pageModules || {});
  modules.blog = renderGuide;
  modules['blog/financial-aid-guide'] = renderGuide;
})(window, document);
