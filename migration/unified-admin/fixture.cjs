'use strict';
// Isolated in-memory services used by integration and browser checks only.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const bcryptPath = path.resolve(__dirname, '../national-cloze/runtime/node_modules/bcryptjs');
process.env.THREE_BCRYPT_PATH = bcryptPath;
const bcrypt = require(bcryptPath);
const { Store: NationalStore } = require('../national-cloze/runtime/store.cjs');
const { Store: ThreeStore } = require('../three-site/runtime/store.cjs');
const { createApp: nationalApp } = require('../national-cloze/runtime/server.cjs');
const { createApp: threeApp } = require('../three-site/runtime/server.cjs');
const password = 'integration-only-password';
async function fixture({ webRoot } = {}) {
  const national = new NationalStore(':memory:'), three = new ThreeStore(':memory:');
  const hash = bcrypt.hashSync(password, 4), now = '2026-11-15T00:00:00.000Z';
  national.setSetting('admin_hash', hash); national.setSetting('salt', 'test-salt'); national.setSetting('source_checksum', 'test');
  national.adminUpdate({ kind: 'phone', phone: '13800000001', note: '全国测试学员', enabled: true });
  national.adminUpdate({ kind: 'code', code: 'TESTCODE01', note: '测试登录码', enabled: true });
  three.importSnapshot({ format: 'three-site-export-v1', source_project: 'gbjmylxohacppnybfssh', exported_at: now,
    training_admin_config: [{ password_hash: hash }], training_phone_users: ['gzcloze', 'shcloze', 'seven_choice'].map(specialty => ({ specialty, phone: '13800000002', note: '专项测试学员', enabled: true, created_at: now, updated_at: now })) }, 'test');
  const legacyRows = [{ specialty: 'national_grammar', phone: '13800000003', enabled: true, note: '语法测试学员', createdAt: now },
    { specialty: 'national_cloze', phone: '13800000009', enabled: true, note: '旧库记录不得显示或写入' }];
  let token = '', legacyFailure = false;
  const nationalServer = nationalApp({ store: national, secureCookies: false });
  const threeServer = threeApp({ store: three, secureCookies: false });
  const { middleware } = await import('data:text/javascript;base64,' + fs.readFileSync(path.resolve(__dirname, '../../middleware.js')).toString('base64'));
  const root = path.resolve(webRoot || path.join(__dirname, '../..'));
  const requests = [];
  const server = http.createServer(async (req, res) => {
    requests.push({ path: req.url, method: req.method });
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname.startsWith('/national-api/') || pathname === '/healthz') return nationalServer.emit('request', req, res);
    if (pathname.startsWith('/three-api/')) return threeServer.emit('request', req, res);
    if (pathname === '/training-backend/rest/v1/rpc/training_api') {
      const chunks = []; for await (const c of req) chunks.push(c);
      const body = JSON.parse(Buffer.concat(chunks)), p = body.p_payload;
      const json = data => { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); };
      if (legacyFailure) { res.writeHead(503, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ message: '测试服务暂不可用' })); }
      if (p.specialty !== 'national_grammar') { res.writeHead(403); return res.end('{}'); }
      if (body.p_action === 'admin_login') { if (p.password !== password) return json({ ok: false, code: 401, msg: '管理员密码错误' }); token = 'legacy-test-token'; return json({ ok: true, token }); }
      if (!token || p.token !== token) return json({ ok: false, code: 401, msg: '请先登录' });
      if (body.p_action === 'admin_logout') { token = ''; return json({ ok: true }); }
      if (body.p_action === 'admin_list') return json({ ok: true, users: legacyRows });
      if (body.p_action === 'admin_add') {
        let row = legacyRows.find(x => x.phone === p.phone && x.specialty === p.specialty);
        if (!row) { row = { phone: p.phone, specialty: p.specialty }; legacyRows.push(row); }
        Object.assign(row, { note: p.note || '', enabled: true }); return json({ ok: true });
      }
      if (body.p_action === 'admin_update') { const row = legacyRows.find(x => x.phone === p.phone && x.specialty === p.specialty); if (!row) return json({ ok: false, msg: '不存在' }); Object.assign(row, { note: p.note, enabled: p.enabled }); return json({ ok: true }); }
      return json({ ok: false, msg: 'Unsupported' });
    }
    const handled = middleware({ request: { url: 'http://localhost' + req.url },
      redirect: (url, status) => { res.writeHead(status, { Location: url }); res.end(); return true; }, rewrite: () => false, next: () => false });
    if (handled) return;
    const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(404); return res.end(); }
    try { const data = fs.readFileSync(file); res.writeHead(200, { 'Content-Type': ({ '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css' })[path.extname(file)] || 'application/octet-stream' }); res.end(data); }
    catch (_) { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  function transport() {
    const jar = new Map();
    return async (url, options = {}) => {
      const cookies = [...jar].filter(([k]) => !k.startsWith('ts_') || url.startsWith('/three-api/')).map(([k, v]) => k + '=' + v).join('; ');
      const r = await fetch(origin + url, { ...options, headers: { ...options.headers, Cookie: cookies } });
      for (const entry of r.headers.getSetCookie()) { const [k, v] = entry.split(';')[0].split('='); v ? jar.set(k, v) : jar.delete(k); }
      return r;
    };
  }
  return { national, three, legacyRows, requests, origin, transport, password,
    setLegacyFailure: value => { legacyFailure = value; },
    close: async () => { await new Promise(resolve => server.close(resolve)); national.close(); three.close(); }
  };
}
module.exports = { fixture };
