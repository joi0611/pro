/* ============================================================
 * 错因归类器（数据层，可独立维护）
 * ------------------------------------------------------------
 * 依据：33 篇 / 198 题全量实测 —— 594 个干扰项中仅 46 个（7.7%）
 *       在原文出现过，92.3% 是凭空造的词。
 *       ⇒ 「回原文找答案」是无效策略，必须靠语义辨析。
 *
 * 本文件负责：学生答错时，判断他错在哪一类认知环节，
 *             并明确告诉他「去看哪条线索、为什么另三个不行」。
 *
 * 归因来源优先级（从高到低）：
 *   ① 解析「排除」段已显式写明杀法 → 直接引用，最准
 *   ② 排除段已写明各错项释义（没写杀法名）→ 提取释义 + 规则定杀法
 *   ③ 排除段完全缺失 → 规则兜底（情感极性 / 搭配 / 原文出现性）
 *
 * 暴露：window.CLOZE_DIAG_API.classify(lesson, q, studentAnswer)
 * ============================================================ */

(function (root) {
  "use strict";

  /* ---------- 1) 情感极性 ---------- */

  function polarityOf(word) {
    var w = String(word || "").toLowerCase();
    var EW = root.CLOZE_EMOTION_WORDS;
    if (!EW) return 0;
    function inAny(list) {
      if (!list) return false;
      for (var i = 0; i < list.length; i++) {
        var e = list[i];
        if (w === e || w === e + "ed" || w === e + "ing" || w === e + "ly" ||
            w === e + "ness" || w === e + "ful") return true;
      }
      return false;
    }
    if (inAny(EW.pos && EW.pos.adj) || inAny(EW.pos && EW.pos.verb)) return 1;
    if (inAny(EW.neg && EW.neg.adj) || inAny(EW.neg && EW.neg.verb)) return -1;
    return 0;
  }

  /* ---------- 2) 工具 ---------- */

  function esc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function appearsIn(lesson, word) {
    var text = String((lesson && (lesson.article_text_with_blanks || "")) || "");
    return text ? new RegExp(esc(word), "i").test(text) : false;
  }

  function killAxis(type) {
    if (!type) return "";
    if (type.indexOf("情感线索") === 0) return "情感";
    if (type.indexOf("逻辑线索") === 0) return "逻辑";
    if (type.indexOf("固定搭配") === 0) return "搭配";
    if (type.indexOf("熟词生义") === 0) return "生义";
    if (type.indexOf("复现线索") === 0) return "复现";
    return "语境";
  }

  function findClueOfType(q, type) {
    var m = q.clueTypes || {}, keys = Object.keys(m);
    for (var i = 0; i < keys.length; i++) if (m[keys[i]] === type) return keys[i];
    return "";
  }

  function buildAxes(q) {
    var axes = {}, m = q.clueTypes || {}, keys = Object.keys(m);
    for (var i = 0; i < keys.length; i++) {
      var ax = killAxis(m[keys[i]]);
      (axes[ax] = axes[ax] || []).push(keys[i]);
    }
    return axes;
  }

  function nearestClue(q, axes) {
    var order = ["情感", "逻辑", "搭配", "生义", "复现", "语境"];
    for (var i = 0; i < order.length; i++) {
      if (axes[order[i]] && axes[order[i]].length) return axes[order[i]][0];
    }
    return (q.clues && q.clues[0]) || "";
  }

  /* 按杀法类型反查对应维度的线索 —— 「指哪条」必须和「为什么错」同源。
   * 例：选了 simple 判「方向否」→ 应指向逻辑线索，而不是情感线索。 */
  function clueForKill(q, kill) {
    var m = q.clueTypes || {}, keys = Object.keys(m), want = "";
    if (kill === "异场否") want = "情感";
    else if (kill === "方向否") want = "逻辑";
    else if (kill === "搭配不到位") want = "搭配";
    else if (kill === "熟词生义") want = "生义";
    else if (kill === "呼应否") want = "复现";   // 呼应落点来自原文复现
    if (want) {
      for (var i = 0; i < keys.length; i++) {
        if (killAxis(m[keys[i]]) === want) return keys[i];
      }
    }
    return "";
  }

  /* ---------- 3) 从解析「排除」段抽取归因 ---------- */

  var KILLS = ["方向否", "异场否", "呼应否"];

  /* 抽取「某错项 → 杀法 + 理由」。
   * 支持两种写法：
   *   a) 带杀法标注：  simple 与全篇方向正好相反：…（方向否）
   *   b) 仅释义：      invite 通常是邀请参加活动，select 是挑选，follow 是跟随，都不能…
   * 返回 { word, kill, reason } */
  function extractFromExplain(q) {
    var e = String((q && q.explanation) || "");
    var m = e.match(/排除[^\n]*/);
    if (!m) return null;
    var seg = m[0];
    var wrongOpts = (q.options || []).filter(function (o) { return o !== q.answer; });
    if (!wrongOpts.length) return null;

    var map = {};

    // --- 模式 a：先把带括号标注的切出来 ---
    var hasKill = KILLS.some(function (k) { return seg.indexOf(k) >= 0; });
    if (hasKill) {
      // 以分隔符切成子句，按错项名归属
      var clauses = seg.split(/[；;]/);
      for (var i = 0; i < clauses.length; i++) {
        var cl = clauses[i];
        var kill = "";
        for (var j = 0; j < KILLS.length; j++) {
          if (cl.indexOf(KILLS[j]) >= 0) { kill = KILLS[j]; break; }
        }
        if (!kill) continue;
        for (var w = 0; w < wrongOpts.length; w++) {
          if (cl.indexOf(wrongOpts[w]) >= 0) {
            map[wrongOpts[w]] = { word: wrongOpts[w], kill: kill, reason: clean(cl, wrongOpts[w], kill) };
            break;
          }
        }
      }
      if (Object.keys(map).length) return map;
    }

    // --- 模式 b：无杀法标注，尝试把「都/不能/无法」类总括句与释义抽出来 ---
    var glue = seg.match(/([^。]*?(?:都|均|都只|都没)[^。]*)/);
    if (glue) {
      var g = glue[1];
      var reasons = {};
      for (var k = 0; k < wrongOpts.length; k++) {
        var o = wrongOpts[k];
        if (g.indexOf(o) < 0) continue;
        // 释义：紧跟在错项名后的「X 是 Y」或「X（Y）」
        var after = g.slice(g.indexOf(o) + o.length);
        var def = after.match(/^[^，,；;]{0,26}?(?:是|指|表示|意为)[^，,；;]{1,22}/);
        reasons[o] = { word: o, kill: "", reason: def ? cleanStr(def[0]) : "" };
      }
      var shared = g.match(/((?:都|均)[^，,；;]{1,50}(?:不能|无法|不|找|立|承接)[^。]{0,50})/);
      if (shared) {
        Object.keys(reasons).forEach(function (o) {
          if (!reasons[o].reason) reasons[o].reason = cleanStr(shared[1]);
        });
      }
      if (Object.keys(reasons).length) return reasons;
    }
    return null;
  }

  function clean(cl, word, kill) {
    var s = cl.replace(new RegExp(esc(word), "g"), "").replace(new RegExp(esc(kill), "g"), "");
    s = s.replace(/[（(][^）)]*[）)]/g, "").replace(/^[，,：:\s]+|[，,：:\s]+$/g, "");
    return cleanStr(s);
  }
  function cleanStr(s) {
    return String(s || "").replace(/^[，,。：:\s]+|[，,。：:\s]+$/g, "").trim();
  }

  /* ---------- 4) 规则兜底的杀法定性 ---------- */

  function ruleKill(lesson, q, studentAnswer) {
    var axes = buildAxes(q);
    var sp = polarityOf(studentAnswer), ap = polarityOf(q.answer);

    if (sp !== 0 && ap !== 0 && sp !== ap) {
      return { kill: "异场否", tone: "purple" };
    }
    if (axes["搭配"] && axes["搭配"].length) {
      return { kill: "搭配不到位", tone: "amber" };
    }
    if (axes["生义"] && axes["生义"].length) {
      return { kill: "熟词生义", tone: "teal" };
    }
    if (appearsIn(lesson, studentAnswer) && !appearsIn(lesson, q.answer)) {
      return { kill: "呼应否", tone: "blue" };
    }
    if (!appearsIn(lesson, studentAnswer) && !appearsIn(lesson, q.answer)) {
      return { kill: "呼应否", tone: "red" };
    }
    return { kill: "方向否", tone: "gray" };
  }

  /* ---------- 5) 主分类 ---------- */

  function classify(lesson, q, studentAnswer) {
    if (!q || !studentAnswer || studentAnswer === q.answer) return null;

    var axes = buildAxes(q);
    var res = {
      kind: "", killer: "", title: "", why: "", lookAt: "", tone: "gray",
      otherWrong: [], source: ""
    };

    /* ① 优先读解析里已写好的归因 —— 最准，且是老师审定的说法 */
    var map = extractFromExplain(q);
    if (map && map[studentAnswer] && map[studentAnswer].kill) {
      res.source = "explain";
      res.killer = map[studentAnswer].kill;
      res.lookAt = clueForKill(q, res.killer) || nearestClue(q, axes);
      res.why = map[studentAnswer].reason ||
        ("你在这一步判断错了——解析里对「" + studentAnswer + "」的排除理由是：" + res.killer + "。");
      res.title = titleOf(res.killer);
      res.tone = toneOf(res.killer);
      fillOthers(res, q, map, studentAnswer);
      return res;
    }

    /* ② 解析里有释义但没杀法名 —— 借释义 + 规则定杀法 */
    if (map && map[studentAnswer] && map[studentAnswer].reason) {
      var rk = ruleKill(lesson, q, studentAnswer);
      res.source = "explain+rule";
      res.killer = rk.kill;
      res.tone = rk.tone;
      res.lookAt = clueForKill(q, rk.kill) || nearestClue(q, axes);
      res.title = titleOf(rk.kill);
      res.why = "「" + studentAnswer + "」——" + map[studentAnswer].reason +
        "　所以这一步该用「" + rk.kill + "」排除它。";
      fillOthers(res, q, map, studentAnswer);
      return res;
    }

    /* ③ 完全兜底：纯规则 */
    var rk2 = ruleKill(lesson, q, studentAnswer);
    res.source = "rule";
    res.killer = rk2.kill;
    res.tone = rk2.tone;
    res.lookAt = clueForKill(q, rk2.kill) || nearestClue(q, axes);
    res.title = titleOf(rk2.kill);
    res.why = ruleWhy(lesson, q, studentAnswer, rk2.kill);
    fillOthers(res, q, null, studentAnswer);
    return res;
  }

  function fillOthers(res, q, map, studentAnswer) {
    (q.options || []).forEach(function (o) {
      if (o === q.answer || o === studentAnswer) return;
      var hit = map && map[o];
      res.otherWrong.push({
        word: o,
        kill: (hit && hit.kill) || "",
        reason: (hit && hit.reason) || ""
      });
    });
  }

  function titleOf(k) {
    if (k === "异场否") return "你和文章的情感场反了";
    if (k === "方向否") return "这一步的方向没抓住";
    if (k === "呼应否") return "这个选项在全文里立不住";
    if (k === "搭配不到位") return "这一空考的是固定搭配";
    if (k === "熟词生义") return "这个词你认识，但不是本文的意思";
    return "这一步判断错了";
  }
  function toneOf(k) {
    if (k === "异场否") return "purple";
    if (k === "方向否") return "gray";
    if (k === "呼应否") return "red";
    if (k === "搭配不到位") return "amber";
    if (k === "熟词生义") return "teal";
    return "gray";
  }

  function ruleWhy(lesson, q, sa, kill) {
    if (kill === "异场否") {
      return "你选的「" + sa + "」的情感色彩和文章连起来的基调相反。这种题先定全文是褒是贬，再拿它去筛选项。";
    }
    if (kill === "搭配不到位") {
      return "这一空要的是固定说法，语义方向对但换成「" + sa + "」就不是那个搭配了。";
    }
    if (kill === "熟词生义") {
      return "「" + sa + "」在这里用的是本句的语境义，别按第一反应走。";
    }
    if (kill === "呼应否") {
      if (!appearsIn(lesson, sa) && !appearsIn(lesson, q.answer)) {
        return "四个选项里只有「" + q.answer + "」能让空前后的话讲得通。这种题回原文找词没用——答案本来就不在原文里。";
      }
      return "「" + sa + "」原文里出现过，但你抓的是字面义，没接住它真正的呼应落点。";
    }
    return "回到空的前后各一句，先定这件事的方向，再回头对选项。";
  }

  root.CLOZE_DIAG_API = {
    classify: classify,
    _polarityOf: polarityOf,
    _extractFromExplain: extractFromExplain
  };
})(typeof window !== "undefined" ? window : this);