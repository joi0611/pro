/* ============================================================
   初中英语语法重构 · 交互练习引擎
   读取 window.QUIZ 数据，渲染可作答、自动批改、带解析的练习页。
   题型：match(配对下拉) / choice(单项选择) / error(改错) / wordbank(词库填空) / fill(自由填空)
   ============================================================ */
(function () {
  'use strict';

  var MISTAKE_KEY = 'junior_grammar_mistakes_v1';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // 文本归一化：小写、去首尾空白、合并空白、剥离常见标点，用于填空/改错比对
  function norm(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[\s\u00a0]+/g, '')
      .replace(/[.,!?;:'"`~()（）【】\[\]{}。，！？；：、…—\-_]/g, '');
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // 把数组洗牌（用于打乱选项/词库顺序，防止位置泄答案）
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function injectStyle() {
    if (document.getElementById('qe-style')) return;
    var s = el('style', null, '\
* { box-sizing: border-box; margin: 0; padding: 0; }\
body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background: #eef1f4; color: #1a1a2e; line-height: 1.7; padding-bottom: 84px; }\
.qe-topbar { position: sticky; top: 0; z-index: 50; background: #2c3e50; color: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.18); }\
.qe-topbar-inner { max-width: 820px; margin: 0 auto; padding: 12px 18px; display: flex; align-items: center; gap: 12px; }\
.qe-back { color: #f1c40f; text-decoration: none; font-size: 14px; white-space: nowrap; }\
.qe-back:hover { text-decoration: underline; }\
.qe-topbar h1 { font-size: 16px; font-weight: 900; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\
.qe-brand { color: #fff; font-size: 13px; font-weight: 900; white-space: nowrap; }\
.qe-wrap { max-width: 820px; margin: 0 auto; padding: 18px; }\
.qe-intro { background: linear-gradient(135deg,#1a252f,#2c3e50); color: #fff; border-radius: 14px; padding: 22px 24px; margin-bottom: 18px; }\
.qe-intro .qe-tag { display: inline-block; background: #e74c3c; color: #fff; font-size: 12px; font-weight: 900; padding: 4px 12px; border-radius: 16px; margin-bottom: 10px; }\
.qe-intro h2 { font-size: 22px; font-weight: 900; line-height: 1.35; }\
.qe-intro h2 span { color: #f1c40f; }\
.qe-intro p { font-size: 13px; color: rgba(255,255,255,.78); margin-top: 8px; }\
.qe-intro .qe-stats { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }\
.qe-intro .qe-stat { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); border-radius: 10px; padding: 8px 14px; text-align: center; min-width: 70px; }\
.qe-intro .qe-stat b { display: block; font-size: 18px; color: #f1c40f; }\
.qe-intro .qe-stat small { font-size: 11px; color: rgba(255,255,255,.7); }\
.qe-sec { background: #fff; border-radius: 14px; border: 1.5px solid #e6e9ec; padding: 18px 20px; margin-bottom: 16px; }\
.qe-sec-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px dashed #ececec; }\
.qe-sec-num { background: #2c3e50; color: #f1c40f; font-weight: 900; font-size: 13px; padding: 4px 12px; border-radius: 16px; white-space: nowrap; }\
.qe-sec-head h3 { font-size: 16px; font-weight: 900; color: #1a252f; flex: 1; }\
.qe-sec-head .qe-pts { font-size: 12px; color: #e74c3c; border: 1px solid #e74c3c; border-radius: 12px; padding: 2px 9px; white-space: nowrap; }\
.qe-q { border: 1.5px solid #eef0f2; border-radius: 11px; padding: 14px 15px; margin-bottom: 12px; transition: border-color .15s, background .15s; }\
.qe-q:last-child { margin-bottom: 0; }\
.qe-q.correct { border-color: #a5d6a7; background: #f4fbf4; }\
.qe-q.wrong { border-color: #ef9a9a; background: #fdecea; }\
.qe-q-num { display: inline-block; min-width: 26px; height: 26px; line-height: 26px; text-align: center; background: #eef2f5; color: #2c3e50; border-radius: 50%; font-size: 13px; font-weight: 900; margin-right: 8px; }\
.qe-stem { font-size: 15px; color: #1a1a2e; margin-bottom: 10px; }\
.qe-stem .qzh { font-size: 13px; color: #888; font-weight: 400; }\
.qe-stem u { text-decoration: underline; text-decoration-color: #e74c3c; text-decoration-thickness: 2px; }\
.qe-opts { display: flex; flex-wrap: wrap; gap: 8px; }\
.qe-opt { display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid #d7dce0; background: #fff; border-radius: 9px; padding: 8px 13px; font-size: 14px; cursor: pointer; user-select: none; transition: all .12s; }\
.qe-opt:hover { border-color: #2980b9; }\
.qe-opt.sel { border-color: #2980b9; background: #e3f2fd; color: #1565c0; font-weight: 700; }\
.qe-opt .qe-letter { display: inline-flex; width: 20px; height: 20px; border-radius: 50%; background: #eceff1; color: #555; font-size: 11px; align-items: center; justify-content: center; font-weight: 900; }\
.qe-opt.sel .qe-letter { background: #2980b9; color: #fff; }\
.qe-opt.locked { cursor: default; }\
.qe-q.correct .qe-opt.sel { border-color: #27ae60; background: #e8f5e9; color: #1e8449; }\
.qe-q.correct .qe-opt.sel .qe-letter { background: #27ae60; }\
.qe-q.wrong .qe-opt.sel { border-color: #e74c3c; background: #fdecea; color: #c0392b; }\
.qe-q.wrong .qe-opt.sel .qe-letter { background: #e74c3c; }\
.qe-q.wrong .qe-opt.ans { border-color: #27ae60; background: #e8f5e9; color: #1e8449; }\
.qe-q.correct .qe-opt.ans { outline: 2px solid #27ae60; }\
.qe-sel { display: inline-block; border: 1.5px solid #d7dce0; border-radius: 9px; padding: 7px 12px; font-size: 14px; background: #fff; color: #1a1a2e; min-width: 150px; max-width: 100%; }\
.qe-sel:focus { outline: none; border-color: #2980b9; }\
.qe-input { display: inline-block; border: 1.5px solid #d7dce0; border-radius: 9px; padding: 8px 12px; font-size: 14px; background: #fff; min-width: 120px; }\
.qe-input:focus { outline: none; border-color: #2980b9; }\
.qe-err-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; font-size: 13px; color: #555; }\
.qe-err-row label { color: #888; }\
.qe-mini { font-size: 12px; color: #888; margin: 8px 0; }\
.qe-verdict { display: none; margin-top: 10px; padding: 11px 14px; border-radius: 10px; font-size: 13px; line-height: 1.7; }\
.qe-q.correct .qe-verdict { display: block; background: #e8f5e9; border: 1px solid #a5d6a7; }\
.qe-q.wrong .qe-verdict { display: block; background: #fdecea; border: 1px solid #ef9a9a; }\
.qe-verdict .qe-vtag { font-weight: 900; margin-right: 6px; }\
.qe-q.correct .qe-verdict .qe-vtag { color: #1e8449; }\
.qe-q.wrong .qe-verdict .qe-vtag { color: #c0392b; }\
.qe-verdict .qe-ans { color: #1e8449; font-weight: 700; }\
.qe-verdict .qe-exp { color: #444; margin-top: 5px; display: block; }\
.qe-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; background: #fff; border-top: 1.5px solid #e6e9ec; box-shadow: 0 -3px 16px rgba(0,0,0,.08); }\
.qe-bar-inner { max-width: 820px; margin: 0 auto; padding: 12px 18px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }\
.qe-score { font-size: 14px; color: #2c3e50; }\
.qe-score b { font-size: 20px; color: #e74c3c; }\
.qe-prog { flex: 1; min-width: 120px; height: 10px; background: #eceff1; border-radius: 6px; overflow: hidden; }\
.qe-prog i { display: block; height: 100%; width: 0; background: linear-gradient(90deg,#f1c40f,#27ae60); transition: width .3s; }\
.qe-btn { border: 0; border-radius: 11px; padding: 11px 22px; font-size: 15px; font-weight: 900; cursor: pointer; transition: transform .12s, box-shadow .12s; }\
.qe-btn:hover { transform: translateY(-1px); }\
.qe-btn:active { transform: translateY(0); }\
.qe-btn.primary { background: #e74c3c; color: #fff; box-shadow: 0 5px 15px rgba(231,76,60,.3); }\
.qe-btn.ghost { background: #eef2f5; color: #2c3e50; }\
.qe-sec-explain { display: none; margin-top: 14px; padding: 13px 16px; background: #fffde7; border: 1.5px dashed #f1c40f; border-radius: 11px; font-size: 13px; color: #5d4e00; line-height: 1.8; }\
.qe-sec.graded .qe-sec-explain { display: block; }\
@media print { .qe-bar, .qe-topbar { display: none; } body { background: #fff; padding: 0; } .qe-q.correct, .qe-q.wrong { background: #fff; } }\
@media (max-width: 600px) {\
  .qe-wrap { padding: 12px; }\
  .qe-sec { padding: 14px 14px; }\
  .qe-opt { flex: 1 1 100%; }\
  .qe-bar-inner { padding: 10px 12px; }\
  .qe-btn { flex: 1; }\
  .qe-brand { font-size: 11px; }\
}\
');
    s.id = 'qe-style';
    document.head.appendChild(s);
  }

  function lessonLabel(lesson) {
    var bonusMap = { bonus1: '加餐一', bonus2: '加餐二', bonus3: '加餐三' };
    if (bonusMap[lesson]) return bonusMap[lesson];
    return '第' + lesson + '讲';
  }

  function readMistakes() {
    try { var rows = JSON.parse(localStorage.getItem(MISTAKE_KEY) || '[]'); return Array.isArray(rows) ? rows : []; }
    catch (e) { return []; }
  }

  function answerText(ans) {
    if (ans == null || ans === '') return '未作答';
    if (typeof ans !== 'object') return String(ans);
    if (ans.hasError == null) return '未作答';
    if (ans.hasError === false) return '这句没错';
    return '有错；' + (ans.wrong || '未填写') + ' → ' + (ans.fix || '未填写');
  }

  function correctText(item, type) {
    if (type !== 'error') return String(item.answer || '');
    return item.hasError ? (item.wrong + ' → ' + item.fix) : '这句没有错误';
  }

  function syncMistake(q, sec, si, item, qi, ans, ok) {
    var rows = readMistakes();
    var id = String(q.lesson) + ':' + si + ':' + qi;
    rows = rows.filter(function (row) { return row.id !== id; });
    if (!ok) {
      var lesson = String(q.lesson);
      rows.unshift({
        id: id,
        lesson: lesson,
        lessonLabel: lessonLabel(q.lesson),
        title: q.title,
        section: sec.name,
        stem: item.stem || item.sentence || '',
        userAnswer: answerText(ans),
        correctAnswer: correctText(item, sec.type),
        explanation: item.explain || sec.explain || '暂无解析',
        href: 'quiz-' + (lesson.indexOf('bonus') === 0 ? lesson : lesson.padStart(2, '0')) + '.html',
        updatedAt: new Date().toISOString()
      });
    }
    try { localStorage.setItem(MISTAKE_KEY, JSON.stringify(rows.slice(0, 300))); } catch (e) {}
  }

  function renderTopbar(q) {
    var bar = el('div', 'qe-topbar');
    var isBonus = String(q.lesson).indexOf('bonus') === 0;
    var backHref = isBonus ? 'index.html' : 'lesson-' + String(q.lesson).padStart(2, '0') + '.html';
    bar.innerHTML =
      '<div class="qe-topbar-inner">' +
        '<a class="qe-back" href="' + backHref + '">← 返回' + (isBonus ? '目录' : '讲义') + '</a>' +
        '<h1>✍️ ' + lessonLabel(q.lesson) + ' · 交互练习</h1>' +
        '<span class="qe-brand">新疆学生无限进步</span>' +
      '</div>';
    return bar;
  }

  function renderIntro(q) {
    var total = 0, nq = 0;
    q.sections.forEach(function (s) { nq += s.items.length; total += s.items.length * s.perQ; });
    var intro = el('div', 'qe-intro');
    intro.innerHTML =
      '<span class="qe-tag">交互练习 · 自动批改 · 大白话解析</span>' +
      '<h2>' + esc(q.title) + ' <span>· 在线练习</span></h2>' +
      '<p>直接在页面上作答，点"提交批改"自动判分并展开每题解析。错题别只看对错，要看懂"为什么"。</p>' +
      '<div class="qe-stats">' +
        '<div class="qe-stat"><b>' + nq + '</b><small>题目数</small></div>' +
        '<div class="qe-stat"><b>' + total + '</b><small>满分</small></div>' +
        '<div class="qe-stat"><b>即时</b><small>批改解析</small></div>' +
      '</div>';
    return intro;
  }

  // ---- 题型渲染 ----
  var renderers = {};

  // 配对/下拉选择（match）：每题一个下拉，从 options 选
  renderers.match = function (item, idx, prefix) {
    var wrap = el('div', 'qe-q');
    wrap.id = prefix + idx;
    var stem = el('div', 'qe-stem', '<span class="qe-q-num">' + (idx + 1) + '</span>' + item.stem);
    wrap.appendChild(stem);
    var opts = el('div');
    var sel = document.createElement('select');
    sel.className = 'qe-sel';
    sel.setAttribute('data-q', prefix + idx);
    sel.innerHTML = '<option value="">— 请选择 —</option>' +
      item._opts.map(function (o, i) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('');
    opts.appendChild(sel);
    wrap.appendChild(opts);
    wrap.appendChild(el('div', 'qe-verdict'));
    return wrap;
  };

  // 单项选择（choice）：选项按钮，单选
  renderers.choice = function (item, idx, prefix) {
    var wrap = el('div', 'qe-q');
    wrap.id = prefix + idx;
    wrap.appendChild(el('div', 'qe-stem', '<span class="qe-q-num">' + (idx + 1) + '</span>' + item.stem));
    var opts = el('div', 'qe-opts');
    item._opts.forEach(function (o, i) {
      var b = el('button', 'qe-opt');
      b.type = 'button';
      b.setAttribute('data-q', prefix + idx);
      b.setAttribute('data-val', o);
      b.innerHTML = '<span class="qe-letter">' + String.fromCharCode(65 + i) + '</span>' + esc(o);
      opts.appendChild(b);
    });
    wrap.appendChild(opts);
    wrap.appendChild(el('div', 'qe-verdict'));
    return wrap;
  };

  // 词库填空（wordbank）：每题下拉，同题组内已选项禁用
  renderers.wordbank = function (item, idx, prefix) {
    var wrap = el('div', 'qe-q');
    wrap.id = prefix + idx;
    wrap.appendChild(el('div', 'qe-stem', '<span class="qe-q-num">' + (idx + 1) + '</span>' + item.stem));
    var sel = document.createElement('select');
    sel.className = 'qe-sel qe-wb';
    sel.setAttribute('data-q', prefix + idx);
    sel.setAttribute('data-sec', prefix);
    wrap.appendChild(sel);
    wrap.appendChild(el('div', 'qe-verdict'));
    return wrap;
  };

  // 自由填空（fill）：文本输入，归一化比对
  renderers.fill = function (item, idx, prefix) {
    var wrap = el('div', 'qe-q');
    wrap.id = prefix + idx;
    wrap.appendChild(el('div', 'qe-stem', '<span class="qe-q-num">' + (idx + 1) + '</span>' + item.stem));
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'qe-input';
    inp.setAttribute('data-q', prefix + idx);
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('spellcheck', 'false');
    inp.setAttribute('placeholder', item.placeholder || '在此填入答案');
    wrap.appendChild(inp);
    wrap.appendChild(el('div', 'qe-verdict'));
    return wrap;
  };

  // 改错（error）：选"有错/无错"；有错则填"错的词"和"改为"
  renderers.error = function (item, idx, prefix) {
    var wrap = el('div', 'qe-q');
    wrap.id = prefix + idx;
    wrap.appendChild(el('div', 'qe-stem', '<span class="qe-q-num">' + (idx + 1) + '</span>' + item.sentence + (item.zh ? '<br><span class="qzh">' + item.zh + '</span>' : '')));
    var row = el('div', 'qe-err-row');
    var radYes = document.createElement('label');
    radYes.innerHTML = '<input type="radio" name="err-' + prefix + idx + '" data-q="' + prefix + idx + '" data-val="yes" style="margin-right:4px;"> 这句有错';
    var radNo = document.createElement('label');
    radNo.innerHTML = '<input type="radio" name="err-' + prefix + idx + '" data-q="' + prefix + idx + '" data-val="no" style="margin-right:4px;"> 这句没错';
    row.appendChild(radYes);
    row.appendChild(radNo);
    wrap.appendChild(row);
    var inputs = el('div', 'qe-err-inputs');
    inputs.style.display = 'none';
    inputs.innerHTML =
      '<div class="qe-err-row"><label>错的词：</label><input type="text" class="qe-input" data-q="' + prefix + idx + '" data-field="wrong" autocomplete="off" spellcheck="false"></div>' +
      '<div class="qe-err-row"><label>应改为：</label><input type="text" class="qe-input" data-q="' + prefix + idx + '" data-field="fix" autocomplete="off" spellcheck="false"></div>';
    wrap.appendChild(inputs);
    if (item.hint) wrap.appendChild(el('div', 'qe-mini', '⚠️ ' + item.hint));
    wrap.appendChild(el('div', 'qe-verdict'));
    return wrap;
  };

  // ---- 交互绑定 ----
  function bind(root) {
    // 单项选择按钮
    root.addEventListener('click', function (e) {
      var b = e.target.closest('.qe-opt');
      if (!b || b.classList.contains('locked')) return;
      var qid = b.getAttribute('data-q');
      root.querySelectorAll('.qe-opt[data-q="' + qid + '"]').forEach(function (o) { o.classList.remove('sel'); });
      b.classList.add('sel');
    });
    // 改错：切换有错/无错
    root.addEventListener('change', function (e) {
      var t = e.target;
      if (t.type === 'radio' && t.getAttribute('data-val')) {
        var qid = t.getAttribute('data-q');
        var inputs = root.querySelector('#' + qid + ' .qe-err-inputs');
        if (inputs) inputs.style.display = (t.getAttribute('data-val') === 'yes') ? 'block' : 'none';
      }
      // 词库：同题组内禁用已选项
      if (t.classList && t.classList.contains('qe-wb')) {
        syncWordbank(root, t.getAttribute('data-sec'));
      }
    });
  }

  function syncWordbank(root, prefix) {
    var sels = root.querySelectorAll('.qe-wb[data-sec="' + prefix + '"]');
    var bank = window.__QE_BANK && window.__QE_BANK[prefix];
    if (!bank) return;
    // 收集已选
    var chosen = {};
    sels.forEach(function (s) { if (s.value) chosen[s.getAttribute('data-q')] = s.value; });
    sels.forEach(function (s) {
      var cur = s.value;
      var qid = s.getAttribute('data-q');
      s.innerHTML = '<option value="">— 选词填空 —</option>' +
        bank.map(function (w) {
          var usedByOther = false;
          for (var k in chosen) { if (k !== qid && chosen[k] === w) { usedByOther = true; break; } }
          var dis = usedByOther ? ' disabled' : '';
          var sel = (cur === w) ? ' selected' : '';
          return '<option value="' + esc(w) + '"' + dis + sel + '>' + esc(w) + '</option>';
        }).join('');
    });
  }

  // ---- 读取作答 ----
  function getAnswer(root, qid, type) {
    if (type === 'choice') {
      var sel = root.querySelector('.qe-opt.sel[data-q="' + qid + '"]');
      return sel ? sel.getAttribute('data-val') : null;
    }
    if (type === 'match' || type === 'wordbank') {
      var s = root.querySelector('.qe-sel[data-q="' + qid + '"]');
      return s && s.value ? s.value : null;
    }
    if (type === 'fill') {
      var i = root.querySelector('.qe-input[data-q="' + qid + '"]');
      return i ? i.value : null;
    }
    if (type === 'error') {
      var rad = root.querySelector('input[type=radio][data-q="' + qid + '"]:checked');
      var val = rad ? rad.getAttribute('data-val') : null;
      if (val !== 'yes') return { hasError: val === 'no' ? false : null };
      var w = root.querySelector('.qe-input[data-q="' + qid + '"][data-field=wrong]');
      var f = root.querySelector('.qe-input[data-q="' + qid + '"][data-field=fix]');
      return { hasError: true, wrong: w ? w.value : '', fix: f ? f.value : '' };
    }
    return null;
  }

  // ---- 批改 ----
  function gradeItem(item, type, ans) {
    if (ans == null) return false;
    if (type === 'choice' || type === 'match' || type === 'wordbank') {
      return ans === item.answer;
    }
    if (type === 'fill') {
      var acc = [item.answer].concat(item.accept || []);
      var a = norm(ans);
      return acc.some(function (x) { return norm(x) === a; });
    }
    if (type === 'error') {
      if (ans.hasError == null) return false;
      if (!item.hasError) return ans.hasError === false;
      if (ans.hasError !== true) return false;
      return norm(ans.wrong) === norm(item.wrong) && norm(ans.fix) === norm(item.fix);
    }
    return false;
  }

  function verdictHTML(ok, item, type, ans) {
    var head = ok ? '<span class="qe-vtag">✅ 答对</span>' : '<span class="qe-vtag">❌ 答错</span>';
    var ansLine = '';
    if (type === 'choice' || type === 'match' || type === 'wordbank') {
      ansLine = '正确答案：<span class="qe-ans">' + esc(item.answer) + '</span>';
    } else if (type === 'fill') {
      ansLine = '正确答案：<span class="qe-ans">' + esc(item.answer) + '</span>' +
        (item.accept ? '<br>其他可接受：' + item.accept.map(esc).join('、') : '');
    } else if (type === 'error') {
      if (!item.hasError) {
        ansLine = '本题：<span class="qe-ans">这句没有错误</span>';
      } else {
        ansLine = '错的词：<span class="qe-ans">' + esc(item.wrong) + '</span>　应改为：<span class="qe-ans">' + esc(item.fix) + '</span>';
      }
    }
    var exp = item.explain ? '<span class="qe-exp">💡 ' + item.explain + '</span>' : '';
    return head + ansLine + exp;
  }

  // 通过 qid 反查 item（借 data-idx/data-type 存在 section 容器上）
  function itemFor(root, qid) {
    var node = root.querySelector('#' + qid);
    if (!node) return null;
    var sec = node.closest('.qe-sec');
    var si = parseInt(sec.getAttribute('data-si'), 10);
    var qi = parseInt(node.getAttribute('data-qi'), 10);
    return window.QUIZ.sections[si].items[qi];
  }

  function start() {
    var q = window.QUIZ;
    if (!q) return;
    injectStyle();
    document.body.innerHTML = '';
    document.body.appendChild(renderTopbar(q));
    document.body.appendChild(renderIntro(q));
    var root = el('div', 'qe-wrap');
    var rootInner = el('div');
    root.appendChild(rootInner);
    document.body.appendChild(root);

    q.sections.forEach(function (sec, si) {
      var secEl = el('div', 'qe-sec');
      secEl.setAttribute('data-si', si);
      secEl.setAttribute('data-type', sec.type);
      var parts = sec.name.split(/\s*[·•・]\s*/);
      secEl.appendChild(el('div', 'qe-sec-head',
        '<span class="qe-sec-num">' + esc(parts[0]) + '</span>' +
        '<h3>' + esc(parts.slice(1).join(' · ')) + '</h3>' +
        '<span class="qe-pts">每题 ' + sec.perQ + ' 分</span>'));
      // 准备每题的 _opts（match/choice 打乱选项；wordbank 用题组 bank）
      var prefix = 's' + si + 'q';
      if (sec.type === 'wordbank') {
        window.__QE_BANK = window.__QE_BANK || {};
        window.__QE_BANK[prefix] = sec.bank;
      }
      sec.items.forEach(function (item, qi) {
        item._opts = (sec.type === 'match') ? shuffle(sec.options)
                  : (sec.type === 'choice') ? (sec.options ? shuffle(sec.options) : shuffle(item.options || []))
                  : null;
      });
      sec.items.forEach(function (item, qi) {
        var node = renderers[sec.type](item, qi, prefix);
        node.setAttribute('data-qi', qi);
        node.setAttribute('data-type', sec.type);
        secEl.appendChild(node);
      });
      if (sec.explain) secEl.appendChild(el('div', 'qe-sec-explain', '📖 ' + sec.explain));
      rootInner.appendChild(secEl);
      // 词库初始化
      if (sec.type === 'wordbank') syncWordbank(rootInner, prefix);
    });

    bind(rootInner);

    // 底部批改条
    var bar = el('div', 'qe-bar');
    bar.innerHTML =
      '<div class="qe-bar-inner">' +
        '<div class="qe-score">得分：<b id="qe-score">—</b> <span id="qe-score-sub"></span></div>' +
        '<div class="qe-prog"><i id="qe-prog"></i></div>' +
        '<button class="qe-btn ghost" id="qe-reset">↺ 再试一次</button>' +
        '<button class="qe-btn primary" id="qe-submit">✅ 提交批改</button>' +
      '</div>';
    document.body.appendChild(bar);

    var graded = false;
    function totalMax() {
      var t = 0; q.sections.forEach(function (s) { t += s.items.length * s.perQ; }); return t;
    }
    function countDone() {
      var n = 0;
      q.sections.forEach(function (sec, si) {
        sec.items.forEach(function (item, qi) {
          var a = getAnswer(rootInner, 's' + si + 'q' + qi, sec.type);
          if (a != null && !(typeof a === 'object' && a.hasError == null) && a !== '') n++;
        });
      });
      return n;
    }
    function totalQ() { var n = 0; q.sections.forEach(function (s) { n += s.items.length; }); return n; }
    function updateProg() {
      var p = document.getElementById('qe-prog');
      if (p) p.style.width = Math.round(countDone() / totalQ() * 100) + '%';
    }
    rootInner.addEventListener('click', updateProg);
    rootInner.addEventListener('input', updateProg);
    rootInner.addEventListener('change', updateProg);

    document.getElementById('qe-submit').addEventListener('click', function () {
      graded = true;
      var score = 0, max = totalMax(), done = 0;
      q.sections.forEach(function (sec, si) {
        var secEl2 = rootInner.querySelector('.qe-sec[data-si="' + si + '"]');
        secEl2.classList.add('graded');
        sec.items.forEach(function (item, qi) {
          var qid = 's' + si + 'q' + qi;
          var ans = getAnswer(rootInner, qid, sec.type);
          var ok = gradeItem(item, sec.type, ans);
          syncMistake(q, sec, si, item, qi, ans, ok);
          if (ok) score += sec.perQ;
          if (ans != null && !(typeof ans === 'object' && ans.hasError == null) && ans !== '') done++;
          var qNode = rootInner.querySelector('#' + qid);
          qNode.classList.remove('correct', 'wrong');
          qNode.classList.add(ok ? 'correct' : 'wrong');
          var v = qNode.querySelector('.qe-verdict');
          if (v) v.innerHTML = verdictHTML(ok, item, sec.type, ans);
          if (sec.type === 'choice') {
            qNode.querySelectorAll('.qe-opt').forEach(function (o) {
              o.classList.add('locked');
              if (o.getAttribute('data-val') === item.answer) o.classList.add('ans');
            });
          }
          if (sec.type === 'wordbank') {
            var sel = qNode.querySelector('.qe-sel');
            if (sel) sel.disabled = true;
          }
          if (sec.type === 'fill') {
            var inp = qNode.querySelector('.qe-input');
            if (inp) inp.disabled = true;
          }
          if (sec.type === 'error') {
            qNode.querySelectorAll('input').forEach(function (i) { i.disabled = true; });
          }
        });
      });
      document.getElementById('qe-score').textContent = score;
      document.getElementById('qe-score-sub').textContent = '/ ' + max + '（答了 ' + done + '/' + totalQ() + ' 题）';
      var msg;
      var pct = score / max;
      if (pct >= 0.85) msg = '🎉 掌握得不错！可以进入下一讲。';
      else if (pct >= 0.6) msg = '💪 把错题解析看懂，重做一遍错题。';
      else msg = '📖 建议回去重读讲义，重点看错题对应模块。';
      document.getElementById('qe-score-sub').textContent += '  ' + msg;
      document.getElementById('qe-prog').style.width = '100%';
      this.style.display = 'none';
      document.getElementById('qe-reset').style.display = '';
      try { document.querySelector('.qe-q.wrong').scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
    });

    document.getElementById('qe-reset').style.display = 'none';
    document.getElementById('qe-reset').addEventListener('click', function () {
      location.reload();
    });
    updateProg();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
