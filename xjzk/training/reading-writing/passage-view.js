/*
 * 读写题 · 篇章模式视图
 * 依赖：passage-engine.js、passages-data.generated.js
 *
 * 交互主线：先填空，后问答；两个阶段共用同一份原文与同一套高亮联动。
 * 联动规则：作答第 n 空/第 n 题 → 原文依据句高亮并滚动到视野；
 *          点击原文任意句 → 反查该句支撑了哪几道题，并给出跳转。
 *
 * 进度存储：本地 localStorage 为即时读写源，
 * 并在 window.ReadingWritingProgress 上暴露接口，由 app.js 同步到 Supabase。
 */
(function () {
  'use strict';

  const Engine = window.PassageEngine;
  const STORAGE_KEY = 'rw_passage_progress_v1';

  const els = {};
  let index = null;
  let stage = 'blank';
let answers = {};
let results = {};
let activeItemNo = '';
let library = [];
let currentPassageIndex = 0;
let stageTabsBound = false;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const root = document.getElementById('passageApp');
    if (!root || !Engine) return;
    // 支持多篇：优先批量产出 PASSAGES_DATA，其次单篇 PASSAGE_DATA
    const list = Array.isArray(window.PASSAGES_DATA) && window.PASSAGES_DATA.length
      ? window.PASSAGES_DATA
      : (Array.isArray(window.PASSAGE_DATA) ? window.PASSAGE_DATA : []);
    if (!list.length) return;

    els.root = root;
    els.passageText = document.getElementById('passageText');
    els.passageScroll = document.getElementById('passageScroll');
    els.workScroll = document.getElementById('workScroll');
    els.summaryBox = document.getElementById('summaryBox');
    els.blankPanel = document.getElementById('blankPanel');
    els.questionPanel = document.getElementById('questionPanel');
    els.stageTabs = root.querySelectorAll('.stage-tab');
    els.progressText = document.getElementById('stageProgress');
    els.resultBox = document.getElementById('stageResult');

    // 目录先展示中考真题/模拟题，再展示九年级初阶；每组内按
    // 乌鲁木齐 → 自治区 → 其他地区排序，并保持同优先级下的原始顺序。
    library = list.map((item, sourceIndex) => ({ item, sourceIndex }))
      .sort((a, b) => {
        return getPassageGroupRank(a.item) - getPassageGroupRank(b.item)
          || getUpdatedSourceRank(a.item.source) - getUpdatedSourceRank(b.item.source)
          || a.sourceIndex - b.sourceIndex;
      })
      .map(({ item }) => item);
    renderPicker();
    // 初始停在目录页：先看总览，想练哪篇再点进去
    loadPassage(0);
    showCatalog();
  }

  /* ---------------- 篇目选择 ---------------- */

  function renderPicker() {
    const box = document.getElementById('passagePicker');
    if (!box) return;
    const counters = { exam: 0, basic: 0 };
    box.innerHTML = library.map((p, i) => {
      const group = getPassageGroup(p);
      counters[group] += 1;
      return `
        <button type="button" class="picker-item${i === currentPassageIndex ? ' active' : ''}" data-passage-index="${i}">
          <strong>${escapeHtml(String(counters[group]).padStart(2, '0'))}</strong>
          <span>${escapeHtml(cleanTitle(p))}</span>
        </button>
      `;
    }).join('');
    box.querySelectorAll('[data-passage-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        loadPassage(Number(btn.dataset.passageIndex));
        renderPicker();
      });
    });
  }

  // 返回目录按钮（只绑一次）
  function bindCatalogBack() {
    const btn = document.getElementById('passageBack');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', showCatalog);
  }

  function cleanTitle(p) {
    const t = String(p.titleCn || '').trim();
    if (t) return t;
    const src = String(p.source || '').trim();
    return src.length > 22 ? src.slice(0, 22) + '…' : src;
  }

  function getUpdatedSourceRank(source) {
    const text = String(source || '');
    if (text.includes('乌鲁木齐')) return 0;
    if (/自治区|[·\s]新疆[·\s].*中考真题/.test(text)) return 1;
    return 2;
  }

  function getPassageGroup(passage) {
    return /真题|模考/.test(String(passage && passage.category || '')) ? 'exam' : 'basic';
  }

  function getPassageGroupRank(passage) {
    return getPassageGroup(passage) === 'exam' ? 0 : 1;
  }

  function getPassageGroupMeta(group) {
    return group === 'exam'
      ? { title: '中考题目练习', note: '真题 + 模拟题' }
      : { title: '初阶', note: '九年级' };
  }

  function loadPassage(i) {
    currentPassageIndex = i;
    index = Engine.buildIndex(library[i]);
    loadProgress();
    activeItemNo = '';

    renderPassage();
    renderSummary();
    renderBlanks();
    renderQuestions();
    if (!stageTabsBound) {
      bindStageTabs();
      stageTabsBound = true;
    }
    bindCatalogBack();
    switchStage('blank');
    updateProgress();
    if (els.workScroll) els.workScroll.scrollTop = 0;
    if (els.passageScroll) els.passageScroll.scrollTop = 0;
  }

  /* ---------------- 总目录 ---------------- */

  /*
   * 目录结构与语法填空 / 阅读理解板块统一（workbook-modules 统一规范）：
   * 单列横条行 = 左侧彩条 + 顶部状态徽标 + 「01. 标题」 + 来源行 + 右侧紫色「开始训练」按钮。
   * 通关后按钮文案变为「重新训练」，与语法板块行为一致。
   */

  function renderCatalog() {
    const grid = document.getElementById('passageCatalogGrid');
    if (!grid) return;

    const o = collectOverall();
    const summary = document.getElementById('catalogSummary');
    if (summary) {
      summary.innerHTML = `
        <span class="sum-item">共 <strong>${o.totalPassages}</strong> 篇</span>
        <span class="sum-item">已通关 <strong>${o.donePassages}</strong> 篇</span>
        <span class="sum-item">题目 <strong>${o.doneItems}</strong>/${o.totalItems} 题</span>
      `;
    }

    const parts = [];
    const groupTotals = library.reduce((totals, passage) => {
      const group = getPassageGroup(passage);
      totals[group] += 1;
      return totals;
    }, { exam: 0, basic: 0 });
    const groupCounters = { exam: 0, basic: 0 };
    let currentGroup = '';
    library.forEach((p, i) => {
      const group = getPassageGroup(p);
      if (group !== currentGroup) {
        currentGroup = group;
        const meta = getPassageGroupMeta(group);
        parts.push(`
          <div class="catalog-group-heading" data-passage-group="${group}">
            <div><h3>${meta.title}</h3><small>${meta.note}</small></div>
            <span>${groupTotals[group]} 篇</span>
          </div>
        `);
      }
      groupCounters[group] += 1;
      const nb = (p.blanks || []).length;
      const nq = (p.questions || []).length;
      const saved = loadAllProgress()[String(p.id)] || {};
      const res = saved.results || {};
      let done = 0;
      (p.blanks || []).concat(p.questions || []).forEach(it => {
        const r = res[String(it.no)];
        if (r && r.level === 'correct') done += 1;
      });
      const total = nb + nq;
      const finished = total > 0 && done === total;
      const started = done > 0;
      const serial = String(groupCounters[group]).padStart(2, '0');
      const source = String(p.source || '').replace(/^【来源】/, '').trim();
      const officialMatch = source.match(/(20\d{2}).*中考真题/);
      const officialBadge = officialMatch
        ? `<span class="official-exam-badge">${officialMatch[1]} 新疆中考真题</span>`
        : '';

      /*
       * 徽标位放「进度状态」：12 篇全是缩写填空，题型标没有区分度；
       * 学生扫目录真正要判断的是"哪篇还没做/做到哪/哪篇通关了"。
       */
      const badge = finished
        ? { cls: 'is-passed', text: '已通关 ✓' }
        : started
          ? { cls: 'is-doing', text: `已做 ${done}/${total}` }
          : { cls: 'is-new', text: '未开始' };

      parts.push(`
        <button type="button" class="catalog-row${finished ? ' is-done' : ''}" data-open-passage="${i}">
          <span class="catalog-index">${serial}</span>
          <span class="catalog-main">
            <span class="catalog-badges">${officialBadge}</span>
            <strong>${escapeHtml(cleanTitle(p))}</strong>
            <span class="catalog-detail-row">
              <span class="row-meta" title="${escapeHtml(source)}">${escapeHtml(source)}</span>
              <span class="catalog-progress${finished ? ' is-complete' : ''}">${finished ? '已完成' : `已练 ${done}/${total} 题`}</span>
            </span>
          </span>
          <span class="catalog-action" aria-hidden="true"><span class="catalog-action-label">${finished ? '重新训练' : '开始训练'}</span><span class="catalog-action-arrow">→</span></span>
        </button>
      `);
    });
    grid.innerHTML = parts.join('');

    grid.querySelectorAll('[data-open-passage]').forEach(btn => {
      btn.addEventListener('click', () => openPassage(Number(btn.dataset.openPassage)));
    });
  }

  // 目录 ↔ 训练页 切换
  function openPassage(i) {
    loadPassage(i);
    showTraining();
  }

  function showTraining() {
    // 篇章训练已并入题库板块：进训练页时把题库首页（真题列表 + 篇章目录）整体藏起来
    const home = document.getElementById('libraryHome');
    const cat = document.getElementById('passageCatalog');
    const tr = document.getElementById('passageTraining');
    if (home) home.hidden = true;
    if (cat) cat.hidden = true;
    if (tr) tr.hidden = false;
  }

  function showCatalog() {
    const home = document.getElementById('libraryHome');
    const cat = document.getElementById('passageCatalog');
    const tr = document.getElementById('passageTraining');
    if (home) home.hidden = false;
    if (cat) cat.hidden = false;
    if (tr) tr.hidden = true;
    renderCatalog();
  }

  /* ---------------- 原文渲染 ---------------- */

  function renderPassage() {
    const guide = document.getElementById('passageGuide');
    if (guide) guide.textContent = index.passage.guide;

    els.passageText.innerHTML = index.passage.paragraphs
      .map((paragraph, pIndex) => `
        <p class="passage-paragraph">
          <span class="para-index">${pIndex + 1}</span>
          ${paragraph.sentences.map(sentence => renderSentence(sentence)).join(' ')}
        </p>
      `)
      .join('');

    els.passageText.querySelectorAll('.sentence').forEach(node => {
      node.addEventListener('click', () => showSentenceRefs(node.dataset.sentenceId));
    });
  }

  function renderSentence(sentence) {
    const refs = index.refsBySentence[sentence.id] || [];
    const badges = refs.map(item => (
      `<button type="button" class="sentence-ref" data-goto="${item.no}" data-stage="${item.kind === 'blank' ? 'blank' : 'question'}">${item.no}</button>`
    )).join('');
    return `
      <span class="sentence" data-sentence-id="${sentence.id}">
        <span class="sentence-text">${escapeHtml(sentence.text)}</span>
        <span class="sentence-refs">${badges}</span>
      </span>
    `;
  }

  /* ---------------- 摘要文（缩写文）渲染 ---------------- */

  /*
   * 默认折叠：缩写文是一整段带空格的文字，展开会把右栏首屏占满，
   * 真正的作答卡片反而露不出来。折叠后卡片直接进首屏，
   * 标题栏上的小圆点仍能一眼看出哪几空还没做对。
   */
  function renderSummary() {
    const parts = index.passage.summary.map(part => {
      if (part.type === 'text') {
        return `<span class="summary-text">${escapeHtml(part.text)}</span>`;
      }
      return `<input class="summary-blank" type="text" data-blank="${part.no}" autocomplete="off" spellcheck="false" aria-label="第 ${part.no} 空">`;
    }).join('');

    const pips = index.blanks.map(blank => (
      `<span class="summary-pip" data-pip="${blank.no}" title="第 ${blank.no} 空">${blank.no}</span>`
    )).join('');

    els.summaryBox.innerHTML = `
      <button type="button" class="summary-toggle" id="summaryToggle" aria-expanded="false" aria-controls="summaryBody">
        <span>缩写文（点此${'查看'}原文缩写，空位可直接填写）</span>
      </button>
      <div class="summary-progress" id="summaryProgress" aria-label="各空完成情况">${pips}</div>
      <div class="summary-body hidden" id="summaryBody">
        <div class="summary-instruction">${escapeHtml(index.passage.blankInstruction)}</div>
        <p class="summary-text-flow">${parts}</p>
      </div>
    `;

    const toggle = document.getElementById('summaryToggle');
    const body = document.getElementById('summaryBody');
    if (toggle && body) {
      toggle.addEventListener('click', () => {
        const open = els.summaryBox.classList.toggle('is-open');
        body.classList.toggle('hidden', !open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('span').textContent = open
          ? '缩写文（点此收起）'
          : '缩写文（点此查看原文缩写，空位可直接填写）';
      });
    }

    els.summaryBox.querySelectorAll('.summary-blank').forEach(input => {
      const no = input.dataset.blank;
      if (answers[no]) input.value = answers[no];
      applyBlankLook(input, no);
      input.addEventListener('focus', () => setActiveItem(no, 'blank'));
      input.addEventListener('input', () => {
        answers[no] = input.value;
        saveProgress();
      });
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          submitBlank(no);
          focusNextBlank(no);
        }
      });
    });
  }

  function applyBlankLook(input, no) {
    const result = results[no];
    input.classList.remove('is-correct', 'is-wrong');
    if (result && result.level === 'correct') input.classList.add('is-correct');
    if (result && result.level === 'wrong') input.classList.add('is-wrong');

    const pip = els.summaryBox.querySelector(`[data-pip="${no}"]`);
    if (pip) {
      pip.classList.remove('is-correct', 'is-wrong');
      if (result && result.level === 'correct') pip.classList.add('is-correct');
      if (result && result.level === 'wrong') pip.classList.add('is-wrong');
    }
  }

  /* ---------------- 第一节：填空作答区 ---------------- */

  function renderBlanks() {
    els.blankPanel.innerHTML = index.blanks.map(blank => `
      <article class="blank-item" data-blank-item="${blank.no}">
        <div class="item-head">
          <span class="item-no">第 ${blank.no} 空</span>
          <span class="item-category">${escapeHtml(blank.category)}</span>
        </div>
        <div class="item-context">
          <span class="context-label">缩写文语境</span>
          <p>${escapeHtml(blankContext(blank.no))}</p>
        </div>
        <div class="item-answer">
          <label for="blank-input-${blank.no}">我的答案</label>
          <input id="blank-input-${blank.no}" class="blank-input" type="text" data-blank-input="${blank.no}" autocomplete="off" spellcheck="false" placeholder="每空一词">
          <button type="button" class="submit-blank" data-submit-blank="${blank.no}">提交</button>
        </div>
        <div class="item-feedback" data-blank-feedback="${blank.no}"></div>
        <div class="item-detail hidden" data-blank-detail="${blank.no}">
          <p class="detail-point"><strong>解析：</strong>${escapeHtml(blank.point)}</p>
          <p class="detail-study"><strong>怎么判断：</strong>${escapeHtml(blank.studyPoint)}</p>
          ${blank.distractors.length ? `
            <p class="detail-distractors"><strong>易错干扰：</strong>${blank.distractors.map(word => `<code>${escapeHtml(word)}</code>`).join('、')}</p>
          ` : ''}
        </div>
      </article>
    `).join('');

    els.blankPanel.querySelectorAll('[data-blank-input]').forEach(input => {
      const no = input.dataset.blankInput;
      if (answers[no]) input.value = answers[no];
      input.addEventListener('focus', () => setActiveItem(no, 'blank'));
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          submitBlank(no);
          focusNextBlank(no);
        }
      });
    });

    els.blankPanel.querySelectorAll('[data-submit-blank]').forEach(button => {
      button.addEventListener('click', () => submitBlank(button.dataset.submitBlank));
    });

    syncBlankInputs();
  }

  /*
   * 填空语境 = 该空所在的完整一句话（句子边界按 . ! ? 切分），
   * 而不是前后各截一段——「一句话」才是学生真正要定位的最小单位。
   */
  function blankContext(no) {
    const flat = index.passage.summary
      .map(part => (part.type === 'text' ? part.text : `____${part.no}____`))
      .join('');

    const target = `____${no}____`;
    const at = flat.indexOf(target);
    if (at < 0) return '____';

    let start = 0;
    for (let i = at - 1; i >= 0; i -= 1) {
      if ('.!?'.includes(flat[i]) && /[\s"'”’)\]]*$/.test(flat.slice(i + 1, i + 4))) {
        start = i + 1;
        break;
      }
    }
    let end = flat.length;
    for (let i = at; i < flat.length; i += 1) {
      if ('.!?'.includes(flat[i])) {
        end = i + 1;
        break;
      }
    }

    const sentence = flat.slice(start, end).trim();
    // 同句内若有其他空，用「（第 n 空）」占位，避免抢注意力
    return sentence
      .replace(/____(\d+)____/g, (match, otherNo) => (String(otherNo) === String(no) ? '____' : `（第 ${otherNo} 空）`))
      .replace(/\s+/g, ' ')
      .trim();
  }

  function syncBlankInputs() {
    els.summaryBox.querySelectorAll('.summary-blank').forEach(input => {
      const no = input.dataset.blank;
      if (answers[no]) input.value = answers[no];
      applyBlankLook(input, no);
    });
    els.blankPanel.querySelectorAll('[data-blank-input]').forEach(input => {
      const no = input.dataset.blankInput;
      if (answers[no]) input.value = answers[no];
    });
  }

  function submitBlank(no) {
    const blank = index.refsByBlank[String(no)];
    if (!blank) return;
    const input = els.blankPanel.querySelector(`[data-blank-input="${no}"]`);
    const typed = input ? input.value : '';
    answers[String(no)] = typed;
    const result = Engine.gradeBlank(blank, typed);
    results[String(no)] = result;

    applyBlankLook(els.summaryBox.querySelector(`.summary-blank[data-blank="${no}"]`), String(no));

    const feedback = els.blankPanel.querySelector(`[data-blank-feedback="${no}"]`);
    const detail = els.blankPanel.querySelector(`[data-blank-detail="${no}"]`);
    if (!feedback) return;

    if (result.level === 'blank') {
      feedback.className = 'item-feedback warn';
      feedback.textContent = '这一空还没作答，先写下你的答案。';
      detail.classList.add('hidden');
      saveProgress();
      return;
    }
    if (result.level === 'correct') {
      feedback.className = 'item-feedback good';
      feedback.textContent = `正确：${result.matched}`;
    } else {
      feedback.className = 'item-feedback bad';
      feedback.textContent = `不对。参考答案：${result.accepted.join(' / ')}`;
    }
    detail.classList.remove('hidden');
    highlightEvidence(blank.evidence, blank.anchor);
    saveProgress();
    updateProgress();
  }

  function focusNextBlank(no) {
    const next = index.blanks.find(blank => Number(blank.no) === Number(no) + 1);
    if (!next) return;
    const input = els.blankPanel.querySelector(`[data-blank-input="${next.no}"]`);
    if (input) input.focus();
  }

  /* ---------------- 第二节：问答作答区 ---------------- */

  /*
   * 问答题的作答动线是「读题 → 回原文找句 → 落笔」，
   * 因此题干整行放在上方，输入框和提交按钮压在其下一行，
   * 视线自上而下走一遍正好是做题顺序。
   */
  function renderQuestions() {
    els.questionPanel.innerHTML = index.questions.map(question => `
      <article class="question-item" data-question-item="${question.no}">
        <div class="question-row">
          <div class="question-lead">
            <span class="item-no">${escapeHtml(question.no)}</span>
            <p class="question-stem">${escapeHtml(question.question)}</p>
            <span class="item-tag">${question.type === 'yesno' ? '判断正误' : '细节理解'}</span>
          </div>
          <div class="question-write">
            <label class="sr-only" for="question-input-${question.no}">第 ${escapeHtml(question.no)} 题作答</label>
            <textarea id="question-input-${question.no}" class="question-input" data-question-input="${question.no}" rows="2" placeholder="用完整的一句英语作答"></textarea>
            <button type="button" class="submit-question" data-submit-question="${question.no}">提交</button>
          </div>
        </div>
        <div class="item-feedback" data-question-feedback="${question.no}"></div>
        <div class="item-detail hidden" data-question-detail="${question.no}">
          <p class="detail-point"><strong>解析：</strong>${escapeHtml(question.point)}</p>
          <p class="detail-study"><strong>怎么判断：</strong>${escapeHtml(question.studyPoint)}</p>
        </div>
      </article>
    `).join('');

    els.questionPanel.querySelectorAll('[data-question-input]').forEach(input => {
      const no = input.dataset.questionInput;
      if (answers[no]) input.value = answers[no];
      input.addEventListener('focus', () => setActiveItem(no, 'question'));
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          submitQuestion(no);
        }
      });
    });

    els.questionPanel.querySelectorAll('[data-submit-question]').forEach(button => {
      button.addEventListener('click', () => submitQuestion(button.dataset.submitQuestion));
    });
  }

  function submitQuestion(no) {
    const question = index.refsByQuestion[String(no)];
    if (!question) return;
    const input = els.questionPanel.querySelector(`[data-question-input="${no}"]`);
    const typed = input ? input.value : '';
    answers[String(no)] = typed;
    const result = Engine.gradeQuestion(question, typed);
    results[String(no)] = result;

    const feedback = els.questionPanel.querySelector(`[data-question-feedback="${no}"]`);
    const detail = els.questionPanel.querySelector(`[data-question-detail="${no}"]`);
    if (!feedback) return;

    if (result.level === 'blank') {
      feedback.className = 'item-feedback warn';
      feedback.textContent = '这一题还没作答。';
      detail.classList.add('hidden');
      saveProgress();
      return;
    }
    if (result.level === 'correct') {
      feedback.className = 'item-feedback good';
      feedback.textContent = result.exact ? '正确，与参考答案一致。' : `意思到位：命中 ${result.hits.join('、')}。`;
    } else if (result.level === 'partial') {
      feedback.className = 'item-feedback warn';
      const prefix = result.message ? `${result.message} ` : '';
      feedback.textContent = `${prefix}缺少：${result.misses.join('、')}。参考答案：${result.accepted.join(' / ')}`;
    } else {
      feedback.className = 'item-feedback bad';
      feedback.textContent = `${result.message || ''} 参考答案：${result.accepted.join(' / ')}`;
    }
    detail.classList.remove('hidden');
    highlightEvidence(question.evidence, question.anchor);
    saveProgress();
    updateProgress();

    // 答对就顺着往下走：自动跳到下一道待做题，并把它的依据句点亮
    if (result.level === 'correct') {
      const next = index.questions.find(item => !(
        results[item.no] && results[item.no].level === 'correct'
      ));
      if (next && String(next.no) !== String(no)) {
        setActiveItem(next.no, 'question');
        bringIntoView(els.questionPanel.querySelector(`[data-question-item="${next.no}"]`));
      }
    }
  }

  /*
   * 只滚右栏自己的滚动区，不动整页，也不动左栏原文。
   * 若目标卡片已在可视区内则不滚，避免每次点击都轻微抖动。
   */
  function bringIntoView(node) {
    const scroller = els.workScroll;
    if (!node || !scroller) return;
    const PAD = 16;
    const scrollerRect = scroller.getBoundingClientRect();
    const rect = node.getBoundingClientRect();
    const visible = rect.top >= scrollerRect.top + PAD
      && rect.bottom <= scrollerRect.bottom - PAD;
    if (visible) return;
    const top = scroller.scrollTop + rect.top - scrollerRect.top - PAD;
    scroller.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  /* ---------------- 高亮联动 ---------------- */

  function setActiveItem(no, kind) {
    activeItemNo = String(no);
    const item = kind === 'blank' ? index.refsByBlank[activeItemNo] : index.refsByQuestion[activeItemNo];
    els.root.querySelectorAll('[data-blank-item],[data-question-item]').forEach(node => {
      node.classList.remove('is-active');
    });
    els.summaryBox.querySelectorAll('.summary-pip').forEach(pip => {
      pip.classList.toggle('is-active', kind === 'blank' && pip.dataset.pip === activeItemNo);
    });
    const target = kind === 'blank'
      ? els.root.querySelector(`[data-blank-item="${activeItemNo}"]`)
      : els.root.querySelector(`[data-question-item="${activeItemNo}"]`);
    if (target) target.classList.add('is-active');
    if (item) highlightEvidence(item.evidence, item.anchor);
  }

  // 高亮依据句并滚动到视野；anchor 存在时对句内锚词二次加强
  function highlightEvidence(evidence, anchor) {
    clearHighlights();
    const ids = evidence || [];
    if (!ids.length) return;
    ids.forEach(id => {
      const node = els.passageText.querySelector(`.sentence[data-sentence-id="${id}"]`);
      if (!node) return;
      node.classList.add('is-highlight');
      if (anchor) {
        const textNode = node.querySelector('.sentence-text');
        markAnchor(textNode, anchor);
      }
    });
    const first = els.passageText.querySelector('.sentence.is-highlight');
    if (first) scrollToSentence(first);
  }

  /*
   * 只滚左栏原文自己的滚动区，不动整页。
   * 这样右栏题目位置纹丝不动，学生眼睛不用来回找「刚才那道题现在在哪」。
   * 若已在可视区内（左右差值小于容差）则不滚，避免每次点击都轻微抖动。
   */
  function scrollToSentence(node) {
    const scroller = els.passageScroll;
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const PAD = 16;
    // 目标：把句子放在滚动区可视范围的靠上位置，留出上下文
    const offset = nodeRect.top - scrollerRect.top - PAD;
    const visible = nodeRect.top >= scrollerRect.top + PAD
      && nodeRect.bottom <= scrollerRect.bottom - PAD;
    if (visible) return;
    scroller.scrollTo({
      top: Math.max(scroller.scrollTop + offset, 0),
      behavior: 'smooth'
    });
  }

  function markAnchor(textNode, anchor) {
    if (!textNode || !anchor) return;
    const text = textNode.textContent;
    const index = text.indexOf(anchor);
    if (index < 0) return;
    textNode.innerHTML = '';
    textNode.appendChild(document.createTextNode(text.slice(0, index)));
    const mark = document.createElement('mark');
    mark.className = 'anchor-mark';
    mark.textContent = anchor;
    textNode.appendChild(mark);
    textNode.appendChild(document.createTextNode(text.slice(index + anchor.length)));
  }

  function clearHighlights() {
    els.passageText.querySelectorAll('.sentence.is-highlight').forEach(node => {
      node.classList.remove('is-highlight');
      const textNode = node.querySelector('.sentence-text');
      if (textNode && textNode.querySelector('mark')) textNode.textContent = textNode.textContent;
    });
  }

  // 反查：点原文句子 → 列出它支撑了哪几道题
  function showSentenceRefs(sentenceId) {
    const refs = index.refsBySentence[sentenceId] || [];
    const node = els.passageText.querySelector(`.sentence[data-sentence-id="${sentenceId}"]`);
    if (node) node.classList.toggle('is-probed');

    const existing = els.root.querySelector('.ref-popover');
    if (existing) existing.remove();

    if (!refs.length) return;
    const popover = document.createElement('div');
    popover.className = 'ref-popover';
    popover.innerHTML = `
      <strong>这句原文支撑：</strong>
      ${refs.map(item => `<button type="button" class="ref-jump" data-jump-no="${item.no}" data-jump-stage="${item.kind === 'blank' ? 'blank' : 'question'}">第 ${item.no} ${item.kind === 'blank' ? '空' : '题'}</button>`).join('')}
    `;
    els.root.appendChild(popover);

    popover.querySelectorAll('.ref-jump').forEach(button => {
      button.addEventListener('click', () => {
        const no = button.dataset.jumpNo;
        switchStage(button.dataset.jumpStage);
        setActiveItem(no, button.dataset.jumpStage === 'blank' ? 'blank' : 'question');
        popover.remove();
        // 程序化跳转：先把卡片带进右栏可视区，再聚焦输入框
        const card = els.root.querySelector(
          button.dataset.jumpStage === 'blank'
            ? `[data-blank-item="${no}"]`
            : `[data-question-item="${no}"]`
        );
        bringIntoView(card);
        const field = button.dataset.jumpStage === 'blank'
          ? els.blankPanel.querySelector(`[data-blank-input="${no}"]`)
          : els.questionPanel.querySelector(`[data-question-input="${no}"]`);
        if (field) field.focus();
      });
    });

    /*
     * 关闭监听必须等当前这次 click 派发结束后再挂，
     * 否则监听会在同一次事件冒泡中被立即触发，把刚生成的浮层自己删掉。
     */
    setTimeout(() => {
      document.addEventListener('click', function dismiss(event) {
        if (popover.contains(event.target)) return;
        popover.remove();
        document.removeEventListener('click', dismiss);
      });
    }, 0);
  }

  /* ---------------- 阶段切换与进度 ---------------- */

  function bindStageTabs() {
    els.stageTabs.forEach(tab => {
      tab.addEventListener('click', () => switchStage(tab.dataset.stage));
    });
  }

  function switchStage(next) {
    stage = next === 'question' ? 'question' : 'blank';
    els.stageTabs.forEach(tab => {
      const active = tab.dataset.stage === stage;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    /*
     * 缩写文只在第一节有用：做问答题时它是干扰项，
     * 会把「先看问题、再回原文找句子」的视线来回拽，所以整块收起而不是淡化。
     */
    els.summaryBox.classList.toggle('hidden', stage !== 'blank');
    els.blankPanel.classList.toggle('hidden', stage !== 'blank');
    els.questionPanel.classList.toggle('hidden', stage !== 'question');
    updateProgress();

    // 进入问答题时，直接把当前题的依据句点亮，省去学生自己找
    if (stage === 'question') focusCurrentQuestion();
  }

  // 定位到「当前该做的那道问答题」：优先第一道未答对的
  function focusCurrentQuestion() {
    const target = index.questions.find(question => !(
      results[question.no] && results[question.no].level === 'correct'
    )) || index.questions[0];
    if (!target) return;
    setActiveItem(target.no, 'question');
  }

  function updateProgress() {
    const blankDone = index.blanks.filter(blank => results[blank.no] && results[blank.no].level === 'correct').length;
    const questionDone = index.questions.filter(question => results[question.no] && results[question.no].level === 'correct').length;
    els.progressText.textContent = `第一节 ${blankDone}/${index.blanks.length} 空　·　第二节 ${questionDone}/${index.questions.length} 题`;

    const blankTab = els.root.querySelector('.stage-tab[data-stage="blank"]');
    const questionTab = els.root.querySelector('.stage-tab[data-stage="question"]');
    if (blankTab) blankTab.querySelector('.tab-count').textContent = `${blankDone}/${index.blanks.length}`;
    if (questionTab) questionTab.querySelector('.tab-count').textContent = `${questionDone}/${index.questions.length}`;

    renderResult(blankDone, questionDone);
    renderOverall();
  }

  /* ---------------- 全站总进度 ---------------- */

  /*
   * 汇总全部篇目的完成情况，显示在工具栏。
   * 「做对」才计入完成；判为 partial / wrong 的算已作答但未通关，
   * 这样学生能看到自己哪里还欠着。
   */
  function collectOverall() {
    const all = loadAllProgress();
    let doneItems = 0;
    let totalItems = 0;
    let donePassages = 0;

    library.forEach(p => {
      const saved = all[String(p.id)] || {};
      const res = saved.results || {};
      const nb = (p.blanks || []).length;
      const nq = (p.questions || []).length;
      totalItems += nb + nq;
      let pDone = 0;
      (p.blanks || []).concat(p.questions || []).forEach(item => {
        const r = res[String(item.no)];
        if (r && r.level === 'correct') { doneItems += 1; pDone += 1; }
      });
      if (pDone === nb + nq && nb + nq > 0) donePassages += 1;
    });

    return { doneItems, totalItems, donePassages, totalPassages: library.length };
  }

  function renderOverall() {
    const box = document.getElementById('passageOverall');
    if (!box) return;
    const o = collectOverall();
    box.textContent = `已完成 ${o.donePassages}/${o.totalPassages} 篇　·　题目 ${o.doneItems}/${o.totalItems} 题`;
  }

  // 供 app.js 同步云端进度用
  window.ReadingWritingProgress = {
    read: loadAllProgress,
    write(next) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next || {}));
      } catch { /* 存储不可用时静默降级 */ }
    },
    overall: collectOverall
  };

  function renderResult(blankDone, questionDone) {
    const total = index.blanks.length + index.questions.length;
    const done = blankDone + questionDone;
    if (!done) {
      els.resultBox.className = 'stage-result';
      els.resultBox.textContent = `先按顺序完成第一节的 ${index.blanks.length} 个空，再做第二节的 ${index.questions.length} 道问答。`;
      return;
    }
    const wrong = [];
    index.allItems.forEach(item => {
      const result = results[item.no];
      if (result && (result.level === 'wrong' || result.level === 'partial')) wrong.push({ item, result });
    });
    els.resultBox.className = `stage-result${done === total ? ' finished' : ''}`;
    els.resultBox.innerHTML = `
      <div class="result-line">
        <strong>${done}/${total}</strong>
        <span>第一节 ${blankDone}/${index.blanks.length} 空</span>
        <span>第二节 ${questionDone}/${index.questions.length} 题</span>
      </div>
      ${wrong.length ? `
        <p class="result-remind">还有 ${wrong.length} 处需要回原文再看一遍：${wrong.map(entry => `第 ${entry.item.no} ${entry.item.kind === 'blank' ? '空' : '题'}`).join('、')}</p>
      ` : done === total ? '<p class="result-remind ok">本篇全部答对，可以进入下一篇了。</p>' : ''}
    `;
  }

  /* ---------------- 进度存储 ---------------- */

  /*
   * 进度按篇隔离：一次存全部篇，键为篇 id。
   * 之前是单一 answers/results，切篇就丢，12 篇会互相覆盖。
   */
  function loadAllProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch {
      return {};
    }
  }

  function loadProgress() {
    const all = loadAllProgress();
    const key = library[currentPassageIndex] ? String(library[currentPassageIndex].id || currentPassageIndex) : '0';
    const saved = all[key] || {};
    answers = saved.answers || {};
    results = saved.results || {};
  }

  function saveProgress() {
    const key = library[currentPassageIndex] ? String(library[currentPassageIndex].id || currentPassageIndex) : '0';
    const all = loadAllProgress();
    all[key] = { answers, results };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      /* 本地存储不可用时静默降级，不影响做题 */
    }
    // 通知外部（app.js）把篇章进度同步到云端
    window.dispatchEvent(new CustomEvent('passage-progress-saved'));
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
})();
