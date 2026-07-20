function makeVerbFlow({ hasChangedVerb, route, nonPredicateFocus, predicateKind, actionRelation, structure, subject, predicate, blank, clueText }) {
  if (route === "非谓语") {
    return {
      hasChangedVerb,
      route,
      nonPredicateFocus,
      skeleton: { subject, predicate, blank },
      highlights: {
        changedVerb: [{ text: predicate, type: "predicate" }],
        route: [{ text: predicate, type: "predicate" }, { text: "____", type: "blank" }],
        focus: [{ text: clueText || predicate, type: "nonPredicate" }, { text: "____", type: "blank" }],
        answer: [{ text: clueText || predicate, type: "nonPredicate" }]
      }
    };
  }
  return {
    hasChangedVerb,
    route,
    predicateKind,
    actionRelation,
    structure,
    skeleton: { subject, predicate: predicate || "?", blank },
    highlights: {
      changedVerb: [{ text: subject, type: "subject" }, ...(predicate ? [{ text: predicate, type: "predicate" }] : [])],
      route: [{ text: subject, type: "subject" }, { text: "____", type: "blank" }],
      predicateKind: clueText ? [{ text: clueText, type: "predicate" }] : [{ text: subject, type: "subject" }],
      actionRelation: [{ text: subject, type: "subject" }, { text: blank, type: "blank" }],
      structure: clueText ? [{ text: clueText, type: "predicate" }] : [{ text: subject, type: "subject" }],
      answer: [{ text: subject, type: "predicate" }]
    }
  };
}

function addExamArticle(key, article) {
  window.examArticleBank = window.examArticleBank || {};
  window.examArticleBank[key] = article;
}

addExamArticle("xinjiangTunnel", {
  title: "新疆2026热点话题预测",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(close)", answers: ["to close"], options: ["close", "closed", "closing", "to close"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "snow and ice", predicate: "caused", blank: "close", clueText: "caused" }), point: "cause sb/sth to do sth", clue: "caused", explain: "cause sb/sth to do sth. 表示“导致某人/某物做某事”，填 to close。" },
    { no: 75, prompt: "(long)", answers: ["longer"], options: ["long", "longest", "more long", "longer"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "比较级", clue: "much", explain: "题前出现 much 修饰比较级，long 的比较级为 longer。" },
    { no: 76, prompt: "", answers: ["which"], options: ["what", "that", "it", "which"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词"], noPromptFocus: "定语从句的连接词", point: "非限制性定语从句", clue: "Xinjiang, divides", explain: "逗号后是非限制性定语从句，指代前文事物，用 which。" },
    { no: 77, prompt: "(safe)", answers: ["safety"], options: ["safe", "safely", "safer", "safety"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词变名词", clue: "about", explain: "介词 about 后需要名词，safe 变 safety。" },
    { no: 78, prompt: "(complete)", answers: ["completed"], options: ["complete", "completes", "are completing", "completed"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "Chinese engineers", blank: "complete", clueText: "in just five years" }), point: "一般过去时", clue: "in just five years", explain: "本句 in just five years 表示项目完成所用时间，结合上下文过去语境，complete 用过去式 completed。" },
    { no: 79, prompt: "(fast)", answers: ["faster"], options: ["fast", "fastest", "more fast", "faster"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "比较级", clue: "much and safer than", explain: "much 和 than 都提示比较级，且与 safer 并列，填 faster。" },
    { no: 80, prompt: "(cross)", answers: ["to cross"], options: ["cross", "crossed", "crossing", "to cross"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "It", predicate: "takes", blank: "cross", clueText: "takes 20 minutes" }), point: "It takes time to do", clue: "takes 20 minutes", explain: "It takes/took sb. some time to do sth.，填 to cross。" },
    { no: 81, prompt: "", answers: ["it"], options: ["that", "this", "them", "it"], hasPrompt: false, mapNode: "blank", noPromptType: "代词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "it作形式宾语", point: "形式宾语", clue: "made possible to travel", explain: "make it + adj. + for sb. to do sth. 中 it 作形式宾语。" },
    { no: 82, prompt: "(bring)", answers: ["to bring"], options: ["bring", "bringing", "brings", "to bring"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "the tunnel", predicate: "is expected", blank: "bring", clueText: "is expected" }), point: "be expected to do", clue: "is expected", explain: "be expected to do sth. 表示“被期待做某事”，填 to bring。" },
    { no: 83, prompt: "(quick)", answers: ["quickly"], options: ["quick", "quicker", "quickest", "quickly"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "develop", explain: "空处修饰动词 develop，形容词 quick 变副词 quickly。" }
  ],
  paragraphs: [
    `On December 26, 2025, China opened the world's longest expressway tunnel to the public — the Tianshan Shengli Tunnel. With a length of 22.13 kilometers, it has greatly changed travel between north and south Xinjiang. Before the tunnel was built, drivers had to travel on dangerous mountain roads. In winter, snow and ice often caused the roads [[74]]. As a result, trips became much [[75]]. The Tianshan Mountains run through central Xinjiang, [[76]] divides the area into two parts. Crossing these mountains was once very difficult. Drivers had to use high and narrow roads, and many people worried about [[77]]. Building the tunnel was not easy. Workers worked at 3,000 meters above sea level, where temperatures could drop to -42°C in winter. The area also had frequent earthquakes. Despite these difficulties, Chinese engineers [[78]] the project in just five years. Now, the tunnel makes travel much [[79]] and safer than before. It only takes 20 minutes [[80]] the mountains. Many people believe the tunnel will help improve trade and tourism in Xinjiang. This project also shows the hard work and wisdom of Chinese engineers. Their efforts have made [[81]] possible for people to travel more easily across the Tianshan Mountains. In the future, the tunnel is expected [[82]] more opportunities to local people and help Xinjiang develop [[83]].`
  ]
});

addExamArticle("deepseekMock", {
  title: "2026年新疆中考素养第一次模拟考试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(surprise)", answers: ["surprised"], options: ["surprise", "surprised", "is surprising", "was surprised"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "company", blank: "surprise", clueText: "Last year" }), point: "一般过去时", clue: "Last year", explain: "Last year 提示一般过去时，主语 company 主动使世界惊讶，填 surprised。" },
    { no: 75, prompt: "", answers: ["which", "that"], options: ["who", "what", "that", "which"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "定语从句关系代词", point: "定语从句", clue: "model is called", explain: "先行词 model 指物，定语从句缺主语，可用 which/that。" },
    { no: 76, prompt: "", answers: ["with"], options: ["with", "in", "for", "by"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "介词含义", point: "介词", clue: "built money", explain: "表示用/花费很少的钱，用 with very little money。" },
    { no: 77, prompt: "(good)", answers: ["better"], options: ["good", "best", "better", "more good"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "the + 比较级", clue: "The more", explain: "the + 比较级，the + 比较级，good 的比较级是 better。" },
    { no: 78, prompt: "(easy)", answers: ["easily"], options: ["easy", "easier", "easily", "easiest"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "learn / far more / than before", explain: "空处修饰本句中的动词 learn，用副词 easily；far more ... than before 构成比较结构。" },
    { no: 79, prompt: "", answers: ["for", "to"], options: ["of", "to", "on", "for"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "介词固定搭配", point: "be free for/to", clue: "free schools", explain: "be free for/to sb. 表示“对某人免费/可用”。" },
    { no: 80, prompt: "", answers: ["but"], options: ["So", "And", "But", "Because"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "转折连词", point: "转折关系", clue: "advantages / challenges", explain: "前文说优势，后文说挑战，构成转折，用 But。" },
    { no: 81, prompt: "", answers: ["up"], options: ["in", "out", "off", "up"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "动词短语固定搭配", point: "mix up", clue: "mixes", explain: "mix up 表示“混淆”，填 up。" },
    { no: 82, prompt: "(improve)", answers: ["to improve"], options: ["improve", "improves", "improving", "to improve"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "team", predicate: "is working", blank: "improve", clueText: "working hard" }), point: "to do 表目的", clue: "working hard", explain: "work hard to do sth. 表目的，填 to improve。" },
    { no: 83, prompt: "(connect)", answers: ["connect"], options: ["connects", "connecting", "to connect", "connect"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "情态动词 + 动词原形", subject: "AI", blank: "connect", clueText: "can" }), point: "情态动词后原形", clue: "can", explain: "情态动词 can 后接动词原形 connect。" },
    { no: 84, prompt: "", answers: ["to"], options: ["of", "on", "from", "to"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], noPromptFocus: "介词固定搭配", point: "make a difference to", clue: "make a big difference", explain: "make a difference to sth. 表示“对……产生影响”。" }
  ],
  paragraphs: [
    `Last year, a Chinese technology company named DeepSeek [[74]] the world. It created a new AI model [[75]] is called DeepSeek-R1. It can solve math problems, write code, and even chat like humans. Unlike other AIs that need huge costs, DeepSeek-R1 is built [[76]] very little money. DeepSeek-R1 learns by practicing many times. The more it tries, the [[77]] it becomes. A teacher in Jiangsu said, "It helps students learn far more [[78]] than before." DeepSeek-R1 is free [[79]] schools and small businesses. "Now villages which have no Internet can still use it offline," said an engineer. [[80]] there are also some challenges. For example, R1 sometimes mixes [[81]] foreign languages like French and Spanish. The team is working hard [[82]] it. "We hope AI can [[83]] people around the world like bridges," they said. DeepSeek-R1 shows us that creativity and working together can make a big difference [[84]] the future.`
  ]
});

addExamArticle("boyGift", {
  title: "2026乌鲁木齐新市区九年级适应性测试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "", answers: ["a"], options: ["the", "an", "a", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "special birthday gift", explain: "gift 是可数名词单数，special 以辅音音素开头，泛指一份礼物，用 a。" },
    { no: 75, prompt: "(be)", answers: ["were"], options: ["is", "are", "was", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "shoes", blank: "be", clueText: "noticed" }), point: "一般过去时 + 复数主语", clue: "noticed / shoes", explain: "本句主句 noticed 是过去时态环境，从句主语 shoes 为复数，be 用 were。" },
    { no: 76, prompt: "", answers: ["so"], options: ["but", "because", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "因果连词", clue: "wanted / started", explain: "想买鞋是原因，开始存钱是结果，用 so。" },
    { no: 77, prompt: "(toy)", answers: ["toys"], options: ["toy", "toyes", "toying", "toys"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "snacks or", explain: "or 前 snacks 是复数，toy 也用复数 toys。" },
    { no: 78, prompt: "(final)", answers: ["finally"], options: ["final", "finaly", "finalist", "finally"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "saved", explain: "空处修饰动词 saved，final 变副词 finally。" },
    { no: 79, prompt: "(walk)", answers: ["walked"], options: ["walk", "walks", "walking", "walked"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "He", blank: "walk", clueText: "saved" }), point: "一般过去时", clue: "saved", explain: "前句 saved 是过去式，说明上下文在叙述过去事件；主语 He 主动走进商店，用 walked。" },
    { no: 80, prompt: "(boy)", answers: ["boy's"], options: ["boy", "boys", "boys'", "boy's"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变所有格", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词所有格", clue: "story", explain: "表示“这个男孩的故事”，单数名词所有格为 boy's。" },
    { no: 81, prompt: "(he)", answers: ["him"], options: ["he", "his", "himself", "him"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "人称代词：动词/介词 + 宾格", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "宾格", clue: "give", explain: "动词 give 后接宾格，he 变 him。" },
    { no: 82, prompt: "", answers: ["for"], options: ["with", "at", "in", "for"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "价格介词", clue: "sold / yuan", explain: "sell sth for + 金钱，表示以某价格出售。" },
    { no: 83, prompt: "(surprise)", answers: ["surprised"], options: ["surprise", "surprises", "surprising", "surprised"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变形容词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "动词变形容词"], point: "-ed形容词", clue: "she was very", explain: "主语是人，表示感到惊讶，用 surprised。" },
    { no: 84, prompt: "(care)", answers: ["to care"], options: ["care", "cares", "caring", "to care"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "He", predicate: "learned", blank: "care", clueText: "learned" }), point: "learn to do", clue: "learned", explain: "learn to do sth. 表示学会做某事，填 to care。" }
  ],
  paragraphs: [
    `An 8-year-old boy from Hebei Province warmed many people's hearts. He saved his pocket money for half a year to buy [[74]] special birthday gift for his mother. The boy noticed that his mother's shoes [[75]] worn-out. He wanted to buy a pair of new shoes for her, [[76]] he started saving money little by little. He didn't buy any snacks or [[77]]. After six months, he [[78]] saved about 200 yuan, all in coins. He happily [[79]] into a shoe shop with a bottle of coins in his hand. After learning about the [[80]] story, the shop owner was deeply moved by his love for his mother. She decided to give [[81]] a special discount and sold him a beautiful pair of white shoes [[82]] only about 50 yuan. When the boy gave the shoes to his mother, she was very [[83]]. She said, "We never taught him to do this. He learned [[84]] for others just by following our family's behavior, we are proud of him."`
  ]
});

addExamArticle("ancientBookFixer", {
  title: "2026年乌鲁木齐八一中学九年级模拟考试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(repair)", answers: ["has repaired"], options: ["repairs", "repaired", "is repairing", "has repaired"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在完成时", subject: "She", blank: "repair", clueText: "for over 6 years" }), point: "现在完成时", clue: "for over 6 years", explain: "for + 一段时间常与现在完成时连用，主语 She 用 has repaired。" },
    { no: 75, prompt: "(fix)", answers: ["to fix"], options: ["fix", "fixed", "fixing", "to fix"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "It", predicate: "takes", blank: "fix", clueText: "takes me one month" }), point: "It takes sb. time to do", clue: "takes", explain: "It takes sb. some time to do sth.，填 to fix。" },
    { no: 76, prompt: "", answers: ["but"], options: ["so", "and", "or", "but"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "转折连词", clue: "takes / proud", explain: "前文说耗时，后文说自豪，语义转折，用 but。" },
    { no: 77, prompt: "(kind)", answers: ["kinds"], options: ["kind", "kindes", "kinds", "kinding"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "different", explain: "different 后接可数名词复数，kind 变 kinds。" },
    { no: 78, prompt: "(notice)", answers: ["notice"], options: ["noticing", "to notice", "noticed", "notice"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "情态动词 + 动词原形", subject: "you", blank: "notice", clueText: "can" }), point: "情态动词后原形", clue: "can", explain: "情态动词 can 后接动词原形 notice。" },
    { no: 79, prompt: "(expert)", answers: ["experts"], options: ["expert", "expertes", "expertise", "experts"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "and collectors", explain: "and 后 collectors 是复数，expert 也用复数 experts。" },
    { no: 80, prompt: "(be)", answers: ["is"], options: ["am", "are", "was", "is"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "The woman", blank: "be", clueText: "works / teaches" }), point: "一般现在时", clue: "works / teaches / The woman", explain: "前后句 works、teaches 都是一般现在时，说明这里描述人物现状；主语 The woman 是单数，填 is。" },
    { no: 81, prompt: "(she)", answers: ["her"], options: ["she", "hers", "herself", "her"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词", clue: "free time", explain: "空后是名词 free time，用形容词性物主代词 her。" },
    { no: 82, prompt: "(experience)", answers: ["experience"], options: ["experiences", "experienced", "experiencing", "experience"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词保持原形", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词保持原形", "不可数名词转换为形容词"], point: "不可数名词原形", clue: "more", explain: "experience 表示“经验”时不可数，more experience 不加 s，保持原形。" },
    { no: 83, prompt: "", answers: ["a"], options: ["the", "an", "/", "a"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "small workshop", explain: "workshop 是可数名词单数，small 为辅音音素开头，泛指用 a。" },
    { no: 84, prompt: "(work)", answers: ["working"], options: ["work", "worked", "to work", "working"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "现在进行时", focusOptions: ["谓语：常考时态标志词", "谓语：现在进行时", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在进行时", subject: "she", predicate: "is", blank: "work", clueText: "Now" }), point: "be doing", clue: "Now / is", explain: "Now 和 is 提示现在进行时，结构为 is working。" }
  ],
  paragraphs: [
    `A 28-year-old woman from Jiangsu works as a skilled ancient book fixer. She [[74]] old books for over 6 years. "It often takes me one month [[75]] a damaged ancient book, [[76]] I feel proud to save these cultural treasures," the woman said. There are different [[77]] of ancient books in her studio. As you can [[78]], some are poetry collections and some are historical records. They are highly valued by [[79]] and collectors. The woman [[80]] patient and careful. In [[81]] free time, she teaches college students basic book restoration skills. She helps them get more [[82]] than through classroom learning alone. The woman has [[83]] small workshop in the city library. Now she is [[84]] on a 300-year-old handwritten book.`
  ]
});

addExamArticle("tianshanTofu", {
  title: "2026年乌鲁木齐天山区九年级适应测试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(life)", answers: ["lives"], options: ["life", "lifes", "living", "lives"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "our daily", explain: "our 表示复数意义，这里的 daily lives 指“我们的日常生活”。life 以 -fe 结尾，变复数时改 f/fe 为 v，再加 -es，填 lives。" },
    { no: 75, prompt: "(beside)", answers: ["beside"], options: ["side", "besides", "inside", "beside"], hasPrompt: true, pos: "介词", mapNode: "prep", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "易混淆介词辨析", focusOptions: ["易混淆介词辨析", "介词固定搭配", "方位介词", "介词含义判断"], point: "beside / besides 辨析", clue: "restaurants / busy streets", explain: "beside 表示“在……旁边”，符合“繁华街道旁边的小餐馆”。besides 表示“除……之外还有”，是干扰项。" },
    { no: 76, prompt: "", answers: ["into"], options: ["in", "to", "on", "into"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "turn into", clue: "turn", explain: "turn ... into ... 表示“把……变成……”，所以填 into。" },
    { no: 77, prompt: "(surface)", answers: ["surfaces"], options: ["surface", "surfaced", "surfacing", "surfaces"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "fried chou tofu / golden", explain: "surface 在这里指炸臭豆腐金黄色的表面，结合多块豆腐的语境，用复数 surfaces。" },
    { no: 78, prompt: "(become)", answers: ["becomes"], options: ["become", "became", "is becoming", "becomes"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "one simple food", blank: "become", clueText: "show" }), point: "一般现在时三单", clue: "show / one simple food", explain: "主句 show 是一般现在时，宾语从句描述客观事实；主语 one simple food 是第三人称单数，填 becomes。" },
    { no: 79, prompt: "", answers: ["than"], options: ["then", "as", "from", "than"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "比较级标志词", clue: "less", explain: "less 是比较级，后面常接 than，表示“比肉花费更少”。then 是拼写混淆项。" },
    { no: 80, prompt: "(China)", answers: ["Chinese"], options: ["China", "Chinas", "China's", "Chinese"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "不可数名词转换为形容词", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词变形容词", clue: "cook", explain: "空后是名词 cook，需要形容词修饰名词。China 的形容词形式是 Chinese。" },
    { no: 81, prompt: "(he)", answers: ["his"], options: ["he", "him", "himself", "his"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "To one's surprise", clue: "surprise", explain: "To one's surprise 是固定句型，空后是名词 surprise，需要形容词性物主代词 his。" },
    { no: 82, prompt: "(cook)", answers: ["cooking"], options: ["cook", "cooks", "cooked", "cooking"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "accident", predicate: "changed", blank: "cook", clueText: "of" }), point: "介词 + doing", clue: "of", explain: "空前是介词 of，动词 cook 要变为动名词 cooking，表示“烹饪”。" },
    { no: 83, prompt: "(west)", answers: ["western"], options: ["west", "wests", "westing", "western"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "不可数名词转换为形容词", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词变形容词", clue: "countries", explain: "空后是名词 countries，需要形容词修饰名词，west 变 western，表示“西方的”。" },
    { no: 84, prompt: "(bring)", answers: ["bringing"], options: ["bring", "brings", "to bring", "bringing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "介词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "tofu", predicate: "keeps", blank: "bring", clueText: "keeps" }), point: "keep doing", clue: "keeps", explain: "句中已有谓语 keeps，bring 走非谓语路线。keep doing sth. 表示“持续做某事”，填 bringing。" }
  ],
  paragraphs: [
    `Tofu is a common dish in our daily [[74]]. Whether in schools or small restaurants [[75]] busy streets, this soft white food is always on the menus. Chinese are good at playing magic with tofu. We turn it [[76]] mapo tofu that makes the mouth hot, fried chou tofu with golden [[77]], or sweet tofu covered with fruits. These dishes show how one simple food [[78]] different meals.`,
    `Scientists call tofu as "health superstar". It helps people build strong body. Best of all, it's low in fat and costs less [[79]] meat, making it popular among people of all age groups. An old story takes us back to 2,000 years ago. A [[80]] cook accidentally mixed sea salt into soybean milk. To [[81]] surprise, it became soft blocks-the world's first tofu! This clever accident changed the history of [[82]].`,
    `Today, tofu travels worldwide. In [[83]] countries, people enjoy it in salads and sandwiches, calling it "Chinese cheese" because of its shape. From Chinese kitchens to the dining room around the world, tofu keeps [[84]] both health and joy to people.`
  ]
});

addExamArticle("urumqi70Village", {
  title: "2026年乌鲁木齐70中九年级模考",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(see)", answers: ["to see"], options: ["see", "saw", "seeing", "to see"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "They", predicate: "were excited", blank: "see", clueText: "excited" }), point: "be excited to do", clue: "excited", explain: "be excited to do sth. 表示“做某事很兴奋”，填 to see。" },
    { no: 75, prompt: "", answers: ["from"], options: ["to", "in", "of", "from"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "far away from", clue: "far away", explain: "far away from 表示“远离……”，填 from。" },
    { no: 76, prompt: "(peace)", answers: ["peaceful"], options: ["peace", "peaces", "peacefully", "peaceful"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词转换为形容词", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词变形容词", clue: "was very", explain: "was very 后需要形容词作表语，peace 变 peaceful。" },
    { no: 77, prompt: "(divide)", answers: ["divided"], options: ["divide", "dividing", "to divide", "divided"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态+语态", actionRelation: "被动承受动作", structure: "一般过去时+被动", subject: "The students", predicate: "were", blank: "divide", clueText: "were / into" }), point: "was/were done", clue: "were / into", explain: "students 与 divide 是被动关系，空前 were 构成一般过去时被动语态，填 divided。" },
    { no: 78, prompt: "", answers: ["but"], options: ["so", "and", "or", "but"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "转折连词", clue: "nervous / enjoy", explain: "前文 nervous，后文 started to enjoy，语义转折，填 but。" },
    { no: 79, prompt: "(carry)", answers: ["carrying"], options: ["carry", "carried", "to carry", "carrying"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "old man", predicate: "was having", blank: "carry", clueText: "in" }), point: "介词 + doing", clue: "in", explain: "have trouble in doing sth. 表示“做某事有困难”，填 carrying。" },
    { no: 80, prompt: "(he)", answers: ["his"], options: ["he", "him", "himself", "his"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词", clue: "home", explain: "空后是名词 home，表示“他的家”，用形容词性物主代词 his。" },
    { no: 81, prompt: "", answers: ["that"], options: ["what", "which", "when", "that"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "so ... that", clue: "so grateful", explain: "so + adj. + that... 表示“如此……以至于……”，填 that。" },
    { no: 82, prompt: "(careful)", answers: ["carefully"], options: ["careful", "care", "more careful", "carefully"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "look after", explain: "空处修饰动词短语 look after animals，形容词 careful 变副词 carefully。" },
    { no: 83, prompt: "", answers: ["a"], options: ["the", "an", "/", "a"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "meaningful and challenging experience", explain: "experience 在此表示“一段经历”，是可数名词单数；meaningful 以辅音音素开头，填 a。" },
    { no: 84, prompt: "(kind)", answers: ["kindness"], options: ["kind", "kindly", "kinding", "kindness"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词变名词", clue: "act of", explain: "of 后需要名词成分，kind 变名词 kindness。" }
  ],
  paragraphs: [
    `Last summer, a group of middle school students went on a school trip to a small village. They were excited [[74]] a different part of the country. The village was far away [[75]] the city, and there were full of beautiful views along the way. When they arrived, they found the village was very [[76]].`,
    `The students were [[77]] into small groups to stay with local families. At first, some students felt a bit nervous, [[78]] they started to enjoy the life there soon. One day, they met an old man who was having trouble in [[79]] a heavy load. Without thinking twice, the students rushed to help him. They carried the load to [[80]] home and even helped him clean the house. The old man was so grateful [[81]] he told them many interesting stories about the village.`,
    `During the trip, the students learned how to plant crops and look after animals [[82]]. They also helped the local farmers with their work. It was [[83]] meaningful and challenging experience for them. They realized that even a small act of [[84]] could bring great joy to others.`
  ]
});

addExamArticle("urumqiSecondMockLabubu", {
  title: "2026年乌鲁木齐第二次模拟考试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(produce)", answers: ["produced"], options: ["produce", "producing", "produced", "to produce"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态+语态", actionRelation: "被动承受动作", structure: "一般过去时+被动", subject: "Labubu", predicate: "was created", blank: "produce", clueText: "was created" }), point: "一般过去时+被动", clue: "was created / and", explain: "and 连接并列谓语部分，前面是 was created，提示一般过去时 + 被动语态；后面省略 was，填过去分词 produced。" },
    { no: 75, prompt: "", answers: ["for"], options: ["to", "as", "for", "with"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "be famous for", clue: "famous", explain: "be famous for 表示“因……而闻名”，填 for。" },
    { no: 76, prompt: "(tooth)", answers: ["teeth"], options: ["tooth", "tooths", "teeth", "toothes"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "不规则名词复数", clue: "ears", explain: "and 后的 ears 是复数，tooth 的不规则复数是 teeth。" },
    { no: 77, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "top global star", explain: "star 是可数名词单数，此处泛指“一个全球顶流明星”，top 以辅音音素开头，填 a。" },
    { no: 78, prompt: "(feel)", answers: ["feeling"], options: ["feel", "feels", "feeling", "felt"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["动词变名词", "可数名词变复数", "不可数名词保持原形", "名词所有格"], point: "动词变名词", clue: "a great / of", explain: "a great ... of 中间需要名词，所以这里先判断空格目标词性为名词；feel 变 feeling，表示“感觉”。" },
    { no: 79, prompt: "(two)", answers: ["second"], options: ["Two", "Second", "Secondly", "Twice"], hasPrompt: true, pos: "数词", mapNode: "num", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "基数词与序数词互换", focusOptions: ["基数词与序数词互换", "概数词 hundred/thousand/million", "分数表达", "倍数表达"], point: "基数词变序数词", clue: "First / Third", explain: "前文 First，后文 Third，这里需要序数词 Second，句首首字母大写。" },
    { no: 80, prompt: "(give)", answers: ["gives"], options: ["give", "giving", "gave", "gives"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "which", blank: "give", clueText: "feel" }), point: "一般现在时三单", clue: "which / feel", explain: "which 指代前文“它勇敢且特别”这件事，是单数概念；陈述客观现象，用 gives。" },
    { no: 81, prompt: "(good)", answers: ["well"], options: ["good", "better", "best", "well"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "uses", explain: "空处修饰动词 uses，good 的副词形式是不规则变化 well。" },
    { no: 82, prompt: "(country)", answers: ["countries"], options: ["country", "countrys", "countries", "countryes"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "different", explain: "different 后接可数名词复数；country 变 y 为 i 加 -es，填 countries。" },
    { no: 83, prompt: "(surprised)", answers: ["surprise"], options: ["surprised", "surprising", "surprises", "surprise"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词变名词", clue: "a big", explain: "a big 后需要名词，surprised 还原为名词 surprise，表示“惊喜”。" },
    { no: 84, prompt: "(share)", answers: ["sharing"], options: ["share", "shares", "shared", "sharing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "It", predicate: "sets", blank: "share", clueText: "for" }), point: "介词 + doing", clue: "for", explain: "提示词 share 是动词，空前 for 是介词；介词后接动名词，所以 share 去 e 加 ing，答案为 sharing。" }
  ],
  paragraphs: [
    `Labubu, a character from The Monsters series, was created by Hong Kong artist Kasing Lung and [[74]] by Pop Mart. It's famous [[75]] its ugly-cute look, sharp [[76]] and fluffy ears, and has become a superstar around the world. But why did Labubu become [[77]] top global star? There are three main reasons.`,
    `First is the "Blind Box" magic. Pop Mart sells toys in boxes where you can't see what is inside. This creates a great [[78]] of surprise and luck. People enjoy the excitement of opening the box, just like a lucky draw. [[79]] is the emotional connection. Unlike perfect cartoon characters, Labubu looks a bit strange and imperfect. Many young people see themselves in Labubu. They feel it is brave and special, which [[80]] them comfort.`,
    `Third is smart marketing. Pop Mart uses social media very [[81]]. When some famous stars like David Beckham posted photos with Labubu, it became a huge trend. The designs that mix Western imagination with Chinese culture help it fit into different [[82]]. Labubu is a big [[83]] for Chinese pop culture. It shows that Chinese pop culture can go to the world through creativity. It sets a great example for [[84]] Chinese culture worldwide.`
  ]
});

addExamArticle("teaAdaptation", {
  title: "2026年乌鲁木齐中考适应性测试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(try)", answers: ["tried"], options: ["try", "tries", "trying", "tried"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "I", blank: "try", clueText: "thought" }), point: "一般过去时", clue: "thought", explain: "主句 thought 是一般过去时，从句动作也用一般过去时，填 tried。" },
    { no: 75, prompt: "(gradual)", answers: ["gradually"], options: ["gradual", "gradualy", "gradually", "graduated"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "fell in love with", explain: "空处修饰动词短语 fell in love with，gradual 变副词 gradually。" },
    { no: 76, prompt: "", answers: ["about"], options: ["in", "on", "about", "from"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "learn about", clue: "learn more", explain: "learn about 表示“了解关于……”，填 about。" },
    { no: 77, prompt: "(province)", answers: ["provinces"], options: ["province", "provinces", "provincing", "provincies"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "fifteen", explain: "空前有数字 fifteen，可数名词 province 用复数 provinces。" },
    { no: 78, prompt: "(divide)", answers: ["divided"], options: ["divide", "divided", "dividing", "to divide"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态+语态", actionRelation: "被动承受动作", structure: "一般现在时 + 被动", subject: "Chinese teas", predicate: "are", blank: "divide", clueText: "are / into" }), point: "一般现在时 + 被动", clue: "are / into", explain: "本空不是非谓语。are 在这里不是一个已经完整结束的谓语，而是被动语态的助动词；Chinese teas 与 divide 是被动关系，are + done 构成一般现在时被动语态，所以填 divided。" },
    { no: 79, prompt: "(serve)", answers: ["serving"], options: ["serve", "serves", "served", "serving"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "custom", predicate: "is", blank: "serve", clueText: "of" }), point: "介词 + doing", clue: "of", explain: "空前是介词 of，serve 去 e 加 ing，填 serving。" },
    { no: 80, prompt: "", answers: ["when"], options: ["Because", "But", "When", "So"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "状语从句连词", clue: "you pour tea", explain: "根据句意“当你倒茶时”，用 When 引导时间状语从句。" },
    { no: 81, prompt: "(they)", answers: ["them"], options: ["they", "their", "theirs", "them"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "人称代词：动词/介词 + 宾格", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性物主代词 + 名词", "反身代词：某人自己"], point: "介词 + 宾格", clue: "to", explain: "空前是介词 to，介词后的人称代词要用宾格，所以 they 变 them。" },
    { no: 82, prompt: "(much)", answers: ["more"], options: ["much", "many", "most", "more"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "比较级", clue: "than", explain: "空后有 than，much 的比较级是 more。" },
    { no: 83, prompt: "(nation)", answers: ["national"], options: ["nation", "national", "nationally", "nations"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词转换为形容词", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词变形容词", clue: "treasure", explain: "空后是名词 treasure，需要形容词 national 修饰。" },
    { no: 84, prompt: "", answers: ["a"], options: ["the", "an", "/", "a"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "cup of tea", explain: "a cup of tea 表示“一杯茶”，cup 以辅音音素开头，填 a。" }
  ],
  paragraphs: [
    `My name is Ivan, an exchange student from Russia. When I [[74]] tea for the first time, I thought it was bitter. But later, I fell in love with it [[75]]. When I get close to tea, I learn more [[76]] it. There are fifteen major tea-producing [[77]] in China. According to the method of production, Chinese teas are generally [[78]] into six major kinds. They are green tea, black tea, Oolong tea, white tea, yellow tea, and dark tea.`,
    `When I communicate with my Chinese friends, I learn that there is a custom of [[79]] guests with tea. [[80]] you pour tea, the rule of "half cup for tea" should be kept. The guests should take a little if you offer tea to [[81]]. Besides, make sure that the spout of the teapot is not facing anyone. It is [[82]] than politeness.`,
    `When I walk along the streets here, tea is everywhere. As China's [[83]] treasure, it carries thousands of years of history and an art of life. Would you like [[84]] cup of tea today?`
  ]
});

addExamArticle("grade8StressMidterm", {
  title: "2026年乌鲁木齐新师大附中8年级期中考试",
  startNo: 69,
  questions: [
    { no: 69, prompt: "(exam)", answers: ["exams"], options: ["exam", "examing", "exams", "examed"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "some students / results", explain: "exam 是可数名词，此处泛指各种考试，结合 some students 的复数语境，用 exams。" },
    { no: 70, prompt: "(be)", answers: ["will be"], options: ["are", "were", "will be", "would be"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般将来时", subject: "my parents", blank: "be", clueText: "If I fail" }), point: "主将从现", clue: "If I fail", explain: "If 引导条件状语从句，从句用一般现在时 fail，主句用一般将来时 will be。" },
    { no: 71, prompt: "(make)", answers: ["makes"], options: ["make", "making", "made", "makes"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "pressure", blank: "make", clueText: "sometimes" }), point: "一般现在时三单", clue: "sometimes / pressure", explain: "sometimes 提示一般现在时；pressure 是不可数名词，按第三人称单数处理，填 makes。" },
    { no: 72, prompt: "", answers: ["a"], options: ["the", "an", "a", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "good middle school", explain: "school 是可数名词单数，此处泛指“一所好的中学”，good 以辅音音素开头，填 a。" },
    { no: 73, prompt: "(practice)", answers: ["practicing"], options: ["practice", "to practice", "practices", "practicing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "She", predicate: "keeps", blank: "practice", clueText: "keeps" }), point: "keep doing", clue: "keeps", explain: "句中已有谓语 keeps，practice 走非谓语；keep doing sth. 表示“坚持做某事”，填 practicing。" }
  ],
  paragraphs: [
    `Many students feel stressed in our daily life. For example, some students don't stop worrying about [[69]] until they get good results. They think, "If I fail the test, my parents [[70]] disappointed." This idea makes us nervous.`,
    `Although pressure sometimes [[71]] us tired, it can also help us grow. My friend Lily studies harder so that she can enter [[72]] good middle school. She makes a study plan and keeps [[73]] every day.`
  ]
});

addExamArticle("grade8YellowRiver", {
  title: "2026年乌鲁木齐13中8年级期中考试",
  startNo: 67,
  questions: [
    { no: 67, prompt: "", answers: ["as"], options: ["for", "to", "as", "with"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "be known as", clue: "known / the mother river", explain: "be known as 表示“被称为 / 作为……而闻名”，填 as。" },
    { no: 68, prompt: "(start)", answers: ["starts"], options: ["start", "starting", "started", "starts"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "It", blank: "start", clueText: "runs" }), point: "一般现在时三单", clue: "runs / It", explain: "后句 runs 是一般现在时，说明这里描述黄河客观事实；主语 It 为三单，填 starts。" },
    { no: 69, prompt: "(enter)", answers: ["entering"], options: ["enter", "entered", "to enter", "entering"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "It", predicate: "runs", blank: "enter", clueText: "before" }), point: "介词 + doing", clue: "before", explain: "before 在此作介词，后接动名词 entering。" },
    { no: 70, prompt: "(bring)", answers: ["brought"], options: ["bring", "brings", "bringing", "brought"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "the river", blank: "bring", clueText: "In ancient times" }), point: "一般过去时", clue: "In ancient times", explain: "In ancient times 提示一般过去时，bring 的过去式是 brought。" },
    { no: 71, prompt: "", answers: ["through"], options: ["in", "out", "to", "through"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "break through", clue: "broke / banks", explain: "break through 表示“突破、冲破”，符合“冲破河岸”的语境。" },
    { no: 72, prompt: "(quick)", answers: ["quickly"], options: ["quick", "quicker", "quickest", "quickly"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "wash away", explain: "空处修饰动词短语 wash away，quick 变副词 quickly。" },
    { no: 73, prompt: "", answers: ["and"], options: ["but", "so", "or", "and"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "并列连词", clue: "store water / produce electricity", explain: "store water 与 produce electricity 并列，填 and。" },
    { no: 74, prompt: "(tree)", answers: ["trees"], options: ["tree", "a tree", "treeing", "trees"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "planting", explain: "planting trees 表示“种树”这一类行为，tree 用复数 trees。" },
    { no: 75, prompt: "(important)", answers: ["importance"], options: ["important", "importantly", "most important", "importance"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "the + 名词 + of", clue: "the / of", explain: "the ... of 结构中间需要名词，important 变 importance。" },
    { no: 76, prompt: "(solve)", answers: ["to solve"], options: ["solve", "solving", "solved", "to solve"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "people", predicate: "manage", blank: "solve", clueText: "manage" }), point: "manage to do", clue: "manage", explain: "manage to do sth. 表示“设法做成某事”，填 to solve。" }
  ],
  paragraphs: [
    `The Yellow River is the second-longest river in China. It is known [[67]] the mother river of the Chinese. It [[68]] in the Qinghai-Xizang Plateau. It runs through nine provinces before [[69]] the sea.`,
    `In ancient times, the river [[70]] both life and problems. In flood seasons, it often broke [[71]] its banks, while in dry seasons, it sometimes dried up, affecting farming. So people started to find ways to manage it. Yu the Great, instead of blocking floods, dug canal to guide water away. Later, embankments were built to control the flow. During the Ming Dynasty, Pan Jixun used narrower embankments to wash away sediment [[72]].`,
    `In modern times, water projects have been built to store water [[73]] produce electricity. Environmental protection has also been strengthened, such as planting [[74]] to reduce soil loss. For over twenty years, the Yellow River has not dried up, and some fish have returned. The story of the Yellow River teaches us the [[75]] of living in peace with nature. It shows how people manage [[76]] problems with wisdom and hard work. Today, we must continue to protect this great river for the future.`
  ]
});

addExamArticle("grade8SportsMeeting", {
  title: "2026年乌鲁木齐8中8下期中考试",
  startNo: 69,
  questions: [
    { no: 69, prompt: "(play)", answers: ["players"], options: ["play", "played", "player", "players"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "one of + 最高级 + 复数名词", clue: "one of the best", explain: "one of the best 后接可数名词复数；play 先变 player，再变 players。" },
    { no: 70, prompt: "(stress)", answers: ["stress"], options: ["stressful", "stressed", "stressing", "stress"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词保持原形", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词保持原形", "不可数名词转换为形容词"], point: "不可数名词原形", clue: "my", explain: "my 后接名词，stress 表示“压力”时为不可数名词，保持原形。" },
    { no: 71, prompt: "", answers: ["however"], options: ["So", "And", "But", "However"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "副词"], point: "逻辑转折副词", clue: "went well / stomachache", explain: "前文 went well，后文 stomachache，且空后有逗号，应用转折副词 However。" },
    { no: 72, prompt: "(thank)", answers: ["thankful"], options: ["thank", "thanks", "thankfully", "thankful"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变形容词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "动词变形容词"], point: "feel + 形容词", clue: "feel / warm", explain: "feel 后接形容词作表语，并与 warm 并列，thank 变 thankful。" },
    { no: 73, prompt: "(we)", answers: ["ourselves"], options: ["us", "our", "ours", "ourselves"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "反身代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "反身代词", clue: "challenge", explain: "challenge ourselves 表示“挑战我们自己”，用反身代词 ourselves。" },
    { no: 74, prompt: "(leave)", answers: ["leaving"], options: ["leave", "left", "to leave", "leaving"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "we", predicate: "should pull", blank: "leave", clueText: "instead of" }), point: "介词 + doing", clue: "instead of", explain: "instead of 中 of 是介词，后接动名词 leaving。" },
    { no: 75, prompt: "(achieve)", answers: ["achievement"], options: ["achieve", "achieves", "achieving", "achievement"], hasPrompt: true, pos: "动词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["动词变名词", "动词变形容词", "谓语动词时态", "非谓语：doing"], point: "动词变名词", clue: "a bigger", explain: "a bigger 后需要可数名词单数，achieve 变 achievement。" },
    { no: 76, prompt: "", answers: ["on"], options: ["in", "at", "on", "to"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "look on the bright side", clue: "look / bright side", explain: "look on the bright side 表示“往好的方面想”，填 on。" },
    { no: 77, prompt: "(press)", answers: ["pressure"], options: ["press", "pressed", "pressing", "pressure"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词保持原形", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词保持原形", "不可数名词转换为形容词"], point: "动词变名词", clue: "reduce", explain: "reduce 后需要名词作宾语，press 变 pressure，表示“压力”。" },
    { no: 78, prompt: "(last)", answers: ["lastly"], options: ["Last", "Lastly", "At last", "Lasting"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰全句", clue: "句首逗号", explain: "空处位于句首并用逗号隔开，表示顺序“最后”，用副词 Lastly。" },
    { no: 79, prompt: "", answers: ["to"], options: ["on", "for", "and", "to"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "encourage sb. to do", clue: "encourage you / keep trying", explain: "encourage sb. to do sth. 表示“鼓励某人做某事”，填 to。" }
  ],
  paragraphs: [
    `Last month, our school held a sports meeting. As one of the best [[69]] in our class, I took part in the 800-meter race. At first, I was so nervous that I felt blue and couldn't sleep well. My PE teacher noticed my [[70]] and said, "Don't be hard on yourself. You've practiced hard, so just do your best." On the day of the race, everything went well at first. [[71]], I suddenly had a stomachache halfway. I felt terrible and slowed down. Some students shouted to me, "Come on! Don't give up!" Their cheers made me feel [[72]] and warm. I decided to keep going.`,
    `When I crossed the finish line, I didn't get the first place. But my classmates all smiled at me and said I was brave. Later, I realized that the purpose of the race is not just to win, but to challenge [[73]]. A week later, our class had a meeting. We talked about the sports meeting. My deskmate said, "What we should learn is to support each other. When one of us is in trouble, we should pull together instead of [[74]] him alone." The teacher nodded and added, "You are right. Though you didn't win, you all showed team spirit. That's a bigger [[75]]."`,
    `From then on, I became more positive. When I feel down, I always look [[76]] the bright side. I learn to take care of my health-if I have a headache or toothache, I'll see a dentist or doctor right away, instead of letting the illness get worse. Sometimes I practice kung fu to relax and reduce [[77]]. I know staying healthy is important. [[78]], I want to say: growing up means learning to face difficulties bravely. Don't let negative feelings break you. Instead, wake up your courage and keep moving forward. One day, you will find you are much stronger than you think. If you feel upset once in a while, talk to your friends or teachers. They can help you clear the air and solve your problems. I hope my story can encourage you [[79]] keep trying.`
  ]
});

addExamArticle("grade8MidongLetter", {
  title: "2025乌鲁木齐米东区8下期中",
  startNo: 56,
  questions: [
    { no: 56, prompt: "(happiness)", answers: ["happy"], options: ["happiness", "happily", "happy", "happier"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词转换为形容词", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词变形容词", clue: "am very", explain: "am very 后需要形容词作表语，happiness 变 happy。" },
    { no: 57, prompt: "(enjoy)", answers: ["enjoying"], options: ["enjoy", "enjoyed", "to enjoy", "enjoying"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "you", predicate: "are", blank: "enjoy", clueText: "by" }), point: "介词 + doing", clue: "by", explain: "by 是介词，后接动名词 enjoying。" },
    { no: 58, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "problem", explain: "problem 是可数名词单数，此处泛指一个问题，填 a。" },
    { no: 59, prompt: "", answers: ["with"], options: ["to", "with", "for", "about"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "argue with", clue: "argued", explain: "argue with sb. 表示“和某人争吵/争论”，填 with。" },
    { no: 60, prompt: "(find)", answers: ["found"], options: ["find", "finds", "finding", "found"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "he", blank: "find", clueText: "was" }), point: "一般过去时", clue: "was", explain: "本句前半句 was very angry 是过去时态环境，because 从句中的 find 也用过去式 found。" },
    { no: 61, prompt: "(other)", answers: ["others'"], options: ["other", "others", "other's", "others'"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "代词所有格", clue: "homework", explain: "表示“其他人的作业”，others 作泛指复数，再加所有格，填 others'。" },
    { no: 62, prompt: "", answers: ["what"], options: ["how", "that", "what", "why"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "宾语从句连接词", clue: "do next", explain: "宾语从句 I should do next 中 do 缺少宾语，用 what。" },
    { no: 63, prompt: "(he)", answers: ["him"], options: ["he", "his", "himself", "him"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "人称代词：动词/介词 + 宾格", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性物主代词 + 名词", "反身代词：某人自己"], point: "介词 + 宾格", clue: "to", explain: "介词 to 后用宾格，he 变 him。" },
    { no: 64, prompt: "", answers: ["for"], options: ["to", "for", "with", "about"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "ask sb. for help", clue: "ask / help", explain: "ask sb. for help 表示“向某人寻求帮助”，填 for。" },
    { no: 65, prompt: "(advice)", answers: ["advice"], options: ["advices", "advising", "advised", "advice"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "不可数名词保持原形", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词保持原形", "不可数名词转换为形容词"], point: "不可数名词原形", clue: "some", explain: "advice 是不可数名词，即使前面有 some 也不加 s，保持原形。" }
  ],
  paragraphs: [
    `Dear Jack, How is it going with you? I am very [[56]] to hear from you. I know that you are on vacation in Canada by [[57]] your pictures in your e-mail.`,
    `I have [[58]] problem which needs to be solved. Yesterday afternoon I argued [[59]] my best friend, Kim. And he was very angry because he [[60]] that I copied his homework. He told me it was wrong to copy [[61]] homework. Last night I thought about it for a long time. Now I know I was wrong at that time. But I don't know [[62]] I should do next. My mother thinks I should go to see Kim and tell him I was wrong. My father thinks I should call Kim and say sorry to [[63]]. And my brother says I should call "teen talk", the radio advice program. My sister tells me that I should ask my teacher [[64]] help. Can you give me some [[65]]? I hope you can help me. Jim`
  ]
});

addExamArticle("grade8WinterVacation", {
  title: "2025乌鲁木齐8上期末",
  startNo: 63,
  questions: [
    { no: 63, prompt: "", answers: ["for"], options: ["to", "with", "in", "for"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "prepare for", clue: "prepare yourself", explain: "prepare oneself for sth. 表示“为……做准备”，填 for。" },
    { no: 64, prompt: "", answers: ["how"], options: ["what", "why", "how", "where"], hasPrompt: false, mapNode: "blank", noPromptType: "代词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "疑问词 + to do", clue: "advice on / to make", explain: "how to make your vacation wonderful 表示“如何让假期精彩”，填 how。" },
    { no: 65, prompt: "(activity)", answers: ["activities"], options: ["activity", "activitys", "activities", "active"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "some outdoor", explain: "some 后接可数名词复数；activity 变 y 为 i 加 -es，填 activities。" },
    { no: 66, prompt: "(healthy)", answers: ["healthily"], options: ["healthy", "health", "healthier", "healthily"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "eating", explain: "空处修饰 eating，healthy 变 y 为 i 加 -ly，填 healthily。" },
    { no: 67, prompt: "(learn)", answers: ["to learn"], options: ["learn", "learns", "learning", "to learn"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "we", predicate: "advise", blank: "learn", clueText: "advise you" }), point: "advise sb. to do", clue: "advise you", explain: "advise sb. to do sth. 表示“建议某人做某事”，填 to learn。" },
    { no: 68, prompt: "(you)", answers: ["yours"], options: ["you", "your", "yours", "yourself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "名词性物主代词", clue: "different from", explain: "此处指 your cultures，后面没有名词，用名词性物主代词 yours。" },
    { no: 69, prompt: "(find)", answers: ["will find"], options: ["find", "found", "are finding", "will find"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般将来时", subject: "You", blank: "find", clueText: "will make" }), point: "一般将来时", clue: "will make", explain: "语境是对寒假未来结果的预判，且从句有 will make，主句用 will find。" },
    { no: 70, prompt: "", answers: ["if"], options: ["Because", "Although", "So", "If"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "条件状语从句", clue: "you follow / you will", explain: "前句是条件，后句是结果，且符合主将从现，填 If。" },
    { no: 71, prompt: "", answers: ["what"], options: ["How", "Which", "Where", "What"], hasPrompt: false, mapNode: "blank", noPromptType: "代词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "What 感叹句", clue: "an unforgettable time", explain: "空后是名词短语 an unforgettable time，符合 What + a/an + adj. + n. + 主语 + 谓语结构。" },
    { no: 72, prompt: "(get)", answers: ["getting"], options: ["get", "got", "to get", "getting"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "you", predicate: "are looking", blank: "get", clueText: "looking forward to" }), point: "look forward to doing", clue: "looking forward to", explain: "look forward to 中的 to 是介词，后接动名词；get 双写 t 加 ing，填 getting。" }
  ],
  paragraphs: [
    `Boys and girls, have you already made a plan for the coming winter vacation? This holiday is the time for you to take your mind off homework and prepare yourself [[63]] the future. Here is some advice on [[64]] to make your vacation wonderful.`,
    `First, take regular exercise. You work hard most of the time. So you need to join in some outdoor [[65]]. You can improve your health by doing different kinds of exercise and eating [[66]]. Second, learn some life skills. One day, you will live by yourself. You can't depend on your family any longer. So we advise you [[67]] to cook, and some other life skills. Third, go for a trip. In this way, you'll understand cultures that are different from [[68]]. Finally, enjoy family time. Don't always sit in front of a computer. Remember to spend time with your family. More importantly, it is great fun for family members to sit around the table, discussing sports, clothes or other common things. You [[69]] that these small talks will make your family members much closer.`,
    `[[70]] you follow the advice above, you will certainly say, "[[71]] an unforgettable time my winter vacation is!" What are you looking forward to [[72]] during the winter vacation?`
  ]
});

addExamArticle("rmbCulture", {
  title: "人民币与中国文化主题阅读",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(careful)", answers: ["carefully"], options: ["careful", "carefully", "care", "more careful"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "looked", explain: "空处修饰前面的动词 looked，根据“副词修饰动词”的原则，careful 变 carefully。" },
    { no: 75, prompt: "", answers: ["for"], options: ["for", "with", "to", "on"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "pay for", clue: "pay / milk tea", explain: "pay for sth. 意为“为……付款/买单”，此处表示为奶茶或饭菜付款，填 for。" },
    { no: 76, prompt: "(it)", answers: ["its"], options: ["It", "Its", "It's", "Itself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词", clue: "background pattern", explain: "空后是名词短语 background pattern，需要形容词性物主代词 its；句首首字母大写为 Its。" },
    { no: 77, prompt: "(country)", answers: ["countries"], options: ["country", "countrys", "countries", "country's"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "one of + 复数名词", clue: "one of the first", explain: "one of the + 序数词/最高级 + 可数名词复数，country 变 countries。" },
    { no: 78, prompt: "(begin)", answers: ["began"], options: ["begin", "begins", "began", "has begun"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "people", blank: "begin", clueText: "During the Song dynasty" }), point: "一般过去时", clue: "During the Song dynasty", explain: "During the Song dynasty 是过去时间状语，动作发生在过去，begin 用过去式 began。" },
    { no: 79, prompt: "(include)", answers: ["including"], options: ["include", "included", "including", "to include"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：doing", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "They", predicate: "had", blank: "include", clueText: "designs" }), point: "including 列举补充", clue: "designs / dragons", explain: "主句 They had detailed designs 已完整，逗号后补充列举内容，including 意为“包括”。" },
    { no: 80, prompt: "", answers: ["an"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "play an important role in", clue: "plays / important role", explain: "play an important role in... 是固定搭配，important 以元音音素开头，填 an。" },
    { no: 81, prompt: "(carry)", answers: ["carries"], options: ["carry", "carries", "carried", "is carrying"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "This flower", blank: "carry", clueText: "often" }), point: "一般现在时三单", clue: "This flower / often", explain: "often 提示一般现在时，主语 This flower 是第三人称单数，carry 变 carries。" },
    { no: 82, prompt: "(strong)", answers: ["strength"], options: ["strong", "strongly", "strength", "stronger"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "介词后名词 / 并列名词", clue: "for / hope and courage", explain: "空前是介词 for，空后与 hope、courage 并列，需要名词，strong 变 strength。" },
    { no: 83, prompt: "(appear)", answers: ["has appeared"], options: ["appears", "appeared", "has appeared", "is appearing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在完成时", subject: "It", blank: "appear", clueText: "since ancient times" }), point: "现在完成时", clue: "since ancient times", explain: "since ancient times 是现在完成时标志，主语 It 是单数，用 has appeared。" },
    { no: 84, prompt: "(heavy)", answers: ["heavier"], options: ["heavy", "heavily", "heaviest", "heavier"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "比较级", clue: "far / than", explain: "than 是比较级标志，far 用来修饰比较级；heavy 变 y 为 i 加 -er，填 heavier。" }
  ],
  paragraphs: [
    `When was the last time you used cash? For many of us, it feels like ages. Have you ever looked [[74]] at RMB notes? Today, we pay [[75]] milk tea or meals with just a phone scan or a tap of the phone. Banknotes seem to have disappeared. But they are a lot more than just money. Instead, they offer valuable windows into Chinese culture. Take the ¥100 note as an example. [[76]] background pattern looks very similar to a phoenix design on a piece of Warring States-period lacquer-ware!`,
    `In fact, China was one of the first [[77]] in the world to use paper money. During the Song dynasty, people [[78]] to use notes such as jiaozi. They had detailed designs, [[79]] dragons and phoenixes. Besides being beautiful, this made it hard to make fake money.`,
    `Today, each RMB note features a flower that plays [[80]] important role in Chinese culture. For instance, the ¥50 note bears the chrysanthemum. This flower often [[81]] the meaning of the hermit, especially because of Tao Yuanming, the poet who wrote the famous line "Plucking chrysanthemums by the eastern fence."`,
    `Another great example is the plum blossom on the ¥100 note. This flower blooms in the cold of winter, so it often stands for [[82]], hope and courage. It's probably the most celebrated flower in our culture and [[83]] in more poems than one can count since ancient times. RMB notes carry a cultural weight far [[84]] than the numbers printed on them!`
  ]
});

addExamArticle("wuqinXiMock", {
  title: "2026年乌鲁木齐经开区5月中考模拟考试",
  startNo: 54,
  questions: [
    { no: 54, prompt: "(monkey)", answers: ["monkeys"], options: ["monkey", "monkeys", "monkeies", "monkey's"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "并列名词复数", clue: "tigers / bears / cranes", explain: "空前后列举动物，tigers、bears、cranes 都是复数形式，monkey 以元音字母+y 结尾，直接加 -s，填 monkeys。" },
    { no: 55, prompt: "(it)", answers: ["its"], options: ["it", "its", "it's", "itself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词", clue: "own moves", explain: "空后是名词短语 own moves，表示“它自己的动作”，用形容词性物主代词 its。" },
    { no: 56, prompt: "", answers: ["of"], options: ["of", "with", "for", "in"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "be full of", clue: "full / energy", explain: "be full of... 意为“充满……的”，本句表示猴子的动作充满能量，填 of。" },
    { no: 57, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "well-known Chinese doctor", explain: "doctor 是可数名词单数，此处泛指“一位”著名中医，well-known 以辅音音素开头，填 a。" },
    { no: 58, prompt: "", answers: ["but"], options: ["and", "but", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "not only... but also...", clue: "not only / also", explain: "先圈出 not only，再往后找 also，二者构成 not only... but also...，表示“不仅……而且……”。这里不是普通并列 and，也不是因果 so，所以锁定 but。" },
    { no: 59, prompt: "(make)", answers: ["made"], options: ["make", "makes", "made", "making"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "doing exercises", blank: "make", clueText: "helped" }), point: "一般过去时 / 并列谓语", clue: "and helped", explain: "and 连接并列谓语，后面 helped 是过去式，空处也用一般过去时 made。" },
    { no: 60, prompt: "(health)", answers: ["healthy"], options: ["health", "healthy", "healthily", "healthier"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "名词变形容词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "名词变形容词"], point: "keep sb. + adj.", clue: "keeps us", explain: "keep sb. + adj. 表示“使某人保持某种状态”，health 变形容词 healthy。" },
    { no: 61, prompt: "(turn)", answers: ["turning"], options: ["turn", "turned", "turning", "to turn"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：doing", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "ancient people", predicate: "did", blank: "turn", clueText: "such as / walking / and" }), point: "介词 + doing / 并列 doing", clue: "such as / walking / and", explain: "such as 后有 walking，and 连接并列结构，turn 与 walking 保持一致，用 turning。" },
    { no: 62, prompt: "(long)", answers: ["longer"], options: ["long", "longer", "longest", "more long"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "比较级", clue: "much", explain: "much 常修饰比较级，此处表示“更久”，long 变 longer。" },
    { no: 63, prompt: "(stay)", answers: ["to stay"], options: ["stay", "stays", "staying", "to stay"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "It", predicate: "is", blank: "stay", clueText: "a good way" }), point: "a way to do sth.", clue: "a good way", explain: "a good way to do sth. 表示“做某事的好方法”，填 to stay。" },
    { no: 64, prompt: "(tradition)", answers: ["traditional"], options: ["tradition", "traditional", "traditionally", "traditions"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "名词变形容词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "名词变形容词"], point: "形容词修饰名词", clue: "Chinese culture", explain: "空后是名词短语 Chinese culture，需要形容词修饰名词，tradition 变 traditional。" }
  ],
  paragraphs: [
    `Wuqin Xi is a kind of exercise from ancient China, which is also called 5-Animal Qigong. It is named after five animals: tigers, deer, bears, [[54]] and cranes. Each animal has [[55]] own moves. The tiger moves look strong while the deer's are soft and easy. The bear moves are slow. The monkey moves are quick and full [[56]] energy and the cranes' are light.`,
    `Dating back to Eastern Han Dynasty, it was first created by Hua Tuo. He is [[57]] well-known Chinese doctor. Hua Tuo not only helped his patients with their illness, [[58]] he also liked to use physical exercises to help people recover. According to him, doing exercises [[59]] the body stronger and helped blood move better.`,
    `"Wuqin Xi keeps us [[60]]. Many years ago, the ancient people did these exercises, such as walking like a bear and [[61]] their heads like an owl. In this way, they could stay young much [[62]]." Hua Tuo once said to his student Wu Pu.`,
    `These days, people practice Wuqin Xi in parks or at home. It is a good way [[63]] healthy and also a combination of our great [[64]] Chinese culture and nature.`
  ]
});

addExamArticle("midongDietMock", {
  title: "2026年乌鲁木齐米东区5月中考模拟",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(help)", answers: ["to help"], options: ["help", "helps", "helping", "to help"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "Parents", predicate: "do", blank: "help", clueText: "do all kinds of things" }), point: "to do 表目的", clue: "do all kinds of things", explain: "句中已有谓语 do，help 表目的，用不定式 to help。" },
    { no: 75, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "play a role in", clue: "play / role in", explain: "play a role in... 表示“在……中起作用”，role 为可数名词单数，填 a。" },
    { no: 76, prompt: "(perform)", answers: ["will perform"], options: ["perform", "performed", "will perform", "are performing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般将来时", subject: "they", blank: "perform", clueText: "If / eat" }), point: "主将从现", clue: "If / eat", explain: "If 引导条件状语从句，从句用一般现在时 eat，主句用一般将来时 will perform。" },
    { no: 77, prompt: "", answers: ["between"], options: ["between", "among", "from", "with"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "between A and B", clue: "six / and eight", explain: "between A and B 表示“在 A 和 B 之间”，填 between。" },
    { no: 78, prompt: "(read)", answers: ["reading"], options: ["read", "reads", "reading", "to read"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：doing", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "Children", predicate: "got", blank: "read", clueText: "of / tests" }), point: "动名词作定语", clue: "of / tests", explain: "all kinds of 后接名词结构，此处 reading tests 表示“阅读测试”，填 reading。" },
    { no: 79, prompt: "(develop)", answers: ["development"], options: ["develop", "developing", "development", "developed"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["动词变名词", "可数名词变复数", "不可数名词保持原形", "名词所有格"], point: "动词变名词", clue: "made much more", explain: "made 后需要名词作宾语，develop 变名词 development。" },
    { no: 80, prompt: "(change)", answers: ["changes"], options: ["change", "changes", "changing", "changed"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "可数名词复数", clue: "Great / in their reading skills", explain: "change 作“变化”讲是可数名词，此处泛指多方面变化，用复数 changes。" },
    { no: 81, prompt: "(children)", answers: ["children's"], options: ["children", "childrens", "children's", "childrens'"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变所有格", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词所有格", clue: "school success", explain: "空后是名词短语 school success，表示“孩子们的学校成功”，children 的所有格为 children's。" },
    { no: 82, prompt: "(great)", answers: ["greatly"], options: ["great", "greater", "greatly", "greatness"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "副词修饰动词", clue: "influence", explain: "空处修饰动词 influence，用副词 greatly。" },
    { no: 83, prompt: "(have)", answers: ["have"], options: ["has", "have", "had", "having"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "Parents and schools", blank: "have", clueText: "can / need" }), point: "一般现在时 / 复数主语", clue: "can / need / Parents and schools", explain: "前后句 can influence、need 表明这里陈述一般情况；主语 Parents and schools 是复数，用 have。" },
    { no: 84, prompt: "(health)", answers: ["healthy"], options: ["health", "healthy", "healthily", "healthier"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "名词变形容词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "名词变形容词"], point: "形容词修饰名词", clue: "a / diet", explain: "空后是名词 diet，需要形容词修饰名词，health 变 healthy。" }
  ],
  paragraphs: [
    `Parents do all kinds of things [[74]] their children get top grades in school. A study shows that children's diet can play [[75]] role in their IQ level. If children eat fruits, vegetables, fish and whole grains in their early school years, they [[76]] much better in later tests.`,
    `The study involved 161 children aged [[77]] six and eight, and they had been watched closely for three school years. Children with balanced diets got the highest scores in all kinds of [[78]] tests. They also made much more [[79]] in reading ability than their classmates. Great [[80]] in their reading skills could be seen from Grade One to Grade Three.`,
    `"A healthy diet is a very important point for [[81]] school success," one researcher said. This good living habit can influence children's long term learning ability [[82]]. Parents and schools [[83]] the duty to create good eating conditions for children. They also need to pay attention to guiding kids to keep a [[84]] diet every day.`
  ]
});

addExamArticle("paperPrintingInternet", {
  title: "2026乌鲁木齐第三次模拟考试",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(it)", answers: ["its"], options: ["it", "its", "itself", "it's"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词 + 名词", clue: "invention", explain: "空后为名词 invention，表示“它的发明”，需要形容词性物主代词 its。" },
    { no: 75, prompt: "", answers: ["by"], options: ["by", "with", "in", "on"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "by hand", clue: "made books / hand", explain: "by hand 意为“用手工/手工地”，表示人们手工制作书本。" },
    { no: 76, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "as a result", clue: "As / result", explain: "as a result 是固定短语，意为“结果”，填 a。" },
    { no: 77, prompt: "(learn)", answers: ["to learn"], options: ["learn", "learning", "learned", "to learn"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "few people", predicate: "had", blank: "learn", clueText: "chance" }), point: "have the chance to do sth.", clue: "chance", explain: "句中已有谓语 had，learn 走非谓语路线；have the chance to do sth. 表示“有机会做某事”，填 to learn。" },
    { no: 78, prompt: "(invent)", answers: ["invented"], options: ["invent", "invented", "inventing", "was invented"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态+语态", actionRelation: "被动承受动作", structure: "一般过去时+被动", subject: "Printing", predicate: "was", blank: "invent", clueText: "was / in China" }), point: "was done", clue: "was / in China", explain: "主语 Printing 与 invent 是被动关系，空前 was 已给出，填过去分词 invented，构成一般过去时被动语态。" },
    { no: 79, prompt: "(cheap)", answers: ["cheaply"], options: ["cheap", "cheaper", "cheaply", "cheapest"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰动词", clue: "produce / more quickly and", explain: "空处与 more quickly 并列，并共同修饰 produce，需要副词 cheaply。" },
    { no: 80, prompt: "(come)", answers: ["came"], options: ["come", "comes", "came", "coming"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "newspapers", blank: "come", clueText: "Then" }), point: "一般过去时", clue: "Then / out", explain: "整段按时间顺序讲述过去的发展，Then 表示“后来/然后”，come 的过去式为 came，came out 表示“出版/问世”。" },
    { no: 81, prompt: "", answers: ["but"], options: ["and", "but", "so", "because"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "并列连词（转折关系）", clue: "is new / is growing very fast", explain: "前句说互联网是新事物，后句说它发展非常快，前后存在转折关系，用 but。" },
    { no: 82, prompt: "(book)", answers: ["books"], options: ["book", "books", "book's", "booking"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "可数名词复数", clue: "than", explain: "book 是可数名词，此处泛指“书籍”，空前没有 a/the 等限定词，需用复数 books。" },
    { no: 83, prompt: "(small)", answers: ["smaller"], options: ["small", "smaller", "smallest", "more small"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "比较级", clue: "than", explain: "空后出现 than，提示使用比较级，small 变为 smaller。" },
    { no: 84, prompt: "(be)", answers: ["are"], options: ["am", "is", "are", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态+语态", actionRelation: "被动承受动作", structure: "一般现在时+被动", subject: "computers and the Internet", blank: "be", clueText: "Now / used" }), point: "are done", clue: "Now / computers and the Internet / used", explain: "Now 提示一般现在时；主语 computers and the Internet 是复数，且与 use 是被动关系，因此用 are，与 used 构成一般现在时被动语态。" }
  ],
  paragraphs: [
    `Paper was first created about 2,000 years ago in China. After [[74]] invention, people started to write on paper to make books. In those days, people made books [[75]] hand. They could make only one book each time. As [[76]] result, the books were expensive. So few people had the chance [[77]] to read.`,
    `Printing was [[78]] in China during the Sui and Tang dynasties. Later, developments in printing made it possible to produce books more quickly and [[79]]. Then newspapers [[80]] out. This new form made knowledge and ideas spread faster than ever before.`,
    `The Internet is new, [[81]] it is growing very fast. Soon it will be more powerful than printing. It can store more information than [[82]]. The mobile phones we use are often [[83]] than a book. So people can get more information and share it more easily.`,
    `Now, computers and the Internet [[84]] used in classrooms, and newspapers and magazines are already read online. What will traditional printing be like in the future? Let's wait and see.`
  ]
});

addExamArticle("zhangSixuanMartialArts", {
  title: "决胜中考2026新疆中考英语仿真卷",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(she)", answers: ["her"], options: ["she", "her", "hers", "herself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词 + 名词", clue: "skills", explain: "空后核心词是名词 skills，表达“她的优秀传统武术技能”，需要形容词性物主代词 her。" },
    { no: 75, prompt: "(start)", answers: ["started"], options: ["start", "starts", "started", "starting"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "Zhang Sixuan", blank: "start", clueText: "became / set" }), point: "一般过去时", clue: "became / set", explain: "前文 became、set 都是过去式，说明上下文叙述过去经历，start 用过去式 started。" },
    { no: 76, prompt: "", answers: ["at"], options: ["at", "in", "on", "by"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "at the age of", clue: "the age of", explain: "at the age of + 数字 是固定搭配，意为“在……岁时”。" },
    { no: 77, prompt: "", answers: ["Although"], options: ["Although", "Because", "If", "So"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "让步状语从句连接词", clue: "was very young / never stopped", explain: "前半句“她很年轻”和后半句“从未停止训练”构成让步关系，用 Although，句首需大写。" },
    { no: 78, prompt: "(careful)", answers: ["carefully"], options: ["careful", "carefully", "care", "more careful"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰动词", clue: "practiced", explain: "空处修饰动词 practiced，需要副词 carefully。" },
    { no: 79, prompt: "(child)", answers: ["children"], options: ["child", "childs", "children", "children's"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词不规则复数", clue: "other", explain: "other 后常接可数名词复数表示“其他的……”，child 的复数是不规则形式 children。" },
    { no: 80, prompt: "(be)", answers: ["were"], options: ["is", "are", "was", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "Her parents", blank: "be", clueText: "encouraged / taught" }), point: "一般过去时 + 复数主语", clue: "encouraged / taught / Her parents", explain: "后句 encouraged、taught 是过去式，提示上下文过去语境；本句主语 Her parents 是复数，所以 be 动词用 were。" },
    { no: 81, prompt: "(finish)", answers: ["finish"], options: ["finish", "finishes", "finished", "to finish"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "情态动词 + 动词原形", subject: "she", blank: "finish", clueText: "can" }), point: "情态动词后原形", clue: "can", explain: "空前有情态动词 can，后接动词原形 finish。" },
    { no: 82, prompt: "(surprise)", answers: ["surprised"], options: ["surprise", "surprising", "surprised", "surprises"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词作表语", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "be surprised at", clue: "are / at / Many people", explain: "be surprised at... 表示“对……感到惊讶”。主语是 Many people，表示人的情感状态，用 surprised。" },
    { no: 83, prompt: "(much)", answers: ["more"], options: ["much", "many", "more", "most"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "比较级", clue: "teenagers", explain: "结合语境表示“更多的青少年”，much/many 的比较级为 more，用 more 修饰复数名词 teenagers。" },
    { no: 84, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "coach", explain: "coach 是可数名词单数，此处泛指“一名教练”，且 coach 以辅音音素开头，用 a。" }
  ],
  paragraphs: [
    `In 2026, 12-year-old Zhang Sixuan from Henan became famous around China. She set a Guinness World Record for [[74]] excellent traditional martial arts skills. Zhang Sixuan [[75]] practicing martial arts [[76]] the age of five.`,
    `[[77]] she was very young, she never stopped training every day. She practiced [[78]] and kept improving. When she was nine, she won the World Shaolin Kung Fu Championship. Her performance was even shown on TV. Sixuan's daily life of training was hard: early morning training, school classes, and evening practice. She often trained during vacations while other [[79]] played. Her parents [[80]] her strongest support. They often encouraged her and taught her to hold on to her dream.`,
    `Now she can [[81]] 69 headstands in one minute and 11 splits on benches in one minute. Many people are [[82]] at her talent. She is so crazy about traditional martial arts that she wants to pass it on to [[83]] teenagers. During her free time, she leads her classmates to perform Chinese martial arts on the street. Her biggest dream is to be [[84]] coach and pass on our traditional culture as well.`
  ]
});

addExamArticle("sadHorseToy", {
  title: "2026中考考前最后一卷（新疆专用）",
  startNo: 74,
  questions: [
    { no: 74, prompt: "(become)", answers: ["become"], options: ["become", "became", "becoming", "becomes"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：现在完成时", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在完成时", subject: "A horse toy", predicate: "has", blank: "become", clueText: "has" }), point: "现在完成时", clue: "has", explain: "空前 has 提示现在完成时，需要过去分词；become 的过去分词仍为 become。" },
    { no: 75, prompt: "(it)", answers: ["its"], options: ["it", "its", "itself", "it's"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词 + 名词", clue: "mouth", explain: "空后是名词 mouth，表达“它的嘴巴”，需要形容词性物主代词 its。" },
    { no: 76, prompt: "", answers: ["but"], options: ["and", "but", "so", "because"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "并列连词（转折关系）", clue: "sad / cute", explain: "sad 与 cute 存在转折和对比关系，表示“悲伤但可爱”，用 but。" },
    { no: 77, prompt: "(feel)", answers: ["felt"], options: ["feel", "feels", "felt", "feeling"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "They", blank: "feel", clueText: "understood" }), point: "一般过去时", clue: "understood", explain: "本句中 understood 是过去式，且本段描述过去发生的事情，feel 用过去式 felt。" },
    { no: 78, prompt: "", answers: ["up"], options: ["up", "out", "off", "in"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "cheer sb. up", clue: "cheered", explain: "cheer sb. up 是固定搭配，意为“使某人振奋/让某人开心起来”。" },
    { no: 79, prompt: "(fix)", answers: ["to fix"], options: ["fix", "fixing", "fixed", "to fix"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "owner", predicate: "tried", blank: "fix", clueText: "tried" }), point: "try to do sth.", clue: "tried", explain: "句中已有谓语 tried，fix 走非谓语路线；try to do sth. 表示“尝试做某事”，填 to fix。" },
    { no: 80, prompt: "(make)", answers: ["making"], options: ["make", "makes", "making", "made"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：现在进行时", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在进行时", subject: "workers", predicate: "are", blank: "make", clueText: "Now / are" }), point: "现在进行时", clue: "Now / are", explain: "Now 和空前 are 提示现在进行时，make 去 e 加 ing，填 making。" },
    { no: 81, prompt: "(line)", answers: ["lines"], options: ["line", "lines", "line's", "lining"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "可数名词复数", clue: "over ten", explain: "空前 over ten 表示超过十条，line 是可数名词，用复数 lines。" },
    { no: 82, prompt: "(fun)", answers: ["funny"], options: ["fun", "funny", "funnily", "funniest"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词修饰名词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "形容词修饰名词", clue: "ways", explain: "空后是名词 ways，需要形容词作定语，fun 变为 funny。" },
    { no: 83, prompt: "", answers: ["an"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "incorrect thing", explain: "thing 是可数名词单数，表示“一件不正确的事情”；incorrect 以元音音素开头，用 an。" },
    { no: 84, prompt: "(want)", answers: ["wants"], options: ["want", "wants", "wanted", "wanting"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "everyone", blank: "want", clueText: "everyone / becomes" }), point: "一般现在时三单", clue: "everyone / becomes", explain: "定语从句主语 everyone 视为第三人称单数，且主句 becomes 是一般现在时，所以 want 加 -s 变为 wants。" }
  ],
  paragraphs: [
    `A horse toy for the new year has [[74]] very hot online. This happened because of a small mistake. A worker in Yiwu, Zhejiang province, sewed [[75]] mouth upside down. This made the toy look sad [[76]] cute.`,
    `A girl bought this toy and put its picture on the Internet. Many people saw it. They began to call it the "Sad Horse". Many people liked its sad face. They [[77]] the toy understood their unhappy feelings. It cheered them [[78]] during bad days. Soon, everyone wanted to buy this "Sad Horse".`,
    `The toy is about 20cm tall and costs 25 yuan. At first, the factory owner tried [[79]] the mistake. But after seeing so many people wanted the "wrong" toy, he changed his mind. Now, the factory workers are [[80]] this kind of "Sad Horse". They are using over ten production [[81]] to make more toys! The owner said that the orders are full until June 2026.`,
    `People online talk about the toy in some [[82]] ways. They say the new year allows you to feel sad sometimes. Some people joke that the horse "fell down" but became successful-a real-life story of something bad turning into something good. The factory owner said it was just a worker's mistake. But this mistake made the toy a big hit. From [[83]] incorrect thing, it becomes a popular toy that everyone [[84]].`
  ]
});

addExamArticle("grade7PullingCrops", {
  title: "拔苗助长主题阅读",
  startNo: 67,
  fixedPhrases: [
    { zh: "从前", en: "once upon a time" },
    { zh: "担心……", en: "be worried about" },
    { zh: "自言自语", en: "say to oneself" },
    { zh: "想到；进入脑海", en: "come to one's mind" },
    { zh: "冲向……", en: "rush towards" },
    { zh: "迫不及待做某事", en: "can't wait to do sth." },
    { zh: "有问题；出错", en: "there is something wrong" },
    { zh: "匆忙地", en: "in a hurry" },
    { zh: "遵守规则", en: "follow the rules" }
  ],
  questions: [
    { no: 67, prompt: "(slow)", answers: ["slowly"], options: ["slow", "slowly", "slower", "slowest"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰动词", clue: "grew", explain: "空处修饰实义动词 grew，根据“副词修饰动词”，slow 变为 slowly。" },
    { no: 68, prompt: "(day)", answers: ["days"], options: ["day", "days", "day's", "daily"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "数字 + 可数名词复数", clue: "three", explain: "空前有数字 three，可数名词 day 必须用复数 days。" },
    { no: 69, prompt: "(grow)", answers: ["grow", "to grow"], options: ["grow", "grows", "growing", "to grow"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "I", predicate: "must use", blank: "grow", clueText: "help them" }), point: "help sb. (to) do sth.", clue: "help them", explain: "句中已有谓语 must use；help sb. (to) do sth. 中 to 可以省略，因此 grow 和 to grow 都正确。" },
    { no: 70, prompt: "(sudden)", answers: ["Suddenly", "suddenly"], options: ["Sudden", "Suddenly", "Suddenness", "More sudden"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰整句", clue: "句首逗号", explain: "空处位于句首并用逗号隔开，修饰整个句子；sudden 变副词 suddenly，句首大写为 Suddenly。" },
    { no: 71, prompt: "(rush)", answers: ["rushed"], options: ["rush", "rushes", "rushed", "rushing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "he", blank: "rush", clueText: "came / pulled" }), point: "一般过去时", clue: "came / pulled", explain: "全文讲述过去的寓言故事，前后有 came、pulled 等过去式，rush 用过去式 rushed。" },
    { no: 72, prompt: "(laugh)", answers: ["laughed"], options: ["laugh", "laughs", "laughed", "laughing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "the farmer", blank: "laugh", clueText: "said and" }), point: "并列谓语时态一致", clue: "said and", explain: "and 连接并列谓语，前面的 said 是过去式，所以 laugh 也用过去式 laughed。" },
    { no: 73, prompt: "(son)", answers: ["sons"], options: ["son", "sons", "son's", "sons'"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "one of + 复数名词", clue: "one of his", explain: "one of + 形容词性物主代词 + 可数名词复数，表示“……中的一个”，所以 son 变 sons。" },
    { no: 74, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "in a hurry", clue: "in / hurry", explain: "in a hurry 是固定搭配，意为“匆忙地”，所以填 a。" },
    { no: 75, prompt: "(die)", answers: ["had died", "died", "were dead"], options: ["die", "died", "had died", "were dead"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "过去完成时", subject: "all the crops", blank: "die", clueText: "found" }), point: "过去的过去", clue: "found", explain: "主句 found 是过去时，庄稼死掉发生在“发现”之前，首推过去完成时 had died；部分初中标准也接受 died 或 were dead。" },
    { no: 76, prompt: "", answers: ["if"], options: ["if", "because", "although", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "条件状语从句", clue: "terrible / don't follow", explain: "前后是条件关系：如果不遵循规则，事情会很糟糕。引导条件状语从句用 if。" }
  ],
  paragraphs: [
    `Once upon a time, a farmer was always worried about the growth of his crops. He went to see them every day, but the crops grew [[67]]. He was so worried after three [[68]]. Then he said to himself, "I must use a better way to help them [[69]] faster."`,
    `[[70]], a good idea came to his mind. Then he [[71]] towards the fields. For all day, he pulled up all the crops. He worked hard until sunset. He was very tired when he came home. The father couldn't wait to tell his sons what he did in the daytime. "I'm tired, but I help all the little crops grow fast," the farmer said and [[72]] happily.`,
    `However, one of his [[73]] found there was something wrong. He ran to the fields in [[74]] hurry, but it was too late. He found that all the crops [[75]]. This story tells us things would be terrible [[76]] we don't follow the rules.`
  ]
});

addExamArticle("springGalaMascots", {
  title: "2026年春晚吉祥物主题阅读",
  startNo: 74,
  fixedPhrases: [
    { zh: "最受欢迎的……之一", en: "one of the most popular ..." },
    { zh: "来自；源于", en: "come from" },
    { zh: "代表；象征", en: "stand for" },
    { zh: "……的象征", en: "a symbol of" },
    { zh: "鼓励某人做某事", en: "encourage sb. to do sth." }
  ],
  questions: [
    { no: 74, prompt: "(be)", answers: ["are"], options: ["is", "are", "was", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", subject: "They", blank: "be", clueText: "show" }), point: "一般现在时 + 复数主语", clue: "They / show", explain: "这里描述吉祥物本身的客观属性，后文 They show 使用一般现在时；主语 They 是复数，所以 be 动词填 are。" },
    { no: 75, prompt: "(popular)", answers: ["most popular"], options: ["popular", "more popular", "most popular", "the most popular"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "形容词最高级", clue: "one of the / TV shows", explain: "one of the + 形容词最高级 + 可数名词复数，表示“最……的……之一”。popular 是多音节词，最高级用 most popular。" },
    { no: 76, prompt: "(start)", answers: ["started"], options: ["start", "starts", "started", "is starting"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "It", blank: "start", clueText: "in 1983" }), point: "一般过去时", clue: "in 1983", explain: "in 1983 是明确的过去时间标志词，说明动作发生在过去，因此 start 变为过去式 started。" },
    { no: 77, prompt: "(they)", answers: ["their"], options: ["they", "them", "their", "theirs"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性和名词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词 + 名词", clue: "family", explain: "空后是名词 family，表达“他们的家人”，需要形容词性物主代词 their。" },
    { no: 78, prompt: "", answers: ["from"], options: ["in", "on", "from", "with"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "come from", clue: "come / Chinese culture", explain: "come from 是固定搭配，意为“来自；源于”。这里表示四个吉祥物来源于中国文化，所以填 from。" },
    { no: 79, prompt: "(wing)", answers: ["wings"], options: ["wing", "wings", "wing's", "winged"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "with", explain: "wing 是可数名词。这里指带有翅膀的马，通常是双翼，按可数名词复数规则加 -s，填 wings。" },
    { no: 80, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "不定冠词泛指", clue: "three-color glaze horse", explain: "horse 是可数名词单数，此处泛指“一匹唐代三彩釉马”。three 以辅音音素开头，所以填 a。" },
    { no: 81, prompt: "", answers: ["and"], options: ["but", "and", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "并列连词", clue: "strong / confident", explain: "strong 和 confident 都是形容词，并列描述 Chi Chi 的特点，语义顺承，所以填 and。" },
    { no: 82, prompt: "(protect)", answers: ["protection"], options: ["protect", "protects", "protected", "protection"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["谓语动词", "非谓语动词", "动词变名词", "动词变形容词"], point: "动词变名词", clue: "nature", explain: "nature protection 是常见名词短语，意为“自然保护”。protect 需要变为名词 protection。" },
    { no: 83, prompt: "(hope)", answers: ["hopeful"], options: ["hope", "hopeless", "hopeful", "hopefully"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "名词变形容词", focusOptions: ["名词变形容词", "可数名词变复数", "可数名词变所有格", "名词变副词"], point: "名词变形容词", clue: "cute, active and", explain: "空前有 are，且与 cute、active 并列作表语，所以需要形容词。hope 加 -ful 变为 hopeful，表示“充满希望的”。" },
    { no: 84, prompt: "(brave)", answers: ["bravely"], options: ["brave", "braver", "bravely", "bravery"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰动词", clue: "run", explain: "空处修饰动词 run，根据“副词修饰动词”的规则，brave 变为副词 bravely。" }
  ],
  paragraphs: [
    `China Media Group announced the mascots for the 2026 Spring Festival Gala on December 18, 2025. They [[74]] four lovely horses - Qi Qi, Ji Ji, Chi Chi and Cheng Cheng. They show the spirit of the Year of the Horse. The Spring Festival Gala is one of the [[75]] TV shows for Chinese people. It [[76]] in 1983. Millions of people watch it with [[77]] family on Chinese New Year's Eve.`,
    `These four mascots come [[78]] Chinese culture. Qi Qi comes from a bronze horse of the Western Zhou Dynasty. It is dark blue-black and looks pretty. Ji Ji is from a Han Dynasty bronze horse with [[79]]. It stands for energy and progress. Chi Chi is [[80]] three-color glaze horse from the Tang Dynasty. It is strong [[81]] confident. Cheng Cheng is modeled after the Przewalski's horse, the only truly wild horse in the world. It is a symbol of nature [[82]].`,
    `These four mascots are cute, active and [[83]]. They welcome the new year and encourage us to run [[84]] towards a bright future.`
  ]
});

addExamArticle("threeVisitsThatchedCottage", {
  title: "三顾茅庐",
  startNo: 74,
  fixedPhrases: [
    { zh: "很久以前", en: "long long ago" },
    { zh: "实现某人的梦想", en: "achieve one's dream" },
    { zh: "决定做某事", en: "decide to do sth." },
    { zh: "几天后", en: "a few days later" },
    { zh: "在家", en: "at home" },
    { zh: "放弃", en: "give up" },
    { zh: "失去信心", en: "lose heart" },
    { zh: "拜访；访问", en: "pay a visit" },
    { zh: "保持安静", en: "keep quiet" },
    { zh: "同意做某事", en: "agree to do sth." },
    { zh: "从那时起", en: "from then on" },
    { zh: "最后", en: "in the end" }
  ],
  questions: [
    { no: 74, prompt: "(call)", answers: ["called"], options: ["call", "called", "calling", "to call"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：done"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "done", subject: "a wise man", predicate: "could help", blank: "call", clueText: "a wise man / Zhuge Liang" }), point: "过去分词作后置定语", clue: "a wise man / Zhuge Liang", explain: "句中已有谓语 could help，call 走非谓语路线。a wise man 与 call 是被动关系，表示“一个被叫作诸葛亮的智者”，用过去分词 called。" },
    { no: 75, prompt: "(day)", answers: ["days"], options: ["day", "days", "day's", "daily"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "a few + 可数名词复数", clue: "A few", explain: "a few 后接可数名词复数，所以 day 变为 days。" },
    { no: 76, prompt: "(tire)", answers: ["tired"], options: ["tire", "tired", "tiring", "tiredly"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变形容词", focusOptions: ["谓语动词", "非谓语动词", "动词变名词", "动词变形容词"], point: "系动词 + 形容词", clue: "felt", explain: "felt 是系动词，后面需要形容词作表语。描述人的感受用 -ed 形容词，tire 变为 tired。" },
    { no: 77, prompt: "(visit)", answers: ["visit"], options: ["visit", "visits", "visited", "to visit"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "情态动词 + 动词原形", focusOptions: ["谓语：常考时态标志词", "谓语：情态动词 + 原形", "谓语：四种被动语态", "非谓语：to do"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "情态动词 + 动词原形", subject: "he", blank: "visit", clueText: "must" }), point: "情态动词后用原形", clue: "must", explain: "空前有情态动词 must，主动语态下后面直接接动词原形 visit。" },
    { no: 78, prompt: "", answers: ["On"], options: ["In", "On", "At", "For"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "具体某一天用 on", clue: "a cold snowy day", explain: "表示“在具体的某一天”用介词 on。空后是 a cold snowy day，且位于句首，所以填 On。" },
    { no: 79, prompt: "", answers: ["and"], options: ["but", "and", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "并列连词", clue: "keep quiet / wait outside", explain: "keep quiet 和 wait outside 是并列顺承的两个动作，用 and 连接。" },
    { no: 80, prompt: "(move)", answers: ["moved"], options: ["move", "moved", "moving", "to move"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词语态", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "语态", actionRelation: "被动承受动作", structure: "一般过去时被动语态", subject: "He", predicate: "was", blank: "move", clueText: "was / by" }), point: "was done 被动语态", clue: "was / by", explain: "空前有 was，空后有 by，且 He 与 move 是被动关系，构成 was done，被动语态填 moved。" },
    { no: 81, prompt: "(he)", answers: ["him"], options: ["he", "his", "him", "himself"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "人称代词：动词/介词 + 宾格", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "动词 + 宾格", clue: "help", explain: "空前是实义动词 help，后面的人称代词用宾格，he 变为 him。" },
    { no: 82, prompt: "(make)", answers: ["to make"], options: ["make", "makes", "making", "to make"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "They", predicate: "talked", blank: "make", clueText: "ways" }), point: "ways to do sth.", clue: "ways", explain: "句中已有谓语 talked，make 走非谓语路线。ways to do sth. 表示“做某事的方法”，填 to make。" },
    { no: 83, prompt: "(suggestion)", answers: ["suggestions"], options: ["suggestion", "suggestions", "suggestion's", "suggested"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "many + 可数名词复数", clue: "many good", explain: "suggestion 是可数名词，空前有 many good，需要复数 suggestions。" },
    { no: 84, prompt: "(successful)", answers: ["successfully"], options: ["success", "successful", "successfully", "succeed"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "副词修饰动词"], point: "形容词变副词修饰动词", clue: "built", explain: "括号中提示词 successful 是形容词；空处修饰动词 built，需要变为副词 successfully。" }
  ],
  paragraphs: [
    `Long long ago, a kind man, Liu Bei, wanted to save his people and build a strong country. Someone told him a wise man [[74]] Zhuge Liang could help to achieve his dream. So Liu Bei decided to visit him.`,
    `Zhuge Liang lived in a cottage. The first time Liu Bei went there, Zhuge Liang was away. A few [[75]] later, he visited again. But Zhuge Liang was still not at home. His men felt [[76]] and wanted to give up. However, Liu Bei didn't lose heart. He said he must [[77]] the wise man.`,
    `[[78]] a cold snowy day, he paid another visit. This time Zhuge Liang was sleeping at home. Liu Bei told his men to keep quiet [[79]] wait outside patiently. After a long wait, Zhuge Liang woke up. He was deeply [[80]] by Liu Bei's respect. He agreed to help [[81]]. They talked about ways [[82]] the country better.`,
    `From then on, Zhuge Liang gave Liu Bei many good [[83]]. With his help, Liu Bei built his own country [[84]] in the end.`
  ]
});

addExamArticle("grade8VolunteerExperience", {
  title: "志愿者经历主题阅读",
  startNo: 54,
  fixedPhrases: [
    { zh: "准备好做某事；乐于做某事", en: "be ready to do sth." },
    { zh: "和某人交谈", en: "talk with sb." },
    { zh: "和某人一起工作", en: "work with sb." },
    { zh: "在……结束时", en: "at the end of" },
    { zh: "对做某事感到惊讶", en: "be surprised to do sth." },
    { zh: "产生影响", en: "make a difference" },
    { zh: "对……心怀感恩", en: "be thankful for" },
    { zh: "在……中发挥作用", en: "play a role in" },
    { zh: "同时", en: "at the same time" }
  ],
  questions: [
    { no: 54, prompt: "(volunteer)", answers: ["volunteered"], options: ["volunteer", "volunteers", "volunteered", "volunteering"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态", focusOptions: ["谓语：常考时态标志词", "谓语：主谓一致", "谓语：四种被动语态", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "I", blank: "volunteer", clueText: "Last summer vacation" }), point: "一般过去时", clue: "Last summer vacation", explain: "Last summer vacation 是明确的过去时间标志词，句子描述去年暑假的经历，所以 volunteer 用过去式 volunteered。" },
    { no: 55, prompt: "(choose)", answers: ["choosing"], options: ["choose", "chooses", "choosing", "to choose"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", subject: "I", predicate: "spent", blank: "choose", clueText: "spent / and packing" }), point: "spend time doing sth.", clue: "spent / and packing", explain: "句中已有谓语 spent，choose 走非谓语路线。spend time doing sth. 表示“花时间做某事”；同时它与 packing 并列，形式保持一致，填 choosing。" },
    { no: 56, prompt: "(real)", answers: ["really"], options: ["real", "really", "reality", "realize"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰动词", clue: "liked", explain: "空处修饰实义动词 liked，需要副词；real 变为 really。" },
    { no: 57, prompt: "(one)", answers: ["first"], options: ["one", "first", "once", "ones"], hasPrompt: true, pos: "数词", mapNode: "num", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "基数词与序数词互换", focusOptions: ["基数词与序数词互换", "概数词 hundred/thousand/million", "分数与倍数", "日期表达"], point: "基数词变序数词", clue: "the / to get there", explain: "the + 序数词 表示“第几”。句意是“我总是第一个到那里”，one 变为 first。" },
    { no: 58, prompt: "(help)", answers: ["to help"], options: ["help", "helps", "helping", "to help"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", subject: "volunteers", predicate: "were", blank: "help", clueText: "ready" }), point: "be ready to do sth.", clue: "ready", explain: "be ready to do sth. 是固定搭配，表示“准备好/乐于做某事”，所以填 to help。" },
    { no: 59, prompt: "", answers: ["with"], options: ["to", "with", "for", "about"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "talk/work with sb.", clue: "talking and working / them", explain: "talk with sb. 和 work with sb. 都表示“和某人交谈/一起工作”，结合 them，填介词 with。" },
    { no: 60, prompt: "(surprise)", answers: ["surprised"], options: ["surprise", "surprising", "surprised", "surprises"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变形容词", focusOptions: ["谓语动词", "非谓语动词", "动词变名词", "动词变形容词"], point: "be surprised to do sth.", clue: "I was / to see", explain: "括号内 surprise 是动词；主语是人 I，表示“感到惊讶”，用 -ed 形容词 surprised，构成 be surprised to do sth.。" },
    { no: 61, prompt: "(different)", answers: ["difference"], options: ["different", "differently", "difference", "differences"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "make a difference", clue: "a big", explain: "空前有 a big，需要名词；make a difference 是固定搭配，表示“产生影响”，所以 different 变为 difference。" },
    { no: 62, prompt: "(feel)", answers: ["feeling"], options: ["feel", "feels", "feeling", "felt"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["谓语动词", "非谓语动词", "动词变名词", "动词变形容词"], point: "动词变名词", clue: "a strong", explain: "空前有 such a strong，说明需要名词作宾语；feel 变为 feeling，表示“感觉”。" },
    { no: 63, prompt: "", answers: ["what"], options: ["that", "what", "which", "how"], hasPrompt: false, mapNode: "blank", noPromptType: "代词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "宾语从句连接词", clue: "for / I have", explain: "空处在介词 for 后引导宾语从句；从句 I have in life 中 have 缺少宾语，所以用 what，表示“我所拥有的东西”。" },
    { no: 64, prompt: "(we)", answers: ["ourselves"], options: ["we", "us", "our", "ourselves"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "反身代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "反身代词", clue: "we / helping", explain: "主语是 we，宾语也指“我们自己”，动作发出者和承受者一致，所以用反身代词 ourselves。" }
  ],
  paragraphs: [
    `Last summer vacation, I [[54]] at an organization called Cradles to Crayons. I spent two hours a day [[55]] and packing clothes and shoes there. I [[56]] liked the work. I was always the [[57]] to get there. The volunteers there were always happy and ready [[58]]. I enjoyed talking and working [[59]] them.`,
    `At the end of each day, the volunteer leader would tell us how many children we helped that day. I was [[60]] to see how a small act could make a big [[61]] in someone's life. I got such a strong [[62]] of satisfaction.`,
    `My volunteer experience also taught me to be thankful for [[63]] I have in life. When we volunteer, we play a role in improving others' lives. At the same time, we are helping [[64]].`
  ]
});

addExamArticle("taiChiExperience", {
  title: "太极拳体验主题阅读",
  serial: "G-02",
  practiceTitle: "太极拳体验主题阅读",
  source: "2026年高考全国二卷",
  group: "试试高考题吧！",
  startNo: 1,
  fixedPhrases: [
    { zh: "热身", en: "warm up" },
    { zh: "一起；协调一致", en: "go together" },
    { zh: "应该做某事", en: "be supposed to do sth." },
    { zh: "集中注意力于", en: "concentrate on" },
    { zh: "注视；盯着", en: "keep one's eyes on" },
    { zh: "是某人/某物做某事的时候了", en: "It's time for sb./sth. to do sth." }
  ],
  questions: [
    { no: 1, prompt: "(entire)", answers: ["entirely"], options: ["entire", "entirely", "entirety", "more entire"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "副词修饰动词/介词短语", clue: "remain / in the spot", explain: "空处修饰 remain 或 in the spot，需要副词 entirely。" },
    { no: 2, prompt: "(instruct)", answers: ["instructor"], options: ["instruct", "instructor", "instruction", "instructive"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["动词变名词", "动词变形容词", "谓语动词时态", "非谓语动词"], point: "动词变表示人的名词", clue: "a / with 28 years of experience", explain: "括号内 instruct 是动词；空前有 a，需要表示人的名词 instructor。" },
    { no: 3, prompt: "", answers: ["and"], options: ["and", "but", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "并列连词", clue: "mind / body / go together", explain: "mind 和 body 是并列关系，填 and。" },
    { no: 4, prompt: "(foot)", answers: ["feet"], options: ["foot", "foots", "feet", "feet's"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词不规则复数", clue: "your / parallel", explain: "parallel 表示两脚平行，foot 的复数是 feet。" },
    { no: 5, prompt: "(suppose)", answers: ["am supposed"], options: ["suppose", "am supposed", "was supposed", "supposing"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与固定句型", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：to do"], point: "be supposed to do sth.", clue: "Now / I / to feel", explain: "Now 提示现在语境；be supposed to do sth. 表示“应该做某事”。主语 I 用 am supposed。" },
    { no: 6, prompt: "", answers: ["which"], options: ["what", "that", "which", "it"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "介词 + 关系代词", clue: "positions, of / there are 42", explain: "非限制性定语从句中，介词 of 后指物用 which。" },
    { no: 7, prompt: "(describe)", answers: ["descriptive"], options: ["describe", "described", "descriptive", "descriptively"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变形容词", focusOptions: ["动词变名词", "动词变形容词", "谓语动词时态", "非谓语动词"], point: "动词变形容词", clue: "names", explain: "括号内 describe 是动词；空后 names 需要形容词 descriptive。" },
    { no: 8, prompt: "", answers: ["on"], options: ["in", "on", "at", "for"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "keep one's eyes on", clue: "keep my eyes / a woman", explain: "keep one's eyes on sb. 表示“注视某人”，填 on。" },
    { no: 9, prompt: "(be)", answers: ["being"], options: ["be", "being", "to be", "been"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], point: "介词 + doing", clue: "despite", explain: "despite 是介词，后接动名词 being。" },
    { no: 10, prompt: "(meet)", answers: ["to meet"], options: ["meet", "meeting", "met", "to meet"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], point: "It's time for sb. to do sth.", clue: "It's time for", explain: "It's time for sb./sth. to do sth.，填 to meet。" }
  ],
  paragraphs: [
    `For the first 15 minutes of my tai chi, we remain [[1]] in the spot to warm up. Angela, a tai chi [[2]] with 28 years of experience, says that a successful hour of tai chi is an hour with no negative thoughts.`,
    `"Your mind [[3]] body go together-that's all that matters." Although not a morning person, I begin lessons with Angela and 20 others at Sydney Community Centre courtyard at 7 a.m. "Put your [[4]] parallel and use your dan tian to hold up your body," she says.`,
    `In tai chi, the dan tian stores your qi, and qi in Chinese means life force. Now I [[5]] to feel the weight on my legs and sink my dan tian. We move on to tai chi positions, of [[6]] there are 42 in the style that Angela teaches. Today, we will only be doing the first nine. The movements have [[7]] names like "holding the bowl" and "grabbing the bird's tail".`,
    `During most of the class, we follow Angela and concentrate on making tiny, isolated movements. Then Angela gets us to try the nine movements on our own. I keep my eyes [[8]] a woman to my right and try to copy her movements, but unfortunately I soon lose focus.`,
    `At the end of the lesson, I feel wide awake, despite it still [[9]] early at 8:00 a.m. It's time for my dan tian [[10]] another life force: coffee.`
  ]
});

addExamArticle("gaokao2026Daji", {
  title: "2026年新高考I卷语法填空",
  serial: "G-01",
  practiceTitle: "中国大集与传统市集文化",
  source: "2026年新高考I卷语法填空",
  group: "试试高考题吧！",
  startNo: 56,
  fixedPhrases: [
    { zh: "发生；举行", en: "take place" },
    { zh: "例如", en: "for example" },
    { zh: "追溯到", en: "trace back to" },
    { zh: "如此……以至于……", en: "so ... that ..." },
    { zh: "在做某事之前", en: "before doing sth." }
  ],
  questions: [
    { no: 56, prompt: "(hold)", answers: ["to be held"], options: ["hold", "to hold", "being held", "to be held"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语动词时态", "非谓语动词", "动词变名词", "动词变形容词"], point: "it形式主语 + 不定式被动", clue: "It is common for them", explain: "It is + adj. + for sb. + to do sth. 需要不定式；them 指 dajis，与 hold 是被动关系，所以用 to be held。" },
    { no: 57, prompt: "(frequent)", answers: ["frequency", "frequencies"], options: ["frequent", "frequently", "frequency", "frequencies"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "形容词变名词", clue: "dates and / of dajis", explain: "frequent 是形容词；and 连接 dates，空后有 of，需要名词 frequency/frequencies。" },
    { no: 58, prompt: "", answers: ["the"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "定冠词特指", clue: "Han Dynasty", explain: "Han Dynasty 指特定朝代，前用 the。" },
    { no: 59, prompt: "(be)", answers: ["were"], options: ["is", "are", "was", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语动词时态与主谓一致", focusOptions: ["谓语动词时态", "非谓语动词", "动词变名词", "动词变形容词"], point: "一般过去时 + 复数主语", clue: "In the old days", explain: "In the old days 提示一般过去时；transportation and communication 是并列复数主语，用 were。" },
    { no: 60, prompt: "(necessity)", answers: ["necessities"], options: ["necessity", "necessities", "necessary", "necessarily"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "their daily", explain: "necessity 作“生活必需品”时可数，日常所需通常为多种，填 necessities。" },
    { no: 61, prompt: "", answers: ["that", "which"], options: ["what", "who", "that", "which"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "定语从句关系代词", clue: "goods / they needed", explain: "先行词 the goods 指物，关系词在从句中作 needed 的宾语，用 that 或 which。" },
    { no: 62, prompt: "(Draw)", answers: ["Drawn"], options: ["Draw", "Drawing", "Drawn", "To draw"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语动词时态", "非谓语动词", "动词变名词", "动词变形容词"], point: "过去分词作状语", clue: "by / they", explain: "they 与 draw 是被动关系，且有 by，应用过去分词 Drawn。" },
    { no: 63, prompt: "", answers: ["selling", "with"], options: ["selling", "with", "for", "that"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "代词"], point: "介词含义 / 非谓语后置定语", clue: "food stalls / steamed dumplings", explain: "无提示词可填 with；若原题漏印 sell，也可填 selling 作后置定语。" },
    { no: 64, prompt: "(head)", answers: ["heading"], options: ["head", "headed", "heading", "to head"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语动词", focusOptions: ["谓语动词时态", "非谓语动词", "动词变名词", "动词变形容词"], point: "介词 + doing", clue: "Before", explain: "Before 作介词，后接动名词 heading。" },
    { no: 65, prompt: "(cheap)", answers: ["cheaper"], options: ["cheap", "cheaper", "cheapest", "more cheap"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "比较级与最高级", focusOptions: ["比较级与最高级", "形容词变名词", "形容词变副词", "形容词修饰名词"], point: "比较级", clue: "much / than", explain: "much 和 than 都提示比较级，cheap 变 cheaper。" }
  ],
  paragraphs: [
    `A daji is a traditional open-air market in China. Dajis typically take place on specific dates of the lunar calendar, for example, on dates with five or seven as the last digit. It is also common for them [[56]] on traditional Chinese holidays such as the Spring Festival and the Mid-Autumn Festival. The exact dates and [[57]] of dajis vary from one region to another.`,
    `Dajis evolved from the folk custom of trading goods, which can be traced back to [[58]] Han Dynasty. In the old days, transportation and communication [[59]] so poor that it was hard for ordinary households to obtain their daily [[60]]. As a solution, people agreed to gather at a fixed location on a particular day, where they would trade their surplus items for the goods [[61]] they needed.`,
    `Today, residents from the surrounding areas still flock to these lively markets. [[62]] by the enticing aromas, they hurry to the food stalls [[63]] steamed dumplings and hot noodle soup. They also chat happily with the stall owners, sharing stories of their daily lives. Before [[64]] back home, they buy some fresh fruit and vegetables, which are much [[65]] than those sold in supermarkets.`
  ]
});

function applyExamArticleMetadata() {
  const metadata = {
    grade9: {
      serial: "01",
      practiceTitle: "马年吉祥物与中国马文化",
      source: "2026年3月乌鲁木齐九年级质量检测",
      group: "中考练习篇目"
    },
    xinjiangTunnel: {
      serial: "02",
      practiceTitle: "天山胜利隧道开通",
      source: "新疆2026热点话题预测",
      group: "中考练习篇目"
    },
    deepseekMock: {
      serial: "03",
      practiceTitle: "DeepSeek-R1 与中国人工智能",
      source: "2026年新疆中考素养第一次模拟考试",
      group: "中考练习篇目"
    },
    boyGift: {
      serial: "04",
      practiceTitle: "河北男孩攒钱给妈妈买鞋",
      source: "2026乌鲁木齐新市区九年级适应性测试",
      group: "中考练习篇目"
    },
    ancientBookFixer: {
      serial: "05",
      practiceTitle: "古籍修复师守护文化宝藏",
      source: "2026年乌鲁木齐八一中学九年级模拟考试",
      group: "中考练习篇目"
    },
    tianshanTofu: {
      serial: "06",
      practiceTitle: "豆腐的日常美味与世界旅行",
      source: "2026年乌鲁木齐天山区九年级适应测试",
      group: "中考练习篇目"
    },
    urumqi70Village: {
      serial: "07",
      practiceTitle: "乡村研学旅行与善意行动",
      source: "2026年乌鲁木齐70中九年级模考",
      group: "中考练习篇目"
    },
    urumqiSecondMockLabubu: {
      serial: "08",
      practiceTitle: "Labubu 爆红背后的文化创意",
      source: "2026年乌鲁木齐第二次模拟考试",
      group: "中考练习篇目"
    },
    teaAdaptation: {
      serial: "09",
      practiceTitle: "俄罗斯交换生眼中的中国茶",
      source: "2026年乌鲁木齐中考适应性测试",
      group: "中考练习篇目"
    },
    rmbCulture: {
      serial: "10",
      practiceTitle: "人民币里的中国文化",
      source: "2026年乌鲁木齐第十三中学5月9年级模考",
      group: "中考练习篇目"
    },
    wuqinXiMock: {
      serial: "11",
      practiceTitle: "五禽戏与传统养生文化",
      source: "2026年乌鲁木齐经开区5月中考模拟考试",
      group: "中考练习篇目"
    },
    midongDietMock: {
      serial: "12",
      practiceTitle: "健康饮食与学习能力",
      source: "2026年乌鲁木齐米东区5月中考模拟",
      group: "中考练习篇目"
    },
    paperPrintingInternet: {
      serial: "13",
      practiceTitle: "纸张、印刷术与互联网的发展",
      source: "2026乌鲁木齐第三次模拟考试",
      group: "中考练习篇目"
    },
    zhangSixuanMartialArts: {
      serial: "14",
      practiceTitle: "张思萱与传统武术梦想",
      source: "决胜中考2026新疆中考英语仿真卷",
      group: "中考练习篇目"
    },
    sadHorseToy: {
      serial: "15",
      practiceTitle: "倒嘴小马玩具意外走红",
      source: "2026中考考前最后一卷（新疆专用）",
      group: "中考练习篇目"
    },
    grade8StressMidterm: {
      serial: "8-01",
      practiceTitle: "压力与成长的学习计划",
      source: "2026年乌鲁木齐新师大附中8年级期中考试",
      group: "8年级练习"
    },
    grade8YellowRiver: {
      serial: "8-02",
      practiceTitle: "黄河治理与人与自然",
      source: "2026年乌鲁木齐13中8年级期中考试",
      group: "8年级练习"
    },
    grade8SportsMeeting: {
      serial: "8-03",
      practiceTitle: "运动会中的勇气与团队精神",
      source: "2026年乌鲁木齐8中8下期中考试",
      group: "8年级练习"
    },
    grade8MidongLetter: {
      serial: "8-04",
      practiceTitle: "给朋友的道歉求助信",
      source: "2025乌鲁木齐米东区8下期中",
      group: "8年级练习"
    },
    grade8WinterVacation: {
      serial: "8-05",
      practiceTitle: "如何规划精彩寒假",
      source: "2025乌鲁木齐8上期末",
      group: "8年级练习"
    }
    ,
    grade7PullingCrops: {
      serial: "7-01",
      practiceTitle: "拔苗助长与遵循规律",
      source: "乌鲁木齐2024-2025七年级下期末统考",
      group: "7年级练习"
    },
    springGalaMascots: {
      serial: "16",
      practiceTitle: "春晚吉祥物与马年文化",
      source: "2026新疆优质模考题汇编",
      group: "中考练习篇目"
    },
    threeVisitsThatchedCottage: {
      serial: "17",
      practiceTitle: "三顾茅庐与求贤若渴",
      source: "2026新疆中考语法填空真题",
      group: "中考练习篇目"
    },
    grade8VolunteerExperience: {
      serial: "8-06",
      practiceTitle: "志愿者经历与帮助他人",
      source: "新疆乌鲁木齐市第七十中学2024-2025第二学期八年级英语期末",
      group: "8年级练习"
    }
  };
  Object.entries(metadata).forEach(([key, value]) => {
    if (window.examArticleBank?.[key]) {
      Object.assign(window.examArticleBank[key], value);
    }
  });
}

applyExamArticleMetadata();

// Keep the current article visible, but refresh the switcher so newly added articles appear.
renderExam();
