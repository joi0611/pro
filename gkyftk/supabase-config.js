(function () {
  "use strict";
  // 高考语法填空 · 登录接口配置
  // ------------------------------------------------------------------
  // 全部走腾讯云自建后端，不使用 Supabase。
  //
  // 链路：
  //   浏览器 → /three-api/national_grammar/rpc
  //          → EdgeOne middleware rewrite
  //          → national-origin.yunmianas.cn (162.14.75.14)
  //          → Caddy → 127.0.0.1:8789 (three-sites server.cjs)
  //          → SQLite
  //
  // 注意：网关的请求体格式是 { action, payload }，
  //      不是 Supabase 的 { p_action, p_payload }。
  //
  // 必须通过 https://pro.yunmianas.cn/gkyftk/ 访问：
  // 网关校验 Origin，只接受同域请求，file:// 直开会登录失败。
  // ------------------------------------------------------------------
  const GATEWAY = "/three-api/national_grammar/rpc";
  const SPECIALTY = "national_grammar";

  window.sevenChoiceRpc = async function (action, payload) {
    if (location.protocol === "file:") {
      throw new Error("请通过 https://pro.yunmianas.cn/gkyftk/ 访问本页面，本地直接打开无法登录。");
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(GATEWAY, {
        method: "POST",
        signal: controller.signal,
        credentials: "same-origin",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: action,
          payload: Object.assign({ specialty: SPECIALTY }, payload || {})
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || data.msg || "登录服务暂时不可用，请稍后再试。");
      }
      // 网关对「手机号未开通」这类业务失败仍返回 HTTP 200，
      // 只在响应体里给 ok:false。必须查 ok，否则未开通号码会被当成登录成功。
      if (data && data.ok === false) {
        throw new Error(data.msg || data.message || "该手机号尚未开通，请联系老师。");
      }
      return data;
    } catch (error) {
      if (error.name === "AbortError" || error instanceof TypeError) {
        throw new Error("无法连接登录服务，请检查网络后重试。");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  };
})();
