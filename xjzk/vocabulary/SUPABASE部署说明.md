# Supabase 云同步部署

## 1. 创建数据库

在 Supabase 项目的 SQL Editor 中执行：

`supabase/migrations/202607040001_cloud_progress.sql`

它会创建登录码表、学生进度表，并录入现有 50 个登录码。

## 2. 部署云函数

安装并登录 Supabase CLI 后，在本文件所在目录执行：

```powershell
supabase login
supabase link --project-ref 你的项目ID
supabase functions deploy vocab-progress --no-verify-jwt
```

`SUPABASE_URL` 和 `SUPABASE_SERVICE_ROLE_KEY` 由 Supabase Edge Functions 自动提供，不要写入网页。

## 3. 配置网页

编辑 `网页系统/cloud-config.js`：

```js
window.CLOUD_CONFIG = {
  functionUrl: "https://你的项目ID.supabase.co/functions/v1/vocab-progress",
  anonKey: "你的 Supabase anon 或 publishable key"
};
```

`anonKey` 可以公开在前端；严禁填写 `service_role` 或 secret key。

## 4. 上传 GitHub Pages

将 `网页系统` 文件夹中的全部文件上传到 GitHub Pages 发布目录。  
其中 `cloud-config.js` 必须一起上传。

## 数据同步规则

- 每个登录码对应一份云端学习档案。
- 登录时优先读取云端进度。
- 学习过程中先保存到本机，再自动上传云端。
- 同一个登录码在多个设备同时操作时，以最后一次保存为准。
