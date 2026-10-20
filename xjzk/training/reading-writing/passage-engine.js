/*
 * 读写题 · 篇章模式引擎（纯逻辑，无 DOM）
 * 职责：篇章数据建模、填空/问答分级判分、原文证据索引
 *
 * 设计要点
 * 1. 原文按「段 → 句」拆分，每句有稳定 id（p2s3），是所有高亮的锚点。
 * 2. 每个填空与每道问答都挂 evidence（证据句 id 数组）+ 可选 anchor（句内锚词）。
 * 3. 双向索引：题 → 原文句（做题时高亮）；原文句 → 题（点句子反查归属）。
 * 4. 问答采用「分级判分」而不是整句严格匹配，让学生看得懂为什么被判对/判错。
 */
window.PassageEngine = (function () {
  'use strict';

  /* ---------------- 基础工具 ---------------- */

  function normalize(value) {
    return String(value == null ? '' : value)
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  // 多答案分隔：/ ／ or 或者
  function splitAnswers(value) {
    return String(value == null ? '' : value)
      .split(/\s*(?:\/|／|\bor\b|或者)\s*/i)
      .map(item => item.trim())
      .filter(Boolean);
  }

  /*
   * 数字等价：中考答案常同时给数字与英文数词（"Three." / "3 times."），
   * 学生写哪种都算对，判分时必须互认。
   */
  const NUMBER_WORDS = {
    one: '1', two: '2', three: '3', four: '4', five: '5',
    six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
    twice: '2', thrice: '3', once: '1'
  };

  function numberForms(token) {
    const t = normalize(token);
    const out = [t];
    if (NUMBER_WORDS[t]) out.push(NUMBER_WORDS[t]);
    Object.keys(NUMBER_WORDS).forEach(w => {
      if (NUMBER_WORDS[w] === t) out.push(w);
    });
    return out;
  }

  /** 关键词是否命中：数字/数词互认，其余走子串包含 */
  function keywordHit(typed, keyword) {
    if (typed.includes(normalize(keyword))) return true;
    const kwForms = numberForms(keyword);
    if (kwForms.length <= 1) return false;
    // 关键词是数字或数词时，检查学生作答里有没有等价写法
    return kwForms.some(form =>
      new RegExp('(^|\\W)' + form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|\\W)').test(typed));
  }

  /* ---------------- 填空判分 ---------------- */

  /**
   * @returns {{level:'blank'|'correct'|'wrong', accepted:string[], matched:string}}
   * 填空沿用严格字符串匹配：忽略首尾空格、连续空格与大小写；不忽略标点，不做词形模糊。
   */
  function gradeBlank(blank, input) {
    const typed = normalize(input);
    const accepted = splitAnswers(blank.answer);
    if (!typed) return { level: 'blank', accepted, matched: '' };
    const matched = accepted.find(item => normalize(item) === typed) || '';
    return {
      level: matched ? 'correct' : 'wrong',
      accepted,
      matched
    };
  }

  /* ---------------- 问答判分 ---------------- */

  const POLARITY_RULES = [
    { value: 'yes', pattern: /\byes\b/ },
    { value: 'no', pattern: /\bno\b/ }
  ];

  // 判断题极性识别：优先看句首 40 字符，避免句尾赘述造成误判
  function detectPolarity(text) {
    const normalized = normalize(text);
    if (!normalized) return '';
    const head = normalized.slice(0, 40);
    const scan = value => {
      for (const rule of POLARITY_RULES) {
        if (rule.pattern.test(value)) return rule.value;
      }
      return '';
    };
    return scan(head) || scan(normalized);
  }

  /**
   * 问答题分级判分
   * level: blank | correct | partial | wrong
   * partial 表示「方向对但表达不完整」，这是学生最需要知道的一档。
   */
  function gradeQuestion(question, input) {
    const typed = normalize(input);
    const accepted = splitAnswers(question.answer);
    const keywords = question.keywords || [];

    if (!typed) {
      return { level: 'blank', hits: [], misses: keywords, accepted };
    }

    // 1) 与标准答案完全一致
    if (accepted.some(item => normalize(item) === typed)) {
      return { level: 'correct', hits: keywords.slice(), misses: [], accepted, exact: true };
    }

    // 2) 判断题先校验极性
    if (question.polarity) {
      const polarity = detectPolarity(typed);
      if (!polarity) {
        return {
          level: 'wrong',
          hits: [],
          misses: keywords,
          accepted,
          reason: 'polarity-missing',
          message: '这是判断题，请先明确回答 Yes 或 No。'
        };
      }
      if (polarity !== question.polarity) {
        return {
          level: 'wrong',
          hits: [],
          misses: keywords,
          accepted,
          reason: 'polarity',
          message: `原文证据与「${question.polarity === 'yes' ? 'Yes' : 'No'}」相反，重新回原文找依据句。`
        };
      }
    }

    // 3) 关键词覆盖度
    const hits = [];
    const misses = [];
    keywords.forEach(keyword => {
      if (keywordHit(typed, keyword)) hits.push(keyword);
      else misses.push(keyword);
    });

    /*
     * 覆盖率阈值判对（joi姐 截图反馈后修正）：
     * 关键词是「采分点」而非逐词复现，学生用同义表达时不必逐字命中。
     * 命中 ≥ 75% 即判对——例如标答 "She learned to cook fried dishes and dumplings."，
     * 关键词为 ['cook','fried','dishes','dumplings']，
     * 学生写 "fried dishes and dumplings"（省略动词 cook）命中 3/4 = 75% → 判对；
     * 而只写 "cooked" 只命中 1/4 = 25% → partial，不会误判。
     */
    const COVERAGE = 0.75;
    if (keywords.length && !misses.length) {
      return { level: 'correct', hits, misses, accepted, exact: true };
    }
    if (keywords.length && hits.length / keywords.length >= COVERAGE) {
      return { level: 'correct', hits, misses, accepted, coverage: hits.length / keywords.length };
    }

    /*
     * partial = 立场/大意对，但表达不完整。
     * 判断题只要极性对了就说明立场已经找对，因此极性命中时缺失关键词只降级为 partial，
     * 不应判错——例如第 7 题只写 "Yes."，问题在表达规范，不在理解方向。
     */
    if (hits.length || (question.polarity && detectPolarity(typed) === question.polarity)) {
      return {
        level: 'partial',
        hits,
        misses,
        accepted,
        message: question.polarity && !hits.length
          ? '判断方向正确，但主语和助动词没有跟上。'
          : ''
      };
    }

    return {
      level: 'wrong',
      hits,
      misses,
      accepted,
      reason: 'keyword',
      message: '没有命中任何关键信息，回到原文找依据句再作答。'
    };
  }

  /* ---------------- 篇章索引 ---------------- */

  /**
   * 建立句子总表与双向索引
   * @returns {{
   *   passage: object,
   *   sentences: object,          // id -> sentence
   *   blanks: Array,
   *   questions: Array,
   *   allItems: Array,            // 填空 + 问答，按题号排序
   *   refsBySentence: object,     // sentenceId -> [item]
   *   refsByBlank: object,        // blankNo -> item
   *   refsByQuestion: object      // questionNo -> item
   * }}
   */
  function buildIndex(rawPassage) {
    const passage = normalizePassage(rawPassage);
    const sentences = {};
    passage.paragraphs.forEach(paragraph => {
      (paragraph.sentences || []).forEach(sentence => {
        sentences[sentence.id] = sentence;
      });
    });

    const refsBySentence = {};
    const refsByBlank = {};
    const refsByQuestion = {};

    const register = item => {
      (item.evidence || []).forEach(sentenceId => {
        if (!refsBySentence[sentenceId]) refsBySentence[sentenceId] = [];
        refsBySentence[sentenceId].push(item);
      });
    };

    const blanks = passage.blanks.map(blank => {
      const item = Object.assign({ kind: 'blank' }, blank);
      register(item);
      refsByBlank[String(item.no)] = item;
      return item;
    });

    const questions = passage.questions.map(question => {
      const item = Object.assign({ kind: 'question' }, question);
      register(item);
      refsByQuestion[String(item.no)] = item;
      return item;
    });

    const allItems = blanks
      .concat(questions)
      .sort((a, b) => Number(a.no) - Number(b.no));

    return {
      passage,
      sentences,
      blanks,
      questions,
      allItems,
      refsBySentence,
      refsByBlank,
      refsByQuestion
    };
  }

  /* ---------------- 数据规范化 ---------------- */

  function normalizePassage(raw) {
    const paragraphs = (raw.paragraphs || []).map((paragraph, pIndex) => {
      const sentences = (paragraph.sentences || []).map((sentence, sIndex) => ({
        id: sentence.id || `p${pIndex + 1}s${sIndex + 1}`,
        text: String(sentence.text || '').trim()
      }));
      return { sentences };
    });

    const blanks = (raw.blanks || []).map((blank, index) => ({
      no: String(blank.no != null ? blank.no : index + 1),
      answer: blank.answer == null ? '' : String(blank.answer),
      meaning: blank.meaning || '',
      category: blank.category || '原词复现',
      point: blank.point || '',
      studyPoint: blank.studyPoint || '',
      evidence: blank.evidence || [],
      anchor: blank.anchor || '',
      distractors: blank.distractors || []
    }));

    const questions = (raw.questions || []).map((question, index) => ({
      no: String(question.no != null ? question.no : blanks.length + index + 1),
      type: question.type || 'wh',
      question: String(question.question || '').trim(),
      answer: question.answer == null ? '' : String(question.answer),
      polarity: question.polarity || '',
      keywords: question.keywords || [],
      point: question.point || '',
      studyPoint: question.studyPoint || '',
      evidence: question.evidence || [],
      anchor: question.anchor || ''
    }));

    return {
      id: raw.id || '',
      title: raw.title || '',
      theme: raw.theme || '',
      source: raw.source || '',
      guide: raw.guide || '',
      blankInstruction: raw.blankInstruction || '',
      questionInstruction: raw.questionInstruction || '',
      paragraphs,
      summary: parseSummary(raw.summary || ''),
      blanks,
      questions
    };
  }

  /*
   * 摘要文解析：把 "…he was {{1}} because…" 拆成片段数组
   * 片段类型：{ type:'text', text } | { type:'blank', no }
   * 这样渲染时才能把空位做成真正可输入的框，同时保持原文一字不改。
   */
  function parseSummary(summary) {
    const parts = [];
    const pattern = /\{\{(\d+)\}\}/g;
    let cursor = 0;
    let match = pattern.exec(summary);
    while (match) {
      if (match.index > cursor) {
        parts.push({ type: 'text', text: summary.slice(cursor, match.index) });
      }
      parts.push({ type: 'blank', no: String(match[1]) });
      cursor = match.index + match[0].length;
      match = pattern.exec(summary);
    }
    if (cursor < summary.length) {
      parts.push({ type: 'text', text: summary.slice(cursor) });
    }
    return parts;
  }

  return {
    normalize,
    splitAnswers,
    gradeBlank,
    gradeQuestion,
    detectPolarity,
    buildIndex
  };
})();