(function () {
  const data = window.MVP_DATA;
  if (!data || !Array.isArray(data.practiceItems)) return;

  const items = data.practiceItems;
  const source = "2026年乌鲁木齐市第一中学九年级上学期9月模考｜喀什古城";
  const additions = [
    {
      id: 217, category: "同义结构转换 / 短语", source, number: "61",
      original: "more than 2,000 years", target: "over 2,000 years", meaning: "两千多年",
      point: "同义结构转换：more than 与 over 都可表示“超过”。",
      studyPoint: "看到数量前的 more than，检查缩写文是否可用 over 作同义替换。",
      originalSentence: "With a history of more than 2,000 years, it is one of the largest earthen building groups in the world and shows the great wisdom of ancient people.",
      targetSentence: "It has a history of ___ 2,000 years and shows the wisdom of ancient people.", answer: "over",
      learningPair: ["more than", "over"]
    },
    {
      id: 218, category: "原词复现 / 名词复数", source, number: "62",
      original: "96 winding alleys", target: "96 winding alleys", meaning: "96条蜿蜒的小巷",
      point: "原词复现：数字 96 后使用可数名词复数 alleys。",
      studyPoint: "先用 96 winding 定位原文，再完整抄写复数名词 alleys。",
      originalSentence: "Different from modern cities, it has 96 winding alleys.",
      targetSentence: "It has 96 winding ___.", answer: "alleys"
    },
    {
      id: 219, category: "原词复现 / 名词", source, number: "63",
      original: "a perfect mix of nature and human culture", target: "a wonderful mix of nature and human culture", meaning: "自然与人文的完美结合",
      point: "原词复现：of 后的 nature 与 human culture 构成并列。",
      studyPoint: "根据 mix of ... and human culture 回原文定位并列名词 nature。",
      originalSentence: "It is not only a place of old buildings, but also a perfect mix of nature and human culture.",
      targetSentence: "It is a wonderful mix of ___ and human culture.", answer: "nature"
    },
    {
      id: 220, category: "原词复现 / 名词", source, number: "64",
      original: "a warm living community", target: "a lively living community", meaning: "充满活力的生活社区",
      point: "原词复现：原文 community 直接对应缩写文的中心名词。",
      studyPoint: "根据 not just a tourist spot 和 living 回原文定位 community。",
      originalSentence: "It is still a warm living community.",
      targetSentence: "The ancient city is not just a tourist spot, but a lively living ___.", answer: "community"
    },
    {
      id: 221, category: "原词复现 / 形容词", source, number: "65",
      original: "a precious treasure of Xinjiang", target: "a precious cultural treasure of Xinjiang", meaning: "新疆珍贵的文化瑰宝",
      point: "原词复现：precious 在名词 cultural treasure 前作定语。",
      studyPoint: "定位末段 treasure of Xinjiang，提取修饰 treasure 的形容词 precious。",
      originalSentence: "The Ancient City of Kashgar is a precious treasure of Xinjiang.",
      targetSentence: "The Ancient City of Kashgar is a ___ cultural treasure of Xinjiang.", answer: "precious"
    },
    {
      id: 222, category: "原词复现 / 动词原形", source, number: "66",
      original: "protect it well", target: "need to protect", meaning: "需要保护",
      point: "原词复现：need to 后接动词原形 protect。",
      studyPoint: "根据 timeless wonder 回原文定位 protect，并检查 to 后使用动词原形。",
      originalSentence: "We protect it well and let this timeless wonder shine forever.",
      targetSentence: "We need to ___ this timeless wonder.", answer: "protect"
    }
  ];

  additions.forEach((item) => {
    const exists = items.some(existing => existing.source === item.source && String(existing.number) === String(item.number));
    if (!exists) items.push({ ...item, confirmedSource: true });
  });
})();
