const fs = require("fs");
const vm = require("vm");
const path = require("path");

const htmlPath = path.join(__dirname, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const start = html.indexOf("    const posList = [");
const end = html.indexOf("    function getArticleTitle(key)", start);
if (start < 0 || end < 0) throw new Error("无法定位题库代码区间");

const passageMatch = html.match(/<div class="passage" id="passage">([\s\S]*?)<\/div>\s*<div class="actions">/);
const context = {
  window: {},
  document: {
    getElementById(id) {
      if (id === "passage") return { innerHTML: passageMatch ? passageMatch[1] : "" };
      return null;
    }
  }
};
vm.createContext(context);
const importedPath = path.join(__dirname, "imported-question-bank-20260829.js");
if (fs.existsSync(importedPath)) vm.runInContext(fs.readFileSync(importedPath, "utf8"), context, { filename: importedPath });
vm.runInContext(
  html.slice(start, end).replace("...window.WORD_CHOICE_IMPORTED_20260829,", "...window.WORD_CHOICE_IMPORTED_20260829,") +
    "\n;globalThis.__audit = { posList, questionBank };",
  context,
  { filename: htmlPath }
);

const { posList, questionBank } = context.__audit;
const validPos = new Set(posList.map(item => item[0]));
const issues = [];
const warnings = [];
const stats = [];

function add(level, article, blank, message) {
  (level === "error" ? issues : warnings).push({ article, blank, message });
}

function idsOf(obj) {
  return Object.keys(obj || {}).map(String).sort((a, b) => Number(a) - Number(b));
}

function getForm(words, wordText, formKey) {
  const word = words.find(item => item.text === wordText);
  if (!word) return wordText;
  if (word.forms?.[formKey]) return word.forms[formKey];
  const baseVerb = word.forms?.verb || wordText;
  const baseNoun = word.forms?.noun || wordText;
  if (formKey === "third") return baseVerb.endsWith("s") ? baseVerb + "es" : baseVerb + "s";
  if (formKey === "past" || formKey === "pp") return baseVerb.endsWith("e") ? baseVerb + "d" : baseVerb + "ed";
  if (formKey === "ing") return baseVerb.endsWith("e") ? baseVerb.slice(0, -1) + "ing" : baseVerb + "ing";
  if (formKey === "nounPlural") return baseNoun.endsWith("s") ? baseNoun + "es" : baseNoun + "s";
  return wordText;
}

function ruleOutput(words, pos, wordText, rule) {
  const f = key => getForm(words, wordText, key);
  const rules = pos === "noun" ? {
    keep: f("noun"), plural: f("nounPlural"), possessive: f("noun") + "'s", pluralPossessive: f("nounPlural") + "'",
    sentence: f("sentence") || f("noun").replace(/^./, c => c.toUpperCase()),
    toAdj: wordText === "pride" ? "proud" : f("adj")
  } : pos === "verb" ? {
    base: f("verb"), third: f("third"), past: f("past"), ing: f("ing"), pp: f("pp"),
    presentPerfect: f("perfect") || "has " + f("pp"), to: "to " + f("verb"),
    toAdj: f("adj"), toNoun: f("noun"), toNounPlural: f("nounPlural")
  } : (pos === "adj" || pos === "adv") ? {
    origin: f(pos), toAdv: f("adv"), compare: f("compare") || "more " + f(pos),
    super: f("super") || "most " + f(pos),
    sentence: f("sentence") || f(pos).replace(/^./, c => c.toUpperCase()),
    toNoun: f("noun"), opposite: f("opposite") || "un" + f(pos)
  } : pos === "pron" ? {
    subj: f("pron"), obj: f("obj"), possAdj: f("possAdj"), possNoun: f("possNoun") || "ours",
    reflexive: f("reflexive"), sentence: f("sentence") || f("pron").replace(/^./, c => c.toUpperCase())
  } : pos === "num" ? {
    cardinal: f("num"), ordinal: f("ordinal"), times: f("times"), plural: f("nounPlural")
  } : {
    safe: f(pos), sentence: f("sentence") || f(pos).replace(/^./, c => c.toUpperCase())
  };
  return Object.prototype.hasOwnProperty.call(rules, rule) ? rules[rule] : undefined;
}

for (const [key, q] of Object.entries(questionBank)) {
  const article = `${key}｜${q.source || "无来源"}`;
  const words = q.words || [];
  const wordTexts = words.map(word => word.text);
  const wordSet = new Set(wordTexts);
  const blankIds = idsOf(q.blanks);
  const clueIds = idsOf(q.blankClues);
  const formulaIds = idsOf(q.clueFormulas);
  const htmlBlankIds = [...String(q.passageHtml || "").matchAll(/data-blank="(\d+)"/g)].map(m => m[1]);
  const laterIds = [...String(q.passageHtml || "").matchAll(/data-later="(\d+)"/g)].map(m => m[1]);
  const uniqueHtmlBlankIds = [...new Set(htmlBlankIds)].sort((a, b) => Number(a) - Number(b));
  const uniqueLaterIds = [...new Set(laterIds)].sort((a, b) => Number(a) - Number(b));
  const answerWords = Object.values(q.blanks || {}).map(blank => blank.correctWord);

  stats.push({ key, source: q.source, words: words.length, blanks: blankIds.length });

  if (new Set(wordTexts).size !== wordTexts.length) add("error", article, "—", "备选词存在重复 text");
  if (words.length !== blankIds.length) add("warning", article, "—", `备选词 ${words.length} 个、空格 ${blankIds.length} 个`);
  if (new Set(answerWords).size !== answerWords.length) add("error", article, "—", "标准答案重复使用备选词，与一词一次交互冲突");
  if (wordTexts.some(text => !q.wordKey?.[text])) add("error", article, "—", "wordKey 未覆盖全部备选词");
  for (const text of Object.keys(q.wordKey || {})) {
    if (!wordSet.has(text)) add("error", article, "—", `wordKey 出现词库外单词：${text}`);
    const item = q.wordKey[text];
    if (!validPos.has(item.tag)) add("error", article, "—", `${text} 的基础词性无效：${item.tag}`);
    for (const pos of item.conversions || []) if (!validPos.has(pos)) add("error", article, "—", `${text} 的转换词性无效：${pos}`);
  }
  for (const [name, ids] of [["blankClues", clueIds], ["clueFormulas", formulaIds], ["正文空格", uniqueHtmlBlankIds], ["暂缓按钮", uniqueLaterIds]]) {
    if (JSON.stringify(ids) !== JSON.stringify(blankIds)) add("error", article, "—", `${name} 编号与 blanks 不一致`);
  }
  for (const id of blankIds) {
    const blank = q.blanks[id];
    if (!validPos.has(blank.needed)) add("error", article, id, `needed 词性无效：${blank.needed}`);
    if (!wordSet.has(blank.correctWord)) add("error", article, id, `correctWord 不在备选词中：${blank.correctWord}`);
    const keyData = q.wordKey?.[blank.correctWord];
    const allowed = keyData ? [keyData.tag, ...(keyData.conversions || [])] : [];
    if (!allowed.includes(blank.needed)) add("error", article, id, `标准词 ${blank.correctWord} 的标签不包含所需词性 ${blank.needed}`);
    if (!blank.rule) add("error", article, id, "缺少 rule");
    if (!blank.answer) add("error", article, id, "缺少 answer");
    if (!blank.path || !String(blank.path).includes(String(blank.answer))) add("warning", article, id, "解析 path 缺失或未包含最终答案");
    const word = words.find(item => item.text === blank.correctWord);
    const transformPos = keyData?.tag || blank.needed;
    const generated = ruleOutput(words, transformPos, blank.correctWord, blank.rule);
    if (generated === undefined) add("error", article, id, `规则 ${blank.rule} 不会出现在基础词性 ${transformPos} 的变形面板中`);
    else if (generated !== blank.answer) add("error", article, id, `规则 ${blank.rule} 实际生成“${generated}”，标准答案却是“${blank.answer}”`);
    if (word && !Object.values(word.forms || {}).includes(blank.answer) && !["safe", "sentence", "possessive", "to", "presentPerfect"].includes(blank.rule)) {
      add("warning", article, id, `最终答案“${blank.answer}”未显式出现在 ${blank.correctWord}.forms 中`);
    }
  }
}

const signatureGroups = new Map();
for (const [key, q] of Object.entries(questionBank)) {
  const signature = JSON.stringify({ words: q.words, blanks: q.blanks, passageHtml: q.passageHtml });
  const group = signatureGroups.get(signature) || [];
  group.push(key);
  signatureGroups.set(signature, group);
}
for (const group of signatureGroups.values()) {
  if (group.length > 1) add("warning", group.join(" / "), "—", "多篇题目的词库、答案和正文完全相同，仅来源或标题不同");
}

const result = {
  summary: {
    articles: stats.length,
    words: stats.reduce((sum, item) => sum + item.words, 0),
    blanks: stats.reduce((sum, item) => sum + item.blanks, 0),
    errors: issues.length,
    warnings: warnings.length
  },
  stats,
  errors: issues,
  warnings
};
const detailArg = process.argv.find(arg => arg.startsWith("--details="));
if (detailArg) {
  const requested = new Set(detailArg.slice("--details=".length).split(","));
  const rows = [];
  for (const [key, q] of Object.entries(questionBank)) {
    if (!requested.has(key)) continue;
    const plain = String(q.passageHtml || "")
      .replace(/<button class="blank" data-blank="(\d+)">[\s\S]*?<\/button>/g, " [[BLANK:$1]] ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    for (const [id, blank] of Object.entries(q.blanks || {})) {
      const marker = `[[BLANK:${id}]]`;
      const at = plain.indexOf(marker);
      const contextText = at < 0 ? "（未定位正文）" : plain.slice(Math.max(0, at - 90), at) + "___" + plain.slice(at + marker.length, at + marker.length + 90);
      rows.push({ key, source: q.source, id, context: contextText, needed: blank.needed, word: blank.correctWord, rule: blank.rule, answer: blank.answer, path: blank.path });
    }
  }
  process.stdout.write(JSON.stringify(rows, null, 2));
} else {
  process.stdout.write(JSON.stringify(result, null, 2));
}
