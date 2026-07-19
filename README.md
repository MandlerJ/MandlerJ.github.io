# Atom Note

Atom Note 是 Mandler J 的个人博客，使用 Markdown 写作，由 Astro 生成网页，并通过 GitHub Pages 自动发布。

博客地址：<https://mandlerj.github.io>

这份说明分成两部分：

1. **日常使用**：博客已经配置好以后，如何写文章、预览和发布；
2. **从零配置**：假设完全不了解 Node.js、npm、Git 和 GitHub Pages，如何从头搭建运行环境。

---

# 第一部分：日常使用

博客配置完成后，日常只需要更新文章或网站文字，不需要重复配置 GitHub Pages。

## 1. 发布一篇新文章

开始前，在 VS Code 中打开博客目录和终端，然后依次运行：

```bash
git pull --rebase
npm run new -- "文章标题"
npm run dev
```

| 命令 | 含义 |
| --- | --- |
| `git pull --rebase` | 从 GitHub 同步最新内容，避免版本冲突 |
| `npm run new -- "文章标题"` | 在 `src/content/posts/` 中创建一篇 Markdown 草稿 |
| `npm run dev` | 启动本地预览；打开终端显示的地址查看文章 |

打开新生成的 Markdown 文件，修改文章信息并撰写正文：

```yaml
---
title: 文章标题
description: 用一两句话概括文章
published: 2026-07-13
tags:
  - 思考
draft: true
---
```

- `draft: true`：草稿，只在本地预览；
- `draft: false`：正式文章，可以发布；
- 使用 `##` 写主要章节，使用 `###` 写章节中的小节。

写完后，将 `draft` 改为 `false`，停止预览时按 `Ctrl + C`，然后运行：

```bash
npm run publish -- "发布：文章标题"
```

这条命令会检查网站、提交文章、推送到 GitHub，并触发自动部署。等待仓库 `Actions` 页面显示绿色对勾后，刷新 <https://mandlerj.github.io>。

## 2. 修改已经发布的文章

打开 `src/content/posts/` 中对应的 Markdown 文件直接修改。需要标记更新时间时，在文章顶部添加：

```yaml
updated: 2026-07-13
```

完成后运行：

```bash
npm run publish -- "更新：文章标题"
```

如果想暂时隐藏文章，将它改为 `draft: true`，再运行同一条发布命令。

## 3. 添加文章图片

把图片放入：

```text
public/images/
```

然后在 Markdown 中引用：

```md
![图片说明](../../images/example.jpg)
```

图片会和文章一起被 `npm run publish` 提交和发布。

## 4. 修改个人介绍和网站文字

| 想修改的内容 | 文件 |
| --- | --- |
| 个人介绍、联系方式 | `src/pages/about.astro` |
| 首页大标题和首页介绍 | `src/pages/index.astro` |
| 博客名称、作者、网站简介 | `src/utils/site.ts` |

修改后先检查网站：

```bash
npm run dev
```

`npm run publish` 只会自动提交文章和图片，不会提交网站页面。确认效果后，需要手动发布网站文字修改：

```bash
npm run build
git add src/pages/about.astro src/pages/index.astro src/utils/site.ts
git commit -m "更新个人介绍和网站文字"
git push
```

| 命令 | 含义 |
| --- | --- |
| `npm run build` | 检查网站能否正常生成 |
| `git add ...` | 选择本次需要提交的文件 |
| `git commit -m "说明"` | 保存一次带说明的修改记录 |
| `git push` | 把修改上传到 GitHub，并触发网站部署 |

如果只修改了一个文件，`git add` 后只写那个文件即可。例如只修改个人介绍：

```bash
npm run build
git add src/pages/about.astro
git commit -m "更新个人介绍"
git push
```

## 5. 日常命令速查

| 命令 | 含义 |
| --- | --- |
| `git status` | 查看哪些文件发生了变化，不会修改文件 |
| `git pull --rebase` | 同步 GitHub 最新内容 |
| `npm run new -- "标题"` | 创建文章草稿 |
| `npm run dev` | 本地预览 |
| `npm run publish -- "说明"` | 发布文章和图片 |

---

# 第二部分：假设我是小白——从零开始配置

这一部分记录如何从一台刚准备好的电脑开始，把 Atom Note 发布到 GitHub Pages。已经成功上线后，不需要每天重复这些步骤。

## 1. 先理解几个名词

### Markdown

Markdown 是写文章使用的纯文本格式。它让你用 `##`、`**文字**`、表格符号等简单标记表达章节和排版。

你日常主要维护的就是 Markdown 文件。

### Astro

Astro 是博客的网页生成工具。它负责读取 Markdown，套用 Atom Note 的布局和样式，最后生成浏览器可以打开的 HTML 和 CSS。

你不需要学习 Astro 编程才能写文章。

### Node.js

Node.js 是在电脑上运行 Astro 的环境，可以把它理解成“运行博客排版程序的机器”。

Node.js 只在本地预览和构建时使用。读者访问博客时不需要安装 Node.js。

### npm

npm 会随 Node.js 一起安装，负责下载 Astro 等依赖，并执行项目预设命令。

例如：

```bash
npm run dev
```

意思是让 npm 执行“启动本地预览”这项任务。

### Git

Git 用来记录文件的每次变化。一次 `commit` 可以理解成给当前项目保存一个带说明的版本快照。

### GitHub

GitHub 用来在线保存 Git 仓库。本地文章推送到 GitHub 后，可以在其他电脑继续维护，也能触发网站部署。

### GitHub Pages

GitHub Pages 是 GitHub 提供的静态网站托管服务。它负责把构建好的 Atom Note 展示在：

```text
https://mandlerj.github.io
```

### GitHub Actions

GitHub Actions 是运行在 GitHub 上的自动任务。每次向 `main` 分支推送内容后，它会自动安装依赖、检查、构建并部署博客。

整个关系是：

```text
编写 Markdown
      ↓
npm 执行命令
      ↓
Node.js 运行 Astro
      ↓
Astro 生成静态网页
      ↓
Git 推送到 GitHub
      ↓
GitHub Actions 自动部署
      ↓
GitHub Pages 展示博客
```

## 2. 创建 GitHub 仓库

登录 GitHub 账号 `MandlerJ`，打开：

```text
https://github.com/new
```

填写：

- Owner：`MandlerJ`；
- Repository name：`MandlerJ.github.io`；
- Description：`Atom Note - Personal Blog`；
- Visibility：选择 `Public`。

不要勾选：

- Add a README file；
- Add `.gitignore`；
- Choose a license。

然后点击 `Create repository`。

个人主页仓库名必须与 GitHub 用户名对应：

```text
GitHub 用户名：MandlerJ
仓库名：MandlerJ.github.io
博客地址：https://mandlerj.github.io
```

如果以后修改 GitHub 用户名，仓库名称、远程地址以及 `astro.config.mjs` 中的 `owner` 也要一起修改。

## 3. 安装 Node.js 和 npm

项目要求 Node.js `22.12.0` 或更高版本。

从 Node.js 官方网站安装 LTS 版本：

```text
https://nodejs.org/en/download
```

安装完成后重启 VS Code，打开终端并运行：

```bash
node -v
npm -v
```

`node -v` 应显示 `v22.12.0` 或更高版本。只要两个命令都能显示版本号，就说明 Node.js 和 npm 已经可用。

常见错误：

```text
command not found: node
```

表示 Node.js 没有正确安装，或者安装后还没有重启终端。

## 4. 安装 Git

运行：

```bash
git --version
```

如果能显示版本号，说明 Git 已安装。

如果提示找不到命令，需要从 Git 官方网站安装：

```text
https://git-scm.com/downloads
```

## 5. 设置 Git 提交身份

只需要设置一次：

```bash
git config --global user.name "Mandler J"
git config --global user.email "你的 GitHub 邮箱"
```

检查：

```bash
git config --global user.name
git config --global user.email
```

建议使用已经在 GitHub 账户中验证过的邮箱，或者 GitHub 提供的隐私邮箱。

## 6. 安装博客依赖

使用 VS Code 打开博客项目文件夹，然后打开终端。

先确认当前目录：

```bash
pwd
```

安装依赖：

```bash
npm install
```

这个命令会读取 `package.json`，下载 Astro 等工具到 `node_modules/`。

`node_modules/` 不需要手动修改，也不会上传到 GitHub。

安装完成后运行检查：

```bash
npm run check
```

正常结果应该是：

```text
0 errors
0 warnings
0 hints
```

再运行正式构建：

```bash
npm run build
```

看到 `Complete!` 表示博客可以正常生成。

## 7. 初始化本地 Git 仓库

先运行：

```bash
git status
```

如果已经显示 `On branch main`，说明当前目录已经是 Git 仓库，可以跳到下一节。

如果显示：

```text
fatal: not a git repository
```

运行：

```bash
git init -b main
```

然后将全部项目文件加入第一次提交：

```bash
git add .
git commit -m "创建 Atom Note"
```

## 8. 连接 GitHub 并首次推送

添加远程仓库：

```bash
git remote add origin https://github.com/MandlerJ/MandlerJ.github.io.git
```

检查：

```bash
git remote -v
```

应该看到：

```text
origin  https://github.com/MandlerJ/MandlerJ.github.io.git (fetch)
origin  https://github.com/MandlerJ/MandlerJ.github.io.git (push)
```

首次推送：

```bash
git push -u origin main
```

如果 VS Code 弹出 GitHub 登录窗口，按照提示在浏览器中授权。

注意：GitHub 不接受账户登录密码作为 Git 推送密码。如果终端要求输入密码，需要使用 Personal Access Token，或者通过 VS Code/GitHub CLI 的浏览器登录完成认证。

如果 `origin` 已存在但地址不正确，使用：

```bash
git remote set-url origin https://github.com/MandlerJ/MandlerJ.github.io.git
```

## 9. 开启 GitHub Pages

打开 GitHub 仓库：

```text
https://github.com/MandlerJ/MandlerJ.github.io
```

依次进入：

```text
Settings
→ Pages
→ Build and deployment
→ Source
→ GitHub Actions
```

项目已经包含：

```text
.github/workflows/deploy.yml
```

因此不要再创建 GitHub 推荐的其他工作流。

## 10. 检查第一次部署

打开仓库顶部的：

```text
Actions
```

找到：

```text
Deploy Atom Note to GitHub Pages
```

等待 `build` 和 `deploy` 都显示绿色对勾。

如果第一次工作流运行在开启 Pages 之前，可以点击：

```text
Run workflow → main → Run workflow
```

部署成功后访问：

```text
https://mandlerj.github.io
```

第一次部署通常需要等待一至数分钟。

---

# 常用命令速查

| 命令 | 用途 | 使用频率 |
| --- | --- | --- |
| `git pull --rebase` | 同步 GitHub 最新内容 | 每次开始写作前 |
| `npm install` | 安装项目依赖 | 第一次或依赖更新后 |
| `npm run new -- "标题"` | 创建 Markdown 草稿 | 每篇新文章一次 |
| `npm run dev` | 启动本地实时预览 | 写作过程中 |
| `npm run check` | 检查代码和文章结构 | 需要排查问题时 |
| `npm run build` | 生成正式网站 | 修改网站设置后 |
| `npm run preview` | 预览正式构建结果 | 发布前可选 |
| `npm run publish -- "说明"` | 检查、提交并发布文章 | 文章完成后 |
| `git status` | 查看哪些文件发生了变化 | 随时可以使用 |

# 项目目录说明

```text
src/content/posts/   所有 Markdown 文章，日常最常用
src/pages/           首页、关于、归档、标签等页面
src/components/      导航栏、页脚、文章列表等组件
src/styles/          网站的颜色、宽度、字体和表格样式
src/utils/site.ts    博客名称、作者和简介
public/images/       文章图片和公开静态资源
scripts/             创建文章和一键发布脚本
.github/workflows/   GitHub Pages 自动部署配置
```

# 常见问题

## `npm run dev` 提示 Node.js 版本不支持

运行：

```bash
node -v
```

确认版本不低于 `22.12.0`，升级 Node.js 后重新打开终端。

## 新文章在本地有，但正式网站没有

检查文章顶部是否仍是：

```yaml
draft: true
```

正式发布必须改成：

```yaml
draft: false
```

然后重新运行 `npm run publish`。

## 推送成功，但网站还没变化

打开 GitHub 仓库的 `Actions` 页面：

- 黄色圆点：仍在部署，请继续等待；
- 绿色对勾：部署成功，刷新页面；
- 红色叉号：部署失败，点进工作流查看报错步骤。

浏览器可能缓存旧页面，可以尝试强制刷新：

```text
Ctrl + Shift + R
```

## `git push` 提示认证失败

不要输入 GitHub 账户密码。通过 VS Code 的 GitHub 登录窗口授权，或使用 GitHub Personal Access Token。

## 修改“关于”页面后，运行一键发布却没有提交

这是正常的。`npm run publish` 只自动提交文章和图片。网站页面修改需要手动执行：

```bash
git add src/pages/about.astro
git commit -m "更新个人介绍"
git push
```

## 不确定自己改了什么

运行：

```bash
git status
```

它只查看状态，不会修改或删除任何文件。
