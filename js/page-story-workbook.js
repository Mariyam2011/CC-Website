/* ==========================================================================
   PAGE — Story Workbook  (/resources/story-workbook)
   --------------------------------------------------------------------------
   Built from the Part 1 component library (ComparisonTable, CardGrid,
   SectionHead, CTABand) plus a five-step interactive exercise.

   Exercise behaviour:
     - every answer autosaves to localStorage under STORE_KEY
     - a progress bar tracks completed required fields
     - "Download PDF" stays disabled until all required fields are filled,
       then lazy-loads jsPDF from CDN and builds the PDF client-side

   PLACEHOLDER: the four case-study cards in "Real Results" use invented
   student stories. Replace with real, written-permission stories before
   publishing. Outcomes are shown as supplied; the narratives are not real.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;
  const STORE_KEY = 'cc-story-workbook-v1';

  /* ---------------------------------------------------------------- copy */

  const REALITY_ROWS = [
    { old: 'List every activity they have ever joined', new: 'Show a few commitments that clearly connect' },
    { old: 'Write the essay they think admissions wants', new: 'Write the essay only they could have written' },
    { old: 'Treat each part of the application separately', new: 'Make all four parts point at one idea' },
    { old: 'Describe what they did', new: 'Show why it mattered to them' },
    { old: 'Build the school list around prestige', new: 'Target schools that want their specific story' },
    { old: 'Start the essay in October', new: 'Start finding the story a year out' },
  ];

  const FRAMEWORK = [
    {
      icon: 'book',
      title: 'Transcript',
      text: 'Your course choices are an argument about what you care about intellectually. The thread should be visible in what you chose to take seriously.',
    },
    {
      icon: 'users',
      title: 'Activities',
      text: 'Depth beats length. A few commitments that obviously belong together say more than a list of fourteen that do not.',
    },
    {
      icon: 'edit',
      title: 'Essays',
      text: 'This is where the thread is said out loud, in your voice. Not the most dramatic story — the one that explains the rest of the file.',
    },
    {
      icon: 'award',
      title: 'Recommendations',
      text: 'Your teachers should independently describe the same person your application describes. That repetition is what makes it credible.',
    },
  ];

  const CASES = []; /* Real, permissioned student stories go here.
     The section self-hides while this is empty. */

  const STEPS = [
    { id: 'core-values', chip: 'Core Values', title: 'Core Values' },
    { id: 'activity-audit', chip: 'Activity Audit', title: 'Activity Audit' },
    { id: 'find-thread', chip: 'Find Thread', title: 'Find Your Thread' },
    { id: 'alignment', chip: 'Alignment', title: 'Alignment Map' },
    { id: 'story-30', chip: '30-Second Story', title: 'Your 30-Second Story' },
  ];

  /* ------------------------------------------------------------ state */

  const blank = () => ({
    moment1: '', moment2: '', moment3: '',
    why1: '', why2: '', why3: '',
    theme: '',
    activities: [{ what: '', did: '', why: '' }],
    reflection: '',
    threadWhat: '', threadWhy: '', threadNext: '',
    onlyYou: [false, false, false, false],
    alignTranscript: '', alignActivities: '', alignEssays: '', alignRecs: '',
    story30: '',
  });

  let state = blank();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state = Object.assign(blank(), saved);
      if (!Array.isArray(state.activities) || !state.activities.length) state.activities = [{ what: '', did: '', why: '' }];
      if (!Array.isArray(state.onlyYou)) state.onlyYou = [false, false, false, false];
    } catch (err) {
      /* private mode, blocked storage, or corrupt data — start clean */
      state = blank();
    }
  }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
        flagSaved();
      } catch (err) {
        /* storage unavailable — the page still works, answers just are not kept */
      }
    }, 400);
  }

  /* Required units: 7 (step 1) + 4 (step 2) + 3 (step 3) + 4 (step 4) + 1 (step 5) */
  function completion() {
    const filled = (v) => String(v || '').trim().length > 0;
    const done = [];

    ['moment1', 'moment2', 'moment3', 'why1', 'why2', 'why3', 'theme'].forEach((k) => done.push(filled(state[k])));

    const firstActivity = state.activities[0] || {};
    done.push(filled(firstActivity.what), filled(firstActivity.did), filled(firstActivity.why));
    done.push(filled(state.reflection));

    ['threadWhat', 'threadWhy', 'threadNext'].forEach((k) => done.push(filled(state[k])));
    ['alignTranscript', 'alignActivities', 'alignEssays', 'alignRecs'].forEach((k) => done.push(filled(state[k])));
    done.push(filled(state.story30));

    const total = done.length;
    const count = done.filter(Boolean).length;
    return { count, total, pct: Math.round((count / total) * 100), complete: count === total };
  }

  /* ------------------------------------------------------------ markup */

  const field = (name, label, opts) => {
    const o = opts || {};
    const id = 'sw-' + name;
    const tag = o.textarea
      ? `<textarea id="${id}" name="${name}" rows="${o.rows || 3}" data-sw-field="${name}"${
          o.placeholder ? ` placeholder="${esc(o.placeholder)}"` : ''
        }></textarea>`
      : `<input id="${id}" name="${name}" type="text" data-sw-field="${name}"${
          o.placeholder ? ` placeholder="${esc(o.placeholder)}"` : ''
        }>`;
    return `<div class="field sw-field"><label for="${id}">${esc(label)}</label>${tag}</div>`;
  };

  const example = (text) => `
    <div class="sw-example">
      <p class="sw-example-tag">Example from an admitted student</p>
      <p class="sw-example-text">${esc(text)}</p>
    </div>`;

  function activityRow(i) {
    return `
      <tr data-sw-activity="${i}">
        <td>
          <label class="visually-hidden" for="sw-act-what-${i}">Activity ${i + 1} name</label>
          <input id="sw-act-what-${i}" type="text" data-sw-act="${i}" data-sw-key="what" placeholder="Debate club">
        </td>
        <td>
          <label class="visually-hidden" for="sw-act-did-${i}">Activity ${i + 1} — what I did</label>
          <input id="sw-act-did-${i}" type="text" data-sw-act="${i}" data-sw-key="did" placeholder="Ran the junior training sessions">
        </td>
        <td>
          <label class="visually-hidden" for="sw-act-why-${i}">Activity ${i + 1} — why it mattered</label>
          <input id="sw-act-why-${i}" type="text" data-sw-act="${i}" data-sw-key="why" placeholder="I like making hard things learnable">
        </td>
      </tr>`;
  }

  const ONLY_YOU = [
    'It names something specific, not a category.',
    'Someone who knows me well would recognise me in it.',
    'It explains why, not just what.',
    'No one else at my school could write this same sentence.',
  ];

  function stepCard(n, step, body) {
    return `
      <section class="sw-step" id="step-${step.id}" aria-labelledby="h-${step.id}">
        <div class="sw-step-head">
          <span class="sw-step-num">${n}</span>
          <h3 class="sw-step-title" id="h-${step.id}">${esc(step.title)}</h3>
        </div>
        <div class="sw-step-body">${body}</div>
      </section>`;
  }

  function exercisesHtml() {
    const chips = STEPS.map(
      (s, i) =>
        `<a class="sw-chip${i === 0 ? ' is-active' : ''}" href="#step-${s.id}" data-sw-chip="${s.id}">
           <span class="sw-chip-num">${i + 1}</span>${esc(s.chip)}
         </a>`
    ).join('');

    const step1 = stepCard(1, STEPS[0], `
      <p class="sw-step-lede">Start with moments, not adjectives. Three times you felt proud or genuinely alive — then one word for why each one mattered.</p>
      <fieldset class="sw-fieldset">
        <legend>Three moments</legend>
        ${field('moment1', 'Moment 1', { placeholder: 'The week I rebuilt the school newsletter from scratch' })}
        ${field('moment2', 'Moment 2' )}
        ${field('moment3', 'Moment 3' )}
      </fieldset>
      <fieldset class="sw-fieldset">
        <legend>One word for why each mattered</legend>
        <div class="sw-word-grid">
          ${field('why1', 'Why 1', { placeholder: 'Ownership' })}
          ${field('why2', 'Why 2' )}
          ${field('why3', 'Why 3' )}
        </div>
      </fieldset>
      ${field('theme', 'What theme connects those three words?', { textarea: true, rows: 2, placeholder: 'I care about taking responsibility for things nobody else has claimed.' })}
      ${example('“All three moments were times I was trusted with something before I was ready.”')}
    `);

    const step2 = stepCard(2, STEPS[1], `
      <p class="sw-step-lede">List what you actually do. The third column is the one that matters — most students never fill it in.</p>
      <div class="sw-table-wrap">
        <table class="sw-table">
          <thead>
            <tr><th scope="col">Activity</th><th scope="col">What I did</th><th scope="col">Why it mattered to me</th></tr>
          </thead>
          <tbody data-sw-activities></tbody>
        </table>
      </div>
      <button class="btn btn-ghost sw-add" type="button" data-sw-add-activity>+ Add another activity</button>
      ${field('reflection', 'Looking at that third column — what keeps repeating?', { textarea: true, rows: 3, placeholder: 'Almost everything I stick with involves explaining something to someone younger than me.' })}
      ${example('“Every single one was about making a group function better, not about the subject itself.”')}
    `);

    const onlyYou = ONLY_YOU.map(
      (t, i) => `
      <li>
        <label class="sw-check">
          <input type="checkbox" data-sw-only="${i}">
          <span>${esc(t)}</span>
        </label>
      </li>`
    ).join('');

    const step3 = stepCard(3, STEPS[2], `
      <p class="sw-step-lede">Put it in one sentence. If you cannot, the thread is not specific enough yet.</p>
      <div class="sw-sentence">
        <span class="sw-sentence-static">I am the student who</span>
        ${field('threadWhat', 'what you do', { placeholder: 'makes complicated things learnable' })}
        <span class="sw-sentence-static">because</span>
        ${field('threadWhy', 'why it matters to you', { placeholder: 'I was the one who got left behind in class' })}
        <span class="sw-sentence-static">— and at university I want to</span>
        ${field('threadNext', 'what comes next', { placeholder: 'build tools that teach' })}
        <span class="sw-sentence-static">.</span>
      </div>
      <fieldset class="sw-fieldset">
        <legend>The “Only You” test</legend>
        <ul class="sw-check-list">${onlyYou}</ul>
      </fieldset>
      ${example('“I am the student who keeps the thing running after everyone else loses interest.”')}
      ${example('“I am the student who learned economics behind a counter, not in a classroom.”')}
    `);

    const boxes = [
      { key: 'alignTranscript', label: 'Transcript', hint: 'Which course choices show this?' },
      { key: 'alignActivities', label: 'Activities', hint: 'Which commitments show this?' },
      { key: 'alignEssays', label: 'Essays', hint: 'Which story shows this best?' },
      { key: 'alignRecs', label: 'Recommendations', hint: 'Which teacher has seen this?' },
    ]
      .map(
        (b) => `
      <div class="sw-align-box">
        <p class="sw-align-label">${esc(b.label)}</p>
        <div class="field sw-field">
          <label for="sw-${b.key}">${esc(b.hint)}</label>
          <textarea id="sw-${b.key}" rows="3" data-sw-field="${b.key}"></textarea>
        </div>
      </div>`
      )
      .join('');

    const step4 = stepCard(4, STEPS[3], `
      <p class="sw-step-lede">Your thread sits on top. Every piece below it has to carry the same idea, or it is not doing any work.</p>
      <div class="sw-align">
        <div class="sw-align-thread" data-sw-thread-preview>
          <p class="sw-align-thread-tag">Your thread</p>
          <p class="sw-align-thread-text" data-sw-thread-text>Fill in Step 3 and your thread appears here.</p>
        </div>
        <div class="sw-align-grid">${boxes}</div>
      </div>
    `);

    const step5 = stepCard(5, STEPS[4], `
      <p class="sw-step-lede">The version you can say out loud — in an interview, or to someone who asks what you are into.</p>
      <div class="sw-template">
        <p class="sw-template-tag">Template</p>
        <p class="sw-template-text">I am [who you are]. I spent [time] doing [the thing]. It started because [the why]. Now I want to [the next step] — which is why I am applying to [kind of programme].</p>
      </div>
      ${field('story30', 'Your 30-second story', { textarea: true, rows: 6 })}
    `);

    return `
      <div class="sw-exercises" id="exercises">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Interactive',
            title: '5 Steps to Your Story',
            titleHtml: '5 Steps to <em>Your Story</em>',
            lede: 'Work through these in order. Your answers save in this browser as you type, and you can download them as a PDF at the end.',
            center: true,
          })}
        </div>

        <div class="sw-sticky">
          <div class="wrap">
            <nav class="sw-chips" aria-label="Workbook steps">${chips}</nav>
            <div class="sw-progress">
              <div class="sw-progress-bar"><span data-sw-bar style="width:0%"></span></div>
              <p class="sw-progress-text" data-sw-progress aria-live="polite">0 of 19 answered</p>
            </div>
          </div>
        </div>

        <div class="wrap sw-steps">
          ${step1}${step2}${step3}${step4}${step5}

          <div class="sw-actions">
            <button class="btn btn-solid btn-lg" type="button" data-sw-pdf disabled aria-describedby="sw-pdf-note">
              Download PDF ${CC.icon('arrow-right')}
            </button>
            <p class="sw-pdf-note" id="sw-pdf-note" data-sw-pdf-note>Fill in all five steps to unlock the PDF.</p>
            <p class="sw-saved" data-sw-saved aria-live="polite"></p>
          </div>
        </div>
      </div>`;
  }

  /* ------------------------------------------------------------ render */

  function render(root) {
    const cases = CASES.map(
      (c) => `
      <article class="sw-case">
        <p class="sw-case-outcome">${esc(c.outcome)}</p>
        <p class="sw-case-story">${esc(c.story)}</p>
        <p class="sw-case-thread">${esc(c.thread)}</p>
      </article>`
    ).join('');

    root.innerHTML = `
      <section class="hero hero--page" aria-labelledby="sw-title">
        <div class="wrap">
          <p class="pill">${CC.icon('sparkle')} Free Workbook</p>
          <h1 class="hero-title" id="sw-title"><span class="t-teal">Find Your</span> <em class="t-peach">Story</em></h1>
          <p class="hero-sub">Uncover the narrative that top schools actually remember — the one thread that makes every part of your application point the same way.</p>
          <div class="hero-cta">
            <a class="btn btn-solid btn-lg" href="#exercises">Start Now ${CC.icon('arrow-right')}</a>
          </div>
        </div>
      </section>

      <section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'The reality',
            title: 'Stats Get You to the Table. Your Story Gets You In.',
            titleHtml: 'Stats Get You to the Table. <em>Your Story Gets You In.</em>',
            lede: 'An admissions officer reads 30 to 40 applications a day. Strong grades and scores get you read — they do not get you remembered. What separates the file that gets in is whether it adds up to one person the reader can describe afterwards.',
            center: true,
          })}
          ${CC.ComparisonTable({ oldTitle: 'Most Students', newTitle: 'Admitted Students', rows: REALITY_ROWS })}
        </div>
      </section>

      <section class="section section--tint">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'The framework',
            title: '4 Pieces, 1 Story',
            titleHtml: '4 Pieces, <em>1 Story</em>',
            lede: 'Your application has four moving parts. They are only persuasive when they say the same thing.',
            center: true,
          })}
          ${CC.CardGrid(FRAMEWORK, { cols: 2 })}
        </div>
      </section>

      ${
        /* Headed "Real results" — so it stays hidden until there are real,
           permissioned stories to put in it. */
        cases
          ? `<section class="section section--white">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Real results',
            title: 'Threads That Got Them In',
            titleHtml: 'Threads That <em>Got Them In</em>',
            center: true,
          })}
          <div class="sw-case-grid">${cases}</div>
        </div>
      </section>`
          : ''
      }

      ${exercisesHtml()}

      ${CC.CTABand({
        title: 'You Found the Thread. Now Craft the Story.',
        text: 'Bring your answers to a free strategy session and we will turn the thread into a school list, an essay plan and a timeline.',
        buttons: [{ label: 'Book a Free Strategy Session', booking: true }],
      })}`;
  }

  /* ------------------------------------------------------------ hydrate */

  function hydrate(root) {
    root.querySelectorAll('[data-sw-field]').forEach((el) => {
      el.value = state[el.dataset.swField] || '';
    });
    root.querySelectorAll('[data-sw-only]').forEach((el) => {
      el.checked = !!state.onlyYou[Number(el.dataset.swOnly)];
    });

    const tbody = root.querySelector('[data-sw-activities]');
    if (tbody) {
      tbody.innerHTML = state.activities.map((_, i) => activityRow(i)).join('');
      tbody.querySelectorAll('[data-sw-act]').forEach((el) => {
        el.value = state.activities[Number(el.dataset.swAct)][el.dataset.swKey] || '';
      });
    }

    refresh(root);
  }

  function flagSaved() {
    const el = document.querySelector('[data-sw-saved]');
    if (!el) return;
    el.textContent = 'Saved to this browser';
    clearTimeout(el._t);
    el._t = setTimeout(() => (el.textContent = ''), 1600);
  }

  function refresh(root) {
    const { count, total, pct, complete } = completion();

    const bar = root.querySelector('[data-sw-bar]');
    const text = root.querySelector('[data-sw-progress]');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = `${count} of ${total} answered`;

    const threadText = root.querySelector('[data-sw-thread-text]');
    if (threadText) {
      const w = state.threadWhat.trim();
      const y = state.threadWhy.trim();
      const n = state.threadNext.trim();
      threadText.textContent =
        w || y || n
          ? `I am the student who ${w || '…'} because ${y || '…'} — and at university I want to ${n || '…'}.`
          : 'Fill in Step 3 and your thread appears here.';
    }

    const btn = root.querySelector('[data-sw-pdf]');
    const note = root.querySelector('[data-sw-pdf-note]');
    if (btn) btn.disabled = !complete;
    if (note) {
      note.textContent = complete
        ? 'All steps complete — your PDF is ready.'
        : `Fill in all five steps to unlock the PDF (${total - count} left).`;
    }
  }

  /* ------------------------------------------------------------ PDF */

  function loadJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload = () => (window.jspdf ? resolve(window.jspdf.jsPDF) : reject(new Error('jsPDF missing')));
      s.onerror = () => reject(new Error('Could not load the PDF library'));
      document.head.appendChild(s);
    });
  }

  function buildPdf(JsPDF) {
    const doc = new JsPDF({ unit: 'pt', format: 'a4' });
    const M = 56;
    const W = doc.internal.pageSize.getWidth() - M * 2;
    const BOTTOM = doc.internal.pageSize.getHeight() - M;
    let y = M;

    const room = (need) => {
      if (y + need > BOTTOM) {
        doc.addPage();
        y = M;
      }
    };

    const heading = (t) => {
      room(40);
      doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor(13, 115, 119);
      doc.text(t, M, y);
      y += 20;
    };

    const qa = (q, a) => {
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(45, 52, 54);
      const qLines = doc.splitTextToSize(q, W);
      room(qLines.length * 13 + 8);
      doc.text(qLines, M, y);
      y += qLines.length * 13 + 2;

      doc.setFont('helvetica', 'normal').setFontSize(11).setTextColor(99, 110, 114);
      const aLines = doc.splitTextToSize(String(a || '—').trim() || '—', W);
      room(aLines.length * 14 + 10);
      doc.text(aLines, M, y);
      y += aLines.length * 14 + 12;
    };

    doc.setFont('helvetica', 'bold').setFontSize(22).setTextColor(13, 115, 119);
    doc.text('Find Your Story', M, y);
    y += 26;
    doc.setFont('helvetica', 'normal').setFontSize(11).setTextColor(99, 110, 114);
    doc.text('College Crafters — Story Workbook', M, y);
    y += 16;
    doc.setFontSize(9);
    doc.text('Generated ' + new Date().toLocaleDateString(), M, y);
    y += 26;

    heading('1. Core Values');
    qa('Moment 1', state.moment1);
    qa('Moment 2', state.moment2);
    qa('Moment 3', state.moment3);
    qa('Why those mattered (one word each)', [state.why1, state.why2, state.why3].filter(Boolean).join(' · '));
    qa('The theme connecting them', state.theme);

    heading('2. Activity Audit');
    state.activities.forEach((a, i) => {
      if (!a.what && !a.did && !a.why) return;
      qa(`Activity ${i + 1}: ${a.what || '—'}`, `What I did: ${a.did || '—'}\nWhy it mattered: ${a.why || '—'}`);
    });
    qa('What keeps repeating', state.reflection);

    heading('3. Your Thread');
    qa(
      'One sentence',
      `I am the student who ${state.threadWhat} because ${state.threadWhy} — and at university I want to ${state.threadNext}.`
    );
    const checks = ONLY_YOU.filter((_, i) => state.onlyYou[i]);
    qa('“Only You” test passed', checks.length ? checks.join('\n') : 'Not yet confirmed');

    heading('4. Alignment Map');
    qa('Transcript', state.alignTranscript);
    qa('Activities', state.alignActivities);
    qa('Essays', state.alignEssays);
    qa('Recommendations', state.alignRecs);

    heading('5. 30-Second Story');
    qa('Spoken version', state.story30);

    doc.save('find-your-story-workbook.pdf');
  }

  /* ------------------------------------------------------------ wiring */

  function wire(root) {
    /* text inputs + textareas */
    root.addEventListener('input', (event) => {
      const t = event.target;

      if (t.dataset.swField) {
        state[t.dataset.swField] = t.value;
        save();
        refresh(root);
        return;
      }

      if (t.dataset.swAct != null) {
        const i = Number(t.dataset.swAct);
        if (!state.activities[i]) state.activities[i] = { what: '', did: '', why: '' };
        state.activities[i][t.dataset.swKey] = t.value;
        save();
        refresh(root);
      }
    });

    /* checkboxes */
    root.addEventListener('change', (event) => {
      const t = event.target;
      if (t.dataset.swOnly == null) return;
      state.onlyYou[Number(t.dataset.swOnly)] = t.checked;
      save();
      refresh(root);
    });

    /* add activity row — append rather than re-render so focus is kept */
    const addBtn = root.querySelector('[data-sw-add-activity]');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        state.activities.push({ what: '', did: '', why: '' });
        const tbody = root.querySelector('[data-sw-activities]');
        const i = state.activities.length - 1;
        tbody.insertAdjacentHTML('beforeend', activityRow(i));
        const first = tbody.querySelector(`[data-sw-activity="${i}"] input`);
        if (first) first.focus();
        save();
      });
    }

    /* sticky chips follow the steps */
    const chips = Array.from(root.querySelectorAll('[data-sw-chip]'));
    if (chips.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const id = e.target.id.replace('step-', '');
            chips.forEach((c) => c.classList.toggle('is-active', c.dataset.swChip === id));
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      STEPS.forEach((s) => {
        const el = document.getElementById('step-' + s.id);
        if (el) io.observe(el);
      });
    }

    /* PDF */
    const pdfBtn = root.querySelector('[data-sw-pdf]');
    const note = root.querySelector('[data-sw-pdf-note]');
    if (pdfBtn) {
      pdfBtn.addEventListener('click', async () => {
        if (pdfBtn.disabled) return;
        const label = pdfBtn.innerHTML;
        pdfBtn.disabled = true;
        pdfBtn.textContent = 'Building PDF…';
        try {
          const JsPDF = await loadJsPDF();
          buildPdf(JsPDF);
          pdfBtn.innerHTML = label;
          refresh(root);
        } catch (err) {
          pdfBtn.innerHTML = label;
          refresh(root);
          if (note) note.textContent = 'Could not load the PDF library — check your connection and try again.';
        }
      });
    }
  }

  /* ------------------------------------------------------------ mount */

  (CC.pageModules = CC.pageModules || {})['resources/story-workbook'] = function () {
    const root = document.querySelector('[data-part2]');
    if (!root) return;

    load();
    render(root);
    hydrate(root);
    wire(root);
    CC.initComponents(root);
  };
})(window, document);
