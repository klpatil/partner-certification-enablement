import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/api';

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article className="group relative flex h-full flex-col" key={post.id}>
          <Link className="block h-full" href={`/blog/${post.slug}`}>
            <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={post.imageUrl}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded bg-muted px-2 py-1 font-medium text-foreground">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="line-clamp-2 font-semibold text-xl tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3">
                  <Image
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full border"
                    height={32}
                    src={post.author.avatar}
                    width={32}
                  />
                  <div className="text-sm">
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Cached at: {new Date().toISOString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function BlogPostsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="overflow-hidden rounded-lg border bg-card" key={index}>
          <div className="aspect-video animate-pulse bg-muted" />
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <div className="h-6 animate-pulse rounded bg-muted" />
              <div className="h-6 animate-pulse rounded bg-muted" />
            </div>
            <div className="mb-1 h-4 animate-pulse rounded bg-muted" />
            <div className="mb-6 h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
              <div>
                <div className="mb-1 h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
