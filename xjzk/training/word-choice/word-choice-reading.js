(function () {
  "use strict";

  const TRANSLATION_CACHE_KEY = "word_choice_reading_translation_cache_v1";
  const WORD_CACHE_KEY = "word_choice_reading_word_cache_v1";
  const PHRASES = [
    ["come to mind", "浮现在脑海中"], ["in order to", "为了"], ["pass down", "传承"],
    ["be famous for", "因……而闻名"], ["thanks to", "多亏；由于"], ["in the past", "过去"],
    ["more and more", "越来越多"], ["be home to", "是……的所在地"], ["be rich in", "富含；盛产"],
    ["have a chance to", "有机会做……"], ["take place", "发生"], ["at the same time", "同时"],
    ["such as", "例如"], ["be different from", "与……不同"], ["be interested in", "对……感兴趣"],
    ["with the help of", "在……的帮助下"], ["not only ... but also ...", "不仅……而且……"],
    ["as a result", "因此"], ["because of", "因为"], ["instead of", "而不是；代替"],
    ["grow up", "长大"], ["find out", "查明"], ["learn from", "向……学习"]
  ].map(([en, zh]) => ({ en, zh }));

  let translationCache = readCache(TRANSLATION_CACHE_KEY);
  let wordCache = readCache(WORD_CACHE_KEY);
  let activeTrigger = null;

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

  function passageText(article) {
    const holder = document.createElement("div");
    holder.innerHTML = String(article.passageHtml || "");
    holder.querySelectorAll(".blank-wrap").forEach(wrap => {
      const id = String(wrap.querySelector("[data-blank]")?.dataset.blank || "");
      wrap.replaceWith(document.createTextNode(article.blanks?.[id]?.answer || ""));
    });
    holder.querySelectorAll("button").forEach(button => button.remove());
    holder.querySelectorAll(".clue").forEach(clue => clue.replaceWith(document.createTextNode(clue.textContent || "")));
    holder.querySelectorAll("strong").forEach(strong => {
      let next = strong.nextSibling;
      while (next && next.nodeType === Node.TEXT_NODE && !String(next.textContent || "").trim()) next = next.nextSibling;
      if (next && next.nodeName === "BR") strong.remove();
    });
    holder.querySelectorAll("br").forEach(br => br.replaceWith(document.createTextNode(" ")));
    return (holder.textContent || "").replace(/\s+/g, " ").trim();
  }

  function splitSentences(article) {
    const text = passageText(article);
    return (text.match(/[^.]+(?:\.|$)/g) || []).map(item => item.trim()).filter(Boolean);
  }

  function hashText(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function renderInteractiveSentence(sentence) {
    let html = "";
    let cursor = 0;
    const pattern = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;
    let match;
    while ((match = pattern.exec(sentence))) {
      html += escapeHtml(sentence.slice(cursor, match.index));
      html += '<button type="button" class="reading-word" data-word="' + escapeHtml(match[0]) + '" aria-label="查看 ' + escapeHtml(match[0]) + ' 的词义">' + escapeHtml(match[0]) + '</button>';
      cursor = match.index + match[0].length;
    }
    return html + escapeHtml(sentence.slice(cursor));
  }

  function render(article, record, title) {
    const sentences = splitSentences(article);
    const total = Number(record.total || Object.keys(article.blanks || {}).length);
    const preview = Boolean(record.preview);
    const right = preview ? "—" : Number(record.right || 0);
    return '<div class="word-choice-reading-view">' +
      '<section class="reading-success"><span class="reading-success-icon" aria-hidden="true">' + (preview ? '📖' : '✓') + '</span><div><h3>' + (preview ? '全文翻译已打开' : '本篇已完成，可以查看全文精读') + '</h3><p>' + (preview ? '已自动代回标准答案，可直接检查逐句翻译和重点词汇。' : '集中复习逐句翻译、重点词汇和固定短语。') + '</p></div><dl><div><dt>' + (preview ? total : total + '/' + total) + '</dt><dd>' + (preview ? '句题检查' : '已完成') + '</dd></div><div><dt>' + right + '</dt><dd>' + (preview ? '得分未统计' : '答对') + '</dd></div></dl></section>' +
      '<article class="reading-paper"><header class="reading-paper-head"><div><h3>' + escapeHtml(title || article.title || "选词填空") + '｜全文精读</h3><p>来源：' + escapeHtml(article.source || "名校优质真题") + '</p></div><span>' + (preview ? '可直接查看' : '已完成') + '</span></header>' +
      '<div class="reading-guide"><strong>阅读方式</strong><span>英文原句 → 中文翻译 → 单击词汇查看学习卡</span></div>' +
      '<div class="reading-sentence-list">' + sentences.map((sentence, index) => {
        const key = hashText(sentence);
        return '<section class="reading-sentence" data-sentence="' + escapeHtml(sentence) + '"><div class="reading-sentence-no">句子 ' + String(index + 1).padStart(2, "0") + '</div><div class="reading-sentence-body"><p class="reading-en">' + renderInteractiveSentence(sentence) + '</p><div class="reading-cn" data-translation-key="' + key + '"><strong>译文</strong><span>' + (translationCache[key] ? escapeHtml(translationCache[key]) : "正在加载译文…") + '</span></div></div></section>';
      }).join("") + '</div>' +
      '<footer class="reading-footer"><p>单击任意英文单词，可立即查看原形、音标、本句含义和发音。</p><div><button type="button" class="btn secondary" data-reading-back>返回做题结果</button><button type="button" class="btn" data-reading-library>返回本题库</button><a class="btn secondary reading-home-link" href="../../index.html">返回首页</a></div></footer></article></div>';
  }

  function bind(options) {
    document.querySelectorAll(".reading-word").forEach(button => button.addEventListener("click", () => {
      const sentence = button.closest(".reading-sentence")?.dataset.sentence || "";
      openWordCard(button.dataset.word || "", sentence, button);
    }));
    document.querySelector("[data-reading-back]")?.addEventListener("click", options.onBack);
    document.querySelector("[data-reading-library]")?.addEventListener("click", options.onLibrary);
    loadTranslations();
  }

  async function loadTranslations() {
    const nodes = Array.from(document.querySelectorAll("[data-translation-key]"));
    const pending = nodes.filter(node => !translationCache[node.dataset.translationKey]);
    let cursor = 0;
    async function worker() {
      while (cursor < pending.length) {
        const node = pending[cursor++];
        const sentence = node.closest(".reading-sentence")?.dataset.sentence || "";
        const target = node.querySelector("span");
        if (!sentence || !target) continue;
        try {
          const translated = await translateText(sentence);
          target.textContent = translated;
          translationCache[node.dataset.translationKey] = translated;
          writeCache(TRANSLATION_CACHE_KEY, translationCache);
        } catch (_) {
          target.innerHTML = '<button type="button" class="translation-retry">译文加载失败，点击重试</button>';
          target.querySelector("button")?.addEventListener("click", () => retryTranslation(node, sentence));
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
      target.innerHTML = '<button type="button" class="translation-retry">译文暂时不可用，点击重试</button>';
      target.querySelector("button")?.addEventListener("click", () => retryTranslation(node, sentence));
    }
  }

  async function fetchWithTimeout(url, timeoutMs) {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = setTimeout(() => controller?.abort(), timeoutMs || 7000);
    try { return await fetch(url, controller ? { signal: controller.signal } : undefined); }
    finally { clearTimeout(timer); }
  }

  async function translateText(text) {
    const response = await fetchWithTimeout("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=en|zh-CN", 8000);
    if (!response.ok) throw new Error("translation failed");
    const data = await response.json();
    const translated = data?.responseData?.translatedText;
    if (!translated) throw new Error("empty translation");
    return String(translated).replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
  }

  function normalizeWord(word) {
    return String(word || "").toLowerCase().replace(/[^a-z'-]/g, "");
  }

  function localWordData(word) {
    const clean = normalizeWord(word);
    const local = window.GRAMMAR_WORD_DATA || {};
    const keys = [clean, clean.replace(/ies$/, "y"), clean.replace(/ied$/, "y"), clean.replace(/(?:ed|ing)$/, ""), clean.replace(/(?:es|s)$/, "")];
    return keys.map(key => local[key]).find(Boolean) || null;
  }

  function matchingPhrase(sentence, word) {
    const lower = sentence.toLowerCase();
    return PHRASES.find(item => lower.includes(item.en.replace(/ \.\.\. /g, " ")) && item.en.toLowerCase().includes(word.toLowerCase())) || null;
  }

  function ensureDialog() {
    let dialog = document.getElementById("wordChoiceWordDialog");
    if (dialog) return dialog;
    dialog = document.createElement("div");
    dialog.id = "wordChoiceWordDialog";
    dialog.className = "word-dialog-layer";
    dialog.hidden = true;
    dialog.innerHTML = '<div class="word-dialog-scrim" data-word-close></div><section class="word-learning-card" role="dialog" aria-modal="true" aria-labelledby="wordCardTitle"><button type="button" class="word-card-close" data-word-close aria-label="关闭词汇学习卡">×</button><div id="wordChoiceWordCardContent"></div></section>';
    document.body.appendChild(dialog);
    dialog.querySelectorAll("[data-word-close]").forEach(button => button.addEventListener("click", closeWordCard));
    return dialog;
  }

  function openWordCard(word, sentence, trigger) {
    activeTrigger = trigger;
    const dialog = ensureDialog();
    const local = localWordData(word) || {};
    const cached = wordCache[normalizeWord(word)] || {};
    const phrase = matchingPhrase(sentence, word);
    const term = phrase?.en || local.lemma || cached.lemma || word;
    const phonetic = local.phonetic || cached.phonetic || "点击发音可直接收听读音";
    const meaning = phrase?.zh || local.meaning || cached.meaning || "释义正在后台补充，不影响继续查看。";
    dialog.dataset.activeWord = normalizeWord(word);
    dialog.querySelector("#wordChoiceWordCardContent").innerHTML = '<div class="word-card-kicker">' + (phrase ? "固定短语优先" : "词汇学习卡") + '</div><div class="word-card-title-row"><div><h3 id="wordCardTitle">' + escapeHtml(term) + '</h3><p id="wordPhonetic">' + escapeHtml(phonetic) + '</p></div><button type="button" class="word-speak-btn" data-speak="' + escapeHtml(term) + '">▶ 发音</button></div><dl class="word-card-details"><div><dt>本句含义</dt><dd id="wordContextMeaning">' + escapeHtml(meaning) + '</dd></div><div><dt>所在原句</dt><dd>' + escapeHtml(sentence) + '</dd></div></dl>';
    dialog.hidden = false;
    document.body.classList.add("word-card-open");
    dialog.querySelector("[data-speak]")?.addEventListener("click", event => speakEnglish(event.currentTarget.dataset.speak, event.currentTarget));
    dialog.querySelector(".word-card-close")?.focus();
    if (!phrase && !local.meaning && !cached.meaning) enrichWordCard(word);
  }

  async function enrichWordCard(word) {
    const key = normalizeWord(word);
    let data = wordCache[key];
    if (!data) {
      const meaning = await fetchWithTimeout("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(key) + "&langpair=en|zh-CN", 3500)
        .then(response => response.ok ? response.json() : null)
        .then(result => String(result?.responseData?.translatedText || "").trim())
        .catch(() => "");
      data = {
        lemma: key,
        phonetic: "",
        meaning
      };
      wordCache[key] = data;
      writeCache(WORD_CACHE_KEY, wordCache);
    }
    const dialog = document.getElementById("wordChoiceWordDialog");
    if (!dialog || dialog.hidden || dialog.dataset.activeWord !== key) return;
    const meaning = dialog.querySelector("#wordContextMeaning");
    if (meaning) meaning.textContent = data.meaning || "暂无本地释义，可结合上方整句译文理解。";
  }

  function speakEnglish(text, button) {
    if (!("speechSynthesis" in window)) { button.textContent = "当前设备不支持发音"; return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = text.includes(" ") ? 0.78 : 0.82;
    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = "正在播放…";
    utterance.onend = utterance.onerror = () => { button.disabled = false; button.innerHTML = original; };
    window.speechSynthesis.speak(utterance);
  }

  function closeWordCard() {
    const dialog = document.getElementById("wordChoiceWordDialog");
    if (!dialog || dialog.hidden) return;
    window.speechSynthesis?.cancel();
    dialog.hidden = true;
    document.body.classList.remove("word-card-open");
    activeTrigger?.focus();
    activeTrigger = null;
  }

  document.addEventListener("keydown", event => { if (event.key === "Escape") closeWordCard(); });
  window.WordChoiceReading = { render, bind, splitSentences, passageText };
})();
