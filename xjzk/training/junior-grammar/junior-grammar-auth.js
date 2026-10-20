(function () {
  "use strict";

  var SYSTEM_TYPE = "junior_grammar";
  var CODE_KEY = "junior_grammar_access_code_20261012";
  var PHONE_KEY = "junior_grammar_phone_20261013";
  var MODE_KEY = "junior_grammar_login_mode_20261013";
  var OK_KEY = "junior_grammar_login_ok_20261012";
  var SUPABASE_URL = "https://gbjmylxohacppnybfssh.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdiam15bHhvaGFjcHBueWJmc3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDA1NzgsImV4cCI6MjA5ODI3NjU3OH0.mz5srsxdbZa4__oqKjlcysWuDo00w7UQaV8n2VNP4eE";

  function normalizeCode(value) {
    return String(value || "").trim().replace(/\s+/g, "").toUpperCase();
  }

  function normalizePhone(value) { return String(value || "").replace(/\D/g, "").slice(0, 11); }

  function loadStudentProfile() {
    if (window.StudentProfile) return Promise.resolve(window.StudentProfile);
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-jgr-student-profile]');
      if (existing) {
        existing.addEventListener("load", function () { resolve(window.StudentProfile); }, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      var script = document.createElement("script");
      script.src = "../../assets/student-profile.js?v=20261020-1";
      script.dataset.jgrStudentProfile = "1";
      script.onload = function () { resolve(window.StudentProfile); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function callRpc(functionName, payload) {
    var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + functionName, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    var data = await response.json().catch(function () { return null; });
    if (!response.ok) throw new Error((data && (data.message || data.error)) || "NETWORK_ERROR");
    return data;
  }

  async function verifyCredential(mode, credential) {
    var data = await callRpc(mode === "phone" ? "verify_phone_access" : "verify_access_code", mode === "phone" ? { input_phone: credential, input_system_type: SYSTEM_TYPE } : { input_code: credential, input_system_type: SYSTEM_TYPE });
    var account = Array.isArray(data) ? data[0] : data;
    if (data === true || (account && (account.access_code_id || account.valid === true || account.success === true))) return account || {};
    throw new Error((data && (data.error || data.message)) || "INVALID_ACCESS_CODE");
  }

  async function ensureStudentProfile(mode, credential, account) {
    var profile = await loadStudentProfile();
    var name = await profile.ensure({
      code: mode + ":" + credential,
      account: account,
      bindName: function (value) {
        return callRpc(mode === "phone" ? "bind_phone_student_name" : "bind_student_name", mode === "phone"
          ? { input_phone: credential, input_system_type: SYSTEM_TYPE, input_student_name: value }
          : { input_code: credential, input_system_type: SYSTEM_TYPE, input_student_name: value });
      }
    });
    document.querySelectorAll(".brand-text h1").forEach(function (heading) {
      heading.textContent = name + "学生（初中语法重构）专属训练系统";
    });
    return name;
  }

  function removePending() {
    document.documentElement.classList.remove("jgr-auth-pending");
  }

  function enhanceResponsiveLayout() {
    if (document.querySelector(".lesson-main > .book-container")) {
      document.body.classList.add("jgr-lesson-page");
    } else if (document.querySelector(".top-bar") && document.querySelector(".lesson-grid")) {
      document.body.classList.add("jgr-directory-page");
    }
  }

  function unlock() {
    document.body.classList.remove("jgr-auth-locked");
    var layer = document.querySelector(".jgr-login-layer");
    if (layer) layer.remove();
    removePending();
    if (/\/index\.html$/.test(location.pathname) && !document.querySelector(".jgr-logout")) {
      var logout = document.createElement("button");
      logout.type = "button";
      logout.className = "jgr-logout";
      logout.textContent = "退出语法重构";
      logout.addEventListener("click", function () {
        localStorage.removeItem(CODE_KEY);
        localStorage.removeItem(PHONE_KEY);
        localStorage.removeItem(MODE_KEY);
        localStorage.removeItem(OK_KEY);
        location.reload();
      });
      document.body.appendChild(logout);
    }
    enhanceResponsiveLayout();
  }

  function showLogin(message) {
    localStorage.removeItem(OK_KEY);
    document.body.classList.add("jgr-auth-locked");
    var layer = document.querySelector(".jgr-login-layer");
    if (!layer) {
      layer = document.createElement("main");
      layer.className = "jgr-login-layer";
      layer.setAttribute("aria-labelledby", "jgr-login-title");
      layer.innerHTML =
        '<section class="jgr-login-card">' +
          '<div class="jgr-login-logo" aria-hidden="true">语</div>' +
          '<p class="jgr-login-eyebrow">初中英语专项训练</p>' +
          '<h1 id="jgr-login-title">初中语法重构</h1>' +
          '<p class="jgr-login-desc">使用通用登录码，或已由老师授权的手机号进入初中语法重构。</p>' +
          '<form class="jgr-login-form" novalidate>' +
            '<div class="jgr-login-tabs" role="tablist" aria-label="选择登录方式"><button type="button" class="active" role="tab" aria-selected="true" data-jgr-mode="code">登录码登录</button><button type="button" role="tab" aria-selected="false" data-jgr-mode="phone">手机号登录</button></div>' +
            '<div data-jgr-field="code"><label for="jgr-code">通用登录码</label><input id="jgr-code" class="jgr-code-input" name="access-code" type="text" inputmode="text" autocomplete="one-time-code" autocapitalize="characters" spellcheck="false" maxlength="32" placeholder="请输入登录码"></div>' +
            '<div data-jgr-field="phone" hidden><label for="jgr-phone">已授权手机号</label><input id="jgr-phone" class="jgr-code-input" name="phone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="请输入11位手机号"><p class="jgr-login-help">手机号需先由老师开通当前板块。</p></div>' +
            '<button class="jgr-login-button" type="submit">验证并进入</button>' +
            '<p class="jgr-login-error" role="status" aria-live="polite">' + (message || "") + '</p>' +
          '</form>' +
          '<a class="jgr-home-link" href="../../index.html">← 返回训练首页</a>' +
        '</section>';
      document.body.appendChild(layer);
      var mode = localStorage.getItem(MODE_KEY) === "phone" ? "phone" : "code";
      function setMode(nextMode, persist) {
        mode = nextMode === "phone" ? "phone" : "code";
        if (persist !== false) localStorage.setItem(MODE_KEY, mode);
        layer.querySelectorAll("[data-jgr-mode]").forEach(function (item) {
          var active = item.getAttribute("data-jgr-mode") === mode;
          item.classList.toggle("active", active);
          item.setAttribute("aria-selected", String(active));
          item.tabIndex = active ? 0 : -1;
        });
        layer.querySelectorAll("[data-jgr-field]").forEach(function (field) { field.hidden = field.getAttribute("data-jgr-field") !== mode; });
      }
      layer.querySelectorAll("[data-jgr-mode]").forEach(function (tab) { tab.addEventListener("click", function () { setMode(tab.getAttribute("data-jgr-mode")); layer.querySelector("#jgr-" + (mode === "phone" ? "phone" : "code")).focus(); }); });
      setMode(mode, false);
      layer.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();
        var input = layer.querySelector(mode === "phone" ? "#jgr-phone" : "#jgr-code");
        var button = layer.querySelector(".jgr-login-button");
        var error = layer.querySelector(".jgr-login-error");
        var credential = mode === "phone" ? normalizePhone(input.value) : normalizeCode(input.value);
        if (mode === "phone" && !/^1\d{10}$/.test(credential)) { error.textContent = "请输入正确的11位手机号。"; input.focus(); return; }
        if (!credential) {
          error.textContent = mode === "phone" ? "请输入手机号。" : "请输入登录码。";
          input.focus();
          return;
        }
        button.disabled = true;
        button.textContent = "正在验证…";
        error.textContent = "";
        try {
          var account = await verifyCredential(mode, credential);
          document.body.classList.remove("jgr-auth-locked");
          await ensureStudentProfile(mode, credential, account);
          localStorage.setItem(MODE_KEY, mode);
          if (mode === "phone") { localStorage.setItem(PHONE_KEY, credential); localStorage.removeItem(CODE_KEY); }
          else { localStorage.setItem(CODE_KEY, credential); localStorage.removeItem(PHONE_KEY); }
          localStorage.setItem(OK_KEY, "1");
          unlock();
        } catch (err) {
          document.body.classList.add("jgr-auth-locked");
          localStorage.removeItem(CODE_KEY);
          error.textContent = /fetch|network/i.test(String(err && err.message))
            ? "暂时无法连接验证服务，请检查网络后重试。"
            : mode === "phone" ? "该手机号尚未开通初中语法重构，请联系老师授权。" : "登录码不正确，或已绑定到其他专项。";
          input.select();
        } finally {
          button.disabled = false;
          button.textContent = "验证并进入";
        }
      });
    }
    removePending();
    setTimeout(function () { layer.querySelector(localStorage.getItem(MODE_KEY) === "phone" ? "#jgr-phone" : "#jgr-code").focus(); }, 0);
  }

  async function start() {
    var theme = document.querySelector('link[href*="junior-grammar-theme.css"]');
    if (theme) document.head.appendChild(theme);
    var mode = localStorage.getItem(MODE_KEY) === "phone" ? "phone" : "code";
    var saved = mode === "phone" ? normalizePhone(localStorage.getItem(PHONE_KEY)) : normalizeCode(localStorage.getItem(CODE_KEY));
    if (!saved || localStorage.getItem(OK_KEY) !== "1") {
      showLogin();
      return;
    }
    try {
      var account = await verifyCredential(mode, saved);
      await ensureStudentProfile(mode, saved, account);
      unlock();
    } catch (err) {
      localStorage.removeItem(CODE_KEY);
      localStorage.removeItem(PHONE_KEY);
      showLogin(mode === "phone" ? "手机号登录状态已失效，请重新输入。" : "登录状态已失效，请重新输入登录码。");
    }
  }

  if (document.readyState !== "complete") window.addEventListener("load", start, { once: true });
  else start();
})();
