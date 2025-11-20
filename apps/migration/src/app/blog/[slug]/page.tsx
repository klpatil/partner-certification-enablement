import { cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getBlogPostBySlug, getFeaturedBlogPosts } from '@/api';
import BlogPosts from '@/components/blog-posts';

const BlogPostCached = async ({ slug }: { slug: string }) => {
  'use cache';
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  cacheTag(`blog-post-${post.id}`);

  const featuredPosts = await getFeaturedBlogPosts();

  return (
    <div>
      <Suspense fallback={<div>Loading a blog post...</div>}>
        <div>
          <h1>Cached at : {new Date().toISOString()}</h1>
          <h1>Post ID : {post.id}</h1>
          <h1>Post : {slug}</h1>
          <h2>Post : {post.title}</h2>
          <p>Post Content:{post.content}</p>
        </div>
      </Suspense>
      <div className="mt-16 border-t pt-16">
        <h2 className="mb-8 font-bold text-3xl">Featured Posts</h2>
        <Suspense fallback={<div>Loading featured posts...</div>}>
          <BlogPosts posts={featuredPosts} />
        </Suspense>
      </div>
    </div>
  );
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  'use cache';
  const { slug } = await params;

  return <BlogPostCached slug={slug} />;
}
