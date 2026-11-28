(() => {
  function edit(key, no, fields) {
    const question = window.examArticleBank[key]?.questions.find(item => item.no === no);
    if (question) Object.assign(question, fields);
  }

  function word(key, no, pos, focus) {
    edit(key, no, {pos, focus, point:focus, focusOptions:focusOptionsFor(pos,focus), verbFlow:undefined});
  }

  function verb(key, no, changed, route, structure, clue, kind="时态", tenseCue="", forms=[]) {
    const question = window.examArticleBank[key]?.questions.find(item => item.no === no);
    if (!question) return;
    const focus = route === "谓语" ? "谓语动词" : "非谓语动词";
    edit(key,no,{
      pos:"动词", focus, point:focus, clue,
      verbFlow:{hasChangedVerb:changed, route, structure, predicateKind:kind, tenseCue, forms, nonPredicateFocus:forms[0]}
    });
  }

  function pred(key,no,changed,structure,clue,kind="时态",tenseCue="") {
    verb(key,no,changed,"谓语",structure,clue,kind,tenseCue);
  }

  function non(key,no,form,structure,clue,changed="有") {
    verb(key,no,changed,"非谓语",structure,clue,undefined,undefined,[].concat(form));
  }

  function category(key,no,noPromptType) {
    edit(key,no,{noPromptType});
  }

  pred("ancientBookFixer",84,"有","现在进行时","Now / is","时态","is + 动词-ing → 现在进行时");
  pred("urumqi70Village",77,"有","一般过去时+被动","were / into","时态+语态");
  pred("teaAdaptation",78,"有","一般现在时+被动","are generally / into","时态+语态");
  pred("paperPrintingInternet",78,"有","一般过去时+被动","was / during the Sui and Tang dynasties","时态+语态");
  pred("urumqiSecondMockLabubu",74,"有","一般过去时+被动","was created / and","时态+语态","并列项承接 was created 的时态和被动结构");
  pred("xinjiangOfficialGrammar2025",58,"没有","would + 动词原形","would","情态动词");
  non("grade7PullingCrops",69,["do","to do"],"help sb. (to) do","help them");
  word("boyGift",83,"动词","动词变形容词");
  word("urumqiSecondMockLabubu",78,"动词","动词变名词");
  edit("urumqiSecondMockLabubu",78,{explain:"提示词 feel 是动词。a great ___ of surprise 需要名词，feel 变为 feeling。"});
  word("grade8SportsMeeting",69,"动词","动词变名词并用复数");
  word("grade8SportsMeeting",72,"动词","动词变形容词");
  word("grade8SportsMeeting",77,"动词","动词变名词");
  category("grade8SportsMeeting",71,"副词");
  category("grade8SportsMeeting",79,"不定式标记");
  word("grade8MidongLetter",61,"代词","不定代词复数所有格");
  category("grade8WinterVacation",64,"副词");
  pred("grade8WinterVacation",69,"没有","一般将来时","will make","时态","will make → 上下文是将来语境");
  category("grade8WinterVacation",71,"限定词");
  word("wuqinXiMock",60,"名词","名词变形容词");
  word("wuqinXiMock",64,"名词","名词变形容词");
  word("midongDietMock",79,"动词","动词变名词");
  word("midongDietMock",84,"名词","名词变形容词");
  pred("midongDietMock",83,"没有","一般现在时","Parents and schools / need","时态","need → 上下文陈述一般情况");
  pred("paperPrintingInternet",84,"没有","一般现在时+被动","computers and the Internet / used","时态+语态","全文在谈现状，复数主语用 are，与 used 构成一般现在时被动");
  word("zhangSixuanMartialArts",82,"动词","动词变形容词");
  pred("sadHorseToy",74,"有","现在完成时","has","时态","has + 过去分词 → 现在完成时");
  pred("sadHorseToy",80,"有","现在进行时","Now / are","时态","are + 动词-ing → 现在进行时");
  word("sadHorseToy",82,"名词","名词变形容词");
  pred("grade7PullingCrops",75,"没有","过去完成时","found","时态","庄稼死在发现之前，首推 had died");
  category("grade8VolunteerExperience",63,"连词");
  pred("taiChiExperience",5,"没有","一般现在时+被动","I","时态+语态","be supposed to do → 主语 I 搭配 am");
  non("taiChiExperience",9,"doing","despite + 复合动名词结构","despite / still");
  non("taiChiExperience",10,"to do","It’s time for sb. to do","It's time for");
  non("gaokao2026Daji",56,"to do","不定式的被动形式 to be done","It is also common for them");
  pred("gaokao2026Daji",59,"没有","一般过去时","there");
  non("gaokao2026Daji",62,"done","过去分词作状语","by the enticing aromas");
  non("gaokao2026Daji",64,"doing","现在分词作后置定语","people");
  pred("xinjiangOfficialGrammar2023",75,"有","现在完成时","has also","时态","has + 过去分词 → 现在完成时");
  pred("xinjiangOfficialGrammar2021",93,"有","过去进行时","was","时态","was + 动词-ing → 过去进行时");
  pred("xinjiangOfficialGrammar2025",56,"有","一般过去时+被动","were not easily","时态+语态");
  pred("xinjiangOfficialGrammar2024",64,"有","现在进行时","Now / is","时态","is + 动词-ing → 现在进行时");
  for (const key of ["threeVisitsThatchedCottage","xinjiangOfficialGrammar2026"]) {
    non(key,74,"done","过去分词作后置定语","a wise man / Zhuge Liang");
    pred(key,80,"有","一般过去时+被动","was deeply / by","时态+语态");
  }
  pred("urumqiNo1September2026Grammar",76,"没有","现在完成时","Over the past 40 years","时态","Over the past 40 years → 现在完成时");
  pred("urumqiNo1September2026Grammar",79,"没有","一般将来时","if more people try","时态","if 从句用一般现在时，主句用 will + 动词原形");

  const friends="midterm20261019FriendsChanges";
  word(friends,1,"名词","专有名词变形容词");
  pred(friends,3,"没有","一般过去时","When I first met them","时态","met → 过去语境");
  non(friends,5,"doing","介词 + doing","thought of");
  pred(friends,10,"有","现在完成时","the teacher has","时态","has + 过去分词 → 现在完成时");

  const family="midterm20261019FamilyRules";
  word(family,1,"动词","动词变形容词");
  pred(family,2,"有","一般现在时+被动","what is or isn’t","时态+语态");
  non(family,6,"to do","manage to do","manage");
  word(family,9,"形容词与副词","形容词变名词");

  const hometown="midterm20261019HometownChanges";
  word(hometown,1,"名词","名词变形容词");
  non(hometown,2,"to do","不定式作目的状语","tried my best");
  pred(hometown,3,"没有","现在完成时","in the past ten years","时态","in the past ten years → 现在完成时");

  const changes="midterm20261019MyPositiveChanges";
  pred(changes,1,"没有","一般过去时","When I was young","时态","When I was young → 过去语境");
  pred(changes,2,"没有","一般过去时","When I was young","时态","过去语境用 didn’t + 动词原形");
  non(changes,3,"doing","love doing","I love");
  pred(changes,4,"没有","一般过去时","In the past","时态","In the past → 一般过去时");
  pred(changes,5,"没有","一般过去时","In the past","时态","承接 In the past 的过去语境");
  word(changes,6,"名词","名词变形容词");
  pred(changes,7,"没有","一般过去时","Before / made mistakes","时态","made mistakes → 过去语境");
  pred(changes,10,"没有","一般将来时","in the future","时态","in the future → 一般将来时");
  non(changes,11,"doing","keep doing","keep");

  const dragon="midterm20261019ChineseDragon";
  word(dragon,2,"名词","名词变形容词");
  pred(dragon,3,"没有","情态动词过去式 + 动词原形","believed","情态动词","believed → 从句中用 can 的过去式 could");
  pred(dragon,5,"有","一般现在时+被动","is often / as","时态+语态");
  non(dragon,8,"to do","expect sb. to do","expect the child");
  word(dragon,9,"名词","名词变形容词");
  non(dragon,10,"doing","介词 to + doing","the secret to");

  const travel="midterm20261019GenerationalTravel";
  pred(travel,1,"没有","一般过去时","Instead of playing","时态","上下文叙述已经发生的旅行");
  category(travel,4,"介词");
  non(travel,5,"doing","介词 + doing","by");
  non(travel,8,["to do","doing"],"begin to do / begin doing","began");
  word(travel,9,"动词","动词变名词");
  word(travel,11,"名词","名词变形容词");

  const water="midterm20261019WaterFestival";
  non(water,2,"to do","不定式作目的状语","go onto the streets");
  non(water,3,"to do","a way to do","a way");
  non(water,4,"done","过去分词补充说明前面的名词","to hope");
  non(water,5,"doing","动名词作主语","local customs helps","没有");
  non(water,6,"doing","介词 + doing","about");
  pred(water,7,"没有","一般现在时+被动","cultures / by history","时态+语态");
  pred(water,8,"没有","一般现在时","Respecting them","主谓一致","动名词短语作主语，谓语用第三人称单数");
  non(water,10,"do","let sb. do","let cultures");

  const english="midterm20261019LearningEnglish";
  word(english,2,"名词","名词变形容词");
  pred(english,5,"没有","一般现在时","Our teacher, Miss Wang");
  word(english,6,"动词","动词变形容词");
  non(english,7,"to do","ask sb. not to do","asks us not");

  word(english,10,"代词","形容词性物主代词");
  non(english,11,"to do","would like to do","would you like to");

  const tea="midterm20261019ChineseTea";
  pred(tea,3,"有","一般现在时+被动","Tea is","时态+语态");
  non(tea,4,"to do","the way to do","The way to");
  non(tea,7,"doing","介词 + doing","After");
  pred(tea,8,"没有","一般现在时","different processing methods","主谓一致","there be 句型中复数名词搭配 are");
  word(tea,9,"介词","介词保持原形");
  non(tea,10,"to do","love to do","love to");

  const tech="midterm20261019TechnologyChanges";
  pred(tech,1,"没有","一般过去时","then / during the 1990s","时态","during the 1990s → 过去语境");
  word(tech,4,"动词","动词变形容词");
  word(tech,5,"动词","动词变名词");
  non(tech,6,"to do","不定式作目的状语","used it");
  pred(tech,11,"没有","情态动词 + 动词原形","should","情态动词");

  word("rmbCulture",79,"动词","动词变为列举用的介词");
  edit("rmbCulture",79,{explain:"提示词 include 是动词，填 including，引出 dragons and phoenixes 两个例子。"});
  word("urumqiNo13Midterm202611Grammar",78,"动词","动词变为列举用的介词");
  edit("urumqiNo13Midterm202611Grammar",78,{explain:"提示词 include 是动词，填 including，相当于‘包括’，引出 parks 和 mountain sights 两个例子。"});
  word("urumqi38-midterm-20261124",62,"动词","动词变名词");
  non("urumqi38-midterm-20261124",65,"do","used to + 动词原形","used to");
  word("urumqi08-midterm-202611",68,"动词","动词变形容词");
  word("urumqi126-cihu-midterm-20261026",65,"名词","专有名词变形容词");
  word("urumqi-joint1-202611",84,"数词","概数词 thousand 的用法");
})();


