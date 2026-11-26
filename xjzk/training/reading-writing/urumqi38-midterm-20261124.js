(function () {
  const additions = [
    {
      "id": 2026112447,
      "source": "2026年乌鲁木齐市第三十八中学九年级上学期期中学情诊断｜贝聿铭与卢浮宫金字塔",
      "number": "51",
      "confirmedSource": true,
      "updateLabel": "202611月更新",
      "category": "原词复现 / 名词",
      "original": "entrance",
      "target": "entrance",
      "meaning": "入口",
      "point": "根据第一段“The museum has a special glass pyramid at its entrance.”可知，贝聿铭设计了卢浮宫入口处的玻璃金字塔。应填 entrance。",
      "studyPoint": "根据第一段“The museum has a special glass pyramid at its entrance.”可知，贝聿铭设计了卢浮宫入口处的玻璃金字塔。应填 entrance。",
      "originalSentence": "The museum has a special glass pyramid at its entrance.",
      "targetSentence": "Ieoh Ming Pei designed the famous glass pyramid at the ___ of the Louvre in Paris.",
      "answer": "entrance"
    },
    {
      "id": 2026112448,
      "source": "2026年乌鲁木齐市第三十八中学九年级上学期期中学情诊断｜贝聿铭与卢浮宫金字塔",
      "number": "52",
      "confirmedSource": true,
      "updateLabel": "202611月更新",
      "category": "原词复现 / 名词复数",
      "original": "gardens",
      "target": "gardens",
      "meaning": "园林",
      "point": "根据第二段“As a young child, he spent a lot of time in the gardens of Suzhou.”可知，他小时候常待在苏州的园林里。应填 gardens。",
      "studyPoint": "根据第二段“As a young child, he spent a lot of time in the gardens of Suzhou.”可知，他小时候常待在苏州的园林里。应填 gardens。",
      "originalSentence": "As a young child, he spent a lot of time in the gardens of Suzhou.",
      "targetSentence": "Pei grew up in China, and as a young child, he spent a lot of time in the ___ of Suzhou, which gave him many ideas for his architectural designs.",
      "answer": "gardens"
    },
    {
      "id": 2026112449,
      "source": "2026年乌鲁木齐市第三十八中学九年级上学期期中学情诊断｜贝聿铭与卢浮宫金字塔",
      "number": "53",
      "confirmedSource": true,
      "updateLabel": "202611月更新",
      "category": "原词复现 / 名词",
      "original": "architecture",
      "target": "architecture",
      "meaning": "建筑学",
      "point": "第三段说贝聿铭上大学是为了深入学习建筑学。摘要中 about 后接名词 architecture。",
      "studyPoint": "第三段说贝聿铭上大学是为了深入学习建筑学。摘要中 about 后接名词 architecture。",
      "originalSentence": "Then he went to college to learn more about architecture.",
      "targetSentence": "He moved to the USA at 18 and learned more about ___ in college.",
      "answer": "architecture"
    },
    {
      "id": 2026112450,
      "source": "2026年乌鲁木齐市第三十八中学九年级上学期期中学情诊断｜贝聿铭与卢浮宫金字塔",
      "number": "54",
      "confirmedSource": true,
      "updateLabel": "202611月更新",
      "category": "原词复现 / 动词原形",
      "original": "rebuild",
      "target": "rebuild",
      "meaning": "重建",
      "point": "根据第四段“the president of France saw Pei’s works and wanted him to help rebuild the entrance to the Louvre.” 可知，法国总统想让他帮助重建卢浮宫入口。应填 rebuild。",
      "studyPoint": "根据第四段“the president of France saw Pei’s works and wanted him to help rebuild the entrance to the Louvre.” 可知，法国总统想让他帮助重建卢浮宫入口。应填 rebuild。",
      "originalSentence": "In the 1980s, the president of France saw Pei’s works and wanted him to help rebuild the entrance to the Louvre.",
      "targetSentence": "In the 1980s, the president of France asked him to help ___ the entrance to the Louvre.",
      "answer": "rebuild"
    },
    {
      "id": 2026112451,
      "source": "2026年乌鲁木齐市第三十八中学九年级上学期期中学情诊断｜贝聿铭与卢浮宫金字塔",
      "number": "55",
      "confirmedSource": true,
      "updateLabel": "202611月更新",
      "category": "同义转换 / 动词过去式",
      "original": "didn’t agree",
      "target": "disagreed",
      "meaning": "不同意",
      "point": "根据第四段“Many people didn’t agree with his idea!”可知，很多人不同意他的想法。应填 disagreed。",
      "studyPoint": "根据第四段“Many people didn’t agree with his idea!”可知，很多人不同意他的想法。应填 disagreed。",
      "originalSentence": "Many people didn’t agree with his idea!",
      "targetSentence": "Although many people ___ with his idea, he finally designed a large glass pyramid with three smaller ones around it.",
      "answer": "disagreed",
      "learningPair": [
        "didn’t agree",
        "disagreed"
      ]
    },
    {
      "id": 2026112452,
      "source": "2026年乌鲁木齐市第三十八中学九年级上学期期中学情诊断｜贝聿铭与卢浮宫金字塔",
      "number": "56",
      "confirmedSource": true,
      "updateLabel": "202611月更新",
      "category": "原词复现 / 名词复数",
      "original": "prizes",
      "target": "prizes",
      "meaning": "奖项",
      "point": "根据第五段“These designs also brought him many prizes.”可知，他赢得了许多奖项。应填 prizes。",
      "studyPoint": "根据第五段“These designs also brought him many prizes.”可知，他赢得了许多奖项。应填 prizes。",
      "originalSentence": "These designs also brought him many prizes ( 奖).",
      "targetSentence": "Pei won many ___.",
      "answer": "prizes"
    }
  ];
  const items = window.MVP_DATA.practiceItems;
  for (const item of additions) {
    if (!items.some(existing => existing.source === item.source && String(existing.number) === item.number)) items.push(item);
  }
})();
