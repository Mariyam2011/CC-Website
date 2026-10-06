/* ==========================================================================
   SITE BOOTSTRAP
   --------------------------------------------------------------------------
   Mounts the shared layout, renders the page from CC_PAGES, then activates
   the interactive components. Pages that write their own <main> (the home
   page, and the Part 2 pages) are left untouched — this only fills
   [data-banner] and [data-page-content] when a registry entry exists.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;
  const C = () => window.CC_CONTENT || {};

  /* ---------- small helpers ---------- */

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function fmtDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return esc(iso);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  function newestFirst(list) {
    return (list || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
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

  function avatar(person, i) {
    if (person.photo) {
      return `<img class="pcard-avatar" src="${esc(CC.url(person.photo))}" alt="" loading="lazy">`;
    }
    const tone = i % 3 === 1 ? ' pcard-avatar--peach' : '';
    return `<span class="pcard-avatar${tone}" aria-hidden="true">${esc(initials(person.name))}</span>`;
  }

  function linkOut(url) {
    if (!url || url === '#') return '';
    const external = /^https?:/.test(url);
    return ` href="${esc(url)}"${external ? ' target="_blank" rel="noopener"' : ''}`;
  }

  /* ---------- process track ---------- */

  function processTrack(id) {
    const track = ((C().process || {}).tracks || []).find((t) => t.id === id);
    if (!track) return CC.Placeholder('Process track "' + id + '" not found in content.js.');

    const head = `
      ${track.title ? `<h2 class="section-title">${esc(track.title)}</h2>` : ''}
      ${track.intro ? `<p class="lede track-lede">${esc(track.intro)}</p>` : ''}`;

    const spotlight = track.spotlight
      ? `<div class="spotlight-card"><h4>${esc(track.spotlight.title || 'Spotlight')}</h4><p>${esc(
          track.spotlight.text || ''
        )}</p></div>`
      : '';

    /* A track declares how it should be drawn. `map` is for the country
       tracks, whose parts (academics, testing, essays, references) are
       assessed together — numbering them would invent an order that does
       not exist. `flow` is for tracks that really are sequential. */
    if (track.mode === 'map') {
      return (
        head +
        CC.RequirementMap({
          items: track.steps || [],
          outcome: track.outcome,
          note: track.note,
        }) +
        spotlight
      );
    }

    if (track.mode === 'flow') {
      return head + CC.ProcessFlow(track.steps || []) + spotlight;
    }

    const steps = (track.steps || [])
      .map(
        (s, i) => `
      <li class="tstep">
        <div class="tstep-num">${i + 1}</div>
        <div class="tstep-body">
          ${s.kicker ? `<p class="tstep-kicker">${esc(s.kicker)}</p>` : ''}
          <h3 class="tstep-title">${esc(s.title)}</h3>
          ${s.summary ? `<p class="tstep-summary">${esc(s.summary)}</p>` : ''}
          ${
            (s.services || []).length
              ? `<ul class="tstep-services">${s.services
                  .map((sv) => `<li><strong>${esc(sv.name)}</strong><span>${esc(sv.text)}</span></li>`)
                  .join('')}</ul>`
              : ''
          }
          ${s.outcome ? `<p class="tstep-outcome">${CC.icon('check')}<span>${esc(s.outcome)}</span></p>` : ''}
        </div>
      </li>`
      )
      .join('');

    /* Legacy rendering, for any track that declares no mode. */
    return `${head}<ol class="tsteps">${steps}</ol>${spotlight}`;
  }

  /* ---------- news / updates / journal / testimonials ---------- */

  function newsList() {
    const items = newestFirst(C().news);
    if (!items.length) return CC.Placeholder('No news items in content.js yet.');

    return `<div class="ncard-grid">${items
      .map(
        (n) => `
      <article class="ncard${n.featured ? ' ncard--featured' : ''}">
        <div class="ncard-top">
          ${n.tag ? `<span class="ncard-tag">${esc(n.tag)}</span>` : ''}
          <time class="ncard-date">${fmtDate(n.date)}</time>
        </div>
        <h3 class="ncard-title">${esc(n.title)}</h3>
        ${n.excerpt ? `<p class="ncard-text">${esc(n.excerpt)}</p>` : ''}
        ${
          n.highlight
            ? `<p class="ncard-highlight"><strong>${esc(n.highlight.value)}</strong><span>${esc(
                n.highlight.label
              )}</span></p>`
            : ''
        }
        ${
          n.url && n.url !== '#'
            ? `<a class="ncard-link"${linkOut(n.url)}>Read more ${CC.icon('arrow-right')}</a>`
            : ''
        }
      </article>`
      )
      .join('')}</div>`;
  }

  function updatesList() {
    const items = newestFirst(C().updates);
    if (!items.length) return CC.Placeholder('No updates in content.js yet.');

    return `<ul class="ulist">${items
      .map(
        (u) => `
      <li class="ulist-item">
        <div class="ulist-meta">
          <time>${fmtDate(u.date)}</time>
          ${u.region ? `<span class="ulist-region">${esc(u.region)}</span>` : ''}
        </div>
        <div class="ulist-body">
          <h3>${esc(u.title)}</h3>
          ${u.summary ? `<p>${esc(u.summary)}</p>` : ''}
        </div>
      </li>`
      )
      .join('')}</ul>`;
  }

  function deadlineList() {
    const items = C().deadlines || [];
    if (!items.length) return CC.Placeholder('No deadlines in content.js yet.');

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    /* `year` pins an exact date that drops off once passed; without it the
       date recurs and rolls over to next year. */
    const withDays = items
      .map((d) => {
        let when = new Date(d.year || today.getFullYear(), d.month - 1, d.day);
        if (!d.year && when < today) when = new Date(today.getFullYear() + 1, d.month - 1, d.day);
        return { ...d, when, days: Math.round((when - today) / 86400000) };
      })
      .filter((d) => d.days >= 0);

    if (!withDays.length) return CC.Placeholder('No upcoming deadlines yet. Next cycle’s dates are on the way.');

    withDays.sort((a, b) => a.days - b.days);

    return `<ul class="dlist">${withDays
      .map(
        (d) => `
      <li class="dlist-item">
        <div class="dlist-date">
          <span class="dlist-month">${MONTHS[d.when.getMonth()]}</span>
          <span class="dlist-day">${d.when.getDate()}</span>
        </div>
        <div class="dlist-body">
          <h3>${esc(d.label)}</h3>
          ${d.region ? `<span class="dlist-region">${esc(d.region)}</span>` : ''}
        </div>
        <span class="dlist-count">${d.days === 0 ? 'Today' : d.days + ' days'}</span>
      </li>`
      )
      .join('')}</ul>`;
  }

  /* ---------- testimonials: story feed ----------
     A filterable feed of compact rows — portrait left, story right — with
     role tabs and a load-more. Every row is identical; there is no featured
     variant. Cards are rendered once and shown or hidden on filter, so
     filtering never re-runs the markup or loses the load-more position. */

  const STORY_PAGE = 6;

  function storyRole(t) {
    if (t.role) return t.role;
    /* Older entries carry only `detail` ("Student · Class of 2025"). */
    const first = String(t.detail || '').split(/[\s\u00b7]/)[0];
    return first === 'Parent' || first === 'Student' ? first : '';
  }

  function storyCard(t, i) {
    const role = storyRole(t);
    const accent = t.accent ? ` style="--story-accent:${esc(t.accent)}"` : '';

    const badge = t.result
      ? `<p class="story-badge">
           <span class="story-mark" aria-hidden="true">${CC.icon('award')}</span>
           <span class="story-badge-text">
             <span class="story-outcome">${esc(t.result)}</span>
             ${t.country ? `<span class="story-place">${esc(t.country)}</span>` : ''}
           </span>
         </p>`
      : '';

    /* The headline is the story; the quote is the evidence. Where an entry
       has no headline the quote carries the card on its own. */
    const headline = t.headline ? `<h3 class="story-headline">${esc(t.headline)}</h3>` : '';

    /* The portrait leads the card. Until a real photo exists the placeholder
       shows the student's initials on a wash of the card accent, so an empty
       `photo` reads as a deliberate design rather than a missing asset. The
       <img> sits on top of it; wireStories drops it back to the placeholder
       if the file fails to load, so a wrong path is never a broken image.
       alt is empty because the byline names the person directly below. */
    const photo = `
      <div class="story-photo">
        <span class="story-photo-ph" aria-hidden="true">${esc(initials(t.name))}</span>
        ${
          t.photo
            ? `<img class="story-photo-img" src="${esc(CC.url(t.photo))}" alt="" loading="lazy" decoding="async" />`
            : ''
        }
      </div>`;

    return `
      <article class="story" data-story data-role="${esc(role)}"${accent}>
        ${photo}
        <div class="story-body">
          ${badge}
          ${headline}
          <blockquote class="story-quote">${esc(t.quote)}</blockquote>
          <footer class="story-by">
            <p class="story-by-text">
              <span class="story-by-name">${esc(t.name || '')}</span>
              ${t.detail ? `<span class="story-by-meta">${esc(t.detail)}</span>` : ''}
            </p>
          </footer>
        </div>
      </article>`;
  }

  function testimonialGrid() {
    const items = C().testimonials || [];
    if (!items.length) return CC.Placeholder('No testimonials in content.js yet.');

    const count = (role) => items.filter((t) => !role || storyRole(t) === role).length;

    /* `always` keeps a tab visible with a zero count, so Parent Reviews has
       a home before the first review is added. */
    const tab = (key, label, always) => {
      const n = count(key === 'all' ? '' : key);
      if (!n && !always) return '';
      return `<button class="filter" type="button" role="tab" aria-pressed="${key === 'all'}"
                data-story-filter="${esc(key)}">${esc(label)} <span class="n">${n}</span></button>`;
    };

    const tabs = [tab('all', 'All stories'), tab('Student', 'Students'), tab('Parent', 'Parent Reviews', true)]
      .filter(Boolean)
      .join('');

    const cards = items.map((t, i) => storyCard(t, i)).join('');

    return `
      <div class="stories" data-stories>
        ${tabs ? `<div class="pill-tabs" role="tablist" aria-label="Filter stories">${tabs}</div>` : ''}
        <div class="story-grid" data-story-grid>${cards}</div>
        <p class="story-empty" data-story-empty hidden>No stories in this category yet.</p>
        <p class="story-more" data-story-more-wrap hidden>
          <button class="btn btn-ghost" type="button" data-story-more>Load more stories</button>
        </p>
        <p class="visually-hidden" role="status" data-story-status></p>
      </div>`;
  }

  function wireStories(scope) {
    (scope || document).querySelectorAll('[data-stories]:not([data-wired])').forEach((el) => {
      el.dataset.wired = '1';

      const cards = Array.from(el.querySelectorAll('[data-story]'));
      const tabs = el.querySelector('.pill-tabs');
      const empty = el.querySelector('[data-story-empty]');
      const moreWrap = el.querySelector('[data-story-more-wrap]');
      const more = el.querySelector('[data-story-more]');
      const status = el.querySelector('[data-story-status]');

      /* A portrait whose file is missing falls back to the initials panel
         underneath it rather than showing a broken image. */
      el.querySelectorAll('.story-photo-img').forEach((img) => {
        const drop = () => img.remove();
        if (img.complete && !img.naturalWidth) drop();
        else img.addEventListener('error', drop);
      });

      let filter = 'all';
      let shown = STORY_PAGE;

      const matching = () => cards.filter((c) => filter === 'all' || c.dataset.role === filter);

      const draw = () => {
        const list = matching();
        cards.forEach((c) => {
          c.hidden = true;
        });
        list.slice(0, shown).forEach((c) => {
          c.hidden = false;
        });

        if (empty) {
          empty.hidden = list.length > 0;
          empty.textContent =
            filter === 'Parent' ? 'Parent reviews are coming soon.' : 'No stories in this category yet.';
        }
        if (moreWrap) moreWrap.hidden = list.length <= shown;
        if (status) {
          const n = Math.min(shown, list.length);
          status.textContent = `Showing ${n} of ${list.length} ${list.length === 1 ? 'story' : 'stories'}.`;
        }
      };

      if (tabs) {
        tabs.addEventListener('click', (event) => {
          const btn = event.target.closest('[data-story-filter]');
          if (!btn) return;
          filter = btn.dataset.storyFilter;
          shown = STORY_PAGE;
          tabs
            .querySelectorAll('[data-story-filter]')
            .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          draw();
        });
      }

      if (more) {
        more.addEventListener('click', () => {
          shown += STORY_PAGE;
          draw();
          /* Send focus to the first newly revealed card so a keyboard reader
             lands on the new content rather than back at the top. */
          const next = matching()[shown - STORY_PAGE];
          if (next) {
            next.setAttribute('tabindex', '-1');
            next.focus();
          }
        });
      }

      draw();
    });
  }

  /* Journal entries are short notes: the excerpt is the whole thing, so a
     card is not a link and carries no read time — a "4 min read" badge on a
     one-sentence note only promises a page that does not exist.

     Give an entry a real `url` and it becomes a link to the longer piece,
     with `readTime` shown beside it. Both appear only when there is
     genuinely something to open. linkOut() already treats '#' as no link. */
  function journalList() {
    const items = newestFirst(C().journal);
    if (!items.length) return CC.Placeholder('No journal entries in content.js yet.');

    return `<div class="jcard-grid">${items
      .map((j) => {
        const link = linkOut(j.url);
        const meta = [
          j.author ? `<span>${esc(j.author)}</span>` : '',
          link && j.readTime ? `<span>${esc(j.readTime)} min read</span>` : '',
        ]
          .filter(Boolean)
          .join('');

        const body = `
        <div class="jcard-top">
          ${j.topic ? `<span class="jcard-topic">${esc(j.topic)}</span>` : ''}
          <time>${fmtDate(j.date)}</time>
        </div>
        <h3 class="jcard-title">${esc(j.title)}</h3>
        ${j.excerpt ? `<p class="jcard-text">${esc(j.excerpt)}</p>` : ''}
        ${meta ? `<p class="jcard-meta">${meta}</p>` : ''}
        ${link ? `<p class="jcard-more">Read the full note ${CC.icon('arrow-right')}</p>` : ''}`;

        return link ? `<a class="jcard jcard--link"${link}>${body}</a>` : `<article class="jcard">${body}</article>`;
      })
      .join('')}</div>`;
  }

  /* ---------- college seekers network ---------- */

  /* `key` picks which network to draw: `collegeSeekers` (undergraduate) or
     `collegeSeekersGraduate`. Both objects have the same shape, so the
     Graduate page renders through exactly this component and stays in step
     with the Undergraduate one. */
  function seekersNetwork(key) {
    const source = key || 'collegeSeekers';
    const s = C()[source] || {};
    const regions = s.regions || [];
    if (!regions.length) return CC.Placeholder('No College Seekers regions in content.js yet.');

    const tabs = regions
      .map(
        (r, i) =>
          `<button class="filter" type="button" role="tab" aria-pressed="${i === 0}" data-region="${i}">${esc(
            r.label
          )}</button>`
      )
      .join('');

    return `
      <div class="seekers-network" data-seekers="${esc(source)}">
        <div class="pill-tabs" role="tablist" aria-label="Choose a region">${tabs}</div>
        <div class="region-panel" role="tabpanel" data-region-panel></div>
        ${s.disclaimer ? `<p class="seekers-disclaimer">${esc(s.disclaimer)}</p>` : ''}
      </div>`;
  }

  function regionBody(region) {
    if ((region.rows || []).length) {
      return `
      <div class="uni-table-wrap">
        <table class="uni-table">
          <thead><tr>${(region.columns || []).map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${region.rows
            .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`)
            .join('')}</tbody>
        </table>
      </div>`;
    }
    if ((region.list || []).length) {
      return `<ul class="uni-list">${region.list.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`;
    }
    return '';
  }

  function wireSeekers(scope) {
    (scope || document).querySelectorAll('[data-seekers]:not([data-wired])').forEach((el) => {
      el.dataset.wired = '1';
      const regions = (C()[el.dataset.seekers || 'collegeSeekers'] || {}).regions || [];
      const panel = el.querySelector('[data-region-panel]');
      const tabs = el.querySelector('.pill-tabs');
      let active = 0;

      const draw = () => {
        const r = regions[active];
        if (!r || !panel) return;
        panel.innerHTML = `
          <h3 class="region-heading">${esc(r.heading || r.label)}</h3>
          ${r.intro ? `<p class="region-lede">${esc(r.intro)}</p>` : ''}
          ${regionBody(r)}
          ${r.note ? `<p class="region-note">${esc(r.note)}</p>` : ''}`;
      };

      if (tabs) {
        tabs.addEventListener('click', (event) => {
          const btn = event.target.closest('[data-region]');
          if (!btn) return;
          active = Number(btn.dataset.region);
          tabs
            .querySelectorAll('[data-region]')
            .forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.region) === active)));
          draw();
        });
      }

      draw();
    });
  }

  /* ---------- data block dispatch ---------- */

  function renderData(source) {
    if (source === 'team') return CC.TeamMemberGrid(C().team);
    if (source === 'board') return CC.TeamMemberGrid(C().board);
    if (source === 'news') return newsList();
    if (source === 'updates') return updatesList();
    if (source === 'deadlines') return deadlineList();
    if (source === 'testimonials') return testimonialGrid();
    if (source === 'journal') return journalList();
    if (source === 'seekers') return seekersNetwork();
    if (source === 'seekers-graduate') return seekersNetwork('collegeSeekersGraduate');
    if (source.indexOf('process:') === 0) return processTrack(source.split(':')[1]);
    return CC.Placeholder('Unknown data source: ' + source);
  }

  /* Existing card data uses { icon, kicker, title, text, href } — the shape
     CardGrid has always taken. Translate it to EditorialCard's vocabulary so
     a block can switch over by adding one flag, with no content rewritten. */
  function toEditorial(c) {
    return {
      icon: c.icon,
      eyebrow: c.kicker,
      title: c.title,
      description: c.text,
      image: c.image,
      href: c.href,
      newTab: c.newTab,
      variant: c.variant,
      imagePosition: c.imagePosition,
    };
  }

  /* ---------- tab cards ----------
     Cards that behave as tabs: choosing one reveals its detail panel below
     the grid. Built for Graduate, where Masters and PhD each need real
     depth but do not warrant separate pages.

     The cards reuse the .ecard classes so they look identical to an
     editorial card grid, but the inner element is a <button> rather than an
     <a>, because it reveals content on the page instead of navigating. */

  let tabCardSeq = 0;

  function tabCards(block) {
    const items = (block.items || []).filter(Boolean);
    if (!items.length) return '';

    const uid = 'tc' + (tabCardSeq += 1);
    const cols = items.length > 4 ? 4 : items.length;

    const tabs = items
      .map((it, i) => {
        const on = i === 0;
        return `
        <article class="ecard tabcard" style="--i:${i}">
          <button class="ecard-inner tabcard-btn" type="button" role="tab"
                  id="${uid}-tab-${i}" aria-controls="${uid}-panel-${i}"
                  aria-selected="${on}" tabindex="${on ? '0' : '-1'}">
            <span class="ecard-body">
              ${it.icon ? `<span class="ecard-icon">${CC.icon(it.icon)}</span>` : ''}
              ${it.kicker ? `<span class="ecard-eyebrow">${esc(it.kicker)}</span>` : ''}
              <span class="ecard-title">${esc(it.title || '')}</span>
              ${it.text ? `<span class="ecard-desc">${esc(it.text)}</span>` : ''}
              <span class="tabcard-cue">
                <span class="tabcard-cue-on">${esc(it.cueOn || 'Showing details')}</span>
                <span class="tabcard-cue-off">${esc(it.cue || 'See details')}</span>
                ${CC.icon('chevron-down', 'tabcard-chev')}
              </span>
            </span>
          </button>
        </article>`;
      })
      .join('');

    const panels = items
      .map((it, i) => {
        const p = it.panel || {};
        const groups = (p.groups || [])
          .map(
            (g) => `
            <div class="tabpanel-group">
              <h4 class="tabpanel-group-title">${esc(g.title || '')}</h4>
              <ul class="plist">${(g.items || [])
                .map((x) => `<li>${CC.icon('check')}<span>${esc(x)}</span></li>`)
                .join('')}</ul>
            </div>`
          )
          .join('');

        return `
        <div class="tabpanel" id="${uid}-panel-${i}" role="tabpanel"
             aria-labelledby="${uid}-tab-${i}" tabindex="0"${i === 0 ? '' : ' hidden'}>
          ${p.heading ? `<h3 class="tabpanel-title">${esc(p.heading)}</h3>` : ''}
          ${p.lede ? `<p class="tabpanel-lede">${esc(p.lede)}</p>` : ''}
          ${groups ? `<div class="tabpanel-groups">${groups}</div>` : ''}
          ${p.note ? `<p class="tabpanel-note">${CC.icon('sparkle')}<span>${esc(p.note)}</span></p>` : ''}
        </div>`;
      })
      .join('');

    return `
      <div class="tabcards" data-tabcards>
        <div class="ecard-grid ecard-grid--${cols} tabcards-tabs" role="tablist"
             aria-label="${esc(block.tablistLabel || block.title || 'Choose a programme')}">${tabs}</div>
        <div class="tabcards-panels">${panels}</div>
      </div>`;
  }

  /* Standard APG tabs: one panel visible, roving tabindex so the group is a
     single tab stop, and arrow keys to move between cards. */
  function wireTabCards(scope) {
    (scope || document).querySelectorAll('[data-tabcards]:not([data-wired])').forEach((el) => {
      el.dataset.wired = '1';

      const tabs = Array.from(el.querySelectorAll('[role="tab"]'));
      const panels = Array.from(el.querySelectorAll('[role="tabpanel"]'));
      if (tabs.length < 2) return;

      const select = (index, focus) => {
        tabs.forEach((t, i) => {
          const on = i === index;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          if (panels[i]) panels[i].hidden = !on;
        });
        if (focus && tabs[index]) tabs[index].focus();
      };

      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(i, false));
        tab.addEventListener('keydown', (event) => {
          let next = null;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (i + 1) % tabs.length;
          else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = tabs.length - 1;
          else return;
          event.preventDefault();
          select(next, true);
        });
      });
    });
  }

  /* ---------- block dispatch ---------- */

  function renderBlock(block) {
    const head = (title, lede) =>
      title || lede ? CC.SectionHead({ title: title, lede: lede }) : '';

    switch (block.type) {
      case 'text':
        return `<div class="prose">${head(block.title)}${(block.body || [])
          .map((p) => `<p>${esc(p)}</p>`)
          .join('')}</div>`;

      /* `editorial: true` opts a block into the EditorialCard system. It is
         opt-in rather than the default because some pages (Team) are frozen
         and must keep rendering the original CardGrid untouched.
         The page must also link css/editorial.css. */
      case 'cards':
        return (
          head(block.title, block.lede) +
          (block.editorial
            ? CC.EditorialCardGrid(mapHrefs(block.items).map(toEditorial), {
                cols: block.cols,
                rotations: block.rotations,
              })
            : CC.CardGrid(mapHrefs(block.items), { cols: block.cols }))
        );

      case 'list':
        return (
          head(block.title) +
          `<ul class="plist">${(block.items || [])
            .map((i) => `<li>${CC.icon('check')}<span>${esc(i)}</span></li>`)
            .join('')}</ul>`
        );

      case 'steps':
        return head(block.title) + CC.WorkflowSteps(block.items);

      case 'stats':
        return CC.StatCounter(block.items);

      case 'comparison':
        return (
          head(block.title) +
          CC.ComparisonTable({ oldTitle: block.oldTitle, newTitle: block.newTitle, rows: block.rows })
        );

      case 'tabcards':
        return head(block.title, block.lede) + tabCards(block);

      case 'personas':
        return head(block.title, block.lede) + CC.PersonaCards(mapHrefs(block.items, 'ctaHref'));

      case 'accordion':
        return head(block.title) + CC.Accordion(block.items, { openFirst: true });

      case 'data':
        return renderData(block.source);

      case 'placeholder':
        return CC.Placeholder(block.text);

      case 'cta':
        return CC.CTABand({ title: block.title, text: block.text, buttons: mapHrefs(block.buttons) });

      default:
        return '';
    }
  }

  /* Resolve root-relative hrefs inside block data. */
  function mapHrefs(items, key) {
    const field = key || 'href';
    return (items || []).map((it) => {
      if (!it || !it[field]) return it;
      const copy = Object.assign({}, it);
      copy[field] = CC.url(it[field]);
      return copy;
    });
  }

  /* ---------- page render ---------- */

  CC.renderPage = function () {
    const key = document.body.getAttribute('data-page') || '';
    const page = (window.CC_PAGES || {})[key];
    if (!page) return;

    const bannerEl = document.querySelector('[data-banner]');
    if (bannerEl) {
      bannerEl.outerHTML = CC.PageBanner({
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        trail: CC.trailFor(key),
      });
    }

    const contentEl = document.querySelector('[data-page-content]');
    if (!contentEl) return;

    if (page.stub) {
      contentEl.innerHTML = `
        <div class="wrap">
          <div class="stub-card">
            <span class="stub-icon">${CC.icon('sparkle')}</span>
            <h2>Coming in Part 2</h2>
            <p>This page is routed and linked from the navigation. Its full content is built in Part 2 of the
               project, using the same components as the rest of the site.</p>
            <a class="btn btn-ghost" href="${esc(CC.url('index.html'))}">Back to home ${CC.icon('arrow-right')}</a>
          </div>
        </div>`;
      return;
    }

    /* Surface rhythm is assigned HERE, in JS, rather than by a CSS
       :nth-of-type rule. CSS counts <section> siblings, so a CTA band
       sitting mid-page silently flipped the shading of everything below it,
       and pages with different block counts ended up with different rhythms.
       Counting only real content blocks makes the alternation deliberate —
       which is also what the design rules in the README ask for.
       Any block can override with `surface: 'white' | 'tint' | 'warm'`. */
    let contentIndex = -1;

    const blocks = (page.blocks || [])
      .map((b) => {
        if (b.type === 'cta') return renderBlock(b);

        const layout = b.layout || 'default';
        contentIndex += 1;
        const surface = b.surface || (contentIndex % 2 === 1 ? 'tint' : 'white');

        /* Split layout puts the section head in its own column beside the
           content. renderBlock draws the head itself, so it is handed a copy
           with title/lede removed and the head is placed separately. */
        if (layout === 'split') {
          const body = renderBlock(Object.assign({}, b, { title: null, lede: null }));
          if (!body) return '';
          return `<section class="page-section page-section--${surface} page-section--split">
              <div class="wrap section-split">
                <div class="section-split-head">${CC.SectionHead({
                  eyebrow: b.eyebrow,
                  title: b.title,
                  lede: b.lede,
                })}</div>
                <div class="section-split-body">${body}</div>
              </div>
            </section>`;
        }

        const html = renderBlock(b);
        if (!html) return '';
        return `<section class="page-section page-section--${surface}${
          layout !== 'default' ? ' page-section--' + esc(layout) : ''
        }"><div class="wrap">${html}</div></section>`;
      })
      .join('');

    contentEl.innerHTML = blocks;
  };

  /* ---------- boot ---------- */

  function boot() {
    CC.mountLayout();
    CC.renderPage();
    if (typeof CC.renderHome === 'function') CC.renderHome();

    /* Content-heavy pages register a module against their data-page key
       (see js/page-*.js). It runs after renderPage so it can build on or
       replace whatever the registry produced. */
    const custom = (CC.pageModules || {})[document.body.getAttribute('data-page') || ''];
    if (typeof custom === 'function') custom();

    CC.initComponents();
    wireSeekers();
    wireStories();
    wireTabCards();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);
