import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );

  return posts.sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );
}

export function getReadingTime(markdown: string) {
  const clean = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`~\[\]()|:-]/g, ' ');
  const chineseCharacters = clean.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords = clean.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(chineseCharacters / 400 + latinWords / 220));
  return `${minutes} 分钟阅读`;
}
