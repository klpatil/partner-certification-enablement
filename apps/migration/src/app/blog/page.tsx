import {getBlogPosts, getCategories} from "@/api";

import BlogPosts from "@/components/blog-posts";
import CategoryFilter from "@/components/category-filter";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{category?: string}>;
}) {
  const {category} = await searchParams;
  const [categories, posts] = await Promise.all([getCategories(), getBlogPosts(category)]);

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <header>
        <h1 className="mb-4 text-4xl font-bold">ACME Blog</h1>
        <p className="text-muted-foreground">
          Discover the latest insights and thought leadership on trending topics across advertising,
          aviation, defense, media, and more. Dive into articles that explore innovative solutions
          and strategies that drive smarter decisions, enhance operations, and empower businesses to
          thrive.
        </p>
      </header>

      <CategoryFilter categories={categories} />

      <BlogPosts posts={posts} />
    </div>
  );
}
