articleQuestions = [
  { no: 74, prompt: "(traditional)", answers: ["traditional"], options: ["tradition", "traditional", "traditionally", "traditions"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词修饰名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词修饰名词", clue: "cloud patterns", explain: "空后是名词短语 cloud patterns，需要形容词修饰名词，traditional 本身就是形容词。" },
  { no: 75, prompt: "", answers: ["from"], options: ["in", "on", "to", "from"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词", "副词"], noPromptFocus: "介词固定搭配", point: "come from", clue: "comes / the famous", explain: "come from 意为“来自……”，是初中高频固定搭配。本句 Its design comes from the famous \"Bronze Running Horse\" 表示“它的设计来自著名的《马踏飞燕》”。" },
  { no: 76, prompt: "(toy)", answers: ["toys"], options: ["toy", "toys", "toy's", "toyed"], hasPrompt: true, pos: "名词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "可数名词变复数", focusOptions: ["可数名词变复数", "可数名词变所有格", "不可数名词转换为形容词", "不可数名词转换为副词"], point: "名词复数", clue: "and gifts", explain: "toy 是可数名词，后面与 gifts 并列，表示玩具和礼物，应用复数 toys。" },
  { no: 77, prompt: "(thousand)", answers: ["thousands"], options: ["thousand", "thousands", "thousandth", "thousand's"], hasPrompt: true, pos: "数词", mapNode: "num", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "概数词 hundred/thousand/million", focusOptions: ["基数词与序数词互换", "概数词 hundred/thousand/million", "分数表达", "倍数表达"], point: "概数词复数", clue: "For ... of years", explain: "thousands of years 是固定结构，表示“数千年”。概数词前无具体数字且后有 of，用复数。" },
  { no: 78, prompt: "(it)", answers: ["its"], options: ["it", "its", "itself", "it's"], hasPrompt: true, pos: "代词", mapNode: "pron", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词性物主代词", focusOptions: ["人称代词：主格", "人称代词：动词/介词 + 宾格", "形容词性和名词性物主代词", "反身代词"], point: "形容词性物主代词", clue: "speed and strength", explain: "空后是名词短语 speed and strength，需要形容词性物主代词 its。" },
  { no: 79, prompt: "(especial)", answers: ["especially"], options: ["especial", "especially", "special", "specials"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词变副词", clue: "good at", explain: "空处修饰形容词短语 good at，表示“尤其擅长”，especial 变副词 especially。" },
  { no: 80, prompt: "(move)", answers: ["to move"], options: ["move", "moving", "to move", "moved"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：to do", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：介词 + doing"], verbFlow: { hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", formFocus: "seem to do", skeleton: { time: "", subject: "they", predicate: "seem", blank: "move" }, highlights: { changedVerb: [{ text: "they", type: "subject" }, { text: "seem", type: "predicate" }], route: [{ text: "seem", type: "predicate" }, { text: "____", type: "blank" }], focus: [{ text: "seem", type: "nonPredicate" }, { text: "____", type: "blank" }], answer: [{ text: "seem to move", type: "nonPredicate" }] } }, point: "seem to do", clue: "seem", explain: "seem to do sth. 表示“似乎做某事”，所以 move 变 to move。" },
  { no: 81, prompt: "(be)", answers: ["is"], options: ["is", "are", "was", "were"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语：there be 句型", focusOptions: ["谓语：常考时态标志词", "谓语：there be 句型", "谓语：四种被动语态", "非谓语：to do"], verbFlow: { hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", skeleton: { time: "general truth", subject: "There", predicate: "？", blank: "be" }, highlights: { changedVerb: [{ text: "There", type: "subject" }], route: [{ text: "There", type: "subject" }, { text: "____", type: "blank" }], predicateKind: [{ text: "There", type: "subject" }, { text: "a saying", type: "predicate" }], actionRelation: [{ text: "There", type: "subject" }, { text: "be", type: "blank" }], structure: [{ text: "There", type: "subject" }, { text: "a saying", type: "predicate" }], answer: [{ text: "There is", type: "predicate" }] } }, point: "there be 一般现在时", clue: "a saying", explain: "There be 句型遵循就近原则，后面是单数 a saying，且表达一般事实，用 is。" },
  { no: 82, prompt: "(succeed)", answers: ["success"], options: ["succeed", "success", "successful", "successfully"], hasPrompt: true, pos: "动词", mapNode: "noun", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "动词变名词", focusOptions: ["动词变名词", "动词变形容词", "谓语动词时态", "非谓语：to do"], point: "词性转换：动词变名词", clue: "quick", explain: "quick 是形容词，后面需要名词作宾语，succeed 的名词形式是 success。" },
  { no: 83, prompt: "", answers: ["if"], options: ["If", "Because", "Although", "But"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词"], noPromptFocus: "状语从句的连接词", noPromptFocusOptions: ["并列连词", "状语从句的连接词", "定语从句的连接词", "连词的固定搭配"], point: "条件状语从句", clue: "you like Chinese culture", explain: "根据句意“如果你喜欢中国文化，你会发现……”，此处用 If 引导条件状语从句。" },
  { no: 84, prompt: "(teach)", answers: ["teaches"], options: ["teach", "teaches", "taught", "is taught"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语：一般现在时三单", focusOptions: ["谓语：常考时态标志词", "谓语：一般现在时三单", "谓语：四种被动语态", "非谓语：doing"], verbFlow: { hasChangedVerb: "没有", route: "谓语", predicateKind: "时态", actionRelation: "主动发出动作", structure: "一般现在时", skeleton: { time: "general meaning", subject: "It", predicate: "？", blank: "teach" }, highlights: { changedVerb: [{ text: "It", type: "subject" }], route: [{ text: "It", type: "subject" }, { text: "____", type: "blank" }], predicateKind: [{ text: "It", type: "subject" }, { text: "us", type: "predicate" }], actionRelation: [{ text: "It", type: "subject" }, { text: "teach", type: "blank" }], structure: [{ text: "It", type: "subject" }], answer: [{ text: "It teaches", type: "predicate" }] } }, point: "一般现在时第三人称单数", clue: "It / general meaning", explain: "主语 It 是第三人称单数，表达一般意义，用一般现在时三单 teaches。" }
];

articleParagraphs = [
  `2026 is the Year of the Horse in China. People born this year are thought to be friendly. To mark the year, a special horse mascot called Lijiangma has been made. It is deep red with [[74]] [[clue:74:cloud patterns]]. Its design [[clue:75:comes]] [[75]] [[clue:75:the famous]] "Bronze Running Horse" of the Eastern Han Dynasty.`,
  `This mascot will be made into [[76]] [[clue:76:and gifts]] for people all over the world. The horse has always been important in China. For [[77]] [[clue:77:of years]], it helped farmers in fields and soldiers in wars. [[78]] [[clue:78:speed and strength]] made people love it deeply.`,
  `Horses are also popular in art. Many artists enjoy drawing them. The famous painter Xu Beihong was [[79]] [[clue:79:good at]] it. His horse paintings look so real that they [[clue:80:seem]] [[80]].`,
  `In Chinese culture, horses stand for speed and good luck. [[clue:81:There]] [[81]] even [[clue:81:a saying]]: "Ma Dao Cheng Gong". This means "hoping for quick [[82]]". [[83]] [[clue:83:you like Chinese culture]], you will find the horse is a meaningful symbol in many stories.`,
  `It [[84]] us about hard work, friendship, and running forward with hope.`
];

activeArticleNo = 74;
selectedArticle = {};
articleSteps = {};
mistakes = [];
renderExam();
renderMistakes();

const urumqiGrade9Article = {
  title: "2026年3月乌鲁木齐九年级质量检测",
  startNo: 74,
  questions: articleQuestions,
  paragraphs: articleParagraphs
};

const urumqiGaosanSecondMock = {
  title: "2026乌鲁木齐高三二模",
  startNo: 56,
  questions: [
    { no: 56, prompt: "(popular)", answers: ["popularity"], options: ["popular", "popularity", "popularly", "populars"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变名词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词变名词", clue: "regaining", explain: "regain 后需要名词作宾语，popular 的名词形式是 popularity。" },
    { no: 57, prompt: "(list)", answers: ["was listed"], options: ["listed", "was listed", "is listed", "lists"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "谓语：时态+语态", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "谓语：时态+语态", "非谓语：doing"], point: "一般过去时被动语态", clue: "in 2021 / as a heritage", explain: "in 2021 是过去时间，the technique 与 list 是被动关系，所以用 was listed。" },
    { no: 58, prompt: "", answers: ["for"], options: ["for", "with", "from", "as"], hasPrompt: false, mapNode: "blank", noPromptType: "介词", noPromptTypeOptions: ["冠词", "介词", "连词"], noPromptFocus: "介词的含义", noPromptFocusOptions: ["介词的固定搭配", "介词的含义", "冠词的特指和泛指", "并列连词"], point: "原因介词", clue: "its simplicity and usefulness", explain: "这里表示“因为其简单和实用”，用介词 for 表原因。" },
    { no: 59, prompt: "(pass)", answers: ["passed"], options: ["pass", "passed", "passing", "to pass"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：done", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：done"], verbFlow: { hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "done", formFocus: "with + 宾语 + done", skeleton: { time: "", subject: "methods", predicate: "involves", blank: "pass" }, highlights: { changedVerb: [{ text: "involves", type: "predicate" }], route: [{ text: "involves", type: "predicate" }, { text: "____", type: "blank" }], focus: [{ text: "with", type: "nonPredicate" }, { text: "methods", type: "subject" }], answer: [{ text: "methods passed", type: "nonPredicate" }] } }, point: "过去分词作后置定语/宾补", clue: "with various patterns and hand methods", explain: "patterns and methods 与 pass down 是被动关系，用过去分词 passed。" },
    { no: 60, prompt: "(preserve)", answers: ["to preserve"], options: ["preserve", "preserving", "to preserve", "preserved"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：to do", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: { hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "to do", formFocus: "目的状语", skeleton: { time: "in 2022", subject: "workshop", predicate: "was established", blank: "preserve" }, highlights: { changedVerb: [{ text: "was established", type: "predicate" }], route: [{ text: "was established", type: "predicate" }, { text: "____", type: "blank" }], focus: [{ text: "was established", type: "predicate" }, { text: "heritage", type: "nonPredicate" }], answer: [{ text: "To preserve", type: "nonPredicate" }] } }, point: "to do 表目的", clue: "was established", explain: "句首用不定式作目的状语：To preserve and update this heritage。" },
    { no: 61, prompt: "(contribute)", answers: ["contributing"], options: ["contribute", "contributing", "contributed", "to contribute"], hasPrompt: true, pos: "动词", mapNode: "verb", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "非谓语：doing", focusOptions: ["谓语：常考时态标志词", "谓语：四种被动语态", "非谓语：to do", "非谓语：doing"], verbFlow: { hasChangedVerb: "有", route: "非谓语", nonPredicateFocus: "doing", formFocus: "while + doing", skeleton: { time: "", subject: "It", predicate: "functions / helping", blank: "contribute" }, highlights: { changedVerb: [{ text: "functions", type: "predicate" }, { text: "helping", type: "predicate" }], route: [{ text: "while", type: "nonPredicate" }, { text: "____", type: "blank" }], focus: [{ text: "while", type: "nonPredicate" }], answer: [{ text: "while contributing", type: "nonPredicate" }] } }, point: "while + doing", clue: "while", explain: "while 后省略主语和 be，动词用 doing，填 contributing。" },
    { no: 62, prompt: "", answers: ["a"], options: ["a", "an", "the", "/"], hasPrompt: false, mapNode: "blank", noPromptType: "冠词", noPromptTypeOptions: ["冠词", "介词", "连词"], noPromptFocus: "冠词的固定搭配", noPromptFocusOptions: ["冠词的固定搭配", "冠词的特指和泛指", "元音音素", "介词的固定搭配"], point: "固定搭配冠词", clue: "wide variety of", explain: "a wide variety of 是固定搭配，表示“各种各样的”。" },
    { no: 63, prompt: "", answers: ["which"], options: ["which", "who", "where", "when"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词"], noPromptFocus: "定语从句的连接词", noPromptFocusOptions: ["并列连词", "状语从句的连接词", "定语从句的连接词", "连词的固定搭配"], point: "非限制性定语从句", clue: "hats, ... are exported", explain: "空处引导非限制性定语从句，先行词是 hats，用 which。" },
    { no: 64, prompt: "(additional)", answers: ["additionally"], options: ["additional", "additionally", "addition", "additions"], hasPrompt: true, pos: "形容词与副词", mapNode: "adj", posOptions: ["名词", "动词", "形容词与副词", "数词", "代词"], focus: "形容词变副词", focusOptions: ["比较级与最高级", "形容词修饰名词", "形容词变副词", "形容词变名词"], point: "形容词变副词", clue: "句首逗号", explain: "空处位于句首并用逗号隔开，修饰整句，用副词 Additionally。" },
    { no: 65, prompt: "", answers: ["and"], options: ["and", "but", "or", "so"], hasPrompt: false, mapNode: "blank", noPromptType: "连词", noPromptTypeOptions: ["冠词", "介词", "连词"], noPromptFocus: "并列连词", noPromptFocusOptions: ["并列连词", "状语从句的连接词", "定语从句的连接词", "连词的固定搭配"], point: "并列连词", clue: "dynamic ... sustainable", explain: "dynamic 和 sustainable 并列作表语，用 and 连接。" }
  ],
  paragraphs: [
    `Traditionally seen as practical items, straw hats are now regaining [[56]] as fashionable accessories in the global market, significantly aided by a centuries-old craft from Shandong. In Tancheng County, the technique of weaving with Langya grass has a history of over 200 years and [[57]] as a provincial intangible cultural heritage in 2021 [[58]] [[clue:58:its simplicity and usefulness]]. The process involves multiple stages, including beginning the weave, shaping on a mold, layering the grass, and finishing, with various patterns and hand methods [[59]] down through generations.`,
    `[[60]] and update this heritage, the Tancheng Langya Grass Weaving Workshop was established in 2022. It functions as a training base for new makers, helping to sustain the craft while [[61]] to rural revitalization through local skill development and job creation. The workshop has also innovated by introducing high-quality imported materials such as raffia, allowing traditional techniques to meet modern design needs.`,
    `Today, the workshop produces [[62]] wide variety of hats, numbering in the thousands, [[63]] are exported to more than 30 countries and regions, including the United States, France, and Japan. [[64]], through e-commerce and live-streaming sales, it successfully reaches online consumers worldwide, ensuring this cultural tradition continues to be dynamic [[65]] sustainable.`
  ]
};

window.examArticleBank = {
  grade9: urumqiGrade9Article
};

window.loadExamArticle = function loadExamArticle(key) {
  const article = window.examArticleBank[key];
  if (!article) return;
  window.activeExamArticleKey = key;
  window.examArticleTitle = `${article.serial ? `${article.serial}. ` : ""}${article.practiceTitle || article.title}`;
  window.examArticleSource = article.source || article.title;
  articleQuestions = article.questions;
  articleParagraphs = article.paragraphs;
  activeArticleNo = article.startNo;
  selectedArticle = {};
  articleSteps = {};
  mistakes = [];
  renderExam();
  renderMistakes();
};

window.showExamPicker = function showExamPicker() {
  window.activeExamArticleKey = "";
  window.examArticleTitle = "";
  window.examArticleSource = "";
  selectedArticle = {};
  articleSteps = {};
  mistakes = [];
  renderExam();
  renderMistakes();
};

window.showExamPicker();
