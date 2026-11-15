function installThreeSiteConnection(config) {
 'use strict';
 var site=config.site,phoneKey=config.phoneKey,base=config.storageKey;
 var phone='',revision=0,pending=null,busy=false,ready=false,conflict=false,timer,generation=0;
 function canonical(x){if(Array.isArray(x))return '['+x.map(canonical).join(',')+']';if(x&&typeof x==='object')return '{'+Object.keys(x).sort().map(function(k){return JSON.stringify(k)+':'+canonical(x[k]);}).join(',')+'}';return JSON.stringify(x);}
 function read(key,fallback){try{var x=JSON.parse(localStorage.getItem(key));return x==null?fallback:x;}catch(_){return fallback;}}
 function write(key,value){localStorage.setItem(key,JSON.stringify(value));}
 function key(prefix){return prefix+':account:'+phone;}
 function status(text,failed){var el=document.getElementById('threeSyncStatus');if(!el){el=document.createElement('button');el.id='threeSyncStatus';el.type='button';el.style.cssText='position:fixed;right:10px;bottom:10px;z-index:9999;max-width:90vw;padding:8px 12px;border:1px solid #ccc;border-radius:8px;background:white;font-size:13px';el.onclick=function(){if(conflict){location.reload();return;}flush(true);};document.body.appendChild(el);}el.textContent=text;el.style.color=failed?'#a22':'#365';}
 function request(route,payload,retry){var control=new AbortController(),clock=setTimeout(function(){control.abort();},15000);return fetch('/three-api/'+site+'/'+route,{method:'POST',credentials:'same-origin',cache:'no-store',signal:control.signal,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})}).then(function(r){return r.text().then(function(t){var d;try{d=JSON.parse(t);}catch(_){throw new Error('服务返回异常，请稍后重试');}if(!r.ok){var e=new Error(d.message||d.msg||'服务暂时不可用');e.status=r.status;throw e;}return d;});}).catch(function(e){if(retry&&(!e.status||[502,503,504].indexOf(e.status)>=0))return new Promise(function(resolve){setTimeout(resolve,400);}).then(function(){return request(route,payload,false);});throw e;}).finally(function(){clearTimeout(clock);});}
 function capture(){if(site==='seven_choice')return {seven:window.ThreeSevenProgress?window.ThreeSevenProgress.capture():read(key(base+':full'),{completed:read(key(base),[])})};return {store:read(key(base),{}),vocab:read(key('cloze_vocab'),[])};}
 function apply(value){if(site==='seven_choice'){var seven=value.seven||{completed:[]};write(key(base),seven.completed||[]);write(key(base+':full'),seven);if(window.ThreeSevenProgress)window.ThreeSevenProgress.apply(seven);}else{write(key(base),value.store||{});write(key('cloze_vocab'),value.vocab||[]);['updateHomeProgress','updateNavBadge','updateNavBadgeVocab'].forEach(function(n){try{if(typeof window[n]==='function')window[n]();}catch(_){}});}}
 function nonempty(v){if(!v||!Object.keys(v).length)return false;if(site==='seven_choice'){var x=v.seven||{},s=x.state||{};return !!((x.completed||[]).length||s.activeLesson||s.activeExam||s.exampleSolved||s.practiceSolved||Object.keys(s.examScores||{}).length||Object.keys(s.examSelections||{}).length||Object.keys(s.examAttempts||{}).length);}return !!(Object.keys(v.store||{}).length||(v.vocab||[]).length);}
 function queue(){if(!ready||!phone)return;pending=JSON.parse(JSON.stringify(capture()));try{write('three-dirty:'+site+':'+phone,pending);}catch(_){status('浏览器存储已满，请保持页面打开并重试同步',true);}clearTimeout(timer);timer=setTimeout(function(){flush(false);},650);}
 function flush(recheck){if(!ready||!pending||busy||conflict)return;busy=true;var sending=pending,account=phone,gen=generation,failed=false;status('正在保存学习进度…',false);
  var check=recheck?request('progress/get',{phone:account},true).then(function(r){if(canonical(r.progress)===canonical(sending)){revision=r.revision;pending=null;return false;}if(r.revision!==revision)throw Object.assign(new Error('其他设备已更新'),{status:409});return true;}):Promise.resolve(true);
  return check.then(function(save){if(!save||gen!==generation)return;return request('progress/save',{phone:account,progress:sending,revision:revision},false).then(function(r){if(gen!==generation)return;revision=r.revision;if(canonical(pending)===canonical(sending))pending=null;});}).then(function(){if(gen!==generation)return;if(!pending){localStorage.removeItem('three-dirty:'+site+':'+account);status('学习进度已保存',false);}}).catch(function(e){failed=true;if(gen!==generation)return;if(e.status===409){conflict=true;status('其他设备已更新；本机记录已保留，点击重新同步',true);}else status('本机记录已保留，点击重试同步',true);}).finally(function(){busy=false;if(gen===generation&&pending&&!failed&&!conflict)timer=setTimeout(function(){flush(false);},50);});
 }
 function initialize(validPhone){
  phone=validPhone;generation++;ready=false;pending=null;conflict=false;clearTimeout(timer);localStorage.setItem(phoneKey,phone);
  if(site==='seven_choice'&&!localStorage.getItem(key(base))&&!localStorage.getItem(base+':legacy-owner')){
   var legacy=read(base,[]);if(Array.isArray(legacy)&&legacy.length&&window.confirm('发现此浏览器原有的学习记录，是否归入当前手机号？原始记录会保留备份。')){write(key(base),legacy);if(window.ThreeSevenProgress)window.ThreeSevenProgress.apply({completed:legacy});localStorage.setItem(base+':legacy-owner',phone);}
  }
  return request('progress/get',{phone:phone},true).then(function(r){
   revision=r.revision;var local=capture(),remote=r.progress||{},dirty=read('three-dirty:'+site+':'+phone,null);if(dirty)local=dirty;
   if(nonempty(local)){var backupKey='three-migration-backup:'+site+':'+phone;if(!localStorage.getItem(backupKey))write(backupKey,local);}
   var useLocal=nonempty(local)&&!nonempty(remote);
   if(nonempty(local)&&nonempty(remote)&&canonical(local)!==canonical(remote))useLocal=window.confirm('本机与服务器学习记录不同，已保留本机备份。确定：保留本机并同步；取消：使用服务器记录。');
   apply(useLocal?local:nonempty(remote)?remote:local);ready=true;
   if(useLocal)queue();else{localStorage.removeItem('three-dirty:'+site+':'+phone);status('学习进度已同步',false);}
  });
 }
 window.ThreeSiteSync={queue:queue,flush:function(){return flush(true);},capture:capture};
 window[config.rpcName]=function(action,payload){payload=Object.assign({specialty:site},payload||{});return request('rpc',{action:action,payload:payload},action==='student_login'||action==='admin_list'||action==='admin_session').then(function(r){if(action==='student_login'&&r.ok)return initialize(r.phone).then(function(){return r;});return r;}).catch(function(e){if(e.status===401&&String(action).indexOf('admin_')===0)return {ok:false,code:401,msg:e.message};throw e;});};
 window.addEventListener('online',function(){flush(true);});
 document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')flush(false);else flush(true);});
 window.addEventListener('pagehide',function(){flush(false);});
}

installThreeSiteConnection({"site":"shcloze","rpcName":"shclozeRpc","phoneKey":"shcloze_student_phone","storageKey":"cloze-national-v2"});
