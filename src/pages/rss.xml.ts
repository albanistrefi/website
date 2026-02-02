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

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://www.albanistrefi.me');
  const now = new Date();
  const allPosts = await getCollection('writing');
  const posts = filterDrafts(allPosts)
    .filter((post) => post.data.publishDate <= now)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const feedTitle = 'Alban Istrefi';
  const feedDescription =
    'Personal blog and portfolio of Alban Istrefi, software developer and technical writer.';
  const siteUrl = base.toString().replace(/\/$/, '');
  const lastBuildDate = (posts[0]?.data.updatedDate ?? posts[0]?.data.publishDate ?? now).toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = new URL(`/writing/${post.slug}`, base).toString();
      const categories = (post.data.tags ?? [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('');
      const author = post.data.author ? `<dc:creator>${escapeXml(post.data.author)}</dc:creator>` : '';

      return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <link>${postUrl}</link>
        <guid>${postUrl}</guid>
        <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
        <description>${escapeXml(post.data.description)}</description>
        ${author}
        ${categories}
      </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
