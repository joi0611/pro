const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { createStore } = require('./db.cjs');
const dir = path.join(__dirname, '.private');
fs.mkdirSync(dir, { recursive: true });
const credential = path.join(dir, 'admin.json');
if (!fs.existsSync(credential)) {
  const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64url');
  const salt = crypto.randomBytes(16).toString('hex');
  fs.writeFileSync(credential, JSON.stringify({ salt, hash: crypto.scryptSync(password, salt, 64).toString('hex') }));
  console.log('首次管理员密码（请保存）：' + password);
}
const secret = JSON.parse(fs.readFileSync(credential));
const failures = new Map();
function reply(res, status, data, headers = {}) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }); res.end(JSON.stringify(data)); }

(async () => {
  let store, mode, notice;
  try {
    ({ store, mode, notice } = await createStore());
  } catch (err) {
    console.error('× ' + err.message);
    console.error('  服务未启动。配置好后重新双击“启动训练系统.cmd”即可。');
    process.exit(1);
  }
  async function session(req) {
    const token = /(?:^|; )sc_session=([a-f0-9]+)/.exec(req.headers.cookie || '')?.[1];
    return token ? await store.getSession(token) : undefined;
  }
  async function authorized(user) {
    return !!user?.admin || !!(user && await store.findPhone(user.phone));
  }
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const user = await session(req);
      if (url.pathname.startsWith('/api/')) {
        if (req.method !== 'GET' && req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return reply(res, 403, { error: '请求来源无效' });
        let body = {};
        if (req.method !== 'GET') {
          let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > 8192) return reply(res, 413, { error: '内容过长' }); }
          try { body = JSON.parse(raw || '{}'); } catch { return reply(res, 400, { error: '请求格式有误' }); }
        }
        if (url.pathname === '/api/me') return reply(res, 200, { admin: !!user?.admin, phone: user?.phone || null, authorized: await authorized(user) });
        if (url.pathname === '/api/logout' && req.method === 'POST') {
          if (user) await store.deleteSession(user.token);
          return reply(res, 200, { ok: true }, { 'Set-Cookie': 'sc_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
        }
        if (url.pathname === '/api/login' && req.method === 'POST') {
          const ip = req.socket.remoteAddress; const attempt = failures.get(ip) || { count: 0, until: 0 };
          if (attempt.until > Date.now()) return reply(res, 429, { error: '尝试过多，请15分钟后再试' });
          const admin = body.role === 'admin'; const phone = String(body.phone || '').trim();
          const valid = admin ? (typeof body.password === 'string' && crypto.timingSafeEqual(crypto.scryptSync(body.password, secret.salt, 64), Buffer.from(secret.hash, 'hex'))) : (/^1[3-9]\d{9}$/.test(phone) && !!(await store.findPhone(phone)));
          if (!valid) { attempt.count++; if (attempt.count >= 10) attempt.until = Date.now() + 900000; failures.set(ip, attempt); return reply(res, 403, { error: admin ? '管理员密码错误' : '手机号格式有误或尚未授权，请联系老师' }); }
          failures.delete(ip); const token = crypto.randomBytes(32).toString('hex');
          await store.createSession(token, phone, admin, Date.now() + 7 * 86400000);
          return reply(res, 200, { ok: true }, { 'Set-Cookie': `sc_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800${req.socket.encrypted ? '; Secure' : ''}` });
        }
        if (url.pathname === '/api/phones') {
          if (!user?.admin) return reply(res, 403, { error: '请先登录管理后台' });
          if (req.method === 'GET') return reply(res, 200, { phones: await store.listPhones() });
          const phone = String(body.phone || '').trim();
          if (!/^1[3-9]\d{9}$/.test(phone)) return reply(res, 400, { error: '请输入有效的11位手机号' });
          if (req.method === 'POST') { await store.upsertPhone(phone, String(body.note || '').slice(0, 100), new Date().toISOString()); return reply(res, 200, { ok: true }); }
          if (req.method === 'DELETE') { await store.deletePhone(phone); await store.deleteSessionsByPhone(phone); return reply(res, 200, { ok: true }); }
        }
        return reply(res, 404, { error: '接口不存在' });
      }
      let file;
      const publicFiles = { '/login': 'login.html', '/login.html': 'login.html', '/admin': 'admin.html', '/admin.html': 'admin.html', '/access.js': 'access.js', '/access.css': 'access.css' };
      if (publicFiles[url.pathname]) file = path.join(__dirname, publicFiles[url.pathname]);
      else {
        if (!(await authorized(user))) { res.writeHead(302, { Location: '/login' }); return res.end(); }
        let name = decodeURIComponent(url.pathname).replace(/^\/training\/seven-choice\//, '/');
        if (/^\/assets\/(theme-purple\.css|workbook-modules\.css|favicon\.svg)$/.test(name)) file = path.join(__dirname, name);
        else if (name === '/' || name === '/index.html') file = path.join(__dirname, 'index.html');
        else if (/^\/[a-zA-Z0-9-]+\.(js|css)$/.test(name)) file = path.join(__dirname, name);
        else return reply(res, 404, { error: '页面不存在' });
      }
      const allowed = [path.resolve(__dirname), path.resolve(__dirname, 'assets')];
      if (!allowed.some(root => file.startsWith(root + path.sep)) || !fs.existsSync(file)) return reply(res, 404, { error: '文件不存在' });
      const type = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' }[path.extname(file)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); fs.createReadStream(file).pipe(res);
    } catch (err) { console.error(err.message); reply(res, 500, { error: '服务暂时不可用，请稍后重试' }); }
  });
  const port = Number(process.env.PORT || 8787);
  server.listen(port, process.env.HOST || '127.0.0.1', () => {
    console.log('训练系统：http://localhost:' + port + '；管理后台：/admin');
    console.log('数据存储：' + (mode === 'supabase' ? 'Supabase' : '本地 SQLite') + '（' + notice + '）');
  });
})();
