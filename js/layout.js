/* ==========================================================================
   LAYOUT — header, dropdown navigation, mobile menu, footer
   --------------------------------------------------------------------------
   Reads window.CC_NAV / CC_NAV_BUTTONS / CC_FOOTER and renders the shared
   chrome into every page. Each page shell only has to declare:

     <body data-page="programs/undergrad" data-root="../../">

   data-root is the relative path back to the site root, so the whole site
   works from disk (file://) and from any host or sub-folder.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  const ROOT = () => document.body.getAttribute('data-root') || '';
  const PAGE = () => document.body.getAttribute('data-page') || '';

  /* Resolve a root-relative href for the current page's depth. */
  CC.url = function (href) {
    if (!href) return '#';
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return ROOT() + href;
  };

  /* Flatten dropdown children (groups contain nested items). */
  function childLinks(item) {
    const out = [];
    (item.children || []).forEach((c) => {
      if (c.group) (c.items || []).forEach((sub) => out.push(sub));
      else out.push(c);
    });
    return out;
  }

  /* Home > Section > Page trail for the current key. */
  CC.trailFor = function (key) {
    const trail = [{ label: 'Home', href: CC.url('index.html') }];
    if (!key || key === 'home') return trail;

    for (const item of window.CC_NAV || []) {
      if (item.key === key) {
        trail.push({ label: item.label });
        return trail;
      }
      const match = childLinks(item).find((c) => c.key === key);
      if (match) {
        trail.push({ label: item.label, href: CC.url(item.href) });
        trail.push({ label: match.label });
        return trail;
      }

      /* A page one level below a nav child — e.g. updates/deadlines, which
         now sits under Insight > Updates. Its own title comes from
         page-content.js since it is not itself in the nav. */
      const parent = childLinks(item).find((c) => key.indexOf(c.key + '/') === 0);
      if (parent) {
        const page = (window.CC_PAGES || {})[key];
        trail.push({ label: item.label, href: CC.url(item.href) });
        trail.push({ label: parent.label, href: CC.url(parent.href) });
        trail.push({ label: page && page.title ? page.title : key.split('/').pop() });
        return trail;
      }
    }

    const btn = (window.CC_NAV_BUTTONS || []).find((b) => b.key === key);
    if (btn) trail.push({ label: btn.label });
    return trail;
  };

  CC.labelFor = function (key) {
    for (const item of window.CC_NAV || []) {
      if (item.key === key) return item.label;
      const match = childLinks(item).find((c) => c.key === key);
      if (match) return match.label;
    }
    const btn = (window.CC_NAV_BUTTONS || []).find((b) => b.key === key);
    return btn ? btn.label : '';
  };

  /* A key matches if it is the active page, or an ancestor of it — so
     /blog/financial-aid-guide still highlights the Blog button. */
  function isActive(key, activeKey) {
    return key === activeKey || (activeKey || '').indexOf(key + '/') === 0;
  }

  /* ---------- markup ---------- */

  function linkAttrs(item) {
    if (item.doc || item.external || item.newTab) return ` target="_blank" rel="noopener"`;
    return '';
  }

  function dropLink(item, activeKey) {
    const on = item.key === activeKey;
    return `
      <li>
        <a class="drop-link${on ? ' is-active' : ''}" href="${esc(CC.url(item.href))}"${linkAttrs(item)}${
      on ? ' aria-current="page"' : ''
    }>
          <span>${esc(item.label)}</span>
          ${item.doc ? CC.icon('file', 'drop-doc') : ''}
        </a>
      </li>`;
  }

  function dropdown(item, activeKey) {
    const rows = (item.children || [])
      .map((c) => {
        if (!c.group) return dropLink(c, activeKey);
        return `
          <li class="drop-group">
            <p class="drop-group-title">${esc(c.group)}</p>
            <ul class="drop-group-list">${(c.items || []).map((s) => dropLink(s, activeKey)).join('')}</ul>
          </li>`;
      })
      .join('');

    return `<div class="nav-drop"><ul class="drop-list">${rows}</ul></div>`;
  }

  function header(activeKey) {
    const items = (window.CC_NAV || [])
      .map((item) => {
        const childActive = childLinks(item).some((c) => isActive(c.key, activeKey));
        const on = isActive(item.key, activeKey) || childActive;
        const hasDrop = (item.children || []).length > 0;

        return `
        <li class="nav-item${hasDrop ? ' has-drop' : ''}${on ? ' is-active' : ''}">
          <a class="nav-link" href="${esc(CC.url(item.href))}"${on ? ' aria-current="page"' : ''}${
          hasDrop ? ' aria-haspopup="true" aria-expanded="false"' : ''
        }>
            <span>${esc(item.label)}</span>
            ${hasDrop ? CC.icon('chevron-down', 'nav-chev') : ''}
          </a>
          ${hasDrop ? `<button class="nav-toggle" type="button" aria-expanded="false" aria-label="Show ${esc(item.label)} links"></button>` : ''}
          ${hasDrop ? dropdown(item, activeKey) : ''}
        </li>`;
      })
      .join('');

    const buttons = (window.CC_NAV_BUTTONS || [])
      .map((b) => {
        const btnClass = `btn ${b.variant === 'solid' ? 'btn-solid' : 'btn-ghost'} btn-pill${
          isActive(b.key, activeKey) ? ' is-active' : ''
        }`;
        if (b.booking) return CC.BookingTrigger({ label: b.label, btnClass, chevron: false });
        return `<a class="${btnClass}" href="${esc(CC.url(b.href))}">${esc(b.label)}</a>`;
      })
      .join('');

    return `
      <div class="header-inner">
        <a class="brand" href="${esc(CC.url('index.html'))}" aria-label="College Crafters — home">
          <img src="${esc(CC.url('assets/cc-logo.svg'))}" alt="College Crafters" width="1120" height="381">
        </a>

        <nav class="primary-nav" id="primaryNav" aria-label="Main">
          <ul class="nav-list">${items}</ul>
          <div class="nav-actions-mobile">${buttons}</div>
        </nav>

        <div class="header-actions">${buttons}</div>

        <button class="menu-toggle" type="button" aria-controls="primaryNav" aria-expanded="false" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  }

  function footer() {
    const f = window.CC_FOOTER || {};

    const columns = (f.columns || [])
      .map(
        (col) => `
        <div class="footer-col">
          <h2 class="footer-h">${esc(col.title)}</h2>
          <ul>${(col.links || [])
            .map((l) =>
              l.booking
                ? `<li>${CC.BookingTrigger({ label: l.label, btnClass: 'footer-link-btn', align: 'left', chevron: false })}</li>`
                : `<li><a href="${esc(CC.url(l.href))}"${linkAttrs(l)}>${esc(l.label)}</a></li>`
            )
            .join('')}</ul>
        </div>`
      )
      .join('');

    /* Contact details live in CC_CONTENT.site, not CC_FOOTER, so they stay
       next to the booking links they belong with. */
    const site = (window.CC_CONTENT || {}).site || {};
    const contact = [
      site.email
        ? `<a class="footer-contact-link" href="mailto:${esc(site.email)}">${CC.icon('mail')}${esc(site.email)}</a>`
        : '',
      site.phone
        ? `<a class="footer-contact-link" href="tel:${esc(site.phoneLink || site.phone)}">${CC.icon('phone')}${esc(
            site.phone
          )}</a>`
        : '',
    ]
      .filter(Boolean)
      .join('');

    const social = (f.social || [])
      .map(
        (s) =>
          `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${CC.icon(
            s.icon
          )}</a>`
      )
      .join('');

    return `
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-col footer-col--brand">
            <a class="footer-brand" href="${esc(CC.url('index.html'))}" aria-label="College Crafters — home">
              <img src="${esc(CC.url('assets/cc-logo.svg'))}" alt="College Crafters" width="1120" height="381">
            </a>
            ${f.tagline ? `<p class="footer-tagline">${esc(f.tagline)}</p>` : ''}
            ${contact ? `<div class="footer-contact">${contact}</div>` : ''}
            ${social ? `<div class="footer-social">${social}</div>` : ''}
          </div>
          ${columns}
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} College Crafters. All rights reserved.</p>
          ${f.address ? `<p>${esc(f.address)}</p>` : ''}
        </div>
      </div>`;
  }

  /* ---------- behaviour ---------- */

  const DESKTOP = () => window.matchMedia('(min-width: 1280px)').matches;

  function wireHeader(el) {
    const nav = el.querySelector('.primary-nav');
    const menuBtn = el.querySelector('.menu-toggle');
    const items = Array.from(el.querySelectorAll('.nav-item.has-drop'));
    let hoverTimer = null;

    const closeAll = () => {
      items.forEach((li) => {
        li.classList.remove('is-open');
        const link = li.querySelector('.nav-link');
        const toggle = li.querySelector('.nav-toggle');
        if (link && link.hasAttribute('aria-expanded')) link.setAttribute('aria-expanded', 'false');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    };

    const open = (li) => {
      if (li.classList.contains('is-open')) return;
      closeAll();
      li.classList.add('is-open');
      const link = li.querySelector('.nav-link');
      const toggle = li.querySelector('.nav-toggle');
      if (link && link.hasAttribute('aria-expanded')) link.setAttribute('aria-expanded', 'true');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    };

    items.forEach((li) => {
      /* desktop: hover */
      li.addEventListener('mouseenter', () => {
        if (!DESKTOP()) return;
        clearTimeout(hoverTimer);
        open(li);
      });

      li.addEventListener('mouseleave', () => {
        if (!DESKTOP()) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(closeAll, 140);
      });

      /* desktop: keyboard focus anywhere inside opens; leaving closes */
      li.addEventListener('focusin', () => {
        if (DESKTOP()) open(li);
      });

      li.addEventListener('focusout', (event) => {
        if (!DESKTOP()) return;
        if (!li.contains(event.relatedTarget)) closeAll();
      });

      /* mobile: chevron button toggles the accordion, label stays a link */
      const toggle = li.querySelector('.nav-toggle');
      if (toggle) {
        toggle.addEventListener('click', (event) => {
          event.preventDefault();
          if (li.classList.contains('is-open')) {
            li.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            const link = li.querySelector('.nav-link');
            if (link && link.hasAttribute('aria-expanded')) link.setAttribute('aria-expanded', 'false');
          } else {
            open(li);
          }
        });
      }
    });

    /* hamburger */
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        el.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (!open) closeAll();
        /* closing the menu can release the chrome to hide again */
        if (CC.refreshChrome) CC.refreshChrome();
      });
    }

    /* Esc closes everything */
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeAll();
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        el.classList.remove('menu-open');
        if (menuBtn) {
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Open menu');
          menuBtn.focus();
        }
      }
    });

    /* click outside closes desktop dropdowns */
    document.addEventListener('click', (event) => {
      if (!el.contains(event.target)) closeAll();
    });

    /* reset state when crossing the breakpoint */
    window.addEventListener('resize', () => {
      closeAll();
      if (DESKTOP() && nav) {
        nav.classList.remove('is-open');
        el.classList.remove('menu-open');
        if (menuBtn) {
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Open menu');
        }
      }
    });

    /* shadow once scrolled */
    let ticking = false;
    const onScroll = () => {
      el.classList.toggle('is-scrolled', window.scrollY > 8);
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
  }

  /* ---------- announcement bar ---------- */
  /* Always visible — no dismiss control, nothing persisted. */

  function announceBar(a) {
    return `
      <div class="announce-inner">
        <span class="announce-tag">${esc(a.tag)}</span>
        <p class="announce-text">${esc(a.text)}</p>
        <a class="announce-cta" href="${esc(CC.url(a.ctaHref))}"${
      a.ctaNewTab ? ' target="_blank" rel="noopener"' : ''
    }>${esc(a.ctaLabel)}</a>
      </div>`;
  }

  function syncAnnounceHeight(el) {
    const h = el ? el.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--announce-h', h + 'px');
  }

  function mountAnnounceBar() {
    const a = window.CC_ANNOUNCE;
    if (!a || document.querySelector('.announce-bar')) return;

    const bar = document.createElement('div');
    bar.className = 'announce-bar';
    bar.innerHTML = announceBar(a);
    document.body.insertBefore(bar, document.body.firstChild);

    syncAnnounceHeight(bar);
    window.addEventListener('resize', () => syncAnnounceHeight(bar));
  }

  /* ---------- auto-hide chrome ---------- */
  /* The announcement bar and header slide away once the reader scrolls past
     them, and come back at the top of the page or when the pointer moves
     into the top strip. Adds/removes `chrome-hidden` on <html>; the sliding
     itself is CSS (see "AUTO-HIDE CHROME" in css/site.css). */

  function wireChromeAutoHide() {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    if (!header) return;

    const SHOW_AT = 8; /* treat this as "back at the top" */
    const REVEAL_STRIP = 36; /* px from the top that re-reveals on hover */

    let hovering = false;
    let leaveTimer = null;

    const chromeHeight = () => {
      const announce = document.querySelector('.announce-bar');
      return header.offsetHeight + (announce ? announce.offsetHeight : 0);
    };

    /* Never hide while a menu the reader opened is still on screen. */
    const busy = () => {
      const nav = document.querySelector('.primary-nav');
      return (nav && nav.classList.contains('is-open')) || !!document.querySelector('[data-booking].is-open');
    };

    const apply = () => {
      if (hovering || busy() || window.scrollY <= SHOW_AT) {
        root.classList.remove('chrome-hidden');
      } else if (window.scrollY > Math.max(chromeHeight(), 60)) {
        root.classList.add('chrome-hidden');
      }
      /* between the two thresholds the current state is kept, so the chrome
         does not flicker while scrolling across the boundary */
    };

    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          apply();
          ticking = false;
        });
      },
      { passive: true }
    );

    /* Pointer near the top reveals it again. Tracked on mousemove rather
       than with a hit-area element so nothing ever swallows clicks. */
    window.addEventListener(
      'mousemove',
      (event) => {
        const limit = root.classList.contains('chrome-hidden') ? REVEAL_STRIP : chromeHeight() + 8;
        const nearTop = event.clientY <= limit;

        if (nearTop === hovering) return;

        clearTimeout(leaveTimer);
        if (nearTop) {
          hovering = true;
          apply();
        } else {
          leaveTimer = setTimeout(() => {
            hovering = false;
            apply();
          }, 180);
        }
      },
      { passive: true }
    );

    /* Keyboard users: focusing anything in the chrome brings it back. */
    header.addEventListener('focusin', () => {
      hovering = true;
      apply();
    });
    header.addEventListener('focusout', (event) => {
      if (header.contains(event.relatedTarget)) return;
      hovering = false;
      apply();
    });

    CC.refreshChrome = apply;
    apply();
  }

  /* ---------- mount ---------- */

  CC.mountLayout = function () {
    const activeKey = PAGE();

    mountAnnounceBar();

    /* icon sprite, once */
    if (!document.getElementById('cc-sprite')) {
      const holder = document.createElement('div');
      holder.id = 'cc-sprite';
      holder.innerHTML = CC.iconSprite();
      document.body.insertBefore(holder, document.body.firstChild);
    }

    /* skip link */
    if (!document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#main';
      skip.textContent = 'Skip to content';
      document.body.insertBefore(skip, document.body.firstChild);
    }

    const headerEl = document.querySelector('[data-site-header]');
    if (headerEl) {
      headerEl.className = 'site-header';
      headerEl.innerHTML = header(activeKey);
      wireHeader(headerEl);
    }

    const footerEl = document.querySelector('[data-site-footer]');
    if (footerEl) {
      footerEl.className = 'site-footer';
      footerEl.innerHTML = footer();
    }

    wireChromeAutoHide();
  };
})(window, document);
