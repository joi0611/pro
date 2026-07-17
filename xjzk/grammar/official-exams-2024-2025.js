(function () {
  const officialSource = (year) => `${year}年新疆维吾尔自治区、新疆生产建设兵团初中学业水平考试英语真题`;

  addExamArticle("xinjiangOfficialGrammar2025", {
    title: officialSource(2025),
    serial: "2025真题",
    practiceTitle: "商鞅立木取信",
    source: officialSource(2025),
    group: "中考练习篇目",
    startNo: 54,
    fixedPhrases: [
      { zh: "制订一套计划", en: "work out a set of plans" },
      { zh: "想出一个主意", en: "come up with an idea" },
      { zh: "如此……以至于……", en: "so ... that ..." },
      { zh: "令某人惊讶的是", en: "to one's surprise" },
      { zh: "信守诺言", en: "be a man of one's word" }
    ],
    questions: [
      { no: 54, prompt: "(success)", answers: ["successful"], options: ["success", "successful", "successfully", "succeed"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "名词变形容词", focusOptions: ["可数名词变复数", "名词变形容词", "名词变动词", "名词所有格"], point: "形容词修饰名词", clue: "changes", explain: "空格修饰名词changes，需要形容词；success变successful。" },
      { no: 55, prompt: "(plan)", answers: ["plans"], options: ["plan", "plans", "planned", "planning"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "名词变形容词", "名词变动词", "名词所有格"], point: "a set of + 复数名词", clue: "a set of", explain: "a set of后接复数名词，填plans。" },
      { no: 56, prompt: "(accept)", answers: ["accepted"], options: ["accept", "accepted", "accepting", "to accept"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语：被动语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "语态", actionRelation: "被动承受动作", structure: "一般过去时的被动语态", subject: "these plans", predicate: "were", blank: "accept", clueText: "were not easily" }), point: "一般过去时被动语态", clue: "were not easily", explain: "plans与accept是被动关系，were后用过去分词accepted。" },
      { no: 57, prompt: "", answers: ["up"], options: ["up", "out", "on", "back"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "动词短语固定搭配", point: "come up with", clue: "came / with an idea", explain: "come up with an idea表示“想出一个主意”，填up。" },
      { no: 58, prompt: "(receive)", answers: ["receive"], options: ["receive", "receives", "received", "receiving"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "情态动词", actionRelation: "主动发出动作", structure: "would + 动词原形", subject: "anyone", predicate: "would", blank: "receive", clueText: "would" }), point: "情态动词后用原形", clue: "would", explain: "情态动词would后接动词原形receive。" },
      { no: 59, prompt: "", answers: ["that"], options: ["that", "but", "because", "although"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "结果状语从句", point: "so ... that ...", clue: "so easy / nobody believed", explain: "so + 形容词 + that从句表示“如此……以至于……”，填that。" },
      { no: 60, prompt: "(final)", answers: ["finally"], options: ["final", "finally", "finals", "finalize"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰全句", clue: "a man wanted", explain: "空格修饰整句，final变副词finally。" },
      { no: 61, prompt: "", answers: ["To"], options: ["To", "For", "With", "At"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "固定搭配", point: "to one's surprise", clue: "his surprise", explain: "to one's surprise表示“令某人惊讶的是”；句首首字母大写，填To。" },
      { no: 62, prompt: "(he)", answers: ["his"], options: ["he", "him", "his", "himself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性物主代词", focusOptions: ["主格", "宾格", "形容词性物主代词", "名词性物主代词", "反身代词"], point: "one's word", clue: "word", explain: "word前需要形容词性物主代词，he变his。" },
      { no: 63, prompt: "(follow)", answers: ["followed"], options: ["follow", "followed", "follows", "following"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "people", blank: "follow", clueText: "spread / was" }), point: "一般过去时", clue: "spread / was", explain: "故事叙述过去事件，people主动遵从，填followed。" },
      { no: 64, prompt: "(become)", answers: ["became"], options: ["become", "became", "becomes", "becoming"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发生变化", structure: "一般过去时", subject: "Qin", blank: "become", clueText: "During the Warring States Period" }), point: "一般过去时", clue: "During the Warring States Period", explain: "全文叙述战国时期的历史事件，become用过去式became。" }
    ],
    paragraphs: [
      `During the Warring States Period, many states made changes to become stronger. One of the most [[54]] (success) changes was created by Shang Yang in Qin. Shang Yang worked out a set of [[55]] (plan). At first, these plans were not easily [[56]] (accept) because people didn't believe in him.`,
      `To solve this problem, Shang Yang came [[57]] with an idea. He ordered his men to put a thin wooden pole at the south gate. Then he said anyone who took the pole to the north gate would [[58]] (receive) 10 gold pieces. The task was so easy [[59]] nobody believed it was true. They all thought Shang Yang was joking. After seeing that, Shang Yang said he would offer 50 gold pieces to anyone who did it.`,
      `And [[60]] (final), a man wanted to have a try. He put the pole on his shoulder and walked to the north gate. [[61]] his surprise, Shang Yang paid him 50 gold pieces. The news spread across the capital. Soon, people were saying Shang Yang was a man of [[62]] (he) word. Then people [[63]] (follow) him without question. With his efforts, Qin [[64]] (become) the strongest of all the states.`
    ]
  });

  addExamArticle("xinjiangOfficialGrammar2024", {
    title: officialSource(2024),
    serial: "2024真题",
    practiceTitle: "奶奶的钩针编织事业",
    source: officialSource(2024),
    group: "中考练习篇目",
    startNo: 54,
    fixedPhrases: [
      { zh: "大约五十年", en: "for about 50 years" },
      { zh: "做某事花费某人时间", en: "It takes sb. time to do sth." },
      { zh: "各种各样的", en: "different kinds of" },
      { zh: "在某人的空闲时间", en: "in one's free time" },
      { zh: "尽某人最大努力", en: "do one's best to do sth." }
    ],
    questions: [
      { no: 54, prompt: "", answers: ["for"], options: ["for", "since", "during", "from"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "现在完成时的时间介词", point: "for + 时间段", clue: "has made / about 50 years", explain: "现在完成时后接时间段about 50 years，用for。" },
      { no: 55, prompt: "(finish)", answers: ["to finish"], options: ["finish", "to finish", "finishing", "finished"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：to do", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "It", predicate: "takes", blank: "finish", clueText: "takes me one week" }), point: "It takes sb. time to do", clue: "takes me one week", explain: "It takes sb. some time to do sth.，填to finish。" },
      { no: 56, prompt: "", answers: ["but"], options: ["and", "but", "so", "because"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "转折连词", point: "转折关系", clue: "takes one week / never feel tired", explain: "制作耗时一周与从不厌倦构成转折，用but。" },
      { no: 57, prompt: "(kind)", answers: ["kinds"], options: ["kind", "kinds", "kind's", "kindly"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "名词变形容词", "名词变副词"], point: "different kinds of", clue: "different / of", explain: "different kinds of表示“各种各样的”，kind用复数kinds。" },
      { no: 58, prompt: "(see)", answers: ["see"], options: ["see", "sees", "saw", "seeing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "情态动词", actionRelation: "主动发出动作", structure: "can + 动词原形", subject: "you", predicate: "can", blank: "see", clueText: "can" }), point: "情态动词后用原形", clue: "can", explain: "can后接动词原形see。" },
      { no: 59, prompt: "(kid)", answers: ["kids"], options: ["kid", "kids", "kid's", "kidding"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "名词变形容词", "名词变副词"], point: "名词复数表类别", clue: "as toys for", explain: "表示供孩子们玩的玩具，kid用复数kids表类别。" },
      { no: 60, prompt: "(be)", answers: ["is"], options: ["is", "are", "was", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "主谓一致", actionRelation: "状态", structure: "一般现在时", subject: "The old woman", blank: "be", clueText: "The old woman" }), point: "一般现在时 + 单数主语", clue: "The old woman", explain: "全文介绍当前情况，用一般现在时；主语为单数，填is。" },
      { no: 61, prompt: "(she)", answers: ["her"], options: ["she", "her", "hers", "herself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性物主代词", focusOptions: ["主格", "宾格", "形容词性物主代词", "名词性物主代词", "反身代词"], point: "in one's free time", clue: "free time", explain: "time前需要形容词性物主代词，she变her。" },
      { no: 62, prompt: "(much)", answers: ["more"], options: ["much", "more", "most", "many"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "比较级", clue: "than before", explain: "than before提示比较级，much的比较级为more。" },
      { no: 63, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "不定冠词", point: "泛指单数名词", clue: "factory of her own", explain: "factory是辅音音素开头的可数名词单数，泛指一家工厂，用a。" },
      { no: 64, prompt: "(do)", answers: ["doing"], options: ["do", "does", "did", "doing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语：现在进行时", focusOptions: ["谓语：常考时态标志词", "谓语：现在进行时", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在进行时", subject: "she", predicate: "is", blank: "do", clueText: "Now / is" }), point: "现在进行时", clue: "Now / is", explain: "Now和is提示现在进行时，填doing。" }
    ],
    paragraphs: [
      `A 68-year-old woman from Shandong Province now teaches crocheting online and offline. She has made crochet artworks [[54]] about 50 years.`,
      `'It often takes me one week [[55]] (finish) a crochet artwork [[56]] I never feel tired of it,' the old woman said.`,
      `There are different [[57]] (kind) of colorful products in the old woman's workshop. As you can [[58]] (see), some of them are traditional and some of them are fashionable. They can be used as decorations for homes or as toys for [[59]] (kid).`,
      `The old woman [[60]] (be) warm-hearted. In [[61]] (she) free time, she teaches women villagers to make crochet artworks. She helps them to make [[62]] (much) money than before.`,
      `The old woman has [[63]] factory of her own. Now she is [[64]] (do) her best to develop some new products.`
    ]
  });

  renderExam();
})();
