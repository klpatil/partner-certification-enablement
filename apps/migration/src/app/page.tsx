import { cacheLife } from 'next/cache';
import Link from 'next/link';
import { Suspense } from 'react';

import { getBlogPosts, getCategories, getFeaturedBlogPosts } from '@/api';

import BlogPosts from '@/components/blog-posts';

const getBlogStats = async () => {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  return {
    totalPosts: posts.length,
    totalCategories: categories.length,
    avgReadTime: Math.round(
      posts.reduce((acc, post) => acc + post.readTime, 0) / posts.length
    ),
  };
};

const getHomePageData = async () => {
  const [featuredPosts, stats] = await Promise.all([
    getFeaturedBlogPosts(),
    getBlogStats(),
  ]);

  return { featuredPosts, stats };
};

export default async function HomePage() {
  'use cache';
  cacheLife('minutes');
  const { featuredPosts, stats } = await getHomePageData();

  return (
    <main className="space-y-16">
      <section className="rounded-lg border bg-card px-6 py-16 text-center shadow-sm">
        <h1 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          ACME Blog
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Discover the latest insights and thought leadership on trending topics
          across advertising, aviation, defense, media, and more. Dive into
          articles that explore innovative solutions and strategies that drive
          smarter decisions, enhance operations, and empower businesses to
          thrive.
        </p>
        <Link
          className="inline-flex h-11 items-center justify-center rounded bg-primary px-8 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/blog"
        >
          Browse All Posts
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="font-bold text-3xl text-primary">
            {stats.totalPosts}
          </div>
          <div className="mt-2 text-muted-foreground text-sm">Total Posts</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="font-bold text-3xl text-primary">
            {stats.totalCategories}
          </div>
          <div className="mt-2 text-muted-foreground text-sm">Categories</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="font-bold text-3xl text-primary">
            {stats.avgReadTime} min
          </div>
          <div className="mt-2 text-muted-foreground text-sm">
            Avg Read Time
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-8 font-bold text-3xl tracking-tight">
          Featured Posts
        </h2>

        <BlogPosts posts={featuredPosts} />
      </section>
    </main>
  );
}
