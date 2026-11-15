'use strict';
// Build only public national-cloze resources. Account databases, API services,
// sessions and backups stay on Tencent and are never copied into this build.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { buildFrontend, safeRelative } = require('./national-autodeploy.cjs');
const extensions = new Set(['.html', '.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.ico', '.gif', '.webp', '.avif', '.json', '.txt', '.woff', '.woff2', '.ttf', '.otf', '.mp3', '.wav', '.ogg', '.mp4', '.webm', '.pdf']);
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
async function buildNationalStatic(root) {
  const directory = path.join(root, 'eazycloze');
  try { await fs.access(directory); } catch (error) { if (error.code === 'ENOENT') return { skipped: true }; throw error; }
  const files = new Map();
  async function walk(dir, prefix = '') {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const relative = safeRelative(prefix + entry.name), full = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error('National website symlinks are not supported: ' + relative);
      if (entry.isDirectory()) await walk(full, relative + '/');
      else if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()) && relative !== 'deploy-version.json') files.set(relative, await fs.readFile(full));
    }
  }
  await walk(directory);
  // Reuse the reviewed migration compiler: keeps original browser storage,
  // phone/code login, cloud restore/save and optimistic revision handling.
  // Incompatible uploads fail this build before the deployed version changes.
  const built = await buildFrontend(files);
  const revision = sha(Buffer.from([...built].sort(([a], [b]) => a.localeCompare(b)).map(([name, bytes]) => name + ':' + sha(bytes)).join('\n')));
  const version = { mode: 'github-static', source: 'joi0611/pro:main/eazycloze', revision, publicFiles: built.size };
  for (const [relative, bytes] of built) await fs.writeFile(path.join(directory, relative), bytes);
  await fs.writeFile(path.join(directory, 'deploy-version.json'), JSON.stringify(version, null, 2) + '\n');
  console.log('[national-static] files=' + built.size + ', revision=' + revision.slice(0, 12));
  return version;
}
module.exports = buildNationalStatic;
if (require.main === module) buildNationalStatic(path.resolve(process.argv[2] || process.cwd())).catch(error => { console.error('[national-static] Build failed:', error.message); process.exitCode = 1; });
