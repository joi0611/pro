# GitHub 上传优化版

这是由原项目生成的网页上传版。

- 图片已转换为 WebP，最长边不超过 1600px，质量约 84。
- 西双版纳相关图片集中在 `assets/xishuangbanna/`，网页引用已同步更新。
- 原始高清图片仍保留在上一级项目的 `assets` 目录，没有被删除。
- 视频和音频保持原格式，以确保互动页面功能不丢失。

## 网页上传顺序

如果使用 GitHub 网页上传，请按下面顺序分批：

1. 根目录的 HTML 和 README 文件；
2. `assets` 根目录文件，分两批选择，每批少于 100 个；
3. `assets/xishuangbanna/` 西双版纳图片文件夹；
4. `assets/adora/` 文件夹；
5. `assets/audio/adora/`、`assets/audio/dounan/`、`assets/audio/shanghai-energy/` 三个音频文件夹。

每次上传都不要超过 100 个文件。文件夹名称和层级必须保持不变。

使用 GitHub Desktop 或 Git 命令行时，直接上传整个目录即可。
