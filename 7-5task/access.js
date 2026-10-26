(async function(){
  const $=s=>document.querySelector(s);
  // 站点可能部署在子目录（如 /7-5task/），页面跳转用 BASE，接口固定在域名根 /api
  let p=location.pathname; if(!/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/'))p+='/';
  const BASE=p.replace(/\/[^/]*$/,'/');
  const API=window.API_BASE||'/api';
  const HOME=BASE, LOGIN=BASE+'login.html';
  const message=text=>{if($('#message'))$('#message').textContent=text;};
  async function api(url,method='GET',body){const res=await fetch(API+url,{method,headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});const data=await res.json();if(!res.ok)throw Error(data.error||'请求失败');return data;}
  function bind(id,handler){$(id)?.addEventListener('submit',async e=>{e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;message('');try{await handler(Object.fromEntries(new FormData(e.target)));}catch(err){message(err.message);}finally{button.disabled=false;}});}
  bind('#studentLogin',async data=>{await api('/login','POST',data);location.href=HOME;});
  bind('#adminLogin',async data=>{await api('/login','POST',{...data,role:'admin'});await load();});
  let phones=[];
  function render(){const query=$('#phoneSearch').value.trim().toLowerCase();const rows=phones.filter(p=>(p.phone+' '+p.note).toLowerCase().includes(query));$('#phoneCount').textContent=phones.length;$('#phoneRows').replaceChildren();$('#noPhones').hidden=rows.length>0;for(const p of rows){const tr=document.createElement('tr');for(const value of [p.phone,p.note]){const td=document.createElement('td');td.textContent=value;tr.append(td);}const td=document.createElement('td'),button=document.createElement('button');button.textContent='撤销授权';button.type='button';button.onclick=async()=>{if(!confirm('撤销 '+p.phone+' 的授权？该手机号将立即退出。'))return;button.disabled=true;try{await api('/phones','DELETE',{phone:p.phone});await load();message('已撤销授权');}catch(err){message(err.message);button.disabled=false;}};td.append(button);tr.append(td);$('#phoneRows').append(tr);}}
  async function load(){phones=(await api('/phones')).phones;$('#adminLogin').hidden=true;$('#management').hidden=false;render();}
  bind('#authorizePhone',async data=>{await api('/phones','POST',data);$('#authorizePhone').reset();await load();message('授权已保存，学生现在可以使用该手机号登录。');});
  $('#phoneSearch')?.addEventListener('input',render);
  $('#adminLogout')?.addEventListener('click',async()=>{try{await api('/logout','POST',{});location.reload();}catch(err){message(err.message);}});
  try{const user=await api('/me');if($('#management')&&user.admin)await load();const link=$('#accountLink');if(link&&user.authorized){link.textContent=user.admin?'管理员 · 退出':user.phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')+' · 退出';link.onclick=async e=>{e.preventDefault();await api('/logout','POST',{});location.href=LOGIN;};}if(link&&!user.authorized)location.href=LOGIN;}catch(err){message(err.message||'无法连接服务器，请检查网络或稍后重试');}
})();
