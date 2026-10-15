(function () {
  "use strict";
  var users = [];
  var toastTimer = null;
  function $(id) { return document.getElementById(id); }

  function api(url, options) {
    options = options || {};
    options.headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
    return fetch(url, options).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (response.status === 401) { showLogin("登录已失效，请重新登录"); throw new Error("登录已失效"); }
        if (!response.ok || !data.ok) throw new Error(data.msg || "操作失败，请稍后重试");
        return data;
      });
    });
  }

  function setMessage(id, text, ok) {
    var node = $(id);
    if (!node) return;
    node.textContent = text || "";
    node.className = "form-msg" + (ok ? " ok" : "");
  }

  function toast(text) {
    var node = $("toast");
    node.textContent = text; node.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { node.hidden = true; }, 2400);
  }

  function setBusy(button, busy, idleText, busyText) {
    button.disabled = busy;
    button.textContent = busy ? busyText : idleText;
  }

  function showLogin(message) {
    $("appView").hidden = true; $("loginView").hidden = false;
    if (message) setMessage("loginMsg", message, false);
    setTimeout(function () { $("adminPassword").focus(); }, 0);
  }

  function showApp() {
    $("loginView").hidden = true; $("appView").hidden = false;
    loadUsers();
  }

  function formatDate(value) {
    if (!value) return "—";
    var date = new Date(value);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  function makeButton(label, className, onClick) {
    var button = document.createElement("button");
    button.type = "button"; button.className = "row-btn" + (className ? " " + className : "");
    button.textContent = label; button.addEventListener("click", onClick);
    return button;
  }

  function updateStats() {
    $("enabledCount").textContent = users.filter(function (user) { return user.enabled; }).length;
    $("disabledCount").textContent = users.filter(function (user) { return !user.enabled; }).length;
  }

  function renderUsers() {
    var query = $("phoneSearch").value.trim().toLowerCase();
    var filtered = users.filter(function (user) {
      return !query || user.phone.indexOf(query) >= 0 || String(user.note || "").toLowerCase().indexOf(query) >= 0;
    });
    $("resultSummary").textContent = query ? "找到 " + filtered.length + " 个手机号" : "共 " + users.length + " 个手机号";
    $("emptyState").hidden = filtered.length > 0;
    var body = $("phoneList");
    body.textContent = "";

    filtered.forEach(function (user) {
      var row = document.createElement("tr");
      var phoneCell = document.createElement("td");
      phoneCell.className = "phone-cell"; phoneCell.dataset.label = "手机号"; phoneCell.textContent = user.phone;

      var noteCell = document.createElement("td");
      noteCell.dataset.label = "备注";
      var noteInput = document.createElement("input");
      noteInput.className = "note-input"; noteInput.type = "text"; noteInput.maxLength = 80;
      noteInput.value = user.note || ""; noteInput.placeholder = "添加备注";
      noteInput.setAttribute("aria-label", "编辑 " + user.phone + " 的备注");
      noteCell.appendChild(noteInput);

      var statusCell = document.createElement("td");
      statusCell.dataset.label = "状态";
      var status = document.createElement("span");
      status.className = "status" + (user.enabled ? "" : " disabled");
      status.textContent = user.enabled ? "已启用" : "已停用";
      statusCell.appendChild(status);

      var dateCell = document.createElement("td");
      dateCell.className = "date-cell"; dateCell.dataset.label = "开通时间"; dateCell.textContent = formatDate(user.createdAt);

      var actionsCell = document.createElement("td");
      actionsCell.className = "actions-cell"; actionsCell.dataset.label = "操作";
      var actions = document.createElement("div"); actions.className = "row-actions";
      actions.appendChild(makeButton("保存备注", "", function () {
        patchUser(user.phone, { note: noteInput.value.trim() }, "备注已保存");
      }));
      actions.appendChild(makeButton(user.enabled ? "停用" : "恢复", "", function () {
        patchUser(user.phone, { enabled: !user.enabled }, user.enabled ? "手机号已停用" : "手机号已恢复");
      }));
      actions.appendChild(makeButton("删除", "danger", function () {
        if (!window.confirm("确定删除手机号 " + user.phone + "？删除后该账号将立即退出且无法登录。")) return;
        api("/api/admin/phones/" + user.phone, { method: "DELETE" }).then(function () {
          users = users.filter(function (item) { return item.phone !== user.phone; });
          updateStats(); renderUsers(); toast("手机号已删除");
        }).catch(function (error) { toast(error.message); });
      }));
      actionsCell.appendChild(actions);
      [phoneCell, noteCell, statusCell, dateCell, actionsCell].forEach(function (cell) { row.appendChild(cell); });
      body.appendChild(row);
    });
  }

  function patchUser(phone, changes, successText) {
    api("/api/admin/phones/" + phone, { method: "PATCH", body: JSON.stringify(changes) }).then(function (data) {
      users = users.map(function (item) { return item.phone === phone ? data.user : item; });
      updateStats(); renderUsers(); toast(successText);
    }).catch(function (error) { toast(error.message); });
  }

  function loadUsers() {
    api("/api/admin/phones").then(function (data) {
      users = data.users || []; updateStats(); renderUsers();
    }).catch(function (error) { if (error.message !== "登录已失效") toast(error.message); });
  }

  $("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var input = $("adminPassword"), button = $("loginSubmit"), password = input.value;
    if (!password) { input.setAttribute("aria-invalid", "true"); setMessage("loginMsg", "请输入管理员密码", false); input.focus(); return; }
    input.removeAttribute("aria-invalid"); setMessage("loginMsg", "", false);
    setBusy(button, true, "进入管理后台", "正在登录…");
    api("/api/admin/login", { method: "POST", body: JSON.stringify({ password: password }) }).then(function () {
      input.value = ""; showApp();
    }).catch(function (error) {
      setMessage("loginMsg", error.message, false); input.focus();
    }).finally(function () { setBusy(button, false, "进入管理后台", "正在登录…"); });
  });

  $("openForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var input = $("newPhone"), note = $("newNote"), button = $("openSubmit");
    var phone = input.value.replace(/\D/g, "");
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      input.setAttribute("aria-invalid", "true"); setMessage("openMsg", "请输入正确的 11 位手机号", false); input.focus(); return;
    }
    input.removeAttribute("aria-invalid"); setMessage("openMsg", "", false);
    setBusy(button, true, "开通手机号", "正在开通…");
    api("/api/admin/phones", { method: "POST", body: JSON.stringify({ phone: phone, note: note.value.trim() }) }).then(function (data) {
      users.unshift(data.user); updateStats(); renderUsers();
      input.value = ""; note.value = ""; setMessage("openMsg", "手机号 " + phone + " 已开通，可直接登录。", true); input.focus();
    }).catch(function (error) {
      setMessage("openMsg", error.message, false); input.focus();
    }).finally(function () { setBusy(button, false, "开通手机号", "正在开通…"); });
  });

  $("newPhone").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 11);
    this.removeAttribute("aria-invalid"); setMessage("openMsg", "", false);
  });
  $("newPhone").addEventListener("blur", function () {
    if (this.value && !/^1[3-9]\d{9}$/.test(this.value)) {
      this.setAttribute("aria-invalid", "true"); setMessage("openMsg", "请输入正确的 11 位手机号", false);
    }
  });
  $("phoneSearch").addEventListener("input", renderUsers);
  $("logoutBtn").addEventListener("click", function () {
    api("/api/admin/logout", { method: "POST" }).finally(function () { users = []; showLogin(); });
  });

  fetch("/api/admin/session", { cache: "no-store" }).then(function (response) { return response.json(); }).then(function (data) {
    if (data && data.loggedIn) showApp(); else showLogin();
  }).catch(function () { showLogin("无法连接管理服务，请稍后刷新"); });
})();
