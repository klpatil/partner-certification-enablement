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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Day1Presentation() {
  return (
    <Presentation.Root
      subtitle="App Router, Server Components & Core Patterns"
      title="Next.js Fundamentals"
    >
      {/* Next.js App Router Introduction */}
      <Presentation.Slide>
        <Text variant="title">Next.js App Router</Text>
        <Text variant="subtitle">File-based Routing System</Text>
        <List>
          <ListItem>
            <strong>Convention over Configuration:</strong> File structure
            defines routes automatically
          </ListItem>
          <ListItem>
            <strong>Special Files:</strong> page.tsx, layout.tsx, loading.tsx,
            error.tsx, route.ts
          </ListItem>
          <ListItem>
            <strong>Nested Layouts:</strong> Persistent UI across route changes
            with automatic deduplication
          </ListItem>
          <ListItem>
            <strong>Route Groups:</strong> Organize routes without affecting URL
            structure using (folder) syntax
          </ListItem>
          <ListItem>
            <strong>Colocated Files:</strong> Keep components, styles, and tests
            next to your pages
          </ListItem>
        </List>
        <Alert variant="quote">
          The App Router uses React Server Components by default, enabling
          better performance, smaller bundles, and improved SEO.
        </Alert>
      </Presentation.Slide>

      {/* Basic Routing */}
      <Presentation.Slide>
        <Text variant="title">Basic Routing</Text>
        <Text variant="subtitle">File-based URL Mapping</Text>

        <Text variant="default">
          Next.js uses a file-based routing system where your folder structure
          directly maps to URL paths. Each folder with a page.tsx file creates a
          route.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="markdown" title="Simple Route Structure">
            {`app/
├── page.tsx                    # Homepage at /
├── about/
│   └── page.tsx                # /about
├── contact/
│   └── page.tsx                # /contact
├── products/
│   ├── page.tsx                # /products
│   └── [id]/
│       └── page.tsx            # /products/123, /products/abc
└── api/
    └── users/
        └── route.ts            # API endpoint at /api/users`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/about/page.tsx">
            {`export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our company</p>
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/products/[id]/page.tsx">
            {`export default async function ProductPage({ params }) {
  const { id } = await params
  return <div>Product ID: {id}</div>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert>
          <strong>Key Concepts:</strong> Folders create URL segments, page.tsx
          files make them accessible, and square brackets [id] create dynamic
          routes.
        </Alert>
      </Presentation.Slide>

      {/* Server vs Client: Where Your Code Runs */}
      <Presentation.Slide>
        <Text variant="title">Server vs Client: Where Your Code Runs</Text>

        <Text variant="default">
          In modern web development, your code runs in two distinct
          environments. Understanding these environments is crucial for building
          effective Next.js applications.
        </Text>

        <Alert variant="quote">
          <strong>Key Concept:</strong> The server and client are completely
          separate environments with different capabilities, security models,
          and performance characteristics.
        </Alert>

        <Text variant="default">
          <strong>The Server Environment:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Location:</strong> Runs on Vercel's servers, your hosting
            provider, or your local development machine
          </ListItem>
          <ListItem>
            <strong>Capabilities:</strong> Full access to databases, file
            systems, environment variables, and server-only libraries
          </ListItem>
          <ListItem>
            <strong>Security:</strong> Can safely handle secrets, API keys, and
            sensitive operations
          </ListItem>
          <ListItem>
            <strong>Performance:</strong> Powerful computing resources, but adds
            network latency for dynamic requests
          </ListItem>
        </List>

        <Text variant="default">
          <strong>The Client Environment (Browser):</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Location:</strong> Runs on your users' devices - phones,
            laptops, tablets
          </ListItem>
          <ListItem>
            <strong>Capabilities:</strong> Access to browser APIs, user
            interactions, real-time updates
          </ListItem>
          <ListItem>
            <strong>Security:</strong> Everything is visible to users - no
            secrets allowed
          </ListItem>
          <ListItem>
            <strong>Performance:</strong> Limited by user's device, but no
            network latency for local operations
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Server Environment">
            {`// Runs on server - has full system access
export default async function ServerComponent() {
  // ✅ Direct database access
  const users = await db.user.findMany()
  
  // ✅ Access to all environment variables
  const apiKey = process.env.SECRET_API_KEY
  
  // ✅ File system operations
  const config = await readFile('./config.json')
  
  // ✅ Server-only libraries
  const encrypted = encrypt(sensitiveData, apiKey)
  
  return <UserList users={users} />
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Client Environment">
            {`'use client'

// Runs in browser - limited but interactive
export default function ClientComponent() {
  const [location, setLocation] = useState(null)
  
  useEffect(() => {
    // ✅ Browser APIs available
    navigator.geolocation.getCurrentPosition(setLocation)
    
    // ✅ Local storage access
    const saved = localStorage.getItem('preferences')
    
    // ❌ Cannot access server resources
    // const secret = process.env.SECRET_API_KEY // undefined
  }, [])
  
  return (
    <div>
      <button onClick={() => alert('Interactive!')}>
        Click me
      </button>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>
      </Presentation.Slide>

      {/* Server Environment Deep Dive */}
      <Presentation.Slide>
        <Text variant="title">Server Environment Deep Dive</Text>
        <Text variant="subtitle">Understanding Server-Side Limitations</Text>

        <Text variant="default">
          The server environment is powerful but has important limitations.
          Understanding these helps you avoid common mistakes that can break
          your application.
        </Text>

        <Alert variant="quote">
          <strong>Critical Limitation:</strong> The server doesn't know what
          domain your application is running on during build time or in
          serverless functions.
        </Alert>

        <Text variant="default">
          <strong>Why relative URLs fail on the server:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>No base URL context:</strong> The server doesn't know if
            it's running on localhost:3000, vercel.app, or your custom domain
          </ListItem>
          <ListItem>
            <strong>Build-time execution:</strong> During static generation,
            there's no incoming request to provide URL context
          </ListItem>
          <ListItem>
            <strong>Serverless limitations:</strong> Functions run in isolation
            without knowledge of the broader application context
          </ListItem>
        </List>

        <Text variant="default">
          <strong>What happens when you use relative URLs:</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="❌ This Fails on Server">
            {`export async function generateMetadata({ params }) {
  const { slug } = await params
  
  // ❌ FAILS: Server doesn't know the base URL
  const post = await fetch(\`/api/posts/\${slug}\`)
  // Error: fetch failed (missing protocol/host)
  
  return { title: post.title }
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="✅ Solutions That Work">
            {`// Option 1: Direct data access (recommended)
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug) // Direct function call
  return { title: post.title }
}

// Option 2: Absolute URLs with environment variables
export async function generateMetadata({ params }) {
  const { slug } = await params
  const baseUrl = process.env.API_URL 
  
  const post = await fetch(\`\${baseUrl}/api/posts/\${slug}\`)
  return { title: post.title }
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Server environment advantages:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Security:</strong> Keep sensitive operations and data away
            from users
          </ListItem>
          <ListItem>
            <strong>Performance:</strong> Powerful computing resources for heavy
            operations
          </ListItem>
          <ListItem>
            <strong>SEO:</strong> Content is in the HTML when search engines
            crawl your site
          </ListItem>
          <ListItem>
            <strong>Caching:</strong> Server-side caching reduces database load
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* Client Environment Deep Dive */}
      <Presentation.Slide>
        <Text variant="title">Client Environment Deep Dive</Text>
        <Text variant="subtitle">Leveraging Browser Capabilities</Text>

        <Text variant="default">
          The client environment (browser) offers unique capabilities that the
          server cannot provide. Understanding these capabilities allows you to
          build rich, interactive user experiences.
        </Text>

        <Alert variant="quote">
          <strong>Key Insight:</strong> The client environment runs on millions
          of different devices with varying capabilities, network conditions,
          and security constraints.
        </Alert>

        <Text variant="default">
          <strong>Browser-Exclusive Capabilities:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Device APIs:</strong> Camera, microphone, GPS,
            accelerometer, and other hardware sensors
          </ListItem>
          <ListItem>
            <strong>Local Storage:</strong> Persistent data storage that
            survives browser sessions
          </ListItem>
          <ListItem>
            <strong>Real-time Communication:</strong> WebSockets, Server-Sent
            Events, WebRTC
          </ListItem>
          <ListItem>
            <strong>Performance APIs:</strong> Measure page load times, browser
            resource usage, and user interactions
          </ListItem>
          <ListItem>
            <strong>Background Processing:</strong> Web Workers, Service Workers
            for offline functionality
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Device API Access">
            {`'use client'

import { useState, useEffect } from 'react'

export default function DeviceCapabilities() {
  const [location, setLocation] = useState(null)
  const [online, setOnline] = useState(true)
  
  useEffect(() => {
    // ✅ GPS access
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => console.error('Location access denied')
    )
    
    // ✅ Network status monitoring
    const handleOnline = () => setOnline(navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOnline)
    
    // ✅ Device capabilities detection
    if ('serviceWorker' in navigator) {
      // Register service worker for offline support
    }
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOnline)
    }
  }, [])
  
  return (
    <div>
      <p>Status: {online ? 'Online' : 'Offline'}</p>
      {location && (
        <p>Location: {location.latitude}, {location.longitude}</p>
      )}
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Client Environment Security Constraints:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>No Secrets:</strong> All code and data is visible to users
            through browser dev tools
          </ListItem>
          <ListItem>
            <strong>CORS Restrictions:</strong> Limited cross-origin requests
            for security
          </ListItem>
          <ListItem>
            <strong>Sandboxed Execution:</strong> Cannot access local file
            system or run system commands
          </ListItem>
          <ListItem>
            <strong>User Permissions:</strong> Many APIs require explicit user
            consent (camera, location, etc.)
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Performance Considerations:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Bundle Size:</strong> All client code is downloaded by
            users, affecting page load times
          </ListItem>
          <ListItem>
            <strong>Device Variability:</strong> Must work on slow phones and
            fast desktops
          </ListItem>
          <ListItem>
            <strong>Network Conditions:</strong> Handle slow or unreliable
            internet connections
          </ListItem>
          <ListItem>
            <strong>Battery Impact:</strong> Heavy computation drains mobile
            device batteries
          </ListItem>
        </List>

        <Alert>
          <strong>Best Practice:</strong> Use Client Components selectively and
          only when you need browser-specific features or user interactions.
        </Alert>
      </Presentation.Slide>

      {/* Server vs Client Components */}
      <Presentation.Slide>
        <Text variant="title">Server vs Client Components</Text>
        <Text variant="subtitle">The Foundation of Next.js App Router</Text>

        <Text variant="default">
          In Next.js App Router, all components are{' '}
          <strong>Server Components by default</strong>. This is a major shift
          from Pages Router where everything was client-side.
        </Text>

        <Alert variant="quote">
          Think of Server Components as "backend components" that run on the
          server before sending HTML to the browser.
        </Alert>

        <Text variant="default">
          <strong>Server Components are perfect for:</strong>
        </Text>
        <List>
          <ListItem>Fetching data from databases or APIs</ListItem>
          <ListItem>Rendering static content like blog posts</ListItem>
          <ListItem>
            Accessing server-only libraries and environment variables
          </ListItem>
          <ListItem>
            SEO-critical content that needs to be in the initial HTML
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Client Components handle interactivity:</strong>
        </Text>
        <List>
          <ListItem>User interactions (clicks, form submissions)</ListItem>
          <ListItem>React hooks (useState, useEffect)</ListItem>
          <ListItem>Browser APIs (localStorage, window)</ListItem>
          <ListItem>Dynamic, interactive features</ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="🔧 Server Component (Default)">
            {`// No 'use client' - Server Component by default
import { db } from '@/lib/db'

export default async function BlogPosts() {
  // Direct database access on server
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code
            language="tsx"
            title="⚡ Client Component (Interactive)"
          >
            {`'use client' // Required directive

import { useState, useEffect } from 'react'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  useEffect(() => {
    // Browser API access
    const saved = localStorage.getItem('lastSearch')
    if (saved) setQuery(saved)
  }, [])
  
  const handleSearch = async (e) => {
    e.preventDefault()
    // API call from client
    const res = await fetch('/api/search?q=' + query)
    setResults(await res.json())
    localStorage.setItem('lastSearch', query)
  }
  
  return (
    <form onSubmit={handleSearch}>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </form>
  )
}`}
          </Showcase.Code>
          <Showcase.Demo title="Component Choice Helper">
            <ComponentChoiceDemo />
          </Showcase.Demo>
        </Showcase.Root>

        <Text variant="default">
          <strong>Key Differences:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Server:</strong> No 'use client', direct database access, no
            hooks
          </ListItem>
          <ListItem>
            <strong>Client:</strong> Requires 'use client', uses hooks, handles
            interactions
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* When to Choose Server vs Client Components */}
      <Presentation.Slide>
        <Text variant="title">When to Choose Server vs Client Components</Text>
        <Text variant="subtitle">Making the Right Decision</Text>

        <Text variant="default">
          One of the most important decisions in Next.js is choosing between
          Server and Client Components. This choice affects performance, user
          experience, and how your code runs.
        </Text>

        <Alert variant="quote">
          <strong>Key Insight:</strong> Server Components run only on the
          server. Client Components are prerendered to HTML on the server, then
          hydrate and become interactive in the browser.
        </Alert>

        <Text variant="default">
          <strong>Understanding where code executes:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Server Components:</strong> Execute only on the server
            during build or request time - never sent to the browser
          </ListItem>
          <ListItem>
            <strong>Client Components:</strong> Prerendered as HTML on the
            server (without state/effects), then "hydrate" in the browser to
            become interactive
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Server Components are ideal for:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Fetching initial page data:</strong> Direct access to
            databases and APIs without exposing secrets
          </ListItem>
          <ListItem>
            <strong>Static content rendering:</strong> No interactivity needed,
            better for SEO
          </ListItem>
          <ListItem>
            <strong>Database operations:</strong> Keep database connections
            secure on server
          </ListItem>
          <ListItem>
            <strong>Heavy computations:</strong> Don't slow down user's device
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Data Fetching">
            {`export default async function ProductPage() {
  const products = await getProducts()

  return <ProductList products={products} />
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Static Content">
            {`export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Company information...</p>
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Database Operations">
            {`export default async function UserPosts({ userId }: { userId: string }) {
  const posts = await db.post.findMany({ 
    where: { authorId: userId } 
  })

  return <PostList posts={posts} />
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Heavy Computations">
            {`export default async function DataAnalysis() {
  const analysis = await performHeavyCalculation()

  return <AnalysisResults data={analysis} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Client Components are needed for:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Browser APIs:</strong> geolocation, localStorage, etc. -
            these APIs only exist in browsers
          </ListItem>
          <ListItem>
            <strong>User interactions:</strong> Event handlers that need to
            respond to user actions immediately
          </ListItem>
          <ListItem>
            <strong>React hooks:</strong> useState, useEffect, etc. - hooks
            manage state and lifecycle in the browser
          </ListItem>
          <ListItem>
            <strong>Real-time features:</strong> WebSocket connections and
            continuous updates
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Browser APIs">
            {`'use client'

export default function LocationTracker() {
  const [location, setLocation] = useState(null)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation)
  }, [])
  
  return <div>Location: {location}</div>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="User Interactions">
            {`'use client'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(query)
  }
  
  return (
    <form onSubmit={handleSearch}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </form>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="React Hooks">
            {`'use client'

export default function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="Real-time Features">
            {`'use client'

export default function ChatMessages() {
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')

    socket.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }
  }, [])
  
  return <MessageList messages={messages} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Performance implications:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Server Components:</strong> Smaller JavaScript bundles,
            faster initial page loads
          </ListItem>
          <ListItem>
            <strong>Client Components:</strong> Enable interactivity but
            increase bundle size
          </ListItem>
        </List>

        <Alert variant="success">
          <strong>Best Practice:</strong> Start with Server Components by
          default. Only add 'use client' when you need browser APIs, event
          handlers, or React hooks.
        </Alert>
      </Presentation.Slide>

      {/* Data Fetching in Server Components */}
      <Presentation.Slide>
        <Text variant="title">Data Fetching in Server Components</Text>
        <Text variant="subtitle">
          The Power and Pitfalls of Server-Side Data
        </Text>

        <Text variant="default">
          Server Components can fetch data directly on the server, which is
          incredibly powerful. But there's a common mistake that can severely
          impact performance.
        </Text>

        <Alert variant="error">
          <strong>Performance Killer:</strong> Sequential data fetching can make
          your pages extremely slow!
        </Alert>

        <Text variant="default">
          <strong>Let's see the problem in action:</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="❌ Sequential Fetching (Slow)">
            {`export default async function PostPage({ params }) {
  const { slug } = await params
  // ❌ These requests wait for each other!
  const post = await getPost(slug)
  const comments = await getComments(slug)
  const author = await getAuthor(post.authorId)
  
  // If each request takes 200ms:
  // Total time: 200ms + 200ms + 200ms = 600ms!
  
  return <PostContent post={post} comments={comments} author={author} />
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="✅ Parallel Fetching (Fast)">
            {`export default async function PostPage({ params }) {
  const { slug } = await params
  // ✅ These requests run simultaneously!
  const [post, comments] = await Promise.all([
    getPost(slug),
    getComments(slug)
  ])
  
  // Get author after we have the post data
  const author = await getAuthor(post.authorId)
  
  // Same requests, but first two in parallel:
  // Total time: max(200ms, 200ms) + 200ms = 400ms!
  
  return <PostContent post={post} comments={comments} author={author} />
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Why Promise.all() is recommended:</strong>
        </Text>
        <List>
          <ListItem>Fetches multiple data sources simultaneously</ListItem>
          <ListItem>Dramatically reduces total loading time</ListItem>
          <ListItem>Better user experience with faster page loads</ListItem>
          <ListItem>More efficient server resource usage</ListItem>
          <ListItem>Essential for production applications</ListItem>
        </List>
      </Presentation.Slide>

      {/* Client-Server Communication */}
      <Presentation.Slide>
        <Text variant="title">Client-Server Communication</Text>
        <Text variant="subtitle">Server Actions & Form Handling</Text>

        <Text variant="default">
          Server Actions provide a powerful way to handle form submissions and
          server-side logic without building separate API routes. They
          seamlessly integrate with forms and provide excellent user experience
          with progressive enhancement.
        </Text>

        <Alert variant="quote">
          <strong>Key Concept:</strong> Server Actions run on the server but can
          be called directly from Client Components, bridging the gap between
          client and server seamlessly.
        </Alert>

        <Text variant="default">
          <strong>Benefits of Server Actions:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>No API routes needed:</strong> Handle form submissions
            directly in server functions
          </ListItem>
          <ListItem>
            <strong>Progressive enhancement:</strong> Forms work even with
            JavaScript disabled
          </ListItem>
          <ListItem>
            <strong>Type safety:</strong> Full TypeScript support between client
            and server
          </ListItem>
          <ListItem>
            <strong>Built-in security:</strong> Automatic CSRF protection and
            validation
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Basic Server Action:</strong> Create server functions that
          handle form data and business logic. The 'use server' directive marks
          functions that run on the server.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="app/contact/actions.ts">
            {`'use server'

export async function submitContactForm(formData: FormData) {
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  
  if (!email || !message) {
    return { error: 'Email and message are required' }
  }
  
  try {
    await sendEmail({ email, message })
    return { success: 'Message sent successfully!' }
  } catch (error) {
    return { error: 'Failed to send message' }
  }
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/contact/page.tsx">
            {`import { submitContactForm } from './actions'

export default function ContactPage() {
  return (
    <form action={submitContactForm}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send Message</button>
    </form>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Enhanced experience with React hooks:</strong> Use
          useFormState and useFormStatus to add loading states, error handling,
          and better UX while maintaining the progressive enhancement benefits.
        </Text>

        <Showcase.Root>
          <Showcase.Code
            language="tsx"
            title="Enhanced Form with Loading States"
          >
            {`'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, null)
  
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <SubmitButton />
      
      {state?.error && (
        <div className="error">{state.error}</div>
      )}
      {state?.success && (
        <div className="success">{state.success}</div>
      )}
    </form>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert variant="success">
          <strong>Best Practice:</strong> Use Server Actions for form
          submissions and data mutations. They provide better security, type
          safety, and user experience than traditional API routes.
        </Alert>
      </Presentation.Slide>

      {/* Error Handling Strategies */}
      <Presentation.Slide>
        <Text variant="title">Error Handling Strategies</Text>
        <Text variant="subtitle">Building Resilient Applications</Text>

        <Text variant="default">
          Errors are inevitable in web applications. Next.js provides powerful
          tools to handle errors gracefully and provide great user experiences
          even when things go wrong.
        </Text>

        <Alert variant="quote">
          <strong>Key Concept:</strong> Error boundaries in Next.js work at the
          route segment level, allowing you to isolate errors and show
          appropriate fallback UI.
        </Alert>

        <Text variant="default">
          <strong>Two main approaches to error handling:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Error boundaries (error.tsx):</strong> Handle runtime errors
            in Server and Client Components
          </ListItem>
          <ListItem>
            <strong>Not found pages (not-found.tsx):</strong> Handle missing
            resources with custom UI
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Error boundaries create nested fallback levels:</strong>{' '}
          Errors "bubble up" to the nearest error.tsx file, allowing you to
          provide specific error experiences for different parts of your app.
          All error boundary components must be Client Components.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="app/error.tsx">
            {`'use client'

export default function ErrorPage({ error, reset }) {
  return (
    <div className="error-page">
      <h1>Application Error</h1>
      <p>Something went wrong with the application</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/dashboard/error.tsx">
            {`'use client'

export default function DashboardError({ error, reset }) {
  return (
    <div className="dashboard-error">
      <h2>Dashboard Unavailable</h2>
      <p>We're having trouble loading your dashboard</p>
      <button onClick={reset}>Retry</button>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Not Found handling:</strong> When content doesn't exist, use
          the notFound() function to trigger custom 404 pages. This
          provides better UX than generic error messages and proper SEO with 404
          status codes.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="app/blog/[slug]/page.tsx">
            {`import { notFound } from 'next/navigation'

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }
  
  return <PostContent post={post} />
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/blog/[slug]/not-found.tsx">
            {`export default function PostNotFound() {
  return (
    <div>
      <h2>Blog Post Not Found</h2>
      <p>The post you're looking for doesn't exist.</p>
      <Link href="/blog">← Back to Blog</Link>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert variant="success">
          <strong>Best Practice:</strong> Always provide helpful error messages
          and clear recovery paths. Users should never see generic "something
          went wrong" without guidance on what to do next.
        </Alert>
      </Presentation.Slide>

      {/* Dynamic Routes Deep Dive */}
      <Presentation.Slide>
        <Text variant="title">Dynamic Routes Deep Dive</Text>
        <Text variant="subtitle">Building Flexible URL Structures</Text>

        <Text variant="default">
          Dynamic routes allow you to create pages that respond to variable URL
          segments. This is essential for building scalable applications with
          user-generated content.
        </Text>

        <Alert variant="quote">
          <strong>Key Concept:</strong> Square brackets [slug] in file names
          create dynamic segments that capture URL parts as parameters.
        </Alert>

        <Text variant="default">
          <strong>Two types of dynamic routes:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Single segment:</strong> Captures one URL segment (e.g.,
            /blog/my-post)
          </ListItem>
          <ListItem>
            <strong>Catch-all:</strong> Captures multiple segments (e.g.,
            /docs/api/auth/setup)
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Route Parameters Only">
            {`export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>Post slug: {slug}</p>
      <div>{post.content}</div>
    </div>
  )
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="With Search Parameters">
            {`export default async function BlogPost({ params, searchParams }) {
  const { slug } = await params
  const resolved = await searchParams
  return (
    <div>
      <h1>Post: {slug}</h1>
      {resolved.highlight === 'true' && (
        <div className="highlight-mode">Highlighting enabled</div>
      )}
      {resolved.tab && (
        <div>Active tab: {resolved.tab}</div>
      )}
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Catch-all routes example:</strong> Perfect for documentation
          sites and nested categories.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Catch-all Routes">
            {`export default function DocsPage({
  params
}: {
  params: { sections: string[] }
}) {
  const breadcrumbs = params.sections.map((section, index) => ({
    title: section.charAt(0).toUpperCase() + section.slice(1),
    href: '/docs/' + params.sections.slice(0, index + 1).join('/')
  }))
  
  return (
    <div>
      <nav className="breadcrumbs">
        <Link href="/docs">Docs</Link>
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            <span className="separator"> / </span>
            <Link href={crumb.href}>{crumb.title}</Link>
          </span>
        ))}
      </nav>
      <main>
        <DocsContent 
          sections={params.sections}
        />
      </main>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>When to use each pattern:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>[slug]:</strong> Blog posts, product pages, user profiles
          </ListItem>
          <ListItem>
            <strong>[...sections]:</strong> Documentation sites, file systems,
            nested categories
          </ListItem>
        </List>

        <Alert variant="success">
          <strong>Pro Tip:</strong> Use TypeScript interfaces to ensure type
          safety for your params and searchParams objects.
        </Alert>
      </Presentation.Slide>

      {/* Loading States & Suspense */}
      <Presentation.Slide>
        <Text variant="title">Loading States & Suspense</Text>
        <Text variant="subtitle">Creating Smooth User Experiences</Text>

        <Text variant="default">
          Loading states prevent your users from staring at blank screens.
          Next.js provides powerful tools for creating smooth, progressive
          loading experiences.
        </Text>

        <Alert variant="quote">
          <strong>Key Concept:</strong> Instead of showing a blank page while
          everything loads, show immediate feedback and let content stream in as
          it becomes available.
        </Alert>

        <Text variant="default">
          <strong>Two approaches to loading states:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>loading.tsx files:</strong> Automatic loading UI for entire
            route segments
          </ListItem>
          <ListItem>
            <strong>Suspense boundaries:</strong> Granular loading states for
            specific components
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Route-Level Loading">
            {`export default function DashboardLoading() {
  return (
    <div className="dashboard-skeleton">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6 w-48"></div>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
        
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function Dashboard() {
  const [stats, charts, tableData] = await Promise.all([
    getStatsData(),
    getChartsData(), 
    getTableData()
  ])
  
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsCards data={stats} />
      <ChartsSection data={charts} />
      <DataTable data={tableData} />
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Component-level loading with Suspense:</strong> Use Suspense
          boundaries to show different loading states for different parts of
          your page. Fast content appears immediately while slow content streams
          in.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Component-Level Loading">
            {`import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <UserWelcome />
      
      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <RecentActivity />
      </Suspense>
      
      <Suspense fallback={<div>Loading notifications...</div>}>
        <NotificationsList />
      </Suspense>
    </div>
  )
}

async function AnalyticsChart() {
  const analytics = await getAnalyticsData()
  
  return (
    <div className="chart-container">
      <h2>Analytics</h2>
      <Chart data={analytics} />
    </div>
  )
}

async function RecentActivity() {
  const activity = await getRecentActivity()
  
  return (
    <div className="activity-feed">
      <h2>Recent Activity</h2>
      <ActivityList items={activity} />
    </div>
  )
}

function UserWelcome() {
  return (
    <div className="welcome-banner">
      <h2>Welcome back!</h2>
      <p>Here's what's happening today</p>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert variant="success">
          <strong>Pro Tip:</strong> Use loading.tsx for route-level loading and
          Suspense for granular component loading. Combine both for the best
          user experience!
        </Alert>
      </Presentation.Slide>

      {/* Navigation in Next.js */}
      <Presentation.Slide>
        <Text variant="title">Navigation in Next.js</Text>
        <Text variant="subtitle">Client-Side vs Server-Side Navigation</Text>

        <Text variant="default">
          One of Next.js's key features is its navigation system. Understanding
          how it works is crucial for building fast, modern web applications.
        </Text>

        <Alert variant="quote">
          When you use next/link, Next.js performs client-side
          navigation - no full page reloads!
        </Alert>

        <Text variant="default">
          <strong>What happens when you click a Next.js Link:</strong>
        </Text>
        <List>
          <ListItem>JavaScript updates the URL in the browser</ListItem>
          <ListItem>Next.js fetches only the new page's content</ListItem>
          <ListItem>
            The page transitions smoothly without full refresh
          </ListItem>
          <ListItem>Shared layouts persist and don't re-render</ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="next/link Examples">
            {`import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      {/* Basic client-side navigation */}
      <Link href="/about">About Us</Link>
      
      {/* Dynamic route navigation */}
      <Link href={\`/blog/\${post.slug}\`}>
        {post.title}
      </Link>
      
      {/* Navigation with query parameters */}
      <Link 
        href={{
          pathname: '/products',
          query: { category: 'electronics', sort: 'price' }
        }}
      >
        Electronics
      </Link>
    </nav>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Programmatic navigation:</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code
            language="tsx"
            title="Client-Side Navigation (useRouter)"
          >
            {`'use client'

import { useRouter } from 'next/navigation'

export default function NavigationButton() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/dashboard')     // Navigate forward
    router.replace('/login')      // Replace current page
    router.back()                 // Go back in history
    router.refresh()              // Refresh current route
  }
  
  return <button onClick={handleClick}>Navigate</button>
}`}
          </Showcase.Code>
          <Showcase.Code
            language="tsx"
            title="Server-Side Navigation (redirect)"
          >
            {`import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getUser()
  
  if (user) {
    redirect('/dashboard')
  }
  
  return <LoginForm />
}

// Server Actions can also use redirect
export async function loginAction(formData: FormData) {
  'use server'
  
  const { email, password } = getFormData(formData)
  
  try {
    await authenticate(email, password)
    redirect('/dashboard')
  } catch (error) {
    return { error: 'Invalid credentials' }
  }
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert variant="success">
          <strong>Best Practice:</strong> Use useRouter for client-side interactions and redirect for server-side navigation.
        </Alert>
      </Presentation.Slide>

      {/* Special Files */}
      <Presentation.Slide>
        <Text variant="title">Special File Conventions</Text>
        <Text variant="subtitle">Reference Guide</Text>

        <SpecialFileConventionsTable />
      </Presentation.Slide>

      {/* Dynamic Routing Patterns */}
      <Presentation.Slide>
        <Text variant="title">Dynamic Routing Patterns</Text>
        <Text variant="subtitle">Three Types of Dynamic Routes</Text>

        <Text variant="default">
          Next.js provides three different dynamic route patterns, each serving
          specific use cases. Understanding when to use each pattern is crucial
          for building flexible applications.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="app/blog/[slug]/page.tsx">
            {`export default async function BlogPost({ params }) {
  const { slug } = await params

  return <article>Post: {slug}</article>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/docs/[...slug]/page.tsx">
            {`export default async function DocPage({ params }) {
  const { slug } = await params

  return <div>Path: {slug.join('/')}</div>
}`}
          </Showcase.Code>
          <Showcase.Code language="tsx" title="app/shop/[[...slug]]/page.tsx">
            {`export default async function ShopPage({ params }) {
  const { slug } = await params
  
  if (!slug || slug.length === 0) {
    return <div>Shop Homepage</div>
  }
  
  return <div>Category: {slug.join(' > ')}</div>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Pattern Behaviors:</strong>
        </Text>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pattern</TableHead>
              <TableHead>Example URLs</TableHead>
              <TableHead>Params Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <code>/blog/[slug]</code>
              </TableCell>
              <TableCell>/blog/hello-world</TableCell>
              <TableCell>
                <code>{`{ slug: 'hello-world' }`}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>/docs/[...slug]</code>
              </TableCell>
              <TableCell>/docs/guides/routing</TableCell>
              <TableCell>
                <code>{`{ slug: ['guides', 'routing'] }`}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>/shop/[[...slug]]</code>
              </TableCell>
              <TableCell>/shop</TableCell>
              <TableCell>
                <code>{'{ slug: [] }'}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>/shop/[[...slug]]</code>
              </TableCell>
              <TableCell>/shop/electronics/phones</TableCell>
              <TableCell>
                <code>{`{ slug: ['electronics', 'phones'] }`}</code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Alert>
          <strong>Key Difference:</strong> <code>[...slug]</code> requires at
          least one segment, while <code>[[...slug]]</code> matches zero or more
          segments.
        </Alert>

        <Showcase.Root>
          <Showcase.Demo title="Dynamic Route Pattern Tester">
            <DynamicRouteDemo />
          </Showcase.Demo>
        </Showcase.Root>

        <Text variant="default">
          <strong>When to use each pattern:</strong>
        </Text>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pattern</TableHead>
              <TableHead>Use Case</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <code>[slug]</code>
              </TableCell>
              <TableCell>Single variable segment</TableCell>
              <TableCell>Blog posts, user profiles</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>[...slug]</code>
              </TableCell>
              <TableCell>Multiple segments, requires at least one</TableCell>
              <TableCell>Documentation, nested categories</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>[[...slug]]</code>
              </TableCell>
              <TableCell>Multiple segments, including zero</TableCell>
              <TableCell>Optional filters, catch-all routes</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Presentation.Slide>

      {/* Route Groups */}
      <Presentation.Slide>
        <Text variant="title">Route Groups</Text>
        <Text variant="subtitle">Organize Without Affecting URLs</Text>

        <Text variant="default">
          Route Groups help you organize your application without affecting the
          URL structure. They're created using parentheses (folder) syntax.
        </Text>

        <Alert variant="quote">
          Route Groups are perfect for organizing features by team, feature set,
          or applying different layouts to different sections.
        </Alert>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Route Groups Example">
            {`app/
├── (marketing)/             # Route group - no URL impact
│   ├── layout.tsx           # Marketing-specific layout
│   ├── about/page.tsx       # /about
│   └── pricing/page.tsx     # /pricing
│
├── (auth)/                  # Authentication group
│   ├── layout.tsx           # Minimal auth layout
│   ├── login/page.tsx       # /login
│   └── register/page.tsx    # /register
│
└── dashboard/               # Regular folder
    └── page.tsx             # /dashboard`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Key Benefits:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Organization:</strong> Group related routes without changing
            URLs
          </ListItem>
          <ListItem>
            <strong>Multiple Layouts:</strong> Apply different layouts to
            different sections
          </ListItem>
          <ListItem>
            <strong>Team Collaboration:</strong> Teams can work on separate
            route groups
          </ListItem>
          <ListItem>
            <strong>Feature Flags:</strong> Enable/disable entire feature groups
            easily
          </ListItem>
        </List>

        <Alert>
          <strong>Remember:</strong> Folders wrapped in parentheses like (auth)
          don't create URL segments - /login not /(auth)/login
        </Alert>
      </Presentation.Slide>

      {/* Error Handling */}
      <Presentation.Slide>
        <Text variant="title">Error Handling in Next.js</Text>
        <Text variant="subtitle">Building Resilient Applications</Text>

        <Text variant="default">
          Next.js provides powerful error handling through special files that
          create error boundaries automatically.
        </Text>

        <Alert variant="quote">
          Error boundaries catch JavaScript errors anywhere in the component
          tree and display a fallback UI instead of crashing the whole page.
        </Alert>

        <Text variant="default">
          <strong>Important rule about error.tsx files:</strong>
        </Text>

        <List>
          <ListItem>
            They MUST be Client Components (require 'use client')
          </ListItem>
          <ListItem>
            This is because they need to use React's error boundary features
          </ListItem>
          <ListItem>
            They receive props for the error and a reset function
          </ListItem>
        </List>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="error.tsx Implementation">
            {`'use client' // ⚠️ REQUIRED: Error boundaries MUST be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>
            You can create multiple error boundaries for granular error
            handling:
          </strong>
        </Text>

        <Text variant="default">
          When an error occurs, Next.js looks for the nearest error.tsx file in
          the route hierarchy. This allows you to have different error UIs for
          different sections of your app.
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Error Boundary Hierarchy">
            {`app/
├── error.tsx              # Global fallback
├── dashboard/
│   ├── error.tsx          # Dashboard-specific errors
│   ├── page.tsx
│   └── settings/
│       ├── error.tsx      # Settings-specific errors
│       └── page.tsx

// Error bubbling behavior:
// • Settings page error → settings/error.tsx
// • Other dashboard error → dashboard/error.tsx  
// • Any other error → root error.tsx`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>Remember these facts about Next.js file conventions:</strong>
        </Text>
        <List>
          <ListItem>✅ error.tsx MUST be a Client Component</ListItem>
          <ListItem>
            ❌ page.tsx does NOT need to be a Server Component (can be either)
          </ListItem>
          <ListItem>
            ❌ loading.tsx does NOT only work with Server Components
          </ListItem>
        </List>
      </Presentation.Slide>

      {/* Environment Variables */}
      <Presentation.Slide>
        <Text variant="title">Environment Variables</Text>
        <Text variant="subtitle">Secure Configuration Management</Text>

        <Text variant="default">
          Environment variables in Next.js have a special naming convention that
          determines whether they're accessible on the client-side or
          server-only.
        </Text>

        <Alert variant="quote">
          The key rule: Only variables prefixed with <code>NEXT_PUBLIC_</code>{' '}
          are accessible in the browser.
        </Alert>

        <Text variant="default">
          <strong>Let's see how this works in practice:</strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="bash" title=".env.local">
            {`# Server-only variables (secure)
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="your-secret-key"
API_SECRET_KEY="sk_live_abc123"

# Client-exposed variables (public)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_ANALYTICS_ID="GA_TRACKING_ID"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_xyz789"`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>
            Server Components can access ALL environment variables:
          </strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Server Component Access">
            {`// Server Component - runs on server
export default async function ServerComponent() {
  const dbUrl = process.env.DATABASE_URL           // ✅ Available
  const apiUrl = process.env.NEXT_PUBLIC_API_URL   // ✅ Available
  const secret = process.env.JWT_SECRET            // ✅ Available
  
  // Safe to use sensitive data here
  const userData = await fetchFromDatabase(dbUrl)
  
  return <div>Server data loaded securely</div>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>
            Client Components can ONLY access NEXT_PUBLIC_ variables:
          </strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="Client Component Access">
            {`'use client'

export default function ClientComponent() {
  const dbUrl = process.env.DATABASE_URL           // ❌ undefined!
  const apiUrl = process.env.NEXT_PUBLIC_API_URL   // ✅ Available
  const secret = process.env.JWT_SECRET            // ❌ undefined!
  
  // Only public variables work here
  const handleApiCall = () => {
    fetch(apiUrl + '/data') // This works
  }
  
  return <button onClick={handleApiCall}>Fetch Data</button>
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Alert variant="error">
          Never put sensitive data in NEXT_PUBLIC_ variables! They're visible to
          anyone who views your website's source code.
        </Alert>

        <Showcase.Root>
          <Showcase.Demo title="Environment Variable Exposure">
            <EnvironmentDemo />
          </Showcase.Demo>
        </Showcase.Root>
        <Alert>
          <strong>Best Practice:</strong> Implement the <code>server-only</code>{' '}
          package to prevent accidental import of server-only code into Client
          Components, ensuring sensitive data like API keys remain secure
          through build-time validation.
        </Alert>
      </Presentation.Slide>

      {/* Proxy (formerly Middleware) */}
      <Presentation.Slide>
        <Text variant="title">Next.js Proxy</Text>
        <Text variant="subtitle">Runs before pages are rendered</Text>

        <Text variant="default">
          Proxy (called <strong>Middleware</strong> prior to Next.js 16) is a powerful 
          Next.js feature that lets you run code
          <strong> before a request is completed</strong>. Think of it as a
          gatekeeper that can inspect, modify, or redirect requests.
        </Text>

        <Text variant="default">
          <strong>
            Here's a practical example of proxy for authentication:
          </strong>
        </Text>

        <Showcase.Root>
          <Showcase.Code language="tsx" title="proxy.ts">
            {`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('auth-token')
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      )
    }
  }
  
  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}

// Configure which paths proxy runs on
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}`}
          </Showcase.Code>
        </Showcase.Root>

        <Text variant="default">
          <strong>This proxy example demonstrates:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Authentication:</strong> Checks for auth-token cookie
          </ListItem>
          <ListItem>
            <strong>Redirects:</strong> Sends unauthenticated users to /login
          </ListItem>
          <ListItem>
            <strong>Security Headers:</strong> Adds protection against common
            attacks
          </ListItem>
          <ListItem>
            <strong>Path Matching:</strong> Only runs on /dashboard and /api
            routes
          </ListItem>
        </List>

        <Text variant="default">
          <strong>Common proxy use cases include:</strong>
        </Text>
        <List>
          <ListItem>
            <strong>Authentication & Authorization:</strong> Protect routes and
            check permissions
          </ListItem>
          <ListItem>
            <strong>Request/Response Modification:</strong> Add headers, modify
            data
          </ListItem>
          <ListItem>
            <strong>Bot Protection & Rate Limiting:</strong> Prevent abuse
          </ListItem>
          <ListItem>
            <strong>A/B Testing & Feature Flags:</strong> Dynamic feature
            rollouts
          </ListItem>
        </List>

        <Alert>
          <strong>Note:</strong> In Next.js 16, the proxy file runs exclusively in 
          the Node.js runtime. If you need Edge runtime support, continue using 
          the <InlineCode>middleware.ts</InlineCode> file convention.
        </Alert>
      </Presentation.Slide>
    </Presentation.Root>
  );
}

function SpecialFileConventionsTable() {
  const [visibleTypes, setVisibleTypes] = useState<Record<string, boolean>>({
    'page.tsx': false,
    'layout.tsx': false,
    'loading.tsx': false,
    'error.tsx': false,
    'not-found.tsx': false,
    'route.ts': false,
  });

  const toggleVisibility = (file: string) => {
    setVisibleTypes((prev) => ({
      ...prev,
      [file]: !prev[file],
    }));
  };

  const fileData = [
    {
      file: 'page.tsx',
      purpose: "Route's main content",
      type: 'Server/Client',
    },
    {
      file: 'layout.tsx',
      purpose: 'Persistent UI wrapper',
      type: 'Server/Client',
    },
    {
      file: 'loading.tsx',
      purpose: 'Loading UI fallback',
      type: 'Server/Client',
    },
    {
      file: 'error.tsx',
      purpose: 'Error boundary UI',
      type: 'Client Only',
    },
    {
      file: 'not-found.tsx',
      purpose: '404 error page',
      type: 'Server/Client',
    },
    {
      file: 'route.ts',
      purpose: 'API endpoint handler',
      type: 'Server Only',
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fileData.map(({ file, purpose, type }) => (
          <TableRow key={file}>
            <TableCell>
              <code>{file}</code>
            </TableCell>
            <TableCell>{purpose}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <button
                  className="rounded p-1 transition-colors hover:bg-secondary"
                  onClick={() => toggleVisibility(file)}
                  title={visibleTypes[file] ? 'Hide type' : 'Show type'}
                  type="button"
                >
                  {visibleTypes[file] ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
                <span
                  className={`font-medium text-sm transition-opacity duration-200 ${
                    visibleTypes[file] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {type}
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function EnvironmentDemo() {
  const [componentType, setComponentType] = useState<'server' | 'client'>(
    'server'
  );

  const serverVars = {
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
    JWT_SECRET: 'your-secret-key',
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
    NEXT_PUBLIC_ANALYTICS_ID: 'GA_TRACKING_ID',
  };

  const clientVars = {
    DATABASE_URL: 'undefined',
    JWT_SECRET: 'undefined',
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
    NEXT_PUBLIC_ANALYTICS_ID: 'GA_TRACKING_ID',
  };

  const currentVars = componentType === 'server' ? serverVars : clientVars;

  return (
    <div className="rounded-lg border border-primary/20 bg-background/50 p-4">
      <div className="mb-4 flex gap-2">
        <button
          className={`rounded px-3 py-1 text-sm ${componentType === 'server' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
          onClick={() => setComponentType('server')}
          type="button"
        >
          Server Component
        </button>
        <button
          className={`rounded px-3 py-1 text-sm ${componentType === 'client' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
          onClick={() => setComponentType('client')}
          type="button"
        >
          Client Component
        </button>
      </div>

      <div className="space-y-2">
        {Object.entries(currentVars).map(([key, value]) => {
          const isPublic = key.startsWith('NEXT_PUBLIC_');
          const isUndefined = value === 'undefined';

          return (
            <div
              className={`rounded p-2 text-sm ${
                isUndefined
                  ? 'border border-destructive/20 bg-destructive/10 text-destructive'
                  : isPublic
                    ? 'border border-accent/20 bg-accent/10'
                    : 'border border-transparent bg-secondary/50'
              }`}
              key={key}
            >
              <span className="font-mono">{key}</span>:
              <span className={isUndefined ? 'font-semibold' : ''}>
                {isUndefined ? '❌ undefined' : `"${value}"`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ComponentChoiceDemo() {
  const [requirements, setRequirements] = useState({
    useHooks: false,
    browserAPIs: false,
    userInteraction: false,
    dataFetching: false,
    staticContent: false,
  });

  const getRecommendation = () => {
    if (
      requirements.useHooks ||
      requirements.browserAPIs ||
      requirements.userInteraction
    ) {
      return {
        type: 'Client Component',
        directive: "'use client'",
        color: 'text-orange-600',
        icon: '⚡',
      };
    }
    return {
      type: 'Server Component',
      directive: 'No directive needed',
      color: 'text-blue-600',
      icon: '🔧',
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="rounded-lg border border-primary/20 bg-background/50 p-4">
      <div className="mb-4">
        <h4 className="mb-3 font-semibold">What does your component need?</h4>
        <div className="space-y-2">
          {[
            {
              key: 'useHooks',
              label: 'React hooks (useState, useEffect, etc.)',
            },
            {
              key: 'browserAPIs',
              label: 'Browser APIs (localStorage, window, etc.)',
            },
            {
              key: 'userInteraction',
              label: 'User interactions (onClick, onChange, etc.)',
            },
            { key: 'dataFetching', label: 'Server-side data fetching' },
            { key: 'staticContent', label: 'Static content display' },
          ].map(({ key, label }) => (
            <label className="flex items-center space-x-2" key={key}>
              <input
                checked={requirements[key as keyof typeof requirements]}
                onChange={(e) =>
                  setRequirements((prev) => ({
                    ...prev,
                    [key]: e.target.checked,
                  }))
                }
                type="checkbox"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded bg-secondary/30 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg">{recommendation.icon}</span>
          <span className={`font-semibold text-lg ${recommendation.color}`}>
            {recommendation.type}
          </span>
        </div>
        <div className="text-sm">
          <strong>Required:</strong> {recommendation.directive}
        </div>
        <div className="mt-2 text-muted-foreground text-xs">
          {recommendation.type === 'Client Component'
            ? 'Use when you need browser features or user interactions'
            : 'Default choice for data fetching and static content'}
        </div>
      </div>
    </div>
  );
}

function DynamicRouteDemo() {
  const [pattern, setPattern] = useState<'single' | 'catchAll' | 'optional'>(
    'single'
  );
  const [path, setPath] = useState('/blog/hello-world');

  const patterns = {
    single: { label: '[slug]', example: '/blog/', base: '/blog/' },
    catchAll: { label: '[...slug]', example: '/docs/', base: '/docs/' },
    optional: { label: '[[...slug]]', example: '/shop', base: '/shop' },
  };

  const getParams = () => {
    const current = patterns[pattern];

    // Check if path starts with the base path
    if (!path.startsWith(current.base)) {
      return {
        error: true,
        message: `Path must start with ${current.base}`,
      };
    }

    const cleanPath = path.replace(current.base, '');
    const segments = cleanPath.split('/').filter(Boolean);

    if (pattern === 'single') {
      if (segments.length !== 1) {
        return {
          error: true,
          message: 'Single dynamic segment expects exactly one segment',
        };
      }
      return { slug: segments[0] };
    }

    if (pattern === 'catchAll') {
      if (segments.length === 0) {
        return {
          error: true,
          message: 'Catch-all requires at least one segment',
        };
      }
      return { slug: segments };
    }

    // optional catch-all
    return { slug: segments };
  };

  const params = getParams();

  return (
    <div className="space-y-4 rounded-lg border border-primary/20 bg-background/50 p-4">
      <div className="flex gap-2">
        {Object.entries(patterns).map(([key, value]) => (
          <button
            className={`rounded px-3 py-1 text-sm ${
              pattern === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
            key={key}
            onClick={() => {
              setPattern(key as typeof pattern);
              setPath(
                value.example +
                  (key === 'single'
                    ? 'hello-world'
                    : key === 'catchAll'
                      ? 'guides/routing'
                      : '')
              );
            }}
            type="button"
          >
            {value.label}
          </button>
        ))}
      </div>

      <div>
        <label
          className="mb-1 block font-medium text-sm"
          htmlFor="test-url-path"
        >
          Test URL Path:
        </label>
        <input
          className="w-full rounded border bg-background px-3 py-2 text-sm"
          onChange={(e) => setPath(e.target.value)}
          placeholder="Enter a URL path..."
          type="text"
          value={path}
        />
      </div>

      <div className="rounded bg-secondary/30 p-3">
        <div className="mb-2 font-medium text-sm">Route Pattern:</div>
        <code className="text-sm">
          app/{patterns[pattern].example.slice(1)}
          {patterns[pattern].label}/page.tsx
        </code>
      </div>

      <div
        className={`rounded p-3 ${
          params.error
            ? 'border border-destructive/20 bg-destructive/10'
            : 'border border-green-500/20 bg-green-500/10'
        }`}
      >
        <div className="mb-1 font-medium text-sm">
          {params.error ? '❌ No Match' : '✅ Match Found'}
        </div>
        {params.error ? (
          <div className="text-destructive text-sm">{params.message}</div>
        ) : (
          <div className="font-mono text-sm">
            params = {JSON.stringify(params, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
}
