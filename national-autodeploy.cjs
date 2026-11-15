'use strict';
// Installed locally once after checksum verification. Repository files are data;
// no downloaded shell, Node or GitHub Actions code is executed by this updater.
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const ROOT='C:/ProgramData/NationalCloze';
const REPO='joi0611/pro',PREFIX='eazycloze/';
const RELEASE=/^[a-f0-9]{40}-\d{13}$/;
const EXTENSIONS=new Set(['.html','.js','.css','.svg','.png','.jpg','.jpeg','.ico','.gif','.webp','.avif','.json','.txt','.woff','.woff2','.ttf','.otf','.mp3','.wav','.ogg','.mp4','.webm','.pdf']);
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const blobHash=bytes=>crypto.createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
function check(value,message){if(!value)throw new Error(message);}
function safeRelative(name){
 check(typeof name==='string'&&name.length<400&&!name.includes('\\')&&!/[\x00-\x1f<>:"|?*]/.test(name),'Invalid repository filename');
 const parts=name.split('/');
 check(parts.every(p=>p&&p!=='.'&&p!=='..'&&!p.startsWith('.')&&!/[ .]$/.test(p)&&!/^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(p)),'Unsafe repository path');
 return name;
}
async function jsonFile(filename,fallback=null){try{return JSON.parse(await fs.readFile(filename,'utf8'));}catch(e){if(e.code==='ENOENT')return fallback;throw e;}}
async function atomicJson(filename,value){
 await fs.mkdir(path.dirname(filename),{recursive:true});
 const temp=filename+'.'+process.pid+'.tmp';
 await fs.writeFile(temp,JSON.stringify(value,null,2)+'\n',{flag:'wx'});
 await fs.rename(temp,filename);
}
async function download(url,json=false){
 let last;
 for(let attempt=0;attempt<2;attempt++)try{
  const r=await fetch(url,{headers:{'User-Agent':'NationalCloze-AutoDeploy/1','Accept':json?'application/vnd.github+json':'application/octet-stream'},signal:AbortSignal.timeout(30000)});
  check(r.ok,'Download HTTP '+r.status);const bytes=Buffer.from(await r.arrayBuffer());
  return json?JSON.parse(bytes.toString('utf8')):bytes;
 }catch(e){last=e;if(attempt===0)await new Promise(resolve=>setTimeout(resolve,600));}
 throw last;
}
function replaceOnce(text,from,to,label){const at=text.indexOf(from);check(at>=0&&text.indexOf(from,at+from.length)<0,'Source contract changed: '+label);return text.slice(0,at)+to+text.slice(at+from.length);}
function compileApp(source){
 let app=source;
 if(app.includes('var SUPABASE_CONFIG = {')){
  check(!app.includes('function nationalRpcRequest('),'Upload the migrated source rather than an EdgeOne-generated build');
  app=app.replace(/var SUPABASE_CONFIG = \{[\s\S]*?\r?\n\};/,'');
  const first=app.indexOf('function activationRpc('),last=app.indexOf('function setActiveLogin(',first);
  check(first>=0&&last>first,'Source contract changed: login functions');
  app=app.slice(0,first)+'function activationRpc(name,payload){return NationalTransport.rpc(name,payload);}\nfunction trainingRpc(action,payload){return NationalTransport.rpc("training_api",{p_action:action,p_payload:payload||{}});}\n'+app.slice(last);
  const load=app.indexOf('function loadRemoteProgress('),save=app.indexOf('function saveStore(',load);
  check(load>=0&&save>load,'Source contract changed: progress functions');
  app=app.slice(0,load)+'function loadRemoteProgress(){return NationalTransport.load();}\nfunction queueRemoteProgressSave(s){if(ACTIVE_LOGIN_CODE)NationalTransport.queue(s);}\n'+app.slice(save);
  app=replaceOnce(app,'if (progress && typeof progress === "object") writeStoreLocal(progress);','writeStoreLocal(NationalTransport.choose(loadStore(),progress));','local progress import');
  app=app.replace('var savedValue = saved && String(saved.value || saved.code || "").trim();','var savedValue = saved ? String(saved.value || saved.code || "").trim() : "";');
  for(const value of ['value','savedValue'])app=replaceOnce(app,'verifyPhone('+value+').then(function (phone) { return { identity: phone, progress: null }; })','verifyPhone('+value+').then(function(phone){return loadRemoteProgress().then(function(progress){return {identity:phone,progress:progress};});})','phone cloud restore');
 }
 check(!/supabase\.co|SUPABASE_CONFIG|anonKey/.test(app),'Supabase dependency remains in frontend');
 check(/STORAGE_BASE_KEY\s*=\s*["']cloze-national-v2["']/.test(app),'Original browser progress key changed');
 for(const token of ['NationalTransport.rpc','NationalTransport.load','NationalTransport.queue','NationalTransport.choose','national_cloze'])check(app.includes(token),'Missing migrated frontend feature: '+token);
 check(/verifyPhone\(value\)[\s\S]{0,180}loadRemoteProgress\(/.test(app)&&/verifyPhone\(savedValue\)[\s\S]{0,180}loadRemoteProgress\(/.test(app),'Phone progress restore missing');
 new vm.Script(app,{filename:'app.js'});return app;
}
async function buildFrontend(files,fallbackConnection){
 const result=new Map(files);
 check(result.has('app.js')&&result.has('index.html')&&result.has('builtin-lessons.js'),'Required website files missing');
 result.set('app.js',Buffer.from(compileApp(result.get('app.js').toString('utf8'))));
 const connection=result.get('connection.js')||fallbackConnection;
 check(connection&&/NationalTransport/.test(connection.toString())&&/fetch\(['"]\/national-api\//.test(connection.toString())&&!/supabase\.co|SUPABASE_CONFIG/.test(connection.toString()),'Invalid dedicated-server connection script');
 result.set('connection.js',Buffer.from(connection));
 for(const [name,bytes]of result)if(path.extname(name).toLowerCase()==='.js')new vm.Script(bytes.toString('utf8'),{filename:name});
 let html=result.get('index.html').toString('utf8');
 html=html.replace(/\s*<script\b[^>]*src=["'](?:\.\/)?connection\.js(?:\?[^"']*)?["'][^>]*><\/script>/gi,'');
 check(/<head\b[^>]*>/i.test(html),'HTML head missing');
 html=html.replace(/<head\b[^>]*>/i,'$&\n<script src="connection.js"></script>');
 html=html.replace(/((?:src|href)\s*=\s*)(["'])([^"']+)\2/gi,(all,prefix,quote,src)=>{
  if(/^(?:[a-z]+:|\/\/|#)/i.test(src))return all;
  const parsed=new URL(src,'https://deploy.invalid/eazycloze/');
  if(!parsed.pathname.startsWith('/eazycloze/'))return all;
  const relative=decodeURIComponent(parsed.pathname.slice('/eazycloze/'.length));
  if(!result.has(relative))return all;
  parsed.searchParams.set('v',sha(result.get(relative)).slice(0,12));
  return prefix+quote+(src.startsWith('/')?parsed.pathname:relative)+parsed.search+parsed.hash+quote;
 });
 for(const match of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)){
  const u=new URL(match[1],'https://deploy.invalid/eazycloze/');
  check(u.origin==='https://deploy.invalid'&&u.pathname.startsWith('/eazycloze/')&&result.has(decodeURIComponent(u.pathname.slice('/eazycloze/'.length))),'Missing or external script resource');
 }
 check(html.indexOf('connection.js')<html.lastIndexOf('app.js'),'Connection script order incorrect');
 result.set('index.html',Buffer.from(html));return result;
}
function patchBackend(source){
 if(source.includes('NATIONAL_STATIC_RELEASE_V1'))return source;
 check(sha(Buffer.from(source))==='0899e7d6a2e083904eadfc4c13810da26864248ae2f811299d2d238c67af1dc3','Unexpected backend version; original preserved');
 let changed=replaceOnce(source,"secureCookies=true}={})","secureCookies=true,resolveWebRoot}={})",'server options');
 changed=replaceOnce(changed,'const root=path.resolve(webRoot),file=path.resolve(root,relative);',"const root=path.resolve(resolveWebRoot?resolveWebRoot(url.pathname):webRoot),file=path.resolve(root,relative);\n      const release=path.basename(path.dirname(root));if(/^[a-f0-9]{40}-\\d{13}$/.test(release))res.setHeader('X-National-Release',release);",'static release root');
 changed=replaceOnce(changed,"!['.html','.js','.css','.svg','.png','.jpg','.ico'].includes(path.extname(file))","!"+JSON.stringify([...EXTENSIONS])+".includes(path.extname(file).toLowerCase())",'static extension allowlist');
 changed=replaceOnce(changed,"'.ico':'image/x-icon'","'.ico':'image/x-icon','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.avif':'image/avif','.json':'application/json','.txt':'text/plain','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.otf':'font/otf','.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg','.mp4':'video/mp4','.webm':'video/webm','.pdf':'application/pdf'",'static MIME types');
 changed=replaceOnce(changed,'types[path.extname(file)]','types[path.extname(file).toLowerCase()]','case-insensitive MIME lookup');
 changed=replaceOnce(changed,'const app=createApp({store});',`// NATIONAL_STATIC_RELEASE_V1: only website assets change; database and API stay local.
  const app=createApp({store,resolveWebRoot:requestPath=>{
    if(requestPath.startsWith('/eazycloze/'))try{
      const active=JSON.parse(fs.readFileSync(path.join(__dirname,'deploy/active.json'),'utf8'));
      if(/^[a-f0-9]{40}-\\d{13}$/.test(active.release))return path.join(__dirname,'deploy/releases',active.release,'www');
    }catch(_){}
    return path.join(__dirname,'www');
  }});`,'server initialization');
 new vm.Script(changed,{filename:'server.cjs'});return changed;
}
async function prepare(root=ROOT){
 const deploy=path.join(root,'deploy'),active=await jsonFile(path.join(deploy,'active.json'));
 const commits=await download('https://api.github.com/repos/'+REPO+'/commits?sha=main&path=eazycloze&per_page=1',true);
 const commit=commits[0]?.sha;check(/^[a-f0-9]{40}$/.test(commit),'Repository commit unavailable');
 if(active?.sourceCommit===commit)return {unchanged:true,active};
 const rootTree=await download('https://api.github.com/repos/'+REPO+'/git/trees/'+commit,true);
 const folder=rootTree.tree?.find(x=>x.path==='eazycloze'&&x.type==='tree');check(folder,'Website directory missing');
 const tree=await download('https://api.github.com/repos/'+REPO+'/git/trees/'+folder.sha+'?recursive=1',true);
 check(!tree.truncated&&Array.isArray(tree.tree),'Repository tree incomplete');
 const entries=tree.tree.filter(x=>x.type==='blob'&&EXTENSIONS.has(path.posix.extname(x.path).toLowerCase()));
 check(entries.length>0&&entries.length<=2000&&entries.reduce((n,x)=>n+(x.size||0),0)<=250000000,'Website package exceeds deployment limits');
 for(const entry of entries){safeRelative(entry.path);check(entry.mode==='100644'||entry.mode==='100755','Repository links are not deployable');check(entry.size<=100000000&&/^[a-f0-9]{40}$/.test(entry.sha),'Invalid website object');}
 const files=new Map();let index=0;
 await Promise.all(Array.from({length:Math.min(4,entries.length)},async()=>{
  while(index<entries.length){const entry=entries[index++],url='https://raw.githubusercontent.com/'+REPO+'/'+commit+'/'+PREFIX+entry.path.split('/').map(encodeURIComponent).join('/'),bytes=await download(url);
   check(bytes.length===entry.size&&blobHash(bytes)===entry.sha,'Website object verification failed');files.set(entry.path,bytes);
  }
 }));
 const built=await buildFrontend(files,await fs.readFile(path.join(root,'www/eazycloze/connection.js')));
 const release=commit+'-'+Date.now(),directory=path.join(deploy,'releases',release),web=path.join(directory,'www/eazycloze');
 const manifest=[];
 for(const [name,bytes]of built){const dest=path.join(web,safeRelative(name));await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,bytes,{flag:'wx'});manifest.push({path:name,sha256:sha(bytes),bytes:bytes.length});}
 const record={release,sourceCommit:commit,siteTree:folder.sha,createdAt:new Date().toISOString(),files:manifest};
 await atomicJson(path.join(web,'deploy-version.json'),{sourceCommit:commit,release,createdAt:record.createdAt});
 await atomicJson(path.join(directory,'manifest.json'),record);
 return {unchanged:false,record};
}
async function assertSite(base,record){
 const marker=await fetch(base+'/eazycloze/deploy-version.json?check='+Date.now(),{signal:AbortSignal.timeout(15000),redirect:'manual'});
 check(marker.status===200&&(await marker.json()).release===record.release,'Live release marker mismatch');
 for(const name of ['index.html','app.js','connection.js','builtin-lessons.js']){
  const r=await fetch(base+'/eazycloze/'+name+'?check='+Date.now(),{signal:AbortSignal.timeout(20000),redirect:'manual'});
  const expected=record.files.find(x=>x.path===name);check(r.status===200&&sha(Buffer.from(await r.arrayBuffer()))===expected.sha256,'Live website resource check failed');
 }
 const api=await fetch(base+'/national-api/progress/get',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://pro.yunmianas.cn'},body:'{}',signal:AbortSignal.timeout(15000)});
 check(api.status===401&&api.headers.get('cache-control')?.includes('no-store'),'Protected progress endpoint check failed');await api.arrayBuffer();
}
async function activate(root,record,verify=assertSite){
 check(RELEASE.test(record.release),'Invalid release identifier');
 const pointer=path.join(root,'deploy/active.json'),previous=await jsonFile(pointer);
 await atomicJson(pointer,{release:record.release,sourceCommit:record.sourceCommit,siteTree:record.siteTree,createdAt:record.createdAt});
 try{await verify('http://127.0.0.1:8788',record);await verify('https://pro.yunmianas.cn',record);}
 catch(e){if(previous)await atomicJson(pointer,previous);else await fs.unlink(pointer);throw new Error('Website checks failed; previous release restored');}
 return record;
}
async function sync(root=ROOT){
 const deploy=path.join(root,'deploy');await fs.mkdir(deploy,{recursive:true});
 const lock=path.join(deploy,'sync.lock');let handle;
 try{handle=await fs.open(lock,'wx');}catch(e){if(e.code!=='EEXIST')throw e;const old=await jsonFile(lock,{});let alive=false;try{if(Number.isInteger(old.pid)){process.kill(old.pid,0);alive=true;}}catch(_){}if(alive)return {skipped:'already-running'};await fs.unlink(lock);handle=await fs.open(lock,'wx');}
 try{
  await handle.writeFile(JSON.stringify({pid:process.pid}));
  const prepared=await prepare(root);if(prepared.unchanged)return {unchanged:true,sourceCommit:prepared.active.sourceCommit};
  const record=await activate(root,prepared.record);
  const result={ok:true,sourceCommit:record.sourceCommit,release:record.release,files:record.files.length,checkedAt:new Date().toISOString(),databaseModified:false};
  await atomicJson(path.join(deploy,'status.json'),result);return result;
 }catch(error){await atomicJson(path.join(deploy,'status.json'),{ok:false,checkedAt:new Date().toISOString(),message:error.message,databaseModified:false});throw error;}
 finally{await handle.close();await fs.unlink(lock);}
}
module.exports={safeRelative,compileApp,buildFrontend,patchBackend,prepare,activate,atomicJson,blobHash,assertSite,sync};
if(require.main===module)(async()=>{
 const command=process.argv[2]||'sync';check(process.platform==='win32','Production updater requires Windows');
 check(path.resolve(ROOT).toLowerCase()===path.resolve(__dirname,'..').toLowerCase(),'Install updater inside the dedicated server deploy directory');
 if(command==='sync')console.log(JSON.stringify(await sync()));
 else if(command==='patch'){
  const source=await fs.readFile(path.join(ROOT,'server.cjs'),'utf8'),patched=patchBackend(source);
  await fs.writeFile(path.join(ROOT,'deploy/server.candidate.cjs'),patched);console.log(JSON.stringify({patched:source!==patched,sha256:sha(Buffer.from(patched))}));
 }else if(command==='backup'){
  const {DatabaseSync,backup}=require('node:sqlite'),db=new DatabaseSync(path.join(ROOT,'private/national.sqlite'),{readOnly:true});
  try{check(db.prepare("SELECT value FROM settings WHERE key='source_checksum'").get()?.value,'Existing imported database required');await backup(db,path.join(ROOT,'private/backups/before-autodeploy-'+Date.now()+'.sqlite'));console.log('DATABASE_BACKUP_CREATED');}finally{db.close();}
 }else if(command==='verify'){
  const active=await jsonFile(path.join(ROOT,'deploy/active.json'));check(active&&RELEASE.test(active.release),'Active release required');
  const record=await jsonFile(path.join(ROOT,'deploy/releases',active.release,'manifest.json'));
  await assertSite('http://127.0.0.1:8788',record);await assertSite('https://pro.yunmianas.cn',record);console.log('ACTIVE_RELEASE_VERIFIED');
 }else throw new Error('Unknown updater command');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
