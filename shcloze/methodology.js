"use strict";

/* ============================================================
 * 知识点训练中心
 * 数据来源：A讲义《完形填空解题终极大招》+ references/ 方法论
 * 每个知识点 = 讲解 + 5-10道专项练习题 + 逐题解析
 * ============================================================ */

window.KNOWLEDGE_POINTS = [
  /* ============ 逻辑线索 ============ */
  {
    id: "kp-logic-parallel",
    title: "并列逻辑：and / or / both...and",
    category: "逻辑线索",
    icon: "⊕",
    explanation: "并列词前后表意一致或属性一致。常考逻辑词：and（和）、or（或者）、both...and...（……和……都）、either...or...（或者……或者……）、not only...but also...（不仅……而且……）、as well as（以及）、neither...nor...（既不……也不……）。\n\n核心原则：看到并列词，空处与上下文方向一致。",
    strategy: "Step 1：找到并列逻辑词。Step 2：判断空格前后的属性/方向。Step 3：选与已知方向一致的选项。",
    questions: [
      { context: "He looked ___ and lively. He greeted the world around him.", options: ["sick","cute","quiet","shy"], answer: "cute", clues: ["and lively"], explanation: "and 连接并列形容词，lively 是褒义，空处也须褒义。cute 与 lively 并列最贴切。" },
      { context: "She was kind and ___. She always helped others and smiled at everyone.", options: ["friendly","angry","rude","shy"], answer: "friendly", clues: ["kind","and","helped others","smiled"], explanation: "and 前后一致，kind 是正向，空处也须正向。friendly 与 kind 并列，后文 helped/smiled 印证。" },
      { context: "The book is both interesting and ___. Children love reading it.", options: ["boring","useful","difficult","scary"], answer: "useful", clues: ["both interesting and","love reading"], explanation: "both...and... 连接两个正向属性，interesting 是褒义，空处也须褒义。useful 符合。" },
      { context: "He not only sings well ___ dances beautifully.", options: ["and","but also","or","nor"], answer: "but also", clues: ["not only","sings well"], explanation: "not only...but also... 是固定并列结构，表「不仅……而且……」。" },
      { context: "You can ___ stay at home or go out to play.", options: ["either","neither","both","all"], answer: "either", clues: ["or go out"], explanation: "either...or... 是固定并列结构，表「或者……或者……」。" }
    ]
  },
  {
    id: "kp-logic-turn",
    title: "转折逻辑：but / however / yet / instead",
    category: "逻辑线索",
    icon: "↔",
    explanation: "转折词前后表意相反或对比。常考逻辑词：but（但是）、however（然而）、yet（然而）、instead（相反）、instead of（代替，作为……的替换）。\n\n核心原则：看到转折词，前后情绪/方向必然相反。",
    strategy: "Step 1：找到转折词。Step 2：判断空格前后的情感方向。Step 3：选与已知方向相反的选项。",
    questions: [
      { context: "Tired but ___, we put the bag in an empty bin.", options: ["surprised","excited","bored","worried"], answer: "excited", clues: ["Tired","but"], explanation: "but 表转折，Tired（疲惫）是负向，空处应填正向词。excited 是正向，符合。" },
      { context: "They had great pains, ___ they were very friendly.", options: ["and","or","but","so"], answer: "but", clues: ["great pains","very friendly"], explanation: "pains（痛苦）是负向，friendly（友好）是正向，前后方向相反，用 but。" },
      { context: "___ after the tree was cut down, the animals left the garden.", options: ["And","But","Or","So"], answer: "But", clues: ["animals left","cut down"], explanation: "前文国王砍树以为能变泳池，后文动物离开导致花园变差，是转折，用 But。" },
      { context: "He doesn't depend on legs, as most skateboarders do. ___, he uses his upper body strength.", options: ["Instead","Because","For","Since"], answer: "Instead", clues: ["doesn't depend on legs","uses his upper body"], explanation: "前说不靠腿，后说靠上半身，是替代/转折关系，用 Instead。" },
      { context: "He drinks milk every day. ___ he likes junk food very much, he only eats it once a week.", options: ["And","But","Although","Because"], answer: "Although", clues: ["likes junk food","only eats it once a week"], explanation: "前说喜欢垃圾食品，后说每周只吃一次，让步转折，用 Although。" },
      { context: "There wasn't one, ___ I decided to take a bus home.", options: ["so","though","but","or"], answer: "so", clues: ["wasn't one","take a bus"], explanation: "前说没有出租车（原因），后说决定坐公交（结果），是因果关系用 so。", route: "因果" },
      { context: "The other monkeys were too afraid to try. ___ the stone monkey was really brave.", options: ["Or","So","But","And"], answer: "But", clues: ["too afraid","really brave"], explanation: "前说其他猴子害怕，后说石猴勇敢，转折关系用 But。" },
      { context: "I wanted to find a taxi but there wasn't one, ___ I decided to take a bus home.", options: ["so","though","but","or"], answer: "so", clues: ["there wasn't one","take a bus"], explanation: "前句「没有出租车」是原因，后句「坐公交」是结果，因果关系用 so。" }
    ]
  },
  {
    id: "kp-logic-cause",
    title: "因果逻辑：because / so / since / as",
    category: "逻辑线索",
    icon: "∵",
    explanation: "因果词前后有因果关系。常考：because（因为）、so（所以）、for/since/as（因为）、because of（因为）、as a result（结果）、therefore（因此）。\n\n核心原则：so 引导结果从句（在后），because 引导原因从句。判断空处是因还是果。",
    strategy: "Step 1：理解文意，判断是因果还是果因。Step 2：选择对应的因果连词。",
    questions: [
      { context: "I cried in silence ___ I failed too many times.", options: ["so","because","before","after"], answer: "because", clues: ["cried in silence","failed too many times"], explanation: "默默哭泣是结果，失败太多次是原因，用 because 引导原因从句。" },
      { context: "There wasn't a taxi, ___ I decided to take a bus.", options: ["so","because","but","or"], answer: "so", clues: ["wasn't a taxi","take a bus"], explanation: "前句「没有出租车」是原因，后句「坐公交」是结果，用 so 引导结果。" },
      { context: "___ his father got a new job there, he had to move to a small town.", options: ["Because","So","But","Or"], answer: "Because", clues: ["got a new job","move to a small town"], explanation: "父亲找到新工作是原因，搬家是结果，用 Because 引导原因从句。" },
      { context: "The fish disappeared right away, ___ I was very upset.", options: ["but","so","because","although"], answer: "so", clues: ["disappeared","upset"], explanation: "鱼溜走是原因，沮丧是结果，用 so 引导结果。" },
      { context: "We saw a lot of children without hair ___ they got special treatment.", options: ["before","because","unless","if"], answer: "because", clues: ["without hair","special treatment"], explanation: "没有头发是因为接受特殊治疗，用 because 引导原因。" }
    ]
  },
  {
    id: "kp-logic-concession",
    title: "让步逻辑：although / though / even if",
    category: "逻辑线索",
    icon: "∠",
    explanation: "让步词表示「尽管前面的条件存在，但后面的结果仍会发生」。常考：although（虽然）、though（虽然，尽管）、even if/even though（即使，纵然）。\n\n核心原则：让步 = 承认一个事实 + 转折。although 句不放 but。",
    strategy: "Step 1：判断前后是否「尽管……但是……」关系。Step 2：选 although/though/even if。",
    questions: [
      { context: "___ he likes junk food very much, he only eats it once a week.", options: ["And","But","Although","Because"], answer: "Although", clues: ["likes junk food","only eats it once a week"], explanation: "前说喜欢垃圾食品，后说每周只吃一次，让步关系用 Although。" },
      { context: "___ the other boys climbed faster than David in the beginning, he reached the top first.", options: ["Although","Because","If","So"], answer: "Although", clues: ["climbed faster","reached the top first"], explanation: "前说别人爬得快，后说 David 先到顶，让步转折用 Although。" },
      { context: "___ she is forced to come up to the front, my aunt will stand in the back.", options: ["Before","But","Since","Unless"], answer: "Unless", clues: ["forced to come up","stand in the back"], explanation: "除非被逼到前面，否则她总站后面。Unless = 除非 = 反向条件。" },
      { context: "___ he was the shortest child in the group, nobody thought he would win.", options: ["Although","Because","So","But"], answer: "Although", clues: ["shortest child","nobody thought he would win"], explanation: "前说他最矮，后说没人觉得他能赢，让步关系用 Although。" },
      { context: "Even ___ the weather was bad, they decided to go hiking.", options: ["if","though","because","so"], answer: "though", clues: ["weather was bad","go hiking"], explanation: "even though = 即使，表让步。天气不好但仍然去爬山。" }
    ]
  },
  {
    id: "kp-logic-condition",
    title: "条件逻辑：if / unless / as long as",
    category: "逻辑线索",
    icon: "▸",
    explanation: "条件词表示「如果条件满足（或不满足），就会产生一定结果」。常考：if（如果）、unless（除非）、as long as（只要）。\n\n核心原则：unless = if not（如果不）。判断空处是正面条件还是反面条件。",
    strategy: "Step 1：理解文意，判断是正面条件还是反面条件。Step 2：选 if/unless/as long as。",
    questions: [
      { context: "The animals wouldn't leave your garden ___ you cut down the tree.", options: ["if","though","so","unless"], answer: "unless", clues: ["wouldn't leave","cut down the tree"], explanation: "动物不会离开你的花园，除非你砍掉树。unless = 除非 = if not。" },
      { context: "___ she is forced to come up to the front, my aunt will stand in the back.", options: ["Before","But","Since","Unless"], answer: "Unless", clues: ["forced to come up","stand in the back"], explanation: "除非被强迫，否则她总站后面。Unless = 除非。" },
      { context: "You can pass the exam ___ you study hard.", options: ["if","unless","but","although"], answer: "if", clues: ["pass the exam","study hard"], explanation: "如果你努力学习，就能通过考试。if = 如果，正面条件。" },
      { context: "As ___ as you keep practicing, you will improve.", options: ["long","far","soon","well"], answer: "long", clues: ["keep practicing","improve"], explanation: "as long as = 只要，表条件。只要坚持练习就会进步。" },
      { context: "We will go camping ___ it rains tomorrow.", options: ["if","unless","because","so"], answer: "unless", clues: ["go camping","rains"], explanation: "我们明天去露营，除非下雨。unless = 除非 = 如果不。" }
    ]
  },

  /* ============ 复现线索 ============ */
  {
    id: "kp-repetition-exact",
    title: "原词复现",
    category: "复现线索",
    icon: "≡",
    explanation: "答案词或同根词在原文别处出现 1—2 次。这是中考完形里每篇都有 3—5 分靠它拿的线索类型。\n\n判定规则：答案词在「空格所在句之外」的句子里原样出现。找到复现词，直接锁定答案。",
    strategy: "Step 1：先看选项，记住各选项的词。Step 2：回到原文找有没有同一个词在别处出现。Step 3：复现处就是线索。",
    questions: [
      { context: "The bus driver greeted him with a ___. ... But Bill only replied with a nod in silence.", options: ["word","nod","hand","smile"], answer: "nod", clues: ["replied with a nod"], explanation: "答案 nod 在下文 \"replied with a nod\" 原词复现，直接锁定。" },
      { context: "The group of boys challenged each other to a game to see who could climb to the top first... Then the ___ started.", options: ["game","order","tour","war"], answer: "game", clues: ["challenged each other to a game"], explanation: "前文 \"a game\" 原词复现，此处指同一个游戏开始了。" },
      { context: "All of the boys tried their best to climb as high as they could. Although the other boys ___ faster than David...", options: ["climbed","walked","flew","ran"], answer: "climbed", clues: ["climb as high as they could"], explanation: "前文 \"climb\" 原词复现，此处指别的男孩爬得更快。" },
      { context: "She looked at me coldly with sad, dark eyes... still ___, she asked.", options: ["nervously","carefully","coldly","kindly"], answer: "coldly", clues: ["looked at me coldly"], explanation: "前文 \"coldly\" 原词复现，此处态度不变。" },
      { context: "We wrote to each other for a time... Have you been in ___ with your friend?", options: ["hope","touch","peace","silence"], answer: "touch", clues: ["wrote to each other","lost touch"], explanation: "前文 \"wrote to each other\" 和后文 \"lost touch\" 原词复现，in touch = 保持联系。" },
      { context: "Emily smiled along with Mrs Blair and listened to the other stories... She had become so interested in Mrs Blair's ___.", options: ["Dreams","hobbies","stories","jokes"], answer: "stories", clues: ["listened to the other stories"], explanation: "前文 \"stories\" 原词复现，此处指对 Mrs Blair 的故事感兴趣。" },
      { context: "His patience made him a great man... We fishermen must be ___.", options: ["patient","excellent","important","brave"], answer: "patient", clues: ["His patience"], explanation: "前文 \"patience\" 原词复现，此处形容词形式 patient。" },
      { context: "I will never forget the ___ fishing trip with him... I realize the first fishing trip taught me more than fishing.", options: ["first","second","third","last"], answer: "first", clues: ["the first fishing trip taught me"], explanation: "末段 \"the first fishing trip\" 原词复现，确认答案是 first。" }
    ]
  },
  {
    id: "kp-repetition-synonym",
    title: "近义词复现",
    category: "复现线索",
    icon: "≈",
    explanation: "原文出现的词和答案同义但不同形。如 store↔shop、gift↔present、hard↔difficult、right↔correct、like↔love。\n\n判定规则：在原文找到与选项同义的词，锁定答案。",
    strategy: "Step 1：浏览选项。Step 2：在原文找与选项同义/近义的词。Step 3：同义词所在句就是线索来源。",
    questions: [
      { context: "He told me he usually ___ home from his company but that day the weather stopped him from going home on foot.", options: ["rode","drove","ran","walked"], answer: "walked", clues: ["going home on foot"], explanation: "\"on foot\" 是 \"walked\" 的近义表达，说明平时步行回家。" },
      { context: "The movie was so ___ that I fell asleep.", options: ["exciting","boring","short","funny"], answer: "boring", clues: ["fell asleep","so"], explanation: "\"fell asleep\"（睡着了）暗示电影无聊，boring 与 asleep 构成近义因果关系。" },
      { context: "She felt ___ after losing her dog. She cried all day and didn't eat anything.", options: ["happy","lonely","calm","excited"], answer: "lonely", clues: ["losing her dog","cried all day"], explanation: "\"losing her dog\"（失去狗）和 \"cried all day\"（哭了一整天）暗示孤独伤心，lonely 是近义推断。" },
      { context: "It was a really ___ problem. No one could work it out easily.", options: ["simple","hard","small","old"], answer: "hard", clues: ["No one could work it out"], explanation: "\"No one could work it out easily\"（没人能轻松解决）暗示难题，hard 与 difficult 近义。" },
      { context: "The teacher was ___ with his progress. She praised him in front of the class.", options: ["angry","pleased","worried","surprised"], answer: "pleased", clues: ["praised him"], explanation: "\"praised him\"（表扬他）暗示老师满意，pleased 与 satisfied/praise 近义。" }
    ]
  },
  {
    id: "kp-repetition-derivative",
    title: "派生词复现（同根词）",
    category: "复现线索",
    icon: "∴",
    explanation: "原文出现的词和答案同词根，但词形/词性不同。如 sing↔singer、happy↔happily、help↔helper、hear↔hearing、silently↔silent。\n\n判定规则：找到与答案同词根的词（去掉后缀/前缀后相同），锁定答案。",
    strategy: "Step 1：浏览选项，记住词根。Step 2：在原文找同词根的词（不同词性）。Step 3：同根词所在句就是线索。",
    questions: [
      { context: "His patience made him a great man... We fishermen must be ___.", options: ["patient","excellent","important","brave"], answer: "patient", clues: ["patience"], explanation: "patience（名词）→ patient（形容词）同词根复现。" },
      { context: "Bill only replied with a nod in ___. He didn't say anything.", options: ["fear","silence","anger","joy"], answer: "silence", clues: ["didn't say anything","replied with a nod"], explanation: "\"didn't say anything\"（什么都没说）暗示沉默，silence 与 silent 同词根。" },
      { context: "The days became warm and ___. Bill had been quiet before.", options: ["silent","noisy","hungry","busy"], answer: "silent", clues: ["in silence","became warm and"], explanation: "前文 \"in silence\" 同词根复现，此处与 warm 并列。" },
      { context: "She was ___ moved by the story. The movement of the characters touched her heart.", options: ["deeply","slowly","quickly","quietly"], answer: "deeply", clues: ["movement","touched her heart"], explanation: "\"movement\" 与 moved 同词根，touched her heart 暗示深受感动，deeply 修饰程度。" },
      { context: "His ___ grew as he watched the plant grow taller each day. He felt happier and happier.", options: ["sadness","happiness","anger","worry"], answer: "happiness", clues: ["happier and happier"], explanation: "\"happier\" 同词根复现，happiness 是名词形式。" }
    ]
  },
  {
    id: "kp-repetition-hypernym",
    title: "上下义词复现",
    category: "复现线索",
    icon: "⊃",
    explanation: "原文出现一个较具体的词（下义词），空处需要它的上位词（上义词），或反过来。如 food↔meat/fruit、animal↔tiger、history↔event。\n\n判定规则：空处是宽泛词（上义），原文有具体词（下义），或反过来。",
    strategy: "Step 1：判断空处需要宽泛词还是具体词。Step 2：在原文找对应的上义词或下义词。",
    questions: [
      { context: "We brought some apples, bananas and oranges. The ___ was fresh and sweet.", options: ["food","fruit","meat","drink"], answer: "fruit", clues: ["apples, bananas and oranges"], explanation: "苹果、香蕉、橙子都是水果（fruit）的下义词，此处需上义词 fruit。" },
      { context: "We saw tigers, lions and elephants at the zoo. These ___ were all from Africa.", options: ["plants","animals","birds","fish"], answer: "animals", clues: ["tigers, lions and elephants"], explanation: "老虎、狮子、大象都是动物（animals）的下义词，此处需上义词。" },
      { context: "He bought a pen, some paper and a ruler. All these ___ were for school.", options: ["food","clothes","stationery","toys"], answer: "stationery", clues: ["pen, some paper and a ruler"], explanation: "笔、纸、尺子都是文具（stationery）的下义词。" },
      { context: "She likes playing basketball, football and tennis. She is good at ___.", options: ["music","art","sports","cooking"], answer: "sports", clues: ["basketball, football and tennis"], explanation: "篮球、足球、网球都是运动（sports）的下义词。" },
      { context: "The doctor gave him some ___: rest, drink water, and take the pills on time.", options: ["advice","money","food","time"], answer: "advice", clues: ["rest, drink water, take the pills"], explanation: "休息、喝水、按时吃药都是具体的建议（advice），此处需上义词。" }
    ]
  },
  {
    id: "kp-repetition-antonym",
    title: "反义词复现",
    category: "复现线索",
    icon: "≠",
    explanation: "原文出现的词和答案互为反义词。如 hot↔cold、right↔wrong、remember↔forget、different↔similar。\n\n判定规则：在转折句中，空处与原文已知词构成反义关系。通常有 but/however 等转折词提示。",
    strategy: "Step 1：找到转折词。Step 2：确定转折前的已知词。Step 3：选与已知词反义的选项。",
    questions: [
      { context: "If someone is unkind, then kindness is missing. If someone is hateful, then ___ is missing.", options: ["trust","love","patience","confidence"], answer: "love", clues: ["hateful","is missing"], explanation: "hateful（仇恨）的反义词是 love（爱），与上句 unkind→kindness 对应。" },
      { context: "The first farm was fantastic, clean and full of tasty milk. However, the second farm was ___.", options: ["large","different","fantastic","modern"], answer: "different", clues: ["However","fantastic, clean and full"], explanation: "However 表转折，后文与 fantastic/clean 相反，different 体现反义复现。" },
      { context: "He used to be rich, but now he was ___.", options: ["wealthy","poor","happy","famous"], answer: "poor", clues: ["rich","but"], explanation: "but 表转折，rich（富有）的反义词是 poor（贫穷）。" },
      { context: "The door was open during the day but ___ at night.", options: ["closed","wide","broken","painted"], answer: "closed", clues: ["open","but"], explanation: "but 表转折，open 的反义词是 closed。" },
      { context: "She remembered the good times but tried to ___ the bad ones.", options: ["recall","forget","keep","tell"], answer: "forget", clues: ["remembered","but"], explanation: "but 表转折，remembered（记住）的反义词是 forget（忘记）。" }
    ]
  },

  {
    id: "kp-repetition-field",
    title: "语义场复现（第5招）",
    category: "复现线索",
    icon: "◎",
    explanation: "爪爪老师：当解题的线索词与正确选项是同一个场景下的词，就为同一语义场。\n\n比如原文场景是医院，正确选项就要与医院有关，如医生/护士/药等；就不选老师/课本等。\n\n判定规则：先圈定本句/本段所属的「场景」（校园、邮寄、医疗、餐饮……），再在选项里找属于同一场景的词，快速破题。",
    strategy: "Step 1：找到空格所在句的场景词（地点、动作、对象）。Step 2：确定场景语义场。Step 3：选与场景同场的选项，排除「凭空出现」的异场词。",
    questions: [
      { context: "Sometimes, there are reading competitions in the library. The ___ can get some books as prizes.", options: ["teachers","actors","patients","winners"], answer: "winners", clues: ["reading competitions","prizes"], explanation: "场景是「阅读比赛发奖品」：能得 prize 的是 winners（获胜者）。teachers/actors/patients 都不在「比赛—奖品」这个语义场里。" },
      { context: "For example, swimming is fun in warm weather just like in summer, but skiing (滑雪) is popular in ___.", options: ["spring","autumn","winter","summer"], answer: "winter", clues: ["skiing","summer"], explanation: "游泳属于夏天的语义场，滑雪（skiing）属于冬天的语义场。but 提示前后对比，选 winter。" },
      { context: "After graduating, he started to work as a ___ in primary and middle schools.", options: ["guide","doctor","teacher","waiter"], answer: "teacher", clues: ["primary and middle schools"], explanation: "「中小学」场景里工作的人是 teacher——语义场复现。guide/doctor/waiter 都不在校园场景。" },
      { context: "He thought they wanted to go to a ___ called the Blue Grotto for dinner.", options: ["museum","restaurant","station","library"], answer: "restaurant", clues: ["for dinner"], explanation: "「去吃饭」决定场所语义场：restaurant（餐厅）。museum/station/library 都不能吃饭。" },
      { context: "They could go to the nearby ___ to buy stamps and put them on envelopes (信封) and letters.", options: ["shop","school","village","post office"], answer: "post office", clues: ["buy stamps","envelopes","letters"], explanation: "买邮票、贴在信封上——「邮寄」语义场的场所是 post office（邮局）。" },
      { context: "In university, I'd like to study traditional Chinese ___. It will be helpful to me. I'm going to be a doctor in the future.", options: ["Kungfu","medicine","festival","business"], answer: "medicine", clues: ["be a doctor in the future"], explanation: "后文「将来当医生」圈定「医学」语义场：traditional Chinese medicine（中医）。" },
      { context: "I'm going to be a doctor in the future. I will help lots of ___ people.", options: ["happy","sick","rich","sad"], answer: "sick", clues: ["be a doctor","medicine"], explanation: "医生救治的是病人——「医疗」语义场里 help 的对象是 sick people。" },
      { context: "I asked him if he needed something to ___ and he said yes. So I ran to buy him a cup of coffee and called the police.", options: ["eat","drink","wear","read"], answer: "drink", clues: ["a cup of coffee"], explanation: "下文「买一杯咖啡」提示「喝」的语义场：something to drink。eat 是同场强干扰（食物≠咖啡）。" }
    ]
  },

  /* ============ 情感线索 ============ */
  {
    id: "kp-emotion-consistency",
    title: "褒贬一致原则",
    category: "情感线索",
    icon: "☺",
    explanation: "句子间若无明显转折，则前后情感态度一致。这是情感线索解题的核心原则。\n\n正向词：happy, joyful, pleased, glad, cheerful, excited, proud, satisfied, thankful, encourage, smile, laugh\n负向词：sad, unhappy, miserable, angry, disappointed, afraid, nervous, worried, upset, hurt, cry, hate\n中性词：fast, new, tall, know, understand\n\n判定规则：找到线索词（形容词/副词/动词），结合有无转折词，判断情感方向是否一致。",
    strategy: "Step 1：找到线索词，结合转折词的有无判断人物情感变化。Step 2：对比选项，选最符合语境情感的选项。",
    questions: [
      { context: "Mr Brown, Mr Smith and Mr King were talking ___. They looked very friendly and pleased.", options: ["quickly","angrily","happily","sadly"], answer: "happily", clues: ["friendly","pleased"], explanation: "friendly 和 pleased 均为正向，且无转折词，情感一致，选正向词 happily。" },
      { context: "My sister and I were ___. It looked like it would be delicious.", options: ["worried","excited","nervous","full"], answer: "excited", clues: ["delicious"], explanation: "\"delicious\"（美味的）是正向，无转折词，空处也须正向，选 excited。" },
      { context: "We could see the ___ and happiness on her face. Her father was so ___ to us that his eyes were full of tears.", options: ["pride; thankful","fear; harmful","courage; humorous","sadness; angry"], answer: "pride; thankful", clues: ["happiness","eyes were full of tears"], explanation: "happiness 是正向，无转折则并列正向词 pride。eyes full of tears 在感恩语境中表 thankful。" },
      { context: "They would ___ me to practise music and celebrate my success. However, the news made them ___.", options: ["encourage; glad","push; kind","stop; unhappy","order; excited"], answer: "stop; unhappy", clues: ["celebrate my success","However","got angry"], explanation: "However 表转折，前正向（encourage→改为stop），后负向（unhappy→got angry 印证）。" },
      { context: "Reading aloud always made Jared ___. As he picked up the book, his hands shook.", options: ["joyful","proud","bored","nervous"], answer: "nervous", clues: ["hands shook","picked up the book"], explanation: "\"hands shook\"（手发抖）是紧张的表现，无转折则情感一致，选 nervous。" },
      { context: "\"Class, Jared helped the kittens out,\" Mrs Thomas announced. Everyone ___.", options: ["doubted","cheered","regretted","complained"], answer: "cheered", clues: ["helped the kittens out"], explanation: "\"helped the kittens out\" 是正向行为，无转折词，大家反应应正向，选 cheered。" },
      { context: "Jared was so ___ that when he read, his hands didn't shake.", options: ["brave","stressed","happy","scared"], answer: "brave", clues: ["hands didn't shake"], explanation: "\"hands didn't shake\"（手不抖了）说明变得勇敢自信，选 brave。" },
      { context: "He was ___ with the result, yet still excited at his marathon journey.", options: ["pleased","strict","unhappy","mad"], answer: "unhappy", clues: ["yet still excited"], explanation: "yet 表转折，后文 excited（正向），转折前应负向，选 unhappy。" }
    ]
  },
  {
    id: "kp-emotion-positive",
    title: "正向情感词识别",
    category: "情感线索",
    icon: "↑",
    explanation: "掌握常见的正向情感词汇，在解题时能快速识别文章的情感走向。\n\n形容词：happy, joyful, pleased, glad, cheerful, excited, thrilled, proud, satisfied, thankful, hopeful, confident, brave, wonderful, excellent, fantastic, friendly, warm, kind, caring\n副词：happily, cheerfully, excitedly, proudly, confidently, warmly, kindly\n动词：cheer, smile, laugh, nod, admire, comfort, encourage, praise, accept, agree, hope, help, support",
    strategy: "识别正向词 → 判断语境情感方向 → 选择匹配的正向选项。",
    questions: [
      { context: "The days became warm and ___. Soon Bill began to talk to other students.", options: ["silent","noisy","bright","cold"], answer: "bright", clues: ["warm","began to talk"], explanation: "warm 是正向，and 并列也须正向。began to talk 说明氛围变好，bright 符合。" },
      { context: "She gave each of us a big hug. We could see the pride and ___ on her face.", options: ["happiness","fear","anger","sadness"], answer: "happiness", clues: ["big hug","pride"], explanation: "big hug 和 pride 都是正向，and 并列也须正向，选 happiness。" },
      { context: "His father came and said ___, \"Son, don't be sad.\"", options: ["angrily","kindly","coldly","loudly"], answer: "kindly", clues: ["don't be sad"], explanation: "\"don't be sad\" 是安慰语气，kindly（温和地）是正向副词。" },
      { context: "They loved and trusted him, so they ___ the promise to make him their king.", options: ["asked","kept","broke","forgot"], answer: "kept", clues: ["loved and trusted"], explanation: "loved and trusted 是正向，so 结果也须正向，keep the promise（守信）是正向。" },
      { context: "Everyone has a ___ to be great. We shouldn't give up easily.", options: ["duty","rule","chance","problem"], answer: "chance", clues: ["be great","shouldn't give up"], explanation: "\"be great\" 和 \"shouldn't give up\" 是正向鼓励，chance（机会）是正向词。" }
    ]
  },
  {
    id: "kp-emotion-negative",
    title: "负向情感词识别",
    category: "情感线索",
    icon: "↓",
    explanation: "掌握常见的负向情感词汇，在转折句中快速识别情感反转。\n\n形容词：sad, unhappy, miserable, painful, angry, mad, annoyed, disappointed, afraid, scared, fearful, anxious, nervous, worried, upset, regretful, sorry, ashamed, unsure, tired, terrible, awful, bad\n副词：sadly, unhappily, angrily, nervously, worriedly, coldly, terribly\n动词：hurt, fear, cry, hate, dislike, disagree, refuse, doubt, regret, worry, fail, lose, complain",
    strategy: "识别负向词 → 在转折句中推断反方向 → 选择匹配的负向选项。",
    questions: [
      { context: "He felt ___ in the new town. He said nothing and just looked out of the window.", options: ["happy","lonely","excited","busy"], answer: "lonely", clues: ["said nothing","looked out of the window"], explanation: "\"said nothing\"（什么都不说）暗示消极情绪，lonely 符合孤独的心境。" },
      { context: "When I was very ___, I felt a fish biting! My heart beat fast.", options: ["surprised","proud","upset","relaxed"], answer: "upset", clues: ["but I still got nothing"], explanation: "前文反复失败一无所获，心情沮丧时鱼才上钩，upset 符合。" },
      { context: "Unluckily, the fish disappeared ___. I cried in silence.", options: ["just now","right away","at times","slowly"], answer: "right away", clues: ["Unluckily","cried in silence"], explanation: "Unluckily（不幸地）是负向，鱼立刻溜走导致哭泣，right away 符合。" },
      { context: "I cried in silence because I failed too many times. Just at that time, my uncle ___ me to keep on trying.", options: ["encouraged","invited","warned","stopped"], answer: "encouraged", clues: ["cried in silence","keep on trying"], explanation: "前文负向（哭/失败），uncle 的动作让他继续尝试，encourage 是正向转折。" },
      { context: "The king was very ___ with the old tree. It was so old and dry.", options: ["happy","pleased","angry","proud"], answer: "angry", clues: ["old and dry","cut it down"], explanation: "old and dry 是负向描述，国王砍掉它说明讨厌，angry 符合。" }
    ]
  },

  /* ============ 取证方法（爪爪技能二·箭头法 + 技能四 15/16 招） ============ */
  {
    id: "kp-arrow-position",
    title: "箭头法：线索在哪里（第6/7/8招）",
    category: "取证方法",
    icon: "➜",
    explanation: "爪爪老师：做题时，用箭头指向答案的线索，让每个答案都有迹可循。\n\n三档取证范围（由近及远）：\n• 第6招 线索在题的所在句——最简单，本句结构（主语/因果词/并列词）就能定答案；\n• 第7招 线索在题的上、下句——线索悄悄藏在上句或下句里；\n• 第8招 线索在题的上、下段——整段乃至跨段的场景、因果、对比。\n\n做题顺序：先把所在句和上下句用尽，才动用上下段——近处有证据就不浪费。",
    strategy: "Step 1：先看空格所在句有没有结构信号（主语、because/and/but 等）。Step 2：没有就找上、下句。Step 3：还没有再扩大到上、下段。每一步都用箭头把线索词画出来。",
    questions: [
      { context: "Video is particularly helpful as it can be ___ many times, with the presenters focusing on one part at a time.", options: ["found","sold","cleared","watched"], answer: "watched", clues: ["Video","many times"], explanation: "第6招·所在句：主语 Video 决定动词——视频能被「反复观看」（watched many times）。" },
      { context: "Her sister wrote the original lyrics for the song while she was a teacher in a kindergarten, where Mildred also ___.", options: ["taught","searched","sold","prepared"], answer: "taught", clues: ["a teacher in a kindergarten"], explanation: "第6招·所在句：她在幼儿园当 teacher，那里的 Mildred 也「教书」（taught）。" },
      { context: "Because of their accuracy, the reports were ___.", options: ["strange","popular","terrible","useless"], answer: "popular", clues: ["Because of their accuracy"], explanation: "第6招·所在句因果链：因为准确（正向），所以受欢迎（popular）——方向一致。" },
      { context: "The dolphins seemed worried. They ___ the water with their tails.", options: ["held","hit","cleaned","provided"], answer: "hit", clues: ["seemed worried","with their tails"], explanation: "第7招·上句：海豚「不安」+ 本句「用尾巴___水」——hit the water（拍水）是不安的表现。" },
      { context: "According to several recent surveys, some people fear public speaking more than anything else. ___, this fear can be overcome with two simple methods: practice and using positive energy from the audience.", options: ["Luckily","Suddenly","Sadly","Terribly"], answer: "Luckily", clues: ["this fear can be overcome"], explanation: "第7招·下句：恐惧「能被简单方法克服」是好消息——下句的情感方向决定本空填 Luckily。" },
      { context: "Do you know that the \"Happy Birthday to You\" song is the first song sung in outer space? Apollo IX astronauts ___ it on March 8, 1969.", options: ["saved","wrote","invented","sang"], answer: "sang", clues: ["the first song sung in outer space"], explanation: "第7招·上下句衔接：上句说它是「在外太空唱响的第一首歌」，下句的动词自然是 sang。" },
      { context: "\"If we cut down too many trees, the forest will disappear. If we don't cut down any trees, we won't get any resources from the forest. We have to find the right ___,\" the ecologist said.", options: ["mystery","temperature","balance","symbol"], answer: "balance", clues: ["If we cut down too many trees","If we don't cut down any trees"], explanation: "第8招·上段：砍太多树森林消失、不砍又没资源——两种极端之间找的是 balance（平衡）。" },
      { context: "Amelia read all she could about gorillas and learned what they like to ___. She wondered if they were getting the right foods.", options: ["eat","bite","fight","kick"], answer: "eat", clues: ["the right foods"], explanation: "第7招·下句：「吃对食物」（right foods）圈定 eat 的语义场，bite/fight/kick 与食物无关。" }
    ]
  },
  {
    id: "kp-punctuation",
    title: "标点符号解题法（第15招）",
    category: "取证方法",
    icon: "❝",
    explanation: "爪爪老师：小小的标点符号背后藏着大大的学问。感叹号意味着语气的加重。破折号和冒号都有解释说明的作用——小符号，大解题！\n\n• 感叹号！：语气加重，填情感强烈的词；\n• 破折号——：后文解释前文，答案就藏在解释里；\n• 冒号：：列举或解释前文，冒号后的内容与前空同场。",
    strategy: "Step 1：看空格前后有没有 ！/——/：。Step 2：有感叹号→判断强情感方向（褒/贬）。Step 3：有破折号/冒号→把后面的解释内容当作答案的定义来选词。",
    questions: [
      { context: "My brother offered me the tickets. I was really ___!", options: ["relaxed","embarrassed","excited","encouraged"], answer: "excited", clues: ["!","offered me the tickets"], explanation: "感叹号=语气加重：哥哥送我演唱会门票，兴奋到感叹——excited。" },
      { context: "To my complete ___, when I reached the platform, I saw that the train had just left!", options: ["satisfaction","hope","surprise","joy"], answer: "surprise", clues: ["the train had just left!"], explanation: "火车刚开走 + 感叹号 = 错愕的强语气：to my surprise（令我惊讶的是）。" },
      { context: "Ally is a buddy for Clara, a kid with very few language skills. She is also a bit ___! She likes running away.", options: ["wild","friendly","easy-going","strict"], answer: "wild", clues: ["!","likes running away"], explanation: "感叹号提示语气加重，后句「她喜欢跑掉」解释前句——有点野（wild）。" },
      { context: "Rani's ___—her warm smile, her nods, her 'I'm here for you' attitude—were all silent signals that didn't travel through wires.", options: ["forgiveness","eagerness","friendliness","skillfulness"], answer: "friendliness", clues: ["—her warm smile, her nods"], explanation: "破折号后解释前文：warm smile、nods、「我在你身边」的态度都是「友好」的表现——friendliness。" },
      { context: "The small town does not get direct sunlight from late September to mid-March—___ six months out of the year.", options: ["only","obviously","nearly","precisely"], answer: "nearly", clues: ["—late September to mid-March"], explanation: "破折号后是换算说明：9 月底到 3 月中 ≈ 将近（nearly）六个月。" },
      { context: "There was a/an ___ black bear cub—no more than two feet tall with a lovely face. It was playing joyfully.", options: ["adorable","aggressive","injured","large"], answer: "adorable", clues: ["—no more than two feet tall with a lovely face"], explanation: "破折号解释前文：不超过两英尺、脸蛋可爱、欢快玩耍——adorable（惹人喜爱的）。" },
      { context: "They set up camp—two ___, one for his parents and one for himself and Jared.", options: ["beds","rooms","tents","plates"], answer: "tents", clues: ["set up camp","one for... one for..."], explanation: "破折号后解释前文：扎营（set up camp）搭的是两个帐篷（tents）。" },
      { context: "Other times, he would join student groups to discuss a variety of ___: agriculture, diving and mathematics.", options: ["questions","subjects","matters","contents"], answer: "subjects", clues: [": agriculture, diving and mathematics"], explanation: "冒号后列举解释前文：农业、潜水、数学都是「学科」（subjects）。" }
    ]
  },
  {
    id: "kp-substitute",
    title: "代入答案法（第16招）",
    category: "取证方法",
    icon: "✓",
    explanation: "爪爪老师：做题时，可以将答案填进空中并通读全文，看逻辑是否通顺。这个方法可以大大提高正确率，与箭头法搭配，使用效果更佳！\n\n如果箭头法也做不出来，不妨利用答案倒推：这道题为什么选这个答案？去寻找选择这个答案的线索，训练自己的线索意识。\n\n三步通读：①把选项代回空中；②连读空格前后两句；③看逻辑是否前后矛盾——矛盾就换下一个。",
    strategy: "Step 1：圈出最有把握的两个选项。Step 2：分别代回空中，连读前后句。Step 3：留下代入后前后因果、情感都通顺的那个；矛盾即排除。",
    questions: [
      { context: "I practiced the speech again and again until I could say it without looking at my notes. On the big day, I walked onto the stage ___.", options: ["confidently","nervously","angrily","sadly"], answer: "confidently", clues: ["practiced again and again","without looking at my notes"], explanation: "代入验证：confidently 代回——练习充分→不看讲稿→自信上台，一条线通顺。代 nervously 则与「反复练习到脱稿」矛盾。" },
      { context: "Grandpa kept every ticket from our trips. He said they were ___ of the best days we spent together.", options: ["promises","memories","records","plans"], answer: "memories", clues: ["kept every ticket","the best days"], explanation: "把 memories 代回通读：攒票根=保存美好日子的回忆。records（记录）代回与 kept 语义重复，且与 best days 的情感不接。" },
      { context: "The river was polluted, so the fish left. Now the water is clean again and the fish have ___.", options: ["returned","disappeared","died","grown"], answer: "returned", clues: ["the water is clean again"], explanation: "代入验证：水变干净→鱼回来了，因果通顺。disappeared/died 与 clean again 矛盾；grown 与 fish 搭配不当。" },
      { context: "Everyone thought Tim would give up halfway. ___, he finished the whole race with a smile.", options: ["Instead","Therefore","Besides","Anyway"], answer: "Instead", clues: ["give up halfway","finished with a smile"], explanation: "把 Instead 代回：大家以为他放弃→（相反）他跑完全程——预期与事实反转，通顺。Therefore 代回则前后因果矛盾。" },
      { context: "The library is quiet and bright. It is a good ___ to read and do homework.", options: ["place","time","weather","ticket"], answer: "place", clues: ["quiet and bright","read and do homework"], explanation: "代入通读：安静明亮是描述场所的词→「好地方」。time 代回与 quiet and bright 不搭——矛盾即排除。" }
    ]
  },

  /* ============ 固定搭配 ============ */
  {
    id: "kp-collocation-verb",
    title: "动词短语搭配",
    category: "固定搭配",
    icon: "∨",
    explanation: "中考高频动词短语分类记忆。常考动词：come, get, look, put, give, run, hear, turn, talk, call, take, make + 介词/副词。\n\n核心原则：先识别结构（动词+副词/介词），再代回语境验证。搭配能排除至少一个干扰项才算有效。",
    strategy: "Step 1：识别空格前后的动词/介词结构信号。Step 2：回忆常见搭配。Step 3：代回语境验证。",
    questions: [
      { context: "He told me he usually walked home from his company but that day the weather stopped him from going home on foot. He had to ___ a bus.", options: ["get on","put on","try on","turn on"], answer: "get on", clues: ["a bus"], explanation: "get on a bus = 上公交车，固定搭配。put on 穿衣、try on 试穿、turn on 打开，都不搭配 bus。" },
      { context: "A good lifestyle helps him keep healthy. He has good eating habits. He drinks milk every day. He only plays computer games on weekends. He never ___ up late.", options: ["stays","grows","looks","gives"], answer: "stays", clues: ["up late"], explanation: "stay up late = 熬夜，固定搭配。grow up 长大、look up 查找、give up 放弃都不搭配 late。" },
      { context: "When we meet problems, we shouldn't ___ up easily.", options: ["give","take","look","put"], answer: "give", clues: ["up easily","shouldn't"], explanation: "give up = 放弃，固定搭配。give up easily = 轻易放弃，与 try bravely 形成对照。" },
      { context: "Just like the Monkey King, we should try bravely and make our dream ___ true.", options: ["come","go","get","turn"], answer: "come", clues: ["make our dream"], explanation: "make one's dream come true = 实现梦想，固定搭配。come true 不可拆。" },
      { context: "People ___ out of money when they spend too much.", options: ["run","come","give","take"], answer: "run", clues: ["out of money"], explanation: "run out of = 用完/耗尽，固定搭配。run out of money = 钱花光了。" },
      { context: "Don't ___ off the light. I need to read.", options: ["turn","put","take","give"], answer: "turn", clues: ["off the light"], explanation: "turn off = 关闭，固定搭配。turn off the light = 关灯。" },
      { context: "She ___ after the old man every day after school.", options: ["looks","takes","gives","puts"], answer: "looks", clues: ["after the old man"], explanation: "look after = 照顾，固定搭配。look after the old man = 照顾老人。" },
      { context: "They ___ up with a great idea to solve the problem.", options: ["came","gave","took","put"], answer: "came", clues: ["up with","idea"], explanation: "come up with = 想出/提出，固定搭配。come up with an idea = 想出主意。" }
    ]
  },
  {
    id: "kp-collocation-prep",
    title: "介词短语搭配",
    category: "固定搭配",
    icon: "⊙",
    explanation: "中考高频介词短语。常考分类：\n• in：in silence（沉默地）、in danger（危险中）、in return（作为回报）、in fact（事实上）、in a hurry（匆忙）、in public（公开地）\n• on：on time（准时）、on foot（步行）、on purpose（故意地）、on duty（值班）\n• at：at first（起初）、at last（最后）、at once（立刻）、at times（有时）\n• by：by accident（偶然）、by mistake（错误地）、by hand（手工）",
    strategy: "Step 1：识别空格前后的介词。Step 2：回忆介词短语。Step 3：代回语境验证。",
    questions: [
      { context: "But Bill only replied with a nod in ___. He didn't say anything.", options: ["fear","silence","anger","joy"], answer: "silence", clues: ["in","didn't say anything"], explanation: "in silence = 沉默地，固定介词短语。\"didn't say anything\" 印证沉默。" },
      { context: "Bill started to like the new school because its doors were always open to ___ students.", options: ["its","your","her","their"], answer: "its", clues: ["the new school","doors"], explanation: "doors 属于 the new school，物主代词用 its。" },
      { context: "All of a ___, things changed. He felt lonely in the new town.", options: ["day","sudden","hour","minute"], answer: "sudden", clues: ["All of a","things changed"], explanation: "all of a sudden = 突然，固定短语。" },
      { context: "The bus driver greeted him warmly in a gentle ___.", options: ["voice","sound","noise","tone"], answer: "voice", clues: ["in a gentle","greeted him warmly"], explanation: "in a ... voice = 用……的声音，固定搭配。gentle voice = 温和的声音。" },
      { context: "Isn't it better that I'm large and happy, ___ being unhealthy and too slim?", options: ["except for","because of","according to","instead of"], answer: "instead of", clues: ["better","being unhealthy"], explanation: "instead of = 而不是，固定介词短语。前后对比两种状态。" }
    ]
  },
  {
    id: "kp-collocation-idiom",
    title: "习惯表达与句型结构",
    category: "固定搭配",
    icon: "★",
    explanation: "中考常考句型结构：\n• so...that...（如此……以至于）\n• too...to...（太……而不能）\n• as...as...（和……一样）\n• it is + adj + for sb to do（做某事对某人来说怎样）\n• not only...but also...（不仅……而且）\n• either...or... / neither...nor...（要么……要么/既不……也不）\n• had better do sth（最好做某事）\n• used to do sth（过去常常做）",
    strategy: "Step 1：识别句型结构信号词（so/too/as/not only等）。Step 2：根据结构要求选词。Step 3：代回验证。",
    questions: [
      { context: "The other monkeys were ___ afraid to try. But the stone monkey was really brave.", options: ["too","hardly","seldom","very"], answer: "too", clues: ["afraid to try"], explanation: "too...to... = 太……而不能。too afraid to try = 太害怕而不敢尝试。" },
      { context: "Life was much better than before, as he knew them as ___ as they knew him.", options: ["well","little","fast","much"], answer: "well", clues: ["as he knew them","as they knew him"], explanation: "as...as... 中间用原级。as well as = 和……一样好。" },
      { context: "The movie was so ___ that I fell asleep.", options: ["exciting","boring","short","interesting"], answer: "boring", clues: ["so","that","fell asleep"], explanation: "so...that... = 如此……以至于。fell asleep 说明电影无聊，选 boring。" },
      { context: "It is ___ for students to read every day.", options: ["important","importance","importantly","more important"], answer: "important", clues: ["It is","for students to read"], explanation: "It is + adj + for sb to do 结构，空处需形容词，选 important。" },
      { context: "He used to ___ in a big city, but now he lives in a small town.", options: ["live","living","lived","lives"], answer: "live", clues: ["used to"], explanation: "used to do sth = 过去常常做某事，后接动词原形。" }
    ]
  },

  {
    id: "kp-collocation-vtoing",
    title: "动词 + doing / to do / done（爪爪考点3）",
    category: "固定搭配",
    icon: "⨀",
    explanation: "爪爪老师：动词后接 doing 还是不定式 to do，是中考高频考点。记住接续规则：\n\n• want / ask sb / would like + to do\n• enjoy / finish / practise / mind + doing\n• help sb (to) do / make sb do / let sb do（省 to 不定式）\n• see / watch / hear sb do（做过）vs see sb doing（正在做）\n\n核心原则：先看空格前的动词是哪一类，再代回语境验证。",
    strategy: "Step 1：找到空格前最近的动词（want/ask/enjoy/help/make…）。Step 2：回忆该动词的接续规则。Step 3：代回语境验证语义。",
    questions: [
      { context: "If you want ___ your curiosity, come in and look round.", options: ["to satisfy","satisfy","to satisfying","satisfying"], answer: "to satisfy", clues: ["want"], explanation: "want to do sth：want 后接不定式 to satisfy。" },
      { context: "Running is a good exercise. It helps ___ strong hearts and lungs (肺).", options: ["build","builds","building","built"], answer: "build", clues: ["helps","Running is a good exercise"], explanation: "help (to) do sth：help 后接动词原形（to 可省略）。" },
      { context: "He asked his daughter ___ back and get the other of shoes for him.", options: ["come","to come","go","to go"], answer: "to come", clues: ["asked his daughter","get...for him"], explanation: "ask sb to do sth：ask 后接 sb to do；回来帮他拿鞋，方向用 come back。" },
      { context: "Men and women of all ages enjoy ___. Early in the morning, you can see people running in big cities.", options: ["run","running","laugh","laughing"], answer: "running", clues: ["enjoy","see people running"], explanation: "enjoy doing sth：enjoy 后接动名词；下文 see people running 印证。" },
      { context: "After walking, some people show themselves off on WeChat. This can make them ___ from each other and keep exercising.", options: ["to learn","learn","learning","learnt"], answer: "learn", clues: ["make them","keep exercising"], explanation: "make sb do sth：make 后接省 to 的动词原形。" },
      { context: "Last month, Patti died in a car accident. But after her death, her heart is helping her father ___.", options: ["live","living","to living","dead"], answer: "live", clues: ["helping her father"], explanation: "help sb (to) do sth：help 后接动词原形。她捐献的心脏帮父亲继续「活着」。" }
    ]
  },

  /* ============ 一词多义 ============ */
  {
    id: "kp-polysemy",
    title: "熟词生义",
    category: "一词多义",
    icon: "∞",
    explanation: "中考常考的熟词生义：\n• serve：熟义「服务」→ 生义「上菜/端饭」\n• free：熟义「免费的/自由的」→ 生义「释放/使自由」\n• travel：熟义「旅行」→ 生义「流动/行进」\n• miss：熟义「想念」→ 生义「错过/未注意到」\n• place：熟义「地方」→ 生义「放置」\n• recognise：熟义「认出」→ 生义「意识到/承认」\n• touch：熟义「触摸」→ 生义「打动/感动」\n• dry：熟义「干燥的」→ 生义「擦干」\n• head：熟义「头」→ 生义「朝……前进」\n• last：熟义「最后的」→ 生义「持续」\n• matter：熟义「问题」→ 生义「要紧/重要」\n• work：熟义「工作」→ 生义「起作用/运转」",
    strategy: "Step 1：理解句意，推断空处含义。Step 2：借助单词熟义和语境提示，推测生义。Step 3：代入验证。",
    questions: [
      { context: "We had to say \"thank you\" when our food was ___, and eat everything on our plates.", options: ["cooked","eaten","prepared","served"], answer: "served", clues: ["food","say thank you","eat everything"], explanation: "serve 的熟义是「服务」，生义是「上菜/端饭」。food was served = 食物被端上来。" },
      { context: "They take the fish back to the river and ___ it.", options: ["swim","free","let","look"], answer: "free", clues: ["take the fish back to the river"], explanation: "free 的熟义是「免费的/自由的」，生义是「释放」。把鱼放回河里 = 释放。" },
      { context: "This water has ___ a long way. This water comes from rain in the sky.", options: ["pulled","walked","rushed","travelled"], answer: "travelled", clues: ["a long way","comes from rain"], explanation: "travel 的熟义是「旅行」，生义是「流动/行进」。水流动了很长一段路。" },
      { context: "When we were late and ___ the truck, Martin would be very disappointed.", options: ["caught","missed","changed","noticed"], answer: "missed", clues: ["were late","disappointed"], explanation: "miss 的熟义是「想念」，生义是「错过」。错过垃圾车 = 没赶上。" },
      { context: "He carefully ___ the hat on his head and started walking along the street.", options: ["raised","placed","dropped","repaired"], answer: "placed", clues: ["carefully","on his head"], explanation: "place 的熟义是「地方」，生义是「放置」。把帽子放在头上。" },
      { context: "She ___ me with her kindness and I think people like her make the world a better place.", options: ["beats","encourages","wins","touches"], answer: "touches", clues: ["kindness","make the world a better place"], explanation: "touch 的熟义是「触摸」，生义是「打动/感动」。被她的善良打动了。" },
      { context: "Then the little boy ___ his tears and thought over and over.", options: ["believed","dried","collected","tasted"], answer: "dried", clues: ["tears","thought over"], explanation: "dry 的熟义是「干燥的」，生义是「擦干」。擦干眼泪然后思考。" },
      { context: "We should ___ the way for the next generation to follow.", options: ["head","lead","find","make"], answer: "head", clues: ["the way","follow"], explanation: "head 的熟义是「头」，生义是「朝……前进/领头」。head the way = 领路。" }
    ]
  },

  /* ============ 语法考点（爪爪技能六） ============ */
  {
    id: "kp-grammar",
    title: "语法结构考点（考点7-11）",
    category: "语法考点",
    icon: "⚙",
    explanation: "爪爪老师：完形填空除了考语义，还考语法结构。常考五类：\n\n• 考点7 名词单复数：a/an 与单数、these/those 与复数；不规则变化 man→men、tooth→teeth、mouse→mice；trousers/glasses 恒复数；news/maths 形复实单；\n• 考点8 时态与语态：yesterday→过去时；by sb→被动；and 并列的动词时态一致；\n• 考点9 比较级与最高级：in/of 范围 + some of → 最高级；\n• 考点10 代词：主格作主语、宾格作宾语；物主代词看所属；\n• 考点11 宾语从句：陈述语序（不倒装）；有 or not 用 whether；完整陈述句用 that 引导。",
    strategy: "Step 1：看空格前后有没有结构信号（be 动词/by/yesterday/and/or not/in the world）。Step 2：按对应语法规则锁定词形。Step 3：代回验证。",
    questions: [
      { context: "There are many children in the park. They are ___ happily.", options: ["playing","sing","dance","to talk"], answer: "playing", clues: ["They are"], explanation: "考点8·进行时：be 动词已给出（are），后接 doing——are playing 正在玩耍。" },
      { context: "The sick boy ___ to hospital by the police yesterday.", options: ["is taken","was taken","takes","took"], answer: "was taken", clues: ["by the police","yesterday"], explanation: "考点8·被动+过去：yesterday 定过去时，by the police 定被动——was taken。" },
      { context: "Sam opened the door and ___ a lovely dog outside.", options: ["finds","found","has found","will find"], answer: "found", clues: ["opened the door and"], explanation: "考点8·并列一致：and 并列的动词时态一致，opened 是过去式，and 后用 found。" },
      { context: "In autumn, my father often takes ___ and my brothers to climb mountains.", options: ["I","me","my","mine"], answer: "me", clues: ["takes... and my brothers"], explanation: "考点10·宾格：takes 的宾语用宾格 me，与 my brothers 并列同作宾语。" },
      { context: "We have noticed the problems, and ___ will be discussed at the meeting.", options: ["you","it","they","us"], answer: "they", clues: ["the problems"], explanation: "考点10·主格复数：指代复数 the problems 用 they，作从句主语用主格。" },
      { context: "I wonder where he ___.", options: ["does","does live","live","lives"], answer: "lives", clues: ["wonder where he"], explanation: "考点11·宾语从句陈述语序：主语 he 后直接跟谓语 lives，不加 does、不用倒装。" },
      { context: "He asked me ___ I could sing the song \"My Heart Will Go On\" or not.", options: ["if","whether","what","that"], answer: "whether", clues: ["or not"], explanation: "考点11：后面有 or not 时只能用 whether...or not。" },
      { context: "However, we all know ___ most cars, motorcycles, boats and planes cause air pollution.", options: ["how","why","when","that"], answer: "that", clues: ["we all know","cause air pollution"], explanation: "考点11：从句本身是完整陈述句，用 that 引导。" },
      { context: "Leonardo da Vinci painted some of ___ pictures in the world.", options: ["less famous","more famous","the least famous","the most famous"], answer: "the most famous", clues: ["in the world","some of"], explanation: "考点9·最高级：in the world 是最大范围，some of 后接最高级——the most famous。" }
    ]
  },

  /* ============ 常识推理（爪爪技能七） ============ */
  {
    id: "kp-commonsense",
    title: "常识推理法（考点12/13）",
    category: "常识推理",
    icon: "◈",
    explanation: "爪爪老师：用知识积累来破题。\n\n• 考点12 文化常识：名人国籍与成就、名画名胜、首都国旗、节日习俗；\n• 考点13 生活常识：四季温度、场所物品、日常行为逻辑。\n\n这类题不靠上下文取证，靠「你怎么看世界」——但答案仍要代回原文通读验证，与文章场景一致才算对。",
    strategy: "Step 1：识别题目考的是哪类常识（人物/地理/节日/生活场景）。Step 2：调动已知知识直接锁定。Step 3：代回原文验证与场景一致。",
    questions: [
      { context: "Leonardo da Vinci was a great artist. He lived in ___ in the fifteenth and sixteenth centuries.", options: ["China","France","America","Italy"], answer: "Italy", clues: ["Leonardo da Vinci"], explanation: "文化常识：达·芬奇是意大利文艺复兴艺术家，生活在意大利。" },
      { context: "Leonardo da Vinci ___ painting Mona Lisa in 1503.", options: ["finished","stopped","began","forgot"], answer: "began", clues: ["in 1503","Mona Lisa"], explanation: "文化常识：《蒙娜丽莎》约 1503 年开始创作——began painting。" },
      { context: "The first railway lines branched (分岔) out of the ___ of France, Paris, to connect all the big cities of the time.", options: ["area","village","capital","town"], answer: "capital", clues: ["of France, Paris"], explanation: "常识：Paris 是法国首都——同位语直接给出答案 capital。" },
      { context: "As we all know, great ___, such as Einstein, Newton and Galileo, didn't learn many things from school.", options: ["workers","scientists","doctors","students"], answer: "scientists", clues: ["Einstein, Newton and Galileo"], explanation: "常识：爱因斯坦、牛顿、伽利略都是科学家（scientists）。" },
      { context: "In summer, it will be cool and in winter it will be ___, so it will be comfortable.", options: ["cold","warm","hot","cool"], answer: "warm", clues: ["In summer... cool","in winter"], explanation: "生活常识：夏天凉快、冬天温暖才舒适——与夏天的 cool 对应，冬天是 warm。" },
      { context: "There will be a beautiful garden in front of it. We can see many trees and ___ in it.", options: ["flowers","books","chairs","lights"], answer: "flowers", clues: ["beautiful garden","trees and"], explanation: "常识：花园里是树和花——trees and flowers 同一语义场并列。" },
      { context: "The teachers won't use ___ to write on the blackboard.", options: ["pens","chalk","pencils","paper"], answer: "chalk", clues: ["write on the blackboard"], explanation: "生活常识：在黑板上写字用粉笔（chalk）。" },
      { context: "During Chinese New Year, ___ is (are) put inside red packets which are then handed out to younger generations by their parents, grandparents, relatives, and even close neighbors and friends.", options: ["paper","money","letters","notes"], answer: "money", clues: ["red packets","Chinese New Year"], explanation: "文化常识：过年红包里装的是压岁钱（money）。" }
    ]
  }
];

/* ==================== 知识点训练逻辑 ==================== */
var kpCurrent = null;      // 当前知识点
var kpQIndex = 0;           // 当前题号
var kpAnswers = {};         // 答题记录
var kpChecked = {};        // 已检查

function renderKnowledgePoints() {
  var listView = $("kpListView");
  if (!listView) return;

  // 按类别分组
  var categories = {};
  window.KNOWLEDGE_POINTS.forEach(function (kp) {
    if (!categories[kp.category]) categories[kp.category] = [];
    categories[kp.category].push(kp);
  });

  var html = "";
  Object.keys(categories).forEach(function (cat) {
    html += '<div class="kp-category-block">';
    html += '<h2 class="kp-category-title">' + escapeHtml(cat) + '</h2>';
    html += '<div class="kp-grid">';
    categories[cat].forEach(function (kp) {
      var doneCount = Object.keys(kpChecked).filter(function (k) {
        return k.indexOf(kp.id + "-") === 0 && kpChecked[k];
      }).length;
      var totalQ = kp.questions.length;
      var isComplete = doneCount >= totalQ;
      html += '<div class="kp-card' + (isComplete ? " done" : "") + '" data-kp-id="' + escapeHtml(kp.id) + '">';
      html += '<span class="kp-icon">' + kp.icon + '</span>';
      html += '<h3>' + escapeHtml(kp.title) + '</h3>';
      html += '<p>' + escapeHtml(kp.explanation.split("\n")[0].substring(0, 60)) + '...</p>';
      html += '<div class="kp-card-footer"><span class="kp-count">' + totalQ + ' 题</span>';
      if (doneCount > 0) html += '<span class="kp-progress">' + doneCount + '/' + totalQ + '</span>';
      html += '</div></div>';
    });
    html += '</div></div>';
  });
  listView.innerHTML = html;

  // 绑定点击
  document.querySelectorAll(".kp-card").forEach(function (card) {
    card.addEventListener("click", function () { openKnowledgePoint(card.dataset.kpId); });
  });
}

function openKnowledgePoint(kpId) {
  var kp = window.KNOWLEDGE_POINTS.find(function (k) { return k.id === kpId; });
  if (!kp) return;
  kpCurrent = kp;
  kpQIndex = 0;
  kpAnswers = {};
  kpChecked = {};

  $("kpListView").hidden = true;
  $("kpTrainView").hidden = false;

  $("kpTitle").textContent = kp.title;
  $("kpCategory").textContent = kp.category;

  // 渲染讲解
  $("kpExplanation").innerHTML =
    '<div class="kp-explain-text">' + escapeHtml(kp.explanation).replace(/\n/g, "<br>") + '</div>' +
    '<div class="kp-strategy">' + escapeHtml(kp.strategy) + '</div>';

  renderKPQuestion();
}

function backToKPList() {
  $("kpTrainView").hidden = true;
  $("kpListView").hidden = false;
  kpCurrent = null;
  renderKnowledgePoints(); // 刷新进度
}

function renderKPQuestion() {
  if (!kpCurrent || kpQIndex >= kpCurrent.questions.length) {
    renderKPResult();
    return;
  }
  var q = kpCurrent.questions[kpQIndex];
  var qKey = kpCurrent.id + "-" + kpQIndex;
  var isAnswered = !!kpAnswers[qKey];
  var isChecked = !!kpChecked[qKey];

  var html = '<div class="kp-question-card">';
  html += '<div class="kp-q-header"><span class="kp-q-num">第 ' + (kpQIndex + 1) + ' 题</span><span class="kp-q-total">/ ' + kpCurrent.questions.length + '</span></div>';
  html += '<div class="kp-q-context">' + escapeHtml(q.context).replace(/___/g, '<span class="kp-blank">_____</span>') + '</div>';

  if (q.clues && q.clues.length && isChecked) {
    html += '<div class="kp-clues"><b>线索：</b>' + q.clues.map(function (c) { return '<code>' + escapeHtml(c) + '</code>'; }).join(" ") + '</div>';
  }

  html += '<div class="kp-options">';
  q.options.forEach(function (opt, i) {
    var cls = "kp-option";
    if (isChecked) {
      if (opt === q.answer) cls += " correct";
      else if (opt === kpAnswers[qKey]) cls += " wrong";
    } else if (opt === kpAnswers[qKey]) {
      cls += " selected";
    }
    html += '<button class="' + cls + '" data-opt="' + escapeHtml(opt) + '" ' + (isChecked ? 'disabled' : '') + ' type="button">' + String.fromCharCode(65 + i) + '. ' + escapeHtml(opt) + '</button>';
  });
  html += '</div>';

  if (isAnswered && !isChecked) {
    html += '<button class="btn primary kp-check-btn" type="button">检查答案</button>';
  }

  if (isChecked) {
    var isCorrect = kpAnswers[qKey] === q.answer;
    html += '<div class="kp-feedback ' + (isCorrect ? "good" : "bad") + '">';
    html += '<b>' + (isCorrect ? "✓ 答对了" : "✗ 答错了") + '</b>';
    if (!isCorrect) html += ' 正确答案：<b>' + escapeHtml(q.answer) + '</b>';
    html += '</div>';
    if (q.explanation) html += '<div class="kp-explanation"><b>解析：</b>' + escapeHtml(q.explanation) + '</div>';
    html += '<div class="kp-nav"><button class="btn primary kp-next-btn" type="button">' + (kpQIndex + 1 < kpCurrent.questions.length ? "下一题 →" : "查看结果 →") + '</button></div>';
  }

  html += '</div>';
  $("kpPractice").innerHTML = html;

  // 绑定事件
  document.querySelectorAll(".kp-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (kpChecked[qKey]) return;
      kpAnswers[qKey] = btn.dataset.opt;
      renderKPQuestion();
    });
  });
  var checkBtn = document.querySelector(".kp-check-btn");
  if (checkBtn) checkBtn.addEventListener("click", function () {
    kpChecked[qKey] = true;
    // 记录错题
    if (kpAnswers[qKey] !== q.answer) {
      addError("kp-" + kpCurrent.id, kpQIndex + 1, kpAnswers[qKey], q.answer, kpCurrent.category);
      updateNavBadge();
    }
    // 记录统计
    recordAnswer({ route: kpCurrent.category }, kpAnswers[qKey] === q.answer);
    renderKPQuestion();
  });
  var nextBtn = document.querySelector(".kp-next-btn");
  if (nextBtn) nextBtn.addEventListener("click", function () {
    kpQIndex++;
    renderKPQuestion();
  });
}

function renderKPResult() {
  var total = kpCurrent.questions.length;
  var correct = 0;
  kpCurrent.questions.forEach(function (q, i) {
    var qKey = kpCurrent.id + "-" + i;
    if (kpChecked[qKey] && kpAnswers[qKey] === q.answer) correct++;
  });
  var pct = Math.round(correct / total * 100);
  var html = '<div class="kp-result">';
  html += '<h3>训练完成</h3>';
  html += '<div class="kp-result-score">' + correct + ' / ' + total + '</div>';
  html += '<div class="kp-result-pct">正确率 ' + pct + '%</div>';
  if (pct >= 80) html += '<p class="kp-result-msg good">掌握得很好！可以进入下一个知识点。</p>';
  else if (pct >= 60) html += '<p class="kp-result-msg">基本掌握，建议再练一遍错题。</p>';
  else html += '<p class="kp-result-msg bad">还需要多练，建议重新学习讲解后再做一遍。</p>';
  html += '<div class="kp-result-actions">';
  html += '<button class="btn ghost kp-retry-btn" type="button">重新练习</button>';
  html += '<button class="btn primary kp-back-list-btn" type="button">返回知识点列表</button>';
  html += '</div></div>';
  $("kpPractice").innerHTML = html;

  document.querySelector(".kp-retry-btn").addEventListener("click", function () {
    kpQIndex = 0; kpAnswers = {}; kpChecked = {};
    renderKPQuestion();
  });
  document.querySelector(".kp-back-list-btn").addEventListener("click", backToKPList);
}
