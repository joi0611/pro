/*
 * 打印本篇：输出整篇 A4 练习稿。
 * 正式系统的这份逻辑在 app.js 里（与登录、进度同处一个模块），
 * 单文件版没有 app.js，所以单独抽一份给打包脚本使用。
 * 两处逻辑保持一致，改动时需同步。
 */
(function () {
  var btn = document.getElementById('print-passage');
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = '1';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  btn.addEventListener('click', function () {
    var data = window.PASSAGES_DATA || [];
    var cur = document.querySelector('.picker-item.active');
    var p = data[cur ? Number(cur.dataset.passageIndex) : 0];
    if (!p) return;

    var paras = (p.paragraphs || []).map(function (par) {
      return '<p>' + esc((par.sentences || []).map(function (s) { return s.text; }).join(' ')) + '</p>';
    }).join('');

    // 摘要文里的 {{n}} 换成实线空格，学生直接在横线上写
    var summary = esc(p.summary || '').replace(/\{\{(\d+)\}\}/g, '<span class="print-blank"></span>');

    var qs = (p.questions || []).map(function (q) {
      return '<li>' + esc(q.question) + '</li>';
    }).join('');

    var pop = window.open('', '_blank', 'width=900,height=760');
    if (!pop) { alert('请允许弹出窗口后重试。'); return; }

    pop.document.open();
    pop.document.write(
      '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>' + esc(p.source) + '</title><style>' +
      '@page{size:A4;margin:16mm 15mm}*{box-sizing:border-box}' +
      'body{margin:0;color:#111;background:#fff;font-family:Arial,"Microsoft YaHei",sans-serif;font-size:13px;line-height:1.7}' +
      '.paper{max-width:760px;margin:0 auto}' +
      '.head{text-align:center;border-bottom:2px solid #111;padding-bottom:9px;margin-bottom:12px}' +
      '.head h1{margin:0 0 4px;font-size:21px}.source{margin:0;color:#444;font-size:12px}' +
      '.student{display:flex;justify-content:space-between;margin-top:12px;font-size:12px}' +
      'h2{margin:14px 0 6px;font-size:15px;border-left:4px solid #333;padding-left:8px}' +
      '.instruction{margin:0 0 8px;font-size:12.5px;color:#333}' +
      '.passage p{margin:0 0 7px;text-align:justify}' +
      '.summary{border:1px solid #666;padding:10px 12px;margin-top:6px;border-radius:4px}' +
      '.print-blank{display:inline-block;min-width:104px;border-bottom:1px solid #111;height:1.05em}' +
      'ol{margin:6px 0 0;padding-left:22px}li{margin-bottom:16px}' +
      '.answer{margin-top:14px;border-top:1px dashed #999;padding-top:8px;font-size:12px;color:#444}' +
      '@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact}}' +
      '</style></head><body><main class="paper">' +
      '<header class="head"><h1>读写题训练</h1><p class="source">' + esc(p.source) + '</p>' +
      '<div class="student"><span>姓名：____________</span><span>用时：____________</span><span>得分：____________</span></div>' +
      '</header>' +
      '<h2>第一节 缩写填空</h2>' +
      '<p class="instruction">阅读短文，根据语篇内容，在方框内的空白处，填入与短文意思最符合的单词。每空一词。</p>' +
      '<div class="passage">' + paras + '</div><div class="summary">' + summary + '</div>' +
      '<h2>第二节 语篇问答</h2>' +
      '<p class="instruction">阅读短文，根据语篇内容，回答问题。</p><ol>' + qs + '</ol>' +
      '<div class="answer"><b>参考答案</b>　填空：' +
      esc((p.blanks || []).map(function (b) { return b.no + '．' + b.answer; }).join('　')) + '<br>' +
      '问答：' + esc((p.questions || []).map(function (q) { return q.no + '．' + q.answer; }).join('　')) +
      '</div></main>' +
      '<script>window.addEventListener("load",function(){window.print();});<\/script></body></html>'
    );
    pop.document.close();
  });
})();