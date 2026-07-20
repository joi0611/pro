const VOCAB_LIBRARY_KEYS = ["basic", "high"];
const DESIGN_MODE = false;
const REQUESTED_VOCAB_KEY = new URLSearchParams(window.location.search).get("vocab");
const HAS_SELECTED_VOCAB = VOCAB_LIBRARY_KEYS.includes(REQUESTED_VOCAB_KEY);
const ACTIVE_VOCAB_KEY = HAS_SELECTED_VOCAB ? REQUESTED_VOCAB_KEY : "high";
const VOCAB_LIBRARIES = {
  basic: {
    title: "1300 基础词",
    groups: window.BASIC_VOCAB_GROUPS || [],
    meta: window.BASIC_VOCAB_META || {},
  },
  high: {
    title: "900 高频词",
    groups: window.VOCAB_GROUPS || [],
    meta: window.VOCAB_META || {},
  },
};
const ACTIVE_LIBRARY = VOCAB_LIBRARIES[ACTIVE_VOCAB_KEY];
const GROUPS = mergeCollocationPatches(ACTIVE_LIBRARY.groups, window.VOCAB_COLLOCATION_PATCHES || {});
const META = ACTIVE_LIBRARY.meta;
const EXTERNAL_HYPHENATOR = createExternalHyphenator();
const SYLLABLE_OVERRIDES = {
  active: ["ac", "tive"],
  achieve: ["a", "chie", "ve"],
  acquire: ["ac", "quire"],
  addictive: ["ad", "dic", "tive"],
  aggressive: ["ag", "gres", "sive"],
  alternative: ["al", "ter", "na", "tive"],
  ancient: ["an", "cient"],
  apologize: ["a", "po", "lo", "gize"],
  attractive: ["at", "trac", "tive"],
  audience: ["au", "di", "ence"],
  advertise: ["ad", "ver", "tise"],
  brief: ["brief"],
  civilize: ["ci", "vi", "lize"],
  combine: ["com", "bine"],
  conservative: ["con", "ser", "va", "tive"],
  compromise: ["com", "pro", "mise"],
  countryside: ["coun", "try", "side"],
  creative: ["crea", "tive"],
  criticize: ["cri", "ti", "cize"],
  decide: ["de", "cide"],
  decline: ["de", "cline"],
  diagnose: ["diag", "nose"],
  distinguish: ["dis", "tin", "guish"],
  effective: ["ef", "fec", "tive"],
  efficient: ["ef", "fi", "cient"],
  encouraging: ["en", "cou", "rag", "ing"],
  equip: ["e", "quip"],
  experience: ["ex", "pe", "ri", "ence"],
  fierce: ["fierce"],
  friendly: ["friend", "ly"],
  guide: ["guide"],
  guilty: ["guilty"],
  emphasize: ["em", "pha", "size"],
  image: ["im", "age"],
  inexperienced: ["in", "ex", "pe", "ri", "enced"],
  interview: ["in", "ter", "view"],
  magazine: ["ma", "ga", "zine"],
  measure: ["mea", "sure"],
  negative: ["ne", "ga", "tive"],
  neutral: ["neu", "tral"],
  objective: ["ob", "jec", "tive"],
  optimistic: ["op", "ti", "mis", "tic"],
  organize: ["or", "ga", "nize"],
  patient: ["pa", "tient"],
  pessimistic: ["pes", "sim", "istic"],
  pleasure: ["plea", "sure"],
  positive: ["po", "si", "tive"],
  premier: ["pre", "mier"],
  precise: ["pre", "cise"],
  pressure: ["pres", "sure"],
  provide: ["pro", "vide"],
  quit: ["quit"],
  quiz: ["quiz"],
  recognize: ["re", "cog", "nize"],
  reason: ["rea", "son"],
  reality: ["rea", "lity"],
  realize: ["rea", "lize"],
  relative: ["re", "la", "tive"],
  relief: ["re", "lief"],
  review: ["re", "view"],
  routine: ["rou", "tine"],
  sensitive: ["sen", "si", "tive"],
  species: ["spe", "cies"],
  summarize: ["sum", "ma", "rize"],
  suitable: ["suit", "able"],
  tentative: ["ten", "ta", "tive"],
  treasure: ["trea", "sure"],
};
const QUIZ_MEANING_OVERRIDES = {
  advance: "前进；进步",
  aggressive: "有攻击性的；有进取心的",
  appeal: "吸引；呼吁",
  approach: "方法；接近",
  appreciate: "欣赏；感激",
  approve: "批准；赞成",
  benefit: "益处；受益",
  business: "商业；生意",
  characteristic: "特有的；典型的",
  college: "大学；学院",
  conduct: "进行（研究、调查等）",
  content: "内容；满意",
  degree: "程度；学位",
  desperate: "极其想要的；绝望的",
  honor: "荣誉；荣幸",
  industry: "产业；行业",
  memory: "记忆",
  normal: "正常的",
  opposite: "相反的；对面的",
  physical: "身体的；物理的",
  present: "提出；呈现；礼物",
  process: "过程；处理",
  program: "程序；项目",
  public: "公众；公共的",
  realize: "意识到",
  stress: "压力；强调",
  tear: "眼泪；撕破",
  title: "标题；头衔",
  value: "价值；重视",
};
const BASIC_QUIZ_COLLOCATIONS = {
  change: [{ cloze: "_____ one's mind", answer: "change", meaning: "改变主意" }],
  take: [{ cloze: "_____ care of", answer: "take", meaning: "照顾" }],
  care: [{ cloze: "_____ about", answer: "care", meaning: "关心，在意" }],
  look: [{ cloze: "_____ for", answer: "look", meaning: "寻找" }],
  make: [{ cloze: "_____ a decision", answer: "make", meaning: "作出决定" }],
  hope: [{ cloze: "_____ for", answer: "hope", meaning: "希望得到" }],
  interest: [{ cloze: "be interested _____", answer: "in", meaning: "对……感兴趣" }],
  work: [{ cloze: "_____ on", answer: "work", meaning: "致力于，努力改善" }],
  plan: [{ cloze: "_____ to do sth", answer: "plan", meaning: "计划做某事" }],
  believe: [{ cloze: "_____ in", answer: "believe", meaning: "信任，相信……的存在" }],
  leave: [{ cloze: "_____ for", answer: "leave", meaning: "动身前往" }],
  find: [{ cloze: "_____ out", answer: "find", meaning: "查明，弄清" }],
  show: [{ cloze: "_____ up", answer: "show", meaning: "出现，露面" }],
  act: [{ cloze: "_____ as", answer: "act", meaning: "充当，担任" }],
  agree: [{ cloze: "_____ with sb", answer: "agree", meaning: "同意某人的看法" }],
  think: [{ cloze: "_____ about", answer: "think", meaning: "思考，考虑" }],
  hold: [{ cloze: "_____ on", answer: "hold", meaning: "等一下，坚持住" }],
  notice: [{ cloze: "take notice _____", answer: "of", meaning: "注意，留意" }],
  give: [{ cloze: "_____ up", answer: "give", meaning: "放弃" }],
  time: [{ cloze: "_____ time", answer: "on", meaning: "准时" }],
  learn: [{ cloze: "_____ from", answer: "learn", meaning: "向……学习" }],
  worry: [{ cloze: "_____ about", answer: "worry", meaning: "担心" }],
  run: [{ cloze: "_____ out of", answer: "run", meaning: "用完，耗尽" }],
  lose: [{ cloze: "_____ one's way", answer: "lose", meaning: "迷路" }],
  feel: [{ cloze: "_____ like doing sth", answer: "feel", meaning: "想要做某事" }],
  live: [{ cloze: "_____ on", answer: "live", meaning: "以……为生" }],
  use: [{ cloze: "be used _____ doing sth", answer: "to", meaning: "习惯于做某事" }],
  need: [{ cloze: "in need _____", answer: "of", meaning: "需要" }],
  keep: [{ cloze: "_____ in touch with", answer: "keep", meaning: "与……保持联系" }],
  try: [{ cloze: "_____ one's best", answer: "try", meaning: "尽某人最大努力" }],
  ask: [{ cloze: "_____ for", answer: "ask", meaning: "请求，要求" }],
  wait: [{ cloze: "_____ for", answer: "wait", meaning: "等待" }],
  arrive: [{ cloze: "_____ at", answer: "arrive", meaning: "到达较小地点" }],
  listen: [{ cloze: "_____ to", answer: "listen", meaning: "听" }],
  depend: [{ cloze: "_____ on", answer: "depend", meaning: "依靠，取决于" }],
  prepare: [{ cloze: "prepare _____", answer: "for", meaning: "为……作准备" }],
  succeed: [{ cloze: "_____ in doing sth", answer: "succeed", meaning: "成功做成某事" }],
  spend: [{ cloze: "_____ time doing sth", answer: "spend", meaning: "花时间做某事" }],
  prevent: [{ cloze: "prevent sb _____ doing sth", answer: "from", meaning: "阻止某人做某事" }],
  provide: [{ cloze: "provide sb _____ sth", answer: "with", meaning: "为某人提供某物" }],
};
const REVIEW_OFFSETS = [1, 2, 4, 7, 15];
const STORAGE_KEY = ACTIVE_VOCAB_KEY === "high"
  ? "gaokao-vocab-mvp-state-v1"
  : `gaokao-vocab-mvp-state-v1-${ACTIVE_VOCAB_KEY}`;
const LOGIN_STORAGE_KEY = "gaokao-vocab-mvp-login-ok";
const LOGIN_CODE_STORAGE_KEY = "gaokao-vocab-mvp-login-code";
const SUPABASE_URL = "https://gbjmylxohacppnybfssh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_qhB54NbaSS2bRDw0ehKGbA_7kHXkhTQ";
const LOGIN_CODES = [
  "A7K2Q9", "M4D8XZ", "P9R3TN", "H6W2LC", "Q8F5JM", "Z3N7PA", "B2Y9KT", "V6C4RD", "L9X2FE", "T5M8QH",
  "N3P6WZ", "D8K4VA", "R2J7CB", "X5H9LN", "G6Q3TY", "K4V8PM", "C9D2XR", "Y7F5BN", "W3L6QJ", "E8T4KS",
  "S2A9VD", "J5N7HX", "U6M3PC", "F4R8YL", "P7C2ZK", "A9W5DG", "M2H6RT", "Q4L8XN", "Z7K3FA", "B5T9MJ",
  "V2P6QH", "L8D4CY", "T3X7RN", "N9F2KB", "D5J8WA", "R6M4PL", "X2Q9TE", "G7V3HC", "K5B8ND", "C4Y6RJ",
  "Y9L2VF", "W5T7XA", "E3P8KM", "S6H4QN", "J2R9DZ", "U8C5LB", "F7N3WY", "P4M6TX", "A2Q8CJ", "M9V5RS",
];
const AGAIN_REQUEUE_DISTANCE = 4;
const COMPLETE_COLORS = [
  "#ffe3ec", "#dff2ff", "#e5f5ce", "#fff0b8", "#eadfff", "#def6ed",
  "#ffdfcc", "#e8efff", "#f5e4ff", "#fff5d8", "#d9f4ff", "#f8e7d9",
  "#e2f1dc", "#ffe7f2", "#e8e2ff", "#fff1c9", "#dff7f6", "#fbe0dc",
];
const COMPLETION_ILLUSTRATIONS = [
  "./assets/completion-illustrations/guard-progress.png",
  "./assets/completion-illustrations/rocket-gaokao.png",
  "./assets/completion-illustrations/exam-spirit.png",
  "./assets/completion-illustrations/word-progress.png",
  "./assets/completion-illustrations/english-rocket.png",
  "./assets/completion-illustrations/exam-spirit-2.png",
];
const ENCOURAGEMENTS = [
  "今天这一页，做得很漂亮。你不是突然变强，是每天都在变强。",
  "又往目标那边挪了一步，轻轻松松，但很算数。",
  "今天的词已经被你收编了。明天再来一点点，就很踏实。",
  "稳住节奏就会赢。今天这份努力，已经在给未来铺路。",
  "你把今天搞定了，这件事本身就很有力量。",
  "别小看这一页，它正在把高考词汇变成你的熟人。",
  "完成得很好。下次见到这些词，你会更有底气。",
  "今天没有白过，单词也没有白背。继续保持这股认真。",
];

const els = {
  loginScreen: document.querySelector("#loginScreen"),
  loginForm: document.querySelector("#loginForm"),
  loginCode: document.querySelector("#loginCode"),
  loginError: document.querySelector("#loginError"),
  libraryScreen: document.querySelector("#libraryScreen"),
  libraryLogout: document.querySelector("#libraryLogout"),
  libraryButtons: document.querySelectorAll("[data-vocab-library]"),
  selectLibrary: document.querySelector("#selectLibrary"),
  activeLibraryTitle: document.querySelector("#activeLibraryTitle"),
  metaGroups: document.querySelector("#metaGroups"),
  metaRows: document.querySelector("#metaRows"),
  startDate: document.querySelector("#startDate"),
  dailyOptions: document.querySelector("#dailyOptions"),
  buildPlan: document.querySelector("#buildPlan"),
  startWeakTraining: document.querySelector("#startWeakTraining"),
  resetProgress: document.querySelector("#resetProgress"),
  toggleDiagnostic: document.querySelector("#toggleDiagnostic"),
  logoutButton: document.querySelector("#logoutButton"),
  diagnosticPanel: document.querySelector("#diagnosticPanel"),
  diagnosticWord: document.querySelector("#diagnosticWord"),
  diagnosticStatus: document.querySelector("#diagnosticStatus"),
  runDiagnostic: document.querySelector("#runDiagnostic"),
  copyDiagnostic: document.querySelector("#copyDiagnostic"),
  diagnosticOutput: document.querySelector("#diagnosticOutput"),
  todayNew: document.querySelector("#todayNew"),
  todayReview: document.querySelector("#todayReview"),
  masteredCount: document.querySelector("#masteredCount"),
  weakCount: document.querySelector("#weakCount"),
  overallProgressText: document.querySelector("#overallProgressText"),
  overallProgressBar: document.querySelector("#overallProgressBar"),
  overallProgressMeta: document.querySelector("#overallProgressMeta"),
  prevMonth: document.querySelector("#prevMonth"),
  nextMonth: document.querySelector("#nextMonth"),
  calendarTitle: document.querySelector("#calendarTitle"),
  calendar: document.querySelector("#calendar"),
  prestudyCheck: document.querySelector("#prestudyCheck"),
  prestudyCount: document.querySelector("#prestudyCount"),
  prestudyBar: document.querySelector("#prestudyBar"),
  prestudyStatus: document.querySelector("#prestudyStatus"),
  prestudyList: document.querySelector("#prestudyList"),
  prestudyMore: document.querySelector("#prestudyMore"),
  closePrestudy: document.querySelector("#closePrestudy"),
  trainer: document.querySelector("#trainer"),
  trainerMode: document.querySelector("#trainerMode"),
  trainerProgress: document.querySelector("#trainerProgress"),
  closeTrainer: document.querySelector("#closeTrainer"),
  cardTag: document.querySelector("#cardTag"),
  cardWord: document.querySelector("#cardWord"),
  cardSplitMemory: document.querySelector("#cardSplitMemory"),
  speakWord: document.querySelector("#speakWord"),
  cardMeta: document.querySelector("#cardMeta"),
  cardMeaning: document.querySelector("#cardMeaning"),
  revealMeaning: document.querySelector("#revealMeaning"),
  cardForms: document.querySelector("#cardForms"),
  testReady: document.querySelector("#testReady"),
  testReadyMode: document.querySelector("#testReadyMode"),
  testReadyTitle: document.querySelector("#testReadyTitle"),
  testReadyMeta: document.querySelector("#testReadyMeta"),
  startPendingQuiz: document.querySelector("#startPendingQuiz"),
  quiz: document.querySelector("#quiz"),
  quizMode: document.querySelector("#quizMode"),
  quizProgress: document.querySelector("#quizProgress"),
  closeQuiz: document.querySelector("#closeQuiz"),
  quizCard: document.querySelector("#quizCard"),
  quizType: document.querySelector("#quizType"),
  quizPrompt: document.querySelector("#quizPrompt"),
  quizHint: document.querySelector("#quizHint"),
  quizOptions: document.querySelector("#quizOptions"),
  quizFeedback: document.querySelector("#quizFeedback"),
  nextQuestion: document.querySelector("#nextQuestion"),
  quizResult: document.querySelector("#quizResult"),
  quizScore: document.querySelector("#quizScore"),
  quizWrongCount: document.querySelector("#quizWrongCount"),
  quizWrongList: document.querySelector("#quizWrongList"),
  memoryBoost: document.querySelector("#memoryBoost"),
  memoryBoostTitle: document.querySelector("#memoryBoostTitle"),
  memoryBoostMeta: document.querySelector("#memoryBoostMeta"),
  memoryBoostList: document.querySelector("#memoryBoostList"),
  closeMemoryBoost: document.querySelector("#closeMemoryBoost"),
  memoryDrill: document.querySelector("#memoryDrill"),
  memoryDrillWord: document.querySelector("#memoryDrillWord"),
  memoryDrillBar: document.querySelector("#memoryDrillBar"),
  memoryDrillCountdown: document.querySelector("#memoryDrillCountdown"),
  memoryStage: document.querySelector("#memoryStage"),
  memoryDrillBack: document.querySelector("#memoryDrillBack"),
  memoryDrillNext: document.querySelector("#memoryDrillNext"),
  tearOverlay: document.querySelector("#tearOverlay"),
  tearCard: document.querySelector("#tearCard"),
  tearDate: document.querySelector("#tearDate"),
  tearArt: document.querySelector("#tearArt"),
  tearMessage: document.querySelector("#tearMessage"),
  closeTear: document.querySelector("#closeTear"),
};

let state = loadState();
let calendarMonth = startOfMonth(parseDate(state.selectedDate || todayKey()));
let activeQueue = [];
let activeIndex = 0;
let activeDate = state.selectedDate || todayKey();
let activeSessionType = "calendar";
let meaningRevealed = false;
let quizQueue = [];
let quizIndex = 0;
let quizAnswers = [];
let quizLocked = false;
let pendingQuizGroups = [];
let pendingQuizDate = "";
let memoryBoostWrongItems = [];
let memoryBoostIndex = -1;
let meaningSequenceToken = 0;
let memoryDrillTimer = null;
let memoryDrillInterval = null;
let memoryDrillRevealTimers = [];
let memoryDrillRunToken = 0;
let cloudSaveTimer = null;
let cloudSyncReady = false;
let cloudStateEnvelope = null;
let lastCalendarTap = { key: "", time: 0 };
let pointerStartTarget = null;
let completionReturnTimer = null;
let completionDropTimer = null;
let activePrestudyCheck = null;
let prestudyStartTimer = null;
let verifiedPrestudyLookup = null;
const PRESTUDY_BATCH_SIZE = 10;
const MEMORY_DRILL_DURATION = 10 * 60 * 1000;
const MEMORY_DRILL_MIN_REPETITIONS = 8;
const MEMORY_DRILL_MAX_REPETITIONS = 16;
const MEMORY_DRILL_POSITIONS = 21;
const audioCache = {};
const audioPlayerCache = {};
const audioFailureCache = {};
const AUDIO_RETRY_MS = 5 * 60 * 1000;
const AUDIO_PREFETCH_WINDOW = 2;
const UNIVERSAL_TTS_BASE = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=";
const LOCAL_AUDIO_BASE = "./audio/words/";
const AUDIO_BACKUP_MAP = window.VOCAB_AUDIO_BACKUPS || {};
const EMBEDDED_AUDIO_CORE_MAP = window.VOCAB_EMBEDDED_AUDIO_CORE || {};
const AUDIO_BATCH_MAP = window.VOCAB_AUDIO_BATCH_MAP || {};
const LOCAL_AUDIO_WORD_SET = new Set(window.VOCAB_LOCAL_AUDIO_WORDS || []);
const EMBEDDED_AUDIO_MAP = window.VOCAB_EMBEDDED_AUDIO_PACK || {};
const AUDIO_POLICY_MODE = window.VOCAB_AUDIO_POLICY?.mode || "browser-first";
const objectUrlCache = {};
const audioDiagnosticState = {
  visible: false,
  status: "未运行",
  word: "",
  lines: ["等待检测…"],
  lastResult: null,
  events: [],
};
const speechState = {
  preferredVoice: null,
  initialized: false,
  primed: false,
  activeToken: 0,
  retryTimer: null
};

function mergeCollocationPatches(groups, patches) {
  return groups.map((group) => {
    const key = String(group?.core?.word || "").trim().toLowerCase();
    const collocations = Array.isArray(patches?.[key]) ? patches[key] : null;
    if (!collocations?.length) return group;
    return {
      ...group,
      core: {
        ...group.core,
        collocations,
      },
    };
  });
}

init();

function init() {
  initLogin();
  initSpeechSynthesis();
  document.title = HAS_SELECTED_VOCAB ? `${ACTIVE_LIBRARY.title}｜高考词汇训练` : "高考词汇训练";
  if (els.activeLibraryTitle) els.activeLibraryTitle.textContent = ACTIVE_LIBRARY.title;
  els.metaGroups.textContent = META.groupCount || GROUPS.length;
  els.metaRows.textContent = META.rowCount || countRows();
  els.startDate.value = state.startDate || todayKey();
  setDailyActive(state.dailyCount || 30);
  if (!state.plan) buildPlan();
  bindEvents();
  renderAll();
  resumeInterruptedLearningIfNeeded();
}

function bindEvents() {
  els.dailyOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-count]");
    if (!button) return;
    state.dailyCount = Number(button.dataset.count);
    setDailyActive(state.dailyCount);
    saveState();
  });

  els.buildPlan.addEventListener("click", () => {
    state.startDate = els.startDate.value || todayKey();
    buildPlan();
    renderAll();
  });

  els.startWeakTraining.addEventListener("click", startWeakTraining);

  els.resetProgress.addEventListener("click", () => {
    if (!confirm("确定清空学习进度并重新生成计划吗？此操作也会同步到云端。")) return;
    state.progress = {};
    state.completedDates = {};
    state.extraReviews = {};
    state.quizResults = {};
    state.trainingSessions = {};
    state.preStudyChecks = {};
    delete state.lastTrainingSession;
    buildPlan();
    renderAll();
  });
  els.toggleDiagnostic?.addEventListener("click", () => {
    setDiagnosticPanelVisible(!audioDiagnosticState.visible);
  });
  els.selectLibrary?.addEventListener("click", returnToLibrary);
  els.logoutButton?.addEventListener("click", logoutUser);
  els.runDiagnostic?.addEventListener("click", runCurrentWordDiagnostic);
  els.copyDiagnostic?.addEventListener("click", copyDiagnosticResult);

  els.prevMonth.addEventListener("click", () => {
    calendarMonth = addMonths(calendarMonth, -1);
    renderCalendar();
  });

  els.nextMonth.addEventListener("click", () => {
    calendarMonth = addMonths(calendarMonth, 1);
    renderCalendar();
  });

  els.closeTrainer.addEventListener("click", () => {
    els.trainer.classList.add("hidden");
    exitLearningFocus();
  });
  els.closePrestudy?.addEventListener("click", closePrestudyCheck);
  els.prestudyMore?.addEventListener("click", () => {
    if (!activePrestudyCheck) return;
    activePrestudyCheck.visibleCount = Math.min(
      activePrestudyCheck.candidateIds.length,
      activePrestudyCheck.visibleCount + PRESTUDY_BATCH_SIZE,
    );
    saveActivePrestudyCheck();
    renderPrestudyCheck();
  });
  els.prestudyList?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-prestudy-choice]");
    const row = event.target.closest("[data-prestudy-id]");
    if (!button || !row) return;
    choosePrestudyWord(row.dataset.prestudyId, button.dataset.prestudyChoice);
  });
  els.speakWord.addEventListener("click", () => {
    const group = activeQueue[activeIndex];
    if (group) speakWord(group.core.word);
  });
  els.revealMeaning.addEventListener("click", revealMeaning);
  els.cardForms.addEventListener("click", (event) => {
    const card = event.target.closest(".form-flip-card");
    if (!card) return;
    card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", card.classList.contains("flipped") ? "true" : "false");
  });
  els.startPendingQuiz.addEventListener("click", () => {
    if (!pendingQuizGroups.length) return;
    startDailyQuiz(pendingQuizGroups, pendingQuizDate);
  });
  els.closeQuiz.addEventListener("click", () => {
    els.quiz.classList.add("hidden");
    exitLearningFocus();
  });
  els.closeMemoryBoost.addEventListener("click", closeMemoryFlows);
  els.memoryDrillBack.addEventListener("click", () => {
    stopMemoryDrill();
    els.memoryDrill.classList.add("hidden");
    els.memoryBoost.classList.remove("hidden");
  });
  els.memoryDrillNext.addEventListener("click", () => {
    const nextIndex = memoryBoostIndex + 1;
    stopMemoryDrill();
    if (nextIndex < memoryBoostWrongItems.length) {
      openMemoryDrill(nextIndex);
      return;
    }
    closeMemoryFlows();
    if (activeSessionType !== "weak") showCompletionAnimation(activeDate, state.quizResults?.[activeDate]?.score || 100);
  });
  els.closeTear.addEventListener("click", () => els.tearOverlay.classList.add("hidden"));
  els.nextQuestion.addEventListener("click", nextQuizQuestion);
  els.quizOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-answer]");
    if (!button) return;
    submitQuizAnswer(button.dataset.answer);
  });
  document.querySelector(".answer-row").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-rating]");
    if (!button) return;
    rateCurrent(button.dataset.rating);
  });
}

function initLogin() {
  if (DESIGN_MODE) {
    document.body.classList.remove("auth-locked");
    els.loginScreen.classList.add("hidden");
    els.libraryLogout?.classList.add("hidden");
    els.logoutButton?.classList.add("hidden");
    els.libraryButtons?.forEach((button) => {
      button.addEventListener("click", () => openVocabularyLibrary(button.dataset.vocabLibrary));
    });
    if (HAS_SELECTED_VOCAB) {
      document.body.classList.remove("library-locked");
      els.libraryScreen?.classList.add("hidden");
    } else {
      showLibraryScreen();
    }
    return;
  }

  const storedCode = normalizeLoginCode(localStorage.getItem(LOGIN_CODE_STORAGE_KEY) || "");
  const authenticated = localStorage.getItem(LOGIN_STORAGE_KEY) === "1" && LOGIN_CODES.includes(storedCode);
  const shouldShowLibrary = authenticated && !HAS_SELECTED_VOCAB;
  document.body.classList.toggle("auth-locked", !authenticated);
  document.body.classList.toggle("library-locked", shouldShowLibrary);
  els.loginScreen.classList.toggle("hidden", authenticated);
  els.libraryScreen?.classList.toggle("hidden", !shouldShowLibrary);
  if (!authenticated) {
    setTimeout(() => els.loginCode.focus(), 50);
  } else if (HAS_SELECTED_VOCAB) {
    initializeCloudSync(storedCode);
  }

  els.libraryButtons?.forEach((button) => {
    button.addEventListener("click", () => openVocabularyLibrary(button.dataset.vocabLibrary));
  });
  els.libraryLogout?.addEventListener("click", logoutUser);

  els.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = normalizeLoginCode(els.loginCode.value);
    if (LOGIN_CODES.includes(code)) {
      localStorage.setItem(LOGIN_STORAGE_KEY, "1");
      localStorage.setItem(LOGIN_CODE_STORAGE_KEY, code);
      els.loginError.textContent = "";
      els.loginScreen.classList.add("hidden");
      document.body.classList.remove("auth-locked");
      if (!HAS_SELECTED_VOCAB) {
        showLibraryScreen();
      } else {
        document.body.classList.remove("library-locked");
        els.libraryScreen?.classList.add("hidden");
        initializeCloudSync(code).catch((error) => {
          console.warn("登录后的云端同步失败，已继续使用本地进度。", error);
        });
      }
      return;
    }
    els.loginError.textContent = "登录码不正确，请检查后再试。";
    els.loginCode.select();
  });
  els.loginCode.addEventListener("input", () => {
    els.loginCode.value = normalizeLoginCode(els.loginCode.value);
    els.loginError.textContent = "";
  });
}

function logoutUser() {
  localStorage.removeItem(LOGIN_STORAGE_KEY);
  localStorage.removeItem(LOGIN_CODE_STORAGE_KEY);
  if (HAS_SELECTED_VOCAB) {
    const url = new URL(window.location.href);
    url.searchParams.delete("vocab");
    window.location.replace(url.href);
    return;
  }
  document.body.classList.add("auth-locked");
  document.body.classList.remove("library-locked");
  els.loginScreen.classList.remove("hidden");
  els.libraryScreen?.classList.add("hidden");
  els.trainer.classList.add("hidden");
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  exitLearningFocus();
  els.loginCode.value = "";
  els.loginError.textContent = "";
  window.setTimeout(() => els.loginCode.focus(), 50);
}

function showLibraryScreen() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("library-locked");
  els.loginScreen.classList.add("hidden");
  els.libraryScreen?.classList.remove("hidden");
}

function openVocabularyLibrary(key) {
  if (!VOCAB_LIBRARY_KEYS.includes(key)) return;
  const url = new URL(window.location.href);
  url.searchParams.set("vocab", key);
  window.location.href = url.href;
}

function returnToLibrary() {
  const url = new URL(window.location.href);
  url.searchParams.delete("vocab");
  window.location.href = url.href;
}

function normalizeLoginCode(value) {
  return String(value || "").replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
}

function buildPlan() {
  const dailyCount = state.dailyCount || 30;
  const start = parseDate(els.startDate.value || state.startDate || todayKey());
  const days = {};

  GROUPS.forEach((group, index) => {
    const learnDayIndex = Math.floor(index / dailyCount);
    const learnDate = dateKey(addDays(start, learnDayIndex));
    ensureDay(days, learnDate).new.push(group.id);
    REVIEW_OFFSETS.forEach((offset) => {
      const reviewDate = dateKey(addDays(parseDate(learnDate), offset));
      ensureDay(days, reviewDate).review.push(group.id);
    });
  });

  state.startDate = dateKey(start);
  state.plan = days;
  state.selectedDate = state.selectedDate || todayKey();
  saveState();
}

function ensureDay(days, key) {
  if (!days[key]) days[key] = { new: [], review: [] };
  return days[key];
}

function renderAll() {
  renderSummary();
  renderCalendar();
}

function renderSummary() {
  const today = todayKey();
  els.todayNew.textContent = getEffectiveNewIds(today).length;
  els.todayReview.textContent = getDueReviewIds(today).length;
  const progress = Object.values(state.progress || {});
  els.masteredCount.textContent = progress.filter((item) => item.mastered).length;
  els.weakCount.textContent = getWeakGroupIds().length;
  const learnedCount = GROUPS.filter((group) => getProgress(group.id).seen).length;
  const totalCount = GROUPS.length || 1;
  const percent = Math.round((learnedCount / totalCount) * 100);
  els.overallProgressText.textContent = `${percent}%`;
  els.overallProgressBar.style.width = `${percent}%`;
  els.overallProgressMeta.textContent = `已学习 ${learnedCount} / ${GROUPS.length} 组核心词`;
}

function renderCalendar() {
  els.calendarTitle.textContent = `${calendarMonth.getFullYear()}年 ${calendarMonth.getMonth() + 1}月`;
  els.calendar.innerHTML = "";
  const first = startOfMonth(calendarMonth);
  const offset = (first.getDay() + 6) % 7;
  const start = addDays(first, -offset);
  for (let i = 0; i < 42; i++) {
    const date = addDays(start, i);
    const key = dateKey(date);
    const plan = getDayPlan(key);
    const isToday = key === todayKey();
    const carryoverCount = isToday ? getCarryoverNewIds(key).length : 0;
    const newIds = isToday ? getEffectiveNewIds(key) : plan.new;
    const extraCount = getExtraReviews(key).filter((id) => isReviewEligible(id)).length;
    const reviewCount = getDueReviewIds(key).length;
    const taskCount = newIds.length + reviewCount;
    const quizWrong = state.quizResults?.[key]?.wrong || 0;
    const completed = Boolean(state.completedDates?.[key]);
    const missed = key < todayKey() && !completed && plan.new.length > 0;
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "day",
      date.getMonth() === calendarMonth.getMonth() ? "" : "outside",
      isToday ? "today" : "",
      key === state.selectedDate ? "selected" : "",
      completed ? "completed" : "",
      missed ? "missed" : "",
    ].join(" ");
    if (completed) button.style.setProperty("--complete-bg", completeDayColor(key));
    button.title = taskCount ? "双击开始这一天的学习" : "这天没有学习任务";
    button.innerHTML = `
      <span class="date-num">${date.getDate()}</span>
      <span class="pill-row">
        ${newIds.length ? `<span class="pill new">新学 ${newIds.length}</span>` : ""}
        ${carryoverCount ? `<span class="pill weak">补学 ${Math.min(carryoverCount, newIds.length)}</span>` : ""}
        ${reviewCount ? `<span class="pill review">复习 ${reviewCount}</span>` : ""}
        ${extraCount ? `<span class="pill weak">重点 ${extraCount}</span>` : ""}
        ${quizWrong ? `<span class="pill wrong">错题 ${quizWrong}</span>` : ""}
        ${completed ? `<span class="pill done">已完成</span>` : ""}
      </span>
      ${missed ? `<span class="missed-message">昨天没做完的内容也会跟上来，尽量当天学完会更轻松。</span>` : ""}
      ${completed ? `<span class="day-art">${renderDayIllustration(key)}</span>` : ""}
      ${isToday && taskCount ? `<span class="start-day-btn" data-start-date="${key}">开始学习</span>` : ""}
    `;
    button.addEventListener("pointerdown", (event) => {
      pointerStartTarget = event.target.closest("[data-start-date]") ? key : null;
    });
    button.addEventListener("pointerup", (event) => {
      const startButton = event.target.closest("[data-start-date]");
      if (startButton && pointerStartTarget === key) {
        pointerStartTarget = null;
        startSelectedTask(key);
      }
    });
    button.addEventListener("pointercancel", () => {
      pointerStartTarget = null;
    });
    button.addEventListener("click", (event) => {
      const shouldStart = Boolean(event.target.closest("[data-start-date]"));
      if (shouldStart) {
        pointerStartTarget = null;
        return;
      }
      if (shouldOpenByDoubleTap(key)) {
        startSelectedTask(key);
        return;
      }
      selectCalendarDate(key);
    });
    els.calendar.appendChild(button);
  }
}

function shouldOpenByDoubleTap(key) {
  const now = Date.now();
  const matched = lastCalendarTap.key === key && now - lastCalendarTap.time <= 420;
  lastCalendarTap = { key, time: now };
  return matched;
}

function selectCalendarDate(key) {
  state.selectedDate = key;
  calendarMonth = startOfMonth(parseDate(key));
  saveState();
  renderAll();
}

function canStartCalendarTask(key) {
  if (getTrainingSession("calendar", key)) return true;
  if (key <= todayKey()) return true;
  const previousKey = dateKey(addDays(parseDate(key), -1));
  return Boolean(state.completedDates?.[previousKey]);
}

function startSelectedTask(dateKeyOverride) {
  const key = dateKeyOverride || state.selectedDate || todayKey();
  state.selectedDate = key;
  if (!canStartCalendarTask(key)) {
    alert("请先完成前一天的学习，再开始这一天。");
    saveState();
    renderAll();
    return;
  }
  const newIds = key === todayKey() ? getEffectiveNewIds(key) : getDayPlan(key).new.filter((id) => !getProgress(id).seen);
  const reviewIds = getDueReviewIds(key);
  const queueIds = unique([...newIds, ...reviewIds]);
  activeDate = key;
  activeSessionType = "calendar";
  const savedSession = getTrainingSession(activeSessionType, key);
  const prestudyCompleted = Boolean(state.preStudyChecks?.[key]?.completed);
  if (ACTIVE_VOCAB_KEY === "basic" && key === todayKey() && !prestudyCompleted) {
    startPrestudyCheck(key);
    return;
  }
  if (savedSession) {
    activeQueue = savedSession.queueIds.map((id) => getGroup(id)).filter(Boolean);
    activeIndex = Math.min(savedSession.index, Math.max(activeQueue.length - 1, 0));
  } else {
    activeQueue = queueIds.map((id) => getGroup(id)).filter(Boolean);
    activeIndex = 0;
  }
  if (!activeQueue.length) return;
  saveTrainingSession();
  saveState();
  enterLearningFocus();
  els.prestudyCheck?.classList.add("hidden");
  els.testReady.classList.add("hidden");
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  saveTrainingSession();
  saveState();
  els.trainer.classList.remove("hidden");
  els.trainer.scrollIntoView({ behavior: "smooth", block: "start" });
  renderCard();
}

function startPrestudyCheck(key) {
  const candidateIds = getPrestudyCandidateIds(key);
  const target = Math.min(state.dailyCount || 30, candidateIds.length);
  const saved = state.preStudyChecks?.[key];
  const savedCandidates = Array.isArray(saved?.candidateIds)
    ? saved.candidateIds.filter((id) => candidateIds.includes(id))
    : [];
  const mergedCandidates = unique([...savedCandidates, ...candidateIds]);
  const decisions = {};
  Object.entries(saved?.decisions || {}).forEach(([id, choice]) => {
    if (mergedCandidates.includes(id) && (choice === "known" || choice === "unknown")) decisions[id] = choice;
  });
  activePrestudyCheck = {
    key,
    target,
    candidateIds: mergedCandidates,
    decisions,
    visibleCount: Math.max(PRESTUDY_BATCH_SIZE, Number(saved?.visibleCount) || 0),
  };
  activePrestudyCheck.visibleCount = Math.min(activePrestudyCheck.candidateIds.length, activePrestudyCheck.visibleCount);
  activeDate = key;
  activeSessionType = "calendar";
  enterLearningFocus();
  els.trainer.classList.add("hidden");
  els.testReady.classList.add("hidden");
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  els.prestudyCheck.classList.remove("hidden");
  saveActivePrestudyCheck();
  if (!target) {
    finalizePrestudyCheck();
    return;
  }
  renderPrestudyCheck();
  els.prestudyCheck.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getPrestudyCandidateIds(key) {
  const carryover = getCarryoverNewIds(key);
  const scheduled = Object.keys(state.plan || {})
    .filter((date) => date >= key)
    .sort()
    .flatMap((date) => state.plan?.[date]?.new || []);
  return unique([...carryover, ...scheduled, ...GROUPS.map((group) => group.id)])
    .filter((id) => !getProgress(id).seen && Boolean(getGroup(id)));
}

function buildVerifiedPrestudyLookup() {
  if (verifiedPrestudyLookup) return verifiedPrestudyLookup;
  verifiedPrestudyLookup = new Map();
  (window.VOCAB_GROUPS || []).forEach((group) => {
    [group.core, ...(group.forms || [])].forEach((item) => {
      const word = String(item?.word || "").trim().toLowerCase();
      const meaning = String(item?.meaning || "").trim();
      if (word && meaning && !verifiedPrestudyLookup.has(word)) {
        verifiedPrestudyLookup.set(word, { meaning, pos: String(item?.pos || "").trim() });
      }
    });
  });
  return verifiedPrestudyLookup;
}

const PRESTUDY_IRREGULAR_FORMS = new Set(`
  am is are was were been being has had did done went gone took taken made found left knew known gave given
  thought held felt ran lost wrote written spoke spoken ate eaten saw seen came became began begun brought bought
  caught taught told said got gotten forgot forgotten chose chosen broke broken drove driven rode ridden rose risen
  fell fallen flew flown grew grown threw thrown drew drawn wore worn tore torn bore born borne sent spent built lent
  met paid sat stood understood won sold heard kept slept swept meant learnt dreamt dealt led read cut put let set hit
  hurt cost shut burst spread beat beaten bit bitten blew blown froze frozen hid hidden shook shaken sang sung swam swum
  drank drunk rang rung sank sunk stole stolen stuck struck dug hung lit lay lain laid showed shown woke woken fed fought
  sought shot smelt spelt
  children men women people feet teeth geese mice oxen better best worse worst more most less least
`.trim().split(/\s+/));

function buildRegularInflections(word) {
  const base = String(word || "").trim().toLowerCase();
  const results = new Set();
  if (!/^[a-z]+$/.test(base) || base.length < 2) return results;
  results.add(`${base}s`);
  results.add(`${base}es`);
  results.add(`${base}ed`);
  results.add(`${base}ing`);
  results.add(`${base}er`);
  results.add(`${base}est`);
  if (base.endsWith("e")) {
    results.add(`${base}d`);
    results.add(`${base.slice(0, -1)}ing`);
    results.add(`${base}r`);
    results.add(`${base}st`);
  }
  if (/[^aeiou]y$/.test(base)) {
    results.add(`${base.slice(0, -1)}ies`);
    results.add(`${base.slice(0, -1)}ied`);
    results.add(`${base.slice(0, -1)}ier`);
    results.add(`${base.slice(0, -1)}iest`);
  }
  if (/ie$/.test(base)) results.add(`${base.slice(0, -2)}ying`);
  if (/fe$/.test(base)) results.add(`${base.slice(0, -2)}ves`);
  if (/f$/.test(base)) results.add(`${base.slice(0, -1)}ves`);
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(base)) {
    const last = base.at(-1);
    results.add(`${base}${last}ed`);
    results.add(`${base}${last}ing`);
    results.add(`${base}${last}er`);
    results.add(`${base}${last}est`);
  }
  return results;
}

function isPrestudyInflection(group, form) {
  const word = String(form?.word || "").trim().toLowerCase();
  if (!word) return true;
  if (/(?:ed|ing)$/.test(word) || PRESTUDY_IRREGULAR_FORMS.has(word)) return true;
  const possibleLemmas = [group.core.word, ...(group.forms || []).map((item) => item.word)]
    .map((item) => String(item || "").trim().toLowerCase())
    .filter((item) => item && item !== word && item.length < word.length);
  return possibleLemmas.some((lemma) => buildRegularInflections(lemma).has(word));
}

function splitTopLevelMeanings(value) {
  const parts = [];
  let current = "";
  let depth = 0;
  for (const char of String(value || "")) {
    if (char === "（" || char === "(") depth += 1;
    if ((char === "）" || char === ")") && depth > 0) depth -= 1;
    if (depth === 0 && /[；;，,、]/.test(char)) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function summarizePrestudyMeaning(value, pos, maxMeanings = 2) {
  const text = String(value || "").trim();
  if (!text) return { meaning: "释义未标注", pos: pos || "核心词" };
  const posPattern = "动词|名词|形容词|副词|代词|介词|连词|限定词|冠词|数词|助动词|感叹词";
  const sections = text.split(new RegExp(`；(?=(?:${posPattern})：)`)).map((section) => {
    const match = section.match(new RegExp(`^(${posPattern})：(.*)$`));
    if (!match) return null;
    const firstMeaning = splitTopLevelMeanings(match[2])[0];
    return firstMeaning ? { label: match[1], meaning: firstMeaning } : null;
  }).filter(Boolean)
    .filter((section, index, list) => list.findIndex((item) => item.label === section.label && item.meaning === section.meaning) === index)
    .slice(0, maxMeanings);
  if (sections.length) {
    return {
      pos: sections.map((section) => section.label).join(" / "),
      meaning: sections.map((section) => `${section.label}：${section.meaning}`).join("；"),
    };
  }
  const meanings = splitTopLevelMeanings(text).filter((meaning, index, list) => list.indexOf(meaning) === index).slice(0, maxMeanings);
  return { pos: pos || "核心词", meaning: meanings.join("；") };
}

function getPrestudyRepresentative(group) {
  const verified = buildVerifiedPrestudyLookup();
  const forms = (group.forms || []).filter((form) => form.word && form.pos && form.meaning);
  const lexicalForms = forms.filter((form) => !isPrestudyInflection(group, form));
  const distinctForms = lexicalForms.filter((form) => form.meaning !== group.core.meaning);
  const singlePosForms = distinctForms.filter((form) => !form.pos.includes("/"));
  const representatives = singlePosForms.length ? singlePosForms : distinctForms;
  if (representatives.length) {
    const index = hashDateKey(`${activePrestudyCheck?.key || todayKey()}:${group.id}`) % representatives.length;
    const form = representatives[index];
    const summary = summarizePrestudyMeaning(form.meaning, form.pos, 2);
    return {
      word: form.word,
      pos: summary.pos,
      meaning: summary.meaning,
      isForm: true,
    };
  }
  const coreMatch = verified.get(String(group.core.word || "").trim().toLowerCase());
  const summary = summarizePrestudyMeaning(group.core.meaning, coreMatch?.pos || "核心词", 2);
  return {
    word: group.core.word,
    pos: summary.pos,
    meaning: summary.meaning,
    isForm: false,
  };
}

function renderPrestudyCheck() {
  if (!activePrestudyCheck) return;
  const { candidateIds, decisions, target } = activePrestudyCheck;
  const unknownIds = candidateIds.filter((id) => decisions[id] === "unknown");
  const decidedCount = candidateIds.filter((id) => decisions[id]).length;
  const selectedCount = Math.min(unknownIds.length, target);
  const atTarget = selectedCount >= target;
  const percent = target ? Math.round((selectedCount / target) * 100) : 100;
  els.prestudyCount.textContent = `${selectedCount} / ${target}`;
  els.prestudyBar.style.width = `${percent}%`;
  els.prestudyStatus.textContent = atTarget
    ? "今日新学数量已选满，正在自动开始学习…"
    : `已判断 ${decidedCount} 个；还需要找出 ${target - selectedCount} 个不认识的词`;
  const visibleIds = candidateIds.slice(0, activePrestudyCheck.visibleCount);
  els.prestudyList.innerHTML = visibleIds.map((id, index) => {
    const group = getGroup(id);
    const representative = getPrestudyRepresentative(group);
    const choice = decisions[id] || "";
    const isKnown = choice === "known";
    const isUnknown = choice === "unknown";
    const lockNewUnknown = atTarget && !isUnknown;
    return `
      <article class="prestudy-item ${choice ? `is-${choice}` : ""}" data-prestudy-id="${escapeHtml(id)}">
        <div class="prestudy-word-block">
          <span class="prestudy-index">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${escapeHtml(representative.word)}</h3>
            <span class="prestudy-pos">${escapeHtml(representative.pos)}</span>
          </div>
        </div>
        <div class="prestudy-feedback ${choice ? "" : "hidden"}">
          ${isKnown
            ? `<span class="prestudy-meaning-label">对应释义</span><strong>${escapeHtml(representative.meaning)}</strong>`
            : `<strong>已加入今日新学</strong><span>稍后将在学习卡片中完整学习</span>`}
        </div>
        <div class="prestudy-actions" role="group" aria-label="${escapeHtml(representative.word)}是否认识">
          <button class="prestudy-unknown" type="button" data-prestudy-choice="unknown" aria-pressed="${isUnknown}" ${lockNewUnknown ? "disabled" : ""}>不认识</button>
          <button class="prestudy-known" type="button" data-prestudy-choice="known" aria-pressed="${isKnown}">认识</button>
        </div>
      </article>
    `;
  }).join("");
  const visibleDecided = visibleIds.every((id) => decisions[id]);
  const hasMore = activePrestudyCheck.visibleCount < candidateIds.length;
  els.prestudyMore.classList.toggle("hidden", !hasMore || !visibleDecided || atTarget);
}

function choosePrestudyWord(id, choice) {
  if (!activePrestudyCheck || !activePrestudyCheck.candidateIds.includes(id)) return;
  if (prestudyStartTimer) {
    window.clearTimeout(prestudyStartTimer);
    prestudyStartTimer = null;
  }
  const unknownCount = activePrestudyCheck.candidateIds.filter((item) => activePrestudyCheck.decisions[item] === "unknown").length;
  const currentChoice = activePrestudyCheck.decisions[id];
  if (choice === "unknown" && currentChoice !== "unknown" && unknownCount >= activePrestudyCheck.target) return;
  activePrestudyCheck.decisions[id] = choice;
  const visibleIds = activePrestudyCheck.candidateIds.slice(0, activePrestudyCheck.visibleCount);
  const allVisibleDecided = visibleIds.every((item) => activePrestudyCheck.decisions[item]);
  const selectedUnknown = activePrestudyCheck.candidateIds.filter((item) => activePrestudyCheck.decisions[item] === "unknown").length;
  if (selectedUnknown < activePrestudyCheck.target && allVisibleDecided && activePrestudyCheck.visibleCount < activePrestudyCheck.candidateIds.length) {
    activePrestudyCheck.visibleCount = Math.min(
      activePrestudyCheck.candidateIds.length,
      activePrestudyCheck.visibleCount + PRESTUDY_BATCH_SIZE,
    );
  }
  saveActivePrestudyCheck();
  renderPrestudyCheck();
  if (selectedUnknown >= activePrestudyCheck.target) {
    prestudyStartTimer = window.setTimeout(() => {
      prestudyStartTimer = null;
      const stillSelected = activePrestudyCheck?.candidateIds.filter((item) => activePrestudyCheck.decisions[item] === "unknown").length || 0;
      if (activePrestudyCheck && stillSelected >= activePrestudyCheck.target) finalizePrestudyCheck();
    }, 900);
  }
}

function saveActivePrestudyCheck() {
  if (!activePrestudyCheck) return;
  state.preStudyChecks ||= {};
  state.preStudyChecks[activePrestudyCheck.key] = {
    candidateIds: activePrestudyCheck.candidateIds,
    decisions: activePrestudyCheck.decisions,
    visibleCount: activePrestudyCheck.visibleCount,
    target: activePrestudyCheck.target,
    updatedAt: new Date().toISOString(),
  };
  saveState();
}

function finalizePrestudyCheck() {
  if (!activePrestudyCheck) return;
  const { key, candidateIds, decisions, target } = activePrestudyCheck;
  const unknownIds = candidateIds.filter((id) => decisions[id] === "unknown").slice(0, target);
  const knownIds = candidateIds.filter((id) => decisions[id] === "known");
  knownIds.forEach((id) => {
    const progress = getProgress(id);
    if (!progress.seen) {
      progress.seen = true;
      progress.mastered = true;
      progress.preStudyKnown = true;
      progress.firstLearnDate = key;
      progress.lastDate = key;
      progress.total = (progress.total || 0) + 1;
      progress.good = (progress.good || 0) + 1;
      progress.streak = Math.max(progress.streak || 0, 4);
      state.progress[id] = progress;
    }
  });
  state.preStudyChecks[key] = {
    ...state.preStudyChecks[key],
    decisions,
    unknownIds,
    knownIds,
    completed: true,
    completedAt: new Date().toISOString(),
  };
  activeQueue = unique([...unknownIds, ...getDueReviewIds(key)]).map((id) => getGroup(id)).filter(Boolean);
  activeIndex = 0;
  activeDate = key;
  activeSessionType = "calendar";
  activePrestudyCheck = null;
  els.prestudyCheck.classList.add("hidden");
  if (!activeQueue.length) {
    saveState();
    exitLearningFocus();
    renderAll();
    return;
  }
  saveTrainingSession();
  saveState();
  enterLearningFocus();
  els.testReady.classList.add("hidden");
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  els.trainer.classList.remove("hidden");
  renderAll();
  renderCard();
  els.trainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closePrestudyCheck() {
  if (prestudyStartTimer) {
    window.clearTimeout(prestudyStartTimer);
    prestudyStartTimer = null;
  }
  saveActivePrestudyCheck();
  activePrestudyCheck = null;
  els.prestudyCheck.classList.add("hidden");
  exitLearningFocus();
}

function startWeakTraining() {
  const weakIds = getWeakGroupIds().slice(0, 30);
  activeQueue = weakIds.map((id) => getGroup(id)).filter(Boolean);
  activeIndex = 0;
  activeDate = todayKey();
  activeSessionType = "weak";
  if (!activeQueue.length) {
    alert("目前没有薄弱词，继续保持。");
    return;
  }
  enterLearningFocus();
  els.testReady.classList.add("hidden");
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  els.trainer.classList.remove("hidden");
  els.trainer.scrollIntoView({ behavior: "smooth", block: "start" });
  renderCard();
}

function compactCardMeaning(value, maxMeanings = 3) {
  const text = String(value || "").trim();
  if (!text) return "释义未标注";
  const posPattern = "动词|名词|形容词|副词|代词|介词|连词|限定词|冠词|数词|助动词|感叹词";
  const sections = text.split(new RegExp(`；(?=(?:${posPattern})：)`)).filter(Boolean);
  const parsedSections = sections.map((section) => {
    const match = section.match(new RegExp(`^(${posPattern})：(.*)$`));
    if (!match) return null;
    return {
      label: match[1],
      meanings: match[2].split(/[；;，,、]/).map((item) => item.trim()).filter(Boolean),
    };
  }).filter(Boolean);
  if (parsedSections.length) {
    const selected = parsedSections.map((section) => ({ ...section, meanings: section.meanings.slice(0, 1) }));
    let remaining = Math.max(maxMeanings, parsedSections.length) - selected.length;
    for (let round = 1; remaining > 0; round += 1) {
      let added = false;
      for (let index = 0; index < parsedSections.length && remaining > 0; index += 1) {
        const next = parsedSections[index].meanings[round];
        if (!next) continue;
        selected[index].meanings.push(next);
        remaining -= 1;
        added = true;
      }
      if (!added) break;
    }
    return selected.map((section) => `${section.label}：${section.meanings.join("、")}`).join("；");
  }
  return text.split(/[；;，,、]/).map((item) => item.trim()).filter(Boolean).slice(0, maxMeanings).join("；");
}

function renderCard() {
  const group = activeQueue[activeIndex];
  const usesBasicFormLayout = ACTIVE_VOCAB_KEY === "basic";
  const progress = getProgress(group.id);
  meaningSequenceToken += 1;
  meaningRevealed = false;
  els.trainerMode.textContent = activeSessionType === "weak" ? "薄弱词训练" : (progress.seen ? "复习" : "新学");
  els.trainerProgress.textContent = `${activeIndex + 1} / ${activeQueue.length}`;
  const status = getProgressStatus(progress);
  els.cardTag.textContent = group.forms.length ? `核心词 · ${status} · ${group.forms.length} 个变形` : `核心词 · ${status}`;
  const chunks = getWordSyllables(group.core);
  els.cardWord.innerHTML = renderSplitWord(chunks);
  els.cardSplitMemory.innerHTML = renderExternalPhonetics(group.core);
  els.cardMeta.innerHTML = renderMetaLine(group.core.pos, group.core.frequency);
  els.cardMeaning.textContent = "先在心里回忆释义，再点击查看";
  els.cardMeaning.classList.add("meaning-hidden");
  els.revealMeaning.classList.remove("hidden");
  setRatingEnabled(false);
  els.cardForms.innerHTML = group.forms.map((form) => usesBasicFormLayout ? `
    <button class="form-flip-card basic-form-card" type="button" aria-pressed="false" title="点击翻转查看英文">
      <span class="form-face form-front">
        <strong>${escapeHtml(form.pos || "考查形式")}</strong>
        ${form.grammar ? `<small class="form-grammar">${escapeHtml(form.grammar)}</small>` : ""}
        <span class="form-meaning">${escapeHtml(compactCardMeaning(form.meaning, 3))}</span>
      </span>
      <span class="form-face form-back">
        <strong>${escapeHtml(form.word || "")}</strong>
      </span>
    </button>
  ` : `
    <button class="form-flip-card" type="button" aria-pressed="false" title="点击翻转">
      <span class="form-face form-front">
        <strong>${escapeHtml(form.pos || "变形词")}</strong>
        <small>${renderFormFrequency(form.frequency)}</small>
      </span>
      <span class="form-face form-back">
        <strong>${escapeHtml(form.word || "")}</strong>
        <span class="form-meaning">${escapeHtml(form.meaning || "释义未标注")}</span>
        <small>${renderFormFrequency(form.frequency)}</small>
      </span>
    </button>
  `).join("");
  setDiagnosticWord(group?.core?.word || "");
  prefetchTrainerAudio(activeIndex);
}

function revealMeaning() {
  const group = activeQueue[activeIndex];
  if (!group) return;
  meaningRevealed = true;
  els.cardMeaning.textContent = group.core.meaning || "";
  els.cardMeaning.classList.remove("meaning-hidden");
  els.revealMeaning.classList.add("hidden");
  setRatingEnabled(true);
  playMeaningSequence(group);
}

function setRatingEnabled(enabled) {
  document.querySelectorAll(".answer-row button[data-rating]").forEach((button) => {
    button.disabled = !enabled;
  });
}

function rateCurrent(rating) {
  const group = activeQueue[activeIndex];
  if (!group || !meaningRevealed) return;
  const progress = getProgress(group.id);
  const firstLearning = !progress.seen;
  const learningDate = todayKey();
  const reviewBaseDate = firstLearning ? learningDate : activeDate;
  const reviewAlreadyCountedToday = progress.lastReviewSuccessDate === reviewBaseDate;
  progress.seen = true;
  progress.lastDate = reviewBaseDate;
  if (firstLearning) {
    progress.firstLearnDate = learningDate;
    scheduleExtraReviews(learningDate, group.id, REVIEW_OFFSETS);
  }
  progress.total = (progress.total || 0) + 1;
  progress[rating] = (progress[rating] || 0) + 1;
  if (rating === "good") {
    if (!firstLearning && !reviewAlreadyCountedToday) {
      progress.streak = (progress.streak || 0) + 1;
      progress.lastReviewSuccessDate = reviewBaseDate;
    } else if (firstLearning && progress.streak === undefined) {
      progress.streak = 0;
    }
  } else {
    progress.streak = 0;
    delete progress.lastReviewSuccessDate;
  }
  progress.mastered = (progress.streak || 0) >= 4;

  if (rating === "again") {
    progress.weak = true;
    insertImmediateReview(group);
    scheduleExtraReviews(reviewBaseDate, group.id, [1, 2, 4]);
  }
  if (rating === "hard") {
    progress.weak = true;
    scheduleExtraReviews(reviewBaseDate, group.id, [1, 3]);
  }
  if (rating === "good") {
    progress.weak = !progress.mastered && ((progress.again || 0) + (progress.hard || 0) + (progress.testWrong || 0) > 0);
    if (progress.mastered) {
      removeFutureExtraReviews(group.id, reviewBaseDate);
    } else {
      scheduleExtraReviews(reviewBaseDate, group.id, progress.streak >= 2 ? [7] : [4]);
    }
  }

  state.progress[group.id] = progress;
  activeIndex += 1;
  if (activeIndex >= activeQueue.length) {
    clearTrainingSession();
    saveState();
    els.trainer.classList.add("hidden");
    const quizGroups = unique(activeQueue.map((item) => item.id)).map((id) => getGroup(id)).filter(Boolean);
    showTestReady(quizGroups, activeDate);
    return;
  }
  saveTrainingSession();
  saveState();
  renderCard();
  renderSummary();
}

function showTestReady(groups, key) {
  enterLearningFocus();
  pendingQuizGroups = groups;
  pendingQuizDate = key;
  const questionCount = buildQuiz(groups).length;
  els.quiz.classList.add("hidden");
  els.testReady.classList.remove("hidden");
  if (activeSessionType === "weak") {
    els.testReadyMode.textContent = "薄弱词训练完成";
    els.testReadyTitle.textContent = "薄弱词已经过完一轮，做个小检测收尾吧";
    els.testReadyMeta.textContent = `本次将检测 ${groups.length} 个薄弱核心词，约 ${questionCount} 题。`;
    els.startPendingQuiz.textContent = "开始薄弱词检测";
  } else {
    els.testReadyMode.textContent = "学习与复习完成";
    els.testReadyTitle.textContent = "今天的内容已经学完，开始检测吧";
    els.testReadyMeta.textContent = `检测会覆盖刚刚学习和复习过的 ${groups.length} 个核心词，约 ${questionCount} 题。`;
    els.startPendingQuiz.textContent = "开始当日检测";
  }
  els.testReady.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startDailyQuiz(groups, key) {
  quizQueue = buildQuiz(groups);
  quizIndex = 0;
  quizAnswers = [];
  activeDate = key;
  quizLocked = false;
  stopMemoryDrill();
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  els.testReady.classList.add("hidden");
  if (!quizQueue.length) {
    if (activeSessionType !== "weak") state.completedDates[key] = true;
    saveState();
    renderAll();
    if (activeSessionType !== "weak") showCompletionAnimation(key, 100);
    exitLearningFocus();
    return;
  }
  els.quiz.classList.remove("hidden");
  els.quizResult.classList.add("hidden");
  els.quizCard.classList.remove("hidden");
  els.quiz.scrollIntoView({ behavior: "smooth", block: "start" });
  renderQuizQuestion();
}

function enterLearningFocus() {
  document.body.classList.add("learning-focus");
}

function exitLearningFocus() {
  document.body.classList.remove("learning-focus");
  document.querySelector(".workbench")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function trainingSessionKey(type = activeSessionType, key = activeDate) {
  return `${type}:${key}`;
}

function getTrainingSession(type, key) {
  const session = state.trainingSessions?.[trainingSessionKey(type, key)];
  if (!session || !Array.isArray(session.queueIds) || !session.queueIds.length) return null;
  const index = Number(session.index);
  if (!Number.isInteger(index) || index < 0 || index >= session.queueIds.length) return null;
  return session;
}

function saveTrainingSession() {
  state.trainingSessions ||= {};
  state.trainingSessions[trainingSessionKey()] = {
    queueIds: activeQueue.map((group) => group.id),
    index: activeIndex,
    updatedAt: new Date().toISOString(),
  };
  state.lastTrainingSession = {
    type: activeSessionType,
    key: activeDate,
  };
}

function clearTrainingSession() {
  clearTrainingSessionByKey(activeSessionType, activeDate);
}

function clearTrainingSessionByKey(type, key) {
  if (!state.trainingSessions) return;
  delete state.trainingSessions[trainingSessionKey(type, key)];
  if (state.lastTrainingSession?.type === type && state.lastTrainingSession?.key === key) {
    delete state.lastTrainingSession;
  }
}

function resumeInterruptedLearningIfNeeded() {
  if (document.body.classList.contains("auth-locked")) return;
  if (!state.lastTrainingSession || !els.trainer.classList.contains("hidden")) return;
  const { type, key } = state.lastTrainingSession;
  if (!type || !key) return;
  const savedSession = getTrainingSession(type, key);
  if (!savedSession) {
    delete state.lastTrainingSession;
    saveState();
    return;
  }
  activeSessionType = type;
  activeDate = key;
  state.selectedDate = key;
  calendarMonth = startOfMonth(parseDate(key));
  activeQueue = savedSession.queueIds.map((id) => getGroup(id)).filter(Boolean);
  if (!activeQueue.length) {
    clearTrainingSessionByKey(type, key);
    saveState();
    return;
  }
  activeIndex = Math.min(savedSession.index, Math.max(activeQueue.length - 1, 0));
  enterLearningFocus();
  els.testReady.classList.add("hidden");
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  els.trainer.classList.remove("hidden");
  renderAll();
  renderCard();
  window.setTimeout(() => {
    els.trainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);
}

function buildQuiz(groups) {
  const quizGroups = groups.slice(0, 40);
  const answerSlots = buildBalancedAnswerSlots(quizGroups.length);
  const kinds = ["collocation-choice", "word-form-choice", "word-to-meaning", "meaning-to-word"];
  const kindCounts = Object.fromEntries(kinds.map((kind) => [kind, 0]));
  return quizGroups.map((group, index) => {
    const balancedKinds = kinds
      .map((kind, priority) => ({ kind, priority }))
      .sort((a, b) => kindCounts[a.kind] - kindCounts[b.kind] || a.priority - b.priority)
      .map((item) => item.kind);
    const question = buildQuizQuestion(group, answerSlots[index], balancedKinds, index);
    if (question) kindCounts[question.kind] += 1;
    return question;
  }).filter(Boolean);
}

function buildMeaningOptions(group, correctMeaning, answerSlot = 0) {
  const distractors = GROUPS
    .filter((item) => item.id !== group.id)
    .map((item) => getQuizMeaning(item))
    .filter((meaning) => meaning && meaning !== correctMeaning)
    .filter((meaning, index, list) => list.indexOf(meaning) === index)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = distractors.slice(0, 3);
  options.splice(Math.max(0, Math.min(3, answerSlot)), 0, correctMeaning);
  return options;
}

function buildQuizQuestion(group, answerSlot = 0, preferredKinds = [], index = 0) {
  const builders = {
    "word-to-meaning": () => buildWordToMeaningQuestion(group, answerSlot),
    "meaning-to-word": () => buildMeaningToWordQuestion(group, answerSlot),
    "collocation-choice": () => buildCollocationQuestion(group, answerSlot),
    "word-form-choice": () => buildWordFormQuestion(group, answerSlot, index),
  };
  const fallbackOrder = [
    ...(Array.isArray(preferredKinds) ? preferredKinds : [preferredKinds]),
    "collocation-choice",
    "word-form-choice",
    "word-to-meaning",
    "meaning-to-word",
  ];
  for (const kind of unique(fallbackOrder)) {
    const question = builders[kind]?.();
    if (question) return question;
  }
  return null;
}

function buildWordToMeaningQuestion(group, answerSlot) {
  const correct = getQuizMeaning(group);
  return {
    kind: "word-to-meaning",
    group,
    prompt: group.core.word,
    hint: "请选择对应的中文释义",
    correct,
    options: buildMeaningOptions(group, correct, answerSlot),
  };
}

function buildMeaningToWordQuestion(group, answerSlot) {
  return {
    kind: "meaning-to-word",
    group,
    prompt: getQuizMeaning(group),
    hint: "请选择对应的英文单词",
    correct: group.core.word,
    options: buildWordOptions(group, group.core.word, answerSlot),
  };
}

function buildCollocationQuestion(group, answerSlot) {
  const collocation = getCollocationPrompt(group);
  if (!collocation) return null;
  return {
    kind: "collocation-choice",
    group,
    prompt: collocation.prompt,
    hint: `中文：${collocation.meaning}`,
    correct: collocation.answer,
    options: buildCollocationOptions(collocation.answer, answerSlot),
  };
}

function buildWordFormQuestion(group, answerSlot, index) {
  const allForms = (group.forms || []).filter((form) => form.word && form.pos && form.meaning);
  if (!allForms.length) return null;
  const conciseForms = allForms.filter((form) => !form.pos.includes("/") && form.meaning.length <= 72);
  const forms = conciseForms.length ? conciseForms : allForms;
  const form = forms[index % forms.length];
  return {
    kind: "word-form-choice",
    group,
    prompt: summarizeQuizMeaning(form.meaning),
    hint: `词性：${form.pos} · 请选择对应的考查形式`,
    correct: form.word,
    options: buildFormWordOptions(group, form, answerSlot),
  };
}

function buildWordOptions(group, correctWord, answerSlot = 0) {
  const distractors = GROUPS
    .filter((item) => item.id !== group.id)
    .map((item) => item.core.word)
    .filter(Boolean)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = distractors.slice(0, 3);
  const insertAt = Math.max(0, Math.min(3, answerSlot));
  options.splice(insertAt, 0, correctWord || group.core.word);
  return options;
}

function buildFormWordOptions(group, correctForm, answerSlot = 0) {
  const targetPos = String(correctForm.pos || "").split("/")[0].trim();
  const distractors = GROUPS
    .flatMap((item) => (item.forms || []).map((form) => ({ groupId: item.id, ...form })))
    .filter((form) => form.groupId !== group.id && form.word && form.word !== correctForm.word)
    .filter((form) => !targetPos || String(form.pos || "").includes(targetPos))
    .map((form) => form.word)
    .filter((word, index, list) => list.indexOf(word) === index)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  if (distractors.length < 3) {
    GROUPS.map((item) => item.core.word)
      .filter((word) => word && word !== correctForm.word && !distractors.includes(word))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 - distractors.length)
      .forEach((word) => distractors.push(word));
  }
  const options = distractors.slice(0, 3);
  options.splice(Math.max(0, Math.min(3, answerSlot)), 0, correctForm.word);
  return options;
}

function buildCollocationOptions(correctAnswer, answerSlot = 0) {
  const functionWords = ["in", "on", "of", "to", "for", "from", "with", "at", "as", "about"];
  const contentWords = ["change", "take", "care", "look", "make", "work", "plan", "believe", "find", "give", "learn", "keep", "try"];
  const pool = functionWords.includes(String(correctAnswer).toLowerCase()) ? functionWords : contentWords;
  const distractors = shuffle(pool.filter((word) => normalizeAnswer(word) !== normalizeAnswer(correctAnswer))).slice(0, 3);
  const options = distractors.slice(0, 3);
  options.splice(Math.max(0, Math.min(3, answerSlot)), 0, correctAnswer);
  return options;
}

function buildBalancedAnswerSlots(count) {
  const slots = [];
  while (slots.length < count) {
    slots.push(0, 1, 2, 3);
  }
  return shuffle(slots.slice(0, count));
}

function getCollocationPrompt(group) {
  const collocations = normalizeCollocations(group);
  return collocations[0] || null;
}

function maskWordInPhrase(phrase, word) {
  const escaped = String(word || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(`\\b${escaped}\\b`, "i");
  if (matcher.test(phrase)) return String(phrase).replace(matcher, "_____");
  return `${String(phrase || "").trim()}  _____`;
}

function normalizeCollocations(group) {
  const word = String(group?.core?.word || "").trim().toLowerCase();
  const rawItems = [
    ...(ACTIVE_VOCAB_KEY === "basic" ? BASIC_QUIZ_COLLOCATIONS[word] || [] : []),
    ...(group?.core?.collocations || []),
    ...(group?.core?.phrases || []),
    ...(group?.collocations || []),
    ...(group?.phrases || []),
  ].filter(Boolean);
  return rawItems.map((item) => normalizeCollocationItem(item, group)).filter(Boolean);
}

function normalizeCollocationItem(item, group) {
  const fallbackMeaning = getQuizMeaning(group);
  const fallbackAnswer = group?.core?.word || "";
  if (typeof item === "string") {
    return {
      prompt: maskWordInPhrase(item, fallbackAnswer),
      meaning: fallbackMeaning,
      answer: fallbackAnswer,
    };
  }
  const cloze = String(item.cloze || item.prompt || "").trim();
  const phrase = String(item.phrase || item.text || "").trim();
  const answer = String(item.answer || fallbackAnswer).trim();
  const meaning = summarizeQuizMeaning(item.meaning || item.translation || fallbackMeaning);
  const prompt = cloze || (phrase ? maskWordInPhrase(phrase, answer) : "");
  if (!prompt || !answer || !meaning) return null;
  return { prompt, meaning, answer };
}

function getQuizMeaning(group) {
  const word = String(group?.core?.word || "").trim().toLowerCase();
  const meaning = word && QUIZ_MEANING_OVERRIDES[word]
    ? QUIZ_MEANING_OVERRIDES[word]
    : group?.core?.meaning;
  return summarizeQuizMeaning(meaning);
}

function summarizeQuizMeaning(value) {
  return summarizePrestudyMeaning(value, "", 2).meaning;
}

function renderQuizQuestion() {
  const question = quizQueue[quizIndex];
  const typeLabels = {
    "word-to-meaning": "英译中选择",
    "meaning-to-word": "中译英选择",
    "collocation-choice": "固定搭配挖空选择",
    "word-form-choice": "词性与派生词选择",
  };
  quizLocked = false;
  els.quizProgress.textContent = `${quizIndex + 1} / ${quizQueue.length}`;
  els.quizMode.textContent = "当日检测";
  els.quizPrompt.textContent = question.prompt;
  els.quizType.textContent = typeLabels[question.kind] || "选择题";
  els.quizHint.textContent = question.hint || "";
  els.quizFeedback.textContent = "";
  els.nextQuestion.classList.add("hidden");
  els.quizOptions.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.answer = option;
    button.textContent = option;
    els.quizOptions.appendChild(button);
  });
}

function submitQuizAnswer(answer) {
  if (quizLocked) return;
  const question = quizQueue[quizIndex];
  const normalizedAnswer = normalizeAnswer(answer);
  const normalizedCorrect = normalizeAnswer(question.correct);
  const correct = normalizedAnswer === normalizedCorrect;
  quizLocked = true;

  quizAnswers.push({
    groupId: question.group.id,
    word: question.group.core.word,
    meaning: getQuizMeaning(question.group),
    kind: question.kind,
    answer,
    correctAnswer: question.correct,
    correct,
  });

  if (!correct) {
    const progress = getProgress(question.group.id);
    progress.testWrong = (progress.testWrong || 0) + 1;
    progress.streak = 0;
    delete progress.lastReviewSuccessDate;
    progress.mastered = false;
    progress.weak = true;
    state.progress[question.group.id] = progress;
    scheduleExtraReviews(activeDate, question.group.id, [1, 2]);
  }

  els.quizFeedback.textContent = correct ? "回答正确" : `正确答案：${question.correct}`;
  els.nextQuestion.textContent = quizIndex + 1 >= quizQueue.length ? "查看结果" : "下一题";
  els.nextQuestion.classList.remove("hidden");
  saveState();
}

function nextQuizQuestion() {
  if (quizIndex + 1 >= quizQueue.length) {
    finishQuiz();
    return;
  }
  quizIndex += 1;
  renderQuizQuestion();
}

function finishQuiz() {
  const wrong = quizAnswers.filter((item) => !item.correct);
  const score = quizAnswers.length ? Math.round(((quizAnswers.length - wrong.length) / quizAnswers.length) * 100) : 0;
  const completedCalendarDay = activeSessionType !== "weak";
  if (completedCalendarDay) state.completedDates[activeDate] = true;
  state.quizResults ||= {};
  state.quizResults[activeDate] = {
    total: quizAnswers.length,
    wrong: wrong.length,
    score,
    finishedAt: new Date().toISOString(),
  };
  saveState();
  renderAll();
  els.quizCard.classList.add("hidden");
  els.quizResult.classList.add("hidden");
  if (wrong.length) {
    showMemoryBoost(wrong, score);
    return;
  }
  closeMemoryFlows();
  exitLearningFocus();
  if (completedCalendarDay) showCompletionAnimation(activeDate, score);
  return;

  els.quizCard.classList.add("hidden");
  els.quizResult.classList.remove("hidden");
  els.quizScore.textContent = `${score}%`;
  els.quizWrongCount.textContent = wrong.length;
  els.quizWrongList.innerHTML = wrong.length
    ? wrong.map((item) => `
      <div class="task-item">
        <strong>${escapeHtml(item.word)}</strong>
        <span>${escapeHtml(item.meaning)}</span>
        <span>你的答案：${escapeHtml(item.answer || "未作答")}；正确答案：${escapeHtml(item.correctAnswer)}</span>
      </div>
    `).join("")
    : `<div class="task-item"><strong>全部正确</strong><span>今天的检测已完成。</span></div>`;
  renderAll();
  if (completedCalendarDay) showCompletionAnimation(activeDate, score);
}

function showMemoryBoost(wrongItems, score) {
  memoryBoostWrongItems = uniqueBy(wrongItems, (item) => item.groupId);
  memoryBoostIndex = -1;
  stopMemoryDrill();
  els.quiz.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  els.memoryBoost.classList.remove("hidden");
  els.memoryBoostTitle.textContent = score >= 80 ? "这些词再压一轮，记忆会更稳" : "今天先把错词钉牢，明天会轻松很多";
  els.memoryBoostMeta.textContent = `本轮共有 ${memoryBoostWrongItems.length} 个错词，点一个词进去，给它 15 秒强记时间。`;
  els.memoryBoostList.innerHTML = memoryBoostWrongItems.map((item, index) => `
    <button class="memory-boost-item" type="button" data-memory-index="${index}">
      <strong>${escapeHtml(item.word)}</strong>
      <span>${escapeHtml(getPrimaryMeaning(item.meaning))}</span>
      <span>点击开始 15 秒强记</span>
    </button>
  `).join("");
  els.memoryBoostList.querySelectorAll("[data-memory-index]").forEach((button) => {
    button.addEventListener("click", () => openMemoryDrill(Number(button.dataset.memoryIndex)));
  });
  els.memoryBoost.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openMemoryDrill(index) {
  const item = memoryBoostWrongItems[index];
  if (!item) return;
  memoryBoostIndex = index;
  stopMemoryDrill();
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.remove("hidden");
  els.memoryDrillWord.textContent = item.word;
  els.memoryDrillBar.style.width = "0%";
  els.memoryDrillCountdown.textContent = "0/0";
  els.memoryStage.innerHTML = "";
  prepareWordAudio(item.word);
  const runToken = ++memoryDrillRunToken;
  runMemoryDrillSequence(item, runToken);
  memoryDrillTimer = window.setTimeout(() => {
    els.memoryDrillBar.style.width = "100%";
    els.memoryDrillCountdown.textContent = "完成";
    stopMemoryDrill(true);
  }, MEMORY_DRILL_DURATION);
  els.memoryDrill.scrollIntoView({ behavior: "smooth", block: "start" });
}

function revealMemoryChip(word, meaning, stepIndex) {
  const chip = document.createElement("div");
  const pos = stepIndex % MEMORY_DRILL_POSITIONS;
  const size = stepIndex % 3;
  chip.className = `memory-chip pos-${pos} size-${size}`;
  chip.innerHTML = `
    <span class="memory-chip-word">${escapeHtml(word)}</span>
    <span class="memory-chip-meaning">${escapeHtml(meaning)}</span>
  `;
  els.memoryStage.appendChild(chip);
}

async function runMemoryDrillSequence(item, runToken) {
  const total = getMemoryDrillRepetitions(item.word);
  els.memoryDrillCountdown.textContent = `0/${total}`;
  for (let stepIndex = 0; stepIndex < total; stepIndex += 1) {
    if (runToken !== memoryDrillRunToken) return;
    revealMemoryChip(item.word, getPrimaryMeaning(item.meaning), stepIndex);
    els.memoryDrillBar.style.width = `${Math.round((stepIndex / total) * 100)}%`;
    els.memoryDrillCountdown.textContent = `${stepIndex + 1}/${total}`;
    await speakWordFully(item.word, runToken);
    if (runToken !== memoryDrillRunToken) return;
    await waitForMemoryStepGap(runToken);
  }
  if (runToken !== memoryDrillRunToken) return;
  els.memoryDrillBar.style.width = "100%";
  els.memoryDrillCountdown.textContent = "完成";
  if (memoryDrillTimer) {
    window.clearTimeout(memoryDrillTimer);
    memoryDrillTimer = null;
  }
}

function getMemoryDrillRepetitions(word) {
  const clean = normalizeSpeechText(word).replace(/\s+/g, "");
  const length = clean.length || 8;
  return Math.max(MEMORY_DRILL_MIN_REPETITIONS, Math.min(MEMORY_DRILL_MAX_REPETITIONS, 20 - length));
}

function waitForMemoryStepGap(runToken) {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      resolve();
    }, 100);
    memoryDrillRevealTimers.push(timer);
    if (runToken !== memoryDrillRunToken) {
      window.clearTimeout(timer);
      resolve();
    }
  });
}

async function speakWordFully(word, runToken) {
  if (runToken !== memoryDrillRunToken) return;
  const key = String(word || "").trim().toLowerCase();
  const preparedAudio = audioPlayerCache[key];
  const preparedSrc = preparedAudio?.currentSrc || preparedAudio?.src || "";
  const cachedUrl = preparedSrc || audioCache[key] || buildUniversalAudioUrl(word);
  if (cachedUrl && typeof Audio === "function") {
    const played = await playAudioAndWait(cachedUrl, runToken);
    if (played) return;
  }
  await speakWithBrowserAndWait(word, runToken);
}

function playAudioAndWait(src, runToken) {
  return new Promise((resolve) => {
    if (!src || typeof Audio !== "function" || runToken !== memoryDrillRunToken) {
      resolve(false);
      return;
    }
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.playbackRate = 1;
    let settled = false;
    const timer = window.setTimeout(() => finish(true), 5000);
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      audio.onended = null;
      audio.onerror = null;
      resolve(ok);
    };
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    memoryDrillRevealTimers.push(timer);
    audio.play().catch(() => finish(false));
  });
}

function speakWithBrowserAndWait(word, runToken) {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window) || runToken !== memoryDrillRunToken) {
      resolve();
      return;
    }
    const text = normalizeSpeechText(word);
    if (!text) {
      resolve();
      return;
    }
    primeSpeechSynthesis();
    const synth = window.speechSynthesis;
    const options = buildSpeechAttempt(0);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang;
    utterance.rate = options.rate;
    utterance.pitch = 1;
    if (options.voice) utterance.voice = options.voice;
    let settled = false;
    const timer = window.setTimeout(() => {
      synth.cancel();
      finish();
    }, 4500);
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    memoryDrillRevealTimers.push(timer);
    synth.cancel();
    synth.resume();
    synth.speak(utterance);
  });
}

function stopMemoryDrill(keepStage = false) {
  memoryDrillRunToken += 1;
  if (memoryDrillTimer) {
    window.clearTimeout(memoryDrillTimer);
    memoryDrillTimer = null;
  }
  if (memoryDrillInterval) {
    window.clearInterval(memoryDrillInterval);
    memoryDrillInterval = null;
  }
  memoryDrillRevealTimers.forEach((timer) => window.clearTimeout(timer));
  memoryDrillRevealTimers = [];
  if (!keepStage) {
    els.memoryStage.innerHTML = "";
    els.memoryDrillBar.style.width = "0%";
    els.memoryDrillCountdown.textContent = "0/0";
  }
}

function closeMemoryFlows() {
  stopMemoryDrill();
  memoryBoostWrongItems = [];
  memoryBoostIndex = -1;
  els.quiz.classList.add("hidden");
  els.memoryBoost.classList.add("hidden");
  els.memoryDrill.classList.add("hidden");
  exitLearningFocus();
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function hashDateKey(key) {
  return String(key || "").split("").reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 7), 0);
}

function completeDayColor(key) {
  return COMPLETE_COLORS[hashDateKey(key) % COMPLETE_COLORS.length];
}

function getDailyEncouragement(key, score = 100) {
  const base = ENCOURAGEMENTS[hashDateKey(key) % ENCOURAGEMENTS.length];
  if (score >= 90) return `${base} 正确率很漂亮，继续把这种感觉留住。`;
  if (score >= 70) return `${base} 错的地方正好是明天提分的入口。`;
  return `${base} 今天先把问题照出来，下一轮就能更准。`;
}

function renderDayIllustration(key) {
  const index = getIllustrationIndex(key);
  const src = COMPLETION_ILLUSTRATIONS[index];
  return `
    <span class="completion-sticker" style="--sticker-bg:${completeDayColor(key)};" aria-hidden="true">
      <img src="${src}" alt="">
    </span>
  `;
}

function getIllustrationIndex(key) {
  return hashDateKey(key) % COMPLETION_ILLUSTRATIONS.length;
}

function showCompletionAnimation(key, score) {
  if (completionReturnTimer) window.clearTimeout(completionReturnTimer);
  if (completionDropTimer) window.clearTimeout(completionDropTimer);
  els.tearOverlay.classList.add("hidden");
  exitLearningFocus();
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.classList.remove("home-return-drop");
  completionReturnTimer = window.setTimeout(() => {
    document.body.classList.add("home-return-drop");
    completionDropTimer = window.setTimeout(() => {
      document.body.classList.remove("home-return-drop");
      logoutUser();
    }, 900);
  }, 3000);
}

function getDayPlan(key) {
  return state.plan?.[key] || { new: [], review: [] };
}

function getCarryoverNewIds(key) {
  if (!state.plan) return [];
  return Object.keys(state.plan)
    .filter((date) => date < key)
    .sort()
    .flatMap((date) => state.plan[date].new || [])
    .filter((id) => !getProgress(id).seen);
}

function getEffectiveNewIds(key) {
  const dailyLimit = state.dailyCount || 30;
  const carryover = getCarryoverNewIds(key);
  const planned = getDayPlan(key).new.filter((id) => !getProgress(id).seen);
  return unique([...carryover, ...planned]).slice(0, dailyLimit);
}

function isReviewEligible(id) {
  const progress = getProgress(id);
  return Boolean(progress.seen && !progress.mastered);
}

function getDueReviewIds(key) {
  const legacyReviews = getDayPlan(key).review.filter((id) => {
    const progress = getProgress(id);
    return isReviewEligible(id) && !progress.firstLearnDate;
  });
  const actualDateReviews = getExtraReviews(key).filter((id) => isReviewEligible(id));
  return unique([...legacyReviews, ...actualDateReviews]);
}

function getProgress(id) {
  state.progress ||= {};
  return state.progress[id] || {};
}

function insertImmediateReview(group) {
  const insertAt = Math.min(activeIndex + AGAIN_REQUEUE_DISTANCE, activeQueue.length);
  activeQueue.splice(insertAt, 0, group);
}

function scheduleExtraReviews(fromKey, id, offsets) {
  offsets.forEach((offset) => {
    addExtraReview(dateKey(addDays(parseDate(fromKey), offset)), id);
  });
}

function addExtraReview(key, id) {
  state.extraReviews ||= {};
  state.extraReviews[key] ||= [];
  if (!state.extraReviews[key].includes(id)) state.extraReviews[key].push(id);
}

function getExtraReviews(key) {
  return state.extraReviews?.[key] || [];
}

function removeFutureExtraReviews(id, fromKey) {
  if (!state.extraReviews) return;
  Object.keys(state.extraReviews).forEach((key) => {
    if (key < fromKey) return;
    state.extraReviews[key] = state.extraReviews[key].filter((item) => item !== id);
    if (!state.extraReviews[key].length) delete state.extraReviews[key];
  });
}

function getWeakGroupIds() {
  return Object.entries(state.progress || {})
    .filter(([, progress]) => isWeakProgress(progress))
    .sort(([, a], [, b]) => getWeakScore(b) - getWeakScore(a))
    .map(([id]) => id);
}

function isWeakProgress(progress) {
  if (!progress || progress.mastered) return false;
  return Boolean(progress.weak || (progress.again || 0) + (progress.hard || 0) + (progress.testWrong || 0) > 0);
}

function getWeakScore(progress) {
  return (progress.again || 0) * 3 + (progress.testWrong || 0) * 2 + (progress.hard || 0) - (progress.good || 0);
}

function getProgressStatus(progress) {
  if (progress.mastered) return "已掌握";
  if (isWeakProgress(progress)) return "薄弱";
  if (progress.seen) return "学习中";
  return "新词";
}

function getGroup(id) {
  return GROUPS.find((group) => group.id === id);
}

function setDailyActive(count) {
  els.dailyOptions.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.count) === Number(count));
  });
}

function countRows() {
  return GROUPS.reduce((sum, group) => sum + 1 + group.forms.length, 0);
}

function loadState() {
  const fallback = {
    startDate: todayKey(),
    selectedDate: todayKey(),
    dailyCount: 30,
    plan: null,
    progress: {},
    extraReviews: {},
    completedDates: {},
    trainingSessions: {},
    preStudyChecks: {},
  };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleCloudSave();
}

async function initializeCloudSync(code) {
  cloudSyncReady = false;
  const localStateBeforeCloud = { ...loadStateFallback(), ...state };
  try {
    const cloudPayload = await callCloudFunction("load_vocab_progress", { p_login_code: code });
    const cloudState = selectActiveCloudState(cloudPayload);
    if (cloudState && typeof cloudState === "object") {
      const needsInitialization = isFirstLoginState(cloudState);
      if (needsInitialization) {
        if (hasLearningActivity(localStateBeforeCloud)) {
          state = localStateBeforeCloud;
        } else {
          state = { ...loadStateFallback(), ...cloudState };
          resetStateToToday();
          buildPlan();
        }
      } else {
        state = { ...loadStateFallback(), ...cloudState };
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      calendarMonth = startOfMonth(parseDate(state.selectedDate || todayKey()));
      activeDate = state.selectedDate || todayKey();
      els.startDate.value = state.startDate || todayKey();
      setDailyActive(state.dailyCount || 30);
      renderAll();
      resumeInterruptedLearningIfNeeded();
      if (needsInitialization) await saveStateToCloud(code);
    } else {
      cloudStateEnvelope ||= createCloudEnvelope();
      if (hasLearningActivity(localStateBeforeCloud)) {
        state = localStateBeforeCloud;
      } else {
        resetStateToToday();
        buildPlan();
      }
      await saveStateToCloud(code);
    }
    cloudSyncReady = true;
  } catch (error) {
    console.warn("云端同步暂不可用，已继续使用本地记录。", error);
    cloudSyncReady = false;
  }
}

function createCloudEnvelope() {
  return {
    schemaVersion: 2,
    vocabStates: {},
  };
}

function selectActiveCloudState(payload) {
  if (payload?.schemaVersion === 2 && payload?.vocabStates && typeof payload.vocabStates === "object") {
    cloudStateEnvelope = payload;
    return payload.vocabStates[ACTIVE_VOCAB_KEY] || null;
  }
  cloudStateEnvelope = createCloudEnvelope();
  if (payload && typeof payload === "object") {
    cloudStateEnvelope.vocabStates.high = payload;
  }
  return ACTIVE_VOCAB_KEY === "high" ? payload : null;
}

function scheduleCloudSave() {
  if (!cloudSyncReady) return;
  const code = normalizeLoginCode(localStorage.getItem(LOGIN_CODE_STORAGE_KEY) || "");
  if (!LOGIN_CODES.includes(code)) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(() => {
    saveStateToCloud(code).catch((error) => {
      console.warn("云端保存失败，本地记录仍然有效。", error);
    });
  }, 500);
}

async function saveStateToCloud(code) {
  cloudStateEnvelope ||= createCloudEnvelope();
  cloudStateEnvelope = {
    ...cloudStateEnvelope,
    schemaVersion: 2,
    vocabStates: {
      ...(cloudStateEnvelope.vocabStates || {}),
      [ACTIVE_VOCAB_KEY]: state,
    },
  };
  await callCloudFunction("save_vocab_progress", {
    p_login_code: code,
    p_state: cloudStateEnvelope,
  });
}

async function callCloudFunction(functionName, body) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  let response;
  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
  if (!response.ok) {
    throw new Error(`Supabase ${functionName} failed: ${response.status}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function loadStateFallback() {
  return {
    startDate: todayKey(),
    selectedDate: todayKey(),
    dailyCount: 30,
    plan: null,
    progress: {},
    extraReviews: {},
    completedDates: {},
    trainingSessions: {},
    preStudyChecks: {},
  };
}

function isFirstLoginState(cloudState) {
  const hasProgress = Object.keys(cloudState?.progress || {}).length > 0;
  const hasPlan = Boolean(cloudState?.plan && Object.keys(cloudState.plan).length);
  const hasCompletion = Object.keys(cloudState?.completedDates || {}).length > 0;
  return !hasProgress && !hasPlan && !hasCompletion;
}

function hasLearningActivity(candidate) {
  if (!candidate || typeof candidate !== "object") return false;
  if (Object.keys(candidate.progress || {}).length) return true;
  if (Object.keys(candidate.completedDates || {}).length) return true;
  if (Object.keys(candidate.trainingSessions || {}).length) return true;
  if (Object.keys(candidate.quizResults || {}).length) return true;
  return Object.values(candidate.preStudyChecks || {}).some((check) =>
    check?.completed || Object.keys(check?.decisions || {}).length > 0);
}

function resetStateToToday() {
  state = {
    ...loadStateFallback(),
    dailyCount: state.dailyCount || 30,
  };
  els.startDate.value = todayKey();
}

function todayKey() {
  return dateKey(new Date());
}

function parseDate(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function addMonths(date, amount) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatDateLabel(key) {
  const date = parseDate(key);
  const weekday = "日一二三四五六"[date.getDay()];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 周${weekday}`;
}

function unique(items) {
  return [...new Set(items)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function normalizeAnswer(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function getPrimaryMeaning(value) {
  return String(value || "")
    .split(/[，,；;]/)
    .map((item) => item.trim())
    .find(Boolean) || String(value || "").trim();
}

function splitWordForMemory(word) {
  const clean = String(word || "").trim();
  const lower = clean.toLowerCase();
  if (clean.length <= 4) return [clean];

  const cuts = [];
  let seenFirstVowel = false;
  for (let index = 0; index < lower.length; index += 1) {
    if (!"aeiou".includes(lower[index])) continue;
    if (!seenFirstVowel) {
      seenFirstVowel = true;
      continue;
    }
    const cut = index - 1;
    if (cut > 0 && !"aeiou".includes(lower[cut]) && !cuts.includes(cut)) {
      cuts.push(cut);
    }
  }

  if (!cuts.length) return [clean];
  cuts.sort((a, b) => a - b);
  const chunks = [];
  let start = 0;
  cuts.forEach((cut) => {
    if (cut > start) chunks.push(clean.slice(start, cut));
    start = cut;
  });
  if (start < clean.length) chunks.push(clean.slice(start));
  return chunks.filter(Boolean);
}

function splitByCommonSuffix(word) {
  const lower = word.toLowerCase();
  const suffixes = ["tion", "sion", "cian", "ture", "ment", "ness", "less", "ful", "able", "ible"];
  const suffix = suffixes.find((item) => lower.endsWith(item) && lower.length > item.length + 2);
  if (!suffix) return null;
  const head = word.slice(0, -suffix.length);
  const tail = word.slice(-suffix.length);
  const headChunks = splitWordForMemory(head);
  return [...headChunks, tail].filter(Boolean);
}

function getVowelGroups(word) {
  const groups = [];
  let index = 0;
  while (index < word.length) {
    if (!isSyllableVowel(word, index)) {
      index += 1;
      continue;
    }
    const start = index;
    while (index + 1 < word.length && isSyllableVowel(word, index + 1)) index += 1;
    groups.push({ start, end: index });
    index += 1;
  }
  return groups;
}

function isSyllableVowel(word, index) {
  const char = word[index];
  if ("aeiou".includes(char)) {
    if (char === "e" && index === word.length - 1 && !word.endsWith("le")) return false;
    return true;
  }
  return char === "y" && index > 0;
}

function findSyllableCut(cluster, clusterStart) {
  const legalOnsets = new Set([
    "bl", "br", "ch", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "pl", "pr",
    "sc", "sh", "sk", "sl", "sm", "sn", "sp", "st", "str", "sw", "th", "tr",
    "tw", "wh", "wr", "scr", "shr", "spl", "spr", "squ",
  ]);
  if (!cluster) return clusterStart;
  if (cluster.length === 1) return clusterStart;
  if (legalOnsets.has(cluster)) return clusterStart;
  for (let length = Math.min(3, cluster.length); length > 1; length -= 1) {
    const onset = cluster.slice(cluster.length - length);
    if (legalOnsets.has(onset)) return clusterStart + cluster.length - length;
  }
  return clusterStart + 1;
}

function matchChunkCase(word, chunks) {
  let cursor = 0;
  return chunks.map((chunk) => {
    const matched = word.slice(cursor, cursor + chunk.length);
    cursor += chunk.length;
    return matched || chunk;
  });
}

function renderSplitWord(chunks) {
  return chunks.map((chunk, index) => (
    `<span class="word-chunk tone-${index % 6}">${escapeHtml(chunk)}</span>`
  )).join("");
}

function renderMetaLine(pos, frequency) {
  const safePos = escapeHtml(pos || "词性");
  const safeFrequency = escapeHtml(frequency || "频次未标注");
  return `${safePos} · <span class="frequency-highlight">${safeFrequency}</span>`;
}

function renderFormFrequency(frequency) {
  return frequency
    ? `<span class="frequency-highlight">${escapeHtml(frequency)}</span>`
    : `<span class="frequency-muted">频次未标注</span>`;
}

function getWordSyllables(entry) {
  const word = entry?.word || "";
  const override = SYLLABLE_OVERRIDES[word.toLowerCase()];
  if (override) return matchChunkCase(word, override);
  const external = hyphenateWord(word);
  if (external.length > 1) return external;
  return Array.isArray(entry?.syllables) && entry.syllables.length
    ? entry.syllables
    : splitWordForMemory(word);
}

function renderExternalPhonetics(entry) {
  return entry?.phonetic
    ? `<span class="split-token tone-0">${escapeHtml(entry.phonetic)}</span>`
    : "";
}

function createExternalHyphenator() {
  try {
    if (typeof window.Hypher !== "function" || !window.hyphenationPatternsEnUs) return null;
    return new window.Hypher(window.hyphenationPatternsEnUs);
  } catch (error) {
    console.warn("External syllable source unavailable", error);
    return null;
  }
}

function hyphenateWord(word) {
  const clean = String(word || "").trim();
  if (!EXTERNAL_HYPHENATOR || !/^[a-z-]+$/i.test(clean)) return [];
  const parts = EXTERNAL_HYPHENATOR.hyphenate(clean).filter(Boolean);
  return parts.join("").toLowerCase() === clean.replace(/-/g, "").toLowerCase() ? parts : [];
}

function speakWord(word) {
  pushDiagnosticEvent("speakWord", {
    word,
    policy: AUDIO_POLICY_MODE,
    preferredSource: describeAudioSource(getPreferredAudioUrl(word)),
  });
  const immediateAudioUrl = getPreferredAudioUrl(word);
  if (immediateAudioUrl) {
    playWordAudioNow(word, immediateAudioUrl);
    return;
  }

  if (AUDIO_POLICY_MODE === "browser-first") {
    speakWithBrowser(word);
    prepareWordAudio(word);
    return;
  }

  playWordAudioNow(word, "");
}

function playWordAudioNow(word, preferredUrl = "") {
  const key = String(word || "").trim().toLowerCase();
  const preparedAudio = audioPlayerCache[key];
  if (preparedAudio) {
    preparedAudio.currentTime = 0;
    preparedAudio.playbackRate = 1;
    pushDiagnosticEvent("play_cached_audio", {
      word,
      source: describeAudioSource(preparedAudio.currentSrc || preparedAudio.src || ""),
    });
    preparedAudio.play().catch(() => {
      delete audioPlayerCache[key];
      pushDiagnosticEvent("play_cached_audio_failed", { word });
      speakWithBrowser(word);
      prepareWordAudio(word);
    });
    return;
  }

  const cachedUrl = getPlayableAudioUrl(preferredUrl || getPreferredAudioUrl(word), key);
  if (cachedUrl && typeof Audio === "function") {
    const audio = new Audio(cachedUrl);
    audio.preload = "auto";
    audio.playbackRate = 1;
    pushDiagnosticEvent("play_fresh_audio", {
      word,
      source: describeAudioSource(cachedUrl),
    });
    audio.play().catch(() => {
      if (audioCache[key] === cachedUrl) delete audioCache[key];
      pushDiagnosticEvent("play_fresh_audio_failed", {
        word,
        source: describeAudioSource(cachedUrl),
      });
      speakWithBrowser(word);
      prepareWordAudio(word);
    });
    prepareWordAudio(word);
    return;
  }

  speakWithBrowser(word);
  prepareWordAudio(word);
}

async function prepareWordAudio(word) {
  const key = String(word || "").trim().toLowerCase();
  if (!key || audioPlayerCache[key] || typeof Audio !== "function") return;
  const audioUrl = await getReadyAudioUrl(word);
  if (!audioUrl || audioPlayerCache[key]) return;
  const playableUrl = getPlayableAudioUrl(audioUrl, key);
  if (!playableUrl) return;
  const audio = new Audio(playableUrl);
  audio.preload = "auto";
  audio.addEventListener("error", () => {
    if (audioPlayerCache[key] === audio) delete audioPlayerCache[key];
    if (audioCache[key] === audioUrl) delete audioCache[key];
    pushDiagnosticEvent("prepare_audio_failed", {
      word,
      source: describeAudioSource(playableUrl),
    });
  }, { once: true });
  audio.load();
  audioPlayerCache[key] = audio;
  pushDiagnosticEvent("prepare_audio_ready", {
    word,
    source: describeAudioSource(playableUrl),
  });
}

function prefetchTrainerAudio(startIndex) {
  for (let offset = 0; offset <= AUDIO_PREFETCH_WINDOW; offset += 1) {
    const group = activeQueue[startIndex + offset];
    if (group?.core?.word) prepareWordAudio(group.core.word);
  }
}

async function getDictionaryAudio(word) {
  const key = String(word || "").trim().toLowerCase();
  if (!key) return "";
  if (AUDIO_POLICY_MODE === "backup-first") return AUDIO_BACKUP_MAP[key] || buildUniversalAudioUrl(key);
  if (audioCache[key]) return audioCache[key];
  if (audioFailureCache[key] && Date.now() - audioFailureCache[key] < AUDIO_RETRY_MS) {
    return AUDIO_BACKUP_MAP[key] || buildUniversalAudioUrl(key);
  }
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
    if (!response.ok) throw new Error("dictionary audio missing");
    const data = await response.json();
    const phonetics = data.flatMap((entry) => entry.phonetics || []);
    const audio = phonetics
      .map((item) => normalizeAudioUrl(item.audio))
      .find(Boolean) || "";
    if (!audio) {
      audioFailureCache[key] = Date.now();
      const fallback = AUDIO_BACKUP_MAP[key] || buildUniversalAudioUrl(key);
      audioCache[key] = fallback;
      return fallback;
    }
    audioCache[key] = audio;
    delete audioFailureCache[key];
    return audio;
  } catch {
    audioFailureCache[key] = Date.now();
    const fallback = AUDIO_BACKUP_MAP[key] || buildUniversalAudioUrl(key);
    audioCache[key] = fallback;
    return fallback;
  }
}

function normalizeAudioUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("http://")) return value.replace(/^http:/i, "https:");
  return value;
}

function buildUniversalAudioUrl(word) {
  const text = normalizeSpeechText(word);
  if (!text) return "";
  return `${UNIVERSAL_TTS_BASE}${encodeURIComponent(text)}`;
}

function sanitizeAudioFileName(word) {
  return String(word || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "_");
}

function buildLocalAudioUrl(word) {
  const safeName = sanitizeAudioFileName(word);
  if (!safeName) return "";
  const batchName = AUDIO_BATCH_MAP[safeName];
  if (batchName) return `./${batchName}/audio/words/${safeName}.mp3`;
  return LOCAL_AUDIO_WORD_SET.has(safeName) ? `${LOCAL_AUDIO_BASE}${safeName}.mp3` : "";
}

function getPlayableAudioUrl(url, cacheKey = "") {
  const value = String(url || "").trim();
  if (!value) return "";
  if (!value.startsWith("data:audio/")) return value;
  const key = cacheKey || value.slice(0, 120);
  if (objectUrlCache[key]) return objectUrlCache[key];
  const match = value.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return value;
  try {
    const mimeType = match[1] || "audio/mpeg";
    const base64 = match[2] || "";
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    const objectUrl = URL.createObjectURL(blob);
    objectUrlCache[key] = objectUrl;
    return objectUrl;
  } catch {
    return value;
  }
}

function setDiagnosticPanelVisible(visible) {
  audioDiagnosticState.visible = !!visible;
  els.diagnosticPanel?.classList.toggle("hidden", !audioDiagnosticState.visible);
  if (els.toggleDiagnostic) {
    els.toggleDiagnostic.textContent = audioDiagnosticState.visible ? "收起诊断" : "发音诊断";
  }
  renderDiagnosticPanel();
}

function setDiagnosticWord(word) {
  const clean = String(word || "").trim();
  if (!clean) return;
  audioDiagnosticState.word = clean;
  renderDiagnosticPanel();
}

function pushDiagnosticEvent(type, payload = {}) {
  const stamp = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  audioDiagnosticState.events.unshift({
    stamp,
    type,
    payload,
  });
  audioDiagnosticState.events = audioDiagnosticState.events.slice(0, 8);
  renderDiagnosticPanel();
}

function renderDiagnosticPanel() {
  if (els.diagnosticWord) {
    els.diagnosticWord.textContent = audioDiagnosticState.word || "-";
  }
  if (els.diagnosticStatus) {
    els.diagnosticStatus.textContent = audioDiagnosticState.status || "未运行";
  }
  if (!els.diagnosticOutput) return;
  const eventLines = audioDiagnosticState.events.map((item) => {
    const payload = Object.entries(item.payload || {}).map(([key, value]) => `${key}=${value}`).join(" | ");
    return `[${item.stamp}] ${item.type}${payload ? ` | ${payload}` : ""}`;
  });
  const lines = [
    ...(audioDiagnosticState.lines || []),
    "",
    "最近事件：",
    ...(eventLines.length ? eventLines : ["暂无"]),
  ];
  els.diagnosticOutput.textContent = lines.join("\n");
}

function describeAudioSource(url) {
  const value = String(url || "").trim();
  if (!value) return "none";
  if (value.startsWith("blob:")) return "blob";
  if (value.startsWith("data:audio/")) return "data-audio";
  if (value.startsWith("./")) return "relative-file";
  if (/^https?:/i.test(value)) return "remote-url";
  return "other";
}

async function runCurrentWordDiagnostic() {
  const word = getCurrentDiagnosticWord();
  if (!word) {
    audioDiagnosticState.status = "无当前单词";
    audioDiagnosticState.lines = ["当前还没有进入单词学习页，所以没有可检测的单词。"];
    renderDiagnosticPanel();
    return;
  }

  setDiagnosticPanelVisible(true);
  setDiagnosticWord(word);
  audioDiagnosticState.status = "检测中…";
  audioDiagnosticState.lines = ["正在检测，请稍等…"];
  renderDiagnosticPanel();

  const safeName = sanitizeAudioFileName(word);
  const preferredUrl = getPreferredAudioUrl(word);
  const readyUrl = await getReadyAudioUrl(word);
  const playableUrl = getPlayableAudioUrl(readyUrl || preferredUrl, safeName);
  const englishVoices = ("speechSynthesis" in window) ? window.speechSynthesis.getVoices().filter((voice) => /^en(-|_)/i.test(voice.lang || "")) : [];
  const chineseVoice = ("speechSynthesis" in window) ? pickPreferredChineseVoice() : null;
  const playResult = await testAudioPlayback(playableUrl);
  audioDiagnosticState.lastResult = {
    word,
    safeName,
    preferredUrl,
    readyUrl,
    playableUrl,
    playResult,
  };
  audioDiagnosticState.status = playResult.ok ? "播放链路正常" : "播放链路异常";
  audioDiagnosticState.lines = [
    `检测时间：${new Date().toLocaleString("zh-CN", { hour12: false })}`,
    `当前单词：${word}`,
    `文件名键值：${safeName}`,
    `策略模式：${AUDIO_POLICY_MODE}`,
    `内嵌核心音频：${EMBEDDED_AUDIO_CORE_MAP[safeName] ? "有" : "无"}`,
    `内嵌分包音频：${EMBEDDED_AUDIO_MAP[safeName] ? "有" : "无"}`,
    `批次目录：${AUDIO_BATCH_MAP[safeName] || "未命中"}`,
    `本地文件路径：${buildLocalAudioUrl(word) || "无"}`,
    `备用电子发音：${AUDIO_BACKUP_MAP[safeName] ? "有" : "无"}`,
    `首选音频来源：${describeAudioSource(preferredUrl)} | ${truncateForPanel(preferredUrl)}`,
    `预热后音频来源：${describeAudioSource(readyUrl)} | ${truncateForPanel(readyUrl)}`,
    `实际可播地址：${describeAudioSource(playableUrl)} | ${truncateForPanel(playableUrl)}`,
    `Audio对象支持：${typeof Audio === "function" ? "是" : "否"}`,
    `浏览器语音支持：${"speechSynthesis" in window ? "是" : "否"}`,
    `英文语音数量：${englishVoices.length}`,
    `首选英文语音：${speechState.preferredVoice ? `${speechState.preferredVoice.name} / ${speechState.preferredVoice.lang}` : "未选中"}`,
    `中文语音：${chineseVoice ? `${chineseVoice.name} / ${chineseVoice.lang}` : "未找到"}`,
    `播放测试结果：${playResult.ok ? "成功" : "失败"}`,
    `播放测试细节：${playResult.detail}`,
    `设备信息：${navigator.userAgent || "未知"}`,
  ];
  pushDiagnosticEvent("run_diagnostic", {
    word,
    result: playResult.ok ? "ok" : "fail",
    source: describeAudioSource(playableUrl),
  });
  renderDiagnosticPanel();
}

function getCurrentDiagnosticWord() {
  const group = activeQueue[activeIndex];
  return String(group?.core?.word || audioDiagnosticState.word || "").trim();
}

function truncateForPanel(text, max = 120) {
  const value = String(text || "").trim();
  if (!value) return "-";
  return value.length > max ? `${value.slice(0, max)}...` : value;
}

async function testAudioPlayback(src) {
  if (!src) {
    return { ok: false, detail: "没有可用音频地址" };
  }
  if (typeof Audio !== "function") {
    return { ok: false, detail: "当前环境不支持 Audio" };
  }
  return new Promise((resolve) => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.playbackRate = 1;
    let settled = false;
    let started = false;
    const timer = window.setTimeout(() => finish(started, started ? "已触发 onplay" : "1.8 秒内未开始播放"), 1800);
    const finish = (ok, detail) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
      audio.onplay = null;
      audio.onerror = null;
      audio.onended = null;
      resolve({ ok, detail });
    };
    audio.onplay = () => {
      started = true;
      window.setTimeout(() => finish(true, "已触发 onplay，音频链路已启动"), 160);
    };
    audio.onerror = () => finish(false, "触发 audio.onerror");
    audio.onended = () => finish(true, "音频已完整播放结束");
    audio.play().catch((error) => finish(false, error?.message || "audio.play() 被拒绝"));
  });
}

async function copyDiagnosticResult() {
  const text = els.diagnosticOutput?.textContent || "";
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    audioDiagnosticState.status = "诊断结果已复制";
  } catch {
    audioDiagnosticState.status = "复制失败";
  }
  renderDiagnosticPanel();
}

function getPreferredAudioUrl(word) {
  const key = String(word || "").trim().toLowerCase();
  const embeddedCoreUrl = EMBEDDED_AUDIO_CORE_MAP[key] || EMBEDDED_AUDIO_CORE_MAP[sanitizeAudioFileName(word)];
  if (embeddedCoreUrl) return embeddedCoreUrl;
  const embeddedUrl = EMBEDDED_AUDIO_MAP[key] || EMBEDDED_AUDIO_MAP[sanitizeAudioFileName(word)];
  if (embeddedUrl) return embeddedUrl;
  const localUrl = buildLocalAudioUrl(word);
  if (localUrl) return localUrl;
  const backupUrl = AUDIO_BACKUP_MAP[key] || buildUniversalAudioUrl(word);
  if (AUDIO_POLICY_MODE === "backup-first") return backupUrl;
  return audioCache[key] || backupUrl;
}

async function getReadyAudioUrl(word) {
  const key = String(word || "").trim().toLowerCase();
  if (!key) return "";
  const embeddedCoreUrl = EMBEDDED_AUDIO_CORE_MAP[key] || EMBEDDED_AUDIO_CORE_MAP[sanitizeAudioFileName(word)];
  if (embeddedCoreUrl) return embeddedCoreUrl;
  const embeddedUrl = EMBEDDED_AUDIO_MAP[key] || EMBEDDED_AUDIO_MAP[sanitizeAudioFileName(word)];
  if (embeddedUrl) return embeddedUrl;
  const localUrl = buildLocalAudioUrl(word);
  if (localUrl) return localUrl;
  if (AUDIO_POLICY_MODE === "backup-first") return AUDIO_BACKUP_MAP[key] || buildUniversalAudioUrl(word);
  return getDictionaryAudio(word);
}

function playMeaningSequence(group) {
  meaningSequenceToken += 1;
  const token = meaningSequenceToken;
  const englishWord = group?.core?.word;
  const chineseMeaning = getPrimaryMeaning(group?.core?.meaning);
  runMeaningSequence(englishWord, chineseMeaning, token);
}

async function runMeaningSequence(englishWord, chineseMeaning, token) {
  await playWordAndWait(englishWord, token);
  await pauseMeaningSequence(120, token);
  await speakChineseTextAndWait(chineseMeaning, token);
  await pauseMeaningSequence(120, token);
  await playWordAndWait(englishWord, token);
  await pauseMeaningSequence(120, token);
  await playWordAndWait(englishWord, token);
}

function pauseMeaningSequence(ms, token) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (token !== meaningSequenceToken) return resolve();
      resolve();
    }, ms);
  });
}

async function playWordAndWait(word, token = 0) {
  if (token && token !== meaningSequenceToken) return;
  const key = String(word || "").trim().toLowerCase();
  const preparedAudio = audioPlayerCache[key];
  const preparedSrc = preparedAudio?.currentSrc || preparedAudio?.src || "";
  const cachedUrl = preparedSrc || getPlayableAudioUrl(getPreferredAudioUrl(word), key);
  if (cachedUrl && typeof Audio === "function") {
    const played = await playStandaloneAudioAndWait(cachedUrl, token, 5000);
    if (played) {
      prepareWordAudio(word);
      return;
    }
  }
  await speakWordWithBrowserAndWait(word, token);
  prepareWordAudio(word);
}

function speakChineseTextAndWait(text, token = 0) {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) return resolve();
    const clean = String(text || "").trim();
    if (!clean) return resolve();
    if (token && token !== meaningSequenceToken) return resolve();
    const synth = window.speechSynthesis;
    const voice = pickPreferredChineseVoice();
    synth.cancel();
    synth.resume();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = voice?.lang || "zh-CN";
    utterance.rate = 0.98;
    utterance.pitch = 1;
    if (voice) utterance.voice = voice;
    let settled = false;
    const timer = window.setTimeout(() => {
      synth.cancel();
      finish();
    }, 3500);
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    synth.speak(utterance);
  });
}

function playStandaloneAudioAndWait(src, token = 0, timeoutMs = 5000) {
  return new Promise((resolve) => {
    if (!src || typeof Audio !== "function") return resolve(false);
    if (token && token !== meaningSequenceToken) return resolve(false);
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.playbackRate = 1;
    let settled = false;
    let started = false;
    const timer = window.setTimeout(() => finish(started), timeoutMs);
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      audio.onplay = null;
      audio.onended = null;
      audio.onerror = null;
      resolve(ok);
    };
    audio.onplay = () => {
      started = true;
    };
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    audio.play().catch(() => finish(false));
  });
}

function speakWordWithBrowserAndWait(word, token = 0) {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) return resolve(false);
    const text = normalizeSpeechText(word);
    if (!text) return resolve(false);
    if (token && token !== meaningSequenceToken) return resolve(false);
    primeSpeechSynthesis();
    const synth = window.speechSynthesis;
    const options = buildSpeechAttempt(0);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang;
    utterance.rate = options.rate;
    utterance.pitch = 1;
    if (options.voice) utterance.voice = options.voice;
    let settled = false;
    let started = false;
    const timer = window.setTimeout(() => {
      synth.cancel();
      finish(started);
    }, 4500);
    const finish = (ok = started) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(ok);
    };
    utterance.onstart = () => {
      started = true;
    };
    utterance.onend = () => finish(started);
    utterance.onerror = () => finish(false);
    synth.cancel();
    synth.resume();
    synth.speak(utterance);
  });
}

function initSpeechSynthesis() {
  if (!("speechSynthesis" in window) || speechState.initialized) return;
  speechState.initialized = true;
  pickPreferredEnglishVoice();
  if (typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", pickPreferredEnglishVoice);
  }
  document.addEventListener("pointerdown", primeSpeechSynthesis, { once: true, passive: true });
  document.addEventListener("keydown", primeSpeechSynthesis, { once: true });
  window.speechSynthesis.resume();
}

function pickPreferredEnglishVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices().filter((voice) => /^en(-|_)/i.test(voice.lang || ""));
  if (!voices.length) {
    speechState.preferredVoice = null;
    return null;
  }
  const rankedVoices = voices
    .map((voice) => ({ voice, score: getEnglishVoiceScore(voice) }))
    .sort((a, b) => b.score - a.score);
  speechState.preferredVoice = rankedVoices[0].voice;
  return speechState.preferredVoice;
}

function getEnglishVoiceScore(voice) {
  const name = String(voice?.name || "");
  const lang = String(voice?.lang || "");
  let score = 0;
  if (/en-us/i.test(lang)) score += 6;
  else if (/en-gb/i.test(lang)) score += 5;
  else if (/^en(-|_)/i.test(lang)) score += 4;
  if (/natural|neural|online/i.test(name)) score += 8;
  if (/microsoft|google|samantha|daniel|alex|aria|jenny|guy/i.test(name)) score += 4;
  if (voice?.default) score += 2;
  if (voice?.localService) score += 1;
  return score;
}

function primeSpeechSynthesis() {
  if (!("speechSynthesis" in window) || speechState.primed) return;
  speechState.primed = true;
  pickPreferredEnglishVoice();
  window.speechSynthesis.resume();
}

function pickPreferredChineseVoice() {
  if (!("speechSynthesis" in window)) return null;
  return window.speechSynthesis.getVoices().find((voice) => /zh(-|_)/i.test(voice.lang || "")) || null;
}

function speakChineseText(text, token = 0) {
  if (!("speechSynthesis" in window)) return;
  const clean = String(text || "").trim();
  if (!clean) return;
  if (token && token !== meaningSequenceToken) return;
  const synth = window.speechSynthesis;
  const voice = pickPreferredChineseVoice();
  synth.resume();
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = voice?.lang || "zh-CN";
  utterance.rate = 0.98;
  utterance.pitch = 1;
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

function speakWithBrowser(word) {
  if (!("speechSynthesis" in window)) return;
  const text = normalizeSpeechText(word);
  if (!text) return;
  primeSpeechSynthesis();
  clearSpeechRetryTimer();
  speechState.activeToken += 1;
  pushDiagnosticEvent("browser_tts_start", {
    word,
    voice: speechState.preferredVoice ? `${speechState.preferredVoice.name}/${speechState.preferredVoice.lang}` : "default",
  });
  speakWithBrowserAttempt(text, speechState.activeToken, 0);
}

function speakWithBrowserAttempt(text, token, attempt) {
  if (!("speechSynthesis" in window) || token !== speechState.activeToken) return;
  const synth = window.speechSynthesis;
  const options = buildSpeechAttempt(attempt);
  let started = false;
  clearSpeechRetryTimer();
  synth.cancel();
  synth.resume();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang;
  utterance.rate = options.rate;
  utterance.pitch = 1;
  if (options.voice) utterance.voice = options.voice;
  utterance.onstart = () => {
    started = true;
    clearSpeechRetryTimer();
    pushDiagnosticEvent("browser_tts_onstart", {
      text,
      attempt,
      voice: options.voice ? `${options.voice.name}/${options.voice.lang}` : options.lang,
    });
  };
  utterance.onerror = () => {
    if (token !== speechState.activeToken) return;
    clearSpeechRetryTimer();
    pushDiagnosticEvent("browser_tts_error", { text, attempt });
    if (attempt < 2) speakWithBrowserAttempt(text, token, attempt + 1);
  };
  utterance.onend = () => {
    if (started) clearSpeechRetryTimer();
    pushDiagnosticEvent("browser_tts_end", { text, attempt, started: started ? "yes" : "no" });
  };
  speechState.retryTimer = window.setTimeout(() => {
    if (token !== speechState.activeToken || started) return;
    synth.cancel();
    if (attempt < 2) speakWithBrowserAttempt(text, token, attempt + 1);
  }, 180);
  synth.speak(utterance);
}

function buildSpeechAttempt(attempt) {
  const voices = window.speechSynthesis.getVoices().filter((voice) => /^en(-|_)/i.test(voice.lang || ""));
  const preferredVoice = speechState.preferredVoice || pickPreferredEnglishVoice();
  const alternateVoice = voices.find((voice) => voice !== preferredVoice) || null;
  if (attempt === 0) {
    return {
      voice: preferredVoice,
      lang: preferredVoice?.lang || "en-US",
      rate: /natural|neural|online/i.test(preferredVoice?.name || "") ? 0.98 : 1
    };
  }
  if (attempt === 1) {
    return {
      voice: alternateVoice,
      lang: alternateVoice?.lang || preferredVoice?.lang || "en-US",
      rate: 1
    };
  }
  return {
    voice: null,
    lang: "en-US",
    rate: 1
  };
}

function clearSpeechRetryTimer() {
  if (!speechState.retryTimer) return;
  window.clearTimeout(speechState.retryTimer);
  speechState.retryTimer = null;
}

function normalizeSpeechText(word) {
  return String(word || "")
    .replace(/-/g, " ")
    .replace(/[^a-zA-Z'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

