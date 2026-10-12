function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map(function (value) { return value.toString(16).padStart(2, "0"); })
    .join("");
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const code = String(body.code || "").trim().toUpperCase();

    if (!code) {
      return json({ ok: false, msg: "请输入激活码" }, 400);
    }

    if (!/^[A-Z0-9]{8,32}$/.test(code)) {
      return json({ ok: false, msg: "激活码格式不正确" }, 400);
    }

    const env = context.env || {};
    const supabaseUrl = String(env.SUPABASE_URL || "").replace(/\/+$/, "");
    const supabaseKey = String(env.SUPABASE_KEY || "");
    const region = String(env.REGION || "national");

    if (!supabaseUrl || !supabaseKey) {
      return json({ ok: false, msg: "激活服务尚未完成配置" }, 500);
    }

    const headers = {
      apikey: supabaseKey,
      Authorization: "Bearer " + supabaseKey,
      Accept: "application/json",
    };

    const configUrl = supabaseUrl +
      "/rest/v1/activation_config?region=eq." + encodeURIComponent(region) +
      "&select=salt";
    const configResponse = await fetch(configUrl, { headers: headers });

    if (!configResponse.ok) {
      throw new Error("activation_config " + configResponse.status);
    }

    const configRows = await configResponse.json();
    const salt = Array.isArray(configRows) && configRows[0] && configRows[0].salt;

    if (!salt) {
      throw new Error("缺少 " + region + " 的 salt");
    }

    const codeHash = await sha256(salt + "::" + code + "::" + salt);
    const codeUrl = supabaseUrl +
      "/rest/v1/activation_codes?region=eq." + encodeURIComponent(region) +
      "&code_hash=eq." + codeHash +
      "&select=code_hash";
    const codeResponse = await fetch(codeUrl, { headers: headers });

    if (!codeResponse.ok) {
      throw new Error("activation_codes " + codeResponse.status);
    }

    const rows = await codeResponse.json();

    if (Array.isArray(rows) && rows.length > 0) {
      return json({ ok: true });
    }

    return json({ ok: false, msg: "激活码无效，请核对后重试" });
  } catch (error) {
    console.error("activate error:", error);
    return json({ ok: false, msg: "激活服务暂时不可用，请稍后重试" }, 500);
  }
}

export function onRequestGet() {
  return json({ ok: false, msg: "请通过 POST 请求验证激活码" }, 405);
}
