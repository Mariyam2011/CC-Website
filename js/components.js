/* ==========================================================================
   REUSABLE COMPONENTS
   --------------------------------------------------------------------------
   Every component is a pure function that returns an HTML string, so it can
   be dropped into any page:

     document.querySelector('#x').innerHTML = CC.StatCounter([...]);
     CC.initComponents();   // wires up counters, accordions, step reveals

   Components that need behaviour (StatCounter, Accordion, WorkflowSteps) are
   activated by CC.initComponents(), which is safe to call more than once.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */

  CC.esc = function (value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };

  const esc = CC.esc;

  CC.icon = function (name, extraClass) {
    return `<svg class="i${extraClass ? ' ' + extraClass : ''}" aria-hidden="true"><use href="#i-${esc(name)}"></use></svg>`;
  };

  /* Injected once per page by the layout so every page has the icon set. */
  CC.iconSprite = function () {
    return `
    <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
      <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
      <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></symbol>
      <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
      <symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
      <symbol id="i-pause" viewBox="0 0 24 24"><path d="M9.5 5v14M14.5 5v14"/></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></symbol>
      <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5z"/></symbol>
      <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/></symbol>
      <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/></symbol>
      <symbol id="i-book" viewBox="0 0 24 24"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3H10a2 2 0 0 1 2 2v15a2 2 0 0 0-2-2H2zM22 5.5A2.5 2.5 0 0 0 19.5 3H14a2 2 0 0 0-2 2v15a2 2 0 0 1 2-2h8z"/></symbol>
      <symbol id="i-presentation" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8M7 12l3-3 2 2 4-4"/></symbol>
      <symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></symbol>
      <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></symbol>
      <symbol id="i-edit" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></symbol>
      <symbol id="i-send" viewBox="0 0 24 24"><path d="m21 3-9 18-2.5-7.5L2 11z"/></symbol>
      <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4"/></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h3.5l1.5 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 1.5V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></symbol>
      <symbol id="i-external" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></symbol>
      <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/></symbol>
      <symbol id="i-facebook" viewBox="0 0 24 24"><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/></symbol>
      <symbol id="i-linkedin" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7v.01M12 17v-3.5a2.5 2.5 0 0 1 5 0V17M12 10.5V17"/></symbol>
    </svg>`;
  };

  /* ======================================================================
     PageBanner — title banner + breadcrumb, top of every inner page
     ====================================================================== */

  CC.PageBanner = function (opts) {
    const o = opts || {};
    const full = o.trail || [];

    const norm = (v) => String(v || '').trim().toLowerCase();
    const same = (a, b) => norm(a) === norm(b);

    /* One string echoes the other when they match, or when the longer one
       contains the shorter. The 4-character floor keeps a very short crumb
       ("UK") from matching inside an unrelated word. */
    const echoes = (a, b) => {
      const x = norm(a);
      const y = norm(b);
      if (!x || !y) return false;
      if (x === y) return true;
      const short = x.length < y.length ? x : y;
      const long = x.length < y.length ? y : x;
      return short.length >= 4 && long.indexOf(short) !== -1;
    };

    /* The <h1> right below already names the page, so a trailing crumb that
       repeats it is the same word twice. Drop it — but only while two crumbs
       still remain, so a top-level page is not left with a lone "Home".
       Once it is gone no crumb is the current page, so the rest stay links
       and aria-current is not used. */
    const trail =
      full.length > 2 && same(full[full.length - 1].label, o.title) ? full.slice(0, -1) : full;
    const trimmed = trail.length !== full.length;

    const crumbs = trail
      .map((c, i) => {
        const last = i === trail.length - 1;
        const sep = last ? '' : CC.icon('chevron-right', 'crumb-sep');
        if (last && !trimmed) return `<li><span aria-current="page">${esc(c.label)}</span></li>`;
        if (!c.href) return `<li><span>${esc(c.label)}</span>${sep}</li>`;
        return `<li><a href="${esc(c.href)}">${esc(c.label)}</a>${sep}</li>`;
      })
      .join('');

    /* Same reasoning for the eyebrow: if it echoes the title or any crumb —
       "CC Daily Journal" above a "Journal" heading — it is dropped. Pages
       whose eyebrow says something the trail does not still show it. The
       full trail is checked, not the trimmed one, so dropping a crumb never
       brings a repeated eyebrow back. */
    const eyebrowEchoes = full.some((c) => echoes(c.label, o.eyebrow)) || echoes(o.title, o.eyebrow);
    const showEyebrow = o.eyebrow && !eyebrowEchoes;

    return `
      <div class="page-banner">
        <div class="wrap">
          ${trail.length ? `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${crumbs}</ol></nav>` : ''}
          ${showEyebrow ? `<p class="eyebrow">${esc(o.eyebrow)}</p>` : ''}
          <h1 class="page-title">${esc(o.title || '')}</h1>
          ${o.subtitle ? `<p class="page-subtitle">${esc(o.subtitle)}</p>` : ''}
        </div>
      </div>`;
  };

  /* ======================================================================
     StatCounter — numbers count up from 0 when scrolled into view
     stats: [{ value, prefix, suffix, decimals, label, sub }]
     ====================================================================== */

  CC.StatCounter = function (stats, opts) {
    const o = opts || {};
    const items = (stats || [])
      .map((s) => {
        /* `text` renders a static value (dates, "TBC") with no count-up. */
        const value = s.text
          ? `<p class="statc-value statc-value--text">${esc(s.text)}</p>`
          : (() => {
              const decimals = s.decimals || 0;
              const display = (s.prefix || '') + Number(s.value).toFixed(decimals) + (s.suffix || '');
              return `<p class="statc-value"
             data-count="${esc(s.value)}"
             data-decimals="${decimals}"
             data-prefix="${esc(s.prefix || '')}"
             data-suffix="${esc(s.suffix || '')}">${esc(display)}</p>`;
            })();

        return `
        <div class="statc">
          ${value}
          <p class="statc-label">${esc(s.label || '')}</p>
          ${s.sub ? `<p class="statc-sub">${esc(s.sub)}</p>` : ''}
        </div>`;
      })
      .join('');

    return `<div class="statc-row${o.compact ? ' statc-row--compact' : ''}">${items}</div>`;
  };

  function runCount(el) {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;

    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const format = (n) => prefix + n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;

    if (reduceMotion()) {
      el.textContent = format(target);
      return;
    }

    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    };

    el.textContent = format(0);
    requestAnimationFrame(tick);
  }

  /* ======================================================================
     WorkflowSteps — horizontal on desktop, vertical on mobile
     steps: [{ icon, meta, title, text }] — `meta` is an optional small label
     above the title (e.g. a date range for a timeline).
     ====================================================================== */

  CC.WorkflowSteps = function (steps) {
    const items = (steps || [])
      .map((s, i) => {
        return `
        <li class="wstep" style="--i:${i}">
          <div class="wstep-node">
            <span class="wstep-num">${i + 1}</span>
            ${s.icon ? CC.icon(s.icon, 'wstep-icon') : ''}
          </div>
          ${s.meta ? `<p class="wstep-meta">${esc(s.meta)}</p>` : ''}
          <h3 class="wstep-title">${esc(s.title || '')}</h3>
          ${s.text ? `<p class="wstep-text">${esc(s.text)}</p>` : ''}
          ${
            s.href
              ? `<a class="wstep-link" href="${esc(s.href)}">${esc(s.linkLabel || 'Learn more')} ${CC.icon(
                  'arrow-right'
                )}</a>`
              : ''
          }
        </li>`;
      })
      .join('');

    return `<div class="wsteps"><ol class="wsteps-list">${items}</ol></div>`;
  };

  /* ======================================================================
     ComparisonTable — "the old way" vs "with College Crafters"
     rows: [{ old, new }]
     ====================================================================== */

  CC.ComparisonTable = function (opts) {
    const o = opts || {};
    const rows = (o.rows || [])
      .map(
        (r) => `
        <tr>
          <td class="cmp-old"><span class="cmp-mark cmp-mark--no">${CC.icon('x')}</span><span>${esc(r.old)}</span></td>
          <td class="cmp-new"><span class="cmp-mark cmp-mark--yes">${CC.icon('check')}</span><span>${esc(r.new)}</span></td>
        </tr>`
      )
      .join('');

    return `
      <div class="cmp-wrap">
        <table class="cmp-table">
          <thead>
            <tr>
              <th scope="col" class="cmp-head-old">${esc(o.oldTitle || 'The old way')}</th>
              <th scope="col" class="cmp-head-new">${esc(o.newTitle || 'With College Crafters')}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  };

  /* ======================================================================
     PersonaCard — one card per visitor type
     p: { icon, title, blurb, needsTitle, needs: [], ctaLabel, ctaHref }
     ====================================================================== */

  CC.PersonaCard = function (p) {
    const o = p || {};
    const needs = (o.needs || []).map((n) => `<li>${CC.icon('check')}<span>${esc(n)}</span></li>`).join('');

    return `
      <article class="persona">
        <span class="persona-icon">${CC.icon(o.icon || 'user')}</span>
        <h3 class="persona-title">${esc(o.title || '')}</h3>
        ${o.blurb ? `<p class="persona-blurb">${esc(o.blurb)}</p>` : ''}
        ${o.needsTitle ? `<p class="persona-needs-title">${esc(o.needsTitle)}</p>` : ''}
        ${needs ? `<ul class="persona-needs">${needs}</ul>` : ''}
        ${
          o.ctaBooking
            ? CC.BookingTrigger({ label: o.ctaLabel || 'Book a meeting', btnClass: 'persona-cta', chevron: false })
            : o.ctaHref
            ? `<a class="persona-cta" href="${esc(o.ctaHref)}">${esc(o.ctaLabel || 'Learn more')} ${CC.icon('arrow-right')}</a>`
            : ''
        }
      </article>`;
  };

  CC.PersonaCards = function (list) {
    return `<div class="persona-grid">${(list || []).map(CC.PersonaCard).join('')}</div>`;
  };

  /* ======================================================================
     BookingTrigger — the "Book Meeting" dropdown (not a page)
     --------------------------------------------------------------------------
     Renders a button that opens a small menu of booking options pulled from
     content.js (site.booking: [{ label, hint, url }]). No navigation, no
     dedicated page — CC.wireBookingButtons() (called by initComponents)
     populates the menu and handles open/close for every instance on the page.

     opts: { label, btnClass, align: 'left' | 'center' | undefined, chevron }
     align controls which edge the menu hangs from — 'left' for a button that
     sits at the left of a row (e.g. the hero), 'center' for a single centred
     button (e.g. a CTA band), undefined for the default right-aligned menu
     (e.g. the header, which sits at the right edge of the screen).
     ====================================================================== */

  CC.BookingTrigger = function (opts) {
    const o = opts || {};
    const btnClass = o.btnClass || 'btn btn-solid btn-lg';
    const wrapClass = 'booking' + (o.align ? ' booking--' + o.align : '');
    const chevron = o.chevron === false ? '' : CC.icon('chevron-down', 'i-chevron');

    return `
      <span class="${wrapClass}" data-booking>
        <button class="${btnClass}" type="button" aria-haspopup="true" aria-expanded="false" data-booking-toggle>
          ${esc(o.label || 'Book a Meeting')}${chevron}
        </button>
        <span class="booking-menu" data-booking-menu hidden></span>
      </span>`;
  };

  /* Populates every [data-booking-menu] from content.js and wires open/close.
     Safe to call repeatedly — already-wired groups are skipped, and the
     document-level click/Esc listeners are attached once. */
  CC.wireBookingButtons = function (scope) {
    const options = ((window.CC_CONTENT || {}).site || {}).booking || [];
    const root = scope || document;

    const closeGroup = (group) => {
      group.classList.remove('is-open');
      const toggle = group.querySelector('[data-booking-toggle]');
      const menu = group.querySelector('[data-booking-menu]');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (menu) menu.hidden = true;
    };

    const closeAllExcept = (except) => {
      document.querySelectorAll('[data-booking].is-open').forEach((g) => {
        if (g !== except) closeGroup(g);
      });
    };

    /* An open dropdown pins the auto-hiding header in place, so re-check the
       chrome once a toggle has fully settled (not mid-way through one). */
    const settle = () => {
      if (CC.refreshChrome) CC.refreshChrome();
    };

    root.querySelectorAll('[data-booking]:not([data-wired])').forEach((group) => {
      group.dataset.wired = '1';

      const toggle = group.querySelector('[data-booking-toggle]');
      const menu = group.querySelector('[data-booking-menu]');
      if (!toggle || !menu) return;

      menu.innerHTML = options
        .map((opt) => {
          const external = /^https?:/.test(opt.url || '');
          return `<a href="${esc(opt.url)}"${external ? ' target="_blank" rel="noopener"' : ''}>
                    <span>${esc(opt.label)}</span>${opt.hint ? `<small>${esc(opt.hint)}</small>` : ''}
                  </a>`;
        })
        .join('');

      toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const willOpen = !group.classList.contains('is-open');
        closeAllExcept(null);
        if (willOpen) {
          group.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
          menu.hidden = false;
        }
        settle();
      });
    });

    if (!document.body.dataset.bookingGlobalWired) {
      document.body.dataset.bookingGlobalWired = '1';

      document.addEventListener('click', (event) => {
        closeAllExcept(event.target.closest('[data-booking]'));
        settle();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        const open = document.querySelector('[data-booking].is-open');
        if (open) {
          closeGroup(open);
          const toggle = open.querySelector('[data-booking-toggle]');
          if (toggle) toggle.focus();
          settle();
        }
      });
    }
  };

  /* ======================================================================
     TeamMemberCard — headshot, name, credential, role. No bio.
     p: { name, credential, role, photo }
     Without `photo` the card shows a placeholder headshot frame.
     ====================================================================== */

  CC.TeamMemberCard = function (person) {
    const p = person || {};
    /* If `photo` is set but the file is missing (not added yet), fall back
       to the placeholder frame instead of showing a broken-image icon. */
    const photo = p.photo
      ? `<img src="${esc(CC.url ? CC.url(p.photo) : p.photo)}" alt="${esc(p.name || '')}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='';">
         <span class="tmcard-ph" style="display:none">${CC.icon('user')}<span>Photo to come</span></span>`
      : `<span class="tmcard-ph">${CC.icon('user')}<span>Photo to come</span></span>`;

    return `
      <article class="tmcard">
        <div class="tmcard-photo">${photo}</div>
        <div class="tmcard-body">
          <h3 class="tmcard-name">${esc(p.name || '')}</h3>
          ${p.credential ? `<p class="tmcard-cred">${esc(p.credential)}</p>` : ''}
          ${p.role ? `<p class="tmcard-role">${esc(p.role)}</p>` : ''}
        </div>
      </article>`;
  };

  CC.TeamMemberGrid = function (list) {
    return `<div class="tmcard-grid">${(list || []).map(CC.TeamMemberCard).join('')}</div>`;
  };

  /* ======================================================================
     Accordion — FAQ
     items: [{ q, a }]
     ====================================================================== */

  let acc = 0;

  CC.Accordion = function (items, opts) {
    const o = opts || {};
    const id = 'acc' + ++acc;

    const rows = (items || [])
      .map((it, i) => {
        const open = o.openFirst && i === 0;
        return `
        <div class="acc-item">
          <h3 class="acc-h">
            <button class="acc-btn" type="button"
                    aria-expanded="${open ? 'true' : 'false'}"
                    aria-controls="${id}-p${i}" id="${id}-b${i}">
              <span>${esc(it.q)}</span>
              ${CC.icon('chevron-down', 'acc-chev')}
            </button>
          </h3>
          <div class="acc-panel" id="${id}-p${i}" role="region"
               aria-labelledby="${id}-b${i}" ${open ? '' : 'hidden'}>
            <p>${esc(it.a)}</p>
          </div>
        </div>`;
      })
      .join('');

    return `<div class="acc">${rows}</div>`;
  };

  /* ======================================================================
     Small layout helpers used by the standard pages
     ====================================================================== */

  CC.SectionHead = function (o) {
    const opts = o || {};
    return `
      <div class="section-head${opts.center ? ' section-head--center' : ''}">
        ${opts.eyebrow ? `<p class="eyebrow">${esc(opts.eyebrow)}</p>` : ''}
        ${opts.title ? `<h2 class="section-title">${opts.titleHtml || esc(opts.title)}</h2>` : ''}
        ${opts.lede ? `<p class="lede">${esc(opts.lede)}</p>` : ''}
      </div>`;
  };

  CC.CardGrid = function (items, opts) {
    const o = opts || {};
    const cards = (items || [])
      .map((c) => {
        const inner = `
        ${c.icon ? `<span class="ccard-icon">${CC.icon(c.icon)}</span>` : ''}
        ${c.kicker ? `<p class="ccard-kicker">${esc(c.kicker)}</p>` : ''}
        <h3 class="ccard-title">${esc(c.title || '')}</h3>
        ${c.text ? `<p class="ccard-text">${esc(c.text)}</p>` : ''}
        ${c.href ? `<span class="ccard-link">${esc(c.linkLabel || 'Read more')} ${CC.icon('arrow-right')}</span>` : ''}`;

        return c.href
          ? `<a class="ccard ccard--link" href="${esc(c.href)}">${inner}</a>`
          : `<article class="ccard">${inner}</article>`;
      })
      .join('');

    return `<div class="ccard-grid${o.cols ? ' ccard-grid--' + o.cols : ''}">${cards}</div>`;
  };

  /* ======================================================================
     EditorialCard — the premium/editorial surface
     --------------------------------------------------------------------------
     opts: { eyebrow, title, description, image, icon, href, rotation, variant,
             imagePosition, className, headingLevel, reveal, index }

     icon           fallback glyph, rendered ONLY when no image is supplied

     rotation       degrees, applied to the inner surface (neutralised < 900px)
     variant        'default' | 'cream' | 'tint' | 'solid'
     imagePosition  'bottom' (default — fades up into the card) | 'top'
     headingLevel   2-4, default 3. Set it so the card does not skip a level
                    on pages where the surrounding sections are h2.
     reveal         true arms the scroll reveal on a card used OUTSIDE a grid.
                    EditorialCardGrid arms itself, so leave this alone there.
     index          stagger position; EditorialCardGrid sets this for you

     Two nested elements on purpose: the OUTER .ecard owns the scroll reveal
     (opacity + translateY) and the INNER .ecard-inner owns rotation and hover.
     One element cannot do both — the two transforms would overwrite each other.

     Styles live in css/editorial.css, which the page must link.
     ====================================================================== */

  CC.EditorialCard = function (opts) {
    const o = opts || {};
    const variant = o.variant || 'default';
    const rotation = typeof o.rotation === 'number' ? o.rotation : 0;
    const tag = o.href ? 'a' : 'div';
    const href = o.href
      ? ` href="${esc(o.href)}"${o.newTab ? ' target="_blank" rel="noopener"' : ''}`
      : '';

    /* alt="" is deliberate: the image is a visual accent and the title and
       description already carry the card's meaning, so announcing it would
       only add noise for screen readers. */
    const media = o.image
      ? `<div class="ecard-media"><img src="${esc(o.image)}" alt="" loading="lazy" decoding="async"></div>`
      : '';

    /* Clamped to h2-h4 so a caller cannot inject an arbitrary tag name. */
    const lvl = Math.min(4, Math.max(2, parseInt(o.headingLevel, 10) || 3));

    /* The icon is a fallback anchor, shown only when there is no image —
       the photograph is the stronger visual and having both reads busy.
       Lets icon-based content convert to editorial without losing anything. */
    const glyph = !o.image && o.icon ? `<span class="ecard-icon">${CC.icon(o.icon)}</span>` : '';

    const body = `
        <div class="ecard-body">
          ${glyph}
          ${o.eyebrow ? `<p class="ecard-eyebrow">${esc(o.eyebrow)}</p>` : ''}
          ${o.title ? `<h${lvl} class="ecard-title">${esc(o.title)}</h${lvl}>` : ''}
          ${o.description ? `<p class="ecard-desc">${esc(o.description)}</p>` : ''}
        </div>`;

    const style = `--ecard-rot:${rotation}deg${typeof o.index === 'number' ? ';--i:' + o.index : ''}`;

    return `
      <article class="ecard ecard--${esc(variant)}${o.className ? ' ' + esc(o.className) : ''}" style="${style}"${
      o.reveal ? ' data-reveal' : ''
    }>
        <${tag} class="ecard-inner"${href}>
          ${o.imagePosition === 'top' ? media + body : body + media}
        </${tag}>
      </article>`;
  };

  /* ======================================================================
     EditorialCardGrid — laid-out set of EditorialCards
     --------------------------------------------------------------------------
     cards: [{ ...EditorialCard props }]
     opts:  { cols, rotations, className }

     Rotation comes from `rotations` (default -3 / 1 / -2, cycled), unless a
     card sets its own. data-reveal arms the shared IntersectionObserver in
     initComponents, which adds .is-in and lets the children stagger in.
     ====================================================================== */

  CC.EditorialCardGrid = function (cards, opts) {
    const o = opts || {};
    const cols = o.cols || 3;

    /* Rotation only reads as deliberate on narrow, portrait-ish cards. A
       2-up grid makes cards wide, where the same 3deg throws the corners far
       enough that it looks like a rendering fault rather than a choice — so
       wide grids sit flat unless the caller asks otherwise. */
    const pattern =
      Array.isArray(o.rotations) && o.rotations.length ? o.rotations : cols <= 2 ? [0] : [-3, 1, -2];

    const items = (cards || [])
      .map((c, i) =>
        CC.EditorialCard(
          Object.assign({}, c, {
            index: i,
            reveal: false, /* the grid is the reveal target, not each card */
            headingLevel: c.headingLevel || o.headingLevel,
            rotation: typeof c.rotation === 'number' ? c.rotation : pattern[i % pattern.length],
          })
        )
      )
      .join('');

    return `<div class="ecard-grid ecard-grid--${cols}${o.className ? ' ' + esc(o.className) : ''}"${
      o.reveal === false ? '' : ' data-reveal'
    }>${items}</div>`;
  };

  /* ======================================================================
     ProcessFlow — a SEQUENTIAL journey
     --------------------------------------------------------------------------
     steps: [{ kicker, title, summary, icon, services:[{name,text}], outcome,
               href, linkLabel }]
     opts:  { orientation: 'vertical' | 'horizontal', className }

     A numbered timeline with a connecting line that fills as each step
     scrolls into view. Use this ONLY where order is real — where step 2
     genuinely follows step 1. For things that happen in parallel, use
     RequirementMap instead, which does not imply sequence.
     ====================================================================== */

  CC.ProcessFlow = function (steps, opts) {
    const o = opts || {};
    const list = steps || [];
    const orientation = o.orientation === 'horizontal' ? 'horizontal' : 'vertical';

    const items = list
      .map((s, i) => {
        const services = (s.services || []).length
          ? `<ul class="pstep-services">${s.services
              .map((sv) => `<li><strong>${esc(sv.name)}</strong><span>${esc(sv.text)}</span></li>`)
              .join('')}</ul>`
          : '';

        return `
        <li class="pstep" style="--i:${i}" data-pstep>
          <div class="pstep-marker" aria-hidden="true">
            <span class="pstep-num">${i + 1}</span>
          </div>
          <div class="pstep-content">
            ${s.kicker ? `<p class="pstep-kicker">${esc(s.kicker)}</p>` : ''}
            <h3 class="pstep-title">${esc(s.title || '')}</h3>
            ${s.summary ? `<p class="pstep-summary">${esc(s.summary)}</p>` : ''}
            ${services}
            ${
              s.outcome
                ? `<p class="pstep-outcome">${CC.icon('check')}<span>${esc(s.outcome)}</span></p>`
                : ''
            }
            ${
              s.href
                ? `<a class="pstep-link" href="${esc(s.href)}">${esc(
                    s.linkLabel || 'Learn more'
                  )} ${CC.icon('arrow-right')}</a>`
                : ''
            }
          </div>
        </li>`;
      })
      .join('');

    return `
      <div class="pflow pflow--${orientation}${o.className ? ' ' + esc(o.className) : ''}" data-pflow data-reveal>
        <span class="pflow-track" aria-hidden="true"><span class="pflow-fill" data-pflow-fill></span></span>
        <ol class="pflow-list">${items}</ol>
      </div>`;
  };

  /* ======================================================================
     RequirementMap — PARALLEL parts that converge on one outcome
     --------------------------------------------------------------------------
     opts: { items:[{ title, summary, icon }], outcome:{ title, text, icon },
             note, className }

     Deliberately unnumbered. The US/UK application components (academics,
     testing, essays, references) are weighed together, not worked through in
     order, so showing them as steps 1-5 would misrepresent how admissions
     actually reads a file. Connector lines reveal with the section.
     ====================================================================== */

  CC.RequirementMap = function (opts) {
    const o = opts || {};
    const items = o.items || [];
    if (!items.length) return '';

    const pillars = items
      .map(
        (it, i) => `
        <li class="rmap-pillar" style="--i:${i}">
          <div class="rmap-card">
            ${it.icon ? `<span class="rmap-icon">${CC.icon(it.icon)}</span>` : ''}
            <h3 class="rmap-title">${esc(it.title || '')}</h3>
            ${it.summary ? `<p class="rmap-summary">${esc(it.summary)}</p>` : ''}
          </div>
        </li>`
      )
      .join('');

    const outcome = o.outcome
      ? `<div class="rmap-outcome">
           ${o.outcome.icon ? `<span class="rmap-outcome-icon">${CC.icon(o.outcome.icon)}</span>` : ''}
           <p class="rmap-outcome-title">${esc(o.outcome.title || '')}</p>
           ${o.outcome.text ? `<p class="rmap-outcome-text">${esc(o.outcome.text)}</p>` : ''}
         </div>`
      : '';

    /* --n drives the connector bus width so it spans pillar centre to
       pillar centre, whatever the count, with no JS measurement. */
    return `
      <div class="rmap${o.className ? ' ' + esc(o.className) : ''}" style="--n:${items.length}" data-reveal>
        <ul class="rmap-pillars">${pillars}</ul>
        ${
          outcome
            ? `<div class="rmap-join" aria-hidden="true">
                 <span class="rmap-bus"></span>
                 <span class="rmap-drop"></span>
               </div>
               ${outcome}`
            : ''
        }
        ${o.note ? `<p class="rmap-note">${CC.icon('clock')}<span>${esc(o.note)}</span></p>` : ''}
      </div>`;
  };

  CC.CTABand = function (o) {
    const opts = o || {};
    const list = opts.buttons || [];
    const buttons = list
      .map((b, i) => {
        const btnClass = `btn ${i === 0 ? 'btn-solid' : 'btn-ghost'} btn-lg`;
        if (b.booking) {
          return CC.BookingTrigger({
            label: b.label,
            btnClass,
            align: list.length > 1 ? 'left' : 'center',
          });
        }
        return `<a class="${btnClass}" href="${esc(b.href)}"${
          b.external ? ' target="_blank" rel="noopener"' : ''
        }>${esc(b.label)}${i === 0 ? ' ' + CC.icon('arrow-right') : ''}</a>`;
      })
      .join('');

    return `
      <section class="cta-band">
        <div class="wrap">
          <h2 class="cta-title">${esc(opts.title || '')}</h2>
          ${opts.text ? `<p class="cta-text">${esc(opts.text)}</p>` : ''}
          ${buttons ? `<div class="cta-actions">${buttons}</div>` : ''}
        </div>
      </section>`;
  };

  CC.Placeholder = function (text) {
    return `<p class="placeholder-note">${CC.icon('edit')}<span>${esc(text)}</span></p>`;
  };

  /* ======================================================================
     LogoMarquee — infinite horizontal strip of university logos / wordmarks

       CC.LogoMarquee(CC_CONTENT.universities, { speed: 24 })

     items: [{ label, name, logo, href }]
       label — what shows (short: "MIT")
       name  — full name announced to screen readers ("Massachusetts …")
       logo  — optional image path; without one the item renders as a
               typographic wordmark, so the strip never depends on files
       href  — optional link

     opts:  { speed: seconds per loop (default 24), label: aria-label,
              gap: CSS length between items }

     The track holds two identical copies of the list and slides exactly one
     copy-width, so the loop is seamless. The second copy is aria-hidden and
     never linked, so assistive tech and the tab order see each university
     once. Motion is a single transform on the compositor — no JS per frame.
     ====================================================================== */

  function marqueeItem(item, isClone) {
    const label = item.label || item.name || '';
    const full = item.name || label;

    /* Each entry carries its own brand colour as a custom property, so the
       CSS stays one rule instead of fourteen. */
    const color = item.color ? ` style="--mq-color:${esc(item.color)}"` : '';

    /* The wordmark is always in the markup. Where an entry has a logo file
       the wordmark is hidden by CSS and the image shows instead — and if
       that image ever fails to load, initComponents swaps the wordmark back
       in, so a missing or renamed file degrades to type, not to a broken
       image. The image is alt="" because the name beside it already carries
       it, in both states. */
    const word =
      `<span class="mq-word" aria-hidden="true">${esc(label)}</span>` +
      `<span class="visually-hidden">${esc(full)}</span>`;

    const inner = item.logo
      ? `<img class="mq-logo" src="${esc(item.logo)}" alt="" loading="lazy" decoding="async" />${word}`
      : word;

    const cls = 'mq-link' + (item.logo ? ' mq-link--logo' : '');

    /* Clones are decorative: never links, so they cannot take focus. */
    const body =
      item.href && !isClone
        ? `<a class="${cls}" href="${esc(item.href)}"${color}>${inner}</a>`
        : `<span class="${cls}"${color}>${inner}</span>`;

    return `<li class="mq-item">${body}</li>`;
  }

  CC.LogoMarquee = function (items, opts) {
    const o = opts || {};
    const list = (items || []).filter(Boolean);
    if (!list.length) return CC.Placeholder('Add a `universities` array to content.js to fill this strip.');

    const speed = Number(o.speed) > 0 ? Number(o.speed) : 24;
    const label = o.label || 'Universities our students have been admitted to';
    const gap = o.gap ? `--mq-gap:${esc(o.gap)};` : '';

    const real = list.map((item) => marqueeItem(item, false)).join('');
    const clone = list.map((item) => marqueeItem(item, true)).join('');

    return `
      <div class="mq" data-marquee style="--mq-duration:${speed}s;${gap}">
        <div class="mq-viewport">
          <div class="mq-track" data-marquee-track>
            <ul class="mq-group" aria-label="${esc(label)}">${real}</ul>
            <ul class="mq-group" aria-hidden="true">${clone}</ul>
          </div>
        </div>
      </div>`;
  };

  /* ======================================================================
     QuoteCarousel — one testimonial at a time, auto-advancing

       CC.QuoteCarousel(CC_CONTENT.testimonials, { interval: 7000 })

     quotes: [{ quote, name, detail, result, photo }]
     opts:   { interval: ms between slides (default 7000), label: aria-label }

     The viewport is a scroll-snap container, so touch swiping is native and
     free, and JS only ever calls scrollTo(). Slides reuse the .tcard styles
     the testimonial grid already uses, so the two stay in sync.
     ====================================================================== */

  function quoteInitials(name) {
    return String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  CC.QuoteCarousel = function (quotes, opts) {
    const o = opts || {};
    const list = (quotes || []).filter((q) => q && q.quote);
    if (!list.length) return CC.Placeholder('Add testimonials to content.js to fill this carousel.');

    const total = list.length;
    const interval = Number(o.interval) > 0 ? Number(o.interval) : 7000;
    const label = o.label || 'Testimonials';

    const slides = list
      .map((t, i) => {
        const avatar = t.photo
          ? `<img class="pcard-avatar" src="${esc(t.photo)}" alt="" width="54" height="54" loading="lazy" />`
          : `<span class="pcard-avatar${i % 2 ? ' pcard-avatar--peach' : ''}" aria-hidden="true">${esc(
              quoteInitials(t.name)
            )}</span>`;

        return `
        <div class="qcar-slide" role="group" aria-roledescription="slide"
             aria-label="${i + 1} of ${total}" data-qcar-slide>
          <figure class="tcard qcar-card">
            <blockquote>${esc(t.quote)}</blockquote>
            <figcaption>
              ${avatar}
              <div>
                <p class="tcard-name">${esc(t.name || '')}</p>
                ${t.detail ? `<p class="tcard-detail">${esc(t.detail)}</p>` : ''}
              </div>
              ${t.result ? `<p class="tcard-result">${CC.icon('award')}${esc(t.result)}</p>` : ''}
            </figcaption>
          </figure>
        </div>`;
      })
      .join('');

    const dots = list
      .map(
        (t, i) =>
          `<button class="qcar-dot" type="button" data-qcar-go="${i}"
                   aria-label="Show testimonial ${i + 1} of ${total}"
                   ${i === 0 ? 'aria-current="true"' : ''}></button>`
      )
      .join('');

    return `
      <div class="qcar" data-qcar data-qcar-interval="${interval}"
           role="group" aria-roledescription="carousel" aria-label="${esc(label)}">
        <div class="qcar-viewport" data-qcar-viewport aria-live="off">${slides}</div>

        <div class="qcar-controls">
          <button class="qcar-arrow" type="button" data-qcar-step="-1" aria-label="Previous testimonial">
            ${CC.icon('arrow-left')}
          </button>

          <div class="qcar-dots">${dots}</div>

          <button class="qcar-arrow" type="button" data-qcar-step="1" aria-label="Next testimonial">
            ${CC.icon('arrow-right')}
          </button>
        </div>
      </div>`;
  };

  /* ======================================================================
     Behaviour — safe to call repeatedly
     ====================================================================== */

  CC.initComponents = function (scope) {
    const root = scope || document;

    CC.wireBookingButtons(root);

    /* Counters + step reveals + any [data-reveal] container (EditorialCardGrid
       and friends).
       Claimed at observe time, not at fire time — initComponents can be
       called more than once on a page, and two observers on the same
       element would restart a running count-up. */
    const observed = root.querySelectorAll(
      '[data-count]:not([data-counted]), .wsteps-list:not([data-revealed]), [data-reveal]:not([data-revealed])'
    );
    observed.forEach((el) => {
      if (el.dataset.count != null) el.dataset.counted = 'pending';
      else el.dataset.revealed = 'pending';
    });

    if (!('IntersectionObserver' in window)) {
      observed.forEach((el) => {
        if (el.dataset.count != null) {
          el.dataset.counted = '1';
          runCount(el);
        } else {
          el.dataset.revealed = '1';
          el.classList.add('is-in');
        }
      });
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            io.unobserve(el);
            if (el.dataset.count != null) {
              el.dataset.counted = '1';
              runCount(el);
            } else {
              el.dataset.revealed = '1';
              el.classList.add('is-in');
            }
          });
        },
        { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
      );
      observed.forEach((el) => io.observe(el));
    }

    /* ProcessFlow — light each step as it arrives and grow the connecting
       line to match. The fill is a transform so it stays on the compositor;
       under reduced motion the CSS shows it complete and static. */
    root.querySelectorAll('[data-pflow]:not([data-wired])').forEach((flow) => {
      flow.dataset.wired = '1';
      const steps = Array.from(flow.querySelectorAll('[data-pstep]'));
      const fill = flow.querySelector('[data-pflow-fill]');
      if (!steps.length || !fill) return;

      const paint = () => {
        const done = steps.filter((s) => s.classList.contains('is-active')).length;
        fill.style.setProperty('--progress', steps.length ? done / steps.length : 0);
      };

      if (!('IntersectionObserver' in window) || reduceMotion()) {
        steps.forEach((s) => s.classList.add('is-active'));
        paint();
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            e.target.classList.add('is-active');
          });
          paint();
        },
        { threshold: 0.4, rootMargin: '0px 0px -15% 0px' }
      );
      steps.forEach((s) => io.observe(s));
    });

    /* LogoMarquee — the strip holds still on hover and on keyboard focus so
       a name can be read; that pausing is pure CSS. All this does is guard
       the logo images: an entry whose file is missing or renamed falls back
       to its wordmark rather than showing a broken image. `complete` with a
       zero naturalWidth means the load already failed before we got here. */
    root.querySelectorAll('[data-marquee]:not([data-wired])').forEach((mq) => {
      mq.dataset.wired = '1';

      mq.querySelectorAll('.mq-logo').forEach((img) => {
        const fallback = () => {
          const link = img.closest('.mq-link');
          if (link) link.classList.add('is-fallback');
        };
        if (img.complete && !img.naturalWidth) fallback();
        else img.addEventListener('error', fallback);
      });
    });

    /* QuoteCarousel — the viewport is a scroll-snap strip, so swiping is
       native and JS only ever calls scrollTo(). Autoplay stops whenever the
       reader is near it (hover, focus), the tab is hidden, or it scrolls off
       screen, and the live region only announces while autoplay is off. */
    root.querySelectorAll('[data-qcar]:not([data-wired])').forEach((car) => {
      car.dataset.wired = '1';

      const viewport = car.querySelector('[data-qcar-viewport]');
      const slides = Array.from(car.querySelectorAll('[data-qcar-slide]'));
      const dots = Array.from(car.querySelectorAll('[data-qcar-go]'));
      const controls = car.querySelector('.qcar-controls');

      /* A single quote is not a carousel — drop the chrome and leave it. */
      if (!viewport || slides.length < 2) {
        if (controls) controls.hidden = true;
        return;
      }

      const delay = parseInt(car.dataset.qcarInterval, 10) || 7000;
      const origin = slides[0].offsetLeft;

      let index = 0;
      let timer = null;
      let held = 0; /* pointer or focus is on the carousel */
      let onScreen = true;
      let userPaused = false;

      const mark = () => {
        dots.forEach((dot, i) => {
          if (i === index) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      };

      const running = () => !userPaused && !held && onScreen && !document.hidden && !reduceMotion();

      const sync = () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        if (running()) timer = setInterval(() => go(index + 1, true), delay);
        viewport.setAttribute('aria-live', timer ? 'off' : 'polite');
      };

      function go(to, smooth) {
        index = (to + slides.length) % slides.length;
        viewport.scrollTo({
          left: slides[index].offsetLeft - origin,
          behavior: smooth && !reduceMotion() ? 'smooth' : 'auto',
        });
        mark();
      }

      /* With no play/pause control on screen, driving the carousel by hand
         is what stops it: once the reader picks a slide themselves, autoplay
         does not start up again and take the choice back off them. */
      const drive = (to) => {
        userPaused = true;
        go(to, true);
        sync();
      };

      car.querySelectorAll('[data-qcar-step]').forEach((btn) => {
        btn.addEventListener('click', () => drive(index + (parseInt(btn.dataset.qcarStep, 10) || 1)));
      });

      dots.forEach((dot) => {
        dot.addEventListener('click', () => drive(parseInt(dot.dataset.qcarGo, 10) || 0));
      });

      car.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') drive(index + 1);
        else if (event.key === 'ArrowLeft') drive(index - 1);
        else return;
        event.preventDefault();
      });

      const hold = (on) => {
        held = Math.max(0, held + (on ? 1 : -1));
        sync();
      };

      car.addEventListener('mouseenter', () => hold(true));
      car.addEventListener('mouseleave', () => hold(false));
      car.addEventListener('focusin', () => hold(true));
      car.addEventListener('focusout', (event) => {
        if (!car.contains(event.relatedTarget)) hold(false);
      });

      /* Swiping moves the viewport without going through go(), so read the
         index back off the scroll position once it settles. */
      let settle = null;
      viewport.addEventListener(
        'scroll',
        () => {
          clearTimeout(settle);
          settle = setTimeout(() => {
            const x = viewport.scrollLeft;
            let nearest = index;
            let best = Infinity;
            slides.forEach((slide, i) => {
              const gap = Math.abs(slide.offsetLeft - origin - x);
              if (gap < best) {
                best = gap;
                nearest = i;
              }
            });
            if (nearest !== index) {
              index = nearest;
              mark();
            }
          }, 120);
        },
        { passive: true }
      );

      /* Slide width tracks the viewport, so a resize leaves the scroll
         position between two slides. Snap back to the current one. */
      let resized = null;
      window.addEventListener('resize', () => {
        clearTimeout(resized);
        resized = setTimeout(() => go(index, false), 150);
      });

      document.addEventListener('visibilitychange', sync);

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            onScreen = entries[0].isIntersecting;
            sync();
          },
          { threshold: 0.3 }
        );
        io.observe(car);
      }


      mark();
      sync();
    });

    /* accordions */
    root.querySelectorAll('.acc:not([data-wired])').forEach((el) => {
      el.dataset.wired = '1';
      el.addEventListener('click', (event) => {
        const btn = event.target.closest('.acc-btn');
        if (!btn || !el.contains(btn)) return;

        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const open = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.hidden = open;
      });
    });
  };
})(window, document);
