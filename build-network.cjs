const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const UPSTREAM = 'https://gbjmylxohacppnybfssh.supabase.co';
const SKIP = new Set(['.git', 'node_modules', 'edge-functions', 'cloud-functions', 'tests']);
function nationalRpcRequest(name, payload) {
  var trace = 'NL-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  var phase = name === 'training_api' ? 'PHONE' : name === 'verify_activation_code' ? 'CODE' : name === 'get_activation_progress' ? 'PROGRESS' : 'SAVE';
  var safeRetry = name === 'verify_activation_code' || name === 'get_activation_progress' ||
    (name === 'training_api' && payload && payload.p_action === 'student_login');
  function attempt(round) {
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer;
    var task = new Promise(function (resolve, reject) {
      timer = setTimeout(function () {
        if (controller) controller.abort();
        var error = new Error('登录服务响应超时，请稍后重试');
        error.retryable = true;
        error.kind = 'TIMEOUT';
        reject(error);
      }, 20000);
      Promise.resolve().then(function () {
        var options = {
          method: 'POST', cache: 'no-store',
          headers: { 'Content-Type': 'application/json', apikey: SUPABASE_CONFIG.anonKey,
            Authorization: 'Bearer ' + SUPABASE_CONFIG.anonKey, 'X-Training-Request-Id': trace + '-' + round },
          body: JSON.stringify(payload || {})
        };
        if (controller) options.signal = controller.signal;
        return fetch(SUPABASE_CONFIG.url + '/rest/v1/rpc/' + name, options);
      }).then(function (response) {
        return response.text().then(function (text) {
          var data = null;
          try { if (text) data = JSON.parse(text); }
          catch (_) {
            var badResponse = new Error('登录服务返回异常（HTTP ' + response.status + '），请重试');
            badResponse.retryable = true;
            badResponse.kind = 'FORMAT';
            badResponse.status = response.status;
            throw badResponse;
          }
          if (!response.ok) {
            var serverError = new Error(data && (data.message || data.msg || data.error_description) ||
              '数据服务暂时不可用（HTTP ' + response.status + '），请重试');
            serverError.retryable = response.status === 502 || response.status === 503 || response.status === 504;
            serverError.kind = 'HTTP';
            serverError.status = response.status;
            throw serverError;
          }
          if (name === 'training_api' && (!data || typeof data !== 'object')) {
            var emptyResponse = new Error('登录服务返回内容不完整，请重试');
            emptyResponse.retryable = true;
            emptyResponse.kind = 'EMPTY';
            emptyResponse.status = response.status;
            throw emptyResponse;
          }
          return data;
        });
      }).then(resolve, reject);
    });
    return task.then(function (data) { clearTimeout(timer); return data; }, function (error) {
      clearTimeout(timer);
      var networkError = error && (error.name === 'TypeError' || error.name === 'AbortError');
      if (safeRetry && round === 0 && (networkError || error.retryable)) {
        return new Promise(function (resolve) { setTimeout(resolve, 400); }).then(function () { return attempt(1); });
      }
      if (networkError) { error = new Error('网络连接暂时中断，请点击登录重试'); error.kind = 'NETWORK'; }
      var kind = error.kind || 'UNKNOWN';
      var number = trace + '-' + round + '/' + phase + '/' + kind;
      if (typeof window !== 'undefined') window.NATIONAL_LOGIN_DIAGNOSTIC_V2 = {
        id: trace + '-' + round, phase: phase, kind: kind, status: error.status || 0, at: Date.now()
      };
      error.message += '（诊断编号 ' + number + '）';
      throw error;
    });
  }
  return attempt(0);
}

function nationalSessionStart(identity, type, progress) {
  if (typeof window !== 'undefined' && window.NATIONAL_LOGIN_INIT_FAILED) {
    showMsg('题库尚未加载完成，请刷新页面后重试', false);
    return false;
  }
  try {
    setActiveLogin(identity, type);
    if (progress && typeof progress === 'object') writeStoreLocal(progress);
    init();
    try { localStorage.setItem(ACT_KEY, JSON.stringify({ type: type, value: identity, code: type === 'code' ? identity : '', at: Date.now() })); } catch (_) {}
    unlockBody();
    return true;
  } catch (error) {
    var number = 'NL-' + Date.now().toString(36).toUpperCase() + '-INIT';
    if (typeof window !== 'undefined') {
      window.NATIONAL_LOGIN_INIT_FAILED = true;
      window.NATIONAL_LOGIN_DIAGNOSTIC_V2 = { id: number, phase: 'INIT', kind: error.name || 'Error', at: Date.now() };
    }
    lockBody();
    setBusy(false);
    showMsg('登录校验已通过，但题库加载失败，请刷新重试（诊断编号 ' + number + '）', false);
    return false;
  }
}

function patchNationalLogin(source) {
  if (source.includes('NATIONAL_LOGIN_DIAGNOSTIC_V2')) return source;
  const existing = source.indexOf('function nationalRpcRequest(');
  const start = existing >= 0 ? existing : source.indexOf('function activationRpc(');
  const end = source.indexOf('function setActiveLogin(', start);
  if (start < 0 || end < 0) throw new Error('National login RPC section not found; source was left unchanged');
  source = source.slice(0, start) + nationalRpcRequest.toString() + '\n' +
    'function activationRpc(name,payload){return nationalRpcRequest(name,payload || {});}\n' +
    'function trainingRpc(action,payload){return nationalRpcRequest("training_api",{p_action:action,p_payload:payload || {}}).then(function(data){return data || {};});}\n' + source.slice(end);
  const sessionStart = source.indexOf('function startAuthorizedSession(');
  const sessionEnd = source.indexOf('function submit()', sessionStart);
  if (sessionStart < 0 || sessionEnd < 0) throw new Error('National session section not found');
  source = source.slice(0, sessionStart) + nationalSessionStart.toString().replace('function nationalSessionStart(', 'function startAuthorizedSession(') + '\n\n  ' + source.slice(sessionEnd);
  return source.replace(/try \{ localStorage.removeItem\(ACT_KEY\); \} catch \(e\) \{\}\s*(?=selectLoginType\(savedType\);)/, '');
}
async function build(root) {
  const files = [];
  async function walk(dir) {
    for (const item of await fs.readdir(dir, { withFileTypes: true })) {
      if (SKIP.has(item.name) || /backup/i.test(item.name)) continue;
      const full = path.join(dir, item.name);
      if (item.isDirectory()) await walk(full);
      else if (/\.(js|html)$/.test(item.name)) files.push(full);
    }
  }
  await walk(root);
  const versions = new Map();
  let configs = 0, pages = 0;
  for (const file of files) {
    const original = await fs.readFile(file, 'utf8');
    const source = path.relative(root, file).split(path.sep).join('/') === 'eazycloze/app.js'
      ? patchNationalLogin(original) : original;
    const next = source.replace(/(["'])https:\/\/gbjmylxohacppnybfssh\.supabase\.co([^"']*)\1/g,
      (match, quote, suffix, offset) => {
        if (/location\.protocol === "file:" \? $/.test(source.slice(Math.max(0, offset - 45), offset))) return match;
        return '(location.protocol === "file:" ? ' + JSON.stringify(UPSTREAM + suffix) +
          ' : location.origin + ' + JSON.stringify('/training-backend' + suffix) + ')';
      });
    if (next !== original) { await fs.writeFile(file, next); configs++; }
    if (file.endsWith('.js') && next.includes('location.origin + "/training-backend')) {
      versions.set(path.resolve(file), 'net-' + crypto.createHash('sha256').update(next).digest('hex').slice(0, 12));
    }
  }
  for (const file of files.filter(name => name.endsWith('.html'))) {
    const source = await fs.readFile(file, 'utf8');
    const next = source.replace(/(<script\b[^>]*\bsrc\s*=\s*)(["'])([^"']+)\2/gi,
      (match, prefix, quote, src) => {
        if (/^(https?:)?\/\//.test(src)) return match;
        const [withoutHash, hash] = src.split('#');
        const [pathname, search] = withoutHash.split('?');
        const full = path.resolve(src.startsWith('/') ? root : path.dirname(file),
          src.startsWith('/') ? pathname.slice(1) : pathname);
        const version = versions.get(full);
        if (!version) return match;
        const query = new URLSearchParams(search || '');
        query.set('v', version);
        return prefix + quote + pathname + '?' + query.toString() + (hash ? '#' + hash : '') + quote;
      });
    if (next !== source) { await fs.writeFile(file, next); pages++; }
  }
  console.log('[training-network] configurations=' + configs + ', versioned-pages=' + pages);
  return { configs, pages };
}
module.exports = build;
module.exports.nationalRpcRequest = nationalRpcRequest;
module.exports.nationalSessionStart = nationalSessionStart;
if (require.main === module) build(path.resolve(process.argv[2] || process.cwd())).catch(error => {
  console.error('[training-network] Build failed:', error.message);
  process.exitCode = 1;
});
