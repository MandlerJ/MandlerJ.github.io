# Atom Note

Mandler J 的个人博客。使用 Astro 构建，并通过 GitHub Pages 自动发布。

## 第一次设置

建议在 GitHub 新建名为 `MandlerJ.github.io` 的公开仓库，这样博客地址最简洁：

```text
https://mandlerj.github.io
```

如果使用其他仓库名也没有问题，网站会自动发布到：

```text
https://mandlerj.github.io/仓库名/
```

将本项目推送到仓库的 `main` 分支后，在 GitHub 仓库中打开：

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

首次工作流完成后，网站即可访问。

如果当前文件夹还没有 Git 仓库，首次上传可以依次运行：

```bash
git init -b main
git add .
git commit -m "创建 Atom Note"
git remote add origin https://github.com/MandlerJ/MandlerJ.github.io.git
git push -u origin main
```

上面的地址按推荐的 `MandlerJ.github.io` 仓库名编写；如果使用其他仓库名，请替换最后一段。

## 安装与预览

需要 Node.js 22.12.0 或更高版本，推荐使用最新的 Node.js 22 LTS。

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址即可预览。修改文章后，页面会自动刷新。

## 新建文章

运行：

```bash
npm run new -- "文章标题"
```

它会在 `src/content/posts/` 中生成一篇 Markdown 草稿。文章开头的信息含义如下：

```yaml
---
title: 文章标题
description: 显示在首页和搜索结果中的简短摘要
published: 2026-07-12
updated: 2026-07-15 # 可选
tags:
  - 思考
  - 阅读
draft: true              # true 不公开，完成后改为 false
---
```

文章正文使用普通 Markdown：

```md
## 第一章

这里是正文。

| 维度 | 方案 A | 方案 B |
| --- | --- | --- |
| 特点 | 简单 | 完整 |
```

建议用二级标题 `##` 表示章节，三级标题 `###` 表示章节中的小节。页面会自动生成目录。

## 添加图片

将图片放入 `public/images/`，然后在文章中使用：

```md
![图片说明](../../images/example.jpg)
```

这里使用相对地址，是为了让图片同时兼容根域名博客和带仓库名的 GitHub Pages 地址。

## 一键发布内容

第一次使用前，确保本地 Git 已经登录且当前分支能够正常 `git push`。以后完成文章并把 `draft` 改成 `false` 后运行：

```bash
npm run publish -- "发布：文章标题"
```

这个命令会依次：

1. 构建并检查网站；
2. 添加文章与图片；
3. 创建一次 Git 提交；
4. 推送到 GitHub，触发自动发布。

它只会自动提交 `src/content/posts/` 和 `public/images/` 中的内容，不会误提交其他临时修改。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 本地写作与实时预览 |
| `npm run new -- "标题"` | 创建 Markdown 草稿 |
| `npm run check` | 检查页面和类型 |
| `npm run build` | 生成正式网站 |
| `npm run preview` | 预览正式构建结果 |
| `npm run publish -- "说明"` | 检查、提交并推送文章 |

## 目录说明

```text
src/content/posts/   Markdown 文章
src/pages/           网站页面
src/components/      页面组件
src/styles/          全局视觉样式
public/images/       文章图片
.github/workflows/   GitHub Pages 自动发布配置
```

站点名称、作者和简介集中在 `src/utils/site.ts`，以后可以从这里修改。
