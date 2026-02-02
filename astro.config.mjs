// @ts-check
import { defineConfig } from 'astro/config';
import { getCollection } from 'astro:content';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const site = process.env.SITE_URL || 'https://www.albanistrefi.me';
const siteUrl = new URL(site);

const normalizePath = (pathname) =>
  pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

let postsByPathPromise;

const getPostsByPath = async () => {
  if (!postsByPathPromise) {
    postsByPathPromise = (async () => {
      const posts = await getCollection('writing');
      const map = new Map();
      posts
        .filter((post) => !post.data.draft)
        .forEach((post) => {
          const lastmod = post.data.updatedDate ?? post.data.publishDate;
          const basePath = `/writing/${post.slug}`;
          map.set(basePath, lastmod.toISOString());
          map.set(`${basePath}/`, lastmod.toISOString());
        });
      return map;
    })();
  }
  return postsByPathPromise;
};

export default defineConfig({
  site,
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('.md'),
      serialize: async (item) => {
        const itemUrl = new URL(item.url, siteUrl);
        const path = normalizePath(itemUrl.pathname);
        const postsByPath = await getPostsByPath();
        const lastmod = postsByPath.get(path);
        if (lastmod) item.lastmod = lastmod;
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static'
});
