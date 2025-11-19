import {faker} from "@faker-js/faker";

import {delay} from "./utils";

export type Category = ReturnType<typeof generateData>["categories"][number];

export type BlogPost = ReturnType<typeof generateData>["blogPosts"][number];

function generateData(postCount: number = 50) {
  faker.seed(123);

  const categories = [
    {
      id: faker.string.uuid(),
      name: "Advertising",
      slug: "advertising",
      description: "Advertising solutions and insights",
      postCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Aviation",
      slug: "aviation",
      description: "Intelligence for aviation industry",
      postCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Cross-industry",
      slug: "cross-industry",
      description: "Solutions across multiple sectors",
      postCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Government & Defense",
      slug: "government-defense",
      description: "Intelligence for public sector",
      postCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Media",
      slug: "media",
      description: "Content and broadcasting solutions",
      postCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Data & Intelligence",
      slug: "data-intelligence",
      description: "Advanced data and analytics",
      postCount: 0,
    },
  ];

  const blogPosts = [];

  for (let i = 0; i < postCount; i++) {
    const selectedCategory = faker.helpers.arrayElement(categories);
    const title = faker.company.catchPhrase();

    blogPosts.push({
      id: faker.string.uuid(),
      title: `${title} in ${selectedCategory.name}`,
      slug: faker.helpers.slugify(title).toLowerCase(),
      excerpt: faker.lorem.paragraph(2),
      content: faker.lorem.paragraphs(5, "\n\n"),
      category: selectedCategory.slug,
      author: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      publishedAt: faker.date.recent({days: 30}).toISOString(),
      readTime: faker.number.int({min: 3, max: 12}),
      imageUrl: faker.image.urlPicsumPhotos({width: 800, height: 400}),
    });

    selectedCategory.postCount++;
  }

  blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return {categories, blogPosts};
}

const {categories: CATEGORIES, blogPosts: BLOG_POSTS} = generateData(50);

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  console.info(
    `[API] Fetching blog posts${category ? ` for category: ${category}` : ""} (250ms delay)`,
  );

  await delay(250);

  if (category) {
    return BLOG_POSTS.filter((post) => post.category === category);
  }

  return BLOG_POSTS;
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  console.info("[API] Fetching featured posts (250ms delay)");

  await delay(1500);

  return BLOG_POSTS.toSorted(() => Math.random() - 0.5).slice(0, 3);
}

export async function getCategories(): Promise<Category[]> {
  console.info("[API] Fetching categories (250ms delay)");

  await delay(250);

  return CATEGORIES;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  console.info(`[API] Fetching blog post with slug: ${slug} (250ms delay)`);

  await delay(250);

  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}
