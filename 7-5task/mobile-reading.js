/* ============================================================
 * 七选五（阅读还原）手机版 · mobile-reading.js
 * ------------------------------------------------------------
 * 配合 mobile-reading.css，只做手机端「目录 → 答题」的增补逻辑。
 *
 * ⚠ 关键约束：app.js 是 IIFE，**不向 window 暴露任何函数或状态**
 *   （setView / renderExam / state 全在闭包里）。
 *   因此本文件一律不做「包装 window.xxx」，只靠两条零侵入通道：
 *     ① MutationObserver 观察 #mainContent → 视图切换 / 重渲染后统一收尾
 *     ② 事件委托（document 上的 click，捕获阶段）+ setInterval 轻量轮询
 *   这样即使 app.js 内部怎么改，本文件也不会抛错中断它。
 *
 * 五件事：
 *   1. 答题页分屏（纯 CSS，≤880px 自动生效）+ 拖拽条三档
 *   2. 点空 / 换空后，把「当前空格 + 本题证据高亮」自动滚进上半屏可视区
 *   3. 底部「上一空 / 下一空」快跳条（按 app.js 的推荐突破顺序走）
 *   4. 真题目录：筛选收成一行 + 「更多」抽屉（来源 / 年份 / 进度）
 *   5. 目录行「已做 / 未做」标记（从卡片状态「3 / 5」反推）
 * ============================================================ */
(function () {
  'use strict';

  var MOBILE_MAX = 880;
  var SHEET_KEY = 'reading_mobile_sheet_v1';
  var FILTER_KEY = 'reading_mobile_filter_v1';
  var MIN_PANEL_PX = 128;
  var STOPS = [44, 68, 17];               /* 分屏 / 看解析 / 看原文 */
  var state = { on: false, pct: 44, lastNumber: null, lastView: null };

  function $(id) { return document.getElementById(id); }
  function body() { return document.body; }
  function narrow() { return window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches; }
  function examActive() { var v = $('#examView'); return !!(v && v.classList.contains('active')); }
  function guidePanel() { return document.querySelector('#examView .exam-guide'); }
  function readingPanel() { return document.querySelector('#examView .exam-reading'); }
  function winH() {
    var vv = window.visualViewport;
    return Math.round((vv && vv.height) || window.innerHeight || 640);
  }

  /* ---------- 从 DOM 反推做题状态（app.js 内部状态读不到，只能读渲染结果） ---------- */
  function blankNumbers() {
    return [].map.call(document.querySelectorAll('#examView .exam-blank'), function (el) {
      return Number((el.textContent || '').match(/^\s*(\d+)/)?.[1] || 0);
    }).filter(Boolean).sort(function (a, b) { return a - b; });
  }

  function solvedNumbers() {
    return [].map.call(document.querySelectorAll('#examView .exam-blank.correct'), function (el) {
      return Number((el.textContent || '').match(/^\s*(\d+)/)?.[1] || 0);
    }).filter(Boolean);
  }

  function currentNumber() {
    var el = document.querySelector('#examView .exam-blank.current');
    if (!el) return null;
    return Number((el.textContent || '').match(/^\s*(\d+)/)?.[1] || 0) || null;
  }

  /* 推荐突破顺序：优先取「绝杀总结」表格，其次取题目推荐顺序按钮，最后退回 1..N */
  function solveOrder() {
    var numbers = blankNumbers();
    var order = [];
    function push(n) { if (n && order.indexOf(n) < 0) order.push(n); }
    [].forEach.call(document.querySelectorAll('#examView .summary-row b'), function (b) { push(Number(b.textContent || 0)); });
    [].forEach.call(document.querySelectorAll('#examView .exam-order-button b'), function (b) { push(Number(b.textContent || 0)); });
    numbers.forEach(push);
    return order.length ? order : numbers;
  }

  /* ============================================================
   * 一、分屏开关
   * ============================================================ */
  function wantOn() {
    if (!narrow()) return false;
    if (!body().classList.contains('module-seven-choice')) return false;
    /* 与 CSS 同源：只要答题页在场（innerHTML 已渲染）就该分屏，
       不依赖 .active（app.js 先写 innerHTML 再 setView，中间态会误判）。 */
    return !!(guidePanel() && readingPanel());
  }

  function loadPct() {
    try {
      var v = Number(localStorage.getItem(SHEET_KEY));
      if (v >= 10 && v <= 84) return v;
    } catch (e) {}
    return 44;
  }
  function savePct(v) { try { localStorage.setItem(SHEET_KEY, String(Math.round(v))); } catch (e) {} }

  function setPanelPx(px) {
    var panel = guidePanel();
    if (!panel) return;
    var min = Math.min(MIN_PANEL_PX, Math.round(winH() * 0.3));
    /* 给原文留下限：解析再长也不能把原文挤到 5 行以下 */
    var reserve = Math.min(Math.round(winH() * 0.38), 300);
    var max = Math.max(min, winH() - reserve);
    var h = Math.max(min, Math.min(max, Math.round(px)));
    panel.style.height = h + 'px';
    state.pct = Math.round(h / winH() * 100);
    syncHandleHint();
  }

  function applyPct() {
    var panel = guidePanel();
    if (panel) panel.style.flexBasis = 'auto';
    setPanelPx(winH() * state.pct / 100);
  }

  function stopLabel(pct) {
    if (pct <= 24) return '看原文';
    if (pct >= 62) return '看解析';
    return '分屏';
  }

  function nextStop() {
    var best = 0;
    var bestD = Infinity;
    STOPS.forEach(function (stop, i) {
      var d = Math.abs(stop - state.pct);
      if (d < bestD) { bestD = d; best = i; }
    });
    if (bestD > 6) return STOPS[0];
    return STOPS[(best + 1) % STOPS.length];
  }

  function syncHandleHint() {
    var hint = document.querySelector('.sheet-handle-hint');
    if (hint) hint.textContent = stopLabel(state.pct) + ' · 上下拖动调高低 / 轻点换档';
  }

  function ensureHandle() {
    var panel = guidePanel();
    if (!panel) return null;
    var exist = panel.querySelector('.sheet-handle');
    if (exist) return exist;
    var handle = document.createElement('button');
    handle.type = 'button';
    handle.className = 'sheet-handle';
    handle.setAttribute('aria-label', '拖动调整下方面板高度，轻点在看原文、分屏、看解析三档间切换');
    handle.innerHTML = '<span class="sheet-handle-bar"></span><span class="sheet-handle-hint"></span>';
    panel.insertBefore(handle, panel.firstChild);
    bindHandle(handle, panel);
    syncHandleHint();
    return handle;
  }

  function bindHandle(handle, panel) {
    var drag = null;
    function start(e) {
      if (e.button !== undefined && e.button !== 0) return;
      drag = { y0: e.clientY, h0: panel.getBoundingClientRect().height, moved: false };
      body().classList.add('sheet-dragging');
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      if (e.cancelable) e.preventDefault();
    }
    function move(e) {
      if (!drag) return;
      var dy = e.clientY - drag.y0;
      if (Math.abs(dy) > 4) drag.moved = true;
      setPanelPx(drag.h0 - dy);
    }
    function end(e) {
      if (!drag) return;
      var moved = drag.moved;
      drag = null;
      body().classList.remove('sheet-dragging');
      try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
      if (!moved) setPanelPx(winH() * nextStop() / 100);
      savePct(state.pct);
      syncHandleHint();
    }
    /* 轻点换档：PointerEvent 分支在「没有真实按下」时（如键盘回车、脚本 click、
       辅助技术触发）不会走 end()，所以补一条 click 兜底。
       真实触摸/鼠标轻点时 end() 已经把 moved 判为 false 并换过档，
       这里用 _justCycled 时间戳避免一次轻点换两档。 */
    handle.addEventListener('click', function (e) {
      if (e.detail === 0) { /* 键盘/脚本触发，直接换档 */ }
      if (Date.now() - (handle._cycledAt || 0) < 400) return;
      setPanelPx(winH() * nextStop() / 100);
      savePct(state.pct);
      handle._cycledAt = Date.now();
      syncHandleHint();
    });
    if (window.PointerEvent) {
      handle.addEventListener('pointerdown', start);
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', end);
      handle.addEventListener('pointercancel', end);
    } else {
      handle.addEventListener('mousedown', start);
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', end);
      handle.addEventListener('touchstart', function (e) { var t = e.touches[0]; if (t) start({ clientY: t.clientY, button: 0 }); }, { passive: true });
      handle.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) move({ clientY: t.clientY }); }, { passive: true });
      handle.addEventListener('touchend', function () { end({}); });
    }
  }

  /* ============================================================
   * 二、把「当前空格 + 本题证据」滚进上半屏可视区
   * ============================================================ */
  function revealBlank(number) {
    var box = readingPanel();
    if (!box || !number) return;
    var blank = null;
    [].forEach.call(box.querySelectorAll('.exam-blank'), function (el) {
      var n = Number((el.textContent || '').match(/^\s*(\d+)/)?.[1] || 0);
      if (n === number) blank = el;
    });
    if (!blank) return;

    var boxRect = box.getBoundingClientRect();
    var viewH = boxRect.height;
    if (viewH < 40) return;

    var head = box.querySelector('.panel-heading');
    var sticky = head ? head.offsetHeight : 0;
    var pad = 10;
    var br = blank.getBoundingClientRect();
    var top = br.top;
    var bottom = br.bottom;

    /* 本题证据高亮（.evidence-mark）：按离空格远近逐条收纳 */
    var marks = [].map.call(box.querySelectorAll('.evidence-mark'), function (m) {
      var r = m.getBoundingClientRect();
      return { t: r.top, b: r.bottom, d: Math.min(Math.abs(r.top - br.bottom), Math.abs(br.top - r.bottom)) };
    }).filter(function (m) { return m.b > m.t; }).sort(function (a, b) { return a.d - b.d; });

    marks.forEach(function (m) {
      var nt = Math.min(top, m.t);
      var nb = Math.max(bottom, m.b);
      if (nb - nt <= viewH - sticky - pad * 2) { top = nt; bottom = nb; }
    });

    var span = bottom - top;
    var delta = span <= viewH - sticky - pad * 2
      ? top - boxRect.top - sticky - (viewH - sticky - span) / 2
      : br.top - boxRect.top - sticky - Math.max(24, (viewH - sticky) * 0.28);

    if (Math.abs(delta) < 2) return;
    var target = Math.max(0, box.scrollTop + delta);
    try { box.scrollTo({ top: target, behavior: 'smooth' }); }
    catch (e) { box.scrollTop = target; }
  }

  /* ============================================================
   * 三、底部「上一空 / 下一空」快跳条
   * ============================================================ */
  function quickNav() {
    var bar = $('examQuickNav');
    if (bar) return bar;
    bar = document.createElement('nav');
    bar.id = 'examQuickNav';
    bar.className = 'exam-quick-nav';
    bar.setAttribute('aria-label', '上一空 / 下一空');
    bar.innerHTML = '<button type="button" class="eqn-prev">‹ 上一空</button>'
      + '<span class="eqn-status"></span>'
      + '<button type="button" class="eqn-next">下一空 ›</button>';
    body().appendChild(bar);
    bar.querySelector('.eqn-prev').addEventListener('click', function () { jumpBlank(-1); });
    bar.querySelector('.eqn-next').addEventListener('click', function () { jumpBlank(1); });
    return bar;
  }

  /* 只在「第五步逐空作答」面板在场时显示 */
  function solving() {
    /* 只看第五步逐空作答面板是否在场，不再看 .active（时序会落后一帧） */
    return !!document.querySelector('#examView .solve-heading');
  }

  function syncQuickNav() {
    var bar = quickNav();
    /* 只看「第五步逐空作答」是否真的在台上，不依赖 state.on（时序可能落后一帧） */
    if (!narrow() || !solving()) { bar.hidden = true; return; }
    bar.hidden = false;

    var order = solveOrder();
    var total = blankNumbers().length;
    var done = solvedNumbers().length;
    var now = currentNumber() || order[0];
    var pos = Math.max(0, order.indexOf(now));

    bar.querySelector('.eqn-prev').disabled = pos <= 0;
    bar.querySelector('.eqn-next').disabled = pos >= order.length - 1;
    var label = '第 ' + now + ' 空 · 第 ' + (pos + 1) + '/' + order.length + ' 空 · 已完成 ' + done + '/' + total;
    var status = bar.querySelector('.eqn-status');
    if (status.textContent !== label) status.textContent = label;
  }

  /* 切空：直接点左侧原文里对应空格的按钮（app.js 对空格有委托点击处理） */
  function jumpBlank(step) {
    var order = solveOrder();
    if (!order.length) return;
    var now = currentNumber() || order[0];
    var pos = order.indexOf(now);
    var next = order[Math.max(0, Math.min(order.length - 1, pos + step))];
    if (!next || next === now) return;

    /* app.js 的「切空」只有两条路：
       ① 第五步答对后自动前进（exam-guide-next-question 按钮，未答对时不渲染）
       ② 「绝杀总结 / 分步解析」里的行点击（data-review-question）
       两者都不适合「想先看下一空再作答」。所以这里做一件只影响视野的事：
       把下一空滚进原文可视区，并让它临时高亮；作答焦点仍由 app.js 决定。
       这样既不干扰判分逻辑，也解决了手机上「找不到下一个空在哪」的痛点。 */
    var box = readingPanel();
    if (!box) return;
    var target = null;
    [].forEach.call(box.querySelectorAll('.exam-blank'), function (el) {
      var n = Number((el.textContent || '').match(/^\s*(\d+)/)?.[1] || 0);
      if (n === next) target = el;
    });
    if (!target) return;

    [].forEach.call(box.querySelectorAll('.exam-blank.eqn-focus'), function (el) { el.classList.remove('eqn-focus'); });
    target.classList.add('eqn-focus');
    window.setTimeout(function () { target.classList.remove('eqn-focus'); }, 1600);
    revealBlank(next);

    /* 状态条同步显示「下一空」，避免只看到高亮却不知道是哪一空 */
    var bar = $('examQuickNav');
    if (bar) {
      var st = bar.querySelector('.eqn-status');
      if (st) {
        var done = solvedNumbers().length;
        st.textContent = '看第 ' + next + ' 空 · ' + (pos + step + 1) + '/' + order.length + ' · 已完成 ' + done + '/' + blankNumbers().length;
      }
    }
    syncQuickNav();
  }
  /* ============================================================
   * 四、真题目录：筛选一行 + 更多抽屉
   * ============================================================ */
  var filter = { source: 'all', year: 'all', done: 'all' };

  function loadFilter() {
    try {
      var saved = JSON.parse(localStorage.getItem(FILTER_KEY) || '{}');
      ['source', 'year', 'done'].forEach(function (k) { if (saved[k]) filter[k] = String(saved[k]); });
    } catch (e) {}
  }
  function saveFilter() { try { localStorage.setItem(FILTER_KEY, JSON.stringify(filter)); } catch (e) {} }

  function examCards() { return [].slice.call(document.querySelectorAll('#examList .exam-card')); }

  /* 已做判定：app.js 的卡片状态只有两种文案 ——
   *   未做 → "待完成"；做过 → "3 / 5"（答对几空 / 总空数）。
   * 所以「不是待完成」即为已做，比解析分数更稳（数据源改口径也不会错）。 */
  function cardMeta(card) {
    var srcEl = card.querySelector('.exam-card-main span');
    var src = srcEl ? srcEl.textContent : '';
    var statusText = (card.querySelector('.exam-card-status')?.textContent || '').trim();
    var done = card.dataset.done === '1';
    /* app.js 的卡片状态只有两种：未做 "待完成"；做过 "3 / 5"（答对几空 / 总空数）。
       所以「不是待完成」即为已做；即便今后改成 "0 / 5"（做了但全错）也算已做。 */
    if (!done && statusText && !/^待完成$/.test(statusText)) done = true;
    var ym = src.match(/20(2[0-9])/);
    var group = card.closest('.exam-category-group');
    return {
      done: done,
      year: ym ? '20' + ym[1] : '0',
      kind: (group && group.classList.contains('exam-category-mock')) ? 'mock' : 'real'
    };
  }

  function markDone() {
    examCards().forEach(function (card) {
      if (cardMeta(card).done) card.dataset.done = '1';
      else delete card.dataset.done;
    });
  }

  function applyFilter() {
    var cards = examCards();
    cards.forEach(function (card) {
      var meta = cardMeta(card);
      var ok = true;
      if (filter.source !== 'all' && meta.kind !== filter.source) ok = false;
      if (filter.year !== 'all' && meta.year !== filter.year) ok = false;
      if (filter.done === 'todo' && meta.done) ok = false;
      if (filter.done === 'done' && !meta.done) ok = false;
      card.hidden = !ok;
    });
    [].forEach.call(document.querySelectorAll('#examList .exam-year-group'), function (group) {
      group.hidden = ![].some.call(group.querySelectorAll('.exam-card'), function (c) { return !c.hidden; });
    });
    [].forEach.call(document.querySelectorAll('#examList .exam-category-group'), function (group) {
      group.hidden = ![].some.call(group.querySelectorAll('.exam-card'), function (c) { return !c.hidden; });
    });
    syncFilterControls(cards);
  }

  function activeCount() {
    var n = 0;
    if (filter.source !== 'all') n++;
    if (filter.year !== 'all') n++;
    if (filter.done !== 'all') n++;
    return n;
  }

  function syncFilterControls(cards) {
    cards = cards || examCards();
    var bar = $('examFilterBar');
    var open = !!(bar && bar.classList.contains('more-open'));
    var visible = cards.filter(function (c) { return !c.hidden; }).length;
    var status = document.querySelector('#examFilterStatus');
    if (status) status.textContent = activeCount() ? visible + '/' + cards.length + ' 篇' : cards.length + ' 篇';

    [].forEach.call(document.querySelectorAll('#examFilterBar .exam-filter-chip'), function (chip) {
      chip.classList.toggle('active', filter[chip.dataset.filterDim] === chip.dataset.filterValue);
    });

    var more = document.querySelector('#examFilterMore');
    if (more) {
      more.setAttribute('aria-expanded', open ? 'true' : 'false');
      var n = activeCount();
      var count = more.querySelector('.efm-count');
      if (count) { count.textContent = String(n); count.hidden = !n; }
      var label = more.querySelector('.efm-label');
      if (label) label.textContent = (n && !open) ? '已筛选' + n : '更多';
    }
    var clear = document.querySelector('.efsh-clear');
    if (clear) clear.hidden = !activeCount();
    var sheetCount = document.querySelector('.efsh-count');
    if (sheetCount) { sheetCount.textContent = activeCount() + ' 项'; sheetCount.hidden = !activeCount(); }
  }

  function buildFilterBar() {
    var heading = document.querySelector('#trainingView .section-heading');
    if (!heading) return;
    var cards = examCards();
    if (!cards.length) return;

    var bar = $('examFilterBar');
    if (bar) { syncFilterControls(cards); return; }

    var years = {};
    cards.forEach(function (c) { var y = cardMeta(c).year; if (y !== '0') years[y] = true; });
    var yearList = Object.keys(years).sort().reverse();
    var realCount = cards.filter(function (c) { return cardMeta(c).kind === 'real'; }).length;
    var mockCount = cards.length - realCount;
    var doneCount = cards.filter(function (c) { return cardMeta(c).done; }).length;

    function chip(dim, value, label, num) {
      return '<button type="button" class="exam-filter-chip" data-filter-dim="' + dim + '" data-filter-value="' + value + '">'
        + label + (num ? '<span class="chip-num">' + num + '</span>' : '') + '</button>';
    }

    bar = document.createElement('div');
    bar.id = 'examFilterBar';
    bar.className = 'exam-filter-bar';
    bar.innerHTML =
      '<div class="exam-filter-row">'
      + '<div class="exam-filter-chips" role="group" aria-label="来源">'
      + chip('source', 'all', '全部', cards.length)
      + chip('source', 'real', '真题', realCount)
      + chip('source', 'mock', '模拟', mockCount)
      + '</div>'
      + '<span class="exam-filter-status" id="examFilterStatus"></span>'
      + '<button type="button" class="exam-filter-more" id="examFilterMore" aria-expanded="false" aria-controls="examFilterDrawer">'
      + '<span class="efm-label">更多</span><span class="efm-count" hidden>0</span><span aria-hidden="true">▾</span>'
      + '</button>'
      + '</div>'
      + '<div class="exam-filter-drawer" id="examFilterDrawer">'
      + '<div class="exam-filter-sheet-head">'
      + '<span>更多筛选<span class="efsh-count" hidden></span></span>'
      + '<button type="button" class="efsh-clear" hidden>清空</button>'
      + '<button type="button" class="efsh-done">收起 ▴</button>'
      + '</div>'
      + '<div class="exam-filter-group"><span>年份</span><div class="exam-filter-chips">'
      + chip('year', 'all', '全部年份')
      + yearList.map(function (y) { return chip('year', y, y + ' 年'); }).join('')
      + '</div></div>'
      + '<div class="exam-filter-group"><span>进度</span><div class="exam-filter-chips">'
      + chip('done', 'all', '全部', cards.length)
      + chip('done', 'todo', '未做', cards.length - doneCount)
      + chip('done', 'done', '已做', doneCount)
      + '</div></div>'
      + '</div>';

    heading.insertAdjacentElement('afterend', bar);
    bindFilter(bar);
    markDone();
    applyFilter();
  }

  function bindFilter(bar) {
    if (!bar || bar.dataset.bound) return;
    bar.dataset.bound = '1';
    bar.addEventListener('click', function (e) {
      var chip = e.target.closest('.exam-filter-chip');
      if (chip) {
        filter[chip.dataset.filterDim] = chip.dataset.filterValue;
        saveFilter();
        applyFilter();
        return;
      }
      if (e.target.closest('#examFilterMore')) {
        bar.classList.toggle('more-open');
        syncFilterControls();
        return;
      }
      if (e.target.closest('.efsh-done')) {
        bar.classList.remove('more-open');
        syncFilterControls();
        return;
      }
      if (e.target.closest('.efsh-clear')) {
        filter = { source: 'all', year: 'all', done: 'all' };
        saveFilter();
        applyFilter();
      }
    });
  }

  /* 离开目录再回来时，抽屉默认收起（避免上次忘了收，首屏看不到篇目） */
  function resetDrawer() {
    var bar = $('examFilterBar');
    if (bar) bar.classList.remove('more-open');
  }

  /* ============================================================
   * 五、统一收尾：视图 / 渲染变化后调用
   * ------------------------------------------------------------
   * 关键教训：app.js 的 renderExam() 先写 innerHTML、再 setView()。
   * 若在「刚写完 innerHTML、active 还没加上」的瞬间调用 sync()，
   * wantOn() 会误判为 false，把刚开的分屏又关掉（实测就是这么丢失的）。
   * 所以：开启立即生效；关闭必须经过一次延时复核，确认真的离开了答题视图。
   * ============================================================ */
  var closeTimer = null;

  function openSplit() {
    clearTimeout(closeTimer);
    if (!state.on) {
      state.pct = loadPct();
      state.on = true;
    }
    ensureHandle();
    applyPct();
    syncQuickNav();
  }

  function closeSplit() {
    if (!state.on) return;
    body().classList.remove('sheet-dragging');
    state.on = false;
    var panel = guidePanel();
    if (panel) { panel.style.height = ''; panel.style.flexBasis = ''; }
    var handle = document.querySelector('.sheet-handle');
    if (handle && handle.parentNode) handle.parentNode.removeChild(handle);
    var bar = $('examQuickNav');
    if (bar) bar.hidden = true;
  }

  function sync() {
    if (wantOn()) { openSplit(); return; }
    /* 关掉之前再确认一次：给 app.js 的 setView 留出加 active 的时间 */
    if (state.on && !closeTimer) {
      closeTimer = window.setTimeout(function () {
        closeTimer = null;
        if (!wantOn()) closeSplit();
      }, 320);
    }
  }

  function afterRender() {
    var view = document.querySelector('.view.active')?.id || null;

    if (view === 'trainingView') {
      buildFilterBar();
      if (state.lastView !== 'trainingView') resetDrawer();
      markDone();
    }
    if (view === 'examView') {
      sync();
      var now = currentNumber();
      if (now && now !== state.lastNumber) {
        state.lastNumber = now;
        window.setTimeout(function () { revealBlank(now); syncQuickNav(); }, 60);
      }
      syncQuickNav();
    } else if (state.on) {
      sync();
    }
    state.lastView = view;
  }

  /* ---------- 通道①：MutationObserver ---------- */
  function observe() {
    var main = document.querySelector('#mainContent');
    if (!main || !window.MutationObserver) return;
    var timer = null;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(afterRender, 70);
    }).observe(main, { childList: true, subtree: true });
  }

  /* ---------- 通道②：事件委托（点空格后把视野收好） ---------- */
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var blank = e.target.closest('#examView .exam-blank');
    if (blank && state.on) {
      var n = Number((blank.textContent || '').match(/^\s*(\d+)/)?.[1] || 0);
      window.setTimeout(function () { if (n) revealBlank(n); syncQuickNav(); }, 130);
      return;
    }
    /* 点了任何可能重渲染的按钮：短延迟后再对一次状态 */
    if (state.on && e.target.closest('#examView button')) {
      window.setTimeout(function () { sync(); syncQuickNav(); }, 180);
    }
  }, true);

  /* 兜底轮询：极少数情况下 MutationObserver 错过（如只改 class 不改子树） */
  function poll() {
    if (!narrow()) { if (state.on) sync(); return; }
    if (examActive() !== state.on) afterRender();
    else if (state.on) syncQuickNav();
  }

  /* 顶栏当前项滑进可视区 */
  function scrollActiveNavIntoView() {
    var nav = document.querySelector('.module-seven-choice .workbook-main-nav');
    var on = nav && nav.querySelector('.active');
    if (!nav || !on) return;
    if (nav.scrollWidth <= nav.clientWidth + 2) return;
    var target = on.offsetLeft - (nav.clientWidth - on.offsetWidth) / 2;
    target = Math.max(0, Math.min(target, nav.scrollWidth - nav.clientWidth));
    try { nav.scrollTo({ left: target, behavior: 'smooth' }); }
    catch (e) { nav.scrollLeft = target; }
  }

  function onResize() {
    sync();
    if (state.on) applyPct();
    scrollActiveNavIntoView();
  }

  function boot() {
    loadFilter();
    observe();
    afterRender();
    sync();
    requestAnimationFrame(scrollActiveNavIntoView);
    window.setInterval(poll, 400);
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', function () { window.setTimeout(onResize, 160); });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) afterRender(); });
  }

  /* 调试入口（只读，便于现场核对状态） */
  window.__readingMobile = {
    state: state,
    sync: sync,
    wantOn: wantOn,
    solveOrder: solveOrder,
    revealBlank: revealBlank
  };

  /* access.js 是异步 IIFE：先渲染登录门禁，复核通过后才放行主界面。
     #mainContent 从一开始就在文档里（只是被门禁样式藏住），所以 DOM 就绪即接管。 */
  function start() {
    if (document.querySelector('#mainContent')) { boot(); return; }
    var timer = setInterval(function () {
      if (document.querySelector('#mainContent')) { clearInterval(timer); boot(); }
    }, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
