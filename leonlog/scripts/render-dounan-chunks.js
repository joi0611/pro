const { chromium } = require('C:/Users/PC/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/PC/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe', args: ['--headless=new'] });
  const page = await browser.newPage({ viewport: { width: 415, height: 500 }, deviceScaleFactor: 1 });
  await page.goto('file:///D:/leon/斗南研学手册-已完成版.html?capture', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2500);
  const info = await page.evaluate(() => {
    const docH = document.documentElement.scrollHeight;
    const frames = [...document.querySelectorAll('.video-frame')].map((el, i) => {
      const r = el.getBoundingClientRect();
      return { index: i, top: Math.round(r.top + window.scrollY), height: Math.round(r.height), centerPct: +(((r.top + window.scrollY + r.height / 2) / docH) * 100).toFixed(3) };
    });
    const chapters = [...document.querySelectorAll('.chapter, .hero, .opening')].map(el => ({
      id: el.id || el.className,
      top: Math.round(el.getBoundingClientRect().top + window.scrollY)
    }));
    return { docH, width: document.documentElement.scrollWidth, frames, chapters };
  });
  fs.writeFileSync('D:/leon/scripts/_dounan-meta.json', JSON.stringify(info, null, 1));

  const cdp = await page.context().newCDPSession(page);
  const CHUNK = 5000;
  fs.mkdirSync('D:/leon/assets/_chunks', { recursive: true });
  for (let y = 0; y < info.docH; y += CHUNK) {
    const h = Math.min(CHUNK, info.docH - y);
    const shot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: y, width: info.width, height: h, scale: 1 }
    });
    // 一帧捕获上限：若超过会返回超大 base64，这里正常写出
    fs.writeFileSync(`D:/leon/assets/_chunks/chunk-${String(y).padStart(5, '0')}.png`, Buffer.from(shot.data, 'base64'));
    console.log('chunk at', y, 'h', h);
  }
  console.log('META', JSON.stringify(info));
  await browser.close();
})().catch(e => { console.error('RENDER ERROR:', e); process.exit(1); });