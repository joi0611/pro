"use strict";

const fs = require("fs");
const vm = require("vm");

const answerFiles = [
  "answers-7up-authoritative.json",
  "answers-7down-authoritative.json",
  "answers-8up-authoritative.json",
  "answers-8down-authoritative.json",
  "answers-9up-authoritative.json",
  "answers-9down-authoritative.json"
];
const answers = Object.assign({}, ...answerFiles.map(file => JSON.parse(fs.readFileSync(file, "utf8"))));
const staging = JSON.parse(fs.readFileSync("import-staging.json", "utf8"));
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync("builtin-lessons.js", "utf8"), context);
const lessons = context.window.BUILTIN_LESSONS || [];
const byId = new Map(lessons.map(lesson => [lesson.id, lesson]));
const errors = [];
const articleKeys = new Set();
let questionCount = 0;
let clueCount = 0;

function compact(value) { return String(value || "").toLowerCase().replace(/\W+/g, ""); }
function keyOf(item) { return item.answer_key || `${item.grade}-${String(item.sequence).padStart(3, "0")}`; }

for (const item of staging.lessons) {
  const key = keyOf(item);
  const lesson = byId.get(`cloze-广州-${key}`);
  const answerSet = answers[key];
  if (!lesson) { errors.push(`${key}: 未生成到题库`); continue; }
  if (!answerSet) { errors.push(`${key}: 缺少答案版记录`); continue; }
  if (lesson.article_text_with_blanks !== item.article) errors.push(`${key}: 正文与清洗后的题目版不一致`);
  if (lesson.source !== item.heading) errors.push(`${key}: 来源标题不一致`);
  if (item.questions.length !== answerSet.answers.length) errors.push(`${key}: 题目数与答案数不一致`);
  if ((answerSet.source_numbers || []).join(",") !== item.questions.map(q => q.source_number).join(",")) {
    errors.push(`${key}: 原题号与答案版题号不一致`);
  }
  // 同一篇文章但挖空位置不同属于不同练习；只有正文与空位布局都一致才判重复。
  const articleKey = compact(item.article.replace(/__\d+__/g, " blank "));
  if (articleKeys.has(articleKey)) errors.push(`${key}: 正文重复`);
  articleKeys.add(articleKey);
  const markers = [...item.article.matchAll(/__(\d+)__/g)].map(match => Number(match[1]));
  const expectedMarkers = item.questions.map((_, index) => index + 1);
  if (markers.join(",") !== expectedMarkers.join(",")) errors.push(`${key}: 空号不是连续的1..N`);
  const withoutMarkers = item.article.replace(/__\d+__/g, "");
  if (/_{2,}/.test(withoutMarkers)) errors.push(`${key}: 正文仍有未清理横线`);
  if (/阅读下面短文|从短文后各题|选择最佳选项/.test(item.article.slice(0, 200))) errors.push(`${key}: 作答说明混入正文`);
  if (!lesson.first_sentence || !lesson.last_sentence) errors.push(`${key}: 缺少首句或尾句`);
  if (!lesson.tone || !["积极", "消极", "转折变化"].includes(lesson.tone.answer)) errors.push(`${key}: 首尾定调非法`);
  if (!["简单", "中等", "较难"].includes(lesson.difficulty)) errors.push(`${key}: 难度非法`);
  if (!["记叙文", "说明文", "其他"].includes(lesson.article_type)) errors.push(`${key}: 体裁非法`);

  item.questions.forEach((sourceQuestion, index) => {
    const q = lesson.questions[index];
    const letter = answerSet.answers[index];
    const expectedAnswer = sourceQuestion.options["ABCD".indexOf(letter)];
    questionCount++;
    if (!q || q.q !== index + 1) { errors.push(`${key} Q${index + 1}: 内部题号异常`); return; }
    if (!Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4) errors.push(`${key} Q${q.q}: 选项不是四个不同值`);
    if (q.answer !== expectedAnswer) errors.push(`${key} Q${q.q}: 系统答案与答案版字母不一致`);
    if (compact(answerSet.answer_texts[index]) !== compact(expectedAnswer)) errors.push(`${key} Q${q.q}: 答案版文字与正确选项不一致`);
    if (!Array.isArray(q.clues) || q.clues.length < 1 || q.clues.length > 3) errors.push(`${key} Q${q.q}: 线索数量异常`);
    for (const clue of q.clues || []) {
      clueCount++;
      if (!item.article.toLowerCase().includes(String(clue).toLowerCase())) errors.push(`${key} Q${q.q}: 线索不在正文`);
      if (/__\d+__/.test(clue)) errors.push(`${key} Q${q.q}: 线索含空号`);
      if (!(q.clueTypes || {})[clue]) errors.push(`${key} Q${q.q}: 线索未分类`);
    }
  });
}

if (lessons.length !== staging.lessons.length) errors.push(`题库篇数${lessons.length}与暂存篇数${staging.lessons.length}不一致`);
if (questionCount !== lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0)) errors.push("全库题数汇总不一致");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`全量审计通过：${lessons.length}篇，${questionCount}题，${clueCount}条线索；题目版、答案版与系统数据逐项一致。`);
