#!/usr/bin/env node
/* 完形填空训练系统 · 静态站点 + 激活码校验服务（零依赖 Node）
 * 用法：node server.js [端口]   默认 8080
 * 接口：POST /api/activate  { code }  →  { ok:true } | { ok:false, msg }
 * 激活码由 _gen_codes.js 生成：明码只在生成时输出一次（写入 _codes_plain.txt，勿部署），
 * codes.json 里只存 SHA-256 哈希。
 */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8080);
const REGION = process.env.REGION || "national"; // national | shanghai
const CODES_FILE = path.join(ROOT, "codes.json");
// 若配置了 Supabase（SUPABASE_URL + SUPABASE_KEY=service_role），/api/activate 改查 Supabase；
// 否则回退读本地 codes.json。KEY 仅服务端使用，切勿暴露到前端。

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8"
};

/* 禁止通过 HTTP 读走的敏感 / 开发 / 备份文件 */
function isBlocked(rel) {
  const low = rel.toLowerCase();
  if (low.startsWith("_") || low.includes(".bak") || low.startsWith(".")) return true;
  const names = ["server.js", "codes.json", "package.json", "package-lock.json"];
  return names.indexOf(low) >= 0;
}

/* 简易限流：每 IP 每 5 分钟最多 30 次激活尝试 */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now(), win = 5 * 60 * 1000;
  const arr = (hits.get(ip) || []).filter(function (t) { return now - t < win; });
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 30;
}

function loadCodes() {
  try { return JSON.parse(fs.readFileSync(CODES_FILE, "utf8")); }
  catch (e) { return { salt: "", codes: [] }; }
}

function hashCode(salt, code) {
  return crypto.createHash("sha256").update(salt + "::" + code + "::" + salt).digest("hex");
}

/* 查 Supabase 校验：取 region 的 salt → 算哈希 → 比对 activation_codes 是否存在 */
async function verifyViaSupabase(code) {
  const base = String(process.env.SUPABASE_URL).replace(/\/+$/, "");
  const key = process.env.SUPABASE_KEY;
  const h = { "apikey": key, "Authorization": "Bearer " + key, "Accept": "application/json" };
  const cfgRes = await fetch(base + "/rest/v1/activation_config?region=eq." +
    encodeURIComponent(REGION) + "&select=salt", { headers: h });
  if (!cfgRes.ok) throw new Error("activation_config " + cfgRes.status);
  const cfg = await cfgRes.json();
  if (!cfg.length || !cfg[0].salt) throw new Error("缺少 region 的 salt");
  const salt = cfg[0].salt;
  const hash = hashCode(salt, code);
  const cRes = await fetch(base + "/rest/v1/activation_codes?region=eq." +
    encodeURIComponent(REGION) + "&code_hash=eq." + hash + "&select=code_hash", { headers: h });
  if (!cRes.ok) throw new Error("activation_codes " + cRes.status);
  const rows = await cRes.json();
  return Array.isArray(rows) && rows.length > 0;
}

function send(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}

const server = http.createServer(function (req, res) {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  if (req.method === "POST" && urlPath === "/api/activate") {
    const ip = req.socket.remoteAddress || "?";
    if (rateLimited(ip)) return send(res, 429, { ok: false, msg: "尝试过于频繁，请 5 分钟后再试" });
    let raw = "";
    req.on("data", function (c) { raw += c; if (raw.length > 4096) req.destroy(); });
    req.on("end", async function () {
      let code = "";
      try { const d = JSON.parse(raw || "{}"); code = String(d.code || "").trim().toUpperCase(); } catch (e) {}
      if (!code) return send(res, 400, { ok: false, msg: "请输入激活码" });

      let hit = null; // null=未查(回退本地) / true=有效 / false=无效
      if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
        try { hit = await verifyViaSupabase(code); }
        catch (e) { console.error("[activate] Supabase 校验失败，回退本地:", e.message); hit = null; }
      }
      if (hit === null) { // 未配置 Supabase 或查询异常 → 本地兜底
        const db = loadCodes();
        if (!db.salt || !db.codes || !db.codes.length) return send(res, 500, { ok: false, msg: "激活服务未配置激活码" });
        hit = db.codes.some(function (c) { return (c.hash || c) === hashCode(db.salt, code); });
      }
      if (hit) return send(res, 200, { ok: true });
      send(res, 200, { ok: false, msg: "激活码无效，请核对后重试" });
    });
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }

  let rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  try { rel = path.normalize(rel).replace(/^(\.\.[\/\\])+/, ""); } catch (e) {}
  const abs = path.join(ROOT, rel);
  if (!abs.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (isBlocked(rel) || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("404 Not Found");
  }

  const ext = path.extname(abs).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": "no-store" });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(abs).pipe(res);
});

server.listen(PORT, function () {
  console.log("完形填空训练系统已启动: http://localhost:" + PORT);
});
