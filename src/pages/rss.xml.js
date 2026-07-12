import rss from '@astrojs/rss';
import { getPublishedPosts } from '../utils/posts';
import { SITE, withBase } from '../utils/site';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(withBase('/'), context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: withBase(`/posts/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}
