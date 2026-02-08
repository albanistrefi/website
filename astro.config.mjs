// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import matter from 'gray-matter';

// https://astro.build/config
const site = process.env.SITE_URL || 'https://www.albanistrefi.me';
const siteUrl = new URL(site);
const writingContentDir = fileURLToPath(new URL('./src/content/writing', import.meta.url));

const normalizePath = (pathname) =>
  pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

let postsByPathPromise;

const readMarkdownFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = `${dir}/${entry.name}`;
      if (entry.isDirectory()) return readMarkdownFiles(fullPath);
      return /\.(md|mdx)$/i.test(entry.name) ? [fullPath] : [];
    })
  );
  return files.flat();
};

const parseValidDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getPostsByPath = async () => {
  if (!postsByPathPromise) {
    postsByPathPromise = (async () => {
      const map = new Map();
      const files = await readMarkdownFiles(writingContentDir);
      await Promise.all(
        files.map(async (filePath) => {
          const source = await readFile(filePath, 'utf8');
          const { data } = matter(source);
          if (data.draft === true) return;

          const publishDate = parseValidDate(data.publishDate);
          const updatedDate = parseValidDate(data.updatedDate);
          const lastmod = updatedDate ?? publishDate;
          if (!lastmod) return;

          const slug = relative(writingContentDir, filePath)
            .replace(/\\/g, '/')
            .replace(/\.(md|mdx)$/i, '');
          const basePath = `/writing/${slug}`;
          map.set(basePath, lastmod.toISOString());
          map.set(`${basePath}/`, lastmod.toISOString());
        })
      );
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
