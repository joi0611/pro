const NATIONAL_ORIGIN = 'https://national-origin.yunmianas.cn';
const ADMIN_ENTRIES = {
  '/national-admin': 'national_cloze',
  '/national-admin/': 'national_cloze',
  '/eazycloze/admin.html': 'national_cloze',
  '/7-5task/admin.html': 'seven_choice',
  '/7-5task/admin-supabase.html': 'national_grammar',
  '/gzcloze/admin.html': 'gzcloze',
  '/shcloze/admin.html': 'shcloze'
};

export function middleware(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/admin' || url.pathname === '/admin.html')
    return context.redirect('/admin/', 302);
  if (Object.prototype.hasOwnProperty.call(ADMIN_ENTRIES, url.pathname))
    return context.redirect('/admin/?specialty=' + ADMIN_ENTRIES[url.pathname], 302);
  if (url.pathname.startsWith('/three-api/'))
    return context.rewrite(NATIONAL_ORIGIN + url.pathname + url.search);
  if (url.pathname === '/eazycloze')
    return context.redirect('/eazycloze/', 308);
  // National pages and resources now follow the same GitHub static deployment
  // as the other boards. Only its account/progress API remains on Tencent.
  if (url.pathname.startsWith('/national-api/'))
    return context.rewrite(NATIONAL_ORIGIN + url.pathname + url.search);
  return context.next();
}

export const config = {
  matcher: ['/admin', '/admin.html', '/national-admin', '/national-admin/',
    '/7-5task/admin.html', '/7-5task/admin-supabase.html', '/gzcloze/admin.html', '/shcloze/admin.html',
    '/three-api/:path*', '/eazycloze', '/eazycloze/:path*', '/national-api/:path*']
};
