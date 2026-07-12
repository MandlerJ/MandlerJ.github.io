import { spawnSync } from 'node:child_process';

const message = process.argv[2] ?? `发布文章 ${new Date().toISOString().slice(0, 10)}`;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false, ...options });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log('1/4 检查网站能否正常构建…');
run('npm', ['run', 'build']);

console.log('2/4 添加文章和图片…');
run('git', ['add', 'src/content/posts', 'public/images']);

const staged = spawnSync('git', ['diff', '--cached', '--quiet']);
if (staged.status === 0) {
  console.log('没有需要发布的新内容。');
  process.exit(0);
}
if (staged.status !== 1) process.exit(staged.status ?? 1);

console.log('3/4 保存本次更新…');
run('git', ['commit', '-m', message]);

console.log('4/4 推送到 GitHub…');
run('git', ['push']);
console.log('完成。GitHub Pages 将自动更新网站。');
