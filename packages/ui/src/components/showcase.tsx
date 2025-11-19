'use client';

import { getChildrenByComponentName } from '@repo/ui/lib/dom';
import { cn } from '@repo/ui/lib/utils';
import { useMemo, useRef, useState } from 'react';
import { highlight } from 'sugar-high';

/**
 * Sanitizes HTML content by removing potentially dangerous elements and attributes
 * This is a basic sanitizer - for production, consider using a library like DOMPurify
 */
function sanitizeHTML(html: string): string {
  // Remove script tags and event handlers
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

type SupportedLanguage =
  | 'tsx'
  | 'jsx'
  | 'ts'
  | 'js'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'bash'
  | 'python'
  | 'go'
  | 'rust'
  | 'sql'
  | 'yaml';

interface CodeProps {
  language: SupportedLanguage;
  title?: string;
  children: string;
}

function Code({ children }: CodeProps) {
  const highlightedCode = useMemo(() => {
    try {
      const highlighted = highlight(children);

      return sanitizeHTML(highlighted);
    } catch (error) {
      console.error('Error highlighting code:', error);

      return children;
    }
  }, [children]);

  return (
    <div className="overflow-auto">
      <pre className="m-0 overflow-x-auto border border-accent/10 bg-background p-0 font-mono backdrop-blur-sm">
        <code
          className="block p-4 text-sm leading-normal"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}

interface DemoProps {
  children: React.ReactNode;
  title?: string;
}

function Demo({ children }: DemoProps) {
  return <div>{children}</div>;
}

function TabButton({
  children,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive: boolean }) {
  return (
    <button
      className={cn(
        'cursor-pointer px-4 py-2 font-medium text-secondary-foreground/70 text-sm leading-normal transition-colors',
        isActive
          ? 'bg-secondary-foreground/10 text-secondary-foreground/90'
          : 'hover:bg-secondary-foreground/5'
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

function Root({
  children,
  className,
}: {
  children:
    | (React.ReactElement<CodeProps> | React.ReactElement<DemoProps>)[]
    | React.ReactElement<CodeProps | DemoProps>;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const code = useMemo(
    () => getChildrenByComponentName(children, Code),
    [children]
  );
  const demo = useMemo(
    () => getChildrenByComponentName(children, Demo),
    [children]
  );

  const onTabClick = (index: number) => {
    setActiveTab(index);

    queueMicrotask(() => {
      containerRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    });
  };

  return (
    <div
      aria-label="Code examples"
      className={cn(
        'overflow-hidden rounded-md border border-primary/10 bg-secondary text-secondary-foreground',
        className
      )}
      ref={containerRef}
      role="tablist"
    >
      <div className="flex justify-between border-primary/10 border-b">
        <div
          aria-label="Code files"
          className="flex items-center"
          role="tablist"
        >
          {code.map((tab, index) => (
            <TabButton
              aria-controls={`tabpanel-${String(index)}`}
              aria-selected={activeTab === index}
              id={`tab-${String(index)}`}
              isActive={activeTab === index}
              key={`tab-${index}`}
              onClick={() => {
                onTabClick(index);
              }}
              role="tab"
            >
              {tab.props.title ?? tab.props.language}
            </TabButton>
          ))}
        </div>
        <div aria-label="Examples" className="flex" role="tablist">
          {demo.map((item, index) => {
            const tabIndex = code.length + index;

            return (
              <TabButton
                aria-controls={`tabpanel-${String(tabIndex)}`}
                aria-selected={activeTab === tabIndex}
                id={`tab-${String(tabIndex)}`}
                isActive={activeTab === tabIndex}
                key={tabIndex}
                onClick={() => {
                  onTabClick(tabIndex);
                }}
                role="tab"
              >
                {item.props.title ?? 'Demo'}
              </TabButton>
            );
          })}
        </div>
      </div>
      <div
        aria-labelledby={`tab-${String(activeTab)}`}
        id={`tabpanel-${String(activeTab)}`}
        role="tabpanel"
      >
        {[...code, ...demo][activeTab]}
      </div>
    </div>
  );
}

export default { Root, Code, Demo };
