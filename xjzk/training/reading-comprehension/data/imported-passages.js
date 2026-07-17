(function () {
  const source2026 = "2026年新疆中考英语真题";
  const legacyIds = new Set(["A", "B", "C", "D"]);
  for (let i = passages.length - 1; i >= 0; i -= 1) {
    if (legacyIds.has(passages[i].id)) passages.splice(i, 1);
  }
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
    {
      id: "2026真题C",
      title: "C. Let Tears Drop When You Feel Down",
      meta: `${source2026} · C 篇 · 四选一`,
      paragraphs: [
        "Many people used to believe that crying means weakness, especially for men. However, holding back tears can harm our bodies, while sometimes crying actually helps us relax and stay healthy.",
        "Scientists did a research on tears. At first, they asked volunteers to watch a sad movie and collected their tears. Secondly, they made the same people cry by cutting onions. The results were very different. Tears from sadness can take away harmful chemicals. If the chemicals stay in our bodies for too long, they may cause heart and blood problems. But tears from cutting onions can't.",
        "More studies show that crying also creates another helpful chemical. This chemical helps wounds heal faster. In fact, the more a person cries after getting hurt, the sooner he or she will recover. So crying is not that bad. It is natural medicine for our bodies.",
        "Anybody may meet difficulties or feel sad from time to time. We do not need to pretend to be strong. Remember that people who allow themselves to cry are healthier.",
        "So, just let tears drop when you feel down!"
      ],
      questions: [
        q(46, "Scientists made the volunteers cry in the second research by", ["A. cutting onions", "B. reading a book", "C. watching a sad movie", "D. listening to music"], "A", ["second research", "volunteers", "cry"], "Secondly, they made the same people cry by cutting onions.", "second research 是顺序定位词，cutting onions 是答案原词。", ["A：cutting onions 与原文完全一致。", "B/C/D：不是第二次实验的方法。"], "第二次实验中科学家让同一批人切洋葱流泪，所以选 A。"),
        q(47, "What does the underlined word “recover” in Paragraph 3 mean?", ["A. Get worse.", "B. Get hurt.", "C. Get better.", "D. Get excited."], "C", ["recover", "Paragraph 3"], "the sooner he or she will recover", "recover 前面说 wounds heal faster，说明是恢复、变好。", ["A/B：与 heal faster 相反。", "C：Get better 与 recover 同义。", "D：语境无依据。"], "recover 在语境中表示伤口恢复，人变好。"),
        q(48, "Which of the following statements is TRUE according to the passage?", ["A. Tears can always be good for eyes.", "B. Tears from onions have harmful chemicals.", "C. Crying is always bad.", "D. Crying when you are sad is good for health."], "D", ["TRUE", "according to the passage"], "people who allow themselves to cry are healthier", "TRUE 题要逐项排除，sad tears can take away harmful chemicals 是核心依据。", ["A：always 过于绝对。", "B：原文说 sadness tears can take away harmful chemicals，onion tears can't。", "C：与 So crying is not that bad 相反。", "D：sad 时哭有助健康，符合全文。"], "文章说明悲伤时哭有助放松和健康，所以选 D。"),
        q(49, "What is the best title for the passage?", ["A. Protecting Eyes Is Important", "B. Hiding Feelings Is Necessary", "C. Let Tears Drop When You Feel Down", "D. Sleeping Is Relaxing"], "C", ["best title", "passage"], "So, just let tears drop when you feel down!", "标题题看首尾和全文中心，尾句直接点题。", ["A：只提眼睛，偏离主题。", "B：与文章观点相反。", "C：覆盖全文并呼应尾句。", "D：原文没有讨论睡眠。"], "全文围绕哭的好处展开，尾句点题，因此 C 最合适。")
      ]
    },
    {
      id: "2026真题D",
      title: "D. The Development of Books in China",
      meta: `${source2026} · D 篇 · 四选一`,
      paragraphs: [
        "When you hold a beautiful modern book, do you know how it slowly developed from ancient books?",
        "Over 3,000 years ago in ancient China, people carved words on turtle shells and animal bones for predicting the future. These were the earliest books.",
        "Before paper was invented, bamboo slips and silk were widely used. They greatly influenced later book styles and writing rules. Even today, many rules of writing and book design still follow old traditions from that time.",
        "When paper first appeared, it did not take the place of bamboo and silk at once. As paper-making skills improved, paper slowly became the main writing material. Ancient people often colored paper to protect it from insects and keep it lasting long. Many old paper books have been kept well for over a thousand years.",
        "From shells and bones to bamboo and silk to paper, the development of books in China records rich history and culture. It truly shows the great wisdom and creativity of ancient Chinese people."
      ],
      questions: [
        q(50, "What were the earliest books in ancient China made of?", ["A. Bamboo slips and silk.", "B. Turtle shells and animal bones.", "C. Silk and animal bones.", "D. Silk and paper."], "B", ["earliest books", "made of"], "people carved words on turtle shells and animal bones for predicting the future. These were the earliest books.", "earliest books 是定位词，These 指代 turtle shells and animal bones。", ["A：是纸出现前广泛使用的材料，不是最早。", "B：turtle shells and animal bones 与原文一致。", "C/D：材料混搭，信息不完整或错误。"], "原文明确说龟壳和兽骨是最早的书。"),
        q(51, "Why did ancient people often color the paper?", ["A. To make the books beautiful.", "B. To influence later book styles.", "C. To keep the paper well.", "D. To take the place of silk quickly."], "C", ["Why", "color the paper"], "Ancient people often colored paper to protect it from insects and keep it lasting long.", "why 问原因，to protect / keep 是答案依据。", ["A：beautiful 无依据。", "B：influence later book styles 对应 bamboo slips and silk。", "C：keep the paper well 是 protect it and keep it lasting long 的同义概括。", "D：与 did not take the place at once 不符。"], "染纸是为了防虫并长期保存。"),
        Object.assign(q(52, "Which is the best structure of the passage?", ["A. ① / ②③④ / ⑤", "B. ①② / ③④⑤", "C. ① / ② / ③ / ④ / ⑤", "D. ① / ②③ / ④⑤"], "A", ["best structure", "passage"], "From shells and bones to bamboo and silk to paper, the development of books in China records rich history and culture.", "结构题要看段落功能：①引入问题，②③④按材料发展展开，⑤总结升华。", ["A：①引入，②③④主体发展，⑤总结，结构最准确。", "B/C/D：层次划分不符合文章结构。"], "文章是总起—发展过程—总结升华，所以选 A。"), { image: "assets/2026-xinjiang-d-q52-structure.svg" }),
        q(53, "Where does the passage probably come from?", ["A. A history book.", "B. A movie poster.", "C. A novel.", "D. A fashion magazine."], "A", ["Where", "come from"], "the development of books in China records rich history and culture", "出处题看主题和文体，history and culture 是核心。", ["A：文章介绍中国书籍材料发展史，符合 history book。", "B/C/D：海报、小说、时尚杂志均不符合。"], "文章讲古代书籍发展和历史文化，最可能来自历史书。")
      ]
    },
    ]);
})();

(function () {
  const sourceGX = "2026年乌鲁木齐市高新区（新市区）九年级适应性测试英语";
  const sourceSMG = "2026年乌鲁木齐市水磨沟区九年级适应性测试英语";
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
    {
      id: "高新区新市区适应A",
      title: "A. The Fox and the Grapes",
      meta: `${sourceGX} · A 篇 · 判断正误`,
      paragraphs: [
        "A fox was once very hungry and looked for some food everywhere. But he couldn't find anything that he could eat. Finally, he couldn't stand the hunger anymore and came to a farmer's wall.",
        "The fox saw the big and juicy grapes on the top of the wall. He had never seen such delicious grapes before. The rich purple color told the fox that they were ready to be eaten. The fox jumped high in the air to catch the grapes in his mouth, but he missed. He tried again and missed again. He tried a few more times but missed each time. Finally, the fox decided to go home and said to himself, \"I'm sure the grapes are sour anyway.\"",
        "The fox looked back at those juicy grapes and walked away with an empty stomach. In fact, he knew he might be wrong, but he just didn't want to face that."
      ],
      questions: [
        q(36, "The hungry fox found nothing to eat at first.", ["T", "F"], "T", ["hungry fox", "nothing", "at first"], "he couldn't find anything that he could eat", "nothing to eat 对应 couldn't find anything that he could eat。", ["T：与原文一致。", "F：忽略了 couldn't find anything。"], "狐狸一开始找不到任何能吃的东西。"),
        q(37, "The farmer felt very hungry.", ["T", "F"], "F", ["farmer", "hungry"], "A fox was once very hungry", "hungry 修饰 fox，不是 farmer。", ["T：把 hungry 的对象错看成 farmer。", "F：原文说狐狸饿。"], "饥饿的是狐狸，不是农民。"),
        q(38, "The fox saw some big and juicy apples on the wall.", ["T", "F"], "F", ["big and juicy", "apples", "wall"], "The fox saw the big and juicy grapes on the top of the wall", "apples 是偷换，原文是 grapes。", ["T：把 grapes 看成 apples。", "F：原文是葡萄。"], "题干把 grapes 偷换成 apples。"),
        q(39, "The fox failed to catch any grapes after trying for several times.", ["T", "F"], "T", ["failed", "catch", "several times"], "He tried a few more times but missed each time", "missed each time 与 failed to catch 同义。", ["T：与原文一致。", "F：忽略了 missed each time。"], "狐狸试了几次都没抓到葡萄。"),
        q(40, "The grapes were very sour.", ["T", "F"], "F", ["grapes", "sour"], "he knew he might be wrong, but he just didn't want to face that", "sour 是狐狸自我安慰，不是事实。", ["T：误把狐狸的话当事实。", "F：原文说明他可能错了，只是不愿面对。"], "葡萄并不一定酸，这是狐狸失败后的借口。")
      ]
    },
    {
      id: "高新区新市区适应B",
      title: "B. Four Famous Chinese Dishes",
      meta: `${sourceGX} · B 篇 · 四选一`,
      chart: {
        title: "Four Famous Chinese Dishes",
        columns: ["Dish", "Information"],
        rows: [
          ["Beijing Roast Duck", "It was called roast duck in the Tang Dynasty. It became popular in the Ming Dynasty and the emperor liked it a lot. When the capital moved to Beijing, it spread and got its name."],
          ["Lanzhou Lamian", "It is a famous Chinese noodle dish. The noodles are made by stretching dough by hand into thin pieces. It started in the Qing Dynasty and was brought to Lanzhou by a cook from Henan Province."],
          ["Chongqing Hot Pot", "It is a famous spicy dish throughout the country. Chongqing held hot pot festivals to help the local economy. The hot pot industry not only shares Chinese culture but also helps tourism."],
          ["Roujiamo", "It is a popular street snack from Xi'an. The meat is cooked with over 20 spices for hours, giving it a special taste. A visit to Xi'an is not complete without trying this tasty snack."]
        ],
        note: "Chinese food is loved by people all over the world. Here are four famous Chinese dishes."
      },
      paragraphs: [
        "Chinese food is loved by people all over the world. Here are four famous Chinese dishes. If you come to China, just try them.",
        "Beijing Roast Duck. It was called roast duck in the Tang Dynasty. It became popular in the Ming Dynasty and the emperor liked it a lot. When the capital moved to Beijing, it spread and got its name.",
        "Lanzhou Lamian. It is a famous Chinese noodle dish. The noodles are made by stretching dough by hand into thin pieces. It started in the Qing Dynasty and was brought to Lanzhou by a cook from Henan Province.",
        "Chongqing Hot Pot. It is a famous spicy dish throughout the country. Chongqing held hot pot festivals to help the local economy. The hot pot industry not only shares Chinese culture but also helps tourism.",
        "Roujiamo. It is a popular street snack from Xi'an. The meat is cooked with over 20 spices for hours, giving it a special taste. A visit to Xi'an is not complete without trying this tasty snack."
      ],
      questions: [
        q(41, "In which dynasty was Beijing Roast Duck loved by the emperor?", ["A. In the Tang Dynasty.", "B. In the Yuan Dynasty.", "C. In the Ming Dynasty.", "D. In the Qing Dynasty."], "C", ["Beijing Roast Duck", "emperor", "dynasty"], "It became popular in the Ming Dynasty and the emperor liked it a lot", "emperor 和 dynasty 定位到北京烤鸭信息。", ["C：Ming Dynasty 与原文一致。", "A/B/D：朝代错误。"], "北京烤鸭在明朝流行，皇帝很喜欢。"),
        q(42, "The underlined word “stretching” probably means “________”.", ["A. boiling", "B. cutting", "C. pulling", "D. peeling"], "C", ["stretching", "means"], "The noodles are made by stretching dough by hand into thin pieces", "stretching dough by hand 指用手拉面。", ["C：pulling 与 stretching 同义。", "A/B/D：语义不符。"], "兰州拉面的面条是把面团拉成细条。"),
        q(43, "Why did Chongqing hold the hot pot festival?", ["A. To help the local economy.", "B. To celebrate a holiday.", "C. To teach cooking skills.", "D. To introduce new dishes."], "A", ["Why", "Chongqing", "hot pot festival"], "Chongqing held hot pot festivals to help the local economy", "why 问原因，to help the local economy 是原文答案。", ["A：与原文一致。", "B/C/D：无依据。"], "重庆举办火锅节是为了帮助当地经济。"),
        q(44, "What is special about the meat in Roujiamo?", ["A. It is fried quickly.", "B. It is cooked with many spices.", "C. It is served cold.", "D. It is made with a few spices."], "B", ["special", "meat", "Roujiamo"], "The meat is cooked with over 20 spices for hours", "over 20 spices 对应 many spices。", ["B：many spices 是 over 20 spices 的概括。", "A/C/D：与原文不符。"], "肉夹馍的肉用二十多种香料长时间烹制。"),
        q(45, "Where is the text probably from?", ["A. A science report.", "B. A travel guide.", "C. A history textbook.", "D. A shopping list."], "B", ["Where", "probably from"], "If you come to China, just try them.", "文章介绍来中国可品尝的名菜，符合旅行指南。", ["B：travel guide 最符合。", "A/C/D：文体不符。"], "材料推荐中国名菜，更像旅行指南。")
      ]
    },
    {
      id: "高新区新市区适应C",
      title: "C. One PE Class Each Day",
      meta: `${sourceGX} · C 篇 · 四选一`,
      paragraphs: [
        "Students in China now have more PE classes because of a new rule. Shenzhen started a \"one PE class each day\" program in 2024. After one year, fewer students had vision problems, and their health improved. Other areas like Beijing, Hunan, and Sichuan also started similar rules. These rules help students play more and stay healthier. A 2024 report said vision problems, being overweight and spine problems are big health worries. Mental health problems like feeling worried or sad are also increasing.",
        "Students and parents like the rule. A student said, \"My favorite class is PE!\" Parents think exercise makes their children healthier and happier.",
        "However, some schools face problems. They don't have enough PE teachers or big playgrounds. To deal with this, China is training more teachers and inviting retired coaches to help. In Shenzhen, students can even use nearby parks for PE classes. During holidays, school playgrounds are open to everyone."
      ],
      questions: [
        q(46, "What is the name of the program started in Shenzhen in 2024?", ["A. One PE class each day.", "B. One sports game each day.", "C. One healthy meal each day.", "D. One vision test each day."], "A", ["program", "Shenzhen", "2024"], "Shenzhen started a \"one PE class each day\" program in 2024", "program 名称直接复现。", ["A：与原文一致。", "B/C/D：名称错误。"], "深圳启动的是“每天一节体育课”项目。"),
        q(47, "Why are fewer students in Shenzhen wearing glasses?", ["A. Because they have more homework.", "B. Because they eat healthier food.", "C. Because they have more PE classes.", "D. Because they use fewer computers."], "C", ["Why", "fewer", "glasses"], "Students in China now have more PE classes... fewer students had vision problems", "glasses 对应 vision problems，原因是 more PE classes。", ["C：与上下文因果一致。", "A/B/D：无依据。"], "更多体育课后视力问题减少。"),
        q(48, "What health problem is NOT mentioned in the 2024 report?", ["A. Vision problems.", "B. Colds and fevers.", "C. Being overweight.", "D. Spine problems."], "B", ["NOT mentioned", "2024 report"], "A 2024 report said vision problems, being overweight and spine problems are big health worries", "NOT mentioned 要排除原文列出的三项。", ["B：colds and fevers 未提到。", "A/C/D：原文均提到。"], "报告提到视力、超重和脊柱问题，没有提感冒发烧。"),
        q(49, "What do parents think about the “one PE class each day” rule?", ["A. It makes their children tired.", "B. It is useful for students’ grades.", "C. It takes up too much study time.", "D. It helps their children become healthier."], "D", ["parents", "think", "rule"], "Parents think exercise makes their children healthier and happier", "parents think 是定位点。", ["D：healthier 与原文一致。", "A/B/C：无依据。"], "家长认为运动让孩子更健康快乐。")
      ]
    },
    {
      id: "高新区新市区适应D",
      title: "D. DeepSeek",
      meta: `${sourceGX} · D 篇 · 四选一`,
      paragraphs: [
        "DeepSeek is a Chinese technology company that uses smart computers to help people. This smart AI model can do many things. It can learn and solve problems. It can even chat like humans. DeepSeek's main goal is to make life easier and better for everyone.",
        "One important part of DeepSeek's work is dealing with data. In hospitals, DeepSeek helps doctors find illnesses easier and faster. In schools, it helps teachers make students have more fun in learning.",
        "DeepSeek also works on languages. Its computers can read and write in English, Chinese, and other languages. This helps people talk to machines easily. For example, if you ask DeepSeek a question, it can answer you quickly.",
        "However, DeepSeek is not perfect yet. It has its problem. The company now is trying to make it safer than other AI models. As we know, AI sometimes may make mistakes or hurt people. As for most AI users, they think the safety of private information always comes first.",
        "In the future, DeepSeek hopes to make more changes. They want AI to help with climate change, traffic problems, and other big challenges. DeepSeek's dream is to build a world where technology and humans work together for a better future."
      ],
      questions: [
        q(50, "What is DeepSeek’s main goal?", ["A. To make more changes.", "B. To make life easier and better.", "C. To deal with data.", "D. To teach students languages."], "B", ["DeepSeek", "main goal"], "DeepSeek's main goal is to make life easier and better for everyone", "main goal 后直接给答案。", ["B：与原文一致。", "A/C/D：只是局部功能或愿望。"], "DeepSeek 的主要目标是让生活更轻松更美好。"),
        q(51, "How does DeepSeek help doctors?", ["A. By cleaning hospitals.", "B. By making new medicine.", "C. By becoming a doctor.", "D. By finding illnesses more quickly."], "D", ["How", "help doctors"], "DeepSeek helps doctors find illnesses easier and faster", "find illnesses easier and faster 对应 more quickly。", ["D：与原文一致。", "A/B/C：无依据。"], "DeepSeek 帮助医生更快发现疾病。"),
        q(52, "Why is DeepSeek safer for its users?", ["A. Because it can speak many languages.", "B. Because it can solve all kinds of problems.", "C. Because it can make more changes for the world.", "D. Because it can protect people’s private information."], "D", ["safer", "users"], "the safety of private information always comes first", "safer 和 users 定位到 private information safety。", ["D：与隐私安全对应。", "A/B/C：不是安全原因。"], "用户最关心私人信息安全。"),
        q(53, "What’s the main idea of the passage?", ["A. DeepSeek is safe.", "B. DeepSeek can learn like humans.", "C. DeepSeek aims to make a better life.", "D. DeepSeek helps teachers in school."], "C", ["main idea", "passage"], "DeepSeek's main goal is to make life easier and better for everyone", "主旨看首段目标和尾段愿景。", ["C：覆盖全文。", "A/B/D：只涵盖局部。"], "文章整体介绍 DeepSeek 帮助人们、让生活更好的目标。")
      ]
    },
    {
      id: "水磨沟区适应A",
      title: "A. Robots in Daily Life",
      meta: `${sourceSMG} · A 篇 · 判断正误`,
      paragraphs: [
        "Robots are becoming more useful in our daily life. For example, some robots can clean the floor, help carry heavy things or even deliver food in restaurants. These robots are made to follow easy orders. They use sensors to avoid hitting walls or people. A popular home robot called \"Helper Bot\" can sweep floors, play music, and remind people to drink water and so on.",
        "Moreover, in modern hospitals, there are robots that can help doctors in simple operations and move medical tools. They make the whole medical process more efficient. Scientists say robots will do more tasks in the future, especially for the elderly and people with disabilities. They can be used to help the elderly with daily activities like getting dressed or taking medicines. However, robots still need humans to control or repair them. Without humans' help, robots might meet problems they can't solve on their own."
      ],
      questions: [
        q(36, "Robots only clean the floor and deliver food.", ["T", "F"], "F", ["only", "clean", "deliver food"], "some robots can clean the floor, help carry heavy things or even deliver food", "only 是绝对化错误，原文还提到 carry heavy things。", ["T：忽略了 only 与更多功能冲突。", "F：机器人功能不止两项。"], "机器人还可以搬重物等，不只是清洁和送餐。"),
        q(37, "“Helper Bot” can play music but cannot sweep floors.", ["T", "F"], "F", ["Helper Bot", "play music", "cannot sweep floors"], "Helper Bot can sweep floors, play music, and remind people to drink water", "cannot sweep floors 与 can sweep floors 相反。", ["T：与原文相反。", "F：Helper Bot 可以扫地。"], "Helper Bot 能扫地、播放音乐并提醒喝水。"),
        q(38, "Robots use sensors to move safely around rooms.", ["T", "F"], "T", ["sensors", "move safely"], "They use sensors to avoid hitting walls or people", "avoid hitting walls or people 表示安全移动。", ["T：与原文一致。", "F：忽略 sensors 的作用。"], "机器人用传感器避免碰撞。"),
        q(39, "Robots are especially designed to help the elderly and disabled people in modern hospitals.", ["T", "F"], "F", ["especially", "elderly", "disabled", "modern hospitals"], "robots will do more tasks in the future, especially for the elderly and people with disabilities", "especially 对应未来更多任务，不是在现代医院专门设计。", ["T：把 future tasks 和 hospitals 混在一起。", "F：原文没有说现代医院机器人专门为老人和残障人士设计。"], "医院机器人帮助医生；未来更多任务尤其面向老人和残障人士。"),
        q(40, "Humans are not needed to control robots anymore.", ["T", "F"], "F", ["Humans", "not needed", "control"], "robots still need humans to control or repair them", "not needed 与 still need 相反。", ["T：与原文相反。", "F：机器人仍需要人类控制或维修。"], "机器人仍然需要人类控制和维修。")
      ]
    },
    {
      id: "水磨沟区适应B",
      title: "B. Three Ancient Engineering Projects in China",
      meta: `${sourceSMG} · B 篇 · 四选一`,
      chart: {
        title: "The Three Main Ancient Engineering Projects in China",
        columns: ["Name", "Information"],
        rows: [
          ["The Great Wall", "Location: Across northern China. Built over centuries, it's a long wall stretching thousands of miles. At first, it was used to stop enemies. Now it's a well-known place that many people from all over the world come to visit. It's a symbol of China."],
          ["The Beijing-Hangzhou Grand Canal", "Location: Runs between Beijing and Hangzhou. Built a long time ago, it's the world's longest man-made river. It helps with moving things and trading between the north and the south. It also promotes cultural exchange between the north and the south."],
          ["Karez Wells", "Main location: Turpan, Xinjiang. These are special water-way systems in Xinjiang, China. They carry water from mountains to fields, helping people in Xinjiang water their crops and live. It has played an important role in ancient agriculture and local people's lives. It is still widely used today."]
        ],
        note: "These wonders show the smarts and creativity of ancient Chinese people and have an important place in the world's cultural heritage."
      },
      paragraphs: [
        "The three main ancient engineering projects in China.",
        "The Great Wall is located across northern China. At first, it was used to stop enemies.",
        "The Beijing-Hangzhou Grand Canal runs between Beijing and Hangzhou. It is the world's longest man-made river. It helps with moving things and trading between the north and the south.",
        "Karez Wells are mainly located in Turpan, Xinjiang. They are special water-way systems in Xinjiang.",
        "These wonders not only show the smarts and creativity of ancient Chinese people, but also have an important place in the world's cultural heritage."
      ],
      questions: [
        q(41, "What was the use of the Great Wall at first?", ["A. To carry water.", "B. To stop enemies.", "C. For trading.", "D. For cultural exchange."], "B", ["Great Wall", "at first", "use"], "At first, it was used to stop enemies", "at first 和 Great Wall 定位。", ["B：与原文一致。", "A/C/D：对应其他工程或无关信息。"], "长城最初用于抵御敌人。"),
        q(42, "What can the Beijing-Hangzhou Grand Canal help with?", ["A. Stopping enemies from coming.", "B. Protecting the local environment.", "C. Carrying water from mountains to cities.", "D. Moving things and trading between the north and the south."], "D", ["Grand Canal", "help with"], "It helps with moving things and trading between the north and the south", "help with 后直接给答案。", ["D：与原文一致。", "A/C：对应长城或坎儿井。", "B：无依据。"], "大运河帮助南北运输和贸易。"),
        q(43, "What is special about the Beijing-Hangzhou Grand Canal?", ["A. It's the world's longest man-made river.", "B. It's the world's longest natural river.", "C. It's a special water-way system.", "D. It's a long wall stretching thousands of miles."], "A", ["special", "Grand Canal"], "it's the world's longest man-made river", "special 定位到 longest man-made river。", ["A：与原文一致。", "B/C/D：信息错误或对应其他工程。"], "京杭大运河是世界最长的人工河。"),
        q(44, "Where are the Karez Wells mainly located?", ["A. Across northern China.", "B. Runs between Beijing and Hangzhou.", "C. Turpan, Xinjiang.", "D. In the south of China."], "C", ["Karez Wells", "located"], "Main location: Turpan, Xinjiang", "location 直接定位。", ["C：与原文一致。", "A/B/D：地点错误。"], "坎儿井主要位于新疆吐鲁番。"),
        q(45, "What do these three ancient engineering projects have in common?", ["A. They all promote trading.", "B. They are all used for carrying water.", "C. They are all located in the north of China.", "D. They all show the wisdom of ancient Chinese people."], "D", ["in common", "three", "projects"], "These wonders not only show the smarts and creativity of ancient Chinese people", "共同点看总结句。", ["D：wisdom 对应 smarts and creativity。", "A/B/C：只适用于部分工程或错误。"], "三项工程都体现古代中国人的智慧。")
      ]
    },
    {
      id: "水磨沟区适应C",
      title: "C. A New Hide-and-Seek Game",
      meta: `${sourceSMG} · C 篇 · 四选一`,
      paragraphs: [
        "A new game is popular with young people. Tens or even hundreds of people come together, choose to be \"cats\" or \"mice\". They share locations on their phones and then play hide-and-seek in a big open-air space.",
        "Young people think that this game not only gets people to exercise but also throws them into the joys of childhood memories. It helps with stress and turns running into a fun social game.",
        "Last month, I went to experience the activity with Peter at the Olympic Forest Park in Beijing. There were around 30 people. Most of us didn't know each other. The game had two rounds. In the first round, five people were \"cats\" and the rest were \"mice\". With five minutes for \"mice\" to run and hide, the \"cats\" found them using the locations they shared on a map APP. The second round was a group competition.",
        "It turned out to be a joyful experience for me. The use of GPS made this childhood game much more fun. It was a creative way of bringing something new to old games with technology. Also, it's a good way to meet new people and even make friends. For people who never do sports, it is a good way for them to move."
      ],
      questions: [
        q(46, "How many people were “cats” in the first round of the game in the passage?", ["A. 5.", "B. 10.", "C. 20.", "D. 30."], "A", ["How many", "cats", "first round"], "In the first round, five people were \"cats\"", "first round 和 cats 直接定位。", ["A：与原文一致。", "B/C/D：数量错误。"], "第一轮有五个人当“猫”。"),
        q(47, "Where did the writer experience the game?", ["A. In a shopping mall.", "B. At a friend's house.", "C. In a school playground.", "D. At the Olympic Forest Park in Beijing."], "D", ["Where", "writer", "experience"], "I went to experience the activity with Peter at the Olympic Forest Park in Beijing", "where 问地点，答案原词复现。", ["D：与原文一致。", "A/B/C：无依据。"], "作者在北京奥林匹克森林公园体验了游戏。"),
        q(48, "What does the author think about the use of GPS in the game?", ["A. It makes the game less fun.", "B. It is too difficult for players.", "C. It adds creativity to the old game.", "D. It is not necessary for the game."], "C", ["GPS", "think"], "It was a creative way of bringing something new to old games with technology", "GPS 对应 technology，creative 是关键。", ["C：与原文一致。", "A/B/D：与原文态度相反或无依据。"], "作者认为 GPS 让老游戏更有创意。"),
        q(49, "What is one advantage of playing this game in the text?", ["A. It helps people win prizes.", "B. It teaches people how to dance.", "C. It makes people more competitive.", "D. It allows people to meet new friends."], "D", ["advantage", "game"], "it's a good way to meet new people and even make friends", "advantage 定位到 make friends。", ["D：与原文一致。", "A/B/C：无依据。"], "这个游戏能帮助人们认识新朋友。")
      ]
    },
    {
      id: "水磨沟区适应D",
      title: "D. Drinking Hot Water",
      meta: `${sourceSMG} · D 篇 · 四选一`,
      paragraphs: [
        "\"Can I have a glass of hot water?\" This is a very common question in a restaurant. For many Chinese people, nothing is more common than drinking hot water every day. However, the simple habit is like a mystery to people from other countries.",
        "For many westerners, the idea of drinking hot water is very strange. However, most Chinese people think the Americans' habit of drinking ice water is also strange and even unhealthy. Some old people take a tea kettle when they travel. Chinese doctors are encouraging more people to take on the habit of drinking hot water, especially for women.",
        "But in Western countries, drinking hot water isn't common. Westerners often have drinks with ice, not just on hot days, but almost every day.",
        "There is a story online about a British man, who has been in Beijing for over five years. He visited a local cafe when going back to England. He asked for a glass of hot water in a British accent. But this request surprised the waitress, \"To... to... to drink?\" she doubted. Finally, the man received the hot water but felt cold stares from every corner of the cafe.",
        "Westerners wonder why Chinese people drink hot water as Chinese are wondering why Westerners drink cold water. This cultural difference is not a simple problem, but related to history, culture and science.",
        "In fact, many teenagers now depend on bottled water for daily drinking. With the younger generation growing up, will drinking hot water become a less popular life habit? Who knows?"
      ],
      questions: [
        q(50, "What do most Chinese think of drinking icy water from the passage?", ["A. Normal and healthy.", "B. Strange but healthy.", "C. Normal but unhealthy.", "D. Strange and unhealthy."], "D", ["most Chinese", "icy water"], "most Chinese people think the Americans' habit of drinking ice water is also strange and even unhealthy", "icy water 对应 ice water。", ["D：strange and unhealthy 与原文一致。", "A/B/C：信息不完整或错误。"], "多数中国人觉得喝冰水奇怪且不健康。"),
        q(51, "Who are especially advised to drink hot water by Chinese doctors?", ["A. Westerners.", "B. Teenagers.", "C. Women.", "D. The elderly."], "C", ["especially", "Chinese doctors"], "Chinese doctors are encouraging more people to take on the habit of drinking hot water, especially for women", "especially for women 直接给答案。", ["C：与原文一致。", "A/B/D：对象错误。"], "中国医生尤其建议女性喝热水。"),
        q(52, "What’s the meaning of the underlined part in the fourth paragraph?", ["A. Other people in the restaurant were angry at the man's request.", "B. Other people in the restaurant laughed at the man.", "C. Other people in the restaurant thought the man's request was strange.", "D. Other people in the restaurant were interested in the man's request."], "C", ["underlined", "cold stares"], "this request surprised the waitress", "cold stares 结合 waitress surprised，说明别人觉得请求奇怪。", ["C：符合语境。", "A/B/D：语气过重或不准确。"], "别人用异样眼光看他，是因为觉得要热水很奇怪。"),
        q(53, "What can we learn from the text?", ["A. Drinking hot water is very good for health.", "B. Drinking cold water is very harmful to health.", "C. More and more people will take a tea kettle for daily drinking.", "D. Different drinking habits are probably related to different countries."], "D", ["learn", "text"], "This cultural difference is not a simple problem, but related to history, culture and science", "learn from text 要看主旨句。", ["D：概括不同国家饮水习惯差异。", "A/B：过于绝对。", "C：无依据。"], "文章说明不同饮水习惯与国家文化等因素有关。")
      ]
    }
  ]);
})();

(function () {
  const sourceSZ = "2026年乌鲁木齐第十三中5月中考模拟";
  const sourceJK = "2026年乌鲁木齐经开区5月中考模拟";
  const sourceXS = "2026年乌鲁木齐市新市区5月中考模拟";
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => { if (!existing.has(item.id)) passages.push(item); });
    renderAll();
  };

  add([
    {
      id: "十三中模拟A",
      title: "A. The Ink Brush",
      meta: `${sourceSZ} · A 篇 · 判断正误`,
      paragraphs: [
        "The ink brush is a traditional tool for writing and painting in ancient China. It's also one of the “Four Treasures of the Chinese Study”. The earliest ink brush was found more than 2,500 years ago.",
        "The Han Dynasty (202 BC-220 AD) is an important period for the development of the ink brush, and it is also the time when Cai Lun improved the paper-making method. People began to widely use ink brushes at that time. Meanwhile, the first book on how to produce ink brushes came out.",
        "In the Yuan and Ming Dynasties, many ink brush experts got together in Huzhou of Zhejiang province and the brush-producing industry developed rapidly. Huzhou has been the center of brush making since the Qing Dynasty. Ink brushes produced there, called the Hubi, are the best known.",
        "The ink brush is made up of the stalk and the nib. The stalk is usually made of bamboo, wood or other valuable materials. The nib is made of fine, soft animal hair including three main kinds: rabbit's hair, wool and weasel's hair. People often call these nibs tuhao, yanghao, and langhao in Chinese.",
        "The ink brush is made in three sizes: big, medium or small. Most works of calligraphy are written with a medium-sized brush. Usually, painters and calligraphers have several kinds of brushes on hand to meet personal purposes and preferences."
      ],
      questions: [
        q(36, "Ink brushes became popular in the Han Dynasty.", ["T", "F"], "T", ["Han Dynasty", "popular"], "People began to widely use ink brushes at that time.", "widely use 对应 became popular。", ["T：与原文 widely use 一致。", "F：忽略了 at that time 的指代。"], "汉代人们开始广泛使用毛笔。"),
        q(37, "Huzhou has been the center of brush making since the Yuan Dynasty.", ["T", "F"], "F", ["Huzhou", "center", "Yuan Dynasty"], "Huzhou has been the center of brush making since the Qing Dynasty.", "题干把 Qing Dynasty 偷换成 Yuan Dynasty。", ["T：朝代错误。", "F：原文是清代以来。"], "湖州成为制笔中心是从清代开始。"),
        q(38, "The nib is made of good, soft animal hair including two main kinds.", ["T", "F"], "F", ["nib", "two main kinds"], "The nib is made of fine, soft animal hair including three main kinds.", "two 与 three 数字不符。", ["T：数量被偷换。", "F：原文是三种主要毛料。"], "笔头主要有三种动物毛。"),
        q(39, "Most works of calligraphy are created with a medium-sized brush.", ["T", "F"], "T", ["Most works", "medium-sized brush"], "Most works of calligraphy are written with a medium-sized brush.", "created with 是 written with 的同义表达。", ["T：与原文一致。", "F：没有依据。"], "多数书法作品使用中号毛笔。"),
        q(40, "The text mainly talks about a traditional tool--the ink brush.", ["T", "F"], "T", ["mainly talks", "traditional tool", "ink brush"], "The ink brush is a traditional tool for writing and painting in ancient China.", "全文围绕毛笔历史、产地、结构和大小展开。", ["T：概括全文。", "F：不是局部细节。"], "文章主要介绍传统工具毛笔。")
      ]
    },
    {
      id: "十三中模拟B",
      title: "B. Meow: Welcome Your New Friend!",
      meta: `${sourceSZ} · B 篇 · 四选一`,
      paragraphs: [
        "A new cat or kitten is coming to live with you--how exciting! Remember to check if you get things ready before it arrives. The following tips can always help you!",
        "Pick the right cat for your family. Every cat has its own personality. Some love to play all day. Others enjoy a quiet rest. If you have young kids, a confident kitten might be a great fit. If your home is calm and quiet, an older cat could be the perfect friend.",
        "Prepare your home before its arrival. Set up a quiet room with a soft bed, food and water bowls, a litter box, and a few toys. Make sure windows are safe and small holes are blocked. If you have other pets, introduce them slowly and carefully, at least a week later.",
        "Think about your daily routine. If everyone is out during the day, a kitten may feel lonely. You might want to have two kittens so they can keep each other company. Older cats are often more independent and fine when they spend time alone.",
        "With a little love and planning, you and your new cat will be best friends! Adopting a cat is not just for today--it's a promise. Make sure you're ready for years of purrs, play, and friendship."
      ],
      questions: [
        q(41, "What kind of cat would be better for a quiet home?", ["A. An older cat.", "B. A playful kitten.", "C. A newborn cat.", "D. A confident kitten."], "A", ["quiet home"], "If your home is calm and quiet, an older cat could be the perfect friend.", "quiet home 定位 calm and quiet。", ["A：an older cat 原词复现。", "B/C/D：不符合 quiet home。"], "安静的家更适合年纪大些的猫。"),
        Object.assign(q(42, "Which picture shows the right way to prepare a room for a new cat?", ["A. Picture A.", "B. Picture B.", "C. Picture C.", "D. Picture D."], "C", ["picture", "prepare a room"], "Set up a quiet room with a soft bed, food and water bowls, a litter box, and a few toys. Make sure windows are safe.", "图片题要对照 bed、bowls、litter box、toys 和安全窗户。", ["C：床、碗、猫砂盆和玩具齐全，窗户安全。", "A/B/D：有噪音、窗户或布置问题。"], "C 图最符合准备猫房间的要求。"), { image: "assets/mock-2026-shisanzhong-b-q42.png" }),
        q(43, "Why might someone choose to own two kittens?", ["A. To make them grow faster.", "B. To have more fun playing with toys.", "C. To make more money for living.", "D. To stop them from feeling lonely."], "D", ["two kittens", "Why"], "You might want to have two kittens so they can keep each other company.", "keep each other company 对应 stop them from feeling lonely。", ["D：同义替换。", "A/B/C：无依据。"], "养两只小猫是为了互相陪伴、不孤单。"),
        q(44, "What does the writer mean by “Adopting a cat is a promise”?", ["A. You can give it away anytime.", "B. You should take care of it for life.", "C. You must play with it every day.", "D. You need to pay for it every month."], "B", ["Adopting", "promise"], "Make sure you're ready for years of purrs, play, and friendship.", "for years 表示长期责任。", ["B：照顾一生符合 promise。", "A/C/D：片面或错误。"], "领养不是一时兴起，而是长期照顾的承诺。"),
        q(45, "Who is this passage mainly written for?", ["A. Parents who already have cats.", "B. People who want to get a cat.", "C. Doctors who look after sick cats.", "D. Kids who love to play with cats."], "B", ["Who", "written for"], "A new cat or kitten is coming to live with you... check if you get things ready.", "开头直接面向准备养猫的人。", ["B：目标读者最准确。", "A/C/D：范围不对。"], "文章写给准备养猫的人。")
      ]
    },
    {
      id: "十三中模拟C",
      title: "C. Hetun Weilan 01",
      meta: `${sourceSZ} · C 篇 · 四选一`,
      paragraphs: [
        "China has built the world's first special ship, which was like a railway on the sea. It was called the Hetun Weilan 01. In March 2025, the ship was shown to the public in Beijing. In April 2025, this ship set sail in Wuhu, Anhui Province, and it has now completed its final tests.",
        "The Hetun Weilan 01's most amazing thing is about its power box. The box can be changed fast. It takes only 5 minutes to change one power box, and the full power box change is finished in less than 30 minutes--more than 10 times faster than traditional powered ships that need 5 to 8 hours to get their power back.",
        "Besides, it has many other advantages. It can hold 3,000 tons of things the same as 300 trucks. A 300-kilometer trip that used to take five days now only takes three days--much faster! What's more, this ship has cut running costs by 65%. It also doesn't produce any dirty air while sailing, making it very good for the earth.",
        "Behind these achievements is a smart system, just like the “station-road-cloud” system of high-speed railway, and it has formed a new “ship-stop-cloud” model. In short, the Hetun Weilan 01 is not just a great new ship, but also a smart choice for moving things on water."
      ],
      questions: [
        q(46, "When and where did Hetun Weilan 01 set sail?", ["A. In April 2025 in Wuhu.", "B. In March 2025 in Wuhu.", "C. In April 2025 in Beijing.", "D. In April 2025 in Wuhan."], "A", ["When", "where", "set sail"], "In April 2025, this ship set sail in Wuhu, Anhui Province.", "时间和地点直接定位。", ["A：April 2025 / Wuhu 与原文一致。", "B/C/D：时间或地点错误。"], "该船 2025 年 4 月在芜湖启航。"),
        q(47, "What is the most amazing thing about Hetun Weilan 01?", ["A. It has a smart system.", "B. It can carry 3,000 tons of things.", "C. Its power box can be changed quickly.", "D. It can sail very far in a day."], "C", ["most amazing thing"], "The Hetun Weilan 01's most amazing thing is about its power box. The box can be changed fast.", "most amazing thing 后直接给答案。", ["C：changed quickly 是 changed fast 的同义。", "A/B：是其他优点。", "D：无依据。"], "最惊人之处是电池箱能快速更换。"),
        q(48, "Which can show the advantages of Hetun Weilan 01?", ["A. hold up, speed down, cost down, pollution down.", "B. hold up, speed up, cost down, pollution down.", "C. hold up, speed up, cost down, pollution up.", "D. hold up, speed up, cost up, pollution down."], "B", ["advantages", "hold", "speed", "cost", "pollution"], "It can hold 3,000 tons... much faster... cut running costs by 65%... doesn't produce any dirty air.", "逐项比对载重、速度、成本和污染。", ["B：载重高、速度快、成本低、污染低。", "A/C/D：某一项方向错误。"], "优势是载重大、速度快、成本低、污染少。"),
        q(49, "What is the best title of the passage?", ["A. The history of a special ship.", "B. The introduction of a special ship.", "C. The development of a special ship.", "D. The future of all special ships."], "B", ["best title", "special ship"], "In short, the Hetun Weilan 01 is not just a great new ship, but also a smart choice for moving things on water.", "全文介绍这艘特殊船的时间、特点和优势。", ["B：覆盖全文。", "A/C/D：范围或角度不准。"], "文章主要介绍 Hetun Weilan 01 这艘特殊船。")
      ]
    },
    {
      id: "十三中模拟D",
      title: "D. Take Control of Your Phone",
      meta: `${sourceSZ} · D 篇 · 四选一`,
      paragraphs: [
        "We all love our phones, but using them too much can cause problems. Did you know most people check their phones over 50 times a day? Many teens feel uneasy when they don't have their phones nearby. Here's how to control without giving up your phone.",
        "A good way to use your phone less is to pick a special time each day. Choose 30 minutes after school just for phone use. During this time, really focus on what you're doing. But when time's up, put your phone away.",
        "Next, fight those noisy dings and buzzes. Turn off all notices except for important ones. This simple change reduces the brain's ideas of “check it now”.",
        "Create places where phones aren't allowed. Keep your phone out of these three places: the dinner table, your bed, and study areas. Try the “Doorway Method”: leave your phone by the front door when you get home.",
        "Scientists found that about 1/3 of phone time is just habit, not something we truly enjoy. By making such small changes, you can save over 2 hours daily! Use that extra time to read, play outside, or try a new hobby.",
        "Remember what an old Greek teacher once said, “Real freedom comes from controlling yourself.” Phones are tools, not bosses. Start small: Try one tip this week. Your phone will remain there while you take control of it."
      ],
      questions: [
        q(50, "What does the underlined word “uneasy” in Paragraph 1 probably mean?", ["A. calm", "B. nervous", "C. relaxed", "D. afraid"], "B", ["uneasy", "don't have phones nearby"], "Many teens feel uneasy when they don't have their phones nearby.", "根据语境，没有手机在身边会感到不安。", ["B：nervous 最接近 uneasy。", "A/C：相反。", "D：程度偏重。"], "uneasy 在这里意为不安、紧张。"),
        q(51, "What can we do to use the phone less according to the text?", ["A. Charge the phone in the bedroom at night.", "B. Keep all the notices on to know what's happening.", "C. Bring the phone to the dinner table to share interesting things.", "D. Pick a special time each day and focus on other things when it's over."], "D", ["use phone less", "special time"], "A good way to use your phone less is to pick a special time each day... when time's up, put your phone away.", "use less 直接定位第二段。", ["D：与原文一致。", "A/B/C：都与建议相反。"], "每天规定用手机时间，时间到就放下。"),
        Object.assign(q(52, "Which of the following best shows the structure of the text?", ["A. 1 / 2,3,4 / 5 / 6", "B. 1,2 / 3,4,5 / 6", "C. 1 / 2 / 3 / 4 / 5 / 6", "D. 1 / 2,3,4,5 / 6"], "D", ["best structure", "text"], "Here's how to control without giving up your phone.", "第1段提出问题和主题，第2-5段给方法与理由，第6段总结升华。", ["D：总起—主体方法—总结。", "A/B/C：层次划分不准。"], "文章结构是提出问题、展开方法、总结呼吁。"), { image: "assets/mock-2026-shisanzhong-d-q52.png" }),
        q(53, "What's the writer's main purpose of writing this text?", ["A. To tell people to throw away their phones.", "B. To introduce the latest uses of mobile phones.", "C. To complain about the negative effects of mobile phones.", "D. To encourage people to control phone use and gain more free time."], "D", ["main purpose", "control phone"], "Your phone will remain there while you take control of it.", "结尾点明写作目的：控制手机而不是放弃手机。", ["D：概括全文目的。", "A/B/C：过度或偏离。"], "作者鼓励人们控制手机使用，获得更多自由时间。")
      ]
    },
    {
      id: "经开区模拟A",
      title: "A. Becoming Chinese",
      meta: `${sourceJK} · A 篇 · 判断正误`,
      paragraphs: [
        "“Becoming Chinese” is getting popular among TikTok users around the world. This cultural exchange online has made many people try different Chinese lifestyles in daily life. For example, people drink warm water instead of cold drinks. They wear slippers indoors instead of walking barefoot.",
        "Why is this style so popular? First, young people all over the world want a healthier life. Second, China is becoming more and more charming on the global stage. Chinese culture values living in peace with nature and keeping a balance between yin and yang.",
        "CCTV says many young people abroad have a good opinion of China. This shows China's growing soft power. It means foreigners are changing their ideas about Chinese culture--they don't just watch it from far away, but join in it. In today's busy world, Chinese lifestyles can bring calm to people's lives."
      ],
      questions: [
        q(16, "The “Becoming Chinese” style is popular with TikTok users around the world.", ["T", "F"], "T", ["Becoming Chinese", "TikTok", "around the world"], "“Becoming Chinese” is getting popular among TikTok users around the world.", "题干与原文基本一致。", ["T：原词复现。", "F：无依据。"], "该潮流在全球 TikTok 用户中流行。"),
        q(17, "People who follow the trend only drink cold drinks and walk barefoot indoors.", ["T", "F"], "F", ["cold drinks", "barefoot"], "people drink warm water instead of cold drinks. They wear slippers indoors instead of walking barefoot.", "题干与原文相反。", ["T：忽略 instead of。", "F：原文是喝热水、穿拖鞋。"], "跟风者不是喝冷饮、赤脚，而是相反。"),
        q(18, "Young people's need for a healthier life is one of the reasons why Chinese lifestyles become popular.", ["T", "F"], "T", ["healthier life", "reasons"], "First, young people all over the world want a healthier life.", "First 明确列出原因。", ["T：与原文一致。", "F：没有抓住原因句。"], "追求健康生活是流行原因之一。"),
        q(19, "Many young people abroad have a bad opinion of China according to CCTV.", ["T", "F"], "F", ["bad opinion", "CCTV"], "CCTV says many young people abroad have a good opinion of China.", "bad 与 good 相反。", ["T：把 good 偷换成 bad。", "F：原文是好印象。"], "CCTV 说许多国外年轻人对中国有好印象。"),
        q(20, "Chinese lifestyles can bring calm to people's lives in today's busy world.", ["T", "F"], "T", ["bring calm", "busy world"], "In today's busy world, Chinese lifestyles can bring calm to people's lives.", "题干复现主旨句。", ["T：与原文一致。", "F：无依据。"], "中国式生活能给忙碌生活带来平静。")
      ]
    },
    {
      id: "经开区模拟B",
      title: "B. Guangming School Noticeboard",
      meta: `${sourceJK} · B 篇 · 四选一`,
      chart: {
        title: "Guangming School Noticeboard",
        columns: ["板块", "地点/时间", "内容", "报名/联系"],
        rows: [
          ["Sunshine Room", "Third floor of the Main Building; 3:00 p.m.-4:00 p.m.", "Psychology teachers help students deal with emotional challenges. Students can talk, color, listen to music and play games to relax.", "Call Ms. Han at 5183-2356."],
          ["Guangming Art Center", "School hall; June 18th, 2:30 p.m.-4:30 p.m.", "A special paper cutting event with Ms. Li, a local artist.", "E-mail artcenter@school.com by June 16th."],
          ["DIY Club", "Room 205, Science Building; every Thursday, 3:30 p.m.-5:00 p.m.", "Turn ideas into real objects and make “nienie”, a pressure-relief toy.", "Call Mr. Zhang at 5183-2478 before Tuesday."],
          ["Happy Reading Room", "School reading room; before Friday, June 20th", "Look for 10 volunteers who are patient and responsible to organize books during summer vacation.", "Talk to Ms. Wang or send information to readingroom@school.com."]
        ]
      },
      paragraphs: [
        "What is going on in Guangming Junior High School in June? Here are 4 notices on the school noticeboard.",
        "Sunshine Room: It is on the third floor of the Main Building. Three friendly psychology teachers are here to help you deal with emotional challenges. You can talk, color, listen to music and play games here to relax. Feel free to visit us anytime from 3:00 p.m. to 4:00 p.m. or call Ms. Han at 5183-2356.",
        "Guangming Art Center: Join us for a special paper cutting event with Ms. Li, a local artist. The event will be on June 18th from 2:30 p.m. to 4:30 p.m. in the school hall. To sign up, e-mail artcenter@school.com by June 16th.",
        "DIY Club: Turn your ideas into real objects every Thursday. You will make “nienie” this week, a pressure-relief toy. The club opens from 3:30 p.m. to 5:00 p.m. in Room 205, Science Building. To sign up, call Mr. Zhang at 5183-2478 before Tuesday.",
        "Happy Reading Room: We are looking for 10 volunteers to help organize books during summer vacation. We want students who are patient and responsible. If interested, talk to Ms. Wang in the school reading room or send your information to readingroom@school.com before Friday, June 20th."
      ],
      questions: [
        q(21, "When is the best time to visit the psychology teachers?", ["A. At 2:30 p.m.", "B. At 3:00 p.m.", "C. At 4:30 p.m.", "D. At 5:00 p.m."], "B", ["psychology teachers", "When"], "visit us anytime from 3:00 p.m. to 4:00 p.m.", "心理老师在 3:00-4:00 可见。", ["B：3:00 p.m. 在时间范围内。", "A/C/D：不在开放时间内。"], "最佳时间是下午 3 点。"),
        q(22, "If Li Hong wants to learn about paper cutting, where should she go?", ["A. The school hall.", "B. The school reading room.", "C. Room 205, Science Building.", "D. The third floor of the Main Building."], "A", ["paper cutting", "where"], "The event will be... in the school hall.", "paper cutting 定位 Guangming Art Center。", ["A：school hall 与原文一致。", "B/C/D：对应其他活动。"], "剪纸活动在学校礼堂。"),
        q(23, "If Wang Gang is interested in DIY, what should he do?", ["A. Call Ms. Han.", "B. Talk to Ms. Wang.", "C. Call Mr. Zhang.", "D. E-mail artcenter@school.com."], "C", ["DIY", "what should he do"], "To sign up, call Mr. Zhang at 5183-2478 before Tuesday.", "DIY Club 的报名方式是找张老师。", ["C：对应 DIY。", "A/B/D：对应其他公告。"], "参加 DIY 应打电话给张老师。"),
        q(24, "Which of the following can help you relax according to this passage?", ["A. 1 and 2.", "B. 3 and 4.", "C. 2 and 3.", "D. 1 and 3."], "D", ["help relax"], "listen to music and play games here to relax... make “nienie”, a pressure-relief toy", "听音乐和解压玩具都与放松有关。", ["D：1 listening to music 和 3 nienie 都能放松。", "A/B/C：包含不对应项。"], "听音乐和玩捏捏都能帮助放松。"),
        q(25, "What kind of students can help in the reading room?", ["A. Students who have emotional challenges.", "B. Students who are patient and responsible.", "C. Students who are interested in Chinese culture.", "D. Students who want to turn their ideas into real objects."], "B", ["reading room", "what kind"], "We want students who are patient and responsible.", "reading room 定位志愿者要求。", ["B：patient and responsible 原词复现。", "A/C/D：对应其他板块。"], "阅读室需要有耐心、负责任的学生。")
      ]
    },
    {
      id: "经开区模拟C",
      title: "C. Healthy Food",
      meta: `${sourceJK} · C 篇 · 四选一`,
      paragraphs: [
        "We all know that eating healthy food will make us healthy. So we need to choose some good things to eat in our life.",
        "There is a lot of vitamin C in oranges. In the morning, we can drink a small cup of orange juice, because it can help us have good feelings. What's more, it's good to eat oranges after meals.",
        "Carrots are common vegetables. They have lots of vitamin A. Carrots are good for our eyes. If some people's eyes are dry, they can eat them. Some people can't see clearly at night because they do not have enough vitamin A. They need to eat more carrots.",
        "Apples are very healthy food. Eating apples helps clean the teeth and kill bad things in the mouth. And if children often eat apples, they can easily remember some things.",
        "Milk has a lot of protein. It is a good habit to have a cup of milk for breakfast. At night, drinking some milk before going to bed helps us sleep well."
      ],
      questions: [
        q(26, "Who needs to eat more carrots according to paragraph 3?", ["A. People with dry eyes.", "B. People with good teeth.", "C. People who sleep well.", "D. People who like sports."], "A", ["carrots", "dry eyes"], "If some people's eyes are dry, they can eat them.", "them 指 carrots。", ["A：dry eyes 与原文一致。", "B/C/D：无依据。"], "眼睛干的人可以多吃胡萝卜。"),
        q(27, "Which is TRUE according to the passage?", ["A. Oranges are bad for our feelings.", "B. Carrots have lots of vitamin B.", "C. Milk can help us sleep well.", "D. Apples are bad for teeth."], "C", ["TRUE", "Milk", "sleep"], "drinking some milk before going to bed helps us sleep well.", "TRUE 题逐项回文核对。", ["C：与原文一致。", "A/B/D：与原文相反或错误。"], "睡前喝牛奶有助睡眠。"),
        Object.assign(q(28, "What's the structure of the passage?", ["A. P1 P2 / P3 P4 / P5", "B. P1 / P2 P3 P4 / P5", "C. P1 P3 / P2 P4 / P5", "D. P1 / P2 P3 P4 P5"], "D", ["structure", "passage"], "We need to choose some good things to eat in our life.", "第1段总起，后四段分别介绍 oranges、carrots、apples、milk。", ["D：总分结构最准确。", "A/B/C：段落层次划分错误。"], "文章是总起后分述四种健康食物。"), { image: "assets/mock-2026-jingkai-c-q28.png" }),
        q(29, "Where can we read the passage?", ["A. In a storybook.", "B. In a sports magazine.", "C. In a math book.", "D. In a health magazine."], "D", ["Where", "read"], "eating healthy food will make us healthy", "主题是健康饮食。", ["D：health magazine 符合主题。", "A/B/C：文体不符。"], "文章关于健康饮食，最可能来自健康杂志。")
      ]
    },
    {
      id: "经开区模拟D",
      title: "D. ZXMoto's Historic Victory",
      meta: `${sourceJK} · D 篇 · 四选一`,
      paragraphs: [
        "A historic moment recently arrived for the Chinese motorsport industry. ZXMoto got two victories at the Portuguese round of the Superbike World Championship. It was the first time a Chinese brand had beaten many famous global brands in this world-class competition. Several international media described the amazing result as a “historic milestone”.",
        "Behind this great success is the founder, Zhang Xue. Although his early life was full of hardships, his crazy passion for racing kept him going. He had made all his efforts to design top machines, treating the winning motorcycles as a wonderful part of his own racing dream.",
        "The amazing victory was also driven by French rider Valentin Debise, who rode the ZXMoto 820RR-RS. Debise mentioned that he was deeply moved by Zhang's true love for racing rather than just business. He also pointed out that the Chinese bike performed perfectly from the very beginning during the races.",
        "By turning movie stories into reality, Zhang's journey shows that Chinese industry can create world-class products, encouraging more teenagers to bravely follow their dreams."
      ],
      questions: [
        q(30, "What does the underlined word “milestone” mean?", ["A. A difficult challenge.", "B. An important turning point.", "C. A common achievement.", "D. A small improvement."], "B", ["milestone", "historic"], "A historic moment recently arrived... described the amazing result as a “historic milestone”.", "historic 和 milestone 都指重大节点。", ["B：important turning point 符合语境。", "A/C/D：程度或含义不符。"], "milestone 指重要里程碑、转折点。"),
        q(31, "What kept Zhang Xue going through hard times?", ["A. The help from his friends.", "B. His crazy love for racing.", "C. The sudden success in Portugal.", "D. The big money from moto race."], "B", ["Zhang Xue", "hard times", "kept going"], "his crazy passion for racing kept him going", "passion for racing = love for racing。", ["B：同义替换。", "A/C/D：无依据。"], "支撑张雪的是对赛车的热爱。"),
        q(32, "According to the passage, why did Debise choose ZXMoto?", ["A. The Chinese bikes were fully tested.", "B. He cared just about moto business.", "C. He was moved by Zhang's true love for racing.", "D. It was Debise's racing dream."], "C", ["Debise", "why", "ZXMoto"], "Debise mentioned that he was deeply moved by Zhang's true love for racing rather than just business.", "why 问原因，moved by 是答案依据。", ["C：与原文一致。", "A/B/D：无依据或相反。"], "Debise 被张雪对赛车的真爱打动。"),
        q(33, "What is the main idea of the passage?", ["A. The rules of the Superbike World Championship.", "B. Zhang Xue's story and ZXMoto's historic victory.", "C. How to design world-class motorcycles.", "D. The development of Chinese motorcycle industry."], "B", ["main idea", "passage"], "A historic moment... Behind this great success is the founder, Zhang Xue.", "全文围绕 ZXMoto 胜利和张雪故事展开。", ["B：覆盖全文。", "A/C/D：过窄或偏离。"], "文章主要讲张雪和 ZXMoto 的历史性胜利。")
      ]
    },
    {
      id: "新市区模拟A",
      title: "A. A Reporter and Music Lover",
      meta: `${sourceXS} · A 篇 · 判断正误`,
      paragraphs: [
        "A young man lives an interesting double life. He works as a reporter in Beijing, writing news stories and reports. After work, he is busy playing the keyboard in a band. His band became famous after performing on a popular TV show. Now, he often travels to other cities for shows.",
        "He loves both roles, but balancing them isn't easy. He often collects news at work time and practices the keyboard for his band in his free time. To make time for what he loves, he gives up watching short videos and playing games. He also exercises to stay healthy. It gives him enough energy for both his work and hobby.",
        "He says, “If we make good use of our time, we can do well in work while still having time for hobbies.” This story reminds us that life doesn't have to be just one thing. Be brave to try something different. We can have the life we want if we never give up on what we love."
      ],
      questions: [
        q(1, "The young man is not only a reporter but also a music lover.", ["T", "F"], "T", ["reporter", "music lover"], "He works as a reporter... After work, he is busy playing the keyboard in a band.", "reporter 和 keyboard in a band 对应双重身份。", ["T：符合原文。", "F：只看到一个身份。"], "他既是记者，也热爱音乐。"),
        q(2, "The band became famous after joining in a music competition.", ["T", "F"], "F", ["band", "famous", "music competition"], "His band became famous after performing on a popular TV show.", "题干把 TV show 偷换成 music competition。", ["T：活动类型错误。", "F：原文是电视节目。"], "乐队因热门电视节目表演而出名。"),
        q(3, "The young man spends lots of time watching short videos.", ["T", "F"], "F", ["short videos"], "he gives up watching short videos and playing games", "spends lots of time 与 gives up 相反。", ["T：与原文相反。", "F：他放弃刷短视频。"], "他为了爱好放弃刷短视频。"),
        q(4, "Exercising helps the young man get enough energy.", ["T", "F"], "T", ["Exercising", "energy"], "He also exercises to stay healthy. It gives him enough energy for both his work and hobby.", "It 指 exercising/staying healthy。", ["T：与原文一致。", "F：无依据。"], "锻炼让他有足够精力兼顾工作和爱好。"),
        q(5, "The story tells us not to give up on what we love.", ["T", "F"], "T", ["not give up", "what we love"], "We can have the life we want if we never give up on what we love.", "结尾主旨句直接对应题干。", ["T：主旨一致。", "F：没有抓住结尾。"], "故事告诉我们不要放弃热爱。")
      ]
    },
    {
      id: "新市区模拟B",
      title: "B. Four Gentlemen",
      meta: `${sourceXS} · B 篇 · 四选一`,
      paragraphs: [
        "In traditional Chinese culture, plants are more than just nature's gifts, they also carry special meanings. Have you heard of the “Four Gentlemen”?",
        "Plum blossom blooms in winter when most flowers die. No matter how hard the conditions are, it stands tall and blooms with beauty. This makes it a symbol of courage and strong will.",
        "Orchid has a soft and nice smell. It often grows in quiet mountains and forests, showing us the value of inner beauty. It teaches us to be kind, even when no one is watching.",
        "Bamboo is one of the fastest-growing plants on earth. It stands straight and never breaks, so we often see it as a symbol of honesty. It is also very useful.",
        "Chrysanthemum blooms in late autumn. It means peace and a simple life. It's also a symbol of long life in China. What's more, it can be used to make tea, wine, and dishes."
      ],
      questions: [
        q(1, "Which plant blooms in winter?", ["A. The Plum Blossom.", "B. The Orchid.", "C. The Bamboo.", "D. The Chrysanthemum."], "A", ["blooms", "winter"], "Plum blossom blooms in winter when most flowers die.", "winter 直接定位梅花。", ["A：Plum Blossom 与原文一致。", "B/C/D：季节或植物不符。"], "冬天开放的是梅花。"),
        q(2, "According to the passage, where does the orchid often grow?", ["A. In busy cities.", "B. In small gardens.", "C. In quiet mountains and forests.", "D. In beautiful parks."], "C", ["orchid", "where"], "It often grows in quiet mountains and forests", "orchid 段落直接给地点。", ["C：原词复现。", "A/B/D：无依据。"], "兰花常生长在安静的山林中。"),
        q(3, "Why is bamboo a symbol of honesty?", ["A. Because it can be used to make tools.", "B. Because it stands straight and never breaks.", "C. Because it is very useful for building houses.", "D. Because it is one of the fastest-growing plants."], "B", ["Why", "bamboo", "honesty"], "It stands straight and never breaks, so we often see it as a symbol of honesty.", "so 前是原因，后是结果。", ["B：与原文一致。", "A/C/D：是其他信息。"], "竹子直立不折，所以象征诚实。"),
        q(4, "What are the meanings of the chrysanthemum in Chinese culture?", ["A. Peace and long life.", "B. Inner beauty and kindness.", "C. Courage and strong will.", "D. Honesty and usefulness."], "A", ["chrysanthemum", "meanings"], "It means peace and a simple life. It's also a symbol of long life in China.", "peace 和 long life 是关键信息。", ["A：概括准确。", "B/C/D：对应其他植物。"], "菊花象征平和和长寿。"),
        q(5, "In which part of a magazine can we probably read the passage?", ["A. Sports.", "B. Health.", "C. Science.", "D. Nature."], "D", ["magazine", "part"], "plants are more than just nature's gifts", "文章介绍植物及文化含义，最接近 Nature。", ["D：主题最匹配。", "A/B/C：不符合。"], "文章可能出现在自然栏目。")
      ]
    },
    {
      id: "新市区模拟C",
      title: "C. Wu BOT",
      meta: `${sourceXS} · C 篇 · 四选一`,
      paragraphs: [
        "Have you ever imagined robots doing Chinese Kung Fu? At the 2026 CCTV Spring Festival Gala, a program called “Wu BOT” made this dream come true.",
        "On the stage, the high-tech robots acted just like real kung fu masters. They showed amazing moves, such as kicking and jumping. Most importantly, they finished every action on their own.",
        "In fact, the great show depends on two new technologies. One lets the robots move fast and change positions without any mistakes. The other gives the robots a virtual environment to practice thousands of times before going on stage.",
        "The success of “Wu BOT” clearly shows how fast China's robot industry is developing. In the near future, what other human skills can robots learn? Will they surprise us again? One thing is for sure--the time of smart robots has really come."
      ],
      questions: [
        q(1, "How does the writer start the passage?", ["A. By asking a question.", "B. By giving an example.", "C. By doing a survey.", "D. By telling a story."], "A", ["How", "start"], "Have you ever imagined robots doing Chinese Kung Fu?", "开头是疑问句。", ["A：asking a question 与开头形式一致。", "B/C/D：不符合。"], "作者用提问开篇。"),
        q(2, "What could the robots do on the stage?", ["A. They could sing songs.", "B. They could tell stories.", "C. They could kick and jump.", "D. They could draw pictures."], "C", ["robots", "stage"], "They showed amazing moves, such as kicking and jumping.", "stage 段落直接列举动作。", ["C：kick and jump 原词复现。", "A/B/D：无依据。"], "机器人能踢腿和跳跃。"),
        q(3, "What can we infer from Paragraph 3?", ["A. The show was very easy to prepare.", "B. The robots learned kung fu by themselves.", "C. The show only depended on one technology.", "D. The robots practiced many times before the show."], "D", ["infer", "Paragraph 3"], "The other gives the robots a virtual environment to practice thousands of times before going on stage.", "thousands of times 表示反复练习。", ["D：合理推断。", "A/B/C：与原文不符。"], "机器人上台前练习了很多次。"),
        q(4, "What does the writer think of robots in the future?", ["A. They can't learn new skills.", "B. They may bring more surprises.", "C. They won't appear at the gala.", "D. They can do everything for people."], "B", ["future", "robots"], "Will they surprise us again at next year's Spring Festival Gala?", "反问表达作者期待机器人带来惊喜。", ["B：符合作者态度。", "A/C/D：过绝对或相反。"], "作者认为机器人未来可能继续带来惊喜。")
      ]
    },
    {
      id: "新市区模拟D",
      title: "D. Saving Antelopes in Hoh Xil",
      meta: `${sourceXS} · D 篇 · 四选一`,
      paragraphs: [
        "Recently, a TV drama has become very popular. It tells a true story happened in Hoh Xil. This beautiful place is home to Tibetan antelopes.",
        "Hoh Xil stands over 4,600 meters above sea level. The air is thin, and the wind blows strongly. Long ago, thousands of Tibetan antelopes were killed cruelly for money. The once peaceful land lost its beauty, and these gentle animals almost disappeared from our world.",
        "To stop the killing, a group of heroes stepped forward. In the 1990s, with simple tools and food, they made great efforts to fight against poachers in the freezing wild. Some even lost their lives to protect the land. Their stories moved the whole country.",
        "Thanks to their efforts, the antelopes there are running freely again. In the main area of Hoh Xil, the number of Tibetan antelopes has risen from less than 20,000 to over 70,000 so far. Those heroes brought back the wild and beautiful Hoh Xil to us. Let's give it back to those lovely wild animals. After all, protecting nature is protecting our life."
      ],
      questions: [
        q(1, "People killed many Tibetan antelopes for ______.", ["A. money", "B. food", "C. fun", "D. medicine"], "A", ["killed", "for"], "thousands of Tibetan antelopes were killed cruelly for money", "for money 直接给原因。", ["A：money 原词复现。", "B/C/D：无依据。"], "人们为了钱猎杀藏羚羊。"),
        q(2, "What does the underlined word “they” in Paragraph 3 refer to?", ["A. The poachers.", "B. The heroes.", "C. The antelopes.", "D. The farmers."], "B", ["they", "Paragraph 3"], "a group of heroes stepped forward. In the 1990s... they made great efforts", "they 指前句 a group of heroes。", ["B：代词指代正确。", "A/C/D：不符合上下文。"], "they 指保护藏羚羊的英雄们。"),
        q(3, "What is the number of Tibetan antelopes in Hoh Xil now?", ["A. More than 1990.", "B. About 4,600.", "C. Less than 20,000.", "D. Over 70,000."], "D", ["number", "now"], "the number of Tibetan antelopes has risen from less than 20,000 to over 70,000 so far", "so far 表示到现在。", ["D：over 70,000 与原文一致。", "A/B/C：数字错误或旧数据。"], "现在藏羚羊数量超过 7 万。"),
        q(4, "What is the best title for the passage?", ["A. Saving Antelopes in Hoh Xil.", "B. Beautiful Places in China.", "C. Popular TV Dramas about Science.", "D. Ways to Protect Wild Animals."], "A", ["best title", "Hoh Xil", "antelopes"], "Those heroes brought back the wild and beautiful Hoh Xil to us.", "全文讲可可西里藏羚羊被保护的故事。", ["A：概括核心内容。", "B/C/D：太泛或偏题。"], "最佳标题是拯救可可西里的藏羚羊。")
      ]
    }
  ]);
})();

(function () {
  const source2021 = "2021年新疆维吾尔自治区、建设兵团中考英语真题";
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
    {
      id: "2021真题A",
      title: "A. Mum Taught Me Courage",
      meta: `${source2021} · A 篇 · 判断正误`,
      paragraphs: [
        "I’m my mother’s third girl. When I was born, the doctor gently explained to my mother that my left arm was missing, below the elbow. Then she gave her some advice, “Don’t treat her any differently from others.” And she did.",
        "There are five girls in my family, and we all had to help out. Once when I was about seven, I came out of the kitchen, “Mum, I can’t peel potatoes. I only have one hand.” “Get back to peel these potatoes, and don’t ever use that as an excuse for anything again!”",
        "Of course I could peel potatoes — with my good hand and my other arm. “Jenny, if you try hard,” she said, “you can do anything.”",
        "Once in the second grade, our teacher had each of us race across the monkey bar. When it was my turn, I said no. Some kids laughed. I went home crying.",
        "The next afternoon Mum took me back to the school playground. “Now, pull up with your right arm.” She advised. She praised me when I made progress. I’ll never forget when I was crossing the bar, the kids were standing there with their mouths open.",
        "It was the way with everything. Mum had the courage to face anything. And she taught me I could, too."
      ],
      questions: [
        q(46, "The writer has four sisters.", ["T", "F"], "T", ["four sisters", "five girls"], "There are five girls in my family", "作者是其中一个女孩，所以有四个姐妹。", ["T：五个女孩减去作者本人就是四个姐妹。", "F：没有进行数量推断。"], "家里有五个女孩，作者有四个姐妹。"),
        q(47, "The doctor’s advice means that the mum should treat the writer the same as others.", ["T", "F"], "T", ["doctor's advice", "same as others"], "Don’t treat her any differently from others.", "not differently = the same as others。", ["T：同义替换。", "F：误解 differently。"], "医生建议不要区别对待作者。"),
        q(48, "The writer’s mum peeled the potatoes at last.", ["T", "F"], "F", ["mum", "peeled", "potatoes"], "Of course I could peel potatoes — with my good hand and my other arm.", "最后是作者自己削土豆。", ["T：把作者做的事换成妈妈做。", "F：原文说作者可以削土豆。"], "妈妈没有替她削，作者自己完成了。"),
        q(49, "Mum didn’t take the writer back to the school playground the next day.", ["T", "F"], "F", ["didn't", "school playground", "next day"], "The next afternoon Mum took me back to the school playground.", "didn't 与 took me back 相反。", ["T：忽略 didn't。", "F：妈妈第二天下午带她回到操场。"], "妈妈确实带作者回了学校操场。"),
        q(50, "Mum gave the writer the courage to face anything.", ["T", "F"], "T", ["Mum", "courage", "face anything"], "Mum had the courage to face anything. And she taught me I could, too.", "最后一句主旨对应题干。", ["T：与主旨句一致。", "F：没有抓住结尾升华。"], "妈妈教会作者勇敢面对一切。")
      ]
    },
    {
      id: "2021真题B",
      title: "B. Movie Guide Friday",
      meta: `${source2021} · B 篇 · 四选一`,
      chart: {
        title: "Movie Guide Friday",
        columns: ["电影", "时间", "类型", "简介"],
        rows: [
          ["Harry Potter III", "14:00 and 21:00", "Science Fiction", "Harry Potter has been in the wizardry school for three years. He begins a new life."],
          ["Mr. Bean", "9:00 and 18:00", "Comedy", "Rowan Atkinson is a great actor. His movie Mr. Bean is very funny."],
          ["Hi Mum", "11:00 and 16:00", "Comedy", "Jia Ling is both the actress and director of this movie."],
          ["The Monkey King", "17:00 and 22:00", "Cartoon", "It is picked from Journey to the West and describes a brave hero."]
        ]
      },
      paragraphs: [
        "Movie Guide Friday.",
        "Harry Potter III. 14:00 and 21:00. Science Fiction. Now Harry Potter has been in the wizardry school for three years. He begins a new life. How is everything going?",
        "Mr. Bean. 9:00 and 18:00. Comedy. Rowan Atkinson is a great actor. His movie Mr. Bean is coming. It’s very funny. Don’t miss it.",
        "Hi Mum. 11:00 and 16:00. Comedy. Do you like Jia Ling? She is both the actress and director of this movie. It’s so interesting and moving. Come and have fun!",
        "The Monkey King. 17:00 and 22:00. Cartoon. It is picked from Journey to the West. This movie describes a brave hero who is fearless to fight against all gods. Children, come and see it!"
      ],
      questions: [
        q(51, "What kind of movie is Mr. Bean?", ["A. Comedy.", "B. Science fiction.", "C. Cartoon.", "D. Action movie."], "A", ["Mr. Bean", "kind"], "Mr. Bean. 9:00 and 18:00. Comedy.", "电影名定位，类型是 Comedy。", ["A：Comedy 与原文一致。", "B/C/D：类型错误。"], "Mr. Bean 是喜剧。"),
        q(52, "______ is picked from Journey to the West.", ["A. Harry Potter III", "B. Mr. Bean", "C. Hi Mum", "D. The Monkey King"], "D", ["picked from", "Journey to the West"], "The Monkey King... It is picked from Journey to the West.", "Journey to the West 直接定位 The Monkey King。", ["D：与原文一致。", "A/B/C：无依据。"], "《美猴王》取材于《西游记》。"),
        q(53, "After I finished my dinner at 7:30 on Friday evening, I could choose to enjoy ______.", ["A. The Monkey King or Mr. Bean", "B. Hi Mum or Harry Potter III", "C. Harry Potter III or The Monkey King", "D. Hi Mum or Mr. Bean"], "C", ["7:30", "Friday evening"], "Harry Potter III. 14:00 and 21:00... The Monkey King. 17:00 and 22:00.", "7:30 后还能看的场次是 21:00 和 22:00。", ["C：Harry Potter 21:00 和 Monkey King 22:00 都可看。", "A/D：Mr. Bean 18:00 已过。", "B：Hi Mum 16:00 已过。"], "晚饭 7:30 后可看 21:00 的 Harry Potter 或 22:00 的 The Monkey King。"),
        q(54, "______ is the actress of Hi Mum.", ["A. Rowan Atkinson", "B. Jia Ling", "C. Harry Potter", "D. The Monkey King"], "B", ["actress", "Hi Mum"], "Do you like Jia Ling? She is both the actress and director of this movie.", "Hi Mum 段落中 She 指 Jia Ling。", ["B：Jia Ling 与原文一致。", "A/C/D：人物错误。"], "贾玲是《你好，李焕英》的演员和导演。"),
        q(55, "You can see Harry Potter III at ______.", ["A. 2:00 a.m.", "B. 4:00 a.m.", "C. 1:00 p.m.", "D. 9:00 p.m."], "D", ["Harry Potter", "at"], "Harry Potter III. 14:00 and 21:00.", "21:00 即晚上 9 点。", ["D：9:00 p.m. 对应 21:00。", "A/B/C：时间不符。"], "Harry Potter III 在 14:00 和 21:00 放映。")
      ]
    },
    {
      id: "2021真题C",
      title: "C. Yangzhou Paper Cutting",
      meta: `${source2021} · C 篇 · 四选一`,
      paragraphs: [
        "Yangzhou paper cutting, with a history of 2,000 years, can be dated back to the Sui Dynasty, making Yangzhou one of the places where paper cutting first became popular.",
        "In the Sui Dynasty, the people of Yangzhou would cut colourful paper or silk and satin to celebrate festivals. It is said that Emperor Yang came to Yangzhou three times. In winter, the flowers and trees in the garden became dry and weak. The emperor ordered the girl servants to cut fine silk and satin into flowers and leaves and use them to decorate the trees and lakes, copying nicely the looks of spring and summer. Since then, “colorful cutting” has become a popular art in Yangzhou.",
        "In the Tang Dynasty, the paper cutting industry was highly developed and a large amount of high-quality paper was made as presents to the Court.",
        "In the Qing Dynasty, because of the economic development, the people of Yangzhou became interested in wearing fine clothing, especially embroidered clothing. The embroidered designs were based on paper-cuts, the most well-known of them was from Bao Jun, a paper cutting master. He won a high reputation as Magic Scissors for his wonderful cutting skills.",
        "After the People’s Republic of China was started, the Chinese government accepted the importance of paper cutting like many other arts and skills. In 2007, China Paper-cuts Museum opened to the public in the back garden of the Wang’s Residence, Yangzhou, greatly helping the development of Yangzhou paper cutting."
      ],
      questions: [
        q(56, "When did “colourful cutting” become a popular art in Yangzhou?", ["A. In the Sui Dynasty.", "B. In the Tang Dynasty.", "C. In the Ming Dynasty.", "D. In the Qing Dynasty."], "A", ["colourful cutting", "popular art"], "In the Sui Dynasty... Since then, “colorful cutting” has become a popular art in Yangzhou.", "Since then 指隋朝故事之后。", ["A：Sui Dynasty 与原文一致。", "B/C/D：朝代错误。"], "彩剪在隋朝后成为扬州流行艺术。"),
        q(57, "The underlined word “decorate” in Paragraph 2 means ______ in Chinese.", ["A. 种植", "B. 装饰", "C. 浇水", "D. 砍伐"], "B", ["decorate", "Paragraph 2"], "use them to decorate the trees and lakes, copying nicely the looks of spring and summer", "把花叶用于树和湖，营造春夏景象，是装饰。", ["B：装饰符合语境。", "A/C/D：不符合。"], "decorate 意为装饰。"),
        q(58, "When did China Paper-cuts Museum open to the public?", ["A. In 2007.", "B. In 2008.", "C. In 2009.", "D. In 2010."], "A", ["China Paper-cuts Museum", "open"], "In 2007, China Paper-cuts Museum opened to the public", "时间原词复现。", ["A：2007 与原文一致。", "B/C/D：时间错误。"], "中国剪纸博物馆 2007 年开放。"),
        q(59, "Where can we probably find the passage?", ["A. In a poem.", "B. In a novel.", "C. In a magazine.", "D. In a dictionary."], "C", ["Where", "find", "passage"], "Yangzhou paper cutting, with a history of 2,000 years", "文化艺术介绍类文章常见于杂志。", ["C：magazine 符合。", "A/B/D：不符合文体。"], "这类文化介绍最可能出现在杂志。"),
        q(60, "What’s the main idea of the passage?", ["A. How to make paper cutting.", "B. The way to cut paper.", "C. The importance of Yangzhou paper cutting.", "D. The history and development of Yangzhou paper cutting."], "D", ["main idea", "passage"], "Yangzhou paper cutting, with a history of 2,000 years, can be dated back to the Sui Dynasty", "全文按朝代介绍扬州剪纸历史发展。", ["D：覆盖全文。", "A/B：只关注制作方法，文中不是重点。", "C：只说重要性，范围不全。"], "文章主要讲扬州剪纸的历史和发展。")
      ]
    },
    ]);
})();

(function () {
  const source2022 = "2022年新疆维吾尔自治区、建设兵团中考英语真题";
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
    {
      id: "2022真题A",
      title: "A. Potato Milk",
      meta: `${source2022} · A 篇 · 判断正误`,
      paragraphs: [
        "When it comes to daily choices, we already have a lot of tasty plant “milks” to choose from, but the latest one, potato milk, is a new one. Potato milk doesn’t sound like the most delicious thing in the world, neither does oat milk.",
        "If you hope to try potato milk, you’ll be happy to know that you can make it yourself at home. Generally, you just boil the potato, then mix it with the water it is boiled in, strain it and add more water until it is what you want.",
        "The only welcome potato milk, recently has been firstly sold on the market. Although some people noticed the potato milk when it was sold, the success of this “milk” still needs time, as some people who have tried it said that it tasted so so, others thought that it tasted a little salty.",
        "But growing potatoes needs less land than growing oats, and it requires little water. Also it has more production than most plants. The new healthy drink may have a huge hill to climb, but it certainly has a chance to become the next big thing."
      ],
      questions: [
        q(42, "Potato milk is a kind of new plant milk.", ["T", "F"], "T", ["Potato milk", "new plant milk"], "the latest one, potato milk, is a new one", "new one 指 plant milks 中的新成员。", ["T：potato milk 是新的植物奶。", "F：无依据。"], "土豆奶是一种新的植物奶。"),
        q(43, "People can’t make potato milk at home.", ["T", "F"], "F", ["can't", "make", "at home"], "you can make it yourself at home", "can’t 与 can 直接相反。", ["T：忽略 can。", "F：原文说可以在家自己做。"], "人们可以在家制作土豆奶。"),
        q(44, "The success of potato milk doesn’t need time.", ["T", "F"], "F", ["success", "doesn't need time"], "the success of this “milk” still needs time", "doesn't need time 与 still needs time 相反。", ["T：把 still needs time 看反。", "F：成功仍需时间。"], "土豆奶的成功还需要时间。"),
        q(45, "Potato milk may not taste good to some people.", ["T", "F"], "T", ["taste", "some people"], "some people who have tried it said that it tasted so so, others thought that it tasted a little salty", "so so / salty 表明有些人觉得味道一般。", ["T：与原文试喝反馈一致。", "F：无依据。"], "有些人觉得土豆奶味道一般或有点咸。"),
        q(46, "The production of potatoes is less than that of most plants.", ["T", "F"], "F", ["production", "less"], "it has more production than most plants", "less 与 more 相反。", ["T：把 more production 看成 less。", "F：原文是产量更高。"], "土豆产量比大多数植物更高。")
      ]
    },
    {
      id: "2022真题B",
      title: "B. Courses in Children's Palace",
      meta: `${source2022} · B 篇 · 四选一`,
      chart: {
        title: "Courses in Children's Palace",
        columns: ["日期", "课程", "时间/周期", "老师/内容", "地点"],
        rows: [
          ["Monday", "Space Course", "19:00-20:00; once a week for two months", "Dr. Li Hua from Red Star School; more knowledge about outer space", "Room 105"],
          ["Thursday", "Chinese Clay Art Course", "19:00-21:00; once a week for three months", "Chinese Clay Art; call Ms. Huang Li at 8820231", "Room 109"],
          ["Tuesday", "Photography Course", "18:30-19:30; once a week for two months", "Mr. Chen Yi from Evening Paper will show how to take good pictures", "Room 218"],
          ["Saturday", "Cooking Course", "14:00-16:00; once a week for two months", "Ms. Qian Hong; learn common dishes like scrambled eggs with tomato", "Room 305"],
          ["Wednesday", "Biology Course", "18:00-19:00; once a week for one month", "Learn about earthworms in a field", "In the yard of Children's Palace"],
          ["Sunday", "Chinese Shadow Puppetry Course", "15:00-17:30; once a week for three months", "Tell the story of Journey to the West by Mr. Liang", "Room 308"]
        ]
      },
      paragraphs: [
        "Here is a timetable of courses in Children’s Palace.",
        "Monday. Space Course. 19:00—20:00, once a week for two months. Dr. Li Hua from Red Star School. More knowledge about the outer space. Place: Room 105.",
        "Thursday. Chinese Clay Art Course. 19:00—21:00, once a week for three months. Chinese Clay Art. Call Ms. Huang Li at 8820231. Place: Room 109.",
        "Tuesday. Photography Course. 18:30—19:30, once a week for two months. Mr. Chen Yi from Evening Paper will show you how to take good pictures. Bring your own camera. Place: Room 218.",
        "Saturday. Cooking Course. 14:00—16:00, once a week for two months. Ms. Qian Hong, a famous cook. Learn some common dishes, like scrambled eggs with tomato. Place: Room 305.",
        "Wednesday. Biology Course. 18:00—19:00, once a week for one month. Learn about earthworms in a field. Place: In the yard of Children’s Palace.",
        "Sunday. Chinese Shadow Puppetry Course. 15:00—17:30, once a week for three months. Tell the story of Journey to the West by Mr. Liang. Place: Room 308."
      ],
      questions: [
        q(47, "When can you learn more about the outer space in Children’s Palace?", ["A. On Sunday.", "B. On Saturday.", "C. On Tuesday.", "D. On Monday."], "D", ["outer space", "When"], "Monday. Space Course... More knowledge about the outer space.", "outer space 对应 Space Course，日期是 Monday。", ["D：Monday 与原文一致。", "A/B/C：日期错误。"], "学习外太空知识在周一。"),
        q(48, "Who can you learn from if you want to know more about the Chinese Clay Art?", ["A. From Dr. Li Hua.", "B. From Ms. Huang Li.", "C. From Mr. Chen Yi.", "D. From Mr. Liang."], "B", ["Chinese Clay Art", "Who"], "Chinese Clay Art Course... Call Ms. Huang Li", "课程名定位到 Ms. Huang Li。", ["B：Ms. Huang Li 与 Chinese Clay Art 对应。", "A/C/D：对应其他课程。"], "中国泥塑课联系人是黄丽老师。"),
        q(49, "Where can we have the Biology Course?", ["A. In Room 109.", "B. In Room 305.", "C. In the yard of Children’s Palace.", "D. In Room 218."], "C", ["Biology Course", "Where"], "Biology Course... Place: In the yard of Children’s Palace.", "Biology Course 与 Place 定位。", ["C：地点与原文一致。", "A/B/D：其他课程地点。"], "生物课在少年宫院子里。"),
        q(50, "What can you learn in the Cooking Course?", ["A. How to cook.", "B. How to tell a story.", "C. How to take photos.", "D. How to make clay pieces."], "A", ["Cooking Course", "learn"], "Cooking Course... Learn some common dishes", "learn common dishes 即学习做饭。", ["A：How to cook 符合。", "B/C/D：对应其他课程。"], "烹饪课学习做常见菜。"),
        q(51, "Which course will last for the longest time?", ["A. Photography Course.", "B. Chinese Shadow Puppetry Course.", "C. Cooking Course.", "D. Biology Course."], "B", ["longest time", "course"], "Chinese Shadow Puppetry Course. 15:00—17:30, once a week for three months.", "选项中皮影戏课程持续三个月且每次 2.5 小时，最长。", ["B：在所给选项中持续时间最长。", "A/C/D：时间较短。"], "所给选项中中国皮影戏课程时间最长。")
      ]
    },
    {
      id: "2022真题C",
      title: "C. Ancient Chinese Names",
      meta: `${source2022} · C 篇 · 四选一`,
      paragraphs: [
        "Why did Chinese people have more than one name in ancient times?",
        "In ancient China, people’s names had three parts, their family name, given name and courtesy name. Take famous poet Li Bai for example. His family name, which came from his father’s name, was Li. His given name was Bai, and his courtesy name was Taibai.",
        "People used their given names when they were among family members. But in social life, they called each other by their courtesy names to show respect. This was mostly done among people of similar age. If you were talking about yourself, or if your elders were talking about you, the given name would be used instead of the courtesy name.",
        "Men would get their courtesy names when they turned 20. It was a symbol of adulthood. Women would get their courtesy names after getting married.",
        "One’s courtesy name often had something to do with one’s given name. For example, the name of Mencius was Meng Ke. His courtesy name was Ziyu. Both Ke and Ziyu mean “carriage”. Zhuge Liang’s given name was Liang, which means “bright”. His courtesy name was Kongming, which means “very bright”."
      ],
      questions: [
        q(52, "How many parts are there in people’s names in ancient China?", ["A. 3.", "B. 4.", "C. 5.", "D. 6."], "A", ["How many", "parts", "names"], "people’s names had three parts", "three parts 原词复现。", ["A：3 与原文一致。", "B/C/D：数量错误。"], "古人姓名有三部分。"),
        q(53, "What does the underlined word “courtesy” in Paragraph 2 mean in Chinese?", ["A. 名", "B. 姓氏", "C. 字", "D. 昵称"], "C", ["courtesy", "mean"], "His given name was Bai, and his courtesy name was Taibai.", "courtesy name 对应中文里的“字”。", ["C：字 符合古代称谓。", "A/B/D：不是 courtesy name。"], "courtesy name 指“字”。"),
        q(54, "Why did people call each other by their courtesy names in social life?", ["A. To show their love.", "B. To show their good relationship.", "C. To show their kindness.", "D. To show their respect."], "D", ["Why", "courtesy names", "social life"], "they called each other by their courtesy names to show respect", "to show respect 原词复现。", ["D：与原文一致。", "A/B/C：无依据。"], "社交中称字是为了表示尊重。"),
        q(55, "What would be used if your elders were talking about you according to the passage?", ["A. Family name.", "B. Nickname.", "C. Given name.", "D. Courtesy name."], "C", ["elders", "talking about you"], "if your elders were talking about you, the given name would be used", "elders 是定位词，given name 是答案。", ["C：given name 与原文一致。", "A/B/D：不符合。"], "长辈谈到你时会用名。"),
        q(56, "What’s the main idea of the passage?", ["A. The famous poet Li Bai.", "B. Three parts of ancient names.", "C. The ancient names and the modern names.", "D. The development of names."], "B", ["main idea", "passage"], "In ancient China, people’s names had three parts, their family name, given name and courtesy name.", "全文围绕古代姓名三部分展开。", ["B：覆盖全文。", "A：只是例子。", "C/D：范围或方向不准。"], "文章主要介绍古代姓名的三部分。")
      ]
    },
    ]);
})();

(function () {
  const source2023 = "2023年新疆维吾尔自治区中考英语真题";
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
    {
      id: "2023真题A",
      title: "A. Nang Ying Ying Xue",
      meta: `${source2023} · A 篇 · 判断正误`,
      paragraphs: [
        "In ancient China, people passed down plenty of classic stories from generation to generation. Here are the stories of two famous characters.",
        "One person is Che Yin. He was from a poor family, but he loved studying. He had to work in the daytime, so he could only study in the evening. However, there was a problem. He couldn’t afford a lamp. He didn’t worry about that in summer. In the evening, he caught some fireflies, put them in a bag and used it as a lamp. This lamp was not very bright, but Che Yin could do some reading by lamplight in the evening.",
        "The other person is Sun Kang. He was smart, but he was so poor that he couldn’t go to school. So he studied at home. He had to read just at night. Like Che Yin, he couldn’t buy a lamp. On snowy nights, he went out and read in the snow. Why? There was the light of snow outside.",
        "Later, people use “Nang Ying Ying Xue” to say that a strong spirit is very important no matter how hard the life is. When we are having a hard time in life, don’t lose heart. Never let life knock us down. Even in the hardest situation, there is hope that encourages us to move forward."
      ],
      questions: [
        q(26, "Che Yin could study from day to night.", ["T", "F"], "F", ["Che Yin", "day", "night"], "He had to work in the daytime, so he could only study in the evening.", "from day to night 与 only study in the evening 矛盾。", ["T：忽略 only。", "F：白天工作，只能晚上学习。"], "车胤白天工作，只能晚上读书。"),
        q(27, "Che Yin put fireflies in a bag as a lamp on summer evenings.", ["T", "F"], "T", ["Che Yin", "fireflies", "bag", "lamp"], "In the evening, he caught some fireflies, put them in a bag and used it as a lamp.", "fireflies / bag / lamp 原词复现。", ["T：与原文一致。", "F：无依据。"], "车胤把萤火虫放进袋子当灯。"),
        q(28, "Like Che Yin, Sun Kang could afford a lamp.", ["T", "F"], "F", ["Sun Kang", "afford", "lamp"], "Like Che Yin, he couldn’t buy a lamp.", "could afford 与 couldn’t buy 相反。", ["T：把 couldn’t buy 误读成 could afford。", "F：孙康也买不起灯。"], "孙康和车胤一样买不起灯。"),
        q(29, "Sun Kang did some reading by the light of snow outside at night.", ["T", "F"], "T", ["Sun Kang", "light of snow", "night"], "On snowy nights, he went out and read in the snow. Why? There was the light of snow outside.", "snowy nights 和 light of snow 是定位点。", ["T：与原文一致。", "F：无依据。"], "孙康在雪夜借雪光读书。"),
        q(30, "Che Yin and Sun Kang set a good example to us.", ["T", "F"], "T", ["Che Yin", "Sun Kang", "good example"], "a strong spirit is very important no matter how hard the life is", "主旨推断题，两人体现困境中坚持学习。", ["T：符合故事主旨。", "F：没有抓住最后主旨句。"], "他们体现了坚强精神，是好榜样。")
      ]
    },
    {
      id: "2023真题B",
      title: "B. New Ideas Change the World",
      meta: `${source2023} · B 篇 · 四选一`,
      paragraphs: [
        "The world is full of possibilities, so stay open to all the new ideas. Who knows? You might be the next person who can and will change the world!",
        "New Washing Machine. Remya Jose from an Indian village made a pedal-powered washing machine by herself. It is kinder to the clothes than the electric washing machine. The clothes can be conveniently washed even when the electricity is out. Also, it can help people to get some exercise while washing.",
        "New Blanket. One 13-year-old girl, Alyssa, got an idea from a Facebook story. She collects chip bags. For each bag, she starts by opening and washing it. Then she sticks all the bags together and turns them into nice blankets. So far she has turned 10,000 chip bags into 200 blankets. She also gave them away to homeless people all over Wales.",
        "New Armor. He Yanhong, a young woman from Chengdu, thinks nothing can go to waste. In February 2022, millions of people watched a video of her making a suit of armor. It looked amazing and fantastic. It was made of some old everyday things.",
        "New Artwork. An African artist Koffi made his artworks by using old phones. He took down the parts of old phones, painted them and made them into different artworks. Koffi helped people pay more attention to recycling."
      ],
      questions: [
        q(31, "Who invented the pedal-powered washing machine?", ["A. Koffi.", "B. He Yanhong.", "C. Alyssa.", "D. Remya Jose."], "D", ["pedal-powered washing machine"], "Remya Jose from an Indian village made a pedal-powered washing machine by herself.", "发明人定位到 New Washing Machine。", ["D：Remya Jose 与原文一致。", "A/B/C：对应其他发明。"], "脚踏式洗衣机由 Remya Jose 制作。"),
        q(32, "What’s the order of making the blankets? a. sticking chip bags together; b. washing chip bags; c. opening chip bags; d. collecting chip bags.", ["A. d→c→b→a", "B. a→b→c→d", "C. b→a→c→d", "D. c→a→b→d"], "A", ["order", "blankets", "sticking", "washing", "opening", "collecting"], "She collects chip bags. For each bag, she starts by opening and washing it. Then she sticks all the bags together", "原文顺序是 collects chip bags → opening → washing → sticks all the bags together，对应 d → c → b → a。", ["A：d→c→b→a 与原文顺序一致。", "B/C/D：步骤顺序与原文不一致。"], "制作顺序为：先收集 chip bags，再打开，再清洗，最后粘贴在一起。"),
        q(33, "Where does He Yanhong come from?", ["A. Africa.", "B. Chengdu.", "C. India.", "D. Wales."], "B", ["He Yanhong", "come from"], "He Yanhong, a young woman from Chengdu", "from Chengdu 原词复现。", ["B：Chengdu 与原文一致。", "A/C/D：对应其他人物或地点。"], "何艳红来自成都。"),
        q(34, "Why did Koffi make artworks with old phones?", ["A. To get some exercise.", "B. To make money as much as possible.", "C. To help homeless people.", "D. To help people pay more attention to recycling."], "D", ["Koffi", "old phones", "Why"], "Koffi helped people pay more attention to recycling.", "why 问目的，最后一句给出答案。", ["D：与原文一致。", "A/B/C：无依据或对应其他信息。"], "Koffi 用旧手机做艺术品是为了让人关注回收。"),
        q(35, "Where is the text probably from?", ["A. A story book.", "B. A newspaper.", "C. A novel.", "D. A guidebook."], "B", ["Where", "text", "from"], "The world is full of possibilities, so stay open to all the new ideas.", "文体是新发明/新创意介绍，更像报纸。", ["B：new ideas 的报道类文本符合 newspaper。", "A/C/D：不符合文体。"], "这类创新人物和事件介绍最可能来自报纸。")
      ]
    },
    {
      id: "2023真题C",
      title: "C. Teenagers and Marathons",
      meta: `${source2023} · C 篇 · 四选一`,
      paragraphs: [
        "The first marathon of the modern Olympic Games took place in 1896. Now marathon is a popular sport across China. On April 26, more than 300,000 runners took part in 26 marathon events nationwide, reported China Daily.",
        "Teenagers have also taken part in marathons actively. Xu Qian, a 15-year-old boy from Suqian, Jiangsu, loves running. He took first place in the 5-kilometer Happy Run of the Jingdong Suqian Marathon on April 2. For Xu, the race meant months of training and preparation. He ran about 30 to 40 kilometers each week ahead of the run. “The 800-meter run at school is more about speed while a marathon tests a runner’s endurance and psychological quality,” he said. When he felt tired during the race, he told himself to fight on.",
        "As well as one’s fighting spirit, kindness from the people also plays a part in helping runners get to the finish line. Li Zhouzi from Shanxi took part in a 3-kilometer Kid Run of the Berlin Marathon in Germany in 2019 when she was 10. The support from the people cheering along the course really encouraged her. “When things were hard, they cheered me on. The simple words ‘keep it up’ meant a lot to me and I was encouraged to keep going to the end,” Li said."
      ],
      questions: [
        q(36, "How many runners took part in 26 marathon events nationwide on April 26?", ["A. More than 3,000.", "B. More than 30,000.", "C. More than 300,000.", "D. More than 3,000,000."], "C", ["How many", "April 26", "runners"], "On April 26, more than 300,000 runners took part in 26 marathon events nationwide", "数字题锁定 April 26 和 runners。", ["C：more than 300,000 与原文一致。", "A/B/D：数量错误。"], "4 月 26 日有 30 多万名跑者参加。"),
        q(37, "Why did Xu Qian run 30 to 40 kilometers each week ahead of the run?", ["A. He wanted to help more runners.", "B. He had nothing to do but run.", "C. His father wanted him to do so.", "D. He trained in preparation for the race."], "D", ["Xu Qian", "30 to 40 kilometers", "Why"], "the race meant months of training and preparation. He ran about 30 to 40 kilometers each week ahead of the run.", "前句说明 training and preparation。", ["D：训练备赛，与原文一致。", "A/B/C：无依据。"], "他每周跑 30-40 公里是为了训练和准备比赛。"),
        q(38, "Which of the following best explains the underlined word “endurance” in Paragraph 2?", ["A. 想象力", "B. 创造力", "C. 忍耐力", "D. 自控力"], "C", ["endurance", "Paragraph 2"], "a marathon tests a runner’s endurance and psychological quality", "马拉松与速度相对，更考验耐力。", ["C：忍耐力/耐力符合 marathon 语境。", "A/B/D：语境不符。"], "endurance 在这里指耐力、忍耐力。"),
        q(39, "What encouraged Li Zhouzi to keep going to the end?", ["A. The people’s support.", "B. The finish line.", "C. Other runners’ help.", "D. The hard things."], "A", ["Li Zhouzi", "encouraged"], "The support from the people cheering along the course really encouraged her.", "encouraged 原词复现，主语是 support。", ["A：people's support 与原文一致。", "B/C/D：不是鼓励来源。"], "沿途人们的支持鼓励了她。"),
        q(40, "What is the best title for the text?", ["A. The Meaning of Marathon.", "B. The History of Marathon.", "C. Runners from China.", "D. Hope for the Future."], "A", ["best title", "text"], "As well as one’s fighting spirit, kindness from the people also plays a part in helping runners get to the finish line.", "全文从马拉松历史引入，重点讲青少年参赛中的坚持、准备和鼓励。", ["A：概括马拉松的意义。", "B：只抓首句历史。", "C：范围偏窄。", "D：过于宽泛。"], "文章重点不是历史，而是马拉松带来的坚持和支持意义。")
      ]
    },
    ]);
})();

(function () {
  const source2024 = "2024年新疆维吾尔自治区中考英语真题";
  const add = (items) => {
    const existing = new Set(passages.map((p) => p.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
    {
      id: "2024真题A",
      title: "A. Alexei's Life in China",
      meta: `${source2024} · A 篇 · 判断正误`,
      paragraphs: [
        "Alexei is a Russian. He came to China as an exchange student in Sichuan in 2015. From then on, he started to make vlogs about his life in China.",
        "Alexei traveled in over 70 Chinese cities on his vacations. He likes local foods there, such as Yunnan rice noodles, Sichuan hot pot, Beijing duck and so on. “China is a country with a long history. It has excellent culture. I am deeply attracted by it,” said Alexei.",
        "In 2018, Alexei returned to Russia. Though there are lots of amazing Chinese restaurants there, he couldn’t stop missing his days living in China. So he came back to China again in 2023.",
        "“I love China so much,” said Alexei, “My dream is to make great videos to show my love for China. And I will do what I can to help more foreigners to know a real China.” Alexei plans to visit more places this year. His next stop will be Xinjiang."
      ],
      questions: [
        q(16, "In 2015, Alexei was in Sichuan as an exchange student.", ["T", "F"], "T", ["2015", "Sichuan", "exchange student"], "He came to China as an exchange student in Sichuan in 2015.", "时间、地点和身份全部原词复现。", ["T：2015 / Sichuan / exchange student 与原文一致。", "F：没有依据。"], "原文明确说 2015 年他作为交换生来到四川。"),
        q(17, "Alexei likes Sichuan hot pot.", ["T", "F"], "T", ["likes", "Sichuan hot pot"], "He likes local foods there, such as Yunnan rice noodles, Sichuan hot pot, Beijing duck and so on.", "Sichuan hot pot 在例子中直接出现。", ["T：Sichuan hot pot 是他喜欢的食物之一。", "F：忽略了 such as 后的列举。"], "原文列举了 Sichuan hot pot，所以正确。"),
        q(18, "There are lots of Chinese restaurants in Russia.", ["T", "F"], "T", ["lots of", "Chinese restaurants", "Russia"], "Though there are lots of amazing Chinese restaurants there", "there 指代前文 Russia。", ["T：there 指 Russia，句意一致。", "F：没有抓住代词 there 的指代。"], "他回到俄罗斯后，那里有很多中餐馆。"),
        q(19, "Alexei came back to China in 2018.", ["T", "F"], "F", ["came back", "China", "2018"], "So he came back to China again in 2023.", "题干把 2023 偷换成 2018。", ["T：混淆 returned to Russia in 2018 和 came back to China in 2023。", "F：回中国是 2023 年。"], "2018 年是回俄罗斯，不是回中国。"),
        q(20, "For his next stop, Alexei will go to Yunnan.", ["T", "F"], "F", ["next stop", "Yunnan"], "His next stop will be Xinjiang.", "next stop 是定位词，地点被偷换。", ["T：把 Xinjiang 看成 Yunnan。", "F：原文说下一站是 Xinjiang。"], "下一站是新疆，不是云南。")
      ]
    },
    {
      id: "2024真题B",
      title: "B. Four Chinese People with Great Achievements",
      meta: `${source2024} · B 篇 · 四选一`,
      paragraphs: [
        "Here are four Chinese people with great achievements.",
        "Mei Lanfang. Birth year: 1894. Death year: 1961. Birthplace: Beijing. Position: Artist. Mei Lanfang was the first to introduce Beijing Opera to foreigners and made its highly successful tours to foreign countries. He gave his whole life to the art of Beijing Opera.",
        "Qian Xuesen. Birth year: 1911. Death year: 2009. Birth place: Shanghai. Position: Scientist. Qian Xuesen was considered as “the father of China’s space technology” for his great achievements. “As a Chinese scientist, my life purpose is to serve the people,” he said.",
        "Zhang Guimei. Birth year: 1957. Birth place: Heilongjiang. Position: Teacher. Zhang Guimei has spent over 40 years helping young girls in the mountain areas to get free schooling. She was given the title “Role Model of the Times” in 2020.",
        "Wang Yaping. Birth year: 1980. Birth place: Shandong. Position: Astronaut. Wang Yaping is the first Chinese woman to enter a space station and is also the first Chinese woman to do a spacewalk. She took a spacewalk on the night of November 7, 2021."
      ],
      questions: [
        q(21, "When was Mei Lanfang born?", ["A. In 1894.", "B. In 1911.", "C. In 1957.", "D. In 1980."], "A", ["Mei Lanfang", "born"], "Mei Lanfang. Birth year: 1894.", "人物名和 Birth year 定位。", ["A：1894 与 Mei Lanfang 对应。", "B/C/D：对应其他人物。"], "梅兰芳出生年份是 1894。"),
        q(22, "What was Qian Xuesen’s life purpose?", ["A. To do a space walk.", "B. To serve the people.", "C. To help young girls.", "D. To introduce Beijing Opera."], "B", ["Qian Xuesen", "life purpose"], "my life purpose is to serve the people", "life purpose 原词复现。", ["B：serve the people 与原文一致。", "A/C/D：分别对应其他人物或无关信息。"], "钱学森的人生目标是为人民服务。"),
        q(23, "What is Zhang Guimei’s job?", ["A. An artist.", "B. A scientist.", "C. An astronaut.", "D. A teacher."], "D", ["Zhang Guimei", "job"], "Zhang Guimei. Position: Teacher.", "job 对应 Position。", ["D：Teacher 与原文一致。", "A/B/C：对应其他人物。"], "张桂梅的职位是教师。"),
        q(24, "What is Wang Yaping’s birth place?", ["A. Heilongjiang.", "B. Beijing.", "C. Shandong.", "D. Shanghai."], "C", ["Wang Yaping", "birth place"], "Wang Yaping. Birth place: Shandong.", "人物名和 birth place 定位。", ["C：Shandong 与 Wang Yaping 对应。", "A/B/D：对应其他人物。"], "王亚平出生地是山东。"),
        q(25, "Where could we find this passage?", ["A. In a dictionary.", "B. In a magazine.", "C. In a novel.", "D. In a diary."], "B", ["Where", "find", "passage"], "Here are four Chinese people with great achievements.", "出处题看文体：人物成就介绍更像杂志文章。", ["A：不是词典释义。", "B：人物专题介绍常见于杂志。", "C/D：不是小说或日记。"], "这类人物介绍最可能出现在杂志。")
      ]
    },
    {
      id: "2024真题C",
      title: "C. Mantou at the French Bread Festival",
      meta: `${source2024} · C 篇 · 四选一`,
      paragraphs: [
        "Mantou Chinese steamed buns, appeared in the bread festival in Paris from May 7 to May 16.",
        "On May 9, a Chinese attending the festival put a video on Douyin. In the video, a line of mantou was lying among the baked foods on show.",
        "The video quickly went viral on the Internet. In no time, “Chinese Steamed Buns Compete at the French Bread Festival” became a hot topic. It brought much attention to mantou. As a main food, it is seen every day on Chinese dinner tables. It is amazing that mantou had such a chance to go to France and compete with the foods from different countries.",
        "Mantou is made with wheat flour and yeast. And then it is steamed for about half an hour. When it is freshly cooked, it produces a nice smell and feels soft. And most people cannot wait to have a bite. Mantou can be also enjoyed in many ways. For example, it can be fried or baked to golden brown.",
        "Mantou, a traditional Chinese food, now serves more people around the world. Can you see the smile on its face?"
      ],
      questions: [
        q(26, "When did a Chinese put a video about mantou on Douyin?", ["A. On May 6.", "B. On May 7.", "C. On May 9.", "D. On May 16."], "C", ["When", "video", "Douyin"], "On May 9, a Chinese attending the festival put a video on Douyin.", "When 问时间，On May 9 原词复现。", ["C：On May 9 与原文一致。", "A/B/D：时间错误。"], "视频发布在 5 月 9 日。"),
        q(27, "What does the underlined words “went viral” in Paragraph 3 probably mean?", ["A. Went bad.", "B. Was forgotten.", "C. Got lost.", "D. Became popular."], "D", ["went viral", "Paragraph 3"], "became a hot topic. It brought much attention to mantou.", "went viral 后面解释为 hot topic 和 much attention。", ["D：Became popular 与 became a hot topic 同义。", "A/B/C：与语境相反。"], "went viral 表示走红、变得流行。"),
        q(28, "Which of the following is NOT true about mantou?", ["A. It is made with wheat flour and yeast.", "B. It is steamed for about half an hour.", "C. It can be enjoyed in only one way.", "D. It can be fried or baked to golden brown."], "C", ["NOT true", "mantou"], "Mantou can be also enjoyed in many ways. For example, it can be fried or baked to golden brown.", "NOT true 要找与原文相反的选项。", ["A/B/D：都与原文一致。", "C：only one way 与 many ways 相反。"], "馒头有多种吃法，不是只有一种。"),
        q(29, "What kind of feeling does the writer probably show by asking “Can you see the smile on its face”?", ["A. Being proud.", "B. Being sorry.", "C. Being funny.", "D. Being worried."], "A", ["feeling", "smile", "face"], "Mantou, a traditional Chinese food, now serves more people around the world. Can you see the smile on its face?", "传统中国食物走向世界，语气体现自豪。", ["A：being proud 符合语境。", "B/C/D：与积极语气不符。"], "作者用拟人化的 smile 表达自豪。")
      ]
    },
    {
      id: "2024真题D",
      title: "D. Animals Can Play Jokes",
      meta: `${source2024} · D 篇 · 四选一`,
      paragraphs: [
        "Laughter is a universal language for humans. It can help people to get on well with others. As children, we laugh when our parents make faces. Then we start to make others laugh like this. That’s how we learn to play jokes. But is playing jokes only humans’ ability? Scientists have found that some animals also have the ability.",
        "Sometimes we see dogs play jokes on each other. They come near slowly and then quickly run away. They may just want to have fun. It is also said that they could deal with their stress this way.",
        "Scientists say they have watched young apes play jokes. The young apes quietly follow adult apes and touch them secretly to surprise them. Then they playfully wait and watch what the adults would do. This action is similar to what human children do.",
        "Next time, when you find your pets doing something strange around you, maybe they are playing jokes with you."
      ],
      questions: [
        q(30, "As a universal language, laughter can help to________ in the passage.", ["A. surprise others", "B. follow adults quietly", "C. come near slowly", "D. get on well with others"], "D", ["universal language", "laughter", "help"], "It can help people to get on well with others.", "laughter 后一句直接给作用。", ["D：get on well with others 与原文一致。", "A/B/C：是后文动物行为，不是 laughter 的作用。"], "笑能帮助人们与别人相处融洽。"),
        q(31, "How many kinds of animals are mentioned in the passage?", ["A. One.", "B. Two.", "C. Three.", "D. Four."], "B", ["How many", "animals"], "dogs play jokes... young apes play jokes", "数动物种类：dogs 和 apes。", ["B：文中具体提到 dogs 和 apes 两类。", "A/C/D：数量不符。"], "文中提到狗和猿两类动物。"),
        q(32, "What do the young apes do after they touch the adults secretly?", ["A. They playfully wait and watch.", "B. They run away quickly.", "C. They laugh loudly.", "D. They make faces."], "A", ["young apes", "after", "touch"], "Then they playfully wait and watch what the adults would do.", "after 对应 Then，答案原词复现。", ["A：playfully wait and watch 与原文一致。", "B/C/D：无依据或对应其他信息。"], "小猿偷偷触碰成年猿后会调皮地等待观察。"),
        q(33, "What does the passage mainly talk about?", ["A. We laugh when our parents make faces.", "B. Some animals can play jokes.", "C. Dogs play jokes to deal with their stress.", "D. Young apes like playing jokes with adults."], "B", ["mainly talk", "passage"], "Scientists have found that some animals also have the ability.", "主旨题看首段转折问题和全文例子。", ["A/C/D：都是局部细节。", "B：覆盖 dogs 和 apes 两个例子，概括全文。"], "全文主要说明一些动物也会开玩笑。")
      ]
    },
    {
      id: "素养一模A",
      title: "A. The King and the Chessboard",
      meta: "2026年新疆中考素养第一次模拟考试英语 · A 篇 · 判断正误",
      paragraphs: [
        "Long long ago, there was a king in India who loved to play. One day, he said, “I want something fun to play with. If anyone can give it to me, I will give this person what he wants.”",
        "Soon, a clever young man gave the king a kind of chess. The chessboard had 64 squares. The chess pieces had names like king, ministers, elephants, and horses. It was very interesting. The king never got tired of it.",
        "The king said to the man, “What do you want? I can give you anything.” The man said, “I only want some wheat.” The king said, “No problem. How much do you want?”",
        "The man answered, “Just put one grain of wheat on the first square, two on the second, four on the third, and eight on the fourth. Keep doubling the number until all 64 squares are full.”",
        "The king thought it was easy and accepted at once. But soon he found it was not simple at all. At first, one grain, then two, then four... It didn’t seem much. But the number grew very fast. By the 20th square, one bag of wheat was not enough. The king asked his officers to bring more and more bags. But the chessboard was like a big hole. Even all the wheat in the whole country was not enough.",
        "The king was very surprised but he did not know why. Do you know the reason?"
      ],
      questions: [
        q(36, "The king wanted something fun to play with.", ["T", "F"], "T", ["king", "something fun"], "I want something fun to play with.", "题干与原文直接一致。", ["T：原词复现。", "F：无依据。"], "国王确实想要好玩的东西。"),
        q(37, "The young man asked for some money and wheat.", ["T", "F"], "F", ["money", "wheat"], "The man said, “I only want some wheat.”", "only 是关键，题干多加了 money。", ["T：多出 money。", "F：原文只要 wheat。"], "年轻人只要小麦，不要钱。"),
        q(38, "The king thought the man's request was easy at first.", ["T", "F"], "T", ["easy", "at first"], "The king thought it was easy and accepted at once.", "easy at first 直接定位。", ["T：与原文一致。", "F：忽略 at first。"], "国王一开始认为很容易。"),
        q(39, "The king felt upset when he found he couldn't put enough wheat on the chessboard.", ["T", "F"], "F", ["upset", "wheat"], "The king was very surprised but he did not know why.", "题干把 surprised 偷换成 upset。", ["T：情绪词错误。", "F：原文是 surprised。"], "国王是惊讶，不是沮丧。"),
        q(40, "One bag of wheat was enough for the 20th square of the chessboard.", ["T", "F"], "F", ["one bag", "20th square"], "By the 20th square, one bag of wheat was not enough.", "not enough 与 enough 相反。", ["T：忽略 not。", "F：原文说不够。"], "到第20格一袋小麦已经不够。")
      ]
    },
    {
      id: "素养一模B",
      title: "B. Summer Camp",
      meta: "2026年新疆中考素养第一次模拟考试英语 · B 篇 · 四选一",
      visual: "assets/mock-2026-suyang-b-camp.png",
      chart: {
        title: "Summer Camp Information",
        columns: ["项目", "Day Camp", "Overnight Camp"],
        rows: [
          ["Age", "7-12", "7-12"],
          ["Learning", "Children learn English through lots of fun activities.", "Children learn English through lots of fun activities."],
          ["Guides", "English speakers from the US and the UK", "English speakers from the US and the UK"],
          ["Dates", "Monday-Friday: July 12-16; July 19-23; July 26-30", "Sunday-Friday: July 11-16; July 18-23; July 25-30"],
          ["Price", "$300 each week", "$500 each week"],
          ["Included", "Healthy snacks and a delicious lunch", "Comfortable rooms with breakfast, lunch, dinner and snacks included"],
          ["Time", "Monday-Friday: 8 a.m.-6:00 p.m.", "Sunday-Friday: 8 p.m.-7:00 a.m."],
          ["Students", "About 20 students each week", "About 15 students each week"]
        ],
        note: "Buy one ticket, get a 10% discount on the second one. Email: Campactivities@summercamp.com"
      },
      paragraphs: [
        "Summer Camp. Age: 7-12. Children learn English through lots of fun activities. Camp guides are English speakers from the US and the UK.",
        "Day Camp: Monday-Friday, July 12-16, July 19-23, July 26-30. Price each week: $300. Healthy snacks and a delicious lunch. Monday-Friday: 8 a.m.-6:00 p.m. About 20 students each week.",
        "Overnight Camp: Sunday-Friday, July 11-16, July 18-23, July 25-30. Price each week: $500. Stay in comfortable rooms with breakfast, lunch, dinner and snacks included. Sunday-Friday: 8 p.m.-7:00 a.m. About 15 students each week.",
        "Buy one ticket, get a 10% discount on the second one. Email us at Campactivities@summercamp.com."
      ],
      questions: [
        q(41, "What do children do at the camp?", ["A. Learn math and science.", "B. Play sports all day.", "C. Watch movies.", "D. Learn English through fun activities."], "D", ["children", "camp"], "Children learn English through lots of fun activities.", "题干问活动内容，首段直接给出。", ["D：与原文一致。", "A/B/C：无依据。"], "营地通过有趣活动学英语。"),
        q(42, "The camp guides are English speakers from ________.", ["A. the US and the UK", "B. China and Japan", "C. Australia and Canada", "D. France and Germany"], "A", ["camp guides", "from"], "Camp guides are English speakers from the US and the UK.", "from 后直接给答案。", ["A：原词复现。", "B/C/D：国家错误。"], "营地指导来自美国和英国。"),
        q(43, "What time does the Day Camp start every day?", ["A. 7:00 a.m.", "B. 7:00 p.m.", "C. 8:00 a.m.", "D. 8:00 p.m."], "C", ["Day Camp", "start"], "Monday-Friday: 8 a.m.-6:00 p.m.", "Day Camp 的起始时间是 8 a.m.。", ["C：8:00 a.m. 与原文一致。", "A/B/D：时间不符。"], "日间营每天上午8点开始。"),
        q(44, "If you buy two tickets, you can get a ________ discount on the second one.", ["A. 5%", "B. 10%", "C. 15%", "D. 20%"], "B", ["two tickets", "discount"], "Buy one ticket, get a 10% discount on the second one.", "discount 前的数字是关键。", ["B：10% 原词复现。", "A/C/D：数字错误。"], "第二张票打九折，即优惠10%。")
      ]
    },
    {
      id: "素养一模C",
      title: "C. China's Express Delivery",
      meta: "2026年新疆中考素养第一次模拟考试英语 · C 篇 · 四选一",
      paragraphs: [
        "China’s express delivery service is very big and fast. Every day, more than 500 million packages are sent all around the country. That means nearly 6,000 packages are sent each second.",
        "How does it work so quickly? Technology is the key. In the past, workers did almost everything by hand. Now, machines and computers help with most of the work. This makes sending packages faster and cheaper than before.",
        "First, people used to write addresses on the paper. Now, they use electronic orders. For example, when someone wants to send a package by using the phone, the computer system quickly plans the whole trip: which courier will pick it up, which car will carry it, and what time it will arrive. This saves a lot of time. Also, machines now help sort packages. In sorting centers, packages move fast on the belts--about 240 every minute! Machines scan each one and send it to the right place. Not many people are needed here. In the past, many workers had to stand and sort everything by hand. It was much slower. What’s more, some companies now use more advanced tools like robots and self-driving cars. These machines can deliver packages by themselves in many cities. They help save time and money.",
        "All these changes show how technology makes China’s express delivery fast and smart. It helps people get their things more quickly and easily."
      ],
      questions: [
        q(45, "What is the main idea of the passage?", ["A. The history of express delivery services in China.", "B. Why China sends so many packages each year.", "C. How Chinese couriers work hard every day.", "D. How technology makes China's express delivery fast and smart."], "D", ["main idea", "technology", "express delivery"], "All these changes show how technology makes China’s express delivery fast and smart.", "末段总结全文中心。", ["D：覆盖全文。", "A/B/C：角度过窄。"], "文章主要讲科技让中国快递又快又智能。"),
        q(46, "According to the passage, about ________ packages can be sorted each minute in sorting centers.", ["A. 240", "B. 500 million", "C. 6,000", "D. 100"], "A", ["packages", "sorted", "minute"], "In sorting centers, packages move fast on the belts--about 240 every minute!", "minute 和 sorting centers 定位数字。", ["A：240 与原文一致。", "B/C：对应每天/每秒数据。", "D：无依据。"], "分拣中心每分钟约240个包裹。"),
        q(47, "What does the underlined word “advanced” mean in Paragraph 2?", ["A. Simple and cheap.", "B. Old and slow.", "C. Modern and highly developed.", "D. Popular and common."], "C", ["advanced", "tools"], "advanced tools like robots and self-driving cars", "robots 和 self-driving cars 说明 advanced 指先进的。", ["C：现代且高度发展符合语境。", "A/B/D：不符合。"], "advanced 在这里表示先进的。"),
        q(48, "What can we infer from the passage?", ["A. Robots are used in all Chinese cities for delivery.", "B. Electronic orders are not popular in China today.", "C. Self-driving cars are the only technology used in express delivery.", "D. In the past, express delivery was slower because it depended more on people."], "D", ["infer", "past", "slower"], "In the past, many workers had to stand and sort everything by hand. It was much slower.", "推断题要从过去和现在对比得出。", ["D：合理推断。", "A/B/C：过于绝对或相反。"], "过去更多靠人工，所以更慢。"),
        q(49, "What is the author's attitude towards the development of express delivery in China?", ["A. Worried.", "B. Doubtful.", "C. Proud.", "D. Uninterested."], "C", ["attitude", "development"], "very big and fast... fast and smart... more quickly and easily", "积极评价词体现自豪态度。", ["C：proud 符合积极语气。", "A/B/D：与语气不符。"], "作者对中国快递发展持自豪、肯定态度。")
      ]
    },
    {
      id: "素养一模D",
      title: "D. Ways to Learn a New Language",
      meta: "2026年新疆中考素养第一次模拟考试英语 · D 篇 · 四选一",
      paragraphs: [
        "Learning a new language is not easy. Here are some good ideas on the best ways to learn a new language.",
        "Make new friends. Friendship is one of the best ways to learn a foreign language. It helps you get used to saying the new words. You can communicate with your friends in local cafes, bars and restaurants and slowly start to learn the language you want. The great part is that you can use the language freely.",
        "Watch movies. If you want to learn a language at home, try watching foreign movies. If you don’t know many words, write down the new words you hear and guess the meaning. Look them up in the dictionary later. It can be fun!",
        "Use the Internet. The Internet is a great place. If you want to learn a foreign language, you can learn it through Internet! You can use computer programs, watch videos, read stories and so on. The Internet can help you do well in learning a foreign language.",
        "Teach yourself. Use a little time each day to write a sentence you want to know. Translate the sentence and try to say it again and again. If you have a friend who also learns the language, talk with them when you meet. This is a good way to learn better."
      ],
      questions: [
        q(50, "Why is friendship a good way to learn a foreign language?", ["A. It helps you get used to saying the new words.", "B. It lets you go to cafes and bars.", "C. It helps you learn to use the dictionary.", "D. It makes you speak quickly."], "A", ["friendship", "why"], "It helps you get used to saying the new words.", "why 问原因，helps 后给答案。", ["A：与原文一致。", "B/C/D：不是主要原因。"], "交朋友能帮助习惯说新词。"),
        q(51, "When watching a foreign movie, what should you do if you don’t know many words?", ["A. Stop watching the movie.", "B. Write down new words and guess their meanings.", "C. Look up words in the dictionary right away.", "D. Ask a friend for help."], "B", ["foreign movie", "don't know many words"], "write down the new words you hear and guess the meaning", "题干复现 if you don’t know many words。", ["B：与原文一致。", "C：原文说 later，不是 right away。", "A/D：无依据。"], "看外语电影遇到生词先写下并猜意思。"),
        q(52, "What should you do each day when teaching yourself?", ["A. Watch a foreign movie.", "B. Only look up words in the dictionary.", "C. Meet a friend who learns the language.", "D. Write a sentence you want to know."], "D", ["each day", "teaching yourself"], "Use a little time each day to write a sentence you want to know.", "each day 定位最后一段。", ["D：原词复现。", "A/B/C：不对应 each day 的建议。"], "每天花一点时间写一句想知道的话。"),
        q(53, "What is the main idea of the passage?", ["A. How to make friends.", "B. Using the Internet for learning.", "C. Good ways to learn a new language.", "D. Watching movies in foreign languages."], "C", ["main idea", "passage"], "Here are some good ideas on the best ways to learn a new language.", "首段直接点明主题。", ["C：覆盖全文四个方法。", "A/B/D：只覆盖局部方法。"], "全文介绍学习新语言的好方法。")
      ]
    },
    {
      id: "质量诊断A",
      title: "A. Grandpa Lin Learns English",
      meta: "2026年3月新疆九年级学业质量诊断英语 · A 篇 · 判断正误",
      paragraphs: [
        "Grandpa Lin is an 80-year-old man in Urumqi. He learns English in his daily life. He takes two English courses at a university. There are many English books by his bed. And he always tries to talk in English with others.",
        "His English learning started ten years ago. On a train to Beijing, he met a young British couple. He used body language and simple words to talk with them. They talked happily and exchanged their WeChat. After returning home, Grandpa Lin received a message from the couple. It was written in both English and Chinese. They encouraged him to keep learning English.",
        "Now, Grandpa Lin often talks with friends in English on WeChat. Although he is old, he is very active in learning English. He’s such a great example of the saying, “It’s never too old to study.”"
      ],
      questions: [
        q(36, "Grandpa Lin takes two Chinese courses at a university.", ["T", "F"], "F", ["two Chinese courses"], "He takes two English courses at a university.", "Chinese 与 English 被偷换。", ["T：课程类型错误。", "F：原文是 English courses。"], "林爷爷上的是两门英语课。"),
        q(37, "Grandpa Lin started learning English ten years ago.", ["T", "F"], "T", ["started", "ten years ago"], "His English learning started ten years ago.", "题干与原文一致。", ["T：原词复现。", "F：无依据。"], "他十年前开始学英语。"),
        q(38, "Grandpa Lin first talked with the British couple using only body language.", ["T", "F"], "F", ["only body language"], "He used body language and simple words to talk with them.", "only 是陷阱，原文还有 simple words。", ["T：忽略 simple words。", "F：不只是肢体语言。"], "他用了肢体语言和简单词语。"),
        q(39, "The British couple wrote a letter to encourage Grandpa Lin to keep learning English.", ["T", "F"], "F", ["letter", "encourage"], "Grandpa Lin received a message from the couple.", "letter 与 message 不一致。", ["T：信息形式错误。", "F：原文是 message。"], "英国夫妇发的是消息，不是信。"),
        q(40, "Grandpa Lin’s story tells us it’s never too old to study.", ["T", "F"], "T", ["never too old", "study"], "It’s never too old to study.", "结尾主旨句直接复现。", ["T：与主旨一致。", "F：无依据。"], "故事说明活到老学到老。")
      ]
    },
    {
      id: "质量诊断B",
      title: "B. Internet Pioneers",
      meta: "2026年3月新疆九年级学业质量诊断英语 · B 篇 · 四选一",
      visual: "assets/mock-2026-zhiliang-b-pioneers.png",
      chart: {
        title: "Internet Pioneers",
        columns: ["人物", "地点/身份", "主要信息", "作用"],
        rows: [
          ["He Jiaolong", "Worked for the government in Xinjiang", "She sold local farm products and introduced Xinjiang through the Internet.", "She showed the spirit of serving people with new ideas and selfless devotion."],
          ["Li Junyong", "A food seller in Jingdezhen", "He is known as “Chicken Cutlet Brother”. His chicken is cheap and his words are funny.", "He is a new “name card” for his hometown and helps it develop."],
          ["Wang Jingyang", "A dough figurine artist in Wuhu, Anhui", "He can make many kinds of popular characters, such as Monkey King and the Little Prince.", "His love helps keep this art form alive in modern times."],
          ["Li Yayun", "From Weihui, Henan", "She sells daily products like tofu and vegetables to help the old in the village.", "She shows how the Internet can bring new life to the countryside."]
        ],
        note: "Common people are using the Internet to become pioneers of changing and making life better."
      },
      paragraphs: [
        "Now, with computers and phones, common people are using the Internet to become pioneers of changing and making life better.",
        "He Jiaolong worked for the government in Xinjiang. Her life was closely connected with Xinjiang’s development. She sold local farm products and introduced Xinjiang through the Internet. She showed the spirit of serving people with new ideas and selfless devotion.",
        "Li Junyong is a food seller in Jingdezhen who is known as “Chicken Cutlet Brother”. His chicken is cheap and his words are funny. People say his chicken brings them joy. He is a new “name card” for his hometown and helps it develop.",
        "Wang Jingyang is a dough figurine artist in Wuhu, Anhui. He can make many kinds of popular characters, such as Monkey King and the Little Prince. His works let visitors wait to buy this traditional art. His love helps keep this art form alive in modern times.",
        "Li Yayun is from Weihui, Henan. She sells daily products like tofu and vegetables to help the old in the village. She records her life with them and sells farm products online. She shows how the Internet can bring new life to the countryside."
      ],
      questions: [
        q(41, "Where did He Jiaolong work?", ["A. In Jingdezhen.", "B. In Anhui.", "C. In Xinjiang.", "D. In Henan."], "C", ["He Jiaolong", "work"], "He Jiaolong worked for the government in Xinjiang.", "人物名定位第一栏。", ["C：Xinjiang 与原文一致。", "A/B/D：对应其他人物地点。"], "贺娇龙在新疆工作。"),
        q(42, "How does Li Junyong talk to his customers?", ["A. In a funny way.", "B. In a serious way.", "C. In an impolite way.", "D. In a direct way."], "A", ["Li Junyong", "talk"], "his words are funny", "words are funny 对应说话方式。", ["A：funny way 与原文一致。", "B/C/D：无依据。"], "李俊永说话有趣。"),
        q(43, "What kind of characters does Wang Jingyang make?", ["A. Real people in daily life.", "B. Animals like dogs and cats.", "C. Many popular characters.", "D. Vegetables and tofu."], "C", ["Wang Jingyang", "characters"], "He can make many kinds of popular characters", "popular characters 原词复现。", ["C：与原文一致。", "A/B/D：不符。"], "王景阳制作很多流行角色。"),
        q(44, "Why does Li Yayun sell daily products?", ["A. She wants to become rich.", "B. She wants to help the old.", "C. She wants to be famous.", "D. She has nothing to do."], "B", ["Li Yayun", "why", "daily products"], "She sells daily products like tofu and vegetables to help the old in the village.", "to help 表目的。", ["B：与原文一致。", "A/C/D：无依据。"], "她卖日用品是为了帮助老人。"),
        q(45, "Where could we probably read this passage?", ["A. A story book.", "B. A magazine.", "C. A travel guide.", "D. A dictionary."], "B", ["Where", "read"], "common people are using the Internet to become pioneers", "人物事迹介绍类文本常见于杂志。", ["B：magazine 符合。", "A/C/D：文体不符。"], "这类人物专题最可能出现在杂志。")
      ]
    },
    {
      id: "质量诊断C",
      title: "C. Chinese Tea Shops in the US",
      meta: "2026年3月新疆九年级学业质量诊断英语 · C 篇 · 四选一",
      paragraphs: [
        "Many people waited in line outside a new Mixue store in New York. It was cold, but they still waited. This shows that Chinese tea drinks are becoming popular in the US. Mixue sells cheap drinks, like a $1.19 ice cream. This is very different from expensive local coffee. But low price is not the only reason for its success.",
        "Other Chinese tea shops like HeyTea also have long lines. Their drinks cost about $10. One reason is that young Americans are interested in foods from other countries. For example, HeyTea’s store in Times Square sells over 2,000 cups every day. That is much more than a usual coffee shop.",
        "These tea shops are growing fast. HeyTea had only a few stores in the US at the start of this year. Now it has over 30 shops. A worker at HeyTea said, “You might think most customers are Asians, but in fact, we have people from all over the world.” These shops want to be more international. They hire local people so that everyone can talk easily.",
        "For Chinese people living in the US, these drinks remind people of home. One customer said, “Seeing Mixue here makes me feel closer to home.” For others, it is about trying new tastes. A student said, “You can try different things like grass jelly. They are very nice.” These shops also help people from different cultures know one another. As one young customer said, “People get to see a different side of the world.”"
      ],
      questions: [
        q(46, "How much does an ice-cream at Mixue usually cost in the US?", ["A. $1.19.", "B. $10.", "C. $20.", "D. $30."], "A", ["Mixue", "ice-cream", "cost"], "Mixue sells cheap drinks, like a $1.19 ice cream.", "数字题直接定位价格。", ["A：$1.19 与原文一致。", "B/C/D：价格错误。"], "蜜雪冰淇淋通常1.19美元。"),
        q(47, "Why are Chinese tea drinks becoming popular in the US in Paragraph 2?", ["A. Because its drinks are very cheap.", "B. Because it has many stores in the US.", "C. Because young Americans like foreign foods.", "D. Because people can try different things."], "C", ["Why", "Paragraph 2", "popular"], "One reason is that young Americans are interested in foods from other countries.", "Paragraph 2 的原因句直接给答案。", ["C：同义替换。", "A/B/D：对应其他段落或不完整。"], "年轻美国人对外国食物感兴趣。"),
        q(48, "What does the word “hire” in Paragraph 3 probably mean?", ["A. To talk with someone.", "B. To kick someone off.", "C. To be friends with someone.", "D. To give a job to someone."], "D", ["hire", "Paragraph 3"], "They hire local people so that everyone can talk easily.", "hire local people 语境是雇用当地人。", ["D：give a job to someone 符合。", "A/B/C：不符。"], "hire 表示雇用。"),
        q(49, "What is the main idea of the last paragraph?", ["A. Chinese tea drinks are only popular among Chinese people.", "B. These drinks remind people of home and help share cultures.", "C. American students do not like Chinese tea drinks.", "D. It is very hard to find Chinese tea shops in the US now."], "B", ["main idea", "last paragraph"], "these drinks remind people of home... help people from different cultures know one another", "最后一段围绕思乡和文化交流展开。", ["B：覆盖段落中心。", "A/C/D：与原文不符。"], "最后一段讲饮品让人想家并促进文化交流。")
      ]
    },
    {
      id: "质量诊断D",
      title: "D. Weight Management Year",
      meta: "2026年3月新疆九年级学业质量诊断英语 · D 篇 · 四选一",
      paragraphs: [
        "Now being too heavy has become a new problem in China. To help people stay healthy, the government started a “Weight Management Year” activity from 2025 to 2027. The main purpose is to help people live a healthier life.",
        "First, it is important for people to know their Body Mass Index. A healthy adult’s BMI should be between 18.5 and 24. If it is between 24 and 28, he is overweight. If it is 28 or higher, he is too heavy.",
        "Next, eating healthy food and exercising are important. Try healthy foods like fresh vegetables, fish, chicken, or beans. Also, remember not to eat too much salt and oil. After meals, you can take a walk for at least 30 minutes. Experts suggest doing activities like walking, riding bikes, or dancing for 150 to 300 minutes each week. If you sit for a long time studying, stand up and stretch your body for 3 to 5 minutes every hour.",
        "What’s more, schools and communities are helping. Schools now make sure students get at least two hours of exercise every day. Hospitals have set up weight control centers that give eating plans, exercise tips, and even traditional Chinese ways.",
        "Weight control is not about being perfect. Even small changes, like having less milk tea or taking a short walk, can help us build a healthier future."
      ],
      questions: [
        q(50, "The main purpose of the “Weight Management Year” activity is to ________.", ["A. help people know their BMI", "B. stop people from eating fried food", "C. make schools give more exercise", "D. help people live a healthier life"], "D", ["main purpose", "Weight Management Year"], "The main purpose is to help people live a healthier life.", "main purpose 后直接给答案。", ["D：原词复现。", "A/C：只是措施。", "B：无依据。"], "活动目的是帮助人们更健康地生活。"),
        q(51, "If a person's BMI is 26, what can we know from the passage?", ["A. He is healthy.", "B. He is overweight.", "C. He is too heavy.", "D. He is of medium build."], "B", ["BMI", "26"], "If it is between 24 and 28, he is overweight.", "26 在 24-28 之间。", ["B：overweight 正确。", "A/C/D：范围不符。"], "BMI 26 属于超重。"),
        q(52, "Which of the following statement is TRUE?", ["A. After meals, you should take a walk for at least 20 minutes.", "B. Stand up and stretch your body for 3 to 5 minutes every day.", "C. Schools make sure students get at least 2 hours of exercise every day.", "D. Having more milk tea is a good small change."], "C", ["TRUE", "exercise"], "Schools now make sure students get at least two hours of exercise every day.", "TRUE 题逐项核对。", ["C：与原文一致。", "A：应为30分钟。", "B：应为每小时。", "D：应为 less milk tea。"], "学校确保学生每天至少运动两小时。"),
        q(53, "What is the best title for the passage?", ["A. China’s Weight Management Year", "B. Why Exercise Is Important", "C. How to Know Your BMI", "D. Small Changes for Better Health"], "D", ["best title", "passage"], "Even small changes... can help us build a healthier future.", "标题题要覆盖目的、方法和结尾。", ["D：概括健康生活和小改变。", "A：只点活动名，概括力稍弱。", "B/C：只涵盖局部。"], "文章围绕通过小改变获得更健康生活展开。")
      ]
    },
    {
      id: "天山区监测A",
      title: "A. Protect the Environment at School",
      meta: "2026年乌鲁木齐市天山区九年级质量监测英语 · A 篇 · 判断正误",
      paragraphs: [
        "Our school has been taking action to protect the environment.",
        "First, we have a recycling program. Students are encouraged to collect waste paper, plastic bottles and metal cans. These recyclable materials are then sent to the recycling center. This helps to reduce waste and save resources.",
        "Second, the school has installed energy-saving lights in classrooms and corridors. These lights use less electricity, which helps to save energy.",
        "Also, we have a “no littering” policy. Students are not allowed to throw rubbish anywhere on campus. Instead, they should put it into the trash bins. As a result, our school is always clean and tidy.",
        "Moreover, the school has planted many trees and flowers in the schoolyard. These plants not only make the school more beautiful but also help to improve the air quality."
      ],
      questions: [
        q(36, "The school has a recycling program to encourage students to collect waste paper only.", ["T", "F"], "F", ["recycling program", "waste paper only"], "Students are encouraged to collect waste paper, plastic bottles and metal cans.", "only 与列举内容冲突。", ["T：忽略 plastic bottles and metal cans。", "F：不只是废纸。"], "回收项目还包括塑料瓶和金属罐。"),
        q(37, "Energy-saving lights use more electricity than ordinary lights.", ["T", "F"], "F", ["Energy-saving lights", "more electricity"], "These lights use less electricity", "more 与 less 相反。", ["T：方向错误。", "F：原文是更省电。"], "节能灯用电更少。"),
        q(38, "Students can throw rubbish in the schoolyard according to the “no littering” policy.", ["T", "F"], "F", ["throw rubbish", "schoolyard"], "Students are not allowed to throw rubbish anywhere on campus.", "not allowed 是关键。", ["T：忽略 not allowed。", "F：不能乱扔垃圾。"], "校内不允许随处扔垃圾。"),
        q(39, "The school has planted trees and flowers to make the school more beautiful and improve air quality.", ["T", "F"], "T", ["trees", "flowers", "beautiful", "air quality"], "These plants not only make the school more beautiful but also help to improve the air quality.", "not only... but also 对应两个作用。", ["T：与原文一致。", "F：漏掉任一作用。"], "树和花既美化校园也改善空气。"),
        q(40, "The passage is mainly about the school’s environmental protection action.", ["T", "F"], "T", ["mainly", "environmental protection"], "Our school has been taking action to protect the environment.", "首句点明全文主题。", ["T：概括全文。", "F：不是局部细节。"], "全文介绍学校环保行动。")
      ]
    },
    {
      id: "天山区监测B",
      title: "B. Tea-picking Robots",
      meta: "2026年乌鲁木齐市天山区九年级质量监测英语 · B 篇 · 四选一",
      paragraphs: [
        "Usually, we think of workers picking tea leaves by hand. But now, some Longjing tea is being picked by metal workers--tea-picking robots!",
        "In a Hangzhou tea garden, a smart tea-picking robot developed by Zhejiang Sci-Tech University sets to work for the first time. “We took thousands of pictures of new tea buds and fed them to the robot for it to learn. The robot uses an AI model to remember the buds it needs to pick,” said Professor Chen Jianneng. This lets the robot find the right tea buds about 90 percent of the time.",
        "The robot’s arm pulls and then sucks up the tea buds. These buds are quickly moved into a special box. After the robot gathers all the buds from the area it’s working at, it moves the buds from the box to a main box that holds everything it collects.",
        "The robot was made because there are not enough people to pick tea. In Zhejiang, about 400,000 more pickers are needed now. “Picking is the biggest challenge for the development of the tea industry,” said Professor Wu Chuanyu, who leads the research team.",
        "Although tea-picking robots are not perfect, for example, they can’t tell the difference because some tea buds look very similar, they are a trend of the future. About five years from now, the robots will do the job of picking West Lake Longjing tea instead of people, Wu added."
      ],
      questions: [
        q(41, "Where did the smart tea-picking robot first start working?", ["A. In a factory in Zhejiang.", "B. In a Hangzhou tea garden.", "C. In a university in Zhejiang.", "D. In a West Lake tea-processing center."], "B", ["Where", "robot", "first"], "In a Hangzhou tea garden, a smart tea-picking robot... sets to work for the first time.", "where 和 first 定位。", ["B：与原文一致。", "A/C/D：地点不符。"], "机器人首次在杭州茶园工作。"),
        q(42, "How does the tea-picking robot know which tea buds to pick?", ["A. By tasting the tea buds.", "B. By using its sense of smell.", "C. By following the instructions of workers.", "D. By an AI model after learning from thousands of pictures."], "D", ["How", "know", "tea buds"], "We took thousands of pictures... The robot uses an AI model to remember the buds it needs to pick.", "pictures 和 AI model 是答案核心。", ["D：与原文一致。", "A/B/C：无依据。"], "机器人通过大量图片训练和AI模型识别茶芽。"),
        q(43, "What is the correct order of the steps for the tea-picking robot to pick tea? a. The buds are moved into a special box. b. The arm pulls and sucks up the tea buds. c. The buds are moved from the box to a main box. d. All the buds are gathered from the working area.", ["A. b-a-d-c", "B. b-d-c-a", "C. c-b-d-a", "D. d-c-b-a"], "A", ["correct order", "tea-picking robot"], "The robot’s arm pulls and then sucks up the tea buds. These buds are quickly moved into a special box. After the robot gathers all the buds... it moves the buds from the box to a main box", "顺序题按动作链定位。", ["A：b→a→d→c 与原文一致。", "B/C/D：顺序错误。"], "先吸起茶芽，再进入特殊箱，收集完后再转到主箱。"),
        q(44, "Why was the tea-picking robot made?", ["A. Because it can pick tea much faster than humans.", "B. Because it can pick more tea buds accurately.", "C. Because there is a shortage of tea-pickers.", "D. Because it is a symbol of high-tech development."], "C", ["Why", "robot made"], "The robot was made because there are not enough people to pick tea.", "because 后直接给原因。", ["C：shortage of tea-pickers 是 not enough people 的同义。", "A/B/D：不是制造原因。"], "机器人被制造出来是因为采茶工不足。"),
        q(45, "What can we infer from Professor Wu Chuanyu’s words?", ["A. Tea-picking robots are already perfect.", "B. Tea-picking robots will replace human pickers in about five years.", "C. Tea-picking robots can clearly tell the difference among all tea buds.", "D. The development of the tea industry has no difficulty now."], "B", ["infer", "Professor Wu"], "About five years from now, the robots will do the job of picking West Lake Longjing tea instead of people", "推断题关注教授原话。", ["B：与原文一致。", "A/C/D：与 not perfect / challenge 相反。"], "吴教授认为约五年后机器人会替代人工采摘西湖龙井。")
      ]
    },
    {
      id: "天山区监测C",
      title: "C. Newton's Three Laws of Motion",
      meta: "2026年乌鲁木齐市天山区九年级质量监测英语 · C 篇 · 四选一",
      paragraphs: [
        "We’ve all heard about the man who discovered gravity and the apple that fell from a tree and hit him on the head. However, the 17th-century “aha moment” is actually a bit of a lie! Newton did witness an apple falling from a tree one day and this got him thinking about what actually caused the apple to fall down to the ground.",
        "Newton later developed his theory of Gravity, believing that Earth has a force that pulls objects down, which prevents objects from aimlessly floating around.",
        "While we know that Isaac Newton discovered Gravity, he also made many other scientific discoveries. Newton is also credited with discovering the three laws of motion. These three laws, or principles, explain how things move.",
        "Law 1: An object at rest stays at rest. A moving object keeps moving. Objects continue doing what they’re doing unless a stronger force acts on them. Here, the stronger force is the wall. It stops the truck but not the boxes, so they keep moving backward.",
        "Law 2: It takes more force to move a heavy object than to move a lighter object. Newton came up with a scientific formula to explain this: Force = Mass x Acceleration. Large weights with a lot of mass require more force to lift than smaller, lighter weights do.",
        "Law 3: For every force, there is an equal reaction in the opposite direction. Air from an untied balloon rushes out in one direction. As the air escapes, it pushes the balloon in the opposite direction."
      ],
      questions: [
        q(46, "Which part of a magazine is the reading material most probably taken from?", ["A. History.", "B. Sports.", "C. Culture.", "D. Science."], "D", ["magazine", "part"], "Newton is also credited with discovering the three laws of motion.", "内容是重力和运动定律，属于科学。", ["D：Science 符合主题。", "A/B/C：不符。"], "文章最可能来自科学栏目。"),
        q(47, "The drawing for Law 1 shows that ________.", ["A. the boxes get a stronger force than the truck", "B. the truck stays at rest, but the boxes do not", "C. the wall acts on the truck but not on the boxes", "D. the truck keeps moving, but the wall stays at rest"], "C", ["Law 1", "drawing"], "the stronger force is the wall. It stops the truck but not the boxes", "图示解释句直接说明。", ["C：墙作用在卡车上但没有作用在箱子上。", "A/B/D：表述不准。"], "墙挡住车，箱子继续运动。"),
        Object.assign(q(48, "Which picture best shows Law 3?", ["A. Picture A.", "B. Picture B.", "C. Picture C.", "D. Picture D."], "B", ["picture", "Law 3"], "For every force, there is an equal reaction in the opposite direction.", "Law 3 是作用力与反作用力，图 B 表现相反方向反应。", ["B：最能体现相反方向的反作用。", "A/C/D：不能直接体现 Law 3。"], "第三定律强调相反方向的等大反作用。"), { image: "assets/mock-2025-tianshan-c-q48.png" }),
        q(49, "The main purpose of the text is to ________.", ["A. explain how to do experiments", "B. introduce 3 Laws of Motion", "C. show an equal reaction", "D. move objects with less force"], "B", ["main purpose", "text"], "These three laws, or principles, explain how things move.", "全文主体介绍三大运动定律。", ["B：覆盖全文。", "A/C/D：范围过窄。"], "文章主要介绍牛顿三大运动定律。")
      ]
    },
    {
      id: "天山区监测D",
      title: "D. Si Shengsheng",
      meta: "2026年乌鲁木齐市天山区九年级质量监测英语 · D 篇 · 四选一",
      paragraphs: [
        "On December 2nd, China Media Group introduced the official mascot for the 2025 Spring Festival Gala--Si Shengsheng. With a cute and classic look, it shows both modern and historical meaning: this cheerful mascot brings good wishes to Chinese people around the world, hoping that everyone has a new year filled with health, happiness, and good luck.",
        "Where is the name from? The mascot “Si Shengsheng” comes from traditional Chinese culture. Its name is based on the ancient character “巳” from the oracle bone script, which means the Year of the Snake. Connected to the Gala’s theme, “Si Si Ru Yi, Sheng Sheng Bu Xi”, “Si Shengsheng” is full of good energy.",
        "Are you interested in its look? Each part of its design symbolizes something good. The shape of its head and cheeks are inspired by the gilded silver Ruyi from the Tang Dynasty found in Famen Temple, which means “happiness from beginning to end”. The bat-shaped pattern on its head and the Chinese knot on its tail add more wishes for good luck. The flower patterns on the back show the arrival of spring.",
        "Have you been attracted by its bright colors? The mascot’s main color is bright green, meaning the new life of spring. Many traditional Chinese colors like green, blue, white, and orange, mix together to create a lively and happy mood."
      ],
      questions: [
        q(50, "What’s the meaning behind the mascot?", ["A. It symbolizes a happy mood.", "B. It welcomes the arrival of spring.", "C. It brings good wishes to Chinese people.", "D. It introduces the 2025 Spring Festival Gala."], "C", ["meaning", "mascot"], "this cheerful mascot brings good wishes to Chinese people around the world", "meaning behind the mascot 定位首段。", ["C：与原文一致。", "A/B：只是局部设计含义。", "D：不是吉祥物含义。"], "吉祥物承载对中国人的美好祝福。"),
        q(51, "Where is the name of the mascot from?", ["A. Modern art and designs.", "B. The art of the Tang Dynasty.", "C. Chinese modern and historical buildings.", "D. Traditional Chinese culture and the character “巳”."], "D", ["name", "mascot", "from"], "comes from traditional Chinese culture. Its name is based on the ancient character “巳”", "Where is the name from 后直接回答。", ["D：信息完整。", "A/B/C：不符合或只对应设计细节。"], "名字来自传统文化和甲骨文“巳”。"),
        q(52, "What is the third paragraph mainly about?", ["A. The meaning of the mascot’s name.", "B. The process of designing the mascot.", "C. The design and the meaning of each part.", "D. The shapes of each part of the mascot."], "C", ["third paragraph", "mainly"], "Each part of its design symbolizes something good.", "第三段主题句在开头。", ["C：覆盖 design 和 meaning。", "A：对应第二段。", "B/D：不完整。"], "第三段主要讲各部分设计及其寓意。"),
        Object.assign(q(53, "Which of the following shows the structure of the text?", ["A. ① / ②③④", "B. ①②③ / ④", "C. ① / ②③ / ④", "D. ①② / ③ / ④"], "A", ["structure", "text"], "The first paragraph introduces the mascot, and Paragraphs 2 to 4 explain its name, design and colors.", "结构题看段落功能：首段总介绍，后三段分说名称、外观、颜色。", ["A：总分结构最准确。", "B/C/D：层次划分不准。"], "文章结构是第1段总起，第2-4段分述。"), { image: "assets/mock-2025-tianshan-d-q53.png" })
      ]
    },
    ]);
})();
