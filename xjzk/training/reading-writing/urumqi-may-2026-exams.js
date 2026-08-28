(function () {
  const data = window.MVP_DATA;
  if (!data || !Array.isArray(data.practiceItems)) return;

  const items = data.practiceItems;
  const source13 = '乌鲁木齐第十三中2025-2026-2初三年级第二次（5月）模拟测试｜平凡人物的勇气';
  const sourceJingkai = '2026乌鲁木齐经开区中考5月模考（二模）｜天山胜利隧道';
  const sourceMidong = '乌鲁木齐米东区2026年初三年级适应性测试｜追风者';

  const additions = [
    {
      id: 199, category: '词形变化', source: source13, number: '65',
      original: 'really enjoyed', target: 'really enjoyable', meaning: '非常喜欢／非常有趣',
      point: '词形变化：enjoy（动词）转换为 enjoyable（形容词），放在 was 后作表语。',
      studyPoint: '空前有 was、前面有 really，判断空格需要形容词。',
      originalSentence: 'We really enjoyed our English class last week.',
      targetSentence: 'Last week, our English class was really ___.', answer: 'enjoyable'
    },
    {
      id: 200, category: '原词复现', source: source13, number: '66',
      original: 'called Nobody', target: 'called Nobody', meaning: '名叫《Nobody》',
      point: '原词复现：原文中的动画片名称 Nobody 直接填入缩写文。',
      studyPoint: '根据 called 回原文定位动画片名称，专有名称首字母大写。',
      originalSentence: 'First, we watched a short video from a cartoon called Nobody.',
      targetSentence: 'First, we watched a cartoon called ___.', answer: 'Nobody'
    },
    {
      id: 201, category: '原词复现 / 动名词', source: source13, number: '67',
      original: 'keep trying', target: 'keep trying', meaning: '坚持尝试',
      point: '原词复现：keep trying 直接对应；keep 后接动名词。',
      studyPoint: '看到 keep，检查后面使用动词 -ing 形式。',
      originalSentence: 'Even when things get really hard, they keep trying and help people along the way.',
      targetSentence: 'They keep ___ and help others despite being laughed at.', answer: 'trying'
    },
    {
      id: 202, category: '词形变化', source: source13, number: '68',
      original: 'collected bottles', target: 'collecting waste', meaning: '收集废品',
      point: '词形变化：原文 collected 转换为介词 by 后的动名词 collecting。',
      studyPoint: 'by 是介词，后面的动词使用 -ing 形式。',
      originalSentence: 'His parents were sick, so after school he collected bottles and paper to make a living.',
      targetSentence: 'He grew up in a poor family and supported himself by ___ waste.', answer: 'collecting'
    },
    {
      id: 203, category: '原词复现 / 名词复数', source: source13, number: '69',
      original: 'face difficulties', target: 'meeting difficulties', meaning: '面对困难',
      point: '原词复现：difficulties 在缩写文中保持复数形式。',
      studyPoint: '定位文章末段 face difficulties，完整抄写复数名词。',
      originalSentence: 'Now whenever I face difficulties in my life, I will think of them.',
      targetSentence: 'I always think of the two stories when meeting ___.', answer: 'difficulties'
    },
    {
      id: 204, category: '原词复现 / 形容词', source: source13, number: '70',
      original: 'be brave', target: 'be brave', meaning: '保持勇敢',
      point: '原词复现：be 后使用形容词 brave。',
      studyPoint: '定位 I can be brave as well，直接提取 brave。',
      originalSentence: 'I tell myself that I can be brave as well.',
      targetSentence: 'I also tell myself I can be ___ as well.', answer: 'brave'
    },
    {
      id: 205, category: '原词复现 / 最高级', source: sourceJingkai, number: '45',
      original: "world's longest", target: "world's longest", meaning: '世界最长的',
      point: '原词复现：the world\'s longest 直接对应，保留最高级 longest。',
      studyPoint: '空前有 world\'s，回原文定位最高级形容词。',
      originalSentence: "China opened the world's longest expressway tunnel to the public—the Tianshan Shengli Tunnel.",
      targetSentence: "China opened the world's ___ tunnel—the Tianshan Shengli Tunnel.", answer: 'longest'
    },
    {
      id: 206, category: '时态语态 / 被动语态', source: sourceJingkai, number: '46',
      original: 'divide Xinjiang', target: 'is divided', meaning: '把新疆分开／被分开',
      point: '主动转被动：they divide Xinjiang into two parts → Xinjiang is divided into two parts。',
      studyPoint: '主语 Xinjiang 是动作承受者，is 后填过去分词 divided。',
      originalSentence: 'The Tianshan Mountains lie in the heart of Xinjiang and they divide Xinjiang into two parts.',
      targetSentence: 'Xinjiang is ___ into two parts by the Tianshan Mountains.', answer: 'divided'
    },
    {
      id: 207, category: '词形变化 / 动词原形', source: sourceJingkai, number: '47',
      original: 'crossing mountains', target: 'to cross', meaning: '穿越山脉',
      point: '词形变化：原文 crossing 转为不定式 to cross。',
      studyPoint: '空前已有 to，填动词原形 cross。',
      originalSentence: 'In the past, crossing these mountains was very hard.',
      targetSentence: 'In the past, it was very hard to ___ these mountains.', answer: 'cross'
    },
    {
      id: 208, category: '原词复现 / 专有名词', source: sourceJingkai, number: '48',
      original: 'Urumqi and Korla', target: 'Urumqi and Korla', meaning: '乌鲁木齐和库尔勒',
      point: '原词复现：between Urumqi and Korla 中的地名直接填入。',
      studyPoint: '看到 between ... and Korla，回原文找另一个城市名称。',
      originalSentence: 'The driving time between Urumqi and Korla has been shortened from nearly 7 hours to 3.5 hours.',
      targetSentence: 'The tunnel shortens the driving time between ___ and Korla.', answer: 'Urumqi'
    },
    {
      id: 209, category: '原词复现 / 动词原形', source: sourceJingkai, number: '49',
      original: 'finish the project', target: 'finish the project', meaning: '完成工程',
      point: '原词复现：five years to finish the project 直接对应。',
      studyPoint: '空前是 to，填原文中的动词原形 finish。',
      originalSentence: 'Although they faced these difficulties, it took the workers just five years to finish the project.',
      targetSentence: 'It took the workers just five years to ___ the project.', answer: 'finish'
    },
    {
      id: 210, category: '原词复现 / 名词', source: sourceJingkai, number: '50',
      original: 'courage and creativity', target: 'courage and creativity', meaning: '勇气与创造力',
      point: '原词复现：courage and creativity 直接对应缩写文。',
      studyPoint: '根据 and creativity 回原文定位并列名词 courage。',
      originalSentence: 'It is the power of courage and creativity.',
      targetSentence: "This project shows Chinese workers' ___ and creativity.", answer: 'courage'
    },
    {
      id: 211, category: '原词复现 / 动词原形', source: sourceMidong, number: '65',
      original: 'get into cars', target: 'get into cars', meaning: '进入汽车',
      point: '原词复现：get into their cars 直接对应。',
      studyPoint: '空前有 like to，填动词原形 get。',
      originalSentence: 'However, there are a few people who will get into their cars and go straight to the centre of the storm.',
      targetSentence: 'However, a few people like to ___ into their cars and chase the storm.', answer: 'get'
    },
    {
      id: 212, category: '原词复现 / 动词', source: sourceMidong, number: '66',
      original: 'often drive', target: 'often drive', meaning: '经常驾车',
      point: '原词复现：drive more than one thousand kilometers 直接对应。',
      studyPoint: '主语 they 为复数，使用动词原形 drive。',
      originalSentence: 'Storm chasers often drive more than one thousand kilometers to the place where the storm will be.',
      targetSentence: 'They often ___ more than one thousand kilometers to the place where the storm will be.', answer: 'drive'
    },
    {
      id: 213, category: '原词复现 / 副词', source: sourceMidong, number: '67',
      original: 'seriously hurt', target: 'seriously hurt', meaning: '严重受伤',
      point: '原词复现：副词 seriously 修饰 hurt。',
      studyPoint: '空格修饰形容词 hurt，填副词 seriously。',
      originalSentence: 'So they are also often seriously hurt in accidents.',
      targetSentence: 'People often get ___ hurt in accidents.', answer: 'seriously'
    },
    {
      id: 214, category: '同义结构转换 / 比较级', source: sourceMidong, number: '68',
      original: 'much safer', target: 'much safer', meaning: '安全得多',
      point: '原词复现：much safer 直接对应；much 修饰比较级。',
      studyPoint: '空前有 much，结合原文定位比较级 safer。',
      originalSentence: 'If you are a beginner, it is much safer to join a group of storm-chasing vacations during the stormy season.',
      targetSentence: 'It is much ___ for beginners to join a group of storm-chasing vacations.', answer: 'safer'
    },
    {
      id: 215, category: '时态语态 / 主谓一致', source: sourceMidong, number: '69',
      original: 'spends most summer', target: 'spends hours', meaning: '花费数小时',
      point: '原词复现 + 主谓一致：a person 为第三人称单数，spend 变为 spends。',
      studyPoint: '根据原文 spends 定位，并检查单数主语后的动词形式。',
      originalSentence: '"Sometimes it can take you hours to wait for something to happen, and all you get is the blue sky and a little rain," says Daniel Lynch, who spends most of his summer on storm chasing.',
      targetSentence: 'It is possible that a person ___ hours waiting for the storm but only sees the blue sky and a little rain.', answer: 'spends'
    },
    {
      id: 216, category: '原词复现 / 动词原形', source: sourceMidong, number: '70',
      original: "won't forget", target: 'never forget', meaning: '永远不会忘记',
      point: "同义结构转换：won't forget → never forget；never 后用动词原形。",
      studyPoint: '看到 never，填原文中的动词原形 forget。',
      originalSentence: "When you get close to a storm, it is the most exciting thing you won't forget in your life.",
      targetSentence: 'Once a storm chaser gets close to a storm, he or she will never ___ it.', answer: 'forget'
    }
  ];

  additions.forEach((item) => {
    const exists = items.some(existing => existing.source === item.source && String(existing.number) === String(item.number));
    if (!exists) items.push({ ...item, confirmedSource: true });
  });
})();
