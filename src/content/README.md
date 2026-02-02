# Content Collections Guide

## Overview

This project uses Astro's Content Collections API for type-safe content management. All blog posts are stored in the `writing` collection.

## Directory Structure

```
src/content/
├── config.ts           # Content Collections schema
└── writing/            # Blog posts collection
    ├── 2023/          # Posts from 2023
    ├── 2024/          # Posts from 2024
    └── 2025/          # Posts from 2025
```

## Frontmatter Schema

All posts in the `writing` collection must have the following frontmatter:

```yaml
---
title: string                    # Post title (required)
description: string              # Post description (required)
publishDate: date               # Publish date YYYY-MM-DD (required)
updatedDate: date               # Last updated date YYYY-MM-DD (optional)
tags: array                     # Array of tags (required)
draft: boolean                  # Draft status (default: false)
author: string                  # Author name (optional)
featured: boolean               # Featured post (optional)
image: string                   # Hero image path (optional)
---
```

## Creating a New Post

1. Create a new `.md` or `.mdx` file in the appropriate year folder:
   ```
   src/content/writing/2025/my-new-post.md
   ```

2. Add frontmatter:
   ```yaml
   ---
  title: My New Post
  description: A brief description of the post
  publishDate: 2025-01-15
  updatedDate: 2025-02-01
  tags: [javascript, tutorial, webdev]
  draft: false
  author: Your Name
  featured: true
   ---
   ```

3. Write your content using Markdown or MDX

## Fetching Posts

### Get all posts
```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('writing');
```

### Get published posts only
```typescript
import { getCollection } from 'astro:content';
import { filterDrafts } from '@/utils';

const allPosts = await getCollection('writing');
const publishedPosts = filterDrafts(allPosts);
```

### Sort posts by date
```typescript
import { getCollection } from 'astro:content';
import { sortPostsByDate } from '@/utils';

const posts = await getCollection('writing');
const sortedPosts = sortPostsByDate(posts);
```

## Using MDX Components

Import and use MDX components in your posts:

### CodeBlock
```mdx
import { CodeBlock } from '@/components/mdx';

<CodeBlock
  code="console.log('Hello, World!');"
  lang="javascript"
  title="hello.js"
  showLineNumbers={true}
/>
```

### Callout
```mdx
import { Callout } from '@/components/mdx';

<Callout type="info" title="Important Note">
  This is an informational callout box.
</Callout>

<Callout type="warning" title="Warning">
  Be careful with this approach!
</Callout>
```

## Utility Functions

### Date Formatting
```typescript
import { formatDate } from '@/utils';

const date = new Date(post.data.publishDate);
formatDate(date);           // "January 15, 2025"
```

### Reading Time
```typescript
import { getReadingTimeText, getReadingTimeMinutes } from '@/utils';

getReadingTimeText(post.body);     // "5 min read"
getReadingTimeMinutes(post.body);  // 5
```

## Complete Example

```astro
---
import { getCollection } from 'astro:content';
import { filterDrafts, sortPostsByDate, formatDate, getReadingTimeText } from '@/utils';

// Get all published posts, sorted by date
const allPosts = await getCollection('writing');
const posts = sortPostsByDate(filterDrafts(allPosts));
---

<div>
  {posts.map(post => (
    <article>
      <h2>{post.data.title}</h2>
      <p>{post.data.description}</p>
      <time>{formatDate(post.data.publishDate)}</time>
      <span>{getReadingTimeText(post.body)}</span>
      <div>
        {post.data.tags.map(tag => (
          <span>{tag}</span>
        ))}
      </div>
    </article>
  ))}
</div>
```

## Type Safety

TypeScript will provide full type safety for your content:

```typescript
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'writing'>;

const post: Post = {
  // TypeScript knows all available properties
  data: {
    title: string,
    description: string,
    publishDate: Date,
    tags: string[],
    draft: boolean,
    // ... optional fields
  },
  body: string,
  slug: string,
  // ... other Astro properties
};
```

## Best Practices

1. **Use year-based folders** - Keep posts organized by year
2. **Always set draft status** - Use `draft: true` for unpublished posts
3. **Descriptive slugs** - Use kebab-case filenames that describe the post
4. **Required fields** - Always include title, description, publishDate, and tags
5. **Use updatedDate** - Set `updatedDate` when you revise an already-published post
6. **Tag consistency** - Use consistent tag names across posts
7. **Featured posts** - Mark important posts with `featured: true`

## Environment-Based Filtering

Draft posts are automatically filtered based on environment:

- **Development** (`npm run dev`) - Shows all posts including drafts
- **Production** (`npm run build`) - Hides draft posts

This allows you to preview drafts locally while keeping them hidden in production.
