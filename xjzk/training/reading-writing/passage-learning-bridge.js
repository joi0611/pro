/*
 * 读写题 · 篇章填空 → 同义词训练区
 *
 * 目的：篇章里做完的空，其「原文表达 → 缩写表达」本质都是同义转换，
 * 正是同义词训练区该记的内容。本脚本把两类数据打通：
 *   来源1：window.MVP_DATA.learningItems（原系统 214 条）
 *   来源2：PASSAGES_DATA 每篇每空的「考点短语 → 答案词」（新增）
 *
 * 短语来源（关键设计）：
 * 不用自动猜。解析版【详解】里已经人工提炼好考点引文，例如
 *   第2空：Then, a little girl came towards him and said in a polite voice → politely
 * 直接从这句引文里抽取「答案词所在的那个语法块」作为短语，
 * 比自动从原文扫描准确得多（自动抽会收进 "He seemed so" 这类句子碎片）。
 *
 * 接入原则：
 * - 不改动原 learningItems 的 id 与内容，已有掌握进度不受影响
 * - 新条目用独立 id 段（rw-passage-*），可与旧进度共存
 * - 只收「短语 → 单词」压缩型转换；纯原词复现没有学习价值
 */
(function () {
  const learning = window.MVP_DATA && window.MVP_DATA.learningItems;
  const passages = window.PASSAGES_DATA;
  if (!Array.isArray(learning) || !Array.isArray(passages)) return;

  const STOPWORD = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'and', 'or',
    'is', 'are', 'was', 'were', 'be', 'been', 'for', 'with', 'as', 'by', 'that', 'this',
    'these', 'those', 'it', 'he', 'she', 'they', 'we', 'i', 'you', 'his', 'her', 'their',
    'my', 'your', 'our', 'its', 'from', 'not', 'no', 'do', 'does', 'did', 'have', 'has',
    'had', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must', 's']);

  // 以这些词开头说明抓到的是句子碎片，不是考点短语
  const VERBISH = new Set(['was', 'were', 'is', 'are', 'be', 'been', 'being', 'am',
    'had', 'has', 'have', 'did', 'does', 'do', 'seemed', 'seems', 'seem', 'said', 'says',
    'say', 'told', 'tells', 'asked', 'asks', 'ask', 'walked', 'walks', 'came', 'comes',
    'come', 'gave', 'gives', 'give', 'took', 'takes', 'take', 'made', 'makes', 'make',
    'went', 'goes', 'go', 'saw', 'sees', 'see', 'felt', 'feels', 'feel', 'got', 'gets',
    'get', 'wanted', 'wants', 'want', 'likes', 'like', 'liked', 'helped', 'helps', 'help',
    'began', 'begins', 'begin', 'started', 'starts', 'start', 'then', 'there', 'because',
    'but', 'so', 'when', 'while', 'if', 'although', 'though', 'since', 'as']);

  /*
   * 从【详解】的 point 文本里取考点引文。
   * 形如：文章第2段“Then, a little girl came towards him and said in a polite voice”表明…
   */
  function quoteOf(point) {
    const m = String(point || '').match(/[“"]([^”"]+)[”"]/);
    return m ? m[1] : '';
  }

  /*
   * 从引文里抽「答案词所在的语法块」作为短语。
   * 以答案词为中心，向左跨过停用词收实词，向右收 1 词，命中句法边界即止。
   */
  function extractPhrase(quote, target) {
    const text = String(quote || '').replace(/\s+/g, ' ').trim();
    const firstWord = String(target).split(/\s+/)[0]
      .toLowerCase().replace(/[^a-z']/g, '');
    if (!text || !firstWord || firstWord.length < 2) return '';

    const words = text.split(/\s+/);
    let pos = -1;
    for (let i = 0; i < words.length; i += 1) {
      const w = words[i].toLowerCase().replace(/[^a-z']/g, '');
      if (w === firstWord || w === firstWord.replace(/'/g, '')) { pos = i; break; }
    }
    if (pos < 0) return '';

    const clean = w => w.replace(/^[^\w“‘"']+/, '').replace(/[^\w”"'’)\]]+$/, '');
    const isWord = w => /[A-Za-z]/.test(w);
    const norm = w => w.toLowerCase().replace(/[^a-z']/g, '');

    const left = [];
    for (let i = pos - 1; i >= 0 && left.length < 4; i -= 1) {
      const raw = words[i];
      if (!isWord(raw)) {
        if (/[,.;:!?]/.test(raw) && left.length) break;
        continue;
      }
      const w = norm(raw);
      if (left.length && VERBISH.has(w)) break;   // 跨过分句边界就不是同一个意群
      if (STOPWORD.has(w) && left.length >= 2) break;
      left.unshift(clean(raw));
    }

    const right = [];
    for (let i = pos + 1; i < words.length && right.length < 2; i += 1) {
      const raw = words[i];
      if (!isWord(raw)) {
        if (/[,.;:!?“”"]/.test(raw) && right.length) break;
        continue;
      }
      const w = norm(raw);
      if (STOPWORD.has(w) && right.length) break;
      if (VERBISH.has(w) && right.length) break;
      right.push(clean(raw));
    }

    const leftPhrase = left.filter(Boolean).join(' ').trim();
    const rightPhrase = right.filter(Boolean).join(' ').trim();

    const cands = [];
    if (leftPhrase && leftPhrase.split(' ').length >= 2) cands.push(leftPhrase);
    if (leftPhrase && rightPhrase) {
      const combo = (leftPhrase + ' ' + rightPhrase).trim();
      if (combo.split(' ').length >= 2) cands.push(combo);
    }
    if (!cands.length && rightPhrase && rightPhrase.split(' ').length >= 2) cands.push(rightPhrase);
    return cands[0] || '';
  }

  function isGoodPhrase(phrase, target) {
    if (!phrase) return false;
    const words = phrase.split(/\s+/).filter(Boolean);
    if (words.length < 2 || words.length > 4) return false;

    const norm = w => w.toLowerCase().replace(/[^a-z']/g, '');
    const head = norm(words[0]);
    const tail = norm(words[words.length - 1]);

    // 首词不能是系动词/实义动词/连词，也不能是冠词介词
    if (VERBISH.has(head) || STOPWORD.has(head)) return false;
    // 尾词不能是系动词/连词——"girl was"、"parents allow" 都是残句
    if (VERBISH.has(tail) || STOPWORD.has(tail)) return false;
    // 短语内部不允许出现系动词，那说明跨越了分句边界
    if (words.slice(1).some(w => ['was', 'were', 'is', 'are', 'be', 'been', 'am'].includes(norm(w)))) return false;

    const np = phrase.toLowerCase();
    const nt = target.toLowerCase();
    if (np === nt) return false;
    if (nt.length > 3 && np.includes(nt)) return false;

    // 至少一个实词，避免整句虚词
    return words.some(w => {
      const t = norm(w);
      return t.length > 3 && !STOPWORD.has(t);
    });
  }

  /*
   * 从详解的中文说明里取释义。
   * 形如：…表明因为没人买他的鞋，老人看起来十分无助。
   * 取「表明/意为/指的是/意思是/即」之后的第一个分句。
   * 详解结尾常带「故填 xxx」「因此答案是原文直接信息」这类尾巴，要剔除，
   * 否则释义会变成「，此处修饰way」这种无意义片段。
   */
  function meaningOf(point) {
    let raw = String(point || '')
      .replace(/^[^”"]*[”"]/, '')
      .replace(/[”"].*$/, '')
      .trim();
    // 剔除「故填…」「因此答案是…」「可知，」等尾巴与前缀
    raw = raw
      .replace(/^(可知|因此|所以)[，,]?/, '')
      .replace(/[，,]?\s*(故填|故用|应填|因此答案是|所以填|答案)[^。；]*$/, '')
      .replace(/[，,]\s*此处[^。；]*$/, '')
      .replace(/[，,]\s*修饰[^。；]*$/, '')
      .trim();
    if (!raw) return '';
    const m = raw.match(/(?:表明|意为|指的是|意思是|即)([^。；]{2,26})/);
    if (m) return m[1].trim();
    const first = raw.split(/[。；]/)[0].trim();
    if (first.length >= 2 && first.length <= 26 && !/[a-zA-Z]{3,}/.test(first)) return first;
    return '';
  }

  const existing = new Set(
    learning.map(i => String(i.target || '').trim().toLowerCase()).filter(Boolean)
  );
  const created = [];
  const seen = new Set();

  passages.forEach(passage => {
    (passage.blanks || []).forEach(blank => {
      if (!blank || !blank.answer) return;
      const quote = quoteOf(blank.point);
      if (!quote) return;

      const target = blank.answer.split('/')[0].trim();
      if (!target || target.length > 24) return;

      const phrase = extractPhrase(quote, target);
      if (!isGoodPhrase(phrase, target)) return;

      // 释义是必填项：解析版对某些题只写「因此答案是原文直接信息」这类占位说明，
      // 这种条目进学习区只会误导学生，直接丢弃。
      const meaning = meaningOf(blank.point);
      if (!meaning || /原文直接信息|^，|^故|^应填/.test(meaning)) return;

      const key = (phrase + '→' + target).toLowerCase();
      if (seen.has(key)) return;
      if (existing.has(target.toLowerCase())) return;
      seen.add(key);

      created.push({
        id: 'rw-passage-' + passage.id + '-' + blank.no,
        category: '篇章填空 · 同义转换',
        source: passage.source,
        number: String(blank.no),
        original: phrase,
        target: target,
        meaning: meaning,
        point: String(blank.point || '').slice(0, 200),
        studyPoint: '先回原文定位这个短语，看它被压缩成了哪个词。',
        originalSentence: quote,
        targetSentence: '',
        answer: target
      });
    });
  });

  if (!created.length) return;
  window.MVP_DATA.learningItems = learning.concat(created);
})();