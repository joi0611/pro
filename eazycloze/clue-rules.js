/* ============================================================
 * 线索规则库（数据层，可独立维护）
 * ------------------------------------------------------------
 * 依据：《（学用/教用）完形填空@小红书英语教学百宝袋 25.12.6》
 *   （一）解题图解：完形填空 = 语境线索题 + 词汇应用题
 *        语境线索题 → 技巧1 逻辑线索（并列转折判逻辑）
 *                     技巧2 复现线索（关联词汇找复现）
 *                     技巧3 情感线索（形副词动判情感）
 *        词汇应用题 → 技巧4 固定搭配（常考搭配分类记）
 *                     技巧5 一词多义（熟词生义语境记）
 *
 * 本文件只放「规则与词表」，判定算法在下方 CLOZE_CLUE_API。
 * 老师可以直接编辑本文件扩充词表，无需改动 app.js，无需联网。
 *
 * 1) CLOZE_LOGIC_WORDS    —— 逻辑线索 7 类逻辑词（常考 / 其他）
 * 2) CLOZE_REPETITION     —— 复现线索 5 类的说明与判据
 * 3) CLOZE_SYNONYMS       —— 近义词对（复现线索用）
 * 4) CLOZE_ANTONYMS       —— 反义词对（复现线索用）
 * 5) CLOZE_HYPERNYMS      —— 上下义词（复现线索用）
 * 6) CLOZE_EMOTION_WORDS  —— 情感线索三档词表（形副 + 动词）
 * 7) CLOZE_TURN_WORDS     —— 转折判定词（「无转折则情感一致」原则用）
 * 8) CLOZE_SENSE_SHIFT    —— 熟词生义表（技巧5）
 * 9) CLOZE_PHRASE_BANK    —— 讲义固定搭配词库（技巧4，供词典补充）
 * 10) CLOZE_CLUE_API      —— 判定 API（逻辑/复现/情感/搭配/生义 归因）
 * ============================================================ */

(function (root) {
  "use strict";

  /* ============================================================
   * 1. 逻辑线索（技巧1）
   *    cat：类别；zh：用法说明；main：常考逻辑词；other：其他逻辑词
   * ============================================================ */
  root.CLOZE_LOGIC_WORDS = [
    {
      cat: "并列",
      zh: "前后表意一致或属性一致",
      main: ["and", "or"],
      other: ["both ... and ...", "either ... or ...", "not only ... but also ...", "as well as", "neither ... nor ..."]
    },
    {
      cat: "转折",
      zh: "前后表意相反或表示对比",
      main: ["but", "however"],
      other: ["yet", "instead", "instead of"]
    },
    {
      cat: "条件",
      zh: "如果条件满足（或不满足），那么就会产生一定结果",
      main: ["if"],
      other: ["unless", "as long as"]
    },
    {
      cat: "因果",
      zh: "前后内容有因果关系",
      main: ["because", "so"],
      other: ["for", "since", "as", "because of", "as a result", "therefore"]
    },
    {
      cat: "让步",
      zh: "尽管前面的条件存在，但是后面的结果仍会发生",
      main: ["although"],
      other: ["though", "even if", "even though"]
    },
    {
      cat: "时间",
      zh: "前后内容有时间上的联系",
      main: ["when"],
      other: ["until", "since", "as soon as"]
    },
    {
      cat: "举例",
      zh: "空后内容是空前内容的举例说明",
      main: ["for example"],
      other: ["such as", "including", "like"]
    }
  ];

  /* 篇章顺序信号词：讲义未单列，但同属「时间」逻辑的延伸，定调用得上 */
  root.CLOZE_ORDER_WORDS = [
    "at first", "first", "firstly", "then", "next", "later", "after that", "afterwards",
    "finally", "at last", "in the end", "meanwhile", "suddenly", "soon",
    "from then on", "from now on", "one day", "luckily", "unluckily",
    "fortunately", "unfortunately", "actually", "in fact", "as a result"
  ];

  /* ============================================================
   * 2. 复现线索（技巧2）
   *    词汇复现：某一词通过原词 / 近义词 / 反义词 / 上下义词 / 派生词
   *    等形式重复出现在语篇中，使句子通过复现关系得以衔接。
   *    strength：线索强度（强 > 中 > 弱），用于给线索排序
   * ============================================================ */
  root.CLOZE_REPETITION = [
    { cat: "原词复现",   zh: "同一个词（含单复数 / 词形变化）再次出现",       strength: 3, demo: "surprise → surprise；history → history" },
    { cat: "派生词复现", zh: "同一词根派生出的不同词性",                     strength: 3, demo: "sing → singer；help → helper；agree → agreement" },
    { cat: "近义词复现", zh: "语篇中的一个词与选项构成近义关系",             strength: 2, demo: "store → shop；gift → present；on foot → walked" },
    { cat: "反义词复现", zh: "语篇中的一个词与选项构成反义关系",             strength: 2, demo: "hot → cold；remember → forget；kind → unkind" },
    { cat: "上下义词复现", zh: "语篇用上位词概括，选项是下位词（或反之）",   strength: 1, demo: "food → meat；fruit → apple；animal → tiger" },
    { cat: "同场复现",   zh: "语篇词与选项同属一个语义场（抽象概念整场同现）", strength: 2, demo: "difficult ↔ problems；succeed ↔ won" }
  ];

  /* 3. 近义词对（双向匹配，可扩充） */
  root.CLOZE_SYNONYMS = [
    /* 讲义原例 */
    ["store", "shop"], ["gift", "present"], ["hard", "difficult"], ["right", "correct"],
    ["like", "love"], ["on foot", "walk"], ["going home", "walk"],
    /* 动词 */
    ["begin", "start"], ["finish", "complete"], ["buy", "purchase"], ["choose", "select"],
    ["fix", "repair"], ["keep", "hold"], ["offer", "provide"], ["get", "obtain"],
    ["show", "display"], ["tell", "inform"], ["find", "discover"], ["learn", "study"],
    ["realize", "understand"], ["accept", "receive"], ["allow", "permit"], ["answer", "reply"],
    ["arrive", "reach"], ["ask", "inquire"], ["become", "turn"], ["believe", "trust"],
    ["change", "alter"], ["check", "examine"], ["collect", "gather"], ["continue", "last"],
    ["decide", "determine"], ["die", "pass away"], ["enjoy", "like"], ["expect", "look forward to"],
    ["explain", "account for"], ["join", "take part in"], ["need", "require"], ["notice", "spot"],
    ["prevent", "stop"], ["raise", "lift"], ["receive", "accept"], ["remember", "recall"],
    ["save", "rescue"], ["seem", "appear"], ["sell", "trade"], ["spend", "cost"],
    ["travel", "journey"], ["try", "attempt"], ["use", "employ"], ["watch", "observe"],
    ["worry", "concern"], ["happen", "take place"], ["give up", "quit"], ["care for", "look after"],
    ["look for", "search for"], ["put off", "delay"], ["run out", "use up"], ["set up", "establish"],
    ["take care of", "look after"], ["come across", "meet by chance"], ["turn to", "ask for help"],
    /* 名词 */
    ["chance", "opportunity"], ["problem", "trouble"], ["way", "method"], ["idea", "thought"],
    ["job", "work"], ["trip", "journey"], ["home", "house"], ["class", "lesson"],
    ["exam", "test"], ["prize", "award"], ["road", "street"], ["story", "tale"],
    ["result", "outcome"], ["reason", "cause"], ["answer", "solution"], ["danger", "risk"],
    ["joy", "happiness"], ["fear", "afraid"], ["goal", "aim"], ["help", "aid"],
    ["mistake", "error"], ["skill", "ability"], ["dream", "wish"], ["rule", "law"],
    /* 形容词 / 副词 */
    ["big", "large"], ["small", "little"], ["clever", "bright"], ["quick", "fast"],
    ["quiet", "silent"], ["strong", "powerful"], ["tired", "exhausted"], ["happy", "glad"],
    ["sad", "unhappy"], ["angry", "mad"], ["brave", "courageous"], ["kind", "friendly"],
    ["important", "significant"], ["useful", "helpful"], ["famous", "well-known"],
    ["beautiful", "lovely"], ["delicious", "tasty"], ["cold", "freezing"], ["hot", "burning"],
    ["strange", "unusual"], ["safe", "secure"], ["rich", "wealthy"], ["empty", "vacant"],
    ["whole", "entire"], ["main", "major"], ["easy", "simple"], ["common", "usual"],
    ["clearly", "obviously"], ["perhaps", "maybe"], ["almost", "nearly"], ["at once", "immediately"],
    ["finally", "in the end"], ["suddenly", "all at once"]
  ];

  /* 4. 反义词对（双向匹配，可扩充） */
  root.CLOZE_ANTONYMS = [
    /* 讲义原例 */
    ["hot", "cold"], ["right", "wrong"], ["remember", "forget"], ["different", "similar"],
    ["kind", "unkind"], ["kindness", "hateful"], ["kindness", "unkindness"],
    /* 常见对 */
    ["accept", "refuse"], ["agree", "disagree"], ["always", "never"], ["arrive", "leave"],
    ["begin", "end"], ["big", "small"], ["black", "white"], ["buy", "sell"],
    ["cheap", "expensive"], ["clean", "dirty"], ["close", "open"], ["come", "go"],
    ["dangerous", "safe"], ["dark", "bright"], ["day", "night"], ["die", "live"],
    ["difficult", "easy"], ["early", "late"], ["empty", "full"], ["fail", "succeed"],
    ["fast", "slow"], ["find", "lose"], ["first", "last"], ["free", "busy"],
    ["full", "empty"], ["give", "take"], ["happy", "sad"], ["hard", "soft"],
    ["hate", "love"], ["heavy", "light"], ["high", "low"], ["hold", "drop"],
    ["inside", "outside"], ["join", "leave"], ["laugh", "cry"], ["left", "right"],
    ["long", "short"], ["lose", "win"], ["many", "few"], ["more", "less"],
    ["new", "old"], ["old", "young"], ["polite", "rude"], ["poor", "rich"],
    ["push", "pull"], ["quiet", "noisy"], ["rise", "fall"], ["rough", "smooth"],
    ["same", "different"], ["save", "waste"], ["start", "stop"], ["strong", "weak"],
    ["sunny", "rainy"], ["tall", "short"], ["thick", "thin"], ["true", "false"],
    ["up", "down"], ["warm", "cool"], ["wide", "narrow"], ["work", "rest"],
    ["worse", "better"], ["worried", "relaxed"], ["pleased", "unhappy"], ["excited", "bored"],
    ["proud", "ashamed"], ["sure", "unsure"], ["able", "unable"], ["hopeful", "hopeless"]
  ];

  /* 5. 上下义词（上位 → 下位列表，单向展开） */
  root.CLOZE_HYPERNYMS = {
    food: ["meat", "apple", "fruit", "bread", "noodle", "noodles", "rice", "cake", "dumpling", "dumplings", "soup", "milk", "egg", "vegetable", "vegetables", "dish", "dishes", "meal", "breakfast", "lunch", "dinner"],
    fruit: ["apple", "banana", "orange", "pear", "grape", "watermelon", "strawberry"],
    vegetable: ["carrot", "potato", "tomato", "cabbage", "onion"],
    animal: ["tiger", "dog", "cat", "bird", "fish", "horse", "rabbit", "panda", "monkey", "elephant", "lion", "sheep", "duck", "chicken"],
    vehicle: ["car", "bus", "bike", "bicycle", "train", "plane", "ship", "boat", "taxi", "subway"],
    clothing: ["shirt", "coat", "dress", "hat", "shoe", "shoes", "sweater", "jacket", "skirt"],
    furniture: ["desk", "chair", "bed", "table", "sofa", "shelf"],
    feeling: ["happy", "sad", "angry", "afraid", "excited", "nervous", "proud", "worried", "lonely", "surprised"],
    weather: ["rain", "snow", "wind", "sun", "cloud", "storm", "fog"],
    sport: ["running", "swimming", "basketball", "football", "tennis", "skating", "cycling"],
    subject: ["math", "English", "Chinese", "history", "science", "music", "art", "geography", "physics", "chemistry"],
    job: ["teacher", "doctor", "nurse", "farmer", "worker", "driver", "police", "cook", "engineer", "singer", "writer", "artist"],
    place: ["school", "hospital", "park", "library", "shop", "market", "station", "restaurant", "museum", "zoo", "garden", "farm"],
    tool: ["knife", "pen", "pencil", "ruler", "brush", "hammer", "scissors"],
    plant: ["tree", "flower", "grass", "leaf", "leaves", "rose", "bamboo"],
    music: ["song", "piano", "guitar", "violin", "drum", "concert", "band"],
    book: ["novel", "story", "dictionary", "magazine", "newspaper", "text"],
    money: ["coin", "dollar", "yuan", "price", "cost", "bill", "change"],
    body: ["hand", "foot", "head", "eye", "ear", "nose", "mouth", "arm", "leg", "hair", "heart"]
  };

  /* 5b. 抽象语义场（同场复现的依据）
   *     讲义「复现线索」里，具体名词走上下义（food→meat、animal→tiger），
   *     抽象概念则整场同现：difficult 与 problem 不同义，却同属「困难与问题」，
   *     语篇里靠的正是这种同场共现来定调。
   *     这一路专门解决「空格两侧无实义内容」的题 ——
   *       例：Talking with others ... is often very __1__(difficult).
   *           首句定调，依据只能在后文 never work out the problems /
   *           strong feelings cool down 里，绝不在空前的 is often very。
   *     同场词互为线索、与方向无关；具体名词仍优先用 CLOZE_HYPERNYMS。 */
  root.CLOZE_SEMANTIC_FIELDS = {
    /* ---- 负向场（neg）---- */
    hardship:   ["difficult", "difficulty", "hard", "problem", "problems", "trouble", "troubles", "challenge", "challenges", "struggle", "struggled", "tough", "painful", "pain", "suffer", "miserable", "failure", "fail", "failed", "fails", "wrong", "worse", "worst", "mess", "stuck", "broken", "broke", "dead", "died", "lose", "lost", "loss", "missing", "missed"],
    frustration:["nothing", "nothing left", "empty", "empty-handed", "disappointed", "disappointing", "disappointment", "hopeless", "gave up", "give up", "useless", "no luck", "in vain", "wasted", "waste", "regret", "regretted", "too many times", "again and again", "still nothing", "no one came"],
    conflict:   ["angry", "anger", "mad", "annoyed", "upset", "furious", "quarrel", "quarrelled", "argument", "arguments", "disagreement", "disagree", "disagreed", "fight", "fighting", "fought", "hate", "hated", "shout", "shouted", "yell", "yelled", "complained", "complain"],
    fear:       ["afraid", "scared", "scary", "fear", "fearful", "nervous", "nervously", "anxious", "anxiety", "worried", "worry", "worries", "terrified", "shy", "shyly", "embarrassed", "embarrassing", "frightened", "panic", "panicked", "trembling"],
    sadness:    ["sad", "sadly", "sadness", "unhappy", "cry", "cried", "crying", "tears", "tear", "hurt", "hurts", "sorrow", "bitter", "lose", "lost", "upset", "lonely", "alone"],
    tiredness:  ["tired", "tiring", "exhausted", "sleepy", "weary", "weak", "heavy", "yawned", "long way", "at least an hour", "all day", "hard work", "no time"],
    anger:      ["angry", "anger", "mad", "annoyed", "upset", "furious", "rage", "shouted", "complained"],
    loneliness: ["lonely", "alone", "loneliness", "homesick", "silence", "silent", "nobody", "no one"],
    /* ---- 正向场（pos）---- */
    calm:       ["calm", "quiet", "quietly", "cool", "relax", "relaxed", "peaceful", "patient", "patiently", "wait", "waited", "waiting", "slowly", "soft", "softly", "settled", "rest", "rested", "breathe", "breath"],
    effort:     ["try", "tried", "trying", "tries", "effort", "efforts", "insist", "persist", "practice", "practise", "practiced", "practised", "train", "trained", "training", "worked", "keep on", "kept", "hold on", "never give up", "try again", "kept trying"],
    success:    ["succeed", "success", "successful", "successfully", "achieve", "achieved", "achievement", "win", "won", "winner", "prize", "medal", "goal", "progress", "improve", "improved", "improvement", "proud", "pride", "champion", "first place", "made it"],
    kindness:   ["kind", "kindly", "kindness", "help", "helps", "helped", "helping", "helpful", "cared", "caring", "care", "warm", "warmth", "friendly", "friend", "friends", "generous", "thoughtful", "support", "supported", "share", "shared", "sharing", "give", "gave", "given", "gift", "gifts", "welcome", "welcomed", "hug", "hugged", "smile", "smiled", "smiling", "thank", "thanks", "thanked"],
    courage:    ["brave", "bravely", "courage", "courageous", "bold", "confident", "confidence", "dare", "dared", "strong", "strength", "determined", "determination"],
    joy:        ["happy", "happiness", "happily", "joy", "joyful", "glad", "cheerful", "cheer", "cheered", "cheering", "cheerfully", "delight", "delighted", "pleased", "pleasure", "excited", "exciting", "excitement", "excitedly", "laugh", "laughed", "laughing", "smile", "smiled", "wonderful", "fantastic", "amazing", "amazed", "fun", "enjoy", "enjoyed"],
    hope:       ["hope", "hoped", "hopeful", "hopefully", "wish", "wished", "expect", "expected", "expectation", "dream", "dreams", "dreamed", "future", "believe", "believed", "trust", "trusted", "promise", "promised", "faith", "confident"],
    growth:     ["grow", "grew", "grown", "growth", "change", "changed", "changing", "learn", "learned", "learnt", "learning", "lesson", "lessons", "understand", "understood", "realize", "realized", "better", "became", "mature", "important"],
    value:      ["important", "importance", "valuable", "value", "precious", "special", "meaningful", "meaning", "treasure", "treasured", "dear", "respect", "respected", "honor", "honour", "memories", "memory", "remember", "remembered", "never forget"],
    warmth:     ["warm", "warmth", "sunshine", "sunny", "sun", "bright", "brightly", "light", "gentle", "gently", "cozy", "comfortable", "comfort", "shining", "shine", "glow", "colorful", "flowers"],
    ease:       ["easy", "easily", "simple", "simply", "quick", "quickly", "fast", "smoothly", "well", "nice", "nicely", "free", "relaxed", "no problem", "right away"],
    /* ---- 中性 / 意外（neu）---- */
    surprise:   ["surprise", "surprised", "surprising", "surprisingly", "amaze", "amazed", "amazing", "unexpected", "unexpectedly", "suddenly", "sudden", "shock", "shocked", "astonished", "wonder", "wondered", "luckily", "unluckily", "fortunately", "unfortunately", "however", "but"],
    curiosity:  ["curious", "curiously", "interest", "interested", "interesting", "wonder", "wondered", "notice", "noticed", "discover", "discovered", "explore", "explored", "strange", "stranger", "mystery", "mysterious", "why", "how"],
    /* ---- 动作场（neu）：用于「空句动作与语篇动作呼应」---- */
    speech:     ["say", "said", "says", "tell", "told", "ask", "asked", "answer", "answered", "reply", "replied", "shout", "shouted", "whisper", "whispered", "call", "called", "explain", "explained", "voice", "voices", "word", "words", "talk", "talked", "speak", "spoke", "nod", "nodded", "announced", "complained"],
    movement:   ["go", "went", "gone", "come", "came", "walk", "walked", "run", "ran", "move", "moved", "headed", "leave", "left", "arrive", "arrived", "reach", "reached", "travel", "travelled", "rush", "rushed", "hurry", "hurried", "joined", "followed"],
    looking:    ["look", "looked", "looking", "see", "saw", "seen", "watch", "watched", "watching", "notice", "noticed", "stare", "stared", "glance", "glanced", "eye", "eyes", "gaze", "gazed", "sight", "found", "find"],
    lost:       ["lost", "lose", "losing", "loss", "miss", "missed", "missing", "gone", "disappear", "disappeared", "vanish", "vanished", "nowhere", "empty", "hide", "hid", "hidden"]
  };

  /* 语义场极性 —— 决定「跨场共现」能否成立。
   * 讲义技巧3「无转折则情感一致」的机器实现：
   *   答案是 upset（conflict·neg）时，语篇里的 got nothing（frustration·neg）
   *   虽不同场，却同极性，照样构成依据。
   *   这正是 587 道骨架兜底题的最大缺口 —— 同场匹配太窄，同极性匹配才是对的粒度。
   *
   * 注意 ease / speech / movement / looking / curiosity / surprise 标 neu 是刻意的：
   *   easy / fast / well 只是「中性评价」，不是情绪；让它们去配「耐心/勇气」是牵强误报。
   *   只有真正承载心境取向的场才参与跨场共现。 */
  root.CLOZE_FIELD_POLARITY = {
    hardship: "neg", frustration: "neg", conflict: "neg", fear: "neg",
    sadness: "neg", tiredness: "neg", anger: "neg", loneliness: "neg", lost: "neg",
    calm: "pos", effort: "pos", success: "pos", kindness: "pos",
    courage: "pos", joy: "pos", hope: "pos", growth: "pos",
    value: "pos", warmth: "pos",
    ease: "neu", surprise: "neu", curiosity: "neu", speech: "neu",
    movement: "neu", looking: "neu"
  };

  /* 反向索引：极性 → 该极性下所有场的词（建一次，避免逐题遍历全表） */
  var CLOZE_WORDS_BY_POLARITY = { pos: [], neg: [], neu: [] };
  var CLOZE_POL_SET = { pos: {}, neg: {}, neu: {} };
  Object.keys(root.CLOZE_SEMANTIC_FIELDS).forEach(function (f) {
    var p = root.CLOZE_FIELD_POLARITY[f];
    if (!p) return;
    root.CLOZE_SEMANTIC_FIELDS[f].forEach(function (w) {
      if (CLOZE_WORDS_BY_POLARITY[p].indexOf(w) < 0) CLOZE_WORDS_BY_POLARITY[p].push(w);
      CLOZE_POL_SET[p][w] = 1;
    });
  });
  root.clozeWordsByPolarity = function (p) { return CLOZE_WORDS_BY_POLARITY[p] || []; };
  root.clozePolarSet = function (p) { return CLOZE_POL_SET[p] || {}; };

  /* 词的极性：取它所属的第一个有极性的场 */
  root.clozePolarityOf = function (word) {
    var fs2 = root.clozeSemanticFieldsOf(word);
    for (var i = 0; i < fs2.length; i += 1) {
      var p = root.CLOZE_FIELD_POLARITY[fs2[i]];
      if (p) return p;
    }
    return null;
  };

  /* 语义场倒排索引：词 → 所属场（建一次，避免逐题遍历） */
  var CLOZE_FIELD_OF = {};
  Object.keys(root.CLOZE_SEMANTIC_FIELDS).forEach(function (f) {
    root.CLOZE_SEMANTIC_FIELDS[f].forEach(function (w) {
      var k = String(w).toLowerCase().replace(/[^a-z]/g, "");
      if (!k) return;
      (CLOZE_FIELD_OF[k] = CLOZE_FIELD_OF[k] || []).push(f);
    });
  });
  root.clozeSemanticFieldsOf = function (word) {
    var k = String(word || "").toLowerCase().replace(/[^a-z]/g, "");
    return CLOZE_FIELD_OF[k] || [];
  };

  /* ============================================================
   * 6. 情感线索（技巧3）
   *    原则：句子间若无明显转折，则前后情感态度一致。
   *    情感态度分为：正向积极 / 负向消极 / 中性
   * ============================================================ */
  root.CLOZE_EMOTION_WORDS = {
    /* 正向积极 —— 讲义原表 */
    pos: {
      adj: [
        "happy", "joyful", "pleased", "glad", "cheerful",
        "thrilled", "excited", "excitedly",
        "amazed", "amazing", "surprising",
        "fantastic", "wonderful", "excellent",
        "nice", "friendly", "warm-hearted",
        "thoughtful", "caring", "considerate", "concerned", "comforting",
        "fond", "agreeable", "acceptable", "encouraging", "hopeful",
        "important", "meaningful", "significant",
        "helpful", "beneficial",
        "satisfied", "satisfying", "proud", "sure", "certain", "able"
      ],
      verb: [
        "cheer", "smile", "laugh", "nod", "admire", "comfort", "prefer",
        "agree", "accept", "praise", "encourage", "hope"
      ]
    },
    /* 负向消极 —— 讲义原表 */
    neg: {
      adj: [
        "down", "sad", "unhappy", "sadly", "unhappily",
        "miserable", "painful", "angry", "mad", "annoyed",
        "disappointed", "afraid", "scared", "fearful",
        "anxious", "nervous", "worried", "regretful", "sorry",
        "ashamed", "unsure", "uncertain", "doubtful", "unable",
        "tired", "terrible", "awful", "bad", "badly"
      ],
      verb: ["hurt", "fear", "cry", "hate", "dislike", "disagree", "refuse", "doubt", "regret", "worry"]
    },
    /* 中性 —— 讲义原表 */
    neu: {
      adj: ["tall", "fast", "new", "rare", "quick", "slow", "high", "low"],
      verb: ["know", "realise", "realize", "understand"]
    }
  };

  /* ============================================================
   * 6b. 情感词扩充表（讲义之外、中考真题高频）
   *     单独列出便于与讲义原表区分、便于老师增删
   * ============================================================ */
  root.CLOZE_EMOTION_EXT = {
    pos: {
      adj: ["great", "perfect", "lovely", "sweet", "warm", "bright", "sunny", "lucky", "proudly", "happily", "joyfully", "carefully", "kindly", "gently", "patiently", "successfully", "beautiful", "precious", "valuable", "confident", "brave", "determined", "relaxed", "peaceful", "calm", "grateful", "thankful", "optimistic"],
      /* 注意：like 在中考完形里多数是「像…一样」的举例用法，不放进情感词表，避免误标 */
      verb: ["enjoy", "love", "thank", "welcome", "share", "help", "care", "support", "protect", "improve", "succeed", "achieve", "grow", "learn", "appreciate", "inspire"]
    },
    neg: {
      adj: ["lonely", "alone", "hopeless", "helpless", "useless", "worried", "stressed", "bored", "disappointing", "shocked", "surprised", "strict", "hurt", "cold", "dark", "empty", "silent", "hard", "difficult", "dangerous", "wrong", "heavy"],
      verb: ["fail", "lose", "losing", "suffer", "struggle", "complain", "blame", "escape", "hide", "argue", "fight", "break", "drop", "fear"]
    },
    neu: {
      adj: ["young", "small", "large", "long", "short", "same", "different", "usual", "common", "real", "true", "possible", "necessary"],
      verb: ["think", "believe", "remember", "forget", "decide", "choose", "try", "start", "stop", "finish", "wait", "watch", "look", "see", "hear", "listen", "speak", "say", "tell", "ask", "answer"]
    }
  };

  /* 7. 转折判定词：出现即认为「情感发生变化」，否则「情感一致」 */
  root.CLOZE_TURN_WORDS = [
    "but", "however", "yet", "instead", "although", "though",
    "even if", "even though", "while", "whereas", "still", "nevertheless",
    "on the contrary", "in fact", "actually", "after all"
  ];

  /* ============================================================
   * 8. 熟词生义表（技巧5）—— 讲义原表
   *    w: 单词；common: 熟义；rare: 生义
   * ============================================================ */
  root.CLOZE_SENSE_SHIFT = [
    { w: "act", common: "v. 行动；表现；扮演", rare: "n. 行为 / v. 起作用；假装 / n. 法令" },
    { w: "back", common: "v.（使）后退 / n. 后背 / adj. 后面的", rare: "v. 资助；支持" },
    { w: "drive", common: "v. 驾驶，开车", rare: "v. 迫使（某人做某事）" },
    { w: "fail", common: "v. 失败；未做到 / n.（考试）不及格", rare: "v. 倒闭；（视力等）衰退；使（某人）失望" },
    { w: "free", common: "adj. 免费的；自由的；有空的", rare: "v. 使自由；使摆脱；解开；腾出" },
    { w: "go", common: "v. 去；变得", rare: "v. 运行，工作；去从事；进展" },
    { w: "head", common: "n. 头", rare: "v.（朝……）前进；领导；居于首位" },
    { w: "last", common: "adj. 最近的；最后的", rare: "v.（使）持续；足够（某人）使用" },
    { w: "lesson", common: "n. 课", rare: "n. 经验，教训" },
    { w: "manage", common: "v. 管理", rare: "v. 成功应付；设法做到；合理安排" },
    { w: "matter", common: "n. 问题 / v. 重要，有关系", rare: "n.（构成宇宙万物的）物质" },
    { w: "miss", common: "v. 想念", rare: "v. 错过；未击中；未注意到" },
    { w: "move", common: "v. 搬动", rare: "v. 搬家；使感动 / n. 举措" },
    { w: "recognise", common: "v. 认出；辨认出", rare: "v. 承认；意识到；赏识" },
    { w: "run", common: "v. 跑", rare: "v. 使运转；经营；延续" },
    { w: "say", common: "v. 说", rare: "v.（用文字、图画等）表达信息；表明（真实感受）；假定" },
    { w: "serve", common: "v. 服务", rare: "v. 侍候（某人进餐）；为……提供服务" },
    { w: "work", common: "n. 工作 / v. 工作", rare: "v. 起作用；运转 / n. 研究；（艺术）作品" },
    { w: "travel", common: "v. 旅行", rare: "v.（物）行进，传送" },
    { w: "place", common: "n. 地方", rare: "v. 放置；安放" },
    { w: "book", common: "n. 书", rare: "v. 预订" },
    { w: "fish", common: "n. 鱼", rare: "v. 钓鱼" },
    { w: "cook", common: "v. 烹饪", rare: "n. 厨师" },
    { w: "train", common: "n. 火车", rare: "v. 训练" },
    { w: "watch", common: "v. 观看", rare: "n. 手表" },
    { w: "light", common: "n. 光", rare: "adj. 轻的；浅色的" },
    { w: "present", common: "n. 礼物", rare: "v. 呈现；赠送 / adj. 出席的" },
    { w: "order", common: "n. 命令；顺序", rare: "v. 点（餐）；订购" },
    { w: "second", common: "num. 第二", rare: "n. 秒" },
    { w: "spring", common: "n. 春天", rare: "n. 泉水；弹簧" },
    { w: "hand", common: "n. 手", rare: "v. 递给" },
    { w: "pick", common: "v. 挑选", rare: "v. 采摘；拾起" },
    { w: "keep", common: "v. 保持", rare: "v. 饲养；保存" },
    { w: "stand", common: "v. 站", rare: "v. 忍受" },
    { w: "bear", common: "n. 熊", rare: "v. 忍受；承担" },
    { w: "fine", common: "adj. 好的", rare: "n. 罚款 / adj. 细的" },
    { w: "address", common: "n. 地址", rare: "v. 处理；演说" },
    { w: "company", common: "n. 公司", rare: "n. 陪伴；同伴" },
    { w: "figure", common: "n. 数字；身材", rare: "v. 认为；弄清楚" },
    { w: "matter", common: "n. 事情", rare: "v. 要紧，有关系" }
  ];

  /* ============================================================
   * 9. 讲义固定搭配词库（技巧4）
   *    与 collocation-rules.js 的 CLOZE_COLLOCATIONS 互为补充：
   *    这里只收讲义原表，便于核对「讲义覆盖率」，判定仍以两表合并为准。
   * ============================================================ */
  root.CLOZE_PHRASE_BANK = [
    /* --- 动词短语 --- */
    { p: "come from", zh: "来自" }, { p: "come back", zh: "回来" },
    { p: "come across", zh: "偶遇" }, { p: "come true", zh: "实现" },
    { p: "come over", zh: "来访" }, { p: "come out", zh: "出版；出现" },
    { p: "get into", zh: "开始喜欢；进入" }, { p: "get out of", zh: "从……出来" },
    { p: "get up", zh: "起床；站起来" }, { p: "get to", zh: "到达" },
    { p: "get on", zh: "上（交通工具）；进展" }, { p: "get off", zh: "下车" },
    { p: "get along with", zh: "与……相处融洽" }, { p: "get on with", zh: "与……相处融洽；进展" },
    { p: "look for", zh: "寻找" }, { p: "look like", zh: "看起来像" },
    { p: "look after", zh: "照料，照顾" }, { p: "look out", zh: "当心" },
    { p: "look at", zh: "看" }, { p: "look ahead", zh: "向前看，计划未来" },
    { p: "look through", zh: "浏览" }, { p: "look forward to", zh: "盼望，期待" },
    { p: "put up", zh: "搭起；举起；张贴" }, { p: "put back", zh: "推迟；把……放回原处" },
    { p: "put down", zh: "写下；放下；镇压" }, { p: "put through", zh: "为……接通电话" },
    { p: "put out", zh: "出版；扑灭" }, { p: "put on", zh: "穿上；增加；上演" },
    { p: "put off", zh: "推迟" }, { p: "put away", zh: "把……收拾起来；存（钱）" },
    { p: "give away", zh: "赠送；泄露" }, { p: "give back", zh: "归还" },
    { p: "give in", zh: "屈服，让步" }, { p: "give off", zh: "发出（气味、热等）" },
    { p: "give out", zh: "分发；耗尽；发出（光、热或信号）" }, { p: "give up", zh: "放弃" },
    { p: "run out", zh: "用完，耗尽" }, { p: "run away", zh: "逃跑；逃避" },
    { p: "run after", zh: "追赶；追求" }, { p: "run around", zh: "到处跑" },
    { p: "hear from", zh: "收到……的来信" }, { p: "hear out", zh: "听……说完" },
    { p: "hear of", zh: "听说" }, { p: "hear about", zh: "听说" },
    { p: "turn on", zh: "打开" }, { p: "turn off", zh: "关闭" },
    { p: "turn to", zh: "求助于" }, { p: "turn up", zh: "调高；重新出现" },
    { p: "turn down", zh: "调低；拒绝" },
    { p: "talk about", zh: "谈论" }, { p: "talk with", zh: "与……交谈" },
    { p: "talk to", zh: "跟……谈话" }, { p: "talk back", zh: "回嘴，顶嘴" },
    { p: "call in", zh: "召来；打电话来" }, { p: "call at", zh: "（短时间）拜访" },
    { p: "call on", zh: "探访；号召" }, { p: "call by", zh: "顺路拜访" },
    { p: "take up", zh: "开始从事；占据" }, { p: "take in", zh: "吸收" },
    { p: "take off", zh: "起飞；脱下；休假" }, { p: "take after", zh: "（外貌或行为）与长辈相像" },
    { p: "take turns", zh: "轮流，依次" }, { p: "take the place of", zh: "代替" },
    { p: "take place", zh: "发生" }, { p: "take pride in", zh: "对……感到自豪" },
    { p: "make up", zh: "编造；组成；化妆" }, { p: "make a face", zh: "做鬼脸" },
    { p: "make progress", zh: "取得进步" }, { p: "make mistakes", zh: "犯错误" },
    { p: "make up one's mind", zh: "下定决心" }, { p: "make sure", zh: "确保；查明" },
    { p: "care about", zh: "关心；在乎" }, { p: "know about", zh: "精通" },
    { p: "worry about", zh: "为……担心" }, { p: "think about", zh: "考虑" },
    { p: "think of", zh: "想出；替……着想" }, { p: "tell of", zh: "叙述" },
    { p: "die of", zh: "因……而死" }, { p: "dream of", zh: "梦想" },
    { p: "grow up", zh: "长大" }, { p: "use up", zh: "用光" },
    { p: "look up", zh: "查找；好转；顺便看望" }, { p: "set up", zh: "建立；建起；安排" },
    { p: "hurry up", zh: "赶快" }, { p: "bring up", zh: "抚养；提起（话题）" },
    { p: "cheer up", zh: "（使）振作起来" }, { p: "stay up", zh: "熬夜" },
    { p: "catch up with", zh: "赶上；（终于）抓住并惩罚" }, { p: "come up with", zh: "想到；拿出" },
    { p: "end up with", zh: "最终处于" }, { p: "put up with", zh: "忍受" },
    { p: "smile at", zh: "对……微笑" }, { p: "laugh at", zh: "嘲笑" },
    { p: "shout at", zh: "冲……大声叫嚷" }, { p: "knock at", zh: "敲（门、窗）" },
    { p: "ask for", zh: "要求；找……说话" }, { p: "care for", zh: "喜欢；照料" },
    { p: "search for", zh: "搜寻；查找" }, { p: "call for", zh: "呼吁；（去）接……" },
    { p: "pay for", zh: "为……付费；付出代价" }, { p: "thank for", zh: "因……感谢……" },
    { p: "break out", zh: "爆发；越狱" }, { p: "find out", zh: "查明，弄清（情况）" },
    { p: "work out", zh: "锻炼；设法弄懂某事；计算出" }, { p: "hang out", zh: "常去某处" },
    { p: "go out", zh: "外出；熄灭；谈恋爱" }, { p: "sell out", zh: "卖完；出卖原则" },
    { p: "heat up", zh: "（使）发热" }, { p: "cool down", zh: "（使）变凉" },
    { p: "wait for", zh: "等候" }, { p: "learn from", zh: "向……学习" },
    /* --- 介词短语 --- */
    { p: "at once", zh: "立刻，马上" }, { p: "at hand", zh: "即将发生" },
    { p: "at first", zh: "起初" }, { p: "at last", zh: "最后" },
    { p: "at risk", zh: "处境危险" }, { p: "at will", zh: "随心所欲" },
    { p: "at times", zh: "有时" }, { p: "at present", zh: "目前" },
    { p: "by oneself", zh: "独自" }, { p: "by hand", zh: "用手工" },
    { p: "by the way", zh: "顺便提一下" }, { p: "by chance", zh: "偶然" },
    { p: "by mistake", zh: "错误地，无意地" }, { p: "by accident", zh: "偶然地，意外地" },
    { p: "on foot", zh: "步行" }, { p: "on sale", zh: "上市；廉价出售" },
    { p: "on duty", zh: "值班" }, { p: "on display", zh: "展出，陈列" },
    { p: "on one's way to", zh: "在去……的路上" }, { p: "on business", zh: "出差" },
    { p: "in a hurry", zh: "匆匆忙忙" }, { p: "in all", zh: "总共；共计" },
    { p: "in fact", zh: "事实上，实际上" }, { p: "in a minute", zh: "很快地" },
    { p: "in addition", zh: "此外" }, { p: "in silence", zh: "沉默" },
    { p: "in danger", zh: "有危险" }, { p: "in public", zh: "当众，公开地" },
    { p: "in surprise", zh: "诧异地" }, { p: "in short", zh: "总而言之" },
    { p: "out of date", zh: "过时" }, { p: "under control", zh: "处于控制之中" },
    { p: "after all", zh: "毕竟；终究" }, { p: "due to", zh: "由于" },
    { p: "thanks to", zh: "多亏；归功于" }, { p: "instead of", zh: "代替；而不是" },
    { p: "because of", zh: "因为" }, { p: "according to", zh: "根据；按照；依照" },
    { p: "for example", zh: "例如" }, { p: "from now on", zh: "从现在起" },
    /* --- 习惯表达 --- */
    { p: "with the help of", zh: "在……的帮助下" }, { p: "with the development of", zh: "随着……的发展" },
    { p: "chance to do", zh: "做某事的机会" }, { p: "ask for advice", zh: "征询意见" },
    { p: "ask sb for help", zh: "请求某人的帮助" }, { p: "to one's surprise", zh: "令某人惊讶的是" },
    { p: "give it a try", zh: "试一试" }, { p: "give sb a hand", zh: "帮助某人" },
    { p: "be full of", zh: "满是……的" }, { p: "be filled with", zh: "满是……的" },
    { p: "be good at", zh: "擅长……" }, { p: "be able to", zh: "有能力做某事" },
    { p: "be worried about", zh: "对……担心" }, { p: "be famous for", zh: "因……著名" },
    { p: "be afraid of", zh: "害怕" }, { p: "be sorry for", zh: "对……感到抱歉" },
    { p: "be interested in", zh: "对……感兴趣" }, { p: "be sure of", zh: "对……确信" },
    { p: "be similar to", zh: "和……相似" }, { p: "be different from", zh: "和……不同" },
    { p: "be the same as", zh: "和……相同" }, { p: "it is said that", zh: "据说……" },
    { p: "that is to say", zh: "那就是说" }, { p: "for the first time", zh: "第一次" },
    { p: "far from", zh: "远非，完全不" }, { p: "so far", zh: "到目前为止" },
    { p: "again and again", zh: "一再，屡次" }, { p: "with pleasure", zh: "非常乐意" },
    { p: "on the one hand", zh: "一方面" }, { p: "on the other hand", zh: "另一方面" }
  ];

  /* ============================================================
   * 10. 判定 API
   * ============================================================ */
  var LOGIC = root.CLOZE_LOGIC_WORDS;
  var EMOTION = root.CLOZE_EMOTION_WORDS;
  var EMOTION_EXT = root.CLOZE_EMOTION_EXT;
  var SENSE_SHIFT = root.CLOZE_SENSE_SHIFT;

  /* 功能词 / 虚词：这些词的复现没有线索价值 */
  var FUNC_WORDS = ("a,an,the,of,to,for,with,and,or,but,who,whom,whose,which,that,i,you,he,she,it,we,they," +
    "me,him,her,us,them,my,your,his,its,our,their,this,these,those,am,is,are,was,were,be,been,being," +
    "do,does,did,have,has,had,will,would,shall,should,can,could,may,might,must,not,no,never,so,as,if," +
    "when,while,because,than,then,there,here,very,too,also,just,only,even,still,again,up,down,out,in,on," +
    "at,by,from,into,about,over,after,before,one,two,first,last,next,every,each,all,both,some,any,many," +
    "much,more,most,other,another,same,such,own,off,away,back,well,now,ever,yet").split(",");
  var FUNC_SET = {};
  FUNC_WORDS.forEach(function (w) { if (w) FUNC_SET[w] = 1; });

  /* 题库校验器（validate_lessons.py）的停用词表：线索不得由这些词单独构成 */
  var VALIDATOR_STOP = {};
  "a,an,the,and,or,but,so,if,in,on,at,to,for,of,with,by".split(",")
    .forEach(function (w) { VALIDATOR_STOP[w] = 1; });

  function lower(s) { return String(s || "").toLowerCase().replace(/\u2019/g, "'"); }
  function words(s) { return lower(s).match(/[a-z]+(?:'[a-z]+)?/g) || []; }
  function plain(s) { return " " + lower(s).replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim() + " "; }

  /* 轻量词根：剥常见后缀 + 双写辅音归一（比「取前 4 字母」稳） */
  root.clozeStem = function (w) {
    var x = lower(w).replace(/[^a-z]/g, "");
    if (x.length < 4) return x;
    var rules = [/ies$/, /ing$/, /ness$/, /ment$/, /tion$/, /sion$/, /est$/, /ed$/, /es$/, /ly$/, /er$/, /s$/];
    for (var i = 0; i < rules.length; i++) {
      var cut = x.replace(rules[i], "");
      if (rules[i].test(x) && cut.length >= 4) { x = cut; break; }
    }
    if (x.length >= 4 && x.charAt(x.length - 1) === x.charAt(x.length - 2)) x = x.slice(0, -1);
    return x;
  };

  /* 两词是否同词根（原词复现 / 派生词复现的判据） */
  root.clozeSameRoot = function (a, b) {
    if (lower(a) === lower(b)) return "原词复现";
    var sa = root.clozeStem(a), sb = root.clozeStem(b);
    if (sa.length < 3 || sb.length < 3) return null;
    if (sa === sb) return "派生词复现";
    if (sa.indexOf(sb) === 0 || sb.indexOf(sa) === 0) return "派生词复现";
    return null;
  };

  /* ---- 逻辑线索判定：返回句中出现过的逻辑词 ---- */
  root.clozeFindLogic = function (text) {
    var hay = plain(text);
    var hits = [];
    LOGIC.forEach(function (group) {
      group.main.concat(group.other).forEach(function (raw) {
        var w = raw.replace(/\s*\.\.\.\s*/g, " ");
        if (w.indexOf(" ") >= 0) {                       // 多词结构：整串匹配
          if (hay.indexOf(" " + w + " ") >= 0 || hay.indexOf(" " + w) >= 0) {
            hits.push({ word: raw, cat: group.cat, zh: group.zh, main: group.main.indexOf(raw) >= 0 });
          }
          return;
        }
        if (hay.indexOf(" " + w + " ") >= 0) {
          hits.push({ word: raw, cat: group.cat, zh: group.zh, main: group.main.indexOf(raw) >= 0 });
        }
      });
    });
    root.CLOZE_ORDER_WORDS.forEach(function (w) {
      if (hay.indexOf(" " + w + " ") >= 0) {
        hits.push({ word: w, cat: "时间", zh: "句间顺序 / 时间推进", main: false, order: 1 });
      }
    });
    /* 去重：同一词只留一次，且优先保留常考标记 */
    var seen = {};
    return hits.filter(function (h) {
      if (seen[h.word]) return false;
      seen[h.word] = 1; return true;
    });
  };

  /* ---- 句内是否含转折（情感一致性判据） ---- */
  root.clozeHasTurn = function (text) {
    var hay = plain(text);
    var found = null;
    root.CLOZE_TURN_WORDS.forEach(function (w) {
      if (found) return;
      if (hay.indexOf(" " + w + " ") >= 0) found = w;
    });
    return found;
  };

  /* ---- 情感线索判定：返回句中情感词及其极性 ---- */
  root.clozeFindEmotion = function (text, withExt) {
    var ws = words(text);
    var idx = {};
    ws.forEach(function (w) { idx[w] = 1; });
    var out = [];
    function scan(pack, polarity, from) {
      ["adj", "verb"].forEach(function (kind) {
        (pack[kind] || []).forEach(function (w) {
          if (idx[w]) out.push({ word: w, polarity: polarity, kind: kind === "adj" ? "形容词/副词" : "动词", from: from });
        });
      });
    }
    scan(EMOTION.pos, "正向积极", "讲义");
    scan(EMOTION.neg, "负向消极", "讲义");
    scan(EMOTION.neu, "中性", "讲义");
    if (withExt !== false) {
      scan(EMOTION_EXT.pos, "正向积极", "扩充");
      scan(EMOTION_EXT.neg, "负向消极", "扩充");
      scan(EMOTION_EXT.neu, "中性", "扩充");
    }
    return out;
  };

  /* ---- 熟词生义判定 ---- */
  root.clozeSenseShift = function (answer) {
    var a = lower(answer).replace(/[^a-z]/g, "");
    for (var i = 0; i < SENSE_SHIFT.length; i++) {
      if (SENSE_SHIFT[i].w === a) return SENSE_SHIFT[i];
    }
    return null;
  };

  /* ---- 复现线索判定：在正文里找答案词的五类复现 ----
   * text    ：全文（含 __n__ 标记）
   * answer  ：答案词
   * blankPos：空格在全文中的下标（用于「离空格越近越强」加权）
   * 返回 [{cat, word, index, dist, strength}] 按 strength 降序、dist 升序 */
  root.clozeFindRepetition = function (text, answer, blankPos, opts) {
    opts = opts || {};
    var full = String(text || "");
    var low = lower(full);
    var toks = [];
    var re = /[A-Za-z]+(?:['\u2019][A-Za-z]+)?/g, m;
    while ((m = re.exec(full)) !== null) toks.push({ w: lower(m[0]), s: m.index, e: m.index + m[0].length });
    var ans = lower(answer).replace(/[^a-z' ]/g, "").trim();
    if (!ans) return [];
    var ansWords = ans.split(" ").filter(function (w) { return w && !FUNC_SET[w]; });
    var ansKeys = ansWords.length ? ansWords : ans.split(" ");
    var maxDist = opts.maxDist == null ? 400 : opts.maxDist;
    var out = [];
    var seen = {};

    function push(cat, word, index, strength) {
      var key = cat + "|" + word + "|" + index;
      if (seen[key]) return;
      seen[key] = 1;
      var dist = blankPos == null || blankPos < 0 ? Math.abs(index) : Math.abs(index - blankPos);
      out.push({ cat: cat, word: word, index: index, dist: dist, strength: strength });
    }

    ansKeys.forEach(function (key) {
      if (key.length < 3 || FUNC_SET[key]) return;
      /* ① 原词 / 派生词复现 */
      toks.forEach(function (t) {
        if (Math.abs(t.s - (blankPos || 0)) > maxDist) return;
        if (FUNC_SET[t.w] || t.w.length < 3) return;
        var rel = root.clozeSameRoot(t.w, key);
        if (rel) push(rel, t.w, t.s, rel === "原词复现" ? 3 : 3);
      });
      /* ② 近义词 / 反义词复现 */
      root.CLOZE_SYNONYMS.forEach(function (pair) {
        if (pair.indexOf(key) < 0) return;
        pair.forEach(function (other) {
          if (other === key) return;
          toks.forEach(function (t) {
            if (t.w === other || root.clozeSameRoot(t.w, other) === "原词复现") push("近义词复现", t.w, t.s, 2);
          });
        });
      });
      root.CLOZE_ANTONYMS.forEach(function (pair) {
        if (pair.indexOf(key) < 0) return;
        var other = pair[0] === key ? pair[1] : pair[0];
        toks.forEach(function (t) {
          if (t.w === other || root.clozeSameRoot(t.w, other) === "原词复现") push("反义词复现", t.w, t.s, 2);
        });
      });
      /* ③ 上下义词复现：答案若是下位词，找上位词 */
      Object.keys(root.CLOZE_HYPERNYMS).forEach(function (up) {
        if (root.CLOZE_HYPERNYMS[up].indexOf(key) < 0) return;
        toks.forEach(function (t) {
          if (t.w === up || root.clozeStem(t.w) === root.clozeStem(up)) push("上下义词复现", t.w, t.s, 1);
        });
      });
      /* ④ 同场复现：答案词与语篇词属同一抽象语义场
       *    例：difficult ↔ problems（「困难与问题」场）
       *    讲义把这归在复现线索里 —— 同场共现让相邻句子衔接起来。
       *    只认原词与规则复数，不做词根归一：
       *    否则 working→work 会让「a plan is not working」误配上 effort 场。 */
      var fields = root.clozeSemanticFieldsOf(key);
      if (fields.length) {
        toks.forEach(function (t) {
          if (FUNC_SET[t.w] || t.w.length < 3) return;
          for (var fi = 0; fi < fields.length; fi++) {
            var ws = root.CLOZE_SEMANTIC_FIELDS[fields[fi]];
            for (var wi = 0; wi < ws.length; wi++) {
              var w = ws[wi];
              if (w === key) continue;
              if (t.w === w || t.w === w + "s" || t.w === w + "es" ||
                  w === t.w + "s" || w === t.w + "es") { push("同场复现", t.w, t.s, 2); return; }
            }
          }
        });
      }
      /* ⑤ 同极性跨场共现 —— 讲义技巧3「无转折则情感一致」的机器实现
       *    答案是 upset（conflict·neg）时，语篇里的「got nothing」（frustration·neg）
       *    虽不同场，却同极性 —— 同场匹配太窄，同极性才是对的粒度。
       *    这一路专治「空两侧只有骨架、依据在别处句子」的题。
       *
       *    两条护栏（实测加）：
       *      · 距离上限 800 字符 —— 否则每篇文末的「we shouldn't give up」教训句
       *        会跟一大片题误配（它是全篇最高频的积极短语）
       *      · 短语动词过滤 —— "shouldn't give up" 里的 give 不是「给予」，
       *        不能拿它当 kindness 场的积极信号 */
      var pol = root.clozePolarityOf(key);
      if (pol && pol !== "neu") {
        var polMaxDist = opts.polMaxDist == null ? 800 : opts.polMaxDist;
        var polSet = root.clozePolarSet(pol);
        var PH_V = { give: 1, gives: 1, gave: 1, given: 1, take: 1, took: 1, get: 1, got: 1,
          go: 1, goes: 1, went: 1, come: 1, came: 1, look: 1, looked: 1, put: 1, keep: 1,
          kept: 1, turn: 1, turned: 1, break: 1, broke: 1, run: 1, ran: 1, set: 1, work: 1,
          worked: 1, find: 1, found: 1, make: 1, made: 1, hold: 1, held: 1, carry: 1 };
        var PARTICLE = { up: 1, in: 1, away: 1, off: 1, out: 1, back: 1, down: 1,
          over: 1, through: 1, on: 1, into: 1 };
        toks.forEach(function (t, ti) {
          if (t.w === key || FUNC_SET[t.w] || t.w.length < 3) return;
          if (!polSet[t.w]) return;
          if (blankPos != null && blankPos >= 0 && Math.abs(t.s - blankPos) > polMaxDist) return;
          var nx = toks[ti + 1];
          if (nx && PARTICLE[nx.w] && PH_V[t.w]) return;   // give up / take off … 不作情绪词
          push("情感线索·情感一致", t.w, t.s, 2);
        });
        /* 多词词条（"nothing left" / "at least an hour"）直接按短语扫原文。
         * 强度 3：短语比单词更具体，可信度更高。 */
        var polList = root.clozeWordsByPolarity(pol);
        for (var pl = 0; pl < polList.length; pl += 1) {
          var pw = polList[pl];
          if (pw.indexOf(" ") < 0 || pw === key) continue;
          var pat = low.indexOf(pw);
          while (pat >= 0) {
            if (blankPos == null || blankPos < 0 || Math.abs(pat - blankPos) <= polMaxDist) {
              push("情感线索·情感一致", pw, pat, 3);
            }
            pat = low.indexOf(pw, pat + 1);
          }
        }
      }
    });

    /* 去重：同一处只保留最强的一类 */
    var byKey = {};
    out.forEach(function (o) {
      var k = o.index + "|" + o.word;
      if (!byKey[k] || byKey[k].strength < o.strength) byKey[k] = o;
    });
    var list = Object.keys(byKey).map(function (k) { return byKey[k]; });
    list.sort(function (a, b) { return b.strength - a.strength || a.dist - b.dist; });
    return list;
  };

  /* ---- 综合判定：给一道题做三类线索归因 ----
   * lesson  ：{ article_text_with_blanks, ... }
   * question：{ q, answer, clues, ... }
   * 返回 { types:[], evidence:[{clueType, subType, word, sentence, strength}] } */
  root.clozeAnalyze = function (lesson, question, opts) {
    opts = opts || {};
    var full = String((lesson && lesson.article_text_with_blanks) || "");
    var blankPos = full.indexOf("__" + question.q + "__");
    var sents = splitSentences(full, blankPos);
    var blankSent = sents.current;
    var prevSent = sents.prev;
    var nextSent = sents.next;
    var ctx = [prevSent, blankSent, nextSent].filter(Boolean).join(" ");

    var evidence = [];

    /* ① 逻辑线索：优先看空格所在句，其次看上一句 */
    (root.clozeFindLogic(blankSent).length ? root.clozeFindLogic(blankSent) : root.clozeFindLogic(prevSent || ""))
      .forEach(function (h) {
        evidence.push({ clueType: "逻辑线索", subType: h.cat, word: h.word, sentence: blankSent, strength: h.cat === "转折" || h.cat === "因果" || h.cat === "让步" ? 3 : 2, note: h.zh });
      });

    /* ② 复现线索：全篇找答案词的复现 */
    root.clozeFindRepetition(full, question.answer, blankPos).forEach(function (r) {
      if (r.dist < 4) return;                                  // 紧贴空格的是题目自身，不算复现
      evidence.push({ clueType: "复现线索", subType: r.cat, word: r.word, sentence: sentenceOf(full, r.index), strength: r.strength, dist: r.dist });
    });

    /* ③ 情感线索：转折词有无 → 情感一致 / 情感变化 */
    var emo = root.clozeFindEmotion(ctx, opts.withExt);
    var turn = root.clozeHasTurn(blankSent) || root.clozeHasTurn(prevSent || "");
    if (emo.length) {
      var polarity = mostLikelyPolarity(emo);
      evidence.push({
        clueType: "情感线索",
        subType: turn ? "情感变化（有转折词 " + turn + "）" : "情感一致（无明显转折）",
        word: emo.map(function (e) { return e.word; }).slice(0, 4).join(" / "),
        sentence: blankSent, strength: 2, polarity: polarity
      });
    }

    /* ④ 固定搭配 / 熟词生义：由 collocation-rules.js 与词表判定，这里只做标记 */
    var shift = root.clozeSenseShift(question.answer);
    if (shift) {
      evidence.push({ clueType: "熟词生义", subType: "语境取生义", word: shift.w, sentence: blankSent, strength: 2, note: "熟义：" + shift.common + "；生义：" + shift.rare });
    }

    evidence.sort(function (a, b) { return (b.strength || 0) - (a.strength || 0); });
    var types = [];
    evidence.forEach(function (e) { if (types.indexOf(e.clueType) < 0) types.push(e.clueType); });
    return { q: question.q, answer: question.answer, blankPos: blankPos, types: types, evidence: evidence };
  };

  /* ---- 句子工具（与 app.js 的切句口径一致：引号内不断句 / 缩写保护） ---- */
  var ABBR = ["Mr", "Mrs", "Ms", "Dr", "Prof", "St", "Jr", "Sr", "Mt", "No", "vs", "etc",
    "a.m", "p.m", "A.M", "P.M", "e.g", "i.e", "U.S", "U.K"];
  function splitSentences(text, at) {
    var s = String(text || "").replace(/__(\d+)__/g, " \u0002 ").replace(/\s+/g, " ").trim();
    ABBR.forEach(function (a) { s = s.split(a + ".").join(a + "\u0001"); });
    var out = [], buf = "", inQuote = false;
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i); buf += c;
      if (c === "\u201C") { inQuote = true; continue; }
      if (c === "\u201D") { inQuote = false; continue; }
      if (c === "'") {
        var pv = s.charAt(i - 1), nx = s.charAt(i + 1);
        if (/[A-Za-z]/.test(pv) && /[A-Za-z]/.test(nx)) continue;
        inQuote = !inQuote; continue;
      }
      if (c === "\"") { inQuote = !inQuote; continue; }
      if (c === "." || c === "!" || c === "?") {
        if (inQuote) continue;
        var j = i + 1;
        while (j < s.length && /["\u201D\u2019')\]]/.test(s.charAt(j))) { buf += s.charAt(j); j++; }
        var rest = s.slice(j), mm = rest.match(/^(\s+)(.)/);
        if (!rest.trim() || (mm && /[A-Z\u201C"\u2018\u2019\d\u0002]/.test(mm[2]))) {
          var seg = buf.replace(/\u0001/g, ".").replace(/\u0002/g, "\u0002").replace(/\s+/g, " ").trim();
          if (seg) out.push(seg);
          buf = ""; i = j - 1;
        }
      }
    }
    var tail = buf.replace(/\u0001/g, ".").replace(/\s+/g, " ").trim();
    if (tail) out.push(tail);
    /* 定位空格所在句 */
    var cur = -1;
    for (var k = 0; k < out.length; k++) { if (out[k].indexOf("\u0002") >= 0) { cur = k; break; } }
    if (cur < 0 && at != null) cur = 0;
    return {
      all: out.map(function (x) { return x.replace(/\u0002/g, "____"); }),
      current: (out[cur] || "").replace(/\u0002/g, "____"),
      prev: cur > 0 ? out[cur - 1].replace(/\u0002/g, "____") : "",
      next: cur >= 0 && cur + 1 < out.length ? out[cur + 1].replace(/\u0002/g, "____") : ""
    };
  }
  root.clozeSplitSentences = splitSentences;

  /* 取「包含原文下标 index 的那一句」——直接按标点向两侧扩张，
   * 不做位置换算，避免 __n__ 被折叠后坐标错位 */
  function sentenceOf(full, index) {
    var s = String(full || "");
    if (!s) return "";
    var i = Math.max(0, Math.min(s.length - 1, index));
    var start = i;
    while (start > 0 && !/[.!?\n]/.test(s.charAt(start - 1))) start -= 1;
    while (start < i && /\s/.test(s.charAt(start))) start += 1;
    var end = i;
    while (end < s.length - 1 && !/[.!?\n]/.test(s.charAt(end))) end += 1;
    if (end < s.length) end += 1;
    var seg = s.slice(start, end).replace(/\s+/g, " ").trim();
    return seg.length > 200 ? seg.slice(0, 200) + "…" : seg;
  }
  root.clozeSentenceOf = sentenceOf;

  function mostLikelyPolarity(emo) {
    var score = { "正向积极": 0, "负向消极": 0, "中性": 0 };
    emo.forEach(function (e) { score[e.polarity] = (score[e.polarity] || 0) + (e.from === "讲义" ? 2 : 1); });
    var best = "中性", bv = -1;
    Object.keys(score).forEach(function (k) { if (score[k] > bv) { bv = score[k]; best = k; } });
    return best;
  }

  /* ============================================================
   * 11. 线索构建：按讲义规则从原文生成线索，并标注类型
   *     线索类型（5 类 + 2 个扩充）：
   *       逻辑线索·并列/转折/条件/因果/让步/时间/举例
   *       复现线索·原词复现/派生词复现/近义词复现/反义词复现/上下义词复现
   *       情感线索·情感一致/情感变化
   *       同位解释（破折号 / just / namely 引出的同义复述）
   *       固定搭配 / 熟词生义
   * ============================================================ */

  /* 高噪声逻辑词：保留在词表里供教学，但默认不作为线索（会命中太多次） */
  root.CLOZE_LOGIC_WEAK = ["for", "as", "like", "since", "while", "when", "or"];

  /* 线索禁用字符：汉字 + 中文标点 + 全角符号。
   * 不只拦汉字 —— 全角逗号句号冒号（，。．：；！？）同样是「不该出现在英文线索里」的信号：
   * 段落里出现它们，往往意味着片段跨过了选项块（"saw C． I couldn't believe"）
   * 或中文夹注（"some suggestions： Understand what kind"）的边界。
   * 用 \uff01-\uff5e 覆盖全角 ASCII 变体，用 \u3000-\u303f 覆盖 CJK 标点。 */
  var CLOZE_CN_RE = root.CLOZE_CN_RE = /[\u4e00-\u9fa5\u3000-\u303f\uff01-\uff5e]/;

  /* 线索类型 → 界面配色（回归 <span class="clue-xxx">） */
  /* 类型 → 颜色类。v2 简约版：全部收敛为单色 mint（薄荷底 + 深绿字），
   * 类型区分交给线索卡的文字标签 —— 正文里不再五颜六色。
   * 保留 key/zh 结构，旧调用方（clueColorOf 等）无需改动。 */
  root.CLOZE_CLUE_STYLE = {
    "逻辑线索": { key: "logic", color: "mint", zh: "逻辑线索" },
    "复现线索": { key: "repeat", color: "mint", zh: "复现线索" },
    "情感线索": { key: "emotion", color: "mint", zh: "情感线索" },
    "固定搭配": { key: "phrase", color: "mint", zh: "固定搭配" },
    "熟词生义": { key: "shift", color: "mint", zh: "熟词生义" },
    "同位解释": { key: "explain", color: "mint", zh: "同位解释" },
    "举例说明": { key: "example", color: "mint", zh: "举例说明" },
    "语境线索": { key: "context", color: "mint", zh: "语境线索" },
    "线索词": { key: "other", color: "mint", zh: "线索" }
  };
  root.clozeClueStyle = function (type) {
    var top = String(type || "").split("·")[0];
    return root.CLOZE_CLUE_STYLE[top] || root.CLOZE_CLUE_STYLE["线索词"];
  };

  function tokenizeWithOffset(text, base) {
    var out = [], re = /[A-Za-z]+(?:['\u2019][A-Za-z]+)?/g, m;
    while ((m = re.exec(text)) !== null) {
      out.push({ w: m[0], lw: lower(m[0]), s: base + m.index, e: base + m.index + m[0].length });
    }
    return out;
  }

  /* 空格所在的整句范围（按标点向两侧扩张） */
  function blankSpan(full, q) {
    var marker = "__" + q + "__";
    var bi = full.indexOf(marker);
    if (bi < 0) return null;
    var s = bi;
    while (s > 0 && !/[.!?]/.test(full.charAt(s - 1))) s -= 1;
    var e = bi + marker.length;
    while (e < full.length && !/[.!?]/.test(full.charAt(e))) e += 1;
    if (e < full.length) e += 1;
    return { bi: bi, bEnd: bi + marker.length, start: s, end: e, text: full.slice(s, e) };
  }
  root.clozeBlankSpan = blankSpan;

  /* 取「包含 index 的那一句」中 index 附近的词窗（用于跨句复现） */
  function windowInSentence(full, index, back, fwd) {
    var s = index, e = index;
    while (s > 0 && !/[.!?]/.test(full.charAt(s - 1))) s -= 1;
    while (e < full.length && !/[.!?]/.test(full.charAt(e))) e += 1;
    var tks = tokenizeWithOffset(full.slice(s, e), s);
    var vi = -1;
    for (var i = 0; i < tks.length; i++) { if (tks[i].s <= index && index < tks[i].e) { vi = i; break; } }
    if (vi < 0) return null;
    var a = Math.max(0, vi - back), b = Math.min(tks.length - 1, vi + fwd);
    var seg = full.slice(tks[a].s, tks[b].e);
    if (/[.!?;:]/.test(seg) || seg.indexOf("__") >= 0) return null;
    if (CLOZE_CN_RE.test(seg)) return null;
    var sSeg = seg.replace(/^[\s,\uFF0C\u3001\u2014-]+|[\s,\uFF0C\u3001\u2014-]+$/g, "");
    var wc2 = sSeg.split(/\s+/).filter(Boolean).length;
    return (wc2 >= 2 && wc2 <= 6) ? sSeg : null;
  }

  /* 旧标签词表 → 讲义五类。旧数据里「前置语境 / 后置搭配」只是位置描述，
   * 不含线索类型信息，因此一律丢弃重判。 */
  var LEGACY_TYPE_MAP = {
    "原词复现": "复现线索·原词复现",
    "同词根复现": "复现线索·派生词复现",
    "派生词复现": "复现线索·派生词复现",
    "上下文复现": "复现线索·原词复现",
    "上下文线索": "复现线索·原词复现",
    "近义词复现": "复现线索·近义词复现",
    "反义词复现": "复现线索·反义词复现",
    "上下义词复现": "复现线索·上下义词复现",
    "固定搭配": "固定搭配"
  };
  var POSITIONAL_TYPE = { "前置语境": 1, "后置搭配": 1, "前置线索": 1, "后置线索": 1, "线索词": 1, "语境": 1 };

  /* 旧线索的类型推断（老数据没有 clueTypes，或只有位置标签时兜底）
   * repList 可传入预先算好的复现表，避免每题重复扫描全文 */
  function inferType(lesson, question, clue, repList) {
    var c = String(clue || "");
    var lg = root.clozeFindLogic(c).filter(function (h) { return root.CLOZE_LOGIC_WEAK.indexOf(h.word) < 0; });
    if (lg.length) return "逻辑线索·" + lg[0].cat;
    var ans = lower(question.answer).replace(/[^a-z' ]/g, "").trim();
    if (ans) {
      var keys = ans.split(" ").filter(function (w) { return w && !FUNC_SET[w] && w.length >= 3; });
      for (var i = 0; i < keys.length; i++) {
        if (root.clozeStem(c) === root.clozeStem(keys[i])) return "复现线索·派生词复现";
      }
      var rep = repList || root.clozeFindRepetition((lesson && lesson.article_text_with_blanks) || "", question.answer, null);
      for (var j = 0; j < rep.length; j++) {
        if (c.indexOf(rep[j].word) >= 0) return "复现线索·" + rep[j].cat;
      }
    }
    if (root.clozeFindEmotion(c).length) return "情感线索·情感一致";
    var shift = root.clozeSenseShift(question.answer);
    if (shift && lower(c).indexOf(shift.w) >= 0) return "熟词生义";
    return "固定搭配";
  }

  /* 旧标签 → 新标签；位置类标签直接重判 */
  function resolveOldType(lesson, question, clue, repList) {
    var raw = (question.clueTypes && question.clueTypes[clue]) || "";
    if (LEGACY_TYPE_MAP[raw]) return LEGACY_TYPE_MAP[raw];
    if (raw && !POSITIONAL_TYPE[raw]) return raw;
    return inferType(lesson, question, clue, repList);
  }

  /* 固定搭配词典命中：线索里出现的词序列是否命中讲义 / 项目搭配表 */
  var BANK_PLAIN = null;
  function ensureBank() {
    if (BANK_PLAIN) return BANK_PLAIN;
    BANK_PLAIN = [];
    var src = (root.CLOZE_PHRASE_BANK || []).concat(root.CLOZE_COLLOCATIONS || []);
    src.forEach(function (e) {
      if (!e || !e.p) return;
      var p = plain(e.p);
      var wc = p.split(" ").filter(Boolean).length;
      if (wc >= 2) BANK_PLAIN.push({ p: p.trim(), zh: e.zh || "", wc: wc });
    });
    BANK_PLAIN.sort(function (a, b) { return b.wc - a.wc; });
    return BANK_PLAIN;
  }
  function bankHit(clue) {
    var hay = plain(clue);
    if (hay.trim().split(" ").length < 2) return null;
    var bank = ensureBank();
    for (var i = 0; i < bank.length; i++) {
      if (hay.indexOf(" " + bank[i].p + " ") >= 0) return bank[i];
    }
    return null;
  }
  root.clozeBankHit = bankHit;

  /* ---- 按规则生成线索 ----
   * 返回 { clues: [...], clueTypes: {...}, evidence: [...] }
   * 策略：原有线索全保留（人工核过），叠加规则新发现的证据，去包含关系，最多 4 条 */
  root.clozeBuildClues = function (lesson, question, opts) {
    opts = opts || {};
    var full = String((lesson && lesson.article_text_with_blanks) || "");
    var sp = blankSpan(full, question.q);
    var oldClues = (question.clues || []).slice();
    if (!sp) return { clues: oldClues, clueTypes: question.clueTypes || {}, evidence: [] };

    var toks = tokenizeWithOffset(sp.text, sp.start);
    var n = toks.length;
    var bi = 0;
    while (bi < n && toks[bi].e <= sp.bi) bi += 1;          // 空格前的词数 = 空格位置
    var maxClues = opts.maxClues || 3;

    var picks = [], evidence = [];
    function sliceFrom(a, b) {
      if (a < 0 || b >= n || a > b) return null;
      var seg = full.slice(toks[a].s, toks[b].e);
      if (/[.!?;:]/.test(seg) || seg.indexOf("__") >= 0) return null;
      if (CLOZE_CN_RE.test(seg)) return null;          // 夹注中文（如 "(评论)"）不进线索
      seg = seg.replace(/^[\s,\uFF0C\u3001\u2014-]+|[\s,\uFF0C\u3001\u2014-]+$/g, "");
      var wc = seg.split(/\s+/).filter(Boolean).length;   // 与校验器口径一致：按空格分词
      return (wc >= 2 && wc <= 6) ? seg : null;
    }
    /* 是否含实词（用于拒绝 "in the" / "of a" 这类空壳骨架）
     * 注意：never / not / up / out 这类词本身可能构成搭配（never forget / give up），
     * 所以不能一律按「功能词」否掉，这里只否掉纯限定词 / 代词 / 助动词 / 介词 / 连词。 */
    var SHELL = {};
    ("the,a,an,of,to,in,on,at,by,for,with,and,or,but,so,as,if,than,that,this,these,those,there,here," +
      "i,you,he,she,it,we,they,me,him,her,us,them,my,your,his,its,our,their," +
      "am,is,are,was,were,be,been,being,do,does,did,done,have,has,had,will,would,shall,should," +
      "can,could,may,might,must,didn,doesn,isn,aren,wasn,weren,don,won,couldn,shouldn,wouldn," +
      "mustn,hasn,haven,hadn,ll,re,ve,d,don,s,t").split(",").forEach(function (w) { if (w) SHELL[w] = 1; });
    function hasContent(seg) {
      var ws = lower(seg).match(/[a-z]+/g) || [];
      for (var i = 0; i < ws.length; i++) {
        if (ws[i].length >= 3 && !SHELL[ws[i]]) return true;
      }
      return false;
    }
    /* 短语边界校验：拒绝从词中间截出来的碎片（"s farm" / "that didn" / "t go"）
     * 这类碎片来自早期生成器按撇号切词，学生看了只会困惑。
     * 注意 kids' 这种所有格撇号是合法的，只有「撇号后面还接字母」才算截断。 */
    function cleanPhrase(ph) {
      var at = full.indexOf(ph);
      if (at < 0) return false;
      var prev = at > 0 ? full.charAt(at - 1) : " ";
      var next = full.charAt(at + ph.length);
      var next2 = full.charAt(at + ph.length + 1);
      if (/[A-Za-z]/.test(prev)) return false;
      if (/[\u2019\u2018']/.test(prev)) return false;
      if (/[A-Za-z]/.test(next)) return false;
      if (/[\u2019\u2018']/.test(next) && /[A-Za-z]/.test(next2)) return false;
      return true;
    }
    function windowAt(wi, back, fwd) {
      if (wi < 0) return null;
      if (wi < bi) return sliceFrom(Math.max(0, wi - back), Math.min(bi - 1, wi + fwd));
      return sliceFrom(Math.max(bi, wi - back), Math.min(n - 1, wi + fwd));
    }
    function tokIndex(word) {
      var lw = lower(word).split(/\s+/)[0];
      for (var i = 0; i < n; i++) { if (toks[i].lw === lw) return i; }
      return -1;
    }
    function add(phrase, type, strength) {
      if (!phrase) return;
      var ph = String(phrase).replace(/\s+/g, " ").trim();
      if (!ph || CLOZE_CN_RE.test(ph)) return;
      if (full.indexOf(ph) < 0) return;
      if (!cleanPhrase(ph)) return;
      picks.push({ phrase: ph, type: type, strength: strength || 2 });
    }

    /* ① 逻辑线索（空句内的逻辑词；并列要求紧邻空格）
     *    取词方向按逻辑词的性质决定，避免取到读不通的碎片：
     *      · 从属引导词（such as / because / although / if…）→ 向后取，顺着读
     *      · 并列连词（and / or）→ 取「左右各一词」，让并列项成对出现
     *      · 转折/结论词（but / however / so…）→ 若在空格之后，取前文（被转折的内容）
     *      · 顺序副词（Later / Suddenly…）→ 取前文，它通常给前一句收尾 */
    var FORWARD_CATS = { "举例": 1, "因果": 1, "条件": 1, "让步": 1, "时间": 1 };
    root.clozeFindLogic(sp.text).forEach(function (h) {
      if (root.CLOZE_LOGIC_WEAK.indexOf(h.word) >= 0) return;
      var wi = tokIndex(h.word);
      if (wi < 0) return;
      if (h.cat === "并列" && Math.abs(wi - bi) > 3) return;
      var ph;
      if (h.cat === "并列") {
        ph = windowAt(wi, 1, 1) || windowAt(wi, 2, 0) || windowAt(wi, 0, 2);
      } else if (h.order) {
        ph = windowAt(wi, 2, 0) || windowAt(wi, 0, 2);
      } else if (wi < bi) {
        ph = windowAt(wi, 0, 3) || windowAt(wi, 2, 0);
      } else if (FORWARD_CATS[h.cat]) {
        ph = windowAt(wi, 0, 3) || windowAt(wi, 2, 0);
      } else {
        ph = windowAt(wi, 2, 0) || windowAt(wi, 0, 3);
      }
      var st = (h.cat === "转折" || h.cat === "因果" || h.cat === "让步") ? 3 : (h.cat === "并列" ? 1 : 2);
      add(ph || h.word, "逻辑线索·" + h.cat, st);
    });

    /* ② 复现线索（答案词在空句内 / 相邻句内的复现）
     *    同一条复现只保留离空格最近的一处（与高亮收敛口径一致） */
    var repList = root.clozeFindRepetition(full, question.answer, sp.bi, { maxDist: opts.repMaxDist || 4000 });
    var bestRep = {};
    repList.forEach(function (r) {
      if (r.dist < 4) return;                              // 紧贴空格的是答案本身
      var k = r.cat + "|" + r.word;
      if (!bestRep[k] || r.dist < bestRep[k].dist) bestRep[k] = r;
    });
    Object.keys(bestRep).forEach(function (k) {
      var r = bestRep[k];
      /* cat 里已含「·」的是复合标签（情感线索·情感一致），不要再加「复现线索·」前缀 */
      var cat = r.cat.indexOf("·") >= 0 ? r.cat : ("复现线索·" + r.cat);
      /* 多词复现词条（"at least an hour" / "nothing left"）本身就是完整语义块，
       * 直接高亮它 —— 再往前截窗口只会得到 "come for at" 这种碎片 */
      if (r.word.indexOf(" ") >= 0) { add(r.word, cat, r.strength); return; }
      /* 窗口以复现词结尾（"… gave me hope"），复现词本身才是线索锚点
       * 同场 / 同极性呼应多给两词余量：它的证据常是「never work out the problems」
       * 这种「副词 + 动词 + 宾语」的完整语义块，截短了就读不出判断方向 */
      var back = (r.cat === "同场复现" || r.cat === "情感线索·情感一致") ? 4 : 2;
      var ph = null, wi = -1;
      for (var i = 0; i < n; i++) { if (toks[i].s === r.index) { wi = i; break; } }
      if (wi >= 0) ph = windowAt(wi, back, 0);
      if (!ph) ph = windowInSentence(full, r.index, back, 0);
      add(ph, cat, r.strength);
    });

    /* ③ 情感线索（讲义技巧3「形副词动判情感」）
     *    原则：句子间若无明显转折，则前后情感态度一致。
     *    情感词窗口取「上句 + 空句 + 下句」—— 讲义例题里情感词常在邻句
     *      · 技巧3 例题1：「They looked very friendly and pleased.」在空句之后
     *      · 技巧3 即学即练1：「It looked like it would be delicious.」在空句之前
     *    转折词只认空句本身（讲义口径：空格所在句内无转折 → 前后情感一致）。
     *    中性词（tall / fast / know…）不承载情感，一律不作为线索。 */
    var sents = root.clozeSplitSentences(full, sp.bi);
    var emoHits = [];
    [sents.prev, sents.current, sents.next].forEach(function (s, li) {
      if (!s) return;
      root.clozeFindEmotion(s, opts.withExt).forEach(function (e) {
        if (e.polarity === "中性") return;
        emoHits.push({ word: e.word, polarity: e.polarity, inBlank: li === 1, from: e.from });
      });
    });
    var turn = root.clozeHasTurn(sp.text);
    var ansEmo = root.clozeFindEmotion(question.answer, false).filter(function (e) { return e.polarity !== "中性"; });
    var blankEmo = emoHits.filter(function (e) { return e.inBlank; });
    if (blankEmo.length && turn) {
      /* 情感变化：空句内「情感词 + 转折词」一起给（Tired but ____ / ____ yet still excited） */
      var ew = tokIndex(blankEmo[0].word), tw = tokIndex(turn);
      if (ew >= 0 && tw >= 0) {
        var a = Math.min(ew, tw), b = Math.max(ew, tw);
        var seg = (b < bi) ? sliceFrom(a, Math.min(bi - 1, b))
          : (a >= bi ? sliceFrom(Math.max(bi, a), b) : null);
        if (!seg) {
          /* 兜底同样要守 2—6 词 / 不跨标点，否则会切出
           * "excited to teach at a small school here, but" 这种长条 */
          var raw = full.slice(toks[a].s, toks[b].e);
          var rawClean = raw.replace(/^[\s,\uFF0C\u3001\u2014-]+|[\s,\uFF0C\u3001\u2014-]+$/g, "");
          var rawWc = rawClean.split(/\s+/).filter(Boolean).length;
          if (raw.indexOf("__") < 0 && !/[.!?;:]/.test(raw) && !CLOZE_CN_RE.test(raw) &&
              rawWc >= 2 && rawWc <= 6) {
            seg = rawClean;
          }
        }
        add(seg, "情感线索·情感变化", 3);
      }
    } else if (emoHits.length && ansEmo.length) {
      /* 情感一致：只有答案本身就是情感词时，上下文的情感词才是判据
       * （否则「情感一致」会被大量中性叙述误触发，学生也看不出所以然） */
      emoHits.slice(0, 3).forEach(function (e) {
        if (e.inBlank) {
          var wi = tokIndex(e.word);
          if (wi >= 0) add(windowAt(wi, 1, 1), "情感线索·情感一致", 2);
        } else {
          var idx = full.toLowerCase().indexOf(String(e.word).toLowerCase());
          if (idx >= 0) add(windowInSentence(full, idx, 1, 1), "情感线索·情感一致", 2);
        }
      });
    }

    /* ④ 同位解释 / 举例说明：位置在空格之后的解释块
     *    例："... he often __4__ his mom do it—just mix water and flour (面粉)."
     *        → 线索 mix water and flour（"do it" 的同位复述） */
    function tailChunk(fromIdx) {
      var seg = sp.text.slice(fromIdx);
      var mm = /^[\s,\uFF0C\u3001]*((?:just|only|simply)\s+)?([A-Za-z][A-Za-z'\u2019\- ]{3,80}?)(?=[,\uFF0C]|\s*\(|\.|!|\?|$)/.exec(seg);
      if (!mm) return null;
      var ph = mm[2].replace(/[\s\-]+$/, "").trim();
      var wc = (ph.match(/[A-Za-z']+/g) || []).length;
      if (wc < 2 || wc > 6) return null;
      if (full.indexOf(ph) < 0) return null;
      return ph;
    }
    var dm = /(?:\u2014|\u2013|--)\s*/g, dmMatch, dashDone = false;
    while ((dmMatch = dm.exec(sp.text)) !== null) {
      /* 只认空格之后的破折号：它引出的是对空处 / 空前的补充说明（同位复述） */
      if (sp.start + dmMatch.index + dmMatch[0].length <= sp.bEnd) continue;
      var ph = tailChunk(dmMatch.index + dmMatch[0].length);
      if (ph) { add(ph, "同位解释", 2); dashDone = true; break; }
      if (dashDone) break;
    }
    var egRe = /\b(such as|for example|for instance|including)\s+/g, em;
    while ((em = egRe.exec(sp.text)) !== null) {
      if (sp.start + em.index + em[0].length <= sp.bEnd) continue;   // 只在空格之后的举例才算本题线索
      var ph2 = tailChunk(em.index + em[0].length);
      if (ph2) add(ph2, "举例说明", 2);
    }

    /* ⑤ 熟词生义：答案词命中讲义生义表时，把空句作为语境线索 */
    var shift = root.clozeSenseShift(question.answer);
    if (shift) {
      var ctx = windowAt(Math.max(0, bi - 1), 2, 0) || windowAt(bi, 0, 2);
      if (ctx) add(ctx, "熟词生义", 2);
    }

    /* ⑥ 答案本身就是逻辑词 / 关系词（but / although / when / why / if / how …）
     *    此时线索是它「连接的那一侧内容」：
     *      · 转折、并列 —— 连接上文，取空前的实义块
     *      · 时间、条件、因果、让步、疑问、关系 —— 引出下文，取空后的实义块
     *    注意：这里不能再用 CLOZE_LOGIC_WEAK 过滤 —— 句中偶然出现的 when/as 才需要过滤，
     *    答案就是它时反而是全题唯一的抓手（58 道骨架题卡在这一层）。 */
    var ansTxt = String(question.answer || "").trim();
    var ansLogic = root.clozeFindLogic(ansTxt).filter(function (h) {
      return lower(h.word) === lower(ansTxt);
    });
    var BACK_REL = /^(but|and|or|yet|so|however|instead|still|though)$/i;
    var FWD_REL = /^(when|while|if|unless|because|although|as|since|before|after|until|why|how|what|who|whom|whose|which|that|where|whether)$/i;
    if (ansLogic.length || BACK_REL.test(ansTxt) || FWD_REL.test(ansTxt)) {
      var lcat = ansLogic.length ? ansLogic[0].cat : (BACK_REL.test(ansTxt) ? "转折" : "关系词");
      if (BACK_REL.test(ansTxt)) {
        var beforeRel = windowAt(bi - 1, 3, 0) || windowAt(bi - 1, 2, 0) || windowAt(bi - 1, 1, 0);
        if (beforeRel) picks.push({ phrase: beforeRel, type: "逻辑线索·" + lcat, strength: 4 });
      } else {
        var afterRel = windowAt(bi, 0, 5) || windowAt(bi, 0, 3) || windowAt(bi, 0, 2);
        if (afterRel) picks.push({ phrase: afterRel, type: "逻辑线索·" + lcat, strength: 4 });
      }
    }

    /* ⑦ 固定搭配反查：把答案代回空格，看空格两侧是否落在搭配表 / 句型规则里
     *    这条规则回答的是「学生凭什么知道该填这个动词」—— 靠空两边的搭配骨架 */
    var sentWithBlank = sp.text.replace(/__\d+__/g, "____");
    var patHit = null;
    (root.CLOZE_PATTERN_RULES || []).forEach(function (r) {
      if (patHit || !r.pattern) return;
      try { if (r.pattern.test(sentWithBlank)) patHit = r; } catch (e) { /* 规则写错不影响主流程 */ }
    });
    var sideL = windowAt(bi - 1, 1, 0);          // 空格前 2 词
    var sideR = windowAt(bi, 0, 1);              // 空格后 2 词
    /* 空句过短（引号起句、空位就在句首）时，窗前取不到内容，改从整篇取前一句尾部 */
    if (!sideL && !sideR) {
      var gToks = tokenizeWithOffset(full, 0);
      var gbi = 0; while (gbi < gToks.length && gToks[gbi].e <= sp.bi) gbi += 1;
      if (gbi >= 2) {
        var gSeg = full.slice(gToks[Math.max(0, gbi - 3)].s, gToks[gbi - 1].e);
        var sG = gSeg.replace(/^[\s,\uFF0C\u3001\u2014-]+/, "");
        var wcG = sG.split(/\s+/).filter(Boolean).length;
        if (!/[.!?;:]/.test(gSeg) && !CLOZE_CN_RE.test(gSeg) && hasContent(gSeg) &&
            wcG >= 2 && wcG <= 6) {
          sideL = sG;
        }
      }
    }
    /* 词典里能查到 ≥3 词的实义搭配 → 才算「固定搭配」；
     * 命中句型 / 结构规则（动词+介词、系动词+形容词…）→ 标「结构骨架」；
     * 都不命中 → 空两侧的局部框架，标「搭配骨架」，保证每题至少有一条线索可看。 */
    var filled = sentWithBlank.replace(/____/, " " + lower(question.answer) + " ");
    var sentPlain = plain(filled);
    var bankCtx = null;
    var bankArr = ensureBank();
    for (var bi2 = 0; bi2 < bankArr.length && !bankCtx; bi2 += 1) {
      if (bankArr[bi2].wc < 3) continue;
      if (sentPlain.indexOf(" " + bankArr[bi2].p + " ") >= 0) bankCtx = bankArr[bi2];
    }
    var pType = bankCtx ? "固定搭配" : (patHit ? "固定搭配·结构骨架" : "语境线索·搭配骨架");
    var pStrength = bankCtx ? 2 : (patHit ? 2 : 1);
    if (sideR && hasContent(sideR)) add(sideR, pType, pStrength);
    if (sideL && hasContent(sideL)) add(sideL, pType, pStrength);

    /* ---- 合并 ----
     * 原则（2026-09-23）：一条线索要么能被讲义规则解释（逻辑/复现/情感/举例/同位/生义/搭配），
     * 要么至少是「与空格同句的搭配骨架」。两条都够不上的旧窗口一律丢弃，
     * 避免出现学生看着莫明其妙的划线。 */
    var merged = [];
    var blankSentWords = {};
    toks.forEach(function (t) { if (!FUNC_SET[t.lw] && t.lw.length >= 3) blankSentWords[t.lw] = 1; });

    /* 词边界包含判定：避免 "of noodles" 被 "of noodles, such" 误判为同一条 */
    function wb(hay, needle) {
      var h = " " + String(hay).replace(/\s+/g, " ") + " ";
      var nd = " " + String(needle).replace(/\s+/g, " ") + " ";
      return h.indexOf(nd) >= 0;
    }
    function covered(ph) {
      for (var i = 0; i < merged.length; i++) {
        var m = merged[i].phrase;
        if (wb(m, ph)) return { hit: merged[i], longer: false };   // 已有的更完整
        if (wb(ph, m)) return { hit: merged[i], longer: true };    // 新的更完整 → 替换
      }
      return null;
    }
    function put(ph, type, strength, keep) {
      ph = String(ph || "").replace(/\s+/g, " ")
        .replace(/^[\s,\uFF0C\u3001\u2014-]+|[\s,\uFF0C\u3001\u2014-]+$/g, "").trim();
      if (!ph || CLOZE_CN_RE.test(ph)) return;
      if (full.indexOf(ph) < 0 || !cleanPhrase(ph)) return;
      var phToks = ph.split(/\s+/).filter(Boolean);
      /* 全局护栏：与校验器 CLUE_LEN 对齐（2—6 个空格分隔词，且不能全是停用词） */
      if (phToks.length < 2 || phToks.length > 6) return;
      if (phToks.every(function (w) { return VALIDATOR_STOP[w.toLowerCase().replace(/[^a-z]/g, "")]; })) return;
      var hit = covered(ph);
      if (hit) {
        var m = hit.hit;
        if (hit.longer) {
          m.phrase = ph;
          if ((m.strength || 0) <= strength) { m.type = type; m.strength = strength; }
        } else if ((m.strength || 0) < strength) {
          m.type = type; m.strength = strength;
        }
        if (keep) m.keep = true;
        return;
      }
      merged.push({ phrase: ph, type: type, strength: strength || 2, keep: !!keep });
    }

    /* 旧线索准入判定
     * ① 数据层已按新词表标好类型 → 直接沿用，保证「运行时复算」与「落盘数据」结果一致
     * ② 否则按规则重新归因；仍解释不了的，若含同句实词则降级为「搭配骨架」，再否则丢弃 */
    var TYPE_STRENGTH = function (t) {
      var top = String(t || "").split("·")[0];
      var sub = String(t || "").split("·")[1] || "";
      if (top === "语境线索") return 1;
      if (top === "逻辑线索") return (sub === "转折" || sub === "因果" || sub === "让步") ? 3 : (sub === "并列" ? 1 : 2);
      if (top === "复现线索") return (sub === "原词复现" || sub === "派生词复现") ? 3 : 2;
      if (top === "情感线索") return sub === "情感变化" ? 3 : 2;
      if (top === "固定搭配") return t === "固定搭配" ? 2 : 2;
      if (top === "熟词生义" || top === "同位解释" || top === "举例说明") return 2;
      return 2;
    };
    function isNewType(t) {
      if (!t) return false;
      var st = root.CLOZE_CLUE_STYLE[String(t).split("·")[0]];
      return !!(st && st.key !== "other");
    }
    function admitOld(clue) {
      var c = String(clue || "");
      if (!cleanPhrase(c)) return null;                    // 词中截断的碎片直接丢弃
      var stored = (question.clueTypes && question.clueTypes[c]) || "";
      if (isNewType(stored)) return { type: stored, strength: TYPE_STRENGTH(stored) };
      var lg = root.clozeFindLogic(c).filter(function (h) {
        /* 并列连词（and / or）出现在短语内部多半是巧合，不能据此把整条线索判成逻辑线索 */
        return root.CLOZE_LOGIC_WEAK.indexOf(h.word) < 0 && h.cat !== "并列";
      });
      if (lg.length) return { type: "逻辑线索·" + lg[0].cat, strength: TYPE_STRENGTH("逻辑线索·" + lg[0].cat) };
      for (var i = 0; i < repList.length; i++) {
        if (repList[i].dist < 4) continue;
        if (lower(c).indexOf(lower(repList[i].word)) >= 0) {
          return { type: "复现线索·" + repList[i].cat, strength: TYPE_STRENGTH("复现线索·" + repList[i].cat) };
        }
      }
      if (root.clozeFindEmotion(c).length) return { type: "情感线索·情感一致", strength: 2 };
      if (/(?:\u2014|\u2013|--)/.test(c)) return { type: "同位解释", strength: 2 };
      var bank = bankHit(c);
      if (bank) return { type: "固定搭配", strength: 2, note: bank.zh };
      /* 搭配骨架：线索里含一个与空格同句的实词 */
      var cw = (lower(c).match(/[a-z]+/g) || []);
      for (var j = 0; j < cw.length; j++) {
        if (cw[j].length >= 3 && !SHELL[cw[j]] && blankSentWords[cw[j]]) {
          return { type: "语境线索·搭配骨架", strength: 1 };
        }
      }
      return null;
    }
    oldClues.forEach(function (c) {
      var adm = admitOld(c);
      if (adm) put(c, adm.type, adm.strength, true);
    });
    picks.sort(function (a, b) { return b.strength - a.strength || b.phrase.length - a.phrase.length; });
    picks.forEach(function (p) { put(p.phrase, p.type, p.strength, false); });

    /* 保底：一条都没剩下时，把最贴近空格的窗口作为兜底线索 */
    if (!merged.length) {
      var fb = windowAt(bi - 1, 2, 0) || windowAt(bi, 0, 2) || oldClues[0];
      if (fb) put(fb, "语境线索·搭配骨架", 1, true);
    }

    /* 排序：强度优先；同强度时旧线索（人工核过）优先；最后按词面兜底，
     * 保证「运行时复算」与「数据层落盘」得到完全相同的顺序（幂等） */
    merged.sort(function (a, b) {
      return (b.strength || 0) - (a.strength || 0) ||
        ((b.keep ? 1 : 0) - (a.keep ? 1 : 0)) ||
        b.phrase.length - a.phrase.length ||
        (a.phrase < b.phrase ? -1 : (a.phrase > b.phrase ? 1 : 0));
    });

    /* 冗余收束：同类型下两条线索若共享实词，只留最强的一条
     * （例：gave me hope / little bit of hope 都是 hope 的原词复现） */
    var seenWords = [];
    merged = merged.filter(function (m) {
      var ws = (lower(m.phrase).match(/[a-z]+/g) || []).filter(function (w) {
        return w.length >= 3 && !SHELL[w];
      });
      for (var i = 0; i < ws.length; i++) {
        for (var j = 0; j < seenWords.length; j++) {
          if (seenWords[j].type === m.type && seenWords[j].w.indexOf(ws[i]) >= 0) return false;
        }
      }
      seenWords.push({ type: m.type, w: ws });
      return true;
    });

    merged = merged.slice(0, maxClues);

    var clues = merged.map(function (m) { return m.phrase; });
    var types = {};
    merged.forEach(function (m) { types[m.phrase] = m.type; });
    return { clues: clues, clueTypes: types, evidence: picks };
  };

  /* ============================================================
   * 12. 对外 API
   * ============================================================ */
  root.CLOZE_CLUE_API = {
    findLogic: root.clozeFindLogic,
    hasTurn: root.clozeHasTurn,
    findEmotion: root.clozeFindEmotion,
    senseShift: root.clozeSenseShift,
    findRepetition: root.clozeFindRepetition,
    analyze: root.clozeAnalyze,
    buildClues: root.clozeBuildClues,
    blankSpan: blankSpan,
    clueStyle: root.clozeClueStyle,
    splitSentences: splitSentences,
    stem: root.clozeStem,
    sameRoot: root.clozeSameRoot,
    FUNC_SET: FUNC_SET
  };
})(typeof window !== "undefined" ? window : globalThis);
