import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { filterDrafts } from '@/utils';

export async function getStaticPaths() {
  const posts = filterDrafts(await getCollection('writing'));
  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

const buildFrontmatter = (data: {
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  tags: string[];
  author?: string;
}) => {
  const lines = [
    '---',
    `title: ${JSON.stringify(data.title)}`,
    `description: ${JSON.stringify(data.description)}`,
    `publishDate: ${data.publishDate.toISOString().slice(0, 10)}`,
  ];

  if (data.updatedDate) {
    lines.push(`updatedDate: ${data.updatedDate.toISOString().slice(0, 10)}`);
  }

  if (data.tags?.length) {
    lines.push(`tags: [${data.tags.map((tag) => JSON.stringify(tag)).join(', ')}]`);
  }

  if (data.author) {
    lines.push(`author: ${JSON.stringify(data.author)}`);
  }

  lines.push('---');
  return lines.join('\n');
};

export const GET: APIRoute = async ({ params, site }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  const base = site ?? new URL('https://www.albanistrefi.me');
  const posts = filterDrafts(await getCollection('writing'));
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const canonicalUrl = new URL(`/writing/${post.slug}`, base).toString();
  const frontmatter = buildFrontmatter({
    title: post.data.title,
    description: post.data.description,
    publishDate: post.data.publishDate,
    updatedDate: post.data.updatedDate,
    tags: post.data.tags ?? [],
    author: post.data.author,
  });

  const markdown = `${frontmatter}\n\n${post.body}\n`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      Link: `<${canonicalUrl}>; rel="canonical"`,
    },
  });
};
