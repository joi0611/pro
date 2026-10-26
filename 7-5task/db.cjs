'use strict';
// 数据层：优先使用 Supabase（PostgreSQL），未配置或连接失败时回退到本地 SQLite。
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const dir = path.join(__dirname, '.private');
fs.mkdirSync(dir, { recursive: true });

function readConfig() {
  const cfgPath = path.join(dir, 'supabase.json');
  let file = {};
  if (fs.existsSync(cfgPath)) {
    try { file = JSON.parse(fs.readFileSync(cfgPath, 'utf8')) || {}; }
    catch (err) { console.warn('读取 .private/supabase.json 失败：' + err.message); }
  }
  const url = String(process.env.SUPABASE_URL || file.url || '').trim().replace(/\/+$/, '');
  const key = String(process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || file.key || '').trim();
  return { url, key };
}

function sqliteStore() {
  const db = new DatabaseSync(path.join(dir, 'access.sqlite'));
  db.exec(`CREATE TABLE IF NOT EXISTS phones(phone TEXT PRIMARY KEY, note TEXT NOT NULL, created TEXT NOT NULL);
           CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, phone TEXT, admin INTEGER, expires INTEGER)`);
  const q = (sql, ...args) => db.prepare(sql).all(...args);
  const r = (sql, ...args) => { db.prepare(sql).run(...args); };
  return {
    kind: 'sqlite',
    getSession: token => db.prepare('SELECT * FROM sessions WHERE token=? AND expires>?').get(token, Date.now()),
    createSession: (token, phone, admin, expires) => { r('DELETE FROM sessions WHERE expires<?', Date.now()); r('INSERT INTO sessions VALUES(?,?,?,?)', token, admin ? null : phone, admin ? 1 : 0, expires); },
    deleteSession: token => r('DELETE FROM sessions WHERE token=?', token),
    deleteSessionsByPhone: phone => r('DELETE FROM sessions WHERE phone=?', phone),
    listPhones: () => q('SELECT phone, note, created FROM phones ORDER BY created DESC'),
    findPhone: phone => db.prepare('SELECT phone FROM phones WHERE phone=?').get(phone),
    upsertPhone: (phone, note, created) => r('INSERT INTO phones VALUES(?,?,?) ON CONFLICT(phone) DO UPDATE SET note=excluded.note', phone, note, created),
    deletePhone: phone => r('DELETE FROM phones WHERE phone=?', phone)
  };
}

function supabaseStore(url, key) {
  async function rest(method, table, query, body, prefer) {
    const headers = { apikey: key, Authorization: 'Bearer ' + key, Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (prefer) headers.Prefer = prefer;
    const res = await fetch(`${url}/rest/v1/${table}${query ? '?' + query : ''}`, {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body)
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Supabase ${method} ${table} 返回 ${res.status}：${text.slice(0, 300) || res.statusText}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  }
  const enc = v => encodeURIComponent(String(v));
  return {
    kind: 'supabase',
    url,
    ping: async () => { await rest('GET', 'phones', 'select=phone&limit=1'); },
    getSession: async token => (await rest('GET', 'sessions', `select=*&token=eq.${enc(token)}&expires=gt.${Date.now()}&limit=1`))[0],
    createSession: async (token, phone, admin, expires) => {
      await rest('DELETE', 'sessions', `expires=lt.${Date.now()}`);
      await rest('POST', 'sessions', undefined, [{ token, phone: admin ? null : phone, admin: admin ? 1 : 0, expires }], 'return=minimal');
    },
    deleteSession: async token => { await rest('DELETE', 'sessions', `token=eq.${enc(token)}`); },
    deleteSessionsByPhone: async phone => { await rest('DELETE', 'sessions', `phone=eq.${enc(phone)}`); },
    listPhones: async () => rest('GET', 'phones', 'select=phone,note,created&order=created.desc'),
    findPhone: async phone => (await rest('GET', 'phones', `select=phone&phone=eq.${enc(phone)}&limit=1`))[0],
    upsertPhone: async (phone, note, created) => {
      await rest('POST', 'phones', undefined, [{ phone, note, created }], 'resolution=merge-duplicates,return=minimal');
    },
    deletePhone: async phone => { await rest('DELETE', 'phones', `phone=eq.${enc(phone)}`); }
  };
}

// 首次切换到 Supabase 时，把本地已有授权手机号补传上去（不会覆盖云端已有备注）。
async function migrateToSupabase(local, remote) {
  let rows = [];
  try { rows = local.listPhones(); } catch { return 0; }
  if (!rows.length) return 0;
  const existing = new Set((await remote.listPhones()).map(p => String(p.phone)));
  let moved = 0;
  for (const row of rows) {
    if (existing.has(String(row.phone))) continue;
    await remote.upsertPhone(String(row.phone), String(row.note || ''), row.created || new Date().toISOString());
    moved++;
  }
  return moved;
}

async function createStore() {
  const { url, key } = readConfig();
  const local = sqliteStore();
  if (!url || !key) {
    if (process.env.REQUIRE_SUPABASE === '1') throw new Error('未配置 Supabase：请填写 .private/supabase.json 的 url 和 key（网络端模式不提供本地数据库）');
    console.log('· 未检测到 Supabase 配置，当前使用本地数据库 .private/access.sqlite');
    return { store: local, mode: 'sqlite', notice: '未配置 Supabase，使用本地数据库' };
  }
  const remote = supabaseStore(url, key);
  try {
    await remote.ping();
  } catch (err) {
    if (process.env.ALLOW_LOCAL_FALLBACK === '1') {
      console.error('× Supabase 连接失败：' + err.message);
      console.error('  已回退到本地数据库（ALLOW_LOCAL_FALLBACK=1）。');
      return { store: local, mode: 'sqlite-fallback', notice: 'Supabase 连接失败，本次使用本地数据库' };
    }
    throw new Error('无法连接 Supabase（' + err.message + '）。请检查 .private/supabase.json 的 url / key，以及是否在 Supabase 执行过 supabase-setup.sql；网络端模式不会退回本地数据库。');
  }
  try {
    const moved = await migrateToSupabase(local, remote);
    if (moved) console.log('已从本地数据库补传 ' + moved + ' 个授权手机号到 Supabase。');
  } catch (err) {
    console.warn('本地数据迁移到 Supabase 失败（不影响服务）：' + err.message);
  }
  return { store: remote, mode: 'supabase', notice: '已连接 Supabase：' + url };
}

module.exports = { createStore, readConfig };
