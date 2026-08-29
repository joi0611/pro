(function () {
  const officialSource = (year) => `${year}年新疆维吾尔自治区、新疆生产建设兵团初中学业水平考试英语真题`;

  addExamArticle("xinjiangOfficialGrammar2026", {
    title: officialSource(2026),
    serial: "2026真题",
    practiceTitle: "三顾茅庐",
    source: officialSource(2026),
    group: "中考练习篇目",
    startNo: 74,
    fixedPhrases: [
      { zh: "建立强大的国家", en: "build a strong country" },
      { zh: "实现某人的梦想", en: "achieve one's dream" },
      { zh: "失去信心", en: "lose heart" },
      { zh: "保持安静", en: "keep quiet" },
      { zh: "最后，最终", en: "in the end" }
    ],
    questions: [
      { no: 74, prompt: "(call)", answers: ["called"], options: ["call", "called", "calling", "to call"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：done", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing", "非谓语：done"], point: "过去分词作后置定语", clue: "could help to achieve", explain: "wise man 与 call 是被动关系，用过去分词 called 作后置定语，意为“一个名叫诸葛亮的智者”。", verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "done", actionRelation: "被动承受动作", structure: "过去分词作后置定语", subject: "a wise man", predicate: "called", blank: "call", clueText: "a wise man" }) },
      { no: 75, prompt: "(day)", answers: ["days"], options: ["day", "days", "day's", "days'"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "名词变形容词", "名词变动词", "名词所有格"], point: "a few + 复数名词", clue: "A few / later", explain: "a few 后接可数名词复数，day 变为 days。", },
      { no: 76, prompt: "(tire)", answers: ["tired"], options: ["tire", "tired", "tiring", "tires"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变形容词", focusOptions: ["动词变形容词", "动词变名词", "动词变副词", "动词变过去式"], point: "feel + 形容词", clue: "felt / and wanted", explain: "felt 是系动词，后接形容词；tire 变为 tired，表示“感到疲倦的”。", },
      { no: 77, prompt: "(visit)", answers: ["visit"], options: ["visit", "visits", "visited", "visiting"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], point: "情态动词后用原形", clue: "must", explain: "情态动词 must 后接动词原形 visit。", verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "情态动词", actionRelation: "主动发出动作", structure: "must + 动词原形", subject: "he", predicate: "must", blank: "visit", clueText: "must" }) },
      { no: 78, prompt: "", answers: ["On"], options: ["On", "In", "At", "For"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "时间介词", point: "On + 具体某天", clue: "a cold snowy day", explain: "表示“在一个寒冷下雪的日子”，具体某天用介词 On，句首首字母大写。", },
      { no: 79, prompt: "", answers: ["and"], options: ["and", "but", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "并列连词", point: "并列关系", clue: "keep quiet / wait", explain: "keep quiet 与 wait 是并列动作，用 and 连接。", },
      { no: 80, prompt: "(move)", answers: ["moved"], options: ["move", "moved", "moving", "to move"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语：被动语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], point: "一般过去时被动语态", clue: "was deeply / by", explain: "He 与 move 是被动关系，be 动词用过去式 was，后接过去分词 moved。", verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "语态", actionRelation: "被动承受动作", structure: "一般过去时的被动语态", subject: "He", predicate: "was", blank: "move", clueText: "was ... by" }) },
      { no: 81, prompt: "(he)", answers: ["him"], options: ["he", "him", "his", "himself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "代词变宾格", focusOptions: ["主格", "宾格", "形容词性物主代词", "名词性物主代词", "反身代词"], point: "动词后接宾格", clue: "agreed to help", explain: "help 是及物动词，后接人称代词宾格 him。", },
      { no: 82, prompt: "(make)", answers: ["to make"], options: ["make", "to make", "making", "made"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：to do", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], point: "ways to do sth.", clue: "ways / better", explain: "ways to do sth. 表示“做某事的方法”，用不定式 to make。", verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "They", predicate: "talked", blank: "make", clueText: "ways" }) },
      { no: 83, prompt: "(suggestion)", answers: ["suggestions"], options: ["suggestion", "suggestions", "suggest", "suggestion's"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "名词变形容词", "名词变动词", "名词所有格"], point: "many + 复数名词", clue: "many good", explain: "many 后接可数名词复数，suggestion 变为 suggestions。", },
      { no: 84, prompt: "(successful)", answers: ["successfully"], options: ["successful", "successfully", "success", "succeed"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "built / in the end", explain: "空格修饰动词 built，successful 变副词 successfully。", }
    ],
    paragraphs: [
      `Long long ago, a kind man, Liu Bei, wanted to save his people and build a strong country. Someone told him a wise man [[74]] (call) Zhuge Liang could help to achieve his dream. So Liu Bei decided to visit him.`,
      `Zhuge Liang lived in a cottage. The first time Liu Bei went there, Zhuge Liang was away. A few [[75]] (day) later, he visited again. But Zhuge Liang was still not at home. His men felt [[76]] (tire) and wanted to give up. However, Liu Bei didn't lose heart. He said he must [[77]] (visit) the wise man.`,
      `[[78]] a cold snowy day, he paid another visit. This time Zhuge Liang was sleeping at home. Liu Bei told his men to keep quiet [[79]] wait outside patiently. After a long wait, Zhuge Liang woke up. He was deeply [[80]] (move) by Liu Bei's respect. He agreed to help [[81]] (he). They talked about ways [[82]] (make) the country better.`,
      `From then on, Zhuge Liang gave Liu Bei many good [[83]] (suggestion). With his help, Liu Bei built his own country [[84]] (successful) in the end.`
    ]
  });

  renderExam();
})();
