import { Suspense } from 'react';
import { getBlogPosts, getCategories } from '@/api';
import BlogPosts from '@/components/blog-posts';
import CategoryFilter from '@/components/category-filter';

const BlogPostCached = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;
  const posts = await getBlogPosts(category);
  return <BlogPosts posts={posts} />;
};

// Keep posts dynamic based on search params
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const categories = await getCategories();

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <header>
        <h1 className="mb-4 font-bold text-4xl">ACME Blog</h1>
        <p className="text-muted-foreground">
          Discover the latest insights and thought leadership on trending topics
          across advertising, aviation, defense, media, and more. Dive into
          articles that explore innovative solutions and strategies that drive
          smarter decisions, enhance operations, and empower businesses to
          thrive.
        </p>
      </header>

      <CategoryFilter categories={categories} />

      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogPostCached searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
