(function () {
  function makeQuestion(config) {
    const words = config.words.map(([text, forms, tag, conversions = []]) => ({ text, forms }));
    const wordKey = Object.fromEntries(config.words.map(([text, , tag, conversions = []]) => [text, { tag, conversions }]));
    const blanks = {};
    const blankClues = {};
    const clueFormulas = {};
    for (const item of config.items) {
      blanks[item.id] = {
        needed: item.needed,
        correctWord: item.word,
        rule: item.rule,
        answer: item.answer,
        path: item.path
      };
      blankClues[item.id] = `${item.before} / ${item.after}`;
      clueFormulas[item.id] = item.formula;
    }
    let passageHtml = config.passage;
    for (const item of config.items) {
      passageHtml = passageHtml.replace(
        `{${item.id}}`,
        `<span class="blank-wrap"><button class="blank" data-blank="${item.id}">空缺 ${item.id}</button><button class="later-btn" data-later="${item.id}" title="暂缓">!</button></span>`
      );
    }
    return { title: config.title, source: config.source, words, wordKey, blanks, blankClues, clueFormulas, passageHtml };
  }

  const motherLoveNotesQuestion = makeQuestion({
    title: "藏在家里的爱心便签",
    source: "2026乌鲁木齐三中模拟预测｜藏在家里的爱心便签",
    words: [
      ["find", { verb: "find", third: "finds", past: "found", pp: "found", ing: "finding" }, "verb"],
      ["so", { conj: "so" }, "conj"],
      ["relatives", { noun: "relative", nounPlural: "relatives" }, "noun"],
      ["game", { noun: "game", nounPlural: "games" }, "noun"],
      ["for", { prep: "for" }, "prep"],
      ["warm", { adj: "warm", compare: "warmer", super: "warmest" }, "adj"],
      ["seldom", { adv: "seldom" }, "adv"],
      ["start", { verb: "start", third: "starts", past: "started", pp: "started", ing: "starting" }, "verb"],
      ["better", { adj: "better", adv: "better", compare: "better", super: "best" }, "adj", ["adv"]],
      ["hid", { verb: "hide", third: "hides", past: "hid", pp: "hidden", ing: "hiding" }, "verb"],
      ["you", { pron: "you", obj: "you", possAdj: "your", possNoun: "yours", reflexive: "yourself" }, "pron"]
    ],
    items: [
      { id: 1, needed: "adv", word: "seldom", rule: "origin", answer: "seldom", before: "I", after: "had time", formula: "修饰谓语 had，结合母亲住院后陪伴时间少，填频度副词。", path: "I ___ had time to stay with her -> 副词修饰 had，语境表示很少有时间 -> seldom" },
      { id: 2, needed: "noun", word: "relatives", rule: "plural", answer: "relatives", before: "our", after: "often helped", formula: "物主代词后接名词；谓语 helped 前需要复数主语。", path: "our ___ often helped her -> 物主代词后接名词，结合多人帮助 -> relatives" },
      { id: 3, needed: "adj", word: "warm", rule: "origin", answer: "warm", before: "a", after: "way", formula: "冠词与名词之间填形容词。", path: "a ___ way to show my love -> 形容词修饰 way，语义表示温暖的方式 -> warm" },
      { id: 4, needed: "noun", word: "game", rule: "keep", answer: "game", before: "a", after: "we used to play", formula: "冠词 a 后接可数名词单数。", path: "a ___ we used to play -> 名词作先行词，结合 play -> game" },
      { id: 5, needed: "verb", word: "find", rule: "base", answer: "find", before: "for them to", after: "After we left", formula: "不定式符号 to 后用动词原形。", path: "for them to ___ -> to + 动词原形，语义为找到便签 -> find" },
      { id: 6, needed: "prep", word: "for", rule: "safe", answer: "for", before: "looking", after: "the notes", formula: "look for 是“寻找”的固定搭配。", path: "looking ___ the notes -> look for 固定搭配 -> for" },
      { id: 7, needed: "verb", word: "start", rule: "past", answer: "started", before: "I", after: "writing notes", formula: "叙述过去发生的故事，谓语用一般过去时。", path: "I ___ writing notes -> 过去时语境，start doing sth. -> started" },
      { id: 8, needed: "conj", word: "so", rule: "safe", answer: "so", before: "in the fridge", after: "it wouldn't go bad", formula: "前因后果用 so 连接。", path: "put the milk in the fridge, ___ it wouldn't go bad -> 结果关系 -> so" },
      { id: 9, needed: "verb", word: "hid", rule: "past", answer: "hid", before: "but I", after: "a pink note", formula: "与前文 were 并列叙述过去动作，用过去式。", path: "but I ___ a pink note -> 过去时，表示藏起 -> hide -> hid" },
      { id: 10, needed: "adj", word: "better", rule: "origin", answer: "better", before: "feeling", after: "We will be", formula: "感官系动词 feel 后接形容词作表语。", path: "must be feeling ___ -> 表示身体好转 -> better" },
      { id: 11, needed: "pron", word: "you", rule: "possAdj", answer: "your", before: "found", after: "note", formula: "名词 note 前用形容词性物主代词。", path: "found ___ note -> 修饰 note，指“你的” -> you -> your" }
    ],
    passage: `Mom looked tired and weak when she got home from the hospital, but her smile was as sure as ever. I {1} had time to stay with her. It was good that our {2} often helped her. But I hoped Mom knew that I cared about her, too.<br><br>One day, I tried to think of a {3} way to show my love. Then I remembered a {4} we used to play with my grandparents. Before leaving their room, every child would hide a love note somewhere in the house for them to {5}. After we left, our grandparents would take their time to enjoy looking {6} the notes around the house.<br><br>So when I entered my mom's room, I {7} writing notes. Some were about her everyday needs, “Mom, I put the milk in the fridge, {8} it wouldn't go bad.” Some were written to express my love, “Mom, I hope you sleep well.” Most notes were in her room because she would stay there for weeks, but I {9} a pink note in the garden, “Mom, if you find this note, you must be feeling {10}. We will be so glad.”<br><br>Several weeks later, Mom phoned and said proudly, “I have just found {11} note outside my room!” I smiled at last.`
  });

  const zhangJunliQuestion = makeQuestion({
    title: "轮椅画家张俊莉",
    source: "2022新疆中考真题｜轮椅画家张俊莉",
    words: [
      ["called", { verb: "call", past: "called", pp: "called", ing: "calling" }, "verb"],
      ["painter", { noun: "painter", nounPlural: "painters" }, "noun"],
      ["always", { adv: "always" }, "adv"],
      ["of", { prep: "of" }, "prep"],
      ["trying", { verb: "try", third: "tries", past: "tried", pp: "tried", ing: "trying" }, "verb"],
      ["move", { verb: "move", third: "moves", past: "moved", pp: "moved", ing: "moving" }, "verb"],
      ["works", { noun: "work", nounPlural: "works", verb: "work" }, "noun", ["verb"]],
      ["health", { noun: "health", adj: "healthy" }, "noun", ["adj"]],
      ["started", { verb: "start", third: "starts", past: "started", pp: "started", ing: "starting" }, "verb"],
      ["serious", { adj: "serious", adv: "seriously" }, "adj", ["adv"]]
    ],
    items: [
      { id: 1, needed: "noun", word: "painter", rule: "plural", answer: "painters", before: "one of the most famous", after: "in China", formula: "one of the + 形容词最高级 + 可数名词复数。", path: "one of the most famous ___ -> one of 后用复数名词 -> painter -> painters" },
      { id: 2, needed: "adj", word: "serious", rule: "origin", answer: "serious", before: "a", after: "illness", formula: "冠词与名词之间填形容词。", path: "a ___ illness -> 形容词修饰 illness -> serious" },
      { id: 3, needed: "verb", word: "move", rule: "base", answer: "move", before: "can only", after: "her shoulders", formula: "情态动词 can 后用动词原形。", path: "can only ___ -> can + 动词原形 -> move" },
      { id: 4, needed: "verb", word: "trying", rule: "ing", answer: "trying", before: "prevented her from", after: "to follow", formula: "prevent sb. from doing sth.。", path: "prevented her from ___ -> from 后接动名词 -> try -> trying" },
      { id: 5, needed: "verb", word: "started", rule: "past", answer: "started", before: "and", after: "learning painting", formula: "具体过去时间 2015 提示一般过去时。", path: "and ___ learning painting in 2015 -> 过去式 -> started" },
      { id: 6, needed: "adv", word: "always", rule: "origin", answer: "always", before: "is", after: "pushing her", formula: "频度副词置于 be 与现在分词之间。", path: "is ___ pushing her -> 频度副词修饰谓语 -> always" },
      { id: 7, needed: "noun", word: "health", rule: "keep", answer: "health", before: "in poor", after: "I don't want", formula: "介词 in 后接名词；in poor health 是固定表达。", path: "in poor ___ -> in poor health -> health" },
      { id: 8, needed: "prep", word: "of", rule: "safe", answer: "of", before: "thousands", after: "pencil sketches", formula: "thousands of 是固定数量短语。", path: "thousands ___ pencil sketches -> thousands of -> of" },
      { id: 9, needed: "verb", word: "called", rule: "pp", answer: "called", before: "an online shop", after: "Zhang Junli's Paintings", formula: "过去分词短语作后置定语，表示“名为”。", path: "an online shop ___ ... -> 过去分词作定语 -> called" },
      { id: 10, needed: "noun", word: "works", rule: "plural", answer: "works", before: "use her", after: "to encourage", formula: "物主代词后接名词；绘画作品用 works。", path: "use her ___ to encourage -> 名词作宾语，指作品 -> works" }
    ],
    passage: `Zhang Junli, an amazing woman, is from Taiyuan, Shanxi Province. She has overcome life's greatest difficulties to become one of the most famous {1} in China. She has been paralyzed (瘫痪的) for over 30 years. When she was six, Zhang had a {2} illness. At eight, she could not move 90% of her body. She can only {3} her shoulders and neck a little now.<br><br>However, being paralyzed never prevented her from {4} to follow her dreams. Zhang took up drawing at a young age and {5} learning painting in 2015. Though it is hard for her to pick a paintbrush, her love for painting is {6} pushing her to challenge herself.<br><br>“Painting has changed me. The first time I picked up a brush, I felt that I liked to draw,” says Zhang. “The world is so beautiful. Even if I am in poor {7}, I don't want to give up the chance to live.” Now Zhang has created thousands {8} pencil sketches (素描). She also has an online shop {9} Zhang Junli's Paintings, where she sells her works.<br><br>Zhang wants to use her {10} to encourage those who are like her, and to tell them never to give up. “Instead of crying and worrying all day, find your meaning in life. Live in the present,” says Zhang, a true inspiration.`
  });

  const weightClinicsQuestion = makeQuestion({
    title: "中国开设体重门诊",
    source: "2026乌鲁木齐二十九中三模｜中国开设体重门诊",
    words: [
      ["hospital", { noun: "hospital", nounPlural: "hospitals" }, "noun"],
      ["if", { conj: "if", sentence: "If" }, "conj"],
      ["million", { num: "million", noun: "million", nounPlural: "millions" }, "num", ["noun"]],
      ["weight", { noun: "weight" }, "noun"],
      ["health", { noun: "health", adj: "healthier", compare: "healthier", super: "healthiest" }, "noun", ["adj"]],
      ["of", { prep: "of" }, "prep"],
      ["start", { verb: "start", past: "started", pp: "started", ing: "starting" }, "verb"],
      ["quick", { adj: "quick", adv: "quickly", compare: "quicker", super: "quickest" }, "adj", ["adv"]],
      ["happy", { adj: "happy", adv: "happily", compare: "happier", super: "happiest" }, "adj", ["adv"]],
      ["they", { pron: "they", obj: "them", possAdj: "their", possNoun: "theirs", reflexive: "themselves" }, "pron"],
      ["choose", { verb: "choose", past: "chose", pp: "chosen", ing: "choosing" }, "verb"]
    ],
    items: [
      { id: 1, needed: "noun", word: "hospital", rule: "plural", answer: "hospitals", before: "more special weight clinics in", after: "The doctors", formula: "介词 in 后接地点名词；more 提示复数。", path: "open more special clinics in ___ -> 地点名词复数 -> hospital -> hospitals" },
      { id: 2, needed: "noun", word: "weight", rule: "keep", answer: "weight", before: "help people lose", after: "safely", formula: "lose weight 是固定搭配。", path: "lose ___ safely -> lose weight -> weight" },
      { id: 3, needed: "prep", word: "of", rule: "safe", answer: "of", before: "part", after: "a new strategy", formula: "part of 是固定搭配。", path: "part ___ a new strategy -> part of -> of" },
      { id: 4, needed: "adv", word: "quick", rule: "toAdv", answer: "quickly", before: "The news", after: "spread online", formula: "副词修饰动词 spread。", path: "The news ___ spread online -> quick 变副词 -> quickly" },
      { id: 5, needed: "pron", word: "they", rule: "possAdj", answer: "their", before: "Many people shared", after: "ideas", formula: "名词 ideas 前用形容词性物主代词。", path: "shared ___ ideas -> they -> their" },
      { id: 6, needed: "conj", word: "if", rule: "sentence", answer: "If", before: "overweight", after: "nothing changes", formula: "条件状语从句用 if 引导，句首大写。", path: "___ nothing changes -> 条件关系 -> If" },
      { id: 7, needed: "verb", word: "start", rule: "past", answer: "started", before: "China", after: "a three-year campaign", formula: "时间 2024 提示一般过去时。", path: "China ___ a campaign in 2024 -> start -> started" },
      { id: 8, needed: "num", word: "million", rule: "plural", answer: "millions", before: "build", after: "of sports parks", formula: "millions of 表示数百万。", path: "build ___ of sports parks -> million 加 s -> millions" },
      { id: 9, needed: "verb", word: "choose", rule: "ing", answer: "choosing", before: "People are", after: "foods with less sugar", formula: "are + 现在分词构成现在进行时。", path: "People are ___ foods -> choose -> choosing" },
      { id: 10, needed: "adj", word: "health", rule: "toAdj", answer: "healthier", before: "smaller and", after: "Keeping healthy", formula: "and 连接并列比较级，结合 smaller 判断用 healthier。", path: "smaller and ___ -> health 变形容词比较级 -> healthier" },
      { id: 11, needed: "adj", word: "happy", rule: "origin", answer: "happy", before: "feeling", after: "With these methods", formula: "感官动词 feel 后接形容词。", path: "feeling ___ -> 形容词作表语 -> happy" }
    ],
    passage: `China is taking a big step to help people stay healthy. The government recently announced it would open more special “weight clinics (诊所)” in {1}. The doctors and food experts in these clinics use Traditional Chinese Medicine (TCM) to help people lose {2} safely.<br><br>An officer said the plan was part {3} a new health-first strategy (策略). The news {4} spread online. Many people shared {5} ideas online about how to exercise and eat healthily.<br><br>Why does it matter? Over half of Chinese adults are now overweight. {6} nothing changes, this number will probably rise to 70% by 2030. Being overweight can lead to lots of health problems. To solve this, China {7} a three-year weight management campaign in 2024. Weight clinics are a key part of this plan.<br><br>Besides clinics, many cities also build {8} of sports parks and walking paths for citizens (公民). Food habits are changing too. New dietary guides (膳食指南) suggest people have healthy meals. People are {9} foods with less sugar and oil. Office workers prefer salad with chicken or fish. Even holiday snacks like mooncakes are now smaller and {10}.<br><br>Keeping healthy isn't just about losing weight but about eating well, moving much, and feeling {11}. With these methods mentioned above, China hopes to build a better future for everyone.`
  });

  const yueYangziQuestion = makeQuestion({
    title: "乐羊子妻断织劝学",
    source: "2026哈密四中三模｜乐羊子妻断织劝学",
    words: [
      ["decide", { verb: "decide", past: "decided", pp: "decided", ing: "deciding" }, "verb"],
      ["a", { det: "a" }, "det"],
      ["off", { adv: "off" }, "adv"],
      ["wife", { noun: "wife", nounPlural: "wives" }, "noun"],
      ["as", { prep: "as", conj: "as" }, "prep", ["conj"]],
      ["that", { conj: "that", pron: "that" }, "conj", ["pron"]],
      ["finally", { adv: "finally" }, "adv"],
      ["why", { adv: "why", conj: "why" }, "adv", ["conj"]],
      ["named", { verb: "name", past: "named", pp: "named", ing: "naming" }, "verb"],
      ["and", { conj: "and" }, "conj"],
      ["finish", { verb: "finish", past: "finished", pp: "finished", ing: "finishing" }, "verb"]
    ],
    items: [
      { id: 1, needed: "verb", word: "named", rule: "pp", answer: "named", before: "a young man", after: "Yue Yangzi", formula: "过去分词 named 作后置定语，表示“名叫”。", path: "a young man ___ Yue Yangzi -> 过去分词作定语 -> named" },
      { id: 2, needed: "verb", word: "decide", rule: "past", answer: "decided", before: "He", after: "to leave home", formula: "故事过去时；decide to do sth.。", path: "He ___ to leave -> decide 的过去式 -> decided" },
      { id: 3, needed: "det", word: "a", rule: "safe", answer: "a", before: "from", after: "wise master", formula: "单数可数名词 master 前用不定冠词。", path: "from ___ wise master -> a" },
      { id: 4, needed: "adv", word: "why", rule: "origin", answer: "why", before: "His wife asked", after: "he returned", formula: "asked 后接宾语从句，语义询问原因。", path: "asked ___ he returned so soon -> why" },
      { id: 5, needed: "conj", word: "that", rule: "safe", answer: "that", before: "so much", after: "I came back", formula: "so...that... 表示“如此……以至于……”。", path: "missed you so much ___ I came back -> so...that -> that" },
      { id: 6, needed: "conj", word: "and", rule: "safe", answer: "and", before: "picked up scissors", after: "cut the cloth", formula: "and 连接两个并列过去动作。", path: "picked up... ___ cut -> 并列关系 -> and" },
      { id: 7, needed: "adv", word: "off", rule: "origin", answer: "off", before: "cut", after: "the unfinished cloth", formula: "cut off 表示剪断、切断。", path: "cut ___ the unfinished cloth -> cut off -> off" },
      { id: 8, needed: "prep", word: "as", rule: "safe", answer: "as", before: "the same", after: "your study", formula: "the same as 是固定搭配。", path: "the same ___ your study -> the same as -> as" },
      { id: 9, needed: "verb", word: "finish", rule: "ing", answer: "finishing", before: "without", after: "your study", formula: "介词 without 后接动名词。", path: "without ___ your study -> finish -> finishing" },
      { id: 10, needed: "noun", word: "wife", rule: "possessive", answer: "wife's", before: "his", after: "words", formula: "名词所有格修饰 words。", path: "his ___ words -> wife 的所有格 -> wife's" },
      { id: 11, needed: "adv", word: "finally", rule: "origin", answer: "finally", before: "and", after: "succeeded", formula: "副词修饰动词 succeeded。", path: "and ___ succeeded -> finally" }
    ],
    passage: `Once upon a time, there was a young man {1} Yue Yangzi, whose family was very poor. He {2} to leave home and go to a far place to study. He wanted to learn from {3} wise master there. One year later, Yue came back home. His wife asked {4} he returned so soon. Yue smiled and said, “I've been away for such a long time. I missed you so much {5} I came back.” After hearing this, his wife picked up a pair of scissors {6} cut the cloth on the loom (织布机). She said, “I've been weaving (织) this cloth for many days, now I cut {7} the unfinished cloth and all my hard work is wasted. It's the same {8} your study. You come back without {9} your study, it is just like cutting off the unfinished cloth.”<br><br>Deeply moved by his {10} words, Yue went back to the faraway place and studied hard. He stayed away from home for seven years and {11} succeeded in his study.`
  });

  const classmateHelpQuestion = makeQuestion({
    title: "十年背同学上学",
    source: "2023新疆中考真题｜十年背同学上学",
    words: [
      ["us", { pron: "we", obj: "us", possAdj: "our", possNoun: "ours", reflexive: "ourselves" }, "pron"],
      ["if", { conj: "if" }, "conj"],
      ["in", { prep: "in" }, "prep"],
      ["back", { noun: "back", adv: "back" }, "noun", ["adv"]],
      ["touched", { verb: "touch", past: "touched", pp: "touched", ing: "touching" }, "verb"],
      ["difficulty", { noun: "difficulty", nounPlural: "difficulties" }, "noun"],
      ["all", { det: "all", pron: "all" }, "det", ["pron"]],
      ["fourth", { num: "four", ordinal: "fourth" }, "num"],
      ["anywhere", { adv: "anywhere" }, "adv"],
      ["teach", { verb: "teach", past: "taught", pp: "taught", ing: "teaching" }, "verb"]
    ],
    items: [
      { id: 1, needed: "prep", word: "in", rule: "safe", answer: "in", before: "Jiangxi Province", after: "the southeast", formula: "方位表达 in the southeast of。", path: "Jiangxi Province ___ the southeast of China -> in" },
      { id: 2, needed: "noun", word: "difficulty", rule: "plural", answer: "difficulties", before: "all the", after: "he faces", formula: "all the 后接可数名词复数。", path: "all the ___ he faces -> difficulty -> difficulties" },
      { id: 3, needed: "noun", word: "back", rule: "keep", answer: "back", before: "on his", after: "walks into", formula: "物主代词后接名词；carry sb. on one's back。", path: "carries Zhong on his ___ -> back" },
      { id: 4, needed: "conj", word: "if", rule: "safe", answer: "if", before: "ask Zhong", after: "he wants", formula: "ask 后用 if 引导一般疑问意义的宾语从句。", path: "ask Zhong ___ he wants -> if" },
      { id: 5, needed: "num", word: "fourth", rule: "ordinal", answer: "fourth", before: "in the", after: "grade", formula: "年级前用序数词。", path: "in the ___ grade -> fourth" },
      { id: 6, needed: "adv", word: "anywhere", rule: "origin", answer: "anywhere", before: "with Zhong anytime", after: "at school", formula: "anytime anywhere 表示随时随地。", path: "anytime ___ at school -> anywhere" },
      { id: 7, needed: "det", word: "all", rule: "safe", answer: "all", before: "does well in", after: "his subjects", formula: "all 修饰复数名词 subjects。", path: "does well in ___ his subjects -> all" },
      { id: 8, needed: "pron", word: "us", rule: "obj", answer: "us", before: "makes", after: "better and better", formula: "make 后用宾格作宾语。", path: "makes ___ better -> we 的宾格 us" },
      { id: 9, needed: "verb", word: "teach", rule: "past", answer: "taught", before: "their story", after: "their classmates", formula: "said 提示过去时；teach 的过去式是 taught。", path: "their story ___ their classmates -> teach -> taught" },
      { id: 10, needed: "verb", word: "touched", rule: "pp", answer: "touched", before: "has also", after: "many people", formula: "has + 过去分词构成现在完成时。", path: "has also ___ many people -> touch -> touched" }
    ],
    passage: `Zhu Jinxiang has carried his disabled classmate Zhong Huaqiang for nearly 10 years. They are from Jiangxi Province {1} the southeast of China. Zhong can't walk and Zhu has helped him deal with all the {2} he faces at school.<br><br>Zhu carries Zhong on his {3}, walks into the classroom and puts him on his seat every day. The two boys sit next to each other. When he finishes class, Zhu will turn to ask Zhong at once {4} he wants to drink water or go to the bathroom.<br><br>Zhu and his friend Zhong began to study in the same class in the {5} grade in primary school. They have known each other and been friends. Zhu is always with Zhong anytime {6} at school.<br><br>With the help of Zhu, Zhong does well in {7} his subjects and helps Zhu with his studies. “We help each other. I get him through the little things in life and he supports me in the study. This makes {8} better and better,” Zhu said.<br><br>Their teacher, named Xiao, said that their story {9} their classmates how to help each other. The friendship between the two classmates has also {10} many people on the Internet to do amazing and kind things for their friends.`
  });

  const baoGongQuestion = makeQuestion({
    title: "包公巧断偷钱案",
    source: "2026乌鲁木齐七十中三模｜包公巧断偷钱案",
    words: [
      ["quietly", { adv: "quietly", adj: "quiet" }, "adv", ["adj"]],
      ["find", { verb: "find", past: "found", pp: "found", ing: "finding" }, "verb"],
      ["give", { verb: "give", past: "gave", pp: "given", ing: "giving" }, "verb"],
      ["what", { pron: "what" }, "pron"],
      ["real", { adj: "real", adv: "really" }, "adj", ["adv"]],
      ["think", { verb: "think", past: "thought", pp: "thought", ing: "thinking" }, "verb"],
      ["back", { adv: "back", noun: "back" }, "adv", ["noun"]],
      ["cry", { verb: "cry", past: "cried", pp: "cried", ing: "crying" }, "verb"],
      ["smart", { adj: "smart", compare: "smarter", super: "smartest" }, "adj"],
      ["full", { adj: "full" }, "adj"],
      ["woke", { verb: "wake", past: "woke", pp: "woken", ing: "waking" }, "verb"]
    ],
    items: [
      { id: 1, needed: "verb", word: "cry", rule: "ing", answer: "crying", before: "saw a boy", after: "on the street", formula: "see sb. doing sth. 表示看见某人正在做某事。", path: "saw a boy ___ -> see sb. doing -> cry -> crying" },
      { id: 2, needed: "pron", word: "what", rule: "subj", answer: "what", before: "asked the boy", after: "happened", formula: "what happened 表示发生了什么。", path: "asked the boy ___ happened -> what" },
      { id: 3, needed: "verb", word: "woke", rule: "past", answer: "woke", before: "when I", after: "up", formula: "wake up 固定搭配；故事用过去时。", path: "when I ___ up -> wake -> woke" },
      { id: 4, needed: "verb", word: "find", rule: "base", answer: "find", before: "couldn't", after: "my money", formula: "情态动词 couldn't 后接动词原形。", path: "couldn't ___ my money -> find" },
      { id: 5, needed: "verb", word: "think", rule: "past", answer: "thought", before: "and", after: "for some time", formula: "与 looked 并列，用一般过去时。", path: "looked... and ___ -> think -> thought" },
      { id: 6, needed: "verb", word: "give", rule: "base", answer: "give", before: "asked it to", after: "the boy's money back", formula: "ask sb. to do sth.；give back 表示归还。", path: "asked it to ___ ... back -> give" },
      { id: 7, needed: "adv", word: "quietly", rule: "origin", answer: "quietly", before: "laughed and said", after: "What is he doing", formula: "副词修饰动词 said。", path: "said ___ -> quietly" },
      { id: 8, needed: "adj", word: "smart", rule: "super", answer: "smartest", before: "the", after: "here", formula: "the 后结合范围 here 使用最高级。", path: "the ___ here -> smart 的最高级 -> smartest" },
      { id: 9, needed: "adj", word: "full", rule: "origin", answer: "full", before: "a large bowl", after: "of water", formula: "full of 是固定搭配。", path: "a bowl ___ of water -> full" },
      { id: 10, needed: "adj", word: "real", rule: "origin", answer: "real", before: "the", after: "thief", formula: "名词 thief 前填形容词。", path: "the ___ thief -> real" },
      { id: 11, needed: "adv", word: "back", rule: "origin", answer: "back", before: "got his money", after: "Everyone said", formula: "get sth. back 表示取回某物。", path: "got his money ___ -> back" }
    ],
    passage: `Bao Gong was a famous and smart official (官员) in ancient China. One day, he saw a boy {1} on the street. He asked the boy {2} happened.<br><br>“I sold meat this morning and got 100 coins. Then I had a short sleep. But when I {3} up, I couldn't {4} my money,” said the boy.<br><br>Bao Gong looked the boy up and down and {5} for some time. Then he pointed at a horse and said it was the thief. He shouted at the horse and asked it to {6} the boy's money back.<br><br>People around laughed and said {7}, “What is he doing? Shouldn't Bao Gong be the {8} here?” Bao Gong heard that and shouted, “How could you say bad words about an official? You are all fined (被罚款) one coin.” Then he took out a large bowl {9} of water and asked everyone to put a coin into it.<br><br>When one man put his into the bowl, Bao Gong said, “This is the {10} thief! When he put the coin into the bowl, there was a film of oil (一层油) on the water. All the boy's coins have oil from the meat on them.” At last the boy got his money {11}. Everyone said that Bao Gong was a really smart man.`
  });

  const dukuHighwayQuestion = makeQuestion({
    title: "英雄之路——独库公路",
    source: "2026兵团三模｜英雄之路——独库公路",
    words: [
      ["rainbow", { noun: "rainbow", nounPlural: "rainbows" }, "noun"],
      ["amazing", { adj: "amazing" }, "adj"],
      ["a", { det: "a" }, "det"],
      ["long", { adj: "long", compare: "longer", super: "longest" }, "adj"],
      ["turn", { noun: "turn", nounPlural: "turns", verb: "turn" }, "noun", ["verb"]],
      ["build", { verb: "build", past: "built", pp: "built", ing: "building" }, "verb"],
      ["over", { prep: "over", adv: "over" }, "prep", ["adv"]],
      ["and", { conj: "and" }, "conj"],
      ["enjoy", { verb: "enjoy", past: "enjoyed", pp: "enjoyed", ing: "enjoying" }, "verb"],
      ["picture", { noun: "picture", nounPlural: "pictures" }, "noun"],
      ["visit", { verb: "visit", past: "visited", pp: "visited", ing: "visiting" }, "verb"]
    ],
    items: [
      { id: 1, needed: "adj", word: "long", rule: "origin", answer: "long", before: "500 kilometers", after: "and runs", formula: "数字 + 长度单位 + long 表示长度。", path: "500 kilometers ___ -> long" },
      { id: 2, needed: "conj", word: "and", rule: "safe", answer: "and", before: "High mountains", after: "wide grasslands", formula: "and 连接两个并列名词短语。", path: "High mountains ___ wide grasslands -> and" },
      { id: 3, needed: "adj", word: "amazing", rule: "origin", answer: "amazing", before: "see", after: "snow-covered mountaintops", formula: "形容词修饰名词短语。", path: "see ___ snow-covered mountaintops -> amazing" },
      { id: 4, needed: "noun", word: "turn", rule: "keep", answer: "turn", before: "at every", after: "One of the best stops", formula: "every 后接可数名词单数。", path: "at every ___ -> turn" },
      { id: 5, needed: "noun", word: "picture", rule: "plural", answer: "pictures", before: "take", after: "Another place", formula: "take pictures 是固定搭配。", path: "take ___ -> picture -> pictures" },
      { id: 6, needed: "verb", word: "visit", rule: "base", answer: "visit", before: "must", after: "is the colorful Danxia", formula: "情态动词 must 后接动词原形。", path: "must ___ -> visit" },
      { id: 7, needed: "prep", word: "over", rule: "safe", answer: "over", before: "changing", after: "time", formula: "over time 表示随着时间推移。", path: "changing ___ time -> over" },
      { id: 8, needed: "noun", word: "rainbow", rule: "keep", answer: "rainbow", before: "like a", after: "That's why", formula: "不定冠词 a 后接单数名词。", path: "like a ___ -> rainbow" },
      { id: 9, needed: "det", word: "a", rule: "safe", answer: "a", before: "really", after: "great place", formula: "单数可数名词 place 前用不定冠词。", path: "really ___ great place -> a" },
      { id: 10, needed: "verb", word: "enjoy", rule: "base", answer: "enjoy", before: "when you", after: "the view", formula: "时间状语从句一般现在时，主语 you 用原形。", path: "when you ___ the view -> enjoy" },
      { id: 11, needed: "verb", word: "build", rule: "past", answer: "built", before: "soldiers who", after: "the road", formula: "修饰 soldiers 的定语从句描述过去建路，使用过去式。", path: "soldiers who ___ the road -> build -> built" }
    ],
    passage: `The Duku Highway is a famous road in Xinjiang. It is known for its beautiful views and exciting journey. It is over 500 kilometers {1} and runs from Dushanzi to Kuqa.<br><br>High mountains {2} wide grasslands are all around the highway. If you drive on this road, you will see {3} snow-covered mountaintops and green fields. You can see wonderful views at every {4}.<br><br>One of the best stops is the Tianshan Grand Canyon. It is a big canyon with red and yellow cliffs (悬崖). It is the perfect place to take {5}.<br><br>Another place you must {6} is the colorful Danxia landform (丹霞地貌). It is an area where the rocks and cliffs have been changing {7} time. The rocks are bright red, orange and yellow, like a {8}. That's why it is called “colorful Danxia”.<br><br>The Duku Highway is really {9} great place for nature lovers. However, when you {10} the view, do remember those soldiers who {11} the road for about 10 years, and 168 of them lost their lives. Therefore, this road is also known as the “Road of Heroes”.`
  });

  const heJiaolongQuestion = makeQuestion({
    title: "贺娇龙助农直播",
    source: "2026北屯中学二模｜贺娇龙助农直播",
    words: [
      ["help", { verb: "help", past: "helped", pp: "helped", ing: "helping" }, "verb"],
      ["video", { noun: "video", nounPlural: "videos" }, "noun"],
      ["report", { verb: "report", past: "reported", pp: "reported", ing: "reporting" }, "verb"],
      ["reach", { verb: "reach", past: "reached", pp: "reached", ing: "reaching" }, "verb"],
      ["on", { prep: "on" }, "prep"],
      ["connect", { verb: "connect", past: "connected", pp: "connected", ing: "connecting" }, "verb"],
      ["farm", { noun: "farm", nounPlural: "farmers", pluralPossessive: "farmers'", adj: "farming" }, "noun", ["adj"]],
      ["popular", { adj: "popular", adv: "popularly" }, "adj", ["adv"]],
      ["die", { verb: "die", past: "died", pp: "died", ing: "dying", noun: "death" }, "verb", ["noun"]],
      ["accept", { verb: "accept", past: "accepted", pp: "accepted", ing: "accepting" }, "verb"],
      ["produce", { verb: "produce", noun: "product", nounPlural: "products", past: "produced", pp: "produced", ing: "producing" }, "verb", ["noun"]]
    ],
    items: [
      { id: 1, needed: "verb", word: "connect", rule: "pp", answer: "connected", before: "closely", after: "with Xinjiang's development", formula: "be connected with 表示与……紧密相连。", path: "was closely ___ with -> connect -> connected" },
      { id: 2, needed: "noun", word: "farm", rule: "pluralPossessive", answer: "farmers'", before: "understood", after: "needs", formula: "复数名词所有格修饰 needs。", path: "understood ___ needs -> farm 变复数 farmers，再加所有格符号 -> farmers'" },
      { id: 3, needed: "adj", word: "popular", rule: "origin", answer: "popular", before: "became surprisingly", after: "online", formula: "系动词 became 后接形容词。", path: "became surprisingly ___ -> popular" },
      { id: 4, needed: "noun", word: "video", rule: "plural", answer: "videos", before: "made many", after: "to help", formula: "many 后接可数名词复数。", path: "made many ___ -> video -> videos" },
      { id: 5, needed: "verb", word: "report", rule: "pp", answer: "reported", before: "It was", after: "that", formula: "It was reported that... 固定被动句型。", path: "It was ___ that -> report -> reported" },
      { id: 6, needed: "verb", word: "reach", rule: "pp", answer: "reached", before: "had", after: "14 million yuan", formula: "had + 过去分词构成过去完成时。", path: "had ___ 14 million yuan -> reach -> reached" },
      { id: 7, needed: "noun", word: "produce", rule: "toNounPlural", answer: "products", before: "Xinjiang's farm", after: "and she focused", formula: "farm products 表示农产品，结合品牌下多种产品用复数。", path: "farm ___ -> produce 变名词复数 -> products" },
      { id: 8, needed: "prep", word: "on", rule: "safe", answer: "on", before: "focused most of her work", after: "it", formula: "focus...on... 是固定搭配。", path: "focused... ___ it -> on" },
      { id: 9, needed: "noun", word: "die", rule: "toNoun", answer: "death", before: "before her", after: "she had actively helped", formula: "物主代词 her 后接名词。", path: "before her ___ -> die 变名词 death" },
      { id: 10, needed: "verb", word: "help", rule: "ing", answer: "helping", before: "kept on", after: "farmers sell products", formula: "keep on doing sth.。", path: "kept on ___ farmers -> help -> helping" },
      { id: 11, needed: "verb", word: "accept", rule: "past", answer: "accepted", before: "never", after: "any payment", formula: "通篇过去时，谓语使用过去式。", path: "never ___ any payment -> accept -> accepted" }
    ],
    passage: `He Jiaolong (贺娇龙), a government official-turned social media influencer based in Northwest China's Xinjiang Uygur autonomous region (自治区), died in an accident at the age of 47, as reported by Xinjiang Daily. Her life was closely {1} with Xinjiang's development, and she was highly praised by many people.<br><br>She had worked in towns for 18 years, so she understood {2} needs very well. In 2020, when she served as the deputy (副职) head of Zhaosu County, she wanted to help local farmers sell more products. To achieve this goal, she made use of social media to do live-streaming (直播). That November, a video of her riding quickly across snowy fields in a red coat became surprisingly {3} online, getting billions of views. By the time of her passing, she had gained nearly 6.5 million followers. Besides, she made many {4} to help more people know about local tourism.<br><br>It was {5} that by November 30, 2020, the sales of local farm products through her live-streaming had {6} 14 million yuan in five months. In 2024, her live-streaming team helped sell 240 million yuan worth of products under the “Taste Xinjiang” brand. This brand is a public brand for Xinjiang's farm {7}, and she focused most of her work {8} it. At a meeting on local farm brands, she said that in the past three years, the “Taste Xinjiang” brand had achieved direct and indirect sales of more than 20 billion yuan.<br><br>In recent years before her {9}, she had actively helped develop Xinjiang's culture and tourism. She also kept on {10} farmers sell products through live-streaming, but she never {11} any payment for these efforts. Her hard work earned her praise from both local and national levels.`
  });

  const teenagerIndependenceQuestion = makeQuestion({
    title: "青少年工作后是否应搬出去住",
    source: "2026喀什莎车模拟预测｜青少年独立生活",
    words: [
      ["old", { adj: "old", compare: "older", super: "oldest" }, "adj"],
      ["educate", { verb: "educate", past: "educated", pp: "educated", ing: "educating" }, "verb"],
      ["after", { prep: "after", conj: "after" }, "prep", ["conj"]],
      ["opinion", { noun: "opinion", nounPlural: "opinions" }, "noun"],
      ["it", { pron: "it", obj: "it", possAdj: "its", possNoun: "its", reflexive: "itself" }, "pron"],
      ["move", { verb: "move", past: "moved", pp: "moved", ing: "moving" }, "verb"],
      ["eighteen", { num: "eighteen", ordinal: "eighteenth" }, "num"],
      ["however", { adv: "however", sentence: "However" }, "adv"],
      ["manage", { verb: "manage", past: "managed", pp: "managed", ing: "managing" }, "verb"],
      ["look", { verb: "look", past: "looked", pp: "looked", ing: "looking" }, "verb"],
      ["believe", { verb: "believe", past: "believed", pp: "believed", ing: "believing" }, "verb"]
    ],
    items: [
      { id: 1, needed: "verb", word: "move", rule: "base", answer: "move", before: "asked to", after: "out", formula: "ask sb. to do sth.；move out 表示搬出去。", path: "asked to ___ out -> move" },
      { id: 2, needed: "noun", word: "opinion", rule: "plural", answer: "opinions", before: "different", after: "In many Western countries", formula: "different 后接可数名词复数。", path: "different ___ -> opinion -> opinions" },
      { id: 3, needed: "num", word: "eighteen", rule: "cardinal", answer: "eighteen", before: "at the age of", after: "Parents", formula: "at the age of 后接基数词。", path: "at the age of ___ -> eighteen" },
      { id: 4, needed: "verb", word: "believe", rule: "base", answer: "believe", before: "Parents", after: "that", formula: "复数主语 Parents 后用动词原形。", path: "Parents ___ that -> believe" },
      { id: 5, needed: "verb", word: "educate", rule: "pp", answer: "educated", before: "should be", after: "to care for themselves", formula: "should be + 过去分词构成被动语态。", path: "should be ___ -> educate -> educated" },
      { id: 6, needed: "verb", word: "manage", rule: "base", answer: "manage", before: "they can", after: "their own lives", formula: "情态动词 can 后接原形；manage one's life。", path: "can ___ their own lives -> manage" },
      { id: 7, needed: "adv", word: "however", rule: "origin", answer: "however", before: "In most Asian societies", after: "it is not common", formula: "前后文化观念形成转折，用 however。", path: "In most Asian societies, ___, it is not common -> however" },
      { id: 8, needed: "pron", word: "it", rule: "subj", answer: "it", before: "believe that", after: "is better", formula: "it 作形式主语，真正主语为后面的不定式。", path: "believe that ___ is better to live... -> it" },
      { id: 9, needed: "verb", word: "look", rule: "base", answer: "look", before: "should then", after: "after their parents", formula: "should 后接原形；look after 表示照顾。", path: "should then ___ after -> look" },
      { id: 10, needed: "adj", word: "old", rule: "compare", answer: "older", before: "when they get", after: "That is why", formula: "get 后接形容词；语境表示父母年纪更大。", path: "when they get ___ -> old 的比较级 older" },
      { id: 11, needed: "conj", word: "after", rule: "safe", answer: "after", before: "even", after: "they get married", formula: "after 引导时间状语从句。", path: "even ___ they get married -> after" }
    ],
    passage: `Should teenagers be asked to {1} out when they start working? People in different countries have different {2}.<br><br>In many Western countries, teenagers are allowed to move out at the age of {3}. Parents {4} that they should be {5} to care for themselves from an early age. In this way, when they start working, they can {6} their own lives. In most Asian societies, {7}, it is not common for teenagers to move out. Chinese parents believe that {8} is better for children to live with parents who can take care of them. But the young should then {9} after their parents when they get {10}. That is why many Chinese adults continue to live with their parents, even {11} they get married.`
  });

  window.WORD_CHOICE_IMPORTED_20260829 = {
    motherLoveNotes: motherLoveNotesQuestion,
    zhangJunli: zhangJunliQuestion,
    weightClinics: weightClinicsQuestion,
    yueYangzi: yueYangziQuestion,
    classmateHelp: classmateHelpQuestion,
    baoGong: baoGongQuestion,
    dukuHighway: dukuHighwayQuestion,
    heJiaolong: heJiaolongQuestion,
    teenagerIndependence: teenagerIndependenceQuestion
  };
})();
