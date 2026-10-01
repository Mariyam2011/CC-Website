/* ==========================================================================
   CC homepage — renders content from js/content.js and wires up interactions
   ========================================================================== */

(function () {
  'use strict';

  const C = window.CC_CONTENT || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  /* ---------- Helpers ---------- */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

  const icon = (name, cls = 'i') =>
    `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  const initials = (name = '') =>
    name
      .replace(/[^\p{L}\s]/gu, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();

  const DAY_MS = 86400000;
  const parseDate = (iso) => {
    const [y, m, d] = String(iso).split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };
  const today = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  };
  const daysBetween = (from, to) => Math.round((to - from) / DAY_MS);
  const formatDate = (date, options) => date.toLocaleDateString('en-US', options);
  const newestFirst = (list = []) => [...list].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const isExternal = (url) => /^https?:\/\//i.test(url || '');
  const linkAttrs = (url) =>
    `href="${esc(url || '#')}"${isExternal(url) ? ' target="_blank" rel="noopener"' : ''}`;

  const slot = (name) => $(`[data-render="${name}"]`);
  const fill = (name, html) => {
    const el = slot(name);
    if (el) el.innerHTML = html;
    return el;
  };

  const avatar = (person, variant = '') =>
    person.photo
      ? `<span class="avatar ${variant}"><img src="${esc(person.photo)}" alt="" loading="lazy"></span>`
      : `<span class="avatar ${variant}" aria-hidden="true">${esc(initials(person.name))}</span>`;

  const replayAnimation = (el, cls = 'is-entering') => {
    el.classList.remove(cls);
    void el.offsetWidth; // restart CSS animation
    el.classList.add(cls);
  };

  /* ---------- Booking dropdowns ---------- */

  function initBooking() {
    const options = (C.site && C.site.booking) || [];
    const groups = $$('[data-booking]');

    groups.forEach((group) => {
      $('[data-booking-menu]', group).innerHTML = options
        .map(
          (opt) =>
            `<a ${linkAttrs(opt.url)}><span>${esc(opt.label)}</span>${opt.hint ? `<small>${esc(opt.hint)}</small>` : ''}</a>`
        )
        .join('');
    });

    const setOpen = (group, open) => {
      $('[data-booking-toggle]', group).setAttribute('aria-expanded', String(open));
      $('[data-booking-menu]', group).hidden = !open;
      group.classList.toggle('is-open', open);
    };

    groups.forEach((group) => {
      $('[data-booking-toggle]', group).addEventListener('click', () => {
        const willOpen = !group.classList.contains('is-open');
        groups.forEach((g) => setOpen(g, false));
        setOpen(group, willOpen);
      });
    });

    document.addEventListener('click', (event) => {
      const inside = event.target.closest('[data-booking]');
      groups.forEach((g) => g !== inside && setOpen(g, false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const open = groups.find((g) => g.classList.contains('is-open'));
      if (open) {
        setOpen(open, false);
        $('[data-booking-toggle]', open).focus();
      }
    });
  }

  /* ---------- Header: hide on scroll, mobile menu, active section ---------- */

  function initHeader() {
    const header = $('#siteHeader');
    const nav = $('#primaryNav');
    const toggle = $('.menu-toggle');
    if (!header || !nav || !toggle) return;

    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const busy = nav.classList.contains('is-open') || $('.is-open[data-booking]', header);
      header.classList.toggle('is-scrolled', y > 12);
      // Keep header always visible (Apple-style sticky header)
      // Removed: if (!busy && y > 320 && y > lastY + 4) header.classList.add('is-hidden');
      // Removed: else if (y < lastY - 4 || y <= 320) header.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(onScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
    onScroll();

    const setMenu = (open) => {
      nav.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (event) => event.target.closest('a') && setMenu(false));
    document.addEventListener('click', (event) => !header.contains(event.target) && setMenu(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    if (!('IntersectionObserver' in window)) return;
    const links = $$('a[href^="#"]', nav);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('is-active', a.hash === `#${entry.target.id}`));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach((a) => {
      const target = document.getElementById(a.hash.slice(1));
      if (target) spy.observe(target);
    });
  }

  /* ---------- Board & team ---------- */

  function renderTeam() {
    fill(
      'board',
      (C.board || [])
        .map(
          (p, i) => `
        <article class="person reveal reveal-d${i % 4}">
          <img class="person-mark" src="assets/cc-mark.svg" alt="" aria-hidden="true">
          <div class="person-top">
            ${avatar(p)}
            <div>
              <h4 class="person-name">${esc(p.name)}</h4>
              <p class="person-role">${esc(p.role)}</p>
            </div>
          </div>
          <p class="person-bio">${esc(p.bio)}</p>
          ${p.focus && p.focus.length ? `<ul class="chips">${p.focus.map((f) => `<li class="chip">${esc(f)}</li>`).join('')}</ul>` : ''}
          ${p.linkedin ? `<a class="person-link" ${linkAttrs(p.linkedin)}>${icon('linkedin')}LinkedIn<span class="visually-hidden"> profile of ${esc(p.name)}</span></a>` : ''}
        </article>`
        )
        .join('')
    );

    fill(
      'team',
      (C.team || [])
        .map(
          (p, i) => `
        <article class="person reveal reveal-d${i % 4}">
          <img class="person-mark" src="assets/cc-mark.svg" alt="" aria-hidden="true">
          <div class="person-top">
            ${avatar(p, i % 2 ? 'avatar--peach' : '')}
            <div>
              <h4 class="person-name">${esc(p.name)}</h4>
              ${p.credential ? `<p class="person-credential">${esc(p.credential)}</p>` : ''}
              <p class="person-role">${esc(p.role)}</p>
            </div>
          </div>
          ${p.bio ? `<p class="person-bio">${esc(p.bio)}</p>` : ''}
        </article>`
        )
        .join('')
    );
  }

  /* ---------- 5-step process (country tracks + tabs) ---------- */

  function renderProcess() {
    const tracks = (C.process && C.process.tracks) || [];
    const switchEl = slot('track-switch');
    const introEl = slot('track-intro');
    const spotlightEl = slot('track-spotlight');
    const list = slot('process-steps');
    const panel = slot('process-panel');
    const trackFill = $('.steps-track-fill');
    if (!tracks.length || !list || !panel) return;

    const pad = (n) => String(n).padStart(2, '0');

    let trackIndex = 0;
    let steps = [];
    let tabs = [];
    let current = -1;

    const renderSwitch = () => {
      if (!switchEl) return;
      if (tracks.length < 2) {
        switchEl.hidden = true;
        return;
      }
      switchEl.hidden = false;
      switchEl.innerHTML = tracks
        .map(
          (t, i) => `
        <button class="filter" type="button" role="tab" aria-pressed="${i === trackIndex}" data-track="${i}">
          ${esc(t.label)}
        </button>`
        )
        .join('');
    };

    const renderIntro = () => {
      if (!introEl) return;
      const t = tracks[trackIndex];
      if (!t.intro) {
        introEl.hidden = true;
        introEl.innerHTML = '';
        return;
      }
      introEl.hidden = false;
      introEl.innerHTML = `
        <h3 class="track-intro-title">${esc(t.title || t.label)}</h3>
        <p class="track-intro-text">${esc(t.intro)}</p>`;
    };

    const renderSpotlight = () => {
      if (!spotlightEl) return;
      const sp = tracks[trackIndex].spotlight;
      if (!sp) {
        spotlightEl.hidden = true;
        spotlightEl.innerHTML = '';
        return;
      }
      spotlightEl.hidden = false;
      spotlightEl.innerHTML = `<div class="spotlight-card"><h4>${esc(sp.title)}</h4><p>${esc(sp.text)}</p></div>`;
    };

    const buildTabs = () => {
      list.innerHTML = steps
        .map(
          (s, i) => `
        <li role="presentation">
          <button class="step" type="button" role="tab" id="step-tab-${i}" aria-controls="step-panel" data-step="${i}">
            <span class="step-node">${i + 1}</span>
            <span class="step-kicker">${esc(s.kicker || `Step ${pad(i + 1)}`)}</span>
            <span class="step-title">${esc(s.title)}</span>
          </button>
        </li>`
        )
        .join('');
      tabs = $$('.step', list);
    };

    const select = (index) => {
      if (index === current || index < 0 || index >= steps.length) return;
      current = index;
      const s = steps[index];
      const hasServices = Array.isArray(s.services) && s.services.length > 0;

      tabs.forEach((tab, j) => {
        tab.setAttribute('aria-selected', String(j === index));
        tab.tabIndex = j === index ? 0 : -1;
        tab.classList.toggle('is-done', j < index);
      });
      if (trackFill) trackFill.style.width = `${(index / Math.max(steps.length - 1, 1)) * 100}%`;

      panel.classList.toggle('step-panel--solo', !hasServices);
      panel.setAttribute('aria-labelledby', `step-tab-${index}`);
      panel.innerHTML = `
        <div class="step-intro">
          <span class="step-bignum" aria-hidden="true">${pad(index + 1)}</span>
          <p class="step-count">Step ${index + 1} of ${steps.length}</p>
          <h3 class="step-heading">${esc(s.title)}</h3>
          <p class="step-summary">${esc(s.summary)}</p>
          ${s.outcome ? `<p class="step-outcome"><strong>You leave with</strong>${esc(s.outcome)}</p>` : ''}
          <div class="step-nav">
            <button class="icon-btn" type="button" data-dir="-1" aria-label="Previous step" ${index === 0 ? 'disabled' : ''}>${icon('arrow-left')}</button>
            <button class="icon-btn" type="button" data-dir="1" aria-label="Next step" ${index === steps.length - 1 ? 'disabled' : ''}>${icon('arrow-right')}</button>
          </div>
        </div>
        ${
          hasServices
            ? `<div class="services">
          <p class="services-label">What we do together</p>
          ${s.services
            .map(
              (sv) => `
            <div class="service">
              <span class="service-check">${icon('check')}</span>
              <div><h4>${esc(sv.name)}</h4><p>${esc(sv.text)}</p></div>
            </div>`
            )
            .join('')}
        </div>`
            : ''
        }`;
      replayAnimation(panel);
    };

    const selectTrack = (index) => {
      if (index === trackIndex && steps.length) return;
      trackIndex = index;
      steps = tracks[trackIndex].steps || [];
      current = -1;
      renderSwitch();
      renderIntro();
      renderSpotlight();
      buildTabs();
      select(0);
    };

    list.addEventListener('click', (event) => {
      const tab = event.target.closest('[data-step]');
      if (tab) select(Number(tab.dataset.step));
    });

    list.addEventListener('keydown', (event) => {
      const keys = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: steps.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      const next = (keys[event.key] + steps.length) % steps.length;
      select(next);
      tabs[next].focus();
    });

    panel.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-dir]');
      if (!btn || btn.disabled) return;
      const dir = btn.dataset.dir;
      select(current + Number(dir));
      // Keep focus on the same arrow after the panel re-renders
      const again = $(`[data-dir="${dir}"]`, panel);
      (again && !again.disabled ? again : tabs[current]).focus();
    });

    if (switchEl) {
      switchEl.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-track]');
        if (btn) selectTrack(Number(btn.dataset.track));
      });
    }

    selectTrack(0);
  }

  /* ---------- News ---------- */

  function renderNews() {
    const items = newestFirst(C.news);
    if (!items.length) return;

    const featured = items.find((n) => n.featured) || items[0];
    const rest = items.filter((n) => n !== featured).slice(0, 3);
    const fd = parseDate(featured.date);

    const art = featured.image
      ? `<img src="${esc(featured.image)}" alt="" loading="lazy">`
      : `<div class="news-art-fallback">
           <img class="news-art-mark" src="assets/cc-mark.svg" alt="">
           ${featured.highlight ? `<span class="news-art-value">${esc(featured.highlight.value)}</span><span class="news-art-label">${esc(featured.highlight.label)}</span>` : ''}
         </div>`;

    fill(
      'news',
      `
      <a class="news-feature reveal" ${linkAttrs(featured.url)}>
        <div class="news-art">${art}</div>
        <div class="news-feature-body">
          <div class="news-meta">
            <span class="tag">${esc(featured.tag)}</span>
            <time datetime="${esc(featured.date)}">${formatDate(fd, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
          </div>
          <h3 class="news-title">${esc(featured.title)}</h3>
          <p class="news-excerpt">${esc(featured.excerpt)}</p>
          <span class="link-arrow">Read the story ${icon('arrow-right')}</span>
        </div>
      </a>
      <div class="news-list">
        ${rest
          .map((n, i) => {
            const d = parseDate(n.date);
            return `
          <a class="news-item reveal reveal-d${i + 1}" ${linkAttrs(n.url)}>
            <time class="date-tile" datetime="${esc(n.date)}">
              <span class="d">${d.getDate()}</span><span class="m">${formatDate(d, { month: 'short' })}</span>
            </time>
            <div>
              <span class="tag tag--peach">${esc(n.tag)}</span>
              <h3>${esc(n.title)}</h3>
              <p>${esc(n.excerpt)}</p>
            </div>
          </a>`;
          })
          .join('')}
      </div>`
    );
  }

  /* ---------- College & career updates ---------- */

  const CATEGORIES = {
    admissions: { label: 'Admissions', tone: 'teal' },
    'financial-aid': { label: 'Financial Aid', tone: 'peach' },
    testing: { label: 'Testing', tone: 'slate' },
    careers: { label: 'Careers', tone: 'charcoal' },
  };

  function renderUpdates() {
    const items = newestFirst(C.updates);
    const filtersEl = slot('update-filters');
    const listEl = slot('updates');
    const statusEl = slot('updates-status');
    if (!items.length || !filtersEl || !listEl) return;

    const categoryOf = (u) => CATEGORIES[u.category] || { label: u.category || 'Update', tone: 'teal' };
    const present = Object.keys(CATEGORIES).filter((key) => items.some((u) => u.category === key));
    let active = 'all';

    filtersEl.innerHTML = [['all', 'All'], ...present.map((key) => [key, CATEGORIES[key].label])]
      .map(([key, label]) => {
        const count = key === 'all' ? items.length : items.filter((u) => u.category === key).length;
        return `<button class="filter" type="button" data-filter="${key}" aria-pressed="${key === active}">${esc(label)}<span class="n">${count}</span></button>`;
      })
      .join('');

    const draw = (animate) => {
      const shown = active === 'all' ? items : items.filter((u) => u.category === active);
      listEl.innerHTML = shown
        .map((u) => {
          const cat = categoryOf(u);
          const d = parseDate(u.date);
          return `
          <article class="update tone-${cat.tone}">
            <div class="update-top">
              <span class="tag tag--${cat.tone}">${esc(cat.label)}</span>
              ${u.region ? `<span class="region">${esc(u.region)}</span>` : ''}
            </div>
            <h3>${esc(u.title)}</h3>
            <p>${esc(u.summary)}</p>
            <div class="update-foot">
              <time datetime="${esc(u.date)}">${formatDate(d, { month: 'short', day: 'numeric', year: 'numeric' })}</time>
              ${u.url ? `<a class="update-link" ${linkAttrs(u.url)}>Read more<span class="visually-hidden">: ${esc(u.title)}</span> ${icon('arrow-right')}</a>` : ''}
            </div>
          </article>`;
        })
        .join('');
      if (animate) replayAnimation(listEl);
      if (statusEl) {
        const label = active === 'all' ? 'all topics' : CATEGORIES[active].label;
        statusEl.textContent = `Showing ${shown.length} update${shown.length === 1 ? '' : 's'} in ${label}.`;
      }
    };

    filtersEl.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-filter]');
      if (!btn || btn.dataset.filter === active) return;
      active = btn.dataset.filter;
      $$('[data-filter]', filtersEl).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      draw(true);
    });

    draw(false);
  }

  function renderDeadlines() {
    const now = today();
    const rows = (C.deadlines || [])
      .map((d) => {
        let date = new Date(now.getFullYear(), d.month - 1, d.day);
        if (date < now) date = new Date(now.getFullYear() + 1, d.month - 1, d.day);
        return { ...d, date, days: daysBetween(now, date) };
      })
      .sort((a, b) => a.date - b.date);

    fill(
      'deadlines',
      rows
        .map((r) => {
          const count =
            r.days === 0
              ? `<span class="deadline-days is-today">Today</span>`
              : `<span class="deadline-days">${r.days}<small>${r.days === 1 ? 'day' : 'days'}</small></span>`;
          return `
          <li class="deadline${r.days <= 30 ? ' is-soon' : ''}">
            ${count}
            <span>
              <span class="deadline-name">${esc(r.label)}</span>
              <span class="deadline-date">${formatDate(r.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}${r.region ? ` · ${esc(r.region)}` : ''}</span>
            </span>
          </li>`;
        })
        .join('')
    );
  }

  /* ---------- Testimonials carousel ---------- */

  function renderTestimonials() {
    const items = C.testimonials || [];
    const track = slot('testimonials');
    const dots = slot('testimonial-dots');
    const carousel = $('.t-carousel');
    if (!items.length || !track || !dots || !carousel) return;

    track.innerHTML = items
      .map(
        (t, i) => `
      <figure class="t-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}">
        <div class="t-card">
          <span class="t-mark" aria-hidden="true">&ldquo;</span>
          <div>
            <blockquote class="t-quote"><p>${esc(t.quote)}</p></blockquote>
            <figcaption class="t-person">
              ${avatar(t, 'avatar--md avatar--peach')}
              <span>
                <span class="t-name">${esc(t.name)}</span>
                <span class="t-detail">${esc(t.detail)}</span>
              </span>
              ${t.result ? `<span class="t-result">${icon('award')}${esc(t.result)}</span>` : ''}
            </figcaption>
          </div>
        </div>
      </figure>`
      )
      .join('');

    dots.innerHTML = items
      .map((_, i) => `<button class="dot" type="button" data-dot="${i}" aria-label="Show testimonial ${i + 1}"></button>`)
      .join('');

    const count = items.length;
    let index = 0;
    let timer = null;
    let paused = false;
    let visible = false;

    const setDots = () =>
      $$('.dot', dots).forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));

    const go = (i, smooth = true) => {
      index = (i + count) % count;
      track.scrollTo({ left: index * track.clientWidth, behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
      setDots();
    };

    const stop = () => {
      clearInterval(timer);
      timer = null;
    };
    const start = () => {
      stop();
      if (reduceMotion || paused || !visible || count < 2) return;
      timer = setInterval(() => go(index + 1), 7000);
    };

    let settle;
    track.addEventListener(
      'scroll',
      () => {
        clearTimeout(settle);
        settle = setTimeout(() => {
          const i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
          if (i !== index) {
            index = i;
            setDots();
          }
        }, 90);
      },
      { passive: true }
    );

    $('[data-t-prev]', carousel).addEventListener('click', () => {
      go(index - 1);
      start();
    });
    $('[data-t-next]', carousel).addEventListener('click', () => {
      go(index + 1);
      start();
    });
    dots.addEventListener('click', (event) => {
      const dot = event.target.closest('[data-dot]');
      if (!dot) return;
      go(Number(dot.dataset.dot));
      start();
    });

    const pause = (value) => {
      paused = value;
      start();
    };
    carousel.addEventListener('mouseenter', () => pause(true));
    carousel.addEventListener('mouseleave', () => pause(false));
    carousel.addEventListener('focusin', () => pause(true));
    carousel.addEventListener('focusout', (event) => !carousel.contains(event.relatedTarget) && pause(false));
    track.addEventListener('touchstart', () => pause(true), { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          start();
        },
        { threshold: 0.35 }
      ).observe(carousel);
    }

    window.addEventListener('resize', () => go(index, false));
    setDots();
  }

  /* ---------- College Seekers ---------- */

  function renderSeekers() {
    const s = C.collegeSeekers;
    if (!s) return;

    fill(
      'seekers-intro',
      `
      <div class="seekers-body">
        <img class="seekers-watermark" src="assets/cc-mark.svg" alt="" aria-hidden="true">
        <span class="affil"><span class="affil-logo"><img src="assets/cc-mark.svg" alt=""></span>${esc(s.affiliation)}</span>
        <h2 class="seekers-title" id="seekers-title">College <em>Seekers</em></h2>
        ${s.tagline ? `<p class="seekers-tagline">${esc(s.tagline)}</p>` : ''}
        <p class="seekers-desc">${esc(s.description)}</p>
      </div>
      <div class="seekers-art" aria-hidden="true">
        <img src="assets/college-seekers.jpg" alt="" loading="lazy" width="1024" height="1024">
      </div>`
    );

    const regions = s.regions || [];
    const switchEl = slot('region-switch');
    const panelEl = slot('region-panel');
    if (regions.length && switchEl && panelEl) {
      let active = 0;

      const renderRegionBody = (region) => {
        if (Array.isArray(region.rows) && region.rows.length) {
          return `
          <div class="uni-table-wrap">
            <table class="uni-table">
              <thead><tr>${(region.columns || []).map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
              <tbody>
                ${region.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </div>`;
        }
        if (Array.isArray(region.list) && region.list.length) {
          return `<ul class="uni-list">${region.list.map((name) => `<li>${esc(name)}</li>`).join('')}</ul>`;
        }
        return '';
      };

      const drawRegion = () => {
        const region = regions[active];
        panelEl.innerHTML = `
          <h3 class="region-heading">${esc(region.heading || region.label)}</h3>
          ${region.intro ? `<p class="region-lede">${esc(region.intro)}</p>` : ''}
          ${renderRegionBody(region)}
          ${region.note ? `<p class="region-note">${esc(region.note)}</p>` : ''}`;
        replayAnimation(panelEl);
      };

      switchEl.innerHTML = regions
        .map((r, i) => `<button class="filter" type="button" role="tab" aria-pressed="${i === active}" data-region="${i}">${esc(r.label)}</button>`)
        .join('');

      switchEl.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-region]');
        if (!btn) return;
        active = Number(btn.dataset.region);
        $$('[data-region]', switchEl).forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.region) === active)));
        drawRegion();
      });

      drawRegion();
    }

    if (s.disclaimer) fill('seekers-disclaimer', esc(s.disclaimer));
  }

  /* ---------- CC Daily Journal ---------- */

  function renderJournal() {
    const entries = newestFirst(C.journal);
    if (!entries.length) return;

    const now = today();
    const [latest, ...older] = entries;
    const ld = parseDate(latest.date);
    const age = daysBetween(ld, now);
    const label = age === 0 ? "Today's entry" : age === 1 ? "Yesterday's entry" : 'Latest entry';
    const minutes = (e) => (e.readTime ? `${e.readTime} min read` : '');

    fill(
      'journal-today',
      `
      <img class="jt-mark" src="assets/cc-mark.svg" alt="" aria-hidden="true">
      <div class="jt-dateline">
        <span class="jt-day">${ld.getDate()}</span>
        <span class="jt-when">
          <span>${formatDate(ld, { weekday: 'long' })}</span>
          <span>${formatDate(ld, { month: 'long', year: 'numeric' })}</span>
        </span>
        <span class="tag tag--peach jt-label">${label}</span>
      </div>
      <span class="jt-topic">${[esc(latest.topic), minutes(latest)].filter(Boolean).join(' · ')}</span>
      <h3 class="jt-title"><a ${linkAttrs(latest.url)}>${esc(latest.title)}</a></h3>
      <p class="jt-excerpt">${esc(latest.excerpt)}</p>
      <div class="jt-foot">
        ${latest.author ? `<span class="jt-author">${avatar({ name: latest.author, photo: latest.authorPhoto }, 'avatar--sm')}By ${esc(latest.author)}</span>` : ''}
        <span class="link-arrow">Read entry ${icon('arrow-right')}</span>
      </div>`
    );

    const when = (d) => {
      const diff = daysBetween(d, now);
      if (diff === 0) return 'Today';
      if (diff === 1) return 'Yesterday';
      if (diff > 1 && diff < 7) return formatDate(d, { weekday: 'long' });
      return formatDate(d, { month: 'short', day: 'numeric' });
    };

    fill(
      'journal-list',
      older
        .slice(0, 6)
        .map((e) => {
          const d = parseDate(e.date);
          return `
          <li>
            <a class="j-item" ${linkAttrs(e.url)}>
              <time class="date-tile date-tile--sm" datetime="${esc(e.date)}">
                <span class="d">${d.getDate()}</span><span class="m">${formatDate(d, { month: 'short' })}</span>
              </time>
              <span>
                <span class="j-title">${esc(e.title)}</span>
                <span class="j-meta">${[when(d), esc(e.topic), e.readTime ? `${e.readTime} min` : ''].filter(Boolean).join(' · ')}</span>
              </span>
              ${icon('arrow-right', 'i j-arrow')}
            </a>
          </li>`;
        })
        .join('')
    );
  }

  /* ---------- Stats count-up ---------- */

  function initCounters() {
    const els = $$('[data-count]');
    if (!els.length || reduceMotion || !('IntersectionObserver' in window)) return;

    const render = (el, value) => {
      const decimals = Number(el.dataset.decimals || 0);
      el.textContent = `${el.dataset.prefix || ''}${value.toFixed(decimals)}${el.dataset.suffix || ''}`;
    };

    const run = (el) => {
      const target = Number(el.dataset.count);
      const duration = 1400;
      const startTime = performance.now();
      const tick = (time) => {
        const t = Math.min(1, (time - startTime) / duration);
        render(el, target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          run(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    els.forEach((el) => {
      el.setAttribute('aria-label', el.textContent.trim()); // screen readers get the final value
      render(el, 0);
      io.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */

  function initReveal() {
    const els = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Animated fog background (same effect as thecollegecrafters.com) ---------- */

  function initFog() {
    if (reduceMotion || window.innerWidth < 900) return;

    const load = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

    const start = () =>
      load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
        .then(() => load('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js'))
        .then(() => {
          window.VANTA.FOG({
            el: '#fog',
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            highlightColor: 0xffffff,
            midtoneColor: 0xfafafa,
            lowlightColor: 0x9bddff,
            baseColor: 0xfff9f5,
            blurFactor: 0.68,
            speed: 2,
            zoom: 0.6,
          });
        })
        .catch(() => {
          /* keep the CSS gradient fallback */
        });

    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 3000 });
    else setTimeout(start, 1500);
  }

  /* ---------- Misc ---------- */

  function initLinks() {
    const links = (C.site && C.site.links) || {};
    $$('[data-link]').forEach((a) => {
      const url = links[a.dataset.link];
      if (!url) return;
      a.href = url;
      if (isExternal(url)) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
    $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- Boot ---------- */

  // Each step runs on its own so a typo in one content block can't blank the whole page.
  [
    initBooking,
    initHeader,
    renderTeam,
    renderProcess,
    renderNews,
    renderUpdates,
    renderDeadlines,
    renderTestimonials,
    renderSeekers,
    renderJournal,
    initLinks,
    initCounters,
    initReveal,
    initFog,
  ].forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.error(`[CC] ${fn.name} failed:`, error);
    }
  });
})();
