(function () {
  const source = "2026-2027乌鲁木齐13中期中考试";

  addExamArticle("urumqiNo13Midterm202611Grammar", {
    title: source,
    serial: "202611",
    practiceTitle: "乌鲁木齐马拉松",
    source,
    group: "中考练习篇目",
    importBatch: "202611",
    updateLabel: "2026年11月更新",
    startNo: 73,
    questions: [
      nq(73, ["in"], ["in", "on", "at", "for"], "介词", "固定搭配", "took part ___ it", "take part in 为固定短语，意为“参加”，此处表示参加这项活动，用介词 in。"),
      q(74, "(kid)", ["kids", "children"], ["kid", "kids", "child", "children"], "名词", "可数名词变复数", "a fun run for ___", "此处泛指孩子们，kid/child 是可数名词，空前没有限定一个，应用复数 kids/children。"),
      vq(75, "(pass)", ["passes"], ["pass", "passes", "passing", "passed"], "没有", "谓语", "时态", "The race runs through ... and ___ many beautiful places", "and 连接并列谓语，与 runs 时态一致；主语 The race 是第三人称单数，一般现在时用 passes。"),
      nq(76, ["the"], ["a", "an", "the", "/"], "冠词", "定冠词", "Along ___ way", "along the way 为固定搭配，意为“沿途”，way 前用定冠词 the。"),
      vq(77, "(cheer)", ["cheered"], ["cheer", "cheers", "cheered", "cheering"], "没有", "谓语", "时态", "stood by the road and ___ for runners loudly", "and 连接并列谓语，与 stood 一致，叙述过去发生的动作，用一般过去时 cheered。"),
      vq(78, "(include)", ["including"], ["include", "includes", "included", "including"], "没有", "非谓语", "现在分词", "wonderful views of Urumqi, ___ parks and mountain sights", "此处对前面的 views 作补充说明，include 与其逻辑主语是主动关系，用现在分词 including，意为“包括”。"),
      q(79, "(they)", ["themselves"], ["they", "them", "their", "themselves"], "代词", "反身代词", "challenge ___", "主语 Some runners 与宾语指同一批人，表示“挑战他们自己”，用反身代词 themselves。"),
      q(80, "(great)", ["greatest"], ["great", "greater", "greatest", "the greatest"], "形容词与副词", "比较级与最高级", "one of the ___ ways", "one of the + 形容词最高级 + 名词复数，是固定句型，意为“最……的之一”，great 的最高级为 greatest。"),
      nq(81, ["but"], ["and", "but", "or", "so"], "连词", "并列连词", "not only a win, ___ also a new start", "not only ... but also ... 为固定搭配，意为“不但……而且……”，连接并列成分。"),
      q(82, "(health)", ["healthier"], ["healthy", "healthier", "healthiest", "health"], "形容词与副词", "比较级与最高级", "the ___ you will be", "“the + 比较级, the + 比较级”表示“越……越……”，health 对应形容词 healthy，其比较级为 healthier。")
    ],
    paragraphs: [
      `The 2026 Urumqi Marathon（马拉松）started at 7:30 on September 13. It began at Xinjiang International Convention and Exhibition Center. About 15,000 runners from all over China took part [[73]] it. The event includes the full marathon, the half marathon and a fun run for [[74]] (kid).`,
      `The race runs through six city areas and [[75]] (pass) many beautiful places. Along [[76]] way, local people stood by the road and [[77]] (cheer) for runners loudly. Many runners said they loved the wonderful views of Urumqi, [[78]] (include) parks and mountain sights. Some runners came here just to enjoy the city and challenge [[79]] (they).`,
      `This great sports event is one of the [[80]] (great) ways to help more people know about Urumqi. It shows the city's beauty and energy. It also encourages us to keep healthy and take exercise in our daily life. For many people, finishing the marathon is not only a win, [[81]] also a new start of keeping exercising. The more exercise you do, the [[82]] (health) you will be!`
    ]
  });

  renderExam();
})();
