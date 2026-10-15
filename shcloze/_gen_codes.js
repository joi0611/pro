#!/usr/bin/env node
/* 生成激活码：node _gen_codes.js [数量] [备注]
 * 码格式：8 位「字母+数字」组合（去易混淆的 I/O/0/1），大小写不敏感（校验端统一转大写）。
 * 明码只在本次输出（同时追加到 _codes_plain.txt，请妥善保管、切勿部署到服务器），
 * codes.json 里只追加 SHA-256 哈希。
 */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const FILE = path.join(ROOT, "codes.json");
const PLAIN = path.join(ROOT, "_codes_plain.txt");
const n = Math.max(1, Number(process.argv[2] || 10) || 10);
const note = process.argv[3] || "";

let db = null;
try { db = JSON.parse(fs.readFileSync(FILE, "utf8")); } catch (e) {}
if (!db || !db.salt) {
  db = { salt: crypto.randomBytes(16).toString("hex"), codes: [] };
}

function genCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; /* 去 I / O */
  const digits = "23456789";                  /* 去 0 / 1 */
  const all = letters + digits;
  for (let t = 0; t < 200; t++) {
    let s = "";
    for (let i = 0; i < 8; i++) s += all[Math.floor(Math.random() * all.length)];
    if (/[A-Z]/.test(s) && /[0-9]/.test(s)) return s; /* 必须同时含字母与数字 */
  }
  return null;
}

const made = [];
const seen = new Set(db.codes.map(function (c) { return c.hash || c; }));
while (made.length < n) {
  const code = genCode();
  const hash = crypto.createHash("sha256").update(db.salt + "::" + code + "::" + db.salt).digest("hex");
  if (seen.has(hash)) continue;
  seen.add(hash);
  db.codes.push({ hash: hash, note: note, at: new Date().toISOString().slice(0, 10) });
  made.push(code);
}
fs.writeFileSync(FILE, JSON.stringify(db, null, 2), "utf8");
fs.appendFileSync(PLAIN, "\n# " + new Date().toISOString() + (note ? "  " + note : "") + "\n" + made.join("\n") + "\n", "utf8");
console.log("已生成 " + made.length + " 个激活码（明码见 " + PLAIN + "，切勿部署到服务器）：\n" + made.join("\n"));
