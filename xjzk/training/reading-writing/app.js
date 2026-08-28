const state = {
  data: null,
  activeSection: 'strategy',
  activeCategory: '',
  learningMode: 'list',
  cardFilter: 'all',
  cardIndex: 0,
  cardFlipped: false,
  currentArticleSource: '',
  practiceIndex: 0,
  currentPractice: null,
  mastered: new Set(),
  completedPractice: new Set(),
  practiceAttempts: {}
};

const els = {};
const LOGIN_STORAGE_KEY = 'rw_supabase_access_code_20260710';
const LOGIN_OK_KEY = 'rw_supabase_login_ok_20260710';
const LOGIN_LABEL_KEY = 'rw_supabase_login_label_20260710';
const MASTERED_KEY = 'rw_supabase_mastered_cache_20260710';
const PRACTICE_DONE_KEY = 'rw_supabase_completed_practice_cache_20260710';
const PRACTICE_ATTEMPTS_KEY = 'rw_supabase_practice_attempts_20260828';
const SUPABASE_CONFIG = {
  url: 'https://gbjmylxohacppnybfssh.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdiam15bHhvaGFjcHBueWJmc3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDA1NzgsImV4cCI6MjA5ODI3NjU3OH0.mz5srsxdbZa4__oqKjlcysWuDo00w7UQaV8n2VNP4eE'
};
const SYSTEM_TYPE = 'reading-writing';

document.addEventListener('DOMContentLoaded', init);

async function init() {
  if (!(await setupLoginGate())) return;
  cacheElements();
  bindEvents();
  state.data = window.MVP_DATA || await (await fetch('mvp_data.json')).json();
  state.activeCategory = state.data.categories[0] || '';
  state.mastered = loadMastered();
  state.completedPractice = loadCompletedPractice();
  state.practiceAttempts = loadPracticeAttempts();
  migrateCompletedPracticeToAttempts();
  setupStrategyAccordion();
  renderArticleList();
  renderLearning();
  updatePracticeProgress();
  syncCloudProgressInBackground();
}

async function callSupabaseRpc(functionName, payload) {
  const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/rpc/${functionName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (!response.ok) {
    const msg = data && data.message ? data.message : '云端连接失败，请稍后再试。';
    throw new Error(String(msg).includes('INVALID_ACCESS_CODE') ? '登录码不正确，请检查后再试。' : msg);
  }
  return data;
}

async function verifyAccessCode(code) {
  const result = await callSupabaseRpc('verify_access_code', {
    input_code: code,
    input_system_type: SYSTEM_TYPE
  });
  const account = Array.isArray(result) ? result[0] : null;
  if (!account || !account.access_code_id) {
    throw new Error('该登录码不可用于当前专项，或登录码不正确。');
  }
  return account;
}

async function ensureStudentProfile(code, account) {
  const name = await window.StudentProfile.ensure({
    code,
    account,
    bindName: studentName => callSupabaseRpc('bind_student_name', {
      input_code: code,
      input_system_type: SYSTEM_TYPE,
      input_student_name: studentName
    })
  });
  window.StudentProfile.applyBrand(name, SYSTEM_TYPE);
  return name;
}

function cleanLoginCode(value) {
  return String(value || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 12);
}

function safeGetLogin() {
  try {
    return cleanLoginCode(localStorage.getItem(LOGIN_STORAGE_KEY));
  } catch {
    return '';
  }
}

function clearOldLoginData() {
  [
    'rw_mvp_logged_in',
    'rw_mvp_login_time',
    'rw_mvp_mastered_ids',
    'rw_mvp_completed_practice_ids'
  ].forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch {}
  });
}

function safeSetLogin(code, label) {
  clearOldLoginData();
  try {
    localStorage.setItem(LOGIN_STORAGE_KEY, code);
    localStorage.setItem(LOGIN_OK_KEY, 'true');
    if (label) localStorage.setItem(LOGIN_LABEL_KEY, label);
  } catch {}
}

function clearLoginState() {
  try {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    localStorage.removeItem(LOGIN_OK_KEY);
    localStorage.removeItem(LOGIN_LABEL_KEY);
  } catch {}
}

async function setupLoginGate() {
  clearOldLoginData();
  const saved = safeGetLogin();
  if (saved && localStorage.getItem(LOGIN_OK_KEY) === 'true') {
    try {
      const account = await verifyAccessCode(saved);
      await ensureStudentProfile(saved, account);
      safeSetLogin(saved, account.label);
      unlockApp();
      return true;
    } catch (error) {
      console.warn('Reading-writing saved login check failed:', error);
      clearLoginState();
    }
  }

  const gate = document.getElementById('loginGate');
  const form = document.getElementById('loginForm');
  const input = document.getElementById('loginCode');
  const error = document.getElementById('loginError');
  if (!gate || !form || !input) return true;

  document.body.classList.add('auth-locked');
  input.addEventListener('input', () => {
    input.value = cleanLoginCode(input.value);
    if (error) error.textContent = '';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const code = cleanLoginCode(input.value);
    input.value = code;
    if (!code) {
      if (error) {
        error.textContent = '请输入登录码。';
        error.className = 'login-message bad';
      }
      input.focus();
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    if (error) {
      error.textContent = '正在验证登录码...';
      error.className = 'login-message';
    }
    try {
      const account = await verifyAccessCode(code);
      await ensureStudentProfile(code, account);
      safeSetLogin(code, account.label);
      unlockApp();
      cacheElements();
      bindEvents();
      state.data = window.MVP_DATA || await (await fetch('mvp_data.json')).json();
      state.activeCategory = state.data.categories[0] || '';
      state.mastered = loadMastered();
      state.completedPractice = loadCompletedPractice();
      state.practiceAttempts = loadPracticeAttempts();
      migrateCompletedPracticeToAttempts();
      setupStrategyAccordion();
      renderArticleList();
      renderLearning();
      updatePracticeProgress();
      syncCloudProgressInBackground();
    } catch (err) {
      if (error) {
        error.textContent = err.message || '登录码不正确，请重新输入。';
        error.className = 'login-message bad';
      }
      input.focus();
      input.select();
    } finally {
      if (button) button.disabled = false;
    }
  });
  setTimeout(() => input.focus(), 80);
  return false;
}

function unlockApp() {
  document.body.classList.remove('auth-locked');
  const gate = document.getElementById('loginGate');
  if (gate) {
    gate.setAttribute('aria-hidden', 'true');
    gate.style.display = 'none';
  }
}

function cacheElements() {
  els.navItems = document.querySelectorAll('.nav-item');
  els.sections = document.querySelectorAll('.section');
  els.articleList = document.getElementById('article-list');
  els.learningTitle = document.getElementById('learning-title');
  els.learningCount = document.getElementById('learning-count');
  els.listView = document.getElementById('list-view');
  els.cardView = document.getElementById('card-view');
  els.modeButtons = document.querySelectorAll('.mode-btn');
  els.cardFilterButtons = document.querySelectorAll('.card-filter-btn');
  els.studyCard = document.getElementById('study-card');
  els.cardMeta = document.getElementById('card-meta');
  els.cardFrontWord = document.getElementById('card-front-word');
  els.cardFrontPoint = document.getElementById('card-front-point');
  els.cardBackWord = document.getElementById('card-back-word');
  els.cardProgress = document.getElementById('card-progress');
  els.practiceProgressText = document.getElementById('practice-progress-text');
  els.practiceProgressRatio = document.getElementById('practice-progress-ratio');
  els.practiceProgressFill = document.getElementById('practice-progress-fill');
  els.practiceSource = document.getElementById('practice-source');
  els.practiceOriginal = document.getElementById('practice-original');
  els.practiceTarget = document.getElementById('practice-target');
  els.practiceQuestion = document.getElementById('practice-question');
  els.practiceSummary = document.getElementById('practice-summary');
  els.answerInput = document.getElementById('answer-input');
  els.newPractice = document.getElementById('new-practice');
  els.nextPractice = document.getElementById('next-practice');
  els.feedback = document.getElementById('feedback');
}

function bindEvents() {
  els.navItems.forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  document.querySelectorAll('.home-link').forEach(link => {
    link.addEventListener('click', event => {
      if (!confirm('是否确定要退出读写题，训练其他题型？')) {
        event.preventDefault();
      }
    });
  });

  els.modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.learningMode = btn.dataset.mode;
      state.cardIndex = 0;
      state.cardFlipped = false;
      renderLearning();
    });
  });

  els.cardFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.cardFilter = btn.dataset.cardFilter;
      state.cardIndex = 0;
      state.cardFlipped = false;
      renderLearning();
    });
  });

  els.studyCard.addEventListener('click', () => flipCard());
  document.getElementById('prev-card').addEventListener('click', () => moveCard(-1));
  document.getElementById('next-card').addEventListener('click', () => moveCard(1));
  document.getElementById('back-to-library').addEventListener('click', () => switchSection('library'));
  document.getElementById('new-practice').addEventListener('click', () => pickPractice(true));
  els.nextPractice.addEventListener('click', nextPractice);
  els.answerInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkAnswer();
    }
  });
}

function switchSection(section) {
  if (section === 'practice' && !state.currentArticleSource) {
    const first = getPracticeArticles()[0];
    if (first) state.currentArticleSource = first.source;
  }
  state.activeSection = section;
  els.navItems.forEach(btn => btn.classList.toggle('active', btn.dataset.section === section));
  els.sections.forEach(panel => panel.classList.toggle('active', panel.id === section));
  if (section === 'practice') {
    pickPractice();
    if (!els.practiceQuestion.classList.contains('hidden')) els.answerInput.focus();
  }
  if (section === 'library') renderArticleList();
}

function getLearningItems() {
  return (state.data.learningItems || []).filter(item => item.category === state.activeCategory);
}

function getCardItems() {
  const items = getLearningItems();
  if (state.cardFilter === 'unmastered') {
    return items.filter(item => !state.mastered.has(String(item.id)));
  }
  return items;
}

function renderLearning() {
  const items = getLearningItems();
  const masteredCount = items.filter(item => state.mastered.has(String(item.id))).length;
  els.learningTitle.textContent = state.activeCategory;
  els.learningCount.textContent = `${items.length} 条 · 已掌握 ${masteredCount} 条`;
  els.modeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === state.learningMode));
  els.listView.classList.toggle('hidden', state.learningMode !== 'list');
  els.cardView.classList.toggle('hidden', state.learningMode !== 'cards');

  if (state.learningMode === 'list') {
    renderList(items);
  } else {
    renderCard(getCardItems());
  }
}

function renderList(items) {
  els.listView.innerHTML = `
    <table>
      <thead>
        <tr>
          <th style="width: 76px">题号</th>
          <th style="width: 25%">2–3词短语</th>
          <th style="width: 25%">1词转换</th>
          <th>中文释义</th>
          <th style="width: 96px">已掌握</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item, index) => `
          <tr class="${state.mastered.has(String(item.id)) ? 'mastered-row' : ''}">
            <td><strong>${index + 1}</strong></td>
            <td>${escapeHtml(item.original)}</td>
            <td>${escapeHtml(item.target)}</td>
            <td>${escapeHtml(item.meaning || '')}</td>
            <td class="check-cell">
              <input type="checkbox" data-mastered-id="${item.id}" ${state.mastered.has(String(item.id)) ? 'checked' : ''} aria-label="标记已掌握">
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="mobile-word-list">
      ${items.map((item, index) => `
        <article class="word-card ${state.mastered.has(String(item.id)) ? 'mastered-row' : ''}">
          <div class="word-card-row">
            <span>题号</span>
            <strong>${index + 1}</strong>
          </div>
          <div class="word-card-row">
            <span>2–3词短语</span>
            <strong>${escapeHtml(item.original)}</strong>
          </div>
          <div class="word-card-row">
            <span>1词转换</span>
            <strong>${escapeHtml(item.target)}</strong>
          </div>
          <div class="word-card-row">
            <span>释义</span>
            <p>${escapeHtml(item.meaning || '')}</p>
          </div>
          <label class="word-card-check">
            <input type="checkbox" data-mastered-id="${item.id}" ${state.mastered.has(String(item.id)) ? 'checked' : ''}>
            已掌握
          </label>
        </article>
      `).join('')}
    </div>
  `;

  els.listView.querySelectorAll('[data-mastered-id]').forEach(input => {
    input.addEventListener('change', event => {
      const id = String(event.target.dataset.masteredId);
      if (event.target.checked) {
        state.mastered.add(id);
      } else {
        state.mastered.delete(id);
      }
      saveMastered();
      renderLearning();
    });
  });
}

function setupStrategyAccordion() {
  const sections = [...document.querySelectorAll('.strategy-section')];
  sections.forEach((section, index) => {
    const heading = section.querySelector('h3');
    if (!heading) return;
    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    heading.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
    section.classList.toggle('open', index === 0);
    const toggle = () => {
      const isOpen = section.classList.toggle('open');
      heading.setAttribute('aria-expanded', String(isOpen));
    };
    heading.addEventListener('click', toggle);
    heading.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
}

function renderCard(items) {
  els.cardFilterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.cardFilter === state.cardFilter));
  if (!items.length) {
    els.cardMeta.textContent = state.cardFilter === 'unmastered' ? '未掌握部分暂无卡片' : '暂无数据';
    els.cardFrontWord.textContent = '';
    els.cardFrontPoint.textContent = '';
    els.cardBackWord.textContent = '';
    els.cardProgress.textContent = '';
    return;
  }

  if (state.cardIndex >= items.length) state.cardIndex = 0;
  const item = items[state.cardIndex];
  els.studyCard.classList.toggle('flipped', state.cardFlipped);
  const displayNumber = getLearningItems().findIndex(candidate => String(candidate.id) === String(item.id)) + 1;
  els.cardMeta.textContent = `题号 ${displayNumber} · ${item.category} · ${item.source}`;
  els.cardFrontWord.textContent = item.original;
  els.cardFrontPoint.textContent = needsStudyPoint(item) ? item.studyPoint || item.point || item.category : '';
  els.cardBackWord.textContent = item.target;
  els.cardProgress.textContent = `${state.cardIndex + 1} / ${items.length}`;
}

function needsStudyPoint(item) {
  return false;
}

function flipCard() {
  if (state.learningMode !== 'cards') return;
  state.cardFlipped = !state.cardFlipped;
  els.studyCard.classList.toggle('flipped', state.cardFlipped);
}

function moveCard(delta) {
  const items = getCardItems();
  if (!items.length) return;
  state.cardIndex = (state.cardIndex + delta + items.length) % items.length;
  state.cardFlipped = false;
  renderCard(items);
}

function getPracticeArticles() {
  const map = new Map();
  getAllPracticeItems().forEach(item => {
    const source = String(item.source || '').trim() || '名校优质真题';
    if (!map.has(source)) {
      map.set(source, {
        source,
        title: cleanSourceTitle(source) || `读写题训练 ${map.size + 1}`,
        items: []
      });
    }
    map.get(source).items.push(item);
  });
  return Array.from(map.values())
    .map((article, originalIndex) => ({ article, originalIndex }))
    .sort((a, b) => {
      const aYear = getReadingOfficialExamYear(a.article.source);
      const bYear = getReadingOfficialExamYear(b.article.source);
      if (aYear || bYear) {
        if (!aYear) return 1;
        if (!bYear) return -1;
        if (aYear !== bYear) return bYear - aYear;
      }
      return a.originalIndex - b.originalIndex;
    })
    .map(({ article }) => article);
}

function renderArticleList() {
  if (!els.articleList || !state.data) return;
  const articles = getPracticeArticles();
  if (!articles.length) {
    els.articleList.innerHTML = '<div class="empty-state">题库正在整理中。</div>';
    return;
  }
  els.articleList.innerHTML = articles.map((article, index) => {
    const done = article.items.filter(item => hasPracticeAttempt(item.id)).length;
    const officialYear = getReadingOfficialExamYear(article.source);
    return `
      <article class="article-row${officialYear ? ' official-exam-card' : ''}">
        <div class="article-index">${String(index + 1).padStart(2, '0')}</div>
        <div class="article-main">
          ${officialYear ? `<span class="official-exam-badge">${officialYear} 新疆中考真题</span>` : ''}
          <strong>${escapeHtml(article.title)}</strong>
          <span class="article-source${officialYear ? ' real-exam-source' : ''}">${escapeHtml(getArticleDisplaySource(article.source))}</span>
        </div>
        <div class="article-meta">${done}/${article.items.length}</div>
        <button class="start-article" type="button" data-source="${escapeAttr(article.source)}">开始训练</button>
      </article>
    `;
  }).join('');
  els.articleList.querySelectorAll('.start-article').forEach(button => {
    button.addEventListener('click', () => startArticle(button.dataset.source));
  });
}

function startArticle(source) {
  state.currentArticleSource = source || '';
  switchSection('practice');
}

function getAllPracticeItems() {
  return (state.data.practiceItems || []).filter(item => item.targetSentence && item.answer);
}

function getPracticeItems() {
  const items = getAllPracticeItems();
  if (!state.currentArticleSource) return items;
  return items.filter(item => (String(item.source || '').trim() || '名校优质真题') === state.currentArticleSource);
}

function getUnfinishedPracticeItems() {
  return getPracticeItems().filter(item => !hasPracticeAttempt(item.id));
}

function pickPractice(random = false) {
  updatePracticeProgress();
  const unfinished = getUnfinishedPracticeItems();
  const allItems = getPracticeItems();
  if (!allItems.length) {
    state.currentPractice = null;
    els.practiceSource.textContent = '暂无真题';
    els.practiceOriginal.textContent = '';
    els.practiceTarget.textContent = '';
    els.answerInput.value = '';
    setFeedback('', '');
    return;
  }

  if (!unfinished.length) {
    showArticleSummary();
    return;
  }

  const item = random ? unfinished[Math.floor(Math.random() * unfinished.length)] : unfinished[0];
  state.practiceIndex = allItems.findIndex(candidate => String(candidate.id) === String(item.id));
  state.currentPractice = item;
  renderPractice();
}

function nextPractice() {
  const items = getPracticeItems();
  if (!items.length) return;

  if (!state.currentPractice || !hasPracticeAttempt(state.currentPractice.id)) {
    setFeedback('warn', '请先提交本题答案。');
    els.answerInput.focus();
    return;
  }

  const currentId = state.currentPractice ? String(state.currentPractice.id) : '';
  const currentIndex = items.findIndex(item => String(item.id) === currentId);
  const nextItem = items.slice(currentIndex + 1).find(item => !hasPracticeAttempt(item.id))
    || items.slice(0, currentIndex).find(item => !hasPracticeAttempt(item.id));
  if (!nextItem) {
    showArticleSummary();
    return;
  }
  state.practiceIndex = items.findIndex(item => String(item.id) === String(nextItem.id));
  state.currentPractice = nextItem;
  renderPractice();
}

function renderPractice() {
  const item = state.currentPractice;
  const progress = getPracticeProgress();
  const status = '本篇训练';
  const allItems = progress.items;
  const globalIndex = allItems.findIndex(candidate => String(candidate.id) === String(item.id));
  const title = cleanSourceTitle(item.source);
  els.practiceSource.textContent = `${status} · 第 ${globalIndex + 1}/${allItems.length} 题 · ${title} · 原题第 ${item.number} 空`;
  els.practiceOriginal.textContent = item.originalSentence;
  els.practiceTarget.innerHTML = escapeHtml(item.targetSentence).replace(/_+/g, '<span class="blank">______</span>');
  els.practiceQuestion.classList.remove('hidden');
  els.practiceSummary.classList.add('hidden');
  els.newPractice.classList.remove('hidden');
  els.answerInput.value = '';
  els.answerInput.disabled = false;
  els.nextPractice.disabled = true;
  els.nextPractice.textContent = globalIndex === allItems.length - 1 ? '完成本篇' : '下一题';
  els.answerInput.focus();
  setFeedback('', '');
  updatePracticeProgress();
}

function cleanSourceTitle(source) {
  const text = String(source || '').trim();
  if (text.includes('｜')) {
    return text.split('｜').slice(1).join('｜').trim();
  }
  return text
    .replace(/^2025\s*专练\s*读写题（[^）]+）[A-Z]\s*/u, '')
    .replace(/^2026\s*模考\s*Passage\s*\d+\s*/iu, '')
    .replace(/^复习讲义\s*Passage\s*\d+\s*/iu, '')
    .replace(/^题型四\s*Passage\s*\d+\s*/iu, '')
    .trim();
}

function getReadingOfficialExamYear(source) {
  const text = String(source || '').trim();
  if (!/初中学业水平考试英语真题|新疆.*中考.*真题/.test(text)) return 0;
  const match = text.match(/20\d{2}/);
  return match ? Number(match[0]) : 0;
}

function getArticleDisplaySource(source) {
  const text = String(source || '').trim();
  if (text.includes('｜')) return text.split('｜')[0].trim();
  return '2026新疆优质模考题汇编';
}

function checkAnswer() {
  const item = state.currentPractice;
  if (!item) return;
  const typed = els.answerInput.value.trim();
  if (!typed) {
    setFeedback('warn', '请先输入答案，再提交。');
    return;
  }

  const answers = getAcceptableAnswers(item);
  const matchedAnswer = answers.find(answer => normalizeAnswer(typed) === normalizeAnswer(answer));
  const displayAnswer = answers.join(' / ');
  const isCorrect = Boolean(matchedAnswer);
  state.practiceAttempts[String(item.id)] = {
    answer: typed,
    correct: isCorrect,
    submittedAt: new Date().toISOString()
  };
  savePracticeAttempts();
  if (isCorrect) {
    state.completedPractice.add(String(item.id));
    saveCompletedPractice();
    setFeedback('good', `正确。${buildExplanation(item)}`);
  } else {
    setFeedback('bad', `错误。正确答案：${escapeHtml(displayAnswer)}。${buildExplanation(item)}`);
  }
  saveCloudProgress();
  updatePracticeProgress();
  renderArticleList();
  els.answerInput.disabled = true;
  els.nextPractice.disabled = false;
  const unfinished = getUnfinishedPracticeItems();
  els.nextPractice.textContent = unfinished.length ? '下一题' : '查看本篇结果';
}

function getAcceptableAnswers(item) {
  return String(item && item.answer || '')
    .trim()
    .split(/\s*(?:\/|／|\bor\b|或者)\s*/i)
    .map(answer => answer.trim())
    .filter(Boolean);
}

function normalizeAnswer(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function updatePracticeProgress() {
  if (!state.data) return;
  const progress = getPracticeProgress();
  els.practiceProgressText.textContent = `未完成：${progress.unfinished} 题`;
  els.practiceProgressRatio.textContent = `${progress.completed}/${progress.total}`;
  els.practiceProgressFill.style.width = `${progress.percent}%`;
  els.practiceProgressFill.parentElement?.setAttribute('aria-label', `已完成 ${progress.completed}/${progress.total} 题`);
}

function getPracticeProgress() {
  const items = getPracticeItems();
  const completed = items.reduce((count, item) => (
    count + (hasPracticeAttempt(item.id) ? 1 : 0)
  ), 0);
  const total = items.length;
  return {
    items,
    total,
    completed,
    unfinished: Math.max(total - completed, 0),
    percent: total ? Math.round((completed / total) * 100) : 0
  };
}

function hasPracticeAttempt(id) {
  return Boolean(state.practiceAttempts[String(id)]);
}

function showArticleSummary() {
  const items = getPracticeItems();
  if (!items.length) return;
  const attempts = items.map(item => ({ item, attempt: state.practiceAttempts[String(item.id)] }));
  const correct = attempts.filter(entry => entry.attempt && entry.attempt.correct).length;
  const wrong = attempts.filter(entry => entry.attempt && !entry.attempt.correct);
  const accuracy = Math.round((correct / items.length) * 100);
  state.currentPractice = null;
  els.practiceQuestion.classList.add('hidden');
  els.practiceSummary.classList.remove('hidden');
  els.newPractice.classList.add('hidden');
  els.practiceSource.textContent = `${cleanSourceTitle(state.currentArticleSource)} · 本篇已做完`;
  els.practiceSummary.innerHTML = `
    <div class="article-result-head">
      <span class="result-finished">本篇已做完</span>
      <strong>${correct}/${items.length}</strong>
      <span>正确率 ${accuracy}%</span>
    </div>
    ${wrong.length ? `
      <div class="wrong-review-list">
        <h3>错题复盘（${wrong.length}题）</h3>
        ${wrong.map(({ item, attempt }) => `
          <article class="wrong-review-item">
            <div class="wrong-review-number">原题第 ${escapeHtml(item.number)} 空</div>
            <p><strong>原句：</strong>${escapeHtml(item.originalSentence)}</p>
            <p><strong>转化句：</strong>${escapeHtml(item.targetSentence).replace(/_+/g, '<span class="blank">______</span>')}</p>
            <p class="wrong-answer"><strong>你的答案：</strong>${escapeHtml(attempt.answer || '未填写')}</p>
            <p class="right-answer"><strong>正确答案：</strong>${escapeHtml(getAcceptableAnswers(item).join(' / '))}</p>
          </article>
        `).join('')}
      </div>
    ` : '<div class="all-correct-message">全部答对，太棒了！</div>'}
  `;
  updatePracticeProgress();
  renderArticleList();
}

function buildExplanation(item) {
  const point = item.studyPoint || item.point || item.category;
  return `解析：${escapeHtml(point)}；${escapeHtml(item.original)} → ${escapeHtml(item.target)}。`;
}

function setFeedback(type, text) {
  els.feedback.className = `feedback ${type}`;
  els.feedback.innerHTML = text;
}

function loadMastered() {
  try {
    return new Set(JSON.parse(localStorage.getItem(MASTERED_KEY) || '[]').map(String));
  } catch {
    return new Set();
  }
}

function saveMastered() {
  localStorage.setItem(MASTERED_KEY, JSON.stringify([...state.mastered]));
  saveCloudProgress();
}

function loadCompletedPractice() {
  try {
    return new Set(JSON.parse(localStorage.getItem(PRACTICE_DONE_KEY) || '[]').map(String));
  } catch {
    return new Set();
  }
}

function loadPracticeAttempts() {
  try {
    const value = JSON.parse(localStorage.getItem(PRACTICE_ATTEMPTS_KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function savePracticeAttempts() {
  localStorage.setItem(PRACTICE_ATTEMPTS_KEY, JSON.stringify(state.practiceAttempts));
}

function migrateCompletedPracticeToAttempts() {
  state.completedPractice.forEach(id => {
    if (!state.practiceAttempts[String(id)]) {
      state.practiceAttempts[String(id)] = {
        answer: '',
        correct: true,
        legacy: true
      };
    }
  });
  savePracticeAttempts();
}

function saveCompletedPractice() {
  localStorage.setItem(PRACTICE_DONE_KEY, JSON.stringify([...state.completedPractice]));
}

async function loadCloudProgress() {
  const code = safeGetLogin();
  if (!code) return;
  try {
    const rows = await callSupabaseRpc('get_learning_progress', {
      input_code: code,
      input_system_type: SYSTEM_TYPE
    });
    if (!Array.isArray(rows)) return;
    const row = rows.find(item => item.lesson_id === '__reading_writing__');
    const progress = row && row.progress ? row.progress : {};
    if (Array.isArray(progress.completedPractice)) {
      state.completedPractice = new Set([
        ...state.completedPractice,
        ...progress.completedPractice.map(String)
      ]);
      saveCompletedPractice();
    }
    if (progress.practiceAttempts && typeof progress.practiceAttempts === 'object' && !Array.isArray(progress.practiceAttempts)) {
      state.practiceAttempts = {
        ...progress.practiceAttempts,
        ...state.practiceAttempts
      };
      migrateCompletedPracticeToAttempts();
    }
    if (Array.isArray(progress.mastered)) {
      state.mastered = new Set([
        ...state.mastered,
        ...progress.mastered.map(String)
      ]);
      localStorage.setItem(MASTERED_KEY, JSON.stringify([...state.mastered]));
    }
    migrateCompletedPracticeToAttempts();
  } catch (error) {
    console.warn('Load reading-writing cloud progress failed:', error);
  }
}

function syncCloudProgressInBackground() {
  loadCloudProgress().then(() => {
    renderArticleList();
    renderLearning();
    updatePracticeProgress();
  }).catch(error => {
    console.warn('Background reading-writing progress sync failed:', error);
  });
}

async function saveCloudProgress() {
  const code = safeGetLogin();
  if (!code) return;
  try {
    await callSupabaseRpc('save_learning_progress', {
      input_code: code,
      input_system_type: SYSTEM_TYPE,
      input_lesson_id: '__reading_writing__',
      input_progress: {
        completedPractice: [...state.completedPractice],
        practiceAttempts: state.practiceAttempts,
        mastered: [...state.mastered],
        updatedAt: new Date().toISOString()
      },
      input_completed: false,
      input_score: null
    });
  } catch (error) {
    console.warn('Save reading-writing cloud progress failed:', error);
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('`', '&#96;');
}
