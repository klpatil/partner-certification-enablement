'use client';

import { Alert } from '@repo/ui/components/alert';
import { InlineCode as C } from '@repo/ui/components/inline-code';
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
import { useState } from 'react';

export default function Day2Presentation() {
  return (
    <Presentation.Root
      subtitle="Performance, SEO & Production Best Practices"
      title="Optimization & Production"
    >
      {/* Metadata & SEO */}
      <Presentation.Slide>
        <Text variant="title">Metadata & SEO</Text>
        <Text variant="subtitle">Configuring Page Metadata</Text>

        <Text variant="default">
          Next.js provides powerful metadata APIs for SEO optimization. You can
          define metadata statically or generate it dynamically based on your
          content.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Static Metadata">
            {`import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ACME Corporation',
  description: 'Learn about our mission and values',
  openGraph: {
    title: 'About ACME Corporation',
    description: 'Learn about our mission and values',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return <h1>About Us</h1>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Dynamic Metadata">
            {`// app/blog/[slug]/page.tsx

import { getBlogPost } from '@/lib/api'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.coverImage],
    },
  }
}

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug)

  return <article>...</article>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Metadata inheritance and merging:</strong>
        </Text>
        <List>
          <ListItem>Metadata is merged from root layout down to page</ListItem>
          <ListItem>Child metadata overrides parent metadata</ListItem>
          <ListItem>Arrays are replaced, not merged (e.g., keywords)</ListItem>
          <ListItem>OpenGraph objects are deeply merged</ListItem>
        </List>

        <Alert>
          <strong>Pro tip:</strong> Use generateMetadata for dynamic content to
          ensure accurate SEO data for each page.
        </Alert>
      </Presentation.Slide>

      {/* Performance Best Practices */}
      <Presentation.Slide>
        <Text variant="title">Performance Best Practices</Text>
        <Text variant="subtitle">Building Fast Applications from Day 1</Text>

        <Text variant="default">
          Next.js App Router is optimized for performance by default, but
          understanding these patterns ensures your application stays fast as it
          grows.
        </Text>

        <Alert variant="quote">
          <strong>Golden Rule:</strong> Ship as little JavaScript to the client
          as possible. Use Server Components by default, Client Components only
          when needed.
        </Alert>

        <Text variant="default">
          <strong>Component Optimization:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Server Components First:</strong> Default choice for static
            content and data fetching
          </ListItem>
          <ListItem>
            <strong>Client Component Boundaries:</strong> Keep them small and
            focused on interactivity
          </ListItem>
          <ListItem>
            <strong>Component Composition:</strong> Pass Server Components as
            children to Client Components
          </ListItem>
        </List>

        <Text variant="default">
          <strong>❌ Avoid: Large Client Component Boundaries</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="app/components/Dashboard.tsx">
            {`'use client'

import { useState } from 'react'
import { BlogPosts } from './BlogPosts'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Dashboard() {
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <Sidebar />
      <BlogPosts />
      <Footer />
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          This pattern forces all imported components to become Client
          Components, preventing server-side data fetching and increasing bundle
          size.
        </Text>

        <Text variant="default">
          <strong>✅ Better: Extract Client Logic</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="app/components/Dashboard.tsx">
            {`export function Dashboard() {
  return (
    <div>
      <ToggleButton />
      <Sidebar />
      <BlogPosts />
      <Footer />
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/components/ToggleButton.tsx">
            {`'use client'

import { useState } from 'react'

export function ToggleButton() {
  const [open, setOpen] = useState(false)
  return <button onClick={() => setOpen(!open)}>Toggle</button>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          By isolating client logic in a separate component, Dashboard remains a
          Server Component. This allows BlogPosts, Sidebar, and Footer to fetch
          data on the server and reduces JavaScript sent to the browser.
        </Text>

        <Text variant="default">
          <strong>Loading Performance:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Streaming:</strong> Use loading.tsx for instant page
            transitions
          </ListItem>
          <ListItem>
            <strong>Suspense Boundaries:</strong> Show content as it becomes
            available
          </ListItem>
          <ListItem>
            <strong>Parallel Data Fetching:</strong> Use Promise.all() to fetch
            data concurrently
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Bundle Size Tips:</strong>
        </Text>
        <List>
          <ListItem>Import only what you need from large libraries</ListItem>
          <ListItem>
            Use dynamic imports for heavy client-side features
          </ListItem>
          <ListItem>
            Keep NEXT_PUBLIC_ env vars minimal (they're in the bundle!)
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* Image Optimization Best Practices */}
      <Presentation.Slide>
        <Text variant="title">Image Optimization Best Practices</Text>
        <Text variant="subtitle">Quality vs File Size Balance</Text>

        <Text variant="default">
          Images are often the largest assets on web pages. Next.js Image
          component provides automatic optimization, but you need to configure
          it correctly to get the best results.
        </Text>

        <Alert variant="quote">
          The secret is finding the sweet spot: high enough quality for good
          visuals, low enough file size for fast loading.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="✅ Optimized Configuration">
            {`<Image 
  src="/hero-image.jpg"
  alt="Hero image showcasing our product"
  width={1200}
  height={800}
  quality={85}    // Sweet spot for quality vs size
  priority        // Load this image first
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Quality recommendations:</strong>
        </Text>
        <List>
          <ListItem>Quality 75: Good for thumbnails and small images</ListItem>
          <ListItem>
            Quality 80-85: Perfect for hero images and important visuals
          </ListItem>
          <ListItem>
            Quality 90+: Usually overkill for web, massive file sizes
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* Script Loading Strategies */}
      <Presentation.Slide>
        <Text variant="title">Third-party Script Loading</Text>
        <Text variant="subtitle">Optimal Loading Strategies</Text>

        <Text variant="default">
          Third-party scripts (analytics, widgets, ads) can significantly impact
          your page performance. Next.js Script component provides strategic
          loading options to minimize this impact.
        </Text>

        <Showcase.Root>
          <Showcase.Code
            language="tsx"
            title="afterInteractive - Most Common"
          >
            {`<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive"
  onLoad={() => console.log('Analytics ready')}
/>`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="lazyOnload - Non-Critical">
            {`<Script
  src="https://optional-widget.example.com/script.js"
  strategy="lazyOnload"
/>`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>When to use each strategy:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>afterInteractive:</strong> Most scripts like analytics, chat
            widgets, payment forms
          </ListItem>
          <ListItem>
            <strong>lazyOnload:</strong> Non-essential features that can wait
            until everything else loads
          </ListItem>
        </List>

        <Alert>
          <strong>Best Practice:</strong> Use afterInteractive for 90% of
          third-party scripts - it provides the best balance of functionality
          and performance.
        </Alert>
      </Presentation.Slide>

    </Presentation.Root>
  );
}
