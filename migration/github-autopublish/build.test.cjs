'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs/promises'), path = require('node:path'), os = require('node:os'), crypto = require('node:crypto');
const build = require('../../build-network.cjs');
const buildNational = require('../../build-national-static.cjs');
const source = path.resolve(process.env.NATIONAL_BUILD_FIXTURE || path.join(__dirname, '../..'));
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'github-auto-'));
  await fs.cp(path.join(source, 'eazycloze'), path.join(dir, 'eazycloze'), { recursive: true });
  t.after(async () => { const absolute = path.resolve(dir), allowed = path.resolve(os.tmpdir()) + path.sep + 'github-auto-'; assert.ok(absolute.startsWith(allowed)); await fs.rm(absolute, { recursive: true, force: true }); });
  return dir;
}
test('national static build retains native login and phone progress; every referenced local resource is versioned', async t => {
  const dir = await fixture(t);
  await build(dir);
  const app = await fs.readFile(path.join(dir, 'eazycloze/app.js'), 'utf8'), html = await fs.readFile(path.join(dir, 'eazycloze/index.html'), 'utf8');
  assert.match(app, /NationalTransport\.rpc/); assert.match(app, /NationalTransport\.load/); assert.match(app, /NationalTransport\.queue/); assert.match(app, /cloze-national-v2/);
  assert.doesNotMatch(app, /SUPABASE_CONFIG|nationalRpcRequest|supabase\.co/);
  assert.equal((html.match(/src="connection\.js/g) || []).length, 1);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const u = new URL(match[1], 'https://example.invalid/eazycloze/');
    if (u.origin !== 'https://example.invalid' || !u.pathname.startsWith('/eazycloze/')) continue;
    const bytes = await fs.readFile(path.join(dir, decodeURIComponent(u.pathname.slice(1))));
    assert.equal(u.searchParams.get('v'), sha(bytes).slice(0, 12), 'Incorrect public resource version: ' + u.pathname);
  }
  const first = JSON.parse(await fs.readFile(path.join(dir, 'eazycloze/deploy-version.json')));
  assert.equal(first.mode, 'github-static'); assert.match(first.revision, /^[a-f0-9]{64}$/);
  await buildNational(dir);
  const again = JSON.parse(await fs.readFile(path.join(dir, 'eazycloze/deploy-version.json')));
  assert.equal(again.revision, first.revision, 'Repeated builds must be stable');
});
test('question bank updates produce a new public revision without copying server databases', async t => {
  const dir = await fixture(t), before = await buildNational(dir);
  await fs.appendFile(path.join(dir, 'eazycloze/builtin-lessons.js'), '\n// fixture updated question bank\n');
  const after = await buildNational(dir); assert.notEqual(after.revision, before.revision);
  assert.notEqual((await fs.readFile(path.join(dir, 'eazycloze/index.html'), 'utf8')).match(/builtin-lessons\.js\?v=([a-f0-9]+)/)[1], sha(await fs.readFile(path.join(source, 'eazycloze/builtin-lessons.js'))).slice(0, 12));
  assert.equal((await fs.readdir(dir)).includes('private'), false);
});
test('broken or incompatible uploads fail before producing a release marker', async t => {
  for (const transform of [s => s.replace('cloze-national-v2', 'incompatible-key'), s => s.replaceAll('NationalTransport.queue', 'MissingSync'), s => s + '\nfunction invalid syntax']) {
    const dir = await fixture(t), file = path.join(dir, 'eazycloze/app.js');
    await fs.rm(path.join(dir, 'eazycloze/deploy-version.json'), { force: true });
    await fs.writeFile(file, transform(await fs.readFile(file, 'utf8')));
    await assert.rejects(buildNational(dir));
    await assert.rejects(fs.access(path.join(dir, 'eazycloze/deploy-version.json')));
  }
});
