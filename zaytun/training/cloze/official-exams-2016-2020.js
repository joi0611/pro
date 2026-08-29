(function () {
  function oq(id, options, answer, pos, category, clues, explanation, collocation = "无", collocationType = "无", collocationBreakdown = "无") {
    return { id, options, answer, pos, category, clues, explanation, collocation, collocationType, collocationBreakdown };
  }

  const source = (year) => `${year}年 · 新疆维吾尔自治区、新疆生产建设兵团 · 初中学业水平考试英语真题`;

  const exam2020 = {
    id: "xinjiang-official-2020-cloze",
    title: "给“草”开花的机会",
    englishTitle: "Give the Grass Time to Flower",
    level: "中考真题",
    difficulty: "中等",
    source: source(2020),
    tags: ["中考真题", "生活哲理", "成长价值", "逻辑推理"],
    available: true,
    firstSentence: "My friend Richard went far to work, so he asked me to take care of his yard in the mountains.",
    lastSentence: "Don't pluck a leaf of any 'grass' or negate a person rudely, and how many 'rare orchids' we will get in our lives!",
    tone: "转折变化",
    toneReason: "作者起初把院里的植物当作杂草任其生长，后来意外发现它是珍贵兰花，并由此明白应给每个人时间和机会证明自己的价值。",
    passage: [
      "My friend Richard went far to work, so he asked me to take care of his yard in the mountains. He worked hard and often kept the yard ", { blank: 36 }, " without any grass. But I was too lazy to sweep the fallen leaves, and I ", { blank: 37 }, " plucked grass, allowing it to grow rapidly. In the early ", { blank: 38 }, ", in March, the leaves were green and soft. A month later, when the leaves spread quickly, I discovered they were like wild orchids in the forest. As the summer came, the 'grass' really flowered. The flowers looked like those forest orchids, ", { blank: 39 }, " they were yellow, unlike those purple or brown-red forest orchids. I picked one flower, then went to find a friend who studied ", { blank: 40 }, ". As soon as my friend saw it, he asked me ", { blank: 41 }, " I picked it. 'It's amazing!' He ", { blank: 42 }, " explained, 'This kind of orchid is hard to find. Now it is worth at least 10,000 dollars each.' I told the good news to Richard. He was ", { blank: 43 }, ". After a while he said gently that he saw the orchid in the yard every year, but he thought it was common grass, so he always plucked it. He said, 'If I could ", { blank: 44 }, ", it would flower a few years before.' Yes, all of us might miss some rare orchids in our own lives. We don't give them the time to flower to prove their value. Give the 'grass' time to flower and give everybody a ", { blank: 45 }, " to prove his value. Don't pluck a leaf of any 'grass' or negate a person rudely, and how many 'rare orchids' we will get in our lives!"
    ],
    questions: [
      oq(36, ["wild", "clean", "dry", "dirty"], "clean", "形容词副词", "上下文复现 / 结果状态", ["without any grass", "worked hard"], "画箭头看结果：Richard辛勤打理，院里没有杂草，说明他常把院子保持得很干净。wild和dirty与without any grass矛盾，dry也不是清除杂草的结果。", "keep sth. clean", "动词结构", "动词(keep) + 宾语(sth.) + 形容词(clean)"),
      oq(37, ["sometimes", "often", "never", "always"], "never", "形容词副词", "转折对比", ["But I was too lazy", "allowing it to grow"], "圈出But并找因果链：作者太懒，任由草迅速生长，说明从不拔草，选never。often和always会导致草被频繁清除。"),
      oq(38, ["spring", "summer", "autumn", "winter"], "spring", "名词", "时间线索 / 常识推断", ["in March", "A month later"], "圈出时间in March：三月属于春季，因此选spring。"),
      oq(39, ["so", "but", "then", "or"], "but", "连词逻辑", "转折对比", ["looked like", "they were yellow", "unlike those"], "前半句说花看起来像森林兰花，后半句用unlike指出颜色不同，前后转折，用but。"),
      oq(40, ["colors", "rivers", "seasons", "plants"], "plants", "名词", "语义场复现", ["wild orchids", "one flower", "This kind of orchid"], "把orchids、flower、this kind of orchid圈成植物语义场；朋友能识别兰花，说明他研究plants。"),
      oq(41, ["that", "why", "where", "who"], "where", "连接副词", "语法 / 地点线索", ["I picked it", "in the yard"], "宾语从句缺少地点状语，朋友问的是花从哪里摘的，选where。that不作成分，why问原因，who问人。"),
      oq(42, ["proudly", "successfully", "carelessly", "excitedly"], "excitedly", "形容词副词", "情感态度", ["It's amazing", "hard to find", "worth at least"], "褒贬态度一致法：amazing、hard to find和高价值都表现惊喜兴奋，因此是excitedly。"),
      oq(43, ["worried", "surprised", "scared", "relaxed"], "surprised", "形容词副词", "情感态度 / 逻辑推理", ["worth at least", "thought it was common"], "Richard一直以为它是普通草，得知它价值很高，认知反差对应surprised。"),
      oq(44, ["wait", "get", "take", "make"], "wait", "动词", "因果链条", ["always plucked it", "time to flower"], "找因果链：过去总拔掉兰花，所以没等到开花；如果能等待，它早几年就会开花，选wait。"),
      oq(45, ["tree", "yard", "flower", "chance"], "chance", "名词", "主旨升华 / 固定搭配", ["prove his value", "Give the 'grass' time"], "结尾由兰花升华到人：应给每个人一个证明价值的机会，选chance。", "give sb. a chance to do sth.", "固定句型", "give + 某人(sb.) + a chance + to do sth.")
    ],
    verifySentences: [
      { english: "My friend Richard went far to work, so he asked me to take care of his yard in the mountains.", chinese: "我的朋友理查德去远方工作，因此请我照看他山里的院子。" },
      { english: "He worked hard and often kept the yard clean without any grass.", chinese: "他很勤快，常把院子收拾得干干净净，一根杂草也没有。", answers: ["clean"] },
      { english: "But I was too lazy to sweep the fallen leaves, and I never plucked grass, allowing it to grow rapidly.", chinese: "但我懒得扫落叶，也从不拔草，任由它迅速生长。", answers: ["never"] },
      { english: "In the early spring, in March, the leaves were green and soft.", chinese: "早春三月，叶子碧绿柔软。", answers: ["spring"] },
      { english: "A month later, when the leaves spread quickly, I discovered they were like wild orchids in the forest.", chinese: "一个月后，叶子迅速舒展，我发现它们像森林里的野兰花。" },
      { english: "As the summer came, the 'grass' really flowered.", chinese: "夏天到来时，这些“草”真的开花了。" },
      { english: "The flowers looked like those forest orchids, but they were yellow, unlike those purple or brown-red forest orchids.", chinese: "这些花看起来像森林兰花，但它们是黄色的，不同于那些紫色或棕红色的森林兰花。", answers: ["but"] },
      { english: "I picked one flower, then went to find a friend who studied plants.", chinese: "我摘下一朵花，去找一位研究植物的朋友。", answers: ["plants"] },
      { english: "As soon as my friend saw it, he asked me where I picked it.", chinese: "朋友一看到它，就问我是在哪里摘到的。", answers: ["where"] },
      { english: "It's amazing!", chinese: "太神奇了！" },
      { english: "He excitedly explained, 'This kind of orchid is hard to find. Now it is worth at least 10,000 dollars each.'", chinese: "他兴奋地解释说：“这种兰花很难找到，现在每株至少价值一万美元。”", answers: ["excitedly"] },
      { english: "I told the good news to Richard.", chinese: "我把这个好消息告诉了理查德。" },
      { english: "He was surprised.", chinese: "他很惊讶。", answers: ["surprised"] },
      { english: "After a while he said gently that he saw the orchid in the yard every year, but he thought it was common grass, so he always plucked it.", chinese: "过了一会儿，他轻声说自己每年都在院里见到这种兰花，却一直把它当成普通的草拔掉。" },
      { english: "He said, 'If I could wait, it would flower a few years before.'", chinese: "他说：“如果我能等一等，它几年前就会开花了。”", answers: ["wait"] },
      { english: "Yes, all of us might miss some rare orchids in our own lives.", chinese: "是的，我们每个人都可能错过生命中的一些珍稀兰花。" },
      { english: "We don't give them the time to flower to prove their value.", chinese: "我们没有给它们时间开花、证明自己的价值。" },
      { english: "Give the 'grass' time to flower and give everybody a chance to prove his value.", chinese: "给“草”时间开花，也给每个人一个证明自身价值的机会。", answers: ["chance"] },
      { english: "Don't pluck a leaf of any 'grass' or negate a person rudely, and how many 'rare orchids' we will get in our lives!", chinese: "不要轻易拔掉任何一片“草叶”，也不要粗暴地否定一个人，这样我们的人生会收获多少“珍稀兰花”啊！" }
    ]
  };

  const exam2019 = {
    id: "xinjiang-official-2019-cloze",
    title: "瓶中逃生的小老鼠",
    englishTitle: "The Clever Little Mouse",
    level: "中考真题",
    difficulty: "中等",
    source: source(2019),
    tags: ["中考真题", "寓言故事", "动作链条", "逻辑推理"],
    available: true,
    firstSentence: "One day a little mouse was thirsty.",
    lastSentence: "When the cat jumped off the table and ran after her, the mouse had already gone into her home.",
    tone: "转折变化",
    toneReason: "小老鼠喝奶后被困瓶中，又面临猫的威胁，最后凭借机智让猫滚动瓶子并成功逃回家。",
    passage: [
      "One day a little mouse was thirsty. She looked everywhere for water to drink. She climbed up onto a table and saw a bottle on it. The mouth of the bottle was ", { blank: 36 }, ". The little mouse looked inside the bottle. 'Aha, there is ", { blank: 37 }, " milk in it. That's great!' She went into it and began to drink. She drank and drank. After a moment she had drunk enough. Her stomach was too big and she couldn't come ", { blank: 38 }, " the bottle. She cried for help. Just then a cat came up to the table. When the cat ", { blank: 39 }, " the cry, he jumped onto the table so ", { blank: 40 }, " and said, 'You'll be my nice lunch!' The little mouse was very clever and she ", { blank: 41 }, " for a moment and said, 'Brother Cat, you mustn't roll the bottle.' '", { blank: 42 }, "?' asked the cat. 'I would get dizzy,' said the mouse. The cat said that he would let her ", { blank: 43 }, " soon. So he began to roll the bottle. Suddenly the bottle fell down onto the floor and broke into ", { blank: 44 }, ". The little mouse ran ", { blank: 45 }, " as fast as she could. When the cat jumped off the table and ran after her, the mouse had already gone into her home."
    ],
    questions: [
      oq(36, ["big", "strong", "weak", "small"], "small", "形容词副词", "因果链条", ["stomach was too big", "couldn't come"], "用后果反推条件：老鼠能钻进去，但喝饱后肚子变大就出不来，说明瓶口很小，选small。"),
      oq(37, ["little", "some", "few", "a few"], "some", "限定词", "语法 / 名词数量", ["milk in it", "began to drink"], "milk是不可数名词，且后文确实喝到了奶，肯定句用some。few和a few修饰可数名词，little表示几乎没有，与That's great矛盾。"),
      oq(38, ["into", "up", "out of", "down"], "out of", "介词短语", "固定搭配 / 动作逻辑", ["went into it", "couldn't come"], "前文went into表示进入瓶子，喝饱后无法从瓶中出来，方向相反是come out of。", "come out of", "动词短语", "动词(come) + 副词(out) + 介词(of)"),
      oq(39, ["heard", "saw", "tasted", "looked"], "heard", "动词", "感官逻辑", ["the cry", "cried for help"], "cry是声音，只能用听觉动词heard。saw和looked属于视觉，tasted是味觉。"),
      oq(40, ["happy", "honest", "honestly", "happily"], "happily", "形容词副词", "语法 / 情感态度", ["jumped onto", "my nice lunch"], "空格修饰动词jumped，要用副词；猫以为得到午餐，情绪高兴，选happily。honestly虽是副词，但不符合语境。"),
      oq(41, ["ate", "thought", "drank", "took"], "thought", "动词", "动作连贯", ["very clever", "for a moment", "and said"], "画动作链：聪明的小老鼠先思考片刻，再开口设法骗猫，选thought。"),
      oq(42, ["When", "Where", "Why", "How"], "Why", "疑问副词", "因果逻辑", ["mustn't roll", "I would get dizzy"], "猫追问不能滚瓶子的原因，老鼠随后给出理由I would get dizzy，因此用Why。"),
      oq(43, ["dying", "die", "to die", "died"], "die", "动词", "固定搭配 / 语法", ["let her", "nice lunch"], "let后接宾语和省略to的动词原形，即let her die。", "let sb. do sth.", "固定句型", "let + 某人(sb.) + 动词原形(do)"),
      oq(44, ["boxes", "glasses", "pieces", "cakes"], "pieces", "名词", "固定搭配 / 动作结果", ["fell down", "onto the floor", "broke into"], "瓶子掉到地上后碎成许多片，break into pieces表示“摔成碎片”。", "break into pieces", "动词短语", "动词(break) + 介词(into) + 名词复数(pieces)"),
      oq(45, ["away", "in", "to", "at"], "away", "副词", "固定搭配 / 动作逻辑", ["ran after her", "gone into her home"], "猫追赶、小鼠逃回家，说明她迅速跑开，run away表示“逃跑”。", "run away", "动词短语", "动词(run) + 副词(away)")
    ],
    verifySentences: [
      { english: "One day a little mouse was thirsty.", chinese: "一天，一只小老鼠口渴了。" },
      { english: "She looked everywhere for water to drink.", chinese: "她到处寻找水喝。" },
      { english: "She climbed up onto a table and saw a bottle on it.", chinese: "她爬到桌上，看见桌上有一个瓶子。" },
      { english: "The mouth of the bottle was small.", chinese: "瓶口很小。", answers: ["small"] },
      { english: "The little mouse looked inside the bottle.", chinese: "小老鼠向瓶子里面看。" },
      { english: "Aha, there is some milk in it. That's great!", chinese: "啊哈，里面有一些牛奶，太好了！", answers: ["some"] },
      { english: "She went into it and began to drink.", chinese: "她钻进瓶子，开始喝奶。" },
      { english: "She drank and drank.", chinese: "她不停地喝。" },
      { english: "After a moment she had drunk enough.", chinese: "过了一会儿，她喝够了。" },
      { english: "Her stomach was too big and she couldn't come out of the bottle.", chinese: "她的肚子太大了，无法从瓶子里出来。", answers: ["out of"] },
      { english: "She cried for help.", chinese: "她大声呼救。" },
      { english: "Just then a cat came up to the table.", chinese: "就在这时，一只猫来到桌旁。" },
      { english: "When the cat heard the cry, he jumped onto the table so happily and said, 'You'll be my nice lunch!'", chinese: "猫听见叫声，高兴地跳上桌子，说：“你会成为我的美味午餐！”", answers: ["heard", "happily"] },
      { english: "The little mouse was very clever and she thought for a moment.", chinese: "小老鼠很聪明，她想了一会儿。", answers: ["thought"] },
      { english: "Brother Cat, you mustn't roll the bottle.", chinese: "猫哥哥，你千万不能滚动瓶子。" },
      { english: "Why?", chinese: "为什么？", answers: ["Why"] },
      { english: "I would get dizzy.", chinese: "我会头晕的。" },
      { english: "The cat said that he would let her die soon.", chinese: "猫说他很快就会让她死掉。", answers: ["die"] },
      { english: "So he began to roll the bottle.", chinese: "于是他开始滚动瓶子。" },
      { english: "Suddenly the bottle fell down onto the floor and broke into pieces.", chinese: "突然，瓶子掉到地上，摔成了碎片。", answers: ["pieces"] },
      { english: "The little mouse ran away as fast as she could.", chinese: "小老鼠尽可能快地逃走了。", answers: ["away"] },
      { english: "When the cat jumped off the table and ran after her, the mouse had already gone into her home.", chinese: "猫跳下桌子追赶时，小老鼠已经钻进了自己的家。" }
    ]
  };

  const exam2018 = {
    id: "xinjiang-official-2018-cloze",
    title: "别让爱留下遗憾",
    englishTitle: "Love and Care for Parents",
    level: "中考真题",
    difficulty: "中等",
    source: source(2018),
    tags: ["中考真题", "亲情关爱", "情感态度", "固定搭配"],
    available: true,
    firstSentence: "A few days ago, I sat on the sofa watching TV.",
    lastSentence: "A good relationship with your parents can make you a better and happier person. It is worth having a try!",
    tone: "转折变化",
    toneReason: "朋友因责怪生病的母亲而造成更深伤害，随后悔恨痛哭；作者由此呼吁理解、关爱并照顾父母，情绪由沉重转向积极反思。",
    passage: [
      "A few days ago, I sat on the sofa watching TV. Just then I got a ", { blank: 36 }, " from a friend of mine. I hadn't seen him ", { blank: 37 }, " a very long time. We talked about our school days on the phone, then he started talking about his ", { blank: 38 }, ". His mother was badly ill in hospital. She couldn't sleep at night and often ", { blank: 39 }, " to herself. My friend was angry ", { blank: 40 }, " her and asked his mother ", { blank: 41 }, " talking. Since then, his mother didn't say anything. The doctor said she had a kind of mental disease and couldn't look after herself like a normal person. My friend was very sad. He thought it was his fault. My friend ", { blank: 42 }, " like a baby on the telephone. He said that he could do ", { blank: 43 }, " if his mother became better. Do you know ", { blank: 44 }, " our parents love us and care for us all the time? I think we should ", { blank: 45 }, " love our parents and take care of them. A good relationship with your parents can make you a better and happier person. It is worth having a try!"
    ],
    questions: [
      oq(36, ["letter", "e-mail", "call", "message"], "call", "名词", "上下文复现 / 固定搭配", ["on the phone", "talked about"], "下文on the phone说明两人在打电话，因此作者接到的是a call。", "get a call from sb.", "动词短语", "get + a call + from + 某人(sb.)"),
      oq(37, ["in", "for", "at", "of"], "for", "介词", "固定搭配 / 时间长度", ["a very long time", "hadn't seen him"], "for接一段持续时间，for a very long time表示“很长时间”。", "for a long time", "时间短语", "介词(for) + a long time"),
      oq(38, ["mother", "father", "brother", "sister"], "mother", "名词", "下文复现", ["His mother was badly ill"], "下一句His mother直接点明谈论对象，选mother。"),
      oq(39, ["talked", "talk", "to talk", "talking"], "talked", "动词", "语法 / 时态", ["couldn't sleep", "and often", "Since then"], "全文叙述过去发生的事，and连接的couldn't与空格都用一般过去时，因此选talked。"),
      oq(40, ["to", "about", "for", "with"], "with", "介词", "固定搭配", ["My friend was angry", "asked his mother"], "be angry with sb.表示“生某人的气”。", "be angry with sb.", "固定短语", "be + angry + with + 某人(sb.)"),
      oq(41, ["stop", "to stop", "stopped", "not to stop"], "to stop", "动词不定式", "固定搭配 / 动作逻辑", ["asked his mother", "Since then", "didn't say anything"], "ask sb. to do sth.要求某人做某事；后文母亲不再说话，说明他让母亲停止自言自语。", "ask sb. to stop doing sth.", "固定句型", "ask + 某人(sb.) + to stop + 动名词(doing)"),
      oq(42, ["cried", "shouted", "laughed", "heard"], "cried", "动词", "情感态度", ["very sad", "his fault", "like a baby"], "褒贬态度一致法：sad、fault和like a baby共同指向伤心痛哭，选cried。"),
      oq(43, ["something", "anything", "nothing", "none"], "anything", "代词", "语法 / 情感逻辑", ["if his mother became better", "very sad"], "anything用于条件句，表示只要母亲好起来，他愿意做任何事。something通常用于肯定陈述，nothing和none与悔恨语气相反。"),
      oq(44, ["what", "whom", "where", "that"], "that", "连接词", "语法 / 宾语从句", ["Do you know", "our parents love us"], "know后的宾语从句主干our parents love us完整，不缺成分，用that引导。"),
      oq(45, ["too", "either", "also", "else"], "also", "形容词副词", "语法 / 递进关系", ["parents love us", "we should", "take care of them"], "父母爱我们，我们也应该爱父母；also位于情态动词should之后、实义动词love之前。too通常放句末，either用于否定句。")
    ],
    verifySentences: [
      { english: "A few days ago, I sat on the sofa watching TV.", chinese: "几天前，我坐在沙发上看电视。" },
      { english: "Just then I got a call from a friend of mine.", chinese: "就在那时，我接到了一位朋友的电话。", answers: ["call"] },
      { english: "I hadn't seen him for a very long time.", chinese: "我已经很久没有见到他了。", answers: ["for"] },
      { english: "We talked about our school days on the phone, then he started talking about his mother.", chinese: "我们在电话里聊起学生时代，随后他开始谈自己的母亲。", answers: ["mother"] },
      { english: "His mother was badly ill in hospital.", chinese: "他的母亲病得很重，住进了医院。" },
      { english: "She couldn't sleep at night and often talked to herself.", chinese: "她夜里睡不着，经常自言自语。", answers: ["talked"] },
      { english: "My friend was angry with her and asked his mother to stop talking.", chinese: "朋友生她的气，要求母亲不要再说了。", answers: ["with", "to stop"] },
      { english: "Since then, his mother didn't say anything.", chinese: "从那以后，他的母亲什么也不说了。" },
      { english: "The doctor said she had a kind of mental disease and couldn't look after herself like a normal person.", chinese: "医生说她患有一种精神疾病，不能像正常人一样照顾自己。" },
      { english: "My friend was very sad.", chinese: "我的朋友非常难过。" },
      { english: "He thought it was his fault.", chinese: "他认为这是自己的错。" },
      { english: "My friend cried like a baby on the telephone.", chinese: "朋友在电话里哭得像个孩子。", answers: ["cried"] },
      { english: "He said that he could do anything if his mother became better.", chinese: "他说，只要母亲能好起来，他什么都愿意做。", answers: ["anything"] },
      { english: "Do you know that our parents love us and care for us all the time?", chinese: "你知道父母一直爱着我们、关心着我们吗？", answers: ["that"] },
      { english: "I think we should also love our parents and take care of them.", chinese: "我认为我们也应该爱父母、照顾父母。", answers: ["also"] },
      { english: "A good relationship with your parents can make you a better and happier person.", chinese: "与父母保持良好关系能让你成为更好、更快乐的人。" },
      { english: "It is worth having a try!", chinese: "这值得尝试！" }
    ]
  };

  const exam2017 = {
    id: "xinjiang-official-2017-cloze",
    title: "学校之外的学习",
    englishTitle: "Learning Beyond School",
    level: "中考真题",
    difficulty: "中等",
    source: source(2017),
    tags: ["中考真题", "学习方法", "自主学习", "逻辑推理"],
    available: true,
    firstSentence: "Many people go to school for an education.",
    lastSentence: "But they were all so successful that they invented so many things for us.",
    tone: "积极",
    toneReason: "文章强调学校教育之外还要学会自主学习，并以伟大科学家的成就说明掌握学习方法能够带来成功与创造。",
    passage: [
      "Many people go to school for an education. They ", { blank: 36 }, " languages and other subjects. Others go to ", { blank: 37 }, " to learn a skill so that they can make a living. ", { blank: 38 }, " no one can learn everything from school. A teacher, no matter ", { blank: 39 }, " he knows, cannot teach his students everything they ", { blank: 40 }, " to know. So, much more is to be learned ", { blank: 41 }, " school by the students themselves. It is always ", { blank: 42 }, " to know how to study by oneself than to memorize some formulas. Formulas are easy to remember but difficult to use in ", { blank: 43 }, " out maths problems. As we all know, great ", { blank: 44 }, ", such as Einstein, Newton and Galileo, didn't learn many things from school. But they were all so successful that they ", { blank: 45 }, " so many things for us."
    ],
    questions: [
      oq(36, ["dislike", "speak", "learn", "make"], "learn", "动词", "上下文复现", ["go to school", "languages and other subjects"], "学校教育的核心动作是学习语言和其他科目，选learn。speak只能搭配languages，不能同时搭配other subjects。"),
      oq(37, ["park", "school", "home", "cinema"], "school", "名词", "语义场复现 / 目的逻辑", ["go to school", "learn a skill", "make a living"], "上文go to school形成原词复现；去学校学习技能，才能谋生，选school。"),
      oq(38, ["Though", "But", "If", "Or"], "But", "连词逻辑", "转折对比", ["go to school", "no one can learn everything"], "前文说人们去学校接受教育，后文说学校无法教会一切，前后转折且空格后是完整主句，用But。Though不能单独连接两个完整主句而无主句呼应。"),
      oq(39, ["how often", "how many", "how soon", "how much"], "how much", "连接结构", "固定搭配 / 语法", ["no matter", "he knows"], "know表示掌握知识的多少，知识不可数，用no matter how much。", "no matter how much", "让步结构", "no matter + how much + 主语 + 动词"),
      oq(40, ["want", "stop", "forget", "fail"], "want", "动词", "逻辑推理", ["teach his students", "to know"], "老师无法把学生想知道的一切都教给他们，want to know语义自然。stop、forget和fail都不能表达学习需求。", "want to do sth.", "固定句型", "动词(want) + 不定式(to do)"),
      oq(41, ["from", "outside", "in", "within"], "outside", "介词", "转折逻辑 / 上下文复现", ["cannot teach", "by the students themselves"], "老师不能教完一切，所以更多知识要由学生自己在校外学习，选outside。in和within与前文局限矛盾。"),
      oq(42, ["more important", "important", "most important", "unimportant"], "more important", "形容词", "语法 / 逻辑推理", ["than to memorize", "know how to study"], "句中than明确要求比较级；掌握自学方法比死记公式更重要，选more important。", "more ... than ...", "比较结构", "比较级(more + adjective) + than"),
      oq(43, ["doing", "getting", "working", "taking"], "working", "动名词", "固定搭配", ["out maths problems", "Formulas are easy"], "work out maths problems表示“解出数学题”；介词in后用动名词working。", "work out problems", "动词短语", "动词(work) + 副词(out) + 名词(problems)"),
      oq(44, ["workers", "scientists", "doctors", "students"], "scientists", "名词", "常识推断 / 举例线索", ["Einstein, Newton and Galileo"], "爱因斯坦、牛顿和伽利略都是著名科学家，选scientists。"),
      oq(45, ["remembered", "celebrated", "invented", "shared"], "invented", "动词", "因果链条 / 常识推断", ["so successful", "so many things for us"], "伟大科学家的成功体现在为人类发明、创造许多事物，选invented。remembered和celebrated不能与things构成这里的成果关系。")
    ],
    verifySentences: [
      { english: "Many people go to school for an education.", chinese: "许多人上学是为了接受教育。" },
      { english: "They learn languages and other subjects.", chinese: "他们学习语言和其他科目。", answers: ["learn"] },
      { english: "Others go to school to learn a skill so that they can make a living.", chinese: "另一些人上学学习技能，以便谋生。", answers: ["school"] },
      { english: "But no one can learn everything from school.", chinese: "但是，没有人能从学校学到一切。", answers: ["But"] },
      { english: "A teacher, no matter how much he knows, cannot teach his students everything they want to know.", chinese: "一位老师无论懂得多少，也无法把学生想知道的一切都教给他们。", answers: ["how much", "want"] },
      { english: "So, much more is to be learned outside school by the students themselves.", chinese: "所以，更多知识要由学生在校外自主学习。", answers: ["outside"] },
      { english: "It is always more important to know how to study by oneself than to memorize some formulas.", chinese: "懂得如何自主学习总是比记住一些公式更重要。", answers: ["more important"] },
      { english: "Formulas are easy to remember but difficult to use in working out maths problems.", chinese: "公式容易记住，却很难在解数学题时运用。", answers: ["working"] },
      { english: "As we all know, great scientists, such as Einstein, Newton and Galileo, didn't learn many things from school.", chinese: "众所周知，爱因斯坦、牛顿和伽利略等伟大科学家并不是从学校学到许多东西的。", answers: ["scientists"] },
      { english: "But they were all so successful that they invented so many things for us.", chinese: "但他们都非常成功，为我们发明了许多事物。", answers: ["invented"] }
    ]
  };

  const exam2016 = {
    id: "xinjiang-official-2016-cloze",
    title: "沙漠中的绿洲与人情",
    englishTitle: "Life in the Desert",
    level: "中考真题",
    difficulty: "中等",
    source: source(2016),
    tags: ["中考真题", "沙漠生活", "上下文复现", "固定搭配"],
    available: true,
    firstSentence: "You may think there is only sand in the desert of the world, but it is not true.",
    lastSentence: "No man in the desert would ever refuse to help the people in trouble and give them food and water.",
    tone: "积极",
    toneReason: "文章介绍沙漠并非只有沙子，也有绿洲、动植物和居民生活，结尾赞美沙漠居民友善互助，整体积极温暖。",
    passage: [
      "You may think there is only sand in the desert of the world, ", { blank: 36 }, " it is not true. In the desert, as we know, there is a little ", { blank: 37 }, ", but it is not ", { blank: 38 }, " for most plants. Still we can see some plants live in the desert. There is ", { blank: 39 }, " in some places in the desert. We call these places oases. In the oases, there are villages and towns. People grow all kinds of crops in the fields there. People ", { blank: 40 }, " live outside the oases. They have camels, sheep and other animals. These animals depend on the desert plants for their food and do not need ", { blank: 41 }, " water. The animals are useful to desert people in many ways. They eat the meat and drink the milk of the animals. They use the camels for carrying water, food, tents and something else. The people of the desert have to keep moving from place to place. They must always ", { blank: 42 }, " grass or desert plants for their animals. When there is no more food for their animals, they move to ", { blank: 43 }, " place. The desert people are ", { blank: 44 }, ". No man in the desert would ever ", { blank: 45 }, " to help the people in trouble and give them food and water."
    ],
    questions: [
      oq(36, ["and", "but", "or", "so"], "but", "连词逻辑", "转折对比", ["only sand", "it is not true"], "前面是“你可能认为沙漠只有沙子”，后面明确否定这一看法，前后转折，用but。"),
      oq(37, ["rain", "rains", "wind", "winds"], "rain", "名词", "语义场 / 语法", ["for most plants", "some plants live", "a little"], "植物生长需要水分；a little修饰不可数名词，rain表示雨水，选rain。rains常指多场降雨，wind不符合后文植物生长逻辑。"),
      oq(38, ["well enough", "enough well", "good enough", "enough good"], "good enough", "形容词结构", "固定搭配 / 语法", ["for most plants", "Still we can see"], "be后用形容词good作表语，enough修饰形容词时放在其后，因此是good enough。", "adjective + enough", "语法结构", "形容词(good) + enough"),
      oq(39, ["sand", "plants", "woods", "water"], "water", "名词", "下文释义 / 常识推断", ["We call these places oases", "grow all kinds of crops"], "绿洲能形成村镇并种植庄稼，关键条件是有水，选water。"),
      oq(40, ["also", "too", "either", "still"], "also", "形容词副词", "语法 / 递进关系", ["live outside the oases", "In the oases"], "上文写人们住在绿洲，这里补充也有人住在绿洲外；also位于实义动词live之前。too通常放句末，either用于否定句。"),
      oq(41, ["a little", "too many", "too much", "some"], "too much", "限定词", "语法 / 动物特征", ["camels, sheep", "do not need", "desert plants"], "water不可数，排除too many；沙漠动物适应缺水环境，不需要太多水，选too much。a little和some不能表达“不需要很多”的对比重点。"),
      oq(42, ["look at", "look for", "look up", "look after"], "look for", "动词短语", "动作逻辑 / 固定搭配", ["keep moving", "grass or desert plants", "no more food"], "沙漠居民不断迁移，是为了给动物寻找草和植物，look for表示“寻找”。", "look for", "动词短语", "动词(look) + 介词(for)"),
      oq(43, ["other", "the other", "others", "another"], "another", "限定词", "语法 / 动作逻辑", ["move to", "no more food", "for their animals"], "空格后是单数名词place，表示不确定的另一个地方，用another。other通常接复数名词，the other特指两者中的另一个，others后不能再接名词。"),
      oq(44, ["well", "friend", "friendly", "carefully"], "friendly", "形容词", "情感态度 / 语法", ["help the people", "give them food and water"], "be后需要形容词作表语；下文帮助困境中的人并提供食物和水，说明他们友善，选friendly。"),
      oq(45, ["agree", "refuse", "promise", "want"], "refuse", "动词", "固定搭配 / 情感态度", ["help the people", "in trouble", "food and water"], "友善的沙漠居民绝不会拒绝帮助困境中的人，refuse符合never的否定语义；agree、promise和want放入would ever结构都不合句意。", "refuse to do sth.", "固定句型", "动词(refuse) + 不定式(to do)")
    ],
    verifySentences: [
      { english: "You may think there is only sand in the desert of the world, but it is not true.", chinese: "你可能认为世界上的沙漠里只有沙子，但事实并非如此。", answers: ["but"] },
      { english: "In the desert, as we know, there is a little rain, but it is not good enough for most plants.", chinese: "我们知道，沙漠里有少量降雨，但对大多数植物来说还不够好。", answers: ["rain", "good enough"] },
      { english: "Still we can see some plants live in the desert.", chinese: "尽管如此，我们仍能看到一些植物生长在沙漠里。" },
      { english: "There is water in some places in the desert.", chinese: "沙漠中的一些地方有水。", answers: ["water"] },
      { english: "We call these places oases.", chinese: "我们把这些地方称为绿洲。" },
      { english: "In the oases, there are villages and towns.", chinese: "绿洲里有村庄和城镇。" },
      { english: "People grow all kinds of crops in the fields there.", chinese: "人们在那里种植各种农作物。" },
      { english: "People also live outside the oases.", chinese: "也有人生活在绿洲之外。", answers: ["also"] },
      { english: "They have camels, sheep and other animals.", chinese: "他们饲养骆驼、绵羊和其他动物。" },
      { english: "These animals depend on the desert plants for their food and do not need too much water.", chinese: "这些动物以沙漠植物为食，不需要太多水。", answers: ["too much"] },
      { english: "The animals are useful to desert people in many ways.", chinese: "这些动物在很多方面对沙漠居民有用。" },
      { english: "They eat the meat and drink the milk of the animals.", chinese: "人们食用这些动物的肉，饮用它们的奶。" },
      { english: "They use the camels for carrying water, food, tents and something else.", chinese: "他们用骆驼运水、食物、帐篷和其他物品。" },
      { english: "The people of the desert have to keep moving from place to place.", chinese: "沙漠居民不得不不断从一个地方迁往另一个地方。" },
      { english: "They must always look for grass or desert plants for their animals.", chinese: "他们必须不断为动物寻找青草或沙漠植物。", answers: ["look for"] },
      { english: "When there is no more food for their animals, they move to another place.", chinese: "当动物没有食物时，他们就迁往另一个地方。", answers: ["another"] },
      { english: "The desert people are friendly.", chinese: "沙漠居民很友善。", answers: ["friendly"] },
      { english: "No man in the desert would ever refuse to help the people in trouble and give them food and water.", chinese: "沙漠里没有人会拒绝帮助身处困境的人，为他们提供食物和水。", answers: ["refuse"] }
    ]
  };

  window.officialClozeLessons = [
    ...(window.officialClozeLessons || []),
    exam2020,
    exam2019,
    exam2018,
    exam2017,
    exam2016
  ];
})();
