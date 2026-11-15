const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const UPSTREAM = 'https://gbjmylxohacppnybfssh.supabase.co';
const SKIP = new Set(['.git', 'node_modules', 'edge-functions', 'cloud-functions', 'tests']);
function sharedTrainingConnection() {
  if (window.__TRAINING_CONNECTION_V1__ || typeof window.fetch !== 'function') return;
  window.__TRAINING_CONNECTION_V1__ = true;
  var originalFetch = window.fetch.bind(window);
  var reads = ['verify_access_code', 'verify_phone_access', 'verify_activation_code', 'verify_cloze_experience_code',
    'get_learning_progress', 'get_phone_learning_progress', 'get_activation_progress',
    'current_staff_role', 'owner_query_login_usage', 'teacher_query_login_usage',
    'owner_list_teachers', 'owner_list_teacher_assignments', 'staff_list_phone_access'];
  var retryDelays = [600, 1800];
  window.fetch = function (input, init) {
    if (typeof input !== 'string') return originalFetch(input, init);
    var url;
    try { url = new URL(input, location.href); } catch (_) { return originalFetch(input, init); }
    if (url.origin !== location.origin || !/^\/training-backend\/(rest\/v1\/|auth\/v1\/|functions\/v1\/vocab-progress)/.test(url.pathname)) {
      return originalFetch(input, init);
    }
    var options = init || {}, payload = {};
    try { payload = JSON.parse(options.body || '{}'); } catch (_) {}
    var name = url.pathname.split('/').pop();
    var method = String(options.method || 'GET').toUpperCase();
    var safe = method === 'GET' || method === 'HEAD' || reads.indexOf(name) >= 0 ||
      (name === 'vocab-progress' && ['login', 'get'].indexOf(payload.action) >= 0) ||
      (name === 'training_api' && payload.p_action === 'student_login');
    var trace = 'TC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    function problem(message, kind, status, id) {
      var error = new Error(message);
      error.kind = kind; error.status = status || 0; error.requestId = id; error.isTrainingTransportError = true;
      return error;
    }
    function attempt(round) {
      var id = trace + '-' + round, controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var parent = options.signal, timer, onAbort;
      var task = new Promise(function (resolve, reject) {
        onAbort = function () {
          if (controller) controller.abort();
          reject(problem('请求已取消，可重新操作', 'CANCEL', 0, id));
        };
        if (parent && parent.aborted) { onAbort(); return; }
        if (parent && parent.addEventListener) parent.addEventListener('abort', onAbort, { once: true });
        timer = setTimeout(function () {
          if (controller) controller.abort();
          reject(problem('数据服务响应超时，请稍后重试', 'TIMEOUT', 0, id));
        }, 20000);
        var request = {};
        Object.keys(options).forEach(function (key) { request[key] = options[key]; });
        request.headers = new Headers(options.headers || {});
        request.headers.set('X-Training-Request-Id', id);
        request.cache = 'no-store';
        if (controller) request.signal = controller.signal;
        Promise.resolve().then(function () { return originalFetch(input, request); }).then(function (response) {
          // Preserve authentication responses so callers can renew expired sessions.
          if (response.status === 401 || response.status === 403) return response;
          return response.clone().text().then(function (text) {
            var data = null;
            try { if (text) data = JSON.parse(text); }
            catch (_) { throw problem('数据服务返回异常（HTTP ' + response.status + '），请重试', 'FORMAT', response.status, id); }
            if (!response.ok) {
              throw problem(data && (data.message || data.msg || data.error_description) ||
                '数据服务暂时不可用（HTTP ' + response.status + '），请重试', 'HTTP', response.status, id);
            }
            return response;
          });
        }).then(resolve, reject);
      });
      function cleanup() {
        clearTimeout(timer);
        if (parent && parent.removeEventListener && onAbort) parent.removeEventListener('abort', onAbort);
      }
      return task.then(function (response) { cleanup(); return response; }, function (error) {
        cleanup();
        if (!error || !error.kind) error = problem('网络连接暂时中断，请重试', 'NETWORK', 0, id);
        var busy = error.status >= 500 && error.status < 600;
        var transient = ['NETWORK', 'TIMEOUT', 'FORMAT'].indexOf(error.kind) >= 0 || busy;
        var budget = error.kind === 'TIMEOUT' ? 1 : retryDelays.length;
        if (safe && round < budget && transient) {
          return new Promise(function (resolve) { setTimeout(resolve, retryDelays[round]); }).then(function () { return attempt(round + 1); });
        }
        window.TRAINING_CONNECTION_DIAGNOSTIC_V1 = { id: id, phase: name, kind: error.kind, status: error.status || 0, at: Date.now() };
        if (busy) error.message = '题库服务器暂时繁忙，请等几秒再点一次';
        error.message += '（诊断编号 ' + id + '/' + error.kind + '）';
        throw error;
      });
    }
    return attempt(0);
  };
}
function nationalRpcRequest(name, payload) {
  // NATIONAL_LOGIN_RESPONSE_V3: distinguish marked upstream failures from platform responses.
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
        var evidence = {
          source: response.headers.get('X-Training-Failure-Source') ||
            (response.headers.get('X-Training-Transport') ? 'PROXY_RESPONSE' : 'UNMARKED_RESPONSE'),
          platformId: (response.headers.get('X-NWS-LOG-UUID') || '').replace(/[^a-zA-Z0-9-]/g, '').slice(0, 80),
          upstreamId: (response.headers.get('X-Training-Upstream-Id') || '').replace(/[^a-zA-Z0-9-]/g, '').slice(0, 80)
        };
        return response.text().then(function (text) {
          var data = null;
          try { if (text) data = JSON.parse(text); }
          catch (_) {
            var badResponse = new Error('登录服务返回异常（HTTP ' + response.status + '），请重试');
            badResponse.retryable = true;
            badResponse.kind = 'FORMAT';
            badResponse.status = response.status;
            badResponse.evidence = evidence;
            throw badResponse;
          }
          if (!response.ok) {
            var serverError = new Error(data && (data.message || data.msg || data.error_description) ||
              '数据服务暂时不可用（HTTP ' + response.status + '），请重试');
            serverError.retryable = response.status >= 500 && response.status < 600;
            serverError.kind = 'HTTP';
            serverError.status = response.status;
            serverError.evidence = evidence;
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
      var budget = error && error.kind === 'TIMEOUT' ? 1 : 2;
      if (safeRetry && round < budget && (networkError || error.retryable)) {
        return new Promise(function (resolve) { setTimeout(resolve, round === 0 ? 600 : 1800); }).then(function () { return attempt(round + 1); });
      }
      if (networkError) { error = new Error('网络连接暂时中断，请点击登录重试'); error.kind = 'NETWORK'; }
      var kind = error.kind || 'UNKNOWN';
      var number = trace + '-' + round + '/' + phase + '/' + kind;
      if (error.evidence) number += '/' + error.evidence.source +
        (error.evidence.platformId ? '/EO-' + error.evidence.platformId : '');
      if (typeof window !== 'undefined') window.NATIONAL_LOGIN_DIAGNOSTIC_V2 = {
        id: trace + '-' + round, phase: phase, kind: kind, status: error.status || 0, at: Date.now(),
        evidence: error.evidence || null
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
  source = source.replace('var savedValue = saved && String(saved.value || saved.code || "").trim();',
    'var savedValue = saved ? String(saved.value || saved.code || "").trim() : "";');
  if (source.includes('NATIONAL_LOGIN_RESPONSE_V3')) return source;
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
  const aliases = [
    ['zaytun/training/grammar/official-exams-2026.js', 'xjzk/training/grammar/official-exams-2026.js'],
    ['zaytun/training/reading-writing/official-exams-reading-writing.js', 'zaytun/training/reading-writing/official-exams-2024-2025-20260829.js']
  ];
  const fixedAssets = new Set();
  for (const [from, to] of aliases) {
    try { await fs.access(path.join(root, path.dirname(to), 'index.html')); }
    catch (_) { continue; }
    await fs.copyFile(path.join(root, from), path.join(root, to));
    fixedAssets.add(to);
  }
  const sharedSource = '(' + sharedTrainingConnection.toString() + ')();\n';
  const sharedVersion = crypto.createHash('sha256').update(sharedSource).digest('hex').slice(0, 12);
  await fs.mkdir(path.join(root, 'shared'), { recursive: true });
  await fs.writeFile(path.join(root, 'shared/training-connection.js'), sharedSource);
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
    const relative = path.relative(root, file).split(path.sep).join('/');
    if (relative.startsWith('leonlog/')) {
      // This separate app uses Supabase Auth and Storage uploads, not just RPC.
      // Keep its original SDK endpoint instead of routing it through an RPC proxy.
      if (relative === 'leonlog/assets/supabase-config.js') {
        const restored = original.replace(/\(location.protocol === "file:" \? "https:\/\/gbjmylxohacppnybfssh\.supabase\.co" : location.origin \+ "\/training-backend"\)/g, JSON.stringify(UPSTREAM));
        if (restored !== original) { await fs.writeFile(file, restored); configs++; }
        versions.set(path.resolve(file), 'net-' + crypto.createHash('sha256').update(restored).digest('hex').slice(0, 12));
      }
      continue;
    }
    const source = relative === 'eazycloze/app.js'
      ? patchNationalLogin(original) : original;
    const next = source.replace(/(["'])https:\/\/gbjmylxohacppnybfssh\.supabase\.co([^"']*)\1/g,
      (match, quote, suffix, offset) => {
        if (/location\.protocol === "file:" \? $/.test(source.slice(Math.max(0, offset - 45), offset))) return match;
        return '(location.protocol === "file:" ? ' + JSON.stringify(UPSTREAM + suffix) +
          ' : location.origin + ' + JSON.stringify('/training-backend' + suffix) + ')';
      });
    if (next !== original) { await fs.writeFile(file, next); configs++; }
    if (file.endsWith('.js') && (next.includes('location.origin + "/training-backend') || fixedAssets.has(relative))) {
      versions.set(path.resolve(file), 'net-' + crypto.createHash('sha256').update(next).digest('hex').slice(0, 12));
    }
  }
  for (const file of files.filter(name => name.endsWith('.html'))) {
    const source = await fs.readFile(file, 'utf8');
    let next = source.replace(/(<script\b[^>]*\bsrc\s*=\s*)(["'])([^"']+)\2/gi,
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
    const relative = path.relative(root, file).split(path.sep).join('/');
    if (relative.startsWith('xjzk/training/junior-grammar/')) {
      next = next.replace(/(["'])\/assets\/a4-print-entry\.js/g, '$1/xjzk/assets/a4-print-entry.js');
    }
    if (/^(7-5task|gzcloze|shcloze|xjzk|zaytun)\//.test(relative) || relative.startsWith('gaokao/vocabulary/')) {
      next = next.replace(/\n?<script\b[^>]*src=["']\/shared\/training-connection\.js[^"']*["'][^>]*><\/script>/gi, '');
      next = next.replace(/<head\b[^>]*>/i, '$&\n<script src="/shared/training-connection.js?v=' + sharedVersion + '"></script>');
    }
    if (next !== source) { await fs.writeFile(file, next); pages++; }
  }
  console.log('[training-network] configurations=' + configs + ', versioned-pages=' + pages);
  return { configs, pages };
}
module.exports = build;
module.exports.nationalRpcRequest = nationalRpcRequest;
module.exports.nationalSessionStart = nationalSessionStart;
module.exports.sharedTrainingConnection = sharedTrainingConnection;
if (require.main === module) build(path.resolve(process.argv[2] || process.cwd())).catch(error => {
  console.error('[training-network] Build failed:', error.message);
  process.exitCode = 1;
});
