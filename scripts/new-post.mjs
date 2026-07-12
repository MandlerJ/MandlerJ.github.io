import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const title = process.argv[2];
const requestedSlug = process.argv[3];

if (!title) {
  console.error('请提供文章标题，例如：npm run new -- "我的第一篇文章"');
  process.exit(1);
}

const parts = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}).formatToParts(new Date());
const value = (type) => parts.find((part) => part.type === type)?.value ?? '';
const date = `${value('year')}-${value('month')}-${value('day')}`;
const fallbackSlug = `note-${value('hour')}${value('minute')}`;
const slug = (requestedSlug ?? title)
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9\u3400-\u9fff]+/g, '-')
  .replace(/^-|-$/g, '') || fallbackSlug;
const directory = resolve('src/content/posts');
const file = resolve(directory, `${date}-${slug}.md`);

if (existsSync(file)) {
  console.error(`文件已经存在：${file}`);
  process.exit(1);
}

mkdirSync(directory, { recursive: true });
writeFileSync(file, `---
title: ${JSON.stringify(title)}
description: 请用一两句话概括这篇文章。
published: ${date}
tags:
  - 随笔
draft: true
---

## 第一章

从这里开始写作。

## 第二章

继续你的思考。
`, 'utf8');

console.log(`已创建：${file}`);
console.log('完成后将 draft 改为 false，即可正式发布。');
