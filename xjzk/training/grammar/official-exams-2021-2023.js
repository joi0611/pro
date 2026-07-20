(function () {
  const officialSource = (year) => `${year}年新疆维吾尔自治区、新疆生产建设兵团初中学业水平考试英语真题`;
  const basePosOptions = ["名词", "动词", "形容词与副词", "数词", "代词", "介词", "连词"];
  const mapNodeByPos = {
    "名词": "noun",
    "动词": "verb",
    "形容词与副词": "adj",
    "数词": "num",
    "代词": "pron",
    "介词": "blank",
    "连词": "blank"
  };

  function promptQuestion(no, prompt, answers, options, pos, focus, point, clue, explain, extra = {}) {
    return {
      no,
      prompt: `(${prompt})`,
      answers,
      options,
      hasPrompt: true,
      pos,
      mapNode: mapNodeByPos[pos] || "blank",
      posOptions: basePosOptions,
      focus,
      focusOptions: Array.from(new Set([focus, ...(extra.focusOptions || [])])),
      point,
      clue,
      explain,
      ...extra
    };
  }

  addExamArticle("xinjiangOfficialGrammar2023", {
    title: officialSource(2023),
    serial: "2023真题",
    practiceTitle: "十年背同学上学的友谊",
    source: officialSource(2023),
    group: "中考练习篇目",
    startNo: 66,
    fixedPhrases: [
      { zh: "在……的东南部", en: "in the southeast of" },
      { zh: "处理所有困难", en: "deal with all the difficulties" },
      { zh: "背着某人", en: "carry sb. on one's back" },
      { zh: "擅长所有科目", en: "do well in all subjects" },
      { zh: "教某人如何做某事", en: "teach sb. how to do sth." }
    ],
    questions: [
      promptQuestion(66, "in", ["in"], ["in", "on", "at", "to"], "介词", "介词保持原形", "in the southeast of", "the southeast of China", "词库给出的 in 与 the southeast of 构成方位短语 in the southeast of，保持原形。"),
      promptQuestion(67, "difficulty", ["difficulties"], ["difficulty", "difficulties", "difficult", "difficultly"], "名词", "可数名词变复数", "all the + 可数名词复数", "all the / he faces", "difficulty 表示具体困难时是可数名词；all the 后用复数 difficulties。", { focusOptions: ["名词保持原形", "可数名词变复数", "名词变形容词"] }),
      promptQuestion(68, "back", ["back"], ["back", "backs", "backed", "backing"], "名词", "名词保持原形", "on one's back", "carries Zhong on his", "carry sb. on one's back 表示“背着某人”，back 保持单数原形。", { focusOptions: ["名词保持原形", "可数名词变复数", "名词所有格"] }),
      promptQuestion(69, "if", ["if"], ["if", "that", "because", "although"], "连词", "连词保持原形", "宾语从句引导词", "ask Zhong / wants to drink", "ask 后接宾语从句，表示询问“是否”，使用 if，保持原形。"),
      promptQuestion(70, "fourth", ["fourth"], ["four", "fourth", "fourteen", "forty"], "数词", "序数词保持原形", "the + 序数词 + grade", "the / grade", "表示小学四年级用 the fourth grade；词库已给出序数词 fourth，保持原形。", { focusOptions: ["基数词变序数词", "序数词保持原形", "概数词"] }),
      promptQuestion(71, "anywhere", ["anywhere"], ["anywhere", "somewhere", "everywhere", "nowhere"], "形容词与副词", "副词保持原形", "地点副词", "anytime / at school", "anytime anywhere 表示“任何时间、任何地点”，anywhere 作地点副词，保持原形。", { focusOptions: ["副词保持原形", "形容词变副词", "比较级与最高级"] }),
      promptQuestion(72, "all", ["all"], ["all", "both", "each", "every"], "代词", "代词保持原形", "all + 复数名词", "his subjects", "subjects 是复数且表示所有科目，使用 all 修饰，保持原形。", { focusOptions: ["代词保持原形", "人称代词宾格", "物主代词"] }),
      promptQuestion(73, "us", ["us"], ["we", "us", "our", "ourselves"], "代词", "人称代词宾格保持原形", "动词 + 宾格", "makes / better and better", "make 是动词，后面用人称代词宾格 us；词库已给出正确形式，保持原形。", { focusOptions: ["人称代词主格", "人称代词宾格保持原形", "形容词性物主代词", "反身代词"] }),
      promptQuestion(74, "teach", ["taught"], ["teach", "teaches", "taught", "teaching"], "动词", "谓语动词时态", "一般过去时", "Their teacher said / their story", "宾语从句叙述过去发生的事情，主语 their story 主动发出 teach 的动作，使用过去式 taught。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "their story", blank: "teach", clueText: "Their teacher said" }),
        focusOptions: ["谓语动词时态", "谓语动词语态", "非谓语：to do", "非谓语：doing"]
      }),
      promptQuestion(75, "touched", ["touched"], ["touch", "touched", "touching", "touches"], "动词", "谓语动词时态", "现在完成时", "has also", "空前有 has，构成现在完成时 has touched；词库给出的 touched 已是过去分词，保持该形式。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "现在完成时", subject: "The friendship", predicate: "has", blank: "touched", clueText: "has also" }),
        focusOptions: ["谓语动词时态", "谓语动词语态", "非谓语：done"]
      })
    ],
    paragraphs: [
      `Zhu Jinxiang has carried his disabled classmate Zhong Huaqiang for nearly 10 years. They are from Jiangxi Province [[66]] the southeast of China. Zhong can't walk and Zhu has helped him deal with all the [[67]] he faces at school.`,
      `Zhu carries Zhong on his [[68]], walks into the classroom and puts him on his seat every day. The two boys sit next to each other. When he finishes class, Zhu will turn to ask Zhong at once [[69]] he wants to drink water or go to the bathroom.`,
      `Zhu and his friend Zhong began to study in the same class in the [[70]] grade in primary school. They have known each other and been friends. Zhu is always with Zhong anytime [[71]] at school.`,
      `With the help of Zhu, Zhong does well in [[72]] his subjects and helps Zhu with his studies. "We help each other. I get him through the little things in life and he supports me in the study. This makes [[73]] better and better," Zhu said.`,
      `Their teacher, named Xiao, said that their story [[74]] their classmates how to help each other. The friendship between the two classmates has also [[75]] many people on the Internet to do amazing and kind things for their friends.`
    ]
  });

  addExamArticle("xinjiangOfficialGrammar2022", {
    title: officialSource(2022),
    serial: "2022真题",
    practiceTitle: "瘫痪画家的追梦人生",
    source: officialSource(2022),
    group: "中考练习篇目",
    startNo: 82,
    fixedPhrases: [
      { zh: "最著名的画家之一", en: "one of the most famous painters" },
      { zh: "阻止某人做某事", en: "prevent sb. from doing sth." },
      { zh: "健康状况不佳", en: "in poor health" },
      { zh: "数千幅素描", en: "thousands of pencil sketches" },
      { zh: "名为……", en: "be called ..." }
    ],
    questions: [
      promptQuestion(82, "painter", ["painters"], ["painter", "painters", "painting", "painted"], "名词", "可数名词变复数", "one of the + 最高级 + 复数名词", "one of the most famous", "one of the most famous 后接可数名词复数，painter 变为 painters。", { focusOptions: ["名词保持原形", "可数名词变复数", "名词变动词"] }),
      promptQuestion(83, "serious", ["serious"], ["serious", "seriously", "seriousness", "more serious"], "形容词与副词", "形容词保持原形", "形容词修饰名词", "a / illness", "illness 是名词，前面需要形容词 serious 修饰；词库已给出形容词，保持原形。", { focusOptions: ["形容词保持原形", "形容词变副词", "比较级与最高级"] }),
      promptQuestion(84, "move", ["move"], ["move", "moves", "moved", "moving"], "动词", "情态动词 + 原形", "can + 动词原形", "can only", "情态动词 can 后接动词原形 move。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "情态动词 + 动词原形", subject: "She", predicate: "can", blank: "move", clueText: "can only" }),
        focusOptions: ["情态动词 + 原形", "谓语动词时态", "非谓语：to do"]
      }),
      promptQuestion(85, "trying", ["trying"], ["try", "trying", "tried", "to try"], "动词", "非谓语：doing", "prevent sb. from doing sth.", "prevented her from", "句中已有谓语 prevented；介词 from 后接动名词 trying。词库已给出 -ing 形式，保持该形式。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", actionRelation: "主动发出动作", structure: "prevent sb. from doing sth.", subject: "her", predicate: "prevented", blank: "trying", clueText: "from" }),
        focusOptions: ["非谓语：to do", "非谓语：doing", "非谓语：done"]
      }),
      promptQuestion(86, "started", ["started"], ["start", "started", "starting", "starts"], "动词", "谓语动词时态", "一般过去时", "took up / in 2015", "and 连接 took up 与 started 两个过去动作；词库已给出 started，保持该形式。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "Zhang", blank: "started", clueText: "took up / in 2015" }),
        focusOptions: ["谓语动词时态", "谓语动词语态", "非谓语：doing"]
      }),
      promptQuestion(87, "always", ["always"], ["always", "usually", "sometimes", "never"], "形容词与副词", "副词保持原形", "频度副词", "is / pushing", "always 位于 be 动词后、现在分词前，表示一直推动她挑战自己，保持原形。", { focusOptions: ["副词保持原形", "形容词变副词", "比较级与最高级"] }),
      promptQuestion(88, "health", ["health"], ["health", "healthy", "healthily", "healthier"], "名词", "名词保持原形", "in poor health", "in poor", "in poor health 表示“健康状况不佳”，health 保持名词原形。", { focusOptions: ["名词保持原形", "名词变形容词", "名词变副词"] }),
      promptQuestion(89, "of", ["of"], ["of", "for", "with", "by"], "介词", "介词保持原形", "thousands of", "thousands / pencil sketches", "thousands of 表示“数千……”，介词 of 保持原形。"),
      promptQuestion(90, "called", ["called"], ["call", "called", "calling", "to call"], "动词", "非谓语：done", "过去分词作后置定语", "an online shop / Zhang Junli's Paintings", "句中已有谓语 has；shop 与 call 是被动关系，用过去分词 called 作后置定语。词库已给出 called，保持该形式。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "done", actionRelation: "被动承受动作", structure: "过去分词作后置定语", subject: "an online shop", predicate: "has", blank: "called", clueText: "an online shop" }),
        focusOptions: ["非谓语：to do", "非谓语：doing", "非谓语：done"]
      }),
      promptQuestion(91, "works", ["works"], ["work", "works", "worked", "working"], "名词", "可数名词复数保持原形", "形容词性物主代词 + 名词", "her / encourage", "此处表示她创作的多幅作品，her 后接复数名词 works；词库已给出复数，保持原形。", { focusOptions: ["名词保持原形", "可数名词复数保持原形", "名词变动词"] })
    ],
    paragraphs: [
      `Zhang Junli, an amazing woman, is from Taiyuan, Shanxi Province. She has overcome life's greatest difficulties to become one of the most famous [[82]] in China. She has been paralyzed for over 30 years. When she was six, Zhang had a [[83]] illness. At eight, she could not move 90% of her body. She can only [[84]] her shoulders and neck a little now.`,
      `However, being paralyzed never prevented her from [[85]] to follow her dreams. Zhang took up drawing at a young age and [[86]] learning painting in 2015. Though it is hard for her to pick a paintbrush, her love for painting is [[87]] pushing her to challenge herself.`,
      `"Painting has changed me. The first time I picked up a brush, I felt that I liked to draw," says Zhang. "The world is so beautiful. Even if I am in poor [[88]], I don't want to give up the chance to live." Now Zhang has created thousands [[89]] pencil sketches. She also has an online shop [[90]] Zhang Junli's Paintings, where she sells her works.`,
      `Zhang wants to use her [[91]] to encourage those who are like her, and to tell them never to give up. "Instead of crying and worrying all day, find your meaning in life. Live in the present," says Zhang, a true inspiration.`
    ]
  });

  addExamArticle("xinjiangOfficialGrammar2021", {
    title: officialSource(2021),
    serial: "2021真题",
    practiceTitle: "医生父亲的奉献精神",
    source: officialSource(2021),
    group: "中考练习篇目",
    startNo: 86,
    fixedPhrases: [
      { zh: "工作到深夜", en: "work late into the night" },
      { zh: "选择做某事", en: "choose to do sth." },
      { zh: "生某人的气", en: "get angry with sb." },
      { zh: "看报纸", en: "read the newspaper" },
      { zh: "把……传递下去", en: "pass ... on" }
    ],
    questions: [
      promptQuestion(86, "night", ["night"], ["night", "nights", "nightly", "night's"], "名词", "名词保持原形", "late into the night", "late into the", "late into the night 表示“工作到深夜”，night 保持单数原形。", { focusOptions: ["名词保持原形", "可数名词变复数", "名词所有格"] }),
      promptQuestion(87, "me", ["me"], ["I", "me", "my", "myself"], "代词", "人称代词宾格保持原形", "介词 + 宾格", "with my mother and", "介词 with 后的人称代词用宾格 me；词库已给出宾格，保持原形。", { focusOptions: ["人称代词主格", "人称代词宾格保持原形", "形容词性物主代词", "反身代词"] }),
      promptQuestion(88, "choose", ["chose"], ["choose", "chose", "chosen", "choosing"], "动词", "谓语动词时态", "一般过去时", "when he graduated", "when he graduated 明确表示过去，主句缺少谓语，choose 使用过去式 chose。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般过去时", subject: "he", blank: "choose", clueText: "when he graduated" }),
        focusOptions: ["谓语动词时态", "谓语动词语态", "非谓语：to do"]
      }),
      promptQuestion(89, "although", ["although"], ["although", "because", "so", "and"], "连词", "连词保持原形", "让步状语从句", "spends every coin / makes a good salary", "前后构成让步关系：虽然收入不错，他仍精打细算，使用 although，保持原形。"),
      promptQuestion(90, "well", ["well"], ["good", "well", "better", "best"], "形容词与副词", "副词保持原形", "副词修饰动词", "suit me", "修饰动词 suit 使用副词 well；词库已给出正确形式，保持原形。", { focusOptions: ["副词保持原形", "形容词变副词", "比较级与最高级"] }),
      promptQuestion(91, "with", ["with"], ["with", "at", "to", "of"], "介词", "介词保持原形", "get angry with sb.", "get angry / him", "get angry with sb. 表示“生某人的气”，with 保持原形。"),
      promptQuestion(92, "more", ["more"], ["more", "many", "most", "much"], "形容词与副词", "比较级保持原形", "more + 形容词 + 复数名词", "important uses", "more important uses 表示“更多重要用途”；词库已给出比较级 more，保持原形。", { focusOptions: ["比较级保持原形", "比较级与最高级", "副词保持原形"] }),
      promptQuestion(93, "reading", ["reading"], ["read", "reading", "reads", "to read"], "动词", "谓语动词时态", "过去进行时", "was / the newspaper", "空前有 was，表示当时正在看报纸，构成过去进行时 was reading；词库已给出 reading，保持该形式。", {
        verbFlow: makeVerbFlow({ hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "过去进行时", subject: "I", predicate: "was", blank: "reading", clueText: "when I was" }),
        focusOptions: ["谓语动词时态", "谓语动词语态", "非谓语：doing"]
      }),
      promptQuestion(94, "deeply", ["deeply"], ["deep", "deeply", "deeper", "depth"], "形容词与副词", "副词保持原形", "副词修饰动词", "touched me", "修饰动词 touched 使用副词 deeply；词库已给出副词，保持原形。", { focusOptions: ["副词保持原形", "形容词变副词", "比较级与最高级"] }),
      promptQuestion(95, "spirit", ["spirit"], ["spirit", "spirits", "spiritual", "spiritually"], "名词", "名词保持原形", "the great spirit", "understand the great", "定冠词 the 与形容词 great 后需要名词 spirit，表示伟大的精神，保持单数原形。", { focusOptions: ["名词保持原形", "可数名词变复数", "名词变形容词"] })
    ],
    paragraphs: [
      `My father Rong Xing isn't exactly a good father. He works every day late into the [[86]], sometimes even forgetting to eat dinner, and gets up early as well. Even when he's at home, he always thinks about his work and hardly ever spends any time with my mother and [[87]].`,
      `As a doctor who graduated from Peking University, he could make lots of money and only do half the work he is doing now, but he [[88]] to do more difficult and important work when he graduated. He spends every coin like it is his last [[89]] he makes a good salary. He always wears worn, cheap clothes, saying they are "comfortable and suit me [[90]]," and refuses to change. I sometimes get angry [[91]] him for not caring enough about his appearance, but he just smiles and says, "Daddy has [[92]] important uses for the money, all right?"`,
      `I never stopped being curious about how he spent his money. Then one day when I was [[93]] the newspaper, a piece of news caught my eye: "Rong Xing donates 100,000 yuan to help poor children go back to school." Then I suddenly understood.`,
      `My father's love for others touched me [[94]]. I started to understand the great [[95]] and I decided to pass it on.`
    ]
  });

  renderExam();
})();
