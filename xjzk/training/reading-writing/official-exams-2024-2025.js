(function () {
  const items = window.MVP_DATA?.practiceItems;
  if (!Array.isArray(items)) return;

  const source2025 = "2025年新疆维吾尔自治区、新疆生产建设兵团初中学业水平考试英语真题｜射箭中的坚持";
  const source2024 = "2024年新疆维吾尔自治区、新疆生产建设兵团初中学业水平考试英语真题｜劳动教育与成长";
  const startId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
  const officialItems = [
    {
      id: startId,
      category: "同义结构转换",
      source: source2025,
      number: "45",
      original: "walked in a park",
      target: "took a walk in a park",
      meaning: "在公园散步",
      point: "同义结构转换：walk in a park -> take a walk in a park；原文为过去时，take变took。",
      studyPoint: "先识别walk与take a walk的同义关系，再保持一般过去时。",
      originalSentence: "My father and I walked in a park.",
      targetSentence: "My father and I took a ___ in a park.",
      answer: "walk"
    },
    {
      id: startId + 1,
      category: "同义结构转换",
      source: source2025,
      number: "46",
      original: "decided to have a try",
      target: "wanted to try",
      meaning: "想试一试",
      point: "语义转换：decide to have a try与want to try在本句中都表达想尝试射箭；to后用动词原形。",
      studyPoint: "定位原文have a try，再根据targetSentence中的to判断填动词原形try。",
      originalSentence: "When I saw some people shooting arrows on the square, I decided to have a try.",
      targetSentence: "I saw some people shooting arrows and I wanted to ___.",
      answer: "try"
    },
    {
      id: startId + 2,
      category: "原词复现 / 物主代词",
      source: source2025,
      number: "47",
      original: "Then it was my turn to shoot",
      target: "it was my turn",
      meaning: "轮到我",
      point: "原词复现：原文my turn直接对应缩写文；turn前需要形容词性物主代词my。",
      studyPoint: "先找到原文Then it was my turn，再核对主语仍是作者I。",
      originalSentence: "Then it was my turn to shoot.",
      targetSentence: "Then it was ___ turn.",
      answer: "my"
    },
    {
      id: startId + 3,
      category: "原词复现 / 时态一致",
      source: source2025,
      number: "48",
      original: "My father encouraged me to take one more shot",
      target: "my father encouraged me to go on",
      meaning: "鼓励我继续",
      point: "原词复现：encouraged直接对应缩写文；全文叙述过去经历，保持一般过去时。",
      studyPoint: "定位原文encouraged me，再检查后面的me to go on结构。",
      originalSentence: "My father encouraged me to take one more shot.",
      targetSentence: "The time I was to give up, my father ___ me to go on.",
      answer: "encouraged"
    },
    {
      id: startId + 4,
      category: "同义结构转换 / 固定搭配",
      source: source2025,
      number: "49",
      original: "Nobody is born to do well in everything",
      target: "nobody is born to be good at everything",
      meaning: "天生擅长所有事情",
      point: "同义转换：do well in = be good at；be后接形容词good。",
      studyPoint: "看到at doing everything，优先联想到be good at doing。",
      originalSentence: "Nobody is born to do well in everything.",
      targetSentence: "Nobody is born to be ___ at doing everything.",
      answer: "good"
    },
    {
      id: startId + 5,
      category: "原词复现 / 名词复数",
      source: source2025,
      number: "50",
      original: "challenges in life",
      target: "face challenges bravely",
      meaning: "勇敢面对挑战",
      point: "原词复现：原文challenges直接对应缩写文；可数名词表示多种挑战，用复数。",
      studyPoint: "回看原文From this experience后的总结句，锁定challenges。",
      originalSentence: "From this experience, I realize that challenges in life are not as difficult as they seem to be.",
      targetSentence: "If we face ___ bravely, learn from failure, and keep trying, we are sure to succeed.",
      answer: "challenges"
    },
    {
      id: startId + 6,
      category: "原词复现 / 形容词",
      source: source2024,
      number: "45",
      original: "At first I didn't know that was so difficult",
      target: "didn't know that was so difficult",
      meaning: "不知道那么困难",
      point: "原词复现：原文difficult直接对应缩写文；so后接形容词。",
      studyPoint: "定位原文At first开头的句子，注意so + 形容词结构。",
      originalSentence: "At first I didn't know that was so difficult.",
      targetSentence: "At first I didn't know that was so ___.",
      answer: "difficult"
    },
    {
      id: startId + 7,
      category: "原词复现 / 并列结构",
      source: source2024,
      number: "46",
      original: "either too soft or too hard",
      target: "either too soft or too hard",
      meaning: "不是太软就是太硬",
      point: "原词复现：either ... or ...连接对应成分，soft与hard构成反义并列。",
      studyPoint: "看到or too hard，回原文找与hard相对的形容词soft。",
      originalSentence: "The dough was made either too soft or too hard.",
      targetSentence: "I made the dough either too ___ or too hard.",
      answer: "soft"
    },
    {
      id: startId + 8,
      category: "原词复现 / 名词",
      source: source2024,
      number: "47",
      original: "saw the look of joy on my parents' faces",
      target: "seeing the look of joy",
      meaning: "看到喜悦的神情",
      point: "原词复现：the look of joy原样对应缩写文。",
      studyPoint: "定位原文saw后面的名词短语，注意空前有the、空后有of。",
      originalSentence: "I got such a strong feeling of satisfaction when I enjoyed the noodles and saw the look of joy on my parents' faces.",
      targetSentence: "I was pleased when enjoying the noodles and seeing the ___ of joy on my parents' faces.",
      answer: "look"
    },
    {
      id: startId + 9,
      category: "同义结构转换 / 固定搭配",
      source: source2024,
      number: "48",
      original: "They were proud of me",
      target: "They took pride in me",
      meaning: "他们为我感到骄傲",
      point: "同义转换：be proud of = take pride in；take后需要名词pride。",
      studyPoint: "识别proud与pride的词性转换，并核对take pride in搭配。",
      originalSentence: "They were proud of me.",
      targetSentence: "They took ___ in me.",
      answer: "pride"
    },
    {
      id: startId + 10,
      category: "原词复现 / 时态一致",
      source: source2024,
      number: "49",
      original: "I fell in love with cooking",
      target: "I fell in love with cooking",
      meaning: "我爱上了做饭",
      point: "原词复现：fall in love with为固定搭配；全文叙述过去经历，fall用过去式fell。",
      studyPoint: "定位原文Slowly后的句子，保持过去时。",
      originalSentence: "Slowly, I fell in love with cooking.",
      targetSentence: "Slowly, I ___ in love with cooking.",
      answer: "fell"
    },
    {
      id: startId + 11,
      category: "原词复现 / 名词",
      source: source2024,
      number: "50",
      original: "they didn't have the chance",
      target: "they didn't have the chance",
      meaning: "他们没有这个机会",
      point: "原词复现：原文chance直接对应缩写文，the后接名词。",
      studyPoint: "定位朋友评价劳动经历的句子，锁定chance。",
      originalSentence: "They thought it was a pity that they didn't have the chance.",
      targetSentence: "They thought it was a pity that they didn't have the ___.",
      answer: "chance"
    }
  ];

  const existingSources = new Set(items.map((item) => item.source));
  officialItems.forEach((item) => {
    if (!existingSources.has(item.source) || !items.some((existing) => existing.source === item.source && String(existing.number) === String(item.number))) {
      items.push(item);
    }
  });
})();
