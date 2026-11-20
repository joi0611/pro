/* 阅读还原 · 手机号登录
 * 与站内其他专项一致：手机号 + reading_restoration 授权，由教师后台开通。
 * 生产环境只出现手机号登录；localhost / 127.0.0.1 / file:// 额外提供本地预览。
 */
(async function () {
  "use strict";

  var PHONE_KEY = "seven_choice_phone";
  var PHONE_PATTERN = /^1[3-9]\d{9}$/;
  var SUPABASE_URL = "https://gbjmylxohacppnybfssh.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdiam15bHhvaGFjcHBueWJmc3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDA1NzgsImV4cCI6MjA5ODI3NjU3OH0.mz5srsxdbZa4__oqKjlcysWuDo00w7UQaV8n2VNP4eE";
  var SYSTEM_TYPE = "reading_restoration";
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:";
  var $ = function (selector) { return document.querySelector(selector); };

  function message(text) {
    var node = $("#message");
    if (node) node.textContent = text || "";
  }

  function maskPhone(phone) {
    return String(phone || "").replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }

  function readPhone() {
    try { return localStorage.getItem(PHONE_KEY) || ""; } catch (_) { return ""; }
  }

  function savePhone(phone) {
    try { localStorage.setItem(PHONE_KEY, phone); } catch (_) {}
  }

  function clearPhone() {
    try { localStorage.removeItem(PHONE_KEY); } catch (_) {}
  }

  async function callRpc(functionName, payload) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 15000);
    try {
      var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + functionName, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload || {}),
        signal: controller.signal
      });
      var text = await response.text();
      var data = null;
      if (text) {
        try { data = JSON.parse(text); } catch (_) { data = text; }
      }
      if (!response.ok) {
        var raw = data && (data.message || data.error) ? data.message || data.error : "云端连接失败，请稍后再试。";
        throw new Error(raw);
      }
      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  async function verifyPhone(phone) {
    var data = await callRpc("verify_phone_access", {
      input_phone: phone,
      input_system_type: SYSTEM_TYPE
    });
    var row = Array.isArray(data) ? data[0] : data;
    if (!row || (!row.phone_account_id && !row.access_code_id)) throw new Error("PHONE_NOT_OPEN");
    return row;
  }

  function humanError(error) {
    var text = String((error && error.message) || "");
    if (/PHONE_NOT_OPEN/.test(text)) return "该手机号尚未开通「阅读还原」，请联系老师开通。";
    if (/INVALID_PHONE/.test(text)) return "请输入正确的 11 位手机号。";
    if (/PHONE_ACCESS_NOT_FOUND/.test(text)) return "该手机号还没有开通记录，请联系老师。";
    if (/expired|过期/i.test(text)) return "这条手机号授权已过期，请联系老师续期。";
    if (/abort/i.test(text)) return "验证超时，请检查网络后重试。";
    if (/fetch|network|Failed to fetch|网络/i.test(text)) return "暂时无法连接验证服务，请检查网络后重试。";
    return text || "登录失败，请稍后再试。";
  }

  /* ---------- 登录页 ---------- */
  var form = $("#studentLogin");
  if (form) {
    if (LOCAL) {
      var localBox = $("#localPreview");
      if (localBox) localBox.hidden = false;
    }
    var preview = $("#previewBtn");
    if (preview) {
      preview.addEventListener("click", function () {
        savePhone("preview");
        location.href = "./index.html";
      });
    }
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var phone = String(new FormData(form).get("phone") || "").replace(/\D/g, "");
      if (!PHONE_PATTERN.test(phone)) {
        message("请输入有效的11位手机号");
        return;
      }
      var button = form.querySelector("button");
      button.disabled = true;
      message("");
      try {
        await verifyPhone(phone);
        savePhone(phone);
        location.href = "./index.html";
      } catch (error) {
        message(humanError(error));
        button.disabled = false;
      }
    });
  }

  /* ---------- 模块首页 ---------- */
  var accountLink = $("#accountLink");
  if (accountLink) {
    var phone = readPhone();
    if (!phone) {
      location.href = "./login.html";
      return;
    }
    if (phone === "preview" && LOCAL) {
      accountLink.textContent = "本地预览 · 退出";
      accountLink.onclick = function (event) {
        event.preventDefault();
        clearPhone();
        location.href = "./login.html";
      };
      return;
    }
    try {
      await verifyPhone(phone);
      accountLink.textContent = maskPhone(phone) + " · 退出";
      accountLink.onclick = function (event) {
        event.preventDefault();
        clearPhone();
        location.href = "./login.html";
      };
    } catch (error) {
      clearPhone();
      location.href = "./login.html";
    }
  }
})();
