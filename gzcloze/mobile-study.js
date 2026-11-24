(function () {
  'use strict';

  var MOBILE_MAX = 880;                  // 与 style.css 的 880px 断点对齐
  var SHEET_KEY = 'gzcloze_mobile_sheet_v1';
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
    if (window.matchMedia('(orientation: landscape) and (max-height: 560px)').matches) {
      panel.style.height = '';
      return;
    }
    var available = panel.parentElement.clientHeight;
    if (!available) return;
    var min = Math.min(minPanelH(), available / 3);
    var max = available - Math.min(140, available * 0.38);
    var height = Math.max(min, Math.min(max, Math.round(px)));
    panel.style.height = height + 'px';
    state.pct = Math.max(10, Math.min(84, Math.round(px / winH() * 100)));
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
    if (hint) hint.textContent = '解析路径 · ' + stopLabel(state.pct);
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
    h.addEventListener('click', function (event) {
      if (event.detail !== 0) return;
      setSheetPx(winH() * nextStop() / 100);
      savePct(state.pct);
      handleHint();
    });
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
      if (!moved && e.type !== 'pointercancel') setSheetPx(winH() * nextStop() / 100);   // 轻点换档
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

  function revealCurrent(qid) {
    var box = $('passage');
    if (!state.on || !box || qid == null || qid !== lastQid) return;
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
    if (!state.on || !panel || !el) return;
    var handle = panel.querySelector('.sheet-handle');
    var pad = handle ? handle.offsetHeight : 0;
    var target = Math.max(0, panel.scrollTop + el.getBoundingClientRect().top - panel.getBoundingClientRect().top - pad - 4);
    try { panel.scrollTo({ top: target, behavior: 'smooth' }); }
    catch (e) { panel.scrollTop = target; }
  }

  /* ---------- 包装 app.js 的入口 ---------- */
  function wrap(name, after) {
    var fn = window[name];
    if (typeof fn !== 'function' || fn.__mobileWrapped) return;
    var wrapped = function () {
      var ctx = this, args = arguments;
      var ret = fn.apply(ctx, args);
      try { after.apply(ctx, args); } catch (e) {}
      return ret;
    };
    wrapped.__mobileWrapped = true;
    wrapped.__original = fn;
    window[name] = wrapped;
  }

  var lastQid = null;

  function hookApp() {
    wrap('showView', sync);
    wrap('switchStudyPane', sync);
    wrap('openLesson', function () {
      sync();
      var box = $('passage'); if (box) box.scrollTop = 0;
      var panel = panelEl(); if (panel) panel.scrollTop = 0;
      lastQid = null;
    });

    wrap('selectQuestion', function (qid) {
      /* 在「看原文」档点空格，说明要答题了：解析抬回分屏档 */
      if (state.on && state.pct < NORMAL_PCT - 6) setSheetPx(winH() * NORMAL_PCT / 100);

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
        if (exp && !exp.hidden && !exp.classList.contains('hidden')) scrollPanelTo(exp);
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

    }
  }

  function onResize() {
    sync();
  }

  function boot() {
    hookApp();
    sync();    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', function () { window.setTimeout(onResize, 140); });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize, { passive: true });
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) sync(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
