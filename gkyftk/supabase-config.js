(function () {
  "use strict";
  const endpoint = "https://gbjmylxohacppnybfssh.supabase.co/rest/v1/rpc/training_api";
  const publicKey = "sb_publishable_qhB54NbaSS2bRDw0ehKGbA_7kHXkhTQ";
  window.sevenChoiceRpc = async function (action, payload) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json", apikey: publicKey },
        body: JSON.stringify({ p_action: action, p_payload: payload || {} })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || data.msg || "登录服务暂时不可用，请稍后再试。");
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
