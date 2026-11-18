/* 新疆中考英语完形填空训练系统 · 知识点讲解 + 知识点练习
 * ------------------------------------------------------------------
 * 数据源：
 *   window.CLOZE_HANDOUT_HTML  —— 知识点讲解（五维一体矩阵，11 讲 / 27 课）
 *   window.CLOZE_QUIZ_300      —— 知识点练习（300 题真题靶向精练，按 27 课分组）
 * 设计约定：
 *   1. 不改动全国版数据文件，只读取本目录下的 cloze-handout-content.js / cloze-quiz-300.js。
 *   2. 与完形真题训练互不影响：本模块只挂在自己的面板里，不接管 #training 等原有节点。
 *   3. 练习提交后才显示答案、核心线索与解析，和全国版“先答后揭”的规则一致。
 * ------------------------------------------------------------------ */
(function () {
  "use strict";

  /* ================= 章节配置（与全国版 HANDOUT_CHAPTERS 对齐） ================= */
  var CHAPTERS = [
    { id: "ch0", no: "开篇", t: "开篇 · 完形到底考什么", color: "#3730A3",
      desc: "先建立五维全局观：完形不是考孤立词汇，而是考语篇证据链。",
      tags: ["全词性", "打地基", "先读"] },
    { id: "ch1", no: "第1讲", t: "维度一 · 词汇复现", color: "#2563EB",
      desc: "原文自己会重复答案：原词 / 派生词 / 同义 / 上下义 / 语义场复现五大机制。",
      tags: ["5 课", "主考 名词/动词", "必考"] },
    { id: "ch2", no: "第2讲", t: "维度二 · 情感态度", color: "#C026D3",
      desc: "给全文画一条情感曲线：褒贬一致、情感突变律，遇转折强制反号。",
      tags: ["4 课", "主考 形容词/副词", "必考"] },
    { id: "ch3", no: "第3讲", t: "维度三 · 语境还原", color: "#7C3AED",
      desc: "当前句读不懂？后置解释、常识兜底、同位解释——答案永远在空格后面。",
      tags: ["5 课", "主考 名词/搭配", "高频"] },
    { id: "ch4", no: "第4讲", t: "维度四 · 篇章结构", color: "#0891B2",
      desc: "先修逻辑骨架再填血肉：并列 / 转折 / 因果 / 让步 / 条件 / 从句引导。",
      tags: ["6 课", "主考 连词/副词", "必考"] },
    { id: "ch5", no: "第5讲", t: "维度五 · 动作链条与语法基石", color: "#4F46E5",
      desc: "物理时序推进 + 动宾搭配合理 + 句法严谨，附 17 组高频混淆动词辨析。",
      tags: ["7 课", "主考 动词", "压轴"] },
    { id: "ch6", no: "第6讲", t: "四步极速破局 SOP", color: "#6366F1",
      desc: "一读观大势 → 二推查复现 → 三定审骨架 → 四扣动作链，考场 20 分钟稳定执行。",
      tags: ["4 步", "考场执行"] },
    { id: "ch7", no: "第7讲", t: "词性 × 维度 决策表", color: "#6366F1",
      desc: "看到词性 0.5 秒激活对应维度：名 / 形 / 副 / 连 / 动五类速查。",
      tags: ["速查", "工具页"] },
    { id: "ch8", no: "第8讲", t: "干扰项三大杀伤机制", color: "#6366F1",
      desc: "错项不是随机拼的：呼应否 / 异场否 / 方向否，反向排除。",
      tags: ["3 机制", "实证统计"] },
    { id: "ch9", no: "第9讲", t: "六大陷阱与破解铁律", color: "#6366F1",
      desc: "单句直译 / 主客体错认 / 漏转折 / 主观臆测……六大致命坑逐条配破解铁律。",
      tags: ["6 陷阱", "防翻车"] },
    { id: "appendix", no: "附录", t: "考前 60 秒通关口诀", color: "#6366F1",
      desc: "十句口诀浓缩五维一体矩阵，进考场前默念一遍。",
      tags: ["速记", "考前 60 秒"] }
  ];

  var GROUPS = [
    { t: "开篇 · 定调", ids: ["ch0"] },
    { t: "五大解题维度", ids: ["ch1", "ch2", "ch3", "ch4", "ch5"] },
    { t: "实战工具 · 考场执行", ids: ["ch6", "ch7", "ch8", "ch9"] },
    { t: "附录 · 考前速记", ids: ["appendix"] }
  ];

  /* 每课一句话抓手（首页课卡第二行） */
  var TECH_INTRO = {
    "ch1#0": "答案词会在原文里原样再出现一次，往前扫两句、往后扫两句就能抓到硬证据。",
    "ch1#1": "词根相同、词性不同：climb → climber / climbed，靠词缀变形呼应空格。",
    "ch1#2": "换词不换义：travel → trips、gift → present，盯住近义替换就能锁定。",
    "ch1#3": "大类词与实例词互相印证：animal（上位）↔ dog / cat（下位）。",
    "ch1#4": "同一场景的伙伴词成群出现：hospital 必然伴随 doctor、nurse、patient。",
    "ch2#0": "语境情感同向稳定：积极段必配褒义词，挫败段必配贬义词。",
    "ch2#1": "but / however / unexpectedly 一出现，情感立刻调头，答案随之翻转。",
    "ch2#2": "感叹号表激动、破折号表补充、引号常表反讽——标点就是情感体温计。",
    "ch2#3": "同向还有深浅：calm → glad → excited → thrilled，按程度挑最贴切的那个。",
    "ch3#0": "本句里的定语、状语、介词短语，已经把答案的取值范围限定死了。",
    "ch3#1": "本句没有依据就往后读 1~2 句，后文常给例证、原因或结果（画箭头法）。",
    "ch3#2": "悬念文的真正原因常在结尾才揭晓，必须跨段回溯反推前面的空格。",
    "ch3#3": "语言线索模糊时，用物理法则与社会常识做最后一道兜底防线。",
    "ch3#4": "破折号后、逗号短语、that is 之后的等价解释，就是空格的直译答案。",
    "ch4#0": "and / both…and / not only…but also：前后同向平等、结构对称。",
    "ch4#1": "but / however / instead of 一出现就调头，前后语义彻底反转。",
    "ch4#2": "because / so / therefore：前有因后有果，按驱动链选词。",
    "ch4#3": "although / even though：先退一步承认事实，再突出核心结论。",
    "ch4#4": "if / unless / as long as：满足什么前提，就触发什么结果。",
    "ch4#5": "宾从、定从、状从的引导词，既是逻辑桥梁，也是从句里的成分。",
    "ch5#0": "准备 → 启动 → 进行 → 阻碍 → 结果，动作按物理时序一环扣一环。",
    "ch5#1": "动词要带得动宾语，主语要发得出动作，主客体双方都得说得通。",
    "ch5#2": "up / down / off / out 等小品词决定动作方向，换一个意思全变。",
    "ch5#3": "哪些动词后接 to do、哪些只接 doing，是死记也得记的接续铁律。",
    "ch5#4": "记叙文用过去时、说明文用现在时，承受者作主语就用被动语态。",
    "ch5#5": "人称 / 物主 / 反身代词要格位正确、性数一致，是必拿的送分题。",
    "ch5#6": "17 组高频近义动词（词组）辨析大合集，考前过一遍专治形近义近。"
  };

  /* ================= 运行时状态 ================= */
  var state = {
    mode: "handout",     // handout（知识点讲解）| quiz（知识点同步练）
    view: "home",        // home | lesson | drill
    chapterId: null,     // 当前讲解章节
    techIdx: -1,         // 当前讲解的「课」序号，-1 表示整讲
    quiz: null,          // { ch, idx, answers:{}, submitted, warned }
    done: {},            // 已完成的课（用于课卡打勾）
    lastLessonScroll: 0
  };

  function storageKey(k) { return "clozeCoach.knowledge." + k; }

  function readDone() {
    try {
      var raw = JSON.parse(localStorage.getItem(storageKey("done")) || "{}");
      return raw && typeof raw === "object" ? raw : {};
    } catch (e) { return {}; }
  }
  function saveDone() {
    try { localStorage.setItem(storageKey("done"), JSON.stringify(state.done)); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function $(id) { return document.getElementById(id); }
  function handoutData() { return window.CLOZE_HANDOUT_HTML || null; }
  function quizData() { return window.CLOZE_QUIZ_300 || null; }
  function chapterById(id) {
    for (var i = 0; i < CHAPTERS.length; i++) if (CHAPTERS[i].id === id) return CHAPTERS[i];
    return null;
  }
  function chapterHtml(id) {
    var H = handoutData();
    return H && H[id] ? H[id] : "";
  }
  function quizOf(chId, techIdx) {
    var Q = quizData();
    return Q ? (Q[chId + "#" + techIdx] || null) : null;
  }

  /** 从讲义 HTML 里解析某一讲的「课」列表（标题形如「第一课　原词复现」） */
  function chapterTechs(chId) {
    var html = chapterHtml(chId);
    var out = [];
    var re = /<h[34][^>]*class="tech-t"[^>]*>([\s\S]*?)<\/h[34]>/g;
    var m;
    while ((m = re.exec(html))) {
      var raw = m[1].replace(/<[^>]+>/g, "").trim();
      var mm = raw.match(/^(第[^课]{1,4}课|宝典)\s*([\s\S]*)$/);
      var no = "", name = raw;
      if (mm) { no = mm[1]; name = mm[2].trim(); }
      out.push({ no: no, name: name, intro: TECH_INTRO[chId + "#" + out.length] || "" });
    }
    return out;
  }

  function totalQuizCount() {
    var Q = quizData();
    if (!Q) return 0;
    var n = 0;
    Object.keys(Q).forEach(function (k) { n += (Q[k].qs || []).length; });
    return n;
  }

  /* ================= 视图骨架 ================= */
  var els = {};

  function cacheEls() {
    els.panel = $("homeKnowledgePanel");
    els.title = $("kpTitle");
    els.eyebrow = $("kpEyebrow");
    els.body = $("kpBody");
    els.crumb = $("kpCrumb");
    els.print = $("kpPrintBtn");
  }

  /** 离开本模块：由 app.js 提供的 showHomeEntry 负责回到「完形填空首页」三卡 */
  function backToClozeHome() {
    if (typeof window.showClozeHome === "function") window.showClozeHome();
    else if (els.panel) els.panel.classList.add("hidden");
  }

  /** 当前入口模式：handout = 知识点讲解，quiz = 知识点同步练 */
  function isQuizMode() { return state.mode === "quiz"; }
  function modeTitle() { return isQuizMode() ? "知识点同步练" : "知识点讲解"; }

  /* ================= 渲染：知识点总览 ================= */
  function renderHome() {
    state.view = "home";
    if (els.eyebrow) els.eyebrow.textContent = modeTitle();
    els.title.textContent = modeTitle();
    els.crumb.textContent = isQuizMode()
      ? "按 27 课同步的靶向精练：全部作答后提交，提交后才亮出答案、核心线索与解析。"
      : "五维一体方法矩阵：每课讲清“这是什么、命题人为什么这么设、怎么判断、怎么防坑”。";
    /* 打印合集只属于讲解入口 */
    els.print.classList.toggle("hidden", isQuizMode());

    var totalQ = totalQuizCount();
    var doneCount = Object.keys(state.done).filter(function (k) { return state.done[k]; }).length;
    var totalTechs = 0;
    CHAPTERS.forEach(function (c) { totalTechs += chapterTechs(c.id).length || 1; });

    var html = '';
    html += '<div class="kp-hero' + (isQuizMode() ? ' kp-hero-quiz' : '') + '">'
      + '<div class="kp-hero-main">'
      + '<span class="kp-hero-kicker">' + (isQuizMode() ? '先答后揭 · 真题靶向精练' : '五维一体 · 知识点矩阵') + '</span>'
      + '<h2>' + (isQuizMode() ? '按课刷题，一课一组，练完立刻对证据' : '完形的每一分，都能拆成可练的技法') + '</h2>'
      + '<p>' + (isQuizMode()
          ? '共 ' + totalQ + ' 道真题，按 27 课分组。每组全部作答后点「提交」，才会出现答案、核心线索与解析；题干里的原文证据会同时标黄。'
          : '11 讲 / ' + totalTechs + ' 课方法讲解，配 ' + totalQ + ' 道真题靶向精练。每课讲清「这是什么 → 怎么判断 → 防坑」，练完即测，提交后才亮出答案与原文证据。')
      + '</p>'
      + '</div>'
      + '<div class="kp-hero-stats">'
      + '<div class="kp-stat"><strong>' + CHAPTERS.length + '</strong><span>讲</span></div>'
      + '<div class="kp-stat"><strong>' + totalTechs + '</strong><span>课技法</span></div>'
      + '<div class="kp-stat"><strong>' + totalQ + '</strong><span>道精练</span></div>'
      + '<div class="kp-stat"><strong>' + doneCount + '</strong><span>已学课</span></div>'
      + '</div></div>';

    GROUPS.forEach(function (g) {
      var items = g.ids.map(function (id) { return chapterById(id); }).filter(Boolean);
      if (!items.length) return;
      html += '<section class="kp-group">';
      html += '<div class="kp-group-head"><span class="kp-group-dot"></span><h3>' + esc(g.t) + '</h3></div>';
      html += '<div class="kp-group-body">';
      items.forEach(function (c) {
        var techs = chapterTechs(c.id);
        var qn = 0;
        techs.forEach(function (t, i) {
          var g2 = quizOf(c.id, i);
          if (g2) qn += g2.qs.length;
        });
        html += '<article class="kp-chapter-card" style="--c:' + c.color + '" data-kp-chapter="' + c.id + '">';
        html += '<div class="kp-chapter-top"><span class="kp-chapter-no">' + esc(c.no) + '</span>'
          + (techs.length ? '<span class="kp-chapter-meta">' + techs.length + ' 课 · ' + qn + ' 题</span>' : '<span class="kp-chapter-meta">整讲</span>')
          + '</div>';
        html += '<h4>' + esc(c.t) + '</h4>';
        html += '<p>' + esc(c.desc) + '</p>';
        html += '<div class="kp-chapter-tags">' + (c.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join("") + '</div>';
        if (techs.length) {
          html += '<div class="kp-tech-grid">';
          techs.forEach(function (t, i) {
            var key = c.id + "#" + i;
            var done = !!state.done[key];
            var g2 = quizOf(c.id, i);
            var qCount = g2 ? g2.qs.length : 0;
            if (isQuizMode()) {
              /* 同步练入口：整张卡直接开练 */
              html += '<button class="kp-tech-card kp-tech-card-quiz' + (qCount ? '' : ' disabled') + '" type="button"'
                + (qCount ? ' data-kp-drill="' + c.id + '" data-kp-tech="' + i + '"' : ' disabled')
                + ' title="' + (qCount ? '开始本课精练' : '本课暂无配套题') + '">'
                + '<span class="kp-tech-h"><b>' + esc(t.no || "•") + '</b><i>' + esc(t.name) + '</i></span>'
                + '<span class="kp-tech-d">' + esc(t.intro || "") + '</span>'
                + '<span class="kp-tech-meta">'
                + '<em>' + (qCount ? qCount + ' 题 · 开始练习 →' : '暂无配套题') + '</em>'
                + '</span></button>';
            } else {
              html += '<button class="kp-tech-card' + (done ? ' done' : '') + '" type="button"'
                + ' data-kp-lesson="' + c.id + '" data-kp-tech="' + i + '">'
                + '<span class="kp-tech-h"><b>' + esc(t.no || "•") + '</b><i>' + esc(t.name) + '</i></span>'
                + '<span class="kp-tech-d">' + esc(t.intro || "点击进入本课讲解") + '</span>'
                + '<span class="kp-tech-meta">'
                + '<em>' + (qCount ? qCount + ' 题精练' : '无配套题') + '</em>'
                + (done ? '<strong class="kp-tech-done">✓ 已学</strong>' : '')
                + '</span></button>';
            }
          });
          html += '</div>';
        } else {
          html += isQuizMode()
            ? '<p class="kp-no-drill">本讲为整讲内容，没有独立精练题，可回到「知识点讲解」阅读正文。</p>'
            : '<button class="kp-chapter-enter" type="button" data-kp-lesson="' + c.id + '" data-kp-tech="-1">阅读本讲正文 →</button>';
        }
        html += '</article>';
      });
      html += '</div></section>';
    });

    els.body.innerHTML = html;
    bindHome();
  }

  function bindHome() {
    els.body.querySelectorAll("[data-kp-lesson]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openLesson(btn.dataset.kpLesson, Number(btn.dataset.kpTech));
      });
    });
    els.body.querySelectorAll("[data-kp-drill]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openDrill(btn.dataset.kpDrill, Number(btn.dataset.kpTech));
      });
    });
  }

  /* ================= 渲染：单课讲解 ================= */
  function openLesson(chId, techIdx) {
    var ch = chapterById(chId);
    if (!ch) return;
    state.view = "lesson";
    state.chapterId = chId;
    state.techIdx = techIdx;
    els.print.classList.toggle("hidden", isQuizMode());
    renderLesson();
  }

  function renderLesson() {
    var ch = chapterById(state.chapterId);
    if (!ch) { renderHome(); return; }
    var techs = chapterTechs(ch.id);
    var one = state.techIdx >= 0 && state.techIdx < techs.length;
    var t = one ? techs[state.techIdx] : null;

    if (els.eyebrow) els.eyebrow.textContent = isQuizMode() ? "知识点同步练" : "知识点讲解";
    els.title.textContent = ch.no + " " + ch.t + (one ? " · " + t.no + " " + t.name : "");
    els.crumb.textContent = one
      ? "第 " + (state.techIdx + 1) + " / " + techs.length + " 课 · " + t.name
      : ch.desc;

    /* 取出本讲正文，只显示被点中的那一课 */
    var wrap = document.createElement("div");
    wrap.className = "kp-handout-content";
    wrap.innerHTML = chapterHtml(ch.id);
    if (one) {
      wrap.classList.add("lesson-only");
      var kids = wrap.children, ti = 0, chosen = null;
      for (var k = 0; k < kids.length; k++) {
        var el = kids[k];
        if (!el.classList || !el.classList.contains("tech")) continue;
        if (ti === state.techIdx) chosen = el; else el.classList.add("kp-hide-tech");
        ti++;
      }
      /* 单课模式：本讲的大标题 / 导语 / hero 全部收起，只留这一课 */
      ["h2", "h3"].forEach(function (tag) {
        Array.prototype.forEach.call(wrap.querySelectorAll(":scope > " + tag), function (n) {
          if (!n.classList.contains("tech-t")) n.classList.add("kp-hide-tech");
        });
      });
      Array.prototype.forEach.call(wrap.children, function (n) {
        if (n.classList && (n.classList.contains("ch-hero") || n.classList.contains("ho-lead") || n.classList.contains("ho-kicker"))) {
          n.classList.add("kp-hide-tech");
        }
      });
      if (chosen) {
        var lead = document.createElement("div");
        lead.className = "kp-lesson-lead";
        lead.style.setProperty("--c", ch.color);
        lead.innerHTML = '<span>' + esc(ch.no) + ' · 第 ' + (state.techIdx + 1) + ' 课</span>'
          + '<b>' + esc(t.name) + '</b>'
          + '<em>' + esc(t.intro || "") + '</em>';
        wrap.insertBefore(lead, wrap.firstChild);
      }
    }

    var nav = '<div class="kp-lesson-nav">'
      + (one && state.techIdx > 0 ? '<button class="ghost-button" type="button" data-kp-nav="prev">← 上一课</button>' : '')
      + (one && state.techIdx < techs.length - 1 ? '<button class="ghost-button" type="button" data-kp-nav="next">下一课 →</button>' : '')
      + '</div>';
    if (!nav.includes('data-kp-nav')) nav = '';

    var drill = one ? quizOf(ch.id, state.techIdx) : null;
    var foot = one
      ? '<div class="kp-lesson-foot">'
        + '<div class="kp-lesson-foot-info"><b>本课学完了？</b><span>'
        + (drill ? '本课配 ' + drill.qs.length + ' 道真题精练：全部作答后提交，提交后才会出现答案、核心线索与解析。'
                 : '本课暂无配套精练题，可回目录选择其他课。')
        + '</span></div>'
        + '<div class="kp-lesson-foot-actions">'
        + (drill ? '<button class="primary-button" type="button" data-kp-nav="drill">▶ 本课精练（' + drill.qs.length + ' 题）</button>' : '')
        + (one && state.techIdx < techs.length - 1 ? '<button class="ghost-button" type="button" data-kp-nav="next">学下一课 →</button>' : '')
        + '</div></div>'
      : '';

    els.body.innerHTML = nav + '<div class="kp-lesson-wrap"></div>' + foot;
    els.body.querySelector(".kp-lesson-wrap").appendChild(wrap);
    bindLesson();

    if (one) {
      var key = ch.id + "#" + state.techIdx;
      if (!state.done[key]) { state.done[key] = true; saveDone(); }
    }
    scrollToPanelTop();
  }

  function bindLesson() {
    els.body.querySelectorAll("[data-kp-nav]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var act = btn.dataset.kpNav;
        if (act === "drill") { openDrill(state.chapterId, state.techIdx); return; }
        if (act === "prev") { openLesson(state.chapterId, state.techIdx - 1); return; }
        if (act === "next") {
          var techs = chapterTechs(state.chapterId);
          if (state.techIdx < techs.length - 1) openLesson(state.chapterId, state.techIdx + 1);
          return;
        }
      });
    });
  }

  /* ================= 渲染：知识点练习 ================= */
  function openDrill(chId, techIdx) {
    var g = quizOf(chId, techIdx);
    if (!g) return;
    var ch = chapterById(chId);
    state.view = "drill";
    state.chapterId = chId;
    state.techIdx = techIdx;
    state.quiz = { ch: chId, idx: techIdx, answers: {}, submitted: false, warned: false };
    els.print.classList.add("hidden");
    if (els.eyebrow) els.eyebrow.textContent = "知识点同步练";
    var techs = chapterTechs(chId);
    els.title.textContent = ch.no + " " + ch.t + " · " + (techs[techIdx] ? techs[techIdx].no + " " + techs[techIdx].name : "") + " · 同步练";
    els.crumb.textContent = "共 " + g.qs.length + " 题 · 全部作答后提交，提交后解锁答案与解析";
    renderDrill();
    scrollToPanelTop();
  }

  function stemHtml(s, submitted, hl) {
    var html = esc(s).replace(/_{3,}(\d+)_{3,}/g, '<span class="kp-blank">____$1____</span>');
    if (!submitted || !hl || !hl.length) return html;
    hl.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (frag) {
      if (!frag) return;
      var target = esc(frag);
      var at = html.indexOf(target);
      if (at < 0) return;
      html = html.slice(0, at) + '<span class="kp-ev">' + html.slice(at, at + target.length) + '</span>' + html.slice(at + target.length);
    });
    return html;
  }

  function renderDrill() {
    var q = state.quiz;
    if (!q) return;
    var g = quizOf(q.ch, q.idx);
    if (!g) return;
    var ch = chapterById(q.ch);
    var techs = chapterTechs(q.ch);
    var t = techs[q.idx] || { no: "", name: "" };
    var qs = g.qs;
    var done = qs.filter(function (x) { return q.answers[x.no]; }).length;

    var html = '';
    html += '<div class="kp-drill-head" style="--c:' + ch.color + '">'
      + '<div class="kp-drill-title"><span>' + esc(ch.t) + '</span><b>' + esc((t.no || "") + "　" + t.name) + '</b></div>'
      + '<div class="kp-drill-meta"><span>共 <b>' + qs.length + '</b> 题</span><span>已答 <b>' + done + '</b>/' + qs.length + '</span>'
      + '<span class="kp-drill-state">' + (q.submitted ? '解析已解锁' : '全部作答后点「提交」，才会出现答案与解析') + '</span></div>'
      + '<div class="kp-drill-bar"><span id="kpProgressBar" style="width:' + Math.round(done * 100 / qs.length) + '%"></span></div>'
      + '</div>';

    if (q.submitted) {
      var right = qs.filter(function (x) { return q.answers[x.no] === x.answer; }).length;
      var pct = Math.round(right * 100 / qs.length);
      html += '<div class="kp-score">'
        + '<div class="kp-score-main"><b>' + right + ' / ' + qs.length + '</b><span>正确率 ' + pct + '%</span></div>'
        + '<p class="kp-score-msg ' + (pct >= 90 ? 'good' : pct >= 70 ? 'mid' : 'bad') + '">'
        + (pct >= 90 ? '掌握牢固，可以进下一课了。' : pct >= 70 ? '基本掌握，建议把错题的线索回原文再走一遍。' : '建议回看本课讲解，再做一次。')
        + '</p></div>';
    }

    html += '<div class="kp-drill-list">';
    qs.forEach(function (item) {
      var sel = q.answers[item.no] || "";
      var ok = sel === item.answer;
      html += '<article class="kp-drill-q" id="kp-q-' + item.no + '">';
      html += '<div class="kp-drill-qh"><span class="kp-drill-no">训练 ' + item.no + '</span>'
        + '<span class="kp-drill-src">' + esc(item.src) + '</span></div>';
      html += '<p class="kp-drill-stem">' + stemHtml(item.stem, q.submitted, item.hl) + '</p>';
      html += '<div class="kp-drill-opts">';
      item.options.forEach(function (op) {
        var cls = "kp-drill-opt";
        if (q.submitted) {
          if (op.k === item.answer) cls += " right";
          else if (op.k === sel) cls += " wrong";
        } else if (op.k === sel) cls += " sel";
        html += '<button type="button" class="' + cls + '" data-kp-opt="' + esc(op.k) + '" data-kp-qno="' + item.no + '"'
          + (q.submitted ? " disabled" : "") + '><i>' + esc(op.k) + '</i><span>' + esc(op.v) + '</span></button>';
      });
      html += '</div>';
      if (q.submitted) {
        html += '<div class="kp-drill-ana ' + (ok ? "ok" : "bad") + '">'
          + '<div class="kp-drill-verdict">' + (ok ? '✅ 答对了'
              : '❌ 答错了：你选 ' + esc(sel || "（未作答）") + '，正确答案 ' + esc(item.answer) + '. '
                + esc((item.options.filter(function (x) { return x.k === item.answer; })[0] || {}).v || "")) + '</div>'
          + '<div class="kp-drill-line"><b>核心线索</b><span>' + esc(item.clue) + '</span></div>'
          + '<div class="kp-drill-line"><b>矩阵解析</b><span>' + esc(item.analysis) + '</span></div>'
          + '</div>';
      }
      html += '</article>';
    });
    html += '</div>';

    var warn = (q.warned && !q.submitted)
      ? '<span class="kp-drill-warn">还有 ' + (qs.length - done) + ' 题未作答，未作答按错题计。再点一次「提交」即确认。</span>' : '';
    html += '<div class="kp-drill-actions">' + warn + (q.submitted
      ? '<button class="ghost-button" type="button" data-kp-act="again">↻ 再做一次</button>'
        + (isQuizMode()
            ? '<button class="ghost-button" type="button" data-kp-act="lesson">← 回同步练目录</button>'
            : '<button class="ghost-button" type="button" data-kp-act="lesson">← 回本课讲解</button>')
        + '<button class="primary-button" type="button" data-kp-act="next">'
        + (isQuizMode() ? '下一课精练 →' : '进入下一课 →') + '</button>'
      : '<button class="primary-button" type="button" data-kp-act="submit">提交并查看解析（已答 ' + done + '/' + qs.length + '）</button>')
      + '</div>';

    els.body.innerHTML = html;
    bindDrill();
  }

  function bindDrill() {
    els.body.querySelectorAll("[data-kp-opt]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var q = state.quiz;
        if (!q || q.submitted) return;
        q.answers[btn.dataset.kpQno] = btn.dataset.kpOpt;
        renderDrill();
      });
    });
    els.body.querySelectorAll("[data-kp-act]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var act = btn.dataset.kpAct;
        var q = state.quiz;
        if (!q) return;
        if (act === "submit") {
          var g = quizOf(q.ch, q.idx);
          var unanswered = g.qs.filter(function (x) { return !q.answers[x.no]; }).length;
          if (unanswered && !q.warned) { q.warned = true; renderDrill(); return; }
          q.submitted = true;
          q.warned = false;
          renderDrill();
          scrollToPanelTop();
          return;
        }
        if (act === "again") {
          q.answers = {}; q.submitted = false; q.warned = false;
          renderDrill(); scrollToPanelTop(); return;
        }
        if (act === "lesson") {
          // 同步练入口下不回讲解，直接回同步练目录
          if (isQuizMode()) { renderHome(); scrollToPanelTop(); }
          else openLesson(q.ch, q.idx);
          return;
        }
        if (act === "next") {
          var techs = chapterTechs(q.ch);
          if (q.idx < techs.length - 1) {
            if (isQuizMode()) openDrill(q.ch, q.idx + 1);
            else openLesson(q.ch, q.idx + 1);
          } else renderHome();
          return;
        }
      });
    });
  }

  /* ================= 打印：知识点合集 ================= */
  function buildPrintHtml() {
    var html = '<div class="kp-print">';
    html += '<div class="kp-print-cover"><h1>新疆中考英语完形填空 · 知识点讲解与练习合集</h1>'
      + '<p>五维一体核心解题矩阵 · ' + CHAPTERS.length + ' 讲 / 27 课 · 配套 ' + totalQuizCount() + ' 道真题精练</p>'
      + '<p class="kp-print-tip">先读讲解，再做对应精练；每课标题下标注了配套题量。</p></div>';
    CHAPTERS.forEach(function (ch) {
      var techs = chapterTechs(ch.id);
      var content = chapterHtml(ch.id);
      html += '<section class="kp-print-cat"><h2>' + ch.no + '　' + esc(ch.t) + '</h2>';
      if (techs.length) {
        html += '<div class="kp-print-body">' + content + '</div>';
      } else {
        html += '<div class="kp-print-body">' + content + '</div>';
      }
      html += '</section>';
    });
    html += '<div class="kp-print-foot">@新疆学生无限进步 · 仅作内部训练使用</div>';
    html += '</div>';
    return html;
  }

  function printCollection() {
    var area = $("printArea");
    if (!area) { window.print(); return; }
    var prev = area.innerHTML;
    area.innerHTML = buildPrintHtml();
    var restore = function () {
      area.innerHTML = prev;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
    setTimeout(restore, 1500);
  }

  function scrollToPanelTop() {
    var panel = $("home");
    if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ================= 对外接口 ================= */
  var api = {
    ready: function () { return !!(handoutData() && quizData()); },
    /** mode: "handout"（知识点讲解）| "quiz"（知识点同步练） */
    show: function (mode) {
      cacheEls();
      if (!els.panel) return false;
      state.mode = mode === "quiz" ? "quiz" : "handout";
      state.done = readDone();
      els.panel.classList.remove("hidden");
      renderHome();
      scrollToPanelTop();
      return true;
    },
    hide: function () {
      if (!els.panel) cacheEls();
      if (els.panel) els.panel.classList.add("hidden");
      state.view = "home";
    },
    isActive: function () {
      return !!(els.panel && !els.panel.classList.contains("hidden"));
    },
    mode: function () { return state.mode; },
    view: function () { return state.view; },
    openLesson: function (chId, techIdx) {
      cacheEls();
      if (!els.panel) return false;
      state.mode = "handout";
      state.done = readDone();
      els.panel.classList.remove("hidden");
      openLesson(chId, Number(techIdx));
      return true;
    },
    openDrill: function (chId, techIdx) {
      cacheEls();
      if (!els.panel) return false;
      state.mode = "quiz";
      els.panel.classList.remove("hidden");
      openDrill(chId, Number(techIdx));
      return true;
    },
    print: printCollection
  };

  window.ClozeKnowledge = api;

  /* 静态绑定：打印（返回按钮由 app.js 的 [data-home-tool-close] 统一处理） */
  function bindStatic() {
    cacheEls();
    if (els.print) els.print.addEventListener("click", printCollection);
  }

  document.addEventListener("DOMContentLoaded", bindStatic);
  if (document.readyState !== "loading") bindStatic();
})();
