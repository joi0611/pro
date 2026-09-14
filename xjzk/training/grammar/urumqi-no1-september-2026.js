(function () {
  const source = "2026年乌鲁木齐市第一中学九年级上学期9月模考";

  addExamArticle("urumqiNo1September2026Grammar", {
    title: source,
    serial: "01",
    practiceTitle: "殷玉珍四十年治沙",
    source,
    group: "中考练习篇目",
    startNo: 70,
    questions: [
      nq(70, ["a"], ["a", "an", "the", "/"], "冠词", "不定冠词", "terribly dry desert", "desert 是可数名词单数，此处泛指一片干旱沙漠；terribly 以辅音音素开头，用 a。"),
      q(71, "(hard)", ["harder"], ["hard", "harder", "hardest", "hardly"], "形容词与副词", "比较级与最高级", "much / than today", "than 是比较级标志，much 修饰比较级，hard 变为 harder。"),
      q(72, "(it)", ["its"], ["it", "its", "it's", "itself"], "代词", "形容词性物主代词", "poor environment", "空后是名词 environment，需要形容词性物主代词 its 修饰。"),
      q(73, "(tree)", ["trees"], ["tree", "trees", "tree's", "trees'"], "名词", "可数名词变复数", "buy young / kept planting", "此处泛指许多小树苗，tree 是可数名词，使用复数 trees。"),
      vq(74, "(help)", ["to help"], ["help", "to help", "helping", "helped"], "有", "非谓语", "to do", "gave Yin Yuzhen money", "给钱的目的是帮助她治沙，用动词不定式 to help 作目的状语。"),
      nq(75, ["but"], ["and", "but", "so", "because"], "连词", "转折连词", "doubted whether / made a serious promise", "前半句说他怀疑沙漠能否变绿，后半句说殷玉珍郑重承诺，前后转折，用 but。"),
      vq(76, "(turn)", ["has turned"], ["turns", "turned", "has turned", "is turning"], "没有", "谓语", "时态", "Over the past 40 years", "Over the past 40 years 是现在完成时标志；主语 Yin Yuzhen 为单数，用 has turned。"),
      q(77, "(quiet)", ["quietly"], ["quiet", "quietly", "quieter", "quietness"], "形容词与副词", "形容词变副词", "works / on the land", "空格修饰动词 works，需要副词 quietly。"),
      q(78, "(hero)", ["heroes"], ["hero", "heroes", "hero's", "heroine"], "名词", "可数名词变复数", "Yin Yuzhen and Sakolsky are", "主语是两个人，hero 要用复数 heroes。"),
      vq(79, "(become)", ["will become"], ["becomes", "became", "will become", "has become"], "没有", "谓语", "时态", "if more people try", "if 引导条件状语从句，遵循主将从现，主句用一般将来时 will become。"),
      nq(80, ["that"], ["that", "what", "whether", "because"], "连词", "宾语从句引导词", "tells us / small kindness", "tell us 后是成分完整、意义完整的宾语从句，用 that 引导。")
    ],
    paragraphs: [
      `Forty years ago, Maowusu Sandy Land was [[70]] terribly dry desert. Strong winds blew sand everywhere, and people’s life there was much [[71]] (hard) than today. Yin Yuzhen lived in a small sand house and decided to change [[72]] (it) poor environment. She used all her savings to buy young [[73]] (tree) and kept planting year after year.`,
      `In 2000, an American man called Sakolsky came to visit and gave Yin Yuzhen money [[74]] (help) her fight the sand. He doubted whether the desert could turn green, [[75]] Yin Yuzhen made a serious promise to him. Over the past 40 years, Yin Yuzhen [[76]] (turn) large areas of desert into lively forest. She works [[77]] (quiet) on the land and never gives up.`,
      `Yin Yuzhen and Sakolsky are the [[78]] (hero). Thanks to them, great changes have taken place. The desert is no longer lifeless. People believe the world [[79]] (become) much greener if more people try their best to protect nature. The story tells us [[80]] small kindness and long-term efforts can finally change the whole world.`
    ]
  });

  renderExam();
})();
