// EdgeOne Pages · Node.js 云函数
// 路由：cloud-functions/api/[[default]].js  →  https://你的域名/api/*
// 数据全部存 Supabase（phones / sessions 两张表），不依赖本地文件。
// 环境变量（在 Pages 控制台「环境变量」里配置）：
//   SUPABASE_URL          例如 https://xxxxxxxx.supabase.co
//   SUPABASE_SERVICE_KEY  service_role key（不要填 anon key）
//   ADMIN_PASSWORD        管理员密码（必须在平台环境变量中配置）
import crypto from 'node:crypto';

const enc = v => encodeURIComponent(String(v));
const failures = new Map(); // 简单的失败计数（按实例内存计，重启即清零）

function config(env) {
  const url = String(env?.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const key = String(env?.SUPABASE_SERVICE_KEY || env?.SUPABASE_KEY || '').trim();
  return { url, key };
}

async function rest(env, method, table, query, body, prefer) {
  const { url, key } = config(env);
  if (!url || !key) throw new Error('缺少 SUPABASE_URL / SUPABASE_SERVICE_KEY 环境变量');
  const headers = { apikey: key, Authorization: 'Bearer ' + key, Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (prefer) headers.Prefer = prefer;
  const res = await fetch(`${url}/rest/v1/${table}${query ? '?' + query : ''}`, {
    method, headers, body: body === undefined ? undefined : JSON.stringify(body)
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300);
    throw new Error(`Supabase ${method} ${table} 返回 ${res.status}：${detail || res.statusText}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

const store = {
  getSession: (env, token) => rest(env, 'GET', 'sessions', `select=*&token=eq.${enc(token)}&expires=gt.${Date.now()}&limit=1`).then(r => r[0]),
  createSession: async (env, token, phone, admin, expires) => {
    await rest(env, 'DELETE', 'sessions', `expires=lt.${Date.now()}`);
    await rest(env, 'POST', 'sessions', undefined, [{ token, phone: admin ? null : phone, admin: admin ? 1 : 0, expires }], 'return=minimal');
  },
  deleteSession: (env, token) => rest(env, 'DELETE', 'sessions', `token=eq.${enc(token)}`),
  deleteSessionsByPhone: (env, phone) => rest(env, 'DELETE', 'sessions', `phone=eq.${enc(phone)}`),
  listPhones: env => rest(env, 'GET', 'phones', 'select=phone,note,created&order=created.desc'),
  findPhone: (env, phone) => rest(env, 'GET', 'phones', `select=phone&phone=eq.${enc(phone)}&limit=1`).then(r => r[0]),
  upsertPhone: (env, phone, note, created) => rest(env, 'POST', 'phones', undefined, [{ phone, note, created }], 'resolution=merge-duplicates,return=minimal'),
  deletePhone: (env, phone) => rest(env, 'DELETE', 'phones', `phone=eq.${enc(phone)}`)
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }
  });
}

function adminHash(env) {
  if (env?.ADMIN_HASH) return Buffer.from(String(env.ADMIN_HASH), 'hex');
  const password = String(env?.ADMIN_PASSWORD || '');
  if (!password) throw new Error('缺少 ADMIN_PASSWORD 环境变量');
  const salt = String(env?.ADMIN_SALT || 'sc-admin-salt');
  return crypto.scryptSync(password, salt, 64);
}

function cookieToken(request) {
  const raw = request.headers.get('cookie') || '';
  return /(?:^|; )sc_session=([a-f0-9]+)/.exec(raw)?.[1];
}

export default async function onRequest(context) {
  const env = { ...process.env, ...(context?.env || {}) };
  const request = context.request;
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '');
    const token = cookieToken(request);
    const user = token ? await store.getSession(env, token) : undefined;
    const authorized = !!user?.admin || !!(user && await store.findPhone(env, user.phone));
    const isHttps = url.protocol === 'https:';
    const cookie = value => ({ 'Set-Cookie': `sc_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800${isHttps ? '; Secure' : ''}` });

    let body = {};
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const raw = await request.text();
      if (raw) { try { body = JSON.parse(raw); } catch { return json({ error: '请求格式有误' }, 400); } }
    }

    if (path === '/api/me') return json({ admin: !!user?.admin, phone: user?.phone || null, authorized });

    if (path === '/api/logout' && request.method === 'POST') {
      if (user) await store.deleteSession(env, user.token);
      return json({ ok: true }, 200, { 'Set-Cookie': 'sc_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
    }

    if (path === '/api/login' && request.method === 'POST') {
      const ip = context?.clientIp || request.headers.get('x-forwarded-for') || 'unknown';
      const attempt = failures.get(ip) || { count: 0, until: 0 };
      if (attempt.until > Date.now()) return json({ error: '尝试过多，请15分钟后再试' }, 429);
      const asAdmin = body.role === 'admin';
      const phone = String(body.phone || '').trim();
      let valid = false;
      if (asAdmin) {
        const expected = adminHash(env);
        const actual = typeof body.password === 'string' ? crypto.scryptSync(body.password, String(env?.ADMIN_SALT || 'sc-admin-salt'), 64) : Buffer.alloc(expected.length);
        valid = expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
      } else {
        valid = /^1[3-9]\d{9}$/.test(phone) && !!(await store.findPhone(env, phone));
      }
      if (!valid) {
        attempt.count++; if (attempt.count >= 10) attempt.until = Date.now() + 900000;
        failures.set(ip, attempt);
        return json({ error: asAdmin ? '管理员密码错误' : '手机号格式有误或尚未授权，请联系老师' }, 403);
      }
      failures.delete(ip);
      const session = crypto.randomBytes(32).toString('hex');
      await store.createSession(env, session, phone, asAdmin, Date.now() + 7 * 86400000);
      return json({ ok: true }, 200, cookie(session));
    }

    if (path === '/api/phones') {
      if (!user?.admin) return json({ error: '请先登录管理后台' }, 403);
      if (request.method === 'GET') return json({ phones: await store.listPhones(env) });
      const phone = String(body.phone || '').trim();
      if (!/^1[3-9]\d{9}$/.test(phone)) return json({ error: '请输入有效的11位手机号' }, 400);
      if (request.method === 'POST') { await store.upsertPhone(env, phone, String(body.note || '').slice(0, 100), new Date().toISOString()); return json({ ok: true }); }
      if (request.method === 'DELETE') { await store.deletePhone(env, phone); await store.deleteSessionsByPhone(env, phone); return json({ ok: true }); }
    }

    return json({ error: '接口不存在' }, 404);
  } catch (err) {
    console.error('[api]', err.message);
    return json({ error: '服务暂时不可用：' + err.message }, 500);
  }
}
