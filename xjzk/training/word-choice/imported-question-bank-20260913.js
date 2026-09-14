(function () {
  function makeQuestion(config) {
    const words = config.words.map(([text, forms]) => ({ text, forms }));
    const wordKey = Object.fromEntries(config.words.map(([text, , tag, conversions = []]) => [text, { tag, conversions }]));
    const blanks = {};
    const blankClues = {};
    const clueFormulas = {};
    const ruleName = {
      keep: "保持原形", origin: "保持原级", safe: "安全词类，无需变形", base: "动词原形",
      third: "第三人称单数", past: "一般过去时", ing: "现在分词/动名词", pp: "过去分词",
      plural: "复数", possAdj: "形容词性物主代词", sentence: "句首大写", cardinal: "基数词"
    };
    config.items.forEach(([id, needed, word, rule, answer]) => {
      blanks[id] = {
        needed,
        correctWord: word,
        rule,
        answer,
        path: `语境线索 → 需要${needed} → 选词 ${word} → ${ruleName[rule] || rule} → ${answer}`
      };
      blankClues[id] = config.clues[id];
      clueFormulas[id] = config.formulas[id];
    });
    let passageHtml = config.passage;
    config.items.forEach(([id]) => {
      passageHtml = passageHtml.replace(`{${id}}`, `<span class="blank-wrap"><button class="blank" data-blank="${id}">空缺 ${id}</button><button class="later-btn" data-later="${id}" title="暂缓">!</button></span>`);
    });
    return { title: config.title, source: config.source, words, wordKey, blanks, blankClues, clueFormulas, passageHtml };
  }

  const config = {
    title: "袁隆平：杂交水稻之父",
    source: "2026年乌鲁木齐市第一中学九年级上学期9月模考｜袁隆平：杂交水稻之父",
    words: [
      ["one", { num: "one", ordinal: "first" }, "num"],
      ["greatly", { adv: "greatly", adj: "great" }, "adv"],
      ["but", { conj: "but" }, "conj"],
      ["failures", { noun: "failures" }, "noun"],
      ["develop", { verb: "develop", third: "develops", past: "developed", pp: "developed", ing: "developing", noun: "development" }, "verb"],
      ["abroad", { adv: "abroad" }, "adv"],
      ["After", { prep: "After", sentence: "After" }, "prep"],
      ["through", { prep: "through" }, "prep"],
      ["graduated", { verb: "graduate", third: "graduates", past: "graduated", pp: "graduated", ing: "graduating" }, "verb"],
      ["his", { pron: "he", obj: "him", possAdj: "his", possNoun: "his", reflexive: "himself" }, "pron"],
      ["spirit", { noun: "spirit", nounPlural: "spirits" }, "noun"]
    ],
    items: [
      [1, "verb", "graduated", "past", "graduated"],
      [2, "prep", "through", "safe", "through"],
      [3, "conj", "but", "safe", "but"],
      [4, "pron", "his", "possAdj", "his"],
      [5, "noun", "failures", "keep", "failures"],
      [6, "prep", "After", "safe", "After"],
      [7, "verb", "develop", "ing", "developing"],
      [8, "num", "one", "cardinal", "one"],
      [9, "adv", "abroad", "origin", "abroad"],
      [10, "adv", "greatly", "origin", "greatly"],
      [11, "noun", "spirit", "keep", "spirit"]
    ],
    clues: {
      1: "in 1953 是过去时间标志，句子缺少谓语动词。",
      2: "walked ___ fields 表示从田野中穿行。",
      3: "日夜劳作与稻米产量很低构成转折。",
      4: "空后是名词 team，需要形容词性物主代词。",
      5: "experimental 后需要名词，并与 doubts 并列。",
      6: "___ years of hard work 位于句首，表示多年努力之后。",
      7: "succeeded in ___ 中 in 是介词，后接动名词。",
      8: "___ of the most famous heroes 是固定结构。",
      9: "at home and ___ 是固定搭配。",
      10: "空格修饰 improved，需要程度副词。",
      11: "Yuan Longping’s 后需要名词，概括坚韧与奉献。"
    },
    formulas: {
      1: "in 1953 → 一般过去时 → 选 graduated → graduated。",
      2: "walk through fields 表示“穿过田野”，介词保持原形。",
      3: "前后语义转折 → 选择连词 but，保持原形。",
      4: "名词 team 前 → 形容词性物主代词 → his。",
      5: "experimental + 名词；与 doubts 并列 → failures。",
      6: "After years of hard work 表示“多年努力之后”，句首保持大写。",
      7: "succeed in doing sth. → develop 变 developing。",
      8: "one of the + 最高级 + 名词复数 → one。",
      9: "at home and abroad → abroad 保持原级。",
      10: "副词修饰动词 improved → greatly。",
      11: "名词所有格 + 名词；perseverance and dedication 概括为 spirit。"
    },
    passage: `Yuan Longping, a great scientist known as the “Father of Hybrid Rice”, {1} from Southwest Agricultural College in 1953. After graduation, he worked in a rural area of Hunan Province. As a young man, he often walked {2} fields and witnessed the serious problem of hunger—farmers toiled day and night, {3} rice output was so low that many families went hungry. This deeply touched him, so he dreamed of developing a high-yield rice to solve this problem.<br><br>He started to research hybrid rice with no mature theories to follow. It was extremely hard: he and {4} team worked in the fields under the scorching sun and heavy rain, observing rice growth and recording data daily. They faced experimental {5}, doubts from others, and even loss of research materials due to disasters, but he never gave up. {6} years of hard work, in 1973, he finally succeeded in {7} hybrid rice. This new rice could produce over 20% more than traditional ones, a major agricultural breakthrough.<br><br>Because of this great achievement, he became {8} of the most famous heroes and was widely respected at home and {9}. He won honors like the World Food Prize but stayed humble. Even in his later years, he still checked rice growth in fields regularly. His work helped China feed its people and {10} improved global food security. Yuan Longping’s {11} of perseverance and dedication will always be remembered.`
  };

  window.WORD_CHOICE_IMPORTED_20260913 = {
    wordChoice20260913_01: makeQuestion(config)
  };
})();
