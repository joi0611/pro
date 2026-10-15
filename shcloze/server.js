#!/usr/bin/env node
/* 完形填空训练系统 · 静态站点 + 手机号白名单登录（零依赖 Node）
 * 学员：管理员开通手机号后，输入手机号即可登录，无需密码或验证码。
 * 管理：访问 /admin.html，默认密码写在下方；服务器的 ADMIN_PASSWORD 环境变量可覆盖它。
 */
"use strict";
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8080);
const USERS_FILE = process.env.USERS_FILE || path.join(ROOT, "phone-users.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "19909946277";
const SUPABASE_URL = String(process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
const SUPABASE_SECRET_KEY = String(process.env.SUPABASE_SECRET_KEY || "").trim();
const USE_SUPABASE = !!(SUPABASE_URL && SUPABASE_SECRET_KEY);
if (!!SUPABASE_URL !== !!SUPABASE_SECRET_KEY) {
  throw new Error("Supabase 配置不完整：SUPABASE_URL 和 SUPABASE_SECRET_KEY 必须同时设置");
}
const USER_SESSION_AGE = 30 * 24 * 60 * 60 * 1000;
const ADMIN_SESSION_AGE = 8 * 60 * 60 * 1000;

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8"
};

function isBlocked(rel) {
  const low = rel.toLowerCase();
  if (low.startsWith("_") || low.includes(".bak") || low.startsWith(".")) return true;
  return ["server.js", "codes.json", "phone-users.json", "phone-users.json.tmp", "package.json",
    "package-lock.json", "activation-ledger.json", "activation-ledger.json.lock"].indexOf(low) >= 0;
}

function send(res, status, obj, extraHeaders) {
  const body = JSON.stringify(obj);
  res.writeHead(status, Object.assign({
    "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }, extraHeaders || {}));
  res.end(body);
}

function readBody(req, res, callback) {
  let raw = "", finished = false;
  req.on("data", function (chunk) {
    if (finished) return;
    raw += chunk;
    if (raw.length > 16384) {
      finished = true;
      send(res, 413, { ok: false, msg: "请求内容过大" });
      req.destroy();
    }
  });
  req.on("end", function () {
    if (finished) return;
    try { callback(null, JSON.parse(raw || "{}")); }
    catch (e) { callback(new Error("请求格式不正确"), {}); }
  });
}

function normalizePhone(value) {
  let phone = String(value || "").trim().replace(/[\s-]/g, "");
  if (phone.indexOf("+86") === 0) phone = phone.slice(3);
  else if (phone.indexOf("0086") === 0) phone = phone.slice(4);
  return phone;
}
function validPhone(phone) { return /^1[3-9]\d{9}$/.test(phone); }
function nowIso() { return new Date().toISOString(); }

function loadUsers() {
  try {
    const parsed = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    if (parsed && Array.isArray(parsed.users)) return parsed;
  } catch (e) {
    if (e.code !== "ENOENT") console.error("[users] 读取失败:", e.message);
  }
  return { version: 1, users: [] };
}

function saveUsers(data) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  const tmp = USERS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, USERS_FILE);
}

function fromDatabaseUser(row) {
  return {
    phone: String(row.phone || ""),
    note: String(row.note || ""),
    enabled: row.enabled !== false,
    createdAt: row.created_at || row.createdAt || "",
    updatedAt: row.updated_at || row.updatedAt || row.created_at || row.createdAt || ""
  };
}

function supabaseRequest(method, resource, body, prefer) {
  return new Promise(function (resolve, reject) {
    let target;
    try { target = new URL(SUPABASE_URL + "/rest/v1/" + resource); }
    catch (e) { reject(new Error("SUPABASE_URL 格式不正确")); return; }
    const raw = body === undefined ? "" : JSON.stringify(body);
    const headers = {
      "apikey": SUPABASE_SECRET_KEY,
      "Accept": "application/json",
      "Accept-Profile": "public",
      "Content-Profile": "public"
    };
    if (raw) {
      headers["Content-Type"] = "application/json; charset=utf-8";
      headers["Content-Length"] = Buffer.byteLength(raw);
    }
    if (prefer) headers["Prefer"] = prefer;
    const transport = target.protocol === "http:" ? http : https;
    const request = transport.request(target, { method: method, headers: headers, timeout: 12000 }, function (response) {
      let text = "";
      response.setEncoding("utf8");
      response.on("data", function (chunk) { text += chunk; });
      response.on("end", function () {
        let data = null;
        try { data = text ? JSON.parse(text) : null; }
        catch (e) { data = text; }
        if (response.statusCode >= 200 && response.statusCode < 300) { resolve(data); return; }
        const error = new Error("Supabase 请求失败（HTTP " + response.statusCode + "）");
        error.statusCode = response.statusCode;
        error.details = data;
        reject(error);
      });
    });
    request.on("timeout", function () { request.destroy(new Error("Supabase 请求超时")); });
    request.on("error", reject);
    if (raw) request.write(raw);
    request.end();
  });
}

function storeListUsers() {
  if (!USE_SUPABASE) return Promise.resolve(loadUsers().users.map(fromDatabaseUser));
  return supabaseRequest("GET", "phone_users?select=phone,note,enabled,created_at,updated_at&order=created_at.desc", undefined)
    .then(function (rows) { return (Array.isArray(rows) ? rows : []).map(fromDatabaseUser); });
}

function storeFindUser(phone) {
  if (!USE_SUPABASE) {
    return Promise.resolve(loadUsers().users.map(fromDatabaseUser).find(function (item) { return item.phone === phone; }) || null);
  }
  return supabaseRequest("GET", "phone_users?select=phone,note,enabled,created_at,updated_at&phone=eq." + encodeURIComponent(phone) + "&limit=1", undefined)
    .then(function (rows) { return Array.isArray(rows) && rows[0] ? fromDatabaseUser(rows[0]) : null; });
}

function storeCreateUser(phone, note) {
  const stamp = nowIso();
  if (!USE_SUPABASE) {
    const db = loadUsers();
    const user = { phone: phone, note: note, enabled: true, createdAt: stamp, updatedAt: stamp };
    db.users.push(user); saveUsers(db); return Promise.resolve(user);
  }
  return supabaseRequest("POST", "phone_users", {
    phone: phone, note: note, enabled: true, created_at: stamp, updated_at: stamp
  }, "return=representation").then(function (rows) { return fromDatabaseUser(rows[0]); });
}

function storeUpdateUser(phone, changes) {
  const stamp = nowIso();
  if (!USE_SUPABASE) {
    const db = loadUsers(), index = db.users.findIndex(function (item) { return item.phone === phone; });
    if (index < 0) return Promise.resolve(null);
    if (typeof changes.enabled === "boolean") db.users[index].enabled = changes.enabled;
    if (changes.note !== undefined) db.users[index].note = changes.note;
    db.users[index].updatedAt = stamp; saveUsers(db); return Promise.resolve(fromDatabaseUser(db.users[index]));
  }
  const patch = { updated_at: stamp };
  if (typeof changes.enabled === "boolean") patch.enabled = changes.enabled;
  if (changes.note !== undefined) patch.note = changes.note;
  return supabaseRequest("PATCH", "phone_users?phone=eq." + encodeURIComponent(phone), patch, "return=representation")
    .then(function (rows) { return Array.isArray(rows) && rows[0] ? fromDatabaseUser(rows[0]) : null; });
}

function storeDeleteUser(phone) {
  if (!USE_SUPABASE) {
    const db = loadUsers(), index = db.users.findIndex(function (item) { return item.phone === phone; });
    if (index < 0) return Promise.resolve(false);
    db.users.splice(index, 1); saveUsers(db); return Promise.resolve(true);
  }
  return supabaseRequest("DELETE", "phone_users?phone=eq." + encodeURIComponent(phone), undefined, "return=representation")
    .then(function (rows) { return Array.isArray(rows) && rows.length > 0; });
}

function databaseError(res, error) {
  console.error("[database]", error && error.message ? error.message : "未知错误");
  send(res, 502, { ok: false, msg: "数据库连接失败，请稍后重试" });
}

function publicUser(user) {
  return { phone: user.phone, note: user.note || "", enabled: user.enabled !== false,
    createdAt: user.createdAt || "", updatedAt: user.updatedAt || user.createdAt || "" };
}
function maskPhone(phone) { return phone.slice(0, 3) + "****" + phone.slice(-4); }

function parseCookies(req) {
  const out = {};
  String(req.headers.cookie || "").split(";").forEach(function (part) {
    const at = part.indexOf("=");
    if (at < 0) return;
    try { out[part.slice(0, at).trim()] = decodeURIComponent(part.slice(at + 1).trim()); } catch (e) {}
  });
  return out;
}

function cookie(name, value, maxAgeSeconds) {
  let result = name + "=" + encodeURIComponent(value) + "; Path=/; HttpOnly; SameSite=Strict";
  if (maxAgeSeconds !== undefined) result += "; Max-Age=" + maxAgeSeconds;
  if (process.env.COOKIE_SECURE === "1") result += "; Secure";
  return result;
}

const userSessions = new Map();
const adminSessions = new Map();
function newSession(store, value, age) {
  const token = crypto.randomBytes(32).toString("base64url");
  store.set(token, { value: value, expiresAt: Date.now() + age });
  return token;
}
function getSession(store, token) {
  if (!token) return null;
  const session = store.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) { store.delete(token); return null; }
  return session;
}
function removeSession(store, token) { if (token) store.delete(token); }
function userFromRequest(req) {
  const token = parseCookies(req).student_session;
  const session = getSession(userSessions, token);
  if (!session) return Promise.resolve(null);
  return storeFindUser(session.value).then(function (user) {
    if (!user || user.enabled === false) { removeSession(userSessions, token); return null; }
    return user;
  });
}
function isAdmin(req) { return !!getSession(adminSessions, parseCookies(req).admin_session); }
function safeEqual(a, b) {
  const aa = Buffer.from(String(a)), bb = Buffer.from(String(b));
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

const hits = new Map();
function rateLimited(req, scope, max, windowMs) {
  const key = scope + ":" + (req.socket.remoteAddress || "?");
  const now = Date.now();
  const list = (hits.get(key) || []).filter(function (time) { return now - time < windowMs; });
  list.push(now); hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}
function unauthorized(res) { send(res, 401, { ok: false, msg: "管理员登录已失效，请重新登录" }); }

function handleApi(req, res, urlPath) {
  if (req.method === "GET" && urlPath === "/api/session") {
    userFromRequest(req).then(function (user) {
      send(res, 200, user ? { ok: true, loggedIn: true, phone: maskPhone(user.phone) } : { ok: true, loggedIn: false });
    }).catch(function (error) { databaseError(res, error); });
    return true;
  }
  if (req.method === "POST" && urlPath === "/api/login") {
    if (rateLimited(req, "login", 30, 5 * 60 * 1000)) { send(res, 429, { ok: false, msg: "尝试过于频繁，请 5 分钟后再试" }); return true; }
    readBody(req, res, function (err, data) {
      if (err) return send(res, 400, { ok: false, msg: err.message });
      const phone = normalizePhone(data.phone);
      if (!validPhone(phone)) return send(res, 400, { ok: false, msg: "请输入正确的 11 位手机号" });
      storeFindUser(phone).then(function (user) {
        if (!user) return send(res, 200, { ok: false, msg: "该手机号尚未开通，请联系管理员" });
        if (user.enabled === false) return send(res, 200, { ok: false, msg: "该手机号已停用，请联系管理员" });
        const token = newSession(userSessions, phone, USER_SESSION_AGE);
        send(res, 200, { ok: true, phone: maskPhone(phone) }, {
          "Set-Cookie": cookie("student_session", token, Math.floor(USER_SESSION_AGE / 1000))
        });
      }).catch(function (error) { databaseError(res, error); });
    });
    return true;
  }
  if (req.method === "POST" && urlPath === "/api/logout") {
    removeSession(userSessions, parseCookies(req).student_session);
    send(res, 200, { ok: true }, { "Set-Cookie": cookie("student_session", "", 0) });
    return true;
  }
  if (req.method === "GET" && urlPath === "/api/admin/session") {
    send(res, 200, { ok: true, loggedIn: isAdmin(req) }); return true;
  }
  if (req.method === "POST" && urlPath === "/api/admin/login") {
    if (rateLimited(req, "admin-login", 10, 10 * 60 * 1000)) { send(res, 429, { ok: false, msg: "尝试次数过多，请 10 分钟后再试" }); return true; }
    readBody(req, res, function (err, data) {
      if (err) return send(res, 400, { ok: false, msg: err.message });
      if (!safeEqual(data.password || "", ADMIN_PASSWORD)) return send(res, 200, { ok: false, msg: "管理员密码不正确" });
      const token = newSession(adminSessions, "admin", ADMIN_SESSION_AGE);
      send(res, 200, { ok: true }, { "Set-Cookie": cookie("admin_session", token, Math.floor(ADMIN_SESSION_AGE / 1000)) });
    });
    return true;
  }
  if (req.method === "POST" && urlPath === "/api/admin/logout") {
    removeSession(adminSessions, parseCookies(req).admin_session);
    send(res, 200, { ok: true }, { "Set-Cookie": cookie("admin_session", "", 0) }); return true;
  }
  if (urlPath === "/api/admin/phones" && req.method === "GET") {
    if (!isAdmin(req)) { unauthorized(res); return true; }
    storeListUsers().then(function (users) {
      users.sort(function (a, b) { return String(b.createdAt).localeCompare(String(a.createdAt)); });
      send(res, 200, { ok: true, users: users.map(publicUser) });
    }).catch(function (error) { databaseError(res, error); });
    return true;
  }
  if (urlPath === "/api/admin/phones" && req.method === "POST") {
    if (!isAdmin(req)) { unauthorized(res); return true; }
    readBody(req, res, function (err, data) {
      if (err) return send(res, 400, { ok: false, msg: err.message });
      const phone = normalizePhone(data.phone), note = String(data.note || "").trim().slice(0, 80);
      if (!validPhone(phone)) return send(res, 400, { ok: false, msg: "请输入正确的 11 位手机号" });
      storeFindUser(phone).then(function (existing) {
        if (existing) { send(res, 409, { ok: false, msg: "该手机号已存在，可在列表中恢复或编辑" }); return null; }
        return storeCreateUser(phone, note);
      }).then(function (user) {
        if (user) send(res, 201, { ok: true, user: publicUser(user) });
      }).catch(function (error) { databaseError(res, error); });
    });
    return true;
  }
  const phoneMatch = urlPath.match(/^\/api\/admin\/phones\/(1[3-9]\d{9})$/);
  if (phoneMatch && (req.method === "PATCH" || req.method === "DELETE")) {
    if (!isAdmin(req)) { unauthorized(res); return true; }
    const phone = phoneMatch[1];
    if (req.method === "DELETE") {
      storeDeleteUser(phone).then(function (deleted) {
        if (!deleted) { send(res, 404, { ok: false, msg: "未找到该手机号" }); return; }
        userSessions.forEach(function (session, token) { if (session.value === phone) userSessions.delete(token); });
        send(res, 200, { ok: true });
      }).catch(function (error) { databaseError(res, error); });
      return true;
    }
    readBody(req, res, function (err, data) {
      if (err) return send(res, 400, { ok: false, msg: err.message });
      const changes = {};
      if (typeof data.enabled === "boolean") changes.enabled = data.enabled;
      if (data.note !== undefined) changes.note = String(data.note || "").trim().slice(0, 80);
      storeUpdateUser(phone, changes).then(function (user) {
        if (!user) { send(res, 404, { ok: false, msg: "未找到该手机号" }); return; }
        if (user.enabled === false) userSessions.forEach(function (session, token) { if (session.value === phone) userSessions.delete(token); });
        send(res, 200, { ok: true, user: publicUser(user) });
      }).catch(function (error) { databaseError(res, error); });
    });
    return true;
  }
  return false;
}

const server = http.createServer(function (req, res) {
  let urlPath = "/";
  try { urlPath = decodeURIComponent((req.url || "/").split("?")[0]); }
  catch (e) { return send(res, 400, { ok: false, msg: "地址格式不正确" }); }
  if (urlPath.indexOf("/api/") === 0) {
    if (!handleApi(req, res, urlPath)) send(res, 404, { ok: false, msg: "接口不存在" });
    return;
  }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }
  let rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  try { rel = path.normalize(rel).replace(/^(\.\.[\/\\])+/, ""); } catch (e) {}
  const abs = path.join(ROOT, rel);
  if (!abs.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (isBlocked(rel) || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("404 Not Found");
  }
  const ext = path.extname(abs).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "same-origin" });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(abs).pipe(res);
});

if (require.main === module) {
  server.listen(PORT, function () {
    console.log("完形填空训练系统已启动: http://localhost:" + PORT);
    console.log("管理后台: http://localhost:" + PORT + "/admin.html");
    console.log("手机号数据存储: " + (USE_SUPABASE ? "Supabase" : "本地 phone-users.json"));
  });
}

module.exports = { server: server, normalizePhone: normalizePhone, validPhone: validPhone, loadUsers: loadUsers, maskPhone: maskPhone };
