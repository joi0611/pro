(function () {
  const data = window.MVP_DATA;
  if (!data || !Array.isArray(data.learningItems)) return;

  // 已从学习区移除不符合“短语压缩为单词”要求或语义牵强的条目。
  // 保留底层题库与真题数据，只调整本学习板块。
  const removedLearningIds = new Set([
    135, 198, 250, 300, 308, 310,
    311, 312, 321, 323, 338, 342, 353, 357, 371, 373, 379, 380
  ]);
  data.learningItems = data.learningItems.filter((item) => !removedLearningIds.has(Number(item.id)));

  // 学习区统一使用“2–3 个词的短语 → 1 个词”的展示结构。
  // 这里只调整学习卡片，不改真题演练、答案、证据句或进度 ID。
  const overrides = {
    127: ['show more concern', 'care'],
    135: ['not very easy', 'difficult'],
    158: ['not like others', 'unlike'],
    171: ['say no', 'refuse'],
    184: ['think of', 'conceive'],
    189: ['pass away', 'die'],
    196: ['put on display', 'display'],
    197: ['keep in touch', 'communicate'],
    201: ['look over carefully', 'examine'],
    210: ['give support', 'encourage'],
    212: ['take a journey', 'travel'],
    214: ['show deep respect', 'respect'],
    222: ['pick things up', 'collect'],
    223: ['have an effect', 'influence'],
    227: ['wait for', 'await'],
    230: ['finish one’s studies', 'graduate'],
    231: ['of great importance', 'important'],
    234: ['a lot of', 'plenty'],
    238: ['without much money', 'poor'],
    243: ['at low price', 'cheap'],
    244: ['moving very quickly', 'fast'],
    247: ['seen very often', 'common'],
    248: ['can be trusted', 'trustworthy'],
    249: ['far from ordinary', 'special'],
    253: ['hard to forget', 'unforgettable'],
    254: ['making people tired', 'tiring'],
    255: ['sure of oneself', 'confident'],
    256: ['good at something', 'skilled'],
    258: ['newly picked fruit', 'fresh'],
    259: ['easy to use', 'convenient'],
    260: ['related to history', 'historical'],
    261: ['having great power', 'powerful'],
    262: ['not seen before', 'unusual'],
    264: ['stylish and fashionable', 'cool'],
    266: ['must be done', 'necessary'],
    267: ['very quick-minded', 'intelligent'],
    268: ['causing great surprise', 'amazing'],
    269: ['tired of', 'bored'],
    271: ['achieve good results', 'succeed'],
    272: ['in good health', 'healthy'],
    273: ['full of energy', 'active'],
    276: ['full of joy', 'happy'],
    278: ['most important of', 'greatest'],
    279: ['following old customs', 'traditional'],
    280: ['extremely high quality', 'excellent'],
    284: ['help given publicly', 'contribution'],
    286: ['an offered idea', 'suggestion'],
    290: ['words about something', 'description'],
    292: ['lasting mental effect', 'impression'],
    295: ['change the result', 'matter'],
    298: ['become much bigger', 'grow'],
    300: ['something taken away', 'loss'],
    302: ['go to see', 'visit'],
    305: ['natural outdoor view', 'scenery'],
    306: ['time yet ahead', 'future'],
    319: ['be worth something', 'value'],
    320: ['stand for', 'symbolize'],
    241: ['in low spirits', 'sad'],
    323: ['on the contrary', 'however'],
    327: ['on condition that', 'if'],
    332: ['up to', 'until'],
    333: ['at the time', 'when'],
    334: ['on the subject', 'about'],
    336: ['as well', 'too'],
    337: ['the two together', 'both'],
    339: ['it is possible', 'perhaps'],
    342: ['as stated by', 'according'],
    347: ['in recent days', 'recently'],
    363: ['fourth of April', 'April'],
    370: ['terracotta human statues', 'figures'],
    376: ['a green riceball', 'Qingtuan'],
    377: ['how much food', 'amount'],
    378: ['years since birth', 'age'],
    380: ['Chinese space vehicle', 'Shenzhou-19'],
    381: ['make someone relaxed', 'relax'],
    382: ['without any danger', 'safely'],
    383: ['being very kind', 'kindness'],
    384: ['give assistance to', 'help'],
    385: ['give back', 'return'],
    386: ['ask someone formally', 'invite']
  };

  Object.assign(overrides, {
    181: ['make a decision', 'decide'],
    182: ['make a choice', 'choose'],
    183: ['pay a visit', 'visit'],
    185: ['take part in', 'join'],
    186: ['become aware of', 'realize'],
    187: ['take place', 'happen'],
    188: ['keep in mind', 'remember'],
    190: ['care for animals', 'tend'],
    191: ['set out', 'depart'],
    192: ['give up', 'quit'],
    193: ['get to', 'arrive'],
    194: ['deal with', 'solve'],
    195: ['find out', 'discover'],
    198: ['ask for time', 'require'],
    199: ['pay for', 'buy'],
    200: ['get ready', 'prepare'],
    202: ['cut down', 'reduce'],
    203: ['go up', 'increase'],
    204: ['turn down', 'refuse'],
    205: ['put off', 'delay'],
    206: ['call off', 'cancel'],
    207: ['set aside', 'save'],
    208: ['talk about', 'discuss'],
    209: ['take into account', 'consider'],
    211: ['fulfill a dream', 'achieve'],
    213: ['give advice', 'advise'],
    215: ['go on', 'continue'],
    216: ['reach an agreement', 'agree'],
    217: ['give a hand', 'help'],
    218: ['give back', 'return'],
    219: ['beat another team', 'win'],
    220: ['catch one’s meaning', 'understand'],
    221: ['turn into', 'transform'],
    224: ['achieve real success', 'succeed'],
    225: ['show up', 'appear'],
    226: ['make sure', 'ensure'],
    228: ['feel like', 'want'],
    229: ['take a guess', 'guess'],
    236: ['of high quality', 'excellent'],
    239: ['very quick-minded', 'smart'],
    240: ['warm and friendly', 'kind'],
    251: ['respectful to parents', 'filial'],
    252: ['soft and kind', 'gentle'],
    270: ['hooked on phones', 'addicted'],
    274: ['feel great pride', 'proud'],
    275: ['feeling great pleasure', 'pleased'],
    278: ['above all others', 'greatest'],
    281: ['achieve real success', 'succeed'],
    282: ['make a decision', 'decide'],
    283: ['make a choice', 'choose'],
    284: ['make a contribution', 'contribute'],
    285: ['make good progress', 'improve'],
    286: ['give a suggestion', 'suggest'],
    287: ['give useful advice', 'advise'],
    288: ['give an introduction', 'introduce'],
    289: ['give an explanation', 'explain'],
    290: ['give a description', 'describe'],
    291: ['take immediate action', 'act'],
    292: ['leave an impression', 'impress'],
    293: ['give a performance', 'perform'],
    294: ['reach an agreement', 'agree'],
    296: ['make an effort', 'try'],
    297: ['make a discovery', 'discover'],
    299: ['end in failure', 'fail'],
    301: ['go on journeys', 'travel'],
    303: ['give a hand', 'help'],
    304: ['feel great pride', 'proud'],
    307: ['follow one’s dream', 'aspire'],
    308: ['gain useful experience', 'learn'],
    309: ['gain clear understanding', 'understand'],
    310: ['develop useful skills', 'learn'],
    311: ['pay attention to', 'notice'],
    312: ['show interest in', 'like'],
    313: ['do something regularly', 'habit'],
    314: ['keep from danger', 'protect'],
    315: ['what one thinks', 'opinion'],
    316: ['bring an advantage', 'benefit'],
    317: ['work well together', 'cooperate'],
    318: ['follow a tradition', 'observe'],
    321: ['for this reason', 'because'],
    322: ['as a result', 'therefore'],
    324: ['what is more', 'moreover'],
    338: ['rather than', 'instead'],
    340: ['at another time', 'later'],
    342: ['as stated', 'reportedly'],
    343: ['in a word', 'briefly'],
    348: ['up to now', 'hitherto'],
    351: ['sweet rice balls', 'food'],
    352: ['running and swimming', 'sports'],
    353: ['different travel methods', 'transport'],
    354: ['pandas and antelopes', 'animals'],
    355: ['kebabs and nang', 'food'],
    356: ['hair and clothes', 'appearance'],
    357: ['May or summer', 'time'],
    358: ['outdoor spring events', 'activities'],
    359: ['Uygur and Kazak', 'ethnicities'],
    360: ['handicrafts and spices', 'goods'],
    361: ['ignoring nearby people', 'phubbing'],
    362: ['teachers and friends', 'people'],
    364: ['streets and parks', 'places'],
    365: ['Han or Ming', 'dynasty'],
    366: ['branches and fruit', 'food'],
    367: ['painting and tricks', 'skills'],
    368: ['reading and homework', 'learning'],
    369: ['mountains and valleys', 'landforms'],
    371: ['saving natural resources', 'protection'],
    372: ['bored and worried', 'feelings'],
    373: ['Red Hill Bazaar', 'attractions'],
    374: ['rice and plants', 'materials']
  });

  const wordTokens = (value) => String(value || '').match(/[A-Za-z]+(?:[’'-][A-Za-z0-9]+)*/g) || [];
  const variants = (value) => String(value || '')
    .split(/\s*(?:\/|／)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  const cleanPhrase = (value) => String(value || '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[.…]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const singleWord = (value) => {
    const token = wordTokens(value);
    return token.length === 1 ? token[0] : '';
  };
  const shortPhrase = (value) => {
    const phrase = cleanPhrase(value);
    const count = wordTokens(phrase).length;
    return count >= 2 && count <= 3 ? phrase : '';
  };

  data.learningItems.forEach((item) => {
    let pair = overrides[item.id];

    if (!pair) {
      const originalPhrase = shortPhrase(item.original);
      const originalWord = singleWord(item.original);
      const targetParts = variants(item.target);
      const targetWord = targetParts.map(singleWord).find(Boolean);
      const targetPhrase = targetParts.map(shortPhrase).find(Boolean);
      const answerWord = singleWord(item.answer);

      if (originalPhrase && targetWord) {
        pair = [originalPhrase, targetWord];
      } else if (originalWord && targetPhrase) {
        pair = [targetPhrase, originalWord];
      } else if (originalPhrase && answerWord) {
        pair = [originalPhrase, answerWord];
      } else if (targetPhrase && answerWord) {
        pair = [targetPhrase, answerWord];
      }
    }

    if (!pair) {
      console.warn('Learning phrase conversion needs review:', item.id, item.original, item.target);
      return;
    }

    item.original = pair[0];
    item.target = pair[1];
    item.learningFormat = 'phrase-to-word';
  });

  const currentPracticePairs = {
    61: ['make a decision', 'decide'],
    68: ['more than', 'over'],
    74: ['in danger', 'endangered'],
    77: ['take action', 'act'],
    80: ['after his death', 'died'],
    94: ['not polite', 'rude'],
    110: ['show interest', 'interested'],
    125: ['with good luck', 'lucky'],
    127: ['pay more attention', 'prioritize'],
    133: ['known as', 'called'],
    184: ['give assistance', 'help'],
    187: ['take a walk', 'walk'],
    188: ['have a try', 'try'],
    191: ['do well in', 'excel'],
    196: ['take pride in', 'proud'],
    199: ['full of enjoyment', 'enjoyable'],
    207: ['go across mountains', 'cross']
  };

  const normalizePairPart = (value) => String(value || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9-]+/g, ' ')
    .trim();
  const existingPairs = new Set(data.learningItems.map(item => (
    `${normalizePairPart(item.original)}=>${normalizePairPart(item.target)}`
  )));

  const inferPracticePair = (item) => {
    if (Array.isArray(item.learningPair) && item.learningPair.length === 2) {
      return item.learningPair;
    }
    if (currentPracticePairs[item.id]) return currentPracticePairs[item.id];
    if (!/同义/.test(String(item.category || ''))) return null;

    const originalPhrase = shortPhrase(item.original);
    const originalWord = singleWord(item.original);
    const targetParts = variants(item.target);
    const targetPhrase = targetParts.map(shortPhrase).find(Boolean);
    const targetWord = targetParts.map(singleWord).find(Boolean);

    if (originalPhrase && targetWord && !normalizePairPart(originalPhrase).includes(normalizePairPart(targetWord))) {
      return [originalPhrase, targetWord];
    }
    if (targetPhrase && originalWord && !normalizePairPart(targetPhrase).includes(normalizePairPart(originalWord))) {
      return [targetPhrase, originalWord];
    }
    return null;
  };

  (data.practiceItems || []).forEach((item) => {
    const pair = inferPracticePair(item);
    if (!pair) return;
    const phrase = cleanPhrase(pair[0]);
    const word = singleWord(pair[1]);
    if (!shortPhrase(phrase) || !word) return;

    const pairKey = `${normalizePairPart(phrase)}=>${normalizePairPart(word)}`;
    if (existingPairs.has(pairKey)) return;
    existingPairs.add(pairKey);
    data.learningItems.push({
      id: `practice-transform-${item.id}`,
      category: data.categories[0] || '同义/反义转换、归纳概括',
      source: item.source,
      number: item.number,
      original: phrase,
      target: word,
      meaning: item.meaning || `${phrase} → ${word}`,
      point: `题库自动提取：${phrase} → ${word}`,
      studyPoint: item.studyPoint || item.point || '根据上下文完成同义转换。',
      originalSentence: item.originalSentence,
      targetSentence: item.targetSentence,
      answer: word,
      learningFormat: 'phrase-to-word',
      fromPracticeBank: true
    });
  });
})();
