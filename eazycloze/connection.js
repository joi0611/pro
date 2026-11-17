(function () {
  'use strict';
  var account='',revision=0,pending=null,busy=false,conflict=false,timer;
  /* 修复1：保存失败后指数退避自动重试（原版失败即停，只能等网络事件） */
  var RETRY_START=1000,RETRY_MAX=30000,retryBackoff=RETRY_START;
  /* 修复2：冲突不再永久锁死，由 resolveConflict 自动合并/重写 */
  var localWriter=null;   /* 由 app.js 注入：把云端进度写回本地 store 的函数 */
  function canonical(x){if(Array.isArray(x))return '['+x.map(canonical).join(',')+']';if(x&&typeof x==='object')return '{'+Object.keys(x).sort().map(function(k){return JSON.stringify(k)+':'+canonical(x[k]);}).join(',')+'}';return JSON.stringify(x);}
  function dirtyKey(){return 'national-dirty-v1:'+account;}
  function status(text,failed){var node=document.getElementById('nationalSyncStatus');if(!node){node=document.createElement('button');node.id='nationalSyncStatus';node.type='button';node.style.cssText='position:fixed;right:12px;bottom:12px;z-index:9999;padding:8px 12px;border-radius:8px;border:1px solid #bbb;background:white;font-size:13px;max-width:90vw';node.onclick=function(){if(conflict){resolveConflict();return;}flush(true);};document.body.appendChild(node);}node.textContent=text;node.style.color=failed?'#a22':'#365';}
  function device(){var id=localStorage.getItem('wbx_device_id');if(!id){id='D'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);localStorage.setItem('wbx_device_id',id);}return id;}
  function request(route,payload,retry){
    var controller=new AbortController(),clock=setTimeout(function(){controller.abort();},15000);
    return fetch('/national-api/'+route,{method:'POST',credentials:'same-origin',cache:'no-store',signal:controller.signal,
      headers:{'Content-Type':'application/json','X-National-Device':device()},body:JSON.stringify(payload||{})}).then(function(r){return r.text().then(function(t){var data;try{data=JSON.parse(t);}catch(_){throw new Error('服务返回异常，请稍后重试');}if(!r.ok){var error=new Error(data.message||'服务暂时不可用');error.status=r.status;throw error;}return data;});}).catch(function(error){if(retry&&(!error.status||[502,503,504].indexOf(error.status)>=0))return new Promise(function(resolve){setTimeout(resolve,350);}).then(function(){return request(route,payload,false);});throw error;}).finally(function(){clearTimeout(clock);});
  }
  function scheduleFlush(delay){clearTimeout(timer);timer=setTimeout(function(){flush(false);},delay==null?650:delay);}
  function queue(progress){pending=JSON.parse(JSON.stringify(progress));try{localStorage.setItem(dirtyKey(),'1');}catch(_){}retryBackoff=RETRY_START;scheduleFlush(650);}
  function flush(recheck){
    if(!account||!pending||busy||conflict)return;
    busy=true;var failed=false,sending=JSON.parse(JSON.stringify(pending));status('正在保存学习进度…',false);
    var ready=recheck?request('progress/get',{},true).then(function(r){if(canonical(r.progress)===canonical(sending)){revision=r.revision;pending=null;return false;}if(r.revision!==revision)throw Object.assign(new Error('云端进度已更新'),{status:409});return true;}):Promise.resolve(true);
    ready.then(function(write){if(!write)return;return request('progress/save',{progress:sending,revision:revision},false).then(function(r){revision=r.revision;if(canonical(pending)===canonical(sending))pending=null;});}).then(function(){if(!pending){try{localStorage.removeItem(dirtyKey());}catch(_){}retryBackoff=RETRY_START;status('学习进度已保存',false);}else status('正在保存后续进度…',false);}).catch(function(error){failed=true;if(error.status===409){conflict=true;status('云端有更新，本机记录已保留；正在为你合并…',true);resolveConflict();}else status('本机记录已保留；稍后自动重试',true);}).finally(function(){busy=false;if(pending&&!conflict){scheduleFlush(failed?retryBackoff:20);if(failed)retryBackoff=Math.min(retryBackoff*2,RETRY_MAX);}});
  }
  function resolveConflict(){
    if(!account){conflict=false;return;}
    request('progress/get',{},true).then(function(r){
      revision=r.revision;
      var remote=r.progress||{},local=pending;
      if(canonical(remote)===canonical(local)){/* 云端已是最新（另一台设备已写入相同内容 / 上次写实际已成功） */
        pending=null;conflict=false;try{localStorage.removeItem(dirtyKey());}catch(_){}
        status('学习进度已保存',false);return;
      }
      try{var backup='national-migration-backup-v1:'+account;if(local&&!localStorage.getItem(backup))localStorage.setItem(backup,JSON.stringify(local));}catch(_){}
      var keep=window.confirm('云端与本机的学习记录不一致。\n\n点「确定」＝用本机记录覆盖云端；\n点「取消」＝丢弃本机记录、载入云端记录。\n（本机记录会先备份一份，不会丢失）');
      conflict=false;
      if(keep){scheduleFlush(0);}
      else{pending=null;try{localStorage.removeItem(dirtyKey());}catch(_){}
        if(typeof localWriter==='function'){localWriter(remote);}
        else{try{location.reload();}catch(_){}}
        status('已载入云端记录',false);
      }
    }).catch(function(){status('本机记录已保留；点击重试同步',true);});
  }
  window.NationalTransport={
    rpc:function(name,payload){var p=payload||{};return request('rest/v1/rpc/'+name,p,true).then(function(data){if(name==='verify_activation_code'&&data===true)account='code:'+String(p.input_code).trim().toUpperCase();if(name==='training_api'&&data.ok)account='phone:'+data.phone;return data;});},
    load:function(){return request('progress/get',{},true).then(function(r){revision=r.revision;pending=null;conflict=false;return r.progress||{};});},
    choose:function(local,remote){
      var hasLocal=local&&Object.keys(local).length,hasRemote=remote&&Object.keys(remote).length;
      if(hasLocal){try{var backup='national-migration-backup-v1:'+account;if(!localStorage.getItem(backup))localStorage.setItem(backup,JSON.stringify(local));}catch(_){} }
      if(hasLocal&&!hasRemote){queue(local);return local;}
      if(hasLocal&&hasRemote&&canonical(local)!==canonical(remote)){
        var keep=window.confirm('发现本机和云端的学习记录不同，已保留一份本机备份。选择“确定”保留本机记录并同步；选择“取消”载入云端记录。');
        if(keep){queue(local);return local;}
      }
      try{localStorage.removeItem(dirtyKey());}catch(_){}status('学习进度已载入',false);return remote||local||{};
    },queue:queue,
    bindLocalWriter:function(fn){localWriter=fn;}
  };
  window.addEventListener('online',function(){if(conflict){resolveConflict();}else{flush(true);}});
  document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'){if(conflict){resolveConflict();}else{flush(true);}}});
})();
