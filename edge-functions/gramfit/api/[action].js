const allowed = new Set(['login', 'logout', 'start', 'save']);
export async function onRequestPost({request, params}) {
  if (!allowed.has(params.action)) return new Response(null, {status:404});
  if (request.headers.get('Sec-Fetch-Site') === 'cross-site') return new Response(null, {status:403});
  const headers = new Headers();
  for (const name of ['Content-Type', 'Cookie']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  try {
    const body = await request.arrayBuffer();
    if (body.byteLength > 65536) return new Response(null, {status:413});
    const response = await fetch('https://national-origin.yunmianas.cn/gramfit/api/' + params.action,
      {method:'POST', headers, body, redirect:'manual'});
    const output = new Headers({'Cache-Control':'no-store'});
    for (const name of ['Content-Type', 'Set-Cookie']) {
      const value = response.headers.get(name);
      if (value) output.set(name, value);
    }
    return new Response(response.body, {status:response.status, headers:output});
  } catch {
    return new Response('{}', {status:502, headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  }
}
