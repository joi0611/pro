(function () {
  "use strict";

  const SYSTEM_NAMES = {
    cloze: "完形填空",
    grammar: "语法填空",
    "reading-comprehension": "阅读理解",
    "reading-writing": "读写题",
    vocabulary: "单词训练",
    word_choice: "选词填空"
  };

  function normalizeName(value) {
    return String(value || "").replace(/[<>&"'`]/g, "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 20);
  }

  function cacheKey(code) {
    return "student_name_bound_20260828_" + String(code || "");
  }

  function readCachedName(code) {
    try { return normalizeName(localStorage.getItem(cacheKey(code))); } catch (_) { return ""; }
  }

  function cacheName(code, name) {
    try { localStorage.setItem(cacheKey(code), normalizeName(name)); } catch (_) {}
  }

  function injectStyle() {
    if (document.getElementById("studentProfileStyle")) return;
    const style = document.createElement("style");
    style.id = "studentProfileStyle";
    style.textContent = `
      .student-profile-mask{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:20px;background:rgba(31,20,49,.58);backdrop-filter:blur(6px)}
      .student-profile-card{width:min(440px,100%);padding:28px;border:1px solid rgba(117,83,166,.22);border-radius:18px;background:#fff;box-shadow:0 24px 70px rgba(42,25,65,.26);color:#1e1728}
      .student-profile-card h2{margin:0 0 10px;font-size:24px}.student-profile-card p{margin:0 0 18px;line-height:1.7;color:#665c70}
      .student-profile-card label{display:block;margin-bottom:8px;font-weight:700}.student-profile-card input{box-sizing:border-box;width:100%;min-height:48px;padding:10px 13px;border:1px solid #cbb9e4;border-radius:10px;font:inherit;outline:none}
      .student-profile-card input:focus{border-color:#7655a6;box-shadow:0 0 0 3px rgba(118,85,166,.13)}
      .student-profile-error{min-height:24px;margin:8px 0 0!important;color:#b42318!important}.student-profile-confirm-name{padding:13px;border-radius:10px;background:#f5effc;text-align:center;font-size:20px;font-weight:800;color:#5f3f8a}
      .student-profile-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}.student-profile-actions button{min-height:44px;padding:9px 18px;border:1px solid #7655a6;border-radius:10px;background:#fff;color:#5f3f8a;font:inherit;font-weight:700;cursor:pointer}
      .student-profile-actions .primary{background:#7655a6;color:#fff}.student-profile-actions button:disabled{opacity:.55;cursor:wait}
    `;
    document.head.appendChild(style);
  }

  function askName() {
    injectStyle();
    return new Promise(resolve => {
      const mask = document.createElement("div");
      mask.className = "student-profile-mask";
      mask.innerHTML = `<form class="student-profile-card"><h2>首次登录，请填写姓名</h2><p>姓名将与当前登录码绑定，用于生成你的专属训练系统。</p><label for="studentProfileName">学生姓名</label><input id="studentProfileName" maxlength="20" autocomplete="name" placeholder="请输入姓名"><p class="student-profile-error" aria-live="polite"></p><div class="student-profile-actions"><button class="primary" type="submit">下一步</button></div></form>`;
      document.body.appendChild(mask);
      const form = mask.querySelector("form");
      const input = mask.querySelector("input");
      const error = mask.querySelector(".student-profile-error");
      input.focus();
      form.addEventListener("submit", event => {
        event.preventDefault();
        const name = normalizeName(input.value);
        if (!name) { error.textContent = "请输入姓名。"; input.focus(); return; }
        if (name !== String(input.value || "").replace(/\s+/g, " ").trim()) { error.textContent = "姓名中不能包含特殊符号。"; input.focus(); return; }
        mask.remove();
        resolve(name);
      });
    });
  }

  function confirmName(name) {
    injectStyle();
    return new Promise(resolve => {
      const mask = document.createElement("div");
      mask.className = "student-profile-mask";
      mask.innerHTML = `<section class="student-profile-card" role="dialog" aria-modal="true"><h2>请再次确认</h2><p>确认后姓名将与登录码永久绑定，无法修改。</p><div class="student-profile-confirm-name"></div><p class="student-profile-error" aria-live="polite"></p><div class="student-profile-actions"><button type="button" data-action="back">返回修改</button><button class="primary" type="button" data-action="confirm">确认姓名</button></div></section>`;
      mask.querySelector(".student-profile-confirm-name").textContent = name;
      document.body.appendChild(mask);
      mask.querySelector('[data-action="back"]').onclick = () => { mask.remove(); resolve(false); };
      mask.querySelector('[data-action="confirm"]').onclick = () => { mask.remove(); resolve(true); };
    });
  }

  async function collectConfirmedName() {
    while (true) {
      const name = await askName();
      if (await confirmName(name)) return name;
    }
  }

  async function ensure(options) {
    const code = String(options.code || "");
    let name = normalizeName(options.account && options.account.student_name) || readCachedName(code);
    if (name) {
      cacheName(code, name);
      if (!(options.account && options.account.student_name) && options.bindName) {
        try {
          const result = await options.bindName(name);
          const row = Array.isArray(result) ? result[0] : result;
          name = normalizeName(row && row.student_name) || name;
          cacheName(code, name);
        } catch (_) {}
      }
      return name;
    }

    const requestedName = await collectConfirmedName();
    if (options.bindName) {
      const result = await options.bindName(requestedName);
      const row = Array.isArray(result) ? result[0] : result;
      name = normalizeName(row && row.student_name);
      if (!name) throw new Error("姓名绑定失败，请稍后重试。");
    } else {
      name = requestedName;
    }
    cacheName(code, name);
    return name;
  }

  function applyBrand(name, systemType, root) {
    const display = `${normalizeName(name)}学生（${SYSTEM_NAMES[systemType] || systemType}）专属训练系统`;
    (root || document).querySelectorAll(".student-system-brand").forEach(element => { element.textContent = display; });
    return display;
  }

  window.StudentProfile = { ensure, applyBrand, normalizeName, systemNames: SYSTEM_NAMES };
})();
