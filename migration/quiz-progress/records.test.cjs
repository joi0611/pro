'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const { JSDOM, VirtualConsole } = require(process.env.QUIZ_JSDOM || 'jsdom');
const { fixture } = require(process.env.QUIZ_FIXTURE || '../unified-admin/fixture.cjs');
const root = path.resolve(__dirname, '../..');
test('bounded history fits existing cloud limit and revised questions restart course progress', () => {
  const vm = require('node:vm'), bank = { window: {} }; vm.createContext(bank);
  vm.runInContext(fs.readFileSync(path.join(root, 'eazycloze/quiz-300.js'), 'utf8'), bank);
  let snapshot = { done: { old: true } };
  const c = { document: { addEventListener() {} }, Date, Math, JSON,
    loadStore: () => JSON.parse(JSON.stringify(snapshot)), saveStore: s => { snapshot = JSON.parse(JSON.stringify(s)); },
    getLessonQuiz: (ch, idx) => bank.window.QUIZ300[ch + '#' + idx], getErrors: () => snapshot.errors || [], updateNavBadge() {} };
  vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(root, 'eazycloze/quiz-progress.js'), 'utf8'), c);
  for (let round = 0; round < 31; round++) for (const key of Object.keys(bank.window.QUIZ300)) {
    const [ch, idx] = key.split('#'); c.quizState = c.newQuizState(ch, Number(idx)); c.saveQuizSubmission();
  }
  const records = Object.values(snapshot.quizCourses);
  assert.ok(records.reduce((n, r) => n + r.history.length, 0) <= 100);
  assert.ok(records.every(r => r.lastFull && r.history.length <= 30));
  assert.ok(Buffer.byteLength(JSON.stringify(snapshot)) < 262144, 'snapshot fits current server size limit');
  const [key] = Object.keys(bank.window.QUIZ300), [ch, idx] = key.split('#');
  bank.window.QUIZ300[key].qs[0].stem += ' revised';
  c.quizState = c.restoreQuizState(ch, Number(idx)); assert.equal(c.quizState.submitted, false);
  c.saveQuizDraft(); assert.equal(snapshot.quizCourses[key].lastFull, undefined);
  assert.equal(snapshot.done.old, true);
});
async function until(check) { for (let i = 0; i < 150; i++) { if (check()) return; await new Promise(r => setTimeout(r, 50)); } throw Error('Timed out waiting for quiz state'); }
async function client(f, identity, type = 'phone', saved = {}) {
  const virtualConsole = new VirtualConsole(), errors = [];
  virtualConsole.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'eazycloze/index.html'), 'utf8'), { url: f.origin + '/eazycloze/', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole });
  const w = dom.window, transport = f.transport();
  w.scrollTo = () => {}; w.print = () => {}; w.confirm = () => false;
  w.AbortController = AbortController; w.fetch = (url, options = {}) => transport(url, { ...options, headers: { ...options.headers, Origin: f.origin } });
  for (const [k, v] of Object.entries(saved)) w.localStorage.setItem(k, v);
  for (const script of Array.from(w.document.querySelectorAll('script[src]'))) { const inline = w.document.createElement('script'); inline.textContent = fs.readFileSync(path.join(root, 'eazycloze', script.getAttribute('src').split('?')[0]), 'utf8'); w.document.body.appendChild(inline); }
  await until(() => w.document.readyState === 'complete');
  if (!saved.wbx_activation_v1) {
    if (type === 'phone') w.document.getElementById('gatePhoneTab').click();
    w.document.getElementById(type === 'phone' ? 'gatePhone' : 'gateCode').value = identity;
    w.document.getElementById('gateBtn').click();
  }
  try { await until(() => w.APP_INITIALIZED && !w.document.body.classList.contains('gate-locked')); }
  catch (e) { console.error('LOGIN', w.document.getElementById('gateMsg').textContent, errors); dom.window.close(); throw e; }
  return { dom, w, errors };
}
function click(w, selector) { const b = w.document.querySelector(selector); assert.ok(b, selector); b.click(); }
function answer(w, q, correct) { const k = correct ? q.answer : q.options.find(o => o.k !== q.answer).k; click(w, '#quizBox [data-qno="' + q.no + '"][data-k="' + k + '"]'); }
function dump(w) { return Object.fromEntries(Object.keys(w.localStorage).map(k => [k, w.localStorage.getItem(k)])); }
test('phone/code records, drafts, submissions, notebook correction and cloud reload', async t => {
  const f = await fixture({ webRoot: root }), clients = [];
  t.after(async () => { clients.forEach(c => c.dom.window.close()); await f.close(); });
  const open = async (...args) => { const c = await client(f, ...args); clients.push(c); return c; };
  const a = await open('13800000001'), w = a.w;
  // Preserve unrelated, pre-existing student data in the same snapshot.
  w.markDone('retained-old-lesson');
  w.showView('quiz'); w.startQuiz('ch1', 0);
  const qs = Array.from(w.activeQuizQuestions()); assert.ok(qs.length > 1);
  answer(w, qs[0], false);
  assert.equal(w.quizCourseRecord('ch1', 0).draft.answers[qs[0].no], w.quizState.answers[qs[0].no]);
  await until(() => f.national.readProgress({ kind: 'phone', identity: '13800000001' }).progress.quizCourses);
  const b = await open('13800000001', 'phone', dump(w));
  b.w.showView('quiz'); b.w.startQuiz('ch1', 0);
  assert.equal(b.w.quizState.answers[qs[0].no], w.quizState.answers[qs[0].no]);
  assert.equal(b.w.quizState.submitted, false);
  qs.slice(1).forEach(q => answer(b.w, q, true));
  click(b.w, '#quizBox [data-qz="submit"]');
  const record = b.w.quizCourseRecord('ch1', 0);
  assert.equal(record.lastFull.right, qs.length - 1);
  assert.equal(record.history.length, 1);
  assert.equal(b.w.quizErrors('ch1', 0).length, 1);
  assert.equal(b.w.saveQuizSubmission(), false, 'duplicate submission ignored');
  assert.equal(b.w.quizCourseRecord('ch1', 0).history.length, 1);
  b.w.showQuizHome(); assert.match(b.w.document.getElementById('quizHome').textContent, /已完成.*最近正确率/);
  b.w.showView('notebook'); assert.match(b.w.document.getElementById('notebookList').textContent, /知识点同步练习/);
  click(b.w, '.quiz-retry'); assert.equal(b.w.activeQuizQuestions().length, 1);
  answer(b.w, qs[0], true); click(b.w, '#quizBox [data-qz="submit"]');
  assert.equal(b.w.quizErrors('ch1', 0).length, 0);
  assert.equal(b.w.quizCourseRecord('ch1', 0).lastFull.right, qs.length - 1, 'review must not replace whole-course score');
  assert.equal(b.w.getErrors().find(e => e.kind === 'quiz').resolved, true);
  b.w.showView('progress'); assert.match(b.w.document.getElementById('progressDashboard').textContent, /错题重练/);
  try { await until(() => f.national.readProgress({ kind: 'phone', identity: '13800000001' }).progress.quizCourses?.['ch1#0']?.history?.length === 2); } catch(e) { console.error('SYNC',b.w.document.getElementById('nationalSyncStatus')?.textContent, f.national.readProgress({kind:'phone',identity:'13800000001'}).revision,JSON.stringify(b.w.loadStore()).length); throw e; }
  const c = await open('13800000001'); // Empty browser storage = another device.
  c.w.startQuiz('ch1', 0);
  assert.equal(c.w.quizState.submitted, true);
  assert.equal(c.w.quizCourseRecord('ch1', 0).history.length, 2);
  assert.equal(c.w.getDone()['retained-old-lesson'], true);
  const code = await open('TESTCODE01', 'code');
  assert.equal(code.w.quizCourseRecord('ch1', 0).history, undefined, 'separate accounts cannot see phone records');
  code.w.showView('quiz'); code.w.startQuiz('ch1', 0);
  // Explicitly confirmed blanks count as errors; first click only warns.
  click(code.w, '#quizBox [data-qz="submit"]'); assert.equal(code.w.quizState.submitted, false);
  click(code.w, '#quizBox [data-qz="submit"]'); assert.equal(code.w.quizErrors('ch1', 0).length, qs.length);
  assert.equal(code.w.quizCourseRecord('ch1', 0).lastFull.accuracy, 0);
  try { await until(() => f.national.readProgress({ kind: 'code', identity: f.national.hashCode('TESTCODE01') }).progress.quizCourses); } catch(e) { console.error('CODE SYNC',code.w.ACTIVE_LOGIN_CODE,code.w.document.getElementById('nationalSyncStatus')?.textContent,f.national.readProgress({kind:'code',identity:f.national.hashCode('TESTCODE01')}));throw e; }
  const codeReload = await open('TESTCODE01', 'code');
  assert.equal(codeReload.w.quizCourseRecord('ch1', 0).lastFull.accuracy, 0);
  assert.equal(codeReload.w.quizErrors('ch1', 0).length, qs.length);
  assert.ok(clients.every(c => c.errors.length === 0), JSON.stringify(clients.map(c => c.errors)));
});
