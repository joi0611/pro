(function () {
  const add = (items) => {
    const existing = new Set(passages.map((passage) => passage.id));
    items.forEach((item) => {
      if (!existing.has(item.id)) passages.push(item);
    });
    renderAll();
  };

  add([
  {
    "id": "2025期中A01",
    "title": "A. Nian and Chinese New Year",
    "meta": "2025-2026学年 新疆伊宁市 九年级上学期期中考试 · A 篇 · 判断正误",
    "paragraphs": [
      "Nian was a Chinese mythological beast (兽) that lived at the bottom of the sea. On the evening before the New Year, Nian came out of the water. According to Chinese New Year stories, villagers were afraid of Nian because it ate animals and humans. When Nian came out, villagers would run to the mountains and find a safe place. They would hide in the place in order to protect themselves from being eaten by Nian.",
      "One New Year’s Eve, a beggar came to the village to look for some food. He also wanted to find a place to live in. The beggar promised to provide protection from Nian in return. An old woman accepted his offer. She invited him to her house and gave him some food. The beggar started decorating the homes in the village, placing red Chinese New Year ornaments (装饰品) on doors. He also prepared some firecrackers (鞭炮).",
      "At midnight, Nian came to the village. It immediately stopped as soon as it saw the red ornaments. All of a sudden, the firecrackers started exploding (爆炸) and Nian ran away in fear. The beggar came out, wearing red Chinese New Year clothes. He laughed when Nian ran away.",
      "The villagers returned the next morning. They were surprised that none of their homes were destroyed (破坏). From then on, before New Year’s Eve, people started decorating their homes with red ornaments and lighting firecrackers at midnight."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "Villagers were afraid of Nian because it ate animals and humans.",
        "options": [
          "T",
          "F"
        ],
        "answer": "T",
        "keywords": [
          "villagers",
          "afraid",
          "nian",
          "because",
          "ate"
        ],
        "evidence": "According to Chinese New Year stories, villagers were afraid of Nian because it ate animals and humans.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．根据原文第一段第三句“villagers were afraid of Nian because it ate animals and humans”，题干表述和原文内容一致。"
      },
      {
        "number": 2,
        "stem": "When Nian came out, villagers would stay in their houses and never go out.",
        "options": [
          "T",
          "F"
        ],
        "answer": "F",
        "keywords": [
          "nian",
          "came",
          "out",
          "villagers",
          "would"
        ],
        "evidence": "When Nian came out, villagers would run to the mountains and find a safe place.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．根据原文第一段末尾“When Nian came out, villagers would run to the mountains and find a safe place”，年兽出现时村民会逃往山上躲避，而非待在家中，题干表述与原文相反。"
      },
      {
        "number": 3,
        "stem": "An old man invited the beggar to his house and gave him some food.",
        "options": [
          "T",
          "F"
        ],
        "answer": "F",
        "keywords": [
          "old",
          "man",
          "invited",
          "beggar",
          "house"
        ],
        "evidence": "An old woman accepted his offer.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．根据原文第二段第四句“An old woman accepted his offer. She invited him to her house”，是老妇人邀请乞丐到家，并非老年男性，题干描述错误。"
      },
      {
        "number": 4,
        "stem": "The beggar used some red ornaments and firecrackers to drive Nian away.",
        "options": [
          "T",
          "F"
        ],
        "answer": "T",
        "keywords": [
          "beggar",
          "used",
          "some",
          "red",
          "ornaments"
        ],
        "evidence": "The beggar started decorating the homes in the village, placing red Chinese New Year ornaments (装饰品) on doors.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．根据原文第二段末尾、第三段内容，乞丐在门上张贴红色饰品、准备鞭炮，成功吓跑了年兽，题干表述符合文意。"
      },
      {
        "number": 5,
        "stem": "The passage is about how people usually celebrate Chinese New Year.",
        "options": [
          "T",
          "F"
        ],
        "answer": "F",
        "keywords": [
          "people",
          "usually",
          "celebrate",
          "chinese",
          "new"
        ],
        "evidence": "From then on, before New Year’s Eve, people started decorating their homes with red ornaments and lighting firecrackers at midnight.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "5．通读全文可知，本文重点讲述年兽传说与春节相关习俗的起源，并非单纯介绍人们庆祝新年的常规方式，题干概括不准确。"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——历史、社会与文化",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中B02",
    "title": "B. The Magic of Chinese Paper Cutting",
    "meta": "2025-2026学年 新疆乌鲁木齐沙依巴克区 九年级上学期期中考试 · B 篇 · 四选一",
    "paragraphs": [
      "Imagine you have a pair of scissors and some red paper, what can you do? With these simple tools, you can create a whole world of beautiful shapes. This is the magic of Chinese paper-cutting, a famous traditional art in China. These art pieces are not just pretty pictures. They carry deep meanings and the best wishes. Let’s see some of them.",
      "wish a good harvest (丰收)",
      "wish good luck",
      "best wishes for the longevity",
      "wish happiness for new couples",
      "4 steps to make paper-cutting:",
      "Step1: Fold the paper. You can fold it once or many times. This helps you make the same pattern on different parts of the paper.",
      "Step2: Draw cutting lines. Use a pencil to draw your design (设计) on the folded paper. You can draw animals, flowers or Chinese words and so on.",
      "Step3: Cut with scissors. Carefully cut along the lines you have drawn. Be patient in this part.",
      "Step4: Open the paper-cutting. This is the most exciting step! Open the paper slowly, and you will see your beautiful artwork."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "What do people need to make Chinese paper-cutting?",
        "options": [
          "A. Scissors and a knife.",
          "B. Scissors and red paper.",
          "C. A knife and red paper.",
          "D. A ruler and a pencil."
        ],
        "answer": "B",
        "keywords": [
          "people",
          "need",
          "make",
          "chinese",
          "paper"
        ],
        "evidence": "Imagine you have a pair of scissors and some red paper, what can you do?",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．根据原文“Imagine you have a pair of scissors and some red paper, what can you do?”，所需材料为剪刀和红纸。"
      },
      {
        "number": 2,
        "stem": "Why do people put up the paper-cutting of “yu” (fish)?",
        "options": [
          "A. To wish a good harvest.",
          "B. To wish a good luck.",
          "C. To wish a happy birthday.",
          "D. To wish a new year."
        ],
        "answer": "A",
        "keywords": [
          "people",
          "put",
          "paper",
          "cutting",
          "fish"
        ],
        "evidence": "wish a good harvest (丰收)",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．文中标注“yu”(fish) 对应wish a good harvest（祈愿丰收）。"
      },
      {
        "number": 3,
        "stem": "The underlined word “longevity” means __________ in Chinese.",
        "options": [
          "A. 好运",
          "B. 幸福",
          "C. 快乐",
          "D. 长寿"
        ],
        "answer": "D",
        "keywords": [
          "underlined",
          "word",
          "longevity",
          "means",
          "chinese"
        ],
        "evidence": "best wishes for the longevity",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．该词对应“shou”寿字剪纸，“寿”代表长寿，longevity意为长寿。"
      },
      {
        "number": 4,
        "stem": "Which of the following is TRUE?",
        "options": [
          "A. These art pieces are just beautiful pictures.",
          "B. The paper-cutting of “xi” means happiness for new couples.",
          "C. The first step to make paper-cutting is to draw cutting lines.",
          "D. They should be quick when people cut along the lines."
        ],
        "answer": "B",
        "keywords": [
          "paper",
          "cutting",
          "means",
          "happiness",
          "new"
        ],
        "evidence": "These art pieces are not just pretty pictures.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．原文表格标注“xi”（喜字）wish happiness for new couples，与B选项完全匹配；A和原文“not just pretty pictures”矛盾，C第一步是折纸而非画线，D剪纸需要耐心、不能快速裁剪，均错误。"
      },
      {
        "number": 5,
        "stem": "Where could we read the short passage?",
        "options": [
          "A. In a novel.",
          "B. In a story book.",
          "C. In a magazine.",
          "D. In a science fiction."
        ],
        "answer": "C",
        "keywords": [
          "could",
          "read",
          "short",
          "magazine"
        ],
        "evidence": "Imagine you have a pair of scissors and some red paper, what can you do?",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "5．文章科普传统民俗艺术，适合刊登在杂志；小说、故事书、科幻读物均不符合文本体裁。主题02 人与社会——社会服务与人际沟通"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——历史、社会与文化",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中A03",
    "title": "A. Stone Soup",
    "meta": "2025-2026学年 新疆乌鲁木齐沙依巴克区 九年级上学期期中考试 · A 篇 · 判断正误",
    "paragraphs": [
      "One day, a very hungry man came to a small town. He knocked at the first door and asked for food. “I’m sorry.” said a woman. “This is a poor town, so we have no food to share.” In fact, she had some beans. At the next house, a young man said the same words, though he had a little meat. The man visited every house, but everyone refused him. Each person had a small amount (数量) of food but they wouldn’t share any with him.",
      "In the afternoon, the hungry man had an idea. He made a fire in the middle of town and put a big pot of water over it. And then, he picked a big stone, washed it and dropped it into the pot. “This stone soup will be delicious!” he said. People came to see it. A girl asked how to make it. “You just need a stone,” he explained. “But beans will make it better.” The woman brought her beans. “Some meat will improve it too,” he added. The young man brought some meat. Soon, others offered carrots, potatoes and salt. When the soup was ready, they all ate together. “It’s wonderful!” They said. “Now we know how to make stone soup.”"
    ],
    "questions": [
      {
        "number": 1,
        "stem": "The hungry man came to a rich town to ask for food.",
        "options": [
          "T",
          "F"
        ],
        "answer": "F",
        "keywords": [
          "hungry",
          "man",
          "came",
          "rich",
          "town"
        ],
        "evidence": "One day, a very hungry man came to a small town.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．根据第一段“One day, a very hungry man came to a small town.”以及女士所说 “This is a poor town, so we have no food to share.”可知，小镇是贫穷的，并非富裕小镇。故表述错误。"
      },
      {
        "number": 2,
        "stem": "The woman had some beans but she didn’t share them with the hungry man.",
        "options": [
          "T",
          "F"
        ],
        "answer": "T",
        "keywords": [
          "woman",
          "some",
          "beans",
          "didn't",
          "share"
        ],
        "evidence": "“This is a poor town, so we have no food to share.”",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．根据第一段“‘I’m sorry.’ said a woman. ‘This is a poor town, so we have no food to share.’ In fact, she had some beans.”可知，这位女士有豆子，却没有分给饥饿的男人。故表述正确"
      },
      {
        "number": 3,
        "stem": "Finally, the man made the soup by putting only a stone into a pot of water.",
        "options": [
          "T",
          "F"
        ],
        "answer": "F",
        "keywords": [
          "finally",
          "man",
          "made",
          "soup",
          "putting"
        ],
        "evidence": "The young man brought some meat.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．根据第二段 “The woman brought her beans... The young man brought some meat. Soon, others offered carrots, potatoes and salt.”可知，锅里除了石头，还有大家拿来的各类食材，不只有石头和清水。故表述错误。"
      },
      {
        "number": 4,
        "stem": "All the people in the town ate the stone soup together in the end.",
        "options": [
          "T",
          "F"
        ],
        "answer": "T",
        "keywords": [
          "all",
          "people",
          "town",
          "ate",
          "stone"
        ],
        "evidence": "When the soup was ready, they all ate together.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．根据第二段“When the soup was ready, they all ate together.”可知，镇上所有人最后一起喝了石头汤。故表述正确。"
      },
      {
        "number": 5,
        "stem": "From the story, we can learn that one can make something wonderful by sharing.",
        "options": [
          "T",
          "F"
        ],
        "answer": "T",
        "keywords": [
          "story",
          "can",
          "learn",
          "one",
          "make"
        ],
        "evidence": "“It’s wonderful!”",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "T：请回到原文核对该选项与定位句是否一致。",
          "F：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "5．全文故事中，大家原本不愿分享，拿出各自食物后共同做出美味浓汤，印证了通过分享能收获美好事物。故表述正确。主题03 人与社会——历史、社会与文化"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——社会服务与人际沟通",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中C04",
    "title": "C. Reading for Pleasure",
    "meta": "2025-2026学年 新疆克孜勒苏柯尔克孜自治州 九年级上学期期中考试 · C 篇 · 四选一",
    "paragraphs": [
      "Reading for pleasure is the easiest way for us to become a better reader in English. It is also the most important way.",
      "Some students say they don’t want to read for pleasure. They say they want to use their time to learn the rules of the language and new words. They say that pleasure reading is too easy.",
      "Many experts say pleasure reading is very important for learning English. Dr. Stephen Krashen, a famous expert on learning languages, says that pleasure reading helps you learn many important things about English. Students learn more grammar and more words when they read for pleasure. They also learn more about good writing.",
      "Dr. Krashen tells us that pleasure reading helps each student in a different way. Each student needs to learn something different. Pleasure reading makes it possible for each student to learn what he or she needs."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "________ can make you become a better reader in English.",
        "options": [
          "A. Learning English grammar",
          "B. Learning the rules of the language",
          "C. Reading for pleasure",
          "D. Learning the new words"
        ],
        "answer": "C",
        "keywords": [
          "can",
          "make",
          "become",
          "better",
          "reader"
        ],
        "evidence": "Reading for pleasure is the easiest way for us to become a better reader in English.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "1．细节理解题。根据“Reading for pleasure is the easiest way for us to become a better reader in English. It is also the most important way.”可知，快乐阅读能让你成为更好的英语阅读者。故选C。"
      },
      {
        "number": 2,
        "stem": "Some students say they want to use their time to learn ________.",
        "options": [
          "A. to read for pleasure",
          "B. grammar",
          "C. writing",
          "D. the rules of the language and new words"
        ],
        "answer": "D",
        "keywords": [
          "some",
          "students",
          "say",
          "want",
          "use"
        ],
        "evidence": "Some students say they don’t want to read for pleasure.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．细节理解题。根据“Some students say they don’t want to read for pleasure. They say they want to use their time to learn the rules of the language and new words.”可知，一些学生说他们想用时间来学习语言规则和新单词。故选D。"
      },
      {
        "number": 3,
        "stem": "What does pleasure reading make possible for students?",
        "options": [
          "A. To get good grades.",
          "B. To learn what they need.",
          "C. To learn more grammar and more words.",
          "D. To learn more about good writing."
        ],
        "answer": "B",
        "keywords": [
          "pleasure",
          "reading",
          "make",
          "possible",
          "students"
        ],
        "evidence": "Pleasure reading makes it possible for each student to learn what he or she needs.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．细节理解题。根据“Pleasure reading makes it possible for each student to learn what he or she needs.”可知，快乐阅读让学生学到他们需要的东西成为可能。故选B。"
      },
      {
        "number": 4,
        "stem": "The passage tells us ________.",
        "options": [
          "A. how to learn English",
          "B. how important reading for pleasure is",
          "C. how important learning English is",
          "D. why we should learn English"
        ],
        "answer": "B",
        "keywords": [
          "tells",
          "important",
          "reading",
          "pleasure"
        ],
        "evidence": "Many experts say pleasure reading is very important for learning English.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．主旨大意题。根据“Many experts say pleasure reading is very important for learning English.”以及全文内容可知，本文主要讲述了快乐阅读的重要性。故选B。主题01 人与自然——自然生态"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与自我——生活与学习",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中C05",
    "title": "C. Welcome to Kenya",
    "meta": "2025-2026学年 新疆阿克苏 九年级上学期期中考试 · C 篇 · 四选一",
    "paragraphs": [
      "Welcome to Kenya (肯尼亚), a country in East Africa, is famous as a land of natural beauty.",
      "Kenya lies along the equator (赤道). The Indian Ocean is to the coast of Kenya. Highlands (高原) rise in the western part of Kenya. Mount Kenya, at 5,199 meters, is Kenya’s highest mountain. In the east of the highlands, the land goes down towards the coast.",
      "Kenya’s most important river, the Tana River (塔纳河), starts from the high mountain to the Indian Ocean. Most of the other rivers in the country are short and shallow. They sometimes dry up when there is little rainfall.",
      "Kenya has two wet seasons and two dry seasons. Rainfall is usually heavy from March to June and from October to December, while some areas are cloudier without much rain during other months.",
      "Kenya is home to many national parks. Green forests and bamboo grow in the highlands. The national animals include elephants, lions, giraffes, zebras and many rare (稀有的) animals. The Kenyan government has set up many nature parks. Inside the parks, the wildlife is protected from hunting. This makes them excellent places to take a journey."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "How many dry seasons does Kenya have?",
        "options": [
          "A. One.",
          "B. Two.",
          "C. Four.",
          "D. Three."
        ],
        "answer": "B",
        "keywords": [
          "many",
          "dry",
          "seasons",
          "kenya",
          "two"
        ],
        "evidence": "Kenya has two wet seasons and two dry seasons.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "1．细节理解题。根据文章第四段“Kenya has two wet seasons and two dry seasons.”可知，肯尼亚有两个旱季。故选B。"
      },
      {
        "number": 2,
        "stem": "What can we know from Paragraph 2?",
        "options": [
          "A. Kenya doesn’t lie along the equator.",
          "B. The highlands go down in the western part of Kenya.",
          "C. Mount Kenya is Kenya’s highest mountain.",
          "D. In the east of the highlands, the land goes up towards the coast."
        ],
        "answer": "C",
        "keywords": [
          "can",
          "know",
          "paragraph",
          "mount",
          "kenya"
        ],
        "evidence": "Mount Kenya, at 5,199 meters, is Kenya’s highest mountain.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．细节理解题。根据文章第二段“Mount Kenya, at 5,199 meters, is Kenya’s highest mountain.”可知，肯尼亚山是肯尼亚最高的山。故选C。"
      },
      {
        "number": 3,
        "stem": "What does the underlined word “shallow” in Paragraph 3 mean?",
        "options": [
          "A. Not safe.",
          "B. Not deep.",
          "C. Not dirty.",
          "D. Cool."
        ],
        "answer": "B",
        "keywords": [
          "underlined",
          "word",
          "shallow",
          "paragraph",
          "mean"
        ],
        "evidence": "Most of the other rivers in the country are short and shallow.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．词句猜测题。根据文章第三段“Most of the other rivers in the country are short and shallow. They sometimes dry up when there is little rainfall.”可知，该国其他大多数河流短且“shallow”，在降雨量少的时候会干涸，由此可推断“shallow”意为“不深的”。故选B。"
      },
      {
        "number": 4,
        "stem": "What is the purpose of the passage?",
        "options": [
          "A. To introduce the animals in Kenya.",
          "B. To invite people to visit Kenya.",
          "C. To call on (号召，呼吁) people to protect the wildlife.",
          "D. To ask people to leave Kenya."
        ],
        "answer": "B",
        "keywords": [
          "purpose",
          "invite",
          "people",
          "visit",
          "kenya"
        ],
        "evidence": "This makes them excellent places to take a journey.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．主旨大意题。文章介绍了肯尼亚的自然美景、气候、河流以及国家公园等，最后提到“This makes them excellent places to take a journey.”，由此可推断文章的目的是邀请人们去肯尼亚旅游。故选B。主题02 人与社会——历史、社会与文化"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与自然——自然生态",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中B06",
    "title": "B. Ethnic Festivals in China",
    "meta": "2025-2026学年 新疆乌鲁木齐市米东区联考 九年级上学期期中考试 · B 篇 · 四选一",
    "paragraphs": [
      "There are lots of fun-filled ethnic (少数民族的) festivals in our country. Let’s take a look at some of them.",
      "Ethnic Festival",
      "Introduction",
      "March Fair of the Bai ethnic group",
      "The March Fair is the most important festival for people of the Bai ethnic group living in Dali, Yunnan. It starts from the 15th day of the 3rd lunar month and lasts about 7 days. During the festival, people in and around Dali come together for trade. What’s more, they race horses, dance to and sing traditional songs.",
      "Torch Festival of the Yi ethnic group",
      "In Yunnan, Guizhou and Sichuan, people of the Yi ethnic group celebrate the Torch (火把) Festival. It usually takes place from the 24th to the 26th day of the 6th lunar month every year. As part of the festival, every family needs to light a torch. The idea is that these torches will drive away bad luck. In the center of town, there is always a bonfire (篝火). People of all ages sing and dance around it.",
      "Water Festival of the Dai ethnic group",
      "The Water Festival is the New Year for people of the Dai ethnic group living in Xishuangbanna, Yunnan. It lasts 3 days in April. During the festival, people of the Dai ethnic group wear their festival suits to dance and throw water at each other (they believe it could bring happiness and good luck). The wetter you get, the luckier you will be.",
      "Interested in these Chinese festivals? Go and experience them yourself."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "What activities can you see at the March Fair of the Bai ethnic group?",
        "options": [
          "A. Trade, horse racing, and throwing water.",
          "B. Trade, horse racing, and dancing.",
          "C. Singing, dancing and swimming.",
          "D. Singing, dancing and throwing water."
        ],
        "answer": "B",
        "keywords": [
          "activities",
          "can",
          "see",
          "march",
          "fair"
        ],
        "evidence": "March Fair of the Bai ethnic group",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "1．根据“March Fair of the Bai ethnic group”中“...people in and around Dali come together for trade. What’s more, they race horses, dance to and sing traditional songs.”，可知只有B选项符合。"
      },
      {
        "number": 2,
        "stem": "Why do people of the Yi ethnic group need to light a torch in the festival?",
        "options": [
          "A. Because they think it can drive away bad luck.",
          "B. Because they think they can see the road clearly with a torch.",
          "C. Because they think it can bring happiness and good luck.",
          "D. Because they want to do some cooking with a torch."
        ],
        "answer": "A",
        "keywords": [
          "people",
          "ethnic",
          "group",
          "need",
          "light"
        ],
        "evidence": "Torch Festival of the Yi ethnic group",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．根据“Torch Festival of the Yi ethnic group”中“The idea is that these torches will drive away bad luck.”可知，人们点燃火把是为了驱走厄运。"
      },
      {
        "number": 3,
        "stem": "Where can you experience all three ethnic festivals above?",
        "options": [
          "A. In Guizhou.",
          "B. In Yunnan.",
          "C. In Sichuan.",
          "D. In Guangdong."
        ],
        "answer": "B",
        "keywords": [
          "can",
          "experience",
          "all",
          "three",
          "ethnic"
        ],
        "evidence": "The March Fair is the most important festival for people of the Bai ethnic group living in Dali, Yunnan.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．三个节日的分布：白族三月街“in Dali, Yunnan”，在云南大理；彝族火把节“In Yunnan, Guizhou and Sichuan”，在云南、贵州、四川都有；傣族泼水节“in Xishuangbanna, Yunnan”，在云南西双版纳，只有云南同时有这三个节日。"
      },
      {
        "number": 4,
        "stem": "Which festival lasts the longest time?",
        "options": [
          "A. All of them last three days.",
          "B. The Torch Festival.",
          "C. The March Fair.",
          "D. The Water Festival."
        ],
        "answer": "C",
        "keywords": [
          "festival",
          "lasts",
          "longest",
          "time",
          "march"
        ],
        "evidence": "It starts from the 15th day of the 3rd lunar month and lasts about 7 days.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．对比时长：三月街“It starts from the 15th day of the 3rd lunar month and lasts about 7 days.”约7天，火把节“from the 24th to the 26th day of the 6th lunar month”3天，泼水节“It lasts 3 days in April.”3天，三月街持续时间最长。"
      },
      {
        "number": 5,
        "stem": "In which part of the magazine can you find the passage?",
        "options": [
          "A. Science and technology.",
          "B. Around China.",
          "C. Healthy Life.",
          "D. Animal World."
        ],
        "answer": "B",
        "keywords": [
          "part",
          "magazine",
          "can",
          "find",
          "around"
        ],
        "evidence": "During the festival, people in and around Dali come together for trade.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "5．本文介绍了中国不同地区的少数民族节日文化，最可能出现在杂志的“走遍中国”板块。主题03 人与社会——社会服务与人际沟通"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——历史、社会与文化",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中B07",
    "title": "B. New City Zoo Summer Guide",
    "meta": "2025-2026学年 新疆哈密市第四中学 九年级上学期期中考试 · B 篇 · 四选一",
    "paragraphs": [
      "WELCOME TO NEW CITY ZOO",
      "SCHEDULE FOR SUMMER 2025",
      "ZOO HOURS: 9:00 a.m.～6:00 p.m. Weather may affect some activities.",
      "Animal Experiences",
      "Special Experiences",
      "Watching",
      "Starting time",
      "Length",
      "Guided bus tour: 10:00 a.m.～5:00 p.m. Round-trip in the zoo with a bus ticket. 1-Day Pass or yearly card.",
      "Elephant",
      "10:00 a.m.",
      "25 minutes",
      "Lion",
      "11:00 a.m.",
      "15 minutes",
      "Bear",
      "2:30 p.m.",
      "25 minutes",
      "Wolf",
      "4:00 p.m.",
      "25 minutes",
      "Mini-train: 10:30 a.m.～4:30 p.m. (except holidays)",
      "Get a hand stamp at the gate of the zoo, and you can get on and off the mini-train as many times as you want on the same day.",
      "Monkey",
      "4:30 p.m.",
      "20 minutes",
      "※To have a close look at the animals, please check the time listed above.",
      "For Health & Safety",
      "□Do not cross safety lines to take photos.",
      "□Do not touch or feed any animals.",
      "□Keep children in sight at all times.",
      "▲Warning: Don’t feed or disturb any animals in the zoo. Violators (违反者) will be required to leave the zoo, and could pay fines up to ¥300.",
      "Thanks for treating animals and their living space with respect!",
      "For more information, please call the visitor centre at 0455-622-2375 or visit newcityzoo.com."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "When does New City Zoo open?",
        "options": [
          "A. At 9:00 p.m.",
          "B. At 10:30 a.m.",
          "C. At 6:00 p.m.",
          "D. At 9:00 a.m."
        ],
        "answer": "D",
        "keywords": [
          "new",
          "city",
          "zoo",
          "open"
        ],
        "evidence": "Weather may affect some activities.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．细节理解题。根据“ZOO HOURS: 9:00 a.m.～6:00 p.m. Weather may affect some activities.”可知，动物园上午9点开门。故选D。"
      },
      {
        "number": 2,
        "stem": "At 2:30 p.m., visitors can have a close look at ________.",
        "options": [
          "A. elephants",
          "B. monkeys",
          "C. bears",
          "D. wolves"
        ],
        "answer": "C",
        "keywords": [
          "visitors",
          "can",
          "close",
          "look",
          "bears"
        ],
        "evidence": "Bear",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．细节理解题。根据“Bear”及“2:30 p.m.”可知，下午2:30可以近距离观看熊。故选C。"
      },
      {
        "number": 3,
        "stem": "With a ________, visitors can take the mini-train as many times as they want on the same day.",
        "options": [
          "A. 1-Day Pass",
          "B. hand stamp",
          "C. yearly card",
          "D. a passport"
        ],
        "answer": "B",
        "keywords": [
          "visitors",
          "can",
          "take",
          "mini",
          "train"
        ],
        "evidence": "Get a hand stamp at the gate of the zoo, and you can get on and off the mini-train as many times as you want on the same day.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．细节理解题。根据“Get a hand stamp at the gate of the zoo, and you can get on and off the mini-train as many times as you want on the same day.”可知，凭手章可无限次乘坐小火车。故选B。"
      },
      {
        "number": 4,
        "stem": "Which of the following about the zoo is TRUE?",
        "options": [
          "A. The schedule is for the autumn of 2025.",
          "B. Visitors can touch and feed animals.",
          "C. Visitors can take the Mini-train before 4:30.",
          "D. Visitors can visit newcityzoo.com for more information."
        ],
        "answer": "D",
        "keywords": [
          "zoo",
          "visitors",
          "can",
          "visit",
          "newcityzoo"
        ],
        "evidence": "For more information, please call the visitor centre at 0455-622-2375 or visit newcityzoo.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．细节理解题。根据“For more information, please call the visitor centre at 0455-622-2375 or visit newcityzoo.com.”可知，可通过网站获取更多信息。故选D。"
      },
      {
        "number": 5,
        "stem": "The main purpose (目的) of the material is to ________.",
        "options": [
          "A. protect the wild animals in the zoo",
          "B. provide choices of transportation in the zoo",
          "C. introduce the activities and rules in the zoo",
          "D. ask people not to visit the zoo during holidays"
        ],
        "answer": "C",
        "keywords": [
          "main",
          "purpose",
          "material",
          "introduce",
          "activities"
        ],
        "evidence": "WELCOME TO NEW CITY ZOO",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "5．主旨大意题。通读全文可知，本文主要介绍了动物园的一些活动和规则。故选C。主题04 人与自我——做人与做事"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——社会服务与人际沟通",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中D08",
    "title": "D. Turn Loss into Advantage",
    "meta": "2025-2026学年 新疆乌鲁木齐市米东区联考 九年级上学期期中考试 · D 篇 · 四选一",
    "paragraphs": [
      "Germany Goldman Press is a very famous company in Germany. It owns many bookstores all over the country. A large number of books were missing every year and this made the bookstore workers quite angry. Usually, at the end of each year, the names and numbers of those lost books would be recorded in a list. The list would be hung in the bookstore in order to remind the workers of the problem of stealing books.",
      "One day, a manager of the company found the form when he was doing some research in the bookstores. Suddenly he got a good idea. After he returned to the company, he began publishing (出版) those books listed in the form.",
      "A worldwide book fair (书展) is held in Frankfurt once every year. At the fair, every publisher will try to use different ways to improve the sale of their own books. On this year’s fair, Germany Goldman Press had a special method—they showed a list of “the ten greatest German books that were stolen most frequently (频繁地)”. Surprisingly, the list attracted a large number of booksellers coming to order books and this made Germany Goldman Press the biggest winner of the book fair.",
      "The booksellers might not believe what most publishing houses had advertised for their companies on the book fair, but they strongly believed the fact that the books that were stolen most frequently are usually readers’ favorite ones and certainly they would become the most popular books. From the experience of Germany Goldman Press, we realize that we haven’t lost the game even if we lost something. Most importantly, we should come up with ways to turn loss into advantage. Only in this way can we help ourselves out."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "Why were the bookstore workers angry?",
        "options": [
          "A. Because they had to work at the book fair.",
          "B. Because they were punished by the manager.",
          "C. Because they had to find out the stolen books.",
          "D. Because a large number of books were lost every year."
        ],
        "answer": "D",
        "keywords": [
          "bookstore",
          "workers",
          "angry",
          "because",
          "large"
        ],
        "evidence": "A large number of books were missing every year and this made the bookstore workers quite angry.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "1．第一段指出“A large number of books were missing every year and this made the bookstore workers quite angry.”，直接说明了书店员工生气的原因是每年大量书籍丢失。"
      },
      {
        "number": 2,
        "stem": "What did the manager of the company do after he found the form?",
        "options": [
          "A. He punished the workers who stole the books.",
          "B. He remembered the list of the stolen books.",
          "C. He hung the form in the company.",
          "D. He published the stolen books."
        ],
        "answer": "D",
        "keywords": [
          "manager",
          "company",
          "after",
          "found",
          "form"
        ],
        "evidence": "After he returned to the company, he began publishing (出版) those books listed in the form.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．第二段提到“After he returned to the company, he began publishing those books listed in the form.”，表明经理发现表单后开始出版表单上列出的被偷书籍。"
      },
      {
        "number": 3,
        "stem": "How often is the worldwide book fair held in Frankfurt?",
        "options": [
          "A. Once a year.",
          "B. Twice a year.",
          "C. Once every two years.",
          "D. Twice every two years."
        ],
        "answer": "A",
        "keywords": [
          "often",
          "worldwide",
          "book",
          "fair",
          "held"
        ],
        "evidence": "A worldwide book fair (书展) is held in Frankfurt once every year.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．第三段明确说明“A worldwide book fair is held in Frankfurt once every year.”，直接指出法兰克福书展每年举办一次。"
      },
      {
        "number": 4,
        "stem": "What can we learn from the experience of Germany Goldman Press?",
        "options": [
          "A. We should turn loss into advantage.",
          "B. We should record the lost books every year.",
          "C. We should steal books to make them popular.",
          "D. We should punish the workers who steal books."
        ],
        "answer": "A",
        "keywords": [
          "can",
          "learn",
          "experience",
          "germany",
          "goldman"
        ],
        "evidence": "From the experience of Germany Goldman Press, we realize that we haven’t lost the game even if we lost something.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．最后一段总结“From the experience of Germany Goldman Press, we realize that we haven’t lost the game even if we lost something. Most importantly, we should come up with ways to turn loss into advantage.”，表明从Goldman出版社的经历中可以学到应将损失转化为优势。主题05 人与自我——生活与学习"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与自我——做人与做事",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中C09",
    "title": "C. AI as an Online Tour Guide",
    "meta": "2025-2026学年 新疆自治区 九年级上学期期中考试 · C 篇 · 四选一",
    "paragraphs": [
      "Many travelers now use AI as their online tour guide to get a personalized (个人特制的) experience.",
      "During the May Day holiday, Wu Hongbo from Dalian traveled to Shanxi for the first time. He didn’t join a tour group because he wanted to save money and travel freely. Not knowing the travel routes (路线), he turned to AI for help.",
      "Wu used AI to plan a fantastic tour of Shanxi. He told the places he wanted to visit, his travel dates, budget (预算) and personal interests to an AI app. Soon, he got a personalized week- long travel plan. It showed him the ways to get around, places to visit, and hotels to stay in. Wu is interested in ancient buildings and tasty food, so the AI app also listed several less expensive places with rich culture and delicious food.",
      "Wu said, “The trip with AI was fantastic. I liked all the places it chose for me. It helped me learn more about Shanxi.”",
      "Some experts think AI can help travelers a lot. It can talk to travelers and tell them stories and culture about the places they visit. In the future, AI tour guides will work with human guides to make travel more exciting and personalized."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "Why didn’t Wu join a tour group?",
        "options": [
          "A. He knew Shanxi very well.",
          "B. He didn’t have time for a tour group.",
          "C. He didn’t like to travel with other people.",
          "D. He wanted to save money and travel freely."
        ],
        "answer": "D",
        "keywords": [
          "didn't",
          "join",
          "tour",
          "group",
          "wanted"
        ],
        "evidence": "He didn’t join a tour group because he wanted to save money and travel freely.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．细节理解题。根据“He didn’t join a tour group because he wanted to save money and travel freely.”可知，他不参加旅游团是为了省钱和自由旅行。故选D。"
      },
      {
        "number": 2,
        "stem": "What did Wu tell the AI app?",
        "options": [
          "A. The places he wanted to go.",
          "B. The places, dates, budget and interests.",
          "C. How much money he had.",
          "D. What he liked to eat."
        ],
        "answer": "B",
        "keywords": [
          "tell",
          "app",
          "places",
          "dates",
          "budget"
        ],
        "evidence": "He told the places he wanted to visit, his travel dates, budget (预算) and personal interests to an AI app.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．细节理解题。根据“He told the places he wanted to visit, his travel dates, budget and personal interests to an AI app.”可知，他告诉AI想去的地方、旅行日期、预算、个人兴趣。故选B。"
      },
      {
        "number": 3,
        "stem": "How did Wu feel about his trip with AI?",
        "options": [
          "A. It was interesting.",
          "B. It was expensive.",
          "C. It was fantastic.",
          "D. It was safe."
        ],
        "answer": "C",
        "keywords": [
          "feel",
          "trip",
          "fantastic"
        ],
        "evidence": "Wu said, “The trip with AI was fantastic.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．细节理解题。根据“The trip with AI was fantastic.”可知，AI规划的旅程特别棒。故选C。"
      },
      {
        "number": 4,
        "stem": "What will happen in the future according to the text?",
        "options": [
          "A. AI will help people do all the work about traveling.",
          "B. Only people will help travelers plan trips and solve problems.",
          "C. AI and people will work together to make travel fun.",
          "D. AI will not help people with their travel plans anymore."
        ],
        "answer": "C",
        "keywords": [
          "will",
          "happen",
          "future",
          "text",
          "people"
        ],
        "evidence": "In the future, AI tour guides will work with human guides to make travel more exciting and personalized.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．细节理解题。根据“In the future, AI tour guides will work with human guides to make travel more exciting and personalized.”可知，未来，人工智能导游将与人类导游协同合作，让旅行变得更令人兴奋，也更具个性化，即未来AI与人类协作会使旅行更有趣。故选C。"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与自我——生活与学习",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中D10",
    "title": "D. Wei Dongyi",
    "meta": "2025-2026学年 新疆乌鲁木齐市米东区联考 九年级上学期期中考试 · D 篇 · 四选一",
    "paragraphs": [
      "Wei Dongyi has become popular with many people in China. He is a young teacher at Peking University. Wei has won many awards and is seen as a genius by those who know him.",
      "Wei Dongyi was born in 1991 in Shandong. His father was a university math professor (教授) who kept many math books at home. Wei used to read his father’s books as his favorite hobby.",
      "Wei won the gold medal in the International Mathematical Olympiad (国际数学奥林匹克竞赛) twice when he was a high school student. He entered Peking University without taking the gaokao, the college entrance (进入许可) exam, due to his math skills. Wei graduated with high scores from Peking University in 2014. And he chose to stay at Peking University for his master’s degree, after which he got his PhD (博士学位) in only three and a half years. In 2019, Wei became an assistant math professor of Peking University.",
      "In a 2021 interview, Wei, holding a big plastic bottle of water caught the attention of people online. He was mistaken for a student at that time.",
      "Wei is famous not only as a math genius but also for his simple lifestyle. Wei is a disciplined (自律的) person. He always carries a plastic bottle of water, and he eats steamed buns and tofu in the dining hall. Now Wei Dongyi is known as “God Wei” in Peking University. Wei offers young people a new idol rather than pop stars."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "According to the passage, the underlined word “genius” means “________”.",
        "options": [
          "A. a person who used to be quiet",
          "B. a person who has great ability",
          "C. a person who owns a lot of fans",
          "D. a person who lives a simple life"
        ],
        "answer": "B",
        "keywords": [
          "underlined",
          "word",
          "genius",
          "means",
          "person"
        ],
        "evidence": "Wei has won many awards and is seen as a genius by those who know him.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "请依据原文定位句，核对题干与选项信息后作答。"
      },
      {
        "number": 2,
        "stem": "Before becoming a university student, Wei ________.",
        "options": [
          "A. got a high score in the final exam",
          "B. wasn’t allowed to take the gaokao",
          "C. won two international gold medals",
          "D. failed in the college entrance exam"
        ],
        "answer": "C",
        "keywords": [
          "before",
          "becoming",
          "university",
          "student",
          "wei"
        ],
        "evidence": "Wei won the gold medal in the International Mathematical Olympiad (国际数学奥林匹克竞赛) twice when he was a high school student.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．文章第三段提到：“Wei won the gold medal in the International Mathematical Olympiad twice when he was a high school student.”，说明在上大学前，他就拿下两枚国际奥数金牌。"
      },
      {
        "number": 3,
        "stem": "What does Paragraph 3 mainly tell us?",
        "options": [
          "A. Wei’s hobby.",
          "B. Wei’s past achievements.",
          "C. Wei’s attention from people.",
          "D. Wei’s college entrance exam."
        ],
        "answer": "B",
        "keywords": [
          "paragraph",
          "mainly",
          "tell",
          "wei's",
          "past"
        ],
        "evidence": "Wei Dongyi has become popular with many people in China.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．第三段主要讲述韦东奕高中获奖、保送北大、读研及攻读博士、留校任教的经历，都是他过往的各项成就。"
      },
      {
        "number": 4,
        "stem": "What can we infer from the 2021 interview?",
        "options": [
          "A. Wei worked hard all the time.",
          "B. The interview influenced Wei a lot.",
          "C. Wei looked like a common student.",
          "D. People online admired Wei very much."
        ],
        "answer": "C",
        "keywords": [
          "can",
          "infer",
          "2021",
          "interview",
          "wei"
        ],
        "evidence": "He was mistaken for a student at that time.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．文章第四段写道：“He was mistaken for a student at that time.”，由此能够推断出，韦东奕看起来和普通学生没有区别。主题06 人与社会——文学、艺术与体育"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与自我——生活与学习",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中D11",
    "title": "D. A Dancer's Journey to Xinjiang",
    "meta": "2025-2026学年 新疆自治区 九年级上学期期中考试 · D 篇 · 四选一",
    "paragraphs": [
      "Luo Hao started dancing when he was young. One day, he watched a video of a performance called Makit under the Sun (《阳光下的麦盖提》). It’s a beautiful folk dance from Xinjiang. He fell in love with the dance and decided to learn it by himself.",
      "Then Luo made a big decision. He traveled over 3,000 kilometers from his hometown to learn Xinjiang dance at Xinjiang Arts University in Urumqi. Luo had never been to northwest China before. At first, everything felt different, especially the dry weather. However, Luo’s love for dance encouraged him to persist.",
      "There, he learned that dance isn’t just about moving his body; it is also about sharing culture and telling stories. Even small parts — like how he moves his hands and the look on his face are very important in dance. Luo practiced those movements (动作) again and again.",
      "Luo’s hard work finally succeeded. This year, he got the chance to perform in the dance Makit under the Sun. He was very excited. “I spent much time practicing every day. I hope people around the world can see the beauty of Xinjiang through my dancing,” he said."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "Why did Luo go to Xinjiang?",
        "options": [
          "A. To perform in the dance.",
          "B. To visit Xinjiang Arts University.",
          "C. To learn Xinjiang dance.",
          "D. To meet some dancers in the video."
        ],
        "answer": "C",
        "keywords": [
          "luo",
          "xinjiang",
          "learn",
          "dance"
        ],
        "evidence": "He traveled over 3,000 kilometers from his hometown to learn Xinjiang dance at Xinjiang Arts University in Urumqi.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．细节理解题。根据“He traveled over 3,000 kilometers from his hometown to learn Xinjiang dance at Xinjiang Arts University in Urumqi.”可知，罗浩前往新疆是为了学习新疆舞蹈，选项C“学习新疆舞蹈”符合语境。故选C。"
      },
      {
        "number": 2,
        "stem": "Which of the following has the similar meaning to the underlined word “persist”?",
        "options": [
          "A. Take a break.",
          "B. Keep going.",
          "C. Pay attention.",
          "D. Ask for help."
        ],
        "answer": "B",
        "keywords": [
          "similar",
          "meaning",
          "underlined",
          "word",
          "persist"
        ],
        "evidence": "At first, everything felt different, especially the dry weather.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．词句猜测题。根据“At first, everything felt different, especially the dry weather. However, Luo’s love for dance encouraged him to persist.”可知，前文说环境陌生艰难，“however”表转折，说明对舞蹈的热爱让他“坚持下去”，“persist”与“Keep going”意思相近。故选B。"
      },
      {
        "number": 3,
        "stem": "What did Luo learn about dance in Xinjiang?",
        "options": [
          "A. Dance only needs good body movements.",
          "B. Dance is about sharing culture and telling stories.",
          "C. Small parts of dance are not important.",
          "D. He can learn dance well without practicing."
        ],
        "answer": "B",
        "keywords": [
          "luo",
          "learn",
          "dance",
          "xinjiang",
          "sharing"
        ],
        "evidence": "There, he learned that dance isn’t just about moving his body; it is also about sharing culture and telling stories.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．细节理解题。根据“There, he learned that dance isn’t just about moving his body; it is also about sharing culture and telling stories.”可知，罗浩了解到舞蹈不仅是肢体动作，还承载着分享文化、讲述故事的意义，选项B“舞蹈是关于分享文化和讲述故事的”符合语境。故选B。"
      },
      {
        "number": 4,
        "stem": "What might be the best title for the text?",
        "options": [
          "A. A Dance Lover’s Journey",
          "B. The Power of Folk Dance",
          "C. The Joy of Dancing",
          "D. A Long Trip to Xinjiang"
        ],
        "answer": "A",
        "keywords": [
          "might",
          "best",
          "title",
          "text",
          "dance"
        ],
        "evidence": "It’s a beautiful folk dance from Xinjiang.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．最佳标题题。全文围绕罗浩因热爱舞蹈远赴新疆学习、最终成功表演的经历展开，选项A“一位舞蹈爱好者的旅程”能概括他的学习与成长过程，符合文章主题。故选A。主题01 人与自我——生活与学习"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——文学、艺术与体育",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中C12",
    "title": "C. Stretchable Words",
    "meta": "2025-2026学年 新疆阿克苏 九年级上学期期中考试 · C 篇 · 四选一",
    "paragraphs": [
      "“Whaaaat’s uppppp?” Did you see anyone write like this? Now more and more kids are using these kinds of words in phone messages or other online messages. These kinds of words are called “stretchable” words (可拉伸单词).",
      "Young people especially like using them because these words are playful and interesting. Also, stretchable words can show strong feelings without the use of emojis (表情符号).",
      "For example, one of the most common stretchable words is “ha”. If something is just a little funny, you might just type “haha”. But if something is really funny, you might type “hahahahaha”.",
      "Another example is “yeeeesssss”. When you type “yes”, it might sound like you are just fine with an idea. But if you use “yeeeesssss”, it shows that you are very excited about it.",
      "Although stretchable words are popular online, many parents and teachers are worried. They think the stretchable words may make a difference to their children’s schoolwork. We know that more formal writing is necessary in school. So if you like using them when talking with friends, remember not to use them in your homework!"
    ],
    "questions": [
      {
        "number": 1,
        "stem": "How does the writer start the passage?",
        "options": [
          "A. By telling a story.",
          "B. By showing a scene.",
          "C. By asking questions.",
          "D. By listing numbers."
        ],
        "answer": "C",
        "keywords": [
          "writer",
          "start",
          "asking",
          "questions"
        ],
        "evidence": "Did you see anyone write like this?",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．细节理解题。根据文章第1段“‘Whaaaat’s uppppp?’ Did you see anyone write like this?”可知，作者以提问的方式开篇。故选C。"
      },
      {
        "number": 2,
        "stem": "Which of the following will you use if you are very excited about anything?",
        "options": [
          "A. Yes.",
          "B. Haha.",
          "C. Hahahahaha.",
          "D. Yeeeesssss."
        ],
        "answer": "D",
        "keywords": [
          "will",
          "use",
          "very",
          "excited",
          "anything"
        ],
        "evidence": "But if you use “yeeeesssss”, it shows that you are very excited about it.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．细节理解题。根据文章第4段“But if you use ‘yeeeesssss’, it shows that you are very excited about it.”可知，表达兴奋时使用“yeeeesssss”。故选D。"
      },
      {
        "number": 3,
        "stem": "What does the underlined word “formal” in the last paragraph mean in Chinese?",
        "options": [
          "A. 正式的",
          "B. 随意的",
          "C. 幽默的",
          "D. 神秘的"
        ],
        "answer": "A",
        "keywords": [
          "underlined",
          "word",
          "formal",
          "last",
          "paragraph"
        ],
        "evidence": "We know that more formal writing is necessary in school.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．词句猜测题。根据文章最后一段“more formal writing is necessary in school”可知，“formal”意为“正式的”。故选A。"
      },
      {
        "number": 4,
        "stem": "In which part of the newspaper can we read the passage?",
        "options": [
          "A. Sports.",
          "B. Language.",
          "C. Music.",
          "D. Festivals."
        ],
        "answer": "B",
        "keywords": [
          "part",
          "newspaper",
          "can",
          "read",
          "language"
        ],
        "evidence": "Also, stretchable words can show strong feelings without the use of emojis (表情符号).",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．推理判断题。全文围绕“可拉伸单词”这一语言现象展开，属于语言使用范畴，因此最可能出现在报纸的“Language”板块。故选B。主题02 人与社会——科学与技术"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与自我——生活与学习",
      "期中真题",
      "新疆专用"
    ]
  },
  {
    "id": "2025期中C13",
    "title": "C. Smart Navigation Shoes",
    "meta": "2025-2026学年 新疆阿克苏 九年级上学期期中考试 · C 篇 · 四选一",
    "paragraphs": [
      "Have you ever walked in the dark? Can you imagine walking with your eyes closed? This is the real experience for blind people. There are sidewalks (人行道) for blind people. But the travel of the blind is still a big problem. Luckily, an Austrian company (公司) has developed a useful travel tool for the blind—smart navigation (导航) shoes. They can help blind people walk safely.",
      "The smart shoes have a camera and it can send information in the front. This system can sense objects 4 meters away. If the wearer (穿戴者) is in a dangerous situation, they will warn him or her by shaking and making a warning sound. Then the blind can avoid the danger and go to the place they want safely.",
      "Now, this company is working on creating better shoes. They’ll use AI technology to find objects on the sidewalks and tell wearers what the objects are. For example, the shoes might tell you if there’s a car or a wall in front of you.",
      "“We believe that technology can make a difference to humans. If the shoes can be used for the blind or people who cannot see something clearly, their life will change a lot,” the leader of this company said."
    ],
    "questions": [
      {
        "number": 1,
        "stem": "What can the navigation shoes do?",
        "options": [
          "A. Help blind people walk safely.",
          "B. Help blind people drive safely.",
          "C. Help blind people cook meals.",
          "D. Help blind people do some shopping."
        ],
        "answer": "A",
        "keywords": [
          "can",
          "navigation",
          "shoes",
          "help",
          "blind"
        ],
        "evidence": "They can help blind people walk safely.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "【详解】1．细节理解题。根据文章第1段“They can help blind people walk safely.”可知，导航鞋的功能是帮助盲人安全行走。故选A。"
      },
      {
        "number": 2,
        "stem": "What does the underlined word “it” in Paragraph 2 refer to?",
        "options": [
          "A. The wearer.",
          "B. The camera.",
          "C. The sound.",
          "D. The danger."
        ],
        "answer": "B",
        "keywords": [
          "underlined",
          "word",
          "paragraph",
          "refer",
          "camera"
        ],
        "evidence": "The smart shoes have a camera and it can send information in the front.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "2．词句猜测题。根据文章第2段“The smart shoes have a camera and it can send information in the front.”可知，“it”指代的是前文提到的“camera”。故选B。"
      },
      {
        "number": 3,
        "stem": "What can we know from the last two paragraphs?",
        "options": [
          "A. The smart shoes’ color.",
          "B. The smart shoes’ popularity.",
          "C. The smart shoes’ price.",
          "D. The smart shoes’ future."
        ],
        "answer": "D",
        "keywords": [
          "can",
          "know",
          "last",
          "two",
          "paragraphs"
        ],
        "evidence": "Now, this company is working on creating better shoes.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "3．推理判断题。根据文章第3段“Now, this company is working on creating better shoes.”和第4段“We believe that technology can make a difference to humans.”可知，最后两段主要讨论智能鞋的未来发展。故选D。"
      },
      {
        "number": 4,
        "stem": "What is the best title for the passage?",
        "options": [
          "A. A Special Company",
          "B. A High-technology Camera",
          "C. A Useful Travel Tool for the Blind",
          "D. A Real Experience for Blind People"
        ],
        "answer": "C",
        "keywords": [
          "best",
          "title",
          "useful",
          "travel",
          "tool"
        ],
        "evidence": "Luckily, an Austrian company (公司) has developed a useful travel tool for the blind—smart navigation (导航) shoes.",
        "keywordTip": "先划出题干中的核心词，再回原文定位对应信息。",
        "compare": [
          "A：请回到原文核对该选项与定位句是否一致。",
          "B：请回到原文核对该选项与定位句是否一致。",
          "C：请回到原文核对该选项与定位句是否一致。",
          "D：请回到原文核对该选项与定位句是否一致。"
        ],
        "explanation": "4．最佳标题。根据全文内容可知，文章主要介绍了一款为盲人设计的智能导航鞋的功能和意义。选项C“A Useful Travel Tool for the Blind”最能概括文章主旨。故选C。"
      }
    ],
    "importBatch": "20261019",
    "tags": [
      "人与社会——科学与技术",
      "期中真题",
      "新疆专用"
    ]
  }
]);
})();
