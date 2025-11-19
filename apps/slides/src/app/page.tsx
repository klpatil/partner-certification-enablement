import Link from 'next/link';

export default function HomePage() {
  const presentations = [
    {
      title: 'Next.js Fundamentals',
      description:
        'App Router, Server Components, routing patterns, and core concepts',
      href: '/fundamentals',
      topics: [
        'File-based routing',
        'Server vs Client Components',
        'Data fetching',
        'Error handling',
        'Dynamic routes',
      ],
    },
    {
      title: 'Optimization & Production',
      description:
        'Performance best practices, SEO, and production deployment strategies',
      href: '/optimization',
      topics: [
        'Metadata & SEO',
        'Performance patterns',
        'Image optimization',
        'Script loading',
        'Bundle optimization',
      ],
    },
    {
      title: 'Next.js 16 Caching',
      description:
        'New caching model, migration guide, and advanced cache strategies',
      href: '/caching',
      topics: [
        '"use cache" directive',
        'cacheLife configuration',
        'cacheTag & revalidation',
        'Migration from Next.js 15',
        'Mixed caching patterns',
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted">
      <main className="container mx-auto max-w-6xl flex-1 px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-bold text-5xl tracking-tight">
            Next.js Workshop
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Comprehensive training materials for mastering Next.js App Router,
            caching strategies, and production best practices
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {presentations.map((presentation) => (
            <Link
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:scale-[1.02]"
              href={presentation.href}
              key={presentation.href}
            >
              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-3 font-bold text-2xl group-hover:text-primary">
                  {presentation.title}
                </h2>
                <p className="mb-4 text-muted-foreground text-sm">
                  {presentation.description}
                </p>

                <div className="mt-auto">
                  <p className="mb-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Topics Covered
                  </p>
                  <ul className="space-y-1">
                    {presentation.topics.map((topic) => (
                      <li
                        className="flex items-start text-sm"
                        key={topic}
                      >
                        <span className="mr-2 text-primary">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border bg-muted/50 px-6 py-4">
                <div className="flex items-center font-medium text-sm text-primary">
                  View Presentation
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-muted-foreground text-sm">
        <p>Built with Next.js ▲</p>
      </footer>
    </div>
  );
}

