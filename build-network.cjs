const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const UPSTREAM = 'https://gbjmylxohacppnybfssh.supabase.co';
const SKIP = new Set(['.git', 'node_modules', 'edge-functions', 'cloud-functions', 'tests']);
async function build(root) {
  const files = [];
  async function walk(dir) {
    for (const item of await fs.readdir(dir, { withFileTypes: true })) {
      if (SKIP.has(item.name) || /backup/i.test(item.name)) continue;
      const full = path.join(dir, item.name);
      if (item.isDirectory()) await walk(full);
      else if (/\.(js|html)$/.test(item.name)) files.push(full);
    }
  }
  await walk(root);
  const versions = new Map();
  let configs = 0, pages = 0;
  for (const file of files) {
    const source = await fs.readFile(file, 'utf8');
    const next = source.replace(/(["'])https:\/\/gbjmylxohacppnybfssh\.supabase\.co([^"']*)\1/g,
      (match, quote, suffix, offset) => {
        if (/location\.protocol === "file:" \? $/.test(source.slice(Math.max(0, offset - 45), offset))) return match;
        return '(location.protocol === "file:" ? ' + JSON.stringify(UPSTREAM + suffix) +
          ' : location.origin + ' + JSON.stringify('/training-backend' + suffix) + ')';
      });
    if (next !== source) { await fs.writeFile(file, next); configs++; }
    if (file.endsWith('.js') && next.includes('location.origin + "/training-backend')) {
      versions.set(path.resolve(file), 'net-' + crypto.createHash('sha256').update(next).digest('hex').slice(0, 12));
    }
  }
  for (const file of files.filter(name => name.endsWith('.html'))) {
    const source = await fs.readFile(file, 'utf8');
    const next = source.replace(/(<script\b[^>]*\bsrc\s*=\s*)(["'])([^"']+)\2/gi,
      (match, prefix, quote, src) => {
        if (/^(https?:)?\/\//.test(src)) return match;
        const [withoutHash, hash] = src.split('#');
        const [pathname, search] = withoutHash.split('?');
        const full = path.resolve(src.startsWith('/') ? root : path.dirname(file),
          src.startsWith('/') ? pathname.slice(1) : pathname);
        const version = versions.get(full);
        if (!version) return match;
        const query = new URLSearchParams(search || '');
        query.set('v', version);
        return prefix + quote + pathname + '?' + query.toString() + (hash ? '#' + hash : '') + quote;
      });
    if (next !== source) { await fs.writeFile(file, next); pages++; }
  }
  console.log('[training-network] configurations=' + configs + ', versioned-pages=' + pages);
  return { configs, pages };
}
module.exports = build;
if (require.main === module) build(path.resolve(process.argv[2] || process.cwd())).catch(error => {
  console.error('[training-network] Build failed:', error.message);
  process.exitCode = 1;
});
