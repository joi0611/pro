const banks = {高频:[],中频:[],"2022新课标增加词汇":[],"时间/国家/节日/中国文化":[]};
Object.entries(banks).forEach(([lib, rows]) => banks[lib] = rows.map(([w,s,cn,phrase,extra]) => ({w,s:s.split("/"),cn,phrase,extra,lib})));
function syllabify(word){
  const exceptions={basket:"bas/ket",basic:"ba/sic",cabin:"cab/in",visit:"vis/it",secret:"se/cret",gather:"gath/er",rocket:"rock/et",complex:"com/plex",conflict:"con/flict",lobster:"lob/ster",pumpkin:"pump/kin",bankrupt:"bank/rupt",construct:"con/struct",instruct:"in/struct",significant:"sig/nif/i/cant",finish:"fin/ish",surprise:"sur/prise",celebrate:"cel/e/brate",realize:"re/al/ize",regular:"reg/u/lar",future:"fu/ture",study:"stud/y",technology:"tech/nol/o/gy",through:"through",environment:"en/vi/ron/ment",history:"his/to/ry",difficult:"dif/fi/cult",believe:"be/lieve",interesting:"in/ter/est/ing","kung fu":"kung/fu",will:"will",all:"all"};
  if(exceptions[word])return exceptions[word].split("/");
  const compounds=["bag","box","child","dog","grand","hand","house","kind","mill","sand","school","stand","wind","with"];
  for(let i=3;i<word.length-2;i++)if(compounds.includes(word.slice(0,i))&&compounds.includes(word.slice(i)))return [word.slice(0,i),word.slice(i)];
  const affixes=["under","super","trans","inter","over","anti","auto","fore","post","semi","pre","pro","mis","non","sub","dis","un","re"];
  for(const a of affixes)if(word.startsWith(a)&&word.length>a.length+3)return [a,...syllabify(word.slice(a.length))];
  if(word.length>5&&/[^aeiou]le$/.test(word))return [word.slice(0,-3),word.slice(-3)];
  const vowels="aeiou",teams=["ai","ay","ea","ee","oa","ow","oo","oi","oy","ou","ue"],protectedUnits=["str","spr","spl","scr","squ","th","sh","ch","ck","ph","wh","br","cr","dr","fr","gr","pr","tr","bl","cl","fl","gl","pl","sl","sm","sn","sp","st","sw"];
  const groups=[];for(let i=0;i<word.length;i++)if(vowels.includes(word[i])){let start=i;while(i+1<word.length&&vowels.includes(word[i+1])&&teams.includes(word.slice(i,i+2)))i++;groups.push([start,i])}
  if(groups.length<2)return [word];
  let cuts=[];for(let i=0;i<groups.length-1;i++){let end=groups[i][1],next=groups[i+1][0],between=word.slice(end+1,next),cut;
    if(!between){if(!teams.includes(word.slice(end,next+1)))cut=next}
    else if(between.length===1)cut=next-1;
    else if(between.length===2)cut=end+1+(protectedUnits.includes(between)?0:1);
    else{let protectedAt=protectedUnits.find(u=>between.includes(u));cut=protectedAt?end+1+Math.max(1,between.indexOf(protectedAt)):end+2}
    if(cut>0)cuts.push(cut);
  }
  let last=0,out=[];[...new Set(cuts)].sort((a,b)=>a-b).forEach(c=>{if(c>last){out.push(word.slice(last,c));last=c}});if(last<word.length)out.push(word.slice(last));return out.filter(Boolean);
}
function studentChunks(word){
  const chunks=syllabify(word.toLowerCase()),out=[];let cursor=0;
  for(const chunk of chunks){out.push(word.slice(cursor,cursor+chunk.length));cursor+=chunk.length}
  if(cursor<word.length)out.push(word.slice(cursor));
  return out.filter(Boolean);
}
function importBank(rows,lib){
  return rows.filter(x=>x.w.toLowerCase()!=="mom").map(x=>{const meaning=cleanMeaningText(x.meaning);return {w:x.w,aliases:x.aliases||[],s:studentChunks(x.w),cn:meaning,rawMeaning:x.meaning,phonetic:x.phonetic,details:x.details||[],exampleEn:x.exampleEn,exampleCn:x.exampleCn,phrase:x.details?.[0]||"暂无补充搭配",extra:x.details?.slice(1).join("；")||meaning,lib}});
}
function cleanMeaningText(text){return String(text||"").replace(/\bmodal\s*v\.\s*&\s*v\./ig,"情态动词 / v.").replace(/\bmodal\s*v\./ig,"情态动词").replace(/\bmodal\./ig,"情态动词").replace(/\bmodal\b/ig,"情态动词")}
if(typeof DOC_WORDS!=="undefined"&&DOC_WORDS.length)banks.高频=importBank(DOC_WORDS,"高频");
if(typeof MID_WORDS!=="undefined"&&MID_WORDS.length)banks.中频=importBank(MID_WORDS,"中频");
if(typeof NEW_CURRICULUM_WORDS!=="undefined"&&NEW_CURRICULUM_WORDS.length)banks["2022新课标增加词汇"]=importBank(NEW_CURRICULUM_WORDS,"2022新课标增加词汇");
if(typeof CULTURE_WORDS!=="undefined"&&CULTURE_WORDS.length)banks["时间/国家/节日/中国文化"]=importBank(CULTURE_WORDS,"时间/国家/节日/中国文化");

const KEY="wuxian-progress-v4", intervals=[1,4,7,15],REVIEW_INTERVAL_VERSION="1-4-7-15",MAX_DAILY_WORDS=100,MAX_DAILY_REVIEWS=80,MIN_DAILY_NEW=20;
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const parseDate=s=>{let [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};
const today=()=>dateKey(new Date());
const addDate=(key,n)=>{let d=parseDate(key);d.setDate(d.getDate()+n);return dateKey(d)};
const studyDate=()=>{let active=profile?.activeDate||today();return active<today()?today():active};
const dateLabel=key=>{let d=parseDate(key),weeks="日一二三四五六";return `${d.getMonth()+1}月${d.getDate()}日 · 星期${weeks[d.getDay()]}`};
const SESSION_KEY="wuxian-login-code";
const DISABLED_LOGIN_CODES=new Set(["ZCQ9VU"]);
const profileKey=code=>`${KEY}:${String(code||"").trim()}`;
const load=code=>{try{return JSON.parse(localStorage.getItem(profileKey(code)))}catch{return null}};
const validLoginCode=code=>{code=String(code||"").trim();return !DISABLED_LOGIN_CODES.has(code)&&(window.LOGIN_CODES||[]).includes(code)};
const cloudConfig=window.CLOUD_CONFIG||{},cloudEnabled=Boolean(cloudConfig.supabaseUrl&&cloudConfig.anonKey),VOCABULARY_SYSTEM_TYPE="vocabulary",VOCABULARY_PROFILE_ID="__profile__";
async function callSupabaseRpc(name,payload){
  const response=await fetch(`${cloudConfig.supabaseUrl}/rest/v1/rpc/${name}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:cloudConfig.anonKey,Authorization:`Bearer ${cloudConfig.anonKey}`},body:JSON.stringify(payload)});
  const text=await response.text();let result=null;
  if(text){try{result=JSON.parse(text)}catch{result=text}}
  if(!response.ok)throw new Error(result?.message||"云端服务暂时不可用");
  return result;
}
async function cloudCall(action,code,extra={}){
  if(action==="login"){
    const result=await callSupabaseRpc("verify_access_code",{input_code:code,input_system_type:VOCABULARY_SYSTEM_TYPE});
    const account=Array.isArray(result)?result[0]:null;
    if(!account?.access_code_id)throw new Error("该登录码不可用于单词训练，或登录码不正确");
    return {ok:true};
  }
  if(action==="get"){
    const rows=await callSupabaseRpc("get_learning_progress",{input_code:code,input_system_type:VOCABULARY_SYSTEM_TYPE});
    const record=Array.isArray(rows)?rows.find(row=>row.lesson_id===VOCABULARY_PROFILE_ID):null;
    return {ok:true,profile:record?.progress||null};
  }
  if(action==="save"){
    await callSupabaseRpc("save_learning_progress",{input_code:code,input_system_type:VOCABULARY_SYSTEM_TYPE,input_lesson_id:VOCABULARY_PROFILE_ID,input_progress:extra.profile||{},input_completed:false,input_score:null});
    return {ok:true};
  }
  throw new Error("未知云端操作");
}
let loginCode=(localStorage.getItem(SESSION_KEY)||"").trim(),profile=loginCode&&(cloudEnabled||validLoginCode(loginCode))?load(loginCode):null,syncTimer=null;
if(profile&&![10,20,30,40].includes(profile.daily)){profile.daily=20;localStorage.setItem(profileKey(loginCode),JSON.stringify(profile))}
let state={screen:profile?"home":"login",grade:profile?.grade||"初一",score:50,daily:profile?.daily||30,selected:profile?.selected||["高频"],queue:[],retryNames:[],scan:[],scanPool:[],scanOffset:0,idx:0,reveal:false,flip:false,noteReveal:false,meaningViewed:false,noteViewed:false,viewedCards:[],testIdx:0,testScore:0,testFeedback:"",testFeedbackType:"",testCorrectAnswer:"",testExplanation:"",testMistakes:[],reinforceIdx:0,reinforceCount:0,reinforceReady:false,reinforceTimer:null,memoryLayout:[],memoryAudio:null,followToken:0,reviewIdx:0,reviewQueue:[],reviewTotal:0,todayReviewMode:"en-cn",todayReviewRevealed:[]};
const app=document.querySelector("#app");
function profileBase64(value){const bytes=new TextEncoder().encode(JSON.stringify(value));let binary="";for(const b of bytes)binary+=String.fromCharCode(b);return btoa(binary)}
function save(){
  if(!loginCode||!profile)return;
  localStorage.setItem(profileKey(loginCode),JSON.stringify(profile));
  if(cloudEnabled){clearTimeout(syncTimer);syncTimer=setTimeout(()=>cloudCall("save",loginCode,{profile}).catch(()=>{}),250)}
}
const resumableScreens=["review","scan","study","test","reinforce","reinforceWord"];
function checkpoint(){
  if(!profile||!resumableScreens.includes(state.screen))return;
  profile.activeSession={
    date:studyDate(),screen:state.screen,
    queue:state.queue.map(x=>x.w),retryNames:[...state.retryNames],
    scan:state.scan.map(x=>({w:x.w,status:x.status||""})),scanOffset:state.scanOffset,
    idx:state.idx,meaningViewed:state.meaningViewed,viewedCards:[...state.viewedCards],
    testIdx:state.testIdx,testScore:state.testScore,testMistakes:state.testMistakes.map(x=>x.w),
    reinforceIdx:state.reinforceIdx,reviewIdx:state.reviewIdx,reviewTotal:state.reviewTotal,
    reviewQueue:state.reviewQueue.map(x=>x.w)
  };
  save();
}
function restoreCheckpoint(){
  const s=profile?.activeSession;if(!s||s.date!==studyDate()||!resumableScreens.includes(s.screen))return false;
  state.queue=(s.queue||[]).map(wordByName).filter(Boolean);state.retryNames=s.retryNames||[];
  state.scanPool=allWords().filter(x=>!state.retryNames.includes(x.w));state.scanOffset=s.scanOffset||0;
  state.scan=(s.scan||[]).map(v=>{const word=wordByName(v.w);return word?{...word,status:v.status||""}:null}).filter(Boolean);
  state.idx=s.idx||0;state.meaningViewed=Boolean(s.meaningViewed);state.viewedCards=s.viewedCards||[];
  state.testIdx=s.testIdx||0;state.testScore=s.testScore||0;state.testMistakes=(s.testMistakes||[]).map(wordByName).filter(Boolean);
  state.reinforceIdx=s.reinforceIdx||0;state.reviewIdx=s.reviewIdx||0;state.reviewTotal=s.reviewTotal||0;
  state.reviewQueue=(s.reviewQueue||[]).map(w=>dueReviews(s.date).find(x=>x.w===w)||wordByName(w)).filter(Boolean);
  state.reveal=false;state.noteReveal=false;state.reinforceReady=false;
  state.screen=s.screen==="reinforceWord"?"reinforce":s.screen;
  return true;
}
const libraryOrder=["高频","中频","2022新课标增加词汇","时间/国家/节日/中国文化"];
function routeFromSelection(selected){
  const chosen=(selected||["高频"]).map(x=>libraryOrder.indexOf(x)).filter(x=>x>=0);
  return libraryOrder.slice(chosen.length?Math.min(...chosen):0);
}
function ensureLearningRoute(){
  if(!profile.libraryQueue?.length)profile.libraryQueue=routeFromSelection(profile.selected);
  profile.libraryQueue=[...new Set(profile.libraryQueue)].filter(x=>libraryOrder.includes(x));
}
function learningLibraries(){ensureLearningRoute();return profile.libraryQueue}
function completedKey(x){return `${x.lib}:${x.w}`}
function ensureCompletionData(){profile.completedWords=profile.completedWords||[];if(!profile.completedMigrated){for(const lib of libraryOrder){let n=Math.min(profile.learned?.[lib]||0,banks[lib].length);profile.completedWords.push(...banks[lib].slice(0,n).map(completedKey))}profile.completedWords=[...new Set(profile.completedWords)];profile.completedMigrated=true}}
function markCompleted(x){ensureCompletionData();let key=completedKey(x);if(!profile.completedWords.includes(key))profile.completedWords.push(key);profile.learned[x.lib]=profile.completedWords.filter(k=>k.startsWith(`${x.lib}:`)).length}
function unmarkCompleted(x){ensureCompletionData();profile.completedWords=profile.completedWords.filter(k=>k!==completedKey(x));profile.learned[x.lib]=profile.completedWords.filter(k=>k.startsWith(`${x.lib}:`)).length}
const allWords=()=>{ensureCompletionData();let done=new Set(profile.completedWords);return learningLibraries().flatMap(x=>banks[x]).filter(x=>!done.has(completedKey(x)))};
const wordByName=n=>Object.values(banks).flat().find(x=>x.w===n);
const wordByCompletedKey=key=>Object.values(banks).flat().find(x=>completedKey(x)===key);
function rememberTodayWords(words,key=studyDate()){profile.dailyStats=profile.dailyStats||{};let s=profile.dailyStats[key]||{new:0,review:0};s.todayWords=[...new Set([...(s.todayWords||[]),...words.map(completedKey)])];profile.dailyStats[key]=s}
function todayContentWords(key=studyDate()){
  const saved=profile.dailyStats?.[key]?.todayWords||[],fromSessions=(profile.finalizedNewSessions||[]).filter(x=>x.startsWith(`${key}:`)).flatMap(x=>x.slice(key.length+1).split("|").filter(Boolean));
  const explicit=[...new Set([...saved,...fromSessions])].map(wordByCompletedKey).filter(Boolean);
  if(explicit.length)return explicit;
  const s=profile.dailyStats?.[key],count=(s?.new||0)+(s?.review||0);
  return count&&isDayComplete(key)?(profile.completedWords||[]).slice(-count).map(wordByCompletedKey).filter(Boolean):[];
}
function reviewEnabled(){return (profile?.reviewMode||"ebbinghaus")!=="newOnly"}
function dayStarted(key){let s=profile?.dailyStats?.[key];return Boolean((s&&((s.new||0)||(s.review||0)))||(profile?.activeSession?.date===key&&resumableScreens.includes(profile.activeSession.screen)))}
function reviewDueAfter(key,level){return addDate(key,intervals[Math.min(Math.max(level,0),intervals.length-1)])}
function applyReviewIntervalVersion(key=studyDate()){
  if(!profile||profile.reviewIntervalVersion===REVIEW_INTERVAL_VERSION)return;
  if(dayStarted(key))return;
  profile.dailyStats=profile.dailyStats||{};
  let s=profile.dailyStats[key]||{new:0,review:0};
  delete s.planNew;delete s.planReview;
  profile.dailyStats[key]=s;profile.reviewIntervalVersion=REVIEW_INTERVAL_VERSION;save();
}
function normalizeNewOnlyPlan(key=studyDate()){
  if(reviewEnabled())return;
  profile.dailyStats=profile.dailyStats||{};
  const target=profile.daily+retryWordsFor(key).length,expected=Math.max(profile.dailyStats[key]?.new||0,target);
  let s=profile.dailyStats[key]||{new:0,review:0};
  if(s.planNew!==expected||s.planReview!==0||s.carryNew){
    s.carryNew=0;s.replaceDailyNew=false;s.planNew=expected;s.planReview=0;profile.dailyStats[key]=s;save();
  }
}
const dueReviews=(key=studyDate())=>reviewEnabled()?(profile?.reviews||[]).filter(x=>x.due<=key).map(x=>{const word=wordByName(x.w);return word?{...word,...x}:null}).filter(Boolean):[];
function applyDailyReviewLimit(key=studyDate()){
  if(!reviewEnabled())return 0;
  profile.reviews=(profile.reviews||[]).filter(r=>wordByName(r.w));
  const due=profile.reviews.filter(r=>r.due<=key);
  if(due.length>MAX_DAILY_REVIEWS){due.slice(MAX_DAILY_REVIEWS).forEach(r=>r.due=addDate(key,1));save()}
  return Math.min(due.length,MAX_DAILY_REVIEWS);
}
function recommendation(score){
  if(score<60)return {text:"建议从高频词开始，先建立最实用的词汇地基。",libs:["高频"]};
  if(score<80)return {text:"先筛选高频，再重点学习中频，之后学习2022新课标增加词汇和文化主题词汇。",libs:["高频","中频"]};
  return {text:"快速筛选高频和中频，重点学习2022新课标增加词汇与文化主题词汇。",libs:["高频","中频","2022新课标增加词汇","时间/国家/节日/中国文化"]};
}
function shell(content,homeLink=false){return `<div class="shell"><header class="top"><a class="brand" href="../../index.html"><img src="../../assets/favicon.svg" alt=""><strong>新疆学生无限进步</strong><span>单词训练</span></a><div class="top-actions">${homeLink?'<button class="back" id="home">回到首页</button>':""}<a class="site-home-link" href="../../index.html">训练其他题型</a><div class="streak">连续学习 ${profile?.streak||0} 天</div>${loginCode?'<button class="logout" id="logout">退出登录</button>':""}</div></header>${content}</div>`}
function progressBar(n){return `<div class="progress"><i style="width:${Math.min(100,n)}%"></i></div>`}
function bindHome(){let b=document.querySelector("#home");if(b)b.onclick=()=>{if(profile){if(resumableScreens.includes(state.screen))checkpoint();else{profile.activeSession=null;save()}}state.screen="home";render()}}
function bindLogout(){
  const button=document.querySelector("#logout");if(!button)return;
  button.onclick=()=>{
    const code=loginCode,data=profile;
    clearTimeout(syncTimer);clearInterval(state.reinforceTimer);state.followToken++;
    if(typeof stopMemoryPlayback==="function")stopMemoryPlayback();
    if(cloudEnabled&&code&&data)cloudCall("save",code,{profile:data}).catch(()=>{});
    localStorage.removeItem(SESSION_KEY);loginCode="";profile=null;
    state.screen="login";state.queue=[];state.reviewQueue=[];state.testMistakes=[];
    render();
  };
}

function login(){
  app.innerHTML=`<main class="login-page"><a class="login-home-link" href="../../index.html">返回首页，训练其他题型</a><div class="login-brand"><img src="../../assets/favicon.svg" alt=""><strong>新疆学生无限进步</strong><span>单词训练</span></div><div class="login-orbit"><svg viewBox="0 0 320 320" aria-hidden="true"><defs><path id="orbitPath" d="M 42,160 A 118,118 0 1,1 278,160 A 118,118 0 1,1 42,160"/></defs><text><textPath href="#orbitPath" startOffset="0%">相信你可以无限进步 ·</textPath></text><text><textPath href="#orbitPath" startOffset="33.33%">相信你可以无限进步 ·</textPath></text><text><textPath href="#orbitPath" startOffset="66.66%">相信你可以无限进步 ·</textPath></text></svg><img src="assets/earth-study.png" alt="词汇学习伙伴"></div><section class="login-box"><h1>中考词汇备考系统</h1><p>输入8位登录码，继续你的词汇旅程</p><label class="login-label" for="loginInput">登录码</label><input id="loginInput" maxlength="8" autocomplete="one-time-code" autocapitalize="none" spellcheck="false" placeholder="请输入8位登录码"><button id="loginButton">登录学习</button><small id="loginError" aria-live="polite"></small></section><footer class="login-credit">@新疆学生无限进步</footer></main>`;
  const input=document.querySelector("#loginInput"),button=document.querySelector("#loginButton");input.value=loginCode;
  const submit=async()=>{const code=input.value.trim(),error=document.querySelector("#loginError");if(!/^[A-Za-z0-9]{8}$/.test(code)){error.textContent="请输入正确的8位登录码，并注意大小写";return}if(DISABLED_LOGIN_CODES.has(code)){error.textContent="该登录码已停用";return}button.disabled=true;button.textContent="正在读取学习档案…";error.textContent="";try{if(cloudEnabled)await cloudCall("login",code);else if(!validLoginCode(code))throw new Error("登录码无效");loginCode=code;localStorage.setItem(SESSION_KEY,code);if(cloudEnabled){const remote=await cloudCall("get",code);profile=remote.profile||load(code)}else profile=load(code);if(profile){localStorage.setItem(profileKey(code),JSON.stringify(profile));state.grade=profile.grade||"初一";state.daily=profile.daily||20;state.selected=profile.selected||["高频"];state.screen="home";restoreCheckpoint()}else state.screen="onboard";render()}catch(e){error.textContent=e.message||"暂时无法登录，请检查网络";button.disabled=false;button.textContent="登录学习"}};
  button.onclick=submit;input.onkeydown=e=>{if(e.key==="Enter")submit()};
}

function onboard(){
  const junior=state.grade==="初一",rec=junior?{text:"小升初阶段建议从高频词开始，先夯实最常用、最核心的中考词汇。",libs:["高频"]}:recommendation(state.score);
  app.innerHTML=shell(`<section class="hero"><span class="eyebrow">首次学习 · 建立学习档案</span><h1>先找到最适合你的起点。</h1><p>这一步只出现一次，之后每天会直接进入学习首页。</p></section><section class="panel">
  <div class="label">第一步 · 选择当前年级</div><div class="score-row grade-row">${["初一","初二","初三"].map(g=>`<button class="pill ${state.grade===g?"active":""}" data-grade="${g}">${g}</button>`).join("")}</div>
  ${junior?`<div class="label section-gap">第二步 · 小升初学习建议</div><div class="advice"><b>从高频词开始</b><br>${rec.text}</div>`:`<div class="label section-gap">第二步 · 最近一次英语测试得分率</div><div class="score-row">${[50,70,85].map((n,i)=>`<button class="pill ${state.score===n?"active":""}" data-score="${n}">${["60% 以下","60%–80%","80% 以上"][i]}</button>`).join("")}</div><div class="advice"><b>学习建议</b><br>${rec.text}</div>`}
  <div class="label">主要背诵词库（可多选）</div><div class="library-grid">${libraryCards()}</div>
  <div class="label section-gap">每天学新数量</div><div class="daily-row">${dailyPills()}</div>
  <aside class="onboard-tip"><div class="tip-title">🌼 温馨提示</div><p>每天按照下面的顺序完成学习：</p><ol><li><b>记忆复习</b>：先复习到期单词。</li><li><b>筛选新词</b>：只看英文，判断认识或不认识。</li><li><b>学习新词</b>：查看中文释义、固定搭配、词形变化等内容。</li><li><b>学后检测</b>：完成例句或固定搭配挖空题。</li><li><b>错词强化</b>：对检测错词进行15秒加强记忆。</li></ol><div class="tip-important">学新时，需要查看中文释义并点击完当前单词的所有知识卡片，才可以点击“记住了”或“还不熟”，进入下一词。</div></aside>
  <button class="primary" id="create">建立档案，进入首页</button></section>`);
  bindSetup();
  document.querySelector("#create").onclick=()=>{profile={grade:state.grade,score:state.score,daily:state.daily,selected:state.selected,reviewMode:"ebbinghaus",libraryQueue:routeFromSelection(state.selected),activeDate:today(),streak:0,learned:{高频:0,中频:0,"2022新课标增加词汇":0,"时间/国家/节日/中国文化":0},completedWords:[],completedMigrated:true,history:{},dailyStats:{[today()]:{new:0,review:0,planNew:state.daily,planReview:0}},reviews:[],relearn:[],settingsHistory:[],todayNew:0,todayReview:0,lastDay:today()};save();state.screen="home";render()};
}
const bankTitle=x=>x==="高频"||x==="中频"?`${x}词`:x;
function libraryCards(){return Object.keys(banks).map((x,i)=>`<button class="library ${state.selected.includes(x)?"selected":""}" data-lib="${x}"><b>${bankTitle(x)}</b><span>${["考试核心 · 优先掌握","常见语境 · 重点积累","新课标新增 · 重点补充","时间国家节日 · 中国文化"][i]}</span>${state.selected.includes(x)?'<b class="check">✓</b>':""}</button>`).join("")}
function dailyPills(){return [10,20,30,40].map(n=>`<button class="pill ${state.daily===n?"active":""}" data-daily="${n}">${n} 词</button>`).join("")}
function bindSetup(){
  document.querySelectorAll("[data-grade]").forEach(b=>b.onclick=()=>{state.grade=b.dataset.grade;if(state.grade==="初一"){state.score=50;state.selected=["高频"]}else state.selected=recommendation(state.score).libs;onboard()});
  document.querySelectorAll("[data-score]").forEach(b=>b.onclick=()=>{state.score=+b.dataset.score;state.selected=recommendation(state.score).libs;onboard()});
  document.querySelectorAll("[data-daily]").forEach(b=>b.onclick=()=>{state.daily=+b.dataset.daily;(state.screen==="onboard"?onboard:settings)()});
  document.querySelectorAll("[data-lib]").forEach(b=>b.onclick=()=>{let x=b.dataset.lib;state.selected=state.selected.includes(x)?state.selected.filter(y=>y!==x):[...state.selected,x];if(!state.selected.length)state.selected=[x];(state.screen==="onboard"?onboard:settings)()});
}

function home(){
  if(!profile.activeDate||profile.activeDate<today())profile.activeDate=today();
  profile.reviews=(profile.reviews||[]).filter(r=>wordByName(r.w));
  profile.history=profile.history||{};
  applyReviewIntervalVersion(studyDate());
  const active=studyDate(),due=applyDailyReviewLimit(active),totalLearned=Object.values(profile.learned).reduce((a,b)=>a+b,0);
  rollForwardMissedPlans(active);
  normalizeNewOnlyPlan(active);
  ensureDayPlan(active,due);
  const stats=profile.dailyStats[active],done=(stats.new||0)+(stats.review||0),total=(stats.planNew||0)+(stats.planReview||0),percent=Math.min(100,done/(total||1)*100),finished=isDayComplete(active),hasResume=profile.activeSession&&profile.activeSession.date===studyDate()&&resumableScreens.includes(profile.activeSession.screen),reviewText=reviewEnabled()?`艾宾浩斯计划 · ${stats.planReview} 词`:"只学新词模式 · 0 词",todayReviewCount=todayContentWords(active).length;
  app.innerHTML=shell(`<section class="dash-head"><div><span class="eyebrow">${dateLabel(active)}</span><h1>今天也稳稳向前，<br>相信你可以无限进步！</h1></div><button class="icon-btn" id="settings">学习设置 ⚙</button></section>
  <section class="today-card"><div><div class="label">${active===today()?"今日学习":`${parseDate(active).getMonth()+1}月${parseDate(active).getDate()}日学习`}</div><h2>${done} <small>词已完成</small></h2><p>待复习 ${due} 词 · 计划学新 ${stats.planNew} 词</p></div><img class="today-earth" src="assets/earth-study.png" alt="无限进步学习伙伴"><div class="ring" style="--p:${percent}"><b>${Math.round(percent)}%</b></div></section>
  <div class="dashboard-grid"><section class="panel calendar-panel">${calendar()}</section><section class="panel task-panel"><div class="label">学习任务</div><div class="task-line"><span class="task-icon review-icon">↻</span><div><b>记忆复习</b><small>${reviewText}</small></div><strong>${stats.review||0}/${stats.planReview||0}</strong></div><div class="task-line"><span class="task-icon new-icon">＋</span><div><b>学习新词</b><small>先筛词，后学习</small></div><strong>${stats.new||0}/${stats.planNew}</strong></div><button class="primary ${finished&&!hasResume?"day-finished":""}" id="today">${hasResume?"继续学习":finished?"今日学完 ✓":due?"先复习，再开始学新":"开始筛词"}</button>${finished&&!hasResume&&todayReviewCount?'<button class="today-review-btn" id="todayReview">复习当日内容</button>':""}${finished&&!hasResume?'<p class="advance-tip">双击日历中的下一日，可以提前学习</p>':""}</section></div>
  <section class="panel"><div class="progress-head"><div><div class="label">词库进度</div><h2>已掌握 ${totalLearned} 词</h2></div><span class="muted">本月 +43</span></div><div class="bank-progress">${Object.keys(banks).map((x,i)=>{let total=banks[x].length,n=profile.learned[x]||0,p=total?n/total*100:0;return `<div class="bank-row"><span class="bank-dot c${i}"></span><div><b>${bankTitle(x)}</b>${progressBar(p)}</div><strong>${n}<small> / ${total}</small></strong></div>`}).join("")}</div></section>`);
  document.querySelector("#settings").onclick=()=>{state.screen="settings";render()};
  document.querySelector("#today").onclick=()=>{if(profile.activeSession&&profile.activeSession.date===studyDate()&&resumableScreens.includes(profile.activeSession.screen)&&restoreCheckpoint()){render();return}if(finished){alert("今日任务已完成，双击日历中的下一日即可提前学习。");return}if(due){state.reviewIdx=0;state.reveal=false;state.reviewQueue=dueReviews(active);state.reviewTotal=state.reviewQueue.length;state.screen="review";render()}else startScan()};
  const todayReviewButton=document.querySelector("#todayReview");if(todayReviewButton)todayReviewButton.onclick=()=>{state.todayReviewMode="en-cn";state.todayReviewRevealed=[];state.screen="todayReview";render()};
  document.querySelectorAll("[data-date]").forEach(cell=>cell.ondblclick=()=>{
    const next=addDate(active,1);
    if(cell.dataset.date!==next)return;
    if(!isDayComplete(active)){alert("请先完成当前学习日的学新和复习任务。");return}
    profile.activeDate=next;ensureDayPlan(next,applyDailyReviewLimit(next));save();home();
  });
}
function calendar(){
  const active=studyDate(),view=parseDate(active),year=view.getFullYear(),month=view.getMonth(),first=(new Date(year,month,1).getDay()+6)%7,days=new Date(year,month+1,0).getDate(),cells=[...Array(first).fill(""),...Array.from({length:days},(_,i)=>i+1)],next=addDate(active,1),canAdvance=isDayComplete(active);
  const nextDate=parseDate(next),crossMonth=nextDate.getMonth()!==month;
  return `<div class="calendar-head"><div><div class="label">学习日历</div><h2>${year} 年 ${month+1} 月</h2></div><div class="legend"><i></i> 已完成</div></div><p class="calendar-tip">${reviewEnabled()?"复习数按学新后的第 1、4、7、15 天自动叠加":"当前为只学新词模式，复习数从今天起显示为 0"}</p><div class="week">${"一二三四五六日".split("").map(x=>`<b>${x}</b>`).join("")}${cells.map(d=>{if(!d)return "<span></span>";let key=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,s=dayPlan(key),reviewPlan=calendarReviewPlan(key),classes=[key===today()?"today-day":"",key===active?"active-day":"",profile.history[key]||"",key===next&&canAdvance?"available-next":""].join(" ");return `<span class="calendar-day ${classes}" data-date="${key}"><b>${d}</b><small>新 ${s.new||0}/${s.planNew}</small><small>复 ${s.review||0}/${reviewPlan}</small></span>`}).join("")}</div>${crossMonth&&canAdvance?`<button class="calendar-next available-next" data-date="${next}">双击进入 ${nextDate.getMonth()+1}月${nextDate.getDate()}日 →</button>`:""}`;
}
function settings(){
  const mode=profile.reviewMode||"ebbinghaus";
  app.innerHTML=shell(`<button class="back" id="home">← 返回首页</button><section class="panel"><div class="label">学习设置</div><h2>调整每日计划</h2><div class="label section-gap">主要背诵词库</div><div class="library-grid">${libraryCards()}</div><div class="label section-gap">每天学新数量</div><div class="daily-row">${dailyPills()}</div><div class="label section-gap">复习方式</div><div class="daily-row"><button class="pill ${mode==="newOnly"?"active":""}" data-review-mode="newOnly">只学新词，不复习</button><button class="pill ${mode==="ebbinghaus"?"active":""}" data-review-mode="ebbinghaus">按艾宾浩斯复习</button></div><p class="muted">切换为“只学新词”后，学习记录会保留，但从今天开始不再安排复习。</p><button class="primary" id="saveSettings">保存设置</button></section>`);
  bindHome();bindSetup();document.querySelectorAll("[data-review-mode]").forEach(b=>b.onclick=()=>{profile.reviewMode=b.dataset.reviewMode;settings()});document.querySelector("#saveSettings").onclick=()=>{
    ensureLearningRoute();
    const before={daily:profile.daily,selected:[...(profile.selected||[])],reviewMode:profile.reviewMode||"ebbinghaus"};
    profile.daily=state.daily;profile.selected=[...state.selected];
    profile.reviewMode=profile.reviewMode||"ebbinghaus";
    const requestedRoute=routeFromSelection(state.selected);
    profile.libraryQueue=[...new Set([...profile.libraryQueue,...requestedRoute])];
    ensureDayPlan(studyDate(),scheduledReviewCount(studyDate()),true);
    profile.settingsHistory=profile.settingsHistory||[];profile.settingsHistory.push({date:today(),before,after:{daily:profile.daily,selected:[...profile.selected],reviewMode:profile.reviewMode}});
    save();state.screen="home";render()
  };
}

function review(){
  if(!state.reviewTotal){state.reviewQueue=dueReviews(studyDate());state.reviewTotal=state.reviewQueue.length}
  if(!state.reviewQueue.length){state.reviewIdx=0;state.reviewTotal=0;state.screen="scan";startScan();return}
  const x=state.reviewQueue[0],current=state.reviewTotal-state.reviewQueue.length+1;
  app.innerHTML=shell(`<section class="panel study"><div class="study-meta"><span>今日复习 ${current} / ${state.reviewTotal}</span><span>艾宾浩斯复习</span></div>${progressBar(current/state.reviewTotal*100)}<div class="word-card" id="reveal"><div class="chunks">${chunks(x)}</div>${state.reveal?`<div class="meaning">${x.cn}</div><div class="hint">${x.phrase}</div>`:'<div class="hint">先回忆词义，再点击卡片</div>'}</div>${state.reveal?'<div class="next"><button class="primary ghost" data-rate="again">忘记了</button><button class="primary" data-rate="good">记得</button></div>':""}</section>`,true);bindHome();
  document.querySelector("#reveal").onclick=()=>{const opening=!state.reveal;state.reveal=true;review();if(opening)playReviewReading(x)};
  document.querySelectorAll("[data-rate]").forEach(b=>b.onclick=()=>{let r=profile.reviews.find(r=>r.w===x.w);r.level=b.dataset.rate==="good"?Math.min(intervals.length-1,r.level+1):0;r.due=reviewDueAfter(studyDate(),r.level);rememberTodayWords([x]);recordStudy(0,1);state.reviewQueue.shift();state.reviewIdx++;state.reveal=false;checkpoint();review()});
}
function todayReview(){
  const words=todayContentWords(studyDate()),mode=state.todayReviewMode||"en-cn",title=mode==="en-cn"?"看英说中":"看中说英";
  app.innerHTML=shell(`<section class="panel today-review-panel"><div class="study-meta"><span>当日内容复习</span><span>${words.length} 词</span></div><h2>${title}</h2><p class="muted">点击每一行，逐个显示答案；点击英文单词可以发音。</p><div class="daily-row today-review-modes"><button class="pill ${mode==="en-cn"?"active":""}" data-today-review-mode="en-cn">看英说中</button><button class="pill ${mode==="cn-en"?"active":""}" data-today-review-mode="cn-en">看中说英</button></div><div class="today-review-list">${words.length?words.map((x,i)=>{const shown=state.todayReviewRevealed.includes(i),left=mode==="en-cn"?`<button class="review-speak-word" data-speak="${x.w}">${x.w} 🔊</button>`:`<span class="review-cn">${x.cn}</span>`,right=mode==="en-cn"?`<span class="review-cn">${x.cn}</span>`:`<button class="review-speak-word" data-speak="${x.w}">${x.w} 🔊</button>`;return `<div class="today-review-row ${shown?"revealed":""}" data-review-reveal="${i}"><div>${left}</div><div>${shown?right:'<span class="review-hidden">点击显示</span>'}</div></div>`}).join(""):'<div class="empty-review">今天暂时没有可复习的新学内容。</div>'}</div></section>`,true);bindHome();
  document.querySelectorAll("[data-today-review-mode]").forEach(b=>b.onclick=()=>{state.todayReviewMode=b.dataset.todayReviewMode;state.todayReviewRevealed=[];todayReview()});
  document.querySelectorAll("[data-review-reveal]").forEach(row=>row.onclick=()=>{const i=+row.dataset.reviewReveal;if(!state.todayReviewRevealed.includes(i))state.todayReviewRevealed.push(i);todayReview()});
  document.querySelectorAll("[data-speak]").forEach(b=>b.onclick=e=>{e.stopPropagation();pronounce(b.dataset.speak,b)});
}
function scheduledReviewCount(key){const n=reviewEnabled()?(profile?.reviews?.filter(r=>wordByName(r.w)&&(key<=studyDate()?r.due<=key:r.due===key)).length||0):0;return Math.min(n,MAX_DAILY_REVIEWS)}
function calendarReviewPlan(key){
  if(!reviewEnabled())return 0;
  if(key<=today())return scheduledReviewCount(key);
  const projected=intervals.reduce((sum,offset)=>{
    const source=addDate(key,-offset),s=profile.dailyStats?.[source];
    const learned=s?.new||0,planned=source>=today()?(s?.planNew??profile.daily):learned;
    return sum+planned;
  },0);
  const alreadyScheduled=profile?.reviews?.filter(r=>r.due===key).length||0;
  return Math.min(MAX_DAILY_REVIEWS,Math.max(projected,alreadyScheduled));
}
function retryWordsFor(key){profile.relearn=profile.relearn||[];return [...new Set(profile.relearn.filter(r=>r.due<=key).map(r=>r.w))]}
function plannedNewCount(key,reviewCount=scheduledReviewCount(key)){
  const s=profile.dailyStats?.[key]||{},baseDaily=s.replaceDailyNew?0:profile.daily,base=baseDaily+retryWordsFor(key).length+(s.carryNew||0);
  if(!reviewEnabled())return profile.daily+retryWordsFor(key).length;
  const reviewPlan=Math.min(reviewCount,MAX_DAILY_REVIEWS),minNew=base>0?Math.min(base,MIN_DAILY_NEW):0,capacity=Math.max(minNew,MAX_DAILY_WORDS-reviewPlan);
  return Math.min(base,capacity);
}
function dayPlan(key){let s=profile.dailyStats?.[key]||{};return {new:s.new||0,review:s.review||0,planNew:s.planNew??plannedNewCount(key),planReview:s.planReview??scheduledReviewCount(key)}}
function ensureDayPlan(key,due=scheduledReviewCount(key),replace=false){profile.dailyStats=profile.dailyStats||{};let s=profile.dailyStats[key]||{new:0,review:0};if(replace||s.planNew==null)s.planNew=plannedNewCount(key,due);if(s.planReview==null||replace)s.planReview=due+(s.review||0);profile.dailyStats[key]=s}
function rollForwardMissedPlans(key){
  if(!reviewEnabled())return;
  profile.dailyStats=profile.dailyStats||{};let carryExtra=0,carryReplace=0;
  Object.keys(profile.dailyStats).filter(d=>d<key).sort().forEach(d=>{let s=profile.dailyStats[d];if(s.carriedTo)return;let missing=Math.max(0,(s.planNew||profile.daily)-(s.new||0));if(missing){let noLearning=!(s.new||0)&&!(s.review||0);if(reviewEnabled()&&noLearning)carryReplace=Math.max(carryReplace,missing);else carryExtra+=missing;s.carriedTo=key}});
  if(carryExtra||carryReplace){let s=profile.dailyStats[key]||{new:0,review:0};s.carryNew=(s.carryNew||0)+carryExtra+carryReplace;s.replaceDailyNew=!!(carryReplace&&!carryExtra);s.planNew=plannedNewCount(key,scheduledReviewCount(key));profile.dailyStats[key]=s;save()}
}
function recordStudy(newCount=0,reviewCount=0){let key=studyDate();ensureDayPlan(key);let s=profile.dailyStats[key];s.new+=newCount;s.review+=reviewCount}
function learningSessionKey(){return `${studyDate()}:${state.queue.map(x=>completedKey(x)).join("|")}`}
function finalizeNewLearning(){
  if(!state.queue.length)return;
  profile.finalizedNewSessions=profile.finalizedNewSessions||[];
  const key=learningSessionKey();if(profile.finalizedNewSessions.includes(key))return;
  rememberTodayWords(state.queue);
  state.queue.forEach(x=>{if(reviewEnabled()&&!profile.reviews.some(r=>r.w===x.w))profile.reviews.push({w:x.w,level:0,due:addDate(studyDate(),1)});markCompleted(x)});
  profile.relearn=(profile.relearn||[]).filter(r=>!(state.retryNames.includes(r.w)&&r.due<=studyDate()));
  recordStudy(state.queue.length,0);
  profile.finalizedNewSessions.push(key);
  if(isDayComplete(studyDate()))profile.history[studyDate()]="done";
  save();
}
function isDayComplete(key){let s=dayPlan(key);return s.new>=s.planNew&&s.review>=s.planReview}
function learningTarget(){return dayPlan(studyDate()).planNew}
function appendScanBatch(){
  const remaining=learningTarget()-state.queue.length,batchSize=Math.max(10,remaining);
  const next=state.scanPool.slice(state.scanOffset,state.scanOffset+batchSize).map(x=>({...x,status:""}));
  state.scan.push(...next);state.scanOffset+=next.length;
}
function startScan(){
  ensureDayPlan(studyDate());state.retryNames=retryWordsFor(studyDate());
  state.queue=state.retryNames.map(wordByName).filter(Boolean);state.scanPool=allWords().filter(x=>!state.retryNames.includes(x.w));state.scan=[];state.scanOffset=0;state.screen="scan";
  appendScanBatch();render();
}
function scan(){
  let done=state.scan.filter(x=>x.status).length,need=learningTarget(),earlyReady=state.queue.length>=Math.min(20,need),exhausted=state.scanOffset>=state.scanPool.length;
  app.innerHTML=shell(`<section class="panel"><div class="progress-head"><div><div class="label">今日筛词</div><h2>只看英文，诚实判断</h2></div><b>${state.queue.length} 个生词</b></div>${progressBar(done/need*100)}<p class="muted">${state.retryNames.length?`昨日检测错词 ${state.retryNames.length} 个已自动加入学新；`:""}点击“认识”后会显示中文。若发现记错，再点一次即可加入学新。</p>
  <div class="scan-list">${state.scan.map((x,i)=>`<div class="word-row ${x.status?"checked":""}"><div><span>${x.w}</span>${x.status==="known"?`<small class="inline-cn">${x.cn}</small>`:""}</div><div class="know-actions">${x.status==="unknown"?'<span class="tag-no">待学习</span>':`<button class="small no" data-no="${i}">不认识</button><button class="small yes ${x.status==="known"?"confirmed":""}" data-yes="${i}">${x.status==="known"?"记错了？加入学新":"认识"}</button>`}</div></div>`).join("")}</div>
  <button class="primary" id="learn" ${!(exhausted||earlyReady)||!state.queue.length?"disabled":""}>${exhausted?`词库已筛完，学习 ${state.queue.length} 个生词`:earlyReady?`已筛出 ${state.queue.length} 个，直接开始学习`:`继续筛选，目标 ${state.queue.length}/${need}`}</button></section>`,true);bindHome();
  document.querySelectorAll("[data-no]").forEach(b=>b.onclick=()=>judge(+b.dataset.no,false));
  document.querySelectorAll("[data-yes]").forEach(b=>b.onclick=()=>judge(+b.dataset.yes,state.scan[+b.dataset.yes].status==="known"?false:true));
  document.querySelector("#learn").onclick=()=>{state.idx=0;resetStudyTracking();state.screen="study";render()};
}
function judge(i,known){
  let x=state.scan[i];x.status=known?"known":"unknown";state.queue=state.queue.filter(q=>q.w!==x.w);if(known)markCompleted(x);else{unmarkCompleted(x);state.queue.push(x)}save();
  if(state.queue.length>=learningTarget()){state.idx=0;resetStudyTracking();state.screen="study";render();return}
  if(state.scan.every(w=>w.status)&&state.scanOffset<state.scanPool.length)appendScanBatch();
  checkpoint();scan();
}
function chunks(x){return x.s.map(s=>`<span>${s}</span>`).join('<em>·</em>')}
function cleanDetail(text){return text.replace(/^[配近延变记辨注反]\s*/,"").trim()}
function detailPairs(text){
  const body=cleanDetail(text),pairs=[],re=/([A-Za-z][A-Za-z0-9 .&'’…/-]*?)([\u4e00-\u9fff][^A-Za-z]*)(?=[A-Za-z]|$)/g;
  let m;while((m=re.exec(body))){let en=m[1].trim(),cn=m[2].trim().replace(/[；;，,]+$/,""),pos=(en.match(/\b(?:adj|adv|n|v|prep|conj|pron|num|det|modal)\./g)||[]).join(" ");en=en.replace(/\b(?:adj|adv|n|v|prep|conj|pron|num|det|modal)\./g,"").replace(/\s*&\s*/g," ").trim();if(en&&cn)pairs.push({en,cn,pos})}
  return pairs.length?pairs:[{en:body,cn:text.startsWith("变")?"时态变化":"词汇拓展"}];
}
const antonymGroups=[["up","down"],["good","bad"],["old","young"],["old","new"],["more","less"],["many","few"],["much","little"],["high","low"],["long","short"],["big","small"],["easy","difficult"],["hard","soft"],["hard","easy"],["hot","cold"],["fast","slow"],["early","late"],["right","wrong"],["light","heavy"],["strong","weak"],["open","closed"],["inside","outside"],["above","below"],["before","after"],["buy","sell"],["come","go"],["give","take"],["remember","forget"],["same","different"],["possible","impossible"],["happy","sad"],["beautiful","ugly"],["kind","cruel"],["boy","girl"],["man","woman"],["father","mother"],["brother","sister"],["he","she"],["him","her"],["here","there"],["this","that"],["these","those"],["always","never"],["all","none"],["in","out"],["on","off"]];
function isAntonymPair(a,b){a=a.toLowerCase();b=b.toLowerCase().trim();if(!/^[a-z'-]+$/.test(b))return false;return antonymGroups.some(group=>group.includes(a)&&group.includes(b))}
function markedPart(text,mark){
  const start=text.match(new RegExp(`(?:^|\\s)${mark}\\s+(.+)$`))?.[1]||"";
  return start.split(/[；;]/)[0].split(/\s+(?=[配近反延变记辨注]\s)/)[0].trim();
}
function transformationValue(text){
  const body=cleanDetail(text).split(/\s+(?=[配近反延记辨注]\s)/)[0].split(/[；;]/)[0].trim();
  const value=body.replace(/^(?:时态变化|比较\/最高级|比较级\/最高级|比较级|复数)\s*/,"").trim();
  return value.match(/^[A-Za-z()]+(?:\/[A-Za-z()]+){1,4}/)?.[0]||value;
}
function expectedPlural(word){
  const w=word.toLowerCase(),special={man:"men",woman:"women",child:"children",person:"people",tooth:"teeth",foot:"feet",mouse:"mice",goose:"geese"};
  if(special[w])return special[w];if(/[^aeiou]y$/.test(w))return w.slice(0,-1)+"ies";if(/(?:s|x|z|ch|sh|o)$/.test(w))return w+"es";if(/fe$/.test(w))return w.slice(0,-2)+"ves";if(/f$/.test(w))return w.slice(0,-1)+"ves";return w+"s";
}
function splitFormRemainder(x,text){
  let body=text.replace(/^【[^】]+】\s*/,"").replace(/－/g,"-").trim(),forms=[...(x.aliases||[]),expectedPlural(x.w)].sort((a,b)=>b.length-a.length);
  let form=forms.find(f=>body.toLowerCase().startsWith(f.toLowerCase()));
  if(!form)form=(body.match(/^[A-Za-z-]+(?:\/[A-Za-z-]+)*/)||[""])[0];
  if(body.slice(form.length).startsWith("/")){const alt=body.slice(form.length).match(/^\/[A-Za-z-]+/)?.[0]||"";form+=alt}
  return {form,remainder:body.slice(form.length).trim()};
}
function learningCards(x){
  const cards=[];
  (x.details||[]).forEach(d=>{
    const mark=d.trim()[0];
    if(mark==="配")detailPairs(d).forEach(p=>{const wordForm=!/\s/.test(p.en)&&Boolean(p.pos);cards.push({type:wordForm?"词形变化":"固定搭配",cn:`${p.pos||""} ${p.cn}`.trim(),en:p.en,kind:wordForm?"wordform":"phrase"})});
    else if(mark==="近"||mark==="反"){
      const relationText=markedPart(d,mark)||cleanDetail(d);
      detailPairs(`${mark} ${relationText}`).forEach(p=>{const antonym=mark==="反"||isAntonymPair(x.w,p.en);cards.push({type:antonym?"反义词":"近义词",cn:`${p.pos||""} ${p.cn}`.trim(),en:p.en,kind:antonym?"antonym":"synonym"})});
    }
    else if(mark==="延")detailPairs(d).forEach(p=>cards.push({type:"延伸",cn:`${p.pos||""} ${p.cn}`.trim(),en:p.en,kind:"extend"}));
    else if(mark==="变"){
      const degree=/比较|最高级/.test(d),plural=/复数/.test(d)&&!/过去|分词|时态|单三/.test(d),corresponding=/对应词/.test(d);
      if(plural||degree||corresponding){
        const split=plural?splitFormRemainder(x,cleanDetail(d)):{form:transformationValue(d),remainder:""};
        const type=degree?"比较级":plural?"复数形式":"对应词",kind=degree?"degree":plural?"plural":"corresponding";
        cards.push({type,cn:type,en:split.form,kind});
        if(split.remainder)detailPairs(`配 ${split.remainder}`).forEach(p=>cards.push({type:"固定搭配",cn:p.cn,en:p.en,kind:"phrase"}));
      }else{
        const pairs=detailPairs(d);
        pairs.forEach((p,i)=>{
          const isPhrase=i>0&&(/\s/.test(p.en)||p.en.toLowerCase().includes(x.w.toLowerCase()));
          const verb=/过去|分词|现在分词|单三|时态/.test(p.cn+d);
          cards.push({type:isPhrase?"固定搭配":verb?"动词变形":"词形变化",cn:isPhrase?p.cn:`${p.pos||""} ${p.cn}`.trim(),en:p.en,kind:isPhrase?"phrase":verb?"verbform":"wordform"});
        });
      }
      const opposite=markedPart(d,"反");
      if(opposite)detailPairs(`反 ${opposite}`).forEach(p=>cards.push({type:"反义词",cn:`${p.pos||""} ${p.cn}`.trim(),en:p.en,kind:"antonym"}));
    }
  });
  return cards.slice(0,12);
}
function noteDetails(x){return (x.details||[]).filter(d=>/^[记辨注]/.test(d.trim()))}
function flipCardsHtml(x){return learningCards(x).map((c,i)=>`<div class="mini-card" data-card="${i}"><div class="mini-inner"><div class="mini-face mini-front"><span class="card-badge ${c.kind}">${c.type}</span><strong>${c.cn}</strong><small>点击查看英文</small></div><div class="mini-face mini-back"><span class="card-badge ${c.kind}">${c.type}</span><strong>${c.en}</strong><small>点击返回中文</small></div></div></div>`).join("")}
function studyReady(x){return state.meaningViewed&&state.viewedCards.length>=learningCards(x).length}
function resetStudyTracking(){state.reveal=false;state.flip=false;state.noteReveal=false;state.meaningViewed=false;state.noteViewed=false;state.viewedCards=[]}
function remainingStudyText(x){
  const left=[];
  if(!state.meaningViewed)left.push("中文释义");
  const cardsLeft=learningCards(x).length-state.viewedCards.length;if(cardsLeft>0)left.push(`${cardsLeft} 张卡片`);
  return left.length?`还需查看：${left.join("、")}`:"✓ 已查看全部内容，可以进行判断";
}
const audioCache=new Map(),audioRequests=new Map(),preparedAudio=new Map();
let activeAudio=null;
function stopActiveAudio(){
  if(activeAudio){try{activeAudio.pause();activeAudio.currentTime=0}catch{}activeAudio=null}
}
function prepareAudio(word,url){
  if(!url)return null;
  let audio=preparedAudio.get(word);
  if(!audio||audio.src!==url){audio=new Audio(url);audio.preload="auto";preparedAudio.set(word,audio);try{audio.load()}catch{}}
  return audio;
}
async function warmAudio(word){
  if(audioCache.has(word))return audioCache.get(word);
  if(audioRequests.has(word))return audioRequests.get(word);
  const request=(async()=>{
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),2200);
    try{
      const r=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,{signal:controller.signal});
      const data=await r.json();let url=data?.[0]?.phonetics?.find(p=>p.audio)?.audio||"";
      if(url.startsWith("//"))url=`https:${url}`;
      audioCache.set(word,url);if(url)prepareAudio(word,url);return url;
    }catch{audioCache.set(word,"");return ""}
    finally{clearTimeout(timer);audioRequests.delete(word)}
  })();
  audioRequests.set(word,request);return request;
}
function playPreparedAudio(word,url){
  return new Promise(resolve=>{
    const audio=prepareAudio(word,url);if(!audio){resolve(false);return}
    stopActiveAudio();activeAudio=audio;let settled=false;
    const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);if(activeAudio===audio)activeAudio=null;resolve(ok)};
    const timer=setTimeout(()=>{try{audio.pause()}catch{}finish(false)},5000);
    audio.onended=()=>finish(true);audio.onerror=()=>finish(false);
    try{audio.currentTime=0;const started=audio.play();if(started?.catch)started.catch(()=>finish(false))}catch{finish(false)}
  });
}
function pronounce(word,button){
  button.classList.add("playing");
  state.followToken++;stopActiveAudio();if(window.speechSynthesis)window.speechSynthesis.cancel();
  const done=()=>button?.classList.remove("playing"),url=audioCache.get(word)||"";
  if(url){playPreparedAudio(word,url).then(ok=>{if(!ok)return speechOnce(word,"en-US",.9);return true}).finally(done)}
  else{speechOnce(word,"en-US",.9).finally(done);warmAudio(word)}
}
function speechOnce(text,lang,rate=1){
  return new Promise(resolve=>{
    if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){resolve(false);return}
    let settled=false;const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);resolve(ok)};
    const utter=new SpeechSynthesisUtterance(text),timer=setTimeout(()=>finish(false),5000);utter.lang=lang;utter.rate=rate;utter.volume=1;utter.onend=()=>finish(true);utter.onerror=()=>finish(false);speechSynthesis.speak(utter);
  });
}
async function playFollowReading(x,prompt){
  const token=++state.followToken;if(prompt)prompt.classList.add("show");
  stopActiveAudio();if(window.speechSynthesis)window.speechSynthesis.cancel();
  const url=audioCache.get(x.w)||"";if(!url)warmAudio(x.w);
  for(let i=0;i<3&&token===state.followToken;i++){
    const played=url?await playPreparedAudio(x.w,url):false;
    if(!played&&token===state.followToken)await speechOnce(x.w,"en-US",.9);
  }
  if(token===state.followToken)await speechOnce(shortCn(x),"zh-CN",1);
}
async function playReviewReading(x){
  const token=++state.followToken;
  stopActiveAudio();if(window.speechSynthesis)window.speechSynthesis.cancel();
  const url=audioCache.get(x.w)||"";if(!url)warmAudio(x.w);
  const played=url?await playPreparedAudio(x.w,url):false;
  if(!played&&token===state.followToken)await speechOnce(x.w,"en-US",.9);
  if(token===state.followToken)await speechOnce(shortCn(x),"zh-CN",1);
}

function study(){
  if(state.idx>=state.queue.length){state.testIdx=0;state.testScore=0;state.testFeedback="";state.testFeedbackType="";state.testCorrectAnswer="";state.testExplanation="";state.testMistakes=[];state.reinforceIdx=0;state.screen="test";render();return}
  const x=state.queue[state.idx],ready=studyReady(x);
  app.innerHTML=shell(`<section class="panel study"><img class="study-mascot" src="assets/earth-peek.png" alt=""><div class="study-meta"><span>📌 今日学新 ${state.idx+1} / ${state.queue.length}</span><span>${x.lib}词 ☆</span></div>${progressBar((state.idx+1)/state.queue.length*100)}
  <div class="word-card" id="word"><div class="word-audio-line"><div class="chunks">${chunks(x)}</div><button class="speaker" id="speaker" aria-label="播放 ${x.w} 发音">🔊</button></div>${x.phonetic?`<div class="phonetic">/${x.phonetic}/</div>`:""}${state.reveal?`<div class="meaning meaning-audio" id="meaningAudio">${x.cn}<small class="repeat-prompt" id="repeatPrompt">大声跟读</small></div>${noteDetails(x).length?`<button class="note-toggle" id="notes">${state.noteReveal?"收起巧记与辨析":"查看巧记与辨析"}</button>${state.noteReveal?`<div class="study-notes">${noteDetails(x).map(n=>`<p><b>${n.trim()[0]==="记"?"巧记":n.trim()[0]==="辨"?"辨析":"用法"}</b>${cleanDetail(n)}</p>`).join("")}</div>`:""}`:""}`:""}<div class="hint">${state.reveal?"点击中文释义，英文3遍＋中文1遍":"点击单词，查看中文释义"}</div></div>
  <div class="knowledge-grid">${flipCardsHtml(x)}</div>
  <div class="unlock-status ${ready?"ready":""}" id="unlockStatus">${remainingStudyText(x)}</div><div class="next"><button class="primary ghost" id="again" ${ready?"":"disabled"}>还不熟</button><button class="primary" id="next" ${ready?"":"disabled"}>记住了，下一词</button></div></section>`,true);bindHome();
  document.querySelector("#word").onclick=()=>{const opening=!state.reveal;state.reveal=!state.reveal;if(state.reveal)state.meaningViewed=true;state.noteReveal=false;study();if(opening)playFollowReading(x,document.querySelector("#repeatPrompt"))};document.querySelector("#speaker").onclick=e=>{e.stopPropagation();pronounce(x.w,e.currentTarget)};let meaningAudio=document.querySelector("#meaningAudio");if(meaningAudio)meaningAudio.onclick=e=>{e.stopPropagation();playFollowReading(x,document.querySelector("#repeatPrompt"))};let notes=document.querySelector("#notes");if(notes)notes.onclick=e=>{e.stopPropagation();state.noteReveal=!state.noteReveal;if(state.noteReveal)state.noteViewed=true;study()};document.querySelectorAll("[data-card]").forEach(c=>c.onclick=()=>{c.classList.toggle("flipped");let i=+c.dataset.card;if(!state.viewedCards.includes(i))state.viewedCards.push(i);let unlocked=studyReady(x);document.querySelector("#again").disabled=!unlocked;document.querySelector("#next").disabled=!unlocked;let status=document.querySelector("#unlockStatus");status.textContent=remainingStudyText(x);status.classList.toggle("ready",unlocked)});warmAudio(x.w);if(state.queue[state.idx+1])warmAudio(state.queue[state.idx+1].w);
  document.querySelector("#again").onclick=document.querySelector("#next").onclick=()=>{state.idx++;resetStudyTracking();render()};
}
function wordPos(x){const text=x.rawMeaning||x.cn||"";if(/^情态动词/.test(text))return "modal";return (text.match(/^(?:adj|adv|prep|conj|pron|num|v|n|modal|det)(?:\.\s*&?\s*(?:adj|adv|prep|conj|pron|num|v|n|modal|det)\.)?/i)||[""])[0].toLowerCase()}
function semanticTags(x){
  const text=x.cn,groups={
    time:"时间今天明天将来未来以前后来直到早晚年龄历史",
    person:"人妈妈祖母兄弟医生学生老师某人自己",
    place:"地方房间国家环境道路空气学校",
    action:"学习研究带来种植生长保护选择离开打电话希望相信感谢理解命令",
    quality:"困难容易有趣健康传统可能规则强壮抱歉",
    quantity:"数字五四两个都更少一些任何",
    travel:"旅行汽车道路飞机穿过",
    nature:"环境空气植物水果春天健康",
    culture:"文化历史古典传统技术",
    feeling:"相信希望有趣抱歉成功感谢",
    object:"东西衣服课文汽车房间水果"
  };
  return Object.entries(groups).filter(([,chars])=>[...chars].some(c=>text.includes(c))).map(([tag])=>tag);
}
function commonEnding(a,b){for(const end of ["tion","ment","ness","ful","less","ing","ly","al","ive","ous","er"]){if(a.endsWith(end)&&b.endsWith(end))return true}return false}
function editDistance(a,b){
  const row=[...Array(b.length+1).keys()];
  for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}
  return row[b.length];
}
function visualScore(a,b){
  a=a.toLowerCase();b=b.toLowerCase();let prefix=0,suffix=0,bigrams=0;
  while(prefix<Math.min(a.length,b.length)&&a[prefix]===b[prefix])prefix++;
  while(suffix<Math.min(a.length,b.length)&&a[a.length-1-suffix]===b[b.length-1-suffix])suffix++;
  const grams=new Set([...Array(Math.max(0,a.length-1))].map((_,i)=>a.slice(i,i+2)));for(let i=0;i<b.length-1;i++)if(grams.has(b.slice(i,i+2)))bigrams++;
  return prefix*14+suffix*9+bigrams*6-editDistance(a,b)*5-Math.abs(a.length-b.length)*2;
}
function distractors(x){
  const xPos=wordPos(x),mainPos=xPos.split(/[.&\s]+/).find(Boolean)||"",related=(x.details||[]).join(" ").toLowerCase(),seen=new Set();
  const ranked=Object.values(banks).flat().filter(y=>{
    if(y.w===x.w||seen.has(y.w.toLowerCase()))return false;seen.add(y.w.toLowerCase());
    if(x.w.toLowerCase()!=="i"&&y.w.toLowerCase()==="i")return false;
    if(x.w.length>2&&y.w.length<2)return false;
    const yp=wordPos(y),ym=yp.split(/[.&\s]+/).find(Boolean)||"";
    return mainPos&&ym===mainPos;
  }).map(y=>{
    let score=visualScore(x.w,y.w);
    if(commonEnding(x.w.toLowerCase(),y.w.toLowerCase()))score+=22;
    if(related.includes(y.w.toLowerCase()))score+=18;
    return {w:y.w,score};
  }).sort((a,b)=>b.score-a.score||a.w.localeCompare(b.w));
  if(ranked.length<3){
    for(const y of Object.values(banks).flat()){
      if(y.w===x.w||seen.has(y.w.toLowerCase())||y.w.toLowerCase()==="i")continue;
      const yp=wordPos(y);if(mainPos&&yp.includes(mainPos)){ranked.push({w:y.w,score:visualScore(x.w,y.w)});seen.add(y.w.toLowerCase())}
    }
    ranked.sort((a,b)=>b.score-a.score);
  }
  return ranked.slice(0,3).map(y=>y.w);
}
function blankLearnedForm(text,word,aliases=[]){
  for(const form of [word,...aliases]){
    const lower=text.toLowerCase(),target=form.toLowerCase(),at=lower.indexOf(target);
    if(at>=0&&!/[A-Za-z]/.test(text[at-1]||"")&&!/[A-Za-z]/.test(text[at+form.length]||""))return {text:text.slice(0,at)+"______"+text.slice(at+form.length),answer:text.slice(at,at+form.length)};
  }
  const stem=word.toLowerCase().replace(/e$/,"").replace(/y$/,"");
  const token=(text.match(/[A-Za-z]+(?:[-'][A-Za-z]+)*/g)||[]).find(t=>stem.length>=3&&t.toLowerCase().startsWith(stem));
  return token?{text:text.replace(token,"______"),answer:token}:null;
}
function testQuestion(x){
  if(x.exampleEn){
    const blank=blankLearnedForm(x.exampleEn,x.w,x.aliases);
    if(blank)return {...blank,cn:x.exampleCn||x.cn,kind:"例句挖空"};
  }
  const phrases=learningCards(x).filter(c=>c.kind==="phrase");
  for(const phrase of phrases){
    const blank=blankLearnedForm(phrase.en,x.w,x.aliases);
    if(blank)return {...blank,cn:phrase.cn,kind:"固定搭配挖空"};
  }
  if(phrases.length){
    const phrase=phrases[0],token=(phrase.en.match(/[A-Za-z]+(?:[-'][A-Za-z]+)*/)||[])[0];
    if(token)return {text:phrase.en.replace(token,"______"),answer:token,cn:phrase.cn,kind:"固定搭配挖空"};
  }
  return {text:`Please remember the vocabulary item "______".`,answer:x.w,cn:x.cn,kind:"词义检测"};
}
function clozeSentence(x){return testQuestion(x).text}
function test(){
  if(state.testIdx>=state.queue.length){finalizeNewLearning();return state.testMistakes.length?reinforceIntro():complete()}
  const x=state.queue[state.testIdx],question=testQuestion(x),raw=[...new Set([question.answer,...distractors(x).filter(w=>w.toLowerCase()!==question.answer.toLowerCase())])].slice(0,4),shift=state.testIdx%raw.length,opts=[...raw.slice(shift),...raw.slice(0,shift)];
  app.innerHTML=shell(`<section class="panel quiz"><div class="study-meta"><span>学习检测 ${state.testIdx+1} / ${state.queue.length}</span><span>${question.kind}</span></div>${progressBar((state.testIdx+1)/state.queue.length*100)}<div class="quiz-body"><div class="label">选择最合适的英文单词补全内容</div><h2 class="cloze-sentence">${question.text}</h2><p class="sentence-cn">${question.cn}</p><div class="options word-options">${opts.map(o=>`<button class="${state.testCorrectAnswer&&o===state.testCorrectAnswer?"correct-flash":""}" data-answer="${o===question.answer}">${o}</button>`).join("")}</div><div class="feedback ${state.testFeedbackType}">${state.testFeedback}</div>${state.testExplanation?`<div class="answer-explanation">${state.testExplanation}</div>`:""}</div></section>`,true);bindHome();
  document.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{if(state.testCorrectAnswer)return;grade(b.dataset.answer==="true",x,question)});
}
function scheduleRetry(word){
  profile.relearn=profile.relearn||[];
  const due=addDate(studyDate(),1);
  if(!profile.relearn.some(r=>r.w===word&&r.due===due))profile.relearn.push({w:word,due});
  profile.dailyStats=profile.dailyStats||{};
  const tomorrow=profile.dailyStats[due]||{new:0,review:0};
  if(!tomorrow.new)tomorrow.planNew=profile.daily+retryWordsFor(due).length;
  profile.dailyStats[due]=tomorrow;
  save();
}
function grade(ok,x,question){if(ok)state.testScore++;else{scheduleRetry(x.w);if(!state.testMistakes.some(v=>v.w===x.w))state.testMistakes.push(x)}state.testFeedbackType=ok?"correct":"wrong";state.testCorrectAnswer=ok?"":question.answer;state.testExplanation=ok?"":`解析：本题考查 ${x.w}，意思是“${shortCn(x)}”。结合中文释义和句子空格，应选择 ${question.answer}。`;state.testFeedback=ok?"✓ 回答正确":`✗ 回答错误，正确答案是：${question.answer}`;setTimeout(()=>{state.testIdx++;state.testFeedback="";state.testFeedbackType="";state.testCorrectAnswer="";state.testExplanation="";checkpoint();test()},ok?650:3000);test()}
function shortCn(x){return (x.cn||"").replace(/^(?:adj|adv|prep|conj|pron|num|v|n|modal|det)\.\s*/i,"").split(/[；;]/)[0].trim()}
async function speakMemory(x,count=0){
  const url=audioCache.get(x.w)||"";let played=false;if(!url)warmAudio(x.w);
  if(url){
    played=await playPreparedAudio(x.w,url);
  }
  if(!played)await speechOnce(x.w,"en-US",1.05);
  if(count===0||count===1)await speechOnce(shortCn(x),"zh-CN",1.25);
}
function reinforceIntro(){
  state.screen="reinforce";
  app.innerHTML=shell(`<section class="panel reinforce-intro"><div class="memory-kicker">检测完成 · ${state.testMistakes.length} 个词需要加强</div><h2>再加强一次记忆吧！</h2><p class="muted">点击第一张错词卡，开启 15 秒强化记忆。</p><div class="mistake-grid">${state.testMistakes.map((x,i)=>`<button class="mistake-card ${i===state.reinforceIdx?"current":i<state.reinforceIdx?"done":""}" data-reinforce="${i}" ${i!==state.reinforceIdx?"disabled":""}><b>${x.w}</b><span>${shortCn(x)}</span>${i<state.reinforceIdx?"<em>✓ 已强化</em>":""}</button>`).join("")}</div></section>`,true);bindHome();
  const card=document.querySelector(`[data-reinforce="${state.reinforceIdx}"]`);if(card)card.onclick=()=>startReinforceWord();
  checkpoint();
}
function memoryFlash(x,count){
  const stage=document.querySelector("#memoryStage");if(!stage)return;
  const flash=document.createElement("div"),slot=state.memoryLayout[count-1];flash.className=`memory-flash ${x.w.length>10?"long-word":""}`;flash.style.setProperty("--x",`${slot.x}%`);flash.style.setProperty("--y",`${slot.y}%`);flash.style.setProperty("--size",slot.size);flash.style.setProperty("--rotate",`${slot.rotate}deg`);
  flash.innerHTML=`<b>${x.w}</b><span>${shortCn(x)}</span>`;stage.appendChild(flash);
  const fill=document.querySelector("#brainFill"),number=document.querySelector("#brainCount");if(fill)fill.style.width=`${count/15*100}%`;if(number)number.textContent=`${count}/15`;
  speakMemory(x,count);
}
function createMemoryLayout(){
  const spots=[
    {x:9,y:28},{x:34,y:24},{x:61,y:29},{x:87,y:25},
    {x:18,y:43},{x:45,y:47},{x:72,y:42},{x:93,y:48},
    {x:8,y:60},{x:32,y:64},{x:59,y:58},{x:84,y:63},
    {x:18,y:79},{x:51,y:75},{x:83,y:80}
  ],sizes=[.72,1.08,.86,1.2,.78,1.12,.9,1.02,.7,1.17,.82,1.06,.76,1.14,.88];
  for(let i=spots.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[spots[i],spots[j]]=[spots[j],spots[i]]}
  return spots.map((p,i)=>({...p,size:sizes[i],rotate:-8+Math.round(Math.random()*16)}));
}
function stopMemoryPlayback(){
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  stopActiveAudio();
  if(state.memoryAudio){try{state.memoryAudio.pause();state.memoryAudio.currentTime=0}catch{}}
}
function startReinforceWord(){
  clearInterval(state.reinforceTimer);state.reinforceCount=0;state.reinforceReady=false;state.memoryLayout=createMemoryLayout();
  const x=state.testMistakes[state.reinforceIdx];state.screen="reinforceWord";
  app.innerHTML=`<main class="memory-stage" id="memoryStage"><button class="memory-home" id="memoryHome">← 返回首页</button><button class="logout memory-logout" id="logout">退出登录</button><div class="brain-progress"><div><b>单词正在进入你的脑袋</b><span id="brainCount">0/15</span></div><i><em id="brainFill"></em></i></div><div class="memory-anchor"><small>第 ${state.reinforceIdx+1} / ${state.testMistakes.length} 个错词</small><b>${x.w}</b><span>${shortCn(x)}</span></div><button class="memory-next" id="memoryNext" disabled>强化中，请坚持 15 秒</button></main>`;
  const tick=()=>{state.reinforceCount++;memoryFlash(x,state.reinforceCount);if(state.reinforceCount>=15){clearInterval(state.reinforceTimer);state.reinforceReady=true;const b=document.querySelector("#memoryNext");if(b){b.disabled=false;b.textContent=state.reinforceIdx<state.testMistakes.length-1?"记住了，强化下一个":"完成强化"}}};
  speakMemory(x,0);
  state.reinforceTimer=setInterval(tick,1000);
  bindLogout();
  document.querySelector("#memoryHome").onclick=()=>{
    if(document.querySelector("#memoryConfirm"))return;
    const dialog=document.createElement("div");dialog.className="memory-confirm";dialog.id="memoryConfirm";dialog.innerHTML=`<div><h3>再坚持一下</h3><p>单词正在进入你的脑子！确定现在返回首页吗？</p><div><button id="keepMemory">继续坚持</button><button class="leave" id="leaveMemory">坚持返回</button></div></div>`;document.body.appendChild(dialog);
    document.querySelector("#keepMemory").onclick=()=>dialog.remove();
    document.querySelector("#leaveMemory").onclick=()=>{clearInterval(state.reinforceTimer);stopMemoryPlayback();state.reinforceTimer=null;state.reinforceReady=false;checkpoint();dialog.remove();state.screen="home";render()};
  };
  const nextButton=document.querySelector("#memoryNext");
  const goNextMemory=e=>{e.preventDefault();if(!state.reinforceReady)return;stopMemoryPlayback();state.reinforceIdx++;if(state.reinforceIdx<state.testMistakes.length)startReinforceWord();else complete()};
  nextButton.onclick=goNextMemory;
}
function complete(){
  finalizeNewLearning();profile.activeSession=null;save();
  const cheers=["今天的坚持，正在悄悄变成明天的底气。","背完啦，去喝口水吧，进步也需要轻松一下。","小小的一页翻过去，大大的进步留下来。","今天又向前走了一步，慢慢来反而比较快。","把今天认真过完，明天的你会谢谢现在的自己。"],cheer=cheers[parseDate(studyDate()).getDate()%cheers.length];
  app.innerHTML=shell(`<section class="panel finish finish-celebration"><div class="calendar-tear-stage"><div class="calendar-under"><span>明天继续</span><b>保持好奇，保持前进</b></div><div class="calendar-sheet"><div class="tear-holes"></div><small>中考词汇备考系统 · 今日打卡</small><h2>${dateLabel(studyDate())}</h2><p>${cheer}</p><div class="tear-line">✂　✂　✂</div></div></div><div class="finish-result"><div class="emoji">🌱</div><h2>今日任务完成</h2><p>学新 <b>${state.queue.length}</b> 词，检测答对 <b>${state.testScore}/${state.queue.length}</b>。</p><p class="muted">这一页已经认真完成，明天继续稳稳向前。</p><button class="primary" id="done">查看今日学习记录</button></div></section>`);
  document.querySelector("#done").onclick=()=>{state.screen="home";render()};
}
function render(){if(profile&&resumableScreens.includes(state.screen))checkpoint();({login,onboard,home,settings,review,todayReview,scan,study,test,reinforce:reinforceIntro,reinforceWord:reinforceIntro}[state.screen]||home)();bindLogout()}
async function boot(){
  if(!loginCode){state.screen="login";render();return}
  if(DISABLED_LOGIN_CODES.has(loginCode)){loginCode="";profile=null;localStorage.removeItem(SESSION_KEY);state.screen="login";render();return}
  try{
    if(cloudEnabled){await cloudCall("login",loginCode);const remote=await cloudCall("get",loginCode);profile=remote.profile||load(loginCode)}
    else{if(!validLoginCode(loginCode))throw new Error("登录码无效");profile=load(loginCode)}
    if(profile){localStorage.setItem(profileKey(loginCode),JSON.stringify(profile));state.grade=profile.grade||"初一";state.daily=profile.daily||20;state.selected=profile.selected||["高频"];state.screen="home";restoreCheckpoint()}else state.screen="onboard";
  }catch{loginCode="";profile=null;localStorage.removeItem(SESSION_KEY);state.screen="login"}
  render();
}
boot();
