(function () {
  'use strict';
  const { sites, createClient } = window.TrainingAdmin;
  let storage;
  try { storage = window.sessionStorage; } catch (_) {}
  const client = createClient({ storage }), $ = id => document.getElementById(id);
  const names = Object.fromEntries(sites.map(s => [s.id, s.name]));
  const groupNames = { national: '全国完形', three: '广州 / 上海 / 7选5', legacy: '全国语法填空' };
  let results = [], rows = [], busy = false, loggedOut = false, signedIn = false;
  let selected = new URLSearchParams(location.search).get('specialty') || 'all';
  if (selected !== 'all' && !names[selected]) selected = 'all';
  function message(text, success = false) { $('message').textContent = text || ''; $('message').classList.toggle('success', success); }
  function available(group) { return signedIn && results.some(r => r.group === group && r.ok); }
  function showSession() {
    const any = signedIn && results.some(r => r.ok), all = results.length === 3 && results.every(r => r.ok);
    $('workspace').hidden = !any; $('logout').hidden = !any; $('loginPanel').hidden = any;
    $('reconnect').hidden = !any || all;
    $('loginHint').textContent = '每次打开或刷新本页面，均需先输入管理员密码。';
  }
  function render() {
    const total = rows.length, enabled = rows.filter(r => r.enabled).length;
    $('totalCount').textContent = total; $('enabledCount').textContent = enabled; $('disabledCount').textContent = total - enabled; $('codeCount').textContent = rows.filter(r => r.kind === 'code').length;
    $('serviceStatus').replaceChildren();
    for (const result of results) {
      const el = document.createElement('span'); el.className = 'service-chip' + (result.ok ? '' : ' failed');
      el.textContent = groupNames[result.group] + (result.ok ? ' · 已连接' : ' · ' + result.error.message);
      $('serviceStatus').append(el);
    }
    for (const checkbox of $('specialtyChoices').querySelectorAll('input')) checkbox.disabled = busy || !available(sites.find(s => s.id === checkbox.value).group);
    $('codeSubmit').disabled = busy || !available('national');
    $('rows').replaceChildren();
    const query = $('search').value.trim().toLowerCase();
    const filtered = rows.filter(row => (selected === 'all' || selected === row.specialty) && ($('kindFilter').value === 'all' || $('kindFilter').value === row.kind) && ($('stateFilter').value === 'all' || row.enabled === ($('stateFilter').value === 'enabled')) && [row.phone, row.id, row.note, names[row.specialty]].join(' ').toLowerCase().includes(query));
    const partial = results.some(r => !r.ok);
    $('resultSummary').textContent = '显示 ' + filtered.length + ' 条 / 已载入 ' + total + ' 条授权' + (partial ? '（部分专项未载入）' : '');
    $('empty').hidden = filtered.length > 0;
    $('empty').textContent = partial ? '当前筛选下暂无已载入授权，请确认所选专项已连接。' : '暂无符合条件的授权';
    for (const row of filtered) {
      const tr = document.createElement('tr');
      const cell = (text, className) => { const el = document.createElement('td'); el.textContent = text; if (className) el.className = className; tr.append(el); return el; };
      const identity = cell(row.kind === 'code' ? '编号 ' + row.id : row.phone), type = document.createElement('span'); type.className = 'account-kind'; type.textContent = row.kind === 'code' ? '登录码' : '手机号'; identity.append(type);
      cell(names[row.specialty]); cell(row.note || '—', 'note');
      const badge = document.createElement('span'); badge.className = 'badge' + (row.enabled ? '' : ' disabled'); badge.textContent = row.enabled ? '已启用' : '已停用'; cell('').append(badge);
      cell(row.createdAt && Number.isFinite(Date.parse(row.createdAt)) ? new Date(row.createdAt).toLocaleDateString('zh-CN') : '—', 'time');
      const actions = cell('', 'actions');
      const action = (label, fn, warning) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.disabled = busy; if (warning) b.className = 'warn'; b.onclick = fn; actions.append(b); };
      action('改备注', () => { const note = prompt('修改备注（最多80字）', row.note || ''); if (note !== null) run(async () => { await client.update(row, { note }); return '备注已保存'; }); });
      action(row.enabled ? '停用' : '启用', () => run(async () => { await client.update(row, { enabled: !row.enabled }); return row.enabled ? '已停用该专项授权，学习记录保留' : '已启用该专项授权'; }), row.enabled);
      if (row.kind === 'code') action('重置设备', () => { if (confirm('确认重置此登录码的设备绑定？学习记录会保留。')) run(async () => { await client.update(row, { resetDevices: true }); return '设备绑定已重置'; }); });
      ['账号', '专项', '备注', '状态', '开通时间', '操作'].forEach((label, i) => { tr.children[i].dataset.label = label; });
      $('rows').append(tr);
    }
    for (const button of $('tabs').children) button.setAttribute('aria-pressed', String(button.dataset.site === selected));
  }
  async function refresh() {
    if (!signedIn) { results = []; rows = []; showSession(); render(); return; }
    results = await client.list();
    if (loggedOut) return;
    rows = results.flatMap(r => r.rows || []); showSession(); render();
  }
  function controls(disabled) { busy = disabled; for (const el of document.querySelectorAll('button')) el.disabled = disabled; render(); }
  async function run(fn) {
    if (busy) return;
    if (!signedIn) { message('请先输入管理员密码登录'); return; }
    controls(true); message('');
    try {
      const result = await fn();
      await refresh();
      const failed = results.filter(r => !r.ok);
      const text = typeof result === 'string' ? result : result.text;
      message(text + (failed.length ? '\n部分专项列表未刷新成功，请检查连接状态后再操作。' : ''), !failed.length && (typeof result === 'string' || result.ok));
    } catch (error) { message(error.message); }
    finally { controls(false); }
  }
  for (const site of sites) {
    const label = document.createElement('label'); label.className = 'choice';
    const input = document.createElement('input'); input.type = 'checkbox'; input.name = 'specialty'; input.value = site.id; label.append(input, document.createTextNode(site.name)); $('specialtyChoices').append(label);
  }
  for (const site of [{ id: 'all', name: '全部专项' }, ...sites]) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'tab'; button.dataset.site = site.id; button.textContent = site.name;
    button.onclick = () => { selected = site.id; const url = new URL(location.href); selected === 'all' ? url.searchParams.delete('specialty') : url.searchParams.set('specialty', selected); history.replaceState(null, '', url); render(); };
    $('tabs').append(button);
  }
  $('loginForm').onsubmit = async event => {
    event.preventDefault(); if (busy) return;
    signedIn = false; results = []; rows = []; showSession();
    controls(true); message('正在连接管理服务…');
    let password = $('password').value; $('password').value = '';
    try {
      loggedOut = false;
      const login = await client.login(password); password = '';
      signedIn = login.some(r => r.ok);
      await refresh();
      const errors = login.filter(r => !r.ok);
      message(errors.length ? errors.map(r => groupNames[r.group] + '：' + r.error.message).join('\n') : '登录成功，所有专项已连接', !errors.length);
    } catch (error) { message(error.message); }
    finally { password = ''; controls(false); }
  };
  $('authorizeForm').onsubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target), phone = String(form.get('phone') || '').trim(), note = String(form.get('note') || '').trim();
    const chosen = form.getAll('specialty').filter(id => available(sites.find(s => s.id === id).group));
    if (!chosen.length) { message('请至少选择一个已连接的专项'); return; }
    run(async () => {
      const saved = await Promise.allSettled(chosen.map(specialty => client.authorize({ phone, specialty, note })));
      const success = [], failures = [];
      saved.forEach((r, i) => { if (r.status === 'fulfilled') success.push(names[chosen[i]]); else failures.push(names[chosen[i]] + '：' + r.reason.message); });
      if (!failures.length) $('authorizeForm').reset();
      return { text: (success.length ? '授权已保存：' + success.join('、') : '授权未保存') + (failures.length ? '\n未完成：' + failures.join('；') + '\n已成功的专项无需重复开通。' : ''), ok: failures.length === 0 };
    });
  };
  $('codeForm').onsubmit = event => { event.preventDefault(); const form = new FormData(event.target); run(async () => { await client.saveCode({ code: form.get('code'), note: form.get('note') }); $('codeForm').reset(); return '登录码已保存'; }); };
  $('refresh').onclick = () => run(async () => '账号列表已刷新');
  $('search').oninput = render; $('kindFilter').onchange = render; $('stateFilter').onchange = render;
  $('logout').onclick = async () => {
    if (busy) return;
    controls(true);
    try {
      signedIn = false; rows = []; results = []; showSession(); render();
      const outcome = await client.logout(); loggedOut = true;
      const failed = outcome.filter(r => !r.ok);
      message(failed.length ? '页面已退出，但部分服务未确认注销。请重试登录后退出，以清除服务器会话。' : '已退出管理', !failed.length);
    } finally { controls(false); }
  };
  $('reconnect').onclick = () => {
    if (busy) return;
    signedIn = false; rows = []; results = []; showSession(); render(); message('请输入管理员密码重新连接专项。'); $('password').focus();
  };
  controls(true);
  document.documentElement.dataset.adminReady = 'true';
  // Never request internal authorization lists before this page's explicit login.
  showSession(); controls(false);
})();
