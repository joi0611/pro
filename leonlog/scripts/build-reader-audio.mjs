import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');

function extractConst(source, name) {
  const marker = `const ${name}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Cannot find ${name}`);
  const equals = source.indexOf('=', start + marker.length);
  let i = equals + 1;
  while (/\s/.test(source[i])) i += 1;
  const opener = source[i];
  const closer = opener === '[' ? ']' : opener === '{' ? '}' : null;
  if (!closer) throw new Error(`Unsupported expression for ${name}`);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let j = i; j < source.length; j += 1) {
    const ch = source[j];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === opener) depth += 1;
    if (ch === closer) {
      depth -= 1;
      if (depth === 0) return source.slice(i, j + 1);
    }
  }
  throw new Error(`Unclosed expression for ${name}`);
}

function evaluate(expression, prelude = '') {
  return Function(`"use strict";${prelude};return (${expression});`)();
}

function sentenceText(tokens) {
  let result = '';
  for (const token of tokens) {
    const word = Array.isArray(token) ? token.join('') : token;
    result += (!result || ',."’!?'.includes(word[0])) ? word : ` ${word}`;
  }
  return result.trim();
}

function readHtml(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

const sets = {};

{
  const source = readHtml('斗南花市分级阅读绘本-点读版.html');
  const words = evaluate(extractConst(source, 'WORDS'));
  const pages = evaluate(extractConst(source, 'PAGES'));
  sets.dounan = [
    ...Object.values(words).map(word => word[0]),
    ...pages.flatMap(page => page.ss.map(sentenceText)),
  ];
}

{
  const source = readHtml('爱达魔都号研学手册.html');
  const words = evaluate(extractConst(source, 'EN_WORDS'));
  const levelWords = evaluate(extractConst(source, 'EN_L3WORDS'));
  const imageExpression = extractConst(source, 'EN_IMGS');
  const pages = evaluate(extractConst(source, 'EN_PAGES'), `const EN_IMGS=${imageExpression}`);
  sets.adora = [
    ...words.map(word => word[0]),
    ...Object.values(levelWords).map(word => word[0]),
    ...pages.filter(page => page.ss).flatMap(page => page.ss.map(sentenceText)),
  ];
}

{
  const source = readHtml('上海科技馆能源分级阅读绘本-点读版.html');
  const words = evaluate(extractConst(source, 'WORDS'));
  const pages = evaluate(extractConst(source, 'PAGES'));
  sets['shanghai-energy'] = [
    ...Object.values(words).map(word => word[0]),
    ...pages.flatMap(page => page.plain),
  ];
}

const manifest = [];
const audioMap = {};
for (const [setName, texts] of Object.entries(sets)) {
  audioMap[setName] = {};
  for (const text of [...new Set(texts.filter(Boolean))]) {
    const id = crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);
    const relativeFile = `assets/audio/${setName}/${id}.mp3`;
    audioMap[setName][text] = relativeFile;
    manifest.push({ set: setName, text, file: relativeFile });
  }
}

fs.mkdirSync(path.join(root, 'assets', 'audio'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'scripts', 'reader-audio-items.json'),
  JSON.stringify(manifest, null, 2),
  'utf8',
);

const runtime = `(() => {
  'use strict';
  const SOURCES = ${JSON.stringify(audioMap, null, 2)};
  const player = new Audio();
  player.preload = 'auto';
  let requestId = 0;
  let englishVoice = null;
  let warned = false;

  function prepareVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    englishVoice = voices.find(v => /^en-US$/i.test(v.lang)) ||
      voices.find(v => /^en[-_]/i.test(v.lang)) || null;
  }

  function fallback(text, options = {}) {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      if (!warned) {
        warned = true;
        alert('音频暂时无法播放，请检查网页的 assets/audio 文件夹是否已完整上传。');
      }
      return false;
    }
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = options.rate || 0.82;
      utterance.pitch = options.pitch || 1;
      utterance.volume = 1;
      if (englishVoice) utterance.voice = englishVoice;
      synth.resume();
      synth.speak(utterance);
      return true;
    } catch (error) {
      if (!warned) {
        warned = true;
        alert('发音启动失败，请检查设备音量或重新打开网页。');
      }
      return false;
    }
  }

  function play(setName, text, options = {}) {
    if (!text) return false;
    const source = SOURCES[setName] && SOURCES[setName][text];
    requestId += 1;
    const thisRequest = requestId;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    player.pause();
    player.onerror = null;
    if (!source) return fallback(text, options);
    player.src = source;
    player.currentTime = 0;
    let didFallback = false;
    const useFallback = () => {
      if (didFallback || thisRequest !== requestId) return;
      didFallback = true;
      fallback(text, options);
    };
    player.onerror = useFallback;
    const promise = player.play();
    if (promise && typeof promise.catch === 'function') promise.catch(useFallback);
    return true;
  }

  prepareVoice();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.addEventListener?.('voiceschanged', prepareVoice);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) prepareVoice();
    });
  }

  window.ReaderAudio = {
    play,
    sourceFor(setName, text) {
      return SOURCES[setName] && SOURCES[setName][text] || null;
    }
  };
})();
`;
fs.writeFileSync(path.join(root, 'assets', 'reader-audio.js'), runtime, 'utf8');

const counts = Object.fromEntries(Object.entries(audioMap).map(([key, value]) => [key, Object.keys(value).length]));
console.log(JSON.stringify({ total: manifest.length, counts }, null, 2));
