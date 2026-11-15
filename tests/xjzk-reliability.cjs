'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const network = require('../build-network.cjs');
const origin = 'https://pro.yunmianas.cn';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function transport(statuses, route, options = {}) {
  let calls = 0;
  const window = { fetch: async () => new Response('{}', { status: statuses[Math.min(calls++, statuses.length - 1)] }) };
  const context = vm.createContext({ window, location: { origin, href: origin + '/xjzk/' }, URL, Headers,
    AbortController, Promise, Date, Math, JSON, Object, Error, clearTimeout,
    setTimeout: (fn, ms) => setTimeout(fn, ms >= 20000 ? ms : 0) });
  vm.runInContext('(' + network.sharedTrainingConnection.toString() + ')()', context);
  let result;
  try { result = await window.fetch(origin + '/training-backend/' + route, { method: 'POST', body: '{}', ...options }); }
  catch (error) { result = error; }
  return { calls, status: result.status };
}

async function sessionTests() {
  const source = await fs.readFile(path.join(root, 'xjzk/teacher/index.html'), 'utf8');
  const functions = source.slice(source.indexOf('let refreshPromise='), source.indexOf('let currentRole='));
  let refreshes = 0, requests = 0, cleared = 0;
  const context = vm.createContext({ Date, Error, JSON,
    SUPABASE: { url: origin, anonKey: 'public' },
    authSession: { access_token: 'old', refresh_token: 'refresh', expires_at: 1 }, accessToken: 'old',
    saveAuthSession(value) { if (!value) cleared++; context.authSession = value; context.accessToken = value?.access_token || ''; },
    fetch: async url => {
      if (url.includes('/token')) { refreshes++; await sleep(10); return Response.json({ access_token: 'new', refresh_token: 'next', expires_at: Date.now() / 1000 + 3600 }); }
      requests++; return Response.json({ ok: true });
    }
  });
  vm.runInContext(functions, context);
  await Promise.all([context.supabase('/rest/v1/rpc/current_staff_role'), context.supabase('/rest/v1/rpc/owner_query_login_usage')]);
  assert.equal(refreshes, 1, 'parallel expired requests must share one refresh');
  assert.equal(requests, 2);
  context.authSession.expires_at = 1;
  context.fetch = async () => Response.json({ message: 'temporary' }, { status: 503 });
  await assert.rejects(context.supabase('/rest/v1/rpc/current_staff_role'));
  assert.equal(cleared, 0, 'a temporary refresh failure must retain the session');
}

async function fixture() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'xjzk-test-'));
  await fs.cp(path.join(root, 'xjzk'), path.join(dir, 'xjzk'), { recursive: true });
  const alias = 'zaytun/training/grammar/official-exams-2026.js';
  await fs.mkdir(path.dirname(path.join(dir, alias)), { recursive: true });
  await fs.copyFile(path.join(root, alias), path.join(dir, alias));
  await network(dir);
  return dir;
}

class LocalResources extends ResourceLoader {
  constructor(dir) { super(); this.dir = dir; this.missing = []; }
  fetch(url) {
    const parsed = new URL(url);
    if (parsed.origin !== origin) return null;
    const file = path.join(this.dir, decodeURIComponent(parsed.pathname));
    return fs.readFile(file).catch(error => { this.missing.push(parsed.pathname); throw error; });
  }
}

async function page(dir, relative, storage = {}, cloud = new Map()) {
  const errors = [], calls = [], loader = new LocalResources(dir), console = new VirtualConsole();
  console.on('jsdomError', error => { if (!/navigation to another Document|Not implemented: navigation/.test(error.message)) errors.push(error.message); });
  const dom = new JSDOM(await fs.readFile(path.join(dir, 'xjzk', relative), 'utf8'), {
    url: origin + '/xjzk/' + relative, runScripts: 'dangerously', resources: loader, virtualConsole: console,
    pretendToBeVisual: true,
    beforeParse(window) {
      window.Headers = Headers; window.Response = Response; window.Request = Request;
      window.AbortController = AbortController; window.TextEncoder = TextEncoder; window.TextDecoder = TextDecoder;
      window.scrollTo = window.print = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {} });
      window.confirm = () => true; window.alert = () => {}; window.Audio = function () { this.play = () => Promise.resolve(); this.pause = () => {}; };
      for (const [key, value] of Object.entries(storage)) window.localStorage.setItem(key, value);
      window.fetch = async (input, options = {}) => {
        const url = new URL(String(input), window.location.href), body = JSON.parse(options.body || '{}');
        calls.push({ path: url.pathname, body });
        if (/verify_(?:phone_access|access_code)$/.test(url.pathname)) return Response.json([{ access_code_id: 'fixture-account', student_name: '验证同学', expires_at: '2030-01-01' }]);
        const identity = body.input_phone ? 'phone:' + body.input_phone : 'code:' + body.input_code;
        const prefix = body.input_system_type + ':' + identity + ':';
        if (/\/get_(?:phone_)?learning_progress$/.test(url.pathname)) return Response.json([...cloud].filter(([key]) => key.startsWith(prefix)).map(([, row]) => row));
        if (/\/save_(?:phone_)?learning_progress$/.test(url.pathname)) {
          cloud.set(prefix + body.input_lesson_id, { lesson_id: body.input_lesson_id, progress: body.input_progress });
          return Response.json([]);
        }
        if (url.pathname.endsWith('/current_staff_role')) return Response.json('owner');
        if (url.pathname.includes('/token')) return Response.json({ access_token: 'fixture-token', refresh_token: 'fixture-refresh', expires_at: Date.now() / 1000 + 3600 });
        return Response.json([]);
      };
    }
  });
  await new Promise(resolve => { if (dom.window.document.readyState === 'complete') resolve(); else dom.window.addEventListener('load', resolve, { once: true }); });
  await sleep(100);
  return { dom, errors, calls, loader };
}

async function pageTests(dir) {
  const cases = [
    ['cloze', '[data-login-mode="phone"]', '#loginPhone', '#phoneLoginBtn'],
    ['reading-comprehension', '[data-login-mode="phone"]', '#readingLoginPhone', '#readingLoginForm'],
    ['grammar', '[data-login-mode="phone"]', '#loginPhone', '#loginForm'],
    ['word-choice', '[data-login-mode="phone"]', '#loginPhone', '#loginForm'],
    ['reading-writing', '[data-login-mode="phone"]', '#loginPhone', '#loginForm'],
    ['vocabulary', '[data-mode="phone"]', '#loginInput', '#loginButton'],
    ['word-formation', '[data-wf-login-mode="phone"]', '#wfLoginPhone', '#wfLoginForm'],
    ['junior-grammar', '[data-jgr-mode="phone"]', '#jgr-phone', '.jgr-login-form'],
    ['writing', '[data-writing-mode="phone"]', '#writingLoginPhone', '#writingLoginForm']
  ];
  for (const [name, tab, input, submit] of cases) {
    const test = await page(dir, 'training/' + name + '/index.html');
    const w = test.dom.window, d = w.document;
    assert.deepEqual(test.errors, [], name + ' initial script errors');
    assert.ok(d.querySelector(tab), name + ' phone tab');
    d.querySelector(tab).click();
    d.querySelector(input).value = '13800000000';
    const button = d.querySelector(submit);
    if (button.tagName === 'FORM') button.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
    else button.click();
    await sleep(200);
    assert.ok(test.calls.some(call => call.path.endsWith('/verify_phone_access')), name + ' must verify phone authorization');
    assert.deepEqual(test.errors, [], name + ' login script errors');
    assert.deepEqual(test.loader.missing, [], name + ' missing local dependencies');
    console.log('PASS page + phone login: ' + name);
    w.close();
  }
  const teacher = await page(dir, 'teacher/index.html');
  assert.equal(teacher.dom.window.document.querySelector('#systemFilter').options.length, 10);
  assert.deepEqual(teacher.errors, []);
  teacher.dom.window.close();
}

async function writingIsolation(dir) {
  const cloud = new Map();
  const keys = { writing_login_mode_20261013: 'phone', writing_phone_login_20261013: '13800000001', writing_login_ok_20261012: 'true',
    'wx26_progress_v1_guest': JSON.stringify({ 1: { done: true } }),
    'wx26_progress_v2_phone:13800000001': JSON.stringify({ 2: { done: true } }) };
  const { dom, errors } = await page(dir, 'training/writing/index.html', keys, cloud);
  const w = dom.window;
  assert.equal(w.eval('Boolean(P[1] && P[1].done)'), false, 'unattributed guest work must not move to a phone account');
  assert.equal(w.eval('P[2].done'), true);
  w.eval('saveP()');
  await w.eval('writingSync.flush()');
  assert.equal(cloud.size, 1, 'writing progress must be saved through the phone RPC');
  w.WritingProgressReady('phone', '13800000002');
  await sleep(30);
  assert.equal(w.eval('Boolean(P[2] && P[2].done)'), false, 'a different phone must not inherit the first account progress');
  assert.deepEqual(errors, []);
  w.close();
  const otherDevice = await page(dir, 'training/writing/index.html', {
    writing_login_mode_20261013: 'phone', writing_phone_login_20261013: '13800000001', writing_login_ok_20261012: 'true'
  }, cloud);
  assert.equal(otherDevice.dom.window.eval('P[2].done'), true, 'a fresh device must restore saved writing work');
  otherDevice.dom.window.close();
}

async function wordChoiceSync(dir) {
  const cloud = new Map();
  const keys = { word_choice_login_mode_20261011: 'phone', word_choice_phone_20261011: '13800000001', word_choice_supabase_login_ok_20260709: 'true' };
  const first = await page(dir, 'training/word-choice/index.html', keys, cloud);
  first.dom.window.eval("wordChoiceDoneArticles.fixture={completedAt:new Date().toISOString(),right:10,total:10};writeWordChoiceCompletions()");
  await first.dom.window.eval('wcSync.flush()');
  assert.equal(cloud.size, 1);
  first.dom.window.close();
  const second = await page(dir, 'training/word-choice/index.html', keys, cloud);
  assert.equal(second.dom.window.eval('wordChoiceDoneArticles.fixture.right'), 10, 'a fresh device must restore word-choice completion');
  second.dom.window.localStorage.setItem('word_choice_phone_20261011', '13800000002');
  second.dom.window.eval('startWordChoiceProgress()');
  await sleep(30);
  assert.equal(second.dom.window.eval('wordChoiceDoneArticles.fixture'), undefined, 'word-choice accounts must remain isolated');
  assert.deepEqual(second.errors, []);
  second.dom.window.close();
}

async function staticAudit(dir) {
  let pages = 0;
  const missing = new Set();
  async function walk(folder) {
    for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) { await walk(file); continue; }
      if (entry.name.endsWith('.js')) { new vm.Script(await fs.readFile(file, 'utf8'), { filename: file }); continue; }
      if (!entry.name.endsWith('.html')) continue;
      pages++;
      const relative = path.relative(dir, file).split(path.sep).join('/');
      const dom = new JSDOM(await fs.readFile(file, 'utf8'), { url: origin + '/' + relative, virtualConsole: new VirtualConsole() });
      for (const element of dom.window.document.querySelectorAll('script,link[href],img[src],a[href],iframe[src]')) {
        if (element.tagName === 'SCRIPT' && !element.src && !/json/i.test(element.type)) new vm.Script(element.textContent, { filename: relative });
        const attr = element.getAttribute('src') || element.getAttribute('href');
        if (!attr || attr.startsWith('#') || /\$\{|^(?:data|javascript|mailto):/.test(attr)) continue;
        const url = new URL(attr, dom.window.location.href);
        if (url.origin !== origin || !/^\/(?:xjzk|shared)\//.test(url.pathname)) continue;
        const target = path.join(dir, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
        try { await fs.access(target); } catch (_) { missing.add(url.pathname); }
      }
      dom.window.close();
    }
  }
  await walk(path.join(dir, 'xjzk'));
  assert.deepEqual([...missing], [], 'internal links and static dependencies must resolve');
  console.log('PASS syntax, links and dependencies: ' + pages + ' pages');
}

async function failedSaveRecovery(dir) {
  const dom = new JSDOM('<body></body>', { url: origin, runScripts: 'outside-only' });
  const w = dom.window;
  w.eval(await fs.readFile(path.join(dir, 'xjzk/assets/progress-sync.js'), 'utf8'));
  let local = { updatedAt: 10, data: { completed: true } }, offline = true, saves = [];
  const sync = w.TrainingProgressSync.create({
    systemType: 'writing', lessonId: 'writing_profile_v1',
    read: () => JSON.parse(JSON.stringify(local)),
    apply: snapshot => { local = snapshot; },
    merge: (remote, copy) => !remote || copy.updatedAt >= remote.updatedAt ? copy : remote,
    rpc: async (method, payload) => {
      if (method.startsWith('get_')) return [];
      if (offline) throw new Error('network unavailable');
      saves.push(JSON.parse(JSON.stringify(payload))); return [];
    }
  });
  await sync.start('phone', '13800000001');
  await sync.flush();
  assert.equal(local.data.completed, true, 'failed saves must retain local work');
  assert.equal(saves.length, 0);
  offline = false;
  await sync.flush();
  assert.equal(saves.length, 1, 'retry must save the retained snapshot');
  assert.equal(saves[0].input_phone, '13800000001');
  sync.changed(); sync.stop();
  local = { updatedAt: 20, data: { anotherAccount: true } };
  w.dispatchEvent(new w.Event('online'));
  await sleep(750);
  assert.equal(saves.length, 1, 'stopped account must not submit another account snapshot');
  w.close();
  console.log('PASS failed-save recovery and account-switch cancellation');
}

(async () => {
  assert.deepEqual(await transport([500, 500, 200], 'rest/v1/rpc/verify_phone_access'), { calls: 3, status: 200 });
  assert.deepEqual(await transport([401, 200], 'rest/v1/rpc/current_staff_role'), { calls: 1, status: 401 });
  assert.deepEqual(await transport([500, 200], 'rest/v1/rpc/save_phone_learning_progress'), { calls: 1, status: 500 });
  assert.deepEqual(await transport([503, 200], 'functions/v1/vocab-progress', { body: '{"action":"get"}' }), { calls: 2, status: 200 });
  await sessionTests();
  console.log('PASS transport and teacher session recovery');
  const dir = await fixture();
  await staticAudit(dir);
  await pageTests(dir);
  await writingIsolation(dir);
  await wordChoiceSync(dir);
  await failedSaveRecovery(dir);
  console.log('PASS writing account isolation and legacy protection');
  console.log('PASS word-choice cloud save, restore and account isolation');
  console.log('ALL CHECKS PASSED');
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
