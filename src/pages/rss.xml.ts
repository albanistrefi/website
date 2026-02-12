import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { filterDrafts } from '@/utils';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async (context) => {
  const now = new Date();
  const allPosts = await getCollection('writing');
  const posts = filterDrafts(allPosts)
    .filter((post) => post.data.publishDate <= now)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  return rss({
    title: 'Alban Istrefi',
    description: 'Personal blog and portfolio of Alban Istrefi, software developer and technical writer.',
    site: context.site ?? new URL('https://www.albanistrefi.me'),
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
    },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/writing/${post.slug}`,
      pubDate: post.data.publishDate,
      categories: post.data.tags ?? [],
      customData: post.data.author
        ? `<dc:creator>${escapeXml(post.data.author)}</dc:creator>`
        : undefined,
    })),
    customData: '<language>en</language>',
  });
};
