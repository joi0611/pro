// 语法填空训练系统 - 逐篇合规校验
// 载入 index.html 实际引用的脚本（顺序一致），在 vm 沙箱中重建题库，再逐篇比对规则。
const fs = require('fs');
const vm = require('vm');
const DIR = 'D:/新疆中考生无限进步/training/grammar/';

// ---- 沙箱（仅满足加载期所需，不触发运行时渲染）----
const sandbox = {};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.console = console;
sandbox.Set = Set; sandbox.Array = Array; sandbox.Object = Object;
sandbox.String = String; sandbox.RegExp = RegExp; sandbox.JSON = JSON;
sandbox.URLSearchParams = URLSearchParams;
sandbox.localStorage = { _d:{}, getItem(k){return this._d[k]??null;}, setItem(k,v){this._d[k]=v;}, removeItem(k){delete this._d[k];} };
sandbox.document = { readyState:'loading', addEventListener(){}, getElementById(){return null;},
  body:{ classList:{ add(){}, remove(){}, toggle(){} } }, querySelectorAll(){return [];} };
sandbox.history = { replaceState(){} };
sandbox.location = { search:'' };
sandbox.fetch = () => Promise.reject(new Error('no network'));
sandbox.setTimeout = setTimeout;
sandbox.addEventListener = () => {};
vm.createContext(sandbox);

// index.html 真实加载顺序（urumqi-2026.js 不在其中）
const FILES = ['word-transform-tasks.js','app.js','extra-articles.js','official-exams-2021-2023.js','official-exams-2024-2025.js'];
for (const f of FILES) {
  const src = fs.readFileSync(DIR + f, 'utf8');
  vm.runInContext(src, sandbox, { filename: f });
}

const bank = sandbox.window.examArticleBank || {};
const transform = sandbox.window.transformTasks || [];

// ---- 规则常量 ----
const VALID_POS = new Set(['名词','动词','形容词与副词','数词','代词','介词','连词']);
const VALID_NOPROMPT = new Set(['冠词','介词','连词','代词','副词']);
const VALID_ROUTE = new Set(['谓语','非谓语']);
const VALID_PKIND = new Set(['时态','语态','时态+语态','情态动词','主谓一致']);
const VALID_NONPRED = new Set(['to do','doing','done']);

function stripHtml(paraText){
  return paraText
    .replace(/\[\[clue:\d+:[^\]]+\]\]/g,'')
    .replace(/\[\[\d+\]\]/g,'');
}
function norm(v){ return String(v||'').trim().toLowerCase(); }
function answerInOptions(q){
  return (q.answers||[]).every(a => (q.options||[]).some(o => norm(o)===norm(a)));
}
function clueInParagraph(clue, text){
  // 线索按 "/" 分段，每段（>=2字符）逐字出现在原文即视为满足
  const norm = s => s.replace(/\s+/g,' ').trim();
  const t = norm(text);
  const segs = String(clue||'').split('/').map(s=>norm(s)).filter(s=>s.length>=2);
  if(!segs.length) return { ok:true, missing:[] };
  const missing = segs.filter(s => !t.includes(s));
  return { ok: missing.length===0, missing };
}
function isFiniteVerb(ans){
  const a = norm(ans);
  if(/^(to\s+\w+|doing|done)/.test(a)) return false;
  return true;
}
function isNonPredicateForm(ans){
  const a = norm(ans);
  return /^(to\s+\w+|doing|done)/.test(a) || /(ing|ed)$/.test(a);
}

// ---- 逐篇校验 ----
const report = [];
for (const [key, art] of Object.entries(bank)) {
  const issues = [];
  const w = []; // 警告
  // 文章级字段
  for (const fld of ['serial','practiceTitle','source','group','startNo','questions','paragraphs']) {
    if (art[fld] === undefined || art[fld] === null || art[fld] === '') issues.push('缺少文章字段: '+fld);
  }
  if (!Array.isArray(art.questions) || art.questions.length===0) issues.push('questions 为空或非数组');
  if (!Array.isArray(art.paragraphs) || art.paragraphs.length===0) issues.push('paragraphs 为空或非数组');
  const rawText = (art.paragraphs||[]).join(' ');
  const text = (art.paragraphs||[]).map(stripHtml).join(' ').replace(/\s+/g,' ');

  // 题号连续性 & 标记匹配（从原始段落抽取 [[n]] 标记）
  const qs = art.questions||[];
  const nos = qs.map(q=>q.no);
  const startNo = art.startNo;
  const sorted = [...nos].sort((a,b)=>a-b);
  let prev = (startNo??sorted[0]) - 1;
  for (const n of sorted) {
    if (n !== prev+1) { issues.push(`题号不连续：期望 ${prev+1}，实际 ${n}`); break; }
    prev = n;
  }
  const dupNo = nos.filter((n,i)=>nos.indexOf(n)!==i);
  if (dupNo.length) issues.push('题号重复: '+dupNo.join(','));
  const markerSet = new Set((rawText.match(/\[\[(\d+)\]\]/g)||[]).map(m=>Number(m.replace(/\D/g,''))));
  const noSet = new Set(nos);
  for (const n of nos) if(!markerSet.has(n)) issues.push(`题 ${n} 在原文无 [[${n}]] 空格标记`);
  for (const m of markerSet) if(!noSet.has(m)) issues.push(`原文 [[${m}]] 无对应题目`);

  // 单题校验
  qs.forEach((q, i) => {
    const tag = `题${q.no}`;
    if (!q.answers || !q.answers.length) issues.push(`${tag}: 无 answers`);
    if (!q.options || !q.options.length) issues.push(`${tag}: 无 options`);
    else if (!answerInOptions(q)) issues.push(`${tag}: 答案 ${q.answers} 不在 options 中`);
    if (!q.clue || !String(q.clue).trim()) issues.push(`${tag}: clue 为空`);
    else { const c = clueInParagraph(q.clue, text); if(!c.ok) issues.push(`${tag}: clue「${q.clue}」中未在原文逐字找到: ${c.missing.join(' | ')}`); }
    if (!q.explain || !String(q.explain).trim()) issues.push(`${tag}: explain 为空`);

    const hasPrompt = !!q.hasPrompt;
    const promptEmpty = !q.prompt || !String(q.prompt).trim();
    if (hasPrompt && promptEmpty) issues.push(`${tag}: hasPrompt=true 但 prompt 为空`);
    if (!hasPrompt && !promptEmpty) issues.push(`${tag}: hasPrompt=false 但 prompt 非空「${q.prompt}」`);
    if (hasPrompt && !/^\(.+\)$/.test(String(q.prompt||'').trim())) w.push(`${tag}: prompt「${q.prompt}」未用括号包裹`);

    if (hasPrompt) {
      if (q.pos && !VALID_POS.has(q.pos)) w.push(`${tag}: pos「${q.pos}」不在已知集合`);
      if (q.verbFlow) {
        const vf = q.verbFlow;
        if (!VALID_ROUTE.has(vf.route)) issues.push(`${tag}: verbFlow.route「${vf.route}」非法`);
        if (!['有','没有'].includes(vf.hasChangedVerb)) issues.push(`${tag}: verbFlow.hasChangedVerb「${vf.hasChangedVerb}」非法`);
        if (vf.route==='谓语') {
          if (!vf.predicateKind || typeof vf.predicateKind!=='string') issues.push(`${tag}: 谓语 predicateKind 为空`);
          else if (!VALID_PKIND.has(vf.predicateKind)) w.push(`${tag}: 谓语 predicateKind「${vf.predicateKind}」非标准值`);
          // 谓语答案不应是纯非谓语形式(to do/doing/done)，但进行时/被动语态的 doing/done 合法
          const struct = (vf.structure||'');
          const bad = (q.answers||[]).filter(a=>{
            const na = norm(a);
            if(/^to\s+\w+$/i.test(na)) return true;            // 不定式作谓语明显错误
            if(/^(doing|done)$/i.test(na) && !/进行|被动/.test(struct)) return true; // 进行时/被动的 doing/done 合法
            return false;
          });
          if (bad.length) issues.push(`${tag}: route=谓语 但答案含非谓语形式 ${bad}`);
        } else if (vf.route==='非谓语') {
          const ok = vf.nonPredicateFocus || vf.structure;
          if (!ok) issues.push(`${tag}: 非谓语 缺 nonPredicateFocus/structure`);
          if (q.answers && q.answers.some(a=>!isNonPredicateForm(a))) w.push(`${tag}: route=非谓语 但答案「${q.answers}」不像 to do/doing/done`);
        }
      }
    } else {
      if (q.noPromptType && !VALID_NOPROMPT.has(q.noPromptType)) issues.push(`${tag}: noPromptType「${q.noPromptType}」非法`);
    }
  });

  const status = issues.length ? 'FAIL' : (w.length ? 'WARN' : 'PASS');
  report.push({ key, serial: art.serial||'?', title: art.practiceTitle||art.title||key, group: art.group||'?',
    qcount: qs.length, status, issues, warns: w });
}

// ---- 词性转换题库校验 ----
let tFail=0, tWarn=0;
transform.forEach(t=>{
  if(!t.answer || !t.answer.length) tFail++;
  if(!t.sentence || !t.clue) tWarn++;
});

// ---- 输出 ----
console.log('=== 真题文章校验（共 '+report.length+' 篇，'+report.reduce((s,r)=>s+r.qcount,0)+' 题）===\n');
const order = report.sort((a,b)=> (a.group===b.group?0:0) || 0);
for (const r of report) {
  console.log(`[${r.status}] ${r.serial}｜${r.title}（${r.key}）组=${r.group} 题数=${r.qcount}`);
  r.issues.forEach(x=>console.log('    ✗ '+x));
  r.warns.forEach(x=>console.log('    ⚠ '+x));
}
console.log('\n=== 词性转换题库（'+transform.length+' 题）===');
console.log('  缺答案: '+tFail+'，缺 sentence/clue: '+tWarn);

const fail = report.filter(r=>r.status==='FAIL');
const warn = report.filter(r=>r.status==='WARN');
const pass = report.filter(r=>r.status==='PASS');
console.log('\n=== 汇总 ===');
console.log('PASS: '+pass.length+'  WARN: '+warn.length+'  FAIL: '+fail.length);
console.log('注：urumqi-2026.js 未被 index.html 引用，不计入运行期题库（与 app.js 内联篇主题重复，建议确认是否冗余）。');
