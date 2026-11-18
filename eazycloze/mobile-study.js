/* ============================================================
 * 手机自适应做题版 · mobile-study.js（2026-11-18）
 * ------------------------------------------------------------
 * 配合 mobile-study.css：只有「窄屏 + 做题视图 + 真题练习标签」
 * 才开启分屏 —— 上半屏固定原文，下半屏悬浮解析。
 *
 * 这个文件只做四件事：
 *   1. 开关 body.study-mobile（视图 / 标签 / 屏幕尺寸变化时同步）
 *   2. 把「首尾定调」卡搬进下半屏（原来它横在原文上方，手机上白占半屏）
 *   3. 拖动条：上下拖动调高矮，轻点在三档（分屏 / 看解析 / 看原文）间切换
 *   4. 点题后把本道题的空格和本题线索高亮滚进上半屏可视区，
 *      保证「原文 + 线索」永远看得见，不被下半屏挤走
 *
 * 不改动 app.js 的任何既有逻辑，只在外层包装（wrap）。
 * 桌面端与其它视图完全走原路径。
 * ============================================================ */
(function () {
  'use strict';

  var MOBILE_MAX = 880;                  // 与 style.css 的 880px 断点对齐
  var SHEET_KEY = 'cloze_mobile_sheet_v1';
  var MIN_H = 82;                        // 下半屏最矮：拖拽条 + 题号 + 一行选项
  var PEEK_PCT = 17;                     // 「看原文」档
  var NORMAL_PCT = 44;                   // 默认档：上原文 / 下解析
  var LARGE_PCT = 68;                    // 「看解析」档
  var STOPS = [NORMAL_PCT, LARGE_PCT, PEEK_PCT];
  var state = { on: false, pct: NORMAL_PCT };

  function $(id) { return document.getElementById(id); }
  function body() { return document.body; }
  function panelEl() { return document.querySelector('#practicePane .question-panel'); }

  /* ---------- 判定：现在该不该开手机分屏 ---------- */
  function wantOn() {
    if (!window.matchMedia) return false;
    /* 用与 CSS 完全相同的媒体查询判断，避免 innerWidth / 缩放口径不一致 */
    if (!window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches) return false;
    if ((body().getAttribute('data-pane') || 'practice') === 'trans') return false;
    var sv = $('studyView');
    return !!(sv && sv.classList.contains('active'));
  }

  /* ---------- 尺寸记忆 ---------- */
  function loadPct() {
    try {
      var v = Number(localStorage.getItem(SHEET_KEY));
      if (v >= 10 && v <= 84) return v;
    } catch (e) {}
    return NORMAL_PCT;
  }
  function savePct(v) {
    try { localStorage.setItem(SHEET_KEY, String(Math.round(v))); } catch (e) {}
  }
  function winH() {
    var vv = window.visualViewport;
    return Math.round((vv && vv.height) || window.innerHeight || 640);
  }

  /* ---------- 下半屏高度 ---------- */
  function minPanelH() { return Math.min(MIN_H, Math.round(winH() * 0.3)); }

  function setSheetPx(px) {
    var panel = panelEl();
    if (!panel) return;
    var min = minPanelH();
    /* 给原文区留出下限（约 5~6 行英文），解析再长也不能把原文挤没 */
    var reserve = Math.min(Math.round(winH() * 0.38), 280);
    var max = Math.max(min, winH() - reserve);
    var h = Math.max(min, Math.min(max, Math.round(px)));
    panel.style.height = h + 'px';
    state.pct = Math.round(h / winH() * 100);
  }
  function applyPct() {
    var panel = panelEl();
    if (panel) panel.style.flexBasis = 'auto';
    setSheetPx(winH() * state.pct / 100);
    handleHint();
  }

  /* 轻点：三档循环 */
  function nextStop() {
    var best = 0, bestD = Infinity;
    for (var i = 0; i < STOPS.length; i++) {
      var d = Math.abs(STOPS[i] - state.pct);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (bestD > 6) return STOPS[0];          // 拖动到档位之间 → 先归位
    return STOPS[(best + 1) % STOPS.length];
  }
  function stopLabel(pct) {
    if (pct <= PEEK_PCT + 7) return '看原文';
    if (pct >= LARGE_PCT - 6) return '看解析';
    return '分屏';
  }
  function handleHint() {
    var hint = document.querySelector('.sheet-handle-hint');
    if (hint) hint.textContent = stopLabel(state.pct) + ' · 拖动调高低';
  }

  /* ---------- 拖拽条 ---------- */
  function ensureHandle() {
    var panel = panelEl();
    if (!panel) return null;
    var exist = panel.querySelector('.sheet-handle');
    if (exist) return exist;
    var h = document.createElement('button');
    h.type = 'button';
    h.className = 'sheet-handle';
    h.setAttribute('aria-label', '拖动调整解析面板高度，轻点在三档之间切换');
    h.innerHTML = '<span class="sheet-handle-bar"></span><span class="sheet-handle-hint"></span>';
    panel.insertBefore(h, panel.firstChild);
    bindHandle(h, panel);
    return h;
  }

  function bindHandle(h, panel) {
    var drag = null;
    function start(e) {
      if (e.button !== undefined && e.button !== 0) return;
      drag = { y0: e.clientY, h0: panel.getBoundingClientRect().height, moved: false };
      body().classList.add('sheet-dragging');
      try { h.setPointerCapture(e.pointerId); } catch (err) {}
      if (e.cancelable) e.preventDefault();
    }
    function move(e) {
      if (!drag) return;
      var dy = e.clientY - drag.y0;
      if (Math.abs(dy) > 4) drag.moved = true;
      setSheetPx(drag.h0 - dy);
      handleHint();
    }
    function end(e) {
      if (!drag) return;
      var moved = drag.moved;
      drag = null;
      body().classList.remove('sheet-dragging');
      try { h.releasePointerCapture(e.pointerId); } catch (err) {}
      if (!moved) setSheetPx(winH() * nextStop() / 100);   // 轻点换档
      savePct(state.pct);
      handleHint();
    }
    if (window.PointerEvent) {
      h.addEventListener('pointerdown', start);
      h.addEventListener('pointermove', move);
      h.addEventListener('pointerup', end);
      h.addEventListener('pointercancel', end);
    } else {
      h.addEventListener('mousedown', start);
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', end);
      h.addEventListener('touchstart', function (e) {
        var t = e.touches[0]; if (t) start({ clientY: t.clientY, button: 0 });
      }, { passive: true });
      h.addEventListener('touchmove', function (e) {
        var t = e.touches[0]; if (t) move({ clientY: t.clientY });
      }, { passive: true });
      h.addEventListener('touchend', function () { end({}); });
    }
  }

  /* ---------- 首尾定调卡：搬进下半屏 ---------- */
  function toneCard() { return $('toneCard'); }
  function moveToneIntoSheet() {
    var card = toneCard(), panel = panelEl();
    if (!card || !panel || panel.contains(card)) return;
    var handle = panel.querySelector('.sheet-handle');
    if (handle && handle.nextSibling) panel.insertBefore(card, handle.nextSibling);
    else panel.insertBefore(card, panel.firstChild);
  }
  function moveToneBack() {
    var card = toneCard(), nav = $('qNav');
    if (!card || !nav) return;
    var panel = card.parentNode;
    if (!panel || !panel.classList || !panel.classList.contains('question-panel')) return;
    nav.parentNode.insertBefore(card, nav);
  }
  function refreshTonePending() {
    var panel = panelEl(), card = toneCard();
    if (!panel) return;
    var waiting = !!(card && !card.hidden && !(window.toneState && window.toneState.passed));
    panel.classList.toggle('tone-pending', waiting);
  }

  /* ---------- 解析面板内的段落顺序：选项提到最前 ----------
   * 手机上「选择答案」必须一进面板就看见，线索卡和搭配说明退到它后面；
   * 原文里的线索高亮照常显示，所以线索并不会因此丢失。 */
  var answerAnchor = null;   /* 选项块原来的下一个兄弟节点，退出手机模式时按它还原 */

  function reorderForMobile() {
    if (!state.on) return;
    var box = $('questionBox');
    if (!box) return;
    var title = box.querySelector('.question-title');
    var answer = $('answerStep');
    if (!title || !answer) return;
    if (title.nextElementSibling === answer) return;
    /* 第一次重排前记下原位置（后面可能被多次调用，只记第一次） */
    if (answerAnchor === null) answerAnchor = answer.nextSibling;
    box.insertBefore(answer, title.nextElementSibling);
  }

  function reorderBack() {
    var box = $('questionBox');
    var answer = $('answerStep');
    if (!box || !answer) return;
    if (answerAnchor === null) return;            /* 没重排过，不用还原 */
    if (answerAnchor && answerAnchor.parentNode === box) {
      box.insertBefore(answer, answerAnchor);
    } else {
      box.appendChild(answer);
    }
    answerAnchor = null;
  }
  function revealCurrent(qid) {
    var box = $('passage');
    if (!box || qid == null) return;
    var blank = box.querySelector('.blank-btn[data-id="' + qid + '"]');
    if (!blank) return;

    var boxRect = box.getBoundingClientRect();
    var br = blank.getBoundingClientRect();
    var viewH = boxRect.height;
    if (viewH < 40) return;
    var pad = 10;
    var top = br.top, bottom = br.bottom;

    /* 把本题线索高亮按「离空格的远近」逐条纳入，直到放不下为止。
       线索跨段时不可能全塞进一屏，优先保证空格和最近的那几条同屏。 */
    var marks = [].map.call(box.querySelectorAll('.clue-mark'), function (m) {
      var r = m.getBoundingClientRect();
      return { t: r.top, b: r.bottom, d: Math.min(Math.abs(r.top - br.bottom), Math.abs(br.top - r.bottom)) };
    }).filter(function (m) { return m.b > m.t; })
      .sort(function (a, b) { return a.d - b.d; });

    marks.forEach(function (m) {
      var nt = Math.min(top, m.t), nb = Math.max(bottom, m.b);
      if (nb - nt <= viewH - pad * 2) { top = nt; bottom = nb; }
    });

    var span = bottom - top;
    var delta;
    if (span <= viewH - pad * 2) {
      delta = top - boxRect.top - (viewH - span) / 2;        // 空格 + 线索整体居中
    } else {
      delta = br.top - boxRect.top - viewH * 0.3;            // 兜底：空格偏上，线索往下看
    }
    if (Math.abs(delta) < 2) return;
    var target = Math.max(0, box.scrollTop + delta);
    try { box.scrollTo({ top: target, behavior: 'smooth' }); }
    catch (e) { box.scrollTop = target; }
  }

  /* 面板内滚到某块（判完题看解析用） */
  function scrollPanelTo(el) {
    var panel = panelEl();
    if (!panel || !el) return;
    var handle = panel.querySelector('.sheet-handle');
    var pad = handle ? handle.offsetHeight : 0;
    var target = Math.max(0, el.offsetTop - pad - 4);
    try { panel.scrollTo({ top: target, behavior: 'smooth' }); }
    catch (e) { panel.scrollTop = target; }
  }

  /* ---------- 包装 app.js 的入口 ---------- */
  function wrap(name, after, before) {
    var fn = window[name];
    if (typeof fn !== 'function' || fn.__mobileWrapped) return;
    var wrapped = function () {
      var ctx = this, args = arguments, saved;
      if (before) { try { saved = before.apply(ctx, args); } catch (e) {} }
      var ret = fn.apply(ctx, args);
      try { after.apply(ctx, args, [saved]); } catch (e) {}
      return ret;
    };
    wrapped.__mobileWrapped = true;
    wrapped.__original = fn;
    window[name] = wrapped;
  }

  var lastQid = null;

  /* ---------- 真题目录：筛选「抽屉」----------
   * 手机上筛选器原本竖着铺 786px，首屏一篇都看不到。
   * 现在最常用的「来源 + 地区」常驻一行，其余（题型/空数/维度/年份/难度）
   * 收进抽屉，默认收起；抽屉里有几个条件是「非全部」就在按钮上标数字。
   * 桌面端（>880px）不接管，抽屉由 CSS 常显。 */
  var FILTER_OPEN_KEY = 'cloze_filter_drawer_v1';
  var DIM_LABEL = { type: '题型', blanks: '空数', dim: '维度', year: '年份', difficulty: '难度', region: '地区', kind: '来源' };

  function filterBarEl() { return $('filterBar'); }

  function activeFilterCount() {
    var n = 0;
    var fs = window.filterState || {};
    ['type', 'blanks', 'dim', 'year', 'difficulty'].forEach(function (d) {
      if (fs[d] && fs[d] !== 'all') n++;
    });
    return n;
  }

  function updateFilterToggle() {
    var bar = filterBarEl();
    if (!bar) return;
    var n = activeFilterCount();
    var cnt = $('filterMoreCount');
    if (cnt) { cnt.textContent = String(n); cnt.hidden = !n; }
    /* 抽屉收起时若已套用条件，把条件名写进按钮，避免「藏起来了不知道选了啥」 */
    var lab = bar.querySelector('.filter-more-toggle .fmt-label');
    if (lab) lab.textContent = (!isFilterDrawerOpen() && n) ? '已筛选 ' + n : '更多';
    /* 抽屉头部的「N 项 + 清空」跟着条件数走 */
    var sc = $('filterSheetCount');
    if (sc) { sc.textContent = n + ' 项'; sc.hidden = !n; }
    var cl = $('filterSheetClear');
    if (cl) cl.hidden = !n;
  }

  /* 清空 = 回到「全部」，和抽屉里的「重置筛选」同一个动作。
     注意 window.resetFilters 是 app.js 里的元素引用而不是函数，必须点按钮。 */
  function clearAllFilters() {
    var btn = $('resetFilters');
    if (btn) { btn.click(); return; }
    /* 兜底：按钮不在时直接清空状态并重画 */
    var fs = window.filterState;
    if (fs) {
      ['kind', 'type', 'region', 'year', 'blanks', 'difficulty', 'dim'].forEach(function (d) { fs[d] = 'all'; });
      if (typeof window.onFilterChanged === 'function') window.onFilterChanged();
    }
  }

  function isFilterDrawerOpen() {
    var bar = filterBarEl();
    return !!(bar && bar.classList.contains('more-open'));
  }

  function setFilterDrawer(open, remember) {
    var bar = filterBarEl();
    if (!bar) return;
    bar.classList.toggle('more-open', !!open);
    var btn = $('filterMoreBtn');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (remember) {
      try { localStorage.setItem(FILTER_OPEN_KEY, open ? '1' : '0'); } catch (e) {}
    }
    updateFilterToggle();
  }

  /* 绑定「更多」按钮和抽屉头部。只绑一次，与当前屏宽无关 ——
     否则在桌面加载过页面后缩到手机，抽屉就再也打不开了。 */
  function bindFilterDrawerOnce() {
    var btn = $('filterMoreBtn');
    if (btn && !btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setFilterDrawer(!isFilterDrawerOpen(), true);
      });
    }
    /* 抽屉头部：收起 */
    var done = $('filterSheetDone');
    if (done && !done.dataset.bound) {
      done.dataset.bound = '1';
      done.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setFilterDrawer(false, true);
        var b = filterBarEl();
        if (b && b.scrollIntoView) {
          try { b.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
          catch (err) { b.scrollIntoView(false); }
        }
      });
    }
    /* 抽屉头部：清空（等同「重置筛选」） */
    var clr = $('filterSheetClear');
    if (clr && !clr.dataset.bound) {
      clr.dataset.bound = '1';
      clr.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearAllFilters();
      });
    }
  }

  function initFilterDrawer() {
    var bar = filterBarEl();
    bindFilterDrawerOnce();
    if (!bar) return;
    /* 只在窄屏接管；宽屏抽屉本就是常显的 */
    if (!window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches) return;
    /* 抽屉是「随时点开」的临时层：每次进目录都从收起开始。
       不再记忆上次的展开状态 —— 否则上次忘了收，这次首屏又看不到篇目。 */
    setFilterDrawer(false, false);
  }

  /* 离开窄屏时把抽屉状态还原成「常显」，避免回桌面时被 hidden */
  function releaseFilterDrawer() {
    var bar = filterBarEl();
    if (bar) bar.classList.remove('more-open');
    var btn = $('filterMoreBtn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  /* ---------- 顶栏：把当前标签滑进可视区 ----------
   * 手机上标签行是横向滚动的；切视图后如果不滑，学生看不到自己点到了哪 */
  function scrollActiveTabIntoView() {
    var tabs = document.querySelector('.nav-tabs');
    var on = tabs && tabs.querySelector('.nav-tab.active');
    if (!tabs || !on) return;
    if (tabs.scrollWidth <= tabs.clientWidth + 2) return;
    var target = on.offsetLeft - (tabs.clientWidth - on.offsetWidth) / 2;
    target = Math.max(0, Math.min(target, tabs.scrollWidth - tabs.clientWidth));
    try { tabs.scrollTo({ left: target, behavior: 'smooth' }); }
    catch (e) { tabs.scrollLeft = target; }
  }

  /* ---------- 列表行：把和标题重复的来源行收掉 ----------
   * 实测 177 篇的「标题」本身就是来源串（2026·安徽·中考真题），
   * 下面那行「来源：2026·安徽·中考真题 · 正式真题 · 2026 年」纯属重复，
   * 手机上白占 ~14px × 每一行。这里只把「标题里没有的新信息」留在来源行：
   * 标题已含来源时留「正式真题」（类别），没有结尾的「2026 年」（标题里已有）。 */
  function slimLessonSource(row) {
    if (!row || row.dataset.srcSlim) return;
    row.dataset.srcSlim = '1';
    var h3 = row.querySelector('h3');
    var src = row.querySelector('.lesson-source');
    if (!h3 || !src) return;
    var title = (h3.textContent || '').trim();
    var body = (src.textContent || '').replace(/^\s*来源[:：]\s*/, '');
    var kind = row.querySelector('.chip-kind');
    var kindText = kind ? (kind.textContent || '').trim() : '';
    var bits = body.split('·').map(function (s) { return s.trim(); }).filter(Boolean);
    /* 标题已含、或只是年份/来源类别 → 都算「重复信息」 */
    var keep = bits.filter(function (b) {
      if (/^\d{4}\s*年$/.test(b)) return false;
      if (kindText && b === kindText) return false;
      return title.indexOf(b) < 0;
    });
    if (keep.length) { src.textContent = keep.join(' · '); return; }
    /* 来源行整条都是重复的：删掉它，把「类别」交给小签那一行显示 */
    src.remove();
    row.classList.add('row-slim');
  }

  function slimLessonRows() {
    var rows = document.querySelectorAll('#libraryGrid .lesson-row');
    for (var i = 0; i < rows.length; i++) slimLessonSource(rows[i]);
  }

  function hookApp() {
    wrap('showView', function (name) {
      sync();
      if (name === 'library') {
        initFilterDrawer();
        updateFilterToggle();
        slimLessonRows();
      }
      requestAnimationFrame(scrollActiveTabIntoView);
    });
    wrap('switchStudyPane', function () { sync(); });

    /* 筛选一变就刷新「更多」按钮上的条件数 */
    /* renderLibrary 是真正重建列表的函数；renderFilterControls 在它内部先执行、
       那时行还没插入 DOM，所以必须挂在 renderLibrary 之后。 */
    wrap('onFilterChanged', function () { updateFilterToggle(); slimLessonRows(); });
    wrap('renderLibrary', function () { updateFilterToggle(); slimLessonRows(); });

    wrap('openLesson', function () {
      sync();
      var box = $('passage'); if (box) box.scrollTop = 0;
      var panel = panelEl(); if (panel) panel.scrollTop = 0;
      lastQid = null;
    });

    wrap('selectQuestion', function (qid) {
      /* 在「看原文」档点空格，说明要答题了：解析抬回分屏档 */
      if (state.on && state.pct < NORMAL_PCT - 6) setSheetPx(winH() * NORMAL_PCT / 100);
      reorderForMobile();
      var panel = panelEl();
      if (panel && qid !== lastQid) panel.scrollTop = 0;
      lastQid = qid;
      requestAnimationFrame(function () { revealCurrent(qid); });
      refreshTonePending();
      handleHint();
    });

    wrap('chooseAnswer', function (q) {
      if (q && q.q != null) requestAnimationFrame(function () { revealCurrent(q.q); });
    });

    wrap('checkAnswer', function (q) {
      if (!q || q.q == null) return;
      /* 判完题：解析抬到「看解析」档，让解析尽量在一屏内看完；
         原文区有下限兜底（CSS min-height），空格与线索仍留在上半屏。 */
      if (state.on) setSheetPx(winH() * LARGE_PCT / 100);
      handleHint();
      /* 面板高度变了：等布局稳定后重新把空格和线索摆回视野 */
      window.setTimeout(function () { revealCurrent(q.q); }, 220);
    });

    /* 判完题把解析顶到面板上方：手机上不用自己往下翻 */
    wrap('revealExplain', function () {
      window.setTimeout(function () {
        var exp = $('explainStep');
        if (exp && !exp.hidden) scrollPanelTo(exp);
      }, 190);
    });

    wrap('pickTone', function () {
      refreshTonePending();
      /* 定调选对后自动收起：把下半屏整个让给「选项 + 解析」 */
      window.setTimeout(function () {
        if (!state.on) return;
        if (window.toneState && window.toneState.passed &&
            typeof window.setToneCollapsed === 'function') {
          window.setToneCollapsed(true);
        }
        refreshTonePending();
      }, 700);
    });
    wrap('setToneCollapsed', function () { refreshTonePending(); });

    /* 面板内部点线索卡跳原文：原文区保证滚动，不被整页抢走 */
    document.addEventListener('click', function (e) {
      var pill = e.target && e.target.closest ? e.target.closest('.clue-pill') : null;
      if (!pill || !state.on) return;
      window.setTimeout(function () {
        var box = $('passage');
        if (box) box.scrollTop = box.scrollTop;    // 触发一次重绘，浮层与原文同步
      }, 360);
    }, true);
  }

  /* ---------- 开关 ---------- */
  function sync() {
    var on = wantOn();
    var panel = panelEl();

    if (on) {
      if (!state.on) {
        state.pct = loadPct();
        body().classList.add('study-mobile');
        state.on = true;
      }
      ensureHandle();
      moveToneIntoSheet();
      reorderForMobile();
      applyPct();
      refreshTonePending();
    } else if (state.on) {
      body().classList.remove('study-mobile');
      body().classList.remove('sheet-dragging');
      state.on = false;
      if (panel) { panel.style.height = ''; panel.style.flexBasis = ''; }
      var h = document.querySelector('.sheet-handle');
      if (h && h.parentNode) h.parentNode.removeChild(h);
      moveToneBack();
      reorderBack();
    }
  }

  function onResize() {
    sync();
    if (state.on) applyPct();
    /* 跨过 880px 界线时，筛选抽屉要从「可收起」和「常显」之间切换 */
    var narrow = window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches;
    if (narrow !== lastNarrow) {
      lastNarrow = narrow;
      if (narrow) initFilterDrawer();
      else releaseFilterDrawer();
    }
    updateFilterToggle();
  }

  var lastNarrow = null;

  /* ---------- 启动 ---------- */
  function boot() {
    hookApp();
    sync();
    lastNarrow = window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches;
    initFilterDrawer();
    updateFilterToggle();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', function () { window.setTimeout(onResize, 140); });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize, { passive: true });
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) sync(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();