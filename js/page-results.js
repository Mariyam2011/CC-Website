/* ==========================================================================
   PAGE — Results  (/results)
   --------------------------------------------------------------------------
   Headline stats, three trend charts and a year-by-year acceptance table,
   all drawn from window.CC_RESULTS (js/results-data.js). The banner still
   comes from page-content.js; this module fills [data-results] below it.

   The charts are hand-built inline SVG rather than a charting library: the
   site has no build step and has to keep working off disk, and three small
   charts do not justify a CDN dependency. Each chart re-draws at its real
   pixel width (ResizeObserver), so lines stay 2px and labels stay legible
   on a phone instead of being scaled down with a viewBox.
   ========================================================================== */

(function (window, document) {
  'use strict';

  const CC = (window.CC = window.CC || {});
  const esc = CC.esc;

  const DATA = window.CC_RESULTS || {};
  const YEARS = DATA.years || [];
  const UNIS = DATA.universities || {};

  const TEAL = 'var(--teal)';
  const PEACH = 'var(--peach)';

  /* ---------- formatting ---------- */

  const money = (v) => '$' + (v / 1e6).toFixed(1) + 'M';
  const moneyTick = (v) => (v === 0 ? '$0' : '$' + v / 1e6 + 'M');
  const plain = (v) => String(v);
  const rankLabel = (r) => (typeof r === 'number' ? '#' + r : r);

  /* ======================================================================
     Chart engine — line and bar, one shared hover / keyboard layer
     ====================================================================== */

  /* Round the axis up to a clean step: 107 → 0–120 by 30, $23.9M → $0–25M
     by 5M, 35 → 0–40 by 10. Aims for about five intervals. */
  function niceScale(max) {
    const raw = max / 5 || 1;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 3, 5, 10].map((m) => m * mag).find((s) => s >= raw);
    return { step: step, top: Math.ceil(max / step) * step };
  }

  /* Monotone cubic (the same curve as d3.curveMonotoneX): smooth, but never
     overshoots a data point, so the curve can't imply a dip or peak that
     isn't in the numbers. */
  function monotonePath(pts) {
    const n = pts.length;
    if (n < 3) return 'M' + pts.map((p) => p.join(',')).join('L');

    const slope = (i) => (pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]);
    const t = new Array(n);
    for (let i = 1; i < n - 1; i++) {
      const h0 = pts[i][0] - pts[i - 1][0];
      const h1 = pts[i + 1][0] - pts[i][0];
      const s0 = slope(i - 1);
      const s1 = slope(i);
      const p = (s0 * h1 + s1 * h0) / (h0 + h1);
      t[i] = (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
    }
    t[0] = (3 * slope(0) - t[1]) / 2;
    t[n - 1] = (3 * slope(n - 2) - t[n - 2]) / 2;

    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < n - 1; i++) {
      const dx = (pts[i + 1][0] - pts[i][0]) / 3;
      d += `C${pts[i][0] + dx},${pts[i][1] + dx * t[i]} ${pts[i + 1][0] - dx},${pts[i + 1][1] - dx * t[i + 1]} ${
        pts[i + 1][0]
      },${pts[i + 1][1]}`;
    }
    return d;
  }

  /* Column with a 4px rounded data-end and a square foot on the baseline. */
  function barPath(cx, w, yTop, yBase) {
    const x0 = cx - w / 2;
    const x1 = cx + w / 2;
    const r = Math.max(0, Math.min(4, w / 2, yBase - yTop));
    return `M${x0},${yBase}V${yTop + r}A${r},${r} 0 0 1 ${x0 + r},${yTop}H${x1 - r}A${r},${r} 0 0 1 ${x1},${
      yTop + r
    }V${yBase}Z`;
  }

  function drawChart(chart) {
    const spec = chart.spec;
    const host = chart.plot;
    const width = Math.round(host.clientWidth);
    if (!width) return;

    const rows = spec.rows;
    const n = rows.length;
    const isBar = spec.kind === 'bar';
    const h = spec.height || 260;
    const m = { top: 22, right: isBar ? 8 : 40, bottom: 30, left: 50 };
    const pw = width - m.left - m.right;
    const ph = h - m.top - m.bottom;

    const max = Math.max.apply(null, rows.flatMap((r) => spec.series.map((s) => r[s.key])));
    const scale = niceScale(max);
    const y = (v) => m.top + ph - (v / scale.top) * ph;
    const slot = pw / n;
    /* Bars sit centred in equal slots; line points start a little in from
       the axis so the first marker doesn't sit on the tick labels. */
    const inset = 18;
    const x = isBar
      ? (i) => m.left + slot * (i + 0.5)
      : (i) => m.left + inset + (n === 1 ? (pw - inset) / 2 : ((pw - inset) * i) / (n - 1));
    const tickFmt = spec.tick || plain;
    const valFmt = spec.format || plain;

    let svg = '';

    for (let v = 0; v <= scale.top + 1e-9; v += scale.step) {
      const gy = y(v);
      svg += `<line class="${v === 0 ? 'res-axis' : 'res-grid'}" x1="${m.left}" x2="${width - m.right}" y1="${gy}" y2="${gy}"/>`;
      svg += `<text class="res-tick" x="${m.left - 10}" y="${gy}" text-anchor="end" dominant-baseline="middle">${esc(
        tickFmt(v)
      )}</text>`;
    }

    rows.forEach((r, i) => {
      svg += `<text class="res-tick" x="${x(i)}" y="${h - 8}" text-anchor="middle">${esc(r.year)}</text>`;
    });

    if (isBar) {
      const s = spec.series[0];
      const bw = Math.min(24, slot * 0.5);
      rows.forEach((r, i) => {
        const latest = i === n - 1;
        svg += `<path class="res-bar${latest ? '' : ' res-bar--muted'}" data-i="${i}" style="fill:${s.color}"
                 d="${barPath(x(i), bw, y(r[s.key]), y(0))}"/>`;
      });
      const last = rows[n - 1];
      svg += `<text class="res-end-label res-fade" x="${x(n - 1)}" y="${y(last[s.key]) - 8}" text-anchor="middle">${esc(
        valFmt(last[s.key])
      )}</text>`;
    } else {
      svg += `<line class="res-cross" x1="0" x2="0" y1="${m.top}" y2="${y(0)}"/>`;

      spec.series.forEach((s, si) => {
        const pts = rows.map((r, i) => [x(i), y(r[s.key])]);
        const d = monotonePath(pts);

        if (s.area) {
          const gid = `${chart.id}-fill-${si}`;
          svg += `<defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" style="stop-color:${s.color};stop-opacity:0.14"/>
                    <stop offset="1" style="stop-color:${s.color};stop-opacity:0.01"/>
                  </linearGradient></defs>`;
          svg += `<path class="res-area res-fade" fill="url(#${gid})"
                   d="${d}L${pts[n - 1][0]},${y(0)}L${pts[0][0]},${y(0)}Z"/>`;
        }

        svg += `<path class="res-line" pathLength="1" style="stroke:${s.color}" d="${d}"/>`;

        pts.forEach((p, i) => {
          svg += `<circle class="res-dot res-fade${i === n - 1 ? ' res-dot--end' : ''}" data-i="${i}"
                   style="fill:${s.color}" cx="${p[0]}" cy="${p[1]}" r="${i === n - 1 ? 5 : 4}"/>`;
        });

        const end = pts[n - 1];
        svg += `<text class="res-end-label res-fade" x="${end[0] + 11}" y="${end[1]}" dominant-baseline="middle">${esc(
          valFmt(rows[n - 1][s.key])
        )}</text>`;
      });
    }

    host.innerHTML = `<svg width="${width}" height="${h}" viewBox="0 0 ${width} ${h}" aria-hidden="true" focusable="false">${svg}</svg>`;
    chart.xs = rows.map((_, i) => x(i));
    chart.plotTop = m.top;
    chart.width = width;

    if (chart.active != null) setActive(chart, chart.active);
  }

  /* One tooltip per chart, listing every series at the hovered year. Built
     with textContent rather than innerHTML — values lead, labels follow. */
  function fillTooltip(chart, i) {
    const spec = chart.spec;
    const row = spec.rows[i];
    const tip = chart.tip;
    tip.textContent = '';

    const title = document.createElement('p');
    title.className = 'res-tip-year';
    title.textContent = row.year;
    tip.appendChild(title);

    spec.series.forEach((s) => {
      const line = document.createElement('p');
      line.className = 'res-tip-row';
      const key = document.createElement('span');
      key.className = 'res-tip-key';
      key.style.background = s.color;
      const value = document.createElement('strong');
      value.textContent = (spec.format || plain)(row[s.key]);
      const label = document.createElement('span');
      label.textContent = s.label;
      line.append(key, value, label);
      tip.appendChild(line);
    });

    if (spec.note) {
      const note = document.createElement('p');
      note.className = 'res-tip-note';
      note.textContent = spec.note(row);
      tip.appendChild(note);
    }
  }

  function setActive(chart, i) {
    chart.active = i;
    const svg = chart.plot.querySelector('svg');
    if (!svg || chart.xs == null) return;

    svg.querySelectorAll('[data-i]').forEach((el) => el.classList.toggle('is-active', Number(el.dataset.i) === i));

    const cx = chart.xs[i];
    const cross = svg.querySelector('.res-cross');
    if (cross) {
      cross.setAttribute('x1', cx);
      cross.setAttribute('x2', cx);
      cross.classList.add('is-on');
    }

    fillTooltip(chart, i);
    const tip = chart.tip;
    tip.classList.add('is-on');

    /* Sit beside the crosshair, at the top of the plot; flip to the left
       side when it would run off the right edge. */
    const tw = tip.offsetWidth;
    let left = cx + 14;
    if (left + tw > chart.width) left = cx - 14 - tw;
    tip.style.left = Math.max(0, left) + 'px';
    tip.style.top = chart.plotTop + 'px';
  }

  function clearActive(chart) {
    chart.active = null;
    chart.tip.classList.remove('is-on');
    chart.plot.querySelectorAll('.is-active').forEach((el) => el.classList.remove('is-active'));
    const cross = chart.plot.querySelector('.res-cross');
    if (cross) cross.classList.remove('is-on');
  }

  function nearest(chart, px) {
    let best = 0;
    chart.xs.forEach((x, i) => {
      if (Math.abs(px - x) < Math.abs(px - chart.xs[best])) best = i;
    });
    return best;
  }

  function wireChart(figure, spec) {
    const chart = {
      id: figure.id,
      spec: spec,
      plot: figure.querySelector('[data-chart-plot]'),
      tip: figure.querySelector('[data-chart-tip]'),
      live: figure.querySelector('[data-chart-live]'),
      frame: figure.querySelector('[data-chart]'),
      active: null,
    };

    const onPointer = (event) => {
      if (!chart.xs) return;
      const rect = chart.plot.getBoundingClientRect();
      setActive(chart, nearest(chart, event.clientX - rect.left));
    };
    chart.frame.addEventListener('pointermove', onPointer);
    chart.frame.addEventListener('pointerdown', onPointer);
    chart.frame.addEventListener('pointerleave', () => {
      if (document.activeElement !== chart.frame) clearActive(chart);
    });

    /* Keyboard: the chart is one tab stop; arrows step through the years and
       announce each one, so nothing here is hover-only. */
    const last = spec.rows.length - 1;
    const announce = (i) => {
      const row = spec.rows[i];
      const parts = spec.series.map((s) => `${s.label} ${(spec.format || plain)(row[s.key])}`);
      chart.live.textContent = `${row.year}: ${parts.join(', ')}${spec.note ? '. ' + spec.note(row) : ''}.`;
    };
    chart.frame.addEventListener('focus', () => {
      const i = chart.active == null ? last : chart.active;
      setActive(chart, i);
      announce(i);
    });
    chart.frame.addEventListener('blur', () => clearActive(chart));
    chart.frame.addEventListener('keydown', (event) => {
      const cur = chart.active == null ? last : chart.active;
      let next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(last, cur + 1);
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(0, cur - 1);
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
      else if (event.key === 'Escape') return clearActive(chart);
      else return;
      event.preventDefault();
      setActive(chart, next);
      announce(next);
    });

    drawChart(chart);

    if ('ResizeObserver' in window) {
      let lastWidth = chart.width;
      let frame = 0;
      new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (Math.round(chart.plot.clientWidth) === lastWidth) return;
          drawChart(chart);
          lastWidth = chart.width;
        });
      }).observe(chart.plot);
    } else {
      window.addEventListener('resize', () => drawChart(chart));
    }
  }

  /* Card shell for one chart. The SVG is decorative to assistive tech; the
     same numbers are in a visually hidden table right beside it. */
  function chartCard(id, spec, opts) {
    const o = opts || {};
    const head = spec.series
      .map((s) => `<th scope="col">${esc(s.label)}</th>`)
      .join('');
    const body = spec.rows
      .map(
        (r) =>
          `<tr><th scope="row">${esc(r.year)}</th>${spec.series
            .map((s) => `<td>${esc((spec.format || plain)(r[s.key]))}</td>`)
            .join('')}</tr>`
      )
      .join('');

    const legend =
      spec.series.length > 1
        ? `<ul class="res-legend">${spec.series
            .map((s) => `<li><span class="res-legend-key" style="background:${s.color}"></span>${esc(s.label)}</li>`)
            .join('')}</ul>`
        : '';

    return `
      <figure class="res-card${o.wide ? ' res-card--wide' : ''}" id="${esc(id)}">
        <figcaption class="res-card-title">${esc(spec.title)}</figcaption>
        ${o.note ? `<p class="res-card-note">${CC.icon('globe')}<span>${o.note}</span></p>` : ''}
        ${legend}
        <div class="res-chart" data-chart data-reveal tabindex="0" role="group"
             aria-label="${esc(spec.title)} chart, ${esc(spec.rows[0].year)} to ${esc(
               spec.rows[spec.rows.length - 1].year
             )}. Use the left and right arrow keys to read each year.">
          <div class="res-plot" data-chart-plot style="height:${spec.height || 260}px"></div>
          <div class="res-tip" data-chart-tip aria-hidden="true"></div>
        </div>
        <p class="visually-hidden" data-chart-live aria-live="polite"></p>
        <table class="visually-hidden">
          <caption>${esc(spec.title)} by year</caption>
          <thead><tr><th scope="col">Year</th>${head}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </figure>`;
  }

  /* ======================================================================
     Year explorer — tabs, four tiles and the university table
     ====================================================================== */

  function yearPanel(year) {
    const row = YEARS.find((r) => r.year === year) || {};
    const unis = UNIS[year] || [];

    const tile = (tone, label, value, sub) => `
      <div class="res-tile res-tile--${tone}">
        <p class="res-tile-label">${esc(label)}</p>
        <p class="res-tile-value">${esc(value)}</p>
        <p class="res-tile-sub">${esc(sub)}</p>
      </div>`;

    const rows = unis.length
      ? unis
          .map(
            (u) => `
          <tr>
            <td class="res-rank">${esc(rankLabel(u.rank))}</td>
            <td>${esc(u.name)}</td>
            <td class="res-num">${esc(u.total)}</td>
            <td class="res-num${u.aid > 0 ? ' res-num--aid' : ' res-num--none'}">${esc(u.aid)}</td>
          </tr>`
          )
          .join('')
      : `<tr><td class="res-empty" colspan="4">University list coming soon.</td></tr>`;

    return `
      <div class="res-tiles">
        ${tile('teal', 'Total acceptances', plain(row.total), `${row.enrolled} students enrolled`)}
        ${tile('peach', 'Financial aid/scholarships', money(row.scholarships), `${row.aid} students received aid`)}
        ${tile('peach', 'Ivys, Stanford & MIT', plain(row.ivyStanfordMIT), 'Elite institutions')}
        ${tile('peach', 'Top 20 universities', plain(row.top20), 'US News rankings')}
      </div>
      <div class="uni-table-wrap res-table-wrap" tabindex="0" role="region" aria-label="Universities, ${esc(year)}">
        <table class="res-table">
          <caption class="visually-hidden">Universities that admitted College Crafters students in ${esc(year)}</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">University</th>
              <th scope="col" class="res-num">Total</th>
              <th scope="col" class="res-num">With aid</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  function yearExplorer() {
    const years = YEARS.map((r) => r.year).reverse();
    const current = years[0];
    const soon = (DATA.comingSoon || []).filter((y) => years.indexOf(y) === -1);

    const tabs =
      soon
        .map(
          (y) => `
        <button class="filter res-year" type="button" role="tab" aria-selected="false" disabled>
          ${esc(y)} <span class="res-soon">Coming soon</span>
        </button>`
        )
        .join('') +
      years
        .map(
          (y) => `
        <button class="filter res-year" type="button" role="tab" id="res-tab-${esc(y)}" data-year="${esc(y)}"
                aria-controls="res-year-panel" aria-selected="${y === current}" tabindex="${y === current ? 0 : -1}">${esc(
                  y
                )}</button>`
        )
        .join('');

    return `
      <div class="res-explorer" data-year-explorer>
        <div class="res-years" role="tablist" aria-label="Choose an admissions cycle">${tabs}</div>
        <div class="res-year-panel" id="res-year-panel" role="tabpanel" aria-labelledby="res-tab-${esc(current)}">
          ${yearPanel(current)}
        </div>
      </div>`;
  }

  /* Standard APG tabs: one tab stop, arrow keys move between years, the
     disabled "Coming soon" pill is skipped. */
  function wireYearExplorer(el) {
    const tabs = Array.from(el.querySelectorAll('[data-year]'));
    const panel = el.querySelector('[role="tabpanel"]');

    const select = (index, focus) => {
      tabs.forEach((t, i) => {
        const on = i === index;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      const tab = tabs[index];
      panel.setAttribute('aria-labelledby', tab.id);
      panel.innerHTML = yearPanel(tab.dataset.year);
      if (focus) tab.focus();
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
  }

  /* ======================================================================
     Page
     ====================================================================== */

  (CC.pageModules = CC.pageModules || {})['results'] = function () {
    const root = document.querySelector('[data-results]');
    if (!root || !YEARS.length) return;

    const first = YEARS[0];
    const latest = YEARS[YEARS.length - 1];
    const growth = Math.round(((latest.total - first.total) / first.total) * 100);

    const charts = {
      acceptances: {
        title: 'Acceptance growth trajectory',
        kind: 'line',
        rows: YEARS,
        series: [{ key: 'total', label: 'Acceptances', color: TEAL, area: true }],
        note: (r) => `${r.enrolled} students enrolled`,
      },
      aid: {
        title: 'Financial aid/scholarships awarded',
        kind: 'bar',
        rows: YEARS,
        series: [{ key: 'scholarships', label: 'Aid & scholarships', color: PEACH }],
        format: money,
        tick: moneyTick,
        note: (r) => `${r.aid} students received aid`,
      },
      elite: {
        title: 'Ivys, Stanford, MIT & Top-20 outcomes',
        kind: 'line',
        height: 300,
        rows: YEARS,
        series: [
          { key: 'ivyStanfordMIT', label: 'Ivys, Stanford & MIT', color: TEAL },
          { key: 'top20', label: 'Top 20 universities', color: PEACH },
        ],
      },
    };

    root.innerHTML = `
      <section class="page-section page-section--white">
        <div class="wrap">
          <p class="res-intro">
            Our students secured <strong class="res-hl">${esc(latest.total)} acceptances</strong> in the
            ${esc(latest.year)} cycle, with <strong class="res-hl res-hl--peach">${esc(
              money(latest.scholarships)
            )}+ in financial aid/scholarships</strong>. Six years of transforming dreams into acceptances across the
            USA, UK, and Canada.
          </p>
          <div class="res-stats">
            ${CC.StatCounter([
              { value: latest.total, label: `Total acceptances ${latest.year}`, sub: `${growth}% growth since ${first.year}` },
              {
                value: latest.scholarships / 1e6,
                decimals: 1,
                prefix: '$',
                suffix: 'M',
                label: 'Financial aid/scholarships',
                sub: `${latest.aid} students received aid`,
              },
              { value: latest.ivyStanfordMIT, label: 'Ivys, Stanford & MIT', sub: 'Elite institutions' },
              { value: latest.top20, label: 'Top 20 universities', sub: 'US News rankings' },
            ])}
          </div>
        </div>
      </section>

      <section class="page-section page-section--tint">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: `${first.year}–${latest.year}`,
            title: 'How the results have grown',
          })}
          <div class="res-charts">
            ${chartCard('res-chart-acceptances', charts.acceptances)}
            ${chartCard('res-chart-aid', charts.aid)}
            ${chartCard('res-chart-elite', charts.elite, {
              wide: true,
              note: 'Each Ivy League and Top-20 university typically admits only <strong>2–3 students from Pakistan</strong> per year.',
            })}
          </div>
        </div>
      </section>

      <section class="page-section page-section--white">
        <div class="wrap">
          ${CC.SectionHead({
            eyebrow: 'Year by year',
            title: 'Detailed acceptances by year',
            lede: 'Pick a cycle to see every university that admitted our students that year.',
          })}
          ${yearExplorer()}
        </div>
      </section>`;

    wireChart(document.getElementById('res-chart-acceptances'), charts.acceptances);
    wireChart(document.getElementById('res-chart-aid'), charts.aid);
    wireChart(document.getElementById('res-chart-elite'), charts.elite);
    wireYearExplorer(root.querySelector('[data-year-explorer]'));
  };
})(window, document);
