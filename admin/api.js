(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TrainingAdmin = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const sites = [
    { id: 'national_cloze', name: '全国完形填空', group: 'national', url: '/eazycloze/' },
    { id: 'gzcloze', name: '广州完形填空', group: 'three', url: '/gzcloze/' },
    { id: 'shcloze', name: '上海完形填空', group: 'three', url: '/shcloze/' },
    { id: 'seven_choice', name: '全国中考7选5', group: 'three', url: '/7-5task/' },
    { id: 'national_grammar', name: '全国语法填空', group: 'legacy' }
  ];
  const groups = ['national', 'three', 'legacy'];
  function createClient(options = {}) {
    const transport = options.fetch || globalThis.fetch.bind(globalThis);
    const storage = options.storage;
    const key = 'unified_training_admin_legacy_token';
    let token = '';
    try { token = storage?.getItem(key) || ''; } catch (_) {}
    const remember = value => { token = value; try { value ? storage?.setItem(key, value) : storage?.removeItem(key); } catch (_) {} };
    async function request(url, payload, headers = {}) {
      const controller = new AbortController(), timer = setTimeout(() => controller.abort(), options.timeout || 20000);
      try {
        const r = await transport(url, { method: 'POST', credentials: 'same-origin', cache: 'no-store',
          headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(payload), signal: controller.signal });
        let data;
        try { data = await r.json(); } catch (_) { throw new Error('服务返回异常，请稍后刷新'); }
        if (!r.ok || data?.ok === false) {
          const error = new Error(data?.msg || data?.message || '操作未完成');
          error.status = Number(data?.code) || r.status;
          throw error;
        }
        return data;
      } catch (error) {
        if (error.name === 'AbortError') throw new Error('连接超时，请稍后重试');
        if (error instanceof TypeError) throw new Error('网络连接失败，请稍后重试');
        throw error;
      } finally { clearTimeout(timer); }
    }
    const national = (action, payload = {}) => request('/national-api/admin/' + action, payload);
    const three = (action, payload = {}) => request('/three-api/seven_choice/rpc', { action: 'admin_' + action, payload });
    const legacy = (action, payload = {}) => request('/training-backend/rest/v1/rpc/training_api', {
      p_action: 'admin_' + action, p_payload: { ...payload, specialty: 'national_grammar', token }
    }, { apikey: 'sb_publishable_qhB54NbaSS2bRDw0ehKGbA_7kHXkhTQ' });
    const handlers = { national, three, legacy };
    const siteFor = id => { const site = sites.find(s => s.id === id); if (!site) throw new Error('请选择有效专项'); return site; };
    function normalize(row, specialty) {
      return { specialty, kind: 'phone', phone: row.phone, note: row.note || '', enabled: !!row.enabled,
        createdAt: row.createdAt || row.created_at || null, expiresAt: row.expiresAt || row.expires_at || null };
    }
    async function listGroup(group) {
      if (!handlers[group]) throw new Error('无效服务');
      const data = await handlers[group]('list');
      if (group === 'national') {
        if (!Array.isArray(data.phones) || !Array.isArray(data.codes)) throw new Error('全国完形账号列表不完整');
        return [...data.phones.map(row => normalize(row, 'national_cloze')),
          ...data.codes.map(row => ({ ...row, specialty: 'national_cloze', kind: 'code', enabled: !!row.enabled, createdAt: row.created_at }))];
      }
      if (!Array.isArray(data.users)) throw new Error('账号列表不完整');
      return data.users.filter(row => sites.some(s => s.group === group && s.id === row.specialty)).map(row => normalize(row, row.specialty));
    }
    return {
      async login(password) {
        if (!password || password.length > 128) throw new Error('请输入管理员密码');
        return Promise.all(groups.map(async group => {
          try {
            const data = await handlers[group]('login', { password });
            if (group === 'legacy') { if (!data.token) throw new Error('登录凭证缺失'); remember(data.token); }
            return { group, ok: true };
          } catch (error) { if (group === 'legacy') remember(''); return { group, ok: false, error }; }
        }));
      },
      async list() {
        return Promise.all(groups.map(async group => {
          try { return { group, ok: true, rows: await listGroup(group) }; }
          catch (error) { if (group === 'legacy' && error.status === 401) remember(''); return { group, ok: false, rows: [], error }; }
        }));
      },
      async authorize({ phone, specialty, note = '', enabled = true }) {
        if (!/^1[3-9]\d{9}$/.test(phone || '')) throw new Error('请输入有效的11位手机号');
        const site = siteFor(specialty);
        if (site.group === 'national') return national('update', { kind: 'phone', phone, note, enabled });
        if (enabled !== true) throw new Error('新授权须为启用状态');
        return handlers[site.group]('add', { phone, specialty, note });
      },
      async update(row, changes) {
        const site = siteFor(row.specialty);
        const note = changes.note === undefined ? row.note : String(changes.note).slice(0, 80);
        const enabled = changes.enabled === undefined ? !!row.enabled : !!changes.enabled;
        if (site.group === 'national') return national('update', { kind: row.kind, phone: row.phone, hash: row.hash, note, enabled, resetDevices: changes.resetDevices === true });
        if (row.kind !== 'phone') throw new Error('此专项仅支持手机号');
        return handlers[site.group]('update', { phone: row.phone, specialty: row.specialty, note, enabled });
      },
      async saveCode({ code, note = '', enabled = true }) {
        const normalized = String(code || '').trim().toUpperCase();
        if (!/^[A-Z0-9]{8,32}$/.test(normalized)) throw new Error('登录码应为8至32位字母或数字');
        return national('update', { kind: 'code', code: normalized, note, enabled });
      },
      async logout() {
        const results = await Promise.all(groups.map(async group => {
          try { await handlers[group]('logout'); return { group, ok: true }; }
          catch (error) { return { group, ok: false, error }; }
        }));
        remember('');
        return results;
      }
    };
  }
  return { sites, groups, createClient };
});
