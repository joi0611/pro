'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { fixture } = require('./fixture.cjs');
const { createClient } = require('../../admin/api.js');
test('one login covers five specialties; a fresh client always requires password despite existing service cookies', async () => {
  const f = await fixture();
  try {
    const memory = new Map(), storage = { getItem: k => memory.get(k), setItem: (k, v) => memory.set(k, v), removeItem: k => memory.delete(k) };
    const transport = f.transport(), client = createClient({ fetch: transport, storage });
    assert.ok((await client.list()).every(x => !x.ok));
    assert.ok((await client.login('wrong-password')).every(x => !x.ok));
    assert.ok((await client.login(f.password)).every(x => x.ok));
    const rows = (await client.list()).flatMap(x => x.rows);
    assert.equal(rows.length, 6); assert.equal(rows.filter(x => x.kind === 'code').length, 1);
    assert.equal(new Set(rows.map(x => x.specialty)).size, 5);
    assert.ok(!rows.some(x => x.phone === '13800000009'), 'stale legacy national records must be excluded');
    const start = f.requests.length;
    const fresh = createClient({ fetch: transport, storage });
    assert.ok((await fresh.list()).every(x => !x.ok));
    assert.equal(f.requests.length, start, 'fresh visits must not request protected account lists');
    await assert.rejects(fresh.authorize({ phone: '13800000099', specialty: 'national_cloze' }), /请先/);
    await assert.rejects(fresh.saveCode({ code: 'UNLOGGED01' }), /请先/);
    await assert.rejects(fresh.update(rows[0], { enabled: false }), /请先/);
    assert.equal(f.requests.length, start, 'no unauthenticated client mutation may be sent');
    assert.ok((await fresh.login('wrong-password')).every(x => !x.ok));
    const afterWrongLogin = f.requests.length;
    assert.ok((await fresh.list()).every(x => !x.ok));
    assert.equal(f.requests.length, afterWrongLogin, 'wrong password must not fall back to valid old cookies');
    assert.ok((await client.logout()).every(x => x.ok));
    assert.equal(memory.size, 0); assert.ok((await client.list()).every(x => !x.ok));
  } finally { await f.close(); }
});
test('server APIs reject anonymous reads and mutations independently of the dashboard', async () => {
  const f = await fixture();
  try {
    const post = (url, payload) => fetch(f.origin + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    assert.equal((await post('/national-api/admin/list', {})).status, 401);
    assert.equal((await post('/national-api/admin/update', { kind: 'invalid-security-probe' })).status, 401);
    for (const action of ['admin_list', 'admin_add', 'admin_update', 'admin_delete']) assert.equal((await post('/three-api/seven_choice/rpc', { action, payload: { phone: 'invalid', specialty: 'seven_choice' } })).status, 401);
    assert.equal(f.national.counts().phones, 1); assert.deepEqual(f.three.counts(), { gzcloze: 1, shcloze: 1, seven_choice: 1 });
  } finally { await f.close(); }
});
test('authorization, notes and suspension target the right database and specialty; progress stays intact', async () => {
  const f = await fixture();
  try {
    const client = createClient({ fetch: f.transport() }); await client.login(f.password);
    const before = () => [f.national.db.prepare('SELECT count(*) n FROM progress').get().n, f.three.db.prepare('SELECT count(*) n FROM progress').get().n];
    const initial = before();
    for (const specialty of ['national_cloze', 'gzcloze', 'shcloze', 'seven_choice', 'national_grammar']) await client.authorize({ phone: '13800000010', specialty, note: '统一开通' });
    const all = (await client.list()).flatMap(x => x.rows), fresh = all.filter(x => x.phone === '13800000010'); assert.equal(fresh.length, 5);
    for (const row of fresh) { await client.update(row, { note: '备注更新' }); await client.update({ ...row, note: '备注更新' }, { enabled: false }); }
    const disabled = (await client.list()).flatMap(x => x.rows).filter(x => x.phone === '13800000010');
    assert.ok(disabled.every(x => !x.enabled && x.note === '备注更新'));
    assert.ok((await client.list()).flatMap(x => x.rows).filter(x => x.phone !== '13800000010').every(x => x.enabled));
    assert.deepEqual(before(), initial);
    await assert.rejects(client.authorize({ phone: '13800000010', specialty: 'unknown' }));
    await assert.rejects(client.authorize({ phone: 'bad', specialty: 'national_cloze' }));
    assert.equal(f.legacyRows.find(x => x.specialty === 'national_cloze').phone, '13800000009');
  } finally { await f.close(); }
});
test('national code creation, disabling and resetting devices retain the code identity and progress', async () => {
  const f = await fixture();
  try {
    const client = createClient({ fetch: f.transport() }); await client.login(f.password);
    await client.saveCode({ code: 'newcode001', note: '新增登录码' });
    const row = (await client.list()).flatMap(x => x.rows).find(x => x.note === '新增登录码');
    const login = f.national.loginCode('NEWCODE001', 'test-device-123'); assert.ok(login.ok);
    f.national.saveProgress(f.national.session(login.token), { checkpoint: 'retain' }, 0);
    await client.update(row, { resetDevices: true });
    assert.equal(f.national.db.prepare('SELECT count(*) n FROM devices WHERE code_hash=?').get(row.hash).n, 0);
    await client.update(row, { enabled: false }); assert.equal(f.national.loginCode('NEWCODE001', 'test-device-123').ok, false);
    assert.equal(f.national.adminList().codes.filter(x => x.hash === row.hash).length, 1);
    assert.equal(JSON.parse(f.national.db.prepare('SELECT body FROM progress WHERE identity=?').get(row.hash).body).checkpoint, 'retain');
    await assert.rejects(client.saveCode({ code: 'short' }));
  } finally { await f.close(); }
});
test('unavailable grammar service is reported separately and does not block the four migrated sites', async () => {
  const f = await fixture();
  try {
    f.setLegacyFailure(true); const client = createClient({ fetch: f.transport() });
    const login = await client.login(f.password); assert.equal(login.filter(x => x.ok).length, 2);
    const list = await client.list(); assert.equal(list.filter(x => x.ok).length, 2); assert.equal(list.find(x => x.group === 'legacy').rows.length, 0);
    await client.authorize({ phone: '13800000012', specialty: 'gzcloze' }); assert.ok(f.three.enabled('gzcloze', '13800000012'));
  } finally { await f.close(); }
});
test('old admin entries redirect; student, data and national publish routes keep their existing destinations', async () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../../middleware.js'), 'utf8');
  const { middleware } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  const route = pathname => middleware({ request: { url: 'https://pro.yunmianas.cn' + pathname }, redirect: (url, code) => ({ redirect: url, code }), rewrite: url => ({ rewrite: url }), next: () => ({ next: true }) });
  for (const [old, id] of [['/national-admin', 'national_cloze'], ['/eazycloze/admin.html', 'national_cloze'], ['/7-5task/admin.html', 'seven_choice'], ['/7-5task/admin-supabase.html', 'national_grammar'], ['/shcloze/admin.html', 'shcloze'], ['/gzcloze/admin.html', 'gzcloze']]) assert.deepEqual(route(old), { redirect: '/admin/?specialty=' + id, code: 302 });
  for (const pathname of ['/three-api/seven_choice/rpc', '/national-api/admin/list', '/eazycloze/app.js?v=123']) assert.equal(route(pathname).rewrite, 'https://national-origin.yunmianas.cn' + pathname);
  assert.deepEqual(route('/gzcloze/'), { next: true }); assert.deepEqual(route('/admin/api.js'), { next: true });
});
