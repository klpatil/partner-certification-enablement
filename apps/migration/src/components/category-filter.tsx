'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import type { Category } from '@/api';

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        className={`rounded px-3 py-1.5 font-medium text-sm transition-colors ${
          activeCategory
            ? 'bg-muted text-foreground hover:bg-muted/80'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
        href="/blog"
      >
        All Posts ({categories.reduce((sum, cat) => sum + cat.postCount, 0)})
      </Link>
      {categories.map((category) => (
        <Link
          className={`rounded px-3 py-1.5 font-medium text-sm transition-colors ${
            activeCategory === category.slug
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
          href={`/blog?category=${category.slug}`}
          key={category.id}
        >
          {category.name} ({category.postCount})
        </Link>
      ))}
    </div>
  );
}
