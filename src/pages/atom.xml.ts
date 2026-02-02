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
  const feedSubtitle =
    'Personal blog and portfolio of Alban Istrefi, software developer and technical writer.';
  const siteUrl = base.toString().replace(/\/$/, '');
  const updated = (posts[0]?.data.updatedDate ?? posts[0]?.data.publishDate ?? now).toISOString();

  const entriesXml = posts
    .map((post) => {
      const postUrl = new URL(`/writing/${post.slug}`, base).toString();
      const postUpdated = (post.data.updatedDate ?? post.data.publishDate).toISOString();
      const postPublished = post.data.publishDate.toISOString();
      const categories = (post.data.tags ?? [])
        .map((tag) => `<category term="${escapeXml(tag)}" />`)
        .join('');
      const author = post.data.author
        ? `<author><name>${escapeXml(post.data.author)}</name></author>`
        : '';

      return `
  <entry>
    <title>${escapeXml(post.data.title)}</title>
    <id>${postUrl}</id>
    <link href="${postUrl}" />
    <updated>${postUpdated}</updated>
    <published>${postPublished}</published>
    <summary>${escapeXml(post.data.description)}</summary>
    ${author}
    ${categories}
  </entry>`;
    })
    .join('');

  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(feedTitle)}</title>
  <id>${siteUrl}</id>
  <link rel="alternate" href="${siteUrl}" />
  <link rel="self" href="${siteUrl}/atom.xml" />
  <updated>${updated}</updated>
  <subtitle>${escapeXml(feedSubtitle)}</subtitle>
  ${entriesXml}
</feed>`;

  return new Response(atomXml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8'
    }
  });
};
