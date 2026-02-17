import type { CollectionEntry } from 'astro:content';

/**
 * Sort posts by publish date (newest first)
 * @param posts - Array of post entries
 * @returns Sorted array of posts
 */
export function sortPostsByDate(
  posts: CollectionEntry<'writing'>[]
): CollectionEntry<'writing'>[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.data.publishDate);
    const dateB = new Date(b.data.publishDate);
    return dateB.getTime() - dateA.getTime();
  });
}
