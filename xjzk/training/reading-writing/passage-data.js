/*
 * 读写题 · 篇章数据
 *
 * 结构约定（详见 passage-engine.js）
 * - paragraphs[].sentences[].id：原文句锚点，形如 p2s3，全篇唯一且稳定。
 * - blanks[]：第一节缩写填空，evidence 指向原文依据句，anchor 为句内锚词。
 * - questions[]：第二节问答，polarity 用于判断题极性，keywords 用于内容完整度判定。
 * - summary：用 {{n}} 标记第 n 空，渲染时替换为可输入的作答框。
 *
 * 录入原则：原文、摘要文、题号一律照抄原卷，不为配合答案改写。
 */
window.PASSAGE_DATA = (window.PASSAGE_DATA || []);

window.PASSAGE_DATA.push({
  id: 'xinjiang-yining-2526-midexam-p1',
  title: 'A Small Act of Kindness',
  titleCn: '一个小小的善意举动',
  theme: '主题01 人与自我——做人与做事',
  source: '25—26九年级上·新疆伊宁市·期中',
  sourceNote: '来源：新疆伊宁市 2025—2026 学年九年级上学期期中英语试题',
  blankInstruction: '第一节  阅读短文，根据语篇内容，在方框内的空白处，填入与短文意思最符合的单词。每空一词。',
  questionInstruction: '第二节  阅读短文，根据语篇内容，回答 2 个问题。',
  guide: '本文主要讲述了作者在心情低落时，偶遇一位卖旧鞋的老人和一位想通过擦鞋赚钱给弟弟买校服的小女孩。老人得知原委后，带小女孩去商店买了一身新校服。这一善举感动了作者，驱散了作者内心的悲伤，让他领悟到小小的举动也能点亮他人的一天。',

  paragraphs: [
    {
      sentences: [
        { id: 'p1s1', text: 'Today, I felt unhappy with my head full of problems, so I decided to take a walk.' },
        { id: 'p1s2', text: 'The most amazing thing happened when I was walking along the street.' }
      ]
    },
    {
      sentences: [
        { id: 'p2s1', text: 'I saw an old man sitting on a chair and selling second-hand shoes.' },
        { id: 'p2s2', text: 'He seemed so helpless because nobody was buying his shoes.' },
        { id: 'p2s3', text: 'Then, a little girl came towards him and said in a polite voice, "Grandfather, may I clean your shoes?"' },
        { id: 'p2s4', text: 'That old man agreed and passed her a shoe.' },
        { id: 'p2s5', text: 'The girl said, "I do this because I want to earn some money to buy my brother a new school uniform."' }
      ]
    },
    {
      sentences: [
        { id: 'p3s1', text: 'I heard this and tears came to my eyes.' },
        { id: 'p3s2', text: 'To my surprise, the old man said, "Oh, little girl, just stop doing this and come with me."' },
        { id: 'p3s3', text: 'To see what would happen, I followed them.' },
        { id: 'p3s4', text: 'They walked to a shop.' },
        { id: 'p3s5', text: 'There the old man gave her a uniform which cost him a lot.' },
        { id: 'p3s6', text: 'The girl was excited and said, "Thank you so much for doing this."' },
        { id: 'p3s7', text: 'Then she left, leaving the old man smiling.' }
      ]
    },
    {
      sentences: [
        { id: 'p4s1', text: 'As the old man decided to leave, I stopped him and said, "You are really a great hero. Thank you for your kindness."' },
        { id: 'p4s2', text: 'My own sadness was driven away by the light of this moving act.' },
        { id: 'p4s3', text: 'I began to realize that a little act can brighten up someone’s day.' }
      ]
    }
  ],

  summary: 'When I was walking along the street, I saw an old man selling second-hand shoes. It seemed that he was {{1}} because nobody was buying his shoes. Then a little girl came towards him and asked him {{2}}, whether she could clean his shoes. The old man agreed and passed her a shoe. However, when he knew that the girl did this just to buy her brother a new school uniform, he stopped the girl and took her to a {{3}}. I followed them and found the old man gave her a uniform. The girl was {{4}} and showed her thanks. I stopped the old man and thanked him for his {{5}}. Meanwhile, my own sadness had been driven away by the light of this moving act. I began to {{6}} that a little act can brighten up someone’s day.',

  blanks: [
    {
      no: 1,
      answer: 'helpless',
      meaning: '无助的',
      category: '原词复现 / 形容词作表语',
      evidence: ['p2s2'],
      anchor: 'helpless',
      distractors: ['helpful', 'hopeless', 'helplessly'],
      point: '原文 He seemed so helpless because nobody was buying his shoes. 摘要文 It seemed that he was ___ because… 原词复现 helpless，作系动词 was 的表语。',
      studyPoint: '看到空格前是 was，先定词性为形容词；再回原文第2段找 because 前面那个词，原词照搬即可。'
    },
    {
      no: 2,
      answer: 'politely',
      meaning: '礼貌地',
      category: '词形变化 / 副词修饰动词',
      evidence: ['p2s3'],
      anchor: 'in a polite voice',
      distractors: ['polite', 'quietly', 'loudly'],
      point: '原文 said in a polite voice（用一种礼貌的语气说）转换为副词 politely 修饰动词 asked。注意 polite 是形容词，不能直接修饰动词。',
      studyPoint: '空格在动词 asked 之后、逗号之前，位置要求副词；回原文第2段找到 in a polite voice，把介词短语压成一个副词。'
    },
    {
      no: 3,
      answer: 'shop',
      meaning: '商店',
      category: '原词复现 / 名词',
      evidence: ['p3s4'],
      anchor: 'a shop',
      distractors: ['store', 'supermarket', 'shopping'],
      point: '原文 They walked to a shop. 摘要文 took her to a ___. 原词复现 shop，作介词 to 的宾语。',
      studyPoint: '空格前有不定冠词 a，说明要填名词单数；回原文第3段找老人带小女孩去的地方。'
    },
    {
      no: 4,
      answer: 'excited',
      meaning: '兴奋的',
      category: '词形变化 / 形容词描述心情',
      evidence: ['p3s6'],
      anchor: 'was excited',
      distractors: ['exciting', 'sad', 'excitedly'],
      point: '原文 The girl was excited and said… 摘要文 The girl was ___ and showed her thanks. 原词复现 excited，描述人的心情用 -ed 形式，不能用 exciting。',
      studyPoint: 'exciting 修饰事物，excited 修饰人；这里说的是小女孩的心情，选 excited。'
    },
    {
      no: 5,
      answer: 'kindness',
      meaning: '善意',
      category: '原词复现 / 名词',
      evidence: ['p4s1'],
      anchor: 'your kindness',
      distractors: ['kind', 'kindly', 'kindnesses'],
      point: '原文 Thank you for your kindness. 摘要文 thanked him for his ___. 原词复现 kindness，作介词 for 的宾语。',
      studyPoint: '空格在物主代词 his 之后，必须接名词；回原文第4段找致谢那句里的名词。'
    },
    {
      no: 6,
      answer: 'realize',
      meaning: '意识到',
      category: '词形变化 / 不定式后接动词原形',
      evidence: ['p4s3'],
      anchor: 'began to realize',
      distractors: ['realized', 'realizing', 'to realize'],
      point: '原文 I began to realize that a little act… 摘要文 I began to ___ that…。不定式 to 后接动词原形 realize，不能用过去式。',
      studyPoint: '空格紧跟不定式符号 to，动词一律用原形；这是最后一空，答案常在原文末段的感悟句。'
    }
  ],

  questions: [
    {
      no: 7,
      type: 'yesno',
      question: 'Did the old man buy a uniform for the little girl?',
      answer: 'Yes, he did.',
      polarity: 'yes',
      keywords: ['he did'],
      evidence: ['p3s5'],
      anchor: 'gave her a uniform',
      point: '原文第3段 There the old man gave her a uniform which cost him a lot. 明确说明老人确实买了校服，故作肯定回答。',
      studyPoint: '判断题先找原文依据句，看动作是否真的发生；回答用 Yes, he did.，助动词要和问句的 Did 一致，不能写 do。'
    },
    {
      no: 8,
      type: 'wh',
      question: 'What drove the writer’s sadness away?',
      answer: 'The light of this moving act.',
      keywords: ['light', 'moving act'],
      evidence: ['p4s2'],
      anchor: 'the light of this moving act',
      point: '原文第4段 My own sadness was driven away by the light of this moving act. 被动结构中 by 后面就是 sad sadness 被驱散的原因，即答案。',
      studyPoint: '问 What 时答名词或名词短语，直接从被动句的 by 之后取内容，不要整句照抄。'
    }
  ]
});