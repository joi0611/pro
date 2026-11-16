'use strict';
const { fixture } = require(process.env.QUIZ_FIXTURE || '../unified-admin/fixture.cjs');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), cp = require('node:child_process'), assert = require('node:assert/strict');
async function main() {
  const f = await fixture({ webRoot: path.resolve(__dirname, '../..') });
  const out = path.join(__dirname, '.staging'); fs.mkdirSync(out, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'unified-admin-browser-'));
  const chromePath = process.env.ADMIN_TEST_CHROME || path.join(process.env.LOCALAPPDATA, 'ms-playwright/chromium-1255/chrome-win64/chrome.exe');
  const chrome = cp.spawn(chromePath, ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'], { cwd: out, windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
  let ws;
  try {
    const address = await new Promise((resolve, reject) => {
      let text = ''; const timer = setTimeout(() => reject(Error('Browser launch timed out')), 15000);
      chrome.on('error', reject); chrome.on('exit', code => reject(Error('Browser exited: ' + code)));
      chrome.stderr.on('data', chunk => { text += chunk; const match = text.match(/DevTools listening on (ws:\/\/[^\s]+)/); if (match) { clearTimeout(timer); resolve(match[1]); } });
    });
    ws = new WebSocket(address); await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let id = 0, session; const pending = new Map(), errors = [];
    ws.onmessage = event => { const msg = JSON.parse(event.data); if (pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); clearTimeout(p.timer); msg.error ? p.reject(Error(msg.error.message)) : p.resolve(msg.result); } if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text); };
    const send = (method, params = {}, scoped = true) => new Promise((resolve, reject) => { const n = ++id, timer = setTimeout(() => { pending.delete(n); reject(Error('CDP timeout: ' + method)); }, 15000); pending.set(n, { resolve, reject, timer }); ws.send(JSON.stringify({ id: n, method, params, ...(scoped && session ? { sessionId: session } : {}) })); });
    const target = await send('Target.createTarget', { url: 'about:blank' }, false);
    session = (await send('Target.attachToTarget', { targetId: target.targetId, flatten: true }, false)).sessionId;
    await send('Page.enable'); await send('Runtime.enable');
    const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; };
    const waitFor = async expression => { for (let n = 0; n < 120; n++) { if (await evaluate(expression)) return; await new Promise(resolve => setTimeout(resolve, 100)); } console.error(await evaluate("JSON.stringify({message:document.getElementById('message')?.textContent,body:document.body.innerText.slice(0,1200)})")); throw Error('Browser condition failed: ' + expression); };
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1080, deviceScaleFactor: 1, mobile: false });

    await send('Page.navigate', { url: f.origin + '/eazycloze/' });
    await waitFor("document.readyState === 'complete' && typeof saveQuizSubmission === 'function'");
    await evaluate("document.getElementById('gatePhoneTab').click();document.getElementById('gatePhone').value='13800000001';document.getElementById('gateBtn').click()");
    await waitFor("APP_INITIALIZED && !document.body.classList.contains('gate-locked')");
    await evaluate("showView('quiz');startQuiz('ch1',0);activeQuizQuestions().forEach((q,i)=>{quizState.answers[q.no]=i?q.answer:q.options.find(o=>o.k!==q.answer).k});document.querySelector('#quizBox [data-qz=submit]').click();showQuizHome()");
    assert.equal(await evaluate("quizCourseRecord('ch1',0).history.length"),1);
    for (const [view,name] of [['quiz','courses'],['notebook','notebook'],['progress','progress']]) {
      await evaluate('showView('+JSON.stringify(view)+')');
      if(view==='progress')await evaluate("document.querySelector('#progressDashboard details').open=true");
      const desktop=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(out,name+'-desktop.png'),Buffer.from(desktop.data,'base64'));
      await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
      assert.equal(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'),true,view+' mobile overflow');
      const mobile=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(out,name+'-mobile.png'),Buffer.from(mobile.data,'base64'));
      await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1080,deviceScaleFactor:1,mobile:false});
    }
    await evaluate("showView('notebook');document.querySelector('.quiz-retry').click()");
    assert.equal(await evaluate('activeQuizQuestions().length'),1);
    assert.deepEqual(errors,[]);
    console.log('QUIZ_DESKTOP_MOBILE_BROWSER_VERIFIED '+out);
  } finally { if (ws) ws.close(); chrome.kill(); await f.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
