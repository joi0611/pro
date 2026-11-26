{ const additions = [
  {
    "id": 2026112542,
    "number": "42",
    "source": "2026年乌鲁木齐市第126中学慈湖校区七年级上学期期中预考｜玛丽的学校和教室",
    "confirmedSource": true,
    "updateLabel": "202611月更新",
    "category": "主谓一致",
    "meaning": "就读",
    "original": "study",
    "target": "studies",
    "originalSentence": "I study in a middle school in Chongqing.",
    "targetSentence": "She ___ in a middle school in Chongqing.",
    "answer": "studies",
    "point": "根据原文“I study in a middle school in Chongqing.”，可知Mary在重庆学习，主语“She”为第三人称单数，故填动词三单形式“studies”。",
    "studyPoint": "根据原文“I study in a middle school in Chongqing.”，可知Mary在重庆学习，主语“She”为第三人称单数，故填动词三单形式“studies”。"
  },
  {
    "id": 2026112544,
    "number": "44",
    "source": "2026年乌鲁木齐市第126中学慈湖校区七年级上学期期中预考｜玛丽的学校和教室",
    "confirmedSource": true,
    "updateLabel": "202611月更新",
    "category": "词形转换",
    "meaning": "有趣的",
    "original": "interested in their classes",
    "target": "interesting",
    "originalSentence": "The teachers are kind to us and we are interested in their classes.",
    "targetSentence": "She thinks it’s a nice school and she loves her teachers and their classes are___.",
    "answer": "interesting",
    "point": "空格处应是形容词作表语，描述课堂的状态。根据原文“we are interested in their classes”，可知他们的课堂都很有趣，故填“interesting”。",
    "studyPoint": "空格处应是形容词作表语，描述课堂的状态。根据原文“we are interested in their classes”，可知他们的课堂都很有趣，故填“interesting”。"
  },
  {
    "id": 2026112545,
    "number": "45",
    "source": "2026年乌鲁木齐市第126中学慈湖校区七年级上学期期中预考｜玛丽的学校和教室",
    "confirmedSource": true,
    "updateLabel": "202611月更新",
    "category": "同义改写",
    "meaning": "同班同学",
    "original": "in the same class",
    "target": "classmate",
    "originalSentence": "Li Hua and I are in the same class.",
    "targetSentence": "Li Hua is Mary’s ___.",
    "answer": "classmate",
    "point": "根据原文“Li Hua and I are in the same class.”，李华和Mary是同班同学，“is”后填可数名词单数，故填“classmate”。",
    "studyPoint": "根据原文“Li Hua and I are in the same class.”，李华和Mary是同班同学，“is”后填可数名词单数，故填“classmate”。"
  },
  {
    "id": 2026112546,
    "number": "46",
    "source": "2026年乌鲁木齐市第126中学慈湖校区七年级上学期期中预考｜玛丽的学校和教室",
    "confirmedSource": true,
    "updateLabel": "202611月更新",
    "category": "代词宾格",
    "meaning": "他",
    "original": "he",
    "target": "him",
    "originalSentence": "It’s time that he should clean it up.",
    "targetSentence": "It is time for ___ to clean it up!",
    "answer": "him",
    "point": "根据原文“It’s time that he should clean it up.”，可知到了他该打扫的时间了，“for”后应接宾格，故填“him”。",
    "studyPoint": "根据原文“It’s time that he should clean it up.”，可知到了他该打扫的时间了，“for”后应接宾格，故填“him”。"
  }
];
const items=window.MVP_DATA.practiceItems;
for (const item of additions) if (!items.some(existing => existing.id === item.id)) items.push(item); }
