# Unified training administrator

Canonical URL: `https://pro.yunmianas.cn/admin/`.

The dashboard manages the existing national cloze, Guangzhou cloze, Shanghai
cloze, seven-choice and national grammar authorization services. A single
password submission authenticates each service independently; passwords are
cleared from the form immediately and are never persisted. Every dashboard
visit and reload starts locked and sends no account-list requests. Each
service is usable only after its password verification succeeds on that page;
existing service cookies cannot unlock a new visit or a failed password
attempt. National and three-site services keep their existing HttpOnly
cookies. The national grammar token is held in memory only; the old
sessionStorage token is removed. Partial service failures show a reconnect
action inside the authenticated dashboard, never a simultaneous login form.

The national and three-site databases are unchanged. National grammar remains
on its current service; every legacy request is scoped to `national_grammar`.
Old copies of national/three-site authorizations from the legacy database are
excluded. No learning-progress API is called by the dashboard.

Features: per-specialty lists/search, multi-specialty phone authorization,
notes, enable/disable, national login-code creation/update and device reset.
Service failures are shown independently and failed lists are cleared, so
another specialty can remain usable without presenting stale account data.
Partial multi-specialty saves report the exact success/failure scope. The
dashboard retains learning records when permissions are disabled.

The root middleware redirects these administrator entries to `/admin/` with
their specialty selected: `/national-admin`, `/eazycloze/admin.html`,
`/7-5task/admin.html`, `/7-5task/admin-supabase.html`, `/gzcloze/admin.html`,
and `/shcloze/admin.html`. Student routes and both Tencent API rewrites are
preserved. No server installation, data import or scheduled publication is
required. The existing repository deployment publishes these static files.

Verification (isolated data, never production learner records):

```
node --test migration/unified-admin/admin.test.cjs
node migration/unified-admin/browser-check.cjs
```

The tests use real in-memory national and three-site services and a scoped
legacy fixture. Browser QA uses installed Chromium, with a Chrome DevTools
connection created by the test itself. Screenshots are ignored in `.staging/`.
`ADMIN_TEST_CHROME` may override the local executable path.

Production verification must check exact public asset hashes, old-entry
redirects, student page availability and service health. Administrator
mutations are tested only against isolated fixtures. Logging into production
with the existing password remains a user acceptance check when no current
administrator credential is available to the verifier.

Deployment rollback: restore `middleware.js` from the parent commit before
this change. This restores all original administrator entries and API routing;
no database restoration is necessary.
