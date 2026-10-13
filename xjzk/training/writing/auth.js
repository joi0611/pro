(function () {
  "use strict";

  const LOGIN_STORAGE_KEY = "writing_access_code_20261012";
  const PHONE_STORAGE_KEY = "writing_phone_login_20261013";
  const LOGIN_MODE_KEY = "writing_login_mode_20261013";
  const LOGIN_OK_KEY = "writing_login_ok_20261012";
  const LOGIN_LABEL_KEY = "writing_login_label_20261012";
  const SYSTEM_TYPE = "writing";
  const SUPABASE_CONFIG = {
    url: "https://gbjmylxohacppnybfssh.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdiam15bHhvaGFjcHBueWJmc3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDA1NzgsImV4cCI6MjA5ODI3NjU3OH0.mz5srsxdbZa4__oqKjlcysWuDo00w7UQaV8n2VNP4eE"
  };

  document.documentElement.classList.add("writing-auth-pending");
  document.addEventListener("DOMContentLoaded", initAuth);

  async function initAuth() {
    document.body.classList.add("auth-locked");
    const codeFromUrl = cleanCode(new URLSearchParams(location.search).get("loginCode"));
    const savedMode = safeGet(LOGIN_MODE_KEY) === "phone" ? "phone" : "code";
    const savedCredential = savedMode === "phone" ? cleanPhone(safeGet(PHONE_STORAGE_KEY)) : cleanCode(safeGet(LOGIN_STORAGE_KEY));
    const mode = codeFromUrl ? "code" : savedMode;
    const candidate = codeFromUrl || (safeGet(LOGIN_OK_KEY) === "true" ? savedCredential : "");

    if (candidate) {
      try {
        const account = mode === "phone" ? await verifyPhoneAccess(candidate) : await verifyAccessCode(candidate);
        await completeLogin(mode, candidate, account, false);
        clearLoginQuery();
        unlockApp();
        return;
      } catch (_) {
        clearLoginState();
      }
    }

    showLogin();
  }

  function showLogin() {
    let layer = document.querySelector(".writing-login-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "writing-login-layer";
      layer.innerHTML = `
        <section class="writing-login-card" role="dialog" aria-modal="true" aria-labelledby="writingLoginTitle">
          <div class="writing-login-brand"><span class="writing-login-mark">新</span><div><strong>新疆学生无限进步</strong><span>中考英语专项训练</span></div></div>
          <h1 id="writingLoginTitle">中考英语写作训练营</h1>
          <p class="writing-login-intro">使用通用登录码，或已由老师授权的手机号进入。首次进入需要填写并确认学生姓名。</p>
          <form id="writingLoginForm">
            <div class="writing-login-tabs" role="tablist"><button type="button" class="active" data-writing-mode="code">登录码</button><button type="button" data-writing-mode="phone">手机号</button></div>
            <div data-writing-field="code"><label for="writingLoginCode">通用登录码</label><input id="writingLoginCode" type="text" maxlength="12" autocomplete="one-time-code" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="请输入登录码"></div>
            <div data-writing-field="phone" hidden><label for="writingLoginPhone">已授权手机号</label><input id="writingLoginPhone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="请输入11位手机号"><p class="writing-login-help">手机号需先由老师开通写作板块。</p></div>
            <button class="writing-login-submit" type="submit">进入写作训练</button>
            <p class="writing-login-message" aria-live="polite"></p>
          </form>
          <a class="writing-login-home" href="../../index.html">返回首页，训练其他题型</a>
        </section>`;
      document.body.appendChild(layer);
    }

    const form = layer.querySelector("form");
    const codeInput = layer.querySelector("#writingLoginCode");
    const phoneInput = layer.querySelector("#writingLoginPhone");
    const message = layer.querySelector(".writing-login-message");
    const button = layer.querySelector("button[type=submit]");
    let mode = "code";
    layer.querySelectorAll("[data-writing-mode]").forEach(tab => tab.addEventListener("click", () => { mode = tab.dataset.writingMode; layer.querySelectorAll("[data-writing-mode]").forEach(item => item.classList.toggle("active", item === tab)); layer.querySelectorAll("[data-writing-field]").forEach(field => field.hidden = field.dataset.writingField !== mode); message.textContent = ""; (mode === "phone" ? phoneInput : codeInput).focus(); }));
    codeInput.addEventListener("input", () => { codeInput.value = cleanCode(codeInput.value); message.textContent = ""; });
    phoneInput.addEventListener("input", () => { phoneInput.value = cleanPhone(phoneInput.value); message.textContent = ""; });
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const input = mode === "phone" ? phoneInput : codeInput;
      const credential = mode === "phone" ? cleanPhone(input.value) : cleanCode(input.value);
      input.value = credential;
      if (mode === "phone" && !/^1\d{10}$/.test(credential)) { message.textContent = "请输入正确的11位手机号。"; input.focus(); return; }
      if (!credential) {
        message.textContent = "请输入登录码。";
        input.focus();
        return;
      }
      button.disabled = true;
      button.textContent = "正在验证…";
      message.textContent = mode === "phone" ? "正在验证手机号授权…" : "正在验证登录码…";
      try {
        const account = mode === "phone" ? await verifyPhoneAccess(credential) : await verifyAccessCode(credential);
        await completeLogin(mode, credential, account, true);
        location.reload();
      } catch (error) {
        message.textContent = error && error.message ? error.message : "登录码不正确，请检查后再试。";
        input.focus();
        input.select();
        button.disabled = false;
        button.textContent = "进入写作训练";
      }
    });
    setTimeout(() => codeInput.focus(), 0);
  }

  async function completeLogin(mode, credential, account, isNewSession) {
    let studentName = account && account.student_name ? account.student_name : "";
    if (window.StudentProfile) {
      studentName = await window.StudentProfile.ensure({
        code: `${mode}:${credential}`,
        account,
        bindName: name => callSupabaseRpc(mode === "phone" ? "bind_phone_student_name" : "bind_student_name", mode === "phone" ? { input_phone: credential, input_system_type: SYSTEM_TYPE, input_student_name: name } : { input_code: credential, input_system_type: SYSTEM_TYPE, input_student_name: name })
      });
    }
    safeSet(LOGIN_MODE_KEY, mode);
    if (mode === "phone") { safeSet(PHONE_STORAGE_KEY, credential); safeRemove(LOGIN_STORAGE_KEY); }
    else { safeSet(LOGIN_STORAGE_KEY, credential); safeRemove(PHONE_STORAGE_KEY); }
    safeSet(LOGIN_OK_KEY, "true");
    if (account && account.label) safeSet(LOGIN_LABEL_KEY, account.label);
    applyStudentBrand(studentName);
    if (!isNewSession) addLogoutButton();
  }

  function applyStudentBrand(name) {
    const cleanName = String(name || "").trim();
    if (!cleanName) return;
    const logo = document.querySelector(".logo-text");
    const sub = document.querySelector(".brand-sub");
    if (logo) logo.textContent = `${cleanName}同学`;
    if (sub) sub.textContent = "中考英语写作训练营";
    document.title = `${cleanName}同学 · 中考英语写作训练营`;
  }

  function addLogoutButton() {
    const nav = document.querySelector("#navTabs");
    if (!nav || nav.querySelector(".writing-logout")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "writing-logout";
    button.textContent = "退出登录";
    button.addEventListener("click", () => {
      if (!confirm("确定退出当前写作训练账号？")) return;
      clearLoginState();
      location.reload();
    });
    nav.appendChild(button);
  }

  function unlockApp() {
    document.querySelector(".writing-login-layer")?.remove();
    document.body.classList.remove("auth-locked");
    document.documentElement.classList.remove("writing-auth-pending");
  }

  function clearLoginQuery() {
    const url = new URL(location.href);
    if (!url.searchParams.has("loginCode")) return;
    url.searchParams.delete("loginCode");
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  function clearLoginState() {
    safeRemove(LOGIN_STORAGE_KEY);
    safeRemove(PHONE_STORAGE_KEY);
    safeRemove(LOGIN_MODE_KEY);
    safeRemove(LOGIN_OK_KEY);
    safeRemove(LOGIN_LABEL_KEY);
  }

  function cleanCode(value) {
    return String(value || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  }

  function cleanPhone(value) { return String(value || "").replace(/\D/g, "").slice(0, 11); }

  async function verifyAccessCode(code) {
    const result = await callSupabaseRpc("verify_access_code", {
      input_code: code,
      input_system_type: SYSTEM_TYPE
    });
    const account = Array.isArray(result) ? result[0] : null;
    if (!account || !account.access_code_id) throw new Error("该登录码不可用于写作专项，或登录码不正确。");
    return account;
  }

  async function verifyPhoneAccess(phone) {
    const result = await callSupabaseRpc("verify_phone_access", { input_phone: phone, input_system_type: SYSTEM_TYPE });
    const account = Array.isArray(result) ? result[0] : null;
    if (!account || !account.access_code_id) throw new Error("该手机号尚未开通写作板块，请联系老师授权。");
    return account;
  }

  async function callSupabaseRpc(functionName, payload) {
    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_CONFIG.anonKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch (_) { data = text; }
    }
    if (!response.ok) {
      const raw = data && data.message ? data.message : "云端连接失败，请稍后再试。";
      if (String(raw).includes("INVALID_ACCESS_CODE")) throw new Error("登录码不正确，请检查后再试。");
      throw new Error(raw);
    }
    return data;
  }

  function safeGet(key) { try { return localStorage.getItem(key) || ""; } catch (_) { return ""; } }
  function safeSet(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function safeRemove(key) { try { localStorage.removeItem(key); } catch (_) {} }
})();
