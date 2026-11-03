const fs = require("fs");
const vm = require("vm");

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync("builtin-lessons.js", "utf8"), context);

const lessons = context.window.BUILTIN_LESSONS || [];
const knownRoutes = new Set(["线索词优先", "固定搭配优先", "双路径", "整组短语直接辨析"]);
const errors = [];

for (const lesson of lessons) {
  const actualSummary = {
    "线索词优先": 0,
    "固定搭配优先": 0,
    "双路径": 0,
    "整组短语直接辨析": 0
  };

  for (const question of lesson.questions || []) {
    if (!knownRoutes.has(question.route)) {
      errors.push(`${lesson.id} Q${question.q}: 非法 route “${question.route}”`);
    } else {
      actualSummary[question.route] += 1;
    }

    const collocation = question.collocation;
    if (collocation !== null && collocation !== undefined &&
        (typeof collocation !== "object" || Array.isArray(collocation) ||
         !Object.hasOwn(collocation, "name") || !Object.hasOwn(collocation, "type") ||
         !Object.hasOwn(collocation, "structure"))) {
      errors.push(`${lesson.id} Q${question.q}: collocation 形态不正确`);
    }
  }

  for (const route of knownRoutes) {
    if ((lesson.route_summary || {})[route] !== actualSummary[route]) {
      errors.push(`${lesson.id}: route_summary 的“${route}”与逐题统计不一致`);
    }
  }

  const finalSentence = (lesson.reading_sentences || []).at(-1) || "";
  for (const match of finalSentence.matchAll(/__(\d+)__/g)) {
    const question = (lesson.questions || []).find(item => item.q === Number(match[1]));
    if (!question || !question.answer) continue;
    const escapedAnswer = String(question.answer).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp("\\b" + escapedAnswer + "\\b", "i").test(lesson.last_sentence || "")) {
      errors.push(`${lesson.id} Q${question.q}: last_sentence 泄露答案`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`校验通过：${lessons.length} 篇，route、搭配字段和末句答案均正常。`);
}
