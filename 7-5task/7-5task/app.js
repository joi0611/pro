(function () {
  "use strict";

  const handout = window.SEVEN_CHOICE_HANDOUT;
  const practiceBank = [...(window.SEVEN_CHOICE_IMPORTED_PRACTICE || []), ...(window.SEVEN_CHOICE_PRACTICE || [])];
  const rawExams = [...(window.SEVEN_CHOICE_EXAMS || []), ...(window.SEVEN_CHOICE_NEW_EXAMS || [])];
  if (!handout?.lessons || !Array.isArray(practiceBank) || !Array.isArray(rawExams)) throw new Error("七选五讲义、练习或真题数据未加载。");

  function normalizeExam(exam) {
    const originalNumbers = [...new Set(exam.passage.flatMap((paragraph) => [...String(paragraph).matchAll(/\[\[(\d+)\]\]/g)].map((match) => Number(match[1]))))].sort((a, b) => a - b);
    const numberMap = Object.fromEntries(originalNumbers.map((number, index) => [number, index + 1]));
    const passage = exam.passage.map((paragraph) => String(paragraph).replace(/\[\[(\d+)\]\]/g, (_marker, number) => `[[${numberMap[Number(number)]}]]`));
    const answers = Object.fromEntries(originalNumbers.map((number) => [numberMap[number], exam.answers[number]]));
    return {
      ...exam,
      source: exam.source || "27年中考模拟真题",
      range: `1—${originalNumbers.length}`,
      passage,
      answers,
      analysis: window.SEVEN_CHOICE_VERIFIED_GUIDANCE?.[exam.id]?.questions || exam.analysis,
    };
  }

  const exams = rawExams.map(normalizeExam);

  const STORAGE_KEY = "xinjiang-seven-choice-handout-progress-v1";
  const EXAMPLE_EVIDENCE = {
    1: ["Here are some suggestions to develop courage by overcoming daily fears"],
    2: ["if your sister doesn't play with her toys, you can give them to your neighbor"],
    3: ["When a person does a certain thing again and again", "then a habit is formed"],
    4: ["Make a plan", "you should have a plan in your mind first", "follow the plan"],
    5: ["best result", "Not only did I challenge", "make a difference"],
    6: ["What do American families usually do on weekends?", "Running, playing volleyball, biking and swimming are all popular sports"],
    7: ["They come from everywhere to buy the violins"],
    8: ["He does not teach my class but we see him every day"],
    9: ["it's extremely important to wear sunglasses"],
    10: ["draw a picture of something that you want and put it up on the wall", "It can make you get through difficult times"],
    11: ["the starting point of all kinds of success is a strong desire", "have a strong desire for your goal"],
    12: ["They put the flowers and food in front of the graves"],
    13: ["your words carry a message", "a sign at the bus stop helps you to know which bus to take", "A sign on the door tells you where to go in or out"],
    14: ["Don't read while lying down or walking", "Relax after every hour of reading"],
    15: ["Money from the second book was spent on homeless children in Bosnia"],
    16: ["But in France, people greet each other with two kisses on the cheeks when they meet for the first time"],
    17: ["Why?", "She is too busy"],
    18: ["my hometown has changed greatly", "On the one hand", "On the other hand"],
    19: ["tell me what you can see", "Watson replied"],
    20: ["you are not alone", "Here are some simple steps to help you overcome your fear"],
  };
  const state = {
    completed: loadProgress(), activeLesson: null,
    exampleChoice: "", exampleReveal: 1, exampleAttempts: [], exampleSolved: false,
    practiceChoice: "", practiceReveal: 0, practiceAttempts: [], practiceSolved: false,
    activeExam: null, examSelections: {}, examSubmitted: false, examMessage: "", examScores: {},
    examAnalysisQuestion: null, examAnalysisReveal: 0,
    examGuideStep: 1, examThemeChoices: {}, examPositionChoices: {}, examPriorityPicks: {},
    examKeywordPicks: {}, examKeywordRevealed: {},
    examSolveOrders: {}, examSolveIndexes: {}, examAttempts: {}, examSolved: {}, examAdaptiveGuides: {}, examFocusQuestion: null,
  };
  const views = {
    home: document.querySelector("#homeView"),
    catalog: document.querySelector("#catalogView"),
    lesson: document.querySelector("#lessonView"),
    training: document.querySelector("#trainingView"),
    exam: document.querySelector("#examView"),
  };
  const tabs = [...document.querySelectorAll(".module-tab")];
  const lessonList = document.querySelector("#lessonList");
  const lessonSearch = document.querySelector("#lessonSearch");
  const emptyState = document.querySelector("#emptyState");
  const examList = document.querySelector("#examList");

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return new Set(Array.isArray(saved) ? saved.map(Number) : []);
    } catch (_error) { return new Set(); }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.completed].sort((a, b) => a - b)));
  }

  function escapeHtml(value) {
    return String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  function richText(value) {
    let html = escapeHtml(value);
    html = html.replace(/【([^】]+)】/g, '<strong class="lesson-highlight">$1</strong>');
    html = html.replace(/(^|[。；！]\s*)([^。；！：]{2,18})：/g, '$1<strong class="key-term">$2：</strong>');
    html = html.replace(/\b(They|Them|These|Those|Their|He|She|It|This|That|But|However|Yet|Instead|Though|So|Because|Therefore|Since|For example|For instance|In other words|First|Second|Third|Finally)\b/gi, '<strong class="signal-word">$1</strong>');
    return html;
  }

  function optionLetter(option) { return String(option).trim().match(/^([A-G])\./)?.[1] || ""; }

  function escapeRegExp(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  function markedText(value, terms = [], markBlank = false) {
    const cleanTerms = [...new Set(terms.map((term) => String(term).trim()).filter((term) => term.length >= 2))]
      .sort((a, b) => b.length - a.length);
    const patternParts = cleanTerms.map(escapeRegExp);
    if (markBlank) patternParts.push("(?:\\d+\\.\\s*)?_\\s*(?:_\\s*){2,}");
    if (!patternParts.length) return escapeHtml(value);
    const pattern = new RegExp(`(${patternParts.join("|")})`, "gi");
    return String(value).split(pattern).map((part, index) => index % 2 ? `<mark class="evidence-mark">${escapeHtml(part)}</mark>` : escapeHtml(part)).join("");
  }

  const EVIDENCE_SELECTION_STOP_WORDS = new Set("a an the and or but so to of in on at for from with by as is are was were be been being do does did can could will would should may might have has had not no if then than also more most very some any all into about out up down when where what why how who which".split(" "));
  const EVIDENCE_SIGNAL_WORDS = new Set("they them their it this these those he she his her however because therefore instead first next finally".split(" "));

  function normalizeEvidenceText(value) {
    return String(value || "").toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9'\u3400-\u9fff]+/g, " ").trim();
  }

  function evidenceSelectionMatches(selectedText, detail) {
    const selected = normalizeEvidenceText(selectedText);
    if (!selected) return false;
    const selectedTokens = selected.match(/[a-z0-9']+|[\u3400-\u9fff]+/g) || [];
    const hasUsefulToken = selectedTokens.some((token) => /[\u3400-\u9fff]/.test(token)
      || EVIDENCE_SIGNAL_WORDS.has(token)
      || (token.length >= 3 && !EVIDENCE_SELECTION_STOP_WORDS.has(token)));
    if (!hasUsefulToken) return false;
    const evidenceTerms = [...new Set([...(detail.highlightTerms || []), detail.evidenceAnswer].filter(Boolean))];
    return evidenceTerms.some((term) => {
      const evidence = normalizeEvidenceText(term);
      if (!evidence) return false;
      if (evidence.includes(selected) || selected.includes(evidence)) return true;
      const evidenceTokens = new Set(evidence.match(/[a-z0-9']+|[\u3400-\u9fff]+/g) || []);
      return selectedTokens.some((token) => !EVIDENCE_SELECTION_STOP_WORDS.has(token) && evidenceTokens.has(token));
    });
  }

  function signalTermsIn(text) {
    const signals = ["But", "However", "Yet", "Instead", "Though", "So", "Because", "Therefore", "As a result", "Since", "For example", "For instance", "In other words", "First", "Second", "Third", "Finally", "They", "Them", "These", "Those", "Their", "He", "She", "It", "This", "That"];
    return signals.filter((term) => new RegExp(`\\b${escapeRegExp(term)}\\b`, "i").test(text));
  }

  function exampleEvidenceTerms(lesson, revealCount) {
    if (revealCount < 2) return [];
    return EXAMPLE_EVIDENCE[lesson.id] || [];
  }

  function updateProgress() {
    const done = state.completed.size;
    const total = handout.lessons.length;
    document.querySelector("#progressCount").textContent = `${done} / ${total}`;
    document.querySelector("#progressBar").style.width = `${Math.round((done / total) * 100)}%`;
  }

  function updateHomeStats() {
    const questionTotal = exams.reduce((total, exam) => total + Object.keys(exam.answers || {}).length, 0);
    document.querySelector("#homeLessonCount").textContent = handout.lessons.length;
    document.querySelector("#homeExamCount").textContent = exams.length;
    document.querySelector("#homeQuestionCount").textContent = questionTotal;
  }

  function setView(name) {
    Object.entries(views).forEach(([key, element]) => element.classList.toggle("active", key === name));
    const activeTab = name === "exam" ? "training" : name;
    tabs.forEach((tab) => tab.classList.toggle("active", name !== "home" && tab.dataset.view === activeTab));
    document.querySelector(".module-tabs")?.classList.toggle("home-hidden", name === "home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function lessonCard(lesson) {
    const done = state.completed.has(lesson.id);
    return `<article class="lesson-card">
      <div class="lesson-main">
        <div class="lesson-card-meta"><span class="lesson-index">${escapeHtml(lesson.number)}</span><span class="lesson-state ${done ? "done" : ""}">${done ? "已完成" : "待学习"}</span></div>
        <strong>${escapeHtml(lesson.title)}</strong><span class="lesson-summary">${escapeHtml(lesson.goal)}</span>
      </div>
      <button class="start-lesson" type="button" data-lesson-id="${lesson.id}">${done ? "再次学习" : "开始学习"}</button>
    </article>`;
  }

  function renderCatalog(query = "") {
    const keyword = query.trim().toLowerCase();
    const lessons = handout.lessons.filter((lesson) => !keyword || [lesson.number, lesson.title, lesson.goal, lesson.methodIntro, ...lesson.methodPoints].join(" ").toLowerCase().includes(keyword));
    lessonList.innerHTML = lessons.map(lessonCard).join("");
    emptyState.hidden = lessons.length > 0;
  }

  function makeAnalysisSteps(lesson) {
    const example = lesson.example;
    const sentences = example.analysis.split(/(?<=[。！？!])/).map((item) => item.trim()).filter(Boolean);
    const midpoint = Math.max(1, Math.ceil(sentences.length / 2));
    const answerText = example.options.find((option) => optionLetter(option) === example.answer) || `${example.answer} 选项`;
    return [
      { title: "判断考点", text: lesson.steps[0]?.action || lesson.goal },
      { title: "抓决定性线索", text: example.clue },
      { title: "对照正确选项", text: `${answerText}。${sentences.slice(0, midpoint).join("")}` },
      { title: "代入验证", text: sentences.slice(midpoint).join("") || lesson.conclusion },
    ];
  }

  function interactiveOptions(options, answer, selected, attempts, solved, scope, revealCount) {
    return options.map((option) => {
      const letter = optionLetter(option);
      const checked = selected === letter;
      const attempted = attempts.includes(letter);
      const classes = ["interactive-option"];
      if (checked) classes.push("selected");
      if (solved && letter === answer) classes.push("correct");
      if (attempted && letter !== answer) classes.push("wrong", "attempted");
      if (revealCount >= 3 && letter === answer) classes.push("evidence-option");
      const disabled = solved || attempted;
      const status = solved && letter === answer ? "<small>正确答案</small>" : attempted ? "<small>已排除，可继续选择</small>" : "";
      return `<button class="${classes.join(" ")}" type="button" data-${scope}-choice="${letter}" ${disabled ? "disabled" : ""} aria-pressed="${checked}"><span>${escapeHtml(option)}</span>${status}</button>`;
    }).join("");
  }

  function revealMarkup(steps, revealCount, scope) {
    if (!revealCount) return `<div class="analysis-empty"><strong>解析区</strong><p>选择一个选项后，这里先显示第 1 步提示。</p></div>`;
    return `<div class="analysis-steps">${steps.slice(0, revealCount).map((step, index) => `<article class="analysis-step ${index === revealCount - 1 ? "current" : ""}"><span>${index + 1}</span><div><strong>${escapeHtml(step.title)}</strong><p>${richText(step.text)}</p></div></article>`).join("")}</div>
      ${revealCount < steps.length ? `<button class="reveal-next" type="button" data-action="${scope}-next">下一步：${escapeHtml(steps[revealCount].title)}</button>` : `<p class="analysis-complete">✓ 解析已完整展开</p>`}`;
  }

  function exampleMarkup(lesson) {
    const example = lesson.example;
    if (!example.options.length) return `<section class="lesson-section guided-intro"><h3>导读说明</h3><p>${richText(example.prompt)}</p></section>`;
    const result = state.exampleChoice
      ? `<div class="answer-result ${state.exampleSolved ? "correct" : "wrong"}" role="status" aria-live="polite">${state.exampleSolved ? "选择正确。继续完成右侧验证步骤。" : "这项暂不成立，已排除。继续跟随右侧解析定位证据，也可以马上再选。"}</div>`
      : `<p class="question-hint">先看右侧第 1 步，再按“下一步”定位证据；过程中可以随时尝试选择。</p>`;
    return `<section class="lesson-section interactive-question" id="lessonExample">
      <div class="question-heading"><div><span>互动例题</span><h3>跟着解析，一步步完成选择</h3></div><button class="text-action" type="button" data-action="example-reset">重新学习</button></div>
      <div class="question-workspace">
        <div class="question-pane">
          <p class="example-prompt">${markedText(example.prompt, exampleEvidenceTerms(lesson, state.exampleReveal), state.exampleReveal >= 1)}</p>
          <div class="interactive-options">${interactiveOptions(example.options, example.answer, state.exampleChoice, state.exampleAttempts, state.exampleSolved, "example", state.exampleReveal)}</div>
          ${result}
        </div>
        <aside class="analysis-pane" aria-label="例题分步解析" aria-live="polite">${revealMarkup(makeAnalysisSteps(lesson), state.exampleReveal, "example")}</aside>
      </div>
    </section>`;
  }

  function practiceMarkup(lesson) {
    const practice = practiceBank.find((item) => item.id === lesson.id);
    if (!practice) return "";
    const result = state.practiceChoice
      ? `<div class="answer-result ${state.practiceSolved ? "correct" : "wrong"}" role="status" aria-live="polite">${state.practiceSolved ? "自主练习答对了。继续展开剩余解析完成验证。" : "这项不正确，已排除。参考右侧当前提示继续尝试。"}</div>`
      : `<p class="question-hint">这道题不直接显示答案，请先完成选择。</p>`;
    const stepTitles = ["判断位置或关系", "寻找线索", "比较选项", "代入验证"];
    const steps = practice.steps.map((text, index) => ({ title: stepTitles[index], text }));
    return `<section class="lesson-section interactive-question practice-question" id="lessonPractice">
      <div class="question-heading"><div><span>自主练习</span><h3>同类型巩固题</h3></div><button class="text-action" type="button" data-action="practice-reset">重新作答</button></div>
      <div class="question-workspace">
        <div class="question-pane">
          <p class="example-prompt">${markedText(practice.prompt, state.practiceReveal >= 2 ? signalTermsIn(practice.prompt) : [], state.practiceReveal >= 1)}</p>
          <div class="interactive-options">${interactiveOptions(practice.options, practice.answer, state.practiceChoice, state.practiceAttempts, state.practiceSolved, "practice", state.practiceReveal)}</div>
          ${result}
        </div>
        <aside class="analysis-pane" aria-label="自主练习分步解析" aria-live="polite">${revealMarkup(steps, state.practiceReveal, "practice")}</aside>
      </div>
    </section>`;
  }

  function renderLesson(lessonId, preserveScroll = false) {
    const lesson = handout.lessons.find((item) => item.id === Number(lessonId));
    if (!lesson) return;
    const oldY = window.scrollY;
    state.activeLesson = lesson.id;
    const done = state.completed.has(lesson.id);
    const index = handout.lessons.indexOf(lesson);
    const previous = handout.lessons[index - 1];
    const next = handout.lessons[index + 1];
    views.lesson.innerHTML = `<div class="lesson-toolbar"><button class="secondary-action" type="button" data-action="back">← 返回讲义</button><span class="lesson-position">${index + 1} / ${handout.lessons.length}</span></div>
      <article class="lesson-content">
        <header class="lesson-title-block"><p>${escapeHtml(lesson.number)}</p><h2>${escapeHtml(lesson.title)}</h2><div class="goal-line"><strong>本讲目标</strong><span>${escapeHtml(lesson.goal)}</span></div></header>
        <section class="lesson-section" id="lessonMethod"><h3>核心方法</h3>${lesson.methodIntro ? `<p class="method-intro">${richText(lesson.methodIntro)}</p>` : ""}<ol class="method-list">${lesson.methodPoints.map((point, pointIndex) => `<li><strong>${pointIndex + 1}</strong><span>${richText(point)}</span></li>`).join("")}</ol></section>
        <section class="lesson-section" id="lessonSteps"><h3>本讲专用做题动作</h3><div class="step-list">${lesson.steps.map((step) => `<div class="step-row"><strong>${escapeHtml(step.label)}</strong><span>${richText(step.action)}</span><span class="step-check"><b>判断标准</b>${richText(step.check)}</span></div>`).join("")}</div></section>
        ${exampleMarkup(lesson)}${practiceMarkup(lesson)}
        <section class="lesson-section conclusion-section"><h3>本讲结论</h3><p class="conclusion">${richText(lesson.conclusion)}</p></section>
        <button class="complete-button ${done ? "done" : ""}" type="button" data-action="complete">${done ? "✓ 已学完本讲" : "标记为已学完"}</button>
      </article>
      <div class="lesson-toolbar lesson-bottom-nav">${previous ? `<button class="secondary-action" type="button" data-open-lesson="${previous.id}">← 上一讲</button>` : "<span></span>"}${next ? `<button class="primary-action" type="button" data-open-lesson="${next.id}">下一讲 →</button>` : `<button class="primary-action" type="button" data-action="back">完成全部讲义</button>`}</div>`;
    setView("lesson");
    document.title = `${lesson.number} ${lesson.title} | 无限进步 中考7选5训练系统`;
    if (preserveScroll) window.scrollTo({ top: oldY });
  }

  function resetInteraction(type) {
    state[`${type}Choice`] = "";
    state[`${type}Reveal`] = type === "example" ? 1 : 0;
    state[`${type}Attempts`] = [];
    state[`${type}Solved`] = false;
    renderLesson(state.activeLesson, true);
  }

  function choose(type, letter) {
    if (state[`${type}Solved`] || state[`${type}Attempts`].includes(letter)) return;
    const lesson = handout.lessons.find((item) => item.id === state.activeLesson);
    const item = type === "example" ? lesson.example : practiceBank.find((practice) => practice.id === state.activeLesson);
    state[`${type}Choice`] = letter;
    if (letter === item.answer) {
      state[`${type}Solved`] = true;
      if (type === "practice") state[`${type}Reveal`] = Math.max(1, state[`${type}Reveal`]);
    } else {
      state[`${type}Attempts`] = [...state[`${type}Attempts`], letter];
      if (type === "practice") state[`${type}Reveal`] = Math.min(4, Math.max(1, state[`${type}Reveal`] + 1));
    }
    renderLesson(state.activeLesson, true);
  }
  function nextAnalysis(type) { state[`${type}Reveal`] = Math.min(4, state[`${type}Reveal`] + 1); renderLesson(state.activeLesson, true); }
  function openLesson(lessonId) {
    ["example", "practice"].forEach((type) => {
      state[`${type}Choice`] = "";
      state[`${type}Reveal`] = type === "example" ? 1 : 0;
      state[`${type}Attempts`] = [];
      state[`${type}Solved`] = false;
    });
    renderLesson(lessonId);
  }
  function toggleComplete() {
    if (state.completed.has(state.activeLesson)) state.completed.delete(state.activeLesson); else state.completed.add(state.activeLesson);
    saveProgress(); updateProgress(); renderCatalog(lessonSearch.value); renderLesson(state.activeLesson, true);
  }

  function examCard(exam, displayIndex) {
    const score = state.examScores[exam.id];
    const total = examQuestionNumbers(exam).length;
    const status = score === undefined ? "待完成" : `${score} / ${total}`;
    return `<article class="exam-card">
      <div class="exam-card-index">${String(displayIndex).padStart(2, "0")}</div>
      <div class="exam-card-main"><span>题目来源：${escapeHtml(exam.source)} · 本篇 ${escapeHtml(exam.range)} 题</span><strong>${escapeHtml(exam.title)}</strong></div>
      <span class="exam-card-status ${score === total ? "done" : ""}">${status}</span>
      <button class="start-exam" type="button" data-exam-id="${exam.id}">${score === undefined ? "开始训练" : "再次训练"}</button>
    </article>`;
  }

  function orderedExamList() {
    const sourceBucket = (exam) => {
      const source = String(exam.source || "");
      if (/2026/.test(source)) return 0;
      if (/2025/.test(source)) return 1;
      if (/2024/.test(source)) return 2;
      return 3;
    };
    return [...exams].sort((a, b) => sourceBucket(a) - sourceBucket(b) || a.id - b.id);
  }

  function renderTrainingCatalog() {
    examList.innerHTML = orderedExamList().map((exam, index) => examCard(exam, index + 1)).join("");
    const completed = Object.keys(state.examScores).length;
    document.querySelector("#examDoneCount").textContent = `${completed} / ${exams.length}`;
  }

  function examQuestionNumbers(exam) { return Object.keys(exam.answers).map(Number).sort((a, b) => a - b); }

  function cleanContextSnippet(text, fromEnd = false) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return "";
    if (clean.length <= 150) return clean;
    if (fromEnd) {
      const tail = clean.slice(-150);
      const firstSpace = tail.indexOf(" ");
      return firstSpace > -1 ? tail.slice(firstSpace + 1) : tail;
    }
    const head = clean.slice(0, 150);
    const lastSpace = head.lastIndexOf(" ");
    return lastSpace > 80 ? head.slice(0, lastSpace) : head;
  }

  function examBlankContext(exam, number) {
    const marker = `[[${number}]]`;
    const paragraphIndex = exam.passage.findIndex((paragraph) => paragraph.includes(marker));
    const paragraph = exam.passage[paragraphIndex] || "";
    const markerIndex = paragraph.indexOf(marker);
    const localBefore = paragraph.slice(0, markerIndex).replace(/[\s\S]*\[\[\d+\]\]/, "");
    const localAfter = paragraph.slice(markerIndex + marker.length).split(/\[\[\d+\]\]/)[0];
    let before = localBefore.trim();
    let after = localAfter.trim();
    const markerRemainder = paragraph.replace(marker, "").trim();
    // Word 导入后，独占一行的小标题可能保留“◆”等项目符号；这些装饰符
    // 不应让标题空被误判成段尾。正文字符仍然存在时再按句中位置处理。
    const isolated = markerRemainder === "" || !/[A-Za-z0-9\u3400-\u9fff]/.test(markerRemainder);
    if (!before && paragraphIndex > 0) before = exam.passage[paragraphIndex - 1];
    if (!after && paragraphIndex < exam.passage.length - 1) after = exam.passage[paragraphIndex + 1];
    return {
      paragraphIndex, isolated,
      atStart: !localBefore.trim(),
      atEnd: !localAfter.trim(),
      before: cleanContextSnippet(before, true),
      after: cleanContextSnippet(after, false),
    };
  }

  const EXAM_STOP_WORDS = new Set("a an the and or but so to of in on at for from with by as is are was were be been being it this that these those they them their he she his her you your we our i my do does did can could will would should may might have has had not no if then than also more most very some any all into about out up down when where what why how who which".split(" "));

  function meaningfulWords(text) {
    return [...new Set(String(text).toLowerCase().match(/[a-z]+/g) || [])]
      .filter((word) => word.length > 3 && !EXAM_STOP_WORDS.has(word));
  }

  function examQuestionProfile(exam, number) {
    const context = examBlankContext(exam, number);
    const importedAnalysis = exam.analysis?.[number];
    // 解析文档对题型功能的判断优先于 Word 导入后的换行结果。有些“小标题 + 正文”
    // 被合并到同一个段落中，单看 marker 前后文本会错误地判成“段首”。
    const headingSignal = context.isolated || /小标题/.test(`${importedAnalysis?.method || ""} ${importedAnalysis?.observe || ""} ${importedAnalysis?.chain || ""}`);
    const answerOption = exam.options.find((option) => option.startsWith(`${exam.answers[number]}.`)) || exam.answers[number];
    const optionText = answerOption.replace(/^[A-G]\.\s*/, "");
    const nearby = `${context.before} ${context.after}`;
    const overlap = meaningfulWords(optionText).filter((word) => meaningfulWords(nearby).includes(word));
    const asksQuestion = /\?\s*$/.test(context.before) || /^(why|what|how|who|where|when)\b/i.test(optionText);
    const pronounSignal = /\b(they|them|their|it|this|these|those|he|she|his|her)\b/i.test(`${context.after} ${optionText}`);
    const connectorSignal = /^(however|but|so|therefore|as a result|besides|moreover|for example|in other words|finally|next|first)\b/i.test(optionText);
    let priority = 3;
    let priorityLabel = "三级·综合逻辑";
    if (headingSignal) { priority = 1; priorityLabel = "一级·格式特征"; }
    else if (overlap.length >= 2) { priority = 1; priorityLabel = "一级·词汇复现"; }
    else if (asksQuestion) { priority = 2; priorityLabel = "二级·问答关联"; }
    else if (pronounSignal) { priority = 2; priorityLabel = "二级·代词指代"; }
    else if (connectorSignal) { priorityLabel = "三级·逻辑关系"; }
    if (exam.analysis?.[number]?.level) {
      priority = exam.analysis[number].level === "第一级" ? 1 : 2;
      priorityLabel = `${exam.analysis[number].level}·导入解析`;
    }
    return { ...context, headingSignal, answerOption, optionText, overlap, asksQuestion, pronounSignal, connectorSignal, priority, priorityLabel };
  }

  const EXAM_ONE_GUIDANCE = {
    1: {
      level: "第三级·首段过渡与总领",
      observe: "第1空位于首段末尾。前文先问是否担心升入高中，随后用“you needn’t worry”安慰读者；后文连续展开多条具体建议。",
      clue: "首段末尾缺少一句承上启下的话：既要接住“不必担心”，又要能总领后面的建议。",
      plain: "要找的不是祝愿句，也不是某一条具体建议，而是能开启下文的“这里有一些建议”式总领句。",
      prompt: "哪一个选项既承接“你不必担心”，又能自然引出后面多条建议？",
      highlightTerms: ["you needn’t worry"],
      evidenceCandidates: ["you needn’t worry", "You’re not alone.", "All changes."], evidenceAnswer: "you needn’t worry",
      meaningPrompt: "首段末尾接下来需要什么功能的句子？", meaningOptions: ["引出后文多条建议", "直接结束全文并祝福", "只补充一位求助对象"], meaningAnswer: "引出后文多条建议",
      targets: ["能引出后文多条建议的总领句", "只表达美好祝愿的结束句", "只介绍某一种求助对象的细节句"],
      exclude: "E只谈向哥哥姐姐求助，范围太窄；G是结尾祝愿，放在首段末尾不能引出下文。",
    },
    2: {
      level: "第一级·代词指代",
      observe: "第2空后第一句出现复数代词“They”，并说“他们和你一样紧张”；空前还有“You’re not alone.”。",
      clue: "看到They要立刻向前寻找复数的人群。这个人群必须能与“你不是一个人”和“和你一样紧张”同时对应。",
      plain: "要找的是“一群与你处境相同的人”。选项中的“everybody else in your grade”正好能被They指代，“in the same boat”也呼应“一样紧张”。",
      prompt: "原文中的They指代谁？请从全部选项中找出能提供这个复数人群、并说明他们与你处境相同的一项。",
      highlightTerms: ["They may not realize it", "they’re just as nervous as you are"],
      evidenceCandidates: ["They may not realize it", "You’re not alone.", "All changes."], evidenceAnswer: "They may not realize it",
      meaningPrompt: "They对前面的内容提出了什么要求？", meaningOptions: ["前面必须出现可被指代的复数人物", "前面必须出现一个地点", "前面必须出现一件物品"], meaningAnswer: "前面必须出现可被指代的复数人物",
      targets: ["能提供They所指复数人群，并呼应“处境相同”的句子", "只出现单数人物、无法被They指代的句子", "介绍上课地点变化的句子"],
      exclude: "判断重点不是看到某个人能帮助你，而是先解决They到底指谁；单数对象和无关事物都不能承接。",
    },
    3: {
      level: "第一级·小标题格式",
      observe: "第3空独占一行，位于新段开头；它与后面的“All changes.”和“Pay attention to other points.”在形式上完全对齐。",
      clue: "浏览本段：ask for help、Teachers are probably the best people、ask older students for help。整段反复围绕“寻找帮助”展开。",
      plain: "小标题必须概括整段。只有“老师和同学愿意提供帮助”同时覆盖Teachers和older students，也能总括多次出现的help。",
      prompt: "哪一个选项能像小标题一样，同时概括Teachers、older students和反复出现的help？",
      highlightTerms: ["ask for help", "Teachers are probably the best people", "ask older students for help"],
      evidenceCandidates: ["ask for help", "All changes.", "Pay attention to other points."], evidenceAnswer: "ask for help",
      meaningPrompt: "本段反复出现help，说明小标题应概括什么？", meaningOptions: ["谁能为新生提供帮助", "高中课程在哪些教室", "如何保持自然表现"], meaningAnswer: "谁能为新生提供帮助",
      targets: ["能概括老师、同学和“寻求帮助”这一整段中心的句子", "只说明上课教室发生变化的句子", "只表达顺利度过高中生活的祝愿句"],
      exclude: "B属于下文“All changes.”的教室变化；G只是祝愿，不能概括本段的求助内容。",
    },
    4: {
      level: "第二级·词汇关联与顺承",
      observe: "第4空位于“All changes.”段中。后句明确出现“which rooms your classes will be in”。",
      clue: "抓住两组对应词：lessons ↔ classes，classrooms ↔ rooms。后句是在解释为什么要看课表和教室。",
      plain: "应选择能先提出“课程会在不同教室上”的句子，后面的rooms/classes正好继续展开这个变化。",
      prompt: "哪一个选项同时包含与classes和rooms对应的概念，能够被后句继续解释？",
      highlightTerms: ["which rooms your classes will be in"],
      evidenceCandidates: ["which rooms your classes will be in", "a homework diary or a planner", "All changes."], evidenceAnswer: "which rooms your classes will be in",
      meaningPrompt: "rooms和classes提示前面应先说明哪种变化？", meaningOptions: ["课程会在不同教室进行", "老师会帮助新生", "同学们都很紧张"], meaningAnswer: "课程会在不同教室进行",
      targets: ["同时含“课程”和“教室”概念、能被后句继续说明的句子", "谈自然表现和人际关系的句子", "谈老师与同学提供帮助的句子"],
      exclude: "其他选项即使主题与校园有关，也没有rooms/classes这组直接的词汇接口。",
    },
    5: {
      level: "第二级·同义替换与解释",
      observe: "第5空夹在祈使句“Be yourself!”与结果句“Then you can get on with others more easily.”之间。",
      clue: "Be yourself的日常同义表达是act naturally；前句要求自然做自己，后句说明这样做带来更好的人际关系。",
      plain: "要找一条既解释“做自己”，又能引出“更容易与人相处”的句子。know you better与get on with others形成自然顺承。",
      prompt: "哪一个选项能够换句话解释Be yourself，并自然导向“更容易与人相处”的结果？",
      highlightTerms: ["Be yourself", "get on with others more easily"],
      evidenceCandidates: ["Be yourself", "All changes.", "Pay attention to other points."], evidenceAnswer: "Be yourself",
      meaningPrompt: "Be yourself需要寻找哪种解释？", meaningOptions: ["自然表现、不刻意伪装", "更换不同上课教室", "向高年级学生求助"], meaningAnswer: "自然表现、不刻意伪装",
      targets: ["用“自然表现”解释Be yourself，并连接人际关系结果的句子", "介绍课表和不同教室的句子", "只谈大家同样紧张的句子"],
      exclude: "判断核心是同义替换：act naturally解释Be yourself；其他选项无法同时接住前句和后句。",
    },
  };

  // 15篇真题的教师版突破卡：保留“先易后难”的优先级、证据链和排除理由，逐空呈现。
  const EXAM_ANALYSIS_DATA = {
    1: { 1:["第三级","首段过渡总领","首段末尾 → 引出后续 tips → D"],2:["第一级","代词指代突破","They → 复数人物 → everybody else in your grade → F"],3:["第一级","小标题格式突破","独立成行 → help / teachers / older students → A"],4:["第二级","词汇关联突破","lessons / classrooms → classes / rooms → B"],5:["第二级","同义复现突破","Be yourself → act naturally → 更容易与人相处 → C"] },
    2: { 1:["第二级","举例解释突破","Make time → morning / before bed → F"],2:["第二级","代词指代突破","this habit / their → go to bed with a book → D"],3:["第一级","场景词汇复现","audiobook → headphones / listen → C"],4:["第一级","小标题格式突破","独立成行 → Book clubs → A"],5:["第二级","代词指代突破","It → the book club → G"] },
    3: { 1:["第二级","转折因果突破","性格不同 → 发生不快 → 如何解决 → G"],2:["第一级","原词结构复现","thanks and sorry → others vs family → E"],3:["第二级","因果逻辑突破","By talking → know caring each other → C"],4:["第二级","语义呼应突破","Share housework → Helping around house → F"],5:["第一级","小标题格式突破","独立成行 → Spend time together → A"] },
    4: { 1:["第一级","转折对比突破","piece of cake → However, very difficult → E"],2:["第一级","原词数字复现","12-hour book-making model → Over a 12-hour → D"],3:["第二级","递进说明突破","books at home → home library advantage → G"],4:["第二级","内容呼应突破","South African stories → see in stories → C"],5:["第二级","代词与场景匹配","make e-books → put them online → A"] },
    5: { 1:["第一级","句式结构对偶","Some lucky ones → Others → B"],2:["第二级","代词指代突破","sound of them → listening to waves → F"],3:["第一级","段落主旨突破","mental health → physical health → C"],4:["第二级","上下文场景突破","walks on beach → walking on sand → G"],5:["第二级","尾段情感升华","feel great at end → look forward to next → E"] },
    6: { 1:["第一级","句式结构对应","half → the other half must be doing → C"],2:["第二级","问答衔接突破","what happens if → Scientists will tell you → B"],3:["第二级","同义解释突破","In other words → knowing is not enough → G"],4:["第二级","词汇呼应突破","break down goals → taking small steps → E"],5:["第一级","步骤逻辑突破","First → Next → Finally → D"] },
    7: { 1:["第二级","因果逻辑突破","Laughter is good → So when stressed → D"],2:["第一级","原词语义复现","make a fool → do silly things → B"],3:["第一级","祈使句格式突破","列表对齐 → Hold a talent show at school → F"],4:["第二级","场景逻辑呼应","dressed in red → don't wear red → A"],5:["第二级","举例承接突破","travelled to other countries → In New Zealand → E"] },
    8: { 1:["第一级","首段设问突破","全文问题 → What can we do → D"],2:["第二级","逻辑递进突破","know what to do → deal with problems better → F"],3:["第二级","语义场景呼应","go around more → outdoor activities → B"],4:["第一级","小标题格式突破","独立成行 → friend 主题 → A"],5:["第二级","递进举例突破","Everybody fails → greatest person failed → C"] },
    9: { 1:["第一级","转折引出突破","keep warm → However, may not know well → B"],2:["第一级","时间地域复现","Asia / 1st century BC → Europe / 11th century → D"],3:["第二级","主题词总领突破","women in American history → women made quilts → G"],4:["第二级","原词线索复现","helping slaves → slaves put information → E"],5:["第二级","时间演变顺序","In the beginning → Later, added pictures → F"] },
    10: { 1:["第一级","首段设问突破","printing press important → But why → B"],2:["第一级","因果逻辑突破","copying expensive → As a result, few owned books → F"],3:["第二级","句式结构匹配","such a great influence → that → D"],4:["第二级","时间对比突破","After 1450 → quickly and cheaply → G"],5:["第二级","代词指代突破","become readers → These billions of readers → E"] },
    11: { 1:["第二级","代词指代突破","your mother → she thinks → E"],2:["第一级","原词线索复现","calcium / vitamins → Calcium / Vitamins → B"],3:["第二级","递进功能呼应","Besides / good sleep → trouble getting to sleep → F"],4:["第一级","转折逻辑突破","milk benefits → However, health problems → G"],5:["第二级","尾段总结提问","pros and cons → So should we still drink milk → A"] },
    12: { 1:["第二级","习惯好处说明","list subjects → ensure success → D"],2:["第一级","段首主旨突破","Where you study → quiet place / room → C"],3:["第二级","场景地点对比","table works well → do not study on bed → G"],4:["第一级","句式结构对比","Some people → and others → B"],5:["第二级","饮食主题补充","brain foods / sugar → drink plenty of water → E"] },
    13: { 1:["第二级","全局观点纠正","not true → communication problem for all ages → G"],2:["第一级","原词情绪复现","angry → if you are angry → B"],3:["第二级","和解背景引出","Try compromise → disagree on something → C"],4:["第一级","原词线索复现","show respect → Showing respect → A"],5:["第二级","原词线索复现","values → Understanding your values → F"] },
    14: { 1:["第一级","设问过渡突破","schoolbag in life → thought about history → B"],2:["第二级","历史物件评价","bamboo boxes → earliest schoolbags → G"],3:["第一级","时间线与名称复现","Hundreds of years later → called budai → D"],4:["第二级","代词指代突破","grandparents / parents → They can tell you → F"],5:["第二级","现代款式举例","wheeled bags / backpacks → C"] },
    15: { 1:["第一级","转折对比突破","reading / listening → however, few pay attention → F"],2:["第一级","名言解释突破","Actions speak louder → communicate without a word → D"],3:["第二级","动作举例说明","no eye contact → turn away / raise shoulders → B"],4:["第二级","场景过渡突破","job interviews → personal lives → E"],5:["第二级","尾段总结结论","important to learn → less misunderstood → A"] },
  };

  function chainHighlightTerms(chain, profile) {
    const nearby = `${profile.before} ${profile.after}`;
    const fragments = String(chain || "").split(/→|↔|➔|\//).map((item) => item.trim()).filter((item) => item.length > 2 && !/^[A-G]$/.test(item));
    const matches = [];
    fragments.forEach((fragment) => {
      const exact = nearby.match(new RegExp(escapeRegExp(fragment), "i"))?.[0];
      if (exact && exact.length <= 70 && !matches.some((item) => item.toLowerCase().includes(exact.toLowerCase()) || exact.toLowerCase().includes(item.toLowerCase()))) matches.push(exact);
    });
    return matches.slice(0, 3).length ? matches.slice(0, 3) : conciseFallbackEvidence(profile);
  }

  function shortExactPhrase(text, maxLength = 72) {
    const clean = String(text || "").replace(/\[\[\d+\]\]/g, "").replace(/\s+/g, " ").trim();
    if (clean.length <= maxLength) return clean;
    const cut = clean.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    return lastSpace > 28 ? cut.slice(0, lastSpace) : cut;
  }

  function evidenceCandidatesFor(exam, profile, highlightTerms) {
    const passageText = exam.passage.join("\n");
    const exactTerms = highlightTerms.filter((term) => new RegExp(escapeRegExp(term), "i").test(passageText));
    const answer = exactTerms[0] || shortExactPhrase(profile.after || profile.before);
    const pool = exam.passage
      .filter((_paragraph, index) => index !== profile.paragraphIndex)
      .flatMap((paragraph) => paragraph.split(/\[\[\d+\]\]/g))
      .map((part) => shortExactPhrase(part, 58))
      .filter((item) => item.length >= 8 && item.toLowerCase() !== answer.toLowerCase());
    return { answer, candidates: [answer, ...pool.filter((item, index, array) => array.indexOf(item) === index).slice(0, 2)] };
  }

  function validationChecksFor(exam, number, profile, guidance, highlightTerms) {
    const position = POSITION_LABELS[examPositionKey(profile)];
    const evidence = highlightTerms.slice(0, 2).join(" / ") || profile.after || profile.before;
    const method = guidance?.method || examQuestionFeature(profile);
    return [
      { key: "position", label: `位置成立：第 ${number} 空是“${position}”，候选句能承担这个位置的作用` },
      { key: "evidence", label: `证据闭合：候选句能回应原文“${evidence}”` },
      { key: "logic", label: `逻辑通顺：按“${method}”代入后，空前—选项—空后衔接自然` },
    ];
  }

  function meaningTaskFor(method, profile, terms) {
    const evidence = terms.slice(0, 2).join(" / ") || "所选证据";
    if (/代词|指代/.test(method)) {
      const plural = /\b(they|them|their|these|those)\b/i.test(`${profile.after} ${profile.optionText}`);
      return plural
        ? { prompt: `“${evidence}”中的代词要求前文提供什么？`, options: ["可被指代的复数人物或事物", "一个无关地点", "一个没有先行词的单数物品"], answer: "可被指代的复数人物或事物" }
        : { prompt: `“${evidence}”中的代词要求前文提供什么？`, options: ["明确的单数先行对象", "多个无关人物", "新的段落标题"], answer: "明确的单数先行对象" };
    }
    if (/小标题|段落主旨|总领|概括/.test(method)) return { prompt: `“${evidence}”对段落中心有什么提示？`, options: ["小标题要概括整段中心", "只复述一个局部细节", "改写成无关祝愿"], answer: "小标题要概括整段中心" };
    if (/问答|设问|疑问/.test(method)) return { prompt: `“${evidence}”构成问答信号，选项需要做什么？`, options: ["直接回答或承接问题", "重复问题但不回答", "转入无关话题"], answer: "直接回答或承接问题" };
    if (/转折|对比/.test(method)) return { prompt: `“${evidence}”体现了什么筛选要求？`, options: ["保持前后转折或对比方向", "只匹配句子长度", "忽略前后逻辑"], answer: "保持前后转折或对比方向" };
    if (/因果/.test(method)) return { prompt: `“${evidence}”属于因果链的一端，选项需要做什么？`, options: ["补齐对应原因或结果", "重复无关背景", "改变全文主题"], answer: "补齐对应原因或结果" };
    if (/同义|复现|原词|词汇|对应|呼应/.test(method)) return { prompt: `“${evidence}”应该怎样帮助筛选选项？`, options: ["寻找原词、同义词或相关概念复现", "只找字数相同的句子", "只看选项语气"], answer: "寻找原词、同义词或相关概念复现" };
    return { prompt: `“${evidence}”与空格前后形成什么要求？`, options: ["同时接住前句并引出后句", "只与全文主题大致相关", "只和前句出现一个相同词"], answer: "同时接住前句并引出后句" };
  }

  function detailedExamGuidance(exam, number, profile = examQuestionProfile(exam, number)) {
    if (exam.id === 1 && EXAM_ONE_GUIDANCE[number]) {
      const manual = EXAM_ONE_GUIDANCE[number];
      return {
        ...manual,
        validationChecks: validationChecksFor(exam, number, profile, { method: breakthroughMethod(exam, number, profile) }, manual.highlightTerms),
      };
    }
    const evidence = [profile.before, profile.after].filter(Boolean).join(" / ");
    const feature = examQuestionFeature(profile);
    const relation = profile.overlap.length
      ? `正确句与上下文复现了“${profile.overlap.slice(0, 3).join("、")}”等核心词。`
      : profile.pronounSignal
        ? "重点核对代词的单复数、所指对象以及前后是否出现明确先行词。"
        : "重点核对答案是否同时完成前后句要求的语意与逻辑连接。";
    const custom = EXAM_ANALYSIS_DATA[exam.id]?.[number];
    const imported = exam.analysis?.[number];
    const guidance = imported || (custom ? { method: custom[1], chain: custom[2], highlightTerms: chainHighlightTerms(custom[2], profile) } : null);
    const proposedTerms = guidance?.highlightTerms?.length ? guidance.highlightTerms : conciseFallbackEvidence(profile);
    const passageText = exam.passage.join("\n");
    const exactTerms = proposedTerms.filter((term) => new RegExp(escapeRegExp(term), "i").test(passageText));
    const highlightTerms = exactTerms.length ? exactTerms : conciseFallbackEvidence(profile);
    const evidenceTask = evidenceCandidatesFor(exam, profile, highlightTerms);
    const meaningTask = meaningTaskFor(guidance?.method || feature, profile, highlightTerms);
    return {
      level: profile.priorityLabel,
      observe: imported?.observe || `${examPositionText(profile)} 当前空前后内容是：“${evidence}”。`,
      clue: imported?.clue || relation,
      plain: imported?.plain || `不要只看主题相近，要寻找能同时满足位置功能、上下文证据和“${feature}”特征的句子。`,
      prompt: evidenceSelectionQuestion(guidance, feature),
      evidenceQuestion: evidenceThinkingQuestion(guidance, profile),
      highlightTerms,
      evidenceCandidates: evidenceTask.candidates,
      evidenceAnswer: evidenceTask.answer,
      meaningPrompt: meaningTask.prompt,
      meaningOptions: meaningTask.options,
      meaningAnswer: meaningTask.answer,
      validationChecks: validationChecksFor(exam, number, profile, guidance, highlightTerms),
      targets: [`同时满足位置功能和“${feature}”证据的句子`, "只与全文大主题有关、但接不上当前前后句的句子", "局部有相似词、但指代或逻辑方向不成立的句子"],
      exclude: imported?.exclude || "干扰项通常只做到“主题相关”，却无法同时闭合设空位置、指代对象和前后逻辑。",
      analysisLevel: custom?.[0],
      analysisMethod: custom?.[1],
      analysisChain: custom?.[2],
    };
  }

  function conciseFallbackEvidence(profile) {
    const source = profile.after || profile.before || "";
    const words = source.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return [profile.after ? words.slice(0, 9).join(" ") : words.slice(-9).join(" ")];
  }

  function evidenceThinkingQuestion(imported, profile) {
    const method = imported?.method || examQuestionFeature(profile);
    const terms = imported?.highlightTerms?.filter(Boolean) || [];
    const clueLabel = terms.length ? `高亮的“${terms.join(" / ")}”` : "高亮证据";
    if (/代词|指代/.test(method)) {
      const containsPronoun = terms.some((term) => /\b(they|them|their|this|these|those|it|he|she|his|her)\b/i.test(term));
      return containsPronoun
        ? `${clueLabel}指向谁？先判断代词的单复数，再回到上下文寻找明确的先行词。`
        : `${clueLabel}是单数还是复数、指人还是指物？哪个选项中的代词能准确承接这些先行词？`;
    }
    if (/小标题|段落主旨|总领|概括/.test(method)) return `${clueLabel}共同围绕什么中心？哪一项能概括整段，而不是只复述一个细节？`;
    if (/问答|设问|疑问|解答/.test(method)) return `${clueLabel}提出了什么问题？哪一项能直接回答或承接这个问题？`;
    if (/转折|对比/.test(method)) return `${clueLabel}显示前后语义发生了怎样的转向？哪一项能与转折后的内容形成对照？`;
    if (/因果/.test(method)) return `${clueLabel}属于原因还是结果？哪一项能补齐证据链的另一端？`;
    if (/同义|复现|原词|词汇|对应/.test(method)) return `${clueLabel}与选项中的哪些词形成原词、同义词或上下义词复现？`;
    if (/举例|例证/.test(method)) return `${clueLabel}是在举例说明哪个上位观点？先概括例子，再筛选选项。`;
    return `${clueLabel}与空格前后的关系是什么？先用自己的话说出缺失句的作用，再看选项。`;
  }

  function evidenceSelectionQuestion(imported, feature) {
    const method = imported?.method || feature;
    const terms = imported?.highlightTerms?.filter(Boolean) || [];
    const clueLabel = terms.length ? `“${terms.join(" / ")}”` : `“${feature}”证据`;
    return `请从剩余选项中找出能通过“${method}”与原文${clueLabel}形成完整证据链的一项。`;
  }

  const SIMULATION_DOCUMENT_ORDER = {
    1: [3, 2, 5, 4, 1],
    2: [4, 3, 5, 1, 2],
    3: [5, 2, 1, 3, 4],
    4: [1, 2, 3, 4, 5],
    5: [1, 3, 2, 4, 5],
    6: [1, 5, 2, 3, 4],
    7: [3, 2, 1, 4, 5],
    8: [4, 1, 2, 3, 5],
    9: [1, 2, 3, 4, 5],
    10: [1, 2, 3, 4, 5],
    11: [2, 4, 1, 3, 5],
    12: [4, 2, 1, 3, 5],
    13: [2, 4, 1, 3, 5],
    14: [1, 3, 2, 4, 5],
    15: [1, 2, 3, 4, 5],
  };

  function recommendedExamOrder(exam) {
    const documentedOrder = window.SEVEN_CHOICE_VERIFIED_GUIDANCE?.[exam.id]?.order || SIMULATION_DOCUMENT_ORDER[exam.id];
    if (Array.isArray(documentedOrder) && documentedOrder.length === examQuestionNumbers(exam).length) return [...documentedOrder];
    return examQuestionNumbers(exam).sort((a, b) => {
      const levelDifference = examQuestionProfile(exam, a).priority - examQuestionProfile(exam, b).priority;
      return levelDifference || a - b;
    });
  }

  function examPositionText(profile) {
    if (profile.headingSignal) return "空格承担段落小标题功能，应概括下方整段内容，并与相邻小标题的格式和层级保持一致。";
    if (profile.atStart) return "空格位于段首或句首，要重点判断它是否负责引出本段主题、承接上一段或开启新的说明。";
    if (profile.atEnd) return "空格位于段尾，要同时收住前文并为下一段或下一句留下自然接口。";
    return "空格位于段中，是承上启下的位置；答案既要接住前句，又要能自然引出后句。";
  }

  function examLogicText(profile, answerLetter) {
    const reasons = [];
    if (profile.headingSignal) reasons.push("它在形式和内容上符合段落小标题的要求");
    if (profile.asksQuestion) reasons.push("它与上下文的提问形成直接问答");
    if (profile.pronounSignal) reasons.push("其中的单复数与代词指向能够前后对应");
    if (profile.connectorSignal) reasons.push("句首连接词明确标出了句间逻辑方向");
    if (profile.overlap.length) reasons.push(`与上下文复现了 ${profile.overlap.slice(0, 3).join("、")} 等关键词`);
    if (!reasons.length) reasons.push("它与前后句在主题、语义方向和情感态度上保持一致");
    return `${answerLetter} 项最合适：${reasons.join("；")}。其他选项至少在位置功能、指代对象或逻辑方向上有一项无法闭合。`;
  }

  function examAnalysisSteps(exam, number) {
    const profile = examQuestionProfile(exam, number);
    return [
      { title: "浏览全局", text: `全文围绕“${exam.title}”展开。先把握主线，再判断第 ${number} 空需要补充哪一层信息。` },
      { title: "观察设空位置", text: examPositionText(profile) },
      { title: "锁定显性信号", text: `重点对照空前“${profile.before || "无直接前句"}”与空后“${profile.after || "无直接后句"}”。原文中的对应位置已同步高亮。` },
      { title: "推导逻辑与态度", text: examLogicText(profile, exam.answers[number]) },
      { title: "代入通读复查", text: `${profile.answerOption} 代入后，空前、答案和空后构成完整语意链，指代、逻辑和语气均通顺。` },
    ];
  }

  const POSITION_LABELS = {
    heading: "标题 / 小标题",
    start: "段首 / 句首",
    middle: "段中 / 桥梁",
    end: "段尾 / 收束",
  };

  function examPositionKey(profile) {
    if (profile.headingSignal) return "heading";
    if (profile.atStart) return "start";
    if (profile.atEnd) return "end";
    return "middle";
  }

  function examQuestionFeature(profile) {
    if (profile.headingSignal) return "小标题格式";
    if (profile.overlap.length >= 2) return "词汇复现";
    if (profile.asksQuestion) return "问答信号";
    if (profile.pronounSignal) return "代词指代";
    if (profile.connectorSignal) return "逻辑词";
    return "综合语义";
  }

  function breakthroughMethod(exam, number, profile) {
    if (exam.id === 1) {
      return ({ 1: "首段过渡总领", 2: "代词指代突破", 3: "小标题格式突破", 4: "词汇关联突破", 5: "同义复现突破" })[number] || examQuestionFeature(profile);
    }
    const imported = exam.analysis?.[number];
    if (imported) return imported.method;
    const custom = EXAM_ANALYSIS_DATA[exam.id]?.[number];
    if (custom) return custom[1];
    return `${examQuestionFeature(profile)}突破`;
  }

  function breakthroughLevel(exam, number, profile) {
    if (exam.id === 1) return ({ 1: "第三级突破", 2: "第一级突破", 3: "第一级突破", 4: "第二级突破", 5: "第二级突破" })[number] || "综合突破";
    if (exam.analysis?.[number]?.level) return `${exam.analysis[number].level}突破`;
    return EXAM_ANALYSIS_DATA[exam.id]?.[number]?.[0] ? `${EXAM_ANALYSIS_DATA[exam.id][number][0]}突破` : "综合突破";
  }

  function breakthroughChain(exam, number, profile) {
    if (exam.id === 1) {
      return ({
        1: "首段末尾 → 引出后续 tips → D",
        2: "They → 复数人物 → everybody else in your grade → F",
        3: "独立成行 → help / teachers / older students → A",
        4: "rooms / classes → different classrooms → B",
        5: "Be yourself → act naturally → 更容易与人相处 → C",
      })[number] || "位置 → 上下文线索 → 正确选项";
    }
    const imported = exam.analysis?.[number];
    if (imported) return `${imported.chain} → ${exam.answers[number]}`;
    const custom = EXAM_ANALYSIS_DATA[exam.id]?.[number];
    if (custom) return custom[2];
    const links = profile.overlap.slice(0, 2).join(" / ") || examQuestionFeature(profile);
    return `${examPositionText(profile).replace(/[。；].*$/, "")} → ${links} → ${exam.answers[number]}`;
  }

  function compactBreakthroughCard(exam, number, profile, detail) {
    return `<section class="breakthrough-card" aria-label="第${number}空突破卡"><h4>第${number}空 · ${escapeHtml(breakthroughLevel(exam, number, profile))}</h4><p><strong>核心方法：</strong>${escapeHtml(breakthroughMethod(exam, number, profile))}</p><p><strong>证据链：</strong>${escapeHtml(breakthroughChain(exam, number, profile))}</p><p><strong>正确选项：</strong>${escapeHtml(profile.answerOption)}</p><p><strong>干扰项排除：</strong>${escapeHtml(detail.exclude)}</p></section>`;
  }

  function examFinalSummaryMarkup(exam) {
    const order = recommendedExamOrder(exam);
    const rows = examQuestionNumbers(exam).map((number) => {
      const profile = examQuestionProfile(exam, number);
      const detail = detailedExamGuidance(exam, number, profile);
      return `<button class="summary-row ${state.examFocusQuestion === number ? "current" : ""}" type="button" data-review-question="${number}" aria-label="查看第${number}空证据"><b>第${number}空</b><small>${escapeHtml(breakthroughMethod(exam, number, profile))}</small><span>${escapeHtml(breakthroughChain(exam, number, profile))}</span><strong>${escapeHtml(exam.answers[number])}</strong></button>`;
    }).join("");
    const distractors = exam.id === 1 ? "E：提到哥哥姐姐，范围与原文求助对象不完全匹配；G：纯祝愿语，无法承担段落衔接功能。" : "本篇干扰项已在各空突破卡中标注。";
    return `<section class="exam-final-summary" aria-label="绝杀总结与最终答案表"><h3>绝杀总结与最终答案表</h3><p class="summary-order">推荐突破顺序：${order.join(" → ")} · 点击任意一行，左侧原文将跳转并高亮证据。</p><div class="summary-table">${rows}</div><p class="summary-distractors"><strong>干扰项总览：</strong>${escapeHtml(distractors)}</p></section>`;
  }

  function focusExamQuestion(number) {
    state.examFocusQuestion = Number(number);
    renderExam(state.activeExam, true);
    requestAnimationFrame(() => {
      const target = [...document.querySelectorAll(".exam-blank")].find((item) => item.getAttribute("aria-label")?.startsWith(`第${number}空`));
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function examThemeOptions(exam) {
    const distractorA = exams[(exam.id + 4) % exams.length].title;
    const distractorB = exams[(exam.id + 9) % exams.length].title;
    const options = [exam.title, distractorA, distractorB];
    const shift = exam.id % 3;
    return [...options.slice(shift), ...options.slice(0, shift)];
  }

  function examGlobalEvidence(exam) {
    const first = cleanContextSnippet(exam.passage[0], false).replace(/\[\[\d+\]\]/g, "").trim();
    const last = cleanContextSnippet(exam.passage[exam.passage.length - 1], true).replace(/\[\[\d+\]\]/g, "").trim();
    return [first, last].filter((item, index, array) => item.length >= 8 && array.indexOf(item) === index);
  }

  const RADAR_PRONOUNS = new Set("they them it he she this these those".split(" "));
  const RADAR_LOGIC_PHRASES = ["as a result", "for example", "however", "besides", "but", "so"];
  const RADAR_QUESTION_WORDS = new Set("why what how who where when which".split(" "));
  const RADAR_IMPERATIVE_VERBS = new Set("ask avoid be bring carry choose come develop do eat enjoy examine find follow get give go join keep learn listen look make pay pick practice protect read relax remember share smile speak spend stay stop take talk think try turn use watch wear write".split(" "));
  const RADAR_GENERIC_CONTENT_WORDS = new Set("different first here important nice people ready really same senior something things very".split(" "));
  const RADAR_SHORT_CORE_WORDS = new Set("act ask bed book club help join read room sleep tips write".split(" "));

  function optionRadarTerms(exam, option) {
    const text = String(option).replace(/^[A-G]\.\s*/, "");
    const words = [...text.matchAll(/[A-Za-z][A-Za-z'-]*/g)].map((match) => ({ raw: match[0], lower: match[0].toLowerCase(), index: match.index }));
    const terms = [];
    const add = (term) => { if (term && !terms.some((item) => item.toLowerCase() === term.toLowerCase())) terms.push(term); };
    for (const phrase of RADAR_LOGIC_PHRASES) {
      const match = text.match(new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "i"));
      if (match) add(match[0]);
    }
    words.filter((word) => RADAR_PRONOUNS.has(word.lower)).forEach((word) => add(word.raw));
    const first = words[0];
    if (first && RADAR_IMPERATIVE_VERBS.has(first.lower)) add(first.raw);
    if (first && text.trim().endsWith("?") && RADAR_QUESTION_WORDS.has(first.lower)) add(first.raw);

    const optionWordFrequency = new Map();
    exam.options.forEach((item) => {
      const unique = new Set(meaningfulWords(item.replace(/^[A-G]\.\s*/, "")));
      unique.forEach((word) => optionWordFrequency.set(word, (optionWordFrequency.get(word) || 0) + 1));
    });
    words
      .filter((word) => (word.lower.length >= 4 || RADAR_SHORT_CORE_WORDS.has(word.lower))
        && !EXAM_STOP_WORDS.has(word.lower)
        && !RADAR_GENERIC_CONTENT_WORDS.has(word.lower)
        && !RADAR_PRONOUNS.has(word.lower)
        && !terms.some((term) => term.toLowerCase().includes(word.lower)))
      .sort((a, b) => ((optionWordFrequency.get(a.lower) || 9) - (optionWordFrequency.get(b.lower) || 9)) || b.lower.length - a.lower.length || a.index - b.index)
      .slice(0, 2)
      .forEach((word) => add(word.raw));
    return terms;
  }

  function keywordMarkedText(value, pickedTerms, standardTerms, revealed) {
    const terms = [...new Set([...(pickedTerms || []), ...(revealed ? standardTerms : [])].filter(Boolean))].sort((a, b) => b.length - a.length);
    if (!terms.length) return escapeHtml(value);
    const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join("|")})\\b`, "gi");
    return String(value).split(pattern).map((part, index) => {
      if (index % 2 === 0) return escapeHtml(part);
      const standard = revealed && standardTerms.some((term) => term.toLowerCase() === part.toLowerCase());
      return `<mark class="${standard ? "radar-keyword-correct" : "radar-keyword-picked"}">${escapeHtml(part)}</mark>`;
    }).join("");
  }

  function carriedRadarText(value, standardTerms) {
    const terms = [...new Set((standardTerms || []).filter(Boolean))].sort((a, b) => b.length - a.length);
    if (!terms.length) return escapeHtml(value);
    const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join("|")})\\b`, "gi");
    return String(value).split(pattern).map((part, index) => index % 2
      ? `<mark class="radar-keyword-carry">${escapeHtml(part)}</mark>`
      : escapeHtml(part)).join("");
  }

  function resetExamGuide(examId) {
    state.examGuideStep = 1;
    state.examThemeChoices[examId] = "";
    state.examKeywordPicks[examId] = {};
    state.examKeywordRevealed[examId] = false;
    state.examPositionChoices[examId] = {};
    state.examPriorityPicks[examId] = [];
    state.examSolveOrders[examId] = [];
    state.examSolveIndexes[examId] = 0;
    state.examSelections[examId] = {};
    state.examAttempts[examId] = {};
    state.examSolved[examId] = {};
    state.examAdaptiveGuides[examId] = {};
    state.examFocusQuestion = null;
    state.examMessage = "";
  }

  function guideProgressMarkup() {
    const labels = ["浏览全局", "圈画选项", "观察设空", "选择顺序", "逐空作答"];
    return `<ol class="guide-progress">${labels.map((label, index) => `<li class="${state.examGuideStep === index + 1 ? "active" : state.examGuideStep > index + 1 ? "done" : ""}"><b>${index + 1}</b><span>${label}</span></li>`).join("")}</ol>`;
  }

  function guideStepOne(exam) {
    const selected = state.examThemeChoices[exam.id] || "";
    const correct = selected === exam.title;
    return `<div class="guide-step"><p class="guide-kicker">第一步</p><h3>浏览全局，把握主题</h3><p>先快速浏览首段、末段和反复出现的核心词，再选择全文主线。左侧已高亮全局线索。</p>
      <div class="theme-choices">${examThemeOptions(exam).map((title) => `<button class="guide-choice ${selected === title ? title === exam.title ? "correct" : "wrong" : ""}" type="button" data-exam-theme="${escapeHtml(title)}">${escapeHtml(title)}</button>`).join("")}</div>
      ${selected ? `<p class="guide-feedback ${correct ? "correct" : "wrong"}" role="status">${correct ? "主题判断正确。现在带着主线观察每个空的位置。" : "这个主题不能覆盖全文，请重新对照首尾段。"}</p>` : ""}
      ${correct ? `<button class="reveal-next" type="button" data-action="exam-guide-next">进入第二步：圈画选项关键词</button>` : ""}</div>`;
  }

  function guideStepKeywords(exam) {
    const picks = state.examKeywordPicks[exam.id] || {};
    const revealed = Boolean(state.examKeywordRevealed[exam.id]);
    const pickCount = Object.values(picks).reduce((total, items) => total + items.length, 0);
    const optionRows = exam.options.map((option) => {
      const letter = optionLetter(option);
      const text = option.replace(/^[A-G]\.\s*/, "");
      const standardTerms = optionRadarTerms(exam, option);
      return `<div class="keyword-option ${revealed ? "revealed" : ""}" data-keyword-option="${letter}"><strong>${letter}.</strong><span class="keyword-option-text">${keywordMarkedText(text, picks[letter] || [], standardTerms, revealed)}</span></div>`;
    }).join("");
    return `<div class="guide-step keyword-guide-step"><p class="guide-kicker">第二步</p><h3>圈画选项关键词</h3><p>不要整句画线。先在每个选项中双击你认为重要的词，再查看标准圈画。</p>
      <div class="radar-rules"><strong>只圈三类“雷达词”</strong><ol><li><b>① 指代词、逻辑词 🌟🌟🌟</b><span>they / it / this；however / but / so / for example</span></li><li><b>② 特殊句式、格式词 🌟🌟</b><span>祈使句句首动词；Why / How 等疑问词</span></li><li><b>③ 核心主题实词 🌟🌟</b><span>独特名词、动词，用来寻找原词或同义复现</span></li></ol></div>
      <div class="keyword-options" aria-label="双击圈画选项关键词">${optionRows}</div>
      <p class="keyword-pick-status">${revealed ? "紫色为标准雷达词；橙色保留你的其他圈画，便于对照。" : `已自主圈画 ${pickCount} 处 · 请直接双击选项中的词`}</p>
      <div class="guide-actions"><button class="text-action" type="button" data-action="exam-guide-back">返回第一步</button>${revealed ? `<button class="reveal-next" type="button" data-action="exam-guide-next">进入第三步：观察设空位置</button>` : pickCount ? `<button class="reveal-next" type="button" data-action="exam-keywords-reveal">显示标准圈画</button>` : ""}</div></div>`;
  }

  function guideStepTwo(exam) {
    const choices = state.examPositionChoices[exam.id] || {};
    const numbers = examQuestionNumbers(exam);
    const correctCount = numbers.filter((number) => choices[number] === examPositionKey(examQuestionProfile(exam, number))).length;
    return `<div class="guide-step"><p class="guide-kicker">第三步</p><h3>观察设空位置</h3><p>逐空判断它在文章中的位置。点击某一空时，左侧会同步定位该空。</p>
      <div class="position-tasks">${numbers.map((number) => { const answer = examPositionKey(examQuestionProfile(exam, number)); const selected = choices[number] || ""; return `<div class="position-task"><strong>第 ${number} 空</strong><div>${Object.entries(POSITION_LABELS).map(([key, label]) => `<button class="position-choice ${selected === key ? key === answer ? "correct" : "wrong" : ""}" type="button" data-exam-position-question="${number}" data-exam-position="${key}">${label}</button>`).join("")}</div>${selected ? `<small class="${selected === answer ? "correct" : "wrong"}">${selected === answer ? "判断正确" : "位置不匹配，可继续选择"}</small>` : ""}</div>`; }).join("")}</div>
      <p class="guide-counter">已判断正确 ${correctCount} / ${numbers.length}</p>
      <div class="guide-actions"><button class="text-action" type="button" data-action="exam-guide-back">返回第二步</button>${correctCount === numbers.length ? `<button class="reveal-next" type="button" data-action="exam-guide-next">进入第四步：选择突破口</button>` : ""}</div></div>`;
  }

  function guideStepThree(exam) {
    const picks = state.examPriorityPicks[exam.id] || [];
    const recommended = recommendedExamOrder(exam).slice(0, 2);
    return `<div class="guide-step"><p class="guide-kicker">第四步</p><h3>选择优先做的 1—2 道</h3><p>先找格式、复现、代词或问答等显性特征。按点击顺序确定你的第一、第二突破口。</p>
      <div class="priority-picks">${examQuestionNumbers(exam).map((number) => { const profile = examQuestionProfile(exam, number); const rank = picks.indexOf(number); return `<button class="priority-pick ${rank >= 0 ? "selected" : ""}" type="button" data-exam-priority-question="${number}"><b>${number}</b><span>${examQuestionFeature(profile)}</span>${rank >= 0 ? `<small>优先 ${rank + 1}</small>` : ""}</button>`; }).join("")}</div>
      ${picks.length ? `<p class="guide-feedback neutral">你的选择：${picks.join(" → ")}；解析文档建议优先观察：${recommended.join("、")}。本步用于自测判断，正式逐空作答将严格按照解析文档顺序进行。</p>` : ""}
      <div class="guide-actions"><button class="text-action" type="button" data-action="exam-guide-back">返回第三步</button>${picks.length ? `<button class="reveal-next" type="button" data-action="exam-guide-start-solving">进入第五步：逐空作答</button>` : ""}</div></div>`;
  }

  function examOptionsPanel(exam, number = null) {
    const interactive = state.examGuideStep === 5 && number;
    const selected = interactive ? state.examSelections[exam.id]?.[number] || "" : "";
    const solved = interactive && Boolean(state.examSolved[exam.id]?.[number]);
    const attempts = interactive ? state.examAttempts[exam.id]?.[number] || [] : [];
    const adaptiveGuide = interactive ? state.examAdaptiveGuides[exam.id]?.[number] : null;
    const guideLocked = adaptiveGuide && adaptiveGuide.stage < 6;
    const usedLetters = new Set(examQuestionNumbers(exam)
      .filter((question) => state.examSolved[exam.id]?.[question])
      .map((question) => exam.answers[question]));
    return `<section class="exam-guide-options" aria-label="备选句"><div class="exam-guide-options-heading"><h4>备选句 A—G</h4><span>${interactive ? `已使用 ${usedLetters.size} 项 · 浅色为雷达词` : "作答时可直接点击"}</span></div><div class="exam-option-list">${exam.options.map((option) => {
      const letter = optionLetter(option);
      const wrong = attempts.includes(letter);
      const correct = solved && letter === exam.answers[number];
      const used = usedLetters.has(letter);
      const classes = `exam-option-item ${selected === letter ? "selected" : ""} ${wrong ? "wrong" : ""} ${correct ? "correct" : ""} ${used ? "used" : ""}`;
      const optionText = option.slice(2).trim();
      const content = `<strong>${escapeHtml(option.slice(0, 2))}</strong><span>${interactive ? carriedRadarText(optionText, optionRadarTerms(exam, option)) : escapeHtml(optionText)}</span>`;
      return interactive
        ? `<button class="${classes}" type="button" data-exam-question="${number}" data-exam-choice="${letter}" ${wrong || solved || used || guideLocked ? "disabled" : ""}>${content}</button>`
        : `<div class="${classes}">${content}</div>`;
    }).join("")}</div></section>`;
  }

  function adaptiveEvidenceKey(profile) {
    if (profile.headingSignal || profile.atStart) return "after";
    if (profile.atEnd) return "before";
    return "both";
  }

  function examOneAdaptiveGuideMarkup(exam, number, profile, guide, detail) {
    const feedback = !guide.choice ? "" : guide.stage === 3
      ? `<p class="adaptive-feedback wrong" role="status">这个解释与高亮证据不完全对应，请重新判断证据表达的关系。</p>`
      : guide.stage === 4
        ? `<p class="adaptive-feedback wrong" role="status">该选项无法同时闭合位置、证据和逻辑，已为你排除。</p>`
        : `<p class="adaptive-feedback wrong" role="status">这项判断还不成立，请重新观察当前位置。</p>`;
    let body = "";
    if (guide.stage === 1) {
      body = `<strong>引导 1：判断设空功能</strong><p>先只看空格所在位置和段落结构，它最可能承担什么功能？</p><div class="adaptive-choices">${Object.entries(POSITION_LABELS).map(([key, label]) => `<button type="button" class="adaptive-choice ${guide.choice === key ? "wrong" : ""}" data-adaptive-kind="position" data-adaptive-value="${key}">${label}</button>`).join("")}</div>${feedback}`;
    } else if (guide.stage === 2) {
      body = `<strong>引导 2：亲自在原文中取证</strong><p class="adaptive-detail">请直接在左侧原文中双击你认为最关键的词或句子。原文不会预先给出候选线索；提交后系统会显示完整标准证据，并进入下一步。</p>${feedback}`;
    } else if (guide.stage === 3) {
      const evidenceCorrection = guide.evidenceMistake ? `<p class="adaptive-feedback wrong" role="status">你刚才选取了“${escapeHtml(guide.evidenceMistake)}”，它不是本空的关键证据。左侧现已显示完整标准证据，请对照高亮继续判断。</p>` : "";
      body = `<strong>引导 3：解释证据含义</strong>${evidenceCorrection}<p class="adaptive-detail">${escapeHtml(detail.meaningPrompt)}</p><div class="adaptive-choices single-column">${detail.meaningOptions.map((label) => `<button type="button" class="adaptive-choice ${guide.choice === label ? "wrong" : ""}" data-adaptive-kind="meaning" data-adaptive-value="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join("")}</div>${feedback}`;
    } else if (guide.stage === 4) {
      const eliminated = guide.eliminated || [];
      const usedLetters = new Set(examQuestionNumbers(exam).filter((question) => state.examSolved[exam.id]?.[question]).map((question) => exam.answers[question]));
      body = `<strong>引导 4：用刚才的证据筛选选项</strong><p class="adaptive-detail">${escapeHtml(detail.prompt)}</p><div class="adaptive-option-list">${exam.options.map((option) => { const letter = optionLetter(option); const wrong = eliminated.includes(letter); const used = usedLetters.has(letter); return `<button type="button" class="adaptive-option ${wrong ? "wrong" : ""} ${used ? "used" : ""}" data-adaptive-kind="guided-option" data-adaptive-value="${letter}" ${wrong || used ? "disabled" : ""}><strong>${escapeHtml(option.slice(0, 2))}</strong><span>${escapeHtml(option.slice(2).trim())}</span>${wrong ? "<small>已排除</small>" : used ? "<small>已使用</small>" : ""}</button>`; }).join("")}</div>${feedback}`;
    } else if (guide.stage === 5) {
      const candidateOption = exam.options.find((option) => optionLetter(option) === guide.candidate) || "";
      const candidateText = candidateOption.replace(/^[A-G]\.\s*/, "");
      const checked = guide.validations || [];
      const checks = detail.validationChecks || [];
      body = `<strong>引导 5：代入原文验证</strong><p class="adaptive-detail">你已筛出 ${escapeHtml(guide.candidate)} 项。请依次点击下面三项完成验证；点完第 3 项后，系统会自动锁定答案并直接显示下一空。</p><div class="substitution-preview"><span>${escapeHtml(profile.before || "（段首）")}</span><b>${escapeHtml(candidateText)}</b><span>${escapeHtml(profile.after || "（段尾）")}</span></div><div class="validation-progress"><span>验证进度 · 点完自动进入下一空</span><strong>${checked.length} / ${checks.length}</strong></div><div class="validation-checks">${checks.map((item, index) => `<button type="button" class="validation-check ${checked.includes(item.key) ? "checked" : ""}" data-adaptive-kind="validation" data-adaptive-value="${item.key}" aria-pressed="${checked.includes(item.key)}"><span class="validation-check-index" aria-hidden="true">${checked.includes(item.key) ? "✓" : String(index + 1)}</span><span class="validation-check-copy"><span>${escapeHtml(item.label)}</span><small>${checked.includes(item.key) ? "已完成" : "点击验证"}</small></span></button>`).join("")}</div>`;
    } else {
      body = `<strong>证据链完成</strong><p>你已经通过“点击原文证据—解释证据含义—筛选选项—代入验证”独立确定了答案。</p>`;
    }
    return `<section class="adaptive-guide ${guide.stage === 6 ? "complete" : ""}" aria-label="五步取证引导"><div class="adaptive-guide-title"><span>第一次错选 · 取证式引导</span><small>${Math.min(guide.stage, 5)} / 5</small></div>${body}</section>`;
  }

  function adaptiveGuideMarkup(exam, number, profile) {
    const guide = state.examAdaptiveGuides[exam.id]?.[number];
    if (!guide) return "";
    const detail = detailedExamGuidance(exam, number, profile);
    return examOneAdaptiveGuideMarkup(exam, number, profile, guide, detail);
  }

  function guideStepFour(exam) {
    const order = state.examSolveOrders[exam.id]?.length ? state.examSolveOrders[exam.id] : recommendedExamOrder(exam);
    const index = Math.min(state.examSolveIndexes[exam.id] || 0, order.length - 1);
    const number = state.examFocusQuestion || order[index];
    const profile = examQuestionProfile(exam, number);
    const selected = state.examSelections[exam.id]?.[number] || "";
    const solved = Boolean(state.examSolved[exam.id]?.[number]);
    const adaptiveGuide = state.examAdaptiveGuides[exam.id]?.[number];
    const detail = detailedExamGuidance(exam, number, profile);
    const completed = order.filter((question) => state.examSolved[exam.id]?.[question]).length;
    const guideComplete = adaptiveGuide?.stage === 6;
    const guidedConclusionVisible = solved || guideComplete;
    const allSolved = examQuestionNumbers(exam).every((question) => state.examSolved[exam.id]?.[question]);
    const adaptiveOwnsOptions = adaptiveGuide?.stage >= 2 && adaptiveGuide.stage <= 5;
    return `<div class="guide-step solve-step"><p class="guide-kicker">第五步</p><div class="solve-heading"><div><h3>逐空作答：第 ${number} 空</h3><p>当前顺序 ${index + 1} / ${order.length} · 已完成 ${completed} / ${order.length}</p></div><span>${guidedConclusionVisible ? escapeHtml(examQuestionFeature(profile)) : "独立试做"}</span></div>
      <div class="solve-guide"><strong>${guidedConclusionVisible ? "本空判断结论" : "先独立试做"}</strong><p>${guidedConclusionVisible ? escapeHtml(examPositionText(profile)) : "先观察空格位于段首、段中、段尾还是独立成行，再判断它要承接哪部分信息。"}</p><p>观察左侧高亮的空前、空后证据，再从 A—G 中选择。</p></div>
      ${adaptiveGuideMarkup(exam, number, profile)}
      ${adaptiveOwnsOptions ? "" : examOptionsPanel(exam, number)}
      ${selected ? `<p class="guide-feedback ${solved ? "correct" : guideComplete ? "neutral" : "wrong"}" role="status">${solved ? "选择正确。该选项已变灰锁定，后续空不能再次选择。" : guideComplete ? "证据链已完成。" : adaptiveGuide?.stage === 5 ? "当前正在代入验证：请点击上方三项检查，完成后确认本空答案。" : adaptiveGuide ? "首次错选已排除，请继续完成上方取证步骤。" : "第一次选择不正确，答案选项已暂时锁定，请完成上方引导。"}</p>` : ""}
      ${solved ? compactBreakthroughCard(exam, number, profile, detail) : ""}
      ${allSolved ? examFinalSummaryMarkup(exam) : ""}
      <div class="guide-actions"><button class="text-action" type="button" data-action="exam-guide-back">返回选择顺序</button>${solved ? index < order.length - 1 ? `<button class="reveal-next" type="button" data-action="exam-guide-next-question">下一空：第 ${order[index + 1]} 空</button>` : `<button class="reveal-next" type="button" data-action="exam-guide-finish">完成本篇训练</button>` : ""}</div></div>`;
  }

  function examGuideMarkup(exam) {
    const contents = [guideStepOne, guideStepKeywords, guideStepTwo, guideStepThree, guideStepFour];
    const options = state.examGuideStep === 2 || state.examGuideStep === 5 ? "" : examOptionsPanel(exam);
    return `<aside class="exam-guide" aria-label="五步互动解析" aria-live="polite">${guideProgressMarkup()}${contents[state.examGuideStep - 1](exam)}${options}</aside>`;
  }

  function examPassageParagraph(text, exam) {
    const selections = state.examSelections[exam.id] || {};
    const solveOrder = state.examSolveOrders[exam.id] || [];
    const activeNumber = state.examGuideStep === 5
      ? (state.examFocusQuestion || solveOrder[state.examSolveIndexes[exam.id] || 0])
      : state.examFocusQuestion;
    let evidenceTerms = state.examGuideStep === 1
      ? examGlobalEvidence(exam)
      : state.examGuideStep === 5 && activeNumber
        ? [examQuestionProfile(exam, activeNumber).before, examQuestionProfile(exam, activeNumber).after].filter(Boolean)
        : [];
    const adaptiveGuide = activeNumber ? state.examAdaptiveGuides[exam.id]?.[activeNumber] : null;
    if (state.examGuideStep === 5 && activeNumber) {
      const profile = examQuestionProfile(exam, activeNumber);
      evidenceTerms = detailedExamGuidance(exam, activeNumber, profile).highlightTerms;
      // 进入取证引导后，先隐藏标准证据；只有学生双击命中后（第3步起）才揭示高亮。
      if (adaptiveGuide && adaptiveGuide.stage <= 2) evidenceTerms = [];
    }
    const priorities = state.examPriorityPicks[exam.id] || [];
    const parts = String(text).split(/(\[\[\d+\]\])/g);
    return parts.map((part) => {
      const match = part.match(/^\[\[(\d+)\]\]$/);
      if (!match) {
        return markedText(part, evidenceTerms);
      }
      const number = Number(match[1]);
      const selected = selections[number] || "";
      const classes = ["exam-blank"];
      if (selected) classes.push("answered");
      if (state.examSolved[exam.id]?.[number]) classes.push("correct");
      if (activeNumber === number) classes.push("current");
      if (state.examFocusQuestion === number) classes.push("review-focus");
      if (state.examGuideStep === 4 && priorities.includes(number)) classes.push("priority");
      return `<span class="${classes.join(" ")}" aria-label="第${number}空${selected ? `已选${selected}` : "未作答"}">${number}. ${selected || "____"}</span>`;
    }).join("");
  }

  function examAnswerRow(exam, number) {
    const selected = state.examSelections[exam.id]?.[number] || "";
    return `<div class="exam-answer-row"><strong>${number}</strong><div class="exam-answer-buttons" role="group" aria-label="第${number}空答案">${"ABCDEFG".split("").map((letter) => {
      const classes = ["exam-answer-button"];
      if (selected === letter) classes.push("selected");
      if (state.examSubmitted && letter === exam.answers[number]) classes.push("correct");
      if (state.examSubmitted && selected === letter && letter !== exam.answers[number]) classes.push("wrong");
      return `<button class="${classes.join(" ")}" type="button" data-exam-question="${number}" data-exam-choice="${letter}" aria-pressed="${selected === letter}">${letter}</button>`;
    }).join("")}</div>${state.examSubmitted ? `<span class="exam-answer-state ${selected === exam.answers[number] ? "correct" : "wrong"}">${selected === exam.answers[number] ? "正确" : `正确答案 ${exam.answers[number]}`}</span>` : ""}</div>`;
  }

  function examAnalysisMarkup(exam) {
    if (!state.examSubmitted) return "";
    const order = recommendedExamOrder(exam);
    const number = state.examAnalysisQuestion || order[0];
    const profile = examQuestionProfile(exam, number);
    const steps = examAnalysisSteps(exam, number);
    return `<section class="exam-analysis" aria-label="分步解析" aria-live="polite">
      <div class="exam-analysis-heading"><div><span>分步解析</span><h3>先易后难找突破口</h3></div><small>当前：第 ${number} 空</small></div>
      <div class="exam-order"><strong>推荐顺序</strong><div>${order.map((question) => { const item = examQuestionProfile(exam, question); return `<button class="exam-order-button ${question === number ? "active" : ""}" type="button" data-exam-analysis-question="${question}" aria-pressed="${question === number}"><b>${question}</b><span>${escapeHtml(item.priorityLabel)}</span></button>`; }).join("")}</div></div>
      <p class="exam-priority-note">本空属于：<strong>${escapeHtml(profile.priorityLabel)}</strong>。推荐顺序只用于寻找突破口，不限制你的实际答题顺序。</p>
      <div class="analysis-steps">${steps.slice(0, state.examAnalysisReveal).map((step, index) => `<article class="analysis-step ${index === state.examAnalysisReveal - 1 ? "current" : ""}"><span>${index + 1}</span><div><strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.text)}</p></div></article>`).join("")}</div>
      ${state.examAnalysisReveal < steps.length ? `<button class="reveal-next" type="button" data-action="exam-analysis-next">下一步：${escapeHtml(steps[state.examAnalysisReveal].title)}</button>` : `<p class="analysis-complete">✓ 本空解析已完成，可切换下一空</p>`}
    </section>`;
  }

  function renderExam(examId, preserveScroll = false) {
    const exam = exams.find((item) => item.id === Number(examId));
    if (!exam) return;
    const oldY = window.scrollY;
    state.activeExam = exam.id;
    state.examSelections[exam.id] ||= {};
    state.examKeywordPicks[exam.id] ||= {};
    state.examKeywordRevealed[exam.id] ??= false;
    state.examPositionChoices[exam.id] ||= {};
    state.examPriorityPicks[exam.id] ||= [];
    state.examSolveOrders[exam.id] ||= [];
    state.examAttempts[exam.id] ||= {};
    state.examSolved[exam.id] ||= {};
    state.examAdaptiveGuides[exam.id] ||= {};
    const order = state.examSolveOrders[exam.id];
    const currentNumber = state.examGuideStep === 5 ? (state.examFocusQuestion || order[state.examSolveIndexes[exam.id] || 0]) : null;
    const displayNumber = orderedExamList().findIndex((item) => item.id === exam.id) + 1;
    const evidencePickMode = currentNumber && state.examAdaptiveGuides[exam.id]?.[currentNumber]?.stage === 2;
    views.exam.innerHTML = `<div class="lesson-toolbar"><button class="secondary-action" type="button" data-action="exam-back">← 返回真题列表</button><span class="lesson-position">第 ${displayNumber} / ${exams.length} 篇</span></div>
      <article class="exam-sheet">
        <header class="exam-title-block"><p>题目来源：${escapeHtml(exam.source)} · 本篇设空 ${escapeHtml(exam.range)}</p><h2>${escapeHtml(exam.title)}</h2><span>从 A—G 中选出能填入空白处的最佳选项，其中有两项多余。请跟随右侧四步引导完成。</span></header>
        <div class="exam-workspace guided-exam-workspace">
          <div class="exam-left-column">
            <div class="exam-reading ${evidencePickMode ? "evidence-pick-mode" : ""}"><div class="panel-heading"><h3>题目原文</h3><span>${evidencePickMode ? "双击原文取证" : currentNumber ? `当前：第 ${currentNumber} 空` : "按右侧步骤观察"}</span></div>${exam.passage.map((paragraph) => `<p>${examPassageParagraph(paragraph, exam)}</p>`).join("")}</div>
          </div>
          ${examGuideMarkup(exam)}
        </div>
      </article>`;
    setView("exam");
    document.title = `第${exam.id}篇 ${exam.title} | 无限进步 中考7选5训练系统`;
    if (preserveScroll) window.scrollTo({ top: oldY });
  }

  function chooseExam(number, letter) {
    const exam = exams.find((item) => item.id === state.activeExam);
    const question = Number(number);
    const adaptiveGuide = state.examAdaptiveGuides[exam?.id]?.[question];
    if (!exam || state.examGuideStep !== 5 || state.examSolved[exam.id]?.[question] || (adaptiveGuide && adaptiveGuide.stage < 6)) return;
    const selections = state.examSelections[exam.id] ||= {};
    const attempts = state.examAttempts[exam.id] ||= {};
    attempts[question] ||= [];
    selections[question] = letter;
    if (letter === exam.answers[question]) {
      (state.examSolved[exam.id] ||= {})[question] = true;
    } else if (!attempts[question].includes(letter)) {
      const firstWrongChoice = attempts[question].length === 0;
      attempts[question].push(letter);
      if (firstWrongChoice) (state.examAdaptiveGuides[exam.id] ||= {})[question] = { stage: 1, choice: "" };
    }
    renderExam(state.activeExam, true);
  }

  function submitExam() {
    const exam = exams.find((item) => item.id === state.activeExam);
    const numbers = examQuestionNumbers(exam);
    const selections = state.examSelections[exam.id] || {};
    const missing = numbers.filter((number) => !selections[number]);
    if (missing.length) {
      state.examMessage = `还有 ${missing.length} 个空未完成：${missing.join("、")}。`;
      state.examSubmitted = false;
    } else {
      const score = numbers.filter((number) => selections[number] === exam.answers[number]).length;
      state.examScores[exam.id] = score;
      state.examSubmitted = true;
      state.examMessage = "done";
      state.examAnalysisQuestion = recommendedExamOrder(exam)[0];
      state.examAnalysisReveal = 1;
      renderTrainingCatalog();
    }
    renderExam(exam.id, true);
  }

  function resetExam() {
    resetExamGuide(state.activeExam);
    renderExam(state.activeExam, true);
  }

  document.addEventListener("dblclick", (event) => {
    const keywordText = event.target.closest(".keyword-option-text");
    if (keywordText && state.examGuideStep === 2 && !state.examKeywordRevealed[state.activeExam]) {
      const selection = window.getSelection();
      if (!selection?.rangeCount || !keywordText.contains(selection.getRangeAt(0).commonAncestorContainer)) return;
      const selectedText = selection.toString().replace(/\s+/g, " ").trim().replace(/^[^A-Za-z0-9\u3400-\u9fff]+|[^A-Za-z0-9\u3400-\u9fff]+$/g, "");
      const letter = keywordText.closest("[data-keyword-option]")?.dataset.keywordOption;
      if (!selectedText || !letter) return;
      const picks = state.examKeywordPicks[state.activeExam] ||= {};
      picks[letter] ||= [];
      if (!picks[letter].some((item) => item.toLowerCase() === selectedText.toLowerCase())) picks[letter].push(selectedText.slice(0, 60));
      selection.removeAllRanges();
      renderExam(state.activeExam, true);
      return;
    }
    const reading = event.target.closest(".exam-reading.evidence-pick-mode");
    if (!reading) return;
    const exam = exams.find((item) => item.id === state.activeExam);
    const order = state.examSolveOrders[exam?.id] || [];
    const number = state.examFocusQuestion || order[state.examSolveIndexes[exam?.id] || 0];
    const guide = state.examAdaptiveGuides[exam?.id]?.[number];
    if (!exam || !number || guide?.stage !== 2) return;
    const selection = window.getSelection();
    if (!selection?.rangeCount || !reading.contains(selection.getRangeAt(0).commonAncestorContainer)) return;
    const selectedText = selection.toString().replace(/\s+/g, " ").trim();
    if (!selectedText) return;
    const profile = examQuestionProfile(exam, number);
    const detail = detailedExamGuidance(exam, number, profile);
    if (evidenceSelectionMatches(selectedText, detail)) {
      guide.selectedEvidence = selectedText;
      guide.evidenceMistake = "";
    } else {
      guide.evidenceMistake = selectedText.slice(0, 80);
    }
    guide.stage = 3;
    guide.choice = "";
    selection.removeAllRanges();
    renderExam(exam.id, true);
  });

  document.addEventListener("click", (event) => {
    const moduleEntry = event.target.closest("[data-module-entry]");
    if (moduleEntry) {
      const targetView = moduleEntry.dataset.moduleEntry;
      document.title = "无限进步 中考7选5训练系统";
      if (targetView === "training") renderTrainingCatalog();
      setView(targetView);
      return;
    }
    const reviewQuestion = event.target.closest("[data-review-question]")?.dataset.reviewQuestion;
    if (reviewQuestion) return focusExamQuestion(reviewQuestion);
    const lessonButton = event.target.closest("[data-lesson-id], [data-open-lesson]");
    if (lessonButton) return openLesson(lessonButton.dataset.lessonId ?? lessonButton.dataset.openLesson);
    const examButton = event.target.closest("[data-exam-id]");
    if (examButton) { resetExamGuide(Number(examButton.dataset.examId)); return renderExam(examButton.dataset.examId); }
    const themeChoice = event.target.closest("[data-exam-theme]")?.dataset.examTheme;
    if (themeChoice) { state.examThemeChoices[state.activeExam] = themeChoice; return renderExam(state.activeExam, true); }
    const positionChoice = event.target.closest("[data-exam-position-question][data-exam-position]");
    if (positionChoice) {
      const question = Number(positionChoice.dataset.examPositionQuestion);
      (state.examPositionChoices[state.activeExam] ||= {})[question] = positionChoice.dataset.examPosition;
      state.examFocusQuestion = question;
      return renderExam(state.activeExam, true);
    }
    const priorityChoice = event.target.closest("[data-exam-priority-question]");
    if (priorityChoice) {
      const question = Number(priorityChoice.dataset.examPriorityQuestion);
      const picks = state.examPriorityPicks[state.activeExam] ||= [];
      const existing = picks.indexOf(question);
      if (existing >= 0) picks.splice(existing, 1);
      else { if (picks.length === 2) picks.shift(); picks.push(question); }
      state.examFocusQuestion = question;
      return renderExam(state.activeExam, true);
    }
    const adaptiveChoice = event.target.closest("[data-adaptive-kind][data-adaptive-value]");
    if (adaptiveChoice) {
      const exam = exams.find((item) => item.id === state.activeExam);
      const order = state.examSolveOrders[exam.id] || [];
      const number = order[state.examSolveIndexes[exam.id] || 0];
      const profile = examQuestionProfile(exam, number);
      const guide = state.examAdaptiveGuides[exam.id]?.[number];
      if (!guide) return;
      const kind = adaptiveChoice.dataset.adaptiveKind;
      const value = adaptiveChoice.dataset.adaptiveValue;
      const detail = detailedExamGuidance(exam, number, profile);
      if (kind === "meaning") {
        if (value === detail.meaningAnswer) { guide.stage = 4; guide.choice = ""; }
        else guide.choice = value;
        return renderExam(exam.id, true);
      }
      if (kind === "guided-option") {
        if (value === exam.answers[number]) {
          guide.candidate = value;
          guide.validations = [];
          guide.stage = 5;
          guide.choice = "";
        } else {
          guide.eliminated ||= [];
          if (!guide.eliminated.includes(value)) guide.eliminated.push(value);
          guide.choice = value;
        }
        return renderExam(exam.id, true);
      }
      if (kind === "validation") {
        guide.validations ||= [];
        if (!guide.validations.includes(value)) guide.validations.push(value);
        if (guide.validations.length >= detail.validationChecks.length) {
          (state.examSelections[exam.id] ||= {})[number] = guide.candidate;
          (state.examSolved[exam.id] ||= {})[number] = true;
          guide.stage = 6;
          guide.choice = "";
          const currentIndex = state.examSolveIndexes[exam.id] || 0;
          if (currentIndex < order.length - 1) {
            state.examSolveIndexes[exam.id] = currentIndex + 1;
            state.examFocusQuestion = order[currentIndex + 1];
          }
        }
        return renderExam(exam.id, true);
      }
      const expected = kind === "position"
        ? examPositionKey(profile)
        : kind === "evidence"
          ? adaptiveEvidenceKey(profile)
          : "0";
      if (value === expected) {
        guide.stage = Math.min(6, guide.stage + 1);
        guide.choice = "";
      } else {
        guide.choice = value;
      }
      return renderExam(exam.id, true);
    }
    const examChoice = event.target.closest("[data-exam-question][data-exam-choice]");
    if (examChoice) return chooseExam(examChoice.dataset.examQuestion, examChoice.dataset.examChoice);
    const exampleChoice = event.target.closest("[data-example-choice]")?.dataset.exampleChoice;
    if (exampleChoice) return choose("example", exampleChoice);
    const practiceChoice = event.target.closest("[data-practice-choice]")?.dataset.practiceChoice;
    if (practiceChoice) return choose("practice", practiceChoice);
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "module-home") { document.title = "无限进步 中考7选5训练系统"; setView("home"); }
    else if (action === "back") { document.title = "无限进步 中考7选5训练系统"; setView("catalog"); }
    else if (action === "complete") toggleComplete();
    else if (action === "example-reset") resetInteraction("example");
    else if (action === "practice-reset") resetInteraction("practice");
    else if (action === "example-next") nextAnalysis("example");
    else if (action === "practice-next") nextAnalysis("practice");
    else if (action === "exam-back") { document.title = "无限进步 中考7选5训练系统"; renderTrainingCatalog(); setView("training"); }
    else if (action === "exam-reset") resetExam();
    else if (action === "exam-guide-next") { state.examGuideStep = Math.min(5, state.examGuideStep + 1); state.examFocusQuestion = null; renderExam(state.activeExam, true); }
    else if (action === "exam-guide-back") { state.examGuideStep = Math.max(1, state.examGuideStep - 1); state.examFocusQuestion = null; renderExam(state.activeExam, true); }
    else if (action === "exam-keywords-reveal") { state.examKeywordRevealed[state.activeExam] = true; renderExam(state.activeExam, true); }
    else if (action === "exam-guide-start-solving") {
      const exam = exams.find((item) => item.id === state.activeExam);
      state.examSolveOrders[exam.id] = recommendedExamOrder(exam);
      state.examSolveIndexes[exam.id] = 0;
      state.examGuideStep = 5;
      state.examFocusQuestion = state.examSolveOrders[exam.id][0];
      renderExam(exam.id, true);
    }
    else if (action === "exam-guide-next-question") {
      const examId = state.activeExam;
      state.examSolveIndexes[examId] = Math.min((state.examSolveIndexes[examId] || 0) + 1, state.examSolveOrders[examId].length - 1);
      state.examFocusQuestion = state.examSolveOrders[examId][state.examSolveIndexes[examId]];
      renderExam(examId, true);
    }
    else if (action === "exam-guide-finish") {
      const exam = exams.find((item) => item.id === state.activeExam);
      state.examScores[state.activeExam] = examQuestionNumbers(exam).length;
      renderTrainingCatalog();
      document.title = "无限进步 中考7选5训练系统";
      setView("training");
    }
  });

  tabs.forEach((tab) => tab.addEventListener("click", () => { document.title = "无限进步 中考7选5训练系统"; if (tab.dataset.view === "training") renderTrainingCatalog(); setView(tab.dataset.view); }));
  lessonSearch.addEventListener("input", () => renderCatalog(lessonSearch.value));
  renderCatalog(); renderTrainingCatalog(); updateProgress(); updateHomeStats(); setView("home");
})();
