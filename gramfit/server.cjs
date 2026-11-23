const http = require('node:http');
const fs = require('node:fs');
const { join } = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { createHmac, randomBytes, timingSafeEqual } = require('node:crypto');

process.umask(0o077);
const data = process.env.CLOZE_DATA || join(__dirname, 'private');
fs.mkdirSync(data, { recursive: true, mode: 0o700 });
const secretPath = join(data, 'secret');
if (!fs.existsSync(secretPath)) fs.writeFileSync(secretPath, randomBytes(32), { flag: 'wx' });
const secret = fs.readFileSync(secretPath);
const sign = value => createHmac('sha256', secret).update(value).digest('hex');
const db = new DatabaseSync(join(data, 'assessment.sqlite'));
db.exec("PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY, used INTEGER NOT NULL DEFAULT 0, records TEXT NOT NULL DEFAULT '{}')");
const get = db.prepare('SELECT used, records FROM accounts WHERE id=?');
if (process.argv[2] === 'import') {
  const codes = fs.readFileSync(process.argv[3], 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  if (codes.length !== 100 || new Set(codes).size !== 100 || codes.some(code => !/^[A-Za-z0-9]{6}$/.test(code) || code.replace(/[0-9]/g, '').length !== 2)) {
    throw Error('Expected 100 distinct six-character activation codes.');
  }
  db.exec('BEGIN IMMEDIATE');
  const insert = db.prepare('INSERT OR IGNORE INTO accounts(id) VALUES(?)');
  for (const code of codes) insert.run(sign('code:'+code));
  db.exec('COMMIT');
  console.log('100 activation codes imported.');
  process.exit();
}

const page = fs.readFileSync(join(__dirname, 'index.html'));
const attempts = new Map();
setInterval(() => {
  for (const [key, value] of attempts) if (value.until < Date.now()) attempts.delete(key);
}, 60000).unref();
const state = row => ({used:row.used, records:JSON.parse(row.records)});
function identity(cookie) {
  const match = (cookie || '').match(/(?:^|; *)cloze_session=([a-f0-9]{64})\.(\d{13})\.([a-f0-9]{64})(?:;|$)/);
  if (!match || Number(match[2]) < Date.now()) return null;
  const signature = sign('session:'+match[1]+'.'+match[2]);
  return timingSafeEqual(Buffer.from(signature), Buffer.from(match[3])) ? match[1] : null;
}
async function body(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 65536) throw Error('Request too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  const json = (status, value) => {
    res.writeHead(status, {'Content-Type':'application/json; charset=utf-8'});
    res.end(JSON.stringify(value));
  };
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    return res.end(page);
  }
  if (req.method !== 'POST' || !['/api/login','/api/logout','/api/start','/api/save'].includes(req.url)) {
    return json(404, {});
  }
  if (req.headers['content-type'] !== 'application/json' || req.headers['sec-fetch-site'] === 'cross-site') return json(403, {});
  try {
    const input = await body(req);
    if (req.url === '/api/login') {
      const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
      const now = Date.now();
      let bucket = attempts.get(ip);
      if (!bucket || bucket.until < now) {
        bucket = { count: 0, until: now+600000 };
        attempts.set(ip, bucket);
      }
      if (bucket.count >= 20) return json(429, {});
      const id = sign('code:'+String(input.code).slice(0,64));
      const row = get.get(id);
      if (!row) {
        bucket.count++;
        return json(401, {});
      }
      const token = id+'.'+(now+86400000);
      res.setHeader('Set-Cookie','cloze_session='+token+'.'+sign('session:'+token)+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400');
      return json(200, state(row));
    }
    if (req.url === '/api/logout') {
      res.setHeader('Set-Cookie','cloze_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
      return json(200, {});
    }
    const id = identity(req.headers.cookie);
    if (!id || !get.get(id)) return json(401, {});
    if (req.url === '/api/start') {
      const min = input.restart === true ? 1 : 0;
      db.prepare("UPDATE accounts SET used=used+1, records='{}' WHERE id=? AND used=?").run(id,min);
      return json(200, state(get.get(id)));
    }
    if (!Number.isInteger(input.question) || input.question<1 || input.question>200 || !input.record || typeof input.record!=='object') return json(400,{});
    const update = db.prepare('UPDATE accounts SET records=json_set(records, ?, json(?)) WHERE id=? AND used=? AND used>0');
    const result = update.run('$."'+input.question+'"', JSON.stringify(input.record), id, input.used);
    return json(result.changes ? 200 : 409, {});
  } catch {
    return json(400, {});
  }
}).listen(Number(process.env.PORT || 3187),'127.0.0.1');
