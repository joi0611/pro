/* 阅读还原（5选5 / 7选5）题库 · 新疆真题
 * 数据来源：2022–2026 新疆中考真题 + 2026 新疆二模/一模 + 2024–2025 新疆九年级期末真题 + 2025 新疆模考
 * 数据契约：
 * window.SEVEN_CHOICE_EXAMS = [{
 *   id, title, source, range,
 *   passage: ["段落，空用 [[n]] 占位"],
 *   options: ["A. …", …, "E. …"],
 *   answers: { 1: "B", … },
 *   analysis: { 1: { level, method, chain, observe, clue, plain, exclude, highlightTerms } }
 * }]
 * 说明：本文件由 work/_build_bank.py 生成后人工校订；空号已按出现顺序归一为 1–5。
 */
(function () {
  "use strict";

  window.SEVEN_CHOICE_EXAMS = [
 {
  "id": 101,
  "title": "动手做一个简易净水器",
  "source": "2026年新疆维吾尔自治区、新疆生产建设兵团中考真题",
  "range": "54—58",
  "passage": [
   "How to Make a Simple Water Filter (简易净水器)",
   "How to make dirty water clean?[[1]] It is easy and fun.",
   "What do we need?",
   "We need a big plastic bottle, some small stones, charcoal (炭), clean sand and a piece of cloth.",
   "[[2]]",
   "Cut off the bottom of the bottle. Turn it upside down. Put the materials inside one by one.",
   "First, put the cloth at the bottle neck.",
   "[[3]]",
   "Then, put the charcoal on the sand. Finally, put the stones on the top.",
   "How does it work?",
   "Let's pour dirty water into the bottle.",
   "The stones stop big rubbish like leaves.",
   "The charcoal is like a cleaner. [[4]]",
   "The sand catches small dirt that we cannot see.",
   "The cloth stops everything else from falling out.",
   "Very Important Note!",
   "The water looks clean now, but it is not safe to drink yet! [[5]]",
   "Science is everywhere. With this simple device (设备), we can turn dirty water into much cleaner water."
  ],
  "options": [
   "A. You must boil the water before drinking.",
   "B. It makes the water clear and takes away unpleasant smells.",
   "C. Next, put the sand in.",
   "D. How to build it?",
   "E. Today, I will show you how to make a simple water filter."
  ],
  "answers": {
   "1": "E",
   "2": "D",
   "3": "C",
   "4": "B",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "设问 + 点题",
    "chain": "怎么把脏水变干净 → 我来教你做净水器 → 简单又有趣",
    "observe": "空前是一个问句 How to make dirty water clean?，空后说 It is easy and fun。",
    "clue": "空处要回答问句，并引出“做净水器”这件事。",
    "plain": "E 说 Today, I will show you how to make a simple water filter，正好回答问句并点题。",
    "exclude": "A 讲煮沸、B 讲效果、C 讲步骤、D 讲怎么搭，都还没到“我来教你”这一步。",
    "evidence": "How to make dirty water clean?",
    "highlightTerms": [
     "How to make dirty water clean?"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "小标题",
    "chain": "需要什么 → 怎么做 → 怎么工作",
    "observe": "空前是 What do we need? 和材料清单，空后开始讲 Cut off the bottom ... 具体步骤。",
    "clue": "空独占一段，后面整段都是制作步骤，应是一个承上启下的小标题。",
    "plain": "D 是疑问式小标题 How to build it?，与 What do we need? / How does it work? 结构一致。",
    "exclude": "A、B、C、E 都是陈述句或步骤句，不能充当这一段的总起标题。",
    "evidence": "Cut off the bottom of the bottle. Turn it upside down. Put the materials inside one by one.",
    "highlightTerms": [
     "Cut off the bottom of the bottle. Turn it upside down. Put the materials inside one by one."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "顺序衔接",
    "chain": "First 放布 → 下一句放沙 → Then 放炭",
    "observe": "空前是 First, put the cloth at the bottle neck，空后是 Then, put the charcoal on the sand。",
    "clue": "空处要补上 First 和 Then 之间缺失的一步。",
    "plain": "C 用 Next 承接 First，put the sand in 正好是“布—沙—炭—石”顺序里缺的一步。",
    "exclude": "A 讲煮沸、B 讲效果、D 是小标题、E 是开场白，都不是步骤。",
    "evidence": "Then, put the charcoal on the sand.",
    "highlightTerms": [
     "Then, put the charcoal on the sand."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "解释功能",
    "chain": "木炭像清洁工 → 让水变清、去异味 → 沙子和布继续过滤",
    "observe": "空前说 The charcoal is like a cleaner，空处要解释木炭具体做了什么。",
    "clue": "空处要说明木炭的过滤作用，并与后文沙子、布的分工并列。",
    "plain": "B 的 It makes the water clear and takes away unpleasant smells 正是“清洁工”的具体作用。",
    "exclude": "A 讲饮用安全、C 讲步骤、D 是标题、E 是开场白，都不能解释木炭的作用。",
    "evidence": "The charcoal is like a cleaner.",
    "highlightTerms": [
     "The charcoal is like a cleaner."
    ]
   },
   "5": {
    "level": "第二级",
    "method": "安全提示收束",
    "chain": "水看起来干净 → 但还不能喝 → 必须煮沸",
    "observe": "空前说 The water looks clean now, but it is not safe to drink yet!",
    "clue": "空处要给出“怎样才能安全饮用”的具体做法。",
    "plain": "A 说 You must boil the water before drinking，正好补上“不能直接喝”之后的解决办法。",
    "exclude": "B、C、D、E 都没有回答“那要怎么办”，接不上 not safe to drink yet。",
    "evidence": "The water looks clean now, but it is not safe to drink yet!",
    "highlightTerms": [
     "The water looks clean now, but it is not safe to drink yet!"
    ]
   }
  }
 },
 {
  "id": 102,
  "title": "心里开出的两种花",
  "source": "2025年新疆维吾尔自治区、新疆生产建设兵团中考真题",
  "range": "34—38",
  "passage": [
   "Flowers are beautiful living things and can be found all over the world—in gardens, parks and even your home. [[1]] They can only be felt in the deepest part of your heart. These flowers are planted by two kinds of people.",
   "When you meet the first kind of people, they plant “bad” seeds in your heart. [[2]] You think they only come into your life to bring you problems. However, when you overcome the problems with your courage, you get strength (力量) and experience. As you fight to win, beautiful flowers blossom (开花). That can make you a strong man.",
   "[[3]] They are people who bring you happiness. They may teach you something meaningful you have never done. They may give you an unbelievable deal of joy. As you slowly build a close relationship with them, the seeds will grow into beautiful flowers of love. [[4]]",
   "So, who plants the seeds in your heart? Who do you choose to meet? [[5]] And you must face that."
  ],
  "options": [
   "A. When you meet the second kind of people, they plant good seeds in your heart.",
   "B. These people may be not friendly enough.",
   "C. You have no choice but life does.",
   "D. However, there are some other kinds of flowers that cannot be seen or touched.",
   "E. And you will grow into a full man."
  ],
  "answers": {
   "1": "D",
   "2": "B",
   "3": "A",
   "4": "E",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "转折 + 由实到虚",
    "chain": "真实的花 → However 另一种花 → 看不见摸不着",
    "observe": "空前讲花园、公园、家里的真花，空后说 They can only be felt in the deepest part of your heart。",
    "clue": "空处要完成从“看得见的花”到“心里的花”的转折。",
    "plain": "D 用 However 转折，some other kinds of flowers that cannot be seen or touched 与后句“只能用心灵感受”完全对应。",
    "exclude": "A、B、C、E 都在讲人或选择，没有完成“花”的转折。",
    "evidence": "They can only be felt in the deepest part of your heart.",
    "highlightTerms": [
     "They can only be felt in the deepest part of your heart."
    ]
   },
   "2": {
    "level": "第二级",
    "method": "解释“坏的种子”",
    "chain": "第一种人种下坏种子 → 这些人不友好 → 你以为他们只带来麻烦",
    "observe": "空前说 they plant “bad” seeds in your heart，空后说你认为他们只带来问题。",
    "clue": "空处要解释“坏种子”具体指什么。",
    "plain": "B 说这些人可能不够友好，正好解释“坏种子”，并与后句“只带来问题”同向。",
    "exclude": "A 讲第二种人、D 讲看不见的花、C 讲选择、E 讲成长为完整的人，都不能解释“坏种子”。",
    "evidence": "You think they only come into your life to bring you problems.",
    "highlightTerms": [
     "You think they only come into your life to bring you problems."
    ]
   },
   "3": {
    "level": "第一级",
    "method": "并列第二种人",
    "chain": "第一种人 → 第二种人 → 带来快乐的人",
    "observe": "空后说 They are people who bring you happiness，与前一段“第一种人”形成并列。",
    "clue": "空处要引出“第二种人”，并与第一种人形成对照。",
    "plain": "A 用 the second kind of people 与上一段 the first kind of people 对应，good seeds 与 bad seeds 对照。",
    "exclude": "B 仍在讲第一种人，C、D、E 都没有“第二种人”的信息。",
    "evidence": "They are people who bring you happiness.",
    "highlightTerms": [
     "They are people who bring you happiness."
    ]
   },
   "4": {
    "level": "第三级",
    "method": "结果收束",
    "chain": "建立亲密关系 → 种子长成爱的花 → 你成长为完整的人",
    "observe": "空前说 the seeds will grow into beautiful flowers of love，空处要收束这种成长的结果。",
    "clue": "空处应与“成长、变得完整”有关，并与前文 make you a strong man 呼应。",
    "plain": "E 说 you will grow into a full man，与上一段 That can make you a strong man 形成并列和递进。",
    "exclude": "A、B、C、D 都没有“成长结果”的意思。",
    "evidence": "As you slowly build a close relationship with them, the seeds will grow into beautiful flowers of love.",
    "highlightTerms": [
     "As you slowly build a close relationship with them, the seeds will grow into beautiful flowers of love."
    ]
   },
   "5": {
    "level": "第三级",
    "method": "问答 + 语义反转",
    "chain": "谁种下种子 → 谁决定你遇见谁 → 你没得选，生活替你选",
    "observe": "空前连问两句 Who plants the seeds ... Who do you choose to meet，空后说 And you must face that。",
    "clue": "空处要回答“选择”，并制造“其实不由你选”的反转，才能接上 you must face that。",
    "plain": "C 说你没有选择，是生活替你选，正好承接问句并解释为什么“必须面对”。",
    "exclude": "A、B、D、E 都没有回答“谁选择”这个问题，后文 that 也无指代。",
    "evidence": "So, who plants the seeds in your heart? Who do you choose to meet?",
    "highlightTerms": [
     "So, who plants the seeds in your heart? Who do you choose to meet?"
    ]
   }
  }
 },
 {
  "id": 103,
  "title": "我的梦想变成了老师",
  "source": "2024年新疆维吾尔自治区中考真题",
  "range": "34—38",
  "passage": [
   "Everyone has a dream. What role does a dream play in our life?",
   "When I was young, my dream was to be a fireman. I thought it would be cool to ride around. [[1]]",
   "For years, I held on to this dream. But when I got older, I had another dream. [[2]] He teaches in a university. [[3]] I really admire him. So that's why I am a teacher now. I enjoy every minute when I stay with students. [[4]] I never regret giving up my dream to be a fireman.",
   "Life doesn't always give us the joys we want. [[5]] It doesn't matter whatever our dreams. If we actively pursue (追求) them, we will move closer to our dreams. If we stick to what we live to do, we can build ourselves better. That is the most important thing to us."
  ],
  "options": [
   "A. I wanted to be a teacher like my father.",
   "B. I enjoy every moment when I see students make progress.",
   "C. And putting out fire could make me feel like a superman.",
   "D. Life may push our dreams in another direction.",
   "E. He has helped many students to achieve their dreams."
  ],
  "answers": {
   "1": "C",
   "2": "A",
   "3": "E",
   "4": "B",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "解释“酷”在哪里",
    "chain": "想当消防员 → 觉得骑车很酷 → 灭火像超人",
    "observe": "空前说 I thought it would be cool to ride around，空处要解释“酷”的具体感受。",
    "clue": "空处应继续围绕 fireman 展开，说明为什么觉得酷。",
    "plain": "C 的 putting out fire 与 fireman 复现，feel like a superman 正好解释 cool。",
    "exclude": "A 讲老师、B 讲学生进步、D 讲梦想转向、E 讲帮助学生，都与“消防员为什么酷”无关。",
    "evidence": "When I was young, my dream was to be a fireman. I thought it would be cool to ride around.",
    "highlightTerms": [
     "When I was young, my dream was to be a fireman. I thought it would be cool to ride around."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "话题转换 + 代词引出",
    "chain": "另一个梦想 → 像父亲一样当老师 → He 指父亲",
    "observe": "空前说 I had another dream，空后说 He teaches in a university。",
    "clue": "空处要交代“另一个梦想”是什么，并引出后文的 He。",
    "plain": "A 说想成为像父亲一样的老师，后文 He teaches in a university 的 He 就是父亲。",
    "exclude": "B、C、D、E 都没有引出“父亲”这个人，后句 He 会没有指代对象。",
    "evidence": "But when I got older, I had another dream.",
    "highlightTerms": [
     "But when I got older, I had another dream."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "代词衔接 + 支撑",
    "chain": "父亲在大学教书 → He 继续指父亲 → 帮助学生实现梦想",
    "observe": "空前说 He teaches in a university，空后说 I really admire him。",
    "clue": "空处要用 He 继续写父亲，说明他值得敬佩的原因。",
    "plain": "E 用 He 承接父亲，helped many students to achieve their dreams 正是“敬佩”的理由。",
    "exclude": "A 重复“想当老师”、B 讲自己的感受、C 讲消防员、D 讲生活转向，都不能承接 He teaches in a university。",
    "evidence": "He teaches in a university.",
    "highlightTerms": [
     "He teaches in a university."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "同义复现 + 感受收束",
    "chain": "享受和学生在一起的每一分钟 → 看到学生进步就开心",
    "observe": "空前说 I enjoy every minute when I stay with students。",
    "clue": "空处要延续“享受”的感受，并具体说明享受什么。",
    "plain": "B 的 enjoy every moment 与空前 enjoy every minute 同义复现，see students make progress 给出具体内容。",
    "exclude": "A、C、E 都没有“享受/开心”的感受，D 是下一段的总起。",
    "evidence": "I enjoy every minute when I stay with students.",
    "highlightTerms": [
     "I enjoy every minute when I stay with students."
    ]
   },
   "5": {
    "level": "第二级",
    "method": "转折总起 + 主旨",
    "chain": "生活不总给我们想要的快乐 → 梦想可能被推向别处 → 仍然要追求",
    "observe": "空前说 Life doesn't always give us the joys we want，空后说 It doesn't matter whatever our dreams。",
    "clue": "空处要承接“生活不按计划”，引出“梦想会转向”，再让后文的 pursue 接得上。",
    "plain": "D 说生活可能把我们的梦想推向另一个方向，既承接前句，又为后文“主动追求”作铺垫。",
    "exclude": "A、B、C、E 都是具体经历，放在这一段议论里会打断“生活—梦想—追求”的逻辑。",
    "evidence": "Life doesn't always give us the joys we want.",
    "highlightTerms": [
     "Life doesn't always give us the joys we want."
    ]
   }
  }
 },
 {
  "id": 104,
  "title": "多巴胺穿搭有科学依据吗",
  "source": "2023年新疆维吾尔自治区中考真题",
  "range": "41—45",
  "passage": [
   "What color of wearing may make our day cheerful? Probably, dopamine (多巴胺) clothes have been a trend (潮流) on some short videos. [[1]] So they can get more dopamine and feel happy. But is there really any science behind this?",
   "[[2]] This kind of chemical can influence how we feel. According to Science Magazine, there is no study about how colorful clothes can increase dopamine, but there are ones that show a relationship between the clothes we wear and how we act and feel.",
   "One study found that wearing red can lead to a better physical performance in soccer over the last 55 years. [[3]] Another study showed that wearing green can make people more creative. [[4]] Perhaps it can remind us of the nature. Yellow has signs of warmth. It makes people feel warm. [[5]]",
   "Maybe there is more science to be waiting for us to study."
  ],
  "options": [
   "A. Wearing yellow can bring people happiness, energy and excitement.",
   "B. It encourages people to choose colorful clothes.",
   "C. Dopamine is a chemical (化学物质) in our brain.",
   "D. Green has also been found to help people relax.",
   "E. It showed that teams in red uniforms always played best in home games."
  ],
  "answers": {
   "1": "B",
   "2": "C",
   "3": "E",
   "4": "D",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "承上启下",
    "chain": "多巴胺穿搭成潮流 → 鼓励选彩色衣服 → 他们因此更快乐",
    "observe": "空前说 dopamine clothes 在短视频上成了潮流，空后说 So they can get more dopamine and feel happy。",
    "clue": "空处要说明“谁在穿、为什么穿”，让后句的 they 有指代。",
    "plain": "B 说它鼓励人们选择色彩鲜艳的衣服，they 指代选择彩色衣服的人，与后句 So they can get more dopamine 接得上。",
    "exclude": "A 讲黄色、C 讲大脑化学物质、D 讲绿色、E 讲红色球队，都与“多巴胺穿搭成为潮流”这一句的衔接无关。",
    "evidence": "Probably, dopamine (多巴胺) clothes have been a trend (潮流) on some short videos.",
    "highlightTerms": [
     "Probably, dopamine (多巴胺) clothes have been a trend (潮流) on some short videos."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "概念解释",
    "chain": "先定义多巴胺 → this kind of chemical 才有指代",
    "observe": "空后第一句是 This kind of chemical can influence how we feel。",
    "clue": "后句用 This kind of chemical 指代，空处必须先出现一种化学物质。",
    "plain": "C 先说 Dopamine is a chemical in our brain，后句 this kind of chemical 指的就是多巴胺。",
    "exclude": "其余选项都没有提到化学物质，后句的 This kind of chemical 会落空。",
    "evidence": "This kind of chemical can influence how we feel.",
    "highlightTerms": [
     "This kind of chemical can influence how we feel."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "研究结论支撑",
    "chain": "红衣研究 → It showed that → 另一项研究",
    "observe": "空前说 One study found that wearing red can lead to a better physical performance in soccer，空后是 Another study。",
    "clue": "空处要交代这项研究的具体发现，并用 It 指代 study。",
    "plain": "E 的 It showed that teams in red uniforms always played best in home games 正是“穿红表现更好”的研究结论。",
    "exclude": "A、B、C、D 都不是“红色与运动表现”的研究发现，放进来会打断研究举例。",
    "evidence": "One study found that wearing red can lead to a better physical performance in soccer over the last 55 years.",
    "highlightTerms": [
     "One study found that wearing red can lead to a better physical performance in soccer over the last 55 years."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "同义复现",
    "chain": "绿色让人更有创造力 → 绿色让人放松 → 它让人想起自然",
    "observe": "空前说 wearing green can make people more creative，空后说 Perhaps it can remind us of the nature。",
    "clue": "空处要延续 green 的话题，并给出另一个好处。",
    "plain": "D 的 Green 与空前 green 复现，relax 与 creative 同向，后句 it 指代 green。",
    "exclude": "A 讲黄色、E 讲红色，颜色不一致；B、C 与绿色无关。",
    "evidence": "Another study showed that wearing green can make people more creative.",
    "highlightTerms": [
     "Another study showed that wearing green can make people more creative."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "并列收尾",
    "chain": "黄色象征温暖 → 让人感到温暖 → 带来快乐、能量和兴奋",
    "observe": "空前两句都在讲黄色：Yellow has signs of warmth. It makes people feel warm。",
    "clue": "空处继续讲黄色带来的感受，和前两句构成并列。",
    "plain": "A 的 Wearing yellow 与空前复现，happiness, energy and excitement 与 warm 同向，放在段尾收束整段。",
    "exclude": "B、C、D、E 都没有延续“黄色—温暖—感受”这条线。",
    "evidence": "Yellow has signs of warmth. It makes people feel warm.",
    "highlightTerms": [
     "Yellow has signs of warmth. It makes people feel warm."
    ]
   }
  }
 },
 {
  "id": 105,
  "title": "保护耳朵的四个做法",
  "source": "2022年新疆维吾尔自治区、新疆生产建设兵团中考真题",
  "range": "57—61",
  "passage": [
   "We do eye exercises. We wear sunglasses. We do lots of things to protect our eyes. [[1]]",
   "Ears help us hear the world. But many things, such as loud noises, can cause hearing troubles. So how can we protect our ears? Let's take a look together.",
   "Keep your ears dry and warm",
   "[[2]] If you feel water in your ear, shake your head a little bit. This can help you get the water out of your ear. Also in summer, when the sun is shining, wear some sunscreen (防晒霜) on your ears. [[3]]",
   "How to clean your ears",
   "[[4]] The earwax (耳屎) itself comes out of the ear along with some dirt. Don't clean your ears with anything sharp, or it can make the earwax go too deep into your ears and hurt them. But if your ears start to hurt, you can go to a doctor for help.",
   "How to use headphones",
   "Don't listen to loud music on your headphones for a long time. Over-the-ear headphones (头戴式耳机) are better than in-ear ones. [[5]]"
  ],
  "options": [
   "A. They do a better job of stopping outside noise so you can listen at a lower volume.",
   "B. But we usually forget another important part of our body, the ears.",
   "C. Dry your ears after swimming or taking a shower.",
   "D. Usually, our ears clean themselves.",
   "E. In winter, protect your ears with a hat or a scarf."
  ],
  "answers": {
   "1": "B",
   "2": "C",
   "3": "E",
   "4": "D",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "转折引题",
    "chain": "保护眼睛 → 却忘了耳朵 → 耳朵话题",
    "observe": "空前一句说我们做了很多事保护眼睛，空后第一句突然说 Ears help us hear the world。",
    "clue": "空前是眼睛，空后是耳朵，中间需要一个转折把话题从眼睛引到耳朵。",
    "plain": "B 用 But 转折，说我们常常忘记身体的另一个重要部分——耳朵，the ears 正好与下句 Ears 复现。",
    "exclude": "A 讲耳机降噪、C 讲擦干耳朵、D 讲耳朵自洁、E 讲冬天护耳，都还没到“耳朵”这个话题，放这里接不上。",
    "evidence": "Ears help us hear the world.",
    "highlightTerms": [
     "Ears help us hear the world."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "小标题呼应",
    "chain": "dry and warm → 擦干耳朵 → 处理进水",
    "observe": "小标题是 Keep your ears dry and warm，空后立刻说 If you feel water in your ear。",
    "clue": "空后第一句处理“耳朵进水”，空处应先说“把耳朵擦干”。",
    "plain": "C 的 Dry your ears 直接对应小标题里的 dry，after swimming or taking a shower 也解释了水从哪里来。",
    "exclude": "A 讲耳机、B 讲眼睛、D 讲耳屎、E 讲冬天保暖，都不能承接“进水”这个动作。",
    "evidence": "If you feel water in your ear, shake your head a little bit.",
    "highlightTerms": [
     "If you feel water in your ear, shake your head a little bit."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "季节对照",
    "chain": "夏天防晒 → 冬天保暖",
    "observe": "空前说 Also in summer ... wear some sunscreen on your ears，空后进入下一个标题 How to clean your ears。",
    "clue": "空前是 summer，空处需要一个与夏天并列、形成对照的季节建议。",
    "plain": "E 用 In winter 与 summer 对照，a hat or a scarf 正好对应小标题的 warm。",
    "exclude": "A、B、C、D 都没有季节信息，放进来会打断“夏—冬”的对照。",
    "evidence": "Also in summer, when the sun is shining, wear some sunscreen (防晒霜) on your ears.",
    "highlightTerms": [
     "Also in summer, when the sun is shining, wear some sunscreen (防晒霜) on your ears."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "反常识总起",
    "chain": "耳朵会自洁 → 耳屎自己掉出 → 不要乱掏",
    "observe": "小标题是 How to clean your ears，空后说 The earwax itself comes out of the ear along with some dirt。",
    "clue": "空后说耳屎会自己出来，空处应先点明“耳朵会自己清洁”这个反常识结论。",
    "plain": "D 说耳朵通常会自己清洁，后句再用耳屎自己掉出来作解释，逻辑顺。",
    "exclude": "A、B、C、E 都没有“自己清洁”的意思，放进“如何清洁耳朵”这一段会前后矛盾。",
    "evidence": "The earwax (耳屎) itself comes out of the ear along with some dirt.",
    "highlightTerms": [
     "The earwax (耳屎) itself comes out of the ear along with some dirt."
    ]
   },
   "5": {
    "level": "第二级",
    "method": "解释原因",
    "chain": "头戴式耳机更好 → They 指代 → 降噪所以能小声听",
    "observe": "空前说 Over-the-ear headphones are better than in-ear ones，空处要解释“为什么更好”。",
    "clue": "选项要用 They 指代 over-the-ear headphones，并说明好处。",
    "plain": "A 的 They 指代头戴式耳机，stopping outside noise so you can listen at a lower volume 正是“更好”的原因。",
    "exclude": "B、C、D、E 的主语或话题都接不上头戴式耳机，指代不闭合。",
    "evidence": "Over-the-ear headphones (头戴式耳机) are better than in-ear ones.",
    "highlightTerms": [
     "Over-the-ear headphones (头戴式耳机) are better than in-ear ones."
    ]
   }
  }
 },
 {
  "id": 106,
  "title": "躺床上睡不着怎么办",
  "source": "2026年新疆吐鲁番一模",
  "range": "1—5",
  "passage": [
   "Have you ever had a day when you are very tired, but when you go to bed at night, you just can’t sleep? However, when you sit on the sofa and watch TV or use your phone, you become sleepy very quickly.",
   "[[1]]",
   "One important reason is that people often feel worried in bed. They think, “I must sleep now!” This makes them nervous. When you are nervous, it is hard to sleep.",
   "On the sofa, you are relaxed.[[2]]     You don’t think “I must sleep”, so you fall asleep easily. Some people cannot sleep because they think too much. Work problems or other worries come into the mind. Also, if you wake up late at night, it is easy to think about bad things and feel afraid. This makes sleep go away.",
   "How can you sleep better?",
   "[[3]]     One hour before sleep, stop using phones or computers. Listen to soft music or read a book.",
   "Second, write down your worries before sleeping. This can help you stop thinking too much.",
   "Third, go to bed at once when you feel sleepy. If you don’t fall asleep after 30 minutes, get up and do something quiet until you feel tired again.",
   "Last, try to sleep enough time every day, not too long or too short— even on weekends.[[4]]",
   "Remember: don’t worry too much about sleep.[[5]]"
  ],
  "options": [
   "A. Just relax, and you can sleep well every night.",
   "B. First, make your bedtime calm.",
   "C. Why is it easier to sleep on the sofa than in bed?",
   "D. Most adults need 7 to 8 hours of sleep each night.",
   "E. The room is not too bright, the sofa is soft, and sounds from the TV are quiet."
  ],
  "answers": {
   "1": "C",
   "2": "E",
   "3": "B",
   "4": "D",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "One important reason is that people often feel worried in bed. → 代词指代",
    "observe": "后面提到“One important reason is that people often feel worried in bed.”，说明接下来要解释为什么在床上难入睡、在沙发上容易睡着，因此这里需要提出一个关于沙发和床上睡眠差异的问题。C项“Why is it easier to sleep on the sof",
    "clue": "One important reason is that people often feel worried in bed.",
    "plain": "后面提到“One important reason is that people often feel worried in bed.”，说明接下来要解释为什么在床上难入睡、在沙发上容易睡着，因此这里需要提出一个关于沙发和床上睡眠差异的问题。C项“Why is it easier to sleep on the sofa than in bed?”符合语境，起到承上启下的作用。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "One important reason is that people often feel worried in bed."
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "On the sofa, you are relaxed. → 上下文呼应",
    "observe": "前面提到“On the sofa, you are relaxed.”，说明接下来要具体描述在沙发上放松的环境和状态，后文又说“You don’t think ‘I must sleep’, so you fall asleep easily.”，因此这里需要补充沙发上利于睡眠的环境条件。E项“The room is ",
    "clue": "On the sofa, you are relaxed.",
    "plain": "前面提到“On the sofa, you are relaxed.”，说明接下来要具体描述在沙发上放松的环境和状态，后文又说“You don’t think ‘I must sleep’, so you fall asleep easily.”，因此这里需要补充沙发上利于睡眠的环境条件。E项“The room is not too bright, the sofa is soft, and sounds from the TV are quiet.”恰好说明了这种舒适的环境，使逻辑连贯。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "On the sofa, you are relaxed."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "逻辑关系突破",
    "chain": "How can you sleep better? / Second, write down your worries before sleeping. → 逻辑关系",
    "observe": "前面提到“How can you sleep better?”，说明接下来要给出改善睡眠的建议，后文出现“Second, write down your worries before sleeping.”，表明第一条建议在此处。B项“First, make your bedtime calm.”符合语境。",
    "clue": "How can you sleep better?；Second, write down your worries before sleeping.",
    "plain": "前面提到“How can you sleep better?”，说明接下来要给出改善睡眠的建议，后文出现“Second, write down your worries before sleeping.”，表明第一条建议在此处。B项“First, make your bedtime calm.”符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "How can you sleep better?",
     "Second, write down your worries before sleeping."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Last, try to sleep enough time every day, not too long or too short— even on weekends. → 段落主旨",
    "observe": "前面提到“Last, try to sleep enough time every day, not too long or too short— even on weekends.”，说明接下来要具体说明每天需要睡多久，因此这里需要给出具体的睡眠时间。D项“Most adults need 7 to 8 hours ",
    "clue": "Last, try to sleep enough time every day, not too long or too short— even on weekends.",
    "plain": "前面提到“Last, try to sleep enough time every day, not too long or too short— even on weekends.”，说明接下来要具体说明每天需要睡多久，因此这里需要给出具体的睡眠时间。D项“Most adults need 7 to 8 hours of sleep each night.”提供了具体数据，使建议更加完整。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Last, try to sleep enough time every day, not too long or too short— even on weekends."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Remember: don’t worry too much about sleep. → 段落主旨",
    "observe": "前面提到“Remember: don’t worry too much about sleep.”，说明接下来要给出总结性的建议。A项“Just relax, and you can sleep well every night. ”符合语境，与上文呼应，自然收束全文。",
    "clue": "Remember: don’t worry too much about sleep.",
    "plain": "前面提到“Remember: don’t worry too much about sleep.”，说明接下来要给出总结性的建议。A项“Just relax, and you can sleep well every night. ”符合语境，与上文呼应，自然收束全文。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Remember: don’t worry too much about sleep."
    ]
   }
  }
 },
 {
  "id": 107,
  "title": "象棋比赛中的冷静",
  "source": "2026年新疆和田二模",
  "range": "1—5",
  "passage": [
   "Last month, I took part in a chess competition. I was thirsty for winning the game. I became nervous as soon as the game began because I couldn’t stop considering what the result would be. It was hard for me to pay attention to the chess board. I couldn’t think clearly.[[1]]     As a result, I was about to fail the competition.",
   "Seeing my uneasiness (不安), my coach came over and said, “[[2]]     A nervous mind only brings wrong decisions. Keep calm (冷静), and you will see the right way. Believe in yourself.”",
   "After hearing his words, I closed my eyes for a moment and took a deep breath. I tried to forget about winning or losing the game.[[3]]    . Gradually, my mind became peaceful. To everyone’s surprise, I soon changed the situation.[[4]]",
   "[[5]]     But if we stay calm and peaceful, we can think clearly and solve problems wisely."
  ],
  "options": [
   "A. In the end, I won the game.",
   "B. I made several silly mistakes.",
   "C. When we are worried, we easily lose our way.",
   "D. Then I started to pay more attention to the chess board.",
   "E. Just relax yourself."
  ],
  "answers": {
   "1": "B",
   "2": "E",
   "3": "D",
   "4": "A",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "As a result, I was about to fail the competition. → 因果关系",
    "observe": "前文提到作者比赛一开始就紧张，无法专注棋盘、不能清晰思考，后文说结果是比赛快要输了。选项B“I made several silly mistakes.”（我犯了几个愚蠢的错误），因为紧张而犯错导致比赛要输，符合逻辑。",
    "clue": "As a result, I was about to fail the competition.",
    "plain": "前文提到作者比赛一开始就紧张，无法专注棋盘、不能清晰思考，后文说结果是比赛快要输了。选项B“I made several silly mistakes.”（我犯了几个愚蠢的错误），因为紧张而犯错导致比赛要输，符合逻辑。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "As a result, I was about to fail the competition."
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "yourself → 上下文呼应",
    "observe": "教练看到作者不安，后面提到紧张的心态只会带来错误决定，要保持冷静等话语。选项E“Just relax yourself.”（放松你自己），这是教练让作者放松的话，符合教练安慰的语境。",
    "clue": "yourself",
    "plain": "教练看到作者不安，后面提到紧张的心态只会带来错误决定，要保持冷静等话语。选项E“Just relax yourself.”（放松你自己），这是教练让作者放松的话，符合教练安慰的语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "yourself"
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": ". Gradually, my mind became peaceful. To everyone’s surprise, I → 上下文呼应",
    "observe": "作者听了教练的话后闭上眼睛深呼吸，努力忘记比赛输赢，接下来应该是重新开始关注棋盘。选项D“Then I started to pay more attention to the chess - board.”（然后我开始更多地关注棋盘），符合作者调整状态后的行为。",
    "clue": ". Gradually, my mind became peaceful. To everyone’s surprise, I",
    "plain": "作者听了教练的话后闭上眼睛深呼吸，努力忘记比赛输赢，接下来应该是重新开始关注棋盘。选项D“Then I started to pay more attention to the chess - board.”（然后我开始更多地关注棋盘），符合作者调整状态后的行为。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     ". Gradually, my mind became peaceful. To everyone’s surprise, I"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "game → 段落主旨",
    "observe": "前文说作者改变了局面，选项A“In the end, I won the game.”（最后，我赢得了比赛），改变局面后赢得比赛，逻辑连贯。",
    "clue": "game",
    "plain": "前文说作者改变了局面，选项A“In the end, I won the game.”（最后，我赢得了比赛），改变局面后赢得比赛，逻辑连贯。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "game"
    ]
   },
   "5": {
    "level": "第二级",
    "method": "转折关系突破",
    "chain": "But if we stay calm and peaceful, we can think clearly and solve problems wisely. → 转折关系",
    "observe": "后文说但如果我们保持冷静和平和，就能清晰思考并明智地解决问题。选项C“When we are worried, we easily lose our way.”（当我们担忧时，我们很容易迷失方向），与后文形成对比，说明担忧和冷静时的不同状态。",
    "clue": "But if we stay calm and peaceful, we can think clearly and solve problems wisely.",
    "plain": "后文说但如果我们保持冷静和平和，就能清晰思考并明智地解决问题。选项C“When we are worried, we easily lose our way.”（当我们担忧时，我们很容易迷失方向），与后文形成对比，说明担忧和冷静时的不同状态。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "But if we stay calm and peaceful, we can think clearly and solve problems wisely."
    ]
   }
  }
 },
 {
  "id": 108,
  "title": "坚持锻炼的四条建议",
  "source": "2026年新疆乌鲁木齐二模",
  "range": "1—5",
  "passage": [
   "Physical exercise is a great way to improve your health. You may find it hard to keep exercising.[[1]]",
   "Start Exercising Slowly",
   "You don’t need to exercise for a long time at first. Start with 5 to 10 minutes each day. After getting used to it, you can slowly make your exercise time longer.[[2]]",
   "Choose One Sport You Love",
   "Why do you choose a sport you like?[[3]]     When you finally choose one you enjoy, you will stick to it easily.",
   "Set Possible Small Goals",
   "[[4]]     You can set small goals such as exercising three times a week or running two kilometers each time. When you reach your goal, you will feel proud and want to continue.",
   "Make Exercise a Daily Habit",
   "Choose a regular (有规律的) time to exercise every day.[[5]]     Soon it will become a daily habit, just like brushing your teeth.",
   "Start today and experience the wonderful feeling!"
  ],
  "options": [
   "A. Don’t push yourself too hard.",
   "B. For example, you can exercise for more than 20 minutes.",
   "C. Here are some useful suggestions that can help you.",
   "D. You can exercise in the morning or after dinner.",
   "E. Because love gives you the power to keep trying."
  ],
  "answers": {
   "1": "C",
   "2": "B",
   "3": "E",
   "4": "A",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "You may find it hard to keep exercising. → 因果关系",
    "observe": "前文说“体育锻炼有益健康，但你可能很难坚持锻炼”，后文介绍了几个坚持锻炼的方法，所以这里需要一个承上启下的句子。选项C“Here are some useful suggestions that can help you.”可以承上启下。",
    "clue": "You may find it hard to keep exercising.",
    "plain": "前文说“体育锻炼有益健康，但你可能很难坚持锻炼”，后文介绍了几个坚持锻炼的方法，所以这里需要一个承上启下的句子。选项C“Here are some useful suggestions that can help you.”可以承上启下。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "You may find it hard to keep exercising."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Start Exercising Slowly → 小标题格式",
    "observe": "本段小标题是“Start Exercising Slowly”，前文说“从每天5到10分钟开始，习惯后可以慢慢延长锻炼时间”，这里需要举例说明延长后的时长。选项B“For example, you can exercise for more than 20 minutes.”符合语境。",
    "clue": "Start Exercising Slowly",
    "plain": "本段小标题是“Start Exercising Slowly”，前文说“从每天5到10分钟开始，习惯后可以慢慢延长锻炼时间”，这里需要举例说明延长后的时长。选项B“For example, you can exercise for more than 20 minutes.”符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Start Exercising Slowly"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Choose One Sport You Love → 小标题格式",
    "observe": "本段小标题是“Choose One Sport You Love”，前文问“为什么要选择自己喜欢的运动？”，这里需要解释原因。选项E“Because love gives you the power to keep trying.”符合语境。",
    "clue": "Choose One Sport You Love",
    "plain": "本段小标题是“Choose One Sport You Love”，前文问“为什么要选择自己喜欢的运动？”，这里需要解释原因。选项E“Because love gives you the power to keep trying.”符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Choose One Sport You Love"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Set Possible Small Goals → 小标题格式",
    "observe": "本段小标题是“Set Possible Small Goals”，后文说“你可以设定小目标，比如每周锻炼三次或每次跑两公里”，这里需要总述不要给自己太大压力。选项A“Don’t push yourself too hard.”符合语境。",
    "clue": "Set Possible Small Goals",
    "plain": "本段小标题是“Set Possible Small Goals”，后文说“你可以设定小目标，比如每周锻炼三次或每次跑两公里”，这里需要总述不要给自己太大压力。选项A“Don’t push yourself too hard.”符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Set Possible Small Goals"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Make Exercise a Daily Habit → 小标题格式",
    "observe": "本段小标题是“Make Exercise a Daily Habit”，前文说“选择每天规律的锻炼时间”，这里需要举例说明锻炼时间。选项D“You can exercise in the morning or after dinner.”符合语境。",
    "clue": "Make Exercise a Daily Habit",
    "plain": "本段小标题是“Make Exercise a Daily Habit”，前文说“选择每天规律的锻炼时间”，这里需要举例说明锻炼时间。选项D“You can exercise in the morning or after dinner.”符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Make Exercise a Daily Habit"
    ]
   }
  }
 },
 {
  "id": 109,
  "title": "AI工具与字典怎么选",
  "source": "2026年新疆克拉玛依一模",
  "range": "1—5",
  "passage": [
   "Have you ever followed the suggestions of AI tools to replace a word or improve a sentence? Before AI tools became popular, people used dictionaries for the same purpose.[[1]]",
   "In my point of view, AI tools offer clear advantages. They can quickly answer questions about vocabulary, grammar, and sentence patterns. For example, when you type a sentence, AI can correct mistakes at once and suggest better expressions.[[2]]    This makes learning faster and more convenient, especially when time is limited.",
   "[[3]]     They provide detailed information about words, including meanings, parts of speech, word origins, and so on.[[4]]     But this active process helps learners understand and remember words and expressions more deeply. Such careful learning is important for building long-term language skills.",
   "In short, AI tools are quick and efficient, while dictionaries support deeper understanding.[[5]]     Next time you study, use AI for instant (即时的) help and a dictionary for detailed study—you will achieve better results."
  ],
  "options": [
   "A. So now, do we still need dictionaries?",
   "B. Dictionaries, however, are still valuable.",
   "C. It can also give examples right for your ability.",
   "D. Using them together can greatly better your English.",
   "E. Looking up words in a dictionary requires more effort."
  ],
  "answers": {
   "1": "A",
   "2": "C",
   "3": "B",
   "4": "E",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "逻辑关系突破",
    "chain": "dictionaries → 逻辑关系",
    "observe": "前文提及“在AI工具普及前，人们用词典达到同样目的”，后文随即阐述AI工具的优势，A项“So now, do we still need dictionaries?”以问题引出下文对AI工具和词典关系的讨论，起到承上启下的作用。",
    "clue": "dictionaries",
    "plain": "前文提及“在AI工具普及前，人们用词典达到同样目的”，后文随即阐述AI工具的优势，A项“So now, do we still need dictionaries?”以问题引出下文对AI工具和词典关系的讨论，起到承上启下的作用。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "dictionaries"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "This makes learning faster and more convenient, especially when time is limited. → 代词指代",
    "observe": "前文说明AI能“立刻纠正错误并建议更好表达”，C项“It can also give examples right for your ability.”继续补充AI的另一项优势，引出后文AI学习更快更便捷的结论。",
    "clue": "This makes learning faster and more convenient, especially when time is limited.",
    "plain": "前文说明AI能“立刻纠正错误并建议更好表达”，C项“It can also give examples right for your ability.”继续补充AI的另一项优势，引出后文AI学习更快更便捷的结论。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "This makes learning faster and more convenient, especially when time is limited."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "转折关系突破",
    "chain": "They provide detailed information about words, including meanings, parts of speech, word origins, and so on. → 转折关系",
    "observe": "前文侧重AI的便捷高效，后文则表明词典能提供详细信息，存在语义转折。B项“Dictionaries, however, are still valuable.”明确转折关系，引出对词典价值的阐述。",
    "clue": "They provide detailed information about words, including meanings, parts of speech, word origins, and so on.",
    "plain": "前文侧重AI的便捷高效，后文则表明词典能提供详细信息，存在语义转折。B项“Dictionaries, however, are still valuable.”明确转折关系，引出对词典价值的阐述。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "They provide detailed information about words, including meanings, parts of speech, word origins, and so on."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "转折关系突破",
    "chain": "this active process → 转折关系",
    "observe": "后文“But this active process helps learners understand and remember ...”说明设空处应提及词典使用的特点，E项“Looking up words in a dictionary requires more effort.”对应后文的“this activ",
    "clue": "this active process",
    "plain": "后文“But this active process helps learners understand and remember ...”说明设空处应提及词典使用的特点，E项“Looking up words in a dictionary requires more effort.”对应后文的“this active process”，引出转折，符合逻辑。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "this active process"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "better → 段落主旨",
    "observe": "前文总结AI和词典各自的优势，D项“Using them together can greatly better your English.”是对前文的总结并给出结论，且与后文“用AI即时辅助、用词典深入学习”的建议相呼应。",
    "clue": "better",
    "plain": "前文总结AI和词典各自的优势，D项“Using them together can greatly better your English.”是对前文的总结并给出结论，且与后文“用AI即时辅助、用词典深入学习”的建议相呼应。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "better"
    ]
   }
  }
 },
 {
  "id": 110,
  "title": "爱护动物的四件小事",
  "source": "2026年新疆一模",
  "range": "1—5",
  "passage": [
   "Do you love animals? Do you wish to do more to help them? Well, you can![[1]]",
   "Be a life saver for animals.",
   "Be sure to ask your parents to call the animal center right away if you find any animals in danger. Your actions can encourage others to care for animals, too.[[2]]",
   "Raise homeless animals.",
   "If your family is thinking about welcoming a new family member into your home, you can raise those homeless animals instead of buying pets.[[3]]     And you can raise them if you have enough time, space and money.",
   "[[4]]",
   "It’s necessary for everyone to help animals by always checking the clothing’s labels. And ask your parents to buy only fur-free (不含皮毛的) clothes and products. After all, a kind heart is the best fashion ever.",
   "Be nice to insects.",
   "[[5]]     Ants, for example, can carry up to 20 times their body weight and have been on the earth for more than 100 million years. However, some ants are dangerous to humans. People can use natural objects to keep them away instead of killing them.",
   "It’s our duty to protect and save animals in the world. Take action from now on!"
  ],
  "options": [
   "A. How wonderful insects are!",
   "B. Don’t let animals become your clothes.",
   "C. And animals may be saved with your call.",
   "D. You can start by doing the following steps.",
   "E. That will be more meaningful."
  ],
  "answers": {
   "1": "D",
   "2": "C",
   "3": "E",
   "4": "B",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Do you wish to do more to help them? Well, you can! → 段落主旨",
    "observe": "根据文章开头“Do you wish to do more to help them? Well, you can!”以及下文列举的具体方法可知，此处应引出下文的具体步骤。D选项是引出下文的过渡句，符合语境。",
    "clue": "Do you wish to do more to help them? Well, you can!",
    "plain": "根据文章开头“Do you wish to do more to help them? Well, you can!”以及下文列举的具体方法可知，此处应引出下文的具体步骤。D选项是引出下文的过渡句，符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Do you wish to do more to help them? Well, you can!"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "animals / your → 段落主旨",
    "observe": "根据前文“Be sure to ask your parents to call the animal center right away if you find any animals in danger. Your actions can encourage others to care for animals, ",
    "clue": "animals；your",
    "plain": "根据前文“Be sure to ask your parents to call the animal center right away if you find any animals in danger. Your actions can encourage others to care for animals, too.”可知，此处强调拨打救助电话对动物的作用。C选项说明了打电话的积极作用。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "animals",
     "your"
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "you can raise those homeless animals instead of buying pets. / And you can raise them if you have enough time, space and money. → 上下文呼应",
    "observe": "根据前文“you can raise those homeless animals instead of buying pets.”以及“And you can raise them if you have enough time, space and money.”可知，领养流浪动物比购买宠物更有意义。",
    "clue": "you can raise those homeless animals instead of buying pets.；And you can raise them if you have enough time, space and money.",
    "plain": "根据前文“you can raise those homeless animals instead of buying pets.”以及“And you can raise them if you have enough time, space and money.”可知，领养流浪动物比购买宠物更有意义。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "you can raise those homeless animals instead of buying pets.",
     "And you can raise them if you have enough time, space and money."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "It’s necessary for everyone to help animals by always checking the clothing’s labels. → 小标题格式",
    "observe": "根据本段内容“always checking the clothing’s labels. And ask your parents to buy only fur-free clothes and products.”可知，本段主题是反对使用动物皮毛制作衣物。",
    "clue": "If your family is thinking about welcoming a new",
    "plain": "根据本段内容“always checking the clothing’s labels. And ask your parents to buy only fur-free clothes and products.”可知，本段主题是反对使用动物皮毛制作衣物。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "It’s necessary for everyone to help animals by always checking the clothing’s labels."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Ants, for example, can carry up to 20 times their body weight and have been on the earth for more than 100 million years. → 段落主旨",
    "observe": "根据本段内容“Ants... have been on the earth for more than 100 million years.”可知，本段在强调昆虫的奇妙之处，并引导人们友善对待昆虫。",
    "clue": "Ants, for example, can carry up to 20 times their body weight and have been on the earth for more than 100 million years.",
    "plain": "根据本段内容“Ants... have been on the earth for more than 100 million years.”可知，本段在强调昆虫的奇妙之处，并引导人们友善对待昆虫。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Ants, for example, can carry up to 20 times their body weight and have been on the earth for more than 100 million years."
    ]
   }
  }
 },
 {
  "id": 111,
  "title": "生活平衡中的五个球",
  "source": "2026年新疆昌吉二模",
  "range": "1—5",
  "passage": [
   "Imagine life is a game. You are throwing five balls in the air.[[1]]     Soon you will understand something important. Work is like a rubber ball (皮球). If you drop it, it will bounce (反弹) back. But the other four balls—family, health, friends, and spirit—are made of glass.[[2]]     Or it may get a small crack. It will never be the same again. So you need to keep a good balance in your life.",
   "So how can you do that? First, don’t compare yourself with others.[[3]]     Don’t let other people tell you what is important. Only you know what is best for you.[[4]]     They are like your life. Without them, life is empty. Third, never give up. When you still have something left to give, keep trying. You only fail when you stop.",
   "Don’t shut love out of your life. Don’t say it is too hard to find.[[5]]     If you hold love too tightly, you will lose it. The best way to keep love is to give room to fly.",
   "Life is not a race. You don’t have to be the fastest. Life is a journey, so enjoy every step along the way."
  ],
  "options": [
   "A. If you drop one of them, it will break.",
   "B. The quickest way to receive love is to give.",
   "C. Second, hold on to the people and things you love.",
   "D. We are all different, and that makes each of us special.",
   "E. You give them names: work, family, health, friends, and spirit."
  ],
  "answers": {
   "1": "E",
   "2": "A",
   "3": "D",
   "4": "C",
   "5": "B"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "work / family → 代词指代",
    "observe": "第一段提到在空中抛五个球，紧接着E选项“You give them names: work, family, health, friends, and spirit.”直接说明了给这五个球命名，为后文对工作和其他四个方面的阐述做了铺垫。",
    "clue": "work；family",
    "plain": "第一段提到在空中抛五个球，紧接着E选项“You give them names: work, family, health, friends, and spirit.”直接说明了给这五个球命名，为后文对工作和其他四个方面的阐述做了铺垫。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "work",
     "family"
    ]
   },
   "2": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "drop / will → 因果关系",
    "observe": "前文指出家庭、健康、朋友和精神这四个球是由玻璃制成的，A选项“If you drop one of them, it will break.”进一步说明了玻璃球掉落会破碎的结果，与前文逻辑紧密相连。",
    "clue": "drop；will",
    "plain": "前文指出家庭、健康、朋友和精神这四个球是由玻璃制成的，A选项“If you drop one of them, it will break.”进一步说明了玻璃球掉落会破碎的结果，与前文逻辑紧密相连。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "drop",
     "will"
    ]
   },
   "3": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "that → 因果关系",
    "observe": "前文提到不要把自己和别人比较，D选项“We are all different, and that makes each of us special.”解释了不要和别人比较的原因，即我们每个人都不一样，都很特别。",
    "clue": "that",
    "plain": "前文提到不要把自己和别人比较，D选项“We are all different, and that makes each of us special.”解释了不要和别人比较的原因，即我们每个人都不一样，都很特别。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "that"
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "They are like your life. Without them, life is empty. / Third, never give up. → 上下文呼应",
    "observe": "根据后文“They are like your life. Without them, life is empty.”以及“Third, never give up.”可知，此处是在阐述第二条建议，C选项“Second, hold on to the people and things you love.”符合语境。",
    "clue": "They are like your life. Without them, life is empty.；Third, never give up.",
    "plain": "根据后文“They are like your life. Without them, life is empty.”以及“Third, never give up.”可知，此处是在阐述第二条建议，C选项“Second, hold on to the people and things you love.”符合语境。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "They are like your life. Without them, life is empty.",
     "Third, never give up."
    ]
   },
   "5": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "love / give → 上下文呼应",
    "observe": "前文提到不要把爱拒之门外，不要说它太难找到，B选项“The quickest way to receive love is to give.”与前文关于爱的内容相呼应，说明了接受爱最快的方式是给予。",
    "clue": "love；give",
    "plain": "前文提到不要把爱拒之门外，不要说它太难找到，B选项“The quickest way to receive love is to give.”与前文关于爱的内容相呼应，说明了接受爱最快的方式是给予。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "love",
     "give"
    ]
   }
  }
 },
 {
  "id": 112,
  "title": "学校应当开设烹饪课",
  "source": "2026年新疆二模",
  "range": "1—5",
  "passage": [
   "Cooking should be considered as an art just like any other activity which needs skills and knowledge. It is often said that students are supposed to learn how to prepare meals.[[1]]",
   "Cooking is an important skill in life.",
   "It’s very necessary for schools to teach knowledge of cooking to the students.[[2]]     Also, they can step into the world knowing how to make a living.",
   "Cooking helps discover future jobs.",
   "When schools offer cooking lessons, students may show an interest in cooking.[[3]]     This will give them the chance to practice their basic skills and be creative in the kitchen.",
   "[[4]]",
   "One of the main reasons why cooking should be taught in schools is that the students always spend a lot of money to buy take-out food, while in fact they could prepare a nice meal with less cost by buying the required ingredients (食材).",
   "Cooking improves math learning.",
   "Schools do not just teach how to prepare delicious meals. Students are also taught to follow the instructions in a standard when mixing ingredients.[[5]]     students should only add that amount. So there is no more or less."
  ],
  "options": [
   "A. Cooking helps avoid wasting money.",
   "B. Students can lead independent lives after leaving school.",
   "C. They may even choose cooking as their future jobs.",
   "D. The following will explain why cooking should be taught in schools.",
   "E. For example, they need to add 1/4 spoon of salt as required."
  ],
  "answers": {
   "1": "D",
   "2": "B",
   "3": "C",
   "4": "A",
   "5": "E"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "cooking / should → 小标题格式",
    "observe": "首段提出核心观点“烹饪是一门艺术，学生应该学习做饭”，空后内容分别以“Cooking is an important skill in life/Cooking helps discover future jobs…”等为小标题，分点论述学校教烹饪的原因，D项“The following will explain wh",
    "clue": "cooking；should",
    "plain": "首段提出核心观点“烹饪是一门艺术，学生应该学习做饭”，空后内容分别以“Cooking is an important skill in life/Cooking helps discover future jobs…”等为小标题，分点论述学校教烹饪的原因，D项“The following will explain why cooking should be taught in schools.”起承上启下、总领下文的作用，完美衔接首段观点和后文的分点阐释。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "cooking",
     "should"
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Students / school → 上下文呼应",
    "observe": "该板块核心讲烹饪是重要的生活技能，空后句“此外，他们步入社会后知道如何谋生”中，Also是并列衔接词，说明空处内容与“谋生”同属“生活技能”的益处，B项“Students can lead independent lives after leaving school.”与后文形成并列，且贴合“烹饪让学生具备生活能力”的",
    "clue": "Students；school",
    "plain": "该板块核心讲烹饪是重要的生活技能，空后句“此外，他们步入社会后知道如何谋生”中，Also是并列衔接词，说明空处内容与“谋生”同属“生活技能”的益处，B项“Students can lead independent lives after leaving school.”与后文形成并列，且贴合“烹饪让学生具备生活能力”的核心。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Students",
     "school"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "cooking / their → 代词指代",
    "observe": "该板块标题为“烹饪帮助发掘未来职业”，空前提到“学校开设烹饪课，学生可能会对烹饪产生兴趣”，空后讲“这能让他们练习基础技能、在厨房发挥创造力”，C项“They may even choose cooking as their future jobs.”衔接“产生兴趣”和“技能实践”，且紧扣“未来职业”主题，是对“发掘职",
    "clue": "cooking；their",
    "plain": "该板块标题为“烹饪帮助发掘未来职业”，空前提到“学校开设烹饪课，学生可能会对烹饪产生兴趣”，空后讲“这能让他们练习基础技能、在厨房发挥创造力”，C项“They may even choose cooking as their future jobs.”衔接“产生兴趣”和“技能实践”，且紧扣“未来职业”主题，是对“发掘职业”的具体阐释，逻辑连贯。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "cooking",
     "their"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "One of the main reasons why cooking should be taught in schools is that the students always spend a lot of money to buy take-out food, while in fact they could prepare a nice meal with less cost by buying the required ingredients (食材). → 小标题格式",
    "observe": "本文每个分论点都以“Cooking+动词短语”的句式作小标题，空后内容核心讲“学生花很多钱买外卖，而自己做饭用更少的食材成本就能做出美食”，核心主旨是“烹饪能减少金钱浪费”，A项“Cooking helps avoid wasting money.”贴合全文小标题格式，内容精准对应后文论据。",
    "clue": "When schools offer cooking lessons, students may show an",
    "plain": "本文每个分论点都以“Cooking+动词短语”的句式作小标题，空后内容核心讲“学生花很多钱买外卖，而自己做饭用更少的食材成本就能做出美食”，核心主旨是“烹饪能减少金钱浪费”，A项“Cooking helps avoid wasting money.”贴合全文小标题格式，内容精准对应后文论据。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "One of the main reasons why cooking should be taught in schools is that the students always spend a lot of money to buy take-out food, while in fact they could prepare a nice meal with less cost by buying the required ingredients (食材)."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "students should only add that amount. → 代词指代",
    "observe": "该板块核心讲烹饪能提升数学学习能力，空前提到“学生被教导按标准说明混合食材”，空后句“学生应该只加那个量，不能多也不能少”中，that amount指代具体的食材用量，E项“For example, they need to add 1/4 spoon of salt as required.”举例说明，具体阐释了“按",
    "clue": "students should only add that amount.",
    "plain": "该板块核心讲烹饪能提升数学学习能力，空前提到“学生被教导按标准说明混合食材”，空后句“学生应该只加那个量，不能多也不能少”中，that amount指代具体的食材用量，E项“For example, they need to add 1/4 spoon of salt as required.”举例说明，具体阐释了“按标准用量放食材”的场景，且数字“1/4”紧扣“提升数学”的主题，衔接自然。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "students should only add that amount."
    ]
   }
  }
 },
 {
  "id": 113,
  "title": "高效管理时间的几个办法",
  "source": "2026年新疆一模",
  "range": "1—5",
  "passage": [
   "Do you often feel you don’t have enough time? Do you waste much time on useless things every day? Many of you have this problem and can’t manage your time well. That’s why you feel time is out of your control.[[1]]",
   "Make a daily to-do list",
   "[[2]]     You can do your study tasks first, and then deal with other small things. Having a list helps you remember important things and make time for what really matters more easily.",
   "[[3]]",
   "Learning to say “no” is a good way to save time.[[4]]     When others ask you to do something that’s not important, try to refuse politely. This way, you may avoid wasting time and being distracted (分心).",
   "Take short breaks sometimes",
   "You don’t have to work non-stop. Take short breaks for 5 to 10 minutes every hour, such as drinking some water or stretching (伸展) your body.[[5]]"
  ],
  "options": [
   "A. Don’t be afraid to say “no”.",
   "B. You need to focus on your own tasks.",
   "C. Every morning, list what you need to do today.",
   "D. These short breaks can help you relax and work better.",
   "E. Luckily, there are some simple things you can do to manage it better."
  ],
  "answers": {
   "1": "E",
   "2": "C",
   "3": "A",
   "4": "B",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "That’s why you feel time is out of your control → 因果关系",
    "observe": "前一句“That’s why you feel time is out of your control”提到人们觉得无法管理好时间的原因，此处需要一句承上启下的句子，引出下文给出的建议。E选项“Luckily, there are some simple things you can do to manage it b",
    "clue": "That’s why you feel time is out of your control",
    "plain": "前一句“That’s why you feel time is out of your control”提到人们觉得无法管理好时间的原因，此处需要一句承上启下的句子，引出下文给出的建议。E选项“Luckily, there are some simple things you can do to manage it better.”既总结了前文的问题，又自然引出后文的具体方法。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "That’s why you feel time is out of your control"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Make a daily to-do list → 小标题格式",
    "observe": "根据小标题“Make a daily to-do list”可知，本段建议制定每日待办清单，此处需要一句具体说明如何做的句子。C选项“Every morning, list what you need to do today.”是对小标题的具体展开，符合上下文。",
    "clue": "Make a daily to-do list",
    "plain": "根据小标题“Make a daily to-do list”可知，本段建议制定每日待办清单，此处需要一句具体说明如何做的句子。C选项“Every morning, list what you need to do today.”是对小标题的具体展开，符合上下文。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Make a daily to-do list"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Learning to say “no” is a good way to save time. → 小标题格式",
    "observe": "此处缺少小标题，由下文“Learning to say ‘no’ is a good way to save time.”可推断，本段围绕“学会拒绝”展开，强调要专注于自己的事情。A选项“Don’t be afraid to say ‘no’.”与下文主题一致，适合作为该部分的小标题。",
    "clue": "You can do your study tasks first, and then",
    "plain": "此处缺少小标题，由下文“Learning to say ‘no’ is a good way to save time.”可推断，本段围绕“学会拒绝”展开，强调要专注于自己的事情。A选项“Don’t be afraid to say ‘no’.”与下文主题一致，适合作为该部分的小标题。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Learning to say “no” is a good way to save time."
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "When others ask you to do something that’s not important, try to refuse politely. → 上下文呼应",
    "observe": "前一句“Learning to say ‘no’ is a good way to save time.”指出学会拒绝是节省时间的好方法，此处需要一句进一步解释或具体做法的句子。B选项“You need to focus on your own tasks.”说明了为什么要学会拒绝，与后文衔接自然。",
    "clue": "When others ask you to do something that’s not important, try to refuse politely.",
    "plain": "前一句“Learning to say ‘no’ is a good way to save time.”指出学会拒绝是节省时间的好方法，此处需要一句进一步解释或具体做法的句子。B选项“You need to focus on your own tasks.”说明了为什么要学会拒绝，与后文衔接自然。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "When others ask you to do something that’s not important, try to refuse politely."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "short / breaks → 段落主旨",
    "observe": "前一句“Take short breaks for 5 to 10 minutes every hour…”建议适时短暂休息，此处需要一句总结性句子，说明这样做的好处。D选项“These short breaks can help you relax and work better.”起到总结作用。",
    "clue": "short；breaks",
    "plain": "前一句“Take short breaks for 5 to 10 minutes every hour…”建议适时短暂休息，此处需要一句总结性句子，说明这样做的好处。D选项“These short breaks can help you relax and work better.”起到总结作用。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "short",
     "breaks"
    ]
   }
  }
 },
 {
  "id": 114,
  "title": "学好传统文化的三个方法",
  "source": "2026年新疆喀什一模",
  "range": "1—5",
  "passage": [
   "Chinese culture is a treasure with thousands of years of history. Whether you can understand and appreciate it deeply depends on your learning methods.[[1]]",
   "Developing a curiosity (好奇心) about traditional stories",
   "Studies show that if you are curious about myths, legends (传奇) or historical tales, your brain is more active, and it is easier for you to remember related customs and art forms.[[2]]     For example, learning the story of Nian (the beast) can help you understand the origin (起源) of the Spring Festival.",
   "Practicing and learning from small experiences",
   "Good learners of Chinese culture think about what they know well and what they need to explore more. Remember, “The more you experience, the more you understand.”[[3]]     “Seeing is believing.” Good learners will keep joining in cultural activities, and they are not afraid of making mistakes when trying new things like calligraphy (书法) or paper-cutting.",
   "[[4]]",
   "It is not enough to just read books. Good learners know the best way to study. They may look for ways to review what they have learned, such as watching a Peking Opera performance, or by explaining the meaning of a riddle (谜语) to a friend.",
   "[[5]]     Everything you learn about Chinese culture becomes a part of you and changes how you see the world, so learn wisely and learn well."
  ],
  "options": [
   "A. Learning about Chinese culture is a lifelong journey because every day brings something new to discover.",
   "B. Even if you know a cultural custom well, you will forget its meaning unless you experience it.",
   "C. Research shows that successful learners of Chinese culture have some good methods in common.",
   "D. Good learners often connect what they need to learn with something interesting.",
   "E. Getting to know the best way of studying"
  ],
  "answers": {
   "1": "C",
   "2": "D",
   "3": "B",
   "4": "E",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Chinese / culture → 段落主旨",
    "observe": "前文总起“能否深入理解欣赏中华文化，取决于学习方法”，本句引出下文分点介绍的各类学习方法。C项“Research shows that successful learners of Chinese culture have some good methods in common.”完美承接开头，引出下文全部分论点，起到",
    "clue": "Chinese；culture",
    "plain": "前文总起“能否深入理解欣赏中华文化，取决于学习方法”，本句引出下文分点介绍的各类学习方法。C项“Research shows that successful learners of Chinese culture have some good methods in common.”完美承接开头，引出下文全部分论点，起到总起全文的过渡作用。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Chinese",
     "culture"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "learn → 小标题格式",
    "observe": "本段小标题为 、“培养对传统故事的好奇心”，前文提到对神话、传说、历史故事抱有好奇，更容易记忆文化知识；后文以“年兽故事理解春节起源”举例。D项“Good learners often connect what they need to learn with something interesting.”衔接前后内容，",
    "clue": "learn",
    "plain": "本段小标题为 、“培养对传统故事的好奇心”，前文提到对神话、传说、历史故事抱有好奇，更容易记忆文化知识；后文以“年兽故事理解春节起源”举例。D项“Good learners often connect what they need to learn with something interesting.”衔接前后内容，完美解释本段“故事 + 文化”的学习逻辑，引出下文例子。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "learn"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "The more you experience, the more you understand. → 小标题格式",
    "observe": "本段小标题为 、“从点滴实践中练习学习”，前文金句“The more you experience, the more you understand.”（体验越多，理解越深），后文提到“眼见为实，积极参与书法、剪纸等文化活动”，B项“Even if you know a cultural custom well, yo",
    "clue": "The more you experience, the more you understand.",
    "plain": "本段小标题为 、“从点滴实践中练习学习”，前文金句“The more you experience, the more you understand.”（体验越多，理解越深），后文提到“眼见为实，积极参与书法、剪纸等文化活动”，B项“Even if you know a cultural custom well, you will forget its meaning unless you experience it.”紧扣本段“亲身体验” 的核心，衔接前后句道理，论证实践学习的重要性。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "The more you experience, the more you understand."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "It is not enough to just read books. → 小标题格式",
    "observe": "本空位于段首，是本段小标题。后文内容 、“只读书远远不够，优秀学习者会寻找合适的学习方式，比如看京剧、给朋友讲解谜语含义来复习知识”。E项“Getting to know the best way of studying”完美概括全段核心内容，作为本段主旨小标题。",
    "clue": "Good learners of Chinese culture think about what they",
    "plain": "本空位于段首，是本段小标题。后文内容 、“只读书远远不够，优秀学习者会寻找合适的学习方式，比如看京剧、给朋友讲解谜语含义来复习知识”。E项“Getting to know the best way of studying”完美概括全段核心内容，作为本段主旨小标题。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "It is not enough to just read books."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "about / Chinese → 段落主旨",
    "observe": "本空位于全文结尾，起到升华主旨的作用。后文句意“你所学的所有中华文化，都会成为自身的一部分，改变你看待世界的方式，要智慧学习、用心学好”。A项“Learning about Chinese culture is a lifelong journey because every day brings something ",
    "clue": "about；Chinese",
    "plain": "本空位于全文结尾，起到升华主旨的作用。后文句意“你所学的所有中华文化，都会成为自身的一部分，改变你看待世界的方式，要智慧学习、用心学好”。A项“Learning about Chinese culture is a lifelong journey because every day brings something new to discover.”承接全文所有学习方法，升华文章主题，作为结尾总结句。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "about",
     "Chinese"
    ]
   }
  }
 },
 {
  "id": 115,
  "title": "秋天运动的四条建议",
  "source": "2026年新疆昌吉一模",
  "range": "1—5",
  "passage": [
   "Autumn is a good season to do sports, because it is not too hot or too cold.[[1]]     Your body works more slowly, so it is easy for you to be hurt (伤害) when doing sports. Here is some advice (建议).",
   "Drink water",
   "[[2]]     So it is good to drink 500ml of water two hours before your exercise. But be careful, you cannot drink water as soon as you finish your exercise. Just do it about 15 minutes after that.",
   "[[3]]",
   "Before you do any sports, remember to do some warm-up activities such as walking or morning exercises to get your body ready for the sports.",
   "Have outdoor activities",
   "[[4]]     So outdoor activities like climbing the hills, riding a bike, running and jogging are much fun. These can help you keep fit, get you relaxed (放松的) and help you work well.",
   "Do not eat too much after sports",
   "It’s very bad for your health if you eat too much after sports. Sometimes, you may really feel hungry after exercising.[[5]]",
   "Hope that this advice will be helpful to you."
  ],
  "options": [
   "A. But how you feel is quite different from how your body feels.",
   "B. It is often very dry in autumn and your body loses water easily.",
   "C. It is cool outside and the air is much better.",
   "D. Warm up your body.",
   "E. Some fruit or vegetables can be good for your body."
  ],
  "answers": {
   "1": "A",
   "2": "B",
   "3": "D",
   "4": "C",
   "5": "E"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "转折关系突破",
    "chain": "your / body → 转折关系",
    "observe": "第一段转折：“Autumn is a good season to do sports...Your body works more slowly...”，前文说秋季适合运动，后文说身体状态不同易受伤，A项“But how you feel is quite different from how your body f",
    "clue": "your；body",
    "plain": "第一段转折：“Autumn is a good season to do sports...Your body works more slowly...”，前文说秋季适合运动，后文说身体状态不同易受伤，A项“But how you feel is quite different from how your body feels”承接转折，解释前后反差。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "your",
     "body"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Drink water → 代词指代",
    "observe": "第二段标题为：“Drink water”，后文讲运动前要喝水，B项“It is often very dry in autumn and your body loses water easily”点明秋季干燥易缺水，引出补水建议。",
    "clue": "Drink water",
    "plain": "第二段标题为：“Drink water”，后文讲运动前要喝水，B项“It is often very dry in autumn and your body loses water easily”点明秋季干燥易缺水，引出补水建议。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Drink water"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Before you do any sports, remember to do some warm-up activities such as walking or morning exercises to get your body ready for the sports. → 小标题格式",
    "observe": "第三段主旨：“Before you do any sports, remember to do some warm-up activities...”，整段围绕运动前热身展开，D项“Warm up your body”准确概括本段核心内容。",
    "clue": "So it is good to drink 500ml of water",
    "plain": "第三段主旨：“Before you do any sports, remember to do some warm-up activities...”，整段围绕运动前热身展开，D项“Warm up your body”准确概括本段核心内容。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Before you do any sports, remember to do some warm-up activities such as walking or morning exercises to get your body ready for the sports."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "Have outdoor activities → 因果关系",
    "observe": "第四段标题为：“Have outdoor activities”，后文推荐爬山、骑行等户外活动，C项“It is cool outside and the air is much better”说明秋季适合户外的原因，衔接自然。",
    "clue": "Have outdoor activities",
    "plain": "第四段标题为：“Have outdoor activities”，后文推荐爬山、骑行等户外活动，C项“It is cool outside and the air is much better”说明秋季适合户外的原因，衔接自然。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Have outdoor activities"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Some / your → 段落主旨",
    "observe": "第五段承接：“It’s very bad for your health if you eat too much after sports...you may really feel hungry”，前文讲运动后不能吃太多但会饿，E项“Some fruit or vegetables can be good for y",
    "clue": "Some；your",
    "plain": "第五段承接：“It’s very bad for your health if you eat too much after sports...you may really feel hungry”，前文讲运动后不能吃太多但会饿，E项“Some fruit or vegetables can be good for your body”给出合适的饮食建议，逻辑通顺。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Some",
     "your"
    ]
   }
  }
 },
 {
  "id": 116,
  "title": "爱自己要做的五件事",
  "source": "2026年新疆乌鲁木齐一模",
  "range": "1—5",
  "passage": [
   "The phrase “Love you, laoji” is very popular on the Internet now. It basically means “love yourself”. Why has this phrase caught on with young people?[[1]]    —warm and a little bit funny. This friendly sentence helps start real self-care. So, how can you love “laoji”?",
   "First, talk to yourself as you would talk to a best friend. Say “I tried my best, and I’ll do better next time” instead of thinking “Why am I so stupid”.",
   "[[2]]     For example, “I finished my homework on time today—good time management.” or “I stayed calm and avoided fights—good emotional (情绪) control!” Slowly, this habit helps you feel loved and cared for.",
   "You can also create your own “improving list”. Enjoy some sunlight, take a warm bath, go for a walk, or listen to music.[[3]]",
   "Loving yourself also requires the courage to say “no”.[[4]]     Remind yourself, “My feelings are the most important thing. Protecting my peace is not wrong.”",
   "Finally, reflect weekly. Set 20 minutes each week to ask yourself, “Which of my needs were left out this past week? What helped my progress? How do I wish to take care of myself next?” Write down your answers.[[5]]",
   "“Love you, laoji” teaches us to be our own best friend. So why not start today?"
  ],
  "options": [
   "A. The answers will help you understand your true needs better.",
   "B. This is because it sounds like talking to an old friend.",
   "C. Write down some good things you do before bed.",
   "D. Even a small thing can improve yourself.",
   "E. Say no to things that waste your energy or hold you back."
  ],
  "answers": {
   "1": "B",
   "2": "C",
   "3": "D",
   "4": "E",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "warm and a little bit funny → 因果关系",
    "observe": "空前提问该网络语流行的原因，B选项“This is because it sounds like talking to an old friend.”回答原因，且“sounds like talking to an old friend”与后文“warm and a little bit funny”形成合理关联，说明",
    "clue": "warm and a little bit funny",
    "plain": "空前提问该网络语流行的原因，B选项“This is because it sounds like talking to an old friend.”回答原因，且“sounds like talking to an old friend”与后文“warm and a little bit funny”形成合理关联，说明亲切如老友的口吻是其流行的关键。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "warm and a little bit funny"
    ]
   },
   "2": {
    "level": "第二级",
    "method": "举例支撑突破",
    "chain": "good → 举例支撑",
    "observe": "空后举例列举了自己完成作业、控制情绪这些个人做的好事，C选项“Write down some good things you do before bed.”引出下文例子，起到总起作用。",
    "clue": "good",
    "plain": "空后举例列举了自己完成作业、控制情绪这些个人做的好事，C选项“Write down some good things you do before bed.”引出下文例子，起到总起作用。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "good"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Enjoy some sunlight, take a warm bath, go for a walk, or listen to music. → 段落主旨",
    "observe": "空前列举了晒太阳、泡热水澡、散步等日常小事作为自我关爱的内容，D选项“Even a small thing can improve yourself.”恰当地总结了这些行为的意义，呼应段首“create your own ‘improving list’”的主题。",
    "clue": "Enjoy some sunlight, take a warm bath, go for a walk, or listen to music.",
    "plain": "空前列举了晒太阳、泡热水澡、散步等日常小事作为自我关爱的内容，D选项“Even a small thing can improve yourself.”恰当地总结了这些行为的意义，呼应段首“create your own ‘improving list’”的主题。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Enjoy some sunlight, take a warm bath, go for a walk, or listen to music."
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "your → 上下文呼应",
    "observe": "空前提出爱自己需要说“不”的勇气，后句需进一步解释“对什么说不”，E选项“Say no to things that waste your energy or hold you back.”明确指出应拒绝“消耗精力或阻碍你的事情”，与后文“保护内心平静”形成逻辑递进。",
    "clue": "your",
    "plain": "空前提出爱自己需要说“不”的勇气，后句需进一步解释“对什么说不”，E选项“Say no to things that waste your energy or hold you back.”明确指出应拒绝“消耗精力或阻碍你的事情”，与后文“保护内心平静”形成逻辑递进。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "your"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "answers / help → 段落主旨",
    "observe": "空前要求写下反思问题的答案，A选项“The answers will help you understand your true needs better.”直接说明记录的意义，收束全段并强化“反思”的目的性。",
    "clue": "answers；help",
    "plain": "空前要求写下反思问题的答案，A选项“The answers will help you understand your true needs better.”直接说明记录的意义，收束全段并强化“反思”的目的性。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "answers",
     "help"
    ]
   }
  }
 },
 {
  "id": 117,
  "title": "英语面试听错问题怎么办",
  "source": "2026年新疆吐鲁番二模",
  "range": "1—5",
  "passage": [
   "Mike hMany companies often use English in job talks. But some people feel very nervous. They hear questions wrongly and give funny answers.",
   "Today, Mike went to a job interview. The interviewer asked, “Do you understand?” But Mike heard, “Would you mind standing?” So he stood up.",
   "The interviewer said, “full name,” but Mike heard “phone name”.[[1]]",
   "The interviewer asked, “If you have ten days off, what would you do?” Mike heard, “If you have ten days life, what would you do?” He said, “I would be very sad.”",
   "Then the interviewer said, “Can you hear me clearly?”[[2]]     He said, “Hi, Kelly.”",
   "In a job interview, if you do not hear the question clearly, don’t be nervous. The important thing is to answer in a natural way. Here are some ways to help you.",
   "●[[3]]",
   "Maybe you miss the key words or are not sure what the interviewer means. You can ask a question to make it clear. For example, “Do you mean... ?” or “Are you asking about... ?” This is natural and helps you give the right answer.",
   "●If you hear the wrong question and start to answer, then know your mistake.",
   "[[4]]     For example, “Sorry, I misunderstood the question. What I meant was...” or “Let me rephrase that.” Then answer the right question.",
   "● If the question is not easy and you need time to think.",
   "You can use some words to get time to think, and try to say the question again.[[5]]     Even if you don’t say it exactly right, the interviewer will usually help you or correct you.",
   "Remember, everyone feels nervous sometimes. Just stay cool, ask clearly, and do your best. Good luck!"
  ],
  "options": [
   "A. For example, “That’s an interesting question. If I understand you correctly...”",
   "B. Mike was very nervous and heard, “Can you call me Kelly?”",
   "C. He answered at once, “HUAWEI.”",
   "D. You should say sorry and correct yourself at once.",
   "E. If you hear the question but do not fully understand it."
  ],
  "answers": {
   "1": "C",
   "2": "B",
   "3": "E",
   "4": "D",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "问答衔接突破",
    "chain": "full name / phone name → 问答衔接",
    "observe": "前文提到面试官说“full name”，但Mike听成了“phone name”，此处需要补充Mike听错后的回应。C项“He answered at once, ‘HUAWEI.’”（他立刻回答：“华为。”）符合语境，对应“phone name”的错误理解，延续了前文的笑话场景。",
    "clue": "full name；phone name",
    "plain": "前文提到面试官说“full name”，但Mike听成了“phone name”，此处需要补充Mike听错后的回应。C项“He answered at once, ‘HUAWEI.’”（他立刻回答：“华为。”）符合语境，对应“phone name”的错误理解，延续了前文的笑话场景。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "full name",
     "phone name"
    ]
   },
   "2": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "Can you hear me clearly? → 因果关系",
    "observe": "前文提到面试官问“Can you hear me clearly?”，后文Mike说“Hi Kelly.”，说明他又听错了问题。B项“Mike was very nervous and heard, ‘Can you call me Kelly?’”（Mike非常紧张，听成了“你能叫我Kelly吗？”）符合上下文逻辑，",
    "clue": "Can you hear me clearly?",
    "plain": "前文提到面试官问“Can you hear me clearly?”，后文Mike说“Hi Kelly.”，说明他又听错了问题。B项“Mike was very nervous and heard, ‘Can you call me Kelly?’”（Mike非常紧张，听成了“你能叫我Kelly吗？”）符合上下文逻辑，解释了Mike说“Hi Kelly”的原因。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Can you hear me clearly?"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "问答衔接突破",
    "chain": "Maybe you miss the key words or are not sure what the interviewer means. → 问答衔接",
    "observe": "此段是应对方法的第一条，后文提到“你可能漏听关键词或不确定面试官的意思，可以提问确认”，对应E项“If you hear the question but do not fully understand it.”（如果你听到了问题但不完全理解它），总领该段内容，与后文“提问确认”的方法衔接紧密。",
    "clue": "此段是应对方法的第一条，后文提到“你可能漏听关键词或不确定面试官的意思，可以提问确认”，对应E项“If you hear the question but do",
    "plain": "此段是应对方法的第一条，后文提到“你可能漏听关键词或不确定面试官的意思，可以提问确认”，对应E项“If you hear the question but do not fully understand it.”（如果你听到了问题但不完全理解它），总领该段内容，与后文“提问确认”的方法衔接紧密。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Maybe you miss the key words or are not sure what the interviewer means."
    ]
   },
   "4": {
    "level": "第二级",
    "method": "举例支撑突破",
    "chain": "sorry → 举例支撑",
    "observe": "前文提到“如果你听错了问题并开始回答，要意识到自己的错误”，后文举例了道歉并纠正的说法，D项“You should say sorry and correct yourself at once.”（你应该立刻道歉并纠正自己）起到了总领该段的作用，引出后文的道歉纠正例句。",
    "clue": "sorry",
    "plain": "前文提到“如果你听错了问题并开始回答，要意识到自己的错误”，后文举例了道歉并纠正的说法，D项“You should say sorry and correct yourself at once.”（你应该立刻道歉并纠正自己）起到了总领该段的作用，引出后文的道歉纠正例句。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "sorry"
    ]
   },
   "5": {
    "level": "第二级",
    "method": "举例支撑突破",
    "chain": "question → 举例支撑",
    "observe": "前文提到“如果问题不简单，需要时间思考，可以用一些话争取思考时间，并试着复述问题”，后文说明“即使说得不完全对，面试官通常也会帮助你或纠正你”，A项“For example, 'That's an interesting question. If I understand you correctly...'”（例如：“",
    "clue": "question",
    "plain": "前文提到“如果问题不简单，需要时间思考，可以用一些话争取思考时间，并试着复述问题”，后文说明“即使说得不完全对，面试官通常也会帮助你或纠正你”，A项“For example, 'That's an interesting question. If I understand you correctly...'”（例如：“这是个有趣的问题。如果我理解正确的话……”）是前文“争取思考时间、复述问题”的具体例子，衔接自然。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "question"
    ]
   }
  }
 },
 {
  "id": 118,
  "title": "天气与气候的科学",
  "source": "2025年新疆阿克苏三模",
  "range": "21—25",
  "passage": [
   "The Science of Weather and Climate",
   "Have you ever wondered why it rains or how typhoons (台风) happen?[[1]]",
   "How Weather Works",
   "[[2]]            The sun heats the ground, so warm air rises. Cool air makes water form into drops, then clouds. When clouds are too heavy, we get rain, snow, or small ice pieces.",
   "Warm air rises because it’s light (low pressure).[[3]]            Wind happens when air moves from high to low pressure. For example, cool ocean air moves to warm land during daytime. This is called a sea wind.",
   "Typhoons",
   "Typhoons start over warm oceans. Warm air rises, making spinning (旋转的) clouds. When winds reach 120 km/h, a calm center (the “eye”) forms. These storms bring heavy rain and floods.",
   "[[4]]",
   "Climate is long-term weather patterns. Its change is influenced by human activities. For example, burning coal or cutting trees releases carbon dioxide (二氧化碳). This gas remains beat, warming Earth and causing ice to melt (融化), seas to rise, and stronger storms.",
   "Weather Forecasts",
   "Forecasts use satellites and computers to predict weather.[[5]]            Good forecasts save lives during storms.",
   "Understanding weather helps us protect our planet!"
  ],
  "options": [
   "A. Climate Change.",
   "B. Weather changes daily.",
   "C. Let’s learn simple facts.",
   "D. Cold air falls because it’s heavy (high pressure).",
   "E. They help farmers and people get ready for extreme weather such as typhoons in advance."
  ],
  "answers": {
   "1": "C",
   "2": "B",
   "3": "D",
   "4": "A",
   "5": "E"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Have you ever wondered why it rains or how typhoons (台风) happen? → 段落主旨",
    "observe": "根据 “Have you ever wondered why it rains or how typhoons happen?” 可知，此处是引出对天气和气候相关知识的学习，选项 C“让我们学习一些简单的事实。” 符合语境，起到承上启下的作用。故选 C。",
    "clue": "Have you ever wondered why it rains or how typhoons (台风) happen?",
    "plain": "根据 “Have you ever wondered why it rains or how typhoons happen?” 可知，此处是引出对天气和气候相关知识的学习，选项 C“让我们学习一些简单的事实。” 符合语境，起到承上启下的作用。故选 C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Have you ever wondered why it rains or how typhoons (台风) happen?"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "How Weather Works → 段落主旨",
    "observe": "根据 “How Weather Works” 及后文对天气形成原理的描述可知，该部分围绕 “天气” 展开，选项 B“天气每天都在变化。” 是对天气特点的总体概括，契合段落主题。故选 B。",
    "clue": "How Weather Works",
    "plain": "根据 “How Weather Works” 及后文对天气形成原理的描述可知，该部分围绕 “天气” 展开，选项 B“天气每天都在变化。” 是对天气特点的总体概括，契合段落主题。故选 B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "How Weather Works"
    ]
   },
   "3": {
    "level": "第二级",
    "method": "转折关系突破",
    "chain": "Warm air rises because it’s light (low pressure). → 转折关系",
    "observe": "根据 “Warm air rises because it’s light (low pressure).” 可知，前文阐述暖空气上升的原理，后文应对比说明冷空气的情况，选项 D“冷空气下降是因为它重（高压）。” 与之形成逻辑呼应，解释气压与空气流动的关系。故选 D。",
    "clue": "Warm air rises because it’s light (low pressure).",
    "plain": "根据 “Warm air rises because it’s light (low pressure).” 可知，前文阐述暖空气上升的原理，后文应对比说明冷空气的情况，选项 D“冷空气下降是因为它重（高压）。” 与之形成逻辑呼应，解释气压与空气流动的关系。故选 D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Warm air rises because it’s light (low pressure)."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Climate is long-term weather patterns. Its change is influenced by human activities. → 小标题格式",
    "observe": "根据后文 “Climate is long-term weather patterns. Its change is influenced by human activities.” 可知，该段落主题为 “气候变化”，选项 A“气候变化” 直接作为小标题引出内容，符合段落主旨。故选 A。",
    "clue": "Climate is long-term weather patterns. Its change is influenced by human activities.",
    "plain": "根据后文 “Climate is long-term weather patterns. Its change is influenced by human activities.” 可知，该段落主题为 “气候变化”，选项 A“气候变化” 直接作为小标题引出内容，符合段落主旨。故选 A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Climate is long-term weather patterns. Its change is influenced by human activities."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Forecasts use satellites and computers to predict weather. → 代词指代",
    "observe": "根据 “Forecasts use satellites and computers to predict weather.” 可知，前文介绍天气预报的工具，后文应说明其作用，选项 E“它们帮助农民和人们提前做好应对台风等极端天气的准备。” 具体阐述天气预报对人们的帮助，逻辑连贯，符合语境。故选 E。",
    "clue": "Forecasts use satellites and computers to predict weather.",
    "plain": "根据 “Forecasts use satellites and computers to predict weather.” 可知，前文介绍天气预报的工具，后文应说明其作用，选项 E“它们帮助农民和人们提前做好应对台风等极端天气的准备。” 具体阐述天气预报对人们的帮助，逻辑连贯，符合语境。故选 E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Forecasts use satellites and computers to predict weather."
    ]
   }
  }
 },
 {
  "id": 119,
  "title": "保护海洋的小行动",
  "source": "2025年新疆哈密三模",
  "range": "1—5",
  "passage": [
   "Oceans cover more than 70% of the earth’s surface.[[1]]     There are lots of ways to help save our seas. So, follow these ideas to become a real ocean hero.",
   "Save water in life.",
   "Being water-wise can make a big difference to the ocean. Try turning off the water when you brush your teeth, taking shorter showers and letting the rain wash your car[[2]]",
   "Explore the ocean.",
   "Discover the answer to the question, “How are you connected to the ocean?”[[3]]     Then explore how they are connected to the ocean by using maps, reading books, and asking local experts.",
   "[[4]]",
   "Start reading! Read about the ocean and ways you can help. Visit aquariums (水族馆) and zoos to meet the ocean animals that will benefit (使受益) from your help. Watch the video with your family and friends to learn small things you can do that could have a big influence on the protection of our ocean.",
   "Get your hands dirty.",
   "[[5]]     Rain gardens can help save storm water and keep it from polluting"
  ],
  "options": [
   "A. Learn about the ocean.",
   "B. Every living thing depends on the ocean.",
   "C. Get to know about your local lakes and rivers.",
   "D. Make a rain garden at home by using native plants.",
   "E. How creative can you be when it comes to saving water?"
  ],
  "answers": {
   "1": "B",
   "2": "E",
   "3": "C",
   "4": "A",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Oceans cover more than 70% of the earth’s surface. → 上下文呼应",
    "observe": "根据“Oceans cover more than 70% of the earth’s surface.”可知，此处应是引出海洋对地球生物的重要性，选项B“每个生物都依赖海洋。”符合语境。故选B。",
    "clue": "Oceans cover more than 70% of the earth’s surface.",
    "plain": "根据“Oceans cover more than 70% of the earth’s surface.”可知，此处应是引出海洋对地球生物的重要性，选项B“每个生物都依赖海洋。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Oceans cover more than 70% of the earth’s surface."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Save water in life. → 代词指代",
    "observe": "根据“Save water in life.”和“Try turning off the water when you brush your teeth, taking shorter showers and letting the rain wash your car”可知，此处应是说在节约用水方面能有怎样的创意，选",
    "clue": "Save water in life.",
    "plain": "根据“Save water in life.”和“Try turning off the water when you brush your teeth, taking shorter showers and letting the rain wash your car”可知，此处应是说在节约用水方面能有怎样的创意，选项E“在节约用水方面你能有多大的创造力?”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Save water in life."
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "local → 上下文呼应",
    "observe": "根据“Discover the answer to the question, ‘How are you connected to the ocean?’”以及“Then explore how they are connected to the ocean by using maps, reading books, ",
    "clue": "local",
    "plain": "根据“Discover the answer to the question, ‘How are you connected to the ocean?’”以及“Then explore how they are connected to the ocean by using maps, reading books, and asking local experts.”可知，此处应是说要去了解当地的湖泊和河流，进而探索它们与海洋的联系，选项C“了解你当地的湖泊和河流。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "local"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Read about the ocean and ways you can help. → 小标题格式",
    "observe": "根据“Start reading! Read about the ocean and ways you can help. Visit aquariums (水族馆) and zoos to meet the ocean animals that will benefit (使受益) from your help.”可",
    "clue": "Discover the answer to the question, “How are you",
    "plain": "根据“Start reading! Read about the ocean and ways you can help. Visit aquariums (水族馆) and zoos to meet the ocean animals that will benefit (使受益) from your help.”可知，此处应是说要去了解海洋，选项A“了解海洋。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Read about the ocean and ways you can help."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Get your hands dirty. / Rain gardens can help save storm water and keep it from polluting → 段落主旨",
    "observe": "根据“Get your hands dirty.”和“Rain gardens can help save storm water and keep it from polluting”可知，此处应是说制作雨水花园，选项D“用本地植物在家里做一个雨水花园。”符合语境。故选D。",
    "clue": "Get your hands dirty.；Rain gardens can help save storm water and keep it from polluting",
    "plain": "根据“Get your hands dirty.”和“Rain gardens can help save storm water and keep it from polluting”可知，此处应是说制作雨水花园，选项D“用本地植物在家里做一个雨水花园。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Get your hands dirty.",
     "Rain gardens can help save storm water and keep it from polluting"
    ]
   }
  }
 },
 {
  "id": 120,
  "title": "先擦干净自己的窗户",
  "source": "2025年新疆乌鲁木齐一模",
  "range": "26—30",
  "passage": [
   "I will never forget the lesson about my window. Four years ago, I moved to a house in a large town. One of my new neighbors’ houses was only a few feet away from mine.[[1]]     Through one of my windows, I could see her reading by her window every afternoon.",
   "Several months later, I found I couldn’t see the woman clearly.[[2]]     said to myself, “Why doesn’t she clean her window? It looks terrible!”",
   "One afternoon, I began to clean my house including the window.[[3]]     Then I sat down by the window for a rest. I could see the woman reading there clearly again! By that time,[[4]]     really felt ashamed (羞愧的) of myself. I had been watching her through my dirty window in the past days!",
   "[[5]]     So I try to clean the window of my heart before judging (评判) others."
  ],
  "options": [
   "A. I thought her window was too dirty.",
   "B. I felt tired after three hours of hard work.",
   "C. The experience is very important to me.",
   "D. There lived a woman.",
   "E. I realized that my own window was too dirty, not hers!"
  ],
  "answers": {
   "1": "D",
   "2": "A",
   "3": "B",
   "4": "E",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "One of my new neighbors’ houses was only a few feet away from mine. → 上下文呼应",
    "observe": "根据“One of my new neighbors’ houses was only a few feet away from mine.”可推知，此处需介绍邻居的身份。选项D“住着一位女士。”与后文“Through one of my windows, I could see her...”形成连贯叙述，符合语境。",
    "clue": "One of my new neighbors’ houses was only a few feet away from mine.",
    "plain": "根据“One of my new neighbors’ houses was only a few feet away from mine.”可推知，此处需介绍邻居的身份。选项D“住着一位女士。”与后文“Through one of my windows, I could see her...”形成连贯叙述，符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "One of my new neighbors’ houses was only a few feet away from mine."
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "window → 上下文呼应",
    "observe": "根据“I found I couldn’t see the woman clearly...‘Why doesn’t she clean her window?’”可推知，作者误以为是邻居的窗户脏。选项A“我以为她的窗户太脏了。”与后文的自问逻辑一致，符合语境。故选A。",
    "clue": "window",
    "plain": "根据“I found I couldn’t see the woman clearly...‘Why doesn’t she clean her window?’”可推知，作者误以为是邻居的窗户脏。选项A“我以为她的窗户太脏了。”与后文的自问逻辑一致，符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "window"
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "felt / after → 上下文呼应",
    "observe": "根据“I began to clean my house including the window...Then I sat down by the window for a rest.”可推知，清洁后感到疲惫。选项B“辛苦工作三小时后感到疲倦。”与上下文动作衔接自然，符合语境。故选B。",
    "clue": "felt；after",
    "plain": "根据“I began to clean my house including the window...Then I sat down by the window for a rest.”可推知，清洁后感到疲惫。选项B“辛苦工作三小时后感到疲倦。”与上下文动作衔接自然，符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "felt",
     "after"
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "that / window → 上下文呼应",
    "observe": "根据“I could see the woman reading there clearly again!...I had been watching her through my dirty window...”可推知，作者意识到问题出在自家窗户。选项E“我意识到是我的窗户脏，而不是她的！”与羞愧心理相符，符合语境。",
    "clue": "that；window",
    "plain": "根据“I could see the woman reading there clearly again!...I had been watching her through my dirty window...”可推知，作者意识到问题出在自家窗户。选项E“我意识到是我的窗户脏，而不是她的！”与羞愧心理相符，符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "that",
     "window"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "So I try to clean the window of my heart before judging (评判) others. → 段落主旨",
    "observe": "根据“So I try to clean the window of my heart before judging others.”可推知，作者总结教训。选项C“这段经历对我很重要。”作为结尾升华主题，符合语境。故选C。",
    "clue": "So I try to clean the window of my heart before judging (评判) others.",
    "plain": "根据“So I try to clean the window of my heart before judging others.”可推知，作者总结教训。选项C“这段经历对我很重要。”作为结尾升华主题，符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "So I try to clean the window of my heart before judging (评判) others."
    ]
   }
  }
 },
 {
  "id": 121,
  "title": "海洋为何需要保护",
  "source": "2025年新疆乌鲁木齐三模",
  "range": "16—20",
  "passage": [
   "The ocean is very important to our planet. It is the largest habitat (栖息地) on Earth.[[1]]    Many animals live in the ocean, from tiny fish to huge whales.",
   "[[2]]    For example, sea plants produce over half of the world’s oxygen (氧气). The ocean also helps control the weather and provides food for millions of people.",
   "However, the ocean is in danger now.[[3]]    This makes the water dirty and harms sea animals. Also, some people catch too many fish, leaving fewer for the future.",
   "There are many ways we can protect the ocean.[[4]]    Using less plastic is another good way to help. When we visit the beach, we must keep it clean.",
   "[[5]]    If everyone does a little, we can make a big difference!"
  ],
  "options": [
   "A. The ocean plays an important role in our lives.",
   "B. People are throwing too much plastic into it.",
   "C. It covers about 70% of Earth’s surface.",
   "D. We should throw rubbish in bins, not on beaches.",
   "E. We need to take action right now."
  ],
  "answers": {
   "1": "C",
   "2": "A",
   "3": "B",
   "4": "D",
   "5": "E"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "The ocean is very important to our planet. It is the largest habitat (栖息地) on Earth. → 代词指代",
    "observe": "根据“The ocean is very important to our planet. It is the largest habitat (栖息地) on Earth.”可知，此处表达海洋对地球很重要，它是地球上最大的栖息地，且介绍了其面积占比。选项C“它覆盖了地球表面约70%的面积”与之相符。故选C。",
    "clue": "The ocean is very important to our planet. It is the largest habitat (栖息地) on Earth.",
    "plain": "根据“The ocean is very important to our planet. It is the largest habitat (栖息地) on Earth.”可知，此处表达海洋对地球很重要，它是地球上最大的栖息地，且介绍了其面积占比。选项C“它覆盖了地球表面约70%的面积”与之相符。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "The ocean is very important to our planet. It is the largest habitat (栖息地) on Earth."
    ]
   },
   "2": {
    "level": "第二级",
    "method": "举例支撑突破",
    "chain": "ocean → 举例支撑",
    "observe": "根据“For example, sea plants produce over half of the world’s oxygen (氧气). The ocean also helps control the weather and provides food for millions of people.”可知，此",
    "clue": "ocean",
    "plain": "根据“For example, sea plants produce over half of the world’s oxygen (氧气). The ocean also helps control the weather and provides food for millions of people.”可知，此处举例说明海洋对人类生活的重要性，如生产氧气、控制天气和提供食物等。选项A“海洋在我们的生活中扮演着重要的角色”与之相符。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "ocean"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "However, the ocean is in danger now. → 代词指代",
    "observe": "根据“However, the ocean is in danger now.”可知，此处表达海洋现在正面临危险。选项B“人们正在往海洋里扔太多的塑料”与之相符。故选B。",
    "clue": "However, the ocean is in danger now.",
    "plain": "根据“However, the ocean is in danger now.”可知，此处表达海洋现在正面临危险。选项B“人们正在往海洋里扔太多的塑料”与之相符。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "However, the ocean is in danger now."
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "There are many ways we can protect the ocean. / Using less plastic is another good way to help. → 上下文呼应",
    "observe": "根据“There are many ways we can protect the ocean.”以及“Using less plastic is another good way to help.”可知，此处表达保护海洋的方法，且提到了减少塑料使用是另一种好方法。选项D“我们应该把垃圾扔进垃圾桶，而不是扔在海滩上”与",
    "clue": "There are many ways we can protect the ocean.；Using less plastic is another good way to help.",
    "plain": "根据“There are many ways we can protect the ocean.”以及“Using less plastic is another good way to help.”可知，此处表达保护海洋的方法，且提到了减少塑料使用是另一种好方法。选项D“我们应该把垃圾扔进垃圾桶，而不是扔在海滩上”与之相符。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "There are many ways we can protect the ocean.",
     "Using less plastic is another good way to help."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "If everyone does a little, we can make a big difference! → 段落主旨",
    "observe": "根据“If everyone does a little, we can make a big difference!”可知，此处表达如果每个人都采取一点行动，就能产生很大的影响。选项E“我们现在需要采取行动”与之相符。故选E。",
    "clue": "If everyone does a little, we can make a big difference!",
    "plain": "根据“If everyone does a little, we can make a big difference!”可知，此处表达如果每个人都采取一点行动，就能产生很大的影响。选项E“我们现在需要采取行动”与之相符。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "If everyone does a little, we can make a big difference!"
    ]
   }
  }
 },
 {
  "id": 122,
  "title": "突发情况的急救方法",
  "source": "2025年新疆乌鲁木齐模拟预测",
  "range": "36—40",
  "passage": [
   "It’s very useful to know some first aid (急救) skills, especially when someone gets sick or hurt all of a sudden.[[1]]",
   "Heatstroke (中暑)",
   "If someone has heatstroke, move him to a cool place. Let him lie down and raise his legs a bit.",
   "[[2]]     Check his temperature. If it’s 40℃ or more, call for help and get him to the hospital as soon as possible!",
   "Broken Bone (骨折)",
   "[[3]]     Put an ice bag on the sore area to let him feel less pain. Wait for a doctor to come and help. Moving the hurt part can make it worse.",
   "Animal Bite",
   "If someone has been bitten by animals, go to the doctor right away.[[4]]     This helps the doctor know how to treat him and if he needs special medicine.",
   "In short, learning basic first aid skills can help you be ready for any situation.[[5]]"
  ],
  "options": [
   "A. Tell the doctor what kind of animal bit him.",
   "B. Give him some cool water to drink little by little.",
   "C. Here’s some advice on it.",
   "D. Always keep your cool and act quickly.",
   "E. If someone has a broken bone, don’t move the hurt part."
  ],
  "answers": {
   "1": "C",
   "2": "B",
   "3": "E",
   "4": "A",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "some → 代词指代",
    "observe": "根据“It’s very useful to know some first aid (急救) skills, especially when someone gets sick or hurt all of a sudden.”可知，当有人突然生病或受伤的时候急救技能很有用，选项C“这里有一些关于它的建议”符合语境。",
    "clue": "some",
    "plain": "根据“It’s very useful to know some first aid (急救) skills, especially when someone gets sick or hurt all of a sudden.”可知，当有人突然生病或受伤的时候急救技能很有用，选项C“这里有一些关于它的建议”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "some"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Check his temperature. → 段落主旨",
    "observe": "根据“If someone has heatstroke, move him to a cool place. Let him lie down and raise his legs a bit.”可知，中暑时需要将患者移到阴凉处，选项B“给他少量喝一些凉水”符合语境。故选B。",
    "clue": "Check his temperature.",
    "plain": "根据“If someone has heatstroke, move him to a cool place. Let him lie down and raise his legs a bit.”可知，中暑时需要将患者移到阴凉处，选项B“给他少量喝一些凉水”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Check his temperature."
    ]
   },
   "3": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Broken Bone (骨折) → 段落主旨",
    "observe": "根据“Broken Bone (骨折)”可知，介绍的是骨折时候的处理，选项E“如果有人骨折了，不要移动受伤的部位”符合语境。故选E。",
    "clue": "Broken Bone (骨折)",
    "plain": "根据“Broken Bone (骨折)”可知，介绍的是骨折时候的处理，选项E“如果有人骨折了，不要移动受伤的部位”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Broken Bone (骨折)"
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "This helps the doctor know how to treat him and if he needs special medicine. → 上下文呼应",
    "observe": "根据“This helps the doctor know how to treat him and if he needs special medicine.”可知，被蛇咬了需要提供动物信息，选项A“告诉医生是什么动物咬伤的”符合语境。故选A。",
    "clue": "This helps the doctor know how to treat him and if he needs special medicine.",
    "plain": "根据“This helps the doctor know how to treat him and if he needs special medicine.”可知，被蛇咬了需要提供动物信息，选项A“告诉医生是什么动物咬伤的”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "This helps the doctor know how to treat him and if he needs special medicine."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "learning basic first aid skills can help you be ready for any situation → 段落主旨",
    "observe": "根据“learning basic first aid skills can help you be ready for any situation”可知，学习基本的急救技能可以帮助你为任何情况做好准备，这里是总结性话语，选项D“始终保持冷静并快速行动”符合语境。故选D。",
    "clue": "learning basic first aid skills can help you be ready for any situation",
    "plain": "根据“learning basic first aid skills can help you be ready for any situation”可知，学习基本的急救技能可以帮助你为任何情况做好准备，这里是总结性话语，选项D“始终保持冷静并快速行动”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "learning basic first aid skills can help you be ready for any situation"
    ]
   }
  }
 },
 {
  "id": 123,
  "title": "班级干部怎样赢得支持",
  "source": "2025年新疆吐鲁番三模",
  "range": "11—15",
  "passage": [
   "Being a class leader is not easy. Take the class monitor (班长) for an example[[1]]     He’ll keep the class in order, work with other class leaders to organize activities and deal with many small things.",
   "[[2]]     Students are used to listening to teachers because teachers have more experience. So how does a class leader start his work?",
   "Setting a good example can build students’ trust. “Either having good grades or having a special skill,[[3]]    ” said Wang Weihua, an education expert.",
   "Of course, teachers usually choose certain students to be class leaders because they are already able to do so. the real key is getting classmates’ support. “If classmates trust you, you can do your job well without teachers’ help,” Teacher Wang adds. Here is some advice to win other students’ support:",
   "● Be fair.",
   "Don’t be unfair when you talk to your classmates. Even if some of them are naughty (顽皮的) and often do wrong things, you should still treat them fairly.",
   "●[[4]]",
   "Make your classmates feel that you are on their side. Listen to their ideas before making decisions.",
   "●Make friends.",
   "[[5]]     Show you’re both friendly and warm-hearted. Make friends as many as possible.",
   "● Help more.",
   "Be kind and helpful. When doing group activities, try to share your ideas and give others suggestions."
  ],
  "options": [
   "A. Smile often and chat with others.",
   "B. Listen first.",
   "C. He helps teachers manage the class.",
   "D. you must have something that is admired by your classmates.",
   "E. The biggest challenge is that class leaders aren’t teachers."
  ],
  "answers": {
   "1": "C",
   "2": "E",
   "3": "D",
   "4": "B",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "举例支撑突破",
    "chain": "class → 举例支撑",
    "observe": "根据“Take the class monitor for an example...He’ll keep the class in order...”可知，此处是举例说明班长的职责，选项C“他帮助老师管理班级”符合班长职责的描述。故选C。",
    "clue": "class",
    "plain": "根据“Take the class monitor for an example...He’ll keep the class in order...”可知，此处是举例说明班长的职责，选项C“他帮助老师管理班级”符合班长职责的描述。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "class"
    ]
   },
   "2": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "class / teachers → 因果关系",
    "observe": "根据“Students are used to listening to teachers because teachers have more experience. So how does a class leader start his work?”可知，此处应指出班级干部与老师的差异带来的挑战，选项E“最大的挑",
    "clue": "class；teachers",
    "plain": "根据“Students are used to listening to teachers because teachers have more experience. So how does a class leader start his work?”可知，此处应指出班级干部与老师的差异带来的挑战，选项E“最大的挑战是班级干部不是老师”衔接上下文，解释学生习惯听老师的原因及班级干部工作的难点。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "class",
     "teachers"
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "” said Wang Weihua, an education expert. → 上下文呼应",
    "observe": "根据“Setting a good example can build students’ trust. ‘Either having good grades or having a special skill, ...’ ”可知，此处教育专家强调树立榜样需具备让同学钦佩的特质，选项D“你必须有一些让同学钦佩的东西”与",
    "clue": "” said Wang Weihua, an education expert.",
    "plain": "根据“Setting a good example can build students’ trust. ‘Either having good grades or having a special skill, ...’ ”可知，此处教育专家强调树立榜样需具备让同学钦佩的特质，选项D“你必须有一些让同学钦佩的东西”与前文“好成绩或特殊技能”呼应。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "” said Wang Weihua, an education expert."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Make your classmates feel that you are on their side. Listen to their ideas before making decisions. → 段落主旨",
    "observe": "根据“Make your classmates feel that you are on their side. Listen to their ideas before making decisions.”可知，此段核心是倾听同学意见，选项B“先倾听”概括了段落主旨。故选B。",
    "clue": "根据“Make your classmates feel that you are on their side. Listen to their ideas b",
    "plain": "根据“Make your classmates feel that you are on their side. Listen to their ideas before making decisions.”可知，此段核心是倾听同学意见，选项B“先倾听”概括了段落主旨。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Make your classmates feel that you are on their side. Listen to their ideas before making decisions."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Show you’re both friendly and warm-hearted. → 段落主旨",
    "observe": "根据“Make friends. ... Show you’re both friendly and warm-hearted.”可知，此处建议通过具体行为展现友好以交朋友，选项A“经常微笑并与他人交谈”符合友好互动的方式。故选A。",
    "clue": "Show you’re both friendly and warm-hearted.",
    "plain": "根据“Make friends. ... Show you’re both friendly and warm-hearted.”可知，此处建议通过具体行为展现友好以交朋友，选项A“经常微笑并与他人交谈”符合友好互动的方式。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Show you’re both friendly and warm-hearted."
    ]
   }
  }
 },
 {
  "id": 124,
  "title": "新词大多来自科学",
  "source": "2025年新疆乌鲁木齐模拟预测",
  "range": "41—45",
  "passage": [
   "Thousands of new words are invented each year.[[1]]    When scientists discover something new, if they do not have a word for their discovery, they make one up.",
   "[[2]]    If a product becomes popular, then everyone will know both the product and the new word. Other companies quickly make similar products.[[3]]    It is against the law to copy other people’s ideas or inventions. We have all listened to a Walkman, haven’t we? The company which developed this product, Sony, owns the word “Walkman.”[[4]]    The word “Coke” is also owned by a company. It is the name of a soft drink made by the Coca Cola company. But most people use the word generally for any soft drink. The word “Frisbee” is owned by a company, too.[[5]]    But only one company makes Frisbees. It may be hard for a new word to become popular, but it is easy to make one up. You can try yourself!"
  ],
  "options": [
   "A. However, they can not use similar words.",
   "B. Most of these come from science.",
   "C. However, it has become a general word for all similar products.",
   "D. Words are often made up by big companies for their new products.",
   "E. And no other company can print it on the tape machines."
  ],
  "answers": {
   "1": "B",
   "2": "D",
   "3": "A",
   "4": "E",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "When scientists discover something new, if they do not have a word for their discovery, they make one up. → 代词指代",
    "observe": "根据“When scientists discover something new, if they do not have a word for their discovery, they make one up.”可知，当科学家发现新的东西时，如果他们没有一个词来形容他们的发现，他们就会编造一个词。可知，前面会说“",
    "clue": "When scientists discover something new, if they do not have a word for their discovery, they make one up.",
    "plain": "根据“When scientists discover something new, if they do not have a word for their discovery, they make one up.”可知，当科学家发现新的东西时，如果他们没有一个词来形容他们的发现，他们就会编造一个词。可知，前面会说“新词”来源于科学领域。选项B“大部分新词来源于科学领域”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "When scientists discover something new, if they do not have a word for their discovery, they make one up."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "If a product becomes popular, then everyone will know both the product and the new word. → 代词指代",
    "observe": "根据“If a product becomes popular, then everyone will know both the product and the new word.”可知，如果一个产品变得流行，那么每个人都会知道这个产品和新单词。前面会说新词也来自于大公司的新产品。选项D“大公司经常为他们的新产品编造",
    "clue": "If a product becomes popular, then everyone will know both the product and the new word.",
    "plain": "根据“If a product becomes popular, then everyone will know both the product and the new word.”可知，如果一个产品变得流行，那么每个人都会知道这个产品和新单词。前面会说新词也来自于大公司的新产品。选项D“大公司经常为他们的新产品编造新词。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "If a product becomes popular, then everyone will know both the product and the new word."
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "It is against the law to copy other people’s ideas or inventions. → 代词指代",
    "observe": "根据“It is against the law to copy other people’s ideas or inventions.”可知，抄袭别人的想法或发明是违法的。前面会说公司不能使用相似的词。选项A“然而，他们不能使用类似的词语。”符合语境。故选A。",
    "clue": "It is against the law to copy other people’s ideas or inventions.",
    "plain": "根据“It is against the law to copy other people’s ideas or inventions.”可知，抄袭别人的想法或发明是违法的。前面会说公司不能使用相似的词。选项A“然而，他们不能使用类似的词语。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "It is against the law to copy other people’s ideas or inventions."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Walkman → 代词指代",
    "observe": "根据“The company which developed this product, Sony, owns the word ‘Walkman.’”可知，开发这款产品的公司索尼拥有“Walkman”这个词，下面其他公司不可以在磁带机上打印它。选项E“没有其他公司可以在磁带机上打印它”符合语境。故选E。",
    "clue": "Walkman",
    "plain": "根据“The company which developed this product, Sony, owns the word ‘Walkman.’”可知，开发这款产品的公司索尼拥有“Walkman”这个词，下面其他公司不可以在磁带机上打印它。选项E“没有其他公司可以在磁带机上打印它”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Walkman"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "But only one company makes Frisbees. → 代词指代",
    "observe": "根据“The word ‘Frisbee’ is owned by a company, too.”以及“But only one company makes Frisbees.”可知，“飞盘”这个词也属于一家公司。但是只有一家公司生产飞盘，这里说已经成为所有相似产品的通用词。选项C“然而，它已经成为所有类似产品的通用",
    "clue": "But only one company makes Frisbees.",
    "plain": "根据“The word ‘Frisbee’ is owned by a company, too.”以及“But only one company makes Frisbees.”可知，“飞盘”这个词也属于一家公司。但是只有一家公司生产飞盘，这里说已经成为所有相似产品的通用词。选项C“然而，它已经成为所有类似产品的通用词。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "But only one company makes Frisbees."
    ]
   }
  }
 },
 {
  "id": 125,
  "title": "神舟二十号的太空任务",
  "source": "2025年新疆和田三模",
  "range": "6—10",
  "passage": [
   "On April 24, 2025, China sent the Shenzhou-20 manned spaceship into space. This special day was also the 10th anniversary of “China Space Day”, a time to celebrate China’s great space success. It all began with Dongfanghong-1, China’s first satellite, launched (发射) in 1970.",
   "Three astronauts joined this exciting mission.[[1]]     Chen Dong, the team leader, is very experienced. He has been to space twice. He’ll be the first from China’s second group of astronauts to take three space trips. Chen Zhongrui and Wang Jie are new to space. They work as pilots and engineers.",
   "The Shenzhou-20 team will stay in the space station for about six months.[[2]]",
   "First, they replaced the Shenzhou-19 astronauts, giving them a chance to return home.",
   "Second, they will study how living things survive in space. By watching zebrafish (斑马鱼) and other small creatures (生物), they hope to help future long-term space travelers.[[3]]",
   "Third, they will do spacewalks. During these walks, they will place new equipment and test new technologies outside the spaceship.[[4]]",
   "They will also welcome the Tianzhou-9 supply ship and the Shenzhou-21 mission. These visits will keep supplies coming and teamwork strong.[[5]]     And they plan to return to Earth at the Dongfeng Landing Site in late October 2025."
  ],
  "options": [
   "A. This helps keep the space station running well.",
   "B. Let’s learn about their important tasks.",
   "C. And these experiments can bring us new knowledge.",
   "D. Each of them brings their own skills to the mission.",
   "E. This is an important part of their job."
  ],
  "answers": {
   "1": "D",
   "2": "B",
   "3": "C",
   "4": "E",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Three astronauts joined this exciting mission. / Chen Dong, the team leader, is very experienced. He has been to space twice. → 代词指代",
    "observe": "根据“Three astronauts joined this exciting mission.”和“Chen Dong, the team leader, is very experienced. He has been to space twice.”可知，此处应强调每位成员的不同角色与技能。选项D“他们每个人都",
    "clue": "Three astronauts joined this exciting mission.；Chen Dong, the team leader, is very experienced. He has been to space twice.",
    "plain": "根据“Three astronauts joined this exciting mission.”和“Chen Dong, the team leader, is very experienced. He has been to space twice.”可知，此处应强调每位成员的不同角色与技能。选项D“他们每个人都带着自己的技能去执行任务。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Three astronauts joined this exciting mission.",
     "Chen Dong, the team leader, is very experienced. He has been to space twice."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "The Shenzhou-20 team will stay in the space station for about six months. / First, they replaced the Shenzhou-19 astronauts, giving them a chance to return home. → 代词指代",
    "observe": "根据“The Shenzhou-20 team will stay in the space station for about six months.”和“First, they replaced the Shenzhou-19 astronauts, giving them a chance to return h",
    "clue": "The Shenzhou-20 team will stay in the space station for about six months.；First, they replaced the Shenzhou-19 astronauts, giving them a chance to return home.",
    "plain": "根据“The Shenzhou-20 team will stay in the space station for about six months.”和“First, they replaced the Shenzhou-19 astronauts, giving them a chance to return home.”可知，此处需总领下文，引出下文任务。选项B“让我们了解他们的重要任务。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "The Shenzhou-20 team will stay in the space station for about six months.",
     "First, they replaced the Shenzhou-19 astronauts, giving them a chance to return home."
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "By watching zebrafish (斑马鱼) and other small creatures (生物), they hope to help future long-term space travelers. → 代词指代",
    "observe": "根据“By watching zebrafish (斑马鱼) and other small creatures (生物), they hope to help future long-term space travelers.”可知，此处与研究生物在太空如何存活的意义有关。选项C“且这些实验可以给我们带来新的知识。”",
    "clue": "By watching zebrafish (斑马鱼) and other small creatures (生物), they hope to help future long-term space travelers.",
    "plain": "根据“By watching zebrafish (斑马鱼) and other small creatures (生物), they hope to help future long-term space travelers.”可知，此处与研究生物在太空如何存活的意义有关。选项C“且这些实验可以给我们带来新的知识。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "By watching zebrafish (斑马鱼) and other small creatures (生物), they hope to help future long-term space travelers."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "During these walks, they will place new equipment and test new technologies outside the spaceship. → 段落主旨",
    "observe": "根据“During these walks, they will place new equipment and test new technologies outside the spaceship.”可知，此处应总结这项任务。选项E“这是他们工作的重要组成部分。”符合语境。故选E。",
    "clue": "During these walks, they will place new equipment and test new technologies outside the spaceship.",
    "plain": "根据“During these walks, they will place new equipment and test new technologies outside the spaceship.”可知，此处应总结这项任务。选项E“这是他们工作的重要组成部分。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "During these walks, they will place new equipment and test new technologies outside the spaceship."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "keep → 代词指代",
    "observe": "根据“They will also welcome the Tianzhou-9 supply ship and the Shenzhou-21 mission. These visits will keep supplies coming and teamwork strong.”可知，此处与欢迎天舟9号补给舰和神舟",
    "clue": "keep",
    "plain": "根据“They will also welcome the Tianzhou-9 supply ship and the Shenzhou-21 mission. These visits will keep supplies coming and teamwork strong.”可知，此处与欢迎天舟9号补给舰和神舟21号任务的益处有关。选项A“这有助于保持空间站的运行良好。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "keep"
    ]
   }
  }
 },
 {
  "id": 126,
  "title": "怎样挑到喜欢的书",
  "source": "2025年新疆克孜勒苏模拟预测",
  "range": "46—50",
  "passage": [
   "Do you know how to choose a good book you’ll really like? Here are some tips.",
   "Start with your interest.[[1]]     You can choose something that you love to read, not for school. They can be computers, or fashion design.",
   "What’s your type? Do you prefer fiction or nonfiction (or both)? Fiction books, like novels, can lead you to another world. Nonfiction books give you the who, what, when, and why of something.[[2]]     Many of them read like novels from start to finish. Read the description. The quotes (概述) on the back and inside covers of many books give you an idea of what the book is about. They can also help you choose future books, too. If you find a book you really like, take a minute to read the quotes and see which authors praised the book.[[3]]",
   "Find a family favorite. Which book did your mother love best when she was at your age?[[4]]     Find out and give them a read —then you can share your thoughts about the book.",
   "Finally, you’ll probably enjoy what you’re reading a lot more if you find a quiet place and make time for the book.[[5]]     You can put on some good music, get yourself some tea and let yourself be carried away by the book. You’ll see that time does fly when you’re reading something you love!"
  ],
  "options": [
   "A. How about your brothers and sisters?",
   "B. They tell stories using facts—but that doesn’t mean they’re boring.",
   "C. Most reading is best enjoyed when you can focus on it.",
   "D. Often, they’ll have similar styles and you might find books you like by those authors, too.",
   "E. Reading for fun isn’t like reading for school."
  ],
  "answers": {
   "1": "E",
   "2": "B",
   "3": "D",
   "4": "A",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "Start with your interest. → 因果关系",
    "observe": "根据“Start with your interest.”以及“You can choose something that you  love to read, not for school.”可知，这里在阐述为兴趣阅读和为学校阅读的区别，所以此空应是说明阅读取乐和为学校而读不同的句子。选项E“为了乐趣而阅读和为了上学",
    "clue": "Start with your interest.",
    "plain": "根据“Start with your interest.”以及“You can choose something that you  love to read, not for school.”可知，这里在阐述为兴趣阅读和为学校阅读的区别，所以此空应是说明阅读取乐和为学校而读不同的句子。选项E“为了乐趣而阅读和为了上学而阅读是不一样的。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Start with your interest."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "They / they → 代词指代",
    "observe": "根据“Nonfiction books give you the who, what, when, and why of  something.”可知，在介绍非虚构类书籍的特点，接着应进一步说明这类书的情况。选项B“它们用事实讲故事——但这并不意味着它们很无聊。”表明非虚构类书籍用事实讲故事且并不无聊，是对非虚构类书籍",
    "clue": "They；they",
    "plain": "根据“Nonfiction books give you the who, what, when, and why of  something.”可知，在介绍非虚构类书籍的特点，接着应进一步说明这类书的情况。选项B“它们用事实讲故事——但这并不意味着它们很无聊。”表明非虚构类书籍用事实讲故事且并不无聊，是对非虚构类书籍的进一步描述，符合语境，故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "They",
     "they"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "they / find → 代词指代",
    "observe": "根据“If you find a book you really like, take a minute to read the quotes  and see which authors praised the book.”可知，提到了书的概述以及赞扬该书的作者，接着应说与这些作者相关的内容。选项 D“通常，他们会有",
    "clue": "they；find",
    "plain": "根据“If you find a book you really like, take a minute to read the quotes  and see which authors praised the book.”可知，提到了书的概述以及赞扬该书的作者，接着应说与这些作者相关的内容。选项 D“通常，他们会有相似的风格，并且你可能也会找到那些作者写的你喜欢的书。”表示这些作者风格可能相似，还可能找到这些作者写的你喜欢的书，符合语境，故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "they",
     "find"
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Which book did your mother love best when she was at your age? → 上下文呼应",
    "observe": "根据“Which book did your mother love best when she was at your age?”可知，在说家人喜欢的书，接着应继续围绕家人展开。选项A“你的兄弟姐妹呢？”询问兄弟姐妹喜欢的书，符合语境，故选A。",
    "clue": "Which book did your mother love best when she was at your age?",
    "plain": "根据“Which book did your mother love best when she was at your age?”可知，在说家人喜欢的书，接着应继续围绕家人展开。选项A“你的兄弟姐妹呢？”询问兄弟姐妹喜欢的书，符合语境，故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Which book did your mother love best when she was at your age?"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "reading / when → 代词指代",
    "observe": "根据“Finally, you’ll probably enjoy what you’re reading a lot more if you  find a quiet place and make time for the book.”可知，提到找个安静地方读书，接着应说专注阅读会更享受。选项C“大多数情况下，当你",
    "clue": "reading；when",
    "plain": "根据“Finally, you’ll probably enjoy what you’re reading a lot more if you  find a quiet place and make time for the book.”可知，提到找个安静地方读书，接着应说专注阅读会更享受。选项C“大多数情况下，当你能够专注于阅读时，阅读是最令人享受的。”表明大多数阅读在专注时最享受，符合语境，故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "reading",
     "when"
    ]
   }
  }
 },
 {
  "id": 127,
  "title": "高中新生活的四个建议",
  "source": "2025年新疆喀什三模",
  "range": "31—35",
  "passage": [
   "Starting high school can be stressful and on your first day, you might feel a little nervous. That’s totally normal and many of your classmates will be feeling the same. Just remember to be yourself and get used to the changes that are ahead of you.[[1]]",
   "Take care of yourself.",
   "Be sure to get enough sleep, exercise and eat healthily.[[2]]    Taking care of yourself will help you build self-confidence and mentally prepare you for the changes.",
   "[[3]]",
   "There will be many new people to meet and activities to try. You may want to start by trying some of the after-school activities, like joining a sports team or taking part in a club.[[4]]",
   "Keep up a good study habit.",
   "[[5]]    Talk to your family about setting up a quiet space at home where you'll be able to do your homework tasks."
  ],
  "options": [
   "A. Try new things at high school.",
   "B. This will give you enough energy to deal with your school work and join in class activities.",
   "C. Trying new experiences will help you know your new classmates and find people who have similar interests.",
   "D. Take some time to set up a habit and you’ll be better at your study.",
   "E. Before starting your new school life, here are several suggestions for you."
  ],
  "answers": {
   "1": "E",
   "2": "B",
   "3": "A",
   "4": "C",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Take care of yourself. / Keep up a good study habit. → 段落主旨",
    "observe": "根据“Take care of yourself.”和“Keep up a good study habit.”可知，下文主要介绍了几个关于开始高中生活的建议，因此此处需要起到引出下文的作用，E项“在开始新的学校生活之前，这里有几点建议给你。”符合语境。故选E。",
    "clue": "Take care of yourself.；Keep up a good study habit.",
    "plain": "根据“Take care of yourself.”和“Keep up a good study habit.”可知，下文主要介绍了几个关于开始高中生活的建议，因此此处需要起到引出下文的作用，E项“在开始新的学校生活之前，这里有几点建议给你。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Take care of yourself.",
     "Keep up a good study habit."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Be sure to get enough sleep, exercise and eat healthily. → 代词指代",
    "observe": "根据“Be sure to get enough sleep, exercise and eat healthily.”可知，此处应说明为什么要保证充足的睡眠、锻炼和健康饮食，B项“这将给你足够的精力来处理你的学校作业和参加班级活动。”符合语境。故选B。",
    "clue": "Be sure to get enough sleep, exercise and eat healthily.",
    "plain": "根据“Be sure to get enough sleep, exercise and eat healthily.”可知，此处应说明为什么要保证充足的睡眠、锻炼和健康饮食，B项“这将给你足够的精力来处理你的学校作业和参加班级活动。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Be sure to get enough sleep, exercise and eat healthily."
    ]
   },
   "3": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "There will be many new people to meet and activities to try. → 小标题格式",
    "observe": "根据“There will be many new people to meet and activities to try.”可知，本段主要强调尝试新事物，A项“在高中尝试新事物。”符合语境。故选A。",
    "clue": "There will be many new people to meet and activities to try.",
    "plain": "根据“There will be many new people to meet and activities to try.”可知，本段主要强调尝试新事物，A项“在高中尝试新事物。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "There will be many new people to meet and activities to try."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Trying / will → 段落主旨",
    "observe": "根据“You may want to start by trying some of the after-school activities, like joining a sports team or taking part in a club.”可知，此处应说明尝试新事物带来的益处，C项“尝试新的体验会帮助你了解你",
    "clue": "Trying；will",
    "plain": "根据“You may want to start by trying some of the after-school activities, like joining a sports team or taking part in a club.”可知，此处应说明尝试新事物带来的益处，C项“尝试新的体验会帮助你了解你的新同学，并找到有相似兴趣的人。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Trying",
     "will"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Keep up a good study habit. → 段落主旨",
    "observe": "根据“Keep up a good study habit.”可知，此处内容应与养成习惯有关，D项“花点时间养成一个习惯，你的学习就会更好。”符合语境。故选D。",
    "clue": "Keep up a good study habit.",
    "plain": "根据“Keep up a good study habit.”可知，此处内容应与养成习惯有关，D项“花点时间养成一个习惯，你的学习就会更好。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Keep up a good study habit."
    ]
   }
  }
 },
 {
  "id": 128,
  "title": "语法到底该怎样学",
  "source": "2024-2025学年新疆和田九年级上学期期末",
  "range": "1—5",
  "passage": [
   "English learners have different opinions about grammar.[[1]]    Others hate grammar and they think it is boring to learn grammar.",
   "[[2]]    It is in every sentence you read or write, speak or hear. We need those rules in the same way as we need the rules in a game. If there are no rules, or if everybody follows their own rules, the game would soon break down. It's the same with language; without rules we would not be able to communicate with other people.",
   "[[3]]    Some teachers believe in the importance of grammar lessons. Other teachers feel that grammar is best learned by doing different language activities without paying too much attention to the rules. No matter which is the way you are taught, here is some advice that may help you to learn grammar more effectively.",
   "Read a lot. Reading is the most important step in improving your English skills. You will see how to use words correctly in sentences.",
   "Keep a diary or a blog. After you have read a book, it will be useful to put your learning into practice. Start a diary or a blog. In this way you will not forget what you have learned.[[4]]",
   "Listen to English songs. Songs are stories of how people feel 一or, at least, a lot of them are. Listening to them will give you an idea of how to express certain things.",
   "Watch English movies.[[5]]    You can learn how to use English words in daily communication."
  ],
  "options": [
   "A. Don't give up learning English grammar.",
   "B. There are a lot of conversations in them.",
   "C. However, you cannot escape from grammar.",
   "D. Some are very interested in finding out or learning grammar rules.",
   "E. You will also be able to practise the proper usage of the language."
  ],
  "answers": {
   "1": "D",
   "2": "C",
   "3": "A",
   "4": "E",
   "5": "B"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "Others hate grammar and they think it is boring to learn grammar. → 因果关系",
    "observe": "由后句“Others hate grammar and they think it is boring to learn grammar.”可知，另一些人讨厌语法，他们认为学习语法很无聊，所以此句是说有些人喜欢学语法。D项“有些人对发现或学习语法规则非常感兴趣”，符合语境，故选D。",
    "clue": "Others hate grammar and they think it is boring to learn grammar.",
    "plain": "由后句“Others hate grammar and they think it is boring to learn grammar.”可知，另一些人讨厌语法，他们认为学习语法很无聊，所以此句是说有些人喜欢学语法。D项“有些人对发现或学习语法规则非常感兴趣”，符合语境，故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Others hate grammar and they think it is boring to learn grammar."
    ]
   },
   "2": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "It is in every sentence you read or write, speak or hear. → 因果关系",
    "observe": "第二段主要讲的是语法的重要性，语言没有规则，就无法与他人沟通，所以此句是说离开语法是不行的。C项“然而，你不能逃避语法”符合语境，故选C。",
    "clue": "It is in every sentence you read or write, speak or hear.",
    "plain": "第二段主要讲的是语法的重要性，语言没有规则，就无法与他人沟通，所以此句是说离开语法是不行的。C项“然而，你不能逃避语法”符合语境，故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "It is in every sentence you read or write, speak or hear."
    ]
   },
   "3": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "grammar → 因果关系",
    "observe": "上段提到了不能逃避语法，本段又讲了老师对语法学习的看法，所以此句是说对于语法学习不可以放弃。A项意为“不要放弃学习英语语法”，符合语境，故选A。",
    "clue": "grammar",
    "plain": "上段提到了不能逃避语法，本段又讲了老师对语法学习的看法，所以此句是说对于语法学习不可以放弃。A项意为“不要放弃学习英语语法”，符合语境，故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "grammar"
    ]
   },
   "4": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "will → 因果关系",
    "observe": "本段主要谈通过记日记或写博客来练习英语的作用，前一句提到了这样就不会忘记所学的内容，所以此句是说它的另一个作用。E项“你也可以练习语言的正确用法”符合语境，故选E。",
    "clue": "will",
    "plain": "本段主要谈通过记日记或写博客来练习英语的作用，前一句提到了这样就不会忘记所学的内容，所以此句是说它的另一个作用。E项“你也可以练习语言的正确用法”符合语境，故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "will"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "You can learn how to use English words in daily communication. → 代词指代",
    "observe": "由后句“你可以学习如何在日常交流中使用英语单词”可知，此句是说里面有许多对话。B项“里面有很多对话”符合语境，故选B。",
    "clue": "You can learn how to use English words in daily communication.",
    "plain": "由后句“你可以学习如何在日常交流中使用英语单词”可知，此句是说里面有许多对话。B项“里面有很多对话”符合语境，故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "You can learn how to use English words in daily communication."
    ]
   }
  }
 },
 {
  "id": 129,
  "title": "怎样计划好每一天",
  "source": "2024-2025学年新疆吐鲁番九年级上学期期末",
  "range": "1—5",
  "passage": [
   "As a student, making a good plan can help you finish your daily tasks. Please keep reading to learn how to plan your day and make a good use of your time.",
   "First, buy a calendar and a small notebook. There are plenty of calendars or small notebooks for planning in the bookstore.[[1]]",
   "Second, write down everything you need to do for the day. Think about what you need to do today in the morning.[[2]]     For example, wash the dirty clothes, finish Page 4 of the exercise book, run for 30 minutes and so on.",
   "After that, use different colors to circle different kinds of tasks.[[3]]     Color codes can help you read your notes more easily.",
   "Finally, put a number to show what’s important.[[4]]     And numbering the tasks can help you choose to do the important things first.",
   "[[5]]     Try not to make your plans too full. Keeping some free time in your plan can help you relax."
  ],
  "options": [
   "A. Put every task or goal in the notes.",
   "B. It’s important to know what you need to do first.",
   "C. Don’t forget to give yourself enough time to finish the tasks.",
   "D. You can choose the ones with “to-do lists” or monthly and weekly plans.",
   "E. The daily housework may be green, exercise yellow, and homework red."
  ],
  "answers": {
   "1": "D",
   "2": "A",
   "3": "E",
   "4": "B",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "There are plenty of calendars or small notebooks for planning in the bookstore. → 段落主旨",
    "observe": "根据上文“First, buy a calendar and a small notebook. There are plenty of calendars or small notebooks for planning in the bookstore.”可知，此处应与笔记本或日历有关，D选项“你可以选择那些有‘任务",
    "clue": "There are plenty of calendars or small notebooks for planning in the bookstore.",
    "plain": "根据上文“First, buy a calendar and a small notebook. There are plenty of calendars or small notebooks for planning in the bookstore.”可知，此处应与笔记本或日历有关，D选项“你可以选择那些有‘任务清单’或每月和每周计划的。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "There are plenty of calendars or small notebooks for planning in the bookstore."
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "every → 上下文呼应",
    "observe": "根据上文“Second, write down everything you need to do for the day. Think about what you need to do today in the morning.”可知，此处应是把想到的要做的事情写下来，A选项“把每个任务或目标都记在笔记上。”符合语",
    "clue": "every",
    "plain": "根据上文“Second, write down everything you need to do for the day. Think about what you need to do today in the morning.”可知，此处应是把想到的要做的事情写下来，A选项“把每个任务或目标都记在笔记上。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "every"
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "After that, use different colors to circle different kinds of tasks. → 上下文呼应",
    "observe": "根据上文“After that, use different colors to circle different kinds of tasks.”可知，此处应与不同颜色的任务有关，E选项“日常家务可以是绿色的，运动可以是黄色的，作业可以是红色的。”符合语境。故选E。",
    "clue": "After that, use different colors to circle different kinds of tasks.",
    "plain": "根据上文“After that, use different colors to circle different kinds of tasks.”可知，此处应与不同颜色的任务有关，E选项“日常家务可以是绿色的，运动可以是黄色的，作业可以是红色的。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "After that, use different colors to circle different kinds of tasks."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Finally, put a number to show what’s important. → 代词指代",
    "observe": "根据上文“Finally, put a number to show what’s important.”可知，对重要的事情进行编号，B选项“首先知道你需要做什么很重要。”符合语境。故选B。",
    "clue": "Finally, put a number to show what’s important.",
    "plain": "根据上文“Finally, put a number to show what’s important.”可知，对重要的事情进行编号，B选项“首先知道你需要做什么很重要。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Finally, put a number to show what’s important."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "time → 段落主旨",
    "observe": "根据下文“Try not to make your plans too full. Keeping some free time in your plan can help you relax.”可知，此处与完成任务的时间安排有关，C选项“别忘了给自己足够的时间来完成任务。”符合语境。故选C。",
    "clue": "time",
    "plain": "根据下文“Try not to make your plans too full. Keeping some free time in your plan can help you relax.”可知，此处与完成任务的时间安排有关，C选项“别忘了给自己足够的时间来完成任务。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "time"
    ]
   }
  }
 },
 {
  "id": 130,
  "title": "新年计划怎样坚持下去",
  "source": "2024-2025学年新疆阿克苏九年级上学期期末",
  "range": "1—5",
  "passage": [
   "Maybe you want to exercise more or start going to bed earlier in the coming year.[[1]]",
   "Make a detailed (详细的) plan.",
   "If your New Year’s plan is to exercise five days each week, a plan like “I’ll exercise on weekdays” would not be clear. A detailed plan like “I’ll exercise at school on weekdays during my lunch break” would be better.[[2]]",
   "Make it fun.",
   "If it’s not fun to exercise or study, you won’t keep it easily.[[3]]    If you can only drink your favorite juice during study hours, you’ll look forward to studying.",
   "[[4]]",
   "Tell a few friends about your goals so you’ll feel a deep sense of shame if they check back later and find out you haven’t followed through.",
   "Give yourself more chances.",
   "You planned to get to bed early every night, but one Friday you stayed up late.",
   "[[5]]    But giving yourself one or two more chances can help you get better results."
  ],
  "options": [
   "A. Get a little help from your friends.",
   "B. Here is some advice that can help you keep your goals.",
   "C. After that, you may want to give up the early-to-bed plan.",
   "D. But if you get fun from your exercise or study, you’ll keep longer.",
   "E. All in all, you should give all the facts or information about something in your plan."
  ],
  "answers": {
   "1": "B",
   "2": "E",
   "3": "D",
   "4": "A",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Maybe you want to exercise more or start going to bed earlier in the coming year. → 段落主旨",
    "observe": "根据前句“Maybe you want to exercise more or start going to bed earlier in the coming year.”以及下文的介绍可知，此处应该是指出有一些建议，选项B“这里有一些建议可以帮助你坚持你的目标”符合语境。故选B。",
    "clue": "Maybe you want to exercise more or start going to bed earlier in the coming year.",
    "plain": "根据前句“Maybe you want to exercise more or start going to bed earlier in the coming year.”以及下文的介绍可知，此处应该是指出有一些建议，选项B“这里有一些建议可以帮助你坚持你的目标”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Maybe you want to exercise more or start going to bed earlier in the coming year."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "your / plan → 段落主旨",
    "observe": "根据前句“If your New Year’s plan is to exercise five days each week, a plan like ‘I’ll exercise on weekdays’ would not be clear. A detailed plan like ‘I’ll exercise",
    "clue": "your；plan",
    "plain": "根据前句“If your New Year’s plan is to exercise five days each week, a plan like ‘I’ll exercise on weekdays’ would not be clear. A detailed plan like ‘I’ll exercise at school on weekdays during my lunch break’ would be better.”可知，此处应该是说与计划有关的情况，即计划应该是具体详细的，选项E“总而言之，你应该在你的计划中提供所有的事实或信息”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "your",
     "plan"
    ]
   },
   "3": {
    "level": "第二级",
    "method": "逻辑关系突破",
    "chain": "If it’s not fun to exercise or study, you won’t keep it easily. → 逻辑关系",
    "observe": "根据前句“If it’s not fun to exercise or study, you won’t keep it easily.”可知，此处应该是说要有乐趣才能坚持下去，选项D“但如果你从锻炼或学习中获得乐趣，你就会坚持得更久”符合语境。故选D。",
    "clue": "If it’s not fun to exercise or study, you won’t keep it easily.",
    "plain": "根据前句“If it’s not fun to exercise or study, you won’t keep it easily.”可知，此处应该是说要有乐趣才能坚持下去，选项D“但如果你从锻炼或学习中获得乐趣，你就会坚持得更久”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "If it’s not fun to exercise or study, you won’t keep it easily."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "Tell a few friends about your goals so you’ll feel a deep sense of shame if they check back later and find out you haven’t followed through. → 小标题格式",
    "observe": "根据“Tell a few friends about your goals so you’ll feel a deep sense of shame if they check back later and find out you haven’t followed through.”可知此处在介绍要告诉朋友你的目标",
    "clue": "If it’s not fun to exercise or study, you",
    "plain": "根据“Tell a few friends about your goals so you’ll feel a deep sense of shame if they check back later and find out you haven’t followed through.”可知此处在介绍要告诉朋友你的目标，选项A“从你的朋友那里获得一点帮助”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Tell a few friends about your goals so you’ll feel a deep sense of shame if they check back later and find out you haven’t followed through."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "You planned to get to bed early every night, but one Friday you stayed up late. → 段落主旨",
    "observe": "根据前句“You planned to get to bed early every night, but one Friday you stayed up late.”可知，此处应是说与早睡计划有关的情况，选项C“在那之后，你可能会想要放弃早睡的计划”符合语境。故选C。",
    "clue": "You planned to get to bed early every night, but one Friday you stayed up late.",
    "plain": "根据前句“You planned to get to bed early every night, but one Friday you stayed up late.”可知，此处应是说与早睡计划有关的情况，选项C“在那之后，你可能会想要放弃早睡的计划”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "You planned to get to bed early every night, but one Friday you stayed up late."
    ]
   }
  }
 },
 {
  "id": 131,
  "title": "练好倾听的几个办法",
  "source": "2024-2025学年新疆克孜勒苏柯尔克孜自治州九年级上学期期末",
  "range": "1—5",
  "passage": [
   "Listening is a very important skill. Good communication always starts with good listening. But the skill of listening does not come naturally.[[1]]",
   "Ask Good Questions",
   "When someone comes to you with a problem, it is natural for you to give them advice. However, instead of giving advice, asking good questions is more important. It shows that you are interested in what people are telling you.[[2]]",
   "Avoid too much Nodding",
   "Nodding while listening to people shows that you are listening carefully.[[3]]     If you nod too much, it may make people feel uncomfortable as they may think you are just trying to agree with everything.",
   "[[4]]",
   "You also need to pay attention while people are speaking. It is rude to speak while others are still talking. Even if you want the speaker to explain something for you, wait until they finish their part.",
   "Follow Up",
   "To show your further concern about people, you can go beyond just listening to them.[[5]]     It is an act that shows your care and support."
  ],
  "options": [
   "A. However, you need to pay attention not to do it too often.",
   "B. Be Patient",
   "C. Try to make a phone call or text them after the talk.",
   "D. It also helps deepen your understanding.",
   "E. Here are a few tips to help you become a good listener."
  ],
  "answers": {
   "1": "E",
   "2": "D",
   "3": "A",
   "4": "B",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Ask Good Questions / Avoid too much Nodding → 段落主旨",
    "observe": "根据“Ask Good Questions”、“Avoid too much Nodding”以及“Follow Up”可知，空处会引导段落内容，会给出建议帮助提升倾听技能。选项E“这里有一些技巧可以帮助您成为一个好的倾听者。”与之相符。故选E。",
    "clue": "Ask Good Questions；Avoid too much Nodding；Follow Up",
    "plain": "根据“Ask Good Questions”、“Avoid too much Nodding”以及“Follow Up”可知，空处会引导段落内容，会给出建议帮助提升倾听技能。选项E“这里有一些技巧可以帮助您成为一个好的倾听者。”与之相符。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Ask Good Questions",
     "Avoid too much Nodding",
     "Follow Up"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "It shows that you are interested in what people are telling you. → 代词指代",
    "observe": "根据“However, instead of giving advice, asking good questions is more important. It shows that you are interested in what people are telling you.”可知，讲的是问问题的好处，选项D",
    "clue": "It shows that you are interested in what people are telling you.",
    "plain": "根据“However, instead of giving advice, asking good questions is more important. It shows that you are interested in what people are telling you.”可知，讲的是问问题的好处，选项D“它还有助于加深您的理解。”与之相符。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "It shows that you are interested in what people are telling you."
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "If you nod too much, it may make people feel → 代词指代",
    "observe": "根据“If you nod too much, it may make people feel uncomfortable as they may think you are just trying to agree with everything.”可知，空处会讲不要点头太多。选项A“不过需要注意的是，不要太过频繁点",
    "clue": "If you nod too much, it may make people feel",
    "plain": "根据“If you nod too much, it may make people feel uncomfortable as they may think you are just trying to agree with everything.”可知，空处会讲不要点头太多。选项A“不过需要注意的是，不要太过频繁点头。”与之相符。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "If you nod too much, it may make people feel"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "小标题格式突破",
    "chain": "You also need to pay attention while people are speaking. → 小标题格式",
    "observe": "根据“You also need to pay attention while people are speaking. It is rude to speak while others are still talking. Even if you want the speaker to explain somethi",
    "clue": "Nodding while listening to people shows that you are",
    "plain": "根据“You also need to pay attention while people are speaking. It is rude to speak while others are still talking. Even if you want the speaker to explain something for you, wait until they finish their part.”可知，本段建议人们要耐心等待别人把话讲完，然后自己再陈述观点。选项B“耐心些。”与之相符。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "You also need to pay attention while people are speaking."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Follow Up / It is an act that shows your care and support. → 代词指代",
    "observe": "根据“Follow Up”以及“It is an act that shows your care and support.”可知，本段主要讲了进一步关注的建议，故空处与倾听后的行动相关。选项C“谈话结束后尝试打电话或发短信给他们。”与之相符。故选C。",
    "clue": "Follow Up；It is an act that shows your care and support.",
    "plain": "根据“Follow Up”以及“It is an act that shows your care and support.”可知，本段主要讲了进一步关注的建议，故空处与倾听后的行动相关。选项C“谈话结束后尝试打电话或发短信给他们。”与之相符。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Follow Up",
     "It is an act that shows your care and support."
    ]
   }
  }
 },
 {
  "id": 132,
  "title": "澳门回归后的旅游热",
  "source": "2024-2025学年新疆乌鲁木齐九年级上学期期末",
  "range": "1—5",
  "passage": [
   "Since Macao returned to the motherland, it has developed very rapidly these years, especially in tourism. In 1999, Macao had about 7.44 million tourists.[[1]]    And in 2018, Macao’s tourism (旅游业) revenue (收入) was $40.2 billion ranking (排列) the 11th place in the world.",
   "“[[2]]    We’ve never seen so many tourists,” says an official from Macao. Why do so many tourists visit the city? First, the food in Macao always gives tourists some special experiences. “[[3]]    It talks about the history of Macao,” says an official. One of the must-try local foods in Macao is minchi. It is made of beef or pork. It is served with a fried egg on top.",
   "[[4]]    In 2005, the Historic Center of Macao was included (列入) on the list of World Cultural Heritage. It has historic streets and different types of Portuguese buildings. The Ruins of Saint Paul’s is the symbol of Macao. It is a must-see site.[[5]]",
   "In Macao, you can also see China’s oldest lighthouse. It witnessed (见证) the earliest meeting between China and the West."
  ],
  "options": [
   "A. However, in 2018, the number went up to 35.8 million.",
   "B. What’s more, people have also become interested in Macao’s history and culture.",
   "C. I think Macanese food is something to go for when you come here.",
   "D. It stands next to the famous Mount Fortress and the Macao Museum.",
   "E. For the past 20 years, we have experienced amazing growth in tourism."
  ],
  "answers": {
   "1": "A",
   "2": "E",
   "3": "C",
   "4": "B",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "逻辑关系突破",
    "chain": "In 1999, Macao had about 7.44 million tourists. / And in 2018, → 逻辑关系",
    "observe": "根据上文“In 1999, Macao had about 7.44 million tourists.”和下文“And in 2018,”可知，此处在讲2018年澳门的旅游人数。选项A“然而，在2018年，这一数字上升到3580万。”符合语境。故选A。",
    "clue": "In 1999, Macao had about 7.44 million tourists.；And in 2018,",
    "plain": "根据上文“In 1999, Macao had about 7.44 million tourists.”和下文“And in 2018,”可知，此处在讲2018年澳门的旅游人数。选项A“然而，在2018年，这一数字上升到3580万。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "In 1999, Macao had about 7.44 million tourists.",
     "And in 2018,"
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "We’ve never seen so many tourists, → 上下文呼应",
    "observe": "根据第一段可知，澳门的旅游业从1999年到2018年经历了惊人的发展；结合下文“We’ve never seen so many tourists,”可知，澳门旅游人数大涨。选项E“在过去的20年里，我们经历了旅游业的惊人增长。”符合语境。故选E。",
    "clue": "We’ve never seen so many tourists,",
    "plain": "根据第一段可知，澳门的旅游业从1999年到2018年经历了惊人的发展；结合下文“We’ve never seen so many tourists,”可知，澳门旅游人数大涨。选项E“在过去的20年里，我们经历了旅游业的惊人增长。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "We’ve never seen so many tourists,"
    ]
   },
   "3": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "First, the food in Macao always gives tourists some special experiences. → 因果关系",
    "observe": "根据上文“First, the food in Macao always gives tourists some special experiences.”可知，澳门美食是吸引游客的原因。选项C“我认为你来这里一定要吃澳门菜。”符合语境。故选C。",
    "clue": "First, the food in Macao always gives tourists some special experiences.",
    "plain": "根据上文“First, the food in Macao always gives tourists some special experiences.”可知，澳门美食是吸引游客的原因。选项C“我认为你来这里一定要吃澳门菜。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "First, the food in Macao always gives tourists some special experiences."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Macao → 段落主旨",
    "observe": "根据下文“In 2005, the Historic Center of Macao was included (列入) on the list of World Cultural Heritage.”可知，这段讲述了澳门的历史和文化。选项B“更重要的是，人们也开始对澳门的历史和文化感兴趣。”符合语境。故选B。",
    "clue": "Macao",
    "plain": "根据下文“In 2005, the Historic Center of Macao was included (列入) on the list of World Cultural Heritage.”可知，这段讲述了澳门的历史和文化。选项B“更重要的是，人们也开始对澳门的历史和文化感兴趣。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Macao"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "The Ruins of Saint Paul’s is the symbol of Macao. It is a must-see site. → 代词指代",
    "observe": "根据上文“The Ruins of Saint Paul’s is the symbol of Macao. It is a must-see site.”可知，这里讲了圣保罗教堂遗址的信息，选项D“它紧邻着著名的山堡和澳门博物馆。”符合语境。故选D。",
    "clue": "The Ruins of Saint Paul’s is the symbol of Macao. It is a must-see site.",
    "plain": "根据上文“The Ruins of Saint Paul’s is the symbol of Macao. It is a must-see site.”可知，这里讲了圣保罗教堂遗址的信息，选项D“它紧邻着著名的山堡和澳门博物馆。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "The Ruins of Saint Paul’s is the symbol of Macao. It is a must-see site."
    ]
   }
  }
 },
 {
  "id": 133,
  "title": "发明是怎样做出来的",
  "source": "2023-2024学年新疆和田九年级上学期期中",
  "range": "1—5",
  "passage": [
   "An invention may be a new product or a new way of doing things. Inventions come about in many ways. Most of the time, inventions happen because someone works to solve a problem.",
   "[[1]]      Look at your schoolbags. You  have pencils, pens, crayons, rulers and some books.   None of these things was planted in fields. They were made in factories and invented by someone. Inventing is interesting and exciting and everyone can be an inventor. Do you want to be an inventor?[[2]]",
   "●Use your imagination. You can have wild and crazy thoughts. Remember that no idea is too silly. Many people laughed at the Wright brothers and said they would never fly. But they weren’t discouraged by what people said. That’s why now we have plane.",
   "●Plan and design your invention. Careful planning is important in the invention process. This is the time to brainstorm for ideas and to evaluate them.",
   "●[[3]]      Make a detailed drawing of your invention so others will understand how your invention works.",
   "●Make a model of your invention.",
   "●Test your invention. See if your invention works as it is planned.[[4]]",
   "●[[5]]      Every invention needs a name.",
   "●Share your inventions with others."
  ],
  "options": [
   "A. Draw your invention.",
   "B. Sometimes inventions are the result of accidents.",
   "C. There are a few simple steps to follow in the invention process.",
   "D. Name your invention.",
   "E. If not, do more research, redesign it and test it again."
  ],
  "answers": {
   "1": "B",
   "2": "C",
   "3": "A",
   "4": "E",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "Most of the time, inventions happen because someone works to solve a problem. → 因果关系",
    "observe": "根据“Most of the time, inventions happen because someone works to solve a problem.”可知，有时候发明是为了去解决问题，选项B“有时发明是意外的结果。”符合语境，故选B。",
    "clue": "Most of the time, inventions happen because someone works to solve a problem.",
    "plain": "根据“Most of the time, inventions happen because someone works to solve a problem.”可知，有时候发明是为了去解决问题，选项B“有时发明是意外的结果。”符合语境，故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Most of the time, inventions happen because someone works to solve a problem."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Do you want to be an inventor? → 段落主旨",
    "observe": "根据“Do you want to be an inventor?”可知，引起下文，介绍发明过程中的步骤，选项C“在发明过程中有几个简单的步骤可以遵循。”符合语境，故选C。",
    "clue": "Do you want to be an inventor?",
    "plain": "根据“Do you want to be an inventor?”可知，引起下文，介绍发明过程中的步骤，选项C“在发明过程中有几个简单的步骤可以遵循。”符合语境，故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Do you want to be an inventor?"
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Draw / your → 上下文呼应",
    "observe": "根据“Make a detailed drawing of your invention so others will understand how your invention works”可知，此处讲述要画出发明，选项A“画出你的发明。”符合语境，故选A。",
    "clue": "Draw；your",
    "plain": "根据“Make a detailed drawing of your invention so others will understand how your invention works”可知，此处讲述要画出发明，选项A“画出你的发明。”符合语境，故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Draw",
     "your"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "See if your invention works as it is planned. → 代词指代",
    "observe": "根据“See if your invention works as it is planned.”可知，讲述发明是否如愿，选项E“如果不是，做更多的研究，重新设计并再次测试。”符合语境，故选E。",
    "clue": "See if your invention works as it is planned.",
    "plain": "根据“See if your invention works as it is planned.”可知，讲述发明是否如愿，选项E“如果不是，做更多的研究，重新设计并再次测试。”符合语境，故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "See if your invention works as it is planned."
    ]
   },
   "5": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Every invention needs a name. → 上下文呼应",
    "observe": "根据“Every invention needs a name.”可知，需要给发明命名，选项D“命名你的发明。”符合语境，故选D。",
    "clue": "Every invention needs a name.",
    "plain": "根据“Every invention needs a name.”可知，需要给发明命名，选项D“命名你的发明。”符合语境，故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Every invention needs a name."
    ]
   }
  }
 },
 {
  "id": 134,
  "title": "让自己变自信的办法",
  "source": "2023-2024学年新疆阿克苏九年级上学期期末",
  "range": "1—5",
  "passage": [
   "Some of you might often feel unhappy or forget how great you are. But do you want to make you feel good about yourself ?[[1]]",
   "Look at the mirror and say to yourself. “I am a special person and there’s no one in the world like me. I can do anything!” It may not sound good, but it really works !",
   "Smile.[[2]]     Look for the good things in your friends and family.",
   "Do something nice for someone. Helping others always makes you feel good.",
   "[[3]]     Have you ever wanted to decorate (装饰) your own room or learn how to swim? Go for it! New challenges are fun and give you a sense of achievement when you have finished.",
   "[[4]]     Turn off the TV, be friends with the books and let your dream fly! Write down your thoughts, dreams or anything you want! Writing always helps to open up your thoughts.",
   "Stay with your family. We all need our family time.[[5]]"
  ],
  "options": [
   "A. Learn something new.",
   "B. Read and start a diary.",
   "C. Talk with your mum or dad or maybe even your cousin.",
   "D. Be friendly to people you meet.",
   "E. Here are some suggestions for you."
  ],
  "answers": {
   "1": "E",
   "2": "D",
   "3": "A",
   "4": "B",
   "5": "C"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Look at the mirror and say to yourself / Smile → 段落主旨",
    "observe": "根据前句“But do you want to make you feel good about yourself?”，“Look at the mirror and say to yourself”和“Smile”可知，空处应是让自己变得自信的建议，E项“这里有一些建议给你”符合语境，故选 E。",
    "clue": "Look at the mirror and say to yourself；Smile",
    "plain": "根据前句“But do you want to make you feel good about yourself?”，“Look at the mirror and say to yourself”和“Smile”可知，空处应是让自己变得自信的建议，E项“这里有一些建议给你”符合语境，故选 E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Look at the mirror and say to yourself",
     "Smile"
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Smile / Look for the good things in your friends and family → 上下文呼应",
    "observe": "根据前句“Smile”和后句“Look for the good things in your friends and family”可知，空处应是在讲微笑，即对他人友好，D项“对你遇到的人要友好”符合语境，故选D。",
    "clue": "Smile；Look for the good things in your friends and family",
    "plain": "根据前句“Smile”和后句“Look for the good things in your friends and family”可知，空处应是在讲微笑，即对他人友好，D项“对你遇到的人要友好”符合语境，故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Smile",
     "Look for the good things in your friends and family"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Learn → 段落主旨",
    "observe": "根据后句“Have you ever wanted to decorate  your own room or learn how to swim? Go for it! New challenges are fun and give you a sense of achievement when you have f",
    "clue": "Learn",
    "plain": "根据后句“Have you ever wanted to decorate  your own room or learn how to swim? Go for it! New challenges are fun and give you a sense of achievement when you have finished”可知，空处应是面对新挑战，A项“学习新东西”符合语境，故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Learn"
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Turn off the TV, be friends with the books and let your dream fly! → 段落主旨",
    "observe": "根据后句“Write down your thoughts, dreams or anything you want! Writing always helps to open up your thoughts”可知，空处应是有关写作，B项“阅读并开始写日记”符合语境，故选B。",
    "clue": "Turn off the TV, be friends with the books and let your dream fly!",
    "plain": "根据后句“Write down your thoughts, dreams or anything you want! Writing always helps to open up your thoughts”可知，空处应是有关写作，B项“阅读并开始写日记”符合语境，故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Turn off the TV, be friends with the books and let your dream fly!"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Stay with your family. We all need our family time → 段落主旨",
    "observe": "根据前句“Stay with your family. We all need our family time”可知，空处应是和家人相处，C项“和你的父母，甚至你的表妹谈谈”符合语境，故选C。",
    "clue": "Stay with your family. We all need our family time",
    "plain": "根据前句“Stay with your family. We all need our family time”可知，空处应是和家人相处，C项“和你的父母，甚至你的表妹谈谈”符合语境，故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Stay with your family. We all need our family time"
    ]
   }
  }
 },
 {
  "id": 135,
  "title": "中国人的待客之道",
  "source": "2023-2024学年新疆克拉玛依九年级上学期期末",
  "range": "1—5",
  "passage": [
   "China is a nation of etiquette (礼仪).[[1]]     If foreigners visit a Chinese family, they would be surprised at the warmth that they would receive as guests.[[2]]     Family will also chat with you and never let you feel lonely.",
   "At the same time, other family members will prepare a meal for you.[[3]]     They always present more food than the guests can eat. On the table, the guests must be the first to eat. Perhaps one of the things that surprises a western guest most is that the Chinese host likes to pick food for visitors, which won’t happen at western tables.[[4]]     As you finish eating, the host usually says, “[[5]]     Please have more.” Although you tell them you are full, they still put more food in your bowl.",
   "Being warm and hospitable (好客的) has been an important part of Chinese culture and tradition."
  ],
  "options": [
   "A. It seems that you didn’t eat much.",
   "B. Chinese people usually treat their guests with a big meal.",
   "C. The Chinese family go out of their way to make you feel at home.",
   "D. When you visit a Chinese family, the host usually makes tea for you.",
   "E. Chinese people are among the most hospitable people in the world."
  ],
  "answers": {
   "1": "E",
   "2": "D",
   "3": "B",
   "4": "C",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Chinese → 上下文呼应",
    "observe": "根据“If foreigners visit a Chinese family, they would be surprised at the warmth that they would receive as guests.”可知，此处是讲中国人好客，选项E“中国人民是世界上最好客的人民之一。”符合语境。故选E。",
    "clue": "Chinese",
    "plain": "根据“If foreigners visit a Chinese family, they would be surprised at the warmth that they would receive as guests.”可知，此处是讲中国人好客，选项E“中国人民是世界上最好客的人民之一。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Chinese"
    ]
   },
   "2": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "visit / Chinese → 上下文呼应",
    "observe": "根据“Family will also chat with you, never let you feel lonely.”可知，此处是讲拜访中国家庭时的常见活动，选项D“当你拜访一个中国家庭时，主人通常会为你泡茶。”符合语境。故选D。",
    "clue": "visit；Chinese",
    "plain": "根据“Family will also chat with you, never let you feel lonely.”可知，此处是讲拜访中国家庭时的常见活动，选项D“当你拜访一个中国家庭时，主人通常会为你泡茶。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "visit",
     "Chinese"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "They always present more food than the guests can eat. → 代词指代",
    "observe": "根据“They always present more food than the guests can eat.”可知，此处是关于中国人给客人的供餐情况，选项B“中国人通常用大餐招待客人。”符合语境。故选B。",
    "clue": "They always present more food than the guests can eat.",
    "plain": "根据“They always present more food than the guests can eat.”可知，此处是关于中国人给客人的供餐情况，选项B“中国人通常用大餐招待客人。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "They always present more food than the guests can eat."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Chinese / family → 代词指代",
    "observe": "根据“Perhaps one of the things that surprises a western guest most is that the Chinese host likes to pick food for visitors, which won’t happen at western tables.",
    "clue": "Chinese；family",
    "plain": "根据“Perhaps one of the things that surprises a western guest most is that the Chinese host likes to pick food for visitors, which won’t happen at western tables.”可知，此处是讲中国人会尽力让客人舒适，选项C“中国家庭不遗余力地让你有宾至如归的感觉。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Chinese",
     "family"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "As you finish eating, the host usually says, / Please have more. → 代词指代",
    "observe": "根据“As you finish eating, the host usually says,”以及“Please have more.”可知，应该是一个表示客人没吃多少的句子，选项A“看来你吃得不多。”符合语境。故选A。",
    "clue": "As you finish eating, the host usually says,；Please have more.",
    "plain": "根据“As you finish eating, the host usually says,”以及“Please have more.”可知，应该是一个表示客人没吃多少的句子，选项A“看来你吃得不多。”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "As you finish eating, the host usually says,",
     "Please have more."
    ]
   }
  }
 },
 {
  "id": 136,
  "title": "怎样过好青少年时光",
  "source": "2023-2024学年新疆伊犁九年级上学期期末",
  "range": "1—5",
  "passage": [
   "Being a teenager can be difficult, since you’re dealing with schoolwork and trying to find your place in the world. But that doesn’t mean you can’t enjoy being a teenager.[[1]]",
   "Study hard at school.",
   "[[2]]     So always turn in your homework on time and do well in tests. Education is the most important thing in your teen life.",
   "Make a few good friends.",
   "It is not necessary to know everyone at school, but you should try to make a few good friends.[[3]]     Because good friends can make you feel good and bring out the best in you.",
   "Have your hobbies.",
   "[[4]]     Don’t be afraid to try new things. You can try reading books, singing songs, and playing badminton. Or you can move from simple writing to writing poetry (诗歌).",
   "Consider doing volunteer work.",
   "Many volunteers report that their work makes them feel good. Some volunteer work can even help with self-development. Helping someone is also to learn something new. And it can also help with your future.[[5]]"
  ],
  "options": [
   "A. It will be helpful for you to get a job after graduation because of your valuable work experience.",
   "B. Pick out something you show great interest in.",
   "C. If you want to enjoy being a teenager, there are many things you can do.",
   "D. Friendship is one of the greatest things that you can enjoy.",
   "E. School life can be hard, but it’s really important."
  ],
  "answers": {
   "1": "C",
   "2": "E",
   "3": "D",
   "4": "B",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Study hard at school / Make a few good friends. → 段落主旨",
    "observe": "根据下文“Study hard at school”“Make a few good friends. ”“Have your hobbies. ”和“Consider doing volunteer work.”可知，此处指想享受做一个青少年要做的事情，因此C项“如果你想享受做一个青少年，有很多事情你可以做。”符合题",
    "clue": "Study hard at school；Make a few good friends.；Have your hobbies.；Consider doing volunteer work.",
    "plain": "根据下文“Study hard at school”“Make a few good friends. ”“Have your hobbies. ”和“Consider doing volunteer work.”可知，此处指想享受做一个青少年要做的事情，因此C项“如果你想享受做一个青少年，有很多事情你可以做。”符合题意。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Study hard at school",
     "Make a few good friends.",
     "Have your hobbies."
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Study hard at school. → 代词指代",
    "observe": "根据上文“Study hard at school.”可知，此处指学校生活。因此E项“学校生活可能很艰苦，但它真的很重要。”符合题意。故选E。",
    "clue": "Study hard at school.",
    "plain": "根据上文“Study hard at school.”可知，此处指学校生活。因此E项“学校生活可能很艰苦，但它真的很重要。”符合题意。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Study hard at school."
    ]
   },
   "3": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Because good friends can make you feel good and bring out the best in you. → 上下文呼应",
    "observe": "根据上文“It is not necessary to know everyone at school, but you should try to make a few good friends.”可知，此处指交友的重要性，因此D项“友谊是你可以享受的最伟大的事情之一。”符合题意。故选D。",
    "clue": "Because good friends can make you feel good and bring out the best in you.",
    "plain": "根据上文“It is not necessary to know everyone at school, but you should try to make a few good friends.”可知，此处指交友的重要性，因此D项“友谊是你可以享受的最伟大的事情之一。”符合题意。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Because good friends can make you feel good and bring out the best in you."
    ]
   },
   "4": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "Have your hobbies. / Don’t be afraid to try new things. → 段落主旨",
    "observe": "根据上文“Have your hobbies.”和下文“Don’t be afraid to try new things.”可知，此处指和爱好相关的话题，因此B项“挑出你非常感兴趣的东西。”符合题意。故选B。",
    "clue": "Have your hobbies.；Don’t be afraid to try new things.",
    "plain": "根据上文“Have your hobbies.”和下文“Don’t be afraid to try new things.”可知，此处指和爱好相关的话题，因此B项“挑出你非常感兴趣的东西。”符合题意。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Have your hobbies.",
     "Don’t be afraid to try new things."
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Consider doing volunteer work. → 代词指代",
    "observe": "根据上文“Consider doing volunteer work.”可知，此处指志愿工作的意义，因此A项“这将有助于你毕业后找工作，因为你有宝贵的工作经验。”符合题意。故选A。",
    "clue": "Consider doing volunteer work.",
    "plain": "根据上文“Consider doing volunteer work.”可知，此处指志愿工作的意义，因此A项“这将有助于你毕业后找工作，因为你有宝贵的工作经验。”符合题意。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Consider doing volunteer work."
    ]
   }
  }
 },
 {
  "id": 137,
  "title": "宠物店里的双赢生意",
  "source": "2023-2024学年新疆乌鲁木齐九年级上学期期末",
  "range": "1—5",
  "passage": [
   "A new pet shop called Turtle Dove opened on First Street. It sold two kinds of animals. You must be interested in the store.[[1]]    , Bill and Bob. They moved here from the northern California, where they owned an ant farm store. That store was so successful that they sold it after four years and got a lot of money.",
   "They have traveled for a few years. Traveling through the state, they had their own thoughts. “We visited almost every zoo in the country,[[2]]     and partly because we were looking for support for our next business.” said Bill. They finally decided on turtles and doves (白鸽). “They’re easy to feed and care for,[[3]]    .” said Bob.",
   "The store will be open from 9 a.m. to 9 p.m. from Wednesday to Saturday. “We think those are hours that our customers will find very convenient. What’s more, the three days off gives us a chance to go into the woods and find more little animals.[[4]]    , we always try to collect them from the wild. That way our customers can save more money. Of course, by removing these animals from the nature, we protect them from being eaten by their nature enemies. So our customers are happy, our animals are happy,[[5]]    . It’s a win-win for all of us.”"
  ],
  "options": [
   "A. and we are happy",
   "B. We never buy our animals",
   "C. The owners are two brothers",
   "D. partly because we love animals",
   "E. and both animals live a long time"
  ],
  "answers": {
   "1": "C",
   "2": "D",
   "3": "E",
   "4": "B",
   "5": "A"
  },
  "analysis": {
   "1": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Bill and Bob → 上下文呼应",
    "observe": "根据下文“Bill and Bob”可知，空格处应介绍这两人的身份，选项C“所有者是两兄弟”符合语境，故选C。",
    "clue": "Bill and Bob",
    "plain": "根据下文“Bill and Bob”可知，空格处应介绍这两人的身份，选项C“所有者是两兄弟”符合语境，故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Bill and Bob"
    ]
   },
   "2": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "We visited almost every zoo in the country / and partly because we were looking for support for our next business → 因果关系",
    "observe": "根据上文“We visited almost every zoo in the country”和下文“and partly because we were looking for support for our next business”可知，空格处应说明Bill和Bob参观动物园的原因，选项D“部分原因是我们喜欢",
    "clue": "We visited almost every zoo in the country；and partly because we were looking for support for our next business",
    "plain": "根据上文“We visited almost every zoo in the country”和下文“and partly because we were looking for support for our next business”可知，空格处应说明Bill和Bob参观动物园的原因，选项D“部分原因是我们喜欢动物”符合语境，故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "We visited almost every zoo in the country",
     "and partly because we were looking for support for our next business"
    ]
   },
   "3": {
    "level": "第二级",
    "method": "因果关系突破",
    "chain": "They’re easy to feed and care for → 因果关系",
    "observe": "根据上文“They’re easy to feed and care for”可知，空格处应说明选择这两种动物的原因，选项E“而且这两种动物都活得很长”符合语境，故选E。",
    "clue": "They’re easy to feed and care for",
    "plain": "根据上文“They’re easy to feed and care for”可知，空格处应说明选择这两种动物的原因，选项E“而且这两种动物都活得很长”符合语境，故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "They’re easy to feed and care for"
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "we always try to collect them from the wild → 上下文呼应",
    "observe": "根据下文“we always try to collect them from the wild”可知，空格处应说明宠物店的动物不是买来的，选项B“我们从不买动物”符合语境，故选B。",
    "clue": "we always try to collect them from the wild",
    "plain": "根据下文“we always try to collect them from the wild”可知，空格处应说明宠物店的动物不是买来的，选项B“我们从不买动物”符合语境，故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "we always try to collect them from the wild"
    ]
   },
   "5": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "So our customers are happy, our animals are happy / It’s a win-win for all of us. → 上下文呼应",
    "observe": "根据上文“So our customers are happy, our animals are happy”和下文“It’s a win-win for all of us.”可知，空格处应表示他们两兄弟也很高兴，选项A“我们很高兴”符合语境，故选A。",
    "clue": "So our customers are happy, our animals are happy；It’s a win-win for all of us.",
    "plain": "根据上文“So our customers are happy, our animals are happy”和下文“It’s a win-win for all of us.”可知，空格处应表示他们两兄弟也很高兴，选项A“我们很高兴”符合语境，故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "So our customers are happy, our animals are happy",
     "It’s a win-win for all of us."
    ]
   }
  }
 },
 {
  "id": 138,
  "title": "阳光为什么能改善睡眠",
  "source": "2023-2024学年新疆维吾尔自治区克孜勒苏柯尔克孜自治州九年级上学期期末",
  "range": "1—5",
  "passage": [
   "Do you have a sleep problem?[[1]]     You may need to see more sunlight, especially in the morning, according to a study.",
   "A team of researchers from New York, US did the study, reported Yahoo News. The team did a study on 109 office workers across the US. Some of the workers saw lots of light during the morning hours, between 8 a.m. and lunchtime.[[2]]     They also fell asleep more quickly at night.",
   "[[3]]     Researchers say it helps us set our “body clock”. When there is less and less sunlight at the end of the day, our body starts to make melatonin (褪黑素). It makes us feel sleepy so that we know it’s time to go to bed.[[4]]     But during the day, sunlight tells our body to make less melatonin so that we can stay awake and do our work.",
   "Researchers suggest that we should see 15 minutes of sunlight in the morning.[[5]]"
  ],
  "options": [
   "A. Why is sunlight so important to our sleep?",
   "B. The researchers found that these workers had a better sleep than other workers.",
   "C. If you do, here is a simple way to help you improve your sleep.",
   "D. It can help balance the melatonin in our bodies.",
   "E. Our body makes the most melatonin at night."
  ],
  "answers": {
   "1": "C",
   "2": "B",
   "3": "A",
   "4": "E",
   "5": "D"
  },
  "analysis": {
   "1": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "Do you have a sleep problem? → 上下文呼应",
    "observe": "根据“Do you have a sleep problem?”可知要针对这个问题引出下文，C项“如果你有，这里有一个简单的方法可以帮助你改善睡眠。”符合语境。故选C。",
    "clue": "Do you have a sleep problem?",
    "plain": "根据“Do you have a sleep problem?”可知要针对这个问题引出下文，C项“如果你有，这里有一个简单的方法可以帮助你改善睡眠。”符合语境。故选C。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Do you have a sleep problem?"
    ]
   },
   "2": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "researchers / workers → 代词指代",
    "observe": "根据“Some of the workers saw lots of light during the morning hours, between 8 a.m. and lunchtime.”可知要讲这些工人的睡眠质量如何，B项“研究人员发现，这些工人比其他工人睡眠质量更好。”符合语境。故选B。",
    "clue": "researchers；workers",
    "plain": "根据“Some of the workers saw lots of light during the morning hours, between 8 a.m. and lunchtime.”可知要讲这些工人的睡眠质量如何，B项“研究人员发现，这些工人比其他工人睡眠质量更好。”符合语境。故选B。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "researchers",
     "workers"
    ]
   },
   "3": {
    "level": "第一级",
    "method": "段落主旨突破",
    "chain": "sunlight / sleep → 段落主旨",
    "observe": "根据“Researchers say it helps us set our ‘body clock’.”可知此处讲阳光对我们身体的作用，A项“为什么阳光对我们的睡眠如此重要？”符合语境。故选A。",
    "clue": "sunlight；sleep",
    "plain": "根据“Researchers say it helps us set our ‘body clock’.”可知此处讲阳光对我们身体的作用，A项“为什么阳光对我们的睡眠如此重要？”符合语境。故选A。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "sunlight",
     "sleep"
    ]
   },
   "4": {
    "level": "第三级",
    "method": "上下文呼应突破",
    "chain": "body / makes → 上下文呼应",
    "observe": "根据“But during the day, sunlight tells our body to make less melatonin so that we can stay awake and do our work.”可知夜里分泌的褪黑素多于白天，E项“我们的身体在晚上分泌的褪黑素最多。”符合语境。故选E。",
    "clue": "body；makes",
    "plain": "根据“But during the day, sunlight tells our body to make less melatonin so that we can stay awake and do our work.”可知夜里分泌的褪黑素多于白天，E项“我们的身体在晚上分泌的褪黑素最多。”符合语境。故选E。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "body",
     "makes"
    ]
   },
   "5": {
    "level": "第一级",
    "method": "代词指代突破",
    "chain": "Researchers suggest that we should see 15 minutes of sunlight in the morning. → 代词指代",
    "observe": "根据“Researchers suggest that we should see 15 minutes of sunlight in the morning.”可知要讲看15分钟阳光的作用，D项“它可以帮助平衡我们体内的褪黑素。”符合语境。故选D。",
    "clue": "Researchers suggest that we should see 15 minutes of sunlight in the morning.",
    "plain": "根据“Researchers suggest that we should see 15 minutes of sunlight in the morning.”可知要讲看15分钟阳光的作用，D项“它可以帮助平衡我们体内的褪黑素。”符合语境。故选D。",
    "exclude": "其余选项在指代对象、复现词或前后逻辑上至少有一处接不上。",
    "highlightTerms": [
     "Researchers suggest that we should see 15 minutes of sunlight in the morning."
    ]
   }
  }
 }
];
})();
