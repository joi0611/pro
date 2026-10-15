(function () {
  "use strict";

  var SUPABASE_URL = "https://gbjmylxohacppnybfssh.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_qhB54NbaSS2bRDw0ehKGbA_7kHXkhTQ";

  window.shclozeRpc = function (action, payload) {
    return fetch(SUPABASE_URL + "/rest/v1/rpc/shcloze_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_PUBLISHABLE_KEY
      },
      body: JSON.stringify({ p_action: action, p_payload: payload || {} })
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (!response.ok) throw new Error((data && (data.message || data.msg)) || "数据库连接失败");
        return data || {};
      });
    });
  };
})();
