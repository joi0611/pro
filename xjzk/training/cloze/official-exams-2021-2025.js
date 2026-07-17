(function () {
  function oq(id, options, answer, pos, category, clues, explanation, collocation = "无", collocationType = "无", collocationBreakdown = "无") {
    return { id, options, answer, pos, category, clues, explanation, collocation, collocationType, collocationBreakdown };
  }

  const source = (year) => `${year}年 · 新疆维吾尔自治区、新疆生产建设兵团 · 初中学业水平考试英语真题`;

  const exam2025 = {
    id: "xinjiang-official-2025-cloze",
    title: "一句 Hello 带来的温暖",
    englishTitle: "A Simple Hello Brings Warmth",
    level: "中考真题",
    difficulty: "中等",
    source: source(2025),
    tags: ["中考真题", "成长变化", "上下文复现", "逻辑推理"],
    available: true,
    firstSentence: "Bill used to live in a big city.",
    lastSentence: "Sometimes just a simple 'Hello!' can bring sunshine and warmth into a lonely heart.",
    tone: "转折变化",
    toneReason: "Bill起初因搬到小镇而孤独沉默，后来在大家一次次友好问候中融入新生活，重新露出笑容。",
    passage: [
      "Bill used to live in a big city. He was born there and made friends there. Life always seemed to be ", { blank: 1 }, " for him. Last year, Bill's family had to move to a small town. His life ", { blank: 2 }, " all of a sudden. He felt lonely and ", { blank: 3 }, ". On Bill's ", { blank: 4 }, " day to school in the town, the driver said a friendly 'Hello!' to the lonely boy when he got on the bus. He just ", { blank: 5 }, " with a nod in silence because of shyness. While Bill was looking for a ", { blank: 6 }, ", everyone on the bus said 'Hello!' ", { blank: 7 }, " a gentle voice to him. But nodding was Bill's only reply. The next day Bill got on and ", { blank: 8 }, " the driver said 'Hello!' kindly to him. Bill still kept ", { blank: 9 }, ". On the fifth day, Bill answered with a shy 'Hello!' to everybody. He felt he was ", { blank: 10 }, " of them. And he began to talk to them like old friends. That moment, it seemed that the new world opened ", { blank: 11 }, " door to him. As days went by, Bill got used to the ", { blank: 12 }, " there. He made ", { blank: 13 }, " friends in the town. Everybody knew him as ", { blank: 14 }, " as he knew them. Life was colorful like before. Smiles appeared on Bill's face again. Sometimes ", { blank: 15 }, " a simple 'Hello!' can bring sunshine and warmth into a lonely heart."
    ],
    questions: [
      oq(1, ["busy", "happy", "boring"], "happy", "形容词副词", "情感态度 / 上下文复现", ["made friends there", "colorful like before"], "大城市里有朋友，结尾又说生活恢复得像以前一样多彩，说明原来的生活很快乐。"),
      oq(2, ["changed", "remained", "exchanged"], "changed", "动词", "逻辑推理", ["had to move", "all of a sudden"], "搬到小镇后生活突然发生变化，changed符合动作结果。"),
      oq(3, ["excited", "sad", "pleasant"], "sad", "形容词副词", "情感态度", ["lonely"], "and连接情绪一致的词，lonely是消极情绪，因此选sad。"),
      oq(4, ["last", "best", "first"], "first", "形容词副词", "上下文复现 / 时间线索", ["The next day", "On the fifth day"], "后文按第二天、第五天推进，说明这里是第一天。"),
      oq(5, ["joked", "asked", "replied"], "replied", "动词", "动作逻辑", ["with a nod", "only reply"], "点头是在回应问候，下文only reply也直接复现reply。"),
      oq(6, ["window", "bag", "seat"], "seat", "名词", "常识推断", ["on the bus", "looking for"], "上车后通常寻找座位，seat符合公交车场景。"),
      oq(7, ["in", "at", "on"], "in", "介词搭配", "固定搭配 / 语法", ["a gentle voice"], "in a ... voice表示“用……的声音”。", "in a ... voice", "介词短语", "介词(in) + 冠词(a) + 形容词 + 名词(voice)"),
      oq(8, ["suddenly", "again", "angrily"], "again", "形容词副词", "上下文复现", ["The next day", "said 'Hello!'"], "司机第二天再次问候，again表示重复发生。"),
      oq(9, ["silent", "noisy", "hungry"], "silent", "形容词副词", "上下文复现 / 情感态度", ["with a nod in silence", "shyness"], "前文in silence说明Bill仍然沉默，keep silent表示“保持沉默”。", "keep silent", "动词短语", "动词(keep) + 形容词(silent)"),
      oq(10, ["all", "none", "one"], "one", "代词", "逻辑推理", ["talk to them like old friends"], "他开始像老朋友一样和大家交谈，说明他觉得自己是他们中的一员，one of them。", "one of them", "代词结构", "代词(one) + 介词(of) + 宾格代词(them)"),
      oq(11, ["its", "your", "her"], "its", "代词", "语法 / 指代", ["the new world"], "door属于前面的the new world，用物主代词its。"),
      oq(12, ["work", "life", "weather"], "life", "名词", "上下文复现", ["Life was colorful like before"], "全文围绕Bill在小镇的新生活展开，下文Life直接复现。"),
      oq(13, ["worse", "fewer", "more"], "more", "形容词副词", "逻辑推理", ["talk to them like old friends", "knew him"], "Bill逐渐融入小镇并认识更多朋友，more符合积极变化。"),
      oq(14, ["well", "little", "fast"], "well", "形容词副词", "固定搭配 / 逻辑推理", ["as he knew them"], "as well as构成同级比较，表示大家了解他，正如他了解大家。", "as well as", "固定结构", "as + 副词(well) + as"),
      oq(15, ["just", "nearly", "almost"], "just", "形容词副词", "主旨升华 / 语境推理", ["a simple 'Hello!'", "sunshine and warmth"], "just表示“仅仅、只是”，突出一个简单问候也能带来温暖。")
    ],
    verifySentences: []
  };

  const exam2024 = {
    id: "xinjiang-official-2024-cloze",
    title: "琳达的爱心便条",
    englishTitle: "Linda's Love Notes",
    level: "中考真题",
    difficulty: "中等",
    source: source(2024),
    tags: ["中考真题", "家庭温情", "上下文复现", "固定搭配"],
    available: true,
    firstSentence: "My daughter Linda is kind.",
    lastSentence: "They are the warmest gifts in the world.",
    tone: "积极",
    toneReason: "全文围绕Linda用爱心便条鼓励和感谢家人展开，结尾将便条升华为世界上最温暖的礼物。",
    passage: [
      "My daughter Linda is kind. She always writes love notes as gifts to warm ", { blank: 1 }, ". Her brother Stephen ", { blank: 2 }, " a basketball game. She wrote a note to tell him he was the best player in the world ", { blank: 3 }, " he didn't win the game. After work, I often got her thank-you note with ", { blank: 4 }, " face for my efforts. We were used to receiving Linda's love notes and always put them up on the fridge. But one day I ", { blank: 5 }, " found there was no one for Linda. At that time, my eyes filled ", { blank: 6 }, " tears. My husband asked me ", { blank: 7 }, " was wrong. I pointed at the notes on the fridge. Though I said ", { blank: 8 }, ", he knew exactly what I was trying to tell him. Weeks ", { blank: 9 }, " I could see the notes for Linda on the fridge. In return, she wrote more notes to show her love. Linda has ", { blank: 10 }, ". She has her own family and children. But some things about her have ", { blank: 11 }, " changed. One afternoon, I got another love note ", { blank: 12 }, " her. 'Thanks for always being there for me, Mom. I am ", { blank: 13 }, " to have you as family.' It reminded me of all her love ", { blank: 14 }, ". They are the warmest ", { blank: 15 }, " in the world."
    ],
    questions: [
      oq(1, ["others", "herself", "him"], "others", "代词", "逻辑推理", ["kind", "as gifts"], "Linda写便条温暖家人和其他人，others泛指其他人。"),
      oq(2, ["got", "lost", "won"], "lost", "动词", "上下文复现", ["didn't win"], "下文didn't win直接说明Stephen输掉了比赛。", "lose a game", "动词搭配", "动词(lose) + 名词(a game)"),
      oq(3, ["although", "or", "and"], "although", "连词逻辑", "转折关系", ["the best player", "didn't win"], "“最棒的球员”和“没有获胜”构成让步关系，用although。"),
      oq(4, ["crying", "sleeping", "smiling"], "smiling", "形容词副词", "情感态度", ["thank-you note"], "感谢便条带来积极情绪，应是smiling face；本题依靠语境中的积极态度判断，不作为固定搭配收录。"),
      oq(5, ["politely", "suddenly", "deeply"], "suddenly", "形容词副词", "逻辑推理", ["But one day", "found"], "习惯收到便条后突然发现没有给Linda的，suddenly符合转折。"),
      oq(6, ["to", "of", "with"], "with", "介词搭配", "固定搭配", ["tears"], "fill with表示“充满”，此处是眼里充满泪水。", "fill... with...", "动词短语", "动词(fill) + 介词(with)"),
      oq(7, ["what", "which", "who"], "what", "代词", "固定搭配 / 语法", ["was wrong"], "what's wrong表示“怎么了”。", "what is wrong", "固定句型", "疑问代词(what) + be + 形容词(wrong)"),
      oq(8, ["everything", "nothing", "something"], "nothing", "代词", "逻辑推理", ["Though I said", "he knew"], "though构成转折：虽然什么也没说，丈夫却明白了。"),
      oq(9, ["later", "before", "ago"], "later", "形容词副词", "时间线索", ["Weeks", "could see"], "weeks later表示“几周后”。", "weeks later", "时间短语", "时间段(weeks) + 副词(later)"),
      oq(10, ["made up", "given up", "grown up"], "grown up", "动词短语", "上下文复现 / 固定搭配", ["her own family and children"], "有了自己的家庭和孩子，说明Linda已经长大，grow up表示“长大”。", "grow up", "动词短语", "动词(grow) + 副词(up)"),
      oq(11, ["always", "never", "often"], "never", "形容词副词", "转折关系", ["But", "another love note"], "Linda长大后仍写爱心便条，说明这一点从未改变。"),
      oq(12, ["at", "in", "from"], "from", "介词搭配", "语法 / 介词辨析", ["got another love note", "her"], "便条来自Linda，表示来源用from。"),
      oq(13, ["happy", "unhappy", "lonely"], "happy", "形容词副词", "情感态度", ["Thanks", "have you as family"], "感谢母亲一直陪伴，情绪积极，应选happy。"),
      oq(14, ["books", "notes", "lessons"], "notes", "名词", "上下文复现", ["another love note", "all her love"], "全文核心词是love notes，此处原词复现。"),
      oq(15, ["gifts", "fridges", "games"], "gifts", "名词", "首尾呼应", ["writes love notes as gifts"], "首段将便条称为gifts，结尾再次呼应。")
    ],
    verifySentences: []
  };

  const exam2023 = {
    id: "xinjiang-official-2023-cloze",
    title: "随手捡起垃圾，世界因此不同",
    englishTitle: "Small Acts Make a Difference",
    level: "中考真题",
    difficulty: "中等",
    source: source(2023),
    tags: ["中考真题", "志愿服务", "环境保护", "上下文复现"],
    available: true,
    firstSentence: "It was a summer noon.",
    lastSentence: "Our small act of being kind can make this colorful world even better.",
    tone: "积极",
    toneReason: "作者由志愿者捡垃圾想起自己的善举，并得出每一个善意小行动都能让世界更美好的结论。",
    passage: [
      "It was a summer noon. As I drove along the road in a mountain, I could see some pretty wildflowers. When I turned the corner and saw some ", { blank: 16 }, " picking up litter on the roadside, I stopped ", { blank: 17 }, " and smiled at them. They volunteered here on such a hot day. How helpful they were! I ", { blank: 18 }, " a spring day long ago. When my children were younger, we often took a walk around the lake near our home. One ", { blank: 19 }, " day, we noticed much litter lying there. The next day, we brought a big litter bag and started to pick up the litter along our way. ", { blank: 20 }, ", the bag was nearly full. Tired but ", { blank: 21 }, ", we put the bag in an empty bin. We ", { blank: 22 }, " before we went home and took one last look at the lake as the sun set. It looked more beautiful than ever. I know this world's problems sometimes seem ", { blank: 23 }, ", but how can we solve them? The ", { blank: 24 }, " is that everything we do kindly can make a difference. Every time we pick up a piece of litter, we make a difference. Every smile we share makes a difference. Our small act of being ", { blank: 25 }, " can make this colorful world even better."
    ],
    questions: [
      oq(16, ["children", "drivers", "volunteers", "policemen"], "volunteers", "名词", "下文复现", ["They volunteered here"], "下句volunteered直接锁定volunteers。"),
      oq(17, ["driving", "walking", "running", "riding"], "driving", "动名词", "上下文复现 / 固定搭配", ["As I drove", "stopped"], "前文As I drove说明作者在开车；stop doing表示停止正在做的事。", "stop doing sth.", "固定句型", "动词(stop) + 动名词(doing)"),
      oq(18, ["talked about", "wrote down", "looked for", "thought of"], "thought of", "动词短语", "逻辑推理 / 固定搭配", ["a spring day long ago"], "眼前的志愿行动让作者想起往事，think of表示“想起”。", "think of", "动词短语", "动词(think) + 介词(of)"),
      oq(19, ["autumn", "winter", "spring", "summer"], "spring", "名词", "上文复现", ["a spring day long ago"], "上一段末尾已经明确是a spring day。"),
      oq(20, ["Normally", "Finally", "Suddenly", "Actually"], "Finally", "形容词副词", "动作连贯", ["started to pick up", "nearly full"], "从开始捡到袋子接近装满是过程结果，用Finally。"),
      oq(21, ["surprised", "excited", "bored", "worried"], "excited", "形容词副词", "转折关系 / 情感态度", ["Tired but", "more beautiful"], "but连接相反状态，虽然累但看到环境变美而兴奋。"),
      oq(22, ["stopped", "danced", "waited", "moved"], "stopped", "动词", "动作逻辑", ["took one last look"], "回家前停下来最后看一眼湖面，stopped符合动作。"),
      oq(23, ["useful", "simple", "hard", "possible"], "hard", "形容词副词", "逻辑推理", ["problems", "how can we solve"], "问题看起来困难，才会继续追问如何解决。"),
      oq(24, ["story", "truth", "news", "class"], "truth", "名词", "主旨升华", ["everything we do kindly", "make a difference"], "后面总结的是一个道理和事实，用truth。"),
      oq(25, ["busy", "polite", "lazy", "kind"], "kind", "形容词副词", "上下文复现 / 主旨升华", ["do kindly", "small act"], "上一句kindly与kind构成同根复现，且呼应善意行动。")
    ],
    verifySentences: []
  };

  const exam2022 = {
    id: "xinjiang-official-2022-cloze",
    title: "风筝线的启示",
    englishTitle: "The Lesson of the Kite String",
    level: "中考真题",
    difficulty: "中等",
    source: source(2022),
    tags: ["中考真题", "生活哲理", "逻辑推理", "固定搭配"],
    available: true,
    firstSentence: "A father and his son were happy when they saw flowers everywhere and the sky full of colorful kites of all kinds.",
    lastSentence: "But in fact, these might be the things that support us the most.",
    tone: "转折变化",
    toneReason: "男孩先以为剪断风筝线能飞得更高，风筝坠落后才明白看似束缚的东西也可能正给予支持。",
    passage: [
      "A father and his son were happy when they saw flowers everywhere and the sky full of colorful kites of all kinds. It was the ", { blank: 32 }, " Festival in Weifang, Shandong. The son wanted to fly a kite, too. The father bought a kite for him. The son began to fly the kite. Soon, his kite was high up in the sky. After a while, the son said, 'Father, it seems that the string is ", { blank: 33 }, " the kite from flying higher. If we cut it, it will be free and fly even ", { blank: 34 }, ". Can we cut it?' The father cut the string off. The kite started to go higher. This made the little boy ", { blank: 35 }, ". But then, slowly, the boy saw that the kite began to ", { blank: 36 }, ". It soon fell to the ground. The son was surprised to see this. He asked his father, 'I thought that ", { blank: 37 }, " cutting the string, the kite would fly higher. ", { blank: 38 }, " did it fall down?' The father explained, 'The string was not stopping the kite from going higher, but was helping it ", { blank: 39 }, " in the sky. Using the string, you helped the kite go up in the right direction. But when you cut the ", { blank: 40 }, ", it could no longer support the kite.' We may sometimes feel like there are certain things that are holding us back and stopping us from growing. But ", { blank: 41 }, ", these might be the things that support us the most."
    ],
    questions: [
      oq(32, ["Kite", "Water", "Lantern", "Spring"], "Kite", "名词", "常识 / 上下文复现", ["colorful kites", "Weifang"], "潍坊以国际风筝节闻名，且上文反复出现kites。"),
      oq(33, ["dropping", "having", "stopping", "catching"], "stopping", "动名词", "固定搭配 / 逻辑推理", ["from flying higher"], "stop sb./sth. from doing sth.表示“阻止……做某事”。", "stop sth. from doing sth.", "固定句型", "stop + 宾语 + from + doing"),
      oq(34, ["higher", "shorter", "slower", "quicker"], "higher", "形容词副词", "上下文复现 / 语法", ["flying higher", "even"], "前句higher原词复现；even修饰比较级。"),
      oq(35, ["excited", "bored", "worried", "scared"], "excited", "形容词副词", "情感态度", ["started to go higher"], "风筝剪线后继续升高，男孩当时应感到兴奋。"),
      oq(36, ["run away", "go up", "come true", "fall down"], "fall down", "动词短语", "下文复现 / 固定搭配", ["fell to the ground"], "下句fell to the ground说明风筝开始掉落，fall down表示“落下”。", "fall down", "动词短语", "动词(fall) + 副词(down)"),
      oq(37, ["before", "after", "so", "since"], "after", "介词", "时间逻辑", ["cutting the string", "would fly higher"], "男孩原以为剪断线以后风筝会飞得更高。"),
      oq(38, ["Who", "When", "Why", "Where"], "Why", "代词", "因果逻辑", ["I thought", "fall down"], "结果与预期相反，男孩询问坠落的原因，用Why。"),
      oq(39, ["jump", "stay", "get", "make"], "stay", "动词", "逻辑推理", ["in the sky", "support"], "风筝线帮助风筝停留在空中，stay符合语义。"),
      oq(40, ["paper", "tree", "grass", "string"], "string", "名词", "上下文复现", ["cut the string off", "Using the string"], "前文多次出现string，属于原词复现。"),
      oq(41, ["in total", "in fact", "by the way", "what's more"], "in fact", "固定搭配", "转折关系 / 固定搭配", ["holding us back", "support us"], "表面看似阻碍，事实上却在支持，in fact用于揭示真实情况。", "in fact", "固定短语", "介词(in) + 名词(fact)" )
    ],
    verifySentences: []
  };

  const exam2021 = {
    id: "xinjiang-official-2021-cloze",
    title: "陌生人的善意与弟弟",
    englishTitle: "A Stranger's Kindness",
    level: "中考真题",
    difficulty: "中等",
    source: source(2021),
    tags: ["中考真题", "兄弟亲情", "陌生人善意", "主旨升华"],
    available: true,
    firstSentence: "When I was ten, my mother worked all day, so I had to take care of my younger brother.",
    lastSentence: "I do not even remember what they looked like, but they taught me a lesson—people are more important than things.",
    tone: "积极",
    toneReason: "作者照顾弟弟时得到陌生人帮助，并由此懂得人与关爱比物品更重要。",
    passage: [
      "When I was ten, my mother worked all day, so I had to take care of my younger brother. At that time, my little brother was about four years old and he ", { blank: 36 }, " mum all the time. One day, after I had given him his dinner, he started crying for mum. He was so young and really needed mum. So I dressed him, ", { blank: 37 }, " his shoes, carried him on my back and walked out. Soon he fell asleep. About half an hour later, I found that he lost a shoe while he was ", { blank: 38 }, ". I took him off my back and put him ", { blank: 39 }, ". I knew we needed to find that shoe, for our mother couldn't afford to buy new shoes. I had to go back to ", { blank: 40 }, " it, so I told my brother to wait right there. A man heard it and stopped me just ", { blank: 41 }, " I went away. He asked me, 'You are leaving your brother here to find the shoe? What will you do if he is not here when you return?' I didn't know ", { blank: 42 }, " to answer that question. He continued, 'It's OK if you can't find the shoe, but it is not OK to lose your ", { blank: 43 }, ".' Then he sent us to mum's workplace by taxi. During my whole life I have received the ", { blank: 44 }, " from many strangers. I feel sorry that I can't find them and say '", { blank: 45 }, "'. I do not even remember what they looked like, but they taught me a lesson—people are more important than things."
    ],
    questions: [
      oq(36, ["felt", "missed", "cried", "shouted"], "missed", "动词", "上下文复现 / 情感态度", ["crying for mum", "needed mum"], "弟弟一直想念妈妈，后文哭着找妈妈并说需要妈妈。"),
      oq(37, ["tried", "had", "dressed up", "put on"], "put on", "动词短语", "固定搭配 / 动作连贯", ["his shoes", "carried him"], "put on his shoes表示“给他穿上鞋”。", "put on", "动词短语", "动词(put) + 副词(on)"),
      oq(38, ["running", "walking", "sleeping", "playing"], "sleeping", "动名词", "上文复现", ["Soon he fell asleep"], "上句明确弟弟很快睡着，因此丢鞋时正在睡觉。"),
      oq(39, ["up", "on", "down", "in"], "down", "介词搭配", "固定搭配 / 动作逻辑", ["took him off my back"], "把弟弟从背上放下来，用put him down。", "put sb. down", "动词短语", "动词(put) + 某人(sb.) + 副词(down)"),
      oq(40, ["find", "see", "watch", "buy"], "find", "动词", "上下文复现", ["needed to find", "couldn't afford"], "前句needed to find that shoe直接复现find。"),
      oq(41, ["after", "until", "during", "before"], "before", "连词逻辑", "时间逻辑", ["stopped me", "went away"], "男人在作者离开之前拦住了他，用before。"),
      oq(42, ["how", "what", "which", "where"], "how", "代词", "固定搭配 / 语法", ["to answer"], "how to answer表示“如何回答”。", "how to do sth.", "固定结构", "疑问副词(how) + 不定式(to do)"),
      oq(43, ["mother", "father", "brother", "sister"], "brother", "名词", "逻辑推理 / 主旨升华", ["leaving your brother", "people are more important"], "陌生人提醒作者不能为了鞋子把弟弟弄丢。"),
      oq(44, ["happiness", "kindness", "sadness", "rudeness"], "kindness", "名词", "主旨概括", ["sent us", "many strangers"], "陌生人帮助作者，作者一生中还收到许多陌生人的善意。"),
      oq(45, ["Thank you", "Never mind", "No way", "Congratulations"], "Thank you", "固定搭配", "情感态度 / 交际用语", ["received the kindness", "feel sorry"], "得到帮助后想向陌生人表达感谢，应说Thank you。", "say thank you", "交际表达", "动词(say) + 感谢语(thank you)" )
    ],
    verifySentences: []
  };

  window.officialClozeLessons = [exam2025, exam2024, exam2023, exam2022, exam2021];
})();
