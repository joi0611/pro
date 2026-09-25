(function(){
  const config=window.LEON_SUPABASE_CONFIG;
  if(!config||!window.supabase){throw new Error('Supabase连接配置未加载');}
  window.leonSupabase=window.supabase.createClient(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true}});
  window.LEON_OWNER_LOGIN=Object.freeze({username:'leon',email:'leon@leon.invalid'});
})();
