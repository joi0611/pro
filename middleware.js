const NATIONAL_ORIGIN = 'https://national-origin.yunmianas.cn';

export function middleware(context) {
  const url = new URL(context.request.url);
  if (url.pathname.startsWith("/three-api/")) return context.rewrite(NATIONAL_ORIGIN + url.pathname + url.search);
  if (url.pathname === '/eazycloze')
    return context.redirect('/eazycloze/', 308);
  if (url.pathname.startsWith('/eazycloze/') ||
      url.pathname.startsWith('/national-api/') ||
      url.pathname === '/national-admin')
    return context.rewrite(NATIONAL_ORIGIN + url.pathname + url.search);
  return context.next();
}

export const config = {
  matcher: ['/three-api/:path*', '/eazycloze', '/eazycloze/:path*',
            '/national-api/:path*', '/national-admin']
};
