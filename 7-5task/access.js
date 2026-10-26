(async function () {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const PHONE_KEY = "seven_choice_phone";
  const ADMIN_TOKEN_KEY = "seven_choice_admin_token";
  const SPECIALTY = "seven_choice";
  const SPECIALTY_NAMES = { seven_choice: "中考7选5", shcloze: "上海中考完形填空" };
  let phones = [];
  let path = location.pathname;
  if (!/\.[a-z0-9]+$/i.test(path) && !path.endsWith("/")) path += "/";
  const BASE = path.replace(/\/[^/]*$/, "/");
  const HOME = BASE, LOGIN = BASE + "login.html";
  const message = text => { if ($("#message")) $("#message").textContent = text || ""; };
  async function rpc(action, payload) {
    if (typeof window.sevenChoiceRpc !== "function") throw new Error("登录服务未加载，请刷新页面");
    const data = await window.sevenChoiceRpc(action, payload || {});
    if (!data || !data.ok) throw new Error((data && data.msg) || "操作失败，请稍后再试");
    return data;
  }
  function bind(id, handler) {
    $(id)?.addEventListener("submit", async event => {
      event.preventDefault(); const button = event.target.querySelector("button");
      button.disabled = true; message("");
      try { await handler(Object.fromEntries(new FormData(event.target))); }
      catch (error) { message(error.message); }
      finally { button.disabled = false; }
    });
  }
  bind("#studentLogin", async data => {
    const phone = String(data.phone || "").replace(/\D/g, "");
    if (!/^1[3-9]\d{9}$/.test(phone)) throw new Error("请输入有效的11位手机号");
    const result = await rpc("student_login", { phone, specialty: SPECIALTY });
    localStorage.setItem(PHONE_KEY, result.phone || phone); location.href = HOME;
  });
  bind("#adminLogin", async data => {
    const result = await rpc("admin_login", { password: data.password });
    localStorage.setItem(ADMIN_TOKEN_KEY, result.token); await load();
  });
  function adminPayload(payload) { return Object.assign({}, payload || {}, { token: localStorage.getItem(ADMIN_TOKEN_KEY) || "" }); }
  function render() {
    const query = $("#phoneSearch").value.trim().toLowerCase();
    const rows = phones.filter(item => (item.phone + " " + (SPECIALTY_NAMES[item.specialty] || item.specialty || "") + " " + (item.note || "")).toLowerCase().includes(query));
    $("#phoneCount").textContent = phones.length; $("#phoneRows").replaceChildren(); $("#noPhones").hidden = rows.length > 0;
    for (const item of rows) {
      const tr = document.createElement("tr");
      for (const value of [item.phone, SPECIALTY_NAMES[item.specialty] || item.specialty || "-", item.note || ""]) { const td = document.createElement("td"); td.textContent = value; tr.append(td); }
      const td = document.createElement("td"), button = document.createElement("button");
      button.type = "button"; button.textContent = "撤销授权";
      button.onclick = async () => {
        if (!confirm("撤销 " + item.phone + " 的授权？")) return;
        button.disabled = true;
        try { await rpc("admin_delete", adminPayload({ phone: item.phone })); await load(); message("已撤销授权"); }
        catch (error) { message(error.message); button.disabled = false; }
      };
      td.append(button); tr.append(td); $("#phoneRows").append(tr);
    }
  }
  async function load() {
    const result = await rpc("admin_list", adminPayload()); phones = result.users || [];
    $("#adminLogin").hidden = true; $("#management").hidden = false; render();
  }
  bind("#authorizePhone", async data => {
    const phone = String(data.phone || "").replace(/\D/g, "");
    if (!/^1[3-9]\d{9}$/.test(phone)) throw new Error("请输入有效的11位手机号");
    await rpc("admin_add", adminPayload({ phone, specialty: data.specialty, note: String(data.note || "").slice(0, 80) }));
    $("#authorizePhone").reset(); await load(); message("授权已保存，学生现在可以使用该手机号登录。");
  });
  $("#phoneSearch")?.addEventListener("input", render);
  $("#adminLogout")?.addEventListener("click", async () => {
    try { await window.sevenChoiceRpc("admin_logout", adminPayload()); } catch {}
    localStorage.removeItem(ADMIN_TOKEN_KEY); location.reload();
  });
  try {
    if ($("#management") && localStorage.getItem(ADMIN_TOKEN_KEY)) await load();
    const link = $("#accountLink");
    if (link) {
      const phone = localStorage.getItem(PHONE_KEY);
      if (!phone) { location.href = LOGIN; return; }
      const result = await rpc("student_login", { phone, specialty: SPECIALTY }), validPhone = result.phone || phone;
      link.textContent = validPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") + " · 退出";
      link.onclick = event => { event.preventDefault(); localStorage.removeItem(PHONE_KEY); location.href = LOGIN; };
    }
  } catch (error) {
    if ($("#management")) { localStorage.removeItem(ADMIN_TOKEN_KEY); $("#adminLogin").hidden = false; $("#management").hidden = true; }
    else if ($("#accountLink")) { localStorage.removeItem(PHONE_KEY); location.href = LOGIN; }
    message(error.message || "无法连接登录服务，请稍后重试");
  }
})();
