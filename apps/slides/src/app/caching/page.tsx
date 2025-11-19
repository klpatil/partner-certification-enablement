'use client';

import { Alert } from '@repo/ui/components/alert';
import { InlineCode } from '@repo/ui/components/inline-code';
import { List, ListItem } from '@repo/ui/components/list';
import Presentation from '@repo/ui/components/presentation';
import Showcase from '@repo/ui/components/showcase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { Text } from '@repo/ui/components/text';

export default function CachingPresentation() {
  return (
    <Presentation.Root
      subtitle="New Caching Model & Migration Guide"
      title="Next.js 16 Caching"
    >
      {/* Introduction to Next.js 16 Caching */}
      <Presentation.Slide>
        <Text variant="title">Next.js 16 Caching Model</Text>
        <Text variant="subtitle">Understanding the New Approach</Text>

        <Text variant="default">
          Next.js 16 introduces a redesigned caching system that provides
          fine-grained control over what gets cached and for how long. The new
          model uses function-level directives instead of route segment config
          exports.
        </Text>

        <Alert variant="quote">
          <strong>Key Change:</strong> Move from route-level configuration to
          function-level caching directives for better granularity.
        </Alert>

        <Text variant="default">
          <strong>What's new in Next.js 16:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>"use cache" directive:</strong> Explicit caching at the
            function or component level
          </ListItem>
          <ListItem>
            <strong>cacheLife():</strong> Configure revalidation times with
            preset or custom profiles
          </ListItem>
          <ListItem>
            <strong>cacheTag():</strong> Tag cached content for targeted
            invalidation
          </ListItem>
          <ListItem>
            <strong>Pages are dynamic by default:</strong> Dynamic data must be
            wrapped in Suspense or marked with "use cache"
          </ListItem>
        </List>

        <Alert variant="error">
          <strong>Critical Change:</strong> With Cache Components, you must
          explicitly handle dynamic data using <InlineCode>&lt;Suspense&gt;</InlineCode> or{' '}
          <InlineCode>"use cache"</InlineCode>. Otherwise, you'll get a build
          error.
        </Alert>

        <Alert>
          <strong>Migration Path:</strong> The old route segment config still
          works, but the new directives offer more granular control.
        </Alert>
      </Presentation.Slide>

      {/* The "use cache" Directive */}
      <Presentation.Slide>
        <Text variant="title">The "use cache" Directive</Text>
        <Text variant="subtitle">Fine-Grained Cache Control</Text>

        <Text variant="default">
          The <InlineCode>"use cache"</InlineCode> directive is your new tool
          for marking components, functions, or even entire pages as cacheable.
          It works at multiple levels and gives you precise control.
        </Text>

        <Alert variant="quote">
          <strong>Key Concept:</strong> "use cache" tells Next.js to cache the
          output of a function or component. Use it strategically on expensive
          operations.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Component-Level Caching">
            {`export async function BlogPosts() {
  "use cache"
  
  const posts = await fetchPosts()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Function-Level Caching">
            {`async function getProducts() {
  "use cache"
  
  const products = await db.product.findMany()
  return products
}

// Usage in component
export default async function ProductsPage() {
  const products = await getProducts()
  
  return <ProductList products={products} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Benefits of "use cache":</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Granular control:</strong> Cache specific functions, not
            entire routes
          </ListItem>
          <ListItem>
            <strong>Better composition:</strong> Mix cached and dynamic content
            easily
          </ListItem>
          <ListItem>
            <strong>Explicit intent:</strong> Clear what's cached vs dynamic
          </ListItem>
          <ListItem>
            <strong>Better DX:</strong> No more guessing about caching behavior
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* cacheLife - Controlling Revalidation */}
      <Presentation.Slide>
        <Text variant="title">cacheLife() - Revalidation Control</Text>
        <Text variant="subtitle">How Long Should Content Be Cached?</Text>

        <Text variant="default">
          <InlineCode>cacheLife()</InlineCode> lets you configure how long
          cached content stays fresh. Next.js 16 provides preset profiles for
          common scenarios, or you can create custom configurations.
        </Text>

        <Alert variant="quote">
          <strong>Concept:</strong> Different content has different freshness
          requirements. Use cacheLife to match your application needs.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Using Preset Profiles">
            {`import { cacheLife } from 'next/cache'

export async function BlogPosts() {
  "use cache"
  cacheLife("minutes")
  
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}

export async function StaticContent() {
  "use cache"
  cacheLife("weeks")
  
  const content = await fetchStaticContent()
  return <div>{content}</div>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Custom Cache Configuration">
            {`import { cacheLife } from 'next/cache'

export async function PriceData() {
  "use cache"
  cacheLife({
    stale: 60,      // Fresh for 60 seconds
    revalidate: 300, // Revalidate after 5 minutes
    expire: 3600,   // Hard expire after 1 hour
  })
  
  const prices = await fetchPrices()
  return <PriceList prices={prices} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Available preset profiles:</strong>
        </Text>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Use Case</TableHead>
              <TableHead>Stale</TableHead>
              <TableHead>Revalidate</TableHead>
              <TableHead>Expire</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <InlineCode>default</InlineCode>
              </TableCell>
              <TableCell>Standard content</TableCell>
              <TableCell>5 min</TableCell>
              <TableCell>15 min</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InlineCode>seconds</InlineCode>
              </TableCell>
              <TableCell>Real-time data</TableCell>
              <TableCell>30 sec</TableCell>
              <TableCell>1 sec</TableCell>
              <TableCell>1 min</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InlineCode>minutes</InlineCode>
              </TableCell>
              <TableCell>News feeds, social</TableCell>
              <TableCell>5 min</TableCell>
              <TableCell>1 min</TableCell>
              <TableCell>1 hour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InlineCode>hours</InlineCode>
              </TableCell>
              <TableCell>Product pages</TableCell>
              <TableCell>5 min</TableCell>
              <TableCell>1 hour</TableCell>
              <TableCell>1 day</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InlineCode>days</InlineCode>
              </TableCell>
              <TableCell>Blog posts, articles</TableCell>
              <TableCell>5 min</TableCell>
              <TableCell>1 day</TableCell>
              <TableCell>1 week</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InlineCode>weeks</InlineCode>
              </TableCell>
              <TableCell>Newsletters, podcasts</TableCell>
              <TableCell>5 min</TableCell>
              <TableCell>1 week</TableCell>
              <TableCell>30 days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InlineCode>max</InlineCode>
              </TableCell>
              <TableCell>Archived, legal docs</TableCell>
              <TableCell>5 min</TableCell>
              <TableCell>30 days</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Alert>
          <strong>Client-side minimum:</strong> The client router enforces a
          30-second minimum stale time, regardless of configuration.
        </Alert>

        <Alert variant="success">
          <strong>Best Practice:</strong> Start with preset profiles. Only
          create custom configs when you have specific performance requirements.
        </Alert>
      </Presentation.Slide>

      {/* cacheTag - Targeted Invalidation */}
      <Presentation.Slide>
        <Text variant="title">cacheTag() - Targeted Cache Invalidation</Text>
        <Text variant="subtitle">Invalidate Only What Changed</Text>

        <Text variant="default">
          <InlineCode>cacheTag()</InlineCode> lets you tag cached content with
          identifiers. When content updates, you can invalidate specific tags
          instead of clearing all caches.
        </Text>

        <Alert variant="quote">
          <strong>Key Insight:</strong> When a blog post is updated, you only
          want to invalidate that post's cache - not every post on your site!
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Tagging Cached Content">
            {`import { cacheTag } from 'next/cache'

export async function BlogPost({ id }: { id: string }) {
  "use cache"
  cacheTag(\`blog-post-\${id}\`)  // Tag with specific post ID
  
  const post = await fetchBlogPost(id)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}

// You can also use multiple tags
export async function ProductPage({ id }: { id: string }) {
  "use cache"
  cacheTag(\`product-\${id}\`, 'products', 'catalog')
  
  const product = await fetchProduct(id)
  return <ProductDetails product={product} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Common tagging patterns:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>By ID:</strong> <InlineCode>blog-post-123</InlineCode> for
            individual items
          </ListItem>
          <ListItem>
            <strong>By category:</strong>{' '}
            <InlineCode>category-electronics</InlineCode> for groups
          </ListItem>
          <ListItem>
            <strong>By type:</strong> <InlineCode>products</InlineCode> or{' '}
            <InlineCode>users</InlineCode> for entity types
          </ListItem>
          <ListItem>
            <strong>Hierarchical:</strong>{' '}
            <InlineCode>blog-post-123, blog-posts, content</InlineCode> for
            flexible invalidation
          </ListItem>
        </List>

        <Alert>
          <strong>Pro Tip:</strong> Use multiple tags when content belongs to
          different logical groups. This gives you flexibility in how you
          invalidate caches.
        </Alert>
      </Presentation.Slide>

      {/* Cache Invalidation - updateTag and revalidateTag */}
      <Presentation.Slide>
        <Text variant="title">Cache Invalidation: updateTag & revalidateTag</Text>
        <Text variant="subtitle">Two Ways to Invalidate Cached Data</Text>

        <Text variant="default">
          Next.js 16 provides two functions for cache invalidation, each
          optimized for different scenarios.
        </Text>

        <Alert variant="quote">
          <strong>Key Difference:</strong> <InlineCode>updateTag</InlineCode>{' '}
          is for immediate "read-your-own-writes" in Server Actions, while{' '}
          <InlineCode>revalidateTag</InlineCode> is for background revalidation
          in Route Handlers and webhooks.
        </Alert>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>updateTag</TableHead>
              <TableHead>revalidateTag</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Where to use</TableCell>
              <TableCell>Server Actions only</TableCell>
              <TableCell>Server Actions & Route Handlers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Behavior</TableCell>
              <TableCell>Next request waits for fresh data</TableCell>
              <TableCell>
                Serves stale while fetching (with{' '}
                <InlineCode>profile="max"</InlineCode>)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Use case</TableCell>
              <TableCell>User sees their own changes immediately</TableCell>
              <TableCell>Background updates, webhooks</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="updateTag - Server Actions">
            {`'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBlogPost(formData: FormData) {
  const post = await db.blogPost.create({
    data: {
      title: formData.get('title'),
      content: formData.get('content'),
    }
  })
  
  // Immediate invalidation - user will see fresh data
  updateTag('blog-posts')
  updateTag(\`blog-post-\${post.id}\`)
  
  // User navigates to the new post - sees it immediately
  redirect(\`/blog/\${post.id}\`)
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="revalidateTag - Route Handler">
            {`import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify authentication
  const authHeader = request.headers.get('authorization')
  if (authHeader !== \`Bearer \${process.env.REVALIDATE_TOKEN}\`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { tag } = await request.json()
  
  // Background revalidation - serves stale while updating
  revalidateTag(tag, 'max')
  
  return NextResponse.json({ 
    revalidated: true, 
    tag,
    now: Date.now() 
  })
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert variant="error">
          <strong>Security Warning:</strong> Always protect revalidation
          endpoints with authentication! Use environment variables for tokens.
        </Alert>
      </Presentation.Slide>

      {/* Migration from Next.js 15 to 16 */}
      <Presentation.Slide>
        <Text variant="title">Migrating from Next.js 15 to 16</Text>
        <Text variant="subtitle">Step-by-Step Migration Guide</Text>

        <Text variant="default">
          Migrating to Next.js 16's caching model involves replacing route
          segment config exports with the new directives. Here's how to do it
          systematically.
        </Text>

        <Alert variant="quote">
          <strong>Note:</strong> The previous route segment config approach
          remains supported. You can migrate incrementally.
        </Alert>

        <Text variant="default">
          <strong>Step 1: Enable Cache Components</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="ts" title="next.config.ts">
            {`import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Step 2: Migrate Static Routes</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="❌ Next.js 15">
            {`// app/page.tsx
export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  const data = await fetchData()
  return <div>{data}</div>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="✅ Next.js 16">
            {`// app/page.tsx
import { cacheLife } from 'next/cache'

export default async function HomePage() {
  "use cache"
  cacheLife({ revalidate: 60 })
  
  const data = await fetchData()
  return <div>{data}</div>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Step 3: Handle Dynamic Data</strong>
        </Text>

        <Alert>
          <strong>Important:</strong> With Cache Components enabled, dynamic
          data must be explicitly handled with either{' '}
          <InlineCode>&lt;Suspense&gt;</InlineCode> or{' '}
          <InlineCode>"use cache"</InlineCode>.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="❌ Next.js 15">
            {`// app/blog/page.tsx
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="✅ Next.js 16 - Suspense">
            {`// app/blog/page.tsx
import { Suspense } from 'react'

async function DynamicPosts() {
  const posts = await fetchPosts()  // Fresh on every request
  return <PostList posts={posts} />
}

export default function BlogPage() {
  return (
    <>
      <h1>Blog</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <DynamicPosts />
      </Suspense>
    </>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="✅ Next.js 16 - Mixed">
            {`// app/blog/page.tsx
import { Suspense } from 'react'
import { cacheLife } from 'next/cache'

// Cached categories
async function Categories() {
  "use cache"
  cacheLife("days")
  
  const categories = await fetchCategories()
  return <CategoryFilter categories={categories} />
}

// Dynamic posts
async function RecentPosts() {
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}

export default function BlogPage() {
  return (
    <>
      <h1>Blog</h1>
      <Categories />  {/* Cached in static shell */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <RecentPosts />  {/* Streams at request time */}
      </Suspense>
    </>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Key difference:</strong> Without explicit handling, you'll
          get a build error: "Uncached data was accessed outside of Suspense".
        </Text>
      </Presentation.Slide>

      {/* Mixed Caching Strategies */}
      <Presentation.Slide>
        <Text variant="title">Mixed Caching Strategies</Text>
        <Text variant="subtitle">Combining Static, Cached, and Dynamic</Text>

        <Text variant="default">
          The real power of Cache Components is mixing static, cached, and
          dynamic content in a single page. Each piece can have its own
          caching strategy.
        </Text>

        <Alert variant="quote">
          <strong>Strategy:</strong> Static headers, cached stable data, and
          dynamic personalized content - all in one page with optimal
          performance.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Complete Example">
            {`import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife } from 'next/cache'

export default function BlogPage() {
  return (
    <>
      {/* 1. Static content - prerendered automatically */}
      <header>
        <h1>Our Blog</h1>
        <nav>Home | About | Contact</nav>
      </header>

      {/* 2. Cached content - included in static shell */}
      <BlogPosts />

      {/* 3. Dynamic content - streams at request time */}
      <Suspense fallback={<p>Loading preferences...</p>}>
        <UserPreferences />
      </Suspense>
    </>
  )
}

// Cached: Same for all users
async function BlogPosts() {
  "use cache"
  cacheLife("hours")
  
  const posts = await fetchPosts()
  
  return (
    <section>
      <h2>Latest Posts</h2>
      {posts.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
        </article>
      ))}
    </section>
  )
}

// Dynamic: Personalized per user
async function UserPreferences() {
  const theme = (await cookies()).get('theme')?.value
  
  return (
    <aside>
      <p>Your theme: {theme}</p>
    </aside>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Three content types:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Static:</strong> Header - prerendered automatically, no
            directive needed
          </ListItem>
          <ListItem>
            <strong>Cached:</strong> BlogPosts - marked with "use cache",
            included in static shell
          </ListItem>
          <ListItem>
            <strong>Dynamic:</strong> UserPreferences - wrapped in Suspense,
            streams at request time
          </ListItem>
        </List>

        <Alert variant="success">
          <strong>Best Practice:</strong> Place Suspense boundaries as close to
          dynamic components as possible to maximize static shell content.
        </Alert>
      </Presentation.Slide>

      {/* Custom Cache Profiles */}
      <Presentation.Slide>
        <Text variant="title">Custom Cache Profiles</Text>
        <Text variant="subtitle">Reusable Cache Configurations</Text>

        <Text variant="default">
          For complex applications, you can define custom cache profiles in{' '}
          <InlineCode>next.config.ts</InlineCode> and reuse them across your
          app.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="ts" title="next.config.ts">
            {`import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    'ecommerce-product': {
      stale: 300,      // 5 minutes fresh
      revalidate: 900,  // Revalidate after 15 min
      expire: 3600,     // Hard expire after 1 hour
    },
    'user-content': {
      stale: 0,         // Always revalidate
      revalidate: 60,   // Check every minute
      expire: 300,      // Expire after 5 minutes
    },
    'static-assets': {
      stale: 31536000,  // Fresh for 1 year
      revalidate: false, // Never revalidate
      expire: false,    // Never expire
    }
  }
}

export default nextConfig`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Using Custom Profiles">
            {`import { cacheLife } from 'next/cache'

export async function ProductPage({ id }: { id: string }) {
  "use cache"
  cacheLife("ecommerce-product")  // Use custom profile
  cacheTag(\`product-\${id}\`)
  
  const product = await fetchProduct(id)
  return <ProductDetails product={product} />
}

export async function UserProfile({ userId }: { userId: string }) {
  "use cache"
  cacheLife("user-content")  // Different profile for user data
  cacheTag(\`user-\${userId}\`)
  
  const user = await fetchUser(userId)
  return <ProfileCard user={user} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>When to create custom profiles:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Consistent patterns:</strong> Same cache behavior used
            across multiple places
          </ListItem>
          <ListItem>
            <strong>Complex requirements:</strong> Need specific stale/expire
            timings
          </ListItem>
          <ListItem>
            <strong>Team alignment:</strong> Enforce caching standards across
            the team
          </ListItem>
          <ListItem>
            <strong>Environment-specific:</strong> Different cache times for
            dev/prod
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* Common Patterns & Best Practices */}
      <Presentation.Slide>
        <Text variant="title">Common Patterns & Best Practices</Text>
        <Text variant="subtitle">Real-World Caching Strategies</Text>

        <Text variant="default">
          Let's look at proven patterns that work well in production
          applications.
        </Text>

        <Text variant="default">
          <strong>Pattern 1: Cached Product + Dynamic Inventory</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code
            language="tsx"
            title="E-commerce Product Page"
          >
            {`import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

// Product data cached for hours
async function ProductInfo({ id }: { id: string }) {
  "use cache"
  cacheLife("hours")
  cacheTag(\`product-\${id}\`, 'products')
  
  const product = await db.product.findUnique({ where: { id } })
  
  return <ProductDetails product={product} />
}

// Inventory dynamic (real-time)
async function LiveInventory({ id }: { id: string }) {
  const inventory = await db.inventory.findUnique({ 
    where: { productId: id } 
  })
  
  return <InventoryBadge stock={inventory.quantity} />
}

export default async function ProductPage({ params }) {
  const { id } = await params
  
  return (
    <div>
      {/* Cached product info */}
      <ProductInfo id={id} />
      
      {/* Dynamic inventory wrapped in Suspense */}
      <Suspense fallback={<div>Loading stock...</div>}>
        <LiveInventory id={id} />
      </Suspense>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Pattern 2: Shared Config + Personal Data</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Dashboard Page">
            {`import { Suspense } from 'react'
import { cacheLife } from 'next/cache'

// Shared widgets cached
async function WidgetLayout() {
  "use cache"
  cacheLife("days")
  
  const config = await fetchWidgetConfig()
  
  return (
    <div className="dashboard-layout">
      <h1>{config.title}</h1>
      {/* Layout structure */}
    </div>
  )
}

// User data NOT cached (personal)
async function UserData({ userId }: { userId: string }) {
  const userData = await db.user.findUnique({
    where: { id: userId },
    include: { stats: true, activity: true }
  })
  
  return (
    <>
      <UserStats data={userData.stats} />
      <ActivityFeed items={userData.activity} />
    </>
  )
}

export default function Dashboard({ userId }: { userId: string }) {
  return (
    <div>
      {/* Cached shared layout */}
      <WidgetLayout />
      
      {/* Dynamic user data wrapped in Suspense */}
      <Suspense fallback={<div>Loading your data...</div>}>
        <UserData userId={userId} />
      </Suspense>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Key Takeaways:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Static content:</strong> Headers, navigation - automatically
            prerendered
          </ListItem>
          <ListItem>
            <strong>Cached content:</strong> Mark with "use cache" + cacheLife
            for shared data
          </ListItem>
          <ListItem>
            <strong>Dynamic content:</strong> Wrap in Suspense for personalized
            or real-time data
          </ListItem>
          <ListItem>
            <strong>All dynamic data must be explicit:</strong> Either cached or
            in Suspense - no exceptions
          </ListItem>
        </List>

        <Alert variant="error">
          <strong>Critical:</strong> Dynamic data without Suspense or "use
          cache" will cause a build error. This is intentional to prevent
          accidental blocking.
        </Alert>
      </Presentation.Slide>

      {/* Advanced: use cache: remote */}
      <Presentation.Slide>
        <Text variant="title">Advanced: "use cache: remote"</Text>
        <Text variant="subtitle">Caching Shared Data in Dynamic Contexts</Text>

        <Text variant="default">
          Regular <InlineCode>"use cache"</InlineCode> doesn't work after
          calling <InlineCode>connection()</InlineCode>. Use{' '}
          <InlineCode>"use cache: remote"</InlineCode> to cache shared data in
          these dynamic contexts.
        </Text>

        <Alert variant="quote">
          <strong>Use Case:</strong> Cache expensive operations (DB queries,
          API calls) that run at request time but can be shared across all
          users.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Product Price Example">
            {`import { Suspense } from 'react'
import { connection } from 'next/server'
import { cacheLife, cacheTag } from 'next/cache'

async function ProductPrice({ id }: { id: string }) {
  // Make context dynamic - price fetched per request
  await connection()
  
  const price = await getPrice(id)
  return <div>Price: \${price}</div>
}

async function getPrice(productId: string) {
  "use cache: remote"
  cacheTag(\`product-price-\${productId}\`)
  cacheLife({ expire: 3600 }) // 1 hour
  
  // This query is cached in remote handler
  // Shared across all users to reduce DB load
  return db.products.getPrice(productId)
}

export default function ProductPage({ params }) {
  return (
    <div>
      <h1>Product Details</h1>
      <Suspense fallback={<div>Loading price...</div>}>
        <ProductPrice id={params.id} />
      </Suspense>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Key characteristics:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Works in dynamic contexts:</strong> After{' '}
            <InlineCode>connection()</InlineCode> where regular cache fails
          </ListItem>
          <ListItem>
            <strong>Shared globally:</strong> Same cached data for all users
          </ListItem>
          <ListItem>
            <strong>Server-side storage:</strong> Stored in remote cache
            handlers (Redis, KV stores)
          </ListItem>
          <ListItem>
            <strong>Reduces origin load:</strong> Database/API only called once
            per cache period
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* Advanced: use cache: private */}
      <Presentation.Slide>
        <Text variant="title">Advanced: "use cache: private"</Text>
        <Text variant="subtitle">Caching Personalized User Data</Text>

        <Text variant="default">
          <InlineCode>"use cache: private"</InlineCode> enables caching of
          user-specific data that depends on{' '}
          <InlineCode>cookies()</InlineCode> or{' '}
          <InlineCode>headers()</InlineCode>.
        </Text>

        <Alert variant="quote">
          <strong>Use Case:</strong> Cache personalized content per-user to
          improve performance without sharing data between users.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Personalized Recommendations">
            {`import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife, cacheTag } from 'next/cache'

async function Recommendations({ productId }: { productId: string }) {
  const recs = await getRecommendations(productId)
  
  return (
    <div>
      <h3>Recommended for You</h3>
      <RecommendationsList items={recs} />
    </div>
  )
}

async function getRecommendations(productId: string) {
  "use cache: private"
  cacheTag(\`recommendations-\${productId}\`)
  cacheLife({ stale: 60 }) // Minimum 30s for prefetch
  
  // Access cookies for personalization
  const sessionId = (await cookies()).get('session-id')?.value
  
  // Per-user cache - never shared between users
  return getPersonalizedRecommendations(productId, sessionId)
}

export default function ProductPage({ params }) {
  return (
    <div>
      <h1>Product Details</h1>
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <Recommendations productId={params.id} />
      </Suspense>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Key characteristics:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Can use runtime APIs:</strong> Access{' '}
            <InlineCode>cookies()</InlineCode>,{' '}
            <InlineCode>headers()</InlineCode>, and{' '}
            <InlineCode>searchParams</InlineCode>
          </ListItem>
          <ListItem>
            <strong>Per-user isolation:</strong> Each user has their own cache
            - never shared
          </ListItem>
          <ListItem>
            <strong>Client-side storage:</strong> Cached in the browser, not
            server
          </ListItem>
          <ListItem>
            <strong>Enables prefetching:</strong> Supports runtime prefetching
            of personalized content
          </ListItem>
        </List>
      </Presentation.Slide>
    </Presentation.Root>
  );
}
