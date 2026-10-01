"use strict";

/* ============================================================
 * 完形填空训练系统 · 全国版 · 核心逻辑
 * ------------------------------------------------------------
 * 移植自 D:\无限进步全国\web\app.js 的训练交互核心，
 * 新增：视图管理 / 分类筛选 / 错题本 / 进度面板 / 首尾定调 / 上下题导航
 * ============================================================ */

/* ==================== 存储与状态 ==================== */
/* v2：题号已统一重排为 1..N，旧版错题本里的题号会错位，故升版让旧数据自然作废 */
var STORAGE_KEY = "cloze-national-v2";
var clueColors = ["blue", "green", "yellow", "red", "violet"];

var library = [];
var currentId = null;
var lesson = null;
var passageParts = [];
var selectedId = null;
var answers = {};
var checked = {};
var posPassed = {};
var reasoningRoutes = {};
var currentQ = null;
var activeView = "library";

/* 筛选状态：六个维度，值一律用字符串（'all' 表示不限） */
var FILTER_DIMS = ["kind", "type", "region", "year", "blanks", "difficulty"];
var DEFAULT_FILTERS = { kind: "all", type: "all", region: "上海", year: "all", blanks: "all", difficulty: "all" };
var filterState = {};
FILTER_DIMS.forEach(function (d) { filterState[d] = "all"; });

/* URL hash 短键，用于分享筛选链接：#k=正式真题&r=江苏&y=2024&b=6 */
var HASH_KEYS = { k: "kind", t: "type", r: "region", y: "year", b: "blanks", d: "difficulty" };
var HASH_KEY_OF = {};
Object.keys(HASH_KEYS).forEach(function (short) { HASH_KEY_OF[HASH_KEYS[short]] = short; });

/* 来源分层：按「真题优先」的教学价值排序 */
var KIND_ORDER = ["正式真题", "区级一模", "区级二模", "模拟预测", "自编"];
/* 省级行政区（用于地区分组） */
var PROVINCES = ["北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江",
  "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南",
  "广东", "广西", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海",
  "宁夏", "新疆", "西藏", "内蒙古", "香港", "澳门", "台湾"];


/* 存储探测 */
var _memStore = {};
var _storageOK = null;
function _probeStorage() {
  if (_storageOK !== null) return _storageOK;
  try { localStorage.setItem("__probe__", "1"); localStorage.removeItem("__probe__"); _storageOK = true; }
  catch (e) { _storageOK = false; }
  return _storageOK;
}
function loadStore() {
  if (!_probeStorage()) return _memStore;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch (e) { return _memStore; }
}
function saveStore(s) {
  if (!_probeStorage()) { _memStore = s; return; }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
  catch (e) { _memStore = s; }
}

function getDone() { return loadStore().done || {}; }
function markDone(id) { var s = loadStore(); s.done = s.done || {}; s.done[id] = true; saveStore(s); }
function isDone(id) { return !!getDone()[id]; }

/* 错题本存储 */
function getErrors() { return loadStore().errors || []; }
function addError(lessonId, qNum, selected, correct, route) {
  var s = loadStore(); s.errors = s.errors || [];
  // 去重：同篇同题只留一条
  s.errors = s.errors.filter(function (e) { return !(e.lessonId === lessonId && e.q === qNum); });
  s.errors.push({ lessonId: lessonId, q: qNum, selected: selected, correct: correct, route: route, ts: Date.now() });
  saveStore(s);
}
function clearErrors() { var s = loadStore(); s.errors = []; saveStore(s); }

/* ============================================================
 * 新增功能（2026-09-28）：逐句翻译 / 词汇卡 / 打印
 * 上海版与全国版共用同一套实现，改这里两版同步生效。
 * ------------------------------------------------------------
 * 1) 逐句翻译：点击任意句子 → 实时翻译（免费接口）+ localStorage 永久缓存。
 * 2) 词汇卡：正文双击单词 → 收录生词本 + 打开有道词典，生词本以翻转卡呈现。
 * 3) 打印：输出空白练习卷（挖空正文 + 选项，不含答案与解析），可直接发给学生做。
 * ============================================================ */

/* ---------- 练习模块标签页：真题练习 / 翻译精读 ----------
 * 两个标签互斥，一次只显示一个面板。切走「真题练习」时用 body[data-pane] 让首尾定调卡片、
 * 题号导航一并隐藏（纯 CSS，不碰它们自己的 hidden 状态，切回来原样恢复）。
 * 工具面板为空时（本篇没切出句子）不强行显示，沿用渲染函数留下的 hidden。 */
var STUDY_PANES = ["practice", "trans"];
var currentStudyPane = "practice";
/* 页面带 #trans 进来时，首篇直接落到该标签 */
var pendingStudyPane = (function () {
  try {
    var h = String(location.hash || "").replace(/^#/, "");
    return STUDY_PANES.indexOf(h) >= 0 ? h : null;
  } catch (e) { return null; }
})();
function toolPaneHasContent(sec) {
  return !!sec && !!sec.firstElementChild;
}
function switchStudyPane(pane) {
  if (STUDY_PANES.indexOf(pane) < 0) pane = "practice";
  currentStudyPane = pane;
  var practice = $("practicePane");
  var trans = $("transSection");
  if (practice) practice.hidden = (pane !== "practice");
  if (trans) trans.hidden = !(pane === "trans" && toolPaneHasContent(trans));
  document.body.setAttribute("data-pane", pane);
  var printBtn = $("printBtn");
  if (printBtn) printBtn.hidden = (pane !== "practice");
  Array.prototype.forEach.call(document.querySelectorAll(".study-tab"), function (btn) {
    var on = btn.getAttribute("data-pane") === pane;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
  /* 标签写进 hash：刷新保持、链接可分享（file:// 下 replaceState 可能被拒，忽略即可） */
  try { history.replaceState(null, "", "#" + pane); } catch (e) {}
  if (window.scrollTo) window.scrollTo(0, 0);
}
function bindStudyTabs() {
  Array.prototype.forEach.call(document.querySelectorAll(".study-tab"), function (btn) {
    btn.addEventListener("click", function () {
      switchStudyPane(btn.getAttribute("data-pane"));
    });
  });
}

/* ---------- 本篇工具（逐句翻译）：常驻题目后面 ----------
 * 折叠头收起后只留一行标题，做题时视线不受干扰。
 * 翻译按句点击才请求 —— 一次全翻会把免费额度（匿名约 5000 字/天）烧光。 */
function toolHeadHtml(title, sub) {
  return '<div class="tool-head">'
    + '<span class="tool-title">' + escapeHtml(title) + '</span>'
    + '<span class="tool-sub">' + escapeHtml(sub) + '</span>'
    + '<button class="tool-toggle" type="button" aria-expanded="true">收起</button>'
    + '</div>';
}
function bindToolToggle(sec) {
  var head = sec.querySelector(".tool-head");
  var body = sec.querySelector(".tool-body");
  if (!head || !body) return;
  var btn = head.querySelector(".tool-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var open = body.hidden;
    body.hidden = !open;
    btn.textContent = open ? "收起" : "展开";
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}
function renderStudyTools() {
  renderTransList();
}
/* ---------- 翻译精读：左原文（答案已填入）/ 右中文 + 本篇选项逐个可译 ---------- */
/* 空号 __n__ → 该题正确答案。翻译精读是做完题后的对照环节，所以填**标准答案**，
   不是学生的选择；取不到（数据异常）就退成 ____，别让内部记号漏到界面上。 */
function answerOfBlank(n) {
  var qs = (lesson && lesson.questions) || [];
  var i = Number(n), q = null;
  qs.forEach(function (x) { if (Number(x.q) === i) q = x; });
  if (!q) q = qs[i - 1] || null;
  return q && q.answer ? String(q.answer) : "____";
}
/* 左栏英文：答案用 .tr-ans 单独标出来，一眼看到填进去的是什么 */
function transEnHtml(s) {
  var raw = String(s.text || ""), out = "", last = 0, m;
  var re = /__(\d+)__/g;
  while ((m = re.exec(raw))) {
    out += escapeHtml(raw.slice(last, m.index));
    out += '<b class="tr-ans">' + escapeHtml(answerOfBlank(m[1])) + '</b>';
    last = m.index + m[0].length;
  }
  out += escapeHtml(raw.slice(last));
  return out;
}
function optCacheKey(o) { return "opt:" + String(o || "").trim().toLowerCase(); }

/* 本篇选项：全部罗列，逐个可点译，正确答案标 ✓ */
function optionTransHtml() {
  var qs = (lesson && lesson.questions) || [];
  if (!qs.length) return "";
  var cache = loadTransCache();
  var groups = qs.map(function (q) {
    var items = (q.options || []).map(function (o, i) {
      var key = optCacheKey(o);
      var zh = cache[key] || "";
      var right = String(o) === String(q.answer);
      return '<div class="opt-row' + (right ? " is-right" : "") + (zh ? " done" : "") + '"'
        + ' data-key="' + escapeHtml(key) + '" data-en="' + escapeHtml(String(o)) + '" tabindex="0" role="button">'
        + '<span class="opt-tag">' + "ABCD".charAt(i) + '</span>'
        + '<div class="opt-body">'
          + '<div class="opt-en">' + escapeHtml(String(o)) + '</div>'
          + '<div class="opt-zh">' + (zh ? escapeHtml(zh) : "点击翻译") + '</div>'
        + '</div>'
        + (right ? '<span class="opt-flag">✓ 答案</span>' : '')
        + '</div>';
    }).join("");
    return '<div class="opt-group">'
      + '<div class="opt-group-head">第 ' + q.q + ' 题<span>' + escapeHtml(q.pos || "") + " · " + escapeHtml(q.topic || "") + '</span></div>'
      + '<div class="opt-list">' + items + '</div></div>';
  }).join("");
  return '<div class="opt-panel">'
    + '<div class="opt-panel-head"><span class="opt-panel-title">本篇选项</span>'
    + '<span class="opt-panel-sub">' + qs.length + ' 题 · 点选项看中文，正确答案标 ✓</span>'
    + '<button class="btn ghost btn-sm" id="optTransAll" type="button">一键翻译全部选项</button></div>'
    + '<div class="opt-groups">' + groups + '</div></div>';
}

function renderTransList() {
  var sec = $("transSection"); if (!sec) return;
  if (!currentSentences || !currentSentences.length) { sec.hidden = true; sec.innerHTML = ""; return; }
  sec.hidden = false;
  var cache = loadTransCache();
  var pairs = currentSentences.map(function (s, i) {
    var key = String(s.text || "").trim();
    var zh = cache[key] || "";
    return '<div class="trans-pair' + (zh ? " done" : "") + '" data-si="' + i + '" tabindex="0" role="button">'
      + '<div class="tr-en"><span class="tr-no">' + (i + 1) + '</span>' + transEnHtml(s) + '</div>'
      + '<div class="tr-zh">' + (zh ? escapeHtml(zh) : "点击翻译") + '</div>'
      + '</div>';
  }).join("");
  sec.innerHTML = toolHeadHtml("翻译精读", "原文已填入正确答案 · 左右对照 · 双击英文单词查词")
    /* 顺序：文章（句子对照）在上，本篇选项在下 —— 精读先看文章，选项只是回头核对用 */
    + '<div class="tool-body">'
      + '<div class="trans-pairs-sec"><div class="trans-pairs">' + pairs + '</div></div>'
      + optionTransHtml()
    + '</div>';
  bindToolToggle(sec);
  bindTransPairs(sec);
  bindOptionRows(sec);
  bindWordCard(sec);
}
/* 单击翻这句，双击查词。双击会先抛出两次 click，所以单击延迟 260ms 执行，
   dblclick 一到就撤掉定时器——否则双击查词会顺手把整句翻掉（白烧免费额度）。 */
function bindTransPairs(sec) {
  Array.prototype.forEach.call(sec.querySelectorAll(".trans-pair"), function (pair) {
    var timer = null;
    pair.addEventListener("click", function () {
      if (timer) return;
      timer = setTimeout(function () { timer = null; translatePair(pair); }, 260);
    });
    pair.addEventListener("dblclick", function () { clearTimeout(timer); timer = null; });
    pair.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); translatePair(pair); }
    });
  });
}
function translatePair(pair) {
  var si = Number(pair.getAttribute("data-si"));
  var s = currentSentences[si]; if (!s) return;
  var zhEl = pair.querySelector(".tr-zh"); if (!zhEl) return;
  var key = String(s.text || "").trim();
  if (loadTransCache()[key]) return;          // 已有译文就不再烧额度
  if (pair.dataset.busy === "1") return;
  pair.dataset.busy = "1";
  zhEl.textContent = "翻译中…";
  fetchTranslation(sentenceInputFor(si, true)).then(function (zh) {
    pair.dataset.busy = "";
    if (zh) {
      var cache = loadTransCache(); cache[key] = zh; saveTransCache(cache);
      zhEl.textContent = zh; pair.classList.add("done");
    } else {
      zhEl.textContent = "（没翻成功：网络波动，或今日免费额度用完）";
    }
  });
}
function bindOptionRows(sec) {
  Array.prototype.forEach.call(sec.querySelectorAll(".opt-row"), function (row) {
    var timer = null;
    row.addEventListener("click", function () {
      if (timer) return;
      timer = setTimeout(function () { timer = null; translateOption(row); }, 260);
    });
    row.addEventListener("dblclick", function () { clearTimeout(timer); timer = null; });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); translateOption(row); }
    });
  });
  var all = $("optTransAll");
  if (all) all.addEventListener("click", function () {
    var rows = sec.querySelectorAll(".opt-row:not(.done)");
    if (!rows.length) { toast("本篇选项都已翻过了"); return; }
    toast("开始翻译 " + rows.length + " 个选项…");
    /* 错开 220ms：免费接口连着打容易被限流 */
    Array.prototype.forEach.call(rows, function (r, i) {
      setTimeout(function () { translateOption(r); }, i * 220);
    });
  });
}
function translateOption(row) {
  var key = row.getAttribute("data-key");
  var en = row.getAttribute("data-en") || "";
  var zhEl = row.querySelector(".opt-zh");
  if (!en || !zhEl) return;
  if (loadTransCache()[key]) return;
  if (row.dataset.busy === "1") return;
  row.dataset.busy = "1";
  zhEl.textContent = "翻译中…";
  fetchTranslation(en).then(function (zh) {
    row.dataset.busy = "";
    if (zh) {
      var c = loadTransCache(); c[key] = zh; saveTransCache(c);
      zhEl.textContent = zh; row.classList.add("done");
    } else {
      zhEl.textContent = "（没翻成功）";
    }
  });
}

/* ---------- 双击英文单词 → 查词卡（机翻释义 + 有道 + 收录生词本） ----------
 * 只挂在翻译精读页：正文 #passage 的「双击直接开有道」是既有习惯，不动它。 */
function ensureWordCard() {
  var c = $("wordCard");
  if (c) return c;
  c = document.createElement("div");
  c.id = "wordCard"; c.className = "word-card no-print"; c.hidden = true;
  document.body.appendChild(c);
  return c;
}
function hideWordCard() { var c = $("wordCard"); if (c) { c.hidden = true; c._el = null; } }
/* 查词卡用 fixed 定位（视口坐标）：absolute + 文档坐标会撑高页面、触发 scroll，
   而 scroll 监听又立刻把它关掉——实测就是这么“渲染好了却看不见”的。
   四边都夹一下，贴边时不出屏。 */
function positionWordCard(card, el) {
  if (!el || !el.getBoundingClientRect) return;
  var r = el.getBoundingClientRect();
  var vw = document.documentElement.clientWidth;
  var vh = document.documentElement.clientHeight;
  var cw = card.offsetWidth, ch = card.offsetHeight;
  var top = r.top - ch - 10;
  if (top < 8) top = r.bottom + 10;
  if (top + ch > vh - 8) top = Math.max(8, vh - ch - 8);
  var left = Math.min(Math.max(r.left, 8), Math.max(8, vw - cw - 8));
  card.style.top = top + "px";
  card.style.left = left + "px";
}
/* 单词级机翻常"原样退回"（out→out）或给出非中文，这种别当成释义展示。
   判据：空 / 与原词相同 / 一个汉字都没有。 */
function transLooksValid(zh, word) {
  var t = String(zh || "").trim();
  if (!t) return false;
  if (t.toLowerCase() === String(word || "").toLowerCase()) return false;
  return /[\u4e00-\u9fa5]/.test(t);
}
function wordCardHtml(word, state, zh, ctx) {
  /* 机器释义只作参考（单词级机翻质量不稳，如 feelings→"感度"），
     所以降级成灰色小字，主入口给有道。 */
  var body = (state === "loading") ? '<div class="wc-zh wc-loading">机器释义查询中…</div>'
    : (state === "fail") ? '<div class="wc-zh wc-fail">机器释义没取到有效结果——单词级机翻常这样，点下方有道查准确释义</div>'
    : '<div class="wc-zh"><span class="wc-tag">机器释义 · 仅供参考</span>' + escapeHtml(zh) + '</div>';
  return '<div class="wc-head"><span class="wc-word">' + escapeHtml(word) + '</span>'
    + '<button class="wc-close" type="button" aria-label="关闭">×</button></div>'
    + body
    + (ctx ? '<div class="wc-ctx">' + escapeHtml(ctx) + '</div>' : "")
    + '<div class="wc-actions">'
      + '<button class="wc-btn wc-youdao" type="button">有道词典查准确释义</button>'
      + '<button class="wc-btn wc-save" type="button">加入生词本</button>'
    + '</div>';
}
function bindWordCardActions(word, ctx, el) {
  var card = $("wordCard"); if (!card) return;
  var y = card.querySelector(".wc-youdao");
  if (y) y.addEventListener("click", function () { try { openYoudao(word); } catch (e) {} });
  var s = card.querySelector(".wc-save");
  if (s) s.addEventListener("click", function () {
    addVocab(word, ctx); toast("已收录「" + word + "」到生词本");
    s.textContent = "✓ 已收录"; s.disabled = true;
  });
  var x = card.querySelector(".wc-close");
  if (x) x.addEventListener("click", function () { hideWordCard(); });
}
function showWordCard(word, ctx, el) {
  var card = ensureWordCard();
  var key = "word:" + word;
  var cachedWord = loadTransCache()[key] || "";
  /* 缓存里也可能存着无效结果（早期版本没判），这里一并复核 */
  var zh = transLooksValid(cachedWord, word) ? cachedWord : "";
  card.dataset.word = word;
  card.innerHTML = wordCardHtml(word, zh ? "ok" : "loading", zh, ctx);
  card.hidden = false;
  card._el = el;
  positionWordCard(card, el);
  bindWordCardActions(word, ctx, el);
  if (zh) return;
  fetchTranslation(word).then(function (t) {
    if (card.hidden || card.dataset.word !== word) return;
    var ok = transLooksValid(t, word);
    if (ok) { var c = loadTransCache(); c[key] = t; saveTransCache(c); }
    card.innerHTML = wordCardHtml(word, ok ? "ok" : "fail", t, ctx);
    bindWordCardActions(word, ctx, el);
    positionWordCard(card, el);
  });
}
/* 取词：优先用双击选中的词；取不到就按光标坐标定位到那一个词。
   注意不能把选区里的空格直接抹掉——选 "give up" 会变成 "giveup"（踩过）。 */
function wordFromOffset(node, off) {
  var t = String((node && node.textContent) || "");
  var re = /[A-Za-z][A-Za-z'\-]*/g, m;
  while ((m = re.exec(t))) {
    if (off >= m.index && off <= m.index + m[0].length) return m[0].toLowerCase();
  }
  return "";
}
function wordUnderPoint(e) {
  var x = e.clientX, y = e.clientY;
  try {
    if (document.caretRangeFromPoint) {
      var r = document.caretRangeFromPoint(x, y);
      if (r && r.startContainer && r.startContainer.nodeType === 3) return wordFromOffset(r.startContainer, r.startOffset);
    } else if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      if (pos && pos.offsetNode && pos.offsetNode.nodeType === 3) return wordFromOffset(pos.offsetNode, pos.offset);
    }
  } catch (err) {}
  return "";
}
function wordAtEvent(e) {
  var sel = (window.getSelection && window.getSelection().toString()) || "";
  var s = String(sel).trim().toLowerCase();
  /* 选区必须是「单个词」才算数，含空格/标点就交给坐标定位，免得拼出 giveup */
  if (/^[a-z][a-z'\-]+$/.test(s)) return s;
  var w = wordUnderPoint(e);
  if (w) return w;
  var node = e.target;
  if (node && node.nodeType === 3) node = node.parentElement;
  var m = node ? String(node.textContent || "").toLowerCase().match(/[a-z][a-z'\-]+/g) : null;
  return (m && m.length) ? m[0] : "";
}
function bindWordCard(sec) {
  if (!sec || sec.dataset.wordCard) return;
  sec.dataset.wordCard = "1";
  sec.addEventListener("dblclick", function (e) {
    var word = wordAtEvent(e);
    if (!word) return;
    var ctx = "";
    var pair = e.target.closest ? e.target.closest(".trans-pair") : null;
    if (pair) {
      var si = Number(pair.getAttribute("data-si"));
      if (currentSentences[si]) ctx = sentenceInputFor(si, true);
    }
    showWordCard(word, ctx, e.target);
  });
}
/* 双击选词时浏览器会把选区滚进视口，容器跟着滚一次。所以滚动不能直接关卡片，
   否则「刚显示就被自己关掉」。改成重新贴回词旁边，滚出视口才关。 */
window.addEventListener("scroll", function () {
  var c = $("wordCard");
  if (!c || c.hidden) return;
  var el = c._el;
  if (!el || !document.body.contains(el)) { hideWordCard(); return; }
  var r = el.getBoundingClientRect();
  var vh = document.documentElement.clientHeight, vw = document.documentElement.clientWidth;
  if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) { hideWordCard(); return; }
  positionWordCard(c, el);
}, true);
document.addEventListener("click", function (e) {
  var card = $("wordCard");
  if (!card || card.hidden || card.contains(e.target)) return;
  hideWordCard();
});

/* ---------- 2. 全文逐句翻译（点击句子 → 实时翻译 + 永久缓存） ---------- */
var CLOZE_ABBREV = /^(mr|mrs|ms|dr|st|jr|sr|vs|etc|eg|ie|no|prof|inc|ltd|am|pm|fig)$/i;
var currentSentences = [];

/* 切句：与正文渲染共用同一套坐标，保证「点到的句子」=「送去翻译的句子」。
 * 句尾标点后紧跟的引号/括号算进本句，句间空白并入前一句，区间首尾相连不漏字。 */
function splitArticleSentences(text) {
  var s = String(text || ""), out = [], start = 0, i = 0;
  while (i < s.length) {
    var ch = s.charAt(i);
    if (ch === "." || ch === "!" || ch === "?") {
      /* 句末可能跟着闭合引号/括号（"you-sentences". / (see below).）：先跳过它们再回溯取词。
         旧写法不跳，词取成空串，被下面的 word.length <= 1 当成缩写，整句就不切了。 */
      var j = i; while (j > 0 && /["')\]]/.test(s.charAt(j - 1))) j--;
      var jw = j; while (jw > 0 && /[A-Za-z]/.test(s.charAt(jw - 1))) jw--;
      var word = s.slice(jw, j);
      var k = i + 1; while (k < s.length && /["')\]]/.test(s.charAt(k))) k++;
      var atEnd = (k >= s.length || /\s/.test(s.charAt(k)));
      /* 数字点（3.5 / 1.）不切，保持旧行为；空词（挖空后 "__n__ ." 之类）不算缩写——
         这正是 33 篇里 23 篇句子被并在一起的根因。 */
      /* 只挡真正的小数：「3.5」「42. 5」这类句点后（跳过空白）紧跟数字的。年份句末
         「in March 2025. The aim…」后面跟的是大写字母，得切开，不能一并挡掉。 */
      var after = k; while (after < s.length && /\s/.test(s.charAt(after))) after++;
      var decimal = /[0-9]/.test(s.charAt(after));          /* 42. 5 / 3.5 */
      var cnGloss = /[\u4e00-\u9fa5]/.test(s.charAt(after)); /* (n. 潮流) 这类词性标注 */
      /* 单字母缩写只认「独立成词」的（J. K.：前面是空白）；否则 manager's. 的 "s"、
         1860s. 的 "s" 都会被误当缩写而不切句。 */
      var singleAbbrev = (word.length === 1) && (jw === 0 || /\s/.test(s.charAt(jw - 1)));
      var abbrev = (ch === ".") && (singleAbbrev || CLOZE_ABBREV.test(word));
      if (atEnd && !abbrev && !decimal && !cnGloss) {
        var ns = k; while (ns < s.length && /\s/.test(s.charAt(ns))) ns++;
        out.push({ start: start, end: ns, text: s.slice(start, ns) });
        start = ns; i = ns; continue;
      }
    }
    i++;
  }
  if (start < s.length && s.slice(start).trim()) out.push({ start: start, end: s.length, text: s.slice(start) });
  return out;
}

/* 把 passageParts 按句子区间分组：一个文本段可能横跨多句，需按句切开 */
function planSentenceLayout(parts, sents) {
  var layout = sents.map(function () { return []; });
  if (!sents.length || !parts || !parts.length) return layout;
  var si = 0;
  parts.forEach(function (part) {
    var len = (part.type === "text") ? part.text.length : (4 + String(part.id).length);
    var gEnd = part.gStart + len;
    while (si < sents.length - 1 && part.gStart >= sents[si].end) si++;
    if (part.type !== "text") { layout[si].push({ type: "blank", id: part.id }); return; }
    var cursor = part.gStart, idx = si;
    while (cursor < gEnd && idx < sents.length) {
      var segEnd = Math.min(gEnd, sents[idx].end);
      if (segEnd > cursor) layout[idx].push({ type: "text", text: part.text.slice(cursor - part.gStart, segEnd - part.gStart), gStart: cursor });
      cursor = segEnd;
      if (cursor >= sents[idx].end) idx++;
    }
  });
  return layout;
}

var TRANS_CACHE_KEY = "cloze_trans_cache";
var TRANS_EMAIL_KEY = "cloze_trans_email";
/* 免费翻译通道匿名额度约 5000 字/天；填邮箱后升到 50000 字/天（官方规则）。
 * 邮箱只存在本机 localStorage，不外传。 */
function getTransEmail() { try { return localStorage.getItem(TRANS_EMAIL_KEY) || ""; } catch (e) { return ""; } }
function askTransEmail() {
  var cur = getTransEmail();
  var v = window.prompt("填入邮箱可把免费翻译额度从约 5000 字/天 提升到 50000 字/天。\n邮箱只保存在本机浏览器，不会上传到任何服务器。\n（留空 = 继续用匿名额度）", cur);
  if (v === null) return false;
  try { v.trim() ? localStorage.setItem(TRANS_EMAIL_KEY, v.trim()) : localStorage.removeItem(TRANS_EMAIL_KEY); } catch (e) {}
  return true;
}
function loadTransCache() { try { return JSON.parse(localStorage.getItem(TRANS_CACHE_KEY) || "{}"); } catch (e) { return {}; } }
function saveTransCache(o) {
  try {
    var keys = Object.keys(o);
    if (keys.length > 4000) for (var i = 0; i < keys.length - 4000; i++) delete o[keys[i]];   // 超出上限丢最早的
    localStorage.setItem(TRANS_CACHE_KEY, JSON.stringify(o));
  } catch (e) {}
}
/* 送去翻译的文本：已作答的空填答案，未作答填 ___，避免 __3__ 干扰机翻 */
function sentenceInputFor(si, forceAnswer) {
  var s = currentSentences[si]; if (!s) return "";
  return s.text.replace(/__(\d+)__/g, function (_, n) {
    /* forceAnswer：翻译精读要用正确答案，而不是学生填的（做题时点句子仍用自己的答案） */
    if (forceAnswer) return answerOfBlank(n);
    return answers[Number(n)] || "___";
  }).replace(/\s+/g, " ").trim();
}
/* 免费翻译通道（浏览器直连，无需 key，已验证支持 CORS）。要加通道往这里追加即可 */
function pickTrans(json) {
  var t = json && json.responseData && json.responseData.translatedText;
  if (!t) return "";
  if (/MYMEMORY WARNING|QUERY LENGTH LIMIT|USAGE LIMIT|NOT ALLOWED|INVALID LANGUAGE/i.test(t)) return "";
  return String(t);
}
function fetchMyMemory(text) {
  var q = encodeURIComponent(String(text).slice(0, 480));
  var url = "https://api.mymemory.translated.net/get?q=" + q + "&langpair=en%7Czh-CN";
  var de = getTransEmail();
  if (de) url += "&de=" + encodeURIComponent(de);
  if (typeof AbortController === "undefined") return fetch(url).then(function (r) { return r.json(); }).then(pickTrans);
  var ac = new AbortController();
  var timer = setTimeout(function () { try { ac.abort(); } catch (e) {} }, 9000);
  return fetch(url, { signal: ac.signal }).then(function (r) { return r.json(); }).then(function (j) {
    clearTimeout(timer); return pickTrans(j);
  }, function (e) { clearTimeout(timer); return ""; });
}
function fetchTranslation(text) {
  if (!text) return Promise.resolve("");
  return fetchMyMemory(text).catch(function () { return ""; });
}

function tipHtml(state, zh, en) {
  var head = en ? '<div class="st-en">' + escapeHtml(en) + '</div>' : "";
  if (state === "loading") return head + '<div class="st-loading">翻译中</div>';
  if (state === "fail") return head + '<div class="st-empty">（这次没翻成功：可能是网络波动，或今日免费额度用完了）</div>' +
    '<div class="st-actions"><button class="st-btn" id="tipQuota" type="button">提升免费额度</button></div>';
  return head + '<div class="st-zh">' + escapeHtml(zh) + '</div>';
}
function ensureSentenceTip() {
  var t = $("sentenceTip");
  if (t) return t;
  t = document.createElement("div");
  t.id = "sentenceTip"; t.className = "sentence-tip no-print"; t.hidden = true;
  document.body.appendChild(t);
  return t;
}
function positionSentenceTip(tip, el) {
  var r = el.getBoundingClientRect();
  var vw = document.documentElement.clientWidth;
  var th = tip.offsetHeight, tw = tip.offsetWidth;
  var top = window.scrollY + r.top - th - 8;
  if (top < window.scrollY + 8) top = window.scrollY + r.bottom + 8;
  var left = window.scrollX + r.left;
  left = Math.min(Math.max(left, window.scrollX + 8), window.scrollX + vw - tw - 8);
  tip.style.top = top + "px";
  tip.style.left = left + "px";
}
function showSentenceTip(si, el) {
  var tip = ensureSentenceTip();
  var s = currentSentences[si]; if (!s) return;
  var key = String(s.text || "").trim();
  var input = sentenceInputFor(si);
  tip.dataset.si = String(si); tip._el = el;
  var cache = loadTransCache();
  var cached = cache[key];
  tip.innerHTML = tipHtml(cached ? "ok" : "loading", cached, input);
  bindTipActions(si, el);
  tip.hidden = false;
  positionSentenceTip(tip, el);
  if (cached) return;
  fetchTranslation(input).then(function (zh) {
    if (tip.dataset.si !== String(si) || tip.hidden) return;   // 已经点到别的句子 → 丢弃旧结果
    if (zh) { cache[key] = zh; saveTransCache(cache); }
    tip.innerHTML = tipHtml(zh ? "ok" : "fail", zh, input);
    bindTipActions(si, el);
    if (tip._el) positionSentenceTip(tip, tip._el);
  });
}
function bindTipActions(si, el) {
  var qb = $("tipQuota");
  if (qb) qb.addEventListener("click", function (e) {
    e.stopPropagation();
    if (askTransEmail()) showSentenceTip(si, el);
  });
}
function hideSentenceTip() { var t = $("sentenceTip"); if (t) { t.hidden = true; t._el = null; } }

/* ---------- 3. 词汇卡：双击单词 → 有道词典 + 收录 ---------- */
function loadVocab() { try { return JSON.parse(localStorage.getItem("cloze_vocab") || "[]"); } catch (e) { return []; } }
function saveVocab(v) { try { localStorage.setItem("cloze_vocab", JSON.stringify(v)); } catch (e) {} }
function openYoudao(word) { window.open("https://dict.youdao.com/search?q=" + encodeURIComponent(word), "_blank", "noopener"); }
function addVocab(word, ctx) {
  word = String(word || "").toLowerCase().replace(/[^a-z'\-]/g, "");
  if (!word) return;
  var v = loadVocab();
  var hit = null;
  v.forEach(function (x) { if (x.word === word) hit = x; });
  if (hit) { if (ctx && !hit.ctx) { hit.ctx = ctx; saveVocab(v); } updateNavBadgeVocab(); return; }
  v.unshift({ word: word, lesson: currentId || "", title: (lesson && lesson.title_cn) || "", ctx: ctx || "", ts: Date.now() });
  if (v.length > 500) v = v.slice(0, 500);
  saveVocab(v); updateNavBadgeVocab();
}
function initWordLookup() {
  var box = $("passage"); if (!box || box.dataset.wordLookup) return;
  box.dataset.wordLookup = "1";
  box.addEventListener("dblclick", function (e) {
    var sel = (window.getSelection && window.getSelection().toString()) || "";
    var word = sel.trim().toLowerCase().replace(/[^a-z'\-]/g, "");
    if (!/^[a-z][a-z'\-]+$/.test(word)) return;
    var node = (window.getSelection && window.getSelection().anchorNode) || e.target;
    var ctx = "";
    try {
      var sp = node && (node.nodeType === 1 ? node.closest(".cloze-sentence") : (node.parentElement && node.parentElement.closest(".cloze-sentence")));
      if (sp) {
        var si = Number(sp.dataset.si);
        if (currentSentences[si]) ctx = String(currentSentences[si].text || "").replace(/__\d+__/g, "____").replace(/\s+/g, " ").trim();
      }
    } catch (err) {}
    addVocab(word, ctx);
    try { openYoudao(word); } catch (err) {}
    toast("已收录「" + word + "」到生词本");
  });
}
function updateNavBadgeVocab() {
  var badge = $("navVocabCount"); if (!badge) return;
  var count = loadVocab().length;
  if (count > 0) { badge.textContent = count; badge.hidden = false; }
  else { badge.hidden = true; }
}
function renderVocab() {
  var list = $("vocabList"); if (!list) return;
  var v = loadVocab();
  if (!v.length) {
    list.innerHTML = '<div class="empty-state-box"><strong>还没有生词</strong>' +
      '<p>在正文里<strong>双击任意单词</strong>，会自动生成词汇卡并打开有道词典。卡片正面是单词，翻面看它出现的原句。</p></div>';
    return;
  }
  list.innerHTML = '<div class="vocab-bar"><span>共 <b>' + v.length + '</b> 张词汇卡 · 点卡片翻面看出处原句</span>' +
      '<button class="btn ghost btn-sm" id="vocabFlipAll" type="button">全部翻面</button></div>' +
    '<div class="fc-grid">' + v.map(function (x) {
      var ctx = x.ctx ? String(x.ctx).replace(/\s+/g, " ") : "（未记录出处原句）";
      return '<div class="fc-card" tabindex="0" role="button">' +
        '<div class="fc-inner">' +
          '<div class="fc-face fc-front"><span class="fc-word">' + escapeHtml(x.word) + '</span>' +
            (x.title ? '<span class="fc-tag">' + escapeHtml(x.title) + '</span>' : '') + '</div>' +
          '<div class="fc-face fc-back"><p class="fc-ctx">' + escapeHtml(ctx) + '</p>' +
            '<div class="fc-acts">' +
              '<button class="fc-btn fc-youdao" type="button" data-w="' + escapeHtml(x.word) + '">有道查询</button>' +
              '<button class="fc-btn fc-del" type="button" data-w="' + escapeHtml(x.word) + '">移除</button>' +
            '</div></div>' +
        '</div></div>';
    }).join("") + '</div>';
  Array.prototype.forEach.call(list.querySelectorAll(".fc-card"), function (card) {
    var flip = function () { card.classList.toggle("flipped"); };
    card.addEventListener("click", function (e) { if (e.target.closest && e.target.closest(".fc-btn")) return; flip(); });
    card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  });
  Array.prototype.forEach.call(list.querySelectorAll(".fc-youdao"), function (b) {
    b.addEventListener("click", function () { openYoudao(b.getAttribute("data-w")); });
  });
  Array.prototype.forEach.call(list.querySelectorAll(".fc-del"), function (b) {
    b.addEventListener("click", function () {
      var w = b.getAttribute("data-w");
      saveVocab(loadVocab().filter(function (x) { return x.word !== w; }));
      renderVocab(); updateNavBadgeVocab();
    });
  });
  var fa = $("vocabFlipAll");
  if (fa) fa.addEventListener("click", function () {
    var all = list.querySelectorAll(".fc-card");
    var on = list.querySelectorAll(".fc-card.flipped").length < all.length;
    Array.prototype.forEach.call(all, function (c) { c.classList.toggle("flipped", on); });
    fa.textContent = on ? "全部翻回" : "全部翻面";
  });
}

/* ---------- 4. 打印：空白练习卷（不含答案与解析） ---------- */
function buildPrintHtml(les) {
  var text = les.article_text_with_blanks || "";
  var body = escapeHtml(text).replace(/__(\d+)__/g, function (_, n) {
    return '<span class="pb-blank"><i>' + n + '</i><u></u></span>';
  });
  var qs = (les.questions || []).slice().sort(function (a, b) { return a.q - b.q; });
  var qHtml = qs.map(function (q) {
    var opts = (q.options || []).map(function (o, i) {
      return '<span class="popt"><b>' + "ABCD".charAt(i) + '.</b> ' + escapeHtml(o) + '</span>';
    }).join("");
    return '<div class="pq"><span class="pq-no">' + q.q + '.</span><span class="pq-opts">' + opts + '</span></div>';
  }).join("");
  var meta = [les.region, les.exam_year ? les.exam_year + " 年" : "", les.source].filter(Boolean).join(" · ");
  return '<div class="print-wrap">' +
    '<h1>' + escapeHtml(les.title_cn || "") + '</h1>' +
    '<div class="print-meta">' + escapeHtml(meta) + '</div>' +
    '<div class="print-info"><span>班级 __________</span><span>姓名 __________</span>' +
      '<span>用时 ______ 分钟</span><span>正确 ______ / ' + qs.length + '</span></div>' +
    '<div class="print-article"><p>' + body + '</p></div>' +
    '<div class="print-qs"><h3>选项</h3>' + qHtml + '</div>' +
    '<div class="print-foot">共 ' + qs.length + ' 题 · 把所选答案填到正文对应编号的横线上</div>' +
  '</div>';
}
function renderPrintView() {
  var area = $("printArea"); if (!area || !lesson) return;
  area.innerHTML = buildPrintHtml(lesson);
  area.hidden = false;
  setTimeout(function () { try { window.print(); } catch (e) {} }, 60);
}
/* 做题统计 */
function getStats() {
  var s = loadStore();
  return {
    totalAnswered: s.totalAnswered || 0,
    totalCorrect: s.totalCorrect || 0,
    routeStats: s.routeStats || {}
  };
}
function recordAnswer(q, isCorrect) {
  var s = loadStore();
  s.totalAnswered = (s.totalAnswered || 0) + 1;
  if (isCorrect) s.totalCorrect = (s.totalCorrect || 0) + 1;
  s.routeStats = s.routeStats || {};
  var r = q.route || "线索词优先";
  if (!s.routeStats[r]) s.routeStats[r] = { total: 0, correct: 0 };
  s.routeStats[r].total++;
  if (isCorrect) s.routeStats[r].correct++;
  saveStore(s);
}

/* ==================== 搭配识别（移植） ==================== */
var COLLOCATION_DICT = (window.CLOZE_COLLOCATIONS || []).concat(window.CLOZE_COLLOCATIONS_2 || []);
var COLLOCATION_RULES = window.CLOZE_PATTERN_RULES || [];
var LEMMA_MAP = window.CLOZE_LEMMA_MAP || {};

function lemma(w) {
  if (!w) return w;
  var s = String(w).toLowerCase();
  if (Object.prototype.hasOwnProperty.call(LEMMA_MAP, s)) return LEMMA_MAP[s];
  if (/ies$/.test(s) && s.length > 4) return s.slice(0, -3) + "y";
  if (/ed$/.test(s) && s.length > 4) {
    var b = s.slice(0, -2);
    if (b.length > 3 && /(.)\1$/.test(b) && !/(?:ss|ll|ee|oo|ff|ck)$/.test(b)) b = b.slice(0, -1);
    if (/(?:[bcdfghjklmnpqrstvwxyz])$/.test(b) && !/(?:id|ld|nd|rd|st)$/.test(s)) return b;
    if (/(?:ed|id|ld|nd|rd|st)$/.test(s)) return s.slice(0, -2);
    return b;
  }
  if (/ing$/.test(s) && s.length > 5) {
    var b2 = s.slice(0, -3);
    if (b2.length > 3 && /(.)\1$/.test(b2) && !/(?:ss|ll|ee|oo|ff|ck)$/.test(b2)) b2 = b2.slice(0, -1);
    return b2;
  }
  if (/s$/.test(s) && !/(?:ss|us|is|as|ys)$/.test(s) && s.length > 3) return s.slice(0, -1);
  return s;
}

function wordTokens(text) {
  return String(text || "").toLowerCase().split(/[^\w']+/).filter(Boolean);
}

var DICT_TOKENS = COLLOCATION_DICT.map(function (item) {
  return {
    raw: item.p, zh: item.zh || "",
    tokens: String(item.p || "").toLowerCase().split(/\s+/).filter(Boolean),
    lemma: String(item.p || "").toLowerCase().split(/\s+/).filter(Boolean).map(function (w) { return w === "*" ? "*" : lemma(w); })
  };
});
var DICT_WILDCARD = ["*", "sb", "sth", "one's", "doing"];
var DICT_PLACEHOLDER = ["*", "sb", "sth", "one's"];

function wordEq(p, a) { return p === a || lemma(p) === lemma(a); }
function seqMatch(pattern, actual) {
  if (pattern.length !== actual.length) return false;
  for (var i = 0; i < pattern.length; i++) {
    var p = pattern[i];
    if (DICT_WILDCARD.indexOf(p) >= 0) continue;
    if (p !== actual[i] && lemma(p) !== lemma(actual[i])) return false;
  }
  return true;
}

function getBlankContext(articleText, qid) {
  var tokens = wordTokens(articleText);
  var idx = tokens.indexOf("__" + qid + "__");
  if (idx < 0) return { before: [], after: [], afterRaw: [] };
  var rawAfter = tokens.slice(idx + 1, idx + 6);
  return { before: tokens.slice(Math.max(0, idx - 5), idx).map(lemma), after: rawAfter.map(lemma), afterRaw: rawAfter };
}

function matchDict(before, after, afterRaw, options, answer) {
  var opts = Array.isArray(options) ? options : [];
  var bestInOptions = null, bestOther = null;
  for (var di = 0; di < DICT_TOKENS.length; di++) {
    var entry = DICT_TOKENS[di];
    var T = entry.lemma;
    if (T.length < 2) continue;
    var isPair = T.length === 2;
    var hasDoing = T.indexOf("doing") >= 0;
    var hasStar = T.indexOf("*") >= 0;
    for (var k = 0; k < T.length; k++) {
      var head = T.slice(0, k), tail = T.slice(k + 1);
      if (head.length > before.length || tail.length > after.length) continue;
      var bPart = before.slice(before.length - head.length);
      var aPart = after.slice(0, tail.length);
      if (!seqMatch(head, bPart)) continue;
      if (!seqMatch(tail, aPart)) continue;
      var missing = entry.tokens[k];
      if (DICT_PLACEHOLDER.indexOf(missing) >= 0) continue;
      if (isPair) {
        if (k === 1) { if (!before.length || !wordEq(T[0], before[before.length - 1])) continue; }
        else if (!after.length || !wordEq(T[1], after[0])) continue;
        if (!(opts.indexOf(missing) >= 0 || (answer && missing === answer))) continue;
      }
      if (hasDoing && missing !== "doing") { if (!(afterRaw[0] && /ing$/.test(afterRaw[0]))) continue; }
      var realCount = head.concat(tail).filter(function (w) { return DICT_WILDCARD.indexOf(w) < 0; }).length;
      if (realCount === 0) continue;
      var score = T.length * 2 + k + realCount * 3;
      if (hasDoing) score -= 8;
      if (hasStar) score -= 4;
      if (answer && missing === answer) score += 50;
      var cand = { entry: entry, k: k, missing: missing, score: score, realCount: realCount };
      var inOptions = opts.length > 0 && opts.indexOf(missing) >= 0;
      if (inOptions) { cand.score += 20; if (!bestInOptions || cand.score > bestInOptions.score) bestInOptions = cand; }
      else if (!bestOther || cand.score > bestOther.score) {
        var acceptable = opts.length === 0 || realCount >= 3 || (hasDoing && missing === "doing");
        if (acceptable) bestOther = cand;
      }
      break;
    }
  }
  return bestInOptions || bestOther;
}

function classifyDictType(tokens) {
  var first = tokens[0];
  if (first === "be") return "形容词 / 系表搭配";
  if (["in", "on", "at", "by", "for", "with", "without", "out", "to", "from", "of", "instead", "because", "thanks", "due", "according", "first", "all", "a", "an", "the", "one", "some", "most", "many", "each", "both", "none", "hundreds", "thousands", "millions", "billions", "dozens", "scores", "as"].indexOf(first) >= 0) return "介词 / 固定短语";
  return "动词短语";
}

function detectCollocation(q, sentence, ctx) {
  if (ctx && (ctx.before.length || ctx.after.length)) {
    var hit = matchDict(ctx.before, ctx.after, ctx.afterRaw, q && q.options, q && q.answer);
    if (hit) {
      var words = hit.entry.raw.split(" ");
      var shown = words.map(function (w, i) { return i === hit.k ? "____" : w; }).join(" ");
      return { name: hit.entry.raw, type: classifyDictType(hit.entry.tokens), structure: (hit.entry.zh ? hit.entry.zh + "｜" : "") + shown, dual: false };
    }
  }
  var text = String(sentence || "").toLowerCase().replace(/__\d+__/g, "____");
  for (var ri = 0; ri < COLLOCATION_RULES.length; ri++) {
    var rule = COLLOCATION_RULES[ri];
    if (rule.pattern.test(text)) return { name: rule.name, type: rule.type, structure: rule.structure, dual: !!rule.dual };
  }
  return null;
}

function getQuestionSentence(qid, articleText) {
  var text = String(articleText || "");
  var marker = "__" + qid + "__";
  var sentences = text.split(/(?<=[.!?]["']?)\s+(?=[A-Z])/);
  var sent = sentences.find(function (s) { return s.indexOf(marker) >= 0; });
  return sent ? sent.trim() : text;
}

function normalizeQuestionRouteAndCollocation(q, articleText) {
  if (!q || !articleText) return;
  var detected = null;
  try { detected = detectCollocation(q, getQuestionSentence(q.q, articleText), getBlankContext(articleText, q.q)); }
  catch (err) { return; }
  if (detected) {
    var KNOWN_ROUTES = ["线索词优先", "固定搭配优先", "双路径", "整组短语直接辨析"];
    var hasRoute = q.route && KNOWN_ROUTES.includes(q.route);
    if (!hasRoute) {
      if (!q.collocation) q.collocation = { name: detected.name, type: detected.type, structure: detected.structure };
      q.route = detected.dual ? "双路径" : "固定搭配优先";
    } else if (!q.collocation && !detected.dual && detected.type !== "动词短语") {
      q.collocation = { name: detected.name, type: detected.type, structure: detected.structure };
    }
  }
}

/* ==================== 线索归因（讲义规则版） ====================
 * 早期这里有一套「答案词复现 + 位置窗口」的启发式生成器，会按自己的口径
 * 重写 q.clues / q.clueTypes（标签是「原词复现 / 同词根复现 / 前置语境」）。
 * 2026-09-23 起线索一律由 clue-rules.js 按讲义五类规则生成：
 *   逻辑线索 / 复现线索 / 情感线索 / 固定搭配 / 熟词生义（+ 同位解释 / 搭配骨架）
 * 数据层（_clue_rebuild.js）已把结果固化进 builtin-lessons.js；
 * 这里在运行时复算一遍，是为了让老师直接改 clue-rules.js 就能立刻生效。 */
function normalizeQuestionClues(q, articleText) {
  if (!q || !articleText) return;
  if (!Array.isArray(q.clues)) q.clues = [];
  var api = window.CLOZE_CLUE_API;
  if (!api || typeof api.buildClues !== "function") return;   // 规则库没加载 → 保留既有数据
  var built = api.buildClues({ article_text_with_blanks: articleText }, q, { maxClues: 3 });
  if (!built || !built.clues || !built.clues.length) return;
  q.clues = built.clues;
  q.clueTypes = built.clueTypes || {};
}

/* ==================== 工具函数 ==================== */
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function $(id) { return document.getElementById(id); }
function toast(msg) {
  var t = $("toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 3500);
}
function findQuestion(id) { return (lesson.questions || []).find(function (x) { return x.q === id; }); }
function showStep(id, visible) { var el = $(id); if (el) el.classList.toggle("hidden", !visible); }

function blockWheelZoom() {
  document.addEventListener("wheel", function (e) { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, { passive: false });
}

/* ==================== 视图管理 ==================== */
function showView(name) {
  activeView = name;
  document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("active"); v.hidden = true; });
  var target = $(name + "View");
  if (target) { target.classList.add("active"); target.hidden = false; }
  document.querySelectorAll(".nav-tab").forEach(function (t) { t.classList.toggle("active", t.dataset.view === name); });
  if (name === "library") renderLibrary();
  if (name === "methodology" && window.renderKnowledgePoints) window.renderKnowledgePoints();
  if (name === "notebook") renderNotebook();
  if (name === "progress") renderProgress();
  if (name === "vocab") renderVocab();
}

/* ==================== 题库渲染与筛选 ==================== */
function normalizeLesson(l) {
  var art = l.article_text_with_blanks || "";
  (l.questions || []).forEach(function (q) {
    normalizeQuestionRouteAndCollocation(q, art);
    /* 线索不在启动时全量复算 —— 2086 题跑一遍 buildClues 要 5 秒以上，
     * 是主页打开慢的根源。数据层落盘值已经过幂等校验，
     * 真正需要时 openLesson 会对当前篇复算一次（单篇 <30ms）。 */
  });
}

/* ---------- 筛选数据准备 ---------- */

/** 按任意键统计篇数 */
function countBy(fn) {
  var m = {};
  library.forEach(function (l) {
    var k = fn(l);
    if (k === null || k === undefined || k === "") k = "其他";
    m[k] = (m[k] || 0) + 1;
  });
  return m;
}

var BLANK_KEYS = null;   // 空数筛选里「单列出来」的空数集合（篇数 >= 3 的）
function blankKeys() {
  if (BLANK_KEYS) return BLANK_KEYS;
  var c = countBy(function (l) { return String((l.questions || []).length); });
  BLANK_KEYS = Object.keys(c).filter(function (k) { return c[k] >= 3; })
    .map(Number).sort(function (a, b) { return a - b; });
  return BLANK_KEYS;
}

function getRegions() {
  var regions = new Set();
  library.forEach(function (l) { if (l.region) regions.add(l.region); });
  return Array.from(regions).sort();
}

/** 地区归属省：省级市归自己，地市级挂到省下（江苏南通 → 江苏） */
function provinceOf(r) {
  if (r === "全国通用") return "通用";
  if (PROVINCES.indexOf(r) >= 0) return r;
  var best = "";
  PROVINCES.forEach(function (p) { if (r.indexOf(p) === 0 && p.length > best.length) best = p; });
  return best || "其他";
}

/* ---------- 筛选器渲染 ---------- */

function renderKindFilters() {
  var box = $("kindFilters"); if (!box) return;
  var c = countBy(function (l) { return l.source_kind; });
  var keys = KIND_ORDER.filter(function (k) { return c[k]; });
  Object.keys(c).forEach(function (k) { if (KIND_ORDER.indexOf(k) < 0) keys.push(k); });
  var html = ['<button class="filter-chip' + (filterState.kind === "all" ? " active" : "") +
    '" data-dim="kind" data-value="all" type="button">全部<span class="chip-num">' + library.length + '</span></button>'];
  keys.forEach(function (k) {
    html.push('<button class="filter-chip' + (filterState.kind === k ? " active" : "") +
      '" data-dim="kind" data-value="' + escapeHtml(k) + '" type="button">' + escapeHtml(k) +
      '<span class="chip-num">' + c[k] + '</span></button>');
  });
  box.innerHTML = html.join("");
}

function renderBlanksFilters() {
  var box = $("blanksFilters"); if (!box) return;
  var c = countBy(function (l) { return String((l.questions || []).length); });
  var nums = blankKeys();
  var otherTotal = Object.keys(c).reduce(function (s, k) {
    return nums.indexOf(Number(k)) < 0 ? s + c[k] : s;
  }, 0);
  var html = ['<button class="filter-chip' + (filterState.blanks === "all" ? " active" : "") +
    '" data-dim="blanks" data-value="all" type="button">全部</button>'];
  nums.forEach(function (n) {
    html.push('<button class="filter-chip' + (filterState.blanks === String(n) ? " active" : "") +
      '" data-dim="blanks" data-value="' + n + '" type="button" title="共 ' + c[String(n)] + ' 篇">' + n + '空</button>');
  });
  if (otherTotal) {
    html.push('<button class="filter-chip' + (filterState.blanks === "other" ? " active" : "") +
      '" data-dim="blanks" data-value="other" type="button" title="其余空数共 ' + otherTotal + ' 篇">其他</button>');
  }
  box.innerHTML = html.join("");
}

function renderYearFilter() {
  var sel = $("yearFilter"); if (!sel) return;
  var c = countBy(function (l) { return l.exam_year ? String(l.exam_year) : "none"; });
  var years = Object.keys(c).filter(function (k) { return k !== "none"; })
    .map(Number).sort(function (a, b) { return b - a; });
  var html = ['<option value="all">全部年份</option>'];
  years.forEach(function (y) {
    html.push('<option value="' + y + '">' + y + ' 年（' + c[String(y)] + '）</option>');
  });
  if (c.none) html.push('<option value="none">未标注年份（' + c.none + '）</option>');
  sel.innerHTML = html.join("");
  sel.value = filterState.year === "all" ? "all" : filterState.year;
}

/** 地区下拉：可搜索 + 按省分组（省本身作为「全省」选项排在地市之前） */
function renderRegionCombo(keyword) {
  var label = $("regionLabel"), list = $("regionList");
  if (!list) return;
  var c = countBy(function (l) { return l.region || "全国通用"; });
  if (label) {
    label.textContent = filterState.region === "all"
      ? "全部地区（" + library.length + "）"
      : filterState.region + "（" + (c[filterState.region] || 0) + "）";
  }

  /* 分组 */
  var groups = {};
  getRegions().forEach(function (r) {
    if (!c[r]) return;
    var p = provinceOf(r);
    (groups[p] = groups[p] || []).push(r);
  });
  /* 组顺序：通用 → 篇数多的省 → 其他 */
  var order = Object.keys(groups).sort(function (a, b) {
    if (a === "通用") return -1;
    if (b === "通用") return 1;
    var sa = groups[a].reduce(function (s, r) { return s + c[r]; }, 0);
    var sb = groups[b].reduce(function (s, r) { return s + c[r]; }, 0);
    if (sa !== sb) return sb - sa;
    return a.localeCompare(b);
  });

  var kw = String(keyword || "").trim().toLowerCase();
  var html = [];
  var total = 0;
  order.forEach(function (p) {
    var rows = groups[p].slice().sort(function (a, b) {
      /* 省本身（全省）优先，其余按篇数降序 */
      var ap = PROVINCES.indexOf(a) >= 0 ? 0 : 1, bp = PROVINCES.indexOf(b) >= 0 ? 0 : 1;
      if (ap !== bp) return ap - bp;
      if (c[a] !== c[b]) return c[b] - c[a];
      return a.localeCompare(b);
    }).filter(function (r) { return !kw || r.toLowerCase().indexOf(kw) >= 0; });
    if (!rows.length) return;
    html.push('<div class="combo-group">' + escapeHtml(p) + '</div>');
    rows.forEach(function (r) {
      total++;
      var isProv = PROVINCES.indexOf(r) >= 0;
      var sub = isProv || r === "全国通用" ? "" : " sub";
      var sel = filterState.region === r ? " selected" : "";
      var name = r === "全国通用" ? "全国通用" : (isProv ? r + "（全省）" : r);
      html.push('<button class="combo-opt' + sub + sel + '" type="button" role="option" data-value="' +
        escapeHtml(r) + '">' + escapeHtml(name) + '<em>' + c[r] + '</em></button>');
    });
  });
  /* 全部选项置顶 */
  html.unshift('<button class="combo-opt' + (filterState.region === "all" ? " selected" : "") +
    '" type="button" role="option" data-value="all">全部地区<em>' + library.length + '</em></button>');
  if (!total) html.push('<div class="combo-empty">没有匹配的地区</div>');
  list.innerHTML = html.join("");
}

function closeRegionCombo() {
  var pop = $("regionPop"), combo = $("regionCombo"), btn = $("regionBtn");
  if (pop) pop.hidden = true;
  if (combo) combo.classList.remove("collapsed-region");
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function openRegionCombo() {
  var pop = $("regionPop"), combo = $("regionCombo"), btn = $("regionBtn"), inp = $("regionSearch");
  renderRegionCombo("");
  if (inp) inp.value = "";
  if (pop) pop.hidden = false;
  if (combo) combo.classList.add("collapsed-region");
  if (btn) btn.setAttribute("aria-expanded", "true");
  if (inp) setTimeout(function () { inp.focus(); }, 0);
}

function renderFilterSummary(n) {
  var box = $("filterSummary"); if (!box) return;
  var labels = { kind: "来源", type: "题型", region: "地区", year: "年份", blanks: "空数", difficulty: "难度" };
  var parts = [];
  FILTER_DIMS.forEach(function (d) {
    var v = filterState[d];
    if (v === "all") return;
    if (d === "blanks") v = v === "other" ? "其他空数" : v + " 空";
    if (d === "year") v = v === "none" ? "未标注年份" : v + " 年";
    parts.push(labels[d] + "：" + v);
  });
  if (!parts.length) { box.hidden = true; return; }
  box.hidden = false;
  box.innerHTML = "当前筛选　" + parts.map(function (p) { return escapeHtml(p); }).join("　·　") +
    '　<strong>共 ' + n + ' 篇</strong>';
}

/** 一次性重画全部筛选控件（保持勾选态与数据一致） */
function renderFilterControls() {
  renderKindFilters();
  renderBlanksFilters();
  renderYearFilter();
  renderRegionCombo("");
  var df = $("difficultyFilter");
  if (df) df.value = filterState.difficulty;
}

/* ---------- 筛选逻辑 ---------- */

function matchesFilters(l) {
  if (filterState.type !== "all" && l.lesson_type !== filterState.type) return false;
  if (filterState.kind !== "all" && l.source_kind !== filterState.kind) return false;
  if (filterState.region !== "all" && l.region !== filterState.region) return false;
  if (filterState.difficulty !== "all" && l.difficulty !== filterState.difficulty) return false;
  if (filterState.year !== "all") {
    if (filterState.year === "none") { if (l.exam_year) return false; }
    else if (String(l.exam_year) !== String(filterState.year)) return false;
  }
  if (filterState.blanks !== "all") {
    var n = (l.questions || []).length;
    if (filterState.blanks === "other") {
      if (blankKeys().indexOf(n) >= 0) return false;
    } else if (String(n) !== String(filterState.blanks)) return false;
  }
  return true;
}

/* ---------- 筛选状态持久化与分享 ---------- */

function saveFilterPref() {
  try { localStorage.setItem(STORAGE_KEY + ":filters", JSON.stringify(filterState)); } catch (e) { /* 忽略 */ }
}
function loadFilterPref() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY + ":filters") || "null"); } catch (e) { return null; }
}
function readHashFilters() {
  var h = String(location.hash || "").replace(/^#/, "");
  if (!h) return null;
  var out = {}, any = false;
  h.split("&").forEach(function (pair) {
    var i = pair.indexOf("=");
    if (i < 0) return;
    var key = HASH_KEYS[pair.slice(0, i)];
    if (!key) return;
    out[key] = decodeURIComponent(pair.slice(i + 1));
    any = true;
  });
  return any ? out : null;
}
function writeHashFilters() {
  var parts = [];
  FILTER_DIMS.forEach(function (d) {
    if (filterState[d] === "all") return;
    parts.push(HASH_KEY_OF[d] + "=" + encodeURIComponent(filterState[d]));
  });
  var h = parts.length ? "#" + parts.join("&") : "";
  if (location.hash === h) return;
  try { history.replaceState(null, "", location.pathname + location.search + h); }
  catch (e) { /* file:// 下可能受限，忽略即可 */ }
}
function applyFilterState(src) {
  FILTER_DIMS.forEach(function (d) {
    var v = src && src[d] != null ? String(src[d]) : "all";
    filterState[d] = v || "all";
  });
}
/** 任一筛选变化后的统一收尾：存偏好 → 同步地址栏 → 重画 */
function onFilterChanged() {
  saveFilterPref();
  writeHashFilters();
  renderLibrary();
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function (resolve, reject) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("execCommand failed"));
    } catch (e) { reject(e); }
  });
}

/* ---------- 题库列表渲染 ---------- */

/** 标题是否只是「来源串」占位（177 篇如此，没有中文真标题） */
function isSourceLikeTitle(l) {
  var tc = String(l.title_cn || "").trim();
  if (!tc) return true;
  if (tc === String(l.source || "").trim()) return true;
  return /中考真题|真题|一模|二模|模拟|预测|汇编|学业水平/.test(tc) && tc.length <= 32;
}

/** 用英文首句做副标题：去掉空格标记、压掉换行、超长截断 */
function sentenceExcerpt(s) {
  var x = String(s || "").replace(/__\d+__/g, " ").replace(/\s+/g, " ").trim();
  if (x.length > 96) x = x.slice(0, 96).replace(/\s+\S*$/, "") + "…";
  return x;
}

function pad3(n) { return (n < 10 ? "00" : n < 100 ? "0" : "") + n; }

function routeText(l) {
  var rs = l.route_summary || {};
  return Object.keys(rs).filter(function (k) { return rs[k] > 0; }).join(" · ");
}

function buildLessonRow(l, no) {
  var done = isDone(l.id);
  var qCount = (l.questions || []).length;
  var title = String(l.title_cn || l.title || "未命名").trim();

  /* 来源信息：清楚标注（真题年份 · 来源串 · 来源类型） */
  var srcBits = [];
  if (l.source) srcBits.push(escapeHtml(l.source));
  if (l.source_kind) srcBits.push(escapeHtml(l.source_kind));
  if (l.exam_year) srcBits.push(l.exam_year + " 年");
  var srcLine = srcBits.length ? srcBits.join(" · ") : "来源未标注";

  var chips = [];
  chips.push('<span class="chip chip-region">上海</span>');
  if (l.source_kind) {
    chips.push('<span class="chip chip-kind" data-kind="' + escapeHtml(l.source_kind) + '">' + escapeHtml(l.source_kind) + '</span>');
  }
  if (l.exam_year) chips.push('<span class="chip chip-year">' + l.exam_year + '</span>');
  chips.push('<span class="chip chip-blank">' + qCount + ' 空</span>');
  if (done) chips.push('<span class="badge-done">已完成</span>');

  var tags = [];
  if (l.lesson_type) tags.push('<span class="tag-type">' + escapeHtml(l.lesson_type) + '</span>');
  if (l.difficulty) tags.push('<span class="tag-difficulty" data-diff="' + escapeHtml(l.difficulty) + '">' + escapeHtml(l.difficulty) + '</span>');

  var row = document.createElement("div");
  row.className = "lesson-row" + (done ? " done" : "");
  row.setAttribute("role", "button");
  row.setAttribute("tabindex", "0");
  row.innerHTML =
    '<div class="lesson-no">' + pad3(no) + '</div>' +
    '<div class="lesson-main">' +
      '<h3>' + escapeHtml(title) + '</h3>' +
      '<div class="lesson-source">来源：' + srcLine + '</div>' +
      '<div class="lesson-chips">' + chips.join("") + '</div>' +
    '</div>' +
    '<div class="lesson-side">' +
      '<div class="lesson-side-tags">' + tags.join("") + '</div>' +
      '<span class="lesson-arrow" aria-hidden="true">→</span>' +
    '</div>';

  var go = function () { openLesson(l.id); };
  row.addEventListener("click", go);
  row.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
  });
  return row;
}

function renderLibrary() {
  updateHeroStats();
  var box = $("libraryGrid");
  var empty = $("emptyLibrary");
  if (!box) return;
  renderFilterControls();
  var filtered = library.filter(matchesFilters);
  /* 按 2026 → 2018 时间倒序：新真题排前面 */
  filtered.sort(function (a, b) { return (b.exam_year || 0) - (a.exam_year || 0); });
  renderFilterSummary(filtered.length);
  box.innerHTML = "";
  if (!filtered.length) { empty.hidden = false; return; }
  empty.hidden = true;
  filtered.forEach(function (l, i) { box.appendChild(buildLessonRow(l, i + 1)); });
}

function updateHeroStats() {
  var totalQ = library.reduce(function (s, l) { return s + (l.questions || []).length; }, 0);
  var done = library.filter(function (l) { return isDone(l.id); }).length;
  var stats = getStats();
  $("heroTotalLessons").textContent = library.length;
  $("heroTotalQuestions").textContent = totalQ;
  $("heroCompleted").textContent = done;
  $("heroAccuracy").textContent = stats.totalAnswered > 0 ? Math.round(stats.totalCorrect / stats.totalAnswered * 100) + "%" : "—";
  // 数字由数据驱动，避免改题库后文案过期
  var tp = $("trustPill");
  if (tp) tp.textContent = library.length + " 篇 · " + totalQ + " 道空逐空复核";
  var hs = $("heroSub");
  if (hs) hs.textContent = "不靠语感，靠路线。每道题都有可验证的线索证据——来自 " + library.length + " 篇、共 " + totalQ + " 道空的逐空复核。";
  var ks = $("kpSub");
  if (ks) ks.textContent = "每个知识点包含讲解和 5-10 道专项训练题。从具体技能开始，一道一道练透。覆盖 " + library.length + " 篇、共 " + totalQ + " 道空。";
  var sl = $("scopeLessons"); if (sl) sl.textContent = library.length;
  var sq = $("scopeQuestions"); if (sq) sq.textContent = totalQ;
  updateNavBadge();
}

function updateNavBadge() {
  var badge = $("navNotebookCount");
  var count = getErrors().length;
  if (count > 0) { badge.textContent = count; badge.hidden = false; }
  else { badge.hidden = true; }
}

/* ==================== 做题视图 ==================== */
function openLesson(id) {
  var les = library.find(function (l) { return l.id === id; });
  if (!les) return;
  currentId = id; lesson = les;
  (lesson.questions || []).forEach(function (q) {
    normalizeQuestionRouteAndCollocation(q, lesson.article_text_with_blanks || "");
    normalizeQuestionClues(q, lesson.article_text_with_blanks || "");
  });
  passageParts = parsePassage(lesson.article_text_with_blanks || "");
  selectedId = null; answers = {}; checked = {}; posPassed = {}; reasoningRoutes = {}; currentQ = null;
  showView("study");
  renderLessonHead(les);
  renderToneCard(les);
  renderQNav();                 // 题号导航格（先于正文，便于跳题）
  startLessonTimer();           // 整篇计时开表
  renderPassage();
  renderStudyTools();          // 搭配 / 翻译：打开篇目就挂上，不等做完题
  bindStudyTabs();
  switchStudyPane(pendingStudyPane || "practice"); // 带 hash 进来时落到对应标签，否则回真题练习
  pendingStudyPane = null;
  $("emptyState").classList.remove("hidden");
  $("questionBox").classList.add("hidden");
  // 页面滚动容器是 main.container（此处原先按 id 取，取到 null 会抛错）
  var scroller = document.querySelector("main.container");
  if (scroller) scroller.scrollTop = 0;
  else window.scrollTo(0, 0);
}

function backToLibrary() {
  stopLessonTimer(true);        // 离开篇目即停表（静默：不标绿，回库不显示）
  var nav = $("qNav"); if (nav) nav.hidden = true;
  showView("library");
  currentId = null;
}

function renderLessonHead(les) {
  var title = les.title_cn || les.title || "未命名";
  var qCount = (les.questions || []).length;
  var doneCount = (les.questions || []).filter(function (x) { return checked[x.q]; }).length;
  $("lessonMeta").innerHTML =
    '<strong>' + escapeHtml(title) + '</strong>' +
    '<span>' + escapeHtml(les.level || "") + '</span>' +
    '<span>' + escapeHtml(les.difficulty || "") + '</span>' +
    '<span>' + escapeHtml(les.lesson_type || "") + '</span>' +
    '<span>' + escapeHtml(les.region || "") + '</span>' +
    '<span>' + qCount + ' 题</span>' +
    '<span class="progress-tag">' + doneCount + '/' + qCount + '</span>';
}

/* ============================================================
 * 第一步 · 首尾定调（读全文之前先判断文章走向）
 * ------------------------------------------------------------
 * 数据来源（判题时写好）：
 *   first_sentence / last_sentence  首尾句原文，逐字对齐正文
 *   tone.answer     积极 | 消极 | 转折变化
 *   tone.reason     ≥30 字中文理由，选对后才放出
 *   tone_markers    关键位置标注词（转折处 / 收尾处标出原文单词）
 *   route_summary   整篇路线分布
 * 守则：
 *   · 选项只有三个走向词，不含任何答案词 → 不泄题
 *   · 曲线两端锚点（首尾句）默认已知，中段一律不渲 → 选对才揭晓
 *   · 曲线形状由 tone.answer 驱动大势：积极上扬弧 / 转折变化 V 形 / 消极下滑弧
 *   · tone_markers 的 word 必须能在原文逐字找到（校验器已检查）
 * ============================================================ */
var TONE_ANSWERS = ["积极", "消极", "转折变化"];
/* 说明建议类另设一套问法（2026-09-23）：
 *   「积极 / 消极 / 转折变化」是叙事文的情感弧线口径，套到说明建议类上是错配 ——
 *   那 97 篇里 81% 被迫判成「积极」，学生照着理解反而被带偏。
 *   说明建议类问的是「文章怎么展开」，所以换成结构三选一。 */
var TONE_SHAPES = ["问题—建议", "现象—说明", "观点—例证"];
var TONE_SHAPE_ROLES = {
  "问题—建议": ["提出问题", "分析 · 做法", "给出建议"],
  "现象—说明": ["摆出现象", "解释原因", "总结特点"],
  "观点—例证": ["提出观点", "举例支撑", "回扣观点"]
};
var toneState = null;   // { passed, picked, collapsed }

function toneData(les) {
  var L = les || lesson;
  if (!L || !L.tone || !L.tone.answer) return null;
  var ans = String(L.tone.answer).trim();
  var kind = String(L.tone.kind || "narrative");
  var shape = String(L.tone.shape || "").trim();
  var isExpo = (kind === "expository" && TONE_SHAPES.indexOf(shape) >= 0);
  if (!isExpo && TONE_ANSWERS.indexOf(ans) === -1) return null;
  var markers = Array.isArray(L.tone_markers) ? L.tone_markers.filter(function (m) {
    return m && typeof m.word === "string" && typeof m.pos === "string";
  }) : [];
  return {
    kind: isExpo ? "expository" : "narrative",
    answer: isExpo ? shape : ans,                       // 学生要选的那个
    rawAnswer: ans,                                     // 叙事口径的原始判定（说明类保留作参考）
    reason: isExpo ? String(L.tone.shape_reason || L.tone.reason || "") : String(L.tone.reason || ""),
    first: String(L.first_sentence || ""),
    last: String(L.last_sentence || ""),
    markers: markers,
    routes: L.route_summary || null,
    roles: isExpo ? TONE_SHAPE_ROLES[shape] : null
  };
}

/** 说明建议类 · 结构骨架图：三段流程条，替代情感曲线
 *  它要回答的不是「情绪往哪走」，而是「文章分几步展开」。 */
function drawToneStructure(shape, markers, reveal, svg, W, H) {
  var roles = shape ? TONE_SHAPE_ROLES[shape] : ["首段", "中段", "末段"];
  var html = "";
  var boxW = 152, gap = 32, total = boxW * 3 + gap * 2;
  var x0 = (W - total) / 2, y0 = 44, boxH = 52;

  for (var i = 0; i < 3; i += 1) {
    var x = x0 + i * (boxW + gap);
    var known = !!shape;
    var fill = known ? "#E3F5EC" : "#EDF3EF";
    var stroke = known ? "#0F9D6C" : "#D2DFD7";
    var tcol = known ? "#095F42" : "#8CA097";
    html += '<rect x="' + x + '" y="' + y0 + '" width="' + boxW + '" height="' + boxH +
      '" rx="9" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5"/>';
    html += '<text x="' + (x + boxW / 2) + '" y="' + (y0 + 22) + '" text-anchor="middle" font-size="13" fill="' + tcol +
      '" font-weight="600">' + escapeHtml(roles[i]) + '</text>';
    var sub = i === 0 ? "首句" : (i === 1 ? "展开" : "尾句");
    html += '<text x="' + (x + boxW / 2) + '" y="' + (y0 + 40) + '" text-anchor="middle" font-size="11" fill="#8CA097">' +
      escapeHtml(sub) + '</text>';
    if (i < 2) {
      var ax = x + boxW + 6;
      html += '<line x1="' + ax + '" y1="' + (y0 + boxH / 2) + '" x2="' + (ax + gap - 12) + '" y2="' + (y0 + boxH / 2) +
        '" stroke="' + (known ? "#0F9D6C" : "#D2DFD7") + '" stroke-width="2"/>';
      html += '<path d="M' + (ax + gap - 12) + ' ' + (y0 + boxH / 2) + ' l-5 -4 l0 8 z" fill="' +
        (known ? "#0F9D6C" : "#D2DFD7") + '"/>';
    }
  }

  /* 中段标题：未揭晓 / 已揭晓 */
  html += '<text x="' + (W / 2) + '" y="22" text-anchor="middle" font-size="13" fill="' +
    (shape ? "#095F42" : "#8CA097") + '" font-weight="600">' +
    escapeHtml(shape || "结构 · 待判断") + '</text>';

  /* 收尾基调词标在第三段下方（说明文没有情感转折，不标 turn） */
  var endMk = (markers || []).filter(function (mk) { return mk.pos === "end"; })[0];
  if (endMk && endMk.word) {
    var cx2 = x0 + 2 * (boxW + gap) + boxW / 2;
    html += '<circle cx="' + cx2 + '" cy="' + (y0 + boxH) + '" r="4" fill="#178A50" stroke="#fff" stroke-width="2"/>';
    html += '<text x="' + cx2 + '" y="' + (y0 + boxH + 20) + '" text-anchor="middle" font-size="12" fill="#178A50" font-weight="600">' +
      escapeHtml(String(endMk.word)) + '</text>';
    html += '<text x="' + cx2 + '" y="' + (y0 + boxH + 34) + '" text-anchor="middle" font-size="11" fill="#8CA097">' +
      escapeHtml(String(endMk.label || "收尾")) + '</text>';
  }

  svg.innerHTML = html;
  if (reveal) {
    var rects = svg.querySelectorAll("rect");
    Array.prototype.forEach.call(rects, function (r, i) {
      r.style.opacity = "0";
      r.style.transition = "opacity .32s ease-out";
      window.setTimeout(function () { r.style.opacity = "1"; }, 90 * i);
    });
  }
}

function renderToneCard(les) {
  var card = $("toneCard");
  if (!card) return;
  var d = toneData(les);
  if (!d) { card.hidden = true; return; }

  card.hidden = false;
  toneState = { passed: false, picked: "", collapsed: false };

  $("toneFirst").textContent = d.first || "—";
  $("toneLast").textContent = d.last || "—";

  /* 按文章类型切换整套文案：叙事文问「走向」，说明建议类问「结构」 */
  var isExpo = d.kind === "expository";
  var sub = $("toneSub"), askQ = $("toneAskQ");
  var lgH = $("toneLgHidden"), lgR = $("toneLgRevealed");
  if (sub) sub.textContent = isExpo
    ? "读全文之前，先看首尾句，判断文章怎么展开"
    : "读全文之前，先看首尾句，判断文章往哪走";
  var tl = $("toneTitle");
  if (tl) tl.textContent = isExpo ? "结构预判" : "首尾定调";
  var vt = $("toneVerdictTag");
  if (vt) vt.textContent = isExpo ? "结构判定" : "定调成功";  if (askQ) askQ.textContent = isExpo ? "这篇文章的结构是？" : "这篇文章的走向是？";
  if (lgH) lgH.textContent = isExpo ? "待判断：展开结构" : "待判断：中段走向";
  if (lgR) lgR.textContent = isExpo ? "已揭晓：结构骨架" : "已揭晓：走向曲线";

  var box = $("toneOptions");
  var pool = isExpo ? TONE_SHAPES : TONE_ANSWERS;
  box.innerHTML = pool.map(function (k) {
    return '<button class="tone-opt" type="button" data-tone="' + escapeHtml(k) + '">' + escapeHtml(k) + '</button>';
  }).join("");
  Array.prototype.forEach.call(box.querySelectorAll(".tone-opt"), function (btn) {
    btn.addEventListener("click", function () { pickTone(btn.getAttribute("data-tone")); });
  });

  $("toneFeedback").textContent = "";
  $("toneFeedback").className = "tone-feedback";
  var res = $("toneResult"); res.hidden = true; res.classList.remove("show");
  $("toneLgHidden").hidden = false;
  $("toneLgRevealed").hidden = true;
  var mini = $("toneMini"); if (mini) mini.hidden = true;
  var cb = $("toneCollapseBtn");
  if (cb) { cb.hidden = false; cb.textContent = "收起"; cb.setAttribute("aria-expanded", "true"); }
  card.classList.remove("collapsed");

  drawToneChart({ kind: d.kind, answer: null }, null, false);   // 中段未知形态
}

/** 点选项：选错可无限重选且不给正确答案；选对才放行并揭晓曲线 */
function pickTone(pick) {
  var d = toneData();
  if (!d || (toneState && toneState.passed)) return;
  toneState.picked = pick;
  var box = $("toneOptions");
  Array.prototype.forEach.call(box.querySelectorAll(".tone-opt"), function (b) {
    b.classList.toggle("picked", b.getAttribute("data-tone") === pick);
    b.classList.remove("wrong", "right");
  });

  if (pick !== d.answer) {
    /* 不告诉正确答案，只说该往哪看 —— 判断权留给学生 */
    var btn = box.querySelector('.tone-opt[data-tone="' + pick + '"]');
    if (btn) btn.classList.add("wrong");
    var fb = $("toneFeedback");
    fb.textContent = d.kind === "expository"
      ? "再想想：首句是在抛问题、摆现象，还是先给一个观点？"
      : "再想想：首句和尾句分别在说什么？";
    fb.className = "tone-feedback is-wrong";
    return;
  }

  toneState.passed = true;
  var ok = box.querySelector('.tone-opt[data-tone="' + pick + '"]');
  if (ok) ok.classList.add("right");
  var f2 = $("toneFeedback"); f2.textContent = ""; f2.className = "tone-feedback";

  $("toneVerdict").textContent = d.answer;
  $("toneReason").textContent = d.reason || "";
  $("toneRoutes").innerHTML = buildRouteBar(d.routes);
  $("toneLgHidden").hidden = true;
  $("toneLgRevealed").hidden = false;
  var res = $("toneResult"); res.hidden = false;
  setTimeout(function () { res.classList.add("show"); }, 10);

  drawToneChart(d, d.markers, true);
}

/** 路线分布条：让老师一眼看出这篇考什么 */
function buildRouteBar(routes) {
  if (!routes) return "";
  var keys = ["线索词优先", "固定搭配优先", "双路径", "整组短语直接辨析"];
  var total = keys.reduce(function (n, k) { return n + (Number(routes[k]) || 0); }, 0);
  if (!total) return "";
  var parts = keys.map(function (k) {
    var n = Number(routes[k]) || 0;
    if (!n) return "";
    var pct = Math.round(n / total * 100);
    return '<span class="tone-route"><b>' + escapeHtml(k) + '</b>' + n + ' 题 · ' + pct + '%</span>';
  }).join("");
  return '<span class="tone-routes-label">本篇路线分布</span>' + parts;
}

/** 画走向图
 *  叙事文 → 情感曲线，形状由 tone.answer 驱动大势（不逐句标情绪值）：
 *    积极 → 上扬弧（左低右高）
 *    消极 → 下滑弧（左高右低）
 *    转折变化 → 先降后升 V 形（中段到底）
 *  说明建议类 → 结构骨架图（三段流程条），见 drawToneStructure
 *  在关键位置标出原文单词：start 起点 / turn 转折谷底 / end 收尾
 *  reveal = true 时从左到右逐段画开（stroke-dashoffset 动画）。
 *  第一个参数接受 { kind, answer } 或直接传 answer 字符串（向后兼容）。
 */
function drawToneChart(ctxOrAnswer, markers, reveal) {
  var svg = $("toneChartSvg");
  if (!svg) return;
  var W = 600, H = 150, PADX = 38, PADY = 28;
  var ctx = (ctxOrAnswer && typeof ctxOrAnswer === "object")
    ? ctxOrAnswer : { kind: "narrative", answer: ctxOrAnswer };
  if (ctx.kind === "expository") {
    drawToneStructure(ctx.answer, markers, reveal, svg, W, H);
    return;
  }
  var answer = ctx.answer;
  var top = PADY, mid = H / 2, bot = H - PADY;
  var leftX = PADX, rightX = W - PADX, cx = W / 2;

  var anchors;
  if (answer === "转折变化") {
    anchors = { start: [leftX, mid - 8], turn: [cx, bot - 4], end: [rightX, top + 6] };
  } else if (answer === "消极") {
    anchors = { start: [leftX, top + 6], end: [rightX, bot - 4] };
  } else {
    anchors = { start: [leftX, bot - 4], end: [rightX, top + 6] };
  }

  var html = "";
  /* 中性参考线 */
  html += '<line x1="' + leftX + '" y1="' + mid + '" x2="' + rightX + '" y2="' + mid +
    '" stroke="#D2DFD7" stroke-width="1" stroke-dasharray="3 4"/>';

  if (!answer) {
    /* 未知态：两端锚点已知 + 中段灰虚线 */
    html += '<path d="M' + leftX + ' ' + mid + ' C ' + (leftX + 90) + ' ' + mid + ', ' + (cx - 60) + ' ' + mid + ', ' + cx + ' ' + mid +
      ' C ' + (cx + 60) + ' ' + mid + ', ' + (rightX - 90) + ' ' + mid + ', ' + rightX + ' ' + mid +
      '" fill="none" stroke="#B9C9C0" stroke-width="2" stroke-dasharray="5 5"/>';
    html += '<circle cx="' + leftX + '" cy="' + mid + '" r="5.5" fill="#178A50" stroke="#fff" stroke-width="2"/>';
    html += '<circle cx="' + rightX + '" cy="' + mid + '" r="5.5" fill="#178A50" stroke="#fff" stroke-width="2"/>';
    html += '<text x="' + cx + '" y="' + (mid - 12) + '" text-anchor="middle" font-size="13" fill="#8CA097">中段走向 · 待判断</text>';
    html += '<text x="' + leftX + '" y="' + (H - 6) + '" text-anchor="start" font-size="12" fill="#178A50">首句</text>';
    html += '<text x="' + rightX + '" y="' + (H - 6) + '" text-anchor="end" font-size="12" fill="#178A50">尾句</text>';
    svg.innerHTML = html;
    return;
  }

  var d;
  if (answer === "转折变化") {
    var tp = anchors.turn;
    d = "M" + anchors.start[0] + " " + anchors.start[1] +
      " C " + (anchors.start[0] + 70) + " " + (anchors.start[1] + 20) + ", " +
      (tp[0] - 60) + " " + (tp[1] - 4) + ", " + tp[0] + " " + tp[1] +
      " C " + (tp[0] + 60) + " " + (tp[1] - 4) + ", " +
      (anchors.end[0] - 70) + " " + (anchors.end[1] + 20) + ", " +
      anchors.end[0] + " " + anchors.end[1];
  } else {
    var sp = anchors.start, ep = anchors.end;
    d = "M" + sp[0] + " " + sp[1] +
      " C " + (sp[0] + 110) + " " + (sp[1] + (ep[1] - sp[1]) * 0.15) + ", " +
      (ep[0] - 110) + " " + (ep[1] - (ep[1] - sp[1]) * 0.15) + ", " +
      ep[0] + " " + ep[1];
  }

  /* 面积填充 */
  var baseY = (answer === "转折变化") ? mid : (answer === "消极" ? top : bot);
  var area = d + " L " + anchors.end[0] + " " + baseY + " L " + anchors.start[0] + " " + baseY + " Z";
  html += '<path d="' + area + '" fill="#E3F5EC" opacity="0.65" stroke="none"/>';
  html += '<path id="toneCurvePath" d="' + d + '" fill="none" stroke="#0F9D6C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';

  /* 两端锚点（首尾句已给 → 绿） */
  html += '<circle cx="' + anchors.start[0] + '" cy="' + anchors.start[1] + '" r="6" fill="#178A50" stroke="#fff" stroke-width="2"/>';
  html += '<circle cx="' + anchors.end[0] + '" cy="' + anchors.end[1] + '" r="6" fill="#178A50" stroke="#fff" stroke-width="2"/>';

  /* 原文信号词标注 */
  (markers || []).forEach(function (mk) {
    var pos = mk.pos || "end";
    var pt = anchors[pos];
    if (!pt) return;
    var word = String(mk.word || "");
    var label = String(mk.label || "");
    var isTurn = pos === "turn";
    var col = isTurn ? "#C0392B" : "#178A50";
    html += '<circle cx="' + pt[0] + '" cy="' + pt[1] + '" r="5" fill="' + col + '" stroke="#fff" stroke-width="2"/>';
    /* 引线 + 标注框；文字对齐按位置防溢出：起点 start、终点 end、转折 middle */
    var anchor = pos === "start" ? "start" : (pos === "end" ? "end" : "middle");
    var tx = pos === "start" ? pt[0] + 4 : (pos === "end" ? pt[0] - 4 : pt[0]);
    var lblY = isTurn ? pt[1] + 22 : pt[1] - 18;
    var lblY2 = isTurn ? pt[1] + 12 : pt[1] - 8;
    html += '<line x1="' + pt[0] + '" y1="' + pt[1] + '" x2="' + tx + '" y2="' + lblY2 +
      '" stroke="' + col + '" stroke-width="1" stroke-dasharray="2 2"/>';
    html += '<text x="' + tx + '" y="' + lblY + '" text-anchor="' + anchor + '" font-size="12" fill="' + col +
      '" font-weight="600">' + escapeHtml(word) + '</text>';
    if (label) {
      html += '<text x="' + tx + '" y="' + (lblY + 14) + '" text-anchor="' + anchor +
        '" font-size="11" fill="#8CA097">' + escapeHtml(label) + '</text>';
    }
  });

  html += '<text x="' + leftX + '" y="' + (H - 6) + '" text-anchor="start" font-size="12" fill="#178A50">首句</text>';
  html += '<text x="' + rightX + '" y="' + (H - 6) + '" text-anchor="end" font-size="12" fill="#178A50">尾句</text>';
  svg.innerHTML = html;

  /* 从左到右逐段画开 */
  var path = svg.querySelector("#toneCurvePath");
  if (path && reveal && path.getTotalLength) {
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.transition = "stroke-dashoffset 1.15s ease-out";
    void path.getBoundingClientRect();
    path.style.strokeDashoffset = "0";
    window.setTimeout(function () {
      if (path) { path.style.strokeDasharray = "none"; path.style.strokeDashoffset = "0"; path.style.transition = "none"; }
    }, 1400);
  }
}

/** 收起 / 展开定调卡（收起后留一条小状态条） */
function setToneCollapsed(on) {
  var card = $("toneCard");
  if (!card || !toneState) return;
  toneState.collapsed = !!on;
  card.classList.toggle("collapsed", !!on);
  var cb = $("toneCollapseBtn");
  if (cb) { cb.textContent = on ? "展开" : "收起"; cb.setAttribute("aria-expanded", on ? "false" : "true"); }
  var mini = $("toneMini");
  if (!mini) return;
  if (on && toneState.passed) {
    var d = toneData();
    var isE = d && d.kind === "expository";
    mini.hidden = false;
    mini.innerHTML = '<span class="tone-mini-label">' + (isE ? "结构预判" : "首尾定调") + '</span><b>' +
      escapeHtml(d ? d.answer : "") + '</b><span class="tone-mini-ok">已判定</span><span class="tone-mini-more">展开复查</span>';
  } else {
    mini.hidden = true;
  }
}

/* 解析文章为 文本/空格 片段 */
function parsePassage(text) {
  var parts = []; var re = /__(\d+)__/g; var last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: "text", text: text.slice(last, m.index) });
    parts.push({ type: "blank", id: Number(m[1]) }); last = re.lastIndex;
  }
  if (last < text.length) parts.push({ type: "text", text: text.slice(last) });
  return parts;
}

/* 渲染文章（含线索高亮）
 * 注意：不论学生选了「固定搭配」还是「线索词」这条路，只要该题有线索，
 * 就一并高亮 —— 一道题常常两条路都走得通（双路径），把线索藏起来
 * 等于把可验证的证据拿走，只剩「背搭配」。（2026-09-23 调整）
 *
 * 高亮收敛（2026-09-23 追加）：同一条线索在全文往往出现多次（代词 He、
 * 动词 learn 等）。逐次高亮会把整篇涂花，学生反而看不出「哪一处才是证据」。
 * 因此每条线索只在**本题空格附近保留最近的一处**，其余出现不再重复高亮。 */
function renderPassage() {
  var box = $("passage"); box.innerHTML = "";
  if (currentId) box.dataset.lessonId = currentId;   // 供外部脚本/自动化读取当前篇目
  var activeQuestion = (selectedId != null && posPassed[selectedId]) ? findQuestion(selectedId) : null;

  /* 给每个 part 打上在原文里的全局坐标，并定位本题空格的全局位置 */
  var cursor = 0, blankPos = -1;
  passageParts.forEach(function (part) {
    part.gStart = cursor;
    if (part.type === "text") cursor += part.text.length;
    else { cursor += 4 + String(part.id).length; if (part.id === selectedId) blankPos = part.gStart; }
  });
  var plan = activeQuestion ? planClueMatches(activeQuestion, blankPos) : null;

  /* 逐句分组：每句包一个 span，点击即看这句的译文（句子切分与翻译共用同一套坐标） */
  var full = (lesson && lesson.article_text_with_blanks) || "";
  currentSentences = splitArticleSentences(full);
  if (!currentSentences.length) currentSentences = [{ start: 0, end: full.length, text: full }];
  var layout = planSentenceLayout(passageParts, currentSentences);
  currentSentences.forEach(function (s, si) {
    var sp = document.createElement("span");
    sp.className = "cloze-sentence"; sp.dataset.si = si;
    sp.title = "点击查看本句译文";
    layout[si].forEach(function (item) {
      if (item.type === "blank") {
        var q = findQuestion(item.id);
        var btn = document.createElement("button");
        btn.className = "blank-btn"; btn.dataset.id = String(item.id);
        var ans = answers[item.id];
        if (ans) { btn.textContent = ans; btn.classList.add("answered"); if (checked[item.id]) btn.classList.add(ans === q.answer ? "correct" : "wrong"); }
        else { btn.textContent = "(" + item.id + ")"; }
        btn.title = "第" + item.id + "题";
        btn.setAttribute("aria-label", "第 " + item.id + " 题，点击查看并作答");
        if (selectedId === item.id) btn.classList.add("active");
        btn.addEventListener("click", function () { selectQuestion(item.id); });
        sp.appendChild(btn);
      } else {
        renderTextWithClues(sp, { text: item.text, gStart: item.gStart }, activeQuestion, plan);
      }
    });
    box.appendChild(sp);
  });
  hideSentenceTip();
}

/* 区间到空格的距离：整段都在空格前/后时取间隔，跨过空格视为 0 */
function blankDistance(start, end, blankPos) {
  if (blankPos < 0) return start;                      // 定位不到空格时退化为「越靠前越优先」
  if (end <= blankPos) return blankPos - end;
  if (start >= blankPos) return start - blankPos;
  return 0;
}

/* 为一道题规划高亮区间：每条线索只留离空格最近的一处
 * 返回 [{start, end, dist, clueIndex, clue, relationType}]（全局坐标，已排序 + 去重叠） */
function planClueMatches(question, blankPos) {
  var full = (lesson && lesson.article_text_with_blanks) || "";
  var lowFull = full.toLowerCase();
  var picked = [];
  (question.clues || []).forEach(function (clue, clueIndex) {
    var targets = getClueSearchTargets(clue);
    if (!targets.length) return;
    var best = null;
    targets.forEach(function (target) {
      var lowTarget = String(target || "").toLowerCase();
      if (!lowTarget) return;
      var from = 0, at;
      while ((at = lowFull.indexOf(lowTarget, from)) !== -1) {
        var end = at + target.length;
        from = end;
        if (full.slice(at, end).indexOf("__") >= 0) continue;        // 跨空格的匹配不作数
        var dist = blankDistance(at, end, blankPos);
        if (!best || dist < best.dist || (dist === best.dist && (end - at) > (best.end - best.start))) {
          best = { start: at, end: end, dist: dist };
        }
      }
    });
    if (!best) return;
    /* 紧跟中文释义时（如 "mix water and flour (面粉)"）把释义一并纳入高亮，学生一眼看懂 */
    var gloss = /^\s*\([^)]{1,12}\)/.exec(full.slice(best.end, best.end + 16));
    if (gloss && /[\u4e00-\u9fa5]/.test(gloss[0])) best.end += gloss[0].length;
    best.clueIndex = clueIndex;
    best.clue = clue;
    best.relationType = (question.clueTypes && question.clueTypes[clue]) || null;
    picked.push(best);
  });
  picked.sort(function (a, b) { return a.start - b.start || b.end - a.end; });
  var clean = [], lastEnd = -1;
  picked.forEach(function (m) { if (m.start >= lastEnd) { clean.push(m); lastEnd = m.end; } });
  return clean;
}

function renderTextWithClues(container, part, question, plan) {
  var text = part.text;
  if (!question || !plan || !plan.length) { container.append(text); return; }
  var base = part.gStart || 0, limit = base + text.length;
  var marks = plan.filter(function (m) { return m.start >= base && m.end <= limit; });
  if (!marks.length) { container.append(text); return; }
  var cursor = 0;
  marks.forEach(function (m) {
    var s = m.start - base, e = m.end - base;
    if (s > cursor) container.append(text.slice(cursor, s));
    var type = m.relationType || getClueRelationType(question, m.clue);
    var mark = document.createElement("span");
    /* 高亮颜色按「线索类型」取（逻辑=蓝 / 复现=绿 / 情感=黄 / 固定搭配=红 /
     * 同位解释·熟词生义=紫 / 搭配骨架=青），题目之间不再靠序号轮色 */
    mark.className = "clue-mark clue-" + clueColorOf(type);
    mark.dataset.clueType = type;
    mark.dataset.clue = m.clue;
    mark.title = m.clue + " · " + type;
    mark.textContent = text.slice(s, e);
    container.appendChild(mark); cursor = e;
  });
  if (cursor < text.length) container.append(text.slice(cursor));
}

/* 线索类型 → 配色；clue-rules.js 未加载时退回按序号轮色 */
function clueColorOf(type) {
  if (window.clozeClueStyle) {
    var st = window.clozeClueStyle(type);
    if (st && st.color) return st.color;
  }
  return clueColors[0];
}

/* 类型短标签：一级类型（逻辑/复现/情感/固定搭配/熟词生义/同位解释/搭配骨架） */
function clueTypeTag(type) {
  var top = String(type || "").split("·")[0];
  if (window.CLOZE_CLUE_STYLE && window.CLOZE_CLUE_STYLE[top]) return window.CLOZE_CLUE_STYLE[top].zh;
  return top || "线索";
}

/* 线索搜索辅助 */
function getClueSearchTargets(clue) {
  var raw = String(clue || "").trim();
  if (!raw) return [];
  var cleaned = raw.replace(/["""]/g, "").replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  var stopWords = new Set(["a","an","the","of","to","for","with","and","or","but","who","i","you","he","she","it","we","they","me","him","her","us","them","my","your","his","its","our","their","this","that","these","those","am","is","are","was","were","be","been","being","do","does","did"]);
  var words = cleaned.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];
  if (words.length === 1 && stopWords.has(words[0].toLowerCase())) return [];
  var targets = [raw];
  var meaningful = words.filter(function (w) { return !stopWords.has(w.toLowerCase()); });
  for (var size = Math.min(4, meaningful.length); size >= 2; size -= 1) {
    for (var index = 0; index <= meaningful.length - size; index += 1) targets.push(meaningful.slice(index, index + size).join(" "));
  }
  if (meaningful.length <= 1) meaningful.forEach(function (w) { if (w.length >= 5) targets.push(w); });
  return Array.from(new Set(targets)).sort(function (a, b) { return b.length - a.length; });
}

function getQuestionHighlightItems(question) {
  return (question.clues || []).map(function (clue, clueIndex) {
    return { clue: clue, clueIndex: clueIndex, relationType: (question.clueTypes && question.clueTypes[clue]) || null, targets: getClueSearchTargets(clue) };
  }).filter(function (item) { return item.targets.length; });
}

/* 题型兜底：数据里没有 clueTypes 时，按讲义规则现算一遍
 * （clue-rules.js 提供逻辑词表 / 复现判据 / 情感词表 / 搭配词典） */
function getClueRelationType(question, clue) {
  if (window.CLOZE_CLUE_API) {
    var lg = window.clozeFindLogic(String(clue || "")).filter(function (h) {
      return window.CLOZE_LOGIC_WEAK.indexOf(h.word) < 0;
    });
    if (lg.length) return "逻辑线索·" + lg[0].cat;
    if (window.clozeFindEmotion(clue).length) return "情感线索·情感一致";
    var bank = window.clozeBankHit(clue);
    if (bank) return "固定搭配";
  }
  var t = (question.topic || "") + " " + (question.explanation || "");
  if (t.includes("上下文复现") || t.includes("同词根") || t.includes("同根")) return "复现线索·原词复现";
  if (t.includes("逻辑推理")) return "逻辑线索·因果";
  if (t.includes("常识")) return "语境线索·搭配骨架";
  if (t.includes("情感态度")) return "情感线索·情感一致";
  if (t.includes("主旨")) return "语境线索·搭配骨架";
  if (t.includes("固定搭配")) return "固定搭配";
  return "语境线索·搭配骨架";
}

function getClueSourceSentence(question, clue) {
  var targets = getClueSearchTargets(clue).map(function (t) { return t.toLowerCase(); });
  if (!targets.length) return "";
  var sents = [];
  (lesson.reading_sentences || []).forEach(function (s) { sents.push(s); });
  var passageText = (lesson.article_text_with_blanks || "").replace(/__\d+__/g, " ____ ");
  sents.push.apply(sents, passageText.split(/(?<=[.!?。！？])\s+/));
  var found = sents.find(function (s) { var low = (s || "").toLowerCase(); return targets.some(function (t) { return low.includes(t); }); });
  return found || "";
}

/* 箭头法（第 6/7/8 招）：算出一条线索相对本题空格的位置
 * —— 本句 / 上一句 / 下一句 / 前 n 句 / 后 n 句。
 * 纯 UI 现算，不写进数据层；算不出位置时返回 null，线索卡照常显示。 */
function globalBlankPos(qid) {
  var cursor = 0, blankPos = -1;
  passageParts.forEach(function (part) {
    if (part.type === "text") { cursor += part.text.length; return; }
    if (part.id === qid && blankPos < 0) blankPos = cursor;
    cursor += 4 + String(part.id).length;
  });
  return blankPos;
}

function sentenceIndexOf(sents, pos) {
  if (pos < 0 || !sents || !sents.length) return -1;
  for (var i = 0; i < sents.length; i += 1) {
    if (pos >= sents[i].start && pos < sents[i].end) return i;
  }
  for (var j = sents.length - 1; j >= 0; j -= 1) { if (sents[j].start <= pos) return j; }
  return -1;
}

function cluePositionOf(q, clue) {
  if (!lesson || !currentSentences || !currentSentences.length) return null;
  var blankPos = globalBlankPos(q.q);
  if (blankPos < 0) return null;
  var hit = null;
  planClueMatches(q, blankPos).forEach(function (m) { if (m.clue === clue) hit = m; });
  if (!hit) return null;
  var bi = sentenceIndexOf(currentSentences, blankPos);
  var ci = sentenceIndexOf(currentSentences, hit.start);
  if (bi < 0 || ci < 0) return null;
  var d = ci - bi, label;
  if (d === 0) label = "本句";
  else if (d === -1) label = "上一句";
  else if (d === 1) label = "下一句";
  else if (d < 0) label = "前 " + (-d) + " 句";
  else label = "后 " + d + " 句";
  return { dist: Math.abs(d), label: label, dir: d };
}

/* 「判断依据」：这题真正靠什么定答案 —— 离空格最近的**非骨架**线索
 * （与生成器 _explain_gen_all.js 同口径：骨架类型沉末位后取最近的）。
 * 纯 UI 现算，不落数据层；只给显示用，不影响任何判定。 */
function mainClueOf(q) {
  var items = getQuestionHighlightItems(q).map(function (it) {
    it.pos = cluePositionOf(q, it.clue);
    it.type = it.relationType || getClueRelationType(q, it.clue);
    return it;
  });
  if (!items.length) return null;
  var nonSkel = items.filter(function (it) { return !/骨架$/.test(String(it.type || "")); });
  var pool = nonSkel.length ? nonSkel : items;
  pool.sort(function (a, b) { return (a.pos ? a.pos.dist : 999) - (b.pos ? b.pos.dist : 999); });
  return pool[0];
}

/* 类型 → 标签文字：优先二级（因果 / 同场复现 / 情感一致），没有二级就用一级 */
function clueTypeLabel(type) {
  var parts = String(type || "").split("·");
  return parts[1] || parts[0] || "";
}

function evidenceLabel(q) {
  var m = mainClueOf(q);
  if (!m) return "";
  var lb = clueTypeLabel(m.type);
  if (lb === "固定搭配") lb = "其他 / 未归类";
  return "判断依据：" + lb;
}

/* 错题本专用：错题可能来自**别的篇目**，而主线索现算依赖当前打开的篇目状态，
 * 所以临时切到该篇目算完再切回来（按 篇目id#题号 缓存）。 */
var _eviCache = {};

/* 某条错题的判断依据「完整类型」（如 逻辑线索·因果）；取不到返回空串 */
function evidenceTypeInLesson(lessonObj, e) {
  if (!lessonObj) return "";
  var key = lessonObj.id + "#" + e.q;
  if (Object.prototype.hasOwnProperty.call(_eviCache, key)) return _eviCache[key];
  var q = (lessonObj.questions || []).find(function (x) { return x.q === e.q; });
  var type = "";
  if (q) {
    var keepLesson = lesson, keepParts = passageParts, keepSents = currentSentences;
    var full = lessonObj.article_text_with_blanks || "";
    lesson = lessonObj;
    passageParts = parsePassage(full);
    currentSentences = splitArticleSentences(full);
    if (!currentSentences.length) currentSentences = [{ start: 0, end: full.length, text: full }];
    var m = mainClueOf(q);
    type = m ? String(m.type || "") : "";
    lesson = keepLesson; passageParts = keepParts; currentSentences = keepSents;
  }
  _eviCache[key] = type;
  return type;
}

function evidenceLabelInLesson(lessonObj, e) {
  var t = evidenceTypeInLesson(lessonObj, e);
  if (!t) return "";
  var lb = clueTypeLabel(t);
  if (lb === "固定搭配") lb = "其他 / 未归类";
  return "判断依据：" + lb;
}

function errorEvidenceLabel(les, e) {
  if (les) {
    var lb = evidenceLabelInLesson(les, e);
    if (lb) return lb;
  }
  return "路线：" + (e.route || "—");
}

/* 错题本过滤器用的一级类型 */
function evidenceTopInLesson(lessonObj, e) {
  var t = evidenceTypeInLesson(lessonObj, e);
  return t ? String(t).split("·")[0] : "";
}

var EVIDENCE_TOP_TYPES = ["逻辑线索", "复现线索", "情感线索", "语境线索"];

/* 路线判断 */
function routeOf(q) { return q.route || (hasStoredCollocation(q) ? "固定搭配优先" : "线索词优先"); }
function hasStoredCollocation(q) { return !!(q.collocation && q.collocation.name); }
function isDual(q) { return routeOf(q) === "双路径"; }
function isCollocationFirst(q) { return routeOf(q) === "固定搭配优先"; }
function isPhrase(q) { return routeOf(q) === "整组短语直接辨析"; }
function isClueFirst(q) { return routeOf(q) === "线索词优先"; }
/* 选中某题 */
function selectQuestion(qid) {
  var q = findQuestion(qid);
  if (!q) return;
  selectedId = qid; currentQ = q;
  /* 上海版：取消「有无固定搭配」必答步（2026-10-01 定调）——选中题目即可看线索。
   * posPassed 仍是「本题已开做」的开关：正文高亮与后续步骤判断都要它先置位，
   * 所以必须在 renderPassage() 之前赋值，否则 activeQuestion 取不到、高亮会全丢。 */
  posPassed[qid] = true;
  reasoningRoutes[qid] = false;
  showStep("posStep", false);
  renderPassage();
  $("emptyState").classList.add("hidden");
  $("questionBox").classList.remove("hidden");
  var nextBtn = $("nextQuestionBtn"); if (nextBtn) nextBtn.hidden = true;
  var prevBtn = $("prevQuestionBtn"); if (prevBtn) prevBtn.hidden = true;
  $("questionNumber").textContent = "第 " + qid + " 题";
  /* 第三项由「路线」改为「判断依据」：路线是数据层的归类，判断依据才是学生要用的第一步 */
  $("questionCategory").textContent = [q.pos, q.topic, evidenceLabel(q)].filter(Boolean).join(" · ");
  updateQuestionProgress(qid);
  renderOptionPreview(q);
  renderToolStep(q);
  renderAnswerStep(q);
  renderSentenceCheck(q);
  renderExplain(q);
  updateQNav();                 // 跳题后同步导航格高亮
}

function updateQuestionProgress(qid) {
  var qs = (lesson.questions || []).slice().sort(function (a, b) { return a.q - b.q; });
  var idx = qs.findIndex(function (x) { return x.q === qid; });
  var doneCount = qs.filter(function (x) { return checked[x.q]; }).length;
  $("questionProgress").textContent = (idx + 1) + "/" + qs.length + " · 已答 " + doneCount;
}

function renderOptionPreview(q) {
  var box = $("optionPreview"); box.innerHTML = "";
  q.options.forEach(function (opt, i) {
    var pill = document.createElement("span");
    pill.className = "option-preview-pill";
    pill.textContent = String.fromCharCode(65 + i) + ". " + opt;
    box.appendChild(pill);
  });
}

/* 找线索导语（上海版口径）：线索优先，搭配只作复核 —— 2026-10-01 joi姐定调 */
/* 本题线索的位置构成：本句几条 / 跨句几条 / 最远几句。
 * 用于让「找线索」的提示因题而异 —— 线索全在本句时，不该再教人往外找。 */
function clueDistProfile(q) {
  var items = getQuestionHighlightItems(q);
  var dists = items.map(function (it) { return cluePositionOf(q, it.clue); })
                   .filter(function (p) { return !!p; })
                   .map(function (p) { return p.dist; });
  return {
    n: dists.length,
    inSent: dists.filter(function (d) { return d === 0; }).length,
    outSent: dists.filter(function (d) { return d > 0; }).length,
    maxOut: dists.reduce(function (a, d) { return Math.max(a, d); }, 0)
  };
}

/* 操作类提示只说一次：记在本机，不影响判题与数据 */
function guideSeen(k) {
  try { return !!(JSON.parse(localStorage.getItem("cloze_guide_seen") || "{}")[k]); } catch (e) { return false; }
}
function markGuideSeen(k) {
  try {
    var o = JSON.parse(localStorage.getItem("cloze_guide_seen") || "{}");
    o[k] = 1; localStorage.setItem("cloze_guide_seen", JSON.stringify(o));
  } catch (e) {}
}

function buildToolGuide(q) {
  var hasColloc = !!(q.collocation && q.collocation.name);
  var pr = clueDistProfile(q);
  var html = '';
  if (!pr.n) {
    html = '<p>按箭头法找：先看<b>本句</b>，没有再往<b>上下句</b>找。</p>';
  } else if (pr.inSent === 0) {
    /* 本句一条线索都没有：必须往外找，说清楚最远在哪 */
    html = '<p>本句没有线索 —— 按箭头法往<b>上下句</b>找，最远的一条在 <b>' + pr.maxOut + '</b> 句外。</p>';
  }
  /* 线索有跨句时不再另写引导段 —— 标题「本句 → 上下句」已经说完了。
   * 「点线索卡能跳到正文」属操作说明，本机只提示一次 */
  if (!guideSeen("jump")) {
    html += '<p class="guide-once">点线索卡可以跳到正文对应处'
      + '<button id="guideOnceClose" type="button">知道了</button></p>';
  }
  if (hasColloc) {
    /* 结构说明本身很长（有时带十几个例句），压进 tooltip，正文只留一行 */
    html += '<p class="structure" title="' + escapeHtml(String(q.collocation.structure || "")) + '">'
      + '搭配复核：<b>' + escapeHtml(q.collocation.name) + '</b> —— 选完答案后复核结构，不是第一步。</p>';
  }
  return html;
}

function renderToolStep(q) {
  var qid = q.q;
  if (!posPassed[qid]) { showStep("toolStep", false); return; }
  showStep("toolStep", true);
  /* 标题也跟着本题走：全在本句就只说本句，本句没有就直说往外找 */
  var pr2 = clueDistProfile(q), tt;
  if (!pr2.n) tt = "找线索：本句 → 上下句 → 上下段";
  else if (pr2.inSent === 0) tt = "找线索：本句没有 → 往外找";
  else if (pr2.outSent) tt = "找线索：本句 → 上下句";
  else tt = "找线索：本句";
  $("toolTitle").innerHTML = escapeHtml(tt)
    + '<span class="tool-help" title="箭头法：先看空格所在句，找不到再往上一句／下一句、上下段找；每条线索右上角标了它在第几句，点线索卡可跳到正文对应处。">?</span>';
  var goc = $("guideOnceClose");
  if (goc) {
    markGuideSeen("jump");   /* 提示过一次就够了 */
    goc.addEventListener("click", function () {
      var p = goc.parentNode; if (p && p.parentNode) p.parentNode.removeChild(p);
    });
  }
  $("toolGuide").innerHTML = buildToolGuide(q);
  var wrap = $("clueWords"); wrap.innerHTML = "";
  /* 箭头法：线索按「离空格的远近」排 —— 本句的先看，隔得远的后看。
   * 位置是打开题目时现算的（cluePositionOf），不落数据层。 */
  var items = getQuestionHighlightItems(q);
  items.forEach(function (item) { item.pos = cluePositionOf(q, item.clue); });
  items.sort(function (a, b) {
    return (a.pos ? a.pos.dist : 999) - (b.pos ? b.pos.dist : 999);
  });
  /* 全部线索都在本句时，标题已经写了「找线索：本句」，位置标签就不必每张卡都挂一遍 */
  var showPos = !(pr2.n > 0 && pr2.outSent === 0);
  items.forEach(function (item) {
    var rel = item.relationType || getClueRelationType(q, item.clue);
    var pill = document.createElement("button");
    pill.className = "clue-pill clue-" + clueColorOf(rel);
    pill.dataset.clueType = rel;
    var src = checked[qid] ? getClueSourceSentence(q, item.clue) : "";
    /* 左侧小签用一级类型（逻辑线索 / 复现线索 / 情感线索 / 固定搭配…），
     * 右侧说明是二级类型（因果 / 原词复现 / 情感变化…）；
     * 右上角「本句 / 上一句 / 下一句」是箭头法算出来的位置。 */
    pill.innerHTML = '<strong>' + escapeHtml(item.clue) + '</strong>'
      + (showPos && item.pos ? '<i class="clue-pos' + (item.pos.dist === 0 ? ' is-near' : '') + '">' + escapeHtml(item.pos.label) + '</i>' : '')
      + '<span><b class="clue-tag clue-' + clueColorOf(rel) + '">' + escapeHtml(clueTypeTag(rel)) + '</b> '
      + escapeHtml(String(rel).split("·").slice(1).join("·") || "") + '</span>'
      + (src ? '<small>原句：' + escapeHtml(src) + '</small>' : "");
    pill.title = item.clue + " · " + rel + (item.pos ? " · " + item.pos.label : "") + "（点击跳到正文对应处）";
    pill.addEventListener("click", function () { jumpToClue(item.clue); });
    wrap.appendChild(pill);
  });
}

function renderAnswerStep(q) {
  var qid = q.q;
  if (!posPassed[qid]) { showStep("answerStep", false); return; }
  showStep("answerStep", true);
  var wrap = $("answerOptions"); wrap.innerHTML = "";
  q.options.forEach(function (opt, i) {
    var b = document.createElement("button");
    b.className = "option"; b.dataset.val = opt;
    b.textContent = String.fromCharCode(65 + i) + ". " + opt;
    if (answers[qid] === opt) { b.classList.add("selected"); if (checked[qid]) b.classList.add(opt === q.answer ? "correct" : "wrong"); }
    b.addEventListener("click", function () { if (checked[qid]) return; chooseAnswer(q, opt, b); });
    wrap.appendChild(b);
  });
  var cb = $("checkAnswerBtn"); cb.hidden = !(answers[qid] && !checked[qid]);
}

function chooseAnswer(q, opt, btn) {
  var qid = q.q;
  if (checked[qid]) return;
  answers[qid] = opt;
  document.querySelectorAll("#answerOptions .option").forEach(function (el) { el.classList.remove("selected"); });
  btn.classList.add("selected");
  renderPassage(); renderSentenceCheck(q);
  updateQNav();                 // 选中后题号格转「已选未判」
  $("checkAnswerBtn").hidden = false;
}

function getSentenceAroundBlank(qid) {
  var text = lesson.article_text_with_blanks || ""; var marker = "__" + qid + "__";
  var sentences = text.split(/(?<=[.!?]["']?)\s+(?=[A-Z])/);
  var sent = sentences.find(function (s) { return s.includes(marker); });
  return sent ? sent.trim() : text;
}

function renderSentenceCheck(q) {
  var qid = q.q;
  if (!answers[qid]) { showStep("sentenceCheckStep", false); showStep("explainStep", false); return; }
  showStep("sentenceCheckStep", true);
  var sentence = getSentenceAroundBlank(qid);
  var filled = sentence.replace(/__(\d+)__/g, function (m, n) { return Number(n) === qid ? "【" + answers[qid] + "】" : "(" + n + ")"; });
  $("sentenceCheck").textContent = filled;
  if (!checked[qid]) showStep("explainStep", false); else renderExplain(q);
}

function checkAnswer(q) {
  var qid = q.q;
  if (checked[qid] || !answers[qid]) return;
  checked[qid] = true;
  var isCorrect = answers[qid] === q.answer;
  recordAnswer(q, isCorrect);
  if (!isCorrect && currentId) addError(currentId, qid, answers[qid], q.answer, routeOf(q));
  document.querySelectorAll("#answerOptions .option").forEach(function (el) {
    if (el.dataset.val === q.answer) el.classList.add("correct");
    else if (el.dataset.val === answers[qid]) el.classList.add("wrong");
    el.disabled = true;
  });
  $("checkAnswerBtn").hidden = true;
  renderPassage(); renderExplain(q);
  updateNavBadge();
  updateQNav();
  revealExplain();              // 判完把解析滚进视野
  if ((lesson.questions || []).every(function (x) { return checked[x.q]; })) {
    markDone(currentId);
    stopLessonTimer();          // 全部判完停表（变绿，显示总用时）
    toast("本篇已全部完成 ✓");
  }
  updateQuestionProgress(qid);
}

function renderExplain(q) {
  var qid = q.q;
  if (!checked[qid]) { showStep("explainStep", false); return; }
  showStep("explainStep", true);
  var prevBtn = $("prevQuestionBtn"); var nextBtn = $("nextQuestionBtn");
  var qs = (lesson.questions || []).slice().sort(function (a, b) { return a.q - b.q; });
  var idx = qs.findIndex(function (x) { return x.q === qid; });
  if (prevBtn) { prevBtn.hidden = idx === 0; prevBtn.onclick = function () { goToQuestion(qs[idx - 1].q); }; }
  if (nextBtn) {
    var isLast = idx === qs.length - 1;
    var allDone = qs.length > 0 && qs.every(function (x) { return checked[x.q]; });
    if (isLast || allDone) { nextBtn.hidden = false; nextBtn.textContent = "返回题库 ✓"; nextBtn.onclick = function () { backToLibrary(); }; }
    else { nextBtn.hidden = false; nextBtn.textContent = "下一题 →"; nextBtn.onclick = function () { goToQuestion(qs[idx + 1].q); }; }
  }
  var html;
  if (answers[qid] === q.answer) { html = '<div class="label">✓ 答对了</div>'; }
  else { html = '<div class="label">✗ 答错了</div><div>正确答案：<b>' + escapeHtml(q.answer) + '</b></div>'; }
  if (q.clues && q.clues.length) html += '<div><b>线索：</b><ul class="clue-list-inline">' + q.clues.map(function (c) { return "<li>" + escapeHtml(c) + "</li>"; }).join("") + "</ul></div>";
  if (q.explanation) html += '<div><b>解析：</b>' + renderExplainLines(q.explanation) + '</div>';
  if (q.collocation && q.collocation.name) html += '<div class="collocation">搭配：' + escapeHtml(q.collocation.name) + '（' + escapeHtml(q.collocation.type || "") + '）</div>';
  $("explainBox").innerHTML = html;
}

/* 解析分行渲染 —— 前后文线索式解析按「标签　正文」换行书写
 * 老格式（整段纯文本，无全角空格标签）自动降级成单段，向后兼容 */
function renderExplainLines(text) {
  var lines = String(text || "").split("\n").filter(function (s) { return s.trim(); });
  if (!lines.length) return "";
  return lines.map(function (ln) {
    var i = ln.indexOf("\u3000");                 // 全角空格：标签与正文的分隔
    if (i > 0 && i <= 4) {
      return '<div class="exp-line"><span class="exp-tag">' + escapeHtml(ln.slice(0, i)) +
        '</span><span class="exp-text">' + escapeHtml(ln.slice(i + 1)) + '</span></div>';
    }
    return '<div class="exp-line-plain">' + escapeHtml(ln) + '</div>';
  }).join("");
}

function goToQuestion(qid) {
  selectQuestion(qid);
  var panel = document.querySelector(".question-panel");
  if (panel) panel.scrollTop = 0;
}

/* ============================================================
 * 题号导航格 + 整篇计时（B 做题流程）
 * ------------------------------------------------------------
 * · 题号格 1..N：点击直接跳题；底色区分状态
 *   灰=未做  琥珀=已选未判  绿=答对  红=答错  描边=当前
 * · 整篇计时：打开篇目起表，全部判完停表（停表后变绿）
 * ============================================================ */
var lessonTimer = { start: 0, el: null, running: false, frozen: 0 };

function fmtClock(ms) {
  var s = Math.max(0, Math.floor(ms / 1000));
  var m = Math.floor(s / 60);
  var r = s % 60;
  return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
}

function startLessonTimer() {
  if (lessonTimer.el) { window.clearInterval(lessonTimer.el); lessonTimer.el = null; }
  lessonTimer.start = Date.now();
  lessonTimer.frozen = 0;
  lessonTimer.running = true;
  var wrap = $("qNavTimer"), clock = $("qNavClock");
  if (wrap) wrap.classList.remove("is-done");
  if (clock) clock.textContent = "00:00";
  lessonTimer.el = window.setInterval(function () {
    var c = $("qNavClock");
    if (c && lessonTimer.running) c.textContent = fmtClock(Date.now() - lessonTimer.start);
  }, 1000);
}

function stopLessonTimer(silent) {
  if (lessonTimer.el) { window.clearInterval(lessonTimer.el); lessonTimer.el = null; }
  if (lessonTimer.running) {
    lessonTimer.frozen = Date.now() - lessonTimer.start;
    lessonTimer.running = false;
  }
  var clock = $("qNavClock");
  if (clock) clock.textContent = fmtClock(lessonTimer.frozen);
  var wrap = $("qNavTimer");
  if (wrap && !silent) wrap.classList.add("is-done");
}

function renderQNav() {
  var nav = $("qNav"), grid = $("qNavGrid");
  if (!nav || !grid) return;
  var qs = ((lesson && lesson.questions) || []).slice().sort(function (a, b) { return a.q - b.q; });
  if (!qs.length) { nav.hidden = true; return; }
  nav.hidden = false;
  grid.innerHTML = "";
  qs.forEach(function (q) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "q-nav-item";
    b.dataset.q = String(q.q);
    b.textContent = String(q.q);
    b.title = "第 " + q.q + " 题";
    b.setAttribute("aria-label", "跳到第 " + q.q + " 题");
    b.addEventListener("click", function () { goToQuestion(q.q); });
    grid.appendChild(b);
  });
  updateQNav();
}

function updateQNav() {
  var grid = $("qNavGrid");
  if (!grid) return;
  Array.prototype.forEach.call(grid.querySelectorAll(".q-nav-item"), function (b) {
    var qid = Number(b.dataset.q);
    b.classList.toggle("is-current", selectedId === qid);
    var isChecked = !!checked[qid];
    var isOpen = !!answers[qid] && !isChecked;
    b.classList.toggle("is-open", isOpen);
    var q = findQuestion(qid);
    var isRight = isChecked && q && answers[qid] === q.answer;
    b.classList.toggle("is-correct", !!isRight);
    b.classList.toggle("is-wrong", !!(isChecked && !isRight));
  });
}

/** 点线索卡 → 滚到正文里对应的高亮处并闪烁定位
 *  线索卡与高亮块靠 data-clue（线索原文）配对，因此不需要额外编号。 */
function jumpToClue(clue) {
  var marks = document.querySelectorAll("#passage .clue-mark");
  var hit = null;
  Array.prototype.forEach.call(marks, function (mk) {
    if (!hit && mk.dataset.clue === clue) hit = mk;
  });
  if (!hit) { toast("这条线索不在当前正文高亮里"); return; }
  try { hit.scrollIntoView({ behavior: "smooth", block: "center" }); }
  catch (e) { hit.scrollIntoView(); }
  hit.classList.remove("clue-flash");
  void hit.offsetWidth;                        // 强制重排，让动画可以重放
  hit.classList.add("clue-flash");
  window.setTimeout(function () { hit.classList.remove("clue-flash"); }, 1500);
}

/** 判完题把解析滚进视野 —— 学生不用自己翻 */
function revealExplain() {
  window.setTimeout(function () {
    var exp = $("explainStep");
    if (!exp || exp.hidden) return;
    try { exp.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    catch (e) {
      var panel = document.querySelector(".question-panel");
      if (panel) panel.scrollTop = exp.offsetTop;
    }
  }, 160);
}

/* ==================== 错题本 ==================== */
function renderNotebook() {
  var list = $("notebookList");
  var empty = $("emptyNotebook");
  if (!list) return;
  var errors = getErrors();
  var filter = ($("notebookFilter") || {}).value || "all";
  /* 过滤按「判断依据」的一级类型（原来是按 route 字段） */
  var filtered = errors.filter(function (e) {
    if (filter === "all") return true;
    var les = library.find(function (l) { return l.id === e.lessonId; });
    if (!les) return filter === "其他";
    var top = evidenceTopInLesson(les, e);
    if (filter === "其他") return !top || EVIDENCE_TOP_TYPES.indexOf(top) < 0;
    return top === filter;
  });
  list.innerHTML = "";
  if (!filtered.length) { empty.hidden = false; return; }
  empty.hidden = true;
  filtered.slice().reverse().forEach(function (e) {
    var les = library.find(function (l) { return l.id === e.lessonId; });
    var lessonTitle;
    var canReview = !!les;
    if (les) {
      lessonTitle = les.title_cn || les.title || "未命名";
    } else if (e.lessonId && e.lessonId.indexOf("kp-") === 0 && window.KNOWLEDGE_POINTS) {
      var kpId = e.lessonId.replace("kp-", "");
      var kp = window.KNOWLEDGE_POINTS.find(function (k) { return k.id === kpId; });
      lessonTitle = kp ? "知识点·" + kp.title : "知识点练习";
      canReview = false;
    } else {
      lessonTitle = "已删除篇目";
    }
    var item = document.createElement("div");
    item.className = "notebook-item";
    item.innerHTML =
      '<div class="nb-title">' + escapeHtml(lessonTitle) + ' · 第 ' + e.q + ' 题</div>' +
      '<div class="nb-meta">' + escapeHtml(errorEvidenceLabel(les, e)) + '</div>' +
      '<div class="nb-detail">你选了 <code>' + escapeHtml(e.selected) + '</code>，正确答案是 <code>' + escapeHtml(e.correct) + '</code></div>' +
      '<div class="nb-actions"><button class="nb-review-btn" type="button">回看本题</button></div>';
    var btn = item.querySelector(".nb-review-btn");
    if (btn && les) {
      btn.addEventListener("click", function () {
        openLesson(e.lessonId);
        setTimeout(function () { selectQuestion(e.q); }, 100);
      });
    } else if (btn) { btn.disabled = true; btn.textContent = canReview ? "篇目已删除" : "在知识点中查看"; }
    list.appendChild(item);
  });
}

/* ==================== 进度面板 ==================== */
function renderProgress() {
  var dash = $("progressDashboard");
  if (!dash) return;
  var stats = getStats();
  var done = getDone();
  var doneCount = Object.keys(done).length;
  var totalQ = library.reduce(function (s, l) { return s + (l.questions || []).length; }, 0);
  var accuracy = stats.totalAnswered > 0 ? Math.round(stats.totalCorrect / stats.totalAnswered * 100) : 0;
  var routeNames = ["线索词优先", "固定搭配优先", "双路径", "整组短语直接辨析"];
  var routeColors = ["r1", "r2", "r3", "r4"];
  var routeBars = routeNames.map(function (name, i) {
    var rs = stats.routeStats[name] || { total: 0, correct: 0 };
    var pct = rs.total > 0 ? Math.round(rs.correct / rs.total * 100) : 0;
    return '<div class="bar-row">' +
      '<span class="bar-label">' + name + '</span>' +
      '<div class="bar-track"><div class="bar-fill ' + routeColors[i] + '" style="width:' + pct + '%"></div></div>' +
      '<span class="bar-value">' + rs.correct + '/' + rs.total + '</span>' +
      '</div>';
  }).join("");
  dash.innerHTML =
    '<div class="progress-stats">' +
      '<div class="progress-stat"><strong>' + library.length + '</strong><span>总篇目</span></div>' +
      '<div class="progress-stat"><strong>' + totalQ + '</strong><span>总题数</span></div>' +
      '<div class="progress-stat"><strong>' + doneCount + '</strong><span>已完成篇</span></div>' +
      '<div class="progress-stat"><strong>' + stats.totalAnswered + '</strong><span>累计答题</span></div>' +
      '<div class="progress-stat"><strong>' + stats.totalCorrect + '</strong><span>答对题数</span></div>' +
      '<div class="progress-stat"><strong>' + accuracy + '%</strong><span>正确率</span></div>' +
    '</div>' +
    '<div class="progress-chart"><h3>各路线正确率</h3><div class="bar-chart">' + routeBars + '</div></div>';
  updateNavBadge();
}

/* ==================== 初始化 ==================== */
function init() {
  blockWheelZoom();
  /* 内置题库（「自编」3 套示范篇不进列表，数据保留在题库文件里随时可恢复） */
  var BUILTIN = ((typeof window !== "undefined" && window.BUILTIN_LESSONS) || [])
    .filter(function (l) { return l.source_kind !== "自编"; });
  BUILTIN.forEach(normalizeLesson);
  library = BUILTIN;
  BLANK_KEYS = null;   // 题库定了才统计空数

  /* 筛选初始态：地址栏 hash > 本机上次的选择 > 全部 */
  applyFilterState(readHashFilters() || loadFilterPref());

  /* 导航 */
  document.querySelectorAll(".nav-tab").forEach(function (tab) {
    tab.addEventListener("click", function () { showView(tab.dataset.view); });
  });

  /* 筛选：cheat 型控件（来源 / 题型 / 空数）统一走 data-dim + data-value。
   * 这些 chip 每次 renderLibrary 都会重画，所以用事件委托挂在容器上。 */
  document.addEventListener("click", function (e) {
    var chip = e.target.closest ? e.target.closest(".filter-chip") : null;
    if (!chip || !chip.dataset.dim) return;
    var dim = chip.dataset.dim;
    if (FILTER_DIMS.indexOf(dim) < 0) return;
    filterState[dim] = chip.dataset.value;
    onFilterChanged();
  });

  /* 地区：可搜索下拉 */
  var rBtn = $("regionBtn");
  if (rBtn) rBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var pop = $("regionPop");
    if (pop && pop.hidden) openRegionCombo(); else closeRegionCombo();
  });
  var rSearch = $("regionSearch");
  if (rSearch) rSearch.addEventListener("input", function () { renderRegionCombo(rSearch.value); });
  var rList = $("regionList");
  if (rList) rList.addEventListener("click", function (e) {
    var opt = e.target.closest ? e.target.closest(".combo-opt") : null;
    if (!opt) return;
    filterState.region = opt.getAttribute("data-value") || "all";
    closeRegionCombo();
    onFilterChanged();
  });
  document.addEventListener("click", function (e) {
    var combo = $("regionCombo");
    if (!combo) return;
    if (!combo.contains(e.target)) closeRegionCombo();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeRegionCombo();
  });

  /* 年份 / 难度 */
  var yf = $("yearFilter");
  if (yf) yf.addEventListener("change", function () { filterState.year = yf.value; onFilterChanged(); });
  var df = $("difficultyFilter");
  if (df) df.addEventListener("change", function () { filterState.difficulty = df.value; onFilterChanged(); });

  /* 重置 / 分享 */
  var rfBtn = $("resetFilters");
  if (rfBtn) rfBtn.addEventListener("click", function () {
    applyFilterState(null);
    onFilterChanged();
    toast("已重置筛选");
  });
  var sfBtn = $("shareFilters");
  if (sfBtn) sfBtn.addEventListener("click", function () {
    writeHashFilters();
    copyText(location.href).then(function () {
      toast("筛选链接已复制，可直接发给学生");
    }, function () {
      toast("复制失败，请手动复制地址栏链接");
    });
  });

  /* 浏览器前进/后退或手改 hash → 同步筛选 */
  window.addEventListener("hashchange", function () {
    var fromHash = readHashFilters();
    if (!fromHash) return;
    applyFilterState(fromHash);
    renderLibrary();
  });

  /* 首尾定调卡：收起 / 展开 */
  var toneCb = $("toneCollapseBtn");
  if (toneCb) toneCb.addEventListener("click", function () {
    setToneCollapsed(!(toneState && toneState.collapsed));
  });
  var toneMini = $("toneMini");
  if (toneMini) toneMini.addEventListener("click", function () { setToneCollapsed(false); });

  /* 做题视图按钮 */
  var backBtn = $("backBtn"); if (backBtn) backBtn.addEventListener("click", backToLibrary);
  var checkBtn = $("checkAnswerBtn"); if (checkBtn) checkBtn.addEventListener("click", function () { if (currentQ) checkAnswer(currentQ); });

  /* 错题本 */
  var nf = $("notebookFilter"); if (nf) nf.addEventListener("change", renderNotebook);
  var cnb = $("clearNotebookBtn"); if (cnb) cnb.addEventListener("click", function () {
    clearErrors(); renderNotebook(); updateNavBadge(); toast("错题本已清空");
  });

  /* 知识点返回按钮 */
  var kpBack = $("kpBackBtn"); if (kpBack) kpBack.addEventListener("click", function () { window.backToKPList && window.backToKPList(); });

  /* 新增功能：打印 / 生词本 / 单词查询 */
  var printBtn = $("printBtn"); if (printBtn) printBtn.addEventListener("click", renderPrintView);
  var vocabBack = $("vocabBackBtn"); if (vocabBack) vocabBack.addEventListener("click", function () { showView("library"); });
  initWordLookup();
  updateNavBadgeVocab();

  /* 点击句子 → 显示该句译文 */
  var passageBox = $("passage");
  if (passageBox) {
    passageBox.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".blank-btn")) return;  // 点空格不触发翻译
      var s = e.target.closest && e.target.closest(".cloze-sentence");
      if (!s) { hideSentenceTip(); return; }
      showSentenceTip(Number(s.dataset.si), s);
    });
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest && (e.target.closest(".cloze-sentence") || e.target.closest("#sentenceTip"))) return;
    hideSentenceTip();
  });

  /* 首次渲染 */
  writeHashFilters();
  renderLibrary();
  updateNavBadge();
}

init();
