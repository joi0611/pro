(function () {
  "use strict";

  const TRANSLATION_CACHE_KEY = "grammar_reading_translation_cache_v1";
  const WORD_CACHE_KEY = "grammar_reading_word_cache_v2";
  const DEFAULT_PHRASES = [
    ["long long ago", "很久以前"], ["a few", "一些；几个"], ["give up", "放弃"],
    ["lose heart", "失去信心；灰心"], ["be moved by", "被……感动"],
    ["agree to do sth.", "同意做某事"], ["from then on", "从那时起"],
    ["in the end", "最后；最终"], ["come from", "来自"], ["thousands of", "数千；成千上万"],
    ["be good at", "擅长"], ["stand for", "代表；象征"], ["all over the world", "全世界"],
    ["be born", "出生"], ["be made into", "被制成"], ["be made of", "由……制成"],
    ["be made from", "由……制成（看不出原材料）"], ["take place", "发生；举行"],
    ["trace back to", "追溯到"], ["so ... that ...", "如此……以至于……"],
    ["as a result", "因此；结果"], ["as a solution", "作为解决办法"],
    ["in the old days", "过去；从前"], ["hurry to", "匆忙前往"],
    ["before doing sth.", "做某事之前"], ["be full of", "充满"],
    ["make a difference", "产生影响；起作用"], ["pay for", "为……付款"],
    ["look forward to", "期待"], ["be excited about", "对……感到兴奋"],
    ["take part in", "参加"], ["not only ... but also ...", "不仅……而且……"],
    ["far away from", "远离"], ["turn ... into ...", "把……变成……"],
    ["be known as", "作为……而闻名"], ["be famous for", "因……而闻名"],
    ["with the help of", "在……的帮助下"], ["in order to", "为了"],
    ["have a chance to", "有机会做……"], ["decide to do sth.", "决定做某事"],
    ["want to do sth.", "想要做某事"], ["help sb. do sth.", "帮助某人做某事"],
    ["ways to do sth.", "做某事的方法"], ["be able to", "能够"],
    ["used to", "过去常常"], ["be used to", "习惯于"], ["such as", "例如"],
    ["according to", "根据"], ["because of", "因为"], ["instead of", "代替；而不是"],
    ["at the age of", "在……岁时"], ["at first", "起初"], ["at last", "最后"],
    ["each other", "互相"], ["one another", "彼此"], ["more and more", "越来越多"],
    ["over time", "随着时间推移"], ["in fact", "事实上"], ["at the same time", "同时"],
    ["take care of", "照顾"], ["care about", "关心"], ["learn from", "向……学习"],
    ["keep doing sth.", "坚持做某事"], ["spend time doing sth.", "花时间做某事"],
    ["try one's best", "尽某人最大努力"], ["be proud of", "为……感到自豪"],
    ["take pride in", "为……感到自豪"], ["grow up", "长大"], ["wake up", "醒来"],
    ["wait for", "等待"], ["talk about", "谈论"], ["find out", "查明；弄清"],
    ["work hard", "努力学习或工作"], ["go back", "返回"], ["come back", "回来"],
    ["get along with", "与……相处"], ["do well in", "在……方面做得好"],
    ["be interested in", "对……感兴趣"], ["be different from", "与……不同"],
    ["play an important role in", "在……中发挥重要作用"]
  ];

  let activeCardTrigger = null;
  let activeSpeech = null;
  let translationCache = readCache(TRANSLATION_CACHE_KEY);
  let wordCache = readCache(WORD_CACHE_KEY);

  function readCache(key) {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch (_) { return {}; }
  }

  function writeCache(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>'"]/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[ch]);
  }

  function stripMarkup(text, questions) {
    return String(text || "")
      .replace(/\[\[clue:\d+:([^\]]+)\]\]/g, "$1")
      .replace(/\[\[(\d+)\]\]\s*(\([^)]+\))?/g, (_, no) => {
        const question = (questions || []).find(item => item.no === Number(no));
        return question && question.answers && question.answers[0] ? question.answers[0] : "";
      })
      .replace(/\s+/g, " ")
      .trim();
  }

  function splitSentences(article) {
    const result = [];
    (article.paragraphs || []).forEach((paragraph, paragraphIndex) => {
      const clean = stripMarkup(paragraph, article.questions || []);
      const matches = clean.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g) || [];
      matches.map(item => item.trim()).filter(Boolean).forEach(text => {
        result.push({ text, paragraphIndex, sentenceIndex: result.length });
      });
    });
    return result;
  }

  function hashText(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function normalizePhrase(value) {
    return String(value || "").toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
  }

  function collectPhrases(article) {
    const map = new Map(DEFAULT_PHRASES.map(([en, zh]) => [normalizePhrase(en), { en, zh }]));
    Object.values(window.examArticleBank || {}).forEach(item => {
      (item.fixedPhrases || []).forEach(phrase => {
        if (!phrase || !phrase.en) return;
        map.set(normalizePhrase(phrase.en), { en: phrase.en, zh: phrase.zh || "" });
      });
    });
    (article.fixedPhrases || []).forEach(phrase => {
      if (phrase && phrase.en) map.set(normalizePhrase(phrase.en), { en: phrase.en, zh: phrase.zh || "" });
    });
    return Array.from(map.values()).sort((a, b) => b.en.length - a.en.length);
  }

  function phrasePattern(phrase) {
    const source = normalizePhrase(phrase)
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\\\.\\\.\\\./g, ".+?")
      .replace(/one's/g, "(?:one's|my|your|his|her|its|our|their)")
      .replace(/sb\\\./g, "(?:somebody|someone|him|her|them|me|us|you)")
      .replace(/sth\\\./g, "(?:something|it|this|that|them)")
      .replace(/\s+/g, "\\s+");
    return new RegExp("\\b" + source + "\\b", "i");
  }

  function findPhrase(sentence, start, end, phrases) {
    for (const phrase of phrases) {
      const pattern = phrasePattern(phrase.en);
      const match = pattern.exec(normalizePhrase(sentence));
      if (!match) continue;
      const matchStart = match.index;
      const matchEnd = match.index + match[0].length;
      if (start >= matchStart && end <= matchEnd) return { ...phrase, matchedText: sentence.slice(matchStart, matchEnd) };
    }
    return null;
  }

  function renderInteractiveSentence(sentence) {
    let html = "";
    let cursor = 0;
    const wordPattern = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;
    let match;
    while ((match = wordPattern.exec(sentence))) {
      html += escapeHtml(sentence.slice(cursor, match.index));
      const word = match[0];
      html += '<button type="button" class="reading-word" data-word="' + escapeHtml(word) + '" data-start="' + match.index + '" data-end="' + (match.index + word.length) + '" aria-label="查看 ' + escapeHtml(word) + ' 的词义">' + escapeHtml(word) + '</button>';
      cursor = match.index + word.length;
    }
    return html + escapeHtml(sentence.slice(cursor));
  }

  function render(article, selectedAnswers) {
    const sentences = splitSentences(article);
    const total = (article.questions || []).length;
    const right = Object.values(selectedAnswers || {}).filter(item => item && item.correct).length;
    const title = (article.serial ? article.serial + " · " : "") + (article.practiceTitle || article.title || "语法填空");
    return '<div class="grammar-reading-view">' +
      '<section class="reading-success"><span class="reading-success-icon" aria-hidden="true">✓</span><div><h3>本篇已完成，可以查看全文精读</h3><p>全部题目完成后，集中复习逐句翻译、重点词汇和固定短语。</p></div><dl><div><dt>' + total + '/' + total + '</dt><dd>已完成</dd></div><div><dt>' + right + '</dt><dd>答对</dd></div></dl></section>' +
      '<article class="reading-paper"><header class="reading-paper-head"><div><h3>' + escapeHtml(title) + '｜全文精读</h3><p>来源：' + escapeHtml(article.source || article.title || "") + '</p></div><span>全部完成后解锁</span></header>' +
      '<div class="reading-guide"><strong>阅读方式</strong><span>英文原句 → 中文翻译 → 单击词汇查看学习卡</span></div>' +
      '<div class="reading-sentence-list">' + sentences.map((item, index) => {
        const cacheKey = hashText(item.text);
        const cached = translationCache[cacheKey];
        return '<section class="reading-sentence" data-sentence-index="' + index + '" data-sentence="' + escapeHtml(item.text) + '"><div class="reading-sentence-no">句子 ' + String(index + 1).padStart(2, "0") + '</div><div class="reading-sentence-body"><p class="reading-en">' + renderInteractiveSentence(item.text) + '</p><div class="reading-cn" data-translation-key="' + cacheKey + '"><strong>译文</strong><span>' + (cached ? escapeHtml(cached) : '正在加载译文…') + '</span></div></div></section>';
      }).join("") + '</div>' +
      '<footer class="reading-footer"><p>单击任意英文单词，可查看单词、音标、词性、本句含义和相关短语。</p><div><button type="button" class="ghost-btn" data-reading-action="back">返回做题结果</button><button type="button" class="primary-btn" data-reading-action="library">返回题库</button></div></footer></article></div>';
  }

  function bind(article) {
    const phrases = collectPhrases(article);
    document.querySelectorAll(".reading-word").forEach(button => {
      button.addEventListener("click", event => {
        const section = event.currentTarget.closest(".reading-sentence");
        if (!section) return;
        const sentence = section.dataset.sentence || "";
        const start = Number(event.currentTarget.dataset.start || 0);
        const end = Number(event.currentTarget.dataset.end || start);
        const phrase = findPhrase(sentence, start, end, phrases);
        openWordCard({ word: event.currentTarget.dataset.word || "", sentence, phrase, phrases, trigger: event.currentTarget });
      });
    });
    document.querySelectorAll("[data-reading-action]").forEach(button => {
      button.addEventListener("click", () => {
        if (button.dataset.readingAction === "back" && window.closeGrammarReading) window.closeGrammarReading();
        if (button.dataset.readingAction === "library" && window.showExamPicker) window.showExamPicker();
      });
    });
    loadTranslations();
  }

  async function loadTranslations() {
    const nodes = Array.from(document.querySelectorAll("[data-translation-key]"));
    const pending = nodes.filter(node => !translationCache[node.dataset.translationKey]);
    let cursor = 0;
    async function worker() {
      while (cursor < pending.length) {
        const node = pending[cursor++];
        const section = node.closest(".reading-sentence");
        const sentence = section ? section.dataset.sentence || "" : "";
        const target = node.querySelector("span");
        if (!sentence || !target) continue;
        try {
          const translated = await translateText(sentence);
          target.textContent = translated;
          translationCache[node.dataset.translationKey] = translated;
          writeCache(TRANSLATION_CACHE_KEY, translationCache);
        } catch (_) {
          target.innerHTML = '<button type="button" class="translation-retry">译文加载失败，点击重试</button>';
          const retry = target.querySelector("button");
          if (retry) retry.addEventListener("click", () => retryTranslation(node, sentence));
        }
      }
    }
    await Promise.all([worker(), worker(), worker()]);
  }

  async function retryTranslation(node, sentence) {
    const target = node.querySelector("span");
    if (!target) return;
    target.textContent = "正在重新加载译文…";
    try {
      const translated = await translateText(sentence);
      target.textContent = translated;
      translationCache[node.dataset.translationKey] = translated;
      writeCache(TRANSLATION_CACHE_KEY, translationCache);
    } catch (_) {
      target.textContent = "译文暂时不可用，请检查网络后重试。";
    }
  }

  async function fetchWithTimeout(url, timeoutMs) {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = setTimeout(() => { if (controller) controller.abort(); }, timeoutMs || 7000);
    try {
      return await fetch(url, controller ? { signal: controller.signal } : undefined);
    } finally {
      clearTimeout(timer);
    }
  }

  async function translateText(text) {
    const response = await fetchWithTimeout("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=en|zh-CN", 8000);
    if (!response.ok) throw new Error("translation failed");
    const data = await response.json();
    const translated = data && data.responseData && data.responseData.translatedText;
    if (!translated) throw new Error("empty translation");
    return String(translated).replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
  }

  function ensureWordDialog() {
    let dialog = document.getElementById("grammarWordDialog");
    if (dialog) return dialog;
    dialog = document.createElement("div");
    dialog.id = "grammarWordDialog";
    dialog.className = "word-dialog-layer";
    dialog.hidden = true;
    dialog.innerHTML = '<div class="word-dialog-scrim" data-word-close></div><section class="word-learning-card" role="dialog" aria-modal="true" aria-labelledby="wordCardTitle"><button type="button" class="word-card-close" data-word-close aria-label="关闭词汇学习卡">×</button><div id="wordCardContent"></div></section>';
    document.body.appendChild(dialog);
    dialog.querySelectorAll("[data-word-close]").forEach(button => button.addEventListener("click", closeWordCard));
    return dialog;
  }

  function openWordCard(context) {
    activeCardTrigger = context.trigger || null;
    const dialog = ensureWordDialog();
    const lexical = getLocalWordData(context.word);
    const term = context.phrase ? context.phrase.matchedText || context.phrase.en : (lexical && lexical.lemma ? lexical.lemma : context.word);
    const related = context.phrases.filter(item => normalizePhrase(item.en).includes(normalizePhrase(context.word))).slice(0, 4);
    const content = dialog.querySelector("#wordCardContent");
    content.innerHTML = '<div class="word-card-kicker">' + (context.phrase ? "固定短语优先" : "词汇学习卡") + '</div><div class="word-card-title-row"><div><h3 id="wordCardTitle">' + escapeHtml(term) + '</h3><p id="wordPhonetic">音标加载中…</p></div><button type="button" class="word-speak-btn" data-speak="' + escapeHtml(term) + '" aria-label="朗读 ' + escapeHtml(term) + '"><span aria-hidden="true">▶</span> 发音</button></div><dl class="word-card-details"><div><dt>词性</dt><dd id="wordPartOfSpeech">正在查询…</dd></div><div><dt>本句含义</dt><dd id="wordContextMeaning">' + escapeHtml(context.phrase && context.phrase.zh ? context.phrase.zh : "正在查询…") + '</dd></div><div><dt>所在原句</dt><dd>' + escapeHtml(context.sentence) + '</dd></div></dl><div class="word-related"><strong>相关短语</strong><div>' + (related.length ? related.map(item => '<span><b>' + escapeHtml(item.en) + '</b>' + escapeHtml(item.zh || "") + '</span>').join("") : '<span>暂无已收录的相关短语</span>') + '</div></div>';
    dialog.hidden = false;
    document.body.classList.add("word-card-open");
    const speak = dialog.querySelector("[data-speak]");
    if (speak) speak.addEventListener("click", () => speakEnglish(speak.dataset.speak || term, speak));
    const close = dialog.querySelector(".word-card-close");
    if (close) close.focus();
    enrichWordCard(context.word, context.phrase);
  }

  async function enrichWordCard(word, phrase) {
    const cacheKey = normalizePhrase(word);
    let data = wordCache[cacheKey];
    if (!data) {
      data = await fetchWordData(word);
      wordCache[cacheKey] = data;
      writeCache(WORD_CACHE_KEY, wordCache);
    }
    const phonetic = document.getElementById("wordPhonetic");
    const pos = document.getElementById("wordPartOfSpeech");
    const meaning = document.getElementById("wordContextMeaning");
    const title = document.getElementById("wordCardTitle");
    const speak = document.querySelector("[data-speak]");
    const displayWord = phrase ? null : data.lemma;
    if (title && displayWord) title.textContent = displayWord;
    if (speak && displayWord) { speak.dataset.speak = displayWord; speak.setAttribute("aria-label", "朗读 " + displayWord); }
    if (phonetic) phonetic.textContent = data.phonetic || "暂无音标";
    if (pos) pos.textContent = phrase ? "固定短语；核心词 " + (data.partOfSpeech || "词性待补充") : (data.partOfSpeech || "词性待补充");
    if (meaning && !(phrase && phrase.zh)) meaning.textContent = data.meaning || "暂未查询到准确释义，请稍后重试。";
    const relatedBox = document.querySelector(".word-related > div");
    if (relatedBox && Array.isArray(data.details) && data.details.length) {
      const existing = Array.from(relatedBox.querySelectorAll("span")).map(node => node.textContent || "").join(" ");
      const extras = data.details.filter(item => item && !existing.includes(item)).slice(0, 3);
      if (extras.length) relatedBox.insertAdjacentHTML("beforeend", extras.map(item => "<span>" + escapeHtml(item) + "</span>").join(""));
    }
  }

  async function fetchWordData(word) {
    const result = { lemma: "", phonetic: "", partOfSpeech: "", meaning: "", details: [] };
    const clean = String(word || "").toLowerCase().replace(/[^a-z'-]/g, "");
    const local = window.GRAMMAR_WORD_DATA || {};
    const localKeys = [clean, clean.replace(/ies$/, "y"), clean.replace(/(?:es|s)$/, ""), clean.replace(/ied$/, "y"), clean.replace(/(?:ed|ing)$/, "")];
    const localData = localKeys.map(key => local[key]).find(Boolean);
    if (localData) {
      result.phonetic = localData.phonetic || "";
      result.lemma = localData.lemma || "";
      result.partOfSpeech = localData.partOfSpeech || "";
      result.meaning = localData.meaning || "";
      result.details = Array.isArray(localData.details) ? localData.details : [];
      if (result.phonetic || result.partOfSpeech || result.meaning) return result;
    }
    const requests = [
      fetchWithTimeout("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(clean), 6000).then(r => r.ok ? r.json() : null).catch(() => null),
      translateText(clean).catch(() => "")
    ];
    const [dictionary, chinese] = await Promise.all(requests);
    const entry = Array.isArray(dictionary) && dictionary[0] ? dictionary[0] : null;
    if (entry) {
      result.phonetic = entry.phonetic || ((entry.phonetics || []).find(item => item.text) || {}).text || "";
      result.partOfSpeech = Array.from(new Set((entry.meanings || []).map(item => item.partOfSpeech).filter(Boolean))).join(" / ");
    }
    result.meaning = chinese || "";
    return result;
  }

  function getLocalWordData(word) {
    const local = window.GRAMMAR_WORD_DATA || {};
    const clean = String(word || "").toLowerCase().replace(/[^a-z'-]/g, "");
    const keys = [clean, clean.replace(/ies$/, "y"), clean.replace(/ied$/, "y"), clean.replace(/(?:ed|ing)$/, ""), clean.replace(/(?:es|s)$/, "")];
    return keys.map(key => local[key]).find(Boolean) || null;
  }

  function speakEnglish(text, button) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      button.textContent = "当前设备不支持发音";
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    activeSpeech = utterance;
    utterance.lang = "en-US";
    utterance.rate = text.includes(" ") ? 0.78 : 0.82;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(item => /^en-US/i.test(item.lang)) || voices.find(item => /^en/i.test(item.lang));
    if (voice) utterance.voice = voice;
    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = "正在播放…";
    utterance.onend = utterance.onerror = () => { button.disabled = false; button.innerHTML = original; activeSpeech = null; };
    window.speechSynthesis.speak(utterance);
  }

  function closeWordCard() {
    const dialog = document.getElementById("grammarWordDialog");
    if (!dialog || dialog.hidden) return;
    if (activeSpeech && "speechSynthesis" in window) window.speechSynthesis.cancel();
    dialog.hidden = true;
    document.body.classList.remove("word-card-open");
    if (activeCardTrigger) activeCardTrigger.focus();
    activeCardTrigger = null;
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeWordCard();
  });

  window.GrammarReading = {
    render,
    bind,
    splitSentences,
    stripMarkup,
    collectPhrases,
    findPhrase,
    closeWordCard
  };
})();
