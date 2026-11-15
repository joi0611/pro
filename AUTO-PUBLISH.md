# Website publication

All training website pages and question banks, including national cloze, now
use the existing GitHub-to-EdgeOne publication pipeline:

1. Update the matching directory in `joi0611/pro`, branch `main`.
2. The existing hosting integration runs `node build-network.cjs`.
3. Build validation completes and hosting publishes the resulting website.

No follow-up manual national publication or recurring GitHub polling is
needed. The Windows task `NationalCloze-AutoDeploy-v1` remains without
automatic triggers; its static mirror is a historical fallback and no longer
serves the original-domain national website.

| Website | Repository directory | Account / progress service |
| --- | --- | --- |
| National cloze | `eazycloze/` | Existing Tencent `/national-api/` |
| Guangzhou cloze | `gzcloze/` | Existing Tencent `/three-api/gzcloze/` |
| Shanghai cloze | `shcloze/` | Existing Tencent `/three-api/shcloze/` |
| Seven choice | `7-5task/` | Existing Tencent `/three-api/seven_choice/` |
| Unified administrator | `admin/` | Existing authorized services |

Other website directories continue through their existing static publication
flow. The national grammar administrator retains its current scoped service.

`build-national-static.cjs` reuses the reviewed migration compiler. It keeps
the dedicated Tencent transport, original browser account/storage keys,
phone and code login, cloud restore/save and revision conflict handling. The
generic network build skips legacy rewrites for an already migrated national
client. Relative public assets receive content hashes in their HTML URLs.
An incompatible national upload fails the build before publication.

Only national account/progress API paths are proxied to Tencent; national
pages and assets now follow the same static hosting route as the other sites.
Administrator entry redirects and explicit-password protection are preserved.
The existing SQLite databases, learner records, secure sessions and backups
are outside the website build. This configuration neither imports nor
replaces them and needs no Tencent service restart.

Keep these root publication files when updating website directories:
`edgeone.json`, `middleware.js`, `build-network.cjs`,
`build-national-static.cjs`, and `national-autodeploy.cjs`. The last file is
imported only as a local compiler; its server updater is never executed by the
hosting build.

Public national version evidence:
`https://pro.yunmianas.cn/eazycloze/deploy-version.json` reports
`mode: github-static` plus the content revision. This revision changes when
public website or question-bank content changes.

Verification:

```
node --test migration/github-autopublish/build.test.cjs migration/unified-admin/admin.test.cjs
node migration/unified-admin/browser-check.cjs
```

The build test reads the current checkout's national source. For an isolated
build output or archived source, set `NATIONAL_BUILD_FIXTURE` to that directory;
this also enables the browser test's national phone/code login, old-record
import, progress save and second-device restore checks. Tests use isolated
in-memory stores only.

Rollback: restore the prior `middleware.js` and `build-network.cjs` together
to route national pages to the existing Tencent static mirror. The account
and progress API does not move, so no learner-data rollback is needed.
