const SUPABASE_CONFIG = {
  url: "https://gbjmylxohacppnybfssh.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdiam15bHhvaGFjcHBueWJmc3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDA1NzgsImV4cCI6MjA5ODI3NjU3OH0.mz5srsxdbZa4__oqKjlcysWuDo00w7UQaV8n2VNP4eE"
};
const SYSTEM_TYPE = "reading";
const LOGIN_STORAGE_KEY = "reading_supabase_access_code_20260717";
const LOGIN_OK_KEY = "reading_supabase_login_ok_20260717";
const LOGIN_LABEL_KEY = "reading_supabase_login_label_20260717";
const TRIAL_PAPER_ID = "official-xinjiang-2025-reading";

let papers = [];
let activePaper = null;
let activePassageIndex = 0;
let activeQuestionIndex = 0;
let selectedAnswer = "";
let readingStep = 1;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  papers = normalizePapers([...(window.OFFICIAL_READING_PAPERS || []), ...(window.READING_PAPERS || [])]);
  if (isTrialMode()) {
    document.body.classList.add("trial-mode");
    applyTrialCopy();
  }
  bindChrome();
  if (!(await setupLoginGate())) return;
  if (isTrialMode()) {
    loadPaper(TRIAL_PAPER_ID);
  } else {
    renderLibrary();
  }
}

function normalizePapers(list) {
  return list
    .map((paper, index) => ({ ...paper, displayNo: index + 1 }))
    .sort((a, b) => {
      if (!!a.official !== !!b.official) return a.official ? -1 : 1;
      const yearDiff = getPaperYear(b) - getPaperYear(a);
      if (yearDiff) return yearDiff;
      return 0;
    })
    .map((paper, index) => ({ ...paper, displayNo: index + 1 }));
}

function getPaperYear(paper) {
  const text = `${paper.year || ""} ${paper.source || ""} ${paper.title || ""}`;
  const match = text.match(/20\d{2}/);
  return match ? Number(match[0]) : 0;
}

function bindChrome() {
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (isTrialMode() && btn.dataset.view) {
        window.location.href = "../../index.html";
        return;
      }
      showView(btn.dataset.view);
    });
  });
  document.querySelectorAll(".home-exit").forEach(el => {
    el.addEventListener("click", event => {
      if (!confirm("是否确定要退出阅读理解，训练其他题型？")) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      window.location.href = "../../index.html";
    });
  });
  document.getElementById("backToLibrary").addEventListener("click", () => {
    if (isTrialMode()) {
      window.location.href = "../../index.html";
      return;
    }
    showView("library");
    renderLibrary();
  });
}

function applyTrialCopy() {
  const practiceNav = document.querySelector('.nav-item[data-view="practice"]');
  if (practiceNav) practiceNav.textContent = "返回首页";
  const meta = document.getElementById("paperMeta");
  if (meta) meta.textContent = "解锁更多内容联系工作人员领取登陆码";
}

async function callSupabaseRpc(functionName, payload) {
  const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }
  if (!response.ok) {
    const message = data && data.message ? data.message : "云端连接失败，请稍后再试。";
    throw new Error(String(message).includes("INVALID") ? "该登录码不可用于当前专项，或登录码不正确。" : message);
  }
  return data;
}

async function verifyAccessCode(code) {
  const result = await callSupabaseRpc("verify_access_code", {
    input_code: code,
    input_system_type: SYSTEM_TYPE
  });
  const account = Array.isArray(result) ? result[0] : null;
  if (!account || !account.access_code_id) throw new Error("该登录码不可用于当前专项，或登录码不正确。");
  return account;
}

function cleanLoginCode(value) {
  return String(value || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
}

async function setupLoginGate() {
  if (isTrialMode()) {
    unlockApp();
    return true;
  }
  const saved = cleanLoginCode(localStorage.getItem(LOGIN_STORAGE_KEY));
  if (saved && localStorage.getItem(LOGIN_OK_KEY) === "true") {
    unlockApp();
    verifyAccessCode(saved).catch(() => clearLogin());
    return true;
  }
  const form = document.getElementById("loginForm");
  const input = document.getElementById("loginCode");
  const error = document.getElementById("loginError");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const code = cleanLoginCode(input.value);
    input.value = code;
    if (!code) {
      error.textContent = "请输入登录码。";
      return;
    }
    error.textContent = "正在验证...";
    try {
      const account = await verifyAccessCode(code);
      localStorage.setItem(LOGIN_STORAGE_KEY, code);
      localStorage.setItem(LOGIN_OK_KEY, "true");
      if (account.label) localStorage.setItem(LOGIN_LABEL_KEY, account.label);
      unlockApp();
      renderLibrary();
    } catch (err) {
      error.textContent = err.message || "登录失败。";
    }
  });
  return false;
}

function isTrialMode() {
  try {
    return new URLSearchParams(window.location.search).get("trial") === "1";
  } catch {
    return false;
  }
}

function clearLogin() {
  localStorage.removeItem(LOGIN_STORAGE_KEY);
  localStorage.removeItem(LOGIN_OK_KEY);
  localStorage.removeItem(LOGIN_LABEL_KEY);
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
  const gate = document.getElementById("loginGate");
  gate.style.display = "none";
  gate.setAttribute("aria-hidden", "true");
}

function showView(view) {
  document.querySelectorAll(".view").forEach(el => el.classList.toggle("active", el.id === `view-${view}`));
  document.querySelectorAll(".nav-item[data-view]").forEach(el => el.classList.toggle("active", el.dataset.view === view));
}

function renderLibrary() {
  const box = document.getElementById("paperList");
  if (!papers.length) {
    box.innerHTML = '<div class="paper-card"><strong>阅读理解题库待导入</strong><small>请提供完整阅读理解系统或原始 Word 真题文件。</small></div>';
    return;
  }
  box.innerHTML = papers.map(paper => `
    <article class="paper-card">
      <div>
        ${officialPaperBadge(paper)}
        <strong>${paper.displayNo}. ${escapeHtml(paper.title)}</strong>
        <small>来源：${escapeHtml(formatSource(paper))}</small>
      </div>
      <button type="button" data-paper="${escapeHtml(paper.id)}">开始训练</button>
    </article>
  `).join("");
  box.querySelectorAll("[data-paper]").forEach(btn => {
    btn.addEventListener("click", () => loadPaper(btn.dataset.paper));
  });
}

function officialPaperBadge(paper) {
  if (!paper.official) return "";
  return `<span class="official-exam-badge">${paper.year || ""} 新疆中考真题</span>`;
}

function formatSource(paper) {
  if (paper.official) {
    return `${paper.year}年 · ${paper.region || "新疆维吾尔自治区、新疆生产建设兵团"} · ${paper.examName || "初中学业水平考试英语真题"}`;
  }
  return paper.source || "名校优质真题";
}

function loadPaper(id) {
  activePaper = papers.find(p => p.id === id);
  activePassageIndex = 0;
  activeQuestionIndex = 0;
  selectedAnswer = "";
  readingStep = 1;
  showView("practice");
  renderPractice();
}

function renderPractice() {
  if (!activePaper) return;
  const passage = activePaper.passages[activePassageIndex];
  const question = passage.questions[activeQuestionIndex];
  document.getElementById("paperTitle").textContent = `${activePaper.displayNo}. ${activePaper.title}`;
  document.getElementById("paperMeta").textContent = isTrialMode() ? "解锁更多内容联系工作人员领取登陆码" : formatSource(activePaper);
  document.getElementById("passageMedia").innerHTML = passage.image ? `<img class="paper-image" src="${escapeHtml(passage.image)}" alt="" />` : "";
  document.getElementById("passageText").innerHTML = passage.text.map(p => `<p>${highlightPassage(p, question)}</p>`).join("");
  renderQuestion(passage, question);
}

function renderQuestion(passage, question) {
  const box = document.getElementById("questionPanel");
  box.innerHTML = `
    <div class="question-title">
      <h2>第 ${question.originalNo || question.no} 题</h2>
      <span class="question-type">${escapeHtml(question.type || "细节题")}</span>
    </div>
    <p>${escapeHtml(question.stem)}</p>
    <div class="options">
      ${question.options.map(option => `<button class="option-btn" data-value="${escapeHtml(option[0])}">${escapeHtml(option)}</button>`).join("")}
    </div>
    <div class="steps">
      ${renderSteps(question)}
    </div>
    <div class="question-actions">
      <button type="button" data-action="keyword">关键词定位</button>
      <button type="button" data-action="sentence">答案句定位</button>
      <button type="button" class="primary" data-action="submit">提交答案</button>
      <button type="button" data-action="next">下一题</button>
    </div>
    <div class="result" id="resultBox"></div>
  `;
  box.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedAnswer = btn.dataset.value;
      box.querySelectorAll(".option-btn").forEach(item => item.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
  box.querySelectorAll("[data-action]").forEach(btn => btn.addEventListener("click", () => handleAction(btn.dataset.action)));
}

function renderSteps(question) {
  const type = question.type || "细节题";
  const first = type.includes("主旨") ? "先看首尾段和反复出现的中心词。" :
    type.includes("结构") ? "先判断段落功能和文章展开顺序。" :
    type.includes("图表") ? "先读标题、坐标、单位和图例。" :
    type.includes("判断") ? "逐项回原文找能证明或推翻的句子。" :
    "圈出题干关键词，再回原文找同义表达。";
  return [
    ["第一步：题型判断", first],
    ["第二步：关键词/答案句", question.answerSentence || "定位与题干含义最接近的原文句子。"],
    ["第三步：选项辨析", question.trapAnalysis || "排除无中生有、偷换对象、以偏概全等干扰项。"],
    ["第四步：答案解析", question.explanation || "根据答案句确认正确选项。"]
  ].map(([title, text]) => `<div class="step-card"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div>`).join("");
}

function handleAction(action) {
  const passage = activePaper.passages[activePassageIndex];
  const question = passage.questions[activeQuestionIndex];
  if (action === "keyword" || action === "sentence") {
    renderPractice();
    return;
  }
  if (action === "submit") {
    const result = document.getElementById("resultBox");
    if (!selectedAnswer) {
      result.textContent = "请先选择一个答案。";
      return;
    }
    const correct = selectedAnswer === question.answer;
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.classList.toggle("correct", btn.dataset.value === question.answer);
      btn.classList.toggle("wrong", btn.dataset.value === selectedAnswer && !correct);
    });
    result.textContent = correct ? `答对了。${question.explanation || ""}` : `这题应选 ${question.answer}。${question.explanation || ""}`;
  }
  if (action === "next") nextQuestion();
}

function nextQuestion() {
  const passage = activePaper.passages[activePassageIndex];
  if (activeQuestionIndex < passage.questions.length - 1) {
    activeQuestionIndex += 1;
  } else if (activePassageIndex < activePaper.passages.length - 1) {
    activePassageIndex += 1;
    activeQuestionIndex = 0;
  }
  selectedAnswer = "";
  renderPractice();
}

function highlightPassage(text, question) {
  let html = escapeHtml(text);
  const phrases = [...(question.keywords || [])].filter(item => item && !/^(the|a|an|of|to|in|on|at)$/i.test(item));
  phrases.sort((a, b) => b.length - a.length).forEach(phrase => {
    html = html.replace(new RegExp(`\\b${escapeRegExp(escapeHtml(phrase))}\\b`, "i"), match => `<span class="keyword-mark">${match}</span>`);
  });
  if (question.answerSentence) {
    const escaped = escapeHtml(question.answerSentence);
    html = html.replace(escaped, `<span class="answer-sentence">${escaped}</span>`);
  }
  return html;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderQuestion(passage, question) {
  const box = document.getElementById("questionPanel");
  const showOptions = readingStep >= 4;
  box.innerHTML = `
    <div class="question-title">
      <h2>第 ${question.originalNo || question.no} 题</h2>
      <span class="question-type">${escapeHtml(question.type || "细节题")}</span>
    </div>
    <p>${escapeHtml(question.stem)}</p>
    <div class="steps">
      ${renderSteps(question)}
    </div>
    ${showOptions ? `<div class="options">
      ${question.options.map(option => `<button class="option-btn" data-value="${escapeHtml(option[0])}">${escapeHtml(option)}</button>`).join("")}
    </div>` : `<div class="step-lock">先完成前面的定位和辨析步骤，再选择答案。</div>`}
    <div class="question-actions">
      <button type="button" data-action="prevStep"${readingStep <= 1 ? " disabled" : ""}>上一步</button>
      <button type="button" data-action="nextStep"${readingStep >= 4 ? " disabled" : ""}>下一步</button>
      <button type="button" class="primary" data-action="submit">提交答案</button>
      <button type="button" data-action="next">下一题</button>
    </div>
    <div class="result" id="resultBox"></div>
  `;
  box.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedAnswer = btn.dataset.value;
      box.querySelectorAll(".option-btn").forEach(item => item.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
  box.querySelectorAll("[data-action]").forEach(btn => btn.addEventListener("click", () => handleAction(btn.dataset.action)));
}

function renderSteps(question) {
  const type = question.type || "细节题";
  const first = type.includes("主旨")
    ? "先看首尾段和反复出现的中心词，判断文章主要内容。"
    : type.includes("结构")
      ? "先判断段落功能和文章展开顺序。"
      : type.includes("图表")
        ? "先读标题、坐标、单位和图例。"
        : type.includes("判断")
          ? "逐项回原文找能证明或推翻的句子。"
          : "圈出题干关键词，再回原文找同义表达。";
  const steps = [
    ["第一步：题型判断", first],
    ["第二步：关键词 / 答案句", question.answerSentence || "定位与题干含义最接近的原文句子。"],
    ["第三步：选项辨析", question.trapAnalysis || "排除无中生有、偷换对象、以偏概全等干扰项。"],
    ["第四步：选择答案", question.explanation || "根据答案句确认正确选项。"]
  ];
  return steps.map(([title, text], index) => {
    const stepNo = index + 1;
    const state = stepNo < readingStep ? "done" : stepNo === readingStep ? "active" : "locked";
    const body = stepNo <= readingStep ? escapeHtml(text) : "完成上一步后解锁。";
    return `<div class="step-card ${state}"><strong>${escapeHtml(title)}</strong><span>${body}</span></div>`;
  }).join("");
}

function handleAction(action) {
  const passage = activePaper.passages[activePassageIndex];
  const question = passage.questions[activeQuestionIndex];
  if (action === "prevStep") {
    readingStep = Math.max(1, readingStep - 1);
    selectedAnswer = "";
    renderPractice();
    return;
  }
  if (action === "nextStep") {
    readingStep = Math.min(4, readingStep + 1);
    selectedAnswer = "";
    renderPractice();
    return;
  }
  if (action === "submit") {
    const result = document.getElementById("resultBox");
    if (readingStep < 4) {
      result.textContent = "请先完成定位、答案句和选项辨析，再提交答案。";
      return;
    }
    if (!selectedAnswer) {
      result.textContent = "请先选择一个答案。";
      return;
    }
    const correct = selectedAnswer === question.answer;
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.classList.toggle("correct", btn.dataset.value === question.answer);
      btn.classList.toggle("wrong", btn.dataset.value === selectedAnswer && !correct);
    });
    result.textContent = correct ? `答对了。${question.explanation || ""}` : `这题应选 ${question.answer}。${question.explanation || ""}`;
  }
  if (action === "next") nextQuestion();
}

function nextQuestion() {
  const passage = activePaper.passages[activePassageIndex];
  if (activeQuestionIndex < passage.questions.length - 1) {
    activeQuestionIndex += 1;
  } else if (activePassageIndex < activePaper.passages.length - 1) {
    activePassageIndex += 1;
    activeQuestionIndex = 0;
  }
  selectedAnswer = "";
  readingStep = 1;
  renderPractice();
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
